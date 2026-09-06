/** Ubah potongan LaTeX menjadi teks datar (label diagram) atau ucapan lisan. */

const YUNANI_LATEX: Array<[RegExp, string]> = [
  [/\\varepsilon/g, "epsilon"],
  [/\\vartheta/g, "teta"],
  [/\\varphi/g, "fi"],
  [/\\varrho/g, "rho"],
  [/\\varsigma/g, "sigma"],
  [/\\alpha/g, "alfa"],
  [/\\beta/g, "beta"],
  [/\\gamma/g, "gamma"],
  [/\\Gamma/g, "gamma"],
  [/\\delta/g, "delta"],
  [/\\Delta/g, "delta"],
  [/\\epsilon/g, "epsilon"],
  [/\\zeta/g, "zeta"],
  [/\\eta/g, "eta"],
  [/\\theta/g, "teta"],
  [/\\Theta/g, "teta"],
  [/\\iota/g, "iota"],
  [/\\kappa/g, "kappa"],
  [/\\lambda/g, "lambda"],
  [/\\Lambda/g, "lambda"],
  [/\\mu/g, "miu"],
  [/\\nu/g, "nu"],
  [/\\xi/g, "ksi"],
  [/\\Xi/g, "ksi"],
  [/\\pi/g, "pi"],
  [/\\Pi/g, "pi"],
  [/\\rho/g, "rho"],
  [/\\sigma/g, "sigma"],
  [/\\Sigma/g, "sigma"],
  [/\\tau/g, "tau"],
  [/\\upsilon/g, "upsilon"],
  [/\\Upsilon/g, "upsilon"],
  [/\\phi/g, "fi"],
  [/\\Phi/g, "fi"],
  [/\\chi/g, "khi"],
  [/\\psi/g, "psi"],
  [/\\Psi/g, "psi"],
  [/\\omega/g, "omega"],
  [/\\Omega/g, "omega"],
];

const PECAHAN_UMUM: Record<string, string> = {
  "1/2": "setengah",
  "1/3": "sepertiga",
  "1/4": "seperempat",
  "1/5": "seperlima",
  "2/3": "dua pertiga",
  "3/4": "tiga per empat",
};

function ulangSampaiStabil(teks: string, ubah: (nilai: string) => string): string {
  let hasil = teks;
  for (let i = 0; i < 12; i += 1) {
    const berikutnya = ubah(hasil);
    if (berikutnya === hasil) break;
    hasil = berikutnya;
  }
  return hasil;
}

function buangPembungkus(teks: string): string {
  return teks
    .replace(/\\left\s*/g, "")
    .replace(/\\right\s*/g, "")
    .replace(/\\big+|\\Big+|\\bigg+|\\Bigg+/g, "")
    .replace(/\\,|\\;|\\:|\\!|~|\\quad|\\qquad|\\ /g, " ")
    .replace(/\\text\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\operatorname\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\mathrm\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\mathbf\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\boldsymbol\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\mathsf\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\mathit\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\textbf\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\textit\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\textrm\s*\{([^{}]*)\}/g, " $1 ");
}

function gantiYunani(teks: string): string {
  let hasil = teks;
  for (const [pola, ganti] of YUNANI_LATEX) {
    hasil = hasil.replace(pola, ganti);
  }
  return hasil;
}

