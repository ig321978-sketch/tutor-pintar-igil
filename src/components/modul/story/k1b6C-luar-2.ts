import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garisBil, judul, kartu, kotak, lompat, orang, pan, penanda, segitiga, teks, xGB } from "./k1b6C-gambar";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b6C-luar-1";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b6C-bantu";

/* Video metode global Sub-Bab C: Fact Family (Keluarga Kalimat), Subtract Through Ten (Kurangi Lewat Sepuluh), dan ringkasan. */

/* ------------------------------ 4. Fact Family: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Fact Family, atau Keluarga Kalimat. Tiga bilangan yang sama bisa membuat empat kalimat.";
const SUARA_C2 = "Sembilan, tujuh, dan enam belas. Sembilan ditambah tujuh sama dengan enam belas, dan tujuh ditambah sembilan sama dengan enam belas.";
const SUARA_C3 = "Enam belas dikurangi tujuh sama dengan sembilan, dan enam belas dikurangi sembilan sama dengan tujuh.";
const SUARA_C4 = "Satu kalimat yang diketahui membuka kalimat lainnya.";

export const ADEGAN_LUAR_KELUARGA: AdeganStory = {
  id: "luar-keluarga",
  judul: "Fact Family: keluarga kalimat",
  sumber: "Metode global: Fact Family",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(idx(SUARA_C1, "kedua"), ...kepala(1)),
      tambah(idx(SUARA_C1, "Tiga"), teks("t3", 46, 90, "3 bilangan", 10, W.ungu)),
      tambah(idx(SUARA_C1, "bilangan"), ...segitiga("sg", 150, 72, "16", "9", "7")),
      tambah(idx(SUARA_C1, "empat"), teks("e4", 254, 90, "4 kalimat", 10, W.merah)),
    ),
    k(
      SUARA_C2,
      sorotkan(idx(SUARA_C2, "Sembilan", 1), "sg-a"),
      sorotkan(idx(SUARA_C2, "tujuh", 1), "sg-b"),
      sorotkan(idx(SUARA_C2, "enam", 1), "sg-u"),
      tambah(idx(SUARA_C2, "ditambah", 1), ...kartu("f1", 14, 142, 132, 20, W.hijauMuda, ["9 + 7 = 16"], 11)),
      tambah(idx(SUARA_C2, "ditambah", 2), ...kartu("f2", 154, 142, 132, 20, W.hijauMuda, ["7 + 9 = 16"], 11)),
    ),
    k(
      SUARA_C3,
      tambah(idx(SUARA_C3, "dikurangi", 1), ...kartu("f3", 14, 166, 132, 20, W.krem, ["16 – 7 = 9"], 11)),
      tambah(idx(SUARA_C3, "dikurangi", 2), ...kartu("f4", 154, 166, 132, 20, W.krem, ["16 – 9 = 7"], 11)),
    ),
    k(
      SUARA_C4,
      tambah(idx(SUARA_C4, "Satu"), teks("s1", 150, 104, "1 kalimat", 9, W.ungu)),
      sorotkan(idx(SUARA_C4, "membuka"), "f1-k", "f2-k", "f3-k", "f4-k"),
      tambah(idx(SUARA_C4, "membuka"), emo("bk", 150, 134, E.buka, 18)),
    ),
  ],
};

/* ------------------------------ 5. Fact Family: terapan ------------------------------ */
const SUARA_D1 = "Kaka punya tiga bilangan: dua belas, lima, dan tujuh.";
const SUARA_D2 = "Lima ditambah tujuh sama dengan dua belas. Maka dua belas dikurangi lima sama dengan tujuh.";
const SUARA_D3 = "Keluarga Kalimat bagus untuk memeriksa hasil. Tetapi tidak langsung memberi jawaban kalau kamu belum hafal salah satu kalimatnya.";

