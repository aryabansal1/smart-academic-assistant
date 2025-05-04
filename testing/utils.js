// pasted code from popup.js for testing!

function safeAuthors(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return ['Unknown Author'];
    return arr.filter(name => typeof name === 'string' && name.trim());
  }
  
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
  
// export functions for testing!

module.exports = {
    formatAPA,
    formatBibTeX,
    safeAuthors
  };
  