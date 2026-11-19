/**
 * Logika murni Simulasi Meja Bingkisan Kelas 3 Bab 1 Sub-Bab G "Pesta Hari Jadi Toko" (pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bagi-k3b1g.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Bagi (bagikan bingkisan bergiliran ke keranjang sampai habis, lalu isi hasil bagi), Kurang (lompat mundur di garis bilangan sampai nol, lalu isi banyak lompatan),
 * Tulis (tulis bilangan yang dibagi, pembagi, dan hasil bagi dari gambar), Keluarga (pilih semua kalimat keluarga fakta dari tiga bilangan), Periksa (isi hasil kali pembagi dan hasil bagi).
 * Tipe KeadaanBagi (alat: "bagi") dipakai misi-k3bab1.ts.
 */
import { BAGI_TUGAS, BATAS_DIBAGI, BATAS_ISI, BATAS_KALI, BATAS_PEMBAGI, KELUARGA_TUGAS, KURANG_TUGAS, PERIKSA_TUGAS, TULIS_TUGAS } from "./data-sim";

export type ModeBagi = "bagi" | "kurang" | "tulis" | "keluarga" | "periksa";
export const URUT_MODE: ModeBagi[] = ["bagi", "kurang", "tulis", "keluarga", "periksa"];
export type BagianTulis = "a" | "b" | "c";

