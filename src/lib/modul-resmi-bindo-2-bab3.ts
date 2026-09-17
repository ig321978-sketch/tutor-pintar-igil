import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB3 = "Bab 3: Berhati-hati di Jalan";

export const MODUL_BINDO2_BAB3: ModulResmiPai = {
  id: "bindo-2-bab3",
  judul: JUDUL_BINDO2_BAB3,
  pola: /berhati-hati di (jalan|mana saja)|rambu lalu lintas|membaca denah|teks informatif jalan/,
  motivasi:
    "Rambu merah larangan, kuning peringatan, biru petunjuk. Denah dibaca dengan arah mata angin dan kata penunjuk: di seberang, di sebelah kanan, di antara.",
  kunciJawaban: "B,C,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak membaca rambu merah, kuning, dan biru di tepi jalan sekolah.",
    "Anak menelusuri denah: utara atas, toko di seberang puskesmas.",
    "Anak mengerjakan evaluasi rambu, denah, dan rute ke kantin.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Nia ingin menyeberang jalan dengan aman saat pulang sekolah. Rambu petunjuk tempat penyeberangan pejalan kaki (zebra cross) biasanya memiliki warna dasar yaitu...
A) Merah menyala
B) Biru terang
C) Kuning tua
D) Hijau daun`,
    `[Soal 2 - PG - Tipe: HOTS]
Perhatikan teks: "Puskesmas terletak di Jalan Melati. Di sebelah kiri puskesmas adalah Bank Desa, dan di seberang jalannya adalah Alun-Alun." Bangunan yang berada tepat di depan Puskesmas adalah...
A) Bank Desa
B) Jalan Melati
C) Alun-Alun
D) Sekolah`,
    `[Soal 3 - PG - Tipe: HOTS]
Rambu jalan licin berwarna dasar kuning bertugas memberikan larangan agar kendaraan tidak boleh lewat. Pernyataan ini...
A) Benar.
B) Salah; kuning artinya peringatan, bukan larangan.
C) Benar hanya di malam hari.
D) Kuning sama dengan merah.`,
    `[Soal 4 - PG - Tipe: HOTS]
Menyeberang jalan raya secara sembarangan tanpa jembatan penyeberangan termasuk melanggar aturan keselamatan. Pernyataan ini...
A) Salah.
B) Benar; kita wajib menyeberang di tempat yang aman.
C) Benar hanya jika hujan.
D) Boleh jika terburu-buru.`,
    `[Soal 5 - PG - Tipe: Reguler]
Lingkaran merah bertanda strip putih horizontal artinya...
A) Peringatan longsor.
B) Larangan masuk bagi kendaraan.
C) Petunjuk rumah sakit.
D) Arah utara.`,
    `[Soal 6 - PG - Tipe: Reguler]
Segitiga kuning bergambar tebing artinya...
A) Peringatan daerah rawan longsor.
B) Larangan parkir.
C) Petunjuk zebra cross.
D) Toko buku.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kotak biru bergambar tempat tidur dan palang merah artinya...
A) Dilarang berhenti.
B) Jalan berkelok.
C) Petunjuk lokasi rumah sakit.
D) Larangan masuk.`,
    `[Soal 8 - PG - Tipe: Reguler]
Gambar yang menunjukkan letak kota, jalan, atau ruangan disebut...
A) Fabel.
B) Denah.
C) Celengan.
D) Antonim.`,
    `[Soal 9 - PG - Tipe: HOTS]
Jika rumah Ali menghadap utara dan rumah Nia di sebelah kanannya, rumah Nia menghadap...
A) Utara juga, di sisi timur rumah Ali.
B) Selatan wajib.
C) Barat saja.
D) Tidak bisa ditentukan sama sekali.`,
    `[Soal 10 - PG - Tipe: Reguler]
