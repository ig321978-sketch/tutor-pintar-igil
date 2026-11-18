import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna" (waktu dan jam), akhir cerita Hari Olahraga Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa Hari Olahraga dari pagi sampai malam: lapangan hijau bergaris putih, tiang bendera, tiang jam dinding besar, jam digital kotak, busur matahari,
 * lintasan lari, tali tambang, papan jadwal, jalur jam berkotak, batang lama kegiatan, lampu lapangan malam, piala, peluit.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (berkaus dan bertopi putih, berpeluit), Bu Ratna (bertopi biru, berpengeras suara). Tanpa ZWJ.
 *
 * Jam analog `${id}`: muka `${id}-w`, angka `${id}-a{n}`, jarum pendek `${id}-p`, jarum panjang `${id}-m`, poros `${id}-h`.
 * Jarum digambar tegak ke atas lalu diputar (`rot`, derajat searah jarum jam dari angka dua belas) mengelilingi pusat muka jam.
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
  kuning: "#FDE68A",
  malam: "#312E81",
};

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jari: "\u{1F446}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  piala: "\u{1F3C6}",
  medali: "\u{1F3C5}",
  bulan: "\u{1F319}",
  sabun: "\u{1F9FC}",
  tidur: "\u{1F634}",
  penjaga: "\u{1F9D3}",
  kursi: "\u{1FA91}",
  lari: "\u{1F3C3}",
  bintang: "\u{2B50}",
  bola: "\u{26BD}",
  lampu: "\u{1F4A1}",
  jam: "\u{1F550}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Math.round(n * 10) / 10;
export const dua = (n: number): string => String(n).padStart(2, "0");

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

/* ------------------------------ Lapangan ------------------------------ */

/** Rumput lapangan `${id}` mulai tinggi y sampai bawah kanvas, dengan garis putih `${id}-g` di tengahnya. */
export const lapangan = (id: string, y = 150, warna = "#BBF7D0"): Obj[] => [
  kotak(id, 2, y, 296, 198 - y, warna, "#16A34A", { rx: 4, tebal: 1.2, z: -3 }),
  garis(`${id}-g`, 8, r1(y + (198 - y) / 2), 284, 0, W.putih, 2, { z: -2 }),
];
/** Langit pagi, sore, atau malam: kotak lebar `${id}` dari atas sampai tinggi y. */
export const langitLatar = (id: string, y: number, warna: string): Obj => kotak(id, 2, 2, 296, y - 2, warna, undefined, { rx: 4, z: -4 });

/** Tiang bendera `${id}` (garis) dengan bendera merah putih `${id}-b` (kotak) pada tinggi `bendera` dari dasar. */
export const tiangBendera = (id: string, x: number, dasar: number, tinggi: number, bendera: number): Obj[] => [
  garis(id, x, dasar, 0, -tinggi, "#6B7280", 3, { z: 0 }),
  kotak(`${id}-b`, x + 1.5, r1(dasar - bendera - 12), 24, 12, W.merah, W.biru, { rx: 1, tebal: 1, z: 1 }),
  bulat(`${id}-u`, x, r1(dasar - tinggi - 2), 2.6, W.emas, W.biru, { tebal: 1, z: 1 }),
];
export const idTiang = (id: string): string[] => [id, `${id}-b`, `${id}-u`];

/** Matahari `${id}` (cakram dengan lingkar) di (x, y). */
export const matahari = (id: string, x: number, y: number, r = 11, warna = "#FACC15"): Obj[] => [bulat(id, x, y, r, warna, "#F59E0B", { tebal: 2, z: 0 }), bulat(`${id}-i`, x, y, r1(r * 0.55), "#FEF08A", undefined, { z: 1 })];
export const idMatahari = (id: string): string[] => [id, `${id}-i`];

/** Bulan sabit `${id}` (cakram krem). */
export const bulanMalam = (id: string, x: number, y: number, r = 10): Obj => bulat(id, x, y, r, "#FEF9C3", "#EAB308", { tebal: 1.6, z: 0 });

