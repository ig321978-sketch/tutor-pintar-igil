/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini" (piktogram skala satu dan lebih dari satu: membaca keterangan, menghitung ikon,
 * menggambar dari tabel, paling banyak dan paling sedikit, selisih, dan jumlah), awal cerita Bazar Kuliner Sekolah. Misi lanjutan "Misi Jajanan" (nomor misi berlanjut dari Simulasi).
 * Data berbeda dari Story (risoles, pisang goreng, lemper, es cincau): jajanan lain, minuman, pengunjung per hari, tiket, dan balon. Seed Cari kesalahan dari alur:
 * Satria membaca tiga ikon dengan keterangan sepuluh sebagai tiga (keliru), Genta menyebut jajanan dengan ikon paling banyak paling laris (benar).
 * Concrete memakai papan data bazar dengan ikon jajanan beremoji di tenda, Pictorial memakai diagram polos (bulatan dan kotak SVG, sumbu berlabel), Abstract memakai kartu data tabel dan angka bercap panitia.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu kata. Jawaban benar dihitung dari data (logika-data.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 9, 8, 6, 4; Pictorial 6, 8, 5, 3; Abstract 8, 6, 3, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-jajanan-k4b6a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LHitung, LIgil, LTabel, LUrut, Rupa, SoalMisi, TanyaUrut } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";
import { IKON as I, pik } from "./logika-data";

export { MISI_JAJANAN_TEKS } from "./data-sim";

const igil = (p: ReturnType<typeof pik>, n = 0): LIgil => ({ tipe: "igil", p, n });
const hitung = (p: ReturnType<typeof pik>, i: number): LHitung => ({ tipe: "hitung", p, i });
const tabel = (p: ReturnType<typeof pik>, i: number): LTabel => ({ tipe: "tabel", p, i });
const urut = (p: ReturnType<typeof pik>, a: number, b: number, tanya: TanyaUrut): LUrut => ({ tipe: "urut", p, a, b, tanya });
const salah = (dasar: LHitung | LTabel | LUrut, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false, posisi?: number): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul } : {}),
  ...(posisi !== undefined ? { posisi } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Count the Icons, Table to Picture, Rank and Compare. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: papan data bazar dengan ikon jajanan beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Jajanan 2: papan data", "Bu Rini memajang papan data di tendanya. Periksa papannya.", [
    igil(pik("Jajanan hari kedua", "porsi", 10, [["sate", I.sate, 40], ["siomay", I.siomay, 20], ["cilok", I.cilok, 30]]), 2),
    salah(
      hitung(pik("Minuman bazar", "gelas", 10, [["melon", I.melon, 30], ["jeruk", I.jeruk, 50], ["mangga", I.mangga, 20]]), 0),
      "Satria",
      "Ada tiga ikon melon, jadi melon yang terjual tiga gelas saja.",
      "3 gelas",
      [
        "Satria keliru, karena ia baru menghitung ikon dan belum mengalikannya dengan banyak yang diwakili satu ikon.",
        "Satria keliru, karena satu ikon di papan itu hanya mewakili satu gelas.",
        "Satria keliru, karena banyak ikon harus dibagi dengan banyak yang diwakili satu ikon.",
      ],
      0,
      "Banyak ikon belum menjadi banyak data, jadi periksa lagi langkah Satria.",
      false,
      1,
    ),
    tabel(pik("Balon bazar", "buah", 5, [["merah", I.balon, 15], ["biru", I.balon, 25], ["kuning", I.balon, 10]]), 0),
    urut(pik("Jajanan sore", "porsi", 5, [["donat", I.donat, 25], ["sosis", I.sosis, 15], ["jagung", I.jagung, 35], ["sate", I.sate, 10]]), 2, 3, "selisih"),
  ]),
  C(3, "kanvas", "Misi Jajanan 3: catatan Bu Rini", "Bu Rini mencatat hasil jualan dari papan. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    igil(pik("Jajanan siang", "porsi", 5, [["cilok", I.cilok, 15], ["donat", I.donat, 10], ["sosis", I.sosis, 20]]), 2),
    hitung(pik("Minuman siang", "gelas", 2, [["jeruk", I.jeruk, 6], ["melon", I.melon, 8], ["mangga", I.mangga, 4]]), 1),
    tabel(pik("Tiket bazar", "lembar", 5, [["anak", I.tiket, 20], ["dewasa", I.tiket, 30], ["pelajar", I.tiket, 15]]), 1),
    urut(pik("Balon sore", "buah", 10, [["merah", I.balon, 70], ["biru", I.balon, 40], ["kuning", I.balon, 30]]), 0, 2, "selisih"),
  ]),
  C(4, "suara", "Misi Jajanan 4: panggilan Bu Rini", "Bu Rini memanggil dari balik tenda. Jawab dengan suaramu.", [
    igil(pik("Jajanan malam", "porsi", 5, [["sate", I.sate, 20], ["siomay", I.siomay, 10], ["cilok", I.cilok, 25], ["jagung", I.jagung, 15]]), 5),
    hitung(pik("Jajanan pagi", "porsi", 10, [["donat", I.donat, 30], ["sosis", I.sosis, 50], ["sate", I.sate, 20]]), 1),
    tabel(pik("Pengunjung bazar", "orang", 10, [["jumat", I.orang, 40], ["sabtu", I.orang, 60], ["minggu", I.orang, 30]]), 1),
    urut(pik("Minuman malam", "gelas", 5, [["jeruk", I.jeruk, 25], ["melon", I.melon, 15], ["mangga", I.mangga, 35], ["semangka", I.semangka, 20]]), 0, 1, "tersedikit"),
  ]),
];

