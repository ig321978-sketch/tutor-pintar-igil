import type { KelaminGuru } from "@/lib/guru";
import { bersihkanNaskahLisanCerita } from "@/lib/naskah-lisan";

export const JEDA_PARAGRAF_VOICE_MS = 3_000;
export const JEDA_NASKAH_VOICE_MS = 5_000;
export const JEDA_KATA_VOICE_MS = 1_000;
export const JEDA_KELOMPOK_10_KATA_MS = 2_000;

export type CuplikanVoiceMateri = {
  teks: string;
  jedaSetelahMs: number;
};

const NAMA_HIJAIYAH_NYANYI = [
  "Alif",
  "Ba",
  "Ta",
  "Tsa",
  "Jim",
  "Kha",
  "Kho",
  "Dal",
  "Dzal",
  "Ro",
  "Zai",
  "Sin",
  "Syin",
  "Shod",
  "Dhod",
  "Tho",
  "Dzho",
  "Ain",
  "Ghin",
  "Fa",
  "Qof",
  "Kaf",
  "Lam",
  "Mim",
  "Nun",
  "Wau",
  "Ha",
  "Lam Alif",
  "Hamzah",
  "Ya",
] as const;

const UCAPAN_HIJAIYAH_NYANYI: Record<(typeof NAMA_HIJAIYAH_NYANYI)[number], string> = {
  Alif: "Alif",
  Ba: "Baa",
  Ta: "Taa",
  Tsa: "Tsaa",
  Jim: "Jim",
  Kha: "Khaa",
  Kho: "Khoo",
  Dal: "Dal",
  Dzal: "Dzal",
  Ro: "Roo",
  Zai: "Zai",
  Sin: "Siin",
  Syin: "Syiin",
  Shod: "Shood",
  Dhod: "Dhood",
  Tho: "Thoo",
  Dzho: "Dzhoo",
  Ain: "Aain",
  Ghin: "Ghiin",
  Fa: "Faa",
  Qof: "Qoof",
  Kaf: "Kaaf",
  Lam: "Laam",
  Mim: "Miim",
  Nun: "Nuun",
  Wau: "Waau",
  Ha: "Haa",
  "Lam Alif": "Laam Alif",
  Hamzah: "Hamzah",
  Ya: "Yaa",
};

function sebutanGuru(kelamin: KelaminGuru): string {
  return kelamin === "pria" ? "Bapak Guru" : "Ibu Guru";
}

function naskahVoiceCerita(kelamin: KelaminGuru): string[][] {
  return [
    [
      "Anak-anak, kalau kita masuk ke sekolah baru, pasti kita akan bertemu dengan banyak teman baru, kan? Nah, di dalam Al-Qur'an juga ada 30 teman baru yang ingin berkenalan dengan kalian!",
      "Kumpulan teman baru ini namanya Huruf Hijaiyah. Bentuk mereka unik-unik dan lucu, lho.",
      "Coba lihat teman kita yang pertama. Bentuknya kurus dan berdiri tegak seperti pensil. Namanya adalah Alif.",
      "Sekarang lihat teman kita yang paling terakhir. Bentuknya melengkung seperti angsa yang sedang berenang. Namanya Ya.",
    ],
    [
      `Coba bayangkan kalau di kelas ini semua anak wajahnya sama persis dan namanya sama semua, pasti ${sebutanGuru(kelamin)} bingung kan saat memanggil? Menurut kalian, kenapa ya 30 huruf Hijaiyah ini diciptakan oleh Allah dengan bentuk yang berbeda-beda?`,
    ],
    [
      "Yuk, kita panggil nama teman-teman baru ini satu per satu! Mari bernyanyi lagu huruf hijaiyah bersama-sama sambil menunjuk hurufnya!",
    ],
  ];
}

function cuplikanNyanyiHijaiyah(): CuplikanVoiceMateri[] {
  return NAMA_HIJAIYAH_NYANYI.map((nama, indeks) => {
    const nomor = indeks + 1;
    const terakhir = nomor === NAMA_HIJAIYAH_NYANYI.length;
    const batasSepuluh = nomor % 10 === 0;
    return {
      teks: UCAPAN_HIJAIYAH_NYANYI[nama],
      jedaSetelahMs: terakhir
        ? 0
        : batasSepuluh
          ? JEDA_KELOMPOK_10_KATA_MS
          : JEDA_KATA_VOICE_MS,
    };
  });
}

export function cuplikanVoicePai1Bab1(
  kelamin: KelaminGuru,
): CuplikanVoiceMateri[] {
  const cerita = naskahVoiceCerita(kelamin);
  const hasil: CuplikanVoiceMateri[] = [];
  cerita.forEach((paragraf, indeksNaskah) => {
    paragraf.forEach((teks, indeksParagraf) => {
      const akhirNaskah = indeksParagraf === paragraf.length - 1;
      hasil.push({
        teks: bersihkanNaskahLisanCerita(teks),
        jedaSetelahMs: akhirNaskah
          ? JEDA_NASKAH_VOICE_MS
          : JEDA_PARAGRAF_VOICE_MS,
      });
    });
  });
  return [...hasil, ...cuplikanNyanyiHijaiyah()];
}
