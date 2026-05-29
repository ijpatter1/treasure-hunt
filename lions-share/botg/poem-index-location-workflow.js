export const meta = {
  name: 'poem-index-location',
  description: "Locate the Lion's Share: use Joy's Serenade as an INDEX to the clue-bearing chapters (wiki research as primary source), deduce a region, then use the poem as a MAP + web search to refine a pinpoint",
  phases: [
    { title: 'Decompose', detail: 'split the corrected poem into index- vs map-signals' },
    { title: 'Index', detail: '3 independent indexers map poem -> chapters; merge to a ranked set' },
    { title: 'GeoClues', detail: 'extract geo clues from indexed chapters (wiki primary), verify vs corrected pages/chapters + web' },
    { title: 'Deduce', detail: '5-lens panel independently deduces candidate regions' },
    { title: 'Converge', detail: 'judge + merge panel into consensus top regions' },
    { title: 'Refine', detail: 'poem-as-map + web search -> specific public-land pinpoint(s)' },
    { title: 'Verify', detail: '3-vote adversarial refutation per pinpoint' },
    { title: 'Report', detail: 'write the location report + BOTG plan' },
  ],
}

// ----------------------------------------------------------------------------
// Sources & helpers
// ----------------------------------------------------------------------------
const pad = (n) => String(n).padStart(2, '0')
const SPREAD_NAMES = [
  'front-01-02', 'front-03-04',
  'page-008-009', 'page-010-011', 'page-012-013', 'page-014-015', 'page-016-017',
  'page-018-019', 'page-020-021', 'page-022-023', 'page-024-025', 'page-026-027',
  'page-028-029', 'page-030-031', 'page-032-033', 'page-034-035', 'page-036-037',
  'page-038-039', 'page-040-041', 'page-042-043', 'page-044-045', 'page-046-047',
  'page-048-049', 'page-050-051', 'page-052-053', 'page-054-055', 'page-056-057',
  'page-058-059', 'page-060-061', 'page-062-063', 'page-064-065', 'page-066-067',
  'page-068-069', 'page-070-071', 'page-072-073', 'page-074-075', 'page-076-077',
  'page-078-079', 'page-080-081', 'page-082-083', 'page-084-085', 'page-086-087',
  'page-088-089', 'page-091-092', 'page-093-094', 'page-095-096', 'page-097-098',
  'page-099-100', 'page-101-102', 'page-103-104', 'page-105-106', 'page-107-108',
  'page-109-110', 'page-111-112', 'page-113-114', 'page-115-116', 'page-117-118',
  'page-119-120', 'page-121-122', 'page-123-124', 'page-125-126', 'page-127-128',
  'page-129-130', 'page-131-132', 'page-133-134', 'page-135-136', 'page-137-138',
  'page-139-140', 'page-141-142', 'page-143-144', 'page-145-146', 'page-147-148',
  'page-149-150', 'page-151-152', 'page-153-154', 'page-155-156', 'page-157-158',
  'page-159-160', 'page-161-162', 'page-163-164', 'page-165-166', 'page-167-168',
  'page-169-170', 'page-171-172', 'page-173-174', 'page-175-176', 'page-177-178',
  'page-179-180', 'page-181-182', 'page-183-184', 'page-185-186', 'page-187-188',
  'page-189-190', 'page-191-192', 'page-193-194', 'page-195-196', 'page-197-198',
  'page-199-200', 'page-201-202', 'page-203-204', 'page-205-206', 'page-207-208',
  'page-209-210', 'page-211-back',
]
function parseSpread(n) { const d = (n.match(/\d+/g) || []).map(Number); return { s: d[0] || 0, e: d[d.length - 1] || d[0] || 0 } }
function metaFor(start, end) { return SPREAD_NAMES.filter((n) => { const x = parseSpread(n); return x.s <= end && x.e >= start }).map((n) => 'pages/metadata/' + n + '.json') }

