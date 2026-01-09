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
├── summary.md            # Master summary and hypotheses
│
├── analysis/             # Research and analysis documents
│   ├── *-research.md     # Location/identity research
│   ├── *-analysis.md     # Deep-dive analyses
│   └── jcb-*.md/json     # Author extracts (personal stories, reader addresses)
│
├── chapters/             # Chapter summaries (consolidated clues)
│   └── chapter-XX.md     # Per-chapter analysis with Rocky Face lens
│
├── maps/                 # Map and location images
│   └── *.png/pdf         # Trail maps, satellite imagery, markers
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

### Part One (Chapters 1-14)
| Ch | Title | Subtitle |
|----|-------|----------|
| 1 | The 120 Carat Sapphire | A Plan That Changed the World |
| 2 | The 100 Rings of Tuyet Nguyet | Don't Wing It |
| 3 | A Puzzle Box, a Magnifying Glass, & the Mysterious Egg | Joy Is in the Details |
| 4 | The 96 Carat Chivor Emerald | Blaze the Path |
| 5 | Masterworks by Art Smith | An Exercise in Faith |
| 6 | Rubies to Wear | Inspiration Is Welcome |
| 7 | Amelia's Autograph | Explore More |
| 8 | Beauty's Bespoken Treasures | Know the Past, See the Future |
| 9 | The Golden Chalice | Confirmation Bias |
| 10 | Jackie Onassis' Diamond Sapphire Brooch | Welcome the Good and the Bad |
| 11 | Treasures From a Famous Shipwreck | The Temptress Greed |
| 12 | Massive Gold Rush Nugget | Make Good Choices |
| 13 | Best of Its Class Jordan Rookie Card | Be Like Mike |
| 14 | Tiffany's Furnace & Thoreau's Fire | Fail Forward |

### Part Two (Chapters 15-23)
| Ch | Title | Subtitle |
|----|-------|----------|
| 15 | 1960 Rome Olympic Gold Medal | Don't Give Up |
| 16 | 1996 Atlanta Olympic Gold Medal | Defy Expectations |
| 17 | George Washington's Jelly Glass | Share Your Story |
| 18 | Andrew Carnegie's Emerald | The Science of Giving |
| 19 | Moon Rocks & Meteors | The Next Frontier |
| 20 | The Six-Figure Birthstone | Choosing a New Perspective |
| 21 | Antiquities of Alexander | Make It Make Sense |
| 22 | Picasso's Pendant | A Love Story |
| 23 | Sing Your Own Special Song | Finding Treasures Along the Way |

## Back Cover Poem (Potential Clue)

> *Be solid, have grit;*
> *sparkle even as you pine.*
> *Here lies a joy divined*

## Working Principles

1. **Be thorough** - don't skip any content, "almost anything could be helpful"
2. **Be literal** - author confirms no hidden codes or ciphers
3. **Research deeply** - if something is captivating, investigate further with web search tool
4. **Cross-reference** - look for patterns across chapters
5. **Trust intuition** - note things that feel significant even if unclear why
6. **Document everything** - maintain detailed notes for later synthesis

## Collaboration Notes

- Multiple agents may work on this repository in parallel
- Use feature branches for work (e.g., `lions-share/chapter-analysis`)
- Create pull requests for merging
- Coordinate to avoid duplicate effort on the same chapters
