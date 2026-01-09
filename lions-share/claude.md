# Lion's Share Treasure Hunt - Claude Context

## Goal

**Find the Lion's Share treasure** - the largest of five treasure boxes hidden somewhere in the United States by author Jon Collins-Black, as detailed in his book "There's Treasure Inside."

The Lion's Share box contains the majority of the treasure value (millions of dollars) including items connected to Picasso, Carnegie, Washington, Tiffany, Thoreau, and Onassis.

## Book Overview

- **Title**: "There's Treasure Inside" by Jon Collins-Black
- **Focus**: This repository analyzes the Lion's Share-specific content
- **Structure**: 23 chapters + front/back matter, all containing potential clues

## Critical Guidance from the Author

### How to Find Clues
1. **Read thoughtfully** - clues are subtly placed, not always obvious
2. **Note anything that makes your "Spidey sense tingle"**
3. **Research captivating topics further** - this may be intentional
4. **Item histories contain clues** - the treasure objects' stories are part of the puzzle
5. **Almost every chapter has at least one important detail** for the Lion's Share

### What the Author Has Confirmed
- **Not buried** - no digging required on public lands
- **Not on private property** - accessible public land
- **Within 3 miles of a road** - reasonably accessible
- **Not dangerous** - no water crossings, cliff scaling, etc.
- **"Boots on the ground" required** - physical search needed after solving

## Repository Structure

```
lions-share/
├── claude.md             # This context file
├── summary.md            # UNBIASED facts only (no hypothesis-specific content)
│
├── research/             # General research (bias-free)
│   ├── *.md/png          # Verified facts
│
├── chapters/             # Chapter summaries (bias-free)
│   └── chapter-XX.md     # Facts from each chapter (no hypothesis lens)
│
├── hypotheses/           # Hypothesis-specific content
│   └── rocky-face-mountain/
│       ├── README.md     # Theory overview
│       ├── summary.md    # Living hypothesis summary
│       ├── chapter-XX.md # Chapter interpretations through this lens
│       ├── maps/         # Location-specific maps, trails, markers
│       └── *.md          # Supporting analyses (poem mapping, theories)
│
├── pages/                # Page-level source analysis
│   ├── metadata/         # Structured JSON per screenshot (full text)
│   └── notes/            # Analysis markdown per screenshot
│
└── screenshots/          # Book page images (source material)
    └── page-XXX-XXX.png  # Raw book page scans
```

## File Naming Convention

Metadata and notes files mirror screenshot names:
- `page-018-019.png` → `page-018-019.json` + `page-018-019.md`

## Metadata Schema

Each JSON file contains `left_page` and `right_page` sections with:
- Full text transcription
- Formatting details (emphasized text, special typography)
- Image descriptions and text within images
- Potential clues identified

## Page Notes Spec

Page notes files provide clue analysis for each book page spread.

### Structure

```markdown
# [Section/Chapter Name]: Pages X-X

## Page X (Left) - [Content Type]

[Image description if applicable]

> [Key quoted text from book]

**Key Points:**
- Summary of important content

| Element | Observation | Confidence |
|---------|-------------|------------|
| Item    | Analysis    | Low/Medium/High |

---

## Page X (Right) - [Content Type]
[Same structure as left page]

---

## Cross-References
- Related chapters or analysis documents

**Verification Status**: VERIFIED against screenshot.
```

### Guidelines
- Separate pages with horizontal rules (`---`)
- Use blockquotes for quoted text
- Include confidence levels for observations
- Always verify against source screenshot
- Cross-reference related content

## Chapter Summary Spec

Chapter summaries consolidate clues from all pages in a chapter.

### CRITICAL: Read BOTH File Types

**You MUST read BOTH metadata (JSON) AND notes (MD) files for EVERY page before writing a chapter summary.**

For each page spread in a chapter:
1. Read `pages/metadata/page-XXX-XXX.json` - contains the **actual book text** (full transcription)
2. Read `pages/notes/page-XXX-XXX.md` - contains clue analysis and observations

**If you only read notes files, you are missing the actual book content.**

### Source Files Per Page (MUST READ BOTH)
- **Metadata (JSON)**: Contains FULL TEXT TRANSCRIPTION of the book pages, formatted sections, image descriptions, key elements
- **Notes (MD)**: Contains clue analysis, observations, confidence levels, cross-references

