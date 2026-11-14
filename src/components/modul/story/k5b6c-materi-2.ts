import type { AdeganStory } from "./logika-story";
import { W, barisKipas, busurDerajat, busurPutar, busurSudut, garis, garisUjung, judul, kartu, kaki, kotak, sudutDua, tandaSiku, teks } from "./k5b6c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k5b6c-bantu";

const WARNA_KIPAS = [W.jingga, W.langit, W.hijauMuda, W.pink];

/* ------------------------------ 5. Salah membaca skala dan busur miring (Panduan Guru hlm. 264) ------------------------------ */
export const ADEGAN_SALAH_BACA: AdeganStory = {
  id: "salah-baca",
  judul: "Kesalahan membaca skala dan busur yang miring",
  sumber: "Panduan Guru hlm. 264",
  latar: "#FEF2F2",
  kutipan: [
    "Mungkin ada peserta didik yang salah membaca",
    "skala busur derajat",
    "membaca dengan mengacu pada skala bagian",
    "luar atau bagian dalam",
    "menggunakan skala luar sehingga hasilnya 55",
    "bahwa saat melakukan pengukuran, posisi",
    "busur derajat harus selalu horizontal",
    "skala pada busur dapat menggunakan bagian luar atau dalam",
    "garis dasar busur yang berimpit dengan",
    "salah satu kaki sudut selalu menunjukkan",
  ],
  ketukan: [
    k(
      "Panduan Guru memperingatkan kesalahan yang sering terjadi, yaitu salah membaca skala. Ada murid yang membaca skala luar, padahal seharusnya membaca skala dalam.",
      tambah(0, judul("kesalahan: salah membaca skala"), ...busurDerajat("bs", 150, 172, 88, { op: 0.85 })),
      tambah(0, ...sudutDua("sb", 150, 172, 100, 180, 55, W.biru, 2.6, { z: 5 })),
      tambah("luar,", teks("bs-o", 209, 86, "55° ✗", 9, W.merah)),
      tambah("dalam.", teks("bs-d", 180, 132, "125° ✓", 8.6, W.hijau)),
    ),
    k(
      "Pada contoh tadi, skala luar menunjuk lima puluh lima derajat, padahal sudut itu jelas lebih lebar dari sudut siku-siku. Yang benar adalah seratus dua puluh lima derajat.",
      sorotkan("luar", "bs-o"),
      tambah("siku-siku.", kaki("sb-s", 150, 172, 100, 90, W.ungu, 1.6, { putus: true, z: 4 }), teks("sb-st", 150, 64, "siku-siku 90°", 8.6, W.ungu)),
      redamkan("benar", "bs-o"),
      sorotkan("benar", "bs-d"),
    ),
    k(
      "Cara memeriksanya mudah. Bandingkan dulu dengan sudut siku-siku. Sudut yang lebih lebar dari siku-siku pasti lebih dari sembilan puluh, jadi lima puluh lima tidak mungkin.",
      redamkan(0, "bs-d"),
      tambah("Bandingkan", ...kartu("pk", 8, 28, 124, 28, W.krem, ["lebih lebar dari 90°", "berarti lebih dari 90°"], 7.8)),
      tambah("mungkin.", ...kartu("pm", 168, 28, 124, 28, W.merahMuda, ["55° kurang dari 90°", "jadi tidak cocok"], 7.8)),
      ubah("mungkin.", { id: "bs-o", warna: W.abu, op: 0.5 }),
    ),
    k(
      "Kesalahan kedua, murid mengira busur harus selalu mendatar. Padahal busur boleh miring. Yang terpenting, garis dasar berimpit dengan satu kaki sudut, dan kaki itu menunjukkan nol.",
      bersih(0),
      tambah(0, judul("kesalahan: busur harus mendatar?")),
      tambah("miring.", ...busurPutar("bm", 120, 150, 62, 30)),
      tambah("berimpit", ...sudutDua("bm", 120, 150, 92, 30, 100, W.biru, 2.6, { z: 5 })),
      tambah("nol.", teks("bm-nol", 202, 108, "0°", 10, W.merah), teks("bm-n", 142, 104, "70°", 9, W.hijau)),
      tambah("miring.", ...kartu("bk", 196, 130, 98, 56, W.krem, ["busur boleh miring", "asal garis dasar", "berimpit dengan", "satu kaki sudut"], 8)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 6.3 nomor 1: empat kipas (hlm. 179, Panduan Guru hlm. 265) ------------------------------ */
const NILAI_KIPAS = [105, 130, 135, 85];
export const ADEGAN_EKS_KIPAS: AdeganStory = {
  id: "eks-kipas",
  judul: "Eksplorasi 6.3 nomor 1: mengukur empat kipas",
  sumber: "Buku Siswa hlm. 176 dan 179; Panduan Guru hlm. 265",
  latar: "#FFFBEB",
  kutipan: [
    "Eksplorasi 6.3",
    "Ayo Berdiskusi",
    "kembali ke gambar 6.8, ukurlah sudut yang dibentuk",
    "oleh setiap kipas. Kipas manakah yang terbuka paling lebar?",
    "Jadi, kipas yang terbuka paling lebar adalah kipas 3 karena ukuran sudutnya",
    "paling besar",
  ],
  ketukan: [
    k(
      "Eksplorasi enam titik tiga, Ayo Berdiskusi. Pertanyaan satu, kembali ke empat kipas tadi. Ukur sudut tiap kipas, lalu tentukan kipas yang terbuka paling lebar.",
      tambah("Eksplorasi", judul("Eksplorasi 6.3: Ayo Berdiskusi")),
      tambah("kembali", ...barisKipas("ek", NILAI_KIPAS, 130, 36, WARNA_KIPAS)),
      tambah("Ukur", ...kartu("q1", 30, 154, 240, 34, W.krem, ["ukur tiap kipas, cari yang terlebar"], 9.2)),
    ),
    k(
      "Hasil pengukurannya, kipas satu seratus lima derajat, dan kipas dua seratus tiga puluh derajat.",
      tambah("satu", teks("ek1-n", 37.5, 108, "105°", 9.4, W.merah)),
      tambah("dua", teks("ek2-n", 112.5, 108, "130°", 9.4, W.merah)),
      sorotkan("dua", "ek2-f"),
    ),
    k(
      "Kipas tiga seratus tiga puluh lima derajat, dan kipas empat delapan puluh lima derajat.",
      redamkan(0, "ek2-f"),
      tambah("tiga", teks("ek3-n", 187.5, 108, "135°", 9.4, W.merah)),
      tambah("empat", teks("ek4-n", 262.5, 108, "85°", 9.4, W.merah)),
    ),
    k(
      "Kipas yang terbuka paling lebar adalah kipas tiga, karena ukuran sudutnya paling besar. Kipas empat paling sempit, bahkan lebih kecil dari sudut siku-siku.",
      hapus(0, "q1-k", "q1-t0"),
      sorotkan("tiga,", "ek3-f"),
      tambah("tiga,", ...kartu("w3", 120, 156, 150, 30, W.hijauMuda, ["terlebar: kipas 3 (135°)"], 9)),
      tambah("sempit,", teks("ek4-j", 262.5, 160, "lancip", 8.6, W.hijau)),
    ),
    k(
      "Urutan dari yang terbuka paling lebar: kipas tiga, kipas dua, kipas satu, lalu kipas empat. Membandingkan sudut sama dengan membandingkan angka derajatnya.",
      bersih(0),
      tambah(0, judul("urutan lebar kipas")),
      tambah("tiga,", teks("lb3", 62, 52, "Kipas 3", 8.6, W.biru, { anchor: "end" }), kotak("br3", 70, 40, 189, 18, W.hijauMuda), teks("bn3", 164, 52, "135°", 9, W.biru)),
      tambah("dua,", teks("lb2", 62, 88, "Kipas 2", 8.6, W.biru, { anchor: "end" }), kotak("br2", 70, 76, 182, 18, W.langit), teks("bn2", 161, 88, "130°", 9, W.biru)),
      tambah("satu,", teks("lb1", 62, 124, "Kipas 1", 8.6, W.biru, { anchor: "end" }), kotak("br1", 70, 112, 147, 18, W.jingga), teks("bn1", 143, 124, "105°", 9, W.biru)),
      tambah("empat.", teks("lb4", 62, 160, "Kipas 4", 8.6, W.biru, { anchor: "end" }), kotak("br4", 70, 148, 119, 18, W.pink), teks("bn4", 130, 160, "85°", 9, W.biru)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 6.3 nomor 2 dan 3: siku-siku dan jodoh (hlm. 179-180) ------------------------------ */
export const ADEGAN_SIKU_JODOH: AdeganStory = {
  id: "eks-siku-jodoh",
  judul: "Eksplorasi 6.3 nomor 2 dan 3: sudut siku-siku dan menjodohkan",
  sumber: "Buku Siswa hlm. 179–180; Panduan Guru hlm. 265",
  latar: "#F5F3FF",
  kutipan: [
    "Buatlah sudut siku-siku dari",
    "selembar kertas",
    "ukurlah besarnya sudut",
    "Berapa derajat ukuran sudut siku-",
    "Jodohkan pernyataan yang sesuai",
    "Sudut lancip",
    "Sudut siku-siku",
    "Sudut tumpul",
    "Ukuran sudutnya adalah 90",
    "Sudut yang besarnya lebih dari 0",
    "Sudut yang besarnya lebih dari",
  ],
  ketukan: [
    k(
      "Pertanyaan dua. Buat sudut siku-siku dari selembar kertas seperti di Subbab A, lalu ukur dengan busur derajat. Berapa derajat ukuran sudut siku-siku itu?",
      tambah(0, judul("Eksplorasi 6.3 nomor 2")),
      tambah("selembar", kotak("kr", 110, 92, 80, 80, W.krem, W.coklat, { rx: 1, z: -1 }), teks("kr-t", 172, 100, "kertas", 8.6, W.coklat)),
      tambah("ukur", ...busurDerajat("bk", 110, 172, 76, { op: 0.8 })),
      tambah("ukur", ...sudutDua("sk", 110, 172, 86, 0, 90, W.biru, 2.6, { z: 5 })),
      tambah("Berapa", teks("sk-n", 214, 132, "?", 16, W.merah), tandaSiku("sk-t", 110, 172, 11, 0, W.merah, { z: 6 })),
    ),
    k(
      "Jawabannya sembilan puluh derajat. Jadi, sudut siku-siku besarnya sembilan puluh derajat, tidak lebih dan tidak kurang.",
      ubah("Jawabannya", { id: "sk-n", isi: "90°", u: 12, warna: W.hijau }),
      tambah("Jadi,", busurSudut("sk", 110, 172, 28, 0, 90, W.merah, { tebal: 2.4 })),
      tambah("kurang.", ...kartu("hs", 196, 36, 94, 34, W.emas, ["siku-siku", "= 90°"], 9)),
    ),
    k(
      "Pertanyaan tiga, menjodohkan. Sudut lancip besarnya lebih dari nol dan kurang dari sembilan puluh derajat. Sudut siku-siku tepat sembilan puluh derajat.",
      bersih(0),
      tambah(0, judul("Eksplorasi 6.3 nomor 3: jodohkan")),
      tambah("menjodohkan.", ...kartu("jl", 10, 36, 100, 34, W.hijauMuda, ["Sudut lancip"], 9), ...kartu("js", 10, 92, 100, 34, W.langit, ["Sudut siku-siku"], 9), ...kartu("jt", 10, 148, 100, 34, W.pink, ["Sudut tumpul"], 9)),
      tambah("menjodohkan.", ...kartu("rs", 176, 36, 114, 34, W.krem, ["sudut yang besarnya", "90°"], 8.2), ...kartu("rt", 176, 92, 114, 34, W.krem, ["lebih dari 90° dan", "kurang dari 180°"], 8.2), ...kartu("rl", 176, 148, 114, 34, W.krem, ["lebih dari 0° dan", "kurang dari 90°"], 8.2)),
      tambah("lancip", garis("j1", 110, 53, 66, 112, W.hijau, 2.4, { gambar: true })),
      tambah("tepat", garis("j2", 110, 109, 66, -56, W.biru, 2.4, { gambar: true })),
    ),
    k(
      "Terakhir, sudut tumpul besarnya lebih dari sembilan puluh derajat dan kurang dari seratus delapan puluh derajat.",
      tambah("tumpul", garis("j3", 110, 165, 66, -56, W.merah, 2.4, { gambar: true })),
      sorotkan("seratus", "rt-k"),
    ),
    k(
      "Kita terapkan pada empat kipas tadi. Kipas empat lancip karena kurang dari sembilan puluh, sedangkan kipas satu, dua, dan tiga tumpul karena lebih dari sembilan puluh.",
      bersih(0),
      tambah(0, judul("jenis sudut keempat kipas")),
      tambah("empat@2", ...barisKipas("kj", NILAI_KIPAS, 120, 36, WARNA_KIPAS)),
      tambah("empat@2", teks("kj1-n", 37.5, 146, "105°", 9, W.biru), teks("kj2-n", 112.5, 146, "130°", 9, W.biru), teks("kj3-n", 187.5, 146, "135°", 9, W.biru), teks("kj4-n", 262.5, 146, "85°", 9, W.biru)),
      tambah("lancip", teks("kj4-j", 262.5, 160, "lancip", 9, W.hijau)),
      tambah("tumpul", teks("kj1-j", 37.5, 160, "tumpul", 9, W.merah), teks("kj2-j", 112.5, 160, "tumpul", 9, W.merah), teks("kj3-j", 187.5, 160, "tumpul", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Miskonsepsi: lebar jarak ujung kaki (Panduan Guru hlm. 266) ------------------------------ */
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-lebar",
  judul: "Miskonsepsi: panjang kaki bukan ukuran sudut",
  sumber: "Panduan Guru hlm. 266",
  latar: "#FFF1F2",
  kutipan: [
    "Kesalahan yang sering terjadi saat peserta didik membandingkan ukuran",
    "sudut adalah peserta didik meyakini bahwa makin lebar jarak antarujung kaki",
    "sudut, maka sudutnya akan makin besar",
    "jika",
    "panjang kaki sudut pada kedua sudut tersebut sama",
    "Sudut 1",
    "Sudut 2",
    "besar sudut itu dapat diwakili sebagai suatu putaran",
    "busur derajat dapat digunakan untuk mengukur sudut",
  ],
  ketukan: [
    k(
      "Panduan Guru mencatat kesalahan yang sering terjadi: murid mengira makin lebar jarak antara ujung kaki sudut, makin besar sudutnya.",
      tambah(0, judul("anggapan: ujung kaki makin jauh")),
      tambah("Panduan", ...sudutDua("s1", 25, 160, 46, 10, 50, W.biru), teks("s1-m", 50, 184, "Sudut 1", 9, W.biru)),
      tambah("jarak", garisUjung("s1-g", 25, 160, 46, 10, 50), teks("s1-t", 60, 124, "dekat", 8.4, W.merah)),
      tambah("lebar", ...sudutDua("s2", 160, 160, 100, 10, 50, W.biru), teks("s2-m", 210, 184, "Sudut 2", 9, W.biru)),
      tambah("sudutnya.", garisUjung("s2-g", 160, 160, 100, 10, 50), teks("s2-t", 266, 100, "jauh", 8.4, W.merah)),
    ),
    k(
      "Pada gambar buku, banyak murid menjawab sudut dua lebih besar daripada sudut satu. Padahal ukuran kedua sudut itu sama.",
      tambah("satu.", busurSudut("s1", 25, 160, 18, 10, 50, W.hijau, { tebal: 2.2 }), teks("s1-n", 72, 168, "40°", 9, W.hijau)),
      tambah("sama.", busurSudut("s2", 160, 160, 18, 10, 50, W.hijau, { tebal: 2.2 }), teks("s2-n", 212, 168, "40°", 9, W.hijau)),
      tambah("sama.", ...kartu("sm", 90, 30, 120, 30, W.emas, ["kedua sudut sama besar"], 8.6)),
    ),
    k(
      "Anggapan itu hanya benar jika panjang kaki kedua sudut sama. Besar sudut menunjukkan seberapa jauh kaki diputar, bukan seberapa panjang kakinya.",
      bersih(0),
      tambah(0, judul("besar sudut = seberapa jauh diputar")),
      tambah("panjang", ...sudutDua("r1", 25, 160, 80, 10, 50, W.biru), busurSudut("r1", 25, 160, 24, 10, 50, W.hijau, { tebal: 2.2 }), teks("r1-n", 82, 150, "40°", 9, W.hijau)),
      tambah("sama.", ...sudutDua("r2", 165, 160, 80, 10, 80, W.biru), busurSudut("r2", 165, 160, 24, 10, 80, W.hijau, { tebal: 2.2 }), teks("r2-n", 212, 150, "70°", 9, W.hijau)),
      tambah("diputar,", ...kartu("rp", 60, 36, 180, 32, W.krem, ["kaki sama panjang: yang lebih", "terbuka sudutnya lebih besar"], 8.2)),
    ),
    k(
      "Agar tepat, ukur kedua sudut dengan busur derajat. Hasilnya sama, jadi sudut satu dan sudut dua sama besar, walaupun kaki sudut dua lebih panjang.",
      bersih(0),
      tambah(0, judul("ukur dengan busur derajat")),
      tambah("ukur", ...sudutDua("u1", 25, 150, 46, 10, 50, W.biru), busurSudut("u1", 25, 150, 18, 10, 50, W.hijau, { tebal: 2.2 }), ...sudutDua("u2", 160, 150, 100, 10, 50, W.biru), busurSudut("u2", 160, 150, 18, 10, 50, W.hijau, { tebal: 2.2 })),
      tambah("Hasilnya", ...kartu("h1", 20, 162, 100, 30, W.hijauMuda, ["Sudut 1: 40°"], 9), ...kartu("h2", 150, 162, 100, 30, W.hijauMuda, ["Sudut 2: 40°"], 9)),
      tambah("panjang.", teks("u-sm", 135, 182, "=", 16, W.merah)),
    ),
  ],
};
