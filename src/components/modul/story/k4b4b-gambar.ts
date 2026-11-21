import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (volume), akhir cerita Kolam Renang Tirta Ceria.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: tepi kolam berlantai biru muda dengan rak ember, ember berair, gelas takar, gelas ukur bertanda, kubus satuan yang ditumpuk menjadi lapisan (satu kotak satu kubus),
 * tangga liter, dan kartu bilangan. Tokoh: Satria (kaus biru), Laras (berkepang satu, berkacamata, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain),
 * Bu Sinta (pengelola kolam bertopi putih, memegang papan jalan), Pak Anto (petugas kolam berkaus biru muda, memegang gelas ukur). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  pink: "#FCE7F3",
  hijauMuda: "#DCFCE7",
  kuning: "#FACC15",
};

export const E = {
  satria: "\u{1F466}",
  laras: "\u{1F467}",
  genta: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  yakin: "\u{1F60E}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  jempol: "\u{1F44D}",
  tepuk: "\u{1F44F}",
  tawa: "\u{1F602}",
  mata: "\u{1F440}",
  balon: "\u{1F388}",
  konfeti: "\u{1F389}",
  pita: "\u{1F38A}",
  gelas: "\u{1F95B}",
  botol: "\u{1F37C}",
  tetes: "\u{1F4A7}",
  dadu: "\u{1F3B2}",
  sapu: "\u{1F9F9}",
  tabrak: "\u{1F4A5}",
  kilau: "\u{2728}",
  catat: "\u{1F4DD}",
  tangga: "\u{1F522}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

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
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Tepi kolam ------------------------------ */
export const WL = {
  lantai: "#BAE6FD",
  lantaiGaris: "#38BDF8",
  kayu: "#B45309",
  kayuMuda: "#E8B26A",
  air: "#7DD3FC",
  airGaris: "#0284C7",
  ember: "#F59E0B",
  emberGaris: "#92400E",
  kubus: "#BAE6FD",
} as const;

/** Lantai tepi kolam `${id}` dari tinggi y sampai bawah kanvas, dua garis ubin `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WL.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WL.lantaiGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WL.lantaiGaris, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Rak kayu: papan `${id}` dan dua kaki `${id}-k1` `${id}-k2` sampai tanah. */
export function rak(id: string, x: number, y: number, w: number, tanah = 150): Obj[] {
  return [
    kotak(id, x, y, w, 6, WL.kayuMuda, WL.kayu, { rx: 2, tebal: 1.6, z: 1 }),
    garis(`${id}-k1`, bulatkan(x + 6), y + 6, 0, tanah - y - 6, WL.kayu, 3, { z: 0 }),
    garis(`${id}-k2`, bulatkan(x + w - 6), y + 6, 0, tanah - y - 6, WL.kayu, 3, { z: 0 }),
  ];
}
export const idRak = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`];

/** Dua tiang spanduk `${id}-p1` dan `${id}-p2` dari tinggi y sampai tanah. */
export function tiang(id: string, x: number, y: number, w: number, tanah = 150): Obj[] {
  return [garis(`${id}-p1`, x + 3, y, 0, tanah - y, WL.kayu, 3, { z: 0 }), garis(`${id}-p2`, x + w - 3, y, 0, tanah - y, WL.kayu, 3, { z: 0 })];
}
/** Kain spanduk `${id}` (kotak merah muda) dan tulisannya `${id}-t`. */
export function kain(id: string, x: number, y: number, w: number, h: number, isi: string, u = 9): Obj[] {
  return [kotak(id, x, y, w, h, "#FEE2E2", W.merah, { rx: 3, tebal: 2, z: 1 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, W.merah, { z: 2 })];
}
export const idKain = (id: string): string[] => [id, `${id}-t`];
export const idTiang = (id: string): string[] => [`${id}-p1`, `${id}-p2`];

/* ------------------------------ Ember, gelas, dan kubus ------------------------------ */
/** Tinggi dan posisi air dalam ember (pojok kiri-atas ember (x, y), lebar w, tinggi h) untuk isi `f` (0 sampai 1): { y, h } untuk kotak air `${id}-a`. */
export const airEmber = (y: number, h: number, f: number): { y: number; h: number } => {
  const tinggi = bulatkan(Math.max(0, (h - 4) * f));
  return { y: bulatkan(y + h - 2 - tinggi), h: tinggi };
};
/**
 * Ember bertapak: badan `${id}` (garis tebal jingga, tanpa isi), air `${id}-a` (kotak biru muda di dalamnya, setinggi `isi` dari 0 sampai 1), dan pegangan `${id}-h`.
 * Pojok kiri-atas badan (x, y). Air dibuat dengan tinggi sesuai isi (tinggi nol bila kosong); ubah `y` dan `h` air untuk menaikkannya.
 */
export function ember(id: string, x: number, y: number, w = 34, h = 38, isi = 0): Obj[] {
  const a = airEmber(y, h, isi);
  return [
    kotak(`${id}-a`, bulatkan(x + 5), a.y, bulatkan(w - 10), a.h, WL.air, undefined, { rx: 1, tebal: 0, z: 1 }),
    { id, t: "jalur", x, y, d: `M0 0 L${w} 0 L${bulatkan(w - 6)} ${h} L6 ${h} Z`, warna: undefined, garis: WL.ember, tebal: 2.4, z: 3 },
    { id: `${id}-h`, t: "jalur", x, y, d: `M0 3 Q${bulatkan(w / 2)} ${bulatkan(-h * 0.55)} ${w} 3`, warna: undefined, garis: WL.ember, tebal: 1.6, z: 3 },
  ];
}
export const idEmber = (id: string): string[] => [id, `${id}-a`, `${id}-h`];

/** Gelas takar kecil `${id}`: trapesium berisi air dengan tinggi `s` kali 1,15. Pojok kiri-atas (x, y). */
export function gelas(id: string, x: number, y: number, s = 12): Obj {
  return { id, t: "jalur", x, y, d: `M0 0 L${s} 0 L${bulatkan(s - 2.5)} ${bulatkan(s * 1.15)} L2.5 ${bulatkan(s * 1.15)} Z`, warna: WL.air, garis: WL.airGaris, tebal: 1.2, z: 2 };
}
/** Satu deret `n` gelas kecil (satu gelas satu benda), gelas ke-i berid `${id}-${i}`; pojok kiri-atas deret (x, y). */
export function deretGelas(id: string, x: number, y: number, n: number, jarak = 20, s = 12): Obj[] {
  return Array.from({ length: n }, (_, i) => gelas(`${id}-${i}`, bulatkan(x + i * jarak), y, s));
}
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${i}`);

