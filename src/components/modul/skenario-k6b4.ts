import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 4 (Peluang). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b4.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B4A: Dhien dan Poster Lomba (Qualitative Probability Language, Likelihood Spectrum Scale, Impossible-Certain Continuum, dan Experimental Relative Frequency)
 *  - SKENARIO_K6B4B: Dhien dan Kotak Hadiah (Favorable-to-Total Ratio, Comparative Probability Ratio, Relative Likelihood Decision, dan Fair Game Equal Chance Principle)
 */

export const SKENARIO_K6B4A: DefSkenario = {
  id: "dhien-poster-k6b4",
  judul: "Dhien dan Poster Lomba",
  latar: "Bantu Dhien menempatkan kejadian di tangga peluang dan menguji prediksinya dengan percobaan.",
  tokoh: "👧",
  nama: "Dhien",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Dhien. Aku melihat poster lomba menyanyi, tetapi aku takut peluangku nol. Benarkah nol? Setiap hari kita membuat prediksi, misalnya membawa payung karena hujan mungkin turun. Ayo kita tempatkan kejadian di tangga peluang, dari tidak mungkin sampai pasti!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "bahasa",
      jenis: "pilih",
      cerita: "Qualitative Probability Language: kita memakai kata kurang mungkin, mungkin, dan sangat mungkin untuk membuat prediksi. Aku bilang peluang menangku nol. Kapan peluang benar-benar nol, yaitu tidak mungkin?",
      opsi: [
        { teks: "Bila aku merasa takut sekali", benar: false, umpan: "Rasa takut bukan bukti. Tidak mungkin berarti kejadian itu tidak punya cara untuk terjadi." },
        { teks: "Bila tidak ada satu pun cara kejadian itu terjadi", benar: true, umpan: "Betul! Nol berarti tidak mungkin: tidak ada satu pun yang cocok, misalnya bola hijau di tas yang tidak berisi bola hijau." },
        { teks: "Bila kejadian itu jarang terjadi", benar: false, umpan: "Jarang terjadi berarti kurang mungkin, bukan tidak mungkin. Tidak mungkin berarti nol cara." },
      ],
    },
    {
      id: "rak",
      jenis: "soal",
      cerita: "Likelihood Spectrum Scale: ada lima tangga, yaitu tidak mungkin, kurang mungkin, mungkin, sangat mungkin, dan pasti. Rak bukuku berisi 3 buku putih, 6 buku merah, dan 1 buku kuning. Aku mengambil satu buku tanpa melihat.",
      soal: [
        { teks: "Semua buku di rak ada … buku.", jawaban: "10", opsi: ["9", "10", "6"] },
        { teks: "Mengambil buku merah, 6 dari 10, itu …", jawaban: "Sangat mungkin", opsi: ["Kurang mungkin", "Mungkin", "Sangat mungkin"] },
        { teks: "Mengambil buku kuning, 1 dari 10, itu …", jawaban: "Kurang mungkin", opsi: ["Kurang mungkin", "Tidak mungkin", "Mungkin"] },
      ],
      sukses: "Betul! Buku merah 6 dari 10 sangat mungkin, buku kuning 1 dari 10 kurang mungkin. Buku hijau 0 dari 10 tidak mungkin.",
      salah: "Hmm, hitung dulu yang cocok dan semua yang ada. Lalu lihat dua kali yang cocok, apakah kurang dari, sama dengan, atau lebih dari semua yang ada.",
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Kutandai tiap buku merah dengan satu stik, supaya tidak ada yang terlewat.",
      tanya: "Ketuk semua stik. Ada berapa buku merah?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Ada 6 buku merah dari 10 buku.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu buku merah, lalu hitung lagi.",
    },
    {
      id: "ujung",
      jenis: "isi",
      cerita: "Impossible-Certain Continuum: ujung kiri tidak mungkin, ujung kanan pasti. Tas bolaku berisi 10 bola, 4 di antaranya merah. Agar bola merah pasti, semua bola harus merah. Masukkan satu stik untuk tiap bola biru yang diganti menjadi merah.",
      objek: "stik",
      target: 6,
      maks: 12,
      sukses: "Betul! Ada 6 bola biru yang diganti, jadi 10 dari 10 bola merah: pasti.",
      kurang: "Penggantinya masih kurang. Tambah lagi sampai semua bola biru terganti.",
      lebih: "Penggantinya kelebihan. Kurangi sampai pas dengan bola biru yang ada.",
    },
    {
      id: "percobaan",
      jenis: "pilih",
      cerita: "Experimental Relative Frequency: peluang bisa diuji dengan percobaan. Roda putarku punya 8 juring sama besar: 1 juring kuning dan 7 juring hijau. Sebelum memutar roda, apa yang sebaiknya kulakukan?",
      opsi: [
        { teks: "Buat prediksi tangga dulu, lalu catat hasil putaran dan cocokkan", benar: true, umpan: "Betul! Prediksi dibuat sebelum ada data, lalu catatan percobaan dicocokkan dengan prediksi itu." },
        { teks: "Putar sekali saja lalu yakin hasilnya pasti", benar: false, umpan: "Satu putaran terlalu sedikit untuk yakin. Hasilnya bisa menyimpang dari prediksi." },
        { teks: "Abaikan prediksi dan hapus catatan", benar: false, umpan: "Prediksi dan catatan justru saling menguji. Jangan dibuang." },
      ],
    },
    {
      id: "catatan",
      jenis: "soal",
      cerita: "Prediksiku: 1 juring kuning dari 8 itu kurang mungkin. Lalu aku memutar roda dan mencatat hasilnya.",
      soal: [
        { teks: "Diputar 4 kali, kuning muncul 2 kali. Catatan itu …", jawaban: "Mungkin", opsi: ["Kurang mungkin", "Mungkin", "Sangat mungkin"] },
        { teks: "Diputar 20 kali, kuning muncul 3 kali. Catatan itu …", jawaban: "Kurang mungkin", opsi: ["Sangat mungkin", "Mungkin", "Kurang mungkin"] },
        { teks: "Makin banyak putaran, catatan biasanya …", jawaban: "makin dekat dengan prediksi", opsi: ["makin dekat dengan prediksi", "makin jauh dari prediksi", "selalu sama dengan prediksi"] },
      ],
      sukses: "Betul! Empat putaran: 2 dari 4, mungkin. Dua puluh putaran: 3 dari 20, kurang mungkin, cocok dengan prediksi. Makin banyak percobaan, catatan makin dekat dengan prediksi.",
      salah: "Hmm, hitung dua kali yang muncul, lalu lihat apakah kurang dari, sama dengan, atau lebih dari banyak putaran.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Qualitative Probability Language: kata kurang mungkin, mungkin, dan sangat mungkin membantu prediksi. Likelihood Spectrum Scale: ada lima tangga dari tidak mungkin sampai pasti. Impossible-Certain Continuum: ujung kiri nol, ujung kanan semuanya. Experimental Relative Frequency: catat hasil percobaan dan cocokkan dengan prediksi.",
    },
  ],
};

