import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab E "Sisa Stok Pak Anto" (pengurangan sampai seratus). Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa Toko Kelontong Pak Joko bagian rak mi: dinding krem berkanopi merah, lantai kayu, rak kayu bertingkat, bungkus mi oranye, kardus kraft berlakban (tiap kardus sepuluh bungkus),
 * kaleng susu, papan kapur hijau berbingkai kayu, kertas catatan, troli, tumpukan kardus kosong, balon pesanan.
 * Tokoh: Raka (berkaus merah), Salsa (berkepang dua, berkertas catatan), Bima (berkaus hijau), Pak Joko (berapron biru, berkumis, pensil di telinga),
 * Pak Anto (berkemeja kotak-kotak, bertas penjual), Bu Mirna (bercaping, berkeranjang telur). Emoji tanpa ZWJ.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  merahTua: "#7F1D1D",
  hijau: "#16A34A",
  hijauTua: "#14532D",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  biruMuda: "#DBEAFE",
  kuning: "#FDE68A",
  tinta: "#0F172A",
  kayu: "#D6A15E",
  kraft: "#D2A06A",
  mi: "#F97316",
  oranye: "#FB923C",
  kaleng: "#E2E8F0",
  kapur: "#F8FAFC",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pria: "\u{1F468}",
  wanita: "\u{1F469}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  lelah: "\u{1F613}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  kilau: "\u{2728}",
  lampu: "\u{1F4A1}",
  telur: "\u{1F95A}",
  keranjang: "\u{1F9FA}",
  kardus: "\u{1F4E6}",
  kaleng: "\u{1F96B}",
  mi: "\u{1F35C}",
  debu: "\u{1F4A8}",
  jam: "\u{23F3}",
} as const;

type Opsi = Partial<Obj>;
const r1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (di bawah kanopi toko). */
export const judul = (isi: string, warna: string = W.coklat): Obj => teks("jud", 150, 26, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, r1(mulai + i * (u + 3)), b, u, W.biru, o))];
}
export const idKartu = (id: string, baris = 1): string[] => [`${id}-k`, ...Array.from({ length: baris }, (_, i) => `${id}-t${i}`)];

/** Poligon tertutup dari titik-titik absolut (di kanvas). */
export const poligon = (id: string, pts: [number, number][], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: pts[0][0],
  y: pts[0][1],
  d: `M0 0 ${pts.slice(1).map(([a, b]) => `L${r1(a - pts[0][0])} ${r1(b - pts[0][1])}`).join(" ")} Z`,
  warna,
  garis: garisW,
  tebal: 1.6,
  ...o,
});

/* ------------------------------ Latar toko ------------------------------ */

/** Latar toko `${id}`: dinding krem, kanopi merah `${id}-v`, lantai kayu `${id}-l` dan garis papan `${id}-l1`. */
export const tokoLatar = (id: string, dinding = "#FEF3C7"): Obj[] => [
  kotak(id, 2, 2, 296, 166, dinding, "#94A3B8", { rx: 4, tebal: 1.2, z: -4 }),
  kotak(`${id}-v`, 2, 2, 296, 10, W.merah, W.merahTua, { rx: 2, tebal: 1.2, z: -3 }),
  kotak(`${id}-l`, 2, 168, 296, 30, "#E7C98A", W.coklat, { rx: 3, tebal: 1.2, z: -3 }),
  garis(`${id}-l1`, 2, 183, 296, 0, W.coklat, 0.8, { z: -2 }),
];
export const idLatar = (id: string): string[] => [id, `${id}-v`, `${id}-l`, `${id}-l1`];

/** Rak kayu bertingkat `${id}`: bingkai dan `tingkat` papan `${id}-s{i}`; pojok kiri-atas (x, y). Barang diletakkan di atas papan. */
export function rakKayu(id: string, x: number, y: number, w: number, h: number, tingkat: number): Obj[] {
  const out: Obj[] = [kotak(id, x, y, w, h, "#FDE9C0", W.coklat, { rx: 3, tebal: 2.4, z: 0 })];
  for (let i = 1; i <= tingkat; i += 1) out.push(kotak(`${id}-s${i}`, x, r1(y + (i * h) / tingkat - 3), w, 5, W.kayu, W.coklat, { rx: 1, tebal: 1, z: 1 }));
  return out;
}
export const idRak = (id: string, tingkat: number): string[] => [id, ...Array.from({ length: tingkat }, (_, i) => `${id}-s${i + 1}`)];
/** Tinggi tengah papan ke-i (mulai 1) pada rak `rakKayu(id, x, y, w, h, tingkat)`. */
export const papanY = (y: number, h: number, tingkat: number, i: number): number => r1(y + (i * h) / tingkat - 3);

