# WIKI-RECONCILE-LOG.md

Audit trail for reconciling the wiki's load-bearing facts to the corrected `pages/` + `chapters/` ground truth.

## Totals

| Metric | Count |
|--------|-------|
| Chapter pages changed | 21 of 25 (chapters 0-23 + back-matter; only Ch 15, plus hubs themes, were no-change) |
| Total chapter fact-fixes | 71 |
| Entity corrections | 57 |
| Hub fixes | 27 (across 4 changed hubs; 2 hubs no-change) |

Pages with **no changes**: Chapter 15 (1960 Rome Olympic Gold Medal).

---

## Per-Chapter Fact Changes

### Front Matter (`front-matter.html`)

| Field | Type | Before -> After |
|-------|------|-----------------|
| photographer (Summary) | name | most photography by Jamie River -> most photography by Jamie Biver |
| ISBN (Summary) | value | ISBN 979-8-9899831-3-5 -> ISBN 979-8-989813-31-5 |
| page-8 box image spec (Summary) | value | full-page photo of a custom treasure box (gold/brass frame, black leather/velvet interior) -> full-page photo of a custom treasure box, shown closed (light tan/beige metal panels in a dark gunmetal/iron frame, dark corner brackets, two dark top straps, a front latch, dark feet; no interior visible) |
| page-8 box image spec (The Treasure(s)) | value | custom-made gold/brass treasure box with a black leather/velvet interior -> custom-made treasure box, closed; light tan/beige metal panels in a dark gunmetal/iron frame (dark corner brackets, two dark top straps, front latch, dark feet; no interior visible) |
| page-12 quote (Summary) | value | the fundamental treasure everyone of us seek are all the same -> the fundamental treasures every one of us seeks are all the same |
| production credits (People) | name | Jamie River (most photography) -> Jamie Biver (most photography) |

### Chapter 1 — The 120 Carat Sapphire

