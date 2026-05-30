export const meta = {
  name: 'rockyface-creative',
  description: 'Exhaustively inventory Rocky Face Mtn into a catalog of concrete candidate spots; SEPARATELY extract the book\'s spatial clues blind (no Rocky Face, ignore prior-bias signal sections); blind-cross the two; adversarially pin-test; output ranked BOTG search zones. Creativity in the clue read, discipline in the blind match.',
  phases: [
    { title: 'Inventory', detail: 'parallel web-research slices of Rocky Face Mtn' },
    { title: 'Catalog', detail: 'consolidate into concrete candidate spots' },
    { title: 'Clues', detail: 'blind spatial-clue extraction from wiki (one agent per page)' },
    { title: 'Constraints', detail: 'consolidate clues into a constraint profile' },
    { title: 'Match', detail: 'blind cross: score each spot vs the constraint profile' },
    { title: 'Verify', detail: 'adversarial pin-test + JCB hard-constraint check' },
    { title: 'Synthesize', detail: 'ranked BOTG search zones + honest confidence' },
  ],
}

const DIR = '/Users/ipatterson/dev/treasure-hunt/lions-share'
const OUT = DIR + '/botg/rockyface'
const WIKI = DIR + '/wiki'

// Wiki content pages (blind clue source): 23 chapters + front/back matter.
const PAGES = []
for (let i = 1; i <= 23; i++) PAGES.push('chapter-' + String(i).padStart(2, '0'))
PAGES.push('front-matter')
PAGES.push('back-matter')

// ---------------------------------------------------------------------------
// PHASE 1 — INVENTORY (web research, by slice)
// ---------------------------------------------------------------------------
phase('Inventory')
const SLICES = [
  { key: 'geology', focus: 'Geology and rock: the granite dome / the exposed "rock face" itself, rock and mineral types, the Hiddenite & emerald mineral belt and any gem mines on or adjoining the mountain, quarry sites, named rock formations, crevices, caves, balds.' },
  { key: 'access', focus: 'Access: public roads to and around the mountain, parking areas and trailheads, gates/hours, and which parts lie within 3 miles of a road (drivable approach). Names of the access roads.' },
  { key: 'trails', focus: 'Trails and built features: every named trail, the summit, overlooks/vistas, the old fire-tower site, benchmarks, picnic/shelter sites, signage, observation decks, boardwalks.' },
  { key: 'publicland', focus: 'Land status: the Rocky Face Mountain Recreational Area boundaries and any State Natural Area designation, who owns/manages it, what is public vs private, total acreage, official maps and facility lists.' },
  { key: 'water', focus: 'Water features on or beside the mountain: streams, branches, springs, seeps, ponds, small waterfalls, and their names.' },
  { key: 'history', focus: 'History and lore, with SOURCES: CCC work, the fire tower history, Native American / Indigenous history, the convict-labor quarry era, the recreation area\'s creation and dedication dates, mining and quarrying history, local legends and place-name origins attached to specific rocks or places, any named landmark with a documented story. Prefer primary/official sources (NC state, county, park, newspaper, historical society); give a URL for every claim.' },
  { key: 'biota', focus: 'Fauna and flora / ecology, with SOURCES: notable plant communities and any rare/endemic/imperiled/protected species, distinctive or named trees, wildflowers, the forest type, mammals/birds/reptiles/amphibians/insects of note, NC Natural Heritage designations, granitic-dome / flatrock ecology (lichens, mosses, spikemoss, vernal pools), invasive species. Note anything DISTINCTIVE that could feature in a clue (an unusual tree, a rare flower, a creature). Give a URL for every claim.' },
  { key: 'namedspots', focus: 'Concrete NAMED spots a person could stand at: named boulders, cliffs, ledges, overlooks, caves, crevices, summit marker, "the face", any feature with a proper name or a well-known informal name.' },
  { key: 'coords', focus: 'Coordinates and elevation: latitude/longitude and elevation for the summit and any named feature, USGS/peakbagger/topo data, trail mileages and distances between named points. Provide numbers where findable.' },
]

