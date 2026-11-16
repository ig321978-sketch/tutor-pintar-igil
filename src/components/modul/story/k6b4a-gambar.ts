import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 4 Sub-Bab A (Skala Peluang), dirancang untuk isi sub-bab ini.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  salem: "#F97316",
  biruMuda: "#3B82F6",
  kuning: "#FACC15",
  hijau: "#22C55E",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  krem: "#FFF7CC",
  ungu: "#8B5CF6",
  coklat: "#A16207",
  langit: "#BFDBFE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.5, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Balon kata dengan isi satu atau dua baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 6.4, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 2.2) + 5;
  return [
    kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 5, ...o }),
    ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 3 + (i + 1) * (u + 1.6), b, u, W.biru, o)),
  ];
}

/* ------------------------------ Skala peluang (garis bertanda lima titik) ------------------------------ */

export const NAMA_TANGGA = [["Tidak", "mungkin"], ["Kurang", "mungkin"], ["Mungkin"], ["Sangat", "mungkin"], ["Pasti"]];
const WARNA_TANGGA = ["#FECACA", "#FED7AA", "#D9F99D", "#A5F3FC", "#BFDBFE"];

/** Titik x tiap tangga pada skala yang dimulai di x dan selebar w. */
export const titikSkala = (x: number, w: number): number[] => [0, 1, 2, 3, 4].map((i) => x + (w * i) / 4);

/** Skala: balon nama tangga di atas, garis dengan lima tanda di bawahnya. Balon muncul satu per satu lewat id `${p}-b${i}-*`. */
export function skala(p: string, x: number, y: number, w: number): { semua: Obj[]; balonDi: (i: number) => Obj[]; garisSkala: Obj[]; xs: number[] } {
  const xs = titikSkala(x, w);
  const lebar = Math.min(46, w / 4 - 4);
  const balonDi = (i: number) => balon(`${p}-b${i}`, xs[i], y, NAMA_TANGGA[i], lebar, WARNA_TANGGA[i]);
  const g: Obj[] = [garis(`${p}-g`, x, y + 24, w, 0, W.biru, 2, { gambar: true }), ...xs.map((xi, i) => garis(`${p}-s${i}`, xi, y + 20, 0, 8, W.biru, 2))];
  return { semua: [...[0, 1, 2, 3, 4].flatMap(balonDi), ...g], balonDi, garisSkala: g, xs };
}

/* ------------------------------ Benda cerita Dhien ------------------------------ */

/** Rumah dengan atap, pintu, dan jendela; (x, y) pojok kiri atas dinding. */
export function rumah(p: string, x: number, y: number): Obj[] {
  return [
    kotak(`${p}-dinding`, x, y, 70, 46, "#FDE68A", W.biru),
    jalur(`${p}-atap`, x, y, "M-6 0 L35 -26 L76 0 Z", W.merah),
    kotak(`${p}-pintu`, x + 28, y + 22, 14, 24, W.coklat),
    kotak(`${p}-jendela`, x + 8, y + 10, 14, 12, W.langit),
    kotak(`${p}-jendela2`, x + 48, y + 10, 14, 12, W.langit),
  ];
}

/** Retakan zig-zag pada dinding rumah. */
export const retakan = (p: string, x: number, y: number): Obj => jalur(`${p}-retak`, x, y, "M0 0 L5 9 L-2 16 L6 26 L0 36", "none", W.merah, { tebal: 2.5, gambar: true });

/** Termometer dengan isi merah setinggi `isi` (0 sampai 40). */
export function termometer(p: string, x: number, y: number, isi: number): Obj[] {
  return [kotak(`${p}-tabung`, x, y, 12, 48, W.putih, W.biru, { rx: 6 }), kotak(`${p}-isi`, x + 3, y + 46 - isi, 6, isi, W.merah, "none", { rx: 3 }), bulat(`${p}-bola`, x + 6, y + 52, 8, W.merah)];
}

/* ------------------------------ Buku dan pakaian ------------------------------ */

export type Buku = { warna: string; n: number };

/** Rak buku: deretan buku berdiri, tiap buku 11 x 30. Mengembalikan benda dan id tiap buku. */
export function rakBuku(p: string, x: number, y: number, isi: Buku[], lebar = 11): { objs: Obj[]; ids: string[][] } {
  const objs: Obj[] = [kotak(`${p}-papan`, x - 4, y + 30, isi.reduce((a, b) => a + b.n, 0) * (lebar + 2) + 8, 6, W.coklat)];
  const ids: string[][] = [];
  let i = 0;
  for (const g of isi) {
    const grup: string[] = [];
    for (let j = 0; j < g.n; j += 1) {
      const id = `${p}-buku${i}`;
      objs.push(kotak(id, x + i * (lebar + 2), y + (i % 3 === 0 ? 2 : 0), lebar, 30 - (i % 3 === 0 ? 2 : 0), g.warna, W.biru, { rx: 1.5 }));
      grup.push(id);
      i += 1;
    }
    ids.push(grup);
  }
  return { objs, ids };
}

