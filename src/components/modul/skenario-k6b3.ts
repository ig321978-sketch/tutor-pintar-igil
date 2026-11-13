import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 3 (Kubus dan Balok). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b3.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B3A: Tigor dan Tenri Susun Rumah Kubus (Construct-Decompose Protocol, Layer Counting Method, dan Hidden Support Rule)
 *  - SKENARIO_K6B3B: Anike Menggambar Tiga Arah (Orthographic Projection Protocol, Height-Matrix Silhouette, dan Occlusion Max Rule)
 *  - SKENARIO_K6B3C: Tigor dan Tenri di Denah Kelas (Grid Coordinate Naming, Manhattan Path Distance, dan Shortest Grid Path)
 */

export const SKENARIO_K6B3A: DefSkenario = {
  id: "tigor-rumah-k6b3",
  judul: "Tigor dan Tenri Susun Rumah Kubus",
  latar: "Bantu Tigor dan Tenri menyusun, menghitung, dan mengurai rumah kubus.",
  tokoh: "👦",
  nama: "Tigor",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Tigor, dan ini temanku Tenri. Kami menyusun kubus menjadi rumah kecil. Kubus bisa dipasang berdampingan atau ditumpuk, lalu diurai lagi. Ayo kita susun, hitung lantai demi lantai, dan jaga agar tidak ada kubus yang melayang!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "susun",
      jenis: "pilih",
      cerita: "Construct-Decompose Protocol: bangun lalu urai kembali. Aku ingin membuat bentuk L dari tiga kubus: dua kubus mendatar dan satu kubus naik di atasnya. Susunan mana yang benar?",
      opsi: [
        { teks: "Tiga kubus berdampingan dalam satu garis", benar: false, umpan: "Itu garis lurus, bukan bentuk L. Bentuk L punya satu kubus yang naik." },
        { teks: "Tiga kubus ditumpuk lurus ke atas", benar: false, umpan: "Itu menara lurus, bukan bentuk L. Bentuk L punya dua kubus mendatar." },
        { teks: "Dua kubus berdampingan, satu kubus ditaruh di atas salah satunya", benar: true, umpan: "Betul! Dua kubus mendatar ditambah satu kubus yang naik membentuk bentuk L." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Bentuk L itu kubus per kubus kuberi tanda. Satu stik mewakili satu kubus.",
      tanya: "Ketuk semua stik. Ada berapa kubus pada bentuk L?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Dua kubus mendatar ditambah satu kubus yang naik, seluruhnya 3 kubus.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu kubus, lalu hitung lagi.",
    },
    {
      id: "lapisan",
      jenis: "soal",
      cerita: "Layer Counting Method: hitung lantai dasar dulu, lalu semua lantai. Rumah kecil kami berbentuk balok penuh berukuran 3 × 2, setinggi 2 lantai.",
      soal: [
        { teks: "Satu lantai berukuran 3 × 2 berisi … kubus.", jawaban: "6", opsi: ["5", "6", "8"] },
        { teks: "Dua lantai penuh berisi … kubus, termasuk yang tertutup.", jawaban: "12", opsi: ["6", "10", "12"] },
      ],
      sukses: "Hebat! Lantai dasar 3 × 2 = 6 kubus, dua lantai penuh 6 × 2 = 12 kubus. Hitung lantai demi lantai, jangan hanya yang kelihatan.",
      salah: "Hmm, kalikan dulu kedua ukuran lantai, lalu kalikan dengan banyak lantai. Coba lagi.",
    },
    {
      id: "isi",
      jenis: "isi",
      cerita: "Tenri menyiapkan lantai kedua. Lantai itu penuh, berukuran 3 × 2. Masukkan satu stik untuk tiap kubus yang dibutuhkan.",
      objek: "stik",
      target: 6,
      maks: 12,
      sukses: "Betul! Lantai kedua butuh 3 × 2 = 6 kubus, sama banyak dengan lantai dasar.",
      kurang: "Kubusnya masih kurang. Tambah lagi sampai pas satu lantai penuh.",
      lebih: "Kubusnya kelebihan. Kurangi sampai pas satu lantai penuh.",
    },
    {
      id: "penyangga",
      jenis: "pilih",
      cerita: "Hidden Support Rule: kubus di lantai atas tidak boleh melayang. Tenri meletakkan satu kubus di lantai kedua tepat di atas petak yang kosong di lantai dasar. Apa yang harus dilakukan?",
      opsi: [
        { teks: "Tambah satu kubus penyangga di bawahnya lebih dulu", benar: true, umpan: "Betul! Kubus lantai kedua harus bertumpu pada kubus di bawahnya, jadi penyangga ditambah dulu." },
        { teks: "Biarkan saja, kubus kecil tidak berat", benar: false, umpan: "Kubus tidak boleh melayang, sekecil apa pun. Harus ada penyangga di bawahnya." },
        { teks: "Pindahkan lantai dasar ke atas", benar: false, umpan: "Lantai dasar harus tetap di bawah sebagai penopang. Yang perlu ditambah adalah penyangganya." },
      ],
    },
    {
      id: "urai",
      jenis: "soal",
      cerita: "Menara dua lantai: lantai dasar berisi 4 kubus dan lantai teratas berisi 2 kubus, semuanya bertumpu dengan baik.",
      soal: [
        { teks: "Seluruh kubus menara, termasuk yang tertutup, ada … kubus.", jawaban: "6", opsi: ["2", "4", "6"] },
        { teks: "Lantai teratas diurai. Kubus yang masih tersusun ada … kubus.", jawaban: "4", opsi: ["4", "6", "2"] },
      ],
      sukses: "Betul! Seluruhnya 4 + 2 = 6 kubus. Setelah lantai teratas dilepas, tersisa 4 kubus.",
      salah: "Hmm, jumlahkan kubus kedua lantai dulu, lalu kurangi lantai teratas yang dilepas.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Construct-Decompose Protocol: susun atau urai kubus, jumlahnya tetap bisa dihitung. Layer Counting Method: hitung lantai dasar dulu, lalu semua lantai, termasuk yang tertutup. Hidden Support Rule: kubus lantai kedua selalu punya kubus penyangga di bawahnya.",
    },
  ],
};

