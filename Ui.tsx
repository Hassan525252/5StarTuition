import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Star } from 'lucide-react';
import type { Tutor } from '../data/site';

export function SectionHeading({ eyebrow, title, text, center=false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return <div className={`section-heading ${center ? 'center' : ''}`}>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return <article className="tutor-card">
    <div className="tutor-avatar">{tutor.photo ? <img src={tutor.photo} alt={`${tutor.name} tutor profile`} /> : tutor.initials}</div>
    <div className="tutor-card-top"><div><span className="verified"><BadgeCheck size={16}/> Verified tutor</span><h3>{tutor.name}</h3><p>{tutor.title}</p></div><div className="rating"><Star size={15} fill="currentColor"/> {tutor.rating}</div></div>
    <div className="tag-row">{tutor.subjects.slice(0,3).map(s => <span key={s}>{s}</span>)}</div>
    <p className="tutor-bio">{tutor.bio}</p>
    <div className="tutor-meta"><span>{tutor.qualifications || tutor.experience}</span><span>{tutor.experience}</span>{tutor.location && <span>{tutor.location}</span>}<span>{tutor.availability}</span></div>
    <div className="card-actions"><Link to={`/tutors/${tutor.id}`} className="button button--outline">View Profile</Link><Link to={`/book-free-trial?subject=${encodeURIComponent(tutor.subjects[0] || "")}`} className="button button--gold">Book a FREE trial</Link></div>
  </article>
}

export function PageHero({ eyebrow, title, text, cta }: { eyebrow: string; title: string; text: string; cta?: string }) {
  return <section className="page-hero"><div className="shell page-hero-inner"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{cta && <Link className="button button--gold" to="/find-a-tutor">{cta}<ArrowRight size={18}/></Link>}</div><div className="page-hero-art"><div className="art-ring"></div><div className="art-card"><strong>5★</strong><span>Personalised matching</span><small>Vetted tutors · Flexible scheduling</small></div></div></div></section>
}
