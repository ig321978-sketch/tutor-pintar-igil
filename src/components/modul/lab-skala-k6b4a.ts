/**
 * Lab Skala (Kelas 6 Bab 4, Sub-Bab A: Skala Peluang): logika murni. Satu alat, tiga tampilan.
 *  Tangga    : hitung kejadian yang cocok dan semua yang ada, lalu tempatkan di lima tangga (Likelihood Spectrum Scale).
 *  Ujung     : ujung kiri tidak mungkin dan ujung kanan pasti: berapa bola diganti agar sampai ke ujung (Impossible-Certain Continuum).
 *  Percobaan : prediksi dari roda, catat hasil putaran, lalu cocokkan catatan dengan prediksi (Experimental Relative Frequency).
 * Peluang hanya dipakai sebagai pasangan bilangan bulat: k kejadian yang cocok dari n yang ada. Aturan tangga:
 *  k = 0 tidak mungkin; k = n pasti; dua kali k kurang dari n kurang mungkin; dua kali k sama dengan n mungkin; selebihnya sangat mungkin.
 * Tidak membahas permainan, adil, atau membandingkan dua peluang (Sub-Bab B).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b4.mjs.
 */

export const TANGGA = ["Tidak mungkin", "Kurang mungkin", "Mungkin", "Sangat mungkin", "Pasti"] as const;

const ulang = (isi: string, n: number): string[] => Array.from({ length: n }, () => isi);
const RAK = [...ulang("putih", 3), ...ulang("merah", 6), ...ulang("kuning", 1)];

/** Satu wadah (rak, dadu, koin) dan kejadian yang dicari: target. */
export type SoalTangga = { nama: string; wadah: string; isi: string[]; target: string; sebut: string };
/** Tas berisi n bola: k bola merah, selebihnya biru. */
export type SoalUjung = { nama: string; n: number; k: number };
/** Roda putar bergambar tiap juring, kejadian yang dicari, dan catatan hasil putaran. */
export type SoalPercobaan = { nama: string; juring: string[]; target: string; catatan: string[] };

export const SOAL_TANGGA: SoalTangga[] = [
  { nama: "buku merah", wadah: "rak buku Dhien", isi: RAK, target: "merah", sebut: "buku merah" },
  { nama: "buku kuning", wadah: "rak buku Dhien", isi: RAK, target: "kuning", sebut: "buku kuning" },
  { nama: "buku hijau", wadah: "rak buku Dhien", isi: RAK, target: "hijau", sebut: "buku hijau" },
  { nama: "dadu angka lima", wadah: "dadu delapan sisi yang semua sisinya angka lima", isi: ulang("5", 8), target: "5", sebut: "sisi angka 5" },
  { nama: "koin gambar", wadah: "koin dua sisi", isi: ["gambar", "angka"], target: "gambar", sebut: "sisi gambar" },
  { nama: "buku putih", wadah: "rak buku Dhien", isi: RAK, target: "putih", sebut: "buku putih" },
];

export const SOAL_UJUNG: SoalUjung[] = [
  { nama: "tas pesta", n: 10, k: 4 },
  { nama: "tas sekolah", n: 10, k: 6 },
  { nama: "tas mainan", n: 8, k: 1 },
  { nama: "tas hadiah", n: 12, k: 9 },
  { nama: "tas piknik", n: 10, k: 5 },
  { nama: "tas pasar", n: 9, k: 7 },
];

const RODA_MERAH = [...ulang("merah", 6), ...ulang("biru", 2)];
const RODA_KUNING = [...ulang("kuning", 1), ...ulang("hijau", 7)];
const RODA_SEIMBANG = [...ulang("merah", 4), ...ulang("biru", 4)];
const RODA_TANPA_HIJAU = [...ulang("merah", 5), ...ulang("biru", 3)];
const RODA_BIRU = [...ulang("biru", 1), ...ulang("merah", 7)];

