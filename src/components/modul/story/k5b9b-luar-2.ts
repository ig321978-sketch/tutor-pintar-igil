import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, garis, garisBilangan, kartu, kartuAngka, kartuMetode, kotak, panah, teks } from "./k5b9b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b9b-bantu";

/* ------------------------------ LB5. Ordering Protocol: konsep ------------------------------ */
const LANGKAH = [
  { id: "s1", y: 44, warna: W.hijauMuda, baris: ["1  kelompokkan menurut ratus ribuan"] },
  { id: "s2", y: 80, warna: W.krem, baris: ["2  bandingkan kolom berikutnya"] },
  { id: "s3", y: 116, warna: W.muda, baris: ["3  tulis hasil, kecil ke besar"] },
  { id: "s4", y: 152, warna: W.merahMuda, baris: ["4  periksa urutan tadi"] },
];

export const ADEGAN_LUAR_URUT: AdeganStory = {
  id: "luarb-urut",
  judul: "Ordering Protocol: empat langkah mengurutkan",
  sumber: "Metode luar; aturan mengurutkan banyak bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ordering Protocol adalah aturan langkah demi langkah untuk mengurutkan banyak bilangan. Kita memakai perbandingan kolom kiri berulang kali.",
      tambah(0, teks("jud", 150, 24, "Ordering Protocol", 13, W.ungu)),
      tambah("aturan", emo("em", 150, 96, "📋", 44), teks("emt", 150, 124, "aturan langkah demi langkah", 10, W.merah)),
      tambah("perbandingan", teks("ulg", 150, 160, "bandingkan kolom kiri berulang kali", 10, W.ungu)),
    ),
    k(
      "Langkah satu: kelompokkan bilangan menurut angka ratus ribuannya. Kelompok dengan angka lebih besar berada di urutan lebih besar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Ordering Protocol", 13, W.ungu)),
      tambah("Langkah", kartu(LANGKAH[0].id, 20, LANGKAH[0].y, 260, 28, LANGKAH[0].warna, LANGKAH[0].baris, 9.6)),
    ),
    k(
      "Langkah dua: dalam satu kelompok, bandingkan kolom berikutnya, lalu seterusnya. Langkah tiga: tulis hasilnya dari terkecil sampai terbesar, atau sebaliknya.",
      tambah("dua:", kartu(LANGKAH[1].id, 20, LANGKAH[1].y, 260, 28, LANGKAH[1].warna, LANGKAH[1].baris, 9.6)),
      tambah("tiga:", kartu(LANGKAH[2].id, 20, LANGKAH[2].y, 260, 28, LANGKAH[2].warna, LANGKAH[2].baris, 9.6)),
    ),
    k(
      "Langkah empat: periksa. Bilangan di kiri harus lebih kecil dari bilangan di kanannya, dan tidak boleh ada bilangan yang terlewat.",
      tambah("empat:", kartu(LANGKAH[3].id, 20, LANGKAH[3].y, 260, 28, LANGKAH[3].warna, LANGKAH[3].baris, 9.6)),
      sorotkan("periksa.", "s4-k"),
    ),
  ],
};

/* ------------------------------ LB6. Ordering Protocol: penerapan ------------------------------ */
const WISATA = ["355.313", "397.951", "416.373", "433.027", "69.968"];
const xk = (i: number) => 8 + i * 58;
const urutSelesai = ["69.968", "355.313", "397.951", "416.373", "433.027"];

