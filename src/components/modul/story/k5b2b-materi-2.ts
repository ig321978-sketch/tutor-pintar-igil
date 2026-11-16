import type { AdeganStory } from "./logika-story";
import { W, deretAngka, emo, idSel, judul, kartu, kelipatan, tabelAngka, teks, tulisKelipatan } from "./k5b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah, warnai } from "./k5b2b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

const dari1Sampai = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
const KELIPATAN_2_SD_50 = dari1Sampai(50).filter((n) => n % 2 === 0);
const KELIPATAN_3_SD_50 = dari1Sampai(50).filter((n) => n % 3 === 0);
const KELIPATAN_6_SD_50 = dari1Sampai(50).filter((n) => n % 6 === 0);

/* ------------------------------ 4. Tabel bilangan 1 sampai 50 (Buku Siswa hlm. 39; Panduan Guru hlm. 54 dan 55) ------------------------------ */
export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel-50",
  judul: "Tabel bilangan: kelipatan 2 dan 3",
  sumber: "Materi: tabel kelipatan 2 dan 3",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k5b2b-materi-2.ts:1"),
  ketukan: [
    k(
      "Setelah bermain, salin tabel bilangan satu sampai lima puluh di kertasmu. Lalu temukan lagi bilangan kelipatan dua dan tiga pada tabel itu.",
      tambah(0, judul("Tabel bilangan 1 sampai 50")),
      tambah("tabel", ...tabelAngka("tb", 20, 32, 26, 24, 10, 1, 50)),
      tambah("kelipatan", teks("pn", 150, 176, "temukan kelipatan 2 dan 3", 10, W.merah)),
    ),
    k(
      "Kelipatan dua kita warnai hijau: dua, empat, enam, dan seterusnya sampai lima puluh. Ada dua puluh lima bilangan.",
      hapus(0, "pn"),
      warnai("hijau:", W.hijauPita, ...idSel("tb", 1, KELIPATAN_2_SD_50)),
      tambah("hijau:", teks("l2", 150, 176, "kelipatan 2: hijau", 10, W.hijau)),
      tambah("Ada", teks("c2", 150, 192, "ada 25 bilangan", 9.4, W.hitam)),
    ),
    k(
      "Kelipatan tiga kita warnai jingga: tiga, enam, sembilan, dan seterusnya sampai empat puluh delapan. Ada enam belas bilangan.",
      warnai("jingga:", W.jingga, ...idSel("tb", 1, KELIPATAN_3_SD_50)),
      hapus(0, "l2", "c2"),
      tambah("jingga:", teks("l3", 150, 176, "kelipatan 3: jingga", 10, W.coklat)),
      tambah("Ada", teks("c3", 150, 192, "ada 16 bilangan", 9.4, W.hitam)),
    ),
    k(
      "Bilangan yang terwarnai dua kali adalah kelipatan dua sekaligus kelipatan tiga: enam, dua belas, delapan belas, dua puluh empat, tiga puluh, tiga puluh enam, empat puluh dua, dan empat puluh delapan. Ada delapan bilangan.",
      hapus(0, "l3", "c3"),
      warnai("enam,", W.merahPita, ...idSel("tb", 1, KELIPATAN_6_SD_50)),
      sorotkan("enam,", ...idSel("tb", 1, KELIPATAN_6_SD_50)),
      tambah("Ada@2", teks("c6", 150, 176, "6, 12, 18, 24, 30, 36, 42, 48", 10.4, W.merah), teks("c7", 150, 192, "ada 8 bilangan", 9.4, W.hitam)),
    ),
    k(
      "Ada tiga cara untuk menemukannya. Pertama, langsung mewarnai berdasarkan hafalan saat bermain. Kedua, menandai kelipatan dua dahulu, lalu memilih yang kelipatan tiga. Ketiga, menandai dua dan tiga sekaligus, lalu mencari yang ditandai dua kali.",
      bersih(0),
      tambah(0, judul("Tiga cara menemukannya")),
      tambah("Pertama,", ...kartu("c1", 20, 38, 260, 36, W.hijauMuda, ["1 langsung mewarnai dari hafalan", "saat bermain tepuk bilangan"], 8.8)),
      tambah("Kedua,", ...kartu("c2", 20, 84, 260, 36, W.langit, ["2 tandai kelipatan 2 dahulu,", "lalu pilih yang kelipatan 3"], 8.8)),
      tambah("Ketiga,", ...kartu("c3", 20, 130, 260, 36, W.krem, ["3 tandai 2 dan 3 sekaligus,", "cari yang ditandai dua kali"], 8.8)),
    ),
    k(
      "Semua pendapat kalian kami hargai. Kalau ada yang masih keliru, guru akan membantu meluruskan supaya tidak salah konsep.",
      bersih(0),
      tambah(0, judul("Terima semua pendapat")),
      tambah("hargai.", emo("ap", 150, 92, "🌟", 44)),
      tambah("keliru,", ...kartu("kl", 40, 126, 220, 42, W.pink, ["yang keliru diarahkan", "agar tidak salah konsep"], 9.4)),
    ),
  ],
};

