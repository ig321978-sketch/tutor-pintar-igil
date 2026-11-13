/**
 * Lab Tampak (Kelas 6 Bab 3, Sub-Bab B: Visualisasi Spasial): logika murni. Satu alat, tiga tampilan.
 *  Matriks : catat tinggi tiap petak alas baris demi baris, lalu hitung seluruh kubus (Height-Matrix Silhouette).
 *  Tampak  : dari depan tiap kolom menampilkan tinggi terbesar, dari samping tiap baris (Occlusion Max Rule).
 *  Atas    : dari atas hanya petak terisi yang terlihat, tinggi tidak; lalu cocokkan tiga tampak (Orthographic Projection Protocol).
 * Baris matriks: baris pertama paling depan. Kolom pertama paling kiri. Tinggi 0 berarti petak kosong.
 * Tidak membahas letak di petak berhuruf, jarak, dan jalur (Sub-Bab C).
 * Semua hitungan memakai bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b3.mjs.
 */

export type Matriks = number[][];
/** Satu kubus satuan: [kolom, baris, lantai]. */
export type KubusM = [number, number, number];

export type SoalMatriks = { nama: string; m: Matriks };
export type SoalTampak = { nama: string; m: Matriks; arah: "depan" | "samping" };
/** `calon[0]` adalah susunan yang benar; dua lainnya cocok pada dua dari tiga tampak. */
export type SoalAtas = { nama: string; m: Matriks; calon: [Matriks, Matriks, Matriks] };

export const SOAL_MATRIKS: SoalMatriks[] = [
  { nama: "contoh Anike", m: [[2, 1], [3, 4]] },
  { nama: "menara kecil", m: [[1, 3], [2, 1]] },
  { nama: "empat sama", m: [[2, 2], [2, 2]] },
  { nama: "ada petak kosong", m: [[2, 0], [2, 2]] },
  { nama: "depan tinggi", m: [[3, 1], [1, 2]] },
  { nama: "belakang tinggi", m: [[1, 2], [4, 1]] },
];

export const SOAL_TAMPAK: SoalTampak[] = [
  { nama: "depan satu dan tiga", m: [[1, 2], [3, 1]], arah: "depan" },
  { nama: "depan dua sama", m: [[2, 2], [1, 2]], arah: "depan" },
  { nama: "depan contoh Anike", m: [[2, 1], [3, 4]], arah: "depan" },
  { nama: "samping dua sama", m: [[2, 1], [1, 2]], arah: "samping" },
  { nama: "samping menara kecil", m: [[1, 3], [2, 1]], arah: "samping" },
  { nama: "samping contoh Anike", m: [[2, 1], [3, 4]], arah: "samping" },
];

export const SOAL_ATAS: SoalAtas[] = [
  { nama: "empat ditumpuk", m: [[4]], calon: [[[4]], [[1, 2], [2, 1]], [[0, 2], [2, 0]]] },
  { nama: "ada petak kosong", m: [[2, 0], [2, 2]], calon: [[[2, 0], [2, 2]], [[0, 1], [2, 3]], [[0, 2], [2, 0]]] },
  { nama: "menara kecil", m: [[1, 3], [2, 1]], calon: [[[1, 3], [2, 1]], [[1, 1], [2, 4]], [[1, 2], [1, 4]]] },
  { nama: "contoh Anike", m: [[2, 1], [3, 4]], calon: [[[2, 1], [3, 4]], [[1, 1], [3, 4]], [[0, 2], [3, 4]]] },
  { nama: "belakang kosong", m: [[3, 1], [0, 2]], calon: [[[3, 1], [0, 2]], [[0, 1], [3, 4]], [[0, 1], [4, 0]]] },
  { nama: "silang", m: [[1, 2], [2, 1]], calon: [[[1, 2], [2, 1]], [[1, 1], [2, 2]], [[0, 1], [3, 0]]] },
];

