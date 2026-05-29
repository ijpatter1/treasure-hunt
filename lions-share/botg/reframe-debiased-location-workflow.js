export const meta = {
  name: 'reframe-debiased-location',
  description: "De-biased reframe of the Lion's Share search: blind primary-text read + unconstrained item-history mining + re-opened keyword readings, then red-team whether NC is real signal or our own echo — hunting the DISCRIMINATING pointers (author says a desk solve gets within ~200 yards)",
  phases: [
    { title: 'Blind', detail: 'cold read of the corrected primary text only (no chapters/wiki/research); extract discriminating geographic pointers with NC treated as unproven' },
    { title: 'Items', detail: "mine each treasure item's history for a distinctive US public-land tie, geographically unconstrained" },
    { title: 'Keywords', detail: 're-open locked poem keywords; enumerate all literal readings; find a co-locating combination' },
    { title: 'Synthesis', detail: 'red-team: where do the blind/orthogonal strands land? is NC real signal or artifact? what are the sharpest discriminating pointers?' },
    { title: 'Report', detail: 'write the reframe report + fresh leads + the precise-solve setup' },
  ],
}

const pad = (n) => String(n).padStart(2, '0')
const SPREAD_NAMES = [
  'front-01-02', 'front-03-04', 'page-008-009', 'page-010-011', 'page-012-013', 'page-014-015', 'page-016-017',
  'page-018-019', 'page-020-021', 'page-022-023', 'page-024-025', 'page-026-027', 'page-028-029', 'page-030-031',
  'page-032-033', 'page-034-035', 'page-036-037', 'page-038-039', 'page-040-041', 'page-042-043', 'page-044-045',
  'page-046-047', 'page-048-049', 'page-050-051', 'page-052-053', 'page-054-055', 'page-056-057', 'page-058-059',
  'page-060-061', 'page-062-063', 'page-064-065', 'page-066-067', 'page-068-069', 'page-070-071', 'page-072-073',
  'page-074-075', 'page-076-077', 'page-078-079', 'page-080-081', 'page-082-083', 'page-084-085', 'page-086-087',
  'page-088-089', 'page-091-092', 'page-093-094', 'page-095-096', 'page-097-098', 'page-099-100', 'page-101-102',
  'page-103-104', 'page-105-106', 'page-107-108', 'page-109-110', 'page-111-112', 'page-113-114', 'page-115-116',
  'page-117-118', 'page-119-120', 'page-121-122', 'page-123-124', 'page-125-126', 'page-127-128', 'page-129-130',
  'page-131-132', 'page-133-134', 'page-135-136', 'page-137-138', 'page-139-140', 'page-141-142', 'page-143-144',
  'page-145-146', 'page-147-148', 'page-149-150', 'page-151-152', 'page-153-154', 'page-155-156', 'page-157-158',
  'page-159-160', 'page-161-162', 'page-163-164', 'page-165-166', 'page-167-168', 'page-169-170', 'page-171-172',
  'page-173-174', 'page-175-176', 'page-177-178', 'page-179-180', 'page-181-182', 'page-183-184', 'page-185-186',
  'page-187-188', 'page-189-190', 'page-191-192', 'page-193-194', 'page-195-196', 'page-197-198', 'page-199-200',
  'page-201-202', 'page-203-204', 'page-205-206', 'page-207-208', 'page-209-210', 'page-211-back',
]
function parseSpread(n) { const d = (n.match(/\d+/g) || []).map(Number); return { s: d[0] || 0, e: d[d.length - 1] || d[0] || 0 } }
function metaFor(start, end) { return SPREAD_NAMES.filter((n) => { const x = parseSpread(n); return x.s <= end && x.e >= start }).map((n) => 'pages/metadata/' + n + '.json') }

const MANDATE = `THE 200-YARD MANDATE (decisive): Jon Collins-Black has publicly stated that a desk-solver, working only from the clues, can get to within ~200 YARDS of the box. Therefore PRECISE, DISCRIMINATING pointers EXIST in this material — the puzzle IS solvable to a point, not just a region. Region-level output is a FAILURE here. Hunt for the SPECIFIC detail that would pin a ~200-yard spot: a named feature, a precise bearing/distance, a unique landmark, an exact intersection. Our prior passes' failure to pinpoint reflects a broken method (contamination + locked readings), NOT an unsolvable puzzle.`

