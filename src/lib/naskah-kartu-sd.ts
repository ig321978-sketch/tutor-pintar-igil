import { pecahBlokNaskahModul, type BlokNaskahModul } from "@/lib/blok-naskah-modul";
import {
  pecahNaskahUntukEditor,
  buangPenandaBatasNaskah,
} from "@/lib/batas-naskah";
import {
  parseInfografisKelas1,
  tampilkanBarisWebsite,
  adalahNaskahInfografis,
  type BarisInfografis,
} from "@/lib/infografis-kelas1";
import { pecahBlokKartu, judulDariTeks } from "@/lib/konsep-materi";
import { potongLengkap, type DaftarLengkapTampil } from "@/lib/paket-lengkap-materi";
import { naskahTampilanPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";

export type KartuPembahasanSd = {
  kode: string;
  judul: string;
  pengantar: string;
  infografis: BarisInfografis[];
  lengkap: DaftarLengkapTampil[];
  blok: BlokNaskahModul[];
};

export type NaskahKartuSd = {
  judul: string;
  kartu: KartuPembahasanSd[];
};

function hurufKode(indeks: number, judul: string): { kode: string; judul: string } {
  const cocok = /^([A-H])\.\s*(.+)$/.exec(judul.trim());
  if (cocok) {
    return { kode: cocok[1], judul: cocok[2].replace(/\.$/, "").trim() };
  }
  return {
    kode: String.fromCharCode(65 + (indeks % 26)),
    judul: judul.replace(/\.$/, "").trim(),
  };
}

function adaKotakInfografis(teks: string): boolean {
  return /^(INFOGRAFIS\b|Kiri:|Kanan:|Tengah:)/im.test(teks.trim());
}

function infografisDariTubuh(
  judul: string,
  tubuh: string,
): ReturnType<typeof parseInfografisKelas1> {
  const sisa = tubuh.trim();
  if (!adaKotakInfografis(sisa)) return null;
  if (/^INFOGRAFIS\b/im.test(sisa)) return parseInfografisKelas1(sisa);
  return parseInfografisKelas1(`INFOGRAFIS\nJudul: ${judul}\n1. ${judul}\n${sisa}`);
}

function tabelDariTubuh(tubuh: string): BlokNaskahModul | null {
  const baris = tubuh
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item.includes("|"));
  if (baris.length < 3) return null;
  const pecah = (item: string) =>
    item
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((sel) => sel.trim());
  const header = pecah(baris[0]);
  const pemisah = pecah(baris[1]);
  if (!pemisah.every((sel) => /^:?-{3,}:?$/.test(sel))) return null;
  return {
    jenis: "tabel",
    header,
    baris: baris.slice(2).map(pecah),
  };
}

function kartuDariTubuh(
  judulMentah: string,
  tubuhMentah: string,
  indeks: number,
): KartuPembahasanSd {
  const { kode, judul } = hurufKode(indeks, judulMentah || judulDariTeks(tubuhMentah));
  const { tubuh, lengkap } = potongLengkap(buangPenandaBatasNaskah(tubuhMentah));
  const infografis = infografisDariTubuh(judul, tubuh);
  const barisInfografis = (infografis?.baris ?? []).filter(tampilkanBarisWebsite);
  const pakaiInfografis = barisInfografis.length > 0;
  const untukBlok = pakaiInfografis
    ? ""
    : tubuh.replace(/^Judul:\s*.+$/im, "").trim();
  const blokSemua = untukBlok ? pecahBlokNaskahModul(untukBlok) : [];
  let pengantar = "";
  const blok: BlokNaskahModul[] = [];
  const judulSetara = judul.replace(/\.$/, "").toLowerCase();
  for (const item of blokSemua) {
    if (
      item.jenis === "judul" &&
      item.teks.replace(/\.$/, "").toLowerCase() === judulSetara
    ) {
      continue;
    }
    if (!pengantar && (item.jenis === "paragraf" || item.jenis === "judul")) {
      if (item.teks.includes("|") && item.teks.split("|").length >= 3) {
        blok.push(item);
        continue;
      }
      pengantar = item.teks.trim();
      continue;
    }
    blok.push(item);
  }
  if (!blok.some((item) => item.jenis === "tabel")) {
    const tabel = tabelDariTubuh(untukBlok);
    if (tabel) blok.push(tabel);
  }
  if (blok.some((item) => item.jenis === "tabel")) {
    const sisa = blok.filter(
      (item) =>
        item.jenis === "tabel" ||
        (!(item.jenis === "paragraf" && item.teks.includes("|")) &&
          !(item.jenis === "judul" && item.teks.includes("|"))),
    );
    blok.length = 0;
    blok.push(...sisa);
  }
  if (!pengantar && infografis) {
    const pertama = barisInfografis[0];
    pengantar = [pertama?.kiri.artinya, pertama?.kanan?.artinya]
      .filter(Boolean)
      .join(". ");
  }
  return {
    kode,
    judul: judul || `Pembahasan ${indeks + 1}`,
    pengantar,
    infografis: barisInfografis,
    lengkap: lengkap.length ? lengkap : infografis?.lengkap ?? [],
    blok,
  };
}

