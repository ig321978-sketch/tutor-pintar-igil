import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan" (menyajikan data dalam bentuk tabel), akhir cerita Bengkel Sepeda Pak Hasan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman bengkel sepeda beraspal dengan papan nama BENGKEL SEPEDA, sepeda klub berderet, papan tabel Bu Wulan, turus berbundel lima
 * (empat garis tegak dan satu coretan miring melintang, digambar tepat sebanyak datanya), tabel tiga kolom (jenis, turus, banyak), helm, ember dan spons,
 * spanduk KLUB SEPEDA KAMPUNG MERIAH, balon, dan konfeti. Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau),
 * Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga, bertas belanja), Pak Hasan (montir berseragam biru, berpapan tulis kecil),
 * Bu Wulan (ketua klub berhelm kuning). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  oranye: "#F97316",
  kuning: "#FACC15",
  tanya: "#F59E0B",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  pensil: "\u{270F}",
  spons: "\u{1F9FD}",
  sabun: "\u{1F9FC}",
  gelengan: "\u{1F645}",
  helm: "\u{26D1}",
  sepeda: "\u{1F6B2}",
  baut: "\u{1F529}",
  perkakas: "\u{1F527}",
  lampu: "\u{1F4A1}",
  bel: "\u{1F514}",
  balon: "\u{1F388}",
  konfeti: "\u{1F389}",
  pita: "\u{1F380}",
  kertas: "\u{1F4C4}",
  bintang: "\u{2B50}",
  lupa: "\u{1F50D}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Bentuk tertutup dari titik-titik absolut. */
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
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Halaman bengkel ------------------------------ */
export const WB = {
  aspal: "#D6D3D1",
  aspalGaris: "#A8A29E",
  dinding: "#BFDBFE",
  atap: "#64748B",
  pintu: "#92400E",
  papan: "#FEF3C7",
  kertasTabel: "#FFFBEB",
  rangka: "#DC2626",
  ban: "#1F2937",
  tabelHead: "#FDE68A",
} as const;

