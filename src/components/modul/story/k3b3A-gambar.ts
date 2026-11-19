import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 3 Sub-Bab A "Ukuran Kandang Kak Tari" (mengukur panjang dengan satuan baku), awal cerita Kebun Binatang Mini.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa kebun binatang: rumput, gerbang kayu, pagar kandang, kandang kecil, meja kayu, papan nama, penggaris bergaris sentimeter, meteran bergaris meter,
 * kertas catatan, jejak kaki. Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga),
 * Kak Tari (pemandu berseragam cokelat, topi safari, berpeluit), Pak Wayan (tukang kandang, topi bambu, pita kuning di pinggang). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Penggaris: tubuh kuning, tanda biru. Meteran: pita kuning tua. */
  penggaris: "#FDE68A",
  meteran: "#FCD34D",
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
  pel: "\u{1F9F9}",
  penggaris: "\u{1F4CF}",
  kaki: "\u{1F463}",
  jari: "\u{261D}",
  kelinci: "\u{1F407}",
  kambing: "\u{1F410}",
  kura: "\u{1F422}",
  beo: "\u{1F99C}",
  rusa: "\u{1F98C}",
  wortel: "\u{1F955}",
  krayon: "\u{1F58D}",
  kardus: "\u{1F4E6}",
  sorak: "\u{1F389}",
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
/** Busur dari (x1, y) ke (x2, y) setinggi h (h negatif melengkung ke bawah). */
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
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Kebun binatang ------------------------------ */
export const WK = {
  rumput: "#BBF7D0",
  rumputGaris: "#4ADE80",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kayuMuda: "#D6A15E",
  jalan: "#E7D3A5",
  kawat: "#64748B",
  meja: "#C99A63",
} as const;

/** Rumput `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WK.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WK.rumputGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WK.rumputGaris, 1.4, { z: -2 })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja kayu `${id}` (permukaan) tepat di bawah y: pojok kiri-atas (14, y), lebar 272. */
export function meja(id: string, y = 128): Obj[] {
  return [kotak(id, 14, y, 272, 12, WK.meja, WK.kayuTua, { rx: 2, tebal: 1.4, z: -1 }), garis(`${id}-g`, 20, y + 6, 260, 0, WK.kayuTua, 0.6, { z: -1 })];
}
export const idMeja = (id: string): string[] => [id, `${id}-g`];

/** Gerbang kayu: dua tiang `${id}-p1` `${id}-p2`, palang atas `${id}-b` dengan tulisan `${id}-t`. Pusat (cx), dasar yb, lebar w, tinggi h. */
export function gerbang(id: string, cx: number, yb: number, w = 110, h = 66, isi = "KEBUN BINATANG MINI"): Obj[] {
  const tiang = 8;
  return [
    kotak(`${id}-p1`, bulatkan(cx - w / 2), yb - h, tiang, h, WK.kayu, WK.kayuTua, { rx: 1, tebal: 1.2, z: 0 }),
    kotak(`${id}-p2`, bulatkan(cx + w / 2 - tiang), yb - h, tiang, h, WK.kayu, WK.kayuTua, { rx: 1, tebal: 1.2, z: 0 }),
    kotak(`${id}-b`, bulatkan(cx - w / 2 - 4), yb - h - 2, w + 8, 18, WK.kayuMuda, WK.kayuTua, { rx: 3, tebal: 1.4, z: 1 }),
    teks(`${id}-t`, cx, yb - h + 11, isi, 6.6, W.biru, { z: 2 }),
  ];
}
export const idGerbang = (id: string): string[] => ["p1", "p2", "b", "t"].map((s) => `${id}-${s}`);

