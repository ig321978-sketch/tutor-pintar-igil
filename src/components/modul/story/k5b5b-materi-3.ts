import type { AdeganStory, Obj } from "./logika-story";
import { BK, JJG, KITE, W, bangunBerpetak, garis, kartu, kisi, kotak, lintasan, panah, poli, teks, type Pt } from "./k5b5b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b5b-bantu";

const ket = (id: string, y: number, isi: string, warna: string = W.biru, x = 108): Obj => teks(id, x, y, isi, 8.8, warna, { anchor: "start" });
const potong = (id: string, x: number, y: number, x2: number, y2: number): Obj => garis(id, x, y, x2, y2, W.merah, 1.8, { putus: true });
const tepi = (id: string, x: number, y: number, pts: Pt[]): Obj => poli(id, x, y, pts, "none", W.merah, { tebal: 2.4 });
const nama = (id: string, x: number, y: number, h: string): Obj => teks(id, x, y, h, 9.4, W.ungu);

/* ------------------------------ 8. Eksplorasi 5.2F: belah ketupat (hlm. 154-155; Panduan Guru hlm. 220-223) ------------------------------ */
const XB = 40;
const YB = 56;

export const ADEGAN_BELAH_KETUPAT: AdeganStory = {
  id: "belah-ketupat",
  judul: "Eksplorasi 5.2F: luas belah ketupat",
  sumber: "Buku Siswa hlm. 154–155; Buku Panduan Guru hlm. 220–223",
  latar: "#F0FDFA",
  kutipan: ["Ayo Menemukan Luas Daerah Belah Ketupat", "Manakah diagonal-diagonalnya", "Luas belah ketupat tetap, walaupun", "Sisi 1 = diagonal 1 belah ketupat", "Sisi 2 = setengah dari diagonal 2", "Luas = sisi"],
  ketukan: [
    k(
      "Eksplorasi 5.2F, menemukan luas daerah belah ketupat. Perhatikan belah ketupat ABCD. Diagonal-diagonalnya AC dan DB. Diagonal 1 panjangnya 2 satuan, diagonal 2 panjangnya 4 satuan.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2F", 13, W.ungu)),
      tambah("belah@2", ...bangunBerpetak("bk", XB, YB, 2, 4, BK.asal, W.hijauMuda), nama("bka", XB - 10, YB + 44, "A"), nama("bkc", XB + 50, YB + 44, "C"), nama("bkd", XB + 20, YB - 4, "D"), nama("bkb", XB + 20, YB + 92, "B")),
      tambah("Diagonal-diagonalnya", garis("bkd1", XB, YB + 40, 40, 0, W.merah, 3.2), garis("bkd2", XB + 20, YB, 0, 80, W.ungu, 3.2, { putus: true })),
      tambah("Diagonal@2", ket("bkk1", 92, "diagonal 1 (AC) = 2 satuan", W.merah)),
      tambah("diagonal@3", ket("bkk2", 114, "diagonal 2 (DB) = 4 satuan", W.ungu)),
    ),
    k(
      "Perkirakan luasnya dengan membilang kotak satuan: 4 satuan luas. Lalu potong bagian atas menjadi dua segitiga, dan pindahkan keduanya ke sisi yang lain.",
      hapus(0, "bkd1", "bkd2", "bkk1", "bkk2"),
      tambah("Perkirakan", ket("bkk3", 92, "dibilang: 4 satuan luas", W.ungu)),
      hapus("potong", "bk-bg", "bk-g"),
      tambah("potong", poli("bk-bw", XB, YB, BK.bawah, W.hijauMuda), poli("bk-p1", XB, YB, BK.kiriAtas, W.jeruk), poli("bk-p2", XB, YB, BK.kananAtas, W.ungMuda), kisi("bk-g2", XB, YB, 2, 4), potong("bkcut", XB + 20, YB, 0, 40)),
      ubah("pindahkan", { id: "bk-p1", d: lintasan(BK.kiriBaru) }, { id: "bk-p2", d: lintasan(BK.kananBaru) }),
    ),
    k(
      "Terbentuk persegi. Tidak ada bagian yang hilang, luasnya tetap. Sisi 1 sama dengan diagonal 1, yaitu 2 satuan. Sisi 2 sama dengan setengah diagonal 2, yaitu 2 satuan.",
      hapus(0, "bkcut", "bkk3"),
      tambah("Terbentuk", tepi("bk-hs", XB, YB, BK.hasil)),
      tambah("Sisi", ket("bkk4", 108, "sisi 1 sama dengan diagonal 1", W.merah)),
      tambah("Sisi@2", ket("bkk5", 130, "sisi 2 sama dengan 1/2 diagonal 2", W.hijau)),
    ),
    k(
      "Luas persegi sama dengan sisi kali sisi, yaitu 2 kali 2 sama dengan 4 satuan luas. Hasilnya sama dengan perkiraan kita.",
      hapus(0, "bkk4", "bkk5"),
      tambah("yaitu", teks("bkk6", 214, 120, "2 x 2 = 4", 22, W.hijau)),
      tambah("Hasilnya", ket("bkk7", 150, "sama dengan perkiraan", W.biru)),
    ),
    k(
      "Jadi luas belah ketupat sama dengan setengah kali diagonal 1 kali diagonal 2. Angkanya: setengah kali 2 kali 4 sama dengan 4 satuan luas. Diagonal pertama dikali setengah diagonal kedua.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus luas belah ketupat", 13, W.ungu)),
      tambah("Jadi", ...kartu("br", 20, 38, 260, 44, W.krem, ["Luas = 1/2 x diagonal 1 x diagonal 2"], 12)),
      tambah("Angkanya:", teks("br1", 150, 112, "diagonal 1: 2, diagonal 2: 4", 12, W.ungu), teks("br2", 150, 142, "4 : 2 = 2", 18, W.biru)),
      tambah("satuan", teks("br3", 150, 176, "luas = 4 satuan luas", 16, W.hijau)),
    ),
  ],
};

