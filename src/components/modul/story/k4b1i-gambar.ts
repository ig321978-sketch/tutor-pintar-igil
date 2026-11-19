import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (faktor dan kelipatan), akhir cerita Penginapan Pulau Karang Indah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: pantai berpasir dengan payung warna-warni (digambar sebanyak datanya, mis. dua puluh empat payung dalam baris sama banyak), tali lentera, garis jam jadwal perahu,
 * kartu bilangan, dan papan jadwal. Tokoh: Satria (kaus biru), Laras (berkepang satu, berkacamata, berkertas saku), Genta (berpeci), Pak Hendro (bertopi pantai, berpeluit, bertas kain),
 * Kak Yoga (pemandu pantai berpayung), Bu Maya (pengelola penginapan berkerudung krem). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  kak: "\u{1F9D1}",
  senyum: "\u{1F60A}",
  yakin: "\u{1F60E}",
  pikir: "\u{1F914}",
  capek: "\u{1F613}",
  lelah: "\u{1F62B}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  jempol: "\u{1F44D}",
  lupa: "\u{1F50D}",
  periksa: "\u{1F50E}",
  tangan: "\u{1F590}",
  payung: "\u{1F302}",
  lentera: "\u{1F3EE}",
  perahu: "\u{26F5}",
  balon: "\u{1F388}",
  konfeti: "\u{1F389}",
  bintang: "\u{2B50}",
  catat: "\u{1F4DD}",
  daftar: "\u{1F4CB}",
  teka: "\u{1F9E9}",
  petir: "\u{26A1}",
  kerang: "\u{1F41A}",
  pohon: "\u{1F334}",
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
  return { id, t: "jalur", x: x0, y: y0, d, warna, garis: garisW, tebal: 1.2, ...o };
};
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Pantai ------------------------------ */
export const WP = {
  pasir: "#FDE68A",
  pasirGaris: "#FCD34D",
  laut: "#BAE6FD",
  lautGaris: "#38BDF8",
  tali: "#92400E",
  papan: "#FEF3C7",
  jam: "#FFFBEB",
} as const;

/** Pasir `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function pasir(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WP.pasir, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WP.pasirGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WP.pasirGaris, 1.2, { z: -2 })];
}
export const idPasir = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Laut `${id}` dengan dua garis ombak `${id}-o1`, `${id}-o2`, dari y1 sampai y2. */
export function laut(id: string, y1 = 24, y2 = 66): Obj[] {
  return [kotak(id, 2, y1, 296, y2 - y1, WP.laut, undefined, { rx: 0, tebal: 0, z: -4 }), garis(`${id}-o1`, 20, y1 + 12, 70, 0, WP.lautGaris, 1.4, { z: -3 }), garis(`${id}-o2`, 170, y1 + 26, 90, 0, WP.lautGaris, 1.4, { z: -3 })];
}
export const idLaut = (id: string): string[] => [id, `${id}-o1`, `${id}-o2`];

export const WARNA_PAYUNG = ["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7", "#EC4899"];
const warnaPayung = (i: number): string => WARNA_PAYUNG[i % WARNA_PAYUNG.length];

/** Payung: kubah `${id}` dan tiang `${id}-t` (tiang dilewati bila `tiang` salah), titik tengah kubah bawah (cx, cy), skala s. */
export function payung(id: string, cx: number, cy: number, s = 1, warna: string = WARNA_PAYUNG[0], tiang = true): Obj[] {
  const kubah = poligon(
    id,
    [
      [bulatkan(cx - 9 * s), cy],
      [bulatkan(cx - 6 * s), bulatkan(cy - 5 * s)],
      [cx, bulatkan(cy - 8 * s)],
      [bulatkan(cx + 6 * s), bulatkan(cy - 5 * s)],
      [bulatkan(cx + 9 * s), cy],
    ],
    warna,
    "#7F1D1D",
    { tebal: Math.max(0.5, bulatkan(1 * s)), z: 2 },
  );
  return tiang ? [kubah, garis(`${id}-t`, cx, cy, 0, bulatkan(10 * s), "#78350F", Math.max(0.6, bulatkan(1.2 * s)), { z: 1 })] : [kubah];
}
export const idPayung = (id: string, tiang = true): string[] => (tiang ? [id, `${id}-t`] : [id]);

/**
 * Deret payung `kolom` x `baris`: payung baris r kolom c berid `${id}-r{r}c{c}` (kubah) dan `${id}-r{r}c{c}-t` (tiang). Pojok kiri-atas tengah kubah pertama (x, y).
 * Jumlah payung yang tergambar tepat `kolom * baris`.
 */
