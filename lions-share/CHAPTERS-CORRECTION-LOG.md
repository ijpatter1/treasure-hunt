# Chapters/ Correction Log

This applied the high-confidence factual fixes + de-quoting + omission restoration from CHAPTERS-VALIDATION-REPORT.md, leaving interpretations and book-misprint nuances untouched. Files were edited in place (review with `git diff chapters/`).

## Totals

- Composites touched: **25**
- Total edits applied: **110**
- Flagged by the independent verifier: **0**

## Summary

| Chapter | Composite | Edits applied | Verify verdict |
|---------|-----------|--------------:|----------------|
| Front Matter | chapters/front-matter.md | 9 | all-good |
| 1 - The 120 Carat Sapphire | chapters/chapter-01.md | 2 | all-good |
| 2 - The 100 Rings of Tuyet Nguyet | chapters/chapter-02.md | 5 | all-good |
| 3 - A Puzzle Box, a Magnifying Glass, & the Mysterious Egg | chapters/chapter-03.md | 2 | all-good |
| 4 - The 96 Carat Chivor Emerald | chapters/chapter-04.md | 2 | all-good |
| 5 - Masterworks by Art Smith | chapters/chapter-05.md | 5 | all-good |
| 6 - Rubies to Wear | chapters/chapter-06.md | 1 | all-good |
| 7 - Amelia's Autograph | chapters/chapter-07.md | 6 | all-good |
| 8 - Beauty's Bespoken Treasures | chapters/chapter-08.md | 7 | all-good |
| 9 - The Golden Chalice | chapters/chapter-09.md | 3 | all-good |
| 10 - Jackie Onassis' Diamond Sapphire Brooch | chapters/chapter-10.md | 1 | all-good |
| 11 - Treasures From a Famous Shipwreck | chapters/chapter-11.md | 6 | all-good |
| 12 - Massive Gold Rush Nugget | chapters/chapter-12.md | 7 | all-good |
| 13 - Best of Its Class Jordan Rookie Card | chapters/chapter-13.md | 4 | all-good |
| 14 - Tiffany's Furnace & Thoreau's Fire | chapters/chapter-14.md | 1 | all-good |
| 15 - 1960 Rome Olympic Gold Medal | chapters/chapter-15.md | 1 | all-good |
| 16 - 1996 Atlanta Olympic Gold Medal | chapters/chapter-16.md | 4 | all-good |
| 17 - George Washington's Jelly Glass | chapters/chapter-17.md | 2 | all-good |
| 18 - Andrew Carnegie's Emerald | chapters/chapter-18.md | 8 | all-good |
| 19 - Moon Rocks & Meteors | chapters/chapter-19.md | 2 | all-good |
| 20 - The Six-Figure Birthstone | chapters/chapter-20.md | 9 | all-good |
| 21 - Antiquities of Alexander | chapters/chapter-21.md | 3 | all-good |
| 22 - Picasso's Pendant | chapters/chapter-22.md | 6 | all-good |
| 23 - Sing Your Own Special Song | chapters/chapter-23.md | 5 | all-good |
| Back Matter | chapters/back-matter.md | 9 | all-good |

## Needs human attention

None. The independent verifier returned `all-good` for every composite, with file integrity OK and interpretations untouched across all 25 files. No wrong-fix, incomplete, over-correction, should-have-fixed, file-integrity, or interpretation-touched failures were flagged.

## Per-chapter detail

### Front Matter (chapters/front-matter.md) - 9 edits

By category: inaccuracy-fixed 6, book-nuance-noted 1, omission-restored 2

1. **inaccuracy-fixed** (p.10) - Smaller boxes described as each having ONE dedicated BOOK separate from the Lion's Share book; source p.10 says a dedicated CHAPTER in Part Two of this same book.
   - Before: `each has ONE dedicated book separate from The Lion's Share Treasure book`
   - After: `each has ONE dedicated CHAPTER (not a separate book) within this same book. Per p.10: "To help you locate these boxes, I wrote four chapters... You will find these chapters in Part Two of this book."`

2. **inaccuracy-fixed** (p.16) - Composite dropped the load-bearing scoping phrase and rendered an inexact quote ("clues in ALL 23 chapters" / "almost every chapter includes at least some morsel").
   - Before: `Clues in ALL 23 chapters - "almost every chapter includes at least some morsel"`
   - After: `Clues across the chapters - "almost every chapter of the first twenty-three includes at least some morsel of information helpful for finding the location of the largest treasure box" (p.16)`

3. **inaccuracy-fixed** (p.9) - "On public land (not private property)" misattributed to front matter; appears nowhere in pages 1-17 (Postscript/later rules).
   - Before: `On public land (not private property)`
   - After: `On public land (not private property) - Postscript / later rules, not front matter (under a note that these do NOT appear in pages 1-17)`

4. **inaccuracy-fixed** (p.9) - "Within 3 miles of a road" misattributed to front matter; not in pages 1-17.
   - Before: `Within 3 miles of a road`
   - After: `Within 3 miles of a road - Postscript / later rules, not front matter`

5. **inaccuracy-fixed** (p.10) - "Not buried (no digging)" misattributed to front matter; not in pages 1-17.
   - Before: `Not buried (no digging)`
   - After: `Not buried (no digging) - Postscript / later rules, not front matter`

6. **inaccuracy-fixed** (p.16) - "Not dangerous to access" misattributed to front matter; not in pages 1-17.
   - Before: `Not dangerous to access`
   - After: `Not dangerous to access - Postscript / later rules, not front matter`

7. **book-nuance-noted** (p.17) - Pavese descriptor "Italian poet (1908-1950)" is externally-added context; book prints only "—CESARE PAVESE". Per hard rule the accurate external fact was kept, not deleted, and flagged as added context.
   - Before: `Cesare Pavese | Italian poet (1908-1950)`
   - After: `Cesare Pavese | Italian poet (1908-1950) - externally-added context; book prints only "—CESARE PAVESE" (p.17)`

8. **omission-restored** (p.10, p.16) - Composite omitted the book's explicit Part One vs. Part Two structure (Part Two = four smaller-box chapters; Lion's Share clues in Part One).
   - Before: `(no Part One/Part Two section present)`
   - After: `New "Part One vs. Part Two (p.10, p.16)" subsection: Part Two = the four smaller-box chapters; "almost every chapter in Part One... offers at least one important detail to help guide you to the location of the larger box."`

9. **omission-restored** (p.3) - Composite omitted the TOC-vs-prose nuance (printed TOC has NO Part One/Part Two headers; book prose defines Part Two as four chapters).
   - Before: `(no TOC structure nuance present)`
   - After: `Note added: "the printed Table of Contents (front-03-04) carries NO explicit 'Part One'/'Part Two' section headers - chapters are listed 1-23 sequentially. The book's prose calls Part Two 'the four chapters' dedicated to the smaller boxes."`

