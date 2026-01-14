"""
Trail Data Loader

Acquires Appalachian Trail GPS data from OpenStreetMap.
Focuses on the NC Blue Ridge region near Asheville.
"""

import json
import requests
from pathlib import Path
from typing import List, Tuple, Dict, Optional
from dataclasses import dataclass

import numpy as np
from shapely.geometry import LineString, Point
from shapely.ops import linemerge


@dataclass
class RoadCrossing:
    """Represents a road crossing point on the AT."""
    name: str
    lat: float
    lon: float
    road_type: str = "unknown"


# NC Blue Ridge region bounding box
NC_BLUE_RIDGE_BBOX = {
    'south': 35.2,
    'north': 36.2,
    'west': -83.5,
    'east': -82.0
}

# Known road crossings in the NC Blue Ridge AT section
NC_ROAD_CROSSINGS = [
    RoadCrossing("US 25/70 at Hot Springs", 35.8973, -82.8268, "highway"),
    RoadCrossing("NC 1182 (Max Patch Rd)", 35.8012, -82.9543, "road"),
    RoadCrossing("NC 209 (Hot Springs)", 35.8915, -82.8358, "highway"),
    RoadCrossing("I-40 at Davenport Gap", 35.7561, -83.1397, "interstate"),
    RoadCrossing("BRP Milepost 355", 35.7156, -82.4025, "parkway"),
    RoadCrossing("BRP Milepost 364 (Craggy)", 35.7003, -82.3792, "parkway"),
    RoadCrossing("NC 261 (Carvers Gap)", 36.1067, -82.1106, "highway"),
    RoadCrossing("TN 143 (Roan Mountain)", 36.1028, -82.0986, "highway"),
    RoadCrossing("US 19E (Elk Park)", 36.1722, -81.9736, "highway"),
    RoadCrossing("NC 226 (Red Hill)", 35.9067, -82.1483, "highway"),
]


