export interface Meta {
    title: string;
    authors: string[];
    year?: number;
    journal?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
  }
  
  /* Helpers ---------------------------------------------------- */
  const initials = (name: string) =>
    name
      .split(/\s+/)
      .map(part => part[0].toUpperCase() + '.')
      .join(' ');
  
  const lastName = (name: string) => name.split(/\s+/).pop() || name;
  
  /* APA 7 generator ------------------------------------------- */
  export function toAPA(m: Meta): string {
    const authors = m.authors
      .map(a => `${lastName(a)}, ${initials(a)}`)
      .join(', ');
    const year = m.year ? `(${m.year}).` : '(n.d.).';
    const title = `${m.title}.`;
    const journal = m.journal ? ` ${m.journal}.` : '';
    return `${authors} ${year} ${title}${journal}`;
  }
  
  /* BibTeX generator ------------------------------------------ */
  const slug = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  
  export function toBibTeX(m: Meta): string {
    const key = `${lastName(m.authors[0])}${m.year ?? 'n.d.'}:${slug(m.title)}`;
    return `@article{${key},
    title   = {${m.title}},
    author  = {${m.authors.join(' and ')}},
    journal = {${m.journal ?? ''}},
    year    = {${m.year ?? ''}},
    volume  = {${m.volume ?? ''}},
    number  = {${m.issue ?? ''}},
    pages   = {${m.pages ?? ''}},
    doi     = {${m.doi ?? ''}}
  }`;
  }  
  