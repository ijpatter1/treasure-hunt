export const meta = {
  name: 'map-conjunction-location',
  description: "Map-first search: derive the poem's full physical-feature conjunction, search US public lands that satisfy ALL of it distinctively, then require independent chapter/index convergence",
  phases: [
    { title: 'Spec', detail: "decompose the poem into a weighted physical-feature conjunction + ideal-site profile" },
    { title: 'Scout', detail: 'parallel web searches by different lenses for public lands matching the full conjunction' },
    { title: 'Shortlist', detail: 'dedupe + score candidates on full-conjunction distinctiveness' },
    { title: 'Converge', detail: 'require independent chapter/index/author convergence (anti-Pikes-Peak filter)' },
    { title: 'Refine', detail: 'drill convergent candidates to specific public-land pinpoints (web)' },
    { title: 'Verify', detail: '3-vote adversarial refutation per pinpoint' },
    { title: 'Report', detail: 'write the map-conjunction location report' },
  ],
}

const POEM_SOURCES = `the corrected poem: read pages/metadata/page-205-206.json (faithful transcription, GROUND TRUTH) and chapters/joys-serenade.md (full text + back-cover haiku "Be solid, have grit; sparkle even as you pine. Here lies a joy divined")`

const CONTEXT = `GOAL: pinpoint the Lion's Share treasure box ("There's Treasure Inside" by Jon Collins-Black) on accessible US public land, for a boots-on-the-ground search.

THIS WORKFLOW IS THE INVERSE of an earlier index-first pass. The earlier pass deduced two MODERATE regions but ZERO surviving pinpoints, because the poem's imagery is landscape-GENERIC. So here we go MAP-FIRST: treat "Joy's Serenade" + the back-cover haiku as a CONJUNCTION of physical features and find the US public land that satisfies ALL of them DISTINCTIVELY, then require independent chapter convergence.

THE FEATURE CONJUNCTION (these co-occur at the site — that is what makes it discriminating):
- "shady oaks" — oak shade after a warm/exposed approach (temperate, mid-elevation; NOT alpine, NOT desert).
- haiku "sparkle even as you pine" — pine trees present too (mixed oak-pine forest), and a rock that SPARKLES.
- haiku "Be solid, have grit; sparkle" + "sat upon a rock, allowing nature's wide embrace" — a SOLID, GRITTY, SPARKLING freestanding rock/outcrop (granite or gritstone with visible mica/quartz sparkle) you can sit on/at; the box rests at or under it (NOT buried).
- "There may be magic in the water" — a water feature in view (lake/river/spring/falls), but NOT crossed.
- "if you don't go down you may never know how high you ever want to be" / "The sky smiles on you" — elevation / a high open vantage.
- "the pike are rather all around" — peaked hills/mountains visible all around ("pike" = Lake-District dialect for a peaked hill).
- "stay to see the night... ignite with the flame of starlight" — dark, star-visible sky (low light pollution, open sky).
- "Dancers are on the land" — notable butterflies / wildflower meadow on open ground.
- "an X leads the way" — a trail/road crossing or X-shaped junction (or a literal X feature); "follow shimmering circles of gold" — a golden feature (aspen groves, sun glinting on water, golden lichen/flowers).
- "where few have seen it" — secluded-ish, NOT the most-trafficked overlook — yet reachable.

HARD CONSTRAINTS (a candidate MUST satisfy all): accessible PUBLIC land (never private; sole exception a public-easement trail crossing private land); within ~3 miles of a road; NOT buried (no digging); not dangerous (no water crossing, swift current, cliff/rock-face climb, dangerous ledge); not under water; searchable when snow-free; box is >25 lb and took two trips (carryable from parking, not deep backcountry). ONE box per US state (NC verified OPEN; Fenn box recovered in WYOMING 2020, Pokemon~Arkansas, Appalachian-Trail box~Vermont — so do not field a site that collides with a state already consumed, and avoid the AT itself since the AT box is Vermont's).

DISCRIMINATION + CONVERGENCE (the whole point):
- A candidate must satisfy the FULL conjunction BETTER than rival public lands. Partial fits are weak (e.g., high alpine balds FAIL "shady oaks"; bare granite domes FAIL the oak-pine shade pattern; low desert FAILS oaks/dark-cool).
- MAP-FIT ALONE IS NOT ENOUGH. A distinctive full-conjunction site with NO independent chapter/index/author convergence is DESK-ONLY — that is exactly the generic-imagery-on-a-pretty-place failure mode (Pikes Peak / the failed Rocky Face trip). To be FIELDED, a candidate must ALSO have independent textual convergence.

LITERAL ONLY: the author confirmed NO grand cipher/code. No syllable counts, letter extraction, or number-to-state mapping. Features and place-matches must be literal.

INDEX-PASS RESULT (for the convergence check — what the book's text independently points to):
- The poem indexes hardest at Ch8 (Hopi "Dancers"/butterflies — but Hopi land is sovereign tribal, public-access-blocked), Ch19 (meteors/stargazing — foreign find-sites), Ch12 (Gold Rush, "American River... 40 mi E of Sacramento"), Ch3 (the only named US town+bearing in the book: "Bakersville, 40 mi NE of Asheville", home of box-maker Seth Gould).
- The two explicit in-text BEARINGS define corridors: ~40 mi NE of Asheville NC (Mitchell Co / Roan area), and ~40 mi E of Sacramento CA (American River / Coloma, El Dorado Co).
- Author biography: childhood in western NC (Hiddenite/Statesville/Iredell — note Hiddenite parcels are private + already-searched-empty); stated home state California for 20+ years. Item associations span the US.
- Known negative: Rocky Face Mtn / Alexander Co NC was searched and found NOTHING; allow it ONLY if it independently wins the full conjunction + convergence (it will not — it failed the map conjunction too).
Travel range = ANYWHERE in the US; rank purely on evidence.`

