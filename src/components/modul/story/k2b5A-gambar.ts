import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 5 Sub-Bab A (Setengah dari Benda Utuh): benda di layar yang dibagi dua dengan garis potong.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari koordinat; luas bagian dihitung dari lintasan, bukan dari kata):
 * - Benda ke-n yang dibagi: `bn${n}-w` (benda utuh, jalur tertutup), `bn${n}-a` dan `bn${n}-b` (dua bagian hasil garis potong), `bn${n}-gp` (garis potong).
 *   Bagian digeser dengan x dan y jalur (tidak mengubah lintasan). Lipatan: `bn${n}-c` = bagian b yang dipantulkan terhadap garis potong.
 * - Tulisan penanda: `bn${n}-ha` dan `bn${n}-hb` (isi: setengah, besar, atau kecil), `bn${n}-hs` (hasil: setengah atau bukan setengah), `bn${n}-lp` (pas atau tidak pas).
 * - Gelas air: `gl${n}-w` (gelas), `gl${n}-a` (air), tulisan hasil `gl${n}-hs`.
 * - Pilihan jawaban: kartu `c1..c3` (`c${q}-k`, `c${q}-t`), satu disorot bila dipilih.
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
  air: "#60A5FA",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2.6, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */
export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak berupa kepala bulat berpusat di (cx, cy), badan, dan nama. Id `an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`an-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8 }),
    kotak(`an-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`an-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}

/* ------------------------------ Geometri: lintasan, luas, potong, pantul ------------------------------ */
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

/** Persegi panjang sebagai daftar titik sudut. */
export const persegiPanjang = (x: number, y: number, w: number, h: number): Titik[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];
/** Lingkaran sebagai segi banyak halus (empat puluh titik, tiap sembilan derajat). */
export const lingkaranPoli = (cx: number, cy: number, r: number): Titik[] =>
  Array.from({ length: 40 }, (_, i) => [bulatkan(cx + r * Math.cos((i * Math.PI) / 20)), bulatkan(cy + r * Math.sin((i * Math.PI) / 20))] as Titik);
/** Segitiga siku-siku atau segitiga sembarang dari tiga titik. */
export const segitiga = (a: Titik, b: Titik, c: Titik): Titik[] => [a, b, c];

export const luasPoli = (p: Titik[]): number => Math.abs(p.reduce((t, [x, y], i) => t + x * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * y, 0)) / 2;
const sisi = (a: Titik, b: Titik, t: Titik): number => (b[0] - a[0]) * (t[1] - a[1]) - (b[1] - a[1]) * (t[0] - a[0]);

/** Potong segi banyak cembung dengan garis lurus melalui a dan b: dua bagian (sisi kiri garis a ke b, dan sisi kanannya). */
export function potongPoli(poli: Titik[], a: Titik, b: Titik): [Titik[], Titik[]] {
  const bagi = (arah: 1 | -1): Titik[] => {
    const hasil: Titik[] = [];
    for (let i = 0; i < poli.length; i += 1) {
      const p = poli[i];
      const q = poli[(i + 1) % poli.length];
      const sp = arah * sisi(a, b, p);
      const sq = arah * sisi(a, b, q);
      if (sp >= -1e-9) hasil.push(p);
      if ((sp > 1e-9 && sq < -1e-9) || (sp < -1e-9 && sq > 1e-9)) {
        const u = sp / (sp - sq);
        hasil.push([bulatkan(p[0] + u * (q[0] - p[0])), bulatkan(p[1] + u * (q[1] - p[1]))]);
      }
    }
    return hasil;
  };
  return [bagi(1), bagi(-1)];
}
/** Pantulan titik terhadap garis melalui a dan b. */
export function pantul(p: Titik, a: Titik, b: Titik): Titik {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  const fx = a[0] + t * dx;
  const fy = a[1] + t * dy;
  return [bulatkan(2 * fx - p[0]), bulatkan(2 * fy - p[1])];
}
const lintasan = (p: Titik[]): string => `M${p.map(([x, y]) => `${bulatkan(x)} ${bulatkan(y)}`).join(" L")} Z`;

/** Jalur tertutup (koordinat mutlak, x dan y jalur 0). */
export const jalur = (id: string, poli: Titik[], warna: string, o: Opsi = {}): Obj => ({ id, t: "jalur", x: 0, y: 0, d: lintasan(poli), warna, garis: W.biru, tebal: 1.8, ...o });

export const WARNA_BAGIAN = { a: "#FCA5A5", b: "#93C5FD" };

/** Benda utuh, dua bagian, dan garis potong untuk benda ke-n. `warna` = warna benda utuh. Garis potong berujung di tepi benda. */
export function bendaBagi(n: number, poli: Titik[], a: Titik, b: Titik, warna: string = "#FDE68A", warnaA: string = WARNA_BAGIAN.a, warnaB: string = WARNA_BAGIAN.b): { w: Obj; a: Obj; b: Obj; gp: Obj; titikA: Titik[]; titikB: Titik[] } {
  const [kiri, kanan] = potongPoli(poli, a, b);
  const ujung = kiri.filter((p) => kanan.some((q) => q[0] === p[0] && q[1] === p[1]));
  const [u1, u2] = ujung.length === 2 ? ujung : [a, b];
  return {
    w: jalur(`bn${n}-w`, poli, warna, { tebal: 2.2 }),
    a: jalur(`bn${n}-a`, kiri, warnaA, { z: 1 }),
    b: jalur(`bn${n}-b`, kanan, warnaB, { z: 1 }),
    gp: garis(`bn${n}-gp`, u1[0], u1[1], bulatkan(u2[0] - u1[0]), bulatkan(u2[1] - u1[1]), W.merah, 2.4, { putus: true, z: 3 }),
    titikA: kiri,
    titikB: kanan,
  };
}

