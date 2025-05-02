/*
import { useState } from 'react';
import CitationButtons from './CitationButtons';
import type { Meta } from '../utils/formatCitation';

const DEMO_META: Meta = {
  title: 'Learning Proteome Domain Folding Using LSTMs in an Empirical Kernel Space',
  authors: ['Da Kuang', 'Dina Issakova', 'Junhyong Kim'],
  year: 2022,
  journal: 'Journal of Molecular Biology'
};

export default function Popup() {
  // replace with real‑time extractor data
  const [meta] = useState<Meta>(DEMO_META);
  const [copied, setCopied] = useState('');

  return (
    <div style={{ padding: 16, width: 320, fontFamily: 'system-ui' }}>
      <h2 style={{ marginTop: 0 }}>ScholarSense</h2>

      <p style={{ fontSize: 13, marginBottom: 8 }}>
        {meta.title}
        <br />
        <em style={{ fontSize: 12 }}>{meta.authors.join(', ')}</em>
      </p>

      <CitationButtons
        meta={meta}
        onCopy={fmt => {
          setCopied(fmt);
          setTimeout(() => setCopied(''), 1500);
        }}
      />

      {copied && (
        <div style={{ marginTop: 8, fontSize: 12, color: 'green' }}>
          Copied {copied} citation!
        </div>
      )}
    </div>
  );
}
*/
