export const meta = {
  name: 'lions-share-mainbook-text-hypothesis',
  description: "Text-only deep pass on the MAIN book's extracted pages; mine literal clues + chapter-subject associations, generate diverse competing hypotheses, validate vs constraints, run an adversarial tournament, output ONE concrete next-BOTG target",
  phases: [
    { title: 'Read', detail: 'exhaustive clue + chapter-subject-association extraction from all 106 page texts' },
    { title: 'Associate', detail: 'chase clues-by-association across chapter items/people/places' },
    { title: 'Converge', detail: 'merge ledgers into geographic convergences + ranked author pointers' },
    { title: 'Hypothesize', detail: '7 diverse-lens hypothesis builders -> concrete targets' },
    { title: 'Validate', detail: 'web-check each target vs public/3mi-road/single-day/one-per-state/Fenn' },
    { title: 'Tournament', detail: 'judge panel scores + 3-vote adversarial refutation of the top 2' },
    { title: 'Plan', detail: 'concrete boots-on-the-ground plan for the winner' },
  ],
}

const ROOT = "/Users/ipatterson/dev/treasure-hunt/lions-share"
const META = ROOT + "/pages/metadata/"
const NOTES = ROOT + "/pages/notes/"

// 106 page stems passed in via args (sorted).
const STEMS = Array.isArray(args) && args.length ? args : []

const CONSTRAINTS = [
  "MISSION: Produce a CONCRETE, actionable hypothesis for the NEXT boots-on-the-ground (BOTG) search trip for the LION'S SHARE treasure box from the book 'There's Treasure Inside' by Jon Collins-Black (JCB).",
  "",
  "SCOPE FOR THIS PASS (the hunter was explicit): Use ONLY the MAIN book's extracted page text in /pages/. IGNORE the children's book 'Our Unbreakable Thread' entirely this round — a prior pass over-indexed on its imagery and produced nothing. The author said 'almost every chapter of the first twenty-three includes at least some morsel of information helpful for finding the location of the largest treasure box.' Mine that text.",
  "",
  "SPECIAL INSTRUCTION FROM THE HUNTER (high priority): Investigate the SUBJECTS of each chapter — the TREASURE ITEM and the PEOPLE and PLACES associated with it — because there may be CLUES BY ASSOCIATION. Chase second-order links: an item -> its maker/owner -> a place; a famous person -> a town/landmark/trail named for them; an item's history -> a US analog location; a quoted author -> their home/setting. Associative chains that independently land on the same US region are strong signals.",
  "",
  "VERIFIED HARD CONSTRAINTS (treat as rules; established by prior adversarial-verified research):",
  "- The Lion's Share is on accessible PUBLIC land, NOT buried (no digging), NOT private property, NOT in a man-made structure, within ~3 MILES of a road, not dangerous (no climbing / water-crossing), searchable in a SINGLE DAY ('a leisurely afternoon outing... a picnic with a loved one'). The box is >25 lb and took TWO trips to place -> a carryable distance from parking, not deep backcountry.",
  "- The author says NO 'grand cipher' is needed. BE LITERAL. Distrust letter-extraction, syllable-counting, and number-to-state tricks. Prefer plain geographic references, the author's own direct-to-reader asides, and item-history/association geography.",
  "- ONE box maximum per U.S. state. Known/likely occupied: the Forrest-Fenn-derived box is in the Rocky Mountains (NM/CO/WY/MT); a Pokemon-themed box is commonly placed in Arkansas; an Appalachian-Trail box is associated with Vermont. NORTH CAROLINA is currently OPEN. No box has been found anywhere yet.",
  "- All five boxes still UNFOUND as of 2026.",
  "",
  "AUTHOR'S CONFIRMED IN-TEXT POINTERS (highest-value literal guidance — he breaks the fourth wall):",
  "- Ch.4 (Chivor Emerald): grew up 'only some miles up the road' from the Hiddenite emerald mine (Alexander County NC); lost mine refound from a 'vista where the Plains of the Llanos could be seen below' with 'two jagged grey peaks'; 'no jungle clearing required... your task is a much, much easier one.' Epigraph: Frost, 'The Road Not Taken' ('two roads diverged in a wood... the one less traveled').",
  "- Ch.6 (Rubies): finding method literally 'peering behind a rock to find a treasure box.'",
  "- Ch.14 (Tiffany/Thoreau): 'I can't help but think of the resting places of the boxes I've hidden and the colors of nature that surround each' / 'Perhaps you'll pass by similar flowers along your way' (blue & pink, iris-like).",
  "- Ch.21 (Antiquities of Alexander, subtitle 'Make It Make Sense'): 'a chapter titled Make It Make Sense might also be a reference to figuring out the solution for the location of the treasure' / 'look beyond just ancient myths and legends and consider more.'",
  "- Ch.10 & 12: 'spending time outdoors with a loved one'; 'at least one of our treasure boxes rests not too far from you'; 'No survival kits needed.'",
  "",
  "AUTHOR BIOGRAPHY (from the book): raised rural western NC near Hiddenite/Statesville (Alexander County), 20 wooded acres, childhood gem-digging; UNC Chapel Hill; lived in the Los Angeles area 20+ years (SW of Mount Wilson); wife Kimberly; January birthday (garnet).",
  "",
  "PRIOR FAILED EFFORT: A multi-day BOTG search of Rocky Face Mountain (Alexander County NC), targeting 'marker 318' (derived by counting haiku syllables -> a disallowed cipher), FOUND NOTHING. Do NOT simply re-derive Rocky Face. NC as a region is not disproven, but the specific Rocky Face/marker-318 spot is spent. Be willing to land somewhere genuinely new if the text supports it.",
].join("\n")

