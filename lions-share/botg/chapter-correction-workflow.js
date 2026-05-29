export const meta = {
  name: 'chapter-correction',
  description: "Apply the validated correction pass to chapters/ composites: fix confirmed factual errors, de-quote paraphrases, restore omissions — then verify each edit",
  phases: [
    { title: 'Correct', detail: 'one agent per composite: apply confirmed factual fixes + de-quote + restore omissions' },
    { title: 'Verify', detail: 'independently re-check each composite\'s edits against ground truth' },
    { title: 'Report', detail: 'write the correction changelog' },
  ],
}

// ----------------------------------------------------------------------------
// Composites to process (same 25 as the validation pass)
// ----------------------------------------------------------------------------
const pad = (n) => String(n).padStart(2, '0')

const RAW = [
  { num: 0, slug: 'front-matter', target: 'chapters/front-matter.md', title: 'Front Matter', start: 1, end: 17 },
  { num: 1, target: 'chapters/chapter-01.md', title: 'The 120 Carat Sapphire', start: 18, end: 25 },
  { num: 2, target: 'chapters/chapter-02.md', title: 'The 100 Rings of Tuyet Nguyet', start: 26, end: 37 },
  { num: 3, target: 'chapters/chapter-03.md', title: 'A Puzzle Box, a Magnifying Glass, & the Mysterious Egg', start: 38, end: 45 },
  { num: 4, target: 'chapters/chapter-04.md', title: 'The 96 Carat Chivor Emerald', start: 46, end: 55 },
  { num: 5, target: 'chapters/chapter-05.md', title: 'Masterworks by Art Smith', start: 56, end: 63 },
  { num: 6, target: 'chapters/chapter-06.md', title: 'Rubies to Wear', start: 64, end: 69 },
  { num: 7, target: 'chapters/chapter-07.md', title: "Amelia's Autograph", start: 70, end: 75 },
  { num: 8, target: 'chapters/chapter-08.md', title: "Beauty's Bespoken Treasures", start: 76, end: 85 },
  { num: 9, target: 'chapters/chapter-09.md', title: 'The Golden Chalice', start: 86, end: 94 },
  { num: 10, target: 'chapters/chapter-10.md', title: "Jackie Onassis' Diamond Sapphire Brooch", start: 95, end: 100 },
  { num: 11, target: 'chapters/chapter-11.md', title: 'Treasures From a Famous Shipwreck', start: 101, end: 108 },
  { num: 12, target: 'chapters/chapter-12.md', title: 'Massive Gold Rush Nugget', start: 109, end: 114 },
  { num: 13, target: 'chapters/chapter-13.md', title: 'Best of Its Class Jordan Rookie Card', start: 115, end: 122 },
  { num: 14, target: 'chapters/chapter-14.md', title: "Tiffany's Furnace & Thoreau's Fire", start: 123, end: 132 },
  { num: 15, target: 'chapters/chapter-15.md', title: '1960 Rome Olympic Gold Medal', start: 133, end: 140 },
  { num: 16, target: 'chapters/chapter-16.md', title: '1996 Atlanta Olympic Gold Medal', start: 141, end: 150 },
  { num: 17, target: 'chapters/chapter-17.md', title: "George Washington's Jelly Glass", start: 151, end: 158 },
  { num: 18, target: 'chapters/chapter-18.md', title: "Andrew Carnegie's Emerald", start: 159, end: 164 },
  { num: 19, target: 'chapters/chapter-19.md', title: 'Moon Rocks & Meteors', start: 165, end: 170 },
  { num: 20, target: 'chapters/chapter-20.md', title: 'The Six-Figure Birthstone', start: 171, end: 178 },
  { num: 21, target: 'chapters/chapter-21.md', title: 'Antiquities of Alexander', start: 179, end: 188 },
  { num: 22, target: 'chapters/chapter-22.md', title: "Picasso's Pendant", start: 189, end: 194 },
  { num: 23, target: 'chapters/chapter-23.md', title: 'Sing Your Own Special Song', start: 195, end: 198 },
  { num: 24, slug: 'back-matter', target: 'chapters/back-matter.md', title: 'Back Matter', start: 199, end: 211 },
]
const CHAPTERS = RAW.map((c) => ({ ...c, slug: c.slug || 'chapter-' + pad(c.num) }))

