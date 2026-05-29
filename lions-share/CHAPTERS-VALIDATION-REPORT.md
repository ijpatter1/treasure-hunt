# Chapters/ Accuracy Validation Report

This report audits the composite `chapters/*.md` files against the page-level source material. Where issues were flagged, the **actual book page images** (`screenshots/page-XXX-XXX.png`) were treated as ground truth — not the derived transcriptions in `pages/metadata/*.json` or `pages/notes/*.md`, which can themselves be wrong. In several cases the page images revealed that a transcription error had been propagated into the composite, and in a few cases the page images vindicated the composite against a faulty transcription.

> **Scope of grading:** Only **factual fidelity to the book** was graded. Interpretations, hypotheses, cross-chapter "pattern" claims, and location theories in the composites were **not** graded as true or false (see closing caveat).

---

## Executive Summary

| Metric | Count |
|--------|-------|
| Composite files checked | 25 |
| Confirmed inaccuracies | 79 |
| Confirmed omissions (lost details) | 13 |

### Chapters ranked worst-to-best by issue count

"Issues" = confirmed inaccuracies + confirmed omissions. Spot-check failures are noted separately within each chapter section and are not double-counted here when they restate a confirmed inaccuracy.

| Rank | Chapter | Composite | Inaccuracies | Omissions | Total Issues |
|------|---------|-----------|:------------:|:---------:|:------------:|
| 1 | 24 — Back Matter | `chapters/back-matter.md` | 8 | 2 | **10** |
| 2 | 0 — Front Matter | `chapters/front-matter.md` | 7 | 2 | **9** |
| 3 | 11 — Treasures From a Famous Shipwreck | `chapters/chapter-11.md` | 4 | 1 | **5** |
| 4 | 2 — The 100 Rings of Tuyet Nguyet | `chapters/chapter-02.md` | 5 | 0 | **5** |
| 5 | 12 — Massive Gold Rush Nugget | `chapters/chapter-12.md` | 5 | 0 | **5** |
| 6 | 7 — Amelia's Autograph | `chapters/chapter-07.md` | 3 | 1 | **4** |
| 7 | 8 — Beauty's Bespoken Treasures | `chapters/chapter-08.md` | 4 | 1 | **5** |
| 8 | 20 — The Six-Figure Birthstone | `chapters/chapter-20.md` | 4 | 0 | **4** |
| 9 | 23 — Sing Your Own Special Song | `chapters/chapter-23.md` | 3 | 0 | **3** |
| 10 | 21 — Antiquities of Alexander | `chapters/chapter-21.md` | 2 | 1 | **3** |
| 11 | 22 — Picasso's Pendant | `chapters/chapter-22.md` | 3 | 0 | **3** |
| 12 | 3 — A Puzzle Box, a Magnifying Glass, & the Mysterious Egg | `chapters/chapter-03.md` | 2 | 0 | **2** |
| 13 | 16 — 1996 Atlanta Olympic Gold Medal | `chapters/chapter-16.md` | 2 | 0 | **2** |
| 14 | 17 — George Washington's Jelly Glass | `chapters/chapter-17.md` | 2 | 0 | **2** |
| 15 | 1 — The 120 Carat Sapphire | `chapters/chapter-01.md` | 0 | 2 | **2** |
| 16 | 5 — Masterworks by Art Smith | `chapters/chapter-05.md` | 1 | 0 | **1** |
| 17 | 4 — The 96 Carat Chivor Emerald | `chapters/chapter-04.md` | 0 | 2 | **2** |
| 18 | 18 — Andrew Carnegie's Emerald | `chapters/chapter-18.md` | 0 | 1 | **1** |
| 19 | 9 — The Golden Chalice | `chapters/chapter-09.md` | 1 | 0 | **1** |
| 20 | 10 — Jackie Onassis' Diamond Sapphire Brooch | `chapters/chapter-10.md` | 1 | 0 | **1** |
| 21 | 15 — 1960 Rome Olympic Gold Medal | `chapters/chapter-15.md` | 1 | 0 | **1** |
| 22 | 19 — Moon Rocks & Meteors | `chapters/chapter-19.md` | 1 | 0 | **1** |
| — | 6 — Rubies to Wear | `chapters/chapter-06.md` | 0 | 0 | **0** (spot-check failure only) |
| — | 13 — Best of Its Class Jordan Rookie Card | `chapters/chapter-13.md` | 1 | 0 | **1** |
| — | 14 — Tiffany's Furnace & Thoreau's Fire | `chapters/chapter-14.md` | 0 | 0 | **0** (spot-check note only) |

---

## Per-Chapter Findings

Only chapters with confirmed issues are detailed below. Chapters with no confirmed inaccuracies or omissions are listed in the **Clean** section at the end.

---

### Chapter 24 — Back Matter
**Composite:** `chapters/back-matter.md`

Broadly faithful on the postscript safety rules, acknowledgement names, and back-cover logo, but it has the most issues of any composite: mislabeled source-page mapping, unsupported biographical claims, split joint quotes, and a misidentified logo. The big win is that the postscript (pp.207-208) is fully legible and confirms the load-bearing search rules.

**Confirmed inaccuracies:**

1. **Claim:** "Some More of Our Treasure Items covers pages 199-202 with 8 additional treasure items."
   **Correct:** The section header is on p.199 and continues through **p.204** (NOT p.202). Pages 203-204 are still treasure items: the Costa Rica Nicoya jade-and-gold amulet necklace (200-600 AD) on p.203, and on p.204 the Michele della Valle citrine-and-diamond necklace plus a 9th-century Viking gold ring. The full count across 199-204 is roughly **11-13 items, not 8**.
   **Page/screenshot:** pp.199-204 — `screenshots/page-199-200.png`, `screenshots/page-201-202.png`, `screenshots/page-203-204.png`

2. **Claim:** Aiden (child) quoted individually: "Your enthusiasm for life lifts me up on wings."
   **Correct:** Page 211 reads as ONE joint passage to both children: *"Thank you, Aiden and Londyn. I love you so much. Your enthusiasm for life lifts me up on wings. It invigorates me. Your glowing faces lit a path for all this to be possible. I look forward to all the treasures we'll discover together."* The composite incorrectly splits a single joint quote into per-child attributions.
   **Page/screenshot:** p.211 — `screenshots/page-211-back.png`

3. **Claim:** Londyn (child) quoted individually: "Your glowing faces lit a path for all this to be possible."
   **Correct:** Part of the same joint passage above, addressed to "Aiden and Londyn" jointly. The composite's per-child split is unsupported.
   **Page/screenshot:** p.211 — `screenshots/page-211-back.png`

4. **Claim:** "Dad is described as a Pastor."
   **Correct:** Page 211 says only: *"Thank you, Mom and Dad for all your love and support throughout my entire life..."* There is no statement that the father is a pastor anywhere in the back matter (199-211). Unsupported fabricated detail.
   **Page/screenshot:** p.211 — `screenshots/page-211-back.png`

