import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton" (berat benda), awal cerita Hari Olahraga Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa Hari Olahraga: lapangan hijau bergaris putih, tiang bendera, tenda panitia, troli peralatan, kerucut oranye, kantong pasir, bola, raket, botol,
 * papan jungkat-jungkit, gantungan baju di tiang gawang, neraca dua piringan, kotak satuan, buah (pepaya, mangga, manggis), keranjang bekal, batang dan titik.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (berkaus dan bertopi putih, berpeluit; digambar), Pak Anton (berkaus dan bertopi oranye; digambar).
 * Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};
/** Warna rupa lapangan. */
export const WL = { rumput: "#86EFAC", oranye: "#FB923C", oranyeTua: "#C2410C", kayu: "#D6A15E", besi: "#94A3B8", besiTua: "#475569", pasir: "#D6A15E", biru: "#60A5FA", kuning: "#FDE047" } as const;

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  pak: "\u{1F468}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  mata: "\u{1F440}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  geleng: "\u{1F625}",
  sorak: "\u{1F389}",
  balon: "\u{1F388}",
  batu: "\u{1F9F1}",
  jari: "\u{261D}",
  tangan: "\u{1F64C}",
  mahkota: "\u{1F451}",
  jam: "\u{23F1}",
  piala: "\u{1F3C6}",
  basket: "\u{1F3C0}",
  voli: "\u{1F3D0}",
  tenis: "\u{1F3BE}",
  jangkar: "\u{2693}",
  awan: "\u{2601}",
  ransel: "\u{1F392}",
  harimau: "\u{1F42F}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Bentuk tertutup dari titik-titik absolut (lintasan `M .. L .. Z` relatif terhadap titik pertama). */
export const poligon = (id: string, titik: [number, number][], warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => {
  const [x0, y0] = titik[0];
  const d = `M0 0 ${titik
    .slice(1)
    .map(([a, b]) => `L${bulatkan(a - x0)} ${bulatkan(b - y0)}`)
    .join(" ")} Z`;
  return { id, t: "jalur", x: x0, y: y0, d, warna, garis: garisW, tebal: 1.6, ...o };
};
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
/** Patch menggeser semua benda sebesar (dx, dy). */
export const geser = (objs: Obj[], dx: number, dy = 0): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: bulatkan((o.x ?? 0) + dx), y: bulatkan((o.y ?? 0) + dy) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Lapangan ------------------------------ */

/** Lapangan hijau `${id}` dari tinggi y sampai bawah kanvas, dua garis putih `${id}-g1`, `${id}-g2`. */
export function lapangan(id: string, y = 112): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, WL.rumput, undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 10, y + 6, 280, 0, "#FFFFFF", 2.4, { z: -2 }),
    garis(`${id}-g2`, 150, y + 6, 0, 200 - y - 10, "#FFFFFF", 2.4, { z: -2 }),
  ];
}
export const idLapangan = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Tiang bendera: tiang `${id}` dan bendera `${id}-b`. Kaki tiang di (x, y + h). */
export const bendera = (id: string, x: number, y: number, h = 64): Obj[] => [
  garis(id, x, y, 0, h, W.abu, 3, { z: -1 }),
  kotak(`${id}-b`, x + 2, y + 1, 24, 14, W.merah, "#7F1D1D", { rx: 1, tebal: 1.2, z: 0 }),
];
export const idBendera = (id: string): string[] => [id, `${id}-b`];

/** Tenda panitia: atap `${id}`, kaki `${id}-k1` dan `${id}-k2`. Pojok kiri-atas (x, y), lebar w, tinggi 34. */
export const tenda = (id: string, x: number, y: number, w = 64): Obj[] => [
  garis(`${id}-k1`, x + 6, y + 14, 0, 20, "#78350F", 2.6, { z: -1 }),
  garis(`${id}-k2`, x + w - 6, y + 14, 0, 20, "#78350F", 2.6, { z: -1 }),
  poligon(id, [[x, y + 14], [x + w / 2, y], [x + w, y + 14]], "#FCA5A5", W.merah, { z: 0, tebal: 1.8 }),
];
export const idTenda = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];

