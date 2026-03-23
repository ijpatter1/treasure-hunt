NOTE: This directive supersedes the workflow in claude.md and any /methodologies/ files for this task. Do not read existing hypotheses/ folders or summary.md analysis until Phase 5. You may use the repo structure (creating files in research/, etc.) but follow the phases here, not the methodology docs. Work on a dedicated branch (e.g., fresh-analysis) — commit frequently and push regularly. Do not merge to main without review.

**PRIME DIRECTIVE:** Do not stop until you have a hypothesis you are very confident in and can back up with facts from the book. Confidence means: multiple independent clue threads converge on the same location, the location satisfies all postscript constraints, and you cannot find strong counter-evidence.

**SECONDARY PRIME DIRECTIVE:** Do not read, reference, or search for any existing online analyses, Reddit threads, YouTube videos, forum posts, or community theories about this treasure hunt. Every conclusion must be derived from primary source material only — the book text, the poems, author statements, and your own independent research. If you encounter prior hypothesis folders in the repo, do not read them until your own analysis is complete.

---

**PHASE 1: EXTRACT RAW CLUE INVENTORY (No interpretation yet)**

Go through every chapter's metadata and notes files in `lions-share/pages/metadata/` and `lions-share/pages/notes/`. For each chapter (1-23 plus front matter, back matter, poems, and postscript), extract into a single master document:

1. Every geographic location mentioned (US locations are highest priority)
2. Every piece of direct advice to treasure hunters (quotes where the author addresses the reader about finding the treasure)
3. Every physical landscape description that could describe a real place (trees, rocks, water, flowers, elevation, views)
4. Every metaphor or phrase that feels deliberately placed — trust the "Spidey sense" the author describes
5. Every item history detail the author flags as clue-relevant (he explicitly says item histories contain clues)
6. Every quote attribution (the people quoted may themselves be clues — research where they're from, what they're associated with)

Do NOT interpret anything yet. Just extract and organize.

---

**PHASE 2: ANALYZE THE TWO POEMS INDEPENDENTLY**

The book contains two poems that are almost certainly clue-dense:

**Poem A — Back Cover:**
"Be solid, have grit; / sparkle even as you pine. / Here lies a joy divined"

**Poem B — Joy's Serenade (pages 205-206):**
The full seven-stanza poem. Every line should be treated as potentially containing a clue.

For each poem:
- Analyze every word for double meanings, geographic references, proper nouns hidden in wordplay
- Look for acrostics (first letters of lines, first letters of stanzas, first words)
- Count syllables — is the back cover poem a haiku (5-7-7)? Joy's Serenade mentions "the haiku curls a little further on" — is there a haiku embedded?
- Map specific nouns: "pike," "oaks," "dancers," "rock," "water," "X," "gold circles," "starlight," "flame"
- Research whether these nouns correspond to real place names, trail names, park features, or landmarks
- The phrase "This is no imaginary wonderland" is a direct statement that the poem describes a real place

---

**PHASE 3: BUILD THE AUTHOR GEOGRAPHIC PROFILE**

From the book text, construct a precise profile of everywhere the author has lived and has connections to:

- Grew up near Hiddenite, NC (emerald mine "some miles up the road")
- Parents' church in Huntersville, NC
- Father built log home on 20 acres of woodland (gifted when author was 3)
- Family near Bakersville, NC (40 mi NE of Asheville — Seth Gould's location)
- Attended UNC (Daily Tar Heel reference, Tar Heels fandom)
- Lived in California 20+ years (Mount Wilson Observatory "not far from my home, just to the northeast" — places him in LA basin)
- Visited Japan (Tokyo, Hakone), hiked Andes, traveled extensively
- Wife Kimberly, children Aiden and Londyn, married ~2024
- Born January (garnet birthstone), age ~6 when Jordan was UNC freshman (1981-82) → born ~1975-76

The author says he "spread out" the five boxes hoping at least one would be near the reader. This suggests geographic diversity across the US. But the Lion's Share is ONE box — focus on where the author would choose to hide his most important, most personal treasure.

---

**PHASE 4: REVIEW "OUR UNBREAKABLE THREAD" (Light pass only)**

The author explicitly states on page 77: "I decided to leave an extra clue or two within my children's book about the location of our treasure." Screenshots and metadata for this book are already in the repo at `/lions-share/unbreakable-thread/`. 

However, this is an illustrated children's picture book. Do NOT spend significant time here. Do a single light pass:
- Scan the images and text for any geographic locations depicted (landscapes, landmarks, settings)
- Note any visual elements that could be location clues (specific trees, rock formations, water features, animals, flowers)
- Flag anything that echoes or reinforces clues from the main book (especially Joy's Serenade imagery)
- Move on quickly. The author says "a clue or two" — this is supplementary, not primary. The main book is where the real work is.

---

**PHASE 5: CROSS-REFERENCE AND CONVERGE**

Now interpret. Look for convergence across independent clue streams:

1. Do Joy's Serenade geographic indicators point to the same area as chapter clue clusters?
2. Does the author's personal geography (NC roots, CA residence, family connections) align with poem indicators?
3. Do the chapter subtitles form any pattern when read together or mapped?
4. Do the quote attributions cluster geographically? (Many chapters open with two quotes — research where each quoted person is from or associated with)
5. Do the treasure item histories point toward specific US regions?
6. Does the back cover poem's "pine" reference align with the flora at candidate locations?
7. Do the "flowers along your way" (blue and pink irises, page 127) match the flora of candidate locations?
8. Does "shady oaks" match the tree species at candidate locations?
9. Does the "pike" reference resolve to a geographic feature near the candidate location?
10. Is there a "rock" formation or feature at the candidate location where someone could "sit upon" it?

---

**PHASE 6: VALIDATE AGAINST HARD CONSTRAINTS**

Any candidate location MUST satisfy ALL of these (from the postscript, to be taken literally):
- Within the United States
- On public land (not private property)
- Within 3 miles of a road
- Not buried underground
- Not under water
- Not on a dangerous ledge or cliff
- Not requiring cliff scaling or water vessel
- Accessible — "well within your ability to safely retrieve"
- Nature setting — "sights, smells, and sounds of nature"
- Can be searched as a "leisurely afternoon outing" with a "picnic"
- Snow would make it impossible to find (ground-level concealment)

---

**PHASE 7: WEB RESEARCH ON CANDIDATE LOCATIONS**

Once you have 1-3 candidate locations, use web search to:
- Verify they are public land accessible within 3 miles of a road
- Check for oak trees, water features, rock formations
- Look for trail names or features that match poem clues
- Check for "dancer" references (place names, rock formations, cultural sites)
- Verify the terrain matches the "not dangerous" constraint
- Look at satellite/trail map data if available
- Check if irises or similar flowers grow in the area

---

**OPERATING RULES:**

- Commit your work to the repo frequently with clear commit messages
- Work in `lions-share/research/` for general findings, creating new markdown files as needed
- Do not modify existing files in `lions-share/pages/` — those are source material
- Use web search aggressively for geographic research, flora identification, trail data, and place name research
- When you hit a dead end, document it and try a different angle — the author says "failure winds up being part of the process"
- Do not settle for a hypothesis just because it's plausible. Push until multiple independent evidence streams converge
- If two hypotheses seem equally strong, document both with evidence and counter-evidence, then keep digging until one pulls ahead
- The author says "no complex cipher or grand secret code" — if your theory requires elaborate decoding, you're probably wrong. The clues are "subtly placed" but ultimately point to a real, specific place

Start with Phase 1. Go.