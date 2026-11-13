/**
 * Lab Banding (Kelas 5 Bab 9, Sub-Bab B: Membandingkan dan Mengurutkan Bilangan sampai 1.000.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Banding : dua bilangan dalam tabel tempat; penunjuk digeser dari kolom paling kiri dan berhenti di kolom pertama yang berbeda
 *            (Leftmost Place Priority dan Digit-by-Digit Comparison); baru lalu dipilih mana yang lebih besar.
 *  Urut    : tiga atau empat bilangan diurutkan naik atau turun dengan membandingkan tetangga berulang (Ordering Protocol).
 *  Simbol  : dua bilangan dihubungkan dengan tanda lebih besar, lebih kecil, atau sama dengan.
 * Memakai nilai tempat dari Sub-Bab A. Tidak membahas menyusun bilangan dari bagian nilai tempat atau menguraikannya (itu Sub-Bab C).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b9.mjs.
 */

export const BANYAK_KOLOM = 6;
export const NAMA_KOLOM = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;

export type PasanganB = { nama: string; a: number; b: number };
export const PASANGAN_B: PasanganB[] = [
  { nama: "harga dua ponsel", a: 599198, b: 599047 },
  { nama: "harga sepatu Lukas dan Komang", a: 432543, b: 342231 },
  { nama: "penduduk dua desa", a: 789867, b: 789876 },
  { nama: "harga dua motor", a: 786897, b: 789876 },
  { nama: "dua tabungan", a: 250105, b: 250015 },
  { nama: "dua kiriman paket", a: 860209, b: 860290 },
];

export type UrutB = { nama: string; awal: number[]; arah: "naik" | "turun" };
export const URUT_B: UrutB[] = [
  { nama: "tiga harga sepatu", awal: [432543, 232231, 342231], arah: "naik" },
  { nama: "tiga harga ponsel", awal: [599047, 432543, 599198], arah: "turun" },
  { nama: "tiga nomor rumah", awal: [789867, 676785, 789876], arah: "naik" },
  { nama: "empat harga motor", awal: [786897, 676785, 789876, 789867], arah: "turun" },
  { nama: "tiga tabungan", awal: [250105, 250015, 205999], arah: "naik" },
  { nama: "empat kiriman paket", awal: [860290, 860209, 806999, 860902], arah: "turun" },
];

export type SimbolB = { a: number; b: number };
export const SIMBOL_B: SimbolB[] = [
  { a: 676785, b: 786897 },
  { a: 500040, b: 500040 },
  { a: 599047, b: 599198 },
  { a: 789876, b: 789867 },
  { a: 408906, b: 408906 },
  { a: 860290, b: 860209 },
];
export const TEKS_SIMBOL = ["lebih besar dari", "lebih kecil dari", "sama dengan"] as const;
export const TANDA_SIMBOL = [">", "<", "="] as const;
export const TEKS_BANDING = ["Atas lebih besar", "Bawah lebih besar", "Sama besar"] as const;

