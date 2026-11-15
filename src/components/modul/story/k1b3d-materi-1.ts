import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kotak, teks, type Titik } from "./k1b3d-gambar";
import { bersih, coretAksi, hapus, hitungMuncul, k, rangkai, redamkan, sorotkan, tambah, ubah } from "./k1b3d-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const BURUNG = "\u{1F426}";
const KEPIK = "\u{1F41E}";
const TANAH = () => garis("tanah", 14, 152, 272, 0, W.hijau, 3);
const SLOT = (i: number): Titik => ({ x: 38 + 30 * i, y: 104 });
const SLOTS = [0, 1, 2, 3, 4, 5, 6, 7].map(SLOT);

/* ------------------------------ 1. Cerita burung di dahan ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, Wei, dan Halim ada di taman. Igil, si burung hantu, ikut melihat. Di atas mereka ada pohon besar.";
const SUARA_C2 = "Di dahan pohon itu ada burung. Mula-mula ada delapan burung. Ayo kita hitung: satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_C3 = "Lalu dua burung terbang pergi. Kita coret satu, dua. Burung yang pergi tidak kita hitung lagi.";
const SUARA_C4 = "Sekarang tinggal berapa burung di dahan? Kita hitung yang masih ada: satu, dua, tiga, empat, lima, enam. Tersisa enam burung.";
const SUARA_C5 = "Cerita seperti ini disebut soal cerita pengurangan. Ceritanya ada yang pergi, lalu kita bertanya, tinggal berapa? Hari ini kita belajar menjawabnya, langkah demi langkah.";
const TEMAN: [string, number, string][] = [["Malosi", 28, "Malosi,"], ["Kira", 74, "Kira,"], ["Upe", 120, "Upe,"], ["Wei", 166, "Wei,"], ["Halim", 212, "Halim"]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-burung",
  judul: "Burung di dahan pohon",
  sumber: "Materi: cerita burung di dahan",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman"), TANAH()),
      ...TEMAN.map(([nama, x, pemicu]) => tambah(pemicu, emo(`a-${nama}`, x, 184, ANAK, 26), teks(`n-${nama}`, x, 197, nama, 8.4))),
      tambah("Igil,", emo("a-Igil", 266, 184, IGIL, 26), teks("n-Igil", 266, 197, "Igil", 8.4, W.ungu)),
      tambah("pohon", emo("pohon", 150, 126, "\u{1F333}", 64)),
    ),
    k(
      SUARA_C2,
      hapus(0, "pohon"),
      tambah(0, garis("dahan", 20, 112, 260, 0, W.coklat, 5)),
      ...hitungMuncul(SUARA_C2, "b", SLOTS, (i, p) => emo(`b${i}`, p.x, p.y, BURUNG, 22), "hitung:"),
    ),
    k(
      SUARA_C3,
      tambah("terbang", ...kartu("dl", 70, 134, 160, 24, W.merahMuda, ["pergi: 2 burung"], 9)),
      ...coretAksi(SUARA_C3, "b", SLOTS, [6, 7], "coret"),
    ),
    k(
      SUARA_C4,
      hapus(0, ...SLOTS.map((_, i) => `bn${i}`)),
      ...hitungMuncul(SUARA_C4, "s", SLOTS.slice(0, 6), () => [], "ada:"),
      tambah("Tersisa", ...kartu("sk", 70, 164, 160, 24, W.hijauMuda, ["sisa: 6 burung"], 9)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Soal cerita pengurangan"), emo("bk", 150, 100, "\u{1F4D6}", 64)),
      tambah("Ceritanya", ...kartu("sc1", 40, 126, 220, 28, W.hijauMuda, ["ada yang pergi"], 10)),
      tambah("bertanya,", ...kartu("sc2", 40, 162, 220, 28, W.langit, ["ada pertanyaan"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Tiga bagian soal cerita ------------------------------ */
const SUARA_B1 = "Setiap soal cerita pengurangan punya tiga bagian. Bagian pertama, mula-mula. Mula-mula ada delapan burung di pohon.";
const SUARA_B2 = "Bagian kedua, yang pergi. Dua burung terbang pergi. Kotak yang pergi kita coret.";
const SUARA_B3 = "Bagian ketiga, sisa. Sisa adalah burung yang masih tinggal. Ada enam burung tersisa.";
const SUARA_B4 = "Jadi, baca dulu ceritanya sampai selesai. Cari mula-mula, yang pergi, dan sisa.";
const SUARA_B5 = "Delapan dikurangi dua sama dengan enam. Mula-mula dikurangi yang pergi, hasilnya sisa.";
const BATANG = (i: number) => `bt${i}`;