const RAW = [
  { num: 1, title: 'The 120 Carat Sapphire', sub: 'A Plan That Changed the World', subj: 'Mike Scott (Apple CEO #1); 120ct raw sapphire (scottyite namesake)', start: 18, end: 25 },
  { num: 2, title: 'The 100 Rings of Tuyet Nguyet', sub: "Don't Wing It", subj: 'Tuyet Nguyet (Arts of Asia founder); 100 rings; Vietnam', start: 26, end: 37 },
  { num: 3, title: 'A Puzzle Box, a Magnifying Glass, & the Mysterious Egg', sub: 'Joy Is in the Details', subj: 'Faberge magnifying glass (Perkhin); Seth Gould box-maker, Bakersville/Penland NC', start: 38, end: 45 },
  { num: 4, title: 'The 96 Carat Chivor Emerald', sub: 'Blaze the Path', subj: 'Chivor emerald (Colombia); author childhood near Hiddenite NC; Rob Lavinsky', start: 46, end: 55 },
  { num: 5, title: 'Masterworks by Art Smith', sub: 'An Exercise in Faith', subj: 'Art Smith modernist jewelry; NYC', start: 56, end: 63 },
  { num: 6, title: 'Rubies to Wear', sub: 'Inspiration Is Welcome', subj: 'ruby pendant/wing earrings; "peering behind a rock" hint', start: 64, end: 69 },
  { num: 7, title: "Amelia's Autograph", sub: 'Explore More', subj: 'Amelia Earhart; Atchison KS; "From an Airplane" poem; mountains illustration', start: 70, end: 75 },
  { num: 8, title: "Beauty's Bespoken Treasures", sub: 'Know the Past, See the Future', subj: 'Hopi; Charles Loloma / Sonwai; butterfly ("dancers"); Katsina calendar; Wheelwright Museum Santa Fe', start: 76, end: 85 },
  { num: 9, title: 'The Golden Chalice', sub: 'Confirmation Bias', subj: "golden chalice; author's Baptist father/church", start: 86, end: 94 },
  { num: 10, title: "Jackie Onassis' Diamond Sapphire Brooch", sub: 'Welcome the Good and the Bad', subj: 'Jackie Onassis brooch; Red Gate Farm / Martha\'s Vineyard MA', start: 95, end: 100 },
  { num: 11, title: 'Treasures From a Famous Shipwreck', sub: 'The Temptress Greed', subj: '1715 fleet gold; La Luz bar; Lima/Peru; FL Treasure Coast', start: 101, end: 108 },
  { num: 12, title: 'Massive Gold Rush Nugget', sub: 'Make Good Choices', subj: 'gold nugget; American River / Coloma CA; "shimmering circles of gold"', start: 109, end: 114 },
  { num: 13, title: 'Best of Its Class Jordan Rookie Card', sub: 'Be Like Mike', subj: 'Jordan rookie card; NC / UNC; author "grew up in North Carolina"', start: 115, end: 122 },
  { num: 14, title: "Tiffany's Furnace & Thoreau's Fire", sub: 'Fail Forward', subj: 'Tiffany favrile glass; Thoreau; author childhood woods (N. Iredell/Statesville NC)', start: 123, end: 132 },
  { num: 15, title: '1960 Rome Olympic Gold Medal', sub: "Don't Give Up", subj: 'Wilma Rudolph; Clarksville TN [Part Two begins]', start: 133, end: 140 },
  { num: 16, title: '1996 Atlanta Olympic Gold Medal', sub: 'Defy Expectations', subj: 'Nigeria soccer gold; Atlanta GA', start: 141, end: 150 },
  { num: 17, title: "George Washington's Jelly Glass", sub: 'Share Your Story', subj: 'GW jelly glass; Delaware crossing; GW National Forest VA/WV', start: 151, end: 158 },
  { num: 18, title: "Andrew Carnegie's Emerald", sub: 'The Science of Giving', subj: 'Carnegie emerald; author parents started church in STATESVILLE NC', start: 159, end: 164 },
  { num: 19, title: 'Moon Rocks & Meteors', sub: 'The Next Frontier', subj: 'moon rocks / meteorites; "flame of starlight"; Maine Mineral & Gem Museum', start: 165, end: 170 },
  { num: 20, title: 'The Six-Figure Birthstone', sub: 'Choosing a New Perspective', subj: '200ct smokey quartz "Beyond Brilliant"; Mark Oros (Finger Lakes NY)', start: 171, end: 178 },
  { num: 21, title: 'Antiquities of Alexander', sub: 'Make It Make Sense', subj: 'four Greek gold antiquities; Alexander the Great; Getty Villa CA', start: 179, end: 188 },
  { num: 22, title: "Picasso's Pendant", sub: 'A Love Story', subj: 'Picasso pendant; Jacqueline; "taking the first step out your door"', start: 189, end: 194 },
  { num: 23, title: 'Sing Your Own Special Song', sub: 'Finding Treasures Along the Way', subj: 'Egyptian faience; gratitude; Kimberly; Carnegie Museum Pittsburgh', start: 195, end: 198 },
]
const CHAPTERS = RAW.map((c) => ({
  ...c,
  slug: 'chapter-' + pad(c.num),
  wiki: 'wiki/chapter-' + pad(c.num) + '.html',
  md: 'chapters/chapter-' + pad(c.num) + '.md',
  meta: metaFor(c.start, c.end),
  part: c.num <= 14 ? 'One' : 'Two',
}))
const CHAPTER_REF = CHAPTERS.map((c) => `Ch${c.num} [Part ${c.part}] "${c.title}" / ${c.sub} — ${c.subj}`).join('\n')