const REPORT = 'CHAPTERS-VALIDATION-REPORT.md'
const ISSUES_JSON = 'chapters-validation-issues.json'

const RULES = `SCOPE — apply ONLY these, and cite the source page for each edit:
1. FIX confirmed inaccuracies AND spot-check failures: wrong place names (e.g. Huntersville -> Statesville), wrong numbers/values/dates (carats, troy ounces, dollar values, mintages, years), fabricated details (e.g. an added death year, "1799", "Rio de Janeiro/Brazil", "Christmas night", a "pastor" descriptor stated as fact, a "two-star cockroach-filled" conflation), and wrong source-page mappings/labels. Replace with the report's "Correct:" ground-truth text.
2. DE-QUOTE / RESTORE paraphrases-as-quotes: where the composite wraps compressed, reported-speech, or altered text in quotation marks, PREFER restoring the EXACT verbatim wording from the report's ground truth (so it stays a real quote); if that doesn't fit, drop the quotation marks and present it plainly as a paraphrase.
3. RESTORE confirmed omissions: add the lost detail (verbatim where the report quotes it) into the appropriate existing section, concise and in the composite's existing style.

HARD RULES:
- DO NOT touch interpretations, hypotheses, relevance ratings ("VERY HIGH" etc.), cross-chapter "pattern" claims, or location theories. Only factual fidelity to the book.
- SKIP anything the report flags as a BOOK printing oddity / book-vs-transcription nuance where the composite's external fact is actually correct (e.g. Ch19 "ARTHUR C. CLARK" spelling, Ch1 "5 1/2\\" floppy", the Pavese "Italian poet (1908-1950)" descriptor). Do NOT change accurate external facts to match a misprint. At most add a brief parenthetical like "(book prints 'CLARK')" — and only if it's clean to do so. When in doubt, leave it and log it as skipped.
- Respect the verified book structure in research/book-structure-verified.md (Part Two = the four smaller-box chapters; "Joy's Serenade" is the back-matter/Postscript Final Poem, OUTSIDE Part Two, and is a PRIMARY Lion's Share clue vehicle). For the Front Matter and Back Matter composites especially, align any structural correction to this.
- Keep the composite CLEAN and accurate. Do NOT insert "CORRECTED"/"FIXED" banners or editorial notes into the file — the changelog you return is the audit trail.
- Make PRECISE edits with the Edit tool. If you cannot locate the exact wrong string in the file, set editApplied=false with reason "not-found" — NEVER fabricate or guess a location.
- If the composite has nothing actionable, make NO edits and return noChangesNeeded=true.`

// ----------------------------------------------------------------------------
// Schemas
// ----------------------------------------------------------------------------
const CORRECT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    num: { type: 'number' },
    title: { type: 'string' },
    target: { type: 'string' },
    noChangesNeeded: { type: 'boolean' },
    changes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          category: { type: 'string', enum: ['inaccuracy-fixed', 'quote-dequoted', 'quote-restored', 'omission-restored', 'book-nuance-noted', 'skipped'] },
          issue: { type: 'string', description: 'What was wrong (short).' },
          before: { type: 'string', description: 'Old text snippet (short).' },
          after: { type: 'string', description: 'New text snippet (short), or "(removed)".' },
          page: { type: 'string' },
          editApplied: { type: 'boolean' },
          reason: { type: 'string', description: 'If not applied/skipped, why.' },
        },
        required: ['category', 'issue', 'editApplied'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['num', 'target', 'changes'],
}

