import { NextResponse } from "next/server";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { generateUjianAcak } from "@/lib/susun-modul-tutor";
import { tolakPublikSelainPai1 } from "@/lib/tolak-publik-selain-pai1";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 60;

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { berhasil: false, pesan: "Request JSON tidak valid." },
        { status: 400 },
      );
    }

    const nama = sebagaiTeks(body.nama, "Siswa");
    const kelas = sebagaiTeks(body.kelas);
    const mapel = sebagaiTeks(body.mapel);
    const materi = sebagaiTeks(body.materi);
    if (!kelas || !mapel || !materi) {
      return NextResponse.json(
        { berhasil: false, pesan: "kelas, mapel, dan materi wajib diisi." },
        { status: 400 },
      );
    }
    const ditolakPublik = await tolakPublikSelainPai1(kelas, mapel, materi);
    if (ditolakPublik) return ditolakPublik;

    const soal = await generateUjianAcak({ nama, kelas, mapel, materi });
    return NextResponse.json({
      berhasil: true,
      dariCache: false,
      soal,
    });
  } catch (error: unknown) {
    const pesan = pesanGalatGemini(error);
    const timeout = /waktu lebih lama|TIMEOUT_GEMINI|timeout/i.test(pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: timeout ? 504 : 500 },
    );
  }
}