function pecahJudulHuruf(teks: string): { judul: string; tubuh: string }[] {
  const potong = teks.split(/^(?=(?:#{1,3}\s+)?[A-H]\.\s+\S)/m);
  const hasil: { judul: string; tubuh: string }[] = [];
  for (const blok of potong) {
    const isi = blok.trim();
    if (!isi) continue;
    const kepala = /^(?:#{1,3}\s+)?([A-H]\.\s+.+)$/m.exec(isi);
    if (!kepala) {
      if (hasil.length === 0) hasil.push({ judul: judulDariTeks(isi), tubuh: isi });
      else hasil[hasil.length - 1].tubuh += `\n\n${isi}`;
      continue;
    }
    hasil.push({
      judul: kepala[1].replace(/^#{1,3}\s+/, "").trim(),
      tubuh: isi.replace(kepala[0], "").trim(),
    });
  }
  return hasil.filter((item) => item.judul || item.tubuh);
}

export function pecahKartuPembahasanSd(
  naskah: string,
  judulBab = "",
): NaskahKartuSd {
  const mentah = (naskah ?? "").replace(/^\uFEFF/, "").trim();
  if (!mentah) return { judul: judulBab, kartu: [] };

  const editor = pecahNaskahUntukEditor(mentah);
  const judulKepala =
    /^Judul:\s*(.+)$/im.exec(editor.kepala)?.[1]?.trim() ||
    /^#{1,2}\s+(.+)$/m.exec(editor.kepala)?.[1]?.trim() ||
    "";
  const infografisUtuh = adalahNaskahInfografis(mentah)
    ? parseInfografisKelas1(mentah)
    : null;

  const dariPagar = /<<<BAGIAN\s+\d+/i.test(mentah);
  if (dariPagar && editor.bagian.length > 0) {
    return {
      judul: judulKepala || judulBab,
      kartu: editor.bagian.map((item, i) =>
        kartuDariTubuh(item.judul, item.tubuh, i),
      ),
    };
  }

  if (infografisUtuh) {
    const baris = infografisUtuh.baris.filter(tampilkanBarisWebsite);
    if (baris.length > 0) {
      return {
        judul: infografisUtuh.judul || judulKepala || judulBab,
        kartu: baris.map((item, i) => {
          const dasar = kartuDariTubuh(item.judul, "", i);
          return {
            ...dasar,
            infografis: [item],
            lengkap: i === baris.length - 1 ? infografisUtuh.lengkap ?? [] : [],
            pengantar:
              dasar.pengantar ||
              [item.kiri.artinya, item.kanan?.artinya].filter(Boolean).join(". "),
          };
        }),
      };
    }
  }

  const huruf = pecahJudulHuruf(buangPenandaBatasNaskah(mentah));
  if (huruf.length >= 2) {
    return {
      judul: judulKepala || judulBab,
      kartu: huruf.map((item, i) => kartuDariTubuh(item.judul, item.tubuh, i)),
    };
  }

  const blokKartu = pecahBlokKartu(buangPenandaBatasNaskah(mentah), 10);
  return {
    judul: judulKepala || judulBab,
    kartu: blokKartu.map((item, i) => {
      const baris = item.split("\n").map((b) => b.trim()).filter(Boolean);
      const judul = judulDariTeks(baris[0] ?? item);
      const tubuh =
        baris[0] && judulDariTeks(baris[0]) === judul
          ? baris.slice(1).join("\n")
          : item;
      return kartuDariTubuh(judul, tubuh, i);
    }),
  };
}

export function naskahKartuSdLayak(teks?: string): boolean {
  const naskah = teks ?? "";
  if (naskahTampilanPai1Bab1(naskah)) return true;
  if (adalahNaskahInfografis(naskah)) return true;
  const { kartu } = pecahKartuPembahasanSd(naskah);
  return kartu.some(
    (item) =>
      item.pengantar.length >= 12 ||
      item.infografis.length > 0 ||
      item.blok.length > 0 ||
      item.lengkap.length > 0,
  );
}

export function daftarPendekUntukGrid(item: string[]): boolean {
  if (item.length < 2 || item.length > 16) return false;
  return item.every((isi) => isi.replace(/\s+/g, " ").trim().length <= 42);
}
