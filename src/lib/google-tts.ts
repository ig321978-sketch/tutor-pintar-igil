import { GoogleAuth } from "google-auth-library";
import { suaraChirpGuru } from "@/lib/guru";
import type { KelaminTts } from "@/lib/tts";

const BATAS_KARAKTER = 900;
const LAJU_BICARA = 0.92;
const SAMPLE_RATE = 24000;
const JEDA_ANTAR_BLOK_MS = 420;

export function namaSuaraChirp(
  kelamin: KelaminTts,
  kelas = "3 SD",
): string {
  return suaraChirpGuru(kelas, kelamin === "male" ? "pria" : "wanita");
}

function bacaKredensial(): Record<string, unknown> | null {
  const mentah = process.env.GOOGLE_CLOUD_CREDENTIALS?.trim();
  if (!mentah) return null;
  try {
    if (mentah.startsWith("{")) {
      return JSON.parse(mentah) as Record<string, unknown>;
    }
    return JSON.parse(
      Buffer.from(mentah, "base64").toString("utf8"),
    ) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function ttsSiapDipakai(): boolean {
  return Boolean(
    process.env.GOOGLE_CLOUD_PROJECT_ID?.trim() && bacaKredensial(),
  );
}

async function tokenAkses(): Promise<string> {
  const credentials = bacaKredensial();
  if (!credentials) {
    throw new Error("GOOGLE_CLOUD_CREDENTIALS kosong.");
  }
  const auth = new GoogleAuth({
    credentials,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const klien = await auth.getClient();
  const hasil = await klien.getAccessToken();
  if (!hasil.token) throw new Error("Gagal mengambil token Google Cloud.");
  return hasil.token;
}

function pecahKalimat(teks: string): string[] {
  const bagian = teks.split(/(?<=[.!?…])\s+/).map((item) => item.trim()).filter(Boolean);
  const hasil: string[] = [];
  let buffer = "";
  for (const kalimat of bagian) {
    const calon = buffer ? `${buffer} ${kalimat}` : kalimat;
    if (calon.length <= BATAS_KARAKTER) {
      buffer = calon;
      continue;
    }
    if (buffer) hasil.push(buffer);
    if (kalimat.length <= BATAS_KARAKTER) {
      buffer = kalimat;
      continue;
    }
    for (let i = 0; i < kalimat.length; i += BATAS_KARAKTER) {
      hasil.push(kalimat.slice(i, i + BATAS_KARAKTER));
    }
    buffer = "";
  }
  if (buffer) hasil.push(buffer);
  return hasil;
}

export function potongNaskah(teks: string): string[] {
  const blok = teks
    .split(/\n\n+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sumber = blok.length > 0 ? blok : [teks.replace(/\s+/g, " ").trim()].filter(Boolean);
  return sumber.flatMap((item) =>
    item.length <= BATAS_KARAKTER ? [item] : pecahKalimat(item),
  );
}

function bungkusWav(pcm: Buffer, sampleRate = SAMPLE_RATE): Buffer {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

function sunyiPcm(milidetik: number, sampleRate = SAMPLE_RATE): Buffer {
  const sampel = Math.round((sampleRate * milidetik) / 1000);
  return Buffer.alloc(sampel * 2);
}

export function durasiWavDetik(wav: Buffer, sampleRate = SAMPLE_RATE): number {
  const pcm = Math.max(0, wav.length - 44);
  return Math.max(0.4, pcm / (sampleRate * 2));
}

async function sintesisSatu(
  teks: string,
  suara: string,
  token: string,
): Promise<Buffer> {
  const proyek = process.env.GOOGLE_CLOUD_PROJECT_ID ?? "";
  const respons = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
        "x-goog-user-project": proyek,
      },
      body: JSON.stringify({
        input: { text: teks },
        voice: {
          languageCode: "id-ID",
          name: suara,
        },
        audioConfig: {
          audioEncoding: "LINEAR16",
          sampleRateHertz: SAMPLE_RATE,
          speakingRate: LAJU_BICARA,
        },
      }),
    },
  );

  const data = (await respons.json()) as {
    audioContent?: string;
    error?: { message?: string; status?: string };
  };

  if (!respons.ok || !data.audioContent) {
    const status = data.error?.status || String(respons.status);
    const pesan = data.error?.message || "Sintesis Chirp gagal.";
    const galat = new Error(`${status}: ${pesan}`);
    (galat as Error & { kuota?: boolean }).kuota =
      respons.status === 429 || status === "RESOURCE_EXHAUSTED";
    throw galat;
  }

  return Buffer.from(data.audioContent, "base64");
}

export async function sintesisChirp(
  teks: string,
  suara: string,
): Promise<Buffer> {
  const token = await tokenAkses();
  const potongan = potongNaskah(teks);
  if (potongan.length === 0) {
    throw new Error("Naskah kosong.");
  }

  const pcm: Buffer[] = [];
  for (let i = 0; i < potongan.length; i += 1) {
    if (i > 0) pcm.push(sunyiPcm(JEDA_ANTAR_BLOK_MS));
    pcm.push(await sintesisSatu(potongan[i], suara, token));
  }
  return bungkusWav(Buffer.concat(pcm));
}
