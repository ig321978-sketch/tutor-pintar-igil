/**
 * Logika murni hitung bersusun Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (akhir cerita Hari Pertandingan di Stadion Kota).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-hitung-k5b1d.mjs.
 * Isi: kolom tempat (satuan sampai puluh ribuan), jumlah bersusun dengan menyimpan, kurang bersusun dengan meminjam (pinjaman bergulir melewati nol),
 * perkalian dengan memisah pengali dan bersusun, pembagian per kolom, dan cek dengan operasi kebalikan. Semua gambar dan jawaban dihitung dari fungsi di sini.
 */

/** Banyak kolom: satuan, puluhan, ratusan, ribuan, puluh ribuan (bilangan sampai 99.999 dalam hitung bersusun). */
export const BANYAK_KOLOM = 5;
export const NAMA_KOLOM = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan"] as const;
export type NamaKolom = (typeof NAMA_KOLOM)[number];

/** Bilangan dengan titik pemisah ribuan: 24350 menjadi "24.350". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Angka di kolom k (0 = satuan) dihitung dari sisa bagi. */
export const angkaKolom = (n: number, k: number): number => Math.floor(n / 10 ** k) % 10;
/** Angka di kolom k dibaca dari teks (cara kedua, untuk menguji angkaKolom). */
export const angkaDariTeks = (n: number, k: number): number => Number(String(n).padStart(BANYAK_KOLOM, "0")[BANYAK_KOLOM - 1 - k]);
/** Semua angka dari satuan ke kiri. */
export const angkaSemua = (n: number): number[] => Array.from({ length: BANYAK_KOLOM }, (_, k) => angkaKolom(n, k));
/** Banyak kolom yang terpakai (tanpa nol di depan). */
export const panjangBilangan = (n: number): number => String(n).length;

/* ------------------------------ Jumlah bersusun ------------------------------ */
export type KolomJumlah = { k: number; angka: number[]; masuk: number; jumlah: number; tulis: number; simpan: number };
/** Jumlah bersusun dari satuan ke kiri: jumlah angka satu kolom ditambah simpanan; tulis satu angka, simpan sisanya. */
export function susunJumlah(bil: number[]): { kolom: KolomJumlah[]; hasil: number; sisa: number } {
  let masuk = 0;
  const kolom: KolomJumlah[] = [];
  for (let k = 0; k < BANYAK_KOLOM; k += 1) {
    const angka = bil.map((n) => angkaKolom(n, k));
    const jumlah = angka.reduce((s, x) => s + x, 0) + masuk;
    const tulis = jumlah % 10;
    const simpan = Math.floor(jumlah / 10);
    kolom.push({ k, angka, masuk, jumlah, tulis, simpan });
    masuk = simpan;
  }
  return { kolom, hasil: kolom.reduce((h, c) => h + c.tulis * 10 ** c.k, 0), sisa: masuk };
}
/** Salah umum: semua simpanan dilupakan, tiap kolom hanya ditulis angka satuan dari jumlahnya. */
export const jumlahTanpaSimpan = (bil: number[]): number => Array.from({ length: BANYAK_KOLOM }, (_, k) => (bil.reduce((s, n) => s + angkaKolom(n, k), 0) % 10) * 10 ** k).reduce((s, x) => s + x, 0);
/** Kolom pertama (dari satuan) yang menghasilkan simpanan, atau -1. */
export const kolomSimpanPertama = (bil: number[]): number => susunJumlah(bil).kolom.findIndex((c) => c.simpan > 0);

