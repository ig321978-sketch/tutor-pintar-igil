import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola), akhir cerita Pameran Kerajinan Sekolah.
 * Rupa pameran: lantai aula, stan beratap kain belang, meja stan, kotak manik, untaian manik, pita kotak-kotak, lembar hiasan,
 * lengkung penanda ulang, kurung satuan, anak membungkuk, tangan bertepuk, serta tokoh Chacha, Dika, Nia, Bu Sari, dan Bu Mira.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FDE68A",
};

/** Warna manik dan kotak pola. */
export const M = {
  merah: "#EF4444",
  biru: "#3B82F6",
  jingga: "#F97316",
  hijau: "#22C55E",
  kuning: "#FACC15",
  ungu: "#A855F7",
  putih: "#F8FAFC",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

const r1 = (n: number): number => Math.round(n * 10) / 10;
const f = (n: number): string => n.toFixed(1);

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y): id `${id}-k` dan `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu huruf atau kata besar: id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Lintasan terbuka tanpa isi (lengkung, kurung): garis berwarna `warna`. Titik relatif terhadap (x, y). */
export const jalurGaris = (id: string, x: number, y: number, d: string, warna: string = W.merah, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna: "none", garis: warna, tebal, ...o });

/** Lengkung penanda ulang di atas deretan selebar `w`, mulai (x, y). */
export const lengkung = (id: string, x: number, y: number, w: number, warna: string = W.merah, o: Opsi = {}): Obj => jalurGaris(id, x, y, `M0 0 Q ${f(w / 2)} -12 ${f(w)} 0`, warna, 2.2, o);

/** Kurung satuan di bawah deretan selebar `w`, mulai (x, y). */
export const dKurung = (w: number): string => `M0 0 L0 7 L${f(w)} 7 L${f(w)} 0`;
export const kurung = (id: string, x: number, y: number, w: number, warna: string = W.merah, o: Opsi = {}): Obj => jalurGaris(id, x, y, dKurung(w), warna, 2.6, o);

/** Bintang lima sudut berpusat (cx, cy). */
export function bintang(id: string, cx: number, cy: number, r: number, warna: string, o: Opsi = {}): Obj {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = ((-90 + 36 * i) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${f(cx + rr * Math.cos(a))} ${f(cy + rr * Math.sin(a))}`;
  });
  return { id, t: "jalur", x: 0, y: 0, d: `M${pts.join(" L")} Z`, warna, garis: W.biru, tebal: 1.4, ...o };
}

/** Segitiga sama kaki berpusat (cx, cy), sisi `s`. */
export function segitiga(id: string, cx: number, cy: number, s: number, warna: string, o: Opsi = {}): Obj {
  const t = (s * 0.866) / 2;
  return { id, t: "jalur", x: 0, y: 0, d: `M${f(cx)} ${f(cy - t)} L${f(cx + s / 2)} ${f(cy + t)} L${f(cx - s / 2)} ${f(cy + t)} Z`, warna, garis: W.biru, tebal: 1.4, ...o };
}

