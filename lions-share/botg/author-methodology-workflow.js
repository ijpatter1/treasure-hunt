export const meta = {
  name: 'author-methodology',
  description: "Collect ALL of JCB's woven solve-methodology guidance (chapter lessons + framing sections + in-text asides + poem), synthesize it into the author's intended method, then design the next PINPOINTED approach (a method, not a single lead)",
  phases: [
    { title: 'Collect', detail: 'extract methodology guidance from chapter lessons, framing sections, in-text asides, and the poem' },
    { title: 'Synthesize', detail: "two independent reads of JCB's intended solve method (procedure-view + guardrail-view)" },
    { title: 'Plan', detail: 'design the next pinpointed approach from the method — multi-candidate, anti-single-lead' },
    { title: 'Report', detail: 'write the methodology + plan' },
  ],
}

const pad = (n) => String(n).padStart(2, '0')
const SPREAD_NAMES = [
  'front-01-02', 'front-03-04', 'page-008-009', 'page-010-011', 'page-012-013', 'page-014-015', 'page-016-017',
  'page-018-019', 'page-020-021', 'page-022-023', 'page-024-025', 'page-026-027', 'page-028-029', 'page-030-031',
  'page-032-033', 'page-034-035', 'page-036-037', 'page-038-039', 'page-040-041', 'page-042-043', 'page-044-045',
  'page-199-200', 'page-201-202', 'page-203-204', 'page-205-206', 'page-207-208', 'page-209-210', 'page-211-back',
]
function parseSpread(n) { const d = (n.match(/\d+/g) || []).map(Number); return { s: d[0] || 0, e: d[d.length - 1] || d[0] || 0 } }
function metaFor(start, end) { return SPREAD_NAMES.filter((n) => { const x = parseSpread(n); return x.s <= end && x.e >= start }).map((n) => 'pages/metadata/' + n + '.json') }
const chMd = (a, b) => { const out = []; for (let i = a; i <= b; i++) out.push('chapters/chapter-' + pad(i) + '.md'); return out }

const LESSONS = `Ch1 A Plan That Changed the World | Ch2 Don't Wing It | Ch3 Joy Is in the Details | Ch4 Blaze the Path | Ch5 An Exercise in Faith | Ch6 Inspiration Is Welcome | Ch7 Explore More | Ch8 Know the Past, See the Future | Ch9 Confirmation Bias | Ch10 Welcome the Good and the Bad | Ch11 The Temptress Greed | Ch12 Make Good Choices | Ch13 Be Like Mike | Ch14 Fail Forward | Ch15 Don't Give Up | Ch16 Defy Expectations | Ch17 Share Your Story | Ch18 The Science of Giving | Ch19 The Next Frontier | Ch20 Choosing a New Perspective | Ch21 Make It Make Sense | Ch22 A Love Story | Ch23 Finding Treasures Along the Way`

const CONTEXT = `PROJECT: locate the Lion's Share treasure box ("There's Treasure Inside" by Jon Collins-Black, JCB). The author states a desk-solver can get within ~200 YARDS — so the clues DO reduce to a searchable area; it is solvable.

THIS WORKFLOW IS NOT a location hunt. Its premise: JCB WOVE the solving METHODOLOGY into the book itself — most visibly in the per-chapter LESSONS/subtitles (e.g. "Don't Wing It," "Joy Is in the Details," "Explore More," "Confirmation Bias," "Fail Forward," "Defy Expectations," "Choosing a New Perspective," "Make It Make Sense"), plus the "How To Read This Book" section, the Introduction, the Postscript, and scattered in-text asides. The task: COLLECT all of that guidance, read it as ONE coherent method, then design the next PINPOINTED approach FROM that method.

HONEST HISTORY (apply critically, do not repeat):
- The data is now CLEAN: pages/ transcriptions made faithful to the page images, chapters/ corrected, wiki reconciled, and the North-Carolina-fixation contamination identified and removed (prior analysis had CAPITALIZED lowercase "will's" into "William," LOCKED "pike"="peaked hill," and read "Dancers"=Hopi butterflies — fabrications used to force the already-searched-EMPTY Rocky Face Mountain).
- BUT do NOT throw NC out: its real geology/flora/fauna fit remains legitimate. NC is ONE live candidate among several (CA, etc.), neither the default nor excluded.
- The repeating FAILURE MODE to avoid: OVER-INDEXING a single lead, building it up, watching it collapse as "lone-association" (Rocky Face, Roan, Bakersville, Red Ledge/Washington-CA, the children's book). Every defensible-confidence single pin has been refuted for lacking independent convergence. The children's book is a thin CONFIRMATION layer (confirms themes like butterflies), NOT a location-density source.
- So the next approach must be SYSTEMATIC and MULTI-CANDIDATE — a method that reduces a full candidate set to a searchable area by the author's own rules — not "pick the prettiest lead and drill it."

Be literal (JCB confirmed no cipher). Be self-critical: note where reading the lessons "as method" is genuine vs. over-reading.`

