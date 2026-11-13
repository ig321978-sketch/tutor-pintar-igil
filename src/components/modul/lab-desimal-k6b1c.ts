/**
 * Lab Desimal (Kelas 6 Bab 1, Sub-Bab C: Bilangan Desimal): logika murni. Satu alat, tiga tampilan.
 *  Ubah   : pecahan diubah menjadi penyebut 10 atau 100 lalu ditulis sebagai desimal (Equivalent Fraction to Tenths/Hundredths
 *           + Grid Tenths-Hundredths Link).
 *  Tempat : tabel satuan, koma, persepuluhan, perseratusan; tempat, nilai, dan bacaan sebuah angka (Decimal Place-Value Chart).
 *  Urut   : menyamakan banyak angka di belakang koma, mencari yang terkecil atau terbesar, dan mengurutkan (Decimal Compare-and-Order).
 * Memakai perkalian pecahan (Sub-Bab A) dan pecahan senilai (Sub-Bab B boleh disentuh). Bab berikutnya tidak disentuh.
 * Semua hitungan memakai bilangan bulat: desimal disimpan sebagai bilangan bulat dikali 100 (3,7 menjadi 370, 0,05 menjadi 5).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b1.mjs.
 */

/** a/b ke desimal: b membagi 100; t adalah 10 atau 100 (penyebut tujuan). salah: dua tulisan desimal pengecoh. */
export type SoalUbah = { nama: string; a: number; b: number; t: number; salah: [string, string] };
/** v = desimal dikali 100; d = angka yang ditanyakan; k = kolom (0 satuan, 1 persepuluhan, 2 perseratusan). */
export type SoalTempat = { nama: string; v: number; d: number; k: number };
/** v = empat desimal dikali 100 (semua beda); dari = diurutkan dari kecil atau dari besar. */
export type SoalUrut = { nama: string; v: [number, number, number, number]; dari: "kecil" | "besar" };

export const SOAL_UBAH: SoalUbah[] = [
  { nama: "setengah kilogram jeruk", a: 1, b: 2, t: 10, salah: ["0,05", "5,0"] },
  { nama: "seperlima liter minyak", a: 1, b: 5, t: 10, salah: ["0,02", "2,0"] },
  { nama: "seperempat meter kain", a: 1, b: 4, t: 100, salah: ["2,5", "0,025"] },
  { nama: "tiga perlima kilogram gula", a: 3, b: 5, t: 10, salah: ["0,06", "6,0"] },
  { nama: "tiga perempat liter susu", a: 3, b: 4, t: 100, salah: ["7,5", "0,075"] },
  { nama: "sepotong kue seperdua puluh", a: 1, b: 20, t: 100, salah: ["0,5", "0,005"] },
];

export const SOAL_TEMPAT: SoalTempat[] = [
  { nama: "jarak lari", v: 370, d: 7, k: 1 },
  { nama: "tinggi badan", v: 285, d: 5, k: 2 },
  { nama: "berat jeruk", v: 60, d: 6, k: 1 },
  { nama: "panjang pita", v: 25, d: 5, k: 2 },
  { nama: "lompat jauh", v: 405, d: 4, k: 0 },
  { nama: "berat ikan", v: 650, d: 6, k: 0 },
];

export const SOAL_URUT: SoalUrut[] = [
  { nama: "lompat jauh tiga anak", v: [370, 290, 307, 285], dari: "kecil" },
  { nama: "timbangan buah", v: [50, 25, 37, 10], dari: "besar" },
  { nama: "jarak lari pagi", v: [260, 310, 206, 301], dari: "kecil" },
  { nama: "tinggi tanaman", v: [60, 5, 16, 61], dari: "kecil" },
  { nama: "panjang tali", v: [405, 450, 415, 425], dari: "besar" },
  { nama: "isi botol", v: [120, 102, 112, 90], dari: "kecil" },
];

export const NAMA_KOLOM = ["satuan", "persepuluhan", "perseratusan"] as const;
export const NILAI_KOLOM = ["1", "1/10", "1/100"] as const;

