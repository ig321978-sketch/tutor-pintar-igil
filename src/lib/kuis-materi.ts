export const ID_KUIS_HIJAIYAH = [
  "hijaiyah-1-10",
  "hijaiyah-11-20",
  "hijaiyah-21-30",
] as const;

export const ID_KUIS_HARAKAT = [
  "harakat-syin-kasrah",
  "harakat-qaf-dhammah",
  "harakat-ra-fathah",
] as const;

export const ID_KUIS_FATIHAH = "fatihah-lengkap";

export const ID_KUIS_RUKUN_IMAN = [
  "iman-arti",
  "iman-jumlah",
  "iman-pertama",
] as const;

export const ID_KUIS_ASMAUL = [
  "asmaul-rahman",
  "asmaul-rahim",
  "asmaul-siapa",
] as const;

export const ID_KUIS_IMAN_AMAL = [
  "amal-terlihat",
  "amal-pensil",
  "amal-menolong",
] as const;

export const ID_KUIS_PAI1_BAB1 = [
  ...ID_KUIS_HIJAIYAH,
  ...ID_KUIS_HARAKAT,
  ID_KUIS_FATIHAH,
] as const;

export const ID_KUIS_PAI1_BAB2 = [
  ...ID_KUIS_RUKUN_IMAN,
  ...ID_KUIS_ASMAUL,
  ...ID_KUIS_IMAN_AMAL,
] as const;

export const PESAN_KUNCI_KUIS_MATERI =
  "Selesaikan semua QUIZ pada kartu Materi untuk membuka kartu ini.";

export function idKuisKartuResmi(
  modulId: string,
  kodeKartu: string,
  indeks: number,
): string {
  return `${modulId}-${kodeKartu}-${indeks}`;
}

export function idKuisTulisKartu(modulId: string, kodeKartu: string): string {
  return `${modulId}-${kodeKartu}-tulis`;
}

export const ID_KUIS_TULIS_PAI1_BAB1 = [
  idKuisTulisKartu("pai-1-bab1", "A"),
  idKuisTulisKartu("pai-1-bab1", "B"),
  idKuisTulisKartu("pai-1-bab1", "C"),
] as const;

export const ID_KUIS_TULIS_PAI1_BAB2 = [
  idKuisTulisKartu("pai-1-bab2", "A"),
  idKuisTulisKartu("pai-1-bab2", "B"),
  idKuisTulisKartu("pai-1-bab2", "C"),
] as const;

export function daftarIdKuisMateri(
  _kelas: string,
  _mapel: string,
  _materi: string,
): string[] {
  return [];
}

export function kuisMateriSudahTuntas(
  selesai: string[],
  daftar: string[],
): boolean {
  if (daftar.length === 0) return true;
  const sudah = new Set(selesai);
  return daftar.every((id) => sudah.has(id));
}
