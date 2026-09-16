import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_KHONGHUCU1_BAB4 = "Bab 4: Hidup Rukun Berlandaskan Tepasal";

export const MODUL_KHONGHUCU1_BAB4: ModulResmiPai = {
  id: "khonghucu-1-bab4",
  judul: JUDUL_KHONGHUCU1_BAB4,
  pola: /tepasa|nilai shu|hidup rukun|menjadi junzi/,
  motivasi:
    "Shu, Tepasal: apa yang diri sendiri tidak inginkan, jangan diberikan kepada orang lain. Bayangkan perasaan Made sebelum mengejek. Bantu Joko membersihkan meja. Pinjam mainan dengan izin.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Nia menahan Ali agar tidak mengejek sepatu lama Made.",
    "Ali menunduk membayangkan rasa sedih jika ia yang diejek.",
    "Anak membantu Joko membersihkan kuah sup yang tumpah di kantin.",
    "Anak meminta izin sebelum meminjam mainan teman.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Di kantin, Joko tidak sengaja menumpahkan kuah sup ke atas meja kayu sehingga meja menjadi kotor. Sikap yang mencerminkan nilai Shu (Tepasal/Tenggang rasa) pada dirimu adalah...
A) Menertawakan Joko dengan keras agar anak-anak lain ikut melihat.
B) Membantu Joko mengambil tisu atau kain lap untuk membersihkan meja bersama-sama karena tahu rasanya jika panik saat melakukan kesalahan.
C) Memarahi Joko karena kuah supnya hampir mengenai bajumu.
D) Pergi membeli es krim dan membiarkan meja kotor.`,
    `[Soal 2 - PG - Tipe: HOTS]
Kita boleh meminjam mainan milik teman tanpa meminta izin, asalkan nanti dikembalikan. Pernyataan ini...
A) Benar, karena akan dikembalikan.
B) Salah; Tepasal mengajar kita meminta izin, karena kita juga tidak ingin barang kita diambil tanpa izin.
C) Benar hanya di lapangan.
D) Tidak berhubungan dengan Shu.`,
    `[Soal 3 - PG - Tipe: Reguler]
Sabda Nabi Kongzi tentang Tepasal berbunyi...
A) Apa yang diri sendiri tidak inginkan, janganlah diberikan kepada orang lain.
B) Mengejek teman boleh jika bercanda.
C) Pinjam tanpa izin diperbolehkan.
D) Tertawakan yang tumpah.`,
    `[Soal 4 - PG - Tipe: Reguler]
Shu disebut juga...
A) Xing saja.
B) Hao Xue.
C) Tepasal atau tenggang rasa.
D) Jubah Litang.`,
    `[Soal 5 - PG - Tipe: HOTS]
Jika Ali mengejek sepatu lama Made, lalu ia membayangkan dirinya yang diejek, perasaannya...
A) Bangga.
B) Sedih dan malu; itu sebabnya ia menahan diri.
C) Ingin mengejek lebih keras.
D) Tidak ada rasanya.`,
    `[Soal 6 - PG - Tipe: Reguler]
Ji Suo Bu Yu, Wu Shi Yu Ren adalah...
A) Hukum emas moralitas Khonghucu: jangan berikan kepada orang lain apa yang diri sendiri tidak inginkan.
B) Nama permainan lapangan.
C) Cara menumpahkan kuah.
D) Izin meminjam tanpa kata.`,
    `[Soal 7 - PG - Tipe: Reguler]
Perkataan atau perbuatan buruk merusak...
    A) Hanya sepatu.
B) Ketertiban dan kedamaian bersama.
C) Hanya kuah sup.
D) Tidak ada akibat.`,
    `[Soal 8 - PG - Tipe: Reguler]
Aksi harmonisasi sosial menumbuhkan anak yang...
A) Suka mengejek.
B) Pinjam tanpa izin.
C) Toleran, pemaaf, dan berjiwa sosial.
D) Tertawa saat teman panik.`,
    `[Soal 9 - PG - Tipe: HOTS]
