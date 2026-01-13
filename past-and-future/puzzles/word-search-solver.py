#!/usr/bin/env python3
"""
Word Search Solver for Past and Future Box
Extracts all words in all 8 directions with exact coordinates.

Usage: python word-search-solver.py
"""

# The grid from Chapter XXVI (15 rows x 20 columns)
# Using 0-indexed internally, output as 1-indexed for human readability
GRID = [
    "QVUCALILENINETEEN BMA",  # Note: space is placeholder, will fix below
    "CRETEHTREAOUCSIFEVLE",
    "OROUNDHNIMI HSTOLIAR O",
    "UHTRONROEOCEHSRARDWO",
    "NOUBTDELOELTLNTRETAL",
    "TETATSEONYNEOA OLINE O",
    "PMUEHTTSEWODAHREERET",
    "EONSKAE PTOOOI LPASIEC",
    "LESDBNOORAOOEVLEWTSR",
    "ENTUFIVETN TNCOI UJTSO",
    "VRNIEMAKLA WESCOD TRID",
    "EADTTEYOSSQUAREEERHТ",
    "NM TOPLECEOHETQUARR YO",
    "NSIOSMIXZFDQB CCASLIY",
    "APSOREZNGQZPSAPPHIRE",
]

# Corrected grid - the actual letters from the book
GRID = [
    "QVUCALILENINETEENBMA",
    "CRETEHTREAOUCSIFEVLE",
    "OROUNDHNIMIIHSTOLIAR O".replace(" ", ""),
    "UHTRONROEOCEHSRARDWO",
    "NOUBTDELOELTLNTRETAW",
    "TETATSEONYNEOA OLINEO".replace(" ", ""),
    "PMUEHTTSEWODAHREERET",
    "EONSKAE PTOOOI LPASIEC".replace(" ", ""),
    "LESDBNOORAOOEVLEWTSR",
    "ENTUFIVETN TNCOI UJTSO".replace(" ", ""),
    "VRNIEMAKLA WESCOD TRID".replace(" ", ""),
    "EADTTEYOSSQUAREEERHТ".replace("Т", "T"),  # Cyrillic T fix
    "NM TOPLECEOHETQUARR YO".replace(" ", ""),
    "NSIOSMIXZFDQB CCASLIY".replace(" ", ""),
    "APSOREZNGQZPSAPPHIRE",
]

# Clean grid - exact transcription from word-search-solution.md
GRID = [
    "QVUCALILENINETEEN BMA",
    "CRETEHTRЕАOUCSIFEVLE",
    "OROUNDHNIMIНSTOLIAR O",
    "UHTRONROEOCEHSRARDWO",
    "NOUBTDELOELTLNTRETAW",
    "TETATSEONYNEOA OLINEO",
    "PMUEHTTSEWODAHREERET",
    "EONSKАEPTOOOI LPASIEC",
    "LESDBNOORAOOEVLEWTSR",
    "ENTUFIVETN TNCOI UJTSO",
    "VRNIEMAKLAWESCOD TRID",
    "EADTTEYOSSQUAREEERHТ",
    "NMTOPLECEOHETQUARR YO",
    "NSIOSMIXZFDQBCCASLIY",
    "APSOREZNGQZPSAPPHIRE",
]

# Final clean grid - exact 20 characters per row
GRID = [
    "QVUCALILENINEENBMA",  # Row 1 - fixing
]

# Let me use the exact grid from the solution file
GRID = """QVUCALILENINEENBMA
CRETEHTEAOUCSIFEVLE
OROUNDHNIMIНSTOLIAR O
UHTRONROEOCEHSRARDWO
NOUBTDELOELTLNTRETAW
TETATSEONYNEOA OLINEO
PMUEHTTSEWODAHREERET
EONSKАEPTOOOI LPASIEC
LESDBNOORAOOEVLEWTSR
ENTUFIVETN TNCOI UJTSO
VRNIEMAKLAWESCOD TRID
EADTTEYOSSQUAREEERHТ
NMTOPLECEOHETQUARR YO
NSIOSMIXZFDQBCCASLIY
APSOREZNGQZPSAPPHIRE"""

# Exact grid from the word-search-solution.md file
GRID = [
    "QVUCALILENINETEEN BMA".replace(" ", ""),  # becomes QVUCALININETEEN BMA but that's wrong
]

