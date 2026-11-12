/**
 * Lab Kawat (Kelas 5 Bab 5, Sub-Bab D: Hubungan Keliling dan Luas Daerah): logika murni. Satu alat, tiga tampilan.
 *  Kawat : kawat 60 cm dibentuk menjadi kerangka persegi panjang. Keliling tetap 60 cm, jadi panjang ditambah lebar
 *          selalu 30 cm. Anak mengatur panjang dan melihat luasnya berubah, lalu mencatat bentuknya (Isoperimetric
 *          Relationship, Fixed Perimeter Maximize Area).
 *  Pilih : kebutuhan dibedakan, pagar dan kawat memakai keliling, ubin dan pasir memakai luas.
 *  Urut  : lima kerangka kawat 60 cm diurutkan dari luas terkecil sampai terbesar.
 * Data dari Buku Siswa Kelas V Bab 5 Sub-Bab D (kawat 60 cm, 20 × 10 = 200, 25 × 5 = 125, 15 × 15 = 225).
 * Menyentuh konsep sub-bab sebelumnya: luas persegi panjang (B) dan perbandingan luas (A).
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b5.mjs.
 */

export const KELILING_KAWAT = 60;
/** Panjang ditambah lebar: setengah keliling kawat. */
export const SETENGAH_KELILING = 30;
export const LUAS_BUKU = 200;

export type Kebutuhan = { teks: string; jawab: "keliling" | "luas" };
export const DATA_PILIH: Kebutuhan[] = [
  { teks: "pagar kebun", jawab: "keliling" },
  { teks: "ubin lantai", jawab: "luas" },
  { teks: "kerangka kawat", jawab: "keliling" },
  { teks: "pasir lapangan", jawab: "luas" },
];
/** Lima kerangka, panjang dan lebar. Urutan di layar sengaja diacak. */
export const DATA_URUT: { p: number; l: number }[] = [
  { p: 18, l: 12 },
  { p: 28, l: 2 },
  { p: 15, l: 15 },
  { p: 22, l: 8 },
  { p: 25, l: 5 },
];
export const PERUBAHAN = [-5, -1, 1, 5] as const;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const lebarDari = (p: number): number => SETENGAH_KELILING - p;
export const luasKawat = (p: number): number => p * lebarDari(p);
export const kelilingKawat = (p: number): number => 2 * (p + lebarDari(p));
/** Kerangka p kali l dan l kali p sama: dicatat dengan sisi yang lebih panjang. */
export const idKawat = (p: number): string => `kawat:${Math.max(p, lebarDari(p))}`;
/** Indeks DATA_URUT dari luas terkecil sampai terbesar. */
export const urutanBenar = (): number[] =>
  DATA_URUT.map((_, i) => i).sort((a, b) => DATA_URUT[a].p * DATA_URUT[a].l - DATA_URUT[b].p * DATA_URUT[b].l);

/* ------------------------------ Keadaan ------------------------------ */

