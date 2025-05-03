function safeAuthors(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ['Unknown Author'];
  return arr.filter(name => typeof name === 'string' && name.trim().length);
}

// citation helper function (APA)
function formatAPA(meta) {
  const authorsArr = safeAuthors(meta.authors);

  const formatName = (full) => {
    const parts = full.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]; // one‑word name
    const last = parts.pop();
    const initials = parts.map(p => p[0].toUpperCase() + '.').join(' ');
    return `${last}, ${initials}`; // ex: “Li, Y. L.”
  };

  const authors = authorsArr.map(formatName).join(', ');
  const year    = meta.year ? `(${meta.year}).` : '(n.d.).';
  const title   = `${meta.title}.`;
  const journal = meta.journal ? ` ${meta.journal}` : '';
  const volIss  = meta.volume
                    ? `, vol. ${meta.volume}${meta.issue ? `, no. ${meta.issue}` : ''}`
                    : '';
  const pages   = meta.pages ? `, pp. ${meta.pages}` : '';
  const doi     = meta.doi   ? `, doi: ${meta.doi}.` : '.';

  return `${authors} ${year} ${title}${journal}${volIss}${pages}${doi}`;
}

// citation helper function for BibTeX
function formatBibTeX(meta) {
  const authorsArr = safeAuthors(meta.authors);
  const keyLast = authorsArr[0].split(/\s+/).pop();
  const key = `${keyLast}${meta.year || 'n.d.'}`;

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

// handle metadata all at once
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'paperMetadata') return;
  const m = msg.meta;

  // title / authors / abstract
  document.getElementById('title').textContent = m.title || 'Not found';
  
  const ul = document.getElementById('authors');
  ul.innerHTML = '';
  if (m.authors.length) {
    m.authors.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    });
  } else {
    ul.innerHTML = '<li>Not found</li>';
  }

  document.getElementById('abstract').textContent = m.abstract || 'Not found';

  // generate & display citations
  const apa = formatAPA(m);
  const bib = formatBibTeX(m);
  document.getElementById('apa').textContent = apa;
  document.getElementById('bib').textContent = bib;

  // copy buttons
  const flash = (txt) => {
    const p = document.getElementById('copied');
    p.textContent = `${txt} copied!`;
    setTimeout(() => (p.textContent = ''), 1200);
  };

  document.getElementById('copyAPA').onclick = () =>
    navigator.clipboard.writeText(apa).then(() => flash('APA'));

  document.getElementById('copyBib').onclick = () =>
    navigator.clipboard.writeText(bib).then(() => flash('BibTeX'));
});

// extraction in the active tab when popup opens
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {type: 'getMetadata'});
});
