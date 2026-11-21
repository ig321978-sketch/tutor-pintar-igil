/**
 * Logika murni Simulasi Papan Kursi Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan", akhir cerita Orkestra Angklung Kampung Senandung.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kursi-k4b3b.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Rantai (pilih beda lalu tarik loncatan tambah atau kurang sampai baris sasaran; alat menolak loncatan yang membuat jumlah kursi kurang dari nol),
 * Mesin (atur aturan tambah atau kurang beserta besarnya sampai cocok dengan dua pasangan masuk dan keluar; alat menolak aturan kurang yang tidak bisa dipakai pada bilangan masuk),
 * dan Tabel (atur banyak lompatan dari urutan pertama lalu pilih bilangan pada urutan ke-n). Data ada di data-sim.ts.
 * Tipe KeadaanKursi (alat: "kursi") dipakai misi-k4bab3.ts dan harus tetap diekspor.
 */
import { MESIN_SIM, RANTAI_SIM, TABEL_SIM } from "./data-sim";
import { kataBil, polaSuku, sukuKe, urut } from "./logika-cpa";

export type ModeKursi = "rantai" | "mesin" | "tabel";
export type OperasiKursi = "tambah" | "kurang";

export type KeadaanKursi = {
  alat: "kursi";
  mode: ModeKursi;
  /** Rantai: sasaran ke berapa, besar beda (0 belum dipilih), bilangan pada rantai (tiga bilangan pertama sudah ada), sasaran yang sudah benar. */
  rantaiKe: number;
  beda: number;
  rantai: number[];
  rantaiBenar: number[];
  /** Mesin: sasaran ke berapa, aturan tambah atau kurang (null belum dipilih), besar aturan (0 belum dipilih), sasaran yang sudah benar. */
  mesinKe: number;
  mesinOp: OperasiKursi | null;
  mesinBeda: number;
  mesinBenar: number[];
  /** Tabel: sasaran ke berapa, banyak lompatan yang diatur, pilihan bilangan (-1 belum memilih), sasaran yang sudah benar. */
  tabelKe: number;
  lompat: number;
  tabelPilih: number;
  tabelBenar: number[];
  /** Pernah ditolak alat (membuat jumlah kursi kurang dari nol). */
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const BEDA_TERBESAR = 9;
export const RANTAI_TERPANJANG = 12;
export const LOMPAT_TERBANYAK = 12;

export const targetRantai = (k: KeadaanKursi) => RANTAI_SIM[k.rantaiKe % RANTAI_SIM.length];
/** Tiga bilangan pertama sasaran rantai ke-i. */
export const awalRantai = (i: number): number[] => {
  const t = RANTAI_SIM[i % RANTAI_SIM.length];
  return polaSuku(t.a, t.d, t.arah, 3);
};

export const awalKursi = (): KeadaanKursi => ({
  alat: "kursi",
  mode: "rantai",
  rantaiKe: 0,
  beda: 0,
  rantai: awalRantai(0),
  rantaiBenar: [],
  mesinKe: 0,
  mesinOp: null,
  mesinBeda: 0,
  mesinBenar: [],
  tabelKe: 0,
  lompat: 0,
  tabelPilih: -1,
  tabelBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiKursi = (): KeadaanKursi => awalKursi();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
/** Nama bilangan 0 sampai 999 dalam kata. */
export const kata = kataBil;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeKursi = (k: KeadaanKursi, mode: ModeKursi): KeadaanKursi => ({ ...k, mode });

const tanpaKembar = (xs: number[]): number[] => xs.filter((x, i) => xs.indexOf(x) === i);

/* ------------------------------ Rantai: tarik loncatan sampai baris sasaran ------------------------------ */
/** Atur besar beda satu langkah (delta 1 atau -1), dibatasi nol sampai sembilan. */
export function pilihBeda(k: KeadaanKursi, delta: 1 | -1): KeadaanKursi {
  const baru = Math.max(0, Math.min(BEDA_TERBESAR, k.beda + delta));
  return baru === k.beda ? k : { ...k, beda: baru };
}
export type SebabLoncat = "belum" | "nol" | "penuh";
/**
 * Tarik satu loncatan dari bilangan terakhir: tambah atau kurang sebesar beda. Ditolak (tanpa dihitung keliru) bila beda belum dipilih ("belum"),
 * bila rantai sudah terpanjang ("penuh"), dan bila loncatan kurang membuat jumlah kursi kurang dari nol ("nol", mencatat `tolak`).
 */
export function loncat(k: KeadaanKursi, op: OperasiKursi): { k: KeadaanKursi; ok: boolean; sebab?: SebabLoncat } {
  if (k.beda === 0) return { k, ok: false, sebab: "belum" };
  if (k.rantai.length >= RANTAI_TERPANJANG) return { k, ok: false, sebab: "penuh" };
  const akhir = k.rantai[k.rantai.length - 1];
  const baru = op === "tambah" ? akhir + k.beda : akhir - k.beda;
  if (baru < 0) return { k: { ...k, tolak: true }, ok: false, sebab: "nol" };
  return { k: { ...k, rantai: [...k.rantai, baru] }, ok: true };
}
/** Urungkan loncatan terakhir; tiga bilangan pertama tidak bisa dihapus. */
export function urungkanLoncat(k: KeadaanKursi): KeadaanKursi {
  return k.rantai.length > 3 ? { ...k, rantai: k.rantai.slice(0, -1) } : k;
}
export const ulangRantai = (k: KeadaanKursi): KeadaanKursi => ({ ...k, rantai: awalRantai(k.rantaiKe), beda: 0 });
/** Rantai yang benar untuk sasaran sekarang: tiga bilangan pertama dilanjutkan sampai baris ke-`sampai`. */
export const rantaiBenarSekarang = (k: KeadaanKursi): number[] => {
  const t = targetRantai(k);
  return polaSuku(t.a, t.d, t.arah, t.sampai);
};
export function periksaRantai(k: KeadaanKursi): { k: KeadaanKursi; ok: boolean } {
  const betul = rantaiBenarSekarang(k);
  if (k.rantai.length === betul.length && k.rantai.every((x, i) => x === betul[i])) {
    const ke = k.rantaiKe + 1;
    return { k: { ...k, rantaiBenar: tanpaKembar([...k.rantaiBenar, k.rantaiKe]), rantaiKe: ke, rantai: awalRantai(ke), beda: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukRantai(k: KeadaanKursi): string {
  const t = targetRantai(k);
  if (k.rantai.length === 3) return k.beda === 0 ? "Belum ada loncatan. Pilih bedanya dulu, lalu tekan Loncat tambah atau Loncat kurang." : "Belum ada loncatan. Tekan Loncat tambah atau Loncat kurang untuk menarik rantai.";
  if (k.rantai.length < t.sampai) return `Rantai belum sampai baris ${urut(t.sampai)}. Lanjutkan loncatannya.`;
  if (k.rantai.length > t.sampai) return `Rantai terlalu panjang. Urungkan loncatan sampai tepat baris ${urut(t.sampai)}.`;
  const betul = rantaiBenarSekarang(k);
  const i = k.rantai.findIndex((x, q) => x !== betul[q]);
  if (i >= 3) {
    const lompat = k.rantai[i] - k.rantai[i - 1];
    const harus = betul[i] - betul[i - 1];
    if (Math.sign(lompat) !== Math.sign(harus)) return "Arah loncatan belum cocok. Lihat tiga bilangan pertama: makin besar atau makin kecil?";
  }
  return "Besar loncatan belum cocok. Hitung beda dari dua bilangan pertama yang berurutan.";
}
export function kalimatRantai(k: KeadaanKursi): string {
  return k.rantaiBenar.length > 0 && k.rantai.length === 3 && k.beda === 0 ? "Betul! Ada pola berikutnya untuk dilanjutkan." : "Pilih bedanya, tarik rantai sampai baris sasaran, lalu tekan Periksa.";
}

/* ------------------------------ Mesin: atur aturan sampai cocok ------------------------------ */
export const targetMesin = (k: KeadaanKursi) => MESIN_SIM[k.mesinKe % MESIN_SIM.length];
/** Dua pasangan [masuk, keluar] yang harus cocok dengan aturan mesin. */
export const pasanganMesin = (k: KeadaanKursi): [[number, number], [number, number]] => {
  const t = targetMesin(k);
  const [p, q, r] = polaSuku(t.a, t.d, t.arah, 3);
  return [
    [p, q],
    [q, r],
  ];
};
/** Apakah aturan kurang sebesar `beda` masih bisa dipakai pada bilangan masuk pertama? (jumlah kursi tidak boleh kurang dari nol) */
const bisaKurang = (k: KeadaanKursi, beda: number): boolean => pasanganMesin(k)[0][0] - beda >= 0;
/** Pilih tambah atau kurang. Aturan kurang yang tidak bisa dipakai pada bilangan masuk ditolak alat (mencatat `tolak`). */
export function pilihAturan(k: KeadaanKursi, op: OperasiKursi): { k: KeadaanKursi; ok: boolean } {
  if (op === "kurang" && !bisaKurang(k, k.mesinBeda)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, mesinOp: op }, ok: true };
}
/** Atur besar aturan satu langkah (delta 1 atau -1), nol sampai sembilan. Besar yang membuat aturan kurang tidak bisa dipakai ditolak. */
export function bedaMesin(k: KeadaanKursi, delta: 1 | -1): { k: KeadaanKursi; ok: boolean } {
  const baru = Math.max(0, Math.min(BEDA_TERBESAR, k.mesinBeda + delta));
  if (baru === k.mesinBeda) return { k, ok: true };
  if (k.mesinOp === "kurang" && !bisaKurang(k, baru)) return { k: { ...k, tolak: true }, ok: false };
  return { k: { ...k, mesinBeda: baru }, ok: true };
}
/** Bilangan keluar dari mesin untuk bilangan masuk pertama menurut aturan yang diatur; null bila aturan belum lengkap. */
export function pratinjauMesin(k: KeadaanKursi): number | null {
  if (!k.mesinOp || k.mesinBeda === 0) return null;
  const masuk = pasanganMesin(k)[0][0];
  return k.mesinOp === "tambah" ? masuk + k.mesinBeda : masuk - k.mesinBeda;
}
export function periksaMesin(k: KeadaanKursi): { k: KeadaanKursi; ok: boolean } {
  const t = targetMesin(k);
  if (k.mesinOp === (t.arah === "naik" ? "tambah" : "kurang") && k.mesinBeda === t.d) {
    const ke = k.mesinKe + 1;
    return { k: { ...k, mesinBenar: tanpaKembar([...k.mesinBenar, k.mesinKe]), mesinKe: ke, mesinOp: null, mesinBeda: 0 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukMesin(k: KeadaanKursi): string {
  const t = targetMesin(k);
  if (!k.mesinOp && k.mesinBeda === 0) return "Belum ada aturan. Lihat apakah bilangan keluar lebih besar atau lebih kecil dari bilangan masuk, lalu pilih tambah atau kurang.";
  if (!k.mesinOp) return "Tambah atau kurang belum dipilih. Bandingkan bilangan masuk dengan bilangan keluar.";
  if (k.mesinBeda === 0) return "Besar aturan belum dipilih. Hitung selisih bilangan masuk dan bilangan keluar.";
  if (k.mesinOp !== (t.arah === "naik" ? "tambah" : "kurang")) return "Tambah atau kurang belum cocok. Bilangan keluar lebih besar atau lebih kecil dari bilangan masuk?";
  return "Besar aturan belum cocok dengan kedua pasangan. Hitung lagi selisih bilangan masuk dan bilangan keluar.";
}
export function kalimatMesin(k: KeadaanKursi): string {
  return k.mesinBenar.length > 0 && !k.mesinOp && k.mesinBeda === 0 ? "Betul! Ada mesin berikutnya untuk diatur." : "Atur tambah atau kurang beserta besarnya, lalu tekan Periksa.";
}

/* ------------------------------ Tabel: lompatan dan bilangan pada urutan ke-n ------------------------------ */
export const targetTabel = (k: KeadaanKursi) => TABEL_SIM[k.tabelKe % TABEL_SIM.length];
/** Bilangan pada urutan ke-n sasaran tabel, lewat n kurang satu lompatan. */
export const jawabTabel = (k: KeadaanKursi): number => {
  const t = targetTabel(k);
  return sukuKe(t.a, t.d, t.arah, t.n);
};
/** Banyak lompatan yang benar dari urutan pertama ke urutan ke-n: satu kurang dari nomor urutan. */
export const lompatBenar = (k: KeadaanKursi): number => targetTabel(k).n - 1;
/** Indeks pilihan yang benar, dihitung dari data. */
export const kunciTabel = (k: KeadaanKursi): number => targetTabel(k).pil.indexOf(String(jawabTabel(k)));
export function lompatTabel(k: KeadaanKursi, delta: 1 | -1): KeadaanKursi {
  const baru = Math.max(0, Math.min(LOMPAT_TERBANYAK, k.lompat + delta));
  return baru === k.lompat ? k : { ...k, lompat: baru };
}
export function pilihTabel(k: KeadaanKursi, i: number): KeadaanKursi {
  if (i < 0 || i > 2) return k;
  return { ...k, tabelPilih: i };
}
export function periksaTabel(k: KeadaanKursi): { k: KeadaanKursi; ok: boolean } {
  if (k.lompat === lompatBenar(k) && k.tabelPilih === kunciTabel(k)) {
    const ke = k.tabelKe + 1;
    return { k: { ...k, tabelBenar: tanpaKembar([...k.tabelBenar, k.tabelKe]), tabelKe: ke, lompat: 0, tabelPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukTabel(k: KeadaanKursi): string {
  if (k.lompat === 0 && k.tabelPilih < 0) return "Belum ada pilihan. Hitung banyak lompatan dari urutan pertama ke urutan yang ditanyakan, lalu pilih bilangannya.";
  if (k.lompat === 0) return "Banyak lompatan belum diatur. Dari urutan pertama ke urutan yang ditanyakan, lompatannya satu kurang dari nomor urutan.";
  if (k.lompat !== lompatBenar(k)) return "Banyak lompatan belum cocok. Lompatannya satu kurang dari nomor urutan yang ditanyakan.";
  if (k.tabelPilih < 0) return "Bilangannya belum dipilih. Tambahkan atau kurangi bedanya sebanyak lompatan.";
  return "Bilangan yang dipilih belum cocok dengan lompatannya. Hitung lagi dari bilangan pertama.";
}
export function kalimatTabel(k: KeadaanKursi): string {
  return k.tabelBenar.length > 0 && k.lompat === 0 && k.tabelPilih < 0 ? "Betul! Ada tabel berikutnya untuk dibaca." : "Atur banyak lompatan, pilih bilangannya, lalu tekan Periksa.";
}
