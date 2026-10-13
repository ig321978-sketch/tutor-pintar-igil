import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK3_BAB2 } from "@/lib/misi-mtk-3-bab2";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK3_BAB2 = "Bab 2: Penjumlahan dan Pengurangan sampai 10.000";

export const MODUL_MTK3_BAB2: ModulResmiPai = {
  id: "mtk-3-bab2",
  judul: JUDUL_MTK3_BAB2,
  pola: /penjumlahan dan pengurangan sampai 10\.?000/,
  motivasi:
    "Nisa, Farhan, dan Cinta belajar menjumlahkan dan mengurangkan bilangan sampai 10.000 bersama burung hantu Hulu di perpustakaan keliling.",
  kunciJawaban: "A,B,A,B,A,C,B,A,A,A",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menyusun buku di empat rak bersama Hulu.",
    "Simpanan pindah ke rak kiri. Pinjaman diambil dari rak yang masih berisi.",
    "Hulu memberi stempel di meja perpustakaan keliling.",
    "Poin penting dan lembar evaluasi penjumlahan dan pengurangan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
3.246 + 1.532 sama dengan...
A) 4.778
B) 4.768
C) 4.878
D) 5.778`,
    `[Soal 2 - PG - Tipe: HOTS]
Pada 1.508 + 2.697, satuan 8 + 7 = 15. Yang harus dilakukan...
A) Tulis 15 di satuan
B) Tulis 5, simpan 1 ke puluhan
C) Tulis 1, simpan 5
D) Lewati rumah satuan`,
    `[Soal 3 - PG - Tipe: HOTS]
5.020 − 1.346 sama dengan...
A) 3.674
B) 3.774
C) 4.674
D) 3.684`,
    `[Soal 4 - PG - Tipe: HOTS]
Farhan berkata, "Kalau hasilnya 12, tulis 12 di rumah itu." Apakah Farhan benar?
A) Benar, 12 ditulis utuh
B) Salah, tulis 2 dan simpan 1
C) Salah, tulis 1 dan simpan 2
D) Salah, rumah itu dikosongkan`,
    `[Soal 5 - PG - Tipe: MOTS]
7.865 − 2.431 sama dengan...
A) 5.434
B) 5.344
C) 5.444
D) 4.434`,
    `[Soal 6 - PG - Tipe: HOTS]
Pada 4.006 − 1.238, pinjaman berantai dimulai dari rumah...
A) Puluhan
B) Ratusan
C) Ribuan
D) Satuan`,
    `[Soal 7 - PG - Tipe: HOTS]
Deret naik 250: 2.000 – 2.250 – 2.500 – ⬜. Berikutnya...
A) 2.650
B) 2.750
C) 2.700
D) 3.000`,
    `[Soal 8 - PG - Tipe: HOTS]
8.045 − 2.617 sama dengan...
A) 5.428
B) 5.438
C) 6.428
D) 5.328`,
    `[Soal 9 - PG - Tipe: HOTS]
Mana yang lebih besar, 4.278 + 1.653 atau 6.312 − 2.748?
A) 5.931
B) 3.564
C) Keduanya sama
D) 6.312`,
    `[Soal 10 - PG - Tipe: HOTS]
