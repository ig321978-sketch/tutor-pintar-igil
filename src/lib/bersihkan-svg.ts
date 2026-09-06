/** Rapikan keluaran Gemini agar blok SVG aman dan responsif. */

function ambilSvg(mentah: string): string {
  const teks = mentah
    .replace(/^```(?:\s*svg)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .trim();
  const cocok = teks.match(/<svg\b[\s\S]*<\/svg>/i);
  return cocok?.[0]?.trim() ?? "";
}

function kutipAtributGanda(svg: string): string {
  return svg.replace(
    /(\s[\w:-]+)\s*=\s*'([^']*)'/g,
    (_, nama: string, nilai: string) => `${nama}="${nilai.replace(/"/g, "")}"`,
  );
}

function buangBahaya(svg: string): string {
  return svg
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject\b[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\b(?:xlink:)?href\s*=\s*["']\s*javascript:[^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}

function rapikanUkuran(svg: string): string {
  const viewBox =
    /\bviewBox\s*=\s*["']([^"']+)["']/i.exec(svg)?.[1] ??
    (() => {
      const lebar = /\bwidth\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(svg)?.[1];
      const tinggi = /\bheight\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(svg)?.[1];
      return lebar && tinggi ? `0 0 ${lebar} ${tinggi}` : "0 0 400 240";
    })();

  let hasil = svg.replace(/<svg\b([^>]*)>/i, (_, atribut: string) => {
    let sisa = String(atribut)
      .replace(/\s+width\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+height\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s+viewBox\s*=\s*("[^"]*"|'[^']*')/gi, "");
    return `<svg${sisa} viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">`;
  });

  if (!/\sxmlns=/.test(hasil)) {
    hasil = hasil.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return hasil;
}

export function bersihkanSumberSvg(mentah: string): string {
  const svg = ambilSvg(mentah);
  if (!svg) return "";
  return rapikanUkuran(buangBahaya(kutipAtributGanda(svg)));
}
