export const meta = {
  name: 'creative-speculation',
  description: "Creative/intuitive/speculative pass (faith + 'make it make sense'). Build a JCB author profile, then GENERATE wide-aperture leaps (NC-weighted + wide-open) -> charitable coherence SCRUTINY (not refutation) -> CONVERGE independent leaps -> synthesize the best-story reading.",
  phases: [
    { title: 'Profile', detail: 'build a comprehensive Jon Collins-Black author profile (repo + web) for the speculation agents' },
    { title: 'Generate', detail: 'wide-aperture creative leaps: 5 NC-anchored lenses + 4 wide-open national lenses' },
    { title: 'Scrutinize', detail: 'charitable coherence check per lens (fails only if incoherent / cipher / constraint-breaking)' },
    { title: 'Converge', detail: 'cluster surviving leaps — independent leaps stacking on one area = the signal' },
    { title: 'Synthesize', detail: 'best-story reading + where it points, held as hypothesis to test' },
  ],
}

const STANCE = `Lion's Share treasure hunt ("There's Treasure Inside" by Jon Collins-Black, JCB). This is the CREATIVE / INTUITIVE / SPECULATIVE pass, deliberately different from the prior falsification-driven passes that dead-ended at "region, not pinpoint."

WHY: the author wrote "An Exercise in Faith" (Ch5) and "Make It Make Sense" (Ch21, his CONFIRMED solve-guidance, "look beyond just ancient myths and legends and consider more"). Solving this needs FAITH (acting on a reading before it can be proven) and ABDUCTION (inference to the best story) — NOT cold GIS filtering. Prior passes' adversarial kill-gate destroyed exactly the faculty needed: e.g. it disqualified "Antiquities of ALEXANDER" (Ch21) ↔ ALEXANDER County NC as a "name coincidence," when read creatively that is JCB waving a flag (myth = decoy, the WORD is the point). Likewise HIDDENITE — a hidden-treasure author who grew up digging gems, near a town literally named "Hidden"-ite, in a book called "There's Treasure Inside" — is a WINK we filed under census data.

THE RULES OF THIS PASS:
- WIDE APERTURE: associative, thematic, mythic, wordplay, sensory-intuition, "Spidey-sense," and author-PSYCHOLOGY reads are all ADMITTED. Nothing is rejected for being "unproven." Generate boldly.
- Test = COHERENCE, not provability. A leap is kept if it makes sense / coheres with other threads. It is cut ONLY if it is internally incoherent, self-contradictory, requires a CIPHER (letter/number/syllable counting — the banned marker-318 trap; wordplay & association are fine, arithmetic codes are NOT), or breaks a HARD CONSTRAINT.
- CONVERGENCE is the discipline against mush: one clever read is a maybe; multiple INDEPENDENT creative leaps landing on the same small area is a lead. Weight by convergence + story-coherence, not by surviving refutation.
- Everything is a HYPOTHESIS TO TEST, never asserted as truth.

HARD CONSTRAINTS (still real): accessible PUBLIC land; within ~3 mi of a road; not buried; not dangerous (no water-crossing/cliff/ledge); not underwater; box >25 lb, carryable, single-day-walkable; gets winter snow. One box per US state. The hide is in the US.

WHAT WE KNOW (carry, don't be caged by): the literal convergence engine ranked North Carolina #1 — 4 independent anchors (Hiddenite/Alexander Ch4; Statesville/Iredell Ch18; Bakersville/Mitchell Ch3; Chapel Hill/Orange Ch2,13) — bounding a western-NC Piedmont→Blue-Ridge escarpment corridor (lat ~35.8-36.0 N, lon ~81-82.2 W). Rocky Face Mtn is NOT eliminated (only a fraction of its ~320 acres was searched) but is not privileged. NC is the weighted favorite; but cast a WIDE net — a fresh region can emerge from creative reading.`

// ---------- Phase 1: Profile ----------
const profileRepoPrompt = `${STANCE}

You are building HALF of a comprehensive JON COLLINS-BLACK author profile FROM THE BOOK ITSELF, so later agents can speculate well about how he thinks and where he'd hide treasure. Read widely in the corrected repo: chapters/*.md (esp. the personal asides), pages/metadata for the Introduction/How-To-Read/Postscript, chapters/joys-serenade.md, and any research/*.md that profiles him.

Extract and WRITE to botg/creative/profile-repo.md: his life-geography (childhood Hiddenite/Alexander, Chapel Hill, Statesville, family near Bakersville, 20+ yrs in California/LA near Mt Wilson); his VALUES and personality as the text reveals them (faith/Baptist upbringing, family/Kimberly/kids, "joy," gratitude, generosity/"science of giving," playfulness, love of puzzles & craftsmanship/Seth Gould puzzle boxes); his AESTHETIC and habits of mind (detail-obsession "joy is in the details," wordplay, the way he hides things "in plain sight," his stated method "research it further / that was my exact intention"); his apparent SENSE OF HUMOR and what delights him; and his stated or implied feelings about nature, the outdoors, specific places. Quote where vivid. Return ONE line: "profile-repo: <N traits>".`