export const SOAL_PERCOBAAN: SoalPercobaan[] = [
  { nama: "roda merah", juring: RODA_MERAH, target: "merah", catatan: ["merah", "merah", "biru", "merah", "merah", "merah", "biru", "merah", "merah", "biru"] },
  { nama: "roda kuning pendek", juring: RODA_KUNING, target: "kuning", catatan: ["hijau", "kuning", "hijau", "kuning"] },
  {
    nama: "roda kuning panjang",
    juring: RODA_KUNING,
    target: "kuning",
    catatan: ["hijau", "hijau", "hijau", "kuning", "hijau", "hijau", "hijau", "hijau", "hijau", "hijau", "kuning", "hijau", "hijau", "hijau", "hijau", "hijau", "hijau", "hijau", "kuning", "hijau"],
  },
  { nama: "roda seimbang", juring: RODA_SEIMBANG, target: "merah", catatan: ["merah", "merah", "biru", "merah", "merah", "biru", "merah", "merah", "biru", "merah"] },
  { nama: "roda tanpa hijau", juring: RODA_TANPA_HIJAU, target: "hijau", catatan: ["merah", "biru", "merah", "merah", "biru", "merah"] },
  { nama: "roda biru langka", juring: RODA_BIRU, target: "biru", catatan: ["biru", "biru", "merah", "biru", "merah", "biru"] },
];

