# Rocky Face Mountain — Creative-but-Disciplined BOTG Search Plan

**Target:** The Lion's Share treasure, hypothesized at Rocky Face Mountain Recreational Area, Alexander County, NC (near Hiddenite / Taylorsville).
**Date:** 2026-05-30
**Bottom line up front:** The desk analysis does **NOT distinctly pin a single spot.** All 16 catalogued candidate spots failed the adversarial pin-test — `survives=true` requires `distinctFit=true AND jcbOk=true`, and **not one spot achieved `distinctFit=true`.** This report therefore presents a **prioritized grid-search order**, not an X-marks-the-spot. It also assumes Rocky Face is the right mountain (the upstream hypothesis); this exercise only asked *where on it*, and the result actually argues that no spot on it is cleanly indicated.

---

## How this data was produced (method — read first)

Three independent passes, deliberately firewalled from each other so the answer couldn't be reverse-engineered:

1. **Exhaustive site inventory, blind to the clues.** The whole ~318–330-acre park (former 1922–early-1940s convict-labor granite quarry, opened 2012, on the NC Registry of Natural Heritage Areas) was inventoried into **16 concrete candidate spots** — summit, quarry cliff/crag, the climbing sub-areas, every overlook and staircase, creeks, the headwater branch, the wetland boardwalk, the prison-camp ruin, the rail-grade remnant, the rare granitic bald, even the playground and the developed core. Source: `botg/rockyface/ROCKY-FACE-CATALOG.json`. Each spot carries hard facts: access route, attributes, hazards, distance to road.

2. **Clue extraction, blind to the target.** Analysts pulled the book's *spatial* constraints from the text **without knowing the target was Rocky Face**, and excluded any passage previously flagged as prior-bias "signal." Each constraint carries a **support weight** = how strongly/often the book indicates it. Source: `botg/rockyface/CLUE-CONSTRAINTS.json`. The dominant high-support constraints are:
   - `near-water-not-crossed` (support **14**) — water adjacent/visible but never crossed.
   - `elevated-overlook` (support **13**) — high spot looking down on lower ground (the single most-recurring spatial signature).
   - `panoramic-view` (9), `rock-niche-cache` (9), `rock-marker` (8) — broad vista, an above-ground rock recess, stone as the host feature.
   - `wooded-with-clearing` (7), `concealed-off-obvious` (6), `trail-accessible` (6), `surface-not-buried` (5), plus the author's hard rules folded in as `within-3mi-road` (4) and the not-dangerous / no-water-crossing / no-cliff-scaling rule.

3. **Score, then adversarially pin-test.** Each spot scored against the blind profile (`rfmatch-*.json`, integer `matchScore`), then stress-tested two ways (`rfverdict-*.json`): **distinctFit** — does a clue land on *this* spot uniquely, or generically across the mountain? — and **jcbOk** — does it pass the author's hard rules?

The discipline that matters: **a clue that fits the whole mountain pins nothing.** Every high scorer here is propped up by generic granite-dome traits — `elevated-overlook`, `panoramic-view`, `rock-marker`, `rounded-stone-shape`, `pale-light-stone`, `green-mossy-contrast`, `within-3mi-road` — which *any* high rock on this bornhardt shares equally. That is precisely why even the top scorer fails distinctFit.

---

## The honest headline: nothing is distinctly pinned

`survives` is **false for all 16 spots; `distinctFit` is false for all 16.** Scores below are the `matchScore` from each spot's `rfmatch-*.json`.

| Rank | Spot | matchScore | distinctFit | jcbOk |
|---|---|---|---|---|
| 1 | **Rocky Face summit (granite dome high point)** | **74** | no | **yes** |
| 2 | **Rare granitic-dome flatrock / bald** | **63** | no | **yes** |
| 3 | **Quarry Overlook (top of Buzzard Loop stone staircase)** | **58** | no | **yes** |
| 4 | Quarry cliff face / main crag | 47 | no | no |
| 5 | Open granite face, Vertical Mile route | 44 | no | no |
| 6 | Left Face climbing area (end of the cables) | 41 | no | no |
| 6 | Quarry rim cable-fence overlook (Hollow Rock Trail) | 41 | no | no |
| 6 | **Bottom Ledge (quarry base, Sections 3–5)** | **41** | no | **yes** |
| 9 | Prison Camp site | 33 | no | yes |
| 10 | Stone-cut staircase, Hollow Rock start | 28 | no | yes |
| 11 | Grindstone Trail creek crossing | 27 | no | no |
| 12 | Railroad spur / old rail grade | 24 | no | yes |
| 13 | Rocky Face Branch headwater (south end) | 22 | no | yes |
| 13 | Main parking / developed core | 22 | no | yes |
| 15 | Wetlands boardwalk & observation decks | 14 | no | yes |
| 15 | Children's adventure playground | 14 | no | yes |

