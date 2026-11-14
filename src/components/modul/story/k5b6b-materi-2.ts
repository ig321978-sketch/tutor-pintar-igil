import type { AdeganStory, Obj } from "./logika-story";
import { SOAL1, W, jam, kartu, kertasSiku, kotak, panah, pukul, sudut, tanda, tandaSiku, teks } from "./k5b6b-gambar";
import type { Jenis } from "./k5b6b-gambar";
import { bersih, k, tambah } from "./k5b6b-bantu";

/* ------------------------------ 5. Eksplorasi 6.2 mengelompokkan sudut (hlm. 171-172; Panduan Guru hlm. 259-260) ------------------------------ */
const TIGA_X = [12, 106, 200];
const KOLOM = ["lebih kecil dari", "sudut", "lebih besar dari"];

export const ADEGAN_EKSPLORASI: AdeganStory = {
  id: "eksplorasi-62",
  judul: "Eksplorasi 6.2: mengelompokkan sudut",
  sumber: "Buku Siswa hlm. 171–172; Buku Panduan Guru hlm. 259–260",
  latar: "#F0FDF4",
  kutipan: ["Eksplorasi 6.2", "Mengelompokkan Sudut", "Pada Aktivitas 1 kalian sudah menemukan sudut dari sekitar kalian", "Tabel 6.3 Kelompok Sudut", "Sudut yang Lebih Kecil", "dari Sudut Siku-Siku", "Sudut yang Lebih", "Besar dari Sudut", "guru bertindak sebagai fasilitator", "berkeliling memeriksa", "secara kelompok", "ataupun individu"],
  ketukan: [
    k(
      "Eksplorasi 6.2, mengelompokkan sudut. Kita memakai sudut-sudut yang sudah ditemukan pada Eksplorasi 6.1, ketika kita menjadi detektif sudut.",
      tambah(0, teks("jud", 150, 24, "Mengelompokkan sudut", 13, W.ungu)),
      tambah("ditemukan", kartu("e1", 20, 56, 120, 56, W.hijauMuda, ["Eksplorasi 6.1", "temuan sudut"], 9)),
      tambah("detektif", panah("ep", 142, 84, 16, 0, W.ungu, 2.4), kartu("e2", 160, 56, 120, 56, W.muda, ["Eksplorasi 6.2", "kelompokkan sudut"], 9)),
    ),
    k(
      "Salin Tabel 6.3 di buku tugas. Tabel ini punya tiga kolom: sudut yang lebih kecil dari sudut siku-siku, sudut siku-siku, dan sudut yang lebih besar dari sudut siku-siku.",
      bersih(0),
      tambah("Tabel", teks("jud", 150, 24, "Tabel 6.3 Kelompok Sudut", 12.5, W.ungu)),
      tambah("kolom:", ...TIGA_X.map((x, i) => kotak(`tb${i}`, x, 62, 88, 100, W.putih, W.biru, { rx: 4, tebal: 1.2 }))),
      tambah("kecil", ...kartu("h0", 12, 36, 88, 26, W.hijauMuda, [KOLOM[0], "sudut siku-siku"], 7.4, { rx: 4 })),
      tambah("siku-siku,@2", ...kartu("h1", 106, 36, 88, 26, W.krem, [KOLOM[1], "siku-siku"], 7.4, { rx: 4 })),
      tambah("besar", ...kartu("h2", 200, 36, 88, 26, W.merahMuda, [KOLOM[2], "sudut siku-siku"], 7.4, { rx: 4 })),
    ),
    k(
      "Periksa tiap sudut temuanmu dengan lipatan kertas yang sudah dibuat. Letakkan pojok lipatan pada sudut itu, lalu lihat apakah sudutnya lebih sempit, sama, atau lebih lebar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Periksa dengan lipatan", 12.5, W.ungu)),
      tambah("temuanmu", sudut("p0", 22, 130, 0, 40, 62), sudut("p1", 112, 130, 0, 90, 62), sudut("p2", 202, 130, 0, 135, 62)),
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
      "Guru berperan sebagai fasilitator: berkeliling memeriksa hasil dan perkembangan kerja tiap kelompok, dan memastikan alat pemeriksa sudut siku-siku dipakai dengan tepat. Kegiatan boleh berkelompok atau individu.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Peran guru", 13, W.ungu)),
      tambah("berkeliling", kartu("g1", 24, 40, 252, 30, W.hijauMuda, ["berkeliling memeriksa hasil kerja"], 9)),
      tambah("memastikan", kartu("g2", 24, 80, 252, 30, W.muda, ["memastikan lipatan siku-siku dipakai tepat"], 8.4)),
      tambah("Kegiatan", kartu("g3", 24, 120, 252, 30, W.krem, ["boleh berkelompok atau individu"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Sudut lancip, siku-siku, dan tumpul (hlm. 172; Panduan Guru hlm. 259-260) ------------------------------ */
export const ADEGAN_LANCIP_TUMPUL: AdeganStory = {
  id: "lancip-tumpul",
  judul: "Sudut lancip, siku-siku, dan tumpul",
  sumber: "Buku Siswa hlm. 172; Buku Panduan Guru hlm. 259–260",
  latar: "#FFF7ED",
  kutipan: ["sudut lancip", "sudut yang lebih besar dari sudut siku-siku disebut", "sudut tumpul", "mempresentasikan hasil", "menyimpulkan hal-hal penting", "mengelompokkan sudut", "mengerjakan soal Ayo Berlatih"],
  ketukan: [
    k(
      "Pada Tabel 6.3 ada tiga kelompok sudut. Sudut yang lebih kecil dari sudut siku-siku disebut sudut lancip.",
      tambah(0, teks("jud", 150, 24, "Tabel 6.3: sudut lancip", 12.5, W.ungu)),
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
      "Di akhir kegiatan, siswa mempresentasikan hasil kerjanya, lalu menyimpulkan hal penting saat mengelompokkan sudut, dan dilanjutkan mengerjakan soal Ayo Berlatih.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Akhir pembelajaran", 13, W.ungu)),
      tambah("mempresentasikan", kartu("ak1", 24, 40, 252, 30, W.hijauMuda, ["presentasikan hasil kerja"], 9)),
      tambah("menyimpulkan", kartu("ak2", 24, 80, 252, 30, W.muda, ["simpulkan hal penting"], 9)),
      tambah("Berlatih.", kartu("ak3", 24, 120, 252, 30, W.krem, ["kerjakan soal Ayo Berlatih"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Salah kaprah dan diferensiasi (Panduan Guru hlm. 259-260) ------------------------------ */
export const ADEGAN_SALAH_KAPRAH: AdeganStory = {
  id: "salah-kaprah",
  judul: "Kemungkinan respons, miskonsepsi, dan diferensiasi",
  sumber: "Buku Panduan Guru hlm. 259–260",
  latar: "#FEF2F2",
  kutipan: ["Kemungkinan Respons", "mengelompokkan semua jenis sudut sesuai dengan", "tidak dapat membedakan sudut", "lebih besar dan lebih kecil dari sudut", "salah satu kaki sudut", "harus selalu mendatar", "memberikan contoh lain dengan", "berbagai macam posisi dan arah", "Miskonsepsi", "menganggap semua pojokan benda sebagai sudut", "Tidak semua pojokan benda dapat dikategorikan", "sudut terbuka", "Diferensiasi", "mengerjakan latihan tanpa bantuan"],
  ketukan: [
    k(
      "Buku panduan guru mencatat kemungkinan respons siswa. Siswa yang pemahamannya baik dapat mengelompokkan semua jenis sudut dengan tepat.",
      tambah(0, teks("jud", 150, 24, "Kemungkinan respons", 13, W.ungu)),
      tambah("pemahamannya", kartu("r1", 40, 40, 220, 30, W.hijauMuda, ["paham: kelompok tepat semuanya"], 9)),
      tambah("semua", ...sudut("rs0", 40, 150, 0, 40, 46), ...sudut("rs1", 130, 150, 0, 90, 46), ...sudut("rs2", 220, 150, 0, 135, 46)),
      tambah("tepat.", tanda("rc0", 70, 184, true, 14), tanda("rc1", 160, 184, true, 14), tanda("rc2", 250, 184, true, 14)),
    ),
    k(
      "Mungkin ada siswa yang tidak dapat membedakan sudut yang lebih besar dan lebih kecil dari sudut siku-siku. Guru memberi contoh sudut lain dengan berbagai posisi dan arah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Belum bisa membedakan", 12.5, W.ungu)),
      tambah("membedakan", kartu("b1", 20, 40, 120, 40, W.merahMuda, ["lebih besar", "atau lebih kecil?"], 8.8), teks("bq", 230, 76, "?", 40, W.merah)),
      tambah("contoh", ...sudut("bs0", 30, 135, 80, 50, 40), ...sudut("bs1", 110, 135, 200, 100, 40), ...sudut("bs2", 190, 135, 330, 80, 40)),
      tambah("arah.", teks("bl", 150, 190, "contoh dengan posisi berbeda", 8.8, W.hijau)),
    ),
    k(
      "Mungkin juga ada siswa yang mengira salah satu kaki sudut harus selalu mendatar. Padahal sudut boleh menghadap ke arah mana saja.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Kaki harus mendatar?", 13, W.ungu)),
      tambah("mendatar.", ...sudut("m0", 30, 120, 0, 50, 46), ...sudut("m1", 120, 120, 70, 50, 46), ...sudut("m2", 200, 120, 160, 50, 46), ...sudut("m3", 262, 90, 250, 50, 46)),
      tambah("Padahal", tanda("mc0", 70, 176, true, 16), tanda("mc1", 130, 176, true, 16), tanda("mc2", 170, 176, true, 16), tanda("mc3", 258, 176, true, 16)),
      tambah("saja.", teks("ml", 150, 196 - 4, "sudut yang sama, posisi berbeda", 8.6, W.merah)),
    ),
    k(
      "Salah kaprah lain: menganggap semua pojokan benda adalah sudut. Padahal tidak semua pojokan benda dapat disebut sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Miskonsepsi", 13, W.ungu)),
      tambah("semua", kartu("ms", 20, 40, 260, 30, W.merahMuda, ["semua pojokan adalah sudut"], 9)),
      tambah("Padahal", teks("mx", 150, 116, "✗", 40, W.merah), teks("mt", 150, 150, "tidak semua pojokan benda", 10, W.biru), teks("mt2", 150, 166, "dapat disebut sudut", 10, W.biru)),
    ),
    k(
      "Sebagian besar siswa mudah menentukan jenis sudut ketika satu kakinya mendatar dan sudut terbuka ke atas. Karena itu latih juga posisi yang lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Latih posisi lain", 13, W.ungu)),
      tambah("mudah", ...sudut("pa", 40, 130, 0, 60, 60), teks("pat", 70, 160, "mudah", 10, W.hijau)),
      tambah("atas", teks("pah", 150, 100, "→", 24, W.ungu)),
      tambah("latih", ...sudut("pb", 215, 140, 120, 60, 60), teks("pbt", 235, 170, "latih juga", 10, W.merah)),
    ),
    k(
      "Diferensiasi: siswa yang belajar cepat mengerjakan latihan tanpa bantuan, sedangkan guru mendampingi siswa yang mengalami kesulitan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Diferensiasi", 13, W.ungu)),
      tambah("cepat", kartu("d1", 16, 44, 130, 80, W.hijauMuda, ["belajar cepat", "kerjakan latihan", "tanpa bantuan"], 8.8)),
      tambah("guru", kartu("d2", 154, 44, 130, 80, W.krem, ["guru mendampingi", "siswa yang", "kesulitan"], 8.8)),
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
  judul: "Ayo Berlatih Soal 1: jam, persimpangan jalan, tangga",
  sumber: "Buku Siswa hlm. 172–173; Buku Panduan Guru hlm. 261",
  latar: "#EFF6FF",
  kutipan: ["Berilah tanda centang", "pada jenis sudut yang sesuai dengan", "setiap jenis benda berikut ini", "Soal 1", "Sudut yang", "terbentuk oleh", "jarum pendek", "dan panjang saat jam", "menunjukkan", "pukul 08.00", "Sudut pada", "persimpangan", "tangga rumah", "Kunci Jawaban"],
  ketukan: [
    k(
      "Ayo berlatih, soal satu. Berilah tanda centang pada jenis sudut yang sesuai dengan setiap benda. Bagian a: sudut yang dibentuk jarum pendek dan jarum panjang saat jam menunjukkan pukul delapan.",
      tambah(0, teks("jud", 150, 22, "Ayo Berlatih · Soal 1", 12.5, W.ungu)),
      tambah("Bagian", teks("ha", 90, 52, "a. jam pukul 08.00", 9.4, W.merah)),
      tambah("jam", ...jam("ja", 90, 112, 44, 8, 0)),
      tambah("pukul", teks("hp", 90, 176, pukul(8, 0), 11, W.biru)),
    ),
    k(
      "Jarum pendek menunjuk angka delapan dan jarum panjang menunjuk angka dua belas. Sudut di antara keduanya lebih lebar dari pojok kertas lipatan, jadi kuncinya tumpul.",
      tambah("pendek", teks("jp", 30, 168, "jarum pendek", 7.4, W.biru), teks("jm", 150, 168, "jarum panjang", 7.4, W.hijau)),
      tambah("lebih", teks("jl", 224, 74, "lebih lebar", 10, W.merah), teks("jl2", 224, 88, "dari siku-siku", 9, W.merah)),
      tambah("tumpul.", ...barisJawab("ra", 104, "a", "tumpul"), tanda("rac", 270, 120, true, 14)),
    ),
    k(
      "Bagian b: sudut pada persimpangan jalan. Pada gambar buku, sudut yang ditandai lebih sempit daripada sudut siku-siku, jadi kuncinya lancip.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Soal 1 bagian b", 12.5, W.ungu)),
      tambah("persimpangan", teks("hb", 150, 44, "b. persimpangan jalan", 9.4, W.merah), ...sudut("sb", 60, 140, B("b").rot, B("b").besar, 84, W.merahMuda, W.hitam)),
      tambah("sempit", kertasSiku("pb", 60, 140, B("b").rot, 60, { op: 0.55, z: -1 }), teks("bl", 220, 100, "lebih sempit", 10, W.merah)),
      tambah("lancip.", ...barisJawab("rb", 120, "b", "lancip", W.hijauMuda), tanda("rbc", 270, 136, true, 14)),
    ),
    k(
      "Bagian c: sudut pada tangga rumah. Sudut yang ditandai lebih lebar dari sudut siku-siku, jadi kuncinya tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Soal 1 bagian c", 12.5, W.ungu)),
      tambah("tangga", teks("hc", 150, 44, "c. tangga rumah", 9.4, W.merah), ...sudut("sc", 90, 150, B("c").rot, B("c").besar, 82, W.merahMuda, W.hitam)),
      tambah("lebar", kertasSiku("pc", 90, 150, B("c").rot, 60, { op: 0.55, z: -1 }), teks("cl", 214, 92, "lebih lebar", 10, W.merah)),
      tambah("tumpul.", ...barisJawab("rc", 108, "c", "tumpul"), tanda("rcc", 270, 124, true, 14)),
    ),
    k(
      "Perhatikan caranya: kita selalu membandingkan dengan pojok lipatan kertas, bukan menebak dari arah gambar. Jadi sejauh ini a tumpul, b lancip, dan c tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kunci sementara", 13, W.ungu)),
      tambah("membandingkan", kartu("cr", 20, 36, 260, 30, W.krem, ["bandingkan dengan pojok lipatan"], 9)),
      tambah(17, ...barisJawab("sa", 80, "a", "tumpul", W.krem, 20, 260)),
      tambah(19, ...barisJawab("sb", 112, "b", "lancip", W.hijauMuda, 20, 260)),
      tambah(22, ...barisJawab("sc", 144, "c", "tumpul", W.krem, 20, 260)),
    ),
  ],
};
