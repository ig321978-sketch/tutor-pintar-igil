import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, judul, kalimatC, kartu, orang, segitiga, teks } from "./k1b3c-gambar";
import { bersih, k, sorotkan, tambah, ubah, urutKata } from "./k1b3c-bantu";
import { WARNA_METODE, kepala } from "./k1b3c-luar-1";

/* Video metode global Sub-Bab C: Fact Triangle (Segitiga Fakta), Think Addition (Berpikir Penjumlahan), dan ringkasan. */

/* ------------------------------ 4. Fact Triangle: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Fact Triangle, atau Segitiga Fakta. Bilangan semuanya ditulis di pucuk atas.";
const SUARA_C2 = "Dua bagian ditulis di dua pojok bawah.";
const SUARA_C3 = "Tutup satu pojok, lalu cari bilangan yang tertutup.";
const SUARA_C4 = "Kalau pucuk atas tertutup, kita menjumlah. Kalau pojok bawah tertutup, kita mengurangi.";
const ST = { x: 150, y: 58, w: 70, h: 96 };

export const ADEGAN_LUAR_SEGITIGA: AdeganStory = {
  id: "luar-segitiga",
  judul: "Fact Triangle: segitiga fakta",
  sumber: "Metode global: Fact Triangle",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua,", ...kepala(1)), tambah("Segitiga", ...segitiga("sg", ST.x, ST.y, ST.w, ST.h, "8", "5", "3")), sorotkan("atas.", "sg-t")),
    k(SUARA_C2, sorotkan("pojok", "sg-a", "sg-b"), tambah("bawah.", teks("tb", 150, 172, "pojok bawah: bagian", 10, W.biru))),
    k(SUARA_C3, ubah("Tutup", { id: "sg-b", isi: "?", warna: W.merah }), tambah("tertutup.", teks("tq", 250, 120, "8 dan 5", 10, W.ungu))),
    k(SUARA_C4, ubah(0, { id: "tb", isi: `atas: tambah, bawah: kurang` }), tambah("mengurangi.", ...kalimatC("kl", 150, 194, ["8", KURANG, "5", "=", "3"], 14, 20))),
  ],
};

/* ------------------------------ 5. Fact Triangle: terapan ------------------------------ */
const SUARA_D1 = "Kondektur membuat segitiga untuk sepuluh karcis: sepuluh di atas, satu dan sembilan di bawah.";
const SUARA_D2 = "Abang menutup sembilan. Sepuluh dikurangi satu sama dengan sembilan.";
const SUARA_D3 = "Lalu Abang menutup sepuluh. Satu ditambah sembilan sama dengan sepuluh.";
const SUARA_D4 = "Satu segitiga bisa dipakai untuk menjumlah dan mengurangi.";

export const ADEGAN_LUAR_SEGITIGA_TERAPAN: AdeganStory = {
  id: "luar-segitiga-terapan",
  judul: "Fact Triangle: sepuluh karcis",
  sumber: "Metode global: Fact Triangle, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_D1, tambah(0, ...kepala(1)), tambah("Kondektur", ...orang("kd", 40, 110, E.kondektur, "kondektur")), tambah("segitiga", ...segitiga("sg", ST.x, ST.y, ST.w, ST.h, "10", "1", "9")), tambah("karcis:", emo("kc", 262, 100, E.karcis, 26))),
    k(SUARA_D2, ubah("menutup", { id: "sg-b", isi: "?", warna: W.merah }), tambah("dikurangi", ...kalimatC("k1", 150, 176, ["10", KURANG, "1", "=", "9"], 16, 26))),
    k(SUARA_D3, ubah(0, { id: "sg-b", isi: "9", warna: W.biru }), ubah("menutup", { id: "sg-t", isi: "?", warna: W.merah }), tambah("ditambah", ...kalimatC("k2", 150, 196, ["1", "+", "9", "=", "10"], 16, 26))),
    k(SUARA_D4, ubah(0, { id: "sg-t", isi: "10", warna: W.biru }), tambah("menjumlah", teks("tj", 262, 150, "+", 22, W.merah)), tambah("mengurangi.", teks("tk", 262, 176, KURANG, 22, W.merah))),
  ],
};

