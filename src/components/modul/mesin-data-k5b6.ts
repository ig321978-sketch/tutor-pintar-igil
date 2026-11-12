/**
 * Definisi Mesin Bertahap Kelas 5 Bab 6 (Sudut), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK5B6.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari ukuran pojok tiap kasus (ukuran hanya dipakai untuk menimbang, tidak
 * pernah ditulis di layar).
 *  - MESIN_POJOK (A): Temukan → Patokan → Banding → Putuskan   (kasus Bingkai Foto, Pintu Lemari, Papan Meja)
 *    Temukan  : banyak pojok yang berimpit dengan patokan siku-siku.
 *    Patokan  : banyak pojok yang tidak berimpit.
 *    Banding  : jenis pojok yang tidak berimpit (lancip atau tumpul).
 *    Putuskan : pakai pojok itu atau ganti.
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab A (pojok bingkai, penggaris siku, patokan lipatan).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b6.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama dari kandidat: bulat tak negatif, unik, bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2]) {
    if (hasil.length < 2 && n >= 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

const SIKU = 90;
const URUT = ["pertama", "kedua", "ketiga", "keempat"];
const JENIS = (deg: number): "lancip" | "siku-siku" | "tumpul" => (deg < SIKU ? "lancip" : deg === SIKU ? "siku-siku" : "tumpul");

/* ------------------------------ A: Mesin Pojok ------------------------------ */

/** pojok: ukuran tiap pojok (derajat). banding: pojok yang tidak siku yang dibandingkan. putuskan: pojok yang diputuskan dipakai atau diganti. */
export type KasusPojok = { id: string; nama: string; konteks: string; pojok: number[]; banding: number; putuskan: number };
export const KASUS_POJOK: KasusPojok[] = [
  { id: "bingkai", nama: "Bingkai Foto", konteks: "Pak Tukang memeriksa keempat pojok kayu bingkai foto", pojok: [90, 90, 90, 50], banding: 3, putuskan: 0 },
  { id: "lemari", nama: "Pintu Lemari", konteks: "Pak Tukang memeriksa keempat pojok papan pintu lemari", pojok: [90, 90, 60, 120], banding: 3, putuskan: 2 },
  { id: "meja", nama: "Papan Meja", konteks: "Pak Tukang memeriksa keempat pojok papan meja", pojok: [60, 120, 60, 120], banding: 0, putuskan: 1 },
];

export const STASIUN_POJOK: StasiunDef[] = [
  { id: "temukan", nama: "Temukan", ikon: "🕵️" },
  { id: "patokan", nama: "Patokan", ikon: "📄" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "putuskan", nama: "Putuskan", ikon: "✅" },
];

/** Banyak pojok yang berimpit dengan patokan siku-siku. */
export const banyakSiku = (pojok: number[]): number => pojok.filter((d) => d === SIKU).length;
export const letakPojok = (deg: number): "berimpit dengan" | "masuk ke dalam" | "keluar dari" => (deg === SIKU ? "berimpit dengan" : deg < SIKU ? "masuk ke dalam" : "keluar dari");

export function kasusMesinPojok(c: KasusPojok, idx: number): KasusMesin {
  const n = c.pojok.length;
  const s = banyakSiku(c.pojok);
  const bd = c.pojok[c.banding];
  const pt = c.pojok[c.putuskan];
  const jenisB = JENIS(bd);
  const jenisSalah = (["lancip", "siku-siku", "tumpul"] as const).filter((j) => j !== jenisB);
  const keputusanBenar = pt === SIKU ? "pakai pojok itu" : `ganti, pojok itu ${JENIS(pt)}`;
  const keputusanSemua = ["pakai pojok itu", "ganti, pojok itu lancip", "ganti, pojok itu tumpul"];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "temukan",
      tanya: `${c.konteks}. Patokan siku-siku ditempel satu per satu pada keempat pojok. Banyak pojok yang berimpit dengan patokan adalah …`,
      opsi: susunOpsi(`${s} pojok`, pengecoh(s, [n - s, n]).map((v) => `${v} pojok`), idx),
      benar: `${s} pojok`,
      petunjuk: "Yang dihitung hanya pojok yang sisinya berimpit rapi dengan patokan. Pojok yang ada celahnya tidak ikut dihitung.",
    },
    {
      stasiun: "patokan",
      tanya: `Dari keempat pojok ${c.nama.toLowerCase()}, banyak pojok yang tidak berimpit dengan patokan adalah …`,
      opsi: susunOpsi(`${n - s} pojok`, pengecoh(n - s, [s, n]).map((v) => `${v} pojok`), idx + 1),
      benar: `${n - s} pojok`,
      petunjuk: "Pojok yang berimpit dengan patokan itu siku-siku. Sisanya tidak berimpit, jadi bukan siku-siku.",
    },
    {
      stasiun: "banding",
      tanya: `Pojok ${URUT[c.banding]} tidak berimpit dengan patokan. Sisinya ${letakPojok(bd)} patokan. Pojok itu termasuk …`,
      opsi: susunOpsi(jenisB, [...jenisSalah], idx + 2),
      benar: jenisB,
      petunjuk: "Sisi yang masuk ke dalam patokan berarti lebih sempit, yaitu lancip. Sisi yang keluar dari patokan berarti lebih lebar, yaitu tumpul. Berimpit berarti siku-siku.",
    },
    {
      stasiun: "putuskan",
      tanya: `Bingkai harus tepat siku-siku. Sisi pojok ${URUT[c.putuskan]} ${letakPojok(pt)} patokan. Keputusan Pak Tukang …`,
      opsi: susunOpsi(keputusanBenar, keputusanSemua.filter((o) => o !== keputusanBenar), idx + 3),
      benar: keputusanBenar,
      petunjuk: "Pojok yang berimpit dengan patokan boleh dipakai. Pojok yang masuk ke dalam atau keluar dari patokan harus diganti.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Dari ${n} pojok, ${s} pojok berimpit dengan patokan siku-siku dan ${n - s} pojok tidak berimpit. Pojok ${URUT[c.banding]} ${letakPojok(bd)} patokan, jadi ${jenisB}. Pojok ${URUT[c.putuskan]}: ${keputusanBenar}.`,
    langkah,
  };
}

export const MESIN_POJOK: DefMesin = {
  id: "mesin-pojok-k5b6",
  judul: "Mesin Pojok",
  selesaiId: "mesin-pojok",
  stasiun: STASIUN_POJOK,
  kasus: KASUS_POJOK.map(kasusMesinPojok),
};

export const SEMUA_MESIN_K5B6 = [MESIN_POJOK];
