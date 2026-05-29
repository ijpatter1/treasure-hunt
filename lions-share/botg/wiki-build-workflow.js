export const meta = {
  name: 'wiki-build',
  description: "Build a cross-linked HTML wiki for the Lion's Share hunt: one researched page per chapter, then an interlinking pass",
  phases: [
    { title: 'Setup', detail: 'write shared wiki.css' },
    { title: 'Summarize', detail: 'read each chapter + its page spreads, extract subjects' },
    { title: 'Research', detail: 'web-research every subject (clues by association)' },
    { title: 'Compose', detail: 'write one self-contained HTML page per chapter' },
    { title: 'Interlink-Hubs', detail: 'build index + people/places/items/themes hub pages' },
    { title: 'Interlink-Pages', detail: 'weave cross-links + Related sections into each page' },
    { title: 'Finalize', detail: 'write wiki README / build log' },
  ],
}

// ----------------------------------------------------------------------------
// Data & helpers
// ----------------------------------------------------------------------------
const pad = (n) => String(n).padStart(2, '0')

// All page-spread source files that exist on disk (without extension).
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

// Chapter table (num 0 = front matter, 24 = back matter).
const RAW_CHAPTERS = [
  { num: 0, slug: 'front-matter', title: 'Front Matter — Poems, Dedication & Invitation', subtitle: "Joy's Serenade & the Reader's Invitation", start: 1, end: 17, chFiles: ['chapters/front-matter.md', 'chapters/joys-serenade.md'] },
  { num: 1, title: 'The 120 Carat Sapphire', subtitle: 'A Plan That Changed the World', start: 18, end: 25 },
  { num: 2, title: 'The 100 Rings of Tuyet Nguyet', subtitle: "Don't Wing It", start: 26, end: 37 },
  { num: 3, title: 'A Puzzle Box, a Magnifying Glass, & the Mysterious Egg', subtitle: 'Joy Is in the Details', start: 38, end: 45 },
  { num: 4, title: 'The 96 Carat Chivor Emerald', subtitle: 'Blaze the Path', start: 46, end: 55 },
  { num: 5, title: 'Masterworks by Art Smith', subtitle: 'An Exercise in Faith', start: 56, end: 63 },
  { num: 6, title: 'Rubies to Wear', subtitle: 'Inspiration Is Welcome', start: 64, end: 69 },
  { num: 7, title: "Amelia's Autograph", subtitle: 'Explore More', start: 70, end: 75 },
  { num: 8, title: "Beauty's Bespoken Treasures", subtitle: 'Know the Past, See the Future', start: 76, end: 85 },
  { num: 9, title: 'The Golden Chalice', subtitle: 'Confirmation Bias', start: 86, end: 94 },
  { num: 10, title: "Jackie Onassis' Diamond Sapphire Brooch", subtitle: 'Welcome the Good and the Bad', start: 95, end: 100 },
  { num: 11, title: 'Treasures From a Famous Shipwreck', subtitle: 'The Temptress Greed', start: 101, end: 108 },
  { num: 12, title: 'Massive Gold Rush Nugget', subtitle: 'Make Good Choices', start: 109, end: 114 },
  { num: 13, title: 'Best of Its Class Jordan Rookie Card', subtitle: 'Be Like Mike', start: 115, end: 122 },
  { num: 14, title: "Tiffany's Furnace & Thoreau's Fire", subtitle: 'Fail Forward', start: 123, end: 132 },
  { num: 15, title: '1960 Rome Olympic Gold Medal', subtitle: "Don't Give Up", start: 133, end: 140 },
  { num: 16, title: '1996 Atlanta Olympic Gold Medal', subtitle: 'Defy Expectations', start: 141, end: 150 },
  { num: 17, title: "George Washington's Jelly Glass", subtitle: 'Share Your Story', start: 151, end: 158 },
  { num: 18, title: "Andrew Carnegie's Emerald", subtitle: 'The Science of Giving', start: 159, end: 164 },
  { num: 19, title: 'Moon Rocks & Meteors', subtitle: 'The Next Frontier', start: 165, end: 170 },
  { num: 20, title: 'The Six-Figure Birthstone', subtitle: 'Choosing a New Perspective', start: 171, end: 178 },
  { num: 21, title: 'Antiquities of Alexander', subtitle: 'Make It Make Sense', start: 179, end: 188 },
  { num: 22, title: "Picasso's Pendant", subtitle: 'A Love Story', start: 189, end: 194 },
  { num: 23, title: 'Sing Your Own Special Song', subtitle: 'Finding Treasures Along the Way', start: 195, end: 198 },
  { num: 24, slug: 'back-matter', title: 'Back Matter — Postscript, Confirmed Rules & Back-Cover Poem', subtitle: "The Author's Rules of the Hunt", start: 199, end: 211, chFiles: ['chapters/back-matter.md', 'chapters/treasure-items-additional.md'] },
]