# I'll manually transcribe correctly:
GRID = [
    #1234567890123456789 0 (20 chars)
    "QVUCALILENINETEEN BMA".replace(" ", ""),  # Nope, let me do this properly
]

# FINAL CORRECT GRID - transcribed exactly from solution file
GRID = [
    "QVUCALILENINEENBMA",   # Row 1: 19 chars?
]

# Let me just hardcode the exact grid from the markdown
GRID_RAW = """
Q  V  U  C  A  L  I  L  E  N  I  N  E  T  E  E  N  B  M  A
C  R  E  T  E  H  T  R  E  A  O  U  C  S  I  F  E  V  L  E
O  R  O  U  N  D  H  N  I  M  I  H  S  T  O  L  I  A  R  O
U  H  T  R  O  N  R  O  E  O  C  E  H  S  R  A  R  D  W  O
N  O  U  B  T  D  E  L  O  E  L  T  L  N  T  R  E  T  A  W
T  E  T  A  T  S  E  O  N  Y  N  E  O  A  O  L  I  N  E  O
P  M  U  E  H  T  T  S  E  W  O  D  A  H  R  E  E  R  E  T
E  O  N  S  K  A  E  P  T  O  O  O  I  L  P  A  S  I  E  C
L  E  S  D  B  N  O  O  R  A  O  O  E  V  L  E  W  T  S  R
E  N  T  U  F  I  V  E  T  N  T  N  C  O  I  U  J  T  S  O
V  R  N  I  E  M  A  K  L  A  W  E  S  C  O  D  T  R  I  D
E  A  D  T  T  E  Y  O  S  S  Q  U  A  R  E  E  E  R  H  T
N  M  T  O  P  L  E  C  E  O  H  E  T  Q  U  A  R  R  Y  O
N  S  I  O  S  M  I  X  Z  F  D  Q  B  C  C  A  S  L  I  Y
A  P  S  O  R  E  Z  N  G  Q  Z  P  S  A  P  P  H  I  R  E
""".strip()

# Parse the grid
GRID = []
for line in GRID_RAW.split('\n'):
    row = line.replace(' ', '')
    GRID.append(row)

# Verify dimensions
assert len(GRID) == 15, f"Expected 15 rows, got {len(GRID)}"
for i, row in enumerate(GRID):
    assert len(row) == 20, f"Row {i+1} has {len(row)} chars, expected 20: {row}"

# Direction vectors (row_delta, col_delta)
DIRECTIONS = {
    'E':  (0, 1),    # East - horizontal right
    'W':  (0, -1),   # West - horizontal left
    'S':  (1, 0),    # South - vertical down
    'N':  (-1, 0),   # North - vertical up
    'SE': (1, 1),    # Southeast - diagonal down-right
    'NW': (-1, -1),  # Northwest - diagonal up-left
    'SW': (1, -1),   # Southwest - diagonal down-left
    'NE': (-1, 1),   # Northeast - diagonal up-right
}

# Human-readable direction names
DIRECTION_NAMES = {
    'E': 'Horizontal (L→R)',
    'W': 'Horizontal (R→L)',
    'S': 'Vertical (T→B)',
    'N': 'Vertical (B→T)',
    'SE': 'Diagonal (TL→BR)',
    'NW': 'Diagonal (BR→TL)',
    'SW': 'Diagonal (TR→BL)',
    'NE': 'Diagonal (BL→TR)',
}

# Known words from the solved image
KNOWN_WORDS = [
    # Numbers
    "NINETEEN", "TWELVE", "ELEVEN", "NINE", "FIVE", "THREE", "ZERO",
    # Location/Geography
    "QUARRY", "SQUARE", "SAPPHIRE", "STATE", "NORTH", "WEST", "PEAKS", "WATER",
    # Descriptive/Action
    "ROUND", "LINE", "WALK", "COUNT", "DIRT", "DIVIDE", "RAIL", "LEMON", "LILAC",
    # Proper nouns - JCB said "SOME proper nouns" can be ignored, not all
    "CRETE",
    # Diagonal finds
    "OHIO",   # Diagonal (TR→BL) - confirmed
    "ERIE",   # Diagonal (TL→BR) - Lake Erie borders Ohio!
]


