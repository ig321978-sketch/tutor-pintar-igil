import { after, NextResponse } from "next/server";
import type { Part } from "@google/genai";
import { askTutor } from "@/lib/ask-tutor";
import { siapkanAudioModulPermanen } from "@/lib/audio-modul";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { klaimInteraksiAi, statusKuota } from "@/lib/kuota-interaksi";
import { ambilAtauBuatModul } from "@/lib/susun-modul-tutor";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 120;

type PermintaanTutor = {
  nama?: unknown;
  kelas?: unknown;
  mapel?: unknown;
  materi?: unknown;
  gambar?: unknown;
  ajuan?: unknown;
  pakaiToken?: unknown;
  riwayat?: unknown;
};

function sebagaiYa(nilai: unknown): boolean {
  return nilai === true || nilai === "true" || nilai === 1;
}

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const nama = sebagaiTeks(url.searchParams.get("nama"), "Siswa");
  const kelas = sebagaiTeks(url.searchParams.get("kelas"), "SD");
  const kuota = await statusKuota(nama, kelas);
  return NextResponse.json({ berhasil: true, kuota });
}

export async function POST(req: Request) {
  try {
    let body: PermintaanTutor;
    try {
      body = (await req.json()) as PermintaanTutor;
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
    const daftarGambar = ekstrakDaftarGambar(body.gambar);

    if (ajuan) {
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

      const dataAjuan = await askTutor({
        nama,
        kelas,
        mapel,
        materi,
        ajuan,
        gambar: daftarGambar,
        riwayat: body.riwayat,
      });

      return NextResponse.json({
        berhasil: true,
        mode: "ajuan",
        data: dataAjuan,
        kuota: klaim.kuota,
      });
    }

    const hasil = await ambilAtauBuatModul({
      nama,
      kelas,
      mapel,
      materi,
      gambar: daftarGambar,
    });

    if (!hasil.dariCache && daftarGambar.length === 0) {
      after(() => {
        void siapkanAudioModulPermanen({
          kelas,
          mapel,
          materi,
          curriculum_view: hasil.data.curriculum_view,
          global_best_view: hasil.data.global_best_view,
        });
      });
    }

    return NextResponse.json({
      berhasil: true,
      dariCache: hasil.dariCache,
      topicId: hasil.topicId,
      tersimpan: hasil.dariCache,
      data: hasil.data,
    });
  } catch (error: unknown) {
    console.error("EROR SISTEM:", error);
    const pesan = pesanGalatGemini(error);
    const timeout = /waktu lebih lama|TIMEOUT_GEMINI|timeout/i.test(pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: timeout ? 504 : 500 },
    );
  }
}
