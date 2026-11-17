import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, isiDi, judul, kalimatK, kartu, kotakSekat, orang, panahObj, sekat, teks } from "./k1b3a-gambar";
import { jalur, tengahPetak } from "./k1b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b3a-bantu";
import { WARNA_METODE, kepala } from "./k1b3a-luar-1";

/* Video metode global Sub-Bab A: Counting Back (Menghitung Mundur), Ten Frame (Bingkai Sepuluh), dan ringkasan. */

/* ------------------------------ 4. Counting Back: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Counting Back, atau Menghitung Mundur. Kita mulai dari bilangan pertama.";
const SUARA_C2 = "Lalu kita mundur satu langkah untuk setiap benda yang pergi.";
const SUARA_C3 = "Bilangan tempat kita berhenti adalah sisanya.";
const SUARA_C4 = "Cara ini cepat kalau yang pergi sedikit, misalnya satu, dua, atau tiga.";
const J = { x0: 20, y: 104, s: 26 };
const tp = (i: number) => tengahPetak(J.x0, J.y, i, J.s);

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Counting Back: menghitung mundur",
  sumber: "Metode global: Counting Back",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua,", ...kepala(1)), tambah("mulai", ...jalur("jl", J.x0, J.y, J.s), ...kartu("sl", 110, 60, 80, 26, W.emas, [`7 ${KURANG} 3`], 13)), sorotkan("pertama.", "jl6")),
    k(
      SUARA_C2,
      ...[6, 5, 4].map((i, n) => tambah(["mundur", "langkah", "pergi."][n], panahObj(`pa${n}`, tp(i).x - 4, J.y + 40, -18, 0, W.merah), teks(`pt${n}`, tp(i - 1).x, J.y + 58, String(i), 11, W.merah))),
    ),
    k(SUARA_C3, sorotkan("berhenti", "jl3"), tambah("sisanya.", teks("ss", tp(3).x, J.y - 8, "sisa", 10, W.hijau))),
    k(SUARA_C4, ubah("cepat", { id: "sl-t0", isi: `7 ${KURANG} 3 = 4` }), tambah("sedikit,", ...kartu("sd", 30, 172, 240, 24, W.langit, ["pergi sedikit: mundur saja"], 10))),
  ],
};

/* ------------------------------ 5. Counting Back: terapan ------------------------------ */
const SUARA_D1 = "Kaka punya enam jeruk. Dua jeruk diberikan kepada kondektur kereta.";
const SUARA_D2 = "Kaka tidak menghitung ulang dari satu. Ia mulai dari enam.";
const SUARA_D3 = "Lalu mundur dua kali: lima, empat. Kaka berhenti di empat.";
const SUARA_D4 = "Jadi sisa jeruk Kaka empat. Enam dikurangi dua sama dengan empat.";
const JERUK = deret(6, 75, 30, 112);
const posD3 = urutKata(SUARA_D3, ["lima,", "empat."], "kali:");

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Counting Back: jeruk Kaka",
  sumber: "Metode global: Counting Back, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah(0, ...kepala(1)), tambah("Kaka", ...orang("kk", 40, 170, E.kaka, "Kaka")), tambah("enam", ...deretEmo(E.jeruk, "jr", JERUK, 22)), tambah("kondektur", ...orang("kd", 260, 170, E.penumpang, "kondektur"))),
    k(SUARA_D2, sorotkan("mulai", "jr5"), tambah("enam.", teks("h6", JERUK[5].x, 86, "6", 13, W.merah))),
    k(
      SUARA_D3,
      ubah(posD3[0], { id: "jr5", op: 0.3, sorot: false }),
      tambah(posD3[0], teks("h5", JERUK[4].x, 86, "5", 13, W.merah)),
      ubah(posD3[1], { id: "jr4", op: 0.3 }),
      tambah(posD3[1], teks("h4", JERUK[3].x, 86, "4", 13, W.merah)),
      sorotkan("berhenti", "h4"),
    ),
    k(SUARA_D4, tambah("sisa", ...kartu("ss", 100, 46, 100, 22, W.emas, ["sisa 4 jeruk"], 10)), tambah("dikurangi", ...kalimatK("kl", 150, 146, ["6", KURANG, "2", "=", "4"], 16, 26))),
  ],
};

