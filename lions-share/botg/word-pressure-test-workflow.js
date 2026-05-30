export const meta = {
  name: 'word-pressure-test',
  description: 'Blind "look past the myth at the word" sweep across EVERY proper noun in the wiki; rank US locations by wordplay-wink density; adversarially judge rivals; then check where Alexander/Hiddenite lands. Honest falsification of our own favored answer.',
  phases: [
    { title: 'Extract', detail: 'one blind agent per wiki page pulls every proper noun' },
    { title: 'Wordplay', detail: 'one blind agent per page: which US place does each word wink at?' },
    { title: 'Aggregate', detail: 'build location->supporting-nouns density map' },
    { title: 'Judge', detail: 'adversarial + web-verified rival test on top locations' },
    { title: 'Synthesize', detail: 'rank rivals; locate Alexander/Hiddenite in the blind ranking' },
  ],
}

const DIR = '/Users/ipatterson/dev/treasure-hunt/lions-share'
const OUT = DIR + '/botg/wordtest'
const WIKI = DIR + '/wiki'

// 23 chapters + front + back matter = the content pages (reference aggregate
// pages people/places/items/themes are derived from these, so we skip them to
// avoid double-counting the same nouns).
const PAGES = []
for (let i = 1; i <= 23; i++) PAGES.push('chapter-' + String(i).padStart(2, '0'))
PAGES.push('front-matter')
PAGES.push('back-matter')

// ---------------------------------------------------------------------------
// PHASE 1 — EXTRACT (blind)
// ---------------------------------------------------------------------------
phase('Extract')
const extractSchema = {
  type: 'object',
  required: ['file', 'count'],
  properties: {
    file: { type: 'string' },
    count: { type: 'integer' },
  },
}

const extracted = await parallel(PAGES.map((pg) => () =>
  agent(
    `You are doing a neutral lexical inventory. Read the file ${WIKI}/${pg}.html .

Extract EVERY proper noun and named entity that appears anywhere in the page text — be exhaustive and literal. Include:
- person names (real or mythological), e.g. "Andrew Carnegie", "Athena"
- place names (cities, counties, states, countries, regions, mountains, rivers, landmarks)
- myth / legend / deity / creature names (e.g. "Nemean lion", "Pegasus")
- brand / company / institution names (e.g. "Tiffany", "Carnegie Hall")
- titles of works, items, gems, ships, medals (e.g. "Chivor Emerald", "Hope Diamond")
- any other capitalized named thing

For each entity capture: the surname/core word, the full form, a one-word type (person|place|myth|brand|item|title|other), and the literal meaning or etymology if you know it (e.g. "Chivor = old emerald-mine region in Colombia"; "Nemean = of Nemea, Greece"; "Hiddenite = green gem named after E. Hidden").

Do NOT interpret, do NOT guess locations, do NOT speculate about treasure. This is a dictionary task only.

WRITE your output as JSON to ${OUT}/nouns-${pg}.json with shape:
{ "page": "${pg}", "entities": [ { "core": "...", "full": "...", "type": "...", "meaning": "..." }, ... ] }

Return ONLY: {"file":"${OUT}/nouns-${pg}.json","count": <number of entities>}`,
    { label: 'extract:' + pg, phase: 'Extract', schema: extractSchema }
  )
))
const okExtract = extracted.filter(Boolean)
log(`Extracted nouns from ${okExtract.length}/${PAGES.length} pages (` +
  okExtract.reduce((s, r) => s + (r.count || 0), 0) + ` total entities)`)

// ---------------------------------------------------------------------------
// PHASE 2 — WORDPLAY (blind)
// ---------------------------------------------------------------------------
phase('Wordplay')
const winkSchema = {
  type: 'object',
  required: ['file', 'winks'],
  properties: {
    file: { type: 'string' },
    winks: { type: 'integer' },
  },
}

