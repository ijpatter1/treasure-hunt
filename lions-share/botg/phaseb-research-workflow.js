export const meta = {
  name: 'phaseb-research',
  description: "Phase B: bounded-zone + unconstrained discriminator search. Geo-fix 4 NC anchors -> item-provenance-to-ground (NC-unconstrained) -> discriminator candidate search (NC sub-areas + national) -> adversarial validate -> synthesize with an honesty gate.",
  phases: [
    { title: 'Frame', detail: 'geo-fix the 4 anchors + describe the bounded zone; trace item-provenance to accessible US public land (NC-unconstrained)' },
    { title: 'Candidates', detail: 'discriminator search: NC-zone sub-areas + unconstrained national terrain/provenance matches' },
    { title: 'Validate', detail: 'adversarial validator per candidate area' },
    { title: 'Synthesize', detail: 'rank by discriminator co-location; honesty gate may conclude region-level/not-pinpointed' },
  ],
}

const CONTEXT = `Lion's Share treasure ("There's Treasure Inside" by Jon Collins-Black, JCB). PHASE B = external research to narrow toward a searchable spot, AFTER the in-text convergence engine ranked North Carolina #1 (4 validated independent anchors) and judged the literal ledger REGION-SPARSE (it points to a region, not a pinpoint).

FRAME (agreed): "triangulation" is only a THEORY, so the 4 anchors produce a BOUNDED ZONE, not a centroid X. The anchors bound/seed the search; the region-agnostic DISCRIMINATORS do the actual pinpointing inside it.

THE 4 LEDGER ANCHORS (all LIVE — none spent):
- Hiddenite / Alexander County (Ch4 childhood emerald mine). Search this anchor's area on its merits — let terrain/landform/access evidence point to specific accessible-public-land spots on their own, without any preconceived target.
- Statesville / Iredell County (Ch18, parents' church).
- Bakersville / Mitchell County (Ch3, box-maker Seth Gould; "40 mi NE of Asheville").
- Chapel Hill / Orange County (Ch2/Ch13, college). Eastern outlier (~150 mi E of the western three) — test whether it tightens or stretches the zone; do not force it.
(Three of four cluster in the western Piedmont / Brushy Mountains foothills; Chapel Hill is the outlier.)

DISCRIMINATOR STACK (region-agnostic; the pinpointing tools):
- Terrain/flora (Group P): water at/near the hide ("magic in the water"); shady oaks; a notable sit-on / look-behind ROCK; ELEVATION with a high vantage / "view that opens onto lower country" (the Ch4 vantage-as-key landform); blue + pink spring wildflowers; open/dark sky.
- Hard filters (Group Q): accessible PUBLIC land (never private; lone exception a public-easement trail crossing private land); within ~3 miles of a road; NOT buried; not dangerous (no water crossing/swift current/cliff/ledge); not underwater; gets winter snow (a searchability filter — implies a region with real winters); bear + venomous-snake habitat plausible; box >25 lb, carryable, single-day-walkable.

RULES: literal only (no cipher). Item ORIGINS abroad are decoy/context — the hide is in the US. Item-provenance only counts if it lands on SPECIFIC, ACCESSIBLE US PUBLIC LAND (a private/hazardous source mine does NOT count — that already dead-ended the CA "Red Ledge" lead). Be self-critical; we have over-indexed single leads before. The honesty gate is real: it is acceptable — and better — to conclude "no spot clears the bar; still region-level" than to manufacture an X.`

// ---------------- Phase 1: Frame ----------------
const ITEM_CLUSTERS = [
  { key: 'apple-asia-faberge', items: '120ct sapphire (Mike Scott/Apple), Tuyet Nguyet 100 rings (Arts of Asia), Faberge magnifying glass' },
  { key: 'gems-jewelry', items: 'Chivor emerald (Rob Lavinsky), Art Smith jewelry, rubies, Carnegie emerald, 200ct smokey quartz (Mark Oros)' },
  { key: 'people-medals-cards', items: 'Amelia Earhart autograph, 1960 Rome + 1996 Atlanta Olympic medals, Jordan rookie card' },
  { key: 'americana', items: "George Washington jelly glass, Golden Chalice, Jackie Onassis brooch, Tiffany favrile glass / Thoreau journal pages" },
  { key: 'earth-space-antiquity', items: 'Moon rocks & meteorites, Antiquities of Alexander (Greek gold), Picasso pendant, Egyptian faience' },
  { key: 'shipwreck-backitems', items: '1715-fleet shipwreck gold; back-matter items (Tanzanite, octahedral diamond, Bali/India rings, Australian nugget, Bitcoin, Chinese jade, Nicoya amulet, della Valle citrine, Viking gold ring)' },
]

