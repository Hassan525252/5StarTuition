import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Globe2, Plus, ShieldCheck, UserRound, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/Ui';
import { subjects } from '../data/site';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

type DateParts = { year: number; month: number; day: number; hour: number; minute: number };

const countryOptions = [
  'United Kingdom','United Arab Emirates','Qatar','Saudi Arabia','Bahrain','Kuwait','Oman','Ireland','United States','Canada','Australia','New Zealand',
  'India','Pakistan','Bangladesh','Sri Lanka','Malaysia','Singapore','Hong Kong','China','Japan','South Korea','Indonesia','Thailand','Philippines','Vietnam',
  'France','Germany','Spain','Portugal','Italy','Netherlands','Belgium','Switzerland','Austria','Sweden','Norway','Denmark','Finland','Poland','Greece','Turkey',
  'South Africa','Nigeria','Kenya','Egypt','Morocco','Jordan','Lebanon','Other / Not listed'
];

const trialSubjects = [
  ...subjects,
  '11+ Entrance Exam','13+ Entrance Exam','ISEB / Common Pre-Test','CAT4 Preparation','UKiset Preparation','UCAT','LNAT','TMUA','ESAT','SAT','ACT','IELTS','TOEFL','PTE Academic','OET','Oxbridge Admissions','Medicine / MMI','UCAS / Personal Statement','Other'
];

function zonedParts(date: Date, timeZone: string): DateParts {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  const get = (type: 'year'|'month'|'day'|'hour'|'minute') => Number(parts.find(p => p.type === type)?.value || 0);
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') };
}

function isoDate(parts: Pick<DateParts,'year'|'month'|'day'>) {
  return `${parts.year}-${String(parts.month).padStart(2,'0')}-${String(parts.day).padStart(2,'0')}`;
}

function labelDate(iso: string, timeZone: string) {
  const [y,m,d] = iso.split('-').map(Number);
  const noonUTC = new Date(Date.UTC(y,m-1,d,12));
  return new Intl.DateTimeFormat(undefined, { timeZone:'UTC', weekday:'short', day:'numeric', month:'short' }).format(noonUTC);
}

function generateDateOptions(timeZone: string, count = 21) {
  const out: string[] = [];
  const seen = new Set<string>();
  const start = Date.now();
  for (let i = 0; out.length < count && i < 35; i++) {
    const candidate = new Date(start + i * 86400000);
    const key = isoDate(zonedParts(candidate, timeZone));
    if (!seen.has(key)) { seen.add(key); out.push(key); }
  }
  return out;
}

function generateSlots(selectedDate: string, userTimeZone: string) {
  const [y,m,d] = selectedDate.split('-').map(Number);
  const start = Date.UTC(y,m-1,d) - 18 * 3600000;
  const end = Date.UTC(y,m-1,d) + 42 * 3600000;
  const now = Date.now();
  const output: Date[] = [];
  for (let ms = start; ms <= end; ms += 30 * 60000) {
    const date = new Date(ms);
    if (ms <= now + 15 * 60000) continue;
    const local = zonedParts(date, userTimeZone);
    if (isoDate(local) !== selectedDate || ![0,30].includes(local.minute)) continue;
    const uk = zonedParts(date, 'Europe/London');
    const blockedInUk = uk.hour < 3 || uk.hour > 22 || (uk.hour === 22 && uk.minute >= 30);
    if (blockedInUk) continue;
    output.push(date);
  }
  return output;
}

function formatSlot(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, { timeZone, hour:'numeric', minute:'2-digit' }).format(date);
}

function formatFullSlot(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat(undefined, { timeZone, weekday:'short', day:'numeric', month:'short', hour:'numeric', minute:'2-digit' }).format(date);
}