const profileWebPrompt = `${STANCE}

You are building the OTHER HALF of the JCB author profile FROM EXTERNAL SOURCES. Load web tools (ToolSearch "select:WebSearch,WebFetch"). Research Jon Collins-Black: interviews, podcasts (e.g. American Treasure, Mysterious Writings), his background (music career / "Black" stage name?, business, how he made money, why he made the hunt), his family, where he's actually lived, his stated philosophy about the hunt, any "tells" about how he thinks or hid the boxes, and anything he's said about the Lion's Share specifically.

WRITE to botg/creative/profile-web.md: a sourced profile — biography, personality/values, the hunt's backstory and his stated intentions, any hints he's dropped, and (flag clearly) any rumor vs. confirmed. Cite URLs. Return ONE line: "profile-web: <N findings>".`

// ---------- Phase 2: Generate ----------
const GEN_LENSES = [
  // NC-anchored (find the SPOT within the western-NC corridor) — WEIGHTED (5)
  { key: 'nc-placename-wordplay', track: 'NC', focus: 'Placename / word WINKS inside the western-NC corridor. Treat town/feature/road/water names as deliberate play: Hiddenite ("hidden"), Alexander, Brushy Mountains, Taylorsville, Stony Point, gem-belt names, any "Treasure/Gold/Lion/Joy/Faith/Hidden" named feature. Which corridor place NAMES echo the book/poem/items?' },
  { key: 'nc-myth-theme', track: 'NC', focus: 'Mythic/thematic association onto the corridor. "Antiquities of ALEXANDER" (Ch21, confirmed guidance) ↔ ALEXANDER County; the Nemean LION / Heracles ↔ "LION\'s Share"; emerald/gem symbolism ↔ Hiddenite/Emerald belt; "Make It Make Sense." Build the best STORY linking chapter themes to a specific corridor place.' },
  { key: 'nc-author-psych', track: 'NC', focus: 'AUTHOR PSYCHOLOGY in his home region. Read the profile. Where would a man of FAITH, FAMILY, JOY, and playful detail hide his GREATEST treasure near his roots — a place of personal/emotional resonance (childhood, family, a meaningful overlook)? Why there, in his head? Be speculative but in-character.' },
  { key: 'nc-terrain-intuition', track: 'NC', focus: 'Sensory / "Spidey-sense" intuition. Map the POEM\'s feel (water, shady oaks, a sit-rock, a view opening onto lower country, blue+pink bloom, dark sky, "the haiku curls a little further on") to specific corridor landforms by FEEL, not filter. Where does the poem "want" to be?' },
  { key: 'nc-item-metaphor', track: 'NC', focus: 'Treasure ITEMS as metaphor for place. What do the items (emerald, lion antiquities, Olympic medals, moon rocks, Picasso, Washington) THEMATICALLY say about a NC spot? E.g. does the emerald + lion + "hidden" cluster point somewhere specific by meaning?' },
  // Wide-open national (a fresh region can emerge) — (4)
  { key: 'natl-placename-wordplay', track: 'WIDE', focus: 'US placename WINKS ANYWHERE. Towns/parks/features nationwide that pun on book words, item names, the poem ("pike," "X," "gold," "dancers," "Joy," "Faith," "Treasure," "Lion," "Hidden"). Cast wide — a strong multi-word pun cluster on one place is a fresh lead.' },
  { key: 'natl-myth-theme', track: 'WIDE', focus: 'Mythic/thematic association pointing to a NON-NC region. Where do the chapter themes / item myths / the "Lion\'s Share" idea cohere onto a specific place elsewhere (CA gold country, a lion/Hercules-named place, an Olympic site, a meteor/star place)?' },
  { key: 'natl-author-psych', track: 'WIDE', focus: 'AUTHOR PSYCHOLOGY, nationally. Read the profile. Beyond NC, where would JCB hide the BIGGEST box given his whole life — his 20+ CA years, music career, places he loves, somewhere symbolically perfect for "the lion\'s share"? Argue from who he is.' },
  { key: 'natl-faith-leap', track: 'WIDE', focus: 'The pure FAITH LEAP. Step back: what is this book REALLY about, and if you had to bet on a region/place from intuition + the gestalt (not any single clue), where is it and WHY does that make sense? The deliberately speculative read.' },
]

function genPrompt(l) {
  return `${STANCE}

You are a GENERATOR (lens: ${l.key}, track: ${l.track}). FIRST read the author profile (botg/creative/profile-repo.md and botg/creative/profile-web.md) — your speculation must be grounded in who JCB actually is. You may load web tools (ToolSearch "select:WebSearch,WebFetch") to check a placename, myth, or fact.

YOUR LENS: ${l.focus}

Generate BOLD creative LEAPS — as many genuinely distinct ones as you can (aim 5-12). For EACH leap: the creative read (the wink/association/intuition/psychology), the specific place or area it points to (be as specific as the leap allows — a town, feature, park, or sub-spot), WHY it coheres (the story / how it "makes sense"), and which OTHER book threads it resonates with (so convergence can be found later). Do NOT self-censor for "unproven" — generate. Do NOT use ciphers (no letter/number/syllable counting). ${l.track === 'NC' ? 'Stay within / around the western-NC corridor.' : 'Range anywhere in the US; a fresh region is welcome.'}

WRITE your leaps to botg/creative/leaps-${l.key}.md as a list (one block per leap: **Leap** / **Points to** / **Why it coheres** / **Resonates with**). Return ONE line: "${l.key}: <N leaps>".`
}