/**
 * Gelas ukur: badan `${id}` (kotak tanpa isi), air `${id}-a` (setinggi `isi` dari 0 sampai 1), dan tiga garis tanda `${id}-s0` sampai `${id}-s2` di sisi kanan. Pojok kiri-atas (x, y).
 */
export function gelasUkur(id: string, x: number, y: number, w = 20, h = 60, isi = 0): Obj[] {
  const a = airEmber(y, h, isi);
  return [
    kotak(`${id}-a`, bulatkan(x + 1.5), a.y, bulatkan(w - 3), a.h, WL.air, undefined, { rx: 0, tebal: 0, z: 1 }),
    kotak(id, x, y, w, h, undefined, WL.airGaris, { rx: 2, tebal: 2, z: 3 }),
    ...[0, 1, 2].map((i) => garis(`${id}-s${i}`, bulatkan(x + w - 8), bulatkan(y + h * (0.25 + i * 0.25)), 8, 0, W.biru, 1.4, { z: 4 })),
  ];
}
export const idGelasUkur = (id: string): string[] => [id, `${id}-a`, `${id}-s0`, `${id}-s1`, `${id}-s2`];

/** Satu kubus satuan `${id}` (kotak biru muda). Pojok kiri-atas (x, y). */
export function kubus(id: string, x: number, y: number, s = 10): Obj {
  return kotak(id, bulatkan(x), bulatkan(y), s, s, WL.kubus, W.biru, { rx: 1, tebal: 1, z: 2 });
}
/** Satu lapisan kubus: `kolom` kali `baris` kotak (satu kotak satu kubus), kotak baris r kolom c berid `${id}-${r}-${c}`. Pojok kiri-atas (x, y). */
export function lapisanKubus(id: string, x: number, y: number, kolom: number, baris: number, s = 10): Obj[] {
  return Array.from({ length: baris }, (_, r) => Array.from({ length: kolom }, (_, c) => kubus(`${id}-${r}-${c}`, x + c * s, y + r * s, s))).flat();
}
export const idLapisan = (id: string, kolom: number, baris: number): string[] => Array.from({ length: baris }, (_, r) => Array.from({ length: kolom }, (_, c) => `${id}-${r}-${c}`)).flat();

