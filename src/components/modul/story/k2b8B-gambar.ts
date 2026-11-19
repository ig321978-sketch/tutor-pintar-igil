import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 8 Sub-Bab B "Bintang Bu Maya" (diagram gambar), akhir cerita Pentas Seni Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa depan panggung dan loket tiket: tirai merah dengan lipatan, lantai kayu, loket berjendela, papan layar kotak-kotak, bintang berwarna sebagai lambang,
 * selendang penari, kertas tempel, kursi lipat berjajar, mikrofon berdiri, balon, spanduk PENTAS SENI MERIAH, konfeti.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (panitia, berselendang batik cokelat, kartu PANITIA, papan jepit), Bu Maya (berkebaya ungu, bersanggul, bertiket). Tanpa ZWJ.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  lavender: "#EDE9FE",
  kuning: "#FDE68A",
  tinta: "#0F172A",
  tirai: "#DC2626",
  tiraiTua: "#7F1D1D",
  kayu: "#D6B98C",
  selMerah: "#EF4444",
  selKuning: "#FACC15",
  selHijau: "#22C55E",
  selBiru: "#3B82F6",
};

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  balon: "\u{1F388}",
  tiket: "\u{1F39F}",
  bintang: "\u{2B50}",
  kilau: "\u{2728}",
  sapu: "\u{1F9F9}",
  not: "\u{1F3B5}",
  debu: "\u{1F4A8}",
  lampu: "\u{1F4A1}",
  tangan: "\u{1F446}",
} as const;

type Opsi = Partial<Obj>;
const r1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (di bawah kain pelipit tirai). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 26, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Poligon tertutup dari titik-titik absolut (di kanvas). */
export const poligon = (id: string, pts: [number, number][], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: pts[0][0],
  y: pts[0][1],
  d: `M0 0 ${pts.slice(1).map(([a, b]) => `L${r1(a - pts[0][0])} ${r1(b - pts[0][1])}`).join(" ")} Z`,
  warna,
  garis: garisW,
  tebal: 1.6,
  ...o,
});

/* ------------------------------ Depan panggung ------------------------------ */

/** Depan panggung `${id}`: dinding terang, kain pelipit merah `${id}-v`, dua tirai merah `${id}-tk` dan `${id}-tr` berlipatan, lantai kayu `${id}-l`. */
export const panggungDepan = (id: string, dinding = "#FFF7ED"): Obj[] => [
  kotak(id, 2, 2, 296, 166, dinding, "#94A3B8", { rx: 4, tebal: 1.2, z: -4 }),
  kotak(`${id}-v`, 2, 2, 296, 10, W.tirai, W.tiraiTua, { rx: 2, tebal: 1.2, z: -3 }),
  kotak(`${id}-tk`, 2, 12, 12, 156, W.tirai, W.tiraiTua, { rx: 2, tebal: 1, z: -3 }),
  kotak(`${id}-tr`, 286, 12, 12, 156, W.tirai, W.tiraiTua, { rx: 2, tebal: 1, z: -3 }),
  garis(`${id}-f0`, 8, 14, 0, 152, W.tiraiTua, 1, { z: -2 }),
  garis(`${id}-f1`, 292, 14, 0, 152, W.tiraiTua, 1, { z: -2 }),
  kotak(`${id}-l`, 2, 168, 296, 30, W.kayu, W.coklat, { rx: 3, tebal: 1.2, z: -3 }),
];
export const idPanggung = (id: string): string[] => [id, `${id}-v`, `${id}-tk`, `${id}-tr`, `${id}-f0`, `${id}-f1`, `${id}-l`];

/** Loket tiket `${id}`: badan krem, jendela biru muda `${id}-j`, atap bergaris `${id}-a`, papan "TIKET" `${id}-t`, pojok kiri-atas (x, y). */
export const loket = (id: string, x: number, y: number, w = 62, h = 58): Obj[] => [
  kotak(id, x, y + 10, w, h - 10, W.kuning, W.coklat, { rx: 3, tebal: 2, z: 0 }),
  kotak(`${id}-a`, r1(x - 4), y, w + 8, 12, W.selMerah, W.tiraiTua, { rx: 3, tebal: 1.6, z: 1 }),
  kotak(`${id}-j`, r1(x + 8), r1(y + 20), w - 16, 22, "#BFDBFE", W.coklat, { rx: 2, tebal: 1.6, z: 1 }),
  teks(`${id}-t`, r1(x + w / 2), r1(y + h - 3), "TIKET", 7, W.coklat, { z: 2 }),
];
export const idLoket = (id: string): string[] => [id, `${id}-a`, `${id}-j`, `${id}-t`];