/** Pagar kandang: `n` tiang `${id}-t0`.. berjarak `jarak`, dua palang `${id}-r1` `${id}-r2`. Tiang pertama di x, dasar yb, tinggi h. */
export function pagar(id: string, x: number, yb: number, n: number, jarak: number, h = 30): Obj[] {
  const lebar = (n - 1) * jarak;
  return [
    ...Array.from({ length: n }, (_, i) => kotak(`${id}-t${i}`, bulatkan(x + i * jarak - 2), yb - h, 4, h, WK.kayu, WK.kayuTua, { rx: 1, tebal: 1, z: 1 })),
    kotak(`${id}-r1`, x, yb - h + 6, lebar, 4, WK.kayuMuda, WK.kayuTua, { rx: 1, tebal: 1, z: 2 }),
    kotak(`${id}-r2`, x, yb - 12, lebar, 4, WK.kayuMuda, WK.kayuTua, { rx: 1, tebal: 1, z: 2 }),
  ];
}
export const idPagar = (id: string, n: number): string[] => [...Array.from({ length: n }, (_, i) => `${id}-t${i}`), `${id}-r1`, `${id}-r2`];

/** Kandang kecil berkawat: badan `${id}` dan tiga kawat tegak `${id}-w0`... Pojok kiri-atas (x, y). */
export function kandang(id: string, x: number, y: number, w = 40, h = 30): Obj[] {
  return [
    kotak(id, x, y, w, h, "#E2E8F0", WK.kawat, { rx: 2, tebal: 1.4, z: 0 }),
    ...[1, 2, 3].map((i) => garis(`${id}-w${i - 1}`, bulatkan(x + (w * i) / 4), y + 1, 0, h - 2, WK.kawat, 0.8, { z: 1 })),
  ];
}
export const idKandang = (id: string): string[] => [id, `${id}-w0`, `${id}-w1`, `${id}-w2`];

/** Papan nama di atas tiang: tiang `${id}-s`, papan dan tulisan lewat kartu `${id}-k`, `${id}-t0`. Pojok kiri-atas papan (x, y). */
export function papanNama(id: string, x: number, y: number, w: number, h: number, isi: string, u = 8): Obj[] {
  return [kotak(`${id}-s`, bulatkan(x + w / 2 - 2), bulatkan(y + h), 4, 20, WK.kayu, WK.kayuTua, { rx: 0, tebal: 1, z: 0 }), ...kartu(id, x, y, w, h, "#FDE68A", [isi], u, { z: 1 })];
}
export const idPapanNama = (id: string): string[] => [`${id}-s`, `${id}-k`, `${id}-t0`];

/** Kertas catatan putih `${id}-k` dengan baris tulisan `${id}-t0`.. Pojok kiri-atas (x, y). */
export function kertas(id: string, x: number, y: number, w: number, h: number, baris: string[], u = 10): Obj[] {
  return kartu(id, x, y, w, h, W.putih, baris, u, { rx: 3, z: 1 });
}

/* ------------------------------ Penggaris dan meteran ------------------------------ */
/**
 * Penggaris `${id}` sepanjang `cm` sentimeter (lebar `px` tiap sentimeter), pojok kiri-atas (x, y), tinggi 16.
 * Tanda `${id}-m0`.. tiap sentimeter, angka `${id}-a0`.. tiap `tiap` sentimeter.
 */
export function penggaris(id: string, x: number, y: number, cm: number, px: number, tiap = 1, warna: string = W.penggaris): Obj[] {
  const out: Obj[] = [kotak(id, x, y, cm * px, 16, warna, W.biru, { rx: 2, tebal: 1.2, z: 1 })];
  for (let i = 0; i <= cm; i += 1) {
    out.push(garis(`${id}-m${i}`, bulatkan(x + i * px), y, 0, i % 5 === 0 ? 8 : 5, W.biru, i % 5 === 0 ? 1.2 : 0.8, { z: 2 }));
    if (i % tiap === 0) out.push(teks(`${id}-a${i}`, bulatkan(x + i * px), y + 14, String(i), 5.8, W.biru, { z: 2 }));
  }
  return out;
}
export const idPenggaris = (id: string, cm: number, tiap = 1): string[] => [id, ...Array.from({ length: cm + 1 }, (_, i) => [`${id}-m${i}`, ...(i % tiap === 0 ? [`${id}-a${i}`] : [])]).flat()];