### Chapter 1 - The 120 Carat Sapphire (chapters/chapter-01.md) - 2 edits

By category: omission-restored 2

1. **omission-restored** (p.19, p.23) - Composite implied provenance but never quoted the two explicit in-treasure confirmation sentences (p.19 sidebar and p.23).
   - Before: `**Previous Display:** Bowers Museum near Los Angeles`
   - After: `**In-treasure confirmation:** p.19 sidebar states, *"This 120-carat raw sapphire is a part of our treasure."* p.23 states, *"The sapphire pictured on the next page... Once owned by Mike Scott, it now is in our treasure."*`

2. **omission-restored** (p.22) - Composite omitted Apple's stated growth metrics under Scott (doubled every three months for four years; Apple II + Apple III; first 5 1/2" floppy disk; over six million Apple II units; third-largest home-computer maker; 1980 IPO).
   - Before: `...lacked direction.\n\nAfter leaving Apple in 1981, Scott built one of the world's most valuable rare gem collections`
   - After: `...lacked direction.\n\nUnder Scott (who captained Apple 1977-1981)... *"For the next four years, Apple's size doubled every three months."* ...Apple II and Apple III, first 5 1/2" floppy disk; over six million units; third largest; in 1980 Apple went public.\n\nAfter leaving Apple in 1981...`

Could not apply (editApplied=false):
- **skipped** (p.22) - Validation noted the book literally prints '5 1/2" floppy disk' (the '5 1/4-inch' theory is a book error, not a transcription error). Reason: Preserved book's literal printing per HARD RULES (book oddity, not a transcription error); restored detail verbatim.
- **skipped** (p.20-21) - 'James Bond reference' note for badge #007 is an analyst interpretation flagged as a question (book frames 007/'Scotty' as a Star Trek nod). Reason: Out of scope: interpretation/question, not a factual fidelity error.

### Chapter 2 - The 100 Rings of Tuyet Nguyet (chapters/chapter-02.md) - 5 edits

By category: quote-restored 4, inaccuracy-fixed 1

1. **quote-restored** (p.37) - Page-37 instruction 'Don't rush through these pages' is a fabricated imperative; book uses reported/conditional speech 'to not rush'.
   - Before: `- "Don't rush through these pages"`
   - After: `- "She'd probably advise to not rush through these pages."`

2. **quote-restored** (p.37) - Page-37 instruction 'Get to know these stories' misframed as standalone direct quote; book has it embedded in reported speech, lowercase.
   - Before: `- "Get to know these stories"`
   - After: `- "She might encourage you to get to know these stories, to consider their content, and to not dismiss any details."`

3. **quote-restored** (p.37) - Page-37 instruction 'Consider their content' misframed as standalone imperative; book has '...to consider their content...' mid-sentence.
   - Before: `- "Consider their content"`
   - After: `(folded into restored reported-speech sentence: '...to get to know these stories, to consider their content, and to not dismiss any details.')`

4. **quote-restored** (p.37) - Page-37 instruction 'Don't dismiss any details' is a fabricated imperative; book uses 'to not dismiss any details'.
   - Before: `- "Don't dismiss any details"`
   - After: `(folded into restored reported-speech sentence ending '...and to not dismiss any details.')`

5. **inaccuracy-fixed** (p.34) - Misquote drops the article 'a' from the Khmer imagery quote.
   - Before: `"Golden lions guarded golden bridge"`
   - After: `"Golden lions guarded a golden bridge" | Khmer imagery (p.34)`

### Chapter 3 - A Puzzle Box, a Magnifying Glass, & the Mysterious Egg (chapters/chapter-03.md) - 2 edits

By category: inaccuracy-fixed 2

1. **inaccuracy-fixed** (p.38) - Japanese puzzle box (Himitsu-Bako, Hakone) wrongly listed as a treasure item; p.38 caption actually reads '(not in our treasure)' — composite inherited a metadata mis-transcription ('just in our Treasure').
   - Before: `| Japanese puzzle box | Traditional Himitsu-Bako, wood-inlay | Hakone, Japan |`
   - After: `(removed from Treasure Items table; moved to 'NOT in treasure' line with p.38 caption note)`

2. **inaccuracy-fixed** (p.42) - Magnifying glass date and value wrong; p.42 sidebar reads 'made around 1890 valued at over $23,000', not '~1900, valued $25,000+'.
   - Before: `| Gold & jade magnifying glass | ~1900, valued $25,000+ | Michael Perkhin (Faberge) |`
   - After: `| Gold & jade magnifying glass | ~1890, valued $23,000+ | Michael Perkhin (Faberge) |`

Could not apply (editApplied=false):
- **skipped** (p.42) - Spot-check on magnifier material ('gold and jade' vs metadata 'gold and 1-karat') — image confirms 'gold and jade', which the composite already states correctly. Reason: Composite already matches the image ground truth ('gold and jade'); nothing to fix.

### Chapter 4 - The 96 Carat Chivor Emerald (chapters/chapter-04.md) - 2 edits

By category: omission-restored 2

1. **omission-restored** (p.55) - Missing the load-bearing p.55 direct author-to-reader 'come find it' treasure-hunt parallel quote (never quoted in composite).
   - Before: `...your task is a **much, much easier one**."`
   - After: `**Direct "come find it" parallel (page 55):** "Now, in a way similar to how the Chivor mine awaited Restrepo, our ninety-six carat Chivor emerald waits patiently for you to come find it. If Restrepo were alive right now, I imagine he might find this fact extremely amusing."`

2. **omission-restored** (p.49) - Composite omits the p.49 image caption entirely; restored verbatim ('gold' specimen, 'The Flame', Red Ridge Mine — confirming prior 'The Picasso'/'Santa Mina' transcriptions were errors).
   - Before: `...largest retail volume dealer of rare minerals in the world."`
   - After: `A page 49 image caption (red text) reads: "Here Rob Lavinsky holds a gold specimen called 'The Flame' from the Red Ridge Mine."`

### Chapter 5 - Masterworks by Art Smith (chapters/chapter-05.md) - 5 edits

By category: quote-restored 2, inaccuracy-fixed 3

1. **quote-restored** (p.60) - Art Smith jewelry-philosophy quote condensed/altered but presented as a verbatim direct quote (dropped 'in a sense an object that', relocated ellipsis, omitted final two sentences).
   - Before: `"A piece of jewelry is...not complete until you relate it to the body."`
   - After: `"A piece of jewelry is in a sense an object that is not complete . . . until you relate it to the body. Like line, form and color, the body is a material to work with. It is one of the basic inspirations in creating form."`

2. **inaccuracy-fixed** (p.58) - Cuff bracelet material listed as 'Bronze/brass'; p.58 sidebar says 'brass'.
   - Before: `Cuff bracelet | Modernist curved organic cutout design | Bronze/brass`
   - After: `Cuff bracelet (p.56) | Modernist style bracelet | Brass`

