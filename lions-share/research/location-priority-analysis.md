# Lion's Share Treasure - Location Priority Analysis

*Analysis conducted 2026-01-09*
*Methodology: ETL Consolidation + Confirmation Bias Mitigation*

---

## Executive Summary

Based on analysis of `summary.md` facts (without reading existing hypotheses), **North Carolina** emerges as the highest-priority state, with **Rocky Face Mountain Recreational Area** in Hiddenite as a specific location of interest. California is a secondary candidate due to the author's current residence.

### Priority Ranking

| Priority | State | Score | Confidence | Key Factor |
|----------|-------|-------|------------|------------|
| 1 | **North Carolina** | 38 | High | Author childhood + poem match |
| 2 | California | 18 | Medium | Author residence, Mount Wilson ref |
| 3 | Georgia | 10 | Low | Atlanta Olympics mention only |
| 4 | New Mexico | 10 | Low | Wheelwright Museum mention only |
| 5 | Arizona | 9 | Low | Hopi reservation mention |
| 6 | Tennessee | 6 | Low | Wilma Rudolph mention only |

---

## Key Finding: North Carolina

### Why NC Scores Highest

1. **Author Connection (18 pts)**
   - Birthplace: Statesville, NC
   - Childhood: Near Hiddenite, Alexander County
   - Family property: 20.24 acres in NC (private, but shows deep roots)
   - College: UNC Chapel Hill
   - Box maker: Seth Gould in Bakersville, NC
   - Multiple chapter references: Ch 2, 3, 4, 13, 14, 18

2. **Poem Element Match (18+ pts)**
   - Oak trees: YES (South Mountains, statewide)
   - Water: YES (Rocky Face Branch, waterfalls, lakes)
   - Pike/peaks: YES (Pilot Mountain, Stone Mountain, Brushy Mountains)
   - Rock: YES (Rocky Face granite, Stone Mountain)
   - Elevated: YES (Multiple summit hikes available)
   - Secluded: PARTIAL (Rocky Face described as "relatively unknown")

3. **Specific Location of Interest: Rocky Face Mountain**
   - **Address**: 3451 Rocky Face Church Road, **Hiddenite, NC** 28636
   - This is literally in the author's childhood area
   - 318 acres of public land
   - Granite rock formations (matches "sat upon a rock")
   - Water features: Rocky Face Branch, wetlands
   - Views of Brushy Mountains, Grandfather Mountain
   - NC Natural Heritage Area designation
   - Free admission, accessible, safe
   - Opened 2012 (relatively new, "where few have seen it")

---

## Specific Public Lands to Investigate

### Tier 1: Highest Priority (North Carolina)

#### 1. Rocky Face Mountain Recreational Area
**Location**: Hiddenite, NC (Alexander County)
**Why**: In author's childhood area, matches multiple poem elements, public land

| Poem Element | Evidence |
|--------------|----------|
| Rock | Granite dome, quarry walls |
| Water | Rocky Face Branch, wetlands |
| Elevated | 1,800 ft summit |
| Secluded | "Relatively unknown" park |
| Pike/peaks | Views of Brushy Mountains |

**Trails of interest**: Hollow Brook Trail (views), Vertical Mile Challenge Trail, Hollow Rock Trail

#### 2. Stone Mountain State Park
**Location**: Near Sparta, NC
**Why**: 600-foot granite dome, "pike" geography, National Natural Landmark

#### 3. Pilot Mountain State Park
**Location**: Surry/Yadkin Counties
**Why**: Iconic peaked knob, strong "pike" match, National Natural Landmark

#### 4. South Mountains State Park
**Location**: Burke County (55 mi E of Asheville)
**Why**: Oak/pine forests, waterfalls, 20,900 acres

### Tier 2: Secondary Priority (California)

#### 5. Mount Wilson / Angeles National Forest
**Location**: Above Pasadena, San Gabriel Mountains
**Why**: Directly referenced in book ("not far from my home"), author's current residence area

---

## Counter-Evidence & Null Hypotheses

### North Carolina - Counter-Evidence

| Challenge | Impact | Response |
|-----------|--------|----------|
| Author has lived in CA for 20+ years | Medium | Childhood memories may be stronger emotional anchor |
| "Not on private property" rules out family land | None | Public lands nearby (Rocky Face in Hiddenite) |
| No confirmed "X marker" or butterfly evidence | Low | These elements not yet researched on ground |
| Other treasure hunts (Forrest Fenn) were in Western US | Low | Each hunt is independent |