def extract_all_lines():
    """
    Extract all possible lines from the grid in all 8 directions.
    Returns list of (direction, start_row, start_col, line_string, coordinates)
    where coordinates is list of (row, col) for each character.
    """
    lines = []
    rows = len(GRID)
    cols = len(GRID[0])

    for direction, (dr, dc) in DIRECTIONS.items():
        # Determine starting positions for this direction
        starts = []

        if direction == 'E':  # Horizontal right - start at column 0
            starts = [(r, 0) for r in range(rows)]
        elif direction == 'W':  # Horizontal left - start at last column
            starts = [(r, cols-1) for r in range(rows)]
        elif direction == 'S':  # Vertical down - start at row 0
            starts = [(0, c) for c in range(cols)]
        elif direction == 'N':  # Vertical up - start at last row
            starts = [(rows-1, c) for c in range(cols)]
        elif direction == 'SE':  # Diagonal down-right
            # Start from left edge (all rows) and top edge (all cols except first)
            starts = [(r, 0) for r in range(rows)]
            starts += [(0, c) for c in range(1, cols)]
        elif direction == 'NW':  # Diagonal up-left
            # Start from right edge (all rows) and bottom edge (all cols except last)
            starts = [(r, cols-1) for r in range(rows)]
            starts += [(rows-1, c) for c in range(cols-1)]
        elif direction == 'SW':  # Diagonal down-left
            # Start from right edge (all rows) and top edge (all cols except last)
            starts = [(r, cols-1) for r in range(rows)]
            starts += [(0, c) for c in range(cols-1)]
        elif direction == 'NE':  # Diagonal up-right
            # Start from left edge (all rows) and bottom edge (all cols except first)
            starts = [(r, 0) for r in range(rows)]
            starts += [(rows-1, c) for c in range(1, cols)]

        for start_r, start_c in starts:
            line_chars = []
            coords = []
            r, c = start_r, start_c

            while 0 <= r < rows and 0 <= c < cols:
                line_chars.append(GRID[r][c])
                coords.append((r, c))
                r += dr
                c += dc

            if len(line_chars) >= 4:  # Only keep lines that could contain 4+ letter words
                lines.append((direction, start_r, start_c, ''.join(line_chars), coords))

    return lines


def find_word_in_lines(lines, word):
    """
    Find all occurrences of a word in the extracted lines.
    Returns list of (direction, start_pos, end_pos) where pos is (row, col) 1-indexed.
    """
    results = []
    word_upper = word.upper()

    for direction, start_r, start_c, line_str, coords in lines:
        # Search for the word in this line
        idx = 0
        while True:
            idx = line_str.find(word_upper, idx)
            if idx == -1:
                break

            # Found! Get coordinates (convert to 1-indexed)
            start_coord = (coords[idx][0] + 1, coords[idx][1] + 1)
            end_coord = (coords[idx + len(word) - 1][0] + 1, coords[idx + len(word) - 1][1] + 1)

            results.append({
                'word': word_upper,
                'direction': direction,
                'direction_name': DIRECTION_NAMES[direction],
                'start': start_coord,
                'end': end_coord,
            })

            idx += 1  # Continue searching for overlapping occurrences

    return results


def load_dictionary(min_length=4):
    """Load system dictionary, filtering to words of min_length or more."""
    words = set()
    dict_paths = [
        '/usr/share/dict/words',
        '/usr/share/dict/american-english',
    ]

    for path in dict_paths:
        try:
            with open(path, 'r') as f:
                for line in f:
                    word = line.strip().upper()
                    if len(word) >= min_length and word.isalpha():
                        words.add(word)
            print(f"Loaded {len(words)} words from {path}")
            return words
        except FileNotFoundError:
            continue

    print("Warning: Could not load system dictionary")
    return set()


def find_all_dictionary_words(lines, dictionary, min_length=4):
    """Find all dictionary words in the grid."""
    found_words = {}

    for direction, start_r, start_c, line_str, coords in lines:
        # Check all substrings of length min_length to len(line)
        for length in range(min_length, len(line_str) + 1):
            for start_idx in range(len(line_str) - length + 1):
                substr = line_str[start_idx:start_idx + length]

                if substr in dictionary:
                    start_coord = (coords[start_idx][0] + 1, coords[start_idx][1] + 1)
                    end_coord = (coords[start_idx + length - 1][0] + 1, coords[start_idx + length - 1][1] + 1)

                    key = (substr, direction, start_coord, end_coord)
                    if key not in found_words:
                        found_words[key] = {
                            'word': substr,
                            'direction': direction,
                            'direction_name': DIRECTION_NAMES[direction],
                            'start': start_coord,
                            'end': end_coord,
                        }

    return list(found_words.values())


