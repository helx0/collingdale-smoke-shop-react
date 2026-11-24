create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  sort_order int default 0,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text,
  image_url text,
  price numeric(10,2),
  status text not null default 'draft' check (status in ('draft','confirmed','published','hidden')),
  approved_by_owner boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.store_settings (
  id int primary key default 1,
  business_name text not null,
  phone text,
  address text,
  maps_url text,
  hours jsonb,
  social_links jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  alt_text text,
  status text not null default 'draft' check (status in ('draft','published','hidden')),
  approved_by_owner boolean not null default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.store_settings enable row level security;
alter table public.gallery_items enable row level security;
alter table public.inquiries enable row level security;

create policy "public can read published categories" on public.categories for select using (is_published = true);
create policy "public can read published products" on public.products for select using (status = 'published' and approved_by_owner = true);
create policy "public can read store settings" on public.store_settings for select using (true);
create policy "public can read published gallery" on public.gallery_items for select using (status = 'published' and approved_by_owner = true);
create policy "public can submit inquiries" on public.inquiries for insert with check (true);
