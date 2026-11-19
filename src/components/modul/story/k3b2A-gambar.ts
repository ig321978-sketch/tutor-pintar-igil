import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 2 Sub-Bab A "Kayu untuk Api Unggun" (kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa lapangan kemah: rumput, pohon pinus (segitiga bertumpuk), tenda kerucut, lingkaran batu api unggun, tumpukan kayu bakar, gudang kayu dengan dua rak, peti perlengkapan,
 * bagan batang (bar model), garis bilangan dengan lompatan, timbangan seimbang, kertas catatan.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi pembina, berkumis, berpensil di telinga),
 * Kak Rina (pemandu berpeluit, topi hijau tua), Pak Darto (penjaga hutan, topi rimba cokelat, rompi hijau, berteropong). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  oranye: "#F97316",
  /** Bagan: jumlah semuanya cokelat, bagian diketahui hijau, bagian belum diketahui jingga. */
  jumlah: "#B45309",
  bagian: "#16A34A",
  tanya: "#F59E0B",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  kaget: "\u{1F632}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  seru: "\u{2757}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  pensil: "\u{270F}",
  api: "\u{1F525}",
  bintang: "\u{2B50}",
  bulan: "\u{1F319}",
  ransel: "\u{1F392}",
  tenda: "\u{26FA}",
  nyamuk: "\u{1F99F}",
  botol: "\u{1F37C}",
  ranting: "\u{1F33F}",
  teropong: "\u{1F52D}",
  peta: "\u{1F5FA}",
} as const;

type Opsi = Partial<Obj>;
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
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Lapangan kemah ------------------------------ */
export const WK = {
  rumput: "#BBF7D0",
  rumputGaris: "#4ADE80",
  pinus: "#166534",
  pinusMuda: "#15803D",
  batang: "#78350F",
  tendaA: "#F87171",
  tendaB: "#60A5FA",
  batu: "#94A3B8",
  batuTua: "#475569",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kayuMuda: "#D6A15E",
  malam: "#1E3A8A",
  api: "#F97316",
} as const;

/** Rumput `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WK.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WK.rumputGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WK.rumputGaris, 1.4, { z: -2 })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Pohon pinus: dua tingkat daun segitiga `${id}-a` `${id}-b` dan batang `${id}-t`. Pusat bawah (x, yb), lebar w, tinggi total h. */
export function pinus(id: string, x: number, yb: number, w = 34, h = 64): Obj[] {
  const bt = bulatkan(h * 0.16);
  const tinggi = h - bt;
  return [
    kotak(`${id}-t`, bulatkan(x - 3), bulatkan(yb - bt), 6, bt, WK.batang, "#451A03", { rx: 1, tebal: 1, z: 0 }),
    poligon(`${id}-a`, [[x, bulatkan(yb - bt - tinggi)], [bulatkan(x + w / 2), bulatkan(yb - bt - tinggi * 0.35)], [bulatkan(x - w / 2), bulatkan(yb - bt - tinggi * 0.35)]], WK.pinus, "#14532D", { z: 1 }),
    poligon(`${id}-b`, [[x, bulatkan(yb - bt - tinggi * 0.7)], [bulatkan(x + w * 0.62), yb - bt], [bulatkan(x - w * 0.62), yb - bt]], WK.pinusMuda, "#14532D", { z: 0.5 }),
  ];
}
export const idPinus = (id: string): string[] => [`${id}-t`, `${id}-a`, `${id}-b`];

/** Tenda kerucut: badan `${id}` (segitiga) dan pintu `${id}-p`. Pusat bawah (x, yb), lebar w, tinggi h. */
export function tenda(id: string, x: number, yb: number, w = 40, h = 34, warna: string = WK.tendaA): Obj[] {
  return [
    poligon(id, [[x, yb - h], [bulatkan(x + w / 2), yb], [bulatkan(x - w / 2), yb]], warna, W.biru, { z: 1 }),
    poligon(`${id}-p`, [[x, bulatkan(yb - h * 0.5)], [bulatkan(x + w * 0.14), yb], [bulatkan(x - w * 0.14), yb]], "#1E293B", "#0F172A", { tebal: 1, z: 2 }),
  ];
}
export const idTenda = (id: string): string[] => [id, `${id}-p`];