export const idBanding = (i: number): string => `banding:${i}`;
export const idSatuan = (i: number): string => `satuan:${i}`;
export const idUrut = (i: number): string => `urut:${i}`;
export const idSimbol = (i: number): string => `simbol:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const titikRibuan = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const digitEnam = (n: number): number[] => String(n).padStart(BANYAK_KOLOM, "0").split("").map(Number);
/** Kolom pertama dari kiri yang berbeda, atau -1 bila sama. */
export function kolomBedaPertama(a: number, b: number): number {
  const p = digitEnam(a);
  const q = digitEnam(b);
  for (let k = 0; k < BANYAK_KOLOM; k += 1) if (p[k] !== q[k]) return k;
  return -1;
}
/** 1 bila a lebih besar, -1 bila lebih kecil, 0 bila sama; diputuskan di kolom pertama yang berbeda. */
export function bandingKolom(a: number, b: number): 1 | -1 | 0 {
  const k = kolomBedaPertama(a, b);
  if (k < 0) return 0;
  return digitEnam(a)[k] > digitEnam(b)[k] ? 1 : -1;
}
/** Hasil membandingkan dari satuan (cara yang keliru): kolom satuan saja. */
export function bandingSatuan(a: number, b: number): 1 | -1 | 0 {
  const p = digitEnam(a)[BANYAK_KOLOM - 1];
  const q = digitEnam(b)[BANYAK_KOLOM - 1];
  return p > q ? 1 : p < q ? -1 : 0;
}
/** Apakah membandingkan dari satuan menghasilkan jawaban yang berbeda dari yang benar. */
export const satuanMenyesatkan = (i: number): boolean => bandingSatuan(PASANGAN_B[i].a, PASANGAN_B[i].b) !== bandingKolom(PASANGAN_B[i].a, PASANGAN_B[i].b);
export function urutBenar(awal: readonly number[], arah: "naik" | "turun"): number[] {
  const hasil = [...awal];
  for (let i = 1; i < hasil.length; i += 1) {
    for (let j = i; j > 0; j -= 1) {
      const salah = arah === "naik" ? bandingKolom(hasil[j - 1], hasil[j]) > 0 : bandingKolom(hasil[j - 1], hasil[j]) < 0;
      if (!salah) break;
      [hasil[j - 1], hasil[j]] = [hasil[j], hasil[j - 1]];
    }
  }
  return hasil;
}
const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
/** Tiga pilihan hasil banding dua baris. Letak kunci berputar menurut nomor pasangan. */
export function opsiBanding(i: number): { opsi: [string, string, string]; benar: number } {
  const h = bandingKolom(PASANGAN_B[i].a, PASANGAN_B[i].b);
  const kunci = h > 0 ? TEKS_BANDING[0] : h < 0 ? TEKS_BANDING[1] : TEKS_BANDING[2];
  const opsi = putar3([TEKS_BANDING[0], TEKS_BANDING[1], TEKS_BANDING[2]], i);
  return { opsi, benar: opsi.indexOf(kunci) };
}
/** Tiga pilihan simbol. Letak kunci berputar menurut nomor pasangan. */
export function opsiSimbol(i: number): { opsi: [string, string, string]; benar: number } {
  const h = bandingKolom(SIMBOL_B[i].a, SIMBOL_B[i].b);
  const kunci = h > 0 ? TEKS_SIMBOL[0] : h < 0 ? TEKS_SIMBOL[1] : TEKS_SIMBOL[2];
  const opsi = putar3([TEKS_SIMBOL[0], TEKS_SIMBOL[1], TEKS_SIMBOL[2]], i + 1);
  return { opsi, benar: opsi.indexOf(kunci) };
}
const tandaDari = (h: number): string => (h > 0 ? ">" : h < 0 ? "<" : "=");

/* ------------------------------ Keadaan ------------------------------ */

export type StateBandingK5B9B = {
  banding: { data: number; kolom: number; berhenti: boolean };
  urut: { data: number; daftar: number[] };
  simbol: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiBandingK5B9B =
  | { t: "G_DATA"; i: number }
  | { t: "G_GESER" }
  | { t: "G_BERHENTI" }
  | { t: "G_PILIH"; o: number }
  | { t: "G_SATUAN" }
  | { t: "U_DATA"; i: number }
  | { t: "U_TURUN"; k: number }
  | { t: "U_PERIKSA" }
  | { t: "S_DATA"; i: number }
  | { t: "S_PILIH"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBandingK5B9B = (): StateBandingK5B9B => ({
  banding: { data: 0, kolom: 0, berhenti: false },
  urut: { data: 0, daftar: [...URUT_B[0].awal] },
  simbol: { data: 0 },
  pernah: [],
  pesan: "",
});

export const pasanganBanding = (x: StateBandingK5B9B): PasanganB => PASANGAN_B[x.banding.data];
export const setUrut = (x: StateBandingK5B9B): UrutB => URUT_B[x.urut.data];
export const pasanganSimbol = (x: StateBandingK5B9B): SimbolB => SIMBOL_B[x.simbol.data];

function geser(x: StateBandingK5B9B): StateBandingK5B9B {
  const { data, kolom, berhenti } = x.banding;
  const p = PASANGAN_B[data];
  if (berhenti) return { ...x, pesan: "Kolom yang beda sudah ketemu. Sekarang pilih mana yang lebih besar." };
  const da = digitEnam(p.a)[kolom];
  const db = digitEnam(p.b)[kolom];
  if (da !== db) return { ...x, pesan: `Kolom ${NAMA_KOLOM[kolom]} sudah beda: ${da} dan ${db}. Berhenti di sini, jangan geser lagi.` };
  if (kolom >= BANYAK_KOLOM - 1) return x;
  return { ...x, banding: { ...x.banding, kolom: kolom + 1 }, pesan: `✅ Kolom ${NAMA_KOLOM[kolom]} sama-sama ${da}. Geser ke kolom ${NAMA_KOLOM[kolom + 1]}.` };
}

function berhenti(x: StateBandingK5B9B): StateBandingK5B9B {
  const { data, kolom } = x.banding;
  const p = PASANGAN_B[data];
  if (x.banding.berhenti) return { ...x, pesan: "Kolom yang beda sudah ketemu. Pilih mana yang lebih besar." };
  const da = digitEnam(p.a)[kolom];
  const db = digitEnam(p.b)[kolom];
  if (da === db) return { ...x, pesan: `Kolom ${NAMA_KOLOM[kolom]} masih sama-sama ${da}. Geser ke kanan sampai ada angka yang berbeda.` };
  return { ...x, banding: { ...x.banding, berhenti: true }, pesan: `✅ Kolom ${NAMA_KOLOM[kolom]} adalah kolom pertama yang berbeda: ${da} dan ${db}. Kolom di kirinya sudah sama, jadi kolom ini yang menentukan.` };
}

function pilihBanding(x: StateBandingK5B9B, o: number): StateBandingK5B9B {
  if (!sah(o, 3)) return x;
  const i = x.banding.data;
  if (!x.banding.berhenti) return { ...x, pesan: "Temukan dulu kolom pertama yang berbeda dari kiri, baru pilih mana yang lebih besar." };
  const p = PASANGAN_B[i];
  const s = opsiBanding(i);
  if (o === s.benar) {
    const h = bandingKolom(p.a, p.b);
    return { ...x, pernah: catat(x.pernah, idBanding(i)), pesan: `✅ ${titikRibuan(p.a)} ${tandaDari(h)} ${titikRibuan(p.b)}. Angka di kolom ${NAMA_KOLOM[kolomBedaPertama(p.a, p.b)]} yang menentukan.` };
  }
  return { ...x, pesan: `${s.opsi[o]} belum tepat. Lihat angka di kolom yang berbeda: angka yang lebih besar menang.` };
}

function satuan(x: StateBandingK5B9B): StateBandingK5B9B {
  const i = x.banding.data;
  const p = PASANGAN_B[i];
  if (!satuanMenyesatkan(i)) return { ...x, pesan: "Hasilnya kebetulan sama, tetapi membandingkan dari satuan tidak boleh dipakai. Selalu mulai dari kolom paling kiri. Coba pasangan lain." };
  const s = bandingSatuan(p.a, p.b);
  const kata = s > 0 ? "yang atas tampak lebih besar" : s < 0 ? "yang bawah tampak lebih besar" : "keduanya tampak sama";
  const benar = bandingKolom(p.a, p.b) > 0 ? "yang atas" : "yang bawah";
  return { ...x, pernah: catat(x.pernah, idSatuan(i)), pesan: `✅ Dari satuan, ${kata}. Padahal kolom paling kiri yang beda menunjukkan ${benar} lebih besar. Karena itu bandingkan mulai dari kolom paling kiri.` };
}

function turun(x: StateBandingK5B9B, k: number): StateBandingK5B9B {
  const d = x.urut.daftar;
  if (!sah(k, d.length - 1)) return x;
  const baru = [...d];
  [baru[k], baru[k + 1]] = [baru[k + 1], baru[k]];
  return { ...x, urut: { ...x.urut, daftar: baru }, pesan: "" };
}

function periksaUrut(x: StateBandingK5B9B): StateBandingK5B9B {
  const i = x.urut.data;
  const u = URUT_B[i];
  const d = x.urut.daftar;
  for (let k = 0; k < d.length - 1; k += 1) {
    const h = bandingKolom(d[k], d[k + 1]);
    const salah = u.arah === "naik" ? h > 0 : h < 0;
    if (salah) return { ...x, pesan: `${titikRibuan(d[k])} dan ${titikRibuan(d[k + 1])} belum urut ${u.arah}. Bandingkan dari kolom paling kiri yang berbeda.` };
    if (h === 0) return { ...x, pesan: "Ada dua bilangan yang sama. Periksa lagi." };
  }
  return { ...x, pernah: catat(x.pernah, idUrut(i)), pesan: `✅ Urutan ${u.arah} benar: ${d.map(titikRibuan).join(", ")}. Tiap tetangga sudah dibandingkan.` };
}

function pilihSimbol(x: StateBandingK5B9B, o: number): StateBandingK5B9B {
  if (!sah(o, 3)) return x;
  const i = x.simbol.data;
  const s = opsiSimbol(i);
  const p = SIMBOL_B[i];
  if (o === s.benar) {
    const h = bandingKolom(p.a, p.b);
    return { ...x, pernah: catat(x.pernah, idSimbol(i)), pesan: `✅ ${titikRibuan(p.a)} ${tandaDari(h)} ${titikRibuan(p.b)}, dibaca ${titikRibuan(p.a)} ${TEKS_SIMBOL[h > 0 ? 0 : h < 0 ? 1 : 2]} ${titikRibuan(p.b)}.` };
  }
  const h = bandingKolom(p.a, p.b);
  return { ...x, pesan: h === 0 ? `${s.opsi[o]} belum tepat. Semua kolomnya sama, jadi kedua bilangan sama besar.` : `${s.opsi[o]} belum tepat. Bandingkan dari kolom paling kiri yang berbeda.` };
}

export function langkahBandingK5B9B(x: StateBandingK5B9B, a: AksiBandingK5B9B): StateBandingK5B9B {
  switch (a.t) {
    case "G_DATA":
      return sah(a.i, PASANGAN_B.length) ? { ...x, banding: { data: a.i, kolom: 0, berhenti: false }, pesan: "" } : x;
    case "G_GESER":
      return geser(x);
    case "G_BERHENTI":
      return berhenti(x);
    case "G_PILIH":
      return pilihBanding(x, a.o);
    case "G_SATUAN":
      return satuan(x);
    case "U_DATA":
      return sah(a.i, URUT_B.length) ? { ...x, urut: { data: a.i, daftar: [...URUT_B[a.i].awal] }, pesan: "" } : x;
    case "U_TURUN":
      return turun(x, a.k);
    case "U_PERIKSA":
      return periksaUrut(x);
    case "S_DATA":
      return sah(a.i, SIMBOL_B.length) ? { ...x, simbol: { data: a.i }, pesan: "" } : x;
    case "S_PILIH":
      return pilihSimbol(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBandingK5B9B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBandingK5B9B = { alat: "banding"; pernah: string[] };
export const keadaanBandingK5B9B = (x: StateBandingK5B9B): KeadaanBandingK5B9B => ({ alat: "banding", pernah: x.pernah });

export const ucapBandingK5B9B = (x: StateBandingK5B9B): string => {
  const p = pasanganBanding(x);
  return `${p.nama}: ${titikRibuan(p.a)} dan ${titikRibuan(p.b)}. Mulai dari kolom paling kiri. Kalau angkanya sama, geser ke kanan. Berhenti di kolom pertama yang berbeda, lalu pilih mana yang lebih besar.`;
};
export const ucapUrutK5B9B = (x: StateBandingK5B9B): string => {
  const u = setUrut(x);
  return `${u.nama}. Urutkan ${u.arah}. Bandingkan dua bilangan bertetangga dari kolom paling kiri yang berbeda, lalu turunkan yang perlu pindah.`;
};
export const ucapSimbolK5B9B = (x: StateBandingK5B9B): string => {
  const p = pasanganSimbol(x);
  return `Bilangan ${titikRibuan(p.a)} dan ${titikRibuan(p.b)}. Pilih tanda yang tepat: lebih besar dari, lebih kecil dari, atau sama dengan.`;
};
