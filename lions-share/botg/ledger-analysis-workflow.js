export const meta = {
  name: 'ledger-analysis',
  description: "Multi-layer, validated analysis of the 937-signal ledger: triage/grade -> per-region deep dossiers -> adversarial validators -> synthesis. Biography counts as a valid channel; emergent regions allowed.",
  phases: [
    { title: 'Triage', detail: '7 batch agents grade/classify/flag every signal + surface emergent regions' },
    { title: 'Dossier', detail: 'one deep analyst per region builds a full case (for + against), biography counted' },
    { title: 'Validate', detail: 'one adversarial validator per region checks dossier claims against the ledger' },
    { title: 'Synthesize', detail: 'rank by VALIDATED convergence; verdict on region-derivability vs. research-needed' },
  ],
}

const RAW = (k) => 'botg/ledger/raw/' + k + '.md'
const BATCHES = [
  { id: 1, units: ['ch01', 'ch02', 'ch03', 'ch04'] },
  { id: 2, units: ['ch05', 'ch06', 'ch07', 'ch08'] },
  { id: 3, units: ['ch09', 'ch10', 'ch11', 'ch12'] },
  { id: 4, units: ['ch13', 'ch14', 'ch15', 'ch16'] },
  { id: 5, units: ['ch17', 'ch18', 'ch19', 'ch20'] },
  { id: 6, units: ['ch21', 'ch22', 'ch23', 'front-intro'] },
  { id: 7, units: ['how-to-read', 'postscript-acks', 'poem', 'back-items'] },
]

// Seed regions (from Phase A) — emergent ones get added after triage.
const SEED_REGIONS = [
  { slug: 'north-carolina', name: 'North Carolina (Blue Ridge gem belt; Hiddenite/Alexander, Bakersville/Mitchell, Chapel Hill, Statesville)' },
  { slug: 'california', name: 'California (author home/LA orbit, Mount Wilson; Gold Rush American River/Coloma/El Dorado; SF Bay)' },
  { slug: 'arizona-hopi', name: 'Arizona / Hopi mesas (Oraibi, Hotevilla, Canyon de Chelly, Grand Canyon)' },
  { slug: 'massachusetts', name: 'Massachusetts (Concord / Walden / Fairhaven Bay)' },
  { slug: 'dc-midatlantic', name: 'Washington DC / Mid-Atlantic (Smithsonian, Mt Vernon, Philadelphia, Delaware, Pittsburgh/Carnegie)' },
  { slug: 'new-york-city', name: 'New York City (Art Smith, Brooklyn, MoMA/Met)' },
  { slug: 'kansas-atchison', name: 'Kansas / Atchison (Earhart birthplace — seeded prior)' },
  { slug: 'utah-dancehall', name: 'Utah / Dance Hall Rock (seeded prior)' },
]

const METHOD = `Lion's Share treasure hunt ("There's Treasure Inside" by Jon Collins-Black, JCB). We are analyzing the full Phase-A SIGNAL LEDGER (937 literal signals captured from the whole book; raw per-unit tables in botg/ledger/raw/*.md). This is the ANALYSIS stage of JCB's own method: reduce the signals to candidate regions by CONVERGENCE of INDEPENDENT signals.

RULING — BIOGRAPHY IS A VALID CLUE CHANNEL (user-confirmed): JCB deliberately wove his life-geography into the book; it is legitimate pointing evidence (like Fenn). The Postscript "don't ask my family/friends" rule bars asking PEOPLE for insider info — it does NOT void the geographic meaning of the author's biography. So COUNT biographical signals.

INDEPENDENCE-GROUPING (the anti-lone-association guard, applies to ALL channels incl. biography): signals whose geographic implication flows from the SAME underlying source are ONE point no matter how often repeated. BUT distinct, separately-sourced anchors that happen to converge on a region are SEPARATE points. Example: "Hiddenite childhood mine," "parents' church in Statesville," and "Chapel Hill college years" are THREE distinct biographical anchors (different facts) — if they converge on one region that is genuine 3-point convergence, NOT one collapsed "biography" group. (Only repeated mentions of the SAME fact collapse.)

LITERAL ONLY — JCB confirmed no cipher/code. Reject any signal/claim needing letter-extraction, capitalization tricks (lowercase "will's" is NOT "William"), acrostics, syllable games, forced etymology. Hold ambiguous poem tokens (will, X, pike, Dancers, shimmering circles of gold) multi-sense, undecoded.

SIGNAL ROLES (classify, don't conflate): (a) REGION-POINTING (names/implies a specific US place — incl. biography & item-provenance); (b) DISCRIMINATOR (region-agnostic terrain/flora the hide HAS — water, oaks, sit-rock, elevation/vista, blue&pink wildflowers, dark sky — useful to compare regions, NOT to pick one); (c) HARD-FILTER (access/safety: <=3mi road, public land, not buried, no dangerous water, snowy winters, bear/snake habitat); (d) METHOD (hide-pattern/solving teachings); (e) FOREIGN-CONTEXT (item origin abroad; hide is in the US); (f) NOISE (no locational value).

The hide is in the US (Intro p.9). Travel range = anywhere in the US; rank on evidence only.`

