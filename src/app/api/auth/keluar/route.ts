import { NextResponse } from "next/server";
import { supabaseAuthServer } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const supabase = await supabaseAuthServer();
  if (supabase) {
    await supabase.auth.signOut();
  }
  return NextResponse.json({ berhasil: true });
}
