import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab A "Toples Permen Pak Joko" (bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa gudang belakang toko: lantai semen, kardus bertumpuk, troli, rak kayu, toples besar bertutup hijau, bungkus permen, butir permen, papan stok tiga tempat
 * (ratusan hijau, puluhan biru, satuan merah), balok Dienes (kubus, batang, lempeng), tabel tiga tempat, kertas catatan dan daftar stok.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (berapron biru, berkumis, berpensil di telinga),
 * Kak Dewi (kurir berjaket oranye), Bu Wati (berapron ungu, tampak di pintu). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Warna tempat angka: ratusan hijau, puluhan biru, satuan merah. */
  rts: "#16A34A",
  pls: "#2563EB",
  sat: "#DC2626",
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
  debu: "\u{1F4A8}",
  catat: "\u{1F4DD}",
  permen: "\u{1F36C}",
  sorak: "\u{1F389}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  pensil: "\u{270F}",
  sapu: "\u{1F9F9}",
  gerutu: "\u{1F624}",
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
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Gudang ------------------------------ */
export const WG = {
  lantai: "#D6D3D1",
  lantaiGaris: "#A8A29E",
  kardus: "#D6A15E",
  kardusTua: "#92400E",
  pita: "#FDE68A",
  rak: "#B7814A",
  rakTua: "#6B4423",
  kaca: "#BAE6FD",
  kacaTua: "#0369A1",
  tutup: "#16A34A",
  bungkus: "#FDBA74",
  bungkusTua: "#C2410C",
  permen: "#F97316",
  permenTua: "#9A3412",
  kertas: "#FFFFFF",
} as const;

/** Lantai semen `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WG.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WG.lantaiGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WG.lantaiGaris, 1.4, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Kardus kiriman: badan `${id}`, pita `${id}-p`, tulisan `${id}-t` (bila ada). Pojok kiri-atas (x, y). */
export function kardus(id: string, x: number, y: number, w = 40, h = 24, tulisan?: string): Obj[] {
  const out: Obj[] = [kotak(id, x, y, w, h, WG.kardus, WG.kardusTua, { rx: 2, tebal: 1.5, z: 1 }), kotak(`${id}-p`, bulatkan(x + w / 2 - 4), y, 8, h, WG.pita, WG.kardusTua, { rx: 0, tebal: 0.8, z: 2 })];
  if (tulisan) out.push(teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + 3), tulisan, 6.2, W.merah, { z: 3 }));
  return out;
}
export const idKardus = (id: string, tulisan = false): string[] => [id, `${id}-p`, ...(tulisan ? [`${id}-t`] : [])];

/** Troli kardus: papan `${id}`, dua roda `${id}-a` `${id}-b`, gagang `${id}-h`. Pojok kiri-atas papan (x, y). */
export function troli(id: string, x: number, y: number, w = 40): Obj[] {
  return [
    kotak(id, x, y, w, 5, "#64748B", "#1E293B", { rx: 1, tebal: 1.2, z: 1 }),
    bulat(`${id}-a`, bulatkan(x + 7), y + 9, 4, "#1E293B", "#0F172A", { tebal: 1, z: 1 }),
    bulat(`${id}-b`, bulatkan(x + w - 7), y + 9, 4, "#1E293B", "#0F172A", { tebal: 1, z: 1 }),
    garis(`${id}-h`, bulatkan(x + w - 1), y + 2, 0, -26, "#334155", 2.2, { z: 1 }),
  ];
}
export const idTroli = (id: string): string[] => [id, `${id}-a`, `${id}-b`, `${id}-h`];

/** Rak kayu `${id}` selebar w dengan satu papan; pojok kiri-atas papan (x, y), dua kaki `${id}-l` `${id}-r` sepanjang `kaki`. */
export function rak(id: string, x: number, y: number, w = 70, kaki = 30): Obj[] {
  return [
    kotak(id, x, y, w, 5, WG.rak, WG.rakTua, { rx: 1, tebal: 1.4, z: 1 }),
    kotak(`${id}-l`, bulatkan(x + 3), y + 5, 4, kaki, WG.rak, WG.rakTua, { rx: 0, tebal: 1, z: 0 }),
    kotak(`${id}-r`, bulatkan(x + w - 7), y + 5, 4, kaki, WG.rak, WG.rakTua, { rx: 0, tebal: 1, z: 0 }),
  ];
}
export const idRak = (id: string): string[] => [id, `${id}-l`, `${id}-r`];

