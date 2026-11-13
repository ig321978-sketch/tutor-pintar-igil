/**
 * Lab Susunan (Kelas 6 Bab 3, Sub-Bab A: Mengonstruksi dan Mengurai): logika murni. Satu alat, tiga tampilan.
 *  Susun     : hitung semua kubus yang tersusun, cari kubus yang kurang, lalu urai satu lantai (Construct-Decompose Protocol).
 *  Lapisan   : kubus lantai dasar, total, lalu sisa bila satu lantai dilepas (Layer Counting Method).
 *  Penyangga : kubus lantai kedua tidak boleh melayang, tambah penyangga bila perlu (Hidden Support Rule).
 * Tidak membahas gambar dari beberapa arah atau matriks tinggi (Sub-Bab B) dan letak di petak berhuruf (Sub-Bab C).
 * Semua hitungan memakai bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b3.mjs.
 */

/** Satu petak lantai: [kolom, baris]. */
export type Petak = [number, number];
/** Satu kubus satuan: [kolom, baris, lantai]; lantai 0 adalah lantai dasar. */
export type Kubus = [number, number, number];

export type SoalSusun = { nama: string; lantai: Petak[][]; target: number; namaTarget: string };
export type SoalLapisan = { nama: string; p: number; l: number; t: number };
export type SoalPenyangga = { nama: string; bawah: Petak[]; atas: Petak[] };

const kotak = (p: number, l: number): Petak[] => Array.from({ length: p * l }, (_, i): Petak => [i % p, (i - (i % p)) / p]);

/** Susunan kubus per lantai, dari lantai dasar ke atas. Tiap petak lantai atas punya penyangga di bawahnya. */
export const SOAL_SUSUN: SoalSusun[] = [
  { nama: "dua kubus ditumpuk", lantai: [[[0, 0]], [[0, 0]]], target: 8, namaTarget: "kubus 2 × 2 × 2" },
  { nama: "bentuk L", lantai: [[[0, 0], [1, 0]], [[0, 0]]], target: 8, namaTarget: "kubus 2 × 2 × 2" },
  { nama: "tangga tiga lantai", lantai: [[[0, 0], [1, 0], [2, 0]], [[0, 0], [1, 0]], [[0, 0]]], target: 12, namaTarget: "balok 3 × 2 × 2" },
  { nama: "menara kecil", lantai: [kotak(2, 2), [[1, 0], [0, 1]], [[1, 0]]], target: 12, namaTarget: "balok 2 × 2 × 3" },
  { nama: "kubus penuh", lantai: [kotak(2, 2), kotak(2, 2)], target: 18, namaTarget: "balok 3 × 3 × 2" },
  { nama: "balok rendah", lantai: [kotak(3, 2), kotak(3, 2)], target: 27, namaTarget: "kubus 3 × 3 × 3" },
];

/** Balok penuh p × l × t, dihitung per lantai. */
export const SOAL_LAPISAN: SoalLapisan[] = [
  { nama: "kubus kecil", p: 2, l: 2, t: 2 },
  { nama: "kubus besar", p: 3, l: 3, t: 3 },
  { nama: "balok kardus", p: 5, l: 3, t: 2 },
  { nama: "balok tinggi", p: 2, l: 3, t: 4 },
  { nama: "balok lebar", p: 4, l: 4, t: 2 },
  { nama: "balok gudang", p: 4, l: 3, t: 3 },
];

/** Lantai dasar `bawah` dan rencana lantai kedua `atas`. Petak atas tanpa petak bawah berarti melayang. */
export const SOAL_PENYANGGA: SoalPenyangga[] = [
  { nama: "dua kubus bertumpu", bawah: [[0, 0], [1, 0]], atas: [[0, 0]] },
  { nama: "kubus di sudut kosong", bawah: [[0, 0], [1, 0], [0, 1]], atas: [[1, 1]] },
  { nama: "dinding bertumpu", bawah: [[0, 0], [1, 0], [2, 0]], atas: [[0, 0], [1, 0]] },
  { nama: "kubus menjulur", bawah: [[0, 0]], atas: [[0, 0], [1, 0]] },
  { nama: "lantai penuh", bawah: kotak(2, 2), atas: [[0, 0], [1, 1]] },
  { nama: "dua kubus jauh", bawah: [[0, 0], [1, 0]], atas: [[2, 0], [2, 1]] },
];