const POEM = [
  "PRIMARY CLUE POEM 'Joy's Serenade' (literal landscape images): 'our conductor gives direction' / 'Use will's straight edge, as the turning square or any arc may align at a proper point' / 'an X leads the way' / 'simply follow shimmering circles of gold' / 'There may be magic in the water, but the pike are rather all around' / 'If you get warm, you may find shady oaks' / 'the haiku curls a little further on where few have seen it' / 'if you don't go down you may never know how high you ever want to be' / 'The sky smiles on you. Dancers are on the land' / 'it will ignite with the flame of starlight' / 'sat upon a rock, allowing nature's wide embrace.'",
  "BACK-COVER HAIKU: 'Be solid, have grit; sparkle even as you pine. Here lies a joy divined.'",
  "NOTE: one UNCERTAIN secondhand report claims the author said the poem/Part-2 holds no Lion's Share info. Treat poem-only inferences as lower-weight than prose asides and associations; do NOT discard the poem, but don't let it be the sole basis for a target.",
].join("\n")

function chunk(a, n){ const o=[]; for(let i=0;i<a.length;i+=n) o.push(a.slice(i,i+n)); return o }

// ---------------- Phase 1: Read ----------------
phase('Read')
const CLUE_SCHEMA = {
  type: "object",
  properties: {
    scope: { type: "string" },
    clues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          page: { type: "string" },
          chapter: { type: "string" },
          type: { type: "string", enum: ["geographic", "author-aside", "item-history", "association", "landscape-feature", "number", "quote-epigraph", "other"] },
          text: { type: "string", description: "verbatim or close quote of the clue-bearing line" },
          literalReading: { type: "string", description: "the plain, no-cipher meaning" },
          locationSignal: { type: "string", description: "what real US place/feature this could indicate, if any" },
          weight: { type: "string", enum: ["high", "medium", "low"] },
        },
        required: ["page", "type", "text", "weight"],
      },
    },
    chapterSubjects: {
      type: "array",
      description: "for each chapter touched in this batch, its subject and associative links",
      items: {
        type: "object",
        properties: {
          chapter: { type: "string" },
          treasureItem: { type: "string" },
          people: { type: "array", items: { type: "string" } },
          places: { type: "array", items: { type: "string" } },
          associativeLinks: { type: "array", items: { type: "string" }, description: "second-order chains, e.g. 'item maker X -> town Y, NC' or 'person Z -> trail/landmark named for them'" },
          usLocationAngle: { type: "string", description: "any US place this chapter's subject points to by association" },
        },
        required: ["chapter"],
      },
    },
    authorAsides: { type: "array", items: { type: "string" }, description: "fourth-wall direct-to-searcher guidance in these pages (verbatim)" },
    topSignals: { type: "array", items: { type: "string" }, description: "1-3 strongest location signals from this batch" },
  },
  required: ["clues"],
}

