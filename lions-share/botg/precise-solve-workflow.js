export const meta = {
  name: 'precise-solve',
  description: "Push the three de-biased leads (Washington CA primary, Atchison KS, Dance Hall Rock UT) toward a ~200-yard point: verify + convergence-gate, map public-land parcels, apply poem-as-map + triangulation, adversarially refute",
  phases: [
    { title: 'Dossier', detail: 'verify each lead, gate on independent chapter convergence, map public-land sub-zones + constraints' },
    { title: 'Pinpoint', detail: 'drill sub-zones to ~200-yd points via poem-as-map + the "align at a proper point" triangulation (CA-weighted)' },
    { title: 'Verify', detail: '3-vote adversarial refutation per candidate point (default-refute if generic/lone-association)' },
    { title: 'Report', detail: 'write the precise-solve report + BOTG plan' },
  ],
}

const CONTEXT = `GOAL: convert three de-biased leads into a ~200-YARD point for a boots-on-the-ground search for the Lion's Share (largest box, "There's Treasure Inside" by Jon Collins-Black).
MANDATE: the author states a desk-solver can get within ~200 yards — so a precise point IS achievable; region-level output is failure. Hunt the specific point.
HARD CONSTRAINTS (a point MUST satisfy all): accessible PUBLIC land (never private; sole exception a public-easement trail crossing private land); within ~3 miles of a road; NOT buried (no digging); not dangerous (no water crossing, swift current, cliff/face climb, dangerous ledge — so NOT inside hazardous mine workings); not underwater; searchable snow-free; box >25 lb, two trips to place (carryable from parking).
STATE EXCLUSIONS (one box per state): Fenn box = WYOMING (recovered 2020); Pokemon box ≈ ARKANSAS; Appalachian-Trail box ≈ VERMONT (and avoid the AT itself). California, Kansas, and Utah are all OPEN.
HIDE-PATTERN HINTS (from the book, to apply on-site): the prize tends to sit near a distinctive OVERLOOK/VISTA where a wider view opens, often framed BETWEEN TWO ROCK features (Ch.4, p.53); the box is concealed BEHIND/UNDER a surface rock, not buried (Ch.6, p.69 — "peering behind a rock to find a treasure box").
SOLVE MECHANISM (from the verified poem): "Use will's straight edge, as the turning square or any arc may align at a proper point" (verified lowercase "will's" — NOT a name) reads as a TRIANGULATION / sight-line instruction: the final fix is where bearings from named landmarks cross. Use it.
LITERAL ONLY: no cipher, no syllable/letter games, no capitalization tricks.
CONVERGENCE GATE (anti-trap): a point fits the poem's GENERIC landscape imagery almost anywhere — that is the trap that produced the failed Rocky Face trip. A point is only FIELDABLE if it ALSO has independent chapter/item convergence. Flag any "distinctive map fit but lone-association" as desk-only.`

const LEADS = [
  {
    key: 'CA-washington', weight: 'primary',
    region: 'Washington, Nevada County, CALIFORNIA — Red Ledge Mine vicinity & the South Yuba River corridor (Tahoe NF, BLM South Yuba Recreation Area, South Yuba River State Park), off CA-20 / Washington Rd',
    verified: 'VERIFIED: Ch.4 "The Flame" gold specimen is captioned "Red RIDGE Mine" but the real source is the "Red LEDGE Mine" in Washington, Nevada Co CA — the author\'s OWN publisher irocks.com built a treasure-hunter page (irocks.com/the-red-ridge-mine-gold) and Mysterious Writings flags the misspelling as possibly INTENTIONAL. The town is named WASHINGTON (echoes the CONFIRMED George Washington jelly-glass item, Ch.17). CA = the author\'s 20+yr home state. NOTE: the gold specimen itself is privately held and the mine workings are hazardous — a box would be on ADJACENT accessible public land, NOT in the mine.',
    convergenceToTest: 'town named Washington ↔ George Washington jelly glass (confirmed item); author CA home; Sierra gold country also ties Ch.12 Gold Rush; any further independent book pointer to this specific area.',
  },
  {
    key: 'KS-atchison', weight: 'backup',
    region: 'International Forest of Friendship / Warnock Lake Park (city-owned public park, trail loop, Moon Tree, Mount Vernon tree, Stan Herd Earhart Earthwork overlook), Atchison, KANSAS',
    verified: 'One accessible public park independently echoes THREE Lion\'s Share items: Earhart\'s autograph (Ch.7; Atchison is her hometown), George Washington\'s jelly glass (Ch.17; a tree grown from Mount Vernon), Moon Rocks/meteors (Ch.19; an Apollo-14 "Moon Tree" sycamore). Constraint-compliant city park.',
    convergenceToTest: 'three independent item-histories co-locating on one park; whether the poem terrain also fits; any direct textual pointer to Atchison.',
  },
  {
    key: 'UT-dancehall', weight: 'backup',
    region: 'Dance Hall Rock, Grand Staircase-Escalante National Monument (BLM), off Hole-in-the-Rock Rd from UT-12, UTAH',
    verified: 'FIVE poem keyword families co-locate on one named feature: "Dancers are on the land" (pioneers danced on this rock), the music/conductor/coda/"sing harmonies" frame (a documented acoustic natural amphitheater), "shimmering circles of gold" (cottonwoods in potholes), "magic in the water" (water-retaining potholes), "sat upon a rock" (sit-able sandstone bowl), + dark-sky "flame of starlight". CAVEAT: poem-only — NO chapter geography points to Utah, so convergence is weak; also rough 4WD washboard access + a known tourist stop.',
    convergenceToTest: 'whether ANY chapter/item independently points to Utah/Escalante (if none, this is poem-only = desk-only risk); access reality.',
  },
]

