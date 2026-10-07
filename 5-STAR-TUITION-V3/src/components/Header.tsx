import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Brand } from './Brand';
import { navGroups } from '../data/site';

function routeFor(title:string, group:'tuition'|'exams'){
  if(title==='All Subjects') return '/subjects';
  if(title==='Curricula') return '/curricula';
  if(group==='exams') return '/exams-admissions';
  return '/tuition';
}

function MegaMenu({ items, group, onClose }: { items: string[][]; group:'tuition'|'exams'; onClose: () => void }) {
  return (
    <div className="mega-menu">
      <div className="mega-menu-head"><span>{group==='tuition'?'TUITION':'EXAMS & ADMISSIONS'}</span><small>Explore specialist support</small></div>
      <div className="mega-grid">
        {items.map(([title, sub]) => (
          <Link key={title} to={routeFor(title,group)} onClick={onClose} className="mega-item">
            <strong>{title}</strong><span>{sub}</span>
          </Link>
        ))}
      </div>
      <div className="mega-footer">UK-qualified tutors · Personally vetted · Online worldwide</div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const close = () => { setOpen(null); setMobile(false); };
  return (
    <header className="site-header">
      <div className="top-note"><div className="top-note-inner"><span>UK-Qualified &amp; Experienced tutors</span><i>·</i><span>FREE 30-minute trial</span><i>·</i><span>Worldwide</span></div></div>
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <div className="nav-drop" onMouseEnter={() => setOpen('tuition')} onMouseLeave={() => setOpen(null)}>
            <button className="nav-link-btn">Tuition <ChevronDown size={15}/></button>
            {open === 'tuition' && <MegaMenu items={navGroups.tuition} group="tuition" onClose={close}/>} 
          </div>
          <NavLink to="/subjects">Subjects</NavLink>
          <div className="nav-drop" onMouseEnter={() => setOpen('exams')} onMouseLeave={() => setOpen(null)}>
            <button className="nav-link-btn">Exam Prep <ChevronDown size={15}/></button>
            {open === 'exams' && <MegaMenu items={navGroups.exams} group="exams" onClose={close}/>} 
          </div>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="text-action">Sign in</Link>
          <Link to="/find-a-tutor" className="button button--gold button--small">Find my tutor</Link>
          <button className="mobile-toggle" onClick={() => setMobile(v => !v)} aria-label="Toggle menu">{mobile ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobile && (
        <div className="mobile-menu">
          <Link onClick={close} to="/">Home</Link>
          <Link onClick={close} to="/tuition">Tuition</Link>
          <Link onClick={close} to="/subjects">Subjects</Link>
          <Link onClick={close} to="/exams-admissions">Exams & Admissions</Link>
          <Link onClick={close} to="/how-it-works">How It Works</Link>
          <Link onClick={close} to="/pricing">Pricing</Link>
          <Link onClick={close} to="/about">About</Link>
          <Link onClick={close} to="/for-parents">For Parents</Link>
          <Link onClick={close} to="/become-a-tutor">For Tutors</Link>
          <Link onClick={close} to="/contact">Contact</Link>
          <Link onClick={close} to="/find-a-tutor" className="button button--gold">Find my tutor</Link>
        </div>
      )}
    </header>
  );
}
