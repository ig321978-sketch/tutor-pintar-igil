import type { AdeganStory } from "./logika-story";
import { W, deretAngka, emo, idSel, judul, kartu, kelipatan, panah, teks, tulisKelipatan } from "./k5b2b-gambar";
import { bersih, hapus, k, tambah, warnai } from "./k5b2b-bantu";

const SATU_SAMPAI_12 = Array.from({ length: 12 }, (_, i) => i + 1);

/* ------------------------------ 1. Pembuka Subbab B: pengalaman belajar (Panduan Guru hlm. 52) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-b",
  judul: "Subbab B: Kelipatan Persekutuan",
  sumber: "Panduan Guru hlm. 52; Buku Siswa hlm. 38",
  latar: "#EFF6FF",
  kutipan: [
    "B. Kelipatan Persekutuan",
    "Setelah mempelajari bagian B ini, peserta didik diharapkan dapat",
    "menentukan kelipatan persekutuan dua bilangan atau lebih,",
    "menentukan kelipatan persekutuan terkecil dua bilangan atau lebih,",
    "menyelesaikan masalah yang berkaitan dengan KPK, dan",
    "membuat kesimpulan dari permasalahan yang berkaitan dengan KPK dan",
  ],
  ketukan: [
    k(
      "Subbab B, Kelipatan Persekutuan. Di subbab A kita sudah mengenal kelipatan sebuah bilangan. Sekarang dua bilangan kita pertemukan, untuk mencari kelipatan yang sama.",
      tambah(0, judul("B. Kelipatan Persekutuan")),
      tambah("dua", teks("ka", 150, 62, tulisKelipatan(2, 6), 9.6, W.hijau), teks("kb", 150, 88, tulisKelipatan(3, 6), 9.6, W.merah)),
      tambah("sama.", ...kartu("kc", 70, 116, 160, 36, W.krem, ["yang sama: 6, 12, 18, ..."], 9.6)),
    ),
    k(
      "Menurut panduan guru, setelah mempelajari bagian ini peserta didik diharapkan dapat menentukan kelipatan persekutuan dua bilangan atau lebih, dan menentukan kelipatan persekutuan terkecil dua bilangan atau lebih.",
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("menentukan", ...kartu("g1", 24, 44, 252, 42, W.hijauMuda, ["menentukan kelipatan persekutuan", "dua bilangan atau lebih"], 9.4)),
      tambah("menentukan@2", ...kartu("g2", 24, 106, 252, 42, W.langit, ["menentukan kelipatan persekutuan terkecil", "dua bilangan atau lebih"], 9.4)),
    ),
    k(
      "Lalu menyelesaikan masalah yang berkaitan dengan KPK, dan membuat kesimpulan dari permasalahan yang berkaitan dengan KPK dan FPB.",
      bersih(0),
      tambah(0, judul("Dua hal lagi")),
      tambah("menyelesaikan", ...kartu("g3", 24, 44, 252, 42, W.krem, ["menyelesaikan masalah", "yang berkaitan dengan KPK"], 9.4)),
      tambah("kesimpulan", ...kartu("g4", 24, 106, 252, 42, W.pink, ["membuat kesimpulan tentang", "permasalahan KPK dan FPB"], 9.4)),
    ),
    k(
      "Jadi ada empat hal yang akan kita capai: kelipatan persekutuan, KPK, masalah sehari-hari dengan KPK, dan kesimpulannya. Kita mulai dari sebuah permainan tepuk bilangan.",
      bersih(0),
      tambah(0, judul("Empat tujuan, mulai dari permainan")),
      tambah("kelipatan", teks("t1", 75, 70, "1", 24, W.hijau), teks("t1b", 75, 92, "kelipatan persekutuan", 7.6, W.hitam)),
      tambah("KPK,", teks("t2", 225, 70, "2", 24, W.biru), teks("t2b", 225, 92, "KPK", 8.6, W.hitam)),
      tambah("masalah", teks("t3", 75, 130, "3", 24, W.merah), teks("t3b", 75, 152, "masalah dengan KPK", 8.2, W.hitam)),
      tambah("kesimpulannya.", teks("t4", 225, 130, "4", 24, W.ungu), teks("t4b", 225, 152, "kesimpulan", 8.6, W.hitam)),
      tambah("permainan", emo("tp", 150, 192, "👏", 20)),
    ),
  ],
};

/* ------------------------------ 2. Sarana, apersepsi, dan pemanasan (Panduan Guru hlm. 52 dan 53) ------------------------------ */
export const ADEGAN_PERSIAPAN: AdeganStory = {
  id: "persiapan-b",
  judul: "Sarana, apersepsi, dan pemanasan",
  sumber: "Panduan Guru hlm. 52–53",
  latar: "#FFFBEB",
  kutipan: [
    "Kebutuhan Sarana Prasarana dan Media Pembelajaran",
    "Alat tulis",
    "Lembar fotokopi atau print out kalender Agustus dan September 2022",
    "sesuai jumlah siswa atau kelompok.",
    "Awali materi ini dengan mengingatkan peserta didik pada materi sebelumnya,",
    "yaitu tentang kelipatan bilangan.",
    "Tunjuk beberapa peserta didik secara",
    "acak, kemudian minta peserta didik tersebut untuk menyebutkan beberapa",
    "Penguasaan perkalian",
    "merupakan materi prasyarat yang penting",
    "lakukan permainan tepuk bilangan kelipatan secara klasikal.",
    "seluruh peserta didik bertepuk tangan sekali.",
    "menyelesaikan masalah yang berkaitan dengan jadwal latihan",
  ],
  ketukan: [
    k(
      "Sarana yang dibutuhkan sederhana: alat tulis, serta lembar fotokopi atau print out kalender Agustus dan September, sesuai jumlah siswa atau kelompok.",
      tambah(0, judul("Sarana dan media")),
      tambah("alat", emo("sa", 75, 70, "📝", 30), ...kartu("sa2", 25, 90, 100, 32, W.langit, ["alat tulis"], 9.4)),
      tambah("kalender", emo("sb", 225, 70, "📅", 30), ...kartu("sb2", 160, 90, 130, 32, W.krem, ["kalender Agustus", "dan September"], 8.6)),
      tambah("kelompok.", teks("sc", 150, 156, "sesuai jumlah siswa atau kelompok", 9.4, W.hijau)),
    ),
    k(
      "Kalender itu dipakai untuk belajar penerapan KPK. Harapannya, peserta didik memakai benda nyata dulu, baru kemudian diajak memahami konsep KPK.",
      bersih(0),
      tambah(0, judul("Benda nyata dulu")),
      tambah("Kalender", ...kartu("bn1", 20, 60, 110, 52, W.krem, ["kalender", "benda nyata"], 9.4)),
      tambah("baru", panah("bn", 134, 86, 28, 0, W.biru, 2.2)),
      tambah("konsep", ...kartu("bn2", 170, 60, 110, 52, W.hijauMuda, ["konsep", "KPK"], 9.4)),
      tambah("nyata", emo("bnk", 75, 150, "📅", 28)),
    ),
    k(
      "Apersepsi. Awali dengan mengingatkan materi sebelumnya, yaitu kelipatan bilangan. Guru menunjuk beberapa peserta didik secara acak untuk menyebutkan beberapa kelipatan dari suatu bilangan.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("Awali", ...kartu("ap1", 24, 40, 252, 36, W.langit, ["ingat materi sebelumnya:", "kelipatan bilangan"], 9)),
      tambah("menunjuk", emo("ap2", 60, 124, "🙋", 28), ...kartu("ap3", 100, 96, 176, 44, W.hijauMuda, ["sebutkan kelipatan", "suatu bilangan"], 9)),
      tambah("acak", teks("ap4", 150, 172, "dipilih secara acak", 9.4, W.merah)),
    ),
    k(
      "Penguasaan perkalian adalah materi prasyarat yang penting agar peserta didik dapat mengikuti pembelajaran. Karena itu apersepsi juga bisa berupa hafalan perkalian.",
      bersih(0),
      tambah(0, judul("Perkalian itu penting")),
      tambah("Penguasaan", ...kartu("pk1", 40, 44, 220, 38, W.krem, ["penguasaan perkalian"], 10.4)),
      tambah("prasyarat", teks("pk2", 150, 108, "prasyarat penting", 11, W.merah)),
      tambah("hafalan", teks("pk3", 150, 150, "3 × 4 = 12", 17, W.hitam)),
    ),
    k(
      "Pemanasan. Guru mengajak permainan tepuk bilangan kelipatan secara klasikal. Guru menyebut sebuah bilangan, dan saat guru menyebut kelipatan yang sesuai, seluruh peserta didik bertepuk tangan sekali.",
      bersih(0),
      tambah(0, judul("Pemanasan")),
      tambah("Guru", emo("pm1", 60, 84, "🧑", 30), ...kartu("pm2", 100, 56, 176, 38, W.langit, ["guru menyebut bilangan"], 9)),
      tambah("kelipatan@2", ...kartu("pm3", 100, 108, 176, 38, W.hijauMuda, ["kelipatan yang sesuai"], 9)),
      tambah("bertepuk", emo("pm4", 150, 182, "👏", 28)),
    ),
    k(
      "Guru juga menyampaikan manfaatnya, salah satunya untuk menyelesaikan masalah jadwal latihan renang seperti pada halaman kover bab.",
      bersih(0),
      tambah(0, judul("Manfaat belajar kali ini")),
      tambah("jadwal", ...kartu("mf1", 30, 50, 240, 40, W.hijauMuda, ["masalah jadwal latihan renang"], 9.6)),
      tambah("renang", emo("mf2", 150, 140, "🏊", 40)),
      tambah("kover", teks("mf3", 150, 190, "seperti di halaman kover bab", 8.8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 2.2A: Tepuk Bilangan 2 dan 3 (Buku Siswa hlm. 38 dan 39; Panduan Guru hlm. 53 sampai 55) ------------------------------ */
export const ADEGAN_TEPUK: AdeganStory = {
  id: "tepuk-2-3",
  judul: "Eksplorasi 2.2A: Tepuk Bilangan 2 dan 3",
  sumber: "Buku Siswa hlm. 38–39; Panduan Guru hlm. 53–54",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 2.2A",
    "Ayo Bermain",
    "Namun, kali ini",
    "aturannya kita tambah, ya.",
    "Buat kelompok besar.",
    "Semua siswa boleh duduk di kursi masing-masing.",
    "Sebutkan bilangan secara berurutan mulai dari 1.",
    "kalian harus bertepuk tangan tanpa",
    "kalian harus bilang",
    "dengan lantang.",
    "Bagaimana jika kita mendapatkan",
    "giliran menyebutkan bilangan",
    "kelipatan 2 dan juga kelipatan 3?",
    "bertepuk tangan dan mengatakan",
    "secara bersamaan.",
    "Apakah ada teman kalian yang terlewat",
    "Kapan kalian harus bertepuk tangan dan",
    "Hal penting yang harus dipahami peserta didik",
    "kelipatan bersama dari dua bilangan atau lebih.",
  ],
  ketukan: [
    k(
      "Eksplorasi dua titik dua A, Ayo Bermain. Kita bermain Tepuk Bilangan Kelipatan lagi dengan aturan tambahan. Buat kelompok besar, semua boleh duduk di kursi masing-masing.",
      tambah(0, judul("Eksplorasi 2.2A: Ayo Bermain")),
      tambah("Bilangan", emo("e1", 75, 96, "👏", 40)),
      tambah("tambahan.", ...kartu("e2", 130, 62, 150, 44, W.krem, ["aturan ditambah"], 10.4)),
      tambah("kelompok", emo("e3", 150, 170, "👥", 34)),
    ),
    k(
      "Sebagai contoh, kita bermain Tepuk Bilangan dua dan tiga. Sebutkan bilangan secara berurutan mulai dari satu.",
      bersih(0),
      tambah(0, judul("Tepuk Bilangan 2 dan 3")),
      tambah("berurutan", ...deretAngka("ra", 18, 66, 22, 22, SATU_SAMPAI_12)),
      tambah("satu.", teks("e4", 150, 130, "1, 2, 3, 4, 5, 6, ...", 13, W.hitam)),
    ),
    k(
      "Saat giliranmu menyebut kelipatan dua, misalnya dua, empat, enam, kamu bertepuk tangan tanpa menyebutkan bilangannya.",
      hapus(0, "e4"),
      tambah(0, teks("la", 150, 56, "kelipatan 2: tepuk tangan", 9.6, W.hijau)),
      warnai("tepuk", W.hijauPita, ...idSel("ra", 1, kelipatan(2, 6))),
      tambah("tepuk", teks("e5", 150, 118, "2, 4, 6, ...", 13, W.hijau)),
    ),
    k(
      "Saat giliranmu menyebut kelipatan tiga, misalnya tiga, enam, sembilan, kamu harus berkata Hore dengan lantang.",
      hapus(0, "e5"),
      tambah(0, teks("lb", 150, 150, "kelipatan 3: bilang Hore!", 9.6, W.merah)),
      tambah("tiga,", ...deretAngka("rb", 18, 158, 22, 22, SATU_SAMPAI_12, kelipatan(3, 4), W.jingga)),
      tambah("Hore", teks("e6", 150, 132, "3, 6, 9, ...", 13, W.merah)),
    ),
    k(
      "Bagaimana kalau giliranmu menyebut kelipatan dua dan juga kelipatan tiga, misalnya enam, dua belas, delapan belas? Kita harus bertepuk tangan dan berkata Hore bersamaan.",
      warnai("enam,", W.merahPita, "ra-5", "ra-11", "rb-5", "rb-11"),
      tambah("bersamaan.", teks("e7", 150, 196, "6, 12, 18, ...: tepuk dan Hore sekaligus!", 8.6, W.merah)),
    ),
    k(
      "Buku bertanya, bagaimana perasaan kalian bermain Tepuk Bilangan Kelipatan dua dan tiga? Apakah ada teman yang terlewat sehingga tidak bertepuk tangan dan mengucapkan Hore?",
      bersih(0),
      tambah(0, judul("Bagaimana perasaanmu?")),
      tambah("perasaan", emo("r1", 80, 90, "🤔", 40)),
      tambah("terlewat", emo("r2", 220, 90, "😅", 40)),
      tambah("Hore", ...kartu("r3", 40, 124, 220, 40, W.krem, ["ada yang terlewat bertepuk", "atau lupa berkata Hore?"], 9)),
    ),
    k(
      "Panduan guru memberi pertanyaan pemantik: kapan kalian harus bertepuk tangan dan berkata Hore pada saat yang bersamaan? Jawabannya mengarah ke satu hal penting: ada bilangan yang menjadi kelipatan bersama dari dua bilangan atau lebih.",
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("Kapan", ...kartu("pt1", 24, 40, 252, 44, W.langit, ["kapan bertepuk dan Hore", "pada saat bersamaan?"], 9.6)),
      tambah("Jawabannya", ...kartu("pt2", 24, 102, 252, 54, W.hijauMuda, ["ada bilangan yang menjadi", "kelipatan bersama dari", "dua bilangan atau lebih"], 9.6)),
    ),
  ],
};

