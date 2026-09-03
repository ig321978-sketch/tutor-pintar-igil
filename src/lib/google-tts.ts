import { GoogleAuth } from "google-auth-library";
import { suaraChirpGuru } from "@/lib/guru";
import type { KelaminTts } from "@/lib/tts";

const BATAS_KARAKTER = 3600;

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

function potongNaskah(teks: string): string[] {
  const bersih = teks.replace(/\s+/g, " ").trim();
  if (!bersih) return [];
  if (bersih.length <= BATAS_KARAKTER) return [bersih];

  const bagian = bersih.split(/(?<=[.!?…])\s+/);
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
          audioEncoding: "MP3",
          speakingRate: 0.94,
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
  const audio: Buffer[] = [];
  for (const bagian of potongan) {
    audio.push(await sintesisSatu(bagian, suara, token));
  }
  return Buffer.concat(audio);
}