### Chapter Summary Template (`lions-share/chapters/chapter-XX.md`)

```markdown
# Chapter X: [Title]

**Subtitle:** *[Subtitle]*
**Pages:** [start]-[end]

## Treasure Items
| Item | Description | Provenance |

## Chapter Summary
[2-3 paragraph synopsis of narrative and key points]

## Geographic References
| Location | Context | Relevance |

## Historical Figures
| Person | Role |

## Key Phrases & Potential Clues
| Phrase | Context | Analysis |

## Numbers
| Number | Context |

## Cross-Chapter Patterns
- [ ] Pattern to track across book

## Research Questions
1. Questions raised by chapter content

## Source Files
- page-XXX-XXX.json/md
```

### Summary Guidelines
- **Summarize, don't transcribe** - synthesize key information, not full text
- **Prioritize US locations** - treasure is in the United States
- **Note author connections** - personal details may be clues
- **Flag explicit instructions** - author's direct advice to hunters
- **Track cross-chapter patterns** - themes that repeat across chapters

## What to Track During Analysis

1. **Geographic references** - place names, landmarks, regions, states
2. **Historical figures** - where they lived, traveled, died
3. **Repeated themes/words** - patterns across chapters
4. **Unusual phrasing** - anything that seems deliberately worded
5. **Chapter subtitles** - may form a message or provide direction
6. **Images/photos** - location indicators, hidden details
7. **Quotes and attributions** - sources and their significance
8. **Numbers** - potential coordinates, dates, measurements
9. **Cross-chapter connections** - themes linking multiple chapters

## Chapter Reference

| Ch | Title | Subtitle | Pages |
|----|-------|----------|-------|
| 1 | The 120 Carat Sapphire | A Plan That Changed the World | 18-25 |
| 2 | The 100 Rings of Tuyet Nguyet | Don't Wing It | 26-37 |
| 3 | A Puzzle Box, a Magnifying Glass, & the Mysterious Egg | Joy Is in the Details | 38-45 |
| 4 | The 96 Carat Chivor Emerald | Blaze the Path | 46-55 |
| 5 | Masterworks by Art Smith | An Exercise in Faith | 56-63 |
| 6 | Rubies to Wear | Inspiration Is Welcome | 64-69 |
| 7 | Amelia's Autograph | Explore More | 70-75 |
| 8 | Beauty's Bespoken Treasures | Know the Past, See the Future | 76-85 |
| 9 | The Golden Chalice | Confirmation Bias | 86-94 |
| 10 | Jackie Onassis' Diamond Sapphire Brooch | Welcome the Good and the Bad | 95-100 |
| 11 | Treasures From a Famous Shipwreck | The Temptress Greed | 101-108 |
| 12 | Massive Gold Rush Nugget | Make Good Choices | 109-114 |
| 13 | Best of Its Class Jordan Rookie Card | Be Like Mike | 115-122 |
| 14 | Tiffany's Furnace & Thoreau's Fire | Fail Forward | 123-132 |
| 15 | 1960 Rome Olympic Gold Medal | Don't Give Up | 133-140 |
| 16 | 1996 Atlanta Olympic Gold Medal | Defy Expectations | 141-150 |
| 17 | George Washington's Jelly Glass | Share Your Story | 151-158 |
| 18 | Andrew Carnegie's Emerald | The Science of Giving | 159-164 |
| 19 | Moon Rocks & Meteors | The Next Frontier | 165-170 |
| 20 | The Six-Figure Birthstone | Choosing a New Perspective | 171-178 |
| 21 | Antiquities of Alexander | Make It Make Sense | 179-188 |
| 22 | Picasso's Pendant | A Love Story | 189-194 |
| 23 | Sing Your Own Special Song | Finding Treasures Along the Way | 195-198 |

## Working Principles

1. **Be thorough** - don't skip any content, "almost anything could be helpful"
2. **Be literal** - author confirms no hidden codes or ciphers
3. **Research deeply** - if something is captivating, investigate further with web search tool
4. **Cross-reference** - look for patterns across chapters
5. **Trust intuition** - note things that feel significant even if unclear why
6. **Document everything** - maintain detailed notes for later synthesis

## Confirmation Bias Mitigation

