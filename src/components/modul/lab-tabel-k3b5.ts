/**
 * Lab Tabel (Kelas 3 Bab 5, Sub-Bab B: Menyajikan Data dalam Bentuk Tabel): logika murni. Satu alat, tiga tampilan.
 *  Turus     : tambah atau kurangi garis 0 sampai 20. Garis kelima selalu dicoret miring (kelompok lima).
 *              "2 kelompok lima dan 3 = 13" dihitung dari banyak garis.
 *  Isi Tabel : data manik, huruf STATISTIKA, huruf MATEMATIKA, atau nilai ulangan. Tiap benda atau huruf diketuk
 *              menjadi satu turus pada barisnya; kolom banyak diisi anak (−1/+1) dan dibandingkan dengan turusnya.
 *  Baca      : terbanyak, tersedikit, lebih dari, dan kurang dari. Semua jawaban DIHITUNG dari data; nilai acuan sendiri
 *              tidak ikut dijumlahkan. Membaca hanya bila tabel sudah lengkap dan benar.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b5.mjs.
 */

export const MAKS_TURUS_K3B5 = 20;
export const MAKS_ISI = 20;
export const ACUAN_MIN = 5;
export const ACUAN_MAKS = 10;

export type IdTabel = "manik" | "statistika" | "matematika" | "nilai";
export const DAFTAR_TABEL: IdTabel[] = ["manik", "statistika", "matematika", "nilai"];

/** Manik: merah 6, biru 4, hitam 3 (13 manik). m = merah, b = biru, h = hitam. */
const DERET_MANIK = "mbmhmbmhbmmhb";
const NAMA_WARNA: Record<string, string> = { m: "Merah", b: "Biru", h: "Hitam" };
/** Nilai ulangan dari buku (20 data). */
const DATA_ULANGAN = [9, 9, 7, 8, 6, 10, 5, 9, 8, 7, 7, 9, 6, 6, 6, 8, 9, 10, 7, 7];

export type DefTabel = { nama: string; kepala: string; satuan: string; item: string[]; angka: boolean };
export const TABEL_K3B5: Record<IdTabel, DefTabel> = {
  manik: { nama: "Manik berwarna", kepala: "Warna", satuan: "manik", item: [...DERET_MANIK].map((c) => NAMA_WARNA[c]), angka: false },
  statistika: { nama: "Huruf STATISTIKA", kepala: "Huruf", satuan: "huruf", item: [..."STATISTIKA"], angka: false },
  matematika: { nama: "Huruf MATEMATIKA", kepala: "Huruf", satuan: "huruf", item: [..."MATEMATIKA"], angka: false },
  nilai: { nama: "Nilai ulangan", kepala: "Nilai", satuan: "siswa", item: DATA_ULANGAN.map(String), angka: true },
};

/** Baris tabel: kategori menurut urutan munculnya; nilai diurutkan dari terkecil. */
export function barisTabel(id: IdTabel): string[] {
  const t = TABEL_K3B5[id];
  const beda = [...new Set(t.item)];
  return t.angka ? beda.sort((p, q) => Number(p) - Number(q)) : beda;
}
export const banyakKategori = (id: IdTabel, kat: string): number => TABEL_K3B5[id].item.filter((v) => v === kat).length;
export const frekuensiTabel = (id: IdTabel): number[] => barisTabel(id).map((k) => banyakKategori(id, k));

/* ------------------------------ Turus kelompok lima ------------------------------ */

export const kelompokLimaK3B5 = (n: number): { penuh: number; sisa: number } => ({ penuh: Math.floor(n / 5), sisa: n % 5 });

/** Turus dalam teks: "卌 卌 |||". Nol menjadi teks kosong. */
export function teksTurusK3B5(n: number): string {
  const { penuh, sisa } = kelompokLimaK3B5(n);
  return [...Array.from({ length: penuh }, () => "卌"), ...(sisa > 0 ? ["|".repeat(sisa)] : [])].join(" ");
}

export function kalimatKelompok(n: number): string {
  const { penuh, sisa } = kelompokLimaK3B5(n);
  if (n === 0) return "Belum ada turus.";
  if (penuh === 0) return `${sisa} garis tegak = ${n}`;
  const lima = penuh === 1 ? "1 kelompok lima" : `${penuh} kelompok lima`;
  if (sisa === 0) return `${lima} = ${Array.from({ length: penuh }, () => "5").join(" + ")} = ${n}`;
  return `${lima} dan ${sisa} garis = ${[...Array.from({ length: penuh }, () => "5"), String(sisa)].join(" + ")} = ${n}`;
}

/* ------------------------------ Keadaan ------------------------------ */

