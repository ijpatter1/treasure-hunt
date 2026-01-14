"""
Shape Matcher

Implements shape matching using turning angle profiles with Dynamic Time Warping.
This approach is scale and rotation invariant.
"""

import numpy as np
from typing import List, Tuple, Optional
from scipy.ndimage import uniform_filter1d
from scipy.interpolate import interp1d


def compute_turning_angles(coords: np.ndarray, smooth_window: int = 0) -> np.ndarray:
    """
    Compute turning angle profile for a path.
    Turning angle = change in direction at each point.

    Args:
        coords: Array of (x, y) coordinates, shape (N, 2)
        smooth_window: Optional smoothing window size

    Returns:
        Array of turning angles in radians, normalized to [-pi, pi]
    """
    if len(coords) < 3:
        return np.array([])

    coords = np.array(coords)

    # Optional smoothing to reduce noise
    if smooth_window > 1:
        coords[:, 0] = uniform_filter1d(coords[:, 0], smooth_window, mode='nearest')
        coords[:, 1] = uniform_filter1d(coords[:, 1], smooth_window, mode='nearest')

    # Compute direction vectors
    diffs = np.diff(coords, axis=0)

    # Compute angles of each segment
    angles = np.arctan2(diffs[:, 1], diffs[:, 0])

    # Compute turning angles (change in direction)
    turning = np.diff(angles)

    # Normalize to [-pi, pi]
    turning = np.mod(turning + np.pi, 2 * np.pi) - np.pi

    return turning


def resample_path(coords: List[Tuple[float, float]], n_points: int = 100) -> np.ndarray:
    """
    Resample path to uniform number of points.
    Critical for fair comparison between different-length paths.

    Args:
        coords: List of (x, y) coordinates
        n_points: Number of output points

    Returns:
        Resampled coordinates array
    """
    coords = np.array(coords)

    if len(coords) < 2:
        return coords

    # Calculate cumulative distance along path
    diffs = np.diff(coords, axis=0)
    segment_lengths = np.sqrt(np.sum(diffs**2, axis=1))
    cumulative_dist = np.concatenate([[0], np.cumsum(segment_lengths)])

    if cumulative_dist[-1] == 0:
        return coords

    # Interpolate at uniform spacing
    target_dist = np.linspace(0, cumulative_dist[-1], n_points)

    interp_x = interp1d(cumulative_dist, coords[:, 0], kind='linear')
    interp_y = interp1d(cumulative_dist, coords[:, 1], kind='linear')

    resampled = np.column_stack([interp_x(target_dist), interp_y(target_dist)])

    return resampled


def circular_distance(a: float, b: float) -> float:
    """
    Compute circular distance between two angles.
    Handles wrap-around at +/- pi.

    Args:
        a: First angle in radians
        b: Second angle in radians

    Returns:
        Minimum angular distance
    """
    diff = abs(a - b)
    return min(diff, 2 * np.pi - diff)


def dtw_distance(seq1: np.ndarray, seq2: np.ndarray, use_circular: bool = True) -> float:
    """
    Compute Dynamic Time Warping distance between two sequences.

    Args:
        seq1: First sequence
        seq2: Second sequence
        use_circular: Whether to use circular distance for angles

    Returns:
        DTW distance (lower = more similar)
    """
    n, m = len(seq1), len(seq2)

    if n == 0 or m == 0:
        return float('inf')

    # Initialize cost matrix
    dtw = np.full((n + 1, m + 1), np.inf)
    dtw[0, 0] = 0

    # Fill cost matrix
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if use_circular:
                cost = circular_distance(seq1[i-1], seq2[j-1])
            else:
                cost = abs(seq1[i-1] - seq2[j-1])

            dtw[i, j] = cost + min(
                dtw[i-1, j],      # Insertion
                dtw[i, j-1],      # Deletion
                dtw[i-1, j-1]     # Match
            )

    return dtw[n, m]


def fast_dtw_distance(seq1: np.ndarray, seq2: np.ndarray, radius: int = 10) -> float:
    """
    Faster approximate DTW using constrained window.

    Args:
        seq1: First sequence
        seq2: Second sequence
        radius: Window radius constraint

    Returns:
        Approximate DTW distance
    """
    try:
        from fastdtw import fastdtw

        def circ_dist(a, b):
            diff = abs(a[0] - b[0])
            return min(diff, 2 * np.pi - diff)

        distance, _ = fastdtw(
            seq1.reshape(-1, 1),
            seq2.reshape(-1, 1),
            dist=circ_dist,
            radius=radius
        )
        return distance
    except ImportError:
        # Fall back to standard DTW
        return dtw_distance(seq1, seq2, use_circular=True)


