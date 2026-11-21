/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-mosaik-k4b5b.mjs.
 * Bangun digambar dari koordinat titik sudut; nama bangun, banyak sisi, sudut siku-siku, sisi sejajar, dan banyak segitiga hasil belahan DIHITUNG dari koordinat.
 * Empat metode tiap misi: IGIL "Pasang Keping, Bagi Jadi Segitiga, Mosaik Banyak Cara" (tugas nama, sisi, dan kata), Fit the Pieces (Pasang Keping),
 * Cut Into Triangles (Bagi Jadi Segitiga), dan Many Ways Mosaic (Mosaik Banyak Cara, belah dari satu sudut).
 * Jawaban: memilih nama bangun atau banyak segitiga (klik), menulis satu angka 1 sampai 9 di kanvas, dan mengucapkan satu kata (persegi, segitiga, jajargenjang, trapesium, beraturan) atau bilangan.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Nama bilangan 0 sampai 99 dalam kata (tanpa digit). */
export const kataBil = (n: number): string => {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return `${SATUAN[p]} puluh${s ? ` ${SATUAN[s]}` : ""}`;
};
export const kata = kataBil;

/** Ubah teks berangka menjadi ucapan tanpa digit: "5 segitiga" menjadi "lima segitiga", tanda kali dan sama dengan dieja. Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return t
    .replace(/\s*×\s*/g, " kali ")
    .replace(/\s*=\s*/g, " sama dengan ")
    .replace(/\d+/g, (m) => kataBil(Number(m)))
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Geometri murni dari koordinat ------------------------------ */
export type Titik = [number, number];
export type Bidang = Titik[];
const EPS = 1e-6;
const dekat = (a: number, b: number): boolean => Math.abs(a - b) < EPS * Math.max(1, Math.abs(a), Math.abs(b)) * 10;

export const panjang = (a: Titik, b: Titik): number => Math.hypot(b[0] - a[0], b[1] - a[1]);
/** Panjang tiap sisi, urut dari titik sudut pertama. */
export const panjangSisi = (p: Bidang): number[] => p.map((a, i) => panjang(a, p[(i + 1) % p.length]));
export const banyakSisi = (p: Bidang): number => p.length;
/** Luas lewat rumus tali sepatu (hanya untuk uji dan pemeriksaan susunan). */
export const luasBidang = (p: Bidang): number => Math.abs(p.reduce((s, a, i) => s + (a[0] * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * a[1]), 0)) / 2;
/** Banyak sudut siku-siku (hasil kali titik dua sisi pada sudut itu sama dengan nol). */
export const sudutSiku = (p: Bidang): number => p.filter((a, i) => {
  const b = p[(i + 1) % p.length];
  const z = p[(i + p.length - 1) % p.length];
  return dekat((b[0] - a[0]) * (z[0] - a[0]) + (b[1] - a[1]) * (z[1] - a[1]), 0);
}).length;
/** Banyak pasang sisi sejajar (hasil kali silang dua sisi sama dengan nol). */
export const pasangSejajar = (p: Bidang): number => {
  let n = 0;
  for (let i = 0; i < p.length; i += 1)
    for (let j = i + 1; j < p.length; j += 1) {
      const a = p[i];
      const b = p[(i + 1) % p.length];
      const c = p[j];
      const d = p[(j + 1) % p.length];
      if (dekat((b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]), 0)) n += 1;
    }
  return n;
};
const semuaSama = (xs: number[]): boolean => xs.every((x) => dekat(x, xs[0]));
/** Sisi yang bersebelahan sama panjang berpasangan (layang-layang): banyak sudut yang diapit dua sisi sama panjang. */
const sisiSebelahSama = (p: Bidang): number => panjangSisi(p).filter((x, i, xs) => dekat(x, xs[(i + 1) % xs.length])).length;
/** Nama bangun datar cembung, dihitung dari koordinat. */
export function namaBangun(p: Bidang): string {
  const n = p.length;
  const sama = semuaSama(panjangSisi(p));
  const siku = sudutSiku(p);
  const sej = pasangSejajar(p);
  if (n === 3) return "segitiga";
  if (n === 4) {
    if (sama && siku === 4) return "persegi";
    if (siku === 4) return "persegi panjang";
    if (sama && sej === 2) return "belah ketupat";
    if (sej === 2) return "jajargenjang";
    if (sej === 1) return "trapesium";
    if (sisiSebelahSama(p) >= 2) return "layang-layang";
    return "segiempat";
  }
  const awal = ["", "", "", "", "", "segilima", "segienam", "segi tujuh", "segi delapan", "segi sembilan"][n] ?? `segi-${n}`;
  return sama ? `${awal} beraturan` : awal;
}
/** Segi banyak beraturan berjari-jari r di titik (cx, cy), titik pertama di atas. */
export function beraturan(n: number, r: number, cx = 0, cy = 0): Bidang {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Titik;
  });
}
/** Belah dari titik tengah: satu segitiga tiap sisi (titik tengah dihitung dari rata-rata titik sudut bangun beraturan). */
export function belahTengah(p: Bidang): Bidang[] {
  const c: Titik = [p.reduce((s, a) => s + a[0], 0) / p.length, p.reduce((s, a) => s + a[1], 0) / p.length];
  return p.map((a, i) => [c, a, p[(i + 1) % p.length]]);
}
/** Belah dari satu titik sudut (titik pertama): n - 2 segitiga. */
export function belahSudut(p: Bidang): Bidang[] {
  return Array.from({ length: p.length - 2 }, (_, i) => [p[0], p[i + 1], p[i + 2]]);
}
/** Belahan sah: jumlah luas segitiga sama dengan luas bangun, dan semua segitiga tidak merosot. */
export const belahanSah = (p: Bidang, bagian: Bidang[]): boolean => bagian.every((b) => luasBidang(b) > EPS) && dekat(bagian.reduce((s, b) => s + luasBidang(b), 0), luasBidang(p));
/** Segitiga hasil belah dari titik tengah semuanya sama besar (bangun beraturan). */
export const semuaSamaBesar = (bagian: Bidang[]): boolean => semuaSama(bagian.map(luasBidang));

