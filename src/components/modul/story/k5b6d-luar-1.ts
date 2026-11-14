import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, bulat, busurDerajat, busurSudut, emo, kartu, kartuMetode, sinar, teks, titikSudut, ujung } from "./k5b6d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b6d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);
const ids = (a: Obj[]): string[] => a.map((o) => o.id);

/* ------------------------------ LB0. Empat metode luar Sub-Bab D ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luard-pembuka",
  judul: "Empat metode luar untuk melukis sudut",
  sumber: "Metode luar; empat cara melukis sudut",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk melukis sudut. Metode ini membantu kita melukis dengan urutan rapi, memakai busur dengan tepat, menyusun sudut dari patokan, dan memeriksa hasil.",
      tambah(0, jud("Melukis sudut: metode luar", 26, 12)),
      tambah("urutan", emo("e1", 50, 100, "📋", 34), teks("t1", 50, 124, "urutan rapi", 8.6, W.merah)),
      tambah("busur", emo("e2", 120, 100, "📐", 34), teks("t2", 120, 124, "pakai busur", 8.6)),
      tambah("menyusun", emo("e3", 190, 100, "🧩", 34), teks("t3", 190, 124, "susun patokan", 8.6, W.hijau)),
      tambah("memeriksa", emo("e4", 255, 100, "🔍", 34), teks("t4", 255, 124, "periksa hasil", 8.6, W.ungu)),
    ),
    k(
      "Ada empat metode luar. Pertama, Constructing Angles Protocol, yaitu protokol langkah baku melukis sudut. Kedua, Protractor Construction, yaitu melukis dengan membaca busur derajat secara benar.",
      bersih(0),
      tambah(0, jud("Empat metode luar", 20)),
      tambah("Pertama,", kartuMetode("m1", 10, 34, "#FDE68A", ["Constructing Angles", "Protocol"], "langkah baku")),
      tambah("Kedua,", kartuMetode("m2", 156, 34, "#FBCFE8", ["Protractor", "Construction"], "baca busur benar")),
    ),
    k(
      "Ketiga, Angle Addition Construction, yaitu menyusun sudut dari penjumlahan sudut patokan. Keempat, Estimate-Then-Verify, yaitu memperkirakan dulu, lalu memeriksa dengan busur.",
      tambah("Ketiga,", kartuMetode("m3", 10, 116, "#BBF7D0", ["Angle Addition", "Construction"], "susun dari patokan")),
      tambah("Keempat,", kartuMetode("m4", 156, 116, "#BFDBFE", ["Estimate-Then-", "Verify"], "perkirakan lalu periksa")),
    ),
  ],
};

/* ------------------------------ LB1. Constructing Angles Protocol: konsep ------------------------------ */
const LANGKAH = ["titik sudut dan satu kaki", "pasang busur di titik sudut", "tandai angka dari nol di kaki", "hubungkan dengan garis lurus", "periksa dengan busur"];

