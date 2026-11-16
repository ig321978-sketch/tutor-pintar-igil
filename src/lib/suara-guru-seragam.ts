import type { KelaminGuru } from "./guru";

/**
 * Suara Guru seragam (PILOT: Materi Matematika Kelas 1 Bab 1 Sub-Bab A).
 *
 * Web Speech API memakai suara yang terpasang di tiap perangkat, jadi dua perangkat tidak mungkin identik
 * bila hanya memakai suara bawaan. Modul ini menyeragamkan semua yang bisa diseragamkan:
 *  - bahasa, laju, dan nada yang tetap (lembut dan pelan): id-ID, laju 0,75, nada 1,1;
 *  - pemilihan suara yang pasti (bukan acak mengikuti urutan daftar perangkat), mendahulukan suara neural yang lebih natural;
 *  - jeda 2 detik antar paragraf;
 *  - gender guru mengikuti pilihan siswa di PILIH GURU PENGAJAR, dan hanya itu.
 *
 * Bagian di berkas ini murni (tanpa window) supaya bisa diuji di Node: scripts/uji-suara-seragam.mjs.
 */

export const SUARA_SERAGAM = {
  bahasa: "id-ID",
  /** Kecepatan bicara pelan dan lembut (1 = normal). Sebelumnya 0,85; diperlambat atas permintaan pemilik. */
  laju: 0.75,
  /**
   * Laju bicara Story dan Materi Kelas 1 (jalur suara perangkat gaya Kelas 4 sampai 6, semula 0,70). Diperlambat ke 0,60 untuk anak
   * kelas 1 atas permintaan pemilik.
   */
  lajuCeritaKelas1: 0.6,
  /** Jeda antar paragraf (milidetik): antar paragraf dalam satu naskah, dan antar ketukan (kalimat layar) pada video Story. */
  jedaAntarParagrafMs: 2000,
  /** Nada guru wanita (1 = normal). */
  nadaWanita: 1.1,
  /** Nada guru pria memakai suara pria asli milik perangkat. */
  nadaPriaAsli: 1.0,
  /** Nada guru pria bila perangkat tidak punya suara pria: suara dasar yang sama dengan wanita, nadanya diturunkan. */
  nadaPriaTurun: 0.8,
  /** Nada guru wanita bila satu-satunya suara Indonesia di perangkat adalah suara pria. */
  nadaWanitaNaik: 1.3,
} as const;

export type SuaraRingkas = { name: string; lang: string; localService: boolean };

export type PilihanSuara<T extends SuaraRingkas = SuaraRingkas> = {
  /** Suara perangkat yang dipakai. Null bila perangkat tidak punya suara Bahasa Indonesia. */
  suara: T | null;
  laju: number;
  nada: number;
  /** Suara lokal (jalan tanpa sinyal) sebagai cadangan bila suara utama gagal bicara, mis. suara neural online tanpa jaringan. Null bila tidak ada. */
  cadangan: T | null;
  /** Penjelasan singkat untuk siswa dan pengajar. */
  keterangan: string;
};

const POLA_PRIA = /\b(andika|ardi|pria|laki|male|budi|dimas)\b/i;
const POLA_WANITA = /\b(gadis|damayanti|female|wanita|perempuan|sari|zira)\b/i;

/** Suara Bahasa Indonesia: kode id atau in (Android lama), atau nama memuat "Indonesia". */
export function adalahSuaraIndonesia(s: SuaraRingkas): boolean {
  return /^(id|in)([-_]|$)/i.test(s.lang) || /indonesia/i.test(s.name);
}

const adalahPria = (s: SuaraRingkas) => POLA_PRIA.test(s.name);

/** Suara neural atau premium yang jauh lebih natural daripada suara lokal biasa (Edge: "Online (Natural)", Apple: Enhanced/Premium, Google Cloud: Wavenet/Chirp). */
const POLA_NATURAL = /natural|neural|wavenet|chirp|studio|premium|enhanced|online/i;
/** Suara Google di Chrome (jaringan): lebih halus dari suara lokal lama, tetapi di bawah suara neural. */
const POLA_GOOGLE = /^google\b/i;

function skor(s: SuaraRingkas, kecocokanNama: number): number {
  const persis = s.lang.replace("_", "-").toLowerCase() === "id-id" ? 5 : 0;
  const natural = POLA_NATURAL.test(s.name) ? 60 : POLA_GOOGLE.test(s.name) ? 30 : 0;
  return kecocokanNama + natural + (s.localService ? 20 : 0) + persis;
}

/** Urutan tetap: skor tertinggi dulu, lalu nama menurut abjad, supaya hasil tidak bergantung urutan daftar perangkat. */
function terbaik<T extends SuaraRingkas>(daftar: T[], nilai: (s: SuaraRingkas) => number): T | null {
  const urut = [...daftar].sort((a, b) => nilai(b) - nilai(a) || a.name.localeCompare(b.name));
  return urut[0] ?? null;
}

/**
 * Pilih suara dan parameter untuk guru `kelamin` dari daftar suara perangkat.
 * Wanita: suara Indonesia yang bukan suara pria. Pria: suara pria asli bila ada; bila tidak, suara dasar yang sama
 * dengan wanita dengan nada diturunkan.
 */
