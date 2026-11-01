import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

export const JUDUL_MTK1_BAB9 = "Bab 9: CONTOH";

export const MODUL_MTK1_BAB9: ModulResmiPai = {
  id: "mtk-1-bab9",
  judul: JUDUL_MTK1_BAB9,
  pola: /^bab 9: contoh$/,
  motivasi: "Ayo membilang sampai dengan 10.",
  kunciJawaban: "",
  sketsaKartu: [],
  latihan: "",
  kartu: [
    {
      kode: "A",
      judul: "CONTOH",
      pengantar: "Bingkai 10, membandingkan, maju mundur, dan pasangan bilangan.",
      labelDaftar: "Empat sub-bab",
      kolom: 1,
      item: [
        { nama: "Membilang 0–10", uraian: "Bingkai 10 dan lambang bilangan." },
        { nama: "Membandingkan", uraian: "Lebih banyak, lebih sedikit, atau sama." },
        { nama: "Maju dan mundur", uraian: "Urutan bilangan 0 sampai 10." },
        { nama: "Pasangan bilangan", uraian: "Menyusun dan mengurai bilangan." },
      ],
      kuis: [],
      voice: [],
    },
  ],
};
