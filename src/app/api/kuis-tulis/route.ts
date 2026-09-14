import { NextResponse } from "next/server";
import { Type, type Schema } from "@google/genai";
import {
  hasilkanJsonGemini,
  MODEL_GEMINI_RUTIN,
  pesanGalatGemini,
  type Part,
} from "@/lib/klien-gemini";
import {
  adalahGambarJawaban,
  jawabanTulisGenerik,
  jawabanTulisMemuatAlias,
} from "@/lib/nilai-kuis-tulis";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 30;

const BATAS_GAMBAR = 2_000_000;

const SKEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    benar: { type: Type.BOOLEAN },
    bacaan: { type: Type.STRING },
  },
  required: ["benar", "bacaan"],
};

function teks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function daftarTeks(nilai: unknown): string[] {
  if (!Array.isArray(nilai)) return [];
  return nilai
    .map((item) => teks(item))
    .filter((item) => item.length > 0)
    .slice(0, 40);
}

function parseJson(mentah: string): Record<string, unknown> {
  let isi = mentah.replace(/```json/gi, "").replace(/```/g, "").trim();
  const awal = isi.indexOf("{");
  const akhir = isi.lastIndexOf("}");
  if (awal === -1 || akhir === -1) throw new Error("AI tidak menghasilkan JSON.");
  isi = isi.slice(awal, akhir + 1);
  try {
    return JSON.parse(isi) as Record<string, unknown>;
  } catch {
    return JSON.parse(isi.replace(/,\s*([}\]])/g, "$1")) as Record<string, unknown>;
  }
}

function ekstrakGambar(gambar: unknown): Part | null {
  if (typeof gambar !== "string" || gambar.length < 32) return null;
  if (gambar.length > BATAS_GAMBAR) return null;
  const cocok = gambar.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!cocok) return null;
  return { inlineData: { mimeType: cocok[1], data: cocok[2] } };
}

function nilaiLokal(jawaban: string, alias: string[]): boolean | null {
  if (!jawaban || adalahGambarJawaban(jawaban)) return null;
  if (jawabanTulisGenerik(jawaban)) return false;
  if (alias.length === 0) return null;
  return jawabanTulisMemuatAlias(jawaban, alias);
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

    const pertanyaan = teks(body.pertanyaan);
    const konteks = teks(body.konteks).slice(0, 1500);
    const alias = daftarTeks(body.alias);
    const jawaban = teks(body.jawaban);
    const gambarPart = adalahGambarJawaban(jawaban)
      ? ekstrakGambar(jawaban)
      : null;

    if (!pertanyaan) {
      return NextResponse.json(
        { berhasil: false, pesan: "Pertanyaan kuis tulis kosong." },
        { status: 400 },
      );
    }
    if (!jawaban) {
      return NextResponse.json(
        { berhasil: false, pesan: "Jawaban masih kosong." },
        { status: 400 },
      );
    }
    if (adalahGambarJawaban(jawaban) && !gambarPart) {
      return NextResponse.json(
        { berhasil: false, pesan: "Gambar coretan terlalu besar atau tidak valid." },
        { status: 400 },
      );
    }

    const lokal = nilaiLokal(jawaban, alias);
    if (lokal !== null) {
      return NextResponse.json({ berhasil: true, benar: lokal, bacaan: jawaban });
    }

    const kunci = alias.length
      ? `Kunci jawaban yang diterima: ${alias.join(", ")}.`
      : "Tidak ada kunci kata persis. Nilai dari kesesuaian dengan pertanyaan dan materi kartu.";

    const prompt = `
Kamu guru SD Indonesia. Nilai QUIZ TULIS siswa. Bahasa sederhana.

Pertanyaan: ${pertanyaan}
Materi kartu: ${konteks || "(tidak dilampirkan)"}
${kunci}
${gambarPart ? "Siswa mengirim coretan tangan. Baca tulisan atau angka di gambar." : `Jawaban teks siswa: ${jawaban}`}

benar=true HANYA jika jawaban:
1. Menjawab pertanyaan, bukan hanya 'sudah', 'ok', atau coretan acak.
2. Selaras fakta materi kartu atau salah satu kunci.
3. Untuk hitungan, angka atau kalimat yang setara kunci dianggap benar (contoh: 5, lima, 3+2=5).
4. Jika gambar tidak terbaca atau kosong, benar=false.

bacaan: teks yang terbaca dari jawaban, singkat, tanpa kutip ganda.

Kembalikan JSON kunci: benar, bacaan.
`.trim();

    const parts: Part[] = [{ text: prompt }];
    if (gambarPart) parts.push(gambarPart);

    const mentah = await hasilkanJsonGemini({
      parts,
      schema: SKEMA,
      maxOutputTokens: 256,
      model: MODEL_GEMINI_RUTIN,
      signal: req.signal,
    });
    const data = parseJson(mentah);
    const bacaan = teks(data.bacaan, gambarPart ? "" : jawaban);
    let benar = data.benar === true;
    if (bacaan && alias.length && jawabanTulisMemuatAlias(bacaan, alias)) {
      benar = true;
    }
    if (bacaan && jawabanTulisGenerik(bacaan)) benar = false;
    if (gambarPart && !bacaan) benar = false;

    return NextResponse.json({ berhasil: true, benar, bacaan });
  } catch (error) {
    return NextResponse.json(
      {
        berhasil: false,
        pesan: pesanGalatGemini(error) || "Gagal menilai jawaban. Kirim lagi.",
      },
      { status: 500 },
    );
  }
}
