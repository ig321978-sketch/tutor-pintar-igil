/**
 * Definisi Mesin Bertahap Kelas 5 Bab 8 (Data), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK5B8.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_DATA (A): Turus → Frekuensi → Tabel → Keputusan   (kasus Donat, Sayuran, Cara Berangkat)
 *    Turus     : turus satu kategori dikelompokkan lima, banyak kelompok penuh dan garis sisa.
 *    Frekuensi : berapa kali satu kategori muncul dalam daftar jawaban mentah.
 *    Tabel     : frekuensi yang hilang dari jumlah frekuensi sama dengan banyak data.
 *    Keputusan : kategori dengan frekuensi terbesar (mode) untuk keputusan.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 8 Sub-Bab A (donat Anggi, sayuran, cara berangkat sekolah).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b8.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama dari kandidat: bulat tak negatif, unik, bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2]) {
    if (hasil.length < 2 && n >= 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

type Empat = [number, number, number, number];

/** kategori: empat nama. f: frekuensi benar. daftar: jawaban mentah (indeks kategori). target: kategori yang dihitung frekuensinya dan turusnya. */
export type KasusData = {
  id: string;
  nama: string;
  konteks: string;
  kategori: [string, string, string, string];
  f: Empat;
  daftar: number[];
  target: { turus: number; frekuensi: number; hilang: number };
  tanyaKeputusan: string;
};

export const KASUS_DATA: KasusData[] = [
  {
    id: "donat",
    nama: "Donat Anggi",
    konteks: "Anggi mencatat rasa donat yang dibeli pelanggan",
    kategori: ["Cokelat", "Keju", "Stroberi", "Kacang"],
    f: [7, 5, 3, 2],
    daftar: [0, 1, 0, 2, 0, 3, 1, 0, 2, 1],
    target: { turus: 0, frekuensi: 1, hilang: 3 },
    tanyaKeputusan: "Anggi hanya boleh menambah bahan untuk satu rasa",
  },
  {
    id: "sayuran",
    nama: "Sayuran Favorit",
    konteks: "Kantin mencatat sayuran favorit murid",
    kategori: ["Bayam", "Wortel", "Kangkung", "Sawi"],
    f: [8, 6, 4, 2],
    daftar: [1, 0, 1, 2, 1, 0, 3, 1, 2, 0],
    target: { turus: 0, frekuensi: 1, hilang: 2 },
    tanyaKeputusan: "Kantin hanya boleh menambah menu satu sayuran",
  },
  {
    id: "berangkat",
    nama: "Cara Berangkat",
    konteks: "Wali kelas mencatat cara murid berangkat ke sekolah",
    kategori: ["Jalan kaki", "Sepeda", "Angkot", "Motor"],
    f: [9, 5, 4, 2],
    daftar: [0, 0, 1, 0, 2, 0, 1, 3, 0, 2],
    target: { turus: 0, frekuensi: 0, hilang: 1 },
    tanyaKeputusan: "Sekolah hanya boleh memperbaiki jalur untuk satu cara berangkat",
  },
];

export const STASIUN_DATA: StasiunDef[] = [
  { id: "turus", nama: "Turus", ikon: "✏️" },
  { id: "frekuensi", nama: "Frekuensi", ikon: "🔢" },
  { id: "tabel", nama: "Tabel", ikon: "📋" },
  { id: "keputusan", nama: "Keputusan", ikon: "🏆" },
];

const jumlah = (f: readonly number[]): number => f.reduce((a, b) => a + b, 0);
/** Berapa kali kategori muncul dalam daftar. */
export const hitungDalamDaftar = (daftar: readonly number[], k: number): number => daftar.filter((v) => v === k).length;
export const bentukTurus = (f: number): string => `${Math.floor(f / 5)} kelompok lima dan ${f % 5} garis`;