export const idMatriks = (i: number): string => `matriks:${i}`;
export const idTampak = (i: number): string => `tampak:${i}`;
export const idAtas = (i: number): string => `atas:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

const jumlah = (a: number[]): number => a.reduce((s, v) => s + v, 0);
const terbesar = (a: number[]): number => a.reduce((s, v) => (v > s ? v : s), 0);
const terkecil = (a: number[]): number => a.reduce((s, v) => (v < s ? v : s), a[0]);

export const totalM = (m: Matriks): number => jumlah(m.map(jumlah));
export const kolomM = (m: Matriks, c: number): number[] => m.map((b) => b[c] ?? 0);
export const banyakKolom = (m: Matriks): number => terbesar(m.map((b) => b.length));
/** Tinggi terbesar tiap kolom, dilihat dari depan. */
export const maksKolom = (m: Matriks): number[] => Array.from({ length: banyakKolom(m) }, (_, c) => terbesar(kolomM(m, c)));
/** Tinggi terbesar tiap baris, dilihat dari samping. */
export const maksBaris = (m: Matriks): number[] => m.map(terbesar);
export const tampakDepan = (m: Matriks): number => jumlah(maksKolom(m));
export const tampakSamping = (m: Matriks): number => jumlah(maksBaris(m));
export const tampakAtas = (m: Matriks): number => jumlah(m.map((b) => b.filter((h) => h > 0).length));
/** Tiga tampak sebagai bilangan: depan, samping, atas. */
export const tigaTampak = (m: Matriks): [number, number, number] => [tampakDepan(m), tampakSamping(m), tampakAtas(m)];
/** Semua kubus satuan sebuah matriks, dari lantai dasar ke atas. */
export const kubusMatriks = (m: Matriks): KubusM[] => m.flatMap((b, r) => b.flatMap((h, c) => Array.from({ length: h }, (_, z): KubusM => [c, r, z])));

const NAMA_BARIS = ["depan", "belakang"];
export const teksBaris = (m: Matriks, r: number): string => m[r].join(" dan ");
/** Matriks dalam kata: baris depan dulu. Contoh "depan 2 dan 1, belakang 3 dan 4". */
export const teksMatriks = (m: Matriks): string => m.map((_, r) => `${NAMA_BARIS[r]} ${teksBaris(m, r)}`).join(", ");
export const teksTiga = (m: Matriks): string => {
  const [d, s, a] = tigaTampak(m);
  return `tampak depan ${d} petak, tampak samping ${s} petak, tampak atas ${a} petak`;
};

/** Dua pengecoh bilangan: berbeda dari jawaban dan satu sama lain, tidak negatif; cadangan di sekitar jawaban. */
export const pengecohAngka = (benar: number, calon: number[]): [number, number] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return [hasil[0], hasil[1]];
};
/** Dua pengecoh pasangan tinggi: berbeda dari jawaban dan satu sama lain; cadangan menambah tinggi. */
export const pengecohPasang = (benar: number[], calon: number[][]): [string, string] => {
  const kunci = benar.join(" dan ");
  const hasil: string[] = [];
  const cadangan = [[benar[0] + 1, benar[1]], [benar[0], benar[1] + 1], [benar[0] + 2, benar[1]], [benar[0], benar[1] + 2]];
  for (const c of [...calon, ...cadangan]) {
    const t = c.join(" dan ");
    if (t !== kunci && !hasil.includes(t)) hasil.push(t);
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
const pasang3 = (benar: number[], calon: number[][], r: number): Pilih3<string> => {
  const [p, q] = pengecohPasang(benar, calon);
  return susun3([benar.join(" dan "), p, q], r);
};

/** Baris depan. Pengecoh: urutan terbalik, dan satu petak lebih tinggi. */
export const opsiDepanM = (i: number): Pilih3<string> => {
  const b = SOAL_MATRIKS[i].m[0];
  return pasang3(b, [[...b].reverse(), [b[0] + 1, b[1]]], i);
};
/** Baris belakang. Pengecoh: urutan terbalik, dan satu petak lebih tinggi. */
export const opsiBelakangM = (i: number): Pilih3<string> => {
  const b = SOAL_MATRIKS[i].m[1];
  return pasang3(b, [[...b].reverse(), [b[0], b[1] + 1]], i + 1);
};
/** Seluruh kubus. Pengecoh: baris depan saja, baris belakang saja, dan satu lebih. */
export const opsiTotalM = (i: number): Pilih3<number> => {
  const m = SOAL_MATRIKS[i].m;
  return angka3(totalM(m), [jumlah(m[0]), jumlah(m[1]), totalM(m) + 1], i + 2);
};

/** Garis yang diambil terbesarnya: kolom untuk tampak depan, baris untuk tampak samping. */
export const garisTampak = (s: SoalTampak, k: number): number[] => (s.arah === "depan" ? kolomM(s.m, k) : s.m[k]);
export const namaGaris = (s: SoalTampak, k: number): string => (s.arah === "depan" ? (k === 0 ? "kiri" : "kanan") : k === 0 ? "depan" : "belakang");
export const kunciTampak = (s: SoalTampak): number => (s.arah === "depan" ? tampakDepan(s.m) : tampakSamping(s.m));
const kunciLain = (s: SoalTampak): number => (s.arah === "depan" ? tampakSamping(s.m) : tampakDepan(s.m));
/** Tinggi terbesar satu garis. Pengecoh: jumlah mentah, dan yang terkecil. */
export const opsiGaris = (i: number, k: number): Pilih3<number> => {
  const g = garisTampak(SOAL_TAMPAK[i], k);
  return angka3(terbesar(g), [jumlah(g), terkecil(g), g[0]], i + k);
};
/** Jumlah petak tampak. Pengecoh: jumlah semua tinggi, tampak dari arah lain, dan jumlah yang terkecil. */
export const opsiJumlahTampak = (i: number): Pilih3<number> => {
  const s = SOAL_TAMPAK[i];
  const kecil = jumlah(Array.from({ length: 2 }, (_, k) => terkecil(garisTampak(s, k))));
  return angka3(kunciTampak(s), [totalM(s.m), kunciLain(s), kecil], i + 2);
};

/** Tampak atas. Pengecoh: seluruh kubus, dan tampak depan. */
export const opsiAtas = (i: number): Pilih3<number> => {
  const m = SOAL_ATAS[i].m;
  return angka3(tampakAtas(m), [totalM(m), tampakDepan(m), tampakSamping(m)], i);
};
/** Seluruh kubus. Pengecoh: petak terisi dari atas, dan tampak depan. */
export const opsiTotalAtas = (i: number): Pilih3<number> => {
  const m = SOAL_ATAS[i].m;
  return angka3(totalM(m), [tampakAtas(m), tampakDepan(m), totalM(m) + 1], i + 1);
};
/** Susunan yang cocok dengan ketiga tampak. Pengecoh cocok pada dua dari tiga tampak. */
export const opsiRekonstruksi = (i: number): Pilih3<string> => {
  const c = SOAL_ATAS[i].calon;
  return susun3([teksMatriks(c[0]), teksMatriks(c[1]), teksMatriks(c[2])], i + 2);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Matriks: 0 depan, 1 belakang, 2 total, 3 selesai. Tampak: 0 garis pertama, 1 garis kedua, 2 jumlah, 3 selesai. Atas: 0 tampak atas, 1 total, 2 rekonstruksi, 3 selesai. */
export type StateTampakK6B3B = {
  matriks: { data: number; tahap: number };
  tampak: { data: number; tahap: number };
  atas: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiTampakK6B3B =
  | { t: "M_DATA"; i: number }
  | { t: "M_DEPAN"; o: number }
  | { t: "M_BELAKANG"; o: number }
  | { t: "M_TOTAL"; o: number }
  | { t: "T_DATA"; i: number }
  | { t: "T_PERTAMA"; o: number }
  | { t: "T_KEDUA"; o: number }
  | { t: "T_JUMLAH"; o: number }
  | { t: "U_DATA"; i: number }
  | { t: "U_ATAS"; o: number }
  | { t: "U_TOTAL"; o: number }
  | { t: "U_REKON"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalTampakK6B3B = (): StateTampakK6B3B => ({
  matriks: { data: 0, tahap: 0 },
  tampak: { data: 0, tahap: 0 },
  atas: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalMatriks = (x: StateTampakK6B3B): SoalMatriks => SOAL_MATRIKS[x.matriks.data];
export const soalTampak = (x: StateTampakK6B3B): SoalTampak => SOAL_TAMPAK[x.tampak.data];
export const soalAtas = (x: StateTampakK6B3B): SoalAtas => SOAL_ATAS[x.atas.data];

/* ------------------------------ Matriks ------------------------------ */

function pilihDepanM(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.matriks.tahap !== 0) return x;
  const i = x.matriks.data;
  const p = opsiDepanM(i);
  if (o === p.benar) return { ...x, matriks: { ...x.matriks, tahap: 1 }, pesan: `✅ Baris depan memuat tinggi ${teksBaris(SOAL_MATRIKS[i].m, 0)}. Sekarang catat baris belakang.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Baca tinggi tumpukan di baris paling depan, dari kolom kiri ke kolom kanan.` };
}

function pilihBelakangM(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.matriks.tahap > 1) return x;
  const i = x.matriks.data;
  if (x.matriks.tahap < 1) return { ...x, pesan: "Catat dulu baris depan." };
  const p = opsiBelakangM(i);
  if (o === p.benar) return { ...x, matriks: { ...x.matriks, tahap: 2 }, pesan: `✅ Baris belakang memuat tinggi ${teksBaris(SOAL_MATRIKS[i].m, 1)}. Sekarang hitung seluruh kubusnya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Baca tinggi tumpukan di baris belakang, dari kolom kiri ke kolom kanan.` };
}

function pilihTotalM(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.matriks.tahap > 2) return x;
  const i = x.matriks.data;
  if (x.matriks.tahap < 2) return { ...x, pesan: "Catat dulu tinggi kedua baris." };
  const m = SOAL_MATRIKS[i].m;
  const p = opsiTotalM(i);
  if (o === p.benar) {
    return {
      ...x,
      matriks: { ...x.matriks, tahap: 3 },
      pernah: catat(x.pernah, idMatriks(i)),
      pesan: `✅ Baris depan ${jumlah(m[0])} kubus dan baris belakang ${jumlah(m[1])} kubus: seluruhnya ${totalM(m)} kubus. Angka pada matriks adalah tinggi tiap petak.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jumlahkan semua tinggi pada kedua baris.` };
}

/* ------------------------------ Tampak ------------------------------ */

function pilihGaris(x: StateTampakK6B3B, o: number, k: 0 | 1): StateTampakK6B3B {
  if (!sah(o, 3) || x.tampak.tahap > k) return x;
  const i = x.tampak.data;
  const s = SOAL_TAMPAK[i];
  if (x.tampak.tahap < k) return { ...x, pesan: `Tentukan dulu tinggi ${s.arah === "depan" ? "kolom kiri" : "baris depan"}.` };
  const g = garisTampak(s, k);
  const p = opsiGaris(i, k);
  const nama = s.arah === "depan" ? `kolom ${namaGaris(s, k)}` : `baris ${namaGaris(s, k)}`;
  if (o === p.benar) {
    return { ...x, tampak: { ...x.tampak, tahap: k + 1 }, pesan: `✅ ${nama} bertinggi ${g.join(" dan ")}, jadi yang terlihat dari ${s.arah} adalah ${terbesar(g)}.${k === 0 ? ` Sekarang ${s.arah === "depan" ? "kolom kanan" : "baris belakang"}.` : " Sekarang jumlahkan."}` };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Dari ${s.arah}, tumpukan yang lebih rendah tertutup, jadi ambil tinggi terbesar pada ${nama}.` };
}