/* ------------------------------ Barang ------------------------------ */

/** Kardus kraft `${id}` berlakban dengan teks `${id}-t` (mis. "10" untuk sepuluh bungkus); pojok kiri-atas (x, y). */
export const kardus = (id: string, x: number, y: number, label = "10", w = 22, h = 16): Obj[] => [
  kotak(id, x, y, w, h, W.kraft, W.coklat, { rx: 1.5, tebal: 1.1, z: 2 }),
  kotak(`${id}-b`, r1(x + w / 2 - 2), y, 4, h, "#EAD2A8", undefined, { rx: 0, tebal: 0, z: 3 }),
  teks(`${id}-t`, r1(x + w * 0.2 + 1), r1(y + h - 3), label, 5.6, W.coklat, { z: 4, anchor: "start" }),
];
export const idKardus = (id: string): string[] => [id, `${id}-b`, `${id}-t`];
/** Kardus kosong (tanpa angka, tutup terbuka) `${id}` dan tutupnya `${id}-c`. */
export const kardusKosong = (id: string, x: number, y: number, w = 22, h = 16): Obj[] => [
  kotak(id, x, y, w, h, "#E5CFA3", W.coklat, { rx: 1.5, tebal: 1.1, z: 2 }),
  kotak(`${id}-c`, r1(x - 2), r1(y - 4), w + 4, 4, "#C99A5B", W.coklat, { rx: 1, tebal: 1, z: 3, rot: -6 }),
];
export const idKardusKosong = (id: string): string[] => [id, `${id}-c`];

/** Bungkus mi `${id}` (kotak kecil oranye bergelombang `${id}-w`); pojok kiri-atas (x, y). */
export const bungkus = (id: string, x: number, y: number, warna: string = W.mi): Obj[] => [
  kotak(id, x, y, 11, 8, warna, W.coklat, { rx: 1.5, tebal: 0.9, z: 2 }),
  garis(`${id}-w`, r1(x + 2), r1(y + 4), 7, 0, W.putih, 0.9, { z: 3 }),
];
export const idBungkus = (id: string): string[] => [id, `${id}-w`];
/** Baris `n` bungkus `${id}0...` berjajar dari kiri x0 pada tinggi y, jarak `j`. */
export const barisBungkus = (id: string, x0: number, y: number, n: number, j = 13, warna: string = W.mi): Obj[] => Array.from({ length: n }, (_, i) => bungkus(`${id}${i}`, r1(x0 + i * j), y, warna)).flat();
export const idBarisBungkus = (id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, i) => idBungkus(`${id}${dari + i}`)).flat();
/** Baris `n` kardus `${id}0...` (tiap kardus berlabel sepuluh) dari kiri x0 pada tinggi y. */
export const barisKardus = (id: string, x0: number, y: number, n: number, j = 24): Obj[] => Array.from({ length: n }, (_, i) => kardus(`${id}${i}`, r1(x0 + i * j), y)).flat();
export const idBarisKardus = (id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, i) => idKardus(`${id}${dari + i}`)).flat();

/** Kaleng susu `${id}` dengan label `${id}-l`; pojok kiri-atas (x, y). */
export const kaleng = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 11, 14, W.kaleng, W.biru, { rx: 2, tebal: 1, z: 2 }),
  kotak(`${id}-l`, r1(x + 1), r1(y + 5), 9, 5, "#60A5FA", undefined, { rx: 0, tebal: 0, z: 3 }),
];
export const idKaleng = (id: string): string[] => [id, `${id}-l`];

