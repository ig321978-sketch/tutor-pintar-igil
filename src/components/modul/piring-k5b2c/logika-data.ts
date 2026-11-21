/**
 * Logika murni piring klepon Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (faktor): faktor, pasangan faktor, bagi dan sisa, pengecoh yang masuk akal,
 * dan tata letak klepon pada piring (Concrete) atau petak pada pita (Pictorial). Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-piring-k5b2c.mjs.
 * Faktor dihitung dengan mencoba tiap pembagi (cara mencoba), dan pasangan dihitung dari daftar faktor.
 * Gambar DIGAMBAR sungguh sebanyak datanya: tiap klepon dan tiap petak punya titik sendiri (tataPiring dan tataPita).
 */

/** Nama kue dan ikon emoji lama (tanpa ZWJ, paling tinggi U+1FA95). */
export const IKON_KUE: Record<string, string> = { klepon: "\u{1F361}", pastel: "\u{1F95F}", sate: "\u{1F362}", kue: "\u{1F36A}" };
export const NAMA_KUE: readonly string[] = Object.keys(IKON_KUE);
export const ikonKue = (satuan: string): string => IKON_KUE[satuan] ?? "\u{1F361}";

/** Wadah menurut satuan: petak pada pita dibagi menjadi "bagian", kue dibagi ke "piring". */
export const wadahDari = (satuan: string): string => (satuan === "petak" ? "bagian" : "piring");

/* ------------------------------ Faktor ------------------------------ */
/** Semua faktor `n`, dari yang terkecil: bilangan yang membagi `n` tanpa sisa. */
export function faktorDari(n: number): number[] {
  const hasil: number[] = [];
  for (let i = 1; i <= n; i += 1) if (n % i === 0) hasil.push(i);
  return hasil;
}
/** Pasangan faktor (a, b) dengan a kali b sama dengan n dan a paling banyak b. */
export const pasanganFaktor = (n: number): [number, number][] => faktorDari(n).filter((a) => a * a <= n).map((a): [number, number] => [a, n / a]);
export const adaFaktor = (n: number, x: number): boolean => x >= 1 && n % x === 0;
export const bagiSisa = (n: number, x: number): { q: number; r: number } => ({ q: Math.floor(n / x), r: n % x });
export const teksDaftar = (d: number[]): string => d.join(", ");
export const bilanganKuadrat = (n: number): boolean => pasanganFaktor(n).some(([a, b]) => a === b);

/* ------------------------------ Teks ------------------------------ */
/** Hasil bagi dan sisa: "6 piring, sisa 2 sate" atau "5 piring, tanpa sisa". */
export const teksHasil = (q: number, r: number, satuan: string): string => `${q} ${wadahDari(satuan)}, ${r === 0 ? "tanpa sisa" : `sisa ${r} ${satuan}`}`;

/* ------------------------------ Pengecoh yang masuk akal ------------------------------ */
/** Daftar faktor keliru: bilangan satu dan bilangan itu sendiri dibuang (kesalahan Fajar pada Story). Kosong bila tidak ada faktor di antaranya. */
export const daftarTanpaUjung = (n: number): string => teksDaftar(faktorDari(n).filter((f) => f !== 1 && f !== n));
/** Daftar faktor keliru: bilangan itu sendiri terlupa. */
export const daftarTanpaBesar = (n: number): string => teksDaftar(faktorDari(n).filter((f) => f !== n));
/** Daftar faktor keliru: satu bilangan yang bukan faktor ikut tertulis (yang terkecil sesudah satu). */
export function daftarTambahBukan(n: number): string {
  let k = 2;
  while (k < n && n % k === 0) k += 1;
  return teksDaftar([...faktorDari(n), k].sort((a, b) => a - b));
}
/** Panjang keliru untuk tugas potong: dekat dengan jawaban tetapi bukan faktor. */
export function panjangKeliru(n: number, p: number): number[] {
  return [p + 1, p - 1, p + 2, p - 2, p + 3, p - 3].filter((x, i, a) => x >= 2 && x < n && n % x !== 0 && a.indexOf(x) === i);
}
/** Hasil bagi keliru: tetap masuk akal (sisa lebih kecil dari pembagi). */
export function hasilKeliru(n: number, x: number, satuan: string): string[] {
  const { q, r } = bagiSisa(n, x);
  const kandidat: { q: number; r: number }[] = [];
  if (r + 1 < x) kandidat.push({ q, r: r + 1 });
  kandidat.push({ q: q + 1, r });
  if (q < x && q >= 0) kandidat.push({ q: r, r: q });
  if (q - 1 >= 1) kandidat.push({ q: q - 1, r });
  const benar = teksHasil(q, r, satuan);
  return kandidat.map((c) => teksHasil(c.q, c.r, satuan)).filter((t, i, a) => t !== benar && a.indexOf(t) === i);
}

/* ------------------------------ Tata letak piring (Concrete) ------------------------------ */
export const PIRING = { lebar: 300, atas: 26, langkah: 12, jeda: 6, maksTinggi: 200 } as const;
export type TitikKue = { x: number; y: number; grup: number; sisa: boolean };
export type LempengPiring = { cx: number; cy: number; w: number; h: number; sisa: boolean; banyak: number };
export type TataPiring = { kue: TitikKue[]; lempeng: LempengPiring[]; tinggi: number; g: number; q: number; r: number };

