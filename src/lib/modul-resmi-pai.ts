import type { IsiCacheMateri } from "@/lib/jenis-cache-materi";
import { gabungNaskahDariEditor } from "@/lib/batas-naskah";

export type ItemKartuResmi = {
  nama: string;
  nomor?: number;
  arab?: string;
  latin?: string;
  singkat?: string;
  uraian: string;
  contoh?: string;
};

export type KuisSuaraResmi = {
  pertanyaan: string;
  alias: string[];
};

export type KartuModulResmi = {
  kode: string;
  judul: string;
  pengantar: string;
  labelDaftar?: string;
  kolom?: 1 | 2 | 3;
  item: ItemKartuResmi[];
  kuis: KuisSuaraResmi[];
  voice: string[][];
};

export type ModulResmiPai = {
  id: string;
  judul: string;
  pola: RegExp;
  motivasi: string;
  kunciJawaban: string;
  latihan: string;
  sketsaKartu: string[];
  kartu: KartuModulResmi[];
};

export function naskahTampilanModulResmi(
  modul: ModulResmiPai,
  teks?: string,
): boolean {
  const naskah = teks ?? "";
  if (/\[Soal\s+\d+/i.test(naskah)) return false;
  return naskah.includes(modul.judul) && naskah.includes(modul.kartu[0]?.judul ?? "");
}

export function teksLisanModulResmi(modul: ModulResmiPai): string {
  const kartu = modul.kartu
    .map((item) => {
      const isi = item.item
        .map((baris) =>
          [baris.nama, baris.latin, baris.uraian, baris.contoh ? `Contoh ${baris.contoh}` : ""]
            .filter(Boolean)
            .join(". "),
        )
        .join(" ");
      return [item.judul, item.pengantar, item.labelDaftar, isi]
        .filter(Boolean)
        .join(". ");
    })
    .join(" ");
  return [modul.judul, kartu].join(" ");
}

export function isiCacheDariModulResmi(modul: ModulResmiPai): IsiCacheMateri {
  const kurikulum = gabungNaskahDariEditor({
    kepala: `Judul: ${modul.judul}\nWaktu: 4 JP`,
    bagian: modul.kartu.map((kartu, indeks) => ({
      nomor: indeks + 1,
      judul: kartu.judul,
      tubuh: [
        kartu.pengantar,
        "",
        kartu.labelDaftar ? `LENGKAP: ${kartu.labelDaftar}` : "",
        ...kartu.item.map((item, i) => {
          const nama = item.nomor ? `${item.nomor}. ${item.nama}` : `${i + 1}. ${item.nama}`;
          const arab = item.arab ? ` ${item.arab}` : "";
          const latin = item.latin ? ` (${item.latin})` : "";
          const contoh = item.contoh ? ` Contoh: ${item.contoh}` : "";
          return `${nama}${arab}${latin}: ${item.uraian}${contoh}`;
        }),
      ]
        .filter((baris) => baris !== "")
        .join("\n"),
    })),
  });
  return {
    curriculum_view: kurikulum,
    global_best_view: kurikulum,
    sketsaKartu: modul.sketsaKartu.join("\n\n"),
    svgCode: "",
    pertanyaan: modul.latihan,
    kunciJawaban: modul.kunciJawaban,
    motivasi: modul.motivasi,
    referensiUrl: "",
  };
}
