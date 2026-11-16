import type { Pengacak } from "./acak";
import type { Bentuk, Hasil, Pilihan, Soal } from "./tipe";

/** Empat pilihan: satu kunci dan tiga pengecoh dari kekeliruan nyata (hanya satu kelompok, terhitung dobel, terlewat satu). */
export function susunPilihan(r: Pengacak, a: number, b: number): Pilihan[] {
  const kunci = a + b;
  return susunDari(r, kunci, [
    [Math.max(a, b), "m-ambil-satu"],
    [Math.min(a, b), "m-ambil-satu"],
    [kunci + 1, "m-hitung-dobel"],
    [kunci - 1, "m-lewat-satu"],
  ]);
}

/** Pilihan dari kunci dan daftar pengecoh [nilai, kode miskonsepsi]. Nilai kurang dari satu atau kembar dibuang; paling banyak tiga pengecoh. */
export function susunDari(r: Pengacak, kunci: number, kandidat: Array<[number, string]>): Pilihan[] {
  const dipakai = new Set<number>([kunci]);
  const salah: Pilihan[] = [];
  for (const [nilai, m] of r.kocok(kandidat)) {
    if (nilai < 1 || dipakai.has(nilai) || salah.length >= 3) continue;
    dipakai.add(nilai);
    salah.push({ id: `p${nilai}`, nilai, miskonsepsi: m });
  }
  return r.kocok<Pilihan>([{ id: `p${kunci}`, nilai: kunci, miskonsepsi: null }, ...salah]);
}

export function periksa(soal: Soal, pilihId: string): Hasil {
  const p = soal.pilihan.find((x) => x.id === pilihId);
  if (!p) return { benar: false, miskonsepsi: null };
  return { benar: p.miskonsepsi === null, miskonsepsi: p.miskonsepsi };
}

export const huruf = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Cek pelabuhan: lima soal berparameter, tiga bentuk bergilir, pasangan angka tidak berulang. */
export function buatCekDengan(buat: (bentuk: Bentuk, benih: number) => Soal, benih: number): Soal[] {
  const bentuk: Bentuk[] = ["benda", "diagram", "lambang", "benda", "diagram"];
  const hasil: Soal[] = [];
  let b = benih;
  for (const bt of bentuk) {
    let s = buat(bt, b);
    let coba = 0;
    while (hasil.some((x) => x.a === s.a && x.b === s.b) && coba < 50) {
      b += 7919;
      s = buat(bt, b);
      coba += 1;
    }
    hasil.push(s);
    b += 104729;
  }
  return hasil;
}
