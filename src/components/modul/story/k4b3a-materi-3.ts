import type { AdeganStory } from "./logika-story";
import { APEL_BARIS, APEL_KUNCI, APEL_PILIHAN, KUNCI_LATIHAN, UBIN_PETA, W, barisTabel, cincin, deretAngka, deretSegitiga, emo, judul, kartu, kotak, panah, silang, teks, ubinBelah } from "./k4b3a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b3a-bantu";

const HIJAU_GELAP = "#166534";

/* ------------------------------ 9. Ayo Berlatih nomor 1 dan 2: semangka dan bola sepak (Buku Siswa hlm. 93; Panduan Guru hlm. 127) ------------------------------ */
const SUARA_L1 = "Ayo Berlatih, Latihan satu: tentukan banyak benda selanjutnya sesuai pola gambar yang diberikan. Panduan guru: pastikan murid menemukan polanya dulu, membesar atau mengecil, baru menghitung.";
const SUARA_L2 = "Nomor satu, semangka. Kumpulan pertama empat semangka, kumpulan kedua delapan, kumpulan ketiga dua belas. Semangka tersusun membentuk bingkai persegi yang makin besar.";
const SUARA_L3 = "Selisihnya empat dan empat, jadi pola membesar dengan tambah empat. Kumpulan keempat adalah dua belas ditambah empat, yaitu enam belas semangka. Kunci buku: enam belas.";
const SUARA_L4 = "Nomor dua, bola sepak. Satu bola, lalu lima bola dengan satu di tengah dan empat di sudut, lalu sembilan bola berbentuk silang. Selisihnya empat dan empat.";
const SUARA_L5 = "Karena tiap langkah menambah empat bola, kumpulan keempat berisi sembilan ditambah empat, yaitu tiga belas bola. Kunci buku: tiga belas.";

const RING_X = [20, 62, 118] as const;

