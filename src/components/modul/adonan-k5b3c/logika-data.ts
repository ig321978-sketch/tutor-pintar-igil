/**
 * Logika murni pecahan Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (pengurangan bilangan pecahan): KPK, pecahan biasa dan campuran,
 * pengurangan berpenyebut sama dan beda, pisah bulat dan pecahan, penyederhanaan, pengecoh yang masuk akal, dan tata letak bar loyang
 * (Concrete memakai kue beremoji, Pictorial memakai bar polos). Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-adonan-k5b3c.mjs.
 * Gambar DIGAMBAR sungguh sebanyak datanya: tiap bagian loyang punya kotak sendiri (tataGambar).
 */

/** Nama kue dan ikon emoji lama (tanpa ZWJ, paling tinggi U+1FA95). */
export const IKON_ROTI: Record<string, string> = { kue: "\u{1F370}", roti: "\u{1F35E}", panjang: "\u{1F956}", kering: "\u{1F36A}", ulang: "\u{1F382}", muffin: "\u{1F9C1}" };
export const NAMA_ROTI: readonly string[] = Object.keys(IKON_ROTI);
export const ikonRoti = (item: string): string => IKON_ROTI[item] ?? "\u{1F370}";

/* ------------------------------ Bilangan dasar ------------------------------ */
export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const kpk = (a: number, b: number): number => (a / gcd(a, b)) * b;

/** Pecahan campuran: `b` bilangan bulat, `p` pembilang, `q` penyebut (b = 0 berarti pecahan biasa). */
export type Bil = { b: number; p: number; q: number };
export const bil = (b: number, p: number, q: number): Bil => ({ b, p, q });
/** Ubah ke pecahan biasa: (bulat x penyebut) + pembilang, penyebut tetap. */
export const keBiasa = (x: Bil): { P: number; q: number } => ({ P: x.b * x.q + x.p, q: x.q });
/** Sederhanakan P per q: bagi pembilang dan penyebut dengan FPB-nya. */
export function sederhana(P: number, q: number): { P: number; q: number } {
  const g = gcd(P, q);
  return { P: P / g, q: q / g };
}
/** Pecahan biasa P per q menjadi campuran yang paling sederhana. */
export function campuranDari(P: number, q: number): Bil {
  const s = sederhana(P, q);
  const b = Math.floor(s.P / s.q);
  const sisa = s.P - b * s.q;
  return sisa === 0 ? { b, p: 0, q: 1 } : { b, p: sisa, q: s.q };
}
export const teksPec = (p: number, q: number): string => `${p}/${q}`;
/** Teks lambang: "3/4", "2 3/4", atau "2". */
export const teksBil = (x: Bil): string => (x.p === 0 ? `${x.b}` : x.b === 0 ? `${x.p}/${x.q}` : `${x.b} ${x.p}/${x.q}`);
/** Baca teks lambang kembali menjadi pecahan biasa (P per q); null bila bukan lambang pecahan. */
export function bacaTeks(t: string): { P: number; q: number } | null {
  const m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(t.trim());
  if (m) return { P: Number(m[1] ?? 0) * Number(m[3]) + Number(m[2]), q: Number(m[3]) };
  return /^\d+$/.test(t.trim()) ? { P: Number(t.trim()), q: 1 } : null;
}
/** Dua teks lambang berarti pecahan yang sama besar (silang kali). */
export function samaBesar(a: string, b: string): boolean {
  const x = bacaTeks(a);
  const y = bacaTeks(b);
  return !!x && !!y && x.P * y.q === y.P * x.q;
}