3. **inaccuracy-fixed** (p.58) - Composite split the single copper/brass brooch pictured on p.58 into two separate brooch rows ('round brass' + 'copper and brass') to reach four items; book pictures only ONE brooch on p.58.
   - Before: `Brooch (round) | Modernist style | Brass / Brooch | Dual-metal design | Copper and brass`
   - After: `Brooch (p.58, "above") | Dual-metal design | Copper and brass`

4. **inaccuracy-fixed** (p.58) - Section heading '(4 Confirmed)' implied four pieces pictured; p.58 sidebar confirms four in the treasure but only three are pictured/captioned across pp.56-63.
   - Before: `## Treasure Items (4 Confirmed)`
   - After: `## Treasure Items (4 Confirmed by p.58 sidebar; 3 pictured/captioned across pp.56-63) + clarifying note`

5. **quote-restored** (p.62) - Ring caption rendered as an altered quote ('artistic edge contours around neighboring finger'); book p.62 caption reads 'outside edge contours around the neighboring finger'.
   - Before: `Free-form, "artistic edge contours around neighboring finger"`
   - After: `Free-form, "outside edge contours around the neighboring finger"`

### Chapter 6 - Rubies to Wear (chapters/chapter-06.md) - 1 edit

By category: inaccuracy-fixed 1

1. **inaccuracy-fixed** (p.67) - Wing-shaped ruby earrings value listed as $26,000+, but the page 67 sidebar reads 'above $20,000' (verified against screenshots/page-066-067.png).
   - Before: `| Wing-shaped ruby earrings | Angie Marei | $26,000+ |`
   - After: `| Wing-shaped ruby earrings | Angie Marei | $20,000+ |`

### Chapter 7 - Amelia's Autograph (chapters/chapter-07.md) - 6 edits

By category: quote-restored 2, inaccuracy-fixed 3, omission-restored 1

1. **quote-restored** (p.72) - Photo-provenance line wrapped in quotation marks but was a compressed paraphrase with ellipses ("Only other copies...at Purdue and Harvard Libraries...those are not signed"), dropping text and misrendering the lead-in.
   - Before: `**"Only other copies...at Purdue and Harvard Libraries...those are not signed"**`
   - After: `**"The only other copies of this photo that I know exist are at the Purdue and Harvard Libraries. However, I've been told those two photos are not signed."**`

2. **inaccuracy-fixed** (p.75) - "May 21, 1937" presented in Chapter Summary as a book-stated date; the book only prints "Five years and one day later" and never the explicit date.
   - Before: `Her final flight with **Fred Noonan** on **May 21, 1937** (... "five years and one day" after solo Atlantic flight) ended in mystery`
   - After: `Her final flight with **Fred Noonan** (... the book says "Five years and one day later," which works out to **May 21, 1937**, though the book never prints that date) ended in mystery`

3. **inaccuracy-fixed** (p.75) - Key Dates table lists "May 21, 1937" as the final-flight date as if stated in the book; it is an unstated arithmetic inference.
   - Before: `| May 21, 1937 | Final flight (5 years + 1 day later) |`
   - After: `| May 21, 1937 (inferred; book says "Five years and one day later," date not printed) | Final flight |`

4. **quote-restored** (p.74) - "From an Airplane" imagery quote dropped "Even the watchful" and collapsed two lines into "Purple hills that hold the lake."
   - Before: `"**Purple hills that hold the lake**,"`
   - After: `"**Even the watchful purple hills / That hold the lake**,"`

5. **inaccuracy-fixed** (p.74) - Historical Figures table invents a Pilot/Co-pilot distinction; the book says Stultz and Gordon both "had piloted that plane" with no role assignment.
   - Before: `| Wilmer Stultz | Pilot of 1928 Atlantic flight | / | Louis Gordon | Co-pilot of 1928 Atlantic flight |`
   - After: `Both rows now read "Piloted the 1928 Atlantic flight (book credits Stultz and Gordon equally with piloting; no pilot/co-pilot distinction)"`

6. **omission-restored** (p.73) - p.73 full-page snow-capped-mountain illustration omitted from all tables despite repo notes flagging mountains as a potential clue.
   - Before: `(no row)`
   - After: `| Snow-capped mountain range (p.73 illustration) | Full-page illustration: twin-engine airplane flying over a jagged, snow-capped mountain range with clouds | Medium (repo notes flag mountains as a potential clue) |`

### Chapter 8 - Beauty's Bespoken Treasures (chapters/chapter-08.md) - 7 edits

By category: inaccuracy-fixed 5, quote-restored 1, omission-restored 1

1. **inaccuracy-fixed** (p.78) - Death year 1991 for Charles Loloma is an external fact not present on pp.76-85 (only birth year 1921 is in the book).
   - Before: `**Charles Loloma** (1921-1991) - born into the Badger clan,`
   - After: `**Charles Loloma** (born 1921) - born into the Badger clan,`

2. **quote-restored** (p.84) - Confirmation-bias quote inserts an extra 'only'; book reads single 'only'.
   - Before: `...they may begin to see only those things that only confirm...`
   - After: `...they may begin to see those things that only confirm...`

3. **inaccuracy-fixed** (p.80) - Ironwood bracelet materials wrongly include 'fossil' (cross-contaminated from the separate p.81 Loloma rings sidebar). Book p.80: ironwood, turquoise, lapis lazuli, coral, and gold.
   - Before: `$27,000+ | Ironwood, turquoise, lapis, fossil, coral, gold`
   - After: `$27,000+ | Ironwood, turquoise, lapis lazuli, coral, gold`

4. **inaccuracy-fixed** (p.82) - Sonwai ring value and material wrong: book p.82 says 'over $20,000' and stone 'sugilite', not '$25,000+' and 'sapphire'.
   - Before: `$25,000+ | Turquoise, sapphire, coral, lapis lazuli, gold`
   - After: `$20,000+ | Sugilite, turquoise, coral, lapis lazuli, gold`

5. **inaccuracy-fixed** (p.82) - Exhibited-vs-purchased error and wrong museum name: rings were EXHIBITED at the 'Wheelwright Museum of Native American Art' (not 'American Indian Art'), not purchased there.
   - Before: `**Purchase location:** Wheelwright Museum of the American Indian Art, **Santa Fe**`
   - After: `**Exhibited at:** Wheelwright Museum of Native American Art, **Santa Fe** (...not purchased there)`

6. **inaccuracy-fixed** (p.82) - Geographic References row also labeled the museum as 'purchase location' with no name correction.
   - Before: `| **Santa Fe, NM** | Wheelwright Museum (purchase location) | Medium |`
   - After: `| **Santa Fe, NM** | Wheelwright Museum of Native American Art (rings exhibited here) | Medium |`