export function kasusMesinData(c: KasusData, idx: number): KasusMesin {
  const [a, b, d, e] = c.f;
  const total = a + b + d + e;
  const t = c.target;
  const fTurus = c.f[t.turus];
  const penuh = Math.floor(fTurus / 5);
  const sisa = fTurus % 5;
  const benarTurus = bentukTurus(fTurus);
  const salahTurus = [`${sisa} kelompok lima dan ${penuh} garis`, `${penuh + 1} kelompok lima dan ${sisa} garis`];
  const banyakKali = hitungDalamDaftar(c.daftar, t.frekuensi);
  const hilang = c.f[t.hilang];
  const tigaLain = c.f.filter((_, k) => k !== t.hilang);
  const tertinggi = c.f.indexOf(Math.max(...c.f));
  const terendah = c.f.indexOf(Math.min(...c.f));
  const lain = c.f.findIndex((_, k) => k !== tertinggi && k !== terendah);
  const nama = c.kategori;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "turus",
      tanya: `${c.konteks}. Jawaban ${nama[t.turus]} muncul ${fTurus} kali. Turus dikelompokkan lima, empat garis tegak dan satu garis miring. Turusnya terdiri dari …`,
      opsi: susunOpsi(benarTurus, salahTurus, idx),
      benar: benarTurus,
      petunjuk: "Satu kelompok lima berisi empat garis tegak dan satu garis miring. Bagi banyak jawaban dengan lima: hasil bulatnya banyak kelompok, sisanya garis yang berdiri sendiri.",
    },
    {
      stasiun: "frekuensi",
      tanya: `Daftar jawaban mentah: ${c.daftar.map((k) => nama[k]).join(", ")}. Frekuensi ${nama[t.frekuensi]}, yaitu berapa kali muncul, adalah …`,
      opsi: susunOpsi(`${banyakKali} kali`, pengecoh(banyakKali, [banyakKali + 1, banyakKali - 1, c.daftar.length]).map((v) => `${v} kali`), idx + 1),
      benar: `${banyakKali} kali`,
      petunjuk: `Telusuri daftar dari awal sampai akhir, tandai tiap ${nama[t.frekuensi]} satu kali saja, lalu hitung tandanya.`,
    },
    {
      stasiun: "tabel",
      tanya: `Banyak data ${total}. Tabel frekuensi baru terisi tiga kategori: ${nama.map((n, k) => (k === t.hilang ? null : `${n} ${c.f[k]}`)).filter(Boolean).join(", ")}. Frekuensi ${nama[t.hilang]} yang masih kosong adalah …`,
      opsi: susunOpsi(`${hilang}`, pengecoh(hilang, [jumlah(tigaLain), total, hilang + 1]).map(String), idx + 2),
      benar: `${hilang}`,
      petunjuk: "Jumlah semua frekuensi harus sama dengan banyak data. Kurangkan banyak data dengan jumlah frekuensi yang sudah terisi.",
    },
    {
      stasiun: "keputusan",
      tanya: `Tabel frekuensi: ${nama.map((n, k) => `${n} ${c.f[k]}`).join(", ")}. ${c.tanyaKeputusan}. Menurut data, yang diutamakan adalah …`,
      opsi: susunOpsi(nama[tertinggi], [nama[terendah], nama[lain]], idx + 3),
      benar: nama[tertinggi],
      petunjuk: "Bandingkan frekuensi semua kategori. Keputusan yang punya alasan memilih frekuensi yang paling besar.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${nama[t.turus]} ${fTurus} kali dituruskan menjadi ${benarTurus}. Dalam daftar mentah, ${nama[t.frekuensi]} muncul ${banyakKali} kali. Frekuensi ${nama[t.hilang]} yang hilang ${hilang} dari banyak data ${total}. Frekuensi terbesar ${nama[tertinggi]}.`,
    langkah,
  };
}

export const MESIN_DATA: DefMesin = {
  id: "mesin-data-k5b8",
  judul: "Mesin Data",
  selesaiId: "mesin-data",
  stasiun: STASIUN_DATA,
  kasus: KASUS_DATA.map(kasusMesinData),
};

/* ------------------------------ B: Mesin Piktogram ------------------------------ */

/**
 * kunciOpsi: tiga kunci, tepat satu yang habis membagi semua frekuensi. hitung: nama kategori, banyak simbol, kunci.
 * setengah: nama kategori, simbol utuh, kunci genap. salah: tabel menulis f, kunci, dan banyak simbol yang tergambar.
 */
export type KasusPiktogram = {
  id: string;
  nama: string;
  konteks: string;
  kategori: [string, string, string, string];
  f: Empat;
  kunciOpsi: [number, number, number];
  hitung: { nama: string; simbol: number; kunci: number };
  setengah: { nama: string; penuh: number; kunci: number };
  salah: { nama: string; f: number; kunci: number; gambar: number };
};

