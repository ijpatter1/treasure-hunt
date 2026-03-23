# Pokemon Treasure Box - Claude Context

## Goal

**Find the Pokemon treasure box** - one of four smaller treasure boxes hidden in the United States by author Jon Collins-Black, as detailed in his book "There's Treasure Inside."

The Pokemon box is a handcrafted Japanese puzzle box made by Seth Gould, featuring over 250,000 individual chisel cuts and 220 pieces of fine silver foil on the lid alone. It contains treasures themed around the Pokemon concept of finding, capturing, and evolving.

## Book Overview

- **Title**: "There's Treasure Inside" by Jon Collins-Black
- **Focus**: This directory analyzes the Pokemon treasure box chapter
- **Structure**: The Pokemon chapter is one of four dedicated chapters for the smaller treasure boxes, each with its own unique style, subject, and solution

## Critical Guidance from the Author

### How to Find Clues
1. **Read thoughtfully** - clues are subtly placed, not always obvious
2. **Note anything that makes your "Spidey sense tingle"**
3. **Research captivating topics further** - this may be intentional
4. **The four smaller box chapters diverge in structure** - they include puzzles, riddles, mysteries, escape rooms, and board games
5. **Each of the four chapters has its own distinct theme** borrowed from meaningful memories and personal interests

### What the Author Has Confirmed
- **Not buried** - no digging required on public lands
- **Not on private property** - accessible public land
- **Within 3 miles of a road** - reasonably accessible
- **Not dangerous** - no water crossings, cliff scaling, etc.
- **"Boots on the ground" required** - physical search needed after solving
- **Wildlife safety** - be aware of bears, snakes, and other wildlife in search areas

## Repository Structure

```
pokemon/
├── claude.md             # This context file
├── full_expedition_loadout.md  # Equipment recommendations
│
├── pages/                # Page-level source analysis
│   ├── metadata/         # Structured JSON per screenshot (full text)
│   └── notes/            # Analysis markdown per screenshot
│
└── screenshots/          # Book page images (source material)
    └── page-XXX.png      # Book page scans
```

## Version Control

**Commit frequently.** After completing any meaningful unit of work, commit changes with a clear message.

### Branch Strategy
- **main**: Stable, reviewed content
- **Feature branches**: Use for multi-step work (e.g., `pokemon/chapter-analysis`)
- Create pull requests for significant changes

### Before Starting Work
1. `git pull` to get latest changes
2. Check `git status` to understand current state
3. Create feature branch if doing multi-step work

### When Finished
1. Stage relevant files with `git add`
2. Commit with clear message
3. Push to remote
4. Create PR if on feature branch

## Working Principles

1. **Be thorough** - don't skip any content, the chapter may contain puzzles or riddles
2. **Be creative** - author notes these chapters "diverge" and include games/puzzles
3. **Research deeply** - if something is captivating, investigate further
4. **Cross-reference** - look for patterns within the chapter
5. **Trust intuition** - note things that feel significant even if unclear why
6. **Document everything** - maintain detailed notes for later synthesis

## Methodologies

Reference methodologies in `/methodologies/` when performing specific tasks:

| Methodology | Use When |
|-------------|----------|
| [Source Material Processing](../methodologies/source-material-processing.md) | Converting screenshots/PDFs to metadata + notes |
| [Confirmation Bias Mitigation](../methodologies/confirmation-bias-mitigation.md) | Avoiding bias in analysis |
