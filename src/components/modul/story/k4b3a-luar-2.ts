import type { AdeganStory } from "./logika-story";
import { KUNCI_LATIHAN, UBIN_PETA, W, barisTabel, cincinBagian, emo, judul, kartu, kotak, panah, silang, teks, ubinBelah } from "./k4b3a-gambar";
import { bersih, idx, k, tambah, ubah } from "./k4b3a-bantu";
import { NAMA_METODE, NAMA_METODE_ID } from "./k4b3a-luar-1";

const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Empat warna sisi untuk cincin yang dibagi empat bagian. */
export const WARNA_SISI = ["#4ADE80", "#60A5FA", "#FBBF24", "#F472B6"] as const;
const SATU_WARNA = ["#D1D5DB", "#D1D5DB", "#D1D5DB", "#D1D5DB"] as const;
/** Warnai tiap benda cincin kk kali kk menurut sisinya (kk - 1 benda per sisi). */
const warnaiSisi = (id: string, kk: number) => Array.from({ length: 4 * (kk - 1) }, (_, i) => ({ id: `${id}-o${i}`, warna: WARNA_SISI[Math.floor(i / (kk - 1))] }));

/* ------------------------------ 6. Visual Structure: konsep ------------------------------ */
const SUARA_V1 = "Metode ketiga, Visual Structure, atau Struktur Visual. Lihat kelompok bentuk pada gambar, bukan hanya menghitung satu per satu. Gagasan Gestalt: otak melihat bentuk utuh lebih dulu.";
const SUARA_V2 = "Pecah gambar menjadi bagian yang sama. Sebuah bingkai persegi tersusun dari empat sisi yang sama banyak, dan sebuah silang tersusun dari satu pusat dan empat lengan.";
const SUARA_V3 = "Hitung satu bagian, lalu kalikan dengan banyak bagian yang sama. Cara ini lebih cepat, dan bisa diperiksa dengan menghitung satu per satu.";
const SUARA_V4 = "Lalu lihat bagaimana bagian itu berubah dari kumpulan ke kumpulan. Bagian yang tumbuh menjelaskan mengapa jumlahnya bertambah, bukan hanya berapa tambahnya.";