export const idUbah = (i: number): string => `ubah:${i}`;
export const idTempat = (i: number): string => `tempat:${i}`;
export const idUrut = (i: number): string => `urut:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

/** Bagian bulat dan dua angka di belakang koma dari desimal dikali 100. */
export const bulatDes = (v: number): number => (v - (v % 100)) / 100;
export const belakangDes = (v: number): number => v % 100;
/** Tulisan desimal. tetap = selalu dua angka di belakang koma; selain itu tanpa nol di ujung. */
export function teksDes(v: number, tetap = false): string {
  const b = bulatDes(v);
  const f = belakangDes(v);
  const f2 = f < 10 ? `0${f}` : `${f}`;
  if (tetap) return `${b},${f2}`;
  if (f === 0) return `${b}`;
  return f % 10 === 0 ? `${b},${(f - (f % 10)) / 10}` : `${b},${f2}`;
}
/** Angka pada kolom k (0 satuan, 1 persepuluhan, 2 perseratusan). */
export const digitDes = (v: number, k: number): number => (k === 0 ? bulatDes(v) : k === 1 ? (belakangDes(v) - (belakangDes(v) % 10)) / 10 : belakangDes(v) % 10);

const SATU = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
function kataBulat(n: number): string {
  if (n < 10) return SATU[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATU[n - 10]} belas`;
  const s = n % 10;
  const p = (n - s) / 10;
  return s === 0 ? `${SATU[p]} puluh` : `${SATU[p]} puluh ${SATU[s]}`;
}
/** Tiap angka di belakang koma dieja satu per satu. */
const ejaBelakang = (teks: string): string =>
  teks
    .split("")
    .map((c) => SATU[Number(c)])
    .join(" ");
/** Bacaan desimal yang benar: bagian bulat, kata koma, lalu tiap angka satu per satu. */
export function bacaDes(v: number): string {
  const t = teksDes(v);
  const [b, f] = t.split(",");
  return f === undefined ? kataBulat(Number(b)) : `${kataBulat(Number(b))} koma ${ejaBelakang(f)}`;
}
/** Pengecoh bacaan: angka di belakang koma dibaca sebagai satu bilangan (atau koma dihilangkan), dan bagian bulat tertukar. */
export function pengecohBaca(v: number): [string, string] {
  const t = teksDes(v);
  const [b, f] = t.split(",");
  const asli = bacaDes(v);
  const sebagaiBilangan = `${kataBulat(Number(b))} koma ${kataBulat(Number(f))}`;
  const d1 = sebagaiBilangan !== asli ? sebagaiBilangan : `${kataBulat(Number(b))} ${ejaBelakang(f)}`;
  return [d1, `${ejaBelakang(f)} koma ${kataBulat(Number(b))}`];
}

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}

/** Pembilang baru dan pengali ketika a/b diubah menjadi penyebut t. */
export const pengaliUbah = (s: SoalUbah): number => s.t / s.b;
export const pembilangBaru = (s: SoalUbah): number => s.a * pengaliUbah(s);
/** Desimal hasil, dikali 100. */
export const nilaiUbah = (s: SoalUbah): number => pembilangBaru(s) * (100 / s.t);
/** Urutan dari arah yang diminta. */
export const urutanSet = (s: SoalUrut): number[] => [...s.v].sort((x, y) => (s.dari === "kecil" ? x - y : y - x));
/** Bilangan satu angka di belakang koma pertama pada kumpulan (yang akan disamakan panjangnya). */
export const satuAngka = (s: SoalUrut): number => s.v.find((x) => x % 10 === 0 && x % 100 !== 0) ?? s.v[0];
/** Urutan seperti bilangan bulat: koma dihilangkan (kesalahan khas). */
const tanpaKoma = (v: number): number => Number(teksDes(v).replace(",", ""));
export const tandaUrut = (s: SoalUrut): string => (s.dari === "kecil" ? " < " : " > ");

/* ------------------------------ Definisi langkah ------------------------------ */

export type AlatDes = "ubah" | "tempat" | "urut";
export type NamaLangkahD = "tujuan" | "pengali" | "pemb" | "desimal" | "tempat" | "nilai" | "baca" | "samakan" | "ekstrem" | "urutan";
export type LangkahDes = {
  nama: NamaLangkahD;
  judul: string;
  awalan: string;
  opsi: [string, string, string];
  benar: number;
  ok: string;
  salah: (o: number) => string;
};