export const KASUS_PIKTOGRAM: KasusPiktogram[] = [
  {
    id: "apem",
    nama: "Kue Apem",
    konteks: "Anggi menggambar piktogram penjualan kue apem",
    kategori: ["Senin", "Selasa", "Rabu", "Kamis"],
    f: [8, 12, 4, 16],
    kunciOpsi: [4, 5, 10],
    hitung: { nama: "Senin", simbol: 3, kunci: 4 },
    setengah: { nama: "Selasa", penuh: 2, kunci: 10 },
    salah: { nama: "Rabu", f: 12, kunci: 4, gambar: 4 },
  },
  {
    id: "tomat",
    nama: "Panen Tomat",
    konteks: "Pak Tani menggambar piktogram panen tomat",
    kategori: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    f: [6, 10, 4, 8],
    kunciOpsi: [5, 2, 4],
    hitung: { nama: "Minggu 2", simbol: 5, kunci: 2 },
    setengah: { nama: "Minggu 1", penuh: 2, kunci: 4 },
    salah: { nama: "Minggu 3", f: 10, kunci: 2, gambar: 4 },
  },
  {
    id: "perpustakaan",
    nama: "Perpustakaan",
    konteks: "Petugas menggambar piktogram pengunjung perpustakaan",
    kategori: ["Senin", "Selasa", "Rabu", "Kamis"],
    f: [20, 30, 10, 40],
    kunciOpsi: [4, 10, 20],
    hitung: { nama: "Selasa", simbol: 3, kunci: 10 },
    setengah: { nama: "Kamis", penuh: 1, kunci: 20 },
    salah: { nama: "Rabu", f: 20, kunci: 5, gambar: 4 },
  },
];

export const STASIUN_PIKTOGRAM: StasiunDef[] = [
  { id: "kunci", nama: "Kunci", ikon: "🔑" },
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "setengah", nama: "Setengah", ikon: "➗" },
  { id: "periksa", nama: "Periksa", ikon: "🔍" },
];

/** Kunci yang habis membagi semua frekuensi, tanpa sisa. */
export const kunciHabis = (f: readonly number[], k: number): boolean => f.every((v) => v % k === 0);
export const nilaiSetengah = (penuh: number, k: number): number => penuh * k + k / 2;

export function kasusMesinPiktogram(c: KasusPiktogram, idx: number): KasusMesin {
  const tabel = c.kategori.map((n, k) => `${n} ${c.f[k]}`).join(", ");
  const kunciBenar = c.kunciOpsi.find((k) => kunciHabis(c.f, k)) as number;
  const teksKunci = (k: number) => `1 simbol = ${k}`;
  const h = c.hitung;
  const nilaiH = h.simbol * h.kunci;
  const s = c.setengah;
  const nilaiS = nilaiSetengah(s.penuh, s.kunci);
  const z = c.salah;
  const seharusnya = z.f / z.kunci;
  const lebih = `terlalu banyak satu simbol, seharusnya ${seharusnya}`;
  const kurang = `kurang satu simbol, seharusnya ${seharusnya}`;
  const cocok = "tidak ada yang salah, jumlah simbol cocok dengan tabel";
  const benarSalah = z.gambar === seharusnya + 1 ? lebih : z.gambar === seharusnya - 1 ? kurang : cocok;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "kunci",
      tanya: `${c.konteks}. Tabel frekuensi: ${tabel}. Kunci yang membuat semua kategori punya simbol utuh, tanpa sisa dan tanpa setengah simbol, adalah …`,
      opsi: susunOpsi(teksKunci(kunciBenar), c.kunciOpsi.filter((k) => k !== kunciBenar).map(teksKunci), idx),
      benar: teksKunci(kunciBenar),
      petunjuk: "Bagi tiap frekuensi dengan kunci. Kunci yang tepat membuat semua hasil bagi bilangan bulat, tanpa sisa.",
    },
    {
      stasiun: "hitung",
      tanya: `Pada piktogram, satu simbol sama dengan ${h.kunci}. ${h.nama} punya ${h.simbol} simbol. Nilai ${h.nama} adalah …`,
      opsi: susunOpsi(`${nilaiH}`, pengecoh(nilaiH, [h.simbol, nilaiH + h.kunci, nilaiH - h.kunci]).map(String), idx + 1),
      benar: `${nilaiH}`,
      petunjuk: "Nilai dibaca dengan mengalikan banyak simbol dengan kunci. Banyak simbol saja belum menjadi nilai.",
    },
    {
      stasiun: "setengah",
      tanya: `Satu simbol sama dengan ${s.kunci}. ${s.nama} punya ${s.penuh} simbol utuh dan satu setengah simbol. Nilai ${s.nama} adalah …`,
      opsi: susunOpsi(`${nilaiS}`, [`${(s.penuh + 1) * s.kunci}`, `${s.penuh * s.kunci}`], idx + 2),
      benar: `${nilaiS}`,
      petunjuk: "Setengah simbol bernilai setengah kunci. Hitung simbol utuh dikali kunci, lalu tambahkan setengah kunci.",
    },
    {
      stasiun: "periksa",
      tanya: `Tabel menulis ${z.nama} ${z.f}. Piktogram memakai kunci satu simbol sama dengan ${z.kunci} dan menggambar ${z.gambar} simbol untuk ${z.nama}. Kesalahan piktogram itu adalah …`,
      opsi: susunOpsi(benarSalah, [lebih, kurang, cocok].filter((o) => o !== benarSalah), idx + 3),
      benar: benarSalah,
      petunjuk: "Bagi frekuensi pada tabel dengan kunci untuk tahu banyak simbol yang seharusnya, lalu bandingkan dengan simbol yang tergambar.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Kunci ${kunciBenar} habis membagi semua frekuensi. ${h.nama} dengan ${h.simbol} simbol bernilai ${nilaiH}. ${s.nama} dengan ${s.penuh} simbol dan satu setengah simbol bernilai ${nilaiS}. ${z.nama} ${z.f} seharusnya ${seharusnya} simbol: ${benarSalah}.`,
    langkah,
  };
}

