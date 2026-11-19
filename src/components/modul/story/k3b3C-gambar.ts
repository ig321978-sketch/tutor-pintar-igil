import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 3 Sub-Bab C "Pakan Bu Lastri" (mengukur berat dengan satuan baku), cerita Kebun Binatang Mini.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa gudang pakan: dinding dan lantai kayu, karung goni, keranjang wortel, rak, timbangan duduk berjarum (muka bulat, jarum), timbangan digital (layar), timbangan badan, timbangan kodok kecil.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga, bertas bekal),
 * Bu Lastri (juru pakan, apron hijau, berkertas catatan), Dokter Hana (dokter hewan, jas putih, bersetetoskop). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  hijauMuda: "#DCFCE7",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  bintang: "\u{2B50}",
  bulan: "\u{1F319}",
  kelinci: "\u{1F407}",
  beo: "\u{1F99C}",
  kambing: "\u{1F410}",
  wortel: "\u{1F955}",
  jagung: "\u{1F33D}",
  telur: "\u{1F95A}",
  biji: "\u{1F33E}",
  sendok: "\u{1F944}",
  tangan: "\u{1F91A}",
  keranjang: "\u{1F9FA}",
  mangkuk: "\u{1F963}",
  cermat: "\u{1F50D}",
  cepat: "\u{1F680}",
  buru: "\u{1F3C3}",
  gula: "\u{1F36C}",
  apel: "\u{1F34E}",
} as const;

type Opsi = Partial<Obj>;
const b1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((bb, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), bb, u, W.biru, o))];
}

/* ------------------------------ Gudang pakan ------------------------------ */
export const WG = {
  dinding: "#F3DDB5",
  lantai: "#C9A66B",
  garisLantai: "#A8844A",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  goni: "#D4B07A",
  goniTua: "#8A6A35",
  layar: "#14532D",
  malam: "#1E3A8A",
} as const;

/** Dinding kayu `${id}` dari atas sampai tinggi y, lantai `${id}-l` dan dua garis papan `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [
    kotak(id, 2, 24, 296, y - 24, WG.dinding, undefined, { rx: 0, tebal: 0, z: -4 }),
    kotak(`${id}-l`, 2, y, 296, 200 - y, WG.lantai, undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 16, 292, 0, WG.garisLantai, 1.2, { z: -2 }),
    garis(`${id}-g2`, 4, y + 34, 292, 0, WG.garisLantai, 1.2, { z: -2 }),
  ];
}
export const idLantai = (id: string): string[] => [id, `${id}-l`, `${id}-g1`, `${id}-g2`];

/** Karung goni `${id}` dengan tali pengikat `${id}-t`. Pojok kiri-atas (x, y). */
export function karung(id: string, x: number, y: number, w = 26, h = 32): Obj[] {
  return [kotak(id, x, y, w, h, WG.goni, WG.goniTua, { rx: 5, z: 2 }), kotak(`${id}-t`, b1(x + 3), b1(y + 4), b1(w - 6), 3, WG.goniTua, WG.goniTua, { rx: 1, tebal: 0.6, z: 3 })];
}
export const idKarung = (id: string): string[] => [id, `${id}-t`];
/** Patch posisi karung. */
export const pindahKarung = (id: string, x: number, y: number, w = 26): (Partial<Obj> & { id: string })[] => [
  { id, x, y },
  { id: `${id}-t`, x: b1(x + 3), y: b1(y + 4), w: b1(w - 6) },
];

/** Rak kayu `${id}` selebar w dengan kaki `${id}-l` `${id}-r`. Pojok kiri-atas papan (x, y). */
export function rak(id: string, x: number, y: number, w = 80, kaki = 30): Obj[] {
  return [
    kotak(id, x, y, w, 5, WG.kayu, WG.kayuTua, { rx: 1, tebal: 1.4, z: 1 }),
    kotak(`${id}-l`, b1(x + 3), y + 5, 4, kaki, WG.kayu, WG.kayuTua, { rx: 0, tebal: 1, z: 0 }),
    kotak(`${id}-r`, b1(x + w - 7), y + 5, 4, kaki, WG.kayu, WG.kayuTua, { rx: 0, tebal: 1, z: 0 }),
  ];
}