class TrailLoader:
    """Load AT trail data from various sources."""

    def __init__(self, cache_dir: Optional[str] = None):
        """
        Initialize loader.

        Args:
            cache_dir: Directory to cache downloaded trail data
        """
        self.cache_dir = Path(cache_dir) if cache_dir else None
        if self.cache_dir:
            self.cache_dir.mkdir(parents=True, exist_ok=True)

        self.bbox = NC_BLUE_RIDGE_BBOX
        self.road_crossings = NC_ROAD_CROSSINGS

    def fetch_from_osm(self, timeout: int = 120) -> Dict:
        """
        Fetch AT data from OpenStreetMap via Overpass API.

        Args:
            timeout: API timeout in seconds

        Returns:
            Raw OSM JSON response
        """
        overpass_url = "https://overpass-api.de/api/interpreter"

        # Overpass QL query for Appalachian Trail in bounding box
        query = f"""
        [out:json][timeout:{timeout}];
        (
          way["name"="Appalachian Trail"]
            ({self.bbox['south']},{self.bbox['west']},
             {self.bbox['north']},{self.bbox['east']});
          way["name"~"Appalachian.*Trail",i]
            ({self.bbox['south']},{self.bbox['west']},
             {self.bbox['north']},{self.bbox['east']});
        );
        out body;
        >;
        out skel qt;
        """

        response = requests.post(
            overpass_url,
            data={'data': query},
            timeout=timeout + 10
        )
        response.raise_for_status()

        return response.json()

    def osm_to_linestrings(self, osm_data: Dict) -> List[LineString]:
        """
        Convert OSM JSON to list of LineStrings.

        Args:
            osm_data: Raw OSM JSON response

        Returns:
            List of LineString geometries
        """
        # Build node lookup
        nodes = {}
        for elem in osm_data['elements']:
            if elem['type'] == 'node':
                nodes[elem['id']] = (elem['lon'], elem['lat'])

        # Build LineStrings from ways
        lines = []
        for elem in osm_data['elements']:
            if elem['type'] == 'way' and 'nodes' in elem:
                coords = []
                for nid in elem['nodes']:
                    if nid in nodes:
                        coords.append(nodes[nid])

                if len(coords) >= 2:
                    lines.append(LineString(coords))

        return lines

    def merge_trail_segments(self, lines: List[LineString]) -> LineString:
        """
        Merge trail segments into a single ordered LineString.
        The AT runs roughly SW to NE in this region.

        Args:
            lines: List of trail segment LineStrings

        Returns:
            Single merged LineString
        """
        if not lines:
            raise ValueError("No trail segments to merge")

        # Attempt to merge connected segments
        merged = linemerge(lines)

        # If result is MultiLineString, find the longest connected segment
        if merged.geom_type == 'MultiLineString':
            merged = max(merged.geoms, key=lambda g: g.length)

        # Ensure consistent direction (SW to NE for NC section)
        coords = list(merged.coords)
        start_lat = coords[0][1]
        end_lat = coords[-1][1]

        # If starts north of end, reverse (we want SW to NE)
        if start_lat > end_lat:
            coords = coords[::-1]

        return LineString(coords)

    def load_trail(self, use_cache: bool = True) -> LineString:
        """
        Load AT trail data, using cache if available.

        Args:
            use_cache: Whether to use cached data if available

        Returns:
            Trail LineString geometry
        """
        cache_file = None
        if self.cache_dir:
            cache_file = self.cache_dir / "at_nc_blue_ridge.json"

        # Try to load from cache
        if use_cache and cache_file and cache_file.exists():
            with open(cache_file, 'r') as f:
                cached = json.load(f)
            coords = [tuple(c) for c in cached['coordinates']]
            return LineString(coords)

        # Fetch from OSM
        print("Fetching AT trail data from OpenStreetMap...")
        osm_data = self.fetch_from_osm()

        # Convert and merge
        lines = self.osm_to_linestrings(osm_data)
        print(f"Found {len(lines)} trail segments")

        trail = self.merge_trail_segments(lines)
        print(f"Merged into trail with {len(trail.coords)} points")

        # Cache the result
        if cache_file:
            cache_data = {
                'type': 'LineString',
                'coordinates': list(trail.coords),
                'bbox': self.bbox,
                'source': 'OpenStreetMap'
            }
            with open(cache_file, 'w') as f:
                json.dump(cache_data, f)
            print(f"Cached trail data to {cache_file}")

        return trail

    def get_trail_coordinates(self, use_cache: bool = True) -> List[Tuple[float, float]]:
        """
        Get trail coordinates as list of (lon, lat) tuples.

        Args:
            use_cache: Whether to use cached data

        Returns:
            List of coordinate tuples
        """
        trail = self.load_trail(use_cache)
        return list(trail.coords)

    def get_road_crossings(self) -> List[RoadCrossing]:
        """
        Get known road crossings in the search area.

        Returns:
            List of RoadCrossing objects
        """
        return self.road_crossings

    def find_nearest_road(self, lat: float, lon: float) -> Tuple[RoadCrossing, float]:
        """
        Find the nearest road crossing to a given point.

        Args:
            lat: Latitude
            lon: Longitude

        Returns:
            Tuple of (nearest crossing, distance in miles)
        """
        point = Point(lon, lat)
        nearest = None
        min_dist = float('inf')

        for crossing in self.road_crossings:
            crossing_point = Point(crossing.lon, crossing.lat)
            # Approximate distance in degrees, then convert to miles
            dist_deg = point.distance(crossing_point)
            dist_miles = dist_deg * 69  # Rough approximation at this latitude

            if dist_miles < min_dist:
                min_dist = dist_miles
                nearest = crossing

        return nearest, min_dist

    def resample_trail(self, trail: LineString, spacing_meters: float = 50) -> np.ndarray:
        """
        Resample trail to uniform spacing.

        Args:
            trail: Trail LineString
            spacing_meters: Desired spacing between points in meters

        Returns:
            Array of (lon, lat) coordinates
        """
        # Approximate trail length in meters (rough conversion)
        # At ~35.5N latitude, 1 degree longitude ~ 91km, 1 degree latitude ~ 111km
        coords = np.array(trail.coords)

        # Calculate cumulative distance in meters
        diffs = np.diff(coords, axis=0)
        # Convert to meters (approximate)
        diffs_meters = diffs * np.array([91000, 111000])
        segment_lengths = np.sqrt(np.sum(diffs_meters**2, axis=1))
        cumulative_dist = np.concatenate([[0], np.cumsum(segment_lengths)])

        total_length = cumulative_dist[-1]
        n_points = int(total_length / spacing_meters)

        # Interpolate at uniform spacing
        target_distances = np.linspace(0, total_length, n_points)
        resampled_lon = np.interp(target_distances, cumulative_dist, coords[:, 0])
        resampled_lat = np.interp(target_distances, cumulative_dist, coords[:, 1])

        return np.column_stack([resampled_lon, resampled_lat])


def load_nc_blue_ridge_trail(cache_dir: Optional[str] = None) -> Tuple[np.ndarray, List[RoadCrossing]]:
    """
    Convenience function to load NC Blue Ridge AT section.

    Args:
        cache_dir: Optional cache directory

    Returns:
        Tuple of (trail coordinates array, road crossings list)
    """
    loader = TrailLoader(cache_dir)
    trail = loader.load_trail()
    resampled = loader.resample_trail(trail, spacing_meters=30)
    crossings = loader.get_road_crossings()

    return resampled, crossings


if __name__ == "__main__":
    import sys

    cache_dir = sys.argv[1] if len(sys.argv) > 1 else "data"

    loader = TrailLoader(cache_dir)
    trail = loader.load_trail(use_cache=False)

    coords = list(trail.coords)
    print(f"Trail has {len(coords)} points")
    print(f"Start: {coords[0]}")
    print(f"End: {coords[-1]}")

    # Test resampling
    resampled = loader.resample_trail(trail)
    print(f"Resampled to {len(resampled)} points")

    # Show road crossings
    print("\nRoad crossings:")
    for crossing in loader.get_road_crossings():
        print(f"  {crossing.name}: ({crossing.lat:.4f}, {crossing.lon:.4f})")
