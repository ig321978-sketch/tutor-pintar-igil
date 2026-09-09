import type { IsiCacheMateri } from "@/lib/cache-materi-tutor";
import {
  FATIHAH,
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

function barisHuruf(
  nomor: number,
  huruf: { lambang?: string; nama: string },
): string {
  return `${nomor}. ${huruf.nama}
Kiri: Huruf Arab
Isi: ${huruf.lambang ?? ""}
Kanan: Latin
Isi: ${huruf.nama}`;
}

function barisAyat(
  nomor: number,
  ayat: { lambang?: string; nama: string; latin?: string; artinya?: string },
): string {
  return `${nomor}. ${ayat.nama}
Kiri: Arab
Isi: ${ayat.lambang ?? ""}
Tengah: Latin
Isi: ${ayat.latin ?? ""}
Kanan: Artinya
Isi: ${ayat.artinya ?? ""}`;
}

function naskahKurikulum(): string {
  const huruf = HIJAIYAH.map((item, i) => barisHuruf(i + 2, item)).join("\n\n");
  const harakatAwal = 2 + HIJAIYAH.length;
  const fatihahAwal = harakatAwal + 4;
  const ayat = FATIHAH.map((item, i) =>
    barisAyat(fatihahAwal + 1 + i, item),
  ).join("\n\n");

  return `INFOGRAFIS
Judul: Bab 1 Aku Cinta Al-Qur'an

1. A. Mengenal Huruf Hijaiyah
Kiri: Jumlah
Artinya: 29 huruf
Isi: Huruf di dalam Al-Qur'an disebut huruf Hijaiyah.
Kanan: Nyanyi
Artinya: Alif sampai Ya
Isi: Yuk, bernyanyi lagu huruf hijaiyah!

${huruf}

${harakatAwal}. B. Mengenal Harakat
Kiri: Kegunaan
Artinya: tanda baca
Isi: Supaya huruf hijaiyah bisa dibaca, kita membutuhkan harakat.
Kanan: Dasar
Artinya: tiga bunyi
Isi: Fathah A, Kasrah I, dan Dhammah U.

${harakatAwal + 1}. Fathah
Kiri: Letak
Artinya: di atas, bunyi A
Isi: َ
Kanan: Contoh
Artinya: Ba
Isi: بَ

${harakatAwal + 2}. Kasrah
Kiri: Letak
Artinya: di bawah, bunyi I
Isi: ِ
Kanan: Contoh
Artinya: Bi
Isi: بِ

${harakatAwal + 3}. Dhammah
Kiri: Letak
Artinya: wau kecil di atas, bunyi U
Isi: ُ
Kanan: Contoh
Artinya: Bu
Isi: بُ

${fatihahAwal}. C. Menghafal Surah Al-Fatihah
Kiri: Arti nama
Artinya: Pembukaan
Isi: Surah pertama dalam Al-Qur'an. Terdiri dari 7 ayat.
Kanan: Salat
Artinya: wajib dibaca
Isi: Kita membaca Al-Fatihah setiap salat, dimulai dari Bismillah.

${ayat}

${formatBlokLengkap(paketDari("hijaiyah", "29 huruf hijaiyah", "huruf", HIJAIYAH))}

${formatBlokLengkap(paketDari("fatihah", "7 ayat Surat Al-Fatihah", "ayat", FATIHAH))}`;
}

function naskahPercepatan(): string {
  const ringkasAyat = FATIHAH.map((item, i) =>
    barisAyat(i + 4, {
      ...item,
      nama: `Hafal ${item.nama}`,
    }),
  ).join("\n\n");

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
Isi: بُ

3. Al-Fatihah 7 ayat
Kiri: Nama
Artinya: Pembukaan
Isi: Surat pertama, mulai Bismillah
Kanan: Wajib
Artinya: setiap salat
Isi: 7 ayat, hafal urut dari ayat 1

${ringkasAyat}`;
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
      "Anak salat sambil memegang mushaf kecil.",
      "Pelangi tujuh warna seperti tujuh ayat.",
      "Anak bernyanyi sambil menunjuk huruf hijaiyah.",
      "Bismillah tertulis indah di kartu pertama.",
      "Hati kecil di samping mushaf Al-Qur'an.",
      "Anak tersenyum setelah menghafal satu ayat.",
    ].join("\n\n"),
    svgCode: "",
    pertanyaan: naskahLatihan(),
    kunciJawaban: "B,D,B,C,A,B,C,B,C,C",
    motivasi: "Ayo cintai Al-Qur'an: kenali hurufnya, baca dengan harakat, dan hafal Al-Fatihah.",
    referensiUrl:
      "https://buku.kemendikdasmen.go.id/katalog/pendidikan-agama-islam-dan-budi-pekerti-untuk-sd-kelas-i",
  };
}
