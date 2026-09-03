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

export async function ambilCacheTts(
  kunci: string,
): Promise<{ audio: Buffer; meta: MetaCache } | null> {
  const supabase = supabaseServer();
  if (!supabase) return null;

  const audio = await supabase.storage.from(EMBER).download(`${kunci}.mp3`);
  const meta = await supabase.storage.from(EMBER).download(`${kunci}.json`);
  if (audio.error || meta.error || !audio.data || !meta.data) return null;

  try {
    const isiMeta = JSON.parse(await meta.data.text()) as MetaCache;
    const buffer = Buffer.from(await audio.data.arrayBuffer());
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

  const unggahAudio = supabase.storage.from(EMBER).upload(`${kunci}.mp3`, audio, {
    contentType: meta.mime,
    upsert: true,
  });
  const unggahMeta = supabase.storage.from(EMBER).upload(
    `${kunci}.json`,
    JSON.stringify(meta),
    { contentType: "application/json", upsert: true },
  );

  const [a, b] = await Promise.all([unggahAudio, unggahMeta]);
  if (a.error) console.error("Cache TTS audio:", a.error.message);
  if (b.error) console.error("Cache TTS meta:", b.error.message);
}