// ---- Schemas ----
const COLLECT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    source: { type: 'string' },
    guidance: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      quote: { type: 'string', description: 'the verbatim guidance / lesson / instruction' },
      location: { type: 'string', description: 'chapter # / page / section' },
      methodologicalReading: { type: 'string', description: 'what this tells the SOLVER to DO (or avoid) when finding the treasure' },
      strength: { type: 'string', enum: ['explicit-instruction', 'strong-implied', 'possible', 'over-reading-risk'] },
    }, required: ['quote', 'location', 'methodologicalReading', 'strength'] } },
    summary: { type: 'string' },
  }, required: ['source', 'guidance'],
}

const SYNTH_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    view: { type: 'string' },
    intendedMethod: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      principle: { type: 'string' }, evidence: { type: 'string' },
      isStep: { type: 'boolean', description: 'is this part of an ordered procedure?' }, order: { type: 'number' },
    }, required: ['principle', 'evidence'] } },
    isThereAProcedure: { type: 'string', description: 'do the lessons form an ordered SOLVE PROCEDURE, or are they mindset/guardrails? honest answer + reasoning' },
    howAnswerIsStructured: { type: 'string', description: 'what the guidance implies about HOW the location answer is encoded/found' },
    trapsCalledOut: { type: 'array', items: { type: 'string' }, description: 'traps JCB explicitly warns against (e.g. Confirmation Bias) — and whether WE fell into them' },
    overReadingFlags: { type: 'array', items: { type: 'string' } },
  }, required: ['view', 'intendedMethod', 'isThereAProcedure'],
}

const PLAN_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    derivedMethod: { type: 'string', description: "the reconciled statement of JCB's intended solve method" },
    approach: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      step: { type: 'string' }, rationale: { type: 'string' }, faithfulTo: { type: 'string', description: 'which lesson/guidance this step executes' },
    }, required: ['step', 'rationale'] } },
    candidateHandling: { type: 'string', description: 'how this approach stays MULTI-CANDIDATE and avoids over-indexing one lead' },
    ncStance: { type: 'string', description: 'how NC is kept as a live candidate (geology/flora/fauna) without re-introducing the contamination' },
    discriminationCriteria: { type: 'array', items: { type: 'string' }, description: 'what would let one candidate WIN per the author\'s method (esp. convergence + Make-It-Make-Sense coherence)' },
    nextWorkflowSpec: { type: 'string', description: 'a concrete spec for the workflow that would EXECUTE this approach' },
    selfCritique: { type: 'string', description: 'how this plan applies JCB\'s own lessons (Confirmation Bias / Defy Expectations / Fail Forward) to OUR process' },
  }, required: ['derivedMethod', 'approach', 'candidateHandling', 'nextWorkflowSpec'],
}

// ---- Prompts ----
function lessonsPrompt(a, b) {
  return `${CONTEXT}

You are COLLECTING the per-chapter LESSONS as solving methodology, chapters ${a}-${b}. The 23 chapter lessons (subtitles) are:
${LESSONS}

Read these chapter files (corrected): ${chMd(a, b).join(', ')}.
For EACH chapter ${a}-${b}: take its lesson/subtitle and the chapter's narrative, and extract what it instructs the SOLVER to DO or AVOID when finding the treasure (e.g. "Confirmation Bias" = beware confirming a prior; "Joy Is in the Details" = the answer is in small details; "Explore More" = research the subjects further; "Defy Expectations" = the answer is unexpected; "Make It Make Sense" = the solution must be internally coherent). Rate each: explicit-instruction / strong-implied / possible / over-reading-risk. Be honest about which lessons are genuine method vs. just moral/biographical color.`
}

