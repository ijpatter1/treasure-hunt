export const meta = {
  name: 'pages-faithfulness',
  description: "Make the pages/ layer faithful to the source screenshots: re-verify every metadata transcription + notes against the page image (ground truth), correct transcription/value/flag errors",
  phases: [
    { title: 'Correct', detail: 'one agent per page: compare image to metadata+notes, fix every discrepancy' },
    { title: 'Verify', detail: 'independently re-check corrected/low-legibility pages against the image' },
    { title: 'Report', detail: 'write the faithfulness changelog + JSON-validity status' },
  ],
}

// ----------------------------------------------------------------------------
// Page list (all 106 metadata files; each has a matching screenshot)
// ----------------------------------------------------------------------------
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
const PAGE_NAMES = ['cover', 'title-page', ...SPREAD_NAMES]
const PAGES = PAGE_NAMES.map((name) => ({
  name,
  img: 'screenshots/' + name + '.png',
  meta: 'pages/metadata/' + name + '.json',
  notes: 'pages/notes/' + name + '.md',
}))

const FIDELITY_RULES = `GROUND TRUTH = the page IMAGE. The pages/ layer is a TRANSCRIPTION/analysis layer; its job is to faithfully reflect what is actually printed. Correct every discrepancy between the files and the image.

WHAT TO CHECK & FIX in the metadata JSON:
- left_page.transcription.raw_text and right_page.transcription.raw_text must be VERBATIM what is printed — every word, number, name, date, and punctuation. Fix mis-transcriptions, dropped or added words, wrong numbers, wrong names, wrong order.
- Sidebar / caption values: carats, troy ounces, dollar values, dates, materials, maker/artist names, dimensions — match the page exactly (these were a known error source).
- "in our treasure" vs "not in our treasure" captions and any in_treasure-style flags — fix if the image says otherwise (a caption reading "not in our treasure" was previously mis-transcribed as the opposite).
- images[].description and images[].potential_clues, key_elements, poem — must accurately describe what is on the page; fix hallucinated or wrong descriptions.

CRITICAL — transcribe the BOOK'S OWN ERRORS faithfully:
- This is a transcription layer, so if the book itself prints a typo/misprint (e.g. "ARTHUR C. CLARK" without the e, or "5 1/2\\" floppy disk"), transcribe it EXACTLY as printed. Do NOT "fix" the book.
- When the printed text is itself wrong, keep the verbatim transcription AND record the book error in the JSON's verification_notes (e.g. "book prints 'CLARK'; the author is actually Arthur C. Clarke"). Never silently alter what the page says.

EDITING SAFELY:
- Use targeted Edit replacements (a unique old_string -> the corrected string). Do NOT rewrite an entire file blindly. Preserve all JSON keys/structure and valid JSON syntax, including escaping inside string values (\\n, \\", etc.).
- After editing the metadata JSON, VALIDATE it still parses by running this Bash command and confirming it prints ok:
    python3 -c "import json; json.load(open('PATH')); print('ok')"
  If it fails to parse, fix the syntax until it does. Report jsonValid accordingly.
- Also correct clear factual/transcription errors in the notes .md (quotes, values, names that contradict the image). LEAVE the notes' analysis / interpretation / hypotheses alone — only fix factual fidelity.
- If any region of the page is illegible or ambiguous, do NOT guess: record it under uncertainties and in verification_notes.
- Keep the files clean (no "CORRECTED" banners); the changelog you return is the audit trail.`

// ----------------------------------------------------------------------------
// Schemas
// ----------------------------------------------------------------------------
const CORRECT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    legibility: { type: 'string', enum: ['clear', 'partial', 'poor'] },
    noChangesNeeded: { type: 'boolean' },
    jsonValid: { type: 'boolean', description: 'Did the metadata JSON parse after edits (via the python json.load check).' },
    corrections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          file: { type: 'string', enum: ['metadata', 'notes'] },
          field: { type: 'string', description: 'e.g. left_page.raw_text, sidebar value, images[0].description, in_treasure caption, key_elements, notes:quote' },
          issueType: { type: 'string', enum: ['transcription', 'value', 'name', 'date', 'in-treasure-flag', 'caption', 'image-description', 'key-elements', 'poem', 'book-misprint-noted', 'other'] },
          before: { type: 'string' },
          after: { type: 'string' },
          editApplied: { type: 'boolean' },
          reason: { type: 'string', description: 'If not applied, why.' },
        },
        required: ['file', 'field', 'issueType', 'editApplied'],
      },
    },
    uncertainties: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
  required: ['name', 'legibility', 'corrections', 'jsonValid'],
}