const langkah = (nama: NamaLangkahD, judul: string, awalan: string, p: Pilih3<number | string>, ok: string, salah: (teks: string) => string): LangkahDes => {
  const opsi = p.opsi.map(String) as [string, string, string];
  return { nama, judul, awalan, opsi, benar: p.benar, ok, salah: (o) => salah(opsi[o]) };
};

const NAMA_T = (t: number): string => (t === 10 ? "persepuluhan" : "perseratusan");

export function langkahUbah(i: number): LangkahDes[] {
  const s = SOAL_UBAH[i];
  const p = pengaliUbah(s);
  const n = pembilangBaru(s);
  const hasil = teksDes(nilaiUbah(s));
  return [
    langkah(
      "tujuan",
      `${s.a}/${s.b} diubah menjadi pecahan berpenyebut 10 atau 100. Penyebut tujuannya …`,
      "Penyebut tujuan",
      susun3([s.t, s.t === 10 ? 100 : 10, s.b], i),
      `✅ Penyebut ${s.b} diubah menjadi ${s.t}, yaitu ${NAMA_T(s.t)}.`,
      (t) => `${t} belum tepat. Pilih penyebut 10 atau 100 yang bisa dicapai dengan mengalikan ${s.b}.`,
    ),
    langkah(
      "pengali",
      `Pembilang dan penyebut sama-sama dikali berapa supaya ${s.b} menjadi ${s.t}?`,
      "Pengali",
      susun3([p, s.b, s.t], i + 1),
      `✅ ${s.b} × ${p} = ${s.t}, jadi ${s.a}/${s.b} dikali ${p}/${p}.`,
      (t) => `${t} belum tepat. Pengali adalah bilangan yang jika dikali ${s.b} hasilnya ${s.t}.`,
    ),
    langkah(
      "pemb",
      `Pembilang baru: ${s.a} × ${p}. Berapa pembilang pecahan berpenyebut ${s.t}?`,
      "Pembilang baru",
      susun3([n, s.a, s.a + p], i + 2),
      `✅ ${s.a} × ${p} = ${n}, jadi ${s.a}/${s.b} = ${n}/${s.t}.`,
      (t) => `${t} belum tepat. Kalikan pembilang ${s.a} dengan pengali ${p}.`,
    ),
    langkah(
      "desimal",
      `${n}/${s.t} ditulis sebagai desimal …`,
      "Desimal",
      susun3([hasil, s.salah[0], s.salah[1]], i + 3),
      `✅ ${s.a}/${s.b} = ${n}/${s.t} = ${hasil}. ${s.t === 10 ? "Satu angka di belakang koma, yaitu persepuluhan." : "Dua angka di belakang koma, yaitu perseratusan."}`,
      (t) => `${t} belum tepat. ${s.t === 10 ? "Penyebut 10: satu angka di belakang koma." : "Penyebut 100: dua angka di belakang koma, nol di depan bila perlu."}`,
    ),
  ];
}

export function langkahTempat(i: number): LangkahDes[] {
  const s = SOAL_TEMPAT[i];
  const tulis = teksDes(s.v);
  const kolom = NAMA_KOLOM[s.k];
  const lain = NAMA_KOLOM.filter((_, k) => k !== s.k) as [string, string];
  const nilai = `${s.d}${s.k === 0 ? "" : s.k === 1 ? "/10" : "/100"}`;
  const nilaiLain = [0, 1, 2].filter((k) => k !== s.k).map((k) => `${s.d}${k === 0 ? "" : k === 1 ? "/10" : "/100"}`) as [string, string];
  const [d1, d2] = pengecohBaca(s.v);
  return [
    langkah(
      "tempat",
      `Pada ${tulis}, angka ${s.d} yang ditandai ada di tempat …`,
      "Tempat",
      susun3([kolom, lain[0], lain[1]], i),
      `✅ Angka ${s.d} pada ${tulis} ada di tempat ${kolom}.`,
      (t) => `${t} belum tepat. Kiri koma adalah satuan, lalu ke kanan: persepuluhan, kemudian perseratusan.`,
    ),
    langkah(
      "nilai",
      `Angka ${s.d} di tempat ${kolom} bernilai …`,
      "Nilai",
      susun3([nilai, nilaiLain[0], nilaiLain[1]], i + 1),
      `✅ Nilai angka ${s.d} di tempat ${kolom} adalah ${s.d} × ${NILAI_KOLOM[s.k]} = ${nilai}.`,
      (t) => `${t} belum tepat. Nilai angka adalah angkanya dikali nilai tempatnya: satuan 1, persepuluhan 1/10, perseratusan 1/100.`,
    ),
    langkah(
      "baca",
      `${tulis} dibaca …`,
      "Bacaan",
      susun3([bacaDes(s.v), d1, d2], i + 2),
      `✅ ${tulis} dibaca ${bacaDes(s.v)}.`,
      (t) => `${t} belum tepat. Baca bagian bulat, ucapkan koma, lalu baca tiap angka di belakang koma satu per satu.`,
    ),
  ];
}

