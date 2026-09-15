import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MUSIK1_BAB4 = "Bab 4: Mengenal Alat Musik Tradisional";

export const MODUL_MUSIK1_BAB4: ModulResmiPai = {
  id: "musik-1-bab4",
  judul: JUDUL_MUSIK1_BAB4,
  pola: /alat musik tradisional|angklung|apresiasi karya musik|mengenal alat musik/,
  motivasi:
    "Angklung digoyang, gendang dipukul, sasando dipetik, suling ditiup. Menjaga alat musik tradisi adalah rasa bangga sebagai anak Indonesia.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Ali dan Nia di ruang pajang melihat angklung bambu dari Jawa Barat.",
    "Angklung, gendang, dan sasando: bahan serta cara bermain.",
    "Anak mengapresiasi alat tradisi di sekolah serta di rumah.",
    "Siswa menjelaskan kulit gendang yang kencang dan memasangkan cara bermain.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Gendang adalah alat musik tradisional Indonesia yang terbuat dari rongga kayu yang ditutup oleh kulit hewan yang diregangkan kencang. Mengapa bagian ujungnya harus ditutup dengan kulit hewan yang kencang?
A) Supaya kayu gendang tidak cepat lapuk atau dimakan rayap.
B) Kulit hewan yang tegang akan menghasilkan getaran suara yang kuat dan menggema saat dipukul oleh telapak tangan.
C) Agar tampilan gendang terlihat berwarna-warni dan indah.
D) Supaya gendang bisa ditiup seperti suling.`,
    `[Soal 2 - PG - Tipe: HOTS]
Ali melihat alat bambu berbunyi indah saat digoyang. Alat itu paling tepat disebut...
A) Angklung, alat musik tradisional dari Jawa Barat.
B) Gendang yang dipukul dengan telapak.
C) Sasando yang dipetik.
D) Suling yang hanya ditiup.`,
    `[Soal 3 - PG - Tipe: HOTS]
Mempelajari alat musik tradisi adalah bukti kita bangga menjadi anak Indonesia karena...
A) Semua alat musik dunia sama saja.
B) Kita tidak boleh mengenal daerah lain.
C) Kita menjaga kekayaan budaya Nusantara dan berkebinekaan.
D) Angklung hanya boleh dilihat, tidak boleh dipelajari.`,
    `[Soal 4 - PG - Tipe: Reguler]
Angklung terbuat dari...
A) Besi tebal.
B) Bambu pilihan.
C) Kaca jendela.
D) Plastik botol saja.`,
    `[Soal 5 - PG - Tipe: Reguler]
Cara memainkan angklung yang tepat adalah...
A) Digoyang.
B) Ditiup kuat-kuat.
C) Digesek dengan busur.
D) Dilempar ke lantai.`,
    `[Soal 6 - PG - Tipe: Reguler]
Gendang atau kendang dimainkan dengan cara...
A) Digoyang seperti angklung.
B) Dipukul dengan telapak tangan.
C) Dipetik seperti sasando.
D) Ditiup seperti suling.`,
    `[Soal 7 - PG - Tipe: Reguler]
Sasando terbuat dari...
A) Hanya besi.
B) Hanya kaca.
C) Daun lontar dan bambu, dimainkan dengan dipetik.
D) Kulit hewan yang diregangkan saja.`,
    `[Soal 8 - PG - Tipe: Reguler]
Suling dimainkan dengan cara...
A) Ditiup.
B) Digoyang.
C) Dipukul.
D) Dipetik.`,
    `[Soal 9 - PG - Tipe: HOTS]
Bahan dan cara main alat tradisi berbeda-beda. Maksudnya...
A) Semua alat wajib digoyang.
B) Ada yang digoyang, dipukul, dipetik, atau ditiup sesuai bentuk dan bahannya.
C) Tidak ada alat dari bambu.
D) Gendang tidak boleh dipukul.`,
    `[Soal 10 - PG - Tipe: Reguler]
