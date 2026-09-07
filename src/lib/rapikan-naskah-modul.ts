const AWAL_MERMAID =
  /^(?:graph|flowchart|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph)\b/;

function bungkusMermaidTelanjang(teks: string): string {
  const baris = teks.split("\n");
  const hasil: string[] = [];
  let dalamPagar = false;
  let dalamMermaid = false;

  const tutup = () => {
    if (dalamMermaid) {
      hasil.push("```");
      dalamMermaid = false;
    }
  };

  for (const item of baris) {
    const potong = item.trim();
    if (/^(```|~~~)/.test(potong)) {
      tutup();
      dalamPagar = !dalamPagar;
      hasil.push(item.replace(/^(```|~~~)\s*mermaid\b/i, "```mermaid"));
      continue;
    }

    if (!dalamPagar && !dalamMermaid && AWAL_MERMAID.test(potong)) {
      hasil.push("```mermaid");
      hasil.push(item);
      dalamMermaid = true;
      continue;
    }

    if (dalamMermaid) {
      if (
        !potong ||
        /^#{1,6}\s/.test(potong) ||
        /^\$\$/.test(potong) ||
        /^Contoh soal/i.test(potong)
      ) {
        tutup();
        hasil.push(item);
        continue;
      }
    }

    hasil.push(item);
  }

  tutup();
  return hasil.join("\n");
}

function bungkusLatexTelanjang(teks: string): string {
  const bagian = teks.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$|```[\s\S]*?```)/);
  return bagian
    .map((chunk, indeks) => {
      if (indeks % 2 === 1 || /\$/.test(chunk)) return chunk;
      return chunk
        .replace(
          /\\((?:d|t|c)?frac|sqrt|sum|int|vec|hat|overline)\b(?:\s*\[[^\]]*\])?(?:\s*\{[^{}]*\})+/g,
          "$$$&$",
        )
        .replace(/\\(alpha|beta|gamma|delta|Delta|epsilon|varepsilon|theta|lambda|mu|pi|rho|sigma|phi|omega|Omega)\b/g, "$$$&$")
        .replace(/\b([A-Za-z])_(\d+)\b/g, "$$$1_{$2}$")
        .replace(/\b([A-Za-z])\^(\d+)\b/g, "$$$1^{$2}$");
    })
    .join("");
}

/** Rapikan keluaran Gemini agar KaTeX dan Mermaid bisa dirender. */
export function rapikanNaskahModul(teks: string): string {
  let hasil = teks.replace(/\r\n/g, "\n");
  hasil = hasil.replace(/\\\[([\s\S]*?)\\\]/g, (_, isi: string) => `\n$$\n${isi.trim()}\n$$\n`);
  hasil = hasil.replace(/\\\(([\s\S]*?)\\\)/g, (_, isi: string) => `$${isi.trim()}$`);
  hasil = hasil.replace(/```\s*mermaid\b/gi, "```mermaid");
  hasil = hasil.replace(/~~~\s*mermaid\b/gi, "```mermaid");
  hasil = hasil.replace(/```svg\b[\s\S]*?```/gi, "");
  hasil = hasil.replace(/~~~svg\b[\s\S]*?~~~/gi, "");
  hasil = hasil.replace(/<svg\b[\s\S]*?<\/svg>/gi, "");
  hasil = bungkusMermaidTelanjang(hasil);
  hasil = hasil
    .split(/(```[\s\S]*?```)/)
    .map((chunk, indeks) => {
      if (indeks % 2 === 1) return chunk;
      return chunk.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, "\n$$$$\n$1\n$$$$\n");
    })
    .join("");
  hasil = bungkusLatexTelanjang(hasil);
  return hasil;
}