/** Pelampung berderet: cincin merah `${id}` dan lubang `${id}-d`. Pusat (x, y). */
export function pelampung(id: string, x: number, y: number, r = 8, warna: string = W.merah): Obj[] {
  return [bulat(id, x, y, r, W.putih, warna, { tebal: 3.5, z: 2 }), bulat(`${id}-d`, x, y, bulatkan(r * 0.35), WL.air, WL.airGaris, { tebal: 0.8, z: 3 })];
}
export const idPelampung = (id: string): string[] => [id, `${id}-d`];

/** Tangga dua anak: lintasan `${id}` (garis anak tangga) dari kiri-atas ke kanan-bawah. Pojok kiri-atas (x, y). */
export function tangga(id: string, x: number, y: number): Obj {
  return { id, t: "jalur", x, y, d: "M0 0 L90 0 L90 50 L180 50", warna: undefined, garis: W.coklat, tebal: 3, z: 1 };
}

/** Lingkaran bilangan: bulat `${id}` dan teks `${id}-t` berisi bilangan (atau "?"), pusat (x, y). */
export function bil(id: string, x: number, y: number, isi: string, u = 12, r = 14, putus = false, warna = W.putih): Obj[] {
  return [bulat(id, x, y, r, warna, W.biru, { tebal: 2, putus, z: 2 }), teks(`${id}-t`, x, bulatkan(y + u * 0.35), isi, u, W.biru, { z: 3 })];
}
export const idBil = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Sinta" | "Pak Anto";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka1` `${id}-ka2`, berkepang satu `${id}-kp`, berkertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc` dan berkaus hijau `${id}-bj`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`, berkaus oranye `${id}-bj`;
 * Bu Sinta berbaju ungu `${id}-bj`, bertopi putih `${id}-tp`, memegang papan jalan `${id}-pj`; Pak Anto berkaus biru muda `${id}-bj`, memegang gelas ukur `${id}-gu`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Sinta" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Satria") out.push(baju("#2563EB", "#1E3A8A"));
  if (nama === "Genta") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pc`, bulatkan(x - 8), bulatkan(y - u * 0.8), 16, 6, "#1F2937", "#0F172A", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Laras") {
    out.push(baju("#EC4899", "#831843"));
    out.push(bulat(`${id}-ka1`, x - 5, bulatkan(y - u * 0.3), 3, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-ka2`, x + 5, bulatkan(y - u * 0.3), 3, undefined, "#1F2937", { tebal: 1, z: 2 }));
    out.push(bulat(`${id}-kp`, x + 13, bulatkan(y - u * 0.05), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x - 20, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hendro") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 14), bulatkan(y - u * 0.78), 28, 5, "#FDE68A", "#B45309", { rx: 2, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 2, bulatkan(y + 7), 2.2, "#FACC15", "#92400E", { tebal: 0.9, z: 2 }));
    out.push(kotak(`${id}-ts`, x - 20, bulatkan(y + 3), 7, 11, "#A16207", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Sinta") {
    out.push(baju("#7C3AED", "#4C1D95", 12));
    out.push(kotak(`${id}-tp`, bulatkan(x - 13), bulatkan(y - u * 0.78), 26, 5, W.putih, "#64748B", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 2), 9, 12, "#B45309", "#451A03", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Anto") {
    out.push(baju("#7DD3FC", "#0369A1", 12));
    out.push(kotak(`${id}-gu`, x + 13, bulatkan(y - 4), 6, 16, W.putih, WL.airGaris, { rx: 1, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Satria" || nama === "Genta" || nama === "Laras" ? 15 : 18)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Laras" ? [`${id}-bj`, `${id}-ka1`, `${id}-ka2`, `${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Bu Sinta" ? [`${id}-bj`, `${id}-tp`, `${id}-pj`] : []),
  ...(nama === "Pak Anto" ? [`${id}-bj`, `${id}-gu`] : []),
];
