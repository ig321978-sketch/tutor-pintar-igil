import { createHash } from "node:crypto";
import { supabaseServer } from "@/lib/supabase";

export function kunciCacheTts(suara: string, teks: string): string {
  return createHash("sha256")
    .update(`${suara}\n${teks}`)
    .digest("hex");
}

const EMBER = process.env.SUPABASE_TTS_BUCKET || "tts-cache";

type MetaCache = {
  mime: string;
  durasiDetik: number;
  suara: string;
};

async function unduhBerkas(jalur: string) {
  const supabase = supabaseServer();
  if (!supabase) return null;
  const hasil = await supabase.storage.from(EMBER).download(jalur);
  if (hasil.error || !hasil.data) return null;
  return hasil.data;
}

export async function ambilCacheTts(
  kunci: string,
): Promise<{ audio: Buffer; meta: MetaCache } | null> {
  const metaBlob = await unduhBerkas(`${kunci}.json`);
  const audioBlob =
    (await unduhBerkas(`${kunci}.wav`)) ?? (await unduhBerkas(`${kunci}.mp3`));
  if (!metaBlob || !audioBlob) return null;

  try {
    const isiMeta = JSON.parse(await metaBlob.text()) as MetaCache;
    const buffer = Buffer.from(await audioBlob.arrayBuffer());
    if (!buffer.length) return null;
    return { audio: buffer, meta: isiMeta };
  } catch {
    return null;
  }
}

export async function simpanCacheTts(
  kunci: string,
  audio: Buffer,
  meta: MetaCache,
): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase) return;

  const ekstensi = meta.mime.includes("wav") ? "wav" : "mp3";
  const [a, b] = await Promise.all([
    supabase.storage.from(EMBER).upload(`${kunci}.${ekstensi}`, audio, {
      contentType: meta.mime,
      upsert: true,
    }),
    supabase.storage.from(EMBER).upload(
      `${kunci}.json`,
      JSON.stringify(meta),
      { contentType: "application/json", upsert: true },
    ),
  ]);
  if (a.error) console.error("Cache TTS audio:", a.error.message);
  if (b.error) console.error("Cache TTS meta:", b.error.message);
}