// Enrich each chapter with slug, source files, href, prev/next.
const CHAPTERS = RAW_CHAPTERS.map((c) => {
  const slug = c.slug || ('chapter-' + pad(c.num))
  const chFiles = c.chFiles || ['chapters/chapter-' + pad(c.num) + '.md']
  const spreads = spreadsFor(c.start, c.end)
  return {
    ...c,
    slug,
    chFiles,
    href: slug + '.html',
    notes: spreads.map((s) => 'pages/notes/' + s + '.md'),
    metadata: spreads.map((s) => 'pages/metadata/' + s + '.json'),
  }
})

const ORDER = CHAPTERS.map((c) => ({ num: c.num, slug: c.slug, title: c.title, href: c.href }))
function navFor(c) {
  const i = CHAPTERS.findIndex((x) => x.num === c.num)
  const prev = i > 0 ? CHAPTERS[i - 1] : null
  const next = i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : null
  return {
    prevHref: prev ? prev.href : 'index.html',
    prevTitle: prev ? prev.title : 'Home',
    nextHref: next ? next.href : 'index.html',
    nextTitle: next ? next.title : 'Home',
  }
}

const HUB_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'people.html', label: 'People' },
  { href: 'places.html', label: 'Places' },
  { href: 'items.html', label: 'Treasures' },
  { href: 'themes.html', label: 'Themes' },
]

const BOOK_CONTEXT = `PROJECT: Find the "Lion's Share" treasure box (the largest of five) hidden by author Jon Collins-Black, described in his book "There's Treasure Inside." We are building a research wiki to help locate it on accessible US public land.
AUTHOR'S CONFIRMED RULES (treat as hard constraints): the box is on PUBLIC land (not private), NOT buried (no digging), within ~3 miles of a road, not in a dangerous spot (no water crossings/cliffs), requires boots-on-the-ground after solving. One box per US state; clues are LITERAL (the author says there is NO grand cipher/code — do not invent ciphers, syllable counts, or letter games).
A prior boots-on-the-ground search of Rocky Face Mountain (Alexander County, NC) FAILED, so we need fresh, evidence-grounded leads anywhere in the US.
HOW CLUES WORK: clues are subtly placed; item histories and the people/places associated with each chapter may carry "clues by association." Note anything that points to a real US geography (a town, mountain, park, museum, river, landmark, named place).`

