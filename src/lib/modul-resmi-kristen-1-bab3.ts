import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KRISTEN1_BAB3 = "Bab 3: Indahnya Alam Ciptaan Tuhan";

export const MODUL_KRISTEN1_BAB3: ModulResmiPai = {
  id: "kristen-1-bab3",
  judul: JUDUL_KRISTEN1_BAB3,
  pola:
    /indahnya alam|memelihara lingkungan|ciptaan tuhan/,
  motivasi:
    "Tuhan Yesus memelihara burung. Kita diberi tugas merawat bumi: siram tanaman, buang sampah pada tempatnya, jangan merusak karya seni Allah.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Nia dan Ali di kebun sekolah menunjuk burung kecil di dekat bunga.",
    "Anak menyiram tanaman layu dengan gembor kecil.",
    "Anak memasukkan bungkus plastik ke tempat sampah, teman menyiram pot kelas.",
    "Anak menolak memetik bunga untuk dibuang dan menolak melempar batu ke burung.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Sebagai anak yang diberikan tugas oleh Tuhan untuk menjaga bumi, tindakan kecil apa yang bisa kamu lakukan di lingkungan sekolah untuk memelihara ciptaan-Nya?
A) Memetik bunga-bunga di taman untuk dijadikan mainan lalu dibuang.
B) Membuang sampah plastik jajanan ke dalam tempat sampah dan ikut menyiram tanaman kelas.
C) Mengejar dan melempar batu ke arah burung yang sedang bertengger di pohon.
D) Membiarkan tanaman layu karena malas mengambil air.`,
    `[Soal 2 - PG - Tipe: HOTS]
Burung kecil tidak menanam padi, tetapi setiap hari bisa makan. Ali menjelaskan itu karena...
A) Tuhan Yesus memelihara mereka melalui alam yang menyediakan makanan.
B) Burung membeli nasi di kantin.
C) Burung mencuri bekal siswa.
D) Guru yang memberi padi setiap pagi.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kejadian 1:28 dan 2:15 mengingatkan manusia untuk...
A) Merusak bumi sesuka hati.
B) Membiarkan tanaman mati.
C) Mengusahakan dan memelihara bumi, bukan merusaknya.
D) Membuang sampah ke sungai.`,
    `[Soal 4 - PG - Tipe: Reguler]
Manusia disebut penatalayan atau steward ciptaan Allah. Artinya...
A) Kita pemilik yang boleh merusak.
B) Kita penjaga yang merawat titipan Tuhan.
C) Kita tidak perlu peduli tanaman.
D) Kita hanya menonton alam dari jendela.`,
    `[Soal 5 - PG - Tipe: Reguler]
Tanaman di kebun sekolah layu karena...
A) Tidak pernah disiram, maka kita mengambil air dan menyiramnya.
B) Tuhan lupa menciptakan air.
C) Burung yang jahat.
D) Bunga tidak suka anak-anak.`,
    `[Soal 6 - PG - Tipe: HOTS]
Membuang sampah sembarangan merusak karya seni Allah dan...
A) Membuat halaman lebih indah.
B) Mengabaikan kasih kepada teman yang butuh lingkungan bersih.
C) Membuat burung lebih gemuk.
D) Tidak ada hubungannya dengan iman.`,
    `[Soal 7 - PG - Tipe: Reguler]
Alam menyediakan apa yang dibutuhkan makhluk hidup karena...
A) Kebetulan saja.
B) Manusia yang membuat matahari.
C) Tuhan baik dan memelihara ciptaan-Nya.
D) Burung yang mengatur musim.`,
    `[Soal 8 - PG - Tipe: Reguler]
Tugas kecil di sekolah yang memelihara ciptaan adalah...
A) Menyiram tanaman kelas dan membuang sampah pada tempatnya.
B) Memetik semua bunga.
C) Melempar batu ke burung.
D) Menginjak rumput dengan sengaja.`,
    `[Soal 9 - PG - Tipe: HOTS]