export function pilihSuaraSeragam<T extends SuaraRingkas>(daftarSemua: T[], kelamin: KelaminGuru): PilihanSuara<T> {
  const daftar = daftarSemua.filter(adalahSuaraIndonesia);
  const laju = SUARA_SERAGAM.laju;
  if (daftar.length === 0) {
    return {
      suara: null,
      cadangan: null,
      laju,
      nada: kelamin === "pria" ? SUARA_SERAGAM.nadaPriaTurun : SUARA_SERAGAM.nadaWanita,
      keterangan: "Perangkat ini belum punya suara Bahasa Indonesia. Pasang lewat Pengaturan, Suara (Text-to-speech).",
    };
  }

  const bukanPria = daftar.filter((s) => !adalahPria(s));
  const nilaiWanita = (s: SuaraRingkas) => skor(s, POLA_WANITA.test(s.name) ? 100 : 50);
  const dasar = terbaik(bukanPria, nilaiWanita);

  /** Suara lokal terbaik selain `utama`, dipakai bila suara utama (mis. neural online) gagal bicara. */
  const lokalSelain = (kandidat: T[], nilai: (s: SuaraRingkas) => number, utama: T | null): T | null => terbaik(kandidat.filter((s) => s.localService && s !== utama), nilai);

  if (kelamin === "pria") {
    const nilaiPria = (s: SuaraRingkas) => skor(s, 100);
    const priaAsli = daftar.filter(adalahPria);
    const asli = terbaik(priaAsli, nilaiPria);
    if (asli) return { suara: asli, cadangan: lokalSelain(priaAsli, nilaiPria, asli), laju, nada: SUARA_SERAGAM.nadaPriaAsli, keterangan: "Suara pria asli milik perangkat." };
    if (dasar) return { suara: dasar, cadangan: lokalSelain(bukanPria, nilaiWanita, dasar), laju, nada: SUARA_SERAGAM.nadaPriaTurun, keterangan: "Perangkat tidak punya suara pria. Suara dasar yang sama dipakai dengan nada diturunkan." };
  }

  if (dasar) return { suara: dasar, cadangan: lokalSelain(bukanPria, nilaiWanita, dasar), laju, nada: SUARA_SERAGAM.nadaWanita, keterangan: "Suara wanita milik perangkat." };

  // Hanya ada suara pria di perangkat ini.
  const pria = terbaik(daftar, (s) => skor(s, 100));
  return {
    suara: pria,
    cadangan: lokalSelain(daftar, (s) => skor(s, 100), pria),
    laju,
    nada: kelamin === "wanita" ? SUARA_SERAGAM.nadaWanitaNaik : SUARA_SERAGAM.nadaPriaAsli,
    keterangan: kelamin === "wanita" ? "Perangkat hanya punya suara pria. Nada dinaikkan untuk guru wanita." : "Suara pria asli milik perangkat.",
  };
}

/** Pecah naskah menjadi potongan pendek. Suara jaringan Chrome berhenti sendiri bila satu ucapan terlalu panjang. */
export function pecahKalimat(teks: string, maks = 170): string[] {
  const bersih = teks.replace(/\s+/g, " ").trim();
  if (!bersih) return [];
  // Tanpa lookbehind supaya aman di Safari lama.
  const kalimat = (bersih.match(/[^.!?…]+[.!?…]*/g) ?? [bersih]).map((k) => k.trim()).filter(Boolean);
  const hasil: string[] = [];
  let kini = "";
  const tutup = () => {
    if (kini) hasil.push(kini);
    kini = "";
  };
  for (const k of kalimat) {
    if (k.length > maks) {
      tutup();
      let sisa = k;
      while (sisa.length > maks) {
        let potong = sisa.lastIndexOf(",", maks);
        if (potong < maks / 2) potong = sisa.lastIndexOf(" ", maks);
        if (potong <= 0) potong = maks;
        hasil.push(sisa.slice(0, potong + 1).trim());
        sisa = sisa.slice(potong + 1).trim();
      }
      kini = sisa;
      continue;
    }
    if (kini && kini.length + 1 + k.length > maks) tutup();
    kini = kini ? `${kini} ${k}` : k;
  }
  tutup();
  return hasil;
}

/** Pecah naskah menjadi paragraf: baris kosong atau pindah baris memisahkan paragraf. Spasi berlebih dalam paragraf dirapikan. */
export function pecahParagraf(teks: string): string[] {
  return teks
    .split(/\r?\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export type PotonganUcap = { teks: string; /** Jeda (milidetik) sebelum potongan ini diucapkan. */ jedaSebelumMs: number };

/**
 * Naskah menjadi potongan ucapan berurutan. Potongan pertama tiap paragraf (selain paragraf pertama) diberi jeda `jedaMs`
 * (bawaan 2 detik), jadi tiap paragraf terdengar terpisah. Tiap paragraf dipecah per kalimat (paling banyak `maks` huruf).
 */
export function potongBerjeda(teks: string, jedaMs: number = SUARA_SERAGAM.jedaAntarParagrafMs, maks = 170): PotonganUcap[] {
  const hasil: PotonganUcap[] = [];
  pecahParagraf(teks).forEach((paragraf, i) => {
    pecahKalimat(paragraf, maks).forEach((t, j) => hasil.push({ teks: t, jedaSebelumMs: i > 0 && j === 0 ? jedaMs : 0 }));
  });
  return hasil;
}
