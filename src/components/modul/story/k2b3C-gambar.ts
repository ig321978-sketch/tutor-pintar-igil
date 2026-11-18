import type { Obj } from "./logika-story";
import { W, bulat, emo, garis, judul, kartu, kotak, poligon, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 3 Sub-Bab C "Gudang Mainan Pak Rudi" (bangun ruang), akhir cerita Taman Bermain Sekolah.
 * Gudang berpintu lebar, rak bernama, rak miring dan papan lereng, wadah berpagar, tas kain misteri, bantalan tinta,
 * bangun ruang digambar sendiri (kubus, balok, tabung, kerucut, bola, kardus, kaleng, dadu, topi pesta, kotak pensil),
 * tabel catatan, gerbang taman dengan spanduk dan konfeti, serta tokoh (Chacha, Dika, Nia, Bu Sari, Pak Rudi).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks };

/** Emoji hanya dari blok di atas U+1F000 (dan paling tinggi U+1FA95), tanpa ZWJ. */
export const E = {
  anak: "\u{1F467}",
  dika: "\u{1F913}",
  wanita: "\u{1F469}",
  pria: "\u{1F468}",
  topi: "\u{1F9E2}",
  tanya: "\u{1F914}",
  kaget: "\u{1F631}",
  tertawa: "\u{1F602}",
  lega: "\u{1F60C}",
  sedih: "\u{1F622}",
  senang: "\u{1F604}",
  bintang: "\u{1F31F}",
  tepuk: "\u{1F44F}",
  lambai: "\u{1F44B}",
  kaca: "\u{1F50D}",
  tangan: "\u{1F64B}",
  catat: "\u{1F4DD}",
  konfeti: "\u{1F389}",
  pita: "\u{1F380}",
  balon: "\u{1F388}",
  raba: "\u{1F91A}",
  mata: "\u{1F440}",
  jempol: "\u{1F44D}",
  kertas: "\u{1F4C4}",
  seru: "\u{1F4A2}",
  angin: "\u{1F4A8}",
  lampu: "\u{1F4A1}",
  tos: "\u{1F64C}",
  kuat: "\u{1F4AA}",
  larian: "\u{1F3C3}",
  tas: "\u{1F45C}",
  bola: "\u{1F3C0}",
} as const;

export const WK = {
  lantai: "#E8D5B5",
  lantaiTaman: "#BBF7D0",
  kayu: "#D6A15E",
  kayuTua: "#92400E",
  rak: "#C08457",
  besi: "#94A3B8",
  gelap: "#334155",
  helm: "#FDE047",
  baret: "#7F1D1D",
  kain: "#B45309",
  tinta: "#1E3A8A",
  kertas: "#FFFFFF",
  kubus: "#60A5FA",
  balok: "#FB923C",
  tabung: "#34D399",
  kerucut: "#F87171",
  bola: "#FACC15",
  kardus: "#D6A15E",
  kaleng: "#CBD5E1",
  topi: "#F472B6",
  kelereng: "#38BDF8",
  dadu: "#FFFFFF",
  pensil: "#A78BFA",
  sorotBiru: "#93C5FD",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };
type Opsi = Partial<Obj>;

