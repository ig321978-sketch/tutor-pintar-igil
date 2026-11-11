/**
 * Lab Cetak Permukaan (Kelas 2 Bab 3, Sub-Bab C): model PhET yang menghubungkan bangun ruang dengan bangun datar.
 * Anak memilih bangun ruang dan satu permukaannya, lalu mencetaknya pada kertas.
 * Permukaan datar menghasilkan cetakan bangun datar (segi empat atau lingkaran). Permukaan lengkung tidak
 * menghasilkan cetakan yang rapi. Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b3.mjs.
 */

export type RuangCetak = "kubus" | "balok" | "tabung" | "kerucut" | "bola";
export type JenisPermukaan = "datar" | "lengkung";
export type BentukCetak = "persegi" | "persegiPanjang" | "lingkaran";

export const URUT_CETAK: RuangCetak[] = ["kubus", "balok", "tabung", "kerucut", "bola"];

export const NAMA_CETAK: Record<RuangCetak, string> = {
  kubus: "Kubus",
  balok: "Balok",
  tabung: "Tabung",
  kerucut: "Kerucut",
  bola: "Bola",
};

export const NAMA_BENTUK_CETAK: Record<BentukCetak, string> = {
  persegi: "Segi empat yang sama sisinya",
  persegiPanjang: "Segi empat yang berbeda sisinya",
  lingkaran: "Lingkaran",
};

export type Permukaan = { id: string; nama: string; jenis: JenisPermukaan; bentuk?: BentukCetak };

export const PERMUKAAN: Record<RuangCetak, Permukaan[]> = {
  kubus: [{ id: "sisi", nama: "Satu sisi kubus", jenis: "datar", bentuk: "persegi" }],
  balok: [
    { id: "besar", nama: "Sisi besar", jenis: "datar", bentuk: "persegiPanjang" },
    { id: "kecil", nama: "Sisi kecil", jenis: "datar", bentuk: "persegiPanjang" },
  ],
  tabung: [
    { id: "alas", nama: "Alas tabung", jenis: "datar", bentuk: "lingkaran" },
    { id: "selimut", nama: "Selimut tabung", jenis: "lengkung" },
  ],
  kerucut: [
    { id: "alas", nama: "Alas kerucut", jenis: "datar", bentuk: "lingkaran" },
    { id: "selimut", nama: "Selimut kerucut", jenis: "lengkung" },
  ],
  bola: [{ id: "kulit", nama: "Kulit bola", jenis: "lengkung" }],
};

export const awalPermukaan = (r: RuangCetak): string => PERMUKAAN[r][0].id;

export const cariPermukaan = (r: RuangCetak, id: string): Permukaan => PERMUKAAN[r].find((p) => p.id === id) ?? PERMUKAAN[r][0];

export type Cetakan = {
  ada: boolean;
  bentuk: BentukCetak | null;
  nama: string;
  sisiLurus: number;
  sudut: number;
  catatan: string;
};

/** Hasil mencetak satu permukaan. */
export function cetak(r: RuangCetak, id: string): Cetakan {
  const p = cariPermukaan(r, id);
  if (p.jenis === "lengkung" || !p.bentuk) {
    return {
      ada: false,
      bentuk: null,
      nama: "Tidak ada cetakan yang rapi",
      sisiLurus: 0,
      sudut: 0,
      catatan:
        r === "bola"
          ? "Bola tidak punya permukaan datar, jadi tidak ada yang bisa dicetak."
          : `${p.nama} melengkung, jadi tidak menghasilkan cetakan yang rapi.`,
    };
  }
  if (p.bentuk === "lingkaran") {
    return { ada: true, bentuk: "lingkaran", nama: NAMA_BENTUK_CETAK.lingkaran, sisiLurus: 0, sudut: 0, catatan: `${p.nama} berbentuk lingkaran. Lingkaran dibatasi garis lengkung, jadi tidak punya sisi lurus.` };
  }
  return {
    ada: true,
    bentuk: p.bentuk,
    nama: NAMA_BENTUK_CETAK[p.bentuk],
    sisiLurus: 4,
    sudut: 4,
    catatan:
      p.bentuk === "persegi"
        ? `${p.nama} berbentuk segi empat yang sama sisinya. Punya 4 sisi lurus dan 4 sudut.`
        : `${p.nama} berbentuk segi empat yang sisinya tidak semuanya sama. Punya 4 sisi lurus dan 4 sudut.`,
  };
}

/** Ukuran gambar cetakan di kanvas 100 × 100 (lebar, tinggi; lingkaran memakai jari-jari = lebar / 2). */
export function ukuranCetakan(r: RuangCetak, id: string): { w: number; h: number } {
  const c = cetak(r, id);
  if (c.bentuk === "persegi") return { w: 44, h: 44 };
  if (c.bentuk === "lingkaran") return { w: 44, h: 44 };
  if (c.bentuk === "persegiPanjang") return id === "besar" ? { w: 64, h: 44 } : { w: 44, h: 28 };
  return { w: 0, h: 0 };
}

export const banyakDatar = (r: RuangCetak) => ({ kubus: 6, balok: 6, tabung: 2, kerucut: 1, bola: 0 })[r];

export type BarisCetak = { ruang: RuangCetak; nama: string; datar: number; cetakan: string };

/** Tabel: tiap bangun ruang dan bangun datar yang bisa dicetak dari permukaannya. */
export const tabelCetak = (): BarisCetak[] =>
  URUT_CETAK.map((r) => {
    const bentuk = [...new Set(PERMUKAAN[r].filter((p) => p.jenis === "datar").map((p) => NAMA_BENTUK_CETAK[p.bentuk as BentukCetak]))];
    return { ruang: r, nama: NAMA_CETAK[r], datar: banyakDatar(r), cetakan: bentuk.length ? bentuk.join(", ") : "Tidak ada" };
  });

export function kalimatCetak(r: RuangCetak, id: string, sudahCetak: boolean): string {
  const p = cariPermukaan(r, id);
  if (!sudahCetak) return `${p.nama}: ${p.jenis === "datar" ? "permukaan datar" : "permukaan lengkung"}. Tekan Cetak untuk mencobanya di kertas.`;
  return cetak(r, id).catatan;
}

export function ucapanCetak(r: RuangCetak, id: string, sudahCetak: boolean): string {
  return `${NAMA_CETAK[r]}. ${kalimatCetak(r, id, sudahCetak)}`;
}
