import type { AdeganStory } from "./logika-story";
import { W, barisId, barisPikto, emo, judul, jumlahBaris, kartu, kotak, kunciPikto, panah, rangkaPikto, teks } from "./k4b6a-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, warnai } from "./k4b6a-bantu";
import { KELAS, PK } from "./k4b6a-materi-2";
import { BUKU, GAMBAR_KELAS, HARI, PS } from "./k4b6a-materi-3";
import { NAMA_METODE } from "./k4b6a-luar-1";

/* ------------------------------ 6. Read then Compare: konsep ------------------------------ */
const SUARA_B1 = "Metode ketiga, Read then Compare, atau Baca Lalu Banding. Pertama baca nilai setiap baris, jangan langsung membandingkan. Di sini: papan tulis dua, jam dinding satu, lemari satu, hiasan dinding delapan.";
const SUARA_B2 = "Kedua, bandingkan angka-angkanya. Yang terbesar adalah delapan, yaitu hiasan dinding. Yang terkecil adalah satu, yaitu jam dinding dan lemari.";
const SUARA_B3 = "Ketiga, jawab pertanyaannya. Bila dua baris sama kecilnya, sebutkan keduanya, jangan hanya satu.";
const SUARA_B4 = "Urutannya penting: baca, banding, lalu jawab. Jangan melompat ke jawaban sebelum semua baris dibaca.";

export const ADEGAN_LUAR_BACA: AdeganStory = {
  id: "luar-baca",
  judul: "Read then Compare: baca dulu, lalu banding",
  sumber: "Metode luar: Read then Compare",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Read then Compare")),
      tambah(0, rangkaPikto(PK)),
      tambah("papan", ...barisPikto(PK, 0, KELAS[0]), jumlahBaris(PK, 0, KELAS[0])),
      tambah("jam", ...barisPikto(PK, 1, KELAS[1]), jumlahBaris(PK, 1, KELAS[1])),
      tambah("lemari", ...barisPikto(PK, 2, KELAS[2]), jumlahBaris(PK, 2, KELAS[2])),
      tambah("hiasan", ...barisPikto(PK, 3, KELAS[3]), jumlahBaris(PK, 3, KELAS[3])),
      tambah("Pertama", ...kartu("bc1", 22, 160, 256, 28, W.hijauMuda, ["1. baca nilai tiap baris"], 9.2)),
    ),
    k(
      SUARA_B2,
      hapus(0, "bc1-k", "bc1-t0"),
      sorotkan("terbesar", ...barisId(PK, 3, 8)),
      redamkan("terkecil", ...barisId(PK, 3, 8)),
      sorotkan("terkecil", ...barisId(PK, 1, 1), ...barisId(PK, 2, 1)),
      tambah("Kedua,", ...kartu("bc2", 22, 160, 256, 28, W.langit, ["2. banding: terbesar 8, terkecil 1"], 9.2)),
    ),
    k(
      SUARA_B3,
      hapus(0, "bc2-k", "bc2-t0"),
      redamkan(0, ...barisId(PK, 1, 1), ...barisId(PK, 2, 1)),
      tambah("Ketiga,", ...kartu("bc3", 22, 160, 256, 28, W.krem, ["3. jawab: jam dinding dan lemari"], 9.2)),
      sorotkan("sama", ...barisId(PK, 1, 1), ...barisId(PK, 2, 1)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Baca, banding, jawab")),
      tambah("baca,", ...kartu("bs1", 20, 40, 260, 30, W.hijauMuda, ["1. baca"], 10)),
      tambah("banding,", panah("ba1", 150, 72, 0, 16, W.biru, 2), ...kartu("bs2", 20, 90, 260, 30, W.langit, ["2. banding"], 10)),
      tambah("jawab.", panah("ba2", 150, 122, 0, 16, W.biru, 2), ...kartu("bs3", 20, 140, 260, 30, W.krem, ["3. jawab"], 10)),
      tambah("melompat", emo("bs4", 150, 192, "🚫", 22)),
    ),
  ],
};

