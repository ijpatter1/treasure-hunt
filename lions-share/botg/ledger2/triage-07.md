## triage batch 7

| source | signal | role | quality | region implied | flag (cipher/hallucination/ok) |
|--------|--------|------|---------|----------------|--------------------------------|
| How-To-Read p.16 | "almost every chapter of the first twenty-three includes at least some morsel of information helpful for finding the location of the largest treasure box" | method | strong | none | ok |
| How-To-Read p.16 | "Do not overlook any part of this book. Almost anything could be helpful to your cause." | method | strong | none | ok |
| How-To-Read p.16 | "the four chapters in Part Two contain primarily all you need to discover the location of the other four treasure boxes" | method | strong | none | ok |
| How-To-Read p.16 | "I have subtly placed many clues within the text of the book. As they are not always overtly obvious" | method | moderate | none | ok |
| How-To-Read p.16 | "if you find a topic or story captivating ... go research it further ... It's not outside the realm of possibility that was my exact intention." | method | moderate | none | ok |
| How-To-Read p.16 | "Each chapter of Part One is curated by the history and stories of at least one item in the treasure." | method | moderate | none | ok |
| How-To-Read p.17 | "creating some complex cipher or grand secret code is beyond my scope" | method | strong | none | ok |
| How-To-Read p.17 | "You won't need to understand every clue or hint to bring together the full picture." | method | moderate | none | ok |
| How-To-Read p.17 | "the pointers I've left ... will only bring you so close to any hidden treasure box" | method | moderate | none | ok |
| How-To-Read p.17 | "you will have to travel out your door and go outside and search for them ... 'boots on the ground.'" | hard-filter | strong | none (outdoor physical site) | ok |
| How-To-Read p.17 | "Mother Nature beckons you. Don't ignore her. Go say hi." | discriminator | moderate | none (natural/outdoor setting) | ok |
| How-To-Read p.17 | "go breathe some of our planet's fresh air" | discriminator | weak | none (open-air outdoors) | ok |
| How-To-Read p.17 | "Take a friend. Bring a picnic. Find a treasure." | hard-filter | moderate | none (casual walkable spot) | ok |
| How-To-Read p.17 | "The only joy in the world is to begin. —CESARE PAVESE" | noise | weak | none | ok |
| Postscript p.207 | "You should take what I say here as literally as you possibly can" | method | strong | none | ok |
| Postscript p.207 | "FIVE treasure boxes" | noise | moderate | none | ok |
| Postscript p.207 | "I have hidden none of our five treasure boxes in a dangerous place" | hard-filter | strong | none | ok |
| Postscript p.207 | "Not hazardous to arrive at any box" | hard-filter | strong | none | ok |
| Postscript p.207 | "No box hidden under any body of water" | hard-filter | strong | none | ok |
| Postscript p.207 | "You do not need to get into a raft, or canoe, or a water vessel of any kind" | hard-filter | strong | none | ok |
| Postscript p.207 | "No box precariously close to swift current" | hard-filter | strong | none | ok |
| Postscript p.207 | "No high or dangerous ledge" | hard-filter | strong | none | ok |
| Postscript p.207 | "You will not need to scale a cliff or rock face to find a box" | hard-filter | strong | none | ok |
| Postscript p.208 | "Do not search in winter in areas where there is bitter cold and snow ... blanket of snow covering ground" | hard-filter | moderate | snowy-winter region (temperate/montane US) | ok |
| Postscript p.208 | "No treasure hidden more than THREE MILES from any road" | hard-filter | strong | none | ok |
| Postscript p.208 | "Avoid going on private property - this is a strict rule" | hard-filter | strong | none (public land) | ok |
| Postscript p.208 | "No box is hidden on private property of any kind" | hard-filter | strong | none (public land) | ok |
| Postscript p.208 | "No need to walk through private property to arrive at location of any box" | hard-filter | strong | none (public access route) | ok |
| Postscript p.208 | "Only exception ... rare case where public trail crosses private land ... public easement" | hard-filter | moderate | none (trail-adjacent hide) | ok |
| Postscript p.208 | "No need to dig up or disturb public lands" | hard-filter | strong | none (not buried) | ok |
| Postscript p.208 | "No treasure box is buried under the ground on public lands" | hard-filter | strong | none (not buried) | ok |
| Postscript p.208 | "Digging will not help you find any of our treasures" | hard-filter | strong | none (surface hide) | ok |
| Postscript p.208 | "it might get you in trouble with a local park ranger" | hard-filter | moderate | none (ranger-managed public land) | ok |
| Postscript p.208 | "If on land where hunting is allowed ... always dress in bright clothes" | discriminator | moderate | none (huntable wild public land e.g. national forest/game land) | ok |
| Postscript p.208 | "Research wildlife in area - if bears are known to be local carry bear spray" | discriminator | moderate | none (bear habitat / forested montane) | ok |
| Postscript p.208 | "be aware of poisonous snakes" | discriminator | weak | none (venomous-snake woodland/rocky terrain) | ok |
| Postscript p.208 | "other potentially dangerous wildlife, such as buffaloes, moose, or even elk during mating season" | discriminator | weak | none (Western/Mountain or elk-reintroduction US; too broad) | ok |
| Postscript p.208 | "Make sure you always know your location and how to get back" | hard-filter | weak | none (off-trail but not extreme) | ok |
| Postscript p.208 | "Wise to always bring a phone" | hard-filter | weak | none (cell-reachable remote-ish land) | ok |
| Postscript p.208 | "Hunting for our treasures should be fun, invigorating, scenic, and pleasurable" | discriminator | weak | none (scenic vista destination) | ok |
| Postscript p.208 | "Each treasure box is well within your ability to safely retrieve" | hard-filter | moderate | none (easy final approach) | ok |
| Postscript p.208 | "Author did not give anyone clues ... Wife, children, parents, siblings - none privy" | method | moderate | none (bars asking PEOPLE, not biography geography) | ok |
| Postscript p.208 | "If you happen to cross paths with any of these wonderful people, do not ask them questions" | method | weak | none (bars person-as-source) | ok |
| Acknowledgements p.209 | "Slow down and enjoy life ... you also miss the sense of where you are going and why." (Eddie Cantor) | noise | weak | none (scenic theme, quote) | ok |
| Acknowledgements p.209 | "Profound joy of the heart is like a magnet that indicates the path of life." (Mother Teresa) | noise | weak | none | ok |
| Acknowledgements p.209 | "We need joy as we need air ... love as we need water ... the earth we share." (Maya Angelou) | noise | weak | none | ok |
| Acknowledgements p.210 | "Ileana, Rosemarie, Thaddeus, Valeria, and Zoe ... Herculean efforts researching histories of all objects" | noise | weak | none (researcher credits) | ok |
| Acknowledgements p.210 | "Jamie Biver ... Photographer ... Made the beauty of the items ... come alive" | noise | weak | none (photographer credit) | ok |
| Acknowledgements p.210 | "Seth, Angie, and Lauren ... Amazing creations" | noise | weak | none (box/forge maker per prior research; no geo given here) | ok |
| Acknowledgements p.210 | "Rob Lavinsky ... exceptional eye for rare minerals and gemstones" | noise | weak | none (mineral dealer credit) | ok |
| Acknowledgements p.210 | "Allan Anawati and Nicolas Hugo ... Guidance ... with a collecting novice" | noise | weak | none (antiquities advisors) | ok |
| Acknowledgements p.210 | "Susan Szecsi ... publisher and friend" | noise | weak | none (publisher credit) | ok |
| Acknowledgements p.210 | "Yohanna ... Helping me locate my north star" | noise | weak | none (figurative; reject direction read) | cipher (correctly rejected) |
| Acknowledgements p.210 | "Don ... 'Your hand helped steer this ship so that it did not run aground.'" | noise | weak | none (nautical metaphor) | cipher (correctly rejected) |
| Acknowledgements p.210 | "Don ... 'Your guidance gave me the surety to mark a path.'" | noise | weak | none (figurative; reject path/blaze read) | cipher (correctly rejected) |
| Acknowledgements p.211 | "Richard ... talents with design and layouts ... I knew I hit the lottery" | noise | weak | none (designer credit) | ok |
| Acknowledgements p.211 | "Baker & Taylor ... especially Jeff and Mark and Matt ... wider audience" | noise | weak | none (distributor credit) | ok |
| Acknowledgements p.211 | "Thank you, Mom and Dad ... thanks, Mom, for your relentless proofreading" | noise | weak | none (parents credit; no geo given) | ok |
| Acknowledgements p.211 | "Zach ... Encouragement" | noise | weak | none (name credit) | ok |
| Acknowledgements p.211 | "Thank you, LeElaine and Kimberly D. for showing me how much ground one searcher can cover in a single day." | hard-filter | moderate | none (search area coverable in one day on foot) | ok |
| Acknowledgements p.211 | "Aiden and Londyn ... lifts me up on wings ... Your glowing faces lit a path" | noise | weak | none (figurative affection; reject trail/bird read) | cipher (correctly rejected) |
| Acknowledgements p.211 | "And, finally, thank you, Kimberly ... You feed joy to my life everyday" | noise | weak | none (wife credit; joy theme only) | ok |
| Back cover p.211-back | "Red distressed stamp-style circle containing a crossed shovel and pickaxe - treasure hunting/mining tools logo" | noise | weak | none (branding; NOT a dig directive) | ok |
| Back cover p.211-back | "crossed shovel and pickaxe ... mining tools" | discriminator | weak | none (loosely evokes mining/prospecting country; decorative) | ok |
| Poem st.1 | "the molten tone of a tune" | discriminator | weak | none (heat/melt descriptor; volcanic/forge association unconfirmed) | ok |
| Poem st.1 | "we may find music / in a poem" | method | moderate | none (clues are inside the poem) | ok |
| Poem st.2 | "Our conductor ... with a trace of a baton ... gives direction." | method | moderate | none (poem gives directional guidance) | ok |
| Poem st.2 | "While the coda is incomplete" | method | weak | none (more steps remain on site) | ok |
| Poem st.2 | "there's a flutter of excitement around" | discriminator | weak | none (movement in air nearby; ambiguous) | ok |
| Poem st.3 | "See how far to go." | discriminator | moderate | none (distance/range cue) | ok |
| Poem st.3 | "Use will's straight edge" | method | moderate | none (literal straight edge; do NOT decode to a name) | cipher (correctly held literal) |
| Poem st.3 | "as the turning square or any arc / may align at a proper point" | method | moderate | none (geometric alignment) | ok |
| Poem st.3 | "may align at a proper point" | method | moderate | none (specific alignment point = hide) | ok |
| Poem st.3 | "This is no imaginary wonderland." | method | strong | none (place is real/physical) | ok |
| Poem st.3 | "Now look." | method | weak | none (instruction to observe) | ok |
| Poem st.4 | "You can take your own path" | discriminator | moderate | none (multiple routes/trail present) | ok |
| Poem st.4 | "an X leads the way" | method | moderate | none (X-mark/crossing token; NOT decoded) | cipher (correctly held literal) |
| Poem st.4 | "or simply follow shimmering circles of gold" | discriminator | moderate | none (gold-colored circular visual token; NOT decoded) | cipher (correctly held literal) |
| Poem st.4 | "There may be magic in the water" | discriminator | strong | none (water feature present at/near site) | ok |
| Poem st.4 | "but the pike / are rather all around" (fish sense) | discriminator | moderate | none (pike/fish in water; multi-sense) | cipher (correctly held multi-sense) |
| Poem st.4 | "but the pike / are rather all around" (peaked-hills sense) | discriminator | weak | none (peaked hills/pikes encircling terrain) | cipher (correctly held multi-sense) |
| Poem st.4 | "but the pike / are rather all around" (turnpike-road sense) | discriminator | weak | none (pike/turnpike roads nearby) | cipher (correctly held multi-sense) |
| Poem st.5 | "If you get warm" | discriminator | weak | none (warmth/sun cue; ambiguous) | ok |
| Poem st.5 | "you may find shady oaks." | discriminator | strong | none (oak trees at site) | ok |
| Poem st.5 | "When close, the haiku / curls a little further on / where few have seen it." | discriminator | moderate | none (curving feature in seldom-visited spot) | ok |
| Poem st.5 | "curls a little further on" | discriminator | moderate | none (curve/bend; short added distance) | ok |
| Poem st.5 | "where few have seen it" | discriminator | moderate | none (secluded/low-traffic spot) | ok |
| Poem st.5 | "And if you don't go down / you may never know / how high you ever want to be." | discriminator | strong | none (elevated terrain w/ descent; relief) | ok |
| Poem st.5 | "how high you ever want to be" | discriminator | moderate | none (high elevation/vantage) | ok |
| Poem st.6 | "The sky smiles on you." | discriminator | moderate | none (open sky / exposed vista) | ok |
| Poem st.6 | "Dancers are on the land." | discriminator | weak | none (literal dancers/swaying things; NOT decoded to Hopi) | cipher (correctly held literal) |
| Poem st.6 | "And if you stay to see the night / it will ignite with the flame of starlight." | discriminator | moderate | none (dark-sky / low light pollution, remote/high) | ok |
| Poem st.7 | "Now that you're here / all that is left remains for you." | method | moderate | none (arrived at destination point) | ok |
| Poem st.7 | "And if you spy others warming / with the sunlight" | discriminator | weak | none (sunny spot people frequent; ambiguous) | ok |
| Poem st.7 | "or sat upon a rock" | discriminator | strong | none (notable rock/boulder to sit on) | ok |
| Poem st.7 | "allowing nature's wide embrace / to sustain their bliss" | discriminator | moderate | none (wide-open natural park/preserve setting) | ok |
| Poem st.7 | "maybe ask them to assist you" | discriminator | weak | none (some human presence) | ok |
| Poem st.7 | "You can sing harmonies as you travel home." | hard-filter | weak | none (reachable round trip) | ok |
| Back cover haiku | "Be solid, have grit;" | discriminator | weak | none (gritstone/coarse rock OR determination; multi-sense) | cipher (correctly held multi-sense) |
| Back cover haiku | "sparkle even as you pine." | discriminator | weak | none (glint/shine + pine trees OR yearn; multi-sense) | cipher (correctly held multi-sense) |
| Back cover haiku | "Here lies a joy divined" | method | weak | none (treasure lies here; "divined"=found, not water-divining) | cipher (correctly held literal) |
| Back-items p.199 | 116.7 ct pear Tanzanite, found only in one very small region (Tanzania) | foreign-context | weak | Tanzania (non-US) | ok |
| Back-items p.199 | First discovered 1967, December birthstone 2002 | foreign-context | weak | Tanzania (non-US) | ok |
| Back-items p.199 | Deposits estimated completely mined around 2043 | foreign-context | weak | Tanzania (non-US) | ok |
| Back-items p.199 | Similar color to royal blue sapphire | noise | weak | none | ok |
| Back-items p.199 | Shape and size would make particularly dazzling pendant | noise | weak | none | ok |
| Back-items p.200 | 9.65 ct diamond, almost perfect octahedral, unaltered natural state | foreign-context | weak | none (natural-state diamond) | ok |
| Back-items p.200 | Author not aware of any other similarly formed natural diamond of this size/quality | noise | weak | none (uniqueness claim) | ok |
| Back-items p.200 | Consulted Rob Lavinsky | noise | weak | none (expert credit) | ok |
| Back-items p.200 | Two gold, emerald and ruby rings from 19th century South India | foreign-context | weak | South India (non-US) | ok |
| Back-items p.200 | Arrangement of precious stones make them 'floral' rings, mimic flowers | discriminator | weak | none (floral motif; weak flora echo) | ok |
| Back-items p.200 | Tuyet Nguyet collection | foreign-context | weak | none (collection provenance) | ok |
| Back-items p.201 | Two ornate Bali priest rings, 19th-20th centuries | foreign-context | weak | Bali (non-US) | ok |
| Back-items p.201 | Right ring: Balinese prongs shaped like birds' beaks | foreign-context | weak | Bali (non-US) | ok |
| Back-items p.201 | Left ring: large pink ruby (Tuyet Nguyet collection) | foreign-context | weak | none | ok |
| Back-items p.201 | Gold box from Tuyet Nguyet collection, origin Southeast Asia | foreign-context | weak | Southeast Asia (non-US) | ok |
| Back-items p.201 | Intricate carving - deer on front, chicken on back | discriminator | weak | none (animal motif; not locational) | ok |
| Back-items p.201 | Author has not come across any similar box that exists anywhere | noise | weak | none (uniqueness claim) | ok |
| Back-items p.202 | 351.61-gram gold nugget from Australia | foreign-context | weak | Australia (non-US) | ok |
| Back-items p.202 | Australian gold nuggets typically purest, ~98% purity | foreign-context | weak | Australia (non-US) | ok |
| Back-items p.202 | Fascinating shape ... one of my favorite gold pieces in our treasure | noise | weak | none (author preference) | ok |
| Back-items p.202 | Titanium physical Bitcoin coin by BTCC, 1 of 1350, 2016 first production | foreign-context | weak | none (item rarity) | ok |
| Back-items p.202 | Comes with private keys to one digital Bitcoin (beneath hologram on back) | noise | weak | none (item description) | ok |
| Back-items p.202 | Only a few ever rated by PCGS; 250 more after 2016 | foreign-context | weak | none (item rarity) | ok |
| Back-items p.202 | Olive-green jade bracelet, 3000-4000 BC China, one of oldest known | foreign-context | weak | China (non-US) | ok |
| Back-items p.202 | Jade highly valued in China; symbolized purity and moral integrity | foreign-context | weak | China (non-US) | ok |
| Back-items p.202 | 'Jingqi' meaning life force, carries energy of life | noise | weak | none (symbolism) | ok |
| Back-items p.202 | Virtues: charity, rectitude, wisdom, courage, equity | noise | weak | none (symbolism) | ok |
| Back-items p.203 | Jade and gold amulet necklace, 200-600 AD, origin Costa Rica | foreign-context | weak | Costa Rica (non-US) | ok |
| Back-items p.203 | Interpretive recreation; jade carvings and gold beads original, emerald beads/clasp added later | foreign-context | weak | none (item description) | ok |
| Back-items p.203 | Nicoya civilization (Spanish arrived 16th century) | foreign-context | weak | Costa Rica (non-US) | ok |
| Back-items p.203 | Nicoya jade believed to protect wearer / mediate spiritual world | noise | weak | none (symbolism) | ok |
| Back-items p.204 | One-of-a-kind necklace by Italian designer Michele della Valle | foreign-context | weak | Italy (non-US) | ok |
| Back-items p.204 | Designer associated with Italian opera; trained operatic tenor | foreign-context | weak | Italy (non-US) | ok |
| Back-items p.204 | Materials: citrine set with diamonds | noise | weak | none (item description) | ok |
| Back-items p.204 | 'The stones give birth to design ...' - Michele della Valle | noise | weak | none (designer quote) | ok |
| Back-items p.204 | Viking gold ring, around 9th century | foreign-context | weak | Scandinavia (non-US) | ok |
| Back-items p.204 | Motif: dozens of circles stamped into eight serpentine forms | noise | weak | none (motif description) | ok |
| Back-items p.204 | Viking gold rings hoarded by wealthy and buried in caches | foreign-context | weak | Scandinavia (non-US) | ok |
| Back-items p.204 | "The Vikings, not the Spanish, were the very first people to sail to North America" | foreign-context | weak | North America (continent; not a US pinpoint) | ok |
| Back-items p.204 | Most Scandinavians were not Vikings ... Vikings refined in appearance/hygiene | foreign-context | weak | Scandinavia (non-US) | ok |
| Back-items p.204 | J.R.R. Tolkien's Lord of the Rings inspired by Viking myth of Andvari's ring | noise | weak | none (literary tie) | ok |