/* ------------------------------ Timbangan ------------------------------ */
const sudut = (v: number): number => ((-135 + v * 27) * Math.PI) / 180;
/** Ujung jarum relatif terhadap pusat untuk nilai v (0 sampai 10). */
export const ujungJarum = (r: number, v: number): [number, number] => [b1(Math.sin(sudut(v)) * r * 0.8), b1(-Math.cos(sudut(v)) * r * 0.8)];
/** Patch jarum `${id}-j` ke nilai v. */
export const putarJarum = (id: string, r: number, v: number): Partial<Obj> & { id: string } => {
  const [dx, dy] = ujungJarum(r, v);
  return { id: `${id}-j`, x2: dx, y2: dy };
};
/**
 * Muka timbangan duduk berjarum: muka bulat `${id}` (pusat cx, cy), tanda `${id}-m0..m10`, angka `${id}-l0` (0), `${id}-l5` (5), `${id}-l10` (10),
 * jarum `${id}-j` (menunjuk nilai v) dan poros `${id}-h`.
 */
export function muka(id: string, cx: number, cy: number, r: number, v: number): Obj[] {
  const out: Obj[] = [bulat(id, cx, cy, r, W.putih, W.biru, { tebal: 1.8, z: 1 })];
  for (let i = 0; i <= 10; i += 1) {
    const a = sudut(i);
    out.push(garis(`${id}-m${i}`, b1(cx + Math.sin(a) * r * 0.82), b1(cy - Math.cos(a) * r * 0.82), b1(Math.sin(a) * r * 0.13), b1(-Math.cos(a) * r * 0.13), "#475569", i % 5 === 0 ? 1.6 : 0.8, { z: 2 }));
  }
  for (const i of [0, 5, 10]) {
    const a = sudut(i);
    const R = r + 7;
    out.push(teks(`${id}-l${i}`, b1(cx + Math.sin(a) * R), b1(cy - Math.cos(a) * R + 3), String(i), 7, "#475569", { z: 2 }));
  }
  const [dx, dy] = ujungJarum(r, v);
  out.push(garis(`${id}-j`, cx, cy, dx, dy, W.merah, 2, { z: 3 }), bulat(`${id}-h`, cx, cy, 2.4, W.biru, W.biru, { tebal: 0.5, z: 4 }));
  return out;
}
export const idMuka = (id: string): string[] => [id, ...Array.from({ length: 11 }, (_, i) => `${id}-m${i}`), `${id}-l0`, `${id}-l5`, `${id}-l10`, `${id}-j`, `${id}-h`];

/** Timbangan duduk: muka berjarum, tatakan `${id}-p` di atas, dan kaki `${id}-d`. Pusat muka (cx, cy). Alas benda ada di y = cy - r - 10. */
export function timbDuduk(id: string, cx: number, cy: number, r = 22, v = 0): Obj[] {
  return [
    ...muka(id, cx, cy, r, v),
    kotak(`${id}-p`, b1(cx - r), b1(cy - r - 10), b1(2 * r), 4, WG.kayu, WG.kayuTua, { rx: 1, tebal: 1, z: 1 }),
    kotak(`${id}-d`, b1(cx - r - 4), b1(cy + r + 2), b1(2 * r + 8), 6, "#64748B", "#334155", { rx: 2, tebal: 1, z: 0 }),
  ];
}
export const idTimbDuduk = (id: string): string[] => [...idMuka(id), `${id}-p`, `${id}-d`];