/* ------------------------------ 7. Read then Compare: penerapan pada buku yang dipinjam (Buku Siswa hlm. 185) ------------------------------ */
const SUARA_BT1 = "Terapkan pada buku perpustakaan. Langkah baca: Senin dua belas, Selasa enam, Rabu sembilan, Kamis tiga, Jumat dua belas, dan Sabtu empat belas.";
const SUARA_BT2 = "Langkah banding: yang terbesar empat belas, yaitu hari Sabtu. Yang terkecil tiga, yaitu hari Kamis.";
const SUARA_BT3 = "Perhatikan, Senin dan Jumat sama-sama dua belas. Bila ditanya hari yang sama banyak, jawabannya dua hari itu.";
const SUARA_BT4 = "Selisih terbanyak dan tersedikit, hitungan kita sendiri: empat belas dikurangi tiga, sama dengan sebelas buku.";
const SUARA_BT5 = "Jawaban ini sama dengan kunci panduan guru: Sabtu paling banyak, Kamis paling sedikit, dan buku pada hari Kamis dan Jumat adalah tiga ditambah dua belas, sama dengan lima belas buku.";
const yBar = (i: number) => 32 + i * 24;
const barBuku = (i: number) => [
  teks(`bl${i}`, 14, yBar(i) + 11, HARI[i], 8.6, W.biru, { anchor: "start" }),
  kotak(`bb${i}`, 64, yBar(i), BUKU[i] * 13, 15, W.jingga, W.biru, { rx: 2, tebal: 1 }),
  teks(`bv${i}`, 64 + BUKU[i] * 13 + 5, yBar(i) + 11.4, String(BUKU[i]), 9.6, W.merah, { anchor: "start" }),
];

