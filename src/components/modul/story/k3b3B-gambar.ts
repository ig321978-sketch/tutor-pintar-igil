import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa bengkel kandang: tanah dan papan kayu, kandang burung beo setengah jadi beratap, gergaji dan palu, tiang kayu, meteran kuning bertanda,
 * pita kuning, tali, gunting, kolam kura-kura dangkal, tabel perbandingan dua baris, garis bilangan sentimeter, dan kartu perbandingan.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (berkaus biru, bertopi anyaman, berkumis, berpensil di telinga),
 * Pak Wayan (tukang kandang: topi bambu lancip, rompi cokelat, meteran gulung dan pita kuning di pinggang), Bu Lastri (juru pakan: celemek hijau). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  kuning: "#FACC15",
  kuningTua: "#A16207",
  /** Warna pita: meter biru, sentimeter oranye, hasil hijau. */
  meter: "#2563EB",
  senti: "#EA580C",
  hasil: "#16A34A",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  pikir: "\u{1F914}",
  kaget: "\u{1F632}",
  gerutu: "\u{1F624}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  seru: "\u{2757}",
  catat: "\u{1F4DD}",
  beo: "\u{1F99C}",
  kura: "\u{1F422}",
  kelinci: "\u{1F407}",
  gunting: "\u{2702}",
  percik: "\u{1F4A6}",
  karung: "\u{1F6CD}",
  ukur: "\u{1F4CF}",
  pensil: "\u{270F}",
  sorak: "\u{1F389}",
  jempol: "\u{1F44D}",
  palu: "\u{1F528}",
  mikir: "\u{1F4AD}",
  bintang: "\u{2B50}",
  kuning: "\u{1F4A1}",
  cepat: "\u{23E9}",
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
/** Busur lompatan dari (x1, y) ke (x2, y) setinggi h (lintasan lengkung, tergambar bertahap). */
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
  gambar: true,
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

/* ------------------------------ Bengkel kandang ------------------------------ */
export const WH = {
  tanah: "#FDE68A",
  tanahGaris: "#FBBF24",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  kayuMuda: "#E7C08A",
  atap: "#7F1D1D",
  hijauKolam: "#7DD3FC",
  kolamTua: "#0369A1",
  pitaKuning: "#FACC15",
  pitaGaris: "#A16207",
  logam: "#94A3B8",
  logamTua: "#475569",
  rotan: "#D97706",
} as const;

/** Tanah bengkel `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WH.tanah, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WH.tanahGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WH.tanahGaris, 1.4, { z: -2 })];
}
export const idTanah = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Papan kayu panjang `${id}` bergaris serat `${id}-s`. Pojok kiri-atas (x, y). */
export function papan(id: string, x: number, y: number, w: number, h = 12): Obj[] {
  return [kotak(id, x, y, w, h, WH.kayuMuda, WH.kayuTua, { rx: 1, tebal: 1.4, z: 0 }), garis(`${id}-s`, x + 4, bulatkan(y + h / 2), w - 8, 0, WH.kayu, 1, { z: 1 })];
}
export const idPapan = (id: string): string[] => [id, `${id}-s`];

/** Tiang kayu tegak `${id}`, tinggi h, lebar 12. Pojok kiri-atas (x, y). */
export const tiang = (id: string, x: number, y: number, h: number, w = 12): Obj => kotak(id, x, y, w, h, WH.kayu, WH.kayuTua, { rx: 1, tebal: 1.6, z: 0 });

/** Kandang burung beo setengah jadi: lantai `${id}`, dua tiang `${id}-l` `${id}-r`, atap `${id}-a`, tiga jeruji `${id}-j0..2`. Pojok kiri-atas lantai... (x, y) = pojok kiri-atas badan. */
export function kandangBeo(id: string, x: number, y: number, w = 56, h = 44): Obj[] {
  return [
    kotak(`${id}-l`, x, y, 5, h, WH.kayu, WH.kayuTua, { rx: 0, tebal: 1.2, z: 0 }),
    kotak(`${id}-r`, bulatkan(x + w - 5), y, 5, h, WH.kayu, WH.kayuTua, { rx: 0, tebal: 1.2, z: 0 }),
    kotak(id, x, bulatkan(y + h - 5), w, 5, WH.kayu, WH.kayuTua, { rx: 0, tebal: 1.2, z: 1 }),
    poligon(`${id}-a`, [[x - 6, y], [bulatkan(x + w / 2), y - 16], [x + w + 6, y]], WH.atap, "#450A0A", { z: 1, tebal: 1.5 }),
    ...[0, 1, 2].map((i) => garis(`${id}-j${i}`, bulatkan(x + 16 + i * 12), y + 2, 0, h - 8, WH.kayuTua, 1.4, { z: 0 })),
  ];
}
export const idKandangBeo = (id: string): string[] => [`${id}-l`, `${id}-r`, id, `${id}-a`, `${id}-j0`, `${id}-j1`, `${id}-j2`];

