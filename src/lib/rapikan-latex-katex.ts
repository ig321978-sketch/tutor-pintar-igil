/** Rapikan LaTeX agar KaTeX bisa merender array bertumpuk dari Gemini. */
export function rapikanLatexKatex(latex: string): string {
  let hasil = latex.trim();
  hasil = hasil.replace(
    /\\cancel\{([^{}]*)\}/g,
    "\\htmlClass{igil-cancel}{$1}",
  );
  hasil = gantiSpecArray(hasil);
  return hasil;
}

function gantiSpecArray(latex: string): string {
  const pola = /\\begin\{array\}\{/g;
  let keluaran = "";
  let terakhir = 0;
  let cocok: RegExpExecArray | null;
  while ((cocok = pola.exec(latex))) {
    const awalIsi = cocok.index + cocok[0].length;
    let kedalaman = 1;
    let i = awalIsi;
    while (i < latex.length && kedalaman > 0) {
      const huruf = latex[i];
      if (huruf === "{") kedalaman += 1;
      else if (huruf === "}") kedalaman -= 1;
      i += 1;
    }
    const spec = latex.slice(awalIsi, i - 1);
    const specBaru = spec.replace(/@\{[^{}]*\}/g, "");
    keluaran += `${latex.slice(terakhir, cocok.index)}\\begin{array}{${specBaru}}`;
    terakhir = i;
  }
  return keluaran + latex.slice(terakhir);
}
