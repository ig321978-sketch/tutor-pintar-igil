/**
 * Logika murni Simulasi Rak Sisa Kelas 3 Bab 1 Sub-Bab E "Sisa Stok Pak Anto" (pengurangan sampai seratus).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kurang-k3b1e.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Susun (susun pendek: isi puluhan dan satuan hasil, pinjam satu puluhan bila perlu), Panjang (susun panjang: hasil puluhan dan hasil satuan),
 * Pinjam (batang puluhan dipecah menjadi sepuluh butir lalu diambil), Periksa (hasil ditambah bilangan yang dikurangkan, cocok atau tidak), Kosong (hasil nol).
 */
import { BATAS_ANGKA, BLOK_TUGAS, KOSONG_TUGAS, PANJANG_TUGAS, PERIKSA_TUGAS, SUSUN_TUGAS } from "./data-sim";
import { kata, perluPinjam, puluh, sat } from "./logika-cpa";

export type ModeSisa = "susun" | "panjang" | "pinjam" | "periksa" | "kosong";
export const URUT_MODE: ModeSisa[] = ["susun", "panjang", "pinjam", "periksa", "kosong"];
export type Vonis = "cocok" | "tidak";

export type KeadaanSisa = {
  alat: "sisa";
  mode: ModeSisa;
  /** Susun: indeks pasangan, hasil puluhan dan satuan yang diisi, apakah sudah meminjam, dan pasangan yang sudah benar. */
  susunIndeks: number;
  susunP: number;
  susunS: number;
  susunPinjam: boolean;
  susunBenar: number[];
  /** Panjang: indeks pasangan, hasil puluhan dan hasil satuan yang diisi, dan pasangan yang sudah benar. */
  panjangIndeks: number;
  panjangP: number;
  panjangS: number;
  panjangBenar: number[];
  /** Pinjam: indeks pasangan, batang dan butir yang masih ada di rak, yang sudah diambil, apakah batang pernah dipecah, pasangan yang sudah benar, dan apakah pernah meminjam dengan benar. */
  blokIndeks: number;
  blokBatang: number;
  blokButir: number;
  ambilBatang: number;
  ambilButir: number;
  blokPecah: boolean;
  blokBenar: number[];
  pinjamSelesai: boolean;
  /** Periksa: indeks, hasil penjumlahan puluhan dan satuan yang diisi, pilihan cocok atau tidak, dan pasangan yang sudah benar. */
  periksaIndeks: number;
  jumP: number;
  jumS: number;
  vonis: Vonis | null;
  periksaBenar: number[];
  /** Kosong: indeks rak, yang terjual (puluhan dan satuan), dan rak yang sudah kosong. */
  kosongIndeks: number;
  kosongP: number;
  kosongS: number;
  kosongBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const bagiBlok = (i: number) => BLOK_TUGAS[i % BLOK_TUGAS.length];

export const awalSisa = (): KeadaanSisa => ({
  alat: "sisa",
  mode: "susun",
  susunIndeks: 0,
  susunP: 0,
  susunS: 0,
  susunPinjam: false,
  susunBenar: [],
  panjangIndeks: 0,
  panjangP: 0,
  panjangS: 0,
  panjangBenar: [],
  blokIndeks: 0,
  blokBatang: puluh(bagiBlok(0).a),
  blokButir: sat(bagiBlok(0).a),
  ambilBatang: 0,
  ambilButir: 0,
  blokPecah: false,
  blokBenar: [],
  pinjamSelesai: false,
  periksaIndeks: 0,
  jumP: 0,
  jumS: 0,
  vonis: null,
  periksaBenar: [],
  kosongIndeks: 0,
  kosongP: 0,
  kosongS: 0,
  kosongBenar: [],
  salah: 0,
});
export const mulaiLagiSisa = (): KeadaanSisa => awalSisa();
export const pilihModeSisa = (k: KeadaanSisa, mode: ModeSisa): KeadaanSisa => ({ ...k, mode });

export type Hasil = { k: KeadaanSisa; ok: boolean; pesan: string };
const dalam = (n: number): number => Math.max(0, Math.min(BATAS_ANGKA, n));

/* ------------------------------ Susun pendek ------------------------------ */
export const tugasSusun = (k: KeadaanSisa) => SUSUN_TUGAS[k.susunIndeks % SUSUN_TUGAS.length];
export const ubahSusun = (k: KeadaanSisa, tempat: "puluhan" | "satuan", delta: 1 | -1): KeadaanSisa =>
  tempat === "puluhan" ? { ...k, susunP: dalam(k.susunP + delta) } : { ...k, susunS: dalam(k.susunS + delta) };
/** Pinjam satu puluhan pada susun pendek: hanya bila satuan atas lebih kecil dari satuan bawah. */
export function pinjamSusun(k: KeadaanSisa): Hasil {
  const t = tugasSusun(k);
  if (!perluPinjam(t.a, t.b)) return { k, ok: false, pesan: "Satuan di atas sudah cukup untuk dikurangi, jadi tidak perlu meminjam." };
  if (k.susunPinjam) return { k, ok: false, pesan: "Satu puluhan sudah dipinjam. Sekarang kurangi satuan, lalu puluhan." };
  return {
    k: { ...k, susunPinjam: true },
    ok: true,
    pesan: `Puluhan di atas tinggal ${kata(puluh(t.a) - 1)}, dan satuan di atas menjadi ${kata(10 + sat(t.a))}. Sekarang kurangi.`,
  };
}
export function periksaSusun(k: KeadaanSisa): Hasil {
  const t = tugasSusun(k);
  const r = t.a - t.b;
  if (perluPinjam(t.a, t.b) && !k.susunPinjam) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Satuan ${kata(sat(t.a))} lebih kecil dari satuan ${kata(sat(t.b))}. Tekan Pinjam dulu supaya satuan di atas cukup.` };
  }
  if (k.susunS !== sat(r)) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Satuan belum tepat. Kurangi dulu satuan atas dengan satuan bawah. Bila tadi meminjam, satuan atas sudah bertambah sepuluh." };
  }
  if (k.susunP !== puluh(r)) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Puluhan belum tepat. Kurangi puluhan setelah satuan. Bila tadi meminjam, puluhan atas sudah berkurang satu." };
  }
  const idx = k.susunIndeks % SUSUN_TUGAS.length;
  const lanjut = (k.susunIndeks + 1) % SUSUN_TUGAS.length;
  return {
    k: { ...k, susunBenar: k.susunBenar.includes(idx) ? k.susunBenar : [...k.susunBenar, idx], susunIndeks: lanjut, susunP: 0, susunS: 0, susunPinjam: false },
    ok: true,
    pesan: `Tepat! ${kata(t.a)} dikurangi ${kata(t.b)} sama dengan ${kata(r)}. Ada pengurangan baru.`,
  };
}

/* ------------------------------ Susun panjang ------------------------------ */
export const tugasPanjang = (k: KeadaanSisa) => PANJANG_TUGAS[k.panjangIndeks % PANJANG_TUGAS.length];
export const ubahPanjang = (k: KeadaanSisa, bagian: "puluhan" | "satuan", delta: 1 | -1): KeadaanSisa =>
  bagian === "puluhan" ? { ...k, panjangP: dalam(k.panjangP + delta) } : { ...k, panjangS: dalam(k.panjangS + delta) };
/** Uraian susun panjang: bagian puluhan dan satuan atas (setelah meminjam bila perlu) dan bagian bawah. */
export function uraianPanjang(a: number, b: number): { puluhAtas: number; satuanAtas: number; puluhBawah: number; satuanBawah: number; pinjam: boolean } {
  const pinjam = perluPinjam(a, b);
  return { puluhAtas: (puluh(a) - (pinjam ? 1 : 0)) * 10, satuanAtas: sat(a) + (pinjam ? 10 : 0), puluhBawah: puluh(b) * 10, satuanBawah: sat(b), pinjam };
}
export function periksaPanjang(k: KeadaanSisa): Hasil {
  const t = tugasPanjang(k);
  const r = t.a - t.b;
  if (k.panjangP !== puluh(r)) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Hasil puluhan belum tepat. Kurangi puluhan atas dengan puluhan bawah. Bila meminjam, puluhan atas sudah berkurang satu puluhan." };
  }
  if (k.panjangS !== sat(r)) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Hasil satuan belum tepat. Kurangi satuan atas dengan satuan bawah. Bila meminjam, satuan atas sudah bertambah sepuluh." };
  }
  const idx = k.panjangIndeks % PANJANG_TUGAS.length;
  const lanjut = (k.panjangIndeks + 1) % PANJANG_TUGAS.length;
  return {
    k: { ...k, panjangBenar: k.panjangBenar.includes(idx) ? k.panjangBenar : [...k.panjangBenar, idx], panjangIndeks: lanjut, panjangP: 0, panjangS: 0 },
    ok: true,
    pesan: `Tepat! Hasil puluhan dan hasil satuan digabung menjadi ${kata(r)}. Ada pengurangan baru.`,
  };
}

/* ------------------------------ Pinjam (batang menjadi sepuluh butir) ------------------------------ */
export const tugasBlok = (k: KeadaanSisa) => bagiBlok(k.blokIndeks);
const blokAwal = (i: number): Pick<KeadaanSisa, "blokBatang" | "blokButir" | "ambilBatang" | "ambilButir" | "blokPecah"> => ({
  blokBatang: puluh(bagiBlok(i).a),
  blokButir: sat(bagiBlok(i).a),
  ambilBatang: 0,
  ambilButir: 0,
  blokPecah: false,
});
export const ulangBlok = (k: KeadaanSisa): KeadaanSisa => ({ ...k, ...blokAwal(k.blokIndeks) });
/** Pecah satu batang puluhan menjadi sepuluh butir satuan. */
export function pecahBatang(k: KeadaanSisa): Hasil {
  if (k.blokBatang < 1) return { k, ok: false, pesan: "Tidak ada batang yang bisa dipecah." };
  return { k: { ...k, blokBatang: k.blokBatang - 1, blokButir: k.blokButir + 10, blokPecah: true }, ok: true, pesan: "Satu batang pecah menjadi sepuluh butir. Satu puluhan sama dengan sepuluh satuan." };
}
export function ambilButir(k: KeadaanSisa): Hasil {
  if (k.blokButir < 1) return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Butir tidak cukup untuk diambil. Pecah satu batang dulu menjadi sepuluh butir." };
  return { k: { ...k, blokButir: k.blokButir - 1, ambilButir: k.ambilButir + 1 }, ok: true, pesan: `Diambil ${kata(k.ambilButir + 1)} butir.` };
}
export function ambilBatang(k: KeadaanSisa): Hasil {
  if (k.blokBatang < 1) return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Tidak ada batang yang bisa diambil." };
  return { k: { ...k, blokBatang: k.blokBatang - 1, ambilBatang: k.ambilBatang + 1 }, ok: true, pesan: `Diambil ${kata(k.ambilBatang + 1)} batang.` };
}
export function periksaBlok(k: KeadaanSisa): Hasil {
  const t = tugasBlok(k);
  if (k.ambilBatang !== puluh(t.b) || k.ambilButir !== sat(t.b)) {
    return {
      k: { ...k, salah: k.salah + 1 },
      ok: false,
      pesan: `Yang diambil belum sama dengan ${kata(t.b)}. Ambil ${kata(puluh(t.b))} batang dan ${kata(sat(t.b))} butir, lalu tekan Periksa.`,
    };
  }
  const idx = k.blokIndeks % BLOK_TUGAS.length;
  const lanjut = (k.blokIndeks + 1) % BLOK_TUGAS.length;
  const pinjam = k.blokPecah && perluPinjam(t.a, t.b);
  return {
    k: { ...k, blokBenar: k.blokBenar.includes(idx) ? k.blokBenar : [...k.blokBenar, idx], pinjamSelesai: k.pinjamSelesai || pinjam, blokIndeks: lanjut, ...blokAwal(lanjut) },
    ok: true,
    pesan: `Tepat! Sisanya ${kata(t.a - t.b)}. ${pinjam ? "Satu batang dipecah menjadi sepuluh butir, itulah meminjam satu puluhan." : "Satuan cukup, jadi tidak perlu memecah batang."} Ada rak baru.`,
  };
}

/* ------------------------------ Periksa dengan penjumlahan ------------------------------ */
export const tugasPeriksa = (k: KeadaanSisa) => PERIKSA_TUGAS[k.periksaIndeks % PERIKSA_TUGAS.length];
export const ubahJumlah = (k: KeadaanSisa, tempat: "puluhan" | "satuan", delta: 1 | -1): KeadaanSisa =>
  tempat === "puluhan" ? { ...k, jumP: dalam(k.jumP + delta) } : { ...k, jumS: dalam(k.jumS + delta) };
export const pilihVonis = (k: KeadaanSisa, v: Vonis): KeadaanSisa => ({ ...k, vonis: k.vonis === v ? null : v });
export function periksaPeriksa(k: KeadaanSisa): Hasil {
  const t = tugasPeriksa(k);
  const jumlah = t.hasil + t.b;
  const cocok = jumlah === t.a;
  if (k.vonis === null) return { k, ok: false, pesan: "Pilih dulu cocok atau tidak cocok, lalu tekan Periksa." };
  if (k.jumP * 10 + k.jumS !== jumlah) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Penjumlahannya belum tepat. Tambahkan ${kata(t.hasil)} dengan ${kata(t.b)}: satuan dulu, lalu puluhan.` };
  }
  if ((k.vonis === "cocok") !== cocok) {
    return {
      k: { ...k, salah: k.salah + 1 },
      ok: false,
      pesan: cocok ? `Penjumlahannya sama dengan ${kata(t.a)}, jadi hasilnya cocok dengan bilangan awal.` : `Penjumlahannya ${kata(jumlah)}, bukan ${kata(t.a)}, jadi tidak cocok dengan bilangan awal.`,
    };
  }
  const idx = k.periksaIndeks % PERIKSA_TUGAS.length;
  const lanjut = (k.periksaIndeks + 1) % PERIKSA_TUGAS.length;
  return {
    k: { ...k, periksaBenar: k.periksaBenar.includes(idx) ? k.periksaBenar : [...k.periksaBenar, idx], periksaIndeks: lanjut, jumP: 0, jumS: 0, vonis: null },
    ok: true,
    pesan: cocok ? `Tepat! ${kata(t.hasil)} ditambah ${kata(t.b)} sama dengan ${kata(t.a)}, jadi hasilnya benar. Ada pemeriksaan baru.` : `Tepat! ${kata(t.hasil)} ditambah ${kata(t.b)} sama dengan ${kata(jumlah)}, bukan ${kata(t.a)}, jadi hasilnya keliru. Hasil yang benar ${kata(t.a - t.b)}. Ada pemeriksaan baru.`,
  };
}

