import { NextResponse } from "next/server";
import type { Part } from "@google/genai";
import {
  ambilCacheMateriUntukSiswa,
  adalahGalatMateriTerkunci,
  materiSedangTerkunci,
  pastikanNaskahResmiTerkunci,
  topicIdMateri,
} from "@/lib/cache-materi-tutor";
import { responsMateriTerkunci } from "@/lib/respons-materi-terkunci";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { pecahBankSoal } from "@/lib/kuis";
import {
  ambilAtauBuatModul,
  bentukModulTutor,
  getModule,
} from "@/lib/susun-modul-tutor";
import { responsJikaBukanAdmin } from "@/lib/supabase-auth";
import { naskahResmiJikaAda } from "@/lib/naskah-resmi";
import { tolakPublikSelainPai1 } from "@/lib/tolak-publik-selain-pai1";
import { permintaanDibatalkan } from "@/lib/validasi-naskah-ai";
import { jenjangGuru } from "@/lib/guru";
import { naskahKartuSdLayak } from "@/lib/naskah-kartu-sd";

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
  const ditolakPublik = await tolakPublikSelainPai1(kelas, mapel, materi);
  if (ditolakPublik) return ditolakPublik;
  const resmi = naskahResmiJikaAda(kelas, mapel, materi);
  if (resmi) {
    await pastikanNaskahResmiTerkunci(kelas, mapel, materi);
    return NextResponse.json(
      {
        berhasil: true,
        ada: true,
        adaKurikulum: true,
        adaGlobal: true,
        adaLatihan: true,
        dariCache: true,
        isLocked: true,
        topicId: topicIdMateri(kelas, mapel, materi),
        data: bentukModulTutor(nama, resmi, { mapel, materi }),
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
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
  const sd = jenjangGuru(kelas) === "SD" && !resmi;
  const kurikulumMentah = cache?.curriculum_view?.trim() ?? "";
  const globalMentah = cache?.global_best_view?.trim() ?? "";
  const adaKurikulum =
    Boolean(kurikulumMentah) &&
    (!sd || terkunci || naskahKartuSdLayak(kurikulumMentah));
  const adaGlobal =
    Boolean(globalMentah) &&
    (!sd || terkunci || naskahKartuSdLayak(globalMentah));
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
      data: bentukModulTutor(
        nama,
        {
          ...cache,
          curriculum_view: adaKurikulum ? cache.curriculum_view : "",
          global_best_view: adaGlobal ? cache.global_best_view : "",
        },
        { mapel, materi },
      ),
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
    const ditolakPublik = await tolakPublikSelainPai1(kelas, mapel, materi);
    if (ditolakPublik) return ditolakPublik;

    if (req.signal.aborted) {
      return NextResponse.json(
        { berhasil: false, pesan: "Permintaan dibatalkan." },
        { status: 500 },
      );
    }

    const resmi = naskahResmiJikaAda(kelas, mapel, materi);
    if (resmi) {
      await pastikanNaskahResmiTerkunci(kelas, mapel, materi);
      return NextResponse.json({
        berhasil: true,
        dariCache: true,
        isLocked: true,
        topicId: topicIdMateri(kelas, mapel, materi),
        data: bentukModulTutor(nama, resmi, { mapel, materi }),
      });
    }

    if (await materiSedangTerkunci(kelas, mapel, materi)) {
      return responsMateriTerkunci();
    }

    const forceRegenerate = body.forceRegenerate === true;
    if (forceRegenerate) {
      const ditolak = await responsJikaBukanAdmin();
      if (ditolak) return ditolak;
    }

    const hasil = await ambilAtauBuatModul({
      nama,
      kelas,
      mapel,
      materi,
      gambar,
      signal: req.signal,
      forceRegenerate,
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
