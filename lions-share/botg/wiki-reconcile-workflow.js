export const meta = {
  name: 'wiki-reconcile',
  description: "Reconcile the wiki's load-bearing facts against the corrected pages/ + chapters/ ground truth; leave subject research/analysis intact",
  phases: [
    { title: 'Chapters', detail: 'reconcile each wiki chapter page\'s facts vs corrected sources' },
    { title: 'Hubs', detail: 'reconcile the people/places/items/themes/index hubs vs the corrected entities' },
    { title: 'Report', detail: 'write the reconcile log' },
  ],
}

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
function parseSpread(n) { const d = (n.match(/\d+/g) || []).map(Number); return { s: d[0] || 0, e: d[d.length - 1] || d[0] || 0 } }
function metaFor(start, end) { return SPREAD_NAMES.filter((n) => { const x = parseSpread(n); return x.s <= end && x.e >= start }).map((n) => 'pages/metadata/' + n + '.json') }

const RAW = [
  { num: 0, slug: 'front-matter', title: 'Front Matter', start: 1, end: 17 },
  { num: 1, title: 'The 120 Carat Sapphire', start: 18, end: 25 },
  { num: 2, title: 'The 100 Rings of Tuyet Nguyet', start: 26, end: 37 },
  { num: 3, title: 'A Puzzle Box, a Magnifying Glass, & the Mysterious Egg', start: 38, end: 45 },
  { num: 4, title: 'The 96 Carat Chivor Emerald', start: 46, end: 55 },
  { num: 5, title: 'Masterworks by Art Smith', start: 56, end: 63 },
  { num: 6, title: 'Rubies to Wear', start: 64, end: 69 },
  { num: 7, title: "Amelia's Autograph", start: 70, end: 75 },
  { num: 8, title: "Beauty's Bespoken Treasures", start: 76, end: 85 },
  { num: 9, title: 'The Golden Chalice', start: 86, end: 94 },
  { num: 10, title: "Jackie Onassis' Diamond Sapphire Brooch", start: 95, end: 100 },
  { num: 11, title: 'Treasures From a Famous Shipwreck', start: 101, end: 108 },
  { num: 12, title: 'Massive Gold Rush Nugget', start: 109, end: 114 },
  { num: 13, title: 'Best of Its Class Jordan Rookie Card', start: 115, end: 122 },
  { num: 14, title: "Tiffany's Furnace & Thoreau's Fire", start: 123, end: 132 },
  { num: 15, title: '1960 Rome Olympic Gold Medal', start: 133, end: 140 },
  { num: 16, title: '1996 Atlanta Olympic Gold Medal', start: 141, end: 150 },
  { num: 17, title: "George Washington's Jelly Glass", start: 151, end: 158 },
  { num: 18, title: "Andrew Carnegie's Emerald", start: 159, end: 164 },
  { num: 19, title: 'Moon Rocks & Meteors', start: 165, end: 170 },
  { num: 20, title: 'The Six-Figure Birthstone', start: 171, end: 178 },
  { num: 21, title: 'Antiquities of Alexander', start: 179, end: 188 },
  { num: 22, title: "Picasso's Pendant", start: 189, end: 194 },
  { num: 23, title: 'Sing Your Own Special Song', start: 195, end: 198 },
  { num: 24, slug: 'back-matter', title: 'Back Matter', start: 199, end: 211 },
]
const CHAPTERS = RAW.map((c) => {
  const slug = c.slug || 'chapter-' + pad(c.num)
  return { ...c, slug, wiki: 'wiki/' + slug + '.html', md: 'chapters/' + slug + '.md', meta: metaFor(c.start, c.end) }
})

const POLICY = `The wiki/*.html pages were generated on PRE-correction data. The ground truth is now: chapters/*.md (corrected) and pages/metadata/*.json (corrected & made faithful to the page images). Reconcile the wiki to that ground truth.

FIX (load-bearing facts only): place names, geographic clues, the "topGeoClue", the "Treasure-Hunt Signals", treasure values/specs (carats, ounces, dollar values, mintages), person/proper names, dates, and any "in-treasure" status — wherever the wiki conflicts with the corrected sources. Known examples to check: "Huntersville" should be "Statesville, NC" (Ch18); any fabricated gem origin like "Rio de Janeiro/Brazil" or an unsupported "LA area" park should be removed (Ch20); value/date/name fixes per the corrected chapter.

LEAVE INTACT: the wiki's web research, subject background, analysis, hypotheses, cross-links, navigation, styling, and page structure — UNLESS a statement rests on a fact that was corrected (then fix the fact, keep the prose).

Use targeted Edit replacements; keep valid HTML and the wiki.css link. Do not add "corrected" banners. If nothing conflicts, make no edits.`

