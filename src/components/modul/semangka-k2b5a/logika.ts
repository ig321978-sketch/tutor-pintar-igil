/**
 * Logika murni Simulasi Meja Bagi Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu" (setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-semangka-k2b5a.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Belah (membelah benda lewat garis pilihan, lalu menumpuk dua bagian untuk memeriksa pas atau tidak), Tuang (memindahkan susu antargelas sampai
 * sama tinggi), dan Lipat (melipat kertas lewat garis pilihan; lipatan pas bila bayangan satu sisi menutup sisi yang lain). Luas bagian dihitung program.
 * Data benda ada di data-peta.ts (berbeda dari Story).
 */
import { bagian, luasRelatif, setengah, simetri, type Gbr } from "./bagian";
import { BENDA_BAGI, KERTAS_LIPAT, TOTAL_TUANG } from "./data-peta";

export type ModeSemangka = "belah" | "tuang" | "lipat";

export type KeadaanSemangka = {
  alat: "semangka";
  mode: ModeSemangka;
  /** Benda yang sedang dipilih untuk dibelah (nomor dalam BENDA_BAGI) dan garis calonnya (nomor dalam garis benda itu), -1 bila belum dipilih. */
  benda: number;
  garis: number;
  /** Benda yang sudah dibelah tepat di tengah (dua bagian sama besar), dan yang bagiannya sudah ditumpuk. */
  dibelah: number[];
  ditumpuk: number[];
  /** Kertas dan garis lipat yang sedang dipilih; lipatan yang pas dicatat sebagai `kertas-garis`. */
  kertas: number;
  lipat: number;
  lipatBenar: string[];
  /** Dua gelas susu: takaran di gelas kiri dan gelas kanan; putaran tuang berjalan; putaran yang sudah selesai (sama tinggi). */
  gelasA: number;
  gelasB: number;
  putaran: number;
  tuangBenar: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salahBelah: number;
  salahLipat: number;
  salahTuang: number;
};

export const awalSemangka = (): KeadaanSemangka => ({
  alat: "semangka",
  mode: "belah",
  benda: -1,
  garis: -1,
  dibelah: [],
  ditumpuk: [],
  kertas: -1,
  lipat: -1,
  lipatBenar: [],
  gelasA: TOTAL_TUANG[0],
  gelasB: 0,
  putaran: 0,
  tuangBenar: [],
  salahBelah: 0,
  salahLipat: 0,
  salahTuang: 0,
});
export const mulaiLagiSemangka = (): KeadaanSemangka => awalSemangka();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

export const pilihModeSemangka = (k: KeadaanSemangka, mode: ModeSemangka): KeadaanSemangka => ({ ...k, mode });

/* ------------------------------ Belah ------------------------------ */
export const gambarBelah = (benda: number, garis: number): Gbr => ({ b: BENDA_BAGI[benda].b, g: [BENDA_BAGI[benda].garis[garis].g] });
export function pilihBendaBelah(k: KeadaanSemangka, i: number): KeadaanSemangka {
  if (i < 0 || i >= BENDA_BAGI.length) return k;
  return { ...k, benda: i, garis: -1 };
}
export function pilihGarisBelah(k: KeadaanSemangka, j: number): KeadaanSemangka {
  if (k.benda < 0 || j < 0 || j >= BENDA_BAGI[k.benda].garis.length) return k;
  return { ...k, garis: j };
}
export type HasilBelah = { k: KeadaanSemangka; ok: boolean; perlu: "benda" | "garis" | null };
/** Belah benda yang dipilih lewat garis yang dipilih. Hanya garis yang membuat dua bagian sama besar yang tercatat; garis lain hanya menambah hitungan percobaan. */
export function belahBenda(k: KeadaanSemangka): HasilBelah {
  if (k.benda < 0) return { k, ok: false, perlu: "benda" };
  if (k.garis < 0) return { k, ok: false, perlu: "garis" };
  if (!setengah(gambarBelah(k.benda, k.garis))) return { k: { ...k, salahBelah: k.salahBelah + 1 }, ok: false, perlu: null };
  return { k: k.dibelah.includes(k.benda) ? k : { ...k, dibelah: [...k.dibelah, k.benda] }, ok: true, perlu: null };
}
/** Tumpuk dua bagian benda yang sudah dibelah tepat: keduanya pas (sama besar). */
export function tumpukBagian(k: KeadaanSemangka): { k: KeadaanSemangka; ok: boolean } {
  if (k.benda < 0 || !k.dibelah.includes(k.benda)) return { k, ok: false };
  return { k: k.ditumpuk.includes(k.benda) ? k : { ...k, ditumpuk: [...k.ditumpuk, k.benda] }, ok: true };
}
/** Benda `i` sudah dibelah tepat dan garis `j` yang sedang dipilih adalah garis yang adil? */
export const garisAdilSim = (benda: number, garis: number): boolean => setengah(gambarBelah(benda, garis));
export const banyakBagianSim = (benda: number, garis: number): number => bagian(gambarBelah(benda, garis)).length;

