/**
 * Lab Senilai (Kelas 6 Bab 2, Sub-Bab B: Kesamaan Rasio): logika murni. Satu alat, tiga tampilan.
 *  Tabel   : baris rasio baru dibuat dengan mengalikan kedua suku dengan bilangan yang sama; menambah bilangan sama ditolak
 *            (Equivalent Ratio Table).
 *  Jembatan: rasio a : b ditulis sebagai pecahan a/b, pecahan senilai dicari dengan pengali sama, lalu dicek dengan perkalian silang
 *            (Fraction-Equivalence Bridge).
 *  Satuan  : nilai untuk satu satuan (harga per bibit, bibit per jam), dipakai untuk menghitung target dan membandingkan
 *            (Unit Rate Method).
 * Tidak membahas bagian terhadap keseluruhan, jumlah bagian, dan konversi durasi (itu Sub-Bab C).
 * Semua hitungan memakai bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b2.mjs.
 */

export type SoalTabel = { nama: string; a: number; b: number; k: number; ka: string; kb: string };
export type SoalJembatan = { nama: string; a: number; b: number; m: number };
export type SoalSatuan = { nama: string; a: number; b: number; jenis: "rupiah" | "benda"; ka: string; kb: string; t: number; pembanding: number };

/** a : b dikali k pada kedua suku. */
export const SOAL_TABEL: SoalTabel[] = [
  { nama: "lahan dan bibit", a: 10, b: 12, k: 5, ka: "m² lahan", kb: "bibit" },
  { nama: "petak dua puluh lima", a: 5, b: 6, k: 5, ka: "m² lahan", kb: "bibit" },
  { nama: "adonan kue", a: 2, b: 3, k: 4, ka: "gelas tepung", kb: "gelas air" },
  { nama: "campuran cat", a: 3, b: 4, k: 3, ka: "kaleng putih", kb: "kaleng biru" },
  { nama: "kopi dan gula", a: 1, b: 2, k: 6, ka: "sendok kopi", kb: "sendok gula" },
  { nama: "tali dan pita", a: 4, b: 10, k: 3, ka: "meter tali", kb: "meter pita" },
];

/** a/b dan pecahan senilainya (a x m)/(b x m). */
export const SOAL_JEMBATAN: SoalJembatan[] = [
  { nama: "lahan sepuluh", a: 10, b: 12, m: 3 },
  { nama: "lahan lima", a: 5, b: 6, m: 2 },
  { nama: "adonan dua", a: 2, b: 3, m: 5 },
  { nama: "cat tiga", a: 3, b: 5, m: 4 },
  { nama: "kopi satu", a: 1, b: 2, m: 6 },
  { nama: "tali empat", a: 4, b: 10, m: 5 },
];

/** a untuk b satuan; nilai satuan = a / b (habis dibagi). t satuan target, pembanding nilai satuan paket lain. */
export const SOAL_SATUAN: SoalSatuan[] = [
  { nama: "paket bibit", a: 40000, b: 5, jenis: "rupiah", ka: "", kb: "bibit", t: 3, pembanding: 9000 },
  { nama: "kemasan bibit", a: 12, b: 3, jenis: "benda", ka: "bibit", kb: "jam", t: 4, pembanding: 3 },
  { nama: "paket A", a: 32000, b: 4, jenis: "rupiah", ka: "", kb: "bibit", t: 6, pembanding: 7000 },
  { nama: "paket B", a: 42000, b: 6, jenis: "rupiah", ka: "", kb: "bibit", t: 4, pembanding: 8000 },
  { nama: "kemasan pot", a: 18, b: 6, jenis: "benda", ka: "pot", kb: "jam", t: 5, pembanding: 4 },
  { nama: "jahe segar", a: 60000, b: 3, jenis: "rupiah", ka: "", kb: "kg", t: 5, pembanding: 25000 },
];

