import type { AdeganStory } from "./logika-story";
import { SOAL1, W, bulat, emo, jam, kartu, kertasSiku, kotak, pukul, sudut, tanda, tandaSiku, teks } from "./k5b6b-gambar";
import { bersih, k, tambah } from "./k5b6b-bantu";
import { barisJawab } from "./k5b6b-materi-2";

const B = (h: string) => SOAL1.find((s) => s.h === h) ?? SOAL1[0];

/* ------------------------------ 9. Ayo Berlatih Soal 1 bagian d sampai f dan kunci (hlm. 173; Panduan Guru hlm. 261) ------------------------------ */
export const ADEGAN_SOAL1B: AdeganStory = {
  id: "soal1-def",
  judul: "Ayo Berlatih Soal 1: gunting, kipas, jendela, dan kunci",
  sumber: "Buku Siswa hlm. 173; Buku Panduan Guru hlm. 261",
  latar: "#EFF6FF",
  kutipan: ["Sudut yang", "terbentuk saat", "gunting dibuka", "sebuah kipas", "dibuka", "Sudut pada", "pojokan jendela", "Kunci Jawaban", "Ayo Berlatih", "Soal 1"],
  ketukan: [
    k(
      "Bagian d: sudut yang terbentuk saat gunting dibuka. Kedua bilah gunting menjadi dua kaki sudut dan engselnya menjadi titik sudut. Sudut yang ditandai lancip.",
      tambah(0, teks("jud", 150, 22, "Soal 1 bagian d", 12.5, W.ungu)),
      tambah("gunting", emo("gk", 225, 70, "✂️", 30), teks("hd", 225, 90, "d. gunting dibuka", 8.6, W.merah)),
      tambah("bilah", ...sudut("sd", 80, 150, B("d").rot, B("d").besar, 90, W.merahMuda, W.hitam)),
      tambah("engselnya", teks("de", 80, 172, "engsel = titik sudut", 8.4, W.merah)),
      tambah("lancip.", ...barisJawab("rd", 120, "d", "lancip", W.hijauMuda, 160, 124)),
    ),
    k(
      "Bagian e: sudut yang terbentuk saat sebuah kipas dibuka. Kipas terbuka lebar, lebih lebar dari sudut siku-siku, jadi kuncinya tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Soal 1 bagian e", 12.5, W.ungu)),
      tambah("kipas", teks("he", 150, 44, "e. kipas dibuka", 9.4, W.merah), ...sudut("se", 100, 160, B("e").rot, B("e").besar, 84, W.merahMuda, W.hitam)),
      tambah("lebar,", kertasSiku("pe", 100, 160, B("e").rot, 60, { op: 0.55, z: -1 }), teks("el", 100, 184, "lebih lebar dari siku-siku", 8.4, W.merah)),
      tambah("tumpul.", ...barisJawab("re", 78, "e", "tumpul", W.krem, 186, 100)),
    ),
    k(
      "Bagian f: sudut pada pojokan jendela. Pojoknya persis sama dengan lipatan kertas, jadi siku-siku. Inilah satu-satunya yang siku-siku di soal ini.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Soal 1 bagian f", 12.5, W.ungu)),
      tambah("jendela.", teks("hf", 150, 44, "f. pojokan jendela", 9.4, W.merah), kotak("jw", 90, 80, 70, 70, W.langitMuda, W.biru, { rx: 0, tebal: 3 })),
      tambah("Pojoknya", ...sudut("sf", 90, 150, B("f").rot, B("f").besar, 70, W.merahMuda, W.biru), tandaSiku("sfs", 90, 150, 0, 10)),
      tambah("siku-siku.", kertasSiku("pf", 90, 150, 0, 70, { op: 0.45, z: -1 }), ...barisJawab("rf", 90, "f", "siku-siku", W.hijauMuda, 180, 108)),
      tambah("satu-satunya", teks("fu", 234, 140, "satu-satunya", 9, W.merah)),
    ),
    k(
      "Kunci lengkap soal satu: a tumpul, b lancip, c tumpul, d lancip, e tumpul, dan f siku-siku.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kunci soal 1", 13, W.ungu)),
      tambah(4, ...barisJawab("kja", 44, "a", "tumpul", W.krem, 14, 132)),
      tambah(6, ...barisJawab("kjb", 44, "b", "lancip", W.hijauMuda, 154, 132)),
      tambah(8, ...barisJawab("kjc", 80, "c", "tumpul", W.krem, 14, 132)),
      tambah(10, ...barisJawab("kjd", 80, "d", "lancip", W.hijauMuda, 154, 132)),
      tambah(12, ...barisJawab("kje", 116, "e", "tumpul", W.krem, 14, 132)),
      tambah(15, ...barisJawab("kjf", 116, "f", "siku-siku", W.muda, 154, 132)),
    ),
    k(
      "Hitung jumlahnya: tiga sudut tumpul, dua sudut lancip, dan satu sudut siku-siku, jadi seluruhnya enam benda.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hitungan jenis", 13, W.ungu)),
      tambah("tiga", ...kartu("h3", 20, 40, 76, 70, W.krem, ["3", "tumpul"], 12)),
      tambah("dua", ...kartu("h2", 112, 40, 76, 70, W.hijauMuda, ["2", "lancip"], 12)),
      tambah("satu", ...kartu("h1", 204, 40, 76, 70, W.muda, ["1", "siku-siku"], 12)),
      tambah("seluruhnya", teks("hj", 150, 140, "3 + 2 = 5", 15, W.merah), teks("hj2", 150, 162, "5 + 1 = 6", 15, W.merah), teks("hb", 150, 184, "enam benda", 10, W.biru)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih Soal 2: jam analog (hlm. 174; Panduan Guru hlm. 262) ------------------------------ */
const JAWAB2: Array<[number, number, string]> = [
  [1, 0, "lancip"],
  [11, 0, "lancip"],
  [4, 0, "tumpul"],
  [10, 30, "tumpul"],
];
const kecil = (id: string, cx: number, cy: number, r: number, j: number, m: number, nama: string, warna: string) => [
  ...jam(id, cx, cy, r, j, m),
  teks(`${id}-wkt`, cx, cy + r + 13, pukul(j, m), 8.6, W.biru),
  teks(`${id}-jns`, cx, cy + r + 25, nama, 8.6, warna),
];

export const ADEGAN_SOAL2: AdeganStory = {
  id: "soal2",
  judul: "Ayo Berlatih Soal 2: sudut pada jam analog",
  sumber: "Buku Siswa hlm. 174; Buku Panduan Guru hlm. 262",
  latar: "#FFFBEB",
  kutipan: ["Soal 2", "Gambarlah 2 buah sudut tumpul dan 2 buah sudut lancip", "jarum pendek dan panjang pada", "jam analog", "pukul berapa yang", "Pada pukul 02.00 jarum", "membentuk", "sudut lancip", "Buat sudut yang", "berbeda dengan contoh", "Terima semua jawaban asal", "memenuhi kriteria sudut tumpul atau sudut lancip", "pukul 10.30", "jarum pendek tidak tepat berada di angka 10", "tengah-tengah"],
  ketukan: [
    k(
      "Soal dua: gambarlah dua sudut tumpul dan dua sudut lancip dengan jarum pendek dan jarum panjang pada jam analog, lalu tulis pukul berapa yang ditunjukkan.",
      tambah(0, teks("jud", 150, 24, "Soal 2: jam analog", 13, W.ungu)),
      tambah("tumpul", bulat("q0", 38, 100, 24, W.putih, W.biru, { tebal: 2 }), teks("q0t", 38, 108, "?", 24, W.merah), bulat("q1", 112, 100, 24, W.putih, W.biru, { tebal: 2 }), teks("q1t", 112, 108, "?", 24, W.merah), teks("q0n", 75, 144, "2 tumpul", 9, W.merah)),
      tambah("lancip", bulat("q2", 188, 100, 24, W.putih, W.biru, { tebal: 2 }), teks("q2t", 188, 108, "?", 24, W.merah), bulat("q3", 262, 100, 24, W.putih, W.biru, { tebal: 2 }), teks("q3t", 262, 108, "?", 24, W.merah), teks("q2n", 225, 144, "2 lancip", 9, W.hijau)),
    ),
    k(
      "Contoh dari buku: pada pukul dua, jarum pendek dan jarum panjang membentuk sudut lancip. Buatlah sudut yang berbeda dengan contoh.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Contoh dari buku", 13, W.ungu)),
      tambah("pukul", ...jam("cj", 86, 112, 50, 2, 0), teks("cjt", 86, 180, pukul(2, 0), 11, W.biru)),
      tambah("lancip.", ...kartu("cb", 160, 70, 124, 50, W.hijauMuda, ["pukul 02.00", "sudut lancip"], 10)),
      tambah("berbeda", teks("cc", 222, 150, "buat yang berbeda", 9.4, W.merah)),
    ),
    k(
      "Jawaban boleh bermacam-macam asalkan memenuhi kriteria sudut lancip atau tumpul. Misalnya pukul satu dan pukul sebelas membentuk sudut lancip.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Jawaban: sudut lancip", 12.5, W.ungu)),
      tambah("pukul", ...kecil("j1", 78, 98, 40, JAWAB2[0][0], JAWAB2[0][1], "lancip", W.hijau)),
      tambah("sebelas", ...kecil("j2", 222, 98, 40, JAWAB2[1][0], JAWAB2[1][1], "lancip", W.hijau)),
    ),
    k(
      "Pukul empat membentuk sudut tumpul. Pukul sepuluh lewat tiga puluh menit juga membentuk sudut tumpul, seperti contoh pada Buku Panduan Guru.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Jawaban: sudut tumpul", 12.5, W.ungu)),
      tambah("empat", ...kecil("j3", 78, 98, 40, JAWAB2[2][0], JAWAB2[2][1], "tumpul", W.merah)),
      tambah("sepuluh", ...kecil("j4", 222, 98, 40, JAWAB2[3][0], JAWAB2[3][1], "tumpul", W.merah)),
    ),
    k(
      "Perhatikan jika memakai menit. Pada pukul sepuluh tiga puluh, jarum pendek tidak tepat di angka sepuluh, tetapi sudah berada di tengah-tengah angka sepuluh dan sebelas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Hati-hati dengan menit", 12.5, W.ungu)),
      tambah("pukul", ...jam("pm", 90, 114, 52, 10, 30), teks("pmt", 90, 182, pukul(10, 30), 11, W.biru)),
      tambah("tepat", ...kartu("pn", 164, 60, 124, 56, W.merahMuda, ["jarum pendek bukan", "tepat di angka 10"], 8.8)),
      tambah("tengah-tengah", ...kartu("po", 164, 126, 124, 56, W.hijauMuda, ["di tengah angka", "10 dan 11"], 8.8)),
    ),
    k(
      "Jadi empat contoh kita: pukul satu dan pukul sebelas lancip, pukul empat dan pukul sepuluh tiga puluh tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Empat jawaban", 13, W.ungu)),
      tambah("satu", ...kecil("z1", 40, 90, 26, 1, 0, "lancip", W.hijau)),
      tambah("sebelas", ...kecil("z2", 115, 90, 26, 11, 0, "lancip", W.hijau)),
      tambah("empat,", ...kecil("z3", 190, 90, 26, 4, 0, "tumpul", W.merah)),
      tambah("tumpul.", ...kecil("z4", 262, 90, 26, 10, 30, "tumpul", W.merah)),
    ),
  ],
};

