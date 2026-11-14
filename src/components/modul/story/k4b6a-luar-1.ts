import type { AdeganStory } from "./logika-story";
import { W, barisPikto, emo, judul, jumlahBaris, kartu, kunciPikto, panah, rangkaPikto, teks, turus } from "./k4b6a-gambar";
import { bersih, hapus, idx, k, redamkan, sebar, sorotkan, tambah, ubah } from "./k4b6a-bantu";
import { KAREL, PW, WARNA } from "./k4b6a-materi-2";

export const NAMA_METODE = ["Pictograph Key", "Categorical Tally", "Read then Compare", "Scale Multiply"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔑", "📝", "🔎", "🧮"];

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana cara menyajikan dan membaca data dengan gambar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Pictograph Key, Categorical Tally, Read then Compare, dan Scale Multiply.";
const SUARA_O3 = "Semuanya menjawab pertanyaan yang sama, tetapi caranya berbeda: membaca keterangan, menghitung dengan turus, membaca lalu membandingkan, dan mengalikan dengan skala.";
const SUARA_O4 = "Angkanya dari buku: warna kesukaan siswa, mainan Karel, buku yang dipinjam di perpustakaan, dan jumlah siswa tiap kelas.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk piktogram",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 180–186",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("menyajikan", emo("pg1", 54, 92, "🔵", 36), emo("pg2", 100, 92, "🔵", 36), emo("pg3", 146, 92, "🔵", 36)),
      tambah("berbagai", emo("gl", 235, 92, "🌍", 50)),
      tambah("angka", teks("pa", 150, 150, "angka-angka dari buku", 9.6, W.biru), teks("pc", 150, 168, "Buku Siswa hlm. 180–186", 9, W.coklat)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Pictograph", "Categorical", "Read", "Scale"].map((x) => idx(SUARA_O2, x))[i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("keterangan,", emo("i1", 45, 80, IKON_METODE[0], 34), teks("i1t", 45, 112, "keterangan", 8.4, W.biru)),
      tambah("turus,", emo("i2", 112, 80, IKON_METODE[1], 34), teks("i2t", 112, 112, "turus", 8.4, W.biru)),
      tambah("membandingkan,", emo("i3", 188, 80, IKON_METODE[2], 34), teks("i3t", 188, 112, "banding", 8.4, W.biru)),
      tambah("skala.", emo("i4", 255, 80, IKON_METODE[3], 34), teks("i4t", 255, 112, "skala", 8.4, W.biru)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("warna", ...kartu("a1", 14, 34, 272, 30, W.hijauMuda, ["warna kesukaan: 4, 2, 1, 5 siswa"], 9)),
      tambah("Karel,", ...kartu("a2", 14, 72, 272, 30, W.langit, ["mainan Karel: 6, 4, 3, 1, 9"], 9)),
      tambah("perpustakaan,", ...kartu("a3", 14, 110, 272, 30, W.krem, ["buku dipinjam: 12, 6, 9, 3, 12, 14"], 9)),
      tambah("kelas.", ...kartu("a4", 14, 148, 272, 30, W.pink, ["gambar siswa tiap kelas: 6, 6, 7, 8, 5, 7"], 8.6)),
    ),
  ],
};

/* ------------------------------ 2. Pictograph Key: konsep ------------------------------ */
const SUARA_K1 = "Metode pertama, Pictograph Key, atau Kunci Piktogram. Sebelum membaca gambar, baca dulu keterangannya: satu gambar menyatakan berapa? Keterangan itu seperti kunci pada peta.";
const SUARA_K2 = "Gambar yang sama bisa berarti satu, dua, atau lima. Tanpa kunci, banyaknya gambar belum punya arti.";
const SUARA_K3 = "Tiga langkahnya: temukan baris keterangan, catat nilai satu gambar, baru hitung gambarnya.";
const SUARA_K4 = "Di buku, kunci selalu berada di baris terakhir tabel, misalnya menyatakan satu siswa, atau menyatakan satu buku.";
const tigaOrang = (id: string, y: number) => [0, 1, 2].map((j) => emo(`${id}${j}`, 36 + j * 22, y, "👤", 18));