const invSchema = {
  type: 'object',
  required: ['file', 'items'],
  properties: { file: { type: 'string' }, items: { type: 'integer' } },
}

const inv = await parallel(SLICES.map((s) => () =>
  agent(
    `You are a field researcher building a factual dossier on ROCKY FACE MOUNTAIN in Alexander County, North Carolina (near Hiddenite / Taylorsville, NC). Use WebSearch thoroughly.

YOUR SLICE: ${s.focus}

Gather verifiable facts ONLY. For every concrete thing you find, capture: name, what/where it is, coordinates or elevation if available, distance-from-road or trail access if known, public-vs-private if known, and the source URL. Do NOT speculate about treasure. Do NOT mention any book or clues. This is pure geography/history.

WRITE your findings as JSON to ${OUT}/rfinv-${s.key}.json with shape:
{ "slice": "${s.key}", "facts": [ { "name": "...", "what": "...", "coords": "lat,lon or unknown", "elevation": "ft or unknown", "access": "...", "land": "public|private|unknown", "source": "url" }, ... ] }

Return ONLY: {"file":"${OUT}/rfinv-${s.key}.json","items": <number of facts>}`,
    { label: 'inv:' + s.key, phase: 'Inventory', schema: invSchema }
  )
))
const okInv = inv.filter(Boolean)
log(`Inventory: ${okInv.length}/${SLICES.length} slices, ` +
  okInv.reduce((a, r) => a + (r.items || 0), 0) + ` facts gathered`)

// ---------------------------------------------------------------------------
// PHASE 2 — CATALOG (concrete candidate spots)
// ---------------------------------------------------------------------------
phase('Catalog')
const catalogSchema = {
  type: 'object',
  required: ['file', 'topSpots'],
  properties: {
    file: { type: 'string' },
    topSpots: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'type'],
        properties: { name: { type: 'string' }, type: { type: 'string' } },
      },
    },
  },
}

const catalog = await agent(
  `You are consolidating field research into a CATALOG OF CONCRETE CANDIDATE SPOTS on Rocky Face Mountain, Alexander County, NC.

Read every file: ${OUT}/rfinv-geology.json, rfinv-access.json, rfinv-trails.json, rfinv-publicland.json, rfinv-water.json, rfinv-history.json, rfinv-biota.json, rfinv-namedspots.json, rfinv-coords.json (skip any missing).

Produce a list of DISTINCT, STANDABLE candidate spots — places a person could physically go and a small box could plausibly be hidden near (within ~3 mi of a road, public land, not requiring digging/climbing/water-crossing). Each spot must be a specific feature (a named overlook, the summit, a particular boulder/ledge/crevice, a trail junction, the fire-tower site, a spring, the gem-mine area, etc.) — NOT a vague region.

For each spot capture: name, type, coords/elevation if known, access & distance-from-road, public/private, and a rich set of DISTINGUISHING PHYSICAL ATTRIBUTES (shape, color, orientation, nearby water, what you'd see/stand on, any name meaning). These attributes are what will later be matched against book clues, so be specific and concrete.

WRITE the full catalog as JSON to ${OUT}/ROCKY-FACE-CATALOG.json:
{ "spots": [ { "name","type","coords","elevation","access","land","attributes":[ "...", ... ],"sources":["url"] }, ... ] }

Then return ONLY the spot list (up to 16): {"file":"${OUT}/ROCKY-FACE-CATALOG.json","topSpots":[{"name":"...","type":"..."}, ...]}`,
  { label: 'build-catalog', phase: 'Catalog', schema: catalogSchema }
)
if (!catalog) throw new Error('catalog build failed — cannot proceed')
const spots = (catalog.topSpots || []).slice(0, 16)
log(`Catalog built: ${spots.length} candidate spots — ` + spots.map((s) => s.name).join(' | '))