export function deretPayung(id: string, x: number, y: number, kolom: number, baris: number, dx: number, dy: number, s = 0.55, tiang = true): Obj[] {
  const out: Obj[] = [];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kolom; c += 1) out.push(...payung(`${id}-r${r}c${c}`, bulatkan(x + c * dx), bulatkan(y + r * dy), s, warnaPayung(r * kolom + c), tiang));
  return out;
}
export const idDeret = (id: string, kolom: number, baris: number, tiang = true): string[] => Array.from({ length: kolom * baris }, (_, i) => idPayung(`${id}-r${Math.floor(i / kolom)}c${i % kolom}`, tiang)).flat();
/** Id kubah payung saja dari objek-objek (tanpa tiang). */
export const kubahSaja = (objs: Obj[]): Obj[] => objs.filter((o) => o.t === "jalur");

/** Lentera: badan `${id}` (bulat), tali pendek `${id}-t`. Menyala (kuning) atau padam (abu). Pusat badan (x, y). */
export function lentera(id: string, x: number, y: number, nyala = true, s = 1): Obj[] {
  return [
    bulat(id, x, y, bulatkan(4.6 * s), nyala ? "#FDE047" : "#CBD5E1", nyala ? "#B45309" : "#64748B", { tebal: 1.2, z: 3 }),
    garis(`${id}-t`, x, bulatkan(y - 4.6 * s), 0, bulatkan(-5 * s), "#78350F", 1, { z: 2 }),
  ];
}

/** Papan jadwal `${id}` (kotak krem) dengan tulisan `${id}-t`. */
export function papanJadwal(id: string, x: number, y: number, w: number, h: number, isi: string, u = 9): Obj[] {
  return [kotak(id, x, y, w, h, WP.papan, W.coklat, { rx: 4, tebal: 1.6, z: 1 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, W.coklat, { z: 2 })];
}

/** Garis jam `${id}` dari 0 sampai 24 jam: batang `${id}-b`, sepuluh-dua puluh empat tanda `${id}-m{n}` pada kelipatan 4, mulai x0 selebar lebar. Mengembalikan fungsi posisi via `xJam`. */
export const xJam = (jam: number, x0 = 20, lebar = 260): number => bulatkan(x0 + (jam / 24) * lebar);
export function garisJam(id: string, y: number, x0 = 20, lebar = 260): Obj[] {
  const out: Obj[] = [garis(`${id}-b`, x0, y, lebar, 0, W.biru, 2, { z: 1 })];
  for (const j of [0, 4, 8, 12, 16, 20, 24]) out.push(garis(`${id}-m${j}`, xJam(j, x0, lebar), y - 4, 0, 8, W.biru, 1.6, { z: 1 }));
  return out;
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Kak Yoga" | "Bu Maya";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka1` `${id}-ka2`, berkepang satu `${id}-kp`, berkertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc` dan berkaus hijau `${id}-bj`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`, berkaus oranye `${id}-bj`;
 * Kak Yoga berkaus ungu `${id}-bj` dan berpayung `${id}-py` (kubah) `${id}-pt` (tiang); Bu Maya berkerudung krem `${id}-kd`, berbaju hijau `${id}-bj`, memegang papan `${id}-pp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Maya" ? E.bu : nama === "Kak Yoga" ? E.kak : E.pak;
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
  if (nama === "Kak Yoga") {
    out.push(baju("#7C3AED", "#4C1D95", 12));
    out.push(
      poligon(`${id}-py`, [[x + 6, bulatkan(y - u * 0.55)], [x + 12, bulatkan(y - u * 0.95)], [x + 22, bulatkan(y - u * 1.05)], [x + 30, bulatkan(y - u * 0.95)], [x + 36, bulatkan(y - u * 0.55)]], "#F59E0B", "#92400E", { tebal: 1, z: 2 }),
    );
    out.push(garis(`${id}-pt`, x + 21, bulatkan(y - u * 0.55), 0, bulatkan(u * 0.75), "#78350F", 1.2, { z: 1 }));
  }
  if (nama === "Bu Maya") {
    out.push(baju("#15803D", "#14532D", 12));
    out.push(kotak(`${id}-kd`, bulatkan(x - 12), bulatkan(y - u * 0.8), 24, 9, "#FDE68A", "#B45309", { rx: 4, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pp`, x + 12, bulatkan(y + 1), 10, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Satria" || nama === "Genta" || nama === "Laras" ? 15 : 18)), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Satria" ? [`${id}-bj`] : []),
  ...(nama === "Genta" ? [`${id}-bj`, `${id}-pc`] : []),
  ...(nama === "Laras" ? [`${id}-bj`, `${id}-ka1`, `${id}-ka2`, `${id}-kp`, `${id}-kc`] : []),
  ...(nama === "Pak Hendro" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`, `${id}-ts`] : []),
  ...(nama === "Kak Yoga" ? [`${id}-bj`, `${id}-py`, `${id}-pt`] : []),
  ...(nama === "Bu Maya" ? [`${id}-bj`, `${id}-kd`, `${id}-pp`] : []),
];
