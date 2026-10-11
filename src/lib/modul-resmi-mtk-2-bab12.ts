import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB12 = "Bab 12: Bilangan sampai dengan 10.000";

export const MODUL_MTK2_BAB12: ModulResmiPai = {
  id: "mtk-2-bab12",
  judul: JUDUL_MTK2_BAB12,
  pola:
    /gudang pusat sani|bab 12: bilangan|bilangan sampai dengan 10.?000|nilai tempat ribuan|tanda titik ribuan/,
  motivasi:
    "Hore! Kamu sudah membantu Sani membaca angka gudang pusat. Lihat tanda titik, ucapkan RIBU. 3.425 dibaca tiga ribu empat ratus dua puluh lima. Nol di ratusan tidak perlu diucapkan.",
  kunciJawaban: "B,C,B,A,A,A,A,A,A,A",
  sketsaKartu: [
    "Sani memegang papan stok empat angka dengan tanda titik di Gudang Pusat.",
    "Papan nilai tempat: 3 ribuan, 4 ratusan, 2 puluhan, 5 satuan menjadi 3.425.",
    "Anak menguraikan 4.263 dan 6.081, lalu membaca namanya.",
    "Anak mengisi lembar evaluasi tantangan para juara tentang bilangan ribuan.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Edo membaca 4.025 sebagai empat ribu dua ratus lima. Mengapa salah...
A) Seharusnya empat ratus dua puluh lima
B) Seharusnya empat ribu dua puluh lima, nol di ratusan tidak diucapkan
C) Pembacaan Edo sudah benar
D) Seharusnya empat puluh dua lima`,
    `[Soal 2 - PG - Tipe: HOTS]
7 di ratusan, 2 di ribuan, 0 di puluhan, 5 di satuan. Lambang yang tepat...
A) 7.205
B) 2.750
C) 2.705
D) 2.075`,
    `[Soal 3 - PG - Tipe: HOTS]
Di antara 3.000 dan 4.000, satuan 9, jumlah digit 12. Bilangan itu...
A) 3.090
B) 3.009
C) 3.900
D) 3.019`,
    `[Soal 4 - PG - Tipe: MOTS]
Lima ribu empat ratus tiga puluh ditulis...
A) 5.430
B) 5.403
C) 54.30
D) 5.043`,
    `[Soal 5 - PG - Tipe: HOTS]
Hijau 4.350, Biru 4.530, Merah 4.503. Urutan paling banyak...
A) Biru, Merah, Hijau
B) Biru, Hijau, Merah
C) Merah, Biru, Hijau
D) Hijau, Biru, Merah`,
    `[Soal 6 - PG - Tipe: LOTS]
8.700 dibaca...
A) Delapan ribu tujuh ratus
B) Delapan ratus tujuh puluh
C) Delapan ribu tujuh puluh
D) Tujuh ribu delapan ratus`,
    `[Soal 7 - PG - Tipe: HOTS]
Pada 5.555, selisih nilai 5 ribuan dan 5 ratusan...
A) 4.500
B) 500
C) 5.000
D) 55`,
    `[Soal 8 - PG - Tipe: HOTS]
(1) 3.040 (2) 3.400. Pasangan baca...
A) 1B 2A
B) 1A 2B
C) Keduanya A
D) Keduanya B`,
    `[Soal 9 - PG - Tipe: HOTS]
2.999 ditambah 1 permen. Angka baru...
A) 3.000
B) 2.991
C) 3.999
D) 2.000`,
    `[Soal 10 - PG - Tipe: HOTS]
