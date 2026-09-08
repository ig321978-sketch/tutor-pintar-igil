import { NextResponse } from "next/server";
import { Type, type Schema } from "@google/genai";
import {
  hasilkanJsonGemini,
  MODEL_GEMINI_RUTIN,
  pesanGalatGemini,
  type Part,
} from "@/lib/klien-gemini";
import { cariBahanSimulasi, mapelPunyaSimulasi } from "@/lib/simulasi-global";
import {
  buangTeksSampah,
  permintaanDibatalkan,
} from "@/lib/validasi-naskah-ai";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 60;

const BATAS_GAMBAR = 2_000_000;

const SKEMA_MISI: Schema = {
  type: Type.OBJECT,
  properties: {
    misi: { type: Type.STRING },
    langkah: { type: Type.STRING },
    pertanyaan: { type: Type.STRING },
  },
  required: ["misi", "langkah", "pertanyaan"],
};

const SKEMA_NILAI: Schema = {
  type: Type.OBJECT,
  properties: {
    lulus: { type: Type.BOOLEAN },
    umpanBalik: { type: Type.STRING },
  },
  required: ["lulus", "umpanBalik"],
};

function teks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

function yaTidak(nilai: unknown): boolean {
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

function ekstrakGambar(gambar: unknown): Part | null {
  if (typeof gambar !== "string" || gambar.length < 32) return null;
  if (gambar.length > BATAS_GAMBAR) return null;
  const cocok = gambar.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!cocok) return null;
  return { inlineData: { mimeType: cocok[1], data: cocok[2] } };
}

function buktiGenerik(bukti: string): boolean {
  return /^(sudah|ok|oke|selesai|ya|sip|done|benar|mantap|sudah main|sudah coba|sudah simulasi)[.!\s]*$/i.test(
    bukti.replace(/\s+/g, " ").trim(),
  );
}

