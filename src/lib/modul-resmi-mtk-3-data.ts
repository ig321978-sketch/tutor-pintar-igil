import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_DATA } from "@/lib/misi-mtk-3-data";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_DATA = "Bab 5: Penyajian Data dalam Tabel";

export const MODUL_MTK3_DATA: ModulResmiPai = {
  id: "mtk-3-data",
  judul: JUDUL_MTK3_DATA,
  pola: /^bab 5: penyajian data dalam tabel$/,
  motivasi:
    "Ilmuwan IGIL, Zara, Rio, dan Robot Bibo mengurutkan data, mencari jangkauan, dan membaca tabel turus di rumah kaca Kebun Botani.",
  kunciJawaban: "B,B,B,A,B,A,B,C,B,B",
  sketsaKartu: [
    "Data diurut dari terkecil, lalu jangkauan dihitung dari ujung kanan dikurangi ujung kiri.",
    "Tabel tiga kolom: data, turus, dan banyaknya.",
    "Sepuluh misi festival sains.",
    "Tiga kalimat kunci dan sepuluh soal evaluasi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Total peserta lomba 30. Mewarnai 12, menyanyi 10. Membaca puisi...
A) 6 siswa
B) 8 siswa
C) 22 siswa
D) 12 siswa`,
    `[Soal 2 - PG - Tipe: HOTS]
Nilai 90 ada 6 siswa dan nilai 100 ada 4 siswa. Yang mendapat hadiah...
A) 6 siswa
B) 10 siswa
C) 19 siswa
D) 4 siswa`,
    `[Soal 3 - PG - Tipe: HOTS]
Berat semangka 4, 2, 6, 3, 5. Urutan tengah...
A) 2 kg
B) 4 kg
C) 6 kg
D) 5 kg`,
    `[Soal 4 - PG - Tipe: HOTS]
Apel 8, jeruk 11, mangga 9. Dua anak pindah dari jeruk ke apel. Paling banyak...
A) Apel (10 anak)
B) Jeruk (11 anak)
C) Sama banyak (9 anak)
D) Mangga (9 anak)`,
    `[Soal 5 - PG - Tipe: HOTS]
Data buku 3, 5, 4, 3, 6, 3, 5, 7. Yang membaca 5 buku...
A) 1 orang
B) 2 orang
C) 3 orang
D) 4 orang`,
    `[Soal 6 - PG - Tipe: HOTS]
Sepatu 8 pasang. Tabel menulis ukuran 35 sebanyak 2. Zara bilang tabel salah. Analisis Zara...
A) Benar
B) Salah
C) Belum dihitung
D) Sama dengan 9`,
    `[Soal 7 - PG - Tipe: HOTS]
Kucing 15, ikan 10, kelinci 6. Selisih paling banyak dan paling sedikit...
A) 6
B) 9
C) 15
D) 21`,
    `[Soal 8 - PG - Tipe: HOTS]
Barisan 10, 10, 12, 15, 15, 15, 18, 20. Paling sering muncul...
A) 10
B) 12
C) 15
D) 20`,
    `[Soal 9 - PG - Tipe: HOTS]
Nilai 8, 9, 7, 8, 10, 8, 9, 8, 7, 8. Angka 8 muncul...
A) 4 kali
B) 5 kali
C) 6 kali
D) 8 kali`,
    `[Soal 10 - PG - Tipe: HOTS]
