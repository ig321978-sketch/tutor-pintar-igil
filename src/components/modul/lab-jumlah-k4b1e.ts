/**
 * Lab Jumlah Bersusun (Kelas 4 Bab 1, Sub-Bab E: Penjumlahan sampai 1.000): logika murni. Satu alat, dua tampilan.
 *  Bersusun     : dua atau tiga bilangan (masing-masing sampai 999, jumlah sampai 1.000) dijumlahkan kolom demi
 *                 kolom dari satuan. Untuk tiap kolom anak memilih angka yang ditulis dan banyak simpanan, lalu
 *                 menekan Tulis. Lab menghitung jumlah kolom (termasuk simpanan masuk) dan menolak bila keliru:
 *                 lupa menyimpan, menyimpan padahal tidak perlu, atau angka yang salah.
 *  Cara Panjang : tiap bilangan diurai; nilai tiap tempat dijumlahkan, lalu digabung. Hasilnya sama.
 * Pengurangan dan mengambil baru dipakai di Sub-Bab F.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const TEMPAT_E = ["satuan", "puluhan", "ratusan", "ribuan"] as const;
export const BATAS_E = 1000;
export const BOBOT_E = [1, 10, 100, 1000];

/** Soal dari buku (hlm. 28–33). */
export const SOAL_E: number[][] = [
  [131, 321],
  [189, 245],
  [328, 579],
  [124, 411, 363],
  [117, 105, 242],
  [456, 544],
];

export const digitKe = (n: number, c: number): number => Math.floor(n / BOBOT_E[c]) % 10;
export const kunciSoal = (s: readonly number[]): string => s.join("+");
export const jumlahSoal = (s: readonly number[]): number => s.reduce((a, b) => a + b, 0);
export const lambangE = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

/** Jumlah tiap kolom (satuan, puluhan, ratusan) dengan simpanan masuknya. */
export function rincianKolom(s: readonly number[]): { masuk: number; angka: number[]; jumlah: number; tulis: number; keluar: number }[] {
  const out = [];
  let masuk = 0;
  for (let c = 0; c < 3; c += 1) {
    const angka = s.map((n) => digitKe(n, c));
    const jumlah = angka.reduce((a, b) => a + b, 0) + masuk;
    const keluar = Math.floor(jumlah / 10);
    out.push({ masuk, angka, jumlah, tulis: jumlah % 10, keluar });
    masuk = keluar;
  }
  return out;
}

/** Banyak kolom yang menyimpan. */
export const banyakSimpan = (s: readonly number[]): number => rincianKolom(s).filter((k) => k.keluar > 0).length;

