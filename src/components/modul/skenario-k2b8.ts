import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 2 Bab 8 (Berbagai Diagram). Tanpa jaringan, tanpa gambar benda (hanya teks),
 * jadi tidak melanggar batas Concrete dan Picture.
 *  - SKENARIO_K2B8B: Survei Kira (Sub-Bab B, sub-bab akhir): Kira mengumpulkan data warna kesukaan kelas lalu
 *    menyajikannya. Mengulang konsep bab: satu garis turus mewakili satu benda dan lima ditulis empat garis dengan
 *    satu coretan miring, membaca turus per kelompok lima, paling banyak dan selisih (lebihnya), satu gambar mewakili
 *    satu benda, dua jenis yang sama banyak tidak punya yang paling banyak, serta diagram wajib berjudul dan berketerangan.
 */

export const SKENARIO_K2B8B: DefSkenario = {
  id: "survei-kira",
  judul: "Survei Kira",
  latar: "Ikuti Kira mensurvei warna kesukaan teman sekelas, lalu menyajikan hasilnya dalam diagram.",
  tokoh: "👧",
  nama: "Kira",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Kira. Bu Guru meminta kami mensurvei warna kesukaan teman sekelas. Aku mencatat dengan turus, lalu membuat diagram. Bantu aku, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "catat",
      jenis: "soal",
      cerita: "Teman-teman menyebut warna kesukaannya satu per satu. Tiap sebutan kucatat dengan satu garis turus.",
      soal: [
        { teks: "Lima sebutan ditulis dengan …", jawaban: "empat garis dan satu garis miring", opsi: ["lima garis berjajar", "empat garis dan satu garis miring", "satu garis lurus"] },
        { teks: "Turus warna merah: 1 kelompok lima dan 2 garis. Banyak merah …", jawaban: "7", opsi: ["7", "3", "12"] },
        { teks: "Satu garis tegak pada turus menunjukkan …", jawaban: "satu anak", opsi: ["lima anak", "satu anak", "satu kelompok"] },
      ],
      sukses: "Tepat! Satu garis mewakili satu anak. Lima anak ditulis empat garis dicoret satu garis miring, lalu dihitung lima-lima.",
      salah: "Hmm, ingat: satu garis tegak untuk satu anak. Garis kelima dicoret miring, jadi satu kelompok isinya lima.",
    },
    {
      id: "baca",
      jenis: "pilih",
      cerita: "Hasil turusku: merah 7, kuning 3, biru 5, hitam 2. Warna apa yang paling banyak disukai?",
      opsi: [
        { teks: "Biru, turusnya 5", benar: false, umpan: "Biru 5, tetapi masih ada yang lebih banyak. Bandingkan semua baris, jangan berhenti di satu baris." },
        { teks: "Hitam, turusnya 2", benar: false, umpan: "Hitam hanya 2, justru yang paling sedikit. Cari baris yang turusnya paling panjang." },
        { teks: "Merah, turusnya 7", benar: true, umpan: "Betul! Merah 7 adalah yang paling banyak, karena 7 lebih besar dari 3, 5, dan 2." },
      ],
    },
    {
      id: "banding",
      jenis: "soal",
      cerita: "Aku membandingkan beberapa warna dari turus tadi: merah 7, kuning 3, biru 5, hitam 2.",
      soal: [
        { teks: "Banyak merah … lebihnya dari banyak hitam.", jawaban: "5", opsi: ["9", "4", "5"] },
        { teks: "Biru dan hitam digabung menjadi …", jawaban: "7", opsi: ["3", "7", "10"] },
        { teks: "Pada diagram gambar, satu bintang mewakili satu anak. Merah digambar … bintang.", jawaban: "7", opsi: ["7", "1", "2"] },
      ],
      sukses: "Hebat! Selisihnya dicari dengan mengurangi: 7 dikurangi 2 sama dengan 5. Biru dan hitam digabung 5 ditambah 2 sama dengan 7.",
      salah: "Hmm, lebihnya dicari dengan mengurangi bilangan yang besar dengan yang kecil. Menggabungkan berarti menjumlahkan.",
    },
    {
      id: "sama",
      jenis: "pilih",
      cerita: "Di kebun Tika ada lili 4 tangkai dan aster 4 tangkai. Mana kalimat yang benar?",
      opsi: [
        { teks: "Lili dan aster sama banyak, jadi tidak ada yang lebih banyak", benar: true, umpan: "Betul! 4 dan 4 sama. Barisnya sama panjang, sehingga tidak ada yang lebihnya." },
        { teks: "Lili 1 lebihnya dari aster", benar: false, umpan: "Keduanya sama-sama 4. Tidak ada yang lebihnya." },
        { teks: "Aster 4 lebihnya dari lili", benar: false, umpan: "Lebihnya dicari dengan 4 dikurangi 4, dan hasilnya 0. Jadi tidak ada yang lebihnya." },
      ],
    },
    {
      id: "judul",
      jenis: "pilih",
      cerita: "Aku siap menggambar diagramnya. Apa saja yang harus ada supaya pembaca tidak bingung?",
      opsi: [
        { teks: "Hanya gambar, judul tidak perlu", benar: false, umpan: "Tanpa judul, pembaca tidak tahu data apa yang digambar. Diagram wajib punya judul." },
        { teks: "Judul, keterangan satu gambar mewakili berapa, dan gambar", benar: true, umpan: "Betul! Judul menjelaskan datanya, keterangan menjelaskan satu gambar mewakili berapa, dan gambar menunjukkan banyaknya." },
        { teks: "Gambar dengan ukuran berbeda-beda", benar: false, umpan: "Semua gambar harus sama bentuk dan sama ukuran, supaya baris yang lebih panjang berarti lebih banyak." },
      ],
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Surveinya selesai dan diagramnya rapi. Aku bisa mencatat dengan turus, membaca paling banyak dan selisihnya, serta membuat diagram gambar yang berjudul dan berketerangan. Kamu sudah menyelesaikan misi Bab 8!",
    },
  ],
};