const POEM_SOURCES = `the corrected poem text: read pages/metadata/page-205-206.json (the faithful transcription, GROUND TRUTH) and chapters/joys-serenade.md (full text + the back-cover haiku "Be solid, have grit; sparkle even as you pine. Here lies a joy divined")`

const CONTEXT = `GOAL: pinpoint the hiding place of the Lion's Share treasure box ("There's Treasure Inside" by Jon Collins-Black) for a boots-on-the-ground search.

THE "BOTH" THESIS we are operationalizing: the poem "Joy's Serenade" works on two levels at once — (a) an INDEX whose images echo specific chapter SUBJECTS, telling you which chapters carry the location clues; and (b) a MAP whose literal landscape imagery describes the actual site. Use level (a) to choose/weight chapters, then level (b) to refine and to guide the on-site search.

VERIFIED BOOK STRUCTURE (research/book-structure-verified.md): the Lion's Share has NO dedicated chapter; its clues "may be found anywhere inside this book," and "almost every chapter in PART ONE offers at least one important detail." PART TWO (chapters 15-23) is dedicated to the four SMALLER boxes. => WEIGHT Part One chapters for Lion's Share clues, but Part Two chapters still carry "morsels," so do not exclude them.

AUTHOR'S HARD CONSTRAINTS (a candidate must satisfy ALL): on accessible PUBLIC land (never private; sole exception a public-easement trail crossing private land); NOT buried (no digging); within ~3 miles of a road; not dangerous (no water crossing, swift current, cliff/rock-face climb, no dangerous ledge); not under water; do not search in snow; boots-on-the-ground required; box is >25 lb and took two trips to place (=> a carryable distance from parking, not deep backcountry). ONE box per US state; NC is verified OPEN (Fenn=Rockies, Pokemon~Arkansas, Appalachian-Trail~Vermont).

LITERAL ONLY: the author confirmed there is NO grand cipher/code. Do NOT use syllable counts, letter extraction, number-to-state mapping, or any cipher (that method produced the FAILED Rocky Face "marker 318" trip). Index links must be LITERAL/THEMATIC subject matches; map fits must be literal landscape matches.

KNOWN NEGATIVES / NOTES: Rocky Face Mountain (Alexander County NC) was searched boots-on-the-ground over multiple days and found NOTHING — but it is ALLOWED as a candidate if (and only if) the poem-index + convergence evidence independently points there; never re-select it on the old cipher. The author publicly cautioned NC is over-assumed ("the Appalachian Trail is a big place"). Travel range = ANYWHERE in the US; rank purely on evidence, do not down-weight for distance.

DISCRIMINATION RULE (this is how we avoid repeating Rocky Face): the poem's landscape imagery is GENERIC (oaks/water/rock/elevation/dark-sky fit thousands of US public lands). A location only counts if its poem-as-map fit is DISTINCTIVE versus rival sites in the same region AND an independent chapter-derived clue CONVERGES on the same geography. Weight convergence heavily; treat lone poem-imagery matches as weak.`

const GUARDRAIL = `SOURCE POLICY: the wiki (wiki/*.html) is the PRIMARY research source — it holds the per-chapter web research, "Treasure-Hunt Signals," topGeoClues, and the people/places/items/themes hub pages. BUT the wiki is the LEAST-validated layer (it was generated on pre-correction data). So: draw leads/associations from the wiki, but for any FACT a candidate location HINGES ON, VERIFY it against the corrected ground truth — chapters/*.md and pages/metadata/*.json — and against a FRESH web search. If a wiki claim conflicts with the corrected sources, use the corrected source and flag the wiki as wrong. Never let an unverified wiki fact drive the final pinpoint.`

