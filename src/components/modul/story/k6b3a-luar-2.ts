import type { AdeganStory } from "./logika-story";
import { BAHAN, W, balokIso, emo, geserKe, kotak, panah, susunKubus, teks } from "./k6b3a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b3a-bantu";

const P = (ox: number, oy: number, s = 20) => ({ s, ox, oy });
type Sel = [number, number, number][];

/* ------------------------------ LA3. Hidden Support Rule ------------------------------ */
const MENARA_SUDUT: Sel = [[0, 0, 0], [0, 0, 1], [0, 0, 2], [1, 0, 0], [0, 1, 0]];
const MS = susunKubus("h", P(100, 128, 24), MENARA_SUDUT, (n) => [BAHAN.biru, BAHAN.hijau, BAHAN.oranye, BAHAN.kuning, BAHAN.merah][n]);
const DEPAN4: Sel = [[0, 1, 0], [1, 1, 0], [0, 2, 0], [1, 2, 0]];
const ATAS2: Sel = [[0, 0, 1], [1, 0, 1]];
const TERSEMBUNYI2: Sel = [[0, 0, 0], [1, 0, 0]];
const D4 = susunKubus("d", P(86, 126, 20), DEPAN4, BAHAN.oranye);
const A2 = susunKubus("a", P(86, 126, 20), ATAS2, BAHAN.kuning);
const G2 = susunKubus("g", P(86, 126, 20), TERSEMBUNYI2, BAHAN.abu, { op: 0.4 });
const MELAYANG = susunKubus("f", P(150, 100, 20), [[0, 0, 1]], BAHAN.kuning);

export const ADEGAN_LUAR_A_SANGGA: AdeganStory = {
  id: "luara-sangga",
  judul: "Hidden Support Rule: kubus penyangga yang tak tampak",
  sumber: "Metode luar; contoh menara sudut dan Latihan 3.1 nomor 3 (Buku Siswa hlm. 84)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode kedua: Hidden Support Rule. Kubus di lantai atas harus bertumpu pada kubus di bawahnya, tidak boleh melayang. Karena itu ada kubus yang tidak terlihat.",
      tambah(0, teks("jud", 150, 22, "Hidden Support Rule", 13, W.ungu)),
      tambah("harus", susunKubus("s", P(80, 150), [[0, 0, 0], [0, 0, 1]], BAHAN.hijau).objs, teks("ok", 80, 190, "bertumpu", 9, W.hijau), emo("ya", 80, 52, "✅", 20)),
      tambah("melayang.", MELAYANG.objs, teks("no", 150, 190, "melayang: tidak boleh", 9, W.merah), emo("tidak", 150, 52, "❌", 20)),
      tambah("tidak@2", teks("sy", 225, 106, "di bawahnya", 9, W.ungu), teks("sy2", 225, 120, "ada penyangga", 9, W.ungu)),
    ),
    k(
      "Contoh kecil: sebuah menara 3 kubus di sudut, dengan satu kubus di depannya dan satu kubus di sampingnya. Kubus paling bawah menara tertutup dari tiga sisi, jadi tidak tampak.",
      bersih(0),
      tambah("menara", MS.objs),
      tambah("3", teks("t3", 235, 60, "menara 3 kubus", 9, W.hijau)),
      tambah("depannya", teks("t1", 235, 84, "+ 1 di depan", 9, W.coklat)),
      tambah("sampingnya.", teks("t2", 235, 104, "+ 1 di samping", 9, W.merah)),
      tambah("tertutup", teks("tt", 235, 136, "kubus bawah", 9, W.biru), teks("tt2", 235, 150, "tertutup tiga sisi", 9, W.biru)),
    ),
    k(
      "Kita geser kedua kubus penutup, dan kubus tersembunyi itu pun tampak. Jadi terlihat 4 kubus, ditambah 1 kubus tersembunyi, totalnya 5 kubus.",
      ...[3, 4].map((n) => ubah("geser", ...geserKe(MS.ids[n], MS.objs, n === 3 ? 26 : -26, 8))),
      sorotkan("tersembunyi", ...MS.ids[0]),
      tambah("Jadi", teks("v4", 150, 174, "terlihat 4 + tersembunyi 1", 10.4, W.biru)),
      tambah("5", teks("v5", 150, 192, "total 5 kubus", 13, W.merah, { garis: W.emas })),
    ),
    k(
      "Terapkan pada Latihan 3.1 nomor 3. Terlihat tiga potong kardus yang masing-masing 2 kubus, jadi 6 kubus terlihat. Potongan paling atas tidak mungkin melayang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 3", 12, W.ungu)),
      tambah("Terlihat", D4.objs),
      tambah("tiga", A2.objs, teks("lt", 240, 70, "tiga potong kardus", 9, W.coklat)),
      tambah("masing-masing", teks("l2", 240, 82, "tiap potong 2 kubus", 8.6, W.coklat)),
      tambah("6", teks("l6", 240, 100, "terlihat: 6 kubus", 10, W.biru)),
      tambah("melayang.", emo("hm", 150, 60, "🤔", 22), teks("hq", 240, 120, "atas tak boleh melayang", 8.6, W.merah)),
    ),
    k(
      "Maka di bawahnya pasti ada 2 kubus tersembunyi sebagai penyangga. Jumlah seluruhnya 6 tambah 2, yaitu 8 kardus, sama dengan kunci buku.",
      hapus(0, "hm"),
      tambah("tersembunyi", G2.objs),
      sorotkan("tersembunyi", ...G2.semua),
      tambah("2@2", teks("h2", 240, 144, "tersembunyi: 2", 10, W.ungu)),
      tambah("tambah", teks("h8", 240, 172, "6 + 2 = 8", 15, W.merah, { garis: W.emas })),
    ),
  ],
};

