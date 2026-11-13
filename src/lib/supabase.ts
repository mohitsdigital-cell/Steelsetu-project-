import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);

export type Org = {
  id: string;
  name: string;
  legal_name: string | null;
  gstin: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  logo_url: string | null;
};

export type OrgRole = "owner" | "manager" | "staff";