const CSS = `:root{--bg:#faf8f3;--ink:#2a2a28;--accent:#7a5c2e;--accent2:#b8893a;--rule:#e3dccb;--link:#9a3b2e;--soft:#f1ece1;--signalbg:#fff7e6}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Georgia,'Times New Roman',serif;background:var(--bg);color:var(--ink);line-height:1.65}
header.topnav{position:sticky;top:0;background:#1f1b14;color:#f3ecd9;padding:.55rem 1rem;display:flex;gap:.9rem;align-items:center;flex-wrap:wrap;z-index:20;border-bottom:3px solid var(--accent2)}
header.topnav .brand{font-weight:bold;letter-spacing:.04em;margin-right:.5rem}
header.topnav a{color:#f3ecd9;text-decoration:none;font-family:system-ui,-apple-system,sans-serif;font-size:.82rem;letter-spacing:.02em}
header.topnav a:hover{color:var(--accent2)}
.wrap{max-width:900px;margin:0 auto;padding:2rem 1.3rem 4rem}
h1{font-size:2.05rem;line-height:1.15;margin:.2em 0 .12em;color:#1f1b14}
.subtitle{font-style:italic;color:var(--accent);font-size:1.18rem;margin:0 0 .4rem}
.meta{font-family:system-ui,sans-serif;font-size:.8rem;color:#8a8270;margin-bottom:1.5rem}
h2{margin-top:2.2rem;border-bottom:2px solid var(--rule);padding-bottom:.25rem;color:var(--accent);font-size:1.4rem}
h3{color:var(--accent2);margin-bottom:.15rem;font-size:1.12rem}
a{color:var(--link)}
p{margin:.6rem 0}
blockquote{border-left:4px solid var(--accent2);margin:1rem 0;padding:.45rem 1rem;background:var(--soft);font-style:italic}
.poem{white-space:pre-wrap;background:var(--soft);padding:1rem 1.2rem;border-radius:6px;font-style:italic;border:1px solid var(--rule)}
.tags{margin:.4rem 0 1rem}
.tag{display:inline-block;background:var(--soft);border:1px solid var(--rule);border-radius:999px;padding:.16rem .72rem;margin:.16rem .18rem .16rem 0;font-family:system-ui,sans-serif;font-size:.78rem;text-decoration:none;color:var(--accent)}
a.tag:hover{background:var(--accent2);color:#fff}
.signal{background:var(--signalbg);border:1px solid var(--accent2);border-left:5px solid var(--accent2);padding:.7rem 1rem;border-radius:4px;margin:.7rem 0}
.signal .lbl{font-family:system-ui,sans-serif;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--accent);font-weight:bold}
.sources{font-size:.86rem}
.sources li{margin-bottom:.3rem}
.related{background:var(--soft);border-radius:6px;padding:1rem 1.2rem;margin-top:2.2rem;border:1px solid var(--rule)}
.related h2{margin-top:0;border:none}
.prevnext{display:flex;justify-content:space-between;gap:1rem;margin-top:2.4rem;font-family:system-ui,sans-serif;font-size:.9rem}
.prevnext a{text-decoration:none}
footer{margin-top:3rem;border-top:1px solid var(--rule);padding-top:1rem;font-family:system-ui,sans-serif;font-size:.76rem;color:#8a8270}
table.grid{border-collapse:collapse;width:100%;margin:1rem 0}
table.grid td,table.grid th{border:1px solid var(--rule);padding:.45rem .6rem;text-align:left;font-size:.92rem;vertical-align:top}
table.grid th{background:var(--soft);font-family:system-ui,sans-serif;font-size:.82rem}
ul.toc{list-style:none;padding:0}
ul.toc li{padding:.5rem 0;border-bottom:1px solid var(--rule)}
ul.toc .num{display:inline-block;width:2.4rem;color:var(--accent2);font-weight:bold}
ul.toc .les{font-style:italic;color:var(--accent)}
.lead{font-size:1.05rem}`

// ----------------------------------------------------------------------------
// Schemas
// ----------------------------------------------------------------------------
const EXTRACT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    num: { type: 'number' },
    title: { type: 'string' },
    summary: { type: 'string', description: 'Multi-paragraph factual summary of what this chapter says/does. Plain prose.' },
    lesson: { type: 'string', description: 'The chapter subtitle/lesson and how it is used; any explicit instruction or moral.' },
    poem: { type: 'string', description: 'Verbatim text of any poem/stanza/epigraph printed on these pages, or empty string.' },
    keyQuotes: { type: 'array', items: { type: 'string' }, description: 'Short verbatim quotes that feel clue-relevant (esp. anything naming a real place).' },
    treasures: { type: 'array', items: { type: 'string' }, description: 'The treasure item(s) featured in this chapter.' },
    subjects: {
      type: 'array',
      description: 'Ranked most-clue-relevant first. Real people, places, items, orgs, events worth researching.',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          type: { type: 'string', enum: ['person', 'place', 'item', 'organization', 'event', 'theme', 'other'] },
          why: { type: 'string', description: 'Why it might matter for the hunt (1-2 sentences).' },
          query: { type: 'string', description: 'A good web-search query to research it.' },
        },
        required: ['name', 'type', 'why', 'query'],
      },
    },
  },
  required: ['num', 'title', 'summary', 'lesson', 'subjects'],
}

const RESEARCH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    subject: { type: 'string' },
    type: { type: 'string' },
    findings: { type: 'string', description: 'Researched factual summary (origin, history, who/what/where it connects to). 1-3 short paragraphs.' },
    geoClues: { type: 'string', description: 'Any concrete US geographic angle: towns, mountains, parks, rivers, museums, landmarks associated with this subject. Empty string if none.' },
    huntRelevance: { type: 'string', description: 'Honest assessment of whether/how this could point toward a US public-land hide site. Mark speculation as speculation.' },
    sources: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: { title: { type: 'string' }, url: { type: 'string' } },
        required: ['url'],
      },
    },
  },
  required: ['subject', 'findings'],
}

