# Testing Approach

We used a combination of manual interface walkthroughs and automated unit tests to ensure the correctness of metadata extraction and citation generation.

## Interface Testing

### Goals and Coverage

- Confirm that the following fields are accurately extracted and displayed:
  - Title
  - Authors (displayed as clickable links to IEEE author profiles)
  - Abstract (with redundant “Abstract:” prefixes removed)
  - APA/BibTeX citations
- Validate that data is parsed from the correct DOM elements (`<meta>`, `.authors-info`, `.abstract-text`, etc.).
- Check that visual layout in the popup is clear and responsive.
- Verify that the copy-to-clipboard functionality works for both citation formats.
- Test fallback behavior for incomplete metadata (e.g., missing pages or volume).

### Walkthroughs

1. Load metadata from an IEEE article page
   - Input: Visit an IEEE Xplore article.
   - Expected Behavior: The popup shows the title, a list of clickable author names, the abstract, and formatted APA/BibTeX citations.
   - Result: Works as expected.

2. Handle missing metadata
   - Input: An older IEEE article with incomplete metadata.
   - Expected Behavior: Fields like "Not found" should appear where data is unavailable. Citation formats should degrade gracefully.
   - Result: Works as expected.

3. Copy citations to clipboard
   - Input: Click “Copy APA” or “Copy BibTeX” in the popup.
   - Expected Behavior: Citation is copied to the clipboard and a confirmation message (“APA copied!” or "BibTeX copied!") appears for 3.0 seconds.
   - Result: Works as expected.

## Prompt Testing

### Setup

`test.js` contains a suite of unit tests using **Jest** to verify the core citation formatting logic in `utils.js`; `utils.js` includes target functions from `popup.js`. It uses `module.exports` to isolate logic for testability. Tests were ran with `jest` version `^29.7.0`. Instructions for running the tests are documented in `README.md`.

### Test Cases

1. **APA Citation:** Verify correct APA formatting for a well-structured research article with full metadata. It correctly checked author initials, year, title, journal, volume/issue, page range, and DOI despite this article having a mispelt title and 1900's publication year.
    - Input: Metadata from [Robinson1963](https://ieeexplore.ieee.org/document/4322822)
    - Expected Behavior: Robinson, D. A. (1963). A Method of Measuring Eye Movemnent Using a Scieral Search Coil in a Magnetic Field. IEEE Transactions on Bio-medical Electronics, vol. 10, no. 4, pp. 137 - 145, doi: 10.1109/TBMEL.1963.4322822.
    - Result: PASSED

2. **BibTeX Citation — Long Author List:** Ensure BibTeX is correctly generated with multiple authors, proper formatting of all fields, and a clean citation key. It correctly checked for proper `@article{key}` structure and presence of all metadata.
   - Input: Metadata from [Qiu2020](https://ieeexplore.ieee.org/document/9254157)
   - Expected Behavior: @article{Qiu2020,
                            title   = {Compact, Flexible, and Transparent Antennas Based on Embedded Metallic Mesh for Wearable Devices in 5G Wireless Network},
                            author  = {Haochuan Qiu and Houfang Liu and Xiufeng Jia and Zhou-Ying Jiang and Yan-Hua Liu and Jianlong Xu},
                            journal = {IEEE Transactions on Antennas and Propagation},
                            year    = {2020},
                            volume  = {69},
                            number  = {4},
                            pages   = {1864 - 1873},
                            doi     = {10.1109/TAP.2020.3035911},
                        }
   - Result: PASSED

3. **Title Extraction:** Confirm that a paper title is preserved exactly as written in the metadata. It correctly ensured string matches without truncation or artifacts.
   - Input: Metadata from [Brunet2024](https://ieeexplore.ieee.org/document/10703104)
   - Expected Behavior: Transmitarrays for Wireless Power Transfer on Earth and in Space
   - Result: PASSED

4. **Author List Rendering:** Verify that all author names are stored and rendered in order with correct separators. It correctly ensured string construction of author lists were accurate for display and citations.
   - Input: Metadata from [Brunet2024](https://ieeexplore.ieee.org/document/10703104)
   - Expected Behavior: Jesse Brunet, Alex Ayling, Ali Hajimiri
   - Result: PASSED

## Debugging/Refactoring Explanations

- **APA format bug:** `(n.d.)` appeared until `<meta name="citation_...">` tags were used in `content.js`.
- **BibTeX key issue:** The citation key used `names[0]`, but the variable was undefined. Fixed by referencing `authors.map(a => a.name)`.
- **Popup stuck on "Loading...":** Caused by a mismatch between `type: 'metadataExtracted'` in `content.js` and `type: 'paperMetadata'` in `popup.js`. Fixed by unifying the type across scripts.
- **Fallback for missing authors:** Implemented a fallback, unknown author list if no metadata is found.