/* ------------------------------ Kurang bersusun ------------------------------ */
export type Ubahan = { kolom: number; jadi: number };
/** Satu pinjaman: kolom `kolom` meminjam dari `sumber` (kolom terdekat di kiri yang tidak nol); kolom nol di antaranya menjadi sembilan. */
export type Pinjam = { kolom: number; sumber: number; ubahan: Ubahan[] };
export type KolomKurang = { k: number; atas: number; bawah: number; pinjam: Pinjam | null; atasSetelah: number; tulis: number };
/** Kurang bersusun dari satuan ke kiri. a harus tidak kurang dari b. Pinjaman bergulir melewati kolom nol. */
export function susunKurang(a: number, b: number): { kolom: KolomKurang[]; hasil: number } {
  const da = angkaSemua(a);
  const db = angkaSemua(b);
  const kolom: KolomKurang[] = [];
  for (let k = 0; k < BANYAK_KOLOM; k += 1) {
    const atas = da[k];
    let pinjam: Pinjam | null = null;
    if (da[k] < db[k]) {
      let j = k + 1;
      while (j < BANYAK_KOLOM && da[j] === 0) j += 1;
      if (j >= BANYAK_KOLOM) throw new Error("a harus tidak kurang dari b");
      const ubahan: Ubahan[] = [{ kolom: j, jadi: da[j] - 1 }];
      da[j] -= 1;
      for (let m = j - 1; m > k; m -= 1) {
        da[m] = 9;
        ubahan.push({ kolom: m, jadi: 9 });
      }
      da[k] += 10;
      pinjam = { kolom: k, sumber: j, ubahan };
    }
    kolom.push({ k, atas, bawah: db[k], pinjam, atasSetelah: da[k], tulis: da[k] - db[k] });
  }
  return { kolom, hasil: kolom.reduce((h, c) => h + c.tulis * 10 ** c.k, 0) };
}
/** Salah umum: tiap kolom angka besar dikurangi angka kecil, tanpa meminjam. */
export const kurangBesarKecil = (a: number, b: number): number => Array.from({ length: BANYAK_KOLOM }, (_, k) => Math.abs(angkaKolom(a, k) - angkaKolom(b, k)) * 10 ** k).reduce((s, x) => s + x, 0);
/** Kolom pertama (dari satuan) yang perlu meminjam, atau -1. */
export const kolomPinjamPertama = (a: number, b: number): number => susunKurang(a, b).kolom.findIndex((c) => c.pinjam !== null);
/** Semua pinjaman pada pengurangan a - b. */
export const semuaPinjam = (a: number, b: number): Pinjam[] => susunKurang(a, b).kolom.flatMap((c) => (c.pinjam ? [c.pinjam] : []));

/* ------------------------------ Kali: pisah pengali dan bersusun ------------------------------ */
/** Pengali dipisah menurut kolomnya: 12 menjadi [10, 2], 14 menjadi [10, 4], 20 menjadi [20]. */
export const pisahPengali = (m: number): number[] => [Math.floor(m / 10) * 10, m % 10].filter((x) => x > 0);
/** Kali dengan memisah pengali: tiap bagian dikalikan dengan bilangan besarnya, lalu hasilnya dijumlahkan. */
export function kaliPisah(a: number, m: number): { bagian: { pengali: number; hasil: number }[]; total: number } {
  const bagian = pisahPengali(m).map((p) => ({ pengali: p, hasil: a * p }));
  return { bagian, total: bagian.reduce((s, b) => s + b.hasil, 0) };
}
export type KolomKali = { k: number; angka: number; masuk: number; jumlah: number; tulis: number; simpan: number };
/** Kali bersusun dengan satu angka pengali: tiap kolom dikali, ditambah simpanan; tulis satu angka, simpan sisanya. */
export function kaliSatuAngka(a: number, d: number): { kolom: KolomKali[]; hasil: number; sisa: number } {
  let masuk = 0;
  const kolom: KolomKali[] = [];
  for (let k = 0; k < BANYAK_KOLOM; k += 1) {
    const angka = angkaKolom(a, k);
    const jumlah = angka * d + masuk;
    kolom.push({ k, angka, masuk, jumlah, tulis: jumlah % 10, simpan: Math.floor(jumlah / 10) });
    masuk = Math.floor(jumlah / 10);
  }
  return { kolom, hasil: kolom.reduce((h, c) => h + c.tulis * 10 ** c.k, 0), sisa: masuk };
}
/** Kali bersusun: satu baris tiap angka pengali (dari satuan), baris puluhan bergeser satu kolom; baris dijumlahkan. */
export function kaliBersusun(a: number, m: number): { baris: { angka: number; geser: number; hasil: number }[]; total: number } {
  const teks = String(m).split("").reverse();
  const baris = teks.map((t, geser) => ({ angka: Number(t), geser, hasil: kaliSatuAngka(a, Number(t)).hasil * 10 ** geser })).filter((b) => b.angka > 0);
  return { baris, total: baris.reduce((s, b) => s + b.hasil, 0) };
}
/** Salah umum: satu nol hilang di belakang hasil (12 x 5.000 ditulis 6.000, padahal 60.000). */
export const kaliHilangNol = (a: number, m: number): number => Math.floor((a * m) / 10);

