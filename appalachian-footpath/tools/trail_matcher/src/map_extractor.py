"""
Map Path Extractor

Extracts the dotted path from the treasure map image.
Handles noise from aged parchment texture, burn marks, and creases.
"""

import cv2
import numpy as np
from pathlib import Path
from typing import List, Tuple, Optional
from skimage.morphology import skeletonize
from scipy.ndimage import uniform_filter1d


class MapPathExtractor:
    """Extract the dotted path from the treasure map image."""

    # Predefined color ranges for annotation detection (HSV)
    COLOR_RANGES = {
        'red': [
            (np.array([0, 100, 100]), np.array([10, 255, 255])),      # Red lower range
            (np.array([160, 100, 100]), np.array([180, 255, 255]))    # Red upper range (wraps around)
        ],
        'blue': [
            (np.array([100, 100, 100]), np.array([130, 255, 255]))
        ],
        'green': [
            (np.array([40, 100, 100]), np.array([80, 255, 255]))
        ],
        'yellow': [
            (np.array([20, 100, 100]), np.array([35, 255, 255]))
        ],
        'magenta': [
            (np.array([140, 100, 100]), np.array([160, 255, 255]))
        ],
        'cyan': [
            (np.array([80, 100, 100]), np.array([100, 255, 255]))
        ]
    }

    def __init__(self, image_path: str):
        """
        Initialize extractor with image path.

        Args:
            image_path: Path to the treasure map image
        """
        self.image_path = Path(image_path)
        self.original = cv2.imread(str(self.image_path))
        if self.original is None:
            raise ValueError(f"Could not load image: {image_path}")

        self.hsv = cv2.cvtColor(self.original, cv2.COLOR_BGR2HSV)
        self.gray = cv2.cvtColor(self.original, cv2.COLOR_BGR2GRAY)

    def isolate_parchment_region(self) -> np.ndarray:
        """
        Isolate the parchment from the black background.
        The map has a distinct golden/tan color against black.

        Returns:
            Binary mask of parchment region
        """
        # HSV thresholding for golden/tan parchment colors
        lower_parchment = np.array([10, 20, 80])
        upper_parchment = np.array([40, 255, 255])
        mask = cv2.inRange(self.hsv, lower_parchment, upper_parchment)

        # Morphological operations to clean edges
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

        return mask

    def extract_path_binary(self, parchment_mask: np.ndarray) -> np.ndarray:
        """
        Extract the dashed path line from the parchment.
        The path appears as darker marks against the golden background.

        Args:
            parchment_mask: Binary mask of parchment region

        Returns:
            Binary image of path pixels
        """
        # Apply parchment mask to isolate region of interest
        masked = cv2.bitwise_and(self.original, self.original, mask=parchment_mask)
        gray = cv2.cvtColor(masked, cv2.COLOR_BGR2GRAY)

        # Adaptive thresholding to handle uneven parchment coloring
        binary = cv2.adaptiveThreshold(
            gray, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY_INV,
            blockSize=25,
            C=12
        )

        # Apply parchment mask to remove background noise
        binary = cv2.bitwise_and(binary, binary, mask=parchment_mask)

        return binary

    def denoise_path(self, binary_path: np.ndarray) -> np.ndarray:
        """
        Remove noise from path binary image.
        Filters out texture artifacts, creases, and burn marks.

        Args:
            binary_path: Binary image from extract_path_binary

        Returns:
            Cleaned binary image
        """
        # Connected component analysis
        num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(
            binary_path, connectivity=8
        )

        # Filter components by size and shape
        min_area = 30
        max_area = 3000

        clean_mask = np.zeros_like(binary_path)

        for i in range(1, num_labels):
            area = stats[i, cv2.CC_STAT_AREA]
            width = stats[i, cv2.CC_STAT_WIDTH]
            height = stats[i, cv2.CC_STAT_HEIGHT]

            # Keep components of reasonable size
            if min_area <= area <= max_area:
                # Filter out very elongated artifacts (likely creases)
                aspect = max(width, height) / max(min(width, height), 1)
                if aspect < 8:
                    clean_mask[labels == i] = 255

        # Dilate to connect nearby dash segments
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        clean_mask = cv2.dilate(clean_mask, kernel, iterations=2)

        return clean_mask

    def find_path_contour(self, clean_binary: np.ndarray) -> Optional[np.ndarray]:
        """
        Find the main path contour from cleaned binary image.

        Args:
            clean_binary: Denoised binary path image

        Returns:
            Contour points of the main path, or None if not found
        """
        # Find contours
        contours, _ = cv2.findContours(
            clean_binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )

        if not contours:
            return None

        # Find the largest contour (should be the path)
        largest = max(contours, key=cv2.contourArea)

        return largest

    def skeletonize_path(self, clean_binary: np.ndarray) -> np.ndarray:
        """
        Skeletonize the path to get a 1-pixel-wide representation.

        Args:
            clean_binary: Denoised binary path image

        Returns:
            Skeletonized binary image
        """
        # Ensure binary values are 0 or 1
        binary_01 = (clean_binary > 0).astype(np.uint8)

        # Skeletonize
        skeleton = skeletonize(binary_01)

        return (skeleton * 255).astype(np.uint8)

    def order_skeleton_points(self, skeleton: np.ndarray) -> List[Tuple[int, int]]:
        """
        Order skeleton points into a path sequence.
        Uses graph traversal to find path from start to end.

        Args:
            skeleton: Skeletonized binary image

        Returns:
            Ordered list of (x, y) coordinates
        """
        # Find all skeleton points
        points = np.argwhere(skeleton > 0)
        if len(points) < 2:
            return []

        # Build adjacency using spatial proximity
        from scipy.spatial import cKDTree

        # Convert to (x, y) format
        points_xy = [(p[1], p[0]) for p in points]
        tree = cKDTree(points_xy)

        # Find endpoints (points with only 1 neighbor within distance 2)
        neighbor_counts = []
        for i, pt in enumerate(points_xy):
            neighbors = tree.query_ball_point(pt, r=2.5)
            neighbor_counts.append(len(neighbors) - 1)  # Exclude self

        # Endpoints have 1 neighbor, junction points have 3+
        endpoints = [i for i, count in enumerate(neighbor_counts) if count == 1]

        if len(endpoints) < 2:
            # Fallback: use topmost and bottommost points
            endpoints = [
                np.argmin([p[1] for p in points_xy]),
                np.argmax([p[1] for p in points_xy])
            ]

        # Start from the endpoint closest to top-left (where arrow is)
        start_idx = min(endpoints, key=lambda i: points_xy[i][0] + points_xy[i][1])

        # Greedy path following
        visited = set()
        path = []
        current = start_idx

        while current is not None:
            visited.add(current)
            path.append(points_xy[current])

            # Find nearest unvisited neighbor
            neighbors = tree.query_ball_point(points_xy[current], r=3.0)
            next_point = None
            min_dist = float('inf')

            for n in neighbors:
                if n not in visited:
                    dist = np.sqrt(
                        (points_xy[n][0] - points_xy[current][0])**2 +
                        (points_xy[n][1] - points_xy[current][1])**2
                    )
                    if dist < min_dist:
                        min_dist = dist
                        next_point = n

            current = next_point

        return path

    def simplify_path(self, path: List[Tuple[int, int]], tolerance: float = 3.0) -> List[Tuple[float, float]]:
        """
        Simplify path using Douglas-Peucker algorithm.

        Args:
            path: Ordered list of (x, y) coordinates
            tolerance: Simplification tolerance in pixels

        Returns:
            Simplified path
        """
        if len(path) < 3:
            return [(float(x), float(y)) for x, y in path]

        from shapely.geometry import LineString

        line = LineString(path)
        simplified = line.simplify(tolerance, preserve_topology=True)

        return list(simplified.coords)

    def smooth_path(self, path: List[Tuple[float, float]], window: int = 5) -> List[Tuple[float, float]]:
        """
        Smooth path coordinates using moving average.

        Args:
            path: Path coordinates
            window: Smoothing window size

        Returns:
            Smoothed path
        """
        if len(path) < window:
            return path

        coords = np.array(path)
        smoothed_x = uniform_filter1d(coords[:, 0], window, mode='nearest')
        smoothed_y = uniform_filter1d(coords[:, 1], window, mode='nearest')

        return [(float(x), float(y)) for x, y in zip(smoothed_x, smoothed_y)]

    def detect_annotation_color(self) -> Optional[str]:
        """
        Auto-detect which annotation color is present in the image.

        Returns:
            Color name if detected, None otherwise
        """
        best_color = None
        best_count = 0

        for color_name, ranges in self.COLOR_RANGES.items():
            mask = np.zeros(self.hsv.shape[:2], dtype=np.uint8)
            for lower, upper in ranges:
                mask = cv2.bitwise_or(mask, cv2.inRange(self.hsv, lower, upper))

            pixel_count = cv2.countNonZero(mask)
            if pixel_count > best_count and pixel_count > 100:  # Minimum threshold
                best_count = pixel_count
                best_color = color_name

        return best_color

    def extract_annotated_mask(self, color: str = 'red') -> np.ndarray:
        """
        Extract binary mask of annotated path by color.

        Args:
            color: Color name ('red', 'blue', 'green', 'yellow', 'magenta', 'cyan')

        Returns:
            Binary mask of annotated pixels
        """
        if color not in self.COLOR_RANGES:
            raise ValueError(f"Unknown color: {color}. Available: {list(self.COLOR_RANGES.keys())}")

        mask = np.zeros(self.hsv.shape[:2], dtype=np.uint8)
        for lower, upper in self.COLOR_RANGES[color]:
            mask = cv2.bitwise_or(mask, cv2.inRange(self.hsv, lower, upper))

        # Clean up the mask
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

        return mask

    def extract_annotated_path(self, color: str = 'auto',
                                simplify_tolerance: float = 3.0,
                                smooth_window: int = 5) -> List[Tuple[float, float]]:
        """
        Extract path from an annotated image where the user has drawn
        over the path in a distinct color.

        Args:
            color: Annotation color ('red', 'blue', 'green', 'yellow', 'magenta', 'cyan', or 'auto')
            simplify_tolerance: Douglas-Peucker simplification tolerance
            smooth_window: Smoothing window size

        Returns:
            Extracted path coordinates
        """
        # Auto-detect color if needed
        if color == 'auto':
            detected = self.detect_annotation_color()
            if detected is None:
                raise ValueError("Could not auto-detect annotation color. "
                               "Please specify color explicitly.")
            color = detected
            print(f"      Auto-detected annotation color: {color}")

        # Extract color mask
        mask = self.extract_annotated_mask(color)

        pixel_count = cv2.countNonZero(mask)
        if pixel_count < 50:
            raise ValueError(f"Insufficient {color} pixels found ({pixel_count}). "
                           "Please check the annotation color.")

        # Skeletonize to get 1-pixel-wide path
        skeleton = self.skeletonize_path(mask)

        # Order the skeleton points
        ordered_path = self.order_skeleton_points(skeleton)

        if len(ordered_path) < 10:
            raise ValueError(f"Could not extract sufficient path points ({len(ordered_path)}). "
                           "Please ensure the annotation is a continuous line.")

        # Simplify and smooth
        simplified = self.simplify_path(ordered_path, simplify_tolerance)
        smoothed = self.smooth_path(simplified, smooth_window)

        return smoothed

    def extract_path(self, simplify_tolerance: float = 5.0, smooth_window: int = 3) -> List[Tuple[float, float]]:
        """
        Main extraction pipeline.

        Args:
            simplify_tolerance: Douglas-Peucker tolerance
            smooth_window: Smoothing window size

        Returns:
            Extracted and processed path coordinates
        """
        # Step 1: Isolate parchment
        parchment_mask = self.isolate_parchment_region()

        # Step 2: Extract path binary
        path_binary = self.extract_path_binary(parchment_mask)

        # Step 3: Denoise
        clean_binary = self.denoise_path(path_binary)

        # Step 4: Skeletonize
        skeleton = self.skeletonize_path(clean_binary)

        # Step 5: Order points
        ordered_path = self.order_skeleton_points(skeleton)

        if len(ordered_path) < 10:
            raise ValueError("Could not extract sufficient path points from image")

        # Step 6: Simplify and smooth
        simplified = self.simplify_path(ordered_path, simplify_tolerance)
        smoothed = self.smooth_path(simplified, smooth_window)

        return smoothed

    def normalize_path(self, path: List[Tuple[float, float]]) -> List[Tuple[float, float]]:
        """
        Normalize path to [0, 1] range for scale-invariant comparison.

        Args:
            path: Path coordinates

        Returns:
            Normalized path
        """
        coords = np.array(path)
        min_vals = coords.min(axis=0)
        max_vals = coords.max(axis=0)
        scale = (max_vals - min_vals).max()

        if scale == 0:
            return path

        normalized = (coords - min_vals) / scale

        return [(float(x), float(y)) for x, y in normalized]

    def save_debug_images(self, output_dir: str):
        """
        Save intermediate images for debugging.

        Args:
            output_dir: Directory to save debug images
        """
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)

        parchment_mask = self.isolate_parchment_region()
        path_binary = self.extract_path_binary(parchment_mask)
        clean_binary = self.denoise_path(path_binary)
        skeleton = self.skeletonize_path(clean_binary)

        cv2.imwrite(str(output_path / "1_parchment_mask.png"), parchment_mask)
        cv2.imwrite(str(output_path / "2_path_binary.png"), path_binary)
        cv2.imwrite(str(output_path / "3_clean_binary.png"), clean_binary)
        cv2.imwrite(str(output_path / "4_skeleton.png"), skeleton)

        # Draw extracted path on original
        path = self.extract_path()
        vis = self.original.copy()
        for i in range(len(path) - 1):
            pt1 = (int(path[i][0]), int(path[i][1]))
            pt2 = (int(path[i+1][0]), int(path[i+1][1]))
            cv2.line(vis, pt1, pt2, (0, 255, 0), 2)
        cv2.imwrite(str(output_path / "5_extracted_path.png"), vis)


def extract_path_from_map(image_path: str) -> List[Tuple[float, float]]:
    """
    Convenience function to extract path from treasure map.

    Args:
        image_path: Path to treasure map image

    Returns:
        Extracted path coordinates (normalized to [0, 1])
    """
    extractor = MapPathExtractor(image_path)
    path = extractor.extract_path()
    return extractor.normalize_path(path)


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python map_extractor.py <image_path> [output_dir]")
        sys.exit(1)

    image_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "debug_output"

    extractor = MapPathExtractor(image_path)
    extractor.save_debug_images(output_dir)

    path = extractor.extract_path()
    normalized = extractor.normalize_path(path)

    print(f"Extracted {len(path)} path points")
    print(f"First point: {path[0]}")
    print(f"Last point: {path[-1]}")
