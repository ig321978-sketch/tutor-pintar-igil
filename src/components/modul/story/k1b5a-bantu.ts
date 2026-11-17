import type { Aksi } from "./logika-story";
import { tambah, ubah, urutKata } from "./k1b1a-bantu";
import { W, geserIkan, geserJaring, sekat, teks } from "./k1b5a-gambar";

/** Penyingkat naskah Story Kelas 1 Bab 5 Sub-Bab A: memakai ulang penyingkat Bab 1 Sub-Bab A. */
export { bersih, hapus, idx, k, sorotkan, redamkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

export const KATA_BILANGAN = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

/**
 * Satu ikan, satu hitungan: tiap kata bilangan dalam `kata` (dicari berurutan setelah kata `setelah`) memindahkan ikan berikutnya
 * ke sekat wadah berikutnya dan memunculkan angka hitungan `${idAngka}{sekat}` di bawah ikan. Jaring (bila ada) ikut pindah.
 */
export function pindahHitung(o: {
  suara: string;
  kata: string[];
  setelah?: string;
  ikan: string[];
  wx: number;
  wy: number;
  s: number;
  sekatMulai?: number;
  angkaMulai?: number;
  idAngka: string;
  skala?: number;
  jaring?: string;
}): Aksi[] {
  const pos = urutKata(o.suara, o.kata, o.setelah);
  const mulai = o.sekatMulai ?? 0;
  const skala = o.skala ?? 0.6;
  return pos.flatMap((p, j) => {
    const c = sekat(o.wx, o.wy, mulai + j, o.s);
    const y = c.y - 4;
    return [
      ubah(p, ...geserIkan(o.ikan[j], c.x, y, skala), ...(o.jaring ? geserJaring(o.jaring, c.x, y) : [])),
      tambah(p, teks(`${o.idAngka}${mulai + j}`, c.x, Number((c.y + o.s * 0.38).toFixed(1)), String((o.angkaMulai ?? 1) + j), 7.6, W.merah)),
    ];
  });
}