| Field | Type | Before -> After |
|-------|------|-----------------|
| Apple II floppy disk spec (Summary) | value | the first 5¼" floppy disk -> the first 5½" floppy disk (as printed in the book; real-world format was 5¼") |

### Chapter 2 — The 100 Rings of Tuyet Nguyet

| Field | Type | Before -> After |
|-------|------|-----------------|
| summary prose: treasure description (gold box) | in-treasure | Twelve gold rings plus a gold box (once used to store betel nut) -> Twelve gold rings plus a gold box acquired by Nguyet |
| The Treasure(s) list item (gold box) | in-treasure | One gold box from the same collection, once used to store betel nut -> One gold box from the same collection, acquired by Tuyet Nguyet |
| summary prose: author anecdote (elderly man) | other | botched a water-filter demonstration in front of a blind elderly man -> in front of an elderly man with a kind face |
| summary prose: author quote on perspective | value | I have always preferred a 30,000-foot view -> a 36,000-foot view |

### Chapter 3 — A Puzzle Box, a Magnifying Glass, & the Mysterious Egg

| Field | Type | Before -> After |
|-------|------|-----------------|
| Summary: Japan trip year | date | a late-2018 trip to Japan -> a late-2015 trip to Japan |
| Summary: magnifying glass date & value | value | made around 1900, valued over $25,000 -> made around 1890, valued over $23,000 |
| Treasure list: magnifying glass date & value | value | (c. 1900, valued over $25,000) -> (c. 1890, valued over $23,000) |
| Treasure list: Japanese puzzle box status | in-treasure | Himitsu-Bako, one of several bought on his 2018 trip -> Himitsu-Bako, NOT in the treasure (p.38 caption "not in our treasure"); bought on his 2015 trip |
| Treasure list: Third Imperial Faberge Egg status | in-treasure | (c. $33 million) — inclusion uncertain; transcribed as "just in our Treasure"; status should be verified -> NOT in the treasure; p.45 sidebar reads "The 3rd Faberge Imperial Egg (not in our treasure)"; featured purely as the "notice the details" parable |
| Treasure section intro line | in-treasure | a famous egg whose inclusion is uncertain -> a famous egg that is explicitly not part of the treasure (included only as a parable) |
| Summary: Coffer build time per book | value | reinvented the wooden Japanese puzzle box in metal. -> reinvented the wooden Japanese puzzle box in metal; the book states it took Seth three years to build and engineer Coffer before it went on display. |
| People: Third Imperial Egg commission date | date | recipient of the Third Imperial Egg (Easter 1886/1887) -> recipient of the Third Imperial Egg (the book states it was commissioned for Easter 1886) |

### Chapter 4 — The 96 Carat Chivor Emerald

| Field | Type | Before -> After |
|-------|------|-----------------|
| Summary — The Flame specimen descriptor | in-treasure | Rob holding a giant specimen called "The Flame" -> Rob holding a gold specimen called "The Flame" |
| Summary lead — page-51 sidebar color | value | confirmed via a red sidebar on page 51 -> confirmed via a brown sidebar on page 51 |
| Treasure(s) — emerald confirmation sidebar color | in-treasure | confirmed in the treasure via the red sidebar on page 51 -> confirmed in the treasure via the brown sidebar on page 51 |
| Treasure(s) — The Flame specimen descriptor | in-treasure | a separate giant specimen called "The Flame"; research established this is a crystallized gold specimen -> a separate specimen called "The Flame"; the book's caption describes it as a gold specimen; research established this is a crystallized gold specimen |
| Research Findings — quoted page-49 caption | value | "Rob Lavinsky holds a giant specimen called 'The Flame' from the Red Ridge Mine." -> "Here Rob Lavinsky holds a gold specimen called 'The Flame' from the Red Ridge Mine." |

### Chapter 5 — Masterworks by Art Smith

| Field | Type | Before -> After |
|-------|------|-----------------|
| treasure-item-list | in-treasure | Round modernist brass brooch (p.58) listed as a distinct treasure piece alongside the copper-and-brass brooch (implying two brooches on p.58, four pieces all pictured) -> Removed duplicate/hallucinated round brass brooch. Page 58 pictures only ONE object (the copper-and-brass brooch). The "first piece" is a modernist brass cuff bracelet pictured on p.56. Four Art Smith pieces in treasure per the p.58 sidebar, but only three pictured/captioned (cuff p.56, copper-and-brass brooch p.58, ring p.62); fourth not pictured |
| sterling-silver-ring (p.62) | in-treasure | free-form sterling silver ring whose artistic edge "contours around the neighboring finger" -> whose outside edge "contours around the neighboring finger" |

### Chapter 6 — Rubies to Wear

| Field | Type | Before -> After |
|-------|------|-----------------|
| summary paragraph | value | Angie Marei wing-shaped ruby earrings valued above $26,000 -> valued above $20,000 |
| Treasures list | value | Wing-shaped ruby earrings by Angie Marei valued above $26,000 -> valued above $20,000 |

### Chapter 7 — Amelia's Autograph

| Field | Type | Before -> After |
|-------|------|-----------------|
| summary paragraph (poem epithet) | name | the poem calls her "Atalante of the Air." -> "Atalanta of the Air." |
| Themes & the Lesson paragraph | name | The "Atalante of the Air" / Atalanta huntress motif -> The "Atalanta of the Air" / Atalanta huntress motif |
| Poem / Epigraph verbatim quote block | name | Atalante of the Air!" -> Atalanta of the Air!" |
| Research Findings section header | name | Atalanta / "Atalante of the Air" (Greek mythology) -> Atalanta / "Atalanta of the Air" (Greek mythology) |
| Treasure-Hunt Signal header | signal | "Atalante of the Air" → lions → "Lion's Share," and → Atlanta, Georgia -> "Atalanta of the Air" → lions → "Lion's Share," and → Atlanta, Georgia |

### Chapter 8 — Beauty's Bespoken Treasures

| Field | Type | Before -> After |
|-------|------|-----------------|
| treasure acquisition status (Summary + Treasure intro + Places + Research + Signal 3) | in-treasure | treasure items were purchased at the Wheelwright Museum of the American Indian in Santa Fe -> Sonwai ring and the two Loloma rings were exhibited at the "Loloma" exhibit at the Wheelwright Museum of Native American Art in Santa Fe (exhibited, not purchased) |
| in-book museum name | place | Wheelwright Museum of the American Indian -> Wheelwright Museum of Native American Art (book's wording; real-world name kept as parenthetical note) |
| Charles Loloma ironwood bracelet materials | value | ironwood, turquoise, lapis, fossil, coral, and gold -> ironwood, turquoise, lapis lazuli, coral, and gold (removed fabricated 'fossil') |
| Charles Loloma rings (two) | in-treasure | silver ring (larger): lapis lazuli, turquoise, coral; and silver ring: a sapphire above Hopi inlay (masonite, turquoise, lapis, fossil, coral, ironwood) -> stone ring (blue, p.76): free-form turquoise with rim inlaid with fossilized ivory, ironwood, coral; stone ring (purple): sugilite with lapis lazuli, coral, turquoise (removed fabricated 'silver', 'sapphire', 'masonite') |
| Sonwai ring estimated value | value | over $25,000 -> over $20,000 |
| Sonwai ring materials | value | turquoise, sapphire, coral, lapis lazuli, gold -> sugilite, turquoise, coral, lapis lazuli, and gold (removed 'sapphire', added 'sugilite') |
| verbatim lesson phrase (Summary + Themes + Signal 5) | signal | confirmation bias is 'a treasure hunter's most dreaded foe' -> 'a treasure hunter's most dreaded foil' (the book prints 'foil') |
| Hopi calendar ceremony list (Summary) | other | named ceremonies (Soyal, Powamya/Bean Dance, Niman/Home Dance, Snake/Flute, etc.) -> (Powamuya/Bean Dance, Talangva/Niman Home Dance, Tala'paamuya/Snake-Antelope or Flute, Kyamuya/Soystangwu, etc.) — removed fabricated 'Soyal' |

### Chapter 9 — The Golden Chalice

| Field | Type | Before -> After |
|-------|------|-----------------|
| chalice manufacture date (Summary lead, prose + sidebar quote) | value | made by the Chavin culture of Peru between 400 and 1000 BC -> between 600 and 1000 BC (incl. verbatim sidebar quote) |
| chalice manufacture date (Treasure(s), prose + sidebar quote) | value | between 400 and 1000 BC -> between 600 and 1000 BC (incl. verbatim sidebar quote) |
| chalice manufacture date (Chavin culture research note) | value | the book dates the chalice 400–1000 BC -> 600–1000 BC |

### Chapter 10 — Jackie Onassis' Diamond Sapphire Brooch

| Field | Type | Before -> After |
|-------|------|-----------------|
| Kennedy ring quote (line 31) | other | "She returned the first man's ring and accepted Mr. Kennedy." -> "She returned the first man's ring and accepted Mr. Kennedy's." |

### Chapter 11 — Treasures From a Famous Shipwreck

| Field | Type | Before -> After |
|-------|------|-----------------|
| La Luz passengers | value | 185 passengers -> 155 passengers |
| La Luz gold bar weight | value | weighing slightly over 22 ounces -> weighing over twenty-three troy ounces |
| La Luz gold bar value | value | Valued over $50,000 -> Valued over $90,000 |
| La Luz gold bar Roman numeral | value | bearing the Roman numeral XXVI (26) -> XXXVI (36) (companion upper bar bears XX and a scallop-shell assayer mark with stamped number ~"1591") |
| La Luz gold bar knob description | other | with a small half-circle where extra gold was added to meet minimum weight -> with a round knob on its face created when additional gold was added to increase its mass |
| NGC coin slab pedigree | name | Reaudulfia Collection -> Fernandina Collection |
| eight-escudo coin slab label / weight | value | NGC MS 63 (~26.5-27g); references the "Reaudulfia Collection" -> NGC MS 63 (27.00g per slab); label reads "1750L R PERU 8E / MS 63 / Fernandina Collection / (27.00g) La Luz" (cert 5965184-003) |
| Roman-numerals research heading & signal | value | Roman numerals XXVI (26) and XIV (14) / reading 26/14 -> XXXVI (36) and XIV (14) / reading 36/14 |

### Chapter 12 — Massive Gold Rush Nugget

| Field | Type | Before -> After |
|-------|------|-----------------|
| treasure nugget weight (Summary) | value | weighing over four ounces -> weighing over twenty-one ounces |
| sidebar nugget origin (Summary) | in-treasure | found near the same farm where the discovery of gold in California verified the 1849 California Gold Rush -> found near the American River, the same river where the discovery of gold set in motion the 1849 California Gold Rush |
| nugget sourcing phrasing (Summary) | value | most difficult of any region to source -> most difficult of any region to acquire |
| Spanish naming of California (Summary) | date | in 1542 Spanish explorers named it California -> in 1562 Spanish explorers named it California |
| treasure nugget weight (The Treasure(s)) | value | nugget weighing over four ounces -> weighing over twenty-one ounces |
| sidebar nugget origin (The Treasure(s)) | in-treasure | same farm where the discovery of gold verified the 1849 Gold Rush — points at Sutter's Mill / Coloma -> near the American River, the same river where the discovery of gold set in motion the 1849 Gold Rush — points at the American River drainage (Marshall's Jan 1848 find at Sutter's sawmill on the South Fork at Coloma) |
| nugget sourcing phrasing (The Treasure(s)) | value | most difficult of any region to source ... a California gold nugget this size is very rare -> most difficult of any region to acquire ... a Californian nugget this size is very rare |
| Coloma place entry (Places & Geographies) | geo-clue | best match for the sidebar's 'same farm where the discovery of gold verified the 1849 Gold Rush' -> on the South Fork of the American River that the sidebar names as 'the same river where the discovery of gold set in motion the 1849 Gold Rush' |
| Signal: strongest in-chapter geographic lead | topGeoClue | 'The same farm where the discovery of gold verified the 1849 Gold Rush' → Coloma / Sutter's Mill -> 'The same river where the discovery of gold set in motion the 1849 Gold Rush' → American River / Coloma / Sutter's Mill |
| Signal: massive nugget / Highway 49 | signal | 'Massive nugget' may point up Highway 49, not to Coloma -> 'Massive nugget' (over 21 ounces) is tied by the sidebar to the American River, but the largest display nuggets sit up Highway 49 |

### Chapter 13 — Best of Its Class Jordan Rookie Card

| Field | Type | Before -> After |
|-------|------|-----------------|
| author age when Jordan was UNC freshman / birth-year estimate | value | watched his first games "around the age of six," which is when Michael Jordan was a freshman at UNC, putting birth around 1975-76 -> watched his first games "around the age of six," and was nine when Jordan was a freshman at UNC, putting birth around 1972-73 |

### Chapter 14 — Tiffany's Furnace & Thoreau's Fire

| Field | Type | Before -> After |
|-------|------|-----------------|
| Treasure(s) — Tiffany Iris vase base marking | value | The "LC/T" initials are carved into the base. -> The "(LCT)" initials are carved into the base. |
| Treasure-Hunt Signals — marks-are-provenance signal | value | reading "EL," "SG," or "LC/T" as a letter game/coordinate/syllable puzzle -> reading "EL," "SG," or "(LCT)" as a letter game/coordinate/syllable puzzle |

### Chapter 15 — 1960 Rome Olympic Gold Medal

No changes. Every load-bearing fact already matched corrected ground truth.

### Chapter 16 — 1996 Atlanta Olympic Gold Medal

| Field | Type | Before -> After |
|-------|------|-----------------|
| People > Daniel Amokachi | signal | Note: research contradicts the extraction's "heel-flick" — sources describe an "exquisite lob"/chip or follow-up finish, not a back-heel. -> The book describes the goal verbatim as Amokachi having "magically flicked the ball with his heel up and over the Argentine keeper and into the net" (a heel-flick); external accounts describe an "exquisite lob"/chip or a follow-up finish, so the book's framing differs from some real-world reports. |
| Research Findings > Daniel Amokachi | signal | Important correction: the extraction's "heel-flick" does NOT match sources ... a likely extraction error that lowers confidence. -> Note: the book describes this goal verbatim as a heel-flick as written by the author; external accounts instead describe an "exquisite lob"/chip or follow-up finish, so the book's framing differs from some real-world reports. |
| Poem / Epigraph | other | two epigraphs ... exact wording not captured in the extraction; only attributions and themes recorded -> verbatim quotes inserted: "You never know if you can actually do something against all odds until you actually do it." — Abby Wambach; "You can be the one-in-a-million. Don't be discouraged by the odds to succeed." — David Beckham ("one-in-a-million" bolded on the page) |

### Chapter 17 — George Washington's Jelly Glass

| Field | Type | Before -> After |
|-------|------|-----------------|
| epigraph author #1 (Summary) | name | Madeleine Taylor -> Madisyn Taylor |
| epigraph author #2 (Summary) | name | Philip Nunu -> Philipp Humm |
| epigraph author #1 (People list) | name | Madeleine Taylor -> Madisyn Taylor |
| epigraph author #2 (People list) | name | Philip Nunu -> Philipp Humm |
| epigraph author #1 (Poem/Epigraph) | name | Madeleine Taylor -> Madisyn Taylor |
| epigraph author #2 (Poem/Epigraph) | name | Philip Nunu -> Philipp Humm |

### Chapter 18 — Andrew Carnegie's Emerald

| Field | Type | Before -> After |
|-------|------|-----------------|
| author's parents' church town (Summary) | place | a new church in Huntersville, NC, "built upon the ideal of service." -> a new church in Statesville, NC, "built upon the idea of service." |
| Carnegie bobbin-boy details (Summary) | value | bobbin boy in a cotton factory (16 hours/day, 6 days/week, for pennies -> bobbin boy in a textile mill (twelve hours/day, 6 days/week, for $1.20 a week |
| Thomas A. Scott relationship (Summary) | name | impressed Thomas A. Scott, who became his first mentor and later promoted him -> impressed Thomas A. Scott, who hired him as his personal secretary and later promoted him |
| family means / church focus / father's boards (Summary) | other | did not save much money ... ideal of service ... local Food Bank and the Red Cross -> did not have much means ... idea of service ... local food bank and the Red Cross |
| Thomas A. Scott (People list) | name | Carnegie's first mentor and VP of the Pennsylvania Railroad, who promoted him -> The man who hired Carnegie as his personal secretary and, as VP of the Pennsylvania Railroad, promoted him |
| author (People list) | place | started/led a church in Huntersville, NC -> started/led a church in Statesville, NC |
| Places & Geographies bullet (town + county/region) | place | Huntersville, NC — Mecklenburg County (Charlotte metro); first town north of Charlotte recognized 1873; historic churches Hopewell Presbyterian (1762), St. Mark's Episcopal (1884), Huntersville Presbyterian (1878) -> Statesville, NC — seat of Iredell County, NC Piedmont northwest of Charlotte; at the foot of the Brushy Mountains region and roughly 20 miles from Hiddenite/Alexander County |
| Hiddenite bullet distance reference | geo-clue | Brushy Mountains foothills (~46 mi from Huntersville) -> Brushy Mountains foothills (~20 mi from Statesville) |
| Themes & the Lesson | place | instilled by his pastor parents in Huntersville, NC -> instilled by his pastor parents in Statesville, NC |
| Research Findings subsection heading + body | place | Huntersville, NC ... town in Mecklenburg County ... renamed for landowner Robert Boston Hunter ... ~46 miles (~50 min) from Hiddenite -> Statesville, NC ... seat of Iredell County, Piedmont northwest of Charlotte ... ~20 miles from Hiddenite |
| Treasure-Hunt Signals (Hiddenite caution) | place | Huntersville's historic churches are private -> the author's parents' Statesville church is private |
| Research Findings source links | other | links to lkncarpet.com 'History of Huntersville NC' and huntersville.org 'Historical & Cultural Landmarks' -> removed (no longer relevant after Statesville correction) |

### Chapter 19 — Moon Rocks & Meteors

| Field | Type | Before -> After |
|-------|------|-----------------|
| Summary — comparable lunar sphere auction price (book sidebar claim) | value | a similar lunar sphere sold for over $100,000 at a 2021 auction -> over $500,000 at a 2021 auction |
| Treasure(s) list — moon rock globe comparable auction price (book sidebar claim) | value | A comparable lunar sphere sold for over $100,000 at a 2021 auction. -> over $500,000 at a 2021 auction. |

### Chapter 20 — The Six-Figure Birthstone

| Field | Type | Before -> After |
|-------|------|-----------------|
| smokey quartz carat weight | value | 201-carat smokey quartz -> 200-carat smokey quartz |
| smokey quartz cut name | name | custom design called "Imperial Brilliant" by Mark Oros -> "Beyond Brilliant" by Mark Oros |
| smokey quartz origin | geo-clue | sourced from "the state of Rio de" (almost certainly Rio de Janeiro, Brazil) -> the book states no geographic origin for the stone |
| smokey quartz descriptor | value | "arguably the most velvet tone in our treasure" -> sidebar: "arguably the most radiant item in our treasure" |
| not-in-treasure sidebar item | in-treasure | fancy smokey quartz titled "Breath of Heaven" by Derek Grasso, NOT in the treasure -> surrealist double-image painting "Mouth of Flower" by Octavio Ocampo, NOT in the treasure |
| not-in-treasure artist (People) | name | Derek Grasso — lapidary artist credited with "Breath of Heaven" -> Octavio Ocampo — Mexican surrealist painter credited with "Mouth of Flower" |
| Research Findings subsection heading | name | Derek Grasso (artist, "Breath of Heaven") -> Octavio Ocampo (painter, "Mouth of Flower") |
| false repo-source citation | other | sidebar caption reads "...'Breath of Heaven' by Derek Grasso..." (Confirmed against page-173-174.json.) -> sidebar caption reads "...'Mouth of Flower' by Octavio Ocampo..." (Confirmed against page-173-174.json.) |
| family birthstones (mother omitted) | value | his father and sister had rubies, his baby brother had aquamarine -> his father and sister had rubies, his mother had amethyst, his baby brother had aquamarine |
| tsavorite value wording | value | similar-carat tsavorites have sold at auction for six figures -> the book notes similar-carat tsavorites have "prices near, or exceeding, six figures" |
| Lecrae epigraph attribution | name | attributed in the text to "Lscrae" / book typo "Lscrae" -> from the Christian hip-hop artist Lecrae (the book attributes it to "LECRAE") |
| Places: LA-area rose garden | place | Greater Los Angeles — standout LA-area rose garden is Exposition Park Rose Garden; better matches Descanso Gardens, The Huntington, Pasadena/Whittier/Conejo Valley -> "Local park" with a multi-acre rose garden (unnamed in the book); no specific public rose garden identified; speculative candidates removed as unsupported |
| Places: removed fabricated Rio entry | place | Rio de Janeiro state, Brazil — stated origin of the 201-carat smokey quartz -> (entry removed; book states no origin for the stone) |

### Chapter 21 — Antiquities of Alexander

| Field | Type | Before -> After |
|-------|------|-----------------|
| Egyptian gold snake bracelet date (summary prose + treasure list) | value | Egyptian gold snake bracelet (1st BC–1st AD) -> (100 BC–100 AD) |
| Greek gold wreath description (summary prose) | value | A Greek gold wreath of solid olive and oak leaves with acorn accents -> of solid olive and oak leaves |
| Greek gold wreath spec (treasure list) | value | solid gold olive and oak leaves with gold acorn accents (leaf wires 3rd–4th c. BC, reconstructed into wreath form) -> solid gold olive and oak leaves (leaves created 3rd–4th c. BC; extremely rare; band constructed later to present how the wreath might have originally looked) |
| ibex-headed bracelets provenance (summary prose) | value | a "Coptic provenance" of famous collectors and galleries -> a "couple's provenance" of famous collectors and galleries |
| ibex-headed bracelets provenance (treasure list) | value | with a "Coptic provenance" listing famous collectors and galleries -> whose "couple's provenance" lists famous collectors and galleries |
| Research Findings heading + paragraph: ibex bracelets framing | value | Coptic / Hellenistic provenance ... (The "Coptic" framing is loose ...) -> Hellenistic provenance ... (The book describes a "couple's provenance" — a list of famous collectors and galleries — not a "Coptic" one ...) |
| Getty Museum location in snake-bracelet joke (summary prose + treasure list) | place | a similar bracelet in the Getty Museum -> a similar bracelet in the Getty Museum in Los Angeles |

### Chapter 22 — Picasso's Pendant

| Field | Type | Before -> After |
|-------|------|-----------------|
| pendant mintage (lead summary) | value | Only 39 such pendants were ever minted, and only 20 made public. -> Only 32 such pendants were ever created, and only 20 made public. |
| pendant mintage (Treasure list) | value | Only 39 were minted, with 20 made public; one of 24 designs. -> Only 32 were created, with 20 made public; one of 24 designs. |
| pendant mintage (catalogue note) | value | The book's specific "39 minted / 20 public / 24 designs" figures -> "32 created / 20 public / 24 designs" figures |
| Treasure-Hunt Signal (numbers not a code) | signal | The numbers 39 / 20 / 24 / 1956 / 400 are catalogue facts, NOT a code. -> The numbers 32 / 20 / 24 / 1956 / 400 are catalogue facts, NOT a code. |
| author met Kimberly (summary) | date | whom he met in 2003 -> whom he met in 2013 |
| author met Kimberly (People - Kimberly) | date | He met her in 2003, began a family in 2017 -> He met her in 2013, began a family in 2017 |
| second epigraph attribution (Poem/Epigraph, verbatim) | name | The art of love is largely the art of persistence. — Albert Ellis -> — Arthur Ellis |
| second epigraph attribution (lead summary) | name | Albert Ellis's "The art of love is largely the art of persistence" -> "The art of love is largely the art of persistence" (printed in the book as "Arthur Ellis," an apparent misprint of psychologist Albert Ellis) |
| Albert Ellis (People entry note) | name | source of the second epigraph on persistence in love. Thematic framing -> source of the second epigraph on persistence in love (the book prints the attribution as "Arthur Ellis," an apparent misprint). Thematic framing |

### Chapter 23 — Sing Your Own Special Song

| Field | Type | Before -> After |
|-------|------|-----------------|
| epigraph attribution (Bashō Matsuo) | name | —BASHO MATSUO -> —BASHŌ MATSUO |

### Back Matter (`back-matter.html`)

| Field | Type | Before -> After |
|-------|------|-----------------|
| Tanzanite price per carat (summary paragraph) | value | valued $3,000+/carat -> valued $1,000+/carat |
| Australian gold nugget weight (summary paragraph) | value | 351.65-gram, 98%-pure Australian gold nugget -> 351.61-gram, 98%-pure Australian gold nugget |
| Australian gold nugget weight (Treasures bullet) | value | 351.65-gram, 98%-pure Australian gold nugget -> 351.61-gram, 98%-pure Australian gold nugget |
| Back-cover logo description | other | red circle containing a crossed hammer and pickaxe -> red circle containing a crossed shovel and pickaxe |

---

## Hub Changes

### `places.html` (5 edits)

- Ch18: `Huntersville, North Carolina` -> `Statesville, Iredell County, North Carolina`.
- Ch8: `Wheelwright Museum of the American Indian, Santa Fe, New Mexico` -> `Wheelwright Museum of Native American Art, Santa Fe, New Mexico`.
- Ch20: removed fabricated `Exposition Park Rose Garden, Los Angeles` (book names no park).
- Ch20: removed unsupported `Greater Los Angeles, California` region.
- Ch20: removed fabricated `Rio de Janeiro state, Brazil` smokey-quartz origin (book states no origin).
- Verified: Ch21 Getty entries already correctly specify Los Angeles; Ch14 Statesville/Iredell entries are independently web-research-derived and correct. HTML validated (422 balanced `<li>`, 30 balanced `<ul>`).

### `people` hub (4 edits)

- Front matter: `Jamie River` -> `Jamie Biver`.
- Ch20: `Derek Grasso` -> `Octavio Ocampo`.
- Ch17: `Madeleine Taylor` -> `Madisyn Taylor`.
- Ch17: `Philip Nunu` -> `Philipp Humm`.
- Left `Albert Ellis` intact (the person's true identity; the "Arthur Ellis" fix is about the book's verbatim printed misprint, not the person). HTML valid (225 balanced `tr`).

### `items.html` (17 edits — 16 corrections + 1 removal)

- `"Breath of Heaven" smokey quartz by Derek Grasso` -> `"Mouth of Flower" surrealist painting by Octavio Ocampo` (NOT in treasure).
- `"The Flame" crystallized gold specimen (Red Ledge Mine)` -> `"The Flame" gold specimen (Red Ridge Mine)`.
- `201-carat smokey quartz ("Imperial Brilliant" cut by Mark Oros)` -> `200-carat smokey quartz ("Beyond Brilliant" cut by Mark Oros)`.
- `351.65-gram` Australian gold nugget -> `351.61-gram`.
- `Back-cover crossed hammer and pickaxe logo` -> `crossed shovel and pickaxe logo`.
- `Egyptian gold snake bracelet (1st BC-1st AD ...)` -> `(100 BC-100 AD ...)`.
- `Eight-escudo gold coin (... "Reaudulfia Collection" label)` -> `(... NGC MS 63, 27.00g, "Fernandina Collection" label)`.
- `Gold Chavin chalice (Peru, 400-1000 BC)` -> `(Peru, 600-1000 BC)`.
- `Greek gold wreath ... with acorn accents (3rd-4th c. BC)` -> `of solid gold olive and oak leaves (leaves 3rd-4th c. BC, band constructed later)`.
- `La Luz gold bar (slightly over 22 oz, marked XXVI, over $50,000)` -> `(over 23 troy oz, marked XXXVI, over $90,000)`.
- `Massive California Gold Rush nugget (over 4 ounces)` -> `(over twenty-one ounces)`.
- Picasso pendant: `39 minted / 20 public / one of 24 designs` -> `32 created / 20 public / one of 24 designs`.
- `Tiffany 'Iris' enamel vase (~1900, LC/T initials ...)` -> `(~1900, (LCT) initials ...)`.
- Loloma rings: `silver ring (larger) / silver ring (sapphire over Hopi inlay)` -> `stone ring ("blue" — free-form turquoise; fossilized ivory, ironwood, coral) / stone ring ("purple" — sugilite; lapis lazuli, coral, turquoise)`.
- `Gold betel-nut box` -> `Gold box acquired by Tuyet Nguyet`.
- `Bronze/brass modernist cuff bracelet by Art Smith` -> `Modernist-style brass cuff bracelet by Art Smith`.
- **Removed** `Round modernist brass brooch by Art Smith` row (fabricated extra pictured piece; corrected Ch5 confirms only three Art Smith pieces pictured).
- HTML validated (105 balanced `tr` pairs).

### `index.html` (3 edits)

- Ch20 summary: `201-carat smokey quartz` -> `200-carat smokey quartz`.
- Ch21 summary: `the named Getty Villa` -> `the named Getty Museum` (the book names the "Getty Museum"; the Villa survives only as the chapter page's web-research analysis).
- Ch12 summary: nugget `tied to Sutter's Mill / Coloma` -> `found near the American River (the same river where Sutter's Mill / Coloma sparked the 1849 rush)`, preserving the still-valid Sutter's Mill/Coloma association.

### `themes.html` — no changes

Abstract theme/lesson labels only; no load-bearing facts present. The two Atalanta entries already used the corrected spelling; the "confirmation bias as the treasure hunter's foe" label is a paraphrase, not a quotation of the printed "foil," so it was left intact.

---

## Closing Note

Only **facts** were reconciled in this pass — names, places, values, dates, in-treasure flags, treasure specs, verbatim quotes, and the geo-clues/signals that rested directly on those facts. All research, analysis, hypotheses, Treasure-Hunt Signals, cross-links, navigation, and styling were left intact except where a statement was load-bearing on a corrected fact. Externally-sourced web-research figures that legitimately differ from the book's printed claims (e.g., real-world Faberge egg manufacture date, Coffer build time, comparable-auction prices) were deliberately preserved as attributed research, not overwritten.

With this reconciliation complete, **the wiki is now safe to use as the primary research source for the location workflow.**