const VERIFY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    num: { type: 'number' },
    target: { type: 'string' },
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          issue: { type: 'string' },
          verdict: { type: 'string', enum: ['correct', 'wrong-fix', 'incomplete', 'over-correction', 'should-have-fixed', 'fine-as-is'] },
          note: { type: 'string' },
        },
        required: ['issue', 'verdict'],
      },
    },
    fileIntegrityOK: { type: 'boolean', description: 'Markdown/tables not broken by edits.' },
    interpretationsUntouched: { type: 'boolean' },
    overallVerdict: { type: 'string', enum: ['all-good', 'needs-attention'] },
    summary: { type: 'string' },
  },
  required: ['num', 'target', 'overallVerdict', 'fileIntegrityOK'],
}

// ----------------------------------------------------------------------------
// Prompts
// ----------------------------------------------------------------------------
function correctPrompt(ch) {
  return `You are the CORRECTION agent for ONE composite file in a treasure-hunt research repo. A prior validation pass (with the book page images as ground truth) found factual issues; your job is to apply the high-confidence fixes precisely.

COMPOSITE TO CORRECT: ${ch.target}  ("${ch.title}", book pages ${ch.start}-${ch.end}; chapter num ${ch.num})

WORKLIST (read both):
  1. ${REPORT} — find the "### Chapter ${ch.num} —" section. This is the authoritative detail: each "Claim/Correct/Page" item, spot-check failures, and confirmed omissions. (Some chapters' real errors are under "Spot-check failure"/"Spot-check note" — treat those as actionable too. A couple of chapters are in the "Clean Chapters" list but still carry a spot-check value error — process those if present.)
  2. ${ISSUES_JSON} — find the object in "chapters" with num ${ch.num}: structured confirmedInaccuracies / confirmedOmissions / spotFailures / textContradictions.

${RULES}

STEPS:
- Read ${ch.target}, then your section of ${REPORT} and your entry in ${ISSUES_JSON}.
- For each actionable item, locate the exact text in the composite and apply a precise Edit (use replace_all only when the same wrong token must change everywhere, e.g. a place name repeated in several rows — verify each occurrence is the intended one).
- Return a changelog: one entry per item with category, the issue, a short before/after snippet, the page, editApplied (true/false), and reason if not applied. Set noChangesNeeded=true only if there was genuinely nothing to fix.`
}

