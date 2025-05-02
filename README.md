# Smart Academic Assistant

Smart academic‑paper assistant in your browser. This extension streamlines academic reading by extracting structured metadata (title, authors, abstract) from Google Scholar + arXiv pages, then offering GPT tools to summarize and reference — all without leaving the tab. It cuts the copy‑paste friction so students, researchers, and academics can increase their productivity.

## Core Features

1. Arya Bansal: Metadata extractor (Google Scholar + arXiv)
2. Michael Ren: LLM summarizer
3. Alexis Powell: Citation generator (APA / BibTeX)

## Known Bugs / Incomplete Features

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aryabansal1/smart-academic-assistant.git
   ```

2. Install dependencies:

   ```bash
   cd smart-academic-assistant.git
   npm install
   ```

3. Build the extension:

   ```bash
   npm run build
   ```

4. Load the extension in Chrome:

   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory from the project

## Chrome Extension Architecture

This project follows the Manifest V3 architecture for Chrome extensions. Key components of the architecture include:

- `manifest.json`: Defines the extension's metadata, permissions, and script configurations
- `background.js`: Runs in the background and handles events and long-running tasks
- Popup window: Displays the extension's user interface when the extension icon is clicked

## Testing

To run the tests:

```bash
npm run test
```

To generate a coverage report:

```bash
npm run coverage
```

## Credits
