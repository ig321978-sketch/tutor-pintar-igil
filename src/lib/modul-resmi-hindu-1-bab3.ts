import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_HINDU1_BAB3 = "Bab 3: Mengenal Sembahyang";

export const MODUL_HINDU1_BAB3: ModulResmiPai = {
  id: "hindu-1-bab3",
  judul: JUDUL_HINDU1_BAB3,
  pola: /mengenal sembahyang|kramaning|trisandya|tri hita karana/,
  motivasi:
    "Sembahyang menghubungkan atman dengan Hyang Widhi. Bunga suci, dupa menuntun doa, Tirta menyucikan. Cuci tangan, kaki, dan kumur sebelum duduk tenang.",
  kunciJawaban: "B,A,C,B,A,B,C,A,B,A",
  sketsaKartu: [
    "Made memakai kamen dan udeng di depan Sanggah sore hari.",
    "Bunga harum dan dupa menyala sebagai sarana suci.",
    "Anak merapatkan telapak di dada saat Kramaning Sembah.",
    "Anak mencuci tangan dan kaki sebelum sembahyang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Saat melaksanakan persembahyangan Kramaning Sembah, posisi telapak tangan kita dirapatkan di depan dada atau di atas dahi. Makna dari merapatkan kedua telapak tangan tersebut adalah...
A) Cara agar tangan kita tidak terasa dingin saat malam hari.
B) Simbol persatuan hati, pikiran, dan ucapan yang suci untuk memuja Hyang Widhi Wasa.
C) Tanda bahwa kita ingin segera mengakhiri doa.
D) Agar cepat selesai lalu bermain.`,
    `[Soal 2 - PG - Tipe: Reguler]
Sarana yang menghasilkan asap harum sebagai penuntun doa adalah...
A) Dupa.
B) Mainan.
C) Batu.
D) Es krim.`,
    `[Soal 3 - PG - Tipe: Reguler]
Air suci yang dipercikkan ke kepala dan diminum setelah sembahyang disebut...
A) Air keran biasa tanpa makna.
B) Susu.
C) Tirta.
D) Embun saja.`,
    `[Soal 4 - PG - Tipe: Reguler]
Bunga atau canang dilambangkan sebagai...
A) Mainan kelas.
B) Kesucian pikiran dan keindahan batin.
C) Penutup doa agar cepat selesai.
D) Penghangat tangan.`,
    `[Soal 5 - PG - Tipe: HOTS]
Mengapa sebelum duduk tenang kita mencuci tangan, kaki, dan berkumur?
A) Agar badan dan pikiran suci, hormat kepada Hyang Widhi, doa lebih khusyuk.
B) Agar kedinginan.
C) Agar cepat mengakhiri doa.
D) Agar tidak perlu membawa bunga.`,
    `[Soal 6 - PG - Tipe: Reguler]
Sembahyang adalah media penghubung...
A) Teman dan mainan.
B) Atman, jiwa manusia, dengan Paramatman, Hyang Widhi Wasa.
C) Hanya pakaian saja.
D) Hanya dupa tanpa doa.`,
    `[Soal 7 - PG - Tipe: Reguler]
Trisandya sore yang dilakukan Made adalah waktu...
A) Bermain bola.
B) Tidur siang.
C) Memuja keagungan Hyang Widhi agar jiwa dilindungi.
D) Membeli kue.`,
    `[Soal 8 - PG - Tipe: Reguler]
Pakaian Made saat ke Sanggah adalah...
A) Kain kamen dan ikat kepala udeng yang rapi.
B) Pakaian bola.
C) Tanpa kain.
D) Jas hujan.`,
    `[Soal 9 - PG - Tipe: Reguler]
Asap dupa yang membumbung tinggi melambangkan...
A) Api dapur.
B) Saksi persembahan dan penuntun pikiran agar terpusat kepada Yang Kuasa.
C) Asap sampah.
D) Tanda doa selesai.`,
    `[Soal 10 - PG - Tipe: Reguler]