/** Banyak kolom kue dalam satu piring berisi `g` kue. */
export const kolomPiring = (g: number): number => (g <= 4 ? Math.max(1, g) : g <= 8 ? Math.ceil(g / 2) : Math.ceil(g / 3));

/**
 * Tata `n` kue pada piring berisi `g` kue (g = 0: satu baki tanpa pembagian). Tiap kue punya titik sendiri; kue yang tidak cukup untuk satu piring penuh
 * (sisa) ditaruh pada baki bergaris putus sesudah piring terakhir.
 */
export function tataPiring(n: number, g: number): TataPiring {
  const st = PIRING.langkah;
  const isi = g > 0 ? g : n;
  const kol = g > 0 ? kolomPiring(g) : Math.min(n, 10);
  const barisIsi = Math.ceil(isi / kol);
  const w = kol * st + 10;
  const h = barisIsi * st + 10;
  const jumlahGrup = Math.ceil(n / isi);
  const perBaris = Math.max(1, Math.floor((PIRING.lebar - 8) / (w + PIRING.jeda)));
  const kue: TitikKue[] = [];
  const lempeng: LempengPiring[] = [];
  const penuh = Math.floor(n / isi);
  for (let G = 0; G < jumlahGrup; G += 1) {
    const baris = Math.floor(G / perBaris);
    const dalam = G % perBaris;
    const banyakBaris = Math.min(perBaris, jumlahGrup - baris * perBaris);
    const lebarBaris = banyakBaris * (w + PIRING.jeda) - PIRING.jeda;
    const x0 = (PIRING.lebar - lebarBaris) / 2;
    const cx = x0 + dalam * (w + PIRING.jeda) + w / 2;
    const cy = PIRING.atas + baris * (h + 8) + h / 2;
    const sisa = G >= penuh;
    const banyak = sisa ? n - penuh * isi : isi;
    lempeng.push({ cx, cy, w, h, sisa, banyak });
    for (let i = 0; i < banyak; i += 1) {
      const lebarIsi = Math.min(kol, banyak) * st;
      kue.push({ x: cx - lebarIsi / 2 + (i % kol) * st + st / 2, y: cy - (Math.ceil(banyak / kol) * st) / 2 + Math.floor(i / kol) * st + st / 2, grup: G, sisa });
    }
  }
  const barisTotal = Math.ceil(jumlahGrup / perBaris);
  return { kue, lempeng, tinggi: PIRING.atas + barisTotal * (h + 8) + 4, g: isi, q: penuh, r: n - penuh * isi };
}

/* ------------------------------ Tata letak pita (Pictorial) ------------------------------ */
export const PITA = { lebar: 300, kiri: 10, maksSel: 24, jeda: 5, tinggiSel: 16, jarakBaris: 22, atas: 28 } as const;
export type SelPita = { x: number; y: number; w: number; grup: number; sisa: boolean };
export type TataPita = { sel: SelPita[]; sw: number; tinggi: number; g: number; q: number; r: number; barisTotal: number };

/** Tata pita `n` petak yang dibagi menjadi bagian sepanjang `g` petak (g = 0: pita utuh). Sisa petak ditandai. */
export function tataPita(n: number, g: number): TataPita {
  const sel: SelPita[] = [];
  const ruang = PITA.lebar - 2 * PITA.kiri;
  if (g <= 0) {
    const sw = Math.min(12, ruang / Math.min(n, PITA.maksSel));
    for (let i = 0; i < n; i += 1) sel.push({ x: PITA.kiri + (i % PITA.maksSel) * sw, y: PITA.atas + Math.floor(i / PITA.maksSel) * PITA.jarakBaris, w: sw, grup: 0, sisa: false });
    const barisTotal = Math.ceil(n / PITA.maksSel);
    return { sel, sw, tinggi: PITA.atas + barisTotal * PITA.jarakBaris + 8, g: n, q: 1, r: 0, barisTotal };
  }
  const grupPerBaris = Math.max(1, Math.floor(PITA.maksSel / g));
  const sw = Math.min(12, (ruang - (grupPerBaris - 1) * PITA.jeda) / (grupPerBaris * g));
  const penuh = Math.floor(n / g);
  for (let i = 0; i < n; i += 1) {
    const G = Math.floor(i / g);
    const baris = Math.floor(G / grupPerBaris);
    const dalam = G % grupPerBaris;
    sel.push({ x: PITA.kiri + dalam * (g * sw + PITA.jeda) + (i % g) * sw, y: PITA.atas + baris * PITA.jarakBaris, w: sw, grup: G, sisa: G >= penuh });
  }
  const barisTotal = Math.ceil(Math.ceil(n / g) / grupPerBaris);
  return { sel, sw, tinggi: PITA.atas + barisTotal * PITA.jarakBaris + 8, g, q: penuh, r: n - penuh * g, barisTotal };
}
