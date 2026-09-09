import type { IsiCacheMateri } from "@/lib/cache-materi-tutor";
import {
  formatBlokLengkap,
  HIJAIYAH,
  type PaketLengkap,
} from "@/lib/paket-lengkap-materi";

function paketDari(
  id: string,
  judul: string,
  jenis: PaketLengkap["jenis"],
  item: PaketLengkap["item"],
): PaketLengkap {
  return { id, judul, jenis, pola: /./, item };
}

function naskahKurikulum(): string {
  return `INFOGRAFIS
Judul: Bab 1 Aku Cinta Al-Qur'an

1. A. Mengenal Huruf Hijaiyah
Kiri: Jumlah
Artinya: 29 huruf
Isi: Huruf di dalam Al-Qur'an disebut huruf Hijaiyah.
Kanan: Nyanyi
Artinya: Alif sampai Ya
Isi: Yuk, bernyanyi lagu huruf hijaiyah!

2. B. Mengenal Harakat
Kiri: Kegunaan
Artinya: tanda baca
Isi: Supaya huruf hijaiyah bisa dibaca, kita membutuhkan harakat.
Kanan: Dasar
Artinya: tiga bunyi
Isi: Fathah A, Kasrah I, dan Dhammah U.

3. Fathah
Kiri: Letak
Artinya: di atas, bunyi A
Isi: َ
Kanan: Contoh
Artinya: Ba
Isi: بَ

4. Kasrah
Kiri: Letak
Artinya: di bawah, bunyi I
Isi: ِ
Kanan: Contoh
Artinya: Bi
Isi: بِ

5. Dhammah
Kiri: Letak
Artinya: wau kecil di atas, bunyi U
Isi: ُ
Kanan: Contoh
Artinya: Bu
Isi: بُ

${formatBlokLengkap(paketDari("hijaiyah", "29 huruf hijaiyah", "huruf", HIJAIYAH))}`;
}

function naskahPercepatan(): string {
  return `INFOGRAFIS
Judul: Cara cepat Aku Cinta Al-Qur'an

1. Ingat 29 huruf
Kiri: Awal
Artinya: Alif
Isi: ا
Kanan: Akhir
Artinya: Ya
Isi: ي

2. Harakat A I U
Kiri: Fathah A
Artinya: di atas
Isi: بَ
Tengah: Kasrah I
Artinya: di bawah
Isi: بِ
Kanan: Dhammah U
Artinya: wau kecil
Isi: بُ`;
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
A) 26
B) 27
C) 28
D) 29

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
  return {
    curriculum_view: naskahKurikulum(),
    global_best_view: naskahPercepatan(),
    sketsaKartu: [
      "Buku Al-Qur'an terbuka di meja anak.",
      "Kartu huruf Arab berwarna-warni berjajar.",
      "Anak menunjuk huruf Alif lalu huruf Ya.",
      "Tiga tanda baca di atas dan bawah huruf Ba.",
      "Anak bernyanyi sambil menunjuk huruf hijaiyah.",
    ].join("\n\n"),
    svgCode: "",
    pertanyaan: naskahLatihan(),
    kunciJawaban: "B,D,B,C,A,B,C,B,C,C",
    motivasi: "Ayo cintai Al-Qur'an: kenali hurufnya dan baca dengan harakat.",
    referensiUrl:
      "https://buku.kemendikdasmen.go.id/katalog/pendidikan-agama-islam-dan-budi-pekerti-untuk-sd-kelas-i",
  };
}
