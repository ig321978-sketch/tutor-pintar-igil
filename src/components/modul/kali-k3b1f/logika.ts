/**
 * Logika murni Simulasi Rak Kotak Kelas 3 Bab 1 Sub-Bab F "Telur Bu Mirna" (perkalian sampai seratus), Toko Kelontong Pak Joko.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kali-k3b1f.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Isi (susun kotak berisi sama banyak sesuai sasaran), Tulis (tulis perkalian banyak kotak kali isi tiap kotak), Susun (susun baris dan kolom lalu putar, urutan bilangan bertukar),
 * Lompat (lompat sama besar dari nol sampai tepat di sasaran).
 * Tipe KeadaanIsi (alat: "isi") dipakai misi-k3bab1.ts dan HARUS tetap diekspor.
 */
import { BATAS_BARIS, BATAS_ISI, BATAS_KOTAK, BESAR_MAKS, BESAR_MIN, ISI_TUGAS, LOMPAT_TUGAS, SUSUN_TUGAS, TULIS_TUGAS } from "./data-sim";
import { kata, penjumlahanBerulang } from "./logika-cpa";

export type ModeIsi = "isi" | "tulis" | "susun" | "lompat";
export const URUT_MODE: ModeIsi[] = ["isi", "tulis", "susun", "lompat"];

export type KeadaanIsi = {
  alat: "isi";
  mode: ModeIsi;
  /** Isi: indeks sasaran, banyak kotak dan isi tiap kotak yang disusun, dan sasaran yang sudah benar. */
  isiIndeks: number;
  kotak: number;
  isi: number;
  isiBenar: number[];
  /** Tulis: indeks susunan, bilangan pertama dan kedua yang ditulis, dan susunan yang sudah benar. */
  tulisIndeks: number;
  tulisA: number;
  tulisB: number;
  tulisBenar: number[];
  /** Susun: indeks sasaran, baris dan kolom yang disusun, apakah sudah diputar, sasaran yang sudah benar, dan apakah urutan yang ditukar sudah dibuktikan. */
  susunIndeks: number;
  baris: number;
  kolom: number;
  sudahPutar: boolean;
  susunBenar: number[];
  putarBenar: boolean;
  /** Lompat: indeks sasaran, besar lompatan, posisi sekarang, banyak lompatan, dan sasaran yang sudah benar. */
  lompatIndeks: number;
  besar: number;
  posisi: number;
  lompatan: number;
  lompatBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalIsi = (): KeadaanIsi => ({
  alat: "isi",
  mode: "isi",
  isiIndeks: 0,
  kotak: 0,
  isi: 0,
  isiBenar: [],
  tulisIndeks: 0,
  tulisA: 0,
  tulisB: 0,
  tulisBenar: [],
  susunIndeks: 0,
  baris: 0,
  kolom: 0,
  sudahPutar: false,
  susunBenar: [],
  putarBenar: false,
  lompatIndeks: 0,
  besar: BESAR_MIN,
  posisi: 0,
  lompatan: 0,
  lompatBenar: [],
  salah: 0,
});
export const mulaiLagiIsi = (): KeadaanIsi => awalIsi();
export const pilihModeIsi = (k: KeadaanIsi, mode: ModeIsi): KeadaanIsi => ({ ...k, mode });

export type Hasil = { k: KeadaanIsi; ok: boolean; pesan: string };
const jepit = (n: number, atas: number, bawah = 0): number => Math.max(bawah, Math.min(atas, n));

/* ------------------------------ Isi ------------------------------ */
export const tugasIsi = (k: KeadaanIsi) => ISI_TUGAS[k.isiIndeks % ISI_TUGAS.length];
export const ubahKotak = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, kotak: jepit(k.kotak + delta, BATAS_KOTAK) });
export const ubahIsi = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, isi: jepit(k.isi + delta, BATAS_ISI) });
/** Jumlah semua benda pada susunan yang disusun. */
export const jumlahIsi = (k: KeadaanIsi): number => k.kotak * k.isi;
/** Penjumlahan berulang untuk susunan yang disusun, mis. "7 + 7 + 7 + 7". Kosong bila belum ada kotak atau isi. */
export const berulangIsi = (k: KeadaanIsi): string => (k.kotak > 0 && k.isi > 0 ? penjumlahanBerulang(k.isi, k.kotak) : "");
export function periksaIsi(k: KeadaanIsi): Hasil {
  const t = tugasIsi(k);
  if (k.kotak === t.g && k.isi === t.s) {
    const idx = k.isiIndeks % ISI_TUGAS.length;
    const lanjut = (k.isiIndeks + 1) % ISI_TUGAS.length;
    return {
      k: { ...k, isiBenar: k.isiBenar.includes(idx) ? k.isiBenar : [...k.isiBenar, idx], isiIndeks: lanjut, kotak: 0, isi: 0 },
      ok: true,
      pesan: `Tepat! ${kata(t.g)} ${t.wadah} berisi ${kata(t.s)} ${t.benda} sama dengan ${kata(t.g * t.s)} ${t.benda}. Ada sasaran baru.`,
    };
  }
  const pesan =
    k.kotak !== t.g
      ? `Belum tepat. Banyak ${t.wadah} harus ${kata(t.g)}.`
      : `Banyak ${t.wadah} sudah tepat, tetapi isi tiap ${t.wadah} belum. Isi tiap ${t.wadah} harus ${kata(t.s)} ${t.benda}.`;
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan };
}
export const ulangIsi = (k: KeadaanIsi): KeadaanIsi => ({ ...k, kotak: 0, isi: 0 });

