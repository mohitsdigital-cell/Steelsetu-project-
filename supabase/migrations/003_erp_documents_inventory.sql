-- 003: E4 documents chain + E5 inventory (already applied live via MCP — keep for history)
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  doc_type text not null check (doc_type in ('enquiry','quotation','sale_order','challan','tax_invoice','purchase_order')),
  doc_no text not null,
  party_type text not null check (party_type in ('customer','supplier')),
  customer_id uuid references public.customers(id) on delete set null,
  supplier_id uuid references public.suppliers(id) on delete set null,
  party_name text not null default '',
  doc_date date not null default current_date,
  valid_until date,
  status text not null default 'draft' check (status in ('draft','sent','confirmed','delivered','cancelled')),
  subtotal numeric not null default 0,
  cgst numeric not null default 0,
  sgst numeric not null default 0,
  total numeric not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  unique (org_id, doc_type, doc_no)
);
alter table public.documents enable row level security;
create policy "doc_select" on public.documents for select to authenticated using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "doc_insert" on public.documents for insert to authenticated with check (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "doc_update" on public.documents for update to authenticated using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "doc_delete" on public.documents for delete to authenticated using (org_id in (select org_id from public.org_members where user_id = auth.uid()));

create table public.document_items (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  item_name text not null,
  quantity numeric not null default 0,
  unit text not null default 'MT',
  rate numeric not null default 0,
  amount numeric not null default 0,
  sort_no int not null default 0
);
alter table public.document_items enable row level security;
create policy "docitem_select" on public.document_items for select to authenticated using (document_id in (select id from public.documents where org_id in (select org_id from public.org_members where user_id = auth.uid())));
create policy "docitem_insert" on public.document_items for insert to authenticated with check (document_id in (select id from public.documents where org_id in (select org_id from public.org_members where user_id = auth.uid())));
create policy "docitem_update" on public.document_items for update to authenticated using (document_id in (select id from public.documents where org_id in (select org_id from public.org_members where user_id = auth.uid())));
create policy "docitem_delete" on public.document_items for delete to authenticated using (document_id in (select id from public.documents where org_id in (select org_id from public.org_members where user_id = auth.uid())));

create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs(id) on delete cascade,
  item_name text not null,
  brand text,
  grade text,
  unit text not null default 'MT',
  in_qty numeric not null default 0,
  out_qty numeric not null default 0,
  reorder_level numeric not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  unique (org_id, item_name, unit)
);
alter table public.inventory enable row level security;
create policy "inv_select" on public.inventory for select to authenticated using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "inv_insert" on public.inventory for insert to authenticated with check (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "inv_update" on public.inventory for update to authenticated using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
create policy "inv_delete" on public.inventory for delete to authenticated using (org_id in (select org_id from public.org_members where user_id = auth.uid()));
