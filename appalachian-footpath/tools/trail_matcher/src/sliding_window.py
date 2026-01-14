"""
Sliding Window Search

Searches along the AT trail for segments matching the treasure map path.
Tests multiple segment lengths and all orientations.
"""

import numpy as np
from typing import List, Tuple, Generator, Optional
from dataclasses import dataclass, field
from concurrent.futures import ProcessPoolExecutor, as_completed
import multiprocessing

from .shape_matcher import ShapeMatcher
from .trail_loader import RoadCrossing


@dataclass
class MatchCandidate:
    """Represents a potential match location on the trail."""
    start_index: int
    end_index: int
    start_coords: Tuple[float, float]  # (lon, lat)
    end_coords: Tuple[float, float]    # (lon, lat)
    distance_score: float
    segment_miles: float
    is_reversed: bool
    is_reflected: bool
    nearest_road: Optional[str] = None
    road_distance_miles: Optional[float] = None

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            'start_index': self.start_index,
            'end_index': self.end_index,
            'start_lat': self.start_coords[1],
            'start_lon': self.start_coords[0],
            'end_lat': self.end_coords[1],
            'end_lon': self.end_coords[0],
            'score': self.distance_score,
            'segment_miles': self.segment_miles,
            'is_reversed': self.is_reversed,
            'is_reflected': self.is_reflected,
            'nearest_road': self.nearest_road,
            'road_distance_miles': self.road_distance_miles
        }