function gantiSimbolDasar(teks: string): string {
  return teks
    .replace(/\\cdot\b/g, " * ")
    .replace(/\\times\b/g, " * ")
    .replace(/\\ast\b/g, " * ")
    .replace(/\\div\b/g, " / ")
    .replace(/\\pm\b/g, " plus minus ")
    .replace(/\\mp\b/g, " minus plus ")
    .replace(/\\leq\b|\\leqq\b|\\leqslant\b|\\le\b/g, " <= ")
    .replace(/\\geq\b|\\geqq\b|\\geqslant\b|\\ge\b/g, " >= ")
    .replace(/\\neq\b|\\ne\b/g, " != ")
    .replace(/\\approx\b|\\simeq\b|\\sim\b/g, " ~ ")
    .replace(/\\equiv\b/g, " = ")
    .replace(/\\propto\b/g, " ~ ")
    .replace(/\\infty\b/g, " inf ")
    .replace(/\\partial\b/g, " d ")
    .replace(/\\nabla\b/g, " nabla ")
    .replace(/\\sum\b/g, " sum ")
    .replace(/\\prod\b/g, " prod ")
    .replace(/\\int\b/g, " int ")
    .replace(/\\lim\b/g, " lim ")
    .replace(/\\to\b|\\rightarrow\b|\\Rightarrow\b/g, " -> ")
    .replace(/\\leftarrow\b|\\Leftarrow\b/g, " <- ")
    .replace(/\\leftrightarrow\b|\\Leftrightarrow\b|\\rightleftharpoons\b/g, " <-> ")
    .replace(/\\circ\b/g, " deg ")
    .replace(/\\degree\b/g, " deg ")
    .replace(/\\percent\b|\\%/g, " % ")
    .replace(/\\&/g, " dan ")
    .replace(/\\_/g, "_")
    .replace(/\\#/g, " ")
    .replace(/\\\{/g, "(")
    .replace(/\\\}/g, ")");
}

function gantiPerintahBersarang(teks: string): string {
  return ulangSampaiStabil(teks, (nilai) =>
    nilai
      .replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\tfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\cfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
      .replace(/\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}/g, "akar$1($2)")
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, "akar($1)")
      .replace(/\\abs\s*\{([^{}]*)\}/g, "|$1|")
      .replace(/\\overline\s*\{([^{}]*)\}/g, "$1")
      .replace(/\\underline\s*\{([^{}]*)\}/g, "$1")
      .replace(/\\widehat\s*\{([^{}]*)\}/g, "$1")
      .replace(/\\vec\s*\{([^{}]*)\}/g, "vec $1")
      .replace(/\\hat\s*\{([^{}]*)\}/g, "hat $1")
      .replace(/\\bar\s*\{([^{}]*)\}/g, "bar $1")
      .replace(/\\dot\s*\{([^{}]*)\}/g, "$1")
      .replace(/\\ddot\s*\{([^{}]*)\}/g, "$1")
      .replace(/\\overrightarrow\s*\{([^{}]*)\}/g, "$1")
      .replace(/\^\{([^{}]*)\}/g, "^$1")
      .replace(/_\{([^{}]*)\}/g, "_$1")
      .replace(/\{([^{}]*)\}/g, "$1"),
  );
}