/* ------------------------------ LA4. Rotational Equivalence Check ------------------------------ */
const LURUS: Sel = [[0, 0, 0], [1, 0, 0], [2, 0, 0]];
const MENARA3: Sel = [[0, 0, 0], [0, 0, 1], [0, 0, 2]];
const SIKU: Sel = [[0, 0, 0], [1, 0, 0], [0, 1, 0]];
const SIKU_TEGAK: Sel = [[0, 0, 0], [1, 0, 0], [0, 0, 1]];
const kubusDua = (id: string, ox: number, oy: number, sel: Sel, bahan = BAHAN.biru) => susunKubus(id, P(ox, oy, 20), sel, bahan).objs;
const tigaKotak = (ox: number, oy: number, a: number, b: number, c: number, bahan = BAHAN.biru) => balokIso(`bx${ox}`, P(ox, oy, 12), 0, 0, 0, a, b, c, bahan);

export const ADEGAN_LUAR_A_PUTAR: AdeganStory = {
  id: "luara-putar",
  judul: "Rotational Equivalence Check: sama bila bisa diputar",
  sumber: "Metode luar; Eksplorasi 3.1 (Buku Siswa hlm. 81–83)",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode ketiga: Rotational Equivalence Check. Dua susunan dianggap sama bila yang satu dapat diputar sehingga persis menjadi susunan yang lain.",
      tambah(0, teks("jud", 150, 22, "Rotational Equivalence Check", 12, W.ungu)),
      tambah("Dua", kubusDua("a", 80, 100, [[0, 0, 0], [1, 0, 0]], BAHAN.hijau)),
      tambah("diputar", panah("pr", 130, 92, 40, 0, W.merah, 3, { gambar: true }), teks("pt", 150, 80, "diputar", 9, W.merah)),
      tambah("persis", kubusDua("b", 230, 108, [[0, 0, 0], [0, 0, 1]], BAHAN.hijau), teks("ps", 225, 166, "susunan yang sama", 10, W.hijau)),
    ),
    k(
      "Tiga kubus berjejer, bila diputar sehingga berdiri, menjadi menara tiga lantai. Bentuknya tetap sama, hanya posisinya yang berbeda.",
      bersih(0),
      tambah("berjejer,", kubusDua("a", 60, 120, LURUS), teks("ta", 80, 168, "berjejer", 9)),
      tambah("diputar", panah("pr", 120, 112, 50, 0, W.merah, 3, { gambar: true })),
      tambah("menara", kubusDua("b", 232, 140, MENARA3), teks("tb", 232, 178, "menara tiga lantai", 9)),
      tambah("sama,", emo("cek", 150, 62, "✅", 24), teks("tm", 150, 196, "bentuk tetap sama", 11, W.hijau)),
    ),
    k(
      "Bentuk siku dari tiga kubus pun begitu. Berbaring di lantai, atau berdiri setinggi dua lantai, ia tetap bentuk siku yang sama.",
      bersih(0),
      tambah("siku", kubusDua("a", 80, 112, SIKU, BAHAN.hijau), teks("ta", 100, 166, "satu lantai", 9)),
      tambah("Berbaring", panah("pr", 140, 104, 40, 0, W.merah, 3, { gambar: true })),
      tambah("berdiri", kubusDua("b", 224, 120, SIKU_TEGAK, BAHAN.hijau), teks("tb", 236, 166, "dua lantai", 9)),
      tambah("tetap", teks("tm", 150, 196, "tetap bentuk siku yang sama", 10.4, W.hijau)),
    ),
    k(
      "Namun bentuk lurus dan bentuk siku tidak bisa saling dihasilkan lewat pemutaran. Jadi keduanya berbeda, dan tiga kubus hanya punya dua bentuk.",
      bersih(0),
      tambah("lurus", kubusDua("a", 70, 112, LURUS), teks("ta", 80, 166, "lurus", 10)),
      tambah("siku", kubusDua("b", 226, 112, SIKU, BAHAN.hijau), teks("tb", 240, 166, "siku", 10)),
      tambah("pemutaran.", teks("ne", 150, 112, "≠", 30, W.merah)),
      tambah("berbeda,", teks("bd", 150, 184, "tidak ada putaran yang cocok", 9.4, W.merah)),
      tambah("dua@2", teks("dua", 150, 197, "2 bentuk", 11, W.biru, { garis: W.emas })),
    ),
    k(
      "Dua balok pun diperiksa begini. Susunan yang menempel di sisi dua kali satu tidak dapat diputar menjadi susunan yang menempel di sisi satu kali satu. Keduanya berbeda.",
      bersih(0),
      tambah("Susunan", ...tigaKotak(60, 100, 2, 2, 1, BAHAN.biru), teks("ta", 80, 150, "kotak 2 x 2 x 1", 8.8)),
      tambah("sisi", teks("tm", 80, 40, "menempel di sisi 2 x 1", 8.6, W.merah)),
      tambah("satu@3", ...tigaKotak(190, 80, 4, 1, 1, BAHAN.hijau), teks("tb", 230, 150, "balok 4 x 1 x 1", 8.8), teks("tn", 230, 40, "menempel di sisi 1 x 1", 8.6, W.merah)),
      tambah("Keduanya", teks("kd", 150, 196, "ukuran dasarnya berbeda: tak bisa diputar sama", 8.8, W.merah)),
    ),
  ],
};

