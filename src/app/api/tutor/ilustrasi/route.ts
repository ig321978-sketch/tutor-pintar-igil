import { NextResponse } from "next/server";
import { buatPaketDoodle } from "@/lib/doodle";

export const maxDuration = 60;

type PermintaanIlustrasi = {
  kelas?: unknown;
  mapel?: unknown;
  materi?: unknown;
  penjelasan?: unknown;
  sketsaDeskripsi?: unknown;
  sketsaSisipan1?: unknown;
  sketsaSisipan2?: unknown;
};

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { berhasil: false, pesan: "Kunci API kosong!" },
        { status: 500 },
      );
    }

    const paket = await buatPaketDoodle({
      apiKey,
      kelas: sebagaiTeks(body.kelas, "SD"),
      mapel: sebagaiTeks(body.mapel, "Umum"),
      materi: sebagaiTeks(body.materi, "Materi hari ini"),
      penjelasan: sebagaiTeks(body.penjelasan),
      sketsaUtama: sebagaiTeks(body.sketsaDeskripsi),
      sketsaSisipan1: sebagaiTeks(body.sketsaSisipan1),
      sketsaSisipan2: sebagaiTeks(body.sketsaSisipan2),
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
