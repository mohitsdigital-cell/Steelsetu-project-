-- 004: E7 org billing profile columns (applied live via MCP — for history)
alter table public.orgs add column if not exists gstin text;
alter table public.orgs add column if not exists address text;
alter table public.orgs add column if not exists city text;
alter table public.orgs add column if not exists state text;
alter table public.orgs add column if not exists pincode text;
alter table public.orgs add column if not exists phone text;
alter table public.orgs add column if not exists email text;
alter table public.orgs add column if not exists bank_name text;
alter table public.orgs add column if not exists bank_account text;
alter table public.orgs add column if not exists bank_ifsc text;
