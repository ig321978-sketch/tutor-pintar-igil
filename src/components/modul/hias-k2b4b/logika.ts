/**
 * Logika murni Simulasi Meja Rangkai Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola), akhir cerita Pameran Kerajinan Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-hias-k2b4b.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Rangkai (menyusun pita dari manik berwarna lalu memeriksa apakah polanya benar), Irama (mengetuk bunyi keras, pelan, diam lalu memeriksa),
 * dan Periksa (kartu pita: memutuskan pola atau bukan, menandai satuan pola, dan melanjutkan pola). Berkas ini tidak mengimpor berkas lain.
 */

export type ModeMeja = "rangkai" | "irama" | "periksa";
export const MODE_MEJA: ModeMeja[] = ["rangkai", "irama", "periksa"];
/** Warna manik di meja (berbeda dari Story). */
export const WARNA_MEJA = ["ungu", "hijau", "kuning", "cokelat"] as const;
export const HEX_MEJA: Record<string, string> = { ungu: "#A855F7", hijau: "#22C55E", kuning: "#FACC15", cokelat: "#A16207" };
export const BUNYI_MEJA = ["keras", "pelan", "diam"] as const;
export const PANJANG_PITA = 8;
export const PANJANG_IRAMA = 8;
/** Paling sedikit sepanjang ini supaya satuan sempat berulang dua kali. */
export const MINIMAL_PERIKSA = 4;

/** Kartu pita yang sudah jadi di meja periksa. */
export type KartuPita = { id: string; nama: string; unsur: string[] };
export const KARTU_PITA: readonly KartuPita[] = [
  { id: "kalung", nama: "kalung", unsur: ["ungu", "hijau", "ungu", "hijau", "ungu", "hijau"] },
  { id: "gelang", nama: "gelang", unsur: ["kuning", "kuning", "kuning", "kuning", "kuning", "kuning"] },
  { id: "bando", nama: "bando", unsur: ["cokelat", "ungu", "ungu", "cokelat", "ungu", "ungu", "cokelat"] },
  { id: "taplak", nama: "taplak", unsur: ["hijau", "kuning", "kuning", "hijau", "kuning", "hijau"] },
  { id: "tirai", nama: "tirai", unsur: ["kuning", "ungu", "hijau", "kuning", "ungu", "hijau", "kuning", "ungu"] },
  { id: "ikat", nama: "ikat pinggang", unsur: ["ungu", "ungu", "cokelat", "cokelat", "ungu", "ungu", "cokelat", "cokelat"] },
];

export type KeadaanMeja = {
  alat: "meja";
  mode: ModeMeja;
  /** Manik yang sudah dipasang pada pita rangkai (urut dari kiri). */
  rangkai: string[];
  /** Bunyi yang sudah diketuk pada deret irama. */
  irama: string[];
  /** Satuan (unsur digabung dengan tanda hubung) dari pita rangkai yang sudah dinyatakan pola, tanpa kembar. */
  polaPita: string[];
  polaIrama: string[];
  /** Kartu periksa yang sedang dipilih (nomor dalam KARTU_PITA), -1 bila belum ada. */
  kartu: number;
  /** Kartu yang pola atau bukannya sudah diputuskan dengan benar. */
  diputuskan: number[];
  /** Kartu pola yang satuannya sudah ditandai dengan tepat. */
  satuanDitandai: number[];
  /** Kartu pola yang sudah dilanjutkan dengan unsur berikutnya yang tepat. */
  dilanjut: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salahPeriksa: number;
};

export const awalMeja = (): KeadaanMeja => ({ alat: "meja", mode: "rangkai", rangkai: [], irama: [], polaPita: [], polaIrama: [], kartu: -1, diputuskan: [], satuanDitandai: [], dilanjut: [], salahPeriksa: 0 });
export const mulaiLagiMeja = (): KeadaanMeja => awalMeja();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);