export const ADEGAN_BERLATIH_SATU_DUA: AdeganStory = {
  id: "berlatih-satu-dua",
  judul: "Ayo Berlatih nomor 1 dan 2: semangka dan bola",
  sumber: "Buku Siswa hlm. 93; Panduan Guru hlm. 127",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Berlatih",
    "Latihan 1",
    "Tentukan banyak benda selanjutnya sesuai pola gambar yang diberikan !",
    "Pada tahap ini guru mengarahkan peserta didik untuk menyelesaikan masalah",
    "Pada soal nomor 1 sampai 4 peserta didik diminta untuk menentukan",
    "Sebelum menentukan banyak benda pastikan peserta didik menemukan pola gambar",
    "apakah membesar atau mengecil?",
    "1. Banyak buah selanjutnya sesuai",
    "pola gambar adalah 16",
    "2. Banyak bola selanjutnya sesuai",
    "pola gambar adalah 13",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1: benda selanjutnya")),
      tambah("tentukan", ...kartu("la", 14, 34, 272, 34, W.hijauMuda, ["tentukan banyak benda selanjutnya", "sesuai pola gambar"], 8.8)),
      tambah("pastikan", ...kartu("lb", 14, 78, 272, 34, W.langit, ["pastikan menemukan polanya dulu"], 9)),
      tambah("membesar", ...kartu("lc", 14, 122, 130, 34, W.krem, ["membesar?"], 9.4), ...kartu("ld", 156, 122, 130, 34, W.pink, ["mengecil?"], 9.4)),
      tambah("menghitung.", emo("le", 150, 184, "📝", 24)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Nomor 1: semangka")),
      tambah(idx(SUARA_L2, "empat"), ...cincin("sm1", RING_X[0], 70, 2, 12, 5, "#4ADE80", HIJAU_GELAP), teks("sa1", 26, 128, "4", 11, W.biru), teks("sb1", 26, 142, "kumpulan 1", 7.6, W.coklat)),
      tambah(idx(SUARA_L2, "delapan"), ...cincin("sm2", RING_X[1], 70, 3, 12, 5, "#4ADE80", HIJAU_GELAP), teks("sa2", 74, 128, "8", 11, W.biru), teks("sb2", 74, 142, "kumpulan 2", 7.6, W.coklat)),
      tambah(idx(SUARA_L2, "dua"), ...cincin("sm3", RING_X[2], 70, 4, 12, 5, "#4ADE80", HIJAU_GELAP), teks("sa3", 136, 128, "12", 11, W.biru), teks("sb3", 136, 142, "kumpulan 3", 7.6, W.coklat)),
      tambah("bingkai", teks("sq", 150, 168, "bingkai persegi yang makin besar", 9, W.coklat)),
    ),
    k(
      SUARA_L3,
      hapus("Selisihnya", "sq"),
      tambah("Selisihnya", teks("sd1", 52, 60, "+4", 10, W.merah), teks("sd2", 100, 60, "+4", 10, W.merah)),
      tambah("Kumpulan", ...cincin("sm4", 200, 70, 5, 12, 5, "#FDE047", W.coklat), teks("sb4", 224, 142, "kumpulan 4", 7.6, W.coklat)),
      tambah("ditambah", teks("sh", 150, 168, "12 + 4 = 16", 12, W.hijau)),
      tambah("enam", teks("sa4", 224, 128, "16", 11, W.biru)),
      tambah("Kunci", ...kartu("sk", 196, 148, 96, 18, W.emas, ["kunci buku: 16"], 7.8)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Nomor 2: bola sepak")),
      tambah(idx(SUARA_L4, "Satu"), ...silang("bl1", 36, 92, 0, 9, 4.5, W.putih, W.hitam), teks("ba1", 36, 140, "1", 11, W.biru), teks("bb1", 36, 154, "kumpulan 1", 7.6, W.coklat)),
      tambah(idx(SUARA_L4, "lima"), ...silang("bl2", 100, 92, 1, 9, 4.5, W.putih, W.hitam), teks("ba2", 100, 140, "5", 11, W.biru), teks("bb2", 100, 154, "kumpulan 2", 7.6, W.coklat)),
      tambah(idx(SUARA_L4, "sembilan"), ...silang("bl3", 178, 92, 2, 9, 4.5, W.putih, W.hitam), teks("ba3", 178, 140, "9", 11, W.biru), teks("bb3", 178, 154, "kumpulan 3", 7.6, W.coklat)),
      tambah("Selisihnya", teks("be1", 68, 60, "+4", 10, W.merah), teks("be2", 138, 60, "+4", 10, W.merah)),
    ),
    k(
      SUARA_L5,
      tambah("tiga", ...silang("bl4", 252, 92, 3, 9, 4.5, "#FDE047", W.hitam), teks("ba4", 252, 140, "13", 11, W.biru), teks("bb4", 252, 154, "kumpulan 4", 7.6, W.coklat)),
      tambah("sembilan", teks("bh", 150, 182, "9 + 4 = 13", 12, W.hijau)),
      tambah("Kunci", ...kartu("bk", 206, 40, 88, 20, W.emas, ["kunci buku: 13"], 7.8)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 3 dan 4: segitiga dan ubin (Buku Siswa hlm. 94; Panduan Guru hlm. 127–128) ------------------------------ */
const SUARA_T1 = "Nomor tiga, segitiga. Kumpulan pertama tujuh segitiga, kumpulan kedua lima, kumpulan ketiga tiga. Tiap deret berkurang dua segitiga.";
const SUARA_T2 = "Selisihnya kurang dua, jadi pola mengecil. Kumpulan keempat adalah tiga dikurangi dua, yaitu satu segitiga. Kunci buku: satu.";
const SUARA_T3 = "Nomor empat, ubin belah ketupat. Kumpulan pertama tiga belas ubin, kumpulan kedua sepuluh, kumpulan ketiga tujuh. Selisihnya tiga dan tiga.";
const SUARA_T4 = "Pola mengecil, tiap kumpulan berkurang tiga. Kumpulan keempat adalah tujuh dikurangi tiga, yaitu empat ubin. Kunci buku: empat, tersusun dua deret yang masing-masing dua ubin.";

const SEG_X = [8, 110, 190, 248] as const;
const UBIN_X = [8, 78, 148, 218] as const;

export const ADEGAN_BERLATIH_TIGA_EMPAT: AdeganStory = {
  id: "berlatih-tiga-empat",
  judul: "Ayo Berlatih nomor 3 dan 4: segitiga dan ubin",
  sumber: "Buku Siswa hlm. 94; Panduan Guru hlm. 127–128",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Berlatih",
    "Latihan 1",
    "Tentukan banyak benda selanjutnya sesuai pola gambar yang diberikan !",
    "Pada soal nomor 1 sampai 4 peserta didik diminta untuk menentukan",
    "3. Banyak segitiga selanjutnya sesuai pola gambar adalah 1",
    "4. Banyak ubin selanjutnya sesuai pola gambar adalah 4",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Nomor 3: segitiga")),
      tambah("tujuh", ...deretSegitiga("sg1", SEG_X[0], 70, 4, 22, 26, W.emas), teks("tj1", 52, 124, "7", 11, W.biru), teks("tl1", 52, 138, "kumpulan 1", 7.6, W.coklat)),
      tambah(idx(SUARA_T1, "lima"), ...deretSegitiga("sg2", SEG_X[1], 70, 3, 22, 26, W.emas), teks("tj2", 143, 124, "5", 11, W.biru), teks("tl2", 143, 138, "kumpulan 2", 7.6, W.coklat)),
      tambah(idx(SUARA_T1, "tiga", 2), ...deretSegitiga("sg3", SEG_X[2], 70, 2, 22, 26, W.emas), teks("tj3", 212, 124, "3", 11, W.biru), teks("tl3", 212, 138, "kumpulan 3", 7.6, W.coklat)),
      tambah("berkurang", teks("tm1", 100, 60, "−2", 10, W.merah), teks("tm2", 178, 60, "−2", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("pola", teks("tm3", 240, 60, "−2", 10, W.merah)),
      tambah("Kumpulan", ...deretSegitiga("sg4", SEG_X[3], 70, 1, 22, 26, W.emas), teks("tj4", 259, 124, "1", 11, W.biru), teks("tl4", 259, 138, "kumpulan 4", 7.6, W.coklat)),
      tambah("dikurangi", teks("th", 150, 176, "3 − 2 = 1", 12, W.hijau)),
      tambah("Kunci", ...kartu("tk", 100, 142, 100, 20, W.emas, ["kunci buku: 1"], 7.8)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Nomor 4: ubin belah ketupat")),
      tambah(idx(SUARA_T3, "tiga"), ...ubinBelah("ub1", UBIN_X[0], 50, UBIN_PETA[0], 10, 6, "#BAE6FD"), teks("uj1", 38, 104, "13", 11, W.biru), teks("ul1", 38, 118, "kumpulan 1", 7.6, W.coklat)),
      tambah("sepuluh,", ...ubinBelah("ub2", UBIN_X[1], 50, UBIN_PETA[1], 10, 6, "#BAE6FD"), teks("uj2", 108, 104, "10", 11, W.biru), teks("ul2", 108, 118, "kumpulan 2", 7.6, W.coklat)),
      tambah("tujuh.", ...ubinBelah("ub3", UBIN_X[2], 50, UBIN_PETA[2], 10, 6, "#BAE6FD"), teks("uj3", 178, 104, "7", 11, W.biru), teks("ul3", 178, 118, "kumpulan 3", 7.6, W.coklat)),
      tambah("Selisihnya", teks("um1", 74, 44, "−3", 10, W.merah), teks("um2", 144, 44, "−3", 10, W.merah)),
    ),
    k(
      SUARA_T4,
      tambah("berkurang", teks("um3", 214, 44, "−3", 10, W.merah)),
      tambah(idx(SUARA_T4, "kumpulan", 2), ...ubinBelah("ub4", UBIN_X[3], 50, UBIN_PETA[3], 10, 6, "#FDE047"), teks("uj4", 248, 104, "4", 11, W.biru), teks("ul4", 248, 118, "kumpulan 4", 7.6, W.coklat)),
      tambah("dikurangi", teks("uh", 150, 150, "7 − 3 = 4", 12, W.hijau)),
      tambah("Kunci", ...kartu("uk", 100, 164, 100, 20, W.emas, ["kunci buku: 4"], 7.8)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 5: mencocokkan kotak (Buku Siswa hlm. 94; Panduan Guru hlm. 127–128) ------------------------------ */
const SUARA_M1 = "Nomor lima: pilihlah salah satu gambar di kotak sebelah kanan untuk melengkapi kotak yang kosong di sebelah kiri, sesuai pola gambar. Panduan guru: murid mencocokkan kolom kanan dan kiri.";
const SUARA_M2 = "Baris pertama: dua, kosong, enam, delapan. Selisihnya dua, jadi yang kosong empat. Baris kedua: tiga, lima, kosong, sembilan, selisihnya dua, jadi yang kosong tujuh.";
const SUARA_M3 = "Baris ketiga: kosong, tiga, lima, tujuh, jadi yang kosong satu. Baris keempat: delapan, enam, empat, kosong, jadi yang kosong dua.";
const SUARA_M4 = "Jadi pasangannya: baris pertama dengan pilihan empat, baris kedua dengan tujuh, baris ketiga dengan satu, baris keempat dengan dua. Garis pada kunci panduan guru sama persis.";

const Y_BARIS = [38, 68, 98, 128] as const;
/** Jawaban kotak kosong tiap baris menurut hitungan mandiri (sama dengan pilihan kunci hlm. 128). */
export const JAWAB_KOSONG = [4, 7, 1, 2] as const;
const pilihan = () => APEL_PILIHAN.flatMap((n, i) => [kotak(`op${i}-k`, 216, Y_BARIS[i], 40, 22, W.krem, W.biru, { rx: 2, tebal: 1.2 }), teks(`op${i}-t`, 236, Y_BARIS[i] + 15, String(n), 9, W.biru)]);

export const ADEGAN_BERLATIH_LIMA: AdeganStory = {
  id: "berlatih-lima",
  judul: "Ayo Berlatih nomor 5: pasangkan kotak kosong",
  sumber: "Buku Siswa hlm. 94; Panduan Guru hlm. 127–128",
  latar: "#FEF2F2",
  kutipan: [
    "Ayo Berlatih",
    "5. Pilihlah salah satu gambar di kotak sebelah kanan untuk melengkapi kotak",
    "yang kosong di sebelah kiri, sesuai pola gambar yang diberikan.",
    "Pada soal nomor 5 peserta didik diarahkan untuk mencocokkan kolom",
    "kanan dan kiri sesuai pola gambar yang ada, baik itu pola gambar membesar",
    "5. Pilhan kotak yang sesuai untuk melengkapi kotak yang kosong adalah",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Nomor 5: lengkapi kotak kosong")),
      tambah("pilihlah", teks("mh1", 74, 30, "banyak apel tiap kotak", 7.8, W.coklat), teks("mh2", 236, 30, "pilihan", 7.8, W.coklat)),
      tambah("kiri,", ...APEL_BARIS.flatMap((b, r) => deretAngka(`ap${r}`, 10, Y_BARIS[r], b, 32, 22, W.krem, 9))),
      tambah("kanan", ...pilihan()),
    ),
    k(
      SUARA_M2,
      ubah(idx(SUARA_M2, "empat"), { id: "ap0-n1", isi: "4", warna: W.hijau }, { id: "ap0-s1", warna: W.hijauMuda }),
      ubah(idx(SUARA_M2, "tujuh"), { id: "ap1-n2", isi: "7", warna: W.hijau }, { id: "ap1-s2", warna: W.hijauMuda }),
      sorotkan("Baris", "ap0-s0"),
    ),
    k(
      SUARA_M3,
      ubah(idx(SUARA_M3, "satu"), { id: "ap2-n0", isi: "1", warna: W.hijau }, { id: "ap2-s0", warna: W.hijauMuda }),
      ubah(idx(SUARA_M3, "dua"), { id: "ap3-n3", isi: "2", warna: W.hijau }, { id: "ap3-s3", warna: W.hijauMuda }),
    ),
    k(
      SUARA_M4,
      ...[0, 1, 2, 3].map((r) => tambah(["pertama", "kedua", "ketiga", "keempat"][r], panah(`pj${r}`, 142, Y_BARIS[r] + 11, 72, Y_BARIS[APEL_KUNCI[r]] - Y_BARIS[r], [W.hijau, W.biruMuda, W.oranye, W.merahTua][r], 1.8))),
    ),
  ],
};

/* ------------------------------ 12. Diferensiasi, catatan temuan buku, dan ringkasan (Panduan Guru hlm. 124–129) ------------------------------ */
const SUARA_D1 = "Diferensiasi di panduan guru: murid beragam, ada yang cepat memahami, ada yang lambat, ada yang kreatif. Guru dapat meningkatkan motivasi, menciptakan suasana belajar yang nyaman dan kreatif, serta memilih model pembelajaran yang tepat.";
const SUARA_D2 = "Bentuk kelompok dengan kemampuan bervariasi, dan murid yang lebih mampu membantu temannya, disebut tutor sebaya. Murid yang cepat belajar diminta membuat pola gambar sendiri beserta cara menyelesaikannya, sementara guru mendampingi yang masih kesulitan.";
const SUARA_D3 = "Catatan: tujuan di buku menyebut membuat pola gambar, tetapi semua soal Ayo Berlatih hanya meminta menentukan. Kegiatan membuat baru muncul pada tugas murid cepat ini, jadi guru perlu menyiapkan latihan membuat pola sendiri.";
const SUARA_D4 = "Angka kunci panduan guru sesuai hitungan kita: enam belas semangka, tiga belas bola, satu segitiga, dan empat ubin. Pasangan nomor lima juga benar: empat, tujuh, satu, dan dua.";
const SUARA_D5 = "Tiga catatan kecil: blok pola mengecil membuka dengan kalimat tentang pola gambar membesar, kata pilihan tertulis pilhan, dan bagian pengalaman belajar menyalin kalimat dari subbab berikutnya.";
const SUARA_D6 = "Ringkasnya, pola gambar membesar bertambah dengan selisih tetap, dan pola gambar mengecil berkurang dengan selisih tetap. Temukan polanya dulu, hitung selisihnya, lalu tentukan benda selanjutnya.";

export const ADEGAN_DIFERENSIASI: AdeganStory = {
  id: "diferensiasi",
  judul: "Diferensiasi, catatan temuan buku, dan ringkasan",
  sumber: "Panduan Guru hlm. 124–129",
  latar: "#F5F3FF",
  kutipan: [
    "Diferensiasi",
    "Selama proses pembelajaran sering terjadi adanya keberagaman",
    "Meningkatkan motivasi peserta didik.",
    "Menciptakan suasana belajar yang nyaman dan kreatif.",
    "Memilih model pembelajaran yang tepat.",
    "(tutor sebaya)",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced),",
    "minta mereka untuk membuat pola gambar sendiri dan cara untuk",
    "Pada soal nomor 1 sampai 4 peserta didik diminta untuk menentukan",
    "5. Pilhan kotak yang sesuai untuk melengkapi kotak yang kosong adalah",
    "Banyak ilmuwan yang memanfaatkan pola bilangan untuk memprediksi fenomena alam",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Diferensiasi")),
      tambah("beragam,", emo("df1", 150, 62, "🧑", 28)),
      tambah("meningkatkan", ...kartu("df2", 14, 74, 272, 28, W.hijauMuda, ["meningkatkan motivasi murid"], 9)),
      tambah("menciptakan", ...kartu("df3", 14, 108, 272, 28, W.langit, ["suasana belajar nyaman dan kreatif"], 9)),
      tambah("memilih", ...kartu("df4", 14, 142, 272, 28, W.krem, ["model pembelajaran yang tepat"], 9)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Tutor sebaya dan murid cepat")),
      tambah("kelompok", ...kartu("dg1", 14, 34, 272, 32, W.hijauMuda, ["kelompok dengan kemampuan bervariasi"], 9)),
      tambah("tutor", ...kartu("dg2", 14, 74, 272, 32, W.langit, ["murid mampu membantu: tutor sebaya"], 9)),
      tambah("cepat", ...kartu("dg3", 14, 114, 272, 38, W.krem, ["murid cepat: membuat pola gambar", "sendiri beserta caranya"], 8.8)),
      tambah("mendampingi", ...kartu("dg4", 14, 158, 272, 30, W.pink, ["guru mendampingi yang kesulitan"], 9)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Catatan: tujuan membuat pola")),
      tambah("tujuan", ...kartu("dc1", 14, 34, 272, 40, W.hijauMuda, ["tujuan buku: menemukan", "dan membuat pola gambar"], 8.8)),
      tambah("hanya", ...kartu("dc2", 14, 82, 272, 40, W.merahMuda, ["semua soal Ayo Berlatih:", "hanya menentukan"], 8.8)),
      tambah("perlu", ...kartu("dc3", 14, 130, 272, 44, W.emas, ["guru menyiapkan latihan", "membuat pola sendiri"], 8.8)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Angka kunci sesuai hitungan")),
      tambah(0, ...barisTabel("dk0", 20, 28, [60, 120, 80], ["soal", "tiga kumpulan", "kunci"], 18, 8, true)),
      tambah("enam", ...barisTabel("dk1", 20, 46, [60, 120, 80], ["nomor 1", "4, 8, 12", String(KUNCI_LATIHAN.semangka)], 18, 8.6)),
      tambah("tiga", ...barisTabel("dk2", 20, 64, [60, 120, 80], ["nomor 2", "1, 5, 9", String(KUNCI_LATIHAN.bola)], 18, 8.6)),
      tambah("segitiga,", ...barisTabel("dk3", 20, 82, [60, 120, 80], ["nomor 3", "7, 5, 3", String(KUNCI_LATIHAN.segitiga)], 18, 8.6)),
      tambah("ubin.", ...barisTabel("dk4", 20, 100, [60, 120, 80], ["nomor 4", "13, 10, 7", String(KUNCI_LATIHAN.ubin)], 18, 8.6)),
      tambah("Pasangan", ...kartu("dk5", 20, 128, 260, 32, W.emas, ["nomor 5: kosong berisi 4, 7, 1, 2"], 9)),
      tambah("benar:", emo("dk6", 150, 184, "✅", 22)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Tiga catatan kecil")),
      tambah("blok", ...kartu("dn1", 14, 32, 272, 40, W.krem, ["pola mengecil dibuka dengan", "kalimat tentang pola membesar"], 8.6)),
      tambah("pilihan", ...kartu("dn2", 14, 80, 272, 30, W.pink, ["kata pilihan tertulis pilhan"], 8.8)),
      tambah("pengalaman", ...kartu("dn3", 14, 118, 272, 40, W.langit, ["pengalaman belajar menyalin", "kalimat dari subbab berikutnya"], 8.6)),
    ),
    k(
      SUARA_D6,
      bersih(0),
      tambah(0, judul("Ringkasan Subbab A")),
      tambah("membesar", ...kartu("dr1", 14, 34, 272, 36, W.hijauMuda, ["membesar: tambah selisih tetap"], 9)),
      tambah("mengecil", ...kartu("dr2", 14, 78, 272, 36, W.merahMuda, ["mengecil: kurang selisih tetap"], 9)),
      tambah("Temukan", ...kartu("dr3", 14, 122, 272, 44, W.emas, ["1. temukan pola  2. hitung selisih", "3. tentukan benda selanjutnya"], 8.8)),
      tambah("selanjutnya.", emo("dr4", 150, 184, "✅", 22)),
    ),
  ],
};
