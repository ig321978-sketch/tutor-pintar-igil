import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MUSIK1_BAB2 = "Bab 2: Ketukan dan Irama";

export const MODUL_MUSIK1_BAB2: ModulResmiPai = {
  id: "musik-1-bab2",
  judul: JUDUL_MUSIK1_BAB2,
  pola: /ketukan dan irama|pulsa|tempo dasar|irama dan birama/,
  motivasi:
    "Pulsa seperti detak jantung: teratur dan stabil. Tempo adalah cepat atau lambatnya lagu. Ikuti musik, jangan balapan.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan Nia di aula mengikuti lagu bersemangat dengan ketukan kaki yang teratur.",
    "Pulsa sebagai detak stabil dan tempo cepat atau lambat.",
    "Anak menjaga ketukan bersama di sekolah serta di rumah.",
    "Siswa memilih tempo lambat untuk menidurkan bayi dan mencocokkan pulsa, tempo, melodi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Sebuah lagu dinyanyikan untuk menghibur adik bayi agar tertidur lelap di malam hari. Lagu tersebut sebaiknya dimainkan dengan...
A) Tempo sangat cepat dan suara yang berteriak lantang.
B) Tempo lambat, lembut, dan stabil (konstan).
C) Tempo yang berubah-ubah secara mendadak agar adik kaget.
D) Tanpa ketukan sama sekali.`,
    `[Soal 2 - PG - Tipe: HOTS]
Jika lagu berubah dari bersemangat menjadi seperti lagu pengantar tidur, ketukan kaki kita sebaiknya...
A) Semakin kacau dan tidak teratur.
B) Melambat, tetap teratur, mengikuti tempo baru.
C) Semakin cepat supaya tidak mengantuk.
D) Berhenti selamanya.`,
    `[Soal 3 - PG - Tipe: HOTS]
Pulsa disebut fondasi bermain musik kelompok karena...
A) Ketukan yang konstan membuat teman-teman tidak berantakan dan tidak fals ritmenya.
B) Pulsa membuat lagu otomatis menjadi sedih.
C) Pulsa hanya boleh dilakukan duduk diam.
D) Pulsa mengganti semua nada.`,
    `[Soal 4 - PG - Tipe: Reguler]
Pulsa (detak) adalah...
A) Cepat lambatnya lagu saja.
B) Rangkaian nada tinggi dan rendah.
C) Ketukan berulang yang konstan, teratur, dan stabil.
D) Nama alat musik bambu.`,
    `[Soal 5 - PG - Tipe: Reguler]
Tempo artinya...
A) Nama penyanyi.
B) Cepat lambatnya sebuah lagu dinyanyikan atau dimainkan.
C) Hanya tepuk tangan.
D) Warna bunyi sendok.`,
    `[Soal 6 - PG - Tipe: Reguler]
Tempo cepat biasanya memberi kesan...
A) Gembira, semangat, ceria.
B) Selalu sedih.
C) Selalu mengantuk.
D) Tanpa irama.`,
    `[Soal 7 - PG - Tipe: Reguler]
Contoh lagu bernuansa tempo lambat adalah...
A) Lagu yang selalu berteriak.
B) Lagu Nina Bobo.
C) Lagu yang berubah kacau tiap detik.
D) Hanya bunyi klakson.`,
    `[Soal 8 - PG - Tipe: Reguler]
Lagu Menanam Jagung biasanya terasa...
A) Sangat mengantuk.
B) Tanpa ketukan.
C) Bersemangat dan ceria, tempo lebih cepat.
D) Hanya untuk tidur siang.`,
    `[Soal 9 - PG - Tipe: HOTS]
Melodi berbeda dari pulsa karena melodi adalah...
A) Rangkaian nada tinggi dan rendah, bukan sekadar ketukan dasar.
B) Hanya hentakan kaki.
C) Nama lain tempo.
D) Botol berisi beras.`,
    `[Soal 10 - PG - Tipe: Reguler]
