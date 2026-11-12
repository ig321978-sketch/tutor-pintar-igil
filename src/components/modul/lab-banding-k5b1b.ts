/**
 * Lab Banding (Kelas 5 Bab 1, Sub-Bab B): logika murni. Satu alat, tiga tampilan.
 *  Banding : dua bilangan ditulis sejajar di tabel lima tempat. Anak memeriksa kolom dari kiri satu per satu sampai
 *            menemukan digit yang berbeda (penentu), lalu memilih tanda <, >, atau =. Lab menolak tanda sebelum
 *            penentu ditemukan, dan menjelaskan bila anak mulai dari satuan.
 *  Garis   : garis bilangan sepuluh ruas berlangkah tetap dengan bilangan acuan. Anak meletakkan tiap bilangan di
 *            ruasnya. Ruas benar dihitung dari bilangan; yang lebih kanan lebih besar.
 *  Urut    : anak mengetuk bilangan satu per satu menurut urutan naik atau turun. Lab memeriksa tiap pasangan berurutan.
 * Data dari Buku Siswa Kelas V Bab 1 (sama dengan data-k5b1.ts dan naskah, dicocokkan di uji). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b1.mjs.
 */

export const TEMPAT5 = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;
const BOBOT5 = [10000, 1000, 100, 10, 1];

export const titik = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
export const digitLima = (n: number): number[] => BOBOT5.map((b) => Math.floor(n / b) % 10);
export type Tanda = "<" | ">" | "=";
export const tandaDari = (a: number, b: number): Tanda => (a < b ? "<" : a > b ? ">" : "=");
const NAMA_TANDA: Record<Tanda, string> = { "<": "lebih kecil dari", ">": "lebih besar dari", "=": "sama dengan" };
export const TANDA: Tanda[] = ["<", ">", "="];

/* ------------------------------ Data buku ------------------------------ */

export type PasangBanding = { a: number; b: number };
export const DATA_BANDING: PasangBanding[] = [
  { a: 78897, b: 87897 },
  { a: 56560, b: 57000 },
  { a: 45230, b: 46001 },
  { a: 56475, b: 43217 },
  { a: 13234, b: 13234 },
];
/** Indeks tempat pertama dari kiri yang digitnya berbeda; 5 bila semua sama. */
export const penentu = (p: PasangBanding): number => {
  const da = digitLima(p.a);
  const db = digitLima(p.b);
  const k = da.findIndex((d, i) => d !== db[i]);
  return k < 0 ? 5 : k;
};

export type DataGaris = { id: string; ket: string; dari: number; langkah: number; acuan: number; angka: number[] };
export const RUAS = 10;
export const DATA_GARIS: DataGaris[] = [
  { id: "sekitar40", ket: "Sekitar 40.000", dari: 35000, langkah: 1000, acuan: 40000, angka: [38500, 40200, 39999] },
  { id: "dakon", ket: "Skor dakon", dari: 0, langkah: 10000, acuan: 50000, angka: [56560, 65750, 57000, 75360] },
];
export const ruasBenar = (g: DataGaris, n: number): number => Math.floor((n - g.dari) / g.langkah);

export type Arah = "naik" | "turun";
export type DataUrut = { id: string; ket: string; arah: Arah; angka: number[] };
export const DATA_URUT: DataUrut[] = [
  { id: "dakon", ket: "Skor dakon", arah: "naik", angka: [56560, 65750, 57000, 75360] },
  { id: "empat", ket: "Empat bilangan", arah: "turun", angka: [56475, 43217, 78897, 87897] },
  { id: "tengah", ket: "Tiga bilangan", arah: "naik", angka: [85450, 85550, 85350] },
];
export const urutBenar = (u: DataUrut): number[] => [...u.angka].sort((x, y) => (u.arah === "naik" ? x - y : y - x));

/* ------------------------------ Keadaan ------------------------------ */

