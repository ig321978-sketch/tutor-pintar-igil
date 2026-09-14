export type StatusJawabanKuis = "benar" | "salah" | null;

export function statusDariPilihan(
  pilih: string,
  benar: string,
): StatusJawabanKuis {
  if (!pilih) return null;
  return pilih === benar ? "benar" : "salah";
}

export function kelasTombolHasilKuis(
  pilih: string,
  nilai: string,
  benar: string,
  dasar: string,
): string {
  if (pilih !== nilai) return dasar;
  return nilai === benar
    ? "bg-emerald-600 text-white"
    : "bg-rose-600 text-white";
}