const DOSSIER_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    key: { type: 'string' }, region: { type: 'string' },
    verifiedFacts: { type: 'string' },
    convergence: { type: 'object', additionalProperties: false, properties: {
      strength: { type: 'string', enum: ['strong', 'moderate', 'weak', 'none'] },
      clues: { type: 'array', items: { type: 'string' } },
      isLoneAssociation: { type: 'boolean' }, note: { type: 'string' },
    }, required: ['strength', 'isLoneAssociation'] },
    stateOpen: { type: 'boolean' },
    subZones: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      name: { type: 'string' }, publicLandType: { type: 'string' }, accessFromRoad: { type: 'string' },
      withinThreeMiles: { type: 'boolean' }, terrain: { type: 'string' }, constraintsOK: { type: 'boolean' }, hidePotential: { type: 'string' },
    }, required: ['name', 'withinThreeMiles', 'constraintsOK'] } },
    constraintFlags: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  }, required: ['key', 'convergence', 'subZones'],
}

const PINPOINT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    lead: { type: 'string' }, subZone: { type: 'string' },
    points: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      name: { type: 'string' }, approxCoords: { type: 'string' },
      poemMapFit: { type: 'array', items: { type: 'string' } },
      triangulation: { type: 'string', description: 'which named landmarks\' sightlines/bearings "align at a proper point" here' },
      hidePatternFit: { type: 'string', description: 'vista-framed-between-two-rocks / behind-a-rock fit' },
      constraints: { type: 'string' }, access: { type: 'string' }, distinctiveness: { type: 'string' },
      sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['url'] } },
      confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
    }, required: ['name', 'poemMapFit', 'constraints', 'confidence'] } },
    note: { type: 'string' },
  }, required: ['lead', 'subZone', 'points'],
}

const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { refuted: { type: 'boolean' }, reason: { type: 'string' }, weakestLink: { type: 'string' } }, required: ['refuted', 'reason'],
}

function dossierPrompt(lead) {
  return `${CONTEXT}

You are building the DOSSIER for ONE lead and gating it on convergence. Load web tools (ToolSearch "select:WebSearch,WebFetch").

LEAD (${lead.weight}): ${lead.region}
WHAT'S ALREADY ESTABLISHED: ${lead.verified}
CONVERGENCE TO TEST: ${lead.convergenceToTest}

Do three things:
1. VERIFY the load-bearing facts (web) and state what's confirmed vs uncertain.
2. CONVERGENCE GATE: determine whether INDEPENDENT chapter/item evidence (beyond the single originating clue) points to this geography. Rate strength; set isLoneAssociation=true if it rests on one thread only. Be honest — a lone association is the trap.
3. MAP the accessible PUBLIC-LAND sub-zones in/around this lead (names, public-land type, road access + whether within ~3 mi, terrain, hazards/closures, whether a >25-lb box could be placed/carried, hide potential). Exclude private parcels and hazardous mine workings. Flag any constraint problems (e.g., state already consumed, closures, private land, danger).`
}

function pinpointPrompt(lead, subZone) {
  return `${CONTEXT}

You are drilling ONE public-land sub-zone toward a ~200-YARD point. Load web tools (ToolSearch "select:WebSearch,WebFetch").

LEAD: ${lead.region}
SUB-ZONE: ${JSON.stringify(subZone)}

Within this sub-zone, find the specific point(s) that best satisfy the poem-as-map AND the hide pattern, on accessible public land within ~3 mi of a road (not buried, not dangerous, carryable). For each candidate point give:
- a feature-by-feature poem-map fit;
- the TRIANGULATION: which two-or-more named landmarks (a peak, a confluence, a trail/road X-junction, a vista) have bearings that "align at a proper point" here (the verified solve-mechanism);
- the hide-pattern fit (a vista where the view opens, framed between two rock features; a prominent rock to look behind/under);
- the constraint check, access, distinctiveness (why THIS spot beats generic rivals nearby), sources, confidence.
Honest "no single 200-yd point distinctively resolves in this sub-zone" is allowed and valuable.`
}

