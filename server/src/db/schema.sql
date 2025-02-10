-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  google_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  company VARCHAR(255),
  position VARCHAR(255),
  status VARCHAR(50),
  applied_date TIMESTAMP,
  job_url TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Networking contacts
CREATE TABLE networking_contacts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  contact_name VARCHAR(255),
  company VARCHAR(255),
  linkedin_url TEXT,
  email VARCHAR(255),
  status VARCHAR(50),
  last_contact_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interaction history
CREATE TABLE interaction_history (
  id SERIAL PRIMARY KEY,
  connection_id INTEGER REFERENCES networking_contacts(id),
  interaction_type VARCHAR(50),
  notes TEXT,
  follow_up_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 