// ----------------------------------------------------------------------------
// Schemas
// ----------------------------------------------------------------------------
const DECOMPOSE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    elements: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          text: { type: 'string' }, stanza: { type: 'number' },
          functionType: { type: 'string', enum: ['index', 'map', 'both', 'meta'] },
          literalMeaning: { type: 'string' },
        }, required: ['text', 'functionType', 'literalMeaning'],
      },
    },
    haikuNote: { type: 'string' },
    summary: { type: 'string' },
  }, required: ['elements'],
}

const INDEX_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    mappings: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          poemElement: { type: 'string' },
          chapters: { type: 'array', items: { type: 'number' } },
          rationale: { type: 'string' },
          confidence: { type: 'string', enum: ['strong', 'moderate', 'weak', 'none'] },
        }, required: ['poemElement', 'chapters', 'confidence'],
      },
    },
    rankedChapters: { type: 'array', items: { type: 'number' }, description: 'chapters most strongly pointed-to by the poem, best first' },
  }, required: ['mappings', 'rankedChapters'],
}

const MERGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    rankedChapters: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: { num: { type: 'number' }, score: { type: 'number' }, why: { type: 'string' } },
        required: ['num', 'score'],
      },
    },
    consensusNote: { type: 'string' },
  }, required: ['rankedChapters'],
}

const GEO_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    num: { type: 'number' },
    clues: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          clue: { type: 'string' },
          usGeography: { type: 'string', description: 'concrete US place(s) it points to' },
          wikiSource: { type: 'string' },
          verifiedAgainstCorrected: { type: 'string', enum: ['confirmed', 'conflicts-corrected', 'not-in-corrected', 'web-confirmed', 'unverifiable'] },
          correctedNote: { type: 'string', description: 'if it conflicted, the corrected fact' },
          strength: { type: 'string', enum: ['strong', 'moderate', 'weak'] },
        }, required: ['clue', 'usGeography', 'verifiedAgainstCorrected', 'strength'],
      },
    },
    summary: { type: 'string' },
  }, required: ['num', 'clues'],
}

const DEDUCE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    lens: { type: 'string' },
    candidates: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          region: { type: 'string' },
          state: { type: 'string' },
          evidence: { type: 'string', description: 'which indexed-chapter clues + poem signals converge here' },
          convergenceCount: { type: 'number', description: 'how many independent chapter clues point here' },
          constraintsOK: { type: 'boolean' },
          score: { type: 'number', description: '0-100' },
        }, required: ['region', 'state', 'evidence', 'score'],
      },
    },
  }, required: ['lens', 'candidates'],
}

const JUDGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    topRegions: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          region: { type: 'string' }, state: { type: 'string' },
          supportingLenses: { type: 'array', items: { type: 'string' } },
          rationale: { type: 'string' }, score: { type: 'number' },
        }, required: ['region', 'state', 'rationale', 'score'],
      },
    },
    note: { type: 'string' },
  }, required: ['topRegions'],
}

const REFINE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    region: { type: 'string' },
    pinpoints: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          name: { type: 'string' },
          approxCoords: { type: 'string' },
          poemMapFit: { type: 'array', items: { type: 'string' }, description: 'poem feature -> how this site matches (oaks/water/rock/elevation/dark-sky/dancers/circles-of-gold/pike/X)' },
          uniqueness: { type: 'string', description: 'why this beats generic rival sites in the region' },
          constraints: { type: 'string', description: 'public land? <=3mi road? not buried/dangerous? accessible?' },
          access: { type: 'string' },
          sources: { type: 'array', items: { type: 'string' } },
          confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
        }, required: ['name', 'poemMapFit', 'constraints', 'confidence'],
      },
    },
  }, required: ['region', 'pinpoints'],
}

const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    refuted: { type: 'boolean' },
    reason: { type: 'string' },
    weakestLink: { type: 'string' },
  }, required: ['refuted', 'reason'],
}

