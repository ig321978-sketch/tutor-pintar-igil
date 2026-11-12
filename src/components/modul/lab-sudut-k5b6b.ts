/**
 * Lab Sudut (Kelas 5 Bab 6, Sub-Bab B: Pengertian dan Jenis Sudut): logika murni. Satu alat, tiga tampilan.
 *  Bagian : sebuah bagian gambar sudut disorot satu per satu, anak menyebut namanya: titik sudut, kaki sudut, atau daerah
 *           sudut (Vertex-Ray Model).
 *  Jenis  : kaki sudut dibuka atau ditutup sampai sudutnya lancip, siku-siku, atau tumpul, lalu dicek dengan patokan
 *           (Acute-Right-Obtuse Classification).
 *  Jam    : sudut antara jarum pendek dan jarum panjang pada pukul tertentu, pilih lancip, siku-siku, atau tumpul.
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab B (Tabel 6.3, huruf V, jarum jam, gunting).
 * Ukuran sudut hanya dipakai untuk menggambar dan menimbang, tidak pernah ditampilkan (derajat selain 90 dan busur
 * dibahas di Sub-Bab C). Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b6.mjs.
 */

export const SIKU = 90;
export type JenisSudut = "lancip" | "siku" | "tumpul";
export const JENIS_SUDUT: JenisSudut[] = ["lancip", "siku", "tumpul"];
export const jenisSudut = (deg: number): JenisSudut => (deg < SIKU ? "lancip" : deg === SIKU ? "siku" : "tumpul");
export const NAMA_JENIS: Record<JenisSudut, string> = { lancip: "lancip", siku: "siku-siku", tumpul: "tumpul" };
/** Uraian hubungan dengan patokan siku-siku. */
export const URAIAN_JENIS: Record<JenisSudut, string> = {
  lancip: "lebih sempit dari patokan",
  siku: "berimpit dengan patokan",
  tumpul: "lebih lebar dari patokan",
};

export type BagianSudut = "titik" | "kaki1" | "kaki2" | "daerah";
export type NamaBagian = "titik" | "kaki" | "daerah";
export const NAMA_BAGIAN: NamaBagian[] = ["titik", "kaki", "daerah"];
export const KATEGORI: Record<BagianSudut, NamaBagian> = { titik: "titik", kaki1: "kaki", kaki2: "kaki", daerah: "daerah" };
export const SEBUT_BAGIAN: Record<NamaBagian, string> = { titik: "titik sudut", kaki: "kaki sudut", daerah: "daerah sudut" };
const URAI_BAGIAN: Record<NamaBagian, string> = {
  titik: "titik tempat dua garis bertemu",
  kaki: "salah satu dari dua garis yang membentuk sudut",
  daerah: "daerah di antara kedua garis",
};

/** Dua sudut untuk dinamai. urutan: bagian yang disorot satu per satu. deg: hanya untuk menggambar. */
export type DataBagian = { nama: string; urutan: BagianSudut[]; deg: number };
export const DATA_BAGIAN: DataBagian[] = [
  { nama: "huruf V", urutan: ["kaki1", "titik", "daerah", "kaki2"], deg: 50 },
  { nama: "gunting terbuka", urutan: ["daerah", "kaki2", "titik", "kaki1"], deg: 70 },
];
export const DEG_MIN = 15;
export const DEG_MAKS = 165;
export const DEG_LANGKAH = 15;
export const DEG_AWAL = 60;
export const TUGAS_JENIS: JenisSudut[] = ["lancip", "siku", "tumpul"];
/** Jam yang dipilih (pukul bulat). Jarum pendek menunjuk jam itu, jarum panjang menunjuk angka dua belas. */
export const DATA_JAM: number[] = [2, 3, 4, 8, 1, 5];
export const KATA_JAM = ["dua belas", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
/** Sudut terkecil antara jarum pendek dan jarum panjang pada pukul bulat, dalam derajat. Hanya untuk menimbang dan menggambar. */
export const sudutJam = (jam: number): number => Math.min(30 * jam, 360 - 30 * jam);

export const idBagian = (i: number): string => `bagian:${i}`;
export const idJenis = (j: JenisSudut): string => `jenis:${j}`;
export const idJam = (i: number): string => `jam:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Keadaan ------------------------------ */

export type StateSudutK5B6B = {
  bagian: { data: number; langkah: number };
  jenis: { deg: number; tugas: number };
  jam: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiSudutK5B6B =
  | { t: "G_DATA"; i: number }
  | { t: "G_NAMA"; nama: string }
  | { t: "J_TUGAS"; i: number }
  | { t: "J_UBAH"; d: number }
  | { t: "J_CEK" }
  | { t: "M_DATA"; i: number }
  | { t: "M_JAWAB"; jawab: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSudutK5B6B = (): StateSudutK5B6B => ({
  bagian: { data: 0, langkah: 0 },
  jenis: { deg: DEG_AWAL, tugas: 0 },
  jam: { data: 0 },
  pernah: [],
  pesan: "",
});

export const dataBagian = (x: StateSudutK5B6B): DataBagian => DATA_BAGIAN[x.bagian.data];
/** Bagian yang sedang disorot, atau null bila semua bagian sudah dinamai. */
export const sorotBagian = (x: StateSudutK5B6B): BagianSudut | null => dataBagian(x).urutan[x.bagian.langkah] ?? null;
export const tugasJenis = (x: StateSudutK5B6B): JenisSudut => TUGAS_JENIS[x.jenis.tugas];
export const jamDipilih = (x: StateSudutK5B6B): number => DATA_JAM[x.jam.data];

function namaiBagian(x: StateSudutK5B6B, nama: string): StateSudutK5B6B {
  if (!(NAMA_BAGIAN as string[]).includes(nama)) return x;
  const sorot = sorotBagian(x);
  if (sorot === null) return x;
  const kat = KATEGORI[sorot];
  if (nama !== kat) return { ...x, pesan: `Bagian yang disorot bukan ${SEBUT_BAGIAN[nama as NamaBagian]}. Itu ${URAI_BAGIAN[kat]}.` };
  const langkah = x.bagian.langkah + 1;
  const d = dataBagian(x);
  if (langkah === d.urutan.length) {
    return {
      ...x,
      bagian: { ...x.bagian, langkah },
      pernah: catat(x.pernah, idBagian(x.bagian.data)),
      pesan: `✅ Lengkap! Pada ${d.nama} ada satu titik sudut, dua kaki sudut, dan daerah sudut di antara kedua kaki.`,
    };
  }
  return { ...x, bagian: { ...x.bagian, langkah }, pesan: `✅ ${SEBUT_BAGIAN[kat][0].toUpperCase()}${SEBUT_BAGIAN[kat].slice(1)}: ${URAI_BAGIAN[kat]}. Lanjut ke bagian yang disorot berikutnya.` };
}

function ubahJenis(x: StateSudutK5B6B, d: number): StateSudutK5B6B {
  if (d !== DEG_LANGKAH && d !== -DEG_LANGKAH) return x;
  const baru = x.jenis.deg + d;
  if (baru < DEG_MIN) return { ...x, pesan: "Sudutnya sudah paling sempit. Buka lebih lebar." };
  if (baru > DEG_MAKS) return { ...x, pesan: "Sudutnya sudah paling lebar. Tutup lebih sempit." };
  return { ...x, jenis: { ...x.jenis, deg: baru }, pesan: "" };
}

function cekJenis(x: StateSudutK5B6B): StateSudutK5B6B {
  const target = tugasJenis(x);
  const sekarang = jenisSudut(x.jenis.deg);
  if (sekarang === target) {
    return { ...x, pernah: catat(x.pernah, idJenis(target)), pesan: `✅ Sudutmu ${URAIAN_JENIS[target]}, jadi ${NAMA_JENIS[target]}.` };
  }
  const arah = target === "lancip" || (target === "siku" && sekarang === "tumpul") ? "Tutup lebih sempit" : "Buka lebih lebar";
  return { ...x, pesan: `Sudutmu ${URAIAN_JENIS[sekarang]}, jadi ${NAMA_JENIS[sekarang]}. ${arah} supaya ${NAMA_JENIS[target]}.` };
}

function jawabJam(x: StateSudutK5B6B, jawab: string): StateSudutK5B6B {
  if (!(JENIS_SUDUT as string[]).includes(jawab)) return x;
  const jam = jamDipilih(x);
  const benar = jenisSudut(sudutJam(jam));
  const nama = `pukul ${KATA_JAM[jam]}`;
  if (jawab === benar) {
    return { ...x, pernah: catat(x.pernah, idJam(x.jam.data)), pesan: `✅ ${nama[0].toUpperCase()}${nama.slice(1)}: jarum pendek dan jarum panjang membentuk sudut yang ${URAIAN_JENIS[benar]}, jadi ${NAMA_JENIS[benar]}.` };
  }
  return { ...x, pesan: `Pada ${nama}, sudut antara kedua jarum ${URAIAN_JENIS[benar]}. Bandingkan lagi dengan patokan siku-siku.` };
}

export function langkahSudutK5B6B(x: StateSudutK5B6B, a: AksiSudutK5B6B): StateSudutK5B6B {
  switch (a.t) {
    case "G_DATA":
      return sah(a.i, DATA_BAGIAN.length) ? { ...x, bagian: { data: a.i, langkah: 0 }, pesan: "" } : x;
    case "G_NAMA":
      return namaiBagian(x, a.nama);
    case "J_TUGAS":
      return sah(a.i, TUGAS_JENIS.length) ? { ...x, jenis: { ...x.jenis, tugas: a.i }, pesan: "" } : x;
    case "J_UBAH":
      return ubahJenis(x, a.d);
    case "J_CEK":
      return cekJenis(x);
    case "M_DATA":
      return sah(a.i, DATA_JAM.length) ? { ...x, jam: { data: a.i }, pesan: "" } : x;
    case "M_JAWAB":
      return jawabJam(x, a.jawab);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSudutK5B6B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSudutK5B6B = { alat: "sudut"; pernah: string[] };
export const keadaanSudutK5B6B = (x: StateSudutK5B6B): KeadaanSudutK5B6B => ({ alat: "sudut", pernah: x.pernah });

export const ucapBagianK5B6B = (x: StateSudutK5B6B): string => {
  const sorot = sorotBagian(x);
  return sorot === null ? `Semua bagian ${dataBagian(x).nama} sudah dinamai.` : `Bagian yang disorot pada ${dataBagian(x).nama}. Pilih namanya: titik sudut, kaki sudut, atau daerah sudut.`;
};
export const ucapJenisK5B6B = (x: StateSudutK5B6B): string => `Buat sudut yang ${NAMA_JENIS[tugasJenis(x)]}. Buka atau tutup kaki sudut, lalu cek dengan patokan siku-siku.`;
export const ucapJamK5B6B = (x: StateSudutK5B6B): string => `Jam menunjukkan pukul ${KATA_JAM[jamDipilih(x)]}. Pilih jenis sudut antara jarum pendek dan jarum panjang.`;
