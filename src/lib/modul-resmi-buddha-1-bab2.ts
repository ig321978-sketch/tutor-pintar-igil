import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BUDDHA1_BAB2 = "Bab 2: Meneladani Pangeran Siddharta Kecil";

export const MODUL_BUDDHA1_BAB2: ModulResmiPai = {
  id: "buddha-1-bab2",
  judul: JUDUL_BUDDHA1_BAB2,
  pola: /pangeran siddharta|angsa|kitab suci tripitaka|tripitaka/,
  motivasi:
    "Pangeran Siddharta kecil menyelamatkan angsa yang dipanah Devadatta. Makhluk hidup milik yang menyelamatkan, bukan yang merusak. Tenang, menolong, hormat orang tua, rajin belajar.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ibu Guru bercerita: Devadatta memanah angsa putih.",
    "Pangeran Siddharta memeluk dan mengobati angsa.",
    "Anak menolong hewan lemah seperti Siddharta.",
    "Anak menghormati orang tua dan belajar tekun.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Pangeran Devadatta memanah angsa karena ingin memburunya, sedangkan Pangeran Siddharta menyelamatkannya karena menghargai kehidupan. Sikap Pangeran Siddharta mengajarkan kita untuk menjadi anak yang...
A) Suka membalas dendam kepada orang lain.
B) Memiliki hati yang lembut, penyayang, dan berani melindungi makhluk yang lemah.
C) Takut dan bersembunyi saat melihat masalah.
D) Hanya menyayangi hewan yang lucu dan bagus.`,
    `[Soal 2 - PG - Tipe: HOTS]
Menurut Pangeran Siddharta, makhluk hidup adalah milik...
A) Orang yang memanah dan ingin merusaknya.
B) Mereka yang menyelamatkannya dan menyayanginya.
C) Siapa saja yang lebih kuat.
D) Hanya pangeran di istana.`,
    `[Soal 3 - PG - Tipe: Reguler]
Siapa yang memanah angsa putih sampai terluka?
A) Pangeran Devadatta, sepupu Pangeran Siddharta.
B) Raja Suddhodana.
C) Ratu Mahamaya.
D) Ibu Guru.`,
    `[Soal 4 - PG - Tipe: Reguler]
Apa yang dilakukan Pangeran Siddharta pada angsa itu?
A) Membiarkannya di tanah.
B) Memburunya juga.
C) Memeluk, mencabut anak panah, dan mengobati lukanya dengan kasih.
D) Menyembunyikannya tanpa merawat.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kisah angsa yang terluka menekankan...
A) Hak memburu hewan lemah.
B) Hak hidup setiap makhluk.
C) Dendam kepada sepupu.
D) Ketakutan bersembunyi.`,
    `[Soal 6 - PG - Tipe: Reguler]
Sifat luhur Pangeran Siddharta yang diteladani anak kelas 1 adalah...
A) Tenang, suka menolong, menghormati orang tua, dan rajin belajar.
B) Suka membalas dendam.
C) Hanya menyayangi yang lucu.
D) Takut melihat masalah.`,
    `[Soal 7 - PG - Tipe: Reguler]
Orang tua Pangeran Siddharta adalah...
A) Devadatta dan Ibu Guru.
B) Raja Suddhodana dan Ratu Mahamaya.
C) Ali dan Nia.
D) Sangha di vihara.`,
    `[Soal 8 - PG - Tipe: HOTS]
Meneladani Siddharta berarti menyayangi...
A) Hanya kucing yang lucu.
B) Hanya angsa putih.
C) Semua makhluk, bukan hanya yang lucu dan bagus.
D) Hanya hewan di istana.`,
    `[Soal 9 - PG - Tipe: Reguler]
