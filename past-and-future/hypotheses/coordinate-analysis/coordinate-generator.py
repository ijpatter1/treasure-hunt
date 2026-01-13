#!/usr/bin/env python3
"""
Coordinate Generator for Word Search Hypothesis

Generates all valid coordinate combinations from the backwards word search numbers:
- TWELVE (12), NINE (9), THREE (3), ZERO (0)
- Directions: NORTH (N), WEST (W)

Uses STRICTLY these whole numbers: 12, 9, 3, 0
"""

from itertools import permutations, combinations
import time

try:
    from geopy.geocoders import Nominatim
    from geopy.exc import GeocoderTimedOut
    HAS_GEOPY = True
except ImportError:
    HAS_GEOPY = False
    print("Note: geopy not installed. Install with: pip install geopy")
    print("Will generate coordinates without reverse geocoding.\n")

# STRICTLY use these whole numbers only
NUMBERS = [12, 9, 3, 0]

# US Continental bounds (approximate)
US_LAT_MIN, US_LAT_MAX = 24, 49
US_LON_MIN, US_LON_MAX = 66, 125


def concat_numbers(num_list):
    """Concatenate list of numbers into single integer."""
    return int(''.join(str(n) for n in num_list))


def generate_all_coordinates():
    """
    Generate all valid lat/lon combinations from partitions of NUMBERS.

    For each way to split {12, 9, 3, 0} into two groups:
    - One group forms the latitude (concatenated)
    - Other group forms the longitude (concatenated)
    - Try all permutations of concatenation order
    - Filter for valid ranges (lat <= 90, lon <= 180)
    """
    results = []

    # For each size of latitude group (1, 2, or 3 numbers)
    for lat_size in range(1, len(NUMBERS)):
        # For each way to choose lat_size numbers for latitude
        for lat_indices in combinations(range(len(NUMBERS)), lat_size):
            lat_nums = [NUMBERS[i] for i in lat_indices]
            lon_nums = [NUMBERS[i] for i in range(len(NUMBERS)) if i not in lat_indices]

            # Try all orderings of concatenation for latitude
            for lat_perm in permutations(lat_nums):
                # Try all orderings of concatenation for longitude
                for lon_perm in permutations(lon_nums):
                    lat = concat_numbers(lat_perm)
                    lon = concat_numbers(lon_perm)

                    # Check validity
                    valid = lat <= 90 and lon <= 180

                    # Record construction details
                    lat_str = '+'.join(str(n) for n in lat_perm)
                    lon_str = '+'.join(str(n) for n in lon_perm)

                    results.append({
                        'lat': lat,
                        'lon': lon,
                        'lat_construction': lat_str,
                        'lon_construction': lon_str,
                        'valid': valid,
                        'is_us': valid and US_LAT_MIN <= lat <= US_LAT_MAX and US_LON_MIN <= lon <= US_LON_MAX
                    })

    return results


def reverse_geocode(lat, lon, geolocator):
    """Get location info for coordinates using reverse geocoding."""
    try:
        location = geolocator.reverse(f"{lat}, -{lon}", language='en', timeout=10)
        if location:
            address = location.raw.get('address', {})
            country = address.get('country', 'Unknown')
            state = address.get('state', address.get('region', ''))
            city = address.get('city', address.get('town', address.get('village', '')))

            return {
                'country': country,
                'state': state,
                'city': city,
                'display': location.address[:100] if location.address else 'Unknown'
            }
    except GeocoderTimedOut:
        return {'country': 'Timeout', 'state': '', 'city': '', 'display': 'Geocoder timed out'}
    except Exception as e:
        return {'country': 'Error', 'state': '', 'city': '', 'display': str(e)[:50]}

    return {'country': 'Ocean/Unknown', 'state': '', 'city': '', 'display': 'No land found'}


