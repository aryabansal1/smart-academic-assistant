/*
import { toAPA, toBibTeX, Meta } from '../utils/formatCitation';

interface Props {
  meta: Meta;
  onCopy?: (format: 'APA' | 'BibTeX') => void;
}

export default function CitationButtons({ meta, onCopy }: Props) {
  const handleCopy = (fmt: 'APA' | 'BibTeX') => {
    const text = fmt === 'APA' ? toAPA(meta) : toBibTeX(meta);
    navigator.clipboard.writeText(text).then(() => onCopy?.(fmt));
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => handleCopy('APA')}>Copy APA</button>
      <button onClick={() => handleCopy('BibTeX')}>Copy BibTeX</button>
    </div>
  );
}
*/