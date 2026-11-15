import type { AdeganStory } from "./logika-story";
import { OWL, W, baris, batang, deret, emo, judul, kartu, kartuAngka, kotak, pasangGaris, teks, type Titik } from "./k1b6A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b6A-bantu";
import { BARIS_ATAS, BARIS_BAWAH, nama } from "./k1b6A-materi-1";
import { BX, BY_A, BY_B } from "./k1b6A-materi-2";

/** Tiga kartu pilihan bilangan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
export const pilihanBil = (y: number, isi: string[]): ReturnType<typeof kartuAngka> => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 80, 34, 18));

/* ------------------------------ 11. Latihan 1: pasangkan kelereng ------------------------------ */
const SUARA_A1 = "Latihan satu. Ada delapan kelereng merah dan tujuh kelereng biru. Mari kita pasangkan satu per satu.";
const SUARA_A2 = "Sambungkan tiap kelereng biru dengan satu kelereng merah. Semua kelereng biru sudah punya pasangan.";
const SUARA_A3 = "Kelereng merah yang terakhir tidak punya pasangan. Itulah lebihnya. Berapa lebihnya? Pilih satu kartu.";
const SUARA_A4 = "Lebihnya satu. Cara menghitungnya, delapan dikurangi tujuh sama dengan satu. Ketuk kartu satu.";
const SUARA_A5 = "Betul! Kelereng merah satu lebihnya. Delapan lebih dari tujuh. Hebat!";
export const PM: Titik[] = baris(8, BARIS_ATAS, 30, 34);
export const PBI: Titik[] = baris(7, BARIS_BAWAH, 30, 34);
export const GARIS_LAT1 = pasangGaris("la", PBI.map((p) => p.x), BARIS_ATAS, BARIS_BAWAH, 8);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: pasangkan kelereng",
  sumber: "Materi: latihan memasangkan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1")),
      tambah("delapan", ...deret("kelereng", "m", PM, 8, { warna: "#EF4444" })),
      tambah("tujuh", ...deret("kelereng", "b", PBI, 8, { warna: "#3B82F6" })),
    ),
    k(SUARA_A2, tambah("Sambungkan", ...GARIS_LAT1)),
    k(SUARA_A3, sorotkan("terakhir", "m7"), tambah("lebihnya?", ...pilihanBil(152, ["1", "2", "3"]))),
    k(SUARA_A4, sorotkan("Ketuk", "c1-k"), redamkan(0, "m7"), tambah("delapan", teks("lt", 150, 140, "8 - 7 = 1", 11, W.merah))),
    k(SUARA_A5, hapus(0, "lt"), tambah("Betul!", emo("ok", 150, 140, "✅", 22)), tambah("Delapan", emo("ow", 262, 190, OWL, 20))),
  ],
};

/* ------------------------------ 12. Latihan 2: samakan batang ------------------------------ */
const SUARA_B1 = "Latihan dua. Batang pertama ada sembilan kotak. Batang kedua ada lima kotak. Berapa selisihnya?";
const SUARA_B2 = "Ketuk kotak kosong di batang kedua, sampai kedua batang sama panjang. Satu, dua, tiga, empat.";
const SUARA_B3 = "Ada empat kotak yang diwarnai. Itulah selisihnya. Sembilan dikurangi lima sama dengan empat.";
const SUARA_B4 = "Betul! Selisih sembilan dan lima adalah empat. Batang kedua kurang empat kotak.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: samakan dua batang",
  sumber: "Materi: latihan model batang",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah("pertama", nama("bl-a", BY_A + 9, "pertama"), ...batang("ba", BX, BY_A, 9, W.langit)), tambah("kedua", nama("bl-b", BY_B + 9, "kedua"), ...batang("bb", BX, BY_B, 5, W.pink))),
    k(
      SUARA_B2,
      ...urutBilangan(SUARA_B2, 1, 4, "panjang.").map((p, i) => tambah(p, kotak(`bx${i}`, BX + (5 + i) * 18, BY_B, 18, 18, W.emas, W.biru, { rx: 1, tebal: 1.3 }))),
    ),
    k(SUARA_B3, tambah("Itulah", teks("sk", 150, 140, "selisih: 4 kotak", 10, W.coklat)), tambah("Sembilan", ...kartu("mp", 70, 154, 160, 32, W.krem, ["9 - 5 = 4"], 13))),
    k(SUARA_B4, hapus(0, "sk"), tambah("Betul!", emo("ok", 262, 140, "✅", 22)), ubah("Selisih", { id: "mp-t0", warna: W.hijau })),
  ],
};

/* ------------------------------ 13. Latihan 3: lebihnya, mencari bilangan ------------------------------ */
const SUARA_C1 = "Latihan tiga. Malosi punya enam kelereng. Halim punya dua kelereng lebihnya dari Malosi. Berapa kelereng Halim?";
const SUARA_C2 = "Kalau diketahui lebihnya, kita menambah. Enam ditambah dua sama dengan delapan.";
const SUARA_C3 = "Pilih jawabannya. Ketuk kartu delapan. Betul! Halim punya delapan kelereng, lebihnya dua dari Malosi.";
const PMA: Titik[] = baris(6, 62, 48, 36);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: cari bilangan dari lebihnya",
  sumber: "Materi: latihan cerita lebihnya",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah("Malosi", nama("rn-a", 62, "Malosi")), tambah("enam", ...deret("kelereng", "ma", PMA, 8)), tambah("Berapa", ...kartu("hq", 80, 100, 140, 28, W.krem, ["kelereng Halim: ?"], 9.6))),
    k(SUARA_C2, hapus(0, "hq-k", "hq-t0"), tambah(idx(SUARA_C2, "Enam"), ...kartu("hp", 70, 100, 160, 32, W.emas, ["6 + 2 = 8"], 13))),
    k(SUARA_C3, tambah("Pilih", ...pilihanBil(150, ["7", "8", "9"])), sorotkan("Ketuk", "c2-k"), tambah("Betul!", emo("ok", 150, 196, "✅", 20))),
  ],
};

/* ------------------------------ 14. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Dua barisan benda kita pasangkan satu per satu. Yang tidak punya pasangan adalah lebihnya.";
const SUARA_Z2 = "Kita memakai kata lebih dari, kurang dari, lebihnya, dan kurangnya. Beda dan selisih artinya sama.";
const SUARA_Z3 = "Selisih dicari dengan mengurangi. Tujuh dikurangi enam sama dengan satu. Kamu pasti bisa melakukannya sendiri.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("pasangkan", ...kartu("p1", 14, 36, 272, 40, W.hijauMuda, ["pasangkan satu per satu,", "sisanya adalah lebihnya"], 9.4))),
    k(SUARA_Z2, tambah("Kita", ...kartu("p2", 14, 86, 272, 36, W.langit, ["lebih dari, kurang dari,", "beda, selisih"], 9.4))),
    k(SUARA_Z3, tambah("Selisih", ...kartu("p3", 14, 132, 272, 30, W.krem, ["besar - kecil = selisih"], 10))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
