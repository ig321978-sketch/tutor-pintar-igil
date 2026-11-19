import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 8 Sub-Bab A "Alat Musik Pak Hendra" (diagram turus), awal cerita Pentas Seni Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa balik tirai panggung: lantai panggung kayu, tirai merah, rangka besi dan lampu sorot, tangga panggung, peti alat musik, angklung, seruling, gendang, rebana, kostum
 * (topi, selendang, sepatu), mikrofon berdiri, poster PENTAS SENI, papan jepit, alas pilah berbaris, turus dan bundel lima, tabel turus, papan layar kosong.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (panitia berselendang batik cokelat, kartu PANITIA, papan jepit; digambar), Pak Hendra (penata panggung berkaus hitam, topi biru tua, sabuk perkakas; digambar),
 * Bu Maya (berkebaya ungu bersanggul; tampak di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  kaget: "\u{1F632}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  jempol: "\u{1F44D}",
  debu: "\u{1F4A8}",
  nada: "\u{1F3B5}",
  ayam: "\u{1F414}",
  seru: "\u{2757}",
  topiPanggung: "\u{1F3A9}",
  selendang: "\u{1F9E3}",
  sepatu: "\u{1F45F}",
  anak: "\u{1F9D2}",
  mata: "\u{1F440}",
  juara: "\u{1F3C6}",
  pensil: "\u{270F}",
  topeng: "\u{1F3AD}",
  campur: "\u{1F500}",
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
/** Busur lompatan dari (x1, y) ke (x2, y) setinggi h. */
export const busur = (id: string, x1: number, x2: number, y: number, h: number, warna: string = W.merah): Obj => ({
  id,
  t: "jalur",
  x: x1,
  y,
  d: `M0 0 Q${bulatkan((x2 - x1) / 2)} ${-h} ${bulatkan(x2 - x1)} 0`,
  warna: undefined,
  garis: warna,
  tebal: 2,
  z: 1,
});
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


/* ------------------------------ Warna balik tirai ------------------------------ */
export const WP = {
  lantai: "#C99A63",
  papan: "#A5733E",
  tirai: "#DC2626",
  tiraiTua: "#991B1B",
  besi: "#475569",
  besiTua: "#1E293B",
  lampu: "#FDE047",
  lampuTua: "#A16207",
  cahaya: "#FEF9C3",
  peti: "#B7814A",
  petiTua: "#6B4423",
  bambu: "#EAB308",
  bambuTua: "#854D0E",
  gendang: "#B45309",
  gendangTua: "#78350F",
  kulit: "#FDE68A",
  alas: "#E0F2FE",
  alasTua: "#0369A1",
  kertas: "#FFFFFF",
  jepit: "#B45309",
} as const;

/** Lantai panggung kayu `${id}` dari tinggi y sampai bawah kanvas, dua garis papan `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, WP.lantai, undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 14, 292, 0, WP.papan, 2, { z: -2 }),
    garis(`${id}-g2`, 4, y + 32, 292, 0, WP.papan, 2, { z: -2 }),
  ];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Tirai merah kiri `${id}-l` dan kanan `${id}-r`, masing-masing dengan satu lipatan `${id}-lf` dan `${id}-rf`. Tinggi tirai `t`. */
export function tirai(id: string, t = 150): Obj[] {
  return [
    poligon(`${id}-l`, [[2, 2], [38, 2], [28, t], [2, t]], WP.tirai, WP.tiraiTua, { z: -1, tebal: 1.6 }),
    garis(`${id}-lf`, 18, 6, -4, t - 10, WP.tiraiTua, 1.2, { z: 0 }),
    poligon(`${id}-r`, [[262, 2], [298, 2], [298, t], [272, t]], WP.tirai, WP.tiraiTua, { z: -1, tebal: 1.6 }),
    garis(`${id}-rf`, 282, 6, 4, t - 10, WP.tiraiTua, 1.2, { z: 0 }),
  ];
}
export const idTirai = (id: string): string[] => [`${id}-l`, `${id}-lf`, `${id}-r`, `${id}-rf`];

/** Rangka besi melintang `${id}` di atas panggung. */
export const rangka = (id: string, x = 52, w = 196): Obj => garis(id, x, 6, w, 0, WP.besi, 3, { z: 1 });
/**
 * Lampu sorot tergantung pada rangka: badan `${id}`, kaca `${id}-b`, dan sinar `${id}-s` (bila `sinar`). (x, y) = tengah atas badan.
 */
export function lampu(id: string, x: number, y = 8, sinar = false): Obj[] {
  const out: Obj[] = [kotak(id, x - 6, y, 12, 9, WP.besi, WP.besiTua, { rx: 2, tebal: 1.2, z: 2 }), bulat(`${id}-b`, x, y + 10, 3.4, WP.lampu, WP.lampuTua, { tebal: 1, z: 3 })];
  if (sinar) out.push(poligon(`${id}-s`, [[x - 3, y + 12], [x + 3, y + 12], [x + 30, y + 120], [x - 30, y + 120]], WP.cahaya, undefined, { z: -2, op: 0.55, tebal: 0 }));
  return out;
}
export const idLampu = (id: string, sinar = false): string[] => [id, `${id}-b`, ...(sinar ? [`${id}-s`] : [])];

/** Tangga panggung tiga anak tangga `${id}-1` sampai `${id}-3`. Pojok kiri-bawah (x, yb). */
export const tangga = (id: string, x: number, yb: number): Obj[] => [
  kotak(`${id}-1`, x, yb - 8, 36, 8, "#D6A66A", WP.petiTua, { rx: 1, tebal: 1.2, z: 1 }),
  kotak(`${id}-2`, x, yb - 16, 26, 8, "#D6A66A", WP.petiTua, { rx: 1, tebal: 1.2, z: 1 }),
  kotak(`${id}-3`, x, yb - 24, 16, 8, "#D6A66A", WP.petiTua, { rx: 1, tebal: 1.2, z: 1 }),
];
export const idTangga = (id: string): string[] => [`${id}-1`, `${id}-2`, `${id}-3`];

/** Peti alat musik terbuka: badan `${id}`, tutup miring `${id}-t`, pita `${id}-p`. Pojok kiri-atas badan (x, y). */
export const peti = (id: string, x: number, y: number, w = 60, h = 20): Obj[] => [
  kotak(id, x, y, w, h, WP.peti, WP.petiTua, { rx: 2, tebal: 1.8, z: 1 }),
  poligon(`${id}-t`, [[x, y], [x + 7, y - 14], [x + w - 7, y - 14], [x + w, y]], "#9A6B3F", WP.petiTua, { z: 0, tebal: 1.6 }),
  garis(`${id}-p`, x + 3, y + h * 0.45, w - 6, 0, WP.petiTua, 1.2, { z: 2 }),
];
export const idPeti = (id: string): string[] => [id, `${id}-t`, `${id}-p`];

/** Poster di dinding: papan `${id}` dan tulisan `${id}-t`. Pojok kiri-atas (x, y). */
export const poster = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string = "#FEF3C7"): Obj[] => [
  kotak(id, x, y, w, h, warna, W.coklat, { rx: 3, tebal: 1.6, z: 0 }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + 3, isi, 8, W.merah, { z: 1 }),
];
export const idPoster = (id: string): string[] => [id, `${id}-t`];

