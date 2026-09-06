const SUPER_ANGKA: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁺": "+",
  "⁻": "-",
  "⁽": "(",
  "⁾": ")",
};

const SUB_ANGKA: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "₊": "+",
  "₋": "-",
};

const SATUAN: Array<[RegExp, string]> = [
  [/(?<=[\d)])\s*km\/jam\b/gi, " kilometer per jam"],
  [/(?<=[\d)])\s*m\/s\u00b2\b/gi, " meter per sekon kuadrat"],
  [/(?<=[\d)])\s*m\/s2\b/gi, " meter per sekon kuadrat"],
  [/(?<=[\d)])\s*m\/s\b/gi, " meter per sekon"],
  [/(?<=[\d)])\s*nC\b/g, " nanocoulomb"],
  [/(?<=[\d)])\s*[μµu]C\b/g, " mikrocoulomb"],
  [/(?<=[\d)])\s*mC\b/g, " milicoulomb"],
  [/(?<=[\d)])\s*kN\b/g, " kilonewton"],
  [/(?<=[\d)])\s*kV\b/g, " kilovolt"],
  [/(?<=[\d)])\s*mA\b/g, " miliampere"],
  [/(?<=[\d)])\s*kW\b/g, " kilowatt"],
  [/(?<=[\d)])\s*cm\b/g, " sentimeter"],
  [/(?<=[\d)])\s*mm\b/g, " milimeter"],
  [/(?<=[\d)])\s*nm\b/g, " nanometer"],
  [/(?<=[\d)])\s*km\b/g, " kilometer"],
  [/(?<=[\d)])\s*kg\b/g, " kilogram"],
  [/(?<=[\d)])\s*ms\b/g, " milidetik"],
  [/(?<=[\d)])\s*°\s*C\b/g, " derajat celcius"],
  [/(?<=[\d)])\s*N\b/g, " newton"],
  [/(?<=[\d)])\s*J\b/g, " joule"],
  [/(?<=[\d)])\s*W\b/g, " watt"],
  [/(?<=[\d)])\s*V\b/g, " volt"],
  [/(?<=[\d)])\s*A\b/g, " ampere"],
  [/(?<=[\d)])\s*C\b/g, " coulomb"],
  [/(?<=[\d)])\s*Hz\b/g, " hertz"],
  [/(?<=[\d)])\s*Pa\b/g, " pascal"],
  [/(?<=[\d)])\s*[ΩΩ]\b/g, " ohm"],
  [/(?<=[\d)])\s*g\b/g, " gram"],
];

function ucapkanPangkatAngka(mentah: string): string {
  const isi = mentah.replace(/\s+/g, "");
  if (!isi) return "";
  if (isi === "2") return " kuadrat ";
  if (isi === "3") return " kubik ";
  if (isi.startsWith("-")) return ` pangkat minus ${isi.slice(1)} `;
  if (isi.startsWith("+")) return ` pangkat ${isi.slice(1)} `;
  return ` pangkat ${isi} `;
}

function ucapkanSuperskrip(teks: string): string {
  return teks.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾]+/g, (cocok) => {
    const isi = [...cocok].map((huruf) => SUPER_ANGKA[huruf] ?? "").join("");
    return ucapkanPangkatAngka(isi);
  });
}

function ucapkanSubskrip(teks: string): string {
  return teks.replace(/[₀₁₂₃₄₅₆₇₈₉₊₋]+/g, (cocok) => {
    const isi = [...cocok].map((huruf) => SUB_ANGKA[huruf] ?? "").join("");
    return isi ? ` ${isi} ` : " ";
  });
}

function ucapkanNilaiMutlak(teks: string): string {
  let hasil = teks;
  let sebelumnya = "";
  while (hasil !== sebelumnya) {
    sebelumnya = hasil;
    hasil = hasil.replace(/\|\s*([^|]+?)\s*\|/g, " nilai mutlak dari $1 ");
  }
  return hasil;
}

function ucapkanSatuan(teks: string): string {
  let hasil = teks;
  for (const [pola, ganti] of SATUAN) {
    hasil = hasil.replace(pola, ganti);
  }
  return hasil;
}

export function ucapkanRumusUntukSuara(teks: string): string {
  let aman = teks;
  aman = aman
    .replace(/−/g, "-")
    .replace(/[×✕✖]/g, " kali ")
    .replace(/[·•]/g, " kali ")
    .replace(/÷/g, " dibagi ")
    .replace(/√/g, " akar dari ")
    .replace(/∞/g, " tak hingga ")
    .replace(/π/g, " pi ")
    .replace(/Δ/g, " delta ")
    .replace(/θ/g, " teta ")
    .replace(/λ/g, " lambda ")
    .replace(/μ/g, " mikro ")
    .replace(/[≤⩽]/g, " lebih kecil atau sama dengan ")
    .replace(/[≥⩾]/g, " lebih besar atau sama dengan ")
    .replace(/≠/g, " tidak sama dengan ")
    .replace(/≈/g, " kira-kira ")
    .replace(/±/g, " plus minus ");

  aman = ucapkanSuperskrip(aman);
  aman = ucapkanSubskrip(aman);

  aman = aman
    .replace(
      /(\d+(?:[.,]\d+)?|\))\s*\^\s*\{\s*([+-]?\d+)\s*\}/g,
      (_, dasar: string, pangkat: string) =>
        `${dasar}${ucapkanPangkatAngka(pangkat)}`,
    )
    .replace(
      /(\d+(?:[.,]\d+)?|\))\s*\^\s*([+-]?\d+)/g,
      (_, dasar: string, pangkat: string) =>
        `${dasar}${ucapkanPangkatAngka(pangkat)}`,
    )
    .replace(
      /(\d+(?:[.,]\d+)?)\s*[eE]\s*([+-]?\d+)/g,
      (_, dasar: string, pangkat: string) =>
        `${dasar} kali 10${ucapkanPangkatAngka(pangkat)}`,
    );

  aman = ucapkanNilaiMutlak(aman);

  aman = aman
    .replace(/\*/g, " kali ")
    .replace(/(\d)\s*[xX]\s*(?=\d)/g, "$1 kali ")
    .replace(/(\))\s*[xX]\s*(?=\d)/g, "$1 kali ")
    .replace(/\bx\s+(?=\d)/gi, "kali ")
    .replace(/\)\s*\/\s*\(/g, ") dibagi (")
    .replace(/\)\s*\/\s*(?=\d)/g, ") dibagi ")
    .replace(/(\d(?:[.,]\d+)?)\s*\/\s*\(/g, "$1 dibagi (")
    .replace(/(?<=\d)\s*\/\s*(?=\d)/g, " per ")
    .replace(/\(-(\d+(?:[.,]\d+)?)/g, "(minus $1")
    .replace(/(\d+)\.(\d+)/g, "$1,$2")
    .replace(/\(\s*(?=[\d]|minus )/g, ", ")
    .replace(/(?<=\d|kuadrat|kubik)\s*\)/g, ",");

  aman = ucapkanSatuan(aman);
  return aman.replace(/\s+/g, " ").trim();
}
