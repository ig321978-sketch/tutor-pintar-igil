import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 5 (Luas Daerah Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b5.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B5A: Ubin Alun-Alun (luas sebagai banyak petak satuan, baris dan kolom, petak dipindah luas tetap)
 *  - SKENARIO_K5B5B: Taman Bentuk-Bentuk (alas kali tinggi, tinggi bukan sisi miring, setengah, trapesium)
 *  - SKENARIO_K5B5C: Denah Yohana dan Komang (bangun gabungan: urai, jumlahkan, dua cara sama, bagian menumpuk)
 *  - SKENARIO_K5B5D: Kawat Bapak (menyentuh A sampai D: petak, rumus, gabungan, keliling tetap luas berbeda)
 */

export const SKENARIO_K5B5A: DefSkenario = {
  id: "ubin-alun-k5b5",
  judul: "Ubin Alun-Alun",
  latar: "Bantu Lukas menghitung ubin untuk menutup lantai.",
  tokoh: "👦",
  nama: "Lukas",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Lukas. Lantai pendapa Alun-Alun akan ditutup dengan ubin, begitu juga lantai pos jaga dan serambi. Ayo bantu aku menghitung luas daerah yang ditutup!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "arti",
      jenis: "pilih",
      cerita: "Pak Camat bertanya, luas daerah itu mengukur apa?",
      opsi: [
        { teks: "panjang jalan di tepi bangun", benar: false, umpan: "Panjang di tepi bukan luas. Luas mengukur daerah di dalam bangun." },
        { teks: "ukuran daerah di dalam batas bangun", benar: true, umpan: "Betul! Luas adalah ukuran daerah di dalam batas bangun, dihitung dengan petak satuan." },
        { teks: "banyak sudut bangun", benar: false, umpan: "Banyak sudut tidak memberi ukuran daerah. Luas dihitung dari petak yang menutup daerah." },
      ],
    },
    {
      id: "ubin-lantai",
      jenis: "soal",
      cerita: "Lukas menutup lantai dengan ubin yang luasnya 1 m². Tiap baris ditutup ubin sampai rapat.",
      soal: [
        { teks: "Lantai kamar 5 m dan 2 m. Banyak ubin yang menutup lantai adalah … buah.", jawaban: "10", opsi: ["7", "10", "14"] },
        { teks: "Lantai persegi, sisinya 3 m. Banyak ubin yang menutup lantai adalah … buah.", jawaban: "9", opsi: ["12", "6", "9"] },
      ],
      sukses: "Hebat! Banyak ubin sama dengan banyak baris dikali banyak petak tiap baris.",
      salah: "Hmm, hitung ubin tiap baris, lalu ulangi sebanyak baris. Coba lagi.",
    },
    {
      id: "pos",
      jenis: "hitung",
      cerita: "Lantai pos jaga 4 m dan 3 m ditutup ubin 1 m². Tiap ubin diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa ubin yang menutup lantai pos jaga?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! Ada 12 ubin, sama dengan 4 × 3 = 12 petak satuan.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "serambi",
      jenis: "isi",
      cerita: "Serambi 6 m dan 3 m akan ditutup ubin 1 m². Masukkan satu stik untuk tiap ubin sampai seluruh serambi tertutup.",
      objek: "stik",
      target: 18,
      maks: 20,
      sukses: "Pas! 6 × 3 = 18 ubin. Luas serambi 18 m².",
      kurang: "Stiknya masih sedikit. Serambi punya 3 baris, tiap baris 6 ubin.",
      lebih: "Stiknya kebanyakan. Hitung 6 ubin tiap baris untuk 3 baris.",
    },
    {
      id: "yohana",
      jenis: "pilih",
      cerita: "Lantai di meja Lukas berbentuk tangga dari 6 petak. Satu petak menonjol dan ada satu lubang. Yohana memotong petak yang menonjol lalu menempelkannya di lubang sampai menjadi persegi panjang 2 baris dan 3 kolom. Luas sesudahnya …",
      opsi: [
        { teks: "bertambah satu petak karena petaknya ditempel", benar: false, umpan: "Petak itu hanya berpindah, tidak ada petak baru. Luasnya tidak bertambah." },
        { teks: "berkurang satu petak karena petaknya dipotong", benar: false, umpan: "Petak yang dipotong ditempel lagi, tidak ada yang hilang. Luasnya tidak berkurang." },
        { teks: "tetap enam petak, hanya berpindah tempat", benar: true, umpan: "Betul! Memotong lalu menempel tidak mengubah luas. Itulah cara Yohana." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Luas adalah ukuran daerah di dalam bangun, dihitung dengan petak satuan dan ditulis dengan cm² atau m². Persegi panjang punya baris dan kolom petak, dan petak yang dipindah tidak mengubah luas.",
    },
  ],
};

export const SKENARIO_K5B5B: DefSkenario = {
  id: "taman-bentuk-k5b5",
  judul: "Taman Bentuk-Bentuk",
  latar: "Bantu Komang menghitung luas petak taman.",
  tokoh: "🧒",
  nama: "Komang",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Komang. Taman sekolah kami dibagi menjadi petak berbentuk persegi, jajargenjang, segitiga, dan trapesium. Ayo bantu aku menghitung luas tiap petak dengan rumus!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tinggi",
      jenis: "pilih",
      cerita: "Petak jajargenjang beralas 8 m. Garis yang tegak lurus alas panjangnya 3 m, dan sisi miringnya 5 m. Untuk menghitung luas, alas dikali …",
      opsi: [
        { teks: "sisi miring 5 m", benar: false, umpan: "Sisi miring bukan tinggi. Yang dikali alas adalah garis yang tegak lurus alas." },
        { teks: "alas 8 m lagi", benar: false, umpan: "Alas tidak dikali alas. Luas jajargenjang adalah alas dikali tinggi yang tegak lurus." },
        { teks: "tinggi 3 m yang tegak lurus alas", benar: true, umpan: "Betul! Luasnya alas dikali tinggi, 8 × 3 = 24 m²." },
      ],
    },
    {
      id: "hitung-luas",
      jenis: "soal",
      cerita: "Komang menghitung luas dua petak taman.",
      soal: [
        { teks: "Petak persegi dengan sisi 4 m. Luasnya adalah … m².", jawaban: "16", opsi: ["8", "16", "20"] },
        { teks: "Petak jajargenjang beralas 8 m dan tinggi 3 m. Luasnya adalah … m².", jawaban: "24", opsi: ["24", "40", "11"] },
      ],
      sukses: "Hebat! Luas persegi dan jajargenjang dihitung dengan alas dikali tinggi.",
      salah: "Hmm, kalikan alas dengan tinggi yang tegak lurus. Coba lagi.",
    },
    {
      id: "segitiga",
      jenis: "hitung",
      cerita: "Petak segitiga beralas 6 m dan tinggi 4 m. Dua petak yang sama menyusun persegi panjang 6 m kali 4 m. Satu stik mewakili satu meter persegi.",
      tanya: "Ketuk stik sebanyak luas satu petak segitiga. Ada berapa meter persegi?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! Luas satu segitiga ½ × 6 × 4 = 12 m².",
      salah: "Hmm, persegi panjangnya 24 m². Satu segitiga hanya setengahnya. Hitung lagi.",
    },
    {
      id: "trapesium",
      jenis: "isi",
      cerita: "Petak trapesium punya sisi sejajar 5 m dan 3 m, tingginya 4 m. Masukkan satu stik untuk tiap meter persegi luasnya.",
      objek: "stik",
      target: 16,
      maks: 20,
      sukses: "Pas! ½ × (5 + 3) × 4 = 16 m².",
      kurang: "Stiknya masih sedikit. Jumlahkan sisi sejajar, kalikan tinggi, lalu ambil setengahnya.",
      lebih: "Stiknya kebanyakan. Jangan lupa mengambil setengah dari jumlah sisi sejajar kali tinggi.",
    },
    {
      id: "lupa",
      jenis: "pilih",
      cerita: "Komang menghitung luas petak segitiga beralas 6 m dan tinggi 4 m, lalu menjawab 24 m². Apa yang terlewat?",
      opsi: [
        { teks: "dikali setengah, karena dua segitiga menyusun persegi panjang", benar: true, umpan: "Betul! 24 m² adalah luas persegi panjang. Satu segitiga setengahnya, yaitu 12 m²." },
        { teks: "ditambah tinggi lagi", benar: false, umpan: "Tinggi tidak ditambahkan. Yang terlewat adalah mengambil setengah dari alas kali tinggi." },
        { teks: "dikalikan sisi miring", benar: false, umpan: "Segitiga ini tidak memerlukan sisi miring. Luasnya setengah dari alas kali tinggi." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Luas persegi panjang, persegi, dan jajargenjang adalah alas kali tinggi. Luas segitiga, belah ketupat, dan layang-layang adalah setengah dari hasil kali, dan luas trapesium adalah setengah dikali jumlah sisi sejajar kali tinggi.",
    },
  ],
};

export const SKENARIO_K5B5C: DefSkenario = {
  id: "denah-yohana-komang-k5b5",
  judul: "Denah Yohana dan Komang",
  latar: "Bantu Yohana dan Komang menghitung luas denah.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana, dan ini temanku Komang. Kami sedang menghitung luas denah yang bentuknya gabungan. Ayo bantu kami menguraikannya menjadi bagian lalu menjumlahkan luasnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "dua-cara",
      jenis: "pilih",
      cerita: "Aku membagi denah menjadi layang-layang dan segitiga. Komang membagi denah yang sama menjadi jajargenjang dan segitiga. Luas total dari kedua cara itu …",
      opsi: [
        { teks: "berbeda, karena bagiannya berbeda", benar: false, umpan: "Bagiannya berbeda, tetapi denahnya sama. Luas denah tidak berubah karena cara membaginya." },
        { teks: "sama, karena denahnya sama", benar: true, umpan: "Betul! Bangun yang sama punya luas yang sama, apa pun cara membaginya." },
        { teks: "tergantung siapa yang menghitung", benar: false, umpan: "Luas tidak tergantung siapa yang menghitung. Kalau hitungannya benar, hasilnya sama." },
      ],
    },
    {
      id: "uraian",
      jenis: "soal",
      cerita: "Kami menjumlahkan luas bagian denah.",
      soal: [
        { teks: "Denah dibagi dua persegi panjang, luasnya 12 m² dan 8 m². Luas denah adalah … m².", jawaban: "20", opsi: ["12", "20", "26"] },
        { teks: "Papan nama terdiri dari jajargenjang 24 m² dan segitiga 12 m². Luasnya adalah … m².", jawaban: "36", opsi: ["36", "24", "48"] },
      ],
      sukses: "Hebat! Luas gabungan adalah jumlah luas semua bagian.",
      salah: "Hmm, jumlahkan luas semua bagian, jangan ada yang terlewat. Coba lagi.",
    },
    {
      id: "silang",
      jenis: "soal",
      cerita: "Denah L dibagi dengan dua cara. Cara pertama 10 m² dan 6 m². Cara kedua 12 m² dan 4 m².",
      soal: [
        { teks: "Luas denah L menurut cara pertama adalah … m².", jawaban: "16", opsi: ["22", "16", "28"] },
        { teks: "Persegi panjang besar 5 m kali 4 m, takiknya 2 m kali 2 m. Luas denah L adalah … m².", jawaban: "16", opsi: ["20", "18", "16"] },
      ],
      sukses: "Betul! Kedua cara menghasilkan 16 m², sama.",
      salah: "Hmm, jumlahkan kedua bagian, atau kurangi takik dari persegi panjang besar. Coba lagi.",
    },
    {
      id: "ruang-tamu",
      jenis: "hitung",
      cerita: "Ruang tamu terdiri dari dua persegi panjang, 16 m² dan 9 m². Satu stik mewakili satu meter persegi.",
      tanya: "Ketuk semua stik. Ada berapa meter persegi luas ruang tamu?",
      objek: "stik",
      jumlah: 25,
      sukses: "Betul! 16 + 9 = 25 m².",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "denah-l",
      jenis: "isi",
      cerita: "Denah L punya luas 10 m² ditambah 6 m². Masukkan satu stik untuk tiap meter persegi luasnya.",
      objek: "stik",
      target: 16,
      maks: 20,
      sukses: "Pas! 10 + 6 = 16 m².",
      kurang: "Stiknya masih sedikit. Jumlahkan kedua bagian denah.",
      lebih: "Stiknya kebanyakan. Jumlahkan hanya dua bagian denah itu.",
    },
    {
      id: "menumpuk",
      jenis: "pilih",
      cerita: "Dua persegi panjang, masing-masing 12 m², saling menumpuk. Bagian yang menumpuk luasnya 6 m². Luas gabungan kedua bangun adalah …",
      opsi: [
        { teks: "24 m², cukup jumlahkan kedua luasnya", benar: false, umpan: "24 m² menghitung bagian yang menumpuk dua kali. Bagian itu hanya boleh dihitung satu kali." },
        { teks: "12 m², sama dengan satu bangun", benar: false, umpan: "12 m² baru luas satu bangun. Gabungan memuat kedua bangun." },
        { teks: "18 m², bagian yang menumpuk dihitung satu kali", benar: true, umpan: "Betul! 12 + 12 − 6 = 18 m². Bagian yang menumpuk dikurangi satu kali." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Luas bangun gabungan dihitung dengan menguraikannya menjadi bagian, menghitung luas tiap bagian dengan rumusnya, lalu menjumlahkannya. Dua cara yang berbeda memberi luas yang sama, dan bagian yang menumpuk hanya dihitung satu kali.",
    },
  ],
};

export const SKENARIO_K5B5D: DefSkenario = {
  id: "kawat-bapak-k5b5",
  judul: "Kawat Bapak",
  latar: "Bantu Bapak membuat kerangka dari kawat 60 cm.",
  tokoh: "👨",
  nama: "Bapak",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Bapak. Aku punya kawat 60 cm untuk kerangka persegi panjang, dan lantai yang akan ditutup ubin. Ayo bantu aku menghitung luas dan kelilingnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "ubin",
      jenis: "hitung",
      cerita: "Lantai pos jaga 4 m dan 3 m ditutup ubin 1 m². Satu stik mewakili satu ubin.",
      tanya: "Ketuk semua stik. Ada berapa ubin yang menutup lantai?",
      objek: "stik",
      jumlah: 12,
      sukses: "Betul! Ada 12 ubin, sama dengan 4 × 3 = 12 m². Luas dihitung dengan petak satuan.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "rumus",
      jenis: "soal",
      cerita: "Bapak menghitung luas dengan rumus.",
      soal: [
        { teks: "Persegi panjang beralas 8 cm dan tinggi 3 cm. Luasnya adalah … cm².", jawaban: "24", opsi: ["11", "24", "40"] },
        { teks: "Segitiga beralas 6 cm dan tinggi 4 cm. Luasnya adalah … cm².", jawaban: "12", opsi: ["24", "10", "12"] },
      ],
      sukses: "Hebat! Persegi panjang alas kali tinggi, segitiga setengahnya.",
      salah: "Hmm, ingat rumus luas tiap bangun. Coba lagi.",
    },
    {
      id: "gabungan",
      jenis: "soal",
      cerita: "Denah Bapak terdiri dari dua bagian yang dijumlahkan.",
      soal: [
        { teks: "Bagian pertama 12 cm² dan bagian kedua 8 cm². Luas denah adalah … cm².", jawaban: "20", opsi: ["20", "4", "96"] },
        { teks: "Dua bangun masing-masing 12 cm² saling menumpuk 6 cm². Luas gabungan adalah … cm².", jawaban: "18", opsi: ["24", "18", "12"] },
      ],
      sukses: "Betul! Luas gabungan dijumlahkan, dan bagian yang menumpuk dihitung satu kali.",
      salah: "Hmm, jumlahkan luas bagian, kurangi bagian yang menumpuk. Coba lagi.",
    },
    {
      id: "syarat",
      jenis: "pilih",
      cerita: "Kawat 60 cm dibentuk menjadi kerangka persegi panjang. Kelilingnya 60 cm. Syarat panjang dan lebarnya adalah …",
      opsi: [
        { teks: "panjang ditambah lebar sama dengan 30 cm", benar: true, umpan: "Betul! Dua kali panjang ditambah lebar sama dengan 60, jadi panjang ditambah lebar 30 cm." },
        { teks: "panjang dikali lebar sama dengan 60 cm²", benar: false, umpan: "Panjang dikali lebar adalah luas. Yang dibatasi kawat adalah keliling, yaitu dua kali panjang ditambah lebar." },
        { teks: "panjang dikurang lebar sama dengan 30 cm", benar: false, umpan: "Panjang dikurang lebar tidak dibatasi kawat. Yang dibatasi adalah panjang ditambah lebar." },
      ],
    },
    {
      id: "luas-kawat",
      jenis: "soal",
      cerita: "Bapak mencoba dua kerangka dari kawat yang sama, keduanya berkeliling 60 cm.",
      soal: [
        { teks: "Kerangka 20 cm kali 10 cm. Luasnya adalah … cm².", jawaban: "200", opsi: ["200", "60", "30"] },
        { teks: "Kerangka 25 cm kali 5 cm. Luasnya adalah … cm².", jawaban: "125", opsi: ["60", "150", "125"] },
      ],
      sukses: "Betul! Kelilingnya sama, tetapi luasnya berbeda, yaitu 200 cm² dan 125 cm².",
      salah: "Hmm, luas adalah panjang dikali lebar. Angka 60 adalah keliling. Coba lagi.",
    },
    {
      id: "terbesar",
      jenis: "pilih",
      cerita: "Bapak ingin kerangka kawat 60 cm yang luasnya paling besar. Pilihannya 25 cm kali 5 cm, 20 cm kali 10 cm, atau persegi 15 cm kali 15 cm. Yang luasnya paling besar adalah …",
      opsi: [
        { teks: "25 cm kali 5 cm, luasnya 125 cm²", benar: false, umpan: "Bentuk yang pipih luasnya kecil, hanya 125 cm². Ada yang lebih besar." },
        { teks: "20 cm kali 10 cm, luasnya 200 cm²", benar: false, umpan: "200 cm² cukup besar, tetapi persegi 15 kali 15 luasnya 225 cm², lebih besar lagi." },
        { teks: "persegi 15 cm kali 15 cm, luasnya 225 cm²", benar: true, umpan: "Betul! Dengan keliling tetap, bentuk yang mendekati persegi punya luas terbesar." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Luas dihitung dengan petak satuan, rumus, dan penjumlahan bagian. Kawat 60 cm bisa menjadi banyak kerangka dengan keliling sama tetapi luas berbeda, dan yang mendekati persegi paling luas. Pagar dan kawat memakai keliling, ubin dan pasir memakai luas.",
    },
  ],
};