export const ADEGAN_LUAR_URUT_TERAPAN: AdeganStory = {
  id: "luarb-urut-terapan",
  judul: "Ordering Protocol: lima bilangan wisatawan Yogyakarta",
  sumber: "Metode luar; contoh data wisatawan Eksplorasi 9.2B",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Terapan: lima bilangan wisatawan, yaitu 355.313, 397.951, 416.373, 433.027, dan 69.968.",
      tambah(0, teks("jud", 150, 24, "Terapan: lima bilangan", 12, W.ungu)),
      ...WISATA.map((w, i) => tambah(w, kartuAngka(`w${i}`, xk(i), 50, 52, w, W.putih, 9))),
    ),
    k(
      "Langkah satu: kelompokkan menurut ratus ribuan. Kosong untuk 69.968, 3 untuk 355.313 dan 397.951, serta 4 untuk 416.373 dan 433.027.",
      tambah(0, teks("l1", 150, 40, "langkah 1", 9, W.merah)),
      tambah("Kosong", kotak("g3", 238, 46, 58, 32, "none", W.merah, { putus: true, rx: 6 }), teks("g3t", 267, 98, "kosong", 8, W.merah)),
      tambah("3", kotak("g1", 4, 46, 114, 32, "none", W.hijau, { putus: true, rx: 6 }), teks("g1t", 61, 98, "kelompok 3", 8.4, W.hijau)),
      tambah("4", kotak("g2", 122, 46, 114, 32, "none", W.ungu, { putus: true, rx: 6 }), teks("g2t", 179, 98, "kelompok 4", 8.4, W.ungu)),
    ),
    k(
      "Langkah dua: dalam kelompok 3, puluh ribuannya 5 dan 9, jadi 355.313 lebih kecil. Dalam kelompok 4, puluh ribuannya 1 dan 3, jadi 416.373 lebih kecil.",
      ubah(0, { id: "l1", isi: "langkah 2" }),
      tambah("5", teks("c1", 150, 130, "kelompok 3: puluh ribuan 5 < 9", 10, W.hijau)),
      tambah("kelompok@2", teks("c2", 150, 150, "kelompok 4: puluh ribuan 1 < 3", 10, W.ungu)),
    ),
    k(
      "Langkah tiga: tulis dari terkecil: 69.968, 355.313, 397.951, 416.373, lalu 433.027.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Langkah 3: tulis hasil", 12, W.ungu)),
      ...urutSelesai.map((w, i) => tambah(w, kartuAngka(`h${i}`, xk(i), 70, 52, w, W.hijauMuda, 9), i < 4 ? teks(`hl${i}`, xk(i) + 55, 86, "<", 11, W.merah) : [])),
    ),
    k(
      "Langkah empat, periksa: tiap bilangan lebih kecil dari bilangan di sebelah kanannya. Urutan ini sudah benar.",
      tambah(0, teks("l4", 150, 130, "langkah 4: periksa", 10, W.merah)),
      sorotkan("kanannya.", ...urutSelesai.map((_, i) => `h${i}-k`)),
      tambah("benar.", emo("ok", 150, 176, "✅", 28)),
    ),
  ],
};