// ---------------------------------------------------------------------------
// PHASE 3 — CLUES (BLIND spatial-clue extraction from the book)
// ---------------------------------------------------------------------------
phase('Clues')
const clueSchema = {
  type: 'object',
  required: ['file', 'clues'],
  properties: { file: { type: 'string' }, clues: { type: 'integer' } },
}

const clues = await parallel(PAGES.map((pg) => () =>
  agent(
    `You are a clue analyst reading ONE page of an analytical wiki about the book "There's Treasure Inside." Read ${WIKI}/${pg}.html .

YOUR JOB: extract everything the book seems to say about the PHYSICAL CHARACTER and SPATIAL POSITION of a hidden treasure's hiding place — as if you had to describe the SPOT to someone, not the region.

Capture constraints such as: type of feature (rock/ledge/overlook/cave/crevice/tree/water/marker), directions (N/S/E/W, up/down, left/right), distances or measurements, elevation/height, shape, color, material, orientation, what is nearby (water, a path, a view), what one would see or stand on, and any spatial imagery in the poem/epigraph.

CREATIVE LICENSE: read charitably and imaginatively — surface plausible spatial meanings even if uncertain (metaphor, double meaning, a described object's shape echoing a landform). Tag each with a confidence. This is where intuition is welcome.

HARD BLINDNESS RULES (critical):
- Do NOT assume, name, or aim at any specific mountain, county, town, or location. You do not know where the treasure is.
- IGNORE and do NOT use any section titled "Treasure-Hunt Signals", "Signals", or any block that asserts a prior location hypothesis — those are contaminated. Use only the Summary, Treasure(s), People, Places (as raw facts only), Research Findings, Themes, and Poem/Epigraph content.
- Describe constraints generically (e.g. "hiding spot is high with a long view"; "near flowing water"; "a pale rounded stone"), NOT "this points to X".

WRITE results as JSON to ${OUT}/clue-${pg}.json:
{ "page":"${pg}", "constraints":[ { "text":"<the clue/quote>", "type":"feature|direction|distance|elevation|shape|color|material|nearby|view|name|other", "reading":"<your spatial interpretation>", "confidence":"high|med|low" }, ... ] }

Return ONLY: {"file":"${OUT}/clue-${pg}.json","clues": <count>}`,
    { label: 'clue:' + pg, phase: 'Clues', schema: clueSchema }
  )
))
const okClues = clues.filter(Boolean)
log(`Blind clue extraction: ${okClues.length}/${PAGES.length} pages, ` +
  okClues.reduce((a, r) => a + (r.clues || 0), 0) + ` spatial constraints`)

// ---------------------------------------------------------------------------
// PHASE 4 — CONSTRAINTS (consolidate clue profile)
// ---------------------------------------------------------------------------
phase('Constraints')
const consSchema = {
  type: 'object',
  required: ['file', 'count'],
  properties: {
    file: { type: 'string' },
    count: { type: 'integer' },
    topTags: { type: 'array', items: { type: 'string' } },
  },
}
const cons = await agent(
  `Consolidate a blind spatial-clue dataset into a single constraint profile for a treasure hiding SPOT.

Read every file ${OUT}/clue-chapter-01.json ... clue-chapter-23.json plus clue-front-matter.json and clue-back-matter.json (skip missing).

Cluster the constraints into a deduped profile. For each distinct constraint: a short tag, a description, how many pages/chapters support it (recurrence), and an overall confidence. Rank by recurrence*confidence. Keep it about the PHYSICAL SPOT (feature type, elevation/view, water, shape, color, direction, distance, name-meaning) — discard anything that is really about a region/state.

Do NOT introduce any location. Stay blind.

WRITE to ${OUT}/CLUE-CONSTRAINTS.json:
{ "profile":[ { "tag":"...","description":"...","support":<int>,"confidence":"high|med|low" }, ... sorted strongest first ] }

Return ONLY: {"file":"${OUT}/CLUE-CONSTRAINTS.json","count":<int>,"topTags":[ up to 12 short tags ]}`,
  { label: 'build-constraints', phase: 'Constraints', schema: consSchema }
)
if (!cons) throw new Error('constraint consolidation failed — cannot proceed')
log(`Constraint profile: ${cons.count} constraints. Top: ` + (cons.topTags || []).join(', '))

