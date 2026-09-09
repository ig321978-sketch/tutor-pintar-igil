import { NextResponse } from "next/server";
import { buatPaketDoodle } from "@/lib/doodle";
import { UKURAN_BATCH_DOODLE } from "@/lib/konsep-materi";
import { adalahPai1Bab1 } from "@/lib/naskah-resmi";

export const maxDuration = 60;

type PermintaanIlustrasi = {
  kelas?: unknown;
  mapel?: unknown;
  materi?: unknown;
  penjelasan?: unknown;
  sketsaKartu?: unknown;
  offset?: unknown;
  batas?: unknown;
};

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function sebagaiAngka(nilai: unknown, cadangan: number): number {
  const angka = typeof nilai === "number" ? nilai : Number(nilai);
  return Number.isFinite(angka) ? Math.max(0, Math.floor(angka)) : cadangan;
}

export async function POST(req: Request) {
  try {
    let body: PermintaanIlustrasi;
    try {
      body = (await req.json()) as PermintaanIlustrasi;
    } catch {
      return NextResponse.json(
        { berhasil: false, pesan: "Request JSON tidak valid." },
        { status: 400 },
      );
    }

    const kelas = sebagaiTeks(body.kelas, "SD");
    const mapel = sebagaiTeks(body.mapel, "Umum");
    const materi = sebagaiTeks(body.materi, "Materi hari ini");
    if (adalahPai1Bab1(kelas, mapel, materi)) {
      return NextResponse.json({
        berhasil: true,
        dariCache: true,
        gambarUtama: null,
        gambarSisipan: [],
      });
    }

    const paket = await buatPaketDoodle({
      kelas,
      mapel,
      materi,
      penjelasan: sebagaiTeks(body.penjelasan),
      sketsaKartu: sebagaiTeks(body.sketsaKartu),
      offset: sebagaiAngka(body.offset, 0),
      batas: sebagaiAngka(body.batas, UKURAN_BATCH_DOODLE),
    });

    return NextResponse.json({
      berhasil: true,
      gambarUtama: paket.gambarUtama,
      gambarSisipan: paket.gambarSisipan,
    });
  } catch (error: unknown) {
    const pesan =
      error instanceof Error ? error.message : "Kesalahan tidak diketahui";
    console.error("EROR DOODLE:", error);
    return NextResponse.json(
      {
        berhasil: false,
        pesan,
        gambarUtama: null,
        gambarSisipan: [],
      },
      { status: 500 },
    );
  }
}
