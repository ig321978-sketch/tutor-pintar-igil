/**
 * Lab Banding (Kelas 6 Bab 4, Sub-Bab B: Membandingkan Peluang Kejadian): logika murni. Satu alat, tiga tampilan.
 *  Rasio  : hasil menguntungkan (k), semua hasil (n), dan hasil yang tidak menguntungkan (Favorable-to-Total Ratio).
 *  Banding: samakan total dua peluang, lalu pilih yang lebih mungkin; peluang besar belum pasti terjadi
 *           (Comparative Probability Ratio dan Relative Likelihood Decision).
 *  Adil   : dua pemain, hitung hasil menang tiap pemain, lalu nilai adil atau kurang adil (Fair Game Equal Chance Principle).
 * Peluang hanya dipakai sebagai pasangan bilangan bulat k dari n. Dua peluang dibandingkan dengan menyamakan total:
 * k dari n menjadi (k kali faktor) dari (n kali faktor), tanpa pecahan atau desimal.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b4.mjs.
 */

const ulang = (isi: string, n: number): string[] => Array.from({ length: n }, () => isi);
const DADU = ["1", "2", "3", "4", "5", "6"];

/** Satu wadah, hasil yang menguntungkan (cocok), dan bentuk gambarnya. */
export type SoalRasio = { nama: string; wadah: string; isi: string[]; cocok: string[]; sebut: string; bentuk: "wadah" | "roda" };
/** Satu peluang: k hasil menguntungkan dari n hasil. */
export type Peluang = { sebut: string; k: number; n: number };
export type SoalBanding = { nama: string; a: Peluang; b: Peluang };
/** Permainan dua pemain: semua hasil, hasil yang membuat pemain A menang, dan pemain B menang. */
export type SoalAdil = { nama: string; wadah: string; isi: string[]; a: string[]; b: string[] };

export const SOAL_RASIO: SoalRasio[] = [
  { nama: "koin gambar", wadah: "koin dua sisi", isi: ["gambar", "angka"], cocok: ["gambar"], sebut: "sisi gambar", bentuk: "wadah" },
  { nama: "dadu angka enam", wadah: "dadu enam sisi", isi: DADU, cocok: ["6"], sebut: "angka 6", bentuk: "wadah" },
  { nama: "kotak Mantap", wadah: "kotak hadiah Mantap", isi: [...ulang("biru", 4), ...ulang("putih", 3)], cocok: ["biru"], sebut: "piring biru", bentuk: "wadah" },
  { nama: "kotak Spektakuler", wadah: "kotak hadiah Spektakuler", isi: [...ulang("biru", 3), ...ulang("putih", 4)], cocok: ["biru"], sebut: "piring biru", bentuk: "wadah" },
  { nama: "dadu genap", wadah: "dadu enam sisi", isi: DADU, cocok: ["2", "4", "6"], sebut: "angka genap", bentuk: "wadah" },
  { nama: "roda merah", wadah: "roda delapan juring", isi: [...ulang("merah", 5), ...ulang("biru", 3)], cocok: ["merah"], sebut: "juring merah", bentuk: "roda" },
];

export const SOAL_BANDING: SoalBanding[] = [
  { nama: "koin lawan dadu", a: { sebut: "koin gambar", k: 1, n: 2 }, b: { sebut: "dadu angka 6", k: 1, n: 6 } },
  { nama: "Spektakuler lawan Mantap", a: { sebut: "kotak Spektakuler", k: 3, n: 7 }, b: { sebut: "kotak Mantap", k: 4, n: 7 } },
  { nama: "SMP lawan SD", a: { sebut: "kategori SMP", k: 1, n: 35 }, b: { sebut: "kategori SD", k: 1, n: 12 } },
  { nama: "genap lawan koin", a: { sebut: "dadu genap", k: 3, n: 6 }, b: { sebut: "koin gambar", k: 1, n: 2 } },
  { nama: "tas biru lawan hijau", a: { sebut: "tas biru", k: 2, n: 5 }, b: { sebut: "tas hijau", k: 3, n: 10 } },
  { nama: "dua roda", a: { sebut: "roda merah", k: 5, n: 8 }, b: { sebut: "roda biru", k: 3, n: 4 } },
];

