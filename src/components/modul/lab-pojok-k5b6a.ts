/**
 * Lab Pojok (Kelas 5 Bab 6, Sub-Bab A: Sudut Siku-Siku): logika murni. Satu alat, tiga tampilan.
 *  Lipat    : lipat kertas dua kali sampai lipatan kedua menimpa lipatan pertama dengan rapi. Pojoknya menjadi patokan siku-siku
 *             (Paper Fold Benchmark).
 *  Banding  : tempelkan patokan ke pojok sebuah benda, lalu putuskan: berimpit (siku-siku), lebih sempit (lancip), atau
 *             lebih lebar (tumpul) (Right Angle Benchmark).
 *  Detektif : periksa pojok benda di sekitar dengan patokan, lalu pilah siku-siku atau bukan (Angle Detective).
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab A (pojok bingkai, patokan lipatan, Eksplorasi 6.1).
 * Ukuran pojok hanya dipakai untuk menggambar dan menimbang, tidak pernah ditampilkan (derajat selain 90 dibahas di
 * sub-bab berikutnya). Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b6.mjs.
 */

export const SIKU = 90;
export type JenisPojok = "lancip" | "siku" | "tumpul";
export const JENIS_POJOK: JenisPojok[] = ["lancip", "siku", "tumpul"];
/** Ukuran pojok dalam derajat bulat, di antara 0 dan 180. Hanya untuk menimbang dan menggambar. */
export const jenisPojok = (deg: number): JenisPojok => (deg < SIKU ? "lancip" : deg === SIKU ? "siku" : "tumpul");

export type DataLipat = { nama: string; geser: number };
export type DataPojok = { nama: string; deg: number };
/** Geser awal lipatan kedua (derajat dari tegak lurus). Harus digeser ke nol supaya tepinya berimpit. */
export const DATA_LIPAT: DataLipat[] = [
  { nama: "kertas HVS", geser: 10 },
  { nama: "kertas koran", geser: -5 },
];
export const DATA_BANDING: DataPojok[] = [
  { nama: "pojok buku", deg: 90 },
  { nama: "pojok bingkai foto", deg: 90 },
  { nama: "pojok ubin lantai", deg: 90 },
  { nama: "ujung gunting yang terbuka", deg: 40 },
  { nama: "bukaan kipas lipat", deg: 130 },
  { nama: "pojok atap rumah", deg: 110 },
];
export const DATA_DETEKTIF: DataPojok[] = [
  { nama: "pojok buku tulis", deg: 90 },
  { nama: "jarum jam pukul dua", deg: 60 },
  { nama: "pojok jendela", deg: 90 },
  { nama: "bukaan kipas besar", deg: 140 },
  { nama: "pojok meja", deg: 90 },
  { nama: "sandaran tangga", deg: 35 },
];
export const GESER_BATAS = 10;
export const GESER_LANGKAH = 5;

