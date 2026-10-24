import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB6 } from "@/lib/misi-mtk-4-bab6";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB6 = "Bab 6: Piktogram dan Diagram Batang";

export const MODUL_MTK4_BAB6: ModulResmiPai = {
  id: "mtk-4-bab6",
  judul: JUDUL_MTK4_BAB6,
  pola: /^bab 6: piktogram dan diagram batang$/,
  motivasi:
    "Raka, Sinta, dan Merpati Piko menyajikan data bersama Reporter IGIL di ruang redaksi majalah sekolah.",
  kunciJawaban: "C,A,B,C,C,D,B,D,C,C",
  sketsaKartu: [
    "Piktogram berskala dan diagram batang di ruang redaksi.",
    "Rumus skala piktogram dan anatomi diagram batang.",
    "Sepuluh laporan redaksi majalah.",
    "Poin penting dan lembar evaluasi piktogram dan diagram batang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Piktogram buku dari perpustakaan: 1 gambar = 5 siswa. Hari Selasa ada 3 gambar. Banyak siswa...
A) 3
B) 8
C) 15
D) 5`,
    `[Soal 2 - PG - Tipe: MOTS]
Hari Kamis ada 30 siswa. Satu gambar buku = 5 siswa. Banyak gambar yang dipasang...
A) 6
B) 5
C) 30
D) 25`,
    `[Soal 3 - PG - Tipe: MOTS]
Batang Futsal 25. Batang Lukis 10. Selisihnya...
A) 35
B) 15
C) 25
D) 10`,
    `[Soal 4 - PG - Tipe: MOTS]
Futsal 25, Tari 15, Komputer 20, Lukis 10. Ekstrakurikuler yang diikuti 20 siswa...
A) Futsal
B) Tari
C) Komputer
D) Lukis`,
    `[Soal 5 - PG - Tipe: MOTS]
Piktogram jus: 4 gambar gelas. Satu gambar = 10 gelas. Jumlah jus mangga...
A) 4
B) 14
C) 40
D) 10`,
    `[Soal 6 - PG - Tipe: HOTS]
Satu gambar mobil = 4 mobil. Untuk 12 mobil, banyak gambar yang dibuat...
A) 12
B) 4
C) 8
D) 3`,
    `[Soal 7 - PG - Tipe: HOTS]
Satu gambar apel = 4 apel. Ada 3 gambar utuh dan 1 gambar setengah. Jumlah apel...
A) 12
B) 14
C) 7
D) 16`,
    `[Soal 8 - PG - Tipe: MOTS]
Ujung batang ada di tengah garis 20 dan 30. Nilai batang itu...
A) 20
B) 30
C) 50
D) 25`,
    `[Soal 9 - PG - Tipe: MOTS]
Garis angka pada sumbu skala diagram batang harus mulai dari...
A) 1
B) 5
C) 0
D) 10`,
    `[Soal 10 - PG - Tipe: HOTS]