/* ------------------------------ Tulis ------------------------------ */
export const tugasTulis = (k: KeadaanIsi) => TULIS_TUGAS[k.tulisIndeks % TULIS_TUGAS.length];
export const ubahTulisA = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, tulisA: jepit(k.tulisA + delta, BATAS_KOTAK) });
export const ubahTulisB = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, tulisB: jepit(k.tulisB + delta, BATAS_ISI) });
export function periksaTulis(k: KeadaanIsi): Hasil {
  const t = tugasTulis(k);
  if (k.tulisA === t.g && k.tulisB === t.s) {
    const idx = k.tulisIndeks % TULIS_TUGAS.length;
    const lanjut = (k.tulisIndeks + 1) % TULIS_TUGAS.length;
    return {
      k: { ...k, tulisBenar: k.tulisBenar.includes(idx) ? k.tulisBenar : [...k.tulisBenar, idx], tulisIndeks: lanjut, tulisA: 0, tulisB: 0 },
      ok: true,
      pesan: `Tepat! ${kata(t.g)} kali ${kata(t.s)} sama dengan ${kata(t.g * t.s)}. Banyak ${t.wadah} ditulis lebih dulu, lalu isi tiap ${t.wadah}. Ada susunan baru.`,
    };
  }
  const pesan =
    k.tulisA === t.s && k.tulisB === t.g
      ? `Hasilnya sama, tetapi bilangannya tertukar. Tulis banyak ${t.wadah} lebih dulu, lalu isi tiap ${t.wadah}.`
      : k.tulisA !== t.g
        ? `Belum tepat. Bilangan pertama harus banyak ${t.wadah}, yaitu hitung dulu ${t.wadah}-nya.`
        : `Bilangan pertama sudah tepat, tetapi bilangan kedua belum. Bilangan kedua adalah isi tiap ${t.wadah}.`;
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan };
}
export const ulangTulis = (k: KeadaanIsi): KeadaanIsi => ({ ...k, tulisA: 0, tulisB: 0 });

/* ------------------------------ Susun ------------------------------ */
export const tugasSusun = (k: KeadaanIsi) => SUSUN_TUGAS[k.susunIndeks % SUSUN_TUGAS.length];
export const ubahBaris = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, baris: jepit(k.baris + delta, BATAS_BARIS) });
export const ubahKolom = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, kolom: jepit(k.kolom + delta, BATAS_BARIS) });
/** Memutar susunan seperempat putaran: baris menjadi kolom dan kolom menjadi baris. */
export const putarSusun = (k: KeadaanIsi): KeadaanIsi => ({ ...k, baris: k.kolom, kolom: k.baris, sudahPutar: !k.sudahPutar });
export function periksaSusun(k: KeadaanIsi): Hasil {
  const t = tugasSusun(k);
  const idx = k.susunIndeks % SUSUN_TUGAS.length;
  if (k.baris === t.r && k.kolom === t.c && !k.sudahPutar) {
    return {
      k: { ...k, susunBenar: k.susunBenar.includes(idx) ? k.susunBenar : [...k.susunBenar, idx] },
      ok: true,
      pesan: `Tepat! ${kata(t.r)} baris kali ${kata(t.c)} kolom sama dengan ${kata(t.r * t.c)} ${t.benda}. Tekan Putar, lalu periksa lagi untuk melihat urutan bilangan bertukar.`,
    };
  }
  if (k.baris === t.c && k.kolom === t.r && k.sudahPutar) {
    const lanjut = (k.susunIndeks + 1) % SUSUN_TUGAS.length;
    return {
      k: { ...k, susunBenar: k.susunBenar.includes(idx) ? k.susunBenar : [...k.susunBenar, idx], putarBenar: true, susunIndeks: lanjut, baris: 0, kolom: 0, sudahPutar: false },
      ok: true,
      pesan: `Tepat! Setelah diputar, ${kata(t.c)} baris kali ${kata(t.r)} kolom tetap ${kata(t.r * t.c)} ${t.benda}. Urutan bilangan boleh ditukar. Ada susunan baru.`,
    };
  }
  const pesan =
    k.baris * k.kolom === t.r * t.c
      ? "Jumlah bendanya sudah sama, tetapi susunannya belum sesuai sasaran. Cocokkan banyak baris dan banyak kolom."
      : k.baris !== t.r && k.kolom !== t.c
        ? "Belum tepat. Atur banyak baris dan banyak kolom sesuai sasaran."
        : k.baris !== t.r
          ? "Banyak kolom sudah tepat, tetapi banyak baris belum."
          : "Banyak baris sudah tepat, tetapi banyak kolom belum.";
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan };
}
/** Pindah ke sasaran susunan berikutnya (hanya bila sasaran ini sudah benar). */
export const lanjutSusun = (k: KeadaanIsi): KeadaanIsi =>
  k.susunBenar.includes(k.susunIndeks % SUSUN_TUGAS.length) ? { ...k, susunIndeks: (k.susunIndeks + 1) % SUSUN_TUGAS.length, baris: 0, kolom: 0, sudahPutar: false } : k;