const DEBIAS = `CRITICAL DE-BIASING RULE: prior analysis in this repo OVER-ASSUMED western North Carolina (it repeatedly circled back to the Hiddenite / Bakersville / Spruce Pine Blue Ridge gem belt — the same geology as the already-SEARCHED-and-EMPTY Rocky Face Mountain). That convergence is suspect: it partly reflects the analysts' own annotation density, not the author's clues. For this pass:
- Treat North Carolina as UNPROVEN, NOT a default. Do NOT start from NC. Give every US region a fair, cold hearing.
- Justify any pointer ONLY from primary evidence you cite here; do NOT lean on "prior reports concluded..." or repo analysis layers.
- Be literal (the author confirmed NO cipher/code). No syllable counts, letter extraction, or number-to-state games.`

const KNOWN = `THE HUNT: find the largest treasure box ("the Lion's Share") from "There's Treasure Inside" by Jon Collins-Black, on accessible US public land, for a boots-on-the-ground search.
FACTS: Five boxes hidden in five different US states, "spread out... so at least one box would lie in close proximity to you." ONE box per state. The Lion's Share (largest) has NO dedicated chapter; its clues "may be found anywhere... almost every chapter in Part One offers at least one important detail." (The four SMALLER boxes have their own dedicated Part-Two chapters — we are NOT trying to solve those here.)
HARD CONSTRAINTS: accessible PUBLIC land (never private; sole exception a public-easement trail crossing private land); within ~3 miles of a road; NOT buried; not dangerous (no water crossing, swift current, cliff/face climb, dangerous ledge); not underwater; searchable snow-free; box >25 lb, two trips to place (carryable from parking, not deep backcountry).
NATURE: the author said Mother Nature could damage/temporarily-block a box and that he "had to check on" one threatened box — so a hide may sit in a disaster-affected area (e.g. a 2024-Helene zone); do not exclude such areas, but note access.`

// ----------------------------------------------------------------------------
// Schemas
// ----------------------------------------------------------------------------
const SIGNAL_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    range: { type: 'string' },
    pointers: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      text: { type: 'string', description: 'the literal clue/quote from the primary text' }, page: { type: 'number' },
      pointsTo: { type: 'string', description: 'concrete US place/region/feature it could indicate (be as SPECIFIC as the text allows)' },
      precision: { type: 'string', enum: ['point-level', 'local', 'regional', 'vague'], description: 'how tightly this pointer could constrain a location' },
      type: { type: 'string', enum: ['placename', 'bearing-distance', 'item-origin', 'person-tie', 'physical-feature', 'direction', 'other'] },
      strength: { type: 'string', enum: ['strong', 'moderate', 'weak'] },
    }, required: ['text', 'pointsTo', 'precision', 'type', 'strength'] } },
    coldRegionGuess: { type: 'string', description: 'if forced to name a region from THIS slice alone (NC not privileged), where + why; or "insufficient"' },
  }, required: ['range', 'pointers'],
}

const ITEM_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    cluster: { type: 'string' },
    ties: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      item: { type: 'string' }, usGeography: { type: 'string', description: 'a SPECIFIC US public-land tie (where made/found/displayed/memorialized)' },
      distinctiveness: { type: 'string' }, constraintsOK: { type: 'boolean' }, strength: { type: 'string', enum: ['strong', 'moderate', 'weak'] },
      sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['url'] } },
    }, required: ['item', 'usGeography', 'strength'] } },
  }, required: ['cluster', 'ties'],
}

const KEYWORD_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    keyword: { type: 'string' },
    readings: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { reading: { type: 'string' }, placeImplication: { type: 'string' }, plausibility: { type: 'string', enum: ['high', 'medium', 'low'] } }, required: ['reading', 'placeImplication'] } },
  }, required: ['keyword', 'readings'],
}

const COMBO_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    combinations: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { regionOrPlace: { type: 'string' }, readingsUsed: { type: 'array', items: { type: 'string' } }, coherence: { type: 'string' }, isNonObviousNonNC: { type: 'boolean' } }, required: ['regionOrPlace', 'readingsUsed'] } },
    note: { type: 'string' },
  }, required: ['combinations'],
}