class ShapeMatcher:
    """
    Match shapes using turning angle profiles + DTW.
    Scale and rotation invariant.
    """

    def __init__(self, n_resample: int = 100, smooth_window: int = 3):
        """
        Initialize matcher.

        Args:
            n_resample: Number of points to resample paths to
            smooth_window: Smoothing window for turning angle computation
        """
        self.n_resample = n_resample
        self.smooth_window = smooth_window

    def preprocess_path(self, coords: List[Tuple[float, float]]) -> np.ndarray:
        """
        Preprocess path: resample and compute turning angles.

        Args:
            coords: Path coordinates

        Returns:
            Turning angle profile
        """
        # Resample to uniform number of points
        resampled = resample_path(coords, self.n_resample)

        # Compute turning angles
        angles = compute_turning_angles(resampled, self.smooth_window)

        return angles

    def compare(self, path1: List[Tuple[float, float]],
                path2: List[Tuple[float, float]],
                use_fast_dtw: bool = True) -> float:
        """
        Compare two paths using turning angle DTW.

        Args:
            path1: First path coordinates
            path2: Second path coordinates
            use_fast_dtw: Whether to use fast approximate DTW

        Returns:
            Distance score (lower = more similar)
        """
        # Get turning angle profiles
        angles1 = self.preprocess_path(path1)
        angles2 = self.preprocess_path(path2)

        if len(angles1) < 3 or len(angles2) < 3:
            return float('inf')

        # Compute DTW distance
        if use_fast_dtw:
            distance = fast_dtw_distance(angles1, angles2)
        else:
            distance = dtw_distance(angles1, angles2)

        # Normalize by sequence length
        normalized = distance / max(len(angles1), len(angles2))

        return normalized

    def compare_all_orientations(self, query: List[Tuple[float, float]],
                                  target: List[Tuple[float, float]]) -> Tuple[float, bool, bool]:
        """
        Compare query to target in all orientations.
        Tests forward/backward and original/reflected.

        Args:
            query: Query path coordinates
            target: Target path coordinates

        Returns:
            Tuple of (best score, is_reversed, is_reflected)
        """
        best_score = float('inf')
        best_reversed = False
        best_reflected = False

        query_arr = np.array(query)

        for is_reflected in [False, True]:
            # Apply reflection (flip x-coordinates)
            test_query = query_arr.copy()
            if is_reflected:
                test_query[:, 0] = -test_query[:, 0]

            for is_reversed in [False, True]:
                # Apply reversal
                test_target = list(target)
                if is_reversed:
                    test_target = test_target[::-1]

                # Compare
                score = self.compare(test_query.tolist(), test_target)

                if score < best_score:
                    best_score = score
                    best_reversed = is_reversed
                    best_reflected = is_reflected

        return best_score, best_reversed, best_reflected


def compute_cumulative_angle(coords: np.ndarray) -> np.ndarray:
    """
    Compute cumulative angle (total rotation) along path.
    Useful for detecting loops.

    Args:
        coords: Array of (x, y) coordinates

    Returns:
        Cumulative angle at each point
    """
    turning = compute_turning_angles(coords)
    if len(turning) == 0:
        return np.array([0])

    cumulative = np.concatenate([[0], np.cumsum(turning)])
    return cumulative


def path_similarity_features(coords: np.ndarray) -> dict:
    """
    Extract shape features from a path for quick filtering.

    Args:
        coords: Array of (x, y) coordinates

    Returns:
        Dictionary of shape features
    """
    if len(coords) < 3:
        return {}

    turning = compute_turning_angles(coords)
    cumulative = compute_cumulative_angle(coords)

    # Bounding box aspect ratio
    min_vals = coords.min(axis=0)
    max_vals = coords.max(axis=0)
    extent = max_vals - min_vals
    aspect_ratio = extent[0] / max(extent[1], 1e-6)

    # Total turning (absolute sum of all turns)
    total_turning = np.sum(np.abs(turning))

    # Net rotation (is it a loop?)
    net_rotation = cumulative[-1] if len(cumulative) > 0 else 0

    # Number of significant turns (> 30 degrees)
    significant_turns = np.sum(np.abs(turning) > np.pi / 6)

    return {
        'aspect_ratio': aspect_ratio,
        'total_turning': total_turning,
        'net_rotation': net_rotation,
        'significant_turns': significant_turns,
        'n_points': len(coords)
    }


if __name__ == "__main__":
    # Test with simple shapes
    import matplotlib.pyplot as plt

    # Create test paths
    t = np.linspace(0, 2 * np.pi, 50)

    # Circle
    circle = list(zip(np.cos(t), np.sin(t)))

    # Similar but scaled circle
    circle_scaled = list(zip(2 * np.cos(t), 2 * np.sin(t)))

    # Square-ish path
    square = [
        (0, 0), (1, 0), (1, 1), (0, 1), (0, 0)
    ]

    # Compare
    matcher = ShapeMatcher()

    print("Circle vs Circle (scaled):", matcher.compare(circle, circle_scaled))
    print("Circle vs Square:", matcher.compare(circle, square))
    print("Circle vs Circle (reversed):", matcher.compare(circle, circle[::-1]))
