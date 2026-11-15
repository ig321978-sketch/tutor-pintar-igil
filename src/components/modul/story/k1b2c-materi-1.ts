import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kartuAngka, pensilW, teks } from "./k1b2c-gambar";
import { bersih, hapus, hitungMuncul, k, redamkan, sorotkan, tambah, ubah } from "./k1b2c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const BURUNG = "\u{1F426}";
const TANAH = () => garis("tanah", 14, 152, 272, 0, W.hijau, 3);
const SLOT = (i: number) => ({ x: 60 + 36 * i, y: 104 });

/* ------------------------------ 1. Cerita burung di dahan ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, Wei, dan Halim bermain di taman bersama Igil, si burung hantu. Di atas mereka ada pohon besar.";
const SUARA_C2 = "Di dahan pohon itu ada burung. Ayo kita hitung burungnya: satu, dua, tiga, empat.";
const SUARA_C3 = "Lalu datang lagi dua burung. Mereka hinggap di dahan itu, di sebelah burung yang tadi.";
const SUARA_C4 = "Igil bertanya, berapa semua burung di dahan? Pertanyaan seperti ini ada di soal cerita.";
const SUARA_C5 = "Soal cerita menceritakan sesuatu, lalu bertanya. Hari ini kita belajar menjawabnya, langkah demi langkah.";
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
      tambah(0, garis("dahan", 40, 112, 220, 0, W.coklat, 5)),
      ...hitungMuncul(SUARA_C2, "b", [0, 1, 2, 3].map(SLOT), (i, p) => emo(`b${i}`, p.x, p.y, BURUNG, 22), "burungnya:"),
    ),
    k(
      SUARA_C3,
      tambah("datang", ...kartu("dl", 70, 134, 160, 24, W.hijauMuda, ["datang lagi: 2 burung"], 9)),
      tambah("hinggap", ...[4, 5].map((i) => emo(`b${i}`, SLOT(i).x, SLOT(i).y, BURUNG, 22, { sorot: true }))),
    ),
    k(
      SUARA_C4,
      tambah("bertanya,", ...kartu("ig", 14, 30, 220, 28, W.krem, ["Igil: Semua ada berapa burung?"], 9.4)),
      tambah("soal", emo("tanya", 266, 56, "❓", 26)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Soal cerita"), emo("bk", 150, 100, "\u{1F4D6}", 64)),
      tambah("menceritakan", ...kartu("sc1", 40, 126, 220, 28, W.hijauMuda, ["ada cerita"], 10)),
      tambah("bertanya,", ...kartu("sc2", 40, 162, 220, 28, W.langit, ["ada pertanyaan"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Tiga bagian soal cerita ------------------------------ */
const SUARA_B1 = "Soal cerita punya tiga bagian. Bagian pertama, yang sudah ada. Di dahan ada empat burung.";
const SUARA_B2 = "Bagian kedua, yang datang lagi. Datang lagi dua burung.";
const SUARA_B3 = "Bagian ketiga, pertanyaannya. Semuanya ada berapa burung?";
const SUARA_B4 = "Jadi, baca dulu ceritanya sampai selesai. Cari yang sudah ada, yang datang lagi, dan pertanyaannya.";
const SUARA_B5 = "Dengan tiga bagian itu, kita tahu apa yang harus dicari. Kita tinggal menjumlahkan yang ada dan yang datang lagi.";

export const ADEGAN_BAGIAN: AdeganStory = {
  id: "tiga-bagian",
  judul: "Tiga bagian soal cerita",
  sumber: "Materi: tiga bagian soal cerita",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tiga bagian soal cerita")),
      tambah("pertama,", ...kartu("g1", 14, 28, 272, 30, W.hijauMuda, ["1. Yang ada: 4 burung"], 10)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`e${i}`, 40 + 35 * i, 165, BURUNG, 24))),
    ),
    k(
      SUARA_B2,
      tambah("kedua,", ...kartu("g2", 14, 62, 272, 30, W.langit, ["2. Datang lagi: 2 burung"], 10)),
      tambah("dua", teks("pls", 183, 162, "+", 22, W.biru), ...[4, 5].map((i) => emo(`e${i}`, 205 + 35 * (i - 4), 165, BURUNG, 24))),
    ),
    k(SUARA_B3, tambah("ketiga,", ...kartu("g3", 14, 96, 272, 30, W.pink, ["3. Semua ada berapa burung?"], 10)), tambah("berapa", emo("tn", 262, 148, "❓", 24))),
    k(SUARA_B4, sorotkan("ada,", "g1-k"), sorotkan("lagi,", "g2-k"), sorotkan("pertanyaannya.", "g3-k"), redamkan("lagi,", "g1-k"), redamkan("pertanyaannya.", "g2-k")),
    k(SUARA_B5, redamkan(0, "g3-k"), tambah("menjumlahkan", ...kartu("jm", 50, 172, 200, 26, W.emas, ["yang ada + yang datang lagi"], 9.4))),
  ],
};

