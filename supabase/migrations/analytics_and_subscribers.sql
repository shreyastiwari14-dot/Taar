-- ============================================================
-- Run this in your Supabase SQL editor
-- ============================================================

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamptz DEFAULT now() NOT NULL,
  referrer text,
  referrer_source text, -- 'instagram' | 'youtube' | 'whatsapp' | 'tiktok' | 'twitter' | 'direct' | 'other'
  device_type text,     -- 'mobile' | 'desktop' | 'tablet'
  country text,
  city text
);

CREATE INDEX IF NOT EXISTS page_views_page_id_viewed_at
  ON page_views (page_id, viewed_at DESC);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_views_insert_public" ON page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "page_views_select_owner" ON page_views
  FOR SELECT USING (
    page_id IN (SELECT id FROM pages WHERE user_id = auth.uid())
  );

-- Extend link_clicks with referrer_source
ALTER TABLE link_clicks ADD COLUMN IF NOT EXISTS referrer_source text;
ALTER TABLE link_clicks ADD COLUMN IF NOT EXISTS city text;

-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  page_id uuid REFERENCES pages(id) ON DELETE SET NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  source text DEFAULT 'taar_page'
);

CREATE UNIQUE INDEX IF NOT EXISTS subscribers_creator_email
  ON subscribers (creator_user_id, email);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscribers_creator_read" ON subscribers
  FOR SELECT USING (creator_user_id = auth.uid());

CREATE POLICY "subscribers_public_insert" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Email capture settings on pages table
ALTER TABLE pages ADD COLUMN IF NOT EXISTS email_capture_enabled boolean DEFAULT false;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS email_capture_headline text DEFAULT 'Join my inner circle';
ALTER TABLE pages ADD COLUMN IF NOT EXISTS email_capture_subtext text DEFAULT 'Get exclusive content, early access & updates';
ALTER TABLE pages ADD COLUMN IF NOT EXISTS email_capture_btn_text text DEFAULT 'Subscribe Free';

-- Instagram reels on pages
ALTER TABLE pages ADD COLUMN IF NOT EXISTS instagram_handle text;