const batches = chunk(STEMS, 6)
log("Reading " + STEMS.length + " main-book page-texts in " + batches.length + " batches (text only, children's book excluded).")

const readThunks = batches.map((b, i) => () => {
  const metaPaths = b.map(s => META + s + ".json").join("\n")
  const notePaths = b.map(s => NOTES + s + ".md").join("\n")
  return agent(
    CONSTRAINTS + "\n\n" + POEM +
    "\n\n========\nREADER BATCH " + (i + 1) + " of " + batches.length + ". Read these metadata JSON files. The transcribed book text lives in `left_page.transcription.raw_text` and `right_page.transcription.raw_text`; ALSO mine `key_elements` (quote/author_childhood/treasure_item/guidance/postscript_content/key_facts), `images[].description` + `images[].potential_clues`, `poem`, and `verification_notes`:\n" + metaPaths +
    "\nAlso read the matching analysis notes for fuller per-page clue context:\n" + notePaths +
    "\n\nTWO JOBS:\n(A) Extract a FRESH, LITERAL clue ledger. Prioritize: explicit GEOGRAPHIC references (US place names, terrain features); AUTHOR DIRECT-ADDRESS ASIDES; ITEM-HISTORY clues; recurring LANDSCAPE features (rock, water, oak, pine, vista, high ground, flowers); meaningful NUMBERS; chapter EPIGRAPHS/quotes/named figures. Quote text closely; give each clue's plain no-cipher reading + any real-US location signal.\n(B) For EACH chapter in your batch, fill in chapterSubjects: the TREASURE ITEM, the key PEOPLE and PLACES, and — most important — ASSOCIATIVE LINKS (clues by association): chase the item's maker/owner/origin and the named people to any US town, landmark, trail, mountain, or region they connect to. Example pattern: item -> historical owner -> a place named for them, or an item's origin-country -> a US place with the same name/analog. Note any US location angle.\nBe exhaustive for your pages. Do NOT force a single hypothesis; harvest broadly.",
    { label: "read:b" + (i + 1), phase: "Read", schema: CLUE_SCHEMA, agentType: "general-purpose" }
  )
})
const ledgers = (await parallel(readThunks)).filter(Boolean)
const allClues = ledgers.flatMap(l => (l.clues || []))
const allSubjects = ledgers.flatMap(l => (l.chapterSubjects || []))
const allAsides = ledgers.flatMap(l => (l.authorAsides || []))
const allTop = ledgers.flatMap(l => (l.topSignals || []))
log("Extracted " + allClues.length + " clues, " + allSubjects.length + " chapter-subjects, " + allAsides.length + " author asides.")