export const SKENARIO_K6B3B: DefSkenario = {
  id: "anike-tampak-k6b3",
  judul: "Anike Menggambar Tiga Arah",
  latar: "Bantu Anike menggambar susunan kubus dari depan, samping, dan atas.",
  tokoh: "👧",
  nama: "Anike",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Anike. Aku menyusun kubus pada alas dua kali dua, lalu menggambarnya dari tiga arah. Baris depan tingginya 2 dan 1, baris belakang tingginya 3 dan 4. Ayo kita catat tinggi tiap petak dan baca tampaknya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tiga-arah",
      jenis: "pilih",
      cerita: "Orthographic Projection Protocol: gambar tampak depan, samping, dan atas tanpa perspektif, jadi hanya petak datar. Apa yang terlihat dari atas?",
      opsi: [
        { teks: "Tinggi tiap tumpukan kubus", benar: false, umpan: "Tinggi tidak terlihat dari atas. Yang terlihat hanya alas tiap tumpukan." },
        { teks: "Hanya petak yang terisi, tinggi tidak terlihat", benar: true, umpan: "Betul! Dari atas kita tahu petak mana yang terisi, tetapi tidak tahu setinggi apa tumpukannya." },
        { teks: "Seluruh kubus, termasuk yang tertutup", benar: false, umpan: "Kubus yang tertumpuk tidak terlihat dari atas, jadi tidak bisa dihitung dari gambar atas saja." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Aku menumpuk kubus lurus ke atas di satu petak. Satu stik mewakili satu kubus.",
      tanya: "Ketuk semua stik. Ada berapa kubus pada tumpukan itu?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ada 4 kubus ditumpuk. Dari atas, tumpukan itu hanya tampak 1 petak.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu kubus, lalu hitung lagi.",
    },
    {
      id: "matriks",
      jenis: "soal",
      cerita: "Height-Matrix Silhouette: catat tinggi tiap petak alas dalam matriks. Susunanku: baris depan 2 dan 1, baris belakang 3 dan 4.",
      soal: [
        { teks: "Seluruh kubus pada susunanku ada … kubus.", jawaban: "10", opsi: ["7", "9", "10"] },
        { teks: "Dari atas, tampak … petak terisi.", jawaban: "4", opsi: ["4", "10", "2"] },
      ],
      sukses: "Hebat! Seluruhnya 2 + 1 + 3 + 4 = 10 kubus, dan keempat petak terisi, jadi dari atas tampak 4 petak.",
      salah: "Hmm, jumlahkan semua tinggi pada matriks untuk seluruh kubus, dan hitung petak yang terisi untuk tampak atas.",
    },
    {
      id: "maks",
      jenis: "soal",
      cerita: "Occlusion Max Rule: dari depan, tumpukan yang lebih rendah di belakang tertutup. Tiap kolom menampilkan tinggi terbesarnya.",
      soal: [
        { teks: "Kolom kiri tingginya 2 dan 3. Yang terlihat dari depan adalah tinggi …", jawaban: "3", opsi: ["5", "2", "3"] },
        { teks: "Tampak depan susunanku, dari kolom kiri 3 dan kolom kanan 4, memuat … petak.", jawaban: "7", opsi: ["7", "10", "6"] },
      ],
      sukses: "Betul! Kolom kiri menampilkan 3 dan kolom kanan menampilkan 4, jadi tampak depan memuat 7 petak.",
      salah: "Hmm, ambil tinggi terbesar tiap kolom, lalu jumlahkan. Coba lagi.",
    },
    {
      id: "salah",
      jenis: "pilih",
      cerita: "Adikku menghitung tampak depan dengan menjumlahkan semua tinggi susunanku dan mendapat 10. Apa yang salah dari caranya?",
      opsi: [
        { teks: "Ia menghitung kubus yang tertutup, padahal dari depan hanya tinggi terbesar tiap kolom yang terlihat", benar: true, umpan: "Betul! Tampak depan memuat 3 + 4 = 7 petak, bukan jumlah semua tinggi." },
        { teks: "Ia seharusnya menjumlahkan 2 dan 1 saja", benar: false, umpan: "Baris depan saja tidak cukup. Tumpukan di belakang yang lebih tinggi juga terlihat." },
        { teks: "Tidak ada yang salah, tampak depan sama dengan seluruh kubus", benar: false, umpan: "Tampak depan dan seluruh kubus berbeda: kubus yang tertutup tidak terlihat dari depan." },
      ],
    },
    {
      id: "warna",
      jenis: "isi",
      cerita: "Aku mewarnai tampak depan di kertas kotak-kotak. Masukkan satu stik untuk tiap petak yang tampak dari depan, yaitu 3 petak di kolom kiri dan 4 petak di kolom kanan.",
      objek: "stik",
      target: 7,
      maks: 12,
      sukses: "Betul! Tampak depan memuat 3 + 4 = 7 petak berwarna.",
      kurang: "Petak yang diwarnai masih kurang. Tambah lagi sampai pas.",
      lebih: "Petak yang diwarnai kelebihan. Kurangi sampai pas.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Orthographic Projection Protocol: gambar tampak depan, samping, dan atas tanpa perspektif, dan dari atas tinggi tidak terlihat. Height-Matrix Silhouette: catat tinggi tiap petak alas dalam matriks. Occlusion Max Rule: dari depan atau samping, tiap kolom atau baris menampilkan tinggi terbesarnya.",
    },
  ],
};