Rambu kuning artinya...
A) Larangan.
B) Peringatan agar waspada.
C) Perintah biru.
D) Nama orang.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Membaca Rambu Lalu Lintas",
      pengantar:
        "Infografis makna warna rambu: merah larangan, kuning peringatan, biru perintah atau petunjuk. Membaca rambu sama dengan membaca tulisan agar terhindar dari kecelakaan.",
      labelDaftar: "Merah, kuning, dan biru",
      kolom: 1,
      item: [
        {
          nama: "Warna merah",
          singkat: "Larangan",
          uraian:
            "Rambu merah artinya tidak boleh. Contoh: huruf P dicoret = dilarang parkir. Strip putih horizontal di lingkaran merah = dilarang masuk.",
          contoh: "P dicoret = jangan parkir.",
        },
        {
          nama: "Warna kuning",
          singkat: "Peringatan",
          uraian:
            "Kuning artinya hati-hati, ada bahaya di depan: jalan licin, berkelok, atau rawan longsor. Bukan larangan lewat, melainkan peringatan agar waspada.",
          contoh: "Kuning = waspada, bukan stop.",
        },
        {
          nama: "Warna biru",
          singkat: "Perintah atau petunjuk",
          uraian:
            "Biru memberi petunjuk kewajiban atau lokasi. Contoh: orang menyeberang (zebra cross), rumah sakit. Patuhi rambu agar selamat sampai tujuan.",
          contoh: "Zebra cross biasanya biru.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika kamu melihat rambu berbentuk lingkaran dengan huruf P yang dicoret garis merah, apa arti rambu tersebut bagi pengendara mobil?",
          alias: ["parkir", "larang", "tidak boleh", "dilarang", "jangan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Rambu lalu lintas yang berwarna Kuning memiliki arti sebagai ........................",
        alias: ["peringatan", "waspada", "hati-hati", "peringatan bahaya"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang cermat, saat kita berjalan kaki menuju sekolah atau naik sepeda, jalan raya dipenuhi tanda berwarna-warni yang disebut rambu lalu lintas. Rambu ini bahasa visual: mereka berbicara memakai gambar dan warna!",
          "Jika kalian melihat rambu berwarna merah, itu larangan: stop atau tidak boleh dilakukan. Jika kuning, itu peringatan agar kita ekstra waspada, misalnya jalan licin atau berkelok.",
          "Sedangkan warna biru memberikan petunjuk kewajiban, seperti jalur khusus pejalan kaki. Yuk, kita patuhi rambu jalan agar kita selamat sampai di tujuan!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Menemukan Informasi dari Denah Sederhana",
      pengantar:
        "Infografis kunci denah: atas utara, bawah selatan, kanan timur, kiri barat. Kata penunjuk: di seberang, di sebelah kanan, di antara, pertigaan.",
      labelDaftar: "Arah mata angin dan kata penunjuk",
      kolom: 1,
      item: [
        {
          nama: "Arah utama",
          singkat: "Utara di atas",
          uraian:
            "Pada denah, bagian atas gambar biasanya utara. Bawah selatan, kanan timur, kiri barat. Itu kompas kertas kita agar tidak tersesat.",
          contoh: "Atas = utara.",
        },
        {
          nama: "Kata penunjuk",
          singkat: "Seberang, kanan, di antara",
          uraian:
            "Contoh: toko buku di seberang puskesmas. Sekolah di antara lapangan dan masjid. Bank di sebelah kiri puskesmas. Seberang = tepat di depan, menyeberang jalan.",
          contoh: "Seberang = di depan, lintas jalan.",
        },
        {
          nama: "Cakrawala ilmu",
          singkat: "Denah = peta kecil",
          uraian:
            "Denah menunjukkan lokasi suatu tempat. Membaca denah melatih konsentrasi dan ketelitian. Perhatikan nama jalan dan arah mata angin.",
          contoh: "Denah = gambar letak tempat.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika rumah Ali menghadap ke utara, dan di sebelah kanannya adalah rumah Nia, menghadap ke arah mata angin manakah rumah Nia?",
          alias: ["utara", "timur", "kanan", "timur laut", "sama"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Gambar yang menunjukkan letak kota, jalan, atau ruangan disebut ........................",
        alias: ["denah", "peta", "denah atau peta"],
      },
      voice: [
        [
          "Pernahkah kalian bingung mencari letak ruang perpustakaan atau toko buku? Tenang, kita bisa menggunakan denah. Denah adalah peta kecil yang menunjukkan posisi sebuah tempat.",
          "Saat membaca denah, perhatikan nama jalan dan kata penunjuk posisi. Misalnya: toko buku berada di seberang puskesmas, atau sekolah terletak di antara lapangan sepak bola dan masjid.",
          "Jangan lupa arah mata angin dasar; bagian atas gambar biasanya selalu menunjuk ke utara. Dengan memahami denah, kita tidak akan mudah tersesat di jalan!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih warna zebra cross dan bangunan di seberang puskesmas, tentukan benar-salah rambu kuning serta menyeberang sembarangan, jodohkan tiga rambu, lalu tulis rute ke kantin.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Biru dan seberang",
          uraian:
            "Zebra cross biasanya biru. Di seberang puskesmas = Alun-Alun, bukan Bank Desa. Kuning = peringatan, bukan larangan. Menyeberang sembarangan melanggar keselamatan.",
          contoh: "Biru. Alun-Alun. Kuning waspada.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Simbol dan rute",
          uraian:
            "Merah strip putih: larangan masuk. Segitiga kuning tebing: peringatan longsor. Biru palang: rumah sakit. Tulis rute ke kantin dengan belok kanan, lurus, melewati.",
          contoh: "Larangan. Longsor. RS. Belok dan lurus.",
        },
      ],
      kuis: [
        { pertanyaan: "Warna zebra cross?", alias: ["biru"] },
        { pertanyaan: "Di seberang puskesmas?", alias: ["alun"] },
        { pertanyaan: "Kuning artinya larangan?", alias: ["salah", "peringatan"] },
        { pertanyaan: "Menyeberang sembarangan?", alias: ["salah", "benar langgar"] },
        { pertanyaan: "Denah itu apa?", alias: ["gambar", "letak"] },
        { pertanyaan: "Rute ke kantin memakai?", alias: ["belok", "lurus", "kanan", "kiri"] },
      ],
      voice: [
        [
          "Zebra cross biasanya biru. Yang di seberang puskesmas adalah Alun-Alun. Kuning memperingatkan, bukan melarang.",
        ],
        [
          "Denah adalah gambar letak tempat. Tulis rute ke kantin dengan kata belok, lurus, dan melewati.",
        ],
      ],
    },
  ],
};
