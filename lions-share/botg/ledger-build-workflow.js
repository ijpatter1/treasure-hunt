export const meta = {
  name: 'ledger-build',
  description: "Phase A of JCB's method: per-chapter agents write the full-corpus LITERAL signal ledger (no large structured outputs), then an analysis pass — for human review before convergence",
  phases: [
    { title: 'Capture', detail: 'one agent per chapter/section writes its signals to a small per-unit file' },
    { title: 'Analyze', detail: 'read all per-unit files; write independence-groups + candidate-region mapping' },
  ],
}

const pad = (n) => String(n).padStart(2, '0')
const SPREAD_NAMES = [
  'front-01-02', 'front-03-04', 'page-008-009', 'page-010-011', 'page-012-013', 'page-014-015', 'page-016-017',
  'page-018-019', 'page-020-021', 'page-022-023', 'page-024-025', 'page-026-027', 'page-028-029', 'page-030-031',
  'page-032-033', 'page-034-035', 'page-036-037', 'page-038-039', 'page-040-041', 'page-042-043', 'page-044-045',
  'page-046-047', 'page-048-049', 'page-050-051', 'page-052-053', 'page-054-055', 'page-056-057', 'page-058-059',
  'page-060-061', 'page-062-063', 'page-064-065', 'page-066-067', 'page-068-069', 'page-070-071', 'page-072-073',
  'page-074-075', 'page-076-077', 'page-078-079', 'page-080-081', 'page-082-083', 'page-084-085', 'page-086-087',
  'page-088-089', 'page-091-092', 'page-093-094', 'page-095-096', 'page-097-098', 'page-099-100', 'page-101-102',
  'page-103-104', 'page-105-106', 'page-107-108', 'page-109-110', 'page-111-112', 'page-113-114', 'page-115-116',
  'page-117-118', 'page-119-120', 'page-121-122', 'page-123-124', 'page-125-126', 'page-127-128', 'page-129-130',
  'page-131-132', 'page-133-134', 'page-135-136', 'page-137-138', 'page-139-140', 'page-141-142', 'page-143-144',
  'page-145-146', 'page-147-148', 'page-149-150', 'page-151-152', 'page-153-154', 'page-155-156', 'page-157-158',
  'page-159-160', 'page-161-162', 'page-163-164', 'page-165-166', 'page-167-168', 'page-169-170', 'page-171-172',
  'page-173-174', 'page-175-176', 'page-177-178', 'page-179-180', 'page-181-182', 'page-183-184', 'page-185-186',
  'page-187-188', 'page-189-190', 'page-191-192', 'page-193-194', 'page-195-196', 'page-197-198', 'page-199-200',
  'page-201-202', 'page-203-204', 'page-205-206', 'page-207-208', 'page-209-210', 'page-211-back',
]
function parseSpread(n) { const d = (n.match(/\d+/g) || []).map(Number); return { s: d[0] || 0, e: d[d.length - 1] || d[0] || 0 } }
function metaFor(start, end) { return SPREAD_NAMES.filter((n) => { const x = parseSpread(n); return x.s <= end && x.e >= start }).map((n) => 'pages/metadata/' + n + '.json') }

const METHOD = `This is PHASE A (LEDGER BUILD) of JCB's own solving method for the Lion's Share treasure ("There's Treasure Inside" by Jon Collins-Black). We are NOT picking a location and NOT scoring — we are CAPTURING, exhaustively and literally.

JCB's rules that govern this phase:
- "Do not overlook any part of this book" + "Joy is in the details" — capture from EVERY part (chapter bodies, sidebars, captions, images), and capture the SMALL/easily-missed details, not just the obvious ones.
- BE LITERAL — "no double meanings, no misdirection, no code; take it as literally as you possibly can." REJECT any signal that needs a cipher move: letter-extraction, acrostics, capitalization tricks (lowercase "will's" must NOT become "William"), forced etymology, syllable games.
- The location is a CONVERGENCE of many small distributed signals ("almost every chapter has at least one morsel"). Capture broadly and rank later — every plausible literal geographic/observational signal goes in, even weak ones.
- Hold AMBIGUOUS poem tokens as MULTI-SENSE (one row per sense, mark ambiguous), NEVER decoded: "will", "X", "pike" (fish / turnpike / peaked-hill — the line "magic in the water, but the pike" grammatically favors the FISH/water sense), "shimmering circles of gold", "Dancers" (a literal token, NOT "Hopi butterflies").
- Down-weight asides in chapters 15-18 (Part Two = the four SMALLER boxes) for the Lion's Share unless they address all the treasures (mark strength=weak with a note).
- BIOGRAPHY is NOT a location directive (Postscript insider rule). Capture biographical-geography but mark type="biography".

A SIGNAL = any literal element that could help locate or describe the hide: a placename, bearing/distance, described landscape/terrain/vista, elevation cue, flora/fauna, an item's stated origin/where-it-is, a direction, an access/difficulty cue, a hide-pattern cue.`