// ----------------------------------------------------------------------------
// Prompts
// ----------------------------------------------------------------------------
const decomposePrompt = `${CONTEXT}

You are decomposing the poem "Joy's Serenade" into its elements. Read ${POEM_SOURCES}.

Split the poem into discrete elements (a line, image, or instruction). For EACH, set functionType:
- "index" = it echoes a CHAPTER SUBJECT (a pointer to where clues live), e.g. "Dancers are on the land" -> the Hopi butterfly chapter.
- "map" = a literal LANDSCAPE/navigation feature of the site, e.g. "shady oaks", "sat upon a rock", "how high".
- "both" = does double duty.
- "meta" = about the hunt/poem itself (e.g. "we may find music in a poem").
Give the literal meaning of each. Also note what the back-cover haiku ("Be solid, have grit; sparkle even as you pine; Here lies a joy divined") might signal on-site. Be literal; no ciphers.`

function indexPrompt(variant) {
  return `${CONTEXT}

You are INDEXER #${variant}. Map the poem's elements to the chapters whose SUBJECT each element points to (the poem-as-index). Read ${POEM_SOURCES}. You may also open any wiki chapter page (wiki/chapter-NN.html) whose subject you want to examine — the wiki carries the per-chapter research that sharpens these matches.

CHAPTER REFERENCE:
${CHAPTER_REF}

RULES: literal/thematic subject matches only — NO ciphers, counting, or letter games. A match like "Dancers are on the land" -> Ch8 (Hopi butterfly dance) is STRONG; a vague stretch is "weak" or "none". It is fine for a pure map-signal (e.g. "shady oaks") to map to NO chapter. Weight PART ONE chapters (where Lion's Share clues concentrate), but Part Two chapters may still match. For each poem element give the chapter number(s), rationale, and confidence. Then output rankedChapters = the chapters most strongly pointed-to overall.`
}

function mergePrompt(matrices) {
  return `${CONTEXT}

Three independent indexers each mapped the poem to chapters. Reconcile them into ONE consensus ranking of which chapters the poem points to (the chapters to mine for the location). Reward agreement across indexers and strong/literal links; discount lone weak stretches. Part-One weighting applies.

INDEXER OUTPUTS:
${JSON.stringify(matrices)}

Return rankedChapters (num, score 0-100, why) best-first, plus a consensusNote on how clearly the poem indexes a coherent chapter set.`
}

function geoPrompt(ch) {
  return `${CONTEXT}

${GUARDRAIL}

You are extracting and VERIFYING the geographic clues from ONE indexed chapter, then reporting which concrete US places they point to.

CHAPTER ${ch.num}: "${ch.title}" / ${ch.sub} (Part ${ch.part})
- PRIMARY (rich research): read the wiki page ${ch.wiki} — its Research Findings, Treasure-Hunt Signals, Places section, and topGeoClue.
- GROUND TRUTH for verification: ${ch.md} and these page transcriptions: ${ch.meta.join(', ')}.
- Use FRESH web search (load tools: ToolSearch query "select:WebSearch,WebFetch") to confirm any geographic fact a location would hinge on.

For each geographic clue / clue-by-association: state the clue, the concrete US geography it points to, the wiki source, whether it is confirmed/conflicts/not-found against the corrected sources (and the corrected fact if it conflicts), and its strength. DROP or mark "conflicts-corrected" anything the corrected sources contradict (do not let it drive a location). Be literal; respect the hard constraints.`
}

const LENSES = [
  { key: 'literal-placenames', prompt: 'Weight EXPLICIT place names, bearings, and directions that appear in the indexed chapters and the poem. Blind to author biography.' },
  { key: 'item-association', prompt: 'Weight where the treasure ITEMS originate, are displayed/curated, were made, or are memorialized (museums, towns, monuments) on accessible US public land.' },
  { key: 'convergence-max', prompt: 'Weight ONLY regions where MULTIPLE independent indexed-chapter clues converge on the same geography; ignore lone clues. This is the most important lens.' },
  { key: 'author-biography', prompt: "Weight the author's documented life geography (NC childhood near Hiddenite/Statesville/N.Iredell/Hickory; family near Bakersville/Mitchell Co; 20+ years in California; box-maker Seth Gould in Bakersville/Penland) — but ONLY where an independent chapter or poem clue corroborates it. Prior-informed lens." },
  { key: 'poem-map-landscape', prompt: 'Weight the poem-as-MAP: find US regions whose landscape matches the literal imagery (peaked hills "pike all around", water, oaks, elevation/"how high", open dark sky/"flame of starlight", butterflies/"dancers", "shimmering circles of gold" = aspen/sun/gold). Then check which indexed chapters point there.' },
]

