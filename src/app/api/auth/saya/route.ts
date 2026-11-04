import { NextResponse } from "next/server";
import { sesiPenggunaSaatIni } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const sesi = await sesiPenggunaSaatIni();
  return NextResponse.json({
    berhasil: true,
    masuk: Boolean(sesi.user),
    id: sesi.user?.id ?? null,
    peran: sesi.peran,
    adalahAdmin: sesi.adalahAdmin,
  });
}
