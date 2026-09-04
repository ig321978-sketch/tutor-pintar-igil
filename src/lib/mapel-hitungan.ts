export function mapelHitungan(mapel: string, materi = ""): boolean {
  const gabungan = `${mapel} ${materi}`.toLowerCase();
  return /matematika|fisika|kimia|ipa\b|ipas|hitung|aljabar|geometri|statistika|peluang|rasio|pecahan/.test(
    gabungan,
  );
}
