/**
 * Dua definisi Mesin Bertahap Kelas 4 Bab 3, dijalankan mesin berstasiun mesin-bertahap-k3b1.ts.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari kasusnya.
 *  - MESIN_POLA_GAMBAR   (A): Hitung → Selisih → Jenis → Lanjut         (jeruk 2,4,6; permen 9,7,5; bintang 12,9,6)
 *  - MESIN_POLA_BILANGAN (B): Selisih → Jenis → Lanjut → Dua Langkah    (3,5,7,9,11; 32,28,24,20,16; 7,19,31,43)
 * Pengecoh bersumber dari kesalahan umum: tanda selisih terbalik, selisih suku pertama dan ketiga (dua kali beda),
 * melanjutkan ke arah yang salah, dan menambah satu saja. Murni: tanpa React, tanpa jaringan. Hanya impor tipe.
 * Diuji di scripts/uji-lab-k4b3.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0 && v !== benar).map(String));
export const teksBedaM = (d: number): string => (d > 0 ? `+${d}` : d < 0 ? `−${-d}` : "0");
const bedaKata = (d: number): string => (d > 0 ? `tambah ${d}` : d < 0 ? `kurang ${-d}` : "tetap");
const jenisM = (d: number): string => (d > 0 ? "membesar" : d < 0 ? "mengecil" : "tetap");
const operasiM = (a: number, d: number): string => `${a} ${d >= 0 ? "+" : "−"} ${Math.abs(d)}`;
const JENIS = ["membesar", "mengecil", "tetap"];

/* ------------------------------ A: Mesin Pola Gambar ------------------------------ */

export type KasusPolaGambar = { id: string; benda: string; s: number[] };
export const KASUS_POLA_GAMBAR: KasusPolaGambar[] = [
  { id: "jeruk", benda: "jeruk", s: [2, 4, 6] },
  { id: "permen", benda: "permen", s: [9, 7, 5] },
  { id: "bintang", benda: "bintang", s: [12, 9, 6] },
];

export const STASIUN_POLA_GAMBAR: StasiunDef[] = [
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "selisih", nama: "Selisih", ikon: "↔️" },
  { id: "jenis", nama: "Jenis", ikon: "📈" },
  { id: "lanjut", nama: "Lanjut", ikon: "➡️" },
];

export function kasusMesinPolaGambar(k: KasusPolaGambar, idx: number): KasusMesin {
  const { s, benda } = k;
  const d = s[1] - s[0];
  const akhir = s[s.length - 1];
  const lanjut = akhir + d;
  const atas = Math.ceil(s[1] / 2);
  const bawah = s[1] - atas;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "hitung",
      tanya: `Kumpulan ${benda} ke-2 tersusun dua baris: ${atas} di baris atas dan ${bawah} di baris bawah. Ada berapa ${benda}?`,
      opsi: susunOpsi(String(s[1]), angkaPengecoh(s[1], [atas, s[1] + 1, s[1] - 1]), idx),
      benar: String(s[1]),
      petunjuk: `Lihat kelompoknya: baris atas dan baris bawah digabung, ${atas} + ${bawah}.`,
    },
    {
      stasiun: "selisih",
      tanya: `Kumpulan ke-1 berisi ${s[0]}, kumpulan ke-2 berisi ${s[1]}, kumpulan ke-3 berisi ${s[2]}. Selisih tiap kumpulan adalah…`,
      opsi: susunOpsi(teksBedaM(d), duaPengecoh(teksBedaM(d), [teksBedaM(-d), teksBedaM(s[2] - s[0]), teksBedaM(d + 1)]), idx + 1),
      benar: teksBedaM(d),
      petunjuk: `Bandingkan dua kumpulan yang berurutan, bukan kumpulan ke-1 dan ke-3. Dari ${s[0]} ke ${s[1]} banyaknya ${d > 0 ? "bertambah" : "berkurang"} ${Math.abs(d)}.`,
    },
    {
      stasiun: "jenis",
      tanya: `Banyak ${benda}: ${s.join(", ")}. Pola gambar ini…`,
      opsi: susunOpsi(jenisM(d), JENIS.filter((j) => j !== jenisM(d)), idx + 2),
      benar: jenisM(d),
      petunjuk: `Banyak ${benda} ${d > 0 ? "bertambah, jadi pola membesar" : "berkurang, jadi pola mengecil"}. Pola tetap berarti banyaknya tidak berubah.`,
    },
    {
      stasiun: "lanjut",
      tanya: `Kumpulan ${benda} ke-4 berisi…`,
      opsi: susunOpsi(String(lanjut), angkaPengecoh(lanjut, [akhir - d, akhir + 2 * d, akhir + 1, akhir - 1]), idx),
      benar: String(lanjut),
      petunjuk: `Lanjutkan dengan selisih yang sama dan arah yang sama: ${operasiM(akhir, d)}.`,
    },
  ];
  return { id: k.id, nama: `${benda} ${s.join(", ")}`, ringkas: `Pola ${benda} ${s.join(", ")}: selisih ${bedaKata(d)}, ${jenisM(d)}, kumpulan ke-4 = ${lanjut}.`, langkah };
}

