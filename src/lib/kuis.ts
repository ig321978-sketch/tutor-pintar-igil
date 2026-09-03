const HURUF_SAH = new Set(["A", "B", "C", "D"]);

export function parseKunciJawaban(nilai: unknown): string[] {
  const dariArray = Array.isArray(nilai)
    ? nilai
        .map((item) => String(item).toUpperCase().replace(/[^ABCD]/g, ""))
        .map((item) => item[0])
        .filter((item): item is string => Boolean(item) && HURUF_SAH.has(item))
    : [];
  const teks = typeof nilai === "string" ? nilai.toUpperCase() : "";
  const huruf = (
    dariArray.length > 0 ? dariArray : (teks.match(/[ABCD]/g) ?? [])
  ).filter((item) => HURUF_SAH.has(item));
  while (huruf.length < 5) huruf.push("A");
  return huruf.slice(0, 5);
}

export function hurufKunci(kunci: string[] | undefined, nomor: number): string {
  return kunci?.[nomor - 1] ?? "";
}