/** Toples besar bertutup hijau: badan `${id}`, tutup `${id}-t`, kilau `${id}-k`; isi (butir kecil) `${id}-i{0..}` bila `isi` (jumlah titik). Pojok kiri-atas badan (x, y). */
export function toples(id: string, x: number, y: number, w = 26, h = 30, isi = 0, warna: string = WG.kaca): Obj[] {
  const out: Obj[] = [
    kotak(id, x, y, w, h, warna, WG.kacaTua, { rx: 6, tebal: 1.6, z: 1 }),
    kotak(`${id}-t`, bulatkan(x + w * 0.15), bulatkan(y - 6), bulatkan(w * 0.7), 7, WG.tutup, W.hijauTua, { rx: 2, tebal: 1.2, z: 2 }),
    garis(`${id}-k`, bulatkan(x + 4), bulatkan(y + 5), 0, bulatkan(h * 0.4), W.putih, 1.6, { z: 3, op: 0.8 }),
  ];
  for (let i = 0; i < isi; i += 1) out.push(bulat(`${id}-i${i}`, bulatkan(x + w * 0.25 + (i % 3) * (w * 0.25)), bulatkan(y + h * 0.35 + Math.floor(i / 3) * (h * 0.22)), 2.6, WG.permen, WG.permenTua, { tebal: 0.8, z: 2 }));
  return out;
}
export const idToples = (id: string, isi = 0): string[] => [id, `${id}-t`, `${id}-k`, ...Array.from({ length: isi }, (_, i) => `${id}-i${i}`)];

/** Bungkus permen (kantung oranye dengan simpul): badan `${id}`, simpul `${id}-s`. Pojok kiri-atas badan (x, y). */
export function bungkus(id: string, x: number, y: number, w = 18, h = 14): Obj[] {
  return [kotak(id, x, y, w, h, WG.bungkus, WG.bungkusTua, { rx: 4, tebal: 1.3, z: 1 }), bulat(`${id}-s`, bulatkan(x + w / 2), y - 1, 2.4, WG.bungkusTua, WG.bungkusTua, { tebal: 0.6, z: 2 })];
}
export const idBungkus = (id: string): string[] => [id, `${id}-s`];

/** Satu butir permen berpusat di (x, y). */
export const butir = (id: string, x: number, y: number, r = 3.4, warna: string = WG.permen): Obj => bulat(id, x, y, r, warna, WG.permenTua, { tebal: 0.9, z: 2 });
/** Deret butir `n` buah, id `${id}0`..: pusat pertama (x0, y), jarak g. */
export const deretButir = (id: string, x0: number, y: number, n: number, g = 8, r = 3.2, warna: string = WG.permen): Obj[] => Array.from({ length: n }, (_, i) => butir(`${id}${i}`, bulatkan(x0 + i * g), y, r, warna));
export const idDeretButir = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Papan stok tiga tempat: bingkai `${id}`, tiga kepala `${id}-h0..2` dengan tulisan `${id}-t0..2`. Pojok kiri-atas (x, y), lebar w, tinggi h; tinggi kepala 18. */
export function papanTempat(id: string, x: number, y: number, w: number, h: number, kata = true): Obj[] {
  const lb = w / 3;
  const warna = [W.rts, W.pls, W.sat];
  const muda = ["#DCFCE7", "#DBEAFE", "#FEE2E2"];
  const nama = ["ratusan", "puluhan", "satuan"];
  const out: Obj[] = [];
  for (let c = 0; c < 3; c += 1) {
    out.push(kotak(`${id}-b${c}`, bulatkan(x + c * lb), y, bulatkan(lb), h, muda[c], warna[c], { rx: 0, tebal: 1.8, z: 0 }));
    out.push(kotak(`${id}-h${c}`, bulatkan(x + c * lb), y, bulatkan(lb), 18, warna[c], warna[c], { rx: 0, tebal: 1.2, z: 1 }));
    if (kata) out.push(teks(`${id}-t${c}`, bulatkan(x + c * lb + lb / 2), y + 12.5, nama[c], 8, W.putih, { z: 2 }));
  }
  return out;
}
export const idPapanTempat = (id: string, kata = true): string[] => [0, 1, 2].flatMap((c) => [`${id}-b${c}`, `${id}-h${c}`, ...(kata ? [`${id}-t${c}`] : [])]);
/** Pusat horizontal kolom c (0 ratusan, 1 puluhan, 2 satuan) pada papan (x, w). */
export const xKolom = (x: number, w: number, c: number): number => bulatkan(x + (w / 3) * c + w / 6);