/** Mikrofon berdiri: tiang `${id}`, kepala `${id}-h`, kaki `${id}-k`. Titik (x, y) = tengah kaki. */
export const mikrofon = (id: string, x: number, y: number): Obj[] => [
  garis(id, x, y, 0, -26, WP.besi, 2, { z: 1 }),
  bulat(`${id}-h`, x, y - 29, 3.6, "#334155", WP.besiTua, { tebal: 1.2, z: 2 }),
  kotak(`${id}-k`, x - 7, y - 1, 14, 3, WP.besi, WP.besiTua, { rx: 1, tebal: 1, z: 1 }),
];
export const idMikrofon = (id: string): string[] => [id, `${id}-h`, `${id}-k`];

/** Papan jepit: papan `${id}`, jepitan `${id}-k`, kertas `${id}-c`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export const jepit = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WP.jepit, "#78350F", { rx: 3, tebal: 1.6, z: 1 }),
  kotak(`${id}-c`, x + 4, y + 8, w - 8, h - 12, WP.kertas, "#CBD5E1", { rx: 1, tebal: 1, z: 1.5 }),
  kotak(`${id}-k`, x + w / 2 - 7, y + 2, 14, 7, "#94A3B8", "#475569", { rx: 2, tebal: 1, z: 3 }),
];
export const idJepit = (id: string): string[] => [id, `${id}-c`, `${id}-k`];

/* ------------------------------ Alat musik ------------------------------ */
export type JenisAlat = "angklung" | "seruling" | "gendang" | "rebana";
/** Satu alat musik kecil berpusat di (cx, cy); lebar sekitar 16. Bagian: `${id}` dan sufiks sesuai `idAlat`. */
export function alat(id: string, cx: number, cy: number, jenis: JenisAlat, s = 1): Obj[] {
  if (jenis === "angklung")
    return [
      kotak(id, bulatkan(cx - 7 * s), bulatkan(cy + 3 * s), 14 * s, 3 * s, WP.gendangTua, WP.petiTua, { rx: 1, tebal: 1, z: 2 }),
      kotak(`${id}-a`, bulatkan(cx - 5.5 * s), bulatkan(cy - 8 * s), 3 * s, 12 * s, WP.bambu, WP.bambuTua, { rx: 1, tebal: 1, z: 3 }),
      kotak(`${id}-b`, bulatkan(cx + 2.5 * s), bulatkan(cy - 5 * s), 3 * s, 9 * s, WP.bambu, WP.bambuTua, { rx: 1, tebal: 1, z: 3 }),
    ];
  if (jenis === "seruling")
    return [
      kotak(id, bulatkan(cx - 10 * s), bulatkan(cy - 2.2 * s), 20 * s, 4.4 * s, "#A3E635", "#3F6212", { rx: 2, tebal: 1, z: 2 }),
      bulat(`${id}-l`, bulatkan(cx + 3 * s), cy, 1 * s, "#3F6212", "#3F6212", { tebal: 0.6, z: 3 }),
    ];
  if (jenis === "gendang")
    return [
      kotak(id, bulatkan(cx - 8 * s), bulatkan(cy - 6 * s), 16 * s, 12 * s, WP.gendang, WP.gendangTua, { rx: 5 * s, tebal: 1.2, z: 2 }),
      garis(`${id}-g`, bulatkan(cx - 8 * s), cy, 16 * s, 0, WP.kulit, 1.4, { z: 3 }),
    ];
  return [bulat(id, cx, cy, 8 * s, WP.kulit, WP.gendangTua, { tebal: 1.2, z: 2 }), bulat(`${id}-d`, cx, cy, 3 * s, WP.gendang, WP.gendangTua, { tebal: 1, z: 3 })];
}
export const idAlat = (id: string, jenis: JenisAlat): string[] => (jenis === "angklung" ? [id, `${id}-a`, `${id}-b`] : jenis === "seruling" ? [id, `${id}-l`] : jenis === "gendang" ? [id, `${id}-g`] : [id, `${id}-d`]);

