-- =============================================================
-- 02Ship Membership Schema
-- Tables: profiles, lesson_progress, bookmarks
-- =============================================================

-- Helper: auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================================
-- 1. profiles
-- =============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_path text,
  bio text,
  skills text[] not null default '{}',
  building text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================
-- 2. lesson_progress
-- =============================================================
create table public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  series_slug text not null check (series_slug <> ''),
  lesson_slug text not null check (lesson_slug <> ''),
  is_completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, series_slug, lesson_slug)
);

create index idx_lesson_progress_series
  on public.lesson_progress (user_id, series_slug);

alter table public.lesson_progress enable row level security;

create policy "Users can read own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

create trigger set_lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

-- =============================================================
-- 3. bookmarks
-- =============================================================
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null check (content_type in ('series', 'lesson', 'blog', 'news')),
  content_slug text not null check (content_slug <> ''),
  parent_slug text not null default '',
  created_at timestamptz not null default now()
);

create unique index idx_bookmarks_unique
  on public.bookmarks (user_id, content_type, content_slug, parent_slug);

create index idx_bookmarks_user_created
  on public.bookmarks (user_id, created_at desc);

alter table public.bookmarks enable row level security;

create policy "Users can read own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);