Pangeran Siddharta adalah Bodhisatta, artinya...
A) Calon Buddha yang sedang menapaki jalan kasih.
B) Pemburu angsa.
C) Anak yang bersembunyi.
D) Guru yang memarah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Saat melihat hewan terluka, anak yang meneladani Siddharta...
A) Tertawa dan lewat.
B) Berani melindungi dan merawat, lalu minta bantuan orang dewasa.
C) Membalas dendam pada yang menyakiti dengan kekerasan.
D) Bersembunyi di kelas.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Kisah Angsa Putih di Kelas",
      pengantar:
        "Di dalam kelas saat jam cerita bersama Ibu Guru. Ali dan Made mengingat Pangeran Siddharta kecil yang sangat menyayangi hewan.",
      labelDaftar: "Percakapan Ali dan Made tentang angsa",
      kolom: 1,
      item: [
        {
          nama: "Devadatta memanah",
          singkat: "Angsa putih jatuh",
          uraian:
            "Sepupu Pangeran Siddharta, Pangeran Devadatta, memanah seekor angsa putih sampai terluka dan jatuh ke tanah. Ia ingin memburu.",
          contoh: "Memanah = merusak kehidupan.",
        },
        {
          nama: "Siddharta menyelamatkan",
          singkat: "Peluk, cabut, obati",
          uraian:
            "Pangeran Siddharta langsung memeluk angsa itu, mencabut anak panahnya, dan mengobati lukanya dengan penuh kasih sayang.",
          contoh: "Selamatkan. Jangan rusak.",
        },
        {
          nama: "Milik yang menyayangi",
          singkat: "Hak hidup",
          uraian:
            "Beliau berkata: makhluk hidup adalah milik mereka yang menyelamatkannya dan menyayanginya, bukan milik mereka yang ingin merusaknya.",
          contoh: "Yang merawat, itulah yang berhak.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang memanah angsa putih?",
          alias: ["devadatta"],
        },
        {
          pertanyaan: "2. Siapa yang mengobati angsa?",
          alias: ["siddharta", "pangeran"],
        },
        {
          pertanyaan: "3. Makhluk hidup milik yang... dan menyayangi?",
          alias: ["menyelamatkan", "menolong", "merawat"],
        },
      ],
      voice: [
        [
          "Ibu Guru bercerita: Devadatta memanah angsa putih sampai jatuh. Siddharta kecil memeluk dan mengobatinya.",
        ],
        [
          "Makhluk hidup milik yang menyelamatkan dan menyayangi, bukan milik yang ingin merusak.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Teladan Bodhisatta Kecil",
      pengantar:
        "Kisah angsa menanamkan karakter pelindung kehidupan. Kita meniru Siddharta: tenang, menolong, hormat orang tua, tekun belajar.",
      labelDaftar: "Hak hidup dan budi pekerti",
      kolom: 1,
      item: [
        {
          nama: "Angsa yang terluka",
          singkat: "Hak hidup",
          uraian:
            "Narasi kehidupan Bodhisatta, calon Buddha, saat anak-anak. Setiap makhluk punya hak hidup. Yang lemah dilindungi, bukan diburu.",
          contoh: "Lemah dilindungi. Bukan diburu.",
        },
        {
          nama: "Hati lembut dan berani",
          singkat: "Bukan dendam, bukan sembunyi",
          uraian:
            "Siddharta tidak membalas dendam dan tidak bersembunyi. Ia berani mendekat, lembut merawat. Kita meneladani hati yang penyayang.",
          contoh: "Lembut. Berani menolong.",
        },
        {
          nama: "Hormat dan tekun",
          singkat: "Suddhodana dan Mahamaya",
          uraian:
            "Selain menyayangi hewan, Siddharta menghormati orang tua—Raja Suddhodana dan Ratu Mahamaya—serta rajin belajar dengan tekun.",
          contoh: "Hormati orang tua. Belajar tekun.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sikap Siddharta: hati lembut dan... melindungi yang lemah?",
          alias: ["berani", "sayang", "tolong"],
        },
        {
          pertanyaan: "2. Kita menyayangi semua makhluk, bukan hanya yang...?",
          alias: ["lucu", "bagus"],
        },
        {
          pertanyaan: "3. Nama ayah Pangeran Siddharta: Raja...?",
          alias: ["suddhodana"],
        },
      ],
      voice: [
        [
          "Siddharta adalah Bodhisatta. Angsa terluka diajak pulih. Hak hidup milik setiap makhluk.",
        ],
        [
          "Kita tenang, suka menolong, hormat pada orang tua, dan rajin belajar. Jangan hanya menyayangi yang lucu.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Menolong seperti Siddharta",
      pengantar:
        "Keteladanan dilatih saat ada yang lemah di halaman dan saat belajar di meja. Guru memandu cerita. Orang tua menemani di rumah.",
      labelDaftar: "Latihan pelindung kehidupan",
      kolom: 2,
      item: [
        {
          nama: "Drama angsa",
          singkat: "Untuk guru",
          uraian:
            "Perankan Devadatta dan Siddharta tanpa kekerasan sungguhan. Diskusikan: siapa yang berhak atas makhluk hidup? Latih kalimat: aku melindungi yang lemah.",
          contoh: "Perankan. Lindungi. Jangan buru.",
        },
        {
          nama: "Hewan di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Temani anak merawat hewan piaraan atau tidak mengusir serangga dengan kejam. Ceritakan Siddharta dan angsa. Puji saat anak belajar tekun.",
          contoh: "Rawat. Hormati. Belajar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Meneladani Siddharta: kita melindungi yang...?",
          alias: ["lemah", "terluka", "makhluk"],
        },
        {
          pertanyaan: "2. Hanya menyayangi yang lucu: benar atau salah?",
          alias: ["salah"],
        },
        {
          pertanyaan: "3. Selain sayang hewan, Siddharta rajin...?",
          alias: ["belajar"],
        },
      ],
      voice: [
        [
          "Di kelas, perankan kisah angsa. Katakan: aku melindungi yang lemah.",
        ],
        [
          "Di rumah, rawat hewan dengan lembut. Hormati orang tua. Belajar tekun seperti Siddharta kecil.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap meneladani Siddharta, lalu tentukan benar atau salah: hanya menyayangi hewan yang lucu.",
      labelDaftar: "Kasus keteladanan dan benar-salah",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Hati lembut dan berani",
          uraian:
            "Siddharta mengajarkan menjadi anak yang lembut, penyayang, dan berani melindungi yang lemah. Bukan dendam, bukan bersembunyi.",
          contoh: "Lembut. Berani menolong.",
        },
        {
          nama: "Kelompok B",
          singkat: "Bukan hanya yang lucu",
          uraian:
            "Pernyataan 'hanya menyayangi hewan yang lucu dan bagus' adalah salah. Siddharta menyayangi angsa yang terluka. Semua makhluk punya hak hidup.",
          contoh: "Salah. Semua makhluk disayangi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siddharta mengajarkan hati yang... dan berani melindungi?",
          alias: ["lembut", "penyayang", "sayang"],
        },
        {
          pertanyaan: "2. Hanya sayangi yang lucu: benar atau salah?",
          alias: ["salah"],
        },
      ],
      voice: [
        [
          "Siddharta menyelamatkan, bukan memburu. Kita menjadi anak lembut, penyayang, dan berani melindungi yang lemah.",
        ],
        [
          "Salah jika hanya menyayangi yang lucu. Semua makhluk punya hak hidup, seperti angsa yang terluka.",
        ],
      ],
    },
  ],
};
