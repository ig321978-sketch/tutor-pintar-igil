/**
 * Logika murni Simulasi Pos Waktu Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna" (waktu dan jam), akhir cerita Hari Olahraga Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jadwal-k2b6b.mjs. Eksplorasi bebas tanpa skor.
 * Lima alat: Jarum (putar jarum pendek, lihat jam dinding, jam digital, dan bagian hari), Samakan (jam dinding disamakan dengan jam digital),
 * Hari (taruh kegiatan pada bagian hari), Lama (bandingkan lama dua kegiatan), Selisih (hitung lama kegiatan dari jam mulai sampai jam selesai).
 * Jam dihitung dari jam dua puluh empat; semua jam tepat.
 */
import { HARI_KEGIATAN, LAMA_PASANG, SAMA_TARGET, SELISIH_TARGET } from "./data-sim";
import { bagianHari, jam12, kata, kataPukul, tulisDigital, type Bagian } from "./logika-cpa";

export type ModeJadwal = "jarum" | "samakan" | "hari" | "lama" | "selisih";
export const URUT_MODE: ModeJadwal[] = ["jarum", "samakan", "hari", "lama", "selisih"];
export const BATAS_KOTAK = 9;

export type KeadaanJadwal = {
  alat: "jadwal";
  mode: ModeJadwal;
  /** Jam yang ditunjuk jarum pendek pada alat Jarum (jam dua puluh empat, nol sampai dua puluh tiga). */
  h24: number;
  /** Jam dua belas yang pernah ditunjuk jarum pendek pada alat Jarum. */
  jamPernah: number[];
  /** Jam dinding pada alat Samakan (satu sampai dua belas), indeks jam digital yang sedang ditanyakan, dan indeks yang sudah cocok. */
  jamSama: number;
  samaIndeks: number;
  sudahSama: number[];
  /** Kegiatan yang sedang dipegang (nama) dan kegiatan yang sudah ditaruh benar pada bagian harinya. */
  hariPilih: string | null;
  hariBenar: string[];
  /** Pasangan yang sedang dibandingkan dan pasangan yang sudah dijawab benar. */
  lamaIndeks: number;
  lamaBenar: number[];
  /** Selisih: indeks kegiatan, banyak kotak yang diisi, dan indeks yang sudah benar. */
  selIndeks: number;
  selKotak: number;
  selBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalJadwal = (): KeadaanJadwal => ({
  alat: "jadwal",
  mode: "jarum",
  h24: 12,
  jamPernah: [],
  jamSama: 12,
  samaIndeks: 0,
  sudahSama: [],
  hariPilih: null,
  hariBenar: [],
  lamaIndeks: 0,
  lamaBenar: [],
  selIndeks: 0,
  selKotak: 0,
  selBenar: [],
  salah: 0,
});
export const mulaiLagiJadwal = (): KeadaanJadwal => awalJadwal();
export const pilihModeJadwal = (k: KeadaanJadwal, mode: ModeJadwal): KeadaanJadwal => ({ ...k, mode });

export type Hasil = { k: KeadaanJadwal; ok: boolean; pesan: string };

/* ------------------------------ Jarum ------------------------------ */
/** Kalimat tentang jam yang ditunjuk jarum (tanpa digit untuk suara). */
export const kalimatJarum = (h24: number): string => `Jarum pendek di angka ${kata(jam12(h24))}, jarum panjang di dua belas: ${kataPukul(h24)}. Jam digital dua puluh empat jam menulis ${kata(h24)} titik nol nol.`;
/** Putar jarum pendek satu jam maju (delta satu) atau mundur (delta minus satu). */
export function putarJarum(k: KeadaanJadwal, delta: 1 | -1): Hasil {
  const h24 = (k.h24 + delta + 24) % 24;
  const j = jam12(h24);
  return { k: { ...k, h24, jamPernah: k.jamPernah.includes(j) ? k.jamPernah : [...k.jamPernah, j] }, ok: true, pesan: kalimatJarum(h24) };
}

/* ------------------------------ Samakan ------------------------------ */
export const targetSama = (k: KeadaanJadwal): number => SAMA_TARGET[k.samaIndeks % SAMA_TARGET.length];
export function putarSama(k: KeadaanJadwal, delta: 1 | -1): Hasil {
  const jamSama = ((k.jamSama - 1 + delta + 12) % 12) + 1;
  return { k: { ...k, jamSama }, ok: true, pesan: `Jarum pendek di angka ${kata(jamSama)}.` };
}
export function periksaSama(k: KeadaanJadwal): Hasil {
  const sasaran = jam12(targetSama(k));
  if (k.jamSama === sasaran) {
    const sudah = k.sudahSama.includes(k.samaIndeks) ? k.sudahSama : [...k.sudahSama, k.samaIndeks];
    const lanjut = (k.samaIndeks + 1) % SAMA_TARGET.length;
    return {
      k: { ...k, sudahSama: sudah, samaIndeks: lanjut, jamSama: 12 },
      ok: true,
      pesan: `Cocok! Jam digital dua angka pertama ${kata(targetSama(k))}, jadi ${kataPukul(targetSama(k))}. Ada jam digital baru.`,
    };
  }
  const kurang = sasaran > k.jamSama;
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum cocok. Jam digital menunjukkan jam ${kata(sasaran)} pada jam dua belas. ${kurang ? "Putar satu jam maju." : "Putar satu jam terus sampai jarum pendek tiba di angka itu."}` };
}

/* ------------------------------ Hari ------------------------------ */
export function pilihKegiatan(k: KeadaanJadwal, nama: string): KeadaanJadwal {
  return { ...k, hariPilih: k.hariPilih === nama ? null : nama };
}
export function taruhHari(k: KeadaanJadwal, bagian: Bagian): Hasil {
  const keg = HARI_KEGIATAN.find((x) => x.nama === k.hariPilih);
  if (!keg) return { k, ok: false, pesan: "Ketuk dulu satu kegiatan, lalu ketuk bagian harinya." };
  if (bagianHari(keg.h) === bagian) {
    const hariBenar = k.hariBenar.includes(keg.nama) ? k.hariBenar : [...k.hariBenar, keg.nama];
    return { k: { ...k, hariBenar, hariPilih: null }, ok: true, pesan: `Tepat! ${keg.nama} pada ${kataPukul(keg.h)}, termasuk ${bagian}.` };
  }
  return { k: { ...k, salah: k.salah + 1, hariPilih: keg.nama }, ok: false, pesan: `Belum tepat. ${keg.nama} pada ${kataPukul(keg.h)}, jadi bukan ${bagian}. Coba bagian hari yang lain.` };
}

/* ------------------------------ Lama ------------------------------ */
export const pasangLama = (k: KeadaanJadwal) => LAMA_PASANG[k.lamaIndeks % LAMA_PASANG.length];
export function ketukLama(k: KeadaanJadwal, sisi: "a" | "b"): Hasil {
  const p = pasangLama(k);
  const benar = sisi === (p.a.menit > p.b.menit ? "a" : "b");
  const lebih = p.a.menit > p.b.menit ? p.a : p.b;
  const kurang = p.a.menit > p.b.menit ? p.b : p.a;
  if (benar) {
    const lamaBenar = k.lamaBenar.includes(k.lamaIndeks % LAMA_PASANG.length) ? k.lamaBenar : [...k.lamaBenar, k.lamaIndeks % LAMA_PASANG.length];
    return { k: { ...k, lamaBenar, lamaIndeks: (k.lamaIndeks + 1) % LAMA_PASANG.length }, ok: true, pesan: `Betul! ${lebih.nama} lebih lama, dan ${kurang.nama} lebih sebentar. Batang yang lebih panjang berarti lebih lama.` };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Belum tepat. Lihat panjang kedua batang: batang yang lebih panjang berarti kegiatan yang lebih lama." };
}

/* ------------------------------ Selisih ------------------------------ */
export const targetSelisih = (k: KeadaanJadwal) => SELISIH_TARGET[k.selIndeks % SELISIH_TARGET.length];
export const kotakSeharusnya = (k: KeadaanJadwal): number => targetSelisih(k).selesai - targetSelisih(k).mulai;
export function ubahKotak(k: KeadaanJadwal, delta: 1 | -1): Hasil {
  const selKotak = Math.max(0, Math.min(BATAS_KOTAK, k.selKotak + delta));
  return { k: { ...k, selKotak }, ok: true, pesan: selKotak === 0 ? "Jalur kosong. Isi satu kotak untuk tiap jam." : `Jalur terisi ${kata(selKotak)} kotak.` };
}
export function periksaSelisih(k: KeadaanJadwal): Hasil {
  const t = targetSelisih(k);
  const harus = kotakSeharusnya(k);
  if (k.selKotak === harus) {
    const sudah = k.selBenar.includes(k.selIndeks % SELISIH_TARGET.length) ? k.selBenar : [...k.selBenar, k.selIndeks % SELISIH_TARGET.length];
    return { k: { ...k, selBenar: sudah, selIndeks: (k.selIndeks + 1) % SELISIH_TARGET.length, selKotak: 0 }, ok: true, pesan: `Tepat! ${t.nama} berlangsung ${kata(harus)} jam, dari ${kataPukul(t.mulai)} sampai ${kataPukul(t.selesai)}.` };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `Belum tepat. Hitung berapa jam dari ${kataPukul(t.mulai)} sampai ${kataPukul(t.selesai)}. Satu kotak berarti satu jam. ${k.selKotak < harus ? "Kotakmu masih kurang." : "Kotakmu terlalu banyak."}` };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeJadwal, string> = {
  jarum: "Putar jarum pendek maju atau mundur. Lihat jam dinding, jam digital, dan bagian harinya berubah bersama.",
  samakan: "Lihat jam digital, lalu putar jarum pendek jam dinding sampai menunjukkan jam yang sama, kemudian tekan Periksa.",
  hari: "Ketuk satu kegiatan, lalu ketuk bagian hari yang tepat: pagi, siang, sore, atau malam.",
  lama: "Lihat dua batang. Ketuk kegiatan yang lebih lama.",
  selisih: "Isi satu kotak untuk tiap jam dari jam mulai sampai jam selesai, lalu tekan Periksa.",
};
export function kalimatJadwal(k: KeadaanJadwal): string {
  if (k.mode === "jarum") return k.jamPernah.length === 0 ? SUARA_MODE.jarum : kalimatJarum(k.h24);
  return SUARA_MODE[k.mode];
}
/** Jam digital sebagai tulisan untuk gambar. */
export const digitalSekarang = (k: KeadaanJadwal): string => tulisDigital(k.h24);