const COMPOSE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    num: { type: 'number' },
    title: { type: 'string' },
    slug: { type: 'string' },
    oneLine: { type: 'string', description: 'One-sentence description of the chapter for the index.' },
    people: { type: 'array', items: { type: 'string' } },
    places: { type: 'array', items: { type: 'string' } },
    items: { type: 'array', items: { type: 'string' } },
    organizations: { type: 'array', items: { type: 'string' } },
    events: { type: 'array', items: { type: 'string' } },
    themes: { type: 'array', items: { type: 'string' } },
    topGeoClue: { type: 'string', description: 'The single strongest US geographic lead from this chapter, or empty string.' },
  },
  required: ['num', 'title', 'slug'],
}

// ----------------------------------------------------------------------------
// Prompt builders
// ----------------------------------------------------------------------------
function extractPrompt(ch) {
  const srcList = [...ch.chFiles, ...ch.notes, ...ch.metadata]
  return `${BOOK_CONTEXT}

You are the EXTRACTION agent for one chapter of the wiki. Read the source material thoroughly, then return a structured extraction. Do NOT write any HTML.

CHAPTER ${ch.num}: "${ch.title}" — lesson/subtitle: "${ch.subtitle}" (book pages ${ch.start}-${ch.end}).

READ ALL of these files (use the Read tool; some may be large — read them):
${srcList.map((f) => '  - ' + f).join('\n')}

In the metadata JSON, the transcribed book text is in left_page.transcription.raw_text and right_page.transcription.raw_text; also mine key_elements, images[].description / images[].potential_clues, poem, and verification_notes.

Produce:
- summary: a faithful multi-paragraph summary of the chapter's content and narrative.
- lesson: what the subtitle/lesson means and how the author uses it.
- poem: verbatim text of any poem/stanza/epigraph on these pages (empty string if none).
- keyQuotes: short verbatim quotes that feel clue-relevant — ESPECIALLY anything naming a real-world place, bearing, distance, or direction.
- treasures: the treasure item(s) featured.
- subjects: every real person, place, item, organization, and event worth researching for "clues by association," RANKED most-clue-relevant first. For each give a one-line "why" and a good web-search "query." Be generous but prioritize: include the treasure item's maker/origin/owners, any named towns/mountains/rivers/parks/museums, and historical figures. Be LITERAL — no ciphers.`
}

function researchPrompt(ch, s) {
  return `${BOOK_CONTEXT}

You are a RESEARCH agent. Web-research ONE subject from Chapter ${ch.num} ("${ch.title}") and report factual findings useful for locating a US treasure hide site by association.

SUBJECT: "${s.name}" (type: ${s.type})
WHY IT MATTERS (from extraction): ${s.why}
SUGGESTED QUERY: ${s.query}

FIRST load the web tools: call ToolSearch with query "select:WebSearch,WebFetch", then use WebSearch (and WebFetch on the most promising results) to research. Do 2-5 searches as needed.

Focus your research on:
- Origin & history of the subject; who made/owned/used it.
- WHERE it is physically located, displayed, born, founded, or memorialized (museums, towns, mountains, parks, monuments).
- Real US geographic associations — any place a clue could point to.
- Connections to other people/places/events that recur in a treasure-hunt context.

Return: a concise factual findings summary, a geoClues field listing concrete US places associated with the subject (empty if none), an honest huntRelevance assessment (mark speculation clearly; respect the author's hard constraints), and sources (title + url) for what you used. Do not fabricate; if web search is unavailable, say so in findings and return what is known.`
}