class SlidingWindowSearch:
    """
    Search for matching path segments along the AT trail.
    Uses sliding window with multiple window sizes.
    """

    # Conversion factors (approximate at ~35.5N latitude)
    METERS_PER_DEGREE_LON = 91000
    METERS_PER_DEGREE_LAT = 111000
    METERS_PER_MILE = 1609.34

    def __init__(self, trail_coords: np.ndarray, road_crossings: List[RoadCrossing] = None):
        """
        Initialize searcher.

        Args:
            trail_coords: Array of (lon, lat) coordinates for the trail
            road_crossings: Optional list of road crossing locations
        """
        self.trail = np.array(trail_coords)
        self.road_crossings = road_crossings or []

        # Compute cumulative distance along trail
        self._compute_distances()

    def _compute_distances(self):
        """Compute cumulative distance along trail in meters and miles."""
        diffs = np.diff(self.trail, axis=0)

        # Convert to meters (approximate)
        diffs_meters = diffs * np.array([self.METERS_PER_DEGREE_LON, self.METERS_PER_DEGREE_LAT])
        segment_lengths = np.sqrt(np.sum(diffs_meters**2, axis=1))

        self.cumulative_meters = np.concatenate([[0], np.cumsum(segment_lengths)])
        self.cumulative_miles = self.cumulative_meters / self.METERS_PER_MILE

    def index_to_miles(self, start_idx: int, end_idx: int) -> float:
        """
        Get segment length in miles between two indices.

        Args:
            start_idx: Start index
            end_idx: End index

        Returns:
            Segment length in miles
        """
        return abs(self.cumulative_miles[end_idx] - self.cumulative_miles[start_idx])

    def miles_to_indices(self, miles: float) -> int:
        """
        Convert miles to approximate number of indices.

        Args:
            miles: Distance in miles

        Returns:
            Approximate number of indices
        """
        if len(self.cumulative_miles) < 2:
            return 1

        total_miles = self.cumulative_miles[-1]
        total_indices = len(self.trail)

        if total_miles == 0:
            return 1

        return max(1, int(miles * total_indices / total_miles))

    def generate_windows(self,
                         min_miles: float = 0.5,
                         max_miles: float = 15.0,
                         step_miles: float = 0.25,
                         n_sizes: int = 15) -> Generator[Tuple[int, int], None, None]:
        """
        Generate all windows to test.
        Tests multiple sizes since map scale is unknown.

        Args:
            min_miles: Minimum segment length
            max_miles: Maximum segment length
            step_miles: Step size for sliding window
            n_sizes: Number of different window sizes to test

        Yields:
            Tuples of (start_index, end_index)
        """
        # Generate window sizes to test (in indices)
        min_size = self.miles_to_indices(min_miles)
        max_size = self.miles_to_indices(max_miles)
        step = max(1, self.miles_to_indices(step_miles))

        sizes = np.linspace(min_size, max_size, n_sizes, dtype=int)

        for window_size in sizes:
            # Ensure valid window size
            if window_size < 10 or window_size >= len(self.trail):
                continue

            # Slide window along trail
            for start in range(0, len(self.trail) - window_size, step):
                end = start + window_size
                yield (start, end)

    def find_nearest_road(self, lat: float, lon: float) -> Tuple[Optional[str], Optional[float]]:
        """
        Find nearest road crossing to a point.

        Args:
            lat: Latitude
            lon: Longitude

        Returns:
            Tuple of (road name, distance in miles)
        """
        if not self.road_crossings:
            return None, None

        min_dist = float('inf')
        nearest_name = None

        for crossing in self.road_crossings:
            # Approximate distance
            dlat = (crossing.lat - lat) * self.METERS_PER_DEGREE_LAT
            dlon = (crossing.lon - lon) * self.METERS_PER_DEGREE_LON
            dist_meters = np.sqrt(dlat**2 + dlon**2)
            dist_miles = dist_meters / self.METERS_PER_MILE

            if dist_miles < min_dist:
                min_dist = dist_miles
                nearest_name = crossing.name

        return nearest_name, min_dist

    def search(self,
               query_coords: List[Tuple[float, float]],
               top_k: int = 20,
               min_miles: float = 0.5,
               max_miles: float = 15.0,
               progress_callback: callable = None) -> List[MatchCandidate]:
        """
        Search for best matching segments.

        Args:
            query_coords: Query path coordinates (normalized)
            top_k: Number of top candidates to return
            min_miles: Minimum segment length
            max_miles: Maximum segment length
            progress_callback: Optional callback for progress updates

        Returns:
            List of MatchCandidate objects sorted by score
        """
        matcher = ShapeMatcher()
        candidates = []

        # Convert query to array
        query = np.array(query_coords)

        # Count total windows for progress
        windows = list(self.generate_windows(min_miles, max_miles))
        total_windows = len(windows)

        for i, (start, end) in enumerate(windows):
            # Get trail segment
            segment = self.trail[start:end]

            if len(segment) < 10:
                continue

            # Normalize segment coordinates for comparison
            segment_normalized = self._normalize_coords(segment)

            # Compare with all orientations
            score, is_reversed, is_reflected = matcher.compare_all_orientations(
                query.tolist(),
                segment_normalized.tolist()
            )

            if np.isfinite(score):
                # Get actual coordinates for this segment
                start_coords = tuple(self.trail[start])
                end_coords = tuple(self.trail[end - 1])

                # Find nearest road to midpoint
                mid_idx = (start + end) // 2
                mid_lat, mid_lon = self.trail[mid_idx][1], self.trail[mid_idx][0]
                road_name, road_dist = self.find_nearest_road(mid_lat, mid_lon)

                candidate = MatchCandidate(
                    start_index=start,
                    end_index=end,
                    start_coords=start_coords,
                    end_coords=end_coords,
                    distance_score=score,
                    segment_miles=self.index_to_miles(start, end),
                    is_reversed=is_reversed,
                    is_reflected=is_reflected,
                    nearest_road=road_name,
                    road_distance_miles=road_dist
                )
                candidates.append(candidate)

            # Progress callback
            if progress_callback and (i + 1) % 100 == 0:
                progress_callback(i + 1, total_windows)

        # Sort by score and return top K
        candidates.sort(key=lambda c: c.distance_score)

        # Remove overlapping candidates (keep best score for each region)
        filtered = self._remove_overlapping(candidates, min_separation_miles=0.5)

        return filtered[:top_k]

    def _normalize_coords(self, coords: np.ndarray) -> np.ndarray:
        """
        Normalize coordinates to [0, 1] range for scale-invariant comparison.

        Args:
            coords: Array of coordinates

        Returns:
            Normalized coordinates
        """
        min_vals = coords.min(axis=0)
        max_vals = coords.max(axis=0)
        scale = (max_vals - min_vals).max()

        if scale == 0:
            return coords - min_vals

        return (coords - min_vals) / scale

    def _remove_overlapping(self, candidates: List[MatchCandidate],
                            min_separation_miles: float = 0.5) -> List[MatchCandidate]:
        """
        Remove overlapping candidates, keeping the best score for each region.

        Args:
            candidates: Sorted list of candidates (best first)
            min_separation_miles: Minimum separation between kept candidates

        Returns:
            Filtered list of non-overlapping candidates
        """
        if not candidates:
            return []

        min_separation_idx = self.miles_to_indices(min_separation_miles)
        kept = []

        for candidate in candidates:
            # Check if this candidate overlaps with any kept candidate
            overlaps = False
            for kept_candidate in kept:
                # Check for overlap
                if (candidate.start_index < kept_candidate.end_index + min_separation_idx and
                    candidate.end_index > kept_candidate.start_index - min_separation_idx):
                    overlaps = True
                    break

            if not overlaps:
                kept.append(candidate)

        return kept


