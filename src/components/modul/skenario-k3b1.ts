import type { DefSkenario } from "./skenario-umum";

/**
 * Tujuh skenario Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000). Tanpa jaringan, tanpa panggilan model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs (kalimat hitung) dan scripts/uji-lab-k3b1.mjs.
 *  - SKENARIO_K3B1A: Tongkat Alfa        (Sub-Bab A, membaca dan menulis bilangan tiga angka)
 *  - SKENARIO_K3B1B: Tiga Kaleng         (Sub-Bab B, nilai tempat)
 *  - SKENARIO_K3B1C: Jarak ke Sekolah    (Sub-Bab C, membandingkan dan mengurutkan)
 *  - SKENARIO_K3B1D: Alun-Alun           (Sub-Bab D, penjumlahan sampai 100)
 *  - SKENARIO_K3B1E: Toko Pak Bandi      (Sub-Bab E, pengurangan sampai 100)
 *  - SKENARIO_K3B1F: Kebun Melati        (Sub-Bab F, perkalian sampai 100)
 *  - SKENARIO_K3B1G: Pencapaian Bab      (Sub-Bab G, pembagian; sekaligus mengulang seluruh bab)
 */

export const SKENARIO_K3B1A: DefSkenario = {
  id: "tongkat-alfa-k3b1",
  judul: "Tongkat Alfa",
  latar: "Bantu Alfa membaca dan menulis bilangan tiga angka dari kegiatan Pramuka.",
  tokoh: "🧒",
  nama: "Alfa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Alfa. Pak Guru Pramuka memberiku tongkat sepanjang 160 sentimeter. Bantu aku membaca dan menulis bilangan, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "baca",
      jenis: "pilih",
      cerita: "Panjang tongkatku 160 sentimeter. Bagaimana cara membacanya?",
      opsi: [
        { teks: "Satu enam nol", benar: false, umpan: "Itu menyebut angkanya satu per satu. Bilangan dibaca dengan nama tempatnya: ratus, puluh, dan satuan." },
        { teks: "Seratus enam puluh", benar: true, umpan: "Betul! Satu ratusan dibaca seratus, enam puluhan dibaca enam puluh, dan nol tidak disebut." },
        { teks: "Enam ratus satu", benar: false, umpan: "Angka enam ada di tempat puluhan, bukan ratusan. Baca dari kiri, tempat demi tempat." },
      ],
    },
    {
      id: "tempat",
      jenis: "soal",
      cerita: "Sekarang kita periksa tiga hal tentang bilangan tiga angka.",
      soal: [
        { teks: "Pada 160, angka 6 ada di tempat …", jawaban: "puluhan", opsi: ["ratusan", "puluhan", "satuan"] },
        { teks: "Sepuluh puluhan ditukar menjadi …", jawaban: "satu ratusan", opsi: ["satu puluhan", "sepuluh ratusan", "satu ratusan"] },
        { teks: "Tujuh ratus tiga ditulis …", jawaban: "703", opsi: ["703", "73", "730"] },
      ],
      sukses: "Hebat! Tiga tempat dibaca dari kiri: ratusan, puluhan, satuan. Sepuluh puluhan jadi satu ratusan, dan nol menjaga tempat yang kosong.",
      salah: "Hmm, ingat: dari kanan ke kiri tempatnya satuan, puluhan, ratusan. Coba lagi pelan-pelan.",
    },
    {
      id: "hitung-batang",
      jenis: "hitung",
      cerita: "Alfa menaruh batang puluhan untuk tongkat 160. Setiap batang adalah satu puluhan.",
      tanya: "Ketuk semua batang puluhan. Ada berapa batang untuk angka 6 pada 160?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Angka 6 di tempat puluhan berarti enam batang puluhan.",
      salah: "Hmm, ketuk tiap batang satu kali, lalu hitung lagi.",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Temanku menulis empat ratus lima dengan angka 45. Apa yang kurang tepat?",
      opsi: [
        { teks: "Sudah benar, nol tidak perlu ditulis", benar: false, umpan: "Nol tidak disebut saat dibaca, tetapi tetap ditulis. Kalau tidak, 405 berubah menjadi 45." },
        { teks: "Harusnya 450", benar: false, umpan: "450 dibaca empat ratus lima puluh. Pada empat ratus lima, puluhannya kosong, bukan lima." },
        { teks: "Nol hilang, harusnya 405", benar: true, umpan: "Betul! Nol menjaga tempat puluhan yang kosong, sehingga angka 4 tetap di tempat ratusan." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai membaca dan menulis bilangan tiga angka. Tongkatku siap dipakai." },
  ],
};

export const SKENARIO_K3B1B: DefSkenario = {
  id: "tiga-kaleng-k3b1",
  judul: "Tiga Kaleng",
  latar: "Bantu Galih memahami nilai tiap angka pada kaleng kartu bilangan.",
  tokoh: "👦",
  nama: "Galih",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hai! Aku Galih. Di kamarku ada kaleng-kaleng kartu bilangan. Kaleng pertama bertuliskan 251 dan kaleng kedua 219. Bantu aku menemukan nilai tiap angkanya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "nilai",
      jenis: "soal",
      cerita: "Kaleng pertama bertuliskan 251. Angka yang sama bisa bernilai berbeda, tergantung tempatnya.",
      soal: [
        { teks: "Nilai angka 5 pada 251 adalah …", jawaban: "50", opsi: ["5", "50", "500"] },
        { teks: "Nilai angka 2 pada 251 adalah …", jawaban: "200", opsi: ["200", "20", "2"] },
        { teks: "Nilai angka 1 pada 251 adalah …", jawaban: "1", opsi: ["100", "10", "1"] },
      ],
      sukses: "Tepat! Angka di tempat ratusan dikali 100, di puluhan dikali 10, dan di satuan nilainya angka itu sendiri.",
      salah: "Hmm, lihat tempatnya dulu. Ratusan dikali 100, puluhan dikali 10, satuan apa adanya.",
    },
    {
      id: "susun",
      jenis: "pilih",
      cerita: "Aku ingin menyusun bilangan 251 dari nilai tiap angkanya. Mana yang benar?",
      opsi: [
        { teks: "2 + 5 + 1", benar: false, umpan: "Itu hanya menjumlahkan angkanya. Nilai tiap angka harus dihitung menurut tempatnya." },
        { teks: "200 + 50 + 1", benar: true, umpan: "Betul! Dua ratusan, lima puluhan, dan satu satuan membentuk 251." },
        { teks: "20 + 500 + 1", benar: false, umpan: "Nilainya tertukar. Angka 2 ada di ratusan, jadi bernilai 200, bukan 20." },
      ],
    },
    {
      id: "isi-batang",
      jenis: "isi",
      cerita: "Kaleng 251 punya 5 puluhan. Galih memasukkan batang puluhan ke keranjang.",
      objek: "stik",
      target: 5,
      maks: 10,
      sukses: "Pas! Lima batang puluhan bernilai lima puluh.",
      kurang: "Batangnya masih kurang. Angka 5 di tempat puluhan berarti lima batang.",
      lebih: "Batangnya kelebihan. Angka 5 di tempat puluhan berarti lima batang saja.",
    },
    {
      id: "tabel",
      jenis: "pilih",
      cerita: "Kaleng kedua bertuliskan 219. Tabel nilai tempat diisi apa pada kolom puluhan?",
      opsi: [
        { teks: "10", benar: false, umpan: "10 adalah nilainya. Tabel nilai tempat diisi dengan angka tiap tempat." },
        { teks: "219", benar: false, umpan: "219 adalah seluruh bilangannya. Kolom puluhan hanya diisi satu angka." },
        { teks: "1", benar: true, umpan: "Betul! Kolom puluhan diisi angka 1. Nilainya 10, dipakai saat menguraikan." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Sekarang aku tahu: angka memberi tahu banyaknya, tempat memberi tahu nilainya." },
  ],
};

export const SKENARIO_K3B1C: DefSkenario = {
  id: "jarak-sekolah-k3b1",
  judul: "Jarak ke Sekolah",
  latar: "Bantu Alen dan Galih membandingkan dan mengurutkan bilangan tiga angka.",
  tokoh: "🧑‍🎓",
  nama: "Alen",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hai! Aku Alen. Rumahku 339 meter dari sekolah. Rumah Galih 421 meter dari sekolah. Ayo kita bandingkan bilangan-bilangan ini.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "jauh",
      jenis: "pilih",
      cerita: "Siapa yang rumahnya lebih jauh, aku atau Galih?",
      opsi: [
        { teks: "Alen, karena 9 lebih dari 1", benar: false, umpan: "Kita mulai dari tempat paling kiri, yaitu ratusan, bukan dari satuan." },
        { teks: "Sama jauh", benar: false, umpan: "Ratusannya sudah berbeda, jadi bilangannya tidak sama." },
        { teks: "Galih, karena 4 ratusan lebih dari 3 ratusan", benar: true, umpan: "Betul! Ratusan dibandingkan lebih dulu. Karena ratusannya berbeda, kita langsung tahu mana yang lebih besar." },
      ],
    },
    {
      id: "banding",
      jenis: "soal",
      cerita: "Sekarang kita pakai kata yang tepat untuk dua bilangan yang ratusannya sama.",
      soal: [
        { teks: "Bandingkan 583 dan 529. Puluhan 8 dan 2, jadi 583 …", jawaban: "lebih dari", opsi: ["kurang dari", "lebih dari", "sama dengan"] },
        { teks: "Bandingkan 769 dan 761. Satuan 9 dan 1, jadi 769 …", jawaban: "lebih dari", opsi: ["lebih dari", "sama dengan", "kurang dari"] },
        { teks: "Tanda yang benar untuk 339 dan 421 adalah …", jawaban: "<", opsi: [">", "=", "<"] },
      ],
      sukses: "Hebat! Mulai dari kiri: ratusan, lalu puluhan, lalu satuan. Tanda selalu terbuka ke bilangan yang lebih besar.",
      salah: "Hmm, ingat: bandingkan dari tempat paling kiri yang berbeda. Coba lagi pelan-pelan.",
    },
    {
      id: "urut-naik",
      jenis: "pilih",
      cerita: "Kelereng kami bernomor 138, 103, dan 183. Mana urutan naik, dari yang terkecil?",
      opsi: [
        { teks: "103, 138, 183", benar: true, umpan: "Betul! Ratusannya sama. Puluhan 0, 3, 8, jadi urutannya 103, 138, 183." },
        { teks: "183, 138, 103", benar: false, umpan: "Itu urutan turun, dari yang terbesar. Urutan naik dimulai dari yang terkecil." },
        { teks: "138, 103, 183", benar: false, umpan: "103 lebih kecil dari 138, jadi 103 harus di depan. Bandingkan puluhannya." },
      ],
    },
    {
      id: "urut-turun",
      jenis: "soal",
      cerita: "Terakhir, urutan turun berarti dimulai dari yang terbesar.",
      soal: [
        { teks: "Bilangan terbesar di antara 720, 639, dan 709 adalah …", jawaban: "720", opsi: ["639", "709", "720"] },
        { teks: "Bilangan terkecil di antara 720, 639, dan 709 adalah …", jawaban: "639", opsi: ["639", "709", "720"] },
      ],
      sukses: "Tepat! Urutan turun dari yang terbesar: 720, 709, 639.",
      salah: "Hmm, bandingkan ratusannya dulu. Kalau sama, lihat puluhannya.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai membandingkan dan mengurutkan bilangan. Rumahku dan rumah Galih sudah jelas urutannya." },
  ],
};