/** Halaman beraspal `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function halaman(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WB.aspal, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WB.aspalGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WB.aspalGaris, 1.2, { z: -2 })];
}
export const idHalaman = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Papan nama bengkel `${id}` bertulisan `${id}-t`, pusat (cx), pojok atas y. */
export function papanNama(id: string, cx: number, y: number, isi = "BENGKEL SEPEDA", w = 100): Obj[] {
  return [kotak(id, bulatkan(cx - w / 2), y, w, 18, WB.papan, W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks(`${id}-t`, cx, y + 13, isi, 7.4, W.coklat, { z: 2 })];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-t`];

/** Bengkel: dinding `${id}`, atap `${id}-a`, pintu `${id}-p`. Pojok kiri-atas dinding (x, y). */
export function bengkel(id: string, x: number, y: number, w = 100, h = 56): Obj[] {
  return [
    kotak(id, x, y, w, h, WB.dinding, "#1E3A8A", { rx: 2, z: 0 }),
    poligon(`${id}-a`, [[x - 8, y], [bulatkan(x + w / 2), y - 24], [x + w + 8, y]], WB.atap, "#334155", { z: 1 }),
    kotak(`${id}-p`, bulatkan(x + w / 2 - 9), y + h - 30, 18, 30, WB.pintu, "#451A03", { rx: 1, tebal: 1.2, z: 1 }),
  ];
}
export const idBengkel = (id: string): string[] => [id, `${id}-a`, `${id}-p`];

/** Spanduk `${id}` bertulisan `${id}-t`, pusat (cx), tinggi 20, pojok atas y. */
export function spanduk(id: string, cx: number, y: number, isi = "KLUB SEPEDA KAMPUNG MERIAH", w = 170): Obj[] {
  return [kotak(id, bulatkan(cx - w / 2), y, w, 20, "#FEF3C7", W.merah, { rx: 3, tebal: 1.6, z: 1 }), teks(`${id}-t`, cx, y + 14, isi, 8, W.merah, { z: 2 })];
}
export const idSpanduk = (id: string): string[] => [id, `${id}-t`];

/** Sepeda `${id}-r1` `${id}-r2` (roda), `${id}-b1` `${id}-b2` `${id}-b3` (rangka), `${id}-s` (setang). Pusat bawah (cx, cy), skala s. */
export function sepeda(id: string, cx: number, cy: number, s = 1, warna: string = WB.rangka): Obj[] {
  const r = bulatkan(7 * s);
  const a = bulatkan(cx - 11 * s);
  const b = bulatkan(cx + 11 * s);
  const atas = bulatkan(cy - 10 * s);
  const tebal = bulatkan(Math.max(1.2, 1.6 * s));
  return [
    bulat(`${id}-r1`, a, cy, r, undefined, WB.ban, { tebal: 2 * s, z: 1 }),
    bulat(`${id}-r2`, b, cy, r, undefined, WB.ban, { tebal: 2 * s, z: 1 }),
    garis(`${id}-b1`, a, cy, bulatkan(cx - a + 1 * s), bulatkan(atas - cy), warna, tebal, { z: 2 }),
    garis(`${id}-b2`, bulatkan(cx + 1 * s), atas, bulatkan(b - cx - 1 * s), bulatkan(cy - atas), warna, tebal, { z: 2 }),
    garis(`${id}-b3`, a, cy, bulatkan(b - a), 0, warna, tebal, { z: 2 }),
    garis(`${id}-s`, bulatkan(cx + 7 * s), bulatkan(atas - 3 * s), bulatkan(5 * s), 0, WB.ban, tebal, { z: 3 }),
  ];
}
export const idSepeda = (id: string): string[] => ["r1", "r2", "b1", "b2", "b3", "s"].map((p) => `${id}-${p}`);

/** Ember `${id}` dan spons `${id}-sp` (emoji spons) di pusat (x, y). */
export function ember(id: string, x: number, y: number): Obj[] {
  return [kotak(id, x - 9, y, 18, 14, "#93C5FD", "#1E3A8A", { rx: 3, tebal: 1.3, z: 2 }), emo(`${id}-sp`, x + 18, y + 14, E.spons, 14, { z: 3 })];
}
export const idEmber = (id: string): string[] => [id, `${id}-sp`];

/* ------------------------------ Turus berbundel lima ------------------------------ */
/**
 * Turus `n` (paling banyak dua puluh) pojok kiri-atas (x, y): tiap bundel lima = empat garis tegak `${id}-b{i}g{j}` dan satu coretan miring `${id}-b{i}m`
 * melintang di atas keempatnya; sisa `${id}-s{j}` garis tegak lepas. Tinggi `h`, jarak antargaris `gap`. Lebar total dikembalikan lewat `lebarTurus`.
 */
export function turus(id: string, x: number, y: number, n: number, h = 16, gap = 4, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  const bundel = Math.floor(n / 5);
  const sisa = n % 5;
  const lebarBundel = 3 * gap + gap * 2.2;
  for (let i = 0; i < bundel; i += 1) {
    const x0 = x + i * lebarBundel;
    for (let j = 0; j < 4; j += 1) out.push(garis(`${id}-b${i}g${j}`, bulatkan(x0 + j * gap), y, 0, h, warna, 1.6, { z: 2, ...o }));
    out.push(garis(`${id}-b${i}m`, bulatkan(x0 - 1.2), bulatkan(y + h * 0.82), bulatkan(3 * gap + 2.4), bulatkan(-h * 0.64), warna, 1.6, { z: 3, ...o }));
  }
  for (let j = 0; j < sisa; j += 1) out.push(garis(`${id}-s${j}`, bulatkan(x + bundel * lebarBundel + j * gap), y, 0, h, warna, 1.6, { z: 2, ...o }));
  return out;
}
/** Lebar turus `n` dalam kanvas (dengan jarak antargaris `gap`). */
export const lebarTurus = (n: number, gap = 4): number => {
  const bundel = Math.floor(n / 5);
  const sisa = n % 5;
  const lw = 5.2 * gap;
  return sisa > 0 ? bundel * lw + (sisa - 1) * gap : bundel > 0 ? (bundel - 1) * lw + 3 * gap + 2.4 : 0;
};
export const idTurus = (id: string, n: number): string[] => [
  ...Array.from({ length: Math.floor(n / 5) }, (_, i) => [...[0, 1, 2, 3].map((j) => `${id}-b${i}g${j}`), `${id}-b${i}m`]).flat(),
  ...Array.from({ length: n % 5 }, (_, j) => `${id}-s${j}`),
];
/** Id garis tegak dan miring milik bundel ke-`i` saja. */
export const idBundel = (id: string, i: number): string[] => [...[0, 1, 2, 3].map((j) => `${id}-b${i}g${j}`), `${id}-b${i}m`];

/* ------------------------------ Tabel tiga kolom ------------------------------ */
/** Sel isi tabel: teks, atau turus sebanyak n. */
export type Sel = string | { turus: number };
/**
 * Tabel tiga kolom `${id}` pojok kiri-atas (x, y), lebar kolom `kol`, tinggi baris `tb`. Kepala `${id}-h{c}` (kotak) dan `${id}-ht{c}` (teks); baris r kolom c:
 * kotak `${id}-r{r}c{c}`, teks `${id}-t{r}{c}` atau turus `${id}-u{r}-...`. Teks baris kosong ("") tidak digambar.
 */
export function tabel(id: string, x: number, y: number, kol: [number, number, number], tb: number, kepala: [string, string, string], baris: Sel[][], u = 8): Obj[] {
  const out: Obj[] = [];
  const kiri = (c: number): number => x + kol.slice(0, c).reduce((p, q) => p + q, 0);
  kepala.forEach((h, c) => {
    out.push(kotak(`${id}-h${c}`, kiri(c), y, kol[c], tb, WB.tabelHead, W.biru, { rx: 0, tebal: 1.3, z: 1 }));
    if (h) out.push(teks(`${id}-ht${c}`, bulatkan(kiri(c) + kol[c] / 2), bulatkan(y + tb / 2 + u * 0.35), h, u, W.biru, { z: 2 }));
  });
  baris.forEach((b, r) => {
    b.forEach((s, c) => {
      const y0 = y + (r + 1) * tb;
      out.push(kotak(`${id}-r${r}c${c}`, kiri(c), y0, kol[c], tb, WB.kertasTabel, W.biru, { rx: 0, tebal: 1.1, z: 1 }));
      if (typeof s === "string") {
        if (s) out.push(teks(`${id}-t${r}${c}`, bulatkan(kiri(c) + kol[c] / 2), bulatkan(y0 + tb / 2 + u * 0.35), s, u, W.biru, { z: 2 }));
      } else out.push(...turus(`${id}-u${r}`, bulatkan(kiri(c) + 4), bulatkan(y0 + 3), s.turus, bulatkan(tb - 6), 3.2));
    });
  });
  return out;
}
export const idTabel = (id: string, baris: Sel[][]): string[] => [
  ...[0, 1, 2].flatMap((c) => [`${id}-h${c}`, `${id}-ht${c}`]),
  ...baris.flatMap((b, r) => b.flatMap((s, c) => [`${id}-r${r}c${c}`, ...(typeof s === "string" ? (s ? [`${id}-t${r}${c}`] : []) : idTurus(`${id}-u${r}`, s.turus))])),
];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Pak Hasan" | "Bu Wulan";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`, membawa tas belanja `${id}-ts`;
 * Pak Hasan berseragam biru tua `${id}-bj` dan membawa papan tulis kecil `${id}-pt`; Bu Wulan berbaju oranye `${id}-bj` dan berhelm kuning `${id}-hl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Bu Wulan" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 12), bulatkan(y - u * 0.78), 24, 6, "#D4A55A", "#92400E", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
    out.push(kotak(`${id}-ts`, x - 19, bulatkan(y + 3), 7, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hasan") {
    out.push(baju("#1E40AF", "#1E3A8A", 12));
    out.push(kotak(`${id}-pt`, x + 12, bulatkan(y + 1), 10, 12, "#166534", "#14532D", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Wulan") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-hl`, bulatkan(x - 11), bulatkan(y - u * 0.82), 22, 7, W.kuning, "#A16207", { rx: 3, tebal: 1.1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Hasan" || nama === "Bu Wulan" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`, `${id}-ts`] : []),
  ...(nama === "Pak Hasan" ? [`${id}-bj`, `${id}-pt`] : []),
  ...(nama === "Bu Wulan" ? [`${id}-bj`, `${id}-hl`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