*(The adversarial judge flagged that the summit's 74 and the bald's 63 are **inflated by many low-support cosmetic hits** — rounded-stone-shape, pale-light-stone, green-mossy-contrast, open-to-elements — while the highest-support discriminators MISS. Score alone is not a pin.)*

**The structural problem (the single most important finding).** The book's dominant signature is **water-nearby + high + commanding view + a concealing rock niche.** No catalogued spot carries all four:

- The high/view spots (summit, flatrock bald, quarry overlook, vertical-mile face) are **dry open exposed rock.** They MISS `near-water-not-crossed` (14) and only PARTIAL on `rock-niche-cache` (9), and they are the *opposite* of `concealed-off-obvious` — the summit is the single most-visited spot in a ~200k-visitor/yr park.
- The niche/water spots (Bottom Ledge, cliff base, creeks, headwater, wetland) are **low and viewless.** They MISS `elevated-overlook` (13) and `panoramic-view` (9).

The clue profile wants a feature the inventory says doesn't exist on this mountain as one clean unit. Read straight, that is mild evidence the decisive micro-spot was never inventoried — **or** that Rocky Face is the wrong mountain. Per repo memory, the user has already searched part of Rocky Face and found nothing where checked. Calibrate down.

---

## Ranked BOTG search zones (prioritized grid order, NOT a pin)

Ranked for a half-day on-the-ground sweep, filtered to **JCB-legal** spots (the cliff/crag, Vertical-Mile slab, cable-fence rim, Left-Face cables and Grindstone creek-crossing are excluded — they returned `jcbOk=false` for cliff-scaling / water-crossing / danger). Confidence is **low across the board.** This is "if you walk the mountain, walk it in this order," not "the box is in Zone 1." Park entrance: **3451 Rocky Face Church Road, Hiddenite, NC 28636** (drive-up lot 1.2 mi in; all trailheads originate here; the whole park is well within 3 mi of road).

### Zone 1 — Summit dome perimeter & its rock-to-tree margins (top score, JCB-legal)
- **Where / access:** The granitic dome high point, ~1795–1818 ft, ~600 ft above the Piedmont. Top of **Hollow Rock Trail** (or the Vertical Mile route), ~1–2.5 mi on foot from the main lot. Well under 3 mi from road.
- **Clues that landed (matchScore 74, 13 hits):** `elevated-overlook` (13, **strong** — literally the high point, prominence 607 ft), `panoramic-view` (9, **strong** — views in all directions; Pores Knob, Wilkes peaks, on clear days Grandfather/Table Rock/Hawksbill/Black Mtns), `rock-marker` (8, strong — bare grey granite, picnic tables on the rock), plus `rounded-stone-shape` (8), `pale-light-stone` (5), `green-mossy-contrast` (5), `surface-not-buried` (5), `trail-accessible` (6), `within-3mi-road` (4), `open-to-elements` (2).
- **What MISSED (be honest):** `near-water-not-crossed` (14, the **highest-support clue of all**), `concealed-off-obvious` (6), `saddle-gap-notch` (4); `rock-niche-cache` is only PARTIAL (a broad bare dome offers few deep undercuts). The single strongest discriminator misses, and the box's concealment requirement is actively violated. That is why it does not pin.
- **JCB check: PASS.** Within 3 mi of road, walkable trail, no climb, no water crossing, surface cache possible, findable under light snow (bare granite sheds snow).
- **What to look for on the ground:** Do NOT search the open exposed slab — heavy traffic, zero concealment, a self-defeating hide for the *largest* box. Work the **perimeter where the bare dome meets the treeline and broken rock**: under-boulder recesses, deeper exfoliation cracks at the rock-to-soil margin, the base of any solitary summit tree (`tree-landmark`, support 4), any cairn / distinctive marker stone. Test the **east-facing edge** (`east-facing`, support 4 — sunrise cue) for a niche with a downhill sightline. Check **vernal pools / weather pits** in the rock — the only way the dominant water clue could be satisfied *at* the high point.

