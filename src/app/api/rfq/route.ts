import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contact_name, contact_phone, requirement, matched_slugs } = body;

if (!contact_name || !contact_phone || !requirement) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

const { error } = await supabase.from("rfq_submissions").insert({
      contact_name: String(contact_name).slice(0, 120),
      contact_phone: String(contact_phone).slice(0, 20),
      requirement,
      matched_slugs: Array.isArray(matched_slugs) ? matched_slugs : [],
    });

if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
