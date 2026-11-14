import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 6 Sub-Bab D (melukis sudut): sinar dan busur sudut, busur derajat dengan skala,
 * jam analog, persimpangan jalan, segi lima beraturan untuk keramik, dan rasi bintang.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Arah sudut memakai derajat matematika: 0 ke kanan, berlawanan arah jarum jam; sumbu y layar ke bawah.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  jeruk: "#FB923C",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  ungMuda: "#EDE9FE",
  langitMuda: "#E0F2FE",
};

type Opsi = Partial<Obj>;
export type Pt = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 24 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 28 + baris.length * 12, arti, 7, W.ungu),
];

/** Tanda centang atau silang di (x, y) (garis dasar teks). */
export const tanda = (id: string, x: number, y: number, ya: boolean, u = 12): Obj => teks(id, x, y, ya ? "✓" : "✗", u, ya ? W.hijau : W.merah);

/** Satu baris rata kiri berupa kotak berisi teks. Pojok kiri-atas (x, y). Id `${id}-k` dan `${id}-t`. */
export function baris(id: string, x: number, y: number, w: number, isi: string, warna: string = W.putih, u = 8, h = 18, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 5, tebal: 1.2, ...o }), teks(`${id}-t`, x + 6, y + h / 2 + u * 0.35, isi, u, W.biru, { anchor: "start", ...o })];
}

/** Gelembung ucapan: kotak dengan nama di kiri-atas dan satu sampai tiga baris isi rata kiri. */
export function ide(id: string, x: number, y: number, w: number, h: number, nama: string, isi: string[], warna: string = W.krem, u = 8): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }),
    teks(`${id}-n`, x + 8, y + 12, nama, 8.6, W.ungu, { anchor: "start" }),
    ...isi.map((b, i) => teks(`${id}-t${i}`, x + 8, y + 25 + i * (u + 3.5), b, u, W.biru, { anchor: "start" })),
  ];
}

/* ------------------------------ Sudut, sinar, dan busur sudut ------------------------------ */

export const rad = (d: number): number => (d * Math.PI) / 180;

/** Titik di ujung sinar dari (vx, vy) menurut arah `deg` sejauh `p`. */
export const ujung = (vx: number, vy: number, deg: number, p: number): Pt => [vx + p * Math.cos(rad(deg)), vy - p * Math.sin(rad(deg))];