export type KeadaanBagi = {
  alat: "bagi";
  mode: ModeBagi;
  /** Bagi: indeks tugas, banyak putaran yang sudah dibagikan, isi tiap keranjang yang diisi, dan tugas yang sudah benar. */
  bagiIndeks: number;
  bagiPutaran: number;
  bagiIsi: number;
  bagiBenar: number[];
  /** Kurang: indeks tugas, banyak lompatan, banyak lompatan yang diisi, dan tugas yang sudah benar. */
  kurangIndeks: number;
  kurangLompat: number;
  kurangHitung: number;
  kurangBenar: number[];
  /** Tulis: indeks tugas, tiga isian (dibagi, pembagi, hasil bagi), dan tugas yang sudah benar. */
  tulisIndeks: number;
  tulisA: number;
  tulisB: number;
  tulisC: number;
  tulisBenar: number[];
  /** Keluarga: indeks tugas, kartu yang dipilih, dan tugas yang sudah benar. */
  keluargaIndeks: number;
  keluargaPilih: number[];
  keluargaBenar: number[];
  /** Periksa: indeks tugas, hasil kali yang diisi, dan tugas yang sudah benar. */
  periksaIndeks: number;
  periksaKali: number;
  periksaBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalBagi = (): KeadaanBagi => ({
  alat: "bagi",
  mode: "bagi",
  bagiIndeks: 0,
  bagiPutaran: 0,
  bagiIsi: 0,
  bagiBenar: [],
  kurangIndeks: 0,
  kurangLompat: 0,
  kurangHitung: 0,
  kurangBenar: [],
  tulisIndeks: 0,
  tulisA: 0,
  tulisB: 0,
  tulisC: 0,
  tulisBenar: [],
  keluargaIndeks: 0,
  keluargaPilih: [],
  keluargaBenar: [],
  periksaIndeks: 0,
  periksaKali: 0,
  periksaBenar: [],
  salah: 0,
});
export const mulaiLagiBagi = (): KeadaanBagi => awalBagi();
export const pilihModeBagi = (k: KeadaanBagi, mode: ModeBagi): KeadaanBagi => ({ ...k, mode });

export type Hasil = { k: KeadaanBagi; ok: boolean; pesan: string };

/* ------------------------------ Kata bilangan (tanpa digit) ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
export function kataBil(n: number): string {
  if (n < 10) return SATUAN[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) return `${PULUHAN[Math.floor(n / 10)]}${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  return n === 100 ? "seratus" : String(n);
}
const ke = (daftar: number[], i: number): number[] => (daftar.includes(i) ? daftar : [...daftar, i]);

/* ------------------------------ Bagi ------------------------------ */
export const tugasBagi = (k: KeadaanBagi) => BAGI_TUGAS[k.bagiIndeks % BAGI_TUGAS.length];
/** Bingkisan yang masih di tumpukan: bilangan yang dibagi dikurangi pembagi tiap putaran. */
export const sisaTumpukan = (k: KeadaanBagi): number => {
  const t = tugasBagi(k);
  return Math.max(0, t.n - t.g * k.bagiPutaran);
};
/** Bagikan satu putaran: tiap keranjang mendapat satu bingkisan. */
export function bagikanPutaran(k: KeadaanBagi): Hasil {
  const t = tugasBagi(k);
  if (sisaTumpukan(k) === 0) return { k, ok: false, pesan: "Tumpukan sudah habis. Isi hasil bagi, lalu tekan Periksa." };
  const baru = { ...k, bagiPutaran: k.bagiPutaran + 1 };
  const sisa = sisaTumpukan(baru);
  return {
    k: baru,
    ok: true,
    pesan: sisa === 0 ? `Habis! Dibagikan ${kataBil(baru.bagiPutaran)} putaran. Isi hasil bagi, lalu tekan Periksa.` : `Satu putaran: tiap keranjang mendapat satu. Tersisa ${kataBil(sisa)} di tumpukan dari ${kataBil(t.n)}.`,
  };
}
export const ubahIsi = (k: KeadaanBagi, delta: 1 | -1): KeadaanBagi => ({ ...k, bagiIsi: Math.max(0, Math.min(BATAS_ISI, k.bagiIsi + delta)) });
export function periksaBagi(k: KeadaanBagi): Hasil {
  const t = tugasBagi(k);
  const q = t.n / t.g;
  if (sisaTumpukan(k) > 0) return { k, ok: false, pesan: "Bagikan dulu sampai tumpukan habis, lalu isi hasil bagi." };
  if (k.bagiIsi === q) {
    const idx = k.bagiIndeks % BAGI_TUGAS.length;
    return {
      k: { ...k, bagiBenar: ke(k.bagiBenar, idx), bagiIndeks: (k.bagiIndeks + 1) % BAGI_TUGAS.length, bagiPutaran: 0, bagiIsi: 0 },
      ok: true,
      pesan: `Tepat! ${kataBil(t.n)} dibagi ${kataBil(t.g)} sama dengan ${kataBil(q)}. Tiap keranjang berisi ${kataBil(q)}. Ada tumpukan baru.`,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. Hitung bingkisan di satu keranjang. ${k.bagiIsi < q ? "Isianmu masih kurang." : "Isianmu terlalu banyak."}` };
}
export const ulangBagi = (k: KeadaanBagi): KeadaanBagi => ({ ...k, bagiPutaran: 0, bagiIsi: 0 });

/* ------------------------------ Kurang ------------------------------ */
export const tugasKurang = (k: KeadaanBagi) => KURANG_TUGAS[k.kurangIndeks % KURANG_TUGAS.length];
/** Posisi penanda pada garis bilangan: n dikurangi g tiap lompatan. */
export const posisiKurang = (k: KeadaanBagi): number => {
  const t = tugasKurang(k);
  return Math.max(0, t.n - t.g * k.kurangLompat);
};
export function lompatMundur(k: KeadaanBagi): Hasil {
  if (posisiKurang(k) === 0) return { k, ok: false, pesan: "Penanda sudah sampai nol. Isi banyak lompatan, lalu tekan Periksa." };
  const baru = { ...k, kurangLompat: k.kurangLompat + 1 };
  const p = posisiKurang(baru);
  return { k: baru, ok: true, pesan: p === 0 ? `Sampai nol! Melompat ${kataBil(baru.kurangLompat)} kali. Isi banyak lompatan, lalu tekan Periksa.` : `Mendarat di ${kataBil(p)}.` };
}
export const ubahHitung = (k: KeadaanBagi, delta: 1 | -1): KeadaanBagi => ({ ...k, kurangHitung: Math.max(0, Math.min(BATAS_ISI, k.kurangHitung + delta)) });
export function periksaKurang(k: KeadaanBagi): Hasil {
  const t = tugasKurang(k);
  const q = t.n / t.g;
  if (posisiKurang(k) > 0) return { k, ok: false, pesan: "Lompat dulu sampai nol, lalu isi banyak lompatan." };
  if (k.kurangHitung === q) {
    const idx = k.kurangIndeks % KURANG_TUGAS.length;
    return {
      k: { ...k, kurangBenar: ke(k.kurangBenar, idx), kurangIndeks: (k.kurangIndeks + 1) % KURANG_TUGAS.length, kurangLompat: 0, kurangHitung: 0 },
      ok: true,
      pesan: `Tepat! ${kataBil(t.n)} dikurangi ${kataBil(t.g)} berulang sampai nol, ${kataBil(q)} kali. Jadi ${kataBil(t.n)} dibagi ${kataBil(t.g)} sama dengan ${kataBil(q)}. Ada garis baru.`,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. Hitung semua lompatan di garis. ${k.kurangHitung < q ? "Isianmu masih kurang." : "Isianmu terlalu banyak."}` };
}
export const ulangKurang = (k: KeadaanBagi): KeadaanBagi => ({ ...k, kurangLompat: 0, kurangHitung: 0 });

/* ------------------------------ Tulis ------------------------------ */
export const tugasTulis = (k: KeadaanBagi) => TULIS_TUGAS[k.tulisIndeks % TULIS_TUGAS.length];
const BATAS_TULIS: Record<BagianTulis, number> = { a: BATAS_DIBAGI, b: BATAS_PEMBAGI, c: BATAS_ISI };
export function ubahTulis(k: KeadaanBagi, bagian: BagianTulis, delta: number): KeadaanBagi {
  const kunci = bagian === "a" ? "tulisA" : bagian === "b" ? "tulisB" : "tulisC";
  return { ...k, [kunci]: Math.max(0, Math.min(BATAS_TULIS[bagian], k[kunci] + delta)) };
}
export function periksaTulis(k: KeadaanBagi): Hasil {
  const t = tugasTulis(k);
  const q = t.n / t.g;
  if (k.tulisA === t.n && k.tulisB === t.g && k.tulisC === q) {
    const idx = k.tulisIndeks % TULIS_TUGAS.length;
    return {
      k: { ...k, tulisBenar: ke(k.tulisBenar, idx), tulisIndeks: (k.tulisIndeks + 1) % TULIS_TUGAS.length, tulisA: 0, tulisB: 0, tulisC: 0 },
      ok: true,
      pesan: `Tepat! ${kataBil(t.n)} dibagi ${kataBil(t.g)} sama dengan ${kataBil(q)}. Ada gambar baru.`,
    };
  }
  const salah = k.tulisA !== t.n ? "Bilangan yang dibagi adalah jumlah seluruhnya, ditulis paling kiri." : k.tulisB !== t.g ? "Pembagi adalah banyak keranjang." : "Hasil bagi adalah isi tiap keranjang.";
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. ${salah}` };
}
export const ulangTulis = (k: KeadaanBagi): KeadaanBagi => ({ ...k, tulisA: 0, tulisB: 0, tulisC: 0 });

/* ------------------------------ Keluarga ------------------------------ */
export const tugasKeluarga = (k: KeadaanBagi) => KELUARGA_TUGAS[k.keluargaIndeks % KELUARGA_TUGAS.length];
/** Enam kartu kalimat dalam urutan tetap: empat kalimat keluarga fakta dan dua yang keliru. */
export function kartuKeluarga(a: number, b: number): { teks: string; ok: boolean }[] {
  const c = a * b;
  return [
    { teks: `${c} : ${a} = ${a}`, ok: false },
    { teks: `${c} : ${b} = ${a}`, ok: true },
    { teks: `${a} × ${b} = ${c}`, ok: true },
    { teks: `${a} × ${b} = ${a + b}`, ok: false },
    { teks: `${c} : ${a} = ${b}`, ok: true },
    { teks: `${b} × ${a} = ${c}`, ok: true },
  ];
}
export function ketukKartu(k: KeadaanBagi, i: number): KeadaanBagi {
  return { ...k, keluargaPilih: k.keluargaPilih.includes(i) ? k.keluargaPilih.filter((x) => x !== i) : [...k.keluargaPilih, i].sort((p, q) => p - q) };
}
export function periksaKeluarga(k: KeadaanBagi): Hasil {
  const t = tugasKeluarga(k);
  const kartu = kartuKeluarga(t.a, t.b);
  const benar = kartu.flatMap((x, i) => (x.ok ? [i] : []));
  const pilih = k.keluargaPilih;
  const keliru = pilih.some((i) => !kartu[i].ok);
  const kurang = benar.some((i) => !pilih.includes(i));
  if (!keliru && !kurang) {
    const idx = k.keluargaIndeks % KELUARGA_TUGAS.length;
    return {
      k: { ...k, keluargaBenar: ke(k.keluargaBenar, idx), keluargaIndeks: (k.keluargaIndeks + 1) % KELUARGA_TUGAS.length, keluargaPilih: [] },
      ok: true,
      pesan: `Tepat! ${kataBil(t.a)}, ${kataBil(t.b)}, dan ${kataBil(t.a * t.b)} membentuk dua perkalian dan dua pembagian. Ada tiga bilangan baru.`,
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: keliru ? "Ada kalimat yang keliru. Kalimat keluarga fakta memakai tiga bilangan itu dan hasilnya selalu cocok." : "Masih ada kalimat yang belum dipilih. Ada dua perkalian dan dua pembagian.",
  };
}
export const ulangKeluarga = (k: KeadaanBagi): KeadaanBagi => ({ ...k, keluargaPilih: [] });

/* ------------------------------ Periksa ------------------------------ */
export const tugasPeriksa = (k: KeadaanBagi) => PERIKSA_TUGAS[k.periksaIndeks % PERIKSA_TUGAS.length];
export const ubahKali = (k: KeadaanBagi, delta: number): KeadaanBagi => ({ ...k, periksaKali: Math.max(0, Math.min(BATAS_KALI, k.periksaKali + delta)) });
export function periksaPeriksa(k: KeadaanBagi): Hasil {
  const t = tugasPeriksa(k);
  if (k.periksaKali === t.g * t.q) {
    const idx = k.periksaIndeks % PERIKSA_TUGAS.length;
    return {
      k: { ...k, periksaBenar: ke(k.periksaBenar, idx), periksaIndeks: (k.periksaIndeks + 1) % PERIKSA_TUGAS.length, periksaKali: 0 },
      ok: true,
      pesan: `Tepat! ${kataBil(t.g)} kali ${kataBil(t.q)} sama dengan ${kataBil(t.n)}, sama dengan bilangan yang dibagi, jadi pembagiannya cocok. Ada pembagian baru.`,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. Kalikan pembagi dengan hasil bagi. ${k.periksaKali < t.g * t.q ? "Hasil kalimu masih kurang." : "Hasil kalimu terlalu banyak."}` };
}
export const ulangPeriksa = (k: KeadaanBagi): KeadaanBagi => ({ ...k, periksaKali: 0 });

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeBagi, string> = {
  bagi: "Tekan Bagikan satu putaran sampai tumpukan habis. Lalu atur isi tiap keranjang dan tekan Periksa.",
  kurang: "Lompat mundur di garis bilangan sampai nol. Lalu atur banyak lompatan dan tekan Periksa.",
  tulis: "Lihat gambar, lalu tulis pembagiannya: bilangan yang dibagi, pembagi, dan hasil bagi. Tekan Periksa.",
  keluarga: "Pilih semua kalimat keluarga fakta dari tiga bilangan itu, lalu tekan Periksa.",
  periksa: "Kalikan pembagi dengan hasil bagi. Atur hasil kalinya, lalu tekan Periksa.",
};
export function kalimatBagi(k: KeadaanBagi): string {
  if (k.mode === "bagi") return `Tumpukan ${kataBil(tugasBagi(k).n)} bingkisan dibagi ke ${kataBil(tugasBagi(k).g)} keranjang. ${SUARA_MODE.bagi}`;
  if (k.mode === "kurang") return `Mulai dari ${kataBil(tugasKurang(k).n)}, lompat mundur sebesar ${kataBil(tugasKurang(k).g)}. ${SUARA_MODE.kurang}`;
  if (k.mode === "periksa") return `${kataBil(tugasPeriksa(k).n)} dibagi ${kataBil(tugasPeriksa(k).g)} sama dengan ${kataBil(tugasPeriksa(k).q)}. ${SUARA_MODE.periksa}`;
  return SUARA_MODE[k.mode];
}
