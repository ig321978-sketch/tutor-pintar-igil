import { NextResponse } from "next/server";
import {
  daftarRingkasSuaraEleven,
  elevenLabsSiapDipakai,
  klasifikasiSuaraGuruEleven,
  siapkanKeduaSuaraGuru,
  sintesisElevenLabs,
} from "@/lib/elevenlabs-tts";
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

    if (body.siapkanGuru === true) {
      const suara = await siapkanKeduaSuaraGuru();
      return NextResponse.json({
        berhasil: true,
        sumber: "elevenlabs",
        suara,
      });
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

    if (!elevenLabsSiapDipakai()) {
      return NextResponse.json(
        {
          berhasil: false,
          pesan: "Kunci ElevenLabs belum disetel. Isi ELEVENLABS_API_KEY.",
        },
        { status: 503 },
      );
    }

    const kelamin = normalisasiKelaminTts(body.kelamin ?? body.gender);
    const kelas = typeof body.kelas === "string" ? body.kelas : "3 SD";
    const hasil = await sintesisElevenLabs(naskah, kelamin, kelas);
    return NextResponse.json({
      berhasil: true,
      sumber: "elevenlabs",
      mime: hasil.mime,
      audioBase64: hasil.audio.toString("base64"),
      durasiDetik: hasil.durasiDetik,
      suara: hasil.suara,
      kata: waktuKataDariDurasi(naskah, hasil.durasiDetik),
    });
  } catch (error: unknown) {
    const pesan =
      error instanceof Error ? error.message : "Sintesis ElevenLabs gagal.";
    console.error("TTS ElevenLabs:", pesan);
    return NextResponse.json({ berhasil: false, pesan }, { status: 502 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("suara") === "1") {
    const daftar = await daftarRingkasSuaraEleven();
    return NextResponse.json({
      berhasil: elevenLabsSiapDipakai(),
      sumber: "elevenlabs",
      ...daftar,
    });
  }
  return NextResponse.json({
    berhasil: elevenLabsSiapDipakai(),
    sumber: "elevenlabs",
    klasifikasi: klasifikasiSuaraGuruEleven(),
  });
}