function deducePrompt(lens, poem, geo, indexed) {
  return `${CONTEXT}

You are a DEDUCER using the "${lens.key}" lens. ${lens.prompt}

Piece together a location for the Lion's Share from the evidence below and your lens. Read the wiki hub pages wiki/places.html (geography aggregated across chapters) and wiki/people.html / wiki/items.html if helpful. Respect ALL hard constraints. Be literal — NO ciphers. Rocky Face/Alexander Co NC is allowed ONLY if the evidence independently points there.

POEM ELEMENTS (index/map tags):
${JSON.stringify(poem.elements || poem)}

INDEXED CHAPTERS (poem points here):
${JSON.stringify(indexed)}

VERIFIED GEO-CLUES from indexed chapters:
${JSON.stringify(geo)}

Output a ranked list of candidate REGIONS (region, state, the converging evidence, convergenceCount, constraintsOK, score 0-100). Prefer regions where multiple independent clues converge AND the poem-as-map fits distinctively.`
}

function judgePrompt(panel) {
  return `${CONTEXT}

Five lenses independently deduced candidate regions for the Lion's Share. Merge them into a consensus shortlist of the TOP regions. Reward regions supported by MULTIPLE lenses and by clue convergence; be skeptical of regions resting on a single lens or on generic poem imagery alone. Note disagreements honestly.

PANEL OUTPUTS:
${JSON.stringify(panel)}

Return topRegions (region, state, supportingLenses, rationale, score) best-first, and a note on how strongly (or weakly) the evidence converges.`
}

function refinePrompt(region, poem) {
  return `${CONTEXT}

${GUARDRAIL}

You are REFINING one region into a specific public-land pinpoint using the poem AS A MAP plus web search.

REGION: ${JSON.stringify(region)}

Load web tools (ToolSearch query "select:WebSearch,WebFetch"). Within this region, find the specific public-land site(s) that best match the poem's literal landscape checklist AND satisfy every hard constraint (public land, within ~3 mi of a road, not buried, not dangerous, not underwater, carryable from parking). Use the poem's MAP elements:
${JSON.stringify((poem.elements || []).filter((e) => e.functionType === 'map' || e.functionType === 'both'))}

For each candidate pinpoint give: name, approx coordinates, a poem-feature-by-feature fit list, why it BEATS generic rival sites nearby (uniqueness — this is essential), the constraint check, access notes, sources, and confidence. If nothing in the region fits distinctively, say so (better an honest "no strong pin" than a forced one).`
}

