# ETL Consolidation Methodology

A systematic approach for consolidating data from multiple similarly-structured source files into a single comprehensive target document.

---

## Overview

**ETL** stands for **Extract, Transform, Load** - a data processing pattern borrowed from data engineering. This methodology adapts ETL for document-based research workflows where:

- Information is distributed across many source files
- Source files follow a consistent structure/template
- A consolidated summary is needed for analysis
- Traceability back to sources must be maintained

---

## When to Use This Methodology

Use ETL Consolidation when you have:

| Condition | Example |
|-----------|---------|
| Multiple source files (5+) | 25 chapter analysis files |
| Consistent structure across sources | Each file has same section headers |
| Need for consolidated view | Master summary document |
| Data that requires deduplication | Same person mentioned in multiple files |
| Traceability requirements | Need to know which source each fact came from |

**Do NOT use when:**
- Source files have inconsistent structures
- Only 1-3 source files exist (just read them directly)
- No deduplication or transformation is needed
- Real-time updates are required (ETL is batch-oriented)

---

## Prerequisites

Before starting ETL consolidation:

1. **Verify source file consistency**
   - All source files must follow the same template
   - Section headers must be extractable programmatically
   - Data format (tables, lists, etc.) must be consistent

2. **Define target document structure**
   - Know where consolidated data will go
   - Design the final format before starting
   - Decide on grouping/categorization scheme

3. **Plan data categories**
   - List all data types to extract
   - Prioritize which to process first
   - Identify transform rules for each category

---

## Process

### Phase A: Setup

Create a staging directory for intermediate files:

```
project/
└── staging/
    ├── 1-[category-a]-raw.md
    ├── 1-[category-a]-clean.md
    ├── 2-[category-b]-raw.md
    ├── 2-[category-b]-clean.md
    └── ...
```

**Naming convention:**
- Number prefix for processing order
- Descriptive category name
- `-raw` suffix for extract output
- `-clean` suffix for transform output

### Phase B: Extract

For each data category, process ALL source files:

```
┌─────────────────────────────────────────────────────────────────┐
│ EXTRACT                                                         │
│                                                                 │
│ For each source file:                                           │
│   1. Read file                                                  │
│   2. Locate target section                                      │
│   3. Extract data with source reference                         │
│   4. Append to *-raw.md file                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Raw file format:**

```markdown
# [Category Name] - Raw Extract

Extracted from [N] source files on [DATE].

---

## From [Source File 1]

[Extracted data - tables, lists, etc.]

## From [Source File 2]

[Extracted data]

...
```

**Critical rules:**
- Process ONE category at a time (all files)
- Include source file reference for every entry
- Preserve original formatting from source
- Do not transform during extraction

### Phase C: Transform

Apply cleaning and normalization rules:

```
┌─────────────────────────────────────────────────────────────────┐
│ TRANSFORM                                                       │
│                                                                 │
│ 1. Read raw file                                                │
│ 2. Deduplicate entries                                          │
│ 3. Consolidate source references                                │
│ 4. Sort/group by defined criteria                               │
│ 5. Apply category-specific rules                                │
│ 6. Write to *-clean.md file                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Common transform rules:**

| Rule | Description | Example |
|------|-------------|---------|
| Deduplication | Remove exact duplicates | Same entry in multiple sources |
| Reference consolidation | Merge source refs for same item | "Ch 1, Ch 5, Ch 12" |
| Sorting | Alphabetical, chronological, by frequency | Sort names A-Z |
| Grouping | Categorize by type or region | US vs International locations |
| Frequency analysis | Count occurrences | "Appears in 5 sources" |
| Synthesis | Combine related entries | Merge partial information |

**Clean file format:**

```markdown
# [Category Name] - Cleaned & Consolidated

Transformed from raw extract on [DATE].
[Description of transform rules applied]

---

## [Group/Category 1]

| Column A | Column B | Sources |
|----------|----------|---------|
| Entry 1  | Value    | Src 1, 3 |
| Entry 2  | Value    | Src 2 |

## [Group/Category 2]

...
```

### Phase D: Load

Insert cleaned data into target document:

```
┌─────────────────────────────────────────────────────────────────┐
│ LOAD                                                            │
│                                                                 │
│ 1. Read target document                                         │
│ 2. Identify insertion point                                     │
│ 3. Read clean staging file                                      │
│ 4. Insert/replace section                                       │
│ 5. Verify markdown formatting                                   │
│ 6. Update timestamp                                             │
└─────────────────────────────────────────────────────────────────┘
```

