import type { KelaminGuru } from "@/lib/guru";

export const JEDA_PARAGRAF_VOICE_MS = 3_000;
export const JEDA_NASKAH_VOICE_MS = 5_000;

export type CuplikanVoiceMateri = {
  teks: string;
  jedaSetelahMs: number;
};

function sebutanGuru(kelamin: KelaminGuru): string {
  return kelamin === "pria" ? "Bapak Guru" : "Ibu Guru";
}

function naskahVoicePai1Bab1(kelamin: KelaminGuru): string[][] {
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
      "Yuk, kita panggil nama teman-teman baru ini satu per satu! Mari bernyanyi lagu huruf hijaiyah bersama-sama sambil menunjuk hurufnya!..",
    ],
  ];
}

export function cuplikanVoicePai1Bab1(
  kelamin: KelaminGuru,
): CuplikanVoiceMateri[] {
  const naskah = naskahVoicePai1Bab1(kelamin);
  const hasil: CuplikanVoiceMateri[] = [];
  naskah.forEach((paragraf, indeksNaskah) => {
    paragraf.forEach((teks, indeksParagraf) => {
      const akhirNaskah = indeksParagraf === paragraf.length - 1;
      const akhirSemua =
        akhirNaskah && indeksNaskah === naskah.length - 1;
      hasil.push({
        teks,
        jedaSetelahMs: akhirSemua
          ? 0
          : akhirNaskah
            ? JEDA_NASKAH_VOICE_MS
            : JEDA_PARAGRAF_VOICE_MS,
      });
    });
  });
  return hasil;
}
