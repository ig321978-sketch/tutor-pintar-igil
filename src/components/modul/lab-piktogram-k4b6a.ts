/**
 * Lab Piktogram (Kelas 4 Bab 6, Sub-Bab A): logika murni. Satu alat, tiga tampilan.
 *  Turus : benda datang satu per satu (urutan tetap). Anak mencatat tiap benda dengan satu turus di baris kategorinya.
 *          Lab memeriksa catatan benda demi benda, lalu menyebut banyak tiap kategori yang DIHITUNG dari catatan.
 *  Susun : anak memilih keterangan (1 simbol = 1, 2, atau 4) dan menambah atau mengurangi simbol tiap baris.
 *          Lab menolak keterangan yang tidak membagi habis semua nilai (simbol tidak utuh) atau yang membuat satu
 *          baris lebih dari 10 simbol. Baris benar bila simbol × skala = nilai data.
 *  Baca  : piktogram jadi (simbol = nilai : skala). Pertanyaan paling banyak, paling sedikit, nilai, selisih, dan
 *          jumlah keseluruhan. Kunci dan pengecoh (lupa skala, salah baris, jumlah dikira selisih) dihitung dari data.
 * Data dari Buku Siswa Kelas IV Bab 6 (sama dengan data-k4b6.ts, dicocokkan di uji). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b6.mjs.
 */

export type KategoriLab = { id: string; label: string; nilai: number };
export type DataLab = { id: string; judul: string; satuan: string; kategori: KategoriLab[] };

export const DATA_MAINAN: DataLab = {
  id: "mainan",
  judul: "Mainan Karel",
  satuan: "mainan",
  kategori: [
    { id: "mobil", label: "mobil", nilai: 6 },
    { id: "robot", label: "robot", nilai: 4 },
    { id: "pesawat", label: "pesawat", nilai: 3 },
    { id: "puzzle", label: "puzzle", nilai: 1 },
    { id: "kelereng", label: "kelereng", nilai: 9 },
  ],
};
export const DATA_WARNA: DataLab = {
  id: "warna",
  judul: "Warna kesukaan",
  satuan: "siswa",
  kategori: [
    { id: "ungu", label: "ungu", nilai: 4 },
    { id: "kuning", label: "kuning", nilai: 2 },
    { id: "hitam", label: "hitam", nilai: 1 },
    { id: "merah", label: "merah", nilai: 5 },
  ],
};
export const DATA_KELAS: DataLab = {
  id: "kelas",
  judul: "Siswa per kelas",
  satuan: "siswa",
  kategori: [
    { id: "k1", label: "Kelas 1", nilai: 28 },
    { id: "k2", label: "Kelas 2", nilai: 24 },
    { id: "k3", label: "Kelas 3", nilai: 32 },
    { id: "k4", label: "Kelas 4", nilai: 20 },
    { id: "k5", label: "Kelas 5", nilai: 16 },
    { id: "k6", label: "Kelas 6", nilai: 12 },
  ],
};
export const DATA_BUKU: DataLab = {
  id: "buku",
  judul: "Buku dipinjam",
  satuan: "buku",
  kategori: [
    { id: "sen", label: "Senin", nilai: 10 },
    { id: "sel", label: "Selasa", nilai: 8 },
    { id: "rab", label: "Rabu", nilai: 14 },
    { id: "kam", label: "Kamis", nilai: 6 },
  ],
};

export const DATA_TURUS: DataLab[] = [DATA_MAINAN, DATA_WARNA];
export const DATA_SUSUN: DataLab[] = [DATA_WARNA, DATA_KELAS, DATA_BUKU];
export const SKALA: number[] = [1, 2, 4];
export const MAKS_SIMBOL = 10;
/** Keterangan baku tiap data di Baca. */
export const DATA_BACA: { data: DataLab; skala: number }[] = [
  { data: DATA_KELAS, skala: 4 },
  { data: DATA_WARNA, skala: 1 },
];

