interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  APP_ENV?: string;
}

type JsonRecord = Record<string, unknown>;

const json = (data: unknown, init: ResponseInit = {}) => new Response(JSON.stringify(data), {
  ...init,
  headers: { 'content-type': 'application/json; charset=utf-8', ...(init.headers || {}) },
});

async function readBody(request: Request): Promise<JsonRecord> {
  const body = await request.json();
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid JSON body');
  return body as JsonRecord;
}

function text(body: JsonRecord, key: string, max = 2000) {
  const value = body[key];
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function required(value: string, name: string) {
  if (!value) throw new Error(`${name} is required`);
  return value;
}

async function createEnquiry(request: Request, env: Env) {
  if (!env.DB) return json({ ok: false, preview: true, error: 'D1 database not connected yet.' }, { status: 503 });
  const body = await readBody(request);
  const row = {
    parent_name: required(text(body, 'parent_name', 120), 'Parent name'),
    email: required(text(body, 'email', 180), 'Email'),
    phone: required(text(body, 'phone', 80), 'Phone'),
    country: required(text(body, 'country', 100), 'Country'),
    student_name: required(text(body, 'student_name', 120), 'Student name'),
    age: Number(text(body, 'age', 3)) || null,
    year_group: required(text(body, 'year_group', 80), 'Year group'),
    frequency: text(body, 'frequency', 30),
    subject: required(text(body, 'subject', 120), 'Subject'),
    curriculum: text(body, 'curriculum', 120),
    exam_board: text(body, 'exam_board', 120),
    grade_goal: text(body, 'grade_goal', 120),
    support_needed: text(body, 'support_needed'),
    gender_preference: text(body, 'gender_preference', 50),
    tutor_background: text(body, 'tutor_background', 120),
    days: text(body, 'days', 160),
    times: text(body, 'times', 160),
    tutor_preferences: text(body, 'tutor_preferences'),
  };

  const result = await env.DB.prepare(`
    INSERT INTO enquiries (
      parent_name,email,phone,country,student_name,age,year_group,frequency,subject,curriculum,
      exam_board,grade_goal,support_needed,gender_preference,tutor_background,days,times,tutor_preferences,status
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'new_lead')
  `).bind(
    row.parent_name,row.email,row.phone,row.country,row.student_name,row.age,row.year_group,row.frequency,row.subject,row.curriculum,
    row.exam_board,row.grade_goal,row.support_needed,row.gender_preference,row.tutor_background,row.days,row.times,row.tutor_preferences
  ).run();
  return json({ ok: true, id: result.meta.last_row_id }, { status: 201 });
}

async function createTutorApplication(request: Request, env: Env) {
  if (!env.DB) return json({ ok: false, preview: true, error: 'D1 database not connected yet.' }, { status: 503 });
  const body = await readBody(request);
  const row = {
    name: required(text(body, 'name', 120), 'Name'),
    nationality: text(body, 'nationality', 100),
    location: required(text(body, 'location', 160), 'Location'),
    email: required(text(body, 'email', 180), 'Email'),
    phone: required(text(body, 'phone', 80), 'Phone'),
    subjects: required(text(body, 'subjects', 500), 'Subjects'),
    levels: required(text(body, 'levels', 500), 'Levels'),
    qualifications: required(text(body, 'qualifications', 1000), 'Qualifications'),
    classroom_experience: text(body, 'classroom_experience', 150),
    tutoring_experience: text(body, 'tutoring_experience', 150),
    school: text(body, 'school', 200),
    role: text(body, 'role', 160),
    curricula: text(body, 'curricula', 700),
    availability: text(body, 'availability', 700),
    bio: text(body, 'bio'),
    references_text: text(body, 'references'),
  };
  const result = await env.DB.prepare(`
    INSERT INTO tutor_applications (
      name,nationality,location,email,phone,subjects,levels,qualifications,classroom_experience,
      tutoring_experience,school,role,curricula,availability,bio,references_text,status
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'submitted')
  `).bind(
    row.name,row.nationality,row.location,row.email,row.phone,row.subjects,row.levels,row.qualifications,row.classroom_experience,
    row.tutoring_experience,row.school,row.role,row.curricula,row.availability,row.bio,row.references_text
  ).run();
  return json({ ok: true, id: result.meta.last_row_id }, { status: 201 });
}



function ukClock(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const hour = Number(parts.find(p => p.type === 'hour')?.value || 0);
  const minute = Number(parts.find(p => p.type === 'minute')?.value || 0);
  return { hour, minute };
}

function validateTrialSlots(slots: string[]) {
  if (new Set(slots).size !== slots.length) throw new Error('Trial slots must be unique');
  for (const slot of slots) {
    const date = new Date(slot);
    if (Number.isNaN(date.getTime()) || date.getTime() <= Date.now()) throw new Error('Trial slots must be valid future times');
    if (![0,30].includes(date.getUTCMinutes())) throw new Error('Trial slots must be 30-minute calendar slots');
    const uk = ukClock(date);
    const blocked = uk.hour < 3 || uk.hour > 22 || (uk.hour === 22 && uk.minute >= 30);
    if (blocked) throw new Error('Selected trial time is not available');
  }
}

async function createTrialBooking(request: Request, env: Env) {
  if (!env.DB) return json({ ok: false, preview: true, error: 'D1 database not connected yet.' }, { status: 503 });
  const body = await readBody(request);
  const subjects = Array.isArray(body.subjects) ? body.subjects.filter((x: unknown): x is string => typeof x === 'string').slice(0, 11) : [];
  const trialSlots = Array.isArray(body.trial_slots) ? body.trial_slots.filter((x: unknown): x is string => typeof x === 'string').slice(0, 11) : [];
  if (!subjects.length) throw new Error('At least one subject is required');
  if (trialSlots.length !== subjects.length) throw new Error('One separate trial slot is required for each subject');
  validateTrialSlots(trialSlots);
  const row = {
    parent_name: required(text(body, 'parent_name', 120), 'Parent name'),
    phone: required(text(body, 'phone', 80), 'Phone'),
    whatsapp: required(text(body, 'whatsapp', 80), 'WhatsApp number'),
    email: required(text(body, 'email', 180), 'Email'),
    country: required(text(body, 'country', 100), 'Country'),
    student_name: required(text(body, 'student_name', 120), 'Student name'),
    academic_level: required(text(body, 'academic_level', 100), 'Academic level'),
    year_group: required(text(body, 'year_group', 80), 'Year group'),
    exam_board: text(body, 'exam_board', 300),
    exam_date: text(body, 'exam_date', 100),
    hours_per_week: text(body, 'hours_per_week', 60),
    tutor_gender: text(body, 'tutor_gender', 30),
    timing_flexibility: text(body, 'timing_flexibility', 1500),
    another_child: text(body, 'another_child', 20),
    student_info: text(body, 'student_info', 3000),
    timezone: required(text(body, 'timezone', 120), 'Time zone'),
  };
  const result = await env.DB.prepare(`
    INSERT INTO trial_bookings (
      parent_name,phone,whatsapp,email,country,student_name,subjects_json,academic_level,year_group,
      exam_board,exam_date,hours_per_week,tutor_gender,timing_flexibility,another_child,student_info,
      timezone,trial_slots_json,status
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, 'requested')
  `).bind(
    row.parent_name,row.phone,row.whatsapp,row.email,row.country,row.student_name,JSON.stringify(subjects),row.academic_level,row.year_group,
    row.exam_board,row.exam_date,row.hours_per_week,row.tutor_gender,row.timing_flexibility,row.another_child,row.student_info,
    row.timezone,JSON.stringify(trialSlots)
  ).run();
  return json({ ok: true, id: result.meta.last_row_id }, { status: 201 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') return json({ ok: true, environment: env.APP_ENV || 'unknown', database: Boolean(env.DB) });
    if (request.method === 'POST' && url.pathname === '/api/enquiries') {
      try { return await createEnquiry(request, env); } catch (error) { return json({ ok: false, error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 }); }
    }
    if (request.method === 'POST' && url.pathname === '/api/tutor-applications') {
      try { return await createTutorApplication(request, env); } catch (error) { return json({ ok: false, error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 }); }
    }
    if (request.method === 'POST' && url.pathname === '/api/trial-bookings') {
      try { return await createTrialBooking(request, env); } catch (error) { return json({ ok: false, error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 }); }
    }
    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