export const SOAL_ADIL: SoalAdil[] = [
  { nama: "ganjil lawan genap", wadah: "dadu enam sisi", isi: DADU, a: ["1", "3", "5"], b: ["2", "4", "6"] },
  { nama: "satu lawan lima", wadah: "dadu enam sisi", isi: DADU, a: ["6"], b: ["1", "2", "3", "4", "5"] },
  { nama: "kecil lawan besar", wadah: "dadu enam sisi", isi: DADU, a: ["1", "2", "3"], b: ["4", "5", "6"] },
  { nama: "empat lawan dua", wadah: "dadu enam sisi", isi: DADU, a: ["1", "2", "3", "4"], b: ["5", "6"] },
  { nama: "roda seimbang", wadah: "roda delapan juring", isi: [...ulang("merah", 4), ...ulang("biru", 4)], a: ["merah"], b: ["biru"] },
  { nama: "roda berat sebelah", wadah: "roda delapan juring", isi: [...ulang("merah", 5), ...ulang("biru", 3)], a: ["biru"], b: ["merah"] },
];

export const idRasio = (i: number): string => `rasio:${i}`;
export const idBanding = (i: number): string => `banding:${i}`;
export const idAdil = (i: number): string => `adil:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

const hitungCocok = (isi: readonly string[], cocok: readonly string[]): number => isi.filter((v) => cocok.includes(v)).length;

export const kRasio = (s: SoalRasio): number => hitungCocok(s.isi, s.cocok);
export const nRasio = (s: SoalRasio): number => s.isi.length;
export const sisaRasio = (s: SoalRasio): number => nRasio(s) - kRasio(s);

/** Total bersama paling kecil: kelipatan terkecil dari dua total. */
export const totalBersama = (s: SoalBanding): number => {
  let m = Math.max(s.a.n, s.b.n);
  while (m % s.a.n !== 0 || m % s.b.n !== 0) m += 1;
  return m;
};
/** Hasil menguntungkan sesudah total disamakan: k dikali faktor total bersama. */
export const untungA = (s: SoalBanding): number => s.a.k * (totalBersama(s) / s.a.n);
export const untungB = (s: SoalBanding): number => s.b.k * (totalBersama(s) / s.b.n);
/** Yang lebih mungkin: "a", "b", atau "sama". */
export const pemenangBanding = (s: SoalBanding): "a" | "b" | "sama" => (untungA(s) > untungB(s) ? "a" : untungA(s) < untungB(s) ? "b" : "sama");

export const menangA = (s: SoalAdil): number => hitungCocok(s.isi, s.a);
export const menangB = (s: SoalAdil): number => hitungCocok(s.isi, s.b);
/** Adil bila peluang menang tiap pemain sama: hasil menang sama banyak dari total yang sama. */
export const nilaiAdil = (s: SoalAdil): "adil" | "a" | "b" => (menangA(s) === menangB(s) ? "adil" : menangA(s) > menangB(s) ? "a" : "b");

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

/** Hasil menguntungkan. Pengecoh: semua hasil, hasil yang tidak menguntungkan, dan satu lebih. */
export const opsiUntungRasio = (i: number): Pilih3<number> => {
  const s = SOAL_RASIO[i];
  return angka3(kRasio(s), [nRasio(s), sisaRasio(s), kRasio(s) + 1], i);
};
/** Semua hasil. Pengecoh: hanya yang menguntungkan, yang tidak menguntungkan, dan satu lebih. */
export const opsiTotalRasio = (i: number): Pilih3<number> => {
  const s = SOAL_RASIO[i];
  return angka3(nRasio(s), [kRasio(s), sisaRasio(s), nRasio(s) + 1], i + 1);
};
/** Hasil yang tidak menguntungkan. Pengecoh: yang menguntungkan, semua hasil, dan satu lebih. */
export const opsiSisaRasio = (i: number): Pilih3<number> => {
  const s = SOAL_RASIO[i];
  return angka3(sisaRasio(s), [kRasio(s), nRasio(s), sisaRasio(s) + 1], i + 2);
};

/** Total bersama paling kecil. Pengecoh: jumlah dua total, hasil kali dua total, dan total yang lebih besar. */
export const opsiTotalBanding = (i: number): Pilih3<number> => {
  const s = SOAL_BANDING[i];
  return angka3(totalBersama(s), [s.a.n + s.b.n, s.a.n * s.b.n, Math.max(s.a.n, s.b.n)], i);
};
/** Hasil menguntungkan pertama pada total bersama. Pengecoh: k semula, k kali faktor yang keliru, dan hasil kedua. */
export const opsiUntungBanding = (i: number): Pilih3<number> => {
  const s = SOAL_BANDING[i];
  const T = totalBersama(s);
  return angka3(untungA(s), [s.a.k, s.a.k * (T / s.b.n), untungB(s)], i + 1);
};
export const JAWAB_BANDING_SAMA = "Sama mungkin";
export const jawabA = (s: SoalBanding): string => `${s.a.sebut} lebih mungkin`;
export const jawabB = (s: SoalBanding): string => `${s.b.sebut} lebih mungkin`;
/** Yang lebih mungkin. Benar bergantung pada hasil menguntungkan pada total bersama. */
export const opsiPilihBanding = (i: number): Pilih3<string> => {
  const s = SOAL_BANDING[i];
  const a = jawabA(s);
  const b = jawabB(s);
  const dasar: [string, string, string] = pemenangBanding(s) === "a" ? [a, b, JAWAB_BANDING_SAMA] : pemenangBanding(s) === "b" ? [b, a, JAWAB_BANDING_SAMA] : [JAWAB_BANDING_SAMA, a, b];
  return susun3(dasar, i + 2);
};

/** Hasil menang pemain A. Pengecoh: semua hasil, hasil menang pemain B, dan satu lebih. */
export const opsiMenangA = (i: number): Pilih3<number> => {
  const s = SOAL_ADIL[i];
  return angka3(menangA(s), [s.isi.length, menangB(s), menangA(s) + 1], i);
};
/** Hasil menang pemain B. Pengecoh: semua hasil, hasil menang pemain A, dan satu lebih. */
export const opsiMenangB = (i: number): Pilih3<number> => {
  const s = SOAL_ADIL[i];
  return angka3(menangB(s), [s.isi.length, menangA(s), menangB(s) + 1], i + 1);
};
export const JAWAB_ADIL = "Adil, peluang kedua pemain sama";
export const JAWAB_UNTUNG_A = "Kurang adil, pemain A lebih diuntungkan";
export const JAWAB_UNTUNG_B = "Kurang adil, pemain B lebih diuntungkan";
/** Penilaian permainan. Benar bergantung pada hasil menang kedua pemain. */
export const opsiNilaiAdil = (i: number): Pilih3<string> => {
  const n = nilaiAdil(SOAL_ADIL[i]);
  const dasar: [string, string, string] = n === "adil" ? [JAWAB_ADIL, JAWAB_UNTUNG_A, JAWAB_UNTUNG_B] : n === "a" ? [JAWAB_UNTUNG_A, JAWAB_ADIL, JAWAB_UNTUNG_B] : [JAWAB_UNTUNG_B, JAWAB_ADIL, JAWAB_UNTUNG_A];
  return susun3(dasar, i + 2);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Rasio: 0 untung, 1 total, 2 sisa, 3 selesai. Banding: 0 total bersama, 1 untung pertama, 2 pilih, 3 selesai. Adil: 0 menang A, 1 menang B, 2 nilai, 3 selesai. */
export type StateBandingK6B4B = {
  rasio: { data: number; tahap: number };
  banding: { data: number; tahap: number };
  adil: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiBandingK6B4B =
  | { t: "R_DATA"; i: number }
  | { t: "R_UNTUNG"; o: number }
  | { t: "R_TOTAL"; o: number }
  | { t: "R_SISA"; o: number }
  | { t: "B_DATA"; i: number }
  | { t: "B_TOTAL"; o: number }
  | { t: "B_UNTUNG"; o: number }
  | { t: "B_PILIH"; o: number }
  | { t: "D_DATA"; i: number }
  | { t: "D_MENANG_A"; o: number }
  | { t: "D_MENANG_B"; o: number }
  | { t: "D_NILAI"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBandingK6B4B = (): StateBandingK6B4B => ({
  rasio: { data: 0, tahap: 0 },
  banding: { data: 0, tahap: 0 },
  adil: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalRasio = (x: StateBandingK6B4B): SoalRasio => SOAL_RASIO[x.rasio.data];
export const soalBanding = (x: StateBandingK6B4B): SoalBanding => SOAL_BANDING[x.banding.data];
export const soalAdil = (x: StateBandingK6B4B): SoalAdil => SOAL_ADIL[x.adil.data];

/* ------------------------------ Rasio ------------------------------ */

function pilihUntungRasio(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.rasio.tahap !== 0) return x;
  const i = x.rasio.data;
  const s = SOAL_RASIO[i];
  const p = opsiUntungRasio(i);
  if (o === p.benar) return { ...x, rasio: { ...x.rasio, tahap: 1 }, pesan: `✅ Hasil menguntungkan: ${s.sebut} ada ${kRasio(s)} di ${s.wadah}, dihitung satu per satu. Sekarang hitung semua hasil yang mungkin.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung hanya ${s.sebut}, satu per satu.` };
}

function pilihTotalRasio(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.rasio.tahap > 1) return x;
  const i = x.rasio.data;
  const s = SOAL_RASIO[i];
  if (x.rasio.tahap < 1) return { ...x, pesan: "Hitung dulu hasil yang menguntungkan." };
  const p = opsiTotalRasio(i);
  if (o === p.benar) return { ...x, rasio: { ...x.rasio, tahap: 2 }, pesan: `✅ Semua hasil yang mungkin ada ${nRasio(s)}. Peluangnya ${kRasio(s)} dari ${nRasio(s)}, ditulis ${kRasio(s)}/${nRasio(s)}. Sekarang cari hasil yang tidak menguntungkan.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung semua hasil di ${s.wadah}, termasuk yang tidak menguntungkan.` };
}

function pilihSisaRasio(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.rasio.tahap > 2) return x;
  const i = x.rasio.data;
  const s = SOAL_RASIO[i];
  if (x.rasio.tahap < 2) return { ...x, pesan: "Hitung dulu semua hasil yang mungkin." };
  const p = opsiSisaRasio(i);
  if (o === p.benar) {
    return {
      ...x,
      rasio: { ...x.rasio, tahap: 3 },
      pernah: catat(x.pernah, idRasio(i)),
      pesan: `✅ ${nRasio(s)} dikurangi ${kRasio(s)} sama dengan ${sisaRasio(s)} hasil yang tidak menguntungkan. Peluang ${kRasio(s)}/${nRasio(s)} bukan kepastian, karena hasil lain masih bisa muncul.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kurangi semua hasil, ${nRasio(s)}, dengan hasil yang menguntungkan, ${kRasio(s)}.` };
}

/* ------------------------------ Banding ------------------------------ */

function pilihTotalBanding(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.banding.tahap !== 0) return x;
  const i = x.banding.data;
  const s = SOAL_BANDING[i];
  const p = opsiTotalBanding(i);
  if (o === p.benar) return { ...x, banding: { ...x.banding, tahap: 1 }, pesan: `✅ Total bersama paling kecil dari ${s.a.n} dan ${s.b.n} adalah ${totalBersama(s)}: ${totalBersama(s)} habis dibagi ${s.a.n} dan ${s.b.n}. Sekarang samakan peluang pertama pada total itu.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Cari bilangan terkecil yang habis dibagi ${s.a.n} dan ${s.b.n}.` };
}

function pilihUntungBanding(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.banding.tahap > 1) return x;
  const i = x.banding.data;
  const s = SOAL_BANDING[i];
  if (x.banding.tahap < 1) return { ...x, pesan: "Cari dulu total bersama." };
  const p = opsiUntungBanding(i);
  if (o === p.benar) {
    const f = totalBersama(s) / s.a.n;
    return { ...x, banding: { ...x.banding, tahap: 2 }, pesan: `✅ ${s.a.k} dari ${s.a.n} sama dengan ${untungA(s)} dari ${totalBersama(s)}, karena ${s.a.k} × ${f} = ${untungA(s)}. Sekarang samakan yang kedua dan pilih.` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Kalikan ${s.a.k} dengan faktor yang mengubah ${s.a.n} menjadi ${totalBersama(s)}.` };
}

