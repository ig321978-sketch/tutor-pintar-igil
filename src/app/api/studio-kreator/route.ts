import { NextResponse } from "next/server";
import { muatDaftarStudio } from "@/lib/studio-kreator-data";
import { responsJikaBukanAdmin } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TANPA_CACHE = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET() {
  const ditolak = await responsJikaBukanAdmin();
  if (ditolak) return ditolak;
  const hasil = await muatDaftarStudio();
  return NextResponse.json(
    {
      berhasil: hasil.siap,
      daftar: hasil.daftar,
      penyimpananSiap: hasil.siap,
      pesan: hasil.pesan,
    },
    { headers: TANPA_CACHE, status: hasil.siap ? 200 : 503 },
  );
}
