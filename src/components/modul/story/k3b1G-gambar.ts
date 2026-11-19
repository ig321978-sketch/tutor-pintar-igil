import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab G "Pesta Hari Jadi Toko" (pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa toko dihias hari jadi: dinding krem dan lantai kayu, pita bendera segitiga, papan nama TOKO PAK JOKO, meja bingkisan, bingkisan berpita,
 * keranjang anyaman, manik berwarna, garis bilangan, rumah segitiga keluarga fakta, spanduk OBRAL HARI JADI TOKO MERIAH, balon, konfeti.
 * Tokoh: Raka (kaus merah), Salsa (berkepang, kertas catatan), Bima (kaus hijau), Pak Joko (apron biru, pensil di telinga), Nenek Ijah (bertongkat),
 * tamu Kak Dewi (jaket oranye), Bu Wati (apron ungu), Pak Dodi (topi kuning), Bu Tuti (kerudung merah muda), Pak Anto (kemeja kotak), Bu Mirna (bercaping). Tanpa ZWJ.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  lavender: "#EDE9FE",
  kuning: "#FDE68A",
  tinta: "#0F172A",
  kayu: "#D6B98C",
  dinding: "#FFF7ED",
  oranye: "#F97316",
  pink: "#F9A8D4",
  biruMuda: "#BFDBFE",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pria: "\u{1F468}",
  wanita: "\u{1F469}",
  nenek: "\u{1F475}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  balon: "\u{1F388}",
  hadiah: "\u{1F381}",
  keranjang: "\u{1F9FA}",
  gulung: "\u{1F9FB}",
  permen: "\u{1F36C}",
  kue: "\u{1F370}",
  kilau: "\u{2728}",
  lampu: "\u{1F4A1}",
  tangan: "\u{1F446}",
  bangga: "\u{1F60E}",
} as const;

type Opsi = Partial<Obj>;
const r1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
/** Judul adegan di tengah atas (di bawah pita bendera). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 28, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, r1(mulai + i * (u + 3)), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Poligon tertutup dari titik-titik absolut. */
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

/* ------------------------------ Toko ------------------------------ */
const WARNA_BENDERA = [W.merah, W.emas, W.hijau, "#3B82F6", W.ungu];
/** Toko dihias: dinding krem `${id}`, lantai kayu `${id}-l`, tali pita `${id}-t`, sebelas bendera segitiga `${id}-b{i}`. */
export const tokoLatar = (id: string): Obj[] => [
  kotak(id, 2, 2, 296, 166, W.dinding, "#94A3B8", { rx: 4, tebal: 1.2, z: -4 }),
  kotak(`${id}-l`, 2, 168, 296, 30, W.kayu, W.coklat, { rx: 3, tebal: 1.2, z: -3 }),
  garis(`${id}-t`, 6, 5, 288, 0, W.coklat, 1, { z: -2 }),
  ...Array.from({ length: 11 }, (_, i) => poligon(`${id}-b${i}`, [[r1(10 + i * 26), 5], [r1(24 + i * 26), 5], [r1(17 + i * 26), 16]], WARNA_BENDERA[i % 5], W.coklat, { tebal: 0.8, z: -2 })),
];
export const idTokoLatar = (id: string): string[] => [id, `${id}-l`, `${id}-t`, ...Array.from({ length: 11 }, (_, i) => `${id}-b${i}`)];

/** Meja `${id}` (papan atas, kaki `${id}-a`, `${id}-b`); pojok kiri-atas (x, y), lebar w. */
export const meja = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 7, "#B45309", W.coklat, { rx: 2, tebal: 1.4, z: 1 }),
  kotak(`${id}-a`, r1(x + 6), y + 7, 5, 20, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: 0 }),
  kotak(`${id}-b`, r1(x + w - 11), y + 7, 5, 20, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: 0 }),
];
export const idMeja = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

export const WARNA_KADO = ["#EF4444", "#3B82F6", "#22C55E", "#FACC15", "#A855F7", "#F97316"];
/** Bingkisan `${id}` berukuran s dengan pita `${id}-p`; pojok kiri-atas (x, y). */
export const bingkisan = (id: string, x: number, y: number, s: number, warna: string, o: Opsi = {}): Obj[] => [
  kotak(id, x, y, s, s, warna, W.biru, { rx: 1.5, tebal: 0.9, z: 2, ...o }),
  garis(`${id}-p`, r1(x + s / 2), y, 0, s, W.putih, 1, { z: 3, ...(o.op === undefined ? {} : { op: o.op }) }),
];
export const idBingkisan = (id: string): string[] => [id, `${id}-p`];
/** Tumpukan `n` bingkisan `${id}0...` mulai bingkisan ke `dari`, tersusun `kolom` per baris dari (x0, y0). */
export const tumpukan = (id: string, x0: number, y0: number, kolom: number, n: number, s = 10, jarak = 12, dari = 0): Obj[] =>
  Array.from({ length: n }, (_, q) => {
    const i = dari + q;
    return bingkisan(`${id}${i}`, r1(x0 + (q % kolom) * jarak), r1(y0 + Math.floor(q / kolom) * jarak), s, WARNA_KADO[i % 6]);
  }).flat();