function buktiCukup(bukti: string, adaGambar: boolean): boolean {
  const t = bukti.replace(/\s+/g, " ").trim();
  if (adaGambar) return true;
  if (t.length < 12) return false;
  return !buktiGenerik(t);
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

    const aksi = teks(body.aksi, "misi");
    const nama = teks(body.nama, "Siswa");
    const kelas = teks(body.kelas, "3 SD");
    const mapel = teks(body.mapel);
    const materi = teks(body.materi);

    if (!mapel || !materi) {
      return NextResponse.json(
        { berhasil: false, pesan: "Pilih mata pelajaran dan materi dulu ya." },
        { status: 400 },
      );
    }

    if (!mapelPunyaSimulasi(mapel)) {
      return NextResponse.json(
        {
          berhasil: false,
          pesan:
            "Mapel itu belum punya simulasi lab. Pilih Matematika, IPAS, IPA, Fisika, Kimia, Biologi, atau Geografi.",
        },
        { status: 400 },
      );
    }

    if (aksi === "nilai") {
      const misi = buangTeksSampah(teks(body.misi));
      const pertanyaan = buangTeksSampah(teks(body.pertanyaan));
      const bukti = teks(body.bukti);
      const gambarPart = ekstrakGambar(body.gambar);
      if (!misi || !pertanyaan) {
        return NextResponse.json(
          { berhasil: false, pesan: "Misi simulasi belum siap. Muat ulang kartu." },
          { status: 400 },
        );
      }
      if (!buktiCukup(bukti, Boolean(gambarPart))) {
        return NextResponse.json(
          {
            berhasil: false,
            pesan:
              "Tulis pengamatanmu (angka, yang diubah, atau yang terlihat), atau unggah tangkapan layar lab.",
          },
          { status: 400 },
        );
      }

      const prompt = `
Kamu guru lab $IGIL. Nilai bukti siswa terhadap misi simulasi. Bahasa ramah anak Indonesia.

Siswa: ${nama}, kelas ${kelas}.
Mapel: ${mapel}
Materi: ${materi}
Misi: ${misi}
Yang harus dibuktikan: ${pertanyaan}
Bukti teks siswa: ${bukti || "(hanya mengirim tangkapan layar)"}
${gambarPart ? "Ada tangkapan layar lab. Pakai gambar itu sebagai bukti tambahan." : "Tidak ada tangkapan layar."}

lulus=true HANYA jika bukti:
1. Menjawab pertanyaan misi.
2. Menyebut pengamatan konkret dari lab (angka, perubahan, slider/alat yang diubah, atau yang terlihat di layar).
3. Tidak generik seperti sudah, ok, selesai, atau saya sudah main.
4. Selaras fakta bab. Jika ada gambar, gambar harus tampak dari lab yang relevan.

Jika ragu, lulus=false dan minta bukti lebih jelas.
umpanBalik: 2-4 kalimat. Jika lulus, puji singkat plus apa yang dipelajari. Jika belum, tunjukkan apa yang kurang.
DILARANG kutip ganda di dalam nilai teks. Pakai kutip tunggal.

Kembalikan JSON kunci: lulus, umpanBalik.
`.trim();

      const parts: Part[] = [{ text: prompt }];
      if (gambarPart) parts.push(gambarPart);

      const mentah = await hasilkanJsonGemini({
        parts,
        schema: SKEMA_NILAI,
        maxOutputTokens: 1024,
        model: MODEL_GEMINI_RUTIN,
        signal: req.signal,
      });
      const data = parseJson(mentah);
      const umpanBalik = buangTeksSampah(teks(data.umpanBalik));
      if (!umpanBalik) {
        return NextResponse.json(
          {
            berhasil: false,
            pesan: "Gagal menilai simulasi, silakan kirim lagi.",
          },
          { status: 500 },
        );
      }
      let lulus = yaTidak(data.lulus);
      if (!buktiCukup(bukti, Boolean(gambarPart))) lulus = false;
      if (buktiGenerik(bukti) && !gambarPart) lulus = false;

      return NextResponse.json({
        berhasil: true,
        evaluasi: { lulus, umpanBalik },
      });
    }

    const bahan = await cariBahanSimulasi(`${mapel} ${materi}`);
    if (bahan.length === 0) {
      return NextResponse.json({
        berhasil: true,
        misi: null,
        bahan: [],
        pesan: "Belum ketemu simulasi yang cocok untuk materi ini.",
      });
    }

    const daftarLab = bahan
      .slice(0, 3)
      .map((item, i) => `${i + 1}. ${item.sumber} — ${item.judul}: ${item.ringkasan}`)
      .join("\n");

    const prompt = `
Kamu guru lab $IGIL untuk anak sekolah Indonesia. Bahasa ramah, singkat, konkret.

Siswa: ${nama}, kelas ${kelas}.
Mapel: ${mapel}
Materi: ${materi}

Lab yang bisa dimainkan:
${daftarLab}

Tugas: tulis misi singkat yang BISA dikerjakan di lab di atas, bukan praktikum alat sungguhan.

misi: 1-2 kalimat, apa yang harus ditemukan/dibuktikan di lab.
langkah: tepat 3 langkah bernomor untuk memainkan lab.
pertanyaan: 1-3 pertanyaan bukti. Minta angka hasil ukur, yang diubah di lab, atau yang terlihat di layar.
DILARANG kutip ganda di dalam nilai teks. Pakai kutip tunggal.
Jangan minta siswa membongkar iframe atau membaca kode.

Kembalikan JSON kunci: misi, langkah, pertanyaan.
`.trim();

    const mentah = await hasilkanJsonGemini({
      parts: [{ text: prompt }],
      schema: SKEMA_MISI,
      maxOutputTokens: 1024,
      model: MODEL_GEMINI_RUTIN,
      signal: req.signal,
    });
    const data = parseJson(mentah);
    const misi = buangTeksSampah(teks(data.misi));
    const langkah = buangTeksSampah(teks(data.langkah));
    const pertanyaan = buangTeksSampah(teks(data.pertanyaan));
    if (!misi || misi.length < 16 || !pertanyaan || pertanyaan.length < 12) {
      return NextResponse.json(
        {
          berhasil: false,
          pesan: "Gagal menyusun misi, silakan klik lagi.",
          bahan,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      berhasil: true,
      misi: {
        misi,
        langkah: langkah || "1. Buka lab.\n2. Ubah satu pengaturan.\n3. Catat yang berubah.",
        pertanyaan,
      },
      bahan,
    });
  } catch (error: unknown) {
    if (permintaanDibatalkan(error) || req.signal.aborted) {
      return NextResponse.json(
        { berhasil: false, pesan: "PERMINTAAN_DIBATALKAN" },
        { status: 499 },
      );
    }
    console.error("SIMULASI:", error);
    return NextResponse.json(
      { berhasil: false, pesan: pesanGalatGemini(error) },
      { status: 500 },
    );
  }
}