// ---------------- Phase 2: Associate ----------------
phase('Associate')
const ASSOC_SCHEMA = {
  type: "object",
  properties: {
    associationChains: {
      type: "array",
      items: {
        type: "object",
        properties: {
          chain: { type: "string", description: "the full associative chain, e.g. 'Carnegie emerald -> Andrew Carnegie -> Carnegie, ... US place'" },
          endpointUS: { type: "string", description: "the US place/feature the chain lands on" },
          chaptersInvolved: { type: "array", items: { type: "string" } },
          strength: { type: "string", enum: ["strong", "moderate", "speculative"] },
          constraintCheck: { type: "string", description: "is the endpoint plausibly public land near a road, in an open state?" },
        },
        required: ["chain", "endpointUS", "strength"],
      },
    },
    convergentEndpoints: { type: "array", items: { type: "string" }, description: "US places/regions reached by MULTIPLE independent chains" },
    notes: { type: "string" },
  },
  required: ["associationChains"],
}
const assoc = await agent(
  CONSTRAINTS +
  "\n\n========\nCHAPTER SUBJECTS (items/people/places + associative links, from the full read):\n" + JSON.stringify(allSubjects).slice(0, 70000) +
  "\n\nASSOCIATION-TYPE & ITEM-HISTORY CLUES:\n" + JSON.stringify(allClues.filter(c => c.type === "association" || c.type === "item-history")).slice(0, 30000) +
  "\n\n========\nTASK: You are the ASSOCIATIONS analyst (the hunter specifically asked for clues-by-association). Build out ASSOCIATIVE CHAINS from each chapter's subjects (treasure item, people, places) to concrete US locations. Use web-style reasoning but you may also call web tools if needed (ToolSearch 'select:WebSearch' then use it) to confirm a person->place or item->place link. CRUCIAL: surface CONVERGENT ENDPOINTS — US places/regions that MULTIPLE independent chains reach (these are the strongest associative signals). For each chain note whether its endpoint plausibly satisfies the public-land / near-road / open-state constraints. Be willing to point anywhere in the US.",
  { label: "associate", phase: "Associate", schema: ASSOC_SCHEMA, agentType: "general-purpose" }
)
log("Associations: " + (assoc.associationChains || []).length + " chains, " + (assoc.convergentEndpoints || []).length + " convergent endpoints.")

// ---------------- Phase 3: Converge ----------------
phase('Converge')
const CONV_SCHEMA = {
  type: "object",
  properties: {
    geographicConvergences: {
      type: "array",
      items: {
        type: "object",
        properties: {
          placeOrFeature: { type: "string" },
          supportingPages: { type: "array", items: { type: "string" } },
          strength: { type: "string", enum: ["strong", "moderate", "weak"] },
          reasoning: { type: "string" },
        },
        required: ["placeOrFeature", "strength"],
      },
    },
    rankedAuthorPointers: { type: "array", items: { type: "string" }, description: "the most explicit in-text location guidance, ranked strongest first" },
    candidateSeeds: { type: "array", items: { type: "string" }, description: "regions/features worth turning into concrete hypotheses" },
    notes: { type: "string" },
  },
  required: ["geographicConvergences", "rankedAuthorPointers", "candidateSeeds"],
}
const highClues = allClues.filter(c => c.weight === "high")
const medClues = allClues.filter(c => c.weight === "medium")
const convergence = await agent(
  CONSTRAINTS +
  "\n\n========\nALL HIGH-WEIGHT CLUES (JSON):\n" + JSON.stringify(highClues).slice(0, 55000) +
  "\n\nMEDIUM-WEIGHT CLUES (JSON):\n" + JSON.stringify(medClues).slice(0, 20000) +
  "\n\nASSOCIATION CHAINS & CONVERGENT ENDPOINTS:\n" + JSON.stringify({ chains: assoc.associationChains, convergent: assoc.convergentEndpoints }).slice(0, 25000) +
  "\n\nAUTHOR ASIDES:\n" + JSON.stringify(allAsides).slice(0, 12000) +
  "\n\nTOP SIGNALS PER BATCH:\n" + JSON.stringify(allTop).slice(0, 8000) +
  "\n\n========\nTASK: You are the convergence analyst. (1) Find GEOGRAPHIC CONVERGENCES — features/places independently indicated by MULTIPLE pages/chapters AND by association chains (cross-source convergence is the strongest signal). (2) RANK the author's explicit in-text pointers by how literally/strongly they constrain a location. (3) Produce candidate SEEDS (regions or feature-types) to build concrete hypotheses from. Honor 'be literal, no cipher' and all hard constraints. Be willing to point away from Rocky Face if the text/associations do.",
  { label: "converge", phase: "Converge", schema: CONV_SCHEMA, agentType: "general-purpose" }
)
log("Convergence: " + (convergence.geographicConvergences || []).length + " convergences, " + (convergence.candidateSeeds || []).length + " seeds.")

