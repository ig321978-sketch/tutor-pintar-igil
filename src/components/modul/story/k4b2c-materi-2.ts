import type { AdeganStory } from "./logika-story";
import { CONTOH_BERPIKIR, W, batang, emo, garis, jembatan, judul, kartu, kotak, panah, pecahan, teks } from "./k4b2c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, warnai } from "./k4b2c-bantu";

/* ------------------------------ 5. Penjelasan Bu Guru pada coklat (Buku Siswa hlm. 68; Panduan Guru hlm. 102) ------------------------------ */
const SUARA_J1 = "Murid menjawab: kami tidak tahu, Bu Guru. Lalu Bu Guru menjelaskan dengan menyejajarkan kedua coklat dan menarik garis putus-putus.";
const SUARA_J2 = "Garis putus-putus membagi coklat menjadi tiga bagian sama panjang. Pada coklat pertama, tiap bagian memuat dua potong, yaitu dua per enam. Pada coklat kedua, tiap bagian satu potong, yaitu satu per tiga.";
const SUARA_J3 = "Tiga bagian pada coklat pertama sama persis dengan tiga bagian pada coklat kedua. Jadi dua per enam sama dengan satu per tiga, seperti tertulis di kotak kuning buku.";
const SUARA_J4 = "Murid pun paham dan berterima kasih. Bu Guru menutup: jadi satu per tiga sama dengan dua per enam. Panduan guru menambahkan, kegiatan coklat boleh diganti dengan benda lain di sekitar murid.";

const WARNA_BAGIAN = [W.jingga, W.hijauMuda, W.pink];
const XP = [53.3, 120, 186.7];

export const ADEGAN_COKLAT_JAWAB: AdeganStory = {
  id: "coklat-jawab",
  judul: "Penjelasan Bu Guru: dua per enam sama dengan satu per tiga",
  sumber: "Buku Siswa hlm. 68; Panduan Guru hlm. 102",
  latar: "#FEF3C7",
  kutipan: [
    "Kami tidak tahu Bu guru.",
    "Sekarang perhatikan penjelasan Bu guru berikut.",
    "Dengan melihat gambar coklat di atas, kita tahu bahwa.",
    "Kami paham, terimakasih ibu.",
    "Kegiatan ini dapat diganti disesuaikan kondisi di dalam kelas masing-masing guru sehingga apa yang disajikan adalah sesuatu yang ada di sekitar peserta didik.",
  ],
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Penjelasan Bu Guru")),
      tambah("tahu,", emo("jq", 262, 62, "🤔", 28), teks("jqt", 262, 84, "kami tidak tahu", 7.8)),
      tambah("menyejajarkan", ...batang("c1", 20, 40, 200, 26, 6, [], W.arsir, W.cok), ...batang("c2", 20, 108, 200, 26, 3, [], W.arsir, W.cok)),
      tambah("garis", garis("g1", 86.7, 34, 0, 106, W.biru, 1.6, { putus: true }), garis("g2", 153.3, 34, 0, 106, W.biru, 1.6, { putus: true })),
    ),
    k(
      SUARA_J2,
      hapus(0, "jq", "jqt"),
      tambah("membagi", teks("jt", 262, 158, "3 bagian sama", 8.4, W.hijau)),
      ...[0, 1, 2].map((a) => warnai("memuat", WARNA_BAGIAN[a], `c1-c${a * 2}`, `c1-c${a * 2 + 1}`)),
      tambah("enam.", ...XP.flatMap((x, a) => pecahan(`u${a}`, x, 82, 2, 6, 11))),
      ...[0, 1, 2].map((a) => warnai("potong.", WARNA_BAGIAN[a], `c2-c${a}`)),
      tambah("tiga.", ...XP.flatMap((x, a) => pecahan(`v${a}`, x, 150, 1, 3, 11))),
    ),
    k(
      SUARA_J3,
      sorotkan("sama", "c1-c0", "c1-c1", "c2-c0"),
      tambah("Jadi", ...kartu("jk", 60, 172, 180, 28, W.emas, ["2/6 = 1/3"], 11)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Kesimpulan Bu Guru")),
      tambah("menutup:", ...pecahan("w1", 100, 66, 1, 3, 20), teks("w2", 150, 70, "=", 24, W.merah), ...pecahan("w3", 200, 66, 2, 6, 20)),
      tambah("Panduan", ...kartu("w4", 40, 112, 220, 30, W.langit, ["coklat boleh diganti benda sekitar"], 9)),
      tambah("benda", emo("w5", 90, 176, "🍰", 28), emo("w6", 150, 176, "🍞", 28), emo("w7", 210, 176, "🍫", 28)),
    ),
  ],
};