Nia menahan Ali mengejek Made karena...
A) Ia mengajak Ali menempatkan diri di posisi Made.
B) Sepatu lama tidak boleh dipakai.
C) Ali harus diam selamanya.
D) Made bukan teman.`,
    `[Soal 10 - PG - Tipe: Reguler]
Susunan hikmah yang benar dari kata acak itu adalah...
A) Jangan kamu yang tidak berbuat inginkan.
B) Apa yang kamu tidak inginkan, jangan berbuat (kepada orang lain).
C) Berbuat tidak jangan yang kamu inginkan.
D) Kamu berbuat jangan tidak yang inginkan.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Sepatu Lama di Lapangan",
      pengantar:
        "Di lapangan sekolah. Ali ingin mengejek Made karena memakai sepatu yang sudah lama.",
      labelDaftar: "Percakapan Nia dan Ali tentang Tepasal",
      kolom: 1,
      item: [
        {
          nama: "Tahan ejekan",
          singkat: "Bukan candaan aman",
          uraian:
            "Nia menahan Ali. Mengejek sepatu lama di depan banyak orang bukan candaan yang aman, meskipun Ali bilang hanya bercanda.",
          contoh: "Tahan. Jangan ejek. Bukan candaan.",
        },
        {
          nama: "Bayangkan dirimu",
          singkat: "Ali menunduk",
          uraian:
            "Jika Ali yang memakai sepatu lama lalu diejek Made, hatinya pasti sedih dan malu. Itu pintu masuk Tepasal.",
          contoh: "Bayangkan. Sedih. Malu. Tahan diri.",
        },
        {
          nama: "Shu",
          singkat: "Hukum emas",
          uraian:
            "Nabi Kongzi mengajarkan: apa yang diri sendiri tidak inginkan, janganlah diberikan kepada orang lain. Jika kita tidak ingin disakiti, jangan menyakiti orang lain.",
          contoh: "Tidak ingin disakiti? Jangan sakiti.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tepasal dalam ajaran Khonghucu disebut juga...?",
          alias: ["shu", "tenggang"],
        },
        {
          pertanyaan: "2. Jika diejek di depan orang banyak, hati Ali merasa... dan malu?",
          alias: ["sedih", "malu"],
        },
        {
          pertanyaan: "3. Apa yang diri sendiri tidak inginkan, jangan... kepada orang lain?",
          alias: ["berikan", "berbuat", "sakiti"],
        },
      ],
      voice: [
        [
          "Ali ingin mengejek sepatu lama Made. Nia menahan: bayangkan jika kamu yang diejek, pasti sedih dan malu.",
        ],
        [
          "Itu Tepasal, Shu. Apa yang diri sendiri tidak inginkan, jangan diberikan kepada orang lain.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Shu, Empati, dan Kerukunan",
      pengantar:
        "Shu adalah tenggang rasa tingkat tinggi. Perkataan buruk merusak damai bersama. Kita menjadi anak yang toleran, pemaaf, dan berjiwa sosial.",
      labelDaftar: "Konsep Shu dan aksi sosial",
      kolom: 1,
      item: [
        {
          nama: "Hukum emas",
          singkat: "Ji Suo Bu Yu",
          uraian:
            "Ji Suo Bu Yu, Wu Shi Yu Ren: apa yang diri sendiri tidak inginkan, jangan diberikan kepada orang lain. Anak belajar menempatkan perasaannya pada posisi orang lain.",
          contoh: "Posisikan diri. Jangan sakiti.",
        },
        {
          nama: "Kantin Joko",
          singkat: "Bantu, jangan tertawa",
          uraian:
            "Kuah sup tumpah: bantu ambil tisu atau kain lap. Kita tahu rasanya panik saat berbuat salah. Bukan menertawakan, bukan memarahi.",
          contoh: "Bantu lap. Jangan tertawa. Jangan marah.",
        },
        {
          nama: "Izin meminjam",
          singkat: "Bukan tanpa pamit",
          uraian:
            "Salah jika meminjam mainan tanpa izin meskipun akan dikembalikan. Kita juga tidak ingin barang kita diambil tanpa pamit. Susun hikmah: apa yang kamu tidak inginkan, jangan berbuat.",
          contoh: "Minta izin. Kembalikan. Jangan ambil diam-diam.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kuah tumpah: kita membantu membersihkan atau menertawakan?",
          alias: ["bantu", "bersih", "lap"],
        },
        {
          pertanyaan: "2. Pinjam mainan tanpa izin: benar atau salah?",
          alias: ["salah"],
        },
        {
          pertanyaan: "3. Sabda: apa yang kamu tidak inginkan, jangan...?",
          alias: ["berbuat", "berikan"],
        },
      ],
      voice: [
        [
          "Joko menumpahkan kuah: bantu lap meja. Itu Shu, karena kita tahu rasanya panik saat berbuat salah.",
        ],
        [
          "Pinjam mainan harus izin. Salah jika diambil diam-diam. Susun: apa yang kamu tidak inginkan, jangan berbuat.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Tepasal di Sekolah dan di Rumah",
      pengantar:
        "Shu dilatih saat ingin mengejek dan saat teman berbuat salah. Guru memandu. Orang tua menemani.",
      labelDaftar: "Latihan tenggang rasa",
      kolom: 2,
      item: [
        {
          nama: "Bayangkan dulu",
          singkat: "Untuk guru",
          uraian:
            "Sebelum kata ejekan keluar, tanya: jika kamu di posisi teman, apa rasanya? Susun kartu kata hikmah Nabi Kongzi. Simulasikan meja kantin yang kotor.",
          contoh: "Bayangkan. Susun kata. Bantu lap.",
        },
        {
          nama: "Izin di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Latih anak meminta izin sebelum memakai barang saudara. Jika ada yang diejek, dampingi merasakan sedihnya, lalu minta maaf.",
          contoh: "Minta izin. Rasakan. Minta maaf.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebelum mengejek, kita... perasaan orang lain?",
          alias: ["bayangkan", "rasakan", "tepasa"],
        },
        {
          pertanyaan: "2. Meminjam barang: harus... terlebih dahulu?",
          alias: ["izin", "pamit"],
        },
        {
          pertanyaan: "3. Teman tumpah kuah: kita... membersihkan?",
          alias: ["bantu", "bantu"],
        },
      ],
      voice: [
        [
          "Di kelas, sebelum mengejek, bayangkan perasaan teman. Susun sabda: apa yang kamu tidak inginkan, jangan berbuat.",
        ],
        [
          "Di rumah, pinjam barang saudara dengan izin. Jika sudah mengejek, minta maaf. Itu Tepasal.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih sikap Shu di kantin, tentukan benar-salah tentang izin meminjam, lalu susun hikmah Nabi Kongzi.",
      labelDaftar: "Kasus, benar-salah, dan susun kalimat",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Kuah Joko",
          uraian:
            "Shu: bantu Joko mengambil tisu atau kain lap. Bukan menertawakan, bukan memarahi karena kuah hampir mengenai baju.",
          contoh: "Bantu lap. Jangan tertawa. Jangan marah.",
        },
        {
          nama: "Kelompok B dan C",
          singkat: "Izin dan hikmah",
          uraian:
            "Salah jika meminjam tanpa izin. Susun: Apa yang kamu tidak inginkan, jangan berbuat (kepada orang lain).",
          contoh: "Salah tanpa izin. Jangan berbuat yang tidak kamu inginkan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kuah tumpah: kita membantu Joko... meja?",
          alias: ["bersih", "lap", "bantu"],
        },
        {
          pertanyaan: "2. Pinjam tanpa izin: benar atau salah?",
          alias: ["salah"],
        },
        {
          pertanyaan: "3. Apa yang kamu tidak inginkan, jangan... kepada orang lain?",
          alias: ["berbuat", "berikan"],
        },
      ],
      voice: [
        [
          "Joko menumpahkan kuah: bantu lap bersama. Itu Tepasal, karena kita tahu rasanya panik.",
        ],
        [
          "Salah meminjam tanpa izin. Susun hikmah: apa yang kamu tidak inginkan, jangan berbuat.",
        ],
      ],
    },
  ],
};
