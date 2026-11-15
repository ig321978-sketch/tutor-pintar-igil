import type { AdeganStory } from "./logika-story";
import { W, bulat, benda, deretBilangan, emo, judul, kartu, kartuAngka, teks } from "./k1b2c-gambar";
import { bersih, hapus, k, langkahDeret, rangkai, redamkan, sorotkan, tambah, ubah } from "./k1b2c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const x = (v: number): number => 33 + 26 * (v - 1);

/* ------------------------------ 1. Memeriksa jawaban ------------------------------ */
const SUARA_E1 = "Apakah soal cerita sudah selesai? Belum! Kita periksa dulu jawabannya, dengan cara lain.";
const SUARA_E2 = "Cara pertama, tukar tempat. Dua ditambah empat juga sama dengan enam. Hasilnya sama, jadi jawabannya cocok.";
const SUARA_E3 = "Cara kedua, maju dari bilangan pertama. Mulai dari empat, lalu maju dua langkah: lima, enam.";
const SUARA_E4 = "Cara ketiga, ketuk titik di layar. Ketuk empat titik biru, lalu ketuk dua titik merah. Semuanya ada enam.";
const SUARA_E5 = "Kalau semua cara memberi hasil yang sama, kita menjadi yakin. Jawabannya benar. Ucapkan bersama suara guru: enam burung.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Memeriksa jawaban dengan cara lain",
  sumber: "Materi: memeriksa jawaban",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Periksa jawabanmu"), emo("lp", 262, 50, "\u{1F50D}", 30)), tambah("Belum!", ...kartu("e1", 14, 30, 220, 24, W.krem, ["4 + 2 = 6"], 11))),
    k(SUARA_E2, tambah("tukar", ...kartu("e2", 14, 58, 220, 24, W.hijauMuda, ["tukar tempat: 2 + 4 = 6"], 10)), tambah("cocok.", emo("ok", 262, 78, "✅", 26))),
    k(
      SUARA_E3,
      tambah("pertama,", ...deretBilangan("pr", 112), emo("up", x(4), 108, ANAK, 20)),
      ...langkahDeret(SUARA_E3, [4, 5, 6], "pr", 112, "Mulai"),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Ketuk titik di layar")),
      ...[0, 1, 2, 3].map((i) => tambah("biru,", bulat(`db${i}`, 70 + 24 * i, 168, 9, "#60A5FA"))),
      ...[0, 1].map((i) => tambah("merah.", bulat(`dm${i}`, 190 + 24 * i, 168, 9, "#F87171"))),
      tambah("Semuanya", teks("dt", 150, 196, "4 + 2 = 6", 12, W.merah)),
    ),
    k(SUARA_E5, tambah("yakin.", ...kartu("yk", 60, 100, 180, 26, W.emas, ["Yakin: 6 burung"], 11)), tambah("Jawabannya", emo("ok", 150, 78, "✅", 30))),
  ],
};

/* ------------------------------ 2. Menyusun cerita di layar ------------------------------ */
const SUARA_U1 = "Sekarang giliranmu menyusun cerita di layar. Kira punya dua stoples kelereng. Pilih bilangan dengan mengetuk angka.";
const SUARA_U2 = "Ketuk angka untuk stoples pertama. Ketuk enam. Di stoples pertama ada enam kelereng merah.";
const SUARA_U3 = "Ketuk angka untuk stoples kedua. Ketuk empat. Di stoples kedua ada empat kelereng biru.";
const SUARA_U4 = "Sekarang susun kalimat penjumlahannya dari kartu: enam, tanda tambah, empat, tanda sama dengan, sepuluh.";
const SUARA_U5 = "Lalu susun kalimat jawabannya. Semuanya ada sepuluh kelereng. Ketuk tombol suara untuk mendengar ceritamu.";
const TITIK_STOPLES = (x0: number, n: number, warna: string, p: string) => Array.from({ length: n }, (_, i) => bulat(`${p}${i}`, x0 + 24 + (i % 3) * 36, 62 + Math.floor(i / 3) * 24, 8, warna));
const UBIN = [2, 3, 4, 5, 6];

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun-cerita",
  judul: "Menyusun soal cerita di layar",
  sumber: "Materi: menyusun cerita di layar",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Susun ceritamu di layar")),
      tambah("stoples", ...kartu("j1", 20, 34, 120, 62, W.langit, [], 9), ...kartu("j2", 160, 34, 120, 62, W.hijauMuda, [], 9)),
      tambah("Kira", emo("kr", 150, 90, ANAK, 26), teks("kn", 150, 102, "Kira", 8.4)),
    ),
    k(
      SUARA_U2,
      tambah(0, ...UBIN.flatMap((v, i) => kartuAngka(`n${v}`, 26 + 52 * i, 118, String(v), W.krem, 40, 34, 20))),
      sorotkan("enam.", "n6-k"),
      tambah("kelereng", ...TITIK_STOPLES(20, 6, "#F87171", "ma")),
    ),
    k(SUARA_U3, redamkan(0, "n6-k"), sorotkan("empat.", "n4-k"), tambah("biru.", ...TITIK_STOPLES(160, 4, "#60A5FA", "mb"))),
    k(
      SUARA_U4,
      hapus(0, ...UBIN.flatMap((v) => [`n${v}-k`, `n${v}-t`])),
      ...rangkai(SUARA_U4, "su", 148, ["6", "+", "4", "=", "10"], ["enam,", "tambah,", "empat,", "sama", "sepuluh."], "kartu:"),
    ),
    k(SUARA_U5, tambah("jawabannya.", ...kartu("sj", 40, 166, 220, 26, W.emas, ["Semuanya ada 10 kelereng."], 10)), tambah("suara", emo("sg", 268, 128, "\u{1F50A}", 24))),
  ],
};