const CH_RANGE = { 1: [18, 25], 2: [26, 37], 3: [38, 45], 4: [46, 55], 5: [56, 63], 6: [64, 69], 7: [70, 75], 8: [76, 85], 9: [86, 94], 10: [95, 100], 11: [101, 108], 12: [109, 114], 13: [115, 122], 14: [123, 132], 15: [133, 140], 16: [141, 150], 17: [151, 158], 18: [159, 164], 19: [165, 170], 20: [171, 178], 21: [179, 188], 22: [189, 194], 23: [195, 198] }
const SLICES = []
for (let i = 1; i <= 23; i++) {
  const r = CH_RANGE[i]
  SLICES.push({ key: 'ch' + pad(i), files: ['chapters/chapter-' + pad(i) + '.md', ...metaFor(r[0], r[1])], desc: 'Chapter ' + i + ' ONLY — mine it EXHAUSTIVELY' + (i >= 15 && i <= 18 ? ' (Part Two: down-weight asides for the Lion\'s Share unless they address all the treasures)' : '') })
}
SLICES.push({ key: 'front-intro', files: [...metaFor(1, 15), 'chapters/front-matter.md'], desc: 'Front matter + Introduction (dedication, TOC, intro p.10/13)' })
SLICES.push({ key: 'how-to-read', files: metaFor(16, 17), desc: 'How To Read This Book (p.16-17) — the core method instructions' })
SLICES.push({ key: 'postscript-acks', files: [...metaFor(207, 211), 'chapters/back-matter.md'], desc: 'Postscript (p.207-208, the hard filters) + acknowledgements + back cover' })
SLICES.push({ key: 'poem', files: [...metaFor(205, 206), 'chapters/joys-serenade.md'], desc: "Joy's Serenade poem (p.205-206)" })
SLICES.push({ key: 'back-items', files: [...metaFor(199, 204), 'chapters/treasure-items-additional.md'], desc: 'Back-matter additional treasure items (p.199-204)' })

function capturePrompt(slice) {
  return `${METHOD}

You are the CAPTURE agent for ${slice.key} — ${slice.desc}.

Read these files (pages/metadata JSON hold the FAITHFUL verbatim book text in left_page.transcription.raw_text + right_page.transcription.raw_text, plus key_elements / images[].description / poem; chapters/*.md are corrected composites for context). Read them ALL:
${slice.files.map((f) => '  - ' + f).join('\n')}

Extract EVERY literal geographic/observational signal per the rules above — be EXHAUSTIVE (weak/ambiguous ones too; the small details matter most).

Then WRITE your signals (use the Write tool) to the file:  botg/ledger/raw/${slice.key}.md
as a GitHub-markdown table with this exact heading line first:
"## ${slice.key} — signals"
then the table:
| source | signal (verbatim) | literal reading | type | region implied | ambiguous | strength |
One row per signal. Inside any cell, replace "|" with "/" and any newline with a space (so the table stays valid).
- source = chapter/page/section (e.g. "Ch8 p.82", "Poem", "Postscript p.207").
- type is one of: placename, bearing-distance, descriptive-geography, terrain-vista, elevation, flora-fauna, item-provenance, direction, access-difficulty, hide-pattern, biography, other.
- region implied = a concrete US place if the TEXT implies one, else "none-yet".
- ambiguous = "yes" for held multi-sense poem tokens, else "no".
- strength = strong, moderate, or weak.
Reject anything that needs a cipher move. After writing the file, return ONE line only: "${slice.key}: <N> signals".`
}

const analysisPrompt = `${METHOD}

You are writing the ANALYSIS for the signal ledger. The capture agents each wrote a per-unit signal table to botg/ledger/raw/<key>.md. Read ALL of them (Glob "botg/ledger/raw/*.md", then Read each). Then WRITE botg/ledger/analysis.md (Write tool) containing:

1. INDEPENDENCE-GROUPS — group signals whose geographic implication derives from the SAME underlying source, using this HARD rule (the anti-lone-association guard; be strict): ALL biography facts (Bakersville box-maker + Hiddenite childhood + CA residence + Statesville church) -> ONE group "biography"; all facets of a SINGLE treasure item's provenance -> one group "item:<item>"; a placename + its echoes -> one group. List each group -> its member signals (by chapter + short quote).

2. CANDIDATE REGIONS — list (a) regions that EMERGE from the "region implied" columns, PLUS (b) these seeded priors to be scored later on the same basis: North Carolina (Blue Ridge gem belt — genuine geology/flora/fauna fit), California (Washington/South-Yuba + the author's home orbit), Kansas (Atchison), Utah (Dance Hall Rock). For EACH region: which signals/chapters and which independence-GROUPS point to it, plus a COUNT of distinct INDEPENDENT groups (a region backed by only ONE group is under-supported by JCB's design). Do NOT score or rank — only map.

3. A short "What Phase B will add" note (the externally-researched topic-tangent + item-provenance signals not yet in the ledger).

Return ONE line: "wrote analysis (<G> groups, <R> candidate regions)".`

// ---- Run ----
phase('Capture')
const caps = (await parallel(SLICES.map((s) => () => agent(capturePrompt(s), { phase: 'Capture', label: 'capture:' + s.key })))).filter(Boolean)
log('Capture agents finished: ' + caps.length + '/' + SLICES.length + ' (each wrote botg/ledger/raw/<key>.md)')

phase('Analyze')
await agent(analysisPrompt, { phase: 'Analyze', label: 'write:analysis' })

return { captureUnits: caps.length, expected: SLICES.length, rawDir: 'botg/ledger/raw/', analysis: 'botg/ledger/analysis.md', assemble: 'main loop: cat botg/ledger/raw/*.md + analysis.md -> SIGNAL-LEDGER.md' }