/* ------------------------------ LB7. Number Line Placement: konsep ------------------------------ */
const X0 = 24;
const PANJANG = 252;
const Y_G = 110;
const xv = (v: number) => Math.round((X0 + (v / 1000000) * PANJANG) * 10) / 10;
const TICK = ["0", "200.000", "400.000", "600.000", "800.000", "1.000.000"];
const ticks = () => TICK.flatMap((t, i) => [garis(`tk${i}`, xv(i * 200000), Y_G - 4, 0, 8, W.biru, 1.6), teks(`tl${i}`, xv(i * 200000), Y_G + 17, t, 6.4)]);

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luarb-garis",
  judul: "Number Line Placement: menaruh bilangan pada garis bilangan",
  sumber: "Metode luar; garis bilangan 0 sampai 1.000.000",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Number Line Placement berarti menaruh bilangan pada garis bilangan. Semakin ke kanan, bilangannya semakin besar.",
      tambah(0, teks("jud", 150, 24, "Number Line Placement", 12, W.ungu)),
      tambah("garis", garisBilangan("gb", X0, 286, Y_G)),
      tambah("kanan,", teks("kc", X0 + 8, 88, "kecil", 10, W.hijau), teks("bs", 270, 88, "besar", 10, W.merah)),
    ),
    k(
      "Garis dari 0 sampai 1.000.000 kita bagi menjadi lima bagian sama panjang. Setiap bagian bernilai 200.000.",
      tambah("bagi", ticks()),
      tambah("Setiap", teks("bg", 150, 150, "tiap bagian: 200.000", 11, W.ungu)),
    ),
    k(
      "Untuk menaruh bilangan, lihat dulu kolom paling kiri. Bilangan 432.543 punya 4 di ratus ribuan, jadi letaknya di antara 400.000 dan 600.000.",
      hapus(0, "bg"),
      tambah("432.543", bulat("pt", xv(432543), Y_G, 3.8, W.merah, W.biru), teks("ptl", xv(432543), 96, "432.543", 8.4, W.merah)),
      tambah("ribuan,", teks("cp", 150, 168, "ratus ribuan: 4, antara 400.000 dan 600.000", 9.6, W.ungu)),
      sorotkan("antara", "pt"),
    ),
    k(
      "Aturannya: bilangan yang berada lebih ke kanan selalu lebih besar. Jadi urutan dari kiri ke kanan otomatis menjadi urutan dari kecil ke besar.",
      hapus(0, "cp"),
      tambah("kanan", panah("ar", 70, 190, 160, 0, W.merah, 2.4, { gambar: true })),
      tambah("kecil", teks("ak", 70, 180, "kecil", 9, W.hijau), teks("ab", 230, 180, "besar", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ LB8. Number Line Placement: penerapan ------------------------------ */
export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luarb-garis-terapan",
  judul: "Number Line Placement: tiga harga sepatu",
  sumber: "Metode luar; contoh harga sepatu Eksplorasi 9.2A",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Terapan: tiga harga sepatu pada garis bilangan. Harganya 232.231, 342.231, dan 432.543.",
      tambah(0, teks("jud", 150, 24, "Terapan: harga sepatu", 12, W.ungu)),
      tambah("garis", garisBilangan("gb", X0, 286, Y_G), ticks()),
      tambah("Harganya", teks("dh", 150, 176, "232.231   342.231   432.543", 11, W.ungu)),
    ),
    k(
      "Nisa, 232.231, ada sedikit setelah 200.000. Komang, 342.231, ada di antara 200.000 dan 400.000, lebih dekat ke 400.000.",
      tambah("Nisa,", bulat("pn", xv(232231), Y_G, 3.8, W.biru, W.biru), teks("pnl", xv(232231), 96, "Nisa", 8.4)),
      tambah("Komang,", bulat("pk", xv(342231), Y_G, 3.8, W.emas, W.biru), teks("pkl", xv(342231), 82, "Komang", 8.4)),
    ),
    k(
      "Lukas, 432.543, berada di antara 400.000 dan 600.000. Karena paling kanan, harganya paling besar.",
      tambah("Lukas,", bulat("pl", xv(432543), Y_G, 3.8, W.hijau, W.biru), teks("pll", xv(432543), 96, "Lukas", 8.4)),
      sorotkan("kanan,", "pl"),
    ),
    k(
      "Dari kiri ke kanan, urutannya Nisa, Komang, lalu Lukas. Inilah urutan dari termurah sampai termahal.",
      ubah(0, { id: "dh", isi: "232.231 < 342.231 < 432.543" }),
      tambah("Inilah", teks("du", 150, 196, "dari termurah ke termahal", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ LB9. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan empat metode luar Sub-Bab B",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan. Leftmost Place Priority: lihat kolom paling kiri lebih dulu. Digit-by-Digit Comparison: geser kolom demi kolom sampai berbeda.",
      tambah(0, teks("jud", 150, 20, "Ringkasan metode luar", 12, W.ungu)),
      tambah("Leftmost", kartuMetode("m1", 10, 30, "#FDE68A", ["Leftmost", "Place Priority"], "kolom kiri dulu")),
      tambah("Digit-by-Digit", kartuMetode("m2", 156, 30, "#FBCFE8", ["Digit-by-Digit", "Comparison"], "geser sampai beda")),
    ),
    k(
      "Ordering Protocol: kelompokkan, bandingkan, lalu tulis urutannya. Number Line Placement: bilangan di sebelah kanan selalu lebih besar.",
      tambah("Ordering", kartuMetode("m3", 10, 112, "#BBF7D0", ["Ordering", "Protocol"], "urut banyak bilangan")),
      tambah("Number", kartuMetode("m4", 156, 112, "#BFDBFE", ["Number Line", "Placement"], "taruh di garis")),
    ),
    k(
      "Cara memilih: bila kolom paling kiri berbeda, cukup memakai metode pertama. Bila sama, geser dengan metode kedua.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Cara memilih metode", 12, W.ungu)),
      tambah("berbeda,", kartu("p1", 20, 50, 260, 44, W.hijauMuda, ["kolom kiri berbeda", "pakai Leftmost Place Priority"], 10)),
      tambah("sama,", kartu("p2", 20, 108, 260, 44, W.krem, ["kolom kiri sama", "geser dengan Digit-by-Digit Comparison"], 10)),
    ),
    k(
      "Untuk banyak bilangan, pakai metode ketiga, dan garis bilangan membantu kita membayangkan urutannya. Selamat berlatih!",
      tambah("banyak", kartu("p3", 20, 160, 124, 40, W.muda, ["banyak bilangan", "Ordering Protocol"], 8.6)),
      tambah("garis", kartu("p4", 156, 160, 124, 40, W.merahMuda, ["bayangkan urutan", "Number Line Placement"], 8.2)),
    ),
  ],
};
