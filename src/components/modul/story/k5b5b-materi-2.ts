import type { AdeganStory, Obj } from "./logika-story";
import { JJG, SEG1, SEG2, TRAP, W, bangunBerpetak, garis, kartu, kisi, lintasan, poli, teks, type Pt } from "./k5b5b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b5b-bantu";

/** Teks keterangan rata kiri di sisi kanan gambar. */
const ket = (id: string, y: number, isi: string, warna: string = W.biru, x = 148): Obj => teks(id, x, y, isi, 8.8, warna, { anchor: "start" });
/** Garis potong putus-putus. */
const potong = (id: string, x: number, y: number, x2: number, y2: number): Obj => garis(id, x, y, x2, y2, W.merah, 1.8, { putus: true });
/** Garis tepi bangun hasil (tanpa isi), untuk menandai bentuk baru. */
const tepi = (id: string, x: number, y: number, pts: Pt[]): Obj => poli(id, x, y, pts, "none", W.merah, { tebal: 2.4 });
const nama = (id: string, x: number, y: number, h: string): Obj => teks(id, x, y, h, 9.4, W.ungu);

/* ------------------------------ 4. Eksplorasi 5.2C: segitiga model 1 (hlm. 147-148; Panduan Guru hlm. 207-210) ------------------------------ */
const X1 = 30;
const Y1 = 58;

