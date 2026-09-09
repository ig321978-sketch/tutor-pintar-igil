export function adaHurufArab(teks?: string): boolean {
  return /[\u0600-\u06FF]/.test(teks ?? "");
}
