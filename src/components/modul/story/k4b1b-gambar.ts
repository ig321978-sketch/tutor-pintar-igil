import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab B (Menentukan dan Menggunakan Nilai Tempat): kardus bernilai tempat, kartu angka, tabel nilai tempat,
 * struk, bangun nomor 2, balok Dienes sederhana, dan cakram. Berkas ini TIDAK dipakai sub-bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Banyak benda yang dihitung ulang oleh uji diberi id berpola: kisi kartu `id-c{n}`, cakram `id-o{n}`, kubus ribuan `id-k{n}`, lempeng `id-l{n}`, batang `id-b{n}`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  biruMuda: "#2B8FD0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Satu baris tabel: id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). Kepala berlatar krem. */
export function barisTabel(id: string, x: number, y: number, kolW: number[], isi: string[], tinggi = 16, u = 8, kepala = false, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  let px = x;
  isi.forEach((sel, c) => {
    out.push(kotak(`${id}-s${c}`, px, y, kolW[c], tinggi, kepala ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
    if (sel) out.push(teks(`${id}-t${c}`, px + kolW[c] / 2, y + tinggi / 2 + u * 0.35, sel, u, kepala || c === 0 ? W.biru : W.hijau, o));
    px += kolW[c];
  });
  return out;
}

/* ------------------------------ Data Buku Siswa dan Panduan Guru ------------------------------ */

/** Empat nilai tempat dari kiri ke kanan dan nilainya. */
export const TEMPAT = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;
export const NILAI_TEMPAT = [1000, 100, 10, 1] as const;
/** Warna spidol kardus (Buku Siswa hlm. 13): biru, oranye, hijau, merah. */
export const WARNA_KARDUS = [W.biruMuda, W.oranye, W.hijau, W.merah] as const;
export const NAMA_WARNA = ["biru", "oranye", "hijau", "merah"] as const;
/** Latar sel kepala tabel per tempat (selaras warna kardus). */
export const LATAR_TEMPAT = [W.langit, W.jingga, W.hijauMuda, W.merahMuda] as const;

/** Aktivitas 2 (hlm. 13): 4 kardus, 4 paket kartu, tiap paket 0 sampai 9, kotak 10 cm x 10 cm sebanyak 40. */
export const AKTIVITAS = { kardus: 4, paket: 4, kartuPerPaket: 10, kotak: 40, sisiCm: 10 } as const;
/** Contoh Panduan Guru hlm. 37 langkah 8: kartu dari kardus ribuan, ratusan, puluhan, satuan. */
export const CONTOH_AMBIL = [7, 5, 0, 8] as const;
/** Struk belanja Mini Mart (Buku Siswa hlm. 12, dibaca dari gambar): harga dan total. */
export const STRUK = { toko: "Mini Mart", alamat: "Jl. Ciliwung No. 39", tanggal: "9-9-2022 - 15.45", barang: "MAKANAN RINGAN 1", harga: 2150, total: 2150 } as const;
/** Contoh Buku Siswa hlm. 14: 2.150 dibaca dua ribu seratus lima puluh; angka 2, 1, 5, 0. */
export const CONTOH_BS = { bilangan: 2150, angka: [2, 1, 5, 0] } as const;
/** Ayo Berlatih nomor 1 (hlm. 14-15): a) tabel 7, 8, 1, 2; b) ratusan 9; c) satuan 1. Contoh jawaban b dan c dari Panduan Guru hlm. 37. */
export const LATIHAN1 = {
  a: [7, 8, 1, 2],
  b: { tempat: 1, angka: 9, contoh: [6923, 7922, 8920, 5900, 1934] },
  c: { tempat: 3, angka: 1, contoh: [5161, 7111, 8231, 1211, 3191] },
} as const;
/** Ayo Berlatih nomor 2 (hlm. 15): bilangan dan nomor tempat (0 ribuan, 1 ratusan, 2 puluhan, 3 satuan) angka 6; kunci Panduan Guru hlm. 37: puluhan, ratusan, ribuan, satuan. */
export const LATIHAN2: readonly (readonly [number, number])[] = [
  [8463, 2],
  [4675, 1],
  [6789, 0],
  [1236, 3],
];
export const KUNCI2 = ["puluhan", "ratusan", "ribuan", "satuan"] as const;
/** Ayo Berlatih nomor 3 (hlm. 15): harga kue, uang Slamet, sisa; kunci Panduan Guru hlm. 37-38. */
export const SLAMET = { harga: 7350, uang: 9500, sisa: 2150 } as const;
/** Kunci Panduan Guru hlm. 38 nomor 4: bilangan dan angka tiap tempat. */
export const KUNCI4: readonly (readonly [number, readonly number[]])[] = [
  [6192, [6, 1, 9, 2]],
  [2910, [2, 9, 1, 0]],
  [4128, [4, 1, 2, 8]],
  [9217, [9, 2, 1, 7]],
];
/** Miskonsepsi Panduan Guru hlm. 39: membaca 2.345 salah; tabel 1.234 diisi nilainya, seharusnya angkanya. */
export const MISKONSEPSI = { baca: 2345, tabel: 1234, salah: [1000, 200, 30, 4], benar: [1, 2, 3, 4] } as const;

/** Titik ribuan: 2150 menjadi "2.150". */
export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Kardus, kartu, dan tabel nilai tempat ------------------------------ */

/** Kardus kotak berlabel tempat ke-`i` (0 ribuan ... 3 satuan): kotak `${id}-k`, label `${id}-t` berwarna spidol. */
export function kardus(id: string, x: number, y: number, w: number, h: number, i: number, u = 9, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, W.krem, W.coklat, { rx: 4, tebal: 1.6, ...o }), teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, TEMPAT[i], u, WARNA_KARDUS[i], o)];
}

