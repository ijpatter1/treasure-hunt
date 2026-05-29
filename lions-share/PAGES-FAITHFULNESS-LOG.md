# pages/ Faithfulness Pass

Every metadata transcription + notes was compared to its page image and corrected; the book's own misprints were transcribed verbatim and noted, not "fixed." Review with `git diff pages/`.

## Totals

- **Pages checked:** 106
- **Total corrections applied:** 513
- **Pages changed:** 77
- **JSON-invalid pages:** 0

### Corrections by issue-type

| Issue-type | Count |
|------------|-------|
| transcription | 171 |
| other | 90 |
| value | 86 |
| image-description | 60 |
| name | 38 |
| book-misprint-noted | 22 |
| date | 19 |
| caption | 16 |
| in-treasure-flag | 6 |
| key-elements | 5 |
| **Total** | **513** |

(The "other" bucket consists predominantly of `verification_notes` rewrites that document the corrections made, plus content_type / formatting-flag / page-swap bookkeeping changes.)

## Needs human attention

The following pages remain flagged `needs-attention` by the verifier. No pages were JSON-invalid, and no page had legibility "poor" (all flagged pages are legibility "clear"). Each item below is a deviation the correction pass did not (or should not) resolve and a human should confirm.

### page-020-021 (legibility: clear)
- **`right_page.transcription.raw_text`** — The correction claimed the right page was already verbatim, but the image reads "...would surely love this invention. He eagerly demonstrated his prototype to his bosses. They had no interest. He pitched it to them four more times." The metadata instead reads "He repeatedly pitched it to his bosses." in place of "He eagerly demonstrated his prototype to his bosses." (verified via upscaled crop). Factual gist preserved, but raw_text is not verbatim and verification_notes wrongly asserts the right page was confirmed verbatim.

### page-034-035 (legibility: clear)
- **`left_page.transcription.formatted_sections[3].text` (sidebar) and `verification_notes`** — The red-italic left-margin sidebar caption is transcribed "Angkor Wat is the largest temple AT Angkor." but the image clearly reads "...temple OF Angkor." The correction's uncertainty note claimed the opening characters were unresolvable, but on zoom the caption is fully legible and "of" was mis-transcribed as "at". Appears in the sidebar formatted_section value, in verification_notes, and in notes.md.

### page-040-041 (legibility: clear)
- **`left_page.transcription.raw_text`** — Metadata transcribes "...no obvious or discernable way to open it." but the page prints the standard spelling "discernible" (i-b-l-e), verified at extreme zoom. The correction wrongly affirmed "discernable" as a faithful book misprint; it is NOT a misprint, so the metadata introduced a one-letter transcription error. Should read "discernible".

### page-058-059 (legibility: clear)
- **`right_page.transcription.raw_text`** — Metadata reads "such opinions weren't laced with malice" but the page prints "such opinions weren't held with malice." The word is "held", not "laced". Not caught by the correction pass.

### page-066-067 (legibility: clear)
- **`left_page.sidebar.text`** — Transcribes "A large round ruby is shown cased in its center" but the image prints one word "showcased" (hyphenated "show-cased" across a line break). "shown cased" is an incorrect transcription, not a faithful rendering of a page typo.

### page-070-071 (legibility: clear)
- **`right_page.transcription.raw_text`** — JSON reads "...their unadulterated, uninhibited, unbridled enthusiasm for everything..." but the image clearly reads "...their unadulterated, unabashed, unabated enthusiasm for everything...". "uninhibited, unbridled" are wrong substitutions for the printed "unabashed, unabated". Confirmed via high-res crop; a transcription mistake, not a book typo.
- **`right_page.transcription.formatted_sections[1].style` AND `right_page.formatting.emphasized_text[0].style` (and notes.md "Handwritten red subtitle")** — Subtitle style is labeled "red_handwritten" but the handwritten "Explore More" subtitle ink is neutral gray/black (dark-pixel mean RGB ~(101,101,101), no red bias) vs the actual red quote text ~(183,101,96). The correction fixed the SIDEBAR style but left the subtitle mislabeled as red in both metadata locations and in notes.md.