export const idTangga = (i: number): string => `tangga:${i}`;
export const idUjung = (i: number): string => `ujung:${i}`;
export const idPercobaan = (i: number): string => `percobaan:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

/** Kejadian yang cocok (k) dan semua yang ada (n). */
export const cocok = (isi: readonly string[], target: string): number => isi.filter((v) => v === target).length;
/** Nomor tangga 0 sampai 4 untuk k dari n (n lebih dari nol). */
export const nomorTangga = (k: number, n: number): number => (k === 0 ? 0 : k === n ? 4 : 2 * k < n ? 1 : 2 * k === n ? 2 : 3);
export const namaTangga = (k: number, n: number): string => TANGGA[nomorTangga(k, n)];

export const kTangga = (s: SoalTangga): number => cocok(s.isi, s.target);
export const nTangga = (s: SoalTangga): number => s.isi.length;
export const tanggaTangga = (s: SoalTangga): string => namaTangga(kTangga(s), nTangga(s));

export const tanggaUjung = (s: SoalUjung): string => namaTangga(s.k, s.n);
/** Bola biru yang harus diganti merah agar merah pasti. */
export const gantiPasti = (s: SoalUjung): number => s.n - s.k;
/** Bola merah yang harus dikeluarkan (diganti biru) agar merah tidak mungkin. */
export const gantiTidak = (s: SoalUjung): number => s.k;

export const kJuring = (s: SoalPercobaan): number => cocok(s.juring, s.target);
export const tanggaPrediksi = (s: SoalPercobaan): string => namaTangga(kJuring(s), s.juring.length);
export const kCatatan = (s: SoalPercobaan): number => cocok(s.catatan, s.target);
export const nCatatan = (s: SoalPercobaan): number => s.catatan.length;
export const tanggaCatatan = (s: SoalPercobaan): string => namaTangga(kCatatan(s), nCatatan(s));
/** Selisih nomor tangga catatan dan prediksi, tanpa tanda. */
export const selisihTangga = (s: SoalPercobaan): number => Math.abs(nomorTangga(kCatatan(s), nCatatan(s)) - nomorTangga(kJuring(s), s.juring.length));

/** Bola tas: k merah lalu biru. Untuk gambar. */
export const isiUjung = (s: SoalUjung): string[] => [...ulang("merah", s.k), ...ulang("biru", s.n - s.k)];

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
/** Tangga yang benar dan dua tangga tetangganya: kesalahan khas menggeser satu tangga. */
export const tangga3 = (nomor: number, r: number): Pilih3<string> => {
  const calon = [nomor - 1, nomor + 1, nomor - 2, nomor + 2].filter((v) => v >= 0 && v <= 4);
  return susun3([TANGGA[nomor], TANGGA[calon[0]], TANGGA[calon[1]]], r);
};

/** Kejadian yang cocok. Pengecoh: semua yang ada, yang tidak cocok, dan satu lebih. */
export const opsiKTangga = (i: number): Pilih3<number> => {
  const s = SOAL_TANGGA[i];
  return angka3(kTangga(s), [nTangga(s), nTangga(s) - kTangga(s), kTangga(s) + 1], i);
};
/** Semua yang ada. Pengecoh: hanya yang cocok, hanya yang tidak cocok, dan satu lebih. */
export const opsiNTangga = (i: number): Pilih3<number> => {
  const s = SOAL_TANGGA[i];
  return angka3(nTangga(s), [kTangga(s), nTangga(s) - kTangga(s), nTangga(s) + 1], i + 1);
};
export const opsiTanggaTangga = (i: number): Pilih3<string> => tangga3(nomorTangga(kTangga(SOAL_TANGGA[i]), nTangga(SOAL_TANGGA[i])), i + 2);

export const opsiTanggaUjung = (i: number): Pilih3<string> => tangga3(nomorTangga(SOAL_UJUNG[i].k, SOAL_UJUNG[i].n), i);
/** Bola yang diganti agar pasti. Pengecoh: bola merah yang sudah ada, semua bola, dan satu lebih. */
export const opsiPasti = (i: number): Pilih3<number> => {
  const s = SOAL_UJUNG[i];
  return angka3(gantiPasti(s), [s.k, s.n, gantiPasti(s) + 1], i + 1);
};
/** Bola merah yang dikeluarkan agar tidak mungkin. Pengecoh: bola biru, semua bola, dan satu lebih. */
export const opsiTidak = (i: number): Pilih3<number> => {
  const s = SOAL_UJUNG[i];
  return angka3(gantiTidak(s), [s.n - s.k, s.n, gantiTidak(s) + 1], i + 2);
};

export const opsiPrediksi = (i: number): Pilih3<string> => tangga3(nomorTangga(kJuring(SOAL_PERCOBAAN[i]), SOAL_PERCOBAAN[i].juring.length), i);
/** Kejadian pada catatan. Pengecoh: banyak putaran, putaran yang bukan kejadian, dan satu lebih. */
export const opsiCatat = (i: number): Pilih3<number> => {
  const s = SOAL_PERCOBAAN[i];
  return angka3(kCatatan(s), [nCatatan(s), nCatatan(s) - kCatatan(s), kCatatan(s) + 1], i + 1);
};
export const JAWAB_SAMA = "Sama dengan prediksi";
export const JAWAB_SATU = "Beda satu tangga dari prediksi";
export const JAWAB_BANYAK = "Beda lebih dari satu tangga dari prediksi";
/** Kecocokan catatan dengan prediksi. Benar bergantung pada selisih tangga. */
export const opsiCocok = (i: number): Pilih3<string> => {
  const d = selisihTangga(SOAL_PERCOBAAN[i]);
  const dasar: [string, string, string] = d === 0 ? [JAWAB_SAMA, JAWAB_SATU, JAWAB_BANYAK] : d === 1 ? [JAWAB_SATU, JAWAB_SAMA, JAWAB_BANYAK] : [JAWAB_BANYAK, JAWAB_SAMA, JAWAB_SATU];
  return susun3(dasar, i + 2);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Tangga: 0 kejadian, 1 semua, 2 tangga, 3 selesai. Ujung: 0 tangga, 1 ganti pasti, 2 keluar tidak, 3 selesai. Percobaan: 0 prediksi, 1 catat, 2 cocokkan, 3 selesai. */
export type StateSkalaK6B4A = {
  tangga: { data: number; tahap: number };
  ujung: { data: number; tahap: number };
  percobaan: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiSkalaK6B4A =
  | { t: "T_DATA"; i: number }
  | { t: "T_K"; o: number }
  | { t: "T_N"; o: number }
  | { t: "T_TANGGA"; o: number }
  | { t: "U_DATA"; i: number }
  | { t: "U_TANGGA"; o: number }
  | { t: "U_PASTI"; o: number }
  | { t: "U_TIDAK"; o: number }
  | { t: "C_DATA"; i: number }
  | { t: "C_PREDIKSI"; o: number }
  | { t: "C_CATAT"; o: number }
  | { t: "C_COCOK"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSkalaK6B4A = (): StateSkalaK6B4A => ({
  tangga: { data: 0, tahap: 0 },
  ujung: { data: 0, tahap: 0 },
  percobaan: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalTangga = (x: StateSkalaK6B4A): SoalTangga => SOAL_TANGGA[x.tangga.data];
export const soalUjung = (x: StateSkalaK6B4A): SoalUjung => SOAL_UJUNG[x.ujung.data];
export const soalPercobaan = (x: StateSkalaK6B4A): SoalPercobaan => SOAL_PERCOBAAN[x.percobaan.data];

/* ------------------------------ Tangga ------------------------------ */

function pilihKTangga(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.tangga.tahap !== 0) return x;
  const i = x.tangga.data;
  const s = SOAL_TANGGA[i];
  const p = opsiKTangga(i);
  if (o === p.benar) return { ...x, tangga: { ...x.tangga, tahap: 1 }, pesan: `✅ ${s.sebut} ada ${kTangga(s)} di ${s.wadah}, dihitung satu per satu. Sekarang hitung semua yang ada.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung hanya ${s.sebut}, satu per satu.` };
}

function pilihNTangga(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.tangga.tahap > 1) return x;
  const i = x.tangga.data;
  const s = SOAL_TANGGA[i];
  if (x.tangga.tahap < 1) return { ...x, pesan: "Hitung dulu yang cocok dengan kejadiannya." };
  const p = opsiNTangga(i);
  if (o === p.benar) return { ...x, tangga: { ...x.tangga, tahap: 2 }, pesan: `✅ Semuanya ada ${nTangga(s)}. Jadi ${kTangga(s)} dari ${nTangga(s)}. Sekarang tempatkan di tangga.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung semua yang ada di ${s.wadah}, apa pun warnanya.` };
}

function pilihTanggaTangga(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.tangga.tahap > 2) return x;
  const i = x.tangga.data;
  const s = SOAL_TANGGA[i];
  if (x.tangga.tahap < 2) return { ...x, pesan: "Hitung dulu yang cocok dan semua yang ada." };
  const p = opsiTanggaTangga(i);
  if (o === p.benar) {
    const k = kTangga(s);
    const n = nTangga(s);
    const alasan = k === 0 ? "tidak ada satu pun, jadi ujung kiri" : k === n ? "semuanya cocok, jadi ujung kanan" : `dua kali ${k} sama dengan ${2 * k}, ${2 * k < n ? "kurang dari" : 2 * k === n ? "sama dengan" : "lebih dari"} ${n}`;
    return { ...x, tangga: { ...x.tangga, tahap: 3 }, pernah: catat(x.pernah, idTangga(i)), pesan: `✅ ${k} dari ${n}: ${alasan}. Letaknya ${TANGGA[nomorTangga(k, n)].toLowerCase()}.` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Pakai dua kali yang cocok, lalu lihat kurang dari, sama dengan, atau lebih dari semua yang ada.` };
}