/* ------------------------------ 3. Latihan 1: balon Kira ------------------------------ */
const SUARA_L1 = "Latihan satu. Kira punya dua balon. Lalu Kira diberi lagi enam balon. Semua balon Kira ada berapa?";
const SUARA_L2 = "Pikirkan dulu. Bilangan pertama adalah dua, bilangan kedua adalah enam. Kata petunjuknya, diberi lagi.";
const SUARA_L3 = "Tulis kalimat penjumlahan. Dua ditambah enam sama dengan delapan. Jadi Kira punya delapan balon.";
const SUARA_L4 = "Betul! Semuanya ada delapan balon. Hebat sekali!";
const BALON_KANAN = (i: number) => ({ x: 150 + (i % 3) * 32, y: 60 + Math.floor(i / 3) * 34 });

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: balon Kira",
  sumber: "Materi: latihan balon Kira",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("dua", ...[0, 1].flatMap((i) => benda("balon", `lk${i}`, 40 + 32 * i, 70, 11, i))),
      tambah("enam", ...[0, 1, 2, 3, 4, 5].flatMap((i) => benda("balon", `lb${i}`, BALON_KANAN(i).x, BALON_KANAN(i).y, 11, i + 2))),
    ),
    k(SUARA_L2, tambah("pertama", ...kartuAngka("q1", 40, 124, "2", W.merahMuda, 40, 32, 20)), tambah("kedua", ...kartuAngka("q2", 220, 124, "6", W.hijauMuda, 40, 32, 20)), tambah("petunjuknya,", ...kartu("qk", 90, 126, 120, 26, W.krem, ["kata: diberi lagi"], 9))),
    k(
      SUARA_L3,
      hapus(0, "q1-k", "q1-t", "q2-k", "q2-t", "qk-k", "qk-t0"),
      ...rangkai(SUARA_L3, "ls", 138, ["2", "+", "6", "=", "8"], ["Dua", "ditambah", "enam", "sama", "delapan."], "penjumlahan."),
      tambah("Jadi", ...kartu("lj", 50, 164, 200, 26, W.hijauMuda, ["Kira punya 8 balon."], 10)),
    ),
    k(SUARA_L4, tambah("Betul!", emo("ok", 40, 196, "✅", 26)), tambah("Hebat", emo("ow", 262, 196, IGIL, 26))),
  ],
};