**Null Hypothesis (NC)**: This theory would be DISPROVEN if:
- Author explicitly states treasure is NOT in NC
- No public land in Hiddenite area matches poem
- "Pike" reference proven to mean something other than peaks
- Author confirms significant time in another location not documented

### California - Counter-Evidence

| Challenge | Impact | Response |
|-----------|--------|----------|
| Only 1 specific reference (Mount Wilson) | High | NC has 6+ author connections |
| No childhood connection | High | Formative years were in NC |
| LA area heavily developed/searched | Medium | Angeles NF still has remote areas |
| "Oak trees" less common at elevation | Medium | Poem specifically mentions oaks |

**Null Hypothesis (CA)**: This theory would be DISPROVEN if:
- Mount Wilson area has no features matching poem
- Author indicates childhood location more significant

### Other States - Counter-Evidence

| State | Key Challenge | Assessment |
|-------|---------------|------------|
| Georgia | Only Olympics mention, no personal connection | Weak candidate |
| New Mexico | Only museum mention, no personal connection | Weak candidate |
| Arizona | Only Hopi mention, climate doesn't match (no oaks, water) | Weak candidate |
| Tennessee | Only biographical mention (Rudolph), flat terrain | Weakest candidate |

---

## Evidence Classification

### Direct Reference (High confidence)
- Author birthplace: Statesville, NC
- Author childhood: Near Hiddenite, Alexander County, NC
- Author current residence: Los Angeles, CA (20+ years)
- Mount Wilson: "Not far from my home, to the northeast"
- Poem elements: Exact text from Joy's Serenade

### Derived (Medium confidence)
- "Pike" = peaked hills (supported by etymological research)
- Rocky Face Mountain = strong candidate (location + features)
- Author emotional connection to NC > CA (childhood formative, book mentions)

### Speculative (Low confidence)
- Specific trail or spot within any park
- "X leads the way" interpretation
- Butterfly habitat significance
- Whether any specific rock formation is "the" rock

---

## Confidence Assessment

### North Carolina: HIGH
**Justification**: Multiple independent lines of evidence converge:
- Author's documented childhood area (Hiddenite)
- Public land exists in that area (Rocky Face Mountain)
- Location matches 6+ poem elements
- Summary.md notes "Multiple back cover poem elements align with North Carolina geography"

### California: MEDIUM
**Justification**: Author's current residence provides connection, but:
- Only 1 specific location reference (Mount Wilson)
- Poem elements match less well (limited oaks, water)
- No childhood connection

### Other States: LOW
**Justification**: Only passing mentions in book, no personal author connection documented

---

## Methodology Notes

### Bias Mitigation Practices Applied
- [x] Did NOT read existing hypotheses/ files
- [x] All evidence classified (Direct/Derived/Speculative)
- [x] Counter-evidence documented for each top candidate
- [x] Null hypotheses stated
- [x] Confidence ratings assigned
- [x] Alternatives documented

### ETL Process Used
- **Extract**: `staging/7-location-facts-raw.md` (from summary.md)
- **Transform**: `staging/8-state-research-clean.md` (scored/ranked)
- **Load**: This file (`research/location-priority-analysis.md`)

---

## Recommendations

1. **Primary Investigation**: North Carolina, specifically:
   - Rocky Face Mountain Recreational Area (Hiddenite)
   - Stone Mountain State Park
   - Pilot Mountain State Park

2. **Secondary Investigation**: California Mount Wilson area

3. **Research Gaps to Fill**:
   - Does Rocky Face have oak trees?
   - Are there trail markers forming "X" at any location?
   - Butterfly species/habitat at candidate locations
   - More specific poem mapping to trails/features

4. **Next Steps**:
   - Review Joy's Serenade poem line-by-line against Rocky Face features
   - Research NC iris species and locations
   - Investigate "X" naming or trail patterns
   - Consider children's book imagery against Rocky Face

---

## Sources

### Web Searches Conducted
- North Carolina public lands near Hiddenite/Statesville
- Alexander County/Iredell County public land trails
- Rocky Face Mountain features and trails
- Stone Mountain State Park NC
- Pilot Mountain State Park NC
- South Mountains State Park NC
- California Mount Wilson Angeles National Forest
- Georgia Atlanta area state parks
- Tennessee Clarksville state parks
- Arizona Hopi reservation nearby public lands
- New Mexico Santa Fe area public lands
- "Pike" geographic meaning etymology

### Primary Data Source
- `lions-share/summary.md` (verified facts only)

---

*Last updated: 2026-01-09*