export const MESIN_PIKTOGRAM: DefMesin = {
  id: "mesin-piktogram-k5b8",
  judul: "Mesin Piktogram",
  selesaiId: "mesin-piktogram",
  stasiun: STASIUN_PIKTOGRAM,
  kasus: KASUS_PIKTOGRAM.map(kasusMesinPiktogram),
};

/* ------------------------------ C: Mesin Batang ------------------------------ */

/**
 * baca: kategori yang dibaca, tinggi batang dalam garis, dan nilai tiap garis. skala: nilai tertinggi dan tiga langkah, tepat satu yang baik
 * (muat dalam sepuluh garis dan lebih dari separuh tinggi). ganda: dua kelompok pada satu kategori dengan skala yang sama.
 * penyajian: tujuan pembaca dan penyajian yang tepat (0 tabel, 1 piktogram, 2 diagram batang).
 */
export type KasusBatang = {
  id: string;
  nama: string;
  konteks: string;
  baca: { kategori: string; garis: number; langkah: number };
  skala: { tertinggi: number; opsi: [number, number, number] };
  ganda: { kategori: string; a: string; nilaiA: number; b: string; nilaiB: number; langkah: number };
  tujuan: string;
  penyajian: number;
};

export const KASUS_BATANG: KasusBatang[] = [
  {
    id: "seagames",
    nama: "Sea Games",
    konteks: "Rani membaca diagram batang medali emas Indonesia",
    baca: { kategori: "2017", garis: 6, langkah: 5 },
    skala: { tertinggi: 50, opsi: [2, 5, 10] },
    ganda: { kategori: "2023", a: "Laki-laki", nilaiA: 50, b: "Perempuan", nilaiB: 35, langkah: 5 },
    tujuan: "Guru ingin membandingkan tinggi rendah banyak tahun sekilas.",
    penyajian: 2,
  },
  {
    id: "lele",
    nama: "Panen Lele",
    konteks: "Pak Budi membaca diagram batang panen lele",
    baca: { kategori: "Kolam 3", garis: 5, langkah: 20 },
    skala: { tertinggi: 120, opsi: [50, 20, 10] },
    ganda: { kategori: "Kolam 1", a: "Panen pagi", nilaiA: 120, b: "Panen sore", nilaiB: 80, langkah: 20 },
    tujuan: "Pemilik kolam ingin menyebut jumlah ikan yang tepat untuk tiap kolam.",
    penyajian: 0,
  },
  {
    id: "perpustakaan-batang",
    nama: "Perpustakaan",
    konteks: "Bu Sari membaca diagram batang pengunjung perpustakaan",
    baca: { kategori: "Kamis", garis: 7, langkah: 10 },
    skala: { tertinggi: 80, opsi: [5, 10, 20] },
    ganda: { kategori: "Selasa", a: "Laki-laki", nilaiA: 60, b: "Perempuan", nilaiB: 90, langkah: 10 },
    tujuan: "Pustakawan ingin poster bergambar yang menarik untuk anak kecil, satu gambar mewakili sepuluh pengunjung.",
    penyajian: 1,
  },
];

