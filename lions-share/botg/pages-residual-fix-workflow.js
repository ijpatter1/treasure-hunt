export const meta = {
  name: 'pages-residual-fix',
  description: "Fix the 13 verifier-flagged residual issues left by the pages-faithfulness pass, against the page images",
  phases: [{ title: 'Fix', detail: 'one agent per flagged page: apply the precise image-verified fix' }],
}

// Each entry: the page and the EXACT verifier-identified residual fix(es).
const TO_FIX = [
  { name: 'page-020-021', fixes: 'right_page.transcription.raw_text: the metadata reads "He repeatedly pitched it to his bosses." but the page reads "He eagerly demonstrated his prototype to his bosses. They had no interest. He pitched it to them four more times." Make raw_text verbatim to the image, and correct verification_notes which wrongly asserts the right page was already confirmed verbatim.' },
  { name: 'page-034-035', fixes: 'The red-italic left-margin sidebar caption reads "...temple OF Angkor" but is transcribed "Angkor Wat is the largest temple AT Angkor." Change "at Angkor" -> "of Angkor" in the left_page sidebar formatted_section text, in verification_notes, and in notes.md.' },
  { name: 'page-040-041', fixes: 'left_page.transcription.raw_text transcribes "discernable" but the page prints the standard spelling "discernible" (i-b-l-e). This is NOT a book misprint. Change "discernable" -> "discernible", and fix verification_notes which wrongly affirmed "discernable" as a faithful misprint.' },
  { name: 'page-058-059', fixes: 'right_page.transcription.raw_text reads "such opinions weren\'t laced with malice" but the page prints "such opinions weren\'t held with malice." Change "laced" -> "held".' },
  { name: 'page-066-067', fixes: 'left_page sidebar text reads "A large round ruby is shown cased in its center" but the page prints one word "showcased" (hyphenated across a line break). Change "shown cased" -> "showcased".' },
  { name: 'page-070-071', fixes: '(1) right_page.transcription.raw_text reads "...their unadulterated, uninhibited, unbridled enthusiasm..." but the page reads "...their unadulterated, unabashed, unabated enthusiasm...". Change "uninhibited, unbridled" -> "unabashed, unabated". (2) The handwritten "Explore More" subtitle is labeled style "red_handwritten" but its ink is neutral gray/black, NOT red. Fix the subtitle style in right_page.transcription.formatted_sections and in right_page.formatting.emphasized_text, and in notes.md ("Handwritten red subtitle"), to indicate gray/black handwritten (not red). Leave the genuinely-red quote text as red.' },
  { name: 'page-084-085', fixes: '(1) key_elements.treasure_hunting_warning.description reads "Treasure hunter\'s most dreaded foe" but the book prints "foil" (already in raw_text/verification_notes). Change "foe" -> "foil" in that key_elements field. (2) notes.md (~line 18) Tutuveni quote reads plural "petroglyphs ... covers"; the book prints singular "petroglyph". Change to singular to match the corrected raw_text.' },
  { name: 'page-139-140', fixes: 'right_page.transcription.raw_text reads "We don\'t serve Negroes." but the book prints the misprint "We don\'t serve Negros." (missing the second e). This is a BOOK MISPRINT and must be transcribed verbatim: change "Negroes" -> "Negros" so raw_text matches the image (verification_notes already documents preserving "Negros").' },
  { name: 'page-141-142', fixes: 'The handwritten subtitle "Defy Expectations" is labeled style "red_handwritten" / "Handwritten red subtitle" but its ink is dark gray/black, NOT red (the red chapter "16" marker is the genuinely red element). Fix the subtitle style attribute in right_page.transcription.formatted_sections, in right_page.formatting.emphasized_text, and in notes.md (~line 32) to gray/black handwritten. The transcribed TEXT is correct; change only the color/style attribute.' },
  { name: 'page-171-172', fixes: 'The first quote\'s attribution is transcribed "Lscrae" (and verification_notes says it prints "—LSCRAE") but the image shows "—LECRAE" (the artist Lecrae; second letter is E, not S). Change "Lscrae" -> "Lecrae" / "LSCRAE" -> "LECRAE" in right_page.transcription.raw_text, the formatted_sections attribution, verification_notes, and notes.md.' },
  { name: 'page-183-184', fixes: 'right_page.transcription.raw_text reads "Sex, fertility, and springtime were his jam." but the page prints plural "his jams." Change "his jam." -> "his jams."' },
  { name: 'page-191-192', fixes: '(1) right_page.transcription.raw_text reads "Seeing Jacqueline at her home had only ENHANCED the feelings Picasso" but the image reads "enflamed" — change "enhanced" -> "enflamed". (2) PAGE-SWAP: the paragraph beginning "Seeing Jacqueline at her home had only enflamed the feelings..." and ending "...one more subtle than decorating Jacqueline\'s home with chalk, but just as brave." is PHYSICALLY ON THE LEFT PAGE (191), directly above the "191" folio. Move this whole paragraph from right_page.raw_text to the END of left_page.raw_text (left_page currently wrongly ends at "But she declined his second invitation to dinner."). The RIGHT page (192) should contain only the paragraph "The next day, Pablo ventured back...Weeks turned into months." Re-verify the split against the image and fix raw_text on both pages accordingly. (3) Minor: left_page.page_number 191 is correct; fix the uncertainties note that wrongly says page numbers were not legible.' },
  { name: 'page-193-194', fixes: 'left_page.transcription.raw_text reads singular "Picasso\'s self-made treasure was unwavering" but the image prints plural "treasures". Change "treasure was unwavering" -> "treasures was unwavering" (verbatim to the page, retaining the book\'s grammar).' },
]