// ---------------------------------------------------------------------------
// PHASE 5+6 — MATCH (blind cross) then VERIFY (adversarial), pipelined
// ---------------------------------------------------------------------------
phase('Match')
const matchSchema = {
  type: 'object',
  required: ['spot', 'matchScore', 'cluesHit', 'file'],
  properties: {
    spot: { type: 'string' },
    matchScore: { type: 'number' },
    cluesHit: { type: 'integer' },
    file: { type: 'string' },
  },
}
const verdictSchema = {
  type: 'object',
  required: ['spot', 'survives', 'jcbOk', 'distinctFit', 'verdict', 'file'],
  properties: {
    spot: { type: 'string' },
    survives: { type: 'boolean' },
    jcbOk: { type: 'boolean' },
    distinctFit: { type: 'boolean' },
    verdict: { type: 'string' },
    file: { type: 'string' },
  },
}

const results = await pipeline(
  spots,
  // STAGE 1 — blind match
  (spot, _orig, i) =>
    agent(
      `You are scoring how well ONE Rocky Face candidate spot fits a set of book-derived spatial constraints that were extracted WITHOUT any knowledge of Rocky Face. This is the blind cross — a fit only counts if the constraint genuinely matches the spot's concrete attributes.

SPOT: "${spot.name}" (${spot.type}). Read its full entry in ${OUT}/ROCKY-FACE-CATALOG.json (find this spot's attributes/coords/access).
CONSTRAINTS: read ${OUT}/CLUE-CONSTRAINTS.json (the blind profile).

For each constraint, decide HIT / PARTIAL / MISS against this spot's concrete attributes, with a one-line reason. Be strict: a constraint that would fit almost anywhere is a weak hit. Compute matchScore 0-100 (weight strong, specific, high-support constraints most) and count distinct HITs.

WRITE to ${OUT}/rfmatch-${i}.json:
{ "spot":"${spot.name}","matchScore":<0-100>,"cluesHit":<int>,"detail":[ {"constraint":"...","result":"HIT|PARTIAL|MISS","reason":"..."}, ... ] }

Return ONLY: {"spot":"${spot.name}","file":"${OUT}/rfmatch-${i}.json","matchScore":<0-100>,"cluesHit":<int>}`,
      { label: 'match:' + spot.name, phase: 'Match', schema: matchSchema }
    ),
  // STAGE 2 — adversarial pin-test + JCB hard constraints
  (m, spot, i) => {
    if (!m) return null
    return agent(
      `You are an ADVERSARIAL judge pin-testing a candidate treasure spot on Rocky Face Mountain, NC. Default to skepticism.

SPOT: "${spot.name}". Read ${OUT}/rfmatch-${i}.json (its claimed clue hits) and its entry in ${OUT}/ROCKY-FACE-CATALOG.json.

TWO tests:

1) DISTINCT FIT. Re-read the HIT constraints. Would these SAME clues fit OTHER features on Rocky Face (or any generic mountain) equally well? If the hits are generic ("high up", "has a view", "near a rock"), the spot is NOT distinctly indicated — set distinctFit=false. distinctFit=true ONLY if at least one specific, hard-to-generalize constraint singles out THIS spot.

2) JCB HARD CONSTRAINTS. Verify with WebSearch as needed that this spot plausibly satisfies the author's stated rules: on accessible PUBLIC land, within ~3 miles of a road, NOT requiring digging (not buried), NOT dangerous (no cliff-scaling or water-crossing), findable when there could be light snow, reachable to carry a >25lb load (possibly two trips). Set jcbOk = true/false.

survives = (distinctFit AND jcbOk AND matchScore is meaningful).

WRITE full reasoning to ${OUT}/rfverdict-${i}.json.
Return ONLY: {"spot":"${spot.name}","file":"${OUT}/rfverdict-${i}.json","survives":<bool>,"jcbOk":<bool>,"distinctFit":<bool>,"verdict":"<=25 words"}`,
      { label: 'verify:' + spot.name, phase: 'Verify', schema: verdictSchema }
    )
  }
)
const verdicts = results.filter(Boolean)
const survivors = verdicts.filter((v) => v.survives)
log(`Pin-test: ${verdicts.length} spots judged; ${survivors.length} survived (distinct + JCB-ok): ` +
  (survivors.map((s) => s.spot).join(', ') || 'none — expect ranked zones, not a pin'))

