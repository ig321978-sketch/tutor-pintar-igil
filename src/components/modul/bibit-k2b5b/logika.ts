/**
 * Logika murni Simulasi Bedeng Bibit Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak" (setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bibit-k2b5b.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Bagi (membagi tumpukan benda satu-satu ke dua petak sampai habis, termasuk tumpukan ganjil yang menyisakan satu), Neraca (memindahkan benda
 * dari piringan yang lebih banyak sampai seimbang), dan Gabung (menggandakan setengahnya menjadi seluruhnya). Berkas ini tidak mengimpor berkas lain.
 */

export type ModeBibit = "bagi" | "neraca" | "gabung";
export const MODE_BIBIT: ModeBibit[] = ["bagi", "neraca", "gabung"];

/** Tumpukan yang bisa dibagi di bedeng (benda dan bilangan berbeda dari Story). */
export type TumpukBagi = { benda: string; emoji: string; total: number };
export const TUMPUK_BAGI: readonly TumpukBagi[] = [
  { benda: "jagung", emoji: "\u{1F33D}", total: 4 },
  { benda: "wortel", emoji: "\u{1F955}", total: 8 },
  { benda: "terong", emoji: "\u{1F346}", total: 5 },
  { benda: "apel", emoji: "\u{1F34E}", total: 9 },
  { benda: "bunga", emoji: "\u{1F33B}", total: 10 },
];
/** Paket neraca: isi awal piringan kiri dan kanan (selisihnya selalu genap). */
export type PaketNeraca = { benda: string; emoji: string; kiri: number; kanan: number };
export const PAKET_NERACA: readonly PaketNeraca[] = [
  { benda: "jagung", emoji: "\u{1F33D}", kiri: 6, kanan: 2 },
  { benda: "wortel", emoji: "\u{1F955}", kiri: 3, kanan: 9 },
  { benda: "apel", emoji: "\u{1F34E}", kiri: 8, kanan: 4 },
  { benda: "terong", emoji: "\u{1F346}", kiri: 1, kanan: 7 },
];
/** Setengah yang bisa digandakan. */
export const SETENGAH_GABUNG: readonly number[] = [2, 3, 4, 5];

export type KeadaanBibit = {
  alat: "bibit";
  mode: ModeBibit;
  /** Bagi: tumpukan terpilih (nomor dalam TUMPUK_BAGI), sisa di meja, isi petak kiri dan kanan, petak yang baru diberi (-1 belum ada). */
  tumpuk: number;
  sisa: number;
  kiri: number;
  kanan: number;
  terakhir: -1 | 0 | 1;
  /** Tumpukan genap yang sudah dibagi habis dan sama banyak. */
  terbagi: number[];
  /** Tumpukan ganjil yang sudah dibagi sampai tersisa satu benda tanpa pasangan. */
  ganjilSelesai: number[];
  /** Neraca: paket terpilih, isi piringan kiri dan kanan sekarang. */
  paket: number;
  piringKiri: number;
  piringKanan: number;
  /** Paket neraca yang sudah seimbang. */
  neracaSet: number[];
  /** Gabung: setengah terpilih (nomor dalam SETENGAH_GABUNG), apakah sudah digandakan, dan setengah yang sudah digandakan. */
  setengah: number;
  digandakanSekarang: boolean;
  digandakan: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salahCoba: number;
};

export const awalBibit = (): KeadaanBibit => ({
  alat: "bibit",
  mode: "bagi",
  tumpuk: 0,
  sisa: TUMPUK_BAGI[0].total,
  kiri: 0,
  kanan: 0,
  terakhir: -1,
  terbagi: [],
  ganjilSelesai: [],
  paket: 0,
  piringKiri: PAKET_NERACA[0].kiri,
  piringKanan: PAKET_NERACA[0].kanan,
  neracaSet: [],
  setengah: 0,
  digandakanSekarang: false,
  digandakan: [],
  salahCoba: 0,
});
export const mulaiLagiBibit = (): KeadaanBibit => awalBibit();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);

export type Hasil = { ok: boolean; k: KeadaanBibit; perlu?: "habis" | "gantian" | "ganjil" | "kosong" | "arah" | "belum" };

export const pilihModeBibit = (k: KeadaanBibit, mode: ModeBibit): KeadaanBibit => (k.mode === mode ? k : { ...k, mode });