// ---------- Phase 3: Scrutinize (charitable coherence) ----------
function scrutinyPrompt(l) {
  return `${STANCE}

You are the COHERENCE SCRUTINEER for lens ${l.key} — CHARITABLE, not adversarial. Read botg/creative/leaps-${l.key}.md.

For each leap, judge COHERENCE, not provability. Your job is to help good creative reads SURVIVE, not to kill them. KEEP a leap (even if unproven) unless it is: (a) internally INCOHERENT or self-contradictory; (b) built on a CIPHER (letter/number/syllable counting); or (c) breaks a HARD CONSTRAINT (private land / dangerous / buried / not in the US / wrong by a known fact). For kept leaps, rate story-strength {vivid / solid / thin} and note what would CONFIRM it (a thing to check, not a reason to reject). Be generous: "unproven but coheres" = KEEP.

WRITE botg/creative/scrutiny-${l.key}.md: per leap — KEEP/CUT, reason (one line), story-strength, what-would-confirm. Return ONE line: "${l.key}: <K kept>/<C cut>".`
}

// ---------- Phase 4: Converge ----------
const convergePrompt = `${STANCE}

You are the CONVERGENCE agent. Read ALL kept leaps: Glob "botg/creative/scrutiny-*.md" and the matching "botg/creative/leaps-*.md" for detail. Across ALL nine lenses, find where INDEPENDENT creative leaps STACK on the same area/place (different lenses — wordplay + myth + author-psych + terrain-intuition — landing together is the signal; this is the discipline against mush).

WRITE botg/creative/convergence.md: ranked CLUSTERS — each cluster = a place/area, the independent leaps (and their lenses) that converge on it, a convergence count (how many DISTINCT lenses), and the combined STORY ("make it make sense") for that place. Note NC-corridor clusters and any fresh non-NC clusters separately. Return ONE line: "convergence: <top cluster> (<N lenses>)".`

// ---------- Phase 5: Synthesize ----------
const synthPrompt = `${STANCE}

You are the SYNTHESIZER. Read botg/creative/convergence.md (+ dip into leaps/scrutiny files as needed) and WRITE the final report to CREATIVE-SPECULATION-REPORT.md (repo root, Write tool).

Structure:
- TL;DR: the single best-story SPECULATIVE reading of where the Lion's Share is, and the one-line "why it makes sense." Held as a HYPOTHESIS TO TEST, not a claim.
- The convergence picture: the top clusters where independent creative leaps stack (place, lenses converging, count), NC-corridor vs. fresh non-NC.
- The best STORY in full: weave the converging leaps (wordplay + myth + author-psychology + intuition) into one coherent narrative of where and WHY — this is the "Make It Make Sense" deliverable. Be bold but honest that it's abductive.
- Honest self-check: where this is genuinely compelling vs. where it's a stretch; which leaps are load-bearing; the risk of motivated coherence.
- A concrete NEXT TEST for the top reading: what specific spot/area to examine or what would confirm it (faith → action). Keep it within hard constraints.
- A short "fresh leads worth holding" list (non-top clusters worth not forgetting).

This pass VALUES creativity that coheres over provability — but flag the load-bearing leaps so we know what we're betting on. Return ONE line: "wrote CREATIVE-SPECULATION-REPORT.md — top=<place>".`

// ---------- Run ----------
phase('Profile')
await parallel([
  () => agent(profileRepoPrompt, { phase: 'Profile', label: 'profile:repo' }),
  () => agent(profileWebPrompt, { phase: 'Profile', label: 'profile:web' }),
])
log('Author profile built (repo + web)')

phase('Generate')
await parallel(GEN_LENSES.map((l) => () => agent(genPrompt(l), { phase: 'Generate', label: 'gen:' + l.key })))
log('Generated leaps across ' + GEN_LENSES.length + ' lenses (5 NC-weighted + 4 wide-open)')

phase('Scrutinize')
await parallel(GEN_LENSES.map((l) => () => agent(scrutinyPrompt(l), { phase: 'Scrutinize', label: 'scrut:' + l.key })))

phase('Converge')
await agent(convergePrompt, { phase: 'Converge', label: 'converge' })

phase('Synthesize')
await agent(synthPrompt, { phase: 'Synthesize', label: 'write:creative-report' })

return { lenses: GEN_LENSES.length, report: 'CREATIVE-SPECULATION-REPORT.md', artifacts: 'botg/creative/' }