export const SKENARIO_K6B4B: DefSkenario = {
  id: "dhien-hadiah-k6b4",
  judul: "Dhien dan Kotak Hadiah",
  latar: "Bantu Dhien menghitung dan membandingkan peluang, lalu menilai apakah permainan adil.",
  tokoh: "👧",
  nama: "Dhien",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Dhien. Di lomba menyanyi ada 12 peserta SD, 35 peserta SMP, dan 27 peserta SMA. Di kategori mana peluangku menang lebih besar? Ayo kita hitung peluang dari hasil menguntungkan dan semua hasil, lalu kita bandingkan dan putuskan dengan bijak!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "rasio",
      jenis: "pilih",
      cerita: "Favorable-to-Total Ratio: peluang adalah hasil menguntungkan dibanding semua hasil yang mungkin. Aku melempar dadu enam sisi dan ingin muncul angka 6. Bagaimana peluangnya ditulis?",
      opsi: [
        { teks: "6 dari 1", benar: false, umpan: "Terbalik. Hasil menguntungkan ditulis lebih dulu, yaitu hanya satu sisi angka 6." },
        { teks: "1 dari 5", benar: false, umpan: "Semua hasil mencakup enam sisi dadu, bukan lima. Angka 6 juga termasuk." },
        { teks: "1 dari 6", benar: true, umpan: "Betul! Satu sisi angka 6 dari enam sisi dadu, ditulis 1/6." },
      ],
    },
    {
      id: "kotak",
      jenis: "soal",
      cerita: "Kotak Mantap berisi 7 piring: 4 piring biru dan 3 piring putih. Aku mengambil satu piring tanpa melihat dan berharap mendapat yang biru.",
      soal: [
        { teks: "Hasil menguntungkan, yaitu piring biru, ada … piring.", jawaban: "4", opsi: ["3", "7", "4"] },
        { teks: "Semua hasil yang mungkin ada … piring.", jawaban: "7", opsi: ["7", "4", "3"] },
        { teks: "Peluang mendapat piring biru ditulis …", jawaban: "4/7", opsi: ["3/7", "4/7", "7/4"] },
      ],
      sukses: "Betul! Peluang piring biru dari kotak Mantap adalah 4 dari 7, ditulis 4/7. Masih ada 3 piring putih, jadi peluang besar belum berarti pasti.",
      salah: "Hmm, hitung dulu piring biru, lalu semua piring. Peluang ditulis hasil menguntungkan per semua hasil.",
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Tiap piring biru di kotak Mantap kutandai dengan satu stik, supaya tidak ada yang terlewat.",
      tanya: "Ketuk semua stik. Ada berapa piring biru di kotak Mantap?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ada 4 piring biru dari 7 piring.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu piring biru, lalu hitung lagi.",
    },
    {
      id: "samakan",
      jenis: "isi",
      cerita: "Comparative Probability Ratio: samakan total sebelum membandingkan. Koin gambar 1 dari 2, dadu angka 6 1 dari 6. Total bersama paling kecil adalah 6, jadi koin gambar menjadi … dari 6. Masukkan satu stik untuk tiap hasil menguntungkan koin pada total 6.",
      objek: "stik",
      target: 3,
      maks: 12,
      sukses: "Betul! 1 dari 2 sama dengan 3 dari 6, karena 1 × 3 = 3. Dadu tetap 1 dari 6, jadi koin 3 lebih banyak dari dadu 1: koin lebih mungkin.",
      kurang: "Stiknya masih kurang. Kalikan hasil menguntungkan koin dengan faktor yang mengubah 2 menjadi 6.",
      lebih: "Stiknya kelebihan. Kurangi sampai pas dengan hasil menguntungkan koin pada total 6.",
    },
    {
      id: "putusan",
      jenis: "soal",
      cerita: "Relative Likelihood Decision: pilih yang peluangnya relatif lebih besar, tetapi ingat belum pasti menang. Kotak Mantap 4 dari 7, kotak Spektakuler 3 dari 7, dan aku ingin piring biru.",
      soal: [
        { teks: "Kotak yang lebih mungkin memberi piring biru adalah …", jawaban: "Mantap", opsi: ["Spektakuler", "Mantap", "Sama saja"] },
        { teks: "Koin gambar 1 dari 2 dan dadu angka 6 1 dari 6. Yang lebih mungkin adalah …", jawaban: "Koin gambar", opsi: ["Koin gambar", "Dadu angka 6", "Sama saja"] },
        { teks: "Peluang yang lebih besar berarti …", jawaban: "lebih mungkin, belum pasti menang", opsi: ["pasti menang", "tidak mungkin kalah", "lebih mungkin, belum pasti menang"] },
      ],
      sukses: "Betul! Mantap 4 dari 7 lebih besar dari Spektakuler 3 dari 7, dan koin lebih mungkin dari dadu. Tetapi peluang besar belum pasti: masih ada 3 piring putih di kotak Mantap.",
      salah: "Hmm, samakan dulu totalnya, lalu lihat hasil menguntungkan yang lebih banyak. Ingat, peluang besar belum pasti terjadi.",
    },
    {
      id: "adil",
      jenis: "pilih",
      cerita: "Fair Game Equal Chance Principle: permainan adil bila peluang tiap pemain sama. Dengan dadu enam sisi, aku menang bila muncul 6 dan Tigor menang bila muncul 1 sampai 5. Apakah permainan ini adil?",
      opsi: [
        { teks: "Kurang adil, Tigor punya 5 hasil dan aku hanya 1", benar: true, umpan: "Betul! Peluangku 1 dari 6 dan peluang Tigor 5 dari 6. Peluang tidak sama, jadi kurang adil." },
        { teks: "Adil, karena keduanya memakai dadu yang sama", benar: false, umpan: "Dadunya sama, tetapi syarat menangnya beda. Yang dibandingkan adalah peluang tiap pemain." },
        { teks: "Adil, karena aku melempar lebih dulu", benar: false, umpan: "Giliran melempar tidak mengubah peluang. Hitung hasil menang tiap pemain." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Favorable-to-Total Ratio: peluang adalah hasil menguntungkan per semua hasil. Comparative Probability Ratio: samakan total, lalu bandingkan hasil menguntungkannya. Relative Likelihood Decision: pilih yang lebih besar, tetapi belum pasti menang. Fair Game Equal Chance Principle: permainan adil bila peluang tiap pemain sama.",
    },
  ],
};