/** Timbangan digital: tatakan `${id}-p`, layar `${id}-s` berisi tulisan `${id}-t`, dan alas `${id}-d`. Pojok kiri-atas tatakan (x, y). Alas benda ada di y. */
export function timbDigital(id: string, x: number, y: number, isi = "0", w = 54): Obj[] {
  return [
    kotak(`${id}-p`, x, y, w, 4, "#94A3B8", "#334155", { rx: 1, tebal: 1, z: 1 }),
    kotak(`${id}-s`, b1(x + 3), y + 6, w - 6, 16, WG.layar, "#052E16", { rx: 3, tebal: 1, z: 1 }),
    teks(`${id}-t`, b1(x + w / 2), y + 18, isi, 9.5, "#BBF7D0", { z: 2 }),
    kotak(`${id}-d`, x, y + 24, w, 8, "#64748B", "#334155", { rx: 2, tebal: 1, z: 0 }),
  ];
}
export const idTimbDigital = (id: string): string[] => ["p", "s", "t", "d"].map((s) => `${id}-${s}`);

/** Timbangan badan: papan pijak `${id}` dan jendela kecil `${id}-w`. Pojok kiri-atas (x, y). */
export function timbBadan(id: string, x: number, y: number, w = 58): Obj[] {
  return [kotak(id, x, y, w, 9, "#94A3B8", "#334155", { rx: 3, tebal: 1.2, z: 1 }), kotak(`${id}-w`, b1(x + w / 2 - 9), y + 2, 18, 5, WG.layar, "#052E16", { rx: 1, tebal: 0.8, z: 2 })];
}
export const idTimbBadan = (id: string): string[] => [id, `${id}-w`];

/** Timbangan kodok kecil: tiang `${id}-s`, palang `${id}-p`, dua piring `${id}-a` `${id}-b`. Pusat tiang (cx, y). */
export function kodok(id: string, cx: number, y: number): Obj[] {
  return [
    kotak(`${id}-s`, b1(cx - 1.5), y, 3, 26, WG.kayuTua, WG.kayuTua, { rx: 0, tebal: 0.6, z: 0 }),
    kotak(`${id}-p`, b1(cx - 18), y, 36, 3, WG.kayu, WG.kayuTua, { rx: 1, tebal: 0.8, z: 1 }),
    kotak(`${id}-a`, b1(cx - 22), y + 14, 14, 3, "#CBD5E1", W.biru, { rx: 1, tebal: 0.8, z: 1 }),
    kotak(`${id}-b`, b1(cx + 8), y + 14, 14, 3, "#CBD5E1", W.biru, { rx: 1, tebal: 0.8, z: 1 }),
  ];
}
export const idKodok = (id: string): string[] => ["s", "p", "a", "b"].map((s) => `${id}-${s}`);

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Bu Lastri" | "Dokter Hana";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan berkertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil `${id}-ps`, bertas bekal `${id}-ts`;
 * Bu Lastri berapron hijau `${id}-bj` dan berkertas catatan `${id}-kc`; Dokter Hana berjas putih `${id}-bj` dan bersetetoskop `${id}-st`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, b1(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, b1(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, b1(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, b1(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(kotak(`${id}-tp`, x - 13, b1(y - u * 0.78), 26, 5, "#D6A15E", "#92400E", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-km`, x - 5, b1(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, b1(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
    out.push(kotak(`${id}-ts`, x + 11, b1(y + 6), 8, 8, "#92400E", "#451A03", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Bu Lastri") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(kotak(`${id}-kc`, x + 12, b1(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Dokter Hana") {
    out.push(baju("#FFFFFF", "#64748B", 12));
    out.push(garis(`${id}-st`, x - 4, b1(y + 3), 8, 0, "#0F766E", 1.6, { z: 2 }));
  }
  const dalam = nama === "Pak Joko" || nama === "Dokter Hana" || nama === "Bu Lastri";
  out.push(teks(`${id}-n`, x, b1(y + (dalam ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`, `${id}-ts`] : []),
  ...(nama === "Bu Lastri" ? [`${id}-bj`, `${id}-kc`] : []),
  ...(nama === "Dokter Hana" ? [`${id}-bj`, `${id}-st`] : []),
];
