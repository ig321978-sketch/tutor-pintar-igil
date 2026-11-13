/**
 * Lab Bagian (Kelas 6 Bab 2, Sub-Bab C: Penerapan Rasio): logika murni. Satu alat, tiga tampilan.
 *  Bagian : rasio a : b dan jumlah seluruhnya; jumlah suku menjadi banyak bagian, satu bagian = seluruhnya dibagi banyak bagian
 *           (Additive Parts Sum).
 *  Total  : bagian terhadap seluruhnya ditulis a : (a + b), berbeda dari bagian terhadap bagian a : b (Part-to-Whole Ratio).
 *  Waktu  : samakan satuan waktu dulu (jam dan menit), lalu skala jarak, kata, atau liter (Time-Rate Conversion).
 * Boleh memakai konsep Sub-Bab A (rasio, sederhana, arah) dan Sub-Bab B (nilai satuan, kali kedua suku).
 * Semua hitungan memakai bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b2.mjs.
 */

export type SoalBagian = { nama: string; a: number; b: number; total: number; ka: string; kb: string };
export type SoalTotal = { nama: string; a: number; b: number; ka: string; kb: string };
export type SoalWaktu = { nama: string; a: number; m: number; satuan: string; target: number; durasi: number };

/** Rasio ka : kb = a : b dengan jumlah seluruhnya total. Total habis dibagi (a + b). */
export const SOAL_BAGIAN: SoalBagian[] = [
  { nama: "penjualan bibit", a: 4, b: 5, total: 72, ka: "bibit hias", kb: "bibit obat" },
  { nama: "pasar malam", a: 9, b: 4, total: 390, ka: "anak-anak", kb: "orang dewasa" },
  { nama: "karangan bunga", a: 3, b: 7, total: 60, ka: "bunga merah", kb: "bunga putih" },
  { nama: "kelereng", a: 2, b: 3, total: 50, ka: "kelereng biru", kb: "kelereng hijau" },
  { nama: "peternakan", a: 5, b: 3, total: 64, ka: "sapi", kb: "kambing" },
  { nama: "kucing dan kelinci", a: 1, b: 4, total: 35, ka: "kucing", kb: "kelinci" },
];

/** Bagian terhadap seluruhnya: ka : (a + b) dan kb : (a + b). */
export const SOAL_TOTAL: SoalTotal[] = [
  { nama: "bibit hias", a: 4, b: 5, ka: "bibit hias", kb: "bibit obat" },
  { nama: "pasar malam", a: 9, b: 4, ka: "anak-anak", kb: "orang dewasa" },
  { nama: "bunga merah", a: 3, b: 7, ka: "bunga merah", kb: "bunga putih" },
  { nama: "kelereng biru", a: 2, b: 3, ka: "kelereng biru", kb: "kelereng hijau" },
  { nama: "sapi", a: 5, b: 3, ka: "sapi", kb: "kambing" },
  { nama: "kelinci", a: 1, b: 4, ka: "kucing", kb: "kelinci" },
];

/**
 * a satuan ditempuh atau dihasilkan dalam m menit. Laju per jam = a x 60 / m.
 * target satuan membutuhkan target x m / a menit. Dalam durasi menit dihasilkan a x durasi / m satuan.
 */
export const SOAL_WAKTU: SoalWaktu[] = [
  { nama: "Banyu berlari", a: 1, m: 30, satuan: "km", target: 9, durasi: 90 },
  { nama: "mengetik naskah", a: 1200, m: 60, satuan: "kata", target: 3000, durasi: 180 },
  { nama: "bersepeda", a: 3, m: 12, satuan: "km", target: 9, durasi: 48 },
  { nama: "mesin cetak", a: 50, m: 10, satuan: "lembar", target: 200, durasi: 30 },
  { nama: "berjalan kaki", a: 2, m: 20, satuan: "km", target: 6, durasi: 80 },
  { nama: "mengisi bak", a: 20, m: 5, satuan: "liter", target: 100, durasi: 15 },
];

