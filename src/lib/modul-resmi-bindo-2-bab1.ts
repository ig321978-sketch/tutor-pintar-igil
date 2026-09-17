import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB1 = "Bab 1: Mengenal Perasaan";

export const MODUL_BINDO2_BAB1: ModulResmiPai = {
  id: "bindo-2-bab1",
  judul: JUDUL_BINDO2_BAB1,
  pola: /mengenal perasaan|roda perasaan|kamus kecil perasaan|emosi dan kosakata/,
  motivasi:
    "Semua perasaan normal. Gembira, bangga, sedih, dan marah boleh dirasakan. Ungkapkan dengan kata yang baik, huruf kapital yang benar, dan kosakata baru seperti girang serta gundah.",
  kunciJawaban: "B,C,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak di roda perasaan: senyum gembira, dada hangat, air mata, tinju mengepal.",
    "Detektif bahasa memperbaiki huruf kapital nama orang dan tempat.",
    "Anak mengerjakan evaluasi emosi, antonim, dan huruf kapital.",
    "Anak menarik garis, menggeser keranjang emosi, mengurutkan cerita, dan menulis di kanvas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Tono meremas kertas gambarnya karena tidak bisa menggambar mobil seindah gambar Made. Tangan Tono mengepal dan wajahnya cemberut. Perasaan yang sedang dialami oleh Tono adalah...
A) Bangga
B) Marah
C) Girang
D) Tenang`,
    `[Soal 2 - PG - Tipe: HOTS]
Perhatikan penulisan kalimat-kalimat di bawah ini! Penulisan kalimat yang paling benar sesuai penggunaan huruf kapital adalah...
A) Nia dan ali belajar di perpustakaan Kota Batam.
B) Nia dan Ali belajar di perpustakaan kota Batam.
C) Nia dan Ali belajar di Perpustakaan Kota Batam.
D) nia dan Ali belajar di Perpustakaan kota batam.`,
    `[Soal 3 - PG - Tipe: HOTS]
Kata "gundah" memiliki arti yang sama dengan "sangat gembira dan riang". Pernyataan ini...
A) Benar.
B) Salah; gundah artinya sedih dan gelisah.
C) Benar hanya di pagi hari.
D) Gundah sama dengan girang.`,
    `[Soal 4 - PG - Tipe: HOTS]
Huruf pertama nama bulan seperti Januari wajib ditulis huruf kapital. Pernyataan ini...
A) Salah.
B) Benar; nama bulan ditulis dengan huruf kapital.
C) Benar hanya untuk Desember.
D) Nama bulan selalu huruf kecil.`,
    `[Soal 5 - PG - Tipe: Reguler]
Girang artinya...
A) Takut sekali.
B) Sangat gembira atau gembira sekali.
C) Sedih dan gelisah.
D) Marah karena kalah.`,
    `[Soal 6 - PG - Tipe: Reguler]
Ngeri artinya...
A) Perasaan takut yang amat sangat.
B) Sangat gembira.
C) Huruf kapital awal kalimat.
D) Nama tempat.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kalimat "Adik menangis." memakai huruf kapital dengan...
A) Salah, harus "adik".
B) Salah, titik tidak perlu.
C) Benar; awal kalimat memakai huruf kapital.
D) Salah, harus tanda seru.`,
    `[Soal 8 - PG - Tipe: Reguler]