export const ADEGAN_BAGIAN: AdeganStory = {
  id: "tiga-bagian",
  judul: "Tiga bagian soal cerita",
  sumber: "Materi: tiga bagian soal cerita",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tiga bagian soal cerita")),
      tambah("pertama,", ...kartu("g1", 14, 28, 272, 30, W.hijauMuda, ["1. Mula-mula: 8 burung"], 10)),
      tambah("delapan", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => kotak(BATANG(i), 30 + 30 * i, 130, 30, 22, "#F87171", W.biru, { rx: 0, tebal: 1.3 }))),
    ),
    k(
      SUARA_B2,
      tambah("kedua,", ...kartu("g2", 14, 62, 272, 30, W.langit, ["2. Pergi: 2 burung"], 10)),
      ubah("coret.", { id: BATANG(6), warna: W.abu }, { id: BATANG(7), warna: W.abu }),
      tambah("coret.", emo("cx6", 225, 146, "❌", 14), emo("cx7", 255, 146, "❌", 14)),
    ),
    k(SUARA_B3, tambah("ketiga,", ...kartu("g3", 14, 96, 272, 30, W.pink, ["3. Sisa: 6 burung"], 10)), sorotkan("tersisa.", BATANG(0), BATANG(1), BATANG(2), BATANG(3), BATANG(4), BATANG(5))),
    k(SUARA_B4, redamkan(0, BATANG(0), BATANG(1), BATANG(2), BATANG(3), BATANG(4), BATANG(5)), sorotkan("mula-mula,", "g1-k"), sorotkan("pergi,", "g2-k"), sorotkan("sisa.", "g3-k"), redamkan("pergi,", "g1-k"), redamkan("sisa.", "g2-k")),
    k(SUARA_B5, redamkan(0, "g3-k"), tambah("Mula-mula", ...kartu("jm", 40, 160, 220, 36, W.emas, ["mula-mula − pergi = sisa", "8 − 2 = 6"], 9.4))),
  ],
};

/* ------------------------------ 3. Kata petunjuk kurang ------------------------------ */
const SUARA_K1 = "Di dalam soal cerita ada kata petunjuk. Kata petunjuk memberi tahu kita bahwa jumlahnya berkurang. Kita pakai tanda kurang.";
const SUARA_K2 = "Kata pertama adalah terbang. Delapan burung, lalu dua burung terbang.";
const SUARA_K3 = "Kata kedua adalah dimakan. Lima kue, lalu satu kue dimakan.";
const SUARA_K4 = "Kata ketiga adalah diberikan. Enam bola, lalu dua bola diberikan.";
const SUARA_K5 = "Kata keempat adalah diambil. Tujuh apel, lalu tiga apel diambil. Kata hilang juga artinya pergi. Semua kata itu memberi petunjuk, pakai tanda kurang.";
const SUARA_K6 = "Hati-hati! Kata datang lagi dan bergabung artinya bertambah. Itu pakai tanda tambah, bukan tanda kurang.";
const KARTU_K = (i: number, ikon: string, teksKartu: string, warna: string) => [...kartu(`kw${i}`, 14, 30 + i * 42, 272, 34, warna, [teksKartu], 10.4), emo(`ke${i}`, 34, 56 + i * 42, ikon, 20)];

