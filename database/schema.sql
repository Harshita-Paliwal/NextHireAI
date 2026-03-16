CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  resume_text TEXT,
  ai_score INTEGER,
  risk_level TEXT,
  recommendation TEXT,
  stage TEXT DEFAULT 'Applied',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  candidate_id INTEGER UNIQUE REFERENCES candidates(id) ON DELETE CASCADE,
  report_json JSONB
);