/* ------------------------------ Pengurangan ------------------------------ */
/** Pengurangan biasa x dikurangi y: penyebut disamakan dengan KPK, kedua pembilang diubah, lalu dikurangkan. Hasil disederhanakan menjadi campuran. */
export function selisihBiasa(x: Bil, y: Bil): { m: number; Px: number; Py: number; Pn: number; hasil: Bil } {
  const a = keBiasa(x);
  const c = keBiasa(y);
  const m = kpk(a.q, c.q);
  const Px = a.P * (m / a.q);
  const Py = c.P * (m / c.q);
  return { m, Px, Py, Pn: Px - Py, hasil: campuranDari(Px - Py, m) };
}
/** Pengurangan dengan memisah bulat dan pecahan (pecahan x harus tidak lebih kecil daripada pecahan y). B = bulat x dikurangi bulat y, n per m = pecahan x dikurangi pecahan y. */
export function selisihPisah(x: Bil, y: Bil): { B: number; m: number; n: number; hasil: Bil } {
  const m = kpk(x.q, y.q);
  const n = x.p * (m / x.q) - y.p * (m / y.q);
  const B = x.b - y.b;
  const s = sederhana(n, m);
  return { B, m, n, hasil: n === 0 ? { b: B, p: 0, q: 1 } : { b: B, p: s.P, q: s.q } };
}
/** Periksa dengan penjumlahan: hasil ditambah pecahan yang dikurangkan harus kembali ke pecahan semula. */
export function periksaTambah(x: Bil, y: Bil): boolean {
  const { m, Px, Py, Pn } = selisihBiasa(x, y);
  void m;
  return Pn + Py === Px;
}

/* ------------------------------ Pengecoh yang masuk akal ------------------------------ */
const unik = <T,>(d: T[]): T[] => d.filter((x, i, a) => a.indexOf(x) === i);
/** Pengecoh pecahan biasa yang beda besar dengan jawaban benar `benar`. */
const bedaBesar = (benar: string, kandidat: string[]): string[] => {
  const b = bacaTeks(benar);
  return unik(kandidat).filter((t) => {
    const c = bacaTeks(t);
    // Pengecoh tetap masuk akal: bila jawaban benar kurang dari satu, pengecoh juga kurang dari satu dan penyebutnya bukan satu.
    return t !== benar && !samaBesar(t, benar) && !(b && c && b.P < b.q && (c.P >= c.q || c.q < 2));
  });
};

/** igil: sisa `a - c` per `q`. Pengecoh: yang diambil saja, penyebut ikut dikurangi atau dijumlahkan, bagian terisi semula. */
export const pengecohIgil = (q: number, a: number, c: number): string[] => {
  const s = a - c;
  return bedaBesar(teksPec(s, q), [teksPec(c, q), q - c > 0 ? teksPec(s, q - c) : "", teksPec(s, q + c), teksPec(a, q)].filter(Boolean));
};
/** sama: kurangkan pembilang saja. Pengecoh: penyebut ikut dijumlahkan (kesalahan Fajar), pembilang dijumlahkan, penyebut ikut dikurangi, yang diambil saja. */
export const pengecohSama = (q: number, a: number, c: number): string[] => {
  const s = sederhana(a - c, q);
  return bedaBesar(teksPec(s.P, s.q), [teksPec(a - c, 2 * q), teksPec(a + c, q), q - c > 0 ? teksPec(a - c, q - c) : "", teksPec(c, q)].filter(Boolean));
};
/** Geser hasil sebesar `d` bagian (pembilang biasa), lalu sederhanakan: pengecoh yang dekat dengan jawaban benar. */
const geser = (h: Bil, d: number): string => {
  const a = keBiasa(h);
  return a.P + d > 0 ? teksBil(campuranDari(a.P + d, a.q)) : "";
};
/** samakan (pecahan biasa): lupa mengubah pembilang, atau penyebut dikurangkan, atau penyebut dikalikan tanpa KPK. */
export function pengecohSamakan(x: Bil, y: Bil): string[] {
  const r = selisihBiasa(x, y);
  const benar = teksBil(r.hasil);
  if (x.b > 0 || y.b > 0) {
    const h = r.hasil;
    return bedaBesar(benar, [teksBil({ ...h, b: h.b + 1 }), h.b > 0 ? teksBil({ ...h, b: h.b - 1 }) : "", geser(h, 1), geser(h, -1), teksPec(r.Pn, r.m)].filter(Boolean));
  }
  const a = keBiasa(x);
  const c = keBiasa(y);
  return bedaBesar(benar, [teksPec(a.P - c.P, r.m), geser(r.hasil, 1), a.q !== c.q ? teksPec(a.P - c.P, Math.abs(a.q - c.q)) : "", geser(r.hasil, -1), teksPec(a.P - c.P, a.q * c.q)].filter(Boolean));
}
/** pisah: bulat disalah hitung, pecahan lupa dipisah, atau bulat terlupa. */
export function pengecohPisah(x: Bil, y: Bil): string[] {
  const r = selisihPisah(x, y);
  const h = r.hasil;
  return bedaBesar(teksBil(h), [teksBil({ ...h, b: h.b + 1 }), geser(h, 1), h.b > 0 ? teksBil({ ...h, b: h.b - 1 }) : "", teksPec(h.p, h.q)].filter(Boolean));
}

