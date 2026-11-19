/**
 * Logika murni Simulasi Meja Label Kelas 3 Bab 1 Sub-Bab B "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kartu-k3b1b.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Susun (susun kartu seratus, sepuluh, dan satu menjadi label), Uraikan (jumlah yang diwakili tiap angka), Tabel (isi tabel tiga tempat dengan angka),
 * Nol (tulis label yang punya nol penjaga tempat), dan Sama (angka yang sama di tempat berbeda).
 */
import { BATAS_KARTU, NOL_TUGAS, SAMA_TUGAS, SUSUN_TUGAS, TABEL_TUGAS, URAI_TUGAS } from "./data-sim";
import { BOBOT, NAMA_TEMPAT, angkaTiga, kata, tempatKiri, type Tempat } from "./logika-cpa";

export type ModeLabel = "susun" | "uraikan" | "tabel" | "nol" | "sama";
export const URUT_MODE: ModeLabel[] = ["susun", "uraikan", "tabel", "nol", "sama"];
export type Tiga = [number, number, number];

export type KeadaanLabel = {
  alat: "label";
  mode: ModeLabel;
  /** Susun: indeks label, banyak kartu tiap tempat, dan label yang sudah benar. */
  susunIndeks: number;
  susun: Tiga;
  susunBenar: number[];
  /** Uraikan: indeks bilangan, jumlah yang diwakili tiap tempat, dan bilangan yang sudah benar. */
  uraiIndeks: number;
  urai: Tiga;
  uraiBenar: number[];
  /** Tabel: indeks bilangan, angka tiap tempat, dan tabel yang sudah benar. */
  tabelIndeks: number;
  tabel: Tiga;
  tabelBenar: number[];
  /** Nol: indeks bilangan, angka yang ditulis tiap tempat, dan bilangan yang sudah benar. */
  nolIndeks: number;
  nol: Tiga;
  nolBenar: number[];
  /** Sama: indeks tugas, tempat yang dipilih (atau kosong), dan tugas yang sudah benar. */
  samaIndeks: number;
  samaPilih: Tempat | null;
  samaBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const kosong = (): Tiga => [0, 0, 0];
/** Tulisan awal alat Nol: satu di tiap tempat, supaya anak sendiri yang harus mengganti tempat kosong dengan nol. */
const awalNol = (): Tiga => [1, 1, 1];

export const awalLabel = (): KeadaanLabel => ({
  alat: "label",
  mode: "susun",
  susunIndeks: 0,
  susun: kosong(),
  susunBenar: [],
  uraiIndeks: 0,
  urai: kosong(),
  uraiBenar: [],
  tabelIndeks: 0,
  tabel: kosong(),
  tabelBenar: [],
  nolIndeks: 0,
  nol: awalNol(),
  nolBenar: [],
  samaIndeks: 0,
  samaPilih: null,
  samaBenar: [],
  salah: 0,
});
export const mulaiLagiLabel = (): KeadaanLabel => awalLabel();
export const pilihModeLabel = (k: KeadaanLabel, mode: ModeLabel): KeadaanLabel => ({ ...k, mode });

export type Hasil = { k: KeadaanLabel; ok: boolean; pesan: string };

const dari = (daftar: readonly number[], i: number): number => daftar[i % daftar.length];
const ubahTiga = (a: Tiga, t: Tempat, v: number): Tiga => a.map((x, i) => (i === t ? v : x)) as Tiga;
const sudah = (daftar: number[], i: number, batas: number): number[] => (daftar.includes(i % batas) ? daftar : [...daftar, i % batas]);
const SEMUA: Tempat[] = [0, 1, 2];

/* ------------------------------ Susun ------------------------------ */
export const targetSusun = (k: KeadaanLabel): number => dari(SUSUN_TUGAS, k.susunIndeks);
/** Bilangan dari kartu yang sudah disusun di meja. */
export const bilanganSusun = (k: KeadaanLabel): number => k.susun[0] * 100 + k.susun[1] * 10 + k.susun[2];
/** Tambah (delta satu) atau kurangi (delta minus satu) satu kartu pada tempat t, antara nol dan sembilan. */
export function ubahSusun(k: KeadaanLabel, t: Tempat, delta: 1 | -1): Hasil {
  const lama = k.susun[t];
  const baru = Math.max(0, Math.min(BATAS_KARTU, lama + delta));
  if (baru === lama) {
    return { k, ok: false, pesan: delta === 1 ? "Satu tempat paling banyak sembilan kartu. Sepuluh kartu harus ditukar dengan satu kartu di tempat sebelah kirinya." : "Tempat itu sudah tidak punya kartu." };
  }
  const k2 = { ...k, susun: ubahTiga(k.susun, t, baru) };
  return { k: k2, ok: true, pesan: `Tempat ${NAMA_TEMPAT[t]} punya ${kata(baru)} kartu. Bilangan di meja sekarang ${kata(bilanganSusun(k2))}.` };
}
export function periksaSusun(k: KeadaanLabel): Hasil {
  const n = targetSusun(k);
  const d = angkaTiga(n);
  if (k.susun.every((x, i) => x === d[i])) {
    const lanjut = (k.susunIndeks + 1) % SUSUN_TUGAS.length;
    return {
      k: { ...k, susunBenar: sudah(k.susunBenar, k.susunIndeks, SUSUN_TUGAS.length), susunIndeks: lanjut, susun: kosong() },
      ok: true,
      pesan: `Tepat! ${kata(d[0])} kartu seratus, ${kata(d[1])} kartu sepuluh, dan ${kata(d[2])} kartu satu menjadi ${kata(n)}. Ada label baru.`,
    };
  }
  const t = SEMUA.find((x) => k.susun[x] !== d[x]) ?? 0;
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. Lihat tempat ${NAMA_TEMPAT[t]}: ${k.susun[t] < d[t] ? "kartunya masih kurang" : "kartunya terlalu banyak"}.` };
}
export const ulangSusun = (k: KeadaanLabel): KeadaanLabel => ({ ...k, susun: kosong() });

/* ------------------------------ Uraikan ------------------------------ */
export const targetUrai = (k: KeadaanLabel): number => dari(URAI_TUGAS, k.uraiIndeks);
/** Tambah atau kurangi jumlah pada tempat t sebesar bobot tempatnya (seratus, sepuluh, atau satu). */
export function ubahUrai(k: KeadaanLabel, t: Tempat, delta: 1 | -1): KeadaanLabel {
  const baru = Math.max(0, Math.min(BATAS_KARTU * BOBOT[t], k.urai[t] + delta * BOBOT[t]));
  return { ...k, urai: ubahTiga(k.urai, t, baru) };
}
export function periksaUrai(k: KeadaanLabel): Hasil {
  const n = targetUrai(k);
  const d = angkaTiga(n);
  if (k.urai.every((x, i) => x === d[i] * BOBOT[i])) {
    const lanjut = (k.uraiIndeks + 1) % URAI_TUGAS.length;
    return {
      k: { ...k, uraiBenar: sudah(k.uraiBenar, k.uraiIndeks, URAI_TUGAS.length), uraiIndeks: lanjut, urai: kosong() },
      ok: true,
      pesan: `Tepat! ${kata(n)} sama dengan ${kata(d[0] * 100)} ditambah ${kata(d[1] * 10)} ditambah ${kata(d[2])}. Ada bilangan baru.`,
    };
  }
  const t = SEMUA.find((x) => k.urai[x] !== d[x] * BOBOT[x]) ?? 0;
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. Lihat angka di tempat ${NAMA_TEMPAT[t]}: jumlah yang diwakilinya adalah angka itu dikali ${t === 0 ? "seratus" : t === 1 ? "sepuluh" : "satu"}.` };
}