export const ADEGAN_SEGITIGA_1: AdeganStory = {
  id: "segitiga-1",
  judul: "Eksplorasi 5.2C: luas segitiga (alas 4, tinggi 4)",
  sumber: "Buku Siswa hlm. 147–148; Buku Panduan Guru hlm. 207–210",
  latar: "#FFF7ED",
  kutipan: ["Ayo Menemukan Luas Daerah Segitiga", "Kalian telah menemukan cara menghitung luas daerah persegi", "Buatlah dengan menggunakan kertas", "Bangun apa yang terbentuk", "Apakah ada bagian yang hilang", "Luas segitiga tetap, walaupun diubah bentuknya", "Lebar persegi panjang"],
  ketukan: [
    k(
      "Eksplorasi 5.2C, menemukan luas daerah segitiga. Kita buat dengan kertas lipat. Pertanyaannya, dapatkah segitiga diubah menjadi persegi panjang, supaya luasnya bisa dihitung seperti persegi panjang?",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2C", 13, W.ungu)),
      tambah("segitiga.", ...bangunBerpetak("sg", X1, Y1, 4, 4, SEG1.asal, W.muda), nama("sga", X1 - 9, Y1 + 90, "A"), nama("sgb", X1 + 89, Y1 + 90, "B"), nama("sgc", X1 - 9, Y1 - 2, "C")),
      tambah("Pertanyaannya,", ...kartu("sgq", 138, 70, 150, 56, W.krem, ["dapatkah diubah menjadi", "persegi panjang?"], 9)),
    ),
    k(
      "Perhatikan segitiga ABC. Alasnya AB panjangnya 4 satuan. Tingginya AC, juga 4 satuan.",
      hapus(0, "sgq-k", "sgq-t0", "sgq-t1"),
      tambah("Alasnya", garis("sgal", X1, Y1 + 80, 80, 0, W.merah, 3.4), ket("sgk1", 84, "alas AB = 4 satuan", W.merah)),
      tambah("Tingginya", garis("sgti", X1, Y1, 0, 80, W.hijau, 3.4), ket("sgk2", 108, "tinggi AC = 4 satuan", W.hijau)),
    ),
    k(
      "Potong sebagian dari daerah segitiga, yaitu bagian atas setinggi separuh tinggi, lalu pindahkan ke sisi yang lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Potong dan pindahkan", 13, W.ungu), poli("sg-bw", X1, Y1, SEG1.bawah, W.muda), poli("sg-ps", X1, Y1, SEG1.atas, W.jeruk), kisi("sg-g", X1, Y1, 4, 4)),
      tambah("setinggi", potong("sgcut", X1, Y1 + 40, 40, 0)),
      ubah("pindahkan", { id: "sg-ps", d: lintasan(SEG1.baru) }),
    ),
    k(
      "Terbentuk persegi panjang. Tidak ada bagian yang hilang, jadi luasnya tetap. Panjangnya 4 satuan, sama dengan alas. Lebarnya 2 satuan, setengah dari tinggi segitiga.",
      hapus(0, "sgcut"),
      tambah("Terbentuk", tepi("sg-hs", X1, Y1, SEG1.hasil)),
      tambah("Panjangnya", ket("sgk1", 100, "panjang 4 = alas", W.merah)),
      tambah("Lebarnya", ket("sgk2", 124, "lebar 2 = setengah tinggi", W.hijau)),
    ),
    k(
      "Perkirakan luas segitiga dengan membilang kotak satuan: 8 satuan luas. Hitung persegi panjangnya: 4 kali 2 sama dengan 8 satuan luas. Sama, karena luas tetap walau bentuk diubah.",
      hapus(0, "sgk1", "sgk2"),
      tambah("membilang", ket("sgk3", 90, "dibilang: 8 satuan luas", W.ungu)),
      tambah("Hitung", teks("sgk4", 218, 128, "4 x 2 = 8", 20, W.hijau)),
      tambah("Sama,", ket("sgk5", 158, "luas tetap, bentuk berubah", W.biru)),
    ),
    k(
      "Jadi luas segitiga sama dengan luas persegi panjang, yaitu panjang kali lebar. Panjang sama dengan alas, lebar sama dengan setengah tinggi. Dengan angka, setengah kali 4 kali 4 sama dengan 8 satuan luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Luas segitiga", 13, W.ungu), poli("sg-bg", X1, Y1, SEG1.asal, W.muda), kisi("sg-g", X1, Y1, 4, 4)),
      tambah("Jadi", ket("r1", 70, "luas segitiga", W.biru), ket("r2", 88, "= luas persegi panjang", W.biru)),
      tambah("panjang@2", ket("r3", 106, "= panjang x lebar", W.merah)),
      tambah("setengah", ket("r4", 124, "= alas x setengah tinggi", W.hijau)),
      tambah("angka,", ket("r5", 150, "alas 4, tinggi 4", W.ungu)),
      tambah("8", ket("r6", 170, "luas = 8 satuan luas", W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Segitiga model 2: PQR (hlm. 149-150; Panduan Guru hlm. 211-213) ------------------------------ */
export const ADEGAN_SEGITIGA_2: AdeganStory = {
  id: "segitiga-2",
  judul: "Ayo mencoba lagi: segitiga PQR (alas 5, tinggi 4)",
  sumber: "Buku Siswa hlm. 149–150; Buku Panduan Guru hlm. 211–213",
  latar: "#FEF2F2",
  kutipan: ["Ayo mencoba lagi", "Hitunglah luas daerah segitiga", "Dengan menggunakan kertas", "Luas = 1", "Luas daerah segitiga", "dihitung dengan cara", "mengalikan panjang", "alas dengan separuh"],
  ketukan: [
    k(
      "Ayo mencoba lagi. Hitung luas segitiga PQR. Alasnya PQ dan tingginya RO. Dengan kertas lipat, segitiga ini kita ubah menjadi persegi panjang.",
      tambah(0, teks("jud", 150, 24, "Segitiga PQR", 13, W.ungu)),
      tambah("segitiga", ...bangunBerpetak("sh", X1, Y1, 5, 4, SEG2.asal, W.langitMuda), nama("shp", X1 - 9, Y1 + 90, "P"), nama("shq", X1 + 109, Y1 + 90, "Q"), nama("shr", X1 + 40, Y1 - 4, "R"), nama("sho", X1 + 40, Y1 + 90, "O")),
      tambah("Alasnya", garis("shal", X1, Y1 + 80, 100, 0, W.merah, 3.4)),
      tambah("tingginya", garis("shti", X1 + 40, Y1, 0, 80, W.hijau, 3.4, { putus: true })),
    ),
    k(
      "Alas PQ panjangnya 5 satuan. Tinggi RO panjangnya 4 satuan. Potong bagian atas setinggi separuh tinggi menjadi dua potongan, lalu pindahkan ke sisi yang lain.",
      hapus(0, "shal", "shti"),
      tambah("Alas", ket("shk1", 84, "alas PQ = 5 satuan", W.merah, 160), ket("shk2", 104, "tinggi RO = 4 satuan", W.hijau, 160)),
      hapus("Potong", "sh-bg", "sh-g"),
      tambah("Potong", poli("sh-bw", X1, Y1, SEG2.bawah, W.langitMuda), poli("sh-p1", X1, Y1, SEG2.kiri, W.jeruk), poli("sh-p2", X1, Y1, SEG2.kanan, W.ungMuda), kisi("sh-g2", X1, Y1, 5, 4), potong("shcut", X1 + 10, Y1 + 40, 80, 0)),
      ubah("pindahkan", { id: "sh-p1", d: lintasan(SEG2.kiriBaru) }, { id: "sh-p2", d: lintasan(SEG2.kananBaru) }),
    ),
    k(
      "Terbentuk persegi panjang. Panjangnya 5 satuan, sama dengan alas. Lebarnya 2 satuan, separuh tinggi segitiga. Tidak ada bagian yang hilang, jadi luasnya tetap.",
      hapus(0, "shcut", "shk1", "shk2"),
      tambah("Terbentuk", tepi("sh-hs", X1, Y1, SEG2.hasil)),
      tambah("Panjangnya", ket("shk3", 84, "panjang 5 = alas", W.merah, 160)),
      tambah("Lebarnya", ket("shk4", 104, "lebar 2 = separuh tinggi", W.hijau, 160)),
    ),
    k(
      "Luas segitiga sama dengan luas persegi panjang, yaitu panjang kali lebar, sama dengan alas kali setengah tinggi. Angkanya: setengah kali 5 kali 4 sama dengan 10 satuan luas.",
      hapus(0, "shk3", "shk4"),
      tambah("kali@2", ket("shk5", 78, "luas = panjang x lebar", W.biru, 160), ket("shk6", 98, "= alas x setengah tinggi", W.hijau, 160)),
      tambah("Angkanya:", ket("shk7", 124, "alas 5, tinggi 4", W.ungu, 160), teks("shk8", 228, 154, "5 x 2 = 10", 17, W.hijau)),
      tambah("10", ket("shk9", 178, "luas = 10 satuan luas", W.hijau, 160)),
    ),
    k(
      "Rumusnya, luas segitiga sama dengan setengah kali alas kali tinggi. Luas segitiga dihitung dengan mengalikan panjang alas dengan separuh tingginya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus luas segitiga", 13, W.ungu)),
      tambah("Rumusnya,", ...kartu("rm", 20, 42, 260, 44, W.krem, ["Luas = 1/2 x alas x tinggi"], 15)),
      tambah("setengah", poli("rg-bg", 40, 100, [[0, 3], [4, 3], [1, 0]], W.langitMuda), teks("rga", 80, 176, "alas", 9.4, W.merah), teks("rgt", 66, 136, "tinggi", 9.4, W.hijau, { anchor: "start" })),
      tambah("separuh", garis("rgl", 60, 100, 0, 60, W.hijau, 2.2, { putus: true }), ...kartu("rn", 170, 112, 112, 52, W.hijauMuda, ["alas dikali", "separuh tinggi"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 5.2D: jajargenjang (hlm. 150-152; Panduan Guru hlm. 213-216) ------------------------------ */
const Y2 = 74;

export const ADEGAN_JAJARGENJANG: AdeganStory = {
  id: "jajargenjang",
  judul: "Eksplorasi 5.2D: luas jajargenjang",
  sumber: "Buku Siswa hlm. 150–152; Buku Panduan Guru hlm. 213–216",
  latar: "#F0F9FF",
  kutipan: ["Ayo Menemukan Luas Daerah Jajargenjang", "Bangun apakah itu", "Luas jajargenjang tetap, walaupun diubah bentuknya", "Luas = alas", "dihitung dengan cara mengalikan panjang"],
  ketukan: [
    k(
      "Eksplorasi 5.2D, menemukan luas daerah jajargenjang. Perhatikan jajargenjang ABCD. Alas AB panjangnya 4 satuan, tinggi DO panjangnya 2 satuan.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2D", 13, W.ungu)),
      tambah("jajargenjang.", ...bangunBerpetak("jj", X1, Y2, 5, 2, JJG.asal, W.langitMuda), nama("jja", X1 - 9, Y2 + 52, "A"), nama("jjb", X1 + 89, Y2 + 52, "B"), nama("jjc", X1 + 109, Y2 - 4, "C"), nama("jjd", X1 + 16, Y2 - 4, "D"), nama("jjo", X1 + 20, Y2 + 52, "O")),
      tambah("Alas", garis("jjal", X1, Y2 + 40, 80, 0, W.merah, 3.4), ket("jjk1", 92, "alas AB = 4 satuan", W.merah, 160)),
      tambah("tinggi", garis("jjti", X1 + 20, Y2, 0, 40, W.hijau, 3.4, { putus: true }), ket("jjk2", 114, "tinggi DO = 2 satuan", W.hijau, 160)),
    ),
    k(
      "Potong segitiga AOD di ujung kiri, lalu pindahkan ke sisi yang lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Potong dan pindahkan", 13, W.ungu), poli("jj-bw", X1, Y2, JJG.sisa, W.langitMuda), poli("jj-ps", X1, Y2, JJG.potong, W.jeruk), kisi("jj-g", X1, Y2, 5, 2)),
      tambah("ujung", potong("jjcut", X1 + 20, Y2, 0, 40)),
      ubah("pindahkan", { id: "jj-ps", d: lintasan(JJG.baru) }),
    ),
    k(
      "Terbentuk persegi panjang. Tidak ada bagian yang hilang, jadi luasnya tetap. Panjangnya 4 satuan sama dengan alas, lebarnya 2 satuan sama dengan tinggi jajargenjang.",
      hapus(0, "jjcut"),
      tambah("Terbentuk", tepi("jj-hs", X1, Y2, JJG.hasil)),
      tambah("Panjangnya", ket("jjk1", 92, "panjang 4 = alas", W.merah, 160)),
      tambah("lebarnya", ket("jjk2", 114, "lebar 2 = tinggi", W.hijau, 160)),
    ),
    k(
      "Perkiraan dengan membilang petak: 8 satuan luas. Hitung persegi panjangnya: 4 kali 2 sama dengan 8 satuan luas. Hasilnya sama.",
      hapus(0, "jjk1", "jjk2"),
      tambah("Perkiraan", ket("jjk3", 92, "dibilang: 8 satuan luas", W.ungu, 160)),
      tambah("Hitung", teks("jjk4", 228, 128, "4 x 2 = 8", 20, W.hijau)),
      tambah("Hasilnya", ket("jjk5", 160, "luasnya sama", W.biru, 160)),
    ),
    k(
      "Jadi luas jajargenjang sama dengan alas kali tinggi. Luas jajargenjang dihitung dengan mengalikan panjang alas dengan tingginya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus luas jajargenjang", 13, W.ungu)),
      tambah("Jadi", ...kartu("jr", 40, 42, 220, 44, W.krem, ["Luas = alas x tinggi"], 15)),
      tambah("mengalikan", poli("jf-bg", 50, 108, [[1, 0], [5, 0], [4, 2], [0, 2]], W.langitMuda), teks("jfa", 90, 164, "alas", 9.4, W.merah), garis("jft", 70, 108, 0, 40, W.hijau, 2.2, { putus: true }), teks("jfl", 64, 132, "tinggi", 9.4, W.hijau, { anchor: "end" })),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 5.2E: trapesium (hlm. 152-154; Panduan Guru hlm. 216-220) ------------------------------ */
const Y3 = 66;

export const ADEGAN_TRAPESIUM: AdeganStory = {
  id: "trapesium",
  judul: "Eksplorasi 5.2E: luas trapesium",
  sumber: "Buku Siswa hlm. 152–154; Buku Panduan Guru hlm. 216–220",
  latar: "#FDF4FF",
  kutipan: ["Ayo Menemukan Luas Daerah Trapesium", "Kalian sudah bisa mencari luas jajargenjang", "Manakah sisi alasnya", "Alasnya tampak lebih panjang", "Luas trapesium tetap, walaupun diubah bentuknya", "Tinggi persegi panjang = setengah"],
  ketukan: [
    k(
      "Eksplorasi 5.2E, menemukan luas daerah trapesium. Kita sudah bisa mencari luas jajargenjang, jadi trapesium akan kita ubah menjadi jajargenjang. Perhatikan trapesium ABCD.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2E", 13, W.ungu)),
      tambah("trapesium", ...bangunBerpetak("tp", X1, Y3, 5, 2, TRAP.asal, W.krem), nama("tpa", X1 - 9, Y3 + 52, "A"), nama("tpb", X1 + 109, Y3 + 52, "B"), nama("tpc", X1 + 69, Y3 - 4, "C"), nama("tpd", X1 + 29, Y3 - 4, "D")),
      tambah("jajargenjang,", ...kartu("tpq", 152, 70, 138, 52, W.hijauMuda, ["ubah menjadi", "jajargenjang"], 9.4)),
    ),
    k(
      "Sisi alasnya AB panjangnya 5 satuan. Sisi atasnya DC panjangnya 2 satuan. Tingginya DO panjangnya 2 satuan.",
      hapus(0, "tpq-k", "tpq-t0", "tpq-t1"),
      tambah("alasnya", garis("tpal", X1, Y3 + 40, 100, 0, W.merah, 3.4), ket("tpk1", 84, "sisi alas AB = 5 satuan", W.merah, 150)),
      tambah("atasnya", garis("tpat", X1 + 20, Y3, 40, 0, W.ungu, 3.4), ket("tpk2", 104, "sisi atas DC = 2 satuan", W.ungu, 150)),
      tambah("Tingginya", garis("tpti", X1 + 20, Y3, 0, 40, W.hijau, 3.4, { putus: true }), ket("tpk3", 124, "tinggi DO = 2 satuan", W.hijau, 150), nama("tpo", X1 + 20, Y3 + 52, "O")),
    ),
    k(
      "Potong bagian atas setinggi separuh tinggi, putar setengah putaran, lalu tempelkan di sisi yang lain.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Potong, putar, tempel", 13, W.ungu), poli("tp-bw", X1, Y3, TRAP.bawah, W.krem), poli("tp-ps", X1, Y3, TRAP.atas, W.jeruk), kisi("tp-g", X1, Y3, 8, 2)),
      tambah("setinggi", potong("tpcut", X1 + 10, Y3 + 20, 70, 0)),
      ubah("tempelkan", { id: "tp-ps", d: lintasan(TRAP.baru) }),
    ),
    k(
      "Terbentuk jajargenjang. Tidak ada bagian yang hilang, luasnya tetap. Alasnya tampak lebih panjang, 7 satuan, dari jumlah sisi alas dan sisi atas. Tingginya 1 satuan, setengah tinggi trapesium.",
      hapus(0, "tpcut"),
      tambah("Terbentuk", tepi("tp-hs", X1, Y3, TRAP.hasil)),
      tambah("Alasnya", ket("tpk4", 124, "alas jajargenjang = 7 satuan", W.merah, 30), ket("tpk5", 144, "5 + 2 = 7", W.ungu, 30)),
      tambah("Tingginya", ket("tpk6", 164, "tinggi = 1 satuan, 2 : 2 = 1", W.hijau, 30)),
    ),
    k(
      "Perkiraan dengan membilang petak: 7 satuan luas. Luas jajargenjang sama dengan alas kali tinggi, yaitu 7 kali 1 sama dengan 7 satuan luas. Sama dengan trapesium mula-mula.",
      hapus(0, "tpk4", "tpk5", "tpk6"),
      tambah("Perkiraan", ket("tpk7", 126, "dibilang: 7 satuan luas", W.ungu, 30)),
      tambah("yaitu", teks("tpk8", 100, 160, "7 x 1 = 7", 20, W.hijau)),
      tambah("mula-mula.", ket("tpk9", 184, "luasnya sama dengan trapesium", W.biru, 30)),
    ),
    k(
      "Jadi luas trapesium sama dengan setengah kali jumlah sisi atas dan sisi alas, kali tinggi. Angkanya: 5 tambah 2 sama dengan 7, setengah dari 2 adalah 1, lalu 7 kali 1 sama dengan 7 satuan luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Rumus luas trapesium", 13, W.ungu)),
      tambah("Jadi", ...kartu("tr", 14, 40, 272, 44, W.krem, ["Luas = 1/2 x (sisi atas + sisi alas) x tinggi"], 10.6)),
      tambah("Angkanya:", teks("ta1", 150, 118, "5 + 2 = 7", 20, W.biru)),
      tambah("setengah@2", teks("ta2", 150, 148, "2 : 2 = 1", 20, W.ungu)),
      tambah("lalu", teks("ta3", 150, 180, "7 x 1 = 7", 20, W.hijau)),
    ),
  ],
};