5. **Claim:** "Also author of children's book 'Our Unbreakable Thread' (Marble Press)."
   **Correct:** No back-matter page (199-211) mentions this title or publisher. Pages 209-211 contain epigraph quotes and acknowledgements only; there is no author-bio content in this range.
   **Page/screenshot:** verified absent across `screenshots/page-209-210.png`, `screenshots/page-211-back.png`

6. **Claim:** "Back cover shows a red circle with crossed hammer and pickaxe."
   **Correct:** The back cover shows a red distressed/stamp-style circular border containing a **PICKAXE crossed with a SHOVEL/SPADE** (D-handle grip and rounded spade blade unmistakable). The second tool is a shovel, NOT a hammer.
   **Page/screenshot:** p.211 — `screenshots/page-211-back.png`

7. **Claim:** Source mapping calls page-203-204 the "postscript."
   **Correct:** Pages 203-204 are "Some More of Our Treasure Items" (continued) — NOT the postscript. The postscript is on pp.207-208.
   **Page/screenshot:** p.203 — `screenshots/page-203-204.png`

8. **Claim:** Source mapping calls page-207-208 the "author bio."
   **Correct:** Pages 207-208 are the **POSTSCRIPT** (titled "POSTSCRIPT" on p.207), containing the literal-reading directive and all search/safety rules. There is no author bio anywhere in 199-211. The label is internally inconsistent with the composite's own "Postscript: Safety Guidelines" content, which derives from these pages.
   **Page/screenshot:** p.207 — `screenshots/page-207-208.png`

**Confirmed omissions:**

1. **Lost:** The postscript's explicit literal-reading directive.
   **Ground truth (p.207, verbatim):** *"There is no subterfuge in what I am going to say to you now. No double meanings. No misdirection. No innuendos. There is no subtext. No clues. No code. You should take what I say here as literally as you possibly can."* The composite's Safety Guidelines section omits this directive entirely.
   **Page/screenshot:** p.207 — `screenshots/page-207-208.png`

2. **Lost:** The explicit FIVE-box count and the water / no-vessel / no-swift-current / no-ledge / no-cliff rules.
   **Ground truth (p.207, verbatim):** *"I have hidden none of our five treasure boxes in a dangerous place... No box is hidden under any body of water. You do not need to get into a raft, or canoe, or a water vessel of any kind... No box is precariously close to a swift current or a high or dangerous ledge. And you will not need to scale a cliff or rock face to find a box."* Page 208 restates "five treasure boxes." The composite's safety bullets omit the explicit five-box count and these specific rules.
   **Page/screenshot:** p.207 — `screenshots/page-207-208.png`