/* ------------------------------ Bagi ------------------------------ */
export const totalBagi = (k: KeadaanBibit): number => TUMPUK_BAGI[k.tumpuk].total;
/** Pilih tumpukan lain: meja diisi lagi dan kedua petak dikosongkan. */
export function pilihTumpuk(k: KeadaanBibit, i: number): KeadaanBibit {
  if (i < 0 || i >= TUMPUK_BAGI.length) return k;
  return { ...k, tumpuk: i, sisa: TUMPUK_BAGI[i].total, kiri: 0, kanan: 0, terakhir: -1 };
}
export const ulangBagi = (k: KeadaanBibit): KeadaanBibit => pilihTumpuk(k, k.tumpuk);

/**
 * Beri satu benda ke petak `sisi` (0 kiri, 1 kanan). Harus bergantian: petak yang baru diberi tidak boleh diberi lagi. Bila tersisa satu benda dan kedua petak
 * sudah sama banyak, benda itu tidak bisa dibagi (benda tidak boleh dipecah): tumpukan ganjil, dicatat.
 */
export function beriSatu(k: KeadaanBibit, sisi: 0 | 1): Hasil {
  if (k.sisa === 0) return { ok: false, k, perlu: "habis" };
  if (k.sisa === 1 && k.kiri === k.kanan) {
    const ganjil = k.ganjilSelesai.includes(k.tumpuk) ? k : { ...k, ganjilSelesai: [...k.ganjilSelesai, k.tumpuk] };
    return { ok: false, k: ganjil, perlu: "ganjil" };
  }
  if (k.terakhir === sisi) return { ok: false, k: { ...k, salahCoba: k.salahCoba + 1 }, perlu: "gantian" };
  let baru: KeadaanBibit = { ...k, sisa: k.sisa - 1, kiri: k.kiri + (sisi === 0 ? 1 : 0), kanan: k.kanan + (sisi === 1 ? 1 : 0), terakhir: sisi };
  if (baru.sisa === 0 && baru.kiri === baru.kanan && !baru.terbagi.includes(baru.tumpuk)) baru = { ...baru, terbagi: [...baru.terbagi, baru.tumpuk] };
  if (baru.sisa === 1 && baru.kiri === baru.kanan && !baru.ganjilSelesai.includes(baru.tumpuk)) baru = { ...baru, ganjilSelesai: [...baru.ganjilSelesai, baru.tumpuk] };
  return { ok: true, k: baru };
}
/** Tumpukan terpilih bisa dibagi dua sama banyak (genap). */
export const tumpukGenap = (k: KeadaanBibit): boolean => totalBagi(k) % 2 === 0;

/* ------------------------------ Neraca ------------------------------ */
export function pilihPaket(k: KeadaanBibit, i: number): KeadaanBibit {
  if (i < 0 || i >= PAKET_NERACA.length) return k;
  return { ...k, paket: i, piringKiri: PAKET_NERACA[i].kiri, piringKanan: PAKET_NERACA[i].kanan };
}
export const ulangNeraca = (k: KeadaanBibit): KeadaanBibit => pilihPaket(k, k.paket);
export const neracaSeimbang = (k: KeadaanBibit): boolean => k.piringKiri === k.piringKanan;
/** Miring ke: -1 kiri turun (kiri lebih banyak), 0 seimbang, 1 kanan turun. */
export const miringNeraca = (k: KeadaanBibit): -1 | 0 | 1 => (k.piringKiri > k.piringKanan ? -1 : k.piringKiri < k.piringKanan ? 1 : 0);
/**
 * Pindahkan satu benda dari piringan `dari` ke piringan lain. Saat neraca masih miring, benda hanya boleh dipindahkan dari piringan yang lebih banyak.
 * Saat sudah seimbang, boleh dari piringan mana saja (untuk mencoba).
 */
export function pindahBenda(k: KeadaanBibit, dari: "kiri" | "kanan"): Hasil {
  const asal = dari === "kiri" ? k.piringKiri : k.piringKanan;
  if (asal <= 0) return { ok: false, k, perlu: "kosong" };
  const m = miringNeraca(k);
  if (m !== 0 && ((dari === "kiri" && m === 1) || (dari === "kanan" && m === -1))) return { ok: false, k: { ...k, salahCoba: k.salahCoba + 1 }, perlu: "arah" };
  const baru: KeadaanBibit = { ...k, piringKiri: k.piringKiri + (dari === "kiri" ? -1 : 1), piringKanan: k.piringKanan + (dari === "kanan" ? -1 : 1) };
  if (neracaSeimbang(baru) && !baru.neracaSet.includes(baru.paket)) return { ok: true, k: { ...baru, neracaSet: [...baru.neracaSet, baru.paket] } };
  return { ok: true, k: baru };
}