const CH_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    num: { type: 'number' }, slug: { type: 'string' },
    noChanges: { type: 'boolean' },
    changes: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { field: { type: 'string' }, type: { type: 'string', enum: ['place', 'geo-clue', 'topGeoClue', 'value', 'name', 'date', 'in-treasure', 'signal', 'other'] }, before: { type: 'string' }, after: { type: 'string' } }, required: ['type', 'before', 'after'] } },
    entityCorrections: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { kind: { type: 'string', enum: ['place', 'name', 'value', 'date', 'flag'] }, before: { type: 'string' }, after: { type: 'string' } }, required: ['kind', 'before', 'after'] } },
    summary: { type: 'string' },
  }, required: ['num', 'slug', 'changes'],
}

const HUB_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    hub: { type: 'string' }, noChanges: { type: 'boolean' },
    changes: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { before: { type: 'string' }, after: { type: 'string' } }, required: ['before', 'after'] } },
    summary: { type: 'string' },
  }, required: ['hub', 'changes'],
}

function chapterPrompt(ch) {
  return `You are reconciling ONE wiki chapter page to the corrected ground truth.

WIKI PAGE TO FIX: ${ch.wiki}  ("${ch.title}")
GROUND TRUTH: ${ch.md} and these corrected transcriptions: ${ch.meta.join(', ')}.

${POLICY}

Read the wiki page, then the corrected sources. Fix every load-bearing fact that conflicts. Return the changelog AND an entityCorrections list (place/name/value/date/flag, before -> after) so the hub pages can be updated to match.`
}

function hubPrompt(hub, entityCorrections) {
  return `You are reconciling the wiki HUB page ${hub} to the corrected ground truth.

${POLICY}

These entity corrections were applied to the chapter pages — make the hub consistent with them (e.g. a place/name that changed should change here too; a removed fabricated place should be removed here):
${JSON.stringify(entityCorrections)}

Also open the relevant corrected chapter pages (wiki/chapter-NN.html, now reconciled) or chapters/*.md if you need to confirm an entry. Read ${hub}, fix any stale factual entry, keep the hub's structure/links intact, return the changelog.`
}

// ---- Run ----
phase('Chapters')
const chResults = (await parallel(CHAPTERS.map((ch) => () => agent(chapterPrompt(ch), { schema: CH_SCHEMA, phase: 'Chapters', label: 'wiki:' + ch.slug })))).filter(Boolean)

const allEntityCorrections = chResults.flatMap((r) => (r.entityCorrections || []).map((e) => ({ ...e, chapter: r.num })))
const chChanges = chResults.reduce((n, r) => n + (r.changes || []).length, 0)
log('Chapter pages reconciled: ' + chChanges + ' fact fixes; ' + allEntityCorrections.length + ' entity corrections for hubs')

phase('Hubs')
const HUBS = ['wiki/places.html', 'wiki/people.html', 'wiki/items.html', 'wiki/themes.html', 'wiki/index.html']
const hubResults = (await parallel(HUBS.map((h) => () => agent(hubPrompt(h, allEntityCorrections), { schema: HUB_SCHEMA, phase: 'Hubs', label: 'hub:' + h.replace('wiki/', '') })))).filter(Boolean)
const hubChanges = hubResults.reduce((n, r) => n + (r.changes || []).length, 0)
log('Hubs reconciled: ' + hubChanges + ' fixes')

phase('Report')
await agent(
  `Write the file WIKI-RECONCILE-LOG.md (repo root, use the Write tool): the audit trail for reconciling the wiki's load-bearing facts to the corrected pages/+chapters/.

Include: a one-line purpose; totals (chapter pages changed, total chapter fact-fixes, entity corrections, hub fixes); a per-chapter list of fact changes (field, type, before -> after) for chapters that changed; the hub changes; and a closing note that only facts were reconciled (research/analysis left intact) and the wiki is now safe to use as the primary research source for the location workflow.

DATA:
Chapter results: ${JSON.stringify(chResults)}
Hub results: ${JSON.stringify(hubResults)}

Return the single word DONE.`,
  { phase: 'Report', label: 'write:reconcile-log' }
)

return {
  chapterPagesChanged: chResults.filter((r) => (r.changes || []).length > 0).length,
  chapterFactFixes: chChanges,
  entityCorrections: allEntityCorrections.length,
  hubFixes: hubChanges,
}