/* ------------------------------ Bangun yang dipakai ------------------------------ */
export const BANGUN: Record<string, Bidang> = {
  persegi: [[0, 0], [4, 0], [4, 4], [0, 4]],
  "persegi panjang": [[0, 0], [6, 0], [6, 3], [0, 3]],
  jajargenjang: [[0, 0], [5, 0], [7, 3], [2, 3]],
  "belah ketupat": [[3, 0], [6, 2], [3, 4], [0, 2]],
  "layang-layang": [[3, 0], [5, 3], [3, 7], [1, 3]],
  trapesium: [[0, 0], [6, 0], [5, 3], [1, 3]],
  segitiga: [[0, 0], [5, 0], [1, 3]],
};
/** Segi banyak beraturan menurut banyak sisi (jari-jari 3). */
export const beraturanN = (n: number): Bidang => beraturan(n, 3);
/** Segi banyak cembung tidak beraturan dengan n sisi (jari-jari berbeda tiap sudut), untuk belahan dari satu sudut. */
export const cembungN = (n: number): Bidang =>
  Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const r = i % 2 === 0 ? 3 : 2.4;
    return [r * Math.cos(a), r * Math.sin(a)] as Titik;
  });

/* ------------------------------ Susunan dua keping (Fit the Pieces) ------------------------------ */
export type Varian = "persegi" | "jajargenjang" | "segitiga" | "belah ketupat";
export type Susunan = { keping: [Bidang, Bidang]; hasil: Bidang; sisi: string };
export const SUSUNAN: Record<Varian, Susunan> = {
  persegi: { keping: [[[0, 0], [3, 0], [0, 3]], [[3, 0], [3, 3], [0, 3]]], hasil: [[0, 0], [3, 0], [3, 3], [0, 3]], sisi: "sisi miring" },
  jajargenjang: { keping: [[[0, 0], [4, 0], [1, 3]], [[4, 0], [5, 3], [1, 3]]], hasil: [[0, 0], [4, 0], [5, 3], [1, 3]], sisi: "sisi yang panjangnya sama dengan alas" },
  segitiga: { keping: [[[0, 0], [3, 0], [0, 4]], [[0, 0], [-3, 0], [0, 4]]], hasil: [[-3, 0], [3, 0], [0, 4]], sisi: "sisi tegak yang sama panjang" },
  "belah ketupat": { keping: [[[3, 0], [6, 2], [3, 4]], [[3, 0], [3, 4], [0, 2]]], hasil: [[3, 0], [6, 2], [3, 4], [0, 2]], sisi: "alas yang sama" },
};
/** Susunan sah: luas kedua keping sama besar dan jumlahnya sama dengan luas hasil; semua titik sudut keping ada pada hasil. */
export function susunanSah(s: Susunan): boolean {
  const [a, b] = s.keping;
  const dalam = (t: Titik) => s.hasil.some((h) => dekat(h[0], t[0]) && dekat(h[1], t[1])) || titikDalam(s.hasil, t);
  return dekat(luasBidang(a), luasBidang(b)) && dekat(luasBidang(a) + luasBidang(b), luasBidang(s.hasil)) && [...a, ...b].every(dalam);
}
/** Titik di dalam atau pada tepi bidang cembung. */
export function titikDalam(p: Bidang, t: Titik): boolean {
  let tanda = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    const c = (b[0] - a[0]) * (t[1] - a[1]) - (b[1] - a[1]) * (t[0] - a[0]);
    if (Math.abs(c) < EPS) continue;
    const s = c > 0 ? 1 : -1;
    if (tanda === 0) tanda = s;
    else if (s !== tanda) return false;
  }
  return true;
}

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Nama (IGIL, klik): bangun digambar, pilih namanya. */
export type LNama = { tipe: "nama"; bangun: string; pil: Pil };
/** Sisi (IGIL, kanvas): banyak sisi bangun beraturan n sisi (satu angka). */
export type LSisi = { tipe: "sisi"; n: number };
/** Kata (IGIL, suara): satu kata dari ciri bangun. */
export type KataSebut = "persegi" | "segitiga" | "jajargenjang" | "trapesium" | "beraturan";
export type LSebut = { tipe: "sebut"; kata: KataSebut };
/** Pasang Keping (Fit the Pieces, klik atau suara): dua keping sama besar dipasang, bangun apa hasilnya. */
export type LPasang = { tipe: "pasang"; varian: Varian; pil?: Pil };
/** Pasang Keping (kanvas): persegi panjang dari kolom x baris persegi kecil, banyak keping. */
export type LKeping = { tipe: "keping"; kolom: number; baris: number };
/** Bagi Jadi Segitiga (Cut Into Triangles): bangun beraturan n sisi dibelah dari titik tengah. Klik: pilih banyak segitiga, kanvas dan suara: banyaknya. */
export type LBagi = { tipe: "bagi"; n: number; pil?: Pil };
/** Mosaik Banyak Cara (Many Ways Mosaic): segi banyak n sisi dibelah dari satu sudut, n - 2 segitiga. */
export type LDiagonal = { tipe: "diagonal"; n: number; bangun?: string; pil?: Pil };
export type LangkahDasar = LNama | LSisi | LSebut | LPasang | LKeping | LBagi | LDiagonal;
/** Tugas yang boleh dibungkus Cari kesalahan (jawaban tokoh adalah salah satu pilihan klik). */
export type DasarSalah = LPasang | LBagi | LDiagonal | LNama;
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pasang" | "bagi" | "mosaik";
export const URUT_METODE: Metode[] = ["igil", "pasang", "bagi", "mosaik"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pasang Keping, Bagi Jadi Segitiga, Mosaik Banyak Cara",
  pasang: "Fit the Pieces: Pasang Keping",
  bagi: "Cut Into Triangles: Bagi Jadi Segitiga",
  mosaik: "Many Ways Mosaic: Mosaik Banyak Cara",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", pasang: "\u{1F9E9}", bagi: "\u{1F53A}", mosaik: "\u{1F3A8}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", pasang: "Fit the Pieces", bagi: "Cut Into Triangles", mosaik: "Many Ways Mosaic" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Ukuran dihitung dari koordinat ------------------------------ */
/** Bidang yang digambar untuk tugas (bangun utama). */
export function bidangTugas(d: LangkahDasar): Bidang {
  switch (d.tipe) {
    case "nama":
      return BANGUN[d.bangun];
    case "sisi":
      return beraturanN(d.n);
    case "sebut":
      return d.kata === "beraturan" ? beraturanN(6) : BANGUN[d.kata];
    case "pasang":
      return SUSUNAN[d.varian].hasil;
    case "keping":
      return [[0, 0], [d.kolom * 2, 0], [d.kolom * 2, d.baris * 2], [0, d.baris * 2]];
    case "bagi":
      return beraturanN(d.n);
    case "diagonal":
      return d.bangun ? BANGUN[d.bangun] : cembungN(d.n);
  }
}
/** Segitiga hasil belahan (Cut Into Triangles dan Mosaik Banyak Cara). */
export const bagianTugas = (d: LangkahDasar): Bidang[] => (d.tipe === "bagi" ? belahTengah(bidangTugas(d)) : d.tipe === "diagonal" ? belahSudut(bidangTugas(d)) : []);
/** Persegi kecil penyusun persegi panjang (tugas keping): kolom x baris. */
export const kepingKecil = (d: LKeping): Bidang[] => {
  const hasil: Bidang[] = [];
  for (let r = 0; r < d.baris; r += 1) for (let c = 0; c < d.kolom; c += 1) hasil.push([[c * 2, r * 2], [c * 2 + 2, r * 2], [c * 2 + 2, r * 2 + 2], [c * 2, r * 2 + 2]]);
  return hasil;
};
/** Banyak segitiga hasil belahan, dihitung dari koordinat. */
export const banyakBagian = (d: LBagi | LDiagonal): number => bagianTugas(d).length;
/** Nama bangun hasil pasangan, dihitung dari koordinat hasil. */
export const namaHasil = (d: LPasang): string => namaBangun(SUSUNAN[d.varian].hasil);
export const teksSegitiga = (n: number): string => `${n} segitiga`;

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kata jawaban suara untuk nama bangun (satu kata). */
export const kataNama = (nama: string): string => (nama === "persegi panjang" ? "persegi panjang" : nama);

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari koordinat. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "nama":
      return cara === "klik" ? sebutan(namaBangun(BANGUN[l.bangun])) : null;
    case "sisi":
      return cara === "kanvas" ? angka(banyakSisi(bidangTugas(l))) : null;
    case "sebut":
      return cara === "suara" ? sebutan(l.kata) : null;
    case "pasang":
      return cara === "klik" || cara === "suara" ? sebutan(namaHasil(l)) : null;
    case "keping":
      return cara === "kanvas" ? angka(kepingKecil(l).length) : null;
    case "bagi":
    case "diagonal":
      return cara === "klik" ? sebutan(teksSegitiga(banyakBagian(l))) : angka(banyakBagian(l));
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas, kecuali Cari kesalahan. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Pengecoh bilangan untuk jawaban suara: kesalahan lazim (sama dengan banyak sisi, satu kurang atau lebih, kali dua), lalu bilangan di dekatnya. 1 sampai 99 dan berbeda dari jawaban benar. */
export function pengecoh(l: Langkah, cara: Cara): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  const calon = d.tipe === "bagi" ? [d.n - 1, d.n + 1, d.n * 2, d.n - 2] : d.tipe === "diagonal" ? [d.n - 1, d.n, d.n - 3, d.n + 1] : [n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "sebut" || d.tipe === "sisi" || d.tipe === "keping") return [];
  return d.pil ? [...d.pil] : [];
}
const KATA_LAIN: Record<string, string[]> = {
  persegi: ["trapesium", "segitiga"],
  segitiga: ["persegi", "trapesium"],
  jajargenjang: ["persegi", "segitiga"],
  trapesium: ["jajargenjang", "persegi"],
  beraturan: ["bebas", "kira-kira"],
};
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  return sisipkan(k.nama, (KATA_LAIN[k.nama] ?? ["persegi", "segitiga"]).slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "meja kerja" : "diagram");
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
const NAMA_SEGI: Record<number, string> = { 3: "segitiga", 4: "segiempat", 5: "segilima", 6: "segienam", 7: "segi tujuh", 8: "segi delapan", 9: "segi sembilan" };
const sebutN = (n: number): string => `${NAMA_SEGI[n] ?? "segi banyak"} beraturan`;

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(ucapkan(kalimatKunciMentah(l, cara)));
}
function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "nama": {
      const p = BANGUN[d.bangun];
      return `Bangun ini punya ${banyakSisi(p)} sisi, ${sudutSiku(p)} sudut siku-siku, dan ${pasangSejajar(p)} pasang sisi sejajar, jadi namanya ${namaBangun(p)}.`;
    }
    case "sisi":
      return `${sebutN(d.n)} punya ${d.n} sudut dan ${d.n} sisi.`;
    case "sebut":
      return d.kata === "beraturan" ? "Bangun yang semua sisinya sama panjang dan semua sudutnya sama besar disebut beraturan." : `Bangun itu adalah ${d.kata}.`;
    case "pasang":
      return `Dua keping sama besar dipasang pada ${SUSUNAN[d.varian].sisi}, dan hasilnya ${namaHasil(d)}.`;
    case "keping":
      return `Ada ${d.baris} baris dengan ${d.kolom} keping tiap baris, jadi ${d.baris} × ${d.kolom} = ${d.baris * d.kolom} keping.`;
    case "bagi":
      return cara === "klik" || cara === "kanvas" || cara === "suara" ? `Dari titik tengah ada satu segitiga tiap sisi, ${sebutN(d.n)} punya ${d.n} sisi, jadi ada ${d.n} segitiga.` : "";
    case "diagonal":
      return `Dari satu sudut, segi banyak dengan ${d.n} sisi terbagi menjadi ${d.n} - 2 = ${d.n - 2} segitiga.`;
  }
}
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  switch (l.tipe) {
    case "nama":
      return `${aw}: lihat ${g} ini. Keramik ini punya sisi dan sudut yang bisa dihitung. Bangun apa namanya? ${akhir}`;
    case "sisi":
      return `${aw}: lihat ${g} ini. Keramik ini beraturan, semua sisinya sama panjang. Sisinya ada berapa? ${akhir}`;
    case "sebut":
      return `${aw}: lihat ${g} ini. ${ciriSebut(l.kata)} Ucapkan satu kata.`;
    case "pasang":
      return `${aw}: lihat ${g} ini. Dua keping sama besar dipasang pada ${SUSUNAN[l.varian].sisi}. Bangun apa yang terbentuk? ${akhir}`;
    case "keping":
      return `${aw}: lihat ${g} ini. Keramik persegi panjang disusun dari persegi kecil, ${l.baris} baris dengan ${l.kolom} keping tiap baris. Kepingnya ada berapa? ${akhir}`;
    case "bagi":
      return `${aw}: lihat ${g} ini. Keramik beraturan dibelah dari titik tengah ke tiap sudut. Segitiga yang terbentuk ada berapa? ${akhir}`;
    case "diagonal":
      return `${aw}: lihat ${g} ini. Keramik dibelah dari satu sudut ke sudut lain yang tidak bersebelahan. Segitiga yang terbentuk ada berapa? ${akhir}`;
  }
}
function ciriSebut(k: KataSebut): string {
  switch (k) {
    case "persegi":
      return "Bangun ini punya empat sisi sama panjang dan empat sudut siku-siku. Bangun apa namanya?";
    case "segitiga":
      return "Bangun ini punya tiga sisi dan tiga sudut. Bangun apa namanya?";
    case "jajargenjang":
      return "Bangun ini punya empat sisi, dua pasang sisi sejajar, dan tidak punya sudut siku-siku. Bangun apa namanya?";
    case "trapesium":
      return "Bangun ini punya empat sisi dan tepat sepasang sisi sejajar. Bangun apa namanya?";
    case "beraturan":
      return "Bangun yang semua sisinya sama panjang dan semua sudutnya sama besar disebut bangun apa?";
  }
}
/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  void cara;
  return kapKal(ucapkan(kalimatTanyaMentah(d)));
}
function kalimatTanyaMentah(d: LangkahDasar): string {
  switch (d.tipe) {
    case "nama":
      return "Bangun apa namanya?";
    case "sisi":
      return "Sisinya ada berapa?";
    case "sebut":
      return "Bangun apa namanya?";
    case "pasang":
      return "Bangun apa yang terbentuk?";
    case "keping":
      return "Kepingnya ada berapa?";
    case "bagi":
    case "diagonal":
      return "Segitiganya ada berapa?";
  }
}
/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "nama":
      return "Hitung dulu sisinya, lalu periksa sudut siku-siku dan sisi yang sejajar. Cocokkan dengan ciri tiap nama.";
    case "sisi":
      return "Hitung sisi satu per satu mulai dari satu sudut, dan jangan ada yang terlewat atau terhitung dua kali.";
    case "sebut":
      return "Ingat kembali ciri bangun datar: banyak sisi, sudut siku-siku, dan sisi yang sejajar. Ucapkan namanya.";
    case "pasang":
      return "Lihat sisi yang dipertemukan, lalu bayangkan keping itu menempel tanpa celah dan tanpa tumpukan. Perhatikan bentuk garis tepi yang baru.";
    case "keping":
      return "Hitung keping dalam satu baris, lalu kalikan dengan banyak baris.";
    case "bagi":
      return "Garis ditarik dari titik tengah ke tiap sudut. Hitung sudutnya, dan satu segitiga lahir di antara dua sudut yang bersebelahan.";
    case "diagonal":
      return "Garis ditarik dari satu sudut saja ke sudut yang tidak bersebelahan. Hitung garisnya, lalu banyak segitiga lebih banyak satu dari banyak garis.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