const SYNTH_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    freshLeads: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      region: { type: 'string' }, state: { type: 'string' },
      supportedByStrands: { type: 'array', items: { type: 'string' } },
      isNew: { type: 'boolean', description: 'a region the prior NC-contaminated passes did NOT surface' },
      case: { type: 'string' }, confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    }, required: ['region', 'state', 'supportedByStrands', 'isNew', 'case'] } },
    sharpestPointers: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { pointer: { type: 'string' }, fromStrand: { type: 'string' }, whyPrecise: { type: 'string' } }, required: ['pointer', 'whyPrecise'] }, description: 'the most DISCRIMINATING, point-level pointers found (toward the ~200-yard solve)' },
    ncVerdict: { type: 'string', description: 'Is western-NC real signal or analysis artifact? Did the BLIND read independently support NC, or not?' },
    biggestInsight: { type: 'string' },
  }, required: ['freshLeads', 'sharpestPointers', 'ncVerdict'],
}

// ----------------------------------------------------------------------------
// Prompts
// ----------------------------------------------------------------------------
function blindPrompt(label, files) {
  return `${KNOWN}

${MANDATE}

${DEBIAS}

You are a BLIND pointer-extractor (slice: ${label}). Read ONLY these corrected primary-text files (the raw book transcription — GROUND TRUTH) and NOTHING else (do NOT open chapters/, wiki/, or research/ — those carry the biased prior analysis):
${files.map((f) => '  - ' + f).join('\n')}
(In each JSON, the book text is left_page.transcription.raw_text + right_page.transcription.raw_text; also key_elements, images[].description, poem.)

Extract every concrete geographic pointer in your slice that could help locate the LARGEST box — prioritizing the SPECIFIC and DISCRIMINATING (named features, bearings, distances, unique landmarks, exact directions) over the generic. For each: the literal text, page, the specific US place/feature it could indicate (NC NOT privileged — consider the whole country), how tightly it constrains (point-level / local / regional / vague), type, strength. Then, if forced, a cold region guess from THIS slice alone (or "insufficient"). Do not assume NC.`
}

const ITEM_CLUSTERS = [
  { key: 'apple-asia-faberge', items: '120ct sapphire (Mike Scott / Apple), Tuyet Nguyet 100 rings (Arts of Asia), Faberge magnifying glass (Perkhin)' },
  { key: 'gems-jewelry', items: 'Chivor emerald (Rob Lavinsky), Art Smith modernist jewelry, rubies (pendant/earrings), Carnegie emerald, 200ct smokey quartz (Mark Oros)' },
  { key: 'people-autographs-medals', items: "Amelia Earhart autograph, 1960 Rome Olympic medal (Wilma Rudolph), 1996 Atlanta medal (Nigeria soccer), Jordan rookie card" },
  { key: 'americana', items: "George Washington's jelly glass, Golden Chalice, Jackie Onassis diamond-sapphire brooch, Tiffany favrile glass / Thoreau" },
  { key: 'earth-space-antiquity', items: 'Moon rocks & meteorites (NWA 12691, Aguas Zarcas), Antiquities of Alexander (4 Greek gold items), Picasso pendant, Egyptian faience' },
  { key: 'shipwreck-backmatter', items: '1715-fleet shipwreck gold (La Luz bar, Lima 8-escudo), and back-matter additional items (Tanzanite, octahedral diamond, Bali/India rings, SE-Asian gold box, Australian nugget, BTCC Bitcoin, Chinese jade, Nicoya amulet, Michele della Valle citrine necklace, Viking gold ring)' },
]

function itemPrompt(cluster) {
  return `${KNOWN}

${MANDATE}

${DEBIAS}

The author explicitly invited researching the treasure ITEMS ("if your instinct is to go research it further, I invite you to do so... that was my exact intention"). Mine this item cluster for a DISTINCTIVE US PUBLIC-LAND geographic tie — where each item was made, found, mined, displayed, memorialized, or has a unique geographic association — geographically UNCONSTRAINED (the histories are diverse and mostly NOT in NC; give every state a fair hearing).

ITEM CLUSTER (${cluster.key}): ${cluster.items}

Load web tools (ToolSearch "select:WebSearch,WebFetch"). For each item, find any SPECIFIC, accessible US public-land tie that could be a "clue by association" to a hide site (a museum on public land, a monument, a namesake park/forest, a discovery site, a memorial). Favor ties precise enough to help a ~200-yard solve. Rate distinctiveness, hard-constraint fit, strength; cite sources. Skip generic ties; flag any that is unusually specific or surprising.`
}