// ---- Layer 1: Triage ----
const TRIAGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    batch: { type: 'number' },
    counts: { type: 'object', additionalProperties: false, properties: {
      total: { type: 'number' }, regionPointing: { type: 'number' }, discriminator: { type: 'number' },
      hardFilter: { type: 'number' }, method: { type: 'number' }, foreignContext: { type: 'number' }, noise: { type: 'number' }, flagged: { type: 'number' },
    }, required: ['total'] },
    emergentRegions: { type: 'array', items: { type: 'string' }, description: 'specific US regions/places implied by region-pointing signals in this batch (any granularity — town, county, range, state); include NEW ones beyond the seed list' },
    note: { type: 'string' },
  }, required: ['batch', 'emergentRegions'],
}

function triagePrompt(b) {
  return `${METHOD}

You are TRIAGE agent for batch ${b.id}. Read these raw ledger units (each a markdown signal table):
${b.units.map((u) => '  - ' + RAW(u)).join('\n')}

For EVERY signal row: (1) grade quality {strong/moderate/weak}; (2) assign a ROLE (region-pointing / discriminator / hard-filter / method / foreign-context / noise); (3) if region-pointing, name the specific US region/place it implies (any granularity); (4) FLAG it if it looks hallucinated (not supported by the cited source), smuggles a cipher move, or is mis-typed. This validates the extraction too.

WRITE your graded table (Write tool) to botg/ledger2/triage-${String(b.id).padStart(2, '0')}.md with columns:
| source | signal | role | quality | region implied | flag (cipher/hallucination/ok) |
One row per signal; keep cells valid (replace "|"->"/", newlines->space). Above the table put "## triage batch ${b.id}".

Then RETURN the small structured summary: batch number, counts by role, and emergentRegions = the distinct specific US regions/places this batch's region-pointing signals imply (include any NEW ones beyond NC/CA/AZ-Hopi/MA/DC/NYC/KS/UT).`
}

// ---- Layer 2: per-region dossier (writes file) ----
function dossierPrompt(region, regionList) {
  return `${METHOD}

You are the DEEP ANALYST for ONE region: ${region.name}.

Read the graded triage tables (Glob "botg/ledger2/triage-*.md", Read each) and, as needed, the raw ledger units in botg/ledger/raw/*.md for full signal context. Focus ONLY on your region.

Build a DEEP dossier and WRITE it (Write tool) to botg/ledger2/region-${region.slug}.md. It must contain:
1. **Pointing signals** for this region, organized BY INDEPENDENCE-GROUP (distinct sources). For each group: the signals (source + quote), the channel (biography / item-provenance / placename / other), and quality. Apply the grouping rule strictly — collapse same-fact repeats, keep distinct anchors separate. Biography COUNTS.
2. **Independent-group count** = number of DISTINCT sources pointing here (the convergence number). State it plainly.
3. **Discriminator fit** — how this region scores on the region-agnostic terrain/flora/access signals (Group P/Q): water, oaks, sit-rock, elevation/vista, blue&pink spring wildflowers, dark sky, <=3mi-road public land, snowy winters, bear/snake habitat. (You may use general knowledge; mark inferences.)
4. **The case FOR** (honest best argument) and **the case AGAINST** (why it might be illusory — lone-association? biography-only? generic terrain? already-searched/refuted?). Note if any prior boots-on-ground or pin attempt already refuted part of this region.
5. **Honest convergence verdict**: strong / moderate / thin / seeded-prior-only.
Be rigorous and self-critical; do not inflate. Return ONE line: "${region.slug}: <independent-group count>, <verdict>".

(Full region set for context, so you don't double-count cross-region signals: ${JSON.stringify(regionList.map((r) => r.name))})`
}

// ---- Layer 3: per-region validator (adversarial) ----
const VALIDATE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    region: { type: 'string' },
    claimedGroups: { type: 'number' }, validatedGroups: { type: 'number', description: 'independent groups that actually hold up' },
    issues: { type: 'array', items: { type: 'string' }, description: 'inflated grouping, missing/hallucinated signal, cipher smuggled, overstated terrain, double-counted cross-region' },
    verdict: { type: 'string', enum: ['holds', 'overstated', 'thin', 'collapses'] },
    note: { type: 'string' },
  }, required: ['region', 'validatedGroups', 'verdict'],
}