/* ------------------------------ Gabung ------------------------------ */
export function pilihSetengah(k: KeadaanBibit, i: number): KeadaanBibit {
  if (i < 0 || i >= SETENGAH_GABUNG.length) return k;
  return { ...k, setengah: i, digandakanSekarang: false };
}
export const setengahSekarang = (k: KeadaanBibit): number => SETENGAH_GABUNG[k.setengah];
export function gandakan(k: KeadaanBibit): Hasil {
  if (k.digandakanSekarang) return { ok: false, k, perlu: "habis" };
  const h = setengahSekarang(k);
  return { ok: true, k: { ...k, digandakanSekarang: true, digandakan: k.digandakan.includes(h) ? k.digandakan : [...k.digandakan, h] } };
}
export const bagiLagi = (k: KeadaanBibit): KeadaanBibit => ({ ...k, digandakanSekarang: false });

/* ------------------------------ Kalimat ------------------------------ */
export function kalimatBibit(k: KeadaanBibit): string {
  if (k.mode === "bagi") {
    const t = TUMPUK_BAGI[k.tumpuk];
    if (k.sisa === t.total) return `Ada ${kata(t.total)} ${t.benda} di meja. Beri satu ke petak kiri atau kanan, bergantian, sampai habis.`;
    if (k.sisa === 0) return `Habis! Petak kiri ${kata(k.kiri)} dan petak kanan ${kata(k.kanan)}. Sama banyak, jadi setengah dari ${kata(t.total)} adalah ${kata(k.kiri)}.`;
    if (k.sisa === 1 && k.kiri === k.kanan) return `Tersisa satu ${t.benda} tanpa pasangan. Benda tidak boleh dipecah, jadi ${kata(t.total)} tidak punya setengah utuh.`;
    return `Sisa ${kata(k.sisa)} di meja. Petak kiri ${kata(k.kiri)}, petak kanan ${kata(k.kanan)}. Beri ke petak berikutnya.`;
  }
  if (k.mode === "neraca") {
    const p = PAKET_NERACA[k.paket];
    if (neracaSeimbang(k)) return `Neraca seimbang! Tiap piringan berisi ${kata(k.piringKiri)} ${p.benda}, jadi sama banyak.`;
    return `Neraca miring ke ${miringNeraca(k) === -1 ? "kiri" : "kanan"}: ${kata(k.piringKiri)} di kiri dan ${kata(k.piringKanan)} di kanan. Pindahkan dari piringan yang lebih banyak.`;
  }
  const h = setengahSekarang(k);
  return k.digandakanSekarang ? `Dua kali ${kata(h)} adalah ${kata(2 * h)}. Dua setengah digabung kembali menjadi seluruhnya.` : `Setengahnya ${kata(h)}. Ketuk Gandakan untuk melihat seluruhnya.`;
}
export const petunjukBibit = (perlu: Hasil["perlu"], k: KeadaanBibit): string => {
  if (perlu === "gantian") return `Bagi bergantian. Petak ${k.terakhir === 0 ? "kiri" : "kanan"} baru saja diberi, sekarang giliran petak ${k.terakhir === 0 ? "kanan" : "kiri"}.`;
  if (perlu === "habis") return k.mode === "gabung" ? "Tumpukan sudah digandakan. Bagi lagi, atau pilih setengah yang lain." : "Benda di meja sudah habis. Ketuk Ulangi, atau pilih tumpukan lain.";
  if (perlu === "ganjil") return "Tersisa satu benda tanpa pasangan. Benda tidak boleh dipecah, jadi bilangan ganjil tidak punya setengah utuh.";
  if (perlu === "arah") return "Pindahkan benda dari piringan yang lebih banyak ke piringan yang lebih sedikit, bukan sebaliknya.";
  if (perlu === "kosong") return "Piringan itu sudah kosong.";
  return "Coba lagi.";
};
