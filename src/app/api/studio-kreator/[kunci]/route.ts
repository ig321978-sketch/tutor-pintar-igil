import { NextResponse } from "next/server";
import {
  ambilDetailCacheMateri,
  perbaruiCacheMateri,
} from "@/lib/cache-materi-tutor";
import { isiDariBadanStudio, kunciRuteStudio } from "@/lib/studio-kreator";

export async function GET(
  _req: Request,
  konteks: { params: Promise<{ kunci: string }> | { kunci: string } },
) {
  const kunci = await kunciRuteStudio(konteks.params);
  if (!kunci) {
    return NextResponse.json(
      { berhasil: false, pesan: "Kunci modul wajib diisi." },
      { status: 400 },
    );
  }
  const data = await ambilDetailCacheMateri(kunci);
  if (!data) {
    return NextResponse.json(
      { berhasil: false, pesan: "Cache modul tidak ditemukan." },
      { status: 404 },
    );
  }
  return NextResponse.json({ berhasil: true, data });
}

export async function PATCH(
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

  const isi = isiDariBadanStudio(body);
  if (!isi.curriculum_view.trim() || !isi.global_best_view.trim()) {
    return NextResponse.json(
      {
        berhasil: false,
        pesan: "Kurikulum Sekolah dan Cara Jenius tidak boleh kosong.",
      },
      { status: 400 },
    );
  }

  const data = await perbaruiCacheMateri(kunci, isi);
  if (!data) {
    return NextResponse.json(
      { berhasil: false, pesan: "Gagal menyimpan perubahan ke cache modul." },
      { status: 500 },
    );
  }
  return NextResponse.json({ berhasil: true, data, dariAi: false });
}