/** Troli peralatan: papan `${id}`, roda `${id}-r1` dan `${id}-r2`, gagang `${id}-g`. Pojok kiri-atas papan (x, y), lebar 52, tinggi 6. */
export const troli = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 52, 6, WL.besi, WL.besiTua, { rx: 2, tebal: 1.8, z: 1 }),
  bulat(`${id}-r1`, x + 10, y + 12, 5, "#334155", "#0F172A", { tebal: 1.6, z: 2 }),
  bulat(`${id}-r2`, x + 42, y + 12, 5, "#334155", "#0F172A", { tebal: 1.6, z: 2 }),
  garis(`${id}-g`, x, y + 1, -14, -20, WL.besiTua, 3, { z: 1 }),
];
export const idTroli = (id: string): string[] => [id, `${id}-r1`, `${id}-r2`, `${id}-g`];

/** Kerucut oranye `${id}` beralas `${id}-b`. Titik (x, y) = tengah alas. */
export const kerucut = (id: string, x: number, y: number, h = 16): Obj[] => [
  poligon(id, [[x - h * 0.4, y], [x, y - h], [x + h * 0.4, y]], WL.oranye, WL.oranyeTua, { z: 2, tebal: 1.4 }),
  kotak(`${id}-b`, x - h * 0.5, y, h, 3, WL.oranyeTua, WL.oranyeTua, { rx: 1, tebal: 1, z: 2 }),
];
export const idKerucut = (id: string): string[] => [id, `${id}-b`];

/** Kantong pasir `${id}` bersimpul `${id}-s`. Pojok kiri-atas (x, y). */
export const kantong = (id: string, x: number, y: number, w = 22, h = 15): Obj[] => [
  kotak(id, x, y, w, h, "#E0B87A", W.coklat, { rx: 6, tebal: 1.8, z: 2 }),
  kotak(`${id}-s`, x + w / 2 - 3, y - 4, 6, 5, "#C79A5C", W.coklat, { rx: 1.5, tebal: 1.2, z: 2 }),
];
export const idKantong = (id: string): string[] => [id, `${id}-s`];

/** Bola `${id}` bergaris `${id}-l`. Titik (x, y) = pusat. */
export const bola = (id: string, x: number, y: number, r: number, warna = "#F97316", garisW = "#7C2D12"): Obj[] => [
  bulat(id, x, y, r, warna, garisW, { tebal: 1.6, z: 2 }),
  garis(`${id}-l`, bulatkan(x - r), y, r * 2, 0, garisW, 1.2, { z: 3 }),
];
export const idBola = (id: string): string[] => [id, `${id}-l`];

/** Raket: lingkar `${id}` dan gagang `${id}-g`. Titik (x, y) = pusat lingkar. */
export const raket = (id: string, x: number, y: number, r = 8): Obj[] => [
  bulat(id, x, y, r, "#FEF3C7", "#0F766E", { tebal: 2.4, z: 2 }),
  garis(`${id}-g`, x, y + r, 0, r + 4, W.coklat, 3, { z: 2 }),
];
export const idRaket = (id: string): string[] => [id, `${id}-g`];

/** Botol minum `${id}` bertutup `${id}-t`. Pojok kiri-atas (x, y), 9 x 18. */
export const botol = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y + 3, 9, 15, "#7DD3FC", "#0369A1", { rx: 3, tebal: 1.5, z: 2 }),
  kotak(`${id}-t`, x + 2, y, 5, 4, "#0369A1", "#0369A1", { rx: 1, tebal: 1, z: 2 }),
];
export const idBotol = (id: string): string[] => [id, `${id}-t`];

/** Keranjang bekal `${id}` bertepi `${id}-t`. Pojok kiri-atas (x, y), tinggi 14. */
export const keranjang = (id: string, x: number, y: number, w = 40, warna = "#D6A15E"): Obj[] => [
  kotak(id, x, y, w, 14, warna, W.coklat, { rx: 4, tebal: 1.8, z: 1 }),
  kotak(`${id}-t`, x - 2, y - 2, w + 4, 4, "#B45309", W.coklat, { rx: 2, tebal: 1.2, z: 2 }),
];
export const idKeranjang = (id: string): string[] => [id, `${id}-t`];