/** Sinar (kaki sudut) dari titik sudut menurut arah `deg` sepanjang `p`. */
export function sinar(id: string, vx: number, vy: number, deg: number, p: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj {
  const [x, y] = ujung(vx, vy, deg, p);
  return garis(id, vx, vy, x - vx, y - vy, warna, tebal, o);
}

/** Busur penanda sudut dari arah d1 ke arah d2 (berlawanan arah jarum jam, d2 lebih besar dari d1). */
export function busurSudut(id: string, vx: number, vy: number, d1: number, d2: number, r: number, warna: string = W.merah, tebal = 1.6, o: Opsi = {}): Obj {
  const a = ujung(0, 0, d1, r);
  const b = ujung(0, 0, d2, r);
  const besar = Math.abs(d2 - d1) > 180 ? 1 : 0;
  return jalur(id, vx, vy, `M${a[0].toFixed(1)} ${a[1].toFixed(1)} A${r} ${r} 0 ${besar} 0 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`, "none", warna, { tebal, ...o });
}

/** Juring berisi (daerah sudut) dari arah d1 ke d2. */
export function juring(id: string, vx: number, vy: number, d1: number, d2: number, r: number, warna: string, garisW: string | undefined = undefined, o: Opsi = {}): Obj {
  const a = ujung(0, 0, d1, r);
  const b = ujung(0, 0, d2, r);
  const besar = Math.abs(d2 - d1) > 180 ? 1 : 0;
  return jalur(id, vx, vy, `M0 0 L${a[0].toFixed(1)} ${a[1].toFixed(1)} A${r} ${r} 0 ${besar} 0 ${b[0].toFixed(1)} ${b[1].toFixed(1)} Z`, warna, garisW, { tebal: 1, ...o });
}

/** Titik sudut (bulatan kecil) di (vx, vy). */
export const titikSudut = (id: string, vx: number, vy: number, warna: string = W.biru, r = 2.8, o: Opsi = {}): Obj => bulat(id, vx, vy, r, warna, undefined, o);

/** Sebuah sudut lengkap: dua sinar (id `${id}1`, `${id}2`), titik sudut `${id}v`, dan busur `${id}a`. */
export function sudut(id: string, vx: number, vy: number, a1: number, a2: number, p: number, rBusur = 14, warna: string = W.biru, warnaBusur: string = W.merah, o: Opsi = {}): Obj[] {
  const lo = Math.min(a1, a2);
  const hi = Math.max(a1, a2);
  return [sinar(`${id}1`, vx, vy, a1, p, warna, 2, o), sinar(`${id}2`, vx, vy, a2, p, warna, 2, o), titikSudut(`${id}v`, vx, vy, warna, 2.8, o), busurSudut(`${id}a`, vx, vy, lo, hi, rBusur, warnaBusur, 1.6, o)];
}

/** Besar sudut (derajat, 0 sampai 180) antara dua garis yang berpangkal sama, dari data benda. */
export function sudutAntaraGaris(g1: Obj, g2: Obj): number {
  const a = Math.atan2(g1.y2 ?? 0, g1.x2 ?? 0);
  const b = Math.atan2(g2.y2 ?? 0, g2.x2 ?? 0);
  let d = (Math.abs(a - b) * 180) / Math.PI;
  if (d > 180) d = 360 - d;
  return d;
}

/* ------------------------------ Busur derajat ------------------------------ */

export const SKALA_BUSUR = [0, 30, 60, 90, 120, 150, 180];

/**
 * Busur derajat setengah lingkaran berpusat di (cx, cy), dasar mendatar. arah "kanan": angka 0 di ujung kanan (skala luar);
 * arah "kiri": angka 0 di ujung kiri. Dengan `dua` ditambahkan skala dalam yang berlawanan (merah).
 * Id label: `${id}n${angka}` (skala luar) dan `${id}d${angka}` (skala dalam).
 */
export function busurDerajat(id: string, cx: number, cy: number, r: number, arah: "kanan" | "kiri" = "kanan", dua = false, o: Opsi = {}): Obj[] {
  const theta = (a: number): number => (arah === "kanan" ? a : 180 - a);
  let tik = "";
  for (let a = 0; a <= 180; a += 10) {
    const p1 = ujung(0, 0, theta(a), r);
    const p2 = ujung(0, 0, theta(a), r - (a % 30 === 0 ? 7 : 4));
    tik += `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  const hasil: Obj[] = [
    jalur(`${id}b`, cx, cy, `M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z`, W.muda, W.biru, { tebal: 1.2, ...o }),
    jalur(`${id}t`, cx, cy, tik.trim(), "none", W.biru, { tebal: 0.8, ...o }),
  ];
  for (const a of SKALA_BUSUR) {
    const [x, y] = ujung(cx, cy, theta(a), r - 13);
    hasil.push(teks(`${id}n${a}`, x, y + 2.4, String(a), 6, W.biru, o));
  }
  if (dua) {
    for (const a of SKALA_BUSUR) {
      const [x, y] = ujung(cx, cy, theta(180 - a), r - 24);
      hasil.push(teks(`${id}d${a}`, x, y + 2.4, String(a), 5.6, W.merah, o));
    }
  }
  hasil.push(bulat(`${id}c`, cx, cy, 2, W.merah, undefined, o));
  return hasil;
}

/* ------------------------------ Jam analog ------------------------------ */

/** Sudut jarum (derajat searah jarum jam dari angka 12) untuk pukul j.m. Dipakai gambar dan uji. */
export const sudutJarumPendek = (j: number, m: number): number => (j % 12) * 30 + m * 0.5;
export const sudutJarumPanjang = (m: number): number => m * 6;

/** Jam analog berpusat (cx, cy) berjari-jari r. Id: `${id}f` (muka), `${id}h1..12` (angka), `${id}jp` (jarum pendek), `${id}jm` (jarum panjang). */
export function jam(id: string, cx: number, cy: number, r: number, j: number, m: number, o: Opsi = {}): Obj[] {
  const pos = (phi: number, p: number): Pt => [Math.sin(rad(phi)) * p, -Math.cos(rad(phi)) * p];
  const pendek = pos(sudutJarumPendek(j, m), r * 0.5);
  const panjang = pos(sudutJarumPanjang(m), r * 0.78);
  const angka: Obj[] = [];
  for (let i = 1; i <= 12; i += 1) {
    const [x, y] = pos(i * 30, r - 8);
    angka.push(teks(`${id}h${i}`, cx + x, cy + y + 2.4, String(i), 6.4, W.biru, o));
  }
  return [
    bulat(`${id}f`, cx, cy, r, W.putih, W.biru, { tebal: 2, ...o }),
    ...angka,
    garis(`${id}jp`, cx, cy, pendek[0], pendek[1], W.merah, 3.2, o),
    garis(`${id}jm`, cx, cy, panjang[0], panjang[1], W.hijau, 2, o),
    bulat(`${id}c`, cx, cy, 2, W.hitam, undefined, o),
  ];
}

/** Besar sudut terkecil (derajat) antara dua jarum jam pada pukul j.m, dihitung dari sudut jarum. */
export function sudutTerkecilJam(j: number, m: number): number {
  const d = Math.abs(sudutJarumPendek(j, m) - sudutJarumPanjang(m)) % 360;
  return d > 180 ? 360 - d : d;
}

/* ------------------------------ Persimpangan jalan ------------------------------ */

/** Arah keempat ruas jalan dari titik temu (derajat matematika): selisih berturut-turut 110, 90, 25, dan sisanya 135. */
export const ARAH_JALAN = { jl: 150, nr: 40, bg: -50, kt: -75 };

/** Persimpangan: empat jalan tebal dari (cx, cy) sepanjang p. Id `${id}jl`, `${id}nr`, `${id}bg`, `${id}kt`. */
export function persimpangan(id: string, cx: number, cy: number, p = 66, o: Opsi = {}): Obj[] {
  return (Object.keys(ARAH_JALAN) as Array<keyof typeof ARAH_JALAN>).map((j) => sinar(`${id}${j}`, cx, cy, ARAH_JALAN[j], p, "#374151", 9, o));
}

/* ------------------------------ Segi lima beraturan untuk keramik ------------------------------ */

/** Lima titik segi lima beraturan berpusat (cx, cy) berjari-jari R; titik pertama pada arah rot. */
export function titikSegiLima(cx: number, cy: number, R: number, rot: number): Pt[] {
  return Array.from({ length: 5 }, (_, i) => ujung(cx, cy, rot + i * 72, R));
}

/** Poligon dari titik mutlak. Pusat benda di titik pertama, lintasan relatif. */
export function poligon(id: string, pts: Pt[], warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj {
  const [x0, y0] = pts[0];
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(p[0] - x0).toFixed(2)} ${(p[1] - y0).toFixed(2)}`).join(" ") + " Z";
  return jalur(id, x0, y0, d, warna, garisW, { tebal: 1.2, ...o });
}

/** Titik sudut dari lintasan poligon (kebalikan poligon), dipakai uji. */
export function titikDariJalur(o: Obj): Pt[] {
  const angka = ((o.d ?? "").match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const pts: Pt[] = [];
  for (let i = 0; i + 1 < angka.length; i += 2) pts.push([(o.x ?? 0) + angka[i], (o.y ?? 0) + angka[i + 1]]);
  return pts;
}

/** Pola 1: persegi bersisi s di (cx, cy) dikelilingi empat segi lima beraturan bersisi s. Ruang kosong ada di tiap pojok persegi. */
export function pola1(cx: number, cy: number, s: number) {
  const R = s / (2 * Math.sin(rad(36)));
  const a = s / (2 * Math.tan(rad(36)));
  const persegi: Pt[] = [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]];
  const lima = [
    titikSegiLima(cx, cy - s / 2 - a, R, 90),
    titikSegiLima(cx + s / 2 + a, cy, R, 0),
    titikSegiLima(cx, cy + s / 2 + a, R, 270),
    titikSegiLima(cx - s / 2 - a, cy, R, 180),
  ];
  return { persegi, lima, pojok: persegi[1], celah: [18, 72] as [number, number] };
}

/** Pola 2: tiga segi lima beraturan berpangkal di titik (px, py); dua bersisian dan satu terpisah oleh celah 36 derajat. */
export function pola2(px: number, py: number, R: number) {
  const mulai = [90, 198, 342];
  const lima = mulai.map((a) => {
    const c = ujung(px, py, a + 54, R);
    return titikSegiLima(c[0], c[1], R, a + 54 + 180);
  });
  return { lima, celah: [306, 342] as [number, number] };
}

/** Sudut dalam sebuah poligon pada titik ke-i (derajat). */
export function sudutDalam(pts: Pt[], i: number): number {
  const n = pts.length;
  const p = pts[i];
  const a = pts[(i + n - 1) % n];
  const b = pts[(i + 1) % n];
  const u = [a[0] - p[0], a[1] - p[1]];
  const v = [b[0] - p[0], b[1] - p[1]];
  return (Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))) * 180) / Math.PI;
}

