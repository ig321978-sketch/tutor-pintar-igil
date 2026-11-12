/**
 * Lab Kurang Bersusun (Kelas 4 Bab 1, Sub-Bab F: Pengurangan sampai 1.000): logika murni. Satu alat, tiga tampilan.
 *  Bersusun     : bilangan atas dikurangi bilangan bawah (atas ≥ bawah, sampai 1.000), kolom demi kolom dari satuan.
 *                 Bila angka atas lebih kecil, anak menekan "Ambil" untuk mengambil 1 dari tempat di kirinya
 *                 (1 puluhan = 10 satuan). Lab menolak menulis tanpa mengambil, dan mengenali kesalahan membalik
 *                 (9 − 1 padahal 1 − 9). Mengambil melewati nol harus dilakukan bertahap dari kiri.
 *  Cara Panjang : uraian bilangan atas mengikuti pengambilan (241 → 200 + 30 + 11), lalu dikurangi tiap tempat.
 *  Periksa      : hasil + pengurang dihitung dan dibandingkan dengan bilangan awal.
 * Perkalian baru dipakai di Sub-Bab G.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const TEMPAT_F = ["satuan", "puluhan", "ratusan", "ribuan"] as const;
export const BOBOT_F = [1, 10, 100, 1000];
export const BATAS_F = 1000;

/** Soal dari buku (hlm. 34–37) dan dua soal melewati nol. */
export const SOAL_F: [number, number][] = [
  [265, 132],
  [241, 129],
  [253, 176],
  [241, 175],
  [304, 128],
  [1000, 1],
];

export const digitF = (n: number, c: number): number => Math.floor(n / BOBOT_F[c]) % 10;
export const lambangF = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
export const kunciF = (a: number, b: number): string => `${a}-${b}`;
/** Banyak kolom yang perlu dikerjakan: 4 bila bilangan atas 1.000, selain itu 3. */
export const kolomF = (a: number): number => (a >= 1000 ? 4 : 3);

