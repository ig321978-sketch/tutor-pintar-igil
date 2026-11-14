import type { AdeganStory, Obj } from "./logika-story";
import { W, bangunC, emo, judul, kartu, kotak, labelSisi, panah, tabel, teks } from "./k5b4c-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b4c-bantu";

/** Satu ruas per sisi pada garis lurus: kotak lebar sisi kali skala, id `${id}-${i}`, dengan angka panjangnya di tengah. */
export function ruas(id: string, x: number, y: number, sisi: number[], s: number, h = 16, warna: string[] = [W.merahMuda, W.hijauMuda, W.merahMuda, W.hijauMuda]): Obj[] {
  const out: Obj[] = [];
  let px = x;
  sisi.forEach((n, i) => {
    out.push(kotak(`${id}-${i}`, px, y, n * s, h, warna[i % warna.length], W.biru, { rx: 1, tebal: 1.2 }));
    out.push(teks(`${id}-t${i}`, px + (n * s) / 2, y + h / 2 + 3, String(n), 9, W.biru));
    px += n * s;
  });
  return out;
}

/* ------------------------------ 6. Not Area Product: konsep ------------------------------ */
export const ADEGAN_LUAR_NAP: AdeganStory = {
  id: "luar-nap",
  judul: "Not Area Product: keliling bukan panjang kali lebar",
  sumber: "Metode luar: Not Area Product",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Metode ketiga, Not Area Product, artinya bukan hasil kali panjang dan lebar. Ini pencegah salah paham yang sangat umum: mengalikan panjang dengan lebar untuk mencari keliling.",
      tambah(0, judul("Not Area Product")),
      tambah("bukan", teks("n1", 150, 80, "p × l", 30, W.merah), emo("n2", 150, 128, "❌", 34)),
      tambah("mencari", teks("n3", 150, 170, "bukan rumus keliling!", 11, W.merah)),
    ),
    k(
      "Perkalian panjang dan lebar mengukur isi di dalam bangun, bukan jalur di tepinya. Keliling berbicara tentang tepi, jadi satuannya sentimeter, bukan sentimeter persegi.",
      bersih(0),
      tambah(0, judul("Isi atau tepi?")),
      tambah("isi", bangunC("i1", 24, 50, "pp", 16, W.emas), teks("i2", 64, 118, "isi: p × l", 10, W.coklat), teks("i3", 64, 134, "cm²", 11, W.coklat)),
      tambah("tepi,", bangunC("t1", 170, 50, "pp", 16, "none", W.merah, { tebal: 4.4 }), teks("t2", 210, 118, "tepi: keliling", 10, W.merah), teks("t3", 210, 134, "cm", 11, W.merah)),
      tambah("satuannya", teks("t4", 150, 172, "keliling memakai cm, bukan cm²", 10, W.ungu)),
    ),
    k(
      "Cara menghindarinya: tanyakan dulu, soal ini tentang tepi atau isi? Kata tepi: pagar, bingkai, tali, mengelilingi. Kalau tepi, jumlahkan sisi-sisinya.",
      bersih(0),
      tambah(0, judul("Tanya dulu: tepi atau isi?")),
      tambah("pagar,", ...kartu("w1", 14, 38, 64, 28, W.hijauMuda, ["pagar"], 9)),
      tambah("bingkai,", ...kartu("w2", 84, 38, 64, 28, W.hijauMuda, ["bingkai"], 9)),
      tambah("tali,", ...kartu("w3", 154, 38, 64, 28, W.hijauMuda, ["tali"], 9)),
      tambah("mengelilingi.", ...kartu("w4", 224, 38, 64, 28, W.hijauMuda, ["mengelilingi"], 7.6)),
      tambah("jumlahkan", ...kartu("w5", 30, 100, 240, 40, W.krem, ["tepi → jumlahkan sisi-sisinya"], 10)),
    ),
    k(
      "Kelebihannya, mencegah salah paham sejak awal. Kekurangannya, kamu harus paham beda tepi dan isi dulu sebelum bisa memakainya.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 36, 130, 56, W.hijauMuda, ["cegah salah", "paham sejak awal"], 9.6), emo("kle", 79, 118, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 56, W.merahMuda, ["perlu paham beda", "tepi dan isi"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Not Area Product: penerapan ------------------------------ */
export const ADEGAN_LUAR_NAP_TERAPAN: AdeganStory = {
  id: "luar-nap-terapan",
  judul: "Not Area Product: membandingkan jawaban keliru dan benar",
  sumber: "Metode luar: Not Area Product; angka Buku Siswa hlm. 118–120",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Persegi panjang lima kali tiga. Jawaban keliru: lima kali tiga sama dengan lima belas. Jawaban benar: dua kali lima ditambah tiga, yaitu enam belas sentimeter. Lima belas dan enam belas berbeda.",
      tambah(0, judul("Persegi panjang 5 dan 3")),
      tambah("Persegi", bangunC("a", 22, 52, "pp", 12, W.langit), ...labelSisi("a", 22, 52, "pp", 12, ["5 cm", "3 cm", null, null], 8.6)),
      tambah("keliru:", teks("a1", 214, 70, "5 × 3 = 15", 14, W.merah), emo("a2", 274, 66, "❌", 16)),
      tambah("benar:", teks("a3", 214, 110, "2 × (5 + 3) = 16", 13, W.hijau)),
      tambah("berbeda.", teks("a4", 214, 140, "15 ≠ 16", 14, W.ungu)),
    ),
    k(
      "Persegi sisi tiga. Keliru: tiga kali tiga sama dengan sembilan. Benar: empat kali tiga sama dengan dua belas. Selisihnya tiga, cukup untuk membuat jawaban salah.",
      bersih(0),
      tambah(0, judul("Persegi sisi 3 cm")),
      tambah("Persegi", bangunC("b", 30, 54, "ps", 22, W.hijauMuda), ...labelSisi("b", 30, 54, "ps", 22, ["3 cm", null, null, null], 9)),
      tambah("Keliru:", teks("b1", 214, 76, "3 × 3 = 9", 14, W.merah), emo("b2", 268, 72, "❌", 16)),
      tambah("Benar:", teks("b3", 214, 112, "4 × 3 = 12", 14, W.hijau), emo("b4", 268, 108, "✅", 16)),
      tambah("Selisihnya", teks("b5", 214, 146, "selisih 3 cm", 10, W.ungu)),
    ),
    k(
      "Perhatikan satuannya. Keliling selalu bersatuan sentimeter. Kalau jawabanmu sentimeter persegi, kamu menghitung isi, bukan keliling.",
      bersih(0),
      tambah(0, judul("Periksa satuan")),
      tambah("Keliling", ...kartu("u1", 20, 40, 120, 46, W.hijauMuda, ["keliling", "cm"], 11), emo("u1e", 80, 110, "✅", 22)),
      tambah("persegi", ...kartu("u2", 160, 40, 120, 46, W.merahMuda, ["isi (bukan keliling)", "cm²"], 9.6), emo("u2e", 220, 110, "❌", 22)),
      tambah("isi,", teks("u3", 150, 160, "satuan cm² berarti salah rumus", 10.4, W.merah)),
    ),
    k(
      "Jadi sebelum menulis rumus, pastikan dulu bangun apa, ada sisi yang sama atau tidak, dan yang dicari tepi, bukan isi.",
      bersih(0),
      tambah(0, judul("Tiga pertanyaan sebelum rumus")),
      tambah("bangun", ...kartu("p1", 20, 36, 260, 32, W.langit, ["1. bangun apa ini?"], 10)),
      tambah("sisi", ...kartu("p2", 20, 78, 260, 32, W.hijauMuda, ["2. ada sisi yang sama panjang?"], 10)),
      tambah("tepi,", ...kartu("p3", 20, 120, 260, 32, W.krem, ["3. yang dicari tepi, bukan isi?"], 10)),
      tambah("rumus", emo("p4", 150, 182, "🧐", 22)),
    ),
  ],
};

