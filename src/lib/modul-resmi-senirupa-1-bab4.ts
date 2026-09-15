import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_SENIRUPA1_BAB4 = "Bab 4: Membuat Mainan dari Barang Bekas";

export const MODUL_SENIRUPA1_BAB4: ModulResmiPai = {
  id: "senirupa-1-bab4",
  judul: JUDUL_SENIRUPA1_BAB4,
  pola: /mainan dari barang bekas|tiga dimensi|trimatra|membentuk dari tanah liat|eco-art/,
  motivasi:
    "Kotak susu dan tutup botol bisa jadi mobil. Karya tiga dimensi punya tebal, bisa dilihat dari segala arah. Mendaur ulang sampah adalah cinta lingkungan.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali membawa kotak susu dan tutup botol, Nia mengubahnya jadi mobil-mobilan.",
    "Karya 3D ber-volume dan eco-art dari limbah aman.",
    "Anak merakit mainan bekas di sekolah serta di rumah.",
    "Siswa membedakan patung dan gambar, lalu menilai daur ulang kardus.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ali membuat sebuah patung kucing kecil menggunakan bahan tanah liat lembut, sedangkan Nia menggambar pemandangan gunung di atas kertas menggunakan krayon. Perbedaan utama dari kedua karya tersebut adalah...
A) Gambar Nia memiliki ruang tebal dan bisa dipegang bagian belakangnya.
B) Patung buatan Ali termasuk karya tiga dimensi karena memiliki volume (isi/tebal) dan bisa dilihat dari segala arah, sedangkan gambar Nia adalah karya dua dimensi yang rata.
C) Gambar Nia lebih mahal daripada patung Ali.
D) Patung Ali tidak boleh dilihat dari samping.`,
    `[Soal 2 - PG - Tipe: HOTS]
Mengapa memanfaatkan kardus bekas kotak sepatu untuk dijadikan rumah-rumahan mainan dinilai sebagai perbuatan yang mencerminkan siswa kreatif yang cinta lingkungan?
A) Karena kardus bekas gratis dan tidak perlu dibeli di toko mainan.
B) Karena aktivitas tersebut membantu mengurangi jumlah sampah di lingkungan dengan mengubahnya menjadi benda baru yang bermanfaat dan menyenangkan.
C) Supaya kamar kita menjadi penuh dengan tumpukan kardus kotor.
D) Karena kardus tidak boleh disentuh anak.`,
    `[Soal 3 - PG - Tipe: HOTS]
Mobil-mobilan dari kotak susu bisa dipegang dari depan, belakang, dan atas. Itu menandakan karyanya...
A) Tiga dimensi, berbeda dari gambar rata di kertas.
B) Hanya dua dimensi seperti lukisan dinding.
C) Bukan karya seni.
D) Hanya boleh dilihat dari satu sisi.`,
    `[Soal 4 - PG - Tipe: Reguler]
Karya tiga dimensi memiliki...
A) Hanya panjang di kertas.
B) Hanya warna primer.
C) Panjang, lebar, dan volume sehingga bisa dilihat dari segala arah.
D) Hanya garis gelombang.`,
    `[Soal 5 - PG - Tipe: Reguler]
Gambar di kertas biasanya...
A) Punya isi tebal seperti balok.
B) Karya dua dimensi yang rata, paling jelas dari depan.
C) Selalu bisa dikendarai.
D) Selalu terbuat dari tutup botol.`,
    `[Soal 6 - PG - Tipe: Reguler]
Eco-art pada bab ini berarti...
A) Memanfaatkan limbah rumah tangga yang aman menjadi mainan atau figur yang indah.
B) Membuang semua kardus ke sungai.
C) Membeli mainan baru setiap hari.
D) Menumpuk sampah kotor di kamar.`,
    `[Soal 7 - PG - Tipe: Reguler]
Bahan bekas yang aman untuk mainan antara lain...
A) Pisau tajam bekas.
B) Kotak susu, botol plastik, dan kardus tisu yang bersih.
C) Pecahan kaca.
D) Obat kadaluarsa.`,
    `[Soal 8 - PG - Tipe: Reguler]
Dua tutup botol di kanan dan dua di kiri kotak susu berfungsi sebagai...
A) Atap rumah.
B) Sayap pesawat kertas.
C) Roda mobil-mobilan.
D) Warna primer.`,
    `[Soal 9 - PG - Tipe: HOTS]
