import xml.etree.ElementTree as ET
import math
import os

GPX_DIR = "/Users/ipatterson/dev/treasure-hunt/lions-share/botg/gpx_files"
OUTPUT = "/Users/ipatterson/dev/treasure-hunt/lions-share/botg/search-coverage-map.html"

MARKER_318 = (35.9712824139155, -81.10973949661587)

# Colors for each track
TRACK_COLORS = [
    "#e6194b", "#3cb44b", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6"
]

# Parse all GPX files
tracks = []
gpx_files = sorted([f for f in os.listdir(GPX_DIR) if f.endswith('.gpx')])

for i, fname in enumerate(gpx_files):
    tree = ET.parse(os.path.join(GPX_DIR, fname))
    root = tree.getroot()
    ns = {'gpx': 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2'}
    
    points = []
    # Try GPX format
    for elem in root.iter():
        if elem.tag.endswith('}trkpt') or elem.tag == 'trkpt':
            lat = float(elem.get('lat'))
            lon = float(elem.get('lon'))
            points.append((lat, lon))
    
    if points:
        # Determine date from filename
        activity_id = fname.replace('activity_', '').replace('.gpx', '')
        if activity_id.startswith('218'):
            date = "Feb 14-15"
        else:
            date = "Mar 30 (today)"
        
        tracks.append({
            'name': fname,
            'date': date,
            'points': points,
            'color': TRACK_COLORS[i % len(TRACK_COLORS)]
        })

# Priority search zones from the analysis
zones = [
    {"name": "Zone 1: S 50-100m (96% gap)", "lat": 35.9706087, "lon": -81.1097395, "radius": 25, "priority": "HIGH"},
    {"name": "Zone 2: S 100-150m (89% gap)", "lat": 35.9701595, "lon": -81.1097395, "radius": 25, "priority": "HIGH"},
    {"name": "Zone 3: S 0-50m (79% gap)", "lat": 35.9710578, "lon": -81.1097395, "radius": 25, "priority": "MED"},
    {"name": "Zone 4: SW 100-150m (68% gap)", "lat": 35.9704884, "lon": -81.1107206, "radius": 25, "priority": "MED"},
]

# Trail markers (approximate positions from the map)
markers = {
    "318": MARKER_318,
}

# Generate HTML with Leaflet map
html = f"""<!DOCTYPE html>
<html>
<head>
    <title>Rocky Face Mountain Search Coverage</title>
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
            font-size: 12px;
            line-height: 1.8;
            max-height: 80vh;
            overflow-y: auto;
        }}
        .legend h3 {{ margin: 0 0 8px 0; font-size: 14px; }}
        .legend-color {{
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            vertical-align: middle;
            border-radius: 2px;
        }}
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        var map = L.map('map').setView([{MARKER_318[0]}, {MARKER_318[1]}], 17);
        
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{{z}}/{{y}}/{{x}}', {{
            attribution: 'Esri World Imagery',
            maxZoom: 20
        }}).addTo(map);

        // Marker 318
        var marker318 = L.marker([{MARKER_318[0]}, {MARKER_318[1]}], {{
            icon: L.divIcon({{
                className: 'marker-318',
                html: '<div style="background:#FFD700;color:#000;font-weight:bold;padding:3px 6px;border-radius:4px;border:2px solid #000;font-size:13px;white-space:nowrap;">318</div>',
                iconSize: [40, 24],
                iconAnchor: [20, 12]
            }})
        }}).addTo(map).bindPopup('<b>Marker 318</b><br>35.9712824, -81.1097395<br>THE HAIKU TARGET');

        // Distance circles from 318
        L.circle([{MARKER_318[0]}, {MARKER_318[1]}], {{
            radius: 50, color: '#FFD700', fillOpacity: 0, weight: 1, dashArray: '5,5'
        }}).addTo(map).bindPopup('50m radius');
        L.circle([{MARKER_318[0]}, {MARKER_318[1]}], {{
            radius: 100, color: '#FFD700', fillOpacity: 0, weight: 1, dashArray: '5,5'
        }}).addTo(map).bindPopup('100m radius');
        L.circle([{MARKER_318[0]}, {MARKER_318[1]}], {{
            radius: 150, color: '#FFD700', fillOpacity: 0, weight: 1, dashArray: '5,5'
        }}).addTo(map).bindPopup('150m radius');
        L.circle([{MARKER_318[0]}, {MARKER_318[1]}], {{
            radius: 200, color: '#FFD700', fillOpacity: 0, weight: 1, dashArray: '5,5'
        }}).addTo(map).bindPopup('200m radius');

        // GPS tracks
"""

for track in tracks:
    coords_js = ",".join([f"[{p[0]},{p[1]}]" for p in track['points']])
    html += f"""
        L.polyline([{coords_js}], {{
            color: '{track['color']}',
            weight: 3,
            opacity: 0.8
        }}).addTo(map).bindPopup('{track["name"]}<br>{track["date"]}<br>{len(track["points"])} points');
    """

# Priority search zones
for zone in zones:
    color = "#ff0000" if zone["priority"] == "HIGH" else "#ff8800"
    html += f"""
        L.circle([{zone['lat']}, {zone['lon']}], {{
            radius: {zone['radius']},
            color: '{color}',
            fillColor: '{color}',
            fillOpacity: 0.25,
            weight: 2
        }}).addTo(map).bindPopup('<b>{zone["name"]}</b><br>{zone["lat"]:.6f}, {zone["lon"]:.6f}<br>Priority: {zone["priority"]}');
    """

# Legend
html += """
        // Legend
        var legend = L.control({position: 'topright'});
        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'legend');
            div.innerHTML = '<h3>Search Coverage Map</h3>';
"""

for track in tracks:
    html += f"""
            div.innerHTML += '<div><span class="legend-color" style="background:{track["color"]}"></span>{track["date"]}: {track["name"].replace("activity_","").replace(".gpx","")}</div>';
    """

html += """
            div.innerHTML += '<br><div><span class="legend-color" style="background:#FFD700;border:2px solid #000;width:10px;height:10px;"></span> Marker 318 (haiku target)</div>';
            div.innerHTML += '<div><span class="legend-color" style="background:#ff0000;opacity:0.5"></span> HIGH priority gap zone</div>';
            div.innerHTML += '<div><span class="legend-color" style="background:#ff8800;opacity:0.5"></span> MED priority gap zone</div>';
            div.innerHTML += '<div style="color:#FFD700">- - - Distance rings (50/100/150/200m)</div>';
            return div;
        };
        legend.addTo(map);
    </script>
</body>
</html>"""

with open(OUTPUT, 'w') as f:
    f.write(html)

print(f"Map generated: {OUTPUT}")
print(f"Tracks loaded: {len(tracks)}")
for t in tracks:
    print(f"  {t['name']}: {len(t['points'])} points ({t['date']})")
