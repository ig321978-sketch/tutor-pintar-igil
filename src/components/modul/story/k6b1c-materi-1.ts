import type { AdeganStory } from "./logika-story";
import { W, arsir, arsirPita, bulat, emo, kartu, kisi, kotak, panah, pecahan, pita, teks } from "./k6b1c-gambar";
import { bersih, k, tambah, ubah } from "./k6b1c-bantu";

/* ------------------------------ 1. Mengingat Kembali: Gambar 1.9 (hlm. 29 dan 30) ------------------------------ */
/** Satu kartu gambar sehari-hari: kotak kecil dengan emoji dan keterangan. */
const kecil = (id: string, x: number, y: number, e: string, ket: string, warna: string) => [kotak(`${id}-k`, x, y, 86, 62, warna, W.biru, { rx: 6 }), emo(`${id}-e`, x + 43, y + 30, e, 24), teks(`${id}-t`, x + 43, y + 55, ket, 7.2)];

export const ADEGAN_MENGINGAT: AdeganStory = {
  id: "mengingat-desimal",
  judul: "Mengingat Kembali bilangan desimal",
  sumber: "Buku Siswa hlm. 29–30",
  latar: "#F0F9FF",
  kutipan: [
    "Bagaimana cara kalian membagi pecahan dengan bilangan asli",
    "Bagaimana cara kalian membagi bilangan asli dengan pecahan",
    "C. Bilangan Desimal",
    "Mengubah Pecahan Menjadi Desimal",
    "Di jenjang sebelumnya, kalian sudah mempelajari tentang bilangan desimal",
    "gambar manakah yang menunjukkan bilangan desimal",
    "Gambar manakah yang menunjukkan nilai 0,5",
    "Gambarlah/arsirlah beberapa cara menunjukkan bilangan desimal 0,25",
  ],
  ketukan: [
    k(
      "Sub-Bab C membahas bilangan desimal. Dari Ayo Berefleksi sebelumnya: bagaimana cara membagi pecahan dengan bilangan asli, dan bilangan asli dengan pecahan?",
      tambah(0, teks("jud", 150, 26, "C. Bilangan Desimal", 15, W.ungu)),
      tambah("Refleksi", kartu("rf", 24, 44, 252, 44, W.krem, ["a. pecahan dibagi bilangan asli?", "b. bilangan asli dibagi pecahan?"], 9)),
      tambah("bagaimana", emo("rfe", 150, 130, "🤔", 32)),
    ),
    k(
      "Pertanyaan a: dari gambar-gambar ini, mana yang menunjukkan desimal? Ada lajur khusus, nilai gizi, cuka, obat, cara memasak, dan label diskon.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Gambar 1.9 sehari-hari", 11, W.ungu)),
      tambah("lajur", kecil("g1", 10, 30, "🚧", "lajur khusus", W.langit)),
      tambah("gizi", kecil("g2", 107, 30, "🍱", "nilai gizi", W.mint)),
      tambah("cuka", kecil("g3", 204, 30, "🍶", "cuka 25 persen", W.putih)),
      tambah("obat", kecil("g4", 10, 100, "💊", "botol obat", W.mawar)),
      tambah("memasak", kecil("g5", 107, 100, "🍚", "cara memasak", W.krem)),
      tambah("diskon", kecil("g6", 204, 100, "🏷️", "label diskon", W.putih)),
    ),
    k(
      "Botol obat menulis dosis anak 7,5 mililiter. Nilai gizi menulis karbohidrat 28,6 gram dan natrium 88,6 miligram. Bilangan berkoma seperti ini adalah desimal.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Bilangan berkoma adalah desimal", 12, W.ungu)),
      tambah("obat", kartu("ob", 14, 40, 128, 70, W.mawar, ["dosis", "Anak 7,5 ml"], 11)),
      tambah("Nilai", kartu("gz", 158, 40, 128, 70, W.mint, ["nilai gizi", "karbohidrat 28,6 g", "natrium 88,6 mg"], 8.6)),
      tambah("berkoma", panah("pk", 150, 160, 0, -26, W.merah, 2.5, { gambar: true }), teks("pkt", 150, 182, "tanda koma di antara angka", 9, W.merah)),
    ),
    k(
      "Pertanyaan b: gambar manakah yang menunjukkan nilai 0,5? Label diskon bertuliskan setengah. Setengah sama dengan 0,5.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Mana yang bernilai 0,5?", 12, W.ungu)),
      tambah("diskon", kotak("dk", 40, 44, 90, 90, "#FB923C", W.coklat, { rx: 8 }), pecahan("dkp", 85, 86, "1", "2", 22, W.putih), teks("dko", 85, 122, "OFF", 11, W.coklat)),
      tambah("Setengah", teks("sm", 200, 100, "= 0,5", 24, W.hijau)),
    ),
    k(
      "Pertanyaan c: gambarlah beberapa cara menunjukkan bilangan desimal 0,25. Cara pertama, arsir 25 dari 100 petak kecil pada persegi bernilai satu.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Gambarkan 0,25", 12, W.ungu)),
      tambah("persegi", kisi("kk", 24, 36, 120, 10, 10)),
      tambah("25", arsir("ar1", 24, 36, 120, 10, 10, 0, 0, 2, 10), arsir("ar2", 24, 36, 120, 10, 10, 2, 0, 1, 5)),
      tambah("petak", teks("kt", 84, 172, "25 dari 100 petak", 8.6, W.hijau), pecahan("kp", 214, 96, "25", "100", 18, W.hijau), teks("kd", 214, 142, "= 0,25", 16, W.hijau)),
    ),
    k(
      "Cara lain, bagi satu persegi menjadi empat bagian sama besar lalu arsir satu bagian. Seperempat sama dengan 25 per 100, yaitu 0,25.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Cara lain untuk 0,25", 12, W.ungu)),
      tambah("empat", pita("pt", 40, 40, 220, 50, 4)),
      tambah("arsir", arsirPita("pa", 40, 40, 220, 50, 4, 0, 1)),
      tambah("Seperempat", pecahan("pq", 70, 134, "1", "4", 20, W.biru), teks("pq2", 190, 140, "= 25/100 = 0,25", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Permasalahan timbangan dan Eksplorasi 1.5 bagian a (hlm. 30 sampai 33) ------------------------------ */
export const ADEGAN_TIMBANGAN: AdeganStory = {
  id: "timbangan-buah",
  judul: "Permasalahan timbangan buah dan Eksplorasi 1.5 bagian a",
  sumber: "Buku Siswa hlm. 30–33",
  latar: "#FFFBEB",
  kutipan: [
    "Agam diminta oleh ibunya untuk membeli beberapa jenis buah di toko buah langganannya",
    "Agam melihat tulisan di timbangan buah adalah 0,50 kg dan 0,20 kg",
    "Bantulah Agam membuktikan",
    "kg jeruk sama dengan 0,50 kg jeruk",
    "Masih adakah bentuk lainnya",
    "Apakah kedua bentuk desimal yang kalian temukan sama",
  ],
  ketukan: [
    k(
      "Permasalahan: Agam diminta ibunya membeli buah di toko buah langganan. Ibu menyuruh Agam membeli jeruk setengah kilogram dan salak seperlima kilogram.",
      tambah(0, emo("ag", 40, 120, "👦", 34), teks("agt", 40, 140, "Agam", 8)),
      tambah("jeruk", emo("je", 130, 80, "🍊", 30), pecahan("jp", 130, 124, "1", "2", 15), teks("jk", 154, 126, "kg", 9)),
      tambah("salak", bulat("sl", 230, 78, 14, "#92400E", "#78350F"), teks("slt", 230, 81, "salak", 6.4, W.putih), pecahan("sp", 230, 124, "1", "5", 15), teks("sk", 254, 126, "kg", 9)),
    ),
    k(
      "Di toko, timbangan menunjukkan 0,50 kilogram dan 0,20 kilogram. Apakah setengah sama dengan 0,50 dan seperlima sama dengan 0,20?",
      bersih(0),
      tambah("timbangan", kotak("tb1", 30, 40, 100, 50, "#1F2937", W.biru, { rx: 6 }), teks("tb1t", 80, 72, "0,50 KG", 17, "#4ADE80")),
      tambah("0,20", kotak("tb2", 170, 40, 100, 50, "#1F2937", W.biru, { rx: 6 }), teks("tb2t", 220, 72, "0,20 KG", 17, "#4ADE80")),
      tambah("setengah", pecahan("q1", 70, 130, "1", "2", 18), teks("q1t", 112, 134, "= 0,50 ?", 14, W.merah)),
      tambah("seperlima", pecahan("q2", 210, 130, "1", "5", 18), teks("q2t", 252, 134, "= 0,20 ?", 14, W.merah)),
    ),
    k(
      "Ayo bereksplorasi. Eksplorasi 1.5 bagian a: bantulah Agam membuktikan setengah kilogram jeruk sama dengan 0,50 kilogram. Mulai dengan persegi yang terbagi sepuluh lajur.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Eksplorasi 1.5 a: 1/2 kg jeruk", 12, W.ungu)),
      tambah("persegi", kisi("ks", 80, 36, 140, 10, 1)),
      tambah("lajur.", teks("ki", 150, 190, "satu persegi = 1, sepuluh lajur sama besar", 8.6)),
    ),
    k(
      "Arsir bagian setengah, yaitu lima lajur dari sepuluh lajur. Setengah sama dengan 5 per 10. Bentuk desimalnya adalah 0,5.",
      tambah("Arsir", arsir("as", 80, 36, 140, 10, 1, 0, 0, 5, 1)),
      tambah("lima", teks("l5", 115, 112, "5 lajur", 11, W.hijau)),
      tambah("sepuluh", pecahan("p510", 115, 150, "5", "10", 18, W.hijau)),
      tambah("desimalnya", teks("d5", 200, 156, "= 0,5", 20, W.hijau)),
    ),
    k(
      "Masih adakah bentuk lainnya? Ada. Arsir setengah pada persegi 100 petak, yaitu 10 kali 10.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Masih adakah bentuk lain?", 12, W.ungu)),
      tambah("persegi", kisi("kg", 20, 34, 130, 10, 10)),
      tambah("100", teks("sr", 85, 182, "100 petak", 9)),
    ),
    k(
      "Lima puluh petak diarsir, jadi setengah sama dengan 50 per 100. Bentuk desimalnya adalah 0,50.",
      tambah("Lima", arsir("ag1", 20, 34, 130, 10, 10, 0, 0, 5, 10)),
      tambah("sama", pecahan("p50", 214, 76, "50", "100", 20, W.hijau)),
      tambah("desimalnya", teks("d50", 214, 130, "= 0,50", 22, W.hijau)),
    ),
    k(
      "Apakah kedua bentuk desimal yang kalian temukan sama? Sama. Luas daerah yang diarsir sama besar, jadi 0,5 sama dengan 0,50.",
      tambah("sama", teks("sm", 212, 190, "0,5 = 0,50", 20, W.merah)),
      ubah("Luas", { id: "ag1", warna: W.jeruk }),
      tambah("daerah", teks("lu", 214, 160, "luas sama besar", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 1.5 bagian b dan pembahasan (hlm. 33 sampai 35) ------------------------------ */
export const ADEGAN_SEPERLIMA: AdeganStory = {
  id: "seperlima-pembahasan",
  judul: "Eksplorasi 1.5 bagian b dan pembahasan",
  sumber: "Buku Siswa hlm. 33–35",
  latar: "#F0FDF4",
  kutipan: [
    "Bantulah Agam membuktikan",
    "kg salak sama dengan 0,20 kg salak",
    "Bilangan pecahan dan bilangan desimal saling berkaitan",
    "Persegi di atas bernilai 1",
    "setiap bagian bernilai",
    "Dalam bentuk desimal bentuk ini dituliskan dengan 0,1",
    "Bagaimana kalian menjelaskan jika 0,10 sama dengan 0,1",
    "Pecahan dengan penyebut 2 dan 5 atau kelipatannya dapat diubah menjadi pecahan berpenyebut 10 dan 100",
    "Bagaimana mengubah pecahan yang penyebutnya tidak dapat diubah menjadi penyebut 10 dan 100 menjadi bentuk desimal",
    "Bagaimana kalian mengubah bentuk desimal menjadi bentuk pecahan",
  ],
  ketukan: [
    k(
      "Bagian b: bantulah Agam membuktikan seperlima kilogram salak sama dengan 0,20 kilogram. Arsir seperlima pada persegi yang dibagi sepuluh lajur.",
      tambah(0, teks("jud", 150, 22, "Eksplorasi 1.5 b: 1/5 kg salak", 12, W.ungu)),
      tambah("0,20", teks("tg", 150, 196, "1/5 kg = 0,20 kg ?", 10, W.merah)),
      tambah("persegi", kisi("ks", 80, 36, 140, 10, 1)),
      tambah("Arsir", arsir("as", 80, 36, 140, 10, 1, 0, 0, 2, 1, W.arsir2)),
    ),
    k(
      "Dua lajur dari sepuluh lajur diarsir. Jadi seperlima sama dengan 2 per 10, dan bentuk desimalnya adalah 0,2.",
      tambah("Dua", teks("l2", 108, 112, "2 lajur", 11, W.hijau)),
      tambah("seperlima", pecahan("p1", 70, 156, "1", "5", 16, W.biru), teks("pe", 96, 160, "=", 14), pecahan("p2", 124, 156, "2", "10", 16, W.hijau)),
      tambah("desimalnya", teks("d2", 200, 162, "= 0,2", 20, W.hijau)),
    ),
    k(
      "Masih ada bentuk lain. Pada persegi 100 petak, arsir 20 petak, yaitu 2 lajur penuh. Seperlima sama dengan 20 per 100, atau 0,20.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Bentuk lain dari 1/5", 12, W.ungu)),
      tambah("persegi", kisi("kg", 20, 34, 130, 10, 10)),
      tambah("20", arsir("ag1", 20, 34, 130, 10, 10, 0, 0, 2, 10, W.arsir2)),
      tambah("sama", pecahan("p20", 214, 76, "20", "100", 20, W.hijau)),
      tambah("atau", teks("d20", 214, 130, "= 0,20", 22, W.hijau)),
    ),
    k(
      "Pembahasan: pecahan dan desimal saling berkaitan. Persegi bernilai 1 dibagi 10 bagian sama besar, maka setiap bagian bernilai seperpuluh.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pecahan dan desimal berkaitan", 12, W.ungu)),
      tambah("Persegi", kisi("kq", 20, 34, 120, 10, 1), teks("n1", 80, 168, "persegi bernilai 1", 9)),
      tambah("setiap", arsir("ak", 20, 34, 120, 10, 1, 0, 0, 1, 1)),
      tambah("seperpuluh.", pecahan("pa", 200, 76, "1", "10", 20), teks("pb", 200, 126, "= 0,1", 22, W.hijau)),
    ),
    k(
      "Angka 1 pada 0,1 ada di tempat persepuluhan. Pada persegi 100 petak, 10 petak yang diarsir bernilai 10 per 100.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Satu persepuluhan", 12, W.ungu)),
      tambah("persepuluhan", teks("ps", 70, 62, "0,1", 22, W.hijau), teks("pst", 70, 82, "angka 1 di persepuluhan", 8)),
      tambah("persegi", kisi("kz", 160, 34, 120, 10, 10)),
      tambah("10", arsir("az", 160, 34, 120, 10, 10, 0, 0, 1, 10), pecahan("pc", 90, 140, "10", "100", 17, W.hijau)),
    ),
    k(
      "Jadi 10 per 100 adalah bentuk lain dari 1 per 10, yaitu 0,10 atau 0,1. Mengapa sama? Luas arsirannya sama.",
      tambah("Jadi", pecahan("pd1", 40, 186, "10", "100", 12, W.hijau), teks("pd2", 66, 190, "=", 12), pecahan("pd3", 90, 186, "1", "10", 12)),
      tambah("Bentuk", teks("pd4", 200, 190, "0,10 = 0,1", 16, W.merah)),
      tambah("Luas", teks("pd5", 90, 112, "arsirannya sama besar", 8.6, W.hijau)),
    ),
    k(
      "Ubah dulu penyebutnya menjadi 10 atau 100. Pecahan berpenyebut 2 dan 5, atau kelipatannya, dapat diubah ke penyebut 10 dan 100.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ubah penyebut jadi 10 atau 100", 12, W.ungu)),
      tambah("penyebutnya", kartu("c1", 16, 40, 118, 44, W.krem, ["penyebut 2, 5", "dan kelipatannya"], 9)),
      tambah("10", kartu("c2", 166, 40, 118, 44, W.mint, ["penyebut 10", "atau 100"], 9)),
      tambah("diubah", panah("cp", 134, 62, 28, 0, W.hijau, 2.5, { gambar: true })),
    ),
    k(
      "Dengan cara lain, setengah sama dengan 1 kali 5 per 2 kali 5, yaitu 5 per 10, jadi 0,5. Atau 1 kali 50 per 2 kali 50, yaitu 50 per 100, atau 0,50.",
      tambah("setengah", teks("e1", 76, 120, "1/2 = (1x5)/(2x5)", 8.6), teks("e2", 76, 138, "= 5/10 = 0,5", 11, W.hijau)),
      tambah("atau", teks("e3", 224, 120, "1/2 = (1x50)/(2x50)", 8.6), teks("e4", 224, 138, "= 50/100 = 0,50", 11, W.hijau), teks("e5", 224, 156, "= 0,5", 11, W.hijau)),
    ),
    k(
      "Ayo berpikir kritis. Bagaimana jika penyebutnya tidak dapat menjadi 10 atau 100? Panduan Guru menjawab: pembagian bersusun.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Ayo Berpikir Kritis", 13, W.merah)),
      tambah("penyebutnya", kartu("kr", 24, 40, 252, 44, "#FEE2E2", ["penyebut tidak bisa jadi 10 atau 100?", "contoh: 1/3"], 9)),
      tambah("Panduan", kartu("bg", 24, 98, 252, 44, W.mint, ["jawab: pembagian bersusun", "pembilang dibagi penyebut"], 9), emo("bs", 150, 184, "🧮", 26)),
    ),
    k(
      "Ayo berdiskusi. Desimal menjadi pecahan: tulis per 10 atau per 100 lalu sederhanakan, misalnya 0,2 sama dengan 2 per 10, yaitu 1 per 5.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Ayo Berdiskusi", 13, W.ungu)),
      tambah("desimal", teks("dd1", 150, 66, "0,2", 24, W.hijau)),
      tambah("tulis", pecahan("dd2", 90, 128, "2", "10", 20), teks("ddr", 124, 132, "=", 16), teks("dds", 90, 100, "tulis per 10", 8.4)),
      tambah("sederhanakan", pecahan("dd3", 190, 128, "1", "5", 20, W.hijau), teks("dds2", 190, 100, "disederhanakan", 8.4, W.hijau)),
    ),
  ],
};
