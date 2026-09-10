import type { KelaminGuru } from "@/lib/guru";
import { bersihkanNaskahLisanCerita } from "@/lib/naskah-lisan";

export const JEDA_PARAGRAF_VOICE_MS = 3_000;
export const JEDA_NASKAH_VOICE_MS = 5_000;
export const JEDA_PARAGRAF_HARAKAT_MS = 2_000;
export const JEDA_NASKAH_HARAKAT_MS = 3_000;

export type CuplikanVoiceMateri = {
  teks: string;
  jedaSetelahMs: number;
};

const NASKAH_NYANYI_HIJAIYAH =
  "Alif, Ba, Ta, Tsa, Jim, Kha, Kho, Dal, Dzal, Ro, Zai, Sin, Syin, Shod, Dhod, Tho, Dzho, Ain, Ghin, Fa, Qof, Kaf, Lam, Mim, Nun, Wau, Ha, Lam Alif, Hamzah, Ya.";

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
    [NASKAH_NYANYI_HIJAIYAH],
  ];
}

function cuplikanDariNaskah(
  cerita: string[][],
  jedaParagrafMs: number,
  jedaNaskahMs: number,
): CuplikanVoiceMateri[] {
  const hasil: CuplikanVoiceMateri[] = [];
  cerita.forEach((paragraf, indeksNaskah) => {
    paragraf.forEach((teks, indeksParagraf) => {
      const akhirNaskah = indeksParagraf === paragraf.length - 1;
      const akhirSemua = indeksNaskah === cerita.length - 1 && akhirNaskah;
      hasil.push({
        teks: bersihkanNaskahLisanCerita(teks),
        jedaSetelahMs: akhirSemua
          ? 0
          : akhirNaskah
            ? jedaNaskahMs
            : jedaParagrafMs,
      });
    });
  });
  return hasil;
}

function naskahVoiceHarakat(): string[][] {
  return [
    [
      'Anak-anak, teman-teman Hijaiyah kita ini ternyata sangat pemalu. Kalau tidak dipakaikan "pakaian ajaib", mereka cuma diam dan tidak mau bersuara. Pakaian ajaib ini namanya Harakat, artinya: tanda baca.',
      "Ada 3 pakaian ajaib yang suka dipakai oleh huruf Hijaiyah. Yuk kita lihat apa yang terjadi kalau mereka memakainya!",
      'Fathah, Si Topi Ajaib. Fathah itu letaknya di atas kepala huruf, persis seperti topi. Kalau huruf pakai topi ini, suaranya akan terbuka menjadi "A". Buka mulutmu lebar-lebar seperti mau makan es krim! "Aaaa!" Contoh: Huruf Ba dipakaikan topi Fathah, bunyinya ba.',
      'Kasrah, Si Sepatu Roda. Kasrah letaknya selalu di bawah huruf, seperti sepatu. Kalau huruf pakai sepatu ini, suaranya ditarik ke bawah menjadi "I". Coba tarik bibirmu ke samping seperti orang tersenyum lebar! "Iiii!" Contoh: Huruf Ba dipakaikan sepatu Kasrah, bunyinya bi.',
      'Dhammah, Si Dasi. Dhammah letaknya di atas huruf melingkar seperti dasi. Kalau huruf pakai dasi ini, suaranya jadi membulat menjadi "U". Majukan bibirmu seperti mau meniup gelembung sabun! "Uuuu!" Contoh: Huruf Ba dipakaikan dasi Dhammah, bunyinya bu.',
    ],
    [
      "Anak-anak, apa yang terjadi kalau satu huruf, misalnya Ba, dipaksa memakai Topi dan Sepatu bersamaan? Kira-kira bingung tidak kita mendengarkan suaranya? Makanya, huruf itu hanya boleh memakai satu pakaian ajaib saja secara bergantian ya!",
    ],
  ];
}

export function cuplikanVoicePai1Bab1(
  kelamin: KelaminGuru,
): CuplikanVoiceMateri[] {
  return cuplikanDariNaskah(
    naskahVoiceCerita(kelamin),
    JEDA_PARAGRAF_VOICE_MS,
    JEDA_NASKAH_VOICE_MS,
  );
}

export function cuplikanVoicePai1Bab1Harakat(): CuplikanVoiceMateri[] {
  return cuplikanDariNaskah(
    naskahVoiceHarakat(),
    JEDA_PARAGRAF_HARAKAT_MS,
    JEDA_NASKAH_HARAKAT_MS,
  );
}