/** Papan layar kotak-kotak `${id}`: bingkai `${id}-k`, garis kisi `${id}-v{i}` dan `${id}-h{i}`, dua kaki `${id}-a`, `${id}-b`; pojok kiri-atas (x, y). */
export function papanLayar(id: string, x: number, y: number, w: number, h: number, kolom: number, baris: number): Obj[] {
  const out: Obj[] = [
    kotak(`${id}-k`, x, y, w, h, W.putih, W.biru, { rx: 4, tebal: 3, z: 0 }),
    kotak(`${id}-a`, r1(x + 8), r1(y + h), 4, 8, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: -1 }),
    kotak(`${id}-b`, r1(x + w - 12), r1(y + h), 4, 8, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: -1 }),
  ];
  for (let i = 1; i < kolom; i += 1) out.push(garis(`${id}-v${i}`, r1(x + (i * w) / kolom), y + 1, 0, h - 2, "#BFDBFE", 0.9, { z: 0 }));
  for (let i = 1; i < baris; i += 1) out.push(garis(`${id}-h${i}`, x + 1, r1(y + (i * h) / baris), w - 2, 0, "#BFDBFE", 0.9, { z: 0 }));
  return out;
}
export const idPapanLayar = (id: string, kolom: number, baris: number): string[] => [
  `${id}-k`,
  `${id}-a`,
  `${id}-b`,
  ...Array.from({ length: kolom - 1 }, (_, i) => `${id}-v${i + 1}`),
  ...Array.from({ length: baris - 1 }, (_, i) => `${id}-h${i + 1}`),
];

/** Bintang berwarna `${id}` berjari-jari r di pusat (cx, cy). */
export const bintang = (id: string, cx: number, cy: number, r: number, warna: string, o: Opsi = {}): Obj => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i += 1) {
    const sudut = (-90 + i * 36) * (Math.PI / 180);
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push([r1(cx + rr * Math.cos(sudut)), r1(cy + rr * Math.sin(sudut))]);
  }
  return poligon(id, pts, warna, W.biru, { tebal: 1, z: 2, ...o });
};
/** Baris `n` bintang `${id}0...` berderet dari kiri x0 pada tinggi y. */
export const barisBintang = (id: string, x0: number, y: number, n: number, warna: string, r = 6.5, jarak = 15, o: Opsi = {}): Obj[] =>
  Array.from({ length: n }, (_, i) => bintang(`${id}${i}`, r1(x0 + i * jarak), y, r, warna, o));
export const idBaris = (id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, i) => `${id}${dari + i}`);

/** Selendang kecil `${id}` (kain berwarna dengan satu garis hias), pojok kiri-atas (x, y). */
export const selendang = (id: string, x: number, y: number, warna: string, w = 16, h = 7): Obj[] => [
  kotak(id, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1.1, z: 2 }),
  garis(`${id}-g`, r1(x + 2), r1(y + h / 2), w - 4, 0, W.putih, 1, { z: 3 }),
];
export const idSelendang = (id: string): string[] => [id, `${id}-g`];

/** Kertas tempel `${id}` (kotak kecil agak miring), pojok kiri-atas (x, y). */
export const kertas = (id: string, x: number, y: number, warna: string, s = 11, rot = 0): Obj => kotak(id, x, y, s, s, warna, "#A16207", { rx: 1, tebal: 1, rot, z: 2 });

/** Kursi lipat `${id}` (dudukan dan sandaran), pojok kiri-atas (x, y). */
export const kursi = (id: string, x: number, y: number, warna = "#64748B"): Obj[] => [
  kotak(id, x, y, 11, 8, warna, W.tinta, { rx: 1.5, tebal: 1, z: 1 }),
  kotak(`${id}-s`, x, r1(y - 8), 11, 6, warna, W.tinta, { rx: 1.5, tebal: 1, z: 1 }),
];
export const idKursi = (id: string): string[] => [id, `${id}-s`];

/** Mikrofon berdiri `${id}`: tiang dan kepala; kaki di (x, y). */
export const mikrofon = (id: string, x: number, y: number, tinggi = 36): Obj[] => [
  garis(id, x, y, 0, -tinggi, "#475569", 2.2, { z: 1 }),
  bulat(`${id}-h`, x, r1(y - tinggi - 3), 4, "#1E293B", W.biru, { z: 2, tebal: 1 }),
  kotak(`${id}-b`, r1(x - 6), r1(y - 1), 12, 3, "#475569", W.tinta, { rx: 1, tebal: 0.8, z: 1 }),
];
export const idMikrofon = (id: string): string[] => [id, `${id}-h`, `${id}-b`];

