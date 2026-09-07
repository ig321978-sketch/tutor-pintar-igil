import { NextResponse } from "next/server";
import { prosaSiapDipakai, sintesisProsa } from "@/lib/prosa-tts";
import { naskahLisan } from "@/lib/naskah-lisan";
import { normalisasiKelaminTts, waktuKataDariDurasi } from "@/lib/tts";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { berhasil: false, pesan: "Request tidak valid." },
        { status: 400 },
      );
    }

    const teks =
      typeof body.teks === "string"
        ? body.teks
        : typeof body.naskah === "string"
          ? body.naskah
          : "";
    const naskah = teks
      .split(/\n\n+/)
      .map((item) => naskahLisan(item))
      .filter(Boolean)
      .join("\n\n");
    if (!naskah) {
      return NextResponse.json(
        { berhasil: false, pesan: "Naskah kosong." },
        { status: 400 },
      );
    }

    if (!prosaSiapDipakai()) {
      return NextResponse.json(
        {
          berhasil: false,
          pesan: "Kunci Prosa.ai belum disetel. Isi PROSA_API_KEY.",
        },
        { status: 503 },
      );
    }

    const kelamin = normalisasiKelaminTts(body.kelamin ?? body.gender);
    const hasil = await sintesisProsa(naskah, kelamin);
    return NextResponse.json({
      berhasil: true,
      sumber: "prosa",
      mime: hasil.mime,
      audioBase64: hasil.audio.toString("base64"),
      durasiDetik: hasil.durasiDetik,
      suara: hasil.model,
      kata: waktuKataDariDurasi(naskah, hasil.durasiDetik),
    });
  } catch (error: unknown) {
    const pesan = error instanceof Error ? error.message : "Sintesis Prosa gagal.";
    console.error("TTS Prosa:", pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    berhasil: prosaSiapDipakai(),
    sumber: "prosa",
  });
}
