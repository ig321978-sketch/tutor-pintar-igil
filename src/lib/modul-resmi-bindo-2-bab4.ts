import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB4 = "Bab 4: Keluargaku Kreatif";

export const MODUL_BINDO2_BAB4: ModulResmiPai = {
  id: "bindo-2-bab4",
  judul: JUDUL_BINDO2_BAB4,
  pola: /keluargaku (kreatif|unik)|nilai uang|dongeng fabel|pasar kata jual beli/,
  motivasi:
    "Penjual, pembeli, dan harga adalah kosakata jual beli. Hemat dan menabung beda dengan boros. Fabel: hewan berbicara, ada amanat. Malin Kundang bukan fabel.",
  kunciJawaban: "B,B,S,S,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak di kantin menukar uang dengan susu, belajar kata penjual dan harga.",
    "Anak mendengarkan fabel semut dan belalang, mencari amanat.",
    "Anak mengerjakan evaluasi jual beli, fabel, dan tanggapan santun Semut.",
    "Anak menarik garis bagian fabel, menggeser protagonis-antagonis, mengurutkan kancil-harimau, dan menulis amanat di kanvas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Nia membuat celengan dari botol bekas lalu menjualnya di pasar seni sekolah. Ali memberi uang dua ribu rupiah untuk mendapatkan celengan Nia. Dalam kegiatan ini, posisi Ali bertindak sebagai...
A) Penjual
B) Pembeli
C) Produsen
D) Harga`,
    `[Soal 2 - PG - Tipe: HOTS]
Di akhir fabel, Serigala menangis kelaparan di musim dingin karena saat musim panas ia malas dan menolak ajaran Semut mengumpulkan makanan. Amanat cerita itu adalah...
A) Kita harus menjauhi musim dingin agar tidak kedinginan.
B) Sifat malas di masa muda akan mendatangkan kerugian dan penyesalan di masa depan.
C) Semut adalah hewan yang jahat karena tidak membagi makanan.
D) Serigala boleh malas jika cuaca panas.`,
    `[Soal 3 - PG - Tipe: HOTS]
Menabung artinya menghabiskan semua uang saku untuk membeli mainan robot secara boros. Pernyataan ini...
A) Benar.
B) Salah; menabung artinya menyisihkan uang, hemat artinya memakai sesuai kebutuhan.
C) Benar hanya di pasar.
D) Menabung sama dengan harga.`,
    `[Soal 4 - PG - Tipe: HOTS]
Cerita Malin Kundang dikategorikan sebagai fabel karena menceritakan asal-usul sebuah batu. Pernyataan ini...
A) Benar.
B) Salah; Malin Kundang adalah cerita rakyat tentang manusia, bukan fabel hewan.
C) Benar karena ada batu.
D) Semua dongeng adalah fabel.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kura-kura lambat dalam lomba lari biasanya berwatak...
A) Sombong dan cepat menyerah.
B) Sabar, gigih, bertekad kuat.
C) Cerdik seperti kancil saja.
D) Malas menabung.`,
    `[Soal 6 - PG - Tipe: Reguler]
Kancil dalam banyak fabel berwatak...
A) Cerdik, pintar mencari jalan keluar.
B) Sombong pelari.
C) Gigih seperti kura-kura saja.
D) Penjual susu.`,
    `[Soal 7 - PG - Tipe: Reguler]
Kelinci pelari yang meremehkan kura-kura berwatak...
A) Sabar.
B) Penjual.
C) Sombong, meremehkan lawan, mudah menyerah pada latihan.
D) Hemat.`,
    `[Soal 8 - PG - Tipe: Reguler]
Cerita dongeng yang tokohnya hewan disebut...
A) Denah.
B) Fabel.
C) Rambu.
D) Huruf kapital.`,
    `[Soal 9 - PG - Tipe: HOTS]
Kebutuhan berbeda dengan keinginan karena...
A) Kebutuhan harus ada agar hidup sehat, keinginan hanya untuk kesenangan.
B) Keinginan lebih penting dari nasi.
C) Mainan selalu kebutuhan.
D) Uang tidak berhubungan.`,
    `[Soal 10 - PG - Tipe: Reguler]
