PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  student_name TEXT NOT NULL,
  age INTEGER,
  year_group TEXT NOT NULL,
  frequency TEXT,
  subject TEXT NOT NULL,
  curriculum TEXT,
  exam_board TEXT,
  grade_goal TEXT,
  support_needed TEXT,
  gender_preference TEXT,
  tutor_background TEXT,
  days TEXT,
  times TEXT,
  tutor_preferences TEXT,
  status TEXT NOT NULL DEFAULT 'new_lead',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_subject ON enquiries(subject);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);

CREATE TABLE IF NOT EXISTS tutor_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nationality TEXT,
  location TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subjects TEXT NOT NULL,
  levels TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  classroom_experience TEXT,
  tutoring_experience TEXT,
  school TEXT,
  role TEXT,
  curricula TEXT,
  availability TEXT,
  bio TEXT,
  references_text TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  vetting_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_tutor_applications_status ON tutor_applications(status);
CREATE INDEX IF NOT EXISTS idx_tutor_applications_created_at ON tutor_applications(created_at);

CREATE TABLE IF NOT EXISTS tutors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  display_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subjects TEXT NOT NULL,
  levels TEXT NOT NULL,
  curricula TEXT,
  qualifications TEXT,
  availability TEXT,
  tutor_rate_pence INTEGER,
  bio TEXT,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_name TEXT NOT NULL,
  parent_email TEXT,
  parent_phone TEXT,
  student_name TEXT NOT NULL,
  year_group TEXT,
  country TEXT,
  subject TEXT,
  curriculum TEXT,
  assigned_tutor_id INTEGER,
  parent_rate_pence INTEGER,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_tutor_id) REFERENCES tutors(id)
);

CREATE TABLE IF NOT EXISTS trials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  enquiry_id INTEGER,
  tutor_id INTEGER,
  scheduled_at TEXT,
  outcome TEXT,
  team_member_attending TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (enquiry_id) REFERENCES enquiries(id),
  FOREIGN KEY (tutor_id) REFERENCES tutors(id)
);
