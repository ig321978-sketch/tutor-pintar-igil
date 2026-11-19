import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka), cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: gudang kayu beratap di belakang penginapan, lantai pasir, peti, kotak, ikat, dan lembar handuk (balok cacah bergambar), papan empat kotak
 * (ribuan, ratusan, puluhan, satuan) berisi angka, kartu angka, dan papan dermaga. Tokoh: Satria (kaus biru), Laras (berkacamata, berkepang satu, berkertas saku),
 * Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain), Pak Laode (bertopi caping), Kak Tiara (bertopi pandan, berpapan dermaga). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  pasir: "#FDE68A",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  kaget: "\u{1F62E}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tangan: "\u{270B}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  lengan: "\u{1F4AA}",
  pensil: "\u{270F}",
  kertas: "\u{1F4C4}",
  bintang: "\u{2B50}",
  lupa: "\u{1F50D}",
  kelapa: "\u{1F965}",
  pantai: "\u{1F3D6}",
  pulau: "\u{1F3DD}",
  perahu: "\u{26F5}",
  payung: "\u{1F302}",
  keranjang: "\u{1F9FA}",
  koper: "\u{1F9F3}",
  lampu: "\u{1F4A1}",
  gelengan: "\u{1F645}",
  gelembung: "\u{1F4AC}",
  kilau: "\u{2728}",
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
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Gudang dan pantai ------------------------------ */
export const WG = {
  pasir: "#FDE68A",
  pasirGaris: "#E7C873",
  dinding: "#D6A56B",
  dindingGaris: "#92400E",
  atap: "#B45309",
  pintu: "#451A03",
  papan: "#FEF3C7",
  peti: "#A16207",
  kotakKarton: "#E9C48A",
  ikat: "#60A5FA",
  lembar: "#FBCFE8",
  tali: "#FFFFFF",
} as const;

/** Lantai pasir `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WG.pasir, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WG.pasirGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WG.pasirGaris, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Papan nama `${id}` bertulisan `${id}-t`, pusat (cx), pojok atas y. */
export function papanNama(id: string, cx: number, y: number, isi = "GUDANG HANDUK", w = 100): Obj[] {
  return [kotak(id, bulatkan(cx - w / 2), y, w, 16, WG.papan, W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks(`${id}-t`, cx, y + 11.5, isi, 7.2, W.coklat, { z: 2 })];
}
export const idPapanNama = (id: string): string[] => [id, `${id}-t`];

/** Gudang kayu: dinding `${id}`, dua garis papan `${id}-l1` `${id}-l2`, atap `${id}-a`, pintu `${id}-p`. Pojok kiri-atas dinding (x, y). */
export function gudang(id: string, x: number, y: number, w = 100, h = 60): Obj[] {
  return [
    kotak(id, x, y, w, h, WG.dinding, WG.dindingGaris, { rx: 2, z: 0 }),
    garis(`${id}-l1`, x + 2, y + h / 3, w - 4, 0, WG.dindingGaris, 1, { z: 1, op: 0.6 }),
    garis(`${id}-l2`, x + 2, y + (2 * h) / 3, w - 4, 0, WG.dindingGaris, 1, { z: 1, op: 0.6 }),
    poligon(`${id}-a`, [[x - 8, y], [bulatkan(x + w / 2), y - 24], [x + w + 8, y]], WG.atap, "#7C2D12", { z: 1 }),
    kotak(`${id}-p`, bulatkan(x + w / 2 - 10), y + h - 34, 20, 34, WG.pintu, "#1C0A00", { rx: 1, tebal: 1.2, z: 2 }),
  ];
}
export const idGudang = (id: string): string[] => [id, `${id}-l1`, `${id}-l2`, `${id}-a`, `${id}-p`];

/** Peti besar (ribuan): kotak kayu `${id}` dengan dua papan silang `${id}-x1` `${id}-x2`. Pojok kiri-atas (x, y), sisi s. */
export function peti(id: string, x: number, y: number, s = 26): Obj[] {
  return [
    kotak(id, x, y, s, s, WG.peti, "#451A03", { rx: 2, tebal: 1.6, z: 2 }),
    garis(`${id}-x1`, x + 2, y + 2, s - 4, s - 4, "#451A03", 1.4, { z: 3 }),
    garis(`${id}-x2`, x + s - 2, y + 2, -(s - 4), s - 4, "#451A03", 1.4, { z: 3 }),
  ];
}
export const idPeti = (id: string): string[] => [id, `${id}-x1`, `${id}-x2`];

/** Kotak karton (ratusan): `${id}` dengan pita perekat `${id}-pt`. */
export function kotakKarton(id: string, x: number, y: number, s = 20): Obj[] {
  return [kotak(id, x, y, s, s * 0.8, WG.kotakKarton, "#92400E", { rx: 1, tebal: 1.4, z: 2 }), garis(`${id}-pt`, x + s / 2, y, 0, s * 0.8, "#F59E0B", 2.4, { z: 3 })];
}
export const idKotakKarton = (id: string): string[] => [id, `${id}-pt`];

/** Ikat handuk (puluhan): gulungan biru `${id}` dengan dua tali putih `${id}-t1` `${id}-t2`. */
export function ikat(id: string, x: number, y: number, s = 16): Obj[] {
  return [
    kotak(id, x, y, s, s * 0.7, WG.ikat, "#1E3A8A", { rx: 5, tebal: 1.3, z: 2 }),
    garis(`${id}-t1`, x + s * 0.3, y, 0, s * 0.7, W.putih, 1.6, { z: 3 }),
    garis(`${id}-t2`, x + s * 0.7, y, 0, s * 0.7, W.putih, 1.6, { z: 3 }),
  ];
}
export const idIkat = (id: string): string[] => [id, `${id}-t1`, `${id}-t2`];

/** Lembar handuk (satuan): kain merah muda tipis `${id}` dengan garis lipat `${id}-lp`. */
export function lembar(id: string, x: number, y: number, s = 10): Obj[] {
  return [kotak(id, x, y, s, s * 0.6, WG.lembar, "#BE185D", { rx: 1, tebal: 1.1, z: 2 }), garis(`${id}-lp`, x + s * 0.5, y, 0, s * 0.6, "#BE185D", 0.9, { z: 3 })];
}
export const idLembar = (id: string): string[] => [id, `${id}-lp`];

/** Tumpukan handuk berwarna: `n` lembar bertumpuk `${id}0`..; pojok kiri-bawah (x, y). */
export function tumpukan(id: string, x: number, y: number, n: number, w = 34): Obj[] {
  const warna = ["#FBCFE8", "#BFDBFE", "#BBF7D0", "#FDE68A", "#DDD6FE", "#FED7AA"];
  return Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x + (i % 2 === 0 ? 0 : 2), y - (i + 1) * 6, w, 6, warna[i % warna.length], "#475569", { rx: 2, tebal: 0.9, z: 1 }));
}
export const idTumpukan = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Gambar balok dengan jenis `j`: "peti", "kotak", "ikat", "lembar". Pojok kiri-atas (x, y), ukuran standar. */
export function balok(j: "peti" | "kotak" | "ikat" | "lembar", id: string, x: number, y: number): Obj[] {
  return j === "peti" ? peti(id, x, y, 26) : j === "kotak" ? kotakKarton(id, x, y + 3, 22) : j === "ikat" ? ikat(id, x + 2, y + 6, 18) : lembar(id, x + 3, y + 10, 16);
}
export const idBalok = (j: "peti" | "kotak" | "ikat" | "lembar", id: string): string[] => (j === "peti" ? idPeti(id) : j === "kotak" ? idKotakKarton(id) : j === "ikat" ? idIkat(id) : idLembar(id));