def generate_markdown(results, with_geocoding=False):
    """Generate markdown output for coordinates.md"""

    # Separate valid and invalid
    valid_coords = [r for r in results if r['valid']]
    invalid_coords = [r for r in results if not r['valid']]

    # Deduplicate valid coordinates (same lat/lon pair)
    seen = set()
    unique_valid = []
    for r in valid_coords:
        key = (r['lat'], r['lon'])
        if key not in seen:
            seen.add(key)
            unique_valid.append(r)

    # Sort by US first, then by lat
    unique_valid.sort(key=lambda x: (not x['is_us'], x['lat'], x['lon']))

    output = []
    output.append("# Coordinate Analysis Results")
    output.append("")
    output.append("Generated from backwards word search numbers: **12, 9, 3, 0**")
    output.append("Directions: **N** (latitude), **W** (longitude)")
    output.append("")
    output.append(f"**Total combinations tried:** {len(results)}")
    output.append(f"**Valid coordinates:** {len(unique_valid)}")
    output.append(f"**Invalid (out of range):** {len(invalid_coords)}")
    output.append("")

    # US Coordinates Section
    us_coords = [r for r in unique_valid if r['is_us']]
    output.append("---")
    output.append("")
    output.append("## US Coordinates (Priority)")
    output.append("")
    if us_coords:
        output.append("| Lat (N) | Lon (W) | Construction | Location |")
        output.append("|---------|---------|--------------|----------|")
        for r in us_coords:
            location = r.get('location', {}).get('display', 'Pending research') if with_geocoding else 'Pending research'
            output.append(f"| **{r['lat']}** | **{r['lon']}** | ({r['lat_construction']}) → ({r['lon_construction']}) | {location} |")
    else:
        output.append("*No coordinates fall within continental US bounds (24-49°N, 66-125°W)*")
    output.append("")

    # All Valid Coordinates
    output.append("---")
    output.append("")
    output.append("## All Valid Coordinates")
    output.append("")
    output.append("| # | Lat (N) | Lon (W) | Construction | US? | Location |")
    output.append("|---|---------|---------|--------------|-----|----------|")

    for i, r in enumerate(unique_valid, 1):
        us_flag = "**YES**" if r['is_us'] else ""
        location = r.get('location', {}).get('display', '') if with_geocoding else ''
        output.append(f"| {i} | {r['lat']} | {r['lon']} | ({r['lat_construction']}) → ({r['lon_construction']}) | {us_flag} | {location} |")

    output.append("")

    # Invalid Coordinates (for completeness)
    output.append("---")
    output.append("")
    output.append("## Invalid Coordinates (lon > 180)")
    output.append("")
    output.append("| Lat | Lon | Construction | Reason |")
    output.append("|-----|-----|--------------|--------|")

    seen_invalid = set()
    for r in invalid_coords:
        key = (r['lat'], r['lon'])
        if key not in seen_invalid:
            seen_invalid.add(key)
            reason = "lat > 90" if r['lat'] > 90 else "lon > 180"
            output.append(f"| {r['lat']} | {r['lon']} | ({r['lat_construction']}) → ({r['lon_construction']}) | {reason} |")

    output.append("")
    output.append("---")
    output.append("")
    output.append("*Generated by coordinate-generator.py*")

    return '\n'.join(output)


def main():
    print("Generating all coordinate combinations...")
    print(f"Numbers: {NUMBERS}")
    print()

    results = generate_all_coordinates()

    valid_count = sum(1 for r in results if r['valid'])
    invalid_count = len(results) - valid_count

    print(f"Total combinations: {len(results)}")
    print(f"Valid: {valid_count}")
    print(f"Invalid: {invalid_count}")
    print()

    # Deduplicate for display
    seen = set()
    unique_valid = []
    for r in results:
        if r['valid']:
            key = (r['lat'], r['lon'])
            if key not in seen:
                seen.add(key)
                unique_valid.append(r)

    print(f"Unique valid coordinates: {len(unique_valid)}")
    print()

    # Check for US coordinates
    us_coords = [r for r in unique_valid if r['is_us']]
    print(f"US coordinates (lat 24-49, lon 66-125): {len(us_coords)}")
    for r in us_coords:
        print(f"  {r['lat']}°N, {r['lon']}°W")
    print()

    # Reverse geocoding if available
    if HAS_GEOPY:
        print("Performing reverse geocoding...")
        geolocator = Nominatim(user_agent="treasure-hunt-coordinate-analysis")

        for r in unique_valid:
            print(f"  Looking up {r['lat']}°N, {r['lon']}°W...", end=' ')
            r['location'] = reverse_geocode(r['lat'], r['lon'], geolocator)
            print(r['location']['display'][:60])
            time.sleep(1.1)  # Rate limiting for Nominatim

        print()

    # Generate markdown
    markdown = generate_markdown(unique_valid, with_geocoding=HAS_GEOPY)

    # Write to file
    output_path = 'coordinates.md'
    with open(output_path, 'w') as f:
        f.write(markdown)

    print(f"Results written to {output_path}")

    # Also print markdown to stdout
    print()
    print("=" * 60)
    print(markdown)


if __name__ == '__main__':
    main()