/* ------------------------------ Pola ------------------------------ */
/** Panjang satuan terkecil bila barisan sebuah pola (paling sedikit dua unsur berbeda, berulang teratur dua kali penuh atau lebih), selain itu null. */
export function satuanPola(b: readonly string[]): number | null {
  for (let p = 2; p * 2 <= b.length; p += 1) {
    if (new Set(b.slice(0, p)).size >= 2 && b.every((u, i) => u === b[i % p])) return p;
  }
  return null;
}
export const adalahPola = (b: readonly string[]): boolean => satuanPola(b) !== null;
/** Unsur yang berikutnya pada barisan berpola, atau null bila bukan pola. */
export function unsurBerikutMeja(b: readonly string[]): string | null {
  const p = satuanPola(b);
  return p === null ? null : b[b.length % p];
}
/** Alasan sebuah barisan bukan pola. */
export function alasanBukanPola(b: readonly string[]): string {
  if (b.length < MINIMAL_PERIKSA) return "Susunan ini masih terlalu pendek untuk diperiksa. Tambah unsur sampai satuan sempat berulang.";
  if (new Set(b).size < 2) return "Semua unsurnya sama, jadi tidak ada unsur berbeda yang diulang. Ini bukan pola.";
  return "Tidak ada satuan yang berulang dan teratur dari awal. Ini bukan pola.";
}
const kunciSatuan = (b: readonly string[], p: number): string => b.slice(0, p).join("-");

/* ------------------------------ Alat ------------------------------ */
export type Hasil = { ok: boolean; k: KeadaanMeja; perlu?: "penuh" | "kosong" | "pendek" | "pilih" | "keliru" };

export const pilihModeMeja = (k: KeadaanMeja, mode: ModeMeja): KeadaanMeja => (k.mode === mode ? k : { ...k, mode });

/** Pasang satu manik di ujung pita rangkai. */
export function pasangManik(k: KeadaanMeja, warna: string): Hasil {
  if (k.rangkai.length >= PANJANG_PITA) return { ok: false, k, perlu: "penuh" };
  return { ok: true, k: { ...k, rangkai: [...k.rangkai, warna] } };
}
export function lepasManik(k: KeadaanMeja): Hasil {
  if (k.rangkai.length === 0) return { ok: false, k, perlu: "kosong" };
  return { ok: true, k: { ...k, rangkai: k.rangkai.slice(0, -1) } };
}
export const kosongkanPita = (k: KeadaanMeja): KeadaanMeja => ({ ...k, rangkai: [] });

/** Periksa pita rangkai. ok = pemeriksaan jalan; pola ada pada `satuan` (panjang) bila berhasil. */
export function periksaPita(k: KeadaanMeja): { ok: boolean; k: KeadaanMeja; pola: boolean; satuan: number | null } {
  if (k.rangkai.length < MINIMAL_PERIKSA) return { ok: false, k, pola: false, satuan: null };
  const p = satuanPola(k.rangkai);
  if (p === null) return { ok: true, k, pola: false, satuan: null };
  const kunci = kunciSatuan(k.rangkai, p);
  return { ok: true, k: k.polaPita.includes(kunci) ? k : { ...k, polaPita: [...k.polaPita, kunci] }, pola: true, satuan: p };
}

/** Ketuk satu bunyi pada deret irama. */
export function ketukIrama(k: KeadaanMeja, bunyi: string): Hasil {
  if (k.irama.length >= PANJANG_IRAMA) return { ok: false, k, perlu: "penuh" };
  return { ok: true, k: { ...k, irama: [...k.irama, bunyi] } };
}
export function lepasIrama(k: KeadaanMeja): Hasil {
  if (k.irama.length === 0) return { ok: false, k, perlu: "kosong" };
  return { ok: true, k: { ...k, irama: k.irama.slice(0, -1) } };
}
export const kosongkanIrama = (k: KeadaanMeja): KeadaanMeja => ({ ...k, irama: [] });
export function periksaIrama(k: KeadaanMeja): { ok: boolean; k: KeadaanMeja; pola: boolean; satuan: number | null } {
  if (k.irama.length < MINIMAL_PERIKSA) return { ok: false, k, pola: false, satuan: null };
  const p = satuanPola(k.irama);
  if (p === null) return { ok: true, k, pola: false, satuan: null };
  const kunci = kunciSatuan(k.irama, p);
  return { ok: true, k: k.polaIrama.includes(kunci) ? k : { ...k, polaIrama: [...k.polaIrama, kunci] }, pola: true, satuan: p };
}

