import { Link } from 'react-router-dom';

export function Brand({ light = false }: { light?: boolean }) {
  if (!light) {
    return (
      <Link to="/" className="brand brand--approved-logo" aria-label="5 Star Tuition home">
        <img src="/images/5-star-tuition-logo-v5.webp" alt="5 Star Tuition — Expert Online Tuition. Wherever You Are." />
      </Link>
    );
  }

  return (
    <Link to="/" className="brand brand--light" aria-label="5 Star Tuition home">
      <span className="brand-symbol" aria-hidden="true"><img src="/images/logo-mark-option-2.webp" alt="" /></span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-copy">
        <strong className="brand-name"><span>5</span><span>STAR</span></strong>
        <span className="brand-tuition">TUITION</span>
        <small>Expert Online Tuition. Wherever You Are.</small>
      </span>
    </Link>
  );
}
