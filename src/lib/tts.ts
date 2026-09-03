export type KelaminTts = "male" | "female";

export type KataWaktu = {
  teks: string;
  mulai: number;
  selesai: number;
};

export function normalisasiKelaminTts(nilai: unknown): KelaminTts {
  const teks = String(nilai ?? "")
    .trim()
    .toLowerCase();
  if (teks === "male" || teks === "pria" || teks === "laki-laki") return "male";
  return "female";
}

export function pecahTokenNaskah(teks: string): string[] {
  return teks.match(/\S+/g) ?? [];
}

export function waktuKataDariDurasi(teks: string, durasiDetik: number): KataWaktu[] {
  const token = pecahTokenNaskah(teks);
  if (token.length === 0 || durasiDetik <= 0) return [];

  const bobot = token.map((kata) => {
    const huruf = kata.replace(/[^\p{L}\p{N}]/gu, "").length;
    const jeda = /[.!?…]$/.test(kata) ? 3 : /[,;:]$/.test(kata) ? 1.5 : 0;
    return Math.max(1, huruf) + jeda;
  });
  const total = bobot.reduce((jumlah, nilai) => jumlah + nilai, 0);
  let jejak = 0;

  return token.map((kata, indeks) => {
    const bagian = (bobot[indeks] / total) * durasiDetik;
    const mulai = jejak;
    const selesai = indeks === token.length - 1 ? durasiDetik : jejak + bagian;
    jejak = selesai;
    return { teks: kata, mulai, selesai };
  });
}

export function skalaWaktuKata(
  daftar: KataWaktu[],
  durasiAsli: number,
  durasiNyata: number,
): KataWaktu[] {
  if (durasiAsli <= 0 || durasiNyata <= 0) return daftar;
  const rasio = durasiNyata / durasiAsli;
  return daftar.map((kata) => ({
    ...kata,
    mulai: kata.mulai * rasio,
    selesai: kata.selesai * rasio,
  }));
}

export function perkiraanDurasiMp3(byteAudio: number): number {
  const bitrate = 32000;
  return Math.max(0.4, (byteAudio * 8) / bitrate);
}
