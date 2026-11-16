import type { AdeganStory, Obj } from "./logika-story";
import { BANGUN_AG, E_BARU, F_BARU, G_BARU, W, bangunDiKisi, emo, judul, kartu, kotak, panah, petakUtuhSebagian, poligon, sel, skala, teks } from "./k5b5a-gambar";
import { bersih, k, tambah, ubah } from "./k5b5a-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/** Luas bangun A sampai G menurut kunci Panduan Guru hlm. 195, 197, dan 198. */
export const KUNCI_LUAS: Record<string, number> = { A: 9, B: 12, C: 15, D: 16, E: 9, F: 15, G: 9 };

const bangunKartu = (huruf: string, x: number, y: number, s: number, warna: string): Obj[] => {
  const b = BANGUN_AG[huruf];
  return [kotak(`mk${huruf}`, x, y, 66, 62, W.putih, W.biru, { rx: 6 }), poligon(`mb${huruf}`, x + (66 - b.kol * s) / 2, y + 8, skala(b.p, s), warna, W.merah, { tebal: 1.4 }), teks(`mh${huruf}`, x + 33, y + 55, huruf, 9, W.biru)];
};

/* ------------------------------ 9. Eksplorasi 5.1E: Ayo Berlatih (hlm. 142; Panduan Guru hlm. 195 dan 196) ------------------------------ */
const PETA_A_D: [string, number, number][] = [["A", 14, 40], ["B", 62, 36], ["C", 92, 52], ["D", 156, 46]];