const SPEC_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    features: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { name: { type: 'string' }, poemLine: { type: 'string' }, literalReading: { type: 'string' }, landscapeImplication: { type: 'string' }, requirement: { type: 'string', enum: ['hard', 'strong', 'soft'] } }, required: ['name', 'literalReading', 'landscapeImplication', 'requirement'] } },
    idealProfile: { type: 'string', description: 'one-paragraph composite signature of the ideal site (ecology + geology + topography + sky)' },
    searchHints: { type: 'array', items: { type: 'string' }, description: 'concrete US-region types that fit the full conjunction (e.g. Sierra mid-elevation oak-pine + granite, Black Hills ponderosa+oak+granite Needles, etc.)' },
  }, required: ['features', 'idealProfile'],
}

const SCOUT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    lens: { type: 'string' },
    candidates: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      site: { type: 'string' }, state: { type: 'string' }, publicLandType: { type: 'string' },
      featureFit: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { feature: { type: 'string' }, fit: { type: 'string', enum: ['yes', 'partial', 'no'] }, note: { type: 'string' } }, required: ['feature', 'fit'] } },
      distinctiveness: { type: 'string' }, constraintsOK: { type: 'boolean' }, score: { type: 'number' },
      sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['url'] } },
    }, required: ['site', 'state', 'featureFit', 'score'] } },
  }, required: ['lens', 'candidates'],
}

const SHORTLIST_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    shortlist: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { site: { type: 'string' }, state: { type: 'string' }, foundByLenses: { type: 'array', items: { type: 'string' } }, fullConjunctionScore: { type: 'number' }, missingFeatures: { type: 'array', items: { type: 'string' } }, rationale: { type: 'string' } }, required: ['site', 'state', 'fullConjunctionScore', 'rationale'] } },
    note: { type: 'string' },
  }, required: ['shortlist'],
}

const CONVERGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    site: { type: 'string' },
    hasChapterConvergence: { type: 'boolean' },
    convergingClues: { type: 'array', items: { type: 'string' } },
    nearBearingCorridor: { type: 'string', description: 'which in-text bearing it falls near, or "none"' },
    convergenceStrength: { type: 'string', enum: ['strong', 'moderate', 'weak', 'none'] },
    verdict: { type: 'string', enum: ['field-candidate', 'desk-only-no-convergence', 'weak'] },
    note: { type: 'string' },
  }, required: ['site', 'hasChapterConvergence', 'convergenceStrength', 'verdict'],
}