/* ------------------------------ 9. Eksplorasi 5.2G: layang-layang (hlm. 156-157; Panduan Guru hlm. 223-226) ------------------------------ */
const XK = 40;
const YK = 56;

export const ADEGAN_LAYANG_LAYANG: AdeganStory = {
  id: "layang-layang",
  judul: "Eksplorasi 5.2G: luas layang-layang",
  sumber: "Buku Siswa hlm. 156–157; Buku Panduan Guru hlm. 223–226",
  latar: "#FFFBEB",
  kutipan: ["Ayo Menemukan Luas Daerah Layang-Layang", "Manakah diagonal-diagonalnya", "Luas layang-layang tetap, walaupun diubah bentuknya", "Sisi 1 = diagonal 1 layang-layang", "Luas daerah layang-"],
  ketukan: [
    k(
      "Eksplorasi 5.2G, menemukan luas daerah layang-layang. Perhatikan layang-layang ABCD. Diagonal 1 panjangnya 5 satuan, diagonal 2 panjangnya 4 satuan.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2G", 13, W.ungu)),
      tambah("layang-layang@2", ...bangunBerpetak("ky", XK, YK, 5, 4, KITE.asal, W.merahMuda), nama("kya", XK - 10, YK + 44, "A"), nama("kyc", XK + 110, YK + 44, "C"), nama("kyd", XK + 40, YK - 4, "D"), nama("kyb", XK + 40, YK + 92, "B")),
      tambah("Diagonal", garis("kyd1", XK, YK + 40, 100, 0, W.merah, 3.2), ket("kyk1", 98, "diagonal 1 (AC) = 5 satuan", W.merah, 164)),
      tambah("diagonal@2", garis("kyd2", XK + 40, YK, 0, 80, W.ungu, 3.2, { putus: true }), ket("kyk2", 120, "diagonal 2 (DB) = 4 satuan", W.ungu, 164)),
    ),
    k(
      "Potong bagian atasnya menjadi dua segitiga, lalu pindahkan ke sisi yang lain. Satu potongan perlu dibalik supaya pas.",
      hapus(0, "kyd1", "kyd2", "kyk1", "kyk2"),
      hapus("Potong", "ky-bg", "ky-g"),
      tambah("Potong", poli("ky-bw", XK, YK, KITE.bawah, W.merahMuda), poli("ky-p1", XK, YK, KITE.kiriAtas, W.jeruk), poli("ky-p2", XK, YK, KITE.kananAtas, W.ungMuda), kisi("ky-g2", XK, YK, 5, 4), potong("kycut", XK + 40, YK, 0, 40)),
      ubah("pindahkan", { id: "ky-p1", d: lintasan(KITE.kiriBaru) }, { id: "ky-p2", d: lintasan(KITE.kananBaru) }),
      tambah("dibalik", ket("kyk3", 90, "satu potongan dibalik", W.merah, 164)),
    ),
    k(
      "Terbentuk persegi panjang. Tidak ada bagian yang hilang, luasnya tetap. Panjangnya diagonal 1, yaitu 5 satuan. Lebarnya 2 satuan, setengah dari diagonal 2.",
      hapus(0, "kycut", "kyk3"),
      tambah("Terbentuk", tepi("ky-hs", XK, YK, KITE.hasil)),
      tambah("Panjangnya", ket("kyk4", 98, "panjang 5: diagonal 1", W.merah, 164)),
      tambah("Lebarnya", ket("kyk5", 120, "lebar 2: setengah diagonal 2", W.hijau, 164)),
    ),
    k(
      "Perkirakan luasnya dengan membilang petak: 10 satuan luas. Hitung persegi panjangnya: 5 kali 2 sama dengan 10 satuan luas. Hasilnya sama dengan perkiraan.",
      hapus(0, "kyk4", "kyk5"),
      tambah("Perkirakan", ket("kyk6", 98, "dibilang: 10 satuan luas", W.ungu, 164)),
      tambah("Hitung", teks("kyk7", 232, 136, "5 x 2 = 10", 20, W.hijau)),
      tambah("Hasilnya", ket("kyk8", 164, "luasnya sama", W.biru, 164)),
    ),
    k(
      "Jadi luas layang-layang sama dengan setengah kali diagonal 1 kali diagonal 2, yaitu setengah kali 5 kali 4 sama dengan 10 satuan luas. Rumusnya sama dengan belah ketupat.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus luas layang-layang", 13, W.ungu)),
      tambah("Jadi", ...kartu("kr", 20, 38, 260, 44, W.krem, ["Luas = 1/2 x diagonal 1 x diagonal 2"], 12)),
      tambah("yaitu", teks("kr1", 150, 112, "5 x 4 = 20", 18, W.ungu), teks("kr2", 150, 140, "20 : 2 = 10", 18, W.biru)),
      tambah("10", teks("kr3", 150, 170, "luas = 10 satuan luas", 15, W.hijau)),
      tambah("Rumusnya", ...kartu("kr4", 40, 178, 220, 22, W.hijauMuda, ["rumusnya sama dengan belah ketupat"], 8.4)),
    ),
  ],
};

