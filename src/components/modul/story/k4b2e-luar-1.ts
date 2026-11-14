import type { AdeganStory } from "./logika-story";
import { W, daftar, emo, judul, kartu, kisi100, kisiPersen, rantai, teks } from "./k4b2e-gambar";
import { bersih, k, tambah } from "./k4b2e-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk persen",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana belajar persen dengan baik? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka-angka persen yang sama.",
      bersih(0),
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 30, 128, 240, 34, W.krem, ["persen: empat cara belajar"], 9.6)),
    ),
    k(
      "Empat metode itu: Percent as Hundredths, Hundred Grid Percent, Decimal–Percent Link, dan Scale to One Hundred.",
      ...daftar("pm", "Empat metode", [
        { at: "Hundredths,", t: "1. Percent as Hundredths", w: W.hijauMuda, u: 9.6 },
        { at: "Percent@2", t: "2. Hundred Grid Percent", w: W.langit, u: 9.6 },
        { at: "Link,", t: "3. Decimal–Percent Link", w: W.krem, u: 9.6 },
        { at: "Hundred@3", t: "4. Scale to One Hundred", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Masing-masing menjawab satu pertanyaan: apa arti persen, berapa kotak yang diarsir, ke mana tanda koma bergeser, dan pengali berapa yang membuat penyebutnya seratus?",
      ...daftar("pq", "Empat pertanyaan", [
        { at: "arti", t: "apa arti persen?", w: W.hijauMuda, u: 9.6 },
        { at: "kotak", t: "berapa kotak yang diarsir?", w: W.langit, u: 9.6 },
        { at: "koma", t: "ke mana tanda koma bergeser?", w: W.krem, u: 9.6 },
        { at: "pengali", t: "pengali berapa menjadi penyebut 100?", w: W.pink, u: 9.2 },
      ]),
    ),
  ],
};

/* ------------------------------ 2. Percent as Hundredths: konsep ------------------------------ */
export const ADEGAN_LUAR_PH: AdeganStory = {
  id: "luar-ph",
  judul: "Percent as Hundredths (Persen sebagai Perseratusan)",
  sumber: "Metode luar: Percent as Hundredths",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Percent as Hundredths atau Persen sebagai Perseratusan. Persen berarti per seratus: setiap persen adalah pecahan dengan penyebut seratus. Lima persen artinya lima per seratus.",
      bersih(0),
      tambah(0, judul("Percent as Hundredths")),
      tambah("Perseratusan.", ...kartu("ph1", 50, 30, 200, 28, W.krem, ["Persen sebagai Perseratusan"], 9.4)),
      tambah("Persen@2", ...kartu("ph2", 30, 76, 240, 30, W.hijauMuda, ["persen = per seratus"], 11)),
      tambah("Lima", teks("ph3", 150, 150, "5% = 5/100", 24, W.hijau)),
    ),
    k(
      "Cara membacanya: angka di depan tanda persen menjadi pembilang, dan seratus menjadi penyebut. Tiga puluh lima persen dibaca tiga puluh lima per seratus.",
      bersih(0),
      tambah(0, judul("Cara membaca persen")),
      tambah("angka", ...kartu("ph4", 12, 36, 132, 32, W.langit, ["angka = pembilang"], 9.4)),
      tambah("seratus", ...kartu("ph5", 156, 36, 132, 32, W.krem, ["100 = penyebut"], 9.4)),
      tambah("Tiga", teks("ph6", 110, 120, "35%", 24, W.biru)),
      tambah("dibaca", teks("ph7", 150, 120, "=", 22, W.hitam)),
      tambah("seratus@2", teks("ph8", 205, 120, "35/100", 24, W.hijau)),
    ),
    k(
      "Dari pecahan berpenyebut seratus, desimal perseratusannya mudah ditulis: dua angka di belakang koma. Jadi tiga puluh lima persen sama dengan tiga puluh lima per seratus, yaitu nol koma tiga lima.",
      bersih(0),
      tambah(0, judul("Satu bilangan, tiga tulisan")),
      ...[tambah("persen", teks("ph9-r1", 62, 100, "35%", 20, W.hijau)), tambah("pecahan", teks("ph9-r2", 150, 100, "= 35/100", 20, W.biru)), tambah("desimal", teks("ph9-r3", 240, 100, "= 0,35", 20, W.biru))],
      tambah("Jadi", ...kartu("ph10", 40, 140, 220, 30, W.pink, ["tiga tulisan, satu nilai"], 10.4)),
    ),
  ],
};

