export const meta = {
  name: 'chapter-validation',
  description: "Validate the accuracy of chapters/ composites against page-scan sources (text + vision), reporting confirmed inaccuracies & lost details",
  phases: [
    { title: 'Audit', detail: 'decompose each chapter into claims, verify vs metadata+notes, find omissions' },
    { title: 'Vision', detail: 'adjudicate flagged claims + spot-checks against the actual page images (ground truth)' },
    { title: 'Report', detail: 'write consolidated report + machine-readable issues file' },
  ],
}

// ----------------------------------------------------------------------------
// Data & helpers (page-spread mapping shared with the wiki build)
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

function parseSpread(name) {
  const ds = (name.match(/\d+/g) || []).map(Number)
  const start = ds.length ? ds[0] : 0
  const end = ds.length ? ds[ds.length - 1] : start
  return { start, end }
}
function spreadsFor(start, end) {
  return SPREAD_NAMES.filter((n) => {
    const s = parseSpread(n)
    return s.start <= end && s.end >= start
  })
}
function spreadForPage(p) {
  return SPREAD_NAMES.find((n) => {
    const s = parseSpread(n)
    return s.start <= p && s.end >= p
  })
}

const RAW = [
  { num: 0, slug: 'front-matter', target: 'chapters/front-matter.md', title: 'Front Matter', subtitle: "Poems / Invitation", start: 1, end: 17, extraSources: ['chapters/joys-serenade.md'] },
  { num: 1, target: 'chapters/chapter-01.md', title: 'The 120 Carat Sapphire', subtitle: 'A Plan That Changed the World', start: 18, end: 25 },
  { num: 2, target: 'chapters/chapter-02.md', title: 'The 100 Rings of Tuyet Nguyet', subtitle: "Don't Wing It", start: 26, end: 37 },
  { num: 3, target: 'chapters/chapter-03.md', title: 'A Puzzle Box, a Magnifying Glass, & the Mysterious Egg', subtitle: 'Joy Is in the Details', start: 38, end: 45 },
  { num: 4, target: 'chapters/chapter-04.md', title: 'The 96 Carat Chivor Emerald', subtitle: 'Blaze the Path', start: 46, end: 55 },
  { num: 5, target: 'chapters/chapter-05.md', title: 'Masterworks by Art Smith', subtitle: 'An Exercise in Faith', start: 56, end: 63 },
  { num: 6, target: 'chapters/chapter-06.md', title: 'Rubies to Wear', subtitle: 'Inspiration Is Welcome', start: 64, end: 69 },
  { num: 7, target: 'chapters/chapter-07.md', title: "Amelia's Autograph", subtitle: 'Explore More', start: 70, end: 75 },
  { num: 8, target: 'chapters/chapter-08.md', title: "Beauty's Bespoken Treasures", subtitle: 'Know the Past, See the Future', start: 76, end: 85 },
  { num: 9, target: 'chapters/chapter-09.md', title: 'The Golden Chalice', subtitle: 'Confirmation Bias', start: 86, end: 94 },
  { num: 10, target: 'chapters/chapter-10.md', title: "Jackie Onassis' Diamond Sapphire Brooch", subtitle: 'Welcome the Good and the Bad', start: 95, end: 100 },
  { num: 11, target: 'chapters/chapter-11.md', title: 'Treasures From a Famous Shipwreck', subtitle: 'The Temptress Greed', start: 101, end: 108 },
  { num: 12, target: 'chapters/chapter-12.md', title: 'Massive Gold Rush Nugget', subtitle: 'Make Good Choices', start: 109, end: 114 },
  { num: 13, target: 'chapters/chapter-13.md', title: 'Best of Its Class Jordan Rookie Card', subtitle: 'Be Like Mike', start: 115, end: 122 },
  { num: 14, target: 'chapters/chapter-14.md', title: "Tiffany's Furnace & Thoreau's Fire", subtitle: 'Fail Forward', start: 123, end: 132 },
  { num: 15, target: 'chapters/chapter-15.md', title: '1960 Rome Olympic Gold Medal', subtitle: "Don't Give Up", start: 133, end: 140 },
  { num: 16, target: 'chapters/chapter-16.md', title: '1996 Atlanta Olympic Gold Medal', subtitle: 'Defy Expectations', start: 141, end: 150 },
  { num: 17, target: 'chapters/chapter-17.md', title: "George Washington's Jelly Glass", subtitle: 'Share Your Story', start: 151, end: 158 },
  { num: 18, target: 'chapters/chapter-18.md', title: "Andrew Carnegie's Emerald", subtitle: 'The Science of Giving', start: 159, end: 164 },
  { num: 19, target: 'chapters/chapter-19.md', title: 'Moon Rocks & Meteors', subtitle: 'The Next Frontier', start: 165, end: 170 },
  { num: 20, target: 'chapters/chapter-20.md', title: 'The Six-Figure Birthstone', subtitle: 'Choosing a New Perspective', start: 171, end: 178 },
  { num: 21, target: 'chapters/chapter-21.md', title: 'Antiquities of Alexander', subtitle: 'Make It Make Sense', start: 179, end: 188 },
  { num: 22, target: 'chapters/chapter-22.md', title: "Picasso's Pendant", subtitle: 'A Love Story', start: 189, end: 194 },
  { num: 23, target: 'chapters/chapter-23.md', title: 'Sing Your Own Special Song', subtitle: 'Finding Treasures Along the Way', start: 195, end: 198 },
  { num: 24, slug: 'back-matter', target: 'chapters/back-matter.md', title: 'Back Matter', subtitle: 'Postscript / Rules', start: 199, end: 211, extraSources: ['chapters/treasure-items-additional.md'] },
]