const pilBaris = (x?: Pil): string[] => (x ? [`pilihan: ${x.join(", ")}`] : []);
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). Baris pertama dan terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const klik = cara === "klik";
  switch (l.tipe) {
    case "nama": {
      const p = BANGUN[l.bangun];
      return [`bangun: ${banyakSisi(p)} sisi`, `sudut siku-siku: ${sudutSiku(p)}`, `pasang sisi sejajar: ${pasangSejajar(p)}`, `sisi sama panjang: ${semuaSama(panjangSisi(p)) ? "semuanya" : "hanya yang berhadapan"}`, ...(klik ? pilBaris(l.pil) : []), "nama bangun: ?"];
    }
    case "sisi":
      return [`bangun beraturan: ${l.n} sudut`, "sisinya sama panjang semua", "banyak sisi: ?"];
    case "sebut":
      return [ciriSebut(l.kata).replace(/ Bangun apa namanya\?$| disebut bangun apa\?$/, ""), "kata yang dicari: ?"];
    case "pasang":
      return [`dua keping sama besar, dipasang pada ${SUSUNAN[l.varian].sisi}`, ...(klik ? pilBaris(l.pil) : []), "bangun hasil: ?"];
    case "keping":
      return [`persegi panjang: ${l.baris} baris × ${l.kolom} keping`, "banyak keping: ?"];
    case "bagi":
      return [`beraturan: ${l.n} sisi, dibelah dari titik tengah`, ...(klik ? pilBaris(l.pil) : []), "banyak segitiga: ?"];
    case "diagonal":
      return [`segi banyak: ${l.n} sisi, dibelah dari satu sudut`, ...(klik ? pilBaris(l.pil) : []), "banyak segitiga: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);

/** Bilangan dengan titik ribuan (bilangan di sini kecil, jadi tampil apa adanya). */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