const REFINE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    site: { type: 'string' },
    pinpoints: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      name: { type: 'string' }, approxCoords: { type: 'string' },
      fullFit: { type: 'array', items: { type: 'string' }, description: 'feature -> how this exact spot satisfies it' },
      uniqueness: { type: 'string' }, constraints: { type: 'string' }, access: { type: 'string' },
      sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['url'] } },
      confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
    }, required: ['name', 'fullFit', 'constraints', 'confidence'] } },
  }, required: ['site', 'pinpoints'],
}

const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { refuted: { type: 'boolean' }, reason: { type: 'string' }, weakestLink: { type: 'string' } }, required: ['refuted', 'reason'],
}

const specPrompt = `${CONTEXT}

You are building the FEATURE SPECIFICATION. Read ${POEM_SOURCES}.

Decompose the poem + haiku into the physical-feature CONJUNCTION (the features listed in the context, refined in your own words). For each feature: the poem line, its literal reading, the landscape/geology/ecology/topography it IMPLIES, and whether it is a hard / strong / soft requirement. Then write a one-paragraph "ideal site profile" — the composite signature (what ecology + geology + topography + night sky a site must have to satisfy ALL features at once). Finally list searchHints: concrete US-region TYPES that plausibly satisfy the full conjunction (think about where oak-pine forest + sparkling granite/gritstone outcrops + water + elevation + a ring of peaks + dark sky + butterflies co-occur). Literal only.`

const LENSES = [
  { key: 'geology-oakpine', focus: 'Geology+ecology first: US public lands with SPARKLING granite or gritstone outcrops set in MIXED OAK-PINE forest at mid-elevation, with a water feature and peaks around. (Sierra foothills/mid-elevation, Black Hills Needles, southern Appalachian granite, Texas Hill Country granite, sky islands, etc.)' },
  { key: 'dark-sky', focus: 'Dark-sky first: IDA-certified or renowned dark-sky PUBLIC lands that ALSO have oak-pine forest + a sparkling rock outcrop + water + a ring of peaks + butterflies, within 3 mi of a road.' },
  { key: 'peaks-ring', focus: '"Pike all around" first: basins, parks, or mid-elevation benches RINGED by named peaks, that also have oak-pine + sparkling granite + water + dark sky + butterflies on accessible public land.' },
  { key: 'butterfly-wildflower', focus: 'Butterfly/wildflower first: US public lands famous for butterflies or wildflower meadows ("Dancers on the land") that ALSO satisfy the oak-pine + sparkling rock + water + elevation + peaks + dark-sky features.' },
  { key: 'bearing-corridors', focus: 'Test the two explicit in-text bearings against the FULL conjunction: within ~40 mi NE of Asheville NC, and within ~40 mi E of Sacramento CA, is there a PUBLIC-LAND site that satisfies the ENTIRE conjunction distinctively (oak-pine + sparkling granite + water + elevation + peak-ring + dark sky + butterflies + road-X)? Be honest if neither corridor contains a full-conjunction site.' },
  { key: 'literal-names', focus: 'Literal place-names matching poem words (Pike, Gold/Golden, Star, Dancer/Butterfly, X, Square, Arc) — BUT only count a site if it ALSO physically satisfies the full feature conjunction on accessible public land (a name alone is worthless).' },
  { key: 'granite-domes-water', focus: 'Sitting-rock first: US public lands with a famous freestanding/sittable granite outcrop or dome beside water and below an oak-pine canopy, with peaks visible and dark skies (e.g. Sierra, Black Hills, Enchanted Rock-type, Appalachian, Ozark/St. Francois granite).' },
]

function scoutPrompt(lens) {
  return `${CONTEXT}

You are a SCOUT using the "${lens.key}" lens. ${lens.focus}

FEATURE SPEC (the conjunction every candidate must satisfy):
__SPEC__

Load web tools (ToolSearch query "select:WebSearch,WebFetch") and search the US PUBLIC-LAND space for sites that satisfy the FULL conjunction DISTINCTIVELY. For each candidate, give a feature-by-feature fit (yes/partial/no + note), its distinctiveness vs rival sites, whether it meets ALL hard constraints, a score 0-100, and sources. Prioritize sites that hit EVERY feature; a site missing a hard feature (e.g. no oaks, or bare-rock-no-pine, or no peaks-around, or light-polluted) is weak. Be honest — if your lens finds few or no full-conjunction sites, say so rather than forcing one.`
}