function refutePrompt(pinpoint, n) {
  return `${CONTEXT}

You are SKEPTIC #${n}. Try to REFUTE this proposed Lion's Share pinpoint. Default to refuted=true unless it clearly survives. Load web tools if useful (ToolSearch "select:WebSearch,WebFetch").

PINPOINT: ${JSON.stringify(pinpoint)}

Attack it on: (1) is the poem-as-map fit DISTINCTIVE or could it match countless other sites? (2) does any independent chapter clue actually converge here, or is it poem-imagery alone? (3) does it violate ANY hard constraint (private land, >3mi from road, buried/dangerous/underwater, deep backcountry)? (4) is the index->chapter->this-place chain literal, or does it secretly rely on a stretch/cipher? (5) is there a disqualifier (closure, one-box-per-state collision)? Refute if it fails any of these or if the fit is merely generic.`
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
phase('Decompose')
const poem = await agent(decomposePrompt, { schema: DECOMPOSE_SCHEMA, phase: 'Decompose', label: 'poem:decompose' })

phase('Index')
const matrices = (await parallel([1, 2, 3].map((v) => () => agent(indexPrompt(v), { schema: INDEX_SCHEMA, phase: 'Index', label: 'indexer:' + v })))).filter(Boolean)
const merged = await agent(mergePrompt(matrices), { schema: MERGE_SCHEMA, phase: 'Index', label: 'index:merge' })
const topChapterNums = (merged.rankedChapters || []).slice(0, 10).map((c) => c.num)
const topChapters = topChapterNums.map((n) => CHAPTERS.find((c) => c.num === n)).filter(Boolean)
log('Poem indexes chapters: ' + topChapterNums.join(', '))

phase('GeoClues')
const geo = (await parallel(topChapters.map((ch) => () => agent(geoPrompt(ch), { schema: GEO_SCHEMA, phase: 'GeoClues', label: 'geo:ch' + ch.num })))).filter(Boolean)

phase('Deduce')
const panel = (await parallel(LENSES.map((lens) => () => agent(deducePrompt(lens, poem, geo, merged.rankedChapters), { schema: DEDUCE_SCHEMA, phase: 'Deduce', label: 'deduce:' + lens.key })))).filter(Boolean)

phase('Converge')
const judged = await agent(judgePrompt(panel), { schema: JUDGE_SCHEMA, phase: 'Converge', label: 'judge:merge' })
const topRegions = (judged.topRegions || []).slice(0, 3)
log('Top regions: ' + topRegions.map((r) => r.region + ' (' + r.state + ')').join(' | '))

phase('Refine')
const refined = (await parallel(topRegions.map((r) => () => agent(refinePrompt(r, poem), { schema: REFINE_SCHEMA, phase: 'Refine', label: 'refine:' + (r.state || r.region).slice(0, 18) })))).filter(Boolean)

phase('Verify')
const pinpoints = refined.flatMap((r) => (r.pinpoints || []).map((p) => ({ ...p, region: r.region })))
const verified = await parallel(pinpoints.map((p) => () =>
  parallel([1, 2, 3].map((n) => () => agent(refutePrompt(p, n), { schema: VERDICT_SCHEMA, phase: 'Verify', label: 'refute:' + (p.name || '').slice(0, 18) + ':' + n })))
    .then((votes) => {
      const v = votes.filter(Boolean)
      const refutes = v.filter((x) => x.refuted).length
      return { pinpoint: p, votes: v, refutes, survives: refutes < 2 }
    })
))
const survivors = verified.filter((x) => x && x.survives)
const killed = verified.filter((x) => x && !x.survives)
log('Pinpoints: ' + survivors.length + ' survived, ' + killed.length + ' refuted (>=2/3 votes)')

phase('Report')
await agent(
  `${CONTEXT}

Write the file POEM-INDEX-LOCATION-REPORT.md (repo root, use the Write tool) — the deduction of the Lion's Share location via poem-as-index then poem-as-map.

Structure:
- TL;DR: the single best pinpoint (or honest "no strong pin"), its region, confidence, and the one-line case.
- How the poem INDEXED the chapters: the ranked chapters it points to and why (the index result).
- The deduced REGION(s) and the convergence behind them (which independent chapter clues + lenses agreed).
- The refined PINPOINT(s): for each surviving one, the poem-as-MAP feature-by-feature fit, why it beats generic rivals (uniqueness), the constraint check, access, and sources.
- Adversarial results: which pinpoints were refuted and why (be honest; list the killed ones).
- A concrete BOOTS-ON-THE-GROUND plan for the top pinpoint: what to look for using the poem as a map, access/parking, the ~3mi-from-road check, season, and a fast falsification test.
- How this differs from the FAILED Rocky Face derivation (no cipher; literal index + convergence + distinctive map fit). State plainly if Rocky Face re-surfaced on the new evidence or not.
- Honest confidence + biggest risk.

DATA:
Poem decomposition: ${JSON.stringify(poem)}
Indexed chapters (consensus): ${JSON.stringify(merged.rankedChapters)}
Verified geo-clues: ${JSON.stringify(geo)}
Panel: ${JSON.stringify(panel)}
Judged regions: ${JSON.stringify(judged)}
Refined pinpoints: ${JSON.stringify(refined)}
Surviving pinpoints: ${JSON.stringify(survivors.map((s) => ({ name: s.pinpoint.name, region: s.pinpoint.region, refutes: s.refutes })))}
Refuted pinpoints: ${JSON.stringify(killed.map((s) => ({ name: s.pinpoint.name, refutes: s.refutes, reasons: s.votes.map((v) => v.reason) })))}

Return the single word DONE.`,
  { phase: 'Report', label: 'write:location-report' }
)

return {
  indexedChapters: merged.rankedChapters,
  topRegions: topRegions.map((r) => ({ region: r.region, state: r.state, score: r.score })),
  survivingPinpoints: survivors.map((s) => ({ name: s.pinpoint.name, region: s.pinpoint.region, refutes: s.refutes, confidence: s.pinpoint.confidence })),
  refutedCount: killed.length,
}