const KEYWORDS = [
  { key: 'pike', line: '"the pike are rather all around"', hint: 'enumerate: pike=peaked hill (mountainous) BUT ALSO pike=fish (northern lakes/rivers), pike=turnpike/road, Pike as a place-name (Pike County/NF/State Forest in many states), pike=weapon. Which non-mountain readings open new regions?' },
  { key: 'x-gold', line: '"an X leads the way" / "follow shimmering circles of gold"', hint: 'X = crossroads/trail-junction, a literal X-named feature, a railroad/route X, a confluence; circles of gold = aspen, sun-on-water, gold-mining districts, golden lichen, a named "Gold" feature, ginkgo/cottonwood.' },
  { key: 'dancers', line: '"Dancers are on the land"', hint: 'butterflies (Hopi); BUT ALSO a place literally named for dancers/dancing, a festival ground, sandhill-crane "dancing", aspen "quaking", or a named Dance/Dancer feature.' },
  { key: 'music', line: '"conductor... baton... coda is incomplete... molten tone of a tune... sing harmonies" (the whole music frame we dismissed as meta)', hint: 'treat it LITERALLY: a place named for music/a conductor/composer/orchestra, a "Coda"/"Aria"/"Carmen" placename, a bandshell, a singing/whispering natural feature (Singing Sands, Whispering Pines), an amphitheater on public land.' },
  { key: 'straightedge-square-arc', line: '"Use will\'s straight edge, as the turning square or any arc may align at a proper point"', hint: 'surveying/geometry: a survey marker/baseline, a state-line/meridian, a "Square"/"Compass"/"Arc" placename, a railroad curve, a named alignment; "will" possibly a proper name (a William/Will placename).' },
  { key: 'haiku-starlight', line: '"the haiku curls a little further on / where few have seen it" + "flame of starlight"', hint: 'a Japanese-garden / Basho / haiku site, a dark-sky park, a "Star"/"Sky" placename, an observatory on public land, a meteor/comet-named feature.' },
]

function keywordPrompt(kw) {
  return `${KNOWN}

${DEBIAS}

You are RE-OPENING a load-bearing poem keyword that prior analysis locked into a single reading (and thereby forced mountainous-NC terrain). Enumerate ALL plausible LITERAL readings and the US place-types each implies — especially readings that point AWAY from the NC mountains, and especially readings precise enough to help pin a point.

KEYWORD: ${kw.key} — ${kw.line}
Consider: ${kw.hint}

For each reading: the reading, its place-implication (be concrete about US region/place TYPES or specific named places), and plausibility. Do not force; list honestly. Literal only.`
}

function comboPrompt(allReadings) {
  return `${KNOWN}

${MANDATE}

${DEBIAS}

Here are alternative literal readings for the poem's load-bearing keywords. Find which COMBINATION of readings co-locates a coherent, NON-OBVIOUS, NON-NC US place or region — i.e., a place where several keywords' alternative readings all point to the SAME spot. Prioritize combinations that are non-mountain, that the prior NC-fixated analysis would have missed, and that are SPECIFIC enough to approach a point.

READINGS: ${JSON.stringify(allReadings)}

Return candidate combinations (the place/region, which readings combine there, how coherent, and whether it is genuinely non-obvious + non-NC).`
}

