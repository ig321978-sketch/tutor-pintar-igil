import { latexKeLabelDatar } from "@/lib/latex-ke-teks";

const AWAL_DIAGRAM =
  /^(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|sankey-beta|xychart-beta|block-beta)\b/i;

const BARIS_KHUSUS =
  /^\s*(?:style|classDef|class|linkStyle|click|subgraph|end|direction|%%)/i;

const PANAH = /(\s*(?:-->|---|-.->|==>|===|--o|o--|x--|--x)\s*)/;

function decodeEntitas(teks: string): string {
  return teks
    .replace(/&quot;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, " ")
    .replace(/&gt;/g, " ")
    .replace(/&amp;/g, " dan ")
    .replace(/&nbsp;/g, " ");
}

function buangPagar(teks: string): string {
  return teks
    .replace(/^```(?:\s*mermaid)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .replace(/^~~~\s*(?:mermaid)?\s*/i, "")
    .replace(/\s*~~~$/i, "")
    .trim();
}

export function kutipLabelAman(label: string): string {
  let isi = latexKeLabelDatar(
    label.replace(/</g, " kurang dari ").replace(/>/g, " lebih dari "),
  );
  isi = isi
    .replace(/["']/g, "")
    .replace(/[<>]/g, " ")
    .replace(/[{}#&;\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!isi) isi = "langkah";
  return `"${isi}"`;
}

function rapikanIsiLabel(label: string): string {
  return kutipLabelAman(label).slice(1, -1);
}

function gantiLatexDiTeks(teks: string): string {
  return teks
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, isi: string) => latexKeLabelDatar(isi))
    .replace(/\$([^$\n]+)\$/g, (_, isi: string) => latexKeLabelDatar(isi))
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, isi: string) => latexKeLabelDatar(isi))
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, isi: string) => latexKeLabelDatar(isi));
}

function rapikanLabelBentuk(teks: string): string {
  return teks
    .replace(/\[(?!['"])([^\]\n]+)\]/g, (_, label: string) => `[${kutipLabelAman(label)}]`)
    .replace(/\(\[(?!['"])([^\]\n]+)\]\)/g, (_, label: string) => `([${kutipLabelAman(label)}])`)
    .replace(/\(\((?!['"])([^)\n]+)\)\)/g, (_, label: string) => `((${kutipLabelAman(label)}))`)
    .replace(/\{\{(?!['"])([^}\n]+)\}\}/g, (_, label: string) => `{{${kutipLabelAman(label)}}}`)
    .replace(/\{(?!['"{])([^}\n]+)\}/g, (_, label: string) => `{${kutipLabelAman(label)}}`)
    .replace(/\['([^']*)'\]/g, (_, label: string) => `[${kutipLabelAman(label)}]`)
    .replace(/\["([^"]*)"\]/g, (_, label: string) => `[${kutipLabelAman(label)}]`)
    .replace(/\|'([^']*)'\|/g, (_, label: string) => `|${rapikanIsiLabel(label)}|`)
    .replace(/\|"([^"]*)"\|/g, (_, label: string) => `|${rapikanIsiLabel(label)}|`)
    .replace(/\|(?!['"])([^|\n]+)\|/g, (_, label: string) => `|${rapikanIsiLabel(label)}|`);
}

function gantiSisiAlur(
  sisi: string,
  peta: Map<string, string>,
  nextId: () => string,
): string {
  const potong = sisi.trim();
  if (!potong) return sisi;

  const denganTepi = potong.match(/^(\|[^|]*\|)\s*(.*)$/);
  if (denganTepi) {
    const tepi = `|${rapikanIsiLabel(denganTepi[1].slice(1, -1).replace(/^['"]|['"]$/g, ""))}|`;
    const sisa = gantiSisiAlur(denganTepi[2], peta, nextId);
    return `${tepi} ${sisa}`.trim();
  }

  if (/^[A-Za-z][\w-]*\s*[\[\(\{>]/.test(potong)) return potong;
  if (/^[A-Za-z][\w-]*$/.test(potong)) return potong;

  const ada = peta.get(potong);
  if (ada) return ada;
  const id = nextId();
  const ganti = `${id}[${kutipLabelAman(potong)}]`;
  peta.set(potong, ganti);
  return ganti;
}

function rapikanIdBergabung(teks: string): string {
  const peta = new Map<string, string>();
  let urutan = 0;
  const nextId = () => {
    urutan += 1;
    return `n${urutan}`;
  };

  return teks
    .split("\n")
    .map((baris) => {
      if (BARIS_KHUSUS.test(baris)) return baris;
      if (!PANAH.test(baris)) return baris;
      const bagian = baris.split(PANAH);
      if (bagian.length < 3) return baris;
      return bagian
        .map((item, indeks) =>
          indeks % 2 === 1 ? item : gantiSisiAlur(item, peta, nextId),
        )
        .join("");
    })
    .join("\n");
}

function panahBermuatanJadiNode(teks: string): string {
  let urutan = 0;
  return teks.replace(
    /(\b[A-Za-z][\w-]*(?:\[[^\]]+\])?)\s*-->\s*\|([^|]+)\|\s*(\b[A-Za-z][\w-]*(?:\[[^\]]+\])?)/g,
    (cocok, awal: string, label: string, akhir: string) => {
      const isi = rapikanIsiLabel(label);
      if (!isi) return cocok;
      if (!/[=+/]| per /.test(isi) && isi.length < 16) {
        return `${awal} -->|${isi}| ${akhir}`;
      }
      urutan += 1;
      return `${awal} --> e${urutan}["${isi}"] --> ${akhir}`;
    },
  );
}

function buangKomentarBerbahaya(teks: string): string {
  return teks
    .split("\n")
    .map((baris) => {
      if (/^\s*(?:style|classDef|linkStyle)\b/i.test(baris)) return baris;
      const tanpaHash = baris.replace(/(^|\s)#[^\n]*/g, " ");
      return tanpaHash.replace(/%%(?!\{).*$/g, "").trimEnd();
    })
    .join("\n");
}

function pastikanJenisDiagram(teks: string): string {
  const baris = teks
    .split("\n")
    .map((item) => item.trimEnd())
    .filter((item, indeks, semua) => item.trim() || indeks === 0 || semua[indeks - 1].trim());
  const pertama = baris.find((item) => item.trim() && !item.trim().startsWith("%%"));
  if (pertama && AWAL_DIAGRAM.test(pertama.trim())) {
    return baris.join("\n").replace(/^(\s*)graph\b/im, "$1flowchart");
  }
  return `flowchart TD\n${baris.join("\n")}`;
}

export function bersihkanSumberMermaid(mentah: string, agresif = false): string {
  let teks = buangPagar(mentah);
  teks = decodeEntitas(teks).replace(/\r\n/g, "\n").replace(/"/g, "'");
  teks = teks.replace(/%%\{[\s\S]*?\}%%/g, "");
  teks = teks.replace(/<br\s*\/?>/gi, " ");
  teks = teks.replace(
    /<\/?(?:b|i|em|strong|span|div|p|u|small|sub|sup|font|img)(?:\s[^>\n]*)?>/gi,
    " ",
  );
  teks = gantiLatexDiTeks(teks);
  if (/\\[a-zA-Z]+/.test(teks)) {
    teks = teks.replace(/\\[a-zA-Z]+(?:\s*\{[^{}]*\})?/g, (cocok) =>
      latexKeLabelDatar(cocok),
    );
  }
  teks = buangKomentarBerbahaya(teks);
  teks = pastikanJenisDiagram(teks);

  if (/^(?:flowchart|graph)\b/im.test(teks)) {
    teks = rapikanLabelBentuk(teks);
    teks = rapikanIdBergabung(teks);
    teks = panahBermuatanJadiNode(teks);
  }

  if (agresif) {
    teks = teks
      .split("\n")
      .filter((baris) => !/^\s*(?:style|classDef|class|linkStyle|click)\b/i.test(baris))
      .join("\n");
    teks = teks.replace(/[<>]/g, " ");
  }

  return teks
    .split("\n")
    .map((baris) => baris.replace(/[ \t]+/g, " ").trimEnd())
    .filter((baris, indeks, semua) => baris.trim() || (indeks > 0 && semua[indeks - 1].trim()))
    .join("\n")
    .trim();
}

export function mermaidSederhanaDariLabel(label: string[]): string {
  const aman = label
    .map((item) => item.replace(/"/g, "").trim())
    .filter((item) => item.length >= 3)
    .slice(0, 5);
  if (!aman.length) return 'flowchart TD\n  a["Konsep"]';
  if (aman.length === 1) return `flowchart TD\n  a["${aman[0]}"]`;
  const nodes = aman.map((item, i) => `  n${i}["${item}"]`);
  const edges = aman.slice(1).map((_, i) => `  n${i} --> n${i + 1}`);
  return `flowchart TD\n${nodes.join("\n")}\n${edges.join("\n")}`;
}

export function labelDariMermaid(sumber: string): string[] {
  const seen = new Set<string>();
  const hasil: string[] = [];
  const pola = /\["([^"]+)"\]|\['([^']+)'\]|\[([^\]]+)\]/g;
  for (const cocok of sumber.matchAll(pola)) {
    const label = rapikanIsiLabel(cocok[1] || cocok[2] || cocok[3] || "");
    if (!label || seen.has(label)) continue;
    seen.add(label);
    hasil.push(label);
    if (hasil.length >= 10) break;
  }
  return hasil;
}