function shortlistPrompt(allCandidates, spec) {
  return `${CONTEXT}

Consolidate the scouts' candidates into a ranked SHORTLIST by FULL-CONJUNCTION fit. Dedupe the same site found by multiple lenses (reward multi-lens agreement). Score each on how many features it satisfies DISTINCTIVELY and whether it meets all hard constraints; list any missing features. Drop sites that fail a hard constraint or miss a hard feature. Return the top ~8.

IDEAL PROFILE: ${JSON.stringify(spec.idealProfile)}
CANDIDATES (from all lenses):
${JSON.stringify(allCandidates)}`
}

function convergePrompt(site) {
  return `${CONTEXT}

You are applying the CONVERGENCE FILTER (anti-Pikes-Peak) to ONE map-fit candidate. The question: does any INDEPENDENT textual signal — a chapter/index clue, an item association, the author's biography, or one of the two in-text bearings — point to THIS geography? Map-fit alone is not enough.

CANDIDATE: ${JSON.stringify(site)}

Consult the index-pass result (in the context above), and open wiki/places.html or the relevant wiki/chapters/*.md if useful, plus a web check. Decide: hasChapterConvergence (true/false), the converging clues, whether it is near one of the two bearing corridors, the convergence strength, and a verdict: "field-candidate" (distinctive map fit AND real convergence), "desk-only-no-convergence" (great map fit but no textual support — the Pikes Peak trap), or "weak".`
}

function refinePrompt(site) {
  return `${CONTEXT}

You are REFINING one convergent candidate to specific public-land pinpoint(s) that satisfy the FULL feature conjunction. Load web tools (ToolSearch "select:WebSearch,WebFetch").

CANDIDATE (map-fit + convergence): ${JSON.stringify(site)}

Find the exact public-land sub-site(s): a specific sittable sparkling rock/outcrop in oak-pine, water in view, elevated with peaks around, dark sky, butterflies, near a trail/road "X", within 3 mi of a road, not buried/dangerous, carryable from parking. Give a feature-by-feature fit for the exact spot, why it beats rival spots nearby (uniqueness), the constraint check, access, sources, and confidence. Honest "no single spot satisfies the full conjunction here" is allowed.`
}

function refutePrompt(p, n) {
  return `${CONTEXT}

You are SKEPTIC #${n}. Try to REFUTE this proposed Lion's Share pinpoint. Default to refuted=true unless it clearly survives. Load web tools if useful.

PINPOINT: ${JSON.stringify(p)}

Attack: (1) does it ACTUALLY satisfy the full conjunction, or does it miss features (no oaks? bare rock no pine? no peak-ring? light-polluted? no water?)? (2) is the fit DISTINCTIVE or would countless sites match? (3) real independent chapter/author convergence, or map-fit alone (Pikes Peak trap)? (4) any HARD-constraint violation (private, >3mi road, buried/dangerous, deep backcountry, snow-locked, one-box state collision, on the AT)? (5) any disqualifier (closure, etc.)? Refute if it fails any.`
}

// ---- Run ----
phase('Spec')
const spec = await agent(specPrompt, { schema: SPEC_SCHEMA, phase: 'Spec', label: 'feature-spec' })

phase('Scout')
const scoutResults = (await parallel(LENSES.map((l) => () => agent(scoutPrompt(l).replace('__SPEC__', JSON.stringify(spec.features)), { schema: SCOUT_SCHEMA, phase: 'Scout', label: 'scout:' + l.key })))).filter(Boolean)
const allCandidates = scoutResults.flatMap((r) => (r.candidates || []).map((c) => ({ ...c, lens: r.lens })))
log('Scouts proposed ' + allCandidates.length + ' candidate sites across ' + scoutResults.length + ' lenses')

phase('Shortlist')
const shortlistRes = await agent(shortlistPrompt(allCandidates, spec), { schema: SHORTLIST_SCHEMA, phase: 'Shortlist', label: 'shortlist' })
const shortlist = (shortlistRes.shortlist || []).slice(0, 8)
log('Shortlist: ' + shortlist.map((s) => s.site + ' (' + s.state + ')').join(' | '))

