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
│   └── [hypothesis-name]/
│       ├── README.md     # Theory overview
│       ├── summary.md    # Living hypothesis summary
│       ├── chapter-XX.md # Chapter interpretations through this lens
│       └── *.md          # Supporting analyses
│
├── pages/                # Page-level source analysis
│   ├── metadata/         # Structured JSON per screenshot (full text)
│   └── notes/            # Analysis markdown per screenshot
│
└── screenshots/          # Book page images (source material)
    └── page-XXX-XXX.png  # Raw book page scans
```

## Version Control

**Commit frequently.** After completing any meaningful unit of work, commit changes with a clear message.

### Branch Strategy
- **main**: Stable, reviewed content
- **Feature branches**: Use for multi-step work (e.g., `lions-share/chapter-14-analysis`)
- Create pull requests for significant changes

### Commit Hygiene
- Commit after each completed task (chapter summary, research finding, ETL load)
- Write descriptive commit messages explaining *what* and *why*
- Push regularly to preserve work and enable collaboration

### Before Starting Work
1. `git pull` to get latest changes
2. Check `git status` to understand current state
3. Create feature branch if doing multi-step work

### When Finished
1. Stage relevant files with `git add`
2. Commit with clear message
3. Push to remote
4. Create PR if on feature branch

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

## Maintaining summary.md

The master `summary.md` file contains **only verified facts** - no hypothesis-specific interpretations.

**What Belongs:**
- Author identity (verified public records)
- Author's explicit rules (direct quotes from postscript)
- Joy's Serenade and Back Cover poems (exact text, no interpretation)
- Book content summary (chapter titles, page ranges, factual overview)
- Geographic references (locations explicitly named in book)
- Verified research (externally confirmed facts)
- Active hypotheses (links only, no endorsement)

**What Does NOT Belong:**
- GPS coordinates or specific addresses
- Poem-to-location mappings or interpretations
- Trail markers, search protocols, location-specific details
- Any content that assumes a specific location is correct

**Test before adding:** Would this content change if we switched to a different hypothesis? If yes, it belongs in a hypothesis folder instead.

## Collaboration Notes

- Multiple agents may work on this repository in parallel
- Coordinate to avoid duplicate effort on the same chapters
- Check recent commits before starting new work

## Methodologies

Detailed workflow instructions are in `/methodologies/`. Reference when performing specific tasks:

| Methodology | Use When |
|-------------|----------|
| [Source Material Processing](../methodologies/source-material-processing.md) | Converting screenshots/PDFs to metadata + notes |
| [Chapter Analysis](../methodologies/chapter-analysis.md) | Writing chapter summaries |
| [ETL Consolidation](../methodologies/etl-consolidation.md) | Consolidating chapter data into summary.md |
| [Confirmation Bias Mitigation](../methodologies/confirmation-bias-mitigation.md) | Avoiding bias in analysis |
| [Hypothesis Management](../methodologies/hypothesis-management.md) | Creating/maintaining location theories |

See [methodologies README](../methodologies/README.md) for the full index.