export const ADEGAN_LUAR_KELUARGA_TERAPAN: AdeganStory = {
  id: "luar-keluarga-terapan",
  judul: "Fact Family: kapan cocok",
  sumber: "Metode global: Fact Family",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_D1, "Kaka"), ...orang("kk", 40, 92, E.kaka, "Kaka")),
      tambah(idx(SUARA_D1, "tiga"), teks("t3", 262, 92, "3 bilangan", 10, W.ungu)),
      tambah(idx(SUARA_D1, "bilangan"), ...segitiga("sg", 150, 72, "12", "5", "7")),
    ),
    k(
      SUARA_D2,
      tambah(idx(SUARA_D2, "ditambah"), ...kartu("g1", 14, 142, 132, 20, W.hijauMuda, ["5 + 7 = 12"], 11)),
      tambah(idx(SUARA_D2, "dikurangi"), ...kartu("g2", 154, 142, 132, 20, W.krem, ["12 – 5 = 7"], 11)),
    ),
    k(
      SUARA_D3,
      tambah(idx(SUARA_D3, "memeriksa"), emo("ck", 40, 178, E.benar, 22), ...kartu("pm", 14, 166, 132, 20, W.hijauMuda, ["bagus untuk memeriksa"], 9)),
      tambah(idx(SUARA_D3, "Tetapi"), emo("tt", 150, 190, E.tanya, 18)),
      tambah(idx(SUARA_D3, "hafal"), ...kartu("hf", 154, 166, 132, 20, W.merahMuda, ["hafal 1 kalimat dulu"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Subtract Through Ten: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Subtract Through Ten, atau Kurangi Lewat Sepuluh. Kurangi dulu sampai sepuluh, lalu sisanya.";
const SUARA_E2 = "Tiga belas dikurangi lima. Kurangi tiga dulu, jadi sepuluh.";
const SUARA_E3 = "Lalu kurangi dua lagi dari sepuluh. Sepuluh dikurangi dua sama dengan delapan.";
const SUARA_E4 = "Jadi tiga belas dikurangi lima sama dengan delapan.";

export const ADEGAN_LUAR_LEWAT: AdeganStory = {
  id: "luar-lewat",
  judul: "Subtract Through Ten: kurangi lewat sepuluh",
  sumber: "Metode global: Subtract Through Ten",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah(idx(SUARA_E1, "ketiga"), ...kepala(2)),
      tambah(
        idx(SUARA_E1, "Sepuluh"),
        ...Array.from({ length: 10 }, (_, i) => kotak(`tf${i}`, 100 + (i % 5) * 20, 64 + Math.floor(i / 5) * 20, 20, 20, W.langit, W.biru, { rx: 2, tebal: 1.2 })),
        teks("t10", 150, 122, "10", 16, W.merah),
      ),
      tambah(idx(SUARA_E1, "dulu"), emo("pt", 60, 90, E.tunjuk, 22)),
      tambah(idx(SUARA_E1, "sisanya"), ...kartu("ss", 50, 150, 200, 22, W.krem, ["lalu kurangi sisanya"], 10)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, ...kepala(2), ...garisBil("gb", 118, 5, 20)),
      tambah(idx(SUARA_E2, "belas"), ...penanda("mk", 13, 118)),
      tambah(idx(SUARA_E2, "dikurangi"), ...kartu("kl", 110, 52, 130, 22, W.krem, ["13 – 5 = ?"], 11)),
      tambah(idx(SUARA_E2, "Kurangi"), lompat("h1", 13, 10, 96), teks("h1n", (xGB(10) + xGB(13)) / 2, 88, "kurangi 3", 9, W.merah)),
      tambah(idx(SUARA_E2, "sepuluh"), ...penanda("md", 10, 118, W.emas)),
    ),
    k(
      SUARA_E3,
      tambah(idx(SUARA_E3, "dua", 1), lompat("h2", 10, 8, 96), teks("h2n", xGB(9), 150, "kurangi 2", 9, W.merah)),
      ubah(idx(SUARA_E3, "dikurangi"), { id: "kl-t0", isi: "10 – 2 = ?" }),
      ubah(idx(SUARA_E3, "delapan"), { id: "kl-t0", isi: "10 – 2 = 8" }),
      tambah(idx(SUARA_E3, "delapan"), ...penanda("m8", 8, 118, W.hijau)),
    ),
    k(
      SUARA_E4,
      sorotkan(idx(SUARA_E4, "tiga"), "mk"),
      ubah(idx(SUARA_E4, "delapan"), { id: "kl-t0", isi: "13 – 5 = 8" }),
      tambah(idx(SUARA_E4, "delapan"), emo("ok", 60, 170, E.benar, 24), ...kartu("jd", 90, 160, 120, 22, W.hijauMuda, ["jadi sisa 8"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Subtract Through Ten: terapan ------------------------------ */
const SUARA_F1 = "Igil mengurang lima belas dikurangi tujuh. Lima belas dikurangi lima sama dengan sepuluh.";
const SUARA_F2 = "Sepuluh dikurangi dua sama dengan delapan. Jadi sisa delapan.";
const SUARA_F3 = "Cocok kalau satuannya lebih kecil dari yang diambil.";
const SUARA_F4 = "Kurang cocok untuk pengurangan kecil seperti sembilan belas dikurangi dua, karena langkahnya jadi panjang.";

export const ADEGAN_LUAR_LEWAT_TERAPAN: AdeganStory = {
  id: "luar-lewat-terapan",
  judul: "Subtract Through Ten: kapan cocok",
  sumber: "Metode global: Subtract Through Ten",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2), ...garisBil("gb", 118, 5, 20)),
      tambah(idx(SUARA_F1, "Igil"), ...orang("ig", 40, 76, E.igil, "Igil")),
      tambah(idx(SUARA_F1, "belas", 1), ...penanda("mk", 15, 118)),
      tambah(idx(SUARA_F1, "dikurangi", 1), ...kartu("kl", 110, 52, 130, 22, W.krem, ["15 – 7 = ?"], 11)),
      tambah(idx(SUARA_F1, "Lima", 2), lompat("h1", 15, 10, 96), teks("h1n", (xGB(10) + xGB(15)) / 2, 88, "kurangi 5", 9, W.merah)),
      tambah(idx(SUARA_F1, "sepuluh"), ...penanda("md", 10, 118, W.emas)),
    ),
    k(
      SUARA_F2,
      tambah(idx(SUARA_F2, "dua"), lompat("h2", 10, 8, 96), teks("h2n", xGB(9), 150, "kurangi 2", 9, W.merah)),
      ubah(idx(SUARA_F2, "delapan", 1), { id: "kl-t0", isi: "15 – 7 = 8" }),
      tambah(idx(SUARA_F2, "delapan", 1), ...penanda("m8", 8, 118, W.hijau)),
      tambah(idx(SUARA_F2, "sisa"), teks("sc", 240, 150, "sisa 8", 11, W.hijau)),
    ),
    k(
      SUARA_F3,
      tambah(idx(SUARA_F3, "Cocok"), emo("ok", 60, 100, E.benar, 22)),
      tambah(idx(SUARA_F3, "satuannya"), ...kartu("cs", 20, 168, 260, 22, W.hijauMuda, ["satuan 5, yang diambil 7"], 10)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_F4, "Kurang"), emo("x", 40, 86, E.salah, 24)),
      tambah(idx(SUARA_F4, "sembilan"), ...kartu("sk", 100, 56, 140, 22, W.krem, ["19 – 2 = ?"], 12)),
      tambah(idx(SUARA_F4, "langkahnya"), ...[0, 1, 2, 3].map((i) => pan(`c${i}`, 40 + i * 60, 130, 50, 0, W.merah, 2.4))),
      tambah(idx(SUARA_F4, "panjang"), teks("pj", 150, 164, "langkahnya jadi panjang", 10, W.merah), bulat("bd", 275, 130, 4, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Kita sudah melihat tiga metode mengurang. Mana yang paling pas? Tergantung bilangannya.";
const SUARA_G2 = "Pikir Penjumlahan cocok kalau yang diambil besar. Keluarga Kalimat cocok untuk memeriksa.";
const SUARA_G3 = "Kurangi Lewat Sepuluh cocok kalau satuannya tidak cukup. Ketiganya mencari sisa dengan cara berbeda.";
const SUARA_G4 = "Menurutmu, untuk empat belas dikurangi sembilan, kamu pakai cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode mengurang",
  sumber: "Ringkasan: tiga metode global",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Mana yang paling pas?")),
      tambah(idx(SUARA_G1, "tiga"), teks("t3", 150, 56, "3 metode mengurang", 10, W.ungu)),
      tambah(idx(SUARA_G1, "metode"), ...NAMA_METODE.flatMap((m, i) => kartu(`r${i}`, 20, 70 + i * 34, 260, 28, WARNA_METODE[i], [m], 11))),
      tambah(idx(SUARA_G1, "Tergantung"), emo("tq", 270, 40, E.tanya, 20)),
    ),
    k(
      SUARA_G2,
      tambah(idx(SUARA_G2, "Pikir"), teks("g0", 250, 88, "diambil besar", 8.4, W.hijau)),
      tambah(idx(SUARA_G2, "Keluarga"), teks("g1", 250, 122, "untuk memeriksa", 8.4, W.hijau)),
    ),
    k(
      SUARA_G3,
      tambah(idx(SUARA_G3, "Kurangi"), teks("g2", 250, 156, "satuan kurang", 8.4, W.hijau), teks("s10", 36, 158, "10", 12, W.merah)),
      tambah(idx(SUARA_G3, "Ketiganya"), emo("bt", 150, 188, E.bintang, 18)),
    ),
    k(
      SUARA_G4,
      hapus(0, "t3", "g0", "g1", "g2", "s10", "bt", "tq"),
      tambah(idx(SUARA_G4, "untuk"), ...kartu("ph", 70, 26, 160, 26, W.krem, ["14 – 9 = ?"], 13)),
      tambah(idx(SUARA_G4, "mana"), teks("lm", 150, 188, "cara yang mana?", 11, W.merah)),
    ),
  ],
};
