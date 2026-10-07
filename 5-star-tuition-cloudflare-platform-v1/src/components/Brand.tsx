import { Link } from 'react-router-dom';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand--light' : ''}`} aria-label="5 Star Tuition home">
      <span className="brand-symbol" aria-hidden="true"><img src="/images/logo-mark-option-2.webp" alt="" /></span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-copy">
        <strong>5 STAR</strong>
        <span className="brand-tuition">TUITION</span>
        <small>Expert Online Tuition. Wherever You Are.</small>
      </span>
    </Link>
  );
}