/* ------------------------------ Rasi bintang Biduk (gambar sederhana) ------------------------------ */

export const BIDUK: Pt[] = [[40, 60], [78, 70], [112, 62], [146, 76], [150, 108], [196, 118], [190, 84]];

/** Rasi Biduk: tujuh bintang dihubungkan garis. Id `${id}s0..6` dan `${id}g0..5`. */
export function rasiBiduk(id: string, dx = 0, dy = 0, warna: string = W.emas, o: Opsi = {}): Obj[] {
  const gs = BIDUK.slice(0, -1).map((p, i) => garis(`${id}g${i}`, p[0] + dx, p[1] + dy, BIDUK[i + 1][0] - p[0], BIDUK[i + 1][1] - p[1], W.abu, 1.2, o));
  const bs = BIDUK.map((p, i) => teks(`${id}s${i}`, p[0] + dx, p[1] + dy + 5, "★", 14, warna, o));
  return [...gs, ...bs];
}

/** Rubrik Proyek Kelompok (Buku Panduan Guru hlm. 274): bobot dalam persen. */
export const RUBRIK_PROYEK = [
  { nama: "Ketepatan ukuran sudut", bobot: 30 },
  { nama: "Kelengkapan fasilitas umum", bobot: 20 },
  { nama: "Kerja sama kelompok", bobot: 15 },
  { nama: "Kreativitas desain", bobot: 35 },
];