const winked = await parallel(PAGES.map((pg) => () =>
  agent(
    `You are a wordplay analyst applying ONE specific technique: "look past the myth at the word."

Read the entity list at ${OUT}/nouns-${pg}.json (each has core/full/type/meaning).

For EACH entity, ignore its fame/story and ask: does the WORD ITSELF — its spelling, sound, substrings, or literal meaning/translation — point to a REAL place in the United States (a town, county, mountain, river, lake, landmark, or named feature)?

Recognize these legitimate wink types (plain-language only, NEVER ciphers/letter-counting/acrostics):
- SUBSTRING/HOMOPHONE: the word contains or sounds like a US place name (e.g. an entity containing "hidden" -> a town named Hidden-something; "Alexander" -> Alexander County).
- MEANING/TRANSLATION: the word's literal meaning is a US place name or feature (e.g. a Greek word meaning "eagle" -> Eagle, CO; a word meaning "lion" -> a Lion's-something landmark).
- ETYMOLOGY: the root/origin maps to a US place (e.g. named-after-a-person whose name is also a US town).

Rules:
- Be HONEST and skeptical. Most entities will produce NO clean wink — that is the expected and correct result. Do not force one.
- A wink must be a plain, immediate reading a normal person would accept — not a stretch, not a multi-step chain.
- You may propose a US place from your own knowledge; mark how confident you are it actually exists (it will be web-verified later). Do NOT invent places.
- Rate each wink strength 1-5 (5 = unmistakable, exact match; 1 = faint).
- You do NOT know and must NOT assume any target region, county, or answer. Judge every entity on equal footing.

WRITE results as JSON to ${OUT}/winks-${pg}.json with shape:
{ "page": "${pg}", "winks": [
  { "entity": "<full>", "place": "<US place>", "state": "<US state/abbr or unknown>",
    "winkType": "substring|homophone|meaning|etymology", "strength": 1-5,
    "existsConfidence": "high|med|low", "rationale": "<one sentence, plain reading>" }, ... ] }

Return ONLY: {"file":"${OUT}/winks-${pg}.json","winks": <number of winks written>}`,
    { label: 'wordplay:' + pg, phase: 'Wordplay', schema: winkSchema }
  )
))
const okWink = winked.filter(Boolean)
log(`Wordplay pass produced winks on ${okWink.length}/${PAGES.length} pages (` +
  okWink.reduce((s, r) => s + (r.winks || 0), 0) + ` candidate winks)`)

// ---------------------------------------------------------------------------
// PHASE 3 — AGGREGATE density map
// ---------------------------------------------------------------------------
phase('Aggregate')
const densitySchema = {
  type: 'object',
  required: ['file', 'topLocations'],
  properties: {
    file: { type: 'string' },
    topLocations: {
      type: 'array',
      items: {
        type: 'object',
        required: ['place', 'distinctEntities', 'score'],
        properties: {
          place: { type: 'string' },
          state: { type: 'string' },
          distinctEntities: { type: 'integer' },
          score: { type: 'number' },
        },
      },
    },
  },
}

const density = await agent(
  `You are aggregating a wordplay-wink dataset into a density ranking.

Read ALL the wink files: ${OUT}/winks-chapter-01.json through winks-chapter-23.json, plus winks-front-matter.json and winks-back-matter.json. (Skip any that are missing.)

Group every wink by the US LOCATION it points to. Normalize obvious variants to one place key (e.g. "Alexander County, NC" and "Alexander Co." -> one; a town and its county only merge if clearly the same locale — otherwise keep separate).

For each location compute:
- distinctEntities: how many DIFFERENT source entities (across all pages) wink at it — this is the key rarity metric (convergence from many independent nouns matters far more than many winks from one noun).
- pages: how many distinct book pages/chapters contributed.
- avgStrength: mean wink strength.
- score = distinctEntities * avgStrength * (1 + 0.3*(pages-1))  [reward cross-chapter convergence].
- list the supporting winks (entity + winkType + strength + rationale).

WRITE the FULL ranked map as JSON to ${OUT}/DENSITY-MAP.json:
{ "locations": [ { "place","state","distinctEntities","pages","avgStrength","score","supporting":[{entity,winkType,strength,rationale}] }, ... sorted by score desc ] }

Then return ONLY the top 12: {"file":"${OUT}/DENSITY-MAP.json","topLocations":[{place,state,distinctEntities,score}, ... up to 12]}

Do not editorialize. Do not favor any region. Pure tabulation.`,
  { label: 'aggregate-density', phase: 'Aggregate', schema: densitySchema }
)
if (!density) throw new Error('aggregation failed — cannot proceed to rival judging')
const contenders = (density.topLocations || []).slice(0, 10)
log(`Density map built. Top contenders: ` +
  contenders.map((c) => `${c.place} (${c.distinctEntities} entities, score ${Math.round(c.score)})`).join(' | '))

// ---------------------------------------------------------------------------
// PHASE 4 — RIVAL JUDGE (adversarial + web-verified)
// ---------------------------------------------------------------------------
phase('Judge')
const verdictSchema = {
  type: 'object',
  required: ['place', 'survivingEntities', 'isRival', 'verdict'],
  properties: {
    place: { type: 'string' },
    survivingEntities: { type: 'integer' },
    placeExists: { type: 'boolean' },
    isRival: { type: 'boolean' },
    verdict: { type: 'string' },
    file: { type: 'string' },
  },
}