export const SKENARIO_K3B1D: DefSkenario = {
  id: "alun-alun-k3b1",
  judul: "Alun-Alun",
  latar: "Bantu Meutia menjumlahkan banyak buku dan banyak siswa dengan susun pendek dan susun panjang.",
  tokoh: "👧",
  nama: "Meutia",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Meutia. Di perpustakaan ada 23 buku cerita dan 16 buku dongeng. Hari Senin kami upacara di alun-alun. Bantu aku menjumlahkannya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "buku",
      jenis: "soal",
      cerita: "Pertama, buku di rak perpustakaan. Jumlahkan satuan dulu, lalu puluhan.",
      soal: [
        { teks: "3 + 6 = …", jawaban: "9", opsi: ["8", "9", "10"] },
        { teks: "2 + 1 = …", jawaban: "3", opsi: ["3", "2", "4"] },
        { teks: "23 + 16 = …", jawaban: "39", opsi: ["29", "49", "39"] },
      ],
      sukses: "Hebat! Satuan 3 + 6 = 9 tidak perlu disimpan. Puluhan 2 + 1 = 3. Jadi ada 39 buku.",
      salah: "Hmm, jumlahkan satuan dulu, lalu puluhan. Coba lagi pelan-pelan.",
    },
    {
      id: "simpan",
      jenis: "pilih",
      cerita: "Di alun-alun ada 48 siswa kelas 3, lalu 16 siswa kelas 4 datang. Satuan 8 + 6 = 14. Apa yang dilakukan?",
      opsi: [
        { teks: "Tulis 14 di tempat satuan", benar: false, umpan: "Tempat satuan hanya boleh berisi satu angka. Empat belas satuan perlu ditukar sepuluh jadi satu puluhan." },
        { teks: "Tulis 4, simpan 1 puluhan", benar: true, umpan: "Betul! Sepuluh satuan ditukar satu puluhan. Tulis sisa 4, simpan 1 puluhan untuk kolom puluhan." },
        { teks: "Tulis 1, simpan 4 puluhan", benar: false, umpan: "Yang disimpan satu puluhan, bukan empat. Sisa empat satuan ditulis di tempat satuan." },
      ],
    },
    {
      id: "panjang",
      jenis: "soal",
      cerita: "Sekarang susun panjang. Urai dulu, lalu jumlahkan puluhan dan satuan terpisah.",
      soal: [
        { teks: "50 + 20 = …", jawaban: "70", opsi: ["60", "80", "70"] },
        { teks: "4 + 9 = …", jawaban: "13", opsi: ["13", "12", "14"] },
        { teks: "70 + 13 = …", jawaban: "83", opsi: ["73", "83", "93"] },
      ],
      sukses: "Tepat! 54 + 29 dengan susun panjang menjadi 70 + 13 = 83. Hasilnya sama dengan susun pendek.",
      salah: "Hmm, jumlahkan puluhan dengan puluhan dan satuan dengan satuan. Lalu gabungkan.",
    },
    {
      id: "cerita",
      jenis: "pilih",
      cerita: "Di alun-alun ada 48 siswa kelas 3 dan 16 siswa kelas 4. Mana kalimat matematika yang cocok untuk jumlah semuanya?",
      opsi: [
        { teks: "48 − 16 = 32", benar: false, umpan: "Kita menggabungkan dua kelompok, jadi memakai penjumlahan, bukan pengurangan." },
        { teks: "48 + 16 = 64", benar: true, umpan: "Betul! Dua kelompok digabung dengan penjumlahan. Jadi ada 64 siswa di alun-alun." },
        { teks: "48 + 16 = 54", benar: false, umpan: "Kalimatnya sudah benar, tetapi hasilnya keliru. Ingat 8 + 6 = 14, jadi ada simpanan satu puluhan." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Upacara jadi rapi karena kita sudah menghitung semua dengan benar." },
  ],
};

export const SKENARIO_K3B1E: DefSkenario = {
  id: "toko-bandi-k3b1",
  judul: "Toko Pak Bandi",
  latar: "Bantu Pak Bandi mengurangkan barang di tokonya dan memeriksa hasilnya dengan penjumlahan.",
  tokoh: "👨‍🌾",
  nama: "Pak Bandi",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Pak Bandi, pemilik toko. Pagi ini aku punya 45 buku tulis, dan terjual 19. Bantu aku menghitung sisanya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "permen",
      jenis: "soal",
      cerita: "Mulai dari yang mudah dulu: toples permen Galih. Kurangi satuan dulu, lalu puluhan.",
      soal: [
        { teks: "5 − 2 = …", jawaban: "3", opsi: ["3", "7", "4"] },
        { teks: "2 − 1 = …", jawaban: "1", opsi: ["2", "0", "1"] },
        { teks: "25 − 12 = …", jawaban: "13", opsi: ["12", "14", "13"] },
      ],
      sukses: "Hebat! Satuan 5 cukup untuk dikurangi 2, jadi tidak perlu mengambil puluhan. Sisanya 13.",
      salah: "Hmm, kurangi satuan dulu, lalu puluhan. Coba lagi pelan-pelan.",
    },
    {
      id: "ambil",
      jenis: "pilih",
      cerita: "Sekarang buku tulis: 45 − 19. Satuan 5 lebih kecil dari 9. Apa langkahnya?",
      opsi: [
        { teks: "Tukar 5 dan 9 supaya 9 − 5", benar: false, umpan: "Angka satuan tidak boleh ditukar. Itu mengubah soalnya." },
        { teks: "Kurangi 5 dari 9 saja", benar: false, umpan: "Pengurangan memakai bilangan atas dikurangi bilangan bawah, bukan sebaliknya." },
        { teks: "Ambil 1 puluhan, satuan menjadi 15", benar: true, umpan: "Betul! Satu puluhan menjadi sepuluh satuan, jadi 5 menjadi 15. Lalu 15 − 9 = 6." },
      ],
    },
    {
      id: "hasil",
      jenis: "soal",
      cerita: "Setelah mengambil, puluhan atas tinggal tiga. Ayo selesaikan.",
      soal: [
        { teks: "15 − 9 = …", jawaban: "6", opsi: ["6", "5", "7"] },
        { teks: "3 − 1 = …", jawaban: "2", opsi: ["1", "3", "2"] },
        { teks: "45 − 19 = …", jawaban: "26", opsi: ["36", "26", "24"] },
      ],
      sukses: "Tepat! Sisa buku tulis Pak Bandi ada 26.",
      salah: "Hmm, setelah satu puluhan diambil, puluhan atas berkurang satu. Coba lagi.",
    },
    {
      id: "periksa",
      jenis: "pilih",
      cerita: "Aku ingin memastikan 45 − 19 = 26 itu benar. Bagaimana cara memeriksanya?",
      opsi: [
        { teks: "26 + 19 = 45", benar: true, umpan: "Betul! Hasil ditambah bilangan pengurang harus kembali ke bilangan awal, yaitu 45." },
        { teks: "26 − 19 = 7", benar: false, umpan: "Itu mengurangi lagi, bukan memeriksa. Periksa dengan operasi kebalikannya, yaitu penjumlahan." },
        { teks: "45 + 19 = 64", benar: false, umpan: "Itu menambah bilangan awal. Yang ditambah seharusnya hasilnya, bukan bilangan awal." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Tokoku jadi rapi karena hitunganku sudah diperiksa." },
  ],
};

export const SKENARIO_K3B1F: DefSkenario = {
  id: "kebun-melati-k3b1",
  judul: "Kebun Melati",
  latar: "Bantu Meutia memahami perkalian sebagai kelompok yang sama banyak.",
  tokoh: "👧",
  nama: "Meutia",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Meutia. Di kebun melati ada 4 pot, dan tiap pot berisi 5 bunga. Bantu aku menghitung semua bunganya dengan cara singkat, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kalimat",
      jenis: "pilih",
      cerita: "Ada 4 kelompok bunga, tiap kelompok berisi 5. Mana kalimat perkalian yang cocok?",
      opsi: [
        { teks: "4 × 5 = 20", benar: true, umpan: "Betul! Empat kelompok berisi lima sama dengan 5 + 5 + 5 + 5 = 20." },
        { teks: "4 + 5 = 9", benar: false, umpan: "Itu menjumlahkan banyak kelompok dengan isinya. Kita ingin menjumlahkan lima sebanyak empat kali." },
        { teks: "4 × 5 = 9", benar: false, umpan: "Kalimatnya sudah benar, tetapi hasilnya keliru. Tambahkan 5 sebanyak 4 kali." },
      ],
    },
    {
      id: "hitung-kali",
      jenis: "soal",
      cerita: "Sekarang hitung beberapa kelompok lain. Ingat: banyak kelompok dikali isi tiap kelompok.",
      soal: [
        { teks: "5 × 2 = …", jawaban: "10", opsi: ["7", "10", "12"] },
        { teks: "3 × 7 = …", jawaban: "21", opsi: ["21", "10", "24"] },
        { teks: "4 × 7 = …", jawaban: "28", opsi: ["28", "11", "35"] },
      ],
      sukses: "Hebat! Perkalian adalah cara singkat penjumlahan berulang.",
      salah: "Hmm, tambahkan isi kelompok berulang kali sebanyak kelompoknya. Coba lagi.",
    },
    {
      id: "isi-piring",
      jenis: "isi",
      cerita: "Satu piring berisi 5 jeruk. Isi satu piring dengan jeruk sampai pas lima.",
      objek: "jeruk",
      target: 5,
      maks: 10,
      sukses: "Pas! Satu kelompok isi lima jeruk. Tiga piring berarti 5 + 5 + 5 = 15 jeruk.",
      kurang: "Jeruknya masih kurang. Satu piring harus berisi lima.",
      lebih: "Jeruknya kelebihan. Satu piring berisi lima saja.",
    },
    {
      id: "tukar",
      jenis: "pilih",
      cerita: "Alen punya 5 baris mobil, tiap baris berisi 6 mobil. Berapa hasilnya jika dibalik: 6 baris, tiap baris 5 mobil?",
      opsi: [
        { teks: "Hasilnya lebih banyak", benar: false, umpan: "Jumlah mobilnya tetap. Hanya susunan barisnya yang berbeda." },
        { teks: "Hasilnya sama, 30 mobil", benar: true, umpan: "Betul! 5 × 6 = 30 dan 6 × 5 = 30. Menukar tempat tidak mengubah hasil perkalian." },
        { teks: "Hasilnya lebih sedikit", benar: false, umpan: "Jumlah mobilnya tetap. Hanya susunan barisnya yang berbeda." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kebun melatiku sudah terhitung semua. Perkalian membuat menghitung jadi cepat." },
  ],
};

export const SKENARIO_K3B1G: DefSkenario = {
  id: "pencapaian-bab-k3b1",
  judul: "Pencapaian Bab: Pesta Alfa",
  latar: "Pesta di rumah Alfa. Pakai semua yang sudah kamu pelajari: nilai tempat, tambah, kurang, kali, dan bagi.",
  tokoh: "🧒",
  nama: "Alfa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hai! Aku Alfa. Hari ini aku mengadakan pesta kecil. Tolong bantu aku mengatur semuanya dengan bilangan, ya. Kita pakai semua yang sudah kita pelajari.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "campur",
      jenis: "soal",
      cerita: "Pertama, kupon pesta bertuliskan 703. Lalu kita menghitung kue dan permen.",
      soal: [
        { teks: "Pada 703, nilai angka 7 adalah …", jawaban: "700", opsi: ["7", "70", "700"] },
        { teks: "54 + 29 = …", jawaban: "83", opsi: ["83", "73", "93"] },
        { teks: "45 − 19 = …", jawaban: "26", opsi: ["24", "26", "36"] },
      ],
      sukses: "Hebat! Nilai tempat, penjumlahan, dan pengurangan sudah kamu kuasai.",
      salah: "Hmm, ingat nilai tempat dan simpan atau ambil puluhan. Coba lagi pelan-pelan.",
    },
    {
      id: "hitung-jeruk",
      jenis: "hitung",
      cerita: "Ibu menaruh jeruk di piring besar. Alfa mau membaginya sama banyak untuk tiga teman.",
      tanya: "Ketuk semua jeruknya. Ada berapa jeruk?",
      objek: "jeruk",
      jumlah: 15,
      sukses: "Betul! Ada 15 jeruk untuk dibagi kepada tiga teman.",
      salah: "Hmm, ketuk tiap jeruk satu kali, lalu hitung lagi pelan-pelan.",
    },
    {
      id: "bagi",
      jenis: "pilih",
      cerita: "15 jeruk dibagi sama banyak untuk 3 teman. Mana kalimat pembagian yang benar?",
      opsi: [
        { teks: "15 : 5 = 3", benar: false, umpan: "Kalimatnya benar secara hitungan, tetapi artinya membagi ke 5 teman. Kita membagi ke 3 teman." },
        { teks: "15 − 3 = 12", benar: false, umpan: "Itu mengurangi sekali saja. Pembagian mengurangi berulang sampai habis." },
        { teks: "15 : 3 = 5", benar: true, umpan: "Betul! Lima belas dibagi tiga sama dengan lima. Tiap teman mendapat 5 jeruk." },
      ],
    },
    {
      id: "isi-bagian",
      jenis: "isi",
      cerita: "Tiap teman mendapat bagian yang sama. Isi satu piring teman dengan jumlah jeruk yang benar.",
      objek: "jeruk",
      target: 5,
      maks: 10,
      sukses: "Pas! Satu teman mendapat 5 jeruk, dan 5 × 3 = 15.",
      kurang: "Jeruknya masih kurang. Hasil bagi 15 : 3 adalah 5.",
      lebih: "Jeruknya kelebihan. Hasil bagi 15 : 3 adalah 5.",
    },
    {
      id: "kali-bagi",
      jenis: "soal",
      cerita: "Pembagian dan perkalian saling berkaitan. Ayo periksa beberapa kalimat.",
      soal: [
        { teks: "5 × 6 = …", jawaban: "30", opsi: ["11", "35", "30"] },
        { teks: "28 : 7 = …", jawaban: "4", opsi: ["4", "21", "35"] },
        { teks: "12 : 2 = …", jawaban: "6", opsi: ["10", "6", "14"] },
      ],
      sukses: "Tepat! Hasil bagi dikali pembagi kembali ke bilangan awal, jadi 6 × 2 = 12.",
      salah: "Hmm, periksa dengan perkalian kebalikannya. Coba lagi pelan-pelan.",
    },
    {
      id: "sisa",
      jenis: "pilih",
      cerita: "Ada 13 kelereng dibagi sama banyak untuk 4 anak. Tiap anak dapat 3, dan tersisa 1. Pernyataan mana yang jujur?",
      opsi: [
        { teks: "13 habis dibagi 4", benar: false, umpan: "Habis dibagi artinya tidak ada sisa. Di sini masih tersisa satu kelereng." },
        { teks: "13 tidak habis dibagi 4, tersisa 1", benar: true, umpan: "Betul! Tiga kali empat sama dengan dua belas, jadi masih tersisa satu. Itu bukan habis dibagi." },
        { teks: "Tiap anak dapat 4", benar: false, umpan: "Empat kali empat sama dengan enam belas, lebih banyak dari tiga belas kelereng." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Pestaku jadi meriah. Kamu sudah menguasai bilangan sampai 1.000, tambah, kurang, kali, dan bagi." },
  ],
};
