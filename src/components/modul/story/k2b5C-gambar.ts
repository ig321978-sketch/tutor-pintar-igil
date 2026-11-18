import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh), akhir cerita Kebun Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa kebun: tanah dan rumput `${id}`, pagar bambu, petak tanah dengan patok, tali, labu (digambar dari bentuk, dibelah menjadi irisan
 * poligon), tumpukan jerami, spanduk, kertas dilipat, lingkaran di tanah, kupu-kupu dari potongan lingkaran, dinding pita bertingkat, papan catatan.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (caping digambar), Pak Joko (berkumis dan bersepatu bot digambar). Tanpa ZWJ.
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
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  labu: "#FB923C",
  labuGaris: "#9A3412",
};

/** Warna rupa kebun. */
export const WK = { rumput: "#D9F99D", rumputGaris: "#65A30D", tanah: "#C08457", tanahGaris: "#78350F", bambu: "#D9C26A", bambuGaris: "#854D0E", jerami: "#FDE047", jeramiGaris: "#A16207", tali: "#DC2626" } as const;
/** Empat warna regu. */
export const WR = ["#EF4444", "#3B82F6", "#22C55E", "#FACC15"] as const;

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  pak: "\u{1F468}",
  anak: "\u{1F9D2}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  jari: "\u{1F446}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  marah: "\u{1F4A2}",
  sorak: "\u{1F389}",
  melon: "\u{1F348}",
  kuas: "\u{1F58C}",
  gunting: "\u{2702}",
  geleng: "\u{1F625}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
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

/* ------------------------------ Kebun ------------------------------ */

/** Tanah berumput `${id}` mulai tinggi y sampai bawah kanvas. */
export const rumput = (id: string, y = 166): Obj => kotak(id, 2, y, 296, 198 - y, WK.rumput, WK.rumputGaris, { rx: 4, tebal: 1.2, z: -3 });

/** Pagar bambu: dua palang dan tiang-tiang `${id}0...`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function pagar(id: string, x: number, y: number, w: number, h = 22): Obj[] {
  const n = Math.max(2, Math.floor(w / 14));
  const out: Obj[] = [kotak(`${id}-a`, x, y + 5, w, 3, WK.bambuGaris, WK.bambuGaris, { rx: 1, tebal: 0.8, z: -2 }), kotak(`${id}-b`, x, y + h - 8, w, 3, WK.bambuGaris, WK.bambuGaris, { rx: 1, tebal: 0.8, z: -2 })];
  for (let i = 0; i < n; i += 1) out.push(kotak(`${id}${i}`, bulatkan(x + (i * (w - 5)) / (n - 1)), y, 5, h, WK.bambu, WK.bambuGaris, { rx: 2, tebal: 1.1, z: -2 }));
  return out;
}
export const idPagar = (id: string, w: number): string[] => [`${id}-a`, `${id}-b`, ...Array.from({ length: Math.max(2, Math.floor(w / 14)) }, (_, i) => `${id}${i}`)];

/** Petak tanah persegi `${id}` dengan empat patok `${id}-p0..3` di sudut. Pojok kiri-atas (x, y), sisi s. */
export const petak = (id: string, x: number, y: number, s: number): Obj[] => [
  kotak(id, x, y, s, s, WK.tanah, WK.tanahGaris, { rx: 2, tebal: 2, z: -1 }),
  ...[[x - 3, y - 3], [x + s - 3, y - 3], [x - 3, y + s - 3], [x + s - 3, y + s - 3]].map(([px, py], i) => kotak(`${id}-p${i}`, px, py, 6, 6, "#D6A15E", WK.tanahGaris, { rx: 1, tebal: 1, z: 1 })),
];
export const idPetak = (id: string): string[] => [id, ...[0, 1, 2, 3].map((i) => `${id}-p${i}`)];

/** Tali merah (garis) dari (x, y) ke (x2, y2). */
export const tali = (id: string, x: number, y: number, x2: number, y2: number, o: Opsi = {}): Obj => garis(id, x, y, x2, y2, WK.tali, 2.6, { z: 2, ...o });

