# Research Methodologies

Reusable workflows for systematic research and analysis. These methodologies are project-agnostic and can be applied to any structured research effort.

---

## Documented Methodologies

| Methodology | Description | Status |
|-------------|-------------|--------|
| [Source Material Processing](source-material-processing.md) | Converting raw source material (screenshots, PDFs) into structured metadata + analysis notes | Documented |
| [Chapter Analysis](chapter-analysis.md) | Systematic analysis of book chapters or document sections following a consistent template | Documented |
| [ETL Consolidation](etl-consolidation.md) | Extract-Transform-Load for multi-file data consolidation | Documented |
| [Confirmation Bias Mitigation](confirmation-bias-mitigation.md) | Practices to avoid fitting facts to pre-existing theories | Documented |
| [Hypothesis Management](hypothesis-management.md) | Creating, evaluating, maintaining, and deprecating research hypotheses | Documented |

---

## Planned Methodologies

| Methodology | Description | Priority |
|-------------|-------------|----------|
| **Research Verification** | External fact-checking workflow using web searches and authoritative sources | Medium |
| **Cross-Reference Mapping** | Identifying and documenting connections between disparate pieces of information | Low |

---

## When to Use These Methodologies

### Source Material Processing
Use when you need to:
- Convert visual source material into text
- Create structured data from unstructured sources
- Separate raw transcription from analytical observations

### Chapter Analysis
Use when you need to:
- Systematically analyze a book or document
- Ensure consistent coverage across all sections
- Track specific data types across multiple chapters

### ETL Consolidation
Use when you need to:
- Consolidate data from multiple similarly-structured source files
- Create a master summary document from distributed content
- Deduplicate and normalize information across files
- Maintain traceability from consolidated data back to sources

### Confirmation Bias Mitigation
Use when you need to:
- Maintain objectivity in analysis
- Separate facts from interpretations
- Actively challenge your own theories

### Hypothesis Management
Use when you need to:
- Formalize research theories
- Track evidence for and against hypotheses
- Manage multiple competing theories simultaneously
- Avoid confirmation bias in research

---

## Methodology Relationships

```
Source Material Processing
         │
         ▼
   Chapter Analysis ──────────┐
         │                    │
         ▼                    ▼
  ETL Consolidation    Hypothesis Management
         │                    │
         └────────┬───────────┘
                  │
                  ▼
    Confirmation Bias Mitigation
        (applies throughout)
```

---

## Contributing New Methodologies

When documenting a new methodology:

1. Create a new file: `methodologies/[methodology-name].md`
2. Follow this structure:
   - **Overview**: What problem does this solve?
   - **When to Use**: Specific scenarios where this applies
   - **Prerequisites**: What must be in place before starting
   - **Process**: Step-by-step workflow
   - **Verification**: How to confirm success
   - **Example Application**: Real-world case study
3. Update this README with the new entry

---

*Last updated: January 9, 2026*