/** Meteran `${id}` sepanjang `m` meter (lebar `px` tiap meter), pojok kiri-atas (x, y), tinggi 16. Tanda tiap setengah meter, angka `${id}-a0`.. tiap meter. */
export function meteran(id: string, x: number, y: number, m: number, px: number): Obj[] {
  const out: Obj[] = [kotak(id, x, y, m * px, 16, W.meteran, W.biru, { rx: 2, tebal: 1.2, z: 1 })];
  for (let i = 0; i <= m * 2; i += 1) out.push(garis(`${id}-m${i}`, bulatkan(x + (i * px) / 2), y, 0, i % 2 === 0 ? 8 : 5, W.biru, i % 2 === 0 ? 1.2 : 0.8, { z: 2 }));
  for (let i = 0; i <= m; i += 1) out.push(teks(`${id}-a${i}`, bulatkan(x + i * px), y + 14, String(i), 6.4, W.biru, { z: 2 }));
  return out;
}
export const idMeteran = (id: string, m: number): string[] => [id, ...Array.from({ length: m * 2 + 1 }, (_, i) => `${id}-m${i}`), ...Array.from({ length: m + 1 }, (_, i) => `${id}-a${i}`)];

/** Gulungan meteran kecil `${id}` (lingkaran dengan pita) di pusat (x, y). */
export function gulungan(id: string, x: number, y: number, r = 7): Obj[] {
  return [bulat(id, x, y, r, W.meteran, W.biru, { tebal: 1.4, z: 2 }), bulat(`${id}-i`, x, y, bulatkan(r * 0.4), W.putih, W.biru, { tebal: 1, z: 3 }), kotak(`${id}-p`, x + r - 1, y + r - 4, 12, 4, W.meteran, W.biru, { rx: 1, tebal: 1, z: 2 })];
}
export const idGulungan = (id: string): string[] => [id, `${id}-i`, `${id}-p`];

/** Satu batang benda `${id}` (kotak berwarna) dengan tulisan `${id}-t` di tengah (boleh kosong), pojok kiri-atas (x, y). */
export function batang(id: string, x: number, y: number, w: number, h: number, warna: string, isi?: string, u = 8): Obj[] {
  return [kotak(id, x, y, w, h, warna, W.biru, { rx: 2, tebal: 1.3, z: 2 }), ...(isi ? [teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, W.biru, { z: 3 })] : [])];
}
export const idBatang = (id: string, ada = true): string[] => [id, ...(ada ? [`${id}-t`] : [])];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Kak Tari" | "Pak Wayan";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`;
 * Kak Tari berseragam cokelat `${id}-bj`, bertopi safari `${id}-tp`, berpeluit `${id}-pl`; Pak Wayan berbaju cokelat tua `${id}-bj`, bertopi bambu `${id}-tp`, berpita kuning di pinggang `${id}-pt`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" || nama === "Pak Wayan" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-tp`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(topi("#D4A55A", "#92400E", 24));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Kak Tari") {
    out.push(baju("#92400E", "#451A03", 10));
    out.push(topi("#CA8A04", "#713F12", 24));
    out.push(bulat(`${id}-pl`, x + 9, bulatkan(y + 4), 2.6, "#FBBF24", "#92400E", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Pak Wayan") {
    out.push(baju("#78350F", "#451A03", 12));
    out.push(topi("#E7C48F", "#92400E", 26));
    out.push(kotak(`${id}-pt`, x - 11, bulatkan(y + 11), 22, 3, "#FACC15", "#A16207", { rx: 1, tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Wayan" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Kak Tari" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
  ...(nama === "Pak Wayan" ? [`${id}-bj`, `${id}-tp`, `${id}-pt`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