// ---------------- Phase 4: Hypothesize (diverse lenses) ----------------
phase('Hypothesize')
const LENSES = [
  { key: "biography", seed: "AUTHOR-BIOGRAPHY LITERALISM. Weight the places JCB personally ties himself to in the text (NC childhood near Hiddenite/Statesville/Alexander Co., 20 wooded acres, UNC Chapel Hill, LA-area home SW of Mt Wilson, family churches). Where would he hide his MOST PERSONAL/largest box? Pick the single most plausible specific PUBLIC-LAND spot. You MAY land in NC but you must justify a specific spot that is NOT the already-searched Rocky Face/marker-318." },
  { key: "fourth-wall", seed: "EXPLICIT FOURTH-WALL POINTERS ONLY. Build a target using ONLY the author's direct-to-searcher asides (Ch.4 vista/two-jagged-grey-peaks/'no jungle clearing'; Ch.6 'peering behind a rock'; Ch.14 'colors of nature'/'similar flowers along your way' blue&pink iris; Ch.21 'Make It Make Sense'/'look beyond myths'; Ch.10/12 'not too far from you'/'leisurely outing'). Where do these LITERALLY converge? Name a specific public land + sub-feature." },
  { key: "item-association", seed: "ITEM & PEOPLE ASSOCIATION (the hunter's priority). Using the chapter subjects and association chains, find the US public-land target that the treasure items and their associated PEOPLE/PLACES point to by association. Favor a target reached by MULTIPLE independent chains. Examples of the reasoning style: an item's famous owner -> a US town/park/trail named for them; an item's origin -> a US namesake place; a quoted figure -> their home landscape. Propose the single best US public-land target this lens yields." },
  { key: "landscape-frequency", seed: "RECURRING LANDSCAPE FEATURES, IGNORE BIOGRAPHY. Frequency-rank the physical features across all chapters (rock/granite, water/lake/river, oak, pine, vista/high-ground, flowers, etc.) and the poem's literal images. Find the US PUBLIC LAND that maximally and literally matches the feature stack, choosing purely on terrain fit — explicitly do not weight where the author is from." },
  { key: "epigraphs-figures", seed: "EPIGRAPHS, QUOTES & NAMED FIGURES BY ASSOCIATION. Examine chapter epigraphs (e.g., Frost 'The Road Not Taken', Tolkien 'Not all those who wander are lost', Basho, etc.) and prominent named people. Chase them associatively: does 'The Road Not Taken' point to a specific trail/fork; does a quoted poet's home region matter; does a named historical figure connect to a US landmark/park/town? Propose the single best specific public-land target." },
  { key: "anti-nc", seed: "FRESH EYES, EXCLUDE NORTH CAROLINA ENTIRELY. Deliberately set aside all of NC (Rocky Face, Hiddenite, Alexander County, Smokies). Given ALL the text clues and association chains, what is the strongest NON-NC region and its single best specific public-land target? This is the diversity check against home-bias; the hunter will travel anywhere in the US." },
  { key: "convergence-max", seed: "MAXIMIZE CONVERGENCE. Ignore lens purity. Pick the SINGLE US public-land target that is supported by the GREATEST NUMBER of independent signals at once (geographic mentions + author asides + association chains + landscape features + poem images). Name it and enumerate every independent signal that lands on it." },
]
const HYP_SCHEMA = {
  type: "object",
  properties: {
    lens: { type: "string" },
    region: { type: "string" },
    specificTarget: { type: "string", description: "named public land: park/forest/trail/peak" },
    subSpot: { type: "string", description: "the within-site feature to search (and coordinates if derivable)" },
    textualBasis: { type: "array", items: { type: "string" }, description: "the specific clues/pages/asides/associations this rests on" },
    whyHere: { type: "string" },
    constraintFitGuess: { type: "string", description: "public? <=3mi road? single-day? state open? Fenn collision?" },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
  },
  required: ["lens", "region", "specificTarget", "textualBasis", "whyHere"],
}
const convStr = JSON.stringify({
  convergences: convergence.geographicConvergences,
  rankedAuthorPointers: convergence.rankedAuthorPointers,
  candidateSeeds: convergence.candidateSeeds,
  convergentEndpoints: assoc.convergentEndpoints,
  notes: convergence.notes,
}).slice(0, 45000)
const topCluesStr = JSON.stringify(highClues).slice(0, 25000)
const assocStr = JSON.stringify(assoc.associationChains).slice(0, 18000)