/* ------------------------------ 4. Latihan 2: kue Wei dan Upe ------------------------------ */
const SUARA_M1 = "Latihan dua. Wei membawa lima kue. Upe membawa empat kue. Kue Wei dan kue Upe digabung. Semuanya ada berapa?";
const SUARA_M2 = "Mana kalimat yang cocok? Ketuk pilihan di layar. Pilihan pertama, lima ditambah empat. Pilihan kedua, lima ditambah tiga.";
const SUARA_M3 = "Pilihan pertama cocok, karena Wei punya lima kue dan Upe punya empat kue. Lima ditambah empat sama dengan sembilan.";
const SUARA_M4 = "Kalimat jawabannya, semuanya ada sembilan kue. Betul, hebat!";
const KUE = "\u{1F370}";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kue Wei dan Upe",
  sumber: "Materi: latihan kue Wei dan Upe",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah("Wei", teks("wn", 22, 70, "Wei", 8.4), ...[0, 1, 2, 3, 4].map((i) => emo(`kw${i}`, 56 + 32 * i, 68, KUE, 24))),
      tambah("Upe", teks("un", 22, 106, "Upe", 8.4), ...[0, 1, 2, 3].map((i) => emo(`ku${i}`, 56 + 32 * i, 104, KUE, 24))),
    ),
    k(SUARA_M2, tambah("pertama,", ...kartu("o1", 20, 128, 125, 26, W.langit, ["5 + 4 = 9"], 11)), tambah("kedua,", ...kartu("o2", 155, 128, 125, 26, W.pink, ["5 + 3 = 8"], 11))),
    k(SUARA_M3, ubah("cocok,", { id: "o1-k", warna: W.emas }), tambah("sembilan.", emo("ok", 150, 160, "✅", 26)), redamkan(0, "o2-k")),
    k(SUARA_M4, hapus(0, "ok"), tambah("jawabannya,", ...kartu("jw", 40, 166, 220, 26, W.hijauMuda, ["Semuanya ada 9 kue."], 10.4)), tambah("hebat!", emo("ow", 268, 190, IGIL, 24))),
  ],
};

/* ------------------------------ 5. Latihan 3: motor dan mobil ------------------------------ */
const SUARA_N1 = "Latihan tiga. Di tempat parkir ada tiga motor dan dua mobil. Susun kalimat penjumlahan dan kalimat jawabannya dari kartu.";
const SUARA_N2 = "Susun kalimat penjumlahan. Tiga, tanda tambah, dua, tanda sama dengan, lima.";
const SUARA_N3 = "Lalu susun kalimat jawaban. Semuanya ada lima kendaraan.";
const SUARA_N4 = "Betul! Tiga motor ditambah dua mobil, semuanya ada lima kendaraan. Hebat sekali!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: motor dan mobil",
  sumber: "Materi: latihan motor dan mobil",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      tambah("motor", ...[0, 1, 2].map((i) => emo(`mt${i}`, 40 + 40 * i, 76, "\u{1F6F5}", 30))),
      tambah("mobil.", ...[0, 1].map((i) => emo(`mb${i}`, 190 + 44 * i, 76, "\u{1F697}", 30))),
    ),
    k(SUARA_N2, ...rangkai(SUARA_N2, "qq", 122, ["3", "+", "2", "=", "5"], ["Tiga,", "tambah,", "dua,", "sama", "lima."], "penjumlahan.")),
    k(SUARA_N3, tambah("jawaban.", ...kartu("qj", 40, 144, 220, 28, W.hijauMuda, ["Semuanya ada 5 kendaraan."], 10.4))),
    k(SUARA_N4, tambah("Betul!", emo("ok", 40, 196, "✅", 26)), tambah("Hebat", emo("ow", 262, 196, IGIL, 26))),
  ],
};

/* ------------------------------ 6. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi langkah mengerjakan soal cerita. Pertama, baca ceritanya dan cari dua bilangan.";
const SUARA_Z2 = "Kedua, tulis kalimat penjumlahan dengan tanda tambah dan tanda sama dengan. Ketiga, jawab dengan kalimat lengkap.";
const SUARA_Z3 = "Keempat, periksa jawabanmu dengan cara lain. Kamu pasti bisa mengerjakan soal cerita!";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya. Teruslah berlatih di layar, ya.";
const LANGKAH = (i: number, isi: string, warna: string) => kartu(`z${i}`, 14, 30 + i * 40, 272, 32, warna, [isi], 10);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Pertama,", ...LANGKAH(0, "1. Baca dan cari dua bilangan", W.hijauMuda))),
    k(SUARA_Z2, tambah("Kedua,", ...LANGKAH(1, "2. Tulis kalimat penjumlahan", W.langit)), tambah("Ketiga,", ...LANGKAH(2, "3. Jawab dengan kalimat lengkap", W.pink))),
    k(SUARA_Z3, tambah("Keempat,", ...LANGKAH(3, "4. Periksa dengan cara lain", W.krem))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, IGIL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
