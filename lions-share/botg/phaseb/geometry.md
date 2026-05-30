# Phase B — Geometry / Bounded Zone Analysis

**Role:** Geometry / bounded-zone agent.
**Frame:** "Triangulation" is a THEORY, not a method. The four in-text ledger anchors do NOT
produce a centroid X. They produce a **bounded zone** that seeds/bounds the search. The actual
pinpointing is done by the region-agnostic discriminators (Group P terrain/flora; Group Q hard
filters) operating *inside* this zone.

**Honesty up front:** This document defines a region, not a point. Nothing here should be read as
"the treasure is at the centroid." The centroid of a set of biographical anchors has no physical
meaning for a hide; it is reported only as a descriptive summary statistic of where the anchor mass
sits.

> Tooling note: Live web search confirmed Hiddenite/Emerald Hollow Mine and the Brushy Mountains
> public-land status (see below). Statesville/Bakersville/Chapel Hill coordinates are from
> established geographic knowledge of these well-known NC towns, rounded to ~0.01 deg — accurate
> for zone geometry (tens-of-miles scale). Confidence is flagged per anchor.

---

## 1. Geo-fix of the four ledger anchors

| Anchor | County | Lat | Lon | Confidence | Book hook |
|---|---|---|---|---|---|
| **Hiddenite** (Emerald Hollow Mine) | Alexander | 35.914 N | 81.083 W | **Confirmed** (mindat) | Ch4 childhood emerald mine. Town center 35.905 N, 81.086 W (Wikipedia). |
| **Statesville** | Iredell | 35.78 N | 80.89 W | High (named town) | Ch18 parents' church |
| **Bakersville** | Mitchell | 36.01 N | 82.16 W | High (named town) | Ch3 box-maker Seth Gould; "40 mi NE of Asheville" |
| **Chapel Hill** | Orange | 35.91 N | 79.06 W | High (named town) | Ch2/Ch13 college |

Source confirmations: Emerald Hollow Mine = 35°54'49"N 81°04'57"W = 35.9137, -81.0828 (mindat.org).
Hiddenite town = 35°54'19"N 81°05'10"W (Wikipedia). Both land within ~0.01 deg of the value used.

Sanity check on Bakersville's in-text descriptor: Asheville is ~35.60 N, 82.55 W. Bakersville
(36.01 N, 82.16 W) lies ~30 mi NNE-to-NE of Asheville by air, ~40 mi by road — consistent with the
"40 mi NE of Asheville" phrasing. Anchor coordinate accepted.

---

## 2. The tight western cluster (Hiddenite – Statesville – Bakersville)

These three are the geometric core. Pairwise approximate air distances:

- Hiddenite ↔ Statesville: ~14 mi (very tight; both in the Catawba/upper-Yadkin Piedmont,
  flanking the southeast toe of the Brushy Mountains).
- Hiddenite ↔ Bakersville: ~60 mi WNW.
- Statesville ↔ Bakersville: ~73 mi WNW.

**Bounding box of the three western anchors (lat/lon extent):**
- South edge: ~35.78 N (Statesville)
- North edge: ~36.01 N (Bakersville)
- East edge: ~80.89 W (Statesville)
- West edge: ~82.16 W (Bakersville)
- **Box:** 35.78–36.01 N, 80.89–82.16 W
- **Span:** ~0.23 deg lat (~16 mi N–S) x ~1.27 deg lon (~71 mi E–W at this latitude). It is a thin,
  predominantly **E–W trending corridor**, not a compact blob — the spread is almost entirely
  longitudinal.

**Descriptive centroid of the three** (mean of the three points; a summary statistic only, NOT a
target): ~35.90 N, 81.38 W. That falls in the western Catawba/Caldwell Piedmont near the
**Brushy Mountains – Blue Ridge front** transition (roughly the Lenoir / Hudson / upper Catawba
County area, SE of Grandfather Mountain). Useful as a label for "where the western mass sits," not
as an X.

