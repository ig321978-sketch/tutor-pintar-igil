import type { AdeganStory, Obj } from "./logika-story";
import { SOAL1, W, jam, kartu, kertasSiku, kotak, panah, pukul, sudut, tanda, tandaSiku, teks } from "./k5b6b-gambar";
import type { Jenis } from "./k5b6b-gambar";
import { bersih, k, tambah } from "./k5b6b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 5. Eksplorasi 6.2 mengelompokkan sudut (hlm. 171-172; Panduan Guru hlm. 259-260) ------------------------------ */
const TIGA_X = [12, 106, 200];
const KOLOM = ["lebih kecil dari", "sudut", "lebih besar dari"];

export const ADEGAN_EKSPLORASI: AdeganStory = {
  id: "eksplorasi-62",
  judul: "Mengelompokkan sudut",
  sumber: "Materi: mengelompokkan sudut",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b6b-materi-2.ts:1"),
  ketukan: [
    k(
      "Sekarang kita mengelompokkan sudut. Kita memakai sudut-sudut yang sudah ditemukan tadi, ketika kita menjadi detektif sudut.",
      tambah(0, teks("jud", 150, 24, "Mengelompokkan sudut", 13, W.ungu)),
      tambah("ditemukan", kartu("e1", 20, 56, 120, 56, W.hijauMuda, ["Kegiatan tadi", "sudut ditemukan"], 9)),
      tambah("detektif", panah("ep", 142, 84, 16, 0, W.ungu, 2.4), kartu("e2", 160, 56, 120, 56, W.muda, ["Kegiatan sekarang", "kelompokkan sudut"], 9)),
    ),
    k(
      "Buat tabel di kertasmu. Tabel ini punya tiga kolom: sudut yang lebih kecil dari sudut siku-siku, sudut siku-siku, dan sudut yang lebih besar dari sudut siku-siku.",
      bersih(0),
      tambah("Tabel", teks("jud", 150, 24, "Tabel Kelompok Sudut", 12.5, W.ungu)),
      tambah("kolom:", ...TIGA_X.map((x, i) => kotak(`tb${i}`, x, 62, 88, 100, W.putih, W.biru, { rx: 4, tebal: 1.2 }))),
      tambah("kecil", ...kartu("h0", 12, 36, 88, 26, W.hijauMuda, [KOLOM[0], "sudut siku-siku"], 7.4, { rx: 4 })),
      tambah("siku-siku,@2", ...kartu("h1", 106, 36, 88, 26, W.krem, [KOLOM[1], "siku-siku"], 7.4, { rx: 4 })),
      tambah("besar", ...kartu("h2", 200, 36, 88, 26, W.merahMuda, [KOLOM[2], "sudut siku-siku"], 7.4, { rx: 4 })),
    ),
    k(
      "Periksa tiap sudut yang kamu temukan dengan lipatan kertas yang sudah dibuat. Letakkan pojok lipatan pada sudut itu, lalu lihat apakah sudutnya lebih sempit, sama, atau lebih lebar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Periksa dengan lipatan", 12.5, W.ungu)),
      tambah("temukan", sudut("p0", 22, 130, 0, 40, 62), sudut("p1", 112, 130, 0, 90, 62), sudut("p2", 202, 130, 0, 135, 62)),
      tambah("lipatan", kertasSiku("pk0", 22, 130, 0, 46, { op: 0.75, z: -1 }), kertasSiku("pk1", 112, 130, 0, 46, { op: 0.75, z: -1 }), kertasSiku("pk2", 202, 130, 0, 46, { op: 0.75, z: -1 })),
      tambah("sempit,", teks("pl0", 50, 168, "lebih sempit", 8.6, W.hijau)),
      tambah("sama,", teks("pl1", 140, 168, "sama", 8.6, W.biru)),
      tambah("lebar.", teks("pl2", 235, 168, "lebih lebar", 8.6, W.merah)),
    ),
    k(
      "Sudut yang tepat sama dengan lipatan masuk kolom tengah. Yang lebih sempit masuk kolom kiri, dan yang lebih lebar masuk kolom kanan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tiga kelompok sudut", 13, W.ungu)),
      tambah("tengah.", kotak("tk1", 106, 40, 88, 130, W.krem, W.biru, { rx: 4, tebal: 1.2 }), ...sudut("kt1", 120, 130, 0, 90, 44), tandaSiku("kt1s", 120, 130, 0, 7), teks("kl1", 150, 162, "sama", 8.6, W.biru)),
      tambah("kiri,", kotak("tk0", 12, 40, 88, 130, W.hijauMuda, W.biru, { rx: 4, tebal: 1.2 }), ...sudut("kt0", 26, 130, 0, 38, 56), teks("kl0", 56, 162, "lebih sempit", 8.6, W.hijau)),
      tambah("kanan.", kotak("tk2", 200, 40, 88, 130, W.merahMuda, W.biru, { rx: 4, tebal: 1.2 }), ...sudut("kt2", 246, 130, 20, 120, 44), teks("kl2", 244, 162, "lebih lebar", 8.6, W.merah)),
    ),
    k(
      "Sekarang giliranmu mencoba. Berkelilinglah memeriksa hasil kerja temanmu, dan pastikan lipatan siku-siku dipakai dengan tepat. Boleh berkelompok atau sendiri.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Giliranmu mencoba", 13, W.ungu)),
      tambah("berkeliling", kartu("g1", 24, 40, 252, 30, W.hijauMuda, ["berkeliling memeriksa hasil teman"], 9)),
      tambah("pastikan", kartu("g2", 24, 80, 252, 30, W.muda, ["pastikan lipatan dipakai dengan tepat"], 8.8)),
      tambah("Boleh", kartu("g3", 24, 120, 252, 30, W.krem, ["boleh berkelompok atau sendiri"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Sudut lancip, siku-siku, dan tumpul (hlm. 172; Panduan Guru hlm. 259-260) ------------------------------ */
export const ADEGAN_LANCIP_TUMPUL: AdeganStory = {
  id: "lancip-tumpul",
  judul: "Sudut lancip, siku-siku, dan tumpul",
  sumber: "Materi: lancip, siku-siku, dan tumpul",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k5b6b-materi-2.ts:2"),
  ketukan: [
    k(
      "Pada tabel tadi ada tiga kelompok sudut. Sudut yang lebih kecil dari sudut siku-siku disebut sudut lancip.",
      tambah(0, teks("jud", 150, 24, "Kelompok sudut lancip", 12.5, W.ungu)),
      tambah("kecil", kertasSiku("pk", 60, 150, 10, 80, { op: 0.6 }), tandaSiku("pks", 60, 150, 10, 8)),
      tambah("lancip.", ...sudut("lc", 60, 150, 10, 40, 100), teks("lct", 235, 66, "sudut lancip", 13, W.merah), teks("lcu", 235, 82, "lebih kecil dari siku-siku", 8, W.biru)),
    ),
    k(
      "Sudut yang lebih besar dari sudut siku-siku disebut sudut tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Sudut tumpul", 13, W.ungu)),
      tambah("besar", kertasSiku("pk", 100, 150, 10, 80, { op: 0.6 }), tandaSiku("pks", 100, 150, 10, 8)),
      tambah("tumpul.", ...sudut("tp", 100, 150, 10, 135, 100), teks("tpt", 237, 64, "sudut tumpul", 13, W.merah), teks("tpu", 237, 80, "lebih besar dari siku-siku", 8, W.biru)),
    ),
    k(
      "Sudut siku-siku tetap sama besar dengan pojok lipatan kertas. Perhatikan tanda kecil seperti pojok kotak pada gambar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Sudut siku-siku", 13, W.ungu)),
      tambah("sama", kertasSiku("pk", 70, 150, 0, 80, { op: 0.7 }), ...sudut("sk", 70, 150, 0, 90, 100)),
      tambah("tanda", tandaSiku("sks", 70, 150, 0, 12)),
      tambah("pojok@2", teks("skt", 210, 100, "pas dengan lipatan", 10, W.hijau)),
    ),
    k(
      "Jadi ada tiga jenis sudut: lancip, siku-siku, dan tumpul. Pembedanya adalah perbandingan dengan sudut siku-siku.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tiga jenis sudut", 13, W.ungu)),
      tambah("lancip,", ...sudut("j0", 26, 130, 0, 40, 60), teks("j0t", 56, 170, "lancip", 10, W.merah), teks("j0u", 56, 183, "lebih kecil", 7.4, W.biru)),
      tambah("siku-siku,", ...sudut("j1", 116, 130, 0, 90, 60), tandaSiku("j1s", 116, 130, 0, 8), teks("j1t", 146, 170, "siku-siku", 10, W.merah), teks("j1u", 146, 183, "sama", 7.4, W.biru)),
      tambah("tumpul.", ...sudut("j2", 232, 130, 20, 120, 52), teks("j2t", 230, 170, "tumpul", 10, W.merah), teks("j2u", 230, 183, "lebih besar", 7.4, W.biru)),
    ),
    k(
      "Di akhir kegiatan, presentasikan hasil kerjamu, lalu simpulkan hal penting saat mengelompokkan sudut, dan lanjutkan dengan mengerjakan latihan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Akhir pembelajaran", 13, W.ungu)),
      tambah("presentasikan", kartu("ak1", 24, 40, 252, 30, W.hijauMuda, ["presentasikan hasil kerja"], 9)),
      tambah("simpulkan", kartu("ak2", 24, 80, 252, 30, W.muda, ["simpulkan hal penting"], 9)),
      tambah("latihan.", kartu("ak3", 24, 120, 252, 30, W.krem, ["kerjakan latihan"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Salah kaprah dan diferensiasi (Panduan Guru hlm. 259-260) ------------------------------ */
export const ADEGAN_SALAH_KAPRAH: AdeganStory = {
  id: "salah-kaprah",
  judul: "Hati-hati: kesalahan yang sering terjadi",
  sumber: "Materi: hati-hati dan tantangan",
  latar: "#FEF2F2",
  kutipan: kutipanLokal("k5b6b-materi-2.ts:3"),
  ketukan: [
    k(
      "Hati-hati dengan kesalahan yang sering terjadi. Pertama, kelompokkan dulu semua jenis sudut dengan tepat, supaya kita yakin sudah paham.",
      tambah(0, teks("jud", 150, 24, "Hati-hati", 13, W.ungu)),
      tambah("kelompokkan", kartu("r1", 40, 40, 220, 30, W.hijauMuda, ["paham: kelompok tepat semuanya"], 9)),
      tambah("semua", ...sudut("rs0", 40, 150, 0, 40, 46), ...sudut("rs1", 130, 150, 0, 90, 46), ...sudut("rs2", 220, 150, 0, 135, 46)),
      tambah("tepat.", tanda("rc0", 70, 184, true, 14), tanda("rc1", 160, 184, true, 14), tanda("rc2", 250, 184, true, 14)),
    ),
    k(
      "Kesalahan pertama: sulit membedakan sudut yang lebih besar dan lebih kecil dari sudut siku-siku. Obatnya, coba contoh sudut lain dengan berbagai posisi dan arah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Belum bisa membedakan", 12.5, W.ungu)),
      tambah("membedakan", kartu("b1", 20, 40, 120, 40, W.merahMuda, ["lebih besar", "atau lebih kecil?"], 8.8), teks("bq", 230, 76, "?", 40, W.merah)),
      tambah("contoh", ...sudut("bs0", 30, 135, 80, 50, 40), ...sudut("bs1", 110, 135, 200, 100, 40), ...sudut("bs2", 190, 135, 330, 80, 40)),
      tambah("arah.", teks("bl", 150, 190, "contoh dengan posisi berbeda", 8.8, W.hijau)),
    ),
    k(
      "Kesalahan kedua: mengira salah satu kaki sudut harus selalu mendatar. Padahal sudut boleh menghadap ke arah mana saja.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kaki harus mendatar?", 13, W.ungu)),
      tambah("mendatar.", ...sudut("m0", 30, 120, 0, 50, 46), ...sudut("m1", 120, 120, 70, 50, 46), ...sudut("m2", 200, 120, 160, 50, 46), ...sudut("m3", 262, 90, 250, 50, 46)),
      tambah("Padahal", tanda("mc0", 70, 176, true, 16), tanda("mc1", 130, 176, true, 16), tanda("mc2", 170, 176, true, 16), tanda("mc3", 258, 176, true, 16)),
      tambah("saja.", teks("ml", 150, 196 - 4, "sudut yang sama, posisi berbeda", 8.6, W.merah)),
    ),
    k(
      "Kesalahan ketiga: menganggap semua pojokan benda adalah sudut. Padahal tidak semua pojokan benda dapat disebut sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kesalahan ketiga", 13, W.ungu)),
      tambah("semua", kartu("ms", 20, 40, 260, 30, W.merahMuda, ["semua pojokan adalah sudut"], 9)),
      tambah("Padahal", teks("mx", 150, 116, "✗", 40, W.merah), teks("mt", 150, 150, "tidak semua pojokan benda", 10, W.biru), teks("mt2", 150, 166, "dapat disebut sudut", 10, W.biru)),
    ),
    k(
      "Kita mudah menentukan jenis sudut ketika satu kakinya mendatar dan sudut terbuka ke atas. Karena itu latih juga posisi yang lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Latih posisi lain", 13, W.ungu)),
      tambah("mudah", ...sudut("pa", 40, 130, 0, 60, 60), teks("pat", 70, 160, "mudah", 10, W.hijau)),
      tambah("atas", teks("pah", 150, 100, "→", 24, W.ungu)),
      tambah("latih", ...sudut("pb", 215, 140, 120, 60, 60), teks("pbt", 235, 170, "latih juga", 10, W.merah)),
    ),
    k(
      "Tantangan untukmu: kalau sudah paham, coba kerjakan latihan tanpa bantuan. Kalau masih bingung, minta guru mendampingi.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tantangan", 13, W.ungu)),
      tambah("paham,", kartu("d1", 16, 44, 130, 80, W.hijauMuda, ["sudah paham", "kerjakan latihan", "tanpa bantuan"], 8.8)),
      tambah("guru", kartu("d2", 154, 44, 130, 80, W.krem, ["masih bingung", "minta guru", "mendampingi"], 8.8)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih Soal 1 bagian a sampai c (hlm. 172-173; Panduan Guru hlm. 261) ------------------------------ */
const B = (h: string) => SOAL1.find((s) => s.h === h) ?? SOAL1[0];
export const JENIS_LABEL: Record<Jenis, string> = { lancip: "lancip", "siku-siku": "siku-siku", tumpul: "tumpul" };
export const barisJawab = (id: string, y: number, h: string, jenis: string, warna: string = W.krem, x = 150, w = 140): Obj[] => [
  kotak(`${id}-k`, x, y, w, 24, warna, W.biru, { rx: 5, tebal: 1.2 }),
  teks(`${id}-a`, x + 8, y + 16, `${h}.`, 9, W.ungu, { anchor: "start" }),
  teks(`${id}-t`, x + w * 0.62, y + 16, jenis, 9.6, W.biru),
];

export const ADEGAN_SOAL1A: AdeganStory = {
  id: "soal1-abc",
  judul: "Latihan 1: jam, persimpangan jalan, tangga",
  sumber: "Materi: latihan jenis sudut",
  latar: "#EFF6FF",
  kutipan: kutipanLokal("k5b6b-materi-2.ts:4"),
  ketukan: [
    k(
      "Latihan satu. Tentukan jenis sudut yang sesuai dengan setiap benda. Bagian a: sudut yang dibentuk jarum pendek dan jarum panjang saat jam menunjukkan pukul delapan.",
      tambah(0, teks("jud", 150, 22, "Latihan 1", 12.5, W.ungu)),
      tambah("Bagian", teks("ha", 90, 52, "a. jam pukul 08.00", 9.4, W.merah)),
      tambah("jam", ...jam("ja", 90, 112, 44, 8, 0)),
      tambah("pukul", teks("hp", 90, 176, pukul(8, 0), 11, W.biru)),
    ),
    k(
      "Jarum pendek menunjuk angka delapan dan jarum panjang menunjuk angka dua belas. Sudut di antara keduanya lebih lebar dari pojok kertas lipatan, jadi jawabannya tumpul.",
      tambah("pendek", teks("jp", 30, 168, "jarum pendek", 7.4, W.biru), teks("jm", 150, 168, "jarum panjang", 7.4, W.hijau)),
      tambah("lebih", teks("jl", 224, 74, "lebih lebar", 10, W.merah), teks("jl2", 224, 88, "dari siku-siku", 9, W.merah)),
      tambah("tumpul.", ...barisJawab("ra", 104, "a", "tumpul"), tanda("rac", 270, 120, true, 14)),
    ),
    k(
      "Bagian b: sudut pada persimpangan jalan. Pada gambar, sudut yang ditandai lebih sempit daripada sudut siku-siku, jadi jawabannya lancip.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 1 bagian b", 12.5, W.ungu)),
      tambah("persimpangan", teks("hb", 150, 44, "b. persimpangan jalan", 9.4, W.merah), ...sudut("sb", 60, 140, B("b").rot, B("b").besar, 84, W.merahMuda, W.hitam)),
      tambah("sempit", kertasSiku("pb", 60, 140, B("b").rot, 60, { op: 0.55, z: -1 }), teks("bl", 220, 100, "lebih sempit", 10, W.merah)),
      tambah("lancip.", ...barisJawab("rb", 120, "b", "lancip", W.hijauMuda), tanda("rbc", 270, 136, true, 14)),
    ),
    k(
      "Bagian c: sudut pada tangga rumah. Sudut yang ditandai lebih lebar dari sudut siku-siku, jadi jawabannya tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 1 bagian c", 12.5, W.ungu)),
      tambah("tangga", teks("hc", 150, 44, "c. tangga rumah", 9.4, W.merah), ...sudut("sc", 90, 150, B("c").rot, B("c").besar, 82, W.merahMuda, W.hitam)),
      tambah("lebar", kertasSiku("pc", 90, 150, B("c").rot, 60, { op: 0.55, z: -1 }), teks("cl", 214, 92, "lebih lebar", 10, W.merah)),
      tambah("tumpul.", ...barisJawab("rc", 108, "c", "tumpul"), tanda("rcc", 270, 124, true, 14)),
    ),
    k(
      "Perhatikan caranya: kita selalu membandingkan dengan pojok lipatan kertas, bukan menebak dari arah gambar. Jadi sejauh ini a tumpul, b lancip, dan c tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jawaban sementara", 13, W.ungu)),
      tambah("membandingkan", kartu("cr", 20, 36, 260, 30, W.krem, ["bandingkan dengan pojok lipatan"], 9)),
      tambah(17, ...barisJawab("sa", 80, "a", "tumpul", W.krem, 20, 260)),
      tambah(19, ...barisJawab("sb", 112, "b", "lancip", W.hijauMuda, 20, 260)),
      tambah(22, ...barisJawab("sc", 144, "c", "tumpul", W.krem, 20, 260)),
    ),
  ],
};