/** Tumpukan jerami `${id}` berpusat di dasar (cx, ty): kubah poligon kuning dan dua garis jerami `${id}-g`, `${id}-h`. */
export const jerami = (id: string, cx: number, ty: number, w = 52): Obj[] => {
  const s = w / 2;
  return [
    { id, t: "jalur", x: cx, y: ty, d: `M${-s} 0 L${bulatkan(-s * 0.8)} -9 L${bulatkan(-s * 0.4)} -16 L0 -19 L${bulatkan(s * 0.4)} -16 L${bulatkan(s * 0.8)} -9 L${s} 0 Z`, warna: WK.jerami, garis: WK.jeramiGaris, tebal: 1.6, z: 1 },
    garis(`${id}-g`, cx - 10, ty - 4, 8, -7, WK.jeramiGaris, 1.2, { z: 2 }),
    garis(`${id}-h`, cx + 6, ty - 3, 9, -6, WK.jeramiGaris, 1.2, { z: 2 }),
  ];
};

/** Spanduk panen `${id}` dan teksnya `${id}-t`. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10, warna: string = W.merahMuda): Obj[] => [
  kotak(id, x, y, w, 22, warna, W.merah, { rx: 3, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, y + 22 / 2 + u * 0.35, isi, u, W.merah, { z: 2 }),
];

/** Papan catatan Dika: kertas krem berpenjepit di atas papan kayu `${id}`; jepit `${id}-j`. */
export const papanCatat = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 5, tebal: 3.4, z: -1 }),
  kotak(`${id}-j`, x + w / 2 - 12, y - 4, 24, 8, "#9CA3AF", "#4B5563", { rx: 2, tebal: 1.2, z: 0 }),
];
export const idPapan = (id: string): string[] => [id, `${id}-j`];

/* ------------------------------ Labu, lingkaran, dan irisan ------------------------------ */

/** Titik pada lingkaran (pusat 0, 0) bersudut `d` derajat (0 = kanan, searah jarum jam), dibulatkan. */
const titik = (r: number, d: number): [number, number] => [bulatkan(r * Math.cos((d * Math.PI) / 180)), bulatkan(r * Math.sin((d * Math.PI) / 180))];

/**
 * Irisan lingkaran berupa poligon tertutup (bukan lengkung), berpusat di (cx, cy), jari-jari r, dari sudut `dari` ke sudut `ke` (derajat, 0 = kanan,
 * searah jarum jam). Untuk lingkaran penuh pakai dari 0 ke 360. Bagian lain tidak dipakai untuk benda lain.
 */
export function irisan(id: string, cx: number, cy: number, r: number, dari: number, ke: number, warna: string, garisW: string = W.biru, o: Opsi = {}): Obj {
  const pts: string[] = ["0 0"];
  const langkah = 10;
  for (let d = dari; d < ke; d += langkah) pts.push(titik(r, d).join(" "));
  pts.push(titik(r, ke).join(" "));
  return { id, t: "jalur", x: cx, y: cy, d: `M${pts.join(" L")} Z`, warna, garis: garisW, tebal: 1.6, ...o };
}

/** Labu utuh berpusat di (cx, cy): badan `${id}`, dua tulang rusuk `${id}-a`, `${id}-b`, tangkai `${id}-t`. */
export const labu = (id: string, cx: number, cy: number, r: number, o: Opsi = {}): Obj[] => [
  bulat(id, cx, cy, r, W.labu, W.labuGaris, { tebal: 1.8, z: 1, ...o }),
  garis(`${id}-a`, bulatkan(cx - r * 0.42), bulatkan(cy - r * 0.8), 0, bulatkan(r * 1.6), "#EA580C", 1.2, { z: 2, ...(o.op === undefined ? {} : { op: o.op }) }),
  garis(`${id}-b`, bulatkan(cx + r * 0.42), bulatkan(cy - r * 0.8), 0, bulatkan(r * 1.6), "#EA580C", 1.2, { z: 2, ...(o.op === undefined ? {} : { op: o.op }) }),
  kotak(`${id}-t`, cx - 2.5, bulatkan(cy - r - 6), 5, 8, W.hijau, "#14532D", { rx: 1.5, tebal: 1, z: 2 }),
];
export const idLabu = (id: string): string[] => [id, `${id}-a`, `${id}-b`, `${id}-t`];