export const ADEGAN_LUAR_PROTOKOL: AdeganStory = {
  id: "luard-protokol",
  judul: "Constructing Angles Protocol: langkah baku",
  sumber: "Metode luar; protokol melukis sudut dan daftar periksa",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Constructing Angles Protocol artinya protokol, yaitu urutan langkah baku yang selalu sama setiap kali kita melukis sudut. Dengan urutan tetap, kesalahan mudah dihindari.",
      tambah(0, jud("Constructing Angles Protocol", 22, 11)),
      tambah("protokol,", emo("p1", 150, 90, "📋", 44)),
      tambah("tetap,", teks("p2", 150, 140, "urutan tetap = sedikit salah", 9.6, W.merah)),
    ),
    k(
      "Protokolnya lima langkah: titik sudut dan satu kaki, pasang busur, tandai angka, hubungkan, dan periksa. Kelima langkah ini sama dengan langkah di buku.",
      bersih(0),
      tambah(0, jud("Lima langkah baku", 20, 11)),
      tambah("titik", baris("pl0", 30, 34, 240, `1. ${LANGKAH[0]}`, W.krem, 8.4, 22)),
      tambah("pasang", baris("pl1", 30, 62, 240, `2. ${LANGKAH[1]}`, W.krem, 8.4, 22)),
      tambah("tandai", baris("pl2", 30, 90, 240, `3. ${LANGKAH[2]}`, W.krem, 8.4, 22)),
      tambah("hubungkan,", baris("pl3", 30, 118, 240, `4. ${LANGKAH[3]}`, W.krem, 8.4, 22)),
      tambah("periksa.", baris("pl4", 30, 146, 240, `5. ${LANGKAH[4]}`, W.krem, 8.4, 22)),
    ),
    k(
      "Tiap langkah punya satu pertanyaan pemeriksa: apakah pusat busur tepat di titik sudut, apakah dasar berimpit dengan kaki, dan apakah angka dibaca dari nol di kaki?",
      tambah("pusat", baris("pq1", 30, 182, 240, "? pusat busur tepat di titik sudut", W.putih, 8, 16)),
      ubah("pusat", { id: "pl1-k", warna: W.hijauMuda }),
      ubah("dasar", { id: "pq1-k", warna: W.hijauMuda }),
      ubah("nol", { id: "pl2-k", warna: W.hijauMuda }),
    ),
    k(
      "Jika satu pertanyaan dijawab tidak, ulangi langkah itu sebelum lanjut. Itulah inti protokol: tidak melompati langkah.",
      bersih(0),
      tambah(0, jud("Inti protokol", 22, 11)),
      tambah("ulangi", teks("pu", 150, 90, "jawab tidak → ulangi langkah", 10, W.merah)),
      tambah("melompati", teks("pu2", 150, 130, "jangan melompati langkah", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB1t. Protokol dipakai pada sudut 52 derajat ------------------------------ */
const V1 = { x: 90, y: 150, r: 78 };
const busur1 = (): Obj[] => busurDerajat("bd", V1.x, V1.y, V1.r, "kanan", false, { z: 1 });
const T52 = ujung(V1.x, V1.y, 52, V1.r - 2);

export const ADEGAN_LUAR_PROTOKOL_TERAPAN: AdeganStory = {
  id: "luard-protokol-terapan",
  judul: "Constructing Angles Protocol: melukis sudut 52 derajat",
  sumber: "Metode luar; penerapan pada Ayo Berlatih 1d",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Terapkan protokol pada gambar d, sudut 52 derajat. Langkah satu: titik sudut dan kaki sudut sudah ada. Putar bukumu sampai kaki mendatar agar busur mudah dipasang.",
      tambah(0, jud("Protokol: sudut 52°", 20, 11)),
      tambah("titik", titikSudut("v", V1.x, V1.y, W.biru, 3.2, { z: 5 })),
      tambah("kaki", sinar("r1", V1.x, V1.y, 0, V1.r, W.biru, 2.4, { z: 5, gambar: true })),
      tambah("Putar", kartu("pt", 190, 60, 100, 40, W.krem, ["putar buku", "sampai kaki mendatar"], 7.6)),
    ),
    k(
      "Langkah dua dan tiga: pusat busur di titik sudut, dasar di kaki, lalu tandai angka 52 pada skala yang dimulai dari nol di kaki.",
      hapus(0, "pt-k", "pt-t0", "pt-t1"),
      tambah("pusat", busur1()),
      tambah("tandai", bulat("td", T52[0], T52[1], 3.4, W.merah, undefined, { z: 7 }), teks("t52", T52[0] + 14, T52[1] - 4, "52", 9, W.merah, { z: 7 })),
    ),
    k(
      "Langkah empat: angkat busur dan hubungkan titik sudut dengan tanda tadi. Langkah lima: periksa, hasilnya 52 derajat, sudut lancip.",
      hapus(0, ids(busur1()), "t52"),
      tambah("hubungkan", sinar("r2", V1.x, V1.y, 52, V1.r, W.biru, 2.4, { z: 5, gambar: true }), busurSudut("ar", V1.x, V1.y, 0, 52, 22, W.merah, 1.8, { z: 6 })),
      tambah("periksa,", teks("rL", 130, 138, "52°", 10, W.merah), kartu("jn", 200, 130, 88, 30, W.hijauMuda, ["sudut lancip"], 8.6)),
    ),
    k(
      "Daftar periksa protokol lengkap: pusat tepat, dasar berimpit, hitung dari nol, garis lurus, dan ukuran dicek ulang. Semuanya tercentang.",
      tambah("pusat", baris("cl0", 196, 38, 98, "✓ pusat tepat", W.hijauMuda, 7.4, 16)),
      tambah("dasar", baris("cl1", 196, 58, 98, "✓ dasar berimpit", W.hijauMuda, 7.4, 16)),
      tambah("nol,", baris("cl2", 196, 78, 98, "✓ hitung dari nol", W.hijauMuda, 7.4, 16)),
      tambah("lurus,", baris("cl3", 196, 98, 98, "✓ garis lurus", W.hijauMuda, 7.4, 16)),
      tambah("dicek", baris("cl4", 196, 170, 98, "✓ ukuran dicek", W.hijauMuda, 7.4, 16)),
    ),
  ],
};

/* ------------------------------ LB2. Protractor Construction: konsep ------------------------------ */
export const ADEGAN_LUAR_BUSUR: AdeganStory = {
  id: "luard-busur",
  judul: "Protractor Construction: membaca busur derajat",
  sumber: "Metode luar; melukis dengan busur derajat",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Protractor Construction artinya melukis dengan busur derajat sebagai alat pemetaan: setiap arah dari kaki sudut diberi satu angka dari nol sampai 180.",
      tambah(0, jud("Protractor Construction", 20, 11)),
      tambah("busur", busurDerajat("bq", 150, 150, 100, "kanan", false, { z: 1 })),
    ),
    k(
      "Busur punya dua deret angka. Kita pilih deret yang nolnya berada di kaki sudut: kaki ke kanan memakai deret yang nol di kanan, kaki ke kiri memakai deret yang nol di kiri.",
      hapus(0, ids(busurDerajat("bq", 150, 150, 100, "kanan", false))),
      tambah("deret", busurDerajat("bq", 150, 150, 100, "kanan", true, { z: 1 })),
      tambah("kanan,", teks("q1", 150, 172, "nol di kanan: deret luar", 8.6, W.biru)),
      tambah("kiri", teks("q2", 150, 188, "nol di kiri: deret dalam", 8.6, W.merah)),
    ),
    k(
      "Dasar busur tidak harus mendatar; yang penting berimpit dengan kaki sudut. Putar busur atau bukumu sampai dasar menempel pada kaki.",
      hapus(0, ids(busurDerajat("bq", 150, 150, 100, "kanan", true)), "q1", "q2"),
      tambah("mendatar;", baris("dk", 50, 60, 200, "dasar busur = kaki sudut", W.hijauMuda, 9.2, 26)),
      tambah("Putar", emo("pb", 100, 130, "📐", 40), emo("pb2", 200, 130, "🔄", 28)),
    ),
    k(
      "Aturan emas: titik sudut di pusat, kaki di dasar, angka dihitung dari nol di kaki. Tiga syarat ini membuat pembacaan benar.",
      bersih(0),
      tambah(0, jud("Tiga syarat pembacaan benar", 20, 11)),
      tambah("titik", baris("ag1", 40, 46, 220, "1. titik sudut di pusat busur", W.krem, 8.8, 24)),
      tambah("kaki", baris("ag2", 40, 80, 220, "2. kaki sudut di dasar busur", W.krem, 8.8, 24)),
      tambah("angka", baris("ag3", 40, 114, 220, "3. angka dihitung dari nol di kaki", W.krem, 8.8, 24)),
    ),
  ],
};