Orang yang menawarkan barang dagangan disebut...
A) Pembeli.
B) Penjual.
C) Fabel.
D) Denah.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Nilai Uang dan Kosakata Jual Beli",
      pengantar:
        "Infografis pasar kata: penjual menawarkan barang, pembeli menukar uang, harga adalah nilai yang dibayar. Menabung = menyisihkan. Hemat = sesuai kebutuhan, bukan keinginan saja.",
      labelDaftar: "Penjual, pembeli, harga, hemat",
      kolom: 1,
      item: [
        {
          nama: "Tiga kata pasar",
          singkat: "Penjual, pembeli, harga",
          uraian:
            "Penjual menawarkan dagangan. Pembeli menukarkan uang dengan barang. Harga adalah nilai uang yang harus dibayar. Di kantin, kalian adalah pembeli.",
          contoh: "Ali bayar dua ribu = pembeli.",
        },
        {
          nama: "Cermat bahasa",
          singkat: "Menabung dan hemat",
          uraian:
            "Menabung: menyisihkan sebagian uang saku di celengan. Hemat: memakai uang sesuai kebutuhan, bukan keinginan saja. Boros: menghabiskan semua untuk mainan.",
          contoh: "Celengan = menabung. Nasi = kebutuhan.",
        },
        {
          nama: "Kebutuhan dan keinginan",
          singkat: "Harus ada vs kesenangan",
          uraian:
            "Kebutuhan: benda yang harus ada agar hidup sehat, misalnya makanan, sabun, buku. Keinginan: benda untuk kesenangan, misalnya mainan robot. Tanyakan harga dengan bahasa santun.",
          contoh: "Susu = kebutuhan. Robot = keinginan.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Apa perbedaan antara kata kebutuhan dan keinginan? Berikan contohnya!",
          alias: ["butuh", "ingin", "sehat", "senang", "makan", "mainan", "harus"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Orang yang menawarkan atau menjajakan barang dagangan disebut ........................",
        alias: ["penjual", "pedagang"],
      },
      voice: [
        [
          "Anak-anak kelas 2 yang cerdas finansial, setiap hari kita melihat uang digunakan untuk bertransaksi. Saat kalian ke kantin menukarkan lembaran uang dengan segelas susu, kalian sedang melakukan jual beli!",
          "Di sana ada penjual yang menawarkan barang, dan kalian bertindak sebagai pembeli. Nilai uang yang tertera pada barang dinamakan harga. Menggunakan bahasa santun saat menawar atau menanyakan harga adalah akhlak mulia.",
          "Ingat ya, anak kreatif harus bisa hidup hemat: pilihlah benda yang benar-benar kalian butuhkan, dan sisanya yuk kita tabung di celengan!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Memetik Hikmah Dongeng Fabel",
      pengantar:
        "Infografis struktur fabel: tokoh hewan yang berbicara seperti manusia, plus amanat di akhir cerita. Hewan mewakili sifat manusia. Malin Kundang bukan fabel.",
      labelDaftar: "Tokoh hewan dan amanat",
      kolom: 1,
      item: [
        {
          nama: "Tokoh utama",
          singkat: "Hewan yang berbicara",
          uraian:
            "Fabel adalah dongeng fantasi. Tokohnya kancil, semut, lebah, kelinci, kura-kura: mereka berbicara, sekolah, dan bekerja seperti manusia.",
          contoh: "Fabel = cerita hewan.",
        },
        {
          nama: "Amanat",
          singkat: "Pesan moral",
          uraian:
            "Di akhir fabel ada rahasia: amanat. Semut rajin menabung makanan = giat bekerja. Kelinci sombong kalah dari kura-kura gigih = jangan sombong, tekunlah.",
          contoh: "Amanat = pelajaran kebaikan.",
        },
        {
          nama: "Cari rahasia",
          singkat: "Tiru sifat baik",
          uraian:
            "Tokoh hewan mewakili sifat manusia: rajin, cerdik, malas, atau sombong. Tugas kita meniru yang baik. Malin Kundang cerita manusia, bukan fabel.",
          contoh: "Tiru semut, jangan tiru kelinci sombong.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika kamu membaca fabel Kelinci Sombong yang kalah lomba dari Kura-Kura yang lambat tapi gigih, amanat apa yang bisa kamu petik untuk kehidupan belajarmu?",
          alias: ["sabar", "gigih", "sombong", "tekun", "jangan sombong", "latihan", "kura"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Cerita dongeng yang tokoh-tokohnya diperankan oleh hewan disebut cerita ........................",
        alias: ["fabel", "dongeng fabel"],
      },
      voice: [
        [
          "Siapa yang suka mendengarkan dongeng sebelum tidur? Pasti menyenangkan ya! Salah satu jenis dongeng yang paling seru adalah fabel.",
          "Fabel adalah cerita fantasi di mana tokoh utamanya hewan-hewan cerdik yang bisa berbicara, bersekolah, dan bekerja gotong royong persis seperti manusia.",
          "Membaca fabel bukan sekadar hiburan. Di dalamnya selalu ada amanat atau pesan moral. Misalnya, Semut yang Rajin Menabung Makanan mengajarkan kita giat bekerja dan tidak malas. Melalui fabel, kita diajar menjadi anak yang jujur, suka berbagi, dan tangguh!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih peran Ali dan amanat serigala malas, tentukan benar-salah menabung serta Malin Kundang, jodohkan watak kura-kura-kancil-kelinci, lalu tulis tanggapan santun Semut kepada Belalang.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Pembeli dan amanat",
          uraian:
            "Ali yang membayar = pembeli. Amanat serigala malas: malas di masa muda mendatangkan penyesalan. Menabung bukan boros. Malin Kundang bukan fabel.",
          contoh: "Pembeli. Jangan malas. Bukan fabel.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Watak dan tanggapan",
          uraian:
            "Kura-kura: sabar gigih. Kancil: cerdik. Kelinci pelari: sombong. Jika jadi Semut, jawab Belalang dengan santun: boleh berbagi sedikit sambil menasihati agar rajin musim depan.",
          contoh: "Gigih. Cerdik. Sombong. Santun berbagi.",
        },
      ],
      kuis: [
        { pertanyaan: "Ali yang membayar adalah?", alias: ["pembeli"] },
        { pertanyaan: "Amanat serigala malas?", alias: ["malas", "rugi"] },
        { pertanyaan: "Menabung sama dengan boros?", alias: ["salah"] },
        { pertanyaan: "Malin Kundang fabel?", alias: ["salah"] },
        { pertanyaan: "Fabel tokohnya?", alias: ["hewan"] },
        { pertanyaan: "Semut menjawab Belalang?", alias: ["santun", "bagi", "rajin"] },
      ],
      voice: [
        [
          "Ali yang membayar adalah pembeli. Menabung bukan boros. Malin Kundang bukan fabel.",
        ],
        [
          "Fabel tokohnya hewan. Kura-kura gigih, kancil cerdik, kelinci sombong. Jawab Belalang dengan santun.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis protagonis-latar-amanat, geser hewan ke keranjang baik atau pembuat masalah, urutkan kejar-kejaran kancil, coretkan huruf amanat, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "Protagonis: pahlawan baik hati. Latar: hutan, sungai, padang. Amanat: pesan kebaikan. Baik: kancil, semut, merpati. Masalah: serigala, buaya. Urutan: harimau melihat, kancil bersembunyi, kancil selamat.",
          contoh: "Amanat = pesan. Kancil baik. Harimau dulu.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "A-M-A-N-A-T adalah amanat. Hiu terbang pakai balon boleh di fabel karena khayalan. Kancil tidak selalu antagonis.",
          contoh: "Coretkan AT. BENAR lalu SALAH.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis fabel?", alias: ["protagonis", "latar", "amanat"] },
        { pertanyaan: "Keranjang hewan?", alias: ["kancil", "serigala"] },
        { pertanyaan: "Urutan kancil harimau?", alias: ["sungai", "gua", "selamat"] },
        { pertanyaan: "Hiu boleh terbang di fabel?", alias: ["benar"] },
        { pertanyaan: "Kancil selalu antagonis?", alias: ["salah"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan dua huruf terakhir A-M-A-N-__-__.",
        alias: ["amanat", "at"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis dari protagonis, latar, dan amanat ke artinya. Geser hewan ke keranjang baik hati atau pembuat masalah.",
          "Urutkan: harimau melihat kancil di sungai, kancil bersembunyi di gua, lalu kancil selamat. Coretkan huruf A dan T untuk kata amanat.",
          "Detektif: di fabel, hiu boleh terbang dengan balon karena cerita khayalan. Kancil tidak selalu antagonis.",
        ],
      ],
    },
  ],
};