/* ------------------------------ LA5. Minimal Footprint Packing: konsep ------------------------------ */
export const ADEGAN_LUAR_A_JEJAK: AdeganStory = {
  id: "luara-jejak",
  judul: "Minimal Footprint Packing: jejak lantai terkecil",
  sumber: "Metode luar; Latihan 3.1 nomor 5 (Buku Siswa hlm. 84–85)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode keempat: Minimal Footprint Packing, menumpuk agar jejak lantai sekecil mungkin. Jejak lantai adalah luas lantai yang terpakai oleh tumpukan.",
      tambah(0, teks("jud", 150, 22, "Minimal Footprint Packing", 12, W.ungu)),
      tambah("menumpuk", kotak("lt", 40, 150, 220, 30, "#E5E7EB", W.hitam, { rx: 3 }), ...[0, 1, 2, 3].map((i) => kotak(`k${i}`, 108, 150 - i * 20, 84, 20, "#FDBA74", W.coklat, { rx: 1, tebal: 1.2 }))),
      tambah("jejak", kotak("jj", 108, 150, 84, 30, "#FDE68A", W.merah, { rx: 2, tebal: 2 }), teks("jt", 150, 194, "jejak = bidang yang tertutup", 9, W.merah)),
    ),
    k(
      "Gagasannya sederhana: volume seluruh barang tidak berubah. Jadi semakin tinggi tumpukan, semakin kecil alas yang dibutuhkan. Jejak lantai sama dengan volume dibagi tinggi tumpukan.",
      bersih(0),
      tambah("volume", kotak("v1", 30, 100, 80, 80, "#FDBA74", W.coklat, { rx: 3 }), teks("v1t", 70, 194, "pendek: alas lebar", 8.4)),
      tambah("tinggi", kotak("v2", 176, 40, 44, 140, "#FDBA74", W.coklat, { rx: 3 }), teks("v2t", 198, 194, "tinggi: alas sempit", 8.4)),
      tambah("sama", teks("fm", 150, 20, "jejak = volume : tinggi", 12, W.merah, { garis: W.emas })),
    ),
    k(
      "Satu kardus bervolume 20 kali 30 kali 50, yaitu 30.000 sentimeter kubik. Untuk 30 kardus, volumenya 900.000 sentimeter kubik. Tinggi tumpukan yang boleh dipakai ada 300 sentimeter.",
      bersih(0),
      tambah("Satu", ...balokIso("kd", P(80, 110, 9), 0, 0, 0, 2, 3, 5, BAHAN.oranye), teks("k1", 80, 150, "20 x 30 x 50", 9), teks("k2", 80, 164, "= 30.000 cm³", 10, W.merah)),
      tambah("Untuk", teks("k3", 215, 80, "30 kardus", 11), teks("k4", 215, 100, "30 x 30.000", 10), teks("k5", 215, 118, "= 900.000 cm³", 11, W.merah)),
      tambah("Tinggi", teks("k6", 150, 192, "tinggi tumpukan 300 cm", 11, W.biru, { garis: W.emas })),
    ),
    k(
      "Maka jejak lantainya adalah 900.000 dibagi 300, yaitu 3.000 sentimeter persegi. Hasil ini sama dengan jawaban di Buku Panduan Guru.",
      bersih(0),
      tambah("Maka", teks("b1", 150, 44, "jejak = 900.000 : 300", 14, W.biru)),
      tambah("3.000", teks("b2", 150, 88, "3.000 cm²", 24, W.merah, { garis: W.emas })),
      tambah("Buku@1", emo("cek", 150, 140, "✅", 28), teks("b3", 150, 176, "sama dengan kunci BG: 3.000 cm²", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA6. Minimal Footprint Packing: tiga cara berdiri ------------------------------ */
const kolomKardus = (id: string, x: number, banyak: number, lebar: number, tinggiUnit: number, warna: string) =>
  Array.from({ length: banyak }, (_, i) => kotak(`${id}${i}`, x, 170 - (i + 1) * tinggiUnit, lebar, tinggiUnit, warna, W.coklat, { rx: 1, tebal: 0.8 }));

export const ADEGAN_LUAR_A_JEJAK_TERAPAN: AdeganStory = {
  id: "luara-jejak-terapan",
  judul: "Tiga cara menegakkan kardus, jejak yang sama",
  sumber: "Metode luar; Latihan 3.1 nomor 5 dan kunci Buku Panduan Guru hlm. 95",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Coba tegakkan kardus pada rusuk 30 sentimeter. Dalam 300 sentimeter muat 10 kardus per tumpukan, jadi dibutuhkan 3 tumpukan.",
      tambah(0, teks("jud", 150, 22, "kardus tegak pada rusuk 30 cm", 11, W.ungu)),
      tambah("muat", ...kolomKardus("c", 40, 10, 40, 13, "#FCD34D"), teks("tc1", 60, 190, "10 per tumpukan", 8.4), teks("tc0", 236, 60, "tinggi 300 cm", 10, W.biru)),
      tambah("3@3", ...[1, 2].flatMap((t) => kolomKardus(`c${t}`, 40 + t * 56, 10, 40, 13, "#FCD34D")), teks("tc3", 236, 76, "3 tumpukan", 11, W.merah)),
    ),
    k(
      "Alas satu tumpukan 20 kali 50, yaitu 1.000 sentimeter persegi. Tiga tumpukan memakai 3.000 sentimeter persegi. Jejaknya tetap sama.",
      tambah("Alas", teks("a1", 230, 100, "alas 20 x 50", 9.4), teks("a2", 230, 114, "= 1.000 cm²", 10, W.merah)),
      tambah("Tiga", teks("a3", 230, 140, "3 x 1.000", 10), teks("a4", 230, 156, "= 3.000 cm²", 12, W.merah, { garis: W.emas })),
    ),
    k(
      "Sekarang tegakkan pada rusuk 20 sentimeter. Muat 15 kardus per tumpukan, jadi hanya 2 tumpukan. Alasnya 30 kali 50, yaitu 1.500 sentimeter persegi.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "kardus tegak pada rusuk 20 cm", 11, W.ungu)),
      tambah("Muat", ...kolomKardus("d", 40, 15, 40, 9, "#FCA5A5"), teks("td1", 60, 190, "15 per tumpukan", 8.4)),
      tambah("2@2", ...kolomKardus("e", 100, 15, 40, 9, "#FCA5A5"), teks("td2", 236, 76, "2 tumpukan", 11, W.merah)),
      tambah("Alasnya", teks("td3", 230, 100, "alas 30 x 50", 9.4), teks("td4", 230, 114, "= 1.500 cm²", 10, W.merah)),
    ),
    k(
      "Dua tumpukan memakai 3.000 sentimeter persegi, tetap sama. Sebab 300 habis dibagi 20, 30, dan 50, ketiga cara menghasilkan jejak yang sama, yaitu 3.000.",
      tambah("Dua", teks("td5", 230, 140, "2 x 1.500", 10), teks("td6", 230, 156, "= 3.000 cm²", 12, W.merah, { garis: W.emas })),
      tambah("Sebab", teks("td7", 225, 180, "300 habis dibagi 20, 30, dan 50", 8, W.hijau)),
    ),
    k(
      "Jadi untuk soal ini, memilih rusuk terpanjang sebagai tinggi memang praktis, tetapi tidak lebih hemat. Jawaban 3.000 sentimeter persegi, atau 0,3 meter persegi, tetap benar.",
      bersih(0),
      tambah("memilih", teks("e1", 150, 44, "rusuk 50 tegak: 3.000 cm²", 11)),
      tambah("memang", teks("e2", 150, 78, "rusuk 30 tegak: 3.000 cm²", 11)),
      tambah("tetapi", teks("e3", 150, 112, "rusuk 20 tegak: 3.000 cm²", 11)),
      tambah("hemat,", teks("e4", 150, 150, "tidak ada yang lebih hemat", 11, W.merah)),
      tambah("0,3", teks("e5", 150, 184, "3.000 cm² = 0,3 m²", 14, W.hijau, { garis: W.emas })),
    ),
  ],
};

/* ------------------------------ LA7. Ringkasan Sub-Bab A ------------------------------ */
export const ADEGAN_LUAR_A_RINGKAS: AdeganStory = {
  id: "luara-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#F5F3FF",
  ketukan: [
    k("Ringkasnya, ada empat metode luar untuk Subbab A. Pilih sesuai pertanyaan yang kita hadapi.", tambah(0, teks("jud", 150, 22, "Ringkasan metode luar", 12, W.ungu)), tambah("empat", emo("pil", 150, 92, "🧰", 44))),
    k(
      "Ingin tahu jumlah kubus? Pakai Layer Counting, hitung per lapisan lalu jumlahkan. Ada bagian yang tidak tampak? Tambahkan penyangga dengan Hidden Support Rule.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ringkasan metode luar", 12, W.ungu)),
      tambah("Layer", kotak("r1", 14, 34, 272, 36, "#FDE68A", W.biru, { rx: 10 }), teks("r1t", 150, 56, "jumlah kubus: Layer Counting", 10.4)),
      tambah("Hidden", kotak("r2", 14, 76, 272, 36, "#FBCFE8", W.biru, { rx: 10 }), teks("r2t", 150, 98, "yang tak tampak: Hidden Support Rule", 10)),
    ),
    k(
      "Dua susunan mirip? Periksa dengan Rotational Equivalence Check. Menumpuk barang di ruang sempit? Hitung jejak lantainya dengan Minimal Footprint Packing.",
      tambah("Rotational", kotak("r3", 14, 118, 272, 30, "#BBF7D0", W.biru, { rx: 10 }), teks("r3t", 150, 137, "dua susunan sama? Rotational Equivalence Check", 9)),
      tambah("Minimal", kotak("r4", 14, 154, 272, 30, "#BFDBFE", W.biru, { rx: 10 }), teks("r4t", 150, 173, "ruang sempit? Minimal Footprint Packing", 9.4)),
    ),
    k(
      "Ingat, buku tetap menjadi dasar. Keempat metode ini hanya alat bantu supaya kita yakin pada hasilnya. Sampai jumpa di Subbab B tentang visualisasi spasial.",
      bersih(0),
      tambah("buku", emo("bk", 70, 80, "📘", 40), teks("bkt", 70, 110, "dasar: buku", 9)),
      tambah("alat", emo("al", 150, 80, "🧰", 40), teks("alt", 150, 110, "alat bantu", 9)),
      tambah("yakin", emo("yk", 230, 80, "✅", 40), teks("ykt", 230, 110, "yakin hasilnya", 9)),
      tambah("Subbab", teks("sb", 150, 170, "Subbab B: Visualisasi Spasial", 12, W.ungu, { garis: W.emas })),
    ),
  ],
};