/* ------------------------------ Ujung ------------------------------ */

function pilihTanggaUjung(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.ujung.tahap !== 0) return x;
  const i = x.ujung.data;
  const s = SOAL_UJUNG[i];
  const p = opsiTanggaUjung(i);
  if (o === p.benar) return { ...x, ujung: { ...x.ujung, tahap: 1 }, pesan: `✅ ${s.k} merah dari ${s.n} bola: ${tanggaUjung(s).toLowerCase()}. Sekarang geser ke ujung kanan.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Tulis dulu ${s.k} dari ${s.n}, lalu tempatkan di tangga.` };
}

function pilihPasti(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.ujung.tahap > 1) return x;
  const i = x.ujung.data;
  const s = SOAL_UJUNG[i];
  if (x.ujung.tahap < 1) return { ...x, pesan: "Tempatkan dulu tas itu di tangga." };
  const p = opsiPasti(i);
  if (o === p.benar) return { ...x, ujung: { ...x.ujung, tahap: 2 }, pesan: `✅ Ganti ${gantiPasti(s)} bola biru menjadi merah, maka ${s.n} dari ${s.n} bola merah: pasti. Sekarang geser ke ujung kiri.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Agar pasti, semua ${s.n} bola harus merah. Berapa bola yang belum merah?` };
}

function pilihTidak(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.ujung.tahap > 2) return x;
  const i = x.ujung.data;
  const s = SOAL_UJUNG[i];
  if (x.ujung.tahap < 2) return { ...x, pesan: "Cari dulu bola yang diganti agar pasti." };
  const p = opsiTidak(i);
  if (o === p.benar) {
    return {
      ...x,
      ujung: { ...x.ujung, tahap: 3 },
      pernah: catat(x.pernah, idUjung(i)),
      pesan: `✅ Keluarkan ${gantiTidak(s)} bola merah, maka 0 dari ${s.n} bola merah: tidak mungkin. Dua ujung tangga: nol atau semuanya.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Agar tidak mungkin, tidak boleh ada bola merah. Berapa yang harus dikeluarkan?` };
}

/* ------------------------------ Percobaan ------------------------------ */

function pilihPrediksi(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.percobaan.tahap !== 0) return x;
  const i = x.percobaan.data;
  const s = SOAL_PERCOBAAN[i];
  const p = opsiPrediksi(i);
  if (o === p.benar) return { ...x, percobaan: { ...x.percobaan, tahap: 1 }, pesan: `✅ Roda punya ${kJuring(s)} juring ${s.target} dari ${s.juring.length}: ${tanggaPrediksi(s).toLowerCase()}. Itu prediksi sebelum memutar. Sekarang catat hasil putaran.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung juring ${s.target} dari semua juring, lalu tempatkan di tangga.` };
}