Jika kita hanya kagum pada bunga tetapi tidak pernah menyiram yang layu, yang kurang adalah...
A) Kamera.
B) Tanggung jawab sebagai penatalayan.
C) Pupuk mahal dari toko.
D) Pagar yang lebih tinggi.`,
    `[Soal 10 - PG - Tipe: Reguler]
Nia melihat burung bernyanyi riang. Sikap yang tepat adalah...
A) Berterima kasih kepada Tuhan dan menjaga tempat hidupnya.
B) Menangkapnya untuk dikurung sempit.
C) Melempar batu supaya terbang ketakutan.
D) Memetik semua bunga di dekatnya.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Burung dan Bunga di Kebun Sekolah",
      pengantar:
        "Di kebun sekolah yang dipenuhi bunga mekar dan burung-burung berkicau.",
      labelDaftar: "Percakapan Nia dan Ali tentang pemeliharaan Tuhan",
      kolom: 1,
      item: [
        {
          nama: "Burung yang makan",
          singkat: "Tidak menanam padi",
          uraian:
            "Nia kagum: burung kecil tidak menanam padi, tetapi setiap hari makan dan bernyanyi. Ali menjawab: Tuhan Yesus memelihara mereka melalui alam yang menyediakan nektar dan ulat kecil.",
          contoh: "Tuhan memelihara. Alam menyediakan.",
        },
        {
          nama: "Tanaman yang layu",
          singkat: "Perlu disiram",
          uraian:
            "Nia melihat tanaman layu karena tidak pernah disiram. Kagum saja tidak cukup. Ada tugas yang menunggu tangan kita.",
          contoh: "Lihat yang layu. Jangan lewat saja.",
        },
        {
          nama: "Ayo ambil air",
          singkat: "Tugas manusia",
          uraian:
            "Tuhan menciptakan alam, tetapi memberi tugas kepada manusia untuk menjaga dan merawatnya. Ali mengajak Nia mengambil air dan menyiram.",
          contoh: "Ciptakan Tuhan. Rawat manusia.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang memelihara burung melalui alam?",
          alias: ["tuhan", "yesus", "allah"],
        },
        {
          pertanyaan: "2. Tanaman layu karena tidak pernah...?",
          alias: ["disiram", "siram", "air"],
        },
        {
          pertanyaan: "3. Tuhan memberi tugas kepada kita untuk... alam?",
          alias: ["jaga", "jaga", "rawat", "pelihara"],
        },
      ],
      voice: [
        [
          "Burung kecil tidak menanam padi, tetapi Tuhan Yesus memelihara mereka lewat bunga dan ulat kecil di alam.",
        ],
        [
          "Ada tanaman layu. Tuhan menciptakan alam, kita yang merawat. Ayo ambil air, siram bersama.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Penatalayan Bumi",
      pengantar:
        "Allah memberi wewenang mengusahakan dan memelihara bumi, bukan merusaknya. Merusak tanaman atau membuang sampah sembarangan berarti mengabaikan kasih.",
      labelDaftar: "Mandat budaya dan ekologi praktis anak Kristen",
      kolom: 1,
      item: [
        {
          nama: "Mengusahakan dan memelihara",
          singkat: "Kejadian 1:28; 2:15",
          uraian:
            "Mandat budaya: Allah memberi wewenang kepada manusia untuk mengusahakan dan memelihara bumi, bukan merusak secara serakah. Manusia adalah steward, penatalayan ciptaan.",
          contoh: "Jaga, jangan rusak.",
        },
        {
          nama: "Karya seni Allah",
          singkat: "Alam bukan sampah",
          uraian:
            "Tanaman, burung, tanah, dan air adalah karya seni Allah. Memetik bunga lalu membuangnya, atau melempar batu ke burung, merusak keindahan yang dipercayakan.",
          contoh: "Lihat. Kagumi. Jangan rusak.",
        },
        {
          nama: "Kasih yang kelihatan",
          singkat: "Sampah dan siraman",
          uraian:
            "Ekologi praktis anak: buang plastik jajanan ke tempat sampah, siram tanaman kelas, pikirkan teman yang butuh halaman bersih. Merusak lingkungan berarti kurang mengasihi sesama.",
          contoh: "Sampah ke bak. Air ke pot.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Manusia adalah penatalayan bumi. Artinya kita... ciptaan?",
          alias: ["jaga", "rawat", "pelihara"],
        },
        {
          pertanyaan: "2. Sampah plastik dibuang ke mana?",
          alias: ["tempat sampah", "tong", "bak"],
        },
        {
          pertanyaan: "3. Melempar batu ke burung: merawat atau merusak?",
          alias: ["merusak", "rusak"],
        },
      ],
      voice: [
        [
          "Kejadian dua ayat lima belas: Allah menempatkan manusia untuk mengusahakan dan memelihara taman, bukan merusaknya.",
        ],
        [
          "Buang plastik ke tempat sampah. Siram tanaman kelas. Jangan petik bunga untuk dibuang. Jangan lempar batu ke burung.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tangan Penjaga di Sekolah dan di Rumah",
      pengantar:
        "Tanggung jawab tumbuh dari melihat akibat: tanaman yang tidak disiram layu, sampah yang dibuang liar mengotori teman. Guru dan orang tua menuntun tangan kecil.",
      labelDaftar: "Latihan merawat ciptaan",
      kolom: 2,
      item: [
        {
          nama: "Piket kebun",
          singkat: "Untuk guru",
          uraian:
            "Jadwalkan dua anak menyiram pot kelas dan memeriksa bak sampah. Diskusikan: jika semua memetik bunga, apa yang terjadi minggu depan? Jika semua menyiram, apa yang terjadi?",
          contoh: "Siram. Buang sampah. Amati akibat.",
        },
        {
          nama: "Satu tanaman titipan",
          singkat: "Untuk orang tua",
          uraian:
            "Pilih satu tanaman di rumah atau satu tugas buang sampah. Ajak anak melihat burung atau pohon, lalu berdoa singkat: Tuhan, ajar kami merawat. Jangan memetik tanaman tetangga tanpa izin.",
          contoh: "Satu tanaman. Satu doa. Satu bak sampah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di sekolah, plastik jajanan dibuang ke...?",
          alias: ["tempat sampah", "tong", "bak"],
        },
        {
          pertanyaan: "2. Tanaman kelas perlu...?",
          alias: ["disiram", "siram", "air"],
        },
        {
          pertanyaan: "3. Bumi ini titipan dari...?",
          alias: ["tuhan", "allah"],
        },
      ],
      voice: [
        [
          "Di sekolah, buang sampah ke bak, siram pot kelas, jangan petik bunga untuk mainan lalu dibuang.",
        ],
        [
          "Di rumah, rawat satu tanaman dan buang sampah pada tempatnya. Berdoa: Tuhan, ajar kami merawat ciptaan-Mu.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih tindakan kecil di sekolah yang memelihara bumi titipan Tuhan.",
      labelDaftar: "Pilihan ganda etika lingkungan",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Tugas kecil menjaga bumi",
          uraian:
            "Tindakan tepat: buang sampah plastik ke tempat sampah dan ikut menyiram tanaman kelas. Bukan memetik bunga lalu membuang, bukan melempar batu ke burung.",
          contoh: "Sampah ke bak. Siram pot.",
        },
        {
          nama: "Ingat steward",
          singkat: "Jaga, jangan rusak",
          uraian:
            "Anak Tuhan merawat karya seni Allah. Tugas kecil yang konsisten lebih berharga daripada kagum tanpa tindakan.",
          contoh: "Kagum lalu bertindak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tugas kecil menjaga bumi di sekolah: buang sampah dan...?",
          alias: ["siram", "menyiram", "tanaman"],
        },
      ],
      voice: [
        [
          "Di sekolah, buang plastik jajanan ke tempat sampah dan siram tanaman kelas. Itu tugas kecil menjaga bumi.",
        ],
        [
          "Jangan petik bunga untuk dibuang. Jangan lempar batu ke burung. Tuhan menugaskan kita merawat, bukan merusak.",
        ],
      ],
    },
  ],
};
