import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB8 = "Bab 8: Diagram Gambar Sederhana";

export const MODUL_MTK2_BAB8: ModulResmiPai = {
  id: "mtk-2-bab8",
  judul: JUDUL_MTK2_BAB8,
  pola:
    /diagram gambar sederhana|membaca piktogram|kunci membaca piktogram|banyaknya air|mengumpulkan dan membaca data/,
  motivasi:
    "Piktogram memakai gambar. Baris terpanjang = paling banyak. Apel 4, pisang 2, selisih 2. Pensil merah 3 + biru 5 = 8.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak menghitung 4 gambar apel dan 2 gambar pisang.",
    "Anak membandingkan baris diagram pensil merah dan biru.",
    "Anak mengerjakan evaluasi membaca piktogram.",
    "Anak menarik garis 3-5-8, menggeser pernyataan kucing-burung, mengurutkan buku 2-3-5, dan menulis 4.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Apel 4 gambar, pisang 2 gambar. Selisihnya...
A) 6
B) 2
C) 4
D) 8`,
    `[Soal 2 - PG - Tipe: HOTS]
Cara menyajikan data memakai lambang gambar dinamakan diagram...
A) garis wajib
B) gambar atau piktogram
C) batang hanya
D) lingkaran`,
    `[Soal 3 - PG - Tipe: HOTS]
Jika baris robot lebih pendek daripada baris bola, robot lebih banyak. Pernyataan ini...
A) Benar.
B) Salah; baris lebih pendek artinya lebih sedikit.
C) Benar jika ikonnya besar.
D) Harus dihitung dengan kg.`,
    `[Soal 4 - PG - Tipe: HOTS]
Diagram gambar membantu membandingkan data paling banyak dan paling sedikit dengan cepat. Pernyataan ini...
A) Salah.
B) Benar; visual piktogram memudahkan anak membaca.
C) Benar hanya jika ada angka.
D) Diagram selalu salah.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kelompok merah 3 pensil, biru 5 pensil. Jumlah merah adalah...
A) 5
B) 3
C) 8
D) 2`,
    `[Soal 6 - PG - Tipe: Reguler]
Total pensil merah dan biru adalah...
A) 8
B) 3
C) 5
D) 15`,
    `[Soal 7 - PG - Tipe: Reguler]
Kucing 4, burung 2. Total hewan...
A) 4
B) 2
C) 6
D) 8`,
    `[Soal 8 - PG - Tipe: Reguler]
