import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK2_BAB8 = "Bab 8: Berbagai Diagram";
export const JUDUL_MTK2_BAB8_LAMA = "Bab 8: Diagram Gambar Sederhana";

export const MODUL_MTK2_BAB8: ModulResmiPai = {
  id: "mtk-2-bab8",
  judul: JUDUL_MTK2_BAB8,
  pola:
    /bab\s*8[:.]\s*berbagai diagram|berbagai diagram|diagram gambar sederhana|papan prestasi sani|ranger igil|tabel turus satwa|taman safari ranger|kino dan lala|kakaktua koko|membaca piktogram|kunci membaca piktogram|banyaknya air/,
  motivasi:
    "Hore! Kamu sudah bantu Ranger IGIL mencatat satwa di Taman Safari. Ikat setiap 5 garis turus. Bandingkan menara gambar. Kurangkan untuk mencari selisih.",
  kunciJawaban: "C,C,B,B,A,A,B,A,A,A",
  sketsaKartu: [
    "Ranger IGIL, Kino, dan Lala mencatat rusa dan zebra dengan turus. Satu ikatan miring bernilai 5.",
    "Kakaktua Koko membaca diagram gambar pisang, wortel, dan apel. Menara tertinggi paling banyak.",
    "Sepuluh misi logistik satwa di pos komando Ranger IGIL memakai tabel turus dan diagram gambar.",
    "Lembar juara tabel turus dan diagram gambar. Hitung ikatan lima, bandingkan petak, cari selisih.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Keranjang 12 buah. Apel 1 ikat lima, Jeruk 4 garis. Turus Mangga supaya total 12...
A) 2 garis tegak
B) 4 garis tegak
C) 3 garis tegak`,
    `[Soal 2 - PG - Tipe: HOTS]
Bola 6, Boneka 5, Mobil 8. Datang 3 siswa memilih Boneka. Paling banyak...
A) Bola (6)
B) Boneka (8)
C) Boneka dan Mobil-mobilan sama banyak (8)`,
    `[Soal 3 - PG - Tipe: HOTS]
Baris A: 5 semangka besar renggang. Baris B: 7 stroberi kecil rapat. Di petak resmi...
A) Semangka lebih banyak karena barisnya panjang
B) Stroberi lebih banyak karena jumlahnya 7
C) Keduanya sama banyak`,
    `[Soal 4 - PG - Tipe: HOTS]
Sepak bola 2 ikat (10), Renang 7, Bulu tangkis 4. Selisih paling banyak dan paling sedikit...
A) 3 siswa
B) 6 siswa
C) 14 siswa`,
    `[Soal 5 - PG - Tipe: MOTS]
Kucing 8, Ikan 5, Burung 3. Pasangan yang tepat...
A) Ikan+Burung=8, Kucing-Ikan=3, yang 5=Ikan
B) Ikan+Burung=5, Kucing-Ikan=8
C) yang 5=Burung`,
    `[Soal 6 - PG - Tipe: HOTS]
Dodi menulis 8 garis tegak tanpa ikatan lima. Ranger IGIL bilang belum tepat. Perkataan Ranger...
A) Benar
B) Salah
C) Sama saja`,
    `[Soal 7 - PG - Tipe: HOTS]
2 ikatan lima dan 3 garis tegak. Jumlahnya...
A) 10
B) 13
C) 15`,
    `[Soal 8 - PG - Tipe: LOTS]
Kue cokelat 7, kue keju 5. Tambah berapa keju supaya sama...
A) 2
B) 3
C) 12`,
    `[Soal 9 - PG - Tipe: HOTS]
Buku cerita 2 ikatan lima dan 4 garis. Angkanya...
A) 14
B) 9
C) 24`,
    `[Soal 10 - PG - Tipe: MOTS]
