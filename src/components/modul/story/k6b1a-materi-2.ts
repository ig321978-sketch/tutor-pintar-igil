import type { AdeganStory } from "./logika-story";
import { W, balon, ember, emo, frac, judul, kartu, kebunMangga, kotak, idBarisMangga, idLajur, lajur, panah, tabel, teks } from "./k6b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, warnai } from "./k6b1a-bantu";

const BESAR = "#0E7490";
const KECIL = "#EA580C";

/** Lima ember kecil atau besar berderet. */
const deretEmber = (id: string, x: number, y: number, jarak: number, warna: string, s: number) => Array.from({ length: 5 }, (_, i) => ember(`${id}${i}`, x + i * jarak, y, warna, s)).flat();

/* ------------------------------ 4. Permasalahan kebun Agam: ember besar dan ember kecil ------------------------------ */
export const ADEGAN_EKSPLORASI11A: AdeganStory = {
  id: "eksplorasi-11a",
  judul: "Ember besar dan ember kecil di kebun Agam",
  sumber: "Materi: ember besar dan ember kecil",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Agam membantu Ayah menyiram kebun dengan dua ember yang ukurannya berbeda. Satu ember besar dapat menyiram kebun seluas dua meter persegi.",
      tambah(0, judul("Permasalahan: dua ember")),
      tambah("dua", ember("eb", 48, 74, BESAR, 2.2), teks("ebt", 48, 118, "ember besar", 8.4, BESAR), ember("ek", 48, 150, KECIL, 1.4), teks("ekt", 48, 182, "ember kecil", 8.4, KECIL)),
      tambah("kebun", kotak("p1", 112, 44, 50, 50, "#BBF7D0", W.hijau, { rx: 3 }), kotak("p2", 166, 44, 50, 50, "#BBF7D0", W.hijau, { rx: 3 }), teks("p1t", 137, 74, "1 m²", 10, W.hijau), teks("p2t", 191, 74, "1 m²", 10, W.hijau)),
      tambah("dua@2", teks("p2m", 164, 118, "air 1 ember besar = 2 m²", 9.4, BESAR)),
    ),
    k(
      "Air satu ember kecil dapat menyiram tiga per lima meter persegi. Bayangkan kebun satu meter persegi dipotong menjadi lima lajur yang sama, lalu tiga lajur disiram.",
      bersih(0),
      tambah(0, judul("satu ember kecil")),
      tambah("Air", ember("ek", 50, 70, KECIL, 2), teks("ekt", 50, 112, "ember kecil", 8.4, KECIL)),
      tambah("tiga", frac("f35", 250, 92, 3, 5, 18, KECIL)),
      tambah("kebun", lajur("kb", 112, 40, 100, 15, 5), teks("kbt", 162, 138, "kebun 1 m²", 9, W.hijau)),
      warnai("disiram", W.daun, ...idLajur("kb", 2, 4)),
    ),
    k(
      "Pertanyaannya, berapa luas kebun yang dapat disirami kalau Agam memakai lima ember besar dan lima ember kecil?",
      bersih(0),
      tambah(0, judul("Pertanyaan permasalahan")),
      tambah("lima", kartu("pb", 14, 36, 132, 80, "#CFFAFE", ["5 ember besar"], 9.6, { rx: 10 }), deretEmber("mb", 34, 56, 20, BESAR, 0.9)),
      tambah("lima@2", kartu("pk", 154, 36, 132, 80, "#FFEDD5", ["5 ember kecil"], 9.6, { rx: 10 }), deretEmber("mk", 174, 56, 20, KECIL, 0.9)),
      tambah("luas", teks("lq", 150, 152, "luas kebun masing-masing?", 11, W.merah), emo("lqe", 150, 186, "❓", 24)),
    ),
    k(
      "Sekarang kita mulai dari ember besar. Kalau Agam memakai air sebanyak lima ember besar, berapa luas kebun yang dapat disiram?",
      bersih(0),
      tambah(0, judul("lima ember besar")),
      tambah("lima", deretEmber("eb", 50, 70, 50, BESAR, 1.6)),
      tambah("berapa", ...Array.from({ length: 5 }, (_, i) => teks(`eb${i}t`, 50 + i * 50, 112, "2 m²", 9.4, BESAR))),
      tambah("luas", teks("lq", 150, 160, "berapa luas seluruhnya?", 11, W.merah)),
    ),
    k(
      "Kita isi tabel. Satu ember besar menyiram dua meter persegi. Lima ember berarti banyak ember dan luas kebun sama-sama dikali lima.",
      bersih(0),
      tambah(0, judul("tabel ember besar")),
      tambah("tabel", tabel("tb", 40, 36, 110, [["Banyak ember besar", "Luas kebun (m²)"], ["1", "2"], ["5", "?"]], 9, 26)),
      tambah("banyak", teks("x1", 20, 94, "×5", 13, W.merah)),
      tambah("luas", teks("x2", 280, 94, "×5", 13, W.merah)),
    ),
    k(
      "Jadi luas kebun yang disiram adalah lima kali dua, yaitu sepuluh meter persegi.",
      tambah("kali", teks("eq", 150, 152, "5 × 2 = 10 m²", 17, W.merah)),
      ubah("yaitu", { id: "tb-t21", isi: "10", warna: W.merah }),
      sorotkan("yaitu", "tb-s21"),
    ),
    k(
      "Sekarang lima ember kecil. Satu ember kecil menyiram tiga per lima meter persegi. Lima ember berarti tiga per lima ditambahkan sebanyak lima kali.",
      bersih(0),
      tambah(0, judul("lima ember kecil")),
      tambah("Satu", tabel("tb2", 40, 36, 110, [["Banyak ember kecil", "Luas kebun (m²)"], ["1", "3/5"], ["5", "?"]], 9, 26)),
      tambah("ditambahkan", teks("x1", 20, 94, "×5", 13, W.merah)),
      tambah("kali", teks("x2", 280, 94, "×5", 13, W.merah)),
    ),
    k(
      "Hasilnya lima kali tiga per lima, yaitu lima belas per lima, sama dengan tiga meter persegi.",
      tambah("yaitu", teks("eq", 150, 152, "5 × 3/5 = 15/5 = 3 m²", 15, W.merah)),
      ubah("sama", { id: "tb2-t21", isi: "3", warna: W.merah }),
      sorotkan("sama", "tb2-s21"),
    ),
    k(
      "Jadi lima ember besar menyiram sepuluh meter persegi, sedangkan lima ember kecil menyiram tiga meter persegi. Wajar saja, sebab ember besar memang lebih banyak airnya.",
      bersih(0),
      tambah(0, judul("dua ember dibandingkan")),
      tambah("besar", ...kartu("rb", 20, 40, 260, 40, "#CFFAFE", ["5 ember besar: 5 × 2 = 10 m²"], 9.4)),
      tambah("sedangkan", ...kartu("rk", 20, 96, 260, 40, "#FFEDD5", ["5 ember kecil: 5 × 3/5 = 3 m²"], 9.4)),
      tambah("Wajar", emo("rw", 150, 176, "💡", 30)),
    ),
  ],
};