/** Gelombang bunyi: `n` busur di kanan (x, y), makin besar; id `${id}{i}`. */
export function gelombang(id: string, x: number, y: number, n: number, s: number, warna: string = W.merah): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const q = s * (1 + i * 0.55);
    return jalurGaris(`${id}${i}`, r1(x + i * 7), y, `M0 ${f(-q)} Q ${f(q * 0.9)} 0 0 ${f(q)}`, warna, 2);
  });
}
export const idGelombang = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ Rupa pameran ------------------------------ */

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  tepuk: "\u{1F44F}",
  pikir: "\u{1F914}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  kaget: "\u{1F632}",
  cemas: "\u{1F61F}",
  tanya: "\u{2753}",
  lampu: "\u{1F4A1}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  gunting: "\u{2702}",
  kaca: "\u{1F50D}",
  daftar: "\u{1F4CB}",
  kalender: "\u{1F4C5}",
  bintangPutar: "\u{1F4AB}",
  tabrak: "\u{1F4A5}",
  kilau: "\u{2728}",
  pesta: "\u{1F389}",
  daun: "\u{1F343}",
  bunga: "\u{1F33C}",
  hati: "\u{2764}\u{FE0F}",
  telinga: "\u{1F442}",
  nada: "\u{1F3B5}",
  lagu: "\u{1F3B6}",
  guci: "\u{1F3FA}",
  topeng: "\u{1F3AD}",
  lampion: "\u{1F3EE}",
  pensil: "\u{270F}\u{FE0F}",
  pikiran: "\u{1F4AD}",
  ulang: "\u{1F501}",
  orang: "\u{1F465}",
  gulungan: "\u{1F4DC}",
} as const;

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Bu Mira";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berselempang hijau `${id}-sl` bertulis PANITIA `${id}-pn`;
 * Bu Mira bersanggul `${id}-sg` dan berkalung manik `${id}-m0..3`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : E.bu;
  const out: Obj[] = [];
  if (nama === "Bu Mira") out.push(bulat(`${id}-sg`, x, r1(y - u * 0.88), 5, "#4B2E1E", "#2B1810", { z: 0, tebal: 1 }));
  out.push(emo(id, x, y, wajah, u, { z: 1 }));
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, r1(y - u * 0.5), E.topi, r1(u * 0.55), { z: 2 }));
  if (nama === "Bu Mira") {
    const wr = [M.merah, M.biru, M.kuning, M.hijau];
    wr.forEach((c, i) => out.push(bulat(`${id}-m${i}`, r1(x - 9 + i * 6), r1(y + 4 + (i === 0 || i === 3 ? 0 : 2)), 2.6, c, W.biru, { z: 2, tebal: 0.8 })));
  }
  out.push(teks(`${id}-n`, x, r1(y + 13), nama, 8.4, W.ungu, { z: 2 }));
  if (nama === "Bu Sari") {
    out.push(kotak(`${id}-sl`, r1(x - 14), r1(y + 16), 28, 8, "#16A34A", "#166534", { rx: 2, tebal: 1, z: 2 }));
    out.push(teks(`${id}-pn`, x, r1(y + 22.3), "PANITIA", 5, "#FFFFFF", { z: 3 }));
  }
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-sl`, `${id}-pn`] : []),
  ...(nama === "Bu Mira" ? [`${id}-sg`, `${id}-m0`, `${id}-m1`, `${id}-m2`, `${id}-m3`] : []),
];

/** Lantai aula `${id}` dari tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, "#E9D5B0", "#B08D57", { rx: 4, tebal: 1.2, z: -3 });

/**
 * Stan beratap kain belang: atap `${id}0..5`, tiang `${id}-a` dan `${id}-b`, meja `${id}-m`. Pojok kiri-atas atap (x, y); lantai di y + 120.
 */
export function stan(id: string, x: number, y: number, w: number): Obj[] {
  const n = 6;
  const lebar = w / n;
  return [
    ...Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(x + lebar * i), y, r1(lebar), 12, i % 2 === 0 ? "#F87171" : "#FFFFFF", "#B91C1C", { rx: 1, tebal: 1, z: 1 })),
    kotak(`${id}-a`, r1(x + 3), y + 12, 4, 108, "#D6A15E", "#92400E", { rx: 1, tebal: 1, z: -1 }),
    kotak(`${id}-b`, r1(x + w - 7), y + 12, 4, 108, "#D6A15E", "#92400E", { rx: 1, tebal: 1, z: -1 }),
    kotak(`${id}-m`, r1(x + 6), y + 66, r1(w - 12), 10, "#D6A15E", "#92400E", { rx: 2, tebal: 1.2, z: 0 }),
  ];
}
export const idStan = (id: string): string[] => [...Array.from({ length: 6 }, (_, i) => `${id}${i}`), `${id}-a`, `${id}-b`, `${id}-m`];

/** Manik berwarna. */
export const manik = (id: string, x: number, y: number, r: number, warna: string, o: Opsi = {}): Obj => bulat(id, x, y, r, warna, W.biru, { tebal: 1, z: 3, ...o });

/** Kotak manik: badan `${id}` dan tutup `${id}-t`. Pojok kiri-atas (x, y). */
export function kotakManik(id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj[] {
  return [kotak(id, x, y, w, h, "#B45309", "#78350F", { rx: 3, tebal: 1.6, z: 1, ...o }), kotak(`${id}-t`, x - 2, y - 4, w + 4, 6, "#92400E", "#78350F", { rx: 2, tebal: 1.2, z: 2, ...o })];
};

/** Deretan manik pada benang: benang `${id}-b`, manik `${id}${i}` berpusat (x0 + jarak * i, y). */
export function rantai(id: string, x0: number, y: number, warna: string[], r = 11, jarak = 29): Obj[] {
  return [
    garis(`${id}-b`, r1(x0 - r - 4), y, r1(jarak * (warna.length - 1) + 2 * r + 8), 0, "#7C3AED", 1.6, { z: 0 }),
    ...warna.map((c, i) => manik(`${id}${i}`, r1(x0 + jarak * i), y, r, c)),
  ];
}
export const idRantai = (id: string, n: number): string[] => [`${id}-b`, ...Array.from({ length: n }, (_, i) => `${id}${i}`)];

/** Satu kotak pola (kotak warna) berpusat (cx, cy) sisi `s`. */
export const sel = (id: string, cx: number, cy: number, s: number, warna: string, o: Opsi = {}): Obj => kotak(id, r1(cx - s / 2), r1(cy - s / 2), s, s, warna, W.biru, { rx: 3, tebal: 1.4, z: 2, ...o });
/** Kotak kosong putus-putus. */
export const selKosong = (id: string, cx: number, cy: number, s: number, o: Opsi = {}): Obj => sel(id, cx, cy, s, "#F1F5F9", { garis: "#64748B", putus: true, ...o });

/** Anak bergerak (bentuk sederhana): kaki `${id}-l` `${id}-r`, badan `${id}-b`, kepala `${id}-h`. Pinggul di (x, y). */
export function anak(id: string, x: number, y: number, warna: string, bungkuk = false): Obj[] {
  return [
    garis(`${id}-l`, x, y, -4, 16, "#334155", 3, { z: 1 }),
    garis(`${id}-r`, x, y, 4, 16, "#334155", 3, { z: 1 }),
    garis(`${id}-b`, x, y, bungkuk ? 13 : 0, bungkuk ? -12 : -18, warna, 7, { z: 2 }),
    bulat(`${id}-h`, bungkuk ? x + 18 : x, bungkuk ? y - 17 : y - 26, 7, "#FCD9B6", W.biru, { z: 3, tebal: 1.2 }),
  ];
}
export const idAnak = (id: string): string[] => [`${id}-l`, `${id}-r`, `${id}-b`, `${id}-h`];
/** Ubah badan dan kepala anak ke bungkuk atau tegak. */
export const ubahAnak = (id: string, x: number, y: number, bungkuk: boolean): (Partial<Obj> & { id: string })[] => [
  { id: `${id}-b`, x2: bungkuk ? 13 : 0, y2: bungkuk ? -12 : -18 },
  { id: `${id}-h`, x: bungkuk ? x + 18 : x, y: bungkuk ? y - 17 : y - 26 },
];

export { r1 as bulatkan };