// ---------------------------------------------------------------------------
// PHASE 7 — SYNTHESIZE (ranked BOTG zones)
// ---------------------------------------------------------------------------
phase('Synthesize')
const verdictLines = verdicts
  .map((v) => `- ${v.spot}: survives=${v.survives}, distinctFit=${v.distinctFit}, jcbOk=${v.jcbOk} — ${v.verdict}`)
  .join('\n')

const report = await agent(
  `Write the final report: a creative-but-disciplined attempt to turn Rocky Face Mountain (Alexander County, NC) into a desk-solvable, boots-on-the-ground search plan for the Lion's Share treasure.

HOW THE DATA WAS PRODUCED (state this method up front for the reader):
- Rocky Face was exhaustively inventoried into a catalog of concrete candidate spots (${OUT}/ROCKY-FACE-CATALOG.json).
- The book's spatial clues were extracted BLIND — analysts never knew the target was Rocky Face and ignored prior-bias "signal" sections (${OUT}/CLUE-CONSTRAINTS.json).
- Each spot was scored against the blind constraint profile (rfmatch-*.json), then adversarially pin-tested for DISTINCT fit + the author's hard constraints (rfverdict-*.json).

INPUTS TO READ: ${OUT}/ROCKY-FACE-CATALOG.json, ${OUT}/CLUE-CONSTRAINTS.json, all ${OUT}/rfmatch-*.json and ${OUT}/rfverdict-*.json.
Verdict summary:
${verdictLines}

DELIVERABLE — RANKED BOTG SEARCH ZONES (do NOT force a single pin):
1. Rank the 3-5 most clue-consistent sub-areas / spots of Rocky Face as prioritized search zones. For each: name, where it is + how to access it (road, parking, trail, distance), which specific blind clues landed on it and how distinctly, the JCB-constraint check, and EXACTLY WHAT TO LOOK FOR on the ground.
2. Be explicit and honest about confidence per zone, and about whether the desk analysis genuinely PINS anything or only narrows the search. If nothing is distinctly pinned, say so plainly and present the zones as a prioritized grid-search order.
3. Note what NEW information (a specific clue, a specific measurement, an on-site observation) would most cheaply break the tie between zones — i.e. what to resolve next.
4. Surface any genuinely intriguing creative leads worth a look even if low-confidence, clearly labeled as speculative.

Keep it grounded — every claim traceable to a catalog fact or a blind clue. No invented coordinates.

WRITE the report to ${DIR}/ROCKY-FACE-CREATIVE-REPORT.md (full markdown, the BOTG zones as the centerpiece).
Return ONLY a 4-6 sentence summary: top zone(s), whether anything is distinctly pinned, overall confidence, and the single cheapest tie-breaker to resolve next.`,
  { label: 'synthesize-report', phase: 'Synthesize' }
)

log('Report written to ROCKY-FACE-CREATIVE-REPORT.md')
return { spots: spots.length, survivors: survivors.length, summary: report }
