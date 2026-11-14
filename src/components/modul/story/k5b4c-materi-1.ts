import type { AdeganStory, Obj } from "./logika-story";
import { W, bangunC, emo, judul, kartu, kotak, labelSisi, panah, penggaris, poligon, sisiGaris, teks, ukuran } from "./k5b4c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b4c-bantu";

/** Kartu mini bangun: kotak putih, bangun di tengah, nama di bawah (satu atau dua baris). */
const kartuBangun = (id: string, x: number, y: number, w: number, h: number, kode: string, s: number, warna: string, nama: string[]): Obj[] => {
  const u = ukuran(kode, s);
  return [
    kotak(`${id}-k`, x, y, w, h, W.putih, W.biru, { rx: 6 }),
    bangunC(`${id}-b`, x + (w - u.w) / 2, y + 6 + (h - 24 - u.h) / 2, kode, s, warna, W.biru, { tebal: 1.4 }),
    ...nama.map((n, i) => teks(`${id}-n${i}`, x + w / 2, y + h - 3 - (nama.length - 1 - i) * 8, n, 7.2, W.biru)),
  ];
};

/* ------------------------------ 1. Pembuka Sub-Bab C: pengalaman belajar (Panduan Guru hlm. 138 dan skema hlm. 116) ------------------------------ */
export const ADEGAN_PEMBUKA_C: AdeganStory = {
  id: "pembuka-c",
  judul: "Sub-Bab C: pengalaman belajar keliling segi empat",
  sumber: "Panduan Guru hlm. 116 dan 138; Buku Siswa hlm. 118",
  latar: "#FFF7ED",
  kutipan: [
    "Pada Subbab C, peserta didik diberi pengalaman belajar berupa penemuan",
    "terbimbing terhadap cara-cara menemukan keliling segi empat.",
    "memeriksanya dengan cara mengukur menggunakan penggaris",
    "akan memengaruhi cara peserta didik menghitung keliling bangun tersebut.",
    "Peserta didik mula-mula diminta menemukan rumus keliling persegi",
    "panjang. Selanjutnya, pola yang sama diterapkan untuk menemukan keliling",
    "jajargenjang dan layang-layang.",
    "untuk persegi, belah ketupat, dan segi empat sembarang.",
    "Alat tulis: pulpen, pensil, penggaris, spidol.",
  ],
  ketukan: [
    k(
      "Selamat datang di subbab C, Keliling Segi Empat. Di subbab sebelumnya kita sudah menemukan keliling segitiga. Sekarang kita memakai cara berpikir yang sama untuk berbagai segi empat.",
      tambah(0, judul("Subbab C: Keliling Segi Empat")),
      tambah("segitiga", poligon("sg", 34, 86, [[20, 0], [44, 40], [0, 40]], W.hijauMuda), teks("sgt", 56, 148, "segitiga", 9)),
      tambah("Sekarang", panah("ar", 96, 106, 40, 0, W.biru, 2.4, { gambar: true })),
      tambah("segi", bangunC("q1", 146, 70, "pp", 9, W.langit), bangunC("q2", 200, 70, "jg", 7, W.krem), bangunC("q3", 262, 66, "ps", 9, W.hijauMuda), bangunC("q4", 160, 112, "ll", 9, W.pink), bangunC("q5", 196, 118, "bk", 9, W.jingga), bangunC("q6", 252, 114, "tr", 9, W.langit), teks("qt", 205, 176, "segi empat", 9.4, W.ungu)),
    ),
    k(
      "Menurut buku panduan guru, pengalaman belajarnya adalah penemuan terbimbing. Kalian tidak langsung diberi rumus, melainkan menemukan sendiri cara menghitung keliling dengan mengukur lalu menjumlahkan.",
      bersih(0),
      tambah(0, judul("Penemuan terbimbing")),
      tambah("langsung", ...kartu("rx", 14, 36, 272, 30, W.merahMuda, ["Bukan: diberi rumus, lalu dihafal"], 9)),
      tambah("melainkan", ...kartu("l1", 14, 82, 84, 58, W.hijauMuda, ["1. ukur", "sisi-sisinya"], 8.6), ...kartu("l2", 108, 82, 84, 58, W.langit, ["2. jumlahkan", "panjang sisi"], 8.6), ...kartu("l3", 202, 82, 84, 58, W.krem, ["3. temukan", "rumusnya"], 8.6)),
      tambah("mengukur", emo("e1", 56, 168, "📏", 26)),
      tambah("menjumlahkan", emo("e2", 150, 168, "➕", 26)),
    ),
    k(
      "Mula-mula kalian mengingat sifat segi empat dan memeriksanya dengan penggaris. Ada atau tidak sisi yang sama panjang? Jawabannya menentukan cara menghitung keliling.",
      bersih(0),
      tambah(0, judul("Periksa dengan penggaris")),
      tambah("segi", bangunC("pc", 96, 44, "pp", 22, W.langit)),
      tambah("penggaris", ...penggaris("pg", 36, 142, 10, 22)),
      tambah("sama", sisiGaris("ps1", 96, 44, "pp", 22, 0, W.merah), sisiGaris("ps2", 96, 44, "pp", 22, 2, W.merah)),
      tambah("Jawabannya", teks("pj", 150, 184, "sisi sama panjang? → cara menghitung", 9, W.ungu)),
    ),
    k(
      "Urutannya begini. Mula-mula persegi panjang. Lalu pola yang sama dipakai untuk jajargenjang dan layang-layang. Sesudah itu persegi, belah ketupat, trapesium, dan segi empat sembarang.",
      bersih(0),
      tambah(0, judul("Urutan eksplorasi")),
      tambah("persegi", ...kartuBangun("u1", 8, 28, 88, 70, "pp", 8, W.langit, ["persegi panjang"])),
      tambah("jajargenjang", ...kartuBangun("u2", 106, 28, 88, 70, "jg", 7, W.krem, ["jajargenjang"])),
      tambah("layang-layang", ...kartuBangun("u3", 204, 28, 88, 70, "ll", 8, W.pink, ["layang-layang"])),
      tambah("persegi@2", ...kartuBangun("u4", 8, 108, 68, 80, "ps", 7, W.hijauMuda, ["persegi"])),
      tambah("belah", ...kartuBangun("u5", 82, 108, 68, 80, "bk", 7, W.jingga, ["belah ketupat"])),
      tambah("trapesium,", ...kartuBangun("u6", 156, 108, 68, 80, "tr", 7, W.langit, ["trapesium"])),
      tambah("sembarang", ...kartuBangun("u7", 230, 108, 62, 80, "ss", 6, W.krem, ["segi empat", "sembarang"])),
    ),
    k(
      "Waktu yang disarankan untuk subbab ini empat jam pelajaran. Alat tulis yang dibutuhkan: pulpen, pensil, penggaris, dan spidol.",
      bersih(0),
      tambah(0, judul("Persiapan")),
      tambah("empat", ...kartu("jp", 90, 34, 120, 40, W.krem, ["4 JP", "waktu yang disarankan"], 9.4)),
      tambah("pulpen,", emo("al1", 56, 130, "🖊", 28), teks("alt1", 56, 154, "pulpen", 8)),
      tambah("pensil,", emo("al2", 118, 130, "✏", 28), teks("alt2", 118, 154, "pensil", 8)),
      tambah("penggaris,", emo("al3", 182, 130, "📏", 28), teks("alt3", 182, 154, "penggaris", 8)),
      tambah("spidol.", emo("al4", 244, 130, "🖍", 28), teks("alt4", 244, 154, "spidol", 8)),
    ),
  ],
};