/** Cara panjang: jumlah nilai tiap tempat (ratusan, puluhan, satuan), lalu digabung. */
export function caraPanjang(s: readonly number[]): { baris: string[]; gabung: string } {
  const tempat = [2, 1, 0].map((c) => {
    const suku = s.map((n) => digitKe(n, c) * BOBOT_E[c]);
    return { suku, jumlah: suku.reduce((a, b) => a + b, 0) };
  });
  return {
    baris: tempat.map((t) => `${t.suku.map(lambangE).join(" + ")} = ${lambangE(t.jumlah)}`),
    gabung: `${tempat.map((t) => lambangE(t.jumlah)).join(" + ")} = ${lambangE(jumlahSoal(s))}`,
  };
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateJumlahK4B1E = {
  soal: number[];
  /** Kolom yang sedang dikerjakan (0 satuan, 1 puluhan, 2 ratusan); 3 berarti selesai. */
  kolom: number;
  /** Angka yang sudah ditulis per kolom (satuan, puluhan, ratusan, ribuan). */
  tulis: (number | null)[];
  digit: number;
  simpan: number;
  panjang: boolean;
  pernah: string[];
  pesan: string;
};

export type AksiJumlahK4B1E =
  | { t: "SOAL"; i: number }
  | { t: "ATUR"; suku: number; c: number; d: 1 | -1 }
  | { t: "DIGIT"; d: 1 | -1 }
  | { t: "SIMPAN"; n: number }
  | { t: "TULIS" }
  | { t: "PANJANG" }
  | { t: "RESET" };

const baru = (soal: number[]) => ({ soal, kolom: 0, tulis: [null, null, null, null], digit: 0, simpan: 0 });

export const awalJumlahK4B1E = (): StateJumlahK4B1E => ({ ...baru([...SOAL_E[0]]), panjang: false, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
export const selesaiE = (x: StateJumlahK4B1E): boolean => x.kolom >= 3;

function catat(x: StateJumlahK4B1E): StateJumlahK4B1E {
  let p = x.pernah;
  const k = kunciSoal(x.soal);
  if (x.panjang) p = tambah(p, `panjang:${k}`);
  if (selesaiE(x)) {
    p = tambah(p, `jumlah:${k}`);
    if (x.soal.length === 3) p = tambah(p, `tiga:${jumlahSoal(x.soal)}`);
    if (jumlahSoal(x.soal) === BATAS_E) p = tambah(p, "jumlah-1000");
    if (banyakSimpan(x.soal) >= 2) p = tambah(p, "simpan-dua");
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahJumlahK4B1E(x: StateJumlahK4B1E, a: AksiJumlahK4B1E): StateJumlahK4B1E {
  switch (a.t) {
    case "SOAL":
      if (a.i < 0 || a.i >= SOAL_E.length) return x;
      return catat({ ...x, ...baru([...SOAL_E[a.i]]), pesan: "" });
    case "ATUR": {
      if (a.suku < 0 || a.suku >= x.soal.length || a.c < 0 || a.c > 2) return x;
      const lama = x.soal[a.suku];
      const dg = digitKe(lama, a.c);
      const v = lama + (((dg + a.d + 10) % 10) - dg) * BOBOT_E[a.c];
      const soal = x.soal.map((n, i) => (i === a.suku ? v : n));
      if (jumlahSoal(soal) > BATAS_E) return { ...x, pesan: `Jumlahnya ${lambangE(jumlahSoal(soal))}. Di sub-bab ini jumlahnya paling banyak ${lambangE(BATAS_E)}.` };
      return catat({ ...x, ...baru(soal), pesan: "" });
    }
    case "DIGIT":
      return { ...x, digit: (x.digit + a.d + 10) % 10, pesan: "" };
    case "SIMPAN":
      return { ...x, simpan: Math.max(0, Math.min(2, a.n)), pesan: "" };
    case "TULIS": {
      if (selesaiE(x)) return { ...x, pesan: "Semua kolom sudah ditulis. Pilih soal lain atau ubah bilangannya." };
      const r = rincianKolom(x.soal)[x.kolom];
      const nama = TEMPAT_E[x.kolom];
      const rumus = `${[...r.angka, ...(r.masuk ? [r.masuk] : [])].join(" + ")} = ${r.jumlah}`;
      if (x.digit !== r.tulis) return { ...x, pesan: `Kolom ${nama}: ${rumus}. Angka yang ditulis adalah ${r.tulis}${r.jumlah >= 10 ? `, yaitu satuan dari ${r.jumlah}` : ""}.` };
      if (x.simpan < r.keluar) return { ...x, pernah: tambah(x.pernah, "lupa-simpan"), pesan: `Kolom ${nama}: ${rumus}. Sepuluh atau lebih, jadi simpan ${r.keluar} ke ${TEMPAT_E[x.kolom + 1]}.` };
      if (x.simpan > r.keluar) return { ...x, pesan: r.keluar === 0 ? `Kolom ${nama}: ${rumus}. Kurang dari sepuluh, jadi tidak ada yang disimpan.` : `Kolom ${nama}: ${rumus}. Yang disimpan hanya ${r.keluar}, bukan ${x.simpan}.` };
      const tulis = x.tulis.map((v, i) => (i === x.kolom ? r.tulis : i === 3 && x.kolom === 2 && r.keluar > 0 ? r.keluar : v));
      const kolom = x.kolom + 1;
      const pesan = kolom >= 3 ? `✅ Selesai: ${x.soal.map(lambangE).join(" + ")} = ${lambangE(jumlahSoal(x.soal))}.` : `✅ Kolom ${nama} benar.${r.keluar ? ` Simpanan ${r.keluar} ikut dijumlahkan di ${TEMPAT_E[kolom]}.` : ""}`;
      return catat({ ...x, tulis, kolom, digit: 0, simpan: 0, pesan });
    }
    case "PANJANG":
      return catat({ ...x, panjang: !x.panjang, pesan: "" });
    case "RESET":
      return awalJumlahK4B1E();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanJumlahK4B1E = { alat: "jumlah"; pernah: string[] };
export const keadaanJumlahK4B1E = (x: StateJumlahK4B1E): KeadaanJumlahK4B1E => ({ alat: "jumlah", pernah: x.pernah });

export function ucapJumlahK4B1E(x: StateJumlahK4B1E): string {
  if (selesaiE(x)) return `${x.soal.map(lambangE).join(" + ")} = ${lambangE(jumlahSoal(x.soal))}.`;
  const r = rincianKolom(x.soal)[x.kolom];
  return `Kerjakan kolom ${TEMPAT_E[x.kolom]}: ${r.angka.join(" + ")}${r.masuk ? ` + simpanan ${r.masuk}` : ""}. Pilih angka yang ditulis dan simpanannya, lalu tekan Tulis.`;
}
