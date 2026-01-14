# AT Trail Path Matcher

A tool to match the treasure map path from Chapter XXVII (The Appalachian Footpath Box) to actual Appalachian Trail segments.

## Overview

This tool:
1. Extracts the dotted path from the treasure map image
2. Acquires AT trail GPS data for the NC Blue Ridge region
3. Uses shape matching (turning angle profiles + DTW) to find similar trail segments
4. Generates interactive maps of the best match candidates

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
python cli.py <path_to_treasure_map> --output <output_dir>
```

### Example (automatic extraction)

```bash
python cli.py ../../screenshots/"Screenshot 2026-01-12 at 5.07.44 PM.png" --output results/
```

### Example (annotated image - RECOMMENDED)

For best results, annotate the treasure map by drawing over the dotted path
in a bright, distinct color (red, blue, green, etc.), then run:

```bash
python cli.py annotated_map.png --annotated --output results/
python cli.py annotated_map.png --annotated --color red --output results/  # Specify color
```

### Options

- `--output`: Output directory for results (default: `output/`)
- `--top-k`: Number of top matches to return (default: 20)
- `--min-miles`: Minimum segment length to test (default: 0.5)
- `--max-miles`: Maximum segment length to test (default: 15.0)
- `--annotated`: Use annotated image extraction (for color-traced paths)
- `--color`: Annotation color to detect: auto, red, blue, green, yellow, magenta, cyan (default: auto)
- `--cache-trail`: Path to cached AT trail GPX file
- `--debug`: Save intermediate extraction images for debugging

## Output

- `results.json`: Ranked match candidates with coordinates and scores
- `match_XX.html`: Interactive Folium maps of top matches
- `overview_map.html`: All candidates displayed on single map
- `comparison_XX.png`: Side-by-side shape comparisons

## Algorithm

The matching algorithm uses **turning angle profiles** with **Dynamic Time Warping (DTW)**:

1. Both paths are resampled to uniform point count
2. Turning angles (direction changes) are computed at each point
3. Profiles are compared using FastDTW with circular distance metric
4. Multiple orientations (forward/backward, mirrored) are tested
5. Sliding window search tests segment lengths from 0.5 to 15 miles

## Search Region

Focus area: NC Blue Ridge Mountains near Asheville
- Bounding box: 35.2-36.0N, 82.0-83.5W
- Approximately 100-200 miles of Appalachian Trail
- Includes: Hot Springs, Max Patch, Craggy Gardens, Roan Highlands
