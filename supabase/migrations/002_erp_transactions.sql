-- 002_erp_transactions.sql — E2: transactions table + khata ledger support
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  txn_type text not null check (txn_type in ('sale','purchase','payment_in','payment_out')),
  customer_id uuid references public.customers(id) on delete set null,
  supplier_id uuid references public.suppliers(id) on delete set null,
  party_name text not null default '',
  item_name text,
  quantity numeric not null default 0,
  unit text not null default 'MT',
  rate numeric not null default 0,
  amount numeric not null default 0,
  txn_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

alter table public.transactions enable row level security;

create policy "txn_select" on public.transactions for select to authenticated
  using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "txn_insert" on public.transactions for insert to authenticated
  with check (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "txn_update" on public.transactions for update to authenticated
  using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "txn_delete" on public.transactions for delete to authenticated
  using (org_id in (select org_id from public.org_members where user_id = auth.uid()));

create index idx_txn_org_date on public.transactions (org_id, txn_date desc);

alter table public.customers add column if not exists phone text;
alter table public.customers add column if not exists city text;
alter table public.customers add column if not exists credit_limit numeric;
alter table public.customers add column if not exists payment_terms text;

alter table public.suppliers add column if not exists phone text;
alter table public.suppliers add column if not exists city text;
alter table public.suppliers add column if not exists credit_limit numeric;
alter table public.suppliers add column if not exists payment_terms text;