export const idBagian = (i: number): string => `bagian:${i}`;
export const idTotal = (i: number): string => `total:${i}`;
export const idWaktu = (i: number): string => `waktu:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const teksRasio = (a: number, b: number): string => `${a} : ${b}`;
export const satuBagian = (s: SoalBagian): number => s.total / (s.a + s.b);
export const lajuJam = (s: SoalWaktu): number => (s.a * 60) / s.m;
export const menitTarget = (s: SoalWaktu): number => (s.target * s.m) / s.a;
export const hasilDurasi = (s: SoalWaktu): number => (s.a * s.durasi) / s.m;
export const teksSatuan = (s: SoalWaktu, v: number): string => `${v} ${s.satuan}`;

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}

/** Banyak bagian seluruhnya. Pengecoh: suku dikali, dan hanya suku pertama. */
export const opsiJumlah = (i: number): Pilih3<number> => {
  const s = SOAL_BAGIAN[i];
  return susun3([s.a + s.b, s.a * s.b, s.a], i);
};
/** Nilai satu bagian. Pengecoh: seluruhnya tanpa dibagi, dan dua kali satu bagian. */
export const opsiSatu = (i: number): Pilih3<number> => {
  const s = SOAL_BAGIAN[i];
  const u = satuBagian(s);
  return susun3([u, s.total, u * 2], i + 1);
};
/** Banyak benda pertama. Pengecoh: satu bagian ditambah suku, dan benda kedua tertukar. */
export const opsiKa = (i: number): Pilih3<number> => {
  const s = SOAL_BAGIAN[i];
  const u = satuBagian(s);
  return susun3([u * s.a, u + s.a, u * s.b], i + 2);
};
/** Banyak benda kedua. Pengecoh: satu bagian ditambah suku, dan benda pertama tertukar. */
export const opsiKb = (i: number): Pilih3<number> => {
  const s = SOAL_BAGIAN[i];
  const u = satuBagian(s);
  return susun3([u * s.b, u + s.b, u * s.a], i);
};

/** Rasio benda pertama terhadap seluruhnya. Pengecoh: bagian terhadap bagian, dan seluruhnya terhadap bagian. */
export const opsiTotalKa = (i: number): Pilih3<string> => {
  const s = SOAL_TOTAL[i];
  return susun3([teksRasio(s.a, s.a + s.b), teksRasio(s.a, s.b), teksRasio(s.a + s.b, s.a)], i);
};
/** Rasio benda kedua terhadap seluruhnya. Pengecoh: bagian terhadap bagian, dan rasio benda pertama. */
export const opsiTotalKb = (i: number): Pilih3<string> => {
  const s = SOAL_TOTAL[i];
  return susun3([teksRasio(s.b, s.a + s.b), teksRasio(s.b, s.a), teksRasio(s.a, s.a + s.b)], i + 1);
};
export const kalimatBeda = (i: number): { benar: string; salah1: string; salah2: string } => {
  const s = SOAL_TOTAL[i];
  return {
    benar: `${teksRasio(s.a, s.b)} membandingkan bagian dengan bagian, ${teksRasio(s.a, s.a + s.b)} bandingkan bagian dengan seluruhnya`,
    salah1: `${teksRasio(s.a, s.b)} dan ${teksRasio(s.a, s.a + s.b)} bermakna sama`,
    salah2: `${s.a + s.b} hanyalah angka cadangan`,
  };
};
export const opsiBedaTotal = (i: number): Pilih3<string> => {
  const k = kalimatBeda(i);
  return susun3([k.benar, k.salah1, k.salah2], i + 2);
};

/** Menit dalam satu jam. Pengecoh: seratus, dan tiga puluh. */
export const opsiJam = (i: number): Pilih3<number> => susun3([60, 100, 30], i);
/** Laju per jam. Pengecoh: satuan dikali menit, dan satuan ditambah enam puluh. */
export const opsiLaju = (i: number): Pilih3<number> => {
  const s = SOAL_WAKTU[i];
  return susun3([lajuJam(s), s.a * s.m, s.a + 60], i + 1);
};
/** Menit untuk target. Pengecoh: target tanpa diubah ke menit, dan menit ditambah satu jam. */
export const opsiTargetWaktu = (i: number): Pilih3<number> => {
  const s = SOAL_WAKTU[i];
  const mn = menitTarget(s);
  return susun3([mn, s.target, mn + 60], i + 2);
};
/** Hasil dalam durasi menit. Pengecoh: satuan dikali durasi, dan hasil ditambah satuan. */
export const opsiDurasi = (i: number): Pilih3<number> => {
  const s = SOAL_WAKTU[i];
  const h = hasilDurasi(s);
  return susun3([h, s.a * s.durasi, h + s.a], i);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Bagian: 0 jumlah, 1 satu bagian, 2 benda pertama, 3 benda kedua, 4 selesai. Total: 0 pertama, 1 kedua, 2 beda, 3 selesai.
 *  Waktu: 0 jam, 1 laju, 2 target, 3 durasi, 4 selesai. */
export type StateBagianK6B2C = {
  bagian: { data: number; tahap: number };
  total: { data: number; tahap: number };
  waktu: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiBagianK6B2C =
  | { t: "BG_DATA"; i: number }
  | { t: "BG_JUMLAH"; o: number }
  | { t: "BG_SATU"; o: number }
  | { t: "BG_KA"; o: number }
  | { t: "BG_KB"; o: number }
  | { t: "TT_DATA"; i: number }
  | { t: "TT_KA"; o: number }
  | { t: "TT_KB"; o: number }
  | { t: "TT_BEDA"; o: number }
  | { t: "WK_DATA"; i: number }
  | { t: "WK_JAM"; o: number }
  | { t: "WK_LAJU"; o: number }
  | { t: "WK_TARGET"; o: number }
  | { t: "WK_DURASI"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBagianK6B2C = (): StateBagianK6B2C => ({
  bagian: { data: 0, tahap: 0 },
  total: { data: 0, tahap: 0 },
  waktu: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalBagian = (x: StateBagianK6B2C): SoalBagian => SOAL_BAGIAN[x.bagian.data];
export const soalTotal = (x: StateBagianK6B2C): SoalTotal => SOAL_TOTAL[x.total.data];
export const soalWaktu = (x: StateBagianK6B2C): SoalWaktu => SOAL_WAKTU[x.waktu.data];

/* ------------------------------ Bagian ------------------------------ */

function pilihJumlah(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.bagian.tahap !== 0) return x;
  const i = x.bagian.data;
  const s = SOAL_BAGIAN[i];
  const p = opsiJumlah(i);
  if (o === p.benar) return { ...x, bagian: { ...x.bagian, tahap: 1 }, pesan: `✅ ${s.a} + ${s.b} = ${s.a + s.b} bagian seluruhnya. Sekarang bagi ${s.total} dengan ${s.a + s.b} bagian.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jumlahkan kedua suku rasio ${teksRasio(s.a, s.b)} untuk mendapat banyak bagian seluruhnya.` };
}

function pilihSatu(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.bagian.tahap > 1) return x;
  const i = x.bagian.data;
  const s = SOAL_BAGIAN[i];
  if (x.bagian.tahap < 1) return { ...x, pesan: "Tentukan dulu banyak bagian seluruhnya." };
  const p = opsiSatu(i);
  if (o === p.benar) return { ...x, bagian: { ...x.bagian, tahap: 2 }, pesan: `✅ ${s.total} ÷ ${s.a + s.b} = ${satuBagian(s)}. Satu bagian bernilai ${satuBagian(s)}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bagi ${s.total} sama rata menjadi ${s.a + s.b} bagian.` };
}

function pilihKaBagian(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.bagian.tahap > 2) return x;
  const i = x.bagian.data;
  const s = SOAL_BAGIAN[i];
  if (x.bagian.tahap < 2) return { ...x, pesan: "Hitung dulu nilai satu bagian." };
  const p = opsiKa(i);
  const u = satuBagian(s);
  if (o === p.benar) return { ...x, bagian: { ...x.bagian, tahap: 3 }, pesan: `✅ ${s.ka}: ${s.a} bagian × ${u} = ${u * s.a}. Sekarang hitung ${s.kb}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. ${s.ka} mendapat ${s.a} bagian, tiap bagian bernilai ${u}.` };
}

function pilihKbBagian(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.bagian.tahap > 3) return x;
  const i = x.bagian.data;
  const s = SOAL_BAGIAN[i];
  if (x.bagian.tahap < 3) return { ...x, pesan: "Selesaikan dulu hitungan benda pertama." };
  const p = opsiKb(i);
  const u = satuBagian(s);
  if (o === p.benar) {
    return {
      ...x,
      bagian: { ...x.bagian, tahap: 4 },
      pernah: catat(x.pernah, idBagian(i)),
      pesan: `✅ ${s.kb}: ${s.b} bagian × ${u} = ${u * s.b}. Cek: ${u * s.a} + ${u * s.b} = ${s.total}, sama dengan jumlah seluruhnya.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. ${s.kb} mendapat ${s.b} bagian, tiap bagian bernilai ${u}.` };
}

/* ------------------------------ Total ------------------------------ */

function pilihTotalKa(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.total.tahap !== 0) return x;
  const i = x.total.data;
  const s = SOAL_TOTAL[i];
  const p = opsiTotalKa(i);
  if (o === p.benar) return { ...x, total: { ...x.total, tahap: 1 }, pesan: `✅ ${s.ka} terhadap seluruhnya ditulis ${teksRasio(s.a, s.a + s.b)}, karena seluruhnya ada ${s.a} + ${s.b} = ${s.a + s.b} bagian.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Pembandingnya adalah seluruhnya, yaitu ${s.a} + ${s.b} bagian, bukan hanya benda kedua.` };
}

function pilihTotalKb(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.total.tahap > 1) return x;
  const i = x.total.data;
  const s = SOAL_TOTAL[i];
  if (x.total.tahap < 1) return { ...x, pesan: "Tulis dulu rasio benda pertama terhadap seluruhnya." };
  const p = opsiTotalKb(i);
  if (o === p.benar) return { ...x, total: { ...x.total, tahap: 2 }, pesan: `✅ ${s.kb} terhadap seluruhnya ditulis ${teksRasio(s.b, s.a + s.b)}. Sekarang bandingkan dengan rasio bagian terhadap bagian.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. ${s.kb} ada ${s.b} bagian dari seluruhnya ${s.a + s.b} bagian.` };
}

function pilihBedaTotal(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.total.tahap > 2) return x;
  const i = x.total.data;
  const s = SOAL_TOTAL[i];
  if (x.total.tahap < 2) return { ...x, pesan: "Selesaikan dulu kedua rasio terhadap seluruhnya." };
  const p = opsiBedaTotal(i);
  if (o === p.benar) {
    return {
      ...x,
      total: { ...x.total, tahap: 3 },
      pernah: catat(x.pernah, idTotal(i)),
      pesan: `✅ ${teksRasio(s.a, s.b)} membandingkan bagian dengan bagian, sedangkan ${teksRasio(s.a, s.a + s.b)} membandingkan bagian dengan seluruhnya. Keduanya berbeda.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bandingkan pembandingnya: pada ${teksRasio(s.a, s.b)} pembandingnya benda kedua, pada ${teksRasio(s.a, s.a + s.b)} pembandingnya seluruhnya.` };
}

/* ------------------------------ Waktu ------------------------------ */

function pilihJam(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.waktu.tahap !== 0) return x;
  const i = x.waktu.data;
  const s = SOAL_WAKTU[i];
  const p = opsiJam(i);
  if (o === p.benar) return { ...x, waktu: { ...x.waktu, tahap: 1 }, pesan: `✅ 1 jam = 60 menit. Samakan satuan waktu dulu: ${s.a} ${s.satuan} dalam ${s.m} menit, lalu cari yang untuk 60 menit.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Satu jam sama dengan enam puluh menit.` };
}

function pilihLaju(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.waktu.tahap > 1) return x;
  const i = x.waktu.data;
  const s = SOAL_WAKTU[i];
  if (x.waktu.tahap < 1) return { ...x, pesan: "Tentukan dulu satu jam sama dengan berapa menit." };
  const p = opsiLaju(i);
  if (o === p.benar) return { ...x, waktu: { ...x.waktu, tahap: 2 }, pesan: `✅ ${s.a} ${s.satuan} per ${s.m} menit menjadi ${lajuJam(s)} ${s.satuan} per jam, karena 60 ÷ ${s.m} = ${60 / s.m} kali.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Skalakan ${s.m} menit menjadi 60 menit, lalu skalakan ${s.a} ${s.satuan} dengan pengali yang sama.` };
}

function pilihTargetWaktu(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.waktu.tahap > 2) return x;
  const i = x.waktu.data;
  const s = SOAL_WAKTU[i];
  if (x.waktu.tahap < 2) return { ...x, pesan: "Tentukan dulu laju per jam." };
  const p = opsiTargetWaktu(i);
  if (o === p.benar) return { ...x, waktu: { ...x.waktu, tahap: 3 }, pesan: `✅ ${s.target} ${s.satuan} butuh ${s.target} × ${s.m} ÷ ${s.a} = ${menitTarget(s)} menit.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kedua suku rasio dikali bilangan sama: ${s.a} ${s.satuan} dalam ${s.m} menit menjadi ${s.target} ${s.satuan} dalam berapa menit?` };
}

function pilihDurasi(x: StateBagianK6B2C, o: number): StateBagianK6B2C {
  if (!sah(o, 3) || x.waktu.tahap > 3) return x;
  const i = x.waktu.data;
  const s = SOAL_WAKTU[i];
  if (x.waktu.tahap < 3) return { ...x, pesan: "Selesaikan dulu hitungan menit untuk target." };
  const p = opsiDurasi(i);
  if (o === p.benar) {
    return {
      ...x,
      waktu: { ...x.waktu, tahap: 4 },
      pernah: catat(x.pernah, idWaktu(i)),
      pesan: `✅ Dalam ${s.durasi} menit dihasilkan ${hasilDurasi(s)} ${s.satuan}, karena ${s.a} ${s.satuan} per ${s.m} menit. Satuan waktunya sudah disamakan.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. ${s.durasi} menit sama dengan ${s.durasi / s.m} kali ${s.m} menit, jadi ${s.a} ${s.satuan} dikali ${s.durasi / s.m}.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahBagianK6B2C(x: StateBagianK6B2C, a: AksiBagianK6B2C): StateBagianK6B2C {
  switch (a.t) {
    case "BG_DATA":
      return sah(a.i, SOAL_BAGIAN.length) ? { ...x, bagian: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "BG_JUMLAH":
      return pilihJumlah(x, a.o);
    case "BG_SATU":
      return pilihSatu(x, a.o);
    case "BG_KA":
      return pilihKaBagian(x, a.o);
    case "BG_KB":
      return pilihKbBagian(x, a.o);
    case "TT_DATA":
      return sah(a.i, SOAL_TOTAL.length) ? { ...x, total: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "TT_KA":
      return pilihTotalKa(x, a.o);
    case "TT_KB":
      return pilihTotalKb(x, a.o);
    case "TT_BEDA":
      return pilihBedaTotal(x, a.o);
    case "WK_DATA":
      return sah(a.i, SOAL_WAKTU.length) ? { ...x, waktu: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "WK_JAM":
      return pilihJam(x, a.o);
    case "WK_LAJU":
      return pilihLaju(x, a.o);
    case "WK_TARGET":
      return pilihTargetWaktu(x, a.o);
    case "WK_DURASI":
      return pilihDurasi(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBagianK6B2C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBagianK6B2C = { alat: "bagian"; pernah: string[] };
export const keadaanBagianK6B2C = (x: StateBagianK6B2C): KeadaanBagianK6B2C => ({ alat: "bagian", pernah: x.pernah });

export const ucapBagianK6B2C = (x: StateBagianK6B2C): string => {
  const s = soalBagian(x);
  return `Soal ${s.nama}: ${s.ka} terhadap ${s.kb} adalah ${s.a} : ${s.b}, jumlah seluruhnya ${s.total}. Jumlahkan suku rasio untuk mendapat banyak bagian, cari nilai satu bagian, lalu hitung tiap benda.`;
};
export const ucapTotalK6B2C = (x: StateBagianK6B2C): string => {
  const s = soalTotal(x);
  return `Soal ${s.nama}: ${s.ka} terhadap ${s.kb} adalah ${s.a} : ${s.b}. Tulis rasio tiap benda terhadap seluruhnya, lalu bedakan dari rasio bagian terhadap bagian.`;
};
export const ucapWaktuK6B2C = (x: StateBagianK6B2C): string => {
  const s = soalWaktu(x);
  return `Soal ${s.nama}: ${s.a} ${s.satuan} dalam ${s.m} menit. Samakan satuan waktu dulu, cari laju per jam, hitung menit untuk target ${s.target} ${s.satuan}, lalu hitung hasil dalam ${s.durasi} menit.`;
};