const hypotheses = (await parallel(LENSES.map(L => () =>
  agent(
    CONSTRAINTS + "\n\n" + POEM +
    "\n\n========\nCONVERGENCE MAP (from the full text read + associations):\n" + convStr +
    "\n\nASSOCIATION CHAINS:\n" + assocStr +
    "\n\nHIGH-WEIGHT CLUES:\n" + topCluesStr +
    "\n\n========\nYOUR LENS — " + L.key + ":\n" + L.seed +
    "\n\nProduce ONE concrete hypothesis through THIS lens: a specific named public-land target and a within-site sub-spot, grounded in specific text clues/associations. It MUST satisfy the hard constraints (public, <=3 mi from road, single-day, state open under one-box-per-state, no Fenn collision) — state how. Be concrete and falsifiable. You may call web tools (ToolSearch 'select:WebSearch,WebFetch') to confirm a place exists and is public.",
    { label: "hyp:" + L.key, phase: "Hypothesize", schema: HYP_SCHEMA, agentType: "general-purpose" }
  )
))).filter(Boolean)
log("Generated " + hypotheses.length + " hypotheses across diverse lenses.")

// ---------------- Phase 5: Validate (web) ----------------
phase('Validate')
const VAL_SCHEMA = {
  type: "object",
  properties: {
    target: { type: "string" },
    publicLand: { type: "string", enum: ["yes", "no", "unclear"] },
    within3miRoad: { type: "string", enum: ["yes", "no", "unclear"] },
    singleDay: { type: "string", enum: ["yes", "no", "unclear"] },
    stateOpen: { type: "string", enum: ["yes", "no", "unclear"] },
    fennCollision: { type: "string", enum: ["yes", "no", "unclear"] },
    sharpenedTarget: { type: "string", description: "the most specific spot + coordinates you can justify" },
    webFindings: { type: "array", items: { type: "string" } },
    sourceUrls: { type: "array", items: { type: "string" } },
    verdict: { type: "string", enum: ["viable", "weak", "dead"] },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
  },
  required: ["target", "verdict", "confidence"],
}
const validated = (await parallel(hypotheses.map(h => () =>
  agent(
    CONSTRAINTS +
    "\n\n========\nHYPOTHESIS TO VALIDATE (lens " + h.lens + "):\nRegion: " + h.region + "\nTarget: " + h.specificTarget + "\nSub-spot: " + (h.subSpot || "") + "\nWhy: " + (h.whyHere || "") +
    "\n\nFirst call ToolSearch with query 'select:WebSearch,WebFetch' to load web tools, then USE them. Verify this SPECIFIC target against the hard constraints: is it public land? within ~3 mi of a road? day-searchable? is the STATE still open under one-box-per-state (Fenn=Rockies, Pokemon~Arkansas, AT~Vermont)? any Fenn collision? Then SHARPEN to the most specific sub-spot/coordinates the evidence supports. Cite sources. Be honest: verdict 'dead' if a constraint fails.",
    { label: "val:" + (h.specificTarget || h.lens).slice(0, 26), phase: "Validate", schema: VAL_SCHEMA, agentType: "general-purpose" }
  )
))).filter(Boolean)
log("Validated: " + validated.filter(v => v.verdict === "viable").length + " viable, " + validated.filter(v => v.verdict === "weak").length + " weak, " + validated.filter(v => v.verdict === "dead").length + " dead.")