/* ------------------------------ 5. Dua ember kecil dan aturan perkalian ------------------------------ */
export const ADEGAN_EKSPLORASI11B: AdeganStory = {
  id: "eksplorasi-11b",
  judul: "Dua ember kecil dan aturan perkaliannya",
  sumber: "Materi: dua ember kecil dan aturannya",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Sekarang Agam memakai dua ember kecil. Berapa luas kebun yang disiram? Dari tabel, satu ember kecil menyiram tiga per lima.",
      tambah(0, judul("dua ember kecil")),
      tambah("Dari", tabel("tb", 40, 44, 110, [["Banyak ember kecil", "Luas kebun (m²)"], ["1", "3/5"], ["2", "?"]], 9, 26)),
      tambah("luas", teks("x1", 20, 102, "×2", 13, W.merah), teks("x2", 280, 102, "×2", 13, W.merah)),
    ),
    k(
      "Kita gambar. Satu kotak penuh menggambarkan satu meter persegi, lalu dipotong menjadi lima lajur yang sama. Tiap lajur adalah satu per lima meter persegi.",
      bersih(0),
      tambah(0, judul("1 kotak penuh = 1 m²")),
      tambah("kotak", lajur("a", 100, 36, 100, 18, 5), teks("at", 150, 156, "1 m²", 11, W.hijau)),
      tambah("lajur", panah("ap", 250, 150, -42, -40, W.merah, 1.6, { gambar: true })),
      tambah("tiap", frac("ef", 258, 168, 1, 5, 13, W.merah), teks("em", 284, 172, "m²", 8, W.merah)),
    ),
    k(
      "Arsir tiga per lima meter persegi. Ada tiga lajur satu per lima, jadi ember kecil pertama menyiram tiga lajur.",
      bersih(0),
      tambah(0, judul("ember kecil pertama")),
      tambah(0, lajur("a", 100, 36, 100, 18, 5), teks("at", 150, 156, "ember kecil 1", 9.4, KECIL)),
      warnai("tiga", W.daun, ...idLajur("a", 2, 4)),
      tambah("tiga@2", teks("a3", 244, 100, "3 lajur", 10, W.hijau), frac("a35", 244, 126, 3, 5, 14, W.hijau)),
    ),
    k(
      "Ember kecil kedua juga menyiram tiga per lima. Kita arsir lagi tiga lajur pada kotak yang kedua.",
      bersih(0),
      tambah(0, judul("ember kecil kedua")),
      tambah(0, lajur("a", 36, 36, 100, 18, 5), lajur("b", 164, 36, 100, 18, 5)),
      warnai(0, W.daun, ...idLajur("a", 2, 4)),
      tambah("kedua", teks("at", 86, 156, "ember kecil 1", 9.4, KECIL), teks("bt", 214, 156, "ember kecil 2", 9.4, KECIL)),
      warnai("lagi", W.daun, ...idLajur("b", 2, 4)),
    ),
    k(
      "Totalnya ada enam lajur satu per lima. Dua kali tiga lajur sama dengan enam lajur.",
      tambah("Totalnya", teks("t6", 150, 182, "2 × 3 = 6 lajur", 13, W.merah)),
      sorotkan("Dua", ...idLajur("a", 2, 4), ...idLajur("b", 2, 4)),
    ),
    k(
      "Enam lajur satu per lima ditulis enam per lima. Maka dua kali tiga per lima sama dengan enam per lima meter persegi.",
      bersih(0),
      tambah(0, judul("hasil dua ember kecil")),
      tambah(0, ...frac("h6", 90, 80, 6, 5, 28, W.merah)),
      tambah("Maka", teks("eq", 150, 156, "2 × 3/5 = 6/5 m²", 18, W.biru)),
      tambah("meter", emo("ok", 230, 86, "✅", 40)),
    ),
    k(
      "Hati-hati, ada yang menulis enam per sepuluh karena melihat sepuluh lajur. Padahal pecahan satuannya satu per lima, jadi penyebutnya tetap lima.",
      bersih(0),
      tambah(0, judul("hati-hati, jangan keliru")),
      tambah("Ada", ...frac("sal", 90, 70, 6, 10, 24, W.merah), emo("x", 90, 126, "❌", 30), teks("sk", 90, 150, "10 lajur dari dua kotak", 8, W.merah)),
      tambah("Padahal", ...frac("ben", 210, 70, 6, 5, 24, W.hijau), emo("v", 210, 126, "✅", 30), teks("bk", 210, 150, "satuan: 1/5", 8.6, W.hijau)),
    ),
    k(
      "Di kelas lima kita sudah tahu, dua kali tiga per lima sama dengan tiga per lima ditambah tiga per lima, yaitu enam per lima.",
      bersih(0),
      tambah(0, judul("ingat kembali kelas lima")),
      tambah("kelas", teks("e1", 150, 70, "2 × 3/5 = 3/5 + 3/5 = 6/5", 15, W.biru)),
      tambah("ditambah", emo("pl", 150, 120, "➕", 28)),
      tambah("enam", teks("e2", 150, 170, "menggandakan pecahan satuan", 10, W.hijau)),
    ),
    k(
      "Aturannya begini. Untuk bilangan asli kali pecahan sejati, kalikan bilangan asli itu dengan pembilang, sedangkan penyebut dibiarkan seperti semula.",
      bersih(0),
      tambah(0, judul("aturan perkalian")),
      tambah("bilangan", teks("r1", 62, 94, "a ×", 20, W.biru), ...frac("r2", 112, 94, "b", "c", 20, W.biru)),
      tambah("sejati", teks("r3", 156, 94, "=", 20, W.biru), ...frac("r4", 210, 94, "a × b", "c", 20, W.merah)),
      tambah("penyebut", teks("r5", 150, 150, "penyebut tetap, pembilang dikali a", 10, W.hijau)),
    ),
    k(
      "Sekarang tantangan. Benarkah hasil kali bilangan asli dengan pecahan selalu lebih kecil? Coba lima kali satu per lima, hasilnya satu, dan itu lebih besar dari satu per lima.",
      bersih(0),
      tambah(0, judul("Tantangan: selalu lebih kecil?")),
      tambah("Coba", teks("c1", 150, 52, "5 × 1/5 = 1", 16, W.biru)),
      tambah("dari", kotak("bk", 40, 76, 24, 16, W.merah, W.biru, { rx: 2 }), teks("bkt", 52, 108, "1/5", 9, W.merah)),
      tambah("hasilnya", kotak("bb", 40, 124, 120, 16, W.hijau, W.biru, { rx: 2 }), teks("bbt", 100, 156, "1", 10, W.hijau)),
      tambah("lebih@2", teks("bn", 214, 138, "lebih besar", 11, W.hijau)),
      tambah("besar", emo("pt", 250, 96, "💡", 28)),
    ),
    k(
      "Ternyata hasilnya malah lebih besar dari pecahan awalnya. Jadi pernyataan itu tidak benar.",
      bersih(0),
      tambah(0, judul("jawaban tantangan")),
      tambah("malah", ...frac("p1", 60, 80, 3, 5, 20, W.biru), teks("pk", 100, 86, "2 ×", 16, W.biru), ...frac("p2", 140, 80, 3, 5, 20, W.biru), teks("pn", 172, 86, "=", 16, W.biru), ...frac("p3", 206, 80, 6, 5, 20, W.merah)),
      tambah("tidak", emo("sx", 150, 150, "❌", 40), teks("sy", 150, 182, "bukan selalu lebih kecil", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Pohon mangga manalagi ------------------------------ */
const bagianMangga = (id: string, dari: number, sampai: number) => Array.from({ length: sampai - dari + 1 }, (_, i) => idBarisMangga(id, dari + i, 5)).flat();

export const ADEGAN_EKSPLORASI12: AdeganStory = {
  id: "eksplorasi-12",
  judul: "Pohon mangga manalagi di kebun Agam",
  sumber: "Materi: pohon mangga manalagi",
  latar: "#FEF3C7",
  ketukan: [
    k(
      "Sekarang pohon mangga. Agam punya lima belas pohon mangga. Dua pertiga di antaranya adalah mangga manalagi. Berapa banyak pohon manalagi?",
      tambah(0, judul("pohon mangga Agam")),
      tambah("belas", kebunMangga("m", 80, 36, 5, 3, 28), teks("mt", 150, 140, "15 pohon mangga", 11, W.coklat)),
      tambah("Dua", ...frac("f", 150, 176, 2, 3, 14, W.merah), teks("ft", 218, 178, "yang manalagi", 9.4, W.merah)),
    ),
    k(
      "Gambarlah semua pohon mangga. Ada tiga baris pohon, dan setiap baris berisi lima pohon.",
      tambah("tiga", teks("br", 150, 162, "3 baris, tiap baris 5 pohon", 10.4, W.biru)),
      hapus("baris", "f-a", "f-g", "f-b", "ft"),
      sorotkan("baris", ...idBarisMangga("m", 0, 5)),
    ),
    k(
      "Dua pertiga berarti pohon dikelompokkan menjadi tiga kelompok sama banyak, lalu diambil dua kelompok. Tiap kelompok berisi lima pohon.",
      bersih(0),
      tambah(0, judul("dua pertiga dari 15 pohon")),
      tambah(0, kebunMangga("m", 80, 36, 5, 3, 28)),
      warnai("dikelompokkan", "#FEF08A", ...bagianMangga("m", 0, 0)),
      warnai("sama", "#BBF7D0", ...bagianMangga("m", 1, 1)),
      warnai("lalu", "#BFDBFE", ...bagianMangga("m", 2, 2)),
      tambah("Tiap", teks("e3", 150, 150, "tiap kelompok 5 pohon", 14, W.biru), teks("e2", 150, 172, "diambil 2 kelompok", 11, W.merah)),
    ),
    k(
      "Dua kelompok berisi dua kali lima, yaitu sepuluh pohon. Jadi ada sepuluh pohon mangga manalagi.",
      warnai("Dua", "#FCA5A5", ...bagianMangga("m", 0, 1)),
      tambah("kali", teks("e4", 150, 196, "2 × 5 = 10 pohon manalagi", 12, W.merah)),
    ),
    k(
      "Perkalian ini ditulis dua per tiga kali lima belas. Hasilnya tiga puluh per tiga, yaitu sepuluh.",
      bersih(0),
      tambah(0, judul("kalimat matematikanya")),
      tambah("Perkalian", teks("q1", 150, 76, "2/3 × 15", 22, W.biru)),
      tambah("Hasilnya", teks("q2", 150, 120, "= 30/3", 22, W.biru)),
      tambah("yaitu", teks("q3", 150, 164, "= 10", 26, W.merah)),
    ),
    k(
      "Jadi mengalikan pecahan dengan bilangan asli berarti mencari sebagian tertentu dari sekumpulan benda.",
      bersih(0),
      tambah(0, judul("arti perkalian pecahan dengan bilangan asli")),
      tambah("mengalikan", ...kartu("ar1", 40, 40, 220, 40, "#DBEAFE", ["pecahan × bilangan asli"], 11)),
      tambah("mencari", ...kartu("ar2", 40, 100, 220, 54, "#DCFCE7", ["sebagian tertentu dari", "sekumpulan benda"], 10)),
    ),
    k(
      "Aturannya: kalikan pembilang pecahan dengan bilangan asli, kemudian penyebut dibiarkan seperti semula.",
      bersih(0),
      tambah(0, judul("aturan perkalian")),
      tambah("kalikan", ...frac("r1", 70, 90, "a", "c", 20, W.biru), teks("r2", 108, 96, "× b =", 20, W.biru)),
      tambah("kemudian", ...frac("r3", 200, 90, "a × b", "c", 20, W.merah)),
      tambah("dibiarkan", teks("r4", 150, 156, "penyebut dibiarkan", 11, W.hijau)),
    ),
    k(
      "Sekarang coba hitung delapan kali tiga per empat dan tiga per empat kali delapan. Keduanya menghasilkan enam.",
      bersih(0),
      tambah(0, judul("coba bandingkan dua hitungan")),
      tambah("delapan", teks("b1", 150, 66, "8 × 3/4 = 24/4 = 6", 17, W.biru)),
      tambah("kali@2", teks("b2", 150, 112, "3/4 × 8 = 24/4 = 6", 17, W.biru)),
      tambah("Keduanya", emo("ok", 150, 170, "✅", 34)),
    ),
    k(
      "Hasilnya sama, jadi urutan kali boleh ditukar. Bilangan asli kali pecahan dan pecahan kali bilangan asli nilainya sama.",
      bersih(0),
      tambah(0, judul("urutan boleh ditukar")),
      tambah("sama", ...kartu("u1", 20, 44, 112, 46, "#FEF9C3", ["8 × 3/4"], 14), teks("us", 150, 74, "=", 22, W.merah), ...kartu("u2", 168, 44, 112, 46, "#FEF9C3", ["3/4 × 8"], 14)),
      tambah("ditukar.", panah("ut", 76, 108, 148, 0, W.hijau, 2, { gambar: true }), teks("utt", 150, 132, "tukar tempat", 10, W.hijau)),
      tambah("nilainya", balon("bn", 150, 150, ["hasilnya sama: 6"], 130, W.putih, 9)),
    ),
  ],
};
