import { NextResponse } from "next/server";
import {
  durasiWavDetik,
  gabungBerkasWav,
  jalankanParalel,
  namaSuaraChirp,
  potongNaskahAwal,
  sintesisChirp,
  ttsSiapDipakai,
} from "@/lib/google-tts";
import { pecahKlipSuara } from "@/lib/klip-suara";
import { naskahLisan } from "@/lib/naskah-lisan";
import { ambilCacheTts, kunciNaskahTts, simpanCacheTts } from "@/lib/tts-cache";
import { normalisasiKelaminTts, waktuKataDariDurasi } from "@/lib/tts";

export const maxDuration = 120;

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
    const naskah = teks
      .split(/\n\n+/)
      .map((item) => naskahLisan(item))
      .filter(Boolean)
      .join("\n\n");
    if (!naskah) {
      return NextResponse.json(
        { berhasil: false, cadangan: true, pesan: "Naskah kosong." },
        { status: 400 },
      );
    }

    const kelamin = normalisasiKelaminTts(body.kelamin ?? body.gender);
    const kelas = typeof body.kelas === "string" ? body.kelas : "3 SD";
    const awalSaja = body.awalSaja === true;
    const suara = namaSuaraChirp(kelamin, kelas);
    const kunci = kunciNaskahTts(suara, naskah, awalSaja);

    const naskahPakai = awalSaja ? potongNaskahAwal(naskah) : naskah;
    const cacheUtuh = await ambilCacheTts(kunci);
    if (cacheUtuh) {
      const durasi = cacheUtuh.meta.durasiDetik || durasiWavDetik(cacheUtuh.audio);
      return NextResponse.json({
        berhasil: true,
        sumber: "cache",
        mime: cacheUtuh.meta.mime || "audio/wav",
        audioBase64: cacheUtuh.audio.toString("base64"),
        durasiDetik: durasi,
        suara,
        kata: waktuKataDariDurasi(naskahPakai, durasi),
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
      const klip = pecahKlipSuara(naskahPakai);
      const audioKlip = await jalankanParalel(klip, 4, async (teks) => {
        const kunciKlip = kunciNaskahTts(suara, teks, false);
        const cacheKlip = await ambilCacheTts(kunciKlip);
        if (cacheKlip) return cacheKlip.audio;
        const audioBaru = await sintesisChirp(teks, suara);
        await simpanCacheTts(kunciKlip, audioBaru, {
          mime: "audio/wav",
          durasiDetik: durasiWavDetik(audioBaru),
          suara,
        });
        return audioBaru;
      });
      const audio = gabungBerkasWav(audioKlip);
      const durasi = durasiWavDetik(audio);
      await simpanCacheTts(kunci, audio, {
        mime: "audio/wav",
        durasiDetik: durasi,
        suara,
      });
      return NextResponse.json({
        berhasil: true,
        sumber: "google",
        mime: "audio/wav",
        audioBase64: audio.toString("base64"),
        durasiDetik: durasi,
        suara,
        kata: waktuKataDariDurasi(naskahPakai, durasi),
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