/* ------------------------------ Lipat ------------------------------ */
export const gambarLipat = (kertas: number, lipat: number): Gbr => ({ b: KERTAS_LIPAT[kertas].b, g: [KERTAS_LIPAT[kertas].garis[lipat].g] });
export function pilihKertasLipat(k: KeadaanSemangka, i: number): KeadaanSemangka {
  if (i < 0 || i >= KERTAS_LIPAT.length) return k;
  return { ...k, kertas: i, lipat: -1 };
}
export function pilihGarisLipat(k: KeadaanSemangka, j: number): KeadaanSemangka {
  if (k.kertas < 0 || j < 0 || j >= KERTAS_LIPAT[k.kertas].garis.length) return k;
  return { ...k, lipat: j };
}
export type HasilLipat = { k: KeadaanSemangka; ok: boolean; perlu: "kertas" | "garis" | null };
/** Lipat kertas pada garis yang dipilih. Pas bila bayangan satu sisi persis menutup sisi yang lain; hanya lipatan pas yang tercatat. */
export function lipatKertas(k: KeadaanSemangka): HasilLipat {
  if (k.kertas < 0) return { k, ok: false, perlu: "kertas" };
  if (k.lipat < 0) return { k, ok: false, perlu: "garis" };
  if (!simetri(gambarLipat(k.kertas, k.lipat))) return { k: { ...k, salahLipat: k.salahLipat + 1 }, ok: false, perlu: null };
  const id = `${k.kertas}-${k.lipat}`;
  return { k: k.lipatBenar.includes(id) ? k : { ...k, lipatBenar: [...k.lipatBenar, id] }, ok: true, perlu: null };
}

/* ------------------------------ Tuang ------------------------------ */
export const totalTuang = (k: KeadaanSemangka): number => TOTAL_TUANG[k.putaran % TOTAL_TUANG.length];
/** Pindahkan satu takaran dari gelas kiri ke kanan (arah 1) atau kembali (arah -1). */
export function tuangSusu(k: KeadaanSemangka, arah: 1 | -1): KeadaanSemangka {
  if (arah === 1 && k.gelasA > 0) return { ...k, gelasA: k.gelasA - 1, gelasB: k.gelasB + 1 };
  if (arah === -1 && k.gelasB > 0) return { ...k, gelasA: k.gelasA + 1, gelasB: k.gelasB - 1 };
  return k;
}
/** Periksa apakah kedua gelas sama tinggi. Hanya yang sama tinggi tercatat; putaran itu selesai. */
export function periksaTuang(k: KeadaanSemangka): { k: KeadaanSemangka; ok: boolean } {
  if (k.gelasA === k.gelasB && k.gelasB > 0) return { k: k.tuangBenar.includes(k.putaran) ? k : { ...k, tuangBenar: [...k.tuangBenar, k.putaran] }, ok: true };
  return { k: { ...k, salahTuang: k.salahTuang + 1 }, ok: false };
}
/** Isi gelas lagi untuk putaran berikutnya (takaran seluruhnya berganti). */
export function isiLagi(k: KeadaanSemangka): KeadaanSemangka {
  const putaran = k.putaran + 1;
  return { ...k, putaran, gelasA: TOTAL_TUANG[putaran % TOTAL_TUANG.length], gelasB: 0 };
}

/* ------------------------------ Petunjuk dan kalimat untuk suara (tanpa digit) ------------------------------ */
export function petunjukBelah(benda: number, garis: number): string {
  const b = BENDA_BAGI[benda];
  const g = gambarBelah(benda, garis);
  const n = bagian(g).length;
  const luas = luasRelatif(g);
  if (n !== 2) return `${besar(b.nama)} terbagi menjadi ${kata(n)} bagian, padahal setengah harus dua bagian sama besar.`;
  return `Garis ${b.garis[garis].nama} membuat satu bagian lebih besar daripada bagian yang lain: ${luas[0] > luas[1] ? "bagian pertama" : "bagian kedua"} lebih besar. Geser garisnya ke tengah supaya kedua bagian sama besar.`;
}
export function petunjukLipat(kertas: number, lipat: number): string {
  const kr = KERTAS_LIPAT[kertas];
  const luas = luasRelatif(gambarLipat(kertas, lipat));
  const sama = Math.abs(luas[0] - luas[1]) < 0.012;
  return sama
    ? `Kedua sisi ${kr.nama} sama luas, tetapi bentuknya tidak saling menutup di garis itu. Coba garis lain.`
    : `Satu sisi ${kr.nama} lebih besar, jadi saat dilipat ada bagian yang menjulur. Geser garis lipat ke tengah.`;
}
export function petunjukTuang(k: KeadaanSemangka): string {
  if (k.gelasB === 0) return "Gelas kanan masih kosong. Tuang susu dari gelas kiri sedikit demi sedikit.";
  if (k.gelasA > k.gelasB) return "Gelas kiri masih lebih tinggi daripada gelas kanan. Tuang lagi supaya sama tinggi.";
  return "Gelas kanan sekarang lebih tinggi daripada gelas kiri. Tuang balik sedikit supaya sama tinggi.";
}

export function kalimatSemangka(k: KeadaanSemangka): string {
  if (k.mode === "belah") {
    if (k.benda < 0) return "Ketuk satu benda di meja, lalu pilih garis potongnya.";
    const b = BENDA_BAGI[k.benda];
    if (k.garis < 0) return `Pilih garis untuk membelah ${b.nama}.`;
    if (k.dibelah.includes(k.benda)) return `${besar(b.nama)} sudah dibelah menjadi dua bagian sama besar. Tumpuk kedua bagiannya untuk memeriksa.`;
    return `Garis ${b.garis[k.garis].nama} dipilih. Tekan Belah untuk mencoba.`;
  }
  if (k.mode === "tuang") return k.tuangBenar.includes(k.putaran) ? "Kedua gelas sama tinggi, masing-masing setengah. Isi lagi untuk putaran berikutnya." : "Tuang susu dari gelas kiri sampai kedua gelas sama tinggi, lalu tekan Periksa.";
  if (k.kertas < 0) return "Ketuk satu kertas, lalu pilih garis lipatnya.";
  if (k.lipat < 0) return `Pilih garis lipat untuk ${KERTAS_LIPAT[k.kertas].nama}.`;
  return `${besar(KERTAS_LIPAT[k.kertas].garis[k.lipat].nama)} dipilih. Tekan Lipat untuk mencoba.`;
}
