import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Stoples Permen Kira — Kelas 2 Bab 1 Sub-Bab C.
 * Tebak, hitung kelompok sepuluh, bandingkan, urutkan. Tanpa jaringan.
 */

export const SKENARIO_K2B1: DefSkenario = {
  id: "stoples-permen-kira",
  judul: "Stoples Permen Kira",
  latar: "Bantu menghitung dan membandingkan permen di ulang tahun Kira.",
  tokoh: "👧",
  nama: "Kira",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita:
        "Hari ini aku berulang tahun! Aku membawa satu stoples permen untuk teman-teman. Malosi menebak ada dua puluh. Halim menebak ada tiga puluh. Ayo kita hitung bersama!",
      tombol: "Ayo hitung! ➡",
    },
    {
      id: "cara",
      jenis: "pilih",
      cerita: "Permen di stoples banyak. Cara menghitung mana yang paling tepat dan cepat?",
      opsi: [
        {
          teks: "Mengelompokkan setiap sepuluh permen, lalu hitung sisanya",
          benar: true,
          umpan: "Betul! Kelompok sepuluh membuat hitungan lebih cepat dan lebih yakin.",
        },
        {
          teks: "Menebak saja, tidak perlu menghitung",
          benar: false,
          umpan: "Menebak boleh untuk latihan, tetapi kita harus membuktikan dengan menghitung.",
        },
        {
          teks: "Hanya menghitung permen yang kelihatan di depan stoples",
          benar: false,
          umpan: "Semua permen harus dihitung, termasuk yang di belakang.",
        },
      ],
    },
    {
      id: "sisa",
      jenis: "hitung",
      cerita:
        "Sudah ada dua kelompok sepuluh permen. Sekarang hitung sisa permen yang belum masuk kelompok. Ketuk satu per satu.",
      tanya: "Ada berapa permen sisa?",
      objek: "bola-merah",
      jumlah: 6,
      sukses: "Enam permen sisa. Dua puluh ditambah enam sama dengan dua puluh enam!",
      salah: "Hitung lagi sisa permennya satu per satu.",
    },
    {
      id: "total-tebak",
      jenis: "soal",
      cerita: "Permen di stoples sudah dihitung. Sekarang bandingkan dengan tebakan teman.",
      soal: [
        {
          teks: "2 kelompok sepuluh + 6 sisa = … permen",
          jawaban: "26",
          opsi: ["26", "24", "30"],
        },
        {
          teks: "Tebakan siapa lebih dekat ke 26?",
          jawaban: "Halim 30",
          opsi: ["Malosi 20", "Sama dekat", "Halim 30"],
        },
      ],
      sukses: "Betul! Dari 30 mundur ke 26 ada 4 langkah. Dari 20 maju ke 26 ada 6 langkah. Halim lebih dekat.",
      salah: "Ingat: puluhan dulu, lalu hitung jarak ke 26.",
    },
    {
      id: "banding",
      jenis: "pilih",
      cerita: "Aku punya 26 permen. Tika punya 32 permen. Permen siapa lebih banyak? Bandingkan puluhan dulu.",
      opsi: [
        {
          teks: "26 lebih banyak, karena 6 satuan lebih dari 2",
          benar: false,
          umpan: "Satuan tidak dibandingkan dulu. Lihat puluhan: 2 dan 3.",
        },
        {
          teks: "Sama banyak, karena keduanya puluhan dan satuan",
          benar: false,
          umpan: "Puluhannya berbeda. 3 lebih besar dari 2, jadi jumlahnya berbeda.",
        },
        {
          teks: "32 lebih banyak, karena 3 puluhan lebih dari 2 puluhan",
          benar: true,
          umpan: "Betul! Puluhan Tika lebih banyak, jadi 32 lebih besar dari 26.",
        },
      ],
    },
    {
      id: "urut",
      jenis: "soal",
      cerita: "Ada tiga kartu bilangan di meja: 21, 35, dan 12. Urutkan dari yang paling kecil.",
      soal: [
        {
          teks: "Urutan dari yang paling kecil adalah …",
          jawaban: "12, 21, 35",
          opsi: ["21, 12, 35", "35, 21, 12", "12, 21, 35"],
        },
        {
          teks: "Di antara 25 dan 28, yang lebih kecil adalah …",
          jawaban: "25",
          opsi: ["25", "28", "Sama"],
        },
      ],
      sukses: "Hebat! Puluhan dibandingkan dulu, lalu satuan. Kamu sudah bisa mengurutkan.",
      salah: "Lihat puluhan dulu. Bila puluhan sama, baru lihat satuan.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita:
        "Terima kasih! Stoples sudah dihitung, tebakan dibanding, dan kartu diurutkan. Kamu pandai membilang sampai lima puluh. Main lagi kalau mau.",
    },
  ],
};
