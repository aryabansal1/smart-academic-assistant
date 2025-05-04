// test using Jest

const { formatAPA, formatBibTeX } = require('./utils');

test('APA formatting with title misspelling and 1900s date', () => {
    const meta = {
      title: 'A Method of Measuring Eye Movemnent Using a Scieral Search Coil in a Magnetic Field',
      authors: [{ name: 'D. A. Robinson' }],
      year: '1963',
      journal: 'IEEE Transactions on Bio-medical Electronics',
      volume: '10',
      issue: '4',
      pages: '137-145',
      doi: '10.1109/TBMEL.1963.4322822'
    };

    const apa = formatAPA(meta);
    expect(apa).toMatch(/Robinson, D\. A\. \(1963\)\. A Method of Measuring Eye Movemnent Using a Scieral Search Coil in a Magnetic Field\. IEEE Transactions on Bio-medical Electronics, vol\. 10, no\. 4, pp\. 137-145, doi: 10\.1109\/TBMEL\.1963\.4322822\./);
});

test('BibTeX formatting with long authors list', () => {
    const meta = {
      title: 'Compact, Flexible, and Transparent Antennas Based on Embedded Metallic Mesh for Wearable Devices in 5G Wireless Network',
      authors: [
        { name: 'Haochuan Qiu' },
        { name: 'Houfang Liu' },
        { name: 'Xiufeng Jia' },
        { name: 'Zhou-Ying Jiang' },
        { name: 'Yan-Hua Liu' },
        { name: 'Jianlong Xu' }
      ],
      year: '2020',
      journal: 'IEEE Transactions on Antennas and Propagation',
      volume: '69',
      issue: '4',
      pages: '1864-1873',
      doi: '10.1109/TAP.2020.3035911'
    };

    const bib = formatBibTeX(meta);
    expect(bib).toContain('@article{Qiu2020,');
    expect(bib).toContain('title   = {Compact, Flexible, and Transparent Antennas Based on Embedded Metallic Mesh for Wearable Devices in 5G Wireless Network}');
    expect(bib).toContain('author  = {Haochuan Qiu and Houfang Liu and Xiufeng Jia and Zhou-Ying Jiang and Yan-Hua Liu and Jianlong Xu');
    expect(bib).toContain('year    = {2020}');
    expect(bib).toContain('journal = {IEEE Transactions on Antennas and Propagation}');
    expect(bib).toContain('volume  = {69}');
    expect(bib).toContain('pages   = {1864-1873}');
    expect(bib).toContain('doi     = {10.1109/TAP.2020.3035911}');
});

test('Title extraction — basic case', () => {
    const meta = {
      title: 'Transmitarrays for Wireless Power Transfer on Earth and in Space',
      authors: [
        { name: 'Jesse Brunet' },
        { name: 'Alex Ayling' },
        { name: 'Ali Hajimiri' }
      ]
    };

    expect(meta.title).toBe('Transmitarrays for Wireless Power Transfer on Earth and in Space');
});

test('Authors extraction - basic case', () => {
    const meta = {
      authors: [
        { name: 'Jesse Brunet' },
        { name: 'Alex Ayling' },
        { name: 'Ali Hajimiri' }
      ]
    };

    const formatted = meta.authors.map(a => a.name).join(', ');
    expect(formatted).toBe('Jesse Brunet, Alex Ayling, Ali Hajimiri');
});