const framingPrompt = `${CONTEXT}

You are COLLECTING explicit solve-guidance from the BOOK'S FRAMING SECTIONS. Read the primary text (corrected): the Introduction & "How To Read This Book" (${metaFor(8, 17).join(', ')}), and the back matter / Postscript (${metaFor(199, 211).join(', ')}).
Extract EVERY explicit instruction about how to find the treasure / how to read the clues / what to do or not do (e.g. "read it once through thoughtfully," "jot down what makes your Spidey sense tingle," "research a captivating topic further — that was my intention," "almost every chapter offers at least one important detail," "no subterfuge / take it literally," the hard constraints, any "much easier task" reassurance). Quote verbatim with location; give the methodological reading and strength.`

const asidesPrompt = `${CONTEXT}

You are COLLECTING scattered IN-TEXT methodology asides across the chapters (the guidance JCB drops mid-narrative). Read the corrected chapter files chapters/chapter-01.md … chapter-23.md (skim for guidance, don't transcribe stories) and pull any aside that tells the solver HOW to approach the hunt or what to attend to — e.g. hide-pattern hints (a vista where the view opens / framed between two rock features; "peering behind a rock"; not buried), "the histories of the treasure items themselves" carry clues, reassurances about difficulty/safety, directional/observational cues ("now look"), and any "research this" invitations. Quote verbatim with chapter; give the methodological reading and strength. Flag over-reading risks.`

const poemMetaPrompt = `${CONTEXT}

You are COLLECTING the POEM'S self-referential solve-guidance plus the META-lessons read as solve strategy. Read the verified poem (pages/metadata/page-205-206.json + chapters/joys-serenade.md).
Extract the poem's OWN instructions about how to solve/navigate: "we may find music in a poem" (clues are here), "Our conductor… gives direction," "See how far to go," "Use will's straight edge… any arc may align at a proper point" (verified lowercase "will's" — a triangulation/sight-line instruction), "This is no imaginary wonderland. Now look" (it's a real place; observe), "if you don't go down you may never know how high," "ask them to assist you." Then read the META-lessons (Confirmation Bias, Defy Expectations, Choosing a New Perspective, Make It Make Sense, Fail Forward) as guidance about HOW the answer is structured and which traps to avoid. Quote verbatim, locate, give methodological reading + strength.`

function synthPrompt(view, viewDesc, collected) {
  return `${CONTEXT}

You are SYNTHESIZING JCB's intended solve method — the ${view} view: ${viewDesc}

Take ALL the collected guidance below and produce a coherent statement of the author's INTENDED method for reducing the Lion's Share to a searchable area. Decide honestly: do the chapter lessons form an ORDERED PROCEDURE (a step sequence), or are they mindset/guardrails? What does the guidance imply about HOW the location answer is encoded and found? Which traps does JCB explicitly warn against — and did our prior NC-fixated, single-lead-over-indexing process fall into them (esp. "Confirmation Bias")? Flag where reading lessons "as method" is over-reading.

COLLECTED GUIDANCE:
${JSON.stringify(collected)}`
}

function planPrompt(synths, collected) {
  return `${CONTEXT}

You are designing the NEXT PINPOINTED APPROACH from JCB's intended method (two independent syntheses below). This is the deliverable: a METHOD-FAITHFUL plan to reduce the Lion's Share to a searchable area — NOT a single lead.

Requirements:
- Reconcile the two syntheses into one derivedMethod statement.
- Lay out the approach as concrete STEPS, each tied to the author's own guidance (faithfulTo).
- candidateHandling: the approach MUST be multi-candidate and anti-single-lead — explain how it holds the full candidate set and reduces by convergence rather than committing to one pretty lead (our repeating failure).
- ncStance: keep NC a LIVE candidate on its genuine geology/flora/fauna fit, without re-importing the removed contamination (no capitalized "will's", no locked "pike", no Hopi-butterfly leap).
- discriminationCriteria: per the author's method (esp. "Make It Make Sense" coherence + multi-thread convergence + the poem's "align at a proper point" triangulation), what would let ONE candidate legitimately win.
- nextWorkflowSpec: a concrete spec for the workflow that would EXECUTE this approach (phases, what each does) so it can be built next.
- selfCritique: apply JCB's own lessons to OUR process — how this plan avoids Confirmation Bias, heeds Defy Expectations / Choosing a New Perspective, and Fails Forward from the spent Rocky Face trip.

TWO SYNTHESES:
${JSON.stringify(synths)}

(Full collected guidance available above in the syntheses.)`
}