/* ------------------------------ Tabel ------------------------------ */
export const targetTabel = (k: KeadaanLabel): number => dari(TABEL_TUGAS, k.tabelIndeks);
export const ubahTabel = (k: KeadaanLabel, t: Tempat, delta: 1 | -1): KeadaanLabel => ({ ...k, tabel: ubahTiga(k.tabel, t, Math.max(0, Math.min(BATAS_KARTU, k.tabel[t] + delta))) });
export function periksaTabel(k: KeadaanLabel): Hasil {
  const n = targetTabel(k);
  const d = angkaTiga(n);
  if (k.tabel.every((x, i) => x === d[i])) {
    const lanjut = (k.tabelIndeks + 1) % TABEL_TUGAS.length;
    return {
      k: { ...k, tabelBenar: sudah(k.tabelBenar, k.tabelIndeks, TABEL_TUGAS.length), tabelIndeks: lanjut, tabel: kosong() },
      ok: true,
      pesan: `Tepat! Tabel ${kata(n)} diisi angka ${kata(d[0])}, ${kata(d[1])}, dan ${kata(d[2])}, satu angka di tiap tempat. Ada tabel baru.`,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Belum tepat. Tabel diisi satu angka di tiap tempat, dari ratusan ke satuan. Baca bilangannya dari kiri." };
}

/* ------------------------------ Nol ------------------------------ */
export const targetNol = (k: KeadaanLabel): number => dari(NOL_TUGAS, k.nolIndeks);
export const ubahNol = (k: KeadaanLabel, t: Tempat, delta: 1 | -1): KeadaanLabel => ({ ...k, nol: ubahTiga(k.nol, t, Math.max(0, Math.min(BATAS_KARTU, k.nol[t] + delta))) });
export function periksaNol(k: KeadaanLabel): Hasil {
  const n = targetNol(k);
  const d = angkaTiga(n);
  const tN = SEMUA.find((x) => d[x] === 0) ?? 1;
  if (k.nol.every((x, i) => x === d[i])) {
    const lanjut = (k.nolIndeks + 1) % NOL_TUGAS.length;
    return {
      k: { ...k, nolBenar: sudah(k.nolBenar, k.nolIndeks, NOL_TUGAS.length), nolIndeks: lanjut, nol: awalNol() },
      ok: true,
      pesan: `Tepat! Tempat ${NAMA_TEMPAT[tN]} tidak punya kartu, jadi ditulis nol. Nol menjaga tempat, sehingga labelnya ${kata(n)}. Ada label baru.`,
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: k.nol[tN] !== 0 ? `Belum tepat. Tempat ${NAMA_TEMPAT[tN]} tidak punya kartu, jadi tulis nol di tempat itu.` : "Belum tepat. Hitung kartu di tiap tempat, lalu tulis angkanya dari ratusan ke satuan.",
  };
}

/* ------------------------------ Sama ------------------------------ */
export const tugasSama = (k: KeadaanLabel): { n: number; d: number } => SAMA_TUGAS[k.samaIndeks % SAMA_TUGAS.length];
export const pilihSama = (k: KeadaanLabel, t: Tempat): KeadaanLabel => ({ ...k, samaPilih: k.samaPilih === t ? null : t });
export function periksaSama(k: KeadaanLabel): Hasil {
  const { n, d } = tugasSama(k);
  if (k.samaPilih === null) return { k, ok: false, pesan: "Pilih dulu satu tempat, lalu tekan Periksa." };
  const benar = tempatKiri(n, d) as Tempat;
  if (k.samaPilih === benar) {
    const lanjut = (k.samaIndeks + 1) % SAMA_TUGAS.length;
    return {
      k: { ...k, samaBenar: sudah(k.samaBenar, k.samaIndeks, SAMA_TUGAS.length), samaIndeks: lanjut, samaPilih: null },
      ok: true,
      pesan: `Tepat! Angka ${kata(d)} di tempat ${NAMA_TEMPAT[benar]} mewakili ${kata(d * BOBOT[benar])}, lebih besar daripada di tempat lain. Ada bilangan baru.`,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Belum tepat. Angka yang sama mewakili jumlah yang lebih besar bila ada di tempat yang lebih kiri." };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeLabel, string> = {
  susun: "Susun kartu seratus, sepuluh, dan satu sampai bilangan di meja sama dengan label, lalu tekan Periksa.",
  uraikan: "Atur jumlah yang diwakili tiap angka sampai bentuk uraian sama dengan bilangannya, lalu tekan Periksa.",
  tabel: "Isi tabel tiga tempat dengan angka, bukan dengan jumlahnya, lalu tekan Periksa.",
  nol: "Lihat tumpukan kartu. Tulis labelnya, dan jangan lupa nol di tempat yang tidak punya kartu, lalu tekan Periksa.",
  sama: "Angka yang sama muncul dua kali. Pilih tempat yang mewakili jumlah paling besar, lalu tekan Periksa.",
};
export function kalimatLabel(k: KeadaanLabel): string {
  if (k.mode === "susun") return `Label ${kata(targetSusun(k))}. ${SUARA_MODE.susun}`;
  if (k.mode === "uraikan") return `Bilangan ${kata(targetUrai(k))}. ${SUARA_MODE.uraikan}`;
  if (k.mode === "tabel") return `Bilangan ${kata(targetTabel(k))}. ${SUARA_MODE.tabel}`;
  return SUARA_MODE[k.mode];
}
