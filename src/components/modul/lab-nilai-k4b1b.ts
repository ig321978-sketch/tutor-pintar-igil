/**
 * Lab Nilai Tempat (Kelas 4 Bab 1, Sub-Bab B: Nilai Tempat Bilangan sampai 10.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Nilai  : empat kartu angka di papan (ribuan, ratusan, puluhan, satuan). Ketuk sebuah angka: nilainya DIHITUNG
 *           dari tempatnya (angka 6 di puluhan bernilai 60, di ratusan 600).
 *  Uraian : nilai tiap tempat ditulis dengan tanda +, termasuk nol (2.150 = 2.000 + 100 + 50 + 0).
 *  Tabel  : tabel digit untuk bilangan buku. Tiap kolom punya tiga keping: digit yang benar, nilai penuh
 *           (mis. 7000), dan digit tempat lain. Menulis nilai penuh ditolak dengan penjelasan.
 * Tanda < > =, mengurutkan, dan istilah komposisi baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const TEMPAT_B = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const BOBOT_B = [1000, 100, 10, 1];

export type Digit4 = [number, number, number, number];
export const angkaDari = (d: readonly number[]): number => d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];
export const digitDari = (n: number): Digit4 => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
/** Lambang dengan titik ribuan: 2150 → "2.150". */
export const lambangB = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

/** Nilai angka pada tempat ke-i. */
export const nilaiTempat = (d: readonly number[], i: number): number => d[i] * BOBOT_B[i];

/** Uraian: "2.000 + 100 + 50 + 0". Nol tetap ditulis. */
export const teksUraian = (d: readonly number[]): string => d.map((_, i) => lambangB(nilaiTempat(d, i))).join(" + ");

/** Bilangan tabel dari buku (hlm. 15–16). */
export const TABEL_B = [7812, 6192, 2910, 4128, 9217];

/** Tiga keping untuk satu kolom tabel: digit benar, nilai penuh, dan digit dari tempat lain yang berbeda. */
export function kepingKolom(n: number, i: number): string[] {
  const d = digitDari(n);
  const calon = [String(d[i]), String(d[i] * BOBOT_B[i]), ...[1, 2, 3].map((k) => String(d[(i + k) % 4])), ...[1, 2, 3].map((k) => String((d[i] + k) % 10))];
  const keping = [...new Set(calon)].slice(0, 3);
  const geser = (n + i) % 3;
  return keping.map((_, k) => keping[(k + geser) % 3]);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateNilaiK4B1B = {
  d: Digit4;
  pilih: number | null;
  uraian: boolean;
  tabel: number;
  isi: (string | null)[];
  pernah: string[];
  pesan: string;
};

export type AksiNilaiK4B1B =
  | { t: "DIGIT"; i: number; d: 1 | -1 }
  | { t: "PILIH"; i: number }
  | { t: "TOGGLE" }
  | { t: "TABEL"; d: 1 | -1 }
  | { t: "KEPING"; i: number; nilai: string }
  | { t: "PERIKSA" }
  | { t: "RESET" };

export const awalNilaiK4B1B = (): StateNilaiK4B1B => ({ d: [5, 3, 7, 1], pilih: null, uraian: false, tabel: 0, isi: [null, null, null, null], pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function catat(x: StateNilaiK4B1B): StateNilaiK4B1B {
  let p = x.pernah;
  const n = angkaDari(x.d);
  if (x.pilih !== null) {
    p = tambah(p, `nilai:${x.d[x.pilih]}:${BOBOT_B[x.pilih]}`);
    p = tambah(p, `ketuk:${n}:${x.pilih}`);
  }
  if (x.uraian) {
    p = tambah(p, `uraian:${n}`);
    if (x.d.includes(0) && n > 0) p = tambah(p, "uraian-nol");
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahNilaiK4B1B(x: StateNilaiK4B1B, a: AksiNilaiK4B1B): StateNilaiK4B1B {
  switch (a.t) {
    case "DIGIT": {
      if (a.i < 0 || a.i > 3) return x;
      const d = x.d.map((v, i) => (i === a.i ? (v + a.d + 10) % 10 : v)) as Digit4;
      return catat({ ...x, d, pesan: "" });
    }
    case "PILIH":
      if (a.i < 0 || a.i > 3) return x;
      return catat({ ...x, pilih: a.i, pesan: "" });
    case "TOGGLE":
      return catat({ ...x, uraian: !x.uraian, pesan: "" });
    case "TABEL":
      return { ...x, tabel: (x.tabel + a.d + TABEL_B.length) % TABEL_B.length, isi: [null, null, null, null], pesan: "" };
    case "KEPING": {
      if (a.i < 0 || a.i > 3 || !kepingKolom(TABEL_B[x.tabel], a.i).includes(a.nilai)) return x;
      return { ...x, isi: x.isi.map((v, i) => (i === a.i ? a.nilai : v)), pesan: "" };
    }
    case "PERIKSA": {
      const n = TABEL_B[x.tabel];
      const d = digitDari(n);
      if (x.isi.some((v) => v === null)) return { ...x, pesan: "Isi keempat kolom dulu." };
      const nilaiPenuh = x.isi.findIndex((v, i) => v === String(d[i] * BOBOT_B[i]) && d[i] * BOBOT_B[i] !== d[i]);
      if (nilaiPenuh >= 0) {
        return {
          ...x,
          pernah: tambah(x.pernah, "tabel-tolak"),
          pesan: `Kolom ${TEMPAT_B[nilaiPenuh]} sudah menunjukkan tempatnya, jadi tulis digitnya saja: ${d[nilaiPenuh]}, bukan ${x.isi[nilaiPenuh]}.`,
        };
      }
      const salah = x.isi.findIndex((v, i) => v !== String(d[i]));
      if (salah >= 0) return { ...x, pesan: `Kolom ${TEMPAT_B[salah]} belum tepat. Lihat angka ${TEMPAT_B[salah]} pada ${lambangB(n)}.` };
      return { ...x, pernah: tambah(x.pernah, `tabel:${n}`), pesan: `✅ Tabel ${lambangB(n)} benar: ${d.join(" | ")}.` };
    }
    case "RESET":
      return awalNilaiK4B1B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanNilaiK4B1B = { alat: "nilai"; n: number; pernah: string[] };
export const keadaanNilaiK4B1B = (x: StateNilaiK4B1B): KeadaanNilaiK4B1B => ({ alat: "nilai", n: angkaDari(x.d), pernah: x.pernah });

export function kalimatNilai(d: readonly number[], i: number): string {
  return `Angka ${d[i]} di ${TEMPAT_B[i]} bernilai ${lambangB(nilaiTempat(d, i))}.`;
}

export function ucapNilaiK4B1B(x: StateNilaiK4B1B): string {
  const n = angkaDari(x.d);
  const bag = [`Bilangannya ${lambangB(n)}.`];
  if (x.pilih !== null) bag.push(kalimatNilai(x.d, x.pilih));
  if (x.uraian) bag.push(`Uraiannya ${teksUraian(x.d)}.`);
  return bag.join(" ");
}