// ---------------- Phase 6: Tournament ----------------
phase('Tournament')
const candidates = hypotheses.map((h, i) => ({ h, v: validated[i] })).filter(c => c.v && c.v.verdict !== "dead")
const SCORE_SCHEMA = {
  type: "object",
  properties: {
    target: { type: "string" },
    textualSupport: { type: "number", description: "0-10" },
    literalNotCipher: { type: "number", description: "0-10" },
    constraintFit: { type: "number", description: "0-10" },
    distinctFromRockyFace: { type: "number", description: "0-10" },
    actionability: { type: "number", description: "0-10, how concretely searchable in one day" },
    total: { type: "number" },
    reasoning: { type: "string" },
  },
  required: ["target", "total", "reasoning"],
}
const scored = (await parallel(candidates.map(c => () =>
  parallel([0, 1, 2].map(j => () =>
    agent(
      CONSTRAINTS +
      "\n\n========\nSCORE THIS CANDIDATE (judge variant " + j + "). Be a strict, skeptical judge.\nLens: " + c.h.lens + "\nTarget: " + c.h.specificTarget + " / " + (c.h.subSpot || "") +
      "\nTextual basis: " + JSON.stringify(c.h.textualBasis).slice(0, 2500) +
      "\nValidation: " + JSON.stringify(c.v).slice(0, 4000) +
      "\n\nScore 0-10 on each: textualSupport (how well the MAIN-BOOK text + associations support it), literalNotCipher (relies on literal reading, not codes), constraintFit (public/<=3mi/single-day/state-open/no-Fenn), distinctFromRockyFace (a genuinely NEW spot, not the spent Rocky Face/marker-318), actionability (searchable in ONE day with a clear sub-spot). total = sum. Justify briefly.",
      { label: "judge:" + (c.h.specificTarget || c.h.lens).slice(0, 16), phase: "Tournament", schema: SCORE_SCHEMA, agentType: "general-purpose" }
    )
  )).then(votes => {
    const vs = votes.filter(Boolean)
    const avg = vs.length ? vs.reduce((a, x) => a + (x.total || 0), 0) / vs.length : 0
    return { h: c.h, v: c.v, avgTotal: avg, scores: vs }
  })
))).filter(Boolean)
scored.sort((a, b) => b.avgTotal - a.avgTotal)
log("Scored " + scored.length + " candidates. Top: " + (scored[0] ? (scored[0].h.specificTarget + " (" + scored[0].avgTotal.toFixed(1) + ")") : "none"))

const top2 = scored.slice(0, 2)
const REFUTE_SCHEMA = {
  type: "object",
  properties: {
    target: { type: "string" },
    verdict: { type: "string", enum: ["survives", "wounded", "refuted"] },
    strongestObjection: { type: "string" },
    reasoning: { type: "string" },
    sourceUrls: { type: "array", items: { type: "string" } },
  },
  required: ["target", "verdict", "reasoning"],
}
const refutations = (await parallel(top2.map(c => () =>
  parallel([0, 1, 2].map(j => () =>
    agent(
      CONSTRAINTS +
      "\n\n========\nADVERSARIALLY REFUTE this leading hypothesis (variant " + j + "). Load web tools (ToolSearch 'select:WebSearch,WebFetch') and USE them. Try hard to KILL it: check whether a constraint actually fails, whether the textual/association basis is overfit/coincidental, whether the state is truly open, whether it's just Rocky Face in disguise, or whether the spot is too vague to search in a day. Default to skepticism.\nTarget: " + c.h.specificTarget + " / " + (c.h.subSpot || "") + "\nBasis: " + JSON.stringify(c.h.textualBasis).slice(0, 2500) + "\nValidation: " + JSON.stringify(c.v).slice(0, 3000),
      { label: "refute:" + (c.h.specificTarget || "").slice(0, 16), phase: "Tournament", schema: REFUTE_SCHEMA, agentType: "general-purpose" }
    )
  )).then(votes => {
    const vs = votes.filter(Boolean)
    const ref = vs.filter(x => x.verdict === "refuted").length
    const wnd = vs.filter(x => x.verdict === "wounded").length
    return { target: c.h.specificTarget, h: c.h, v: c.v, avgTotal: c.avgTotal, verdict: ref >= 2 ? "REFUTED" : wnd >= 2 ? "WOUNDED" : "SURVIVES", votes: vs }
  })
))).filter(Boolean)
log("Refutation: " + refutations.map(r => r.target + "=" + r.verdict).join(" | "))