Kartu 1, 0, 5, 4. Bilangan ribuan terbesar, 0 tidak di depan...
A) 5.410
B) 5.401
C) 4.510
D) 1.540`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog Menghitung Stok Dus Raksasa",
      pengantar:
        "🗺️ Gudang Pusat Permen Sani memakai dus raksasa. Angka stok punya empat digit dan tanda titik. Yuk bantu Sani membaca angka ribuan agar laporan gudang tidak salah!",
      labelDaftar: "Target dan cerita apersepsi",
      kolom: 1,
      item: [
        {
          nama: "🌟 Target belajarku hari ini",
          singkat: "Baca dan uraikan ribuan",
          uraian:
            "🎯 Aku bisa membaca dan menulis lambang bilangan empat angka (ribuan) dengan tepat. 🎯 Aku bisa menguraikan nilai tempat ribuan, ratusan, puluhan, dan satuan pada bilangan besar.",
          contoh: "Lihat tanda titik, ucapkan RIBU.",
        },
        {
          nama: "🗺️ Menghitung stok dus raksasa",
          singkat: "Angka empat digit di papan",
          uraian:
            "Bisnis Sani sudah besar. Stok tidak lagi dihitung kantong, melainkan dus raksasa. Papan catatan memuat empat angka dan satu titik pemisah.",
          contoh: "Yuk bantu Sani membaca angka raksasa!",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Angka di papan stok Sani punya berapa digit?",
          alias: ["4", "empat"],
        },
        {
          pertanyaan: "2. Tanda kecil di tengah angka raksasa itu apa?",
          alias: ["titik", "."],
        },
        {
          pertanyaan: "3. Lantai rumah baru di sebelah kiri ratusan disebut apa?",
          alias: ["ribu", "ribuan"],
        },
      ],
      voice: [
        [
          "Selamat datang di gudang pusat permen Sani. Stok sekarang ditulis dengan empat angka dan tanda titik.",
          "Sani bingung membaca angka ribuan. Yuk kita bantu Sani agar laporan gudang tidak salah!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Rumah Ribuan",
      pengantar:
        "🔢 Rumah baru di kiri ratusan namanya ribuan. 3.425 artinya 3.000 + 400 + 20 + 5. Setiap melihat titik, ucapkan kata RIBU.",
      labelDaftar: "Nilai tempat dan tanda titik",
      kolom: 1,
      item: [
        {
          nama: "🏢 Papan nilai tempat",
          singkat: "3.425",
          uraian:
            "Ribuan 3 bernilai 3.000. Ratusan 4 bernilai 400. Puluhan 2 bernilai 20. Satuan 5 bernilai 5. Dibaca tiga ribu empat ratus dua puluh lima.",
          contoh: "Paling kiri = ribuan.",
        },
        {
          nama: "💡 Tanda titik pemisah",
          singkat: "Titik = ucapkan RIBU",
          uraian:
            "Titik memisahkan kelompok ribuan dan ratusan. 2.000 = dua ribu. 5.100 = lima ribu seratus. 7.050 = tujuh ribu lima puluh, ratusan nol tidak dibaca.",
          contoh: "Nol di tengah tidak diucapkan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 3.425 dibaca bagaimana?",
          alias: ["tiga ribu", "empat ratus", "dua puluh lima"],
        },
        {
          pertanyaan: "2. Saat melihat tanda titik, ucapkan kata apa?",
          alias: ["ribu"],
        },
        {
          pertanyaan: "3. 7.050, ratusannya nol. Perlu diucapkan kata ratus?",
          alias: ["tidak", "nol"],
        },
      ],
      voice: [
        [
          "Rumah baru di kiri namanya ribuan. Tiga koma empat dua lima artinya tiga ribu empat ratus dua puluh lima.",
          "Setiap melihat titik, ucapkan ribu. Nol di tempat ratusan tidak perlu diucapkan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Petugas Sensor Angka Raksasa",
      pengantar:
        "🕵️‍♂️ Uraikan nilai tempat dari kiri. Dus A 4.263. Dus B 6.081. Baca namanya dengan teliti, terutama jika ada nol.",
      labelDaftar: "Aktivitas terbimbing dan jurnal",
      kolom: 1,
      item: [
        {
          nama: "🕵️‍♂️ Aktivitas 1",
          singkat: "4.263 dan 6.081",
          uraian:
            "4.263: 4 ribuan, 2 ratusan, 6 puluhan, 3 satuan. Dibaca empat ribu dua ratus enam puluh tiga. 6.081: 8 puluhan, 1 satuan. Dibaca enam ribu delapan puluh satu.",
          contoh: "Mulai dari angka paling kiri.",
        },
        {
          nama: "🎭 Jurnal perasaanku",
          singkat: "Pilih wajah",
          uraian:
            "😀 Hebat, tidak takut angka panjang! 😐 Harus teliti melihat letak titik. 😢 Masih lupa membaca nol di tengah.",
          contoh: "Pilih satu wajah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pada 4.263, angka 4 menempati tempat apa?",
          alias: ["ribu", "ribuan"],
        },
        {
          pertanyaan: "2. Pada 6.081, angka 8 menempati tempat apa?",
          alias: ["puluh", "puluhan"],
        },
        {
          pertanyaan: "3. 6.081 dibaca bagaimana? (ada nol di ratusan)",
          alias: ["enam ribu", "delapan puluh satu"],
        },
      ],
      voice: [
        [
          "Yuk jadi petugas sensor. Empat koma dua enam tiga: empat di ribuan, dua di ratusan, enam di puluhan, tiga di satuan.",
          "Enam koma nol delapan satu dibaca enam ribu delapan puluh satu. Nol di ratusan tidak diucapkan.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Tantangan para juara! Susun ribuan-ratusan-puluhan-satuan. Nol di tengah tidak dibaca. Tanda titik memisahkan ribuan.",
      labelDaftar: "Evaluasi pilihan ganda dan isian",
      kolom: 1,
      item: [
        {
          nama: "🍓 Bagian A",
          singkat: "Pilihan ganda",
          uraian:
            "4.025 dibaca empat ribu dua puluh lima. Rahasia Siti 2.705. Kode Sani 3.009. Cokelat 5.430. Urutan mesin: Biru, Merah, Hijau.",
          contoh: "Cek tiap nilai tempat.",
        },
        {
          nama: "✏️ Bagian B",
          singkat: "Isian singkat",
          uraian:
            "8.700 = delapan ribu tujuh ratus. Selisih 5.000 − 500 = 4.500. 3.040 = B, 3.400 = A. 2.999 + 1 = 3.000. Terbesar 5.410.",
          contoh: "8.700. 4.500. 1B 2A. 3.000. 5.410.",
        },
      ],
      kuis: [
        { pertanyaan: "1. 4.025 dibaca yang tepat?", alias: ["dua puluh lima"] },
        { pertanyaan: "2. Lambang rahasia Siti?", alias: ["2.705", "2705"] },
        { pertanyaan: "3. Kode dus Sani?", alias: ["3.009", "3009"] },
        { pertanyaan: "4. Lima ribu empat ratus tiga puluh?", alias: ["5.430", "5430"] },
        { pertanyaan: "5. Mesin paling banyak?", alias: ["biru"] },
        { pertanyaan: "6. 8.700 dibaca?", alias: ["delapan ribu"] },
        { pertanyaan: "7. Selisih 5 ribuan dan 5 ratusan?", alias: ["4500", "4.500"] },
        { pertanyaan: "8. 3.040 dan 3.400, pasangannya?", alias: ["1b"] },
        { pertanyaan: "9. 2.999 + 1?", alias: ["3000", "3.000"] },
        { pertanyaan: "10. Bilangan terbesar dari 1, 0, 5, 4?", alias: ["5410", "5.410"] },
      ],
      voice: [
        [
          "Ini lembar evaluasi tantangan para juara. Empat koma nol dua lima dibaca empat ribu dua puluh lima. Rahasia Siti dua koma tujuh nol lima. Kode Sani tiga koma nol nol sembilan.",
          "Cokelat lima koma empat tiga nol. Mesin biru paling banyak, lalu merah, lalu hijau.",
        ],
        [
          "Delapan koma tujuh nol nol dibaca delapan ribu tujuh ratus. Selisih lima ribu dikurangi lima ratus sama dengan empat ribu lima ratus. Tiga koma nol empat puluh berpasangan B. Dua koma sembilan sembilan sembilan plus satu sama dengan tiga ribu. Susunan terbesar lima koma empat satu nol.",
        ],
      ],
    },
  ],
};
