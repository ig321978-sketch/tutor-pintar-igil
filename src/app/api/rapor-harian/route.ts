import { NextResponse } from "next/server";
import { Type, type Schema } from "@google/genai";
import {
  BATAS_TOKEN_RUTIN,
  hasilkanJsonGemini,
  MODEL_GEMINI_EVALUASI,
  pesanGalatGemini,
} from "@/lib/klien-gemini";
import { predikatDariSkor } from "@/lib/rapor-harian";

export const maxDuration = 30;

type BabHarian = {
  mapel?: unknown;
  materi?: unknown;
  audioCompleted?: unknown;
  latihanSelesai?: unknown;
  kuisBenar?: unknown;
  jumlahLatihan?: unknown;
  latihanDijawab?: unknown;
  esai?: unknown;
};

const SKEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    skor: { type: Type.NUMBER },
    ringkasan: { type: Type.STRING },
    pemahaman: { type: Type.STRING },
    esai: { type: Type.STRING },
    konsistensi: { type: Type.STRING },
  },
  required: ["skor", "ringkasan", "pemahaman", "esai", "konsistensi"],
};

function teks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function angka(nilai: unknown, cadangan = 0): number {
  return typeof nilai === "number" && Number.isFinite(nilai) ? nilai : cadangan;
}

function ya(nilai: unknown): boolean {
  return nilai === true;
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

function skorCadangan(bab: Array<Record<string, unknown>>): number {
  if (bab.length === 0) return 0;
  let totalPg = 0;
  let benarPg = 0;
  let skorEsai = 0;
  let selesai = 0;
  for (const item of bab) {
    const jumlah = Math.max(0, angka(item.jumlahLatihan));
    const dijawab = Math.max(0, angka(item.latihanDijawab));
    const benar = Math.max(0, angka(item.kuisBenar));
    totalPg += jumlah || dijawab;
    benarPg += benar;
    const uraian = Array.isArray(item.esai) ? item.esai : [];
    const panjang = uraian.reduce(
      (jumlahEsai, baris) => jumlahEsai + teks(baris).length,
      0,
    );
    skorEsai += Math.min(100, Math.round(panjang / 4));
    if (ya(item.latihanSelesai)) selesai += 1;
  }
  const ketepatan = totalPg === 0 ? 0 : (benarPg / totalPg) * 100;
  const esai = skorEsai / bab.length;
  const konsistensi = (selesai / bab.length) * 100;
  return Math.round(0.4 * ketepatan + 0.3 * esai + 0.3 * konsistensi);
}

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

    const nama = teks(body.nama, "Siswa");
    const kelas = teks(body.kelas, "-");
    const tanggal = teks(body.tanggal);
    const babMentah = Array.isArray(body.bab) ? (body.bab as BabHarian[]) : [];
    const bab = babMentah.map((item) => ({
      mapel: teks(item.mapel),
      materi: teks(item.materi),
      audioCompleted: ya(item.audioCompleted),
      latihanSelesai: ya(item.latihanSelesai),
      kuisBenar: angka(item.kuisBenar),
      jumlahLatihan: angka(item.jumlahLatihan),
      latihanDijawab: angka(item.latihanDijawab),
      esai: Array.isArray(item.esai)
        ? item.esai.map((baris) => teks(baris)).filter(Boolean)
        : [],
    }));

    if (!tanggal || bab.length === 0) {
      return NextResponse.json(
        { berhasil: false, pesan: "Belum ada aktivitas harian untuk dinilai." },
        { status: 400 },
      );
    }

    const cuplikan = bab
      .map((item) => {
        const status =
          item.latihanSelesai
            ? "Sudah Belajar"
            : "Belum lengkap";
        const esai = item.esai.length
          ? item.esai.map((isi, indeks) => `Esai ${indeks + 1}: ${isi.slice(0, 280)}`).join(" | ")
          : "Tidak ada uraian";
        return `- ${item.mapel} / ${item.materi}: ${status}; PG benar ${item.kuisBenar}/${item.jumlahLatihan || item.latihanDijawab}; audio=${item.audioCompleted}; latihan selesai=${item.latihanSelesai}; ${esai}`;
      })
      .join("\n");

    const prompt = `
Kamu adalah penilai rapor harian $IGIL. Bahasa Indonesia, ramah guru, tanpa kutip ganda di dalam nilai teks.

Siswa: ${nama}, kelas ${kelas}. Tanggal: ${tanggal}.
Aktivitas hari ini:
${cuplikan}

Tugas: nilai holistik 0-100. JANGAN hanya memakai persentase pilihan ganda.
Wajib menimbang:
1) kedalaman pemahaman (ketepatan PG),
2) kualitas jawaban essay (kelengkapan, nalar, kesesuaian bab),
3) konsistensi belajar (bab tuntas latihan, tidak setengah jadi).

ATURAN SKOR:
- 0-50 KURANG, 51-70 CUKUP, 71-90 BAIK, 91-100 SANGAT BAIK.
- Jika siswa belum merampungkan latihan pada sebagian besar bab, skor maksimal 70.
- Essay kosong atau sangat pendek menekan skor, meski PG bagus.
- skor HARUS bilangan bulat 0 sampai 100.

Kembalikan JSON kunci: skor, ringkasan, pemahaman, esai, konsistensi.
ringkasan: 2-3 kalimat untuk orang tua/guru.
pemahaman, esai, konsistensi: masing-masing 1-2 kalimat.
`.trim();

    try {
      const mentah = await hasilkanJsonGemini({
        parts: [{ text: prompt }],
        schema: SKEMA,
        maxOutputTokens: BATAS_TOKEN_RUTIN,
        model: MODEL_GEMINI_EVALUASI,
        timeoutMs: 22_000,
      });
      const data = parseJson(mentah);
      const skor = Math.max(0, Math.min(100, Math.round(angka(data.skor, skorCadangan(bab)))));
      return NextResponse.json({
        berhasil: true,
        dariAi: true,
        skor,
        predikat: predikatDariSkor(skor),
        ringkasan: teks(data.ringkasan, "Penilaian harian sudah disusun oleh Tutor AI."),
        pemahaman: teks(data.pemahaman),
        esai: teks(data.esai),
        konsistensi: teks(data.konsistensi),
      });
    } catch (error) {
      console.error("RAPOR HARIAN AI:", error);
      const skor = skorCadangan(bab);
      return NextResponse.json({
        berhasil: true,
        dariAi: false,
        skor,
        predikat: predikatDariSkor(skor),
        ringkasan:
          "Penilaian sementara memakai rekam jejak harian karena AI belum merespons. Buka rapor lagi untuk penilaian holistik.",
        pemahaman: "Ketepatan pilihan ganda dan kelengkapan dengar materi dipakai sebagai dasar sementara.",
        esai: "Kualitas uraian akan dinilai AI pada percobaan berikutnya.",
        konsistensi: pesanGalatGemini(error),
      });
    }
  } catch (error: unknown) {
    console.error("RAPOR HARIAN:", error);
    return NextResponse.json(
      { berhasil: false, pesan: pesanGalatGemini(error) },
      { status: 500 },
    );
  }
}