// ---------------- Phase 7: Plan ----------------
phase('Plan')
const report = await agent(
  CONSTRAINTS + "\n\n" + POEM +
  "\n\n========\nCONVERGENCE MAP:\n" + convStr +
  "\n\nASSOCIATION CHAINS:\n" + assocStr +
  "\n\nALL HYPOTHESES (with lenses):\n" + JSON.stringify(hypotheses).slice(0, 22000) +
  "\n\nVALIDATIONS:\n" + JSON.stringify(validated).slice(0, 22000) +
  "\n\nTOURNAMENT SCORES (sorted, avg of 3 judges):\n" + JSON.stringify(scored.map(s => ({ target: s.h.specificTarget, lens: s.h.lens, avgTotal: s.avgTotal }))).slice(0, 8000) +
  "\n\nADVERSARIAL REFUTATION OF TOP 2:\n" + JSON.stringify(refutations.map(r => ({ target: r.target, verdict: r.verdict, votes: r.votes }))).slice(0, 12000) +
  "\n\n========\nTASK: Write the FINAL markdown report giving the hunter ONE concrete next-BOTG hypothesis, plus a backup. The hunter is ASLEEP and will read this on waking — be self-contained and decisive. Structure:\n" +
  "1. **THE NEXT TRIP — single best target.** Region -> specific public land -> exact sub-spot (coordinates if derivable). Confidence stated honestly.\n" +
  "2. **The textual & associative case.** Which MAIN-BOOK clues/pages/author-asides/association-chains converge on it (quote them). Lead with cross-chapter convergences, the author's fourth-wall pointers, and clues-by-association (the hunter specifically requested the association angle). NO children's-book content.\n" +
  "3. **Constraint check.** public / <=3 mi road / single-day / state-open(one-per-state) / Fenn-compatible — with the web validation result.\n" +
  "4. **Adversarial result.** What the 3-vote refutation found; the strongest objection and your answer.\n" +
  "5. **The backup target** (one line on why it's #2).\n" +
  "6. **BOTG day plan.** Where to park, the walk, the literal search pattern ('peering behind a rock', flowers along the way, vista/high-ground), and a fast FALSIFICATION test so the hunter can abandon it quickly if wrong.\n" +
  "7. **Confirm-before-traveling** + the single biggest risk it's wrong.\n" +
  "Be decisive — the hunter wants a place to GO, derived from the main book's text + associations, not another 'no pinpoint' shrug. Do not invent facts or overstate confidence; if the best the text supports is a region + a small set of sub-spots to test in one day, say that and give the test. Write the full report as your final message.",
  { label: "final-plan", phase: "Plan", agentType: "general-purpose" }
)

return { report, convergence, associations: assoc, hypotheses, validated, scored: scored.map(s => ({ target: s.h.specificTarget, lens: s.h.lens, avgTotal: s.avgTotal })), refutations, clueCount: allClues.length, subjectCount: allSubjects.length }
