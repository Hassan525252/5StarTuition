PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS trial_bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  student_name TEXT NOT NULL,
  subjects_json TEXT NOT NULL,
  academic_level TEXT NOT NULL,
  year_group TEXT NOT NULL,
  exam_board TEXT,
  exam_date TEXT,
  hours_per_week TEXT,
  tutor_gender TEXT,
  timing_flexibility TEXT,
  another_child TEXT,
  student_info TEXT,
  timezone TEXT NOT NULL,
  trial_slots_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'requested',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_trial_bookings_status ON trial_bookings(status);
CREATE INDEX IF NOT EXISTS idx_trial_bookings_email ON trial_bookings(email);
CREATE INDEX IF NOT EXISTS idx_trial_bookings_created_at ON trial_bookings(created_at);