24 kg apel digambar dengan 4 gambar. Satu gambar mewakili...
A) 8 kg
B) 4 kg
C) 6 kg
D) 10 kg`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Raka, Sinta, Merpati Piko, dan Reporter IGIL membaca piktogram berskala dan diagram batang.",
      labelDaftar: "Dua sub-bab redaksi data",
      kolom: 1,
      item: [
        { nama: "Piktogram berskala", singkat: "Baca keterangan", uraian: "Satu gambar buku = 5 siswa. Selasa 3 gambar = 15 siswa. Kamis 30 siswa = 6 gambar.", contoh: "Jumlah sebenarnya = banyak gambar × nilai 1 gambar." },
        { nama: "Diagram batang", singkat: "Baca ujung batang", uraian: "Futsal 25, Tari 15, Komputer 20, Lukis 10. Selisih Futsal dan Lukis 15. Selisih Komputer dan Tari 5.", contoh: "Tinggi atau panjang batang mengikuti skala." },
      ],
      kuis: [
        { pertanyaan: "Selasa 3 gambar, kunci 5. Banyak siswa?", alias: ["15", "lima belas"] },
        { pertanyaan: "Kamis 30 siswa, kunci 5. Banyak gambar?", alias: ["6"] },
        { pertanyaan: "Ekstrakurikuler yang diikuti 20 siswa?", alias: ["komputer"] },
        { pertanyaan: "Selisih Komputer 20 dan Tari 15?", alias: ["5"] },
        { pertanyaan: "4 gambar gelas, kunci 10. Jumlah jus?", alias: ["40"] },
        { pertanyaan: "Pasangkan buah dengan ujung batangnya.", alias: ["30", "45", "25"] },
        { pertanyaan: "12 mobil, kunci 4. Apakah 12 gambar benar?", alias: ["salah"] },
        { pertanyaan: "Tarik batang jagung sampai 35.", alias: ["35"] },
        { pertanyaan: "Urutkan kota dari yang paling besar.", alias: ["C", "A", "D", "B"] },
      ],
      voice: [[
        "Halo jurnalis cilik! Hari ini kita menyajikan berita memakai piktogram.",
        "Satu gambar bisa mewakili lebih dari satu benda. Baca keterangan di bawah tabel dulu.",
        "Lalu kita baca diagram batang. Tinggi atau panjang batang mengikuti angka skala.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Rumus piktogram berskala dan anatomi diagram batang.",
      labelDaftar: "Dua peta data",
      kolom: 1,
      item: [
        { nama: "Rumus piktogram", singkat: "Kali dengan skala", uraian: "Jumlah sebenarnya = banyak gambar × nilai 1 gambar. Tiga apel utuh dan setengah, kunci 4, jumlahnya 14.", contoh: "Gambar setengah dihitung setengah dari nilai 1 gambar." },
        { nama: "Anatomi batang", singkat: "Judul dan sumbu", uraian: "Ada judul, sumbu kategori, dan sumbu skala dari 0 dengan lompat tetap. Tengah 10 dan 20 bernilai 15.", contoh: "Jarak angka pada skala harus sama." },
      ],
      kuis: [
        { pertanyaan: "Setengah gambar, kunci 10. Nilainya?", alias: ["5", "lima"] },
        { pertanyaan: "7 gambar bola, kunci 2. Jumlah bola?", alias: ["14"] },
        { pertanyaan: "Sumbu skala diagram batang mulai dari?", alias: ["0", "nol"] },
        { pertanyaan: "Tengah garis 20 dan 30. Nilai batang?", alias: ["25"] },
        { pertanyaan: "2 gambar utuh dan 1 setengah, kunci 6. Jumlah biskuit?", alias: ["15"] },
        { pertanyaan: "Skala 0, 4, 8, ?, 16, 20. Angka hilang?", alias: ["12"] },
        { pertanyaan: "3 bintang, kunci 10. Tinggi batang?", alias: ["30"] },
        { pertanyaan: "Bulu tangkis 35, renang 20. Selisihnya?", alias: ["15"] },
        { pertanyaan: "Batang Rabu harus 25, digambar 35. Yang salah?", alias: ["rabu"] },
      ],
      voice: [[
        "Kunci piktogram kelas 4 ada pada keterangan skala.",
        "Kalikan banyak gambar dengan nilai 1 gambar.",
        "Pada diagram batang, jarak angka skala harus tetap dan mulai dari nol.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Redaksi Majalah Fakta IGIL",
      pengantar: "Sepuluh laporan piktogram dan diagram batang. Selesai sepuluh pos, bintang terkumpul sepuluh.",
      labelDaftar: "Sepuluh laporan redaksi",
      kolom: 1,
      item: [
        {
          nama: "Laporan data",
          singkat: "Periksa hitungan",
          uraian: "Skala gambar, ujung batang, dan selisih.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB6),
      voice: [[
        "Selamat datang di redaksi majalah Fakta IGIL.",
        "Periksa sepuluh laporan. Dua laporan dijawab dengan suara, dua ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal piktogram berskala dan diagram batang.",
      labelDaftar: "Lembar evaluasi redaksi",
      kolom: 1,
      item: [
        {
          nama: "Catatan redaksi",
          singkat: "Baca skala dulu",
          uraian: "Semangka Senin dan Selasa 55. Skala 24 siswa dari 6 gambar = 4. Tengah 30 dan 40 = 35. Total sampah 45 kg.",
          contoh: "Gambar setengah dihitung setengah dari kunci.",
        },
      ],
      kuis: [
        { pertanyaan: "Panen Senin 3 gambar dan Selasa 2,5 gambar, kunci 10. Jumlahnya?", alias: ["55"] },
        { pertanyaan: "6 gambar bintang untuk 24 siswa. Nilai 1 gambar?", alias: ["4"] },
        { pertanyaan: "Total 100. Senin 25, Selasa 20, Kamis 30. Batang Rabu?", alias: ["25"] },
        { pertanyaan: "Toko A 4×5 dan Toko B 5×3. Pernyataan yang benar?", alias: ["5"] },
        { pertanyaan: "Pasangkan analisis nilai ulangan.", alias: ["12", "8", "30"] },
        { pertanyaan: "Selisih 5 gambar dan 3 gambar, kunci 4. Apakah 2 buku benar?", alias: ["salah"] },
        { pertanyaan: "5 gambar dan 2 gambar ayam, kunci 10. Selisih ayam?", alias: ["30", "tiga puluh"] },
        { pertanyaan: "Ujung batang di tengah 30 dan 40. Nilainya?", alias: ["35", "tiga puluh lima"] },
        { pertanyaan: "36 sepeda, kunci 4. Banyak gambar?", alias: ["9"] },
        { pertanyaan: "15 + 20 + 10 kg sampah. Jumlahnya?", alias: ["45"] },
      ],
      voice: [[
        "Sepuluh soal data. Baca keterangan skala pada setiap gambar dan diagram.",
        "Gambar setengah dihitung setengah. Ujung batang di tengah dua garis diambil nilai tengahnya.",
      ]],
    },
  ],
};
