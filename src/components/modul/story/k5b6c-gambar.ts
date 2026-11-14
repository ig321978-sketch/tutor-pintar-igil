import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 6 Sub-Bab C (mengukur dan membandingkan sudut): busur derajat berskala, kaki sudut, kipas lipat,
 * busur sudut, jam analog, tabel, dan kartu. Berkas ini TIDAK dipakai bab lain.
 * Sudut ditulis dengan arah matematika (derajat, 0 ke kanan, berlawanan arah jarum jam); gambar layar membalik sumbu y.
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
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  kaca: "#E0F2FE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Sudut, busur derajat, kipas, dan jam ------------------------------ */

export const rad = (d: number) => (d * Math.PI) / 180;
const bulatkan = (n: number) => Math.round(n * 100) / 100;

/** Titik pada jarak r dari (x, y) dengan sudut matematika phi (derajat, 0 ke kanan, berlawanan arah jarum jam). */
export const polar = (x: number, y: number, r: number, phi: number): [number, number] => [bulatkan(x + r * Math.cos(rad(phi))), bulatkan(y - r * Math.sin(rad(phi)))];

/** Satu kaki sudut dari (x, y) sepanjang `panjang` ke arah phi. */
export const kaki = (id: string, x: number, y: number, panjang: number, phi: number, warna: string = W.biru, tebal = 2.2, o: Opsi = {}): Obj =>
  garis(id, x, y, bulatkan(panjang * Math.cos(rad(phi))), bulatkan(-panjang * Math.sin(rad(phi))), warna, tebal, o);

/** Sudut dari dua kaki: id `${id}-a` (arah phi1) dan `${id}-b` (arah phi2), titik sudut di (x, y). */
export const sudutDua = (id: string, x: number, y: number, panjang: number, phi1: number, phi2: number, warna: string = W.biru, tebal = 2.2, o: Opsi = {}): Obj[] => [
  kaki(`${id}-a`, x, y, panjang, phi1, warna, tebal, o),
  kaki(`${id}-b`, x, y, panjang, phi2, warna, tebal, o),
];

/** Garis putus-putus antara ujung kedua kaki sudut (panjang sama) yang berpangkal di (x, y). */
export function garisUjung(id: string, x: number, y: number, panjang: number, phi1: number, phi2: number, warna: string = W.merah, o: Opsi = {}): Obj {
  const p = polar(x, y, panjang, phi1);
  const q = polar(x, y, panjang, phi2);
  return garis(id, p[0], p[1], bulatkan(q[0] - p[0]), bulatkan(q[1] - p[1]), warna, 1.6, { putus: true, ...o });
}

/** Busur penanda sudut di titik sudut (x, y) dari phi1 ke phi2 berlawanan arah jarum jam. Id `${id}-w`. */
export function busurSudut(id: string, x: number, y: number, r: number, phi1: number, phi2: number, warna: string, o: Opsi = {}): Obj {
  const px = (d: number) => bulatkan(r * Math.cos(rad(d)));
  const py = (d: number) => bulatkan(-r * Math.sin(rad(d)));
  const besar = phi2 - phi1 > 180 ? 1 : 0;
  return jalur(`${id}-w`, x, y, `M${px(phi1)} ${py(phi1)} A${r} ${r} 0 ${besar} 0 ${px(phi2)} ${py(phi2)}`, "none", warna, { tebal: 1.8, ...o });
}

/** Kipas lipat terbuka: juring dari phi1 ke phi2 (berlawanan arah jarum jam), jari-jari r. Id `${id}-f`. */
export function kipas(id: string, x: number, y: number, r: number, phi1: number, phi2: number, warna: string, o: Opsi = {}): Obj {
  const p1 = polar(0, 0, r, phi1);
  const p2 = polar(0, 0, r, phi2);
  const besar = phi2 - phi1 > 180 ? 1 : 0;
  return jalur(`${id}-f`, x, y, `M0 0 L${p1[0]} ${p1[1]} A${r} ${r} 0 ${besar} 0 ${p2[0]} ${p2[1]} Z`, warna, W.biru, { tebal: 1.6, ...o });
}

/** Empat kipas sejajar, simetris ke atas, dengan label "Kipas n". Id `${id}{n}-f` dan `${id}{n}-l`. */
export function barisKipas(id: string, besar: number[], y: number, r: number, warna: string[], o: Opsi = {}): Obj[] {
  const lebar = 300 / besar.length;
  return besar.flatMap((b, i) => {
    const cx = lebar * (i + 0.5);
    return [kipas(`${id}${i + 1}`, cx, y, r, 90 - b / 2, 90 + b / 2, warna[i % warna.length], o), teks(`${id}${i + 1}-l`, cx, y + 13, `Kipas ${i + 1}`, 8.4, W.biru, o)];
  });
}

/**
 * Busur derajat setengah lingkaran dengan titik pusat (x, y), jari-jari R, garis dasar mendatar.
 * Skala luar: nol di kanan sampai 180 di kiri. Skala dalam: nol di kiri sampai 180 di kanan.
 * Id: `${id}-p` (badan), `${id}-gd` (garis dasar), `${id}-tp` (titik pusat), `${id}-tk{i}` (garis skala tiap 10 derajat),
 * `${id}-lo{j}` (angka skala luar tiap 30 derajat), `${id}-li{j}` (angka skala dalam).
 */
