import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu" (setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa kebun sekolah: hamparan rumput `${id}`, pagar bambu `${id}` (tiang dan palang), bedeng tanah bertunas, gerobak panen (badan, roda, tangkai), semangka
 * (utuh digambar dari bulat dan garis; belahan digambar dari potongan bulat), ember dan gelas yang terisi air, karung bibit, kertas dilipat, lingkaran di tanah, papan catatan Dika,
 * cermin kecil, daun, jagung, dan pita bertingkat. Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (bertopi caping digambar), Pak Danu (bertopi jerami digambar), Bu Wati
 * (berkerudung hijau digambar). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};
/** Warna rupa kebun. */
export const WK = { rumput: "#BBF7D0", bambu: "#D9F99D", bambuGaris: "#4D7C0F", tanah: "#A16207", tanahGaris: "#78350F", kayu: "#D6A15E", daging: "#F87171", kulit: "#15803D", jerami: "#FDE68A" } as const;

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
  mata: "\u{1F440}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  geleng: "\u{1F625}",
  tunas: "\u{1F331}",
  keranjang: "\u{1F9FA}",
  jagung: "\u{1F33D}",
  sorak: "\u{1F389}",
  bicara: "\u{1F4AC}",
  gelas: "\u{1F964}",
  labu: "\u{1F383}",
  pita: "\u{1F380}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Bentuk tertutup dari titik-titik absolut (lintasan `M .. L .. Z` relatif terhadap (x, y) = pojok kiri-atas pertama). */
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
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Kebun ------------------------------ */

/** Hamparan rumput `${id}` dari tinggi y sampai bawah kanvas. */
export const rumput = (id: string, y = 128): Obj => kotak(id, 2, y, 296, 200 - y, WK.rumput, undefined, { rx: 0, tebal: 0, z: -3 });

/** Pagar bambu: palang `${id}-p1` dan `${id}-p2`, tiang `${id}-t{i}` tiap 20 satuan. Pojok kiri-atas (x, y), tinggi 34. */
export function pagar(id: string, x: number, y: number, w: number): Obj[] {
  const n = Math.floor(w / 20) + 1;
  return [
    kotak(`${id}-p1`, x, y + 8, w, 4, "#BEF264", WK.bambuGaris, { rx: 1, tebal: 1, z: -2 }),
    kotak(`${id}-p2`, x, y + 22, w, 4, "#BEF264", WK.bambuGaris, { rx: 1, tebal: 1, z: -2 }),
    ...Array.from({ length: n }, (_, i) => kotak(`${id}-t${i}`, x + i * 20, y, 5, 34, WK.bambu, WK.bambuGaris, { rx: 2, tebal: 1.2, z: -1 })),
  ];
}
export const idPagar = (id: string, w: number): string[] => [`${id}-p1`, `${id}-p2`, ...Array.from({ length: Math.floor(w / 20) + 1 }, (_, i) => `${id}-t${i}`)];

/** Bedeng tanah `${id}` bertunas `${id}-s{i}`. Pojok kiri-atas (x, y), tinggi 12. */
export function bedeng(id: string, x: number, y: number, w: number): Obj[] {
  return [
    kotak(id, x, y, w, 12, WK.tanah, WK.tanahGaris, { rx: 3, tebal: 1.4, z: -2 }),
    ...Array.from({ length: Math.floor(w / 28) }, (_, i) => emo(`${id}-s${i}`, x + 14 + i * 28, y + 7, E.tunas, 11, { z: -1 })),
  ];
}
export const idBedeng = (id: string, w: number): string[] => [id, ...Array.from({ length: Math.floor(w / 28) }, (_, i) => `${id}-s${i}`)];

/** Gerobak panen: badan `${id}`, roda `${id}-r`, tangkai dorong `${id}-g`. Pojok kiri-atas badan (x, y), lebar 58, tinggi 20. */
export const gerobak = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 58, 20, WK.kayu, W.coklat, { rx: 3, tebal: 2, z: 1 }),
  bulat(`${id}-r`, x + 18, y + 25, 9, "#FDE68A", "#451A03", { tebal: 2.4, z: 2 }),
  garis(`${id}-g`, x, y + 6, -18, 12, "#78350F", 3, { z: 1 }),
];
export const idGerobak = (id: string): string[] => [id, `${id}-r`, `${id}-g`];
/** Patch posisi gerobak ke pojok kiri-atas (x, y) baru, untuk ubah. */
export const pindahGerobak = (id: string, x: number, y: number): (Partial<Obj> & { id: string })[] => gerobak(id, x, y).map((o) => ({ id: o.id, x: o.x, y: o.y }));