/* ------------------------------ Bagi per kolom ------------------------------ */
export type LangkahBagi = { k: number; angka: number; q: number; sisa: number };
/** Bagi per kolom dari kolom paling kiri: angka yang dibawa (sisa dikali sepuluh ditambah angka kolom) dibagi pembagi; sisa ditukar menjadi sepuluh di kolom kanan. */
export function bagiKolom(a: number, d: number): { langkah: LangkahBagi[]; hasil: number; sisa: number } {
  let sisa = 0;
  const langkah: LangkahBagi[] = [];
  for (let k = BANYAK_KOLOM - 1; k >= 0; k -= 1) {
    const angka = sisa * 10 + angkaKolom(a, k);
    const q = Math.floor(angka / d);
    sisa = angka % d;
    langkah.push({ k, angka, q, sisa });
  }
  return { langkah, hasil: langkah.reduce((h, l) => h + l.q * 10 ** l.k, 0), sisa };
}

/* ------------------------------ Cek dengan operasi kebalikan ------------------------------ */
export type OpCek = "jumlah" | "kurang" | "kali" | "bagi";
/** Hasil operasi asal dan bilangan yang muncul setelah dibalik: jumlah dicek dengan kurang, kurang dengan jumlah, kali dengan bagi, bagi dengan kali. Bagi harus habis. */
export function balikCek(op: OpCek, a: number, b: number): { hasil: number; kembali: number } {
  if (op === "jumlah") return { hasil: a + b, kembali: a + b - b };
  if (op === "kurang") return { hasil: a - b, kembali: a - b + b };
  if (op === "kali") return { hasil: a * b, kembali: (a * b) / b };
  return { hasil: a / b, kembali: (a / b) * b };
}
/** Apakah hasil yang diklaim lolos cek? Setelah dibalik harus kembali ke bilangan awal a. */
export function lolosCek(op: OpCek, a: number, b: number, klaim: number): boolean {
  if (op === "jumlah") return klaim - b === a;
  if (op === "kurang") return klaim + b === a;
  if (op === "kali") return klaim % b === 0 && klaim / b === a;
  return klaim * b === a;
}
/** Operasi kebalikan (kata): jumlah dengan kurang, kurang dengan tambah, kali dengan bagi, bagi dengan kali. */
export const KATA_KEBALIKAN: Record<OpCek, string> = { jumlah: "kurang", kurang: "tambah", kali: "bagi", bagi: "kali" };

/* ------------------------------ Susunan pilihan ------------------------------ */
/** Tiga pilihan dengan jawaban benar di posisi p (1 atau 2; tidak pernah pertama). */
export function susun3<T>(benar: T, lain: [T, T], p: 1 | 2): [T, T, T] {
  return p === 1 ? [lain[0], benar, lain[1]] : [lain[0], lain[1], benar];
}
/** Dua bilangan pengecoh berbeda dari benar dan dari satu sama lain, positif, paling banyak 99.999: diambil dari kandidat berurutan. */
export function duaPengecoh(benar: number, kandidat: number[]): [number, number] {
  const ok = kandidat.filter((x, i) => Number.isInteger(x) && x > 0 && x <= 99999 && x !== benar && kandidat.indexOf(x) === i);
  const cadangan = [benar + 1000, benar - 1000, benar + 100, benar - 100, benar + 10000, benar - 10000, benar + 10, benar - 10].filter((x) => x > 0 && x <= 99999 && x !== benar && !ok.includes(x));
  const semua = [...ok, ...cadangan];
  return [semua[0], semua[1]];
}