function pilihCatat(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.percobaan.tahap > 1) return x;
  const i = x.percobaan.data;
  const s = SOAL_PERCOBAAN[i];
  if (x.percobaan.tahap < 1) return { ...x, pesan: "Buat dulu prediksi dari roda." };
  const p = opsiCatat(i);
  if (o === p.benar) return { ...x, percobaan: { ...x.percobaan, tahap: 2 }, pesan: `✅ Dari ${nCatatan(s)} putaran, ${s.target} muncul ${kCatatan(s)} kali. Sekarang cocokkan dengan prediksi.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung putaran yang hasilnya ${s.target}, satu per satu dari catatan.` };
}

function pilihCocok(x: StateSkalaK6B4A, o: number): StateSkalaK6B4A {
  if (!sah(o, 3) || x.percobaan.tahap > 2) return x;
  const i = x.percobaan.data;
  const s = SOAL_PERCOBAAN[i];
  if (x.percobaan.tahap < 2) return { ...x, pesan: "Catat dulu hasil putarannya." };
  const p = opsiCocok(i);
  if (o === p.benar) {
    const d = selisihTangga(s);
    const ringkas = `${kCatatan(s)} dari ${nCatatan(s)} putaran: ${tanggaCatatan(s).toLowerCase()}, sedangkan prediksi ${tanggaPrediksi(s).toLowerCase()}.`;
    const nasihat = d === 0 ? "Catatan cocok dengan prediksi." : nCatatan(s) < 10 ? "Putaran masih sedikit, hasilnya bisa menyimpang. Putar lebih banyak lagi." : "Hasil percobaan bisa sedikit menyimpang dari prediksi.";
    return { ...x, percobaan: { ...x.percobaan, tahap: 3 }, pernah: catat(x.pernah, idPercobaan(i)), pesan: `✅ ${ringkas} ${nasihat}` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Tempatkan catatan di tangga, lalu hitung selisih nomor tangganya dengan prediksi.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahSkalaK6B4A(x: StateSkalaK6B4A, a: AksiSkalaK6B4A): StateSkalaK6B4A {
  switch (a.t) {
    case "T_DATA":
      return sah(a.i, SOAL_TANGGA.length) ? { ...x, tangga: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "T_K":
      return pilihKTangga(x, a.o);
    case "T_N":
      return pilihNTangga(x, a.o);
    case "T_TANGGA":
      return pilihTanggaTangga(x, a.o);
    case "U_DATA":
      return sah(a.i, SOAL_UJUNG.length) ? { ...x, ujung: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "U_TANGGA":
      return pilihTanggaUjung(x, a.o);
    case "U_PASTI":
      return pilihPasti(x, a.o);
    case "U_TIDAK":
      return pilihTidak(x, a.o);
    case "C_DATA":
      return sah(a.i, SOAL_PERCOBAAN.length) ? { ...x, percobaan: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "C_PREDIKSI":
      return pilihPrediksi(x, a.o);
    case "C_CATAT":
      return pilihCatat(x, a.o);
    case "C_COCOK":
      return pilihCocok(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSkalaK6B4A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSkalaK6B4A = { alat: "skala"; pernah: string[] };
export const keadaanSkalaK6B4A = (x: StateSkalaK6B4A): KeadaanSkalaK6B4A => ({ alat: "skala", pernah: x.pernah });

export const ucapTanggaK6B4A = (x: StateSkalaK6B4A): string => {
  const s = soalTangga(x);
  return `Soal ${s.nama}: ${s.wadah}. Hitung ${s.sebut} dan semua yang ada, lalu tempatkan di lima tangga.`;
};
export const ucapUjungK6B4A = (x: StateSkalaK6B4A): string => {
  const s = soalUjung(x);
  return `Soal ${s.nama}: ${s.n} bola, ${s.k} bola merah. Tempatkan di tangga, lalu cari bola yang diganti agar sampai ke ujung kanan dan ujung kiri.`;
};
export const ucapPercobaanK6B4A = (x: StateSkalaK6B4A): string => {
  const s = soalPercobaan(x);
  return `Soal ${s.nama}: roda ${s.juring.length} juring, ${nCatatan(s)} putaran dicatat. Buat prediksi, hitung catatan, lalu cocokkan.`;
};
