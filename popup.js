// citation helper functions
function safeAuthors(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ['Unknown Author'];
  return arr.filter(name => typeof name === 'string' && name.trim());
}

// APA format
function formatAPA(meta) {
  const authorsArr = safeAuthors(meta.authors.map(a => a.name));

  const formatName = (full) => {
    const parts = full.split(/\s+/);
    if (parts.length === 1) return parts[0]; // one‑word name
    const last = parts.pop();
    const initials = parts.map(p => p[0].toUpperCase() + '.').join(' ');
    return `${last}, ${initials}`; // ex: “Li, Y. L.”
  };

  const authors = authorsArr.map(formatName).join(', ');
  
  const year = meta.year ? `(${meta.year}).` : '(n.d.).';
  const title = `${meta.title}.`;
  const journal = meta.journal ? ` ${meta.journal}` : '';
  const volIss  = meta.volume ? `, vol. ${meta.volume}` + (meta.issue?`, no. ${meta.issue}`:'') : '';
  const pages = meta.pages ? `, pp. ${meta.pages}` : '';
  const doi = meta.doi ? `, doi: ${meta.doi}.` : '';

  return `${authors} ${year} ${title}${journal}${volIss}${pages}${doi}`;
}

// BibTeX helper
function formatBibTeX(meta) {
  const authorsArr = safeAuthors(meta.authors.map(a => a.name));

  const key = `${authorsArr[0].split(/\s+/).pop()}${meta.year||'n.d.'}`;

  const lines = [
    `@article{${key},`,
    `  title   = {${meta.title}},`,
    `  author  = {${authorsArr.join(' and ')}},`,
  ];

  if (meta.journal) lines.push(`  journal = {${meta.journal}},`);
  if (meta.year)    lines.push(`  year    = {${meta.year}},`);
  if (meta.volume)  lines.push(`  volume  = {${meta.volume}},`);
  if (meta.issue)   lines.push(`  number  = {${meta.issue}},`);
  if (meta.pages)   lines.push(`  pages   = {${meta.pages}},`);
  if (meta.doi)     lines.push(`  doi     = {${meta.doi}},`);

  lines.push('}');
  return lines.join('\n');
}

// render metadata in popup
function render(meta) {
  document.getElementById('title').innerText = meta.title || 'Not found';

  // authors
  const ul = document.getElementById('authors');
  ul.innerHTML = '';

  if (meta.authors.length) {
    meta.authors.forEach(a => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = a.url;
      link.target = '_blank';
      link.textContent = a.name;
      li.appendChild(link);
      ul.appendChild(li);
    });
  } else {
    ul.innerHTML = '<li>Not found</li>';
  }

  // abstract
  document.getElementById('abstract').innerText = meta.abstract || 'Not found';

  // citations
  const apa = formatAPA(meta);
  const bib = formatBibTeX(meta);
  document.getElementById('apa' ).textContent = apa;
  document.getElementById('bib').textContent = bib;
  
  // copy buttons
  const flash = txt => {
    const p = document.getElementById('copied');
    p.textContent = `${txt} copied!`;
    setTimeout(() => p.textContent = '', 3000);
  };

  document.getElementById('copyAPA').onclick = () =>
    navigator.clipboard.writeText(apa).then(() => flash('APA'));
  document.getElementById('copyBib').onclick = () =>
    navigator.clipboard.writeText(bib).then(() => flash('BibTeX'));
}

// listen for the response from content.js
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === 'metadataExtracted') {
    render(msg.metadata);
  }
});

// metadata extraction begins when popup loads
function requestMetadata() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { type: 'getMetadata' }, (resp) => {
      if (chrome.runtime.lastError) {
        // content.js not loaded... solution is inject it dynamically!
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['content.js']
        }).then(() => {
          // then ask again
          chrome.tabs.sendMessage(tabId, { type: 'getMetadata' });
        }).catch(err => console.error('Injection failed', err));
      }
    });
  });
}

requestMetadata();