Roti cokelat 14 dan keju 11. Jumlah gabungan...
A) 23
B) 25
C) 20
D) 9`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Ilmuwan IGIL, Zara, Rio, dan Robot Bibo merapikan data di rumah kaca Kebun Botani. Papan infografis ada di dalam tiap sub-bab.",
      labelDaftar: "Dua sub-bab kebun",
      kolom: 1,
      item: [
        { nama: "Mengurutkan data", singkat: "Kecil ke besar", uraian: "Tinggi bunga matahari diurutkan 28, 28, 28, 32, 35, 38, 40. Data terkecil 28 cm, data terbesar 40 cm, dan 28 cm muncul 3 kali. Nilai ulangan 20 siswa, setelah diurut, data terkecil 5 dan data terbesar 10. Jangkauan 10 dikurangi 5 sama dengan 5. Nilai 9 ada 5 siswa. Nilai 10 ada 2 siswa.", contoh: "Urutkan dulu, baru bandingkan." },
        { nama: "Membandingkan kelereng", singkat: "Sama banyak", uraian: "Andi 2, Alen 3, Galih 5, Meutia 7, Alfa 7. Urutan dari paling sedikit: Andi, Alen, Galih, Meutia, Alfa. Meutia dan Alfa sama banyak. Jumlah 2 + 3 + 5 + 7 + 7 = 24.", contoh: "Yang angkanya sama disebut sama banyak." },
        { nama: "Tabel turus", singkat: "Tiga kolom", uraian: "Empat garis tegak ditambah satu garis miring dihitung 5. Tabel punya kolom data, turus, dan banyaknya. Stroberi 6, tomat 10, lemon 4. Jumlah 6 + 10 + 4 = 20 keranjang. Pada kata STATISTIKA, huruf T muncul 3 kali dan huruf K muncul 1 kali.", contoh: "Turus membantu hitung tanpa terlewat." },
      ],
      kuis: [
        { pertanyaan: "Tinggi tanaman yang paling besar?", alias: ["40", "empat puluh"] },
        { pertanyaan: "Urutkan berat labu 7, 4, 9, 5.", alias: ["4 5 7 9"] },
        { pertanyaan: "Buah dengan panen paling banyak?", alias: ["tomat"] },
        { pertanyaan: "Banyak pengunjung hari Minggu?", alias: ["15", "lima belas"] },
        { pertanyaan: "Susun botol dari kecil ke besar.", alias: ["19", "22", "25", "27", "30"] },
        { pertanyaan: "Nomor sepatu paling kecil?", alias: ["30"] },
        { pertanyaan: "Pasangkan warna kupu-kupu dan frekuensinya.", alias: ["3", "2", "1"] },
        { pertanyaan: "Selisih capung dan belalang adalah 7.", alias: ["benar"] },
        { pertanyaan: "Jumlah siswa ekstrakurikuler?", alias: ["25"] },
      ],
      voice: [["Halo peneliti cilik! Urutkan data dari yang terkecil. Ujung kiri adalah data terkecil. Ujung kanan adalah data terbesar. Jangkauan sama dengan data terbesar dikurangi data terkecil."]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Papan infografis sudah masuk ke tiap sub-bab materi. Latihan ini mengurutkan angka dan membaca tabel turus.",
      labelDaftar: "Dua papan data",
      kolom: 1,
      item: [
        { nama: "Urutkan data acak", singkat: "Kiri kecil, kanan besar", uraian: "Data 8, 6, 9, 7, 6, 10, 6, 8 menjadi 6, 6, 6, 7, 8, 8, 9, 10. Data terkecil 6, data terbesar 10, paling sering 6 sebanyak 3. Jangkauan 10 dikurangi 6 sama dengan 4.", contoh: "Coret angka yang sudah ditulis." },
        { nama: "Cek tabel", singkat: "Jumlah harus cocok", uraian: "Nilai 80 ada 4 siswa, nilai 90 ada 8 siswa, nilai 100 ada 5 siswa. Jumlah 4 + 8 + 5 = 17. Nilai di atas 80 ada 8 + 5 = 13 siswa.", contoh: "Jumlah kolom banyaknya harus sama dengan benda yang dihitung." },
      ],
      kuis: [
        { pertanyaan: "Angka yang paling sering muncul?", alias: ["6", "enam"] },
        { pertanyaan: "Selisih terbesar dan terkecil?", alias: ["4", "empat"] },
        { pertanyaan: "Nilai yang paling banyak diperoleh?", alias: ["90", "sembilan puluh"] },
        { pertanyaan: "Banyak siswa nilai 80?", alias: ["4", "empat"] },
        { pertanyaan: "Angka yang belum tertulis?", alias: ["14"] },
        { pertanyaan: "Anak yang beratnya lebih dari 28 kg?", alias: ["7"] },
        { pertanyaan: "Pasangkan pertanyaan tabel buku.", alias: ["dongeng", "10", "45"] },
        { pertanyaan: "Turus jambu?", alias: ["5"] },
        { pertanyaan: "Huruf dengan frekuensi tertinggi?", alias: ["a"] },
      ],
      voice: [["Papan ini ada di dalam sub-bab. Urutkan dari yang terkecil. Lalu cek jumlah kolom banyaknya supaya sama dengan benda yang dihitung."]],
    },
    {
      kode: "C",
      judul: "C. Festival Sains Igil",
      pengantar: "Sepuluh misi manajer laboratorium. Baca tabel, lalu putuskan.",
      labelDaftar: "Sepuluh misi festival",
      kolom: 1,
      item: [
        {
          nama: "Misi laboratorium",
          singkat: "Baca tabel",
          uraian: "Atur suhu, pilih stan, hitung frekuensi, dan periksa laporan Bibo.",
          contoh: "Salah boleh diulang. Festival tetap berjalan.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK3_DATA),
      voice: [["Selamat datang di permainan manajer laboratorium. Keputusan yang tepat membuat festival sains berhasil."]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal mengurutkan data dan membaca tabel.",
      labelDaftar: "Lembar evaluasi data",
      kolom: 1,
      item: [
        {
          nama: "Evaluasi",
          singkat: "Sepuluh soal",
          uraian: "Mencari data hilang, membaca syarat, dan memeriksa tabel.",
          contoh: "Perhatikan setiap angka dan kolom.",
        },
      ],
      kuis: [
        { pertanyaan: "Banyak siswa lomba puisi?", alias: ["8"] },
        { pertanyaan: "Siswa yang mendapat hadiah?", alias: ["10"] },
        { pertanyaan: "Berat semangka di urutan tengah?", alias: ["4"] },
        { pertanyaan: "Buah yang sekarang paling banyak?", alias: ["apel"] },
        { pertanyaan: "Pasangkan hasil analisis.", alias: ["3", "4", "2"] },
        { pertanyaan: "Analisis Zara benar atau salah?", alias: ["benar"] },
        { pertanyaan: "Selisih hewan paling banyak dan paling sedikit?", alias: ["9", "sembilan"] },
        { pertanyaan: "Angka yang paling sering muncul?", alias: ["15", "lima belas"] },
        { pertanyaan: "Berapa kali angka 8 muncul?", alias: ["5", "lima"] },
        { pertanyaan: "Jumlah roti cokelat dan keju?", alias: ["25", "dua puluh lima"] },
      ],
      voice: [["Sepuluh soal tentang mengurutkan data dan membaca tabel. Perhatikan setiap angka."]],
    },
  ],
};