**The connecting corridor.** The line Statesville → Hiddenite → (NW) → Bakersville traces a real,
coherent physical gradient:
1. **Upper Piedmont floor** around Statesville/Hiddenite (~900–1,200 ft), with the isolated
   **Brushy Mountains** rising as a detached monadnock spur immediately NW of Hiddenite (Brushy
   summits reach ~2,400–2,600 ft, e.g. the ridge running toward Wilkes County).
2. **Blue Ridge front / escarpment** as you go NW from the Brushies through Caldwell/Burke up into
   **Avery/Mitchell**, climbing onto the Blue Ridge proper (3,000–6,000+ ft; Roan/Grandfather
   massif).
3. **Bakersville** sits in the Toe River valley on the inner (NW) side of that climb, in the
   Roan Highlands' foothills.

So the western cluster is best described as a **Piedmont-floor-to-Blue-Ridge-escarpment transect**:
low rolling Piedmont in the SE (Statesville/Hiddenite), the Brushy Mountains as the first relief, then
the Blue Ridge escarpment, then the high country around Bakersville. This corridor is the natural
"zone" — it has the elevation gradient, the escarpment vantages, and the water that the
discriminators want.

---

## 3. How much Chapel Hill stretches the zone

Chapel Hill (35.91 N, 79.06 W) is the **eastern outlier**:

- Hiddenite ↔ Chapel Hill: ~115 mi E.
- Statesville ↔ Chapel Hill: ~104 mi E.
- Bakersville ↔ Chapel Hill: ~175 mi E.

Adding Chapel Hill blows the bounding box out to **35.78–36.01 N, 79.06–82.16 W** — span ~0.23 deg
lat (~16 mi) x **3.10 deg lon (~174 mi E–W)**. The N–S extent does not change at all (Chapel Hill is
at almost exactly Hiddenite's/Bakersville's latitude, ~35.9–36.0 N). Chapel Hill is purely an
**eastward stretcher along the same latitude band**.

**Verdict — treat Chapel Hill as an OUTLIER / consistency-check, NOT as in-zone:**
- It does NOT tighten the western cluster; it triples the E–W span while contributing nothing in
  N–S. A "zone" containing it would be a ~170-mi-long, ~16-mi-tall ribbon — too diffuse to be a
  search region.
- However, it is a useful **latitude consistency-check**: all four anchors sit in the narrow band
  ~35.78–36.01 N (a ~16-mile-tall stripe across the whole state). If the hide region had to be one
  thing, the *latitude* signal (~35.8–36.0 N) is the most stable cross-anchor fact, and the western
  three pin the *longitude* to ~81–82.2 W.
- Practical handling: **do NOT force Chapel Hill into the searchable zone.** Use the western three
  to bound the zone in 2-D; use Chapel Hill only to confirm the latitude band and to remember the
  hide could in principle be anywhere on that ~35.9 N line (i.e., don't let the cluster make us
  blind, but don't search Orange County's flat Piedmont on the strength of a college reference —
  Orange County lacks the escarpment relief the Ch4 vantage discriminator demands).

---

## 4. Accessible public-land types inside the western cluster zone

The Piedmont-to-escarpment corridor (35.78–36.01 N, 80.89–82.16 W, plus the immediate Blue Ridge
front just NW of it) contains a strong inventory of accessible public land. Candidates that satisfy
the Group Q "public + within ~3 mi of a road" hard filter, ordered roughly W→E:

**High country / Roan–Toe end (near Bakersville, Mitchell/Avery):**
- **Pisgah National Forest – Toecane / Appalachian Ranger District** (large public acreage
  surrounding Bakersville; Roan Highlands).
- **Roan Mountain / Roan Highlands** (Pisgah NF + adjoining state lands; Carvers Gap area straddles
  the NC/TN line) — classic high-vantage, blue/pink spring wildflower habitat (Catawba
  rhododendron = pink; many blue spring ephemerals), gets real winter snow, bear + timber
  rattlesnake habitat. Strong discriminator match.
