import { ambilTindakan } from "./registri";
import { JUMLAH_SOAL_TAHAP, type SoalSpec, type Tahap } from "./tipe";

/**
 * Validator katalog satu tahap satu sub-bab. Mengembalikan daftar galat (kosong = sah):
 * tepat sepuluh soal, bernomor 1 sampai 10 tanpa lompat atau kembar, tindakan unik,
 * tindakan terdaftar di tahapnya, instruksi terisi.
 * `izinkanBelumTerdaftar` hanya untuk daftar sementara (pengganti) yang ditandai jelas.
 */
export function validasiKatalog(soal: readonly SoalSpec[], tahap: Tahap, opsi: { izinkanBelumTerdaftar?: boolean } = {}): string[] {
  const galat: string[] = [];
  if (soal.length !== JUMLAH_SOAL_TAHAP) galat.push(`Tahap ${tahap}: harus tepat ${JUMLAH_SOAL_TAHAP} soal, ada ${soal.length}.`);
  const nomor = soal.map((s) => s.nomor).sort((a, b) => a - b);
  for (let i = 0; i < JUMLAH_SOAL_TAHAP; i += 1) if (nomor[i] !== i + 1) {
    galat.push(`Tahap ${tahap}: nomor harus 1 sampai ${JUMLAH_SOAL_TAHAP} tanpa lompat atau kembar (dapat ${nomor.join(",")}).`);
    break;
  }
  const lihat = new Set<string>();
  for (const s of soal) {
    if (lihat.has(s.tindakan)) galat.push(`Tahap ${tahap}: tindakan "${s.tindakan}" dipakai lebih dari satu soal (variasi harus tindakan berbeda).`);
    lihat.add(s.tindakan);
    const t = ambilTindakan(s.tindakan);
    if (!t) {
      if (!opsi.izinkanBelumTerdaftar) galat.push(`Soal ${s.nomor}: tindakan "${s.tindakan}" belum terdaftar.`);
    } else if (t.tahap !== tahap) galat.push(`Soal ${s.nomor}: tindakan "${s.tindakan}" milik tahap ${t.tahap}, bukan ${tahap}.`);
    if (!opsi.izinkanBelumTerdaftar && !s.instruksi.trim()) galat.push(`Soal ${s.nomor}: instruksi kosong.`);
  }
  return galat;
}