function synthPrompt(blind, items, combo) {
  return `${KNOWN}

${MANDATE}

${DEBIAS}

You are the RED-TEAM synthesizer. Three independent, de-biased strands were run (blind primary read, item-history ties, re-opened keyword combinations). Your job: determine where they LAND, surface genuinely FRESH leads the prior NC-fixated passes missed, isolate the SHARPEST discriminating pointers (toward the ~200-yard solve the author says is achievable), and deliver an honest verdict on whether western NC is real signal or an analysis artifact.

STRAND A — Blind primary-text pointers: ${JSON.stringify(blind)}
STRAND C — Item-history US ties: ${JSON.stringify(items)}
STRAND D — Keyword combinations: ${JSON.stringify(combo)}

Produce: freshLeads (region, state, supporting strands, new-vs-old, the case, confidence) — rank the most promising leads, NON-NC first if they have real support; sharpestPointers (the most DISCRIMINATING, point-level pointers found across all strands, and why each is precise); ncVerdict (did the BLIND read INDEPENDENTLY support western NC, or did NC only appear via the contaminated layers these strands avoided? — state plainly whether NC survives a de-biased test); biggestInsight (the single most important takeaway for redirecting the search toward a precise solve).`
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
phase('Blind')
const BLIND_SLICES = [
  { label: 'intro+ch1-3 (p8-45)', start: 8, end: 45 },
  { label: 'ch4-9 (p46-94)', start: 46, end: 94 },
  { label: 'ch10-16 (p95-150)', start: 95, end: 150 },
  { label: 'ch17-23+backmatter+poem (p151-211)', start: 151, end: 211 },
]
const blind = (await parallel(BLIND_SLICES.map((s) => () => agent(blindPrompt(s.label, metaFor(s.start, s.end)), { schema: SIGNAL_SCHEMA, phase: 'Blind', label: 'blind:' + s.label.slice(0, 10) })))).filter(Boolean)

phase('Items')
const items = (await parallel(ITEM_CLUSTERS.map((c) => () => agent(itemPrompt(c), { schema: ITEM_SCHEMA, phase: 'Items', label: 'items:' + c.key })))).filter(Boolean)

phase('Keywords')
const keywordReadings = (await parallel(KEYWORDS.map((k) => () => agent(keywordPrompt(k), { schema: KEYWORD_SCHEMA, phase: 'Keywords', label: 'kw:' + k.key })))).filter(Boolean)
const combo = await agent(comboPrompt(keywordReadings), { schema: COMBO_SCHEMA, phase: 'Keywords', label: 'kw:combine' })

phase('Synthesis')
const synth = await agent(synthPrompt(blind, items, combo), { schema: SYNTH_SCHEMA, phase: 'Synthesis', label: 'redteam' })
log('Red-team NC verdict: ' + (synth.ncVerdict || '?').slice(0, 120))

phase('Report')
await agent(
  `${KNOWN}

${MANDATE}

Write the file REFRAME-LOCATION-REPORT.md (repo root, use the Write tool) — a de-biased reframe of the Lion's Share search that deliberately avoided the prior western-NC-saturated analysis and hunted the DISCRIMINATING pointers a ~200-yard solve requires.

Structure:
- TL;DR: the single biggest insight; whether a genuinely FRESH (non-NC) lead emerged; the honest verdict on whether western NC survives a de-biased test; and the sharpest point-level pointers found.
- The structural critique this pass was designed to fix (self-referential NC contamination; single-anchor Bakersville attractor; keyword lock-in).
- Strand A (blind primary read): the discriminating pointers a cold read surfaced, and where it landed WITHOUT the NC prior.
- Strand C (item histories): the most distinctive/surprising US public-land ties, geographically unconstrained.
- Strand D (keyword multi-readings): the non-obvious co-locating combinations the locked single-readings had hidden.
- Synthesis: ranked fresh leads (state, supporting strands, new-vs-old, the case, confidence); the SHARPEST discriminating pointers; and the NC real-signal-vs-artifact verdict.
- Recommended next move toward the ~200-yard solve: which region + which discriminating pointers a focused precise-solve pass should chase next (be concrete).

DATA:
Blind pointers: ${JSON.stringify(blind)}
Item ties: ${JSON.stringify(items)}
Keyword readings: ${JSON.stringify(keywordReadings)}
Keyword combinations: ${JSON.stringify(combo)}
Synthesis: ${JSON.stringify(synth)}

Return the single word DONE.`,
  { phase: 'Report', label: 'write:reframe-report' }
)

return {
  freshLeads: (synth.freshLeads || []).map((l) => ({ region: l.region, state: l.state, isNew: l.isNew, confidence: l.confidence, strands: l.supportedByStrands })),
  sharpestPointers: (synth.sharpestPointers || []).map((p) => p.pointer),
  ncVerdict: synth.ncVerdict,
  biggestInsight: synth.biggestInsight,
}
