import type { IsiCacheMateri } from "@/lib/cache-materi-tutor";
import { gabungNaskahDariEditor } from "@/lib/batas-naskah";
import {
  FATIHAH,
  formatBlokLengkap,
  HIJAIYAH_30,
  type PaketLengkap,
} from "@/lib/paket-lengkap-materi";

export const JUDUL_PAI1_BAB1 = "Bab 1: Aku Cinta Al-Qur'an";

export const TEKS_KARTU_HIJAIYAH =
  "Huruf Hijaiyah adalah huruf arab berjumlah 30 huruf yang digunakan di dalam Al-Qur'an.";

export const TEKS_KARTU_HARAKAT =
  "Supaya huruf hijaiyah bisa dibaca, kita membutuhkan harakat (tanda baca). Tiga harakat dasar yang harus kita ketahui:";

export const TEKS_KARTU_FATIHAH =
  "Surah Al-Fatihah adalah surah pertama dalam Al-Qur'an. Al-Fatihah artinya Pembukaan. Surah ini terdiri dari 7 ayat dan wajib dibaca setiap kita salat.";

export const HARAKAT_PAI1_BAB1 = [
  {
    nama: "Fathah",
    lambang: "َ",
    uraian: 'Letaknya di atas huruf, bersuara "A".',
    contohArab: "بَ",
    contohLatin: "Ba",
  },
  {
    nama: "Kasrah",
    lambang: "ِ",
    uraian: 'Letaknya di bawah huruf, bersuara "I".',
    contohArab: "بِ",
    contohLatin: "Bi",
  },
  {
    nama: "Dhammah",
    lambang: "ُ",
    uraian: 'Letaknya di atas huruf berbentuk wau kecil, bersuara "U".',
    contohArab: "بُ",
    contohLatin: "Bu",
  },
] as const;

function paketDari(
  id: string,
  judul: string,
  jenis: PaketLengkap["jenis"],
  item: PaketLengkap["item"],
): PaketLengkap {
  return { id, judul, jenis, pola: /./, item };
}

export function naskahTampilanPai1Bab1(teks?: string): boolean {
  const naskah = teks ?? "";
  if (/\[Soal\s+\d+/i.test(naskah)) return false;
  return (
    /30 Huruf Hijaiyah/i.test(naskah) &&
    /C\.\s*Menghafal Surah Al-Fatihah/i.test(naskah) &&
    naskah.includes("لا") &&
    naskah.includes("ء") &&
    naskah.includes("ي") &&
    naskah.includes("بِسْمِ")
  );
}

export function teksLisanPai1Bab1(): string {
  const huruf = HIJAIYAH_30.map((item) => item.nama).join(", ");
  const harakat = HARAKAT_PAI1_BAB1.map(
    (item) =>
      `${item.nama}. ${item.uraian} Contoh ${item.contohLatin}.`,
  ).join(" ");
  const ayat = FATIHAH.map((item) => {
    const bagian = [item.nama, item.latin, item.artinya ? `Artinya ${item.artinya}` : ""]
      .filter(Boolean)
      .join(". ");
    return bagian;
  }).join(" ");
  return [
    JUDUL_PAI1_BAB1,
    "A. Mengenal Huruf Hijaiyah.",
    TEKS_KARTU_HIJAIYAH,
    "30 Huruf Hijaiyah.",
    huruf,
    "B. Mengenal Harakat.",
    TEKS_KARTU_HARAKAT,
    harakat,
    "C. Menghafal Surah Al-Fatihah.",
    TEKS_KARTU_FATIHAH,
    ayat,
  ].join(" ");
}

function naskahKurikulum(): string {
  return gabungNaskahDariEditor({
    kepala: `Judul: ${JUDUL_PAI1_BAB1}`,
    bagian: [
      {
        nomor: 1,
        judul: "A. Mengenal Huruf Hijaiyah",
        tubuh: TEKS_KARTU_HIJAIYAH,
      },
      {
        nomor: 2,
        judul: "30 Huruf Hijaiyah",
        tubuh: formatBlokLengkap(
          paketDari("hijaiyah-30", "30 Huruf Hijaiyah", "huruf", HIJAIYAH_30),
        ),
      },
      {
        nomor: 3,
        judul: "B. Mengenal Harakat",
        tubuh: [
          TEKS_KARTU_HARAKAT,
          "",
          ...HARAKAT_PAI1_BAB1.map(
            (item, i) =>
              `${i + 1}. ${item.nama} ( ${item.lambang} ): ${item.uraian} Contoh: ${item.contohArab} (${item.contohLatin})`,
          ),
        ].join("\n"),
      },
      {
        nomor: 4,
        judul: "C. Menghafal Surah Al-Fatihah",
        tubuh: [
          TEKS_KARTU_FATIHAH,
          "",
          formatBlokLengkap(
            paketDari("fatihah", "7 ayat Surat Al-Fatihah", "ayat", FATIHAH),
          ),
        ].join("\n"),
      },
    ],
  });
}

function naskahLatihan(): string {
  return `[Soal 1 - PG - Tipe: Reguler]
Huruf di dalam Al-Qur'an disebut huruf...
A) Latin
B) Hijaiyah
C) Angka
D) Gambar

[Soal 2 - PG - Tipe: Reguler]
Jumlah huruf hijaiyah adalah...
A) 28
B) 29
C) 30
D) 31

[Soal 3 - PG - Tipe: Reguler]
Huruf hijaiyah yang pertama adalah...
A) Ba
B) Alif
C) Ya
D) Mim

[Soal 4 - PG - Tipe: Reguler]
Huruf hijaiyah yang terakhir adalah...
A) Alif
B) Ha
C) Ya
D) Wau

[Soal 5 - PG - Tipe: Reguler]
Fathah letaknya di atas huruf dan bersuara...
A) A
B) I
C) U
D) N

[Soal 6 - PG - Tipe: Reguler]
Kasrah letaknya di bawah huruf dan bersuara...
A) A
B) I
C) U
D) O

[Soal 7 - PG - Tipe: Reguler]
Huruf بُ dibaca...
A) Ba
B) Bi
C) Bu
D) Be

[Soal 8 - PG - Tipe: Reguler]
Al-Fatihah artinya...
A) Penutup
B) Pembukaan
C) Cahaya
D) Doa tidur

[Soal 9 - PG - Tipe: Reguler]
Surah Al-Fatihah terdiri dari...
A) 5 ayat
B) 6 ayat
C) 7 ayat
D) 8 ayat

[Soal 10 - PG - Tipe: HOTS]
Al-Fatihah wajib dibaca setiap kita...
A) Tidur
B) Makan
C) Salat
D) Bermain`;
}

export function naskahPai1Bab1(): IsiCacheMateri {
  const kurikulum = naskahKurikulum();
  return {
    curriculum_view: kurikulum,
    global_best_view: kurikulum,
    sketsaKartu: [
      "Buku Al-Qur'an terbuka di meja anak.",
      "Tiga puluh kartu huruf hijaiyah termasuk lam-alif.",
      "Tiga tanda baca fathah, kasrah, dan dhammah di huruf Ba.",
      "Anak menghafal tujuh ayat Surah Al-Fatihah.",
    ].join("\n\n"),
    svgCode: "",
    pertanyaan: naskahLatihan(),
    kunciJawaban: "B,C,B,C,A,B,C,B,C,C",
    motivasi: "Ayo cintai Al-Qur'an: kenali 30 hurufnya, baca dengan harakat, dan hafal Al-Fatihah.",
    referensiUrl: "",
  };
}
