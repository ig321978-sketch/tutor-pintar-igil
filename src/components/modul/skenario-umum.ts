import type { JenisBenda } from "./data-8-dasar";

/**
 * Mesin skenario kontekstual yang digerakkan data. Satu mesin, banyak skenario: tiap bab menulis cerita,
 * pilihan, dan angkanya sendiri (skenario-kelas1.ts). Anak menjadi pelaku dalam cerita sehari-hari. Pilihan
 * dan jawaban punya akibat dalam cerita. Salah pilih tidak menghukum, hanya meminta anak mencoba lagi.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-skenario-umum.mjs.
 *
 * Jenis adegan:
 *  - narasi : cerita dan tombol lanjut.
 *  - pilih  : pilih satu tindakan. Tiap pilihan punya akibat (umpan). Hanya yang benar membuka adegan berikutnya.
 *  - soal   : beberapa pertanyaan berurutan dengan pilihan jawaban.
 *  - hitung : ketuk setiap benda satu per satu, lalu pilih banyaknya.
 *  - isi    : tambah atau kurangi benda di keranjang sampai sama dengan permintaan, lalu periksa.
 *  - akhir  : penutup dan ajakan main lagi.
 */

export type Opsi = { teks: string; benar: boolean; umpan: string };
export type Soal = { teks: string; jawaban: string; opsi: string[] };

export type Adegan =
  | { id: string; jenis: "narasi"; cerita: string; tombol?: string }
  | { id: string; jenis: "pilih"; cerita: string; opsi: Opsi[] }
  | { id: string; jenis: "soal"; cerita: string; soal: Soal[]; sukses: string; salah?: string }
  | { id: string; jenis: "hitung"; cerita: string; tanya: string; objek: JenisBenda; jumlah: number; sukses: string; salah?: string }
  | { id: string; jenis: "isi"; cerita: string; objek: JenisBenda; target: number; maks: number; sukses: string; kurang?: string; lebih?: string }
  | { id: string; jenis: "akhir"; cerita: string };

export type DefSkenario = {
  id: string;
  /** Judul skenario, ditampilkan di bawah nama simulasi. */
  judul: string;
  /** Satu kalimat latar. */
  latar: string;
  /** Emoji tokoh yang bercerita dan namanya. */
  tokoh: string;
  nama: string;
  adegan: Adegan[];
};

export type Sk = {
  i: number;
  umpan: string;
  umpanBaik: boolean;
  soalKe: number;
  ketuk: boolean[];
  isi: number;
  /** Berapa kali anak diminta mencoba lagi. Hanya informasi, bukan nilai. */
  ulang: number;
};

export type PeristiwaSk =
  | { t: "LANJUT" }
  | { t: "PILIH"; i: number }
  | { t: "JAWAB"; nilai: string }
  | { t: "KETUK"; i: number }
  | { t: "UBAH"; delta: number }
  | { t: "PERIKSA" }
  | { t: "ULANG" };

function masuk(def: DefSkenario, i: number, ulang: number, umpan: string, umpanBaik: boolean): Sk {
  const a = def.adegan[i];
  return {
    i,
    umpan,
    umpanBaik,
    soalKe: 0,
    ketuk: a && a.jenis === "hitung" ? Array.from({ length: a.jumlah }, () => false) : [],
    isi: 0,
    ulang,
  };
}

export const awalSk = (def: DefSkenario): Sk => masuk(def, 0, 0, "", true);

export const adeganSk = (def: DefSkenario, s: Sk): Adegan => def.adegan[s.i];

export const semuaKetuk = (s: Sk) => s.ketuk.length > 0 && s.ketuk.every(Boolean);

/** Pilihan banyaknya untuk adegan hitung: sebelumnya, benar, sesudahnya; urutan diputar menurut jumlah. */
export function opsiHitung(a: Extract<Adegan, { jenis: "hitung" }>): string[] {
  const dasar = [a.jumlah - 1, a.jumlah, a.jumlah + 1].filter((n) => n >= 0).map(String);
  const putar = a.jumlah % dasar.length;
  return dasar.map((_, k) => dasar[(k + putar) % dasar.length]);
}

/** Ucapan tokoh pada adegan sekarang. */
export function ceritaSk(def: DefSkenario, s: Sk): string {
  const a = adeganSk(def, s);
  if (a.jenis === "soal") return `${a.cerita} ${a.soal[Math.min(s.soalKe, a.soal.length - 1)].teks}`;
  if (a.jenis === "hitung") return `${a.cerita} ${a.tanya}`;
  return a.cerita;
}

const lanjutKe = (def: DefSkenario, s: Sk, umpan: string): Sk => masuk(def, Math.min(s.i + 1, def.adegan.length - 1), s.ulang, umpan, true);
const ulangi = (s: Sk, umpan: string): Sk => ({ ...s, umpan, umpanBaik: false, ulang: s.ulang + 1 });

/** Satu langkah skenario. Selalu mengembalikan objek baru. */
export function langkahSk(def: DefSkenario, s: Sk, p: PeristiwaSk): Sk {
  const a = adeganSk(def, s);
  switch (p.t) {
    case "LANJUT":
      return a.jenis === "narasi" ? lanjutKe(def, s, "") : s;

    case "PILIH": {
      if (a.jenis !== "pilih") return s;
      const o = a.opsi[p.i];
      if (!o) return s;
      return o.benar ? lanjutKe(def, s, o.umpan) : ulangi(s, o.umpan);
    }

    case "KETUK": {
      if (a.jenis !== "hitung") return s;
      if (p.i < 0 || p.i >= s.ketuk.length || s.ketuk[p.i]) return s;
      return { ...s, umpan: "", umpanBaik: true, ketuk: s.ketuk.map((x, k) => (k === p.i ? true : x)) };
    }

    case "JAWAB": {
      if (a.jenis === "hitung") {
        if (!semuaKetuk(s)) return { ...s, umpan: "Ketuk dulu semua bendanya satu per satu.", umpanBaik: false };
        return p.nilai === String(a.jumlah) ? lanjutKe(def, s, a.sukses) : ulangi(s, a.salah ?? "Hmm, hitung lagi pelan-pelan. Ketuk satu per satu.");
      }
      if (a.jenis === "soal") {
        const q = a.soal[s.soalKe];
        if (!q) return s;
        if (p.nilai !== q.jawaban) return ulangi(s, a.salah ?? "Hmm, coba pikirkan lagi pelan-pelan, lalu pilih jawabannya.");
        const berikut = s.soalKe + 1;
        if (berikut >= a.soal.length) return lanjutKe(def, s, a.sukses);
        return { ...s, soalKe: berikut, umpan: "Tepat! Pertanyaan berikutnya.", umpanBaik: true };
      }
      return s;
    }

    case "UBAH": {
      if (a.jenis !== "isi") return s;
      return { ...s, isi: Math.min(a.maks, Math.max(0, s.isi + p.delta)), umpan: "", umpanBaik: true };
    }

    case "PERIKSA": {
      if (a.jenis !== "isi") return s;
      if (s.isi === a.target) return lanjutKe(def, s, a.sukses);
      return ulangi(s, s.isi < a.target ? (a.kurang ?? "Jumlahnya masih kurang. Tambah lagi.") : (a.lebih ?? "Jumlahnya kelebihan. Kurangi sedikit."));
    }

    case "ULANG":
      return a.jenis === "akhir" ? awalSk(def) : s;
  }
}