/* ------------------------------ Kosongkan rak (hasil nol) ------------------------------ */
export const isiRak = (k: KeadaanSisa): number => KOSONG_TUGAS[k.kosongIndeks % KOSONG_TUGAS.length];
export const terjual = (k: KeadaanSisa): number => k.kosongP * 10 + k.kosongS;
export const sisaRak = (k: KeadaanSisa): number => isiRak(k) - terjual(k);
export const ubahTerjual = (k: KeadaanSisa, tempat: "puluhan" | "satuan", delta: 1 | -1): KeadaanSisa =>
  tempat === "puluhan" ? { ...k, kosongP: dalam(k.kosongP + delta) } : { ...k, kosongS: dalam(k.kosongS + delta) };
export function periksaKosong(k: KeadaanSisa): Hasil {
  const isi = isiRak(k);
  const jual = terjual(k);
  if (jual > isi) return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Yang terjual lebih banyak daripada isi rak. Isi rak ${kata(isi)}.` };
  if (jual < isi) return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Rak masih tersisa ${kata(isi - jual)}. Tambah yang terjual sampai sama dengan isi rak.` };
  const idx = k.kosongIndeks % KOSONG_TUGAS.length;
  const lanjut = (k.kosongIndeks + 1) % KOSONG_TUGAS.length;
  return {
    k: { ...k, kosongBenar: k.kosongBenar.includes(idx) ? k.kosongBenar : [...k.kosongBenar, idx], kosongIndeks: lanjut, kosongP: 0, kosongS: 0 },
    ok: true,
    pesan: `Tepat! ${kata(isi)} dikurangi ${kata(isi)} sama dengan nol. Rak kosong. Ada rak baru.`,
  };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeSisa, string> = {
  susun: "Isi hasil puluhan dan hasil satuan. Bila satuan atas lebih kecil, tekan Pinjam dulu. Lalu tekan Periksa.",
  panjang: "Uraikan bilangan menjadi puluhan dan satuan. Isi hasil puluhan dan hasil satuan, lalu tekan Periksa.",
  pinjam: "Ambil batang dan butir sebanyak bilangan yang dikurangkan. Bila butir tidak cukup, pecah satu batang. Lalu tekan Periksa.",
  periksa: "Tambahkan hasil dengan bilangan yang dikurangkan, lalu pilih cocok atau tidak cocok dengan bilangan awal. Tekan Periksa.",
  kosong: "Atur yang terjual sampai rak kosong. Sisanya harus nol. Lalu tekan Periksa.",
};
export function kalimatSisa(k: KeadaanSisa): string {
  if (k.mode === "susun") return `Susun pendek: ${kata(tugasSusun(k).a)} dikurangi ${kata(tugasSusun(k).b)}. ${SUARA_MODE.susun}`;
  if (k.mode === "panjang") return `Susun panjang: ${kata(tugasPanjang(k).a)} dikurangi ${kata(tugasPanjang(k).b)}. ${SUARA_MODE.panjang}`;
  if (k.mode === "pinjam") return `Rak berisi ${kata(tugasBlok(k).a)}, ambil ${kata(tugasBlok(k).b)}. ${SUARA_MODE.pinjam}`;
  if (k.mode === "periksa") return `Pemeriksaan: ${kata(tugasPeriksa(k).a)} dikurangi ${kata(tugasPeriksa(k).b)} katanya ${kata(tugasPeriksa(k).hasil)}. ${SUARA_MODE.periksa}`;
  return `Rak berisi ${kata(isiRak(k))}. ${SUARA_MODE.kosong}`;
}
