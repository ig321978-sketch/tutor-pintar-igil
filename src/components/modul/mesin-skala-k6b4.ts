/**
 * Definisi Mesin Bertahap Kelas 6 Bab 4 Sub-Bab A (Skala Peluang), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK6B4. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_SKALA (A): Hitung → Tangga → Ujung → Catat   (kasus Rak Buku Dhien, Tas Bola, Roda Putar)
 *    Hitung : kejadian yang cocok (k) dari semua yang ada (n).
 *    Tangga : tempat k dari n di lima tangga (Likelihood Spectrum Scale).
 *    Ujung  : berapa yang diganti agar kejadian itu pasti (Impossible-Certain Continuum).
 *    Catat  : tempat catatan percobaan di lima tangga (Experimental Relative Frequency).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b4.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const TANGGA = ["Tidak mungkin", "Kurang mungkin", "Mungkin", "Sangat mungkin", "Pasti"];
const nomorTangga = (k: number, n: number): number => (k === 0 ? 0 : k === n ? 4 : 2 * k < n ? 1 : 2 * k === n ? 2 : 3);

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

/** Dua pengecoh bilangan yang berbeda dari jawaban dan satu sama lain, tidak negatif. */
const pengecoh = (benar: number, calon: number[]): string[] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return hasil.map(String);
};
/** Dua tangga tetangga dari tangga yang benar. */
const tetangga = (nomor: number): string[] => [nomor - 1, nomor + 1, nomor - 2, nomor + 2].filter((v) => v >= 0 && v <= 4).slice(0, 2).map((v) => TANGGA[v]);

export type KasusSkala = {
  id: string;
  nama: string;
  konteks: string;
  /** Kejadian yang dicari, mis. "buku merah". */
  sebut: string;
  /** Semua yang ada dan yang cocok. */
  n: number;
  k: number;
  /** Percobaan: banyak pengambilan dan yang cocok di antaranya. */
  putaran: number;
  muncul: number;
};

export const KASUS_SKALA: KasusSkala[] = [
  { id: "rak", nama: "Rak Buku Dhien", konteks: "Dhien mengambil satu buku dari rak tanpa melihat", sebut: "buku merah", n: 10, k: 6, putaran: 5, muncul: 4 },
  { id: "tas", nama: "Tas Bola", konteks: "Dhien mengambil satu bola dari tas tanpa melihat", sebut: "bola hijau", n: 12, k: 4, putaran: 6, muncul: 1 },
  { id: "roda", nama: "Roda Putar", konteks: "Dhien memutar roda berjuring sama besar", sebut: "juring biru", n: 9, k: 4, putaran: 8, muncul: 4 },
];

export const STASIUN_SKALA: StasiunDef[] = [
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "tangga", nama: "Tangga", ikon: "📶" },
  { id: "ujung", nama: "Ujung", ikon: "🏁" },
  { id: "catat", nama: "Catat", ikon: "📝" },
];

export function kasusMesinSkala(c: KasusSkala, idx: number): KasusMesin {
  const tangga = TANGGA[nomorTangga(c.k, c.n)];
  const catatan = TANGGA[nomorTangga(c.muncul, c.putaran)];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "hitung",
      tanya: `${c.konteks}. Semuanya ada ${c.n}, dan yang bukan ${c.sebut} ada ${c.n - c.k}. Yang ${c.sebut} ada …`,
      opsi: susunOpsi(String(c.k), pengecoh(c.k, [c.n, c.n - c.k, c.k + 1]), idx),
      benar: String(c.k),
      petunjuk: `Kurangi semua yang ada, yaitu ${c.n}, dengan yang bukan ${c.sebut}, yaitu ${c.n - c.k}.`,
    },
    {
      stasiun: "tangga",
      tanya: `${c.k} dari ${c.n} adalah ${c.sebut}. Kejadian mengambil ${c.sebut} itu …`,
      opsi: susunOpsi(tangga, tetangga(nomorTangga(c.k, c.n)), idx + 1),
      benar: tangga,
      petunjuk: `Pakai dua kali ${c.k}, yaitu ${2 * c.k}. Lihat apakah kurang dari, sama dengan, atau lebih dari ${c.n}. Nol dan semuanya adalah dua ujung.`,
    },
    {
      stasiun: "ujung",
      tanya: `Agar semua yang diambil pasti ${c.sebut}, yang bukan ${c.sebut} harus diganti. Yang diganti ada …`,
      opsi: susunOpsi(String(c.n - c.k), pengecoh(c.n - c.k, [c.k, c.n, c.n - c.k + 1]), idx + 2),
      benar: String(c.n - c.k),
      petunjuk: `Pasti berarti ${c.n} dari ${c.n}. Yang belum ${c.sebut} ada ${c.n} dikurangi ${c.k}.`,
    },
    {
      stasiun: "catat",
      tanya: `Dalam ${c.putaran} percobaan, ${c.sebut} muncul ${c.muncul} kali. Catatan percobaan itu …`,
      opsi: susunOpsi(catatan, tetangga(nomorTangga(c.muncul, c.putaran)), idx + 3),
      benar: catatan,
      petunjuk: `Pakai dua kali ${c.muncul}, yaitu ${2 * c.muncul}. Lihat apakah kurang dari, sama dengan, atau lebih dari ${c.putaran}.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.k} dari ${c.n} adalah ${c.sebut}: ${tangga.toLowerCase()}. Agar pasti, ganti ${c.n - c.k}. Percobaan ${c.muncul} dari ${c.putaran}: ${catatan.toLowerCase()}.`,
    langkah,
  };
}

export const MESIN_SKALA: DefMesin = {
  id: "mesin-skala-k6b4",
  judul: "Mesin Skala",
  selesaiId: "mesin-skala",
  stasiun: STASIUN_SKALA,
  kasus: KASUS_SKALA.map(kasusMesinSkala),
};
