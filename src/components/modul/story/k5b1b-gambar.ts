import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (membandingkan dari kiri, tanda, mengurutkan, garis bilangan dengan patokan),
 * cerita Hari Pertandingan di Stadion Kota. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman stadion (rumput, papan krem), tabel tempat lima kolom yang digambar SUNGGUH dari bilangan (angka rata kanan, kolom sejajar ke bawah),
 * kartu tribun, dan garis bilangan dengan patokan yang titiknya diletakkan sebanding dengan bilangannya.
 * Data Story: penonton empat tribun (Timur 9.060, Selatan 18.705, Utara 24.350, Barat 30.402) dan Utara pekan lalu 24.305.
 * Tokoh: Bima (berkaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara kecil),
 * Pak Hasto (berpeci hitam, berpengeras suara, membawa daftar), Bu Lestari (berkacamata). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  hijauTua: "#166534",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF3C7",
  rumput: "#BBF7D0",
  rumputTua: "#4ADE80",
  papan: "#FFF7E6",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sel: "#F1F5F9",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  emasMuda: "#FDE68A",
  biruMuda: "#DBEAFE",
};
/** Warna tiap tribun: Timur, Selatan, Utara, Barat. */
export const WT = ["#F97316", "#38BDF8", "#22C55E", "#A78BFA"] as const;

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  tertawa: "\u{1F602}",
  seru: "\u{2757}",
  tiket: "\u{1F3AB}",
  musik: "\u{1F3B5}",
  mikrofon: "\u{1F3A4}",
  bendera: "\u{1F6A9}",
  kacang: "\u{1F95C}",
  telinga: "\u{1F649}",
  penggaris: "\u{1F4CF}",
  kiri: "\u{1F448}",
  mulut: "\u{1F444}",
  piala: "\u{1F3C6}",
  pengeras: "\u{1F4E2}",
  kas: "\u{1F4B0}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
const b2 = (n: number): number => Math.round(n * 100) / 100;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis: garisW, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (paling banyak sekitar 27 huruf supaya tidak tertutup lencana n/10). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Latar stadion ------------------------------ */
/** Rumput lapangan `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.rumputTua, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, W.rumputTua, 1.2, { z: -2 })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];
/** Papan krem `${id}` (pojok kiri-atas x, y). */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, W.papan, W.coklat, { rx: 4, tebal: 1.8, z: -1 });

