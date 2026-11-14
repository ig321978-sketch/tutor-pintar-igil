import type { AdeganStory } from "./logika-story";
import { PETA, W, emo, idSel, judul, kartu, kisiLatar, kotak, nomori, penuh, sel, teks } from "./k4b4a-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b4a-bantu";

export const NAMA_METODE = ["Area as Covering", "Array Area", "Nonstandard then Standard", "Grid Count"];
export const NAMA_METODE_ID = ["Luas sebagai Menutupi", "Luas Susunan", "Tak Baku ke Baku", "Hitung Petak"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🟩", "🪑", "📏", "🔢"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana cara mengukur luas? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Area as Covering, Array Area, Nonstandard then Standard, dan Grid Count.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Luas sebagai Menutupi, Luas Susunan, Tak Baku ke Baku, dan Hitung Petak.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan, berapa luasnya? Dengan menutupi daerah, menyusun baris dan kolom, berpindah ke satuan baku, dan menghitung petak.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk mengukur luas",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 105–121",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("mengukur", ...sel("po", 30, 52, PETA.A, 10, W.oranye), ...sel("pk", 90, 52, penuh(3, 4), 12, W.langit)),
      tambah("berbagai", emo("gl", 190, 80, "🌍", 40)),
      tambah("empat", ...kartu("pk4", 60, 150, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Area", "Array", "Nonstandard", "Grid"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Luas", "Susunan,", "Tak", "Hitung"][i], ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("menutupi", emo("i1", 45, 82, IKON_METODE[0], 32), teks("i1t", 45, 112, "menutupi", 8.4, W.biru)),
      tambah("menyusun", emo("i2", 112, 82, IKON_METODE[1], 32), teks("i2t", 112, 112, "menyusun", 8.4, W.biru)),
      tambah("berpindah", emo("i3", 188, 82, IKON_METODE[2], 32), teks("i3t", 188, 112, "berpindah", 8.4, W.biru)),
      tambah("menghitung", emo("i4", 258, 82, IKON_METODE[3], 32), teks("i4t", 258, 112, "menghitung", 8.4, W.biru)),
      tambah("luasnya?", ...kartu("iq", 60, 136, 180, 30, W.emas, ["berapa luasnya?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Area as Covering: konsep ------------------------------ */
const SUARA_C1 = "Metode pertama, Area as Covering, atau Luas sebagai Menutupi. Ahli pendidikan matematika Van de Walle menjelaskan, luas adalah banyaknya satuan persegi yang menutupi sebuah daerah.";
const SUARA_C2 = "Syaratnya dua: satuan persegi harus sama besar, dan menutupi daerah tanpa celah serta tanpa tumpang tindih.";
const SUARA_C3 = "Lalu kita hitung berapa satuan yang dipakai. Banyaknya satuan itulah luasnya, misalnya enam satuan.";
const SUARA_C4 = "Pakai satuan yang lebih kecil, hitungannya makin banyak, sebab daerahnya tetap sama. Kertas yang sama bisa empat persegi satuan, atau enam belas.";

export const ADEGAN_LUAR_COVER: AdeganStory = {
  id: "luar-cover",
  judul: "Area as Covering: luas = banyak satuan penutup",
  sumber: "Metode luar: Area as Covering",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Area as Covering")),
      tambah("pertama,", kepala(0)),
      tambah("daerah", kotak("dr", 30, 66, 120, 80, W.krem, W.coklat)),
      tambah("persegi", ...sel("pc", 30, 66, penuh(6, 4), 20, "#86EFAC", W.hijau)),
      tambah("menutupi", teks("dq", 225, 106, "luas = satuan", 9.6, W.biru), teks("dq2", 225, 120, "yang menutupi", 9.6, W.biru)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Dua syarat penutup")),
      tambah("sama", ...sel("s1", 20, 44, penuh(3, 3), 24, "#86EFAC", W.hijau), teks("s1t", 56, 134, "sama besar, rapat", 8.2, W.hijau), teks("s1c", 56, 148, "benar", 9, W.hijau)),
      tambah("celah", ...sel("s2", 120, 44, ["##.", "#.#", "###"], 24, "#FCA5A5", W.merah), teks("s2t", 156, 134, "ada celah", 8.2, W.merah), teks("s2c", 156, 148, "salah", 9, W.merah)),
      tambah("tumpang", ...sel("s3", 220, 44, ["##", "##"], 24, "#FDE68A", W.coklat), ...sel("s3b", 232, 56, ["##"], 24, "#FCA5A5", W.merah, { op: 0.8 }), teks("s3t", 256, 134, "tumpang tindih", 8.2, W.merah), teks("s3c", 256, 148, "salah", 9, W.merah)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Hitung satuan penutup")),
      tambah("hitung", ...sel("h", 90, 50, penuh(3, 2), 40, "#86EFAC", W.hijau)),
      tambah("Banyaknya", ...nomori("h", 90, 50, penuh(3, 2), 40, 14)),
      tambah("enam", ...kartu("hl", 60, 150, 180, 30, W.emas, ["luas = 6 satuan"], 10.4)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Satuan lain, hitungan lain")),
      tambah("kecil,", ...sel("k1", 30, 44, penuh(2, 2), 36, W.pink, W.biru), teks("k1t", 66, 134, "4 persegi satuan", 8.8, W.biru)),
      tambah("makin", ...sel("k2", 170, 44, penuh(4, 4), 18, W.pink, W.biru), teks("k2t", 206, 134, "16 persegi satuan", 8.8, W.biru)),
      tambah("tetap.", teks("k3", 150, 170, "daerah sama, satuan beda", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Area as Covering: penerapan pada bangun A sampai D (Buku Siswa hlm. 114) ------------------------------ */
const SUARA_D1 = "Terapkan pada mainan bongkar pasang di buku. Bangun C ditutupi persegi satuan yang sama besar, rapat, tanpa celah.";
const SUARA_D2 = "Hitung penutupnya: satu, dua, empat, dua, dan dua, jadi sebelas satuan. Luas bangun C adalah sebelas persegi satuan.";
const SUARA_D3 = "Bangun lain dengan satuan yang sama: A tiga belas, B tiga belas, C sebelas, dan D lima belas. Makin banyak penutupnya, makin luas bangunnya.";
const SUARA_D4 = "Bandingkan dengan meja guru. Ditutup uang kertas, ada dua puluh satu. Ditutup kertas origami, ada dua belas. Satuannya berbeda, banyaknya berbeda.";

export const ADEGAN_LUAR_COVER_TERAPAN: AdeganStory = {
  id: "luar-cover-terapan",
  judul: "Area as Covering pada bangun C dan meja guru",
  sumber: "Metode luar: Area as Covering; Buku Siswa hlm. 108, 109, 114",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Menutupi bangun C")),
      tambah("Bangun", ...sel("c", 100, 44, PETA.C, 20, W.merahTua, W.hitam)),
      tambah("rapat,", teks("cn", 150, 160, "persegi satuan sama besar, tanpa celah", 9, W.hijau)),
    ),
    k(
      SUARA_D2,
      ubah(0, { id: "cn", isi: "satu baris, satu penutup" }),
      tambah("satu,", ...nomori("c", 100, 44, PETA.C, 20, 9, W.putih)),
      tambah("sebelas", ...kartu("cl", 60, 168, 180, 28, W.emas, ["luas C = 11 satuan"], 9.6)),
      sorotkan("Luas", ...idSel("c", PETA.C)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Bandingkan jumlah penutup")),
      tambah(idx(SUARA_D3, "A"), kotak("ba", 24, 68, 28, 52, W.oranye, W.biru, { rx: 0 }), teks("ba1", 38, 136, "A", 9.4, W.biru), teks("ba2", 38, 70, "13", 9.4, W.hijau)),
      tambah(idx(SUARA_D3, "B"), kotak("bb", 84, 68, 28, 52, W.kuning, W.biru, { rx: 0 }), teks("bb1", 98, 136, "B", 9.4, W.biru), teks("bb2", 98, 70, "13", 9.4, W.hijau)),
      tambah(idx(SUARA_D3, "C"), kotak("bc", 144, 76, 28, 44, W.merahTua, W.biru, { rx: 0 }), teks("bc1", 158, 136, "C", 9.4, W.biru), teks("bc2", 158, 78, "11", 9.4, W.hijau)),
      tambah(idx(SUARA_D3, "D"), kotak("bd", 204, 60, 28, 60, W.biruMuda, W.biru, { rx: 0 }), teks("bd1", 218, 136, "D", 9.4, W.biru), teks("bd2", 218, 62, "15", 9.4, W.hijau)),
      tambah("Makin", teks("bk", 150, 164, "makin banyak penutup, makin luas", 9, W.merah)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Satuan beda, hitungan beda")),
      tambah("meja", teks("mjt", 150, 36, "meja guru yang sama", 9, W.coklat)),
      tambah("uang", ...sel("mu", 50, 48, penuh(3, 7), 8, "#86EFAC"), teks("mu1", 62, 118, "uang kertas: 21", 9, W.hijau)),
      tambah("origami.", ...sel("mo", 190, 48, penuh(3, 4), 14, W.pink), teks("mo1", 211, 118, "origami: 12", 9, W.hijau)),
      tambah("Satuannya", teks("mz", 150, 150, "satuannya berbeda", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Array Area: konsep ------------------------------ */
const SUARA_E1 = "Metode kedua, Array Area, atau Luas Susunan. Satuan persegi disusun rapi dalam baris dan kolom, seperti susunan kursi di kelas. Susunan itu disebut array.";
const SUARA_E2 = "Bila tiap baris punya kolom yang sama, kita tidak perlu menghitung satu per satu. Luas sama dengan banyaknya baris dikali banyaknya kolom.";
const SUARA_E3 = "Untuk persegi panjang, baris adalah lebarnya dan kolom adalah panjangnya. Jadi luas sama dengan panjang dikali lebar, asalkan satuannya sama.";
const SUARA_E4 = "Metode ini cocok untuk susunan yang penuh dan rata. Untuk bangun bergerigi, susunan barisnya tidak sama panjang.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Array Area: luas = baris dikali kolom",
  sumber: "Metode luar: Array Area",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Array Area")),
      tambah("kedua,", kepala(1)),
      tambah("baris", ...sel("ar", 60, 66, penuh(4, 3), 22, W.langit, W.biru)),
      tambah("kursi", emo("ks", 230, 100, "🪑", 34)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Baris dikali kolom")),
      tambah("baris", ...sel("a2", 40, 40, penuh(5, 4), 22, W.langit, W.biru)),
      tambah("kolom", teks("a2b", 192, 80, "4 baris", 9.4, W.coklat, { anchor: "start" }), teks("a2k", 95, 144, "5 kolom", 9.4, W.coklat)),
      tambah("sama@2", ...kartu("a2e", 60, 156, 180, 28, W.emas, ["4 × 5 = 20 satuan"], 10)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Persegi panjang")),
      tambah("persegi", kotak("pp", 60, 52, 160, 80, W.langit, W.biru, { rx: 0 })),
      tambah("lebarnya", teks("ppl", 236, 96, "lebar", 9.4, W.coklat, { anchor: "start" })),
      tambah("panjangnya.", teks("ppp", 140, 150, "panjang", 9.4, W.coklat)),
      tambah("luas", ...kartu("ppe", 60, 160, 180, 28, W.emas, ["luas = panjang × lebar"], 10)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Kapan cocok?")),
      tambah("penuh", ...sel("g1", 24, 44, penuh(4, 3), 22, W.hijauMuda, W.hijau), teks("g1t", 68, 130, "penuh dan rata: cocok", 8.2, W.hijau)),
      tambah("bergerigi,", ...sel("g2", 170, 44, ["#...", "##..", "####"], 22, W.merahMuda, W.merah), teks("g2t", 214, 130, "bergerigi: tidak", 8.2, W.merah)),
      tambah("sama", teks("g3", 150, 170, "baris tidak sama panjang", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. Array Area: penerapan pada meja dan kertas lipat (Buku Siswa hlm. 108, 109, 114) ------------------------------ */
const SUARA_F1 = "Meja lipat kecil: dua kolom dan empat baris uang kertas. Luasnya dua dikali empat, sama dengan delapan satuan.";
const SUARA_F2 = "Meja guru: tiga kolom dan tujuh baris. Luasnya tiga dikali tujuh, sama dengan dua puluh satu satuan.";
const SUARA_F3 = "Kertas lipat: dua baris dan dua kolom menghasilkan empat petak. Empat baris dan empat kolom menghasilkan enam belas petak.";
const SUARA_F4 = "Satu meter persegi: seratus baris dan seratus kolom sentimeter persegi. Seratus dikali seratus sama dengan sepuluh ribu sentimeter persegi.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Array Area pada meja, kertas lipat, dan meter persegi",
  sumber: "Metode luar: Array Area; Buku Siswa hlm. 108, 109, 113, 117",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Meja lipat kecil")),
      tambah("Meja", ...sel("mk", 108, 40, penuh(2, 4), 22, "#86EFAC", W.hijau)),
      tambah("kolom", teks("mk1", 76, 128, "2 kolom", 9, W.coklat), teks("mk2", 190, 128, "4 baris", 9, W.coklat)),
      tambah("sama", ...kartu("mke", 60, 148, 180, 30, W.emas, ["2 × 4 = 8"], 11)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Meja guru")),
      tambah("Meja", ...sel("mg", 100, 34, penuh(3, 7), 16, "#86EFAC", W.hijau)),
      tambah("kolom", teks("mg1", 56, 148, "3 kolom", 9, W.coklat), teks("mg2", 190, 148, "7 baris", 9, W.coklat)),
      tambah("dikali", ...kartu("mge", 60, 160, 180, 30, W.emas, ["3 × 7 = 21"], 11)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Kertas lipat")),
      tambah("dua", ...sel("kl1", 30, 44, penuh(2, 2), 32, W.pink, W.biru), teks("kl1e", 62, 134, "2 × 2 = 4", 11, W.hijau)),
      tambah("Empat@2", ...sel("kl2", 170, 44, penuh(4, 4), 16, W.krem, W.biru), teks("kl2e", 202, 134, "4 × 4 = 16", 11, W.hijau)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, judul("Satu meter persegi")),
      tambah("Satu", ...kisiLatar("mm", 30, 36, 10, 10, 8, W.hijauMuda, W.hijau)),
      tambah("seratus", teks("mm1", 190, 62, "100 baris", 9.6, W.coklat), teks("mm2", 190, 80, "100 kolom", 9.6, W.coklat)),
      tambah("sepuluh", teks("mm3", 190, 112, "100 × 100", 11, W.hijau), teks("mm4", 190, 130, "= 10.000 cm²", 11, W.hijau)),
      tambah(idx(SUARA_F4, "persegi", 3), teks("mm5", 150, 170, "1 m² = 10.000 cm²", 10.4, W.biru)),
    ),
  ],
};

