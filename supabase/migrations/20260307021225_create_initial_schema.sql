/*
  # Initial Schema Migration

  ## Summary
  Creates the full application schema for the Idalia Calc fertility and gestational calculator app.

  ## New Tables
  1. `sessions` - Express session storage
  2. `users` - User accounts with subscription and credit tracking
  3. `plans` - Subscription plan definitions
  4. `usage_history` - Per-user calculation credit usage log
  5. `cycles` - Menstrual cycle records per user
  6. `basal_temperatures` - Daily basal body temperature readings
  7. `mucus_observations` - Cervical mucus observation records
  8. `pregnancies` - Active and historical pregnancy records
  9. `calculations` - Saved calculator results (fertility & gestational)
  10. `notifications` - In-app user notifications

  ## Security
  - RLS enabled on all user-data tables
  - Sessions table is internal (no RLS needed for server-side use)
  - Policies restrict access so each user can only read/write their own data
*/

-- Sessions table (server-side only, no RLS needed)
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON sessions(expire);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  plan VARCHAR DEFAULT 'free',
  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,
  subscription_status VARCHAR DEFAULT 'inactive',
  subscription_end_date TIMESTAMP,
  monthly_credits INTEGER DEFAULT 5,
  used_credits INTEGER DEFAULT 0,
  total_calculations INTEGER DEFAULT 0,
  last_credit_reset TIMESTAMP DEFAULT now(),
  has_used_free_trial BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id);

-- Plans table (public read)
CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  monthly_price DECIMAL(10,2) NOT NULL,
  yearly_price DECIMAL(10,2),
  monthly_credits INTEGER NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  stripe_price_id_monthly VARCHAR,
  stripe_price_id_yearly VARCHAR,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plans are publicly readable"
  ON plans FOR SELECT
  TO anon, authenticated
  USING (true);

-- Usage history
CREATE TABLE IF NOT EXISTS usage_history (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  calculation_type VARCHAR NOT NULL,
  credits_used INTEGER DEFAULT 1,
  calculation_data JSONB,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE usage_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage history"
  ON usage_history FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own usage history"
  ON usage_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Menstrual cycles
CREATE TABLE IF NOT EXISTS cycles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  period_start DATE NOT NULL,
  period_end DATE,
  cycle_length INTEGER DEFAULT 28,
  ovulation_date DATE,
  fertile_start DATE,
  fertile_end DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cycles_user_id ON cycles(user_id);

ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cycles"
  ON cycles FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own cycles"
  ON cycles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own cycles"
  ON cycles FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own cycles"
  ON cycles FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Basal temperatures
CREATE TABLE IF NOT EXISTS basal_temperatures (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  cycle_id VARCHAR REFERENCES cycles(id),
  date DATE NOT NULL,
  temperature REAL NOT NULL,
  time VARCHAR,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_temperatures_user_id ON basal_temperatures(user_id);

ALTER TABLE basal_temperatures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own temperatures"
  ON basal_temperatures FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own temperatures"
  ON basal_temperatures FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own temperatures"
  ON basal_temperatures FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own temperatures"
  ON basal_temperatures FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Mucus observations
CREATE TABLE IF NOT EXISTS mucus_observations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  cycle_id VARCHAR REFERENCES cycles(id),
  date DATE NOT NULL,
  consistency VARCHAR,
  amount VARCHAR,
  color VARCHAR,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mucus_user_id ON mucus_observations(user_id);

ALTER TABLE mucus_observations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mucus observations"
  ON mucus_observations FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own mucus observations"
  ON mucus_observations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own mucus observations"
  ON mucus_observations FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own mucus observations"
  ON mucus_observations FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Pregnancies
CREATE TABLE IF NOT EXISTS pregnancies (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  lmp_date DATE,
  due_date DATE,
  conception_date DATE,
  current_week INTEGER,
  current_day INTEGER,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE pregnancies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pregnancies"
  ON pregnancies FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own pregnancies"
  ON pregnancies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own pregnancies"
  ON pregnancies FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Calculations
CREATE TABLE IF NOT EXISTS calculations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  type VARCHAR NOT NULL,
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calculations"
  ON calculations FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own calculations"
  ON calculations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id VARCHAR NOT NULL REFERENCES users(id),
  type VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  action_url VARCHAR,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);
