import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BarChart3, BookOpen, Check, Globe2, GraduationCap, ShieldCheck, Sparkles, Star, Target, Users } from 'lucide-react';
import { pricing, reviews, subjects, tutors } from '../data/site';
import { SectionHeading, TutorCard } from '../components/Ui';

const serviceCards = [
  ['Primary', 'Years 3–6', 'Strong foundations, confidence and personalised support.', BookOpen],
  ['Secondary', 'Years 7–9', 'Build subject knowledge and prepare confidently for GCSE.', Users],
  ['GCSE / IGCSE', 'Years 10–11', 'Focused exam preparation with clear grade targets.', Target],
  ['A-Level / IB', 'Years 12–13', 'Advanced subject mastery and university preparation.', GraduationCap],
  ['Entrance Exams', '7+, 8+, 11+, 13+', 'Selective-school preparation, ISEB, CAT4 and more.', Sparkles],
  ['University Admissions', 'UCAT, Oxbridge & more', 'Admissions tests, interviews and application support.', Globe2],
];

export function HomePage() {
  return <>
    <section className="hero">
      <div className="hero-bg hero-bg-one"></div><div className="hero-bg hero-bg-two"></div>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">PERSONALISED ONLINE TUITION · WORLDWIDE</span>
          <h1>The right tutor.<br/>Clear progress.<br/><span>Better results.</span></h1>
          <p>Carefully vetted online tutors supporting students from <strong>Year 3 to Year 13</strong>, entrance examinations and university admissions.</p>
          <div className="hero-actions"><Link className="button button--gold" to="/find-a-tutor">Find My Tutor <ArrowRight size={18}/></Link><Link className="button button--navy" to="/find-a-tutor">Book a Free 30-Minute Trial</Link></div>
          <div className="trust-strip"><span><ShieldCheck/> Personally vetted tutors</span><span><Globe2/> Online worldwide</span><span><GraduationCap/> Years 3–13 & admissions</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-panel hero-panel-main">
            <div className="panel-kicker">Your personalised tutor match</div>
            <div className="match-profile"><div className="avatar-large">AK</div><div><strong>Ayesha Khan</strong><span>GCSE & A-Level Mathematics</span><small><BadgeCheck size={14}/> Verified teacher · 7+ years</small></div></div>
            <div className="match-score"><span>Match score</span><strong>96%</strong><div className="progress-track"><i style={{width:'96%'}}/></div></div>
            <div className="match-chips"><span>Edexcel</span><span>Tuesday evening</span><span>Grade 8–9</span></div>
            <Link to="/find-a-tutor" className="button button--gold button--full">Book free trial</Link>
          </div>
          <div className="floating-card floating-card-one"><BarChart3/><div><span>Current grade</span><strong>5 → 8</strong></div></div>
          <div className="floating-card floating-card-two"><Star fill="currentColor"/><div><span>Parent feedback</span><strong>4.9 / 5</strong></div></div>
        </div>
      </div>
    </section>

    <section className="trust-band"><div className="shell trust-band-grid"><strong>Built around the student, not a tutor directory.</strong><span>Personal matching</span><span>Free trial</span><span>Flexible scheduling</span><span>Ongoing support</span></div></section>

    <section className="section shell">
      <SectionHeading eyebrow="START HERE" title="What are you looking for?" text="Choose the stage that best matches your student. We’ll help with the rest." center/>
      <div className="service-grid">{serviceCards.map(([title, meta, text, Icon]: any) => <Link to={title === 'Entrance Exams' || title === 'University Admissions' ? '/exams-admissions' : '/tuition'} className="service-card" key={title}><div className="service-icon"><Icon/></div><div><span>{meta}</span><h3>{title}</h3><p>{text}</p><b>Explore <ArrowRight size={16}/></b></div></Link>)}</div>
    </section>

    <section className="section section--mist">
      <div className="shell split-grid">
        <div><SectionHeading eyebrow="FLEXIBLE · PERSONAL · EFFECTIVE" title="High-quality online tuition, designed around your goals." text="Whether a student needs to rebuild confidence, raise a grade, prepare for an entrance exam or aim for a highly competitive university, we match them with a tutor suited to their individual requirements."/><Link to="/how-it-works" className="inline-link">See how our matching works <ArrowRight size={17}/></Link></div>
        <div className="outcome-grid"><div><BookOpen/><h3>Understand more</h3><p>Build genuine subject knowledge rather than memorising answers.</p></div><div><Target/><h3>Achieve more</h3><p>Work towards clear academic goals and measurable outcomes.</p></div><div><Sparkles/><h3>Grow in confidence</h3><p>Develop independence, study habits and belief in your ability.</p></div><div><BarChart3/><h3>See progress</h3><p>Structured support keeps learning focused and visible.</p></div></div>
      </div>
    </section>

    <section className="section shell">
      <SectionHeading eyebrow="HOW IT WORKS" title="From enquiry to regular tuition in four simple steps." center/>
      <div className="steps-grid">{[
        ['01','Tell us what you need','Share the student’s subject, level, goals, availability and tutor preferences.'],
        ['02','We find the right tutor','Our team reviews suitable vetted tutors and recommends the strongest match.'],
        ['03','Try the tutor free','Meet in a free 30-minute trial attended by a 5 Star Tuition team member.'],
        ['04','Start regular tuition','Choose a tuition package and begin a consistent, flexible lesson schedule.']
      ].map(([n,t,d]) => <div className="step-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      <div className="center-row"><Link className="button button--gold" to="/find-a-tutor">Find My Tutor <ArrowRight size={17}/></Link></div>
    </section>

    <section className="section section--navy">
      <div className="shell vet-grid"><div><span className="eyebrow eyebrow--gold">TUTOR QUALITY</span><h2>Tutors we would trust with our own students.</h2><p>Every tutor must pass our own vetting process before they become available for matching.</p><Link to="/become-a-tutor" className="button button--light">Our tutor standards</Link></div><div className="check-list">{['Personally interviewed by our team','Qualifications and experience reviewed','Subject and curriculum expertise recorded','Communication and professionalism assessed','Matched to the student’s specific requirements'].map(x => <div key={x}><Check/><span>{x}</span></div>)}</div></div>
    </section>

    <section className="section shell">
      <div className="section-topline"><SectionHeading eyebrow="POPULAR SUBJECTS" title="Expert tuition across a wide range of subjects."/><Link className="inline-link" to="/subjects">Browse all subjects <ArrowRight size={17}/></Link></div>
      <div className="subject-grid">{subjects.slice(0,12).map((s, i) => <Link to={`/subjects/${s.toLowerCase().replaceAll(' ','-')}`} key={s}><span>{String(i+1).padStart(2,'0')}</span><strong>{s}</strong><ArrowRight size={16}/></Link>)}</div>
    </section>

    <section className="section section--ivory">
      <div className="shell"><div className="section-topline"><SectionHeading eyebrow="MEET OUR TUTORS" title="Selected tutors. Personal matching." text="These profiles are demonstration content for the build. Real approved tutor profiles will replace them before launch."/><Link className="inline-link" to="/tutors">View all tutors <ArrowRight size={17}/></Link></div><div className="tutor-grid">{tutors.slice(0,3).map(t => <TutorCard key={t.id} tutor={t}/>)}</div></div>
    </section>

    <section className="section shell">
      <SectionHeading eyebrow="CLEAR PRICING" title="Transparent hourly tuition rates." text="Start with a free 30-minute trial. New students can begin with a 2, 4 or 8-week package." center/>
      <div className="pricing-grid">{pricing.map(([name, price]) => <div className="price-card" key={name}><span>{name}</span><strong>{price}</strong><small>Online 1-to-1 tuition</small></div>)}</div>
      <div className="trial-banner"><div><span>FREE INITIAL TRIAL</span><h3>Meet the tutor before you commit.</h3><p>No payment required for the first 30-minute trial.</p></div><Link to="/find-a-tutor" className="button button--navy">Book free trial</Link></div>
    </section>

    <section className="section section--mist"><div className="shell"><SectionHeading eyebrow="PARENT FEEDBACK" title="The experience should feel professional from day one." center/><div className="reviews-grid">{reviews.map(r => <figure key={r.name}><div className="stars">★★★★★</div><blockquote>“{r.quote}”</blockquote><figcaption><strong>{r.name}</strong><span>{r.meta}</span></figcaption></figure>)}</div><p className="placeholder-note">Design placeholders only — these will be replaced with verified 5 Star Tuition testimonials before launch.</p></div></section>

    <section className="section international"><div className="shell international-grid"><div><span className="eyebrow">ONLINE WORLDWIDE</span><h2>Excellent tuition shouldn’t depend on where you live.</h2><p>We support students internationally while keeping the experience personal, structured and easy to manage.</p><div className="country-row"><span>UK</span><span>UAE</span><span>Qatar</span><span>Bahrain</span><span>Saudi Arabia</span><span>Worldwide</span></div></div><div className="globe-card"><Globe2/><strong>One platform.</strong><span>Students, parents, tutors and admins — connected.</span></div></div></section>

    <section className="final-cta"><div className="shell final-cta-inner"><div><span className="eyebrow eyebrow--gold">READY TO BEGIN?</span><h2>Find the right tutor for your student.</h2><p>Start with a free 30-minute trial and see whether the tutor is the right fit before committing.</p></div><div><Link to="/find-a-tutor" className="button button--gold">Find My Tutor <ArrowRight size={18}/></Link><a className="button button--ghost" href="https://wa.me/447983452340">WhatsApp Us</a></div></div></section>
  </>;
}
