const HURUF_SAH = new Set(["A", "B", "C", "D"]);

export const JUMLAH_SOAL_PG = 10;
export const JUMLAH_SOAL_ESAI = 3;
export const PEMISAH_BANK_ESAI = "<<<ESAI>>>";
export const PEMISAH_RUBRIK = "<<<RUBRIK>>>";

export function parseKunciJawaban(nilai: unknown): string[] {
  const dariArray = Array.isArray(nilai)
    ? nilai
        .map((item) => String(item).toUpperCase().replace(/[^ABCD]/g, ""))
        .map((item) => item[0])
        .filter((item): item is string => Boolean(item) && HURUF_SAH.has(item))
    : [];
  const teks = typeof nilai === "string" ? nilai.split(PEMISAH_RUBRIK)[0] ?? "" : "";
  const huruf = (
    dariArray.length > 0 ? dariArray : (teks.toUpperCase().match(/[ABCD]/g) ?? [])
  ).filter((item) => HURUF_SAH.has(item));
  return huruf.slice(0, JUMLAH_SOAL_PG);
}

export function hurufKunci(kunci: string[] | undefined, nomor: number): string {
  return kunci?.[nomor - 1] ?? "";
}

export function pecahBlokSoal(mentah: string): string[] {
  return mentah
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function kemasBankSoal(pilihanGanda: string, esai: string): string {
  const pg = pilihanGanda.trim();
  const uraian = esai.trim();
  if (!uraian) return pg;
  if (!pg) return `${PEMISAH_BANK_ESAI}\n\n${uraian}`;
  return `${pg}\n\n${PEMISAH_BANK_ESAI}\n\n${uraian}`;
}

export function pecahBankSoal(mentah: string): {
  pilihanGanda: string[];
  esai: string[];
} {
  const teks = mentah.trim();
  if (!teks) return { pilihanGanda: [], esai: [] };

  if (teks.includes(PEMISAH_BANK_ESAI)) {
    const [pg, ...sisa] = teks.split(PEMISAH_BANK_ESAI);
    return {
      pilihanGanda: pecahBlokSoal(pg ?? ""),
      esai: pecahBlokSoal(sisa.join(PEMISAH_BANK_ESAI)),
    };
  }

  const pilihanGanda: string[] = [];
  const esai: string[] = [];
  for (const blok of pecahBlokSoal(teks)) {
    const kepala = blok.split("\n")[0] ?? "";
    const adaPilihan = /^\s*[A-D][).]/m.test(blok);
    if (/esai|uraian/i.test(kepala) && !adaPilihan) esai.push(blok);
    else pilihanGanda.push(blok);
  }
  return { pilihanGanda, esai };
}

export function kemasKunciBank(huruf: string[], rubrik: string): string {
  const kunci = huruf.filter((item) => HURUF_SAH.has(item)).join(",");
  const isi = rubrik.trim();
  return isi ? `${kunci}${PEMISAH_RUBRIK}${isi}` : kunci;
}

export function pecahKunciBank(nilai: unknown): {
  huruf: string[];
  rubrik: string[];
} {
  const teks =
    typeof nilai === "string"
      ? nilai
      : Array.isArray(nilai)
        ? nilai.join(",")
        : "";
  const [kunci, ...sisa] = teks.split(PEMISAH_RUBRIK);
  return {
    huruf: parseKunciJawaban(kunci),
    rubrik: pecahBlokSoal(sisa.join(PEMISAH_RUBRIK)).slice(0, JUMLAH_SOAL_ESAI),
  };
}

export function pecahRubrikEsai(nilai: unknown): string[] {
  if (Array.isArray(nilai)) {
    return nilai
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, JUMLAH_SOAL_ESAI);
  }
  return pecahBlokSoal(typeof nilai === "string" ? nilai : "").slice(
    0,
    JUMLAH_SOAL_ESAI,
  );
}
