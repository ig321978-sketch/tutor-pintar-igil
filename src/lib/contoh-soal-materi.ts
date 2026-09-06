export type ContohTuntas = {
  judul: string;
  isi: string;
};

const POLA_AWAL = /^\s*#{0,3}\s*contoh\b/i;

export function pisahNaskahDanContoh(naskah: string): {
  uraian: string;
  contoh: ContohTuntas[];
} {
  const teks = naskah.trim();
  if (!teks) return { uraian: "", contoh: [] };

  const potongan = teks.split(/\n(?=#{0,3}\s*contoh\b)/i);
  const contoh: ContohTuntas[] = [];
  const sisa: string[] = [];

  for (const item of potongan) {
    const blok = item.trim();
    if (!blok) continue;
    const cocok =
      POLA_AWAL.test(blok) &&
      /langkah|penyelesaian|kunci|jawaban/i.test(blok);
    if (cocok && contoh.length < 2) {
      const baris = blok.split("\n");
      contoh.push({
        judul: baris[0]?.replace(/^#+\s*/, "").trim() || `Contoh soal ${contoh.length + 1}`,
        isi: blok,
      });
      continue;
    }
    sisa.push(blok);
  }

  return {
    uraian: sisa.join("\n\n").trim() || teks,
    contoh,
  };
}