Sembahyang rutin mengajarkan...
A) Kedisiplinan spiritual.
B) Cara mengakhiri doa secepatnya.
C) Menghangatkan tangan saja.
D) Memetik bunga sembarangan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Trisandya di Sanggah",
      pengantar:
        "Di depan tempat suci keluarga, Sanggah atau Merajan, sore hari. Made rapi memakai kain kamen dan udeng.",
      labelDaftar: "Percakapan Ali dan Made tentang sembahyang",
      kolom: 1,
      item: [
        {
          nama: "Pakaian suci",
          singkat: "Kamen dan udeng",
          uraian:
            "Made tidak pergi bermain. Ia melaksanakan Sembahyang Trisandya sore, memuja Hyang Widhi agar jiwa selalu dilindungi.",
          contoh: "Rapi. Sembahyang. Bukan pergi main.",
        },
        {
          nama: "Bunga harum",
          singkat: "Kesucian hati",
          uraian:
            "Sarana sederhana: bunga yang harum. Bunga melambangkan kesucian hati yang dipersembahkan.",
          contoh: "Bunga = hati yang suci.",
        },
        {
          nama: "Dupa menyala",
          singkat: "Doa ke langit",
          uraian:
            "Asap dupa mengantarkan doa ke atas langit, menuntun pikiran agar terpusat.",
          contoh: "Asap dupa menuntun doa.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Made melaksanakan Sembahyang... sore?",
          alias: ["trisandya"],
        },
        {
          pertanyaan: "2. Bunga melambangkan kesucian...?",
          alias: ["hati", "pikiran", "batin"],
        },
        {
          pertanyaan: "3. Asap yang menuntun doa berasal dari...?",
          alias: ["dupa"],
        },
      ],
      voice: [
        [
          "Made memakai kamen dan udeng. Ia sembahyang Trisandya sore di Sanggah, memuja Hyang Widhi.",
        ],
        [
          "Bunga harum lambang hati suci. Asap dupa mengantar doa ke langit.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Atman, Sarana, dan Kramaning Sembah",
      pengantar:
        "Sembahyang menghubungkan atman dengan Paramatman. Bunga, dupa, dan Tirta adalah sarana dasar. Telapak rapat: hati, pikiran, ucapan suci.",
      labelDaftar: "Esensi dan sarana sembahyang",
      kolom: 1,
      item: [
        {
          nama: "Tatwaning bakti",
          singkat: "Jiwa kepada Tuhan",
          uraian:
            "Sembahyang menghubungkan atman dengan Hyang Widhi. Rutin dilatih agar jiwa disiplin dan terlindungi.",
          contoh: "Jiwa bertemu Tuhan lewat doa.",
        },
        {
          nama: "Bunga, dupa, Tirta",
          singkat: "Tiga sarana",
          uraian:
            "Bunga: kesucian pikiran. Dupa: saksi dan penuntun doa. Tirta: air suci untuk menyucikan badan dan pikiran, dipercik dan diminum.",
          contoh: "Bunga suci. Dupa menuntun. Tirta menyucikan.",
        },
        {
          nama: "Telapak rapat",
          singkat: "Kramaning Sembah",
          uraian:
            "Telapak di dada atau dahi: persatuan hati, pikiran, dan ucapan yang suci. Bukan penghangat tangan, bukan tanda ingin cepat selesai. Sebelum duduk: cuci tangan, kaki, dan berkumur.",
          contoh: "Rapatkan. Sucikan dulu. Jangan buru-buru.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Telapak rapat: persatuan hati, pikiran, dan... suci?",
          alias: ["ucapan", "kata"],
        },
        {
          pertanyaan: "2. Asap harum penuntun doa berasal dari...?",
          alias: ["dupa"],
        },
        {
          pertanyaan: "3. Air suci setelah sembahyang disebut...?",
          alias: ["tirta"],
        },
      ],
      voice: [
        [
          "Sembahyang menghubungkan jiwa kita dengan Hyang Widhi. Bunga suci, dupa menuntun, Tirta menyucikan.",
        ],
        [
          "Telapak dirapatkan: hati, pikiran, dan ucapan bersatu. Sebelum duduk, cuci tangan, kaki, dan berkumur.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Sembahyang di Sekolah dan di Rumah",
      pengantar:
        "Kramaning Sembah dilatih rapi dan suci. Guru memandu di Pura sekolah. Orang tua menemani di Sanggah.",
      labelDaftar: "Latihan sarana dan kesucian",
      kolom: 2,
      item: [
        {
          nama: "Nama sarana",
          singkat: "Untuk guru",
          uraian:
            "Tunjukkan bunga, dupa, dan Tirta tanpa menyalakan api berlebihan. Anak menyebut nama dan makna. Latih merapatkan telapak dan jelaskan artinya.",
          contoh: "Sebut sarana. Rapatkan. Jangan buru-buru.",
        },
        {
          nama: "Cuci sebelum doa",
          singkat: "Untuk orang tua",
          uraian:
            "Sebelum Trisandya, dampingi anak mencuci tangan, kaki, dan berkumur. Tanyakan: mengapa badan harus suci sebelum menghadap Hyang Widhi?",
          contoh: "Cuci. Kumur. Baru duduk tenang.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebelum sembahyang kita mencuci tangan, kaki, dan...?",
          alias: ["berkumur", "kumur"],
        },
        {
          pertanyaan: "2. Air suci disebut...?",
          alias: ["tirta"],
        },
        {
          pertanyaan: "3. Telapak rapat bukan supaya doa cepat...?",
          alias: ["selesai", "akhir"],
        },
      ],
      voice: [
        [
          "Di sekolah, sebut bunga, dupa, dan Tirta. Rapatkan telapak sebagai persatuan yang suci.",
        ],
        [
          "Di rumah, cuci tangan, kaki, dan berkumur dulu. Badan suci, pikiran suci, baru sembahyang.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih makna telapak rapat, isi nama dupa dan Tirta, lalu jelaskan mengapa kita mencuci diri sebelum doa.",
      labelDaftar: "Pilihan, isian sarana, dan esai kesucian",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Telapak rapat",
          uraian:
            "Makna tepat: persatuan hati, pikiran, dan ucapan suci untuk memuja Hyang Widhi. Bukan penghangat, bukan tanda ingin cepat selesai.",
          contoh: "Bersatu suci. Bukan dingin. Bukan buru-buru.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Dupa, Tirta, cuci",
          uraian:
            "Dupa: asap harum penuntun doa. Tirta: air suci. Kita mencuci tangan, kaki, dan berkumur agar badan dan pikiran suci sebelum menghadap Tuhan.",
          contoh: "Dupa. Tirta. Sucikan dulu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Telapak rapat: persatuan hati, pikiran, dan ucapan yang...?",
          alias: ["suci"],
        },
        {
          pertanyaan: "2. Asap harum penuntun doa: ...?",
          alias: ["dupa"],
        },
        {
          pertanyaan: "3. Air suci setelah sembahyang: ...?",
          alias: ["tirta"],
        },
        {
          pertanyaan: "4. Sebelum duduk kita mencuci diri agar badan dan pikiran...?",
          alias: ["suci", "bersih", "hormat"],
        },
      ],
      voice: [
        [
          "Telapak dirapatkan: hati, pikiran, dan ucapan suci memuja Hyang Widhi. Bukan karena dingin, bukan agar cepat selesai.",
        ],
        [
          "Dupa menuntun doa. Tirta air suci. Cuci tangan, kaki, dan kumur dulu agar suci menghadap Tuhan.",
        ],
      ],
    },
  ],
};