/* ------------------------------ 5. Kelipatan persekutuan dan KPK (Buku Siswa hlm. 39 dan 40; Panduan Guru hlm. 55) ------------------------------ */
export const ADEGAN_DEFINISI: AdeganStory = {
  id: "definisi-kpk",
  judul: "Kelipatan persekutuan dan KPK",
  sumber: "Materi: kelipatan persekutuan dan KPK",
  latar: "#EFF6FF",
  kutipan: kutipanLokal("k5b2b-materi-2.ts:2"),
  ketukan: [
    k(
      "Pada tabel tadi kita menemukan bilangan yang merupakan kelipatan dua dan juga kelipatan tiga. Contohnya enam, dua belas, dan delapan belas.",
      tambah(0, judul("Kelipatan 2 dan kelipatan 3")),
      tambah("kelipatan", teks("ka", 150, 54, tulisKelipatan(2, 10), 8.6, W.hijau), teks("kb", 150, 78, tulisKelipatan(3, 7), 8.6, W.coklat)),
      tambah("Contohnya", teks("kc", 150, 120, "6, 12, 18, ...", 16, W.merah)),
    ),
    k(
      "Dalam matematika, bilangan kelipatan yang sama itu disebut kelipatan persekutuan.",
      tambah("disebut", ...kartu("kp", 40, 138, 220, 44, W.krem, ["kelipatan yang sama", "disebut kelipatan persekutuan"], 9.6)),
    ),
    k(
      "Jadi enam, dua belas, dan delapan belas adalah kelipatan persekutuan dari dua dan tiga. Perhatikan papan tulis, bilangan yang sama kita beri tanda.",
      bersih(0),
      tambah(0, judul("Papan tulis: yang sama ditandai")),
      tambah("Jadi", teks("pa", 150, 54, "kelipatan 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, ...", 8, W.hijau), teks("pb", 150, 78, "kelipatan 3: 3, 6, 9, 12, 15, 18, 21, ...", 8, W.coklat)),
      tambah("tanda.", teks("pc", 150, 118, "yang sama: 6, 12, 18, ...", 12, W.merah), ...kartu("pd", 40, 134, 220, 40, W.hijauMuda, ["6, 12, 18 = kelipatan persekutuan", "dari 2 dan 3"], 9.4)),
    ),
    k(
      "Dari semua kelipatan persekutuan, kelipatan yang paling kecil disebut kelipatan persekutuan terkecil, disingkat KPK.",
      bersih(0),
      tambah(0, judul("Kelipatan persekutuan terkecil")),
      tambah("semua", teks("sm", 150, 64, "6, 12, 18, 24, ...", 15, W.hitam)),
      tambah("paling", teks("sm2", 150, 98, "yang paling kecil: 6", 12, W.merah)),
      tambah("KPK.", ...kartu("kk", 60, 122, 180, 44, W.langit, ["KPK", "kelipatan persekutuan terkecil"], 9.6)),
    ),
    k(
      "Berapa kelipatan persekutuan terkecil dari dua dan tiga? Kelipatan persekutuannya enam, dua belas, delapan belas. Yang paling kecil adalah enam, jadi KPK dari dua dan tiga adalah enam.",
      bersih(0),
      tambah(0, judul("KPK dari 2 dan 3")),
      tambah("Berapa", teks("q1", 150, 60, "kelipatan 2: 2, 4, 6, 8, ...", 10, W.hijau), teks("q2", 150, 82, "kelipatan 3: 3, 6, 9, ...", 10, W.coklat)),
      tambah("paling", teks("q3", 150, 118, "yang sama pertama: 6", 12, W.merah)),
      tambah("KPK", teks("q4", 150, 160, "KPK 2 dan 3 = 6", 20, W.biru)),
    ),
  ],
};

