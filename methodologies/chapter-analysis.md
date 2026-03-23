# Chapter/Section Analysis Methodology

A systematic approach for analyzing chapters, sections, or discrete portions of a document to extract structured information consistently.

---

## Overview

Chapter analysis consolidates information from multiple source pages into a single summary document. The methodology ensures:

- Consistent coverage across all sections
- No information loss during consolidation
- Structured output for downstream processing
- Clear traceability to source material

---

## When to Use This Methodology

Use Chapter Analysis when you have:

| Condition | Example |
|-----------|---------|
| Multi-page sections to summarize | Book chapters, report sections |
| Need for consistent data extraction | Same categories across all sections |
| Source material already processed | Metadata + notes files exist |
| Cross-section pattern detection needed | Themes spanning multiple chapters |

**Do NOT use when:**
- Summarizing a single page (use notes file directly)
- Source material not yet processed (do Source Material Processing first)
- Free-form analysis without structure needed

---

## Prerequisites

Before starting chapter analysis:

1. **Source material processed**
   - All pages have metadata files (JSON/YAML)
   - All pages have notes files (Markdown)
   - Source Material Processing methodology completed

2. **Chapter/section boundaries identified**
   - Page ranges for each section defined
   - Table of contents or section list available

3. **Output template defined**
   - Consistent sections for all summaries
   - Data categories determined

---

## Critical Requirement: Read ALL Source Types

**You MUST read BOTH metadata AND notes files for EVERY page before writing a section summary.**

For each page in a section:
1. Read metadata file (e.g., `page-XXX.json`) - contains **actual source text**
2. Read notes file (e.g., `page-XXX.md`) - contains **analysis and observations**

**If you only read notes files, you are missing the actual source content.**

```
┌─────────────────────────────────────────────────────────────────┐
│ BEFORE WRITING ANY SUMMARY                                      │
│                                                                 │
│ ✓ Read metadata for page 1 (full text)                          │
│ ✓ Read notes for page 1 (analysis)                              │
│ ✓ Read metadata for page 2 (full text)                          │
│ ✓ Read notes for page 2 (analysis)                              │
│ ... repeat for ALL pages in section ...                         │
│                                                                 │
│ THEN write summary                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Process

### Phase A: Gather Source Files

Identify all source files for the section:

```
For Chapter 5 (pages 56-63):
  - pages/metadata/page-056-057.json
  - pages/notes/page-056-057.md
  - pages/metadata/page-058-059.json
  - pages/notes/page-058-059.md
  - pages/metadata/page-060-061.json
  - pages/notes/page-060-061.md
  - pages/metadata/page-062-063.json
  - pages/notes/page-062-063.md
```

### Phase B: Read and Extract

For each page spread:
1. Read metadata file completely
2. Read notes file completely
3. Extract data into template categories
4. Note cross-references to other sections

### Phase C: Write Summary

Create summary document following template structure.

**Summary template:**

```markdown
# Section X: [Title]

**Subtitle:** *[Subtitle if applicable]*
**Pages:** [start]-[end]

## Key Items
| Item | Description | Source |

## Summary
[2-3 paragraph synopsis of content and key points]

## Geographic References
| Location | Context | Relevance |

## People/Figures
| Person | Role/Connection |

## Key Phrases
| Phrase | Context | Analysis |

## Numbers/Dates
| Value | Context |

## Cross-Section Patterns
- [ ] Pattern to track across document

## Research Questions
1. Questions raised by this section

## Source Files
- page-XXX-XXX.json/md
- page-YYY-YYY.json/md
```

### Phase D: Verify

Confirm summary completeness:

- [ ] All source files were read
- [ ] Summary covers all template categories
- [ ] No significant content omitted
- [ ] Cross-references noted
- [ ] Source files listed

---

## What to Track During Analysis

Extract these categories from every section:

| Category | What to Capture | Example |
|----------|-----------------|---------|
| **Geographic references** | Place names, landmarks, regions | Cities, parks, mountains |
| **People/figures** | Names, roles, connections | Historical figures, experts |
| **Repeated themes** | Patterns across sections | Words, concepts, imagery |
| **Unusual phrasing** | Deliberately worded text | Quotes that seem significant |
| **Section subtitles** | May form pattern | Titles as a group |
| **Images/visuals** | Described in metadata | Photos, diagrams, illustrations |
| **Quotes and sources** | Attributed statements | Who said what |
| **Numbers/dates** | Measurements, years, quantities | Potential significance |
| **Cross-references** | Links to other sections | Themes spanning sections |

---

## Summary Guidelines

When writing section summaries:

| Guideline | Explanation |
|-----------|-------------|
| **Summarize, don't transcribe** | Synthesize key information, not full text |
| **Prioritize relevance** | Focus on content matching project goals |
| **Note connections** | Personal details, relationships, contexts |
| **Flag explicit instructions** | Direct guidance from source author |
| **Track patterns** | Themes repeating across sections |

---

## Example Application

**Project:** Lion's Share Treasure Hunt
**Source document:** "There's Treasure Inside" book
**Section type:** Chapters (23 total)

**Template customization:**

```markdown
# Chapter X: [Title]

**Subtitle:** *[Subtitle]*
**Pages:** [start]-[end]

## Treasure Items
| Item | Description | Provenance |

## Chapter Summary
[2-3 paragraph synopsis]

## Geographic References
| Location | Context | Relevance |

## Historical Figures
| Person | Role |

## Key Phrases & Potential Clues
| Phrase | Context | Analysis |

## Numbers
| Number | Context |

## Cross-Chapter Patterns
- [ ] Pattern to track

## Research Questions
1. Questions from this chapter

## Source Files
- page-XXX-XXX.json/md
```

**Key customizations:**
- "Treasure Items" section specific to treasure hunt
- "Historical Figures" instead of generic "People"
- "Potential Clues" in key phrases
- Cross-CHAPTER patterns (not cross-section)

---

## Integration with Other Methodologies

| Methodology | Integration Point |
|-------------|-------------------|
| [Source Material Processing](source-material-processing.md) | Prerequisite - provides metadata + notes input |
| [ETL Consolidation](etl-consolidation.md) | Chapter summaries become source for consolidation |
| [Confirmation Bias Mitigation](confirmation-bias-mitigation.md) | Separate facts from interpretations in summaries |
| [Hypothesis Management](hypothesis-management.md) | Create hypothesis-specific chapter interpretations |

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Missing content in summary | Only read notes, not metadata | Read BOTH file types for every page |
| Inconsistent summaries | Template drift | Review template before each chapter |
| Duplicate information | Same content in multiple sources | Consolidate during summary writing |
| Overwhelmed by content | Too much to synthesize | Process in smaller page batches |

---

*Last updated: January 9, 2026*