/** Campur warna `#RRGGBB` dengan putih (t > 0) atau hitam (t < 0). */
export function campur(hex: string, t: number): string {
  const n = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const h = n.map((v) => Math.round(t >= 0 ? v + (255 - v) * t : v * (1 + t)));
  return `#${h.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Lantai gudang `${id}`: dari tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 150, warna: string = WK.lantai): Obj => kotak(id, 2, y, 296, 198 - y, warna, "#B08968", { rx: 4, tebal: 1.2, z: -3 });

export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/* ------------------------------ Tokoh ------------------------------ */

export type JenisTokoh = "chacha" | "dika" | "nia" | "sari" | "rudi";
const NAMA_TOKOH: Record<JenisTokoh, string> = { chacha: "Chacha", dika: "Dika", nia: "Nia", sari: "Bu Sari", rudi: "Pak Rudi" };
/**
 * Tokoh berdiri berpusat (x, y): wajah `${id}` dan nama `${id}-n`. Nia memakai topi `${id}-tp`; Bu Sari memakai helm proyek kuning `${id}-hm`;
 * Pak Rudi memakai baret merah tua `${id}-br`.
 */
export function tokoh(id: string, x: number, y: number, jenis: JenisTokoh, u = 30): Obj[] {
  const wajah = jenis === "dika" ? E.dika : jenis === "sari" ? E.wanita : jenis === "rudi" ? E.pria : E.anak;
  const out: Obj[] = [emo(id, x, y, wajah, u), teks(`${id}-n`, x, f(y + 14), NAMA_TOKOH[jenis], 8.4, W.ungu)];
  if (jenis === "nia") out.push(emo(`${id}-tp`, x, f(y - 13), E.topi, 15, { z: 1 }));
  if (jenis === "sari") out.push(kotak(`${id}-hm`, f(x - 8), f(y - 21), 16, 7, WK.helm, W.biru, { rx: 3, tebal: 1.2, z: 1 }));
  if (jenis === "rudi") out.push(kotak(`${id}-br`, f(x - 9), f(y - 21), 18, 6, WK.baret, W.biru, { rx: 3, tebal: 1.2, z: 1 }));
  return out;
}
export const idTokoh = (id: string, jenis: JenisTokoh): string[] => [id, `${id}-n`, ...(jenis === "nia" ? [`${id}-tp`] : []), ...(jenis === "sari" ? [`${id}-hm`] : []), ...(jenis === "rudi" ? [`${id}-br`] : [])];
/** Pindah tokoh ke (x, y) bersama namanya dan topinya. */
export const geserTokoh = (id: string, x: number, y: number, jenis: JenisTokoh): Ubah[] => [
  { id, x, y },
  { id: `${id}-n`, x, y: f(y + 14) },
  ...(jenis === "nia" ? [{ id: `${id}-tp`, x, y: f(y - 13) }] : []),
  ...(jenis === "sari" ? [{ id: `${id}-hm`, x: f(x - 8), y: f(y - 21) }] : []),
  ...(jenis === "rudi" ? [{ id: `${id}-br`, x: f(x - 9), y: f(y - 21) }] : []),
];

/* ------------------------------ Bentuk dasar ------------------------------ */

/** Elips berpusat (cx, cy): jalur kurva `${id}`. */
export function elips(id: string, cx: number, cy: number, rx: number, ry: number, warna: string, o: Opsi = {}): Obj {
  const kx = f(rx * 0.5523);
  const ky = f(ry * 0.5523);
  return {
    id,
    t: "jalur",
    x: cx,
    y: cy,
    d: `M${rx} 0 C${rx} ${ky} ${kx} ${ry} 0 ${ry} C${-kx} ${ry} ${-rx} ${ky} ${-rx} 0 C${-rx} ${-ky} ${-kx} ${-ry} 0 ${-ry} C${kx} ${-ry} ${rx} ${-ky} ${rx} 0 Z`,
    warna,
    garis: W.biru,
    tebal: 1.6,
    ...o,
  };
}

const pol = (id: string, cx: number, cy: number, rel: [number, number][], warna: string, o: Opsi = {}): Obj =>
  poligon(id, cx, cy, rel.map(([x, y]) => ({ x: f(x), y: f(y) })), warna, { tebal: 1.6, ...o });

/** Bangun ruang bersisi datar (balok): muka depan `${id}-d`, atas `${id}-a`, samping `${id}-s`. Lebar w, tinggi h, kedalaman d; pusat kotak pembatas (w + d) x (h + d) di (cx, cy). */
export function balok(id: string, cx: number, cy: number, w: number, h: number, d: number, warna: string, o: Opsi = {}): Obj[] {
  const x0 = -(w + d) / 2;
  const y0 = -(h + d) / 2;
  return [
    pol(`${id}-d`, cx, cy, [[x0, y0 + d], [x0 + w, y0 + d], [x0 + w, y0 + d + h], [x0, y0 + d + h]], warna, o),
    pol(`${id}-a`, cx, cy, [[x0, y0 + d], [x0 + d, y0], [x0 + d + w, y0], [x0 + w, y0 + d]], campur(warna, 0.45), o),
    pol(`${id}-s`, cx, cy, [[x0 + w, y0 + d], [x0 + w + d, y0], [x0 + w + d, y0 + h], [x0 + w, y0 + d + h]], campur(warna, -0.25), o),
  ];
}
/** Kubus: balok dengan sisi s. */
export const kubus = (id: string, cx: number, cy: number, s: number, warna: string = WK.kubus, o: Opsi = {}): Obj[] => balok(id, cx, cy, s, s, f(s * 0.4), warna, o);

/** Tabung: elips bawah `${id}-b`, badan `${id}-d`, tutup atas `${id}-a`. Lebar w, tinggi total h. */
export function tabung(id: string, cx: number, cy: number, w: number, h: number, warna: string = WK.tabung, o: Opsi = {}): Obj[] {
  const ry = f(w * 0.2);
  const atas = f(cy - h / 2 + ry);
  const bawah = f(cy + h / 2 - ry);
  return [
    elips(`${id}-b`, cx, bawah, w / 2, ry, campur(warna, -0.15), { tebal: 1.6, ...o }),
    kotak(`${id}-d`, f(cx - w / 2), atas, w, f(bawah - atas), warna, undefined, { rx: 0, ...o }),
    gs(`${id}-g1`, f(cx - w / 2), atas, f(cx - w / 2), bawah, W.biru, 1.6, o),
    gs(`${id}-g2`, f(cx + w / 2), atas, f(cx + w / 2), bawah, W.biru, 1.6, o),
    elips(`${id}-a`, cx, atas, w / 2, ry, campur(warna, 0.45), { tebal: 1.6, ...o }),
  ];
}
/** Kerucut: elips alas `${id}-b` dan badan segitiga `${id}-d`. Lebar alas w, tinggi total h. */
export function kerucut(id: string, cx: number, cy: number, w: number, h: number, warna: string = WK.kerucut, o: Opsi = {}): Obj[] {
  const ry = f(w * 0.18);
  const bawah = f(cy + h / 2 - ry);
  return [
    elips(`${id}-b`, cx, bawah, w / 2, ry, campur(warna, -0.15), { tebal: 1.6, ...o }),
    pol(`${id}-d`, cx, cy, [[0, -h / 2], [w / 2, h / 2 - ry], [-w / 2, h / 2 - ry]], warna, o),
  ];
}
/** Bola: bulatan `${id}` dan kilap `${id}-k`. */
export const bola = (id: string, cx: number, cy: number, r: number, warna: string = WK.bola, o: Opsi = {}): Obj[] => [
  bulat(id, cx, cy, r, warna, W.biru, { tebal: 1.6, ...o }),
  bulat(`${id}-k`, f(cx - r * 0.35), f(cy - r * 0.35), f(r * 0.25), "#FFFFFF", undefined, { op: 0.75, ...o }),
];

export type JenisBenda = "bola" | "kardus" | "kaleng" | "dadu" | "topi" | "kelereng" | "pensil" | "kubus" | "balok" | "tabung" | "kerucut";

/** Benda mainan berpusat (cx, cy), tinggi sekitar t. Id bagian lihat `idBenda`. */
export function benda(id: string, jenis: JenisBenda, cx: number, cy: number, t = 30, o: Opsi = {}): Obj[] {
  switch (jenis) {
    case "bola":
      return bola(id, cx, cy, f(t / 2), WK.bola, o);
    case "kelereng":
      return bola(id, cx, cy, f(t / 2), WK.kelereng, o);
    case "kubus":
      return kubus(id, cx, cy, f(t * 0.7), WK.kubus, o);
    case "dadu": {
      const s = f(t * 0.7);
      const d = f(s * 0.4);
      const px = f(cx - d / 2);
      const py = f(cy + d / 2);
      return [...balok(id, cx, cy, s, s, d, WK.dadu, o), ...[[-0.22, -0.22], [0, 0], [0.22, 0.22]].map(([a, b], i) => bulat(`${id}-p${i}`, f(px + a * s), f(py + b * s), f(s * 0.08), W.biru, undefined, { z: 1, ...o }))];
    }
    case "kardus": {
      const w = f(t * 1.1);
      const h = f(t * 0.7);
      const d = f(t * 0.3);
      return [...balok(id, cx, cy, w, h, d, WK.kardus, o), kotak(`${id}-t`, f(cx - (w + d) / 2 + w * 0.42), f(cy - (h + d) / 2 + d), f(w * 0.16), h, "#FDE68A", undefined, { rx: 0, z: 1, ...o })];
    }
    case "pensil":
      return balok(id, cx, cy, f(t * 1.3), f(t * 0.3), f(t * 0.25), WK.pensil, o);
    case "balok":
      return balok(id, cx, cy, f(t * 1.1), f(t * 0.5), f(t * 0.3), WK.balok, o);
    case "kaleng":
      return [...tabung(id, cx, cy, f(t * 0.7), t, WK.kaleng, o), kotak(`${id}-l`, f(cx - t * 0.35), f(cy - t * 0.1), f(t * 0.7), f(t * 0.3), "#F87171", undefined, { rx: 0, z: 1, ...o })];
    case "tabung":
      return tabung(id, cx, cy, f(t * 0.7), t, WK.tabung, o);
    case "kerucut":
      return kerucut(id, cx, cy, f(t * 0.7), t, WK.kerucut, o);
    case "topi":
      return [...kerucut(id, cx, cy, f(t * 0.7), t, WK.topi, o), bulat(`${id}-p`, cx, f(cy - t / 2), f(t * 0.1), W.emas, W.biru, { tebal: 1.2, z: 1, ...o })];
  }
}
const SUFIKS: Record<JenisBenda, string[]> = {
  bola: ["", "-k"],
  kelereng: ["", "-k"],
  kubus: ["-d", "-a", "-s"],
  dadu: ["-d", "-a", "-s", "-p0", "-p1", "-p2"],
  kardus: ["-d", "-a", "-s", "-t"],
  pensil: ["-d", "-a", "-s"],
  balok: ["-d", "-a", "-s"],
  kaleng: ["-b", "-d", "-g1", "-g2", "-a", "-l"],
  tabung: ["-b", "-d", "-g1", "-g2", "-a"],
  kerucut: ["-b", "-d"],
  topi: ["-b", "-d", "-p"],
};
export const idBenda = (id: string, jenis: JenisBenda): string[] => SUFIKS[jenis].map((s) => `${id}${s}`);
/** Pindah benda ke (dx, dy) relatif terhadap letak awal? Tidak: ubah x dan y tiap bagian lewat selisih. */
export const geserBenda = (objs: Obj[], dx: number, dy: number): Ubah[] => objs.map((o) => ({ id: o.id, x: f((o.x ?? 0) + dx), y: f((o.y ?? 0) + dy) }));

/* ------------------------------ Gudang, rak, lereng ------------------------------ */

/** Gudang berpintu lebar terbuka: dinding `${id}`, lubang gelap `${id}-g`, daun pintu `${id}-p1`, `${id}-p2`, papan nama `${id}-n`. */
export const gudang = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FED7AA", WK.kayuTua, { rx: 4, tebal: 2.4, z: -2 }),
  kotak(`${id}-g`, f(x + w * 0.2), f(y + 14), f(w * 0.6), f(h - 14), WK.gelap, W.biru, { rx: 2, tebal: 1.6, z: -1 }),
  kotak(`${id}-p1`, f(x + w * 0.08), f(y + 14), f(w * 0.12), f(h - 14), WK.kayu, WK.kayuTua, { rx: 1, tebal: 1.4 }),
  kotak(`${id}-p2`, f(x + w * 0.8), f(y + 14), f(w * 0.12), f(h - 14), WK.kayu, WK.kayuTua, { rx: 1, tebal: 1.4 }),
  teks(`${id}-n`, f(x + w / 2), f(y + 10), "GUDANG MAINAN", 8, WK.kayuTua),
];
export const idGudang = (id: string): string[] => [id, `${id}-g`, `${id}-p1`, `${id}-p2`, `${id}-n`];

/** Rak datar: papan `${id}`, dua kaki `${id}-k1`, `${id}-k2`. Pojok kiri-atas papan (x, y), lebar w. */
export const rak = (id: string, x: number, y: number, w: number, tinggiKaki = 22): Obj[] => [
  kotak(id, x, y, w, 5, WK.rak, WK.kayuTua, { rx: 1, tebal: 1.6 }),
  gs(`${id}-k1`, f(x + 4), f(y + 5), f(x + 4), f(y + 5 + tinggiKaki), WK.kayuTua, 3, { z: -1 }),
  gs(`${id}-k2`, f(x + w - 4), f(y + 5), f(x + w - 4), f(y + 5 + tinggiKaki), WK.kayuTua, 3, { z: -1 }),
];
export const idRak = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];

/** Papan miring (rak miring atau lereng): garis tebal `${id}` dari (x, y) turun sejauh turun di sebelah kanan, kaki `${id}-k`. */
export const lereng = (id: string, x: number, y: number, panjang: number, turun: number, warna: string = WK.rak): Obj[] => [
  gs(id, x, y, f(x + panjang), f(y + turun), warna, 6),
  gs(`${id}-k`, f(x + panjang), f(y + turun), f(x + panjang), f(y + turun + 22), WK.kayuTua, 3, { z: -1 }),
];
export const idLereng = (id: string): string[] => [id, `${id}-k`];

/** Wadah berpagar: alas `${id}` dan lima pagar tegak `${id}-p0` sampai `${id}-p4`. */
export const wadah = (id: string, x: number, y: number, w: number, h = 16): Obj[] => [
  kotak(id, x, f(y + h - 4), w, 4, WK.kain, WK.kayuTua, { rx: 1, tebal: 1.4 }),
  ...Array.from({ length: 5 }, (_, i) => gs(`${id}-p${i}`, f(x + 2 + ((w - 4) * i) / 4), y, f(x + 2 + ((w - 4) * i) / 4), f(y + h - 4), WK.kayuTua, 2)),
];
export const idWadah = (id: string): string[] => [id, ...Array.from({ length: 5 }, (_, i) => `${id}-p${i}`)];

/** Tas kain misteri: badan segi empat melengkung `${id}`, tali `${id}-t`, tanda tanya `${id}-q`. Pusat (cx, cy). */
export const tasKain = (id: string, cx: number, cy: number, s = 40): Obj[] => [
  pol(id, cx, cy, [[-s / 2, -s / 3], [s / 2, -s / 3], [s * 0.6, s / 2], [-s * 0.6, s / 2]], WK.kain),
  gs(`${id}-t`, f(cx - s / 2), f(cy - s / 3), f(cx + s / 2), f(cy - s / 3), WK.kayuTua, 3, { z: 1 }),
  teks(`${id}-q`, cx, f(cy + s * 0.2), "?", 18, W.putih, { z: 2 }),
];
export const idTasKain = (id: string): string[] => [id, `${id}-t`, `${id}-q`];

/** Bantalan tinta biru: badan `${id}` dan permukaan tinta `${id}-i`. Pojok kiri-atas (x, y). */
export const bantalan = (id: string, x: number, y: number, w: number, h = 14): Obj[] => [
  kotak(id, x, y, w, h, WK.gelap, W.biru, { rx: 3, tebal: 1.6 }),
  kotak(`${id}-i`, f(x + 3), f(y + 3), f(w - 6), f(h - 6), WK.tinta, undefined, { rx: 2, z: 1 }),
];
export const idBantalan = (id: string): string[] => [id, `${id}-i`];

/** Lembar kertas putih `${id}`. */
export const kertas = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WK.kertas, WK.besi, { rx: 2, tebal: 1.6 });

/* ------------------------------ Papan catatan dan tabel ------------------------------ */

/** Papan catatan berbingkai kayu: `${id}`. */
export const papanCatatan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "#FFFBEB", WK.kayuTua, { rx: 4, tebal: 3, z: -1 });

/** Sel tabel: kotak `${id}` dan teks `${id}t` (tidak ada bila isi kosong). */
export const sel = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string, u: number, tebal = 1.2): Obj[] => [
  kotak(id, x, y, w, h, warna, W.biru, { rx: 1, tebal }),
  ...(isi === "" ? [] : [teks(`${id}t`, f(x + w / 2), f(y + h / 2 + u * 0.35), isi, u, W.biru)]),
];
export const KOLOM_TB = [78, 96] as const;
export const TINGGI_TB = 20;
/**
 * Tabel dua kolom (Bangun, Benda): kepala `${id}-h0`, `${id}-h1`; baris i: `${id}-r{i}a` (bangun), `${id}-r{i}b` (benda); tiap sel kotak dengan teks `...t`.
 * Pojok kiri-atas (x, y). Isi sel boleh kosong.
 */
export function tabelRuang(id: string, x: number, y: number, baris: { bangun: string; benda: string }[]): Obj[] {
  const h = TINGGI_TB;
  return [
    ...sel(`${id}-h0`, x, y, KOLOM_TB[0], h, "Bangun ruang", W.lavender, 8, 1.4),
    ...sel(`${id}-h1`, x + KOLOM_TB[0], y, KOLOM_TB[1], h, "Benda", W.lavender, 8, 1.4),
    ...baris.flatMap((b, i) => [...sel(`${id}-r${i}a`, x, y + h * (i + 1), KOLOM_TB[0], h, b.bangun, W.putih, 9.4), ...sel(`${id}-r${i}b`, x + KOLOM_TB[0], y + h * (i + 1), KOLOM_TB[1], h, b.benda, W.putih, 9.4)]),
  ];
}
export const idTabelRuang = (id: string, n: number): string[] => [`${id}-h0`, `${id}-h0t`, `${id}-h1`, `${id}-h1t`, ...Array.from({ length: n }, (_, i) => ["a", "b"].flatMap((c) => [`${id}-r${i}${c}`, `${id}-r${i}${c}t`])).flat()];
/** Teks isi sel baris i kolom c (0 atau 1) yang selnya dibuat kosong. */
export const isiTabelRuang = (id: string, x: number, y: number, i: number, c: 0 | 1, isi: string, warna: string = W.biru): Obj =>
  teks(`${id}-r${i}${"ab"[c]}t`, f(x + (c === 0 ? KOLOM_TB[0] / 2 : KOLOM_TB[0] + KOLOM_TB[1] / 2)), f(y + TINGGI_TB * (i + 1) + TINGGI_TB / 2 + 3.3), isi, 9.4, warna);

/* ------------------------------ Taman dan perayaan ------------------------------ */

/** Gerbang taman berpita: dua tiang `${id}-t1`, `${id}-t2`, spanduk `${id}` dan tulisan `${id}-n`. */
export const gerbang = (id: string, x: number, y: number, w: number, tulisan = "Taman Dibuka"): Obj[] => [
  kotak(`${id}-t1`, x, f(y + 8), 8, 70, WK.kayu, WK.kayuTua, { rx: 2, tebal: 1.6 }),
  kotak(`${id}-t2`, f(x + w - 8), f(y + 8), 8, 70, WK.kayu, WK.kayuTua, { rx: 2, tebal: 1.6 }),
  kotak(id, f(x - 4), y, f(w + 8), 24, "#FDE68A", WK.kayuTua, { rx: 5, tebal: 2.4, z: 1 }),
  teks(`${id}-n`, f(x + w / 2), f(y + 16), tulisan, 11, W.merah, { z: 2 }),
];
export const idGerbang = (id: string): string[] => [`${id}-t1`, `${id}-t2`, id, `${id}-n`];

const WARNA_KONFETI = ["#F87171", "#FACC15", "#60A5FA", "#4ADE80", "#C084FC", "#FB923C"];
/** Konfeti kotak kecil `${id}0` sampai `${id}{n-1}` tersebar di dalam kotak pembatas (x, y, w, h) secara tetap. */
export const konfeti = (id: string, x: number, y: number, w: number, h: number, n = 12): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(x + ((i * 37 + 11) % 97) * (w / 97)), f(y + ((i * 53 + 7) % 89) * (h / 89)), 5, 5, WARNA_KONFETI[i % WARNA_KONFETI.length], undefined, { rx: 1, rot: (i * 29) % 90 }));
export const idKonfeti = (id: string, n = 12): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Petak ubin kuning dan hijau berselang-seling: `${id}{baris}{kolom}`. Pojok kiri-atas (x, y), sisi s. */
export const petakUbin = (id: string, x: number, y: number, baris: number, kolom: number, s = 14): Obj[] =>
  Array.from({ length: baris * kolom }, (_, q) => {
    const b = Math.floor(q / kolom);
    const c = q % kolom;
    return kotak(`${id}${b}${c}`, f(x + c * s), f(y + b * s), s, s, (b + c) % 2 === 0 ? "#FDE047" : "#86EFAC", W.biru, { rx: 1, tebal: 1 });
  });
export const idPetakUbin = (id: string, baris: number, kolom: number): string[] => Array.from({ length: baris * kolom }, (_, q) => `${id}${Math.floor(q / kolom)}${q % kolom}`);

/** Papan puzzle kecil berkeping warna-warni: `${id}{i}` (empat keping 2 x 2). Pojok kiri-atas (x, y), sisi s. */
export const papanPuzzle = (id: string, x: number, y: number, s = 16): Obj[] =>
  ["#F87171", "#60A5FA", "#FACC15", "#4ADE80"].map((w, i) => kotak(`${id}${i}`, f(x + (i % 2) * s), f(y + Math.floor(i / 2) * s), s, s, w, W.biru, { rx: 2, tebal: 1.2 }));
export const idPapanPuzzle = (id: string): string[] => [0, 1, 2, 3].map((i) => `${id}${i}`);

/** Pindah bola `${id}` (bulatan dan kilap) ke (x, y) dengan jari-jari r. */
export const geserBola = (id: string, x: number, y: number, r: number): Ubah[] => [
  { id, x, y },
  { id: `${id}-k`, x: f(x - r * 0.35), y: f(y - r * 0.35) },
];
