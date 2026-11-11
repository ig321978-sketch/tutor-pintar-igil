import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100). Tanpa jaringan, tanpa gambar benda (hanya teks),
 * jadi tidak melanggar batas Concrete dan Picture.
 *  - SKENARIO_K2B7B: Kelereng Kira (Sub-Bab B, sub-bab akhir): satu permainan kelereng yang memuat nilai tempat,
 *    jebakan 59 dengan 61 (puluhan menentukan lebih dulu), maju dan mundur di garis bilangan, mengurutkan, dan tanda
 *    banding. Mengulang konsep bab: sepuluh satuan diikat tetap sama banyaknya, 53 tidak sama dengan 35, membandingkan
 *    mulai dari puluhan, dan maju berarti lebihnya sedangkan mundur berarti kurangnya.
 */

export const SKENARIO_K2B7B: DefSkenario = {
  id: "kelereng-kira",
  judul: "Kelereng Kira",
  latar: "Ikuti Kira bermain kelereng bersama teman-temannya: menghitung, membandingkan, dan mengurutkan banyak kelereng.",
  tokoh: "👧",
  nama: "Kira",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Kira. Hari ini aku bermain kelereng bersama Dio dan teman-temanku. Kami harus menghitung, membandingkan, dan mengurutkan kelereng. Bantu aku, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kantong",
      jenis: "soal",
      cerita: "Aku mengikat kelerengku sepuluh-sepuluh. Hasilnya ada 5 ikat puluhan dan 3 kelereng lepas.",
      soal: [
        { teks: "Ada 5 puluhan dan 3 satuan kelereng. Berapa banyak kelereng Kira?", jawaban: "53", opsi: ["53", "35", "8"] },
        { teks: "Bilangan 53 dibaca …", jawaban: "lima puluh tiga", opsi: ["tiga puluh lima", "lima puluh tiga", "lima tiga"] },
        { teks: "Sepuluh kelereng lepas diikat menjadi satu puluhan. Banyak kelerengnya …", jawaban: "tetap sama", opsi: ["bertambah", "berkurang", "tetap sama"] },
      ],
      sukses: "Tepat! Lima puluhan dan tiga satuan adalah lima puluh tiga. Mengikat sepuluh satuan menjadi satu puluhan tidak mengubah banyaknya.",
      salah: "Hmm, lihat tempatnya dulu. Puluhan ada di kiri, satuan di kanan. 53 punya 5 puluhan, bukan 3 puluhan.",
    },
    {
      id: "banding",
      jenis: "pilih",
      cerita: "Kelereng Kira ada 59 dan kelereng Dio ada 61. Siapa yang punya lebih banyak?",
      opsi: [
        { teks: "Kira, karena satuannya 9 lebih besar dari 1", benar: false, umpan: "Satuan baru dilihat bila puluhannya sama. Di sini puluhannya berbeda, 5 dan 6, jadi puluhan yang menentukan." },
        { teks: "Dio, karena puluhannya 6 lebih banyak dari 5", benar: true, umpan: "Betul! Bandingkan puluhan dulu. 6 puluhan lebih banyak dari 5 puluhan, jadi 61 lebih besar dari 59." },
        { teks: "Sama banyak", benar: false, umpan: "59 dan 61 tidak sama. Puluhannya berbeda, yaitu 5 dan 6." },
      ],
    },
    {
      id: "garis",
      jenis: "soal",
      cerita: "Kelereng kami ditaruh berjajar di garis bilangan. Penanda Kira berdiri di bilangan 58, lalu ia melompat ke kanan dan ke kiri.",
      soal: [
        { teks: "58 maju 2 langkah menjadi …", jawaban: "60", opsi: ["56", "60", "59"] },
        { teks: "75 mundur 3 langkah menjadi …", jawaban: "72", opsi: ["72", "78", "73"] },
      ],
      sukses: "Hebat! Maju ke kanan mencari bilangan yang lebihnya, mundur ke kiri mencari bilangan yang kurangnya. 58 maju dua langkah sampai di 60.",
      salah: "Hmm, maju berarti ke kanan dan bilangan bertambah. Mundur berarti ke kiri dan bilangan berkurang. Hitung langkahnya satu-satu.",
    },
    {
      id: "urut",
      jenis: "pilih",
      cerita: "Tiga temanku punya kelereng sebanyak 57, 76, dan 83. Bagaimana urutan dari yang paling kecil?",
      opsi: [
        { teks: "83, 76, 57", benar: false, umpan: "Itu urutan dari yang paling besar. Yang ditanya dari yang paling kecil." },
        { teks: "76, 57, 83", benar: false, umpan: "Puluhan 76 ada 7, sedangkan puluhan 57 hanya 5. Jadi 57 lebih kecil dari 76 dan harus lebih dulu." },
        { teks: "57, 76, 83", benar: true, umpan: "Betul! Puluhannya 5, 7, dan 8. Makin banyak puluhan, makin besar bilangannya." },
      ],
    },
    {
      id: "tanda",
      jenis: "pilih",
      cerita: "Kira punya 47 kelereng dan Rio punya 38 kelereng. Mana kalimat banding yang benar?",
      opsi: [
        { teks: "38 > 47", benar: false, umpan: "Tanda terbuka ke bilangan yang lebih besar. 38 lebih kecil dari 47, jadi tanda ini terbalik." },
        { teks: "47 > 38", benar: true, umpan: "Betul! Puluhan 47 ada 4 dan puluhan 38 ada 3, jadi 47 lebih besar dari 38. Tanda terbuka ke arah 47." },
        { teks: "47 = 38", benar: false, umpan: "Dua bilangan itu tidak sama. Puluhannya 4 dan 3." },
      ],
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Permainan kelerengnya seru. Aku bisa membaca puluhan dan satuan, membandingkan, maju dan mundur di garis bilangan, dan mengurutkan. Kamu sudah menyelesaikan misi Bab 7!",
    },
  ],
};