/** Tiang lampu lapangan `${id}` dengan kepala lampu menyala `${id}-l`. */
export const lampuLapangan = (id: string, x: number, dasar: number, tinggi = 70): Obj[] => [
  garis(id, x, dasar, 0, -tinggi, "#475569", 3, { z: 0 }),
  kotak(`${id}-l`, x - 9, r1(dasar - tinggi - 8), 18, 8, "#FDE047", "#A16207", { rx: 2, tebal: 1.2, z: 1 }),
];
export const idLampu = (id: string): string[] => [id, `${id}-l`];

/** Tali tambang `${id}` melintang (garis tebal) dengan pita tengah merah `${id}-p`. */
export const taliTambang = (id: string, x: number, y: number, panjang: number): Obj[] => [
  garis(id, x, y, panjang, 0, "#92400E", 4, { z: 1 }),
  kotak(`${id}-p`, r1(x + panjang / 2 - 3), r1(y - 5), 6, 10, W.merah, W.biru, { rx: 1, tebal: 1, z: 2 }),
];
export const idTali = (id: string): string[] => [id, `${id}-p`];

/** Lintasan lari: jalur abu `${id}` dengan garis tengah putus `${id}-g`. */
export const lintasan = (id: string, x: number, y: number, w: number, h = 22): Obj[] => [
  kotak(id, x, y, w, h, "#FCA5A5", "#B91C1C", { rx: 3, tebal: 1.4, z: -1 }),
  garis(`${id}-g`, x + 4, r1(y + h / 2), w - 8, 0, W.putih, 1.6, { putus: true, z: 0 }),
];
export const idLintasan = (id: string): string[] => [id, `${id}-g`];

/** Peluit `${id}`: badan bulat kuning dan corong. */
export const peluit = (id: string, x: number, y: number): Obj[] => [bulat(id, x, y, 4.6, W.emas, W.biru, { tebal: 1.2, z: 3 }), kotak(`${id}-c`, r1(x - 10), r1(y - 2), 9, 4, W.emas, W.biru, { rx: 1.5, tebal: 1, z: 3 })];
export const idPeluit = (id: string): string[] => [id, `${id}-c`];

/** Papan jadwal kayu `${id}` bertiang: papan krem dengan bingkai coklat dan dua kaki `${id}-a`, `${id}-b`. */
export const papanJadwal = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 5, tebal: 3.4, z: -1 }),
  kotak(`${id}-a`, r1(x + 10), r1(y + h), 5, 14, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: -2 }),
  kotak(`${id}-b`, r1(x + w - 15), r1(y + h), 5, 14, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: -2 }),
];
export const idPapan = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

/** Spanduk kecil `${id}` dan teksnya `${id}-t`. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10, warna: string = W.merahMuda): Obj[] => [
  kotak(id, x, y, w, 22, warna, W.merah, { rx: 3, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, r1(y + 11 + u * 0.35), isi, u, W.merah, { z: 2 }),
];

/** Setengah lingkaran langit `${id}` (poligon) berpusat di (cx, cy) dengan jari-jari r, mengarah ke atas. */
export const busurLangit = (id: string, cx: number, cy: number, r: number, warna: string): Obj => {
  const pts: [number, number][] = [];
  for (let d = 180; d <= 360; d += 15) pts.push([r1(cx + r * Math.cos((d * Math.PI) / 180)), r1(cy + r * Math.sin((d * Math.PI) / 180))]);
  return poligon(id, pts, warna, "#93C5FD", { tebal: 1.4, z: -1 });
};
/** Titik pada busur langit (sudut d dari 180 kiri sampai 360 kanan). */
export const titikBusur = (cx: number, cy: number, r: number, d: number): Titik => ({ x: r1(cx + r * Math.cos((d * Math.PI) / 180)), y: r1(cy + r * Math.sin((d * Math.PI) / 180)) });

/* ------------------------------ Jam analog ------------------------------ */

/** Sudut jarum pendek (derajat) untuk jam h dan menit m. */
export const sudutPendek = (h: number, m: number): number => 30 * (h % 12) + m / 2;
/** Sudut jarum panjang (derajat) untuk menit m. */
export const sudutPanjang = (m: number): number => 6 * m;

export type PosisiJam = { cx: number; cy: number; r: number };
export const JAM_BESAR: PosisiJam = { cx: 150, cy: 104, r: 58 };
export const JAM_KIRI: PosisiJam = { cx: 78, cy: 106, r: 42 };
export const JAM_KANAN: PosisiJam = { cx: 222, cy: 106, r: 42 };
export const JAM_TENGAH: PosisiJam = { cx: 150, cy: 106, r: 42 };

