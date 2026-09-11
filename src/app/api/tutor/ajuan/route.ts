import { NextResponse } from "next/server";
import type { Part } from "@google/genai";
import { askTutor } from "@/lib/ask-tutor";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { klaimInteraksiAi } from "@/lib/kuota-interaksi";
import { tolakPublikSelainPai1 } from "@/lib/tolak-publik-selain-pai1";

export const maxDuration = 30;

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function sebagaiYa(nilai: unknown): boolean {
  return nilai === true || nilai === "true" || nilai === 1;
}

function ekstrakGambar(gambar: unknown): Part | null {
  if (typeof gambar !== "string" || gambar.length < 32) return null;
  const cocok = gambar.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!cocok) return null;
  return { inlineData: { mimeType: cocok[1], data: cocok[2] } };
}

function ekstrakDaftarGambar(gambar: unknown): Part[] {
  const daftar = Array.isArray(gambar) ? gambar : gambar ? [gambar] : [];
  return daftar
    .map((item) => ekstrakGambar(item))
    .filter((item): item is Part => item !== null);
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
    const kelas = sebagaiTeks(body.kelas, "SD");
    const mapel = sebagaiTeks(body.mapel, "Umum");
    const materi = sebagaiTeks(body.materi, "Materi hari ini");
    const ajuan = sebagaiTeks(body.ajuan);
    const ditolakPublik = await tolakPublikSelainPai1(kelas, mapel, materi);
    if (ditolakPublik) return ditolakPublik;
    if (!ajuan) {
      return NextResponse.json(
        { berhasil: false, pesan: "Pertanyaan siswa kosong." },
        { status: 400 },
      );
    }

    const klaim = await klaimInteraksiAi({
      nama,
      kelas,
      pakaiToken: sebagaiYa(body.pakaiToken),
    });
    if (!klaim.ok) {
      return NextResponse.json(
        {
          berhasil: false,
          kode: klaim.kode,
          pesan: klaim.pesan,
          kuota: klaim.kuota,
        },
        { status: 429 },
      );
    }

    const data = await askTutor({
      nama,
      kelas,
      mapel,
      materi,
      ajuan,
      gambar: ekstrakDaftarGambar(body.gambar),
      riwayat: body.riwayat,
    });

    return NextResponse.json({
      berhasil: true,
      mode: "ajuan",
      data,
      kuota: klaim.kuota,
    });
  } catch (error: unknown) {
    console.error("AJUAN:", error);
    const pesan = pesanGalatGemini(error);
    const timeout = /waktu lebih lama|TIMEOUT_GEMINI|timeout/i.test(pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: timeout ? 504 : 500 },
    );
  }
}
