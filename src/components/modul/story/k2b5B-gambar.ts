import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak" (setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Rupa kebun sekolah: pagar bambu, bedeng dua petak, bibit cabai kecil, keranjang bibit, neraca dua piringan, tomat, papan catatan, tangan membagi,
 * serta tokoh Chacha, Dika, Nia, Bu Sari (bertopi caping), Bu Wati (berkerudung hijau), dan Pak Joko (berkumis, bersepatu bot).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#15803D",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FDE68A",
  tanah: "#92400E",
};

/** Warna benda kebun. */
export const M = {
  tunas: "#22C55E",
  tomat: "#EF4444",
  labu: "#F97316",
  tanah: "#7C4A21",
  bambu: "#D6A15E",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

const r1 = (n: number): number => Math.round(n * 10) / 10;
const f = (n: number): string => n.toFixed(1);

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.hijau): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y): id `${id}-k` dan `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Lintasan terbuka tanpa isi: garis berwarna `warna`. Titik relatif terhadap (x, y). */
export const jalurGaris = (id: string, x: number, y: number, d: string, warna: string = W.merah, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna: "none", garis: warna, tebal, ...o });

/** Jalur tertutup dari titik-titik mutlak. */
const poligon = (id: string, pts: [number, number][], warna: string, garisW: string, o: Opsi = {}): Obj => ({ id, t: "jalur", x: 0, y: 0, d: `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L")} Z`, warna, garis: garisW, tebal: 1.4, ...o });

