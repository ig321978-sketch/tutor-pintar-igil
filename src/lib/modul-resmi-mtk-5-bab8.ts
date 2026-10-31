import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK5_BAB8 } from "@/lib/misi-mtk-5-bab8";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK5_BAB8 = "Bab 8: Data";

export const MODUL_MTK5_BAB8: ModulResmiPai = {
  id: "mtk-5-bab8",
  judul: JUDUL_MTK5_BAB8,
  pola: /^bab 8: data$/,
  motivasi:
    "Nadya, Reza, dan Omar menyiapkan kios burung kertas di Taman Burung Senja bersama burung hantu Igil. Mereka mengumpulkan data, membuat piktogram, lalu membaca diagram batang.",
  kunciJawaban: "B,C,C,B,B,B,B,C,B,B",
  sketsaKartu: [
    "Nadya, Reza, dan Omar di taman burung bersama Igil.",
    "Turus, piktogram, dan diagram batang kios senja.",
    "Sepuluh pos di taman.",
    "Poin penting dan lembar evaluasi data.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Frekuensi adalah...
A) nama kegiatan
B) banyaknya suatu peristiwa terjadi
C) judul diagram
D) warna gambar`,
    `[Soal 2 - PG - Tipe: LOTS]
Satu kelompok turus berisi 4 garis tegak dan 1 garis miring. Nilainya...
A) 4
B) 6
C) 5
D) 10`,
    `[Soal 3 - PG - Tipe: MOTS]
Kunci piktogram: 1 apel = 3. Ada 3 gambar apel. Jumlahnya...
A) 3
B) 6
C) 9
D) 12`,
    `[Soal 4 - PG - Tipe: MOTS]
Daftar nilai: 70, 80, 70, 90, 80. Frekuensi nilai 80 adalah...
A) 1
B) 2
C) 3
D) 4`,
    `[Soal 5 - PG - Tipe: MOTS]
Diagram batang: Senin 10, Selasa 16, Rabu 12. Hari paling banyak adalah...
A) Senin
B) Selasa
C) Rabu
D) ketiganya sama`,
    `[Soal 6 - PG - Tipe: MOTS]
Selisih batang tertinggi dan terendah pada Senin 10, Selasa 16, dan Rabu 12 adalah...
A) 2
B) 6
C) 4
D) 16`,
    `[Soal 7 - PG - Tipe: MOTS]
Kunci: 1 bintang = 4. Nilai seluruh bintang 20. Banyak bintangnya...
A) 4
B) 5
C) 16
D) 80`,
    `[Soal 8 - PG - Tipe: MOTS]
Pada diagram ganda, dua batang di hari yang sama bernilai 8 dan 8. Artinya...
A) batang kiri lebih banyak
B) batang kanan lebih banyak
C) keduanya sama banyak
D) data tidak bisa dibaca`,
    `[Soal 9 - PG - Tipe: HOTS]
Dua diagram sama-sama menulis angka 20, tetapi skalanya berbeda. Kesimpulan yang tepat...
A) gambar yang lebih tinggi pasti lebih banyak
B) banyaknya sama, yaitu 20
C) skala yang lebih besar pasti lebih banyak
D) kedua data itu tidak ada`,
    `[Soal 10 - PG - Tipe: HOTS]