export const ulangSusun = (k: KeadaanIsi): KeadaanIsi => ({ ...k, baris: 0, kolom: 0, sudahPutar: false });

/* ------------------------------ Lompat ------------------------------ */
export const tugasLompat = (k: KeadaanIsi) => LOMPAT_TUGAS[k.lompatIndeks % LOMPAT_TUGAS.length];
/** Mengganti besar lompatan mengembalikan posisi ke nol. */
export const ubahBesar = (k: KeadaanIsi, delta: 1 | -1): KeadaanIsi => ({ ...k, besar: jepit(k.besar + delta, BESAR_MAKS, BESAR_MIN), posisi: 0, lompatan: 0 });
export const ulangLompat = (k: KeadaanIsi): KeadaanIsi => ({ ...k, posisi: 0, lompatan: 0 });
/** Satu lompatan sebesar `besar`. Mendarat tepat di sasaran: benar. Melewati sasaran: kembali ke nol. */
export function lompatSekali(k: KeadaanIsi): Hasil {
  const t = tugasLompat(k);
  const posisi = k.posisi + k.besar;
  const lompatan = k.lompatan + 1;
  if (posisi === t.target) {
    const idx = k.lompatIndeks % LOMPAT_TUGAS.length;
    const lanjut = (k.lompatIndeks + 1) % LOMPAT_TUGAS.length;
    return {
      k: { ...k, lompatBenar: k.lompatBenar.includes(idx) ? k.lompatBenar : [...k.lompatBenar, idx], lompatIndeks: lanjut, posisi: 0, lompatan: 0 },
      ok: true,
      pesan: `Tepat! ${kata(lompatan)} lompatan sebesar ${kata(k.besar)} mendarat di ${kata(t.target)}, sama dengan ${kata(lompatan)} kali ${kata(k.besar)}. Ada sasaran baru.`,
    };
  }
  if (posisi > t.target) {
    return {
      k: { ...k, posisi: 0, lompatan: 0, salah: k.salah + 1 },
      ok: false,
      pesan: `Lompatan melewati ${kata(t.target)}. Kembali ke nol. Pilih besar lompatan yang membuat bilangan pendaratan tepat di ${kata(t.target)}.`,
    };
  }
  return { k: { ...k, posisi, lompatan }, ok: true, pesan: `Mendarat di ${kata(posisi)}. Sudah ${kata(lompatan)} lompatan sebesar ${kata(k.besar)}.` };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeIsi, string> = {
  isi: "Atur banyak kotak dan isi tiap kotak sampai sama dengan sasaran, lalu tekan Periksa. Isi semua kotak sama banyak.",
  tulis: "Hitung kotak dan isinya, lalu tulis perkalian: banyak kotak dikali isi tiap kotak. Tekan Periksa.",
  susun: "Atur banyak baris dan banyak kolom sesuai sasaran, tekan Periksa, lalu tekan Putar dan periksa lagi.",
  lompat: "Pilih besar lompatan, lalu tekan Lompat berulang sampai mendarat tepat di sasaran.",
};
export function kalimatIsi(k: KeadaanIsi): string {
  if (k.mode === "isi") {
    const t = tugasIsi(k);
    return `Sasaran: ${kata(t.g)} ${t.wadah}, tiap ${t.wadah} berisi ${kata(t.s)} ${t.benda}. ${SUARA_MODE.isi}`;
  }
  if (k.mode === "tulis") return `Susunan ${tugasTulis(k).benda}. ${SUARA_MODE.tulis}`;
  if (k.mode === "susun") {
    const t = tugasSusun(k);
    return `Sasaran: ${kata(t.r)} baris dan ${kata(t.c)} kolom ${t.benda}. ${SUARA_MODE.susun}`;
  }
  return `Sasaran pendaratan: ${kata(tugasLompat(k).target)}. ${SUARA_MODE.lompat}`;
}