/* ------------------------------ 6. Tahukah Kalian: kali atau bagi (Buku Siswa hlm. 69) ------------------------------ */
const SUARA_T1 = "Tahukah Kalian? Buku memberi dua cara mencari pecahan yang senilai. Cara pertama: mengalikan bilangan pembilang dan penyebut dengan bilangan yang sama, dari dua, tiga, empat, dan seterusnya.";
const SUARA_T2 = "Contoh dalam buku: satu per tiga. Pembilang satu dikali dua jadi dua, penyebut tiga dikali dua jadi enam. Hasilnya dua per enam, senilai dengan satu per tiga.";
const SUARA_T3 = "Cara kedua: membagi pembilang dan penyebut dengan bilangan yang sama, dari dua, tiga, empat, dan seterusnya. Pembagian hanya bisa bila pembilang dan penyebut sama-sama habis dibagi bilangan itu.";
const SUARA_T4 = "Contoh dalam buku: dua per enam dibagi dua dan dua. Pembilang dua dibagi dua jadi satu, penyebut enam dibagi dua jadi tiga. Hasilnya satu per tiga, tetapi gambar buku menulis dua per enam lagi, itu salah cetak.";
const SUARA_T5 = "Dua cara itu saling berlawanan. Kalikan bila ingin pecahan yang lebih rinci, bagi bila ingin pecahan yang lebih sederhana. Pengali atau pembagi harus sama untuk pembilang dan penyebut.";