/* ------------------------------ 3. Percent as Hundredths: penerapan ------------------------------ */
type Kasus = { id: string; judul: string; r: [string, string, string]; suara: string; at: [string, string, string]; cat: string; catAt: string };
function ketukanRantai(c: Kasus, y = 100) {
  const [a, b, d] = rantai(c.id, y, c.r, 18);
  return k(c.suara, bersih(0), tambah(0, judul(c.judul)), tambah(c.at[0], a), tambah(c.at[1], b), tambah(c.at[2], d), tambah(c.catAt, ...kartu(`${c.id}c`, 20, 142, 260, 30, W.krem, [c.cat], 9.6)));
}
export const ADEGAN_LUAR_PH_TERAPAN: AdeganStory = {
  id: "luar-ph-terapan",
  judul: "Percent as Hundredths diterapkan pada soal persen",
  sumber: "Metode luar: Percent as Hundredths",
  latar: "#F0FDF4",
  ketukan: [
    ketukanRantai({
      id: "pa",
      judul: "Contoh 0,35",
      r: ["0,35", "= 35/100", "= 35%"],
      suara: "Nol koma tiga lima. Pecahannya tiga puluh lima per seratus. Jadi tiga puluh lima persen.",
      at: ["Nol", "Pecahannya", "Jadi"],
      cat: "angka di depan % = pembilang",
      catAt: "persen.",
    }),
    ketukanRantai({
      id: "pb",
      judul: "Contoh 2,46",
      r: ["2,46", "= 246/100", "= 246%"],
      suara: "Dua koma empat enam. Pecahannya dua ratus empat puluh enam per seratus. Jadi dua ratus empat puluh enam persen. Penyebutnya tetap seratus, hanya pembilangnya lebih dari seratus.",
      at: ["Dua", "Pecahannya", "Jadi"],
      cat: "penyebut tetap 100, pembilang 246",
      catAt: "Penyebutnya",
    }),
    ketukanRantai({
      id: "pc",
      judul: "Dari persen: 18%",
      r: ["18%", "= 18/100", "= 0,18"],
      suara: "Dari persen ke desimal. Delapan belas persen berarti delapan belas per seratus, yaitu nol koma satu delapan.",
      at: ["Delapan", "berarti", "yaitu"],
      cat: "per seratus: dua angka di belakang koma",
      catAt: "delapan@3",
    }),
    ketukanRantai({
      id: "pd",
      judul: "Dari persen: 123%",
      r: ["123%", "= 123/100", "= 1,23"],
      suara: "Seratus dua puluh tiga persen berarti seratus dua puluh tiga per seratus, yaitu satu koma dua tiga. Lebih dari seratus persen berarti lebih dari satu utuh.",
      at: ["Seratus", "berarti", "yaitu"],
      cat: "lebih dari 100% = lebih dari 1 utuh",
      catAt: "Lebih",
    }),
  ],
};

/* ------------------------------ 4. Hundred Grid Percent: konsep ------------------------------ */
export const ADEGAN_LUAR_HG: AdeganStory = {
  id: "luar-hg",
  judul: "Hundred Grid Percent (Kisi Seratus Persen)",
  sumber: "Metode luar: Hundred Grid Percent",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Hundred Grid Percent atau Kisi Seratus Persen. Kisi punya seratus kotak sama besar, sepuluh baris dan sepuluh kolom. Satu kotak yang diarsir sama dengan satu persen.",
      bersih(0),
      tambah(0, judul("Hundred Grid Percent")),
      tambah("Kisi@2", ...kisi100("hg", 20, 34, 12, 0)),
      tambah("Satu", ...kisi100("hg", 20, 34, 12, 1)),
      tambah("seratus@2", ...kartu("hg0", 160, 40, 128, 28, W.langit, ["10 × 10 = 100 kotak"], 9.4)),
      tambah("persen@2", ...kartu("hg1", 160, 84, 128, 36, W.hijauMuda, ["1 kotak = 1%"], 11)),
    ),
    k(
      "Satu baris berisi sepuluh kotak, jadi satu baris sama dengan sepuluh persen. Sepuluh baris penuh sama dengan seratus persen.",
      bersih(0),
      tambah(0, judul("Baris dan kisi penuh")),
      tambah(0, ...kisi100("hg", 20, 34, 12, 10)),
      tambah("baris@2", ...kartu("hg2", 160, 56, 128, 36, W.langit, ["1 baris = 10%"], 11)),
      tambah("Sepuluh@3", ...kartu("hg3", 160, 106, 128, 36, W.krem, ["kisi penuh = 100%"], 10)),
    ),
    k(
      "Bila persennya lebih dari seratus, pakai lebih dari satu kisi. Satu kisi penuh sama dengan seratus persen, kisi berikutnya untuk sisanya.",
      bersih(0),
      tambah(0, judul("Lebih dari satu kisi")),
      tambah(0, ...kisi100("hg", 20, 40, 9, 100)),
      tambah("kisi@3", ...kisi100("hh", 116, 40, 9, 0)),
      tambah("Satu@2", ...kartu("hg4", 12, 140, 276, 28, W.krem, ["kisi 1 penuh = 100%"], 10)),
      tambah("sisanya.", ...kartu("hg5", 12, 172, 276, 24, W.hijauMuda, ["kisi berikutnya: sisa persen"], 9.6)),
    ),
  ],
};