/* ------------------------------ 6. Cara menentukan KPK: 4 dan 5 (Buku Siswa hlm. 40) ------------------------------ */
const K4 = kelipatan(4, 11);
const K5 = kelipatan(5, 9);
export const ADEGAN_CARA_KPK: AdeganStory = {
  id: "cara-kpk-4-5",
  judul: "Cara menentukan KPK dari 4 dan 5",
  sumber: "Materi: cara mencari KPK 4 dan 5",
  latar: "#FEFCE8",
  kutipan: kutipanLokal("k5b2b-materi-2.ts:3"),
  ketukan: [
    k(
      "Bagaimana cara menentukan KPK dari dua bilangan atau lebih? Sebagai contoh, kita akan mencari KPK dari empat dan lima.",
      tambah(0, judul("KPK dari 4 dan 5")),
      tambah("dua", teks("q1", 150, 70, "KPK dari 4 dan 5 = ?", 20, W.merah)),
      tambah("empat", teks("q2", 80, 150, "4", 34, W.hijau), teks("q3", 220, 150, "5", 34, W.coklat)),
    ),
    k(
      "Langkah pertama, tuliskan bilangan kelipatan empat dan kelipatan lima.",
      bersih(0),
      tambah(0, judul("Langkah 1: tulis kelipatan")),
      tambah("empat", teks("lk4", 150, 44, "kelipatan 4", 9, W.hijau), ...deretAngka("ka", 18, 50, 24, 22, K4)),
      tambah("lima.", teks("lk5", 150, 100, "kelipatan 5", 9, W.coklat), ...deretAngka("kb", 18, 106, 24, 22, K5)),
    ),
    k(
      "Langkah kedua, bandingkan kedua daftar itu, lalu tandai bilangan yang sama. Ternyata dua puluh dan empat puluh ada di kedua daftar.",
      tambah(0, judul("Langkah 2: tandai yang sama")),
      warnai("tandai", W.emas, "ka-4", "ka-9", "kb-3", "kb-7"),
      tambah("Ternyata", teks("sm", 150, 156, "yang sama: 20 dan 40", 12, W.merah)),
    ),
    k(
      "Bilangan yang sama itu adalah bilangan persekutuan dari empat dan lima. KPK adalah bilangan persekutuan yang paling kecil.",
      sorotkan("paling", "ka-4", "kb-3"),
      warnai("paling", W.merahPita, "ka-4", "kb-3"),
      tambah("paling", teks("sm2", 150, 178, "paling kecil: 20", 11, W.biru)),
    ),
    k(
      "Jadi kelipatan persekutuan terkecil dari empat dan lima adalah dua puluh.",
      hapus(0, "sm", "sm2"),
      tambah("Jadi", teks("hs", 150, 160, "KPK 4 dan 5 = 20", 20, W.biru)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 2.2B: Latihan Renang Malosi dan Igil (Buku Siswa hlm. 41; Panduan Guru hlm. 56) ------------------------------ */
export const ADEGAN_RENANG: AdeganStory = {
  id: "renang-nisa-yohana",
  judul: "Latihan Renang Malosi dan Igil",
  sumber: "Materi: latihan renang Malosi dan Igil",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b2b-materi-2.ts:4"),
  ketukan: [
    k(
      "Latihan Renang. Malosi dan Igil latihan renang di tempat yang sama. Malosi berlatih setiap tiga hari sekali, dan Igil setiap empat hari sekali.",
      tambah(0, judul("Latihan Renang")),
      tambah("Malosi", emo("n1", 70, 78, "🏊", 36), ...kartu("n2", 20, 96, 100, 40, W.hijauMuda, ["Malosi", "tiap 3 hari"], 9.6)),
      tambah("Igil", emo("y1", 230, 78, "🏊", 36), ...kartu("y2", 180, 96, 100, 40, W.langit, ["Igil", "tiap 4 hari"], 9.6)),
    ),
    k(
      "Hari ini, tanggal tiga Agustus, Malosi dan Igil berlatih renang bersama. Kapan mereka akan berlatih bersama kembali?",
      bersih(0),
      tambah(0, judul("Hari ini: 3 Agustus")),
      tambah("tanggal", ...kartu("hr", 60, 44, 180, 44, W.krem, ["3 Agustus", "berlatih bersama"], 10.4)),
      tambah("Kapan", teks("kp", 150, 132, "bersama lagi kapan?", 15, W.merah)),
      tambah("kembali?", emo("kq", 150, 178, "❓", 28)),
    ),
    k(
      "Igil memakai cara berikut untuk mencari tahu kapan waktu paling dekat mereka berlatih bersama lagi. Ia menulis kelipatan tiga dan kelipatan empat.",
      bersih(0),
      tambah(0, judul("Cara Igil: tulis kelipatan")),
      tambah("kelipatan", teks("y3", 150, 62, tulisKelipatan(3, 9), 8, W.coklat)),
      tambah("empat.", teks("y4", 150, 92, tulisKelipatan(4, 9), 8, W.hijau)),
    ),
    k(
      "Bilangan yang sama pertama kali adalah dua belas. Artinya, setelah dua belas hari, Malosi dan Igil bertemu lagi di tempat latihan.",
      tambah("dua@2", teks("yb", 150, 130, "yang sama pertama: 12", 13, W.merah)),
      tambah("bertemu", emo("yc", 150, 176, "🤝", 28)),
    ),
    k(
      "Jadi waktu paling dekat bagi Igil dan Malosi untuk berlatih bersama lagi adalah tanggal tiga Agustus ditambah dua belas hari, yaitu tanggal lima belas Agustus.",
      bersih(0),
      tambah(0, judul("Bersama lagi: 15 Agustus")),
      tambah("tanggal", teks("h1", 150, 62, "3 Agustus + 12 hari", 14, W.hitam)),
      tambah("tiga", teks("h2", 150, 92, "3 + 12 = 15", 17, W.biru)),
      tambah("lima", ...kartu("h3", 60, 112, 180, 44, W.hijauMuda, ["15 Agustus", "berlatih bersama lagi"], 10.4)),
    ),
    k(
      "Sebelum lanjut, ingat manfaat belajar KPK: menyelesaikan masalah jadwal. Lalu kerjakan bersama kelompokmu, dengan kalender Agustus dan September di tangan.",
      bersih(0),
      tambah(0, judul("Sebelum lanjut")),
      tambah("manfaat", ...kartu("g1", 24, 40, 252, 34, W.krem, ["ingat manfaat belajar KPK"], 9.4)),
      tambah("kelompok", ...kartu("g2", 24, 84, 252, 34, W.langit, ["kerja bersama kelompok"], 9.4)),
      tambah("kalender", ...kartu("g3", 24, 128, 252, 40, W.hijauMuda, ["kalender Agustus dan September", "satu set tiap kelompok"], 9.4)),
    ),
  ],
};