/** Pusat massa segi banyak (rata-rata titik sudut). */
export const pusatPoli = (p: Titik[]): Titik => [p.reduce((t, q) => t + q[0], 0) / p.length, p.reduce((t, q) => t + q[1], 0) / p.length];
/** Pusat bagian a dan b (untuk menaruh tulisan di tengah bagian). */
export const pusatBagian = (poli: Titik[], a: Titik, b: Titik): [Titik, Titik] => {
  const [kiri, kanan] = potongPoli(poli, a, b);
  return [pusatPoli(kiri), pusatPoli(kanan)];
};

/** Menggeser dua bagian saling menjauh tegak lurus garis potong sejauh `jarak` (bagian a ke arah sisi kirinya). */
export function tarik(n: number, a: Titik, b: Titik, jarak: number): { id: string; x: number; y: number }[] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy);
  // normal sisi "kiri" (sisi > 0 pada fungsi sisi): (dy, -dx) / l
  const nx = dy / l;
  const ny = -dx / l;
  return [
    { id: `bn${n}-a`, x: bulatkan(nx * jarak), y: bulatkan(ny * jarak) },
    { id: `bn${n}-b`, x: bulatkan(-nx * jarak), y: bulatkan(-ny * jarak) },
  ];
}
/** Mengembalikan dua bagian ke tempat semula. */
export const rapatkan = (n: number): { id: string; x: number; y: number }[] => [
  { id: `bn${n}-a`, x: 0, y: 0 },
  { id: `bn${n}-b`, x: 0, y: 0 },
];

/** Bagian b dipantulkan terhadap garis potong (hasil melipat). Id `bn${n}-c`. */
export function lipatan(n: number, titikB: Titik[], a: Titik, b: Titik, warna: string = WARNA_BAGIAN.b): Obj {
  return jalur(`bn${n}-c`, titikB.map((t) => pantul(t, a, b)), warna, { op: 0.8, z: 2, tebal: 1.8 });
}

/** Gelas air: gelas `gl${n}-w` (kotak) dan air `gl${n}-a` (kotak, sama lebar, menempel dasar gelas). `isi` = tinggi air dibanding tinggi gelas (0 sampai 1). */
export function gelasAir(n: number, x: number, y: number, w: number, h: number, isi: number): Obj[] {
  const tinggi = bulatkan(h * isi);
  return [
    kotak(`gl${n}-a`, x, bulatkan(y + h - tinggi), w, tinggi, W.air, W.biru, { rx: 2, tebal: 1.2, z: 1 }),
    kotak(`gl${n}-w`, x, y, w, h, "none", W.biru, { rx: 4, tebal: 2.4, z: 2 }),
  ];
}

/** Tulisan di tengah bagian a dan b (ikut bergeser bila bagian ditarik sejauh `jarak`). Id `bn${n}-ha` dan `bn${n}-hb`. */
export function labelBagian(n: number, poli: Titik[], a: Titik, b: Titik, isiA: string, isiB: string, jarak = 0, u = 8.6): Obj[] {
  const [pa, pb] = pusatBagian(poli, a, b);
  const g = tarik(n, a, b, jarak);
  return [
    teks(`bn${n}-ha`, bulatkan(pa[0] + g[0].x), bulatkan(pa[1] + g[0].y + u * 0.35), isiA, u, W.biru, { z: 4 }),
    teks(`bn${n}-hb`, bulatkan(pb[0] + g[1].x), bulatkan(pb[1] + g[1].y + u * 0.35), isiB, u, W.biru, { z: 4 }),
  ];
}
/** Tulisan hasil benda ke-n (setengah, bukan setengah, sama besar, tidak sama besar, utuh). Id `bn${n}-hs`. */
export const hasilBagi = (n: number, x: number, y: number, isi: string, u = 9.4, warna: string = W.merah): Obj => teks(`bn${n}-hs`, x, y, isi, u, warna, { z: 4 });
/** Tulisan hasil lipat: pas atau tidak pas. Id `bn${n}-lp`. */
export const hasilLipat = (n: number, x: number, y: number, isi: string, u = 11, warna: string = W.merah): Obj => teks(`bn${n}-lp`, x, y, isi, u, warna, { z: 4 });
/** Tulisan tinggi air gelas ke-n: setengah, lebih, atau kurang. Id `gl${n}-hs`. */
export const hasilGelas = (n: number, x: number, y: number, isi: string, u = 9.4, warna: string = W.merah): Obj => teks(`gl${n}-hs`, x, y, isi, u, warna, { z: 4 });
/** Titik tengah benda utuh (penanda). Id `bn${n}-pt`. */
export const titikTengah = (n: number, poli: Titik[]): Obj => {
  const [x, y] = pusatPoli(poli);
  return bulat(`bn${n}-pt`, bulatkan(x), bulatkan(y), 2.6, W.merah, W.biru, { tebal: 1, z: 4 });
};