/* ------------------------------ Turus ------------------------------ */

/** Urutan benda datang: semua benda dijajarkan per kategori, lalu diacak dengan langkah tetap 7 (relatif prima). */
export function urutanBenda(d: DataLab): string[] {
  const jajar = d.kategori.flatMap((k) => Array.from({ length: k.nilai }, () => k.id));
  const n = jajar.length;
  return Array.from({ length: n }, (_, i) => jajar[(i * 7 + 3) % n]);
}
const totalData = (d: DataLab): number => d.kategori.reduce((a, k) => a + k.nilai, 0);
/** Banyak turus tiap kategori dari catatan. */
export const hitungTurus = (d: DataLab, catat: string[]): number[] => d.kategori.map((k) => catat.filter((c) => c === k.id).length);

/* ------------------------------ Baca ------------------------------ */

export type SoalBaca = { id: string; tanya: string; benar: string; opsi: string[]; salah: Record<string, string>; lupa: string[] };

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const urutTurun = (d: DataLab): KategoriLab[] => [...d.kategori].sort((a, b) => b.nilai - a.nilai);

/** Pertanyaan Baca untuk satu data dan skala; semua kunci dan pengecoh dihitung dari data. */
export function soalBaca(d: DataLab, skala: number): SoalBaca[] {
  const turun = urutTurun(d);
  const maks = turun[0];
  const kedua = turun[1];
  const min = turun[turun.length - 1];
  const min2 = turun[turun.length - 2];
  const sim = (k: KategoriLab) => k.nilai / skala;
  const soal: SoalBaca[] = [
    {
      id: "terbanyak",
      tanya: `${d.judul}: mana yang paling banyak?`,
      benar: maks.label,
      opsi: putar([maks.label, kedua.label, min.label], 0),
      salah: {
        [kedua.label]: `${kedua.label} punya ${sim(kedua)} simbol, ${maks.label} punya ${sim(maks)} simbol. Cari baris dengan simbol paling banyak.`,
        [min.label]: `${min.label} justru paling sedikit, hanya ${sim(min)} simbol. Cari baris dengan simbol paling banyak.`,
      },
      lupa: [],
    },
  ];
  if (skala > 1) {
    soal.push(
      {
        id: "nilai",
        tanya: `Berapa ${d.satuan} ${maks.label}?`,
        benar: String(maks.nilai),
        opsi: putar([String(maks.nilai), String(sim(maks)), String(kedua.nilai)], 2),
        salah: {
          [String(sim(maks))]: `Itu banyak simbolnya saja. Ingat keterangan: 1 simbol = ${skala} ${d.satuan}, jadi ${sim(maks)} × ${skala} = ${maks.nilai}.`,
          [String(kedua.nilai)]: `${kedua.nilai} adalah ${d.satuan} ${kedua.label}. Baca baris ${maks.label}.`,
        },
        lupa: [String(sim(maks))],
      },
      {
        id: "tersedikit",
        tanya: `${d.judul}: mana yang paling sedikit?`,
        benar: min.label,
        opsi: putar([min.label, min2.label, maks.label], 1),
        salah: {
          [min2.label]: `${min2.label} punya ${sim(min2)} simbol, ${min.label} punya ${sim(min)} simbol. Cari baris dengan simbol paling sedikit.`,
          [maks.label]: `${maks.label} justru paling banyak. Cari baris dengan simbol paling sedikit.`,
        },
        lupa: [],
      },
      {
        id: "selisih",
        tanya: `Berapa selisih ${d.satuan} ${maks.label} dan ${min.label}?`,
        benar: String(maks.nilai - min.nilai),
        opsi: putar([String(maks.nilai - min.nilai), String(sim(maks) - sim(min)), String(maks.nilai + min.nilai)], 2),
        salah: {
          [String(sim(maks) - sim(min))]: `Itu selisih simbolnya saja. Kalikan dulu dengan keterangan: ${maks.nilai} − ${min.nilai} = ${maks.nilai - min.nilai}.`,
          [String(maks.nilai + min.nilai)]: `Itu jumlah, ${maks.nilai} + ${min.nilai}. Selisih berarti yang banyak dikurangi yang sedikit.`,
        },
        lupa: [String(sim(maks) - sim(min))],
      },
    );
  } else {
    const total = totalData(d);
    soal.push({
      id: "total",
      tanya: `Berapa ${d.satuan} semuanya?`,
      benar: String(total),
      opsi: putar([String(total), String(maks.nilai), String(d.kategori.length)], 1),
      salah: {
        [String(maks.nilai)]: `${maks.nilai} hanya ${d.satuan} ${maks.label}. Jumlahkan semua baris.`,
        [String(d.kategori.length)]: `${d.kategori.length} adalah banyak baris. Jumlahkan ${d.satuan} di semua baris.`,
      },
      lupa: [],
    });
  }
  return soal;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StatePiktoK4B6A = {
  turus: { data: number; catat: string[] };
  susun: { data: number; skala: number; simbol: number[] };
  baca: { data: number; ke: number };
  pernah: string[];
  pesan: string;
};

export type AksiPiktoK4B6A =
  | { t: "T_DATA"; i: number }
  | { t: "T_CATAT"; k: string }
  | { t: "T_BATAL" }
  | { t: "T_ULANG" }
  | { t: "T_CEK" }
  | { t: "S_DATA"; i: number }
  | { t: "S_SKALA"; s: number }
  | { t: "S_TAMBAH"; r: number }
  | { t: "S_KURANG"; r: number }
  | { t: "S_ULANG" }
  | { t: "S_CEK" }
  | { t: "B_DATA"; i: number }
  | { t: "B_SOAL"; i: number }
  | { t: "B_JAWAB"; nilai: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const nolSimbol = (i: number): number[] => DATA_SUSUN[i].kategori.map(() => 0);

export const awalPiktoK4B6A = (): StatePiktoK4B6A => ({
  turus: { data: 0, catat: [] },
  susun: { data: 0, skala: 1, simbol: nolSimbol(0) },
  baca: { data: 0, ke: 0 },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;
/** Huruf pertama kecil, nama orang tetap ("Mainan Karel" menjadi "mainan Karel"). */
const kecil = (t: string): string => `${t[0].toLowerCase()}${t.slice(1)}`;
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataTurus = (x: StatePiktoK4B6A): DataLab => DATA_TURUS[x.turus.data];
export const dataSusun = (x: StatePiktoK4B6A): DataLab => DATA_SUSUN[x.susun.data];
export const bacaAktif = (x: StatePiktoK4B6A): { data: DataLab; skala: number } => DATA_BACA[x.baca.data];
export const soalAktif = (x: StatePiktoK4B6A): SoalBaca[] => soalBaca(bacaAktif(x).data, bacaAktif(x).skala);
/** Benda yang sedang menunggu dicatat, atau null bila semua sudah dicatat. */
export const bendaSekarang = (x: StatePiktoK4B6A): string | null => urutanBenda(dataTurus(x))[x.turus.catat.length] ?? null;
export const labelKategori = (d: DataLab, id: string): string => d.kategori.find((k) => k.id === id)?.label ?? id;

function cekTurus(x: StatePiktoK4B6A): StatePiktoK4B6A {
  const d = dataTurus(x);
  const urut = urutanBenda(d);
  const sisa = urut.length - x.turus.catat.length;
  if (sisa > 0) return { ...x, pesan: `Masih ${sisa} ${d.satuan} belum dicatat. Catat tiap benda dengan satu turus.` };
  const salah = x.turus.catat.filter((c, i) => c !== urut[i]).length;
  if (salah > 0) {
    const benar = d.kategori.map((k) => k.nilai);
    const punya = hitungTurus(d, x.turus.catat);
    const beda = d.kategori.filter((_, i) => benar[i] !== punya[i]).map((k) => k.label);
    const tambahan = beda.length > 0 ? ` Turus ${beda.join(" dan ")} belum cocok.` : " Banyak turusnya kebetulan cocok, tetapi bendanya tertukar.";
    return { ...x, pesan: `Ada ${salah} benda dicatat di baris yang salah.${tambahan} Ulangi dan perhatikan tiap benda.` };
  }
  const punya = hitungTurus(d, x.turus.catat);
  const isi = d.kategori.map((k, i) => `${k.label} ${punya[i]}`).join(", ");
  const jumlah = punya.reduce((a, v) => a + v, 0);
  return { ...x, pernah: tambah(x.pernah, `turus:${d.id}`), pesan: `✅ Turus ${kecil(d.judul)} lengkap: ${isi}. Semuanya ${jumlah} ${d.satuan}.` };
}

function cekSusun(x: StatePiktoK4B6A): StatePiktoK4B6A {
  const d = dataSusun(x);
  const s = x.susun.skala;
  const takUtuh = d.kategori.find((k) => k.nilai % s !== 0);
  if (takUtuh)
    return {
      ...x,
      pernah: tambah(x.pernah, "tak-utuh"),
      pesan: `${kapital(takUtuh.label)} ${takUtuh.nilai} tidak habis dibagi ${s}, jadi tidak bisa digambar dengan simbol utuh. Pilih keterangan lain.`,
    };
  const takMuat = d.kategori.find((k) => k.nilai / s > MAKS_SIMBOL);
  if (takMuat)
    return {
      ...x,
      pernah: tambah(x.pernah, "tak-muat"),
      pesan: `${kapital(takMuat.label)} butuh ${takMuat.nilai / s} simbol, lebih dari ${MAKS_SIMBOL}. Pilih keterangan yang lebih besar agar hemat.`,
    };
  const salah = d.kategori.map((k, i) => ({ k, n: x.susun.simbol[i] })).filter(({ k, n }) => n * s !== k.nilai);
  if (salah.length > 0) {
    const c = salah[0];
    return {
      ...x,
      pesan: `Ada ${salah.length} baris belum tepat. Contoh: ${c.k.label}, ${c.n} simbol × ${s} = ${c.n * s}, padahal datanya ${c.k.nilai}.`,
    };
  }
  const isi = d.kategori.map((k, i) => `${k.label}: ${x.susun.simbol[i]} simbol`).join(", ");
  return {
    ...x,
    pernah: tambah(x.pernah, `susun:${d.id}:${s}`),
    pesan: `✅ Piktogram ${kecil(d.judul)} tepat. Keterangan 1 simbol = ${s} ${d.satuan}: ${isi}.`,
  };
}

function jawabBaca(x: StatePiktoK4B6A, nilai: string): StatePiktoK4B6A {
  const daftar = soalAktif(x);
  const q = daftar[x.baca.ke];
  if (!q || !q.opsi.includes(nilai)) return x;
  const d = bacaAktif(x).data;
  if (nilai !== q.benar) return { ...x, pernah: q.lupa.includes(nilai) ? tambah(x.pernah, "lupa-skala") : x.pernah, pesan: q.salah[nilai] };
  const ke = x.baca.ke + 1 < daftar.length ? x.baca.ke + 1 : x.baca.ke;
  return { ...x, baca: { ...x.baca, ke }, pernah: tambah(x.pernah, `baca:${d.id}:${q.id}`), pesan: `✅ Tepat, ${q.benar}.` };
}

export function langkahPiktoK4B6A(x: StatePiktoK4B6A, a: AksiPiktoK4B6A): StatePiktoK4B6A {
  switch (a.t) {
    case "T_DATA":
      return sah(a.i, DATA_TURUS.length) ? { ...x, turus: { data: a.i, catat: [] }, pesan: "" } : x;
    case "T_CATAT": {
      const d = dataTurus(x);
      if (!d.kategori.some((k) => k.id === a.k)) return x;
      if (bendaSekarang(x) === null) return { ...x, pesan: "Semua benda sudah dicatat. Tekan Periksa." };
      return { ...x, turus: { ...x.turus, catat: [...x.turus.catat, a.k] }, pesan: "" };
    }
    case "T_BATAL":
      return { ...x, turus: { ...x.turus, catat: x.turus.catat.slice(0, -1) }, pesan: "" };
    case "T_ULANG":
      return { ...x, turus: { ...x.turus, catat: [] }, pesan: "" };
    case "T_CEK":
      return cekTurus(x);
    case "S_DATA":
      return sah(a.i, DATA_SUSUN.length) ? { ...x, susun: { data: a.i, skala: x.susun.skala, simbol: nolSimbol(a.i) }, pesan: "" } : x;
    case "S_SKALA":
      return SKALA.includes(a.s) ? { ...x, susun: { ...x.susun, skala: a.s }, pesan: "" } : x;
    case "S_TAMBAH": {
      if (!sah(a.r, x.susun.simbol.length)) return x;
      if (x.susun.simbol[a.r] >= MAKS_SIMBOL) return { ...x, pesan: `Satu baris paling banyak ${MAKS_SIMBOL} simbol. Kalau kurang, pilih keterangan yang lebih besar.` };
      return { ...x, susun: { ...x.susun, simbol: x.susun.simbol.map((v, i) => (i === a.r ? v + 1 : v)) }, pesan: "" };
    }
    case "S_KURANG": {
      if (!sah(a.r, x.susun.simbol.length) || x.susun.simbol[a.r] === 0) return x;
      return { ...x, susun: { ...x.susun, simbol: x.susun.simbol.map((v, i) => (i === a.r ? v - 1 : v)) }, pesan: "" };
    }
    case "S_ULANG":
      return { ...x, susun: { ...x.susun, simbol: nolSimbol(x.susun.data) }, pesan: "" };
    case "S_CEK":
      return cekSusun(x);
    case "B_DATA":
      return sah(a.i, DATA_BACA.length) ? { ...x, baca: { data: a.i, ke: 0 }, pesan: "" } : x;
    case "B_SOAL":
      return sah(a.i, soalAktif(x).length) ? { ...x, baca: { ...x.baca, ke: a.i }, pesan: "" } : x;
    case "B_JAWAB":
      return jawabBaca(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPiktoK4B6A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPiktoK4B6A = { alat: "piktogram"; pernah: string[] };
export const keadaanPiktoK4B6A = (x: StatePiktoK4B6A): KeadaanPiktoK4B6A => ({ alat: "piktogram", pernah: x.pernah });

export const ucapTurusK4B6A = (x: StatePiktoK4B6A): string => {
  const d = dataTurus(x);
  const b = bendaSekarang(x);
  const n = urutanBenda(d).length;
  return b === null
    ? `Semua ${n} ${d.satuan} sudah dicatat. Tekan Periksa.`
    : `Data ${kecil(d.judul)}. Sudah ${x.turus.catat.length} dari ${n} dicatat. Benda sekarang: ${labelKategori(d, b)}. Ketuk barisnya untuk menambah satu turus.`;
};
export const ucapSusunK4B6A = (x: StatePiktoK4B6A): string => {
  const d = dataSusun(x);
  return `Susun piktogram ${kecil(d.judul)}. Keterangan sekarang 1 simbol = ${x.susun.skala} ${d.satuan}. Tambah atau kurangi simbol tiap baris sampai simbol × skala sama dengan datanya, lalu periksa.`;
};
export const ucapBacaK4B6A = (x: StatePiktoK4B6A): string => {
  const { data, skala } = bacaAktif(x);
  const q = soalAktif(x)[x.baca.ke];
  return `Piktogram ${kecil(data.judul)}. Keterangan 1 simbol = ${skala} ${data.satuan}. Pertanyaan ${x.baca.ke + 1}: ${q.tanya}`;
};
