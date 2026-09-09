import { NextResponse } from "next/server";
import { aturKunciNaskahMateri } from "@/lib/cache-materi-tutor";
import { kunciRuteStudio } from "@/lib/studio-kreator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(
  req: Request,
  konteks: { params: Promise<{ kunci: string }> | { kunci: string } },
) {
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
    body.is_locked === true ||
    body.terkunci === true ||
    body.isLocked === true;

  const data = await aturKunciNaskahMateri(kunci, terkunci);
  if (!data) {
    return NextResponse.json(
      {
        berhasil: false,
        pesan:
          "Gagal mengubah status kunci. Pastikan kolom is_locked sudah ditambahkan di Supabase.",
      },
      { status: 500 },
    );
  }
  return NextResponse.json({
    berhasil: true,
    data,
    isLocked: data.isLocked,
  });
}