def search_trail_parallel(trail_coords: np.ndarray,
                          query_coords: List[Tuple[float, float]],
                          road_crossings: List[RoadCrossing] = None,
                          top_k: int = 20,
                          min_miles: float = 0.5,
                          max_miles: float = 15.0,
                          n_workers: int = None) -> List[MatchCandidate]:
    """
    Parallel search for matching trail segments.
    Splits trail into chunks and searches in parallel.

    Args:
        trail_coords: Trail coordinates
        query_coords: Query path coordinates
        road_crossings: Road crossing locations
        top_k: Number of results to return
        min_miles: Minimum segment length
        max_miles: Maximum segment length
        n_workers: Number of parallel workers

    Returns:
        List of MatchCandidate objects
    """
    if n_workers is None:
        n_workers = max(1, multiprocessing.cpu_count() - 1)

    # For small trails, don't parallelize
    if len(trail_coords) < 1000:
        searcher = SlidingWindowSearch(trail_coords, road_crossings)
        return searcher.search(query_coords, top_k, min_miles, max_miles)

    # Split into overlapping chunks
    chunk_size = len(trail_coords) // n_workers
    overlap = int(max_miles * 100)  # Generous overlap

    all_candidates = []

    # Note: For simplicity, using sequential search here
    # True parallelization would require more careful handling
    searcher = SlidingWindowSearch(trail_coords, road_crossings)
    return searcher.search(query_coords, top_k, min_miles, max_miles)


if __name__ == "__main__":
    # Test with synthetic data
    import numpy as np

    # Create a simple trail (sinusoidal path)
    t = np.linspace(0, 10 * np.pi, 1000)
    trail = np.column_stack([
        t / (10 * np.pi) * 0.5 - 83.0,  # Longitude
        35.5 + 0.2 * np.sin(t)           # Latitude
    ])

    # Create a query that matches part of the trail
    query_t = np.linspace(2 * np.pi, 4 * np.pi, 50)
    query = list(zip(
        (query_t - 2 * np.pi) / (2 * np.pi),  # Normalized x
        np.sin(query_t)                         # Normalized y
    ))

    # Search
    searcher = SlidingWindowSearch(trail)
    results = searcher.search(query, top_k=5, min_miles=1, max_miles=5)

    print(f"Found {len(results)} candidates")
    for i, r in enumerate(results):
        print(f"{i+1}. Score: {r.distance_score:.4f}, Miles: {r.segment_miles:.2f}")
        print(f"   Start: ({r.start_coords[1]:.4f}, {r.start_coords[0]:.4f})")
        print(f"   End: ({r.end_coords[1]:.4f}, {r.end_coords[0]:.4f})")