async function postJson(path: string, payload: unknown) {
  const res = await fetch(path, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(payload) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function BookTrialPage() {
  const [searchParams] = useSearchParams();
  const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const [timeZone] = useState(detectedZone);
  const [primarySubject, setPrimarySubject] = useState(searchParams.get('subject') || '');
  const [showExtraSubjects, setShowExtraSubjects] = useState(false);
  const [extraSubjects, setExtraSubjects] = useState<string[]>([]);
  const dateOptions = useMemo(() => generateDateOptions(timeZone, 30), [timeZone]);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0] || '');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  const chosenSubjects = useMemo(() => [primarySubject, ...extraSubjects].filter(Boolean), [primarySubject, extraSubjects]);
  const requiredSlots = chosenSubjects.length;
  const slots = useMemo(() => selectedDate ? generateSlots(selectedDate, timeZone) : [], [selectedDate, timeZone]);

  useEffect(() => {
    setSelectedSlots(prev => prev.slice(0, requiredSlots));
  }, [requiredSlots]);

  const addExtraSubject = () => {
    if (extraSubjects.length < 10) setExtraSubjects([...extraSubjects, '']);
  };

  const updateExtra = (index: number, value: string) => {
    const next = [...extraSubjects];
    next[index] = value;
    setExtraSubjects(next);
  };

  const removeExtra = (index: number) => setExtraSubjects(extraSubjects.filter((_,i) => i !== index));

  const toggleSlot = (iso: string) => {
    setSelectedSlots(prev => {
      if (prev.includes(iso)) return prev.filter(x => x !== iso);
      if (prev.length >= requiredSlots) return prev;
      return [...prev, iso];
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!primarySubject) { setMessage('Please choose the main subject.'); return; }
    if (selectedSlots.length !== requiredSlots) { setMessage(`Please choose ${requiredSlots} separate 30-minute trial slot${requiredSlots === 1 ? '' : 's'} — one for each subject.`); return; }
    setState('sending'); setMessage('');
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      subject: primarySubject,
      subjects: chosenSubjects,
      trial_slots: selectedSlots,
      timezone: timeZone,
    };
    try {
      await postJson('/api/trial-bookings', payload);
      setState('success');
      window.scrollTo({ top: 0, behavior:'smooth' });
    } catch {
      const existing = JSON.parse(localStorage.getItem('fst-preview-trial-bookings') || '[]');
      existing.push({ ...payload, createdAt:new Date().toISOString() });
      localStorage.setItem('fst-preview-trial-bookings', JSON.stringify(existing));
      setState('success');
      setMessage('Preview mode: booking saved in this browser only. Production bookings will use the Cloudflare database.');
      window.scrollTo({ top: 0, behavior:'smooth' });
    }
  };

  if (state === 'success') return <>
    <PageHero eyebrow="FREE 30-MINUTE TRIAL" title="Your trial request has been received." text="We’ll confirm the selected trial time(s) and tutor match using the contact details you provided." />
    <section className="section shell"><div className="booking-success"><CheckCircle2/><h2>Thank you.</h2><p>Your requested trial slot(s) have been recorded.</p>{message && <small>{message}</small>}</div></section>
  </>;

  return <>
    <PageHero eyebrow="BOOK A FREE TRIAL" title="Choose your subject and your preferred 30-minute trial time." text="Trial times are automatically displayed in your local time zone. If you need more than one subject, simply choose one separate trial slot per subject." />

    <section className="section shell booking-layout">
      <div className="booking-main">
        <div className="booking-step-card">
          <div className="booking-step-heading"><span>1</span><div><h2>Choose subject(s)</h2><p>Select the main subject first. You can add up to 10 additional subjects.</p></div></div>
          <label className="booking-label">Main subject<select value={primarySubject} onChange={e=>setPrimarySubject(e.target.value)}><option value="">Choose subject</option>{trialSubjects.map(s=><option key={s}>{s}</option>)}</select></label>

          {!showExtraSubjects ? <button type="button" className="booking-add-link" onClick={()=>{setShowExtraSubjects(true); if (!extraSubjects.length) setExtraSubjects(['']);}}><Plus/> Interested in more than 1 subject? Click here</button> : <div className="extra-subjects">
            <div className="extra-subjects-title"><strong>Additional subjects</strong><span>{extraSubjects.length}/10</span></div>
            {extraSubjects.map((subject,index)=><div className="extra-subject-row" key={index}><select value={subject} onChange={e=>updateExtra(index,e.target.value)}><option value="">Choose additional subject</option>{trialSubjects.filter(s=>s!==primarySubject && !extraSubjects.some((x,i)=>i!==index&&x===s)).map(s=><option key={s}>{s}</option>)}</select><button type="button" aria-label="Remove subject" onClick={()=>removeExtra(index)}><X/></button></div>)}
            {extraSubjects.length < 10 && <button type="button" className="booking-add-link" onClick={addExtraSubject}><Plus/> Add another subject</button>}
          </div>}
        </div>

        <div className="booking-step-card">
          <div className="booking-step-heading"><span>2</span><div><h2>Choose trial time(s)</h2><p>{requiredSlots ? `Choose ${requiredSlots} separate 30-minute slot${requiredSlots===1?'':'s'} — one for each subject.` : 'Choose a subject above to view the number of trial slots required.'}</p></div></div>
          <div className="timezone-banner"><Globe2/><div><strong>Times shown in your local time</strong><span>{timeZone}</span></div></div>
          <div className="booking-dates">{dateOptions.map(date=><button type="button" key={date} className={selectedDate===date?'active':''} onClick={()=>setSelectedDate(date)}>{labelDate(date,timeZone)}</button>)}</div>
          <div className="slot-grid">{requiredSlots ? slots.map(slot=>{const iso=slot.toISOString(); const selected=selectedSlots.includes(iso); return <button type="button" key={iso} onClick={()=>toggleSlot(iso)} className={selected?'selected':''}><Clock3/>{formatSlot(slot,timeZone)}</button>}) : <div className="slot-empty">Choose your subject first.</div>}</div>
          {!!selectedSlots.length && <div className="selected-slot-list"><strong>Selected trial slots</strong>{selectedSlots.map((slot,index)=><div key={slot}><span>{chosenSubjects[index] || `Subject ${index+1}`}</span><b>{formatFullSlot(new Date(slot),timeZone)}</b></div>)}</div>}
        </div>

        <form onSubmit={submit} className="booking-step-card booking-form">
          <div className="booking-step-heading"><span>3</span><div><h2>Parent & student details</h2><p>Complete this once, even if you are requesting trials for more than one subject.</p></div></div>
          <div className="booking-form-grid">
            <label>Full Name (Parent / User)<input required name="parent_name"/></label>
            <label>Phone Number<input required name="phone"/></label>
            <label>WhatsApp Number<input required name="whatsapp"/></label>
            <label>Email<input required type="email" name="email"/></label>
            <label>Student Currently Located In<select required name="country" defaultValue=""><option value="">Choose country</option>{countryOptions.map(c=><option key={c}>{c}</option>)}</select></label>
            <label>Student First Name<input required name="student_name"/></label>
            <label>Subject<input readOnly name="subject_display" value={chosenSubjects.join(', ')}/></label>
            <label>Year Level<select required name="academic_level" defaultValue=""><option value="">Choose level</option><option>KS2</option><option>KS3</option><option>GCSE</option><option>IGCSE</option><option>A-Level</option><option>International A-Level</option><option>IB</option><option>Entrance Examination</option><option>University Admissions</option><option>Other</option></select></label>
            <label>Year Group<select required name="year_group" defaultValue=""><option value="">Choose year group</option>{Array.from({length:11},(_,i)=>`Year ${i+3}`).map(y=><option key={y}>{y}</option>)}<option>Other / Not applicable</option></select></label>
            <label>Exam Board(s)<input name="exam_board" placeholder="e.g. Edexcel, AQA, Cambridge"/></label>
            <label>Exam Date<select name="exam_date" defaultValue=""><option value="">Choose option</option><option>Winter 2026</option><option>Summer 2027</option><option>Other</option></select></label>
            <label>Hours Wanted Per Week<select name="hours_per_week" defaultValue=""><option value="">Choose option</option><option>1–2hr</option><option>2–3hr</option><option>3–4hr</option><option>4hr+</option><option>Not sure yet</option></select></label>
            <label>Tutor Preference<select name="tutor_gender" defaultValue="Either"><option>Male</option><option>Female</option><option>Either</option></select></label>
            <label>Have Another Child You Want to Trial With Us?<select name="another_child" defaultValue="No"><option>No</option><option>Yes</option></select></label>
          </div>
          <label>Flexibility With Timings?<textarea name="timing_flexibility" rows={3} placeholder="Tell us which days/times you can be flexible with, if any."/></label>
          <label>Additional Information the Tutor Should Know Before the Trial<textarea name="student_info" rows={5} placeholder="Learning needs, current strengths/challenges, goals, or anything else useful before the trial. If you have another child/student, add their details here and our team will contact you directly."/></label>
          {!!message && <div className="booking-warning">{message}</div>}
          <label className="checkbox"><input type="checkbox" required/><span>I agree that 5 Star Tuition may contact me by phone, WhatsApp or email regarding this trial request.</span></label>
          <button disabled={state==='sending'} className="button button--gold button--full booking-submit" type="submit">{state==='sending'?'Submitting…':'Confirm FREE Trial Request'}</button>
        </form>
      </div>

      <aside className="booking-aside">
        <div><ShieldCheck/><h3>Personally vetted tutors</h3><p>Your final tutor match is reviewed by our team.</p></div>
        <div><CalendarDays/><h3>One slot per subject</h3><p>Multiple subjects receive separate 30-minute trial sessions.</p></div>
        <div><Globe2/><h3>Your local time zone</h3><p>Calendar times automatically adapt to the location of the device you are using.</p></div>
        <div><UserRound/><h3>One simple form</h3><p>No need to repeat the full form for each subject or additional child.</p></div>
      </aside>
    </section>
  </>;
}