export function busurDerajat(id: string, x: number, y: number, R: number, o: Opsi = {}): Obj[] {
  const out: Obj[] = [jalur(`${id}-p`, x, y, `M${-R} 0 A${R} ${R} 0 0 1 ${R} 0 Z`, W.kaca, W.biru, { tebal: 1.4, ...o })];
  for (let i = 0; i <= 18; i += 1) {
    const besar = i % 3 === 0;
    const dalam = polar(0, 0, R - (besar ? 8 : 4), i * 10);
    const luar = polar(0, 0, R, i * 10);
    out.push(garis(`${id}-tk${i}`, x + luar[0], y + luar[1], bulatkan(dalam[0] - luar[0]), bulatkan(dalam[1] - luar[1]), W.biru, besar ? 1.1 : 0.7, o));
  }
  for (let j = 0; j <= 6; j += 1) {
    const luar = polar(x, y, R - 14, j * 30);
    const dalam = polar(x, y, R - 25, j * 30);
    out.push(teks(`${id}-lo${j}`, luar[0], luar[1] + 2, String(j * 30), 5.4, W.hitam, o));
    out.push(teks(`${id}-li${j}`, dalam[0], dalam[1] + 2, String(180 - j * 30), 5.4, W.ungu, o));
  }
  out.push(garis(`${id}-gd`, x - R - 5, y, 2 * R + 10, 0, W.hitam, 1.4, o));
  out.push(bulat(`${id}-tp`, x, y, 2.4, W.merah, W.merah, { tebal: 1, ...o }));
  return out;
}

/** Badan busur derajat yang diputar sebesar rot derajat (tanpa skala): setengah lingkaran dan garis dasarnya. Id `${id}-p` dan `${id}-gd`. */
export function busurPutar(id: string, x: number, y: number, R: number, rot: number, o: Opsi = {}): Obj[] {
  const kiri = polar(0, 0, R, rot + 180);
  const kanan = polar(0, 0, R, rot);
  const ujungKiri = polar(0, 0, R + 5, rot + 180);
  const ujungKanan = polar(0, 0, R + 5, rot);
  return [
    jalur(`${id}-p`, x, y, `M${kiri[0]} ${kiri[1]} A${R} ${R} 0 0 1 ${kanan[0]} ${kanan[1]} Z`, W.kaca, W.biru, { tebal: 1.4, ...o }),
    garis(`${id}-gd`, x + ujungKiri[0], y + ujungKiri[1], bulatkan(ujungKanan[0] - ujungKiri[0]), bulatkan(ujungKanan[1] - ujungKiri[1]), W.hitam, 1.4, o),
    bulat(`${id}-tp`, x, y, 2.4, W.merah, W.merah, { tebal: 1, ...o }),
  ];
}

/**
 * Jam analog berpusat di (x, y) berjari-jari r. Jarum pendek (jam) `${id}-jp`, jarum panjang (menit) `${id}-jm`,
 * muka jam `${id}-c`, pusat `${id}-o`, angka `${id}-d{n}`. Jarum pendek bergeser setengah derajat per menit.
 */
export function jam(id: string, x: number, y: number, r: number, jamKe: number, menit: number, o: Opsi = {}): Obj[] {
  const out: Obj[] = [bulat(`${id}-c`, x, y, r, W.putih, W.biru, { tebal: 1.6, ...o })];
  const u = Math.max(4.6, r * 0.22);
  for (let n = 1; n <= 12; n += 1) {
    const a = rad(n * 30);
    out.push(teks(`${id}-d${n}`, bulatkan(x + r * 0.78 * Math.sin(a)), bulatkan(y - r * 0.78 * Math.cos(a) + u * 0.35), String(n), u, W.hitam, o));
  }
  const sudutPendek = rad((jamKe % 12) * 30 + menit * 0.5);
  const sudutPanjang = rad(menit * 6);
  const panjangPendek = bulatkan(r * 0.46);
  const panjangPanjang = bulatkan(r * 0.64);
  out.push(garis(`${id}-jp`, x, y, bulatkan(panjangPendek * Math.sin(sudutPendek)), bulatkan(-panjangPendek * Math.cos(sudutPendek)), W.hijau, 2.8, o));
  out.push(garis(`${id}-jm`, x, y, bulatkan(panjangPanjang * Math.sin(sudutPanjang)), bulatkan(-panjangPanjang * Math.cos(sudutPanjang)), W.merah, 1.8, o));
  out.push(bulat(`${id}-o`, x, y, 1.8, W.hitam, W.hitam, { tebal: 1, ...o }));
  return out;
}

/** Busur penanda sudut terkecil antara jarum pendek dan jarum panjang pada jam analog berpusat di (x, y). Id `${id}-w`. */
export function busurJam(id: string, x: number, y: number, rBusur: number, jamKe: number, menit: number, warna: string, o: Opsi = {}): Obj {
  const pendek = 90 - ((jamKe % 12) * 30 + menit * 0.5);
  const panjang = 90 - menit * 6;
  const selisih = (((pendek - panjang) % 360) + 360) % 360;
  const awal = selisih <= 180 ? panjang : pendek;
  const lebar = selisih <= 180 ? selisih : 360 - selisih;
  return busurSudut(id, x, y, rBusur, awal, awal + lebar, warna, o);
}

/** Tanda siku-siku pada titik sudut (x, y) yang kakinya mengarah ke phi1 dan phi1 + 90. Id seperti pada `tandaSiku`. */
export function tandaSiku(id: string, x: number, y: number, s: number, phi1: number, warna: string = W.merah, o: Opsi = {}): Obj {
  const a = polar(0, 0, s, phi1);
  const c = polar(0, 0, s, phi1 + 90);
  const b = [bulatkan(a[0] + c[0]), bulatkan(a[1] + c[1])];
  return jalur(id, x, y, `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]}`, "none", warna, { tebal: 1.8, ...o });
}

/** Tanda benar dan salah dalam teks. */
export const BENAR = "✓";
export const SALAH = "✗";