/** Buah gambar sendiri: pepaya (oranye), mangga (kuning), manggis (ungu). Titik (x, y) = pusat. */
export const buah = (id: string, x: number, y: number, jenis: "pepaya" | "mangga" | "manggis"): Obj =>
  jenis === "pepaya" ? bulat(id, x, y, 11, "#FDBA74", "#C2410C", { tebal: 1.8, z: 2 }) : jenis === "mangga" ? bulat(id, x, y, 8, "#FDE047", "#A16207", { tebal: 1.6, z: 2 }) : bulat(id, x, y, 5, "#C084FC", "#6B21A8", { tebal: 1.4, z: 2 });

/** Gawang (tiang dan palang putih) `${id}-a`, `${id}-b`, `${id}-p`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export const gawang = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  garis(`${id}-a`, x, y, 0, h, "#F8FAFC", 3.4, { z: -1 }),
  garis(`${id}-b`, x + w, y, 0, h, "#F8FAFC", 3.4, { z: -1 }),
  garis(`${id}-p`, x, y, w, 0, "#F8FAFC", 3.4, { z: -1 }),
];
export const idGawang = (id: string): string[] => [`${id}-a`, `${id}-b`, `${id}-p`];

/* ------------------------------ Alat timbang ------------------------------ */

/**
 * Papan jungkat-jungkit: papan `${id}` dan tumpuan segitiga `${id}-t`. Pusat (cx, cy), setengah panjang `half`, `dy` = naik-turun ujung
 * (dy positif: ujung kanan turun dan ujung kiri naik sebesar dy).
 */
export const papan = (id: string, cx: number, cy: number, half: number, dy: number): Obj[] => [
  garis(id, cx - half, cy - dy, half * 2, dy * 2, WL.kayu, 6, { z: 1 }),
  poligon(`${id}-t`, [[cx - 9, cy + 16], [cx, cy], [cx + 9, cy + 16]], "#9CA3AF", WL.besiTua, { z: 0, tebal: 1.6 }),
];
export const idPapan = (id: string): string[] => [id, `${id}-t`];
/** Ujung kiri dan kanan papan (tempat benda ditaruh), sedikit di atas papan. */
export const ujungPapan = (cx: number, cy: number, half: number, dy: number): { kiri: Titik; kanan: Titik } => ({ kiri: { x: cx - half + 6, y: bulatkan(cy - dy - 5) }, kanan: { x: cx + half - 6, y: bulatkan(cy + dy - 5) } });

/** Neraca dua piringan: tiang `${id}-n`, alas `${id}-d`, palang `${id}`, tali `${id}-sL` `${id}-sR`, piringan `${id}-pL` `${id}-pR`. Pusat palang (cx, cy). */
export function neraca(id: string, cx: number, cy: number, half: number, dy: number): Obj[] {
  const kx = cx - half;
  const ky = cy - dy;
  const rx = cx + half;
  const ry = cy + dy;
  const pan = (lado: "L" | "R", px: number, py: number): Obj[] => [
    garis(`${id}-s${lado}`, px - 11, py + 16, 11, -16, WL.besiTua, 1.2, { z: 0 }),
    poligon(`${id}-p${lado}`, [[px - 13, py + 16], [px + 13, py + 16], [px + 9, py + 22], [px - 9, py + 22]], "#CBD5E1", WL.besiTua, { z: 1, tebal: 1.6 }),
  ];
  return [
    kotak(`${id}-d`, cx - 14, cy + 38, 28, 5, WL.besi, WL.besiTua, { rx: 2, tebal: 1.4, z: 0 }),
    garis(`${id}-n`, cx, cy, 0, 38, WL.besiTua, 3.4, { z: 0 }),
    garis(id, kx, ky, half * 2, dy * 2, WL.besiTua, 4, { z: 1 }),
    ...pan("L", kx, ky),
    ...pan("R", rx, ry),
  ];
}
export const idNeraca = (id: string): string[] => [`${id}-d`, `${id}-n`, id, `${id}-sL`, `${id}-pL`, `${id}-sR`, `${id}-pR`];
/** Tempat benda di atas piringan kiri dan kanan neraca (tengah piringan, tepat di atasnya; tinggi piringan 16 di bawah ujung palang). */
export const piringNeraca = (cx: number, cy: number, half: number, dy: number): { kiri: Titik; kanan: Titik } => ({ kiri: { x: cx - half, y: bulatkan(cy - dy + 14) }, kanan: { x: cx + half, y: bulatkan(cy + dy + 14) } });