Lawan kata sedih yang paling tepat adalah...
A) Gundah.
B) Gembira atau girang.
C) Marah.
D) Ngeri.`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengenali perasaan diri dengan bahasa santun penting untuk kerukunan karena...
A) Teman paham isi hati kita tanpa kita memukul atau berteriak.
B) Supaya kita selalu menang.
C) Supaya huruf kapital hilang.
D) Supaya tidak perlu guru.`,
    `[Soal 10 - PG - Tipe: Reguler]
Huruf kapital wajib pada...
A) Tengah kata biasa.
B) Awal kalimat, nama orang, dan nama tempat.
C) Setiap huruf dalam kalimat.
D) Hanya tanda tanya.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Roda Perasaan Kita",
      pengantar:
        "Infografis roda perasaan: emosi nyaman (gembira, bangga) dan emosi menantang (sedih, marah). Semua perasaan normal. Ungkapkan dengan kata baik, jangan sakiti teman.",
      labelDaftar: "Emosi nyaman dan menantang",
      kolom: 1,
      item: [
        {
          nama: "Emosi nyaman",
          singkat: "Gembira dan bangga",
          uraian:
            "Gembira: senyum lebar, dada terasa hangat, ingin melompat. Bangga: tubuh tegap saat meraih prestasi, misalnya nilai bagus atau menolong teman.",
          contoh: "Dapat hadiah: gembira. Juara kelas: bangga.",
        },
        {
          nama: "Emosi menantang",
          singkat: "Sedih dan marah",
          uraian:
            "Sedih: air mata, ingin dipeluk, misalnya mainan rusak. Marah: tangan mengepal, jantung cepat, wajah cemberut. Marah boleh, memukul dan berteriak tidak boleh.",
          contoh: "Isakan pelan = sedih. Tinju mengepal = marah.",
        },
        {
          nama: "Cakrawala literasi",
          singkat: "Semua perasaan normal",
          uraian:
            "Tidak ada perasaan yang salah. Saat emosi menantang datang, tarik napas dalam, lalu ceritakan kepada guru atau orang tua dengan kalimat jujur dan tenang.",
          contoh: "Napas dulu, lalu bicara tenang.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika teman sebangku menunduk di atas meja dan terdengar isakan pelan, perasaan apa yang ia rasakan? Apa yang akan kamu katakan padanya?",
          alias: ["sedih", "menangis", "peluk", "baik", "kenapa", "bantu", "teman", "jangan sedih"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tuliskan lawan kata (antonim) dari perasaan SEDIH!",
        alias: ["gembira", "senang", "girang", "ceria", "bahagia", "riang"],
      },
      voice: [
        [
          "Halo sahabat literasi kelas 2 yang luar biasa! Pernahkah kalian merasa ingin melompat tinggi karena mendapat hadiah? Atau mungkin ingin menangis karena mainan kesayangan kalian rusak? Nah, semua itu disebut perasaan atau emosi.",
          "Di dalam dada kita, ada kompas perasaan yang berubah-ubah setiap hari. Kadang kompas itu menunjuk ke arah gembira, sedih, takut, bangga, atau marah. Ingat ya, tidak ada perasaan yang salah!",
          "Menjadi marah itu boleh, tetapi berteriak atau memukul itu yang tidak boleh. Cara terbaik saat emosi menantang datang adalah menarik napas dalam-dalam, lalu ceritakan kepada guru atau orang tua menggunakan kalimat yang jujur dan tenang.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kamus Kecil Perasaan",
      pengantar:
        "Infografis rambu huruf kapital: awal kalimat, nama orang, nama tempat. Kosakata baru: gundah artinya sedih gelisah, girang artinya sangat gembira.",
      labelDaftar: "Huruf kapital dan kosakata baru",
      kolom: 1,
      item: [
        {
          nama: "Rambu 1 dan 2",
          singkat: "Awal kalimat dan nama orang",
          uraian:
            "Huruf kapital seperti lampu lalu lintas. Menyala di awal kalimat: Kita harus selalu jujur. Juga pada nama orang: Ali, Nia, Made, Joko.",
          contoh: "Kita... Ali, Nia.",
        },
        {
          nama: "Rambu 3",
          singkat: "Nama tempat dan bulan",
          uraian:
            "Nama tempat memakai huruf kapital: Sekolah Nasional, Jakarta, Perpustakaan Kota Batam. Nama bulan juga: Senin, Januari.",
          contoh: "Jakarta. Hari Senin.",
        },
        {
          nama: "Aturan kamus",
          singkat: "Girang dan gundah",
          uraian:
            "Jangan hanya memakai kata senang. Girang atau ceria = sangat gembira. Gundah = sedih dan gelisah. Semakin kaya kosakata, cerita kita semakin indah.",
          contoh: "Girang ≠ gundah.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Perhatikan kalimat: kemarin nia bermain boneka di rumah joko. Huruf mana saja yang harus jadi huruf kapital? Mengapa?",
          alias: ["kemarin", "nia", "joko", "awal", "nama", "kapital", "besar"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Perbaikilah penulisan kalimat berikut sesuai aturan huruf kapital: hari senin ali merasa bangga.",
        alias: [
          "hari senin ali merasa bangga",
          "senin",
          "ali",
          "hari senin",
        ],
      },
      voice: [
        [
          "Anak-anak pintar kelas 2, sekarang kita akan menjadi detektif bahasa! Saat kita menuliskan cerita tentang perasaan kita, kita harus menggunakan aturan menulis yang benar.",
          "Salah satu aturan paling penting adalah huruf kapital atau huruf besar. Ia harus menyala terang di awal kalimat, pada huruf pertama nama diri, dan pada nama tempat.",
          "Selain itu, mari kita perkaya kosakata. Jangan hanya memakai kata senang terus-menerus. Kita bisa memakai kata girang atau ceria. Semakin banyak kosakata yang kamu tahu, tulisanmu akan semakin indah dibaca!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih emosi Tono dan penulisan huruf kapital, tentukan benar-salah gundah serta nama bulan, jodohkan girang-ngeri-kalimat, lalu jelaskan mengapa menyebut perasaan dengan santun menjaga kerukunan.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Emosi dan kapital",
          uraian:
            "Tinju mengepal dan wajah cemberut = marah. Penulisan benar: Nia dan Ali belajar di Perpustakaan Kota Batam. Gundah bukan gembira. Nama bulan wajib kapital.",
          contoh: "Marah. Perpustakaan Kota Batam. Gundah = sedih.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Kamus dan kerukunan",
          uraian:
            "Girang: sangat gembira. Ngeri: takut amat sangat. Adik menangis: kapital benar. Menyebut perasaan dengan santun membuat teman paham tanpa kita menyakiti.",
          contoh: "Girang. Ngeri. Santun menjaga rukun.",
        },
      ],
      kuis: [
        { pertanyaan: "Tono mengepal, perasaan?", alias: ["marah"] },
        { pertanyaan: "Penulisan Perpustakaan?", alias: ["nia", "ali", "batam"] },
        { pertanyaan: "Gundah sama dengan gembira?", alias: ["salah", "sedih"] },
        { pertanyaan: "Nama bulan kapital?", alias: ["benar"] },
        { pertanyaan: "Girang artinya?", alias: ["gembira"] },
        { pertanyaan: "Mengapa sebut perasaan?", alias: ["rukun", "santun", "teman"] },
      ],
      voice: [
        [
          "Marah itu tinju mengepal, bukan bangga. Tulis Nia, Ali, dan Perpustakaan Kota Batam dengan huruf kapital.",
        ],
        [
          "Gundah artinya sedih gelisah, bukan girang. Menyebut perasaan dengan kata santun menjaga kerukunan di kelas.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis perasaan ke tanda tubuh, geser kata ke keranjang nyaman atau menantang, urutkan cerita Nia, coretkan huruf girang, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Gembira: senyum hangat. Sedih: air mata. Marah: tinju mengepal. Nyaman: gembira, bangga, girang. Menantang: sedih, marah. Urutan Nia: mainan rusak, sedih, lalu napas dan cerita tenang.",
          contoh: "Tarik garis. Geser keranjang. Urutkan 1-2-3.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "G-I-R-A-N-G adalah girang. Semua perasaan normal: benar. Memukul saat marah: salah.",
          contoh: "Coretkan NG. BENAR lalu SALAH.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis perasaan?", alias: ["gembira", "sedih", "marah"] },
        { pertanyaan: "Keranjang emosi?", alias: ["nyaman", "menantang"] },
        { pertanyaan: "Urutan Nia?", alias: ["rusak", "sedih", "cerita"] },
        { pertanyaan: "Semua perasaan normal?", alias: ["benar"] },
        { pertanyaan: "Marah boleh memukul?", alias: ["salah"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan dua huruf terakhir G-I-R-A-__-__.",
        alias: ["girang", "ng"],
      },
      voice: [
        [
          "Anak-anak, ini permainan tanpa keyboard. Tarik garis dari perasaan ke tanda tubuh. Geser kata ke keranjang nyaman atau menantang.",
          "Urutkan cerita Nia dari mainan rusak sampai ia berbicara tenang. Coretkan huruf di kanvas untuk kata girang.",
          "Lalu jadi detektif: semua perasaan normal itu benar. Memukul teman saat marah itu salah.",
        ],
      ],
    },
  ],
};