export const idTumpukan = (id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, q) => idBingkisan(`${id}${dari + q}`)).flat();

/** Warna bingkisan ke-n (tetap, menurut urutan). */
export const warnaKado = (n: number): string => WARNA_KADO[n % 6];

/** Keranjang anyaman `${id}` (bibir `${id}-b`); pojok kiri-atas (x, y). */
export const keranjang = (id: string, x: number, y: number, w = 34, h = 24): Obj[] => [
  kotak(id, x, y, w, h, W.kayu, W.coklat, { rx: 4, tebal: 1.6, z: 1 }),
  kotak(`${id}-b`, r1(x - 2), r1(y - 3), w + 4, 5, "#B45309", W.coklat, { rx: 2, tebal: 1.2, z: 3 }),
];
export const idKeranjang = (id: string): string[] => [id, `${id}-b`];
/** Isi keranjang: `n` bingkisan kecil `${id}0...` (tiga per baris) di dalam keranjang berpojok (x, y). */
export const isiKeranjang = (id: string, x: number, y: number, n: number, dari = 0): Obj[] =>
  Array.from({ length: n }, (_, q) => bingkisan(`${id}${q}`, r1(x + 5 + (q % 3) * 10.5), r1(y + 2 + Math.floor(q / 3) * 10.5), 8.5, WARNA_KADO[(dari + q) % 6], { z: 2 })).flat();
export const idIsi = (id: string, n: number): string[] => Array.from({ length: n }, (_, q) => idBingkisan(`${id}${q}`)).flat();

/** Spanduk `${id}` dan teksnya `${id}-t`. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10, warna: string = W.merahMuda): Obj[] => [
  kotak(id, x, y, w, 22, warna, W.merah, { rx: 3, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, r1(y + 11 + u * 0.35), isi, u, "#7F1D1D", { z: 2 }),
];

/** Lintasan konfeti kecil: deretan kotak warna-warni `${id}0...` pada tinggi y. */
export const konfeti = (id: string, y: number, n = 10): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(18 + i * 27), r1(y + (i % 3) * 7), 5, 7, [W.merah, W.emas, W.hijau, "#3B82F6"][i % 4], undefined, { rx: 1, rot: i * 23, z: 4 }));
export const idKonfeti = (id: string, n = 10): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Manik berwarna `${id}` berjari-jari r. */
const WARNA_MANIK = ["#EF4444", "#3B82F6", "#22C55E", "#FACC15", "#A855F7"];
export const manik = (id: string, cx: number, cy: number, i: number, r = 4): Obj => bulat(id, cx, cy, r, WARNA_MANIK[i % 5], W.biru, { tebal: 0.9, z: 2 });

/** Garis bilangan `${id}` dari 0 sampai maks: garis `${id}-g`, tanda dan angka pada kelipatan langkah (`${id}-t{v}`, `${id}-l{v}`). x(v) = x0 + v * satuan. */
export function garisBilangan(id: string, x0: number, y: number, satuan: number, maks: number, langkah: number, u = 8, tampil: number[] = []): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x0, y, satuan * maks, 0, W.biru, 2)];
  for (let n = 0; n <= maks; n += langkah) {
    out.push(garis(`${id}-t${n}`, x0 + n * satuan, y - 4, 0, 8, W.biru, 1.6));
    if (tampil.length === 0 || tampil.includes(n)) out.push(teks(`${id}-l${n}`, x0 + n * satuan, y + 15, String(n), u, W.biru));
  }
  return out;
}
/** Busur lompat mundur dari v ke v - langkah: id `${id}-a{v}` (v adalah nilai awal lompatan). */
export const busurMundur = (id: string, x0: number, y: number, satuan: number, v: number, langkah: number, warna: string = W.merah, tinggi = 20): Obj =>
  jalur(`${id}-a${v}`, r1(x0 + (v - langkah) * satuan), y, `M0 0 Q${r1((langkah * satuan) / 2)} ${-tinggi} ${r1(langkah * satuan)} 0`, "none", warna, { tebal: 1.8, gambar: true });

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Nenek Ijah" | "Kak Dewi" | "Bu Wati" | "Pak Dodi" | "Bu Tuti" | "Pak Anto" | "Bu Mirna";