const CHAPTERS = RAW.map((c) => {
  const spreads = spreadsFor(c.start, c.end)
  return {
    ...c,
    slug: c.slug || 'chapter-' + pad(c.num),
    spreads,
    metadata: spreads.map((s) => 'pages/metadata/' + s + '.json'),
    notes: spreads.map((s) => 'pages/notes/' + s + '.md'),
    images: spreads.map((s) => 'screenshots/' + s + '.png'),
  }
})

const BOOK_CONTEXT = `PROJECT: "There's Treasure Inside" by Jon Collins-Black (a real treasure hunt). We maintain composite summary files in chapters/ that were assembled from multiple source files. Because they are composites, details may have been LOST, paraphrased, mis-transcribed, or stated inaccurately. We are auditing each composite against the authoritative book sources.

SOURCE HIERARCHY (most authoritative last):
  1. chapters/chapter-XX.md  = the COMPOSITE being graded (NOT authoritative).
  2. pages/notes/*.md + pages/metadata/*.json = transcriptions/analysis of the book pages. Useful but THEMSELVES derived — a transcription can be wrong.
  3. screenshots/page-XXX-XXX.png = the ACTUAL book page images = GROUND TRUTH.

In metadata JSON, the book text is in left_page.transcription.raw_text and right_page.transcription.raw_text; also key_elements, images[].description, poem, verification_notes.

VERIFIED BOOK STRUCTURE (ground truth — treat any composite claim that contradicts this as a CONFIRMED inaccuracy, no vision needed):
- "Part Two" = the section of four chapters EACH DEDICATED to one of the four SMALLER boxes (book p.10-11 and p.16-17: "the four chapters in Part Two contain primarily all you need to discover the location of the other four treasure boxes"). Part Two is NOT about the Lion's Share. (Repo notes locate the Part Two block at chapters 15-23.)
- The Lion's Share (largest box) has NO dedicated chapter; its clues "may be found anywhere inside this book," and "almost every chapter in Part One offers at least one important detail" (p.10-11).
- "Joy's Serenade" / the Final Poem is in the BACK MATTER / Postscript region (pp.205-206), AFTER the chapters end (p.198), OUTSIDE Part Two. It is a PRIMARY clue vehicle for the Lion's Share.
- THEREFORE any claim that "the poem is Part 2", "Joy's Serenade IS Part 2", or that the poem holds no clues "because it is Part 2" is FALSE — flag it CONFIRMED-INACCURACY (correction: the poem is back-matter, separate from Part Two, and is a primary Lion's Share clue vehicle). Likewise flag any composite that dismisses the poem's importance on that basis.`

