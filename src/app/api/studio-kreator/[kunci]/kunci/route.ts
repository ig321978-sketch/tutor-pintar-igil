import { NextResponse } from "next/server";
import { aturKunciStudio } from "@/lib/studio-kreator-data";
import { kunciRuteStudio } from "@/lib/studio-kreator";
import { responsJikaBukanAdmin } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(
  req: Request,
  konteks: { params: Promise<{ kunci: string }> },
) {
  const ditolak = await responsJikaBukanAdmin();
  if (ditolak) return ditolak;
  const kunci = await kunciRuteStudio(konteks.params);
  if (!kunci) {
    return NextResponse.json(
      { berhasil: false, pesan: "Kunci modul wajib diisi." },
      { status: 400 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { berhasil: false, pesan: "Request JSON tidak valid." },
      { status: 400 },
    );
  }

  const terkunci =
    body.is_locked === true || body.terkunci === true || body.isLocked === true;
  const data = await aturKunciStudio(kunci, terkunci);
  if (!data) {
    return NextResponse.json(
      { berhasil: false, pesan: "Gagal mengubah status kunci naskah." },
      { status: 500 },
    );
  }
  return NextResponse.json({ berhasil: true, data });
}
