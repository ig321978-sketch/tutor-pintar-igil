import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { MISI_MTK1_BAB8, kuisDariMisi } from "@/lib/misi-kebun-mtk-1";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB8 = "Bab 8: Mengenal Diagram";

export const MODUL_MTK1_BAB8: ModulResmiPai = {
  id: "mtk-1-bab8",
  judul: JUDUL_MTK1_BAB8,
  pola: /mengenal\s+diagram|kantin sekolah yang berantakan|toko grosir tupi|bereskan kantin/,
  motivasi:
    "Sari, Adi, dan tupai Tupi membereskan kantin. Mereka mengelompokkan gelas, piring, dan sendok, lalu membacanya lewat diagram gambar.",
  kunciJawaban: "A,A,C,A,C,B,B,C,C,C",
  sketsaKartu: [
    "Sari dan Adi mengelompokkan gelas, piring, dan sendok bersama Tupi di kantin.",
    "Cara membuat dan membaca piktogram, lalu membandingkan dua baris.",
    "Tupi merapikan sepuluh rak kantin: jumlah, selisih, dan arti satu gambar.",
    "Poin penting dan lembar evaluasi mengenal diagram.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: LOTS]
Benda ini: apel, pisang, apel, pisang, apel, apel. Setelah dikelompokkan, jumlahnya...
A) Apel 4, pisang 2
B) Apel 2, pisang 4
C) Apel 6, pisang 0
D) Apel 3, pisang 3`,
    `[Soal 2 - PG - Tipe: LOTS]
Pada piktogram, setiap gambar biasanya mewakili...
A) 1 benda
B) 10 benda
C) Nama orang
D) Warna saja`,
    `[Soal 3 - PG - Tipe: LOTS]
Gelas 6, piring 4, sendok 8. Yang paling banyak adalah...
A) Gelas
B) Piring
C) Sendok
D) Sama banyak`,
    `[Soal 4 - PG - Tipe: LOTS]
Dari diagram itu, yang paling sedikit adalah...
A) Piring
B) Sendok
C) Gelas
D) Semua sama`,
    `[Soal 5 - PG - Tipe: HOTS]
Sendok ada 8 dan piring ada 4. Selisihnya adalah...
A) 12
B) 2
C) 4
D) 8`,
    `[Soal 6 - PG - Tipe: HOTS]
Ikan ada 6. Kura-kura ada 4. Ikan lebih banyak sebanyak...
A) 10
B) 2
C) 4
D) 6`,
    `[Soal 7 - PG - Tipe: HOTS]
Baris piktogram yang salah adalah baris yang...
A) Gambarnya sejenis
B) Isinya gambar bercampur
C) Disusun dari kiri
D) Punya judul`,
    `[Soal 8 - PG - Tipe: HOTS]
Kucing 4 ekor dan anjing 6 ekor. Jumlah hewan semuanya...
A) 2
B) 24
C) 10
D) 4`,
    `[Soal 9 - PG - Tipe: HOTS]
Satu gambar mewakili 2 biskuit. Ada 3 gambar. Jumlah biskuit sebenarnya...
A) 3
B) 5
C) 6
D) 2`,
    `[Soal 10 - PG - Tipe: HOTS]
