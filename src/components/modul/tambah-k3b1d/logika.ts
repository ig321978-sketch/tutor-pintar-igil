/**
 * Logika murni Simulasi Meja Pesanan Kelas 3 Bab 1 Sub-Bab D "Pesanan Bu Tuti" (penjumlahan sampai 100), Toko Kelontong Pak Joko.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tambah-k3b1d.mjs. Eksplorasi bebas tanpa skor hasil tidak lebih dari seratus.
 * Lima alat: Susun (menulis satuan, simpanan, dan puluhan hasil di susun pendek), Tukar (sepuluh butir satuan ditukar satu batang puluhan), Panjang (menguraikan puluhan dan satuan),
 * Tiga (menjumlah tiga bilangan dua-dua) dan Periksa (menukar urutan dan menaksir). Bilangan ada di data-sim.ts.
 */
import { PANJANG_SIM, PERIKSA_SIM, PESANAN_SIM, TIGA_SIM, TUKAR_AWAL } from "./data-sim";

export type ModePesanan = "susun" | "tukar" | "panjang" | "tiga" | "periksa";
export type Pilihan = "" | "sama" | "beda";

export type KeadaanPesanan = {
  alat: "pesanan";
  mode: ModePesanan;
  /** Susun: nomor pesanan, isian satuan, simpanan (0 atau 1), dan puluhan; pesanan yang sudah tepat. */
  noSusun: number;
  sSatuan: number;
  sSimpan: number;
  sPuluhan: number;
  susunBenar: number[];
  /** Tukar: butir lepas dan batang puluhan sekarang, banyak penukaran, dan semua satuan sudah kurang dari sepuluh. */
  butir: number;
  batang: number;
  tukarKali: number;
  tukarSelesai: boolean;
  /** Panjang: jumlah puluhan dan jumlah satuan yang diisi, dan sudah tepat. */
  pjPuluh: number;
  pjSatuan: number;
  panjangBenar: boolean;
  /** Tiga: jumlah dua bilangan pertama, jumlah seluruhnya, dan sudah tepat. */
  tgSementara: number;
  tgHasil: number;
  tigaBenar: boolean;
  /** Periksa: pilihan hasil setelah ditukar urutannya, taksiran yang dipilih (0 bila belum), dan sudah tepat. */
  pkPilih: Pilihan;
  pkTaksir: number;
  periksaBenar: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalPesanan = (): KeadaanPesanan => ({
  alat: "pesanan",
  mode: "susun",
  noSusun: 0,
  sSatuan: 0,
  sSimpan: 0,
  sPuluhan: 0,
  susunBenar: [],
  butir: TUKAR_AWAL.butir,
  batang: TUKAR_AWAL.batang,
  tukarKali: 0,
  tukarSelesai: false,
  pjPuluh: 0,
  pjSatuan: 0,
  panjangBenar: false,
  tgSementara: 0,
  tgHasil: 0,
  tigaBenar: false,
  pkPilih: "",
  pkTaksir: 0,
  periksaBenar: false,
  salah: 0,
});
export const mulaiLagiPesanan = (): KeadaanPesanan => awalPesanan();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 100 dalam kata. */
export function kata(n: number): string {
  if (n === 100) return "seratus";
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

export const pilihModePesanan = (k: KeadaanPesanan, mode: ModePesanan): KeadaanPesanan => ({ ...k, mode });

/* ------------------------------ Susun pendek ------------------------------ */
export const pesananKe = (k: KeadaanPesanan) => PESANAN_SIM[k.noSusun];
export const jumlahPesanan = (k: KeadaanPesanan): number => pesananKe(k).a + pesananKe(k).b;
/** Satuan hasil, simpanan, dan puluhan hasil yang tepat untuk pesanan ke-n. */
export const kunciSusun = (n: number): { satuan: number; simpan: number; puluhan: number } => {
  const { a, b } = PESANAN_SIM[n];
  const s = (a % 10) + (b % 10);
  return { satuan: s % 10, simpan: s >= 10 ? 1 : 0, puluhan: Math.floor(a / 10) + Math.floor(b / 10) + (s >= 10 ? 1 : 0) };
};
export type BagianSusun = "satuan" | "simpan" | "puluhan";
/** Ubah satu isian susun dengan arah +1 atau -1. Satuan 0 sampai 9, simpanan 0 sampai 1, puluhan 0 sampai 9. */
export function ubahSusun(k: KeadaanPesanan, bagian: BagianSusun, arah: 1 | -1): { k: KeadaanPesanan; ok: boolean } {
  const maks = bagian === "simpan" ? 1 : 9;
  const kini = bagian === "satuan" ? k.sSatuan : bagian === "simpan" ? k.sSimpan : k.sPuluhan;
  const baru = kini + arah;
  if (baru < 0 || baru > maks) return { k, ok: false };
  return { k: { ...k, sSatuan: bagian === "satuan" ? baru : k.sSatuan, sSimpan: bagian === "simpan" ? baru : k.sSimpan, sPuluhan: bagian === "puluhan" ? baru : k.sPuluhan }, ok: true };
}
/** Periksa isian susun. Tepat bila satuan, simpanan, dan puluhan sama dengan kunci pesanan ini. */
export function periksaSusun(k: KeadaanPesanan): { k: KeadaanPesanan; ok: boolean } {
  const c = kunciSusun(k.noSusun);
  if (k.sSatuan === c.satuan && k.sSimpan === c.simpan && k.sPuluhan === c.puluhan) return { k: k.susunBenar.includes(k.noSusun) ? k : { ...k, susunBenar: [...k.susunBenar, k.noSusun] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
/** Pindah ke pesanan berikutnya dan kosongkan isian. */
export function pesananBerikut(k: KeadaanPesanan): KeadaanPesanan {
  return { ...k, noSusun: (k.noSusun + 1) % PESANAN_SIM.length, sSatuan: 0, sSimpan: 0, sPuluhan: 0 };
}
export function petunjukSusun(k: KeadaanPesanan): string {
  const c = kunciSusun(k.noSusun);
  if (k.sSatuan !== c.satuan) return "Mulai dari satuan. Jumlahkan satuan kedua bilangan. Bila sepuluh atau lebih, tulis sisanya saja.";
  if (k.sSimpan !== c.simpan) return c.simpan === 1 ? "Satuannya sepuluh atau lebih, jadi satu puluhan harus disimpan." : "Satuannya kurang dari sepuluh, jadi tidak ada yang disimpan.";
  return "Puluhan belum tepat. Jumlahkan puluhan kedua bilangan, lalu tambahkan simpanannya.";
}
export function kalimatSusun(k: KeadaanPesanan): string {
  const p = pesananKe(k);
  if (k.susunBenar.includes(k.noSusun)) return `Betul! ${besar(p.nama)} semuanya ${kata(jumlahPesanan(k))}.`;
  return `Jumlahkan pesanan ${p.nama}: satuan dulu, simpan bila perlu, lalu puluhan.`;
}

/* ------------------------------ Tukar sepuluh ------------------------------ */
/** Tukar sepuluh butir satuan menjadi satu batang puluhan. Hanya bisa bila butir sepuluh atau lebih. */
export function tukarSepuluh(k: KeadaanPesanan): { k: KeadaanPesanan; ok: boolean } {
  if (k.butir < 10) return { k: { ...k, salah: k.salah + 1 }, ok: false };
  const butir = k.butir - 10;
  return { k: { ...k, butir, batang: k.batang + 1, tukarKali: k.tukarKali + 1, tukarSelesai: k.tukarSelesai || butir < 10 }, ok: true };
}
export const totalTukar = (k: KeadaanPesanan): number => k.batang * 10 + k.butir;
export function petunjukTukar(k: KeadaanPesanan): string {
  return k.butir < 10 ? "Butir lepas sudah kurang dari sepuluh, jadi tidak ada lagi yang bisa ditukar." : "Tukar sepuluh butir menjadi satu batang puluhan.";
}
export function kalimatTukar(k: KeadaanPesanan): string {
  if (k.tukarSelesai) return `Semua butir sudah kurang dari sepuluh. Ada ${kata(k.batang)} batang puluhan dan ${kata(k.butir)} butir, jumlahnya tetap ${kata(totalTukar(k))}.`;
  return `Ada ${kata(k.batang)} batang puluhan dan ${kata(k.butir)} butir lepas. Tukar sepuluh butir menjadi satu batang.`;
}

/* ------------------------------ Susun panjang ------------------------------ */
export const kunciPanjang = (): { puluh: number; satuan: number; hasil: number } => ({
  puluh: Math.floor(PANJANG_SIM.a / 10) * 10 + Math.floor(PANJANG_SIM.b / 10) * 10,
  satuan: (PANJANG_SIM.a % 10) + (PANJANG_SIM.b % 10),
  hasil: PANJANG_SIM.a + PANJANG_SIM.b,
});
/** Ubah jumlah puluhan (loncat sepuluh, 0 sampai 100) atau jumlah satuan (0 sampai 18) dengan arah +1 atau -1. */
export function ubahPanjang(k: KeadaanPesanan, bagian: "puluh" | "satuan", arah: 1 | -1): { k: KeadaanPesanan; ok: boolean } {
  if (bagian === "puluh") {
    const baru = k.pjPuluh + arah * 10;
    return baru < 0 || baru > 100 ? { k, ok: false } : { k: { ...k, pjPuluh: baru, panjangBenar: false }, ok: true };
  }
  const baru = k.pjSatuan + arah;
  return baru < 0 || baru > 18 ? { k, ok: false } : { k: { ...k, pjSatuan: baru, panjangBenar: false }, ok: true };
}
export function periksaPanjang(k: KeadaanPesanan): { k: KeadaanPesanan; ok: boolean } {
  const c = kunciPanjang();
  if (k.pjPuluh === c.puluh && k.pjSatuan === c.satuan) return { k: { ...k, panjangBenar: true }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPanjang(k: KeadaanPesanan): string {
  const c = kunciPanjang();
  if (k.pjPuluh !== c.puluh) return "Jumlah puluhan belum tepat. Jumlahkan puluhan kedua bilangan: puluhan saja, tanpa satuan.";
  return "Jumlah satuan belum tepat. Jumlahkan satuan kedua bilangan saja.";
}
export function kalimatPanjang(k: KeadaanPesanan): string {
  const c = kunciPanjang();
  if (k.panjangBenar) return `Betul! ${kata(c.puluh)} ditambah ${kata(c.satuan)} sama dengan ${kata(c.hasil)}.`;
  return "Atur jumlah puluhan dan jumlah satuan, lalu tekan Periksa.";
}

/* ------------------------------ Tiga bilangan ------------------------------ */
export const kunciTiga = (): { sementara: number; hasil: number } => ({ sementara: TIGA_SIM.a + TIGA_SIM.b, hasil: TIGA_SIM.a + TIGA_SIM.b + TIGA_SIM.c });
/** Ubah jumlah dua bilangan pertama atau jumlah seluruhnya dengan selisih `delta` (satu atau sepuluh, naik atau turun), antara 0 dan 100. */
export function ubahTiga(k: KeadaanPesanan, bagian: "sementara" | "hasil", delta: number): { k: KeadaanPesanan; ok: boolean } {
  const kini = bagian === "sementara" ? k.tgSementara : k.tgHasil;
  const baru = kini + delta;
  if (baru < 0 || baru > 100 || ![1, -1, 10, -10].includes(delta)) return { k, ok: false };
  return { k: { ...k, tgSementara: bagian === "sementara" ? baru : k.tgSementara, tgHasil: bagian === "hasil" ? baru : k.tgHasil, tigaBenar: false }, ok: true };
}
export function periksaTiga(k: KeadaanPesanan): { k: KeadaanPesanan; ok: boolean } {
  const c = kunciTiga();
  if (k.tgSementara === c.sementara && k.tgHasil === c.hasil) return { k: { ...k, tigaBenar: true }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTiga(k: KeadaanPesanan): string {
  const c = kunciTiga();
  if (k.tgSementara !== c.sementara) return "Jumlah dua bilangan pertama belum tepat. Jumlahkan dua bilangan pertama dulu, satuan dulu lalu puluhan.";
  return "Jumlah seluruhnya belum tepat. Tambahkan bilangan ketiga ke jumlah dua bilangan pertama.";
}
export function kalimatTiga(k: KeadaanPesanan): string {
  const c = kunciTiga();
  if (k.tigaBenar) return `Betul! Dua bilangan pertama ${kata(c.sementara)}, seluruhnya ${kata(c.hasil)}.`;
  return "Jumlahkan dua bilangan pertama dulu, lalu tambahkan bilangan ketiga.";
}

/* ------------------------------ Periksa dengan menukar urutan ------------------------------ */
export const kunciTaksir = (): number => Math.round(PERIKSA_SIM.a / 10) * 10 + Math.round(PERIKSA_SIM.b / 10) * 10;
export function pilihPeriksa(k: KeadaanPesanan, p: Pilihan): KeadaanPesanan {
  return { ...k, pkPilih: p, periksaBenar: false };
}
export function pilihTaksir(k: KeadaanPesanan, n: number): KeadaanPesanan {
  return PERIKSA_SIM.taksir.includes(n) ? { ...k, pkTaksir: n, periksaBenar: false } : k;
}
/** Tepat bila memilih "sama" (urutan boleh ditukar) dan taksiran yang tepat. */
export function periksaTukar(k: KeadaanPesanan): { k: KeadaanPesanan; ok: boolean } {
  if (k.pkPilih === "sama" && k.pkTaksir === kunciTaksir()) return { k: { ...k, periksaBenar: true }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukPeriksa(k: KeadaanPesanan): string {
  if (k.pkPilih === "") return "Pilih dulu: setelah urutannya ditukar, hasilnya sama atau beda?";
  if (k.pkPilih !== "sama") return "Hasilnya sama. Urutan penjumlahan boleh ditukar tanpa mengubah hasil.";
  if (k.pkTaksir === 0) return "Pilih juga taksirannya: bulatkan tiap bilangan ke puluhan terdekat, lalu jumlahkan.";
  return "Taksiran belum tepat. Bulatkan tiap bilangan ke puluhan terdekat, lalu jumlahkan puluhan itu.";
}
export function kalimatPeriksa(k: KeadaanPesanan): string {
  if (k.periksaBenar) return `Betul! Ditukar hasilnya sama, dan taksirannya sekitar ${kata(kunciTaksir())}.`;
  return "Pilih sama atau beda, lalu pilih taksirannya, dan tekan Periksa.";
}
