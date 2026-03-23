# Source Material Processing Methodology

A systematic approach for converting raw source material (screenshots, PDFs, scanned pages) into structured metadata and analysis notes.

---

## Overview

This methodology separates **extraction** (what the source says) from **analysis** (what it means). This separation:

- Preserves original content for reference
- Allows multiple interpretations of the same source
- Creates an audit trail from conclusions back to evidence
- Enables parallel processing by multiple analysts

---

## When to Use This Methodology

Use Source Material Processing when you have:

| Condition | Example |
|-----------|---------|
| Visual source material | Book page screenshots, PDFs, scanned documents |
| Need for full text extraction | Creating searchable text from images |
| Separate fact vs. interpretation needs | Research requiring objectivity |
| Multi-page source documents | Books, reports, manuscripts |

**Do NOT use when:**
- Source material is already structured text
- No analysis layer is needed (just transcription)
- Single-page, one-time reference

---

## Prerequisites

Before starting:

1. **Source files organized**
   - Consistent naming convention
   - Stored in dedicated directory
   - Quality sufficient for extraction

2. **Output directory structure defined**
   - Separate folders for metadata and notes
   - Naming convention established

3. **Template formats decided**
   - Metadata schema (JSON, YAML, etc.)
   - Notes format (Markdown sections)

---

## Process

### Phase A: File Organization

Create directory structure for inputs and outputs:

```
project/
├── source/           # Raw source material
│   └── page-XXX.png  # Named with page/section identifiers
│
├── metadata/         # Structured extraction (JSON/YAML)
│   └── page-XXX.json # Same naming as source
│
└── notes/            # Analysis markdown
    └── page-XXX.md   # Same naming as source
```

**Naming convention:**
- Use consistent identifiers across all three directories
- Include page numbers, section IDs, or sequence numbers
- Example: `page-018-019.png` → `page-018-019.json` + `page-018-019.md`

### Phase B: Metadata Extraction

Create structured data from each source file:

```
┌─────────────────────────────────────────────────────────────────┐
│ METADATA EXTRACTION                                             │
│                                                                 │
│ For each source file:                                           │
│   1. Read/view source material                                  │
│   2. Extract all text content                                   │
│   3. Note formatting (bold, italic, headers)                    │
│   4. Describe any images/diagrams                               │
│   5. Identify key elements (names, dates, locations)            │
│   6. Save as structured data                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Metadata schema example (JSON):**

```json
{
  "source_file": "page-018-019.png",
  "extracted_date": "2026-01-09",
  "left_page": {
    "page_number": 18,
    "content_type": "chapter_start",
    "full_text": "Chapter 1: [Full transcription here...]",
    "formatting": {
      "title": "Chapter 1: The 120 Carat Sapphire",
      "subtitle": "A Plan That Changed the World",
      "emphasized_text": ["quote in italics", "bold phrase"]
    },
    "images": [
      {
        "description": "Large blue sapphire crystal",
        "text_in_image": "None"
      }
    ],
    "key_elements": ["sapphire", "120 carat", "Sri Lanka"]
  },
  "right_page": {
    "page_number": 19,
    "...": "..."
  }
}
```

**Critical rules:**
- Extract ALL text, not just what seems important
- Preserve original formatting indicators
- Describe images even if they seem decorative
- Do NOT interpret during extraction

### Phase C: Analysis Notes

Create interpretation and analysis for each source:

```
┌─────────────────────────────────────────────────────────────────┐
│ ANALYSIS NOTES                                                  │
│                                                                 │
│ For each source file:                                           │
│   1. Read metadata extraction                                   │
│   2. Identify significant elements                              │
│   3. Note observations with confidence levels                   │
│   4. Cross-reference related sources                            │
│   5. Record research questions                                  │
│   6. Verify against original source                             │
└─────────────────────────────────────────────────────────────────┘
```

**Notes template (Markdown):**

```markdown
# [Section/Chapter Name]: Pages X-X

## Page X (Left) - [Content Type]

[Image description if applicable]

> [Key quoted text from source]

**Key Points:**
- Summary point 1
- Summary point 2

| Element | Observation | Confidence |
|---------|-------------|------------|
| Item    | Analysis    | Low/Medium/High |

---

## Page X (Right) - [Content Type]
[Same structure as left page]

---

## Cross-References
- Related sources or analysis documents

**Verification Status**: VERIFIED against source.
```

**Notes guidelines:**
- Separate pages with horizontal rules (`---`)
- Use blockquotes (`>`) for direct quotes
- Include confidence levels for interpretations
- Always verify against original source
- Cross-reference related content

### Phase D: Verification

Confirm processing quality:

- [ ] All source files have corresponding metadata
- [ ] All source files have corresponding notes
- [ ] Metadata contains full text extraction
- [ ] Notes reference metadata correctly
- [ ] Cross-references are accurate
- [ ] Confidence levels assigned to interpretations

---

## Confidence Levels

Assign confidence to observations in notes:

| Level | Definition | Use When |
|-------|------------|----------|
| **High** | Directly stated in source | Explicit quotes, clear facts |
| **Medium** | Reasonable inference | Implied meanings, context clues |
| **Low** | Speculation | Possible interpretations, theories |

---

## Example Application

**Project:** Lion's Share Treasure Hunt
**Source material:** Book page screenshots
**Processing approach:**

| Component | Implementation |
|-----------|----------------|
| Source directory | `lions-share/screenshots/` |
| Metadata format | JSON with left/right page structure |
| Notes format | Markdown with tables and confidence ratings |
| Naming | `page-XXX-XXX.png/json/md` |

**Sample file set:**
```
lions-share/
├── screenshots/
│   └── page-018-019.png
├── pages/metadata/
│   └── page-018-019.json
└── pages/notes/
    └── page-018-019.md
```

---

## Integration with Other Methodologies

| Methodology | Integration Point |
|-------------|-------------------|
| [Chapter Analysis](chapter-analysis.md) | Uses metadata + notes as input for chapter summaries |
| [ETL Consolidation](etl-consolidation.md) | Notes files become source for data extraction |
| [Confirmation Bias Mitigation](confirmation-bias-mitigation.md) | Notes include confidence levels to prevent overconfidence |

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Text extraction errors | Poor source quality | Use higher resolution source or manual transcription |
| Missing interpretations | Rushed analysis | Re-review with fresh perspective |
| Inconsistent notes | Template drift | Review template before each batch |
| Lost cross-references | Siloed processing | Batch process related sources together |

---

*Last updated: January 9, 2026*
