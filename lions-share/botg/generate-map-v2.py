import xml.etree.ElementTree as ET
import math
import os

GPX_DIR = "/Users/ipatterson/dev/treasure-hunt/lions-share/botg/gpx_files"
COURSE_FILE = os.path.join(GPX_DIR, "COURSE_429128256.gpx")
OUTPUT = "/Users/ipatterson/dev/treasure-hunt/lions-share/botg/search-coverage-map.html"

MARKER_318 = (35.9712824139155, -81.10973949661587)

def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlam/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

TRACK_COLORS = [
    "#e6194b", "#3cb44b", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6"
]

# Parse activity GPX files
tracks = []
gpx_files = sorted([f for f in os.listdir(GPX_DIR) if f.endswith('.gpx') and f.startswith('activity')])

for i, fname in enumerate(gpx_files):
    tree = ET.parse(os.path.join(GPX_DIR, fname))
    root = tree.getroot()
    points = []
    for elem in root.iter():
        if elem.tag.endswith('}trkpt') or elem.tag == 'trkpt':
            lat = float(elem.get('lat'))
            lon = float(elem.get('lon'))
            points.append((lat, lon))
    if points:
        activity_id = fname.replace('activity_', '').replace('.gpx', '')
        if activity_id.startswith('218'):
            if '21870' in activity_id:
                date = "Feb 14"
            else:
                date = "Feb 15"
        else:
            date = "Mar 30"
        tracks.append({
            'name': activity_id,
            'date': date,
            'points': points,
            'color': TRACK_COLORS[i % len(TRACK_COLORS)]
        })

# Parse course/trail GPX
course_points = []
tree = ET.parse(COURSE_FILE)
root = tree.getroot()
for elem in root.iter():
    if elem.tag.endswith('}trkpt') or elem.tag == 'trkpt':
        lat = float(elem.get('lat'))
        lon = float(elem.get('lon'))
        course_points.append((lat, lon))

print(f"Course points: {len(course_points)}")

# Find the point on the course closest to marker 318
min_dist = float('inf')
min_idx = 0
for i, (lat, lon) in enumerate(course_points):
    d = haversine(lat, lon, MARKER_318[0], MARKER_318[1])
    if d < min_dist:
        min_dist = d
        min_idx = i

print(f"Closest course point to 318: index {min_idx}, dist {min_dist:.1f}m, coords ({course_points[min_idx][0]:.7f}, {course_points[min_idx][1]:.7f})")

# Estimate marker positions along the course
# The summit loop is markers 313-325 (13 markers)
# We need to find the summit loop portion of the course
# First, find all points within 300m of marker 318 to identify the summit area
summit_indices = []
for i, (lat, lon) in enumerate(course_points):
    d = haversine(lat, lon, MARKER_318[0], MARKER_318[1])
    if d < 350:
        summit_indices.append(i)

if summit_indices:
    loop_start = min(summit_indices)
    loop_end = max(summit_indices)
    print(f"Summit area: indices {loop_start} to {loop_end} ({loop_end - loop_start} points)")
    
    # The loop has 13 markers (313-325) spread roughly evenly
    loop_points = course_points[loop_start:loop_end+1]
    
    # Calculate cumulative distance along the loop
    cum_dist = [0]
    for i in range(1, len(loop_points)):
        d = haversine(loop_points[i-1][0], loop_points[i-1][1], loop_points[i][0], loop_points[i][1])
        cum_dist.append(cum_dist[-1] + d)
    
    total_loop_dist = cum_dist[-1]
    print(f"Total loop distance: {total_loop_dist:.0f}m")
    
    # Space 13 markers evenly
    marker_spacing = total_loop_dist / 13
    estimated_markers = {}
    for m in range(13):
        target_dist = m * marker_spacing
        marker_num = 313 + m
        # Find the point closest to this cumulative distance
        for j in range(len(cum_dist)):
            if cum_dist[j] >= target_dist:
                estimated_markers[marker_num] = loop_points[j]
                break
    
    # Override 318 with known coordinates
    estimated_markers[318] = MARKER_318
    
    for num, coords in sorted(estimated_markers.items()):
        d = haversine(coords[0], coords[1], MARKER_318[0], MARKER_318[1])
        print(f"  Marker {num}: ({coords[0]:.7f}, {coords[1]:.7f}) - {d:.0f}m from 318")

# Priority search zones
zones = [
    {"name": "Zone 1: S 50-100m (96% gap)", "lat": 35.9706087, "lon": -81.1097395, "radius": 25, "priority": "HIGH"},
    {"name": "Zone 2: S 100-150m (89% gap)", "lat": 35.9701595, "lon": -81.1097395, "radius": 25, "priority": "HIGH"},
    {"name": "Zone 3: S 0-50m (79% gap)", "lat": 35.9710578, "lon": -81.1097395, "radius": 25, "priority": "MED"},
    {"name": "Zone 4: SW 100-150m (68% gap)", "lat": 35.9704884, "lon": -81.1107206, "radius": 25, "priority": "MED"},
]