/* ------------------------------ 8. Straight Line Unrolling: konsep ------------------------------ */
export const ADEGAN_LUAR_SLU: AdeganStory = {
  id: "luar-slu",
  judul: "Straight Line Unrolling: meluruskan keliling",
  sumber: "Metode luar: Straight Line Unrolling",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode keempat, Straight Line Unrolling, artinya meluruskan keliling. Bayangkan tepi bangun adalah seutas tali. Lepaskan, lalu rentangkan lurus. Panjang tali itu adalah keliling.",
      tambah(0, judul("Straight Line Unrolling")),
      tambah("tepi", bangunC("sl", 20, 50, "pp", 10, W.langit, W.merah, { tebal: 3 })),
      tambah("Lepaskan,", panah("sa", 80, 82, 26, 0, W.biru, 2.4, { gambar: true })),
      tambah("rentangkan", ...ruas("sr", 112, 76, [5, 3, 5, 3], 10, 16)),
      tambah("keliling.", teks("st", 150, 128, "panjang tali = keliling", 11, W.hijau)),
    ),
    k(
      "Metode ini cocok untuk semua segi empat, termasuk yang sisinya tidak sama, karena tidak butuh rumus. Cukup letakkan panjang tiap sisi berurutan pada satu garis.",
      bersih(0),
      tambah(0, judul("Tanpa rumus, semua segi empat")),
      tambah("cocok", bangunC("t1", 20, 44, "ll", 8, W.pink), bangunC("t2", 80, 52, "tr", 8, W.langit), bangunC("t3", 130, 48, "ss", 8, W.krem)),
      tambah("tidak@2", teks("t4", 150, 118, "sisi tidak sama? tidak masalah", 10, W.ungu)),
      tambah("berurutan", ...ruas("tr", 60, 140, [5, 4, 2, 3], 11, 16, [W.merahMuda, W.hijauMuda, W.langit, W.krem])),
    ),
    k(
      "Langkahnya: pertama ukur tiap sisi. Kedua, gambar ruas lurus sesuai urutan. Ketiga, panjang seluruh ruas adalah keliling.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("pertama", ...kartu("l1", 20, 36, 260, 32, W.hijauMuda, ["1. ukur tiap sisi"], 10)),
      tambah("Kedua,", ...kartu("l2", 20, 78, 260, 32, W.langit, ["2. gambar ruas lurus berurutan"], 10)),
      tambah("Ketiga,", ...kartu("l3", 20, 120, 260, 32, W.krem, ["3. panjang seluruh ruas = keliling"], 10)),
      tambah("ruas", emo("l4", 150, 180, "📏", 22)),
    ),
    k(
      "Kelebihannya, kamu melihat langsung jumlahnya, jadi mudah dicek. Kekurangannya, menggambarnya memakan tempat kalau sisinya panjang.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 36, 130, 56, W.hijauMuda, ["terlihat jelas,", "mudah dicek"], 9.6), emo("kle", 79, 118, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 56, W.merahMuda, ["memakan tempat", "bila sisi panjang"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Straight Line Unrolling: penerapan ------------------------------ */
const NAMA_BARIS = ["persegi panjang: 5, 3, 5, 3", "layang-layang: 2, 4, 4, 2", "trapesium: 2, 5, 3, 4", "segi empat sembarang: 5, 4, 2, 3"];
const BARIS_RUAS: number[][] = [[5, 3, 5, 3], [2, 4, 4, 2], [2, 5, 3, 4], [5, 4, 2, 3]];
const Y_BARIS = [40, 78, 116, 154];
const barisSlu = (r: number): Obj[] => [teks(`nb${r}`, 40, Y_BARIS[r] - 3, NAMA_BARIS[r], 8.4, W.biru, { anchor: "start" }), ...ruas(`sg${r}`, 40, Y_BARIS[r], BARIS_RUAS[r], 11, 16), teks(`tot${r}`, 40 + BARIS_RUAS[r].reduce((t, n) => t + n, 0) * 11 + 8, Y_BARIS[r] + 12, `${BARIS_RUAS[r].reduce((t, n) => t + n, 0)} cm`, 11, W.merah, { anchor: "start" })];

export const ADEGAN_LUAR_SLU_TERAPAN: AdeganStory = {
  id: "luar-slu-terapan",
  judul: "Straight Line Unrolling pada empat segi empat",
  sumber: "Metode luar: Straight Line Unrolling; angka Buku Siswa hlm. 118–121",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Persegi panjang: sisinya lima, tiga, lima, dan tiga sentimeter. Letakkan berurutan, panjang seluruhnya enam belas sentimeter.",
      tambah(0, judul("Luruskan tepinya")),
      tambah("Persegi", ...barisSlu(0)),
    ),
    k(
      "Layang-layang: sisinya dua, empat, empat, dan dua sentimeter. Panjang lurusnya dua belas sentimeter, bukan enam belas.",
      tambah("Layang-layang:", ...barisSlu(1)),
    ),
    k(
      "Trapesium: sisinya dua, lima, tiga, dan empat sentimeter. Panjang lurusnya empat belas sentimeter.",
      tambah("Trapesium:", ...barisSlu(2)),
    ),
    k(
      "Segi empat sembarang: sisinya lima, empat, dua, dan tiga sentimeter. Panjang lurusnya juga empat belas sentimeter.",
      tambah("Segi", ...barisSlu(3)),
    ),
    k(
      "Perhatikan: trapesium dan segi empat sembarang sama-sama empat belas, padahal bentuk dan sisinya berbeda. Dua bangun berbeda boleh memiliki keliling sama.",
      sorotkan("Perhatikan:", "sg2-0", "sg2-1", "sg2-2", "sg2-3", "sg3-0", "sg3-1", "sg3-2", "sg3-3"),
      tambah("sama-sama", teks("sm", 150, 190, "sama-sama 14 cm, bentuk berbeda", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
const KUNCI_TABEL = [
  ["Bangun", "Keliling"],
  ["persegi panjang", "16 cm"],
  ["jajargenjang", "16 cm"],
  ["layang-layang", "12 cm"],
  ["persegi", "12 cm"],
  ["belah ketupat", "12 cm"],
  ["trapesium", "14 cm"],
  ["segi empat sembarang", "14 cm"],
];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dan kunci keliling",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 118–121",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasan empat metode. Rectangle Formula untuk dua pasang sisi sama. Square Shortcut untuk empat sisi sama. Not Area Product untuk mencegah salah paham. Straight Line Unrolling untuk bangun apa saja.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Rectangle", ...kartu("r1", 12, 34, 276, 30, W.hijauMuda, ["Rectangle Formula: 2 pasang sisi sama"], 8.8)),
      tambah("Square", ...kartu("r2", 12, 72, 276, 30, W.langit, ["Square Shortcut: 4 sisi sama"], 8.8)),
      tambah("Not", ...kartu("r3", 12, 110, 276, 30, W.krem, ["Not Area Product: cegah salah paham"], 8.8)),
      tambah("Straight", ...kartu("r4", 12, 148, 276, 30, W.pink, ["Straight Line Unrolling: bangun apa saja"], 8.8)),
    ),
    k(
      "Kunci hasil dari buku: persegi panjang enam belas, jajargenjang enam belas, layang-layang dua belas, persegi dua belas, belah ketupat dua belas, trapesium empat belas, segi empat sembarang empat belas.",
      bersih(0),
      tambah(0, judul("Kunci keliling (cm)")),
      tambah("Kunci", ...tabel("kn", 40, 30, [150, 70], KUNCI_TABEL.slice(0, 1), 17, 8.6)),
      tambah("persegi", ...tabel("kn", 40, 30, [150, 70], KUNCI_TABEL, 17, 8.6).filter((o) => Number(o.id.charAt(4)) >= 1 && Number(o.id.charAt(4)) <= 3)),
      tambah("persegi@2", ...tabel("kn", 40, 30, [150, 70], KUNCI_TABEL, 17, 8.6).filter((o) => Number(o.id.charAt(4)) >= 4 && Number(o.id.charAt(4)) <= 5)),
      tambah("trapesium", ...tabel("kn", 40, 30, [150, 70], KUNCI_TABEL, 17, 8.6).filter((o) => Number(o.id.charAt(4)) >= 6)),
    ),
    k(
      "Satu tanda penting: layang-layang dengan sisi dua dan empat harus dua belas. Angka enam belas dan empat belas di panduan guru untuk layang-layang adalah salah hitung.",
      bersih(0),
      tambah(0, judul("Awas: layang-layang")),
      tambah("layang-layang", bangunC("ll", 30, 36, "ll", 17, W.pink), ...labelSisi("ll", 30, 36, "ll", 17, ["2", "4", "4", "2"], 9)),
      tambah("harus", teks("l1", 214, 80, "2 + 2 + 4 + 4 = 12", 11, W.hijau)),
      tambah("Angka", teks("l2", 214, 116, "Panduan Guru:", 9, W.merah), teks("l3", 214, 130, "16 dan 14 (salah)", 10, W.merah), emo("l4", 214, 160, "❌", 22)),
    ),
    k(
      "Apa pun metodenya, hasilnya harus sama dan satuannya sentimeter. Itu tandamu menghitung dengan benar. Sampai jumpa di video berikutnya.",
      bersih(0),
      tambah(0, judul("Sampai jumpa")),
      tambah("hasilnya", emo("z1", 150, 90, "🤝", 44)),
      tambah("sentimeter.", teks("z2", 150, 140, "hasil sama, satuan cm", 12, W.hijau)),
      tambah("tandamu", emo("z3", 150, 178, "🎉", 26)),
    ),
  ],
};