const WAJAH: Record<NamaTokoh, string> = {
  Raka: E.raka,
  Salsa: E.salsa,
  Bima: E.bima,
  "Pak Joko": E.pria,
  "Nenek Ijah": E.nenek,
  "Kak Dewi": E.wanita,
  "Bu Wati": E.wanita,
  "Pak Dodi": E.pria,
  "Bu Tuti": E.wanita,
  "Pak Anto": E.pria,
  "Bu Mirna": E.wanita,
};

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-ks`; Salsa berkepang `${id}-k1`, `${id}-k2` dan berkertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-ks`; Pak Joko berapron biru `${id}-ap` dan berpensil `${id}-ps`; Nenek Ijah bertongkat `${id}-tg` dan berkeranjang `${id}-kr`;
 * Kak Dewi berjaket oranye `${id}-ks`; Bu Wati berapron ungu `${id}-ks`; Pak Dodi bertopi kuning `${id}-tp`; Bu Tuti berkerudung merah muda `${id}-kd`;
 * Pak Anto berkemeja kotak `${id}-ks`; Bu Mirna bercaping `${id}-cp`. `namaTeks` dan `uNama` mengatur tulisan nama.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30, namaTeks: string = nama, uNama = 8.4): Obj[] {
  const k = u / 30;
  const out: Obj[] = [emo(id, x, y, WAJAH[nama], u, { z: 1 })];
  const badan = (warna: string): Obj => kotak(`${id}-ks`, r1(x - 9 * k), r1(y + 3 * k), r1(18 * k), r1(9 * k), warna, W.biru, { rx: 2, tebal: 1, z: 1 });
  if (nama === "Raka") out.push(badan("#EF4444"));
  if (nama === "Bima") out.push(badan("#22C55E"));
  if (nama === "Kak Dewi") out.push(badan(W.oranye));
  if (nama === "Bu Wati") out.push(badan("#A855F7"));
  if (nama === "Pak Anto") out.push(badan("#B91C1C"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, r1(x - 13 * k), r1(y - 6 * k), r1(3 * k), "#7C2D12", undefined, { z: 0 }));
    out.push(bulat(`${id}-k2`, r1(x + 13 * k), r1(y - 6 * k), r1(3 * k), "#7C2D12", undefined, { z: 0 }));
    out.push(kotak(`${id}-kc`, r1(x + 10 * k), r1(y + 3 * k), r1(8 * k), r1(10 * k), W.putih, W.biru, { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(kotak(`${id}-ap`, r1(x - 9 * k), r1(y + 3 * k), r1(18 * k), r1(12 * k), "#2563EB", W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(kotak(`${id}-ps`, r1(x + 12 * k), r1(y - 18 * k), r1(2 * k), r1(8 * k), W.emas, W.coklat, { rx: 0.5, tebal: 0.6, z: 2 }));
  }
  if (nama === "Nenek Ijah") {
    out.push(garis(`${id}-tg`, r1(x + 17 * k), r1(y + 14 * k), 0, r1(-24 * k), W.coklat, 2, { z: 0 }));
    out.push(kotak(`${id}-kr`, r1(x - 21 * k), r1(y + 5 * k), r1(10 * k), r1(8 * k), W.kayu, W.coklat, { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Dodi") out.push(kotak(`${id}-tp`, r1(x - 8 * k), r1(y - 25 * k), r1(16 * k), r1(5 * k), W.emas, W.coklat, { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Bu Tuti") out.push(bulat(`${id}-kd`, x, r1(y - 9 * k), r1(14 * k), W.pink, W.biru, { tebal: 1, z: 0 }));
  if (nama === "Bu Mirna") out.push(poligon(`${id}-cp`, [[r1(x - 15 * k), r1(y - 20 * k)], [r1(x + 15 * k), r1(y - 20 * k)], [x, r1(y - 31 * k)]], W.emas, W.coklat, { tebal: 1, z: 2 }));
  out.push(teks(`${id}-n`, x, r1(y + 13 * k + (u >= 28 ? 0 : -1)), namaTeks, uNama, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(["Raka", "Bima", "Kak Dewi", "Bu Wati", "Pak Anto"].includes(nama) ? [`${id}-ks`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-ap`, `${id}-ps`] : []),
  ...(nama === "Nenek Ijah" ? [`${id}-tg`, `${id}-kr`] : []),
  ...(nama === "Pak Dodi" ? [`${id}-tp`] : []),
  ...(nama === "Bu Tuti" ? [`${id}-kd`] : []),
  ...(nama === "Bu Mirna" ? [`${id}-cp`] : []),
];