# Generate HTML
html = f"""<!DOCTYPE html>
<html>
<head>
    <title>Rocky Face Mountain Search Coverage v2</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        body {{ margin: 0; padding: 0; }}
        #map {{ position: absolute; top: 0; bottom: 0; width: 100%; }}
        .legend {{
            background: white;
            padding: 10px 14px;
            border-radius: 5px;
            box-shadow: 0 1px 5px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.6;
            max-height: 70vh;
            overflow-y: auto;
        }}
        .legend h3 {{ margin: 0 0 6px 0; font-size: 13px; }}
        .legend-color {{
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 5px;
            vertical-align: middle;
            border-radius: 2px;
        }}
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        var map = L.map('map').setView([{MARKER_318[0]}, {MARKER_318[1]}], 17);
        
        // Satellite imagery
        var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{{z}}/{{y}}/{{x}}', {{
            attribution: 'Esri',
            maxZoom: 20
        }});
        
        // Topo map
        var topo = L.tileLayer('https://{{s}}.tile.opentopomap.org/{{z}}/{{x}}/{{y}}.png', {{
            attribution: 'OpenTopoMap',
            maxZoom: 17
        }});
        
        satellite.addTo(map);
        L.control.layers({{"Satellite": satellite, "Topo": topo}}).addTo(map);

        // TRAIL COURSE (white dashed line)
        var courseCoords = ["""

course_js = ",".join([f"[{p[0]},{p[1]}]" for p in course_points])
html += course_js

html += f"""];
        L.polyline(courseCoords, {{
            color: 'white',
            weight: 2,
            opacity: 0.9,
            dashArray: '6,4'
        }}).addTo(map).bindPopup('Hollow Rock Trail (AllTrails course)');

        // Marker 318 (big gold marker)
        L.marker([{MARKER_318[0]}, {MARKER_318[1]}], {{
            icon: L.divIcon({{
                className: '',
                html: '<div style="background:#FFD700;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;border:2px solid #000;font-size:14px;white-space:nowrap;text-align:center;">318</div>',
                iconSize: [44, 28],
                iconAnchor: [22, 14]
            }})
        }}).addTo(map).bindPopup('<b>Marker 318</b><br>{MARKER_318[0]}, {MARKER_318[1]}<br><b>THE HAIKU TARGET</b><br>3 lines, 18 syllables');
"""

# Add estimated markers
if estimated_markers:
    for num, coords in sorted(estimated_markers.items()):
        if num == 318:
            continue
        html += f"""
        L.marker([{coords[0]}, {coords[1]}], {{
            icon: L.divIcon({{
                className: '',
                html: '<div style="background:rgba(255,255,255,0.8);color:#333;font-size:10px;padding:1px 4px;border-radius:3px;border:1px solid #666;">{num}</div>',
                iconSize: [30, 18],
                iconAnchor: [15, 9]
            }})
        }}).addTo(map).bindPopup('Estimated Marker {num}<br>{coords[0]:.6f}, {coords[1]:.6f}<br><i>Position estimated from trail spacing</i>');
        """

# Distance circles
for r in [50, 100, 150, 200]:
    html += f"""
        L.circle([{MARKER_318[0]}, {MARKER_318[1]}], {{
            radius: {r}, color: '#FFD700', fillOpacity: 0, weight: 1, dashArray: '4,4'
        }}).addTo(map).bindPopup('{r}m from 318');
    """

# GPS tracks
for track in tracks:
    coords_js = ",".join([f"[{p[0]},{p[1]}]" for p in track['points']])
    html += f"""
        L.polyline([{coords_js}], {{
            color: '{track['color']}',
            weight: 3,
            opacity: 0.85
        }}).addTo(map).bindPopup('<b>{track["date"]}</b><br>Activity {track["name"]}<br>{len(track["points"])} trackpoints');
    """

# Priority search zones
for zone in zones:
    color = "#ff0000" if zone["priority"] == "HIGH" else "#ff8800"
    html += f"""
        L.circle([{zone['lat']}, {zone['lon']}], {{
            radius: {zone['radius']},
            color: '{color}',
            fillColor: '{color}',
            fillOpacity: 0.3,
            weight: 2
        }}).addTo(map).bindPopup('<b>{zone["name"]}</b><br>{zone["lat"]:.6f}, {zone["lon"]:.6f}');
    """

# Legend
html += """
        var legend = L.control({position: 'topright'});
        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'legend');
            div.innerHTML = '<h3>Search Coverage</h3>';
            div.innerHTML += '<div><span class="legend-color" style="background:white;border:1px solid #666;"></span> Trail (AllTrails course)</div>';
"""

for track in tracks:
    html += f"""
            div.innerHTML += '<div><span class="legend-color" style="background:{track["color"]}"></span> {track["date"]}: {track["name"][-6:]}</div>';
    """

html += """
            div.innerHTML += '<br>';
            div.innerHTML += '<div><span class="legend-color" style="background:#FFD700;border:2px solid #000;width:10px;height:10px;"></span> Marker 318 (haiku)</div>';
            div.innerHTML += '<div><span class="legend-color" style="background:#ff0000;opacity:0.5;"></span> HIGH priority gap</div>';
            div.innerHTML += '<div><span class="legend-color" style="background:#ff8800;opacity:0.5;"></span> MED priority gap</div>';
            div.innerHTML += '<div style="color:#FFD700;font-size:10px;">- - - 50/100/150/200m rings</div>';
            return div;
        };
        legend.addTo(map);
    </script>
</body>
</html>"""

with open(OUTPUT, 'w') as f:
    f.write(html)

print(f"\nMap generated: {OUTPUT}")