/** Lingkaran batu api unggun: `n` batu `${id}0`.. mengelilingi pusat (cx, cy) dengan jari-jari mendatar rx dan tegak ry. */
export function lingkaranBatu(id: string, cx: number, cy: number, rx = 22, ry = 7, n = 9): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return bulat(`${id}${i}`, bulatkan(cx + Math.cos(a) * rx), bulatkan(cy + Math.sin(a) * ry), 3.6, WK.batu, WK.batuTua, { tebal: 1, z: 1 });
  });
}
export const idLingkaran = (id: string, n = 9): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Satu batang kayu bakar `${id}`: kotak cokelat dengan garis kulit `${id}-g`. Pojok kiri-atas (x, y). */
export function kayu(id: string, x: number, y: number, w = 12, h = 5): Obj[] {
  return [kotak(id, x, y, w, h, WK.kayu, WK.kayuTua, { rx: 2, tebal: 1, z: 2 }), garis(`${id}-g`, bulatkan(x + 2), bulatkan(y + h / 2), bulatkan(w - 4), 0, WK.kayuTua, 0.6, { z: 3 })];
}
/**
 * Tumpukan `n` batang kayu id `${id}0`..`${id}{n-1}` (garis kulit `${id}{i}-g`), tersusun dari bawah ke atas, `kolom` batang tiap lapis.
 * Pojok kiri-atas lapis paling bawah (x, y): lapis ke atas naik setinggi h.
 */
export function tumpukKayu(id: string, x: number, y: number, n: number, kolom = 6, w = 12, h = 5): Obj[] {
  return Array.from({ length: n }, (_, i) => kayu(`${id}${i}`, bulatkan(x + (i % kolom) * (w + 1)), bulatkan(y - Math.floor(i / kolom) * (h + 1)), w, h)).flat();
}
export const idTumpukKayu = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => [`${id}${dari + i}`, `${id}${dari + i}-g`]).flat();

/** Rak kayu `${id}` selebar w dengan satu papan; pojok kiri-atas papan (x, y), dua kaki `${id}-l` `${id}-r`. */
export function rak(id: string, x: number, y: number, w = 70, kaki = 30): Obj[] {
  return [
    kotak(id, x, y, w, 5, WK.kayu, WK.kayuTua, { rx: 1, tebal: 1.4, z: 1 }),
    kotak(`${id}-l`, bulatkan(x + 3), y + 5, 4, kaki, WK.kayu, WK.kayuTua, { rx: 0, tebal: 1, z: 0 }),
    kotak(`${id}-r`, bulatkan(x + w - 7), y + 5, 4, kaki, WK.kayu, WK.kayuTua, { rx: 0, tebal: 1, z: 0 }),
  ];
}
export const idRak = (id: string): string[] => [id, `${id}-l`, `${id}-r`];