export const idSusun = (i: number): string => `susun:${i}`;
export const idLapisan = (i: number): string => `lapisan:${i}`;
export const idPenyangga = (i: number): string => `penyangga:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

const sama = (a: Petak, b: Petak): boolean => a[0] === b[0] && a[1] === b[1];
const adaDi = (daftar: Petak[], p: Petak): boolean => daftar.some((q) => sama(q, p));

export const totalSusun = (s: SoalSusun): number => s.lantai.reduce((j, f) => j + f.length, 0);
export const lantaiTeratas = (s: SoalSusun): number => s.lantai[s.lantai.length - 1].length;
export const kurangSusun = (s: SoalSusun): number => s.target - totalSusun(s);
export const sisaSusun = (s: SoalSusun): number => totalSusun(s) - lantaiTeratas(s);

export const dasarLapisan = (s: SoalLapisan): number => s.p * s.l;
export const totalLapisan = (s: SoalLapisan): number => dasarLapisan(s) * s.t;
export const sisaLapisan = (s: SoalLapisan): number => dasarLapisan(s) * (s.t - 1);

/** Banyak petak lantai kedua yang tidak punya petak di lantai dasar. */
export const melayangPenyangga = (s: SoalPenyangga): number => s.atas.filter((p) => !adaDi(s.bawah, p)).length;
/** Lantai dasar sesudah penyangga ditambah: semua petak bawah ditambah petak atas yang belum ada. */
export const dasarSahPenyangga = (s: SoalPenyangga): number => s.bawah.length + melayangPenyangga(s);
export const totalSahPenyangga = (s: SoalPenyangga): number => dasarSahPenyangga(s) + s.atas.length;

/** Semua kubus satuan sebuah susunan, dari lantai dasar ke atas. */
export const kubusSusun = (s: SoalSusun): Kubus[] => s.lantai.flatMap((f, z) => f.map((p): Kubus => [p[0], p[1], z]));
/** Semua kubus balok penuh, termasuk yang tertutup. */
export const kubusLapisan = (s: SoalLapisan): Kubus[] =>
  Array.from({ length: s.t }, (_, z) => kotak(s.p, s.l).map((p): Kubus => [p[0], p[1], z])).flat();
/** Rencana penyangga apa adanya: lantai dasar `bawah`, lantai kedua `atas` (yang melayang tetap digambar). */
export const kubusPenyangga = (s: SoalPenyangga): Kubus[] => [...s.bawah.map((p): Kubus => [p[0], p[1], 0]), ...s.atas.map((p): Kubus => [p[0], p[1], 1])];

/**
 * Pilih dua pengecoh bilangan: calon yang berbeda dari jawaban dan satu sama lain, tidak negatif.
 * Bila calon habis, dipakai bilangan di sekitar jawaban, sehingga tidak ada pilihan ganda.
 */
export const pengecohAngka = (benar: number, calon: number[]): [number, number] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return [hasil[0], hasil[1]];
};

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}
const angka3 = (benar: number, calon: number[], r: number): Pilih3<number> => {
  const [p, q] = pengecohAngka(benar, calon);
  return susun3([benar, p, q], r);
};

/** Total kubus yang tersusun. Pengecoh: lantai dasar saja, tanpa lantai teratas, dan satu lebih. */
export const opsiHitungSusun = (i: number): Pilih3<number> => {
  const s = SOAL_SUSUN[i];
  return angka3(totalSusun(s), [s.lantai[0].length, sisaSusun(s), totalSusun(s) + 1], i);
};
/** Kubus yang kurang. Pengecoh: ukuran target utuh, dan banyak kubus yang sudah ada. */
export const opsiKurangSusun = (i: number): Pilih3<number> => {
  const s = SOAL_SUSUN[i];
  return angka3(kurangSusun(s), [s.target, totalSusun(s), s.target + totalSusun(s)], i + 1);
};
/** Sisa sesudah lantai teratas dilepas. Pengecoh: total semula, dan banyak kubus lantai teratas. */
export const opsiUraiSusun = (i: number): Pilih3<number> => {
  const s = SOAL_SUSUN[i];
  return angka3(sisaSusun(s), [totalSusun(s), lantaiTeratas(s), s.lantai[0].length], i + 2);
};

/** Kubus lantai dasar. Pengecoh: jumlah ukuran, dan ukuran kali tinggi. */
export const opsiDasarLapisan = (i: number): Pilih3<number> => {
  const s = SOAL_LAPISAN[i];
  return angka3(dasarLapisan(s), [s.p + s.l, s.p * s.t, s.l * s.t], i);
};
/** Total kubus. Pengecoh: lantai dasar saja, dan jumlah ketiga ukuran. */
export const opsiTotalLapisan = (i: number): Pilih3<number> => {
  const s = SOAL_LAPISAN[i];
  return angka3(totalLapisan(s), [dasarLapisan(s), s.p + s.l + s.t, dasarLapisan(s) + s.t], i + 1);
};
/** Sisa sesudah satu lantai dilepas. Pengecoh: total semula, dan lantai dasar saja. */
export const opsiSisaLapisan = (i: number): Pilih3<number> => {
  const s = SOAL_LAPISAN[i];
  return angka3(sisaLapisan(s), [totalLapisan(s), dasarLapisan(s), totalLapisan(s) - s.t], i + 2);
};

/** Banyak kubus melayang. Pengecoh: semua kubus lantai kedua, dan satu lebihnya. */
export const opsiMelayang = (i: number): Pilih3<number> => {
  const s = SOAL_PENYANGGA[i];
  return angka3(melayangPenyangga(s), [s.atas.length, melayangPenyangga(s) + 1, s.bawah.length], i);
};
export const JAWAB_BOLEH = "Boleh dibangun, semua kubus punya penyangga";
export const JAWAB_TAMBAH = "Tambah penyangga dulu di bawah kubus yang melayang";
export const JAWAB_BIARKAN = "Biarkan saja, kubus boleh melayang";
/** Keputusan. Benar bergantung pada ada atau tidaknya kubus yang melayang. */
export const opsiPutusan = (i: number): Pilih3<string> => {
  const m = melayangPenyangga(SOAL_PENYANGGA[i]);
  return susun3(m === 0 ? [JAWAB_BOLEH, JAWAB_TAMBAH, JAWAB_BIARKAN] : [JAWAB_TAMBAH, JAWAB_BOLEH, JAWAB_BIARKAN], i + 1);
};
/** Total kubus sesudah susunan sah. Pengecoh: jumlah mentah tanpa penyangga, dan lantai dasar sesudah ditambah. */
export const opsiTotalPenyangga = (i: number): Pilih3<number> => {
  const s = SOAL_PENYANGGA[i];
  return angka3(totalSahPenyangga(s), [s.bawah.length + s.atas.length, dasarSahPenyangga(s), s.atas.length], i + 2);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Susun: 0 hitung, 1 kurang, 2 urai, 3 selesai. Lapisan: 0 dasar, 1 total, 2 sisa, 3 selesai. Penyangga: 0 melayang, 1 keputusan, 2 total, 3 selesai. */
export type StateSusunanK6B3A = {
  susun: { data: number; tahap: number };
  lapisan: { data: number; tahap: number };
  penyangga: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiSusunanK6B3A =
  | { t: "S_DATA"; i: number }
  | { t: "S_HITUNG"; o: number }
  | { t: "S_KURANG"; o: number }
  | { t: "S_URAI"; o: number }
  | { t: "L_DATA"; i: number }
  | { t: "L_DASAR"; o: number }
  | { t: "L_TOTAL"; o: number }
  | { t: "L_SISA"; o: number }
  | { t: "P_DATA"; i: number }
  | { t: "P_MELAYANG"; o: number }
  | { t: "P_PUTUSAN"; o: number }
  | { t: "P_TOTAL"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSusunanK6B3A = (): StateSusunanK6B3A => ({
  susun: { data: 0, tahap: 0 },
  lapisan: { data: 0, tahap: 0 },
  penyangga: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalSusun = (x: StateSusunanK6B3A): SoalSusun => SOAL_SUSUN[x.susun.data];
export const soalLapisan = (x: StateSusunanK6B3A): SoalLapisan => SOAL_LAPISAN[x.lapisan.data];
export const soalPenyangga = (x: StateSusunanK6B3A): SoalPenyangga => SOAL_PENYANGGA[x.penyangga.data];

/* ------------------------------ Susun ------------------------------ */

function pilihHitungSusun(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.susun.tahap !== 0) return x;
  const i = x.susun.data;
  const s = SOAL_SUSUN[i];
  const p = opsiHitungSusun(i);
  if (o === p.benar) return { ...x, susun: { ...x.susun, tahap: 1 }, pesan: `✅ ${s.nama} berisi ${totalSusun(s)} kubus, dihitung lantai demi lantai. Sekarang cari kubus yang kurang untuk ${s.namaTarget}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung kubus tiap lantai, termasuk yang tertutup, lalu jumlahkan.` };
}

function pilihKurangSusun(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.susun.tahap > 1) return x;
  const i = x.susun.data;
  const s = SOAL_SUSUN[i];
  if (x.susun.tahap < 1) return { ...x, pesan: "Hitung dulu semua kubus yang sudah tersusun." };
  const p = opsiKurangSusun(i);
  if (o === p.benar) return { ...x, susun: { ...x.susun, tahap: 2 }, pesan: `✅ ${s.namaTarget} butuh ${s.target} kubus, sudah ada ${totalSusun(s)}, jadi kurang ${kurangSusun(s)}. Sekarang urai satu lantai.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kubus yang kurang adalah kebutuhan ${s.target} dikurangi kubus yang sudah ada.` };
}

function pilihUraiSusun(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.susun.tahap > 2) return x;
  const i = x.susun.data;
  const s = SOAL_SUSUN[i];
  if (x.susun.tahap < 2) return { ...x, pesan: "Selesaikan dulu langkah mencari kubus yang kurang." };
  const p = opsiUraiSusun(i);
  if (o === p.benar) {
    return {
      ...x,
      susun: { ...x.susun, tahap: 3 },
      pernah: catat(x.pernah, idSusun(i)),
      pesan: `✅ Lantai teratas berisi ${lantaiTeratas(s)} kubus. Dilepas, tersisa ${totalSusun(s)} dikurangi ${lantaiTeratas(s)} sama dengan ${sisaSusun(s)} kubus. Susun lalu urai, jumlahnya tetap bisa dihitung.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Lepas lantai teratas, lalu hitung kubus yang masih tersusun.` };
}

/* ------------------------------ Lapisan ------------------------------ */

function pilihDasarLapisan(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.lapisan.tahap !== 0) return x;
  const i = x.lapisan.data;
  const s = SOAL_LAPISAN[i];
  const p = opsiDasarLapisan(i);
  if (o === p.benar) return { ...x, lapisan: { ...x.lapisan, tahap: 1 }, pesan: `✅ Lantai dasar ${s.p} × ${s.l} berisi ${dasarLapisan(s)} kubus. Semua lantai penuh sama banyak. Sekarang hitung seluruh kubus.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Lantai dasar berisi ${s.p} kubus tiap baris dan ada ${s.l} baris.` };
}

function pilihTotalLapisan(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.lapisan.tahap > 1) return x;
  const i = x.lapisan.data;
  const s = SOAL_LAPISAN[i];
  if (x.lapisan.tahap < 1) return { ...x, pesan: "Hitung dulu kubus lantai dasar." };
  const p = opsiTotalLapisan(i);
  if (o === p.benar) return { ...x, lapisan: { ...x.lapisan, tahap: 2 }, pesan: `✅ ${dasarLapisan(s)} kubus tiap lantai dan ${s.t} lantai: ${dasarLapisan(s)} × ${s.t} = ${totalLapisan(s)} kubus, sama dengan ${s.p} × ${s.l} × ${s.t}.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kalikan kubus satu lantai dengan banyak lantai, ${s.t}.` };
}

function pilihSisaLapisan(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.lapisan.tahap > 2) return x;
  const i = x.lapisan.data;
  const s = SOAL_LAPISAN[i];
  if (x.lapisan.tahap < 2) return { ...x, pesan: "Hitung dulu semua kubus." };
  const p = opsiSisaLapisan(i);
  if (o === p.benar) {
    return {
      ...x,
      lapisan: { ...x.lapisan, tahap: 3 },
      pernah: catat(x.pernah, idLapisan(i)),
      pesan: `✅ Satu lantai dilepas, tersisa ${s.t - 1} lantai: ${dasarLapisan(s)} × ${s.t - 1} = ${sisaLapisan(s)} kubus. Hitung lantai demi lantai, jangan hanya yang kelihatan.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Sesudah satu lantai dilepas, masih ada ${s.t - 1} lantai penuh.` };
}

/* ------------------------------ Penyangga ------------------------------ */

function pilihMelayang(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.penyangga.tahap !== 0) return x;
  const i = x.penyangga.data;
  const s = SOAL_PENYANGGA[i];
  const m = melayangPenyangga(s);
  const p = opsiMelayang(i);
  if (o === p.benar) {
    return {
      ...x,
      penyangga: { ...x.penyangga, tahap: 1 },
      pesan: m === 0 ? `✅ Semua ${s.atas.length} kubus lantai kedua berada tepat di atas kubus lantai dasar, jadi tidak ada yang melayang.` : `✅ ${m} kubus lantai kedua tidak punya kubus di bawahnya, jadi melayang.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Periksa tiap kubus lantai kedua: adakah kubus tepat di bawahnya?` };
}

function pilihPutusan(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.penyangga.tahap > 1) return x;
  const i = x.penyangga.data;
  const s = SOAL_PENYANGGA[i];
  if (x.penyangga.tahap < 1) return { ...x, pesan: "Hitung dulu kubus yang melayang." };
  const m = melayangPenyangga(s);
  const p = opsiPutusan(i);
  if (o === p.benar) {
    return { ...x, penyangga: { ...x.penyangga, tahap: 2 }, pesan: m === 0 ? "✅ Susunan ini sah, tidak ada kubus melayang. Sekarang hitung seluruh kubusnya." : `✅ Kubus tidak boleh melayang, jadi ${m} penyangga ditambah di lantai dasar. Sekarang hitung seluruh kubusnya.` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kubus di lantai atas harus selalu bertumpu pada kubus di bawahnya.` };
}