export const SKENARIO_K6B3C: DefSkenario = {
  id: "tigor-denah-k6b3",
  judul: "Tigor dan Tenri di Denah Kelas",
  latar: "Bantu Tigor dan Tenri menulis letak dan menghitung jarak di denah kelas berpetak.",
  tokoh: "👦",
  nama: "Tigor",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Tigor, bersama Tenri. Denah kelas kami berpetak: huruf A sampai F menurun, dan angka 1 sampai 6 mendatar. Kursiku di C2, seperti kota Makassar di peta. Ayo kita tulis letak, hitung jarak, dan cari jalur terpendek!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "nama",
      jenis: "pilih",
      cerita: "Grid Coordinate Naming: tulis huruf baris lebih dulu, lalu angka kolom. Kursi Tenri ada di baris E dan kolom 5. Letaknya ditulis …",
      opsi: [
        { teks: "5E", benar: false, umpan: "Urutannya terbalik. Huruf baris ditulis lebih dulu, lalu angka kolom." },
        { teks: "E5", benar: true, umpan: "Betul! Baris E dan kolom 5 ditulis E5: huruf dulu, lalu angka." },
        { teks: "C2", benar: false, umpan: "C2 adalah kursiku. Kursi Tenri ada di baris E dan kolom 5." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Aku berjalan lurus di baris A dari kolom 1 ke kolom 5. Satu stik mewakili satu langkah petak.",
      tanya: "Ketuk satu stik tiap langkah. Dari A1 ke A5, ada berapa langkah?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Dari kolom 1 ke kolom 5 ada 4 langkah petak.",
      salah: "Hmm, ketuk satu stik tiap langkah dari satu petak ke petak berikutnya, lalu hitung lagi.",
    },
    {
      id: "jarak",
      jenis: "soal",
      cerita: "Manhattan Path Distance: jarak adalah selisih huruf ditambah selisih angka. Dari A3 ke E5, Tenri hanya boleh bergerak kanan, kiri, naik, atau turun.",
      soal: [
        { teks: "Selisih huruf dari baris A ke baris E ada … langkah.", jawaban: "4", opsi: ["4", "2", "6"] },
        { teks: "Jarak dari A3 ke E5 ada … langkah.", jawaban: "6", opsi: ["2", "6", "8"] },
      ],
      sukses: "Hebat! Selisih huruf 4 ditambah selisih angka 2 sama dengan 6 langkah.",
      salah: "Hmm, hitung selisih huruf, lalu selisih angka, kemudian jumlahkan. Coba lagi.",
    },
    {
      id: "serong",
      jenis: "pilih",
      cerita: "Tenri ingin melompat serong dari A3 langsung ke B4 dengan satu langkah. Apakah boleh?",
      opsi: [
        { teks: "Tidak boleh, serong dihitung dua langkah", benar: true, umpan: "Betul! Dari A3 ke B4 ada selisih huruf 1 dan selisih angka 1, jadi jaraknya 2 langkah." },
        { teks: "Boleh, serong dihitung satu langkah", benar: false, umpan: "Serong tidak diizinkan. Tiap langkah hanya kanan, kiri, naik, atau turun." },
        { teks: "Boleh, asalkan hurufnya sama", benar: false, umpan: "Soal serong bukan tentang huruf yang sama. Tiap langkah hanya satu arah lurus." },
      ],
    },
    {
      id: "kubus",
      jenis: "isi",
      cerita: "Sebuah kubus dipindah dari F1 ke D2. Selisih huruf 2 dan selisih angka 1. Masukkan satu stik untuk tiap langkah minimal.",
      objek: "stik",
      target: 3,
      maks: 8,
      sukses: "Betul! F1 ke D2 butuh 2 + 1 = 3 langkah minimal.",
      kurang: "Langkahnya masih kurang. Tambah lagi sampai pas jarak minimalnya.",
      lebih: "Langkahnya kelebihan. Kurangi sampai pas jarak minimalnya.",
    },
    {
      id: "jalur",
      jenis: "soal",
      cerita: "Shortest Grid Path: beberapa jalur bisa sama pendek. Dari A1 ke B3, ada selisih huruf 1 dan selisih angka 2.",
      soal: [
        { teks: "Langkah terpendek dari A1 ke B3 ada … langkah.", jawaban: "3", opsi: ["2", "3", "4"] },
        { teks: "Banyak jalur terpendek dari A1 ke B3 ada … jalur.", jawaban: "3", opsi: ["6", "3", "2"] },
      ],
      sukses: "Betul! Jaraknya 3 langkah, dan ada 3 urutan gerak yang sama pendek: turun lebih dulu, di tengah, atau di akhir.",
      salah: "Hmm, jumlahkan selisih huruf dan selisih angka untuk langkah, lalu hitung urutan gerak yang berbeda. Coba lagi.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Grid Coordinate Naming: tulis letak dengan huruf dulu, lalu angka. Manhattan Path Distance: jarak sama dengan selisih huruf ditambah selisih angka, tanpa serong. Shortest Grid Path: beberapa jalur bisa sama pendek.",
    },
  ],
};