/** Papan tanda `${id}` di atas tiang `${id}-s` dengan satu atau dua baris tulisan `${id}-t0`, `${id}-t1`. Pojok kiri-atas papan (x, y). */
export function papanTanda(id: string, x: number, y: number, w: number, h: number, baris: string[], u = 9): Obj[] {
  return [
    kotak(`${id}-s`, bulatkan(x + w / 2 - 2), bulatkan(y + h), 4, 22, WK.kayu, WK.kayuTua, { rx: 0, tebal: 1, z: 0 }),
    ...kartu(id, x, y, w, h, "#FDE68A", baris, u, { z: 1 }),
  ];
}
export const idPapanTanda = (id: string, n = 1): string[] => [`${id}-s`, `${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Bagan batang ------------------------------ */
/** Satu batang bagan `${id}` berwarna dengan tulisan `${id}-t` di tengah. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function batangBagan(id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u = 11, warnaTeks: string = W.putih): Obj[] {
  return [kotak(id, x, y, w, h, warna, W.biru, { rx: 3, tebal: 1.4, z: 1 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, warnaTeks, { z: 2 })];
}
export const idBatangBagan = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Kak Rina" | "Pak Darto";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi pembina `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`;
 * Kak Rina berkaus hijau muda `${id}-bj`, bertopi hijau tua `${id}-tp`, berpeluit `${id}-pl`; Pak Darto berompi hijau `${id}-bj`, bertopi rimba cokelat `${id}-tp`, berjanggut `${id}-jg`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" || nama === "Pak Darto" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (warna: string, garisW: string): Obj => kotak(`${id}-tp`, x - 10, bulatkan(y - u * 0.78), 20, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(topi("#1D4ED8", "#1E3A8A"));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Kak Rina") {
    out.push(baju("#4ADE80", "#166534", 10));
    out.push(topi("#14532D", "#052E16"));
    out.push(bulat(`${id}-pl`, x + 9, bulatkan(y + 4), 2.6, "#FBBF24", "#92400E", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Pak Darto") {
    out.push(baju("#15803D", "#14532D", 12));
    out.push(topi("#92400E", "#451A03"));
    out.push(garis(`${id}-jg`, x - 6, bulatkan(y - u * 0.04), 12, 0, "#9CA3AF", 2.6, { z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Darto" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Kak Rina" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
  ...(nama === "Pak Darto" ? [`${id}-bj`, `${id}-tp`, `${id}-jg`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));

/* ------------------------------ Garis bilangan ------------------------------ */
/** Garis bilangan datar `${id}` dari x1 ke x2 pada tinggi y dengan `n` tanda (`${id}-m0`..), tanda pertama di x1 dan terakhir di x2. */
export function garisBilangan(id: string, x1: number, x2: number, y: number, n: number): Obj[] {
  return [
    garis(id, x1, y, x2 - x1, 0, W.biru, 2, { z: 0 }),
    ...Array.from({ length: n }, (_, i) => garis(`${id}-m${i}`, bulatkan(x1 + ((x2 - x1) * i) / (n - 1)), y - 4, 0, 8, W.biru, 1.6, { z: 0 })),
  ];
}
export const idGarisBilangan = (id: string, n: number): string[] => [id, ...Array.from({ length: n }, (_, i) => `${id}-m${i}`)];

/* ------------------------------ Timbangan ------------------------------ */
/** Timbangan seimbang: tiang `${id}-s`, palang `${id}-p`, dua piring `${id}-a` (kiri) dan `${id}-b` (kanan). Pusat tiang (cx, y) di ujung atas; lebar palang w. */
export function timbangan(id: string, cx: number, y: number, w = 150): Obj[] {
  return [
    kotak(`${id}-s`, bulatkan(cx - 3), y, 6, 70, WK.kayu, WK.kayuTua, { rx: 1, tebal: 1, z: 0 }),
    kotak(`${id}-p`, bulatkan(cx - w / 2), y, w, 5, WK.kayuMuda, WK.kayuTua, { rx: 2, tebal: 1.2, z: 1 }),
    kotak(`${id}-a`, bulatkan(cx - w / 2 - 6), y + 30, 50, 6, "#CBD5E1", W.biru, { rx: 3, tebal: 1.2, z: 1 }),
    kotak(`${id}-b`, bulatkan(cx + w / 2 - 44), y + 30, 50, 6, "#CBD5E1", W.biru, { rx: 3, tebal: 1.2, z: 1 }),
    garis(`${id}-ka`, bulatkan(cx - w / 2 + 19), y + 5, 0, 25, W.biru, 1, { z: 0 }),
    garis(`${id}-kb`, bulatkan(cx + w / 2 - 19), y + 5, 0, 25, W.biru, 1, { z: 0 }),
  ];
}
export const idTimbangan = (id: string): string[] => ["s", "p", "a", "b", "ka", "kb"].map((s) => `${id}-${s}`);
