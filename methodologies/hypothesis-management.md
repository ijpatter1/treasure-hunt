# Hypothesis Management Methodology

A systematic approach for creating, tracking, evaluating, and maintaining research hypotheses while avoiding confirmation bias.

---

## Overview

Hypotheses are formal theories that attempt to explain evidence. Proper hypothesis management:

- Keeps interpretations separate from facts
- Allows multiple competing theories simultaneously
- Tracks evidence for and against each theory
- Documents when theories should be abandoned
- Prevents contamination of objective analysis

---

## When to Use This Methodology

Use Hypothesis Management when:

| Condition | Example |
|-----------|---------|
| Multiple explanations are plausible | Different location theories |
| Long-term investigation | Research spanning weeks/months |
| Need to track evidence evolution | Supporting/contradicting evidence over time |
| Collaboration across analysts | Different people exploring different theories |

**Do NOT use when:**
- Only one obvious explanation exists
- Quick, one-time analysis
- No interpretive layer needed

---

## Hypothesis Lifecycle

```
┌──────────────┐
│   Created    │  New theory formed from evidence
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Active    │  Being actively investigated
└──────┬───────┘
       │
       ├──────────────────┐
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│  Suspended   │   │   Disproven  │
│              │   │              │
│ Insufficient │   │ Contradicted │
│   evidence   │   │  by evidence │
└──────────────┘   └──────────────┘
```

---

## Creating a New Hypothesis

### Step 1: Create Folder Structure

```
project/
└── hypotheses/
    └── [hypothesis-name]/
        ├── README.md           # Theory overview
        ├── summary.md          # Living summary (updated regularly)
        ├── evidence-log.md     # Chronological evidence tracking
        └── [section-name].md   # Section-specific interpretations
```

### Step 2: Write README.md

Document the theory overview:

```markdown
# Hypothesis: [Descriptive Name]

**Status:** Active | Suspended | Disproven
**Created:** YYYY-MM-DD
**Last Updated:** YYYY-MM-DD

## Theory Statement

[Clear, specific statement of what this hypothesis claims]

## Key Evidence

| Evidence | Source | Classification |
|----------|--------|----------------|
| Point 1  | Ch X   | Direct/Derived/Thematic |
| Point 2  | Source | Classification |

## Null Hypothesis

This theory would be DISPROVEN if:
- [Condition 1]
- [Condition 2]
- [Condition 3]

## Counter-Evidence

| Evidence | Source | Impact |
|----------|--------|--------|
| Point 1  | Source | How it challenges theory |

## Confidence Assessment

**Overall:** Low | Medium | High

**Justification:**
[Why this confidence level]
```

### Step 3: Create Summary.md

Living document updated as research progresses:

```markdown
# [Hypothesis Name] - Summary

*Last updated: YYYY-MM-DD*

## Current Status

[1-2 sentence summary of where this theory stands]

## Strongest Evidence

1. [Most compelling point]
2. [Second strongest]
3. [Third strongest]

## Biggest Challenges

1. [Most problematic counter-evidence]
2. [Second challenge]

## Next Steps

- [ ] Investigation to pursue
- [ ] Question to answer
```

### Step 4: Initialize Evidence Log

Chronological record of evidence discovery:

```markdown
# Evidence Log: [Hypothesis Name]

## YYYY-MM-DD

**Source:** [Where found]
**Finding:** [What was discovered]
**Impact:** Supports | Neutral | Challenges
**Notes:** [Analysis]

---

## YYYY-MM-DD

[Next entry...]
```

---

## Maintaining Hypotheses

### Regular Updates

| Frequency | Activity |
|-----------|----------|
| Per session | Update evidence-log.md with new findings |
| Weekly | Review summary.md, update status |
| Monthly | Full hypothesis review (all evidence) |

### Adding Section Interpretations

When analyzing source material through a hypothesis lens:

1. Keep foundational analysis in main files (facts only)
2. Create hypothesis-specific interpretation file
3. Reference the source analysis