const FIX_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    name: { type: 'string' },
    jsonValid: { type: 'boolean' },
    fixesApplied: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        properties: {
          target: { type: 'string', description: 'file + field changed' },
          before: { type: 'string' }, after: { type: 'string' },
          applied: { type: 'boolean' }, note: { type: 'string' },
        }, required: ['target', 'applied'],
      },
    },
    summary: { type: 'string' },
  }, required: ['name', 'jsonValid', 'fixesApplied'],
}

function fixPrompt(p) {
  const meta = 'pages/metadata/' + p.name + '.json'
  const notes = 'pages/notes/' + p.name + '.md'
  const img = 'screenshots/' + p.name + '.png'
  return `You are applying a small set of PRECISE, already-identified residual fixes to one page of the pages/ transcription layer, against the page image (GROUND TRUTH).

PAGE: ${p.name}
  - Image (ground truth): ${img}
  - Metadata: ${meta}
  - Notes: ${notes}

THE EXACT FIX(ES) TO APPLY (verified against the image by a prior pass):
${p.fixes}

INSTRUCTIONS:
1. Read the image ${img} to confirm the correct text before editing (especially the page-swap / color-attribute cases).
2. Apply ONLY the fix(es) above, using targeted Edit replacements. Do NOT change anything else on the page.
3. Book misprints must be transcribed VERBATIM as printed (e.g. "Negros"); do not "fix" the book.
4. Preserve valid JSON. After editing ${meta}, run: python3 -c "import json; json.load(open('${meta}')); print('ok')" and confirm it prints ok; set jsonValid accordingly. If it fails, fix the syntax.
5. If a target string can't be found exactly, set applied=false with a note — do not guess.

Return the changelog (target, before, after, applied) for each fix.`
}

phase('Fix')
const results = (await parallel(TO_FIX.map((p) => () => agent(fixPrompt(p), { schema: FIX_SCHEMA, phase: 'Fix', label: 'fix:' + p.name })))).filter(Boolean)

const applied = results.reduce((n, r) => n + (r.fixesApplied || []).filter((f) => f.applied).length, 0)
const jsonBad = results.filter((r) => r.jsonValid === false).map((r) => r.name)
const notApplied = results.flatMap((r) => (r.fixesApplied || []).filter((f) => !f.applied).map((f) => ({ page: r.name, target: f.target, note: f.note })))
log('Residual fixes: ' + applied + ' applied across ' + results.length + ' pages; JSON-invalid: ' + jsonBad.length + '; not-applied: ' + notApplied.length)

return { pagesProcessed: results.length, fixesApplied: applied, jsonInvalid: jsonBad, notApplied }