function pilihPilihBanding(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.banding.tahap > 2) return x;
  const i = x.banding.data;
  const s = SOAL_BANDING[i];
  if (x.banding.tahap < 2) return { ...x, pesan: "Samakan dulu total dan hitung hasil menguntungkan pertama." };
  const p = opsiPilihBanding(i);
  if (o === p.benar) {
    const T = totalBersama(s);
    const w = pemenangBanding(s);
    const ringkas = `Pada total ${T}: ${s.a.sebut} ${untungA(s)}, ${s.b.sebut} ${untungB(s)}.`;
    const unggul = w === "a" ? s.a : s.b;
    const akhir = w === "sama" ? "Hasilnya sama, jadi keduanya sama mungkin." : `${w === "a" ? jawabA(s) : jawabB(s)}, tetapi belum pasti: ${unggul.k} dari ${unggul.n} berarti ${unggul.n - unggul.k} hasil lain masih bisa muncul.`;
    return { ...x, banding: { ...x.banding, tahap: 3 }, pernah: catat(x.pernah, idBanding(i)), pesan: `✅ ${ringkas} ${akhir.charAt(0).toUpperCase()}${akhir.slice(1)}` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Bila total sudah sama, yang hasil menguntungkannya lebih banyak lebih mungkin.` };
}

/* ------------------------------ Adil ------------------------------ */

function pilihMenangA(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.adil.tahap !== 0) return x;
  const i = x.adil.data;
  const s = SOAL_ADIL[i];
  const p = opsiMenangA(i);
  if (o === p.benar) return { ...x, adil: { ...x.adil, tahap: 1 }, pesan: `✅ Pemain A menang pada ${menangA(s)} dari ${s.isi.length} hasil. Sekarang hitung hasil menang pemain B.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung hasil yang membuat pemain A menang, satu per satu.` };
}

function pilihMenangB(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.adil.tahap > 1) return x;
  const i = x.adil.data;
  const s = SOAL_ADIL[i];
  if (x.adil.tahap < 1) return { ...x, pesan: "Hitung dulu hasil menang pemain A." };
  const p = opsiMenangB(i);
  if (o === p.benar) return { ...x, adil: { ...x.adil, tahap: 2 }, pesan: `✅ Pemain B menang pada ${menangB(s)} dari ${s.isi.length} hasil. Sekarang nilai permainannya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung hasil yang membuat pemain B menang, satu per satu.` };
}

function pilihNilaiAdil(x: StateBandingK6B4B, o: number): StateBandingK6B4B {
  if (!sah(o, 3) || x.adil.tahap > 2) return x;
  const i = x.adil.data;
  const s = SOAL_ADIL[i];
  if (x.adil.tahap < 2) return { ...x, pesan: "Hitung dulu hasil menang kedua pemain." };
  const p = opsiNilaiAdil(i);
  if (o === p.benar) {
    const n = nilaiAdil(s);
    const akhir = n === "adil" ? "Peluang sama, jadi permainan adil." : `Peluang tidak sama, jadi kurang adil dan pemain ${n === "a" ? "A" : "B"} lebih diuntungkan.`;
    return { ...x, adil: { ...x.adil, tahap: 3 }, pernah: catat(x.pernah, idAdil(i)), pesan: `✅ Pemain A ${menangA(s)} dari ${s.isi.length}, pemain B ${menangB(s)} dari ${s.isi.length}. ${akhir}` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Permainan adil bila hasil menang kedua pemain sama banyak dari total yang sama.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahBandingK6B4B(x: StateBandingK6B4B, a: AksiBandingK6B4B): StateBandingK6B4B {
  switch (a.t) {
    case "R_DATA":
      return sah(a.i, SOAL_RASIO.length) ? { ...x, rasio: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "R_UNTUNG":
      return pilihUntungRasio(x, a.o);
    case "R_TOTAL":
      return pilihTotalRasio(x, a.o);
    case "R_SISA":
      return pilihSisaRasio(x, a.o);
    case "B_DATA":
      return sah(a.i, SOAL_BANDING.length) ? { ...x, banding: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "B_TOTAL":
      return pilihTotalBanding(x, a.o);
    case "B_UNTUNG":
      return pilihUntungBanding(x, a.o);
    case "B_PILIH":
      return pilihPilihBanding(x, a.o);
    case "D_DATA":
      return sah(a.i, SOAL_ADIL.length) ? { ...x, adil: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "D_MENANG_A":
      return pilihMenangA(x, a.o);
    case "D_MENANG_B":
      return pilihMenangB(x, a.o);
    case "D_NILAI":
      return pilihNilaiAdil(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBandingK6B4B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBandingK6B4B = { alat: "banding"; pernah: string[] };
export const keadaanBandingK6B4B = (x: StateBandingK6B4B): KeadaanBandingK6B4B => ({ alat: "banding", pernah: x.pernah });

export const ucapRasioK6B4B = (x: StateBandingK6B4B): string => {
  const s = soalRasio(x);
  return `Soal ${s.nama}: ${s.wadah}. Hitung hasil menguntungkan, semua hasil, dan hasil yang tidak menguntungkan.`;
};
export const ucapBandingK6B4B = (x: StateBandingK6B4B): string => {
  const s = soalBanding(x);
  return `Soal ${s.nama}: ${s.a.sebut}, ${s.a.k} dari ${s.a.n}, dan ${s.b.sebut}, ${s.b.k} dari ${s.b.n}. Samakan total, lalu pilih yang lebih mungkin.`;
};
export const ucapAdilK6B4B = (x: StateBandingK6B4B): string => {
  const s = soalAdil(x);
  return `Soal ${s.nama}: ${s.wadah}. Hitung hasil menang pemain A dan pemain B, lalu nilai apakah permainan adil.`;
};