export function langkahUrut(i: number): LangkahDes[] {
  const s = SOAL_URUT[i];
  const urut = urutanSet(s);
  const x = satuAngka(s);
  const b = bulatDes(x);
  const f1 = (belakangDes(x) - (belakangDes(x) % 10)) / 10;
  const kecil = s.dari === "kecil";
  const sym = tandaUrut(s);
  const kunci = urut.map((v) => teksDes(v)).join(sym);
  const balik = [...urut].reverse().map((v) => teksDes(v)).join(sym);
  const urutBulat = [...s.v].sort((p, q) => (kecil ? tanpaKoma(p) - tanpaKoma(q) : tanpaKoma(q) - tanpaKoma(p))).map((v) => teksDes(v)).join(sym);
  const ekstrem = kecil ? "terkecil" : "terbesar";
  return [
    langkah(
      "samakan",
      `Samakan banyak angka di belakang koma: ${teksDes(x)} ditulis dengan dua angka di belakang koma menjadi …`,
      "Disamakan",
      susun3([teksDes(x, true), `${b},0${f1}`, `${b * 10 + f1},0`], i),
      `✅ ${teksDes(x)} = ${teksDes(x, true)}. Menambah nol di belakang koma tidak mengubah nilai, jadi panjang angka boleh disamakan.`,
      (t) => `${t} belum tepat. Tambahkan satu nol di ujung belakang koma, jangan menggeser koma atau menyisipkan nol di depan.`,
    ),
    langkah(
      "ekstrem",
      `Bilangan ${ekstrem} adalah …`,
      "Bilangan",
      susun3([teksDes(urut[0]), teksDes(urut[3]), teksDes(urut[1])], i + 1),
      `✅ Dari kiri: bandingkan satuan dulu, lalu persepuluhan, lalu perseratusan. Yang ${ekstrem} adalah ${teksDes(urut[0])}.`,
      (t) => `${t} belum tepat. Bandingkan dari kiri: satuan dulu, lalu persepuluhan, lalu perseratusan. Panjang angka bukan besar nilai.`,
    ),
    langkah(
      "urutan",
      kecil ? "Urutkan dari kecil ke besar." : "Urutkan dari besar ke kecil.",
      "Urutan",
      susun3([kunci, balik, urutBulat], i + 2),
      `✅ ${kunci}. Bandingkan dari kiri: satuan dulu, lalu persepuluhan, lalu perseratusan.`,
      (t) => `${t} belum tepat. Samakan panjang angka lebih dulu, lalu bandingkan dari kiri; jangan menganggap koma tidak ada.`,
    ),
  ];
}

export const daftarLangkahDes = (alat: AlatDes, i: number): LangkahDes[] => (alat === "ubah" ? langkahUbah(i) : alat === "tempat" ? langkahTempat(i) : langkahUrut(i));
const JUMLAH_SOAL: Record<AlatDes, number> = { ubah: SOAL_UBAH.length, tempat: SOAL_TEMPAT.length, urut: SOAL_URUT.length };
const ID_ALAT: Record<AlatDes, (i: number) => string> = { ubah: idUbah, tempat: idTempat, urut: idUrut };

/* ------------------------------ Keadaan ------------------------------ */

