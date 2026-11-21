import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan" (pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: lapangan Kampung Senandung bertanah krem dengan panggung kayu, spanduk, tali lampu, baris kursi (digambar sebanyak datanya: satu kotak satu kursi),
 * lingkaran bilangan dengan busur loncatan, dan kartu bilangan. Tokoh: Satria (kaus biru), Laras (berkepang satu, berkacamata, berkertas saku), Genta (berpeci),
 * Pak Hendro (bertopi pantai, berpeluit, bertas kain), Bu Ratri (pelatih angklung berselendang hijau, memegang tongkat dirigen), Pak Gunawan (penata panggung berompi oranye,
 * membawa meteran dan palu). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  capek: "\u{1F613}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  jempol: "\u{1F44D}",
  tepuk: "\u{1F44F}",
  tawa: "\u{1F602}",
  mata: "\u{1F440}",
  lampu: "\u{1F4A1}",
  balon: "\u{1F388}",
  konfeti: "\u{1F389}",
  catat: "\u{1F4DD}",
  angklung: "\u{1F3B6}",
  petir: "\u{26A1}",
  rantai: "\u{1F517}",
  mesin: "\u{1F527}",
  tabel: "\u{1F4CB}",
  palu: "\u{1F528}",
  naik: "\u{1F4C8}",
  turun: "\u{1F4C9}",
  jam: "\u{1F552}",
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

/* ------------------------------ Lapangan konser ------------------------------ */
export const WL = {
  tanah: "#FDE68A",
  tanahGaris: "#F59E0B",
  kayu: "#B45309",
  kayuMuda: "#E8B26A",
  tali: "#78350F",
  kursi: "#F59E0B",
  kursiGaris: "#92400E",
} as const;

/** Tanah lapangan `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lapangan(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WL.tanah, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WL.tanahGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WL.tanahGaris, 1.2, { z: -2 })];
}
export const idLapangan = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Panggung kayu: lantai `${id}` (kotak), tiga kaki `${id}-k1` `${id}-k2` `${id}-k3` sampai tanah, dan tulisan `${id}-t` pada lantai. */
export function panggung(id: string, x: number, y: number, w: number, isi: string, tanah = 150): Obj[] {
  return [
    garis(`${id}-k1`, bulatkan(x + 8), y + 12, 0, tanah - y - 12, WL.tali, 3, { z: 0 }),
    garis(`${id}-k2`, bulatkan(x + w / 2), y + 12, 0, tanah - y - 12, WL.tali, 3, { z: 0 }),
    garis(`${id}-k3`, bulatkan(x + w - 8), y + 12, 0, tanah - y - 12, WL.tali, 3, { z: 0 }),
    kotak(id, x, y, w, 12, WL.kayuMuda, WL.kayu, { rx: 2, tebal: 1.6, z: 1 }),
    teks(`${id}-t`, bulatkan(x + w / 2), y + 9, isi, 8, WL.tali, { z: 2 }),
  ];
}
export const idPanggung = (id: string): string[] => [id, `${id}-t`, `${id}-k1`, `${id}-k2`, `${id}-k3`];

/** Dua tiang spanduk `${id}-p1` dan `${id}-p2` dari tinggi y sampai tanah. */
export function tiang(id: string, x: number, y: number, w: number, tanah = 150): Obj[] {
  return [garis(`${id}-p1`, x + 3, y, 0, tanah - y, WL.tali, 3, { z: 0 }), garis(`${id}-p2`, x + w - 3, y, 0, tanah - y, WL.tali, 3, { z: 0 })];
}
/** Kain spanduk `${id}` (kotak merah muda) dan tulisannya `${id}-t`. */
export function kain(id: string, x: number, y: number, w: number, h: number, isi: string, u = 9): Obj[] {
  return [kotak(id, x, y, w, h, "#FEE2E2", W.merah, { rx: 3, tebal: 2, z: 1 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, W.merah, { z: 2 })];
}
export const idKain = (id: string): string[] => [id, `${id}-t`];
export const idTiang = (id: string): string[] => [`${id}-p1`, `${id}-p2`];

/** Satu baris kursi: `n` kotak kecil (satu kotak satu kursi), kotak ke-i berid `${id}-${i}`; pojok kiri-atas baris (x, y), jarak antarkursi `jarak`. Banyak kursi yang tergambar selalu `n`. */
export function barisKursi(id: string, x: number, y: number, n: number, jarak = 9, sisi = 7): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}-${i}`, bulatkan(x + i * jarak), y, sisi, sisi, WL.kursi, WL.kursiGaris, { rx: 1.5, tebal: 0.9, z: 1 }));
}
export const idBaris = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-${i}`);