export const ADEGAN_KATA: AdeganStory = {
  id: "kata-petunjuk",
  judul: "Kata petunjuk kurang",
  sumber: "Materi: kata petunjuk kurang",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kata petunjuk kurang"), emo("lp", 150, 100, "\u{1F50D}", 56)), tambah("pakai", ...kartu("pk", 60, 130, 180, 30, W.emas, ["kata petunjuk: pakai −"], 10))),
    k(SUARA_K2, bersih(0), tambah(0, judul("Kata petunjuk kurang")), tambah("pertama", ...KARTU_K(0, BURUNG, "terbang: 8 − 2", W.hijauMuda))),
    k(SUARA_K3, tambah("kedua", ...KARTU_K(1, "\u{1F370}", "dimakan: 5 − 1", W.langit))),
    k(SUARA_K4, tambah("ketiga", ...KARTU_K(2, "⚽", "diberikan: 6 − 2", W.pink))),
    k(SUARA_K5, tambah("keempat", ...KARTU_K(3, "\u{1F34E}", "diambil: 7 − 3", W.krem)), sorotkan("tanda", "kw0-k", "kw1-k", "kw2-k", "kw3-k")),
    k(
      SUARA_K6,
      bersih(0),
      tambah(0, judul("Hati-hati!")),
      tambah("datang", ...kartu("hh1", 20, 50, 260, 40, W.hijauMuda, ["datang lagi, bergabung: tanda +"], 10.4), emo("hp", 150, 112, "⚠️", 26)),
      tambah("kurang.", ...kartu("hh2", 20, 130, 260, 40, W.merahMuda, ["terbang, pergi, diambil: tanda −"], 10.4)),
    ),
  ],
};

/* ------------------------------ 4. Soal cerita kepik ------------------------------ */
const SUARA_P1 = "Sekarang cerita kepik. Di atas daun ada sepuluh kepik. Mula-mula ada sepuluh kepik.";
const SUARA_P2 = "Langkah pertama, baca dan cari. Mula-mula ada sepuluh kepik. Ayo ketuk dan coret kepik yang terbang: satu, dua.";
const SUARA_P3 = "Langkah kedua, susun kalimat pengurangan. Sepuluh dikurangi dua sama dengan delapan.";
const SUARA_P4 = "Langkah ketiga, susun kalimat jawaban. Sisa kepik ada delapan ekor.";
const SUARA_P5 = "Langkah keempat, periksa jawabannya. Delapan ditambah dua sama dengan sepuluh. Cocok!";
const KEPIK_TITIK: Titik[] = Array.from({ length: 10 }, (_, i) => ({ x: 50 + (i % 5) * 50, y: i < 5 ? 56 : 92 }));
const BAGIAN_P = ["10", "−", "2", "=", "8"];

export const ADEGAN_KEPIK: AdeganStory = {
  id: "soal-kepik",
  judul: "Soal cerita: kepik di atas daun",
  sumber: "Materi: soal cerita kepik",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Kepik di atas daun"), emo("dn", 150, 160, "\u{1F343}", 40)),
      tambah("kepik.", ...KEPIK_TITIK.map((p, i) => emo(`kp${i}`, p.x, p.y, KEPIK, 22))),
      tambah("Mula-mula", ...kartu("pq", 90, 118, 120, 22, W.krem, ["10 kepik"], 10)),
    ),
    k(
      SUARA_P2,
      tambah("pertama,", ...kartu("l1", 14, 150, 272, 24, W.hijauMuda, ["Langkah 1: baca dan cari"], 9.4)),
      ...coretAksi(SUARA_P2, "kp", KEPIK_TITIK, [8, 9], "terbang:"),
    ),
    k(
      SUARA_P3,
      hapus(0, "l1-k", "l1-t0", "pq-k", "pq-t0"),
      tambah("kedua,", ...kartu("l2", 14, 120, 272, 24, W.langit, ["Langkah 2: susun kalimat pengurangan"], 9.4)),
      ...rangkai(SUARA_P3, "ps", 176, BAGIAN_P, ["Sepuluh", "dikurangi", "dua", "sama", "delapan."], "pengurangan."),
    ),
    k(
      SUARA_P4,
      hapus(0, "l2-k", "l2-t0", "ps0", "ps1", "ps2", "ps3", "ps4"),
      tambah("ketiga,", ...kartu("l3", 14, 120, 272, 24, W.pink, ["Langkah 3: susun kalimat jawaban"], 9.4)),
      tambah("Sisa", ...kartu("pj", 50, 148, 200, 20, W.hijauMuda, ["Sisa kepik ada 8 ekor."], 10)),
    ),
    k(
      SUARA_P5,
      hapus(0, "l3-k", "l3-t0", "pj-k", "pj-t0"),
      tambah("keempat,", ...kartu("l4", 14, 120, 272, 24, W.krem, ["Langkah 4: periksa"], 9.4)),
      tambah("Delapan", teks("pt", 150, 156, "8 + 2 = 10", 16, W.hijau)),
      tambah("Cocok!", emo("ok", 262, 150, "✅", 26)),
    ),
  ],
};
