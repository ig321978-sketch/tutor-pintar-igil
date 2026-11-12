import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 4 Bab 6 (Piktogram dan Diagram Batang). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b6.mjs (dihitung ulang dari data buku).
 *  - SKENARIO_K4B6A: Turus Kelas Karel (turus, keterangan simbol, simbol × skala, paling banyak, jumlah, selisih)
 *  - SKENARIO_K4B6B: Pameran Data Azizah (piktogram ke batang, garis sumbu, label sumbu, selisih, mendatar, arti tetap)
 */

export const SKENARIO_K4B6A: DefSkenario = {
  id: "turus-karel-k4b6",
  judul: "Turus Kelas Karel",
  latar: "Bantu Karel mencatat data dengan turus lalu menyajikannya sebagai piktogram.",
  tokoh: "👦",
  nama: "Karel",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Karel. Hari ini aku mendata mainanku dan siswa di sekolah. Kita catat dengan turus, lalu kita gambar sebagai piktogram. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "turus",
      jenis: "hitung",
      cerita: "Karel mencatat kelerengnya dengan turus. Tiap stik di bawah ini satu turus.",
      tanya: "Ketuk semua stik. Berapa kelereng Karel?",
      objek: "stik",
      jumlah: 9,
      sukses: "Betul! Sembilan turus berarti sembilan kelereng. Kelompok lima diberi garis miring agar mudah dihitung.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "skala",
      jenis: "pilih",
      cerita: "Karel ingin menggambar siswa per kelas: 28, 24, 32, 20, 16, dan 12 siswa. Tiap baris paling banyak 10 simbol, dan semua simbol harus utuh. Keterangan mana yang Karel pilih?",
      opsi: [
        { teks: "1 simbol = 1 siswa", benar: false, umpan: "Kelas 3 punya 32 siswa, jadi butuh 32 simbol. Itu terlalu banyak untuk satu baris." },
        { teks: "1 simbol = 3 siswa", benar: false, umpan: "28 tidak habis dibagi 3, jadi ada simbol yang tidak utuh." },
        { teks: "1 simbol = 4 siswa", benar: true, umpan: "Betul! Semua data habis dibagi 4, dan baris terpanjang hanya 8 simbol. Hemat dan utuh." },
      ],
    },
    {
      id: "simbol",
      jenis: "isi",
      cerita: "Kelas 3 punya 32 siswa. Keterangannya 1 simbol = 4 siswa. Satu stik untuk satu simbol. Masukkan stik sebanyak simbol yang perlu digambar.",
      objek: "stik",
      target: 8,
      maks: 12,
      sukses: "Pas! 8 simbol × 4 = 32 siswa.",
      kurang: "Stiknya masih kurang. Berapa kali 4 sama dengan 32?",
      lebih: "Stiknya kelebihan. Ingat, satu simbol mewakili 4 siswa.",
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Karel membaca piktogram yang sudah jadi.",
      soal: [
        { teks: "Kelas 4 ada 5 simbol, 1 simbol = 4 siswa. Banyak siswa …", jawaban: "20", opsi: ["5", "20", "9"] },
        { teks: "Mainan Karel 6 + 4 + 3 + 1 + 9 = …", jawaban: "23", opsi: ["20", "25", "23"] },
        { teks: "Selisih kelereng 9 dan puzzle 1 …", jawaban: "8", opsi: ["8", "10", "9"] },
      ],
      sukses: "Hebat! Nilai sama dengan simbol dikali skala. Jumlah berarti ditambah semua, selisih berarti dikurangi.",
      salah: "Hmm, periksa keterangan simbolnya, lalu bedakan jumlah dan selisih. Coba lagi.",
    },
    {
      id: "lupa",
      jenis: "pilih",
      cerita: "Putu melihat 3 simbol di baris Kelas 6 dan berkata ada 3 siswa. Keterangannya 1 simbol = 4 siswa. Apa yang benar?",
      opsi: [
        { teks: "3 + 4 = 7 siswa", benar: false, umpan: "Simbol tidak ditambah skala. Tiap simbol mewakili 4 siswa, jadi dikali." },
        { teks: "3 × 4 = 12 siswa", benar: true, umpan: "Betul! Putu lupa membaca keterangan. Tiga simbol berarti 12 siswa." },
        { teks: "Tetap 3 siswa", benar: false, umpan: "Itu hanya banyak simbolnya. Baca baris keterangan dulu." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Turus membantu mencatat data. Piktogram memakai simbol, dan keterangan memberi tahu satu simbol mewakili berapa. Nilai sama dengan simbol dikali skala." },
  ],
};

export const SKENARIO_K4B6B: DefSkenario = {
  id: "pameran-azizah-k4b6",
  judul: "Pameran Data Azizah",
  latar: "Bantu Azizah menyiapkan diagram batang untuk pameran data kelas.",
  tokoh: "👧",
  nama: "Azizah",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Azizah. Kelas kami membuat pameran data. Aku ingin mengubah piktogram menjadi diagram batang, lalu memberi label yang jelas. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "ubah",
      jenis: "pilih",
      cerita: "Piktogram siswa per kelas memakai keterangan 1 simbol = 4 siswa. Kelas 2 punya 6 simbol. Sampai angka berapa batang Kelas 2 pada diagram batang?",
      opsi: [
        { teks: "Sampai 24", benar: true, umpan: "Betul! 6 × 4 = 24. Batang menunjukkan nilai, bukan banyak simbol." },
        { teks: "Sampai 6", benar: false, umpan: "Itu banyak simbolnya saja. Satu simbol mewakili 4 siswa." },
        { teks: "Sampai 10", benar: false, umpan: "6 + 4 bukan cara membaca piktogram. Simbol dikali keterangannya." },
      ],
    },
    {
      id: "garis",
      jenis: "isi",
      cerita: "Sumbu tegak Azizah naik 4, 8, 12, dan seterusnya. Kelas 4 punya 20 siswa. Satu stik untuk satu garis sumbu. Masukkan stik sebanyak garis yang dilewati batang Kelas 4.",
      objek: "stik",
      target: 5,
      maks: 10,
      sukses: "Pas! 5 garis × 4 = 20 siswa.",
      kurang: "Stiknya masih kurang. Tiap garis bernilai 4.",
      lebih: "Stiknya kelebihan. Berapa kali 4 sama dengan 20?",
    },
    {
      id: "sumbu",
      jenis: "pilih",
      cerita: "Azizah membuat diagram batang tegak alat transportasi. Batangnya naik ke atas. Label apa yang ditulis di sumbu tegak?",
      opsi: [
        { teks: "Nama alat transportasi", benar: false, umpan: "Nama kategori ada di bawah batang, di sumbu datar." },
        { teks: "Judul diagram", benar: false, umpan: "Judul ditulis di atas diagram, bukan di sumbu." },
        { teks: "Banyak siswa", benar: true, umpan: "Betul! Pada diagram tegak, sumbu tegak menunjukkan banyak, dan angkanya naik dengan langkah teratur." },
      ],
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Pengunjung pameran membaca diagram batang Azizah.",
      soal: [
        { teks: "Jalan kaki 8, lainnya 3. Selisihnya 8 − 3 = …", jawaban: "5", opsi: ["11", "5", "3"] },
        { teks: "Semua alat transportasi 8 + 5 + 7 + 3 = …", jawaban: "23", opsi: ["23", "20", "8"] },
        { teks: "Buku dipinjam Rabu 14, Sabtu 5. Selisihnya …", jawaban: "9", opsi: ["19", "7", "9"] },
      ],
      sukses: "Hebat! Batang yang lebih panjang nilainya lebih besar. Selisih berarti dikurangi, jumlah berarti ditambah semua.",
      salah: "Hmm, baca nilai tiap batang dari sumbu, lalu bedakan jumlah dan selisih. Coba lagi.",
    },
    {
      id: "mendatar",
      jenis: "pilih",
      cerita: "Diagram buku dipinjam dibuat mendatar: batangnya memanjang ke samping. Di mana nama hari ditulis?",
      opsi: [
        { teks: "Di sumbu tegak, di sebelah kiri", benar: true, umpan: "Betul! Pada diagram mendatar, nama kategori ada di sumbu tegak, dan banyak buku ada di sumbu datar." },
        { teks: "Di sumbu datar, di bawah", benar: false, umpan: "Pada diagram mendatar, sumbu datar dipakai untuk angka banyak buku." },
        { teks: "Tidak perlu ditulis", benar: false, umpan: "Tanpa nama hari, pembaca tidak tahu batang mana milik hari apa." },
      ],
    },
    {
      id: "arti",
      jenis: "pilih",
      cerita: "Putu bertanya: kalau diagram tegak diubah menjadi mendatar, apa yang berubah?",
      opsi: [
        { teks: "Nilai datanya ikut berubah", benar: false, umpan: "Datanya sama. Rabu tetap 14 buku walau batangnya tidur." },
        { teks: "Hanya arah batangnya", benar: true, umpan: "Betul! Arahnya berubah, artinya tetap. Label sumbunya ikut bertukar tempat." },
        { teks: "Batang terpanjang menjadi terpendek", benar: false, umpan: "Urutan panjang batang tetap sama, karena nilainya tidak berubah." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Diagram batang memakai batang persegi panjang. Panjang batang dibaca dari skala sumbu. Beri judul dan label sumbu. Batang bisa tegak atau mendatar, artinya tetap sama." },
  ],
};