function pilihTotalPenyangga(x: StateSusunanK6B3A, o: number): StateSusunanK6B3A {
  if (!sah(o, 3) || x.penyangga.tahap > 2) return x;
  const i = x.penyangga.data;
  const s = SOAL_PENYANGGA[i];
  if (x.penyangga.tahap < 2) return { ...x, pesan: "Putuskan dulu apakah susunan ini sah." };
  const p = opsiTotalPenyangga(i);
  if (o === p.benar) {
    return {
      ...x,
      penyangga: { ...x.penyangga, tahap: 3 },
      pernah: catat(x.pernah, idPenyangga(i)),
      pesan: `✅ Lantai dasar ${dasarSahPenyangga(s)} kubus dan lantai kedua ${s.atas.length} kubus: seluruhnya ${totalSahPenyangga(s)} kubus, termasuk yang tertutup.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jumlahkan lantai dasar sesudah penyangga ditambah dengan lantai kedua.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahSusunanK6B3A(x: StateSusunanK6B3A, a: AksiSusunanK6B3A): StateSusunanK6B3A {
  switch (a.t) {
    case "S_DATA":
      return sah(a.i, SOAL_SUSUN.length) ? { ...x, susun: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "S_HITUNG":
      return pilihHitungSusun(x, a.o);
    case "S_KURANG":
      return pilihKurangSusun(x, a.o);
    case "S_URAI":
      return pilihUraiSusun(x, a.o);
    case "L_DATA":
      return sah(a.i, SOAL_LAPISAN.length) ? { ...x, lapisan: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "L_DASAR":
      return pilihDasarLapisan(x, a.o);
    case "L_TOTAL":
      return pilihTotalLapisan(x, a.o);
    case "L_SISA":
      return pilihSisaLapisan(x, a.o);
    case "P_DATA":
      return sah(a.i, SOAL_PENYANGGA.length) ? { ...x, penyangga: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "P_MELAYANG":
      return pilihMelayang(x, a.o);
    case "P_PUTUSAN":
      return pilihPutusan(x, a.o);
    case "P_TOTAL":
      return pilihTotalPenyangga(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSusunanK6B3A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSusunanK6B3A = { alat: "susunan"; pernah: string[] };
export const keadaanSusunanK6B3A = (x: StateSusunanK6B3A): KeadaanSusunanK6B3A => ({ alat: "susunan", pernah: x.pernah });

export const ucapSusunK6B3A = (x: StateSusunanK6B3A): string => {
  const s = soalSusun(x);
  return `Soal ${s.nama}: ada ${s.lantai.length} lantai. Hitung semua kubusnya, cari kubus yang kurang untuk ${s.namaTarget}, lalu urai lantai teratasnya.`;
};
export const ucapLapisanK6B3A = (x: StateSusunanK6B3A): string => {
  const s = soalLapisan(x);
  return `Soal ${s.nama}: balok penuh ${s.p} × ${s.l} × ${s.t}. Hitung kubus satu lantai, seluruh kubus, lalu sisa bila satu lantai dilepas.`;
};
export const ucapPenyanggaK6B3A = (x: StateSusunanK6B3A): string => {
  const s = soalPenyangga(x);
  return `Soal ${s.nama}: lantai dasar ${s.bawah.length} kubus dan lantai kedua ${s.atas.length} kubus. Cari kubus yang melayang, putuskan apakah susunan sah, lalu hitung seluruh kubus.`;
};
