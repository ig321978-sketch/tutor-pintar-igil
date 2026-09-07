import { jenjangGuru, type JenjangGuru } from "@/lib/guru";
import type { KelaminTts } from "@/lib/tts";

const URL_DASAR = "https://api.elevenlabs.io/v1";
const BATAS_KARAKTER = 4000;
const SAMPLE_RATE = 24_000;
const JEDA_ANTAR_BLOK_MS = 160;
const MODEL_BAWAAN = "eleven_multilingual_v2";

type SuaraEleven = {
  voice_id?: string;
  name?: string;
  category?: string;
  labels?: Record<string, string>;
  verified_languages?: Array<{ language?: string }>;
};

export function elevenLabsSiapDipakai(): boolean {
  return Boolean(kunciApiEleven());
}

function kunciApiEleven(): string {
  return (
    process.env.ELEVENLABS_API_KEY?.trim() ||
    process.env.ELEVEN_API_KEY?.trim() ||
    ""
  );
}

function modelEleven(): string {
  return process.env.ELEVENLABS_MODEL?.trim() || MODEL_BAWAAN;
}

type SlotSuaraGuru = {
  id: string;
  namaPustaka: string;
  guru: string;
  peran: string;
};

const SUARA_PER_JENJANG: Record<
  JenjangGuru,
  Record<KelaminTts, SlotSuaraGuru>
> = {
  SD: {
    female: {
      id: "Xb7hH8MSUJpSbSDYk0k2",
      namaPustaka: "Alice",
      guru: "Bu Sari",
      peran: "Guru SD yang sabar dan ceria, tempo pelan",
    },
    male: {
      id: "IKne3meq5aSn9XLyUdCD",
      namaPustaka: "Charlie",
      guru: "Pak Budi",
      peran: "Guru SD yang ramah dan semangat",
    },
  },
  SMP: {
    female: {
      id: "XrExE9yKIg1WjnnlVkGX",
      namaPustaka: "Matilda",
      guru: "Bu Laila",
      peran: "Guru SMP yang tegas, jelas, dan mendukung",
    },
    male: {
      id: "onwK4e9ZLuTAKqWW03F9",
      namaPustaka: "Daniel",
      guru: "Pak Andra",
      peran: "Guru SMP yang santai dan runtut",
    },
  },
  SMA: {
    female: {
      id: "EXAVITQu4vr4xnSDxMaL",
      namaPustaka: "Sarah",
      guru: "Bu Maya",
      peran: "Guru SMA yang analitis dan hangat",
    },
    male: {
      id: "JBFqnCBsd6RMkjVDRZzb",
      namaPustaka: "George",
      guru: "Pak Dimas",
      peran: "Guru SMA yang fokus dan profesional",
    },
  },
};

function slotSuaraGuru(kelas: string, kelamin: KelaminTts): SlotSuaraGuru {
  return SUARA_PER_JENJANG[jenjangGuru(kelas)][kelamin];
}

function idSuaraDariEnv(kelas: string, kelamin: KelaminTts): string {
  const jenjang = jenjangGuru(kelas);
  const akhir = kelamin === "male" ? "PRIA" : "WANITA";
  return (
    process.env[`ELEVENLABS_VOICE_${jenjang}_${akhir}`]?.trim() ||
    process.env[`ELEVENLABS_VOICE_${akhir}`]?.trim() ||
    ""
  );
}

