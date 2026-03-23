# Confirmation Bias Mitigation Methodology

A systematic approach for maintaining objectivity in research by separating facts from interpretations and actively challenging theories.

---

## Overview

Confirmation bias is the tendency to favor information that confirms existing beliefs while discounting contradictory evidence. In research contexts, this leads to:

- Fitting observations into pre-existing theories
- Ignoring evidence that contradicts hypotheses
- Over-weighting suggestive evidence vs. definitive proof
- Backfitting theories to match new discoveries

This methodology provides structured practices to recognize and counteract these tendencies.

---

## When to Use This Methodology

Use Confirmation Bias Mitigation when:

| Condition | Example |
|-----------|---------|
| Developing research hypotheses | Location theories, authorship attribution |
| Interpreting ambiguous evidence | Clues with multiple meanings |
| Synthesizing information | Building conclusions from facts |
| Working on long-term projects | Accumulated assumptions need challenging |

**Apply continuously throughout research, not as a one-time check.**

---

## Common Bias Patterns

Recognize these patterns in your own thinking:

| Pattern | Description | Warning Signs |
|---------|-------------|---------------|
| **Cherry-picking** | Selecting supportive evidence, ignoring contrary | "All the evidence points to X" |
| **Backfitting** | Reinterpreting old evidence to fit new theory | "This actually means..." |
| **Anchoring** | Over-relying on first interpretation | Difficulty considering alternatives |
| **Clustering illusion** | Seeing patterns in random data | "These can't be coincidences" |
| **Motivated reasoning** | Wanting a conclusion to be true | Emotional attachment to theory |

---

## Prevention Practices

### 1. Separate Facts from Interpretation

Maintain distinct storage for each:

| Content Type | Storage Location | Example |
|--------------|------------------|---------|
| Facts | Primary documents | `chapters/`, `research/`, `summary.md` |
| Interpretations | Hypothesis folders | `hypotheses/[name]/` |

**Never merge interpretation into facts files.** This contamination makes it impossible to evaluate evidence objectively later.

### 2. State Null Hypotheses

For every theory, document what would DISPROVE it:

```markdown
## Hypothesis: Treasure is at Location X

**Supporting evidence:**
- Fact A suggests X
- Fact B aligns with X

**Null hypothesis (would disprove):**
- If the author has never visited region containing X
- If X was developed after the book was written
- If explicit clue contradicts X geography
```

### 3. Red-Team Your Work

Actively seek counter-evidence:

- After building a theory, spend equal time trying to break it
- Ask: "What would someone trying to disprove this look for?"
- Research alternatives before committing to a conclusion

### 4. Use Confidence Ratings

Mark interpretations with explicit confidence levels:

| Level | Criteria | Use When |
|-------|----------|----------|
| **High** | Direct evidence, multiple sources | Fact explicitly stated |
| **Medium** | Reasonable inference, single source | Logical deduction |
| **Low** | Speculation, theory-dependent | "Could mean" interpretations |

### 5. Document Alternatives

For each piece of evidence, note other possible meanings:

```markdown
| Evidence | Interpretation A | Interpretation B | Interpretation C |
|----------|------------------|------------------|------------------|
| "Blue iris" | Blue iris flowers | Eye color | Specific person named Iris |
```

### 6. Date Hypotheses

Track when theories formed to avoid backfitting:

```markdown
## Hypothesis: Mountain X is the location

**Formed:** 2026-01-05
**Based on:** Chapters 1-10 analysis
**Status:** Active

### Evidence added after formation:
- [2026-01-07] Chapter 14 mention of "peaks" - supports
- [2026-01-08] Back cover poem analysis - neutral
- [2026-01-09] Author interview found - CONTRADICTS (author says "not in mountains")
```

### 7. Periodic Theory Reviews

Schedule regular re-evaluation:

- Review accumulated evidence monthly
- Question assumptions that have "always been true"
- Invite fresh perspective (different analyst, AI review)

---

## Evidence Classification

Classify evidence by objectivity:

| Classification | Definition | Belongs In |
|----------------|------------|------------|
| **Direct Reference** | Source explicitly states something | Facts files |
| **Verified External** | Confirmed via independent sources | Facts files |
| **Derived** | Logical deduction from facts | Hypothesis files |
| **Thematic Connection** | Pattern that may be intentional | Hypothesis files |
| **Speculative** | Fitting facts to theory | Hypothesis files |

**Rule:** Facts files should contain ONLY Direct Reference and Verified External evidence.

---

## Integration with Other Methodologies

| Methodology | Integration Point |
|-------------|-------------------|
| [Source Material Processing](source-material-processing.md) | Confidence levels in notes files |
| [Chapter Analysis](chapter-analysis.md) | Facts in summaries, interpretations separate |
| [ETL Consolidation](etl-consolidation.md) | Only consolidate verified facts |
| [Hypothesis Management](hypothesis-management.md) | Hypothesis folder structure enforces separation |

---

## Self-Assessment Checklist

Use periodically during research:

- [ ] Have I stated what would disprove my leading theory?
- [ ] Have I spent time actively seeking counter-evidence?
- [ ] Are my facts files free of interpretation?
- [ ] Have I documented alternative meanings for key evidence?
- [ ] Can I trace each conclusion back to classified evidence?
- [ ] Have I reviewed assumptions formed early in research?
- [ ] Am I emotionally attached to a specific conclusion?

---

## Example Application

**Project:** Lion's Share Treasure Hunt
**Bias risk:** High (compelling narrative, ambiguous clues)

**Applied practices:**

| Practice | Implementation |
|----------|----------------|
| Fact/interpretation separation | `chapters/` = facts, `hypotheses/` = interpretations |
| Null hypotheses | Each location theory documents disproving criteria |
| Confidence ratings | Page notes use Low/Medium/High |
| Evidence classification | 5-tier system in all analysis |
| Alternative documentation | Key phrases tables include multiple interpretations |

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Everything supports the theory | Confirmation bias active | Force time seeking counter-evidence |
| Can't find alternatives | Anchoring on first interpretation | Research phrase/concept independently |
| Facts files contain interpretation | Boundary creep | Audit and move interpretive content |
| Theory feels "certain" | Overconfidence from repetition | State it as hypothesis, list unknowns |

---

*Last updated: January 9, 2026*