### page-084-085 (legibility: clear)
- **`key_elements.treasure_hunting_warning.description`** — Still reads "Treasure hunter's most dreaded foe". The book prints "foil" (verified in the image and acknowledged in the same file's raw_text and verification_notes). This derived field contradicts the corrected transcription; should be "foil".
- **notes line 18 (Tutuveni quote)** — Verbatim block still reads "The Tutuveni petroglyphs in the Grand Canyon, alone, covers..." with plural "petroglyphs". The book/image prints singular "petroglyph" (the metadata raw_text was corrected to singular). The note presents it as a direct quote, so the plural is inaccurate.

### page-139-140 (legibility: clear)
- **`right_page.transcription.raw_text`** — The Rahman Ali quote reads "We don't serve Negroes." (standard spelling), but the ground-truth image prints the misprint "We don't serve Negros." (missing the second 'e'). The book's verbatim misprint should be transcribed as printed. The correction claimed raw_text "already had it verbatim", but it actually contains the corrected "Negroes"; verification_notes describes preserving "Negros", which now contradicts the actual raw_text.

### page-141-142 (legibility: clear)
- **`right_page.transcription.formatted_sections[handwritten_subtitle].style` (and `formatting.emphasized_text[0].style`, and notes line 32)** — The handwritten subtitle "Defy Expectations" is labeled "red_handwritten" / "Handwritten red subtitle" but pixel sampling gives avg RGB ~(110,108,108) with 2436 dark/neutral pixels vs only 364 reddish pixels (dark gray/black ink). For reference, the genuinely-red chapter "16" marker samples ~(204,95,83) with 1798 reddish and 0 dark pixels. The transcribed TEXT is correct; only the color/style attribute is wrong.

### page-171-172 (legibility: clear)
- **`right_page.transcription.raw_text` / `formatted_sections[].attribution` / `verification_notes`** — The first quote's attribution is transcribed "Lscrae" (and verification_notes claims it prints small-caps as "—LSCRAE"). High-res crop shows the attribution as "—LECRAE" (L-E-C-R-A-E, the artist Lecrae). The second letter is E, not S. A transcription misread, not a book typo, and was NOT corrected; both notes and metadata carry the wrong "Lscrae".

### page-183-184 (legibility: clear)
- **`right_page.transcription.raw_text`** — Body text reads "...Sex, fertility, and springtime were his jam." but the page clearly prints "his jams." (plural). Minor one-character mismatch the correction did not address. All other body, sidebar, caption, date, and name fields verified faithful.

### page-191-192 (legibility: clear)
- **`right_page.transcription.raw_text`** — Final paragraph reads "Seeing Jacqueline at her home had only ENHANCED the feelings Picasso" but the image clearly reads "enFLAMED". A transcription error, not a book typo.
- **`left_page` / `right_page` raw_text (paragraph attribution)** — The "Seeing Jacqueline at her home had only enflamed the feelings...one more subtle than decorating Jacqueline's home with chalk, but just as brave." paragraph is PHYSICALLY ON THE LEFT PAGE (191), ending directly above the "191" folio. The JSON misplaces it into right_page.raw_text and omits it from left_page.raw_text (left_page wrongly ends at "But she declined his second invitation to dinner."). The right page (192) actually contains only ONE paragraph ("The next day, Pablo ventured back...Weeks turned into months."). The misattribution was not caught.
- **`left_page.page_number` / `uncertainties`** — Minor: the correction reported page numbers as "not legible," but folio "191" is faintly visible at bottom-left of the left page. The retained value 191 is correct, so this is only an inaccurate uncertainty note, not a data error.

### page-193-194 (legibility: clear)
- **`left_page.transcription.raw_text`** — Image reads "Picasso's self-made treasures was unwavering" (plural "treasures"), but metadata transcribes it as singular "treasure". Minor singular/plural mismatch the correction did not fix; verified by zooming on the line.

## Breakdown by issue-type

- **transcription (171):** Body/sidebar/quote text that did not match the printed page word-for-word — missing/extra words, garbled OCR-style passages, dropped or truncated paragraphs restored verbatim, punctuation, and paraphrased summaries replaced with verbatim text.
- **value (86):** Numeric or factual values diverging from the page — carat weights, dollar amounts, ounces/grams, edition counts, dates inside value fields, removed fabricated origins, and formatting-style descriptors stored in value fields.
- **other (90):** Mostly `verification_notes` rewrites documenting corrections, plus content_type / formatting-flag / has_header / has_quotes / page-swap bookkeeping.
- **name (38):** Proper names and demonyms (e.g. Statesville not Huntersville, Scottyite not Scottybite, Madisyn Taylor, Philipp Humm, Jamie Biver, Bashō Matsuo, Octavio Ocampo).
- **image-description (60):** Misdescribed or under-described photos/illustrations, single-vs-multiple object errors, and page-swap image relocations.
- **date (19):** Year and date-range corrections (e.g. 2015 not 2018, 2013 not 2003, 600–1000 BC not 400–1000 BC, 36,000-foot not 30,000-foot, 100 BC–100 AD not 1st BC–1st AD).
- **caption (16):** Sidebar/image caption text and type/style descriptors.
- **book-misprint-noted (22):** The book's own misprints transcribed verbatim and recorded (e.g. "5 1/2\" floppy", "Columbian" emerald, "Arthur Ellis", "Jaqueline", "welded", "Negros", "as gold bar", "an extra the crevices", singular "Olympic", "while.Was", "It's estimated value", "Faberge" without accent).
- **key-elements (5):** Derived/synthesized `key_elements` fields realigned to corrected transcriptions or stripped of hallucinated entries (e.g. removed "10% of our brains"/"mice prefer cheese" myths).
- **poem (0):** No poem corrections were required; Joy's Serenade (page-205-206) and all epigraph poems verified verbatim.
- **in-treasure-flag (6):** Inverted or wrong in-treasure captions corrected (page-038-039 puzzle box → "not in our treasure"; page-044-045 3rd Imperial Egg → "not in our treasure", in_treasure true→false).

## Per-page detail (pages with applied corrections)

### page-161-162 — legibility: clear — 28 corrections
- `metadata` / left_page.raw_text / transcription / "My other wanted to know" -> "My editor wanted to know"
- `metadata` / left_page.raw_text / transcription / "share it with others. Those reasons" -> "share in it with others. These reasons"
- `metadata` / left_page.raw_text / transcription / "did not save much money" -> "did not have much means"
- `metadata` / left_page.raw_text / name / "church in Huntersville, NC ... ideal of service" -> "church in Statesville, NC ... idea of service"
- `metadata` / left_page.raw_text / transcription / "The church assisted ... local Food Bank and Red Cross" -> "Our church assisted ... local food bank and Red Cross"
- `metadata` / left_page.raw_text / transcription / truncated after "I was required to volunteer." -> extended verbatim through page end (5 omitted paragraphs)
- `metadata` / left_page.formatted_sections / name / "Huntersville, NC ... ideal of service" -> "Statesville, NC ... idea of service"
- `metadata` / right_page.raw_text / transcription / "His not only covered the structural ways which many large now non-profits are run today" -> "He not only invented the structure with which many large non-profits are run today"
- `metadata` / right_page.raw_text / transcription / "surprisingly captures what in history" -> "arguably surpasses anyone else in history"
- `metadata` / right_page.raw_text / transcription / "a wound mineral from Carnegie's own mineral collection" -> "a beautiful emerald from Carnegie's rare mineral collection"
- `metadata` / right_page.raw_text / transcription / "Dunfermline ... His family first poor ... slept in the corner ... minus house" -> verbatim Dunfermline/linen-factories/stone-house/loom/shoe-mending passage
- `metadata` / right_page.raw_text / transcription / "bobbin boy in a cotton factory ... thirteen years old ... sixteen hours a day" -> "bobbin boy in a textile mill ... children in the U.S. were allowed to work twelve hours a day"
- `metadata` / right_page.raw_text / value / "an illegal child laborer. It was a life of poverty." -> "an illegal child laborer. He made $1.20 per week."
- `metadata` / right_page.raw_text / transcription / "messenger boy and Western Union ... power-ful people. In town" -> "messenger boy at Western Union ... prominent people in town"
- `metadata` / right_page.raw_text / transcription / "first personal mentor ... became Vice-President" -> "hired Andrew as his own personal secretary ... when Scott became Vice-President"
- `metadata` / right_page.raw_text / transcription / "acquire more and not less money ... $35 week ... due to the wealth" -> "work smarter and not harder ... $35/week ... By age thirty-seven, Andrew Carnegie effectively retired"
- `metadata` / right_page.raw_text / transcription / "got a book titled (Gospel of Wealth) ... first American great wealth ... put to motion ... engage with philanthropy" -> "released a book titled Gospel of Wealth ... first person of great wealth ... set in motion ... organize philanthropy"
- `metadata` / right_page.raw_text / transcription / "pivoting into the small business" -> "pivoting into the steel business"
- `metadata` / right_page.formatted_sections / value / "cotton factory - 16 hours/day, 6 days/week" -> "textile mill - 12 hours/day, 6 days/week, $1.20 per week"
- `metadata` / key_elements.author_biography.church_location / name / "Huntersville, NC" -> "Statesville, NC"
- `metadata` / key_elements.author_biography.church_focus / transcription / "Ideal of service" -> "Idea of service"
- `metadata` / key_elements.author_biography.father_volunteer / transcription / "local Food Bank and Red Cross" -> "local food bank and Red Cross"
- `metadata` / key_elements.carnegie_biography.first_job / transcription / "Bobbin boy in cotton factory" -> "Bobbin boy in textile mill"
- `metadata` / verification_notes / other / old "all accurate" Huntersville/cotton/16hrs note -> rewritten to document actual corrections
- `notes` / Left Page church location / name / "Huntersville, NC; ideal of service" -> "Statesville, NC; idea of service"
- `notes` / Geographic References etc. / name / "Huntersville, NC" -> "Statesville, NC"
- `notes` / Carnegie's Life Story / value / "cotton factory; 16 hours/day; slept in corner; Scott first mentor" -> "textile mill; 12 hours/day; $1.20/week; small upstairs of stone house; Scott hired him as personal secretary"
- `notes` / Verification Status / other / old "all accurate" status -> rewritten to list actual corrections

### page-082-083 — legibility: clear — 15 corrections
- `metadata` / left_page/right_page page assignment / transcription / all Sonwai body+quotes assigned to left_page(82) -> left_page(82) image+sidebar only, right_page(83) full narrative+quotes+"MORE ABOUT THE HOPI"
- `metadata` / left_page.sidebar.text (materials) / value / "turquoise, sapphire, turquoise, coral, lapis lazuli, and gold" -> "sugilite, turquoise, coral, lapis lazuli, and gold"
- `metadata` / left_page.sidebar.text (value) / value / "over $25,000" -> "over $20,000"
- `metadata` / left_page.sidebar.text (acquisition) / value / "purchased at the Wheelwright Museum of the American Indian Art" -> "exhibited at the \"Loloma\" exhibit at the Wheelwright Museum of Native American Art"
- `metadata` / left_page.sidebar.style / other / "red_italic" -> "gold_bold"
- `metadata` / left_page.images[0].description / image-description / "ring with turquoise, sapphire, coral..." -> full-page dark-background photo, sugilite, layout note
- `metadata` / key_elements.treasure_items.sonwai_ring.materials / value / "Turquoise, sapphire..." -> "Sugilite, turquoise..."
- `metadata` / key_elements.treasure_items.sonwai_ring.value / value / "Over $25,000" -> "Over $20,000"
- `metadata` / key_elements.treasure_items.sonwai_ring (location) / value / "purchase_location: Wheelwright Museum of the American Indian Art" -> "exhibit_location: ... Wheelwright Museum of Native American Art"
- `metadata` / key_elements.geographic_references / name / "Wheelwright Museum, Santa Fe" -> "Wheelwright Museum of Native American Art, Santa Fe"
- `metadata` / verification_notes / other / old "$25K+...all accurate" -> documents layout swap + sidebar fixes
- `notes` / SIDEBAR section / value / "Turquoise, sapphire...; Over $25,000; purchased..." -> "Sugilite, turquoise...; Over $20,000; exhibited..."
- `notes` / Potential Clues (museum) / name / "purchased at..." -> "exhibited (the 'Loloma' exhibit) at Wheelwright Museum of Native American Art"
- `notes` / section headers + layout note / other / added page-82-is-photo-only / page-83-has-body-text note
- `notes` / Verification Status footer / other / "all accurate" -> lists corrections

### page-022-023 — legibility: clear — 13 corrections
- `metadata` / left_page.raw_text / transcription / "simple workstation badges" -> "simple workplace badges"
- `metadata` / left_page.raw_text / transcription / "Since Woz designed and engineered the Apple I" -> "Since Woz had designed and engineered the Apple 1"
- `metadata` / left_page.raw_text / transcription / "Scotty himself badge number 007." -> "Scotty gave himself badge number 007."
- `metadata` / right_page.raw_text / name / "it's called Scottybite." -> "it's called Scottyite."
- `metadata` / right_page.raw_text / transcription / "A 120-carat raw sapphire crystal" -> "A 120-carat sapphire crystal"
- `metadata` / right_page.formatted_sections (Scottyite body) / name / "Scottybite" -> "Scottyite"
- `metadata` / right_page.images[0].description / image-description / "Mike Scott in a suit" -> Star Trek Scotty (Doohan) with phaser + composited sapphire, honeycomb background
- `metadata` / right_page.formatted_sections (caption style) / caption / "{sidebar, red_italic}" -> "{caption, brown_bold}"
- `metadata` / key_elements.minerals / name / "Scottybite" -> "Scottyite"
- `metadata` / verification_notes / book-misprint-noted / generic note -> changelog; records book's "5 1/2\" floppy disk" (real 5 1/4\") kept verbatim
- `notes` / Mike Scott's Gem Collection / name / "Scottybite" -> "Scottyite"
- `notes` / Potential Clues table row / name / "Scottybite" -> "Scottyite"
- `notes` / The Treasure Sapphire bullet / transcription / "120-carat raw sapphire crystal" -> "120-carat sapphire crystal"

### page-105-106 — legibility: clear — 13 corrections
- `metadata` / left_page.sidebar.text (opening) / book-misprint-noted / "This is a gold bar" -> "This is as gold bar" (book prints "as")
- `metadata` / left_page.sidebar.text (weight) / value / "slightly over 22 ounces" -> "exceeds twenty-three troy ounces"
- `metadata` / left_page.sidebar.text (knob) / transcription / "small half-circle ... met its minimum weight" -> "round knob you see on the bar's face ... increase its mass"
- `metadata` / left_page.sidebar.text (value) / value / "over $50,000" -> "over $90,000"
- `metadata` / left_page.images[0].description / image-description / "stamped '1591' ... knob on lower right" -> "stamp appears inverted ... knob is the bar described in the sidebar"
- `metadata` / right_page.raw_text (encrustations) / transcription / "fill most attractive crevices of its surface" -> "fill an extra the crevices of its surface" (book typo verbatim)
- `metadata` / key_elements.treasure_items.gold_bar.weight / value / "Over 22 ounces" -> "Exceeds twenty-three troy ounces"
- `metadata` / key_elements.treasure_items.gold_bar.estimated_value / value / "Over $50,000" -> "Over $90,000"
- `metadata` / key_elements.treasure_items.gold_bar.notes / other / "most beautiful of recovered bars" -> adds round-knob added-gold detail
- `metadata` / verification_notes / other / "$50K, 22+ oz accurate" -> full sidebar corrections + "as gold bar" + "an extra the crevices" + Montevideo/Uruguay book error
- `notes` / Left Page Roman numeral / transcription / "XXVI (26)" -> "XXXVI (36) on lower/sidebar bar; upper bar scallop-shell mark, ~1591, XX"
- `notes` / Sidebar bullets / value / "22 ounces / half-circle / $50,000 / 'This is a gold bar'" -> "twenty-three troy ounces / round knob added to increase mass / $90,000 / 'This is as gold bar' (misprint)"
- `notes` / Verification Status / other / "$50,000+, 22+ oz accurate" -> corrected figures, numeral, misprint, Montevideo/Uruguay error

### page-151-152 — legibility: clear — 13 corrections
- `metadata` / right_page.raw_text (1st attribution) / name / "—MADELEINE TAYLOR" -> "—MADISYN TAYLOR"
- `metadata` / right_page.raw_text (2nd attribution) / name / "—PHILIP NUNU" -> "—PHILIPP HUMM"
- `metadata` / right_page.raw_text (1st quote wording) / transcription / "them unique-adding to the whole" -> "them unique adding to the whole"
- `metadata` / right_page.formatted_sections[0] attribution / name / "Madeleine Taylor" -> "Madisyn Taylor"
- `metadata` / right_page.formatted_sections[1] attribution / name / "Philip Nunu" -> "Philipp Humm"
- `metadata` / right_page.formatted_sections[0] quote text / transcription / "them unique-adding" -> "them unique adding"
- `metadata` / key_elements.quotes[0].author / name / "Madeleine Taylor" -> "Madisyn Taylor"
- `metadata` / key_elements.quotes[1].author / name / "Philip Nunu" -> "Philipp Humm"
- `metadata` / verification_notes / other / "Madeleine Taylor and Philip Nunu ... all accurate" -> corrected attributions + hyphen->space detail
- `notes` / Quotes attribution 1 / name / "Madeleine Taylor" -> "Madisyn Taylor"
- `notes` / Quotes attribution 2 / name / "Philip Nunu" -> "Philipp Humm"
- `notes` / Quotes quote 1 wording / transcription / "them unique-adding" -> "them unique adding"
- `notes` / Verification Status / name / "Madeleine Taylor ... Philip Nunu" -> "Madisyn Taylor ... Philipp Humm"

### front-01-02 — legibility: clear — 12 corrections
- `metadata` / left_page.raw_text (ISBN) / value / "979-8-9899831-3-5" -> "979-8-989813-31-5"
- `metadata` / left_page.formatted_sections[publishing_info] (ISBN) / value / "979-8-9899831-3-5" -> "979-8-989813-31-5"
- `metadata` / left_page.metadata.isbn / value / "979-8-9899831-3-5" -> "979-8-989813-31-5"
- `metadata` / left_page.raw_text (photographer) / name / "JAMIE RIVER" -> "JAMIE BIVER"
- `metadata` / left_page.formatted_sections[photo_credits] / name / "JAMIE RIVER" -> "JAMIE BIVER"
- `metadata` / left_page.metadata.photographer / name / "Jamie River" -> "Jamie Biver"
- `metadata` / right_page.formatting.emphasized_text / value / "[AND: red_italic; quote: red_italic]" -> "[AND: dark_small_caps; rule: red_rule; quote+attribution: red_italic]"
- `metadata` / verification_notes / other / "All transcriptions accurate" -> ISBN regroup + JAMIE BIVER + AND-is-dark note with pixel samples
- `notes` / Publishing Details: ISBN / value / "979-8-9899831-3-5" -> "979-8-989813-31-5"
- `notes` / Credits: Photography / name / "Jamie River" -> "Jamie Biver"
- `notes` / Dedication note: AND color / value / "red italic - emphasized" -> "dark/black small caps; red elements are the rule and quote"
- `notes` / Potential Clues (Page 2): AND row / value / "red emphasized" -> "small caps; stylistic typesetting, not color-emphasized"

### page-080-081 — legibility: clear — 12 corrections
- `metadata` / right_page.sidebar.text / value / "two ... silver rings ... larger ring page 80 ... sapphire ... masonite, fossil" -> "two ... stone rings; blue ring (page 76) free-form turquoise + fossilized ivory/ironwood/coral rim; purple ring (above) sugilite + lapis lazuli/coral/turquoise"
- `metadata` / left_page.sidebar.text / value / "ironwood, turquoise, lapis, fossil, coral, gold; over $27,000" -> "ironwood, turquoise, lapis lazuli, coral, gold; over $27,000."
- `metadata` / left_page.raw_text / transcription / elided-with-ellipses + "Those pieces" -> verbatim restored; "These pieces"; PBS/Indian Historical Society passage
- `metadata` / right_page.raw_text / transcription / "Home with no running water" -> ": homes with no running water"
- `metadata` / right_page.images[0].description / image-description / "two silver rings" -> single sugilite/purple ring on dark slate
- `metadata` / left_page.images[0].description / image-description / "turquoise, lapis, fossil, coral, gold" -> "turquoise, lapis lazuli, coral, gold, on dark blue cloth"
- `metadata` / key_elements.treasure_items / value / silver-rings materials -> stone-rings (blue page 76, purple page 81) corrected materials
- `metadata` / verification_notes / book-misprint-noted / "two silver rings ... all accurate" -> documents corrections; preserves "inlayed" and "features ... features"
- `notes` / SIDEBAR - TWO LOLOMA RINGS / value / silver rings -> STONE rings; blue (page 76) + purple (page 81) details
- `notes` / SIDEBAR materials / value / "lapis, fossil" -> "lapis lazuli" (no fossil)
- `notes` / Hotevilla quote / transcription / "Home with no running water" -> ": homes with no running water"
- `notes` / Verification Status / other / "two silver rings ... all accurate" -> stone-ring corrections, single-ring image

### page-084-085 — legibility: clear — 12 corrections (FLAGGED)
- `metadata` / left_page.raw_text / transcription / "Tutuveni petroglyphs ... covers" -> "Tutuveni petroglyph ... covers"
- `metadata` / left_page.raw_text / transcription / "overly pleased about Hopi history" -> "overly plussed about Hopi history" (book word, verbatim)
- `metadata` / left_page.raw_text / transcription / "And beware: ... most dreaded foe." -> "And beware. ... most dreaded foil." (book prints "foil"; period not colon)
- `metadata` / left_page.formatted_sections[0].text / transcription / "petroglyphs ... covers" -> "petroglyph ... covers"
- `metadata` / left_page.formatted_sections[2].text / transcription / "most dreaded foe." -> "most dreaded foil."
- `metadata` / right_page.images[0].text_in_image / transcription / misspelled/incomplete ceremony names -> exact Hopi calendar diagram labels
- `metadata` / key_elements.hopi_calendar.ceremonies / name / Powamya/Niman/etc. -> Powamuya/Talangva/Tala'paamuya/Nasanmuya/Kelmuya
- `metadata` / verification_notes / book-misprint-noted / "all accurate" -> records petroglyph/plussed/foil + exact ceremony spellings; no "Soyal" in diagram
- `notes` / Confirmation bias warning / transcription / "most dreaded foe" -> "most dreaded foil" (book prints "foil")
- `notes` / Ceremonies Listed / name / Soyal/Powamya/etc. -> exact diagram labels; removed invented "Soyal"
- `notes` / Potential Clues (Bean Dance) / name / "Powamya" -> "Powamuya"
- `notes` / Chapter 8 Summary WARNING / transcription / "most dreaded foe" -> "most dreaded foil"

### page-147-148 — legibility: clear — 12 corrections
- `metadata` / left_page(147).raw_text / other / Brazil-semifinal body text -> empty (moved to right_page; 147 is photo page)
- `metadata` / left_page(147).images / image-description / [] -> Nigerian team photo + Atlanta 1996 medal/ribbon/display case with engravings
- `metadata` / left_page.content_type / other / "mixed" -> "image"
- `metadata` / right_page(148).raw_text / other / empty -> full Brazil-semifinal body text (verbatim, moved here)
- `metadata` / right_page(148).images / other / [team photo] -> [] (moved to left_page)
- `metadata` / right_page.content_type / other / "mixed" -> "text"
- `metadata` / left_page.images[0].text_in_image / image-description / "Atlanta 1996" -> "Atlanta 1996; XXVI OLYMPIAD ATLANTA 1996 (engraved)"
- `metadata` / verification_notes / other / claimed verified in swapped arrangement -> documents page-swap (147=photo, 148=text) + engravings
- `notes` / body-text section header / other / "Left Page (147)" -> "Right Page (148)"
- `notes` / photo section header / other / "Right Page (148)" -> "Left Page (147)"
- `notes` / photo description / image-description / "Atlanta 1996 visible" -> ribbon + torch logo + medal engravings + display case
- `notes` / Verification Status / other / body-left/photo-right -> documents page-swap

### page-183-184 — legibility: clear — 12 corrections (FLAGGED)
- `metadata` / left_page.sidebar.text / transcription / garbled Ibex-bracelet caption -> "two matching gold Ibex-headed bracelets ... worn in pairs. Pairs that still exist today are very rare. This couple's provenance ..."
- `metadata` / right_page.sidebar.text / transcription / hallucinated snake-bracelet caption -> verbatim "Egyptian gold snake bracelet from between 100 BC to 100 AD ... Just ask my wife ... Getty Museum in Los Angeles. Kimberly feels ..."
- `metadata` / left_page.raw_text / transcription / "Maenads women" -> "Maenad women"
- `metadata` / left_page.formatted_sections[3] / transcription / "Maenads women" -> "Maenad women"
- `metadata` / key_elements.treasure_item_3.date / date / "1st BC to 1st AD" -> "100 BC to 100 AD"
- `metadata` / key_elements.treasure_item_3.note / value / "Getty Museum" -> "Getty Museum in Los Angeles"
- `metadata` / verification_notes / other / "1st BC to 1st AD ... all accurate" -> corrected sidebars, Maenad, "between 100 BC to 100 AD", verbatim quote
- `notes` / Right sidebar date / date / "1st BC to 1st AD" -> "between 100 BC to 100 AD"
- `notes` / Right sidebar quotes / transcription / "Thousands of years old, still looks like new" / "I am told by Kimberly" -> "Over two thousand years old, it still wears perfectly today" / "Getty Museum in Los Angeles" / "Kimberly feels"
- `notes` / Left sidebar item #2 / transcription / "Originally worn in pairs / Coptic provenance" -> "Worn in pairs; 'Pairs that still exist today are very rare' / 'This couple's provenance ...'"
- `notes` / Maenads followers / transcription / "Maenads women" -> "Maenad women"
- `notes` / Geographic References (Getty) / value / "Getty Museum" -> "Getty Museum in Los Angeles"

### page-189-190 — legibility: partial — 12 corrections
- `metadata` / right_page.raw_text (2nd attribution) / name / "—ALBERT ELLIS" -> "—ARTHUR ELLIS" (book misprint; quote is from Albert Ellis)
- `metadata` / right_page.formatted_sections[3].attribution / name / "Albert Ellis" -> "Arthur Ellis"
- `metadata` / right_page.raw_text (Picasso first word) / transcription / "uttered the sound pit." -> "uttered the sound piz."
- `metadata` / right_page.sidebar.text / transcription / "at paints ... engaging in ... thirty-nine ... minted" -> "Jacqueline ... enjoying ... thirty-two ... created"
- `metadata` / key_elements.treasure_item.quantity_made / value / "39" -> "32"
- `metadata` / key_elements.picasso_biography.first_word / transcription / "pit" -> "piz"
- `metadata` / left_page.images[0].description / image-description / "labeled 'Jacqueline au chevalet'" -> "the sidebar identifies it as 'Jacqueline au chevalet'"
- `metadata` / verification_notes / book-misprint-noted / "39 minted ... all accurate" -> documents Arthur/Albert misprint, piz, thirty-two-created, sidebar wording
- `notes` / Right Page Quotes #2 / name / "Albert Ellis" -> "Arthur Ellis (book prints 'Arthur Ellis'; actually Albert Ellis)"
- `notes` / Sidebar quantity / value / "Only 39 pendants ever minted" -> "Only 32 pendants ever created"
- `notes` / Key Observations rarity / value / "Only 39 made, 20 available" -> "Only 32 made, 20 available"
- `notes` / Picasso Biography first word / transcription / "pit" -> "piz"

### page-181-182 — legibility: clear — 11 corrections
- `metadata` / left_page.sidebar.text / transcription / "gold acorn accents ... leaf wires ... We had them constructed" -> "Leaves such as these are extremely rare. These leaves ... The band was constructed later"
- `metadata` / right_page.raw_text / transcription / "Zeus was bodied all of nature" -> "Zeus embodied all of nature"
- `metadata` / left_page.images[0].description / image-description / "oak and olive leaves" -> band with olive/oak leaves + larger gold flower/rosette elements, dark blue background
- `metadata` / left_page.images[0].potential_clues / image-description / "Oak and olive leaves" -> "Olive and oak leaves"
- `metadata` / key_elements.treasure_item_1.materials / value / "with gold acorn accents" -> "(extremely rare)"
- `metadata` / key_elements.treasure_item_1.date / value / "3rd-4th centuries BC" -> "Leaves created between 3rd and 4th centuries BC"
- `metadata` / key_elements.treasure_item_1.note / value / "wreath reconstructed" -> "the band was constructed later"
- `metadata` / verification_notes / other / "acorn accents ... reconstructed" -> documents acorn/leaf-wire removal, embodied fix, preserved "leafs"
- `notes` / Sidebar item #1 / transcription / "acorn accents / leaf wires / Wreath reconstructed" -> "extremely rare / leaves / band constructed later"
- `notes` / Potential Clues / value / "olive/oak leaves, acorns" -> "solid gold olive/oak leaves"
- `notes` / Verification Status / other / "acorn accents ... reconstructed" -> "acorn/leaf-wire removed; sidebar corrected"

### page-038-039 — legibility: clear — 10 corrections
- `metadata` / right_page.sidebar.text / sidebar.style / in-treasure-flag / "(just in our Treasure) [red_italic]" -> "(not in our treasure) [brown_caption]"
- `metadata` / right_page.raw_text / date / "late 2018" -> "late 2015"
- `metadata` / right_page.raw_text + sections + key_elements.quotes (Cartier-Bresson) / transcription / "The little human detail" -> "The little, human detail"
- `metadata` / key_elements.geographic_references / value / "[Japan, Tokyo]" -> "[Japan]"
- `metadata` / verification_notes / other / "late 2018 ... all accurate" -> 2015 date, comma, "not in our treasure", Tokyo removed
- `notes` / Left Page Potential Clues in-treasure / in-treasure-flag / "IS in the treasure" -> "NOT in the treasure"
- `notes` / Right Page timeline / date / "late 2018" -> "late 2015"
- `notes` / Right Page Quote 1 / transcription / "The little human detail" -> "The little, human detail"
- `notes` / Geographic References / value / "Japan / Tokyo" -> "Japan"
- `notes` / Verification Status / other / "late 2018 ... accurate" -> 2015, "not in our treasure", comma, Tokyo removal

### page-125-126 — legibility: clear — 10 corrections
- `metadata` / left_page.sidebar.text / transcription / "the LC/T initials ..." -> "his (LCT) initials ... This vase is one-of-a-kind. ..."
- `metadata` / right_page.raw_text / transcription / paragraph ended at "more beautiful as a result." -> restored dropped final paragraph (SG/EL markings, cut off at "the meaning of EL is")
- `metadata` / left_page.images[0].description / image-description / "iridescent blue and pink" -> "iridescent green, pink, and amber; bulbous form"
- `metadata` / right_page.images / image-description / [] -> partial handwritten manuscript bleeding in at outer edge of page 126
- `metadata` / key_elements.treasure_item.markings / value / "LC/T initials" -> "(LCT) initials; SG (Stourbridge Glass) or EL"
- `metadata` / key_elements.treasure_item.rarity / value / "Only one other known (Met)" -> "One-of-a-kind; only one other of this size known (Met)"
- `metadata` / verification_notes / other / "LC/T initials ... accurate" -> RE-VERIFIED with corrections incl. truncated "meaning of EL is"
- `notes` / Sidebar quotes / transcription / "LC/T initials" -> "his (LCT) initials; This vase is one-of-a-kind."
- `notes` / Enamel Pieces section / transcription / (none) -> added SG/EL markings, cut off at page break
- `notes` / Left Page Potential Clues / value / "Only 2 known; LC/T marking" -> "one-of-a-kind; only one other of this size (Met's); (LCT) marking"

### page-167-168 — legibility: clear — 10 corrections
- `metadata` / left_page.raw_text / transcription / "Western Sahara Desert ... unceremoneously" -> "Western Saharan Desert ... unceremoniously"
- `metadata` / left_page.formatted_sections[3].text / transcription / "Western Sahara Desert" -> "Western Saharan Desert"
- `metadata` / right_page.sidebar.text / transcription / "carbonaceous chondrite classification ... amino acids with billions of years old" -> "carbonaceous chondrite composition ... amino acids billions of years old"
- `metadata` / key_elements.treasure_items.moon_rock.found / transcription / "Western Sahara Desert" -> "Western Saharan Desert"
- `metadata` / key_elements.treasure_items.aguas_zarcas.significance / value / "Carbonaceous chondrite with ..." -> "Carbonaceous chondrite composition with ..."
- `metadata` / verification_notes / other / "Sahara ... classification ... accurate" -> Saharan + composition; notes book's "Mohave"/"everyday" verbatim
- `notes` / NWA 12691 discovery line / transcription / "Western Sahara Desert" -> "Western Saharan Desert"
- `notes` / Left Page Geographic References / transcription / "Western Sahara Desert" -> "Western Saharan Desert"
- `notes` / Sidebar bullets / transcription / "classification / amino acids with billions of years old" -> "composition / amino acids billions of years old"
- `notes` / Verification Status / transcription / "Sahara ... classification" -> "Saharan ... composition"

### page-171-172 — legibility: clear — 10 corrections (FLAGGED)
- `metadata` / right_page.sidebar.text / caption / "201 carat ... 'Imperial Brilliant' ... state of Rio de ... most velvet tone" -> "200 carat ... 'Beyond Brilliant' ... true to the name of its cut ... most radiant item"
- `metadata` / key_elements.treasure_item.name / value / "201 carat smokey quartz" -> "200 carat smokey quartz"
- `metadata` / key_elements.treasure_item.cut / name / "Imperial Brilliant" -> "Beyond Brilliant"
- `metadata` / key_elements.treasure_item.origin / value / "State of Rio (Brazil)" -> field removed (no origin stated on page)
- `metadata` / left_page.images[0].description / image-description / "golden/amber" -> "golden/amber/brown ... radial faceting"
- `metadata` / verification_notes / other / "201 carat ... Imperial Brilliant ... Rio de ... accurate" -> 200/Beyond Brilliant; removed fabricated origin
- `notes` / Sidebar / caption / "201 ... Imperial Brilliant ... Rio de ... velvet tone" -> "200 ... Beyond Brilliant ... true to the name ... most radiant"
- `notes` / Potential Clues / value / "201 carat 'Imperial Brilliant'" -> "200 carat 'Beyond Brilliant'"
- `notes` / Geographic References / value / "Rio de Janeiro state, Brazil" -> "None stated on this page"
- `notes` / Key Observations / Verification Status / other / "201 ... Imperial Brilliant ... Rio accurate" -> 200/Beyond Brilliant; fabricated origin removed

### page-173-174 — legibility: clear — 10 corrections
- `metadata` / right_page.sidebar.text / transcription / "'Breath of Heaven' by Derek Grasso ... shifting perception" -> "'Mouth of Flower' by Octavio Ocampo ... shifting perspective ... © Octavio Ocampo"
- `metadata` / right_page.sidebar.style / value / "red_italic" -> "brown"
- `metadata` / right_page.raw_text (Faberge) / book-misprint-noted / "Fabergé" -> "Faberge" (book omits accent)
- `metadata` / left_page.images[0].description / image-description / "pink flowers (poppies)" -> Octavio Ocampo's surrealist double-image "Mouth of Flower" (woman's face in flowers)
- `metadata` / left_page.images[0].potential_clues / key-elements / "[Flowers, Pink]" -> surrealist double-image / butterfly / flowers / pink
- `metadata` / key_elements.gemstone_artists / name / "Mark Oros 201 carat Imperial Brilliant; Derek Grasso 'Breath of Heaven'" -> "Mark Oros (no carat on page); Octavio Ocampo 'Mouth of Flower' (NOT in treasure)"
- `metadata` / verification_notes / other / "'Breath of Heaven' by Derek Grasso ... accurate" -> Faberge misprint; Octavio Ocampo 'Mouth of Flower'; image identity
- `notes` / Left Page (173) + Potential Clues / image-description / "pink flowers (poppies)" -> Octavio Ocampo's "Mouth of Flower"
- `notes` / Sidebar / transcription / "'Breath of Heaven' by Derek Grasso" -> verbatim Octavio Ocampo "Mouth of Flower" caption
- `notes` / Verification Status / other / "'Breath of Heaven' ... accurate" -> Octavio Ocampo correction; Faberge misprint noted

