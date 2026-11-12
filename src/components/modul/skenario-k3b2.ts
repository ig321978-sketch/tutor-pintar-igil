import type { DefSkenario } from "./skenario-umum";

/**
 * Dua skenario Kelas 3 Bab 2 (Kalimat Matematika). Tanpa jaringan, tanpa panggilan model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k3b2.mjs.
 *  - SKENARIO_K3B2A: Buku Perpustakaan Rani (Sub-Bab A, kalimat penjumlahan dan banyak kemungkinan)
 *  - SKENARIO_K3B2B: Pasar Pak Slamet       (Sub-Bab B, kalimat pengurangan; sekaligus mengulang penjumlahan)
 */

export const SKENARIO_K3B2A: DefSkenario = {
  id: "buku-rani-k3b2",
  judul: "Buku Perpustakaan Rani",
  latar: "Bantu Rani menulis kalimat Matematika dan mencari bilangan yang belum diketahui.",
  tokoh: "🧒",
  nama: "Rani",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Rani. Di perpustakaan sekolah ada cerita yang belum lengkap angkanya. Bantu aku menulis kalimat Matematika dan mengisi titik-titiknya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tulis",
      jenis: "pilih",
      cerita: "Di meja ada sejumlah buku. Aku menambah 5 buku lagi, sehingga jumlahnya 17. Bagaimana kalimat Matematikanya?",
      opsi: [
        { teks: "17 + 5 = …", benar: false, umpan: "Di sini 17 adalah jumlahnya, jadi letaknya di kanan tanda sama dengan. Yang belum diketahui adalah banyak buku semula." },
        { teks: "… + 5 = 17", benar: true, umpan: "Betul! Banyak buku semula belum diketahui, jadi ditulis titik-titik. Jumlahnya 17 ada di kanan tanda sama dengan." },
        { teks: "… − 5 = 17", benar: false, umpan: "Buku ditambah, bukan dikurangi. Tanda yang cocok adalah tambah." },
      ],
    },
    {
      id: "cari",
      jenis: "soal",
      cerita: "Sekarang kita cari dan periksa bilangan yang belum diketahui.",
      soal: [
        { teks: "Pada … + 5 = 17, bilangan yang belum diketahui dicari dengan …", jawaban: "17 − 5", opsi: ["17 + 5", "17 − 5", "5 − 17"] },
        { teks: "Pada 30 + … = 50, bilangan yang belum diketahui adalah …", jawaban: "20", opsi: ["80", "20", "10"] },
        { teks: "Memeriksa jawaban: 30 + 20 = …", jawaban: "50", opsi: ["50", "10", "60"] },
      ],
      sukses: "Hebat! Jumlah dikurangi bilangan yang diketahui, lalu diperiksa dengan menjumlahkan lagi hasilnya.",
      salah: "Hmm, ingat: jumlahnya dikurangi bilangan yang diketahui. Lalu periksa dengan menjumlahkan. Coba lagi.",
    },
    {
      id: "hitung-kelereng",
      jenis: "hitung",
      cerita: "Galih membeli 5 kelereng lagi, sehingga jumlahnya 17. Di rumah Galih ada sejumlah kelereng, dan kita sudah mencarinya.",
      tanya: "Ketuk semua kelereng yang disimpan di rumah. Ada berapa?",
      objek: "kelereng-merah",
      jumlah: 12,
      sukses: "Betul! 12 kelereng di rumah, ditambah 5 yang dibeli, jumlahnya 17.",
      salah: "Hmm, ketuk tiap kelereng satu kali, lalu hitung lagi.",
    },
    {
      id: "banyak",
      jenis: "pilih",
      cerita: "Perpustakaan punya 100 buku. Ada yang dipinjam dan ada yang tersisa. Pasangan mana yang cocok untuk dipinjam dan tersisa?",
      opsi: [
        { teks: "75 dan 25", benar: true, umpan: "Betul! 75 + 25 = 100. Tetapi jawabannya tidak hanya satu. Misalnya 60 dan 40 juga cocok." },
        { teks: "60 dan 30", benar: false, umpan: "60 + 30 = 90, belum sama dengan 100. Jumlah kedua bagian harus tepat 100." },
        { teks: "50 dan 40", benar: false, umpan: "50 + 40 = 90, belum sama dengan 100. Jumlah kedua bagian harus tepat 100." },
      ],
    },
    {
      id: "isi-kantong",
      jenis: "isi",
      cerita: "Kalimatnya 8 + … = 19. Isi kantong dengan kelereng sebanyak bilangan yang belum diketahui.",
      objek: "kelereng-kuning",
      target: 11,
      maks: 20,
      sukses: "Pas! 19 − 8 = 11, dan 8 + 11 memang sama dengan 19.",
      kurang: "Kelerengnya masih kurang. Hitung dulu 19 − 8.",
      lebih: "Kelerengnya kelebihan. Hitung dulu 19 − 8.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai mengisi titik-titik pada kalimat Matematika penjumlahan. Ingat: cari dengan mengurangkan, lalu periksa dengan menjumlahkan." },
  ],
};

