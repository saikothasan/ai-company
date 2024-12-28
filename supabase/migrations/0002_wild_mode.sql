/*
  # Admin and Features Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (references auth.users)
      - `is_admin` (boolean)
      - `display_name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `post_categories`
      - `id` (bigint, primary key)
      - `name` (text)
      - `slug` (text)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `post_tags`
      - `id` (bigint, primary key)
      - `name` (text)
      - `slug` (text)
      - `created_at` (timestamp)
    
    - `post_categories_posts` (junction table)
      - `post_id` (references posts)
      - `category_id` (references post_categories)
    
    - `post_tags_posts` (junction table)
      - `post_id` (references posts)
      - `tag_id` (references post_tags)

  2. Functions
    - `check_is_admin()`: Checks if the current user is an admin
    - `handle_new_user()`: Creates a user profile when a new user signs up
    - `handle_updated_at()`: Updates the updated_at timestamp

  3. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Add policies for user profile access
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin boolean DEFAULT false,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Categories Table
CREATE TABLE IF NOT EXISTS post_categories (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Tags Table
CREATE TABLE IF NOT EXISTS post_tags (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Junction Tables
CREATE TABLE IF NOT EXISTS post_categories_posts (
  post_id bigint REFERENCES posts(id) ON DELETE CASCADE,
  category_id bigint REFERENCES post_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE IF NOT EXISTS post_tags_posts (
  post_id bigint REFERENCES posts(id) ON DELETE CASCADE,
  tag_id bigint REFERENCES post_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Functions
CREATE OR REPLACE FUNCTION check_is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid()
    AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags_posts ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for post_categories (admin only for write operations)
CREATE POLICY "Anyone can view categories"
  ON post_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert categories"
  ON post_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (check_is_admin());

CREATE POLICY "Only admins can update categories"
  ON post_categories
  FOR UPDATE
  TO authenticated
  USING (check_is_admin());

-- Policies for post_tags (admin only for write operations)
CREATE POLICY "Anyone can view tags"
  ON post_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert tags"
  ON post_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (check_is_admin());

CREATE POLICY "Only admins can update tags"
  ON post_tags
  FOR UPDATE
  TO authenticated
  USING (check_is_admin());

-- Policies for junction tables
CREATE POLICY "Anyone can view post categories"
  ON post_categories_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can manage post categories"
  ON post_categories_posts
  FOR ALL
  TO authenticated
  USING (check_is_admin());

CREATE POLICY "Anyone can view post tags"
  ON post_tags_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can manage post tags"
  ON post_tags_posts
  FOR ALL
  TO authenticated
  USING (check_is_admin());