function pilihJumlahTampak(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.tampak.tahap > 2) return x;
  const i = x.tampak.data;
  const s = SOAL_TAMPAK[i];
  if (x.tampak.tahap < 2) return { ...x, pesan: "Tentukan dulu tinggi terbesar kedua garis." };
  const p = opsiJumlahTampak(i);
  if (o === p.benar) {
    return {
      ...x,
      tampak: { ...x.tampak, tahap: 3 },
      pernah: catat(x.pernah, idTampak(i)),
      pesan: `✅ ${terbesar(garisTampak(s, 0))} ditambah ${terbesar(garisTampak(s, 1))}: tampak ${s.arah} memuat ${kunciTampak(s)} petak. Ambil yang terbesar, jangan jumlahkan semua tinggi.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jumlahkan hanya tinggi terbesar tiap ${s.arah === "depan" ? "kolom" : "baris"}.` };
}

/* ------------------------------ Atas ------------------------------ */

function pilihAtas(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.atas.tahap !== 0) return x;
  const i = x.atas.data;
  const m = SOAL_ATAS[i].m;
  const p = opsiAtas(i);
  if (o === p.benar) return { ...x, atas: { ...x.atas, tahap: 1 }, pesan: `✅ Dari atas tampak ${tampakAtas(m)} petak terisi. Tinggi tumpukan tidak terlihat dari atas.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Dari atas hanya petak yang terisi yang terlihat, satu petak dihitung satu kali berapa pun tingginya.` };
}