/** Kartu angka kecil (satu angka) dengan latar `warna`: kotak `${id}-k` dan teks `${id}-t`. */
export function kartuAngka(id: string, x: number, y: number, s: number, isi: string | number, warna: string = W.putih, u = 11, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, s, s, warna, W.biru, { rx: 3, tebal: 1.4, ...o }), teks(`${id}-t`, x + s / 2, y + s / 2 + u * 0.35, String(isi), u, W.biru, o)];
}

/** Kepala tabel nilai tempat empat kolom sama lebar `w`: sel `${id}-h{i}`, teks `${id}-ht{i}`. */
export function kepalaTempat(id: string, x: number, y: number, w: number, h = 16, u = 8.4, o: Opsi = {}): Obj[] {
  return TEMPAT.flatMap((t, i) => [kotak(`${id}-h${i}`, x + i * w, y, w, h, LATAR_TEMPAT[i], W.biru, { rx: 0, tebal: 1, ...o }), teks(`${id}-ht${i}`, x + i * w + w / 2, y + h / 2 + u * 0.35, t, u, W.biru, o)]);
}

/** Satu baris isi tabel nilai tempat, satu sel per angka: sel `${id}-d{i}`, teks `${id}-dt{i}`. `isi` bisa teks bebas (mis. "1.000"). */
export function isiTempat(id: string, x: number, y: number, w: number, isi: (string | number)[], h = 18, u = 10, warna: string = W.putih, o: Opsi = {}): Obj[] {
  return isi.flatMap((v, i) => [kotak(`${id}-d${i}`, x + i * w, y, w, h, warna, W.biru, { rx: 0, tebal: 1, ...o }), teks(`${id}-dt${i}`, x + i * w + w / 2, y + h / 2 + u * 0.35, String(v), u, W.biru, o)]);
}