def mark_used_cells(grid_used, word_result):
    """Mark cells used by a found word (using 1-indexed coordinates from result)."""
    start_r, start_c = word_result['start']
    end_r, end_c = word_result['end']

    # Convert to 0-indexed
    start_r -= 1
    start_c -= 1
    end_r -= 1
    end_c -= 1

    # Determine direction
    dr = 0 if end_r == start_r else (1 if end_r > start_r else -1)
    dc = 0 if end_c == start_c else (1 if end_c > start_c else -1)

    # Mark all cells along the path
    r, c = start_r, start_c
    word_len = len(word_result['word'])
    for _ in range(word_len):
        grid_used[r][c] = True
        r += dr
        c += dc


def get_unused_letters(grid, grid_used):
    """Return list of unused letters in reading order (left-to-right, top-to-bottom)."""
    unused = []
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if not grid_used[r][c]:
                unused.append((grid[r][c], r, c))
    return unused


def visualize_grid(grid, grid_used, highlight_letter=None):
    """Print grid with used/unused distinction."""
    rows = len(grid)
    cols = len(grid[0])

    print("\n     ", end="")
    for c in range(cols):
        print(f"{c+1:2} ", end="")
    print()

    for r in range(rows):
        print(f" {r+1:2}: ", end="")
        for c in range(cols):
            letter = grid[r][c]
            if grid_used[r][c]:
                # Used letter - show as dot or dimmed
                print(" . ", end="")
            else:
                # Unused letter
                if highlight_letter and letter == highlight_letter:
                    print(f"[{letter}]", end="")
                else:
                    print(f" {letter} ", end="")
        print()


def analyze_o_pattern(grid, grid_used):
    """Analyze the pattern of unused O letters."""
    print("\n" + "=" * 60)
    print("O PATTERN ANALYSIS")
    print("=" * 60)

    rows = len(grid)
    cols = len(grid[0])

    # Find all unused O positions
    unused_os = []
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 'O' and not grid_used[r][c]:
                unused_os.append((r, c))

    print(f"\nTotal unused O's: {len(unused_os)}")
    print("\nUnused O positions (0-indexed):")
    for r, c in unused_os:
        print(f"  Row {r+1}, Col {c+1}")

    # Visualize O pattern
    print("\nO PATTERN GRID (only showing unused O's):")
    print("     ", end="")
    for c in range(cols):
        print(f"{c+1:2} ", end="")
    print()

    for r in range(rows):
        print(f" {r+1:2}: ", end="")
        for c in range(cols):
            if grid[r][c] == 'O' and not grid_used[r][c]:
                print(" O ", end="")
            else:
                print(" . ", end="")
        print()

    # Check if O's form a recognizable pattern
    if unused_os:
        # Calculate center of mass
        avg_r = sum(r for r, c in unused_os) / len(unused_os)
        avg_c = sum(c for r, c in unused_os) / len(unused_os)
        print(f"\nCenter of O cluster: Row {avg_r+1:.1f}, Col {avg_c+1:.1f}")

        # Check clustering in middle
        middle_r = rows / 2
        middle_c = cols / 2
        in_middle = sum(1 for r, c in unused_os if abs(r - middle_r) < 4 and abs(c - middle_c) < 5)
        print(f"O's in middle region: {in_middle} of {len(unused_os)}")

    return unused_os