Ketukan kaki jangan terlalu cepat atau terlalu lambat dari musik supaya...
A) Kita tetap bersama pulsa lagu.
B) Lagu menjadi lebih pendek.
C) Teman tidak boleh mendengar.
D) Tempo hilang.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Kaki Ikut Lagu di Aula",
      pengantar:
        "Di aula sekolah. Siswa mendengarkan lagu anak-anak yang bersemangat. Kaki Ali ingin mengetuk lantai secara teratur.",
      labelDaftar: "Percakapan Ali dan Nia tentang pulsa dan tempo",
      kolom: 1,
      item: [
        {
          nama: "Kaki ingin mengetuk",
          singkat: "Ikut lagu",
          uraian:
            "Ali: Nia, lagu ini membuat kakiku ingin ikut bergerak mengetuk lantai mengikuti lagunya secara teratur.",
          contoh: "Ketuk lantai mengikuti lagu.",
        },
        {
          nama: "Itu namanya pulsa",
          singkat: "Seperti detak jantung",
          uraian:
            "Nia: Itu namanya Pulsa, Ali! Seperti detak jantung kita yang berdetak konstan dan stabil. Jangan sampai ketukan kakimu terlalu cepat atau terlalu lambat dari musiknya.",
          contoh: "Pulsa: teratur dan stabil.",
        },
        {
          nama: "Tempo bisa berubah",
          singkat: "Cepat atau lambat",
          uraian:
            "Jika lagu menjadi lambat seperti pengantar tidur, ketukan kaki juga melambat. Cepat lambatnya lagu dinamakan Tempo.",
          contoh: "Lagu lambat, ketukan melambat.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ketukan teratur seperti detak jantung disebut apa?",
          alias: ["pulsa", "detak"],
        },
        {
          pertanyaan: "2. Cepat lambatnya lagu disebut apa?",
          alias: ["tempo"],
        },
        {
          pertanyaan: "3. Jika lagu menjadi lambat, ketukan kaki harus apa?",
          alias: ["lambat", "melambat", "pelan"],
        },
      ],
      voice: [
        [
          "Di aula, lagu anak-anak membuat kaki Ali ingin mengetuk lantai secara teratur.",
          "Nia berkata, Itu namanya pulsa. Seperti detak jantung: konstan dan stabil. Jangan terlalu cepat atau terlalu lambat dari musik.",
        ],
        [
          "Kalau lagu berubah lambat seperti pengantar tidur, ketukan kaki juga melambat. Cepat lambatnya lagu dinamakan tempo.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Pulsa dan Tempo",
      pengantar:
        "Pulsa adalah fondasi ritme. Tempo memberi rasa gembira atau tenang. Keduanya dijaga agar permainan kelompok tidak berantakan.",
      labelDaftar: "Detak stabil, tempo cepat, tempo lambat",
      kolom: 1,
      item: [
        {
          nama: "Pulsa (detak)",
          singkat: "Konstan dan teratur",
          uraian:
            "Ketukan berulang yang konstan, teratur, dan stabil. Inilah fondasi agar anak tidak fals atau berantakan saat bermain musik kelompok.",
          contoh: "Tok. Tok. Tok. Jaraknya sama.",
        },
        {
          nama: "Tempo cepat",
          singkat: "Gembira dan semangat",
          uraian:
            "Tempo cepat memberi kesan gembira, semangat, ceria. Contoh: lagu Menanam Jagung. Kaki dan tepuk mengikuti tanpa mendahului.",
          contoh: "Cepat, tetap teratur.",
        },
        {
          nama: "Tempo lambat",
          singkat: "Tenang dan damai",
          uraian:
            "Tempo lambat memberi kesan tenang, sedih, atau damai. Contoh: lagu Nina Bobo. Cocok menidurkan bayi: lembut dan stabil.",
          contoh: "Lambat, lembut, konstan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Pulsa harus teratur atau kacau?",
          alias: ["teratur", "stabil", "konstan"],
        },
        {
          pertanyaan: "2. Lagu Nina Bobo temponya cenderung apa?",
          alias: ["lambat", "lembut", "tenang"],
        },
        {
          pertanyaan: "3. Lagu Menanam Jagung terasa bagaimana?",
          alias: ["cepat", "ceria", "semangat", "gembira"],
        },
      ],
      voice: [
        [
          "Pulsa adalah ketukan yang berulang, konstan, teratur, dan stabil. Seperti detak jantung.",
        ],
        [
          "Tempo adalah cepat atau lambatnya lagu. Tempo cepat terasa gembira, contoh Menanam Jagung. Tempo lambat terasa tenang, contoh Nina Bobo.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Jaga Ketukan Bersama",
      pengantar:
        "Pulsa dilatih dengan mendengar dulu, lalu bergerak bersama. Guru memandu di aula. Orang tua menemani di rumah.",
      labelDaftar: "Latihan pulsa dan tempo",
      kolom: 2,
      item: [
        {
          nama: "Jalan pulsa",
          singkat: "Untuk guru",
          uraian:
            "Putar lagu ceria, siswa mengetuk kaki atau tepuk pelan. Ganti lagu lambat. Diskusikan: apakah ketukan masih bersama? Jangan balapan.",
          contoh: "Dengar dulu. Ketuk bersama.",
        },
        {
          nama: "Nina Bobo di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Nyanyikan pelan lagu pengantar tidur sambil menepuk paha pelan. Tanyakan: kalau adik tidur, temponya cepat atau lambat?",
          contoh: "Lambat, lembut, stabil.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Saat bermain kelompok, ketukan jangan sampai apa?",
          alias: ["balapan", "kacau", "berantakan", "cepat sendiri"],
        },
        {
          pertanyaan: "2. Detak yang konstan disebut juga...?",
          alias: ["pulsa", "jantung"],
        },
        {
          pertanyaan: "3. Untuk menidurkan bayi, tempo yang tepat?",
          alias: ["lambat", "lembut", "stabil"],
        },
      ],
      voice: [
        [
          "Di sekolah, dengar lagu dulu. Ketuk kaki atau tepuk pelan bersama. Jika lagu melambat, ketukan ikut melambat.",
        ],
        [
          "Di rumah, nyanyikan lagu pengantar tidur dengan tempo lambat, lembut, dan stabil.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tempo yang aman untuk menidurkan bayi, lalu cocokkan pulsa, tempo, dan melodi.",
      labelDaftar: "Klasifikasi emosi-tempo dan mencocokkan istilah",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Emosi dan tempo",
          uraian:
            "Lagu pengantar tidur: tempo lambat, lembut, dan stabil. Bukan teriak cepat, bukan tempo yang tiba-tiba berubah agar bayi kaget.",
          contoh: "Lambat, lembut, konstan.",
        },
        {
          nama: "Kelompok B",
          singkat: "Mencocokkan irama",
          uraian:
            "Pulsa: ketukan dasar yang teratur dan stabil. Tempo: cepat lambatnya laju lagu. Melodi: rangkaian nada tinggi dan rendah.",
          contoh: "Pulsa. Tempo. Melodi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Lagu untuk menidurkan bayi temponya bagaimana?",
          alias: ["lambat", "lembut", "stabil", "konstan"],
        },
        {
          pertanyaan: "2. Pulsa artinya ketukan yang...?",
          alias: ["teratur", "stabil", "detak", "konstan"],
        },
        {
          pertanyaan: "3. Tempo artinya apa?",
          alias: ["cepat", "lambat", "laju"],
        },
        {
          pertanyaan: "4. Melodi adalah rangkaian nada yang...?",
          alias: ["tinggi", "rendah", "nada"],
        },
      ],
      voice: [
        [
          "Untuk menidurkan bayi, pilih tempo lambat, lembut, dan stabil. Jangan berteriak cepat atau mengubah tempo secara mendadak.",
        ],
        [
          "Pulsa adalah ketukan dasar yang teratur. Tempo adalah cepat lambatnya lagu. Melodi adalah rangkaian nada tinggi dan rendah.",
        ],
      ],
    },
  ],
};