function rapikanSisaPerintah(teks: string): string {
  return teks
    .replace(/\\(sin|cos|tan|cot|sec|csc|log|ln|exp|lim|max|min)\b/g, "$1")
    .replace(/\\[a-zA-Z]+\s*/g, " ")
    .replace(/[{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Label diagram: pendek, tanpa backslash, aman untuk Mermaid. */
export function latexKeLabelDatar(mentah: string): string {
  let isi = mentah.replace(/\n+/g, " ");
  isi = buangPembungkus(isi);
  isi = gantiYunani(isi);
  isi = gantiSimbolDasar(isi);
  isi = gantiPerintahBersarang(isi);
  isi = rapikanSisaPerintah(isi);
  isi = isi
    .replace(/\bvec\s+/g, "")
    .replace(/\bhat\s+/g, "")
    .replace(/\bbar\s+/g, "")
    .replace(/\binf\b/g, "tak hingga")
    .replace(/\bdeg\b/g, "derajat")
    .replace(/\*/g, " ")
    .replace(/\s*\/\s*/g, " per ")
    .replace(/\s*\^\s*/g, "")
    .replace(/\s*_\s*/g, "")
    .replace(/[()<>#&;"]/g, " ")
    .replace(/'/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return isi || "konsep";
}

function ucapkanPangkat(isi: string): string {
  const bersih = isi.replace(/\s+/g, "");
  if (bersih === "2") return " kuadrat";
  if (bersih === "3") return " kubik";
  if (bersih === "\\circ" || bersih === "deg" || bersih === "o") return " derajat";
  if (bersih.startsWith("-")) return ` pangkat minus ${bersih.slice(1)}`;
  if (bersih.startsWith("+")) return ` pangkat ${bersih.slice(1)}`;
  return ` pangkat ${isi}`.trimEnd();
}

function ucapkanPecahan(atas: string, bawah: string): string {
  const kunci = `${atas.replace(/\s+/g, "")}/${bawah.replace(/\s+/g, "")}`;
  return PECAHAN_UMUM[kunci] || `${atas} per ${bawah}`;
}

/** Ucapan lisan untuk isi rumus LaTeX. */
export function latexKeUcapan(mentah: string): string {
  let isi = mentah.replace(/\n+/g, " ");
  isi = buangPembungkus(isi);
  isi = ulangSampaiStabil(isi, (nilai) =>
    nilai
      .replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (_, atas: string, bawah: string) =>
        ` ${ucapkanPecahan(atas, bawah)} `,
      )
      .replace(/\\tfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (_, atas: string, bawah: string) =>
        ` ${ucapkanPecahan(atas, bawah)} `,
      )
      .replace(/\\cfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (_, atas: string, bawah: string) =>
        ` ${ucapkanPecahan(atas, bawah)} `,
      )
      .replace(
        /\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}/g,
        " akar pangkat $1 dari $2 ",
      )
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, " akar dari $1 ")
      .replace(/\\abs\s*\{([^{}]*)\}/g, " nilai mutlak $1 ")
      .replace(/\\vec\s*\{([^{}]*)\}/g, " vektor $1 ")
      .replace(/\\hat\s*\{([^{}]*)\}/g, " $1 topi ")
      .replace(/\\bar\s*\{([^{}]*)\}/g, " $1 bar ")
      .replace(/\\overline\s*\{([^{}]*)\}/g, " $1 ")
      .replace(/\\underline\s*\{([^{}]*)\}/g, " $1 ")
      .replace(/\\overrightarrow\s*\{([^{}]*)\}/g, " vektor $1 "),
  );

  isi = gantiYunani(isi);
  isi = isi
    .replace(/\\cdot\b/g, " kali ")
    .replace(/\\times\b/g, " kali ")
    .replace(/\\ast\b/g, " kali ")
    .replace(/\\div\b/g, " dibagi ")
    .replace(/\\pm\b/g, " plus minus ")
    .replace(/\\mp\b/g, " minus plus ")
    .replace(/\\leq\b|\\leqq\b|\\leqslant\b|\\le\b/g, " lebih kecil atau sama dengan ")
    .replace(/\\geq\b|\\geqq\b|\\geqslant\b|\\ge\b/g, " lebih besar atau sama dengan ")
    .replace(/\\neq\b|\\ne\b/g, " tidak sama dengan ")
    .replace(/\\approx\b|\\simeq\b|\\sim\b/g, " kira-kira ")
    .replace(/\\equiv\b/g, " senilai ")
    .replace(/\\propto\b/g, " sebanding dengan ")
    .replace(/\\infty\b/g, " tak hingga ")
    .replace(/\\partial\b/g, " turunan parsial ")
    .replace(/\\nabla\b/g, " nabla ")
    .replace(/\\sum\b/g, " jumlah ")
    .replace(/\\prod\b/g, " hasil kali ")
    .replace(/\\int\b/g, " integral ")
    .replace(/\\lim\b/g, " limit ")
    .replace(/\\to\b|\\rightarrow\b|\\Rightarrow\b/g, " menuju ")
    .replace(/\\leftarrow\b|\\Leftarrow\b/g, " berasal dari ")
    .replace(/\\circ\b|\\degree\b/g, " derajat ")
    .replace(/\\%/g, " persen ")
    .replace(/\\&/g, " dan ")
    .replace(/\\_/g, " ")
    .replace(/\\#/g, " ")
    .replace(/\\\{/g, " ( ")
    .replace(/\\\}/g, " ) ");

  isi = ulangSampaiStabil(isi, (nilai) =>
    nilai
      .replace(/([A-Za-z0-9)\]|]|epsilon|pi|teta|alfa)\s*\^\s*\{([^{}]*)\}/g, (_, dasar: string, pangkat: string) =>
        `${dasar}${ucapkanPangkat(pangkat)}`,
      )
      .replace(/([A-Za-z0-9)\]|]|epsilon|pi|teta|alfa)\s*\^\s*([A-Za-z0-9+-]+)/g, (_, dasar: string, pangkat: string) =>
        `${dasar}${ucapkanPangkat(pangkat)}`,
      )
      .replace(/([A-Za-z0-9)|]|epsilon|pi|teta|alfa)\s*_\s*\{([^{}]*)\}/g, "$1 $2 ")
      .replace(/([A-Za-z0-9)|]|epsilon|pi|teta|alfa)\s*_\s*([A-Za-z0-9+-]+)/g, "$1 $2 ")
      .replace(/\{([^{}]*)\}/g, " $1 "),
  );

  isi = isi
    .replace(/\\(sin|cos|tan|cot|sec|csc|log|ln|exp|max|min)\b/g, "$1")
    .replace(/\\[a-zA-Z]+\s*/g, " ")
    .replace(/[{}]/g, " ")
    .replace(/\s*\/\s*/g, " per ")
    .replace(/\s*\*\s*/g, " kali ")
    .replace(/\s+/g, " ")
    .trim();

  return isi;
}

export function ucapkanLatexUntukSuara(teks: string): string {
  let hasil = teks
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, isi: string) => ` ${latexKeUcapan(isi)} `)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, isi: string) => ` ${latexKeUcapan(isi)} `)
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, isi: string) => ` ${latexKeUcapan(isi)} `)
    .replace(/\$([^$\n]+)\$/g, (_, isi: string) => ` ${latexKeUcapan(isi)} `);

  if (/\\[a-zA-Z]+/.test(hasil)) {
    hasil = latexKeUcapan(hasil);
  }
  return hasil;
}