export const ADEGAN_LUAR_BACA_TERAPAN: AdeganStory = {
  id: "luar-baca-terapan",
  judul: "Read then Compare pada buku yang dipinjam",
  sumber: "Metode luar: Read then Compare; angka Buku Siswa hlm. 185",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_BT1, tambah(0, judul("Langkah baca")), ...HARI.map((h, i) => tambah(h, ...barBuku(i)))),
    k(
      SUARA_BT2,
      warnai("terbesar", W.hijau, "bb5"),
      warnai("terkecil", W.merah, "bb3"),
      tambah("Langkah", ...kartu("bt1", 20, 180, 260, 18, W.krem, ["terbesar: Sabtu 14; terkecil: Kamis 3"], 8.4)),
    ),
    k(
      SUARA_BT3,
      warnai(0, W.jingga, "bb5", "bb3"),
      warnai("Senin", W.langit, "bb0", "bb4"),
      sorotkan("Jumat", "bb0", "bb4"),
    ),
    k(
      SUARA_BT4,
      redamkan(0, "bb0", "bb4"),
      sorotkan("empat", "bb5"),
      sorotkan("tiga,", "bb3"),
      tambah("sama", teks("bt2", 150, 176, "14 − 3 = 11 buku", 11, W.merah)),
    ),
    k(
      SUARA_BT5,
      bersih(0),
      tambah(0, judul("Cocok dengan kunci buku")),
      tambah("Sabtu", ...kartu("bk1", 20, 36, 260, 30, W.hijauMuda, ["paling banyak: Sabtu"], 9.6)),
      tambah("Kamis", ...kartu("bk2", 20, 76, 260, 30, W.langit, ["paling sedikit: Kamis"], 9.6)),
      tambah("tiga", ...kartu("bk3", 20, 116, 260, 30, W.krem, ["3 + 12 = 15 buku"], 10.4)),
      tambah("lima", emo("bk4", 150, 184, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 8. Scale Multiply: konsep ------------------------------ */
const SUARA_S1 = "Metode keempat, Scale Multiply, atau Kali Skala. Bila satu gambar menyatakan lebih dari satu, jumlah data sama dengan banyak gambar dikali nilai satu gambar.";
const SUARA_S2 = "Contoh kecil: tiga gambar, setiap gambar menyatakan dua. Tiga kali dua sama dengan enam.";
const SUARA_S3 = "Urutannya: hitung gambar, ambil nilai skala dari keterangan, lalu kalikan.";
const SUARA_S4 = "Untuk jumlah semuanya ada jalan pintas: jumlahkan dulu semua gambar, lalu kalikan sekali dengan skala. Misalnya dua, tiga, dan satu gambar dengan skala dua.";

export const ADEGAN_LUAR_SKALA: AdeganStory = {
  id: "luar-skala",
  judul: "Scale Multiply: gambar dikali skala",
  sumber: "Metode luar: Scale Multiply",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Scale Multiply")),
      tambah("Kali", ...kartu("sm", 40, 34, 220, 30, W.pink, ["Kali Skala"], 10.6)),
      tambah("lebih", ...kartu("sm1", 14, 80, 272, 34, W.krem, ["jumlah data = banyak gambar × nilai satu gambar"], 8.6)),
      tambah(idx(SUARA_S1, "gambar", 3), emo("sm2", 90, 156, "👤", 30), teks("sm3", 150, 162, "= nilai", 11, W.merah)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Contoh kecil")),
      tambah("tiga", emo("sa0", 70, 80, "👤", 30), emo("sa1", 120, 80, "👤", 30), emo("sa2", 170, 80, "👤", 30)),
      tambah("setiap", teks("sb0", 70, 104, "2", 12, W.merah), teks("sb1", 120, 104, "2", 12, W.merah), teks("sb2", 170, 104, "2", 12, W.merah)),
      tambah("Tiga@2", teks("sc", 150, 150, "3 × 2 = 6", 15, W.biru)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("hitung", ...kartu("sl1", 14, 36, 272, 34, W.hijauMuda, ["1. hitung gambar"], 9.4)),
      tambah("ambil", ...kartu("sl2", 14, 80, 272, 34, W.langit, ["2. ambil nilai skala"], 9.4)),
      tambah("kalikan.", ...kartu("sl3", 14, 124, 272, 34, W.krem, ["3. kalikan"], 9.4)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Jalan pintas")),
      tambah("jumlahkan", ...kartu("sj1", 20, 34, 260, 30, W.hijauMuda, ["2 + 3 + 1 = 6 gambar"], 10)),
      tambah("kalikan", ...kartu("sj2", 20, 74, 260, 30, W.langit, ["6 × 2 = 12"], 10.4)),
      tambah("Misalnya", ...kartu("sj3", 20, 114, 260, 40, W.krem, ["4 + 6 + 2 = 12", "cek: hasilnya sama"], 9.2)),
    ),
  ],
};

/* ------------------------------ 9. Scale Multiply: penerapan pada siswa tiap kelas (Buku Siswa hlm. 186) ------------------------------ */
const SUARA_ST1 = "Terapkan pada siswa tiap kelas di buku. Keterangannya: satu gambar menyatakan empat siswa. Jadi tiap gambar bernilai empat. Gambar tiap kelas tampak seperti ini.";
const SUARA_ST2 = "Kelas empat punya delapan gambar. Delapan kali empat sama dengan tiga puluh dua siswa.";
const SUARA_ST3 = "Kelas satu dan kelas dua masing-masing enam gambar. Enam kali empat sama dengan dua puluh empat siswa tiap kelas.";
const SUARA_ST4 = "Jumlah semua siswa dihitung dua cara. Tiga puluh sembilan gambar kali empat, dan penjumlahan tiap kelas, keduanya sama dengan seratus lima puluh enam.";
const yK = (i: number) => PS.y + PS.hh + i * PS.rh + PS.rh / 2 + 3.4;

export const ADEGAN_LUAR_SKALA_TERAPAN: AdeganStory = {
  id: "luar-skala-terapan",
  judul: "Scale Multiply pada siswa tiap kelas",
  sumber: "Metode luar: Scale Multiply; angka Buku Siswa hlm. 186",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_ST1,
      tambah("Terapkan", rangkaPikto(PS)),
      tambah("Keterangannya:", ...kunciPikto(PS, 6, { jenis: "emoji", e: "👤" }, "menyatakan 4 siswa")),
      ...GAMBAR_KELAS.map((n, i) => tambah(idx(SUARA_ST1, "tiap", 2) + i, ...barisPikto(PS, i, n))),
    ),
    k(
      SUARA_ST2,
      sorotkan("Kelas", ...barisId(PS, 3, 8)),
      tambah("delapan@2", jumlahBaris(PS, 3, 8)),
      tambah("kali", teks("st3", 266, yK(3), "8×4=32", 9.4, W.merah)),
    ),
    k(
      SUARA_ST3,
      redamkan(0, ...barisId(PS, 3, 8)),
      sorotkan("Kelas", ...barisId(PS, 0, 6), ...barisId(PS, 1, 6)),
      tambah("enam", jumlahBaris(PS, 0, 6), jumlahBaris(PS, 1, 6)),
      tambah("kali", teks("st0", 266, yK(0), "6×4=24", 9.4, W.merah), teks("st1", 266, yK(1), "6×4=24", 9.4, W.merah)),
    ),
    k(
      SUARA_ST4,
      bersih(0),
      tambah(0, judul("Dua cara, hasil sama")),
      tambah("Tiga", ...kartu("sz1", 20, 34, 260, 34, W.hijauMuda, ["39 gambar × 4 = 156 siswa"], 10)),
      tambah("penjumlahan", ...kartu("sz2", 20, 78, 260, 44, W.langit, ["24 + 24 + 28 + 32 + 20 + 28", "= 156 siswa"], 9.2)),
      tambah("seratus", ...kartu("sz3", 40, 134, 220, 34, W.emas, ["cocok dengan kunci buku"], 9.6)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Ringkasannya: Pictograph Key membaca keterangan lebih dulu. Categorical Tally menghitung data mentah dengan turus. Read then Compare membaca lalu membandingkan. Scale Multiply mengalikan gambar dengan skala.";
const SUARA_R2 = "Kapan dipakai? Kunci dan kali skala saat gambar punya skala, turus saat data masih berupa daftar, dan baca lalu banding saat ditanya paling banyak atau paling sedikit.";
const SUARA_R4 = "Cobalah memakai keempatnya pada data kelompok kalian sendiri, misalnya alat tulis dalam tas atau warna bunga di halaman. Satu data, empat cara, satu jawaban.";
const SUARA_R3 = "Apa pun metodenya, hasil harus cocok dengan angka buku: dua puluh tiga mainan, lima puluh enam buku, dan seratus lima puluh enam siswa.";
const RINGKAS = ["baca keterangan dulu", "turus untuk data mentah", "baca, banding, jawab", "gambar × skala"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Pictograph", "Categorical", "Read", "Scale"].map((x) => idx(SUARA_R1, x))[i], ...kartu(`rg${i}`, 12, 32 + i * 40, 276, 32, [W.hijauMuda, W.langit, W.krem, W.pink][i], [`${m}: ${RINGKAS[i]}`], 8.6))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Kapan dipakai?")),
      tambah("Kunci", ...kartu("kp0", 14, 34, 272, 34, W.hijauMuda, ["gambar punya skala: kunci, kali skala"], 8.6)),
      tambah("turus", ...kartu("kp1", 14, 76, 272, 34, W.langit, ["data masih daftar: turus"], 8.6)),
      tambah("baca", ...kartu("kp2", 14, 118, 272, 34, W.krem, ["paling banyak, paling sedikit: baca lalu banding"], 8.2)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Cocok dengan buku")),
      tambah("mainan,", ...kartu("cb0", 14, 34, 272, 30, W.hijauMuda, ["mainan Karel: 23"], 9.6)),
      tambah(idx(SUARA_R3, "buku", 2), ...kartu("cb1", 14, 72, 272, 30, W.langit, ["buku dipinjam seminggu: 56"], 9.6)),
      tambah("siswa.", ...kartu("cb2", 14, 110, 272, 30, W.krem, ["siswa seluruh kelas: 156"], 9.6)),
      tambah(idx(SUARA_R3, "seratus"), emo("cb3", 150, 180, "✅", 26)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Coba sendiri")),
      tambah("data", emo("cs1", 70, 84, "🎒", 40), emo("cs2", 150, 84, "🌸", 40), emo("cs3", 230, 84, "🧮", 40)),
      tambah("alat", teks("cs1t", 70, 112, "alat tulis", 8.6, W.biru)),
      tambah("warna", teks("cs2t", 150, 112, "warna bunga", 8.6, W.biru)),
      tambah("Satu", ...kartu("cs4", 30, 136, 240, 34, W.emas, ["satu data, empat cara, satu jawaban"], 9.2)),
    ),
  ],
};