/** Kertas catatan `${id}` berisi garis `${id}-g{i}`; pojok kiri-atas (x, y). */
export function catatan(id: string, x: number, y: number, w: number, h: number, jumlahGaris = 3): Obj[] {
  return [
    kotak(id, x, y, w, h, W.krem, W.coklat, { rx: 2, tebal: 1.4, z: 2, rot: -2 }),
    ...Array.from({ length: jumlahGaris }, (_, i) => garis(`${id}-g${i}`, r1(x + 4), r1(y + 8 + i * ((h - 12) / jumlahGaris)), w - 8, 0, "#CBD5E1", 0.8, { z: 3 })),
  ];
}
export const idCatatan = (id: string, jumlahGaris = 3): string[] => [id, ...Array.from({ length: jumlahGaris }, (_, i) => `${id}-g${i}`)];

/** Papan kapur hijau berbingkai kayu `${id}` (bingkai) dan `${id}-p` (permukaan); pojok kiri-atas (x, y). */
export const papanKapur = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, W.kayu, W.coklat, { rx: 3, tebal: 1.6, z: 0 }),
  kotak(`${id}-p`, r1(x + 4), r1(y + 4), w - 8, h - 8, W.hijauTua, "#064E3B", { rx: 2, tebal: 1, z: 1 }),
];
export const idPapanKapur = (id: string): string[] => [id, `${id}-p`];
/** Teks kapur (putih) di papan kapur. */
export const kapur = (id: string, x: number, y: number, isi: string, u = 18, o: Opsi = {}): Obj => teks(id, x, y, isi, u, "#F8FAFC", { z: 3, ...o });

/** Troli dorong `${id}` (bak, dua roda, gagang); pojok kiri-atas (x, y). */
export const troli = (id: string, x: number, y: number, w = 50, h = 20): Obj[] => [
  kotak(id, x, y, w, h, "#94A3B8", W.tinta, { rx: 2, tebal: 1.4, z: 1 }),
  garis(`${id}-g`, r1(x + w), y, 10, -12, W.tinta, 2, { z: 1 }),
  bulat(`${id}-r1`, r1(x + 10), r1(y + h + 4), 4, W.tinta, W.tinta, { z: 2 }),
  bulat(`${id}-r2`, r1(x + w - 10), r1(y + h + 4), 4, W.tinta, W.tinta, { z: 2 }),
];
export const idTroli = (id: string): string[] => [id, `${id}-g`, `${id}-r1`, `${id}-r2`];

/** Spanduk kecil `${id}` dan teksnya `${id}-t`. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10, warna: string = W.merahMuda): Obj[] => [
  kotak(id, x, y, w, 22, warna, W.merah, { rx: 3, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, r1(y + 11 + u * 0.35), isi, u, W.merahTua, { z: 2 }),
];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Pak Anto" | "Bu Mirna";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-kp1`, `${id}-kp2` dan berkertas catatan `${id}-ct`; Bima berkaus hijau `${id}-bj`;
 * Pak Joko berapron biru `${id}-ap`, berkumis `${id}-km`, berpensil di telinga `${id}-pn`; Pak Anto berkemeja kotak-kotak `${id}-kj` (garis `${id}-k1`, `${id}-k2`) dan bertas penjual `${id}-ts`;
 * Bu Mirna bercaping `${id}-cp` dan berkeranjang `${id}-kr`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Bu Mirna" ? E.wanita : E.pria;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Raka") out.push(kotak(`${id}-bj`, x - 10, y + 3, 20, 8, W.merah, W.merahTua, { rx: 2, tebal: 1, z: 1 }));
  if (nama === "Bima") out.push(kotak(`${id}-bj`, x - 10, y + 3, 20, 8, W.hijau, W.hijauTua, { rx: 2, tebal: 1, z: 1 }));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-kp1`, x - 13, r1(y - 6), 3.4, "#7C2D12", W.coklat, { z: 0, tebal: 0.8 }));
    out.push(bulat(`${id}-kp2`, x + 13, r1(y - 6), 3.4, "#7C2D12", W.coklat, { z: 0, tebal: 0.8 }));
    out.push(kotak(`${id}-ct`, x + 12, y + 1, 10, 13, W.krem, W.coklat, { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(kotak(`${id}-ap`, x - 11, y + 3, 22, 10, "#2563EB", W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(garis(`${id}-km`, x - 6, r1(y - 6), 12, 0, W.tinta, 2.2, { z: 2 }));
    out.push(garis(`${id}-pn`, x + 13, r1(y - 14), 0, 8, "#F59E0B", 2.4, { z: 2 }));
  }
  if (nama === "Pak Anto") {
    out.push(kotak(`${id}-kj`, x - 11, y + 3, 22, 10, "#F8FAFC", W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(garis(`${id}-k1`, x - 11, y + 8, 22, 0, W.merah, 0.9, { z: 2 }));
    out.push(garis(`${id}-k2`, x, y + 3, 0, 10, W.merah, 0.9, { z: 2 }));
    out.push(kotak(`${id}-ts`, x + 12, y + 5, 14, 11, "#475569", W.tinta, { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Bu Mirna") {
    out.push(poligon(`${id}-cp`, [[x - 16, r1(y - 14)], [x, r1(y - 28)], [x + 16, r1(y - 14)]], "#FDE68A", W.coklat, { z: 2, tebal: 1.2 }));
    out.push(kotak(`${id}-kr`, x + 12, y + 5, 16, 10, "#C2813A", W.coklat, { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + 14), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-kp1`, `${id}-kp2`, `${id}-ct`] : []),
  ...(nama === "Pak Joko" ? [`${id}-ap`, `${id}-km`, `${id}-pn`] : []),
  ...(nama === "Pak Anto" ? [`${id}-kj`, `${id}-k1`, `${id}-k2`, `${id}-ts`] : []),
  ...(nama === "Bu Mirna" ? [`${id}-cp`, `${id}-kr`] : []),
];

/* ------------------------------ Susunan angka di papan kapur ------------------------------ */