### Zone 2 — Rare granitic-dome flatrock / bald margins (2nd score, JCB-legal, creative)
- **Where / access:** The rare Low Elevation Granitic Dome community along the summit trails, upper mountain near 1795 ft. On established trails; under 3 mi from road. NC Registry of Natural Heritage Areas.
- **Clues that landed (matchScore 63, 12 hits):** `elevated-overlook` (13), `panoramic-view` (9), `rock-marker` (8), `rounded-stone-shape` (8), `wooded-with-clearing` (7, **HIT — textbook forest-meets-open-rock edge**), `trail-accessible` (6), `pale-light-stone` (5), `green-mossy-contrast` (5), `surface-not-buried` (5), `within-3mi-road` (4), plus PARTIAL on `near-water` (vernal pools), `rock-niche-cache` (shallow seams) and `bowl-hollow-depression` (vernal pools).
- **What MISSED:** `concealed-off-obvious` (6 — an open bald is the opposite of tucked-away), `east-facing` (4), `small-confirming-mark` (4), `pace-count` (3), `saddle-gap-notch` (4). The judge notes an open bald has **no defensible pinpoint** and the inflated 63 is not a meaningful discriminator.
- **JCB check: PASS** (but stay on-trail: an off-trail hide would step into a protected rare-plant community).
- **Why it's Zone 2:** It is the only spot besides the summit that lands `wooded-with-clearing` (the "forest meets open ground / past a tree line" cue, support 7) **and** has shallow soil-mat pockets/seams plus vernal pools — i.e., the one high place that even partially touches the niche *and* water clues. Plus it is a *named, ecologically distinctive* feature (Keever's bristle moss, Keever's onion, prickly pear) — the "captivating, research-further" kind of detail the author favors.
- **What to look for on the ground:** Work the **flatrock-to-soil margin and the woodland edge just past the tree line.** Inspect **solution/weather pits** that pond rainwater seasonally — a single feature that could satisfy both the water and niche clues — and any shallow rock seam beside a distinctive marker stone, at the base of an edge red cedar.

### Zone 3 — Quarry Overlook at the top of the Buzzard Loop stone staircase (JCB-legal)
- **Where / access:** Overlook ~100 ft above the quarry floor, at the top of the built **rock staircase** that starts and ends the **Buzzard Loop Trail** (0.8 mi, purple) on the west side of the old quarry. Very close to the entrance; well under 3 mi.
- **Clues that landed (matchScore 58, 9 hits):** `elevated-overlook` (13, strong), `rock-marker` (8, strong — the built rock staircase is a fixed, countable stone landmark), `trail-accessible` (6), `surface-not-buried` (5), `within-3mi-road` (4), `angular-faceted-rock` (5 — cut/blocky/stepped quarry stone), `open-to-elements` (2); PARTIAL on `panoramic-view` (view is into the pit, not a broad valley) and `rock-niche-cache` (staircase/edge gaps, undocumented).
- **What MISSED:** `near-water-not-crossed` (14), `concealed-off-obvious` (6 — a named "pause point"), `east-facing` (4 — it faces WEST into the pit), `tree-landmark` (4). Same fatal water gap as the summit; and the catalog lists **two competing stone staircases** plus the cable-fence rim and the summit that match the same generic cues equally.
- **JCB check: PASS** (the platform/staircase is legal; do **not** approach the unfenced quarry edge).
- **What to look for on the ground:** The **stone staircase itself and the outcrop behind the platform** (away from the drop). Check undersides and gaps between cut stones, recesses in the outcrop. This is the most "designed-feeling" spot — high + view + a literal stone ascent — consistent with the book's "blaze the path / don't give up / climb" motifs and a countable `pace-count` (support 3) up the steps.

