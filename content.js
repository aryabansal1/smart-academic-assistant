function extractMetadata() {
  const title = document.querySelector('h1.document-title')?.innerText.trim();
  
  const authors = Array.from(document.querySelectorAll('span.authors-info a')).map(a => ({
    name: a.querySelector('span')?.textContent.trim() || '',
    url: a.href
  }));

  let abstract = document.querySelector('div.abstract-text')?.innerText.trim() || '';
  abstract = abstract.replace(/^abstract:\s*/i, '').trim();

  // info used from inspect element
  // published in: journal, volume, issue
  let journal = '', volume = '', issue = '';
  const pubDiv = document.querySelector('.stats-document-abstract-publishedIn');
  if (pubDiv) {
    // the journal name is the first <a> in this block
    journal = pubDiv.querySelector('a.stats-document-abstract-publishedIn')
      ?.innerText.trim() || '';

    // inside the same div there's a span with child spans and links that contain "volume: X" and "issue: Y"
    const innerSpan = pubDiv.querySelector('span');
    if (innerSpan) {
      // text like "volume: 27"
      const volMatch = innerSpan.innerText.match(/Volume:\s*(\d+)/i);
      if (volMatch) volume = volMatch[1];

      // the issue link has class stats-document-abstract-publishedIn-issue
      const issA = innerSpan.querySelector('a.stats-document-abstract-publishedIn-issue');
      if (issA) {
        const issMatch = issA.innerText.match(/Issue:\s*(\d+)/i);
        if (issMatch) issue = issMatch[1];
      }
    }
  }

  // pages
  let pages = '';
  const pageDiv = Array.from(document.querySelectorAll('div.u-pb-1'))
    .find(div => div.querySelector('strong')?.innerText.trim().startsWith('Page(s):'));
  if (pageDiv) {
    // strip the label and just get "37 - 76"
    pages = pageDiv.innerText.replace(/^Page\(s\):\s*/i, '').trim();
  }

  // date published, year
  let datePublished = '';
  let year = '';
  const dateDiv = document.querySelector('.doc-abstract-pubdate');
  if (dateDiv) {
    datePublished = dateDiv.innerText.replace(/^Date of Publication:\s*/i, '').trim();
    const yMatch = datePublished.match(/\b(19|20)\d{2}\b/);
    if (yMatch) year = yMatch[0];
  }

  // DOI
  let doi = '';
  const doiDiv = document.querySelector('.stats-document-abstract-doi');
  if (doiDiv) {
    doi = doiDiv.querySelector('a')?.innerText.trim() || '';
  }

  const metadata = {
    title,
    authors,
    abstract,
    year,
    journal,
    volume,
    issue,
    pages,
    doi,
  };

  chrome.runtime.sendMessage({
    type: 'metadataExtracted',
    metadata
  });
}

window.addEventListener('load', extractMetadata);
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === 'getMetadata') extractMetadata();
});