/* ------------------------------ Rupa kebun ------------------------------ */

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  pak: "\u{1F468}",
  pikir: "\u{1F914}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  kaget: "\u{1F632}",
  cemas: "\u{1F61F}",
  tanya: "\u{2753}",
  lampu: "\u{1F4A1}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  gunting: "\u{2702}",
  kaca: "\u{1F50D}",
  daftar: "\u{1F4CB}",
  bintangPutar: "\u{1F4AB}",
  tabrak: "\u{1F4A5}",
  kilau: "\u{2728}",
  pesta: "\u{1F389}",
  bibit: "\u{1F331}",
  tangan: "\u{1F932}",
  jam: "\u{1F550}",
  neraca: "\u{2696}\u{FE0F}",
  ulang: "\u{1F501}",
  cabai: "\u{1F336}\u{FE0F}",
  tomat: "\u{1F345}",
  kartu: "\u{1F0CF}",
  pikiran: "\u{1F4AD}",
  tepuk: "\u{1F44F}",
} as const;

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Bu Wati" | "Pak Joko";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bertopi caping `${id}-cp` dan bersarung tangan hijau;
 * Bu Wati berkerudung hijau `${id}-kr`; Pak Joko berkumis `${id}-km` dan bersepatu bot `${id}-b0` `${id}-b1`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Pak Joko" ? E.pak : E.bu;
  const out: Obj[] = [];
  if (nama === "Bu Wati") out.push(bulat(`${id}-kr`, x, r1(y - u * 0.42), r1(u * 0.5), "#16A34A", "#166534", { z: 0, tebal: 1 }));
  out.push(emo(id, x, y, wajah, u, { z: 1 }));
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, r1(y - u * 0.5), E.topi, r1(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") {
    const lb = u * 0.55;
    out.push(poligon(`${id}-cp`, [[x - lb, y - u * 0.55], [x, y - u * 1.12], [x + lb, y - u * 0.55]], "#FDE68A", "#A16207", { z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(garis(`${id}-km`, r1(x - 5), r1(y - u * 0.18), 10, 0, "#292524", 2.4, { z: 2 }));
    out.push(kotak(`${id}-b0`, r1(x - 10), r1(y + 16), 8, 7, "#78350F", "#451A03", { rx: 1.5, tebal: 1, z: 1 }));
    out.push(kotak(`${id}-b1`, r1(x + 2), r1(y + 16), 8, 7, "#78350F", "#451A03", { rx: 1.5, tebal: 1, z: 1 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + (nama === "Pak Joko" ? 33 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-cp`] : []),
  ...(nama === "Bu Wati" ? [`${id}-kr`] : []),
  ...(nama === "Pak Joko" ? [`${id}-km`, `${id}-b0`, `${id}-b1`] : []),
];

/** Rumput kebun `${id}` dari tinggi y sampai bawah kanvas. */
export const rumput = (id: string, y = 112): Obj => kotak(id, 2, y, 296, 198 - y, "#BBF7D0", "#4ADE80", { rx: 4, tebal: 1.2, z: -3 });

/** Pagar bambu: tiang `${id}0..10`, palang `${id}-a` dan `${id}-b`. Tiang mulai dari tinggi y setinggi `h`. */
export function pagar(id: string, y: number, h = 22): Obj[] {
  return [
    ...Array.from({ length: 11 }, (_, i) => kotak(`${id}${i}`, 4 + 28 * i, y, 7, h, M.bambu, "#92400E", { rx: 2, tebal: 1, z: -2 })),
    kotak(`${id}-a`, 4, r1(y + h * 0.22), 287, 3, "#E9C98A", "#92400E", { rx: 1, tebal: 0.8, z: -1 }),
    kotak(`${id}-b`, 4, r1(y + h * 0.66), 287, 3, "#E9C98A", "#92400E", { rx: 1, tebal: 0.8, z: -1 }),
  ];
}
export const idPagar = (id: string): string[] => [...Array.from({ length: 11 }, (_, i) => `${id}${i}`), `${id}-a`, `${id}-b`];

/**
 * Bedeng tanah dengan dua petak: bedeng `${id}`, petak kiri `${id}-l`, petak kanan `${id}-r`; tanda `${id}-tl` (kiri) dan `${id}-tr` (kanan) di atas bedeng.
 * Pojok kiri-atas (x, y), lebar w, tinggi h.
 */
export function bedeng(id: string, x: number, y: number, w = 160, h = 50, tanda = true): Obj[] {
  const pw = w / 2 - 6;
  return [
    kotak(id, x, y, w, h, "#B45309", "#78350F", { rx: 5, tebal: 1.6, z: -1 }),
    kotak(`${id}-l`, r1(x + 4), r1(y + 4), r1(pw), h - 8, M.tanah, "#451A03", { rx: 3, tebal: 1.2, z: 0 }),
    kotak(`${id}-r`, r1(x + w / 2 + 2), r1(y + 4), r1(pw), h - 8, M.tanah, "#451A03", { rx: 3, tebal: 1.2, z: 0 }),
    ...(tanda ? [teks(`${id}-tl`, r1(x + w * 0.25), y - 4, "kiri", 8, W.ungu, { z: 1 }), teks(`${id}-tr`, r1(x + w * 0.75), y - 4, "kanan", 8, W.ungu, { z: 1 })] : []),
  ];
}
export const idBedeng = (id: string, tanda = true): string[] => [id, `${id}-l`, `${id}-r`, ...(tanda ? [`${id}-tl`, `${id}-tr`] : [])];
/** Letak tempat ke-`i` (mulai 0, paling banyak enam) pada petak `sisi` (0 kiri, 1 kanan) dari bedeng pojok (x, y) selebar w dan setinggi h: dua baris, tiga kolom. */
export function tempatPetak(x: number, y: number, w: number, h: number, sisi: 0 | 1, i: number, kolom = 3): Titik {
  const pw = w / 2 - 6;
  const x0 = sisi === 0 ? x + 4 : x + w / 2 + 2;
  const baris = Math.floor(i / kolom);
  const k = i % kolom;
  const jarak = pw / (kolom + 0.3);
  return { x: r1(x0 + jarak * (k + 0.9)), y: r1(y + 4 + ((h - 8) / 3) * (baris + 1) ) };
}

/** Bibit cabai kecil (emoji tunas). */
export const bibit = (id: string, x: number, y: number, u = 14, o: Opsi = {}): Obj => emo(id, x, y, E.bibit, u, { z: 3, ...o });
/** Bibit sebagai titik hijau kecil (untuk tumpukan yang dihitung). */
export const tunas = (id: string, x: number, y: number, r = 5, o: Opsi = {}): Obj => bulat(id, x, y, r, M.tunas, "#166534", { tebal: 1, z: 3, ...o });
/** Tomat: bulat merah. */
export const tomat = (id: string, x: number, y: number, r = 6, o: Opsi = {}): Obj => bulat(id, x, y, r, M.tomat, "#7F1D1D", { tebal: 1, z: 3, ...o });

/** Keranjang bibit: badan `${id}` dan bibir `${id}-b`. Berpusat (cx, cy), miring `deg` derajat (mulut ke kanan-atas bila positif besar). */
export function keranjang(id: string, cx: number, cy: number, deg = 0, s = 1): Obj[] {
  const rad = (deg * Math.PI) / 180;
  const p = (dx: number, dy: number): [number, number] => [r1(cx + (dx * Math.cos(rad) - dy * Math.sin(rad)) * s), r1(cy + (dx * Math.sin(rad) + dy * Math.cos(rad)) * s)];
  const a = p(-17, -11);
  const b = p(17, -11);
  return [poligon(id, [a, b, p(12, 11), p(-12, 11)], "#D97706", "#78350F", { z: 1 }), garis(`${id}-b`, a[0], a[1], r1(b[0] - a[0]), r1(b[1] - a[1]), "#92400E", 3, { z: 2 })];
}
export const idKeranjang = (id: string): string[] => [id, `${id}-b`];

/** Tangan membagi (emoji). */
export const tanganBagi = (id: string, x: number, y: number, u = 20, o: Opsi = {}): Obj => emo(id, x, y, E.tangan, u, { z: 4, ...o });

/** Papan catatan Dika: papan `${id}` dan penjepit `${id}-c`. Pojok kiri-atas (x, y). */
export function papan(id: string, x: number, y: number, w: number, h: number, warna = "#FEF3C7"): Obj[] {
  return [kotak(id, x, y, w, h, warna, "#92400E", { rx: 5, tebal: 1.8, z: 0 }), kotak(`${id}-c`, r1(x + w / 2 - 12), y - 4, 24, 8, "#78716C", "#44403C", { rx: 2, tebal: 1, z: 1 })];
}

/**
 * Neraca dua piringan: tiang `${id}-t`, dasar `${id}-d`, palang `${id}-bk`, gantungan `${id}-hl` dan `${id}-hr`, piringan `${id}-pl` dan `${id}-pr`.
 * Poros di (cx, yb); `dy` = turun ujung kiri (positif: kiri turun, negatif: kanan turun). Lengan 54, gantungan 14.
 */
const LENGAN = 54;
export const yPiringan = (yb: number, dy: number, sisi: "kiri" | "kanan"): number => r1(yb + (sisi === "kiri" ? dy : -dy) + 14);
export function neraca(id: string, cx: number, yb: number, dy = 0): Obj[] {
  const yl = yb + dy;
  const yr = yb - dy;
  return [
    kotak(`${id}-t`, r1(cx - 3), yb, 6, 70, "#B45309", "#78350F", { rx: 1.5, tebal: 1, z: -1 }),
    kotak(`${id}-d`, r1(cx - 22), yb + 68, 44, 7, "#92400E", "#451A03", { rx: 2, tebal: 1.2, z: -1 }),
    garis(`${id}-bk`, r1(cx - LENGAN), yl, 2 * LENGAN, r1(yr - yl), "#78350F", 3.4, { z: 1 }),
    garis(`${id}-hl`, r1(cx - LENGAN), yl, 0, 14, "#78350F", 1.6, { z: 1 }),
    garis(`${id}-hr`, r1(cx + LENGAN), yr, 0, 14, "#78350F", 1.6, { z: 1 }),
    kotak(`${id}-pl`, r1(cx - LENGAN - 24), yl + 14, 48, 5, "#FDE68A", "#92400E", { rx: 2, tebal: 1.4, z: 2 }),
    kotak(`${id}-pr`, r1(cx + LENGAN - 24), yr + 14, 48, 5, "#FDE68A", "#92400E", { rx: 2, tebal: 1.4, z: 2 }),
  ];
}
/** Ubahan untuk memiringkan neraca ke `dy` (benda di piringan dipindah sendiri oleh pemanggil). */
export function ubahNeraca(id: string, cx: number, yb: number, dy: number): (Partial<Obj> & { id: string })[] {
  const yl = yb + dy;
  const yr = yb - dy;
  return [
    { id: `${id}-bk`, y: yl, y2: r1(yr - yl) },
    { id: `${id}-hl`, y: yl },
    { id: `${id}-hr`, y: yr },
    { id: `${id}-pl`, y: yl + 14 },
    { id: `${id}-pr`, y: yr + 14 },
  ];
}
export const idNeraca = (id: string): string[] => [`${id}-t`, `${id}-d`, `${id}-bk`, `${id}-hl`, `${id}-hr`, `${id}-pl`, `${id}-pr`];

export { r1 as bulatkan };