The author directly addresses confirmation bias (Chapter 9 subtitle). Analysis is vulnerable to:
- Fitting observations into pre-existing theories
- Ignoring contradictory evidence
- Over-weighting suggestive vs. definitive clues

### Prevention Practices

1. **Separate facts from interpretation** - maintain distinct files for each
   - Facts go in `chapters/`, `research/`, and `summary.md`
   - Interpretations go in `hypotheses/[hypothesis-name]/`
2. **State null hypotheses** - document what would DISPROVE each theory
3. **Red-team your work** - actively seek counter-evidence
4. **Use confidence ratings** - mark interpretations as Low/Medium/High
5. **Document alternatives** - for each clue, note other possible meanings
6. **Date hypotheses** - track when theories formed to avoid backfitting
7. **Never merge hypothesis content into facts files** - keep the separation clean

## Evidence Classification

When documenting clues, classify them:

| Classification | Definition | Example |
|----------------|------------|---------|
| **Direct Reference** | Book explicitly states something | "Hiddenite emerald mine" in Ch 4 |
| **Verified External** | Confirmed via public records | Property deed, author identity |
| **Derived Location** | Logical deduction from facts | "X miles from Y based on map" |
| **Thematic Connection** | Pattern that may be intentional | "Sparkle" appears in multiple chapters |
| **Speculative** | Fitting facts to theory | "X might mean Y" |

Facts files should contain only **Direct Reference** and **Verified External** evidence. Other classifications belong in hypothesis files.

## Maintaining summary.md

The master `summary.md` file contains **only verified facts** - no hypothesis-specific interpretations.

### What Belongs in summary.md

| Section | Content Type | Example |
|---------|--------------|---------|
| **Author Identity** | Verified public records | Jon Comer identity, property deeds |
| **Author's Explicit Rules** | Direct quotes from postscript | "Not buried", "within 3 miles of road" |
| **Joy's Serenade** | Exact poem text (no interpretation) | Full 7-stanza poem verbatim |
| **Back Cover Haiku** | Exact text (no interpretation) | Haiku text and syllable count |
| **Book Content Summary** | Chapter titles, page ranges | Table of chapters with factual overview |
| **Geographic References** | Locations explicitly named in book | Hiddenite, Penland, Statesville |
| **Verified Research** | Externally confirmed facts | Seth Gould at Penland School |
| **Active Hypotheses** | Links only (no endorsement) | Links to hypothesis folders |

### What Does NOT Belong in summary.md

- GPS coordinates or specific addresses (hypothesis-specific)
- Confidence ratings or "HIGH/MEDIUM/LOW" assessments
- Poem-to-location mappings or interpretations
- Trail markers, search protocols, or location-specific details
- Phrases like "target location" or "primary candidate"
- Any content that assumes a specific location is correct

### When to Update summary.md

1. **New verified facts** - confirmed via public records or official sources
2. **Author statements** - new interviews with direct quotes
3. **Book content corrections** - errors in transcription or missing content
4. **New hypothesis added** - add link to Active Hypotheses section

### Verification Before Adding

Before adding content to summary.md, ask:
- Is this a **fact** or an **interpretation**?
- Can this be verified independently of any location theory?
- Would this content change if we switched to a different hypothesis?

If the answer to the last question is "yes", the content belongs in a hypothesis folder instead.

## Hypothesis Management

### Creating a New Hypothesis
1. Create folder: `hypotheses/[hypothesis-name]/`
2. Create `README.md` with theory overview
3. Create `summary.md` with living hypothesis summary
4. Document supporting evidence with classifications
5. Document counter-evidence explicitly
6. Set status: Active/Suspended/Disproven

### Maintaining Hypotheses
- Review periodically for new evidence/counter-evidence
- Update confidence levels as research progresses
- Never merge hypothesis content into facts files
- Keep each hypothesis self-contained with its own chapter interpretations

### Adding Chapter Interpretations
When analyzing chapters through a hypothesis lens:
1. Keep foundational notes in `chapters/chapter-XX.md` (facts only)
2. Put hypothesis-specific interpretations in `hypotheses/[hypothesis-name]/chapter-XX.md`
3. This allows the same facts to support multiple competing hypotheses

## Collaboration Notes

- Multiple agents may work on this repository in parallel
- Use feature branches for work (e.g., `lions-share/chapter-analysis`)
- Create pull requests for merging
- Coordinate to avoid duplicate effort on the same chapters
