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
  simulasiSelesai?: unknown;
  praktikumSelesai?: unknown;
  praktikumLulus?: unknown;
  ujianSelesai?: unknown;
  ujianDijawab?: unknown;
  punyaLab?: unknown;
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
    simulasi: { type: Type.STRING },
    latihan: { type: Type.STRING },
    praktikum: { type: Type.STRING },
    ujian: { type: Type.STRING },
  },
  required: ["skor", "ringkasan", "simulasi", "latihan", "praktikum", "ujian"],
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

function skorKomponenBab(item: Record<string, unknown>): number {
  const jumlah = Math.max(0, angka(item.jumlahLatihan));
  const dijawab = Math.max(0, angka(item.latihanDijawab));
  const benar = Math.max(0, angka(item.kuisBenar));
  const dasarLatihan = jumlah || dijawab;
  const latihan = dasarLatihan === 0 ? 0 : (benar / dasarLatihan) * 100;
  const uraian = Array.isArray(item.esai) ? item.esai : [];
  const panjang = uraian.reduce(
    (jumlahEsai, baris) => jumlahEsai + teks(baris).length,
    0,
  );
  const ujianKirim = Math.max(angka(item.ujianDijawab), uraian.length);
  const ujian =
    0.6 * Math.min(100, (ujianKirim / 3) * 100) +
    0.4 * Math.min(100, Math.round(panjang / 6));
  if (!ya(item.punyaLab)) {
    return 0.55 * latihan + 0.45 * ujian;
  }
  const simulasi = ya(item.simulasiSelesai) ? 100 : 0;
  const praktikum = ya(item.praktikumLulus)
    ? 100
    : ya(item.praktikumSelesai)
      ? 50
      : 0;
  return 0.15 * simulasi + 0.35 * latihan + 0.2 * praktikum + 0.3 * ujian;
}

function skorCadangan(bab: Array<Record<string, unknown>>): number {
  if (bab.length === 0) return 0;
  const total = bab.reduce((jumlah, item) => jumlah + skorKomponenBab(item), 0);
  return Math.round(total / bab.length);
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
      simulasiSelesai: ya(item.simulasiSelesai),
      praktikumSelesai: ya(item.praktikumSelesai),
      praktikumLulus: ya(item.praktikumLulus),
      ujianSelesai: ya(item.ujianSelesai),
      ujianDijawab: angka(item.ujianDijawab),
      punyaLab: ya(item.punyaLab),
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
        const status = item.audioCompleted ? "Sudah Belajar" : "Belum Belajar";
        const esai = item.esai.length
          ? item.esai.map((isi, indeks) => `Esai ${indeks + 1}: ${isi.slice(0, 280)}`).join(" | ")
          : "Tidak ada uraian";
        return `- ${item.mapel} / ${item.materi}: ${status}; audio tuntas=${item.audioCompleted}; simulasi=${item.simulasiSelesai}; latihan ${item.kuisBenar}/${item.jumlahLatihan || item.latihanDijawab} (selesai=${item.latihanSelesai}); praktikum coba=${item.praktikumSelesai} lulus=${item.praktikumLulus}; ujian ${item.ujianDijawab}/3 (selesai=${item.ujianSelesai}); lab=${item.punyaLab}; ${esai}`;
      })
      .join("\n");

    const prompt = `
Kamu adalah penilai rapor harian $IGIL. Bahasa Indonesia, ramah guru, tanpa kutip ganda di dalam nilai teks.

Siswa: ${nama}, kelas ${kelas}. Tanggal: ${tanggal}.
Aktivitas hari ini:
${cuplikan}

Tugas: nilai holistik 0-100 dari EMPAT komponen: Simulasi, Latihan, Praktikum, dan Ujian.
Status Sudah Belajar = audio materi tuntas didengar, BUKAN syarat latihan selesai.

Bobot jika mapel punya lab (simulasi+praktikum): Simulasi 15%, Latihan 35%, Praktikum 20%, Ujian 30%.
Bobot jika mapel tanpa lab: Latihan 55%, Ujian 45%. Tulis di simulasi dan praktikum bahwa komponen tidak berlaku.

ATURAN SKOR:
- 0-50 KURANG, 51-70 CUKUP, 71-90 BAIK, 91-100 SANGAT BAIK.
- Latihan diukur dari ketepatan pilihan ganda.
- Ujian diukur dari kelengkapan dan kualitas uraian.
- Praktikum: lulus lebih tinggi daripada hanya mencoba.
- Simulasi: dihitung jika siswa sudah membuka/menjalankan simulasi bab itu.
- skor HARUS bilangan bulat 0 sampai 100.

Kembalikan JSON kunci: skor, ringkasan, simulasi, latihan, praktikum, ujian.
ringkasan: 2-3 kalimat untuk orang tua/guru.
simulasi, latihan, praktikum, ujian: masing-masing 1-2 kalimat.
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
        simulasi: teks(data.simulasi),
        latihan: teks(data.latihan),
        praktikum: teks(data.praktikum),
        ujian: teks(data.ujian),
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
        simulasi: "Komponen simulasi dinilai dari apakah siswa sudah membuka simulasi bab.",
        latihan: "Ketepatan soal latihan pilihan ganda dipakai sebagai dasar sementara.",
        praktikum: "Komponen praktikum dinilai dari percobaan ide dan hasil lulus/belum.",
        ujian: pesanGalatGemini(error),
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