### page-008-009 — legibility: clear — 9 corrections
- `metadata` / left_page.images[0].description / image-description / "open top, black leather/velvet interior" -> closed chest, tan/beige metal panels in dark iron frame, straps, latch, feet; no interior
- `metadata` / right_page.formatted_sections[callout I'VE HIDDEN].style / value / "caps_centered_boxed" -> "gold_tan_caps_centered"
- `metadata` / right_page.formatted_sections[callout AND IT'S WAITING].style / value / "gold_caps_centered" -> "red_caps_centered"
- `metadata` / right_page.formatting.emphasized_text[0].style / value / "caps_centered" -> "gold_tan_caps_centered"
- `metadata` / right_page.formatting.emphasized_text[1].style / value / "gold_caps" -> "red_caps_centered"
- `metadata` / right_page.formatting.special_typography / value / "[gold border around callout box]" -> "[red dotted-line rules above/below; vertical gold/tan side borders, not enclosed box]"
- `metadata` / verification_notes / other / "All transcriptions accurate" -> callout color reversal (sampled RGB), dotted-rule/side-border, closed-box correction
- `notes` / Page 8 Image Description / image-description / "gold/brass frame; black interior (open)" -> closed chest; tan/beige panels; dark iron frame; no interior
- `notes` / Potential Clues Materials / image-description / "Gold/brass, black interior" -> "Tan/beige metal panels in dark iron frame"

### page-032-033 — legibility: clear — 9 corrections
- `metadata` / left_page.formatted_sections[3] (sidebar) + notes / transcription / "It has a lotus bell." -> "It has some heft."
- `metadata` / left_page.raw_text / transcription / Hindu paragraph truncated; Vishnu-lotus omitted; blue-lotus misplaced here -> full verbatim left-page text restored; misplaced blue-lotus removed
- `metadata` / left_page.formatted_sections / transcription / "Blue lotus ... secrets revealed" listed as left-page -> replaced with actual left-page content (Vishnu, lotus life cycle, pink/red lotus)
- `metadata` / right_page.raw_text / transcription / started at "Outside of these religious themes"; abbreviated -> opens with white/blue lotus; restores "one in every thousand people on earth", "ancient Greece"/"alpha metropolis", Yashodharapura paragraph
- `metadata` / right_page.formatted_sections / transcription / missing white/blue lotus + Yashodharapura -> added
- `metadata` / key_elements.khmer_empire / geographic_references / key-elements / "Angkor" -> "Angkor (locally Yashodharapura, 'glory bearing city')"; added Yashodharapura, ancient Greece, population detail
- `metadata` / verification_notes / other / generic note -> documents "some heft" fix, page misplacement, restored omissions
- `notes` / Left Page (32) Content / transcription / blue-lotus on left, "lotus bell" -> "some heft"; added Vishnu, lotus life cycle, pink/red; removed blue-lotus
- `notes` / Right Page (33) Content / transcription / missing passages -> added white/blue lotus, population, ancient Greece, Yashodharapura

### page-062-063 — legibility: clear — 9 corrections
- `metadata` / right_page.raw_text / transcription / "All will probably even share a perspective" -> "AI will probably even share a perspective"
- `metadata` / right_page.raw_text / transcription / dropped "Faith is an invisible force." -> restored
- `metadata` / left_page.sidebar.text / transcription / "free-form ... artistic edge" -> "free form ... outside edge"
- `metadata` / left_page.sidebar.style / other / "red_italic" -> "gold_caption"
- `metadata` / left_page.images[0].description / image-description / "artistic edge" -> "outside edge"
- `metadata` / key_elements.treasure_items.art_smith_ring / key-elements / "Free-form ... artistic edge" -> "Free form ... outside edge"
- `metadata` / verification_notes / other / "all accurate" -> AI vs All, restored "Faith is an invisible force.", free form/outside edge, gold caption
- `notes` / Left Page sidebar quote / transcription / "free-form ... artistic edge" -> "free form ... outside edge"
- `notes` / Right Page catalogued speculation / transcription / (none) -> restored "AI will probably even share a perspective or three"

### page-193-194 — legibility: clear — 9 corrections (FLAGGED)
- `metadata` / left_page.raw_text / book-misprint-noted / "Jacqueline was his wife" -> "Jaqueline was his wife" (book misprint at this occurrence)
- `metadata` / right_page.raw_text / date / "met in 2003. ... family in 2017." -> "met in 2013. ... family in 2017."
- `metadata` / right_page.raw_text / transcription / "partnership, care, embodi, support, and acceptance" -> "partnership, parenthood, support, and acceptance"
- `metadata` / right_page.formatted_sections[2].text / date / "met in 2003" -> "met in 2013"
- `metadata` / key_elements.author_love_story.met / date / "2003" -> "2013"
- `metadata` / verification_notes / date / "met 2003 ... accurate" -> met 2013; documents "Jaqueline" misprint + parenthood fix
- `notes` / Right Page (194) Met / date / "Met: 2003" -> "Met: 2013"
- `notes` / Chapter 22 Summary Met / date / "Met: 2003" -> "Met: 2013"
- `notes` / Verification Status / date / "met 2003 ... accurate" -> "met 2013 (book prints 2013); 'Jaqueline' misprint"

### page-197-198 — legibility: clear — 9 corrections
- `metadata` / left_page.raw_text / transcription / "drawn paintings, drawn paintings, scribbled poems" -> "drawn paintings, scribed poems"
- `metadata` / right_page.raw_text / transcription / "some standard cliché" -> "some standard cliche"
- `metadata` / right_page.raw_text / transcription / "Our most vital hunt is our universal ones, ones desire each one of us shares." -> "Our most vital hunts are universal ones, core desires each one of us shares."
- `metadata` / right_page.sidebar.text / caption / "The 'creative night' necklace" -> "Our \"creative night\" necklace"
- `metadata` / right_page.sidebar.style / value / "red_italic" -> "brown_caption"
- `metadata` / right_page.images[0].description / image-description / "Small image of necklace" -> vertical photo; turquoise carved leopard/lion-head centerpiece, red/coral/blue/turquoise beads
- `metadata` / verification_notes / other / "all accurate" -> itemized corrections + "scribed poems" note
- `notes` / Left Page activities / transcription / "Scribbling poems" -> "Scribed poems"
- `notes` / Right Page Sidebar / caption / "Image of the 'creative night' necklace" -> "Our 'creative night' necklace (brown/gold caption)"

### page-042-043 — legibility: clear — 8 corrections
- `metadata` / left_page.images[0].description / caption / "gold and 1-karat magnifying glass ... 1900 ... $25,000" -> "gold and jade Faberge magnifying glass ... 1890 ... $23,000"
- `metadata` / left_page.sidebar.text / caption / "gold and 1-karat ... 1900 ... $25,000" -> "gold and jade Faberge ... 1890 ... $23,000"
- `metadata` / left_page.sidebar.style / other / "red_italic" -> "brown_bold"
- `metadata` / key_elements.treasure_items[0] / value / "valued over $25,000" -> "valued over $23,000"
- `metadata` / verification_notes / value / "$25K ... accurate" -> $23,000 / jade Faberge / ~1890; book's awkward p.43 phrasing noted
- `notes` / Left Page image caption / caption / "1-karat ... 1900 ... $25,000" -> "jade Faberge ... 1890 ... $23,000"
- `notes` / Treasure Items Confirmed / value / "$25,000+" -> "$23,000+"
- `metadata` / right_page.raw_text / book-misprint-noted / "Faberge brand ... most respected Russian jewelry designer" kept verbatim; book error noted (a brand can't be a designer)

### page-066-067 — legibility: clear — 8 corrections (FLAGGED)
- `metadata` / right_page.sidebar.text (earring value) / value / "above $26,000" -> "above $20,000."
- `metadata` / left_page.sidebar.text / transcription / "16th century Thailand ... It was ... that is" -> "16th century Sukhothai, Thailand ... It's ... that's"
- `metadata` / right_page.raw_text / transcription / "walking from a dream" -> "waking from a dream"
- `metadata` / key_elements.treasure_items.angie_marei_earrings.value / value / "Above $26,000" -> "Above $20,000"
- `metadata` / right_page.images[0].potential_clues / value / "$26,000+" -> "$20,000+"
- `metadata` / verification_notes / value / "$26K+" -> "above $20,000" + Sukhothai/contraction/waking changelog
- `notes` / SIDEBAR value / value / "Above $26,000" -> "Above $20,000"
- `notes` / Verification Status / value / "$26K+" -> "above $20,000; Sukhothai"

### page-165-166 — legibility: clear — 8 corrections
- `metadata` / right_page.sidebar.text (auction value) / value / "over $100,000." -> "over $500,000." (5x error)
- `metadata` / right_page.sidebar.text (overpaid) / transcription / "originally overpaid" -> "arguably overpaid"
- `metadata` / right_page.sidebar.text (contraction) / transcription / "and it is in our treasure" -> "and it's in our treasure"
- `metadata` / key_elements.treasure_item.value / value / "over $100,000 in 2021" -> "over $500,000 in 2021"
- `metadata` / verification_notes / book-misprint-noted / "$100,000+ ... accurate" -> book prints "—ARTHUR C. CLARK" (missing e; author is Clarke), kept verbatim; sidebar corrections
- `notes` / Sidebar quotes / value / "it is ... originally overpaid ... $100,000." -> "it's ... arguably overpaid ... $500,000."
- `notes` / Potential Clues value / value / "$100,000+" -> "$500,000+"
- `notes` / Verification Status / book-misprint-noted / "$100,000+ accurate" -> "ARTHUR C. CLARK" misprint; "over $500,000"

### title-page — legibility: partial — 7 corrections
- `metadata` / images[2] (coin) / image-description / "Bitcoin coin, top_right, 'Bitcoin symbol'" -> "Physical silver Bitcoin coin (Casascius-style), top_center, '999 FINE SILVER; 2013; Bitcoin B symbol'"
- `metadata` / images[7] (box) / image-description / "Multiple treasure boxes ... represents 5 boxes" -> "Single ornate engraved gold treasure box on blue-grey surface"
- `metadata` / images[3] (red document) / image-description / "Courage and possibly prize/value" -> legible fragments incl. Amelia's poem "Courage"
- `metadata` / verification_notes / other / generic note -> documents single-box, silver-Bitcoin-coin, Amelia "Courage" fragments, mostly-illegible red document
- `notes` / Treasure Items Shown (coin + box) / image-description / "Bitcoin coin; Multiple treasure boxes" -> "silver Bitcoin coin, 999 FINE SILVER/2013; single ornate gold box"
- `notes` / Potential Clues (boxes) / image-description / "Multiple boxes | 5 boxes confirmed" -> "Treasure box | Single ornate gold box"
- `notes` / Verification Status / other / "Courage text visible" -> single gold box (not 5), silver coin details, Amelia "Courage"

### page-014-015 — legibility: clear — 7 corrections
- `metadata` / left_page.formatting.has_header / transcription / false -> true (header "JON COLLINS-BLACK")
- `metadata` / left_page.formatting.emphasized_text / transcription / no running-header entry -> added "JON COLLINS-BLACK" brown_caps_running_header
- `metadata` / left_page.formatting.emphasized_text[sidebar].style / other / "red_italic_sidebar" -> "brown_upright_sidebar" (sampled brown/gold ~(149,129,100))
- `metadata` / left_page.formatted_sections[sidebar].style / other / "red_italic" -> "brown_upright"
- `metadata` / right_page.formatting.has_header / transcription / false -> true (header "THERE'S TREASURE INSIDE")
- `metadata` / verification_notes / other / generic note -> running headers, sidebar/signature color corrections (RGB), confirmed photo items
- `notes` / Sidebar Note heading / other / "(Red Italic)" -> "(brown/gold, upright)"

### page-020-021 — legibility: clear — 7 corrections (FLAGGED)
- `metadata` / left_page.raw_text / transcription / "simpler then today" -> "simpler than today"
- `metadata` / left_page.formatted_sections[3].text / transcription / "simpler then today" -> "simpler than today"
- `metadata` / left_page.raw_text / date / "In 1975, two such Californians" -> "In 1971, two such Californians"
- `metadata` / left_page.raw_text / transcription / "San Francisco Bay Area" -> "San Francisco Bay area" (lowercase)
- `metadata` / key_elements.geographic_references / value / "San Francisco Bay Area" -> "San Francisco Bay area"
- `metadata` / key_elements.dates / date / "[1975, summer of 1975]" -> "[summer of 1975, 1971, 1975]"
- `metadata` / verification_notes / other / "all accurate" -> three fixes; page numbers not legible

### page-028-029 — legibility: clear — 7 corrections
- `metadata` / left_page.raw_text / transcription / paraphrased summary -> full verbatim page 28
- `metadata` / right_page.raw_text / transcription / paraphrased summary -> full verbatim page 29
- `metadata` / left_page.formatting / other / has_header/has_quotes false, empty -> true + header "JON COLLINS-BLACK" + italics
- `metadata` / right_page.formatting / other / has_header/has_quotes false, empty -> true + header "THERE'S TREASURE INSIDE" + italics
- `metadata` / verification_notes / other / "summarization accurate" -> verbatim replacement; headers; italics; not-blind caveat
- `notes` / Right Page Content / value / "blind elderly man" -> "elderly gentleman asked to read color chart (page does NOT say blind)"
- `notes` / Verification Status / value / "blind man incident" -> not-blind correction

### page-058-059 — legibility: clear — 7 corrections (FLAGGED)
- `metadata` / right_page.raw_text / transcription / "They wagered their fingers at him" -> "They wagged their fingers at him"
- `metadata` / left_page.sidebar.text / transcription / "in our Treasure ... round brass brooch ... (below)" -> "in our treasure ... brass bracelet (previous spread) ... (above)"
- `metadata` / left_page.images / image-description / two brooches -> single copper/brass brooch (pin/clasp bar visible); brass bracelet not on this page
- `metadata` / key_elements.treasure_items.piece_1/piece_2 / value / two brooches -> piece_1 brass bracelet (previous spread); piece_2 copper/brass brooch (this page)
- `metadata` / verification_notes / other / "2 brooches ... all accurate" -> wagged fix, verbatim sidebar, 1 image
- `notes` / Left Page sidebar + pieces / transcription / "in our Treasure ... brass brooch" -> "in our treasure ... brass bracelet (previous spread) ... brooch (above)"
- `notes` / Verification Status / other / "2 Art Smith pieces ... accurate" -> bracelet vs brooch; one object pictured

### page-086-087 — legibility: clear — 7 corrections
- `metadata` / right_page.sidebar.text (date) / date / "400 and 1000 BC" -> "(Opposite page) ... 600 and 1000 BC"
- `metadata` / left_page.images[0].description / date / "400-1000 BC Peru" -> "600-1000 BC Peru"
- `metadata` / key_elements.treasure_item.date_range / date / "400-1000 BC" -> "600-1000 BC"
- `metadata` / verification_notes / date / "400-1000 BC" -> "600 and 1000 BC; added '(Opposite page)' label"
- `notes` / Left Page date / date / "400-1000 BC" -> "600-1000 BC"
- `notes` / Sidebar quote / caption / "between 400 and 1000 BC" -> "(Opposite page) ... between 600 and 1000 BC"
- `notes` / Verification Status / date / "400-1000 BC" -> "600-1000 BC (corrected)"

### page-115-116 — legibility: clear — 7 corrections
- `metadata` / left_page.sidebar.style / other / "red_italic" -> "brown_gold_serif" (sampled ~(138,116,84))
- `metadata` / right_page.formatted_sections[handwritten_subtitle].style / other / "red_handwritten" -> "black_handwritten" (~(82,82,82))
- `metadata` / right_page.formatting.emphasized_text[0].style / other / "red_handwritten" -> "black_handwritten"
- `metadata` / verification_notes / image-description / "thumbnail of same card bottom-right" -> NO thumbnail; bottom-right is partial tablet/e-reader showing next chapter (page "116")
- `notes` / Sidebar heading/style / other / "(Red Italic)" -> "(Brown/Gold Serif)"
- `notes` / Right Page subtitle color / other / "red subtitle" -> "black/dark gray script"
- `notes` / Verification Status / image-description / "card thumbnail" -> brown/gold sidebar; black/gray handwriting w/ red dotted dividers; bottom-right is tablet

### page-129-130 — legibility: clear — 7 corrections
- `metadata` / right_page.raw_text / transcription / "relax a little in the discipline" -> "relax a little in the disciplines"
- `metadata` / right_page.raw_text / transcription / "we should be fastidious" -> "we would be fastidious"
- `metadata` / right_page.formatted_sections[0].text (quote) / transcription / "the discipline ... All wisdom" -> "the disciplines ... All wisdom"
- `metadata` / left_page.formatted_sections[1].text (quote) / transcription / "The art of Life...How to live" -> "The art of Life!...How to live"
- `metadata` / verification_notes / other / "all accurate" -> disciplines/would/Life!; sidebar brown/tan not red; running header
- `notes` / Second Thoreau Quote / transcription / "the discipline" -> "the disciplines"
- `notes` / Thoreau Quote from Journal / transcription / "The art of Life" -> "The art of Life!"

### page-175-176 — legibility: clear — 7 corrections
- `metadata` / left_page.raw_text / transcription / dropped "My mother's birthstone was amethyst." -> restored between rubies and aquamarine sentences
- `metadata` / left_page.sidebar.text / value / "have sold at auctions for six figures" -> "have prices near, or exceeding, six figures"
- `metadata` / key_elements.family_birthstones / transcription / no mother -> added mother: Amethyst
- `metadata` / verification_notes / other / "(six figures...)" -> mother amethyst added; sidebar correction; "red specs"/"smokey quartz" verbatim
- `notes` / Family Birthstones list / transcription / (none) -> added "Mother: Amethyst"
- `notes` / Sidebar quote / value / "have sold at auctions for six figures" -> "have prices near, or exceeding, six figures"
- `notes` / Verification Status / other / "(six figures...)" -> mother amethyst; sidebar corrected

### page-201-202 — legibility: clear — 7 corrections
- `metadata` / right_page.items[0].name (gold nugget weight) / value / "351.65 gram" -> "351.61-gram"
- `metadata` / key_elements.treasure_items (gold nugget weight) / value / "351.65g" -> "351.61g"
- `metadata` / verification_notes (gold nugget weight) / value / "351.65g" -> "351.61-gram"
- `metadata` / left_page.items[0] (Bali rings left/right) / transcription / right=Balinese style; left=pink ruby SWAPPED -> right=Balinese birds'-beak; left=large pink ruby
- `metadata` / verification_notes (Bali rings) / transcription / generic -> right ring birds'-beak; left ring pink ruby
- `notes` / Right Page heading + Verification (weight) / value / "351.65 Gram" -> "351.61-Gram"
- `notes` / Left Page (Bali rings) / transcription / pink ruby on right -> right ring Balinese birds'-beak; left ring pink ruby

### page-012-013 — legibility: clear — 6 corrections
- `metadata` / left_page.raw_text / transcription / "the fundamental treasure everyone of us seek are all the same" -> "the fundamental treasures every one of us seeks are all the same"
- `metadata` / left_page.formatted_sections[1].text / transcription / same -> same fix
- `metadata` / left_page.formatting.emphasized_text[0].text / transcription / same -> same fix
- `metadata` / right_page.raw_text / transcription / "While inspired by ideas for new and special items" -> "While inspired ideas for new and special items"
- `metadata` / verification_notes / other / "all transcriptions accurate" -> documents two fixes; "It were as if" kept verbatim
- `notes` / Key Philosophy quote / transcription / "treasure everyone of us seek" -> "treasures every one of us seeks"

### page-030-031 — legibility: clear — 6 corrections
- `metadata` / right_page.formatted_sections[sidebar].text / caption / "gold box once used to store betel nut" -> "gold double lotus ring with blue inset glass"
- `metadata` / right_page.images[0].description / image-description / "Gold box (betel nut container)" -> gold double lotus ring with blue inset glass, black background, pre-Angkor
- `metadata` / right_page.images[0].potential_clues / image-description / "Gold box ..." -> "Gold double lotus ring with blue inset glass ... pre-Angkor, present-day Vietnam"
- `metadata` / chapter_title / name / "The 100 Gold Rings of Tuyet Nguyet" -> "The 100 Rings of Tuyet Nguyet"
- `metadata` / verification_notes / other / "12 rings + gold box ... accurate" -> sidebar/image corrections + book-error context
- `notes` / Right Page (31) sidebar bullet / caption / "Gold box ... betel nut" -> "gold double lotus ring with blue inset glass (photographed item is the ring)"

### page-050-051 — legibility: clear — 6 corrections
- `metadata` / right_page.sidebar.text / transcription / "The largest most flawless emeralds ... It is now in our Treasure" -> "This 96-carat emerald was discovered there. It is now in our treasure."
- `metadata` / right_page.sidebar.style / other / "red_italic" -> "brown_bold"
- `metadata` / key_elements.treasure_item_confirmed.description / value / "largest most flawless emeralds" -> "this 96-carat emerald was discovered there"
- `metadata` / verification_notes / caption / "in treasure ... accurate" -> exact sidebar wording; layout (one image right, none left)
- `notes` / right_page sidebar quote / transcription / "largest most flawless emeralds ... our Treasure" -> "This 96-carat emerald ... our treasure."
- `notes` / Verification Status quote / transcription / "in our Treasure" -> "in our treasure."

### page-070-071 — legibility: clear — 6 corrections (FLAGGED)
- `metadata` / right_page.sidebar.text / caption / "This is a signed photograph of Amelia Earhart now in our treasure" -> "(Opposite page) This is a signed photograph of Amelia Earhart now in our treasure."
- `metadata` / right_page.sidebar.style / other / "red_italic" -> "brown_sepia_bold, 'Opposite page' in italics"
- `metadata` / left_page.images[0].description / image-description / "standing next to/on her airplane, flight jacket" -> "perched/sitting on the fuselage, flight suit/coveralls, looking back over shoulder"
- `metadata` / left_page.images[0].potential_clues / image-description / "Signed photograph ... treasure item" -> added "no visible signature in this reproduction"
- `metadata` / verification_notes / other / "all accurate" -> verbatim verification + caption/photo corrections
- `notes` / Left Page photo + SIDEBAR / caption / "standing next to airplane / flight jacket; ... now in our treasure" -> "perched/sitting on fuselage / coveralls; (Opposite page) ... now in our treasure."

### page-088-089 — legibility: clear — 6 corrections
- `metadata` / left_page.raw_text / transcription / abridged with ellipses -> full verbatim incl. "These early Spanish explorers weren't the only ones..."
- `metadata` / left_page.raw_text / book-misprint-noted / "wielded a far-reaching ... influence" -> "welded a far-reaching ... influence" (book misprint, restored)
- `metadata` / right_page.raw_text / transcription / "mystery for our visitors." -> "mystery for our visitor."
- `metadata` / right_page.images[0].description / image-description / "carved stone heads" -> single carved stone tenon head; photo band across top
- `metadata` / verification_notes / other / "all accurate" -> verbatim re-transcription; "welded" misprint; "visitor" fix; single head
- `notes` / Image description / image-description / "carved stone heads" -> single carved stone tenon head; photo band

### page-159-160 — legibility: clear — 6 corrections
- `metadata` / right_page.sidebar.text / book-misprint-noted / "green Colombian emerald" -> "green Columbian emerald" (book misprint, restored)
- `metadata` / right_page.sidebar.style / other / "red_italic" -> "brown_bold_sans"
- `metadata` / right_page.raw_text / book-misprint-noted / "for a while. Was there a punchline" -> "for a while.Was there a punchline" (book typo: no space)
- `metadata` / verification_notes / other / (none) -> documents "Columbian" spelling, missing-space typo, sidebar style
- `notes` / Sidebar value + heading / book-misprint-noted / "(Red Italic) ... 'Colombian emerald'" -> "(Brown Bold Sans-Serif) ... 'Columbian emerald'" w/ misprint note
- `notes` / Verification Status / other / (none) -> records two book misprints + sidebar style

### page-177-178 — legibility: clear — 6 corrections
- `metadata` / right_page.images[0] (location) / image-description / image under right_page; right_page content_type 'mixed' -> moved to left_page; left 'mixed', right 'text' with empty images
- `metadata` / left_page.images[0].description / image-description / "person walking through field with birds, silhouette against sky" -> ink-style figure mid-air, arms outstretched, falling/diving pose amid ink spatter
- `metadata` / left_page.content_type / other / "text" -> "mixed"
- `metadata` / right_page.content_type / other / "mixed" -> "text"
- `metadata` / verification_notes / image-description / "silhouette walking with birds" -> illustration on LEFT (177), falling/diving pose; right is all text
- `notes` / Verification Status / image-description / "silhouette walking with birds" -> illustration on LEFT (177), falling/diving pose; right all text

### page-211-back — legibility: clear — 6 corrections
- `metadata` / back_cover.description / image-description / "crossed hammer and pickaxe" -> "crossed shovel and pickaxe" (red distressed/stamp-style circle)
- `metadata` / key_elements.potential_clues[1] / image-description / "Hammer and pickaxe logo" -> "Shovel and pickaxe logo"
- `metadata` / verification_notes / image-description / "hammer and pickaxe ... accurate" -> left tool is a shovel (D-handle, wide flat blade), right is pickaxe
- `notes` / Back Cover Logo / Significance / image-description / "hammer and pickaxe" -> "shovel and pickaxe"
- `notes` / Potential Clues table row / image-description / "Hammer and pickaxe logo" -> "Shovel and pickaxe logo"
- `notes` / Verification Status / image-description / "hammer and pickaxe ... accurate" -> shovel + pickaxe; left tool is a shovel

### page-024-025 — legibility: clear — 5 corrections
- `metadata` / left_page.images[0].description / image-description / "Three views (blue, red UV, blue angle)" -> two views (top reddish/orange under UV, bottom pale blue under normal light)
- `metadata` / left_page.images[0].potential_clues / image-description / "Three perspectives" -> "Two views (red under UV, blue under normal light)"
- `metadata` / verification_notes / other / "Three sapphire views" -> two views; exact sidebar UV quote; right header/page 25
- `notes` / Page 24 Image Description / image-description / "Three views" -> two views (top reddish/orange UV, bottom pale blue)
- `notes` / Verification Status / image-description / "Three sapphire views" -> two views

### page-044-045 — legibility: clear — 5 corrections
- `metadata` / right_page.sidebar.text / in-treasure-flag / "(just in our Treasure)" -> "(not in our treasure)"
- `metadata` / right_page.images[0].potential_clues / in-treasure-flag / "is in the treasure" -> "is NOT in the treasure"
- `metadata` / key_elements.third_imperial_egg.in_treasure / in-treasure-flag / true -> false
- `metadata` / verification_notes / in-treasure-flag / "confirms egg in treasure" -> "(not in our treasure)" — egg is NOT in treasure
- `notes` / author-weakness quote / other / "dealing with details to be one of my greatest challenges" -> "noticing details has never been a strength of my own" (verbatim)

### page-048-049 — legibility: clear — 5 corrections
- `metadata` / left_page.raw_text / transcription / "replied Rob of-dad." -> "replied Rob's dad."
- `metadata` / right_page.sidebar.text / caption / "Rob Lavinsky holds a giant specimen" -> "Here Rob Lavinsky holds a gold specimen called 'The Flame' from the Red Ridge Mine."
- `metadata` / right_page.images[0].description / image-description / "giant mineral specimen" -> "gold mineral specimen"
- `metadata` / verification_notes / other / "'The Flame' ... accurate" -> caption "gold" not "giant"; "replied Rob's dad."
- `notes` / Right Page image caption / caption / "'The Flame' specimen" -> "'The Flame' gold specimen (verbatim caption)"

### page-060-061 — legibility: clear — 5 corrections
- `metadata` / left_page.raw_text / transcription / "rejected at nauseam" -> "rejected ad nauseam"
- `metadata` / left_page.raw_text / transcription / "second-guess his dreams" -> "second guess his dreams"
- `metadata` / right_page.images[0].description / image-description / "Black and white ... dancers in flowing movements" -> line-and-wash figures w/ poles, color accents (red, orange/gold) at necks/wrists
- `metadata` / verification_notes / other / "all accurate" -> ad nauseam; second guess; refined image; headers
- `notes` / Right Page Content image description / image-description / "Black and white dancers in flowing movements" -> elongated figures w/ poles, color accents at necks/wrists

### page-074-075 — legibility: clear — 5 corrections
- `metadata` / left_page.raw_text (Only Baggage final line) / transcription / "Atalante of the Air!" -> "Atalanta of the Air!"
- `metadata` / right_page.raw_text / transcription / "Amelia's curiosity and steadfast exploration" -> "Amelia's curiosity for exploration"
- `notes` / Left Page poem quote / transcription / "Atalante of the Air" -> "Atalanta of the Air"
- `notes` / Left Page Potential Clues / transcription / "Atalante of the Air" -> "Atalanta of the Air"
- `metadata` / verification_notes / other / "all accurate" -> fixed Atalanta + "curiosity for exploration"; pure text spread

### page-195-196 — legibility: clear — 5 corrections
- `metadata` / right_page.raw_text / transcription / "—BASHO MATSUO" -> "—BASHŌ MATSUO" (macron, verbatim)
- `metadata` / right_page.formatted_sections[3].attribution / name / "Basho Matsuo" -> "Bashō Matsuo"
- `metadata` / verification_notes / name / "Basho Matsuo quote" -> "Bashō Matsuo quote; page prints 'BASHŌ MATSUO' with a macron"
- `notes` / Quotes:2 attribution / name / "Basho Matsuo" -> "Bashō Matsuo"
- `notes` / Verification Status / name / "Basho Matsuo quote" -> "Bashō Matsuo quote; page prints 'BASHŌ MATSUO' with a macron"

### page-034-035 — legibility: clear — 4 corrections (FLAGGED)
- `metadata` / left_page.raw_text / transcription / "cured in myth" -> "curated in myth"
- `metadata` / left_page.raw_text / transcription / "...daughter of an immortal Naga-king." -> restored "It was from this union of immortal blood that the Khmer kings claimed they had descended. ..."
- `metadata` / right_page.raw_text / transcription / "ways to dissociate and defend against invaders" -> "ways to dissuade and defend against invaders"
- `metadata` / verification_notes / book-misprint-noted / generic note -> three fixes; records book typo "maritime culture know as Champa" (omits 'n') kept verbatim

### page-036-037 — legibility: clear — 4 corrections
- `metadata` / right_page.raw_text / value / "a 30,000-foot view" -> "a 36,000-foot view"
- `metadata` / verification_notes / other / "advice accurate" -> documents 36,000-foot correction; chapter-title caveat
- `notes` / Right Page altitude view / value / "30,000-foot view" -> "36,000-foot view"
- `notes` / Potential Clues altitude / value / "30,000-foot view" -> "36,000-foot view"

### page-064-065 — legibility: clear — 4 corrections
- `metadata` / right_page.sidebar.text / transcription / "a raindrop of Lauren's 'Cleopatra's Vault'" -> "a variation of Lauren's \"Cleopatra's Vault\""
- `metadata` / right_page.sidebar.text / transcription / missing "(Opposite page)" prefix -> added
- `metadata` / right_page.sidebar.text / transcription / "Its estimated value is over $45,000" -> "It's estimated value is over $45,000." (book grammar verbatim)
- `metadata` / verification_notes / book-misprint-noted / (none) -> records book prints contraction "It's estimated value", kept verbatim

### page-078-079 — legibility: clear — 4 corrections
- `metadata` / left_page.raw_text / transcription / abbreviated w/ ellipses -> full verbatim (7 paragraphs)
- `metadata` / left_page.raw_text / transcription / "retain more of their original cultural" -> "retain more of their original culture"
- `metadata` / right_page.raw_text / transcription / abbreviated w/ ellipses -> full verbatim (8 paragraphs)
- `metadata` / verification_notes / other / "all accurate" -> verbatim re-transcription; "culture" fix; text-only spread; no misprints

### page-097-098 — legibility: clear — 4 corrections
- `metadata` / right_page.raw_text / transcription / "accepted Mr. Kennedy." -> "accepted Mr. Kennedy's."
- `metadata` / right_page.formatted_sections[1].text / transcription / "accepted Mr. Kennedy." -> "accepted Mr. Kennedy's."
- `notes` / Right Page (98) Content quote / transcription / "accepted Mr. Kennedy." -> "accepted Mr. Kennedy's."
- `metadata` / verification_notes / other / "caption all accurate" -> "Mr. Kennedy's" possessive; "Its going to be alright" (no apostrophe) is book's own text

### page-141-142 — legibility: clear — 4 corrections (FLAGGED)
- `metadata` / left_page.sidebar.text / transcription / "1996 Atlanta Olympics" -> "1996 Atlanta Olympic" (book prints singular, verbatim)
- `metadata` / left_page.sidebar.style / other / "red_italic" -> "brown_bold"
- `metadata` / verification_notes / book-misprint-noted / "all accurate" -> records singular "Olympic" misprint; caption is brown bold in right margin
- `notes` / Sidebar quote / transcription / "1996 Atlanta Olympics" -> "1996 Atlanta Olympic (book prints singular 'Olympic')"

### page-187-188 — legibility: clear — 4 corrections
- `metadata` / key_elements.modern_myths_debunked / key-elements / "[10% of brains, mice/cheese, groups differ]" -> "[myth of division by race/religion/culture/political affiliation]" (others hallucinated, removed)
- `metadata` / left_page.formatting.has_quotes / other / false -> true (page contains quoted questions)
- `metadata` / left_page.formatting.emphasized_text / other / [] -> ["should" (italicized in 'Dad, what should we do?')]
- `metadata` / verification_notes / other / "all accurate" -> running heads, italics, corrected myths list, has_quotes change

### page-191-192 — legibility: clear — 4 corrections (FLAGGED)
- `metadata` / right_page.sidebar.style / value / "red_italic" -> "brown_bold"
- `metadata` / right_page.images[0].description / image-description / "abstract geometric figures and a house" -> Cubist townscape; large white dove + smaller flying bird; spiral motif
- `metadata` / right_page.images[0].potential_clues / key-elements / [] -> ["Dove imagery tied to Picasso's chalk dove mural", "Cubist town/village"]
- `metadata` / verification_notes / other / "cubist illustration ... all accurate" -> sidebar style fix; image expanded w/ doves

### page-199-200 — legibility: clear — 4 corrections
- `metadata` / left_page.items[0].value / value / "up to $3000 plus per carat" -> "up to $1000 plus per carat"
- `metadata` / verification_notes / value / "$3000+ per carat ... accurate" -> $3000->$1000 per-carat correction
- `notes` / Left Page (199) value bullet / value / "Up to $3000+ per carat" -> "Up to $1000+ per carat"
- `notes` / Verification Status / value / "$3000+ per carat ... accurate" -> $3000->$1000 correction

### page-203-204 — legibility: clear — 4 corrections
- `metadata` / left_page.items[0].symbolism / transcription / "protect wearer ... mediate between wearer and spiritual world" -> "protect its owner ... mediate between its wearer and the spiritual world"
- `metadata` / right_page.items[1].note / transcription / "Vikings were first people to sail to North America" -> adds "Most Scandinavians were not Vikings ..." and "refined in appearance and hygiene"
- `notes` / Left Page symbolism / transcription / "protect wearer / mediate between wearer" -> "protect its owner / mediate between its wearer and the spiritual world"
- `notes` / Historical Note quotes / transcription / paraphrased Viking/Tolkien quotes -> printed wording + omitted "Most Scandinavians were not Vikings" / "refined in appearance and hygiene"

### page-207-208 — legibility: clear — 4 corrections
- `metadata` / postscript_content.hunting_safety.wildlife / transcription / "bears, poisonous snakes, buffalo, moose during mating season" -> "...buffaloes, moose, or even elk during mating season" (elk restored; buffaloes)
- `metadata` / verification_notes / transcription / "buffalo, moose" -> "bears (carry bear spray), poisonous snakes, buffaloes, moose, or even elk during mating season"
- `notes` / Wildlife bullet list / transcription / "Buffalo / Moose (mating season)" -> added "Elk"; "Buffaloes"; mating-season qualifier moved to collective
- `notes` / Winter Warning quote / transcription / "Will be impossible to find any of the five treasure boxes..." -> "It will be impossible to find any of the five treasure boxes..."

### page-016-017 — legibility: clear — 3 corrections
- `metadata` / left_page.raw_text / transcription / "Each chapter of Part One is centered by the history" -> "Each chapter of Part One is curated by the history"
- `metadata` / left_page.formatted_sections[1].text / transcription / "centered by the history" -> "curated by the history"
- `metadata` / verification_notes / other / "all key phrases confirmed" -> documents "centered by" -> "curated by"

### page-026-027 — legibility: clear — 3 corrections
- `metadata` / right_page.formatted_sections[sidebar].text / book-misprint-noted / "Tuyet Nguyet's collection. @ Sotheby's" -> "Tuyget Nguyet's collection. © Sotheby's" (book misprint "Tuyget" restored; © glyph)
- `metadata` / verification_notes / book-misprint-noted / generic note -> documents "Tuyget" misprint and @ -> © correction
- `notes` / Right Page (27) Sidebar line / book-misprint-noted / "Tuyet Nguyet's ... @ Sotheby's" -> "Tuyget Nguyet's ... © Sotheby's" (book misprints "Tuyget")

### page-040-041 — legibility: clear — 3 corrections (FLAGGED)
- `metadata` / right_page.images[1] (second image) / image-description / only one image (metal box); Japanese puzzle box missing -> added second image (Japanese wood-inlay/yosegi puzzle box, bottom-right of page 41)
- `metadata` / right_page.images[0].description / image-description / "metal puzzle box with brass and iron work" -> metal chest, cream brass panels, dark iron framing, central lock plate/keyhole
- `notes` / Right Page (41) Potential Clues image list / image-description / only largest treasure box -> added second photo (Japanese yosegi puzzle box)

### page-121-122 — legibility: clear — 3 corrections
- `metadata` / left_page.raw_text / transcription / "the final shot went up" -> "the foul shot went up"
- `metadata` / right_page.raw_text / transcription / "too rare a trial" -> "too rare a trait"
- `metadata` / verification_notes / other / (changelog) -> documents foul shot + too rare a trait fixes

### page-137-138 — legibility: clear — 3 corrections
- `metadata` / right_page.images[0].description / image-description / "running/hurdling at Olympics" -> sprinting on track before packed crowd; no hurdles; no caption
- `metadata` / right_page.images[0].potential_clues / image-description / "Wilma Rudolph Olympic photo" -> "Wilma Rudolph Olympic sprinting photo"
- `notes` / Right Page (138) Content / image-description / "running/competing" -> sprinting before packed crowd; no hurdles; no caption

### page-139-140 — legibility: clear — 3 corrections (FLAGGED)
- `metadata` / left_page.raw_text / transcription / "What are you nativoes doing out on the street?" -> "What are you natives doing out on the street?"
- `metadata` / verification_notes / book-misprint-noted / (none) -> records "nativoes"->"natives" fix and book's "Negros" misprint (preserved verbatim)
- `notes` / Racism Experiences: Hawaii quote / transcription / "nativoes" -> "natives"

### page-153-154 — legibility: clear — 3 corrections
- `metadata` / left_page.formatting.has_quotes / other / false -> true (quoted chapter title "George Washington")
- `metadata` / left_page.formatting.emphasized_text / other / [] -> ["George Washington could never tell a lie"] (italicized)
- `metadata` / left_page.images[0].description / image-description / "open book with cherry tree and branches" -> pen-and-ink sketchbook tree w/ red cherries + desk objects

### page-155-156 — legibility: clear — 3 corrections
- `metadata` / left_page.raw_text / transcription / "just fled southward across the Delaware River" -> "had just fled southwest across the Delaware River"
- `metadata` / right_page.raw_text / transcription / "a hastered and full-blown retreat" -> "a hastened and full-blown retreat"
- `notes` / Crossing the Delaware bullet / transcription / "Fled southward" -> "Fled southwest"

### page-018-019 — legibility: clear — 2 corrections
- `metadata` / right_page.raw_text / transcription / "His bright-blue eyes" -> "His bright blue eyes" (no hyphen)
- `metadata` / verification_notes / other / "all transcriptions accurate" -> records bright-blue -> bright blue; confirms display label and quotes

### page-111-112 — legibility: clear — 2 corrections
- `metadata` / right_page.raw_text / transcription / "As if it is easy to imagine" -> "As it is easy to imagine" (spurious "if" removed)
- `metadata` / verification_notes / other / (changelog) -> "As it is easy to imagine..."; "on the river to sleuth or on land to dig" verbatim; page 112

### page-123-124 — legibility: clear — 2 corrections
- `metadata` / right_page.raw_text / transcription / "—C.S. LEWIS" -> "—C. S. LEWIS" (space between initials)
- `metadata` / verification_notes / other / (none) -> records "—C. S. LEWIS" spacing correction

### page-131-132 — legibility: clear — 2 corrections
- `metadata` / left_page.raw_text / transcription / "exclaiming some great attributes" -> "extolling some great attributes"
- `metadata` / verification_notes / other / "all accurate" -> "extolling" fix; "a permission to fail" and two-word "every thing" kept verbatim

### page-052-053 — legibility: clear — 1 correction
- `metadata` / left_page.raw_text / transcription / "emeralds were the only gemstone found in them" -> "emeralds were the only gemstones found in them"

### page-054-055 — legibility: clear — 1 correction
- `metadata` / key_elements.author_personal.childhood_memory / value / "forty years ago" -> "some forty plus years ago"

### page-099-100 — legibility: clear — 1 correction
- `metadata` / verification_notes / book-misprint-noted / "Grand Central Station ... accurate" -> records book prints "Grand Central Station"; actual landmark is "Grand Central Terminal" (transcribed as printed)

### page-169-170 — legibility: clear — 1 correction
- `metadata` / left_page.raw_text / transcription / "first began travelling into space" -> "first began traveling into space"

### page-179-180 — legibility: clear — 1 correction
- `metadata` / right_page.raw_text / transcription / "myths helped fill the gap" -> "myths helped fill the gaps"

## Uncertainties / illegible regions

Pages with recorded uncertainties (regions hard to read, ambiguous glyphs, or readings that required upscaled crops):

- **page-022-023** — caption color descriptor changed red_italic -> brown_bold based on upscaled crop; the named color is a judgment call (caption TEXT unchanged/unambiguous).
- **page-105-106** — upper bar stamped number reads approximately "1591" but appears inverted/mirrored; right-page phrase "still fill an extra the crevices" is an awkward apparent book typo transcribed verbatim.
- **page-080-081** — left page number (80) faint/cut off; inferred from facing page 81.
- **page-189-190** — sidebar/epigraph text low-resolution; all readings confirmed via 4-5x upscaled crops; original render not crisp at full size.
- **title-page** — faint italic text on the red diamond largely illegible (only fragments read); portrait on red document not identified with certainty.
- **page-014-015** — green Olympic ribbon embroidery: "Atlanta" partly obscured by overlapping gold items; only "...ia 1996" plus the logo clearly legible.
- **page-020-021** — printed page numbers (20/21) not legible in scan margins; retained from filename; "four more times" pitch detail is a summarization, not a verbatim phrasing.
- **page-038-039** — none recorded for legibility (clean fixes).
- **page-070-071** — none recorded (the style mismatch is flagged under needs-attention).
- **page-050-051** — a phantom caption ("Here Rob Lavinsky holds a gold specimen called 'The Flame'...") appeared on first read then vanished on re-reads; treated as a PNG alpha-channel rendering artifact and NOT added.
- **page-066-067** — sidebar "style" recorded as red_italic but ink reads brownish-tan/gold (descriptor, not transcribed text, left unchanged); "Noppakao" italicized in body, kept plain in raw_text and noted.
- **page-088-089** — notes "Content" cites "16th century" and "10,000+ feet elevation" not printed on the page (page says "into the 19th and 20th centuries" and "high altitudes of the Andes Mountains"); left as interpretive context.
- **page-129-130** — sidebar caption color is brown/tan (style field still reads red_italic; text content correct); running header omitted from raw_text per layer convention.
- **page-193-194** — notes "Chapter 22 Summary" lists pendant attributes (23-karat gold, "39 made/20 to public", "Madoura, France") not printed on these pages; "Nicolas = great-great-grandson of Victor Hugo" inconsistent with the page (François is the great-grandson, Nicolas his grandson); left as cross-chapter synthesis but flagged; running headers excluded per convention.
- **page-201-202** — gold-nugget weight digit (351.61 vs 351.65) and ring left/right attribution required high-zoom crops; now read with confidence.
- **page-034-035** — red-italic left-margin sidebar caption partially in the binding gutter; opening characters not fully resolvable (the "of"/"at" misread is flagged under needs-attention).
- **page-036-037** — no chapter title printed on this spread; metadata chapter_title "The 100 Gold Rings..." vs CLAUDE.md "The 100 Rings..." not verifiable from this image; left unchanged.
- **page-191-192** — page numbers 191/192 faint/cropped at the page foot; retained from chapter mapping.
- **page-185-186** — sidebar "style" labeled red_italic but the caption is tan/brown bold sans-serif (descriptor, left unchanged); "newborn" (one word) on left page vs "new born" (two words) on right page both transcribed exactly as printed.
- **page-026-027** — right-page body raw_text intentionally a partial opening-excerpt ending in "..."; ring gemstone color ordering in notes differs from top-to-bottom image order (free-text description, not a transcription field).
- **page-099-100** — running heads visible but excluded from raw_text per layer convention.
- **page-107-108** — running head on the dark/black left page not legible against the black background (not a stored field); a lower gold object shows faint scratch-like marks not clearly legible.
- **page-101-102** — left-page "the La Luz" label and "Montevideo, Uruguay" are contextual inferences, not printed on the illustration; the decorative compass rose and birds not explicitly described.
- **page-056-057** — "one of 4 pieces in treasure" is an analytical claim, not text printed on the page.
- **page-076-077** — maker "Charles Loloma" is an analytical identification, not printed on the page (left page has no caption).
- **page-072-073** — running headers present but marked has_header=false (standard running headers, classification choice, not a transcription error).
- **page-133-134** — faint artist/sculptor signature inscription on the medal edge (appears to read "...PETRASSI..."), partially legible; not transcribed or misrepresented.
- **page-135-136** — a sliver of the facing page's (137) gold-medal photo bleeds onto the bottom-right edge of page 136; not part of 136 content, intentionally not added.
- **page-205-206** — none beyond confirming verbatim transcription.
- **page-157-158** — leading characters of the red-italic sidebar slightly clipped by the crop margin; full intended text unambiguous from context.
- **page-127-128** — book's own grammar error "an influential part my life" (missing "of") transcribed verbatim and flagged in verification_notes.
- **page-091-092**, **page-103-104**, **page-145-146**, **page-149-150** — no uncertainties recorded (clean verifications; some note running heads / "Atlanta area" interpretive items left as analysis).

## Closing note

This file is the audit trail for the pages/ faithfulness pass. The corrected files carry no inline markers — review the actual changes with `git diff pages/`. Downstream layers (chapters/, wiki/, reports) were built on the OLD pages/ data and may warrant a re-check against the corrected transcriptions, especially where load-bearing facts changed (for example: the author's childhood church is "Statesville, NC" not "Huntersville, NC"; the puzzle box on page 38 and the 3rd Imperial Egg on page 44 are NOT in the treasure; several carat/dollar/date values and museum/attribution names were corrected).