/* ------------------------------ 6. Think Addition: konsep ------------------------------ */
const SUARA_F1 = "Metode ketiga, Think Addition, atau Berpikir Penjumlahan. Untuk mengurangi, pikirkan penjumlahannya.";
const SUARA_F2 = "Delapan dikurangi lima sama dengan berapa? Ubah menjadi lima ditambah berapa sama dengan delapan.";
const SUARA_F3 = "Hitung maju dari lima: enam, tujuh, delapan. Tiga langkah.";
const SUARA_F4 = "Jadi delapan dikurangi lima sama dengan tiga.";
const posF3 = urutKata(SUARA_F3, ["enam,", "tujuh,", "delapan."], "lima:");

export const ADEGAN_LUAR_PIKIR: AdeganStory = {
  id: "luar-pikir",
  judul: "Think Addition: berpikir penjumlahan",
  sumber: "Metode global: Think Addition",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_F1, tambah("ketiga,", ...kepala(2)), tambah("pikirkan", emo("ot", 150, 90, "\u{1F9E0}", 34))),
    k(SUARA_F2, ubah(0, { id: "ot", x: 262, y: 70, u: 24 }), tambah("berapa?", ...kalimatC("k1", 130, 70, ["8", KURANG, "5", "=", "?"], 18, 26)), tambah("Ubah", ...kalimatC("k2", 130, 110, ["5", "+", "?", "=", "8"], 18, 26))),
    k(SUARA_F3, tambah("lima:", teks("h5", 60, 160, "5", 16, W.biru)), ...[6, 7, 8].map((n, i) => tambah(posF3[i], teks(`h${n}`, 60 + (i + 1) * 50, 160, String(n), 16, W.merah))), tambah("langkah.", teks("lg", 150, 190, "3 langkah", 11, W.ungu))),
    k(SUARA_F4, ubah("tiga.", { id: "k14", isi: "3", warna: W.hijau }, { id: "k22", isi: "3", warna: W.hijau })),
  ],
};

/* ------------------------------ 7. Think Addition: terapan ------------------------------ */
const SUARA_G1 = "Ada sembilan kursi di baris Kaka. Tujuh kursi sudah terisi. Berapa yang kosong?";
const SUARA_G2 = "Kaka berpikir: tujuh ditambah berapa sama dengan sembilan?";
const SUARA_G3 = "Hitung maju dari tujuh: delapan, sembilan. Dua langkah.";
const SUARA_G4 = "Jadi sembilan dikurangi tujuh sama dengan dua. Ada dua kursi kosong.";
const KURSI = deret(9, 30, 30, 70);
const posG3 = urutKata(SUARA_G3, ["delapan,", "sembilan."], "tujuh:");

export const ADEGAN_LUAR_PIKIR_TERAPAN: AdeganStory = {
  id: "luar-pikir-terapan",
  judul: "Think Addition: kursi di baris Kaka",
  sumber: "Metode global: Think Addition, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2)), tambah("sembilan", ...deretEmo(E.kursi, "ks", KURSI, 20)), tambah("Tujuh", ...KURSI.slice(0, 7).map((p, i) => emo(`pn${i}`, p.x, p.y, E.penumpang, 20)))),
    k(SUARA_G2, tambah("Kaka", ...orang("kk", 40, 170, E.kaka, "Kaka")), tambah("berapa", ...kalimatC("k1", 170, 122, ["7", "+", "?", "=", "9"], 18, 26))),
    k(SUARA_G3, ...[7, 8].map((i, n) => tambah(posG3[n], teks(`h${i}`, KURSI[i].x, 96, String(i + 1), 13, W.merah))), sorotkan("langkah.", "ks7", "ks8")),
    k(SUARA_G4, ubah("dua.", { id: "k12", isi: "2", warna: W.hijau }), tambah("dikurangi", ...kalimatC("k2", 170, 168, ["9", KURANG, "7", "=", "2"], 18, 26))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk hubungan penjumlahan dan pengurangan.";
const SUARA_Z2 = "Fact Family: tiga bilangan membuat empat kalimat. Cocok untuk menulis semua kalimat sekaligus.";
const SUARA_Z3 = "Fact Triangle: tutup satu pojok, lalu cari bilangan yang tertutup. Cocok untuk berlatih cepat setiap hari.";
const SUARA_Z4 = "Think Addition: untuk mengurangi, pikirkan penjumlahannya, lalu hitung maju. Cocok kalau penjumlahannya sudah hafal.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("pengurangan.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Family:", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Fact Family", "cocok untuk menulis semua kalimat"], 9.4))),
    k(SUARA_Z3, tambah("Triangle:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Fact Triangle", "cocok untuk mengingat cepat"], 9.4))),
    k(SUARA_Z4, tambah("Addition:", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Think Addition", "cocok bila penjumlahan sudah hafal"], 9.4))),
  ],
};