/* ------------------------------ LB2t. Busur dibaca dari kiri: sudut 110 derajat ------------------------------ */
const V2 = { x: 205, y: 150, r: 74 };
const busur2 = (): Obj[] => busurDerajat("bk", V2.x, V2.y, V2.r, "kiri", false, { z: 1 });
const T110 = ujung(V2.x, V2.y, 70, V2.r - 2);

export const ADEGAN_LUAR_BUSUR_TERAPAN: AdeganStory = {
  id: "luard-busur-terapan",
  judul: "Protractor Construction: sudut 110 derajat dengan kaki ke kiri",
  sumber: "Metode luar; penerapan pada Ayo Berlatih 1c",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapkan pada gambar c, sudut 110 derajat. Titik sudut ada di ujung kanan dan kaki sudut mengarah ke kiri.",
      tambah(0, jud("Busur: sudut 110°", 20, 11)),
      tambah("Titik", titikSudut("v", V2.x, V2.y, W.biru, 3.2, { z: 5 })),
      tambah("kaki", sinar("r1", V2.x, V2.y, 180, V2.r, W.biru, 2.4, { z: 5, gambar: true })),
    ),
    k(
      "Pasang busur dengan pusat di titik sudut dan dasar di kaki. Karena kaki ke kiri, nol ada di kiri, jadi kita memakai deret yang dimulai dari kiri.",
      tambah("Pasang", busur2()),
      tambah("nol", teks("n0", 150, 190, "nol di kiri → deret dari kiri", 8.6, W.merah)),
    ),
    k(
      "Tandai angka 110, sedikit melewati angka 90, lalu hubungkan dengan titik sudut.",
      tambah("Tandai", bulat("td", T110[0], T110[1], 3.4, W.merah, undefined, { z: 7 }), teks("t110", T110[0] - 4, T110[1] - 8, "110", 8.6, W.merah, { z: 7 })),
      tambah("hubungkan", sinar("r2", V2.x, V2.y, 70, V2.r, W.biru, 2.4, { z: 5, gambar: true })),
    ),
    k(
      "Hasilnya sudut 110 derajat, sudut tumpul. Seandainya deret yang salah dipakai, hasilnya 70 derajat, sudut lancip.",
      hapus(0, ids(busur2()), "n0", "t110"),
      tambah("Hasilnya", busurSudut("ar", V2.x, V2.y, 70, 180, 22, W.merah, 1.8, { z: 6 }), teks("rL", 188, 118, "110°", 10, W.merah)),
      tambah("salah", sinar("w2", V2.x, V2.y, 110, V2.r, W.abu, 1.8, { z: 4, putus: true }), teks("wL", 170, 100, "70° ✗", 8.6, W.abu)),
    ),
  ],
};