function pengaturanSuaraJenjang(kelas: string) {
  const jenjang = jenjangGuru(kelas);
  if (jenjang === "SD") {
    return { stability: 0.62, similarity_boost: 0.72, style: 0.22, speed: 0.88 };
  }
  if (jenjang === "SMP") {
    return { stability: 0.55, similarity_boost: 0.74, style: 0.12, speed: 0.94 };
  }
  return { stability: 0.5, similarity_boost: 0.76, style: 0.08, speed: 0.98 };
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

export function potongNaskahEleven(teks: string, batas = BATAS_KARAKTER): string[] {
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

export function durasiWavEleven(wav: Buffer, sampleRate = SAMPLE_RATE): number {
  const pcm = pcmDariWav(wav);
  return Math.max(0.4, pcm.length / (sampleRate * 2));
}

let cacheSuara: SuaraEleven[] | null = null;

async function daftarSuaraEleven(
  kunci: string,
  segar = false,
): Promise<SuaraEleven[]> {
  if (cacheSuara && !segar) return cacheSuara;
  const respons = await fetch(`${URL_DASAR}/voices`, {
    headers: { "xi-api-key": kunci },
    cache: "no-store",
  });
  if (!respons.ok) return cacheSuara ?? [];
  const data = (await respons.json()) as { voices?: SuaraEleven[] };
  cacheSuara = Array.isArray(data.voices) ? data.voices : [];
  return cacheSuara;
}

export async function daftarRingkasSuaraEleven(): Promise<{
  http: number;
  jumlah: number;
  kunciJson: string[];
  suara: Array<{ id: string; nama: string; kategori: string; kelamin: string }>;
}> {
  const kunci = kunciApiEleven();
  if (!kunci) {
    return { http: 0, jumlah: 0, kunciJson: [], suara: [] };
  }
  const respons = await fetch(`${URL_DASAR}/voices`, {
    headers: { "xi-api-key": kunci },
    cache: "no-store",
  });
  const data = (await respons.json()) as {
    voices?: SuaraEleven[];
    detail?: unknown;
  };
  cacheSuara = Array.isArray(data.voices) ? data.voices : [];
  return {
    http: respons.status,
    jumlah: cacheSuara.length,
    kunciJson: Object.keys(data),
    suara: cacheSuara
      .filter((item) => item.voice_id)
      .map((item) => ({
        id: item.voice_id ?? "",
        nama: item.name ?? "",
        kategori: item.category ?? "",
        kelamin: item.labels?.gender ?? "",
      })),
  };
}

function skorSuaraMilik(
  suara: SuaraEleven,
  kelamin: KelaminTts,
  jenjang: JenjangGuru,
): number {
  const kategori = String(suara.category ?? "").toLowerCase();
  if (kategori === "premade" || kategori === "professional") return -1;
  const label = Object.values(suara.labels ?? {})
    .join(" ")
    .toLowerCase();
  const nama = `${suara.name ?? ""} ${label}`.toLowerCase();
  const bahasa = (suara.verified_languages ?? [])
    .map((item) => item.language ?? "")
    .join(" ")
    .toLowerCase();
  const cocokKelamin =
    kelamin === "male"
      ? /male|pria|man|laki/.test(nama)
      : /female|wanita|woman|perempuan/.test(nama);
  let skor = kategori === "generated" ? 40 : kategori === "cloned" ? 20 : 5;
  if (cocokKelamin) skor += 15;
  const polaJenjang =
    jenjang === "SD"
      ? /sari|budi|sd|cerita|ceria/
      : jenjang === "SMP"
        ? /laila|andra|smp/
        : /maya|dimas|sma|analitis/;
  if (polaJenjang.test(nama) || new RegExp(`igil[-_ ]?${jenjang}`, "i").test(nama)) {
    skor += 25;
  }
  if (/igil|guru/.test(nama)) skor += 8;
  if (/\bid\b|indonesia|indonesian/.test(`${nama} ${bahasa}`)) skor += 12;
  if (/narrat|teacher|educat|calm|warm|soft|friendly/.test(nama)) skor += 4;
  return skor;
}

function pilihSuaraMilik(
  daftar: SuaraEleven[],
  kelamin: KelaminTts,
  jenjang: JenjangGuru,
): string | null {
  const terpilih = [...daftar]
    .map((item) => ({ item, skor: skorSuaraMilik(item, kelamin, jenjang) }))
    .filter((item) => item.skor >= 20 && item.item.voice_id)
    .sort((a, b) => b.skor - a.skor)[0]?.item.voice_id;
  return terpilih ?? null;
}

export function klasifikasiSuaraGuruEleven(): Array<{
  jenjang: JenjangGuru;
  kelamin: KelaminTts;
  guru: string;
  peran: string;
  pustaka: string;
  id: string;
}> {
  return (["SD", "SMP", "SMA"] as JenjangGuru[]).flatMap((jenjang) =>
    (["female", "male"] as KelaminTts[]).map((kelamin) => {
      const slot = SUARA_PER_JENJANG[jenjang][kelamin];
      return {
        jenjang,
        kelamin,
        guru: slot.guru,
        peran: slot.peran,
        pustaka: slot.namaPustaka,
        id: slot.id,
      };
    }),
  );
}

export async function siapkanKeduaSuaraGuru(): Promise<{
  wanita: string;
  pria: string;
}> {
  return {
    wanita: await suaraElevenGuru("female", "4 SD"),
    pria: await suaraElevenGuru("male", "4 SD"),
  };
}

export async function suaraElevenGuru(
  kelamin: KelaminTts,
  kelas = "3 SD",
): Promise<string> {
  const dariEnv = idSuaraDariEnv(kelas, kelamin);
  if (dariEnv) return dariEnv;
  const kunci = kunciApiEleven();
  if (kunci) {
    try {
      const milik = pilihSuaraMilik(
        await daftarSuaraEleven(kunci),
        kelamin,
        jenjangGuru(kelas),
      );
      if (milik) return milik;
    } catch {
      // pakai klasifikasi jenjang
    }
  }
  return slotSuaraGuru(kelas, kelamin).id;
}

async function pesanGalatEleven(respons: Response): Promise<string> {
  try {
    const data = (await respons.json()) as {
      detail?: { message?: string; status?: string } | string;
      message?: string;
    };
    if (typeof data.detail === "string") return data.detail;
    if (data.detail?.message) return data.detail.message;
    if (data.message) return data.message;
  } catch {
    // biarkan pesan status
  }
  if (respons.status === 401) return "Kunci ElevenLabs tidak valid.";
  if (respons.status === 402) {
    return "Akun ElevenLabs gratis tidak bisa memakai suara perpustakaan lewat API. Buat 6 suara milik akun di Voice Design (SD/SMP/SMA × wanita/pria), lalu isi ELEVENLABS_VOICE_SD_WANITA sampai ELEVENLABS_VOICE_SMA_PRIA.";
  }
  return `ElevenLabs menolak permintaan (${respons.status}).`;
}

async function sintesisSatu(
  teks: string,
  voiceId: string,
  kunci: string,
  kelas: string,
  konteks?: { previous?: string; next?: string },
): Promise<Buffer> {
  const respons = await fetch(
    `${URL_DASAR}/text-to-speech/${voiceId}?output_format=pcm_24000`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "xi-api-key": kunci,
        accept: "audio/wav, audio/pcm, application/octet-stream",
      },
      body: JSON.stringify({
        text: teks,
        model_id: modelEleven(),
        voice_settings: {
          ...pengaturanSuaraJenjang(kelas),
          use_speaker_boost: true,
        },
        previous_text: konteks?.previous || undefined,
        next_text: konteks?.next || undefined,
      }),
    },
  );
  if (!respons.ok) {
    throw new Error(await pesanGalatEleven(respons));
  }
  return Buffer.from(await respons.arrayBuffer());
}

export async function sintesisElevenLabs(
  teks: string,
  kelamin: KelaminTts,
  kelas = "3 SD",
): Promise<{ audio: Buffer; mime: string; durasiDetik: number; suara: string }> {
  const kunci = kunciApiEleven();
  if (!kunci) {
    throw new Error("ELEVENLABS_API_KEY belum disetel.");
  }
  const suara = await suaraElevenGuru(kelamin, kelas);
  const potongan = potongNaskahEleven(teks);
  if (potongan.length === 0) {
    throw new Error("Naskah suara kosong.");
  }
  const pcmList: Buffer[] = [];
  for (let i = 0; i < potongan.length; i += 1) {
    const audio = await sintesisSatu(potongan[i], suara, kunci, kelas, {
      previous: potongan[i - 1],
      next: potongan[i + 1],
    });
    if (i > 0) pcmList.push(sunyiPcm(JEDA_ANTAR_BLOK_MS));
    pcmList.push(pcmDariWav(audio));
  }
  const wav = bungkusWav(Buffer.concat(pcmList));
  return {
    audio: wav,
    mime: "audio/wav",
    durasiDetik: durasiWavEleven(wav),
    suara,
  };
}