const VERIFY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    faithful: { type: 'boolean' },
    jsonValid: { type: 'boolean' },
    remainingIssues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: { field: { type: 'string' }, problem: { type: 'string' } },
        required: ['field', 'problem'],
      },
    },
    verdict: { type: 'string', enum: ['faithful', 'needs-attention'] },
    note: { type: 'string' },
  },
  required: ['name', 'verdict', 'jsonValid'],
}

// ----------------------------------------------------------------------------
// Prompts
// ----------------------------------------------------------------------------
function correctPrompt(p) {
  return `You are making ONE page of the pages/ transcription layer FAITHFUL to the actual book page image.

PAGE: ${p.name}
  - Image (GROUND TRUTH): ${p.img}
  - Metadata to correct: ${p.meta}
  - Notes to correct: ${p.notes}

STEPS:
1. Read the IMAGE first with the Read tool (${p.img}) — it renders visually. This is the source of truth. Read it carefully, including small sidebar text, captions, and page numbers.
2. Read ${p.meta} and ${p.notes}.
3. Compare every transcribed/structured element to the image and fix discrepancies, per the rules below.

${FIDELITY_RULES}

The metadata path for the JSON-validity check is: ${p.meta}

If, after careful comparison, everything already matches the image, make no edits and set noChangesNeeded=true (still set legibility and jsonValid). Return the changelog of every correction (file, field, issueType, before, after, editApplied).`
}