/** Gergaji: bilah `${id}` dan gagang `${id}-g`. Pojok kiri-atas (x, y). */
export function gergaji(id: string, x: number, y: number, w = 34): Obj[] {
  return [kotak(id, x, y, w, 9, WH.logam, WH.logamTua, { rx: 1, tebal: 1.2, z: 1 }), kotak(`${id}-g`, bulatkan(x + w), bulatkan(y - 2), 11, 13, WH.kayu, WH.kayuTua, { rx: 3, tebal: 1.2, z: 1 })];
}
export const idGergaji = (id: string): string[] => [id, `${id}-g`];

/**
 * Meteran kuning terbentang: badan `${id}-b` dari x0 selebar `lebar`, tinggi 11. Tanda dan angka ditambah terpisah dengan `tandaMeteran`.
 */
export const meteran = (id: string, x0: number, y: number, lebar: number): Obj => kotak(`${id}-b`, x0, y, lebar, 11, WH.pitaKuning, WH.pitaGaris, { rx: 1, tebal: 1.4, z: 0 });
/** Tanda `${id}-t{n}` pada meteran dan angka `${id}-l{n}` di bawahnya (bila `angka`) untuk bilangan sentimeter n; x(n) = x0 + n * skala. */
export function tandaMeteran(id: string, x0: number, y: number, skala: number, n: number, angka = true, u = 8): Obj[] {
  const x = bulatkan(x0 + n * skala);
  const out: Obj[] = [garis(`${id}-t${n}`, x, y, 0, 11, WH.pitaGaris, 1.6, { z: 1 })];
  if (angka) out.push(teks(`${id}-l${n}`, x, y + 22, String(n), u, W.biru));
  return out;
}
export const xMeteran = (x0: number, skala: number, n: number): number => bulatkan(x0 + n * skala);

/** Pita kuning bergulung: gulungan `${id}` (lingkaran) dan lidah pita `${id}-p`. Pusat gulungan (x, y). */
export function gulungan(id: string, x: number, y: number, r = 7): Obj[] {
  return [bulat(id, x, y, r, WH.pitaKuning, WH.pitaGaris, { tebal: 1.6, z: 2 }), bulat(`${id}-c`, x, y, bulatkan(r / 3), WH.pitaGaris, WH.pitaGaris, { tebal: 0.8, z: 3 }), kotak(`${id}-p`, bulatkan(x + r - 1), bulatkan(y + r - 3), 12, 4, WH.pitaKuning, WH.pitaGaris, { rx: 1, tebal: 1, z: 2 })];
}
export const idGulungan = (id: string): string[] => [id, `${id}-c`, `${id}-p`];

/** Kolam kura-kura dangkal: air `${id}` dan tepi `${id}-t`. Pojok kiri-atas (x, y). */
export function kolam(id: string, x: number, y: number, w = 90, h = 30): Obj[] {
  return [kotak(id, x, y, w, h, WH.hijauKolam, WH.kolamTua, { rx: 14, tebal: 2, z: -1 }), kotak(`${id}-t`, bulatkan(x + 6), bulatkan(y + 5), w - 12, h - 10, undefined, "#E0F2FE", { rx: 10, tebal: 1, z: -1, putus: true })];
}
export const idKolam = (id: string): string[] => [id, `${id}-t`];

/** Sikat bergagang: gagang `${id}` dan bulu `${id}-b`. Pojok kiri-atas (x, y). */
export function sikat(id: string, x: number, y: number): Obj[] {
  return [kotak(id, x, y, 4, 22, WH.kayu, WH.kayuTua, { rx: 1, tebal: 1, z: 2 }), kotak(`${id}-b`, bulatkan(x - 4), bulatkan(y + 20), 12, 6, W.kuning, WH.pitaGaris, { rx: 2, tebal: 1, z: 2 })];
}
export const idSikat = (id: string): string[] => [id, `${id}-b`];