/* ------------------------------ 11. Refleksi nomor 2 dan 3 dan penutup (hlm. 187; Panduan Guru hlm. 262) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi",
  judul: "Refleksi nomor 2 dan 3 dan ringkasan Sub-Bab B",
  sumber: "Buku Siswa hlm. 187; Buku Panduan Guru hlm. 262",
  latar: "#F5F3FF",
  kutipan: ["isilah tabel berikut sesuai", "Berilah tanda centang", "Aku dapat memahami bagian-bagian sudut", "Aku dapat menyebutkan jenis-jenis sudut", "melakukan releksi", "pertanyaan releksi nomor 2 dan 3"],
  ketukan: [
    k(
      "Akhiri dengan refleksi. Isi tabel di buku dengan tanda centang, ya atau tidak, untuk pernyataan nomor dua dan nomor tiga.",
      tambah(0, teks("jud", 150, 22, "Refleksi", 13, W.ungu)),
      tambah("tabel", teks("hy", 240, 42, "Ya", 8.6, W.hijau), teks("ht", 270, 42, "Tidak", 8.6, W.merah)),
      tambah("nomor", kotak("r2", 12, 48, 276, 44, W.putih, W.biru, { rx: 5, tebal: 1.2 }), teks("r2t", 20, 74, "2. Aku dapat memahami bagian-bagian sudut.", 7.8, W.biru, { anchor: "start" }), kotak("r2y", 234, 62, 14, 14, W.putih, W.hijau, { rx: 2, tebal: 1.2 }), kotak("r2n", 264, 62, 14, 14, W.putih, W.merah, { rx: 2, tebal: 1.2 })),
      tambah("tiga.", kotak("r3", 12, 100, 276, 44, W.putih, W.biru, { rx: 5, tebal: 1.2 }), teks("r3t", 20, 126, "3. Aku dapat menyebutkan jenis-jenis sudut.", 7.8, W.biru, { anchor: "start" }), kotak("r3y", 234, 114, 14, 14, W.putih, W.hijau, { rx: 2, tebal: 1.2 }), kotak("r3n", 264, 114, 14, 14, W.putih, W.merah, { rx: 2, tebal: 1.2 })),
    ),
    k(
      "Nomor dua: aku dapat memahami bagian-bagian sudut, yaitu satu titik sudut dan dua kaki sudut.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nomor dua: bagian sudut", 12.5, W.ungu)),
      tambah("sudut,", ...sudut("n2", 60, 150, 10, 55, 120)),
      tambah("titik", teks("n2a", 40, 176, "titik sudut", 9.4, W.merah)),
      tambah("kaki", teks("n2b", 218, 134, "kaki sudut", 9.4, W.ungu), teks("n2c", 112, 92, "kaki sudut", 9.4, W.ungu, { rot: -65 })),
    ),
    k(
      "Nomor tiga: aku dapat menyebutkan jenis-jenis sudut, yaitu lancip, siku-siku, dan tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nomor tiga: jenis sudut", 12.5, W.ungu)),
      tambah("lancip,", ...sudut("n30", 20, 130, 0, 40, 64), teks("n30t", 52, 164, "lancip", 10, W.merah)),
      tambah("siku-siku,", ...sudut("n31", 112, 130, 0, 90, 64), tandaSiku("n31s", 112, 130, 0, 8), teks("n31t", 142, 164, "siku-siku", 10, W.merah)),
      tambah("tumpul.", ...sudut("n32", 232, 130, 20, 120, 52), teks("n32t", 232, 164, "tumpul", 10, W.merah)),
    ),
    k(
      "Kalau masih ragu, tanyakan dua hal. Apakah ada dua kaki yang bertemu di satu titik sudut? Lalu apakah sudutnya lebih sempit, sama, atau lebih lebar dari lipatan kertas?",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kalau masih ragu", 13, W.ungu)),
      tambah("tanyakan", ...kartu("q1", 20, 40, 260, 44, W.hijauMuda, ["1. dua kaki bertemu di satu titik sudut?", "jika tidak: bukan sudut"], 8.4)),
      tambah("lalu", ...kartu("q2", 20, 100, 260, 44, W.krem, ["2. bandingkan dengan lipatan kertas", "sempit, sama, atau lebar?"], 8.4)),
    ),
    k(
      "Ringkasan Sub-Bab B: sudut dibentuk dua garis yang bertemu di satu titik, bagiannya titik sudut dan kaki sudut, dan jenisnya lancip, siku-siku, atau tumpul.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ringkasan Sub-Bab B", 13, W.ungu)),
      tambah("dibentuk", ...kartu("m1", 20, 38, 260, 30, W.muda, ["dua garis bertemu di satu titik"], 9)),
      tambah("bagiannya", ...kartu("m2", 20, 78, 260, 30, W.hijauMuda, ["bagian: titik sudut dan kaki sudut"], 9)),
      tambah("jenisnya", ...kartu("m3", 20, 118, 260, 30, W.krem, ["jenis: lancip, siku-siku, tumpul"], 9)),
      tambah("tumpul.", tanda("m4", 150, 176, true, 22)),
    ),
  ],
};