**Spot-check failure:** Back-cover logo described as "crossed hammer and pickaxe"; the image shows a crossed **pickaxe and shovel/spade**. (Same as inaccuracy #6.)

---

### Chapter 0 — Front Matter
**Composite:** `chapters/front-matter.md`

Mostly faithful on the big confirmed facts (US location, six historical names, no cipher, item-histories-as-clues, the back-cover haiku, the two attributed quotes), but it contains one clear factual error, several rules misattributed to the front matter, and omits the book's Part One / Part Two structure.

**Confirmed inaccuracies:**

1. **Claim:** Each of the four smaller boxes "has ONE dedicated book separate from The Lion's Share Treasure book."
   **Correct (p.10, verbatim):** *"To help you locate these boxes, I wrote four chapters. Each of these four chapters is dedicated to one box and contains the clues and information you will need to find it... You will find these chapters in Part Two of this book."* The boxes each have a dedicated **CHAPTER in Part Two of THIS book** — NOT a separate book. (The "six figures" value is correct.) This is the single clearest factual error in the front matter.
   **Page/screenshot:** p.10 — `screenshots/page-010-011.png`

2. **Claim:** "Clues in ALL 23 chapters — 'almost every chapter includes at least some morsel.'"
   **Correct (p.16, verbatim):** *"...almost every chapter OF THE FIRST TWENTY-THREE includes at least some morsel of information helpful for finding the location of the largest treasure box."* The composite drops the load-bearing scoping phrase "of the first twenty-three," and ignores that p.10 frames it as "almost every chapter in Part One." The book separately states the FOUR Part Two chapters are primarily for the four smaller boxes.
   **Page/screenshot:** p.16 — `screenshots/page-016-017.png`

3. **Claim:** "Treasure Location Confirmed: On public land (not private property)."
   **Correct:** Nothing on pages 1-17 states "public land" or "not private property." Verified by reading pages 8-9, 10-11, 16-17, TOC and cover, plus keyword search of all front-matter metadata (no hits). This fact comes from the Postscript / author's later confirmations — true fact, wrong attribution to the front matter.
   **Page/screenshot:** p.9 — `screenshots/page-008-009.png`

4. **Claim:** "Treasure Location Confirmed: Within 3 miles of a road."
   **Correct:** The "3 miles of a road" detail appears nowhere in pages 1-17 (keyword search for "miles"/"road" returned no hits). Originates from the Postscript / author's stated rules. Misattributed to the front matter.
   **Page/screenshot:** p.9 — `screenshots/page-008-009.png`

5. **Claim:** "Treasure Location Confirmed: Not buried (no digging)."
   **Correct:** Page 10 and the rest of the front matter contain no "not buried"/"no digging" statement (the only "dig" substring is "DIGITAL"). This rule is from the Postscript region, not these pages.
   **Page/screenshot:** p.10 — `screenshots/page-010-011.png`

6. **Claim:** "Treasure Location Confirmed: Not dangerous to access."
   **Correct:** Not stated anywhere in pages 1-17 (keyword search for "danger"/"dangerous" returned no hits). Pages 16-17 discuss "boots on the ground" and Mother Nature but never "not dangerous." From the Postscript / later rules.
   **Page/screenshot:** p.16 — `screenshots/page-016-017.png`

7. **Claim:** Cesare Pavese is an "Italian poet (1908-1950)."
   **Correct:** Page 17 prints the quote *"The only joy in the world is to begin."* attributed only as "—CESARE PAVESE." No biographical descriptor or dates appear in the book. The "Italian poet (1908-1950)" descriptor is externally-added context (externally accurate, but not from the book) and should be marked as such.
   **Page/screenshot:** p.17 — `screenshots/page-016-017.png`

**Confirmed omissions:**

1. **Lost:** The book's explicit Part One vs. Part Two structure.
   **Ground truth (p.10):** the four smaller-box chapters are "in Part Two of this book" and "almost every chapter in Part One of this book offers at least one important detail to help guide you to the location of the largest box." Page 16 reinforces "the four chapters in Part Two." The composite omits this division entirely, which is central to where Lion's Share clues live.
   **Page/screenshot:** p.10 — `screenshots/page-010-011.png`

2. **Lost / conflict:** The book text (p.16) says "the FOUR chapters in Part Two," but the repo TOC note labels Part Two as chapters 15-23 (NINE chapters); the composite reproduces neither.
   **Ground truth:** The printed Table of Contents (`front-03-04`) contains NO "Part One"/"Part Two" section headers — it lists Introduction (9), How To Read This Book (16), Chapters 1-23 sequentially, then Additional Treasure Items (199), Final Poem (205), Postscript (207), Acknowledgments (210). Per the book text, Part Two = the four smaller-box chapters. The composite reproduces neither the four-chapter fact nor the discrepancy.
   **Page/screenshot:** p.3 — `screenshots/front-03-04.png`

**Spot-check failure:** Confirmed each smaller box has ONE dedicated BOOK (composite) vs. ONE dedicated CHAPTER in Part Two (source p.10). The page wording vindicates the correction. (Same as inaccuracy #1.)

---

### Chapter 11 — Treasures From a Famous Shipwreck
**Composite:** `chapters/chapter-11.md`

Largely faithful on narrative and treasure facts, but the Treasure Items table carries multiple value/attribution errors centered on the p.105 gold-bar caption, plus geographic embellishments.

**Confirmed inaccuracies:**

1. **Claim:** La Luz gold bar — "22+ ounces, XXVI marking, $50,000+."
   **Correct (p.105 caption, ground truth):** *"...Its weight EXCEEDS TWENTY-THREE troy ounces... Its estimated value is OVER $90,000."* Three errors: weight is **23+** (not 22+) troy ounces; value is **over $90,000** (not $50,000+); and there is **NO "XXVI"** on the bar — the bars are stamped "1759"/"XX" (top) and "XXXVI" (=36, bottom). The "most beautiful" detail (p.106) is correct.
   **Page/screenshot:** p.105 — `screenshots/page-105-106.png`

2. **Claim:** Eight escudo coin — "value ~$25,000+."
   **Correct (p.106, ground truth):** *"...This coin was given an MS 63 rating. The only other coin with a higher rating (MS 64) recently sold at auction for more than $25,000. Yet that MS 64 coin was not from a shipwreck."* The >$25,000 price belongs to a DIFFERENT, non-shipwreck MS 64 coin, NOT the treasure's MS 63 coin; the book assigns NO dollar value to the treasure coin. The composite also drops "from 1750" from "Only fifteen such coins from 1750 have ever been officially rated." (1750, Lima mint, MS 63 are all correct.)
   **Page/screenshot:** p.106 — `screenshots/page-105-106.png`

3. **Claim:** "Santiago, Chile — machine-minted escudos source."
   **Correct (p.103):** *"...transported from Lima and Santiago. Pedro was so fond of the new machine minted escudos from Santiago..."* The book says only "Santiago"; the word "Chile" does not appear on p.103 or 104. The country attribution is a composite inference.
   **Page/screenshot:** p.103 — `screenshots/page-103-104.png`

4. **Claim:** "Roman numerals XXVI (26) and XIV (14) on gold bar and disk — possible number significance."
   **Correct:** The gold disk (p.107) is correctly XIV (14). But the gold bar (p.105) is **NOT XXVI** — the two faces are "1759"/"XX" (20) and "XXXVI" (36). The interpretive "number significance" note rests on a misread marking.
   **Page/screenshot:** p.105 — `screenshots/page-105-106.png`

**Confirmed omission:**

1. **Lost:** Eight escudo coin NGC slab provenance.
   **Ground truth (p.108 slab):** *"1750L R PERU 8E" / "MS 63" / "Fernandina Collection" / "(27.00g) La Luz" / cert "5965184-003" / "SHIPWRECK CERTIFICATION."* The composite omits collection name, mint/weight/attribution, NGC cert number, and Shipwreck Certification. (Note: the prior metadata transcription "Reaudulfia Collection"/"427368.011" was itself wrong; the omission is real but the correct slab text differs substantially from what earlier notes quoted.)
   **Page/screenshot:** p.108 — `screenshots/page-107-108.png`

**Spot-check failure:** Eight escudo coin value "~$25,000+" misattributed to the treasure's MS 63 coin (same as inaccuracy #2).

---

### Chapter 2 — The 100 Rings of Tuyet Nguyet
**Composite:** `chapters/chapter-02.md`

Substantively faithful on names, dates, item attributes, and major clue phrases, but it presents page-37 reported-speech advice as four standalone direct quotes (two of them clear misquotes) and drops an article in the "golden bridge" quote.

**Confirmed inaccuracies:**

1. **Claim:** Direct instruction: "Don't rush through these pages."
   **Correct (p.37):** *"She'd probably advise to not rush through these pages."* This is reported/conditional speech. The composite's imperative inverts "to not rush" and fabricates an imperative the book never uses.
   **Page/screenshot:** p.37 — `page-036-037.png`

2. **Claim:** Direct instruction: "Get to know these stories."
   **Correct (p.37):** *"She might encourage you to get to know these stories..."* — lowercase, embedded in reported speech. The substance matches, but the composite frames it as a standalone direct quote, which it is not.
   **Page/screenshot:** p.37 — `page-036-037.png`

3. **Claim:** Direct instruction: "Consider their content."
   **Correct (p.37):** *"...to consider their content..."* — embedded mid-sentence in the reported-speech list, not a standalone imperative quote. Same framing issue.
   **Page/screenshot:** p.37 — `page-036-037.png`

4. **Claim:** Direct instruction: "Don't dismiss any details."
   **Correct (p.37):** *"...and to not dismiss any details."* The composite's "Don't dismiss any details" fabricates an imperative; the source uses "to not dismiss."
   **Page/screenshot:** p.37 — `page-036-037.png`

5. **Claim:** Quote: "Golden lions guarded golden bridge."
   **Correct (p.34):** *"Golden lions guarded a golden bridge that stretched across the river to its entrance."* The composite drops the article "a." Minor but real misquote.
   **Page/screenshot:** p.34 — `page-034-035.png`

---

### Chapter 12 — Massive Gold Rush Nugget
**Composite:** `chapters/chapter-12.md`

The narrative gist matches, but several specifics were altered or fabricated, and the treasure sidebar was substantively mis-transcribed and propagated into the composite.

**Confirmed inaccuracies:**

1. **Claim:** Gold Rush bracketed as "(1848-1852)."
   **Correct:** The book never delimits the Rush as 1848-1852. It cites a Jan 1848 discovery and multiple "by 1852" milestones (p.112: "By 1852, over one percent of the entire US population had relocated to California"; p.113: "By 1852, San Francisco's population exceeded 30,000"). The parenthetical is composite-introduced.
   **Page/screenshot:** p.111 — `screenshots/page-111-112.png`

2. **Claim:** Marshall discovered gold "January 24, 1848."
   **Correct (p.111):** *"James Marshall spoke his famous words into the crisp cold air of January."* The book gives only the month "January" — no day. (The location — forty miles east of Sacramento near Sutter's Mill along the American River — is accurate.)
   **Page/screenshot:** p.111 — `screenshots/page-111-112.png`

3. **Claim:** Discovery "nine days before Mexico sold California."
   **Correct (p.111):** *"...just nine days prior to the signing of this California purchase agreement, a collection of gold nuggets had been discovered..."* The nine days references the SIGNING of the purchase agreement, not generically "Mexico sold California." (The $15M price on p.110 is correct.)
   **Page/screenshot:** p.111 — `screenshots/page-111-112.png`

4. **Claim:** Author had to "eat free samples at grocery stores."
   **Correct (p.114):** *"...ones that saw me grab a muffin or two in a grocery store to eat while I milled about pretending to be a customer."* "Free samples" is a paraphrase that changes the specific wording.
   **Page/screenshot:** p.114 — `screenshots/page-113-114.png`

5. **Claim:** Treasure quotes: "No sleeping outside on the dusty ground" and "No survival kits needed" (in quotation marks).
   **Correct (p.114):** *"Our adventure does not require you to sleep outside on the dusty ground, although a camping trip is always a fun idea. You won't need to schedule rations or stock up on survival kits at the army supply store."* These exact quoted strings do not appear in the book — they are paraphrases rendered as verbatim quotes.
   **Page/screenshot:** p.114 — `screenshots/page-113-114.png`

**Spot-check failure (substantive):** Treasure sidebar (p.111) — the composite says the nugget weighs "over four ounces" and was found "near the same farm... verified the 1849 Gold Rush." The image reads: *"...found near the American River, the same river where the discovery of gold set in motion the 1849 California Gold Rush. It weighs OVER TWENTY-ONE OUNCES..."* Two errors propagated from the metadata: weight is **over twenty-one ounces** (not four), and it was found **near the American River** (not "near the same farm"); the verb is **"set in motion,"** not "verified."
**Page/screenshot:** p.111 — `screenshots/page-111-112.png`

---

### Chapter 7 — Amelia's Autograph
**Composite:** `chapters/chapter-07.md`

Highly faithful on names, places, dates, and the treasure confirmation, but quotation marks are wrapped around compressed/paraphrased text, an inferred date is presented as stated, and a pilot/co-pilot distinction is invented.

**Confirmed inaccuracies:**

1. **Claim:** "Only other copies...at Purdue and Harvard Libraries...those are not signed" (in quotation marks).
   **Correct (p.72, verbatim):** *"The only other copies of this photo that I know exist are at the Purdue and Harvard Libraries. However, I've been told those two photos are not signed."* The composite compresses two sentences into one quoted string, drops "of this photo that I know exist" and "However, I've been told those two photos," and misrenders "The only other copies" as "Only other copies."
   **Page/screenshot:** p.72 — `page-072-073.png`

2. **Claim:** Final flight "on May 21, 1937" (in Key Dates table).
   **Correct (p.75, verbatim):** *"Five years and one day later, Amelia Earhart and Fred Noonan lifted off..."* The book NEVER prints "May 21, 1937." The date is a correct arithmetic inference but is presented as if stated in the book. (Fred Noonan and "aircraft never discovered" are verbatim-correct.)
   **Page/screenshot:** p.75 — `page-074-075.png`

3. **Claim:** "From an Airplane" imagery: "Purple hills that hold the lake," "round, yellow eyes of the hamlet."
   **Correct (p.74, verbatim):** *"Even the watchful purple hills / That hold the lake..."* The composite drops "Even the watchful" and collapses two lines into "Purple hills that hold the lake." (The "round, yellow eyes of the hamlet" fragment is accurate.)
   **Page/screenshot:** p.74 — `page-074-075.png`

4. **Claim:** Wilmer Stultz = Pilot; Louis Gordon = Co-pilot of the 1928 Atlantic flight.
   **Correct (p.74, verbatim):** *"...Wilmer Stultz and Louis Gordon had piloted that plane, and Amelia had only sat in the back of the plane, doing nothing."* Both are credited equally with piloting; the book assigns NO pilot vs. co-pilot roles. The Historical Figures table invents the distinction.
   **Page/screenshot:** p.74 — `page-074-075.png`

**Confirmed omission:**

1. **Lost:** The page-73 snow-capped-mountain illustration.
   **Ground truth:** p.73 is a full-page illustration of a twin-engine airplane flying over a jagged, snow-capped mountain range. The composite's Geographic References, Poetry-imagery, and Cross-Chapter tables make no mention of it, despite repo notes flagging mountains as a potential Lion's Share clue.
   **Page/screenshot:** p.73 — `page-072-073.png`

---

### Chapter 8 — Beauty's Bespoken Treasures
**Composite:** `chapters/chapter-08.md`

Highly faithful on narrative and quotes, but the Treasure Items table carries genuine value/material errors, an "exhibited vs. purchased" error, an added death year, and a duplicated word in a quote.

**Confirmed inaccuracies:**

1. **Claim:** "Charles Loloma (1921-1991)."
   **Correct (p.78):** *"In 1921, a baby boy was born into the Badger clan. His name was Charles Loloma."* Birth year 1921 is confirmed; the death year **1991 does NOT appear** anywhere on pp.76-85 — an external fact added to the book sources.
   **Page/screenshot:** p.78 — `screenshots/page-078-079.png`

2. **Claim:** Confirmation-bias quote: "...may begin to see only those things that only confirm..."
   **Correct (p.84):** *"...they may begin to see those things that only confirm what they already believe to be true."* The composite inserts an extra "only" (single "only" in the book).
   **Page/screenshot:** p.84 — `screenshots/page-084-085.png`

3. **Claim:** Ironwood bracelet materials include "fossil."
   **Correct (p.80 sidebar):** *"This bracelet is made of ironwood, turquoise, lapis lazuli, coral, and gold. Its estimated value is over $27,000."* The materials do NOT include "fossil" (fossilized ivory belongs to the separate p.81 Loloma RINGS sidebar). Value ($27,000+) is correct.
   **Page/screenshot:** p.80 — `screenshots/page-080-081.png`

4. **Claim:** Sonwai ring — "$25,000+; materials turquoise, sapphire, coral, lapis, gold; purchased at the Wheelwright Museum of American Indian Art."
   **Correct (p.82 sidebar):** *"...Its stones include sugilite, turquoise, coral, lapis lazuli, and gold. Its estimated value is over $20,000. This purple ring, along with the two Loloma rings in our treasure, was exhibited at the 'Loloma' exhibit at the Wheelwright Museum of Native American Art in Santa Fe."* Four corrections: value is **over $20,000** (not $25,000+); material is **sugilite** (not sapphire); the ring was **exhibited** (not purchased); the museum is "**Native American Art**" (not "American Indian Art").
   **Page/screenshot:** p.82 — `screenshots/page-082-083.png`

**Confirmed omission:**

1. **Lost:** The full Hopi calendar ceremony wheel.
   **Ground truth (p.85):** a full circular calendar split into "Katsina Season" and "Non-Katsina Season" by the June and December solstices, with twelve named months and ceremonies (Powamuya/Bean Dance, Osomuya/Plaza Dances, Talangva/Niman Home Dance, Tala'paamuya/Snake-Flute, Nasanmuya/Basket Dance, Kelmuya/Wuwutsim Tribal Initiation, etc.). The composite reduces this to one row: "Katsina Season / Non-Katsina Season, divided by solstices."
   **Page/screenshot:** p.85 — `screenshots/page-084-085.png`

**Spot-check failure:** Treasure values — ironwood bracelet "over $27,000" is correct; Sonwai ring "over $25,000 purchased at the Wheelwright Museum" is wrong (it is over $20,000 and exhibited, not purchased; stones sugilite not sapphire). (Same as inaccuracy #4.)

---

### Chapter 20 — The Six-Figure Birthstone
**Composite:** `chapters/chapter-20.md`

Largely faithful for treasure-item facts and narrative, but the p.172 sidebar was mis-transcribed and the error propagated into the composite, producing several fabricated specifics.

**Confirmed inaccuracies:**

1. **Claim:** "201 carat smokey quartz, 'Imperial Brilliant' cut by Mark Oros."
   **Correct (p.172 sidebar):** *"(Opposite page) This gemstone is a 200 carat smokey quartz cut in a custom design called 'Beyond Brilliant' by Mark Oros. This stone is true to the name of its cut, as it's arguably the most radiant item in our treasure."* It is **200 carat** (not 201) and the cut is **'Beyond Brilliant'** (not 'Imperial Brilliant'). Mark Oros as the cutter is correct.
   **Page/screenshot:** p.172 — `page-171-172.png`

2. **Claim:** Smokey quartz origin "State of Rio (Brazil) / Rio de Janeiro state, Brazil."
   **Correct:** **No origin location is printed anywhere on the page.** There is no "from the state of Rio de," no "Rio de Janeiro," no "Brazil." The metadata mis-transcribed the radiance clause as a place name; the entire origin claim is non-existent in the text and should be removed.
   **Page/screenshot:** p.172 — `page-171-172.png`

3. **Claim:** "A change in where you stand changes everything" listed as a standalone "Opening quote."
   **Correct (p.172):** This clause is the closing line of the Steve de Shazer epigraph: *"Where you stand determines what you see and what you do not see; it determines also the angle you see it from; a change in where you stand changes everything." —STEVE DE SHAZER.* Presenting the final clause as its own quote misrepresents the source.
   **Page/screenshot:** p.172 — `page-171-172.png`

4. **Claim:** "Local park is in the LA area" (Geographic References; research question "What massive rose gardens exist in the LA area?").
   **Correct (p.178):** *"...I walked in a local park with my wife. We came across a massive rose garden... Several acres of park terrain were painted by spectacular blooming rose petals."* The text names only "a local park" / "a massive rose garden" / "Several acres" — NO city or region. "LA area" is nowhere on the page; it is an unsupported inference.
   **Page/screenshot:** p.178 — `page-177-178.png`

**Spot-check failures:** (1) "201 carat / Imperial Brilliant" — correct is 200 carat / Beyond Brilliant (inaccuracy #1). (2) Smokey quartz origin "from the state of Rio de" — no place name is printed at all (inaccuracy #2).

---

### Chapter 23 — Sing Your Own Special Song
**Composite:** `chapters/chapter-23.md`

Largely faithful with verbatim core quote blocks, but three defects appear in the summary/key-phrase paraphrases.

**Confirmed inaccuracies:**

1. **Claim:** Faience process rendered as "sand + salt + water → shape → fire."
   **Correct (p.197):** *"...Ordinary salt and water are added to make the sand malleable and to give it a form. Once the sand is shaped, a color glaze is added. At first the color is dull. Then the molded and blandly glazed sand is placed into a fire..."* The composite's arrow-sequence omits both the malleability role of salt+water and the entire **color-glaze (dull-at-first) step** before firing.
   **Page/screenshot:** p.197 — `page-197-198.png`

2. **Claim:** Gratitude is "the most powerful ability a treasure hunter can possess."
   **Correct (p.198):** *"To have gratitude for each day of our experience is perhaps the most powerful ability a treasure hunter can possess."* The composite's Chapter Summary and Key Phrases table drop the qualifier **"perhaps."** (The CRITICAL block quotes it correctly; the error is confined to the paraphrases.)
   **Page/screenshot:** p.198 — `page-197-198.png`

3. **Claim:** "Make your own special music" labeled "Kimberly's song."
   **Correct (p.198):** *"Living by these principles are how Kimberly and I strive to make our own special music. And we ask our kids and even our friends to sing along..."* It is the couple's (and family's) shared phrase, NOT "Kimberly's song." The label is unsupported by the page text.
   **Page/screenshot:** p.198 — `page-197-198.png`

---

### Chapter 21 — Antiquities of Alexander
**Composite:** `chapters/chapter-21.md`

Highly faithful on the four treasure items, Alexander's biography, named figures, and the critical treasure-hunting hint (verbatim). Two factual problems and one notable image omission.

**Confirmed inaccuracies:**

1. **Claim:** Key Phrases table renders the phrase as "We are mostly the same."
   **Correct (p.187):** *"We and our enemies, if we have them, are mostly the same. We all bleed dark red, cry salt-filled tears, laugh with heartfelt joy, and have longings we want to fulfill."* The Key Phrases entry is a paraphrase. (The composite's own Chapter Summary quotes it correctly; only the Key Phrases table is wrong.)
   **Page/screenshot:** p.187 — `page-187-188.png`

2. **Claim:** Cross-chapter note: "Four antiquities — most impressive items per author."
   **Correct (p.181):** *"I was able to acquire four such items of gold from ancient Greece for our treasure..."* The book confirms FOUR gold antiquities but contains NO language calling them the author's "most impressive items." The qualifier is an unsupported embellishment.
   **Page/screenshot:** p.181 — `page-181-182.png`

**Confirmed omission:**

1. **Lost:** The p.188 aerial heart-shape photograph and chapter-closing line.
   **Ground truth (p.188):** a large aerial/overhead photograph of a crowd arranged to form a heart shape, plus the closing line *"Our next chapter is a love story."* Both are absent from the composite; they foreshadow Chapter 22 (Picasso's Pendant, "A Love Story") and reinforce the chapter's unity/love theme.
   **Page/screenshot:** p.188 — `page-187-188.png`

---

### Chapter 22 — Picasso's Pendant
**Composite:** `chapters/chapter-22.md`

Accurate on core facts but renders three clue phrases as inexact quotes. Two more consequential errors surfaced via spot-check.

**Confirmed inaccuracies:**

1. **Claim:** Jacqueline was "wife, lover, muse, manager, accountant, caretaker, agent, and best friend" (as a direct quote).
   **Correct (p.193):** *"Jacqueline was his wife, his lover, his muse, his manager, his accountant, his caretaker, his agent, and his best friend."* The composite drops the repeated "his" before each noun while wrapping it in quotation marks — inexact as a verbatim quote.
   **Page/screenshot:** p.193 — `page-193-194.png`

2. **Claim:** "Taking first step out your door might be bravest action" (as a direct quote).
   **Correct (p.193):** *"...taking the first step out your door might be the bravest action required of you here."* The composite omits both definite articles and truncates the sentence.
   **Page/screenshot:** p.193 — `page-193-194.png`

3. **Claim:** "Persistence and bravery" listed as a quoted phrase.
   **Correct (p.193):** *"Picasso was persistent and brave. These are not bad traits to have when hunting for a treasure."* The quoted noun phrase is fabricated; the source uses the adjectives "persistent and brave."
   **Page/screenshot:** p.193 — `page-193-194.png`

**Spot-check failures (substantive):**
- Pendant mintage — composite says "Only 39 made." Correct (p.190 sidebar): *"Only thirty-two such pendants were ever created, and only twenty were made available to the public. The pendant is made of 23-karat gold."* The figure 39 appears nowhere; mintage is **32**. ("20 to public" and "23-karat" are correct; note p.193 separately states 24 different pendant *designs* were produced.)
- Author met Kimberly — composite says "2003." Correct (p.194): *"Kimberly and I met in 2013."* The metadata transcription contained the 2003 error and the composite inherited it.
**Page/screenshots:** pp.190, 194 — `page-189-190.png`, `page-193-194.png`

---

### Chapter 3 — A Puzzle Box, a Magnifying Glass, & the Mysterious Egg
**Composite:** `chapters/chapter-03.md`

Largely faithful for names, places, quotes, and the box facts, but a transcription defect in the page metadata was partially inherited.

**Confirmed inaccuracies:**

1. **Claim:** The Japanese puzzle box (Himitsu-Bako) from Hakone is a treasure item.
   **Correct:** The photo caption on p.38 reads *"(Opposite Page) A traditional Japanese puzzle box (not in our treasure)."* It is explicitly **NOT in the treasure** — an illustrative example. The metadata mis-transcribed the caption as "(just in our Treasure)" and the composite propagated it. The chapter's only actual treasure item is the gold & jade magnifying glass (the Lion's Share box being the container).
   **Page/screenshot:** p.38 — `page-038-039.png`

2. **Claim:** Gold & jade magnifying glass, "~1900, valued $25,000+."
   **Correct (p.42 sidebar):** *"A gold and jade Faberge magnifying glass made around 1890 valued at over $23,000."* Material (gold and jade), maker (Michael Perkhin), and Faberge association are correct, but the date is **around 1890** (not ~1900) and the value is **over $23,000** (not $25,000+). The composite matched the erroneous metadata sidebar, not the image.
   **Page/screenshot:** p.42 — `page-042-043.png`

**Spot-check (vindicates correction):** Magnifying-glass material — the image supports "gold and jade" (p.42 sidebar and p.43 body: "made from gold and jade by Michael Perkhin himself"). The metadata's "gold and 1-karat" is a transcription error. **Note:** the composite correctly listed the Faberge egg as NOT in the treasure — here the metadata sidebar ("just in our Treasure", in_treasure=true) was the wrong source, and the composite was right.
**Page/screenshot:** p.42 — `page-042-043.png`

---

### Chapter 16 — 1996 Atlanta Olympic Gold Medal
**Composite:** `chapters/chapter-16.md`

Largely accurate, but two paraphrase-driven conflations are confirmed inaccuracies.

**Confirmed inaccuracies:**

1. **Claim:** Team lodged at a "cockroach-filled" two-star motel in Tallahassee, Florida.
   **Correct:** Two distinct motels. p.144: *"Accommodations were made at a cheap two-star motel in Tallahassee, Florida"* (pre-games, NOT described as cockroach-filled). p.146 (after the Mexico win): *"They finally located a rundown motel over seventy-five miles away... For the next three nights, the Nigerians slept in cockroach-filled rooms..."* The composite wrongly attaches "cockroach-filled" to the Tallahassee motel. (The Bonfrere/NFA non-payment sub-claim is accurate.)
   **Page/screenshot:** p.144 — `page-143-144.png`

2. **Claim:** Beat Japan "2-0."
   **Correct (p.145):** *"...victory over Japan a few days later. With the game scoreless, Nigeria scored two goals in the final eight minutes of the match."* The book NEVER states a "2-0" final for Japan. The only "2-0" on these pages is the Mexico result (p.146: "Nigeria went on to upset Mexico 2-0"). The composite overstates by presenting a definite Japan score.
   **Page/screenshot:** p.145 — `page-145-146.png`

---

### Chapter 17 — George Washington's Jelly Glass
**Composite:** `chapters/chapter-17.md`

Largely faithful, but two over-specified historical claims were introduced by the composite.

**Confirmed inaccuracies:**

1. **Claim:** The cherry-tree myth was "invented by Mason Locke Weems in 1799."
   **Correct (p.154):** *"Mason Locke Weems, who wrote his first George Washington biography a year after Washington died, invented the story of the cherry tree to sell more books. In fact, Weems didn't even come up with this tall tale till his book's fifth edition of printing..."* The book gives NO year "1799" — only "a year after Washington died" and "fifth edition." The "1799" figure is a fabrication (it appears only in the composite, nowhere in `pages/`).
   **Page/screenshot:** p.154 — `screenshots/page-153-154.png`

2. **Claim:** The Delaware crossing "occurred on Christmas night."
   **Correct (p.155):** The book never uses the word "Christmas." It says the men crossed *"In the dead of night"* and references *"that freezing cold night."* The "Christmas night" detail exists only in the repo's analysis layers (notes + metadata key_elements), not the book's raw text. The composite imported the inference as if it were book fact.
   **Page/screenshot:** p.155 — `screenshots/page-155-156.png`

---

### Chapter 5 — Masterworks by Art Smith
**Composite:** `chapters/chapter-05.md`

Largely faithful and well-sourced; the main blemish is one materially altered "direct" quote.

**Confirmed inaccuracy:**

1. **Claim:** Quote: "A piece of jewelry is...not complete until you relate it to the body." —Art Smith
   **Correct (p.60):** *"A piece of jewelry is in a sense an object that is not complete . . . until you relate it to the body. Like line, form and color, the body is a material to work with. It is one of the basic inspirations in creating form." —ART SMITH.* The composite drops "in a sense an object that," relocates the ellipsis, and omits the final two sentences, presenting a condensed paraphrase as a verbatim quote.
   **Page/screenshot:** p.60 — `page-060-061.png`

**Spot-check note (item count):** The p.58 sidebar confirms FOUR Art Smith pieces total, but only three are actually pictured/captioned across these spreads (brass cuff bracelet p.56; a single copper/brass brooch p.58; free-form sterling silver ring p.62). The composite's treasure table wrongly splits the single p.58 brooch into two separate brooches to reach four, and lists the cuff as "bronze/brass" whereas the book says "brass."
**Page/screenshot:** p.58 — `page-058-059.png`

---

### Chapter 4 — The 96 Carat Chivor Emerald
**Composite:** `chapters/chapter-04.md`

Highly faithful — every direct quote checks out verbatim and the p.51 sidebar treasure confirmation is correctly cited. No confirmed inaccuracies; two genuine omissions.

**Confirmed omissions:**

1. **Lost:** The explicit "come find it" parallel.
   **Ground truth (p.55):** *"Now, in a way similar to how the Chivor mine awaited Restrepo, our ninety-six carat Chivor emerald waits patiently for you to come find it. If Restrepo were alive right now, I imagine he might find this fact extremely amusing."* A direct author-to-reader treasure-hunt parallel, never quoted.
   **Page/screenshot:** p.55 — `screenshots/page-054-055.png`

2. **Lost:** The p.49 image caption.
   **Ground truth (p.49, red text):** *"Here Rob Lavinsky holds a gold specimen called \"The Flame\" from the Red Ridge Mine."* The composite omits this caption entirely. (Note: the specimen is "gold," not "giant"; the mine is "Red Ridge," confirming prior "The Picasso"/"Santa Mina Mine" transcriptions were errors.)
   **Page/screenshot:** p.49 — `screenshots/page-048-049.png`

---

### Chapter 1 — The 120 Carat Sapphire
**Composite:** `chapters/chapter-01.md`

Highly faithful — every checkable fact, number, place, and verbatim quote is supported, with no contradictions. Two omissions of detail.

**Confirmed omissions:**

1. **Lost:** The explicit in-treasure confirmation sentences.
   **Ground truth:** p.19 sidebar — *"This 120-carat raw sapphire is a part of our treasure."* p.23 — *"The sapphire pictured on the next page is the same as the one featured at the beginning of this chapter. Once owned by Mike Scott, it now is in our treasure."* The composite implies provenance but never quotes these explicit confirmations.
   **Page/screenshot:** p.19 — `screenshots/page-018-019.png`

2. **Lost:** Apple's growth metrics under Scott.
   **Ground truth (p.22):** *"For the next four years, Apple's size doubled every three months."* and *"...Apple released the Apple II and the Apple III, as well as the first 5 1/2\" floppy disk. The Apple II went on to sell over six million units, and Apple became the third largest manufacturer of home computers. In 1980, Apple went public."* (Note: the book itself literally prints "5 1/2" floppy disk" — the metadata transcription is faithful; the "5 1/4-inch" theory is a book error, not a transcription error.)
   **Page/screenshot:** p.22 — `screenshots/page-022-023.png`

---

### Chapter 18 — Andrew Carnegie's Emerald
**Composite:** `chapters/chapter-18.md`

Numeric and quote claims are solid, but the single highest-relevance geographic clue is materially wrong.

**Confirmed omission:**

1. **Lost (low relevance):** Carnegie's telegraph/salary detail.
   **Ground truth (p.162):** *"Carnegie was so bright that he learned to memorize the sounds of the telegraph so he wouldn't have to write them down."* and *"Now that Carnegie had a much more substantial salary of $35/week, he took his money and began investing in companies he understood and believed in."*
   **Page/screenshot:** p.162 — `screenshots/page-161-162.png`

**Spot-check failure (high severity):** The composite repeatedly states the parents' church is in "Huntersville, NC" (rated HIGH relevance, at lines 22, 43, 55, 91, 99, 108). Page 161 reads: *"...my parents helped start and lead a new church in STATESVILLE, NC..."* The book says **Statesville, NC**, not Huntersville — the composite is wrong on its single load-bearing geographic clue. (An additional unflagged discrepancy: the child-labor mill was "twelve hours a day" per p.162, not the composite's "16 hours/day.")
**Page/screenshot:** p.161 — `screenshots/page-161-162.png`

> **Note:** Because this church-location error surfaced as a spot-check failure rather than a flagged inaccuracy, it is counted under omissions in the ranking table, but it is the most consequential single defect in this chapter and should be treated as a high-priority fix.

---

### Chapter 9 — The Golden Chalice
**Composite:** `chapters/chapter-09.md`

High fidelity overall — all direct quotes (both epigraphs, the five advice lines) match verbatim. One inference stated as fact.

**Confirmed inaccuracy:**

1. **Claim:** "Father | Pastor" (stated as fact in the Author Personal Details table).
   **Correct:** On pp.92-93 the author refers to him only as "my father" / "my dad." The text shows him delivering the sermon, leading prayer, and having "his congregation" (e.g., p.92: *"...a short sermon from my father"*; p.93: *"My father looked out at his congregation..."*), but the word "pastor" is never used. "Pastor" is a strongly-supported inference, not a quoted fact. (Note: the book DOES explicitly state the denomination is "Baptist" on p.92 — *"dry somber Baptist hymnals"* — which the composite treats as merely implied.)
   **Page/screenshot:** p.92 — `page-091-092.png`

---

### Chapter 10 — Jackie Onassis' Diamond Sapphire Brooch
**Composite:** `chapters/chapter-10.md`

Highly faithful — all four advice quotes are verbatim, and biographical facts match. One imported descriptor is unsupported for this chapter.

**Confirmed inaccuracy:**

1. **Claim:** Father described as "Supportive pastor, taught resilience."
   **Correct:** Within chapter 10 (pp.95-96), the father is described only as supportive and teaching resilience (*"My dad knelt down beside me... 'Jon, you are hurting now...'"* and *"my dad was teaching me about resilience"*). The pages NEVER call him a pastor; that descriptor is carried over from other chapters. Correct to "Supportive father, taught resilience" for this chapter.
   **Page/screenshot:** p.96 — `screenshots/page-095-096.png`

---

### Chapter 15 — 1960 Rome Olympic Gold Medal
**Composite:** `chapters/chapter-15.md`

Highly faithful — all named people, places, dates, the treasure-confirmation sidebar, and the three load-bearing quotes match verbatim. One fabricated date.

**Confirmed inaccuracy:**

1. **Claim:** Timeline: "~1958 Daughter Yolanda born."
   **Correct:** The book gives NO birth year for Yolanda anywhere in the chapter. p.137 states only *"He informed her she was pregnant..."*; p.139 names her *"...let her sister Yvonne help care for Yolanda"*; p.140 references "Yolanda's father, Robert." No "~1958" or any birth year appears. It should be removed or clearly marked as inferred (listing it alongside hard-dated rows implies book provenance it does not have).
   **Page/screenshot:** p.137 — `screenshots/page-137-138.png`

---

### Chapter 19 — Moon Rocks & Meteors
**Composite:** `chapters/chapter-19.md`

Highly faithful — all treasure items, dates, places, and direct quotes match verbatim. One spelling fidelity discrepancy.

**Confirmed inaccuracy:**

1. **Claim:** Opening quote attributed to "Arthur C. Clarke" (with final "e").
   **Correct:** The book prints the attribution as "—ARTHUR C. CLARK" (no final "e"). Full quote (p.166): *"If an elderly but distinguished scientist says that something is possible he is almost certainly right, but if he says that it is impossible he is very probably wrong. —ARTHUR C. CLARK."* The real author is Arthur C. Clarke, so this is almost certainly a misprint in the book itself; but for fidelity to the source, the composite does not match the printed page.
   **Page/screenshot:** p.166 — `screenshots/page-165-166.png`

**Spot-check note:** The p.168 Aguas Zarcas sidebar substantively matches, but the spot-check phrasing erroneously inserted the word "with" — the book reads *"foundational amino acids billions of years old that were the precursors of life on our planet"* (no "with").
**Page/screenshot:** p.168 — `screenshots/page-167-168.png`

---

### Chapter 13 — Best of Its Class Jordan Rookie Card
**Composite:** `chapters/chapter-13.md`

Highly faithful overall — names, numbers, places, and the five advice quotes match verbatim. One compressed misquote presented as verbatim.

**Confirmed inaccuracy:**

1. **Claim:** Brent Huigens (PWCC) quote: "arguably the finest PSA 9 we've brokered...shows better than most PSA 10s" (in quotation marks).
   **Correct (p.118):** *"Here is arguably the finest PSA 9 Fleer Michael Jordan rookie card we've brokered in our long tenure; ... In truth, this card shows better than most PSA 10s we've seen, which is why we've awarded it our 'Superior' certification..."* The composite drops "Fleer Michael Jordan rookie card," "in our long tenure," "In truth, this card," and "we've seen." The underlying facts (PWCC = largest sports card broker; owner Brent Huigens; "Superior" certification; better than most PSA 10s) are correct.
   **Page/screenshot:** p.118 — `screenshots/page-117-118.png`

**Spot-check note (biographical anchor):** p.117 — "I grew up in North Carolina" matches, but the composite mis-states the second part. The book says *"I watched my first games with my mom and dad, around the age of six. When I was NINE, Michael Jordan was a freshman on the North Carolina basketball team."* Jordan's freshman year is tied to when the author was nine, not six.
**Page/screenshot:** p.117 — `screenshots/page-117-118.png`

---

## Clean Chapters (no confirmed inaccuracies or omissions)

The following composites had no confirmed factual inaccuracies and no confirmed omissions. Where applicable, minor spot-check notes are recorded in their analysis but did not rise to confirmed defects:

- **Chapter 6 — Rubies to Wear** (`chapters/chapter-06.md`). Highly faithful; the two load-bearing narrative quotes and the "peering behind a rock" hint are verbatim. One spot-check value error: the wing earrings are listed at "$26,000+", but the p.67 sidebar reads **"above $20,000"** (`screenshots/page-066-067.png`). The ruby pendant value ("over $45,000") is correct.
- **Chapter 14 — Tiffany's Furnace & Thoreau's Fire** (`chapters/chapter-14.md`). All three flagged clue blocks are verbatim-accurate. One minor spot-check nuance: the vase caption initials are rendered "(LCT)" carved into the base (p.125), whereas the composite writes "LC/T" and adds "iridescent enamel on copper" (body text, not caption) — not a clue-bearing error (`page-125-126.png`).

---

## Not Separately Validated

- **`chapters/joys-serenade.md`** — Its content falls within the front-matter / back-matter poem pages and was not graded as a standalone per-page composite in this audit.
- **`chapters/treasure-items-additional.md`** — This composite spans the whole book (treasure items appearing across many chapters and the back matter) and was not graded on a per-page basis here.

---

## Recommended Fixes (highest severity first)

1. **Chapter 18 — fix "Huntersville, NC" → "Statesville, NC"** (p.161). This is the chapter's single load-bearing geographic clue and is wrong in six places; correcting it directly affects search interpretation. Also correct the child-labor mill hours to "twelve hours a day" (p.162).
2. **Chapter 22 — fix pendant mintage "39" → "32" and "met Kimberly 2003" → "2013"** (pp.190, 194). Both are hard factual errors, the latter inherited from a bad transcription.
3. **Chapter 12 — fix the treasure sidebar: nugget weight "over four ounces" → "over twenty-one ounces," and "near the same farm" → "near the American River"** (p.111). Substantive item error propagated from metadata.
4. **Chapter 11 — fix the gold-bar row: weight 22+ → 23+ troy oz; value $50,000+ → over $90,000; remove the "XXVI" marking (bars read XX and XXXVI); and stop attributing the >$25,000 MS 64 price to the treasure's MS 63 coin** (pp.105-106). Correct the "number significance" interpretation that rests on the misread XXVI.
5. **Chapter 8 — fix the Sonwai ring (value over $20,000 not $25,000+; "sugilite" not "sapphire"; "exhibited" not "purchased"; "Native American Art") and remove "fossil" from the ironwood bracelet; remove the unsourced death year "1991" for Loloma; remove the duplicated "only" in the confirmation-bias quote** (pp.78, 80, 82, 84).
6. **Chapter 20 — remove the fabricated origin "Rio de Janeiro/Brazil" entirely (no place is printed), fix "201 carat / Imperial Brilliant" → "200 carat / Beyond Brilliant," correct "LA area local park" → "a local park (location unnamed)," and re-attribute the "change in where you stand" clause to the de Shazer epigraph** (pp.172, 178).
7. **Front Matter — correct "dedicated book separate from" → "dedicated CHAPTER in Part Two"; remove the four "Treasure Location Confirmed" rules (they are Postscript content, not front matter); restore "of the first twenty-three" and add the Part One / Part Two structure; mark the Pavese descriptor as added context** (pp.10, 16, 17).
8. **Back Matter — correct the source-page mapping (203-204 = treasure items; 207-208 = Postscript), un-split the joint Aiden/Londyn acknowledgement, remove the unsupported "Dad = Pastor" and "Our Unbreakable Thread / Marble Press" claims, fix the back-cover logo to "crossed pickaxe and shovel," and add the postscript's literal-reading directive and five-box/water/ledge/cliff rules** (pp.199-211).
9. **Chapters 2, 7, 12, 13, 22, 23 — de-quote paraphrases.** Several composites wrap compressed or reported-speech text in quotation marks (Tuyet Nguyet's p.37 advice, the Amelia provenance/poem lines, the gold-rush "no survival kits" lines, the Huigens PWCC quote, the Jacqueline list and "first step"/"persistence and bravery" phrases, the gratitude/"perhaps" line). Either restore exact wording or drop the quotation marks.
10. **Quote-fidelity touch-ups:** Chapter 5 (restore the full Art Smith jewelry-philosophy quote), Chapter 21 (Key Phrases "We are mostly the same" → "We and our enemies, if we have them, are mostly the same"), Chapter 19 (note the printed "CLARK" spelling), Chapter 7 (mark "May 21, 1937" as an inference), Chapter 15 (remove/mark the "~1958" Yolanda birth year), Chapters 9 & 10 (mark "pastor" as an inference; capture the explicitly stated "Baptist" denomination in Ch.9).
11. **Restore confirmed omissions:** Ch.1 in-treasure sentences + Apple metrics; Ch.4 "come find it" line + p.49 caption; Ch.7 p.73 mountain illustration; Ch.8 full Hopi calendar wheel; Ch.11 NGC slab provenance; Ch.21 p.188 heart-shape photo + "Our next chapter is a love story."

---

## Closing Caveat

This audit graded **only factual fidelity to the book** — whether each composite's claims about names, dates, quotes, values, materials, page attributions, and printed text match the source pages (with the page images as ground truth for flagged items). The composites also contain **interpretations, hypotheses, cross-chapter "pattern" claims, and location theories** (e.g., NC-land inferences, "LA area" geography, significance ratings). Those were **NOT graded as true or false** — they may be sound or unsound, but they are outside the scope of this factual-fidelity review. Where such interpretive material was stated *as if it were book fact* (e.g., "Christmas night," "1799," "pastor," "Rio de Janeiro"), it was flagged as a factual inaccuracy; where it was clearly labeled speculation, it was left alone.