function verifyPrompt(ch, changelog) {
  return `You are the VERIFICATION agent. Independently check that the correction agent edited ONE composite correctly — no wrong fixes, no over-correction, no broken markdown, and interpretations left untouched.

COMPOSITE: ${ch.target} ("${ch.title}", pages ${ch.start}-${ch.end}, chapter num ${ch.num})

The correction agent reported these changes:
${JSON.stringify(changelog)}

STEPS:
- Read the (now-edited) ${ch.target}.
- Read your "### Chapter ${ch.num} —" section of ${REPORT} (the ground truth) and num ${ch.num} in ${ISSUES_JSON}.
- For each reported change: confirm the new text in the file matches the report's "Correct:" ground truth (verdict "correct"), or flag "wrong-fix" / "incomplete" / "over-correction". For any actionable report item that was NOT addressed, add a verdict "should-have-fixed". For items correctly left alone (interpretations, book-misprint nuances), use "fine-as-is".
- Check fileIntegrityOK (markdown tables/headers/links not broken) and interpretationsUntouched (no hypotheses/ratings/location theories were altered or deleted).
- overallVerdict = "needs-attention" if ANY verdict is wrong-fix/incomplete/over-correction/should-have-fixed or integrity/interpretation checks fail; else "all-good".

Do NOT edit the file. Return your verification only.`
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
log('Applying correction pass to ' + CHAPTERS.length + ' composites (correct -> independent verify) ...')

const results = await pipeline(
  CHAPTERS,
  // Stage 1: apply corrections
  (ch) => agent(correctPrompt(ch), { schema: CORRECT_SCHEMA, phase: 'Correct', label: 'fix:' + ch.slug }),
  // Stage 2: independently verify
  async (changelog, ch) => {
    if (!changelog) return { num: ch.num, title: ch.title, target: ch.target, correct: null, verify: null }
    const verify = await agent(verifyPrompt(ch, changelog), { schema: VERIFY_SCHEMA, phase: 'Verify', label: 'verify:' + ch.slug })
    return { num: ch.num, title: ch.title, target: ch.target, correct: changelog, verify }
  }
)

const all = results.filter(Boolean)

// ---- Aggregate (plain JS) ----
function digest(r) {
  const changes = (r.correct && r.correct.changes) || []
  const applied = changes.filter((c) => c.editApplied)
  const byCat = {}
  for (const c of applied) byCat[c.category] = (byCat[c.category] || 0) + 1
  const notApplied = changes.filter((c) => !c.editApplied)
  const flagged = ((r.verify && r.verify.verdicts) || []).filter((v) =>
    ['wrong-fix', 'incomplete', 'over-correction', 'should-have-fixed'].includes(v.verdict)
  )
  return {
    num: r.num,
    title: r.title,
    target: r.target,
    appliedCount: applied.length,
    byCat,
    changes,
    notApplied,
    verifyVerdict: (r.verify && r.verify.overallVerdict) || 'unknown',
    fileIntegrityOK: r.verify ? r.verify.fileIntegrityOK : null,
    interpretationsUntouched: r.verify ? r.verify.interpretationsUntouched : null,
    flagged,
    verifySummary: (r.verify && r.verify.summary) || '',
    correctSummary: (r.correct && r.correct.summary) || '',
  }
}

const digests = all.map(digest)
const totalApplied = digests.reduce((n, d) => n + d.appliedCount, 0)
const needsAttention = digests.filter((d) => d.verifyVerdict === 'needs-attention' || d.flagged.length || d.fileIntegrityOK === false || d.interpretationsUntouched === false)
const ranked = [...digests].sort((a, b) => b.appliedCount - a.appliedCount)

log('Applied ' + totalApplied + ' edits across ' + digests.length + ' composites; ' + needsAttention.length + ' flagged for attention.')

// ---- Report ----
phase('Report')
await agent(
  `Write the file CHAPTERS-CORRECTION-LOG.md (repo root, use the Write tool) — the audit trail for the correction pass just applied to the chapters/ composites.

Include:
- A title "# Chapters/ Correction Log" and a one-line note: this applied the high-confidence factual fixes + de-quoting + omission restoration from CHAPTERS-VALIDATION-REPORT.md, leaving interpretations and book-misprint nuances untouched. Files were edited in place (review with \`git diff chapters/\`).
- Totals: composites touched, total edits applied, and how many were flagged by the independent verifier.
- A summary table: Chapter | Composite | Edits applied | Verify verdict.
- A "Needs human attention" section listing every verifier-flagged item (wrong-fix / incomplete / over-correction / should-have-fixed, or any file-integrity / interpretation-touched failure) with chapter + note — or "None" if clean.
- A per-chapter detail section (only chapters with applied edits): for each change, category, the issue, before -> after snippet, and page. Note any changes the corrector could not apply (editApplied=false) with the reason.
- A closing note that this is the correction audit trail; the composites themselves carry no inline "corrected" markers.

Base it ENTIRELY on this data:
${JSON.stringify({ totalApplied, composites: digests.length, flaggedCount: needsAttention.length, chapters: ranked })}

Return the single word DONE.`,
  { phase: 'Report', label: 'write:correction-log' }
)

return {
  totalEditsApplied: totalApplied,
  compositesTouched: digests.filter((d) => d.appliedCount > 0).length,
  needsAttention: needsAttention.map((d) => ({ chapter: d.num, title: d.title, flags: d.flagged.length, verify: d.verifyVerdict })),
  topByEdits: ranked.slice(0, 8).map((d) => ({ chapter: d.num, title: d.title, edits: d.appliedCount, verify: d.verifyVerdict })),
}