/** Banyak pengambilan minimal (dihitung dengan cara bersusun baku). */
export function banyakAmbil(a: number, b: number): number {
  let pinjam = 0;
  let n = 0;
  for (let c = 0; c < kolomF(a); c += 1) {
    const atas = digitF(a, c) - pinjam;
    if (atas < digitF(b, c)) {
      n += 1;
      pinjam = 1;
    } else pinjam = 0;
  }
  return n;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateKurangK4B1F = {
  a: number;
  b: number;
  /** Angka atas tiap kolom setelah pengambilan (satuan sampai ribuan); bisa sampai 19. */
  atas: number[];
  kolom: number;
  tulis: (number | null)[];
  digit: number;
  ambil: number;
  periksa: boolean;
  pernah: string[];
  pesan: string;
};

export type AksiKurangK4B1F =
  | { t: "SOAL"; i: number }
  | { t: "ATUR"; bil: "a" | "b"; c: number; d: 1 | -1 }
  | { t: "AMBIL"; c: number }
  | { t: "DIGIT"; d: 1 | -1 }
  | { t: "TULIS" }
  | { t: "PERIKSA" }
  | { t: "RESET" };

const mulai = (a: number, b: number) => ({ a, b, atas: [0, 1, 2, 3].map((c) => digitF(a, c)), kolom: 0, tulis: [null, null, null, null], digit: 0, ambil: 0, periksa: false });

export const awalKurangK4B1F = (): StateKurangK4B1F => ({ ...mulai(...SOAL_F[0]), pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
export const selesaiF = (x: StateKurangK4B1F): boolean => x.kolom >= kolomF(x.a);
/** Hasil yang ditulis anak (null bila belum selesai). */
export const hasilTulis = (x: StateKurangK4B1F): number | null => (selesaiF(x) ? x.tulis.reduce<number>((s, v, c) => s + (v ?? 0) * BOBOT_F[c], 0) : null);

function catat(x: StateKurangK4B1F): StateKurangK4B1F {
  let p = x.pernah;
  const k = kunciF(x.a, x.b);
  if (selesaiF(x)) {
    p = tambah(p, `kurang:${k}`);
    if (x.ambil >= 2) p = tambah(p, `ambil-dua:${k}`);
    if (x.periksa) p = tambah(p, `periksa:${k}`);
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahKurangK4B1F(x: StateKurangK4B1F, a: AksiKurangK4B1F): StateKurangK4B1F {
  switch (a.t) {
    case "SOAL":
      if (a.i < 0 || a.i >= SOAL_F.length) return x;
      return { ...x, ...mulai(...SOAL_F[a.i]), pesan: "" };
    case "ATUR": {
      if (a.c < 0 || a.c > 2) return x;
      const lama = x[a.bil];
      if (lama >= 1000) return { ...x, pesan: "Pilih soal lain untuk mengubah bilangan 1.000." };
      const dg = digitF(lama, a.c);
      const v = lama + (((dg + a.d + 10) % 10) - dg) * BOBOT_F[a.c];
      const [na, nb] = a.bil === "a" ? [v, x.b] : [x.a, v];
      if (na < nb) return { ...x, pesan: `Bilangan atas ${lambangF(na)} lebih kecil dari bilangan bawah ${lambangF(nb)}. Di sini bilangan atas harus lebih besar atau sama.` };
      return { ...x, ...mulai(na, nb), pesan: "" };
    }
    case "AMBIL": {
      const c = a.c;
      const n = kolomF(x.a);
      if (selesaiF(x) || c < x.kolom || c >= n - 1) return { ...x, pesan: "Mengambil hanya untuk kolom yang belum dikerjakan, dari tempat di kirinya." };
      if (x.atas[c] >= 10) return { ...x, pesan: `${TEMPAT_F[c]} sudah mendapat 10 dari kiri.` };
      if (c === x.kolom && x.atas[c] >= digitF(x.b, c)) return { ...x, pesan: `Tidak perlu mengambil: ${x.atas[c]} sudah cukup untuk dikurangi ${digitF(x.b, c)}.` };
      if (c > x.kolom) {
        const rantai = x.atas[x.kolom] < digitF(x.b, x.kolom) && x.atas.slice(x.kolom + 1, c + 1).every((v) => v === 0);
        if (!rantai) return { ...x, pesan: `Belum waktunya mengambil untuk ${TEMPAT_F[c]}. Kerjakan kolom ${TEMPAT_F[x.kolom]} dulu, dari kanan ke kiri.` };
      }
      if (x.atas[c + 1] === 0) return { ...x, pesan: `Di ${TEMPAT_F[c + 1]} tinggal 0, tidak ada yang bisa diambil. Ambil dulu untuk ${TEMPAT_F[c + 1]} dari tempat di kirinya.` };
      const atas = x.atas.map((v, i) => (i === c ? v + 10 : i === c + 1 ? v - 1 : v));
      return { ...x, atas, ambil: x.ambil + 1, pernah: tambah(x.pernah, `ambil:${c}`), pesan: `🔄 1 ${TEMPAT_F[c + 1]} diambil menjadi 10 ${TEMPAT_F[c]}. ${TEMPAT_F[c]} sekarang ${atas[c]}, ${TEMPAT_F[c + 1]} tinggal ${atas[c + 1]}.` };
    }
    case "DIGIT":
      return { ...x, digit: (x.digit + a.d + 10) % 10, pesan: "" };
    case "TULIS": {
      if (selesaiF(x)) return { ...x, pesan: "Semua kolom sudah ditulis. Tekan Periksa atau pilih soal lain." };
      const c = x.kolom;
      const atas = x.atas[c];
      const bawah = digitF(x.b, c);
      if (atas < bawah) {
        if (x.digit === bawah - atas) {
          return { ...x, pernah: tambah(x.pernah, "balik-salah"), pesan: `Itu ${bawah} − ${atas}, angkanya terbalik. Yang dikurangi adalah angka atas, ${atas}. ${atas} kurang dari ${bawah}, jadi ambil 1 dari kiri dulu.` };
        }
        return { ...x, pernah: tambah(x.pernah, "ambil-lupa"), pesan: `${atas} kurang dari ${bawah}. Tekan Ambil untuk mengambil 1 dari ${TEMPAT_F[c + 1]}.` };
      }
      if (x.digit !== atas - bawah) return { ...x, pesan: `Kolom ${TEMPAT_F[c]}: ${atas} − ${bawah} = ${atas - bawah}.` };
      const tulis = x.tulis.map((v, i) => (i === c ? atas - bawah : v));
      const kolom = c + 1;
      const hasil = x.a - x.b;
      return catat({ ...x, tulis, kolom, digit: 0, pesan: kolom >= kolomF(x.a) ? `✅ Selesai: ${lambangF(x.a)} − ${lambangF(x.b)} = ${lambangF(hasil)}.` : `✅ Kolom ${TEMPAT_F[c]} benar.` });
    }
    case "PERIKSA":
      if (!selesaiF(x)) return { ...x, pesan: "Selesaikan dulu semua kolom, lalu periksa." };
      return catat({ ...x, periksa: true, pesan: "" });
    case "RESET":
      return awalKurangK4B1F();
  }
}

/* ------------------------------ Laporan, cara panjang, dan ucapan ------------------------------ */

export type KeadaanKurangK4B1F = { alat: "kurang"; pernah: string[] };
export const keadaanKurangK4B1F = (x: StateKurangK4B1F): KeadaanKurangK4B1F => ({ alat: "kurang", pernah: x.pernah });

/** Uraian bilangan atas mengikuti pengambilan, dan uraian bilangan bawah (ratusan ke satuan, ribuan bila ada). */
export function uraianPanjang(x: StateKurangK4B1F): { atas: string; bawah: string; selisih: string } {
  const n = kolomF(x.a);
  const idx = Array.from({ length: n }, (_, i) => n - 1 - i);
  const atas = idx.map((c) => x.atas[c] * BOBOT_F[c]);
  const bawah = idx.map((c) => digitF(x.b, c) * BOBOT_F[c]);
  const cukup = idx.every((c) => x.atas[c] >= digitF(x.b, c));
  return {
    atas: `${atas.map(lambangF).join(" + ")} = ${lambangF(x.a)}`,
    bawah: `${bawah.map(lambangF).join(" + ")} = ${lambangF(x.b)}`,
    selisih: cukup ? `${idx.map((c, i) => lambangF(atas[i] - bawah[i])).join(" + ")} = ${lambangF(x.a - x.b)}` : "Ada tempat yang belum cukup. Ambil dulu dari kiri.",
  };
}

export function kalimatPeriksa(x: StateKurangK4B1F): string {
  const h = hasilTulis(x) ?? 0;
  return `${lambangF(h)} + ${lambangF(x.b)} = ${lambangF(h + x.b)}${h + x.b === x.a ? `, sama dengan ${lambangF(x.a)}. Benar!` : `, bukan ${lambangF(x.a)}.`}`;
}

export function ucapKurangK4B1F(x: StateKurangK4B1F): string {
  if (selesaiF(x)) return `${lambangF(x.a)} − ${lambangF(x.b)} = ${lambangF(x.a - x.b)}.`;
  const c = x.kolom;
  return `Kerjakan kolom ${TEMPAT_F[c]}: ${x.atas[c]} − ${digitF(x.b, c)}. ${x.atas[c] < digitF(x.b, c) ? "Angka atas kurang, ambil 1 dari kiri dulu." : "Pilih angka hasilnya, lalu tekan Tulis."}`;
}
