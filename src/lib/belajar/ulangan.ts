import { pengacak } from "./acak";

/**
 * Memilih dan mencampur materi untuk satu sesi ulangan: tiap materi paling banyak sekali (campur, bukan blok),
 * maksimal `batas` materi, urutan berbenih. Murni, tanpa React.
 */
export function acakSesi<T>(daftar: readonly T[], benih: number, batas: number): T[] {
  return pengacak(benih).kocok(daftar).slice(0, Math.max(0, batas));
}
