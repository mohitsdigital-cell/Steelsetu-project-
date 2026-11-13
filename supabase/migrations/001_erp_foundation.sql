-- STEELSETU ERP FOUNDATION (E0) — multi-tenant core
-- Run in Supabase SQL Editor after creating the project.

create table public.orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  gstin text,
  address text,
  city text default 'Kolkata',
  state text default 'West Bengal',
  logo_url text,
  created_at timestamptz default now()
);

create table public.org_members (
  org_id uuid references public.orgs(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','manager','staff')),
  created_at timestamptz default now(),
  primary key (org_id, user_id)
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  name text not null,
  gstin text,
  phone text,
  email text,
  address text,
  credit_limit numeric default 0,
  payment_terms_days int default 0,
  created_at timestamptz default now()
);

create table public.suppliers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  name text not null,
  gstin text,
  phone text,
  email text,
  address text,
  credit_terms_days int default 0,
  created_at timestamptz default now()
);

-- Bank details: separate, restricted to owner/manager (blueprint 5.3)
create table public.supplier_bank_details (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  bank_name text, account_name text,
  account_no_enc text, ifsc text,
  created_at timestamptz default now()
);

create table public.items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  name text not null,
  sku text,
  category text,
  unit text default 'MT',
  hsn_code text,
  created_at timestamptz default now()
);

-- Helper: current user's org ids
create or replace function public.my_orgs() returns setof uuid
language sql security definer stable as $$
  select org_id from public.org_members where user_id = auth.uid();
$$;

-- RLS: tenant isolation enforced at DB level
alter table public.orgs enable row level security;
alter table public.org_members enable row level security;
alter table public.customers enable row level security;
alter table public.suppliers enable row level security;
alter table public.supplier_bank_details enable row level security;
alter table public.items enable row level security;

create policy "org read" on public.orgs for select
  using (id in (select public.my_orgs()));

create policy "member read" on public.org_members for select
  using (user_id = auth.uid() or org_id in (select public.my_orgs()));

create policy "customer rw" on public.customers for all
  using (org_id in (select public.my_orgs()))
  with check (org_id in (select public.my_orgs()));

create policy "supplier rw" on public.suppliers for all
  using (org_id in (select public.my_orgs()))
  with check (org_id in (select public.my_orgs()));

-- Bank details: only owner/manager of the org
create policy "bank owner-only" on public.supplier_bank_details for all
  using (org_id in (
    select org_id from public.org_members
    where user_id = auth.uid() and role in ('owner','manager')))
  with check (org_id in (
    select org_id from public.org_members
    where user_id = auth.uid() and role in ('owner','manager')));

create policy "items rw" on public.items for all
  using (org_id in (select public.my_orgs()))
  with check (org_id in (select public.my_orgs()));