/**
 * Gantungan baju: kait `${id}-h`, sisi `${id}-sL` dan `${id}-sR`, palang `${id}`. Palang berpusat (cx, cy), ujung naik-turun sebesar dy (dy positif: kanan turun).
 * Benda digantung di ujung dengan tali pendek.
 */
export const gantungan = (id: string, cx: number, cy: number, half: number, dy: number): Obj[] => [
  bulat(`${id}-h`, cx, cy - 22, 3, "#E5E7EB", WL.besiTua, { tebal: 1.4, z: 1 }),
  garis(`${id}-sL`, cx, cy - 20, -half, dy === 0 ? 20 : 20 - dy, WL.besiTua, 1.8, { z: 0 }),
  garis(`${id}-sR`, cx, cy - 20, half, 20 + dy, WL.besiTua, 1.8, { z: 0 }),
  garis(id, cx - half, cy - dy, half * 2, dy * 2, WL.besiTua, 3.2, { z: 1 }),
];
export const idGantungan = (id: string): string[] => [`${id}-h`, `${id}-sL`, `${id}-sR`, id];
export const ujungGantungan = (cx: number, cy: number, half: number, dy: number): { kiri: Titik; kanan: Titik } => ({ kiri: { x: cx - half, y: bulatkan(cy - dy) }, kanan: { x: cx + half, y: bulatkan(cy + dy) } });

/** Batang tinggi `n` kotak (satu kotak setinggi `satu`) berdiri di alas yb: badan `${id}` dan garis kotak `${id}-c{i}`. Pojok kiri x. */
export function batang(id: string, x: number, yb: number, w: number, n: number, satu: number, warna: string): Obj[] {
  return [kotak(id, x, bulatkan(yb - n * satu), w, n * satu, warna, W.biru, { rx: 1, tebal: 1.4, z: 1 }), ...Array.from({ length: n - 1 }, (_, i) => garis(`${id}-c${i}`, x, bulatkan(yb - (i + 1) * satu), w, 0, W.biru, 0.7, { z: 2, op: 0.55 }))];
}
export const idBatang = (id: string, n: number): string[] => [id, ...Array.from({ length: n - 1 }, (_, i) => `${id}-c${i}`)];

/** Deret titik `${id}0..${id}{n-1}` berpusat di (cx, y), jarak `gap`. */
export const titik = (id: string, cx: number, y: number, n: number, gap = 8, warna = "#F59E0B"): Obj[] => Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, bulatkan(cx + (i - (n - 1) / 2) * gap), y, 2.8, warna, "#92400E", { tebal: 1, z: 3 }));
export const idTitik = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Anton" | "Bu Ratna";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bertopi putih `${id}-cp`, berpeluit `${id}-pl`;
 * Pak Anton bertopi oranye `${id}-cp` dan berkaus oranye `${id}-ks`; Bu Ratna (tamu Sub-Bab berikutnya, tampak di kejauhan) bertopi biru `${id}-cp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Pak Anton" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") {
    out.push(kotak(`${id}-cp`, x - 10, bulatkan(y - u * 0.78), 20, 8, "#FFFFFF", "#64748B", { rx: 4, tebal: 1.3, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 9, bulatkan(y + 5), 3, "#FACC15", "#A16207", { tebal: 1.2, z: 2 }));
  }
  if (nama === "Pak Anton") {
    out.push(kotak(`${id}-cp`, x - 10, bulatkan(y - u * 0.78), 20, 8, WL.oranye, WL.oranyeTua, { rx: 4, tebal: 1.3, z: 2 }));
    out.push(kotak(`${id}-ks`, x - 11, bulatkan(y + 1), 22, 7, WL.oranye, WL.oranyeTua, { rx: 3, tebal: 1.2, z: 0 }));
  }
  if (nama === "Bu Ratna") out.push(kotak(`${id}-cp`, x - 10, bulatkan(y - u * 0.78), 20, 8, "#60A5FA", "#1D4ED8", { rx: 4, tebal: 1.3, z: 2 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + 13), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-cp`, `${id}-pl`] : []),
  ...(nama === "Pak Anton" ? [`${id}-cp`, `${id}-ks`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-cp`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