const verdicts = await parallel(contenders.map((c, i) => () =>
  agent(
    `You are an ADVERSARIAL judge. Your default stance is skepticism: assume the apparent wordplay convergence on this location is coincidence/apophenia until the evidence forces you to concede.

LOCATION UNDER TEST: ${c.place}${c.state ? ', ' + c.state : ''}

Read its supporting winks from ${OUT}/DENSITY-MAP.json (find this location's "supporting" array).

Do TWO things:

1) VERIFY THE PLACE IS REAL. Use WebSearch to confirm ${c.place} is an actual US place (town/county/peak/landmark) and note its state/region. If it does not exist or is too generic to be a single place, that severely weakens it.

2) REFUTE EACH WINK. For every supporting wink, try to kill it:
   - Is the reading plain and immediate, or a stretch / multi-step chain?
   - Is the place name so common ("Springfield", "Eagle", "Lion") that the wink is generic and would match dozens of states equally? Generic = does NOT count.
   - Is it secretly a cipher/letter-trick (banned) rather than plain language?
   - Would a neutral person actually accept this, or only someone already wanting this answer?
   Keep only winks that SURVIVE refutation as legitimate, plain-language, location-specific.

Then decide: is this a SERIOUS rival as a treasure-location wordplay hub? A serious rival has multiple (>=3) DISTINCT surviving entities winking at it with decent strength AND is a real, specific US place.

WRITE your full analysis to ${OUT}/verdict-${i}.json (include each wink's keep/kill + reason).
Return ONLY: {"place":"${c.place}","file":"${OUT}/verdict-${i}.json","placeExists":<bool>,"survivingEntities":<int>,"isRival":<bool>,"verdict":"<=25 words"}`,
    { label: 'judge:' + c.place, phase: 'Judge', schema: verdictSchema }
  )
))
const okVerdicts = verdicts.filter(Boolean)
const rivals = okVerdicts.filter((v) => v.isRival)
log(`Judged ${okVerdicts.length} contenders; ${rivals.length} survived as serious rivals: ` +
  (rivals.map((r) => `${r.place} (${r.survivingEntities})`).join(', ') || 'none'))

// ---------------------------------------------------------------------------
// PHASE 5 — SYNTHESIZE (Alexander/Hiddenite located only here)
// ---------------------------------------------------------------------------
phase('Synthesize')
const verdictLines = okVerdicts
  .map((v) => `- ${v.place}: exists=${v.placeExists}, surviving=${v.survivingEntities}, rival=${v.isRival} — ${v.verdict}`)
  .join('\n')

const report = await agent(
  `Write the final report for an honest falsification test of a treasure-location hypothesis.

BACKGROUND (reveal only now, at synthesis — the data was gathered blind): a prior creative pass claimed the book's proper nouns disproportionately "wink" (via plain-language wordplay) at ALEXANDER COUNTY, NC and the community of HIDDENITE there (e.g. "Antiquities of Alexander" -> Alexander County; "Hiddenite" gem -> hidden; emerald chapters -> the Hiddenite emerald-mining area). The risk is confirmation bias. This workflow re-ran the SAME wordplay technique BLIND across EVERY proper noun in the book to see whether Alexander/Hiddenite is genuinely exceptional or just one of many comparable coincidences.

INPUTS:
- Blind density ranking: ${OUT}/DENSITY-MAP.json (read it).
- Per-contender adversarial verdicts: ${OUT}/verdict-*.json (read the ones that exist).
- Contender verdict summary:
${verdictLines}

YOUR JOB:
1. Present the blind top ranking (location, distinct entities, surviving entities after adversarial judging, real/specific?).
2. Locate ALEXANDER COUNTY and HIDDENITE in this blind ranking. Did they surface on their own? At what rank / with how many distinct surviving entities? If they did NOT surface, say so plainly.
3. Apply the DECISION RULE explicitly:
   - If one or more OTHER US locations show comparable-or-greater surviving distinct-entity density -> the Alexander read is likely apophenia (the technique finds "winks" everywhere); REPORT THIS HONESTLY even though it undercuts our favored answer.
   - If Alexander/Hiddenite stands clearly above all rivals on surviving distinct-entity density -> the read HARDENS on its own merits.
   - If Alexander/Hiddenite did not even surface blind -> the prior pass was likely steered; flag it.
4. List the surviving legitimate winks for the top 3 locations side by side so the reader can compare quality, not just count.
5. Give a clear one-paragraph verdict and a confidence level.

Be rigorous and unflattering to our own hypothesis. The value of this report is its honesty.

WRITE the report to ${DIR}/WORD-PRESSURE-TEST-REPORT.md (full markdown).
Return ONLY a 3-4 sentence summary of the verdict (rank of Alexander/Hiddenite, whether any rival matched it, and the resulting confidence).`,
  { label: 'synthesize-report', phase: 'Synthesize' }
)

log('Report written to WORD-PRESSURE-TEST-REPORT.md')
return { rivalsFound: rivals.length, contenders: contenders.length, summary: report }