function composePrompt(ch, ex, findings) {
  const nav = navFor(ch)
  const pageLabel = ch.num === 0 ? 'Front matter' : ch.num === 24 ? 'Back matter' : 'Chapter ' + ch.num
  return `${BOOK_CONTEXT}

You are the COMPOSE agent. Write ONE self-contained HTML wiki page for ${pageLabel}: "${ch.title}". Use the Write tool to write the file:
  wiki/${ch.href}

Use ONLY the extraction and research provided below — do not invent facts. Cite research sources as real <a href> links.

=== EXTRACTION (JSON) ===
${JSON.stringify(ex)}

=== RESEARCH FINDINGS (JSON array) ===
${JSON.stringify(findings)}

REQUIRED HTML STRUCTURE (clean, valid HTML5; link the shared stylesheet exactly as <link rel="stylesheet" href="wiki.css">):
1. <!doctype html><html lang="en"><head> with <meta charset>, <meta viewport>, <title>${pageLabel}: ${ch.title}</title>, the wiki.css link.
2. <header class="topnav">: a <span class="brand">Lion's Share Wiki</span> then links: Home (index.html), People (people.html), Places (places.html), Treasures (items.html), Themes (themes.html).
3. <div class="wrap"> containing:
   - <h1>${ch.title}</h1>
   - <p class="subtitle">Lesson: ${ch.subtitle}</p>
   - <p class="meta">${pageLabel} · book pages ${ch.start}-${ch.end}</p>
   - <h2>Summary</h2> with the chapter summary (use <p> paragraphs).
   - <h2>The Treasure(s)</h2> describing the featured item(s).
   - <h2>People</h2>, <h2>Places &amp; Geographies</h2> — describe each, folding in research. In Places, surface every concrete US location found.
   - <h2>Themes &amp; the Lesson</h2> — what "${ch.subtitle}" signals.
   - If a poem/epigraph exists: <h2>Poem / Epigraph</h2> with the text inside <div class="poem">.
   - <h2>Research Findings</h2> — one <h3> per researched subject with its findings; under each, if it has sources, an <ul class="sources"> of <li><a href="URL" target="_blank" rel="noopener">title</a></li>.
   - <h2>Treasure-Hunt Signals</h2> — for each plausible "clue by association," a <div class="signal"><span class="lbl">Signal</span> ... </div>. BE HONEST: distinguish solid geographic leads from speculation; respect the author's hard constraints; note when something is a stretch.
   - Then this exact placeholder line on its own: <!-- RELATED: phase-2 will insert cross-links here -->
   - <div class="prevnext"><a href="${nav.prevHref}">&larr; ${nav.prevTitle}</a><a href="${nav.nextHref}">${nav.nextTitle} &rarr;</a></div>
   - <footer>Lion's Share research wiki — auto-generated draft. Not a confirmed solution.</footer>
4. Close the wrap, body, html.

After writing the file, return the structured index data (num, title, slug="${ch.slug}", a one-line oneLine summary, and de-duplicated lists of people / places / items / organizations / events / themes you put on the page, plus topGeoClue = the single strongest US geographic lead from this chapter or "").`
}

function hubIndexPrompt(order, stats) {
  return `${BOOK_CONTEXT}

You are building the HOME PAGE of the wiki. Write the file wiki/index.html (use the Write tool). Clean valid HTML5 linking <link rel="stylesheet" href="wiki.css">.

Include:
- <header class="topnav"> identical to the other pages (brand + Home/People/Places/Treasures/Themes links).
- <div class="wrap">:
  - <h1>Lion's Share Treasure Wiki</h1>
  - <p class="lead"> a short intro: this is a research aid for locating the Lion's Share treasure box from "There's Treasure Inside" by Jon Collins-Black. One page per chapter, each with web-researched subjects and "clues by association." Not a confirmed solution.
  - <h2>The Author's Confirmed Rules</h2> a short <ul>: public land (not private); NOT buried; within ~3 miles of a road; not dangerous; boots-on-the-ground required; one box per US state; clues are literal (no grand cipher).
  - <h2>Browse by</h2> prominent links to people.html, places.html, items.html, themes.html (describe each in a sentence).
  - <h2>Chapters</h2> a <ul class="toc">: for each entry, <li><span class="num">N</span> <a href="HREF">TITLE</a> — <span class="les">Lesson</span><br>one-line summary</li>. Use the data below in order. Front matter and back matter are included (num 0 and 24); label them by title, not number.
  - <footer> note auto-generated.

CHAPTER DATA (in order): ${JSON.stringify(order)}

BUILD STATS (optional to mention): ${JSON.stringify(stats)}`
}

