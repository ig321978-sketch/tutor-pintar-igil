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
const sedangBuatSuara = new Map<KelaminTts, Promise<string>>();

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

function skorSuaraMilik(suara: SuaraEleven, kelamin: KelaminTts): number {
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
  if (/igil|guru|sari|budi|laila|andra|maya|dimas/.test(nama)) skor += 20;
  if (/\bid\b|indonesia|indonesian/.test(`${nama} ${bahasa}`)) skor += 12;
  if (/narrat|teacher|educat|calm|warm|soft|friendly/.test(nama)) skor += 4;
  return skor;
}

function pilihSuaraMilik(
  daftar: SuaraEleven[],
  kelamin: KelaminTts,
): string | null {
  const terpilih = [...daftar]
    .map((item) => ({ item, skor: skorSuaraMilik(item, kelamin) }))
    .filter((item) => item.skor >= 20 && item.item.voice_id)
    .sort((a, b) => b.skor - a.skor)[0]?.item.voice_id;
  return terpilih ?? null;
}

const DESKRIPSI_GURU: Record<KelaminTts, { nama: string; deskripsi: string }> = {
  female: {
    nama: "IGIL Guru Wanita",
    deskripsi:
      "A warm, patient Indonesian female elementary school teacher, mid-thirties, clear diction, gentle and cheerful, native Bahasa Indonesia accent, suitable for classroom narration.",
  },
  male: {
    nama: "IGIL Guru Pria",
    deskripsi:
      "A friendly, encouraging Indonesian male elementary school teacher, mid-thirties, clear diction, calm and energetic, native Bahasa Indonesia accent, suitable for classroom narration.",
  },
};

const TEKS_CONTOH_SUARA =
  "Hallo anak-anak, apa khabar? Hari ini kita belajar bersama dengan sabar dan ceria. Dengarkan baik-baik, ikuti langkahnya pelan-pelan, dan kamu pasti bisa memahami materinya sampai tuntas.";

async function buatSuaraGuru(
  kelamin: KelaminTts,
  kunci: string,
): Promise<string> {
  const profil = DESKRIPSI_GURU[kelamin];
  const desain = await fetch(`${URL_DASAR}/text-to-voice/design`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "xi-api-key": kunci,
    },
    body: JSON.stringify({
      voice_description: profil.deskripsi,
      text: TEKS_CONTOH_SUARA,
      auto_generate_text: false,
      model_id: "eleven_multilingual_ttv_v2",
    }),
  });
  if (!desain.ok) {
    throw new Error(
      "Akun ElevenLabs gratis tidak bisa memakai suara perpustakaan lewat API. Buka https://elevenlabs.io/app/voice-lab , buat suara Guru Wanita dan Guru Pria lewat Voice Design, lalu isi ELEVENLABS_VOICE_WANITA dan ELEVENLABS_VOICE_PRIA dengan ID suara itu.",
    );
  }
  const hasilDesain = (await desain.json()) as {
    previews?: Array<{ generated_voice_id?: string }>;
  };
  const generatedId = hasilDesain.previews?.[0]?.generated_voice_id;
  if (!generatedId) {
    throw new Error("ElevenLabs tidak mengembalikan pratinjau suara guru.");
  }
  const simpan = await fetch(`${URL_DASAR}/text-to-voice`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "xi-api-key": kunci,
    },
    body: JSON.stringify({
      voice_name: profil.nama,
      voice_description: profil.deskripsi,
      generated_voice_id: generatedId,
      labels: {
        gender: kelamin === "male" ? "male" : "female",
        language: "id",
        accent: "indonesian",
        use_case: "e-learning",
      },
    }),
  });
  if (!simpan.ok) {
    throw new Error(await pesanGalatEleven(simpan));
  }
  const tersimpan = (await simpan.json()) as { voice_id?: string };
  cacheSuara = null;
  if (!tersimpan.voice_id) {
    throw new Error("ElevenLabs gagal menyimpan suara guru.");
  }
  return tersimpan.voice_id;
}

export async function suaraElevenGuru(kelamin: KelaminTts): Promise<string> {
  const paksa =
    kelamin === "male"
      ? process.env.ELEVENLABS_VOICE_PRIA?.trim()
      : process.env.ELEVENLABS_VOICE_WANITA?.trim();
  if (paksa) return paksa;
  const kunci = kunciApiEleven();
  if (!kunci) {
    throw new Error("ELEVENLABS_API_KEY belum disetel.");
  }
  const milik = pilihSuaraMilik(await daftarSuaraEleven(kunci), kelamin);
  if (milik) return milik;
  const sedang = sedangBuatSuara.get(kelamin);
  if (sedang) return sedang;
  const buat = buatSuaraGuru(kelamin, kunci).finally(() => {
    sedangBuatSuara.delete(kelamin);
  });
  sedangBuatSuara.set(kelamin, buat);
  return buat;
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
    return "Akun ElevenLabs gratis tidak bisa memakai suara perpustakaan lewat API. Buat suara sendiri di Voice Design, lalu isi ELEVENLABS_VOICE_WANITA dan ELEVENLABS_VOICE_PRIA.";
  }
  return `ElevenLabs menolak permintaan (${respons.status}).`;
}

async function sintesisSatu(
  teks: string,
  voiceId: string,
  kunci: string,
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
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.15,
          use_speaker_boost: true,
          speed: 0.96,
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
): Promise<{ audio: Buffer; mime: string; durasiDetik: number; suara: string }> {
  const kunci = kunciApiEleven();
  if (!kunci) {
    throw new Error("ELEVENLABS_API_KEY belum disetel.");
  }
  const suara = await suaraElevenGuru(kelamin);
  const potongan = potongNaskahEleven(teks);
  if (potongan.length === 0) {
    throw new Error("Naskah suara kosong.");
  }
  const pcmList: Buffer[] = [];
  for (let i = 0; i < potongan.length; i += 1) {
    const audio = await sintesisSatu(potongan[i], suara, kunci, {
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