7. **omission-restored** (p.85) - Full Hopi calendar wheel (12 named months/ceremonies, solstice divisions) on p.85 was reduced to a single Katsina/Non-Katsina row.
   - Before: `| Calendar | Katsina Season / Non-Katsina Season, divided by solstices |`
   - After: `| Calendar | Full circular calendar wheel... | Calendar months/ceremonies | Powamuya (Feb - Bean Dance); ...; Paamuya (Jan - Winter Social Dances) |`

Could not apply (editApplied=false):
- **skipped** (p.81) - Line 23 'Silver ring (sapphire)' by Loloma lists sapphire and fossil. Reason: Correct as-is: this is a separate Loloma ring from the p.81 rings sidebar; the report confirms fossilized ivory and these stones belong to the Loloma rings, not the Sonwai ring. Not an error.

### Chapter 9 - The Golden Chalice (chapters/chapter-09.md) - 3 edits

By category: inaccuracy-fixed 2, omission-restored 1

1. **inaccuracy-fixed** (p.92) - "Father | Pastor" stated as a flat fact in the Author Personal Details table. Pages 92-93 only say "my father"/"my dad"; the word "pastor" never appears (it is an inference from him delivering the sermon and leading prayer for "his congregation").
   - Before: `| Father | Pastor |`
   - After: `| Father | Referred to only as "my father" / "my dad"; delivers the sermon and leads the prayer for "his congregation" (minister/pastor is inferred, not stated) |`

2. **omission-restored** (p.92) - Book explicitly states the denomination is Baptist on p.92 ("dry somber Baptist hymnals"), which the composite treated as merely implied/omitted.
   - Before: `(no denomination row)`
   - After: `| Denomination | Baptist (p.92: "dry somber Baptist hymnals") |`

3. **inaccuracy-fixed** (p.87) - Chalice date wrong: composite Treasure Item table reads "400-1000 BC" but the p.87 sidebar reads "600 and 1000 BC" (transcription error flagged in the vision summary as a minor inaccuracy).
   - Before: `Chavin culture, Peru, 400-1000 BC`
   - After: `Chavin culture, Peru, 600-1000 BC`

Could not apply (editApplied=false):
- **skipped** (p.94) - Vision summary noted the name "Kimberly" (p.94) is omitted, but this was NOT in the formal confirmedOmissions list (empty) and is not a confirmed inaccuracy/spot-failure; treated as out of high-confidence scope. Reason: Not in confirmedOmissions; only mentioned in passing in the vision summary, not a flagged actionable item.

### Chapter 10 - Jackie Onassis' Diamond Sapphire Brooch (chapters/chapter-10.md) - 1 edit

By category: inaccuracy-fixed 1

1. **inaccuracy-fixed** (p.96) - Father described as 'Supportive pastor, taught resilience'; chapter 10 pages never call him a pastor — descriptor imported from other chapters.
   - Before: `| Father | Supportive pastor, taught resilience |`
   - After: `| Father | Supportive father, taught resilience |`

Could not apply (editApplied=false):
- **skipped** (p.96) - Cross-Chapter Patterns line lists father as 'pastor (Ch 6, 9), supportive (Ch 10)'. Reason: Out of scope — this is a cross-chapter pattern claim (interpretive), which the hard rules forbid editing. The report's confirmed inaccuracy targets only the Author Personal Details table descriptor, which was fixed.

### Chapter 11 - Treasures From a Famous Shipwreck (chapters/chapter-11.md) - 6 edits

By category: inaccuracy-fixed 5, omission-restored 1

1. **inaccuracy-fixed** (p.105) - Gold bar row: weight 22+ (should be 23+ troy oz), value $50,000+ (should be over $90,000), and a false 'XXVI' marking; actual stamps are 1759/XX (20) and XXXVI (36).
   - Before: `| La Luz gold bar | 22+ ounces, XXVI marking, considered most beautiful of recovered bars | $50,000+ |`
   - After: `| La Luz gold bar | 23+ troy ounces, stamped "1759"/"XX" (20) and "XXXVI" (36), round knob added to increase mass, considered most beautiful of recovered bars | Over $90,000 |`

2. **inaccuracy-fixed** (p.106) - Eight escudo coin value '~$25,000+' misattributed to the treasure's MS 63 coin; >$25,000 belongs to a different non-shipwreck MS 64 coin, and the 'from 1750' qualifier was dropped. Book gives no value for the treasure coin.
   - Before: `| Eight escudo gold coin | 1750, Lima mint, MS 63 rating, only 15 such coins ever officially rated | ~$25,000+ |`
   - After: `| Eight escudo gold coin | 1750, Lima mint, MS 63 rating, only 15 such coins from 1750 ever officially rated (a higher MS 64 non-shipwreck coin recently sold for over $25,000) | Not specified |`

3. **inaccuracy-fixed** (p.103) - Geographic table added 'Chile' to 'Santiago'; the word Chile does not appear on p.103-104.
   - Before: `| Santiago, Chile | Machine minted escudos source | Low (South America) |`
   - After: `| Santiago | Machine minted escudos source | Low (South America) |`

4. **inaccuracy-fixed** (p.105) - Key-clue row asserted 'XXVI (26)' on the gold bar; the bar is actually marked XXXVI (36)/XX (20)/1759, disk XIV is correct.
   - Before: `| Roman numerals XXVI (26), XIV (14) | On gold bar and disk | Possible number significance |`
   - After: `| Roman numerals XXXVI (36)/XX (20)/1759 on gold bar, XIV (14) on gold disk | Stamped on bar and disk | Possible number significance |`

5. **inaccuracy-fixed** (p.105) - Downstream research question repeated the misread 'XXVI' marking.
   - Before: `2. Do Roman numerals XXVI and XIV have significance?`
   - After: `2. Do Roman numerals XXXVI (bar) and XIV (disk) have significance?`

6. **omission-restored** (p.108) - Omitted p.108 NGC slab provenance (collection name, mint/weight/attribution, cert number, Shipwreck Certification).
   - Before: `(no slab provenance row)`
   - After: `| Eight escudo NGC slab (p.108) | "1750L R PERU 8E" / "MS 63" / Fernandina Collection / "(27.00g) La Luz" / cert "5965184-003" / "SHIPWRECK CERTIFICATION" |`

Could not apply (editApplied=false):
- **skipped** (p.106) - Spot-check failure (eight escudo '~$25,000+' misattribution) is the same issue as inaccuracy #2, already corrected in the coin row. Reason: Duplicate of confirmed inaccuracy #2; fixed there, no separate edit needed.

### Chapter 12 - Massive Gold Rush Nugget (chapters/chapter-12.md) - 7 edits

By category: inaccuracy-fixed 4, quote-restored 3

1. **inaccuracy-fixed** (p.111) - Treasure sidebar substantively mis-transcribed: weight 'over four ounces' and 'near same farm where gold discovery verified 1849 Gold Rush'. Book says over twenty-one ounces, near the American River, 'set in motion' the 1849 Rush.
   - Before: `Over 4 ounces, found near same farm where gold discovery verified 1849 Gold Rush`
   - After: `Over twenty-one ounces, found near the American River, the same river where the discovery of gold set in motion the 1849 California Gold Rush`