/* ------------------------------ Pictorial: diagram polos tanpa emoji ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Jajanan 5: diagram Genta", "Genta menyalin papan ke diagram polos. Periksa diagramnya.", [
    igil(pik("Tiket hari ini", "lembar", 5, [["anak", I.tiket, 20], ["dewasa", I.tiket, 35], ["pelajar", I.tiket, 15]]), 2),
    hitung(pik("Pengunjung pagi", "orang", 10, [["jumat", I.orang, 60], ["sabtu", I.orang, 80], ["minggu", I.orang, 50]]), 2),
    tabel(pik("Jajanan kecil", "porsi", 2, [["cilok", I.cilok, 12], ["siomay", I.siomay, 16], ["sate", I.sate, 6]]), 0),
    salah(
      urut(pik("Jajanan besar", "porsi", 5, [["donat", I.donat, 20], ["sate", I.sate, 35], ["siomay", I.siomay, 25], ["sosis", I.sosis, 10]]), 0, 1, "terbanyak"),
      "Genta",
      "Baris dengan ikon paling banyak paling laris, yaitu sate.",
      "sate",
      [
        "Genta benar, karena baris dengan ikon paling sedikit selalu paling laris.",
        "Genta benar, karena semua jajanan di diagram itu terjual sama banyak.",
        "Genta benar, karena semua ikon mewakili banyak yang sama, sehingga ikon lebih banyak berarti terjual lebih banyak.",
      ],
      2,
      "Jawaban Genta benar karena tiap ikon mewakili banyak yang sama, jadi ikon terbanyak berarti paling laris.",
      true,
      0,
    ),
  ]),
  Pi(6, "kanvas", "Misi Jajanan 6: bagan Laras", "Laras menggambar bagan hasil jualan. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [
    igil(pik("Pengunjung siang", "orang", 10, [["jumat", I.orang, 30], ["sabtu", I.orang, 20], ["minggu", I.orang, 10]]), 2),
    hitung(pik("Tiket siang", "lembar", 2, [["anak", I.tiket, 6], ["dewasa", I.tiket, 4], ["pelajar", I.tiket, 8]]), 2),
    tabel(pik("Jajanan tengah", "porsi", 10, [["cilok", I.cilok, 20], ["sate", I.sate, 50], ["sosis", I.sosis, 30]]), 1),
    urut(pik("Minuman sore", "gelas", 5, [["melon", I.melon, 40], ["jeruk", I.jeruk, 15], ["mangga", I.mangga, 25]]), 0, 2, "selisih"),
  ]),
  Pi(7, "suara", "Misi Jajanan 7: lapor ke Bu Rini", "Genta melaporkan diagramnya kepada Bu Rini. Sebutkan jawabanmu.", [
    igil(pik("Balon siang", "buah", 5, [["merah", I.balon, 15], ["biru", I.balon, 30], ["kuning", I.balon, 10], ["hijau", I.balon, 25]]), 6),
    hitung(pik("Minuman tengah", "gelas", 10, [["semangka", I.semangka, 40], ["mangga", I.mangga, 20], ["jeruk", I.jeruk, 60]]), 0),
    tabel(pik("Jajanan akhir", "porsi", 5, [["donat", I.donat, 20], ["siomay", I.siomay, 35], ["jagung", I.jagung, 10]]), 1),
    urut(pik("Tiket sore", "lembar", 5, [["anak", I.tiket, 25], ["dewasa", I.tiket, 40], ["pelajar", I.tiket, 30]]), 0, 1, "terbanyak"),
  ]),
];

/* ------------------------------ Abstract: kartu data bercap panitia bazar ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Jajanan 8: lembar panitia", "Lembar panitia bazar hanya berisi kata dan angka.", [
    igil(pik("Minuman kartu", "gelas", 2, [["melon", I.melon, 10], ["jeruk", I.jeruk, 6], ["semangka", I.semangka, 8]]), 2),
    hitung(pik("Tiket kartu", "lembar", 5, [["anak", I.tiket, 15], ["dewasa", I.tiket, 35], ["pelajar", I.tiket, 20]]), 1),
    salah(
      tabel(pik("Jajanan kartu", "porsi", 5, [["siomay", I.siomay, 15], ["cilok", I.cilok, 30], ["donat", I.donat, 20]]), 0),
      "Satria",
      "Pilih satu ikon sama dengan sepuluh porsi saja, supaya ikonnya sedikit.",
      "10 porsi",
      [
        "Satria keliru, karena keterangan harus sama dengan data yang paling kecil.",
        "Satria keliru, karena keterangan sepuluh tidak habis membagi semua data, sehingga ada ikon yang terpotong.",
        "Satria keliru, karena keterangan yang besar selalu membuat ikon terlalu banyak.",
      ],
      1,
      "Keterangan harus membagi semua data tanpa sisa, jadi periksa lagi langkah Satria.",
      false,
      2,
    ),
    urut(pik("Balon kartu", "buah", 5, [["merah", I.balon, 20], ["biru", I.balon, 15], ["kuning", I.balon, 35], ["hijau", I.balon, 10]]), 0, 1, "jumlah"),
  ]),
  A(9, "kanvas", "Misi Jajanan 9: tulis di lembar", "Panitia meminta kamu menulis jawaban di kanvas.", [
    igil(pik("Jajanan lembar", "porsi", 5, [["sosis", I.sosis, 10], ["jagung", I.jagung, 25], ["sate", I.sate, 5]]), 2),
    hitung(pik("Minuman lembar", "gelas", 2, [["jeruk", I.jeruk, 6], ["melon", I.melon, 4], ["semangka", I.semangka, 2]]), 0),
    tabel(pik("Tiket lembar", "lembar", 10, [["anak", I.tiket, 30], ["dewasa", I.tiket, 60], ["pelajar", I.tiket, 20]]), 0),
    urut(pik("Balon lembar", "buah", 5, [["merah", I.balon, 40], ["biru", I.balon, 20], ["kuning", I.balon, 25]]), 0, 1, "selisih"),
  ]),
  A(10, "suara", "Misi Jajanan 10: lembar akhir", "Lembar akhir untuk panitia. Ucapkan jawabannya.", [
    igil(pik("Jajanan panitia", "porsi", 5, [["donat", I.donat, 10], ["sate", I.sate, 25], ["siomay", I.siomay, 35], ["cilok", I.cilok, 15]]), 7),
    hitung(pik("Minuman panitia", "gelas", 5, [["melon", I.melon, 35], ["jeruk", I.jeruk, 15], ["mangga", I.mangga, 25]]), 2),
    tabel(pik("Tiket panitia", "lembar", 10, [["anak", I.tiket, 40], ["dewasa", I.tiket, 20], ["pelajar", I.tiket, 30]]), 2),
    urut(pik("Balon panitia", "buah", 10, [["merah", I.balon, 60], ["biru", I.balon, 20], ["kuning", I.balon, 50], ["hijau", I.balon, 40]]), 0, 1, "tersedikit"),
  ]),
];

export const POIN_PENTING = [
  "Piktogram adalah diagram yang memakai ikon untuk menyatakan banyak data.",
  "Keterangan menyatakan banyak data yang diwakili satu ikon, misalnya 1 ikon = 5 porsi.",
  "Banyak data = banyak ikon × banyak yang diwakili satu ikon. Tulis satuannya.",
  "Menggambar dari tabel: banyak data dibagi keterangan = banyak ikon. Data harus habis dibagi.",
  "Ikon paling banyak berarti data paling banyak, dan ikon paling sedikit berarti data paling sedikit.",
  "Selisih dan jumlah dicari dari ikon, lalu dikali keterangan. Baca keterangan lebih dulu.",
];
/** Poin penting untuk suara (tanpa digit): bilangan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A =
  "Pak Dodi, panitia bazar, datang membawa kertas berpetak dan penggaris panjang. Ia ingin data jajanan itu digambar menjadi batang yang berdiri tegak. Menurutmu, apa bedanya batang dengan deretan ikon?";

export const TEMA_JAJANAN = {
  concrete: { ikon: "\u{1F362}", nama: "Concrete", cara: "Tenda bazar: papan data dengan ikon jajanan beremoji" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas berpetak: diagram polos dengan bulatan dan kotak" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar panitia bazar: kartu tabel dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_JAJANAN, PICTORIAL as PICTORIAL_JAJANAN, ABSTRACT as ABSTRACT_JAJANAN };