export type StateKawatK5B5D = {
  kawat: { p: number };
  pilih: { data: number };
  urut: { dipilih: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiKawatK5B5D =
  | { t: "K_UBAH"; d: number }
  | { t: "K_CATAT" }
  | { t: "P_DATA"; i: number }
  | { t: "P_JAWAB"; jawab: string }
  | { t: "U_PILIH"; k: number }
  | { t: "U_ULANG" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalKawatK5B5D = (): StateKawatK5B5D => ({
  kawat: { p: 10 },
  pilih: { data: 0 },
  urut: { dipilih: [] },
  pernah: [],
  pesan: "",
});

export const dataPilih = (x: StateKawatK5B5D): Kebutuhan => DATA_PILIH[x.pilih.data];

function ubahPanjang(x: StateKawatK5B5D, d: number): StateKawatK5B5D {
  if (!(PERUBAHAN as readonly number[]).includes(d)) return x;
  const baru = x.kawat.p + d;
  if (baru < 1) return { ...x, pesan: "Panjang paling sedikit 1 cm, karena lebarnya juga harus ada." };
  if (baru > SETENGAH_KELILING - 1) return { ...x, pesan: `Panjang paling banyak ${SETENGAH_KELILING - 1} cm, karena lebarnya harus tersisa.` };
  return { ...x, kawat: { p: baru }, pesan: "" };
}

function catatKawat(x: StateKawatK5B5D): StateKawatK5B5D {
  const p = x.kawat.p;
  const l = lebarDari(p);
  const L = luasKawat(p);
  const dasar = { ...x, pernah: catat(x.pernah, idKawat(p)) };
  if (p === l) {
    return { ...dasar, pesan: `✅ Persegi ${p} × ${l}: keliling 2 × (${p} + ${l}) = ${KELILING_KAWAT} cm, luas ${p} × ${l} = ${L} cm². Ini luas terbesar di antara semua kerangka kawat 60 cm.` };
  }
  const banding =
    L < LUAS_BUKU
      ? ` Kelilingnya tetap ${KELILING_KAWAT} cm, tetapi luasnya lebih kecil dari ${LUAS_BUKU} cm².`
      : L > LUAS_BUKU
        ? ` Kelilingnya tetap ${KELILING_KAWAT} cm, tetapi luasnya lebih besar dari ${LUAS_BUKU} cm².`
        : ` Kerangka 20 × 10 dan 10 × 20 sama, luasnya ${LUAS_BUKU} cm².`;
  return { ...dasar, pesan: `✅ ${p} × ${l}: keliling 2 × (${p} + ${l}) = ${KELILING_KAWAT} cm, luas ${p} × ${l} = ${L} cm².${banding}` };
}

function jawabPilih(x: StateKawatK5B5D, jawab: string): StateKawatK5B5D {
  if (jawab !== "keliling" && jawab !== "luas") return x;
  const k = dataPilih(x);
  if (jawab === k.jawab) {
    const alasan = k.jawab === "keliling" ? "yang dihitung panjang di tepi" : "yang dihitung daerah di dalam";
    return { ...x, pernah: catat(x.pernah, `pilih:${x.pilih.data}`), pesan: `✅ ${k.teks} memakai ${k.jawab}, karena ${alasan}.` };
  }
  return {
    ...x,
    pesan: jawab === "luas" ? `Untuk ${k.teks}, yang dibutuhkan panjang di tepi, yaitu keliling, bukan daerah di dalam.` : `Untuk ${k.teks}, yang dibutuhkan daerah di dalam, yaitu luas, bukan panjang di tepi.`,
  };
}

function pilihUrut(x: StateKawatK5B5D, k: number): StateKawatK5B5D {
  if (!sah(k, DATA_URUT.length)) return x;
  const { dipilih } = x.urut;
  if (dipilih.includes(k)) return { ...x, pesan: "Kerangka itu sudah dipilih. Pilih yang berikutnya." };
  const benar = urutanBenar();
  if (dipilih.length >= benar.length) return x;
  if (k !== benar[dipilih.length]) {
    return { ...x, pesan: "Masih ada kerangka yang luasnya lebih kecil. Hitung luas tiap kerangka, lalu pilih yang paling kecil dulu." };
  }
  const baru = [...dipilih, k];
  const d = DATA_URUT[k];
  if (baru.length === benar.length) {
    const deret = benar.map((i) => DATA_URUT[i].p * DATA_URUT[i].l).join(" < ");
    return {
      ...x,
      urut: { dipilih: baru },
      pernah: catat(x.pernah, "urut:0"),
      pesan: `✅ Urutan benar: ${deret} cm². Keliling semuanya ${KELILING_KAWAT} cm, tetapi luasnya berbeda. Makin mendekati persegi, makin besar luasnya.`,
    };
  }
  return { ...x, urut: { dipilih: baru }, pesan: `✅ ${d.p} × ${d.l} = ${d.p * d.l} cm². Lanjut ke kerangka yang luasnya lebih besar.` };
}

export function langkahKawatK5B5D(x: StateKawatK5B5D, a: AksiKawatK5B5D): StateKawatK5B5D {
  switch (a.t) {
    case "K_UBAH":
      return ubahPanjang(x, a.d);
    case "K_CATAT":
      return catatKawat(x);
    case "P_DATA":
      return sah(a.i, DATA_PILIH.length) ? { ...x, pilih: { data: a.i }, pesan: "" } : x;
    case "P_JAWAB":
      return jawabPilih(x, a.jawab);
    case "U_PILIH":
      return pilihUrut(x, a.k);
    case "U_ULANG":
      return { ...x, urut: { dipilih: [] }, pesan: "" };
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalKawatK5B5D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanKawatK5B5D = { alat: "kawat"; pernah: string[] };
export const keadaanKawatK5B5D = (x: StateKawatK5B5D): KeadaanKawatK5B5D => ({ alat: "kawat", pernah: x.pernah });

export const ucapKawatK5B5D = (x: StateKawatK5B5D): string => {
  const p = x.kawat.p;
  return `Kawat enam puluh sentimeter dibentuk persegi panjang. Sekarang panjang ${p} sentimeter dan lebar ${lebarDari(p)} sentimeter, kelilingnya tetap ${KELILING_KAWAT} sentimeter, luasnya ${luasKawat(p)} sentimeter persegi.`;
};
export const ucapPilihK5B5D = (x: StateKawatK5B5D): string => `Untuk ${dataPilih(x).teks}, pilih yang dihitung: keliling atau luas.`;
export const ucapUrutK5B5D = (x: StateKawatK5B5D): string => {
  const sudah = x.urut.dipilih.length;
  return sudah === DATA_URUT.length ? "Kelima kerangka sudah terurut dari luas terkecil." : `Pilih kerangka dari luas terkecil. Sudah ${sudah} dari ${DATA_URUT.length} kerangka.`;
};