export const mukaJam = (id: string, p: PosisiJam): Obj[] => [bulat(`${id}-w`, p.cx, p.cy, p.r, W.putih, W.biru, { tebal: 2.5, z: 0 })];
/** Angka pada muka jam: semua dua belas angka, atau hanya dua belas, tiga, enam, dan sembilan. */
export function angkaJam(id: string, p: PosisiJam, semua = true): Obj[] {
  const u = p.r >= 50 ? 9.5 : 8;
  const ring = p.r - (p.r >= 50 ? 10 : 9);
  const daftar = semua ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [3, 6, 9, 12];
  return daftar.map((n) => {
    const a = (n * 30 * Math.PI) / 180;
    return teks(`${id}-a${n}`, r1(p.cx + ring * Math.sin(a)), r1(p.cy - ring * Math.cos(a) + u * 0.35), String(n), u, W.biru, { z: 1 });
  });
}
export const jarumPendek = (id: string, p: PosisiJam, h: number, m: number, o: Opsi = {}): Obj => ({ id: `${id}-p`, t: "garis", x: p.cx, y: p.cy, x2: 0, y2: -r1(p.r * 0.5), rot: sudutPendek(h, m), garis: W.biru, tebal: p.r >= 50 ? 4 : 3.4, z: 2, ...o });
export const jarumPanjang = (id: string, p: PosisiJam, m: number, o: Opsi = {}): Obj => ({ id: `${id}-m`, t: "garis", x: p.cx, y: p.cy, x2: 0, y2: -r1(p.r * 0.78), rot: sudutPanjang(m), garis: W.merah, tebal: p.r >= 50 ? 2.4 : 2, z: 2, ...o });
export const porosJam = (id: string, p: PosisiJam): Obj => bulat(`${id}-h`, p.cx, p.cy, 3.2, W.biru, W.biru, { z: 3 });
/** Jam analog lengkap: muka, angka, kedua jarum, dan poros. */
export const jam = (id: string, p: PosisiJam, h: number, m = 0, semua = true): Obj[] => [...mukaJam(id, p), ...angkaJam(id, p, semua), jarumPendek(id, p, h, m), jarumPanjang(id, p, m), porosJam(id, p)];
export const idJam = (id: string, semua = true): string[] => [`${id}-w`, ...(semua ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [3, 6, 9, 12]).map((n) => `${id}-a${n}`), `${id}-p`, `${id}-m`, `${id}-h`];
/** Patch memindah jarum jam `${id}` ke jam h dan menit m. */
export const setJam = (id: string, h: number, m = 0): (Partial<Obj> & { id: string })[] => [
  { id: `${id}-p`, rot: sudutPendek(h, m) },
  { id: `${id}-m`, rot: sudutPanjang(m) },
];

/** Tulisan jam digital "HH.MM" dari jam 24 dan menit. */
export const tulisDigital = (jam24: number, m = 0): string => `${dua(jam24)}.${dua(m)}`;
/** Kotak jam digital `dg` dengan tulisan `dg-t` (id awalan `id`). */
export const digital = (id: string, x: number, y: number, jam24: number, m = 0, w = 96, h = 36, u = 18): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, "#0F172A", W.biru, { rx: 6, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, r1(y + h / 2 + u * 0.35), tulisDigital(jam24, m), u, "#4ADE80", { z: 2 }),
];
export const idDigital = (id: string): string[] => [`${id}-k`, `${id}-t`];

/* ------------------------------ Jalur jam dan batang ------------------------------ */

