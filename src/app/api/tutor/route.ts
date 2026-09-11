import { NextResponse } from "next/server";
import type { Part } from "@google/genai";
import { askTutor } from "@/lib/ask-tutor";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { klaimInteraksiAi, statusKuota } from "@/lib/kuota-interaksi";
import {
  ambilCacheMateriUntukSiswa,
  adalahGalatMateriTerkunci,
  materiSedangTerkunci,
  pastikanNaskahResmiTerkunci,
  topicIdMateri,
} from "@/lib/cache-materi-tutor";
import { responsMateriTerkunci } from "@/lib/respons-materi-terkunci";
import {
  ambilAtauBuatBagianModul,
  bentukModulTutor,
  cachePunyaBagian,
} from "@/lib/susun-modul-tutor";
import { naskahResmiJikaAda } from "@/lib/naskah-resmi";
import { tolakPublikSelainPai1 } from "@/lib/tolak-publik-selain-pai1";
import { permintaanDibatalkan } from "@/lib/validasi-naskah-ai";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 180;

type PermintaanTutor = {
  nama?: unknown;
  kelas?: unknown;
  mapel?: unknown;
  materi?: unknown;
  gambar?: unknown;
  ajuan?: unknown;
  pakaiToken?: unknown;
  riwayat?: unknown;
  bagian?: unknown;
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
    const ditolakPublik = await tolakPublikSelainPai1(kelas, mapel, materi);
    if (ditolakPublik) return ditolakPublik;

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

    const bagian = sebagaiTeks(body.bagian);
    if (bagian !== "kurikulum" && bagian !== "global" && bagian !== "latihan") {
      return NextResponse.json(
        {
          berhasil: false,
          pesan: "Pilih bagian naskah: kurikulum, global, atau latihan.",
        },
        { status: 400 },
      );
    }

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
        tersimpan: true,
        data: bentukModulTutor(nama, resmi, { mapel, materi }),
      });
    }

    if (await materiSedangTerkunci(kelas, mapel, materi)) {
      const cache = await ambilCacheMateriUntukSiswa(kelas, mapel, materi);
      if (cache && cachePunyaBagian(cache, bagian, kelas)) {
        return NextResponse.json({
          berhasil: true,
          dariCache: true,
          isLocked: true,
          topicId: topicIdMateri(kelas, mapel, materi),
          tersimpan: true,
          data: bentukModulTutor(nama, cache, { mapel, materi }),
        });
      }
      return responsMateriTerkunci();
    }

    const hasil = await ambilAtauBuatBagianModul({
      nama,
      kelas,
      mapel,
      materi,
      gambar: daftarGambar,
      bagian,
      signal: req.signal,
    });

    return NextResponse.json({
      berhasil: true,
      dariCache: hasil.dariCache,
      topicId: hasil.topicId,
      tersimpan: hasil.dariCache,
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
    console.error("EROR SISTEM:", error);
    const pesan = pesanGalatGemini(error);
    const timeout = /waktu lebih lama|TIMEOUT_GEMINI|timeout/i.test(pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: timeout ? 504 : 500 },
    );
  }
}
