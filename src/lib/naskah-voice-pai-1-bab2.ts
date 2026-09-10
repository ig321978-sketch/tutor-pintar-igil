import { bersihkanNaskahLisanCerita } from "@/lib/naskah-lisan";

export const JEDA_PARAGRAF_BAB2_MS = 2_000;
export const JEDA_NASKAH_BAB2_MS = 3_000;

export type CuplikanVoiceMateri = {
  teks: string;
  jedaSetelahMs: number;
};

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

function naskahVoiceIman(): string[][] {
  return [
    [
      "Anak-anak, coba bayangkan sebuah rumah. Kalau tiangnya goyah, atapnya bisa ambruk. Hati kita juga seperti rumah. Tiang yang menahannya namanya iman.",
      "Iman artinya percaya. Bukan percaya main-main, tetapi yakin di hati, diucapkan di lidah, dan dibuktikan dengan perbuatan. Anak muslim yang salih percaya kepada Allah dan utusan-Nya.",
      "Rukun Iman ada 6 perkara. Enam ini seperti enam tiang rumah. Kalau satu tiang hilang, rumah terasa miring.",
      "Tiang pertama: iman kepada Allah. Allah yang menciptakan matahari, hujan, ibu, ayah, dan kalian. Tidak ada yang menyerupai Allah.",
      "Tiang kedua: iman kepada malaikat Allah. Mereka tidak pernah membantah. Ada yang mencatat kebaikan, ada yang menjaga kita.",
      "Tiang ketiga: iman kepada kitab-kitab Allah. Kitab adalah surat dan pedoman dari Allah. Kitab terakhir adalah Al Quran.",
      "Tiang keempat: iman kepada rasul-rasul Allah. Rasul mengajarkan cara menyembah Allah. Nabi Muhammad adalah rasul terakhir dan teladan kita.",
      "Tiang kelima: iman kepada hari kiamat. Suatu hari dunia akan berakhir. Semua kebaikan dan keburukan akan ditimbang dengan adil.",
      "Tiang keenam: iman kepada qada dan qadar. Ada ketentuan Allah yang bijaksana. Kita tetap berusaha, lalu menerima hasil dengan hati yang tenang.",
    ],
    [
      "Kalau sebuah rumah kehilangan satu tiang, kira-kira aman atau goyah ya? Nah, begitu juga iman. Kita tidak boleh memilih-milih. Enam tiang harus berdiri bersama. Jadi, rukun iman yang lengkap ada berapa? Enam.",
    ],
  ];
}

function naskahVoiceAsmaul(): string[][] {
  return [
    [
      "Anak-anak, nama yang indah membuat hati hangat. Allah memiliki banyak nama yang sangat indah. Kumpulan nama itu disebut Asmaul Husna.",
      "Hari ini kita pelajari dua nama. Yang pertama Ar Rahman. Yang kedua Ar Rahim.",
      "Ar Rahman artinya Allah Maha Pengasih. Kasih ini seperti payung besar. Payung itu menaungi semua makhluk: manusia, hewan, tumbuhan, bahkan orang yang belum mengenal Allah.",
      "Contohnya hujan. Hujan tidak hanya jatuh di kebun anak yang salat. Hujan juga membasahi kebun tetangga. Itu kasih Ar Rahman.",
      "Ar Rahim artinya Allah Maha Penyayang. Kasih ini seperti selimut hangat. Selimut itu diberikan kepada orang yang beriman dan menjaga hatinya.",
      "Ibu mengasihi semua anaknya, itu mirip Ar Rahman. Kalau anak jujur lalu dipeluk lebih erat, itu mirip Ar Rahim. Dua kasih ini indah, dan keduanya milik Allah.",
    ],
    [
      "Kalau Allah mengasihi semua makhluk, kira-kira kita boleh merundung teman yang berbeda? Tidak boleh. Karena meniru Ar Rahman, kita ikut mengasihi. Karena meniru Ar Rahim, kita menjaga iman dengan perbuatan lembut.",
    ],
  ];
}

function naskahVoiceAmal(): string[][] {
  return [
    [
      "Anak-anak, iman tinggal di hati, tetapi harus kelihatan. Kalau lampu menyala, ruangan jadi terang. Kalau iman menyala, perbuatan jadi baik.",
      "Hati yang yakin berkata: Allah melihatku. Maka pensil teman tidak kita ambil, meski tidak ada guru di dekat kita.",
      "Lisan yang lembut berkata: malaikat mencatat ucapanku. Maka kita memanggil teman dengan nama yang sopan, bukan julukan yang mengejek.",
      "Tangan yang menolong berkata: Allah Ar Rahman mengasihi semua makhluk. Maka kita berbagi bekal, menyiram tanaman, dan tidak menyakiti kucing.",
    ],
    [
      "Ada anak yang bilang, saya beriman, tetapi dia menyakiti kucing. Kira-kira imannya sudah lengkap atau masih bolong ya? Masih bolong. Iman yang benar terlihat dari perbuatan baik.",
    ],
  ];
}

export function cuplikanVoicePai1Bab2Iman(): CuplikanVoiceMateri[] {
  return cuplikanDariNaskah(
    naskahVoiceIman(),
    JEDA_PARAGRAF_BAB2_MS,
    JEDA_NASKAH_BAB2_MS,
  );
}

export function cuplikanVoicePai1Bab2Asmaul(): CuplikanVoiceMateri[] {
  return cuplikanDariNaskah(
    naskahVoiceAsmaul(),
    JEDA_PARAGRAF_BAB2_MS,
    JEDA_NASKAH_BAB2_MS,
  );
}

export function cuplikanVoicePai1Bab2Amal(): CuplikanVoiceMateri[] {
  return cuplikanDariNaskah(
    naskahVoiceAmal(),
    JEDA_PARAGRAF_BAB2_MS,
    JEDA_NASKAH_BAB2_MS,
  );
}
