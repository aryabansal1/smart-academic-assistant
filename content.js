function extractMetadata() {
  // IEEE embeds almost everything in tags and this ensures consistency
  const get = (name) =>
    document.querySelector(`meta[name="${name}"]`)?.content?.trim() || '';

  // try the meta‑tags first
  let authors = Array.from(document.querySelectorAll('meta[name="citation_author"]'))
                     .map(el => el.content.trim());

  // fallback to on‑page author list if meta missing
  if (authors.length === 0) {
    authors = Array.from(document.querySelectorAll('span.authors-info a span, span.author-name'))
                   .map(el => el.textContent.trim());
  }

/* helper */
const textFromLabel = (label) => {
  const el = Array.from(
    document.querySelectorAll('.doc-abstract-metadata-list li, .metadata-section li, dt')
  ).find(e => e.textContent.trim().startsWith(label));
  if (!el) return '';
  // dt/dd markup
  if (el.tagName === 'DT' && el.nextElementSibling) {
    return el.nextElementSibling.textContent.trim();
  }
  // li markup — split “page(s) 934 – 945”
  return el.textContent.replace(label, '').trim();
};

let year = get('citation_publication_year');
if (!year) {
  const dateText = textFromLabel('Date of Publication');
  const m = dateText.match(/\b(19|20)\d{2}\b/);
  year = m ? m[0] : '';
}
if (!year) {
  const m = document.body.textContent.match(/©\s*(19|20)\d{2}/);
  year = m ? m[0].replace(/[^0-9]/g, '') : '';
}

let journal = get('citation_journal_title') || get('citation_conference_title');
if (!journal) {
  journal = textFromLabel('Published in') || '';
  // strip trailing "( volume: …" part
  journal = journal.replace(/\(.*$/, '').trim();
}

let volume = get('citation_volume');
let issue  = get('citation_issue');
if (!volume || !issue) {
  const pubIn = textFromLabel('Published in');
  const m = pubIn.match(/Volume:\s*(\d+),\s*Issue:\s*(\d+)/i) ||
            pubIn.match(/\( *Volume:\s*(\d+).*Issue:\s*(\d+)/i);
  if (m) {
    volume = volume || m[1];
    issue  = issue  || m[2];
  }
}

let pages = get('citation_firstpage') && get('citation_lastpage')
              ? `${get('citation_firstpage')}-${get('citation_lastpage')}` : '';
if (!pages) {
  pages = textFromLabel('Page(s)');
}

let doi = get('citation_doi');
if (!doi) {
  doi = textFromLabel('DOI') || (document.querySelector('a[data-doi]')?.textContent.trim()) || '';
}

  const meta = {
    // display 
    title: get('citation_title') || document.querySelector('h1.document-title')?.innerText.trim(),
    authors,
    abstract: document.querySelector('div.abstract-text')?.innerText.replace(/^abstract:\s*/i, '').trim() || '',
    
    // citation‑only
    journal,
    year,
    volume,
    issue,
    pages,
    doi
  };

  chrome.runtime.sendMessage({ type: 'paperMetadata', meta });
}

window.addEventListener('load', extractMetadata);

chrome.runtime.onMessage.addListener((req) => {
  if (req.type === 'getMetadata') {
    extractMetadata(); // sends paperMetadata again
  }
});
