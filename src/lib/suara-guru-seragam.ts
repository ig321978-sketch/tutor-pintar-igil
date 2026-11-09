import type { KelaminGuru } from "./guru";

/**
 * Suara Guru seragam (PILOT: Materi Matematika Kelas 1 Bab 1 Sub-Bab A).
 *
 * Web Speech API memakai suara yang terpasang di tiap perangkat, jadi dua perangkat tidak mungkin identik
 * bila hanya memakai suara bawaan. Modul ini menyeragamkan semua yang bisa diseragamkan:
 *  - bahasa, laju, dan nada yang tetap (lembut): id-ID, laju 0,85, nada 1,1;
 *  - pemilihan suara yang pasti (bukan acak mengikuti urutan daftar perangkat);
 *  - gender guru mengikuti pilihan siswa di PILIH GURU PENGAJAR, dan hanya itu.
 *
 * Bagian di berkas ini murni (tanpa window) supaya bisa diuji di Node: scripts/uji-suara-seragam.mjs.
 */

export const SUARA_SERAGAM = {
  bahasa: "id-ID",
  /** Kecepatan bicara lembut (1 = normal). */
  laju: 0.85,
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

function skor(s: SuaraRingkas, kecocokanNama: number): number {
  const persis = s.lang.replace("_", "-").toLowerCase() === "id-id" ? 5 : 0;
  return kecocokanNama + (s.localService ? 20 : 0) + persis;
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
      laju,
      nada: kelamin === "pria" ? SUARA_SERAGAM.nadaPriaTurun : SUARA_SERAGAM.nadaWanita,
      keterangan: "Perangkat ini belum punya suara Bahasa Indonesia. Pasang lewat Pengaturan, Suara (Text-to-speech).",
    };
  }

  const bukanPria = daftar.filter((s) => !adalahPria(s));
  const nilaiWanita = (s: SuaraRingkas) => skor(s, POLA_WANITA.test(s.name) ? 100 : 50);
  const dasar = terbaik(bukanPria, nilaiWanita);

  if (kelamin === "pria") {
    const asli = terbaik(daftar.filter(adalahPria), (s) => skor(s, 100));
    if (asli) return { suara: asli, laju, nada: SUARA_SERAGAM.nadaPriaAsli, keterangan: "Suara pria asli milik perangkat." };
    if (dasar) return { suara: dasar, laju, nada: SUARA_SERAGAM.nadaPriaTurun, keterangan: "Perangkat tidak punya suara pria. Suara dasar yang sama dipakai dengan nada diturunkan." };
  }

  if (dasar) return { suara: dasar, laju, nada: SUARA_SERAGAM.nadaWanita, keterangan: "Suara wanita milik perangkat." };

  // Hanya ada suara pria di perangkat ini.
  const pria = terbaik(daftar, (s) => skor(s, 100));
  return {
    suara: pria,
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