/* ------------------------------ 10. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 226-227) ------------------------------ */
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Miskonsepsi dan diferensiasi Sub-Bab B",
  sumber: "Buku Panduan Guru hlm. 226–227",
  latar: "#FFF1F2",
  kutipan: ["Miskonsepsi yang dapat terjadi pada Subbab B", "kesulitan melihat bahwa suatu bentuk daerah", "alat peraga manipulatif berupa tangram", "panjang unsur-unsur yang akan dikalikan/dihitung telah berubah menjadi", "setengahnya", "pola berpikir tingkat tinggi", "belum mampu melihat pola perkalian pada luas persegi atau persegi panjang"],
  ketukan: [
    k(
      "Panduan Guru menyebut dua miskonsepsi pada sub-bab ini. Miskonsepsi pertama: murid sulit percaya bahwa luas tetap ketika bentuk daerahnya diubah menjadi bangun lain.",
      tambah(0, teks("jud", 150, 24, "Miskonsepsi pertama", 13, W.ungu)),
      tambah("Miskonsepsi@2", poli("m1a", 20, 70, JJG.asal, W.langitMuda), panah("m1p", 134, 90, 28, 0, W.biru, 2.2), poli("m1b", 170, 70, JJG.hasil, W.hijauMuda)),
      tambah("tetap", teks("m1t", 150, 126, "luasnya tetap?", 14, W.merah)),
    ),
    k(
      "Pencegahnya adalah tangram bangun datar. Murid mengamati sendiri bahwa daerah yang dipindahkan tidak berkurang dan tidak bertambah, sehingga luasnya tetap.",
      tambah("tangram", ...kartu("m2a", 20, 140, 124, 30, W.krem, ["tidak berkurang"], 9.4)),
      tambah("bertambah,", ...kartu("m2b", 156, 140, 124, 30, W.krem, ["tidak bertambah"], 9.4)),
      ubah("sehingga", { id: "m1t", isi: "luasnya tetap", warna: W.hijau }),
      tambah("sehingga", tanda2("m2c", 150, 192)),
    ),
    k(
      "Miskonsepsi kedua: murid sulit paham bahwa menghitung luas di bentuk baru sama dengan di bentuk lama, karena ukuran yang dikalikan menjadi setengahnya. Misalnya tinggi 4 menjadi lebar 2.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Miskonsepsi kedua", 13, W.ungu)),
      tambah("bentuk", poli("m3a", 20, 70, [[0, 0], [0, 4], [4, 4]], W.langitMuda), teks("m3at", 60, 160, "bentuk lama", 8.6)),
      tambah("setengahnya.", poli("m3b", 170, 90, [[0, 0], [4, 0], [4, 2], [0, 2]], W.hijauMuda), teks("m3bt", 210, 160, "bentuk baru", 8.6)),
      tambah("tinggi", teks("m3c", 150, 60, "tinggi 4", 10, W.merah, { anchor: "middle" })),
      tambah("lebar", teks("m3d", 150, 180, "lebar 2 : separuh dari tinggi 4", 9.4, W.hijau)),
    ),
    k(
      "Antisipasinya, guru mendemonstrasikan perbandingan ukuran bentuk baru dan bentuk lama. Guru perlu yakin bahwa menghubungkan luas satu bangun dengan bangun lain membuat murid berpikir kritis dan tahu asal rumus.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Cara mengantisipasi", 13, W.ungu)),
      tambah("mendemonstrasikan", ...kartu("m4a", 20, 44, 260, 40, W.hijauMuda, ["tunjukkan perbandingan ukuran", "bentuk baru dan bentuk lama"], 9.2)),
      tambah("menghubungkan", ...kartu("m4b", 20, 96, 260, 40, W.krem, ["luas bangun satu dihubungkan", "dengan bangun lain"], 9.2)),
      tambah("berpikir", ...kartu("m4c", 20, 148, 260, 40, W.muda, ["murid berpikir kritis", "dan tahu asal rumus"], 9.2)),
    ),
    k(
      "Untuk diferensiasi, kegiatan ini melatih berpikir tingkat tinggi. Murid yang belum melihat pola perkalian, atau belum bisa membandingkan bentuk lama dan baru, diberi waktu lebih lama mengamati.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Diferensiasi", 13, W.ungu)),
      tambah("tingkat", ...kartu("m5a", 20, 44, 260, 36, W.ungMuda, ["berpikir tingkat tinggi"], 10)),
      tambah("belum", ...kartu("m5b", 20, 92, 260, 40, W.merahMuda, ["belum melihat pola perkalian", "atau belum bisa membandingkan"], 9.2)),
      tambah("diberi", ...kartu("m5c", 20, 144, 260, 40, W.hijauMuda, ["beri waktu lebih lama", "mengamati pola dan hasil bentuk"], 9.2)),
    ),
  ],
};

