import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB7 = "Bab 7: Mari Mengenal Malaikat-Malaikat Allah";

export const MODUL_PAI2_BAB7: ModulResmiPai = {
  id: "pai-2-bab7",
  judul: JUDUL_PAI2_BAB7,
  pola: /mengenal malaikat|malaikat-malaikat allah|sepuluh nama malaikat|10 nama malaikat/,
  motivasi:
    "Malaikat terbuat dari nur, tidak pernah durhaka. Iman kepada malaikat adalah rukun iman kedua. Hafalkan sepuluh nama dan tugasnya, terutama Raqib dan Atid yang mencatat amal.",
  kunciJawaban: "B,B,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Makhluk cahaya yang taat, tidak makan dan tidak pernah durhaka.",
    "Sepuluh kartu tugas malaikat dari Jibril sampai Ridwan.",
    "Anak mengerjakan evaluasi nama dan tugas malaikat.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Iman kepada malaikat-malaikat Allah merupakan pilar rukun iman yang wajib diyakini oleh setiap muslim. Peta urutan Rukun Iman kepada malaikat adalah yang ke...
A) Kesatu
B) Kedua
C) Ketiga
D) Kelima`,
    `[Soal 2 - PG - Tipe: HOTS]
Setiap kali Nia hendak menyontek saat ujian, ia langsung membatalkan niat buruknya karena ingat bahwa ada malaikat yang selalu mencatat amal buruk manusia, yaitu Malaikat...
A) Raqib
B) Atid
C) Ridwan
D) Mikail`,
    `[Soal 3 - PG - Tipe: HOTS]
Malaikat Jibril bertugas menurunkan hujan dan membagikan rezeki. Pernyataan ini...
A) Benar.
B) Salah; yang membagi rezeki dan hujan adalah Mikail. Jibril menyampaikan wahyu.
C) Benar hanya di musim hujan.
D) Jibril dan Mikail tugasnya sama.`,
    `[Soal 4 - PG - Tipe: HOTS]
Mengimani Munkar dan Nakir membuat kita rajin beribadah sebelum ajal tiba. Pernyataan ini...
A) Salah.
B) Benar; mereka akan bertanya di alam kubur, jadi kita siapkan amal dari sekarang.
C) Benar hanya untuk orang tua.
D) Munkar dan Nakir menjaga surga.`,
    `[Soal 5 - PG - Tipe: Reguler]
Malaikat Ridwan menjaga...
A) Pintu neraka.
B) Pintu surga yang indah.
C) Sangkakala.
D) Hujan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Malaikat Izrail bertugas...
A) Mencabut nyawa makhluk hidup.
B) Menjaga surga.
C) Menurunkan wahyu.
D) Mencatat senyuman.`,
    `[Soal 7 - PG - Tipe: Reguler]
Malaikat Israfil bertugas...
A) Membagi rezeki.
B) Menjaga neraka.
C) Meniup terompet sangkakala hari kiamat.
D) Bertanya di kubur.`,
    `[Soal 8 - PG - Tipe: Reguler]
Malaikat terbuat dari...
A) Tanah.
B) Nur atau cahaya.
C) Api.
D) Air.`,
    `[Soal 9 - PG - Tipe: HOTS]
Iman kepada Raqib dan Atid membuat anak jujur meski guru tidak melihat karena...
A) Mereka mencatat amal baik dan buruk, jadi kita malu berbuat curang.
B) Mereka menjaga pintu neraka.
C) Mereka menurunkan hujan.
D) Mereka meniup sangkakala.`,
    `[Soal 10 - PG - Tipe: Reguler]