/** Lingkaran bilangan: bulat `${id}` dan teks `${id}-t` berisi bilangan (atau "?"), pusat (x, y). `putus` menggambar tepi putus-putus (bilangan yang belum diketahui). */
export function bil(id: string, x: number, y: number, isi: string, u = 12, r = 14, putus = false, warna = W.putih): Obj[] {
  return [bulat(id, x, y, r, warna, W.biru, { tebal: 2, putus, z: 2 }), teks(`${id}-t`, x, bulatkan(y + u * 0.35), isi, u, W.biru, { z: 3 })];
}
export const idBil = (id: string): string[] => [id, `${id}-t`];

/** Busur loncatan `${id}` dari (x1, y) ke (x2, y) melengkung ke atas setinggi `h`; label `${id}-l` di atas puncak busur (bila `isi` diberikan). */
export function busur(id: string, x1: number, x2: number, y: number, h = 22, isi?: string, warna: string = W.ungu, putus = false): Obj[] {
  const lebar = bulatkan(x2 - x1);
  const loncat: Obj = { id, t: "jalur", x: x1, y, d: `M0 0 Q${bulatkan(lebar / 2)} ${-2 * h} ${lebar} 0`, warna: undefined, garis: warna, tebal: 2, putus, z: 1 };
  return isi === undefined ? [loncat] : [loncat, teks(`${id}-l`, bulatkan((x1 + x2) / 2), y - h - 4, isi, 11, W.merah, { z: 3 })];
}
export const idBusur = (id: string, ada = true): string[] => (ada ? [id, `${id}-l`] : [id]);

/** Bohlam lampu `${id}` (bulat kuning) dan talinya `${id}-t`. Pusat bohlam (x, y). */
export function lampu(id: string, x: number, y: number, nyala = true): Obj[] {
  return [bulat(id, x, y, 4.4, nyala ? "#FDE047" : "#CBD5E1", nyala ? "#B45309" : "#64748B", { tebal: 1.2, z: 3 }), garis(`${id}-t`, x, bulatkan(y - 4.4), 0, -5, "#78350F", 1, { z: 2 })];
}
export const idLampu = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Satria" | "Laras" | "Genta" | "Pak Hendro" | "Bu Ratri" | "Pak Gunawan";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Satria berkaus biru `${id}-bj`; Laras berkacamata `${id}-ka1` `${id}-ka2`, berkepang satu `${id}-kp`, berkertas saku `${id}-kc`;
 * Genta berpeci `${id}-pc` dan berkaus hijau `${id}-bj`; Pak Hendro bertopi pantai `${id}-tp`, berpeluit `${id}-pl`, bertas kain `${id}-ts`, berkaus oranye `${id}-bj`;
 * Bu Ratri berbaju hijau `${id}-bj`, berselendang `${id}-sl`, memegang tongkat dirigen `${id}-tk`; Pak Gunawan berompi oranye `${id}-bj`, bermeteran `${id}-mt`, berpalu `${id}-pl` dan `${id}-pk`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Satria" ? E.satria : nama === "Laras" ? E.laras : nama === "Genta" ? E.genta : nama === "Bu Ratri" ? E.bu : E.pak;
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
  if (nama === "Bu Ratri") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(kotak(`${id}-sl`, x - 12, bulatkan(y + 3), 24, 4, "#86EFAC", "#166534", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-tk`, x + 14, bulatkan(y + 2), 4, bulatkan(-14), "#F8FAFC", 2.2, { z: 2 }));
  }
  if (nama === "Pak Gunawan") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(bulat(`${id}-mt`, x - 16, bulatkan(y + 9), 4.4, "#FACC15", "#92400E", { tebal: 1, z: 2 }));
    out.push(garis(`${id}-pl`, x + 15, bulatkan(y + 4), 0, bulatkan(-14), "#78350F", 2, { z: 2 }));
    out.push(kotak(`${id}-pk`, x + 11, bulatkan(y - 11), 8, 4, "#64748B", "#1E293B", { rx: 1, tebal: 0.9, z: 2 }));
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
  ...(nama === "Bu Ratri" ? [`${id}-bj`, `${id}-sl`, `${id}-tk`] : []),
  ...(nama === "Pak Gunawan" ? [`${id}-bj`, `${id}-mt`, `${id}-pl`, `${id}-pk`] : []),
];
