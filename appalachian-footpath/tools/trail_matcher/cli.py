#!/usr/bin/env python3
"""
AT Trail Path Matcher CLI

Command-line interface for matching treasure map path to AT trail segments.
"""

import argparse
import json
import sys
from pathlib import Path
from datetime import datetime

import numpy as np

# Add src to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from src.map_extractor import MapPathExtractor
from src.trail_loader import TrailLoader
from src.sliding_window import SlidingWindowSearch
from src.visualizer import create_all_visualizations


def print_progress(current: int, total: int):
    """Print progress bar."""
    pct = current / total * 100
    bar_len = 40
    filled = int(bar_len * current / total)
    bar = '=' * filled + '-' * (bar_len - filled)
    print(f'\r      [{bar}] {pct:.1f}% ({current}/{total})', end='', flush=True)


def main():
    parser = argparse.ArgumentParser(
        description='Match treasure map path to Appalachian Trail segments',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python cli.py ../../screenshots/treasure_map.png --output results/
  python cli.py map.png --min-miles 1 --max-miles 10 --top-k 10
  python cli.py map.png --debug  # Save intermediate extraction images
        """
    )

    parser.add_argument(
        'map_image',
        type=Path,
        help='Path to treasure map image'
    )

    parser.add_argument(
        '--output', '-o',
        type=Path,
        default=Path('output'),
        help='Output directory for results (default: output/)'
    )

    parser.add_argument(
        '--top-k', '-k',
        type=int,
        default=20,
        help='Number of top matches to return (default: 20)'
    )

    parser.add_argument(
        '--min-miles',
        type=float,
        default=0.5,
        help='Minimum segment length in miles (default: 0.5)'
    )

    parser.add_argument(
        '--max-miles',
        type=float,
        default=15.0,
        help='Maximum segment length in miles (default: 15.0)'
    )

    parser.add_argument(
        '--cache-dir',
        type=Path,
        default=Path('data'),
        help='Directory for cached trail data (default: data/)'
    )

    parser.add_argument(
        '--no-cache',
        action='store_true',
        help='Fetch fresh trail data, ignoring cache'
    )

    parser.add_argument(
        '--debug',
        action='store_true',
        help='Save intermediate extraction images for debugging'
    )

    parser.add_argument(
        '--annotated',
        action='store_true',
        help='Use annotated image extraction (for images where path is drawn in a distinct color)'
    )

    parser.add_argument(
        '--color',
        type=str,
        default='auto',
        choices=['auto', 'red', 'blue', 'green', 'yellow', 'magenta', 'cyan'],
        help='Annotation color to detect (default: auto-detect)'
    )

    parser.add_argument(
        '--visualize-top',
        type=int,
        default=5,
        help='Number of top matches to create detailed visualizations for (default: 5)'
    )

    args = parser.parse_args()

    # Validate input
    if not args.map_image.exists():
        print(f"Error: Map image not found: {args.map_image}")
        sys.exit(1)

    # Create output directory
    args.output.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("  AT Trail Path Matcher")
    print("=" * 60)
    print()
    print(f"Map image: {args.map_image}")
    print(f"Output dir: {args.output}")
    print(f"Segment range: {args.min_miles} - {args.max_miles} miles")
    print()

    # Step 1: Extract path from treasure map
    print("[1/4] Extracting path from treasure map...")
    try:
        extractor = MapPathExtractor(str(args.map_image))

        if args.debug:
            debug_dir = args.output / 'debug'
            extractor.save_debug_images(str(debug_dir))
            print(f"      Debug images saved to {debug_dir}/")

        if args.annotated:
            print(f"      Using annotated extraction mode (color: {args.color})")
            query_coords = extractor.extract_annotated_path(color=args.color)
        else:
            query_coords = extractor.extract_path()

        query_normalized = extractor.normalize_path(query_coords)
        print(f"      Extracted {len(query_coords)} path points")

    except Exception as e:
        print(f"      Error extracting path: {e}")
        if args.annotated:
            print("      Tip: Ensure path is drawn in a solid, bright color (red, blue, green, etc.)")
        else:
            print("      Try using --annotated with a color-traced image")
        sys.exit(1)

    # Step 2: Load AT trail data
    print("[2/4] Loading AT trail data...")
    try:
        loader = TrailLoader(str(args.cache_dir))
        trail = loader.load_trail(use_cache=not args.no_cache)
        trail_resampled = loader.resample_trail(trail, spacing_meters=30)
        road_crossings = loader.get_road_crossings()

        print(f"      Loaded {len(trail_resampled)} trail points")
        print(f"      {len(road_crossings)} known road crossings")

    except Exception as e:
        print(f"      Error loading trail data: {e}")
        sys.exit(1)

    # Step 3: Search for matches
    print(f"[3/4] Searching for matches...")
    try:
        searcher = SlidingWindowSearch(trail_resampled, road_crossings)
        candidates = searcher.search(
            query_normalized,
            top_k=args.top_k,
            min_miles=args.min_miles,
            max_miles=args.max_miles,
            progress_callback=print_progress
        )
        print()  # Newline after progress bar
        print(f"      Found {len(candidates)} candidate matches")

    except Exception as e:
        print(f"      Error during search: {e}")
        sys.exit(1)

    # Step 4: Generate visualizations and save results
    print("[4/4] Generating visualizations...")
    try:
        viz_files = create_all_visualizations(
            candidates,
            trail_resampled,
            query_normalized,
            str(args.output),
            top_n=args.visualize_top
        )
        print(f"      Created {len(viz_files['maps'])} match maps")
        print(f"      Created overview map")

    except Exception as e:
        print(f"      Warning: Error creating visualizations: {e}")
        viz_files = {}

    # Save results JSON
    # Convert numpy types to native Python types for JSON serialization
    def convert_numpy(obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return obj

    results = {
        'timestamp': datetime.now().isoformat(),
        'query_image': str(args.map_image),
        'search_params': {
            'min_miles': args.min_miles,
            'max_miles': args.max_miles,
            'top_k': args.top_k
        },
        'trail_info': {
            'n_points': int(len(trail_resampled)),
            'n_road_crossings': int(len(road_crossings))
        },
        'matches': [c.to_dict() for c in candidates],
        'visualizations': viz_files
    }

    results_path = args.output / 'results.json'

    class NumpyEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, np.integer):
                return int(obj)
            elif isinstance(obj, np.floating):
                return float(obj)
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            return super().default(obj)

    with open(results_path, 'w') as f:
        json.dump(results, f, indent=2, cls=NumpyEncoder)

    # Print summary
    print()
    print("=" * 60)
    print("  Results Summary")
    print("=" * 60)
    print()

    if candidates:
        print(f"Top {min(5, len(candidates))} Matches:")
        print("-" * 60)

        for i, c in enumerate(candidates[:5]):
            print(f"\n{i+1}. Score: {c.distance_score:.4f}")
            print(f"   Location: ({c.start_coords[1]:.5f}, {c.start_coords[0]:.5f}) to "
                  f"({c.end_coords[1]:.5f}, {c.end_coords[0]:.5f})")
            print(f"   Length: {c.segment_miles:.2f} miles")
            print(f"   Nearest Road: {c.nearest_road or 'Unknown'} "
                  f"({c.road_distance_miles:.2f} mi away)")
            print(f"   Orientation: {'Reversed' if c.is_reversed else 'Forward'}, "
                  f"{'Reflected' if c.is_reflected else 'Normal'}")
    else:
        print("No matches found.")

    print()
    print("-" * 60)
    print(f"Full results saved to: {results_path}")
    print(f"Overview map: {args.output}/overview_map.html")
    print()


if __name__ == '__main__':
    main()
