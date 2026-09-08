import { createHash } from "node:crypto";

export function kunciCacheTts(suara: string, teks: string): string {
  return createHash("sha256")
    .update(`${suara}\n${teks}`)
    .digest("hex");
}

export function kunciNaskahTts(
  suara: string,
  naskahTubuh: string,
  awalSaja: boolean,
): string {
  return kunciCacheTts(
    suara,
    `${awalSaja ? "awal" : "penuh"}\nlisan-v9-komponen\n${naskahTubuh}`,
  );
}

type MetaCache = {
  mime: string;
  durasiDetik: number;
  suara: string;
};

export async function ambilCacheTts(
  _kunci?: string,
): Promise<{ audio: Buffer; meta: MetaCache } | null> {
  return null;
}

export async function simpanCacheTts(
  _kunci?: string,
  _audio?: Buffer,
  _meta?: MetaCache,
): Promise<void> {
  return;
}