function hubEntityPrompt(hub) {
  return `${BOOK_CONTEXT}

You are building a HUB PAGE that aggregates one entity type across all chapters and links each entity to the chapters where it appears. Write the file wiki/${hub.file} (use the Write tool). Clean valid HTML5 linking <link rel="stylesheet" href="wiki.css">.

Include the standard <header class="topnav"> (brand + Home/People/Places/Treasures/Themes), then <div class="wrap"> with:
  - <h1>${hub.h1}</h1>
  - <p class="lead">${hub.blurb}</p>
  - ${hub.file === 'places.html' ? 'Group the places sensibly (e.g., by US state/region vs. international) using <h2> subheads where helpful, since geography is the most important dimension for this hunt. ' : ''}A list or <table class="grid"> of each entity. For each: the entity name, and links to every chapter it appears in (use the provided href + chapter title). Entities are pre-sorted by how many chapters reference them (most-connected first) — keep that order so the cross-cutting threads are obvious. Highlight any entity appearing in 2+ chapters as a notable thread.
  - <footer> note auto-generated.

ENTITY DATA (name -> chapters), pre-sorted most-connected first:
${JSON.stringify(hub.entries)}`
}

function injectPrompt(p, related, order) {
  return `You are the INTERLINK agent for one finished wiki page. Goal: weave cross-links into wiki/${p.slug}.html so the wiki is navigable.

STEP 1: Read wiki/${p.slug}.html.
STEP 2: Rewrite the WHOLE file with the Write tool, preserving ALL existing content, styling, nav and the wiki.css link, but making these additions:
  (a) Replace the line "<!-- RELATED: phase-2 will insert cross-links here -->" with a <div class="related"> block titled <h2>Related Chapters</h2> containing a <ul> of the related chapters below — each as <a href="HREF">TITLE</a> followed by the shared topics in parentheses. Then a final line: <p><strong>Browse by:</strong> <a href="index.html">Home</a> · <a href="people.html">People</a> · <a href="places.html">Places</a> · <a href="items.html">Treasures</a> · <a href="themes.html">Themes</a></p>. If the placeholder is missing, insert this block just before the <div class="prevnext">.
  (b) Inside the body prose, where the page mentions ANOTHER chapter's title or a clearly shared subject that has its own chapter, wrap the FIRST such mention in an <a href="that-chapter.html">...</a>. Only link confident, real matches; do not over-link (a few per page is plenty) and never break HTML.

Do not change facts. Keep it valid HTML. Return the single word DONE.

RELATED CHAPTERS (pre-computed, most-shared first):
${JSON.stringify(related)}

ALL CHAPTERS (for matching titles -> href):
${JSON.stringify(order)}`
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------
phase('Setup')
await agent(
  `Set up a static HTML wiki. Use the Write tool to create the file wiki/wiki.css with EXACTLY the following content (verbatim, do not alter a single character):\n\n${CSS}\n\nThat is the entire task. Return the single word DONE.`,
  { label: 'setup:wiki.css', phase: 'Setup' }
)

log('Building ' + CHAPTERS.length + ' chapter pages (extract -> research -> compose) ...')

const composed = await pipeline(
  CHAPTERS,
  // Stage 1: extract
  (ch) => agent(extractPrompt(ch), { schema: EXTRACT_SCHEMA, phase: 'Summarize', label: 'extract:' + ch.slug }),
  // Stage 2: research every subject in parallel
  async (ex, ch) => {
    if (!ex || !ex.subjects) throw new Error('extract failed for ' + ch.slug)
    const subs = ex.subjects.slice(0, 10)
    const findings = (
      await parallel(
        subs.map((s) => () =>
          agent(researchPrompt(ch, s), {
            schema: RESEARCH_SCHEMA,
            phase: 'Research',
            label: 'research:' + ch.slug + ':' + s.name.slice(0, 22),
          })
        )
      )
    ).filter(Boolean)
    return { ex, findings }
  },
  // Stage 3: compose the HTML page
  (rr, ch) => agent(composePrompt(ch, rr.ex, rr.findings), { schema: COMPOSE_SCHEMA, phase: 'Compose', label: 'write:' + ch.slug })
)

const pages = composed.filter(Boolean)
log('Composed ' + pages.length + '/' + CHAPTERS.length + ' chapter pages. Building global index ...')

// ---- Build global entity index (plain JS, no agents) ----
const normalize = (s) => String(s || '').toLowerCase().trim().replace(/\s+/g, ' ')
const pageByNum = new Map(pages.map((p) => [p.num, p]))

function collect(field) {
  const m = new Map()
  for (const p of pages) {
    for (const raw of p[field] || []) {
      const k = normalize(raw)
      if (!k) continue
      if (!m.has(k)) m.set(k, { name: raw, chapters: [] })
      const e = m.get(k)
      if (!e.chapters.find((c) => c.num === p.num)) {
        e.chapters.push({ num: p.num, title: p.title, href: p.slug + '.html' })
      }
    }
  }
  return [...m.values()].sort((a, b) => b.chapters.length - a.chapters.length || a.name.localeCompare(b.name))
}

const peopleIdx = collect('people')
const placesIdx = collect('places')
const itemsIdx = collect('items')
const themesIdx = collect('themes')

// Per-chapter normalized entity sets (union of all entity types) for relatedness.
const ALL_FIELDS = ['people', 'places', 'items', 'organizations', 'events', 'themes']
const gdisp = new Map()
const entSet = new Map()
for (const p of pages) {
  const set = new Set()
  for (const f of ALL_FIELDS) {
    for (const raw of p[f] || []) {
      const k = normalize(raw)
      if (!k) continue
      set.add(k)
      if (!gdisp.has(k)) gdisp.set(k, raw)
    }
  }
  entSet.set(p.num, set)
}

function relatedFor(p) {
  const mine = entSet.get(p.num) || new Set()
  const out = []
  for (const q of pages) {
    if (q.num === p.num) continue
    const theirs = entSet.get(q.num) || new Set()
    const shared = []
    for (const k of mine) if (theirs.has(k)) shared.push(gdisp.get(k))
    if (shared.length) out.push({ num: q.num, title: q.title, href: q.slug + '.html', shared })
  }
  return out.sort((a, b) => b.shared.length - a.shared.length).slice(0, 8)
}

const stats = {
  chapterPages: pages.length,
  uniquePeople: peopleIdx.length,
  uniquePlaces: placesIdx.length,
  uniqueItems: itemsIdx.length,
  uniqueThemes: themesIdx.length,
}

// ---- Phase 2a: hub pages ----
phase('Interlink-Hubs')
const HUBS = [
  { file: 'people.html', h1: 'People', blurb: 'Every real person referenced across the chapters, and where they appear. People who recur across chapters may mark a deliberate thread.', entries: peopleIdx },
  { file: 'places.html', h1: 'Places &amp; Geographies', blurb: 'Every real-world place named or associated across the chapters. Geography is the most important dimension for locating the treasure — recurring places are the strongest leads.', entries: placesIdx },
  { file: 'items.html', h1: 'Treasures &amp; Objects', blurb: 'The treasure items and notable objects featured across the chapters, with their chapter pages.', entries: itemsIdx },
  { file: 'themes.html', h1: 'Themes &amp; Lessons', blurb: 'Recurring themes and the per-chapter lessons, and where they surface.', entries: themesIdx },
]

await parallel([
  () => agent(hubIndexPrompt(ORDER.map((o) => ({ ...o, oneLine: (pageByNum.get(o.num) || {}).oneLine || '' })), stats), { phase: 'Interlink-Hubs', label: 'hub:index' }),
  ...HUBS.map((h) => () => agent(hubEntityPrompt(h), { phase: 'Interlink-Hubs', label: 'hub:' + h.file })),
])

// ---- Phase 2b: weave cross-links into each chapter page ----
phase('Interlink-Pages')
await parallel(
  pages.map((p) => () => agent(injectPrompt(p, relatedFor(p), ORDER), { phase: 'Interlink-Pages', label: 'link:' + p.slug }))
)

// ---- Finalize ----
phase('Finalize')
const manifest = {
  pages: pages.map((p) => ({ num: p.num, title: p.title, file: p.slug + '.html', topGeoClue: p.topGeoClue || '' })),
  hubs: ['index.html', 'people.html', 'places.html', 'items.html', 'themes.html'],
  stats,
}
await agent(
  `Write the file wiki/README.md (use the Write tool) documenting this generated wiki for the Lion's Share treasure hunt.

Include: how to open it (open wiki/index.html in a browser), the structure (one HTML page per chapter + 5 hub pages, shared wiki.css), the build stats, and a one-line "topGeoClue" digest table of the strongest geographic lead per chapter (from the manifest). End with a clear caveat that this is a research aid, not a confirmed treasure location. Keep it concise. Return DONE.

MANIFEST: ${JSON.stringify(manifest)}`,
  { phase: 'Finalize', label: 'wiki-readme' }
)

log('Wiki build complete: ' + pages.length + ' chapter pages + ' + manifest.hubs.length + ' hub pages in wiki/.')
return manifest