Urutan buku dari sedikit: gambar 2, sains 3, cerita 5 adalah...
A) 5, 3, 2
B) 2, 3, 5
C) 3, 2, 5
D) 2, 5, 3`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa baris terpanjang berarti paling banyak?
A) Karena setiap gambar mewakili satu data, jadi baris lebih panjang berisi lebih banyak gambar.
B) Supaya warnanya lebih cerah.
C) Karena apel selalu menang.
D) Karena penggaris mulai dari 1.`,
    `[Soal 10 - PG - Tipe: Reguler]
Mobil-mobilan 4 gambar. Jumlah anak yang memilihnya...
A) 3
B) 4
C) 7
D) 2`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Membaca Jumlah pada Piktogram",
      pengantar:
        "Infografis kunci piktogram: data disajikan dengan simbol gambar. Apel 4 ikon, pisang 2 ikon. Baris terpanjang paling banyak.",
      labelDaftar: "Gambar, data kelas, analisis baris",
      kolom: 1,
      item: [
        {
          nama: "Apa itu piktogram",
          singkat: "Diagram gambar",
          uraian:
            "Setiap jumlah diwakili satu ikon. Daripada bertanya satu-satu, kita susun jawaban ke diagram gambar.",
          contoh: "Satu gambar = satu anak.",
        },
        {
          nama: "Data buah kesukaan",
          singkat: "Apel 4, pisang 2",
          uraian:
            "Baris apel punya 4 gambar, artinya 4 anak suka apel. Baris pisang 2 gambar. Apel lebih banyak disukai.",
          contoh: "4 apel. 2 pisang.",
        },
        {
          nama: "Selisih dan nama",
          singkat: "4 - 2 = 2",
          uraian:
            "Selisih anak yang suka apel dan pisang adalah 2. Cara ini dinamakan diagram gambar atau piktogram.",
          contoh: "Selisih 2. Namanya piktogram.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Berdasarkan diagram buah kesukaan, berapa selisih jumlah anak yang menyukai apel dengan yang menyukai pisang?",
          alias: ["2", "dua"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Cara menyajikan data menggunakan lambang gambar dinamakan diagram ...",
        alias: ["gambar", "piktogram"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang hebat menganalisis, mainan apa yang paling banyak dimiliki teman sekelas? Kita kumpulkan jawabannya ke diagram gambar atau piktogram.",
          "Setiap jumlah diwakili satu ikon. Baris apel punya 4 gambar, artinya 4 anak suka apel. Pisang hanya 2 gambar.",
          "Kita tahu cepat bahwa apel lebih banyak disukai. Membaca diagram gambar itu seru seperti melihat galeri foto!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Membandingkan dan Menjumlah Data",
      pengantar:
        "Infografis pensil 3 dan 5, hewan 4 dan 2, buku 2-3-5, mainan 4. Baris pendek = lebih sedikit. Total = jumlah semua gambar.",
      labelDaftar: "Pensil, hewan, buku, total",
      kolom: 1,
      item: [
        {
          nama: "Kelompok pensil",
          singkat: "3, 5, dan 8",
          uraian:
            "Merah 3 pensil. Biru 5 pensil. Total 8. Biru lebih banyak. Jangan tertukar angka 3 dan 5.",
          contoh: "3 + 5 = 8.",
        },
        {
          nama: "Hewan dan buku",
          singkat: "Benar-salah data",
          uraian:
            "Kucing 4, burung 2, total 6. Burung tidak lebih banyak dari kucing. Buku: gambar 2, sains 3, cerita 5. Urutan sedikit ke banyak: 2, 3, 5.",
          contoh: "Kucing 4. Cerita 5.",
        },
        {
          nama: "Mainan dan aturan baris",
          singkat: "4 mobil, pendek = sedikit",
          uraian:
            "Mobil-mobilan 4 gambar = 4 anak. Jika baris robot lebih pendek dari bola, robot lebih sedikit, bukan lebih banyak.",
          contoh: "4 anak. Pendek = sedikit.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Jika baris robot lebih pendek dari bola, siapa yang lebih banyak?",
          alias: ["bola", "sedikit", "pendek"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Mobil-mobilan 4 gambar. Jumlah anak yang memilihnya adalah...",
        alias: ["4"],
      },
      voice: [
        [
          "Pensil merah tiga, biru lima, total delapan. Kucing empat, burung dua, total enam.",
          "Urutkan buku dari yang paling sedikit: gambar dua, sains tiga, cerita lima.",
          "Baris lebih pendek artinya lebih sedikit. Empat gambar mobil berarti empat anak.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih selisih 2 dan nama piktogram, tentukan benar-salah baris pendek serta manfaat diagram, jodohkan 3-5-8, lalu jelaskan mengapa baris terpanjang paling banyak.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Baca dan nama",
          uraian:
            "Selisih apel-pisang = 2. Namanya diagram gambar. Baris pendek = sedikit. Diagram membantu membandingkan cepat.",
          contoh: "2. Piktogram. Sedikit.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Angka dan urutan",
          uraian:
            "Merah 3, biru 5, total 8. Kucing+burung=6. Buku 2, 3, 5. Mobil 4.",
          contoh: "3. 8. 4.",
        },
      ],
      kuis: [
        { pertanyaan: "Selisih apel dan pisang?", alias: ["2"] },
        { pertanyaan: "Nama diagram gambar?", alias: ["gambar", "piktogram"] },
        { pertanyaan: "Baris pendek = lebih banyak?", alias: ["salah"] },
        { pertanyaan: "Diagram membantu banding?", alias: ["benar"] },
        { pertanyaan: "Pensil merah?", alias: ["3"] },
        { pertanyaan: "Mengapa baris panjang = banyak?", alias: ["gambar", "banyak"] },
      ],
      voice: [
        ["Selisih dua. Namanya diagram gambar atau piktogram."],
        ["Baris pendek artinya lebih sedikit. Total pensil delapan."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis 3-5-8, geser pernyataan kucing-burung, urutkan buku 2-3-5, coretkan 4, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Merah 3, biru 5, total 8. Benar: kucing 4, burung 2, total 6. Salah: burung lebih banyak. Urutan buku: gambar 2, sains 3, cerita 5.",
          contoh: "3. Benar. 2 dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "4 gambar mobil = 4 anak, coretkan 4. Baris pendek bukan lebih banyak. Diagram membantu membandingkan cepat.",
          contoh: "Coretkan 4. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis 3 5 8?", alias: ["3", "5", "8"] },
        { pertanyaan: "Keranjang benar atau salah?", alias: ["4", "burung"] },
        { pertanyaan: "Urutan buku 2 3 5?", alias: ["2", "3", "5"] },
        { pertanyaan: "Baris pendek = lebih banyak?", alias: ["salah"] },
        { pertanyaan: "Diagram membantu banding?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan jumlah anak yang memilih mobil-mobilan.",
        alias: ["4"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis merah ke 3, biru ke 5, total ke 8. Geser kucing 4 ke benar, burung lebih banyak ke salah.",
          "Urutkan buku gambar 2, sains 3, cerita 5. Coretkan 4 untuk mobil-mobilan.",
          "Detektif: baris pendek artinya lebih sedikit. Diagram gambar membantu membandingkan cepat.",
        ],
      ],
    },
  ],
};