Iman kepada malaikat adalah rukun iman yang...
A) Kesatu.
B) Kedua.
C) Keenam.
D) Keempat.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Hakikat Mengimani Malaikat Allah",
      pengantar:
        "Infografis makhluk cahaya yang taat: terbuat dari nur, gaib, tidak makan-minum, tidak punya nafsu, tidak pernah melanggar. Iman kepada malaikat adalah rukun iman kedua.",
      labelDaftar: "Bahan, sifat, dan ketaatan malaikat",
      kolom: 1,
      item: [
        {
          nama: "Bahan ciptaan",
          singkat: "Nur, cahaya",
          uraian:
            "Allah menciptakan malaikat dari nur atau cahaya. Manusia dari tanah. Karena dari cahaya, malaikat suci, tidak makan, tidak tidur, dan tidak lelah.",
          contoh: "Malaikat = nur / cahaya.",
        },
        {
          nama: "Sifat utama",
          singkat: "Gaib, tanpa nafsu",
          uraian:
            "Malaikat makhluk gaib: mata kita tidak melihatnya, tetapi mereka dekat dan sibuk menjalankan perintah Allah. Mereka tidak punya hawa nafsu seperti manusia.",
          contoh: "Tidak terlihat, tetap dekat.",
        },
        {
          nama: "Ketaatan mutlak",
          singkat: "Tidak pernah durhaka",
          uraian:
            "Malaikat selalu patuh dan tidak pernah melanggar. Iman kepada mereka adalah rukun iman kedua: kita wajib percaya meski tidak melihat wujudnya.",
          contoh: "Rukun iman ke-2.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika manusia bisa berbuat salah karena punya hawa nafsu, mengapa malaikat tidak pernah sekalipun membangkang atau berbuat dosa kepada Allah?",
          alias: ["nafsu", "cahaya", "nur", "taat", "patuh", "tidak punya nafsu", "suci"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Malaikat ciptaan Allah SWT terbuat dari ........................ (Cahaya / Nur).",
        alias: ["nur", "cahaya", "nur cahaya", "cahaya nur"],
      },
      voice: [
        [
          "Anak-anak soleh yang disayangi Allah, di dunia ini ada makhluk yang sangat suci dan tidak pernah berbuat dosa sama sekali. Siapakah mereka? Ya, mereka adalah malaikat-malaikat Allah. Allah menciptakan malaikat dari nur atau cahaya.",
          "Berbeda dengan manusia yang terbuat dari tanah, malaikat tidak membutuhkan makan, tidak tidur, dan tidak memiliki rasa lelah. Malaikat juga makhluk gaib, artinya tidak bisa dilihat oleh mata kita.",
          "Namun, mereka sangat dekat dengan kita dan selalu sibuk menjalankan perintah Allah tanpa pernah membantah sedikit pun. Mengimani malaikat artinya kita percaya mereka ada dan selalu mengawasi tingkah laku kita.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Sepuluh Nama Malaikat dan Tugasnya",
      pengantar:
        "Infografis kartu tugas: Jibril wahyu, Mikail rezeki dan hujan, Israfil sangkakala, Izrail nyawa, Raqib amal baik, Atid amal buruk, Munkar dan Nakir di kubur, Malik neraka, Ridwan surga.",
      labelDaftar: "Sepuluh nama dan tugas",
      kolom: 1,
      item: [
        {
          nama: "Empat tugas besar",
          singkat: "Jibril, Mikail, Israfil, Izrail",
          uraian:
            "Jibril menyampaikan wahyu. Mikail membagi rezeki dan menurunkan hujan. Israfil meniup sangkakala. Izrail mencabut nyawa. Jumlah malaikat tidak terhitung, tetapi sepuluh nama ini wajib diketahui.",
          contoh: "Wahyu, rezeki, sangkakala, nyawa.",
        },
        {
          nama: "Pencatat dan penanya",
          singkat: "Raqib, Atid, Munkar, Nakir",
          uraian:
            "Di kanan-kiri kita ada Raqib yang mencatat senyuman dan bantuan, serta Atid yang mencatat bohong atau marah. Munkar dan Nakir akan bertanya di alam kubur.",
          contoh: "Raqib baik. Atid buruk.",
        },
        {
          nama: "Penjaga akhirat",
          singkat: "Malik dan Ridwan",
          uraian:
            "Malik menjaga pintu neraka. Ridwan menjaga pintu surga. Supaya Ridwan menyambut kita, biasakan jujur, salat, dan beramal salih sejak kecil.",
          contoh: "Ridwan: pintu surga.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Malaikat apa yang bertugas menjaga pintu surga? Dan sifat apa yang harus kita miliki agar bisa disambut oleh malaikat tersebut?",
          alias: ["ridwan", "jujur", "salih", "salat", "baik", "iman", "surga"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Malaikat yang bertugas mencatat amal buruk atau perbuatan dosa yang dilakukan manusia adalah Malaikat ........................",
        alias: ["atid", "atid", "'atid", "malaikat atid"],
      },
      voice: [
        [
          "Anak-anak yang pintar, jumlah malaikat Allah itu sangat banyak, bahkan tidak terhitung! Namun, sebagai muslim yang baik, kita wajib mengetahui sepuluh nama malaikat beserta tugas-tugas penting mereka.",
          "Ada Malaikat Jibril yang bertugas menyampaikan wahyu, dan Malaikat Mikail yang membagikan rezeki serta menurunkan hujan yang berkah.",
          "Nah, coba perhatikan, di sebelah kanan dan kirimu, ada dua malaikat setia yang tidak pernah pergi. Mereka adalah Raqib dan Atid. Raqib mencatat setiap senyuman dan bantuanmu, sedangkan Atid mencatat jika ada kata-kata bohong atau kemarahanmu. Karena selalu diawasi, yuk kita perbanyak amal salih!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih urutan rukun iman dan nama pencatat amal buruk, tentukan benar-salah tugas Jibril, jodohkan Ridwan-Izrail-Israfil, lalu jelaskan mengapa Raqib dan Atid membuat kita jujur.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Urutan dan tugas",
          uraian:
            "Iman kepada malaikat: rukun iman kedua. Pencatat amal buruk: Atid. Jibril bukan pembagi hujan, itu Mikail. Iman kepada Munkar dan Nakir membuat kita siapkan ibadah, benar.",
          contoh: "Kedua. Atid. Mikail hujan. Siapkan amal.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Jodoh dan karakter",
          uraian:
            "Ridwan menjaga surga. Izrail mencabut nyawa. Israfil meniup sangkakala. Raqib dan Atid mencatat, jadi kita jujur meski guru tidak melihat.",
          contoh: "Surga. Nyawa. Sangkakala. Jujur.",
        },
      ],
      kuis: [
        { pertanyaan: "Rukun iman ke berapa?", alias: ["kedua", "dua", "ke-2"] },
        { pertanyaan: "Pencatat amal buruk?", alias: ["atid"] },
        { pertanyaan: "Jibril membagi hujan?", alias: ["salah", "mikail"] },
        { pertanyaan: "Munkar Nakir di kubur?", alias: ["benar"] },
        { pertanyaan: "Ridwan menjaga?", alias: ["surga"] },
        { pertanyaan: "Raqib Atid membuat kita?", alias: ["jujur", "disiplin"] },
      ],
      voice: [
        [
          "Malaikat dari nur, rukun iman kedua. Atid mencatat amal buruk. Mikail yang membagi hujan, bukan Jibril.",
        ],
        [
          "Ridwan menjaga surga, Izrail mencabut nyawa, Israfil meniup sangkakala. Karena Raqib dan Atid mencatat, kita jujur meski sendiri.",
        ],
      ],
    },
  ],
};