/* ------------------------------ 2. Apersepsi dan pemanasan (Panduan Guru hlm. 139) ------------------------------ */
export const ADEGAN_APERSEPSI: AdeganStory = {
  id: "apersepsi-pemanasan",
  judul: "Apersepsi dan pemanasan: mengukur sisi dengan penggaris",
  sumber: "Panduan Guru hlm. 139",
  latar: "#F0FDF4",
  kutipan: [
    "Apersepsi dilakukan",
    "dengan mengajak peserta didik melakukan tanya jawab mengenai jenis segi",
    "“Apa nama segi empat yang",
    "tersaji di buku siswa?”, “Adakah sisi-sisi yang sama panjang?”, dan “Mana",
    "saja sisi-sisi yang sama panjang?”.",
    "juga diminta langsung mengukur panjang sisi-sisinya dengan menggunakan",
    "penggaris.",
    "Kegiatan memeriksa dan mengukur panjang sisi-sisi segi empat pada",
    "dapat menjadi suatu aktivitas pemanasan.",
    "Guru menyiapkan penggaris cadangan untuk mengantisipasi jika ada",
  ],
  ketukan: [
    k(
      "Sebelum mulai, guru mengajak kalian tanya jawab tentang jenis segi empat di buku. Apa nama segi empat ini? Adakah sisi yang sama panjang? Mana saja sisi yang sama panjang?",
      tambah(0, judul("Apersepsi: tanya jawab")),
      tambah("Apa", ...kartu("q1", 14, 34, 272, 28, W.hijauMuda, ["Apa nama segi empat ini?"], 9)),
      tambah("Adakah", ...kartu("q2", 14, 72, 272, 28, W.langit, ["Adakah sisi yang sama panjang?"], 9)),
      tambah("Mana", ...kartu("q3", 14, 110, 272, 28, W.krem, ["Mana saja sisi yang sama panjang?"], 9)),
      tambah("segi", emo("qe", 150, 178, "🤔", 28)),
    ),
    k(
      "Untuk menjawabnya, kalian tidak menebak, tetapi mengukur langsung panjang tiap sisi dengan penggaris. Hasil ukur itulah bukti sisi mana yang sama.",
      bersih(0),
      tambah(0, judul("Ukur langsung, jangan menebak")),
      tambah("menebak,", bangunC("ap", 90, 40, "pp", 24, W.langit)),
      tambah("penggaris.", ...penggaris("pg", 70, 130, 12, 13), teks("pu", 150, 160, "baca angka di ujung sisi", 9, W.coklat)),
      tambah("bukti", sisiGaris("as1", 90, 40, "pp", 24, 0, W.merah), sisiGaris("as2", 90, 40, "pp", 24, 2, W.merah)),
    ),
    k(
      "Kegiatan memeriksa dan mengukur sisi-sisi segi empat langsung dengan penggaris inilah yang menjadi pemanasan di seluruh subbab C.",
      bersih(0),
      tambah(0, judul("Pemanasan")),
      tambah("memeriksa", ...kartu("pm", 30, 40, 240, 44, W.krem, ["Memeriksa dan mengukur sisi-sisi", "segi empat dengan penggaris"], 9)),
      tambah("pemanasan", emo("pe", 150, 130, "🔥", 36)),
      tambah("seluruh", teks("ps", 150, 176, "dipakai di setiap eksplorasi 4.3A sampai 4.3E", 8.6, W.hijau)),
    ),
    k(
      "Guru juga menyiapkan gambar yang diperbesar, lewat slide proyektor atau gambar tempel di papan tulis, dan penggaris cadangan untuk teman yang lupa membawa.",
      bersih(0),
      tambah(0, judul("Siapan guru")),
      tambah("gambar", kotak("pa", 30, 34, 120, 80, W.putih, W.coklat, { rx: 3, tebal: 2.4 }), bangunC("pb", 52, 52, "pp", 12, W.langit), teks("pt", 90, 130, "gambar diperbesar", 8.4)),
      tambah("proyektor", teks("py", 90, 148, "slide atau tempel di papan", 7.6, W.ungu)),
      tambah("penggaris", ...penggaris("pc", 178, 66, 5, 18), teks("pcc", 224, 96, "penggaris", 8.4), teks("pcd", 224, 108, "cadangan", 8.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 4.3A: persegi panjang, mengukur dan menjumlahkan (hlm. 118; Panduan Guru hlm. 140 dan 141) ------------------------------ */
export const ADEGAN_EKS_43A_UKUR: AdeganStory = {
  id: "eks-43a-ukur",
  judul: "Eksplorasi 4.3A: keliling persegi panjang",
  sumber: "Buku Siswa hlm. 118; Panduan Guru hlm. 140–141",
  latar: "#EFF6FF",
  kutipan: [
    "Eksplorasi 4.3A",
    "Ayo Menemukan",
    "Apa nama bangun datar di atas? Dengan menggunakan penggaris,",
    "cobalah mengukur sisi-sisi yang belum diketahui panjangnya.",
    "Apakah ada sisi-sisi yang sama panjang?",
    "Sisi-sisi yang berhadapan",
    "ternyata sama panjang.",
    "Lalu, bagaimana cara",
    "mencari kelilingnya?",
    "Keliling = 5 + 3 + … + …",
    "Dengan demikian, diperoleh kelilingnya … cm.",
    "Keliling = 5 + 3 + 5 + 3",
    "= 5 + 5 + 3 + 3",
    "= ( 2 × 5 ) + ( 2 × 3 )",
    "= 10 + 6",
    "sehingga diperoleh kelilingnya 16 cm.",
  ],
  ketukan: [
    k(
      "Eksplorasi empat titik tiga A, Ayo Menemukan. Perhatikan bangun datar ini. Apa namanya? Ukur sisi yang belum diketahui dengan penggaris. Apakah ada sisi yang sama panjang?",
      tambah(0, judul("Eksplorasi 4.3A")),
      tambah("bangun", bangunC("pp", 96, 58, "pp", 20, W.langit), ...labelSisi("pp", 96, 58, "pp", 20, ["5 cm", "… cm", "… cm", "3 cm"], 9)),
      tambah("namanya?", teks("nm", 150, 150, "bangun apa ini? persegi panjang", 9.4, W.ungu)),
      tambah("penggaris", ...penggaris("pg", 80, 166, 7, 20)),
    ),
    k(
      "Setelah diukur, ternyata sisi yang berhadapan sama panjang. Sisi atas sama dengan sisi bawah, sisi kiri sama dengan sisi kanan. Lalu bagaimana cara mencari kelilingnya?",
      ubah("atas", { id: "pp-l1", isi: "3 cm" }, { id: "pp-l2", isi: "5 cm" }),
      tambah("atas", sisiGaris("c1", 96, 58, "pp", 20, 0, W.merah), sisiGaris("c3", 96, 58, "pp", 20, 2, W.merah)),
      tambah("kiri", sisiGaris("c2", 96, 58, "pp", 20, 1, W.hijau), sisiGaris("c4", 96, 58, "pp", 20, 3, W.hijau)),
      ubah("Lalu", { id: "nm", isi: "bagaimana mencari kelilingnya?" }),
    ),
    k(
      "Pertama, jumlahkan semua sisi sambil berkeliling dari satu pojok: lima ditambah tiga ditambah lima ditambah tiga.",
      bersih(0),
      tambah(0, judul("Jumlahkan sambil berkeliling")),
      tambah("Pertama,", bangunC("pp", 44, 44, "pp", 14, W.langit), ...labelSisi("pp", 44, 44, "pp", 14, ["5 cm", "3 cm", "5 cm", "3 cm"], 8)),
      tambah("lima", teks("j1", 214, 70, "5", 16, W.merah)),
      tambah("tiga", teks("j2", 214, 100, "5 + 3", 16, W.merah)),
      tambah("lima@2", teks("j3", 214, 130, "5 + 3 + 5", 16, W.merah)),
      tambah("tiga@2", teks("j4", 214, 160, "5 + 3 + 5 + 3", 16, W.merah)),
    ),
    k(
      "Kedua, kelompokkan sisi yang sama panjang: lima ditambah lima ditambah tiga ditambah tiga. Itu dua kali lima ditambah dua kali tiga, yaitu sepuluh ditambah enam.",
      bersih(0),
      tambah(0, judul("Kelompokkan, lalu ubah jadi kali")),
      tambah("Kedua,", teks("g0", 150, 56, "5 + 3 + 5 + 3", 12, W.biru)),
      tambah("kelompokkan", teks("g1", 150, 80, "= 5 + 5 + 3 + 3", 12, W.merah)),
      tambah("dua", teks("g2", 150, 104, "= (2 × 5) + (2 × 3)", 12, W.hijau)),
      tambah("sepuluh", teks("g3", 150, 128, "= 10 + 6", 12, W.ungu)),
    ),
    k(
      "Dengan demikian, keliling persegi panjang ini enam belas sentimeter. Catat satuannya, karena keliling adalah panjang jalur, jadi memakai sentimeter.",
      sorotkan("keliling", "g1", "g2", "g3"),
      tambah("enam", teks("g4", 150, 152, "= 16", 14, W.merah), teks("g5", 150, 176, "Keliling = 16 cm", 12, W.hijau)),
      tambah("Catat", emo("cn", 262, 160, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 4. Eksplorasi 4.3A: rumus keliling persegi panjang (hlm. 118 dan 119; Panduan Guru hlm. 141 dan 142) ------------------------------ */
export const ADEGAN_EKS_43A_RUMUS: AdeganStory = {
  id: "eks-43a-rumus",
  judul: "Eksplorasi 4.3A: rumus keliling persegi panjang",
  sumber: "Buku Siswa hlm. 118–119; Panduan Guru hlm. 141–142",
  latar: "#F5F3FF",
  kutipan: [
    "Keliling = panjang + lebar + … + …",
    "Keliling = panjang + lebar + panjang + lebar",
    "= ( 2 × panjang) + ( 2 × lebar)",
    "Pada persegi panjang, keliling dihitung dengan cara",
    "menghitung dua kali jumlahan panjang dan lebarnya.",
    "Keliling = (2 × panjang) + (2 × lebar)",
    "bahwa banyaknya sisi-sisi yang sama panjang akan menjadi pengali dalam",
    "rumus keliling.",
    "panjang, karena ada 2 pasang sisi yang sama",
    "panjang, maka panjang sisi-sisi tersebut dikali 2 saat menghitung kelilingnya.",
    "melalui kegiatan tanya jawab.",
  ],
  ketukan: [
    k(
      "Sekarang perhatikan persegi panjang tanpa angka. Sisinya kita sebut panjang dan lebar. Keliling sama dengan panjang ditambah lebar ditambah panjang ditambah lebar.",
      tambah(0, judul("Rumus tanpa angka")),
      tambah("persegi", bangunC("rp", 90, 40, "pp", 24, W.langit), teks("rpa", 150, 128, "panjang", 9.4, W.merah), teks("rpl", 76, 84, "lebar", 9.4, W.hijau, { anchor: "end" })),
      tambah("Keliling", teks("rf1", 150, 156, "Keliling = panjang + lebar + panjang + lebar", 9.2, W.biru)),
    ),
    k(
      "Karena ada dua panjang dan dua lebar, ditulis dua kali panjang ditambah dua kali lebar. Inilah rumus keliling persegi panjang menurut buku.",
      sorotkan("dua", "rf1"),
      tambah("ditulis", teks("rf2", 150, 172, "= (2 × panjang) + (2 × lebar)", 10.4, W.hijau)),
      tambah("rumus", kotak("rfk", 24, 160, 252, 18, "none", W.emas, { rx: 5, tebal: 2.4 })),
    ),
    k(
      "Catatan dari buku panduan guru: banyaknya sisi yang sama panjang menjadi pengali dalam rumus keliling. Pada persegi panjang ada dua pasang sisi sama, maka tiap panjang sisi dikali dua.",
      bersih(0),
      tambah(0, judul("Pengali = banyak sisi yang sama")),
      tambah("banyaknya", bangunC("pk", 100, 40, "pp", 20, W.langit), sisiGaris("pk1", 100, 40, "pp", 20, 0, W.merah), sisiGaris("pk3", 100, 40, "pp", 20, 2, W.merah), sisiGaris("pk2", 100, 40, "pp", 20, 1, W.hijau), sisiGaris("pk4", 100, 40, "pp", 20, 3, W.hijau)),
      tambah("pasang", teks("pk5", 150, 130, "2 pasang sisi sama", 10, W.ungu)),
      tambah("dikali", teks("pk6", 150, 156, "tiap sisi dikali 2", 12, W.merah)),
    ),
    k(
      "Guru menutup eksplorasi dengan penguatan lewat tanya jawab. Pastikan kamu bisa menjawab dua hal: mengapa dikali dua, dan sisi mana saja yang dijumlahkan.",
      bersih(0),
      tambah(0, judul("Penguatan: tanya jawab")),
      tambah("mengapa", ...kartu("t1", 14, 40, 272, 36, W.hijauMuda, ["Mengapa dikali dua?"], 10)),
      tambah("sisi", ...kartu("t2", 14, 92, 272, 36, W.langit, ["Sisi mana saja yang dijumlahkan?"], 10)),
      tambah("menjawab", emo("t3", 150, 172, "🙋", 28)),
    ),
  ],
};