// ----------------------------------------------------------------------------
// Schemas
// ----------------------------------------------------------------------------
const AUDIT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    num: { type: 'number' },
    title: { type: 'string' },
    claims: {
      type: 'array',
      description: 'Every checkable factual claim in the composite, plus interpretations marked as such.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          text: { type: 'string', description: 'The claim as stated in the composite (verbatim for quotes).' },
          category: { type: 'string', enum: ['quote', 'name', 'number-or-date', 'place', 'page-citation', 'event-or-sequence', 'item-attribute', 'interpretation', 'other'] },
          verdict: { type: 'string', enum: ['SUPPORTED', 'CONTRADICTED', 'UNSUPPORTED', 'AMBIGUOUS', 'INTERPRETATION'] },
          evidence: { type: 'string', description: 'Source text supporting/contradicting it (quote the source), or why unsupported.' },
          correction: { type: 'string', description: 'If CONTRADICTED, the corrected value per source. Else empty.' },
          sourcePages: { type: 'array', items: { type: 'number' }, description: 'Book page number(s) most relevant to this claim.' },
          needsVision: { type: 'boolean', description: 'True if the page image should be the final judge (transcription unclear/conflicting, or claim is important).' },
          severity: { type: 'string', enum: ['high', 'med', 'low'] },
        },
        required: ['text', 'category', 'verdict', 'needsVision', 'severity'],
      },
    },
    omissions: {
      type: 'array',
      description: 'Salient facts present in the SOURCE pages but MISSING from the composite (lost details).',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          fact: { type: 'string' },
          sourcePages: { type: 'array', items: { type: 'number' } },
          severity: { type: 'string', enum: ['high', 'med', 'low'] },
          needsVision: { type: 'boolean' },
        },
        required: ['fact', 'severity', 'needsVision'],
      },
    },
    spotCheck: {
      type: 'array',
      description: '2-4 of the composite\'s most load-bearing factual claims (key quotes, distances, the treasure-confirmation, named places) that should be image-verified EVEN IF they matched the transcription, to catch shared transcription errors.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          claim: { type: 'string' },
          sourcePages: { type: 'array', items: { type: 'number' } },
        },
        required: ['claim'],
      },
    },
    accuracyNote: { type: 'string' },
  },
  required: ['num', 'title', 'claims', 'omissions'],
}

const VISION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    num: { type: 'number' },
    title: { type: 'string' },
    adjudications: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          issue: { type: 'string', description: 'The flagged claim/omission being adjudicated.' },
          originalVerdict: { type: 'string' },
          finalVerdict: { type: 'string', enum: ['CONFIRMED-INACCURACY', 'CONFIRMED-OMISSION', 'DISMISSED-CHAPTER-CORRECT', 'DISMISSED-TRANSCRIPTION-ERROR', 'STILL-UNCERTAIN'] },
          correctText: { type: 'string', description: 'What the page image actually says (ground truth).' },
          screenshot: { type: 'string', description: 'The screenshot filename used.' },
          page: { type: 'number' },
          note: { type: 'string' },
        },
        required: ['issue', 'finalVerdict'],
      },
    },
    spotCheckResults: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          claim: { type: 'string' },
          result: { type: 'string', enum: ['matches-image', 'differs-from-image', 'not-found'] },
          correctText: { type: 'string' },
          screenshot: { type: 'string' },
          page: { type: 'number' },
        },
        required: ['claim', 'result'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['num', 'title', 'adjudications'],
}