/** Pilih kartu pita di meja periksa. */
export const pilihKartu = (k: KeadaanMeja, i: number): KeadaanMeja => (i >= 0 && i < KARTU_PITA.length ? { ...k, kartu: i } : k);

/** Putuskan kartu terpilih: pola atau bukan. Benar bila sesuai hitungan dari data. */
export function putuskanKartu(k: KeadaanMeja, jawabPola: boolean): Hasil {
  if (k.kartu < 0) return { ok: false, k, perlu: "pilih" };
  const benar = adalahPola(KARTU_PITA[k.kartu].unsur) === jawabPola;
  if (!benar) return { ok: false, k: { ...k, salahPeriksa: k.salahPeriksa + 1 }, perlu: "keliru" };
  return { ok: true, k: k.diputuskan.includes(k.kartu) ? k : { ...k, diputuskan: [...k.diputuskan, k.kartu] } };
}
/** Tandai satuan pola kartu terpilih: `n` = banyak kotak dari kiri yang termasuk satuan. Hanya kartu berpola. */
export function tandaiSatuan(k: KeadaanMeja, n: number): Hasil {
  if (k.kartu < 0) return { ok: false, k, perlu: "pilih" };
  const p = satuanPola(KARTU_PITA[k.kartu].unsur);
  if (p === null || n !== p) return { ok: false, k: { ...k, salahPeriksa: k.salahPeriksa + 1 }, perlu: "keliru" };
  return { ok: true, k: k.satuanDitandai.includes(k.kartu) ? k : { ...k, satuanDitandai: [...k.satuanDitandai, k.kartu] } };
}
/** Lanjutkan kartu terpilih dengan satu unsur: benar bila sama dengan unsur berikutnya pola. Hanya kartu berpola. */
export function lanjutkanKartu(k: KeadaanMeja, warna: string): Hasil {
  if (k.kartu < 0) return { ok: false, k, perlu: "pilih" };
  const berikut = unsurBerikutMeja(KARTU_PITA[k.kartu].unsur);
  if (berikut === null || warna !== berikut) return { ok: false, k: { ...k, salahPeriksa: k.salahPeriksa + 1 }, perlu: "keliru" };
  return { ok: true, k: k.dilanjut.includes(k.kartu) ? k : { ...k, dilanjut: [...k.dilanjut, k.kartu] } };
}

/* ------------------------------ Kalimat ------------------------------ */
export function kalimatMeja(k: KeadaanMeja): string {
  if (k.mode === "rangkai") return k.rangkai.length === 0 ? "Pilih warna manik untuk mulai merangkai pita." : `Pita sudah punya ${kata(k.rangkai.length)} manik. Tambah lagi, atau periksa polanya.`;
  if (k.mode === "irama") return k.irama.length === 0 ? "Ketuk keras, pelan, atau diam untuk mulai membuat irama." : `Irama sudah punya ${kata(k.irama.length)} bunyi. Tambah lagi, atau periksa polanya.`;
  return k.kartu < 0 ? "Ketuk satu kartu pita, lalu putuskan pola atau bukan." : `Kartu ${KARTU_PITA[k.kartu].nama} dipilih. Putuskan pola atau bukan, tandai satuannya, atau lanjutkan polanya.`;
}
export const petunjukKartuKeliru = (k: KeadaanMeja, aksi: "putus" | "satuan" | "lanjut"): string => {
  if (k.kartu < 0) return "Ketuk satu kartu pita dulu.";
  const b = KARTU_PITA[k.kartu].unsur;
  if (aksi === "putus") return adalahPola(b) ? "Periksa lagi dari awal. Ada satuan yang berulang dan teratur pada kartu ini." : new Set(b).size < 2 ? "Semua unsur kartu ini sama, jadi tidak ada unsur berbeda yang diulang." : "Susunan kartu ini tidak punya satuan yang berulang dari awal.";
  if (!adalahPola(b)) return "Kartu ini bukan pola, jadi tidak punya satuan. Pilih kartu yang polanya jelas.";
  return aksi === "satuan" ? "Satuan adalah susunan terkecil yang berulang dari awal. Coba ketuk kotak yang lebih awal atau lebih akhir." : "Itu belum sesuai urutan satuan. Cari satuan dari awal, lalu ulangi urutan yang sama.";
};