/**
 * Susunan angka pengurangan `${id}`: bilangan atas `${id}-a`, tanda dan bilangan bawah `${id}-m`, `${id}-b`, garis `${id}-g`; sejajar kanan pada x (tengah kolom satuan).
 * Hanya teks (angka tampak utuh supaya suara yang menyebut bilangan itu tampak di gambar).
 */
export const susunan = (id: string, x: number, y: number, atas: string, bawah: string, u = 20, warna = "#F8FAFC"): Obj[] => [
  teks(`${id}-a`, x, y, atas, u, warna, { anchor: "end", z: 3 }),
  teks(`${id}-m`, r1(x - u * 1.5), r1(y + u * 1.15), "-", u, "#FDE047", { z: 3 }),
  teks(`${id}-b`, x, r1(y + u * 1.15), bawah, u, warna, { anchor: "end", z: 3 }),
  garis(`${id}-g`, r1(x - u * 2), r1(y + u * 1.4), u * 2.3, 0, "#F8FAFC", 1.6, { z: 3 }),
];
export const idSusunan = (id: string): string[] => [`${id}-a`, `${id}-m`, `${id}-b`, `${id}-g`];

/** Batang puluhan `${id}` (kotak tinggi biru dengan garis `${id}-g`); pojok kiri-atas (x, y). */
export const batang = (id: string, x: number, y: number, h = 26): Obj[] => [
  kotak(id, x, y, 7, h, "#60A5FA", W.biru, { rx: 1, tebal: 1, z: 2 }),
  garis(`${id}-g`, r1(x + 1), r1(y + h / 2), 5, 0, W.biru, 0.7, { z: 3 }),
];
export const idBatang = (id: string): string[] => [id, `${id}-g`];
/** Butir satuan `${id}` (kotak kecil kuning); pojok kiri-atas (x, y). */
export const butir = (id: string, x: number, y: number, warna = "#FACC15"): Obj => kotak(id, x, y, 7, 7, warna, W.biru, { rx: 1, tebal: 0.9, z: 2 });
/** Baris `n` butir `${id}0...` berjajar dari kiri x0 pada tinggi y, jarak `j`. */
export const barisButir = (id: string, x0: number, y: number, n: number, j = 9, warna = "#FACC15"): Obj[] => Array.from({ length: n }, (_, i) => butir(`${id}${i}`, r1(x0 + i * j), y, warna));
export const idBarisButir = (id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, i) => `${id}${dari + i}`);
