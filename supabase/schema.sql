-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  username text unique,
  is_pro boolean default false,
  instagram_handle text,
  created_at timestamptz default now()
);

-- Pages table
create table public.pages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  template_id text default 'streetwear' not null,
  title text,
  bio text,
  avatar_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Links table
create table public.links (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references public.pages(id) on delete cascade not null,
  type text not null default 'url',
  label text not null,
  url text not null,
  position integer not null default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Link clicks table
create table public.link_clicks (
  id uuid default uuid_generate_v4() primary key,
  link_id uuid references public.links(id) on delete cascade not null,
  clicked_at timestamptz default now(),
  device_type text,
  country text
);

-- Products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references public.pages(id) on delete cascade not null,
  name text not null,
  price integer not null,
  description text,
  file_path text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  buyer_email text not null,
  razorpay_payment_id text,
  razorpay_order_id text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Subscriptions table
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  razorpay_sub_id text unique,
  status text default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- RLS Policies
alter table public.users enable row level security;
alter table public.pages enable row level security;
alter table public.links enable row level security;
alter table public.link_clicks enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.subscriptions enable row level security;

-- Users policies
create policy "Users can read own profile" on public.users
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);
create policy "Public can read username" on public.users
  for select using (true);

-- Pages policies
create policy "Users can CRUD own pages" on public.pages
  for all using (auth.uid() = user_id);
create policy "Public can read published pages" on public.pages
  for select using (is_published = true);

-- Links policies
create policy "Users can CRUD own links" on public.links
  for all using (
    exists (select 1 from public.pages where pages.id = links.page_id and pages.user_id = auth.uid())
  );
create policy "Public can read active links on published pages" on public.links
  for select using (
    is_active = true and exists (
      select 1 from public.pages where pages.id = links.page_id and pages.is_published = true
    )
  );

-- Link clicks policies
create policy "Anyone can insert link clicks" on public.link_clicks
  for insert with check (true);
create policy "Users can read own link clicks" on public.link_clicks
  for select using (
    exists (
      select 1 from public.links
      join public.pages on pages.id = links.page_id
      where links.id = link_clicks.link_id and pages.user_id = auth.uid()
    )
  );

-- Products policies
create policy "Users can CRUD own products" on public.products
  for all using (
    exists (select 1 from public.pages where pages.id = products.page_id and pages.user_id = auth.uid())
  );
create policy "Public can read active products on published pages" on public.products
  for select using (
    is_active = true and exists (
      select 1 from public.pages where pages.id = products.page_id and pages.is_published = true
    )
  );

-- Orders policies
create policy "Anyone can insert orders" on public.orders
  for insert with check (true);
create policy "Users can read orders for their products" on public.orders
  for select using (
    exists (
      select 1 from public.products
      join public.pages on pages.id = products.page_id
      where products.id = orders.product_id and pages.user_id = auth.uid()
    )
  );

-- Subscriptions policies
create policy "Users can read own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users insert
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to update pages.updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger pages_updated_at
  before update on public.pages
  for each row execute function public.update_updated_at();
