import { NextResponse } from "next/server";
import type { Part } from "@google/genai";
import {
  ambilCacheMateriUntukSiswa,
  adalahGalatMateriTerkunci,
  materiSedangTerkunci,
  topicIdMateri,
} from "@/lib/cache-materi-tutor";
import { responsMateriTerkunci } from "@/lib/respons-materi-terkunci";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { pecahBankSoal } from "@/lib/kuis";
import { naskahMateriSiap } from "@/lib/sudut-pandang";
import {
  ambilAtauBuatModul,
  bentukModulTutor,
  getModule,
} from "@/lib/susun-modul-tutor";
import { permintaanDibatalkan } from "@/lib/validasi-naskah-ai";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 180;

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
  const kelas = sebagaiTeks(url.searchParams.get("kelas"));
  const mapel = sebagaiTeks(url.searchParams.get("mapel"));
  const materi = sebagaiTeks(url.searchParams.get("materi"));
  const nama = sebagaiTeks(url.searchParams.get("nama"), "Siswa");
  if (!kelas || !mapel || !materi) {
    return NextResponse.json(
      { berhasil: false, pesan: "kelas, mapel, dan materi wajib diisi." },
      { status: 400 },
    );
  }
  const terkunci = await materiSedangTerkunci(kelas, mapel, materi);
  const cache = terkunci
    ? await ambilCacheMateriUntukSiswa(kelas, mapel, materi)
    : await getModule(kelas, mapel, materi);
  const headerCache = terkunci
    ? {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      }
    : {
        "Cache-Control": "no-store, max-age=0",
      };
  const adaKurikulum = naskahMateriSiap(cache?.curriculum_view);
  const adaGlobal = naskahMateriSiap(cache?.global_best_view);
  const adaLatihan = pecahBankSoal(cache?.pertanyaan ?? "").pilihanGanda.length >= 4;
  if (!cache || (!adaKurikulum && !adaGlobal && !adaLatihan)) {
    return NextResponse.json(
      {
        berhasil: true,
        ada: false,
        adaKurikulum: false,
        adaGlobal: false,
        adaLatihan: false,
        topicId: topicIdMateri(kelas, mapel, materi),
        isLocked: terkunci,
      },
      {
        headers: headerCache,
      },
    );
  }
  return NextResponse.json(
    {
      berhasil: true,
      ada: true,
      adaKurikulum,
      adaGlobal,
      adaLatihan,
      dariCache: true,
      isLocked: terkunci,
      topicId: topicIdMateri(kelas, mapel, materi),
      data: bentukModulTutor(nama, cache, { mapel, materi }),
    },
    {
      headers: headerCache,
    },
  );
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
    const gambar = ekstrakDaftarGambar(body.gambar);

    if (req.signal.aborted) {
      return NextResponse.json(
        { berhasil: false, pesan: "Permintaan dibatalkan." },
        { status: 500 },
      );
    }

    if (await materiSedangTerkunci(kelas, mapel, materi)) {
      return responsMateriTerkunci();
    }

    const hasil = await ambilAtauBuatModul({
      nama,
      kelas,
      mapel,
      materi,
      gambar,
      signal: req.signal,
    });

    return NextResponse.json({
      berhasil: true,
      dariCache: hasil.dariCache,
      topicId: hasil.topicId,
      data: hasil.data,
    });
  } catch (error: unknown) {
    if (adalahGalatMateriTerkunci(error)) {
      return responsMateriTerkunci();
    }
    if (permintaanDibatalkan(error) || req.signal.aborted) {
      return NextResponse.json(
        { berhasil: false, pesan: "Permintaan dibatalkan." },
        { status: 500 },
      );
    }
    console.error("MODUL:", error);
    const pesan = pesanGalatGemini(error);
    const timeout = /waktu lebih lama|TIMEOUT_GEMINI|timeout/i.test(pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: timeout ? 504 : 500 },
    );
  }
}