- **Mount Mitchell State Park** (just SW of the cluster's NW corner; highest point east of the
  Mississippi) — escarpment vantage, snow, road access.
- NC Wildlife **game lands** in the Toe River / Roan area.

**Escarpment front (Caldwell/Burke/Avery, between the cluster ends):**
- **Pisgah National Forest – Grandfather Ranger District** (large block on the Blue Ridge front).
- **Grandfather Mountain State Park** (escarpment, high vantage onto the Piedmont).
- **Wilson Creek Wild & Scenic / Wilson Creek Gorge** (Pisgah NF; gorge + water, road-accessible).
- **Linville Gorge Wilderness & Linville Falls** (Pisgah NF) — gorge, water, dramatic vantages;
  note "Wilderness" + cliffs may bump against the "not dangerous / no cliff scaling" Group Q
  filter, so favor the accessible overlook/trail margins, not the inner gorge.
- **South Mountains State Park** (Burke County, just S of the corridor) — waterfalls, oak forest,
  vantage ridges, bear + snake habitat, snow; very strong all-around discriminator match and
  road-accessible. Worth flagging as a high-interest block.
- **Blue Ridge Parkway** corridor land threads the whole front (public, road-adjacent, many
  vantages onto lower country — definitionally the "view that opens onto lower country").

**Brushy Mountains / Piedmont end (Alexander/Wilkes/Caldwell, near Hiddenite-Statesville):**
- **Rocky Face Mountain Recreation Area** (Alexander County park, 318 ac, off Rocky Face Church Rd
  near Hiddenite; ~35.95 N, 81.18 W). The ONE confirmed-public natural-terrain block in Alexander
  County (county research: no NF, no state park, no game land in-county otherwise). Low-elevation
  granitic dome, ~1,800 ft summit rising ~600 ft over the Piedmont, panoramic views reaching
  Grandfather/Table Rock/Black Mtns, multiple creeks, exposed-rock "Hollow Rock" features, oaks/
  pines/red cedar, bear+snake habitat, snow. Strongest single discriminator match nearest the
  Hiddenite/Statesville anchors and a textbook "view opens onto lower country" landform. Within
  ~3 mi of road. (Already the prior NC focus; included here as the closest in-zone public block.)
- **Brushy Mountains State Natural Area (in formation)** — NEW per live search (2025): Blue Ridge
  Conservancy + Foothills Conservancy assembled ~1,460+ ac (the 1,275-ac Broyhill/Broyhill-area
  "Vannoy Ridge" tract plus adjoining parcels) intended for transfer to **NCWRC as game land**.
  Sits at the **Wilkes/Alexander/Iredell county tripoint** — i.e., immediately N/NE of the
  Hiddenite anchor and N of Statesville. ~100+ ac of it is in Alexander County; bulk in Wilkes.
  Mature hardwood, riparian (Bussels Creek), Keever's Onion habitat. CAVEAT: public-access status
  is PENDING the transfer/management plan — verify before treating as accessible public land
  (Group Q hard filter). If/when opened, it is the second in-zone public block touching the
  Hiddenite anchor and squarely a "Brushy crest over Piedmont" vantage landform.
- **Fort Defiance / Yadkin valley** historic/public sites (Caldwell) — context, low relief.
- **Lake Norman State Park** (Iredell, S of Statesville) — public + water, but low/flat; weak on
  the vantage discriminator.
- **Rendezvous Mountain State Forest / Educational State Forest** (Wilkes, NW of Hiddenite) — small
  public mountain with vantage; worth a look as a Brushy-front analog.
- **Stone Mountain State Park** (Wilkes/Alleghany, NE of the corridor) — granite dome, water,
  vantages; slightly N/E of the tight box but in the same escarpment family.

> The densest concentration of discriminator-satisfying public land is the **Blue Ridge front
> between Bakersville and the Brushy Mountains** — i.e., the Pisgah NF Grandfather/Toecane blocks,
> South Mountains SP, and the Brushy/Rendezvous monadnocks. This is the heart of the bounded zone.

---