phase('Converge')
const converged = (await parallel(shortlist.map((s) => () => agent(convergePrompt(s), { schema: CONVERGE_SCHEMA, phase: 'Converge', label: 'converge:' + (s.site || '').slice(0, 20) })))).filter(Boolean)
const fieldCandidates = shortlist.filter((s) => {
  const c = converged.find((x) => x.site === s.site) || converged.find((x) => (x.site || '').includes((s.site || '').slice(0, 12)))
  return c && c.verdict === 'field-candidate'
}).map((s) => {
  const c = converged.find((x) => x.site === s.site) || converged.find((x) => (x.site || '').includes((s.site || '').slice(0, 12)))
  return { ...s, convergence: c }
})
const deskOnly = converged.filter((c) => c.verdict === 'desk-only-no-convergence')
log('Convergence filter: ' + fieldCandidates.length + ' field-candidates, ' + deskOnly.length + ' desk-only (map-fit but no convergence)')

phase('Refine')
const toRefine = (fieldCandidates.length ? fieldCandidates : shortlist.slice(0, 3)).slice(0, 4)
const refined = (await parallel(toRefine.map((s) => () => agent(refinePrompt(s), { schema: REFINE_SCHEMA, phase: 'Refine', label: 'refine:' + (s.site || '').slice(0, 18) })))).filter(Boolean)

phase('Verify')
const pinpoints = refined.flatMap((r) => (r.pinpoints || []).map((p) => ({ ...p, site: r.site })))
const verified = await parallel(pinpoints.map((p) => () =>
  parallel([1, 2, 3].map((n) => () => agent(refutePrompt(p, n), { schema: VERDICT_SCHEMA, phase: 'Verify', label: 'refute:' + (p.name || '').slice(0, 16) + ':' + n })))
    .then((votes) => { const v = votes.filter(Boolean); const refutes = v.filter((x) => x.refuted).length; return { pinpoint: p, votes: v, refutes, survives: refutes < 2 } })
))
const survivors = verified.filter((x) => x && x.survives)
const killed = verified.filter((x) => x && !x.survives)
log('Pinpoints: ' + survivors.length + ' survived, ' + killed.length + ' refuted')

phase('Report')
await agent(
  `${CONTEXT}

Write the file MAP-CONJUNCTION-LOCATION-REPORT.md (repo root, use the Write tool) — the map-first deduction of the Lion's Share location.

Structure:
- TL;DR: the single best surviving pinpoint (or honest "no surviving pin"), its full-conjunction fit, convergence, and confidence.
- The FEATURE SPEC used (the conjunction + ideal-site profile).
- The shortlist of full-conjunction map-fit sites (ranked), with each site's feature fit and any missing features.
- The CONVERGENCE filter results: which sites had independent chapter/index/author support (field-candidates) vs distinctive-map-fit-but-no-convergence (desk-only, the Pikes Peak trap) — name both.
- The refined pinpoint(s): feature-by-feature fit for the exact spot, uniqueness, constraint check, access, sources.
- Adversarial results: which pins survived / were refuted and why.
- How this compares to the index-first pass (did map-first surface a NEW region the index missed? did it corroborate NC-Roan or CA-American-River? did anything finally produce a defensible pin?).
- A boots-on-the-ground plan for the best surviving (or best field-) candidate, with a fast falsification test.
- Honest confidence + biggest risk + recommended next step.

DATA:
Feature spec: ${JSON.stringify(spec)}
Shortlist: ${JSON.stringify(shortlistRes)}
Convergence: ${JSON.stringify(converged)}
Refined: ${JSON.stringify(refined)}
Survivors: ${JSON.stringify(survivors.map((s) => ({ name: s.pinpoint.name, site: s.pinpoint.site, refutes: s.refutes, confidence: s.pinpoint.confidence })))}
Refuted: ${JSON.stringify(killed.map((s) => ({ name: s.pinpoint.name, refutes: s.refutes, reasons: s.votes.map((v) => v.reason) })))}

Return the single word DONE.`,
  { phase: 'Report', label: 'write:map-conjunction-report' }
)

return {
  shortlist: shortlist.map((s) => ({ site: s.site, state: s.state, score: s.fullConjunctionScore })),
  fieldCandidates: fieldCandidates.map((s) => s.site),
  deskOnly: deskOnly.map((c) => c.site),
  survivingPinpoints: survivors.map((s) => ({ name: s.pinpoint.name, site: s.pinpoint.site, refutes: s.refutes, confidence: s.pinpoint.confidence })),
  refutedCount: killed.length,
}
