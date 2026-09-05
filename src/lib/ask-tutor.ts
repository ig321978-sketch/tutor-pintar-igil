import { Type, type Part, type Schema } from "@google/genai";
import { mapelHitungan } from "@/lib/mapel-hitungan";
import {
  BATAS_RIWAYAT_AJUAN,
  BATAS_TOKEN_RUTIN,
  hasilkanJsonGemini,
  MODEL_GEMINI_RUTIN,
} from "@/lib/klien-gemini";
import { namaDepanSiswa, sapaanTutorRingkas } from "@/lib/nama-siswa";
import { bersihkanDanParseJson } from "@/lib/susun-modul-tutor";

export type PanduanAjuan = {
  sapaan: string;
  panduanLangkah: string;
  caraKurikulum: string;
  trikBimbel: string;
  dorongan: string;
};

export type JejakAjuan = {
  tanya?: unknown;
  jawab?: unknown;
};

const SKEMA_AJUAN: Schema = {
  type: Type.OBJECT,
  properties: {
    sapaan: { type: Type.STRING },
    panduanLangkah: { type: Type.STRING },
    caraKurikulum: { type: Type.STRING },
    trikBimbel: { type: Type.STRING },
    dorongan: { type: Type.STRING },
  },
  required: [
    "sapaan",
    "panduanLangkah",
    "caraKurikulum",
    "trikBimbel",
    "dorongan",
  ],
};

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function pulihkanParagraf(nilai: unknown, cadangan: string): string {
  const teks = typeof nilai === "string" ? nilai : cadangan;
  return teks
    .replace(/\\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function rapikanRiwayatAjuan(mentah: unknown): Array<{ tanya: string; jawab: string }> {
  if (!Array.isArray(mentah)) return [];
  return mentah
    .map((item) => {
      const baris = item as JejakAjuan;
      return {
        tanya: sebagaiTeks(baris.tanya).slice(0, 280),
        jawab: sebagaiTeks(baris.jawab).slice(0, 360),
      };
    })
    .filter((item) => item.tanya)
    .slice(-BATAS_RIWAYAT_AJUAN);
}

export async function askTutor(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  ajuan: string;
  gambar?: Part[];
  riwayat?: unknown;
}): Promise<PanduanAjuan> {
  const namaDepan = namaDepanSiswa(opsi.nama);
  const daftarGambar = opsi.gambar ?? [];
  const soalHitungan = mapelHitungan(opsi.mapel, `${opsi.materi} ${opsi.ajuan}`);
  const jejak = rapikanRiwayatAjuan(opsi.riwayat);
  const blokRiwayat = jejak.length
    ? `Riwayat singkat (hanya ${jejak.length} percakapan terakhir):\n${jejak
        .map((item, indeks) => `${indeks + 1}. Siswa: ${item.tanya}\nTutor: ${item.jawab || "-"}`)
        .join("\n")}`
    : "Belum ada riwayat percakapan.";

  const konteksFoto =
    daftarGambar.length > 0
      ? "Siswa mungkin merujuk foto halaman buku yang dilampirkan. Gunakan foto itu sebagai konteks jika relevan."
      : "";

  const instruksiHitungan = soalHitungan
    ? `SOAL HITUNGAN (Matematika/Fisika/Kimia atau sejenis):
   - caraKurikulum: langkah resmi Kurikulum Merdeka (konsep, rumus, urutan kerja) TANPA menuliskan hasil akhir.
   - trikBimbel: Trik Cepat Bimbel (Hack) yang mempercepat nalar, juga TANPA menuliskan hasil akhir.
   Biarkan siswa sendiri yang menghitung langkah terakhir.`
    : `Bukan soal hitungan wajib:
   - caraKurikulum: isi string kosong.
   - trikBimbel: isi string kosong.`;

  const promptAjuan = `
Kamu adalah Tutor $IGIL. Siswa ${namaDepan} (Kelas ${opsi.kelas}) sedang belajar ${opsi.mapel}, materi ${opsi.materi}.
${konteksFoto}

${blokRiwayat}

Pertanyaan siswa saat ini:
${opsi.ajuan}

ATURAN MUTLAK PEMBELAJARAN:
1. DILARANG KERAS memberi jawaban akhir, kunci pilihan A/B/C/D, nilai numerik hasil akhir, atau kalimat seperti 'jadi jawabannya adalah'.
2. Jika siswa meminta kunci instan, tolak dengan ramah lalu alihkan ke langkah nalar.
3. Respons HANYA 1 objek JSON murni. DILARANG kutip ganda (") di dalam nilai teks. Gunakan kutip tunggal (').
4. panduanLangkah: struktur Penyelesaian Langkah Demi Langkah (Step-by-Step Guidance) bernomor, merangsang nalar kritis. Pisahkan langkah dengan \\n\\n. Jika langkah berupa uraian, tulis beberapa kalimat. Jika hanya rumus atau perintah singkat, biarkan plain text. Bilangan dan rumus WAJIB ANGKA ARAB dan simbol (contoh: 2x + 3 = 11), jangan dieja menjadi kata.
${instruksiHitungan}
5. sapaan: SATU kalimat pendek. Sebut HANYA nama depan ${namaDepan}. Sertakan TEPAT SATU kata pujian dari: Pintar, Cerdas, Baik, Rajin, Soleh, Semangat, Hebat. DILARANG pujian panjang, julukan berlebihan, atau nama lengkap. Contoh: 'Halo ${namaDepan}, Pintar.'
6. dorongan: satu kalimat yang mendorong siswa menyelesaikan sendiri, tanpa membocorkan kunci, tanpa pujian berlebihan.

Kembalikan persis kunci: sapaan, panduanLangkah, caraKurikulum, trikBimbel, dorongan.
`.trim();

  const textAjuan = await hasilkanJsonGemini({
    parts: [...daftarGambar, { text: promptAjuan }],
    schema: SKEMA_AJUAN,
    maxOutputTokens: BATAS_TOKEN_RUTIN,
    model: MODEL_GEMINI_RUTIN,
    timeoutMs: 22_000,
  });
  const dataJsonAjuan = bersihkanDanParseJson(textAjuan);

  return {
    sapaan: sapaanTutorRingkas(opsi.nama, sebagaiTeks(dataJsonAjuan.sapaan)),
    panduanLangkah: pulihkanParagraf(
      dataJsonAjuan.panduanLangkah,
      "Mari pecah soalnya menjadi langkah kecil. Baca soal sekali lagi, tandai yang diketahui, lalu tentukan apa yang ditanyakan.",
    ),
    caraKurikulum: pulihkanParagraf(dataJsonAjuan.caraKurikulum, ""),
    trikBimbel: pulihkanParagraf(dataJsonAjuan.trikBimbel, ""),
    dorongan: sebagaiTeks(
      dataJsonAjuan.dorongan,
      "Coba kerjakan langkah terakhir sendiri. Kamu mampu!",
    ),
  };
}