/** Kemeja kecil (badan dan lengan) berwarna, titik tengah (cx, y). */
export function kemeja(id: string, cx: number, y: number, warna: string, o: Opsi = {}): Obj {
  return jalur(id, cx, y, "M-10 0 L-16 6 L-12 12 L-8 9 L-8 24 L8 24 L8 9 L12 12 L16 6 L10 0 Q0 5 -10 0 Z", warna, W.biru, o);
}

/* ------------------------------ Dadu, bola, roda, batang ------------------------------ */

export function dadu(id: string, x: number, y: number, angka: string, warna: string = W.putih, ukuran = 16, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, ukuran, ukuran, warna, W.biru, { rx: 3, ...o }), teks(`${id}-t`, x + ukuran / 2, y + ukuran * 0.72, angka, ukuran * 0.62, W.biru, o)];
}

/** Sektor lingkaran sebagai lintasan relatif terhadap pusat (0, 0). Sudut dalam derajat, 0 = atas, searah jarum jam. */
export function sektor(r: number, dari: number, ke: number): string {
  const rad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x0 = r * Math.cos(rad(dari));
  const y0 = r * Math.sin(rad(dari));
  const x1 = r * Math.cos(rad(ke));
  const y1 = r * Math.sin(rad(ke));
  return `M0 0 L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${ke - dari > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

/** Roda putar dengan juring berwarna sama besar. `juring` berisi warna tiap juring. */
export function roda(p: string, cx: number, cy: number, r: number, juring: string[], o: Opsi = {}): Obj[] {
  const sudut = 360 / juring.length;
  return juring.map((w, i) => jalur(`${p}-j${i}`, cx, cy, sektor(r, i * sudut, (i + 1) * sudut), w, W.biru, { ...o }));
}

/** Batang vertikal: dasar di y, tinggi `h` (bisa berubah lewat ubah). */
export const batang = (id: string, x: number, y: number, lebar: number, h: number, warna: string, o: Opsi = {}): Obj => kotak(id, x, y - h, lebar, h, warna, W.biru, { rx: 2, ...o });

/** Perlu posisi y atas batang saat tinggi berubah: kembalikan perubahan tinggi dan y. */
export const ubahBatang = (id: string, y: number, h: number): Partial<Obj> & { id: string } => ({ id, y: y - h, h });

/* ------------------------------ Kontinum, tas bola, timbangan (video metode luar) ------------------------------ */

const campur = (a: string, b: string, f: number): string => {
  const [r1, g1, b1] = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const [r2, g2, b2] = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const h = (v: number) => Math.round(v).toString(16).padStart(2, "0");
  return `#${h(r1 + (r2 - r1) * f)}${h(g1 + (g2 - g1) * f)}${h(b1 + (b2 - b1) * f)}`;
};

/** Garis kontinum bersambung: 30 irisan warna dari merah muda (mustahil) ke biru (pasti). */
export function kontinum(p: string, x: number, y: number, w: number, h: number): Obj[] {
  return Array.from({ length: 30 }, (_, i) => kotak(`${p}-i${i}`, x + (w / 30) * i, y, w / 30 + 0.6, h, campur("#FECACA", "#93C5FD", i / 29), "none", { rx: 0 }));
}

/** Penunjuk segitiga di atas kontinum pada pecahan `f` (0 sampai 1) dari lebar w. Letak dihitung dari k dan n yang bulat. */
export const penunjuk = (id: string, x: number, w: number, y: number, k: number, n: number, warna: string = W.merah): Obj => jalur(id, x + (w * k) / n, y, "M0 0 L-6 -10 L6 -10 Z", warna, W.biru);
export const letakPenunjuk = (x: number, w: number, k: number, n: number): number => x + (w * k) / n;

/** Tas berisi n bola dalam dua baris; bola ke-i berwarna `warna[i]`. */
export function tasBola(p: string, x: number, y: number, warna: string[]): Obj[] {
  const perBaris = Math.ceil(warna.length / 2);
  return [
    kotak(`${p}-tas`, x - 8, y - 12, perBaris * 20 + 10, 56, "#FDE68A", W.coklat, { rx: 10, tebal: 2 }),
    ...warna.map((w, i) => bulat(`${p}-b${i}`, x + 8 + (i % perBaris) * 20, y + 6 + Math.floor(i / perBaris) * 22, 8, w)),
  ];
}

/** Dua batang timbangan: kiri dua kali k, kanan n (tinggi sebanding, satuan 10 piksel). */
export function bandingBatang(p: string, x: number, dasar: number, a: number, b: number, labelA: string, labelB: string): Obj[] {
  return [
    batang(`${p}-a`, x, dasar, 34, a * 10, "#FDBA74"),
    teks(`${p}-an`, x + 17, dasar - a * 10 - 4, String(a), 10),
    teks(`${p}-al`, x + 17, dasar + 11, labelA, 7),
    batang(`${p}-b`, x + 60, dasar, 34, b * 10, "#93C5FD"),
    teks(`${p}-bn`, x + 77, dasar - b * 10 - 4, String(b), 10),
    teks(`${p}-bl`, x + 77, dasar + 11, labelB, 7),
  ];
}