const geometryPrompt = `${CONTEXT}

You are the GEOMETRY / BOUNDED-ZONE agent. Load web tools (ToolSearch "select:WebSearch,WebFetch") only if you need to confirm coordinates.

Geo-fix the 4 anchors (approx lat/long): Hiddenite/Alexander Co NC; Statesville/Iredell Co NC; Bakersville/Mitchell Co NC; Chapel Hill/Orange Co NC. Then DESCRIBE the bounded zone they define:
- The tight western cluster (Hiddenite-Statesville-Bakersville) — its rough extent, the connecting Brushy Mountains / western-Piedmont-to-Blue-Ridge corridor between them, and an approximate bounding box / centroid of these three.
- How much Chapel Hill stretches the zone eastward; whether to treat it as in-zone, a zone-stretcher, or an outlier consistency-check.
- Which accessible public-land TYPES fall in the western cluster zone (national forests, state parks/natural areas, game lands, gorges/escarpment) — names if known.
- The Ch4 "view opens onto lower country" landform: where in this zone does the Blue Ridge escarpment / Brushy-Mountains-over-Piedmont relief produce that "vista onto lower ground"?

WRITE your analysis to botg/phaseb/geometry.md (Write tool). Be honest that this is a bounded zone, not a point. Return ONE line: "geometry: <bounding box summary>".`

function provenancePrompt(c) {
  return `${CONTEXT}

You are an ITEM-PROVENANCE-TO-GROUND agent (cluster: ${c.key}), running NC-UNCONSTRAINED. Load web tools (ToolSearch "select:WebSearch,WebFetch").

For each item below, trace its real-world US geography to a SPECIFIC, ACCESSIBLE US PUBLIC-LAND site (where it was made/found/displayed/memorialized/discovered) that could be a "clue by association" to a hide. CRITICAL: only count ties that land on accessible public land within ~3 mi of a road; a private collection, a private/hazardous mine, or an urban museum building does NOT qualify as a hide site (note it as context only). Be honest — most items will have NO qualifying US public-land tie; say so.

ITEMS: ${c.items}

WRITE your findings to botg/phaseb/provenance-${c.key}.md (Write tool): per item — the geography, whether it lands on accessible US public land (yes/no + where), distinctiveness, whether it reinforces the NC zone or points elsewhere, and sources. Return ONE line: "${c.key}: <N qualifying public-land ties>, reinforces-NC=<yes/no/mixed>".`
}

// ---------------- Phase 2: Candidates ----------------
const CAND_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    key: { type: 'string' },
    candidates: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      name: { type: 'string' }, area: { type: 'string' }, approxCoords: { type: 'string' },
      discriminatorsMet: { type: 'array', items: { type: 'string' } },
      discriminatorsFailed: { type: 'array', items: { type: 'string' } },
      publicLand: { type: 'boolean' }, withinThreeMiles: { type: 'boolean' },
      fitScore: { type: 'number', description: '0-100, count+quality of co-located discriminators at ONE spot' },
      oneLine: { type: 'string' },
    }, required: ['name', 'area', 'discriminatorsMet', 'fitScore'] } },
    note: { type: 'string' },
  }, required: ['key', 'candidates'],
}

