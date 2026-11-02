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