function pilihTotalAtas(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.atas.tahap > 1) return x;
  const i = x.atas.data;
  if (x.atas.tahap < 1) return { ...x, pesan: "Hitung dulu petak yang terisi dari atas." };
  const m = SOAL_ATAS[i].m;
  const p = opsiTotalAtas(i);
  if (o === p.benar) return { ...x, atas: { ...x.atas, tahap: 2 }, pesan: `✅ Seluruh kubus ada ${totalM(m)}, padahal dari atas hanya tampak ${tampakAtas(m)} petak. Sisanya tertumpuk di bawah. Sekarang cocokkan ketiga tampak.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jumlahkan semua tinggi pada matriks, bukan hanya petak yang terlihat dari atas.` };
}

function pilihRekonstruksi(x: StateTampakK6B3B, o: number): StateTampakK6B3B {
  if (!sah(o, 3) || x.atas.tahap > 2) return x;
  const i = x.atas.data;
  if (x.atas.tahap < 2) return { ...x, pesan: "Selesaikan dulu langkah sebelumnya." };
  const s = SOAL_ATAS[i];
  const p = opsiRekonstruksi(i);
  if (o === p.benar) {
    return {
      ...x,
      atas: { ...x.atas, tahap: 3 },
      pernah: catat(x.pernah, idAtas(i)),
      pesan: `✅ Susunan ${teksMatriks(s.m)} cocok dengan ketiga tampak: ${teksTiga(s.m)}. Cocokkan ketiganya, jangan hanya dua.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung ketiga tampaknya satu per satu: susunan itu cocok pada dua tampak saja, ada satu yang berbeda.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahTampakK6B3B(x: StateTampakK6B3B, a: AksiTampakK6B3B): StateTampakK6B3B {
  switch (a.t) {
    case "M_DATA":
      return sah(a.i, SOAL_MATRIKS.length) ? { ...x, matriks: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "M_DEPAN":
      return pilihDepanM(x, a.o);
    case "M_BELAKANG":
      return pilihBelakangM(x, a.o);
    case "M_TOTAL":
      return pilihTotalM(x, a.o);
    case "T_DATA":
      return sah(a.i, SOAL_TAMPAK.length) ? { ...x, tampak: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "T_PERTAMA":
      return pilihGaris(x, a.o, 0);
    case "T_KEDUA":
      return pilihGaris(x, a.o, 1);
    case "T_JUMLAH":
      return pilihJumlahTampak(x, a.o);
    case "U_DATA":
      return sah(a.i, SOAL_ATAS.length) ? { ...x, atas: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "U_ATAS":
      return pilihAtas(x, a.o);
    case "U_TOTAL":
      return pilihTotalAtas(x, a.o);
    case "U_REKON":
      return pilihRekonstruksi(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalTampakK6B3B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanTampakK6B3B = { alat: "tampak"; pernah: string[] };
export const keadaanTampakK6B3B = (x: StateTampakK6B3B): KeadaanTampakK6B3B => ({ alat: "tampak", pernah: x.pernah });

export const ucapMatriksK6B3B = (x: StateTampakK6B3B): string => {
  const s = soalMatriks(x);
  return `Soal ${s.nama}: catat tinggi tiap petak. Baris ${teksMatriks(s.m)}. Pilih tinggi baris depan, baris belakang, lalu hitung seluruh kubusnya.`;
};
export const ucapTampakK6B3B = (x: StateTampakK6B3B): string => {
  const s = soalTampak(x);
  return `Soal ${s.nama}: dilihat dari ${s.arah}. Baris ${teksMatriks(s.m)}. Ambil tinggi terbesar tiap ${s.arah === "depan" ? "kolom" : "baris"}, lalu jumlahkan.`;
};
export const ucapAtasK6B3B = (x: StateTampakK6B3B): string => {
  const s = soalAtas(x);
  return `Soal ${s.nama}: hitung petak yang terisi dari atas, hitung seluruh kubus, lalu pilih susunan yang cocok dengan ketiga tampak.`;
};