/* ------------------------------ 3. Mencari dua bilangan ------------------------------ */
const SUARA_R1 = "Sekarang cerita Halim. Halim punya tiga pensil merah di tangan kiri dan empat pensil hijau di tangan kanan.";
const SUARA_R2 = "Kita cari dua bilangan di dalam cerita. Bilangan pertama adalah tiga, bilangan kedua adalah empat.";
const SUARA_R3 = "Perhatikan kata juga di dalam cerita. Kata juga memberi tanda bahwa kedua pensil itu digabung.";
const SUARA_R4 = "Sekarang kita punya dua bilangan, tiga dan empat. Dua bilangan ini nanti kita tulis dalam kalimat penjumlahan.";
const SUARA_R5 = "Hebat! Jadi langkah pertama adalah membaca cerita dan mencari dua bilangannya.";

export const ADEGAN_CARI: AdeganStory = {
  id: "cari-bilangan",
  judul: "Mencari dua bilangan di cerita",
  sumber: "Materi: mencari dua bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Pensil Halim"), emo("hl", 150, 66, ANAK, 26), teks("hn", 150, 76, "Halim", 8.4)),
      tambah("merah", ...[0, 1, 2].flatMap((i) => pensilW(`pm${i}`, 40 + 22 * i, 62, "#F87171")), ...kartu("km", 20, 150, 110, 26, W.merahMuda, ["3 pensil merah"], 9)),
      tambah("hijau", ...[0, 1, 2, 3].flatMap((i) => pensilW(`ph${i}`, 170 + 22 * i, 62, "#4ADE80")), ...kartu("kh", 160, 150, 120, 26, W.hijauMuda, ["4 pensil hijau"], 9)),
    ),
    k(
      SUARA_R2,
      tambah("pertama", ...kartuAngka("p1", 60, 90, "3", W.merahMuda, 40, 36, 22)),
      tambah("empat.", ...kartuAngka("p2", 200, 90, "4", W.hijauMuda, 40, 36, 22)),
    ),
    k(SUARA_R3, tambah("kata", ...kartu("kj", 60, 127, 180, 22, W.krem, ["kata petunjuk: juga"], 10)), tambah("digabung.", emo("gb", 150, 112, "\u{1F517}", 24))),
    k(SUARA_R4, tambah("kalimat", teks("kp", 150, 190, "3  +  4  =  ?", 16, W.merah))),
    k(SUARA_R5, ubah("pertama", { id: "jud", isi: "Langkah 1: baca dan cari" }), tambah("Hebat!", emo("ok", 150, 100, "✅", 26))),
  ],
};

/* ------------------------------ 4. Kata petunjuk tambah ------------------------------ */
const SUARA_K1 = "Di dalam soal cerita ada kata petunjuk. Kata petunjuk memberi tahu kita bahwa kita harus menambah.";
const SUARA_K2 = "Kata pertama adalah datang lagi. Lima anak berada di taman, lalu datang lagi tiga anak.";
const SUARA_K3 = "Kata kedua adalah diberi lagi. Lima kue, lalu diberi lagi satu kue.";
const SUARA_K4 = "Kata ketiga adalah bergabung. Empat pensil bergabung dengan tiga pensil.";
const SUARA_K5 = "Kata keempat adalah jumlah semua. Semua kata itu memberi petunjuk, pakai tanda tambah.";
const KARTU_K = (i: number, ikon: string, teksKartu: string, warna: string) => [...kartu(`kw${i}`, 14, 30 + i * 42, 272, 34, warna, [teksKartu], 10.4), emo(`ke${i}`, 34, 56 + i * 42, ikon, 20)];

export const ADEGAN_KATA: AdeganStory = {
  id: "kata-petunjuk",
  judul: "Kata petunjuk tambah",
  sumber: "Materi: kata petunjuk tambah",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kata petunjuk tambah"), emo("lp", 150, 100, "\u{1F50D}", 56)), tambah("harus", ...kartu("pk", 60, 130, 180, 30, W.emas, ["kata petunjuk: pakai +"], 10))),
    k(SUARA_K2, bersih(0), tambah(0, judul("Kata petunjuk tambah")), tambah("pertama", ...KARTU_K(0, "\u{1F6B6}", "datang lagi: 5 + 3", W.hijauMuda))),
    k(SUARA_K3, tambah("kedua", ...KARTU_K(1, "\u{1F381}", "diberi lagi: 5 + 1", W.langit))),
    k(SUARA_K4, tambah("ketiga", ...KARTU_K(2, "\u{1F517}", "bergabung: 4 + 3", W.pink))),
    k(
      SUARA_K5,
      tambah("keempat", ...KARTU_K(3, "\u{1F522}", "jumlah semua: 2 + 6", W.krem)),
      sorotkan("tambah.", "kw0-k", "kw1-k", "kw2-k", "kw3-k"),
      tambah("petunjuk,", emo("pt", 262, 197, "➕", 14)),
    ),
  ],
};