function validatePrompt(region) {
  return `${METHOD}

You are the ADVERSARIAL VALIDATOR for the region dossier: ${region.name}.
Read botg/ledger2/region-${region.slug}.md and cross-check EVERY claim against the triage tables (botg/ledger2/triage-*.md) and raw ledger (botg/ledger/raw/*.md).

Try to KNOCK IT DOWN: (1) does each cited signal actually EXIST in the ledger and say what the dossier claims? (2) is the independence-GROUPING honest, or did it inflate one source into several (the lone-association trap)? (3) any CIPHER move smuggled in? (4) is the discriminator/terrain fit overstated vs. reality? (5) any signal DOUBLE-COUNTED that really belongs to another region? (6) does biography counting follow the rule (distinct anchors only)?
Report claimedGroups vs validatedGroups (what actually holds), the issues, and a verdict {holds / overstated / thin / collapses}. Do not edit the dossier.`
}

// ---- Layer 4: synthesis (writes file) ----
function synthPrompt(validations) {
  return `${METHOD}

You are the SYNTHESIZER. Per-region deep dossiers (botg/ledger2/region-*.md) have each been adversarially validated; the validators' verdicts are below. Read the dossiers + these verdicts and WRITE the final report to REGION-CONVERGENCE-REPORT.md (repo root, Write tool).

The report must contain:
- **TL;DR**: the ranking of candidate regions by VALIDATED independent-group convergence (not claimed), and the single most important takeaway.
- **Ranked table**: region | validated independent-group count | channels (biography/item/placename/discriminator) | validator verdict | one-line case.
- **The biography-counted picture**: with biography now a valid channel, how do NC and CA actually compare on DISTINCT (non-same-fact) anchors? Be precise about what collapses vs. what stays separate.
- **The discriminator layer**: which region best fits the region-agnostic terrain/flora/access signals (Group P/Q), and the caveat that terrain-fit is a tiebreaker, not a pointer.
- **THE KEY VERDICT (answer explicitly)**: Is the Lion's Share region DERIVABLE from the in-text signals as they stand, or is the ledger genuinely REGION-SPARSE such that the region must be teased out via external RESEARCH (Phase B: item-provenance-to-ground, the children's book, topic-tangents)? Give the honest answer and the reasoning.
- **Recommended next step**: continue to Phase B research (and on which regions/threads), or a redesign/pivot if the convergence engine has hit its useful limit.

VALIDATOR VERDICTS:
${JSON.stringify(validations)}

Return ONE line: "wrote REGION-CONVERGENCE-REPORT.md — <top region> / <derivable or research-needed>".`
}

// ---- Run ----
phase('Triage')
const triage = (await parallel(BATCHES.map((b) => () => agent(triagePrompt(b), { schema: TRIAGE_SCHEMA, phase: 'Triage', label: 'triage:' + b.id })))).filter(Boolean)
const emergent = new Set()
triage.forEach((t) => (t.emergentRegions || []).forEach((r) => emergent.add(r.trim())))
log('Triaged ' + triage.length + ' batches; emergent region mentions: ' + [...emergent].length)

// Merge seed + emergent regions. Keep seeds canonical; add any emergent that isn't obviously one of them.
const seedKeys = SEED_REGIONS.map((r) => r.name.toLowerCase())
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
const extra = [...emergent].filter((r) => {
  const lr = r.toLowerCase()
  return !seedKeys.some((k) => k.includes(lr.split(/[ ,(]/)[0]) || lr.includes(k.split(/[ ,(]/)[0]))
}).slice(0, 8)
const REGIONS = [...SEED_REGIONS, ...extra.map((r) => ({ slug: slug(r), name: r + ' (emergent from triage)' }))]
log('Analyzing ' + REGIONS.length + ' regions (' + SEED_REGIONS.length + ' seed + ' + extra.length + ' emergent)')

phase('Dossier')
await parallel(REGIONS.map((r) => () => agent(dossierPrompt(r, REGIONS), { phase: 'Dossier', label: 'dossier:' + r.slug })))

phase('Validate')
const validations = (await parallel(REGIONS.map((r) => () => agent(validatePrompt(r), { schema: VALIDATE_SCHEMA, phase: 'Validate', label: 'validate:' + r.slug })))).filter(Boolean)

phase('Synthesize')
await agent(synthPrompt(validations), { phase: 'Synthesize', label: 'write:region-convergence-report' })

return {
  regionsAnalyzed: REGIONS.length,
  emergentAdded: extra,
  validations: validations.map((v) => ({ region: v.region, validatedGroups: v.validatedGroups, verdict: v.verdict })),
  report: 'REGION-CONVERGENCE-REPORT.md',
}