/* ------------------------------ Bilangan ------------------------------ */
export type Tribun = { nama: string; banyak: number };
/** Data Story (bersambung dari Sub-Bab A): penonton empat tribun, satuan orang. */
export const TRIBUN: Tribun[] = [
  { nama: "Timur", banyak: 9060 },
  { nama: "Selatan", banyak: 18705 },
  { nama: "Utara", banyak: 24350 },
  { nama: "Barat", banyak: 30402 },
];
/** Penonton Tribun Utara pekan lalu (beda dari pekan ini hanya di puluhan dan satuan). */
export const UTARA_LALU = 24305;
/** Bilangan dengan titik pemisah ribuan: 24350 menjadi "24.350". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Tabel tempat lima kolom ------------------------------ */
export type OpsiTabel = { x0: number; y0: number; sel: number; tinggi: number; jarak: number };
/** Tabel standar: lima kolom lebar 28 mulai x = 100, baris pertama di y = 56, tiap baris setinggi 22 berjarak 26. */
export const TABEL: OpsiTabel = { x0: 100, y0: 56, sel: 28, tinggi: 22, jarak: 26 };
export const NAMA_KOLOM = ["ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;
/** Lima angka rata kanan (tempat kosong di kiri berupa teks kosong): 9060 menjadi ["", "9", "0", "6", "0"]. */
export const digitDari = (angka: string | number): string[] => {
  const bersih = String(angka).replace(/\./g, "");
  const geser = 5 - bersih.length;
  return Array.from({ length: 5 }, (_, j) => (j >= geser ? bersih[j - geser] : ""));
};
/** Pusat tengah kolom ke-j. */
export const xKolom = (o: OpsiTabel, j: number): number => b2(o.x0 + j * o.sel + o.sel / 2);
export const yBaris = (o: OpsiTabel, i: number): number => b2(o.y0 + i * o.jarak);
/** Judul kolom: `${id}-hp` ("puluh" di atas kolom pertama) dan `${id}-h0..h4`. */
export function kepalaTabel(id: string, o: OpsiTabel = TABEL): Obj[] {
  return [
    teks(`${id}-hp`, xKolom(o, 0), b2(o.y0 - 16), "puluh", 6.5, W.coklat, { z: 3 }),
    ...NAMA_KOLOM.map((n, j) => teks(`${id}-h${j}`, xKolom(o, j), b2(o.y0 - 8), n, 6.5, W.coklat, { z: 3 })),
  ];
}
export const idKepala = (id: string): string[] => [`${id}-hp`, ...NAMA_KOLOM.map((_, j) => `${id}-h${j}`)];
/** Baris ke-i tabel: nama `${id}-nm`, bilangan `${id}-no`, lima sel `${id}-c0..c4`, dan angka `${id}-d{j}` (hanya sel yang berisi). */
export function barisTabel(id: string, o: OpsiTabel, i: number, nama: string, angka: number | string, u = 13): Obj[] {
  const tulis = typeof angka === "number" ? rb(angka) : angka;
  const y = yBaris(o, i);
  const hasil: Obj[] = [];
  if (nama) hasil.push(teks(`${id}-nm`, 8, b2(y + o.tinggi / 2 + 3), nama, 8, W.hijauTua, { anchor: "start", z: 3 }));
  hasil.push(teks(`${id}-no`, o.x0 - 6, b2(y + o.tinggi / 2 + 3.5), tulis, 9, W.biru, { anchor: "end", z: 3 }));
  digitDari(tulis).forEach((d, j) => {
    hasil.push(kotak(`${id}-c${j}`, b2(o.x0 + j * o.sel), y, o.sel, o.tinggi, d ? W.putih : W.sel, W.biru, { rx: 2, tebal: 1.2, z: 1 }));
    if (d) hasil.push(teks(`${id}-d${j}`, xKolom(o, j), b2(y + o.tinggi / 2 + 4.6), d, u, W.biru, { z: 3 }));
  });
  return hasil;
}
export const idBaris = (id: string, angka: number | string, denganNama = true): string[] => {
  const tulis = typeof angka === "number" ? rb(angka) : angka;
  const d = digitDari(tulis);
  return [...(denganNama ? [`${id}-nm`] : []), `${id}-no`, ...d.map((_, j) => `${id}-c${j}`), ...d.flatMap((x, j) => (x ? [`${id}-d${j}`] : []))];
};
/** Id sel kolom ke-j pada baris-baris yang diminta. */
export const selKolom = (j: number, ...baris: string[]): string[] => baris.map((b) => `${b}-c${j}`);
export const angkaKolom = (j: number, ...baris: string[]): string[] => baris.map((b) => `${b}-d${j}`);

/* ------------------------------ Garis bilangan dengan patokan ------------------------------ */
export type OpsiGB = { x0: number; x1: number; dari: number; sampai: number; y: number };
/** Garis bilangan Story: nol sampai tiga puluh lima ribu pada lebar 268, garis di y = 104. */
export const GB_STORY: OpsiGB = { x0: 16, x1: 284, dari: 0, sampai: 35000, y: 104 };
/** Garis bilangan Metode Global: nol sampai empat puluh ribu. */
export const GB_LUAR: OpsiGB = { x0: 16, x1: 284, dari: 0, sampai: 40000, y: 104 };
/** Garis bilangan yang diperbesar di sekitar lima puluh ribu (empat puluh lima ribu sampai lima puluh lima ribu). */
export const GB_DEKAT: OpsiGB = { x0: 16, x1: 284, dari: 45000, sampai: 55000, y: 104 };
/** Titik x untuk bilangan n pada garis bilangan o. */
export const xGB = (o: OpsiGB, n: number): number => b2(o.x0 + ((n - o.dari) * (o.x1 - o.x0)) / (o.sampai - o.dari));
/** Garis sumbu `${id}-ax`. */
export const sumbuGB = (id: string, o: OpsiGB): Obj => garis(`${id}-ax`, o.x0 - 6, o.y, o.x1 - o.x0 + 14, 0, W.biru, 2.2, { z: 3 });
/** Patokan ke-j: garis tegak `${id}-t{j}` dan angkanya `${id}-l{j}` di bawah garis. */
export function patokanGB(id: string, o: OpsiGB, daftar: number[], j0 = 0): Obj[] {
  return daftar.flatMap((n, q) => {
    const j = j0 + q;
    return [garis(`${id}-t${j}`, xGB(o, n), o.y - 6, 0, 12, W.biru, 1.8, { z: 3 }), teks(`${id}-l${j}`, xGB(o, n), o.y + 19, rb(n), 8, W.biru, { z: 3 })];
  });
}
export const idPatokanGB = (id: string, banyak: number, j0 = 0): string[] => Array.from({ length: banyak }, (_, q) => [`${id}-t${j0 + q}`, `${id}-l${j0 + q}`]).flat();
/** Titik bilangan n: bulatan `${id}-p`, angka `${id}-q` di atas, nama `${id}-m` di atasnya. `naik` = tinggi angka di atas garis. */
export function titikGB(id: string, o: OpsiGB, n: number, nama: string, warna: string, naik = 16): Obj[] {
  const x = xGB(o, n);
  return [
    bulat(`${id}-p`, x, o.y, 4.5, warna, W.biru, { tebal: 1.4, z: 4 }),
    teks(`${id}-q`, x, b2(o.y - naik), rb(n), 7.5, W.biru, { z: 3 }),
    ...(nama ? [teks(`${id}-m`, x, b2(o.y - naik - 10), nama, 8, W.hijauTua, { z: 3 })] : []),
  ];
}
export const idTitikGB = (id: string, adaNama = true): string[] => [`${id}-p`, `${id}-q`, ...(adaNama ? [`${id}-m`] : [])];
/** Ruas tebal di atas garis dari bilangan a ke bilangan b. */
export const ruasGB = (id: string, o: OpsiGB, a: number, b: number, warna: string = W.merah): Obj => garis(id, Math.min(xGB(o, a), xGB(o, b)), o.y, Math.abs(xGB(o, b) - xGB(o, a)), 0, warna, 4.5, { z: 2 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Pak Hasto" | "Bu Lestari";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`; Citra berkucir dua `${id}-k1` `${id}-k2` dan berkaus merah muda `${id}-bj`;
 * Fajar bertopi suporter `${id}-tp` dan berkaus kuning `${id}-bj`; Pak Arif berompi oranye `${id}-bj` dan berpengeras suara kecil `${id}-pk`;
 * Pak Hasto berpeci hitam `${id}-pc`, berbaju biru `${id}-bj`, membawa daftar `${id}-df` dan pengeras suara `${id}-pk`; Bu Lestari berkacamata `${id}-ka` dan berbaju ungu `${id}-bj`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Bu Lestari" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, W.kayu, W.kayuTua, { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(baju("#F9A8D4", "#9D174D"));
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") {
    out.push(baju("#FACC15", "#854D0E"));
    out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.8), 18, 6, W.merah, "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Arif") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-pk`, x + 12, bulatkan(y + 3), 9, 7, "#D1D5DB", "#4B5563", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hasto") {
    out.push(baju("#1D4ED8", "#1E3A8A", 12));
    out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-df`, x - 21, bulatkan(y + 3), 8, 11, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-pk`, x + 12, bulatkan(y + 3), 9, 7, "#D1D5DB", "#4B5563", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Lestari") {
    out.push(baju("#A855F7", "#581C87", 12));
    out.push(garis(`${id}-ka`, x - 8, bulatkan(y - u * 0.28), 16, 0, "#1F2937", 1.6, { z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama.startsWith("Pak") || nama === "Bu Lestari" ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-bj`, `${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-bj`, `${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pk`] : []),
  ...(nama === "Pak Hasto" ? [`${id}-bj`, `${id}-pc`, `${id}-df`, `${id}-pk`] : []),
  ...(nama === "Bu Lestari" ? [`${id}-bj`, `${id}-ka`] : []),
];

/* ------------------------------ Kartu tribun ------------------------------ */
/** Kartu tribun: `${id}-k`, nama `${id}-t0`, bilangan `${id}-t1`. */
export const kartuTribun = (id: string, x: number, y: number, t: Tribun, warna: string, w = 66, h = 36): Obj[] => kartu(id, x, y, w, h, warna, [t.nama, rb(t.banyak)], 9);
export const idKartuTribun = (id: string): string[] => idKartu(id, 2);