/* ------------------------------ Tata letak bar loyang ------------------------------ */
/** Ukuran luas untuk tahap CPA: huruf dan emoji lebih besar supaya terbaca >= 10 px efektif saat gambar diperkecil di ponsel. */
export const BAR_LUAS = { lebar: 300, kiri: 14, panjang: 272, tinggiSel: 14, pitch: 18, atas: 32, labelTinggi: 17, maksTinggi: 230 } as const;
export const BAR = { lebar: 300, kiri: 14, panjang: 272, tinggiSel: 12, pitch: 16, atas: 28, labelTinggi: 13, maksTinggi: 200 } as const;
/** Satu bar (satu loyang) berisi `q` bagian sama besar: `isi` bagian berisi, lalu `coret` bagian dicoret, sisanya kosong. `jenis` "ambil" untuk bagian yang diambil. */
export type StripBar = { q: number; isi: number; coret: number; jenis?: "ada" | "ambil" };
export type RangkaianBar = { label: string; strip: StripBar[] };
export type SelBar = { x: number; y: number; w: number; h: number; status: "isi" | "coret" | "kosong" | "ambil"; strip: number; ke: number };
export type LabelBar = { x: number; y: number; teks: string };
export type TataGambar = { sel: SelBar[]; label: LabelBar[]; tinggi: number; strip: number };

/** Susun semua bar: label rangkaian di atas tiap rangkaian, bar-bar di bawahnya (tiap bagian punya kotak sendiri). */
export function tataGambar(rangkaian: RangkaianBar[], luas = false): TataGambar {
  const B = luas ? BAR_LUAS : BAR;
  const sel: SelBar[] = [];
  const label: LabelBar[] = [];
  let y = B.atas;
  let nomor = 0;
  for (const g of rangkaian) {
    if (g.label) {
      label.push({ x: B.kiri, y: y + (luas ? 12 : 10), teks: g.label });
      y += B.labelTinggi;
    }
    for (const s of g.strip) {
      const w = B.panjang / s.q;
      for (let j = 0; j < s.q; j += 1) {
        const status = j < s.isi ? (s.jenis === "ambil" ? "ambil" : "isi") : j < s.isi + s.coret ? "coret" : "kosong";
        sel.push({ x: B.kiri + j * w, y, w, h: B.tinggiSel, status, strip: nomor, ke: j });
      }
      nomor += 1;
      y += B.pitch;
    }
    y += 3;
  }
  return { sel, label, tinggi: y + 6, strip: nomor };
}

/** Kelompok bar untuk satu pecahan campuran: `b` loyang penuh dan satu loyang berisi `p` dari `q` bagian (bila p > 0). */
export function stripBil(x: Bil, jenis: "ada" | "ambil"): StripBar[] {
  const hasil: StripBar[] = Array.from({ length: x.b }, () => ({ q: x.q, isi: x.q, coret: 0, jenis }));
  if (x.p > 0) hasil.push({ q: x.q, isi: x.p, coret: 0, jenis });
  return hasil;
}