/** Papan nama tanaman: tongkat `${id}-g`, papan `${id}`. Pojok kiri-atas papan (x, y). */
export const papanNama = (id: string, x: number, y: number, w = 22, h = 14): Obj[] => [
  garis(`${id}-g`, x + w / 2, y + h, 0, 12, "#78350F", 2.4, { z: -1 }),
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 2, tebal: 1.6, z: 0 }),
];
export const idPapanNama = (id: string): string[] => [id, `${id}-g`];

/* ------------------------------ Potongan bulat ------------------------------ */

/**
 * Potongan bulat berpusat di (cx, cy) berjari-jari r, dari sudut a1 sampai a2 (derajat, sumbu y ke bawah), ditutup lurus (tali busur). Jarak sudut 180 = setengah.
 * Lintasan jalur titik-titik lurus, supaya mudah diuji masuk kanvas.
 */
export function potongBulat(id: string, cx: number, cy: number, r: number, a1: number, a2: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj {
  const langkah = Math.max(4, Math.round(Math.abs(a2 - a1) / 12));
  const titik: [number, number][] = Array.from({ length: langkah + 1 }, (_, i) => {
    const a = ((a1 + ((a2 - a1) * i) / langkah) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return poligon(id, titik, warna, garisW, { tebal: 2.2, ...o });
}
/** Biji semangka kecil `${id}-b{i}` di dalam daging semangka di (cx, cy). */
export const biji = (id: string, cx: number, cy: number, n = 3): Obj[] => Array.from({ length: n }, (_, i) => bulat(`${id}-b${i}`, bulatkan(cx + (i - (n - 1) / 2) * 6), bulatkan(cy + (i % 2) * 4), 1.5, "#1F2937", undefined, { tebal: 0, z: 2 }));
/** Semangka utuh berpusat di (cx, cy): kulit `${id}` dan tiga garis loreng `${id}-l{i}`. */
export function semangka(id: string, cx: number, cy: number, r: number, o: Opsi = {}): Obj[] {
  return [
    bulat(id, cx, cy, r, "#4ADE80", WK.kulit, { tebal: 2.4, ...o }),
    ...[-0.5, 0, 0.5].map((f, i) => {
      const tengah = Math.sqrt(r * r - (f * r) ** 2) * 0.82;
      return garis(`${id}-l${i}`, bulatkan(cx + f * r), bulatkan(cy - tengah), 0, bulatkan(tengah * 2), "#166534", 1.8, { z: (o.z ?? 0) + 1, ...(o.op === undefined ? {} : { op: o.op }) });
    }),
  ];
}
export const idSemangka = (id: string): string[] => [id, `${id}-l0`, `${id}-l1`, `${id}-l2`];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Danu" | "Bu Wati";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bertopi caping `${id}-cp`; Pak Danu bertopi jerami `${id}-tj` (pinggiran) dan `${id}-tk` (puncak);
 * Bu Wati berkerudung hijau `${id}-kd`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Pak Danu" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") out.push(poligon(`${id}-cp`, [[x - 17, bulatkan(y - u * 0.5)], [x, bulatkan(y - u * 0.95)], [x + 17, bulatkan(y - u * 0.5)]], "#FDE68A", "#A16207", { z: 2, tebal: 1.4 }));
  if (nama === "Pak Danu") {
    out.push(kotak(`${id}-tj`, x - 15, bulatkan(y - u * 0.66), 30, 4, WK.jerami, "#A16207", { rx: 2, tebal: 1.2, z: 2 }));
    out.push(poligon(`${id}-tk`, [[x - 9, bulatkan(y - u * 0.66)], [x - 6, bulatkan(y - u * 0.95)], [x + 6, bulatkan(y - u * 0.95)], [x + 9, bulatkan(y - u * 0.66)]], WK.jerami, "#A16207", { z: 2, tebal: 1.2 }));
  }
  if (nama === "Bu Wati") out.push(bulat(`${id}-kd`, x, bulatkan(y - 4), 14, "#4ADE80", "#166534", { z: 0, tebal: 1.6 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + 13), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-cp`] : []),
  ...(nama === "Pak Danu" ? [`${id}-tj`, `${id}-tk`] : []),
  ...(nama === "Bu Wati" ? [`${id}-kd`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => tokoh(id, x, y, nama, u).map((o) => ({ id: o.id, x: o.x, y: o.y }));

/* ------------------------------ Wadah, papan, kertas, cermin ------------------------------ */

/**
 * Wadah berbentuk corong terbalik (ember atau gelas): tepi `${id}`, air `${id}-a` setinggi pecahan `isi` (0 sampai 1), garis penanda tengah `${id}-m`.
 * Pojok kiri-atas (x, y), lebar atas w, tinggi h.
 */
export function wadah(id: string, x: number, y: number, w: number, h: number, isi: number, warnaAir = "#60A5FA", warnaTepi = "#475569", penanda = false): Obj[] {
  const sempit = w * 0.14;
  const lebarDi = (t: number) => w - 2 * sempit * (t / h);
  const ty = bulatkan(h * (1 - isi));
  const tepi = poligon(id, [[x, y], [x + w, y], [x + w - sempit, y + h], [x + sempit, y + h]], "#F8FAFC", warnaTepi, { z: 0, tebal: 1.8 });
  const out: Obj[] = [tepi];
  if (isi > 0) {
    const lk = (w - lebarDi(ty)) / 2;
    out.push(poligon(`${id}-a`, [[x + lk, y + ty], [x + w - lk, y + ty], [x + w - sempit, y + h], [x + sempit, y + h]], warnaAir, warnaTepi, { z: 1, tebal: 1 }));
  }
  if (penanda) out.push(garis(`${id}-m`, x - 2, bulatkan(y + h / 2), w + 4, 0, "#DC2626", 1.6, { z: 2, putus: true }));
  return out;
}
export const idWadah = (id: string, isi: boolean, penanda: boolean): string[] => [id, ...(isi ? [`${id}-a`] : []), ...(penanda ? [`${id}-m`] : [])];

/** Papan catatan Dika: kertas krem berpenjepit di atas papan kayu `${id}`; jepit `${id}-j`. */
export const papanCatat = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 5, tebal: 3.4, z: -1 }),
  kotak(`${id}-j`, x + w / 2 - 12, y - 4, 24, 8, "#9CA3AF", "#4B5563", { rx: 2, tebal: 1.2, z: 0 }),
];
export const idPapan = (id: string): string[] => [id, `${id}-j`];

/** Cermin kecil bergagang: kaca `${id}` dan gagang `${id}-g`. Pojok kiri-atas kaca (x, y), kaca selebar w setinggi h. */
export const cermin = (id: string, x: number, y: number, w = 7, h = 40): Obj[] => [
  kotak(id, x, y, w, h, "#BAE6FD", "#0369A1", { rx: 2, tebal: 1.6, z: 3 }),
  kotak(`${id}-g`, x + w / 2 - 1.5, y + h, 3, 9, W.coklat, "#451A03", { rx: 1, tebal: 1, z: 3 }),
];
export const idCermin = (id: string): string[] => [id, `${id}-g`];

/** Daun simetris berpusat di (cx, cy) setinggi 2h: helai `${id}` dan tulang daun `${id}-t`. */
export const daun = (id: string, cx: number, cy: number, h = 26): Obj[] => [
  poligon(id, [[cx, cy - h], [cx + h * 0.55, cy - h * 0.4], [cx + h * 0.45, cy + h * 0.4], [cx, cy + h], [cx - h * 0.45, cy + h * 0.4], [cx - h * 0.55, cy - h * 0.4]], "#4ADE80", WK.kulit, { z: 1, tebal: 1.8 }),
  garis(`${id}-t`, cx, cy - h, 0, h * 2, "#166534", 1.4, { z: 2 }),
];
export const idDaun = (id: string): string[] => [id, `${id}-t`];

/** Pita bertingkat: pita `${id}` dengan petak-petak; garis lipat tengah `${id}-m` bila `lipat`. Pojok kiri-atas (x, y), lebar w, tinggi 14. */
export function pitaBar(id: string, x: number, y: number, w: number, warna: string, kotakBanyak = 8): Obj[] {
  const lebarKotak = w / kotakBanyak;
  return [
    kotak(id, x, y, w, 14, warna, W.biru, { rx: 2, tebal: 1.4, z: 1 }),
    ...Array.from({ length: kotakBanyak - 1 }, (_, i) => garis(`${id}-c${i}`, bulatkan(x + (i + 1) * lebarKotak), y, 0, 14, W.biru, 0.7, { z: 2, op: 0.5 })),
  ];
}
export const idPitaBar = (id: string, kotakBanyak = 8): string[] => [id, ...Array.from({ length: kotakBanyak - 1 }, (_, i) => `${id}-c${i}`)];