```
hypotheses/mountain-x/
├── README.md
├── summary.md
├── evidence-log.md
├── chapter-07.md    # Ch 7 interpreted through this theory
├── chapter-14.md    # Ch 14 interpreted through this theory
└── poem-analysis.md # Poem interpreted through this theory
```

**Section interpretation template:**

```markdown
# Chapter X Through [Hypothesis] Lens

**Source:** chapters/chapter-XX.md
**Hypothesis:** [Name]

## Relevant Content

| Fact (from source) | Interpretation (for this theory) |
|--------------------|----------------------------------|
| Quote/fact 1       | How it supports/challenges theory |
| Quote/fact 2       | Interpretation |

## Analysis

[How this chapter's content relates to the hypothesis]

## Confidence Adjustments

**Before this chapter:** [Level]
**After this chapter:** [Level]
**Reason:** [What changed]
```

### Evidence Classification

Use consistent classification in all hypothesis files:

| Classification | Definition | Weight |
|----------------|------------|--------|
| **Direct** | Explicitly supports/contradicts | High |
| **Derived** | Logical deduction | Medium |
| **Thematic** | Pattern/theme connection | Low |
| **Speculative** | "Could mean" interpretation | Very Low |

---

## Managing Multiple Hypotheses

### Parallel Investigation

- Multiple hypotheses can be Active simultaneously
- Each gets its own folder with full documentation
- Same evidence may appear in multiple hypothesis folders

### Comparison Matrix

Maintain a comparison across hypotheses:

```markdown
# Hypothesis Comparison

| Factor | Hypothesis A | Hypothesis B | Hypothesis C |
|--------|--------------|--------------|--------------|
| Status | Active | Active | Suspended |
| Confidence | Medium | Low | Low |
| Direct evidence | 3 points | 1 point | 2 points |
| Counter-evidence | 1 point | 2 points | 4 points |
| Biggest strength | [Summary] | [Summary] | [Summary] |
| Biggest weakness | [Summary] | [Summary] | [Summary] |
```

### Status Transitions

**Active → Suspended:**
- Insufficient evidence to continue actively pursuing
- More promising hypothesis takes priority
- Resources needed elsewhere
- Document reason and conditions for reactivation

**Active → Disproven:**
- Direct contradiction found
- Null hypothesis condition met
- Document the disproving evidence clearly

**Suspended → Active:**
- New evidence discovered
- Other hypotheses eliminated
- Document what changed

---

## Integration with Other Methodologies

| Methodology | Integration Point |
|-------------|-------------------|
| [Source Material Processing](source-material-processing.md) | Metadata/notes are facts; interpretations go in hypothesis folders |
| [Chapter Analysis](chapter-analysis.md) | Chapter summaries are facts; hypothesis folders have interpretations |
| [ETL Consolidation](etl-consolidation.md) | Only consolidate facts, not hypothesis-specific interpretations |
| [Confirmation Bias Mitigation](confirmation-bias-mitigation.md) | Hypothesis structure enforces fact/interpretation separation |

---

## Example Application

**Project:** Lion's Share Treasure Hunt
**Hypothesis type:** Location theories

**Folder structure:**
```
lions-share/
├── chapters/           # Facts (hypothesis-neutral)
├── research/           # Facts (hypothesis-neutral)
├── summary.md          # Facts (hypothesis-neutral)
│
└── hypotheses/
    ├── rocky-face-mountain/
    │   ├── README.md
    │   ├── summary.md
    │   ├── evidence-log.md
    │   ├── chapter-04.md
    │   ├── chapter-14.md
    │   └── poem-mapping.md
    │
    └── [other-location]/
        └── ...
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Hypothesis content in facts files | Boundary violation | Audit and move interpretive content |
| No counter-evidence documented | Confirmation bias | Force red-teaming before updates |
| Stale hypothesis files | Not maintained | Set regular review schedule |
| Too many active hypotheses | Resource dilution | Prioritize or suspend lower-confidence |

---

*Last updated: January 9, 2026*
