"""
Visualizer

Generates interactive maps and comparison visualizations for match results.
"""

import numpy as np
from pathlib import Path
from typing import List, Tuple, Optional

import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec

# Try to import folium, but don't fail if it's not available
try:
    import folium
    from folium import plugins
    FOLIUM_AVAILABLE = True
except ImportError:
    FOLIUM_AVAILABLE = False
    print("Warning: folium not available, map visualizations will be skipped")

from .sliding_window import MatchCandidate


class MapVisualizer:
    """Generate interactive Folium maps for match results."""

    def __init__(self, output_dir: str):
        """
        Initialize visualizer.

        Args:
            output_dir: Directory to save output files
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def create_match_map(self,
                         candidate: MatchCandidate,
                         trail_coords: np.ndarray,
                         filename: str,
                         include_satellite: bool = True) -> Optional[Path]:
        """
        Create an interactive map for a single match candidate.

        Args:
            candidate: Match candidate to visualize
            trail_coords: Full trail coordinates
            filename: Output filename (without extension)
            include_satellite: Whether to include satellite layer

        Returns:
            Path to saved HTML file
        """
        if not FOLIUM_AVAILABLE:
            return None
        # Get segment coordinates
        segment = trail_coords[candidate.start_index:candidate.end_index]

        # Center on segment midpoint
        center_lat = (segment[0][1] + segment[-1][1]) / 2
        center_lon = (segment[0][0] + segment[-1][0]) / 2

        # Create map
        m = folium.Map(
            location=[center_lat, center_lon],
            zoom_start=14,
            tiles='OpenStreetMap'
        )

        # Add matched segment (blue line)
        segment_latlons = [(lat, lon) for lon, lat in segment]
        folium.PolyLine(
            segment_latlons,
            color='#2196F3',
            weight=5,
            opacity=0.9,
            popup=f"Match Score: {candidate.distance_score:.4f}<br>"
                  f"Length: {candidate.segment_miles:.2f} miles"
        ).add_to(m)

        # Add start marker
        folium.Marker(
            [candidate.start_coords[1], candidate.start_coords[0]],
            popup=f'Start<br>({candidate.start_coords[1]:.5f}, {candidate.start_coords[0]:.5f})',
            icon=folium.Icon(color='green', icon='play')
        ).add_to(m)

        # Add end marker
        folium.Marker(
            [candidate.end_coords[1], candidate.end_coords[0]],
            popup=f'End<br>({candidate.end_coords[1]:.5f}, {candidate.end_coords[0]:.5f})',
            icon=folium.Icon(color='red', icon='stop')
        ).add_to(m)

        # Add midpoint marker with info
        mid_idx = (candidate.start_index + candidate.end_index) // 2
        mid_lon, mid_lat = trail_coords[mid_idx]
        popup_text = f"""
        <b>Match Details</b><br>
        Score: {candidate.distance_score:.4f}<br>
        Length: {candidate.segment_miles:.2f} miles<br>
        Reversed: {candidate.is_reversed}<br>
        Reflected: {candidate.is_reflected}<br>
        Nearest Road: {candidate.nearest_road or 'Unknown'}<br>
        Road Distance: {candidate.road_distance_miles:.2f} mi
        """
        folium.Marker(
            [mid_lat, mid_lon],
            popup=popup_text,
            icon=folium.Icon(color='blue', icon='info-sign')
        ).add_to(m)

        # Add satellite imagery option
        if include_satellite:
            folium.TileLayer(
                tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attr='Esri',
                name='Satellite'
            ).add_to(m)

            folium.TileLayer(
                tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                attr='Esri',
                name='Topographic'
            ).add_to(m)

        folium.LayerControl().add_to(m)

        # Add scale
        folium.plugins.MeasureControl(position='bottomleft').add_to(m)

        # Save
        output_path = self.output_dir / f"{filename}.html"
        m.save(str(output_path))

        return output_path

    def create_overview_map(self,
                            candidates: List[MatchCandidate],
                            trail_coords: np.ndarray,
                            filename: str = "overview_map") -> Optional[Path]:
        """
        Create overview map showing all candidates on the full trail.

        Args:
            candidates: List of match candidates
            trail_coords: Full trail coordinates
            filename: Output filename

        Returns:
            Path to saved HTML file
        """
        if not FOLIUM_AVAILABLE:
            return None

        # Center on trail midpoint
        mid_idx = len(trail_coords) // 2
        center_lat, center_lon = trail_coords[mid_idx][1], trail_coords[mid_idx][0]

        m = folium.Map(
            location=[center_lat, center_lon],
            zoom_start=10,
            tiles='OpenStreetMap'
        )

        # Add full trail (light gray background)
        trail_latlons = [(lat, lon) for lon, lat in trail_coords]
        folium.PolyLine(
            trail_latlons,
            color='gray',
            weight=2,
            opacity=0.5,
            popup='Appalachian Trail'
        ).add_to(m)

        # Color scale based on rank
        colors = plt.cm.RdYlGn_r(np.linspace(0, 1, len(candidates)))

        # Add each candidate as colored segment
        for i, candidate in enumerate(candidates):
            segment = trail_coords[candidate.start_index:candidate.end_index]
            segment_latlons = [(lat, lon) for lon, lat in segment]

            # Convert color to hex
            color_hex = '#{:02x}{:02x}{:02x}'.format(
                int(colors[i][0] * 255),
                int(colors[i][1] * 255),
                int(colors[i][2] * 255)
            )

            popup_text = f"""
            <b>Rank {i+1}</b><br>
            Score: {candidate.distance_score:.4f}<br>
            Length: {candidate.segment_miles:.2f} miles<br>
            Road: {candidate.nearest_road or 'Unknown'}
            """

            folium.PolyLine(
                segment_latlons,
                color=color_hex,
                weight=6,
                opacity=0.8,
                popup=popup_text
            ).add_to(m)

            # Add rank marker at midpoint
            mid_idx = (candidate.start_index + candidate.end_index) // 2
            mid_lat, mid_lon = trail_coords[mid_idx][1], trail_coords[mid_idx][0]

            folium.CircleMarker(
                [mid_lat, mid_lon],
                radius=10,
                color=color_hex,
                fill=True,
                popup=f"#{i+1}: {candidate.distance_score:.4f}"
            ).add_to(m)

        # Add satellite option
        folium.TileLayer(
            tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attr='Esri',
            name='Satellite'
        ).add_to(m)

        folium.LayerControl().add_to(m)

        # Save
        output_path = self.output_dir / f"{filename}.html"
        m.save(str(output_path))

        return output_path


class ShapeVisualizer:
    """Generate shape comparison plots."""

    def __init__(self, output_dir: str):
        """
        Initialize visualizer.

        Args:
            output_dir: Directory to save output files
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def normalize_coords(self, coords: np.ndarray) -> np.ndarray:
        """Normalize coordinates to [0, 1] range."""
        min_vals = coords.min(axis=0)
        max_vals = coords.max(axis=0)
        scale = (max_vals - min_vals).max()

        if scale == 0:
            return coords - min_vals

        return (coords - min_vals) / scale

    def create_comparison(self,
                          query_coords: List[Tuple[float, float]],
                          trail_segment: np.ndarray,
                          candidate: MatchCandidate,
                          filename: str) -> Path:
        """
        Create side-by-side shape comparison plot.

        Args:
            query_coords: Query path coordinates
            trail_segment: Trail segment coordinates
            candidate: Match candidate info
            filename: Output filename

        Returns:
            Path to saved image
        """
        fig = plt.figure(figsize=(15, 5))
        gs = GridSpec(1, 3, width_ratios=[1, 1, 1])

        # Normalize both for comparison
        query_norm = self.normalize_coords(np.array(query_coords))
        trail_norm = self.normalize_coords(trail_segment)

        # Handle reflection/reversal
        if candidate.is_reflected:
            trail_norm[:, 0] = 1 - trail_norm[:, 0]
        if candidate.is_reversed:
            trail_norm = trail_norm[::-1]

        # Plot 1: Query path (from treasure map)
        ax1 = fig.add_subplot(gs[0])
        ax1.plot(query_norm[:, 0], query_norm[:, 1], 'b-', linewidth=2)
        ax1.plot(query_norm[0, 0], query_norm[0, 1], 'go', markersize=12, label='Start', zorder=5)
        ax1.plot(query_norm[-1, 0], query_norm[-1, 1], 'ro', markersize=12, label='End', zorder=5)
        ax1.set_title('Treasure Map Path', fontsize=12, fontweight='bold')
        ax1.set_aspect('equal')
        ax1.legend(loc='best')
        ax1.grid(True, alpha=0.3)
        ax1.set_xlabel('X (normalized)')
        ax1.set_ylabel('Y (normalized)')

        # Plot 2: Trail segment
        ax2 = fig.add_subplot(gs[1])
        ax2.plot(trail_norm[:, 0], trail_norm[:, 1], 'g-', linewidth=2)
        ax2.plot(trail_norm[0, 0], trail_norm[0, 1], 'go', markersize=12, label='Start', zorder=5)
        ax2.plot(trail_norm[-1, 0], trail_norm[-1, 1], 'ro', markersize=12, label='End', zorder=5)
        ax2.set_title(f'AT Segment\nScore: {candidate.distance_score:.4f}',
                      fontsize=12, fontweight='bold')
        ax2.set_aspect('equal')
        ax2.legend(loc='best')
        ax2.grid(True, alpha=0.3)
        ax2.set_xlabel('X (normalized)')
        ax2.set_ylabel('Y (normalized)')

        # Plot 3: Overlay comparison
        ax3 = fig.add_subplot(gs[2])
        ax3.plot(query_norm[:, 0], query_norm[:, 1], 'b-', linewidth=2, alpha=0.7, label='Map')
        ax3.plot(trail_norm[:, 0], trail_norm[:, 1], 'g-', linewidth=2, alpha=0.7, label='Trail')
        ax3.set_title('Overlay Comparison', fontsize=12, fontweight='bold')
        ax3.set_aspect('equal')
        ax3.legend(loc='best')
        ax3.grid(True, alpha=0.3)
        ax3.set_xlabel('X (normalized)')
        ax3.set_ylabel('Y (normalized)')

        # Add info text
        info_text = (
            f"Length: {candidate.segment_miles:.2f} miles\n"
            f"Reversed: {candidate.is_reversed}\n"
            f"Reflected: {candidate.is_reflected}\n"
            f"Road: {candidate.nearest_road or 'Unknown'}\n"
            f"Road Dist: {candidate.road_distance_miles:.2f} mi"
        )
        fig.text(0.02, 0.02, info_text, fontsize=9, verticalalignment='bottom',
                 bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

        plt.tight_layout()

        # Save
        output_path = self.output_dir / f"{filename}.png"
        plt.savefig(str(output_path), dpi=150, bbox_inches='tight')
        plt.close()

        return output_path

    def create_turning_angle_comparison(self,
                                        query_coords: List[Tuple[float, float]],
                                        trail_segment: np.ndarray,
                                        candidate: MatchCandidate,
                                        filename: str) -> Path:
        """
        Create turning angle profile comparison plot.

        Args:
            query_coords: Query path coordinates
            trail_segment: Trail segment coordinates
            candidate: Match candidate info
            filename: Output filename

        Returns:
            Path to saved image
        """
        from .shape_matcher import compute_turning_angles, resample_path

        # Resample and compute turning angles
        query_resampled = resample_path(query_coords, 100)
        trail_resampled = resample_path(trail_segment.tolist(), 100)

        query_angles = compute_turning_angles(query_resampled)
        trail_angles = compute_turning_angles(trail_resampled)

        # Handle reversal
        if candidate.is_reversed:
            trail_angles = -trail_angles[::-1]

        fig, axes = plt.subplots(2, 1, figsize=(12, 8))

        # Plot 1: Turning angles
        ax1 = axes[0]
        ax1.plot(query_angles, 'b-', linewidth=1.5, label='Map', alpha=0.8)
        ax1.plot(trail_angles, 'g-', linewidth=1.5, label='Trail', alpha=0.8)
        ax1.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
        ax1.set_title('Turning Angle Profiles', fontsize=12, fontweight='bold')
        ax1.set_xlabel('Position along path')
        ax1.set_ylabel('Turning angle (radians)')
        ax1.legend()
        ax1.grid(True, alpha=0.3)

        # Plot 2: Cumulative angle
        ax2 = axes[1]
        query_cumulative = np.concatenate([[0], np.cumsum(query_angles)])
        trail_cumulative = np.concatenate([[0], np.cumsum(trail_angles)])
        ax2.plot(query_cumulative, 'b-', linewidth=1.5, label='Map', alpha=0.8)
        ax2.plot(trail_cumulative, 'g-', linewidth=1.5, label='Trail', alpha=0.8)
        ax2.set_title('Cumulative Rotation', fontsize=12, fontweight='bold')
        ax2.set_xlabel('Position along path')
        ax2.set_ylabel('Cumulative angle (radians)')
        ax2.legend()
        ax2.grid(True, alpha=0.3)

        plt.tight_layout()

        # Save
        output_path = self.output_dir / f"{filename}_angles.png"
        plt.savefig(str(output_path), dpi=150, bbox_inches='tight')
        plt.close()

        return output_path


def create_all_visualizations(candidates: List[MatchCandidate],
                               trail_coords: np.ndarray,
                               query_coords: List[Tuple[float, float]],
                               output_dir: str,
                               top_n: int = 5) -> dict:
    """
    Create all visualizations for top match candidates.

    Args:
        candidates: Ranked list of match candidates
        trail_coords: Full trail coordinates
        query_coords: Query path coordinates
        output_dir: Output directory
        top_n: Number of top candidates to visualize

    Returns:
        Dictionary of created file paths
    """
    map_viz = MapVisualizer(output_dir)
    shape_viz = ShapeVisualizer(output_dir)

    files = {
        'maps': [],
        'comparisons': [],
        'overview': None
    }

    # Create overview map (if folium available)
    overview_path = map_viz.create_overview_map(candidates[:top_n], trail_coords)
    if overview_path:
        files['overview'] = str(overview_path)

    # Create individual visualizations for top candidates
    for i, candidate in enumerate(candidates[:top_n]):
        # Get segment
        segment = trail_coords[candidate.start_index:candidate.end_index]

        # Map (if folium available)
        map_path = map_viz.create_match_map(
            candidate, trail_coords, f"match_{i+1:02d}"
        )
        if map_path:
            files['maps'].append(str(map_path))

        # Shape comparison
        comp_path = shape_viz.create_comparison(
            query_coords, segment, candidate, f"comparison_{i+1:02d}"
        )
        files['comparisons'].append(str(comp_path))

    return files


if __name__ == "__main__":
    # Test with synthetic data
    import numpy as np

    # Create test data
    t = np.linspace(0, 2 * np.pi, 100)
    query = list(zip(np.cos(t), np.sin(t)))

    trail = np.column_stack([
        np.linspace(-83, -82.5, 500),
        35.5 + 0.1 * np.sin(np.linspace(0, 4 * np.pi, 500))
    ])

    candidate = MatchCandidate(
        start_index=100,
        end_index=200,
        start_coords=(-82.9, 35.55),
        end_coords=(-82.8, 35.52),
        distance_score=0.234,
        segment_miles=3.5,
        is_reversed=False,
        is_reflected=False,
        nearest_road="Test Road",
        road_distance_miles=0.5
    )

    # Test visualization
    map_viz = MapVisualizer("test_output")
    shape_viz = ShapeVisualizer("test_output")

    print("Creating test map...")
    map_viz.create_match_map(candidate, trail, "test_match")

    print("Creating test comparison...")
    segment = trail[candidate.start_index:candidate.end_index]
    shape_viz.create_comparison(query, segment, candidate, "test_comparison")

    print("Done! Check test_output/ directory")