export const ADEGAN_LATIHAN: AdeganStory = {
  id: "latihan-abcd",
  judul: "Latihan: luas bangun pada kertas berpetak",
  sumber: "Materi: latihan kertas berpetak",
  latar: "#EFF6FF",
  kutipan: kutipanLokal("k5b5a-materi-3.ts:1"),
  ketukan: [
    k(
      "Sekarang Latihan satu. Hitunglah luas daerah bangun-bangun datar berikut dengan kertas berpetak. Ada tujuh bangun, dari A sampai G.",
      tambah(0, judul("Latihan 1: kertas berpetak")),
      tambah("Hitunglah", ...(["A", "B", "C", "D"] as const).map((h, i) => bangunKartu(h, 8 + i * 72, 34, 7, [W.jingga, W.hijauMuda, W.langit, W.pink][i])).flat()),
      tambah("kertas", ...(["E", "F", "G"] as const).map((h, i) => bangunKartu(h, 8 + i * 72, 106, 7, [W.krem, W.merahMuda, W.hijauMuda][i])).flat()),
      tambah("tujuh", teks("tj", 252, 138, "7 bangun", 9.4, W.ungu), teks("tj2", 252, 152, "A sampai G", 8.6, W.ungu)),
    ),
    k(
      "Bangun A, B, C, dan D mudah dihitung, karena semua kotak satuannya utuh. Luas A sembilan satuan luas. B dua belas. C lima belas. D enam belas.",
      bersih(0),
      tambah(0, judul("Semua kotak utuh")),
      ...PETA_A_D.map(([h, x, y], i) => tambah(["sembilan", "dua", "lima", "enam"][i], ...bangunDiKisi(`ak${h}`, x, y, BANGUN_AG[h].p, BANGUN_AG[h].kol, BANGUN_AG[h].baris, 10, [W.jingga, W.hijauMuda, W.langit, W.pink][i]), teks(`at${h}`, x + (BANGUN_AG[h].kol * 10) / 2, 122, `${h} = ${KUNCI_LUAS[h]}`, 9.4, W.biru))),
      tambah("utuh.", teks("cat", 150, 160, "tiap kotak utuh = 1 satuan luas", 9.4, W.hijau)),
    ),
    k(
      "Bagaimana dengan bangun E, F, dan G? Sisi-sisinya miring, sehingga ada kotak yang tidak utuh. Di sini kita tidak bisa langsung menghitung kotak penuh saja.",
      bersih(0),
      tambah(0, judul("Ada kotak tidak utuh")),
      ...(["E", "F", "G"] as const).map((h, i) => tambah([3, 4, 6][i], ...bangunDiKisi(`ek${h}`, 14 + i * 92, 50, BANGUN_AG[h].p, 6, 3, 14, W.putih), teks(`et${h}`, 14 + i * 92 + 42, 108, h, 10, W.biru))),
      tambah("Sisi-sisinya", ...(["E", "F", "G"] as const).flatMap((h, i) => petakUtuhSebagian(BANGUN_AG[h].p, 6, 3).sebagian.map(([c, r]) => sel(`es${h}-${r}-${c}`, 14 + i * 92 + c * 14, 50 + r * 14, 14, W.jingga, { op: 0.55 })))),
      tambah("tidak", ...kartu("ca", 50, 130, 200, 30, W.krem, ["jingga = kotak tidak utuh"], 9)),
    ),
    k(
      "Siapkan duplikat bangun E, F, dan G beserta petak-petaknya. Duplikat itu kita potong-potong sendiri, sambil mencari cara menghitungnya.",
      bersih(0),
      tambah(0, judul("Duplikat untuk dipotong")),
      tambah("duplikat", ...(["E", "F", "G"] as const).map((h, i) => bangunDiKisi(`dk${h}`, 14 + i * 92, 44, BANGUN_AG[h].p, 6, 3, 14, [W.krem, W.merahMuda, W.hijauMuda][i])).flat()),
      tambah("potong-potong", emo("gt", 150, 130, "✂", 30), emo("lm", 90, 130, "📄", 28), emo("lm2", 210, 130, "🧴", 28)),
      tambah("mencari", teks("mc", 150, 176, "cari cara menghitung luasnya", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Cara Kira (hlm. 143; Panduan Guru hlm. 196 sampai 198) ------------------------------ */
const EX = 14;
const EY = 56;
const S = 16;

export const ADEGAN_YOHANA: AdeganStory = {
  id: "cara-yohana",
  judul: "Cara Kira: potong dan tempel",
  sumber: "Materi: cara Kira",
  latar: "#FDF4FF",
  kutipan: kutipanLokal("k5b5a-materi-3.ts:2"),
  ketukan: [
    k(
      "Kira punya ide. Perhatikan kotak yang tidak utuh pada bangun E. Potong satu bagian yang tidak utuh, tempelkan ke bagian lain, sehingga menjadi kotak yang utuh.",
      tambah(0, judul("Ide Kira: bangun E")),
      tambah("perhatikan", ...bangunDiKisi("e1", EX, EY, BANGUN_AG.E.p, 6, 3, S, W.krem), teks("e1t", EX + 48, EY + 62, "bangun E", 9, W.biru)),
      tambah("tidak", ...petakUtuhSebagian(BANGUN_AG.E.p, 6, 3).sebagian.map(([c, r]) => sel(`ep-${r}-${c}`, EX + c * S, EY + r * S, S, W.jingga, { op: 0.55 }))),
      tambah("Potong", emo("gt", 120, 52, "✂", 20)),
      tambah("tempelkan", panah("ar", 114, EY + 24, 20, 0, W.biru, 2.4, { gambar: true })),
      tambah("menjadi", ...bangunDiKisi("e2", 142, EY, E_BARU, 6, 3, S, W.hijauMuda), teks("e2t", 190, EY + 62, "setelah diubah", 9, W.hijau)),
    ),
    k(
      "Sekarang kita bisa menghitung luas bangun E, yaitu sembilan satuan luas. Satu baris, tiga baris, lalu lima kotak, jadi sembilan.",
      bersih(0),
      tambah(0, judul("Luas bangun E")),
      tambah("Sekarang", ...bangunDiKisi("e2", 100, 40, E_BARU, 6, 3, 18, W.hijauMuda)),
      tambah("baris,", teks("r1", 78, 55, "1", 10, W.biru)),
      tambah("tiga", teks("r2", 78, 73, "3", 10, W.biru)),
      tambah("lima", teks("r3", 78, 91, "5", 10, W.biru)),
      tambah("sembilan@2", ...kartu("hs", 70, 118, 160, 34, W.krem, ["1 + 3 + 5 = 9"], 11)),
      tambah("jadi", teks("l9", 150, 176, "luas E = 9 satuan luas", 10, W.hijau)),
    ),
    k(
      "Bentuk bangun E tampak berubah. Namun, apakah luasnya berubah? Tidak. Bagian yang dipindah tidak hilang, hanya pindah tempat. Luasnya tetap sembilan satuan luas.",
      bersih(0),
      tambah(0, judul("Bentuk berubah, luas tetap")),
      tambah("tampak", ...bangunDiKisi("eo", 20, 54, BANGUN_AG.E.p, 6, 3, 14, W.krem), teks("eot", 62, 112, "luas 9", 9.4, W.biru)),
      tambah("luasnya@1", teks("tn", 150, 76, "?", 24, W.merah)),
      tambah("Tidak.", ...bangunDiKisi("eb", 190, 54, E_BARU, 6, 3, 14, W.hijauMuda), teks("ebt", 232, 112, "luas 9", 9.4, W.biru)),
      ubah("Tidak.", { id: "tn", isi: "=", warna: W.hijau }),
      tambah("hilang,", ...kartu("hl", 50, 130, 200, 28, W.pink, ["tidak ada bagian yang hilang"], 9)),
      tambah("tetap", teks("tp", 150, 184, "luas tetap 9 satuan luas", 10, W.hijau)),
    ),
    k(
      "Cara Kira juga bisa untuk bangun F. Potong bagian yang menonjol di sisi kanan, lalu tempelkan di sisi kiri. Jadinya lima kotak dan tiga baris, luasnya lima belas satuan luas.",
      bersih(0),
      tambah(0, judul("Cara Kira pada bangun F")),
      tambah("bangun", ...bangunDiKisi("f1", 14, 50, BANGUN_AG.F.p, 6, 3, 16, W.merahMuda), teks("f1t", 62, 112, "bangun F", 9, W.biru)),
      tambah("Potong", poligon("fp", 14 + 5 * 16, 50, skala([[0, 0], [1, 0], [0, 3]], 16), W.pink, W.merah)),
      tambah("tempelkan", panah("far", 110, 74, -86, 0, W.biru, 2.4, { gambar: true }), poligon("fq", 14, 50, skala([[0, 0], [1, 0], [0, 3]], 16), W.pink, W.merah, { putus: true })),
      tambah("Jadinya", ...bangunDiKisi("f2", 170, 50, F_BARU, 5, 3, 16, W.hijauMuda), teks("f2t", 210, 112, "5 kotak × 3 baris", 8.8, W.hijau)),
      tambah("lima@2", ...kartu("fl", 60, 136, 180, 28, W.krem, ["luas F = 15 satuan luas"], 10)),
    ),
    k(
      "Untuk bangun G, setelah diubah lebih mudah dihitung: delapan persegi utuh dan dua persegi setengahan. Kedua setengahan itu sama besar. Jadi delapan ditambah satu per dua ditambah satu per dua, hasilnya sembilan.",
      bersih(0),
      tambah(0, judul("Cara Kira pada bangun G")),
      tambah("Untuk", ...bangunDiKisi("g1", 14, 46, BANGUN_AG.G.p, 6, 3, 14, W.hijauMuda), teks("g1t", 56, 104, "bangun G", 9, W.biru)),
      tambah("diubah", panah("gar", 108, 66, 22, 0, W.biru, 2.4, { gambar: true }), ...bangunDiKisi("g2", 138, 46, G_BARU, 4, 3, 14, W.langit)),
      tambah("delapan", teks("g8", 166, 104, "8 utuh", 9, W.hijau)),
      tambah("setengahan.", teks("gh", 232, 104, "2 setengahan", 8.8, W.merah)),
      tambah("ditambah", ...kartu("gj", 40, 124, 220, 30, W.krem, ["8 + 1/2 + 1/2 = 9"], 11)),
      tambah("hasilnya", teks("g9", 150, 180, "luas G = 9 satuan luas", 10, W.hijau)),
    ),
    k(
      "Jadi, cara Kira memperkirakan luas bangun yang sisinya tidak tepat melalui kotak satuan utuh. Bagian yang dihilangkan menggantikan bagian yang kurang utuh, sehingga luasnya tidak berubah.",
      bersih(0),
      tambah(0, judul("Kesimpulan cara Kira")),
      tambah("Jadi,", ...kartu("ks", 20, 40, 260, 56, W.krem, ["cara Kira: pindahkan bagian,", "luas daerah tidak berubah"], 9.6)),
      tambah("dihilangkan", ...bangunDiKisi("kz", 60, 112, BANGUN_AG.E.p, 6, 3, 10, W.jingga), panah("kza", 126, 128, 20, 0, W.biru, 2.2, { gambar: true })),
      tambah("menggantikan", ...bangunDiKisi("kw", 154, 112, E_BARU, 6, 3, 10, W.hijauMuda)),
      tambah("luasnya", teks("kt", 150, 176, "9 = 9", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 11. Miskonsepsi, diferensiasi, dan Refleksi 1 sampai 5 (Panduan Guru hlm. 199 dan 200; Buku Siswa hlm. 161) ------------------------------ */
const refleksi = (i: number, y: number, a: string, b: string, warna: string): Obj[] => kartu(`rf${i}`, 12, y, 276, 30, warna, [a, b], 8);

export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "miskonsepsi-refleksi",
  judul: "Hati-hati, Tantangan, dan Renungan",
  sumber: "Materi: pesan guru subbab ini",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b5a-materi-3.ts:3"),
  ketukan: [
    k(
      "Hati-hati, ada kesalahan yang sering terjadi. Sebagian anak mengira bentuk awal dan bentuk hasil perubahan luasnya berbeda. Padahal bagian yang dipindah tidak hilang.",
      tambah(0, judul("Hati-hati 1")),
      tambah("awal", ...bangunDiKisi("m1", 20, 56, BANGUN_AG.E.p, 6, 3, 14, W.krem), teks("m1t", 62, 112, "bentuk awal", 9, W.biru)),
      tambah("hasil", ...bangunDiKisi("m2", 190, 56, E_BARU, 6, 3, 14, W.hijauMuda), teks("m2t", 232, 112, "bentuk baru", 9, W.biru), teks("mq", 150, 96, "luas sama?", 10, W.merah)),
      tambah("dipindah", panah("ma", 108, 70, 70, 0, W.biru, 2.4, { gambar: true })),
      tambah("hilang.", ...kartu("mj", 40, 136, 220, 30, W.pink, ["bagian yang dipindah tidak hilang"], 9)),
    ),
    k(
      "Hati-hati juga, petak yang hanya setengah tidak langsung bisa diganti bagian lain karena bentuknya berbeda. Kamu mungkin mengira luasnya berbeda, padahal sama. Ingatlah materi pecahan.",
      bersih(0),
      tambah(0, judul("Hati-hati 2")),
      tambah("setengah", poligon("h1", 40, 50, [[0, 0], [40, 0], [0, 40]], W.jingga), poligon("h2", 100, 50, [[0, 0], [40, 40], [0, 40]], W.langit)),
      tambah("berbeda.", teks("hb", 90, 108, "bentuk berbeda", 9, W.merah)),
      tambah("sama.", teks("hs", 200, 80, "1/2 + 1/2 = 1", 11, W.hijau), sel("h3", 232, 100, 40, W.hijauMuda)),
      tambah("pecahan.", ...kartu("hp", 30, 136, 240, 30, W.krem, ["ingat pecahan: dua setengah = satu"], 9)),
    ),
    k(
      "Ini tantangan untukmu. Kegiatan ini melatih berpikir tingkat tinggi. Kalau belum siap mengubah bentuk, mulailah dari bangun sederhana pada satu petak, lalu empat petak, lalu enam belas petak.",
      bersih(0),
      tambah(0, judul("Tantangan")),
      tambah("satu", ...bangunDiKisi("d1", 30, 60, [[0, 0], [1, 0], [0, 1]], 1, 1, 40, W.jingga), teks("d1t", 50, 116, "1 petak", 9, W.biru)),
      tambah("empat", ...bangunDiKisi("d2", 110, 50, [[0, 0], [2, 0], [0, 2]], 2, 2, 40, W.langit), teks("d2t", 150, 146, "4 petak", 9, W.biru)),
      tambah("enam", ...bangunDiKisi("d3", 214, 40, [[0, 0], [4, 0], [0, 4]], 4, 4, 18, W.hijauMuda), teks("d3t", 250, 126, "16 petak", 9, W.biru)),
    ),
    k(
      "Terakhir, renungkan dirimu sendiri. Apakah kamu tahu kapan harus memakai hitungan luas? Apakah kamu bisa menjelaskan pengertian luas daerah? Apakah kamu bisa menghitung luas lantai lewat pengubinan?",
      bersih(0),
      tambah(0, judul("Renungan")),
      tambah("tahu", refleksi(1, 30, "Apakah aku tahu saat harus menggunakan", "hitungan luas daerah bangun datar?", W.hijauMuda)),
      tambah("menjelaskan", refleksi(2, 62, "Apakah aku bisa menjelaskan pengertian", "luas daerah bangun datar?", W.langit)),
      tambah("menghitung", refleksi(3, 94, "Apakah aku bisa menghitung luas lantai", "pada denah rumah lewat pengubinan?", W.krem)),
    ),
    k(
      "Apakah kamu bisa membuat persegi satuan? Dan apakah kamu bisa menghitung luas dengan petak satuan? Jawablah dengan jujur dalam hati.",
      tambah("membuat", refleksi(4, 126, "Apakah aku bisa membuat", "persegi-persegi satuan?", W.pink)),
      tambah("menghitung", refleksi(5, 158, "Apakah aku bisa menghitung luas dengan", "petak-petak satuan?", W.jingga)),
      tambah("jujur", emo("ct4", 270, 141, "💭", 16), emo("ct5", 270, 173, "💭", 16)),
    ),
    k(
      "Ringkasnya, luas adalah ukuran besar kecilnya daerah, diukur dengan petak satuan, dan bentuk boleh diubah asalkan tidak ada bagian yang hilang.",
      bersih(0),
      tambah(0, judul("Ringkasan subbab A")),
      tambah("ukuran", ...kartu("rg1", 14, 36, 272, 34, W.krem, ["luas = ukuran besar kecil daerah"], 9.2)),
      tambah("petak", ...kartu("rg2", 14, 78, 272, 34, W.langit, ["diukur dengan petak satuan (cm², m²)"], 9.2)),
      tambah("diubah", ...kartu("rg3", 14, 120, 272, 34, W.hijauMuda, ["bentuk boleh diubah, luas tetap"], 9.2)),
      tambah("hilang.", emo("nx", 150, 184, "✅", 22)),
    ),
  ],
};