/* ------------------------------ 6. Ten Frame: konsep ------------------------------ */
const SUARA_F1 = "Metode ketiga, Ten Frame, atau Bingkai Sepuluh. Bingkai punya dua baris, tiap baris lima kotak.";
const SUARA_F2 = "Isi bingkai dengan semua benda. Lalu kosongkan kotak dari belakang untuk benda yang pergi.";
const SUARA_F3 = "Kotak yang masih terisi adalah sisanya. Baris penuh berarti lima.";
const SUARA_F4 = "Kalau mula-mula sepuluh, kotak kosong menunjukkan berapa yang pergi.";
const F = { x: 85, y: 84, s: 26 };
const SF = Array.from({ length: 10 }, (_, i) => sekat(F.x, F.y, i, F.s));

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame: bingkai sepuluh",
  sumber: "Metode global: Ten Frame",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_F1, tambah("ketiga,", ...kepala(2)), tambah("Bingkai@2", ...kotakSekat("bf", F.x, F.y, F.s)), tambah("lima", teks("l5", 150, 70, "2 baris, tiap baris 5", 9, W.ungu))),
    k(
      SUARA_F2,
      ubah(0, { id: "l5", isi: "isi dulu, lalu kosongkan" }),
      tambah("semua", ...SF.slice(0, 7).map((p, i) => emo(`fb${i}`, p.x, p.y + 6, "\u{1F535}", 16))),
      ubah("kosongkan", { id: "fb6", op: 0.3 }, { id: "fb5", op: 0.3 }),
      hapus("pergi.", "fb5", "fb6"),
      sorotkan("pergi.", "bfc5", "bfc6"),
    ),
    k(SUARA_F3, sorotkan("terisi", "fb0", "fb1", "fb2", "fb3", "fb4"), tambah("lima.", teks("t5", 236, 101, "5", 14, W.merah)), tambah("sisanya.", teks("ss", 150, 160, "sisa 5", 11, W.hijau))),
    k(SUARA_F4, tambah("sepuluh,", ...kartu("cp", 40, 172, 220, 24, W.lavender, ["10: kotak kosong = yang pergi"], 9.6))),
  ],
};

/* ------------------------------ 7. Ten Frame: terapan ------------------------------ */
const SUARA_G1 = "Abang membawa sepuluh pisang. Bingkai penuh, dua baris lima.";
const SUARA_G2 = "Igil dan Kaka makan dua pisang. Dua kotak terakhir dikosongkan.";
const SUARA_G3 = "Baris atas lima, baris bawah tinggal tiga. Lima dan tiga, sisanya delapan.";
const SUARA_G4 = "Ada dua kotak kosong. Sepuluh dikurangi dua sama dengan delapan.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame: pisang Abang",
  sumber: "Metode global: Ten Frame, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2), ...kotakSekat("bf", F.x, F.y, F.s)), tambah("Abang", ...orang("ab", 40, 110, E.abang, "Abang")), tambah("sepuluh", ...isiDi(E.pisang, "ps", SF, 18)), tambah("penuh,", teks("t10", 252, 114, "10", 14, W.merah))),
    k(SUARA_G2, hapus(0, "t10"), ubah("makan", { id: "ps9", op: 0.3 }, { id: "ps8", op: 0.3 }), hapus("dikosongkan.", "ps8", "ps9"), sorotkan("dikosongkan.", "bfc8", "bfc9")),
    k(SUARA_G3, tambah("atas", teks("t5", 236, 101, "5", 14, W.merah)), tambah("bawah", teks("t3", 236, 127, "3", 14, W.merah)), tambah("delapan.", ...kartu("d8", 100, 150, 100, 24, W.emas, ["sisa 8"], 11))),
    k(SUARA_G4, tambah("dikurangi", ...kalimatK("kl", 150, 194, ["10", KURANG, "2", "=", "8"], 16, 28))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk pengurangan. Semuanya membantu menjaga bekal untuk Nenek.";
const SUARA_Z2 = "Take Away: ambil benda yang pergi, lalu hitung benda yang masih tinggal.";
const SUARA_Z3 = "Counting Back: mulai dari bilangan pertama, lalu mundur satu langkah untuk tiap benda yang pergi.";
const SUARA_Z4 = "Ten Frame: kosongkan kotak dari belakang, lalu lihat kotak yang masih terisi.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("Nenek.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Take", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Take Away", "ambil, lalu hitung yang tinggal"], 9.4))),
    k(SUARA_Z3, tambah("Counting", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Counting Back", "mulai dari bilangan pertama, mundur"], 9.4))),
    k(SUARA_Z4, tambah("Ten", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Ten Frame", "kosongkan dari belakang, lihat sisanya"], 9.4))),
  ],
};
