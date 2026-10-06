import { Link } from 'react-router-dom';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand--light' : ''}`} aria-label="5 Star Tuition home">
      <span className="brand-symbol" aria-hidden="true"><b>5</b><i>★</i></span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-copy">
        <strong>5 STAR TUITION</strong>
        <small>Expert Online Tuition. Wherever You Are.</small>
      </span>
    </Link>
  );
}