/** Kertas catatan putih: `${id}`. Pojok kiri-atas (x, y). */
export const kertas = (id: string, x: number, y: number, w: number, h: number, warna: string = W.putih): Obj => kotak(id, x, y, w, h, warna, "#94A3B8", { rx: 2, tebal: 1, z: 0 });

/** Karung pakan: badan `${id}` dan tali pengikat `${id}-t`. Pojok kiri-atas (x, y). */
export function karung(id: string, x: number, y: number, w = 26, h = 30): Obj[] {
  return [kotak(id, x, y, w, h, "#D6B98C", "#7C5A2B", { rx: 6, tebal: 1.5, z: 1 }), kotak(`${id}-t`, bulatkan(x + 4), bulatkan(y + 3), w - 8, 4, "#A9814A", "#7C5A2B", { rx: 1, tebal: 1, z: 2 })];
}
export const idKarung = (id: string): string[] => [id, `${id}-t`];

/** Tabel dua baris (meter dan sentimeter) dengan `n` kolom: kotak baris `${id}-r0`, `${id}-r1`, sekat `${id}-v{i}`. Pojok kiri-atas (x, y), tiap kolom selebar kol. */
export function tabel2(id: string, x: number, y: number, n: number, kol = 44, tinggi = 26, labelLebar = 50): Obj[] {
  const lebar = labelLebar + n * kol;
  return [
    kotak(`${id}-r0`, x, y, lebar, tinggi, "#DBEAFE", W.biru, { rx: 2, tebal: 1.4, z: 0 }),
    kotak(`${id}-r1`, x, y + tinggi, lebar, tinggi, "#FFEDD5", W.biru, { rx: 2, tebal: 1.4, z: 0 }),
    ...Array.from({ length: n }, (_, i) => garis(`${id}-v${i}`, x + labelLebar + i * kol, y, 0, tinggi * 2, W.biru, 1.2, { z: 1 })),
  ];
}
export const idTabel2 = (id: string, n: number): string[] => [`${id}-r0`, `${id}-r1`, ...Array.from({ length: n }, (_, i) => `${id}-v${i}`)];

/** Garis bilangan sentimeter `${id}-g` dari x0 selebar lebar. */
export const garisBil = (id: string, x0: number, y: number, lebar: number): Obj => garis(`${id}-g`, x0, y, lebar, 0, W.biru, 2);
export function tandaBil(id: string, x: number, y: number, label?: string, u = 8): Obj[] {
  const out: Obj[] = [garis(`${id}-t`, x, y - 4, 0, 8, W.biru, 1.6)];
  if (label !== undefined) out.push(teks(`${id}-l`, x, y + 15, label, u, W.biru));
  return out;
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Pak Wayan" | "Bu Lastri";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`;
 * Pak Wayan berompi cokelat `${id}-bj`, bertopi bambu lancip `${id}-tp`, bermeteran gulung `${id}-mt`, berpita kuning `${id}-pk`;
 * Bu Lastri berceleme hijau `${id}-bj` dan bertopi hijau `${id}-tp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.ungu): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Bu Lastri" ? E.bu : E.pak;
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
    out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.98), 18, 6, "#D97706", "#92400E", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.6), 0, 8, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Pak Wayan") {
    out.push(baju("#92400E", "#451A03", 12));
    out.push(poligon(`${id}-tp`, [[bulatkan(x - 14), bulatkan(y - u * 0.78)], [x, bulatkan(y - u * 1.3)], [bulatkan(x + 14), bulatkan(y - u * 0.78)]], "#FDE68A", "#A16207", { z: 2, tebal: 1.2 }));
    out.push(bulat(`${id}-mt`, bulatkan(x - 8), bulatkan(y + 9), 4, WH.pitaKuning, WH.pitaGaris, { tebal: 1.2, z: 2 }));
    out.push(kotak(`${id}-pk`, bulatkan(x + 2), bulatkan(y + 5), 8, 10, WH.pitaKuning, WH.pitaGaris, { rx: 1, tebal: 1, z: 2 }));
  }
  if (nama === "Bu Lastri") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.98), 18, 6, "#15803D", "#14532D", { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Wayan" ? 20 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Pak Wayan" ? [`${id}-bj`, `${id}-tp`, `${id}-mt`, `${id}-pk`] : []),
  ...(nama === "Bu Lastri" ? [`${id}-bj`, `${id}-tp`] : []),
];