export const MESIN_POLA_GAMBAR: DefMesin = {
  id: "mesin-pola-gambar-k4b3",
  judul: "Mesin Pola Gambar",
  selesaiId: "mesin-pola-gambar",
  stasiun: STASIUN_POLA_GAMBAR,
  kasus: KASUS_POLA_GAMBAR.map(kasusMesinPolaGambar),
};

/* ------------------------------ B: Mesin Pola Bilangan ------------------------------ */

export type KasusPolaBilangan = { id: string; s: number[] };
export const KASUS_POLA_BILANGAN: KasusPolaBilangan[] = [
  { id: "ganjil", s: [3, 5, 7, 9, 11] },
  { id: "empat", s: [32, 28, 24, 20, 16] },
  { id: "dua-belas", s: [7, 19, 31, 43] },
];

export const STASIUN_POLA_BILANGAN: StasiunDef[] = [
  { id: "selisih", nama: "Selisih", ikon: "↔️" },
  { id: "jenis", nama: "Jenis", ikon: "📈" },
  { id: "lanjut", nama: "Lanjut", ikon: "➡️" },
  { id: "dua", nama: "Dua Langkah", ikon: "⏩" },
];

export function kasusMesinPolaBilangan(k: KasusPolaBilangan, idx: number): KasusMesin {
  const { s } = k;
  const d = s[1] - s[0];
  const n = s.length;
  const akhir = s[n - 1];
  const satu = akhir + d;
  const dua = akhir + 2 * d;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "selisih",
      tanya: `Pola bilangan ${s.join(", ")}. Beda tiap suku adalah…`,
      opsi: susunOpsi(teksBedaM(d), duaPengecoh(teksBedaM(d), [teksBedaM(-d), teksBedaM(s[2] - s[0]), teksBedaM(d + 1)]), idx + 1),
      benar: teksBedaM(d),
      petunjuk: `Kurangkan dua suku yang berurutan: dari ${s[0]} ke ${s[1]} ${d > 0 ? "bertambah" : "berkurang"} ${Math.abs(d)}. Periksa pasangan lain, bedanya sama.`,
    },
    {
      stasiun: "jenis",
      tanya: `Pola bilangan ${s.join(", ")} termasuk pola…`,
      opsi: susunOpsi(jenisM(d), JENIS.filter((j) => j !== jenisM(d)), idx),
      benar: jenisM(d),
      petunjuk: `Beda ${teksBedaM(d)}: ${d > 0 ? "bilangan makin besar, jadi pola membesar" : "bilangan makin kecil, jadi pola mengecil"}.`,
    },
    {
      stasiun: "lanjut",
      tanya: `Suku ke-${n + 1} dari pola ${s.join(", ")} adalah…`,
      opsi: susunOpsi(String(satu), angkaPengecoh(satu, [akhir - d, akhir + d + 1, akhir + 2 * d]), idx + 2),
      benar: String(satu),
      petunjuk: `Suku berikutnya = suku terakhir dengan beda yang sama: ${operasiM(akhir, d)}.`,
    },
    {
      stasiun: "dua",
      tanya: `Suku ke-${n + 2} dari pola ${s.join(", ")} adalah…`,
      opsi: susunOpsi(String(dua), angkaPengecoh(dua, [satu, akhir + 3 * d, dua + 1]), idx + 1),
      benar: String(dua),
      petunjuk: `Melangkah dua kali: ${operasiM(akhir, d)} = ${satu}, lalu ${operasiM(satu, d)}.`,
    },
  ];
  return { id: k.id, nama: s.join(", "), ringkas: `Pola bilangan ${s.join(", ")}: beda ${bedaKata(d)}, ${jenisM(d)}, suku ke-${n + 1} = ${satu}, suku ke-${n + 2} = ${dua}.`, langkah };
}

export const MESIN_POLA_BILANGAN: DefMesin = {
  id: "mesin-pola-bilangan-k4b3",
  judul: "Mesin Pola Bilangan",
  selesaiId: "mesin-pola-bilangan",
  stasiun: STASIUN_POLA_BILANGAN,
  kasus: KASUS_POLA_BILANGAN.map(kasusMesinPolaBilangan),
};

export const SEMUA_MESIN_K4B3 = [MESIN_POLA_GAMBAR, MESIN_POLA_BILANGAN];