export const ADEGAN_TAHUKAH: AdeganStory = {
  id: "tahukah",
  judul: "Tahukah Kalian: mengalikan atau membagi",
  sumber: "Buku Siswa hlm. 69",
  latar: "#FFFBEB",
  kutipan: [
    "Tahukah Kalian",
    "Cara mencari pecahan yang senilai:",
    "a. Mengalikan bilangan pembilang dan penyebut dengan bilangan yang sama",
    "b. Membagi bilangan pembilang dan penyebut dengan bilangan yang sama",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tahukah Kalian?")),
      tambah("mengalikan", ...kartu("ta", 14, 32, 272, 40, W.hijauMuda, ["a. kalikan pembilang dan penyebut", "dengan bilangan yang sama"], 9)),
      tambah("pembilang", ...pecahan("ts", 100, 112, 1, 3, 18), teks("tp", 150, 108, "← pembilang", 8.6, W.merah)),
      tambah("penyebut", teks("tq", 148, 133, "← penyebut", 8.6, W.merah)),
      tambah("dari", teks("tr", 150, 170, "pengali: 2, 3, 4, ...", 9.4, W.hijau)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Contoh: dikali dua")),
      tambah("tiga.", ...pecahan("x1", 50, 84, 1, 3, 20)),
      tambah("dikali", ...jembatan("xj", 50, 250, 84, "×2")),
      tambah(idx(SUARA_T2, "dua", 2), teks("xa", 150, 140, "1 × 2 = 2", 10, W.hijau)),
      tambah(idx(SUARA_T2, "enam", 1), teks("xb", 150, 160, "3 × 2 = 6", 10, W.hijau)),
      tambah("Hasilnya", ...pecahan("x2", 250, 84, 2, 6, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Cara kedua: bagi")),
      tambah("membagi", ...kartu("tb", 14, 32, 272, 40, W.langit, ["b. bagi pembilang dan penyebut", "dengan bilangan yang sama"], 9)),
      tambah("hanya", teks("tc", 150, 104, "syarat: keduanya habis dibagi", 9.4, W.merah)),
      tambah("sama-sama", ...kartu("td", 14, 116, 130, 36, W.hijauMuda, ["2 dan 6 habis", "dibagi 2"], 8.8), ...kartu("te", 156, 116, 130, 36, W.hijauMuda, ["3 dan 9 habis", "dibagi 3"], 8.8)),
      tambah("itu.", emo("tf", 150, 178, "✅", 22)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Contoh: dibagi dua")),
      tambah("enam", ...pecahan("y1", 50, 84, 2, 6, 20)),
      tambah("dibagi", ...jembatan("yj", 50, 250, 84, "÷2")),
      tambah(idx(SUARA_T4, "satu", 1), teks("ya", 150, 140, "2 ÷ 2 = 1", 10, W.hijau)),
      tambah(idx(SUARA_T4, "tiga", 1), teks("yb", 150, 160, "6 ÷ 2 = 3", 10, W.hijau)),
      tambah("Hasilnya", ...pecahan("y2", 250, 84, 1, 3, 20)),
      tambah("salah", emo("yx", 150, 190, "❌", 18), teks("yc", 150, 188, "buku menulis 2/6 (salah cetak)", 8.2, W.merah, { anchor: "start", x: 164 })),
    ),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Dua cara saling berlawanan")),
      tambah("Kalikan", ...kartu("za", 14, 34, 130, 50, W.hijauMuda, ["kali (×)", "lebih rinci"], 9.4), panah("zp", 146, 52, 8, 0, W.hijau, 1.6)),
      tambah("bagi", ...kartu("zb", 156, 34, 130, 50, W.langit, ["bagi (÷)", "lebih sederhana"], 9.4)),
      tambah("sama", ...kartu("zc", 30, 108, 240, 40, W.emas, ["pembilang dan penyebut", "memakai bilangan yang sama"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berpikir: tiga gambar pecahan senilai (Buku Siswa hlm. 69; Panduan Guru hlm. 102) ------------------------------ */
const SUARA_B1 = "Ayo Berpikir. Buatlah tiga buah gambar yang menunjukkan pecahan senilai. Buku menyediakan tiga kotak, yaitu gambar satu, gambar dua, dan gambar tiga.";
const SUARA_B2 = "Panduan guru meminta guru memandu murid membuat ketiga gambar itu. Jawabannya terbuka, jadi tiap kelompok boleh memilih pecahan senilai yang berbeda.";
const SUARA_B3 = "Sebagai contoh jawaban, kita pilih satu per dua, dua per empat, dan tiga per enam. Gambar satu memiliki satu bagian berarsir dari dua bagian, gambar dua memiliki dua bagian dari empat, gambar tiga memiliki tiga bagian dari enam.";
const SUARA_B4 = "Periksa dengan cara dalam Tahukah Kalian: satu kali dua jadi dua, dan dua kali dua jadi empat. Lalu satu kali tiga jadi tiga, dan dua kali tiga jadi enam. Ketiganya senilai.";

const XB = [50, 150, 250];

export const ADEGAN_BERPIKIR: AdeganStory = {
  id: "berpikir",
  judul: "Ayo Berpikir: membuat tiga gambar pecahan senilai",
  sumber: "Buku Siswa hlm. 69; Panduan Guru hlm. 102",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berpikir",
    "Buatlah tiga buah gambar yang menunjukkan pecahan senilai!",
    "Guru memandu peserta didik untuk membuat tiga buah gambar yang menunjukkan pecahan senilai!",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Ayo Berpikir")),
      tambah("satu,", kotak("bk0", 10, 30, 88, 80, W.putih, W.biru, { rx: 2 }), teks("bt0", 54, 44, "Gambar 1", 8.6, W.biru)),
      tambah("dua,", kotak("bk1", 106, 30, 88, 80, W.putih, W.biru, { rx: 2 }), teks("bt1", 150, 44, "Gambar 2", 8.6, W.biru)),
      tambah(idx(SUARA_B1, "tiga", 3), kotak("bk2", 202, 30, 88, 80, W.putih, W.biru, { rx: 2 }), teks("bt2", 246, 44, "Gambar 3", 8.6, W.biru)),
      tambah("menunjukkan", ...XB.flatMap((x, i) => pecahan(`bn${i}`, x, 150, "...", "...", 12)), teks("be1", 100, 154, "=", 16, W.merah), teks("be2", 200, 154, "=", 16, W.merah)),
    ),
    k(
      SUARA_B2,
      tambah("memandu", emo("bm", 150, 80, "✏", 32)),
      tambah("terbuka,", ...kartu("bj", 20, 172, 260, 26, W.krem, ["jawaban terbuka, buku tanpa kunci"], 9.4)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Contoh jawaban kita")),
      ...CONTOH_BERPIKIR.map(([p, q], i) => tambah(idx(SUARA_B3, "gambar", i + 1), teks(`bg${i}`, XB[i], 40, `gambar ${i + 1}`, 8.6, W.biru), ...batang(`bb${i}`, XB[i] - 40, 48, 80, 30, q, Array.from({ length: p }, (_, c) => c)))),
      tambah(idx(SUARA_B3, "dua", 1), ...pecahan("bf0", XB[0], 120, 1, 2, 14)),
      tambah(idx(SUARA_B3, "empat", 1), ...pecahan("bf1", XB[1], 120, 2, 4, 14), teks("bq1", 100, 124, "=", 16, W.merah)),
      tambah(idx(SUARA_B3, "enam", 1), ...pecahan("bf2", XB[2], 120, 3, 6, 14), teks("bq2", 200, 124, "=", 16, W.merah)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Periksa dengan kali")),
      tambah("satu", ...kartu("bp1", 14, 34, 130, 60, W.hijauMuda, ["1/2 menjadi 2/4", "1 × 2 = 2", "2 × 2 = 4"], 9.4)),
      tambah("Lalu", ...kartu("bp2", 156, 34, 130, 60, W.langit, ["1/2 menjadi 3/6", "1 × 3 = 3", "2 × 3 = 6"], 9.4)),
      tambah("Ketiganya", ...kartu("bp3", 40, 118, 220, 40, W.emas, ["1/2 = 2/4 = 3/6", "ketiganya senilai"], 10)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih nomor 1 (Buku Siswa hlm. 70; Panduan Guru hlm. 102-103) ------------------------------ */
const SUARA_L1 = "Ayo Berlatih: isilah titik-titik dengan bilangan pecahan sesuai daerah yang diarsir. Soal satu: gambar kiri terdiri atas empat kotak dengan dua kotak diarsir, gambar kanan dua kotak dengan satu kotak diarsir.";
const SUARA_L2 = "Gambar kiri: dua dari empat bagian, jadi dua per empat. Gambar kanan: satu dari dua bagian, jadi satu per dua. Kunci panduan guru: dua per empat sama dengan satu per dua.";
const SUARA_L3 = "Alasannya, kata panduan guru, dua per empat bila disederhanakan memperoleh hasil yang sama, yaitu satu per dua. Hitungan mandiri kita: dua dan empat sama-sama dibagi dua, hasilnya satu dan dua.";

export const ADEGAN_BERLATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Ayo Berlatih nomor 1: dua per empat dan satu per dua",
  sumber: "Buku Siswa hlm. 70; Panduan Guru hlm. 102–103",
  latar: "#FEF2F2",
  kutipan: [
    "Ayo Berlatih",
    "Isilah titik-titik dibawah ini dengan bilangan pecahan sesuai daerah yang",
    "diarsir!",
    "Isilah titik-titik dibawah ini sesuai daerah yang diarsir!",
    "Dikatakan pecahan senilai, karena pecahan",
    "apabila disederhanakan",
    "memperoleh hasil yang sama yaitu",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ayo Berlatih nomor 1")),
      tambah("kiri", ...batang("l1", 20, 44, 100, 26, 4, [0, 1])),
      tambah("kanan", ...batang("r1", 170, 44, 100, 26, 2, [0])),
      tambah("titik-titik", ...pecahan("fl", 70, 112, "...", "...", 14), teks("fe", 145, 116, "=", 20, W.merah), ...pecahan("fr", 220, 112, "...", "...", 14)),
    ),
    k(
      SUARA_L2,
      ubah("empat", { id: "fl-p", isi: "2", warna: W.hijau }, { id: "fl-q", isi: "4", warna: W.hijau }),
      ubah("dua@2", { id: "fr-p", isi: "1", warna: W.hijau }, { id: "fr-q", isi: "2", warna: W.hijau }),
      tambah("Kunci", ...kartu("fk", 50, 150, 200, 32, W.emas, ["kunci: 2/4 = 1/2"], 10)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Mengapa senilai?")),
      tambah(idx(SUARA_L3, "empat", 1), ...pecahan("gl", 50, 80, 2, 4, 20)),
      tambah(idx(SUARA_L3, "dua", 2), ...pecahan("gr", 250, 80, 1, 2, 20)),
      tambah("Hitungan", ...jembatan("gj", 50, 250, 80, "÷2")),
      tambah("hasilnya", teks("ga", 150, 140, "2 ÷ 2 = 1", 10, W.hijau)),
      tambah(idx(SUARA_L3, "dua", 5), teks("gb", 150, 160, "4 ÷ 2 = 2", 10, W.hijau)),
    ),
  ],
};