/* ------------------------------ 5. Hundred Grid Percent: penerapan ------------------------------ */
type KasusKisi = { id: string; judul: string; n: number; suara: string; at: string[]; baris: string[] };
function ketukanKisi(c: KasusKisi) {
  return k(
    c.suara,
    bersih(0),
    tambah(0, judul(c.judul)),
    tambah(c.at[0], ...kisi100(c.id, 20, 36, 12, c.n)),
    tambah(c.at[1], ...kartu(`${c.id}a`, 160, 50, 128, 40, W.krem, [c.baris[0]], 9.4)),
    tambah(c.at[2], ...kartu(`${c.id}b`, 160, 104, 128, 40, W.hijauMuda, [c.baris[1]], 11)),
  );
}
export const ADEGAN_LUAR_HG_TERAPAN: AdeganStory = {
  id: "luar-hg-terapan",
  judul: "Hundred Grid Percent diterapkan pada soal persen",
  sumber: "Metode luar: Hundred Grid Percent",
  latar: "#EFF6FF",
  ketukan: [
    ketukanKisi({
      id: "ka",
      judul: "Contoh 0,35",
      n: 35,
      suara: "Nol koma tiga lima berarti tiga puluh lima per seratus. Arsir tiga puluh lima kotak. Hasilnya tiga puluh lima persen.",
      at: ["Arsir", "berarti", "Hasilnya"],
      baris: ["0,35 = 35/100", "35 kotak = 35%"],
    }),
    ketukanKisi({
      id: "kb",
      judul: "Contoh 20 dari 50",
      n: 40,
      suara: "Dua puluh dari lima puluh siswa berolahraga. Satu siswa mewakili dua kotak, jadi arsir empat puluh kotak. Hasilnya empat puluh persen.",
      at: ["arsir", "Satu", "Hasilnya"],
      baris: ["1 siswa = 2 kotak", "40 kotak = 40%"],
    }),
    ketukanKisi({
      id: "kc",
      judul: "Contoh 30 dari 100",
      n: 30,
      suara: "Tiga puluh dari seratus siswa terpilih lomba lari. Seratus siswa sudah pas dengan seratus kotak, jadi arsir tiga puluh kotak, yaitu tiga puluh persen.",
      at: ["arsir", "pas", "yaitu"],
      baris: ["100 siswa = 100 kotak", "30 kotak = 30%"],
    }),
    k(
      "Seratus dua puluh lima persen. Satu kisi penuh sama dengan seratus persen, lalu dua puluh lima kotak di kisi kedua. Jumlahnya seratus dua puluh lima kotak.",
      bersih(0),
      tambah(0, judul("Contoh 125%")),
      tambah("Satu", ...kisiPersen("kd", 14, 40, 9, 125, 12)),
      tambah("lalu", ...kartu("kd-a", 12, 148, 276, 28, W.krem, ["kisi 1: 100%, kisi 2: 25 kotak"], 9.6)),
      tambah("Jumlahnya", ...kartu("kd-b", 12, 182, 276, 18, W.hijauMuda, ["100% + 25% = 125%"], 9.6)),
    ),
  ],
};