const NC_SUBAREAS = [
  { key: 'hiddenite-alexander', desc: 'Hiddenite / Alexander County NC and surrounds (the Ch4 anchor). Search the area on its merits — Brushy Mountains, Alexander Co public land / state natural areas / game lands, gem-belt outcrops, escarpment vistas. Surface whichever specific public-land spots best co-locate the discriminators; carry no preconceived target into the search.' },
  { key: 'statesville-iredell', desc: 'Statesville / Iredell County NC and surrounds — public land, lakes (Lake Norman environs), foothill terrain.' },
  { key: 'bakersville-mitchell', desc: 'Bakersville / Mitchell County NC and surrounds — Pisgah NF, Roan Highlands approaches, Toe River, gem belt; only spots that fit the FULL discriminator stack.' },
  { key: 'chapel-hill-orange', desc: 'Chapel Hill / Orange County NC and surrounds (eastern outlier) — test honestly; Piedmont terrain, public land, whether it even fits the elevation/vista/dark-sky discriminators.' },
  { key: 'western-corridor-centroid', desc: 'The connecting corridor / approximate centroid of the tight western three (Brushy Mountains foothills & Blue Ridge escarpment between Hiddenite, Statesville, Bakersville) — Pisgah NF units, NC state parks/natural areas, game lands within this band.' },
]
const NATIONAL_LENSES = [
  { key: 'natl-terrain', desc: 'Search ANYWHERE in the US for accessible public land that satisfies the FULL discriminator stack DISTINCTIVELY (water + oaks + sit-rock + vista-onto-lower-country + blue&pink spring bloom + dark sky + <=3mi road + snowy winters + bear/snake). Report the best matches regardless of region — this is the anti-NC-bias check.' },
  { key: 'natl-provenance', desc: 'Take the strongest item-provenance public-land ties (read botg/phaseb/provenance-*.md) and find where any of them ALSO satisfy the discriminator stack on accessible public land — anywhere in the US. Surface any strong non-NC convergence honestly.' },
]

function ncCandPrompt(s) {
  return `${CONTEXT}

You are a DISCRIMINATOR-SEARCH agent for the NC sub-area: ${s.key}.
${s.desc}

Read botg/phaseb/geometry.md (the bounded zone) and botg/phaseb/provenance-*.md (Glob) for any provenance tie in this area. Load web tools (ToolSearch "select:WebSearch,WebFetch").

Find specific public-land SPOTS in this sub-area where the MOST discriminators co-locate AT ONE POINT: a sit-on/look-behind rock, water in view (not crossed), an elevation/vista that opens onto lower country (Ch4 landform), oaks, blue+pink spring wildflowers, dark-ish sky — all on accessible public land within ~3 mi of a road, not buried/dangerous, carryable, snow-in-winter. For each candidate spot: which discriminators are MET vs FAILED at that exact spot, public-land + 3-mi check, a 0-100 fit score, sources.

WRITE a dossier to botg/phaseb/cand-${s.key}.md (Write tool). Be honest — if no spot in this sub-area co-locates enough discriminators, say so (few/zero candidates is a valid result). Then RETURN the structured summary (top ~4 candidates max).`
}
function natlCandPrompt(s) {
  return `${CONTEXT}

You are a NATIONAL (NC-UNCONSTRAINED) candidate agent: ${s.key}.
${s.desc}

Load web tools (ToolSearch "select:WebSearch,WebFetch"). Surface the strongest US public-land spots (anywhere) on the criteria described — explicitly INCLUDING non-NC regions so we test the NC lead rather than just confirm it. For each: discriminators met/failed at the exact spot, public-land + 3-mi check, fit score, sources, and whether it beats the NC zone.

WRITE a dossier to botg/phaseb/cand-${s.key}.md (Write tool). Honest if nothing strong emerges. RETURN the structured summary (top ~4 candidates max).`
}

// ---------------- Phase 3: Validate ----------------
const VAL_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    area: { type: 'string' },
    validatedCandidates: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      name: { type: 'string' }, holds: { type: 'boolean' }, realFitScore: { type: 'number' }, issue: { type: 'string' },
    }, required: ['name', 'holds'] } },
    verdict: { type: 'string', enum: ['has-real-candidate', 'overstated', 'thin', 'no-candidate'] },
    note: { type: 'string' },
  }, required: ['area', 'verdict'],
}