function tanda2(id: string, x: number, y: number): Obj {
  return teks(id, x, y, "✓ luas tetap", 14, W.hijau);
}

/* ------------------------------ 11. Refleksi nomor 6 sampai 12 dan rumus yang ditemukan (hlm. 161) ------------------------------ */
const BARIS = ["persegi panjang", "persegi", "segitiga", "jajargenjang", "trapesium", "belah ketupat", "layang-layang"];
const barisRef = (i: number): Obj[] => {
  const y = 52 + i * 20;
  return [
    teks(`rf${i}`, 14, y + 10, `${6 + i}. aku bisa menemukan luas ${BARIS[i]}`, 8.4, W.biru, { anchor: "start" }),
    kotak(`rf${i}y`, 232, y + 2, 10, 10, W.putih, W.biru, { rx: 2 }),
    kotak(`rf${i}n`, 268, y + 2, 10, 10, W.putih, W.biru, { rx: 2 }),
  ];
};

export const ADEGAN_REFLEKSI_B: AdeganStory = {
  id: "refleksi-b",
  judul: "Refleksi nomor 6 sampai 12 dan ringkasan rumus",
  sumber: "Buku Siswa hlm. 161 (Refleksi); Buku Panduan Guru hlm. 227",
  latar: "#EEF2FF",
  kutipan: ["Setelah mempelajari materi terkait luas daerah bangun datar", "Aku bisa menemukan cara menghitung luas daerah persegi panjang", "Aku bisa menemukan cara menghitung luas daerah segitiga", "Aku bisa menemukan cara menghitung luas daerah jajargenjang", "luas derah trapesium", "Aku bisa menemukan cara menghitung luas daerah belah ketupat", "Aku bisa menemukan cara menghitung luas daerah layang-layang"],
  ketukan: [
    k(
      "Refleksi untuk sub-bab ini adalah nomor 6 sampai 12. Murid memberi tanda centang, ya atau tidak, pada tujuh pernyataan. Nomor 6, aku bisa menemukan luas persegi panjang. Nomor 7, persegi. Nomor 8, segitiga.",
      tambah(0, teks("jud", 150, 22, "Refleksi 6 sampai 12", 12.5, W.ungu), teks("hy", 237, 44, "Ya", 8.6, W.hijau), teks("ht", 273, 44, "Tidak", 8.6, W.merah)),
      tambah("Nomor@2", barisRef(0)),
      tambah("Nomor@3", barisRef(1)),
      tambah("Nomor@4", barisRef(2)),
    ),
    k(
      "Nomor 9, jajargenjang. Nomor 10, trapesium. Nomor 11, belah ketupat. Nomor 12, layang-layang. Jawablah dengan jujur, karena ini cermin pemahaman kita sendiri.",
      tambah("Nomor", barisRef(3)),
      tambah("Nomor@2", barisRef(4)),
      tambah("Nomor@3", barisRef(5)),
      tambah("Nomor@4", barisRef(6)),
    ),
    k(
      "Rumus yang kita temukan. Persegi panjang: panjang kali lebar. Persegi: sisi kali sisi. Segitiga: setengah kali alas kali tinggi. Jajargenjang: alas kali tinggi.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus yang kita temukan", 13, W.ungu)),
      tambah("Persegi", ...kartu("u1", 12, 40, 134, 58, W.hijauMuda, ["persegi panjang", "panjang x lebar"], 9.4)),
      tambah("Persegi@2", ...kartu("u2", 154, 40, 134, 58, W.krem, ["persegi", "sisi x sisi"], 9.4)),
      tambah("Segitiga:", ...kartu("u3", 12, 108, 134, 58, W.muda, ["segitiga", "1/2 x alas x tinggi"], 9.4)),
      tambah("Jajargenjang:", ...kartu("u4", 154, 108, 134, 58, W.merahMuda, ["jajargenjang", "alas x tinggi"], 9.4)),
    ),
    k(
      "Trapesium: setengah kali jumlah sisi atas dan sisi alas, kali tinggi. Belah ketupat dan layang-layang: setengah kali diagonal 1 kali diagonal 2. Semuanya berasal dari persegi panjang atau jajargenjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Tiga rumus terakhir", 13, W.ungu)),
      tambah("Trapesium:", ...kartu("v1", 12, 38, 276, 42, W.krem, ["trapesium", "1/2 x (sisi atas + sisi alas) x tinggi"], 9.4)),
      tambah("Belah", ...kartu("v2", 12, 90, 276, 42, W.hijauMuda, ["belah ketupat dan layang-layang", "1/2 x diagonal 1 x diagonal 2"], 9.4)),
      tambah("berasal", ...kartu("v3", 12, 142, 276, 42, W.muda, ["semua berasal dari", "persegi panjang atau jajargenjang"], 9.4)),
    ),
  ],
};
