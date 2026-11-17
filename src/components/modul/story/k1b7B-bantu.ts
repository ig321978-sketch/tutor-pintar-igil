import type { Aksi } from "./logika-story";
import { W, teks, type Satuan } from "./k1b7B-gambar";
import { tambah, urutBilangan } from "./k1b5d-bantu";

/** Penyingkat naskah Story Kelas 1 Bab 7 Sub-Bab B: memakai ulang penyingkat Bab 5 Sub-Bab D (pencari kata bilangan), ditambah hitungan satuan ukur. */
export { bersih, hapus, idx, k, namaBilangan, sorotkan, redamkan, tambah, ubah, urutBilangan, urutKata } from "./k1b5d-bantu";

/**
 * Aksi mengukur sambil menghitung: tiap nama bilangan dalam suara (satu, dua, ...) menaruh satuan ke-i rapat dari x0
 * (id `${id}{i}`, lebar w, pojok kiri-atas di tinggi y) dan memunculkan angka `${id}n{i}` di atasnya.
 * `setelah`: kata yang mendahului hitungan. `dari`: bilangan pertama (bawaan satu). `muncul: false`: satuan sudah ada, hanya angka.
 */
export function hitungUnit(
  suara: string,
  buat: Satuan,
  id: string,
  n: number,
  x0: number,
  y: number,
  w: number,
  o: { setelah?: string; h?: number; dari?: number; muncul?: boolean; u?: number } = {},
): Aksi[] {
  const dari = o.dari ?? 1;
  const pos = urutBilangan(suara, Array.from({ length: n }, (_, i) => dari + i), o.setelah);
  return pos.flatMap((p, i) => {
    const x = Number((x0 + i * w).toFixed(1));
    const aksi: Aksi[] = [];
    if (o.muncul ?? true) aksi.push(tambah(p, buat(`${id}${i}`, x, y, w, o.h)));
    aksi.push(tambah(p, teks(`${id}n${i}`, Number((x + w / 2).toFixed(1)), y - 6, String(dari + i), o.u ?? 10, W.merah)));
    return aksi;
  });
}