// ----------------------------------------------------------------------------
// Prompts
// ----------------------------------------------------------------------------
function auditPrompt(ch) {
  const sources = [...(ch.extraSources || []), ...ch.notes, ...ch.metadata]
  return `${BOOK_CONTEXT}

You are the AUDIT agent. Grade the accuracy of ONE composite file against its book-page sources. Do NOT use vision yet — work from the text sources; flag anything important or uncertain for the later image check.

COMPOSITE TO GRADE: ${ch.target}  (covers book pages ${ch.start}-${ch.end}: "${ch.title}")

READ (Read tool):
  - The composite: ${ch.target}
  - The sources for these pages:
${sources.map((s) => '      - ' + s).join('\n')}

METHOD:
1. Decompose the composite into discrete claims. For EACH claim set:
   - category: quote / name / number-or-date / place / page-citation / event-or-sequence / item-attribute / interpretation / other.
   - For QUOTES (text in quotation marks): check them VERBATIM against the source raw_text. A paraphrase presented as a direct quote, a changed word, or a wrong attribution = CONTRADICTED (give the exact source wording in 'correction'). Composites often subtly misquote — scrutinize quotes hard.
   - For page-citations (e.g. "per sidebar on page 51"): verify the page number and that the cited element exists.
   - verdict: SUPPORTED (source confirms) / CONTRADICTED (source says otherwise — give correction) / UNSUPPORTED (claim not found in any source) / AMBIGUOUS (can't tell from text) / INTERPRETATION (a hypothesis/relevance-rating/editorial judgment — NOT a checkable fact; do NOT grade these true/false, but DO flag UNSUPPORTED if an interpretation is presented as something the BOOK states when it doesn't).
   - evidence: quote the relevant source text.
   - sourcePages: the book page number(s) most relevant.
   - needsVision: TRUE for any CONTRADICTED/UNSUPPORTED/AMBIGUOUS claim, and for any high-importance claim where the transcription might be unreliable — the page image will be the final judge.
   - severity: high (core fact: a name/place/quote/number a reader would rely on), med, low.
2. OMISSIONS: scan the SOURCE pages for salient facts (names, places, distances/numbers, notable quotes, the treasure-confirmation, geographic references) that are MISSING from the composite. List them with sourcePages + severity. This is the "lost details" check.
3. spotCheck: pick the 2-4 most load-bearing factual claims in the composite (key quotes, distances, named places, the treasure confirmation) — these get image-verified regardless of verdict, to catch errors shared by composite AND transcription.
4. accuracyNote: one honest sentence on the composite's overall fidelity.

Be precise and skeptical, but do NOT invent issues — if a claim checks out, mark it SUPPORTED.`
}

