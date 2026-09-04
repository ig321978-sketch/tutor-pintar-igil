import { GoogleAuth } from "google-auth-library";
import { suaraChirpGuru } from "@/lib/guru";
import type { KelaminTts } from "@/lib/tts";

const BATAS_KARAKTER = 4500;
const BATAS_AWAL = 1100;
const LAJU_BICARA = 1;
const SAMPLE_RATE = 24000;
const JEDA_ANTAR_BLOK_MS = 160;
const PARALEL_SINTESIS = 3;

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

function pecahKalimat(teks: string, batas: number): string[] {
  const bagian = teks
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const hasil: string[] = [];
  let buffer = "";
  for (const kalimat of bagian) {
    const calon = buffer ? `${buffer} ${kalimat}` : kalimat;
    if (calon.length <= batas) {
      buffer = calon;
      continue;
    }
    if (buffer) hasil.push(buffer);
    if (kalimat.length <= batas) {
      buffer = kalimat;
      continue;
    }
    for (let i = 0; i < kalimat.length; i += batas) {
      hasil.push(kalimat.slice(i, i + batas));
    }
    buffer = "";
  }
  if (buffer) hasil.push(buffer);
  return hasil;
}

function kemasParagraf(sumber: string[], batas: number): string[] {
  const hasil: string[] = [];
  let buffer = "";
  for (const item of sumber) {
    const calon = buffer ? `${buffer}\n\n${item}` : item;
    if (calon.length <= batas) {
      buffer = calon;
      continue;
    }
    if (buffer) hasil.push(buffer);
    if (item.length <= batas) {
      buffer = item;
      continue;
    }
    hasil.push(...pecahKalimat(item, batas));
    buffer = "";
  }
  if (buffer) hasil.push(buffer);
  return hasil;
}

export function potongNaskah(teks: string, batas = BATAS_KARAKTER): string[] {
  const blok = teks
    .split(/\n\n+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sumber =
    blok.length > 0
      ? blok
      : [teks.replace(/\s+/g, " ").trim()].filter(Boolean);
  return kemasParagraf(sumber, batas);
}

export function potongNaskahAwal(teks: string): string {
  return potongNaskah(teks, BATAS_AWAL)[0] ?? "";
}

function keSsml(teks: string): string {
  const paragraf = teks
    .split(/\n\n+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const isi = paragraf
    .map((item) => {
      const aman = item
        .replace(/&/g, "dan")
        .replace(/</g, " ")
        .replace(/>/g, " ");
      return `<p>${aman}</p>`;
    })
    .join('<break time="350ms"/>');
  return `<speak>${isi}</speak>`;
}

export function pcmDariAudioGoogle(buf: Buffer): Buffer {
  if (buf.length < 12 || buf.toString("ascii", 0, 4) !== "RIFF") {
    return buf;
  }

  let offset = 12;
  while (offset + 8 <= buf.length) {
    const id = buf.toString("ascii", offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    const isi = offset + 8;
    if (id === "data") {
      return buf.subarray(isi, Math.min(buf.length, isi + size));
    }
    offset = isi + size + (size % 2);
  }

  return buf.subarray(Math.min(44, buf.length));
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
  const pcm = pcmDariAudioGoogle(wav);
  return Math.max(0.4, pcm.length / (sampleRate * 2));
}

async function petaBatas<T, R>(
  daftar: T[],
  batas: number,
  kerja: (item: T, indeks: number) => Promise<R>,
): Promise<R[]> {
  const hasil = new Array<R>(daftar.length);
  let berikutnya = 0;
  const pekerja = async () => {
    while (berikutnya < daftar.length) {
      const indeks = berikutnya;
      berikutnya += 1;
      hasil[indeks] = await kerja(daftar[indeks], indeks);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(batas, daftar.length) }, () => pekerja()),
  );
  return hasil;
}

async function panggilSintesis(
  input: { ssml?: string; text?: string },
  suara: string,
  token: string,
): Promise<{ ok: boolean; audio?: Buffer; status?: string; pesan?: string; kuota?: boolean }> {
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
        input,
        voice: {
          languageCode: "id-ID",
          name: suara,
        },
        audioConfig: {
          audioEncoding: "LINEAR16",
          sampleRateHertz: SAMPLE_RATE,
          speakingRate: LAJU_BICARA,
          effectsProfileId: ["handset-class-device"],
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
    return {
      ok: false,
      status,
      pesan: data.error?.message || "Sintesis Chirp gagal.",
      kuota: respons.status === 429 || status === "RESOURCE_EXHAUSTED",
    };
  }

  return {
    ok: true,
    audio: pcmDariAudioGoogle(Buffer.from(data.audioContent, "base64")),
  };
}

async function sintesisSatu(
  teks: string,
  suara: string,
  token: string,
): Promise<Buffer> {
  const ssml = keSsml(teks);
  const utama = await panggilSintesis({ ssml }, suara, token);
  const teksPolos = teks.replace(/\s+/g, " ").trim();
  const hasil =
    utama.ok || utama.kuota
      ? utama
      : await panggilSintesis({ text: teksPolos }, suara, token);
  if (!hasil.ok || !hasil.audio) {
    const galat = new Error(`${hasil.status || "ERROR"}: ${hasil.pesan || "Sintesis Chirp gagal."}`);
    (galat as Error & { kuota?: boolean }).kuota = Boolean(hasil.kuota);
    throw galat;
  }
  return hasil.audio;
}

export async function sintesisChirp(
  teks: string,
  suara: string,
  opsi?: { awalSaja?: boolean },
): Promise<Buffer> {
  const token = await tokenAkses();
  const potongan = opsi?.awalSaja
    ? [potongNaskahAwal(teks)].filter(Boolean)
    : potongNaskah(teks);
  if (potongan.length === 0) {
    throw new Error("Naskah kosong.");
  }

  const pcmPotong = await petaBatas(
    potongan,
    PARALEL_SINTESIS,
    (item) => sintesisSatu(item, suara, token),
  );

  const pcm: Buffer[] = [];
  for (let i = 0; i < pcmPotong.length; i += 1) {
    if (i > 0) pcm.push(sunyiPcm(JEDA_ANTAR_BLOK_MS));
    pcm.push(pcmPotong[i]);
  }
  return bungkusWav(Buffer.concat(pcm));
}
