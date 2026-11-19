import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 4 Sub-Bab B "Sudut Kak Anton" (sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: lapangan rumput di tepi sawah, spanduk FESTIVAL LAYANG-LAYANG, tiang bendera, layang-layang di langit, bilah bambu sebagai kaki sudut,
 * busur derajat besar dari papan (setengah lingkaran dengan dua skala), kertas lipat dengan pojok siku-siku, irisan sudut.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga),
 * Kak Anton (pelatih berkaus biru, topi biru, busur di punggung), Pak Samsul (panitia berompi oranye, berpeluit). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Bambu: kuning tua. Busur derajat: biru muda. */
  bambu: "#CA8A04",
  busur: "#DBEAFE",
  tanya: "#F59E0B",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  anton: "\u{1F9D1}",
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
  kertas: "\u{1F4C4}",
  layang: "\u{1FA81}",
  bendera: "\u{1F38F}",
  benang: "\u{1F9F5}",
  sabun: "\u{1F9FC}",
  busa: "\u{1F4A7}",
  gunting: "\u{2702}",
  pita: "\u{1F380}",
  padi: "\u{1F33E}",
  sorak: "\u{1F389}",
  pensil: "\u{270F}",
  penggaris: "\u{1F4CF}",
  segitiga: "\u{1F4D0}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