export const idLipat = (i: number): string => `lipat:${i}`;
export const idBanding = (i: number): string => `banding:${i}`;
export const idDetektif = (i: number): string => `detektif:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Keadaan ------------------------------ */

export type StatePojokK5B6A = {
  lipat: { data: number; langkah: 0 | 1 | 2; geser: number };
  banding: { data: number; tempel: boolean };
  detektif: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiPojokK5B6A =
  | { t: "L_DATA"; i: number }
  | { t: "L_LIPAT1" }
  | { t: "L_GESER"; d: number }
  | { t: "L_LIPAT2" }
  | { t: "B_DATA"; i: number }
  | { t: "B_TEMPEL" }
  | { t: "B_JAWAB"; jawab: string }
  | { t: "D_DATA"; i: number }
  | { t: "D_JAWAB"; jawab: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalPojokK5B6A = (): StatePojokK5B6A => ({
  lipat: { data: 0, langkah: 0, geser: DATA_LIPAT[0].geser },
  banding: { data: 0, tempel: false },
  detektif: { data: 0 },
  pernah: [],
  pesan: "",
});

export const dataLipat = (x: StatePojokK5B6A): DataLipat => DATA_LIPAT[x.lipat.data];
export const dataBanding = (x: StatePojokK5B6A): DataPojok => DATA_BANDING[x.banding.data];
export const dataDetektif = (x: StatePojokK5B6A): DataPojok => DATA_DETEKTIF[x.detektif.data];

function lipatSatu(x: StatePojokK5B6A): StatePojokK5B6A {
  if (x.lipat.langkah !== 0) return x;
  return { ...x, lipat: { ...x.lipat, langkah: 1 }, pesan: "Lipatan pertama membuat tepi yang lurus. Sekarang lipat lagi, supaya tepi lurus itu menimpa dirinya sendiri." };
}

function geserLipat(x: StatePojokK5B6A, d: number): StatePojokK5B6A {
  if (x.lipat.langkah !== 1 || (d !== GESER_LANGKAH && d !== -GESER_LANGKAH)) return x;
  const baru = Math.max(-GESER_BATAS, Math.min(GESER_BATAS, x.lipat.geser + d));
  if (baru === x.lipat.geser) return { ...x, pesan: "Lipatan sudah di ujung geseran. Geser ke arah sebaliknya." };
  return {
    ...x,
    lipat: { ...x.lipat, geser: baru },
    pesan: baru === 0 ? "Tepi lurus sudah berimpit dengan dirinya sendiri. Sekarang lipat." : `Tepinya belum berimpit, masih miring ke ${baru > 0 ? "kanan" : "kiri"}. Geser lagi.`,
  };
}

function lipatDua(x: StatePojokK5B6A): StatePojokK5B6A {
  if (x.lipat.langkah === 0) return { ...x, pesan: "Lipat pertama dulu, supaya ada tepi yang lurus." };
  if (x.lipat.langkah === 2) return x;
  if (x.lipat.geser !== 0) return { ...x, pesan: "Tepinya belum berimpit dengan dirinya sendiri. Geser lipatan sampai tegak lurus, baru lipat." };
  return {
    ...x,
    lipat: { ...x.lipat, langkah: 2 },
    pernah: catat(x.pernah, idLipat(x.lipat.data)),
    pesan: `✅ Lipatan kedua menimpa lipatan pertama dengan rapi. Pojok lipatan ini sudut siku-siku, besarnya ${SIKU}°. Inilah patokan untuk memeriksa pojok lain.`,
  };
}

function jawabBanding(x: StatePojokK5B6A, jawab: string): StatePojokK5B6A {
  if (!(JENIS_POJOK as string[]).includes(jawab)) return x;
  if (!x.banding.tempel) return { ...x, pesan: "Tempel patokan ke pojok itu dulu, baru bandingkan." };
  const d = dataBanding(x);
  const benar = jenisPojok(d.deg);
  if (jawab === benar) {
    const alasan =
      benar === "siku" ? "berimpit dengan patokan, jadi siku-siku" : benar === "lancip" ? "masuk ke dalam patokan, lebih sempit dari patokan, jadi lancip" : "keluar dari patokan, lebih lebar dari patokan, jadi tumpul";
    return { ...x, pernah: catat(x.pernah, idBanding(x.banding.data)), pesan: `✅ ${d.nama}: sisinya ${alasan}.` };
  }
  const pesan =
    benar === "siku"
      ? jawab === "lancip"
        ? "Sisi pojok itu berimpit dengan patokan, jadi tidak lebih sempit."
        : "Sisi pojok itu berimpit dengan patokan, jadi tidak lebih lebar."
      : benar === "lancip"
        ? jawab === "siku"
          ? "Sisi pojok itu masuk ke dalam patokan, tidak berimpit."
          : "Sisi pojok itu ada di dalam patokan, bukan di luar. Lebih sempit, bukan lebih lebar."
        : jawab === "siku"
          ? "Sisi pojok itu keluar dari patokan, tidak berimpit."
          : "Sisi pojok itu ada di luar patokan, bukan di dalam. Lebih lebar, bukan lebih sempit.";
  return { ...x, pesan };
}

function jawabDetektif(x: StatePojokK5B6A, jawab: string): StatePojokK5B6A {
  if (jawab !== "siku" && jawab !== "bukan") return x;
  const d = dataDetektif(x);
  const siku = d.deg === SIKU;
  if ((jawab === "siku") === siku) {
    return {
      ...x,
      pernah: catat(x.pernah, idDetektif(x.detektif.data)),
      pesan: siku ? `✅ ${d.nama}: berimpit dengan patokan, jadi siku-siku.` : `✅ ${d.nama}: tidak berimpit dengan patokan, jadi bukan siku-siku.`,
    };
  }
  return { ...x, pesan: siku ? "Pojok itu berimpit dengan patokan. Periksa lagi." : "Pojok itu tidak berimpit dengan patokan, ada celah di sisinya. Periksa lagi." };
}

export function langkahPojokK5B6A(x: StatePojokK5B6A, a: AksiPojokK5B6A): StatePojokK5B6A {
  switch (a.t) {
    case "L_DATA":
      return sah(a.i, DATA_LIPAT.length) ? { ...x, lipat: { data: a.i, langkah: 0, geser: DATA_LIPAT[a.i].geser }, pesan: "" } : x;
    case "L_LIPAT1":
      return lipatSatu(x);
    case "L_GESER":
      return geserLipat(x, a.d);
    case "L_LIPAT2":
      return lipatDua(x);
    case "B_DATA":
      return sah(a.i, DATA_BANDING.length) ? { ...x, banding: { data: a.i, tempel: false }, pesan: "" } : x;
    case "B_TEMPEL":
      return x.banding.tempel ? x : { ...x, banding: { ...x.banding, tempel: true }, pesan: "Patokan menempel di pojok. Lihat sisi pojok itu: berimpit, masuk ke dalam, atau keluar dari patokan?" };
    case "B_JAWAB":
      return jawabBanding(x, a.jawab);
    case "D_DATA":
      return sah(a.i, DATA_DETEKTIF.length) ? { ...x, detektif: { data: a.i }, pesan: "" } : x;
    case "D_JAWAB":
      return jawabDetektif(x, a.jawab);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPojokK5B6A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPojokK5B6A = { alat: "pojok"; pernah: string[] };
export const keadaanPojokK5B6A = (x: StatePojokK5B6A): KeadaanPojokK5B6A => ({ alat: "pojok", pernah: x.pernah });

export const ucapLipatK5B6A = (x: StatePojokK5B6A): string => {
  const n = dataLipat(x).nama;
  if (x.lipat.langkah === 0) return `Ambil selembar ${n}. Lipat sekali supaya tepinya lurus.`;
  if (x.lipat.langkah === 1) return x.lipat.geser === 0 ? "Tepi lurus sudah berimpit dengan dirinya sendiri. Lipat sekarang." : "Geser lipatan sampai tepi lurus menimpa dirinya sendiri, lalu lipat.";
  return `Pojok lipatan menjadi patokan siku-siku, ${SIKU}°.`;
};
export const ucapBandingK5B6A = (x: StatePojokK5B6A): string =>
  x.banding.tempel ? `Patokan menempel di ${dataBanding(x).nama}. Pilih: berimpit, lebih sempit, atau lebih lebar.` : `Tempelkan patokan ke ${dataBanding(x).nama}, lalu bandingkan.`;
export const ucapDetektifK5B6A = (x: StatePojokK5B6A): string => `Periksa ${dataDetektif(x).nama} dengan patokan. Siku-siku atau bukan?`;