### Zone 4 — Bottom Ledge / quarry base (the ONLY spot where the niche clue truly lands; JCB-legal)
- **Where / access:** Base of the quarry, climbing **Sections 3–5**, adjacent to the paved track — effectively road level. Standing at the base needs no climbing (permit only to climb).
- **Clues that landed (matchScore 41, 9 hits):** `rock-niche-cache` (9, **strong** — named features *Dirty Chimney, Black Hole, Lightning Crack* are real above-ground rock recesses to reach into; the **single best niche evidence in the entire catalog**), `rock-marker` (8, strong), `trail-accessible` (6), `surface-not-buried` (5), `within-3mi-road` (4), `angular-faceted-rock` (5), `bowl-hollow-depression` (4 — the quarry pit is a literal basin), `small-confirming-mark` (4 — bolts/route names); PARTIAL on `near-water` (quarry-floor seeps / nearby wetland & branch headwater, not directly adjacent).
- **What MISSED:** `elevated-overlook` (13), `panoramic-view` (9) — it is the quarry *floor*, low and enclosed.
- **JCB check: PASS.** Standable base, not the cliff itself (avoid the loose wall/rockfall zone above), no water crossing, road-level, easiest carry on the mountain.
- **Why it's still Zone 4 despite a low score:** It fails the dominant high/view signature, but it is the **one place the high-support concealment-niche clue (9) has strong physical evidence** *and* it brushes the water clue via floor seeps/the nearby wetland. If the analysts over-weighted "view" and the real signal is "hidden recess near water," this rises sharply. Hedge against that interpretive risk by checking it. (Caveat: a high-traffic active climbing zone is a weak long-term hide for a multi-million-dollar box.)
- **What to look for on the ground:** Stable base boulders/talus with **deep, dry under-rock cavities** big enough for a sizable box (the Lion's Share is the biggest box — size constrains the niche). Inspect the named cracks (Dirty Chimney, Black Hole, Lightning Crack) at reach height; look for a `small-confirming-mark` on undersides/bases. Avoid anything directly under the loose quarry wall.

> **Do NOT search (JCB hard-rule violations — these returned `jcbOk=false`):** Quarry cliff face / main crag, Left Face cables, Vertical Mile bare slab, quarry rim cable-fence edge, Grindstone **creek crossing.** They trip no-cliff-scaling / no-water-crossing / not-dangerous. The author has stated the hide is not dangerous; a legitimate solution will not require any of these.

---

## Confidence statement (plain)

- **Does the desk analysis pin anything? No.** `distinctFit=false` for all 16 spots; the kill criterion on every legal spot is "distinctFit." Every hit propping up the high scorers is generic to the granite dome and matches the summit, the bald, and the Vertical-Mile face equally.
- **Best available zones:** Summit (74) and flatrock bald (63) by score; Quarry Overlook (58) for its built-stone landmark; Bottom Ledge (41) for the lone strong concealment evidence. Treat 1–4 as a **grid-search order**, not a strong likelihood ranking.
- **Confidence the box is on Rocky Face at all:** This exercise assumed it and could **not** corroborate it. The four-part clue signature (water + high + view + niche, together) matches no inventoried spot. That is mild evidence against the site, or evidence the decisive micro-spot wasn't catalogued. With the user's prior null result on part of the mountain, overall confidence is **low.**

---

## The single cheapest tie-breaker to resolve next

**Settle the water question by direct observation.** `near-water-not-crossed` is the **highest-support clue in the whole profile (14)** and it is the deciding MISS that knocks out the summit, the bald, and the Quarry Overlook. One on-site check (or a careful map/photo check) answers it:

> **From the summit, the flatrock bald, and the Quarry Overlook platform, is any water — a vernal/weather pool on the rock, the quarry pit pool, a stream, or a distant reservoir — actually *visible* or immediately adjacent?**

- If **yes** (e.g., a reliable weather pool on the summit/bald, or the quarry pool in view from the overlook), that spot satisfies all four high-support clues at once and **vaults from "best of a generic field" to genuinely indicated** — the closest thing to a pin this analysis can produce.
- If **no**, the high-and-viewed spots are confirmed dead on the water clue, and the search pivots to a **low concealed niche near water (Zone 4)** or to the question of whether **Rocky Face is the wrong mountain.**

This one observation moves the most probability for the least effort. Resolve it before any further BOTG time.

**Second-cheapest tie-breaker:** Confirm the **east/sunrise orientation** of the summit perimeter and the bald margin (`east-facing`, support 4). An east-facing niche on a high edge with water in view would be the strongest single target on the mountain.

---

## Speculative leads worth a look (clearly low-confidence, NOT in the blind scoring)

1. **"Hiddenite" wordplay (SPECULATIVE).** The park's town, **Hiddenite, NC**, is named for the rare green gem hiddenite — literally "the hidden one." For a book about hidden things, a town whose name *means hidden* is the kind of layered cue the author plants. This argues for re-examining the mountain rather than abandoning it; correlate with any gem / green / "hidden" imagery in the book text.
2. **Solution pits on the flatrock/bald (SPECULATIVE).** Granitic flatrocks weather into shallow **weather pits / vernal pools** that pond rainwater. Such a pit could satisfy *both* the highest-support water clue (14) and a niche in one viewless-but-distinctive high feature — a back door around the high-scorers' fatal water MISS. Inspect flatrock margins for a pit beside a marker stone.
3. **The stone staircase as a deliberate "ascend-to-arrive" device (SPECULATIVE).** Buzzard Loop's cut-stone staircase is a countable, fixed stone landmark sitting directly below a view platform — consistent with the book's "blaze the path / don't give up / climb" motifs and a `pace-count` up the steps. Check the staircase stones themselves, not just the platform.
4. **Convict-labor history features (SPECULATIVE).** The **Prison Camp site** (33) and **old rail spur** (24) are named, history-laden, man-made remnants distinct from natural rock — the sort of proper-named feature a clue could match *by name*. They score low and lack any view/water/niche evidence, so this is a long shot, but their *names* are worth cross-checking against the book's wording.

---

*All claims trace to `ROCKY-FACE-CATALOG.json` (site facts), `CLUE-CONSTRAINTS.json` (blind clues + support weights), `rfmatch-*.json` (per-spot integer match scores), and `rfverdict-*.json` (adversarial pin-test flags: every spot `survives=false`, `distinctFit=false`). No coordinates were invented; access details and scores are taken from those files.*