Pensil 4, penghapus 3, penggaris 2. Jumlah seluruhnya...
A) 9
B) 7
C) 5`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar Taman Safari",
      pengantar:
        "🗺️ Halo penjaga hutan cilik! Bersama Ranger IGIL kita mencatat satwa memakai turus dan diagram gambar.",
      labelDaftar: "Dua sub-bab taman safari",
      kolom: 1,
      item: [
        {
          nama: "📏 8.1 Mengenal dan membaca diagram turus",
          singkat: "1 ikatan = 5",
          uraian:
            "Turus adalah garis tegak untuk menghitung satu per satu. Setiap hitungan kelima, tarik garis miring mengikat empat garis tegak. 7 rusa = 1 ikat lima dan 2 garis.",
          contoh: "||||/ = 5. ||||/ || = 7.",
        },
        {
          nama: "🖼️ 8.2 Menyusun dan membaca diagram gambar",
          singkat: "1 gambar = 1 benda",
          uraian:
            "Setiap 1 gambar mewakili 1 benda, disusun di petak sama besar. Menara tertinggi paling banyak. Selisih = data banyak dikurangi data sedikit.",
          contoh: "Pisang 8, wortel 5, selisih 3.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Satu ikatan garis miring pada turus bernilai berapa?",
          alias: ["lima", "5"],
        },
        {
          pertanyaan: "2. Pisang 8, wortel 5, apel 6. Buah paling sedikit?",
          alias: ["wortel"],
        },
        {
          pertanyaan: "3. Kakaktua 6, merak 4. Selisihnya?",
          alias: ["2", "dua"],
        },
      ],
      voice: [
        [
          "Halo penjaga hutan cilik! Hari ini kita akan mencatat jumlah hewan di Taman Safari bersama Ranger IGIL menggunakan Turus.",
          "Turus adalah garis tegak untuk menghitung satu per satu. Ingat aturannya: setiap hitungan kelima, kita buat satu garis miring mengikat empat garis tegak supaya menjadi satu ikatan lima!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Turus dan Diagram Gambar",
      pengantar:
        "📊 Hitung lompat lima pada ikatan turus. Pindahkan ke petak diagram gambar. Kurangkan untuk selisih.",
      labelDaftar: "Dua infografis",
      kolom: 1,
      item: [
        {
          nama: "📏 Cara cepat membaca turus",
          singkat: "Lompat lima, lalu satuan",
          uraian:
            "1 garis tegak = 1. 1 ikatan turus = 5. 1 ikat + 3 garis = 8. 2 ikat + 2 garis = 12.",
          contoh: "2 ikatan penuh tanpa sisa = 10.",
        },
        {
          nama: "🔄 Turus jadi diagram gambar",
          singkat: "Jumlahnya sama",
          uraian:
            "Hitung turus, lalu isi petak sebanyak itu. Selisih = terbanyak dikurangi paling sedikit. Total = gabungan semua kolom.",
          contoh: "Kura-kura 1 ikat + 1 garis = 6 petak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 2 ikatan turus penuh, berapa jumlahnya?",
          alias: ["sepuluh", "10"],
        },
        {
          pertanyaan: "2. Mencari selisih: ditambah atau dikurangkan?",
          alias: ["kurangkan", "dikurangi", "kurang"],
        },
        {
          pertanyaan: "3. 1 ikatan turus ditambah 4 garis. Jumlahnya?",
          alias: ["9", "sembilan"],
        },
      ],
      voice: [
        [
          "Perhatikan cara cepat membaca turus ini! Kita tidak perlu menghitung garisnya satu-satu dari awal. Cukup hitung lompat lima untuk setiap ikatan turus, lalu tambahkan garis satuannya!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Misi Penyelamatan dan Logistik Satwa",
      pengantar:
        "🦁 Di Taman Safari kita membagikan makanan dan menyiapkan kandang berdasarkan data turus dan diagram gambar.",
      labelDaftar: "Sepuluh misi pos komando",
      kolom: 1,
      item: [
        {
          nama: "🍌 Makanan dan pengunjung",
          singkat: "Baca turus dulu",
          uraian:
            "1 ikat + 3 garis = 8 pisang. Anak-anak 9 lebih banyak dari dewasa 5. Turus 6 = 1 ikat + 1 garis.",
          contoh: "Elang paling sedikit. Bebek 4 lebih banyak dari angsa.",
        },
        {
          nama: "🦁 Catatan satwa",
          singkat: "2 ikat + 1 = 11",
          uraian:
            "Turus 11 rusa sudah benar. Bunga merah paling banyak. Kucing 4 + kelinci 3 = 7. Jerapah 7. Domba 9 paling tinggi.",
          contoh: "Lingkari kolom yang paling tinggi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 1 ikatan lima dan 3 garis. Berapa pisang?",
          alias: ["8", "delapan"],
        },
        {
          pertanyaan: "2. Anak-anak 9, dewasa 5. Siapa lebih banyak?",
          alias: ["anak-anak", "anak", "anak anak"],
        },
        {
          pertanyaan: "3. Turus 1 ikat lima dan 1 garis bernilai?",
          alias: ["6", "enam"],
        },
      ],
      voice: [
        [
          "Selamat datang di permainan Misi Penyelamatan dan Logistik Satwa Ranger IGIL! Di Taman Safari, kita harus membagikan makanan dan menyiapkan kandang berdasarkan data Tabel Turus dan Diagram Gambar.",
          "Jika datamu tepat, semua satwa akan kenyang dan kita mendapat Lencana Pelindung Satwa!",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "📝 Sepuluh soal ketelitian. Hitung ikatan turus dan amati petak diagram dengan cermat.",
      labelDaftar: "Evaluasi HOTS turus dan diagram gambar",
      kolom: 1,
      item: [
        {
          nama: "🧠 Lengkapi data dan jebakan spasi",
          singkat: "Total 12, hitung petak",
          uraian:
            "Apel 5 + jeruk 4 = 9, mangga 3. Boneka 5+3=8 sama dengan mobil. Stroberi 7 lebih banyak meski barisnya pendek.",
          contoh: "Selisih 10 dan 4 = 6.",
        },
        {
          nama: "🔗 Pasangan, turus, total",
          singkat: "Ikat lima",
          uraian:
            "Ikan+burung=8, kucing-ikan=3, yang 5=ikan. 8 garis tanpa ikatan belum tepat. 2 ikat + 3 = 13. Keju butuh 2. Buku 14. Alat tulis 9.",
          contoh: "4 + 3 + 2 = 9.",
        },
      ],
      kuis: [
        { pertanyaan: "1. Mangga supaya total 12, berapa garis?", alias: ["3", "tiga"] },
        { pertanyaan: "2. Boneka plus 3 siswa, paling banyak?", alias: ["sama", "8", "boneka dan mobil"] },
        { pertanyaan: "3. 5 semangka renggang vs 7 stroberi rapat, mana lebih banyak?", alias: ["stroberi", "7"] },
        { pertanyaan: "4. Selisih 10 dan 4?", alias: ["6", "enam"] },
        { pertanyaan: "5. Ikan plus burung?", alias: ["8", "delapan"] },
        { pertanyaan: "6. 8 garis tanpa ikatan, Ranger benar?", alias: ["benar"] },
        { pertanyaan: "7. 2 ikat lima dan 3 garis?", alias: ["tiga belas", "13"] },
        { pertanyaan: "8. 7 cokelat dan 5 keju, tambah berapa?", alias: ["dua", "2"] },
        { pertanyaan: "9. 2 ikat lima dan 4 garis?", alias: ["14"] },
        { pertanyaan: "10. 4 + 3 + 2?", alias: ["9"] },
      ],
      voice: [
        [
          "Luar biasa, Ranger Cilik! Sebelum kita mulai Lembar Evaluasi Siswa, mari kita ingat kembali tiga kalimat kunci tentang Tabel Turus dan Diagram Gambar!",
        ],
        [
          "Sekarang waktunya menguji ketelitianmu di Lembar Evaluasi Siswa Bab 8! Ada 10 soal HOTS tentang Tabel Turus dan Diagram Gambar. Hitung ikatan turusnya dan amati petak diagramnya dengan cermat ya!",
        ],
      ],
    },
  ],
};