Roti 5, susu 3, cokelat 7. Stok yang paling banyak adalah...
A) Roti
B) Susu
C) Cokelat
D) Sama banyak`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Kantin Sekolah yang Berantakan",
      pengantar:
        "Tumpukan gelas, piring, dan sendok dibereskan dengan mengelompokkan dulu, lalu digambar menjadi piktogram.",
      labelDaftar: "Kelompokkan, hitung, lalu gambar",
      kolom: 1,
      item: [
        {
          nama: "Kelompokkan dulu",
          singkat: "Satu jenis, satu kotak",
          uraian:
            "Gelas masuk kotak gelas, piring masuk kotak piring, sendok masuk kotak sendok. Gelas ada 6, piring ada 4, dan sendok ada 8.",
          contoh: "Sendok paling banyak karena barisnya paling panjang.",
        },
        {
          nama: "Piktogram",
          singkat: "Satu gambar sama dengan satu benda",
          uraian:
            "Diagram gambar menunjukkan data dengan ikon. Piring paling sedikit. Selisih sendok dan piring adalah 8 dikurangi 4, yaitu 4.",
          contoh: "Kantin rapi karena bendanya dikelompokkan lalu digambar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Hewan apa yang paling banyak di diagram ini?",
          alias: ["kelinci"],
        },
        {
          pertanyaan: "Rahasia Tupi: apa yang dilakukan dulu?",
          alias: ["kelompokkan", "kelompok"],
        },
        {
          pertanyaan: "Tuliskan kata kelompokkan.",
          alias: ["kelompokkan", "kelompok"],
        },
        {
          pertanyaan: "Gelas dimasukkan ke kotak apa?",
          alias: ["gelas"],
        },
        {
          pertanyaan: "Tuliskan kata gelas.",
          alias: ["gelas"],
        },
        {
          pertanyaan: "Sendok ada berapa?",
          alias: ["8", "delapan"],
        },
        {
          pertanyaan: "Tuliskan angka banyak gelas.",
          alias: ["6", "enam"],
        },
        {
          pertanyaan: "Baris yang paling panjang adalah benda apa?",
          alias: ["sendok"],
        },
        {
          pertanyaan: "Setiap gambar sama dengan berapa benda? Tuliskan angkanya.",
          alias: ["1", "satu"],
        },
        {
          pertanyaan: "Benda apa yang paling sedikit?",
          alias: ["piring"],
        },
        {
          pertanyaan: "Tuliskan 8 - 4 = 4.",
          alias: ["8 - 4 = 4", "8-4=4"],
        },
        {
          pertanyaan: "Siapa yang mengajari Sari dan Adi?",
          alias: ["tupi"],
        },
        {
          pertanyaan: "Tuliskan nama Tupi.",
          alias: ["tupi"],
        },
      ],
      voice: [
        [
          "Kalau benda berserakan, kelompokkan dulu menurut jenisnya.",
          "Gelas ada enam, piring ada empat, sendok ada delapan.",
          "Piktogram memakai gambar. Satu gambar mewakili satu benda.",
          "Baris terpanjang berarti paling banyak. Baris terpendek berarti paling sedikit.",
          "Delapan dikurangi empat sama dengan empat.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Ayo Bikin Diagram!",
      pengantar:
        "Satu jenis satu kotak. Setiap gambar mewakili satu benda, kecuali jika judulnya menulis nilai yang lain.",
      labelDaftar: "Membaca, membandingkan, dan membuat piktogram",
      kolom: 1,
      item: [
        {
          nama: "Empat pertanyaan",
          singkat: "Banyak, sedikit, jumlah, selisih",
          uraian:
            "Lihat baris terpanjang untuk yang paling banyak dan baris terpendek untuk yang paling sedikit. Jumlahkan semua untuk total. Kurangkan dua angka untuk selisih.",
          contoh: "Apel 7, anggur 5, pisang 3. Jumlahnya 15. Selisih apel dan pisang adalah 4.",
        },
        {
          nama: "Nilai ikon",
          singkat: "Tanya dulu, satu gambar mewakili berapa",
          uraian:
            "Kalau satu gambar mewakili dua benda, kalikan jumlah gambar dengan dua. Diagram dan tabel angka menunjukkan data yang sama.",
          contoh: "Tiga gambar biskuit kali dua sama dengan enam biskuit.",
        },
      ],
      kuis: [
        {
          pertanyaan: "Pasangkan apel, wortel, pisang, dan brokoli dengan kelompoknya.",
          alias: ["buah", "sayur"],
        },
        {
          pertanyaan: "Susun segitiga 4 dan segi empat 2 pada diagram.",
          alias: ["4", "2"],
        },
        {
          pertanyaan: "Baris mana yang gambarnya bercampur?",
          alias: ["ikan"],
        },
        {
          pertanyaan: "Kucing 4 dan anjing 6. Jumlah semuanya berapa?",
          alias: ["10", "sepuluh"],
        },
      ],
      voice: [
        [
          "Satu jenis, satu kotak. Hitung isi setiap kotak.",
          "Piktogram punya judul, label, dan gambar yang sejenis pada satu baris.",
          "Lihat dulu, hitung kemudian. Baris terpanjang paling banyak.",
          "Enam dikurangi empat sama dengan dua.",
          "Selalu tanya, satu gambar mewakili berapa.",
        ],
      ],
    },
        {
      kode: "C",
      judul: "C. Misi Bereskan Kantin",
      pengantar:
        "Bantu Tupi merapikan 10 rak kantin. Hijau untuk menghitung, biru untuk membaca, kuning untuk menulis, dan ungu untuk membandingkan.",
      labelDaftar: "Sepuluh rak diagram di kantin",
      kolom: 1,
      item: [
        {
          nama: "Alur permainan",
          singkat: "Pilih rak, jawab, dapat bintang",
          uraian:
            "Siswa memilih satu rak kantin. Tupi menanyakan baris terpanjang, selisih, atau arti satu gambar. Jawaban benar mendapat 1 bintang kantin. Jawaban yang belum tepat mendapat petunjuk, tanpa kehilangan stiker.",
          contoh: "Apel 7 paling banyak. Jumlah 7 + 3 + 5 = 15. Selisih 4. Tiga gambar yang masing-masing mewakili 2 benda sama dengan 6.",
        },
        {
          nama: "Stiker ajaib",
          singkat: "3, 2, atau 1 stiker",
          uraian:
            "Jawaban pertama benar mendapat 3 stiker ajaib. Benar setelah satu petunjuk mendapat 2 stiker. Benar setelah dua petunjuk mendapat 1 stiker. Belum tepat tidak mengurangi stiker. Siswa boleh mencoba lagi.",
          contoh: "Satu jenis, satu baris. Satu gambar, satu benda, kecuali judulnya bilang lain.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK1_BAB8),
      voice: [
        [
          "Tupi membereskan kantin sekolah. Ada sepuluh rak dari gelas sampai diagram.",
          "Apel tujuh, pisang tiga, anggur lima. Yang paling banyak tujuh. Jumlah semuanya lima belas. Selisihnya empat.",
          "Ikan enam lebih banyak daripada kura-kura empat.",
          "Tiga gambar biskuit, dan satu gambar mewakili dua biskuit, jadi jumlahnya enam.",
          "Jawaban benar mendapat satu bintang kantin. Jika belum tepat, Tupi memberi petunjuk. Stiker tidak berkurang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar:
        "Satu jenis satu kotak. Satu gambar satu benda. Baris terpanjang berarti paling banyak.",
      labelDaftar: "Evaluasi mengenal diagram",
      kolom: 1,
      item: [
        {
          nama: "Yang perlu diingat",
          singkat: "Data harus benar dari awal",
          uraian:
            "Baris rapi dari kiri ke kanan. Jumlahkan untuk total dan kurangkan untuk selisih. Selalu tulis judul. Kalau satu ikon mewakili dua benda, kalikan.",
          contoh: "Satu gambar sama dengan satu benda.",
        },
      ],
      kuis: [
        { pertanyaan: "Berapa jumlah bunga matahari?", alias: ["6", "enam"] },
        { pertanyaan: "Hewan apa yang paling banyak?", alias: ["anjing"] },
        { pertanyaan: "Apakah kucing dan ikan sama banyak?", alias: ["salah"] },
        { pertanyaan: "Buat diagram apel 5, pisang 2, anggur 4.", alias: ["5", "2", "4"] },
        { pertanyaan: "Berapa selisih pensil 8 dan krayon 3?", alias: ["5", "lima"] },
        { pertanyaan: "Pasangkan susu, biskuit, jus, dan roti dengan kelompoknya.", alias: ["minuman", "makanan"] },
        { pertanyaan: "Kendaraan apa yang paling sedikit?", alias: ["bus"] },
        { pertanyaan: "Ubah cupcake 6 dan donat 4 menjadi tabel.", alias: ["6", "4"] },
        { pertanyaan: "Empat ikon susu, satu ikon sama dengan dua benda. Jumlah sebenarnya?", alias: ["8"] },
        { pertanyaan: "Merah paling banyak dan hijau paling sedikit. Diagram mana yang benar?", alias: ["merah", "5"] },
      ],
      voice: [
        [
          "Satu jenis, satu kotak.",
          "Satu gambar sama dengan satu benda.",
          "Baris rapi, dari kiri ke kanan.",
          "Baris terpanjang sama dengan paling banyak.",
          "Jumlah semuanya ditambahkan. Selisihnya dikurangkan.",
          "Selalu pakai judul.",
          "Data harus benar dari awal.",
        ],
      ],
    },
  ],
};