function refutePrompt(p, lead, n) {
  return `${CONTEXT}

You are SKEPTIC #${n}. Try to REFUTE this proposed ~200-yard point. Default to refuted=true unless it clearly survives. Load web tools if useful.

LEAD: ${lead}
POINT: ${JSON.stringify(p)}

Attack: (1) is the poem-map fit DISTINCTIVE or would countless nearby spots match equally (generic-imagery trap)? (2) is there REAL independent chapter/item convergence, or is it lone-association on a pretty place (the Pikes-Peak/Rocky-Face failure mode)? (3) does it violate ANY hard constraint (private land, >3 mi from road, buried/dangerous, hazardous mine, deep backcountry, snow-locked, on the AT, a state already consumed by Fenn=WY/Pokemon=AR/AT=VT)? (4) is the triangulation real (named landmarks whose bearings actually cross here) or hand-waved? (5) any disqualifier (closure, private inholding, tourist-saturated = not "where few have seen it")? Refute if it fails any.`
}

// ---- Run ----
phase('Dossier')
const dossiers = (await parallel(LEADS.map((l) => () => agent(dossierPrompt(l), { schema: DOSSIER_SCHEMA, phase: 'Dossier', label: 'dossier:' + l.key })))).filter(Boolean)
const byKey = new Map(dossiers.map((d) => [d.key, d]))
for (const d of dossiers) log('Dossier ' + d.key + ': convergence=' + (d.convergence && d.convergence.strength) + (d.convergence && d.convergence.isLoneAssociation ? ' (lone-association)' : '') + ', subZones=' + (d.subZones || []).length)

phase('Pinpoint')
// CA-weighted: drill more sub-zones for the primary lead.
const pinTasks = []
for (const l of LEADS) {
  const d = byKey.get(l.key)
  if (!d) continue
  const n = l.weight === 'primary' ? 3 : 2
  for (const sz of (d.subZones || []).filter((z) => z.constraintsOK !== false && z.withinThreeMiles !== false).slice(0, n)) {
    pinTasks.push({ lead: l, subZone: sz })
  }
}
const pinResults = (await parallel(pinTasks.map((t) => () => agent(pinpointPrompt(t.lead, t.subZone), { schema: PINPOINT_SCHEMA, phase: 'Pinpoint', label: 'pin:' + t.lead.key + ':' + (t.subZone.name || '').slice(0, 14) })))).filter(Boolean)

phase('Verify')
const points = pinResults.flatMap((r) => (r.points || []).map((p) => ({ ...p, region: r.lead, subZone: r.subZone })))
const verified = await parallel(points.map((p) => () =>
  parallel([1, 2, 3].map((n) => () => agent(refutePrompt(p, p.region, n), { schema: VERDICT_SCHEMA, phase: 'Verify', label: 'refute:' + (p.name || '').slice(0, 16) + ':' + n })))
    .then((votes) => { const v = votes.filter(Boolean); const refutes = v.filter((x) => x.refuted).length; return { point: p, votes: v, refutes, survives: refutes < 2 } })
))
const survivors = verified.filter((x) => x && x.survives)
const killed = verified.filter((x) => x && !x.survives)
log('Precise-solve points: ' + survivors.length + ' survived, ' + killed.length + ' refuted')

phase('Report')
await agent(
  `${CONTEXT}

Write the file PRECISE-SOLVE-REPORT.md (repo root, use the Write tool) — the attempt to convert the three de-biased leads into a ~200-yard point, CA-weighted.

Structure:
- TL;DR: the single best SURVIVING point (or honest "no surviving point"), its lead, ~coords, convergence, and confidence.
- Per lead (Washington CA first, then Atchison KS, Dance Hall Rock UT): the dossier verdict (verified facts + the convergence gate — real multi-thread convergence vs lone-association), the public-land sub-zones, and the candidate point(s) drilled, each with poem-map fit, the triangulation (which landmarks' bearings cross), hide-pattern fit, constraints, access, sources.
- Adversarial results: which points survived vs were refuted, and why (be honest; list the kills).
- The honest standing: did we reach a defensible ~200-yard point, or a strong locality without a resolvable point? Which lead is strongest and why.
- A concrete BOOTS-ON-THE-GROUND plan for the best surviving point/lead: parking, the ~3-mi-from-road check, the on-site triangulation to run ("align at a proper point"), the behind-a-rock + vista-between-two-rocks search, season, and a fast falsification test.
- Confidence + biggest risk + recommended next step.

DATA:
Dossiers: ${JSON.stringify(dossiers)}
Pinpoint results: ${JSON.stringify(pinResults)}
Surviving points: ${JSON.stringify(survivors.map((s) => ({ name: s.point.name, region: s.point.region, refutes: s.refutes, confidence: s.point.confidence })))}
Refuted points: ${JSON.stringify(killed.map((s) => ({ name: s.point.name, region: s.point.region, refutes: s.refutes, reasons: s.votes.map((v) => v.reason) })))}

Return the single word DONE.`,
  { phase: 'Report', label: 'write:precise-solve-report' }
)

return {
  dossiers: dossiers.map((d) => ({ key: d.key, convergence: d.convergence && d.convergence.strength, loneAssociation: d.convergence && d.convergence.isLoneAssociation, subZones: (d.subZones || []).length })),
  survivingPoints: survivors.map((s) => ({ name: s.point.name, region: s.point.region, refutes: s.refutes, confidence: s.point.confidence })),
  refutedCount: killed.length,
}
