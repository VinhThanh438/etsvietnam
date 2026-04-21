-- ═══════════════════════════════════════════════════════════════════════════
-- ETS Vietnam – Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Enable UUID extension ─────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── projects ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          TEXT        PRIMARY KEY,
  slug        TEXT        UNIQUE NOT NULL,
  title       TEXT        NOT NULL DEFAULT '',
  location    TEXT        NOT NULL DEFAULT '',
  category    TEXT        NOT NULL DEFAULT '',
  featured    BOOLEAN     NOT NULL DEFAULT false,
  data        JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug     ON projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects (featured);

-- ── news ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news (
  id           TEXT        PRIMARY KEY,
  slug         TEXT        UNIQUE NOT NULL,
  title        TEXT        NOT NULL DEFAULT '',
  category     TEXT        NOT NULL DEFAULT '',
  featured     BOOLEAN     NOT NULL DEFAULT false,
  published_at TEXT        NOT NULL DEFAULT '',
  data         JSONB       NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_slug        ON news (slug);
CREATE INDEX IF NOT EXISTS idx_news_category    ON news (category);
CREATE INDEX IF NOT EXISTS idx_news_featured    ON news (featured);
CREATE INDEX IF NOT EXISTS idx_news_published   ON news (published_at DESC);

-- ── services ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id         TEXT        PRIMARY KEY,
  slug       TEXT        UNIQUE NOT NULL,
  title      TEXT        NOT NULL DEFAULT '',
  data       JSONB       NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services (slug);

-- ── partners ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id         TEXT        PRIMARY KEY,
  name       TEXT        NOT NULL DEFAULT '',
  logo       TEXT        NOT NULL DEFAULT '',
  website    TEXT        NOT NULL DEFAULT '#',
  sort_order INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── site_config ───────────────────────────────────────────────────────────
-- Single row (id = 'main') stores the entire site configuration as JSONB.
CREATE TABLE IF NOT EXISTS site_config (
  id         TEXT        PRIMARY KEY,   -- always 'main'
  data       JSONB       NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── contacts ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL DEFAULT '',
  phone        TEXT        NOT NULL DEFAULT '',
  service      TEXT        NOT NULL DEFAULT '',
  message      TEXT        NOT NULL DEFAULT '',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read         BOOLEAN     NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_contacts_submitted ON contacts (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read      ON contacts (read);

-- ── analytics ─────────────────────────────────────────────────────────────
-- Single row (id = 'main') for aggregate counters.
CREATE TABLE IF NOT EXISTS analytics (
  id           TEXT    PRIMARY KEY,   -- always 'main'
  pageviews    BIGINT  NOT NULL DEFAULT 0,
  seo_traffic  BIGINT  NOT NULL DEFAULT 0,
  events       BIGINT  NOT NULL DEFAULT 0,
  last_updated TEXT    NOT NULL DEFAULT ''
);

-- Seed the analytics row so upsert always works
INSERT INTO analytics (id, pageviews, seo_traffic, events, last_updated)
VALUES ('main', 0, 0, 0, '')
ON CONFLICT (id) DO NOTHING;

-- ── updated_at trigger ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['projects', 'news', 'services', 'site_config'] LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated_at
       BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION update_updated_at();',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- ── Atomic increment RPC (used by analytics track endpoint) ───────────────
CREATE OR REPLACE FUNCTION increment_analytics(field_name TEXT)
RETURNS VOID AS $$
BEGIN
  IF field_name = 'pageviews' THEN
    UPDATE analytics SET pageviews = pageviews + 1, last_updated = NOW()::TEXT WHERE id = 'main';
  ELSIF field_name = 'seo_traffic' THEN
    UPDATE analytics SET seo_traffic = seo_traffic + 1, last_updated = NOW()::TEXT WHERE id = 'main';
  ELSIF field_name = 'events' THEN
    UPDATE analytics SET events = events + 1, last_updated = NOW()::TEXT WHERE id = 'main';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Row Level Security (RLS) ──────────────────────────────────────────────
-- Public reads are allowed for content tables.
-- Writes always go through the Service Role key (SUPABASE_SERVICE_ROLE_KEY),
-- which bypasses RLS — so no INSERT/UPDATE/DELETE policies are needed for now.

ALTER TABLE projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE news        ENABLE ROW LEVEL SECURITY;
ALTER TABLE services    ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners    ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics   ENABLE ROW LEVEL SECURITY;

-- Allow anon (public) to SELECT from content tables
CREATE POLICY "Public read projects"    ON projects    FOR SELECT USING (true);
CREATE POLICY "Public read news"        ON news        FOR SELECT USING (true);
CREATE POLICY "Public read services"    ON services    FOR SELECT USING (true);
CREATE POLICY "Public read partners"    ON partners    FOR SELECT USING (true);
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
-- analytics: only allow reads via service role (admin dashboard)
-- contacts: no public read — admin only via service role