/** Spanduk `${id}` dan teksnya `${id}-t`. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10, warna: string = W.merahMuda): Obj[] => [
  kotak(id, x, y, w, 22, warna, W.merah, { rx: 3, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, r1(y + 11 + u * 0.35), isi, u, W.tiraiTua, { z: 2 }),
];

/** Lintasan konfeti kecil: deretan kotak warna-warni `${id}0...` pada tinggi y. */
export const konfeti = (id: string, y: number, n = 10): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(18 + i * 27), r1(y + (i % 3) * 7), 5, 7, [W.merah, W.emas, W.hijau, "#3B82F6"][i % 4], undefined, { rx: 1, rot: i * 23, z: 4 }));
export const idKonfeti = (id: string, n = 10): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Bu Maya";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berselendang batik cokelat `${id}-sl`, berkartu PANITIA `${id}-kt`, `${id}-kp` dan berpapan jepit `${id}-pj`;
 * Bu Maya berkebaya ungu `${id}-kb`, bersanggul `${id}-sg` dan membawa tiket `${id}-tk`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, r1(y - u * 0.5), E.topi, r1(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") {
    out.push(kotak(`${id}-sl`, x - 12, y + 3, 24, 8, W.coklat, "#78350F", { rx: 2, tebal: 1, z: 1 }));
    out.push(kotak(`${id}-kt`, x - 8, y + 11, 16, 8, W.putih, W.biru, { rx: 1, tebal: 0.9, z: 2 }));
    out.push(teks(`${id}-kp`, x, r1(y + 16.6), "PANITIA", 3.6, W.merah, { z: 3 }));
    out.push(kotak(`${id}-pj`, x + 14, y - 4, 11, 15, W.krem, W.coklat, { rx: 1.5, tebal: 1.2, z: 2 }));
  }
  if (nama === "Bu Maya") {
    out.push(bulat(`${id}-sg`, x, r1(y - 27), 5, "#1F2937", W.biru, { z: 0, tebal: 1 }));
    out.push(kotak(`${id}-kb`, x - 12, y + 3, 24, 10, "#A855F7", W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(kotak(`${id}-tk`, x + 14, y + 1, 11, 8, W.selKuning, W.coklat, { rx: 1, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + (nama === "Bu Sari" ? 27 : nama === "Bu Maya" ? 23 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-sl`, `${id}-kt`, `${id}-kp`, `${id}-pj`] : []),
  ...(nama === "Bu Maya" ? [`${id}-sg`, `${id}-kb`, `${id}-tk`] : []),
];

/* ------------------------------ Lambang lain ------------------------------ */

/** Hati berwarna `${id}` (poligon) berjari-jari kira-kira r di pusat (cx, cy). */
export const hati = (id: string, cx: number, cy: number, r: number, warna: string, o: Opsi = {}): Obj => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 18; i += 1) {
    const t = (i * 2 * Math.PI) / 18;
    const px = 16 * Math.sin(t) ** 3;
    const py = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push([r1(cx + (px * r) / 17), r1(cy + (py * r) / 17 + r * 0.1)]);
  }
  return poligon(id, pts, warna, W.biru, { tebal: 1, z: 2, ...o });
};
/** Wajah tersenyum `${id}` dengan mata `${id}-m1`, `${id}-m2` dan mulut `${id}-mu`. */
export const wajah = (id: string, cx: number, cy: number, r: number, warna = "#FDE047"): Obj[] => [
  bulat(id, cx, cy, r, warna, W.biru, { tebal: 1, z: 2 }),
  bulat(`${id}-m1`, r1(cx - r * 0.35), r1(cy - r * 0.25), r1(r * 0.12), W.biru, undefined, { z: 3 }),
  bulat(`${id}-m2`, r1(cx + r * 0.35), r1(cy - r * 0.25), r1(r * 0.12), W.biru, undefined, { z: 3 }),
  garis(`${id}-mu`, r1(cx - r * 0.4), r1(cy + r * 0.38), r1(r * 0.8), 0, W.biru, 1.3, { z: 3 }),
];
export const idWajah = (id: string): string[] => [id, `${id}-m1`, `${id}-m2`, `${id}-mu`];