/** Banyak alat musik tiap jenis dalam peti (data Story): angklung sembilan, seruling enam, gendang empat, rebana empat. */
export const ALAT_JENIS: readonly { jenis: JenisAlat; nama: string; banyak: number }[] = [
  { jenis: "angklung", nama: "Angklung", banyak: 9 },
  { jenis: "seruling", nama: "Seruling", banyak: 6 },
  { jenis: "gendang", nama: "Gendang", banyak: 4 },
  { jenis: "rebana", nama: "Rebana", banyak: 4 },
];
/** Seluruh alat musik berurut jenis: id `${awalan}${i}` (i = 0..22), dan jenisnya. */
export const SEMUA_ALAT: { id: string; jenis: JenisAlat }[] = ALAT_JENIS.flatMap((a, j) => Array.from({ length: a.banyak }, (_, i) => ({ id: `${j}${i}`, jenis: a.jenis })));
/** Letak acak (campur aduk) 23 alat musik di daerah x 70-270, y 52-146. Tetap (bukan acak sungguhan). */
export const LETAK_CAMPUR: [number, number][] = [
  [92, 64], [188, 112], [122, 138], [236, 70], [152, 88], [76, 118], [214, 140], [178, 58], [102, 96], [252, 108], [134, 60], [200, 86], [84, 144], [160, 124], [232, 134], [118, 112], [262, 64], [190, 138], [96, 78], [144, 142], [220, 106], [110, 150], [246, 148],
];
/** Letak alat musik terpilah: baris `r` (0..3) di tinggi `yBaris[r]`, urutan ke-i mulai x0 berjarak `g`. */
export function letakBaris(r: number, i: number, yBaris: readonly number[], x0 = 76, g = 15): [number, number] {
  return [x0 + i * g, yBaris[r]];
}
/** Seluruh alat musik pada tata letak tertentu (id `${awalan}${nomor}`): `letak(r, i, nomorUrut)` memberi pusat. */
export function semuaAlat(awalan: string, letak: (r: number, i: number, n: number) => [number, number], s = 1): Obj[] {
  const out: Obj[] = [];
  let n = 0;
  ALAT_JENIS.forEach((a, r) => {
    for (let i = 0; i < a.banyak; i += 1) {
      const [x, y] = letak(r, i, n);
      out.push(...alat(`${awalan}${n}`, x, y, a.jenis, s));
      n += 1;
    }
  });
  return out;
}
/** Id semua bagian alat musik `semuaAlat` untuk sebagian nomor urut. */
export function idSemuaAlat(awalan: string, dari = 0, sampai = 22): string[] {
  const out: string[] = [];
  SEMUA_ALAT.forEach((a, n) => {
    if (n >= dari && n <= sampai) out.push(...idAlat(`${awalan}${n}`, a.jenis));
  });
  return out;
}

