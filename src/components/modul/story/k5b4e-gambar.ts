import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 4 Sub-Bab E (keliling bangun gabungan): denah rumah Eksplorasi 4.5, bangun Uji Kompetensi, soal pengayaan,
 * dan contoh miskonsepsi Panduan Guru. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  kayu: "#D6A15B",
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
    b.forEach((isi, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (isi) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, isi, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/* ------------------------------ Bangun datar umum ------------------------------ */

export type Titik = [number, number];
const f1 = (n: number): string => n.toFixed(1);

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/** Perbesar titik-titik: p kali s. */
export const skala = (p: Titik[], s: number): Titik[] => p.map(([x, y]) => [x * s, y * s]);

/** Panjang keliling bangun dari titik-titik (jumlah jarak antar titik berurutan). */
export const kelilingTitik = (p: Titik[]): number => p.reduce((t, a, i) => t + Math.hypot(p[(i + 1) % p.length][0] - a[0], p[(i + 1) % p.length][1] - a[1]), 0);

/* ------------------------------ Denah rumah Eksplorasi 4.5 (Buku Siswa hlm. 126; Panduan Guru hlm. 163 sampai 165) ------------------------------ */

/**
 * Titik sudut dinding terluar denah, huruf Cara Asep, dalam meter. Sumbu x ke kanan, sumbu y ke ATAS (kiri-bawah ruang tamu = (0, 0)).
 * Dirancang dari kunci Panduan Guru: AB = AO - CD = 8 - 6 = 2, MN = AB, JD = 12, IE = HF = 8, JI + ED = 4, keliling 48.
 */
export const TITIK_DENAH: Record<string, Titik> = {
  A: [-2, 4],
  B: [0, 4],
  C: [0, 0],
  D: [6, 0],
  E: [6, 2],
  F: [10, 2],
  G: [10, 6],
  H: [10, 10],
  I: [6, 10],
  J: [6, 12],
  K: [4, 12],
  L: [0, 12],
  M: [0, 8],
  N: [-2, 8],
};
/** Titik bantu pada denah (bukan sudut terluar): O dan P pada garis x = 6 yang dipakai Cara Asep, A O P N membentuk persegi panjang. */
export const TITIK_EKSTRA: Record<string, Titik> = { O: [6, 4], P: [6, 8] };
/** Tiga persegi panjang Cara Komang [x1, y1, x2, y2]: kiri 2 kali 4, tengah 6 kali 12 (buku: 12m × 6m), kanan 4 kali 8 (buku: 8m × 4m). */
export const KOMANG_RECT: Record<string, [number, number, number, number]> = { kiri: [-2, 4, 0, 8], tengah: [0, 0, 6, 12], kanan: [6, 2, 10, 10] };
/** Urutan keliling A sampai N kembali ke A. */
export const URUT_DENAH = "ABCDEFGHIJKLMN".split("");
/** Nama sisi, dua huruf berurutan: AB, BC, ..., NA. */
export const SISI_DENAH: string[] = URUT_DENAH.map((h, i) => `${h}${URUT_DENAH[(i + 1) % 14]}`);
/** Panjang sisi dinding terluar menurut titik denah. */
export const PANJANG_SISI: Record<string, number> = Object.fromEntries(SISI_DENAH.map((n) => [n, Math.hypot(TITIK_DENAH[n[1]][0] - TITIK_DENAH[n[0]][0], TITIK_DENAH[n[1]][1] - TITIK_DENAH[n[0]][1])]));

/** Titik denah atau titik bantu (O, P) menurut huruf. */
export const titik = (h: string): Titik => TITIK_DENAH[h] ?? TITIK_EKSTRA[h];

/** Arah luar tiap sisi (dalam koordinat layar: x kanan, y bawah). */
export const LUAR_SISI: Record<string, Titik> = {
  AB: [0, 1],
  BC: [-1, 0],
  CD: [0, 1],
  DE: [1, 0],
  EF: [0, 1],
  FG: [1, 0],
  GH: [1, 0],
  HI: [0, -1],
  IJ: [1, 0],
  JK: [0, -1],
  KL: [0, -1],
  LM: [-1, 0],
  MN: [0, -1],
  NA: [-1, 0],
};

/** Ruangan pada denah: kotak [x1, y1, x2, y2] dalam meter, ukuran menurut Buku Siswa hlm. 126. */
export const RUANG_DENAH: Record<string, { r: [number, number, number, number]; nama: string; ukuran: string; warna: string }> = {
  tamu: { r: [0, 0, 6, 4], nama: "R. Tamu", ukuran: "6 × 4", warna: W.langit },
  keluarga: { r: [-2, 4, 6, 8], nama: "R. Keluarga", ukuran: "8 × 4", warna: W.hijauMuda },
  dapur: { r: [0, 8, 4, 12], nama: "Dapur", ukuran: "4 × 4", warna: W.jingga },
  mandi: { r: [4, 8, 6, 12], nama: "K. Mandi", ukuran: "2 × 4", warna: W.pink },
  kamarA: { r: [6, 6, 10, 10], nama: "Kamar", ukuran: "4 × 4", warna: W.krem },
  kamarB: { r: [6, 2, 10, 6], nama: "Kamar", ukuran: "4 × 4", warna: W.merahMuda },
};

/** Titik layar dari titik meter: pojok kiri-atas denah di (ox, oy), s piksel per meter. */
export const layar = (ox: number, oy: number, s: number, [x, y]: Titik): Titik => [ox + (x + 2) * s, oy + (12 - y) * s];

/** Semua ruangan denah sebagai kotak berwarna, id `${id}-${kode}`. */
export function denahRuang(id: string, ox: number, oy: number, s: number, kode: string[] = Object.keys(RUANG_DENAH), o: Opsi = {}): Obj[] {
  return kode.map((k) => {
    const [x1, y1, x2, y2] = RUANG_DENAH[k].r;
    const [lx, ly] = layar(ox, oy, s, [x1, y2]);
    return kotak(`${id}-${k}`, lx, ly, (x2 - x1) * s, (y2 - y1) * s, RUANG_DENAH[k].warna, W.biru, { rx: 0, tebal: 0.8, ...o });
  });
}

/** Nama ruangan dan ukurannya sebagai teks di tengah tiap ruangan, id `${id}-${kode}-n` dan `-u`. */
export function denahNama(id: string, ox: number, oy: number, s: number, kode: string[] = Object.keys(RUANG_DENAH), u = 6.2, denganUkuran = true): Obj[] {
  const out: Obj[] = [];
  for (const k of kode) {
    const { r, nama, ukuran } = RUANG_DENAH[k];
    const [cx, cy] = layar(ox, oy, s, [(r[0] + r[2]) / 2, (r[1] + r[3]) / 2]);
    out.push(teks(`${id}-${k}-n`, cx, cy - (denganUkuran ? 1 : -2), nama, u, W.biru));
    if (denganUkuran) out.push(teks(`${id}-${k}-u`, cx, cy + u + 1, ukuran, u, W.biru));
  }
  return out;
}

/** Garis tepi denah (dinding terluar) sebagai satu jalur tertutup tanpa isi. */
export function denahTepi(id: string, ox: number, oy: number, s: number, warna: string = W.merah, tebal = 2.2, o: Opsi = {}): Obj {
  const p = URUT_DENAH.map((h) => {
    const [lx, ly] = layar(ox, oy, s, TITIK_DENAH[h]);
    return [lx - ox, ly - oy] as Titik;
  });
  return poligon(id, ox, oy, p, "none", warna, { tebal, ...o });
}

/** Satu sisi dinding terluar (mis. "AB") sebagai garis berwarna, id sesuai parameter. */
export function denahSisi(id: string, ox: number, oy: number, s: number, nama: string, warna: string = W.merah, tebal = 3.2, o: Opsi = {}): Obj {
  const [x1, y1] = layar(ox, oy, s, titik(nama[0]));
  const [x2, y2] = layar(ox, oy, s, titik(nama[1]));
  return garis(id, x1, y1, x2 - x1, y2 - y1, warna, tebal, o);
}

/** Label panjang sisi di sebelah luar sisi, id sesuai parameter. */
export function denahLabel(id: string, ox: number, oy: number, s: number, nama: string, isi: string, u = 6.6, warna: string = W.biru, jauh = 7, o: Opsi = {}): Obj {
  const [x1, y1] = layar(ox, oy, s, titik(nama[0]));
  const [x2, y2] = layar(ox, oy, s, titik(nama[1]));
  const [dx, dy] = LUAR_SISI[nama];
  return teks(id, (x1 + x2) / 2 + dx * jauh, (y1 + y2) / 2 + dy * jauh + 2.2, isi, u, warna, o);
}

/** Huruf titik sudut denah, diletakkan menjauh dari pusat denah. Id `${id}-${huruf}`. */
export function denahHuruf(id: string, ox: number, oy: number, s: number, huruf: string[] = URUT_DENAH, u = 6.6, warna: string = W.merah, jauh = 6): Obj[] {
  const [px, py] = layar(ox, oy, s, [4, 6]);
  return huruf.map((h) => {
    const [x, y] = layar(ox, oy, s, TITIK_DENAH[h]);
    const vx = x - px;
    const vy = y - py;
    const n = Math.hypot(vx, vy) || 1;
    return teks(`${id}-${h}`, x + (vx / n) * jauh, y + (vy / n) * jauh + 2, h, u, warna);
  });
}

/** Bingkai persegi besar 12 kali 12 yang melingkupi denah (garis putus-putus), id sesuai parameter. */
export const denahBingkai = (id: string, ox: number, oy: number, s: number, warna: string = W.hijau, o: Opsi = {}): Obj => kotak(id, ox, oy, 12 * s, 12 * s, "none", warna, { rx: 0, tebal: 1.6, putus: true, ...o });

/* ------------------------------ Bangun Uji Kompetensi (Buku Siswa hlm. 130) dan soal pengayaan (Panduan Guru hlm. 173) ------------------------------ */

/** Soal 1: segitiga sama sisi, sisi 8 cm. Titik dalam cm, sumbu y ke bawah. */
export const UK1: Titik[] = [[0, Math.sqrt(48)], [8, Math.sqrt(48)], [4, 0]];
/** Soal 2: layang-layang ABCD, AB = AD = 6 cm dan CB = CD = 4 cm. Titik C (kiri), B (atas), A (kanan), D (bawah). */
export const UK2 = { C: [0, 0] as Titik, B: [2, -3.464] as Titik, A: [6.899, 0] as Titik, D: [2, 3.464] as Titik };
/** Soal 3: segi delapan beraturan, sisi 10 cm. */
export const UK3: Titik[] = Array.from({ length: 8 }, (_, i): Titik => {
  const r = 10 / (2 * Math.sin(Math.PI / 8));
  const a = (Math.PI / 8) * (2 * i + 1);
  return [r * Math.sin(a), -r * Math.cos(a)];
});
/** Soal 4: jajargenjang (sisi 16 dan 12) digabung segitiga siku-siku 12, 16, 20. Urutan: kiri-atas, kanan-atas, kanan-bawah jajargenjang, ujung bawah, kiri. */
export const UK4: Titik[] = [[7.2, -9.6], [23.2, -9.6], [16, 0], [16, 12], [0, 0]];
/** Garis putus-putus 16 cm di dalam soal 4: dari titik kiri (0, 0) ke (16, 0). */
export const UK4_DALAM: [Titik, Titik] = [[0, 0], [16, 0]];
/** Soal 5: bangun L dengan lekukan, dalam cm. */
export const UK5: Titik[] = [[0, 0], [8, 0], [8, 3], [11, 3], [11, 6], [4, 6], [4, 12], [0, 12]];
/** Soal pengayaan: denah gedung sekolah dalam meter. Tinggi IA = 6 hanya gambar (kunci buku tidak memerlukannya). */
export const PENGAYAAN: Titik[] = [[0, 0], [24, 0], [24, 20], [12, 20], [12, 17], [15, 17], [15, 6], [0, 6]];
/** Huruf titik soal pengayaan (kunci Panduan Guru hlm. 173); F adalah titik bantu di dasar garis putus-putus. */
export const PENGAYAAN_HURUF: Record<string, Titik> = { I: [0, 0], H: [24, 0], G: [24, 20], F: [15, 20], E: [12, 20], D: [12, 17], C: [15, 17], B: [15, 6], A: [0, 6] };
/** Contoh miskonsepsi 1 (Panduan Guru hlm. 166): bangun tangga, bingkai 20 kali 12 cm. */
export const MISKON1: Titik[] = [[0, 0], [10, 0], [10, 3], [13, 3], [13, 6], [16, 6], [16, 9], [20, 9], [20, 12], [0, 12]];
/** Contoh miskonsepsi 2 (Panduan Guru hlm. 166 sampai 167): bingkai 18 kali 20 cm, AB = 12, FG = 3, CE = 9. */
export const MISKON2: Titik[] = [[0, 0], [18, 0], [18, 20], [9, 20], [9, 17], [12, 17], [12, 5], [0, 5]];

/** Keliling bangun dari titik, dibulatkan dua desimal. */
export const kelilingBulat = (p: Titik[]): number => Math.round(kelilingTitik(p) * 100) / 100;