/* ------------------------------ Balok Dienes ------------------------------ */
/** Kubus satuan sisi s: badan `${id}`. Pojok kiri-atas (x, y). */
export const kubus = (id: string, x: number, y: number, s = 6, warna: string = W.sat): Obj => kotak(id, x, y, s, s, warna, "#7F1D1D", { rx: 1, tebal: 0.9, z: 2 });
/** Batang puluhan (sepuluh kubus): badan `${id}` dan sembilan sekat `${id}-s{0..8}`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function batang(id: string, x: number, y: number, w = 6, h = 40, warna: string = W.pls): Obj[] {
  return [kotak(id, x, y, w, h, warna, "#1E3A8A", { rx: 1, tebal: 1, z: 2 }), ...Array.from({ length: 9 }, (_, i) => garis(`${id}-s${i}`, x, bulatkan(y + ((i + 1) * h) / 10), w, 0, "#1E3A8A", 0.6, { z: 3 }))];
}
export const idBatang = (id: string): string[] => [id, ...Array.from({ length: 9 }, (_, i) => `${id}-s${i}`)];
/** Lempeng ratusan (seratus kubus): badan `${id}`, garis tegak `${id}-v{1..4}` dan mendatar `${id}-w{1..4}` (sekat dijarangkan). Pojok kiri-atas (x, y), sisi s. */
export function lempeng(id: string, x: number, y: number, s = 40, warna: string = W.rts): Obj[] {
  const out: Obj[] = [kotak(id, x, y, s, s, warna, "#14532D", { rx: 1, tebal: 1.2, z: 2 })];
  for (let i = 1; i <= 4; i += 1) {
    out.push(garis(`${id}-v${i}`, bulatkan(x + (i * s) / 5), y, 0, s, "#14532D", 0.6, { z: 3 }));
    out.push(garis(`${id}-w${i}`, x, bulatkan(y + (i * s) / 5), s, 0, "#14532D", 0.6, { z: 3 }));
  }
  return out;
}
export const idLempeng = (id: string): string[] => [id, ...[1, 2, 3, 4].flatMap((i) => [`${id}-v${i}`, `${id}-w${i}`])];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Kak Dewi" | "Bu Wati";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berapron biru `${id}-bj`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`; Kak Dewi berjaket oranye `${id}-bj`;
 * Bu Wati berapron ungu `${id}-bj`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" ? E.pak : E.bu;
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
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.6), 0, 8, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Kak Dewi") out.push(baju("#F97316", "#9A3412", 10));
  if (nama === "Bu Wati") out.push(baju("#9333EA", "#581C87", 11));
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" ? 18 : 15)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" || nama === "Kak Dewi" || nama === "Bu Wati" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-km`, `${id}-ps`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));

/* ------------------------------ Tabel tiga tempat ------------------------------ */
/** Tabel tiga tempat `${id}`: bingkai, kepala `${id}-h` (hijau, biru, merah) dan dua garis kolom `${id}-v0` `${id}-v1`. Pojok kiri-atas (x, y), lebar w, tinggi th + tb. */
export function tabel3(id: string, x: number, y: number, w: number, th = 18, tb = 30): Obj[] {
  const lb = w / 3;
  return [
    kotak(id, x, y, w, th + tb, W.putih, W.biru, { rx: 4, tebal: 1.6, z: -1 }),
    ...[W.rts, W.pls, W.sat].map((wr, c) => kotak(`${id}-h${c}`, bulatkan(x + c * lb), y, bulatkan(lb), th, wr, W.biru, { rx: 0, tebal: 1.2, z: -0.5 })),
    garis(`${id}-v0`, bulatkan(x + lb), y + th, 0, tb, W.biru, 1.2, { z: -0.4 }),
    garis(`${id}-v1`, bulatkan(x + 2 * lb), y + th, 0, tb, W.biru, 1.2, { z: -0.4 }),
  ];
}
export const idTabel3 = (id: string): string[] => [id, `${id}-h0`, `${id}-h1`, `${id}-h2`, `${id}-v0`, `${id}-v1`];

/** Tulisan kepala kolom c (0 ratusan, 1 puluhan, 2 satuan) pada papanTempat tanpa kata: `${id}-t{c}`. */
export const labelTempat = (id: string, x: number, w: number, y: number, c: number): Obj => teks(`${id}-t${c}`, xKolom(x, w, c), y + 12.5, ["ratusan", "puluhan", "satuan"][c], 8, W.putih, { z: 2 });
/** Angka pada kolom c: `${id}-d{c}`; tulisan di tinggi y. */
export const angkaTempat = (id: string, x: number, w: number, y: number, c: number, isi: string, u = 22): Obj => teks(`${id}-d${c}`, xKolom(x, w, c), y, isi, u, [W.rts, W.pls, W.sat][c], { z: 3 });
