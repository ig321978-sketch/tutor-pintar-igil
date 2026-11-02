const POLA_BUKA =
  /^<<<BAGIAN\s+(\d+)\s*(?:\|\s*(.*))?>>>\s*$/i;
const POLA_TUTUP = /^<<<AKHIR BAGIAN(?:\s+\d+)?>>>\s*$/i;

export type BagianNaskahEditor = {
  nomor: number;
  judul: string;
  tubuh: string;
};

export type NaskahTerpecah = {
  kepala: string;
  bagian: BagianNaskahEditor[];
};

export function adalahPenandaBatasNaskah(baris: string): boolean {
  const t = baris.trim();
  return POLA_BUKA.test(t) || POLA_TUTUP.test(t);
}

export function buangPenandaBatasNaskah(teks?: string): string {
  return (teks ?? "")
    .replace(/^\uFEFF/, "")
    .split("\n")
    .filter((baris) => !adalahPenandaBatasNaskah(baris))
    .join("\n");
}

function judulDariTubuh(tubuh: string, cadangan: string): string {
  const infografis = /^(\d{1,3})\.\s+(.+)$/m.exec(tubuh.trim());
  if (infografis) return infografis[2].split("\n")[0]?.trim() || cadangan;
  const markdown = /^#{1,3}\s+(.+)$/m.exec(tubuh.trim());
  if (markdown) return markdown[1].trim();
  const lengkap = /^LENGKAP:\s*(.+)$/im.exec(tubuh.trim());
  if (lengkap) return `LENGKAP: ${lengkap[1].trim()}`;
  return cadangan;
}

function pecahDariPagar(teks: string): NaskahTerpecah | null {
  const baris = teks.replace(/\r\n/g, "\n").split("\n");
  const bagian: BagianNaskahEditor[] = [];
  let kepala: string[] = [];
  let aktif: { nomor: number; judul: string; isi: string[] } | null = null;
  let sebelumPagar = true;

  const tutupAktif = () => {
    if (!aktif) return;
    bagian.push({
      nomor: aktif.nomor,
      judul: aktif.judul.trim() || `Bagian ${aktif.nomor}`,
      tubuh: aktif.isi.join("\n"),
    });
    aktif = null;
  };

  for (const item of baris) {
    const buka = POLA_BUKA.exec(item.trim());
    if (buka) {
      sebelumPagar = false;
      tutupAktif();
      aktif = {
        nomor: Number(buka[1]) || bagian.length + 1,
        judul: (buka[2] ?? "").trim(),
        isi: [],
      };
      continue;
    }
    if (POLA_TUTUP.test(item.trim())) {
      tutupAktif();
      continue;
    }
    if (sebelumPagar && !aktif) {
      kepala.push(item);
      continue;
    }
    if (aktif) aktif.isi.push(item);
    else kepala.push(item);
  }
  tutupAktif();
  if (bagian.length === 0) return null;
  return {
    kepala: kepala.join("\n").trim(),
    bagian: bagian.map((item, i) => ({
      ...item,
      judul: item.judul || judulDariTubuh(item.tubuh, `Bagian ${i + 1}`),
    })),
  };
}

function pecahInfografis(teks: string): NaskahTerpecah | null {
  const naskah = buangPenandaBatasNaskah(teks).trim();
  if (!/^INFOGRAFIS\b/im.test(naskah)) return null;
  const cocokLengkap = /(?:^|\n)LENGKAP:\s*/i.exec(naskah);
  const tubuh = (cocokLengkap ? naskah.slice(0, cocokLengkap.index) : naskah).trim();
  const ekor = cocokLengkap
    ? naskah.slice(cocokLengkap.index).replace(/^\n/, "")
    : "";

  const tanpaInfo = tubuh.replace(/^INFOGRAFIS\s*/i, "").trim();
  const judul = /^Judul:\s*(.+)$/im.exec(tanpaInfo);
  const kepala = judul
    ? `INFOGRAFIS\nJudul: ${judul[1].trim()}`
    : "INFOGRAFIS";
  const sisa = judul
    ? tanpaInfo.replace(/^Judul:\s*.+$/im, "").trim()
    : tanpaInfo;
  const blok = sisa.split(/^(?=\d{1,3}\.\s+)/m).filter((item) => item.trim());
  const bagian: BagianNaskahEditor[] = blok.map((item, i) => {
    const tubuhBlok = item.trim();
    const kepalaBlok = /^(\d{1,3})\.\s+(.+)$/m.exec(tubuhBlok);
    return {
      nomor: Number(kepalaBlok?.[1] ?? i + 1),
      judul: (kepalaBlok?.[2]?.split("\n")[0] ?? `Bagian ${i + 1}`).trim(),
      tubuh: tubuhBlok,
    };
  });

  if (ekor.trim()) {
    const blokLengkap = ekor.split(/(?=^LENGKAP:\s*)/im).filter((item) => item.trim());
    for (const item of blokLengkap) {
      bagian.push({
        nomor: bagian.length + 1,
        judul: judulDariTubuh(item.trim(), `Lengkap ${bagian.length + 1}`),
        tubuh: item.trim(),
      });
    }
  }

  if (bagian.length === 0) return null;
  return { kepala, bagian };
}

export function pecahNaskahUntukEditor(teks: string): NaskahTerpecah {
  const mentah = (teks ?? "").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const dariPagar = pecahDariPagar(mentah);
  if (dariPagar && dariPagar.bagian.length > 0) return dariPagar;
  const infografis = pecahInfografis(mentah);
  if (infografis) return infografis;
  const isi = mentah.trim();
  return {
    kepala: "",
    bagian: isi
      ? [{ nomor: 1, judul: judulDariTubuh(isi, "Naskah materi"), tubuh: isi }]
      : [],
  };
}

export function gabungNaskahDariEditor(data: NaskahTerpecah): string {
  const isi = data.bagian
    .map((item, i) => {
      const nomor = item.nomor || i + 1;
      const judul = item.judul.trim() || `Bagian ${nomor}`;
      return `<<<BAGIAN ${nomor} | ${judul}>>>\n${item.tubuh}\n<<<AKHIR BAGIAN ${nomor}>>>`;
    })
    .join("\n\n");
  return [data.kepala.trim(), isi].filter(Boolean).join("\n\n");
}

export function naskahPunyaBanyakBagian(teks: string): boolean {
  return pecahNaskahUntukEditor(teks).bagian.length > 1;
}
