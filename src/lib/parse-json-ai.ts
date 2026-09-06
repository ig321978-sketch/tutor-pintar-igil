const ESCAPE_SATU = new Set(["b", "f", "n", "r", "t"]);

function harusGandakanBackslash(teks: string, indeks: number): boolean {
  const berikutnya = teks[indeks + 1];
  if (!berikutnya) return true;
  if (berikutnya === '"' || berikutnya === "\\" || berikutnya === "/") return false;
  if (berikutnya === "u") {
    return !/^[0-9a-fA-F]{4}$/.test(teks.slice(indeks + 2, indeks + 6));
  }
  if (ESCAPE_SATU.has(berikutnya)) {
    const setelah = teks[indeks + 2];
    return Boolean(setelah && /[A-Za-z]/.test(setelah));
  }
  return true;
}

function rapikanEscapeDalamString(teks: string): string {
  let hasil = "";
  let dalamString = false;
  let escape = false;
  for (let i = 0; i < teks.length; i += 1) {
    const huruf = teks[i];
    if (!dalamString) {
      hasil += huruf;
      if (huruf === '"') dalamString = true;
      continue;
    }
    if (escape) {
      hasil += huruf;
      escape = false;
      continue;
    }
    if (huruf === "\\") {
      if (harusGandakanBackslash(teks, i)) {
        hasil += "\\\\";
        continue;
      }
      hasil += huruf;
      escape = true;
      continue;
    }
    if (huruf === "\n") {
      hasil += "\\n";
      continue;
    }
    if (huruf === "\r") {
      hasil += "\\r";
      continue;
    }
    if (huruf === "\t") {
      hasil += "\\t";
      continue;
    }
    if (huruf === '"') dalamString = false;
    hasil += huruf;
  }
  return hasil;
}

function kutipTunggalKeJson(teks: string): string {
  let hasil = "";
  let i = 0;
  while (i < teks.length) {
    const huruf = teks[i];
    if (huruf === '"') {
      hasil += huruf;
      i += 1;
      while (i < teks.length) {
        const isi = teks[i];
        hasil += isi;
        if (isi === "\\" && i + 1 < teks.length) {
          hasil += teks[i + 1];
          i += 2;
          continue;
        }
        i += 1;
        if (isi === '"') break;
      }
      continue;
    }
    if (huruf === "'") {
      hasil += '"';
      i += 1;
      while (i < teks.length) {
        const isi = teks[i];
        if (isi === "\\" && i + 1 < teks.length) {
          const lanjut = teks[i + 1];
          if (lanjut === "'") {
            hasil += "'";
            i += 2;
            continue;
          }
          hasil += isi + lanjut;
          i += 2;
          continue;
        }
        if (isi === "'") {
          hasil += '"';
          i += 1;
          break;
        }
        if (isi === '"') {
          hasil += '\\"';
          i += 1;
          continue;
        }
        hasil += isi;
        i += 1;
      }
      continue;
    }
    hasil += huruf;
    i += 1;
  }
  return hasil;
}

function potongObjek(mentah: string): string {
  let teks = mentah.trim();
  const bungkus = teks.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (bungkus?.[1]) teks = bungkus[1].trim();
  const awal = teks.indexOf("{");
  const akhir = teks.lastIndexOf("}");
  if (awal === -1 || akhir === -1 || akhir <= awal) {
    throw new Error("AI tidak menghasilkan format JSON.");
  }
  return teks.slice(awal, akhir + 1);
}

function cobaParse(teks: string): Record<string, unknown> | null {
  try {
    return JSON.parse(teks) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function bersihkanDanParseJson(mentah: string): Record<string, unknown> {
  const objek = potongObjek(mentah);
  const kandidat = [
    objek,
    objek.replace(/,\s*([}\]])/g, "$1"),
    rapikanEscapeDalamString(objek),
    rapikanEscapeDalamString(objek.replace(/,\s*([}\]])/g, "$1")),
    kutipTunggalKeJson(objek),
    rapikanEscapeDalamString(kutipTunggalKeJson(objek).replace(/,\s*([}\]])/g, "$1")),
  ];

  for (const teks of kandidat) {
    const hasil = cobaParse(teks);
    if (hasil) return hasil;
  }

  throw new Error("AI tidak menghasilkan format JSON yang bisa dibaca.");
}
