# Smart Academic Assistant

Smart academic‑paper assistant in your browser. This extension streamlines academic reading by extracting structured metadata (title, authors, abstract) and generating both APA and BibTeX formatted citations — all without leaving the tab. It cuts the copy‑paste friction so students, researchers, and academics can increase their productivity.

## Installation Instructions

To install and run the Chrome extension locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/aryabansal1/smart-academic-assistant.git
   ```

2. Load the extension in Chrome:

   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the folder containing the extension files.
  
3. Navigate to an academic article page on [IEEE Xplore](https://ieeexplore.ieee.org/Xplore/home.jsp) and click on the extension icon to use.

> Note: our extension currently only supports IEEE Xplore pages!

## Core Features

- Extracts metadata (title, authors, journal, volume, issue, pages, year, DOI) from academic papers.
- Displays a clean popup with abstract and formatted citations!
- Generates both **APA** and **BibTeX** citations.
- Provides one-click copy buttons for easy citation pasting!

## Team Responsibilities

- **Arya Bansal:**
  Focused on metadata extraction logic from IEEE article pages. This extraction displays the title, authors, and abstract in the popup UI. Also implemented a clickable link feature to take you to author's bios. Finally, coding up the landing page.

- **Alexis Powell:**
  Focused on citation generation logic (further extracting and formatting journal, volume, issue, pages, year, and DOI information from the page (it works for papers published in the 1900s too!)), fallback strategies for missing metadata, displaying citation features in the popup UI (APA, BibTeX), copy-to-clipboard functionality, and testing.

## Known Bugs / Incomplete Features

- Our extension is currently limited to IEEE Xplore and does not support other academic platforms such as arXiv or Google Scholar.
- Some fields may appear as "Not found" if the article metadata is missing or non-standard.
- **LLM-powered summarization** (e.g. abstract rephrasing or method explanation) was scoped for development but not implemented in this version.

## Testing

To run the tests:
