/**
 * Laboratorium "Kebun dan Nampan Nenek" (Opsi 2, Kelas 1 Bab 1 Sub-Bab A, bilangan nol sampai sepuluh): logika murni.
 * Naskah orisinal IGIL, dunia Kampung Cemara (naskah/kitab-dunia-k1.md). Tanpa React, tanpa jaringan, tanpa impor nilai
 * (diuji langsung di Node oleh scripts/uji-sim-o2k1a.mjs).
 *
 * Satu model: banyak apel di keranjang (nol sampai sepuluh). Perwakilan terhubung yang dihitung dari model itu:
 *  - apel di keranjang (diketuk atau diseret dari tumpukan di kebun, dan sebaliknya),
 *  - nampan Bingkai Sepuluh (terisi urut dari kiri atas, dua baris lima),
 *  - lambang bilangan besar, nama bilangan (kata), dan suara,
 *  - jalur tulis lambang (anak mengikuti jalur dengan jari; lambang yang ditulis = banyak apel di keranjang).
 * Nampan, lambang, dan nama bisa dinyalakan atau dimatikan. Tanpa skor, tanpa waktu, tanpa kata salah.
 * Tombol tambah dan kurang hanya mengubah isi keranjang untuk melihat lambangnya.
 */

export const BATAS_O2K1A = 10;
/** Keranjang bermula berisi tiga apel: tidak ada misi yang langsung terpenuhi. */
export const AWAL_O2K1A = 3;
export const NAMA_BIL_O2K1A = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const namaBil = (n: number): string => NAMA_BIL_O2K1A[n] ?? "";
const kapital = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
export const namaBilKapital = (n: number): string => kapital(namaBil(n));

export type RepLab = "nampan" | "lambang" | "nama";

/* ------------------------------ Jalur tulis ------------------------------ */

/**
 * Jalur tulis tiap lambang pada bingkai 56 x 90 (pojok kiri-atas di (0, 0)); tiap elemen satu goresan berurutan.
 * Sama dengan model jalur di Story o2k1a (story/o2k1a-bantu.ts), supaya yang diperagakan video dan yang ditiru anak sama.
 * Hanya perintah M, L, C dengan koordinat mutlak.
 */
export const MODEL_TULIS_O2K1A: Record<string, string[]> = {
  "0": ["M28 2 C8 2 4 24 4 46 C4 68 8 90 28 90 C48 90 52 68 52 46 C52 24 48 2 28 2"],
  "1": ["M28 2 L28 90"],
  "2": ["M8 20 C10 -4 50 -4 52 22", "M52 22 C54 44 22 64 4 90", "M4 90 L54 90"],
  "3": ["M6 14 C12 -2 50 -2 50 22 C50 38 34 44 22 44", "M22 44 C38 44 54 50 54 68 C54 88 30 94 4 78"],
  "4": ["M40 2 L4 62", "M4 62 L54 62", "M40 2 L40 90"],
  "5": ["M50 2 L12 2", "M12 2 L8 42", "M8 42 C22 32 54 36 54 62 C54 90 20 96 4 78"],
  "6": ["M44 4 C16 12 4 44 4 66", "M4 66 C4 92 52 92 52 66 C52 44 14 44 4 66"],
  "7": ["M4 4 L52 4", "M52 4 L22 90"],
  "8": ["M28 4 C8 4 6 36 28 46", "M28 46 C50 54 52 90 28 90 C6 90 4 54 28 46", "M28 46 C50 38 48 4 28 4"],
  "9": ["M26 3 C2 3 2 44 26 44 C50 44 50 3 26 3", "M44 24 L44 90"],
};

/** Petunjuk pendek tiap goresan (tanpa angka), searah MODEL_TULIS_O2K1A. */
export const PETUNJUK_GORES_O2K1A: Record<string, string[]> = {
  "0": ["Mulai dari atas, putar ke kiri."],
  "1": ["Garis lurus turun."],
  "2": ["Lengkung ke kanan.", "Turun miring ke kiri.", "Garis lurus ke kanan."],
  "3": ["Lengkung ke kanan, kembali ke tengah.", "Lengkung ke kanan lagi."],
  "4": ["Turun miring ke kiri.", "Garis ke kanan.", "Garis lurus turun memotong."],
  "5": ["Garis ke kiri.", "Turun sedikit.", "Lengkung besar ke kanan."],
  "6": ["Lengkung turun ke kiri.", "Lingkaran kecil di bawah."],
  "7": ["Garis ke kanan.", "Miring turun ke kiri."],
  "8": ["Mulai atas, lengkung ke kiri.", "Turun menyilang ke kanan, lengkung bawah.", "Naik kembali."],
  "9": ["Lingkaran kecil di atas.", "Garis lurus turun di kanan."],
};

export type Titik = readonly [number, number];
export type Goresan = { d: string; ox: number; titik: Titik[]; petunjuk: string };

const BATAS_LEBAR = 128;
/** Lebar kanvas tulis (satuan jalur). Tinggi: dari -8 sampai 102. */
export const KANVAS_TULIS = { w: BATAS_LEBAR, y0: -8, tinggi: 110 } as const;

/** Titik-titik di sepanjang jalur (kurva Bezier dan garis diambil contohnya), digeser ox. */
export function titikJalur(d: string, ox = 0): Titik[] {
  const hasil: Titik[] = [];
  let sekarang: Titik = [0, 0];
  for (const m of d.matchAll(/([MLC])([^MLC]*)/g)) {
    const v = m[2].trim().split(/[\s,]+/).map(Number);
    if (m[1] === "M") {
      sekarang = [v[0], v[1]];
      hasil.push([sekarang[0] + ox, sekarang[1]]);
    } else if (m[1] === "L") {
      const [x0, y0] = sekarang;
      for (let s = 1; s <= 12; s += 1) hasil.push([x0 + ((v[0] - x0) * s) / 12 + ox, y0 + ((v[1] - y0) * s) / 12]);
      sekarang = [v[0], v[1]];
    } else {
      for (let k = 0; k + 5 < v.length; k += 6) {
        const [x0, y0] = sekarang;
        for (let s = 1; s <= 14; s += 1) {
          const t = s / 14;
          const u = 1 - t;
          const x = u * u * u * x0 + 3 * u * u * t * v[k] + 3 * u * t * t * v[k + 2] + t * t * t * v[k + 4];
          const y = u * u * u * y0 + 3 * u * u * t * v[k + 1] + 3 * u * t * t * v[k + 3] + t * t * t * v[k + 5];
          hasil.push([x + ox, y]);
        }
        sekarang = [v[k + 4], v[k + 5]];
      }
    }
  }
  return hasil;
}

/** Lambang ditulis sebagai satu bingkai, kecuali sepuluh: dua bingkai (satu, lalu nol). */
export const lambangTulis = (n: number): string[] => (n === 10 ? ["1", "0"] : [String(n)]);

/** Semua goresan untuk menulis lambang n, berurutan. */
export function goresanTulis(n: number): Goresan[] {
  const bingkai = lambangTulis(n);
  const ox = bingkai.length === 2 ? [4, 68] : [36];
  return bingkai.flatMap((a, bi) =>
    MODEL_TULIS_O2K1A[a].map((d, i) => ({ d, ox: ox[bi], titik: titikJalur(d, ox[bi]), petunjuk: PETUNJUK_GORES_O2K1A[a][i] })),
  );
}

/**
 * Jarak (satuan jalur) titik jari dianggap mengenai titik jalur. Lompatan ke depan yang masih dimaafkan diukur
 * menurut panjang lintasan (jari yang bergerak cepat), dan awal goresan harus dekat titik hijau.
 */
export const RADIUS_JALUR = 11;
export const LOMPAT_JALUR = 30;
export const AWAL_JALUR = 12;

/* ------------------------------ Model ------------------------------ */

export type KeadaanLabO2K1A = {
  /** Banyak apel di keranjang (nol sampai sepuluh). SATU-SATUNYA sumber semua perwakilan. */
  n: number;
  nampan: boolean;
  lambang: boolean;
  nama: boolean;
  /** Goresan yang sudah selesai dan titik jalur berikutnya pada goresan yang sedang diikuti. */
  g: number;
  p: number;
  /** Riwayat (tidak dicabut): "nol", "penuh", "lihat:7", "n:k", "tulis:k". */
  pernah: string[];
  pesan: string;
};

/** Bentuk yang dilaporkan ke papan misi. */
export type KeadaanRingkasO2K1A = { alat: "lab"; pernah: string[] };
export const keadaanLabO2K1A = (x: KeadaanLabO2K1A): KeadaanRingkasO2K1A => ({ alat: "lab", pernah: x.pernah });

export const PESAN_AWAL_O2K1A = "Ketuk apel di kebun, ya.";

export const awalLabO2K1A = (): KeadaanLabO2K1A => ({
  n: AWAL_O2K1A,
  nampan: true,
  lambang: true,
  nama: true,
  g: 0,
  p: 0,
  pernah: [],
  pesan: PESAN_AWAL_O2K1A,
});

export type AksiLabO2K1A =
  | { t: "TAMBAH" }
  | { t: "KURANG" }
  /** Ketuk petak nampan ke-i (mulai 0). Hanya petak berikutnya atau petak terakhir yang berpengaruh. */
  | { t: "PETAK"; i: number }
  | { t: "TOGGLE"; rep: RepLab }
  /** Titik jari pada kanvas tulis (satuan jalur). */
  | { t: "TITIK"; x: number; y: number }
  | { t: "ANGKAT" }
  /** Jalur papan ketik: selesaikan satu goresan. */
  | { t: "GORES" }
  | { t: "ULANG" }
  | { t: "RESET" };

export const jumlahGoresan = (n: number): number => goresanTulis(n).length;
export const sudahTertulis = (x: KeadaanLabO2K1A): boolean => x.g >= jumlahGoresan(x.n);

const jarak = (a: Titik, b: Titik): number => Math.hypot(a[0] - b[0], a[1] - b[1]);

function catat(x: KeadaanLabO2K1A, ubahN: boolean): KeadaanLabO2K1A {
  const baru: string[] = [];
  if (x.n === 0) baru.push("nol");
  if (x.n === BATAS_O2K1A && x.nampan) baru.push("penuh");
  if (x.n === 7 && x.lambang && x.nama) baru.push("lihat:7");
  if (ubahN) baru.push(`n:${x.n}`);
  const tambahan = baru.filter((b) => !x.pernah.includes(b));
  return tambahan.length ? { ...x, pernah: [...x.pernah, ...tambahan] } : x;
}

/** Ucapan banyaknya apel: hitung dikelompokkan paling banyak lima, tanpa angka. */
export function ucapBanyakO2K1A(n: number): string {
  if (n === 0) return "Keranjang kosong. Nol artinya tidak ada apel.";
  const hitung: string[] = [];
  for (let a = 1; a <= n; a += 5) {
    const bagian: string[] = [];
    for (let k = a; k < a + 5 && k <= n; k += 1) bagian.push(k === a ? kapital(namaBil(k)) : namaBil(k));
    hitung.push(`${bagian.join(", ")}.`);
  }
  const penutup = n === BATAS_O2K1A ? "Sepuluh ditulis dua lambang: satu, lalu nol." : `Lambangnya ${namaBil(n)}.`;
  return [...hitung, `Banyaknya ${namaBil(n)}.`, penutup].join(" ");
}

/** Pesan di bawah alat setelah isi keranjang berubah. */
export function pesanBanyakO2K1A(n: number): string {
  if (n === 0) return "Keranjang kosong. Nol artinya tidak ada apel.";
  if (n === BATAS_O2K1A) return "Nampan penuh. Ada sepuluh apel.";
  return `Ada ${namaBil(n)} apel di keranjang.`;
}

/** Ucapan untuk tampilan tulis: lambang yang ditulis dan petunjuk goresan berikutnya. */
export function ucapTulisO2K1A(x: KeadaanLabO2K1A): string {
  const gores = goresanTulis(x.n);
  const awal = `Tulis lambang ${namaBil(x.n)}. Ikuti garis dengan jarimu.`;
  if (x.g >= gores.length) return `Lambang ${namaBil(x.n)} sudah tertulis. Ayo tulis lagi.`;
  return `${awal} ${gores[x.g].petunjuk}`;
}

export function langkahLabO2K1A(x: KeadaanLabO2K1A, a: AksiLabO2K1A): KeadaanLabO2K1A {
  switch (a.t) {
    case "RESET":
      return awalLabO2K1A();
    case "TAMBAH": {
      if (x.n >= BATAS_O2K1A) return { ...x, pesan: "Keranjang sudah penuh." };
      const n = x.n + 1;
      return catat({ ...x, n, g: 0, p: 0, pesan: pesanBanyakO2K1A(n) }, true);
    }
    case "KURANG": {
      if (x.n <= 0) return { ...x, pesan: "Keranjang sudah kosong." };
      const n = x.n - 1;
      return catat({ ...x, n, g: 0, p: 0, pesan: pesanBanyakO2K1A(n) }, true);
    }
    case "PETAK": {
      if (a.i === x.n && x.n < BATAS_O2K1A) return langkahLabO2K1A(x, { t: "TAMBAH" });
      if (a.i === x.n - 1) return langkahLabO2K1A(x, { t: "KURANG" });
      if (a.i > x.n) return { ...x, pesan: "Isi dari kiri atas, satu per satu." };
      return { ...x, pesan: "Ambil dari petak yang terakhir." };
    }
    case "TOGGLE":
      return catat({ ...x, [a.rep]: !x[a.rep] }, false);
    case "ULANG":
      return { ...x, g: 0, p: 0, pesan: "Ayo tulis lagi. Mulai dari titik hijau." };
    case "ANGKAT": {
      if (x.p === 0 || sudahTertulis(x)) return x;
      return { ...x, p: 0, pesan: "Mulai lagi dari titik hijau." };
    }
    case "GORES": {
      const gores = goresanTulis(x.n);
      if (x.g >= gores.length) return x;
      return selesaiGoresan(x, gores.length);
    }
    case "TITIK": {
      const gores = goresanTulis(x.n);
      if (x.g >= gores.length) return x;
      const titik = gores[x.g].titik;
      const jari: Titik = [a.x, a.y];
      const batas = x.p === 0 ? AWAL_JALUR : LOMPAT_JALUR;
      let terjauh = -1;
      let lintasan = 0;
      for (let j = x.p; j < titik.length; j += 1) {
        if (j > x.p) lintasan += jarak(titik[j - 1], titik[j]);
        if (lintasan > batas) break;
        if (jarak(jari, titik[j]) <= RADIUS_JALUR) terjauh = j;
      }
      if (terjauh < 0) {
        if (x.p === 0) return x;
        const dekat = Math.min(...titik.map((t) => jarak(jari, t)));
        if (dekat <= RADIUS_JALUR * 2.2) return x;
        return x.pesan === "Ikuti garis, ya." ? x : { ...x, pesan: "Ikuti garis, ya." };
      }
      const p = terjauh + 1;
      if (p >= titik.length) return selesaiGoresan(x, gores.length);
      return { ...x, p, pesan: x.pesan === "Ikuti garis, ya." ? "Bagus, terus ikuti garis." : x.pesan };
    }
  }
}

function selesaiGoresan(x: KeadaanLabO2K1A, total: number): KeadaanLabO2K1A {
  const g = x.g + 1;
  if (g >= total) return addTulis({ ...x, g, p: 0, pesan: `Bagus! Lambang ${namaBil(x.n)} sudah tertulis.` });
  return { ...x, g, p: 0, pesan: `Bagus. Sekarang ${gabungPetunjuk(goresanTulis(x.n)[g].petunjuk)}` };
}

const gabungPetunjuk = (s: string): string => s.charAt(0).toLowerCase() + s.slice(1);

function addTulis(x: KeadaanLabO2K1A): KeadaanLabO2K1A {
  const id = `tulis:${x.n}`;
  return x.pernah.includes(id) ? x : { ...x, pernah: [...x.pernah, id] };
}

/* ------------------------------ Teks tampilan (diperiksa uji) ------------------------------ */

/** Semua teks tetap pada tampilan. Tiap kalimat paling banyak delapan kata. */
export const TEKS_LAB_O2K1A = {
  judul: "Kebun dan Nampan Nenek",
  sub: "Ketuk apel. Lihat lambang dan namanya.",
  igil: "Coba saja, kita lihat.",
  tabKeranjang: "Keranjang dan Nampan",
  tabTulis: "Tulis Lambang",
  kebun: "Kebun",
  keranjang: "Keranjang",
  nampan: "Nampan Bingkai Sepuluh",
  tambah: "Tambah apel",
  kurang: "Kurangi apel",
  hitung: "Hitung bersama",
  cekNampan: "Nampan",
  cekLambang: "Lambang",
  cekNama: "Nama",
  tulisJudul: "Tulis lambangnya",
  tulisSub: "Ikuti garis dengan jarimu.",
  tuntun: "Tuntun jariku",
  tulisLagi: "Tulis lagi",
  reset: "Reset Semua",
  dengar: "Dengarkan langkahnya",
  mati: "Nyalakan Lambang atau Nama untuk melihatnya.",
} as const;

export const COBA_INI_O2K1A = [
  "Ketuk apel di kebun. Lihat nampan terisi.",
  "Ambil apel sampai keranjang kosong. Lihat lambangnya.",
  "Matikan Lambang. Baca banyaknya dari nama.",
  "Buka Tulis Lambang. Ikuti garis dengan jarimu.",
];