/* ------------------------------ Turus ------------------------------ */
/**
 * Turus sebanyak n benda: tiap lima turus satu bundel (empat garis tegak `${id}-g{i}` lalu satu coretan miring `${id}-m{j}`), sisanya garis tegak.
 * Pojok kiri-atas (x, y), tinggi h, jarak antar garis s. Lebar satu bundel = 3 s, jarak antar bundel = 4 s + 4.
 */
export function turus(id: string, x: number, y: number, n: number, warna: string = W.biru, h = 12, s = 3.6, tebal = 1.6): Obj[] {
  const out: Obj[] = [];
  const antar = 4 * s + 4;
  for (let i = 0; i < n; i += 1) {
    const j = Math.floor(i / 5);
    const p = i % 5;
    const bx = bulatkan(x + j * antar);
    if (p < 4) out.push(garis(`${id}-g${i}`, bulatkan(bx + p * s), y, 0, h, warna, tebal, { z: 2 }));
    else out.push(garis(`${id}-m${j}`, bulatkan(bx - 2), bulatkan(y + h - 2), bulatkan(3 * s + 4), -(h - 4), warna, tebal, { z: 3 }));
  }
  return out;
}
export const idTurus = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => (i % 5 < 4 ? `${id}-g${i}` : `${id}-m${Math.floor(i / 5)}`));
/** Pusat tengah turus ke-i (nomor garis, mulai 0) untuk menaruh keterangan di atasnya. */
export const xTurus = (x: number, i: number, s = 3.6): number => bulatkan(x + Math.floor(i / 5) * (4 * s + 4) + (i % 5 < 4 ? (i % 5) * s : 1.5 * s));

