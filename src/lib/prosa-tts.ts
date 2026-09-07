import type { KelaminTts } from "@/lib/tts";

const URL_DASAR = "https://api.prosa.ai/v2/speech/tts";
const BATAS_SINKRON = 280;
const BATAS_ASYNC = 4800;
const SAMPLE_RATE = 48_000;
const JEDA_ANTAR_BLOK_MS = 180;
const PARALEL_SINTESIS = 2;
const BATAS_TUNGGU_MS = 90_000;

type ModelProsa = {
  name: string;
  label?: string;
  language?: string;
  domain?: string;
  voice?: string;
  gender?: string;
};

type HasilJobProsa = {
  job_id?: string;
  status?: string;
  message?: string;
  result?: {
    data?: string;
    path?: string;
    duration?: number;
    samplerate?: number;
  };
};

export function prosaSiapDipakai(): boolean {
  return Boolean(kunciApiProsa());
}

function kunciApiProsa(): string {
  return (
    process.env.PROSA_API_KEY?.trim() ||
    process.env.PROSA_TTS_API_KEY?.trim() ||
    ""
  );
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

export function potongNaskahProsa(teks: string, batas = BATAS_ASYNC): string[] {
  const blok = teks
    .split(/\n\n+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sumber =
    blok.length > 0
      ? blok
      : [teks.replace(/\s+/g, " ").trim()].filter(Boolean);
  const hasil: string[] = [];
  let buffer = "";
  for (const item of sumber) {
    const calon = buffer ? `${buffer} ${item}` : item;
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

function pcmDariWav(buf: Buffer): Buffer {
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

export function durasiWavProsa(wav: Buffer, sampleRate = SAMPLE_RATE): number {
  const pcm = pcmDariWav(wav);
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

function tidur(ms: number): Promise<void> {
  return new Promise((selesai) => setTimeout(selesai, ms));
}

let cacheModel: ModelProsa[] | null = null;

export async function daftarModelProsa(): Promise<ModelProsa[]> {
  if (cacheModel) return cacheModel;
  const kunci = kunciApiProsa();
  if (!kunci) return [];
  const respons = await fetch(`${URL_DASAR}/models`, {
    headers: { "x-api-key": kunci },
    cache: "no-store",
  });
  if (!respons.ok) return [];
  const data = (await respons.json()) as unknown;
  const daftar = Array.isArray(data)
    ? data
    : Array.isArray((data as { models?: unknown }).models)
      ? (data as { models: unknown[] }).models
      : [];
  cacheModel = daftar.filter(
    (item): item is ModelProsa =>
      Boolean(item && typeof item === "object" && "name" in item),
  );
  return cacheModel;
}

function skorModel(model: ModelProsa, kelamin: KelaminTts): number {
  const nama = `${model.name} ${model.voice ?? ""} ${model.domain ?? ""}`.toLowerCase();
  const gender = String(model.gender ?? "").toLowerCase();
  const cocokKelamin =
    kelamin === "male"
      ? gender === "male" || /dimas|ghifari|abimana|budi|andra|dimas/.test(nama)
      : gender === "female" || /dini|amara|ocha|kinanti|dhara|sari|laila|maya/.test(nama);
  if (!cocokKelamin) return -1;
  let skor = 10;
  if (/e-?learning|narator|lirih|ramah|formal/.test(nama)) skor += 8;
  if (/dini|amara|dimas/.test(nama)) skor += 6;
  if (/energetik|iklan|expressive/.test(nama)) skor -= 2;
  return skor;
}

export async function modelProsaGuru(kelamin: KelaminTts): Promise<string> {
  const paksa =
    kelamin === "male"
      ? process.env.PROSA_MODEL_PRIA?.trim()
      : process.env.PROSA_MODEL_WANITA?.trim();
  const daftar = await daftarModelProsa();
  if (paksa && (daftar.length === 0 || daftar.some((item) => item.name === paksa))) {
    return paksa;
  }
  const terpilih = [...daftar]
    .map((item) => ({ item, skor: skorModel(item, kelamin) }))
    .filter((item) => item.skor >= 0)
    .sort((a, b) => b.skor - a.skor)[0]?.item.name;
  if (terpilih) return terpilih;
  return kelamin === "male" ? "tts-dimas-formal" : "tts-dini";
}

async function ambilAudioHasil(hasil: HasilJobProsa["result"]): Promise<Buffer> {
  if (hasil?.data) return Buffer.from(hasil.data, "base64");
  if (hasil?.path) {
    const respons = await fetch(hasil.path);
    if (!respons.ok) {
      throw new Error("Gagal mengunduh audio Prosa.");
    }
    return Buffer.from(await respons.arrayBuffer());
  }
  throw new Error("Respons Prosa tidak berisi audio.");
}

async function tungguJob(jobId: string, kunci: string): Promise<Buffer> {
  const mulai = Date.now();
  while (Date.now() - mulai < BATAS_TUNGGU_MS) {
    const respons = await fetch(`${URL_DASAR}/${jobId}`, {
      headers: { "x-api-key": kunci },
      cache: "no-store",
    });
    const job = (await respons.json()) as HasilJobProsa;
    if (job.status === "complete" && job.result) {
      return ambilAudioHasil(job.result);
    }
    if (
      job.status === "failed" ||
      job.status === "error" ||
      job.status === "cancelled"
    ) {
      throw new Error(job.message || "Sintesis Prosa gagal.");
    }
    await tidur(1000);
  }
  throw new Error("Penyusunan suara Prosa terlalu lama.");
}

async function sintesisSatu(
  teks: string,
  model: string,
  kunci: string,
): Promise<Buffer> {
  const wait = teks.length <= BATAS_SINKRON;
  const respons = await fetch(URL_DASAR, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": kunci,
    },
    body: JSON.stringify({
      config: {
        model,
        wait,
        pitch: 0,
        tempo: 1,
        audio_format: "wav",
      },
      request: {
        label: "igil-tutor",
        text: teks,
      },
    }),
  });
  const job = (await respons.json()) as HasilJobProsa;
  if (!respons.ok && !job.job_id) {
    throw new Error(job.message || `Prosa TTS menolak permintaan (${respons.status}).`);
  }
  if (job.status === "complete" && job.result) {
    return ambilAudioHasil(job.result);
  }
  if (job.job_id) return tungguJob(job.job_id, kunci);
  throw new Error(job.message || "Prosa TTS tidak mengembalikan audio.");
}

export async function sintesisProsa(
  teks: string,
  kelamin: KelaminTts,
): Promise<{ audio: Buffer; mime: string; durasiDetik: number; model: string }> {
  const kunci = kunciApiProsa();
  if (!kunci) {
    throw new Error("PROSA_API_KEY belum disetel.");
  }
  const model = await modelProsaGuru(kelamin);
  const potongan = potongNaskahProsa(teks);
  if (potongan.length === 0) {
    throw new Error("Naskah suara kosong.");
  }
  const audioList = await petaBatas(potongan, PARALEL_SINTESIS, (bagian) =>
    sintesisSatu(bagian, model, kunci),
  );
  const pcm = Buffer.concat(
    audioList.flatMap((buf, indeks) =>
      indeks === 0
        ? [pcmDariWav(buf)]
        : [sunyiPcm(JEDA_ANTAR_BLOK_MS), pcmDariWav(buf)],
    ),
  );
  const audio = bungkusWav(pcm);
  return {
    audio,
    mime: "audio/wav",
    durasiDetik: durasiWavProsa(audio),
    model,
  };
}