const rad = (d: number): number => (d * Math.PI) / 180;

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

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t${i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Lapangan layang-layang ------------------------------ */
export const WL = {
  rumput: "#BBF7D0",
  rumputGaris: "#4ADE80",
  tiang: "#78350F",
  kertas: "#FFFFFF",
  tali: "#475569",
  ember: "#60A5FA",
} as const;

/** Rumput `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function rumput(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WL.rumput, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WL.rumputGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WL.rumputGaris, 1.4, { z: -2 })];
}
export const idRumput = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Spanduk FESTIVAL LAYANG-LAYANG: kain `${id}-k` dan tulisan `${id}-t`. Pojok kiri-atas (x, y). */
export function spanduk(id: string, x: number, y: number, w = 200, isi = "FESTIVAL LAYANG-LAYANG", u = 8): Obj[] {
  return [kotak(`${id}-k`, x, y, w, 16, "#FDE68A", W.coklat, { rx: 3, tebal: 1.2, z: 0 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + 11.4), isi, u, W.merah, { z: 1 })];
}
export const idSpanduk = (id: string): string[] => [`${id}-k`, `${id}-t`];

/** Tiang bendera `${id}` berdiri dari dasar yb setinggi h dengan bendera `${id}-b`. */
export function tiang(id: string, x: number, yb: number, h = 70): Obj[] {
  return [kotak(id, x - 1.5, yb - h, 3, h, WL.tiang, undefined, { rx: 0, tebal: 0, z: 0 }), kotak(`${id}-b`, x + 1.5, yb - h, 22, 12, W.merah, "#7F1D1D", { rx: 1, tebal: 1, z: 1 })];
}
export const idTiang = (id: string): string[] => [id, `${id}-b`];

/** Pojok kertas lipat `${id}` (kertas persegi dengan pojok siku-siku di kiri-bawah) pada pojok kiri-atas (x, y), sisi s, dan tanda siku `${id}-s`. */
export function pojokKertas(id: string, x: number, y: number, s: number): Obj[] {
  return [kotak(id, x, y, s, s, "#FFFFFF", W.merah, { rx: 0, tebal: 1.6, z: 2 }), kotak(`${id}-s`, x, bulatkan(y + s - 8), 8, 8, undefined, W.merah, { rx: 0, tebal: 1.2, z: 3 })];
}
export const idPojok = (id: string): string[] => [id, `${id}-s`];

/* ------------------------------ Sudut, kaki, dan busur derajat ------------------------------ */
/** Ujung kaki sepanjang `len` dari (cx, cy) ke arah `deg` derajat (0 = ke kanan, berlawanan arah jarum jam). */
export const ujung = (cx: number, cy: number, len: number, deg: number): [number, number] => [bulatkan(cx + len * Math.cos(rad(deg))), bulatkan(cy - len * Math.sin(rad(deg)))];

/** Satu kaki sudut `${id}` berupa garis dari (cx, cy) sepanjang `len` ke arah `deg`. */
export function kaki(id: string, cx: number, cy: number, len: number, deg: number, warna: string = W.bambu, tebal = 5, o: Opsi = {}): Obj {
  const [x2, y2] = ujung(cx, cy, len, deg);
  return garis(id, cx, cy, bulatkan(x2 - cx), bulatkan(y2 - cy), warna, tebal, o);
}

/** Juring (penanda sudut) `${id}` di titik (cx, cy) dari arah `dari` sampai `ke` derajat dengan jari-jari r. */
export function juring(id: string, cx: number, cy: number, r: number, dari: number, ke: number, warna: string | undefined = "#FECACA", garisW: string | undefined = W.merah, o: Opsi = {}): Obj {
  const titik: [number, number][] = [[cx, cy]];
  const langkah = Math.max(2, Math.ceil(Math.abs(ke - dari) / 15));
  for (let i = 0; i <= langkah; i += 1) titik.push(ujung(cx, cy, r, dari + ((ke - dari) * i) / langkah));
  return poligon(id, titik, warna, garisW, { tebal: 1.4, z: 1, ...o });
}

/**
 * Busur derajat besar dari papan: setengah lingkaran berjari-jari R dengan titik tengah (cx, cy), tanda tiap sepuluh derajat,
 * angka luar `${id}-a${t}` (0 di kanan sampai 180 di kiri) dan angka dalam `${id}-b${t}` (0 di kiri sampai 180 di kanan) tiap tiga puluh derajat.
 */
export function busurDerajat(id: string, cx: number, cy: number, R: number, o: Opsi = {}): Obj[] {
  const titik: [number, number][] = [];
  for (let t = 0; t <= 180; t += 10) titik.push(ujung(cx, cy, R, t));
  const out: Obj[] = [poligon(id, titik, W.busur, W.biru, { tebal: 1.6, z: 1, ...o }), bulat(`${id}-c`, cx, cy, 2.4, W.merah, W.biru, { tebal: 1, z: 4 })];
  for (let t = 0; t <= 180; t += 10) {
    const a = ujung(cx, cy, R, t);
    const b = ujung(cx, cy, R - (t % 30 === 0 ? 8 : 4), t);
    out.push(garis(`${id}-g${t}`, a[0], a[1], bulatkan(b[0] - a[0]), bulatkan(b[1] - a[1]), W.biru, t % 30 === 0 ? 1.1 : 0.7, { z: 2 }));
    if (t % 30 === 0) {
      const p = ujung(cx, cy, R - 14, t);
      const q = ujung(cx, cy, R - 26, t);
      out.push(teks(`${id}-a${t}`, p[0], bulatkan(p[1] + 2), String(t), 5.6, W.biru, { z: 3 }));
      out.push(teks(`${id}-b${t}`, q[0], bulatkan(q[1] + 2), String(180 - t), 5.6, W.ungu, { z: 3 }));
    }
  }
  return out;
}
export const idBusur = (id: string): string[] => [id, `${id}-c`, ...Array.from({ length: 19 }, (_, i) => `${id}-g${i * 10}`), ...[0, 30, 60, 90, 120, 150, 180].flatMap((t) => [`${id}-a${t}`, `${id}-b${t}`])];

/** Titik berhuruf `${id}` (lingkaran kecil) dan hurufnya `${id}-h` di sisi tertentu. */
export function titikHuruf(id: string, x: number, y: number, huruf: string, dx = -10, dy = 12, warna: string = W.merah): Obj[] {
  return [bulat(id, x, y, 3.2, warna, W.biru, { tebal: 1, z: 4 }), teks(`${id}-h`, x + dx, y + dy, huruf, 11, W.biru, { z: 4 })];
}
export const idTitik = (id: string): string[] => [id, `${id}-h`];

/** Ember bersabun `${id}` untuk mencuci: badan, tulisan, dan busa. Pojok kiri-atas (x, y). */
export function ember(id: string, x: number, y: number): Obj[] {
  return [poligon(id, [[x, y], [x + 30, y], [x + 25, y + 22], [x + 5, y + 22]], WL.ember, W.biru, { z: 1 }), emo(`${id}-s`, x + 15, y + 6, E.busa, 12, { z: 2 })];
}
export const idEmber = (id: string): string[] => [id, `${id}-s`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Kak Anton" | "Pak Samsul";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`;
 * Kak Anton berkaus biru `${id}-bj`, bertopi biru `${id}-tp`, berbusur papan di punggung `${id}-bs`; Pak Samsul berompi oranye `${id}-bj`, bertopi `${id}-tp`, berpeluit `${id}-pl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Kak Anton" ? E.anton : E.pak;
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
  if (nama === "Kak Anton") {
    out.push(baju("#2563EB", "#1E3A8A", 11));
    out.push(topi("#1D4ED8", "#1E3A8A", 24));
    out.push(kotak(`${id}-bs`, x + 11, bulatkan(y + 2), 5, 14, W.busur, W.biru, { rx: 1, tebal: 0.8, z: 0 }));
  }
  if (nama === "Pak Samsul") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(topi("#F97316", "#9A3412", 22));
    out.push(bulat(`${id}-pl`, x + 9, bulatkan(y + 4), 2.6, "#FBBF24", "#92400E", { tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Kak Anton" || nama === "Pak Samsul" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Kak Anton" ? [`${id}-bj`, `${id}-tp`, `${id}-bs`] : []),
  ...(nama === "Pak Samsul" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