/** Irisan labu berwarna oranye: seperti irisan(), tetapi dengan warna labu. */
export const irisLabu = (id: string, cx: number, cy: number, r: number, dari: number, ke: number, o: Opsi = {}): Obj => irisan(id, cx, cy, r, dari, ke, W.labu, W.labuGaris, { z: 1, ...o });

/** Kotak pecahan kecil berwarna untuk label (mis. "seperempat") di tengah (cx, cy). */
export const label = (id: string, cx: number, cy: number, isi: string, u = 7.4, warna: string = W.putih, o: Opsi = {}): Obj[] => {
  const w = bulatkan(isi.length * u * 0.58 + 8);
  return [kotak(`${id}-k`, bulatkan(cx - w / 2), bulatkan(cy - u * 0.9), w, bulatkan(u * 1.5), warna, W.ungu, { rx: 3, tebal: 1, z: 4, ...o }), teks(`${id}-t`, cx, bulatkan(cy + u * 0.28), isi, u, W.ungu, { z: 5, ...o })];
};
export const idLabel = (id: string): string[] => [`${id}-k`, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Joko";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bercaping `${id}-cp`;
 * Pak Joko berkumis `${id}-km` dan bersepatu bot `${id}-b1`, `${id}-b2`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Bu Sari" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") out.push({ id: `${id}-cp`, t: "jalur", x, y: bulatkan(y - u * 0.62), d: "M-17 6 L0 -9 L17 6 Z", warna: "#FDE68A", garis: "#A16207", tebal: 1.4, z: 2 });
  if (nama === "Pak Joko") {
    out.push(kotak(`${id}-km`, x - 7, bulatkan(y - u * 0.2), 14, 3, "#451A03", "#451A03", { rx: 1.5, tebal: 0.6, z: 2 }));
    out.push(kotak(`${id}-b1`, x - 14, y + 3, 8, 7, "#78350F", "#451A03", { rx: 2, tebal: 1, z: 2 }), kotak(`${id}-b2`, x + 6, y + 3, 8, 7, "#78350F", "#451A03", { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" ? 20 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-cp`] : []),
  ...(nama === "Pak Joko" ? [`${id}-km`, `${id}-b1`, `${id}-b2`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => tokoh(id, x, y, nama, u).map((o) => ({ id: o.id, x: o.x, y: o.y }));

/** Satu regu: anak `${id}` berbaju warna regu `${id}-b`. Pusat wajah (x, y). */
export const regu = (id: string, x: number, y: number, warna: string): Obj[] => [emo(id, x, y, E.anak, 22, { z: 1 }), kotak(`${id}-b`, x - 9, y + 2, 18, 9, warna, W.biru, { rx: 3, tebal: 1.2, z: 1 })];
export const idRegu = (id: string): string[] => [id, `${id}-b`];

/* ------------------------------ Kertas ------------------------------ */

/** Kertas persegi `${id}` (pojok kiri-atas (x, y), sisi s). */
export const kertas = (id: string, x: number, y: number, s: number, warna: string = W.putih, o: Opsi = {}): Obj => kotak(id, x, y, s, s, warna, W.biru, { rx: 1, tebal: 1.6, z: 0, ...o });

/** Poligon tertutup dari titik-titik absolut (di kanvas). */
export const poligon = (id: string, pts: [number, number][], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: pts[0][0],
  y: pts[0][1],
  d: `M0 0 ${pts.slice(1).map(([a, b]) => `L${bulatkan(a - pts[0][0])} ${bulatkan(b - pts[0][1])}`).join(" ")} Z`,
  warna,
  garis: garisW,
  tebal: 1.6,
  ...o,
});
