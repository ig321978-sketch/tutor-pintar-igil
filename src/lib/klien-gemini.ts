import { GoogleAuth } from "google-auth-library";
import { GoogleGenAI, type Part, type Schema } from "@google/genai";

export type { Part, Schema };

export const MODEL_GEMINI_MATERI =
  process.env.GEMINI_MODEL_MATERI?.trim() ||
  process.env.GEMINI_MODEL?.trim() ||
  "gemini-3.6-flash";

export const MODEL_GEMINI_RUTIN =
  process.env.GEMINI_MODEL_RUTIN?.trim() || "gemini-3.5-flash-lite";

export const MODEL_GEMINI_TEKS = MODEL_GEMINI_MATERI;

const MODEL_CADANGAN_MATERI = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-2.5-flash-lite",
];

const MODEL_CADANGAN_RUTIN = [
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-2.5-flash-lite",
];

function bacaKredensialGoogleCloud(): Record<string, unknown> | null {
  const mentah = (
    process.env.GOOGLE_CLOUD_CREDENTIALS ||
    process.env.GOOGLE_CREDENTIALS_JSON ||
    ""
  ).trim();
  if (!mentah) return null;
  try {
    const isi = mentah.startsWith("{")
      ? mentah
      : Buffer.from(mentah, "base64").toString("utf8");
    return JSON.parse(isi) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function klienVertexSemua(): GoogleGenAI[] {
  const project =
    process.env.GOOGLE_CLOUD_PROJECT_ID?.trim() ||
    (bacaKredensialGoogleCloud()?.project_id as string | undefined)?.trim();
  const credentials = bacaKredensialGoogleCloud();
  if (!project || !credentials) return [];
  const lokasi = [
    process.env.GOOGLE_CLOUD_LOCATION?.trim(),
    "global",
    "us-central1",
  ].filter((item, indeks, daftar): item is string =>
    Boolean(item) && daftar.indexOf(item) === indeks,
  );
  return lokasi.map(
    (location) =>
      new GoogleGenAI({
        vertexai: true,
        project,
        location,
        googleAuthOptions: {
          credentials,
          projectId: project,
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        },
      }),
  );
}

function klienVertex(): GoogleGenAI | null {
  return klienVertexSemua()[0] ?? null;
}

function klienStudio(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

export function buatKlienGemini(): GoogleGenAI {
  const studio = klienStudio();
  if (studio) return studio;
  const vertex = klienVertex();
  if (vertex) return vertex;
  throw new Error("Kunci Gemini dan kredensial Google Cloud belum diisi.");
}

export function pesanGalatGemini(error: unknown): string {
  const mentah = error instanceof Error ? error.message : String(error);
  if (/prepayment credits are depleted|credits are depleted/i.test(mentah)) {
    return "Kredit prabayar Gemini di AI Studio habis. Isi ulang di https://ai.studio/projects, atau di Google Cloud Console aktifkan Vertex AI API pada proyek yang sama dengan TTS lalu beri peran Vertex AI User pada service account.";
  }
  if (/Agent Platform API has not been used|Vertex AI API has not been used|PERMISSION_DENIED/i.test(mentah)) {
    return "Proyek Google Cloud belum mengaktifkan Vertex AI. Di Cloud Console, Enable API \"Vertex AI\" pada proyek TTS, beri peran Vertex AI User pada service account, atau isi ulang kredit Gemini di https://ai.studio/projects.";
  }
  if (/RESOURCE_EXHAUSTED|429 Too Many Requests/i.test(mentah)) {
    return "Google AI sedang membatasi permintaan. Tunggu sebentar, lalu coba lagi.";
  }
  return mentah.replace(/^\[GoogleGenerativeAI Error\]:\s*/i, "").trim();
}

function daftarModel(awal: string): string[] {
  const cadangan = /lite/i.test(awal)
    ? MODEL_CADANGAN_RUTIN
    : MODEL_CADANGAN_MATERI;
  return [awal, ...cadangan.filter((nama) => nama !== awal)];
}

function jenisGalat(error: unknown): "model" | "kuota" | "api" | "lain" {
  const teks = error instanceof Error ? error.message : String(error);
  if (/prepayment|RESOURCE_EXHAUSTED|429 Too Many Requests|quota/i.test(teks)) {
    return "kuota";
  }
  if (
    /has not been used|API has not been used|it is disabled|SERVICE_DISABLED|PERMISSION_DENIED|Vertex AI API|Agent Platform API|accessNotConfigured|API has not been enabled|Vertex AI 403/i.test(
      teks,
    )
  ) {
    return "api";
  }
  if (/404|not found|NOT_FOUND|unsupported|no longer available/i.test(teks)) {
    return "model";
  }
  return "lain";
}

let sudahCobaAktifkanVertex = false;

async function cobaAktifkanVertexAi(): Promise<boolean> {
  if (sudahCobaAktifkanVertex) return false;
  sudahCobaAktifkanVertex = true;
  const layanan = ["aiplatform.googleapis.com"];
  let adaYangBerhasil = false;
  try {
    const { token, project } = await tokenGoogleCloud();
    for (const nama of layanan) {
      const respons = await fetch(
        `https://serviceusage.googleapis.com/v1/projects/${project}/services/${nama}:enable`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.info(`[gemini] enable ${nama} status=${respons.status}`);
      if (respons.status === 200 || respons.status === 409) {
        adaYangBerhasil = true;
      }
    }
    if (adaYangBerhasil) {
      await new Promise((selesai) => setTimeout(selesai, 8000));
    }
  } catch (error) {
    console.warn("[gemini] gagal mengaktifkan API Gemini:", pesanGalatGemini(error));
  }
  return adaYangBerhasil;
}

async function tokenGoogleCloud(): Promise<{ token: string; project: string }> {
  const credentials = bacaKredensialGoogleCloud();
  const project =
    process.env.GOOGLE_CLOUD_PROJECT_ID?.trim() ||
    (credentials?.project_id as string | undefined)?.trim();
  if (!credentials || !project) {
    throw new Error("Kredensial Google Cloud belum diisi.");
  }
  const auth = new GoogleAuth({
    credentials,
    projectId: project,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const klien = await auth.getClient();
  const hasil = await klien.getAccessToken();
  if (!hasil.token) throw new Error("Gagal mengambil token Google Cloud.");
  return { token: hasil.token, project };
}

function teksDariVertex(data: {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}): string {
  const teks = data.candidates?.[0]?.content?.parts
    ?.map((item) => item.text ?? "")
    .join("")
    .trim();
  if (!teks) throw new Error("AI tidak menghasilkan teks.");
  return teks;
}

async function panggilVertexKlasik(
  model: string,
  location: string,
  parts: Part[],
  schema?: Schema,
  maxOutputTokens = 8192,
): Promise<string> {
  const { token, project } = await tokenGoogleCloud();
  const host =
    location === "global"
      ? "https://aiplatform.googleapis.com"
      : `https://${location}-aiplatform.googleapis.com`;
  const url = `${host}/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`;
  const respons = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens,
        ...(schema
          ? {
              responseMimeType: "application/json",
              responseSchema: schema,
            }
          : {}),
      },
    }),
  });
  const data = (await respons.json()) as {
    error?: { message?: string; code?: number };
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  if (!respons.ok) {
    throw new Error(
      data.error?.message || `Vertex AI ${respons.status} ${model}`,
    );
  }
  return teksDariVertex(data);
}

async function panggilGemini(
  klien: GoogleGenAI,
  model: string,
  parts: Part[],
  schema?: Schema,
  maxOutputTokens = 8192,
): Promise<string> {
  const response = await klien.models.generateContent({
    model,
    contents: [{ role: "user", parts }],
    config: {
      responseMimeType: schema ? "application/json" : undefined,
      responseSchema: schema,
      maxOutputTokens,
    },
  });
  const teks = response.text?.trim();
  if (!teks) throw new Error("AI tidak menghasilkan teks.");
  return teks;
}

async function denganCadanganJalur(
  parts: Part[],
  schema: Schema | undefined,
  maxOutputTokens: number,
  model?: string,
): Promise<string> {
  const lokasiKlasik = [
    process.env.GOOGLE_CLOUD_LOCATION?.trim(),
    "us-central1",
    "global",
  ].filter((item, indeks, daftar): item is string =>
    Boolean(item) && daftar.indexOf(item) === indeks,
  );
  const models = daftarModel(model || MODEL_GEMINI_RUTIN);
  let terakhir: unknown = new Error("Google AI tidak merespons.");
  let vertexApiMati = false;

  const cobaKlasik = async (): Promise<string | null> => {
    for (const location of lokasiKlasik) {
      for (const namaModel of models) {
        try {
          const teks = await panggilVertexKlasik(
            namaModel,
            location,
            parts,
            schema,
            maxOutputTokens,
          );
          console.info(
            `[gemini] sukses via=vertex-klasik lokasi=${location} model=${namaModel}`,
          );
          return teks;
        } catch (error) {
          terakhir = error;
          const jenis = jenisGalat(error);
          console.warn(
            `[gemini] gagal via=vertex-klasik lokasi=${location} model=${namaModel} jenis=${jenis} ${pesanGalatGemini(error).slice(0, 180)}`,
          );
          if (jenis === "api") {
            vertexApiMati = true;
            return null;
          }
          if (jenis === "model") continue;
          break;
        }
      }
    }
    return null;
  };

  const studio = klienStudio();
  if (studio) {
    for (const namaModel of models) {
      try {
        const teks = await panggilGemini(
          studio,
          namaModel,
          parts,
          schema,
          maxOutputTokens,
        );
        console.info(`[gemini] sukses via=studio model=${namaModel}`);
        return teks;
      } catch (error) {
        terakhir = error;
        const jenis = jenisGalat(error);
        console.warn(
          `[gemini] gagal via=studio model=${namaModel} jenis=${jenis} ${pesanGalatGemini(error).slice(0, 180)}`,
        );
        if (jenis === "model") continue;
        break;
      }
    }
  }

  if (bacaKredensialGoogleCloud()) {
    const klasik = await cobaKlasik();
    if (klasik) return klasik;
    if (vertexApiMati && (await cobaAktifkanVertexAi())) {
      vertexApiMati = false;
      const ulang = await cobaKlasik();
      if (ulang) return ulang;
    }
  }

  if (!vertexApiMati) {
    for (const klien of klienVertexSemua()) {
      for (const namaModel of models) {
        try {
          const teks = await panggilGemini(
            klien,
            namaModel,
            parts,
            schema,
            maxOutputTokens,
          );
          console.info(`[gemini] sukses via=vertex model=${namaModel}`);
          return teks;
        } catch (error) {
          terakhir = error;
          const jenis = jenisGalat(error);
          console.warn(
            `[gemini] gagal via=vertex model=${namaModel} jenis=${jenis} ${pesanGalatGemini(error).slice(0, 180)}`,
          );
          if (jenis === "model") continue;
          break;
        }
      }
    }
  }

  if (!studio && !bacaKredensialGoogleCloud()) {
    throw new Error("Kunci Gemini dan kredensial Google Cloud belum diisi.");
  }

  throw new Error(pesanGalatGemini(terakhir));
}

export async function hasilkanJsonGemini(opsi: {
  parts: Part[];
  schema: Schema;
  maxOutputTokens?: number;
  model?: string;
}): Promise<string> {
  return denganCadanganJalur(
    opsi.parts,
    opsi.schema,
    opsi.maxOutputTokens ?? 8192,
    opsi.model ?? MODEL_GEMINI_RUTIN,
  );
}

export async function hasilkanTeksGemini(
  prompt: string,
  maxOutputTokens = 4096,
  model?: string,
): Promise<string> {
  return denganCadanganJalur(
    [{ text: prompt }],
    undefined,
    maxOutputTokens,
    model ?? MODEL_GEMINI_RUTIN,
  );
}
