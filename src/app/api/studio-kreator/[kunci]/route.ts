import { NextResponse } from "next/server";
import { ambilDetailStudio, hapusStudio, simpanStudio } from "@/lib/studio-kreator-data";
import { isiDariBadanStudio, kunciRuteStudio } from "@/lib/studio-kreator";
import { responsJikaBukanAdmin } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TANPA_CACHE = { "Cache-Control": "no-store, max-age=0" };

function kunciWajib() {
  return NextResponse.json(
    { berhasil: false, pesan: "Kunci modul wajib diisi." },
    { status: 400, headers: TANPA_CACHE },
  );
}

function terkunci() {
  return NextResponse.json(
    { berhasil: false, terkunci: true, pesan: "Naskah terkunci. Buka gembok dulu." },
    { status: 423, headers: TANPA_CACHE },
  );
}

export async function GET(
  _req: Request,
  konteks: { params: Promise<{ kunci: string }> },
) {
  const ditolak = await responsJikaBukanAdmin();
  if (ditolak) return ditolak;
  const kunci = await kunciRuteStudio(konteks.params);
  if (!kunci) return kunciWajib();
  const data = await ambilDetailStudio(kunci);
  if (!data) {
    return NextResponse.json(
      { berhasil: false, pesan: "Cache modul tidak ditemukan." },
      { status: 404, headers: TANPA_CACHE },
    );
  }
  return NextResponse.json({ berhasil: true, data }, { headers: TANPA_CACHE });
}

export async function PATCH(
  req: Request,
  konteks: { params: Promise<{ kunci: string }> },
) {
  const ditolak = await responsJikaBukanAdmin();
  if (ditolak) return ditolak;
  const kunci = await kunciRuteStudio(konteks.params);
  if (!kunci) return kunciWajib();
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { berhasil: false, pesan: "Request JSON tidak valid." },
      { status: 400, headers: TANPA_CACHE },
    );
  }
  const isi = isiDariBadanStudio(body);
  if (!isi.curriculum_view.trim() && !isi.global_best_view.trim()) {
    return NextResponse.json(
      { berhasil: false, pesan: "Naskah tidak boleh kosong." },
      { status: 400, headers: TANPA_CACHE },
    );
  }
  const hasil = await simpanStudio(kunci, body);
  if (hasil.terkunci) return terkunci();
  if (!hasil.data) {
    return NextResponse.json(
      { berhasil: false, pesan: "Gagal menyimpan perubahan ke cache modul." },
      { status: 500, headers: TANPA_CACHE },
    );
  }
  return NextResponse.json({ berhasil: true, data: hasil.data, dariAi: false }, { headers: TANPA_CACHE });
}

export async function DELETE(
  _req: Request,
  konteks: { params: Promise<{ kunci: string }> },
) {
  const ditolak = await responsJikaBukanAdmin();
  if (ditolak) return ditolak;
  const kunci = await kunciRuteStudio(konteks.params);
  if (!kunci) return kunciWajib();
  const hasil = await hapusStudio(kunci);
  if (hasil === "terkunci") return terkunci();
  if (hasil === "tiada") {
    return NextResponse.json(
      { berhasil: false, pesan: "Cache modul tidak ditemukan." },
      { status: 404, headers: TANPA_CACHE },
    );
  }
  if (hasil === "gagal") {
    return NextResponse.json(
      { berhasil: false, pesan: "Gagal menghapus cache modul." },
      { status: 500, headers: TANPA_CACHE },
    );
  }
  return NextResponse.json({ berhasil: true, terhapus: true }, { headers: TANPA_CACHE });
}