/** Satu sel isi tabel saja (untuk menampilkan angka satu per satu): kotak `${id}-d{i}` dan teks `${id}-dt{i}`. */
export function selTempat(id: string, x: number, y: number, w: number, i: number, v: string | number, h = 18, u = 10, warna: string = W.putih, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-d${i}`, x + i * w, y, w, h, warna, W.biru, { rx: 0, tebal: 1, ...o }), teks(`${id}-dt${i}`, x + i * w + w / 2, y + h / 2 + u * 0.35, String(v), u, W.biru, o)];
}

/** Kisi kol x bar kotak kartu sama besar, pojok kiri-atas (x, y). Sel `${id}-c{n}` berurutan per baris. */
export function kisiKartu(id: string, x: number, y: number, kol: number, bar: number, sw: number, sh: number, warna: string = W.putih, o: Opsi = {}): Obj[] {
  return Array.from({ length: kol * bar }, (_, i) => kotak(`${id}-c${i}`, x + (i % kol) * sw, y + Math.floor(i / kol) * sh, sw, sh, warna, W.biru, { rx: 0, tebal: 1.2, ...o }));
}

/* ------------------------------ Bangun nomor 2 ------------------------------ */

const f = (v: number): string => String(Math.round(v * 100) / 100);

/** Bangun datar ber-label bilangan, pusat (cx, cy): segitiga, lingkaran, belah ketupat, segilima. Id bentuk `${id}-s`, isi `${id}-t`. */
export function bangun(id: string, jenis: "segitiga" | "lingkaran" | "belah" | "segilima", cx: number, cy: number, isi: string, o: Opsi = {}): Obj[] {
  const teksIsi = teks(`${id}-t`, cx, jenis === "segitiga" ? cy + 14 : cy + 4, isi, 11, W.biru, o);
  if (jenis === "lingkaran") return [bulat(`${id}-s`, cx, cy, 32, W.emas, W.biru, o), teksIsi];
  const titikBangun: Record<string, number[][]> = {
    segitiga: [[0, -34], [-40, 32], [40, 32]],
    belah: [[0, -36], [-36, 0], [0, 36], [36, 0]],
    segilima: [[0, -34], [-35, -8], [-22, 30], [22, 30], [35, -8]],
  };
  const t = titikBangun[jenis];
  return [jalur(`${id}-s`, cx, cy, `M${t.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L")} Z`, W.emas, W.biru, { tebal: 1.8, ...o }), teksIsi];
}

/* ------------------------------ Struk belanja ------------------------------ */

/** Struk belanja Mini Mart (pojok kiri-atas x, y; lebar 112, tinggi 146): kertas `${id}-k`, baris teks `${id}-t{n}`. */
export function struk(id: string, x: number, y: number, o: Opsi = {}): Obj[] {
  const baris: [string, number, string?][] = [
    [STRUK.toko, 11],
    [STRUK.alamat, 7.2],
    [STRUK.tanggal, 7.2],
    [STRUK.barang, 7.2],
    [`Rp${titik(STRUK.harga)}`, 9.4],
    [`TOTAL: ${titik(STRUK.total)}`, 8.6],
    ["TERIMA KASIH", 6.8],
  ];
  const ys = [22, 38, 52, 76, 92, 112, 134];
  return [kotak(`${id}-k`, x, y, 112, 146, W.putih, W.abu, { rx: 5, tebal: 2, ...o }), ...baris.map(([isi, u], n) => teks(`${id}-t${n}`, x + 56, y + ys[n], isi, u, n === 0 ? W.biru : W.hitam, o))];
}

/* ------------------------------ Balok Dienes sederhana dan cakram ------------------------------ */

/** Kubus satuan kecil (sisi 8) di (x, y). */
export const kubusSatuan = (id: string, x: number, y: number, o: Opsi = {}): Obj => kotak(id, x, y, 8, 8, W.hijauMuda, W.hijau, { rx: 1, tebal: 1.2, ...o });
/** Batang puluhan (8 x 40) di (x, y). */
export const batangPuluhan = (id: string, x: number, y: number, o: Opsi = {}): Obj => kotak(id, x, y, 8, 40, W.langit, W.biruMuda, { rx: 1, tebal: 1.2, ...o });
/** Lempeng ratusan (30 x 30) di (x, y). */
export const lempengRatusan = (id: string, x: number, y: number, o: Opsi = {}): Obj => kotak(id, x, y, 30, 30, W.krem, W.oranye, { rx: 2, tebal: 1.4, ...o });
/** Kubus besar ribuan (36 x 36) di (x, y). */
export const kubusRibuan = (id: string, x: number, y: number, o: Opsi = {}): Obj => kotak(id, x, y, 36, 36, W.merahMuda, W.merah, { rx: 2, tebal: 1.6, ...o });

/** Deretan `n` kubus satuan mendatar: id `${id}-o{i}`, mulai (x, y), jarak 10. */
export const deretSatuan = (id: string, x: number, y: number, n: number, o: Opsi = {}): Obj[] => Array.from({ length: n }, (_, i) => kubusSatuan(`${id}-o${i}`, x + i * 10, y, o));
/** Deretan `n` batang puluhan: id `${id}-b{i}`, jarak 11. */
export const deretBatang = (id: string, x: number, y: number, n: number, o: Opsi = {}): Obj[] => Array.from({ length: n }, (_, i) => batangPuluhan(`${id}-b${i}`, x + i * 11, y, o));
/** Deretan `n` lempeng ratusan: id `${id}-l{i}`, jarak 34. */
export const deretLempeng = (id: string, x: number, y: number, n: number, o: Opsi = {}): Obj[] => Array.from({ length: n }, (_, i) => lempengRatusan(`${id}-l${i}`, x + i * 34, y, o));
/** Deretan `n` kubus ribuan: id `${id}-k{i}`, jarak 40. */
export const deretKubus = (id: string, x: number, y: number, n: number, o: Opsi = {}): Obj[] => Array.from({ length: n }, (_, i) => kubusRibuan(`${id}-k${i}`, x + i * 40, y, o));

/** Warna cakram per tempat (ribuan, ratusan, puluhan, satuan). */
export const WARNA_CAKRAM = [W.biruMuda, W.oranye, W.hijau, W.merah] as const;
/** Tumpukan `n` cakram berpusat di (cx, y mulai dari bawah ke atas): id `${id}-o{i}`, jari-jari r, jarak vertikal 2r + 1. */
export function tumpukCakram(id: string, cx: number, yBawah: number, n: number, r: number, i: number, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, j) => bulat(`${id}-o${j}`, cx, yBawah - j * (2 * r + 1), r, WARNA_CAKRAM[i], W.biru, { tebal: 1.1, ...o }));
}