/* ------------------------------ Papan empat kotak ------------------------------ */
export const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;

/**
 * Papan empat kotak `${id}` dengan kepala `${id}-h{c}` (kotak) dan `${id}-ht{c}` (teks: ribuan, ratusan, puluhan, satuan), sel `${id}-c{c}`,
 * dan angka `${id}-d{c}` (teks; angka kosong "" tidak digambar). Pojok kiri-atas (x, y), lebar tiap kolom `cw`.
 */
export function papan4(id: string, x: number, y: number, cw: number, angka: (string | number)[], o: { ch?: number; u?: number } = {}): Obj[] {
  const ch = o.ch ?? 30;
  const u = o.u ?? 18;
  const out: Obj[] = [];
  for (let c = 0; c < 4; c += 1) {
    out.push(...kepalaSel(id, x, y, cw, c));
    out.push(selKosong(id, x, y + 14, cw, c, ch));
    const a = String(angka[c] ?? "");
    if (a !== "") out.push(angkaSel(id, x, y, cw, c, a, { ch, u }));
  }
  return out;
}
/** Kepala satu kolom papan empat kotak: kotak `${id}-h{c}` dan tulisan `${id}-ht{c}`. */
export function kepalaSel(id: string, x: number, y: number, cw: number, c: number): Obj[] {
  const x0 = x + c * cw;
  return [kotak(`${id}-h${c}`, x0, y, cw, 14, "#FDE68A", W.biru, { rx: 0, tebal: 1.2, z: 1 }), teks(`${id}-ht${c}`, bulatkan(x0 + cw / 2), y + 10, NAMA_TEMPAT[c], 6.8, W.biru, { z: 2 })];
}
/** Sel kosong `${id}-c{c}` (tanpa kepala) pada baris yang dimulai di y. */
export const selKosong = (id: string, x: number, y: number, cw: number, c: number, ch = 30): Obj => kotak(`${id}-c${c}`, x + c * cw, y, cw, ch, W.putih, W.biru, { rx: 0, tebal: 1.2, z: 1 });
export const idPapan4 = (id: string, angka: (string | number)[]): string[] => [
  ...[0, 1, 2, 3].flatMap((c) => [`${id}-h${c}`, `${id}-ht${c}`, `${id}-c${c}`]),
  ...[0, 1, 2, 3].filter((c) => String(angka[c] ?? "") !== "").map((c) => `${id}-d${c}`),
];
/** Bingkai merah penanda satu sel `c` pada papan empat kotak. */
export const tandaiSel = (id: string, x: number, y: number, cw: number, c: number, ch = 30, warna: string = W.merah): Obj => kotak(id, x + c * cw, y + 14, cw, ch, undefined, warna, { tebal: 3, rx: 0, z: 5 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Pak Laode" | "Kak Tiara";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkepang satu `${id}-k1`, berkacamata `${id}-kc`, dan memegang kertas saku `${id}-ks`;
 * Genta berpeci hitam `${id}-pc` dan berkaus hijau `${id}-bj`; Pak Hendro berkaus putih `${id}-bj`, bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`;
 * Pak Laode berkaus cokelat `${id}-bj` dan bertopi caping `${id}-cp`; Kak Tiara berkaus jingga `${id}-bj`, bertopi pandan `${id}-tp`, memegang papan dermaga `${id}-pd`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Kak Tiara" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 10): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.82), 16, 6, "#1F2937", "#0F172A", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(baju("#DB2777", "#831D4C"));
    out.push(bulat(`${id}-k1`, x + 13, bulatkan(y - u * 0.25), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, bulatkan(x - 8), bulatkan(y - u * 0.4), 16, 4, undefined, "#1F2937", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-ks`, x - 21, bulatkan(y + 3), 8, 11, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#F8FAFC", "#64748B", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 13), bulatkan(y - u * 0.78), 26, 5, "#FCD34D", "#B45309", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-pl`, x, bulatkan(y + 3), 6, 7, "#EF4444", 1.8, { z: 2 }));
    out.push(kotak(`${id}-ts`, x + 12, bulatkan(y + 3), 8, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Laode") {
    out.push(baju("#92400E", "#451A03", 12));
    out.push(poligon(`${id}-cp`, [[x - 14, bulatkan(y - u * 0.52)], [x, bulatkan(y - u * 1.0)], [x + 14, bulatkan(y - u * 0.52)]], "#D4A55A", "#92400E", { tebal: 1.1, z: 2 }));
  }
  if (nama === "Kak Tiara") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 14), bulatkan(y - u * 0.78), 28, 5, "#E5C07B", "#92400E", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pd`, x + 12, bulatkan(y + 1), 12, 13, "#BAE6FD", "#0369A1", { rx: 1, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Satria" || nama === "Laras" || nama === "Genta" ? 15 : 18)), nama, 8.2, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Laras" ? [`${id}-bj`, `${id}-k1`, `${id}-kc`, `${id}-ks`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Pak Laode" ? [`${id}-bj`, `${id}-cp`] : []),
  ...(nama === "Kak Tiara" ? [`${id}-bj`, `${id}-tp`, `${id}-pd`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));

/** Angka `a` pada sel `c` papan empat kotak yang dibuat papan4 dengan parameter sama (untuk muncul bertahap). */
export function angkaSel(id: string, x: number, y: number, cw: number, c: number, a: string | number, o: { ch?: number; u?: number } = {}): Obj {
  const ch = o.ch ?? 30;
  const u = o.u ?? 18;
  return teks(`${id}-d${c}`, bulatkan(x + c * cw + cw / 2), bulatkan(y + 14 + ch / 2 + u * 0.35), String(a), u, W.biru, { z: 2 });
}

/** Deret `n` balok jenis `j` berjajar di tengah kolom `cx`, pojok atas y, ukuran `s`: `${id}0`... Bagian tiap balok mengikuti id masing-masing. */
export function deretBalok(j: "peti" | "kotak" | "ikat" | "lembar", id: string, cx: number, y: number, n: number, s: number, gap = 3): Obj[] {
  const lebar = n * s + (n - 1) * gap;
  const out: Obj[] = [];
  for (let i = 0; i < n; i += 1) {
    const x = cx - lebar / 2 + i * (s + gap);
    out.push(...(j === "peti" ? peti(`${id}${i}`, bulatkan(x), y, s) : j === "kotak" ? kotakKarton(`${id}${i}`, bulatkan(x), y, s) : j === "ikat" ? ikat(`${id}${i}`, bulatkan(x), y, s) : lembar(`${id}${i}`, bulatkan(x), y, s)));
  }
  return out;
}
export const idDeretBalok = (j: "peti" | "kotak" | "ikat" | "lembar", id: string, n: number): string[] => Array.from({ length: n }, (_, i) => idBalok(j, `${id}${i}`)).flat();