export const ADEGAN_LUAR_STRUKTUR: AdeganStory = {
  id: "luar-struktur",
  judul: "Visual Structure: lihat bagian bentuk",
  sumber: "Metode luar: Visual Structure",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Visual Structure")),
      tambah("ketiga,", kepala(2)),
      tambah("kelompok", ...cincinBagian("va", 40, 70, 4, 18, 6.5, WARNA_SISI)),
      tambah("bukan", teks("vb", 215, 84, "bukan dihitung", 9.4, W.merah), teks("vb2", 215, 98, "satu per satu", 9.4, W.merah)),
      tambah("otak", emo("vc", 215, 144, "🧠", 34)),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Pecah menjadi bagian sama")),
      tambah("bingkai", ...cincinBagian("vd", 30, 50, 3, 20, 6.5, WARNA_SISI), teks("vd1", 50, 116, "4 sisi yang sama", 8.4, W.biru)),
      tambah("silang", ...silang("ve", 220, 80, 2, 15, 5.5, "#60A5FA", W.coklat), teks("ve1", 220, 130, "1 pusat + 4 lengan", 8.4, W.biru)),
      ubah(idx(SUARA_V2, "pusat"), { id: "ve-o0", warna: W.merah }),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Hitung satu bagian, kalikan")),
      tambah("satu", ...cincinBagian("vf", 30, 56, 3, 22, 7, WARNA_SISI), teks("vf1", 52, 124, "1 bagian = 2 benda", 8.4, W.biru)),
      tambah("kalikan", teks("vg", 215, 80, "4 × 2 = 8", 14, W.hijau)),
      tambah("diperiksa", ...kartu("vh", 150, 100, 144, 44, W.emas, ["periksa: hitung", "satu per satu"], 8.8)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Bagian yang tumbuh")),
      tambah("kumpulan", ...cincinBagian("vi1", 24, 70, 2, 14, 5, WARNA_SISI), teks("vi1t", 31, 120, "bagian: 1", 8, W.biru), teks("vi1u", 31, 134, "jumlah: 4", 8, W.hijau)),
      tambah("tumbuh", ...cincinBagian("vi2", 98, 70, 3, 14, 5, WARNA_SISI), teks("vi2t", 112, 120, "bagian: 2", 8, W.biru), teks("vi2u", 112, 134, "jumlah: 8", 8, W.hijau)),
      tambah("menjelaskan", ...cincinBagian("vi3", 190, 70, 4, 14, 5, WARNA_SISI), teks("vi3t", 211, 120, "bagian: 3", 8, W.biru), teks("vi3u", 211, 134, "jumlah: 12", 8, W.hijau)),
      tambah("bertambah,", teks("vj", 150, 166, "tiap bagian +1, jumlah +4", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Visual Structure: penerapan pada semangka dan bola sepak (Buku Siswa hlm. 93) ------------------------------ */
const SUARA_W1 = "Semangka, kumpulan kedua: bingkai tiga kali tiga tanpa tengah, delapan semangka. Terbagi empat bagian sama, tiap bagian dua semangka.";
const SUARA_W2 = "Kumpulan ketiga: bingkai empat kali empat tanpa tengah, dua belas semangka. Empat bagian, tiap bagian tiga semangka. Bagiannya bertambah satu, jadi totalnya bertambah empat.";
const SUARA_W3 = "Kumpulan keempat: tiap bagian empat semangka, jadi empat kali empat sama dengan enam belas. Cocok dengan hitungan tadi.";
const SUARA_W4 = "Bola sepak: satu bola di pusat dan empat lengan. Panjang lengan nol, satu, dua, lalu tiga, jadi satu, lima, sembilan, dan tiga belas bola.";

export const ADEGAN_LUAR_STRUKTUR_TERAPAN: AdeganStory = {
  id: "luar-struktur-terapan",
  judul: "Visual Structure pada semangka dan bola sepak",
  sumber: "Metode luar: Visual Structure",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Semangka kumpulan 2")),
      tambah("bingkai", ...cincinBagian("wa", 40, 56, 3, 22, 7, SATU_WARNA)),
      ubah(idx(SUARA_W1, "Terbagi"), ...warnaiSisi("wa", 3)),
      tambah("bagian", teks("wa1", 215, 74, "4 bagian sama", 9.4, W.biru), teks("wa2", 215, 90, "tiap bagian: 2", 9.4, W.biru)),
      tambah("delapan", teks("wa3", 215, 124, "4 × 2 = 8", 13, W.hijau)),
    ),
    k(
      SUARA_W2,
      bersih(0),
      tambah(0, judul("Semangka kumpulan 3")),
      tambah("bingkai", ...cincinBagian("wb", 30, 54, 4, 20, 7, WARNA_SISI)),
      tambah(idx(SUARA_W2, "empat", 3), teks("wb1", 215, 70, "4 bagian sama", 9.4, W.biru), teks("wb2", 215, 86, "tiap bagian: 3", 9.4, W.biru)),
      tambah("dua", teks("wb3", 215, 118, "4 × 3 = 12", 13, W.hijau)),
      tambah("Bagiannya", teks("wb4", 150, 164, "bagian +1, total +4", 9.4, W.merah)),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, judul("Semangka kumpulan 4")),
      tambah("tiap", ...cincinBagian("wc", 30, 52, 5, 16, 6, WARNA_SISI), teks("wc1", 215, 74, "4 bagian sama", 9.4, W.biru), teks("wc2", 215, 90, "tiap bagian: 4", 9.4, W.biru)),
      tambah("sama", teks("wc3", 215, 124, "4 × 4 = 16", 13, W.hijau)),
      tambah("Cocok", ...kartu("wc4", 160, 144, 130, 28, W.emas, [`hitungan tadi: ${KUNCI_LATIHAN.semangka}`], 8.8)),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Bola sepak: pusat dan lengan")),
      tambah(idx(SUARA_W4, "nol"), ...silang("xa", 36, 80, 0, 8, 3.8, "#60A5FA", W.hitam), teks("xa1", 36, 124, "1", 11, W.biru)),
      tambah(idx(SUARA_W4, "satu", 2), ...silang("xb", 95, 80, 1, 8, 3.8, "#60A5FA", W.hitam), teks("xb1", 95, 124, "5", 11, W.biru)),
      tambah(idx(SUARA_W4, "dua"), ...silang("xc", 168, 80, 2, 8, 3.8, "#60A5FA", W.hitam), teks("xc1", 168, 124, "9", 11, W.biru)),
      tambah(idx(SUARA_W4, "tiga", 1), ...silang("xd", 250, 80, 3, 8, 3.8, "#60A5FA", W.hitam), teks("xd1", 250, 124, "13", 11, W.biru)),
      tambah("sembilan,", teks("xe", 150, 160, "1 + 4 × 3 = 13", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Draw the Next Term: konsep ------------------------------ */
const SUARA_Q1 = "Metode keempat, Draw the Next Term, atau Gambar Suku Berikutnya. Murid menebak kumpulan berikutnya dengan aturan, lalu menggambarnya dan menghitung untuk memeriksa tebakan.";
const SUARA_Q2 = "Langkah satu dan dua: amati tiga kumpulan, lalu cari selisih antar kumpulan. Langkah tiga: tebak banyak benda berikutnya dengan menambah atau mengurangi selisih itu.";
const SUARA_Q3 = "Langkah empat: gambar kumpulan berikutnya mengikuti bentuk, lalu hitung bendanya. Langkah lima: bila hitungan sama dengan tebakan, aturannya benar. Bila beda, cari aturan lagi.";
const SUARA_Q4 = "Metode ini menggabungkan menghitung dan menggambar, sehingga murid yang ragu pada angka bisa melihat buktinya pada gambar.";

const langkah = (id: string, x: number, emoji: string, nama: string, warna: string) => [kotak(`${id}-k`, x, 62, 82, 62, warna, W.biru, { rx: 8 }), emo(`${id}-e`, x + 41, 92, emoji, 26), teks(`${id}-t`, x + 41, 114, nama, 9, W.biru)];

export const ADEGAN_LUAR_GAMBAR: AdeganStory = {
  id: "luar-gambar",
  judul: "Draw the Next Term: tebak, gambar, periksa",
  sumber: "Metode luar: Draw the Next Term",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Draw the Next Term")),
      tambah("keempat,", kepala(3)),
      tambah("menebak", ...langkah("qa", 10, "🤔", "tebak", W.krem), panah("qa2", 94, 93, 14, 0, W.biru, 2)),
      tambah("menggambarnya", ...langkah("qb", 109, "✏", "gambar", W.hijauMuda), panah("qb2", 193, 93, 14, 0, W.biru, 2)),
      tambah("memeriksa", ...langkah("qc", 208, "✅", "periksa", W.langit)),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Langkah 1 sampai 3")),
      tambah("amati", ...kartu("qd1", 14, 34, 272, 34, W.hijauMuda, ["1. amati tiga kumpulan"], 9)),
      tambah("cari", ...kartu("qd2", 14, 76, 272, 34, W.langit, ["2. cari selisih antar kumpulan"], 9)),
      tambah("tebak", ...kartu("qd3", 14, 118, 272, 44, W.krem, ["3. tebak: tambah atau kurang", "selisih itu"], 9)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Langkah 4 dan 5")),
      tambah("gambar:", ...kartu("qe1", 14, 34, 272, 34, W.hijauMuda, ["4. gambar kumpulan berikutnya, hitung"], 9)),
      tambah(idx(SUARA_Q3, "lima"), ...kartu("qe2", 14, 76, 272, 34, W.langit, ["5. hitungan sama dengan tebakan?"], 9)),
      tambah("benar.", teks("qe3", 80, 134, "sama: aturan benar", 9.4, W.hijau)),
      tambah("beda,", teks("qe4", 220, 134, "beda: cari aturan lagi", 9.4, W.merah)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Menghitung dan menggambar")),
      tambah("menghitung", ...kartu("qf1", 14, 40, 128, 44, W.hijauMuda, ["menghitung", "(angka)"], 9)),
      tambah("menggambar,", ...kartu("qf2", 158, 40, 128, 44, W.pink, ["menggambar", "(bukti)"], 9)),
      tambah("ragu", emo("qf3", 150, 126, "👀", 32)),
      tambah("buktinya", teks("qf4", 150, 160, "bukti terlihat pada gambar", 9.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 9. Draw the Next Term: penerapan pada bola, semangka, dan ubin (Buku Siswa hlm. 93–94) ------------------------------ */
const SUARA_Y1 = "Terapkan pada bola sepak: satu, lima, sembilan. Selisihnya empat dan empat. Tebakan kumpulan keempat: sembilan ditambah empat, yaitu tiga belas.";
const SUARA_Y2 = "Sekarang gambar kumpulan keempat: satu bola di pusat dan tiga bola pada tiap lengan. Hitung gambarnya: tiga belas bola. Tebakan sama dengan gambar, jadi aturannya benar.";
const SUARA_Y3 = "Semangka: empat, delapan, dua belas. Tebakan kumpulan keempat: dua belas ditambah empat, yaitu enam belas. Gambar bingkai lima kali lima tanpa tengah, hitung: enam belas. Sama.";
const SUARA_Y4 = "Pola mengecil juga bisa diperiksa. Ubin belah ketupat: tiga belas, sepuluh, tujuh. Tebakan: tujuh dikurangi tiga, yaitu empat. Gambar empat ubin dan hitung: empat, cocok dengan tebakan.";

export const ADEGAN_LUAR_GAMBAR_TERAPAN: AdeganStory = {
  id: "luar-gambar-terapan",
  judul: "Draw the Next Term pada bola, semangka, dan ubin",
  sumber: "Metode luar: Draw the Next Term",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Bola sepak: tebak dulu")),
      tambah("satu,", ...silang("ya", 36, 76, 0, 8, 3.8, W.putih, W.hitam), teks("ya1", 36, 120, "1", 11, W.biru)),
      tambah("lima,", ...silang("yb", 100, 76, 1, 8, 3.8, W.putih, W.hitam), teks("yb1", 100, 120, "5", 11, W.biru)),
      tambah("sembilan.", ...silang("yc", 180, 76, 2, 8, 3.8, W.putih, W.hitam), teks("yc1", 180, 120, "9", 11, W.biru)),
      tambah("Selisihnya", teks("yd1", 68, 56, "+4", 10, W.merah), teks("yd2", 140, 56, "+4", 10, W.merah)),
      tambah("Tebakan", ...kartu("ye", 20, 134, 110, 22, W.krem, ["tebakan kumpulan 4"], 8.2), teks("yf", 205, 148, "9 + 4 = 13", 12, W.hijau)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Gambar kumpulan keempat")),
      tambah("gambar", ...silang("yg", 100, 90, 3, 14, 6, "#FDE047", W.hitam)),
      tambah("tiga", teks("yg1", 215, 70, "3 bola tiap lengan", 9, W.biru), teks("yg2", 215, 86, "1 bola di pusat", 9, W.biru)),
      tambah("Hitung", teks("yg3", 215, 120, "hitung: 13 bola", 11, W.hijau)),
      tambah("benar.", ...kartu("yg4", 160, 138, 130, 28, W.emas, ["tebakan 13 = gambar 13"], 8.8), emo("yg5", 150, 192, "✅", 18)),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Semangka: tebak, gambar, periksa")),
      tambah("Semangka", teks("zh", 150, 40, "kumpulan: 4, 8, 12", 9.4, W.biru)),
      tambah("Tebakan", teks("zi", 210, 76, "tebakan:", 9, W.coklat), teks("zj", 210, 92, "12 + 4 = 16", 12, W.hijau)),
      tambah("Gambar", ...cincinBagian("zk", 30, 60, 5, 15, 5.5, SATU_WARNA)),
      tambah("hitung:", teks("zl", 210, 122, "hitung gambar: 16", 9.4, W.hijau)),
      tambah("Sama.", emo("zm", 210, 154, "✅", 24)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Pola mengecil: ubin")),
      tambah("Ubin", teks("zn", 150, 40, "kumpulan: 13, 10, 7", 9.4, W.biru)),
      tambah("Tebakan", teks("zo", 215, 80, "tebakan:", 9, W.coklat), teks("zp", 215, 96, "7 − 3 = 4", 12, W.hijau)),
      tambah("Gambar", ...ubinBelah("zq", 30, 64, UBIN_PETA[3], 14, 8, "#FDE047")),
      tambah("hitung:", teks("zr", 215, 126, "hitung gambar: 4", 9.4, W.hijau)),
      tambah("cocok", emo("zs", 215, 158, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_Z1 = "Ringkasnya, empat metode dari luar: mengulang satuan, menambah selisih tetap, melihat bagian bentuk, dan menggambar lalu memeriksa.";
const SUARA_Z2 = "Angka yang kita pakai tadi: jeruk dua, empat, enam sampai empat belas; kelereng dua, lima, delapan; semangka empat, delapan, dua belas, enam belas; dan bola satu, lima, sembilan, tiga belas.";
const SUARA_Z3 = "Pilih metode menurut gambarnya: aturan selisih untuk tabel, bagian bentuk untuk susunan yang teratur, dan selalu periksa dengan menggambar atau menghitung.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["mengulang", "menambah", "melihat", "menggambar"][i], ...kartu(`r${i}`, 12, 32 + i * 38, 276, 30, WARNA_METODE[i], [`${m} · ${NAMA_METODE_ID[i]}`], 8.8))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Angka yang dipakai")),
      tambah("Angka", ...barisTabel("rt0", 20, 34, [70, 190], ["benda", "banyak tiap kumpulan"], 22, 8.6, true)),
      tambah("jeruk", ...barisTabel("rt1", 20, 56, [70, 190], ["jeruk", "2, 4, 6, ..., 14"], 22, 8.6)),
      tambah("kelereng", ...barisTabel("rt2", 20, 78, [70, 190], ["kelereng", "2, 5, 8 (lalu 11, 14)"], 22, 8.6)),
      tambah("semangka", ...barisTabel("rt3", 20, 100, [70, 190], ["semangka", "4, 8, 12, 16"], 22, 8.6)),
      tambah("bola", ...barisTabel("rt4", 20, 122, [70, 190], ["bola", "1, 5, 9, 13"], 22, 8.6)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("aturan", ...kartu("p1", 14, 36, 272, 34, W.langit, ["tabel: aturan selisih"], 9)),
      tambah("bagian", ...kartu("p2", 14, 78, 272, 34, W.krem, ["susunan teratur: bagian bentuk"], 9)),
      tambah("periksa", ...kartu("p3", 14, 120, 272, 34, W.pink, ["selalu periksa: gambar atau hitung"], 9)),
      tambah("menghitung.", emo("p4", 150, 184, "✅", 22)),
    ),
  ],
};