export const idTabel = (i: number): string => `tabel:${i}`;
export const idJembatan = (i: number): string => `jembatan:${i}`;
export const idSatuan = (i: number): string => `satuan:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const teksRasio = (a: number, b: number): string => `${a} : ${b}`;
export const rasioSederhana = (a: number, b: number): string => {
  const g = gcd(a, b);
  return teksRasio(a / g, b / g);
};
/** Rupiah dengan titik ribuan: 8000 menjadi "Rp8.000". */
export const rp = (n: number): string => {
  const s = String(n);
  let hasil = "";
  for (let i = 0; i < s.length; i += 1) {
    if (i > 0 && (s.length - i) % 3 === 0) hasil += ".";
    hasil += s[i];
  }
  return `Rp${hasil}`;
};
/** Nilai sesuai jenis soal: rupiah, atau banyak benda. */
export const nilaiSatuan = (s: SoalSatuan, v: number): string => (s.jenis === "rupiah" ? rp(v) : `${v} ${s.ka}`);
export const satuanRata = (s: SoalSatuan): number => s.a / s.b;

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}

/** Pengali baris tabel. Pengecoh: menambah selisih suku kiri, dan membagi. */
export const opsiPengali = (i: number): Pilih3<string> => {
  const s = SOAL_TABEL[i];
  const x = s.a * s.k;
  return susun3([`kali ${s.k}`, `tambah ${x - s.a}`, `bagi ${s.k}`], i);
};
/** Suku kanan baris baru. Pengecoh: ditambah selisih yang sama, dan satu pengali lebih. */
export const opsiIsi = (i: number): Pilih3<number> => {
  const s = SOAL_TABEL[i];
  return susun3([s.b * s.k, s.b + (s.a * s.k - s.a), s.b * (s.k + 1)], i + 1);
};
/** Baris baru disederhanakan kembali. Pengecoh: tidak disederhanakan, dan urutan terbalik. */
export const opsiCekTabel = (i: number): Pilih3<string> => {
  const s = SOAL_TABEL[i];
  const g = gcd(s.a * s.k, s.b * s.k);
  return susun3([teksRasio((s.a * s.k) / g, (s.b * s.k) / g), teksRasio(s.a * s.k, s.b * s.k), teksRasio((s.b * s.k) / g, (s.a * s.k) / g)], i + 2);
};

/** Pecahan senilai. Pengecoh: ditambah bilangan sama, dan terbalik. */
export const opsiSenilai = (i: number): Pilih3<string> => {
  const s = SOAL_JEMBATAN[i];
  return susun3([`${s.a * s.m}/${s.b * s.m}`, `${s.a + s.m}/${s.b + s.m}`, `${s.b * s.m}/${s.a * s.m}`], i);
};
/** Pengali penghubung. Pengecoh: ditambah, dan dibagi. */
export const opsiPengaliJ = (i: number): Pilih3<string> => {
  const s = SOAL_JEMBATAN[i];
  return susun3([`kali ${s.m}`, `tambah ${s.m}`, `bagi ${s.m}`], i + 1);
};
/** Perkalian silang. Pengecoh: dikali searah, dan dijumlahkan. */
export const opsiSilang = (i: number): Pilih3<string> => {
  const s = SOAL_JEMBATAN[i];
  const c = s.a * s.m;
  const d = s.b * s.m;
  return susun3(
    [`${s.a} × ${d} = ${s.a * d} dan ${s.b} × ${c} = ${s.b * c}, sama`, `${s.a} × ${c} = ${s.a * c} dan ${s.b} × ${d} = ${s.b * d}, beda`, `${s.a} + ${d} = ${s.a + d} dan ${s.b} + ${c} = ${s.b + c}, belum tentu sama`],
    i + 2,
  );
};

/** Nilai satuan. Pengecoh: nilai seluruhnya, dan banyak satuannya. */
export const opsiSatuan = (i: number): Pilih3<string> => {
  const s = SOAL_SATUAN[i];
  return susun3([nilaiSatuan(s, satuanRata(s)), nilaiSatuan(s, s.a), nilaiSatuan(s, s.b)], i);
};
/** Nilai untuk t satuan. Pengecoh: nilai seluruhnya dikali t, dan nilai satuan ditambah t. */
export const opsiTarget = (i: number): Pilih3<string> => {
  const s = SOAL_SATUAN[i];
  const u = satuanRata(s);
  return susun3([nilaiSatuan(s, u * s.t), nilaiSatuan(s, s.a * s.t), nilaiSatuan(s, u + s.t)], i + 1);
};
/** Kalimat pembanding. Rupiah: lebih hemat atau lebih mahal. Benda per jam: lebih cepat atau lebih lambat. */
export const kalimatBanding = (s: SoalSatuan): { benar: string; lawan: string } => {
  const u = satuanRata(s);
  if (s.jenis === "rupiah") return u < s.pembanding ? { benar: "Lebih hemat dari pembanding", lawan: "Lebih mahal dari pembanding" } : { benar: "Lebih mahal dari pembanding", lawan: "Lebih hemat dari pembanding" };
  return u > s.pembanding ? { benar: "Lebih cepat dari pembanding", lawan: "Lebih lambat dari pembanding" } : { benar: "Lebih lambat dari pembanding", lawan: "Lebih cepat dari pembanding" };
};
export const opsiBanding = (i: number): Pilih3<string> => {
  const k = kalimatBanding(SOAL_SATUAN[i]);
  return susun3([k.benar, k.lawan, "Sama saja dengan pembanding"], i + 2);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Tabel: 0 pengali, 1 isi, 2 cek, 3 selesai. Jembatan: 0 senilai, 1 pengali, 2 silang, 3 selesai. Satuan: 0 nilai, 1 target, 2 banding, 3 selesai. */
export type StateSenilaiK6B2B = {
  tabel: { data: number; tahap: number };
  jembatan: { data: number; tahap: number };
  satuan: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiSenilaiK6B2B =
  | { t: "TB_DATA"; i: number }
  | { t: "TB_PENGALI"; o: number }
  | { t: "TB_ISI"; o: number }
  | { t: "TB_CEK"; o: number }
  | { t: "JM_DATA"; i: number }
  | { t: "JM_SENILAI"; o: number }
  | { t: "JM_PENGALI"; o: number }
  | { t: "JM_SILANG"; o: number }
  | { t: "ST_DATA"; i: number }
  | { t: "ST_SATUAN"; o: number }
  | { t: "ST_TARGET"; o: number }
  | { t: "ST_BANDING"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSenilaiK6B2B = (): StateSenilaiK6B2B => ({
  tabel: { data: 0, tahap: 0 },
  jembatan: { data: 0, tahap: 0 },
  satuan: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalTabel = (x: StateSenilaiK6B2B): SoalTabel => SOAL_TABEL[x.tabel.data];
export const soalJembatan = (x: StateSenilaiK6B2B): SoalJembatan => SOAL_JEMBATAN[x.jembatan.data];
export const soalSatuan = (x: StateSenilaiK6B2B): SoalSatuan => SOAL_SATUAN[x.satuan.data];

/* ------------------------------ Tabel ------------------------------ */

function pilihPengali(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.tabel.tahap !== 0) return x;
  const i = x.tabel.data;
  const s = SOAL_TABEL[i];
  const p = opsiPengali(i);
  if (o === p.benar) return { ...x, tabel: { ...x.tabel, tahap: 1 }, pesan: `✅ Suku kiri ${s.a} menjadi ${s.a * s.k} dengan dikali ${s.k}. Suku kanan harus dikali ${s.k} juga.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Baris baru yang senilai dibuat dengan mengalikan kedua suku dengan bilangan yang sama, bukan menambah. ${s.a} dikali berapa sama dengan ${s.a * s.k}?` };
}

function pilihIsi(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.tabel.tahap > 1) return x;
  const i = x.tabel.data;
  const s = SOAL_TABEL[i];
  if (x.tabel.tahap < 1) return { ...x, pesan: "Tentukan dulu pengali untuk suku kiri." };
  const p = opsiIsi(i);
  if (o === p.benar) return { ...x, tabel: { ...x.tabel, tahap: 2 }, pesan: `✅ ${s.b} × ${s.k} = ${s.b * s.k}. Baris baru: ${s.a * s.k} ${s.ka} : ${s.b * s.k} ${s.kb}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Suku kanan, yaitu ${s.b}, dikali ${s.k} juga, sama seperti suku kiri.` };
}

function pilihCekTabel(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.tabel.tahap > 2) return x;
  const i = x.tabel.data;
  const s = SOAL_TABEL[i];
  if (x.tabel.tahap < 2) return { ...x, pesan: "Selesaikan dulu pengali dan isi baris barunya." };
  const p = opsiCekTabel(i);
  if (o === p.benar) {
    const sd = rasioSederhana(s.a, s.b);
    return {
      ...x,
      tabel: { ...x.tabel, tahap: 3 },
      pernah: catat(x.pernah, idTabel(i)),
      pesan: `✅ ${teksRasio(s.a, s.b)} dan ${teksRasio(s.a * s.k, s.b * s.k)} sama-sama menjadi ${sd}, jadi keduanya senilai.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Sederhanakan ${teksRasio(s.a * s.k, s.b * s.k)} dengan membagi kedua suku memakai FPB, dan jaga urutannya.` };
}

/* ------------------------------ Jembatan ------------------------------ */

function pilihSenilai(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.jembatan.tahap !== 0) return x;
  const i = x.jembatan.data;
  const s = SOAL_JEMBATAN[i];
  const p = opsiSenilai(i);
  if (o === p.benar) return { ...x, jembatan: { ...x.jembatan, tahap: 1 }, pesan: `✅ ${s.a}/${s.b} senilai dengan ${p.opsi[o]}. Sekarang cari pengali yang menghubungkan keduanya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Pecahan yang senilai dengan ${s.a}/${s.b} memakai pengali yang sama pada pembilang dan penyebut, bukan ditambah dan bukan dibalik.` };
}

function pilihPengaliJ(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.jembatan.tahap > 1) return x;
  const i = x.jembatan.data;
  const s = SOAL_JEMBATAN[i];
  if (x.jembatan.tahap < 1) return { ...x, pesan: "Pilih dulu pecahan yang senilai." };
  const p = opsiPengaliJ(i);
  if (o === p.benar) return { ...x, jembatan: { ...x.jembatan, tahap: 2 }, pesan: `✅ ${s.a} × ${s.m} = ${s.a * s.m} dan ${s.b} × ${s.m} = ${s.b * s.m}. Pembilang dan penyebut dikali ${s.m}. Sekarang cek dengan perkalian silang.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Dari ${s.a} menjadi ${s.a * s.m} dan dari ${s.b} menjadi ${s.b * s.m}, kedua suku dikali bilangan yang sama.` };
}

function pilihSilang(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.jembatan.tahap > 2) return x;
  const i = x.jembatan.data;
  const s = SOAL_JEMBATAN[i];
  if (x.jembatan.tahap < 2) return { ...x, pesan: "Selesaikan dulu pecahan senilai dan pengalinya." };
  const p = opsiSilang(i);
  if (o === p.benar) {
    return {
      ...x,
      jembatan: { ...x.jembatan, tahap: 3 },
      pernah: catat(x.pernah, idJembatan(i)),
      pesan: `✅ ${s.a}/${s.b} = ${s.a * s.m}/${s.b * s.m}. Perkalian silang ${s.a} × ${s.b * s.m} dan ${s.b} × ${s.a * s.m} sama-sama ${s.a * s.b * s.m}, jadi kesamaan rasio adalah pecahan senilai.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Perkalian silang mengalikan pembilang pertama dengan penyebut kedua, dan penyebut pertama dengan pembilang kedua.` };
}

/* ------------------------------ Satuan ------------------------------ */

const per = (s: SoalSatuan): string => `per ${s.kb}`;

function pilihNilaiSatuan(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.satuan.tahap !== 0) return x;
  const i = x.satuan.data;
  const s = SOAL_SATUAN[i];
  const p = opsiSatuan(i);
  const u = satuanRata(s);
  if (o === p.benar) return { ...x, satuan: { ...x.satuan, tahap: 1 }, pesan: `✅ ${nilaiSatuan(s, s.a)} untuk ${s.b} ${s.kb} sama dengan ${nilaiSatuan(s, u)} ${per(s)}. Sekarang pakai nilai satu satuan untuk ${s.t} ${s.kb}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bagi ${nilaiSatuan(s, s.a)} dengan ${s.b} ${s.kb} untuk mendapat nilai untuk satu ${s.kb}, dan tulis satuannya.` };
}

function pilihTarget(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.satuan.tahap > 1) return x;
  const i = x.satuan.data;
  const s = SOAL_SATUAN[i];
  if (x.satuan.tahap < 1) return { ...x, pesan: "Tentukan dulu nilai untuk satu satuan." };
  const u = satuanRata(s);
  const p = opsiTarget(i);
  if (o === p.benar) return { ...x, satuan: { ...x.satuan, tahap: 2 }, pesan: `✅ ${s.t} ${s.kb} × ${nilaiSatuan(s, u)} ${per(s)} = ${nilaiSatuan(s, u * s.t)}. Sekarang bandingkan dengan pembanding.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kalikan nilai satu satuan, yaitu ${nilaiSatuan(s, u)}, dengan ${s.t}.` };
}

function pilihBanding(x: StateSenilaiK6B2B, o: number): StateSenilaiK6B2B {
  if (!sah(o, 3) || x.satuan.tahap > 2) return x;
  const i = x.satuan.data;
  const s = SOAL_SATUAN[i];
  if (x.satuan.tahap < 2) return { ...x, pesan: "Selesaikan dulu nilai satuan dan hitungan targetnya." };
  const u = satuanRata(s);
  const p = opsiBanding(i);
  if (o === p.benar) {
    return {
      ...x,
      satuan: { ...x.satuan, tahap: 3 },
      pernah: catat(x.pernah, idSatuan(i)),
      pesan: `✅ ${nilaiSatuan(s, u)} ${per(s)} dibanding ${nilaiSatuan(s, s.pembanding)} ${per(s)}: ${p.opsi[o].toLowerCase()}. Nilai satuan membuat perbandingan adil.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bandingkan ${nilaiSatuan(s, u)} dengan ${nilaiSatuan(s, s.pembanding)}, keduanya ${per(s)}.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahSenilaiK6B2B(x: StateSenilaiK6B2B, a: AksiSenilaiK6B2B): StateSenilaiK6B2B {
  switch (a.t) {
    case "TB_DATA":
      return sah(a.i, SOAL_TABEL.length) ? { ...x, tabel: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "TB_PENGALI":
      return pilihPengali(x, a.o);
    case "TB_ISI":
      return pilihIsi(x, a.o);
    case "TB_CEK":
      return pilihCekTabel(x, a.o);
    case "JM_DATA":
      return sah(a.i, SOAL_JEMBATAN.length) ? { ...x, jembatan: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "JM_SENILAI":
      return pilihSenilai(x, a.o);
    case "JM_PENGALI":
      return pilihPengaliJ(x, a.o);
    case "JM_SILANG":
      return pilihSilang(x, a.o);
    case "ST_DATA":
      return sah(a.i, SOAL_SATUAN.length) ? { ...x, satuan: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "ST_SATUAN":
      return pilihNilaiSatuan(x, a.o);
    case "ST_TARGET":
      return pilihTarget(x, a.o);
    case "ST_BANDING":
      return pilihBanding(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSenilaiK6B2B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSenilaiK6B2B = { alat: "senilai"; pernah: string[] };
export const keadaanSenilaiK6B2B = (x: StateSenilaiK6B2B): KeadaanSenilaiK6B2B => ({ alat: "senilai", pernah: x.pernah });

export const ucapTabelK6B2B = (x: StateSenilaiK6B2B): string => {
  const s = soalTabel(x);
  return `Soal ${s.nama}: ${s.a} ${s.ka} : ${s.b} ${s.kb}. Buat baris baru dengan mengalikan kedua suku dengan bilangan yang sama, lalu sederhanakan kembali untuk melihat bahwa keduanya senilai.`;
};
export const ucapJembatanK6B2B = (x: StateSenilaiK6B2B): string => {
  const s = soalJembatan(x);
  return `Soal ${s.nama}: ${s.a}/${s.b}. Cari pecahan yang senilai dengan pengali yang sama pada pembilang dan penyebut, lalu cek dengan perkalian silang.`;
};
export const ucapSatuanK6B2B = (x: StateSenilaiK6B2B): string => {
  const s = soalSatuan(x);
  return `Soal ${s.nama}: ${nilaiSatuan(s, s.a)} untuk ${s.b} ${s.kb}. Cari nilai untuk satu satuan, hitung target ${s.t} ${s.kb}, lalu bandingkan dengan pembanding.`;
};