Angklung berasal dari daerah...
A) Jawa Barat, Indonesia.
B) Luar angkasa.
C) Hanya dari pabrik mainan luar negeri.
D) Tidak diketahui.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Angklung di Ruang Pajang",
      pengantar:
        "Di ruang pajang kebudayaan sekolah. Ali terpukau melihat alat musik bambu berjejer. Nia mengenalkan angklung dari Jawa Barat.",
      labelDaftar: "Percakapan Ali dan Nia tentang angklung",
      kolom: 1,
      item: [
        {
          nama: "Bambu yang digoyang",
          singkat: "Berbunyi indah",
          uraian:
            "Ali: Nia, lihat alat musik dari bambu ini! Bentuknya bergetar dan berbunyi indah sekali saat digoyang-goyang.",
          contoh: "Goyang bambu, bunyi indah.",
        },
        {
          nama: "Namanya angklung",
          singkat: "Jawa Barat",
          uraian:
            "Nia: Oh, itu namanya Angklung, Ali! Alat musik asli dari daerah Jawa Barat Indonesia. Dia terbuat dari bambu pilihan.",
          contoh: "Angklung dari Jawa Barat.",
        },
        {
          nama: "Bangga anak Indonesia",
          singkat: "Cara main berbeda",
          uraian:
            "Ada yang digoyang, dipukul, atau dipetik. Menjaga dan mempelajari alat musik tradisi adalah bukti kita bangga menjadi anak Indonesia.",
          contoh: "Goyang, pukul, petik. Bangga Indonesia.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Alat bambu yang digoyang itu namanya apa?",
          alias: ["angklung"],
        },
        {
          pertanyaan: "2. Angklung berasal dari daerah mana?",
          alias: ["jawa barat", "indonesia", "sunda"],
        },
        {
          pertanyaan: "3. Angklung dimainkan dengan cara apa?",
          alias: ["goyang", "digoyang"],
        },
      ],
      voice: [
        [
          "Di ruang pajang, Ali melihat alat bambu yang berbunyi indah saat digoyang.",
          "Nia berkata, Itu namanya angklung. Alat musik dari Jawa Barat, terbuat dari bambu pilihan.",
        ],
        [
          "Indonesia hebat. Ada alat yang digoyang, dipukul, atau dipetik. Mempelajari alat tradisi adalah rasa bangga sebagai anak Indonesia.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Angklung, Gendang, dan Sasando",
      pengantar:
        "Apresiasi musik tradisi memperkuat Profil Pelajar Pancasila yang berkebinekaan. Kenali bahan dan cara memainkannya.",
      labelDaftar: "Tiga alat, tiga cara",
      kolom: 1,
      item: [
        {
          nama: "Angklung",
          singkat: "Bambu, digoyang",
          uraian:
            "Terbuat dari bambu, dimainkan dengan cara digoyang. Tiap angklung bisa punya nada. Dimainkan bersama agar selaras.",
          contoh: "Angklung: goyang bambu.",
        },
        {
          nama: "Gendang / kendang",
          singkat: "Kayu dan kulit, dipukul",
          uraian:
            "Terbuat dari kayu dan kulit hewan. Kulit yang kencang bergetar kuat dan menggema saat dipukul telapak tangan.",
          contoh: "Gendang: pukul kulit yang kencang.",
        },
        {
          nama: "Sasando dan suling",
          singkat: "Petik dan tiup",
          uraian:
            "Sasando terbuat dari daun lontar dan bambu, dimainkan dengan dipetik jari. Suling dimainkan dengan ditiup.",
          contoh: "Sasando dipetik. Suling ditiup.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Gendang dimainkan dengan cara apa?",
          alias: ["pukul", "dipukul", "telapak"],
        },
        {
          pertanyaan: "2. Sasando dimainkan dengan cara apa?",
          alias: ["petik", "dipetik", "jari"],
        },
        {
          pertanyaan: "3. Suling dimainkan dengan cara apa?",
          alias: ["tiup", "ditiup"],
        },
      ],
      voice: [
        [
          "Angklung dari bambu, dimainkan dengan digoyang. Gendang dari kayu dan kulit, dimainkan dengan dipukul.",
        ],
        [
          "Sasando dari daun lontar dan bambu, dimainkan dengan dipetik. Suling dimainkan dengan ditiup. Kita jaga kekayaan musik Nusantara.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Bangga pada Musik Nusantara",
      pengantar:
        "Apresiasi dimulai dari mengenal, meniru cara main dengan aman, lalu menceritakan asalnya. Guru memandu di kelas. Orang tua menonton bersama di rumah.",
      labelDaftar: "Apresiasi di sekolah dan di rumah",
      kolom: 2,
      item: [
        {
          nama: "Pajang bunyi",
          singkat: "Untuk guru",
          uraian:
            "Tunjukkan gambar atau angklung mini. Gerakkan goyang, pukul, petik, tiup tanpa merusak alat. Diskusikan: mengapa kulit gendang harus kencang?",
          contoh: "Goyang. Pukul. Petik. Tiup.",
        },
        {
          nama: "Dengar dari rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Putar video singkat angklung atau gendang. Tanyakan: terbuat dari apa? Dimainkan bagaimana? Tanamkan rasa bangga, bukan menertawakan.",
          contoh: "Ini musik kita. Kita jaga.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Angklung terbuat dari apa?",
          alias: ["bambu"],
        },
        {
          pertanyaan: "2. Kulit gendang harus dalam keadaan...?",
          alias: ["kencang", "tegang", "rapat"],
        },
        {
          pertanyaan: "3. Mempelajari alat tradisi menandakan kita...?",
          alias: ["bangga", "indonesia", "jaga", "cinta"],
        },
      ],
      voice: [
        [
          "Di sekolah, kenali angklung, gendang, sasando, dan suling. Gerakkan sesuai cara mainnya: goyang, pukul, petik, tiup.",
        ],
        [
          "Di rumah, dengar musik tradisi bersama. Tanyakan bahannya dan cara mainnya. Kita bangga menjadi anak Indonesia.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Jelaskan mengapa kulit gendang harus kencang, lalu pasangkan alat dengan cara memainkannya.",
      labelDaftar: "Logika budaya dan klasifikasi cara main",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Logika budaya HOTS",
          uraian:
            "Ujung gendang ditutup kulit yang kencang supaya getaran kuat dan menggema saat dipukul. Bukan supaya tahan rayap atau sekadar warna-warni.",
          contoh: "Kulit kencang, getaran kuat.",
        },
        {
          nama: "Kelompok B",
          singkat: "Cara memainkan",
          uraian:
            "Angklung digoyang. Gendang dipukul. Suling ditiup.",
          contoh: "Goyang. Pukul. Tiup.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kulit gendang yang kencang berguna supaya apa?",
          alias: ["getar", "gema", "kuat", "bunyi", "pukul"],
        },
        {
          pertanyaan: "2. Angklung cara mainnya?",
          alias: ["goyang", "digoyang"],
        },
        {
          pertanyaan: "3. Gendang cara mainnya?",
          alias: ["pukul", "dipukul"],
        },
        {
          pertanyaan: "4. Suling cara mainnya?",
          alias: ["tiup", "ditiup"],
        },
      ],
      voice: [
        [
          "Kulit gendang harus kencang agar getaran suara kuat dan menggema saat dipukul telapak tangan.",
        ],
        [
          "Angklung digoyang. Gendang dipukul. Suling ditiup.",
        ],
      ],
    },
  ],
};