function validatePrompt(key) {
  return `${CONTEXT}

You are the ADVERSARIAL VALIDATOR for candidate dossier: botg/phaseb/cand-${key}.md. Read it, then verify with web tools (ToolSearch "select:WebSearch,WebFetch") and the geometry/provenance files.

Try to KNOCK DOWN each candidate spot: (1) is it ACTUALLY accessible PUBLIC land within ~3 mi of a road (not private, not a hazardous mine, not deep backcountry)? (2) do the claimed discriminators REALLY co-locate at that exact spot, or is it a generic "pretty place fits generic imagery" reach (our repeated failure)? (3) any hard-constraint violation (water crossing, cliff, buried-only, closure)? (4) is the discriminator fit DISTINCTIVE vs. countless similar spots? (5) is it riding on a lone provenance/biography association with no real terrain co-location?
For each candidate report holds (true/false) + a realistic fit score + the issue. Give an area verdict {has-real-candidate / overstated / thin / no-candidate}. Do not edit the dossier.`
}

// ---------------- Run ----------------
phase('Frame')
const frame = (await parallel([
  () => agent(geometryPrompt, { phase: 'Frame', label: 'geometry' }),
  ...ITEM_CLUSTERS.map((c) => () => agent(provenancePrompt(c), { phase: 'Frame', label: 'prov:' + c.key })),
])).filter(Boolean)
log('Frame done: geometry + ' + ITEM_CLUSTERS.length + ' provenance clusters written')

phase('Candidates')
const candAgents = [
  ...NC_SUBAREAS.map((s) => ({ key: s.key, run: () => agent(ncCandPrompt(s), { schema: CAND_SCHEMA, phase: 'Candidates', label: 'cand:' + s.key }) })),
  ...NATIONAL_LENSES.map((s) => ({ key: s.key, run: () => agent(natlCandPrompt(s), { schema: CAND_SCHEMA, phase: 'Candidates', label: 'cand:' + s.key }) })),
]
const candResults = (await parallel(candAgents.map((c) => c.run))).filter(Boolean)
const allKeys = candAgents.map((c) => c.key)
const candCount = candResults.reduce((n, r) => n + (r.candidates || []).length, 0)
log('Candidate search done: ' + candCount + ' candidate spots across ' + candResults.length + ' areas')

phase('Validate')
const validations = (await parallel(allKeys.map((k) => () => agent(validatePrompt(k), { schema: VAL_SCHEMA, phase: 'Validate', label: 'val:' + k })))).filter(Boolean)

phase('Synthesize')
await agent(
  `${CONTEXT}

You are the SYNTHESIZER for Phase B. Read botg/phaseb/geometry.md, all botg/phaseb/provenance-*.md, all botg/phaseb/cand-*.md, and use the validator verdicts below. WRITE the final report to PHASE-B-REPORT.md (repo root, Write tool).

The report MUST contain:
- TL;DR: the best VALIDATED candidate spot(s) (or an honest "no spot clears the bar — still region-level"), with confidence.
- The bounded zone (from geometry) and whether item-provenance independently REINFORCED the NC zone or pulled elsewhere (the falsification check).
- A ranked table of validated candidate spots: spot | area | discriminators met (count) | public-land + <=3mi | validator verdict | fit | one-line. Include the strongest NATIONAL (non-NC) candidates alongside NC ones — show whether NC actually leads on the ground or just on the page.
- Honest treatment of the Hiddenite/Alexander anchor: did any specific public-land spot in that area earn its way up on discriminators, or not?
- THE HONESTY GATE — state plainly which of these is true: (A) a defensible ~200-yd-class spot to walk; (B) a short list of plausible spots needing a falsification trip; or (C) nothing clears the bar — still region-level, and what specifically is still missing (e.g., the children's book, or a discriminator the desk can't resolve).
- Recommended next step consistent with the gate verdict.

VALIDATOR VERDICTS:
${JSON.stringify(validations)}

Return ONE line: "wrote PHASE-B-REPORT.md — gate=<A/B/C>, top=<spot or none>".`,
  { phase: 'Synthesize', label: 'write:phaseb-report' }
)

return {
  candidateSpots: candCount,
  validations: validations.map((v) => ({ area: v.area, verdict: v.verdict })),
  report: 'PHASE-B-REPORT.md',
}