/** tahap = banyak langkah yang sudah benar pada soal terpilih; selesai bila sama dengan banyak langkah soal itu. */
export type StateDesK6B1C = {
  ubah: { data: number; tahap: number };
  tempat: { data: number; tahap: number };
  urut: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiDesK6B1C =
  | { t: "DATA"; alat: AlatDes; i: number }
  | { t: "JAWAB"; alat: AlatDes; langkah: NamaLangkahD; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalDesK6B1C = (): StateDesK6B1C => ({
  ubah: { data: 0, tahap: 0 },
  tempat: { data: 0, tahap: 0 },
  urut: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const tahapSelesaiDes = (x: StateDesK6B1C, alat: AlatDes): boolean => x[alat].tahap >= daftarLangkahDes(alat, x[alat].data).length;
export const langkahAktifDes = (x: StateDesK6B1C, alat: AlatDes): LangkahDes | null => daftarLangkahDes(alat, x[alat].data)[x[alat].tahap] ?? null;
export const sudahLangkahDes = (x: StateDesK6B1C, alat: AlatDes, nama: NamaLangkahD): boolean => {
  const k = daftarLangkahDes(alat, x[alat].data).findIndex((l) => l.nama === nama);
  return k >= 0 && k < x[alat].tahap;
};

function jawab(x: StateDesK6B1C, alat: AlatDes, nama: NamaLangkahD, o: number): StateDesK6B1C {
  if (!sah(o, 3)) return x;
  const st = x[alat];
  const daftar = daftarLangkahDes(alat, st.data);
  const k = daftar.findIndex((l) => l.nama === nama);
  if (k < 0 || st.tahap > k) return x;
  if (st.tahap < k) return { ...x, pesan: "Selesaikan langkah sebelumnya dulu." };
  const l = daftar[k];
  if (o !== l.benar) return { ...x, pesan: l.salah(o) };
  const tahap = st.tahap + 1;
  const selesai = tahap >= daftar.length;
  return {
    ...x,
    [alat]: { ...st, tahap },
    pernah: selesai ? catat(x.pernah, ID_ALAT[alat](st.data)) : x.pernah,
    pesan: l.ok,
  };
}

export function langkahDesK6B1C(x: StateDesK6B1C, a: AksiDesK6B1C): StateDesK6B1C {
  switch (a.t) {
    case "DATA":
      if (!(a.alat in JUMLAH_SOAL) || !sah(a.i, JUMLAH_SOAL[a.alat])) return x;
      return { ...x, [a.alat]: { data: a.i, tahap: 0 }, pesan: "" };
    case "JAWAB":
      if (!(a.alat in JUMLAH_SOAL)) return x;
      return jawab(x, a.alat, a.langkah, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalDesK6B1C();
    default:
      return x;
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanDesK6B1C = { alat: "desimal"; pernah: string[] };
export const keadaanDesK6B1C = (x: StateDesK6B1C): KeadaanDesK6B1C => ({ alat: "desimal", pernah: x.pernah });

export const ucapUbahK6B1C = (x: StateDesK6B1C): string => {
  const s = SOAL_UBAH[x.ubah.data];
  return `Soal ${s.nama}: ${s.a}/${s.b}. Ubah menjadi pecahan berpenyebut sepuluh atau seratus, lalu tulis sebagai desimal. Kisi menunjukkan sepuluh atau seratus kotak.`;
};
export const ucapTempatK6B1C = (x: StateDesK6B1C): string => {
  const s = SOAL_TEMPAT[x.tempat.data];
  return `Soal ${s.nama}: ${teksDes(s.v)}. Tentukan tempat angka yang ditandai, nilainya, lalu bacaan desimal itu.`;
};
export const ucapUrutK6B1C = (x: StateDesK6B1C): string => {
  const s = SOAL_URUT[x.urut.data];
  return `Soal ${s.nama}: ${s.v.map((v) => teksDes(v)).join(", ")}. Samakan banyak angka di belakang koma, cari yang ${s.dari === "kecil" ? "terkecil" : "terbesar"}, lalu urutkan dari ${s.dari === "kecil" ? "kecil ke besar" : "besar ke kecil"}.`;
};
