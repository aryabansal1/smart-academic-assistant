function extractMetadata() {
  const title = document.querySelector('h1.document-title')?.innerText.trim();
  const authors = Array.from(document.querySelectorAll('span.authors-info a')).map(a => ({
    name: a.querySelector('span')?.textContent.trim(),
    url: a.href
  }));
  let abstract = document.querySelector('div.abstract-text')?.innerText.trim();
  if (abstract?.toLowerCase().startsWith("abstract: abstract:")) {
    abstract = abstract.replace(/^abstract:\s*/i, '').trim();
  } else if (abstract?.toLowerCase().startsWith("abstract:")) {
    abstract = abstract.replace(/^abstract:\s*/i, '').trim();
  }

  const metadata = {
    title,
    authors,
    abstract
  };

  chrome.runtime.sendMessage({ type: 'metadataExtracted', metadata });
}

window.addEventListener('load', extractMetadata);