2. **inaccuracy-fixed** (p.111) - Composite-introduced '(1848-1852)' date bracket; book never delimits the Rush as a span.
   - Before: `The California Gold Rush (1848-1852) was`
   - After: `The California Gold Rush was`

3. **inaccuracy-fixed** (p.111) - Fabricated specific day: book gives only the month 'January', not 'January 24, 1848'.
   - Before: `discovered gold on January 24, 1848, at Sutter's Mill`
   - After: `discovered gold in January 1848 at Sutter's Mill`

4. **inaccuracy-fixed** (p.111) - Paraphrase conflated signing with sale: book says 'nine days prior to the signing of this California purchase agreement', not 'nine days before Mexico sold California'.
   - Before: `just nine days before Mexico sold California to the US for $15 million`
   - After: `just nine days prior to the signing of the California purchase agreement, by which Mexico sold California to the US for $15 million`

5. **quote-restored** (p.114) - Anecdote paraphrased as 'eat free samples at grocery stores'; book's verbatim wording is about grabbing a muffin or two while pretending to be a customer (summary paragraph).
   - Before: `when he had to eat free samples at grocery stores.`
   - After: `when he would "grab a muffin or two in a grocery store to eat while I milled about pretending to be a customer."`

6. **quote-restored** (p.114) - Same 'free samples' paraphrase in the Author's Personal Details table.
   - Before: `Financially lean years, had to eat free samples at grocery stores`
   - After: `Financially lean years; would "grab a muffin or two in a grocery store to eat while I milled about pretending to be a customer"`

7. **quote-restored** (p.114) - Two treasure-hunt paraphrases rendered as verbatim quotes ('No sleeping outside on the dusty ground' / 'No survival kits needed'); replaced with book's actual sentences.
   - Before: `"No sleeping outside on the dusty ground" / "No survival kits needed"`
   - After: `"Our adventure does not require you to sleep outside on the dusty ground, although a camping trip is always a fun idea." / "You won't need to schedule rations or stock up on survival kits at the army supply store."`

Could not apply (editApplied=false):
- **skipped** (p.111) - Geographic table: 'Sacramento | 40 miles west of Sutter's Mill'. Book states Sutter's Mill is 'forty miles east of Sacramento' — Sacramento being 40 miles west is geometrically consistent and not flagged in the report. Reason: Not flagged by report; statement is consistent with the book's 'forty miles east of Sacramento'. Left as-is per hard rules (only fix flagged factual issues).

### Chapter 13 - Best of Its Class Jordan Rookie Card (chapters/chapter-13.md) - 4 edits

By category: quote-restored 1, inaccuracy-fixed 3