/** Jalur jam: `n` kotak sama lebar `lebar` berderet dari (x, y); kotak ke-i `${id}${i}`, i dimulai 0; yang berwarna adalah `dari` sampai `sampai` (bukan sampai-akhir). */
export const jalurJam = (id: string, x: number, y: number, n: number, lebar: number, h = 20, warnaIsi: string = W.hijauMuda): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(x + i * lebar), y, lebar, h, warnaIsi, W.biru, { rx: 2, tebal: 1.4, z: 1 }));
export const idJalur = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Batang lama kegiatan `${id}` (kotak berpanjang kotak * lebar) dengan nama `${id}-n` di kiri dan label `${id}-t` di kanan. */
export function batangLama(id: string, y: number, nama: string, kotakJam: number, label: string, warna: string, skala = 28, x = 78): Obj[] {
  return [
    teks(`${id}-n`, 8, r1(y + 13), nama, 9.5, W.ungu, { anchor: "start", z: 1 }),
    kotak(id, x, y, r1(Math.max(kotakJam, 0.25) * skala), 18, warna, W.biru, { rx: 3, tebal: 1.5, z: 1 }),
    teks(`${id}-t`, r1(x + Math.max(kotakJam, 0.25) * skala + 6), r1(y + 13), label, 9.5, W.merah, { anchor: "start", z: 1 }),
  ];
}
export const idBatang = (id: string): string[] => [id, `${id}-n`, `${id}-t`];

/** Baris jadwal `${id}`: kartu berwarna bagian hari dengan jam `${id}-j` dan nama kegiatan `${id}-n`. */
export function barisJadwal(id: string, y: number, jamTeks: string, nama: string, warna: string, x = 12, w = 276): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, 24, warna, W.biru, { rx: 6, tebal: 1.4, z: 1 }),
    teks(`${id}-j`, x + 8, r1(y + 16), jamTeks, 9.2, W.merah, { anchor: "start", z: 2 }),
    teks(`${id}-n`, x + w - 8, r1(y + 16), nama, 9.2, W.biru, { anchor: "end", z: 2 }),
  ];
}
export const idBaris = (id: string): string[] => [`${id}-k`, `${id}-j`, `${id}-n`];
/** Patch pindah baris jadwal ke tinggi y. */
export const pindahBaris = (id: string, y: number): (Partial<Obj> & { id: string })[] => [
  { id: `${id}-k`, y },
  { id: `${id}-j`, y: r1(y + 16) },
  { id: `${id}-n`, y: r1(y + 16) },
];

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Bu Ratna";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bertopi putih `${id}-cp`, berkaus putih `${id}-ks`, dan berpeluit `${id}-pl`;
 * Bu Ratna bertopi biru `${id}-cp` dan berpengeras suara `${id}-ps`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, r1(y - u * 0.5), E.topi, r1(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") {
    out.push({ id: `${id}-cp`, t: "jalur", x, y: r1(y - u * 0.62), d: "M-14 6 L-10 -6 L10 -6 L14 6 Z", warna: W.putih, garis: W.biru, tebal: 1.4, z: 2 });
    out.push(kotak(`${id}-ks`, x - 10, y + 4, 20, 9, W.putih, W.biru, { rx: 3, tebal: 1.2, z: 1 }));
    out.push(bulat(`${id}-pl`, x + 6, y + 8, 2.6, W.emas, W.biru, { tebal: 1, z: 3 }));
  }
  if (nama === "Bu Ratna") {
    out.push({ id: `${id}-cp`, t: "jalur", x, y: r1(y - u * 0.62), d: "M-14 6 L-10 -6 L10 -6 L14 6 Z", warna: "#2563EB", garis: W.biru, tebal: 1.4, z: 2 });
    out.push(kotak(`${id}-ps`, x + 13, y - 2, 8, 6, "#9CA3AF", "#4B5563", { rx: 1.5, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + (nama === "Bu Sari" || nama === "Bu Ratna" ? 21 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-cp`, `${id}-ks`, `${id}-pl`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-cp`, `${id}-ps`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => tokoh(id, x, y, nama, u).map((o) => ({ id: o.id, x: o.x, y: o.y }));

/** Anak-anak berbaris: deretan wajah `${id}0...` mulai (x, y) berjarak `jarak`. */
export const barisAnak = (id: string, x: number, y: number, n: number, jarak = 22, u = 18): Obj[] => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, r1(x + i * jarak), y, E.chacha, u, { z: 1 }));
export const idAnak = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Lintasan konfeti kecil: deretan kotak warna-warni `${id}0...` pada tinggi y. */
export const konfeti = (id: string, y: number, n = 10): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(14 + i * 27), r1(y + (i % 3) * 7), 5, 7, [W.merah, W.emas, W.hijau, "#3B82F6"][i % 4], undefined, { rx: 1, rot: i * 23, z: 4 }));
export const idKonfeti = (id: string, n = 10): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);