## 5. The Ch4 "view opens onto lower country" landform — where it lives in this zone

Ch4's vantage-as-key landform ("a view that opens onto lower country") is produced wherever **high
ground stands directly over markedly lower ground with an open outlook**. In this zone that occurs in
three distinct relief settings, from E to W:

1. **Brushy Mountains over the Piedmont (closest to the Hiddenite/Statesville anchors).** The
   Brushies are a detached spur rising ~1,200–1,500 ft above the surrounding ~1,000-ft Piedmont
   floor. From their crest you look out (S/SE) onto the lower Piedmont — a textbook "view opens onto
   lower country" at modest, non-dangerous elevation, within a few miles of roads, and adjacent to
   the two eastern anchors. **Confirmed public block here: Rocky Face Mountain Rec Area** (granitic
   dome, ~1,800 ft, panoramic views over the foothills) — the concrete realization of this landform
   nearest the Hiddenite anchor. The emerging **Brushy Mountains State Natural Area** would add a
   second such crest if it opens to public access (status pending). Rendezvous Mountain (Wilkes) is
   a further confirmed-public Brushy-front analog.

2. **The Blue Ridge Escarpment front (Caldwell/Burke/Avery — middle of the corridor).** This is the
   single most dramatic and literal expression: the Blue Ridge escarpment is the abrupt
   ~2,000–3,000-ft drop where the mountains end and the Piedmont begins. Overlooks along the **Blue
   Ridge Parkway**, **Grandfather Mountain**, **South Mountains SP** ridges, and the
   **Linville/Wilson Creek** rim all "open onto lower country" by design. This front is the most
   defensible reading of Ch4's landform and sits squarely between the western anchors.

3. **Roan Highlands / Mount Mitchell area (Bakersville end).** Highest relief, biggest views, best
   blue+pink wildflower and snow match — but these are vistas onto *other mountains/valleys* more
   than onto true "lower country (Piedmont)," and altitude/exposure pushes on the "not dangerous /
   winter access" filters. Good discriminator match on flora/water/sky; slightly weaker on the
   specific "lower country" semantics.

**Synthesis of the landform read:** The phrase "view opens onto lower country" most precisely
describes an **escarpment or monadnock edge looking out over the Piedmont**, which in this zone means
the **Blue Ridge front (Grandfather/South Mountains/Parkway overlooks)** as the dramatic version and
the **Brushy Mountains crest over the Hiddenite Piedmont** as the close-to-anchor modest version.
Both lie inside the bounded zone; both should be worked by the terrain/access agents. This document
does not select between them — that is a discriminator/field decision.

---

## 6. Bottom line (bounded zone, not a point)

- **Searchable bounded zone (western three anchors):** ~**35.78–36.01 N, 80.89–82.16 W** — a thin,
  E–W corridor running from the Statesville/Hiddenite Piedmont, NW across the Brushy Mountains and
  Blue Ridge escarpment, to the Bakersville/Roan high country. ~16 mi tall x ~71 mi wide.
- **Descriptive centroid of the three (NOT a target):** ~35.90 N, 81.38 W (western Catawba/Caldwell
  Piedmont near the Blue Ridge front).
- **Chapel Hill:** outlier / latitude consistency-check only. It confirms the ~35.8–36.0 N latitude
  band but stretches the box to ~174 mi E–W if forced in; do NOT search the flat Orange County
  Piedmont on its strength (no escarpment relief for the Ch4 vantage).
- **Highest-value public land inside the zone:** the Blue Ridge front block — **Pisgah NF
  (Grandfather/Toecane), South Mountains SP, Linville/Wilson Creek, Blue Ridge Parkway overlooks,
  Roan Highlands**, plus the **Brushy Mountains/Rendezvous Mtn** monadnocks nearest the
  Hiddenite/Statesville anchors.
- **Honesty gate:** This is a region. No point is asserted. Hand off to the discriminator/terrain and
  land-ownership agents to test specific accessible-public-land spots inside this corridor on their
  own merits.