export type StateBandingK5B1B = {
  banding: { data: number; buka: number };
  garis: { data: number; pilih: number | null; letak: (number | null)[] };
  urut: { data: number; susun: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiBandingK5B1B =
  | { t: "B_DATA"; i: number }
  | { t: "B_KOLOM"; k: number }
  | { t: "B_TANDA"; tanda: string }
  | { t: "B_ULANG" }
  | { t: "G_DATA"; i: number }
  | { t: "G_PILIH"; j: number }
  | { t: "G_RUAS"; r: number }
  | { t: "G_ULANG" }
  | { t: "G_CEK" }
  | { t: "U_DATA"; i: number }
  | { t: "U_KETUK"; j: number }
  | { t: "U_BATAL" }
  | { t: "U_ULANG" }
  | { t: "U_CEK" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kosongLetak = (i: number): null[] => DATA_GARIS[i].angka.map(() => null);

export const awalBandingK5B1B = (): StateBandingK5B1B => ({
  banding: { data: 0, buka: 0 },
  garis: { data: 0, pilih: 0, letak: kosongLetak(0) },
  urut: { data: 0, susun: [] },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const pasangAktif = (x: StateBandingK5B1B): PasangBanding => DATA_BANDING[x.banding.data];
export const garisAktif = (x: StateBandingK5B1B): DataGaris => DATA_GARIS[x.garis.data];
export const urutAktif = (x: StateBandingK5B1B): DataUrut => DATA_URUT[x.urut.data];
/** Penentu sudah ditemukan (atau semua tempat sudah diperiksa bila sama). */
export const penentuKetemu = (x: StateBandingK5B1B): boolean => {
  const p = penentu(pasangAktif(x));
  return p === 5 ? x.banding.buka === 5 : x.banding.buka > p;
};

function kolom(x: StateBandingK5B1B, k: number): StateBandingK5B1B {
  if (!sah(k, 5)) return x;
  const ps = pasangAktif(x);
  const p = penentu(ps);
  const da = digitLima(ps.a);
  const db = digitLima(ps.b);
  if (penentuKetemu(x)) {
    if (k < x.banding.buka) return { ...x, pesan: `Kolom ${TEMPAT5[k]} sudah diperiksa.` };
    return { ...x, pesan: `Penentunya sudah ketemu di ${TEMPAT5[p]}. Tempat di kanannya tidak perlu dilihat lagi.` };
  }
  if (k < x.banding.buka) return { ...x, pesan: `Kolom ${TEMPAT5[k]} sudah diperiksa. Lanjut ke ${TEMPAT5[x.banding.buka]}.` };
  if (k !== x.banding.buka) {
    if (k === 4 && x.banding.buka === 0)
      return { ...x, pernah: tambah(x.pernah, "dari-satuan"), pesan: "Jangan mulai dari satuan. Satuan bernilai paling kecil, jadi belum menentukan. Mulai dari tempat terbesar di kiri, yaitu puluh ribuan." };
    return { ...x, pesan: `Periksa berurutan dari kiri. Kolom berikutnya ${TEMPAT5[x.banding.buka]}.` };
  }
  const buka = k + 1;
  const y = { ...x, banding: { ...x.banding, buka } };
  if (k === p) return { ...y, pesan: `✅ Di ${TEMPAT5[k]} digitnya berbeda, ${da[k]} dan ${db[k]}. Inilah penentunya. Sekarang pilih tandanya.` };
  if (buka === 5) return { ...y, pesan: "✅ Semua digit sama di setiap tempat. Sekarang pilih tandanya." };
  return { ...y, pesan: `✅ Di ${TEMPAT5[k]} sama-sama ${da[k]}. Geser satu tempat ke kanan.` };
}

function pilihTanda(x: StateBandingK5B1B, t: string): StateBandingK5B1B {
  if (!(TANDA as string[]).includes(t)) return x;
  const ps = pasangAktif(x);
  if (!penentuKetemu(x)) return { ...x, pesan: "Periksa dulu kolom dari kiri sampai ketemu digit yang berbeda, baru pilih tanda." };
  const benar = tandaDari(ps.a, ps.b);
  const p = penentu(ps);
  if (t !== benar) {
    if (p === 5) return { ...x, pesan: "Semua digitnya sama di setiap tempat. Tanda apa yang cocok?" };
    return { ...x, pesan: `Lihat lagi penentunya: di ${TEMPAT5[p]}, ${digitLima(ps.a)[p]} dan ${digitLima(ps.b)[p]}. Bilangan yang digit penentunya lebih kecil, dialah yang lebih kecil.` };
  }
  const alasan = p === 5 ? "Semua digit sama." : `Penentunya di ${TEMPAT5[p]}: ${digitLima(ps.a)[p]} ${benar} ${digitLima(ps.b)[p]}.`;
  return { ...x, pernah: tambah(x.pernah, `banding:${ps.a}-${ps.b}`), pesan: `✅ ${titik(ps.a)} ${benar} ${titik(ps.b)}. Artinya ${titik(ps.a)} ${NAMA_TANDA[benar]} ${titik(ps.b)}. ${alasan}` };
}

function cekGaris(x: StateBandingK5B1B): StateBandingK5B1B {
  const g = garisAktif(x);
  const sisa = x.garis.letak.filter((v) => v === null).length;
  if (sisa > 0) return { ...x, pesan: `Masih ${sisa} bilangan belum diletakkan di garis.` };
  const salah = g.angka.map((n, j) => ({ n, r: x.garis.letak[j] as number })).filter(({ n, r }) => r !== ruasBenar(g, n));
  if (salah.length > 0) {
    const c = salah[0];
    const lo = g.dari + c.r * g.langkah;
    return { ...x, pesan: `Ada ${salah.length} bilangan belum di ruasnya. Contoh: ${titik(c.n)} tidak terletak antara ${titik(lo)} dan ${titik(lo + g.langkah)}. Lihat lagi digit dari kiri.` };
  }
  const naik = [...g.angka].sort((a, b) => a - b);
  const kiri = naik.filter((n) => n < g.acuan).map(titik);
  const kanan = naik.filter((n) => n > g.acuan).map(titik);
  const acuan = `${kiri.length ? `${kiri.join(", ")} di kiri ${titik(g.acuan)}` : ""}${kiri.length && kanan.length ? ", " : ""}${kanan.length ? `${kanan.join(", ")} di kanan ${titik(g.acuan)}` : ""}.`;
  return {
    ...x,
    pernah: tambah(x.pernah, `garis:${g.id}`),
    pesan: `✅ Tepat! Yang lebih kanan lebih besar: ${naik.map(titik).join(" < ")}. Dengan acuan, ${acuan}`,
  };
}

function cekUrut(x: StateBandingK5B1B): StateBandingK5B1B {
  const u = urutAktif(x);
  if (x.urut.susun.length < u.angka.length) return { ...x, pesan: `Ketuk semua ${u.angka.length} bilangan dulu, satu per satu.` };
  const dapat = x.urut.susun.map((j) => u.angka[j]);
  const benar = urutBenar(u);
  if (dapat.every((n, i) => n === benar[i])) {
    const tanda = u.arah === "naik" ? " < " : " > ";
    const tengah = u.angka.length === 3 ? ` Bilangan tengahnya ${titik(benar[1])}.` : "";
    return { ...x, pernah: tambah(x.pernah, `urut:${u.id}`), pesan: `✅ Urut ${u.arah}: ${benar.map(titik).join(tanda)}.${tengah}` };
  }
  if (dapat.every((n, i) => n === benar[benar.length - 1 - i]))
    return { ...x, pesan: `Itu urutan ${u.arah === "naik" ? "turun" : "naik"}. Soal meminta urutan ${u.arah}: ${u.arah === "naik" ? "dari yang terkecil" : "dari yang terbesar"}.` };
  const i = dapat.findIndex((n, k) => k > 0 && (u.arah === "naik" ? dapat[k - 1] > n : dapat[k - 1] < n));
  return { ...x, pesan: `${titik(dapat[i - 1])} dan ${titik(dapat[i])} belum benar urutannya. Bandingkan keduanya dari kiri.` };
}

export function langkahBandingK5B1B(x: StateBandingK5B1B, a: AksiBandingK5B1B): StateBandingK5B1B {
  switch (a.t) {
    case "B_DATA":
      return sah(a.i, DATA_BANDING.length) ? { ...x, banding: { data: a.i, buka: 0 }, pesan: "" } : x;
    case "B_KOLOM":
      return kolom(x, a.k);
    case "B_TANDA":
      return pilihTanda(x, a.tanda);
    case "B_ULANG":
      return { ...x, banding: { ...x.banding, buka: 0 }, pesan: "" };
    case "G_DATA":
      return sah(a.i, DATA_GARIS.length) ? { ...x, garis: { data: a.i, pilih: 0, letak: kosongLetak(a.i) }, pesan: "" } : x;
    case "G_PILIH":
      return sah(a.j, garisAktif(x).angka.length) ? { ...x, garis: { ...x.garis, pilih: a.j }, pesan: "" } : x;
    case "G_RUAS": {
      if (!sah(a.r, RUAS)) return x;
      const j = x.garis.pilih;
      if (j === null) return { ...x, pesan: "Ketuk dulu satu bilangan, lalu ketuk ruasnya." };
      const letak = x.garis.letak.map((v, i) => (i === j ? a.r : v));
      const berikut = letak.findIndex((v) => v === null);
      return { ...x, garis: { ...x.garis, letak, pilih: berikut < 0 ? null : berikut }, pesan: "" };
    }
    case "G_ULANG":
      return { ...x, garis: { ...x.garis, pilih: 0, letak: kosongLetak(x.garis.data) }, pesan: "" };
    case "G_CEK":
      return cekGaris(x);
    case "U_DATA":
      return sah(a.i, DATA_URUT.length) ? { ...x, urut: { data: a.i, susun: [] }, pesan: "" } : x;
    case "U_KETUK":
      if (!sah(a.j, urutAktif(x).angka.length) || x.urut.susun.includes(a.j)) return x;
      return { ...x, urut: { ...x.urut, susun: [...x.urut.susun, a.j] }, pesan: "" };
    case "U_BATAL":
      return { ...x, urut: { ...x.urut, susun: x.urut.susun.slice(0, -1) }, pesan: "" };
    case "U_ULANG":
      return { ...x, urut: { ...x.urut, susun: [] }, pesan: "" };
    case "U_CEK":
      return cekUrut(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBandingK5B1B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBandingK5B1B = { alat: "banding"; pernah: string[] };
export const keadaanBandingK5B1B = (x: StateBandingK5B1B): KeadaanBandingK5B1B => ({ alat: "banding", pernah: x.pernah });

export const ucapBandingK5B1B = (x: StateBandingK5B1B): string => {
  const ps = pasangAktif(x);
  const lanjut = penentuKetemu(x) ? "Sekarang pilih tandanya." : `Periksa kolom ${TEMPAT5[x.banding.buka]}.`;
  return `Bandingkan ${titik(ps.a)} dan ${titik(ps.b)}. Periksa kolom dari kiri sampai ketemu digit yang berbeda. ${lanjut}`;
};
export const ucapGarisK5B1B = (x: StateBandingK5B1B): string => {
  const g = garisAktif(x);
  const j = x.garis.pilih;
  const sekarang = j === null ? "Semua sudah diletakkan. Tekan Periksa." : `Bilangan sekarang ${titik(g.angka[j])}. Ketuk ruasnya.`;
  return `Garis bilangan dari ${titik(g.dari)} sampai ${titik(g.dari + RUAS * g.langkah)}, tiap ruas ${titik(g.langkah)}, acuan ${titik(g.acuan)}. ${sekarang}`;
};
export const ucapUrutK5B1B = (x: StateBandingK5B1B): string => {
  const u = urutAktif(x);
  return `Urutkan ${u.arah}: ${u.angka.map(titik).join(", ")}. ${u.arah === "naik" ? "Ketuk dari yang terkecil." : "Ketuk dari yang terbesar."} Sudah ${x.urut.susun.length} dari ${u.angka.length}.`;
};
