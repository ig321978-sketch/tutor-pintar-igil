/**
 * Lab Dua Jalur (Kelas 5 Bab 2, Sub-Bab B): logika murni. Satu alat, tiga tampilan.
 *  Jalur  : dua pelompat dengan jarak berbeda, mulai dari nol. Anak menekan lompat untuk tiap pelompat. Lab menandai
 *           bilangan yang didarati kedua pelompat (kelipatan persekutuan). Yang pertama muncul adalah KPK.
 *  Irisan : dua daftar kelipatan. Anak menandai bilangan yang ada di kedua daftar, lalu memilih yang terkecil.
 *  Jadwal : dua orang berulang dengan selang hari berbeda. Anak menentukan lama sampai bertemu lagi (KPK), lalu
 *           tanggal bertemunya.
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab B (Nisa dan Yohana, Asep dan Lukas, Dinda dan Amelia). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b2.mjs.
 */

export const MAKS_JALUR = 10;
export const BANYAK_DAFTAR = 10;

/** Jalur: pasangan jarak. */
export const DATA_JALUR: [number, number][] = [
  [3, 4],
  [3, 5],
  [4, 5],
];
/** Irisan: pasangan bilangan yang daftar kelipatannya dibandingkan. */
export const DATA_IRISAN: [number, number][] = [
  [4, 5],
  [2, 3],
  [6, 8],
];
export type DataJadwal = { a: number; b: number; namaA: string; namaB: string; kegiatan: string; awal: number };
/** Jadwal: awal adalah tanggal Agustus saat keduanya bertemu pertama kali. */
export const DATA_JADWAL: DataJadwal[] = [
  { a: 3, b: 4, namaA: "Nisa", namaB: "Yohana", kegiatan: "berenang", awal: 3 },
  { a: 3, b: 5, namaA: "Asep", namaB: "Lukas", kegiatan: "bertugas", awal: 5 },
  { a: 5, b: 2, namaA: "Dinda", namaB: "Amelia", kegiatan: "berlatih piano", awal: 1 },
];

/* ------------------------------ Hitungan ------------------------------ */

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
export const daftarKelipatan = (d: number, banyak: number): number[] => Array.from({ length: banyak }, (_, i) => d * (i + 1));
/** Bilangan yang ada di dua daftar, urut naik. */
export const persekutuan = (p: number[], q: number[]): number[] => p.filter((v) => q.includes(v));
/** KPK dari daftar: yang terkecil di antara kelipatan persekutuan. Butuh daftar yang cukup panjang. */
export const kpkDaftar = (a: number, b: number): number => persekutuan(daftarKelipatan(a, a * b), daftarKelipatan(b, a * b))[0];