function verifyPrompt(p, changelog) {
  return `You are independently verifying that ONE page of the pages/ layer is now FAITHFUL to its image.

PAGE: ${p.name} — image (GROUND TRUTH): ${p.img}; metadata: ${p.meta}; notes: ${p.notes}

The correction agent reported:
${JSON.stringify(changelog)}

STEPS:
- Read the image ${p.img} (ground truth).
- Read the now-corrected ${p.meta} (and ${p.notes} if relevant).
- Spot-check that left_page/right_page raw_text and the key fields (sidebar values, captions, in-treasure flags, names, dates) now match the image. Scan for any remaining discrepancy the correction missed.
- Confirm the metadata JSON parses: run  python3 -c "import json; json.load(open('${p.meta}')); print('ok')"  and set jsonValid.
- verdict = "needs-attention" if any remaining factual discrepancy, an over-correction (text changed to something NOT on the page), or invalid JSON; else "faithful".

Remember: the book's own misprints SHOULD be transcribed verbatim (with a verification_notes note) — do not flag a faithful transcription of a book typo as an error. Do NOT edit anything; report only.`
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
log('Faithfulness pass over ' + PAGES.length + ' pages (image-verified transcription correction) ...')

const results = await pipeline(
  PAGES,
  // Stage 1: correct against the image
  (p) => agent(correctPrompt(p), { schema: CORRECT_SCHEMA, phase: 'Correct', label: 'fix:' + p.name }),
  // Stage 2: verify ONLY pages that were changed or were not clearly legible (saves vision cost on clean pages)
  async (c, p) => {
    if (!c) return { name: p.name, correct: null, verify: null }
    const changed = (c.corrections || []).some((x) => x.editApplied)
    const needsVerify = changed || c.legibility !== 'clear' || c.jsonValid === false
    let verify = null
    if (needsVerify) {
      verify = await agent(verifyPrompt(p, c), { schema: VERIFY_SCHEMA, phase: 'Verify', label: 'verify:' + p.name })
    }
    return { name: p.name, correct: c, verify }
  }
)

const all = results.filter(Boolean)

// ---- Aggregate ----
function digest(r) {
  const c = r.correct
  const corrections = (c && c.corrections) || []
  const applied = corrections.filter((x) => x.editApplied)
  const byType = {}
  for (const x of applied) byType[x.issueType] = (byType[x.issueType] || 0) + 1
  const jsonValid = c ? c.jsonValid : null
  const v = r.verify
  const remaining = (v && v.remainingIssues) || []
  const flagged = v ? v.verdict === 'needs-attention' : false
  return {
    name: r.name,
    legibility: c ? c.legibility : 'unknown',
    appliedCount: applied.length,
    byType,
    corrections: applied,
    notApplied: corrections.filter((x) => !x.editApplied),
    uncertainties: (c && c.uncertainties) || [],
    jsonValid,
    verifyVerdict: v ? v.verdict : (applied.length ? 'unverified' : 'clean-no-verify'),
    remaining,
    flagged: flagged || jsonValid === false,
    summary: (c && c.summary) || '',
  }
}

const digests = all.map(digest)
const totalApplied = digests.reduce((n, d) => n + d.appliedCount, 0)
const pagesChanged = digests.filter((d) => d.appliedCount > 0).length
const jsonProblems = digests.filter((d) => d.jsonValid === false).map((d) => d.name)
const needsAttention = digests.filter((d) => d.flagged || d.legibility === 'poor')
const ranked = [...digests].sort((a, b) => b.appliedCount - a.appliedCount)
const typeTotals = {}
for (const d of digests) for (const k in d.byType) typeTotals[k] = (typeTotals[k] || 0) + d.byType[k]

log('Applied ' + totalApplied + ' corrections across ' + pagesChanged + '/' + digests.length + ' pages; JSON-invalid: ' + jsonProblems.length + '; flagged: ' + needsAttention.length)

// ---- Report ----
phase('Report')
await parallel([
  () =>
    agent(
      `Write the file pages-faithfulness-issues.json (use the Write tool) containing EXACTLY this JSON (valid, pretty-printed), nothing else — the machine-readable record of the pages/ faithfulness pass:\n\n${JSON.stringify({ totals: { pages: digests.length, correctionsApplied: totalApplied, pagesChanged, jsonInvalid: jsonProblems, typeTotals }, pages: ranked })}\n\nReturn the single word DONE.`,
      { phase: 'Report', label: 'write:issues.json' }
    ),
  () =>
    agent(
      `Write the file PAGES-FAITHFULNESS-LOG.md (repo root, use the Write tool) — the audit trail for the pass that re-verified the pages/ transcription layer against the source screenshots (ground truth).

Include:
- Title "# pages/ Faithfulness Pass" and a one-line note: every metadata transcription + notes was compared to its page image and corrected; the book's own misprints were transcribed verbatim and noted, not "fixed." Review with \`git diff pages/\`.
- Totals: pages checked, total corrections applied, pages changed, corrections by issue-type, and count of any JSON-invalid pages.
- A "Needs human attention" section: any page flagged needs-attention by the verifier, any JSON-invalid page, and any page with legibility "poor" — with the specifics. "None" if clean.
- A breakdown by issue-type (transcription / value / name / date / in-treasure-flag / caption / image-description / key-elements / poem / book-misprint-noted).
- A per-page detail section (only pages with applied corrections): page name, legibility, and each correction as field / issueType / before -> after.
- An "Uncertainties / illegible regions" section listing pages with recorded uncertainties.
- Closing note: this is the audit trail; files carry no inline markers; downstream layers (chapters/, wiki/, reports) were built on the OLD pages/ data and may warrant a re-check against the corrected transcriptions.

Base it ENTIRELY on this data:
${JSON.stringify({ totals: { pages: digests.length, correctionsApplied: totalApplied, pagesChanged, jsonInvalid: jsonProblems, typeTotals }, needsAttention: needsAttention.map((d) => ({ name: d.name, verifyVerdict: d.verifyVerdict, jsonValid: d.jsonValid, legibility: d.legibility, remaining: d.remaining })), pages: ranked })}

Return the single word DONE.`,
      { phase: 'Report', label: 'write:log.md' }
    ),
])

return {
  totalCorrections: totalApplied,
  pagesChanged,
  pagesChecked: digests.length,
  jsonInvalid: jsonProblems,
  typeTotals,
  needsAttention: needsAttention.map((d) => ({ page: d.name, verdict: d.verifyVerdict, jsonValid: d.jsonValid, legibility: d.legibility })),
  topByCorrections: ranked.slice(0, 10).map((d) => ({ page: d.name, corrections: d.appliedCount, verify: d.verifyVerdict })),
}
