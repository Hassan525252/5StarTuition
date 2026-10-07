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
    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found' }, { status: 404 });
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