Rak 2.350, datang 1.475, lalu dipinjam 1.250. Sisa akhirnya...
A) 2.575
B) 3.825
C) 2.755
D) 1.475`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Hulu menjumlahkan, mengurangi, lalu menyelesaikan catatan rak.",
      labelDaftar: "Lima adegan rak buku",
      kolom: 1,
      item: [
        {
          nama: "Tanpa menyimpan",
          singkat: "Semua muat",
          uraian: "2.431 + 3.256 = 5.687. Tiap rumah hasilnya masih satu angka, jadi tidak ada simpanan.",
          contoh: "Mulai dari satuan.",
        },
        {
          nama: "Dengan menyimpan",
          singkat: "Lebih dari sembilan",
          uraian: "2.476 + 1.358 = 3.834. Satuan 6 + 8 = 14, tulis 4, simpan 1.",
          contoh: "Tulis sisa, simpan satu ke kiri.",
        },
        {
          nama: "Tanpa meminjam",
          singkat: "Atas cukup",
          uraian: "5.876 − 2.341 = 3.535. Semua angka atas cukup, jadi langsung dikurangi.",
          contoh: "Tidak ada yang meminjam.",
        },
        {
          nama: "Dengan meminjam",
          singkat: "Termasuk angka nol",
          uraian: "5.346 − 2.178 = 3.168. Pada 4.203 − 1.578, puluhan 0 jadi pinjaman loncat ke ratusan. Hasilnya 2.625.",
          contoh: "Pinjam satu, nilainya sepuluh.",
        },
        {
          nama: "Soal cerita",
          singkat: "Kata kunci dulu",
          uraian: "2.350 + 1.475 = 3.825 karena buku datang. 4.260 − 1.085 = 3.175 karena buku dipinjam.",
          contoh: "Datang berarti tambah. Sisa berarti kurang.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa 1.324 + 2.451, dan dari rumah mana mulai?", alias: ["3775", "satuan"] },
        { pertanyaan: "Tulis hasil 4.102 + 3.576.", alias: ["7678"] },
        { pertanyaan: "Pada 3.685 + 1.247, satuan 5 + 7 = 12. Apa yang ditulis dan disimpan?", alias: ["2", "simpan", "1"] },
        { pertanyaan: "Tulis hasil 1.508 + 2.697.", alias: ["4205"] },
        { pertanyaan: "Berapa 6.749 − 2.315, dan apakah ada yang meminjam?", alias: ["4434", "tidak"] },
        { pertanyaan: "Tulis hasil 8.964 − 3.521.", alias: ["5443"] },
        { pertanyaan: "Berapa 7.245 − 3.168, dan rumah mana yang meminjam?", alias: ["4077", "satuan", "puluhan"] },
        { pertanyaan: "Tulis hasil 5.020 − 1.346.", alias: ["3674", "pinjam"] },
        { pertanyaan: "Rak 4.260, dipinjam 1.085. Berapa sisa?", alias: ["3175", "kurang"] },
        { pertanyaan: "Pagi 1.864, siang datang 2.357. Berapa jumlahnya?", alias: ["4221", "tambah"] },
        { pertanyaan: "Pada 2.476 + 1.358, berapa simpanan dari satuan?", alias: ["1"] },
        { pertanyaan: "Pasangkan hitungan dengan hasilnya.", alias: ["3834", "3535", "2625"] },
        { pertanyaan: "Susun jejak 2.476 + 1.358 dari satuan.", alias: ["tulis 4", "tulis 3", "tulis 8"] },
        { pertanyaan: "Periksa tiga pernyataan hitungan.", alias: ["benar", "salah"] },
        { pertanyaan: "3.⬜25 + 1.460 = 4.885. Angka yang hilang?", alias: ["4"] },
      ],
      voice: [
        [
          "Hari ini kita menghitung buku di perpustakaan keliling. Ada empat rak: ribuan, ratusan, puluhan, dan satuan.",
          "Penjumlahan dan pengurangan dimulai dari rak kanan. Kalau lebih dari sembilan, sepuluh buku pindah ke kiri.",
          "Kalau rak kanan kurang, pinjam satu ikat dari kiri. Satu ikat itu bernilai sepuluh.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis",
      pengantar: "Intisari menyimpan, meminjam, dan memilih operasi pada soal cerita.",
      labelDaftar: "Lima papan hitung",
      kolom: 1,
      item: [
        {
          nama: "Tanpa menyimpan",
          singkat: "Tulis langsung",
          uraian: "1.203 + 4.571 = 5.774. Tidak ada rumah yang hasilnya sepuluh atau lebih.",
          contoh: "0 sampai 9, tulis saja.",
        },
        {
          nama: "Menyimpan",
          singkat: "Sisa dan simpanan",
          uraian: "4.278 + 1.653 = 5.931. Satuan 11, tulis 1 simpan 1. Puluhan 13, tulis 3 simpan 1.",
          contoh: "Yang ditulis bukan 11, melainkan 1.",
        },
        {
          nama: "Tanpa meminjam",
          singkat: "Kurangi biasa",
          uraian: "7.865 − 2.431 = 5.434. Angka atas di setiap rumah lebih besar.",
          contoh: "Cukup? Langsung kurang.",
        },
        {
          nama: "Meminjam melewati nol",
          singkat: "Loncat ke kiri",
          uraian: "8.045 − 2.617 = 5.428. Ratusan 0, jadi pinjaman datang dari ribuan.",
          contoh: "Rumah 0 tidak bisa memberi pinjaman.",
        },
        {
          nama: "Soal cerita",
          singkat: "Operasi dulu",
          uraian: "3.480 − 1.265 = 2.215 karena terpakai. 2.146 + 1.853 = 3.999 karena dijumlahkan.",
          contoh: "Baca kata kuncinya sebelum menghitung.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa 2.314 + 1.625, dan dari rumah mana mulai?", alias: ["3939", "satuan"] },
        { pertanyaan: "Tulis hasil 3.240 + 2.516.", alias: ["5756"] },
        { pertanyaan: "Pada 2.609 + 3.184, satuan 9 + 4 = 13. Apa yang ditulis dan disimpan?", alias: ["3", "simpan", "1"] },
        { pertanyaan: "Tulis hasil 2.847 + 1.365.", alias: ["4212"] },
        { pertanyaan: "Berapa 9.578 − 4.236, dan apakah ada yang meminjam?", alias: ["5342", "tidak"] },
        { pertanyaan: "Tulis hasil 6.489 − 1.253.", alias: ["5236"] },
        { pertanyaan: "Berapa 8.045 − 2.617, dan rumah mana yang memberi pinjaman karena berisi 0?", alias: ["5428", "ratusan"] },
        { pertanyaan: "Tulis hasil 4.006 − 1.238 dan rumah awal pinjamannya.", alias: ["2768", "ribuan"] },
        { pertanyaan: "Rak A 2.146 dan rak B 1.853. Berapa jumlahnya?", alias: ["3999", "tambah"] },
        { pertanyaan: "Ada 5.200 kartu, dibagikan 1.750. Berapa sisa?", alias: ["3450", "kurang"] },
        { pertanyaan: "Angka 1 di satuan 4.278 + 1.653 berasal dari mana?", alias: ["11"] },
        { pertanyaan: "Pasangkan hitungan dengan tekniknya.", alias: ["tanpa menyimpan", "menyimpan", "meminjam"] },
        { pertanyaan: "Urutkan 2.768, 3.168, dan 5.434 dari kecil.", alias: ["2768", "3168", "5434"] },
        { pertanyaan: "Periksa tiga pernyataan.", alias: ["benar", "salah"] },
        { pertanyaan: "5.2⬜0 − 1.346 = 3.674. Angka yang hilang?", alias: ["0"] },
      ],
      voice: [
        [
          "Papan ini merangkum cara hitungnya. Mulai dari kanan.",
          "Lebih dari sembilan: tulis angka satuannya, simpan satu ke kiri. Kurang dari angka bawah: pinjam satu dari kiri.",
          "Pada soal cerita, tentukan tambah atau kurang sebelum menulis susunan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Giliran Rak Hulu",
      pengantar: "Siswa menjadi petugas rak. Sepuluh pos selesai, sepuluh stempel terkumpul.",
      labelDaftar: "Sepuluh giliran rak",
      kolom: 1,
      item: [
        {
          nama: "Catatan rak",
          singkat: "Tambah, simpan, kurang, pinjam",
          uraian:
            "Giliran 1 menjumlahkan 2.431 + 3.256. Giliran 2 menyimpan dari 14. Giliran 4 menghitung 5.346 − 2.178. Giliran 5 meminjam melewati nol pada 4.203. Kumpulkan 10 stempel.",
          contoh: "Salah hitung boleh diulang. Stempel tidak berkurang.",
        },
      ],
      kuis: [
        ...kuisDariMisi(MISI_MTK3_BAB2),
        { pertanyaan: "Berapa 4.278 + 1.653?", alias: ["5931"] },
        { pertanyaan: "Satuan 5 + 7 = 12. Apa yang dilakukan?", alias: ["tulis 2", "simpan 1"] },
        { pertanyaan: "Pasangkan hitungan dengan hasilnya.", alias: ["5687", "3834", "3168"] },
        { pertanyaan: "Urutkan 2.215, 2.625, 3.535, dan 4.221 dari kecil.", alias: ["2215", "2625", "3535", "4221"] },
        { pertanyaan: "Periksa tiga pernyataan rak.", alias: ["benar", "salah"] },
        { pertanyaan: "⬜ + 1.358 = 3.834. Bilangan yang hilang?", alias: ["2476"] },
        { pertanyaan: "Berapa 7.003 − 2.456?", alias: ["4547"] },
        { pertanyaan: "Deret 1.200, 2.450, 3.700, berikutnya?", alias: ["4950"] },
        { pertanyaan: "Ucapkan hasil 6.004 − 2.578 dan rumah awal pinjamannya.", alias: ["3426", "ribuan"] },
        { pertanyaan: "Tulis 4.278 + 1.653 dan berapa kali menyimpan.", alias: ["5931", "dua"] },
      ],
      voice: [
        [
          "Kalian menjadi petugas rak bersama Hulu. Buku yang masuk dijumlahkan. Buku yang dipinjam dikurangi.",
          "Kalau satu rak lebih dari sembilan, sepuluh buku pindah ke rak kiri. Kalau rak kosong, pinjam dari rak yang masih berisi.",
          "Sepuluh giliran selesai, sepuluh stempel terkumpul, meja pustakawan terbuka.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal menyimpan, meminjam, dan soal cerita sampai 10.000.",
      labelDaftar: "Lembar evaluasi hitung",
      kolom: 1,
      item: [
        {
          nama: "Simpan dan pinjam",
          singkat: "Jejak dari kanan",
          uraian:
            "8.003 − 2.567 = 5.436, pinjaman dari ribuan. 3.756 + 2.845 = 6.601, menyimpan tiga kali. 2.476 + 1.358 menulis 3 di puluhan karena ada simpanan.",
          contoh: "Simpanan dihitung. Rumah yang dipinjam berkurang satu.",
        },
        {
          nama: "Catatan halte",
          singkat: "Tiga langkah",
          uraian: "3.480 + 1.265 = 4.745. Lalu 4.745 − 2.180 = 2.565. Selisih sumbangan dan pinjaman 2.180 − 1.265 = 915.",
          contoh: "Satu langkah dulu, baru langkah berikutnya.",
        },
      ],
      kuis: [
        { pertanyaan: "Tulis hasil 8.003 − 2.567 dan rumah awal pinjamannya.", alias: ["5436", "ribuan"] },
        { pertanyaan: "Pada 2.476 + 1.358, apa yang ditulis di puluhan?", alias: ["3"] },
        { pertanyaan: "Ada 5.200 kartu, dibagikan 1.750. Ucapkan sisa dan operasinya.", alias: ["3450", "kurang"] },
        { pertanyaan: "Farhan menulis 12 di satuan. Apakah benar?", alias: ["2", "simpan"] },
        { pertanyaan: "Pasangkan kata cerita dengan operasinya.", alias: ["tambah", "kurang"] },
        { pertanyaan: "Tulis 3.756 + 2.845 dan berapa kali menyimpan.", alias: ["6601", "tiga"] },
        { pertanyaan: "Deret 1.050, 2.300, 3.550, berikutnya?", alias: ["4800"] },
        { pertanyaan: "Susun 6.601, 5.931, 4.547, dan 2.768 dari besar.", alias: ["6601", "5931", "4547", "2768"] },
        { pertanyaan: "Mana lebih besar, 2.431 + 3.256 atau 5.876 − 2.341? Mengapa?", alias: ["5687", "ribuan"] },
        { pertanyaan: "Setelah sumbangan, setelah dipinjam, dan selisih keduanya.", alias: ["4745", "2565", "915"] },
      ],
      voice: [
        [
          "Saatnya kalian bekerja sendiri seperti petugas rak. Ada sepuluh soal penjumlahan dan pengurangan sampai 10.000.",
          "Sebagian soal meminta jejak menyimpan atau meminjam. Sebagian soal cerita. Untuk soal alasan, sebutkan mengapa hasil itu benar.",
          "Ingat tiga hal: mulai dari satuan, simpanan wajib dihitung, dan rumah nol tidak bisa memberi pinjaman. Selamat bekerja!",
        ],
      ],
    },
  ],
};