export const STASIUN_BATANG: StasiunDef[] = [
  { id: "baca", nama: "Baca", ikon: "📖" },
  { id: "skala", nama: "Skala", ikon: "📏" },
  { id: "selisih", nama: "Selisih", ikon: "➖" },
  { id: "penyajian", nama: "Penyajian", ikon: "🖼️" },
];

const NAMA_SAJI = ["tabel", "piktogram", "diagram batang"];
/** Skala yang baik: nilai tertinggi muat dalam sepuluh garis dan lebih dari lima garis. */
export const skalaCocok = (tertinggi: number, langkah: number): boolean => tertinggi <= 10 * langkah && tertinggi > 5 * langkah;

export function kasusMesinBatang(c: KasusBatang, idx: number): KasusMesin {
  const b = c.baca;
  const nilaiB = b.garis * b.langkah;
  const baik = c.skala.opsi.find((k) => skalaCocok(c.skala.tertinggi, k)) as number;
  const g = c.ganda;
  const selisih = Math.abs(g.nilaiA - g.nilaiB);
  const saji = NAMA_SAJI[c.penyajian];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "baca",
      tanya: `${c.konteks}. Skala tiap garis ${b.langkah} dan batang ${b.kategori} setinggi ${b.garis} garis. Nilai ${b.kategori} adalah …`,
      opsi: susunOpsi(`${nilaiB}`, pengecoh(nilaiB, [b.garis, nilaiB + b.langkah, nilaiB - b.langkah]).map(String), idx),
      benar: `${nilaiB}`,
      petunjuk: "Baca judul, lalu skala, lalu tinggi batang. Nilai adalah banyak garis dikali nilai tiap garis.",
    },
    {
      stasiun: "skala",
      tanya: `Nilai tertinggi data adalah ${c.skala.tertinggi}. Sumbu mulai dari nol dan punya ${10} garis. Langkah tiap garis yang paling baik adalah …`,
      opsi: susunOpsi(`langkah ${baik}`, c.skala.opsi.filter((k) => k !== baik).map((k) => `langkah ${k}`), idx + 1),
      benar: `langkah ${baik}`,
      petunjuk: "Skala yang baik memuat nilai tertinggi dalam sepuluh garis, tetapi tidak membuat batang tertinggi kurang dari separuh tinggi.",
    },
    {
      stasiun: "selisih",
      tanya: `Diagram batang ganda ${g.kategori}: ${g.a} ${g.nilaiA} dan ${g.b} ${g.nilaiB}, dengan skala yang sama. Selisih kedua batang adalah …`,
      opsi: susunOpsi(`${selisih}`, pengecoh(selisih, [g.nilaiA + g.nilaiB, selisih / g.langkah]).map(String), idx + 2),
      benar: `${selisih}`,
      petunjuk: "Selisih adalah nilai besar dikurangi nilai kecil, bukan jumlah keduanya. Bandingkan nilainya, bukan hanya banyak garisnya.",
    },
    {
      stasiun: "penyajian",
      tanya: `${c.tujuan} Penyajian yang paling cocok adalah …`,
      opsi: susunOpsi(saji, NAMA_SAJI.filter((n) => n !== saji), idx + 3),
      benar: saji,
      petunjuk: "Tabel tepat untuk angka rinci, piktogram menarik bagi anak kecil dengan kunci, dan diagram batang paling mudah untuk membandingkan tinggi rendah.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Batang ${b.kategori} setinggi ${b.garis} garis dengan tiap garis ${b.langkah} bernilai ${nilaiB}. Nilai tertinggi ${c.skala.tertinggi} cocok dengan langkah ${baik}. Selisih ${g.a} dan ${g.b} ${selisih}. Penyajian yang cocok: ${saji}.`,
    langkah,
  };
}

export const MESIN_BATANG: DefMesin = {
  id: "mesin-batang-k5b8",
  judul: "Mesin Batang",
  selesaiId: "mesin-batang",
  stasiun: STASIUN_BATANG,
  kasus: KASUS_BATANG.map(kasusMesinBatang),
};

export const SEMUA_MESIN_K5B8: DefMesin[] = [MESIN_DATA, MESIN_PIKTOGRAM, MESIN_BATANG];