Satu rasa es terus turun, rasa lain terus naik. Langkah yang tepat untuk besok adalah...
A) menambah rasa yang turun
B) mengurangi rasa yang turun dan menyiapkan rasa yang naik
C) mengabaikan data
D) menyamakan kedua rasa tanpa melihat angka`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Taman Burung Senja",
      pengantar: "Nadya, Reza, Omar, dan Igil menyiapkan kios burung kertas.",
      labelDaftar: "Data dan piktogram",
      kolom: 1,
      item: [
        { nama: "Apa itu data", singkat: "Kumpulan informasi", uraian: "Data adalah kumpulan informasi atau fakta. Bentuknya bisa kata, kalimat, angka, atau gambar. Data yang masih tercecer mudah terlewat saat dihitung.", contoh: "Dua belas teman memilih warna burung, lalu pilihan itu disusun ulang." },
        { nama: "Turus dan frekuensi", singkat: "Satu kejadian, satu garis", uraian: "Turus mencatat satu kejadian dengan satu garis. Empat garis tegak ditambah satu garis miring menjadi satu kelompok bernilai 5. Frekuensi adalah bilangan yang menyatakan berapa kali suatu hal terjadi.", contoh: "Empat pilihan merah dicatat empat garis tegak. Frekuensi contoh itu 4." },
        { nama: "Piktogram", singkat: "Gambar dan kunci", uraian: "Piktogram menyajikan data dengan gambar. Setiap gambar mewakili nilai yang sama. Nilai itu ditulis sebagai kunci. Setengah gambar mewakili setengah nilai kunci.", contoh: "Kunci 1 burung = 4 tamu. Enam belas tamu digambar 4 burung. Enam tamu digambar 1 burung dan setengah." },
        { nama: "Membaca gambar", singkat: "Gambar harus sesuai kunci", uraian: "Jumlah gambar dikali nilai kunci. Jika gambar terlalu banyak atau terlalu sedikit, pembaca akan salah mengira jumlahnya.", contoh: "Empat burung dengan kunci 4 mewakili enam belas, bukan empat." },
      ],
      kuis: [
        { pertanyaan: "Frekuensi warna biru.", alias: ["5", "lima"] },
        { pertanyaan: "Frekuensi warna kuning.", alias: ["3", "tiga"] },
        { pertanyaan: "Warna paling banyak.", alias: ["biru"] },
        { pertanyaan: "Urutan mengolah data.", alias: ["catat", "turus", "frekuensi"] },
        { pertanyaan: "Enam burung kali empat.", alias: ["24", "dua puluh empat"] },
        { pertanyaan: "Gambar penuh untuk sepuluh.", alias: ["2", "dua"] },
        { pertanyaan: "Gambar yang benar untuk dua belas.", alias: ["3", "tiga"] },
        { pertanyaan: "Pasangkan tamu dan gambar.", alias: ["2", "3", "5"] },
      ],
      voice: [[
        "Nadya, Reza, dan Omar menyiapkan kios di Taman Burung Senja bersama Igil.",
        "Data dikumpulkan dulu, lalu dihitung dengan turus.",
        "Pada piktogram, setiap gambar punya nilai kunci yang tetap.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Diagram Batang Senja",
      pengantar: "Tinggi, panjang, dan dua data pada skala yang sama.",
      labelDaftar: "Diagram batang",
      kolom: 1,
      item: [
        { nama: "Batang tegak dan datar", singkat: "Tinggi harus sesuai angka", uraian: "Diagram batang memakai persegi panjang. Pada diagram tegak, angka besar terlihat sebagai batang yang lebih tinggi. Pada diagram datar, angka besar terlihat sebagai batang yang lebih panjang. Tinggi atau panjangnya harus tepat mengikuti skala.", contoh: "Pagi 10, siang 16, sore 12. Siang paling banyak." },
        { nama: "Skala", singkat: "Jangan bandingkan gambarnya saja", uraian: "Dua diagram boleh menunjukkan angka yang sama, tetapi tinggi gambarnya berbeda jika skalanya berbeda. Bandingkan angkanya, bukan kesan tinggi gambar.", contoh: "Angka 9 pada skala 10 terlihat tinggi. Angka 9 pada skala 30 terlihat pendek. Banyaknya tetap 9." },
        { nama: "Batang ganda", singkat: "Kategori dan skala sama", uraian: "Diagram batang ganda menggabungkan dua data. Kategorinya harus sama dan skalanya harus sama. Jika tidak, perbandingan panjang batang menyesatkan.", contoh: "Selasa, burung biru dan kuning sama-sama 5." },
        { nama: "Keputusan", singkat: "Data membantu memilih", uraian: "Data dipakai untuk memutuskan. Jika satu pilihan terus naik, persediaan itu ditambah. Jika satu pilihan terus turun, persediaannya dikurangi.", contoh: "Arah naik atau turun dibaca dari beberapa hari, bukan dari satu angka saja." },
      ],
      kuis: [
        { pertanyaan: "Burung yang paling banyak.", alias: ["perkutut", "15", "lima belas"] },
        { pertanyaan: "Selisih lima belas dan sembilan.", alias: ["6", "enam"] },
        { pertanyaan: "Jumlah pada Kamis.", alias: ["13", "tiga belas"] },
        { pertanyaan: "Rabu, siapa lebih banyak.", alias: ["kuning", "reza"] },
        { pertanyaan: "Dua diagram bernilai sembilan.", alias: ["sama"] },
        { pertanyaan: "Tiga pernyataan diagram.", alias: ["salah", "benar", "salah"] },
        { pertanyaan: "Syarat diagram ganda.", alias: ["kategori", "skala"] },
        { pertanyaan: "Es yang perlu ditambah.", alias: ["stroberi"] },
      ],
      voice: [[
        "Tinggi batang harus sesuai angka pada skala.",
        "Diagram ganda hanya adil jika kategori dan skalanya sama.",
        "Data membantu memilih persediaan kios.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Sepuluh Pos Taman",
      pengantar: "Sepuluh soal pola. Semuanya pilihan.",
      labelDaftar: "Sepuluh pos data",
      kolom: 1,
      item: [
        {
          nama: "Pos pola",
          singkat: "Deret, analogi, yang beda",
          uraian: "Ada deret, angka hilang, analogi simbol, dan bilangan yang beda.",
          contoh: "Jumlah pos yang selesai ada 10.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK5_BAB8),
      voice: [[
        "Igil menjaga sepuluh pos di Taman Burung Senja.",
        "Setiap pos dijawab dengan pilihan.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal data dari uji di akhir bab.",
      labelDaftar: "Lembar evaluasi data",
      kolom: 1,
      item: [
        {
          nama: "Uji data",
          singkat: "Turus, piktogram, diagram",
          uraian: "Frekuensi dihitung dari data mentah atau turus. Piktogram dibaca dengan kunci. Diagram batang dibaca dari angka dan skala, termasuk diagram ganda.",
          contoh: "Dua soal ditulis dan dua soal dijawab dengan suara.",
        },
      ],
      kuis: [
        { pertanyaan: "Frekuensi angka 4.", alias: ["3", "tiga"] },
        { pertanyaan: "Turus lima tambah dua.", alias: ["7", "tujuh"] },
        { pertanyaan: "Empat lampu kali lima.", alias: ["20", "dua puluh"] },
        { pertanyaan: "Waktu paling banyak.", alias: ["siang"] },
        { pertanyaan: "Pasangkan gambar dan nilai.", alias: ["6", "12", "15"] },
        { pertanyaan: "Selisih dua puluh dua dan empat belas.", alias: ["8", "delapan"] },
        { pertanyaan: "Kelompok yang lebih banyak.", alias: ["laki-laki"] },
        { pertanyaan: "Dua diagram bernilai lima belas.", alias: ["sama"] },
        { pertanyaan: "Jumlah enam, empat, dan lima.", alias: ["15", "lima belas"] },
        { pertanyaan: "Hari yang sama banyak.", alias: ["senin", "rabu"] },
      ],
      voice: [[
        "Sepuluh soal data. Baca pelan, lalu cek kunci atau skalanya.",
        "Frekuensi adalah banyaknya suatu hal terjadi.",
      ]],
    },
  ],
};