// ---- Run ----
phase('Collect')
const collected = (await parallel([
  () => agent(lessonsPrompt(1, 12), { schema: COLLECT_SCHEMA, phase: 'Collect', label: 'lessons:ch1-12' }),
  () => agent(lessonsPrompt(13, 23), { schema: COLLECT_SCHEMA, phase: 'Collect', label: 'lessons:ch13-23' }),
  () => agent(framingPrompt, { schema: COLLECT_SCHEMA, phase: 'Collect', label: 'framing-sections' }),
  () => agent(asidesPrompt, { schema: COLLECT_SCHEMA, phase: 'Collect', label: 'in-text-asides' }),
  () => agent(poemMetaPrompt, { schema: COLLECT_SCHEMA, phase: 'Collect', label: 'poem+meta' }),
])).filter(Boolean)
log('Collected guidance from ' + collected.length + ' sources')

phase('Synthesize')
const synths = (await parallel([
  () => agent(synthPrompt('procedure', 'treat the lessons as a possible ORDERED SOLVE PROCEDURE — test whether chapters 1→23 (or a subset) lay out steps to execute in sequence', collected), { schema: SYNTH_SCHEMA, phase: 'Synthesize', label: 'synth:procedure' }),
  () => agent(synthPrompt('guardrail', 'treat the lessons as MINDSET / GUARDRAILS and decision-rules (how to think, what traps to avoid, how the answer is structured) rather than ordered steps', collected), { schema: SYNTH_SCHEMA, phase: 'Synthesize', label: 'synth:guardrail' }),
])).filter(Boolean)

phase('Plan')
// Single agent: DESIGN the plan AND write it to the markdown file via the Write tool.
// Prose written to a file has no tool-input byte cap — unlike the oversized StructuredOutput
// that truncated and looped. No schema here, deliberately.
await agent(
  `${CONTEXT}

You are designing the NEXT PINPOINTED APPROACH from JCB's intended method AND writing it up. Two independent syntheses + the collected guidance are below. Do NOT return a large structured object. Instead, use the Write tool to write the FULL deliverable to AUTHOR-METHODOLOGY-AND-PLAN.md (repo root), then return only a one-line confirmation.

The markdown file must contain:
- TL;DR: JCB's intended method in 2-3 sentences + the headline of the planned approach.
- The methodology, collected: the 23 chapter lessons read as method (a table: chapter -> lesson -> what it instructs the solver to do/avoid -> strength), the framing-section instructions (How-To-Read / Intro / Postscript), the key in-text asides, and the poem's self-guidance. Mark genuine method vs. over-reading.
- Synthesis: is it an ORDERED procedure or a set of guardrails? How does the guidance say the answer is structured and found? Which traps did JCB warn against — and where did OUR prior process violate them (name Confirmation Bias and the single-lead over-indexing explicitly)?
- THE PLAN — the next pinpointed approach: the reconciled derived method; concrete STEPS (each tagged "faithful to: <lesson/guidance>"); how it stays MULTI-CANDIDATE / anti-single-lead; how NC is kept a LIVE candidate (genuine geology/flora/fauna) without re-importing the removed contamination; the DISCRIMINATION criteria (convergence + "Make It Make Sense" coherence + the poem's "align at a proper point" triangulation); and a concrete SPEC for the workflow that would EXECUTE this approach (phases + what each does).
- Self-critique: how this plan applies JCB's own lessons (Confirmation Bias / Defy Expectations / Choosing a New Perspective / Fail Forward) to OUR process.

Be literal; be honest about over-reading. Write the file in full, then return one line: "wrote AUTHOR-METHODOLOGY-AND-PLAN.md — <derived method in a phrase>".

TWO SYNTHESES:
${JSON.stringify(synths)}

COLLECTED GUIDANCE:
${JSON.stringify(collected)}`,
  { phase: 'Plan', label: 'plan+write:methodology-plan' }
)

return { wrote: 'AUTHOR-METHODOLOGY-AND-PLAN.md' }
