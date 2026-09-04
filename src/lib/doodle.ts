import { GoogleGenAI } from "@google/genai";
import { JUMLAH_KARTU_MAKS, susunKonsepMateri, UKURAN_BATCH_DOODLE } from "@/lib/konsep-materi";

export type UkuranDoodle = "kecil" | "sedang" | "lebar";

export type GambarSisipan = {
  setelahParagraf: number;
  src: string;
  alt: string;
  ukuran: UkuranDoodle;
};

const MODEL_UTAMA = "gemini-3.1-flash-lite-image";
const MODEL_CADANGAN = "gemini-3.1-flash-image";

function gayaDoodle(kelas: string): string {
  const k = kelas.toUpperCase();
  const tinta =
    "monochrome navy ink only (#1C01A5), cream paper, no other colors, no teal, no amber, no yellow, no rainbow";
  if (/\b(10|11|12|SMA|SMK)\b/.test(k)) {
    return `teen sketchbook doodle, slightly messy confident ink lines, ${tinta}, witty educational, cool enough for a 16-year-old, not childish, not kawaii baby`;
  }
  if (/\b(7|8|9|SMP)\b/.test(k)) {
    return `middle-school notebook doodle, energetic but neat ink, ${tinta}, fun and clever, not babyish`;
  }
  return `friendly educational doodle for elementary students, hand-drawn marker, ${tinta}, cute but not toddler or baby cartoon`;
}

export function promptDoodle(opsi: {
  kelas: string;
  mapel: string;
  materi: string;
  scene: string;
  peran: "hero" | "sisipan" | "kartu";
}): string {
  const komposisi =
    opsi.peran === "hero"
      ? "Wide landscape composition filling the frame, one clear main scene, like a hand-drawn chapter opener in a student journal."
      : opsi.peran === "kartu"
        ? "Tight square thumbnail. One simple object or tiny scene centered with lots of cream margin. Sized to sit in a small infographic card, not a wide poster."
        : "Focused smaller scene of one analogy or object, like a doodle drawn in the margin of a notebook.";

  return `Create a single hand-drawn doodle sketch illustration.
Audience: Indonesian students, class ${opsi.kelas}, subject ${opsi.mapel}, topic ${opsi.materi}.
Style: ${gayaDoodle(opsi.kelas)}. Flat cream paper background with faint paper grain. Slightly wobbly ink contours and graphite shading. ONE COLOR ONLY: navy ink #1C01A5 on cream paper. No teal, no amber, no extra accent colors.
${komposisi}
Scene to draw: ${opsi.scene}
Hard rules: Draw the scene directly on the paper. Do NOT draw a notebook, open book, spiral binding, page border, or picture-in-picture frame. NO written text, letters, numbers, captions, watermarks, logos, speech-bubble words, or UI chrome. NOT photoreal, NOT 3D CGI, NOT clipart, NOT vector icons, NOT babyish mascots, NOT glossy cartoon. It must look like a skilled student sketched the scene itself in a journal.`;
}

export function pecahSketsaKartu(teks: string): string[] {
  return teks
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function rencanakanSisipan(
  jumlahParagraf: number,
  offset = 0,
  batas = UKURAN_BATCH_DOODLE,
): { setelahParagraf: number; ukuran: UkuranDoodle }[] {
  const total = Math.min(Math.max(jumlahParagraf, 1), JUMLAH_KARTU_MAKS);
  const mulai = Math.min(Math.max(offset, 0), total);
  const akhir = Math.min(total, mulai + Math.max(batas, 1));
  return Array.from({ length: Math.max(0, akhir - mulai) }, (_, indeks) => ({
    setelahParagraf: mulai + indeks + 1,
    ukuran: "kecil" as const,
  }));
}

function rasioUntuk(ukuran: UkuranDoodle, peran: "hero" | "sisipan" | "kartu"): string {
  if (peran === "kartu") return "1:1";
  if (peran === "hero") return "16:9";
  if (ukuran === "kecil") return "1:1";
  return "4:3";
}

async function hasilkanSatuGambar(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  aspectRatio: string,
): Promise<string | null> {
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      abortSignal: AbortSignal.timeout(45000),
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio,
        imageSize: "1K",
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      const mime = part.inlineData.mimeType || "image/png";
      return `data:${mime};base64,${part.inlineData.data}`;
    }
  }
  return null;
}

async function hasilkanDenganCadangan(
  ai: GoogleGenAI,
  prompt: string,
  aspectRatio: string,
): Promise<string | null> {
  try {
    const utama = await hasilkanSatuGambar(ai, MODEL_UTAMA, prompt, aspectRatio);
    if (utama) return utama;
  } catch (error) {
    console.error("Doodle model utama gagal:", error);
  }

  try {
    return await hasilkanSatuGambar(ai, MODEL_CADANGAN, prompt, aspectRatio);
  } catch (error) {
    console.error("Doodle model cadangan gagal:", error);
    return null;
  }
}

export async function buatPaketDoodle(opsi: {
  apiKey: string;
  kelas: string;
  mapel: string;
  materi: string;
  penjelasan: string;
  sketsaKartu?: string;
  offset?: number;
  batas?: number;
}): Promise<{ gambarUtama: string | null; gambarSisipan: GambarSisipan[] }> {
  const ai = new GoogleGenAI({ apiKey: opsi.apiKey });
  const kartu = susunKonsepMateri(opsi.materi, opsi.penjelasan).kartu;
  const rencana = rencanakanSisipan(
    kartu.length,
    opsi.offset ?? 0,
    opsi.batas ?? UKURAN_BATCH_DOODLE,
  );
  const daftarSketsa = pecahSketsaKartu(opsi.sketsaKartu ?? "");

  const tugasKartu = rencana.map((item) => {
    const indeks = item.setelahParagraf - 1;
    const judul = kartu[indeks]?.judul || opsi.materi;
    const scene =
      daftarSketsa[indeks] ||
      `A tiny one-object doodle illustrating ${judul} for ${opsi.mapel}: ${opsi.materi}`;
    return hasilkanDenganCadangan(
      ai,
      promptDoodle({
        kelas: opsi.kelas,
        mapel: opsi.mapel,
        materi: opsi.materi,
        scene,
        peran: "kartu",
      }),
      rasioUntuk(item.ukuran, "kartu"),
    );
  });

  const sumberKartu = await Promise.all(tugasKartu);

  const gambarSisipan: GambarSisipan[] = [];
  sumberKartu.forEach((src, indeks) => {
    if (!src) return;
    const item = rencana[indeks];
    if (!item) return;
    const judul = kartu[item.setelahParagraf - 1]?.judul || opsi.materi;
    gambarSisipan.push({
      setelahParagraf: item.setelahParagraf,
      src,
      alt: `Doodle ${judul}`,
      ukuran: "kecil",
    });
  });

  return {
    gambarUtama: gambarSisipan[0]?.src ?? null,
    gambarSisipan,
  };
}