/** Pilihan KPK pada Irisan: KPK, kelipatan persekutuan yang terakhir di daftar, dan jumlah dua bilangan. */
export function opsiKpkIrisan(i: number): number[] {
  const [a, b] = DATA_IRISAN[i];
  const sama = persekutuan(daftarKelipatan(a, BANYAK_DAFTAR), daftarKelipatan(b, BANYAK_DAFTAR));
  return putar([sama[0], sama[sama.length - 1], a + b], i);
}
/** Pilihan lama hari: KPK, dua kali KPK, dan jumlah dua selang. */
export function opsiHari(i: number): number[] {
  const { a, b } = DATA_JADWAL[i];
  const k = kpkDaftar(a, b);
  return putar([k, 2 * k, a + b], i);
}
/** Pilihan tanggal: benar, selang hari sendiri sebagai tanggal, dan awal ditambah jumlah selang. */
export function opsiTanggal(i: number): number[] {
  const { a, b, awal } = DATA_JADWAL[i];
  const k = kpkDaftar(a, b);
  return putar([awal + k, k, awal + a + b], i + 1);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateJalurK5B2B = {
  jalur: { data: number; a: number; b: number };
  irisan: { data: number; tanda: number[]; tandaOk: boolean };
  jadwal: { data: number; hariOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiJalurK5B2B =
  | { t: "J_DATA"; i: number }
  | { t: "J_A" }
  | { t: "J_B" }
  | { t: "J_ULANG" }
  | { t: "I_DATA"; i: number }
  | { t: "I_KLIK"; n: number }
  | { t: "I_BERSIH" }
  | { t: "I_CEK" }
  | { t: "I_KPK"; nilai: number }
  | { t: "D_DATA"; i: number }
  | { t: "D_HARI"; nilai: number }
  | { t: "D_TANGGAL"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalJalurK5B2B = (): StateJalurK5B2B => ({
  jalur: { data: 0, a: 0, b: 0 },
  irisan: { data: 0, tanda: [], tandaOk: false },
  jadwal: { data: 0, hariOk: false },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const jarakJalur = (x: StateJalurK5B2B): [number, number] => DATA_JALUR[x.jalur.data];
export const pendaratanJalur = (x: StateJalurK5B2B): { a: number[]; b: number[] } => {
  const [a, b] = jarakJalur(x);
  return { a: daftarKelipatan(a, x.jalur.a), b: daftarKelipatan(b, x.jalur.b) };
};
export const sejajarJalur = (x: StateJalurK5B2B): number[] => {
  const { a, b } = pendaratanJalur(x);
  return persekutuan(a, b);
};
export const pasanganIrisan = (x: StateJalurK5B2B): [number, number] => DATA_IRISAN[x.irisan.data];
export const daftarIrisan = (x: StateJalurK5B2B): { a: number[]; b: number[] } => {
  const [a, b] = pasanganIrisan(x);
  return { a: daftarKelipatan(a, BANYAK_DAFTAR), b: daftarKelipatan(b, BANYAK_DAFTAR) };
};
export const kunciIrisan = (x: StateJalurK5B2B): number[] => {
  const { a, b } = daftarIrisan(x);
  return persekutuan(a, b);
};
export const dataJadwal = (x: StateJalurK5B2B): DataJadwal => DATA_JADWAL[x.jadwal.data];

function lompat(x: StateJalurK5B2B, sisi: "a" | "b"): StateJalurK5B2B {
  const [a, b] = jarakJalur(x);
  const J = sisi === "a" ? a : b;
  if (x.jalur[sisi] >= MAKS_JALUR) return { ...x, pesan: `Pelompat ${J} sudah mendarat sepuluh kali. Lompatkan pelompat yang lain, atau mulai lagi.` };
  const sebelum = sejajarJalur(x);
  const baru: StateJalurK5B2B = { ...x, jalur: { ...x.jalur, [sisi]: x.jalur[sisi] + 1 } };
  const v = J * baru.jalur[sisi];
  const sesudah = sejajarJalur(baru);
  const muncul = sesudah.filter((n) => !sebelum.includes(n));
  if (muncul.length === 0) {
    const belum = sebelum.length === 0 ? " Belum ada bilangan yang didarati kedua pelompat." : "";
    return { ...baru, pesan: `✅ Pelompat ${J} mendarat di ${v}.${belum}` };
  }
  if (sebelum.length === 0)
    return { ...baru, pernah: tambah(baru.pernah, `jalur:${a}:${b}`), pesan: `✅ Kedua pelompat mendarat di ${v}. Itu kelipatan persekutuan pertama, yaitu KPK dari ${a} dan ${b}.` };
  return { ...baru, pesan: `✅ Kedua pelompat mendarat lagi di ${v}. Itu juga kelipatan persekutuan, tetapi bukan yang terkecil.` };
}

function cekIrisan(x: StateJalurK5B2B): StateJalurK5B2B {
  const [a, b] = pasanganIrisan(x);
  const kunci = kunciIrisan(x);
  const tanda = x.irisan.tanda;
  if (tanda.length === 0) return { ...x, pesan: "Belum ada bilangan yang ditandai. Tandai bilangan yang muncul di kedua daftar, lalu periksa." };
  const lebih = tanda.filter((n) => !kunci.includes(n));
  const kurang = kunci.filter((n) => !tanda.includes(n));
  if (lebih.length > 0) {
    const e = lebih[0];
    const di = daftarKelipatan(a, BANYAK_DAFTAR).includes(e) ? a : b;
    return { ...x, irisan: { ...x.irisan, tandaOk: false }, pesan: `${e} hanya ada di daftar kelipatan ${di}. Tandai bilangan yang ada di kedua daftar.` };
  }
  if (kurang.length > 0) return { ...x, irisan: { ...x.irisan, tandaOk: false }, pesan: `Masih ada bilangan yang muncul di kedua daftar, misalnya ${kurang[0]}. Periksa lagi kedua daftar.` };
  return { ...x, irisan: { ...x.irisan, tandaOk: true }, pesan: `✅ Tepat! Bilangan di kedua daftar: ${kunci.join(", ")}. Itu kelipatan persekutuan ${a} dan ${b}. Sekarang pilih yang terkecil.` };
}

function pilihKpk(x: StateJalurK5B2B, nilai: number): StateJalurK5B2B {
  const i = x.irisan.data;
  const [a, b] = DATA_IRISAN[i];
  if (!opsiKpkIrisan(i).includes(nilai)) return x;
  if (!x.irisan.tandaOk) return { ...x, pesan: "Tandai dulu semua bilangan yang ada di kedua daftar, lalu periksa." };
  const kunci = kunciIrisan(x);
  if (nilai === kunci[0]) return { ...x, pernah: tambah(x.pernah, `irisan:${a}:${b}`), pesan: `✅ Tepat! Yang terkecil adalah ${nilai}, itu KPK dari ${a} dan ${b}.` };
  if (kunci.includes(nilai)) return { ...x, pesan: `${nilai} memang kelipatan persekutuan, tetapi bukan yang terkecil. KPK adalah kelipatan persekutuan yang terkecil.` };
  return { ...x, pesan: `${nilai} bukan kelipatan persekutuan yang kamu tandai. Pilih yang terkecil di antara bilangan yang ditandai.` };
}

function pilihHari(x: StateJalurK5B2B, nilai: number): StateJalurK5B2B {
  const i = x.jadwal.data;
  const { a, b } = DATA_JADWAL[i];
  if (!opsiHari(i).includes(nilai)) return x;
  const k = kpkDaftar(a, b);
  if (nilai === k) return { ...x, jadwal: { ...x.jadwal, hariOk: true }, pesan: `✅ Benar, mereka bertemu lagi setiap ${k} hari. ${k} adalah KPK dari ${a} dan ${b}. Sekarang tentukan tanggalnya.` };
  if (nilai === 2 * k) return { ...x, jadwal: { ...x.jadwal, hariOk: false }, pesan: `Itu pertemuan yang kedua. Yang ditanya pertemuan berikutnya, yaitu kelipatan persekutuan yang terkecil.` };
  return { ...x, jadwal: { ...x.jadwal, hariOk: false }, pesan: `${nilai} adalah jumlah dua selang hari, bukan kelipatan persekutuan. Cari bilangan yang muncul di kelipatan ${a} dan kelipatan ${b}.` };
}

function pilihTanggal(x: StateJalurK5B2B, nilai: number): StateJalurK5B2B {
  const i = x.jadwal.data;
  const { a, b, awal } = DATA_JADWAL[i];
  if (!opsiTanggal(i).includes(nilai)) return x;
  if (!x.jadwal.hariOk) return { ...x, pesan: "Tentukan dulu lama hari sampai mereka bertemu lagi." };
  const k = kpkDaftar(a, b);
  if (nilai === awal + k) return { ...x, pernah: tambah(x.pernah, `jadwal:${a}:${b}`), pesan: `✅ Tepat! ${awal} Agustus ditambah ${k} hari jatuh pada ${nilai} Agustus.` };
  if (nilai === k) return { ...x, pesan: `${k} adalah lamanya hari, bukan tanggal. Tambahkan ${k} hari pada tanggal mulai, ${awal} Agustus.` };
  return { ...x, pesan: "Belum. Hitung dari tanggal mulai, tambahkan lama hari sampai bertemu lagi." };
}

export function langkahJalurK5B2B(x: StateJalurK5B2B, a: AksiJalurK5B2B): StateJalurK5B2B {
  switch (a.t) {
    case "J_DATA":
      return sah(a.i, DATA_JALUR.length) ? { ...x, jalur: { data: a.i, a: 0, b: 0 }, pesan: "" } : x;
    case "J_A":
      return lompat(x, "a");
    case "J_B":
      return lompat(x, "b");
    case "J_ULANG":
      return { ...x, jalur: { ...x.jalur, a: 0, b: 0 }, pesan: "✅ Kedua pelompat kembali ke titik awal nol." };
    case "I_DATA":
      return sah(a.i, DATA_IRISAN.length) ? { ...x, irisan: { data: a.i, tanda: [], tandaOk: false }, pesan: "" } : x;
    case "I_KLIK": {
      const { a: p, b: q } = daftarIrisan(x);
      if (!Number.isInteger(a.n) || !(p.includes(a.n) || q.includes(a.n))) return x;
      const ada = x.irisan.tanda.includes(a.n);
      const tanda = ada ? x.irisan.tanda.filter((v) => v !== a.n) : [...x.irisan.tanda, a.n].sort((u, v) => u - v);
      return { ...x, irisan: { ...x.irisan, tanda, tandaOk: false }, pesan: "" };
    }
    case "I_BERSIH":
      return { ...x, irisan: { ...x.irisan, tanda: [], tandaOk: false }, pesan: "" };
    case "I_CEK":
      return cekIrisan(x);
    case "I_KPK":
      return pilihKpk(x, a.nilai);
    case "D_DATA":
      return sah(a.i, DATA_JADWAL.length) ? { ...x, jadwal: { data: a.i, hariOk: false }, pesan: "" } : x;
    case "D_HARI":
      return pilihHari(x, a.nilai);
    case "D_TANGGAL":
      return pilihTanggal(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalJalurK5B2B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanJalurK5B2B = { alat: "jalur"; pernah: string[] };
export const keadaanJalurK5B2B = (x: StateJalurK5B2B): KeadaanJalurK5B2B => ({ alat: "jalur", pernah: x.pernah });

export const ucapJalurK5B2B = (x: StateJalurK5B2B): string => {
  const [a, b] = jarakJalur(x);
  return `Dua pelompat mulai dari nol. Pelompat pertama berjarak ${a}, pelompat kedua berjarak ${b}. Lompatkan keduanya dan lihat bilangan yang didarati keduanya. Pelompat pertama sudah mendarat ${x.jalur.a} kali, pelompat kedua ${x.jalur.b} kali.`;
};
export const ucapIrisanK5B2B = (x: StateJalurK5B2B): string => {
  const [a, b] = pasanganIrisan(x);
  return `Ada dua daftar kelipatan, kelipatan ${a} dan kelipatan ${b}. Tandai bilangan yang ada di kedua daftar, periksa, lalu pilih yang terkecil. Sekarang ada ${x.irisan.tanda.length} bilangan yang ditandai.`;
};
export const ucapJadwalK5B2B = (x: StateJalurK5B2B): string => {
  const d = dataJadwal(x);
  return `${d.namaA} ${d.kegiatan} tiap ${d.a} hari dan ${d.namaB} tiap ${d.b} hari. Pertama kali mereka bertemu pada ${d.awal} Agustus. Tentukan lama sampai bertemu lagi, lalu tanggalnya.`;
};