export type TanyaBaca = "terbanyak" | "tersedikit" | "lebih" | "kurang";

export type StateTabelK3B5 = {
  turus: number;
  tabel: IdTabel;
  ketuk: boolean[];
  /** Kolom banyak yang diisi anak, satu per baris. */
  isi: number[];
  tanya: TanyaBaca | null;
  acuan: number;
  pernah: string[];
  pesan: string;
};

export type AksiTabelK3B5 =
  | { t: "TURUS"; d: 1 | -1 }
  | { t: "TABEL"; id: IdTabel }
  | { t: "KETUK"; k: number }
  | { t: "ISI"; r: number; d: 1 | -1 }
  | { t: "TANYA"; tanya: TanyaBaca }
  | { t: "ACUAN"; d: 1 | -1 }
  | { t: "RESET" };

const kosong = (id: IdTabel) => ({ ketuk: TABEL_K3B5[id].item.map(() => false), isi: barisTabel(id).map(() => 0) });

export const awalTabelK3B5 = (): StateTabelK3B5 => ({ turus: 0, tabel: "manik", ...kosong("manik"), tanya: null, acuan: 7, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

/** Banyak turus pada tiap baris dari benda yang sudah diketuk. */
export function turusBaris(x: StateTabelK3B5): number[] {
  const t = TABEL_K3B5[x.tabel];
  return barisTabel(x.tabel).map((k) => t.item.filter((v, i) => v === k && x.ketuk[i]).length);
}
export const semuaDiketuk = (x: StateTabelK3B5): boolean => x.ketuk.every(Boolean);
/** Tabel lengkap: semua benda sudah menjadi turus dan setiap angka banyak sama dengan turusnya. */
export function tabelLengkap(x: StateTabelK3B5): boolean {
  if (!semuaDiketuk(x)) return false;
  const tb = turusBaris(x);
  return x.isi.every((n, r) => n === tb[r]);
}

export type HasilBaca = { baris: number[]; jawab: string; kalimat: string };

/** Jawaban membaca tabel, dihitung dari data (bukan dari isian anak). Null bila pertanyaan tidak berlaku. */
export function bacaTabel(id: IdTabel, tanya: TanyaBaca, acuan: number): HasilBaca | null {
  const baris = barisTabel(id);
  const f = frekuensiTabel(id);
  const t = TABEL_K3B5[id];
  if (tanya === "terbanyak" || tanya === "tersedikit") {
    const n = tanya === "terbanyak" ? Math.max(...f) : Math.min(...f);
    const idx = f.map((v, r) => (v === n ? r : -1)).filter((r) => r >= 0);
    const nama = idx.map((r) => (t.angka ? `nilai ${baris[r]}` : baris[r]));
    const gabung = nama.length === 1 ? nama[0] : nama.length === 2 ? `${nama[0]} dan ${nama[1]}` : `${nama.slice(0, -1).join(", ")}, dan ${nama[nama.length - 1]}`;
    const kalimat = idx.length === 1 ? `${tanya === "terbanyak" ? "Terbanyak" : "Tersedikit"}: ${gabung}, ${n} ${t.satuan}.` : `${tanya === "terbanyak" ? "Terbanyak" : "Tersedikit"} ada ${idx.length}, sama banyak: ${gabung}, masing-masing ${n} ${t.satuan}.`;
    return { baris: idx, jawab: gabung, kalimat };
  }
  if (!t.angka) return null;
  const idx = baris.map((k, r) => ((tanya === "lebih" ? Number(k) > acuan : Number(k) < acuan) ? r : -1)).filter((r) => r >= 0);
  const jumlah = idx.reduce((s, r) => s + f[r], 0);
  const kata = tanya === "lebih" ? "lebih dari" : "kurang dari";
  if (idx.length === 0) return { baris: [], jawab: "0", kalimat: `Tidak ada nilai ${kata} ${acuan}. Banyak siswanya 0.` };
  const rumus = idx.length === 1 ? `${jumlah}` : `${idx.map((r) => f[r]).join(" + ")} = ${jumlah}`;
  return { baris: idx, jawab: String(jumlah), kalimat: `Nilai ${kata} ${acuan}: ${idx.map((r) => baris[r]).join(", ")}. Banyak siswa ${rumus}. Nilai ${acuan} sendiri tidak ikut.` };
}

function catat(x: StateTabelK3B5): StateTabelK3B5 {
  let p = tambah(x.pernah, `turus:${x.turus}`);
  if (tabelLengkap(x)) {
    p = tambah(p, `lengkap:${x.tabel}`);
    if (x.tanya && bacaTabel(x.tabel, x.tanya, x.acuan)) p = tambah(p, x.tanya === "lebih" || x.tanya === "kurang" ? `baca:${x.tabel}:${x.tanya}:${x.acuan}` : `baca:${x.tabel}:${x.tanya}`);
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahTabelK3B5(x: StateTabelK3B5, a: AksiTabelK3B5): StateTabelK3B5 {
  switch (a.t) {
    case "TURUS": {
      const baru = x.turus + a.d;
      if (baru < 0) return { ...x, pesan: "Belum ada turus untuk dihapus." };
      if (baru > MAKS_TURUS_K3B5) return { ...x, pesan: `Di lab ini, turus paling banyak ${MAKS_TURUS_K3B5}: empat kelompok lima.` };
      return catat({ ...x, turus: baru, pesan: "" });
    }
    case "TABEL":
      return catat({ ...x, tabel: a.id, ...kosong(a.id), pesan: "" });
    case "KETUK": {
      if (a.k < 0 || a.k >= x.ketuk.length) return x;
      if (x.ketuk[a.k]) return { ...x, pesan: `Yang ini sudah dicacah. Satu ${TABEL_K3B5[x.tabel].satuan}, satu garis turus.` };
      return catat({ ...x, ketuk: x.ketuk.map((b, k) => b || k === a.k), pesan: "" });
    }
    case "ISI": {
      if (a.r < 0 || a.r >= x.isi.length) return x;
      const baru = x.isi[a.r] + a.d;
      if (baru < 0 || baru > MAKS_ISI) return { ...x, pesan: `Kolom banyak diisi 0 sampai ${MAKS_ISI}.` };
      return catat({ ...x, isi: x.isi.map((n, r) => (r === a.r ? baru : n)), pesan: "" });
    }
    case "TANYA": {
      if ((a.tanya === "lebih" || a.tanya === "kurang") && !TABEL_K3B5[x.tabel].angka) {
        return { ...x, pesan: "Lebih dari dan kurang dari dipakai untuk tabel nilai. Pilih tabel Nilai ulangan." };
      }
      return catat({ ...x, tanya: a.tanya, pesan: tabelLengkap(x) ? "" : "Lengkapi tabelnya dulu di Isi Tabel: semua turus dan semua angka banyak." });
    }
    case "ACUAN": {
      const baru = x.acuan + a.d;
      if (baru < ACUAN_MIN || baru > ACUAN_MAKS) return { ...x, pesan: `Nilai acuan ${ACUAN_MIN} sampai ${ACUAN_MAKS}.` };
      return catat({ ...x, acuan: baru, pesan: "" });
    }
    case "RESET":
      return awalTabelK3B5();
  }
}

/* ------------------------------ Laporan untuk misi ------------------------------ */

export type KeadaanTabelK3B5 = { alat: "tabel"; turus: number; tabel: IdTabel; lengkap: boolean; pernah: string[] };

export const keadaanTabelK3B5 = (x: StateTabelK3B5): KeadaanTabelK3B5 => ({ alat: "tabel", turus: x.turus, tabel: x.tabel, lengkap: tabelLengkap(x), pernah: x.pernah });

/* ------------------------------ Ucapan ------------------------------ */

export const ucapTurusK3B5 = (x: StateTabelK3B5): string =>
  x.turus === 0 ? "Belum ada turus. Tambah garis satu per satu. Garis kelima dicoret miring." : `${kalimatKelompok(x.turus)}. Turusnya: ${teksTurusK3B5(x.turus)}.`;

export function ucapIsiK3B5(x: StateTabelK3B5): string {
  const t = TABEL_K3B5[x.tabel];
  if (tabelLengkap(x)) return `Tabel ${t.nama} lengkap. Setiap angka banyak sama dengan turusnya. Sekarang baca tabelnya.`;
  if (!semuaDiketuk(x)) return `Ketuk tiap ${t.satuan} satu per satu. Sudah ${x.ketuk.filter(Boolean).length} dari ${t.item.length}.`;
  return "Semua sudah menjadi turus. Sekarang isi kolom banyak sama dengan turus tiap baris.";
}

export function ucapBacaK3B5(x: StateTabelK3B5): string {
  if (!tabelLengkap(x)) return "Lengkapi tabelnya dulu di Isi Tabel, lalu baca tabelnya.";
  if (!x.tanya) return "Pilih pertanyaan: terbanyak, tersedikit, lebih dari, atau kurang dari.";
  return bacaTabel(x.tabel, x.tanya, x.acuan)?.kalimat ?? "Lebih dari dan kurang dari dipakai untuk tabel nilai.";
}