function visionPrompt(ch, toCheck, spotCheck, imgPaths) {
  return `${BOOK_CONTEXT}

You are the VISION ADJUDICATOR. The page IMAGES are GROUND TRUTH. Resolve the flagged issues below by looking at the actual book pages. Be skeptical and conservative: only CONFIRM an inaccuracy if the image clearly contradicts the composite. If the composite actually matches the image and only a transcription was off, mark DISMISSED-TRANSCRIPTION-ERROR.

COMPOSITE: ${ch.target} (pages ${ch.start}-${ch.end}, "${ch.title}")

READ these page images (Read tool renders them visually). Read the ones relevant to each issue's page:
${imgPaths.map((p) => '  - ' + p).join('\n')}

FLAGGED ISSUES TO ADJUDICATE (claim/omission, original verdict, alleged correction, page):
${JSON.stringify(toCheck)}

For each, return: finalVerdict = CONFIRMED-INACCURACY (composite is wrong — give the true text), CONFIRMED-OMISSION (a real, salient detail is missing), DISMISSED-CHAPTER-CORRECT (composite matches the image), DISMISSED-TRANSCRIPTION-ERROR (composite is right; the text transcription was the wrong one), or STILL-UNCERTAIN (image illegible/page not available). Always give correctText = what the image actually says, plus the screenshot filename and page number.

SPOT-CHECKS (verify these against the image even though they may have matched the transcription):
${JSON.stringify(spotCheck)}
For each spot-check: result = matches-image / differs-from-image / not-found, with the correct text + screenshot + page.

Provide a short summary of the chapter's image-verified accuracy.`
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
log('Validating ' + CHAPTERS.length + ' composite files against page sources (text audit -> vision adjudication) ...')

const audited = await pipeline(
  CHAPTERS,
  // Stage 1: text audit
  (ch) => agent(auditPrompt(ch), { schema: AUDIT_SCHEMA, phase: 'Audit', label: 'audit:' + ch.slug }),
  // Stage 2: vision adjudication of flagged items + spot-checks
  async (audit, ch) => {
    if (!audit) throw new Error('audit failed for ' + ch.slug)
    const flaggedClaims = (audit.claims || []).filter(
      (c) => c.needsVision || ['CONTRADICTED', 'UNSUPPORTED', 'AMBIGUOUS'].includes(c.verdict)
    )
    const flaggedOmissions = (audit.omissions || []).filter((o) => o.needsVision || o.severity === 'high')
    const spot = audit.spotCheck || []

    const toCheck = [
      ...flaggedClaims.map((c) => ({ issue: c.text, originalVerdict: c.verdict, allegedCorrection: c.correction || '', page: (c.sourcePages || [])[0] || null, kind: 'claim' })),
      ...flaggedOmissions.map((o) => ({ issue: o.fact, originalVerdict: 'OMISSION', allegedCorrection: '', page: (o.sourcePages || [])[0] || null, kind: 'omission' })),
    ]

    if (toCheck.length === 0 && spot.length === 0) {
      return { num: ch.num, title: ch.title, target: ch.target, audit, vision: null }
    }

    // Choose only the images that cover the cited pages (fallback: all chapter images).
    const wantedPages = [
      ...toCheck.map((t) => t.page),
      ...spot.flatMap((s) => s.sourcePages || []),
    ].filter((p) => typeof p === 'number')
    let imgs = [...new Set(wantedPages.map(spreadForPage).filter(Boolean))].map((s) => 'screenshots/' + s + '.png')
    if (imgs.length === 0) imgs = ch.images

    const vision = await agent(visionPrompt(ch, toCheck, spot, imgs), {
      schema: VISION_SCHEMA,
      phase: 'Vision',
      label: 'vision:' + ch.slug,
    })
    return { num: ch.num, title: ch.title, target: ch.target, audit, vision }
  }
)

const results = audited.filter(Boolean)
log('Audited ' + results.length + '/' + CHAPTERS.length + ' composites. Aggregating confirmed issues ...')

// ---- Aggregate confirmed issues (plain JS) ----
function chapterDigest(r) {
  const claims = (r.audit && r.audit.claims) || []
  const counts = { total: claims.length, supported: 0, contradicted: 0, unsupported: 0, ambiguous: 0, interpretation: 0 }
  for (const c of claims) {
    if (c.verdict === 'SUPPORTED') counts.supported++
    else if (c.verdict === 'CONTRADICTED') counts.contradicted++
    else if (c.verdict === 'UNSUPPORTED') counts.unsupported++
    else if (c.verdict === 'AMBIGUOUS') counts.ambiguous++
    else if (c.verdict === 'INTERPRETATION') counts.interpretation++
  }
  const adj = (r.vision && r.vision.adjudications) || []
  const spot = (r.vision && r.vision.spotCheckResults) || []
  const confirmedInaccuracies = adj
    .filter((a) => a.finalVerdict === 'CONFIRMED-INACCURACY')
    .map((a) => ({ issue: a.issue, correctText: a.correctText || '', page: a.page || null, screenshot: a.screenshot || '', note: a.note || '' }))
  const confirmedOmissions = adj
    .filter((a) => a.finalVerdict === 'CONFIRMED-OMISSION')
    .map((a) => ({ issue: a.issue, correctText: a.correctText || '', page: a.page || null, screenshot: a.screenshot || '' }))
  const spotFailures = spot
    .filter((s) => s.result === 'differs-from-image')
    .map((s) => ({ claim: s.claim, correctText: s.correctText || '', page: s.page || null, screenshot: s.screenshot || '' }))
  // Text-only contradictions that vision didn't get to (no image read) still matter as candidates.
  const textContradictions = claims
    .filter((c) => c.verdict === 'CONTRADICTED' && !c.needsVision)
    .map((c) => ({ issue: c.text, correction: c.correction || '', evidence: c.evidence || '', pages: c.sourcePages || [] }))
  const dismissed = adj.filter((a) => a.finalVerdict && a.finalVerdict.startsWith('DISMISSED')).length
  return {
    num: r.num,
    title: r.title,
    target: r.target,
    accuracyNote: (r.audit && r.audit.accuracyNote) || '',
    visionSummary: (r.vision && r.vision.summary) || '(no vision pass — nothing flagged)',
    counts,
    confirmedInaccuracies,
    confirmedOmissions,
    spotFailures,
    textContradictions,
    dismissed,
  }
}

const digests = results.map(chapterDigest)
const totalConfirmed = digests.reduce((n, d) => n + d.confirmedInaccuracies.length + d.spotFailures.length, 0)
const totalOmissions = digests.reduce((n, d) => n + d.confirmedOmissions.length, 0)
const ranked = [...digests].sort(
  (a, b) =>
    b.confirmedInaccuracies.length + b.spotFailures.length + b.confirmedOmissions.length -
    (a.confirmedInaccuracies.length + a.spotFailures.length + a.confirmedOmissions.length)
)

const issuesPayload = {
  generated: 'chapter-validation workflow',
  totals: { composites: digests.length, confirmedInaccuracies: totalConfirmed, confirmedOmissions: totalOmissions },
  chapters: digests,
}

// ---- Report phase ----
phase('Report')
await parallel([
  () =>
    agent(
      `Write the file chapters-validation-issues.json (use the Write tool) containing EXACTLY this JSON (pretty-printed, valid JSON), nothing else. It is the machine-readable record of the chapter-accuracy audit for a possible later correction pass.\n\n${JSON.stringify(issuesPayload)}\n\nReturn the single word DONE.`,
      { phase: 'Report', label: 'write:issues.json' }
    ),
  () =>
    agent(
      `${BOOK_CONTEXT}

You are writing the human-readable validation report. Use the Write tool to write the file CHAPTERS-VALIDATION-REPORT.md (in the repo root).

Write a clear, honest Markdown report titled "# Chapters/ Accuracy Validation Report". Include:
- A note that this audited the composite chapters/ files against page sources, with the actual page IMAGES as ground truth for flagged items.
- An Executive Summary: totals (composites checked, confirmed inaccuracies, confirmed omissions), and a ranked table of chapters worst-to-best by issue count.
- A per-chapter section (only for chapters that HAVE confirmed issues or omissions; list clean chapters together in one short "Clean" list). For each: the composite filename, confirmed inaccuracies (claim -> correct text -> page + screenshot), spot-check failures, and confirmed omissions (lost details). Quote the corrected ground-truth text.
- A "Not separately validated" note: chapters/joys-serenade.md content falls within front-matter pages; chapters/treasure-items-additional.md spans the whole book and was not graded per-page.
- A short "Recommended fixes" list (highest-severity first) and a closing caveat that interpretations/hypotheses in the composites were NOT graded as true/false — only factual fidelity to the book.

Base it ENTIRELY on this data (do not invent issues):
${JSON.stringify({ totals: issuesPayload.totals, chapters: digests })}

Return the single word DONE.`,
      { phase: 'Report', label: 'write:report.md' }
    ),
])

log('Validation complete: ' + totalConfirmed + ' confirmed inaccuracies, ' + totalOmissions + ' confirmed omissions across ' + digests.length + ' composites.')
return { totals: issuesPayload.totals, worst: ranked.slice(0, 6).map((d) => ({ chapter: d.num, title: d.title, issues: d.confirmedInaccuracies.length + d.spotFailures.length, omissions: d.confirmedOmissions.length })) }