export const SKENARIO_K3B2B: DefSkenario = {
  id: "pasar-slamet-k3b2",
  judul: "Pasar Pak Slamet",
  latar: "Bantu Pak Slamet menulis dan mengisi kalimat Matematika pengurangan di pasar.",
  tokoh: "👨‍🌾",
  nama: "Pak Slamet",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Selamat datang! Aku Pak Slamet. Hari ini aku menjual ayam, telur, dan mainan di pasar. Bantu aku mengisi kalimat Matematika pengurangan, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tulis",
      jenis: "pilih",
      cerita: "Aku punya 80 ekor ayam. Sebagian dijual ke pasar dan tersisa 45 ekor. Bagaimana kalimat Matematikanya?",
      opsi: [
        { teks: "… − 80 = 45", benar: false, umpan: "Bilangan awal harus ada di depan. Yang belum diketahui adalah ayam yang dijual, jadi titik-titik ada di tengah." },
        { teks: "80 + … = 45", benar: false, umpan: "Ayamnya berkurang, bukan bertambah. Tanda yang cocok adalah kurang." },
        { teks: "80 − … = 45", benar: true, umpan: "Betul! 80 adalah bilangan awal, titik-titik ayam yang dijual, dan 45 adalah sisanya." },
      ],
    },
    {
      id: "cari",
      jenis: "soal",
      cerita: "Sekarang kita cari bilangan yang belum diketahui. Pengurangan punya dua cara, tergantung letak titik-titiknya.",
      soal: [
        { teks: "Pada 80 − … = 45, bilangan yang dikurangkan dicari dengan …", jawaban: "80 − 45", opsi: ["45 − 80", "80 + 45", "80 − 45"] },
        { teks: "Pada … − 45 = 27, bilangan awal dicari dengan …", jawaban: "45 + 27", opsi: ["45 − 27", "45 + 27", "27 − 45"] },
        { teks: "Memeriksa jawaban: 72 − 45 = …", jawaban: "27", opsi: ["18", "27", "72"] },
      ],
      sukses: "Tepat! Titik-titik di tengah: kurangkan. Titik-titik di depan: tambahkan. Lalu periksa dengan mengurangkan lagi.",
      salah: "Hmm, lihat dulu letak titik-titiknya. Di tengah: awal dikurangi sisa. Di depan: dikurangkan ditambah sisa.",
    },
    {
      id: "tukar",
      jenis: "pilih",
      cerita: "Temanku menulis 35 − 80 untuk ayam yang dijual, supaya terlihat sama dengan 80 − 35. Apa yang kurang tepat?",
      opsi: [
        { teks: "Tidak ada yang salah, pengurangan boleh ditukar", benar: false, umpan: "Pengurangan tidak boleh ditukar tempat. 80 − 35 = 45, tetapi 35 − 80 tidak bisa dihitung karena hasilnya di bawah nol." },
        { teks: "Bilangan awal harus tetap di depan", benar: true, umpan: "Betul! Penjumlahan boleh ditukar tempat, tetapi pengurangan tidak. Bilangan awal selalu di depan." },
        { teks: "Harus diganti dengan tanda tambah", benar: false, umpan: "Ayamnya berkurang, jadi tandanya tetap kurang. Yang salah adalah urutan bilangannya." },
      ],
    },
    {
      id: "hitung-sisa",
      jenis: "hitung",
      cerita: "Di kandang kecil ada 24 ekor ayam. Sebanyak 15 ekor dijual, jadi 24 − 15 ekor tersisa.",
      tanya: "Ketuk semua ayam yang tersisa di kandang. Ada berapa?",
      objek: "ayam",
      jumlah: 9,
      sukses: "Betul! 24 − 15 = 9, jadi tersisa 9 ekor ayam.",
      salah: "Hmm, hitung dulu 24 − 15, lalu ketuk ayamnya satu per satu.",
    },
    {
      id: "telur",
      jenis: "pilih",
      cerita: "Aku punya 100 butir telur. Sebagian terjual, sisanya masih di keranjang. Pasangan mana yang cocok untuk terjual dan sisa?",
      opsi: [
        { teks: "45 terjual dan 65 sisa", benar: false, umpan: "45 + 65 = 110, lebih dari 100. Terjual ditambah sisa harus tepat 100." },
        { teks: "60 terjual dan 50 sisa", benar: false, umpan: "60 + 50 = 110, lebih dari 100. Terjual ditambah sisa harus tepat 100." },
        { teks: "45 terjual dan 55 sisa", benar: true, umpan: "Betul! 100 − 45 = 55. Tetapi bukan satu-satunya: 60 terjual dan 40 sisa juga cocok." },
      ],
    },
    {
      id: "isi-mobil",
      jenis: "isi",
      cerita: "Toko punya 40 mobil mainan dan 25 sudah terjual. Kalimatnya 40 − 25 = …. Isi keranjang dengan mobil sebanyak sisanya.",
      objek: "mobil",
      target: 15,
      maks: 20,
      sukses: "Pas! 40 − 25 = 15. Periksa: 15 + 25 = 40.",
      kurang: "Mobilnya masih kurang. Hitung dulu 40 − 25.",
      lebih: "Mobilnya kelebihan. Hitung dulu 40 − 25.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai mengisi kalimat Matematika, baik penjumlahan maupun pengurangan. Ingat: lihat letak titik-titik, cari dengan operasi kebalikan, lalu periksa." },
  ],
};