/** Tabel `${id}`: bingkai, kepala `${id}-h`, garis kolom `${id}-v{c}` dan garis baris `${id}-w{r}`. Lebar kolom `lebar`. */
export function tabel(id: string, x: number, y: number, lebar: number[], th: number, tb: number, nb: number): Obj[] {
  const total = lebar.reduce((a, b) => a + b, 0);
  const tinggi = th + nb * tb;
  const out: Obj[] = [kotak(id, x, y, total, tinggi, "#FFFFFF", W.biru, { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-h`, x, y, total, th, "#DBEAFE", W.biru, { rx: 4, tebal: 1.6, z: -0.5 })];
  let ax = x;
  lebar.slice(0, -1).forEach((w, c) => {
    ax += w;
    out.push(garis(`${id}-v${c}`, ax, y, 0, tinggi, W.biru, 1.2, { z: -0.4 }));
  });
  for (let r = 0; r < nb; r += 1) out.push(garis(`${id}-w${r}`, x, y + th + r * tb, total, 0, W.biru, 1.2, { z: -0.4 }));
  return out;
}
export const idTabel = (id: string, kolom: number, nb: number): string[] => [id, `${id}-h`, ...Array.from({ length: kolom - 1 }, (_, c) => `${id}-v${c}`), ...Array.from({ length: nb }, (_, r) => `${id}-w${r}`)];

/** Alas pilah: alas `${id}` dengan `n` garis pemisah baris `${id}-s{r}`. Pojok kiri-atas (x, y), lebar w, tinggi tiap baris `tb`. */
export function alasPilah(id: string, x: number, y: number, w: number, tb: number, n: number): Obj[] {
  return [kotak(id, x, y, w, tb * n, WP.alas, WP.alasTua, { rx: 6, tebal: 1.8, z: -1 }), ...Array.from({ length: n - 1 }, (_, r) => garis(`${id}-s${r}`, x, y + (r + 1) * tb, w, 0, WP.alasTua, 1.1, { z: 0, op: 0.7 }))];
}
export const idAlasPilah = (id: string, n: number): string[] => [id, ...Array.from({ length: n - 1 }, (_, r) => `${id}-s${r}`)];

/** Papan layar kosong berpetak: papan `${id}`, `kolom` garis tegak `${id}-v{c}` dan `baris` garis mendatar `${id}-w{r}` di dalamnya. Pojok kiri-atas (x, y). */
export function papanLayar(id: string, x: number, y: number, w: number, h: number, kolom = 5, baris = 4): Obj[] {
  const out: Obj[] = [kotak(id, x, y, w, h, "#F8FAFC", WP.besi, { rx: 3, tebal: 2, z: 0 })];
  for (let c = 1; c < kolom; c += 1) out.push(garis(`${id}-v${c}`, bulatkan(x + (w * c) / kolom), y, 0, h, "#94A3B8", 0.9, { z: 1 }));
  for (let r = 1; r < baris; r += 1) out.push(garis(`${id}-w${r}`, x, bulatkan(y + (h * r) / baris), w, 0, "#94A3B8", 0.9, { z: 1 }));
  return out;
}
export const idPapanLayar = (id: string, kolom = 5, baris = 4): string[] => [id, ...Array.from({ length: kolom - 1 }, (_, c) => `${id}-v${c + 1}`), ...Array.from({ length: baris - 1 }, (_, r) => `${id}-w${r + 1}`)];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Hendra" | "Bu Maya";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berselendang batik cokelat `${id}-sl`, berkartu PANITIA `${id}-kp` `${id}-rt`, membawa papan jepit `${id}-pj`;
 * Pak Hendra bertopi biru tua `${id}-cp`, berkaus hitam `${id}-rm`, bersabuk perkakas `${id}-sb`; Bu Maya (tamu Sub-Bab berikutnya, tampak di kejauhan) berkebaya ungu `${id}-kb`
 * dan bersanggul `${id}-sg`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Pak Hendra" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") {
    out.push(kotak(`${id}-sl`, x - 13, bulatkan(y + 2), 26, 10, "#92400E", "#78350F", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-kp`, x - 9, bulatkan(y + 3.5), 18, 6.5, "#FFFFFF", "#78350F", { rx: 1.5, tebal: 0.8, z: 1 }));
    out.push(teks(`${id}-rt`, x, bulatkan(y + 8.4), "PANITIA", 4.2, "#7F1D1D", { z: 3 }));
    out.push(kotak(`${id}-pj`, x + 13, bulatkan(y - 3), 10, 13, "#B45309", "#78350F", { rx: 1.5, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Hendra") {
    out.push(kotak(`${id}-cp`, x - 10, bulatkan(y - u * 0.78), 20, 8, "#1E3A8A", "#172554", { rx: 4, tebal: 1.3, z: 2 }));
    out.push(kotak(`${id}-rm`, x - 11, bulatkan(y + 2), 22, 8, "#1F2937", "#0F172A", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-sb`, x - 12, bulatkan(y + 8.5), 24, 3, "#92400E", "#451A03", { rx: 1, tebal: 1, z: 1 }));
  }
  if (nama === "Bu Maya") {
    out.push(kotak(`${id}-kb`, x - 12, bulatkan(y + 2), 24, 9, "#9333EA", "#6B21A8", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(bulat(`${id}-sg`, x, bulatkan(y - u * 1.0), 5, "#292524", "#0C0A09", { tebal: 1, z: 0 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Bu Sari" ? 19 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-sl`, `${id}-kp`, `${id}-rt`, `${id}-pj`] : []),
  ...(nama === "Pak Hendra" ? [`${id}-cp`, `${id}-rm`, `${id}-sb`] : []),
  ...(nama === "Bu Maya" ? [`${id}-kb`, `${id}-sg`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