export const ADEGAN_LUAR_PK: AdeganStory = {
  id: "luar-kunci",
  judul: "Pictograph Key: baca kuncinya dulu",
  sumber: "Metode luar: Pictograph Key",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Pictograph Key")),
      tambah("Kunci", ...kartu("pk", 40, 34, 220, 30, W.hijauMuda, ["Kunci Piktogram"], 10.6)),
      tambah("baca", emo("pk1", 70, 108, "👤", 34), teks("pk1t", 120, 114, "= berapa?", 12, W.merah)),
      tambah("kunci@2", emo("pk2", 235, 108, "🔑", 34)),
      tambah("peta.", teks("pk3", 150, 168, "keterangan = kunci pembaca", 9.4, W.coklat)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Gambar sama, arti berbeda")),
      tambah("satu,", ...tigaOrang("r1", 55), teks("r1t", 190, 60, "kunci 1: 3 siswa", 9.6, W.biru)),
      tambah("dua,", ...tigaOrang("r2", 95), teks("r2t", 190, 100, "kunci 2: 6 siswa", 9.6, W.biru)),
      tambah("lima.", ...tigaOrang("r3", 135), teks("r3t", 190, 140, "kunci 5: 15 siswa", 9.6, W.biru)),
      tambah("Tanpa", teks("r4", 150, 186, "tanpa kunci, jumlah tak jelas", 9.4, W.merah)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("temukan", ...kartu("l1", 14, 34, 272, 34, W.hijauMuda, ["1. temukan baris keterangan"], 9.4)),
      tambah("catat", ...kartu("l2", 14, 78, 272, 34, W.langit, ["2. catat nilai satu gambar"], 9.4)),
      tambah("hitung", ...kartu("l3", 14, 122, 272, 34, W.krem, ["3. hitung gambarnya"], 9.4)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Kunci di buku")),
      tambah("baris", ...kartu("b1", 14, 36, 272, 26, W.abu, ["baris terakhir tabel"], 9)),
      tambah("siswa,", emo("b2", 80, 100, "👤", 26), teks("b2t", 170, 106, "menyatakan 1 siswa", 10, W.biru)),
      tambah(idx(SUARA_K4, "buku", 2), emo("b3", 80, 150, "📘", 26), teks("b3t", 170, 156, "menyatakan 1 buku", 10, W.biru)),
    ),
  ],
};

/* ------------------------------ 3. Pictograph Key: penerapan pada warna kesukaan (Buku Siswa hlm. 183) ------------------------------ */
const SUARA_KT1 = "Terapkan pada warna kesukaan siswa di buku. Langkah pertama, baca kuncinya: satu gambar menyatakan satu siswa.";
const SUARA_KT2 = "Langkah kedua, hitung gambar. Ungu empat, kuning dua, hitam satu, merah lima. Jumlahnya empat ditambah dua ditambah satu ditambah lima, sama dengan dua belas siswa.";
const SUARA_KT3 = "Sekarang ganti kuncinya. Andaikan satu gambar menyatakan dua siswa. Gambarnya sama, tetapi ungu kini delapan siswa dan merah sepuluh siswa.";
const SUARA_KT4 = "Gambar tidak berubah, tetapi artinya berubah: dua belas siswa menjadi dua puluh empat siswa. Itulah sebabnya kunci dibaca lebih dulu.";

export const ADEGAN_LUAR_PK_TERAPAN: AdeganStory = {
  id: "luar-kunci-terapan",
  judul: "Pictograph Key pada warna kesukaan siswa",
  sumber: "Metode luar: Pictograph Key; angka Buku Siswa hlm. 183",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_KT1,
      tambah(0, judul("Kunci: 1 gambar = 1 siswa")),
      tambah("warna", rangkaPikto(PW)),
      tambah("baca", ...kunciPikto(PW, 4, { jenis: "emoji", e: "👤" }, "menyatakan 1 siswa")),
      sorotkan("kuncinya:", "wk-kk"),
      tambah("satu@2", ...[0, 1, 2, 3].flatMap((i) => barisPikto(PW, i, WARNA[i]))),
    ),
    k(
      SUARA_KT2,
      redamkan(0, "wk-kk"),
      tambah("Ungu", jumlahBaris(PW, 0, 4)),
      tambah("kuning", jumlahBaris(PW, 1, 2)),
      tambah("hitam", jumlahBaris(PW, 2, 1)),
      tambah("merah", jumlahBaris(PW, 3, 5)),
      tambah("Jumlahnya", teks("kj", 150, 192, "4 + 2 + 1 + 5 = 12 siswa", 11, W.merah)),
    ),
    k(
      SUARA_KT3,
      hapus(0, "kj"),
      ubah("Andaikan", { id: "wk-kt", isi: "menyatakan 2 siswa", warna: W.merah }),
      ubah("tetapi", { id: "wk-n1", isi: "4", warna: W.hijau }, { id: "wk-n2", isi: "2", warna: W.hijau }),
      ubah("ungu", { id: "wk-n0", isi: "8", warna: W.hijau }),
      ubah("merah", { id: "wk-n3", isi: "10", warna: W.hijau }),
    ),
    k(
      SUARA_KT4,
      bersih(0),
      tambah(0, judul("Gambar sama, arti berbeda")),
      tambah("Gambar", ...kartu("kz1", 14, 36, 272, 36, W.hijauMuda, ["kunci 1 gambar = 1 siswa: 12 siswa"], 9.4)),
      tambah("menjadi", ...kartu("kz2", 14, 82, 272, 36, W.merahMuda, ["kunci 1 gambar = 2 siswa: 24 siswa"], 9.4)),
      tambah("kunci", ...kartu("kz3", 40, 134, 220, 36, W.emas, ["baca kuncinya dulu"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Categorical Tally: konsep ------------------------------ */
const SUARA_T1 = "Metode kedua, Categorical Tally, atau Turus Kategori. Bila data masih berupa daftar, hitung dengan turus: setiap data yang muncul dicoret satu garis.";
const SUARA_T2 = "Empat garis tegak, garis kelima menyilang, jadi satu kelompok berisi lima. Kelompok lima mudah dihitung dengan cepat.";
const SUARA_T3 = "Contoh: dua kelompok lima dan tiga garis lagi berarti lima, lima, tiga, jumlahnya tiga belas.";
const SUARA_T4 = "Setelah turus selesai, tiap kategori diubah menjadi gambar sebanyak turusnya, dan jadilah piktogram.";

export const ADEGAN_LUAR_TURUS: AdeganStory = {
  id: "luar-turus",
  judul: "Categorical Tally: turus kelompok lima",
  sumber: "Metode luar: Categorical Tally",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Categorical Tally")),
      tambah("Turus", ...kartu("tt", 40, 34, 220, 30, W.langit, ["Turus Kategori"], 10.6)),
      tambah("daftar,", ...kartu("td", 30, 80, 240, 30, W.krem, ["daftar data mentah"], 9)),
      tambah("setiap", ...turus("t1", 130, 126, 3)),
      tambah("garis.", teks("tg", 150, 176, "1 data = 1 garis", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Kelompok lima")),
      ...turus("a", 134, 70, 5).map((o, i) => tambah(["Empat", "garis", "tegak,", "garis@2", "menyilang,"][i] ?? 0, o)),
      tambah("kelompok", teks("tk", 150, 118, "5 garis = 1 kelompok", 10.4, W.biru)),
      tambah("mudah", teks("tm", 150, 150, "mudah dihitung cepat", 9.6, W.coklat)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Contoh: tiga belas")),
      ...turus("b", 100, 60, 13).map((o) => tambah(idx(SUARA_T3, "Contoh"), o)),
      tambah(idx(SUARA_T3, "lima", 2), teks("tb1", 106, 100, "5", 12, W.biru)),
      tambah(idx(SUARA_T3, "lima", 3), teks("tb2", 129, 100, "5", 12, W.biru)),
      tambah(idx(SUARA_T3, "tiga", 2), teks("tb3", 150, 100, "3", 12, W.biru)),
      tambah("jumlahnya", teks("tb4", 150, 150, "5 + 5 + 3 = 13", 12, W.merah)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Dari turus ke piktogram")),
      ...turus("c", 110, 50, 13).map((o) => tambah(0, o)),
      tambah("diubah", panah("ca", 150, 96, 0, 40, W.biru, 2)),
      ...Array.from({ length: 13 }, (_, j) => tambah(sebar(SUARA_T4, 13, idx(SUARA_T4, "gambar"))[j], emo(`cg${j}`, 24 + j * 20, 160, "🔵", 14))),
      tambah("piktogram.", teks("ct", 150, 196, "13 gambar", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Categorical Tally: penerapan pada mainan Karel (Buku Siswa hlm. 181) ------------------------------ */
const SUARA_TT1 = "Terapkan pada mainan Karel. Daftar yang ia sebut: enam mobil, empat robot, tiga pesawat, satu puzzle, dan sembilan kelereng. Kita turuskan satu per satu.";
const SUARA_TT2 = "Mobil: satu kelompok lima dan satu garis, jadi enam. Kelereng: satu kelompok lima dan empat garis, jadi sembilan.";
const SUARA_TT3 = "Jumlah turus seluruhnya: enam, empat, tiga, satu, dan sembilan. Hasilnya dua puluh tiga, sama dengan hitungan buku.";
const SUARA_TT4 = "Dari turus ini, piktogram tinggal menggambar satu gambar untuk setiap garis. Kelereng sembilan turus menjadi sembilan gambar.";
const NAMA_KAREL = ["Mobil", "Robot", "Pesawat", "Puzzle", "Kelereng"];
const yBaris = (i: number) => 38 + i * 28;
const turusKarel = (i: number) => turus(`tk${i}`, 84, yBaris(i), KAREL[i]);

export const ADEGAN_LUAR_TURUS_TERAPAN: AdeganStory = {
  id: "luar-turus-terapan",
  judul: "Categorical Tally pada mainan Karel",
  sumber: "Metode luar: Categorical Tally; angka Buku Siswa hlm. 181",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_TT1,
      tambah(0, judul("Turus mainan Karel")),
      ...NAMA_KAREL.map((n, i) => tambah(idx(SUARA_TT1, ["mobil", "robot", "pesawat", "puzzle", "kelereng"][i]), teks(`tn${i}`, 14, yBaris(i) + 11, n, 8.6, W.biru, { anchor: "start" }), ...turusKarel(i))),
    ),
    k(
      SUARA_TT2,
      tambah("Mobil:", teks("tc0", 190, yBaris(0) + 11, "= 6", 10, W.merah, { anchor: "start" })),
      sorotkan("Mobil:", ...turusKarel(0).map((o) => o.id)),
      redamkan("Kelereng:", ...turusKarel(0).map((o) => o.id)),
      tambah("Kelereng:", teks("tc4", 190, yBaris(4) + 11, "= 9", 10, W.merah, { anchor: "start" })),
      sorotkan("Kelereng:", ...turusKarel(4).map((o) => o.id)),
    ),
    k(
      SUARA_TT3,
      redamkan(0, ...turusKarel(4).map((o) => o.id)),
      tambah(idx(SUARA_TT3, "empat"), teks("tc1", 190, yBaris(1) + 11, "= 4", 10, W.merah, { anchor: "start" })),
      tambah(idx(SUARA_TT3, "tiga"), teks("tc2", 190, yBaris(2) + 11, "= 3", 10, W.merah, { anchor: "start" })),
      tambah(idx(SUARA_TT3, "satu"), teks("tc3", 190, yBaris(3) + 11, "= 1", 10, W.merah, { anchor: "start" })),
      tambah("Hasilnya", teks("tj", 150, 192, "6 + 4 + 3 + 1 + 9 = 23", 11, W.merah)),
    ),
    k(
      SUARA_TT4,
      bersih(0),
      tambah(0, judul("Dari turus ke piktogram")),
      ...turus("u", 130, 40, 9).map((o) => tambah("turus", o)),
      tambah("menggambar", panah("ua", 150, 70, 0, 40, W.biru, 2)),
      ...Array.from({ length: 9 }, (_, j) => tambah(sebar(SUARA_TT4, 9, idx(SUARA_TT4, "menggambar"))[j], emo(`ug${j}`, 36 + j * 28, 130, "🔵", 20))),
      tambah("sembilan@2", teks("ut", 150, 176, "9 turus = 9 gambar", 11, W.merah)),
    ),
  ],
};

