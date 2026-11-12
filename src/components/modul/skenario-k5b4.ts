import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 4 (Keliling Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b4.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B4A: Pagar dan Bingkai (keliling sebagai jalur tepi, pagar, bingkai, dibedakan dari isi)
 *  - SKENARIO_K5B4B: Bendera Pita Segitiga (jumlah tiga sisi, sama sisi dikali 3, sama kaki tetap dijumlah)
 */

export const SKENARIO_K5B4A: DefSkenario = {
  id: "pagar-bingkai-k5b4",
  judul: "Pagar dan Bingkai",
  latar: "Bantu Ayah dan Ibu menghitung panjang pagar dan bingkai.",
  tokoh: "👨",
  nama: "Ayah",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Ayah. Aku ingin memasang pagar di tepi kebun berbentuk persegi panjang, 6 m dan 4 m. Ibu juga sedang membuat bingkai foto. Ayo bantu kami menghitung kelilingnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kayu",
      jenis: "pilih",
      cerita: "Ayah membeli kayu untuk pagar kebun. Panjang kayu yang dibutuhkan sama dengan …",
      opsi: [
        { teks: "banyak petak rumput di dalam kebun, yaitu isi", benar: false, umpan: "Petak rumput di dalam itu isi. Pagar dipasang di tepi, jadi yang dihitung panjang di tepi." },
        { teks: "banyak sudut kebun", benar: false, umpan: "Banyak sudut tidak memberi panjang kayu. Pagar memanjang di sepanjang tepi kebun." },
        { teks: "jumlah panjang semua sisi di tepi, yaitu keliling", benar: true, umpan: "Betul! Pagar mengelilingi tepi, jadi panjang kayunya sama dengan jumlah panjang semua sisi." },
      ],
    },
    {
      id: "hitung-pagar",
      jenis: "soal",
      cerita: "Ayah menghitung panjang pagar.",
      soal: [
        { teks: "Kebun Ayah 6 m dan 4 m. Panjang pagar seluruhnya adalah … meter.", jawaban: "20", opsi: ["10", "20", "24"] },
        { teks: "Kebun lain berbentuk persegi, sisinya 3 m. Panjang pagarnya adalah … meter.", jawaban: "12", opsi: ["9", "12", "6"] },
      ],
      sukses: "Hebat! Jumlahkan semua sisi di tepi sampai kembali ke awal.",
      salah: "Hmm, berjalanlah di tepi dan jumlahkan semua sisinya. Coba lagi.",
    },
    {
      id: "ruas",
      jenis: "hitung",
      cerita: "Pagar kebun 6 m dan 4 m dipasang dengan ruas sepanjang 1 meter. Tiap ruas diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa ruas pagar yang mengelilingi kebun?",
      objek: "stik",
      jumlah: 20,
      sukses: "Betul! Ada 20 ruas, sama dengan 6 + 4 + 6 + 4 = 20 meter.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "bingkai",
      jenis: "isi",
      cerita: "Ibu membuat bingkai foto berbentuk persegi, sisinya 3 cm. Masukkan satu stik untuk tiap sentimeter kayu bingkai di seluruh tepi.",
      objek: "stik",
      target: 12,
      maks: 20,
      sukses: "Pas! 3 + 3 + 3 + 3 = 12 cm kayu. Itulah keliling bingkai.",
      kurang: "Stiknya masih sedikit. Bingkai punya empat sisi, tiap sisi 3 cm.",
      lebih: "Stiknya kebanyakan. Jumlahkan empat sisi yang masing-masing 3 cm.",
    },
    {
      id: "bandingkan",
      jenis: "pilih",
      cerita: "Ibu menggambar dua bangun di kertas berpetak. Bangun pertama 5 petak panjang dan 3 petak lebar, bangun kedua 6 petak panjang dan 2 petak lebar. Jalur tepinya 16 cm dan 16 cm, isinya 15 petak dan 12 petak. Pernyataan yang benar adalah …",
      opsi: [
        { teks: "jalur tepinya sama, tetapi isinya berbeda", benar: true, umpan: "Betul! Jalur tepi dan isi adalah dua hal yang berbeda. Jalur sama belum tentu isinya sama." },
        { teks: "isinya sama karena jalur tepinya sama", benar: false, umpan: "Isinya 15 dan 12, jadi tidak sama. Jalur tepi tidak menentukan isi." },
        { teks: "jalur tepinya berbeda karena isinya berbeda", benar: false, umpan: "Jalur tepi keduanya 16 cm, sama. Jalur dihitung dari sisi di tepi, bukan dari isi." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Keliling adalah panjang jalur di tepi bangun, dihitung dengan menjumlah semua sisi sampai kembali ke awal. Pagar dan bingkai memakai keliling, sedangkan isi dihitung dengan petak di dalam.",
    },
  ],
};

export const SKENARIO_K5B4B: DefSkenario = {
  id: "bendera-pita-k5b4",
  judul: "Bendera Pita Segitiga",
  latar: "Bantu Asep menghitung panjang pita di tepi bendera segitiga.",
  tokoh: "👦",
  nama: "Asep",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Asep. Aku membuat bendera berbentuk segitiga untuk lomba sekolah. Pita dipasang di tepi bendera. Ayo bantu aku menghitung panjang pita!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "hitung-pita",
      jenis: "soal",
      cerita: "Asep menghitung pita di tepi bendera.",
      soal: [
        { teks: "Bendera pertama bersisi 5 cm, 4 cm, dan 7 cm. Panjang pita di tepinya adalah … cm.", jawaban: "16", opsi: ["15", "16", "9"] },
        { teks: "Bendera sama sisi bersisi 5 cm. Panjang pita di tepinya adalah … cm.", jawaban: "15", opsi: ["10", "15", "25"] },
      ],
      sukses: "Hebat! Jumlahkan ketiga sisinya, atau kalikan 3 bila ketiga sisinya sama.",
      salah: "Hmm, berjalanlah di tepi dan jumlahkan ketiga sisinya. Coba lagi.",
    },
    {
      id: "alasan",
      jenis: "pilih",
      cerita: "Asep menghitung bendera sama sisi dengan 3 × 5. Mengapa boleh dikali 3?",
      opsi: [
        { teks: "karena ketiga sisinya sama panjang", benar: true, umpan: "Betul! Menjumlah tiga sisi yang sama panjang sama dengan mengalikannya dengan 3." },
        { teks: "karena segitiga hanya punya tiga sudut", benar: false, umpan: "Banyak sudut tidak menentukan cara hitung. Yang menentukan adalah panjang sisinya." },
        { teks: "karena semua segitiga boleh dikali 3", benar: false, umpan: "Tidak semua. Bila sisinya berbeda panjang, dikali 3 memberi hasil yang salah." },
      ],
    },
    {
      id: "pita-enam",
      jenis: "hitung",
      cerita: "Bendera sama sisi bersisi 6 cm. Tiap sentimeter pita diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa sentimeter pita di tepi bendera?",
      objek: "stik",
      jumlah: 18,
      sukses: "Betul! Ada 18 sentimeter pita, sama dengan 3 × 6 = 18.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "siku",
      jenis: "isi",
      cerita: "Bendera siku-siku bersisi 3 cm, 4 cm, dan 5 cm. Masukkan satu stik untuk tiap sentimeter pita di seluruh tepi.",
      objek: "stik",
      target: 12,
      maks: 20,
      sukses: "Pas! 3 + 4 + 5 = 12 cm pita. Itulah keliling bendera.",
      kurang: "Stiknya masih sedikit. Jumlahkan ketiga sisi: 3, 4, dan 5.",
      lebih: "Stiknya kebanyakan. Jumlahkan ketiga sisi: 3, 4, dan 5.",
    },
    {
      id: "kaki",
      jenis: "pilih",
      cerita: "Bendera sama kaki bersisi 6 cm, 6 cm, dan 4 cm. Asep ingin langsung dikali 3. Bagaimana yang benar?",
      opsi: [
        { teks: "boleh dikali 3 karena ada sisi yang sama", benar: false, umpan: "Dikali 3 memberi 18, padahal sisi ketiga hanya 4 cm. Hanya dua sisi yang sama." },
        { teks: "cukup mengambil satu sisi saja", benar: false, umpan: "Satu sisi bukan seluruh pita. Pita melewati ketiga sisi." },
        { teks: "tidak boleh, jumlahkan ketiga sisinya satu per satu", benar: true, umpan: "Betul! Sama kaki tetap dijumlahkan: kelilingnya 16 cm." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Keliling segitiga adalah jumlah ketiga sisinya. Bila ketiga sisi sama panjang, boleh dikali 3. Pada segitiga sama kaki tetap dijumlahkan, dan sisi yang belum diketahui diukur dulu sebelum dijumlahkan.",
    },
  ],
};