def main():
    print("=" * 60)
    print("WORD SEARCH SOLVER - Past and Future Box")
    print("=" * 60)
    print()

    # Verify grid
    rows = len(GRID)
    cols = len(GRID[0])
    print(f"Grid dimensions: {rows} rows × {cols} cols")
    print(f"Total cells: {rows * cols}")
    print()
    print("Grid contents:")
    for i, row in enumerate(GRID):
        print(f"  {i+1:2}: {row}")
    print()

    # Initialize used tracking grid
    grid_used = [[False] * cols for _ in range(rows)]

    # Extract all lines
    print("Extracting lines in all 8 directions...")
    lines = extract_all_lines()
    print(f"  Total lines: {len(lines)}")
    print()

    # Check for command line argument
    import sys
    use_only_known = '--known-only' in sys.argv

    if use_only_known:
        print("\n*** USING ONLY KNOWN WORDS (27 official words) ***\n")
        all_words = []
        for word in KNOWN_WORDS:
            results = find_word_in_lines(lines, word)
            # Only take the first occurrence of each word to avoid double-counting
            if results:
                all_words.append(results[0])
        print(f"Total words: {len(all_words)}")
    else:
        # Load dictionary
        print("Loading dictionary...")
        dictionary = load_dictionary(min_length=4)

        # Find ALL dictionary words (including known words)
        print("\nFinding all dictionary words...")
        all_words = find_all_dictionary_words(lines, dictionary, min_length=4)

        # Also add known words that might not be in dictionary
        for word in KNOWN_WORDS:
            results = find_word_in_lines(lines, word)
            for result in results:
                # Check if already found
                already_found = any(
                    w['word'] == result['word'] and
                    w['direction'] == result['direction'] and
                    w['start'] == result['start']
                    for w in all_words
                )
                if not already_found:
                    all_words.append(result)

        print(f"Total words found: {len(all_words)}")

    # Mark all found words as used
    print("\nMarking used cells...")
    for word_result in all_words:
        mark_used_cells(grid_used, word_result)

    # Count used cells
    used_count = sum(sum(row) for row in grid_used)
    unused_count = rows * cols - used_count
    print(f"Used cells: {used_count}")
    print(f"Unused cells: {unused_count}")

    # Get unused letters
    unused_letters = get_unused_letters(GRID, grid_used)

    print("\n" + "=" * 60)
    print("LEFTOVER LETTERS ANALYSIS")
    print("=" * 60)

    # Show unused letters grid
    print("\nGRID WITH USED LETTERS REMOVED (shown as dots):")
    visualize_grid(GRID, grid_used)

    # List unused letters
    print("\nUNUSED LETTERS (reading order):")
    letters_only = [l for l, r, c in unused_letters]
    print(''.join(letters_only))
    print(f"\nTotal unused: {len(letters_only)} letters")

    # Count by letter
    from collections import Counter
    letter_counts = Counter(letters_only)
    print("\nLetter frequency in unused:")
    for letter, count in sorted(letter_counts.items(), key=lambda x: -x[1]):
        print(f"  {letter}: {count}")

    # Specifically count O's
    o_count = letter_counts.get('O', 0)
    print(f"\n*** UNUSED O's: {o_count} ***")

    # Analyze O pattern
    unused_os = analyze_o_pattern(GRID, grid_used)

    # Try to form the hidden message
    print("\n" + "=" * 60)
    print("HIDDEN MESSAGE ANALYSIS")
    print("=" * 60)

    expected_message = "THEREAREFIVECLUESINTHISWORDSEARCHBUTDONOTTELLANYONE" \
                      "THEREARENOSPECIALBENDSORTURNS JUSTREMAINSTEADYTOCOMPLETETHEMISSIONX"
    expected_message = expected_message.replace(" ", "")

    print(f"\nExpected message length: {len(expected_message)}")
    print(f"Actual unused letters: {len(letters_only)}")

    # Check if unused letters can form the message
    unused_sorted = sorted(letters_only)
    expected_sorted = sorted(expected_message.upper())

    if unused_sorted == expected_sorted:
        print("\n✓ Unused letters EXACTLY match expected hidden message!")
    else:
        print("\n✗ Unused letters do NOT exactly match expected message")
        print("\nDifference analysis:")
        unused_counter = Counter(letters_only)
        expected_counter = Counter(expected_message.upper())

        print("  Letters in unused but not needed:")
        for letter in set(unused_counter.keys()) | set(expected_counter.keys()):
            diff = unused_counter.get(letter, 0) - expected_counter.get(letter, 0)
            if diff > 0:
                print(f"    {letter}: +{diff} extra")
            elif diff < 0:
                print(f"    {letter}: {diff} missing")

    # Output all found words
    print("\n" + "=" * 60)
    print("ALL FOUND WORDS")
    print("=" * 60)

    # Group by word
    unique_words = {}
    for w in all_words:
        if w['word'] not in unique_words:
            unique_words[w['word']] = []
        unique_words[w['word']].append(w)

    print(f"\nUnique words found: {len(unique_words)}")
    print("\n| Word | Direction | Start | End |")
    print("|------|-----------|-------|-----|")
    for word in sorted(unique_words.keys()):
        for occ in unique_words[word]:
            print(f"| {word} | {occ['direction_name']} | ({occ['start'][0]},{occ['start'][1]}) | ({occ['end'][0]},{occ['end'][1]}) |")


if __name__ == "__main__":
    main()
