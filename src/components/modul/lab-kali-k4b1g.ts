/**
 * Lab Kali (Kelas 4 Bab 1, Sub-Bab G: Perkalian sampai 100): logika murni. Satu alat, tiga tampilan.
 *  Array     : kotak (baris) dan isi (kolom) diatur; banyak benda DIHITUNG (kotak × isi, paling banyak 100).
 *              Penjumlahan berulang ditampilkan: isi ditambahkan sebanyak kotak kali.
 *  Belah     : bilangan diurai menjadi puluhan dan satuan (cara panjang): (10 + 2) × 4 = 40 + 8.
 *  Bersusun  : kolom satuan dulu, lalu puluhan. Anak memilih angka yang ditulis dan simpanan (0 sampai 9),
 *              lalu menekan Tulis. Lab menolak bila lupa menyimpan atau angka keliru.
 * Pembagian, sisa, faktor, dan kelipatan baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const BATAS_G = 100;
export const MAKS_KOTAK = 25;
export const MAKS_ISI = 10;
export const TEMPAT_G = ["satuan", "puluhan", "ratusan"] as const;

/** Soal dari buku (hlm. 39–43): donat 12 × 4, kelereng 14 × 5, pensil 12 × 8, dan tiga lain. */
export const SOAL_G: [number, number][] = [
  [12, 4],
  [14, 5],
  [12, 8],
  [45, 2],
  [16, 6],
  [25, 4],
];

export const kunciG = (n: number, k: number): string => `${n}x${k}`;
export const kaliG = (n: number, k: number): number => n * k;
const puluhanG = (n: number): number => Math.floor(n / 10);
const satuanG = (n: number): number => n % 10;

/** Penjumlahan berulang: "4 + 4 + 4 + … (12 kali)". Paling banyak lima suku ditulis. */
export function teksBerulang(kotak: number, isi: number): string {
  if (kotak <= 5) return `${Array.from({ length: kotak }, () => isi).join(" + ")} = ${kotak * isi}`;
  return `${Array.from({ length: 4 }, () => isi).join(" + ")} + … (${kotak} kali) = ${kotak * isi}`;
}

/** Cara panjang: n = puluhan × 10 + satuan; kalikan masing-masing dengan k, lalu jumlahkan. */
export function caraPanjangG(n: number, k: number): { uraian: string; baris: string[]; gabung: string } {
  const p = puluhanG(n) * 10;
  const s = satuanG(n);
  return {
    uraian: `(${p} + ${s}) × ${k}`,
    baris: [`${p} × ${k} = ${p * k}`, `${s} × ${k} = ${s * k}`],
    gabung: `${p * k} + ${s * k} = ${n * k}`,
  };
}

