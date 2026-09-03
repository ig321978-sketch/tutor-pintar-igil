import { NextResponse } from "next/server";
import { namaSuaraChirp, sintesisChirp, ttsSiapDipakai } from "@/lib/google-tts";
import { ambilCacheTts, kunciCacheTts, simpanCacheTts } from "@/lib/tts-cache";
import {
  normalisasiKelaminTts,
  perkiraanDurasiMp3,
  waktuKataDariDurasi,
} from "@/lib/tts";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { berhasil: false, cadangan: true, pesan: "Request tidak valid." },
        { status: 400 },
      );
    }

    const teks =
      typeof body.teks === "string"
        ? body.teks
        : typeof body.naskah === "string"
          ? body.naskah
          : "";
    const naskah = teks.replace(/\s+/g, " ").trim();
    if (!naskah) {
      return NextResponse.json(
        { berhasil: false, cadangan: true, pesan: "Naskah kosong." },
        { status: 400 },
      );
    }

    const kelamin = normalisasiKelaminTts(body.kelamin ?? body.gender);
    const kelas = typeof body.kelas === "string" ? body.kelas : "3 SD";
    const suara = namaSuaraChirp(kelamin, kelas);
    const kunci = kunciCacheTts(suara, naskah);

    const cache = await ambilCacheTts(kunci);
    if (cache) {
      const durasi = cache.meta.durasiDetik || perkiraanDurasiMp3(cache.audio.length);
      return NextResponse.json({
        berhasil: true,
        sumber: "cache",
        mime: cache.meta.mime || "audio/mpeg",
        audioBase64: cache.audio.toString("base64"),
        durasiDetik: durasi,
        suara,
        kata: waktuKataDariDurasi(naskah, durasi),
      });
    }

    if (!ttsSiapDipakai()) {
      return NextResponse.json({
        berhasil: false,
        cadangan: true,
        pesan: "Kredensial Google Cloud belum disetel. Memakai suara cadangan.",
      });
    }

    try {
      const audio = await sintesisChirp(naskah, suara);
      const durasi = perkiraanDurasiMp3(audio.length);
      await simpanCacheTts(kunci, audio, {
        mime: "audio/mpeg",
        durasiDetik: durasi,
        suara,
      });
      return NextResponse.json({
        berhasil: true,
        sumber: "google",
        mime: "audio/mpeg",
        audioBase64: audio.toString("base64"),
        durasiDetik: durasi,
        suara,
        kata: waktuKataDariDurasi(naskah, durasi),
      });
    } catch (error: unknown) {
      const pesan = error instanceof Error ? error.message : "Sintesis gagal.";
      const kuota = Boolean(
        error && typeof error === "object" && "kuota" in error && error.kuota,
      );
      console.error("TTS Chirp:", pesan);
      return NextResponse.json({
        berhasil: false,
        cadangan: true,
        kuota,
        pesan: kuota
          ? "Kuota Google Cloud TTS habis. Memakai suara cadangan."
          : "Gangguan Google Cloud TTS. Memakai suara cadangan.",
      });
    }
  } catch (error: unknown) {
    const pesan = error instanceof Error ? error.message : "Kesalahan tidak diketahui";
    console.error("TTS:", error);
    return NextResponse.json({
      berhasil: false,
      cadangan: true,
      pesan: `Gagal memproses TTS: ${pesan}`,
    });
  }
}