**Loading strategies:**

| Strategy | When to Use |
|----------|-------------|
| Insert new section | Category doesn't exist in target |
| Replace existing | Updating outdated section |
| Append to section | Adding to existing content |
| Merge with existing | Combining new and old data |

### Phase E: Verification

Confirm successful consolidation:

- [ ] All source files were processed
- [ ] Each category has raw and clean staging files
- [ ] Target document contains all new sections
- [ ] No duplicate entries in final output
- [ ] Source references preserved for traceability
- [ ] Markdown formatting is valid
- [ ] Timestamp updated in target document

---

## Staging File Retention

**Options:**

| Option | Pros | Cons |
|--------|------|------|
| Keep staging files | Audit trail, re-runnable | Disk space, clutter |
| Delete after load | Clean workspace | No audit trail |
| Archive to subfolder | Best of both | Extra step |

**Recommendation:** Keep staging files for at least one iteration. They serve as:
- Debugging aid if issues arise
- Documentation of transform logic
- Baseline for incremental updates

---

## Transform Rules by Data Type

### People/Names

```
Transform rules:
- Deduplicate by name (case-insensitive)
- Consolidate source references
- Sort alphabetically by last name
- Add synthesized "role" or "connection" column
```

### Locations/Geography

```
Transform rules:
- Deduplicate by place name
- Group by: Country → State/Region → City
- Track frequency (potential significance indicator)
- Separate domestic vs international
```

### Key Phrases/Quotes

```
Transform rules:
- Deduplicate exact matches
- Track frequency across sources
- Flag phrases matching known patterns
- Categorize: Confirmed vs Potential
```

### Numbers/Dates

```
Transform rules:
- Group by type: Years, Measurements, Quantities
- Note recurring values
- Flag numbers matching known significant values
- Sort chronologically or by magnitude
```

### Patterns/Themes

```
Transform rules:
- Create frequency matrix: Pattern × Source
- Calculate occurrence counts
- Rank by frequency
- Note correlations with other patterns
```

---

## Example Application

**Project:** Lion's Share Treasure Hunt
**Source files:** 25 chapter analysis files (`chapters/*.md`)
**Target document:** `summary.md`

**Data categories processed:**

| Category | Sources | Transform Rules | Result |
|----------|---------|-----------------|--------|
| Treasure Items | 25 files | Group by type, dedupe | 50+ items in 6 categories |
| Historical Figures | 25 files | Dedupe, sort A-Z, add connection | 13 key figures |
| Geographic References | 25 files | Group by region, frequency | US/International breakdown |
| Key Phrases | 25 files | Categorize, frequency | Author-confirmed + potential |
| Numbers | 25 files | Group by type | 8 significant numbers |
| Cross-Chapter Patterns | 25 files | Frequency matrix | 9 patterns tracked |

**Staging directory:**
```
lions-share/staging/
├── 1-treasure-items-raw.md
├── 1-treasure-items-clean.md
├── 2-geographic-refs-raw.md
├── 2-geographic-refs-clean.md
├── 3-historical-figures-raw.md
├── 3-historical-figures-clean.md
├── 4-key-phrases-raw.md
├── 4-key-phrases-clean.md
├── 5-numbers-raw.md
├── 5-numbers-clean.md
├── 6-patterns-raw.md
└── 6-patterns-clean.md
```

**Outcome:** Summary document gained 6 new consolidated sections with full traceability to source chapters.

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Missing data in output | Source file structure varied | Verify template consistency |
| Duplicate entries remain | Dedup rule too strict | Loosen matching criteria |
| Lost source references | Forgot to track during extract | Re-run extract phase |
| Formatting errors in target | Markdown syntax issues | Validate before loading |
| Transform took too long | Too many source files | Process in batches |

---

## Summary

ETL Consolidation provides a systematic, auditable approach to consolidating distributed data. The key principles are:

1. **One category at a time** - Complete full pipeline for each category
2. **Preserve sources** - Always track where data came from
3. **Staging files** - Use intermediate files for debugging and audit
4. **Verify at each phase** - Don't proceed with bad data

---

*Last updated: January 9, 2026*