/** Kolom bersusun: satuan lalu puluhan. Hasil kolom puluhan boleh dua angka (100 = tulis 0, simpan 1). */
export function rincianKali(n: number, k: number): { kali: string; jumlah: number; tulis: number; keluar: number }[] {
  const satuan = satuanG(n) * k;
  const puluhan = puluhanG(n) * k + Math.floor(satuan / 10);
  return [
    { kali: `${satuanG(n)} × ${k}`, jumlah: satuan, tulis: satuan % 10, keluar: Math.floor(satuan / 10) },
    { kali: `${puluhanG(n)} × ${k}`, jumlah: puluhan, tulis: puluhan % 10, keluar: Math.floor(puluhan / 10) },
  ];
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateKaliK4B1G = {
  kotak: number;
  isi: number;
  n: number;
  k: number;
  belah: boolean;
  kolom: number;
  tulis: (number | null)[];
  digit: number;
  simpan: number;
  pernah: string[];
  pesan: string;
};

export type AksiKaliK4B1G =
  | { t: "KOTAK"; d: 1 | -1 }
  | { t: "ISI"; d: 1 | -1 }
  | { t: "SOAL"; i: number }
  | { t: "ATUR"; bagian: "puluhan" | "satuan" | "pengali"; d: 1 | -1 }
  | { t: "BELAH" }
  | { t: "DIGIT"; d: 1 | -1 }
  | { t: "SIMPAN"; d: 1 | -1 }
  | { t: "TULIS" }
  | { t: "RESET" };

const soalBaru = (n: number, k: number) => ({ n, k, kolom: 0, tulis: [null, null, null] as (number | null)[], digit: 0, simpan: 0 });

export const awalKaliK4B1G = (): StateKaliK4B1G => ({ kotak: 3, isi: 4, belah: false, ...soalBaru(...SOAL_G[0]), pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
export const selesaiG = (x: StateKaliK4B1G): boolean => x.kolom >= 2;

function catat(x: StateKaliK4B1G): StateKaliK4B1G {
  let p = x.pernah;
  p = tambah(p, `array:${x.kotak}x${x.isi}`);
  if (x.belah) p = tambah(p, `belah:${kunciG(x.n, x.k)}`);
  if (selesaiG(x)) {
    p = tambah(p, `kali:${kunciG(x.n, x.k)}`);
    if (x.belah) p = tambah(p, `sama:${kunciG(x.n, x.k)}`);
    if (kaliG(x.n, x.k) === BATAS_G) p = tambah(p, "kali-100");
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahKaliK4B1G(x: StateKaliK4B1G, a: AksiKaliK4B1G): StateKaliK4B1G {
  switch (a.t) {
    case "KOTAK": {
      const v = x.kotak + a.d;
      if (v < 1 || v > MAKS_KOTAK) return { ...x, pesan: `Banyak kotak 1 sampai ${MAKS_KOTAK}.` };
      if (v * x.isi > BATAS_G) return { ...x, pesan: `${v} × ${x.isi} = ${v * x.isi}. Di sub-bab ini hasilnya paling banyak ${BATAS_G}.` };
      return catat({ ...x, kotak: v, pesan: "" });
    }
    case "ISI": {
      const v = x.isi + a.d;
      if (v < 1 || v > MAKS_ISI) return { ...x, pesan: `Isi tiap kotak 1 sampai ${MAKS_ISI}.` };
      if (x.kotak * v > BATAS_G) return { ...x, pesan: `${x.kotak} × ${v} = ${x.kotak * v}. Di sub-bab ini hasilnya paling banyak ${BATAS_G}.` };
      return catat({ ...x, isi: v, pesan: "" });
    }
    case "SOAL":
      if (a.i < 0 || a.i >= SOAL_G.length) return x;
      return catat({ ...x, ...soalBaru(...SOAL_G[a.i]), pesan: "" });
    case "ATUR": {
      let n = x.n;
      let k = x.k;
      if (a.bagian === "puluhan") n = ((puluhanG(n) + a.d + 10) % 10) * 10 + satuanG(n);
      else if (a.bagian === "satuan") n = puluhanG(n) * 10 + ((satuanG(n) + a.d + 10) % 10);
      else k += a.d;
      if (k < 2 || k > 9) return { ...x, pesan: "Pengali 2 sampai 9." };
      if (n < 10) return { ...x, pesan: "Bilangan yang dikalikan paling sedikit 10." };
      if (n * k > BATAS_G) return { ...x, pesan: `${n} × ${k} = ${n * k}. Di sub-bab ini hasilnya paling banyak ${BATAS_G}.` };
      return catat({ ...x, ...soalBaru(n, k), pesan: "" });
    }
    case "BELAH":
      return catat({ ...x, belah: !x.belah, pesan: "" });
    case "DIGIT":
      return { ...x, digit: (x.digit + a.d + 10) % 10, pesan: "" };
    case "SIMPAN":
      return { ...x, simpan: (x.simpan + a.d + 10) % 10, pesan: "" };
    case "TULIS": {
      if (selesaiG(x)) return { ...x, pesan: "Semua kolom sudah ditulis. Pilih soal lain atau ubah bilangannya." };
      const r = rincianKali(x.n, x.k)[x.kolom];
      const nama = TEMPAT_G[x.kolom];
      const rumus = x.kolom === 0 ? `${r.kali} = ${r.jumlah}` : `${r.kali} + simpanan ${rincianKali(x.n, x.k)[0].keluar} = ${r.jumlah}`;
      if (x.digit !== r.tulis) return { ...x, pesan: `Kolom ${nama}: ${rumus}. Angka yang ditulis adalah ${r.tulis}${r.jumlah >= 10 ? `, satuan dari ${r.jumlah}` : ""}.` };
      if (x.simpan < r.keluar) return { ...x, pernah: tambah(x.pernah, "lupa-simpan"), pesan: `Kolom ${nama}: ${rumus}. Sepuluh atau lebih, jadi simpan ${r.keluar} ke ${TEMPAT_G[x.kolom + 1]}.` };
      if (x.simpan > r.keluar) return { ...x, pesan: r.keluar === 0 ? `Kolom ${nama}: ${rumus}. Kurang dari sepuluh, jadi tidak ada yang disimpan.` : `Kolom ${nama}: ${rumus}. Yang disimpan hanya ${r.keluar}, bukan ${x.simpan}.` };
      const tulis = x.tulis.map((v, i) => (i === x.kolom ? r.tulis : i === 2 && x.kolom === 1 && r.keluar > 0 ? r.keluar : v));
      const kolom = x.kolom + 1;
      const pesan = kolom >= 2 ? `✅ Selesai: ${x.n} × ${x.k} = ${x.n * x.k}.` : `✅ Kolom ${nama} benar.${r.keluar ? ` Simpanan ${r.keluar} ikut dijumlahkan di ${TEMPAT_G[kolom]}.` : ""}`;
      return catat({ ...x, tulis, kolom, digit: 0, simpan: 0, pesan });
    }
    case "RESET":
      return awalKaliK4B1G();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanKaliK4B1G = { alat: "kali"; pernah: string[] };
export const keadaanKaliK4B1G = (x: StateKaliK4B1G): KeadaanKaliK4B1G => ({ alat: "kali", pernah: x.pernah });

export const ucapArrayG = (x: StateKaliK4B1G): string => `${x.kotak} kotak, tiap kotak ${x.isi}. ${teksBerulang(x.kotak, x.isi)}. Ditulis ${x.kotak} × ${x.isi} = ${x.kotak * x.isi}.`;

export function ucapBelahG(x: StateKaliK4B1G): string {
  const c = caraPanjangG(x.n, x.k);
  return `${x.n} × ${x.k}. Cara panjang: ${c.uraian}. ${c.baris.join(". ")}. ${c.gabung}.`;
}

export function ucapBersusunG(x: StateKaliK4B1G): string {
  if (selesaiG(x)) return `${x.n} × ${x.k} = ${x.n * x.k}.`;
  const r = rincianKali(x.n, x.k)[x.kolom];
  return `Kerjakan kolom ${TEMPAT_G[x.kolom]}: ${r.kali}${x.kolom === 1 ? ` ditambah simpanan ${rincianKali(x.n, x.k)[0].keluar}` : ""}. Pilih angka yang ditulis dan simpanannya, lalu tekan Tulis.`;
}
