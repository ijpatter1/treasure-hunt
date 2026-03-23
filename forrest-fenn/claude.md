# Forrest Fenn Box - Claude Context

## Goal

**Find the Forrest Fenn treasure box** - one of five treasure boxes hidden across the United States by author Jon Collins-Black, as detailed in Chapter XXIV of his book "There's Treasure Inside."

This hobnail-style puzzle box contains items from Forrest Fenn's original treasure, including a sealed olive jar with Fenn's 20,000-word autobiography (and unknown additional contents), a Tairona necklace, gold items, and a 2.25-ounce Alaskan gold nugget.

## Book Overview

- **Title**: "There's Treasure Inside" by Jon Collins-Black
- **Focus**: This repository analyzes Chapter XXIV (The Forrest Fenn Box)
- **Structure**: Part Two contains four additional treasure box chapters; this is the first
- **Key Page**: Page 209 contains the 24-line poem with all clues

## Critical Guidance from the Author

### How to Find Clues
1. **The poem contains everything** - "everything you need to know to arrive at a fairly close search area for our hobnail treasure box can be found in my poem"
2. **Forrest Fenn context is optional** - "you don't need to know Forrest's poem in order to solve this one" but reading it may provide "additional context"
3. **Author searched Fenn's area** - "I have traveled to all four stanzas in Forrest Fenn's treasure search area"
4. **Poem style matters** - written "in the style and stanza" of Forrest Fenn's original poem

### What the Author Has Confirmed (Postscript - Pages 210-211)
- **Not buried** - no digging required on public lands
- **Not on private property** - accessible public land only
- **Within 3 miles of a road** - reasonably accessible
- **Not dangerous** - no water crossings, cliff scaling, or hazardous locations
- **No codes or ciphers** - "No double meanings. No misdirection. No subtext. No clues. No code" in the postscript
- **Safely retrievable** - designed to bring "joy every step of the way"
- **No insider knowledge** - family and friends have no clues

## The Poem (Page 209)

```
I cruise along a road I know
and park my car just off the side,
near where I'd searched for heavy loads.
It was not there, although I'd tried.

Begin it where cool water flows
and follow through the canyon round.
Take in the rolling highs and lows
pass by a place where once was Brown.

From here you are more on your own.
The path is always drawing nigh.
The compass points now towards the home
of point and tree and seeing eye.

Stop just beyond the campers blaze.
A thinker's stone is all you need,
the spot is set with marvel gaze,
a white mark shows upon the seat.

Near here it's nestled all in dream.
I've other treasures left to hide.
I'll miss the golden bending stream,
but I must go back to my ride.

So listen well and hear me all,
your efforts will be worth the high.
If you can mark warm water's halt,
you'll bring it back full weight and dry.
```

## Repository Structure

```
forrest-fenn/
├── claude.md             # This context file
├── summary.md            # UNBIASED facts only (no hypothesis-specific content)
│
├── research/             # General research (bias-free)
│   ├── *.md/png          # Verified facts
│
├── hypotheses/           # Hypothesis-specific content
│   └── [hypothesis-name]/
│       ├── README.md     # Theory overview
│       ├── summary.md    # Living hypothesis summary
│       └── *.md          # Supporting analyses
│
├── pages/                # Page-level source analysis
│   ├── metadata/         # Structured JSON per screenshot (full text)
│   └── notes/            # Analysis markdown per screenshot
│
└── screenshots/          # Book page images (source material)
    └── page-XXX.png      # Raw book page scans
```

## Version Control

**Commit frequently.** After completing any meaningful unit of work, commit changes with a clear message.

### Branch Strategy
- **main**: Stable, reviewed content
- **Feature branches**: Use for multi-step work (e.g., `forrest-fenn/poem-analysis`)
- Create pull requests for significant changes

### Commit Hygiene
- Commit after each completed task (research finding, hypothesis update)
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

## Page Reference

| Page | Content Type | Description |
|------|--------------|-------------|
| 000a | Cover | Book cover with "The Forrest Fenn Treasure Box" header |
| 000b | Title | Title page |
| 000c | Copyright | Publication information |
| 000d | Dedication | Dedicated to Kimberly, Aiden & Londyn; Saint Augustine quote |
| 000e | Collage | Visual treasure imagery |
| 199 | Part Intro | Part Two: Our Next Four Treasure Boxes |
| 200 | Part Intro | Five boxes explanation, segregated clues |
| 201 | Part Intro | Laminated clues, commemorative coins |
| 202 | Image | Hobnail treasure box photograph |
| 203 | Chapter Start | Chapter XXIV: The Forrest Fenn Box |
| 204 | Chapter | Author's treasure hunting journey |
| 205 | Chapter | Fenn treasure found June 2020, olive jar image |
| 206 | Chapter | Tairona necklace, Rocky Mountains photo |
| 207 | Image | Tairona necklace full photograph |
| 208 | Chapter | 2022 auction, olive jar contents, box details |
| **209** | **KEY** | **24-line poem and gold nugget** |
| 210 | Postscript | Safety rules (no water, cliffs, 3 miles from road) |
| 211 | Postscript | No digging, no private property, wildlife safety |

## Working Principles

1. **Focus on the poem** - all clues for a "fairly close search area" are in the 24 lines
2. **Consider Fenn context** - author searched Fenn's area; references may connect
3. **Be literal** - postscript has "no double meanings, no misdirection, no code"
4. **Research deeply** - investigate references (Brown, "heavy loads", "thinker's stone")
5. **Cross-reference** - look for patterns connecting poem elements
6. **Document everything** - maintain detailed notes for later synthesis

## Maintaining summary.md

The master `summary.md` file contains **only verified facts** - no hypothesis-specific interpretations.

**What Belongs:**
- Author identity and background (verified public info)
- Author's explicit rules (direct quotes from postscript)
- The complete 24-line poem (exact text)
- Treasure box contents (items explicitly listed)
- Geographic references (locations explicitly named)
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
- Coordinate to avoid duplicate effort
- Check recent commits before starting new work

## Methodologies

Detailed workflow instructions are in `/methodologies/`. Reference when performing specific tasks:

| Methodology | Use When |
|-------------|----------|
| [Source Material Processing](../methodologies/source-material-processing.md) | Converting screenshots/PDFs to metadata + notes |
| [Chapter Analysis](../methodologies/chapter-analysis.md) | Writing chapter summaries |
| [ETL Consolidation](../methodologies/etl-consolidation.md) | Consolidating data into summary.md |
| [Confirmation Bias Mitigation](../methodologies/confirmation-bias-mitigation.md) | Avoiding bias in analysis |
| [Hypothesis Management](../methodologies/hypothesis-management.md) | Creating/maintaining location theories |

See [methodologies README](../methodologies/README.md) for the full index.