Mendaur ulang kotak susu menjadi mainan melatih kita menjadi anak yang...
A) Kreatif dan peduli lingkungan.
B) Senang menumpuk sampah kotor.
C) Hanya meniru gambar rata.
D) Tidak boleh memegang balok.`,
    `[Soal 10 - PG - Tipe: Reguler]
Patung tanah liat termasuk karya...
A) Dua dimensi rata.
B) Tiga dimensi ber-volume.
C) Hanya kolase kertas.
D) Hanya cap daun.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Kotak Susu Jadi Mobil",
      pengantar:
        "Di teras rumah Nia. Ali membawa kotak susu kosong dan empat tutup botol plastik. Mereka mengubah barang bekas menjadi mainan.",
      labelDaftar: "Percakapan Ali dan Nia tentang karya tiga dimensi",
      kolom: 1,
      item: [
        {
          nama: "Jangan dibuang sembarangan",
          singkat: "Kotak masih berguna",
          uraian:
            "Ibu Ali bilang kotak susu kosong jangan dibuang sembarangan. Nia melihat bentuknya balok panjang. Dua tutup botol di kanan dan dua di kiri mengubahnya menjadi mobil-mobilan.",
          contoh: "Kotak balok. Tutup jadi roda.",
        },
        {
          nama: "Bisa dipegang segala arah",
          singkat: "Beda dari gambar",
          uraian:
            "Mobil-mobilan bisa dipegang dari depan, belakang, dan atas. Gambar di kertas hanya paling jelas dari depan karena rata.",
          contoh: "Depan, belakang, atas: bisa dilihat.",
        },
        {
          nama: "Namanya tiga dimensi",
          singkat: "Kreatif dan peduli",
          uraian:
            "Karya tiga dimensi punya ketebalan. Kita tidak hanya mendaur ulang sampah, tetapi juga melatih otak menjadi anak yang kreatif.",
          contoh: "3D: ada volume. Sampah jadi mainan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kotak susu dan tutup botol diubah menjadi mainan apa?",
          alias: ["mobil", "mobil-mobilan"],
        },
        {
          pertanyaan: "2. Karya yang bisa dilihat dari segala arah disebut apa?",
          alias: ["tiga dimensi", "3d", "trimatra"],
        },
        {
          pertanyaan: "3. Gambar di kertas biasanya hanya jelas dari arah mana?",
          alias: ["depan", "rata", "dua dimensi"],
        },
      ],
      voice: [
        [
          "Ali membawa kotak susu kosong dan empat tutup botol. Nia menempel dua tutup di kanan dan dua di kiri. Kotak balok menjadi mobil-mobilan.",
        ],
        [
          "Mobil itu bisa dipegang dari depan, belakang, dan atas. Gambar di kertas hanya rata. Inilah karya tiga dimensi. Sampah diubah, otak dilatih kreatif.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Tiga Dimensi dan Eco-Art",
      pengantar:
        "Karya 3D punya panjang, lebar, dan volume. Barang bekas yang aman menjadi mainan bernilai guna dan estetis.",
      labelDaftar: "Volume, segala arah, daur ulang P5",
      kolom: 1,
      item: [
        {
          nama: "Karya tiga dimensi",
          singkat: "Ada isi dan tebal",
          uraian:
            "Karya 3D atau trimatra memiliki panjang, lebar, dan volume. Keindahannya dinikmati dari depan, belakang, samping, maupun atas. Patung tanah liat termasuk 3D. Gambar gunung di kertas termasuk 2D.",
          contoh: "Patung: 3D. Gambar kertas: 2D.",
        },
        {
          nama: "Barang bekas aman",
          singkat: "Eco-art",
          uraian:
            "Pakai limbah rumah tangga yang bersih dan aman: kotak susu, botol plastik, kardus tisu, kotak sepatu. Hindari kaca pecah dan benda tajam.",
          contoh: "Bersih. Aman. Lalu dirakit.",
        },
        {
          nama: "Cinta lingkungan",
          singkat: "Integrasi P5",
          uraian:
            "Mengubah kardus bekas jadi rumah-rumahan mengurangi sampah dan menghasilkan benda baru yang bermanfaat. Bukan menumpuk kardus kotor di kamar.",
          contoh: "Sampah berkurang. Mainan bertambah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Karya 3D punya panjang, lebar, dan...?",
          alias: ["volume", "tebal", "ruang", "isi"],
        },
        {
          pertanyaan: "2. Gambar krayon di kertas termasuk karya berapa dimensi?",
          alias: ["dua", "2", "2d", "rata"],
        },
        {
          pertanyaan: "3. Kardus sepatu jadi rumah-rumahan membantu mengurangi apa?",
          alias: ["sampah", "limbah"],
        },
      ],
      voice: [
        [
          "Karya tiga dimensi punya panjang, lebar, dan volume. Bisa dilihat dari segala arah. Patung tanah liat adalah 3D. Gambar di kertas adalah 2D.",
        ],
        [
          "Pakai kotak susu, botol, dan kardus yang bersih. Mengubah sampah jadi mainan mengurangi limbah. Itu siswa kreatif yang cinta lingkungan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Rakit Mainan, Jaga Bumi",
      pengantar:
        "Rakit dengan lem yang aman dan dampingan orang dewasa. Cuci bahan bekas dulu. Ceritakan dari sisi depan dan belakang.",
      labelDaftar: "Latihan 3D di sekolah dan di rumah",
      kolom: 2,
      item: [
        {
          nama: "Bengkel mini",
          singkat: "Untuk guru",
          uraian:
            "Sediakan kotak dan tutup botol bersih. Siswa merakit mobil atau rumah-rumahan. Putar karya: apa yang terlihat dari belakang? Diskusikan bedanya dengan gambar rata.",
          contoh: "Rakit. Putar. Bandingkan dengan gambar.",
        },
        {
          nama: "Teras daur ulang",
          singkat: "Untuk orang tua",
          uraian:
            "Cuci kotak susu. Tempel tutup botol jadi roda. Atau kardus sepatu jadi rumah-rumahan. Tanyakan: mengapa tidak membuangnya saja?",
          contoh: "Cuci. Rakit. Ceritakan dari segala arah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tutup botol pada kotak susu berfungsi sebagai apa?",
          alias: ["roda", "mobil"],
        },
        {
          pertanyaan: "2. Sebelum merakit, kotak bekas sebaiknya...?",
          alias: ["cuci", "bersih", "aman"],
        },
        {
          pertanyaan: "3. Karya 3D bisa dilihat dari depan, belakang, samping, dan...?",
          alias: ["atas", "segala", "semua"],
        },
      ],
      voice: [
        [
          "Di sekolah, rakit kotak dan tutup botol jadi mobil atau rumah-rumahan. Putar karyanya. Apa yang terlihat dari belakang?",
        ],
        [
          "Di rumah, cuci kotak susu atau kardus sepatu. Rakit jadi mainan. Kita kurangi sampah dan jadi anak yang kreatif.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Bedakan patung tanah liat dan gambar gunung, lalu pilih alasan daur ulang kardus yang paling mencerminkan cinta lingkungan.",
      labelDaftar: "Karakteristik 3D dan sikap lingkungan",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Bentuk karya",
          uraian:
            "Patung Ali ber-volume dan bisa dilihat dari segala arah. Gambar Nia rata, dua dimensi. Bukan soal harga.",
          contoh: "Patung 3D. Gambar 2D.",
        },
        {
          nama: "Kelompok B",
          singkat: "Sikap lingkungan",
          uraian:
            "Kardus sepatu jadi rumah-rumahan dinilai kreatif dan cinta lingkungan karena mengurangi sampah serta menghasilkan benda baru yang bermanfaat. Bukan karena sekadar gratis, apalagi menumpuk kardus kotor.",
          contoh: "Sampah berkurang. Benda baru bermanfaat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Patung tanah liat termasuk karya berapa dimensi?",
          alias: ["tiga", "3", "3d", "volume"],
        },
        {
          pertanyaan: "2. Kardus jadi rumah-rumahan membantu mengurangi apa?",
          alias: ["sampah", "limbah", "lingkungan"],
        },
      ],
      voice: [
        [
          "Patung kucing dari tanah liat adalah karya tiga dimensi: ada volume, bisa dilihat dari segala arah. Gambar gunung di kertas adalah dua dimensi, rata.",
        ],
        [
          "Mengubah kardus sepatu jadi rumah-rumahan mengurangi sampah dan membuat benda baru yang bermanfaat. Itulah siswa kreatif yang cinta lingkungan.",
        ],
      ],
    },
  ],
};