1. **quote-restored** (p.118) - Brent Huigens (PWCC) quote on p.118 was compressed ('arguably the finest PSA 9 we've brokered...shows better than most PSA 10s') yet presented inside quotation marks as verbatim, dropping 'Fleer Michael Jordan rookie card', 'in our long tenure', 'In truth, this card', and 'we've seen'.
   - Before: `owner Brent Huigens called it "arguably the finest PSA 9 we've brokered...shows better than most PSA 10s."`
   - After: `owner Brent Huigens said: *"Here is arguably the finest PSA 9 Fleer Michael Jordan rookie card we've brokered in our long tenure; ... In truth, this card shows better than most PSA 10s we've seen, which is why we've awarded it our 'Superior' certification."*`

2. **inaccuracy-fixed** (p.117) - Spot-check failure: composite said author 'was 6 years old when Jordan was a freshman at UNC.' Book (p.117) says author was NINE; the 'age of six' refers to when he watched his first games with his mom and dad.
   - Before: `He was 6 years old when Jordan was a freshman at UNC, and witnessed Jordan's famous 1982 championship-winning shot.`
   - After: `He watched his first games with his mom and dad around the age of six, and was 9 years old when Jordan was a freshman at UNC; he witnessed Jordan's famous 1982 championship-winning shot.`

3. **inaccuracy-fixed** (p.117) - Biography table repeated the wrong factual basis ('was 6 when Jordan was UNC freshman'); corrected to age 9 and aligned the interpretive birth-year estimate to the corrected fact (Jordan's freshman year 1981).
   - Before: `~1975-1976 (was 6 when Jordan was UNC freshman)`
   - After: `~1972-1973 (was 9 when Jordan was UNC freshman, 1981)`

4. **inaccuracy-fixed** (p.117) - Jordan's Path to Greatness section repeated 'Author was 6 years old' at Jordan's UNC freshman year; book says NINE.
   - Before: `UNC freshman: Author was 6 years old`
   - After: `UNC freshman: Author was 9 years old`

Could not apply (editApplied=false):
- **skipped** (p.117) - Cross-Chapter Patterns line 'Author's age - born ~1975-76' and Research Questions 'born ~1975-76' still reflect the old age-6 derivation, but these are interpretive/cross-chapter pattern claims. Reason: Out of scope: hard rules forbid editing interpretations and cross-chapter 'pattern' claims; these are derived estimates, not direct book facts.

### Chapter 14 - Tiffany's Furnace & Thoreau's Fire (chapters/chapter-14.md) - 1 edit

By category: inaccuracy-fixed 1

1. **inaccuracy-fixed** (p.125) - Vase initials rendered as 'LC/T initials on base'; page 125 caption ground truth renders them '(LCT)' carved into the base. Also restored caption's explicit 'one-of-a-kind' detail (confirmed omission in rarity cell).
   - Before: `LC/T initials on base ... Only one other known (at Metropolitan Museum of Art)`
   - After: `(LCT) initials carved into the base ... One-of-a-kind; only one other known (at Metropolitan Museum of Art)`

Could not apply (editApplied=false):
- **skipped** (p.125) - Report notes 'iridescent enamel on copper' comes from main body text, not the vase caption. Reason: Report confirms this is an accurate book fact (from body text), not a clue-bearing or factual error; per hard rules, accurate facts are left in place.

### Chapter 15 - 1960 Rome Olympic Gold Medal (chapters/chapter-15.md) - 1 edit

By category: inaccuracy-fixed 1

1. **inaccuracy-fixed** (p.137) - Timeline row '~1958 Daughter Yolanda born' states a birth year the book never gives; listed alongside hard-dated rows it falsely implies book provenance.
   - Before: `| ~1958 | Daughter Yolanda born |`
   - After: `(removed)`

### Chapter 16 - 1996 Atlanta Olympic Gold Medal (chapters/chapter-16.md) - 4 edits

By category: inaccuracy-fixed 4

1. **inaccuracy-fixed** (p.144) - Composite conflates two motels: 'cockroach-filled' wrongly attached to the Tallahassee two-star (pre-games) motel. Book p.144 calls Tallahassee a 'cheap two-star motel' with no cockroaches; cockroach-filled rooms belong to a different rundown motel 'over seventy-five miles away' post-Mexico-win (p.146).
   - Before: `lodging at a "cockroach-filled" two-star motel in Tallahassee, Florida`
   - After: `lodging at a "cheap two-star motel in Tallahassee, Florida" with "no money left for transport"`

2. **inaccuracy-fixed** (p.145, 146) - Japan result overstated as a definite '2-0' final score; book never states a Japan final score, only that the game was 'scoreless' and Nigeria 'scored two goals in the final eight minutes' (the only '2-0' on these pages is Mexico, p.146). Also restored the correctly-contexted cockroach-filled-rooms detail (post-Mexico-win) in verbatim wording.
   - Before: `Japan 2-0, then lost to Brazil. Against Mexico, they won 2-0 despite the NFA not booking accommodations expecting them to lose.`
   - After: `then beat Japan (the game was scoreless until Nigeria scored two goals in the final eight minutes), then lost to Brazil. Against Mexico, they won 2-0...; afterward the team "finally located a rundown motel over seventy-five miles away" and "for the next three nights, the Nigerians slept in cockroach-filled rooms."`

3. **inaccuracy-fixed** (p.144) - Geographic References table repeats the cockroach-filled attribution to the Tallahassee motel.
   - Before: `| Tallahassee, Florida | Nigerian team's motel (2-star, cockroach-filled) | Low |`
   - After: `| Tallahassee, Florida | Nigerian team's pre-games motel (cheap two-star) | Low |`

4. **inaccuracy-fixed** (p.145) - Nigerian Olympic Run table presents Japan as 'Won 2-0', a score the book never states.
   - Before: `| vs Japan | Won 2-0 | 2 goals in final 8 minutes |`
   - After: `| vs Japan | Won | Scoreless until 2 goals in final 8 minutes (no final score stated in book) |`

### Chapter 17 - George Washington's Jelly Glass (chapters/chapter-17.md) - 2 edits

By category: inaccuracy-fixed 2

1. **inaccuracy-fixed** (p.154) - Composite stated the cherry-tree myth was 'invented by Mason Locke Weems in 1799' — the book gives NO year, only that Weems wrote his first Washington biography 'a year after Washington died' and that the tale first appeared in the book's 'fifth edition.' The '1799' figure is a fabrication present only in the composite.
   - Before: `invented by Mason Locke Weems in 1799 to sell books`
   - After: `invented by Mason Locke Weems to sell books - he wrote his first Washington biography a year after Washington died, and the cherry tree tale didn't appear until his book's fifth edition`

2. **inaccuracy-fixed** (p.155) - Composite stated the Delaware crossing 'occurred on Christmas night' — the book never uses 'Christmas'; it says the men crossed 'in the dead of night' / 'that freezing cold night.' The 'Christmas night' detail exists only in the repo's analysis layers, not the book's raw text.
   - Before: `occurred on Christmas night when 2 of 3 groups`
   - After: `occurred "in the dead of night" when 2 of 3 groups`

### Chapter 18 - Andrew Carnegie's Emerald (chapters/chapter-18.md) - 8 edits

By category: inaccuracy-fixed 7, omission-restored 1

1. **inaccuracy-fixed** (p.161) - Author's parents' church location stated as 'Huntersville, NC'; book (p.161) says 'Statesville, NC'. Prose occurrence.
   - Before: `started a church in **Huntersville, NC** focused on service`
   - After: `started a church in **Statesville, NC** focused on service`

2. **inaccuracy-fixed** (p.161) - 'Huntersville, NC' in Author Biography table (Parents' church row).
   - Before: `| Parents' church | **Huntersville, NC** |`
   - After: `| Parents' church | **Statesville, NC** |`

3. **inaccuracy-fixed** (p.161) - 'Huntersville, NC' in Geographic References table.
   - Before: `| **Huntersville, NC** | Author's parents' church | HIGH`
   - After: `| **Statesville, NC** | Author's parents' church | HIGH`

4. **inaccuracy-fixed** (p.161) - 'Huntersville, NC' in Key Phrases & Potential Clues table.
   - Before: `| **"Huntersville, NC"** | Author's childhood | NC connection continues |`
   - After: `| **"Statesville, NC"** | Author's childhood | NC connection continues |`

5. **inaccuracy-fixed** (p.161) - 'Huntersville' factual city name in cross-chapter pattern line (only the city name corrected; pattern framing untouched).
   - Before: `Author NC connection** - Huntersville (new), Hiddenite`
   - After: `Author NC connection** - Statesville (new), Hiddenite`

6. **inaccuracy-fixed** (p.161) - 'Huntersville, NC' factual city name in Research Question 1 (only the city name corrected; question framing untouched).
   - Before: `How does Huntersville, NC relate to Hiddenite/Bakersville?`
   - After: `How does Statesville, NC relate to Hiddenite/Bakersville?`

7. **inaccuracy-fixed** (p.162) - Mill child-labor hours stated as '16 hours/day'; book (p.162) says 'twelve hours a day'.
   - Before: `starting as a bobbin boy (16 hours/day, 6 days/week)`
   - After: `starting as a bobbin boy (twelve hours a day, 6 days/week)`

8. **omission-restored** (p.162) - Composite omitted that Carnegie memorized telegraph sounds and that on a $35/week salary he began investing in companies he believed in (p.162).
   - Before: `(twelve hours a day, 6 days/week). He rose through Western Union`
   - After: `...He learned to memorize the sounds of the telegraph so he wouldn't have to write them down, and once on a substantial salary of $35/week he began investing in companies he understood and believed in. He rose through Western Union`

### Chapter 19 - Moon Rocks & Meteors (chapters/chapter-19.md) - 2 edits

By category: quote-restored 1, book-nuance-noted 1

1. **quote-restored** (p.168) - Aguas Zarcas sidebar quote erroneously inserted the word "with" (spot-check failure); book reads "foundational amino acids billions of years old..." with no "with".
   - Before: `Contains "foundational amino acids with billions of years old that were the precursors of life on our planet."`
   - After: `Contains "foundational amino acids billions of years old that were the precursors of life on our planet."`

2. **book-nuance-noted** (p.166) - Opening-quote attribution: composite writes "Arthur C. Clarke" while the book p.166 prints "ARTHUR C. CLARK" (no final e). Report/hard-rules flag this as a likely BOOK misprint where the external fact (Clarke) is correct, so the accurate name is kept and only a parenthetical is added.
   - Before: `| Arthur C. Clarke | Opening quote |`
   - After: `| Arthur C. Clarke (book prints "CLARK") | Opening quote |`
   - Note: Per hard rules, did not change the accurate external spelling to match the misprint; added a clean parenthetical noting the printed form instead.

### Chapter 20 - The Six-Figure Birthstone (chapters/chapter-20.md) - 9 edits

By category: inaccuracy-fixed 8, quote-restored 1

1. **inaccuracy-fixed** (p.172, page-171-172.png) - Carat count and cut name wrong (p.172 sidebar mis-transcription propagated): '201 carat' / 'Imperial Brilliant' -> '200 carat' / 'Beyond Brilliant' (Treasure Items table).
   - Before: `| 201 carat smokey quartz | "Imperial Brilliant" cut by Mark Oros |`
   - After: `| 200 carat smokey quartz | "Beyond Brilliant" cut by Mark Oros |`

2. **inaccuracy-fixed** (p.172, page-171-172.png) - Cut name wrong in Historical Figures table: 'Imperial Brilliant' -> 'Beyond Brilliant'.
   - Before: `| Mark Oros | Cut the smokey quartz "Imperial Brilliant" |`
   - After: `| Mark Oros | Cut the smokey quartz "Beyond Brilliant" |`

3. **inaccuracy-fixed** (p.172, page-171-172.png) - Fabricated smokey-quartz origin (no place name printed; 'Rio de Janeiro/Brazil' came from a bad transcription) removed from Treasure Items section.
   - Before: `**Smokey quartz origin:** State of Rio (Brazil)`
   - After: `(removed)`

4. **inaccuracy-fixed** (p.172, page-171-172.png) - Fabricated origin removed from Geographic References table row 'Rio de Janeiro state, Brazil'.
   - Before: `| Rio de Janeiro state, Brazil | Smokey quartz origin | Low |`
   - After: `(removed)`

5. **quote-restored** (p.172, page-171-172.png) - Fragment 'A change in where you stand changes everything' isolated and mislabeled 'Opening quote'; restored to full verbatim Steve de Shazer epigraph with correct attribution.
   - Before: `| **"A change in where you stand changes everything"** | Opening quote | Perspective advice |`
   - After: `| **"Where you stand determines what you see and what you do not see; it determines also the angle you see it from; a change in where you stand changes everything."** | Closing line of the Steve de Shazer epigraph | Perspective advice |`

6. **inaccuracy-fixed** (p.178, page-177-178.png) - Unsupported 'LA area' inference (page names only 'a local park') in Geographic References table.
   - Before: `| LA area local park | Rose garden visit | Medium |`
   - After: `| A local park (location unnamed) | Rose garden visit | Medium |`

7. **inaccuracy-fixed** (p.178, page-177-178.png) - Unsupported 'LA area' inference in Key Phrases analysis cell.
   - Before: `...Author's walk | LA area landmark? |`
   - After: `...Author's walk | Local landmark? (location unnamed in text) |`

8. **inaccuracy-fixed** (p.178, page-177-178.png) - Unsupported 'in LA area' inference in Cross-Chapter Patterns rose-garden bullet.
   - Before: `**Rose garden** - massive, several acres in LA area`
   - After: `**Rose garden** - massive, several acres (location unnamed in text)`

9. **inaccuracy-fixed** (p.178, page-177-178.png) - Unsupported 'LA area' premise baked into Research Question #1.
   - Before: `What massive rose gardens exist in the LA area?`
   - After: `What massive rose gardens (several acres) could the unnamed "local park" refer to?`

Could not apply (editApplied=false):
- **skipped** (p.171-178) - JSON accuracyNote lists possible omissions (Derek Grasso 'Breath of Heaven', 'lion atop a mountain of decaying catnip', Rob Lavinsky, Chivor-emerald color comparison, 7-year discovery delay) but confirmedOmissions array is empty. Reason: Not in the structured confirmedOmissions list; out of scope for high-confidence restoration.
- **skipped** (p.172) - Author name printed as 'Lscrae' (likely 'Lecrae') in Historical Figures table. Reason: Report does not flag this spelling; the 'Opening quote' attribution for both epigraph authors (Lscrae/de Shazer) is accurate, so left as-is per hard rules.

### Chapter 21 - Antiquities of Alexander (chapters/chapter-21.md) - 3 edits

By category: quote-restored 1, inaccuracy-fixed 1, omission-restored 1

1. **quote-restored** (p.187) - Key Phrases table rendered the unity line as a shortened paraphrase wrapped in quotes; should be the book's verbatim wording.
   - Before: `"We are mostly the same" | Unity theme | Common humanity`
   - After: `"We and our enemies, if we have them, are mostly the same" | Unity theme | Common humanity`

2. **inaccuracy-fixed** (p.181) - Cross-chapter pattern note called the four antiquities the author's 'most impressive items per author' - an unsupported embellishment not in the book.
   - Before: `**Four antiquities** - most impressive items per author`
   - After: `**Four antiquities** - four gold items acquired from ancient Greece (p.181)`

3. **omission-restored** (p.188) - Composite omitted the p.188 chapter-closing line and the full-page aerial heart-shape photograph foreshadowing Ch. 22.
   - Before: `(removed)`
   - After: `The chapter closes (p.188) with a large aerial/overhead photograph of a crowd arranged to form a heart shape, and the chapter-closing line: "Our next chapter is a love story." (foreshadowing Ch. 22, Picasso's Pendant - "A Love Story").`

### Chapter 22 - Picasso's Pendant (chapters/chapter-22.md) - 6 edits

By category: inaccuracy-fixed 3, quote-restored 3

1. **inaccuracy-fixed** (p.190, page-189-190.png) - Pendant mintage stated as 'Only 39 made' - figure 39 appears nowhere; p.190 sidebar says only thirty-two were created.
   - Before: `Only 39 made, 20 to public`
   - After: `Only 32 made, 20 to public`

2. **inaccuracy-fixed** (p.194, page-193-194.png) - Author met Kimberly year wrong (inherited 2003 transcription error); p.194 reads 'Kimberly and I met in 2013.' Fixed in Chapter Summary prose.
   - Before: `he met Kimberly in 2003, started a family in 2017`
   - After: `he met Kimberly in 2013, started a family in 2017`

3. **inaccuracy-fixed** (p.194, page-193-194.png) - Author met Kimberly year wrong in Author Biography table (same 2003->2013 error).
   - Before: `| Met | **2003** |`
   - After: `| Met | **2013** |`

4. **quote-restored** (p.193, page-193-194.png) - Jacqueline 'wife, lover, muse...' list wrapped in quotation marks but dropped the repeated 'his' and recast the subject - inexact as a verbatim quote.
   - Before: `she was "wife, lover, muse, manager, accountant, caretaker, agent, and best friend."`
   - After: `"Jacqueline was his wife, his lover, his muse, his manager, his accountant, his caretaker, his agent, and his best friend."`

5. **quote-restored** (p.193, page-193-194.png) - 'first step out your door' clue quoted inexactly - dropped both definite articles and truncated the sentence.
   - Before: `"Taking first step out your door might be bravest action"`
   - After: `"...taking the first step out your door might be the bravest action required of you here."`

6. **quote-restored** (p.193, page-193-194.png) - 'Persistence and bravery' presented as a quoted phrase but does not appear verbatim in the book; source uses adjectives.
   - Before: `"Persistence and bravery"`
   - After: `"Picasso was persistent and brave. These are not bad traits to have when hunting for a treasure."`

### Chapter 23 - Sing Your Own Special Song (chapters/chapter-23.md) - 5 edits

By category: omission-restored 1, inaccuracy-fixed 4

1. **omission-restored** (p.197, page-197-198.png) - Faience process arrow-sequence omitted the malleability role of salt+water and the entire color-glaze (dull-at-first) step before firing.
   - Before: `(sand + salt + water → shape → fire)`
   - After: `(sand → salt + water added to make it malleable and give it a form → shaped → a color glaze added, dull at first → placed into a fire, where the glaze saturates and the bead emerges bright and lustrous)`

2. **inaccuracy-fixed** (p.198, page-197-198.png) - Chapter Summary dropped the qualifier 'perhaps' and reframed 'gratitude for each day of our experience' as just 'gratitude,' overstating the claim.
   - Before: `gratitude is "the most powerful ability a treasure hunter can possess."`
   - After: `to have gratitude for each day of our experience is "perhaps the most powerful ability a treasure hunter can possess."`

3. **inaccuracy-fixed** (p.198, page-197-198.png) - Key Phrases table dropped 'perhaps,' overstating the gratitude claim as flat 'most powerful ability.'
   - Before: `**"Gratitude is most powerful ability"**`
   - After: `**Gratitude "perhaps the most powerful ability"**`

4. **inaccuracy-fixed** (p.198, page-197-198.png) - Key Phrases table mislabeled 'make our own special music' as 'Kimberly's song'; page text presents it as the couple's/family's shared phrase, not Kimberly's.
   - Before: `| "Make your own special music" | Kimberly's song | Unique path |`
   - After: `| "Make our own special music" | Kimberly and the author's shared phrase (family sings along) | Unique path |`

5. **inaccuracy-fixed** (p.198, page-197-198.png) - Author's Lifestyle table carried the same singular/mislabeled phrasing 'Make your own special music'; the book phrase is the couple's plural 'our own special music.'
   - Before: `| Philosophy | "Make your own special music" |`
   - After: `| Philosophy | "Make our own special music" (Kimberly and the author) |`

Could not apply (editApplied=false):
- **skipped** (p.195-196) - accuracyNote mentions composite 'drops the two opening epigraphs' as a possible omission. Reason: Not in confirmedOmissions and no verbatim ground-truth text provided in the report; restoring would require fabricating wording. Left unchanged per hard rule against guessing.

### Back Matter (chapters/back-matter.md) - 9 edits

By category: inaccuracy-fixed 7, omission-restored 2

1. **inaccuracy-fixed** (p.203) - Source mapping labeled page-203-204 as the 'postscript'; 203-204 are 'Some More of Our Treasure Items' (continued).
   - Before: `page-203-204.json + page-203-204.md (postscript)`
   - After: `203-204 moved to dedicated-documents mapping as 'Some More of Our Treasure Items, pp.199-204'; line removed from 'this document' list`

2. **inaccuracy-fixed** (p.207) - Source mapping labeled page-207-208 as the 'author bio'; 207-208 are the POSTSCRIPT.
   - Before: `page-207-208.json + page-207-208.md (author bio)`
   - After: `page-207-208.json + page-207-208.md (postscript)`

3. **inaccuracy-fixed** (p.199) - 'Some More of Our Treasure Items' under-scoped to pages 199-202 with 8 items; section spans 199-204 with ~11-13 items.
   - Before: `| ... | 199-202 | 8 additional treasure items not featured in chapters |`
   - After: `| ... | 199-204 | ~11-13 additional treasure items ... (continues through p.204: Costa Rica Nicoya jade-and-gold amulet necklace on p.203; Michele della Valle citrine-and-diamond necklace and a 9th-century Viking gold ring on p.204) |`

4. **inaccuracy-fixed** (p.211) - Joint Aiden-AND-Londyn acknowledgement split into separate per-child quotes; lines wrongly attributed individually.
   - Before: `| **Aiden** | Child | "Your enthusiasm for life lifts me up on wings" | / | **Londyn** | Child | "Your glowing faces lit a path..." |`
   - After: `| **Aiden and Londyn** | Children | Thanked together in one joint passage (p.211): "Thank you, Aiden and Londyn... lifts me up on wings... Your glowing faces lit a path for all this to be possible..." |`

5. **inaccuracy-fixed** (p.211) - 'Dad - Pastor' stated as fact; page 211 only thanks 'Mom and Dad' generally with no pastor descriptor.
   - Before: `| Dad | Father | Pastor |`
   - After: `| Mom and Dad | Parents | "Thank you, Mom and Dad for all your love and support throughout my entire life" (p.211; no further descriptor given) |`

6. **inaccuracy-fixed** (N/A - absent across 209-211) - Fabricated claim of a children's book 'Our Unbreakable Thread' (Marble Press); appears nowhere in 199-211.
   - Before: `- Also author of children's book "Our Unbreakable Thread" (Marble Press)`
   - After: `(removed)`

7. **inaccuracy-fixed** (p.211) - Back-cover logo described as 'crossed hammer and pickaxe'; image shows a crossed pickaxe and shovel/spade.
   - Before: `**Red circle with crossed hammer and pickaxe** on black background`
   - After: `**Red distressed circle stamp with crossed pickaxe and shovel/spade** on black background (the shovel has a clear D-handle grip and rounded spade blade)`

8. **omission-restored** (p.207) - Safety Guidelines omitted the postscript's literal-reading directive.
   - Before: `(no literal-reading directive present)`
   - After: `**Literal-reading directive (p.207...):** "There is no subterfuge... No double meanings. No misdirection. No innuendos. There is no subtext. No clues. No code. You should take what I say here as literally as you possibly can."`

9. **omission-restored** (p.207) - Safety bullets omitted the explicit FIVE-box count and the water / no-vessel / no-swift-current / no-ledge / no-cliff rules.
   - Before: `- Boxes placed in **safe locations** / - **Not dangerous** - no water crossings, cliff scaling`
   - After: `Added bullets: five treasure boxes total (p.207/208); none under any body of water (no raft/canoe/water vessel); not close to swift current or high/dangerous ledge; no cliff/rock-face scaling - each with verbatim p.207 quotes`

Could not apply (editApplied=false):
- **skipped** - accuracyNote mentions the Ch.11 'must read' quote is paraphrased, but it is not listed under confirmedInaccuracies, spotFailures, or textContradictions for ch.24. Reason: Not flagged as a confirmed inaccuracy/spot-failure with ground-truth replacement text; out of scope for high-confidence fixes.

## Closing note

This file is the correction audit trail for the chapters/ correction pass. The composites themselves carry no inline "corrected" markers — review the actual changes with `git diff chapters/`.
