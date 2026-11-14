import type { AdeganStory } from "./logika-story";
import { W, diagramMendatar, diagramTegak, emo, garis, judul, kartu, tabel, teks } from "./k4b6b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k4b6b-bantu";

/* ------------------------------ 6. Compare Bars: konsep ------------------------------ */
const CB = diagramMendatar(
  "cb",
  80,
  44,
  190,
  84,
  [
    { nama: "Menyanyi", nilai: 8 },
    { nama: "Bulu Tangkis", nilai: 5 },
    { nama: "Catur", nilai: 5 },
  ],
  9,
  1,
  { ukuranNama: 6.8 },
);
export const ADEGAN_LUAR_CB: AdeganStory = {
  id: "luar-cb",
  judul: "Metode 3: Compare Bars (Banding Batang)",
  sumber: "Metode luar: Compare Bars; angka Buku Siswa hlm. 193",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Compare Bars atau Banding Batang. Batang yang lebih panjang berarti nilai yang lebih besar. Cukup bandingkan panjangnya dengan mata. Menyanyi lebih panjang daripada bulu tangkis.",
      tambah(0, judul("Compare Bars"), ...CB.sumbu, ...CB.nama),
      tambah("Menyanyi", ...CB.batang[0]),
      tambah("bulu", ...CB.batang[1]),
      tambah("Batang", ...kartu("cc", 14, 174, 272, 22, W.hijauMuda, ["lebih panjang = nilai lebih besar"], 9.4)),
    ),
    k(
      "Dua batang yang sama panjang berarti nilainya sama. Catur dan bulu tangkis sama-sama lima siswa.",
      tambah("Catur", ...CB.batang[2]),
      sorotkan("bulu", "cb-b1", "cb-b2"),
      tambah("sama-sama", garis("cbl", 80 + 5 * CB.unit, 44, 0, 84, W.merah, 1.4, { putus: true })),
      ubah("Dua", { id: "cc-t0", isi: "sama panjang = sama nilainya" }, { id: "cc-k", warna: W.krem }),
    ),
    k(
      "Untuk tahu selisihnya, kurangkan nilai terbesar dengan nilai terkecil. Menyanyi delapan kurang bulu tangkis lima sama dengan tiga.",
      ubah(0, { id: "cb-b1", sorot: false }, { id: "cb-b2", sorot: false }),
      { at: 0, hapus: ["cbl"] },
      tambah("kurangkan", garis("cbs", 80 + 5 * CB.unit, 52, 3 * CB.unit, 0, W.merah, 3)),
      ubah("Menyanyi", { id: "cc-t0", isi: "selisih: 8 − 5 = 3" }, { id: "cc-k", warna: W.langit }),
    ),
    k(
      "Tiga kata kunci membandingkan: lebih banyak untuk batang yang lebih panjang, lebih sedikit untuk batang yang lebih pendek, dan selisih untuk beda panjangnya.",
      bersih(0),
      tambah(0, judul("Kata kunci membandingkan")),
      tambah("banyak", ...kartu("kk1", 14, 34, 272, 30, W.hijauMuda, ["lebih banyak = batang lebih panjang"], 9.2)),
      tambah("sedikit", ...kartu("kk2", 14, 74, 272, 30, W.merahMuda, ["lebih sedikit = batang lebih pendek"], 9.2)),
      tambah("selisih", ...kartu("kk3", 14, 114, 272, 30, W.langit, ["selisih = beda panjang batang"], 9.2)),
    ),
  ],
};

/* ------------------------------ 7. Compare Bars: penerapan pada lomba PORSENI ------------------------------ */
const PORSENI = diagramMendatar(
  "cp",
  58,
  34,
  210,
  108,
  [
    { nama: "Menyanyi", nilai: 8 },
    { nama: "Renang", nilai: 2 },
    { nama: "Bulu Tangkis", nilai: 5 },
    { nama: "Puisi", nilai: 7 },
    { nama: "Lari", nilai: 3 },
    { nama: "Catur", nilai: 5 },
  ],
  9,
  1,
  { judulNama: "Lomba", judulNilai: "Banyak Siswa", ukuranNama: 6.8 },
);
export const ADEGAN_LUAR_CB_TERAPAN: AdeganStory = {
  id: "luar-cb-terapan",
  judul: "Compare Bars: lomba PORSENI tingkat kabupaten",
  sumber: "Metode luar: Compare Bars; angka Buku Siswa hlm. 193–194",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapan pada Uji Kompetensi nomor tiga, lomba PORSENI. Enam batang mendatar dengan skala nol sampai sembilan. Kita bandingkan semuanya hanya dari panjang batang.",
      tambah(0, judul("Banding enam batang")),
      tambah("batang", ...PORSENI.sumbu, ...PORSENI.nama),
      tambah("Kita", ...PORSENI.batang.flat()),
    ),
    k(
      "Urutan dari terpanjang: menyanyi delapan, puisi tujuh, bulu tangkis dan catur sama-sama lima, lari tiga, dan renang dua.",
      tambah("Urutan", ...kartu("cpc", 14, 174, 272, 22, W.hijauMuda, ["8 > 7 > 5 = 5 > 3 > 2"], 9.6)),
      sorotkan("menyanyi", "cp-b0"),
      ubah("puisi", { id: "cp-b0", sorot: false }),
      sorotkan("puisi", "cp-b3"),
      ubah("bulu", { id: "cp-b3", sorot: false }),
      sorotkan("bulu", "cp-b2", "cp-b5"),
      ubah("lari", { id: "cp-b2", sorot: false }, { id: "cp-b5", sorot: false }),
      sorotkan("lari", "cp-b4"),
      ubah("renang", { id: "cp-b4", sorot: false }),
      sorotkan("renang", "cp-b1"),
    ),
    k(
      "Selisih terbesar ada antara menyanyi dan renang: delapan kurang dua sama dengan enam. Menyanyi dan puisi hanya berbeda satu.",
      ubah(0, { id: "cp-b1", sorot: false }),
      sorotkan("Selisih", "cp-b0", "cp-b1"),
      ubah("Selisih", { id: "cpc-t0", isi: "selisih terbesar: 8 − 2 = 6" }, { id: "cpc-k", warna: W.langit }),
      ubah("Menyanyi@2", { id: "cp-b1", sorot: false }),
      sorotkan("puisi.", "cp-b3"),
      ubah("puisi.", { id: "cpc-t0", isi: "menyanyi dan puisi: 8 − 7 = 1" }, { id: "cpc-k", warna: W.krem }),
    ),
    k(
      "Terakhir, jumlah semua peserta: delapan tambah dua tambah lima tambah tujuh tambah tiga tambah lima sama dengan tiga puluh siswa.",
      ubah(0, { id: "cp-b0", sorot: false }, { id: "cp-b3", sorot: false }),
      ubah("Terakhir,", { id: "cpc-t0", isi: "8 + 2 + 5 + 7 + 3 + 5 = 30 siswa" }, { id: "cpc-k", warna: W.pink }),
    ),
  ],
};

/* ------------------------------ 8. Table to Bar: konsep ------------------------------ */
const MEJA = [
  { nama: "Buku", nilai: 4 },
  { nama: "Taplak Meja", nilai: 1 },
  { nama: "Spidol", nilai: 3 },
  { nama: "Penghapus", nilai: 1 },
  { nama: "Pulpen", nilai: 2 },
];
const TB = diagramTegak("tb", 38, 40, 232, 100, MEJA, 4, 1, { judulNilai: "Banyak", judulNama: "Benda di atas meja guru", ukuranNama: 6.4 });
export const ADEGAN_LUAR_TB: AdeganStory = {
  id: "luar-tb",
  judul: "Metode 4: Table to Bar (Tabel ke Batang)",
  sumber: "Metode luar: Table to Bar; angka Buku Siswa hlm. 192",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Table to Bar atau Tabel ke Batang. Mulai dari tabel data benda di atas meja guru: buku empat, taplak meja satu, spidol tiga, penghapus satu, pulpen dua.",
      tambah(0, judul("Table to Bar")),
      tambah("tabel", ...tabel("tt", 14, 56, [56, 62, 48, 56, 50], [["Buku", "Taplak meja", "Spidol", "Penghapus", "Pulpen"], ["4", "1", "3", "1", "2"]], 24, 7.4, W.langit)),
      tambah("buku", ...kartu("tt9", 40, 124, 220, 30, W.krem, ["tabel data: nama dan jumlah"], 9.6)),
    ),
    k(
      "Langkah satu, pilih skala dari nilai terbesar. Terbesarnya empat, jadi sumbu cukup dari nol sampai empat, naik satu-satu. Langkah dua, gambar sumbu dan beri label.",
      bersih(0),
      tambah(0, judul("Langkah 1 dan 2")),
      tambah("satu,", ...kartu("ts1", 14, 36, 272, 44, W.hijauMuda, ["1. pilih skala dari nilai terbesar", "terbesar 4: skala 0 sampai 4"], 9.2)),
      tambah("dua,", ...kartu("ts2", 14, 92, 272, 44, W.langit, ["2. gambar sumbu, beri label", "nama benda dan banyak benda"], 9.2)),
    ),
    k(
      "Langkah tiga, lukis satu batang untuk tiap kolom tabel. Langkah empat, tulis angka di ujung batang.",
      bersih(0),
      tambah(0, judul("Langkah 3 dan 4"), ...TB.sumbu, ...TB.nama),
      tambah("tiga,", ...TB.batang.map((b) => b[0])),
      tambah("empat,", ...TB.batang.map((b) => b[1])),
      tambah("kolom", ...kartu("tsc", 14, 174, 272, 22, W.krem, ["3. satu batang tiap kolom   4. angka di ujung"], 8.6)),
    ),
    k(
      "Periksa: tinggi tiap batang sama dengan angka di tabel, dan jumlah semua batang sama dengan jumlah data, empat tambah satu tambah tiga tambah satu tambah dua sama dengan sebelas.",
      sorotkan("Periksa:", "tb-b0", "tb-b2"),
      ubah("tinggi", { id: "tsc-t0", isi: "periksa: 4 + 1 + 3 + 1 + 2 = 11" }, { id: "tsc-k", warna: W.hijauMuda }),
      ubah("jumlah", { id: "tb-b0", sorot: false }, { id: "tb-b2", sorot: false }),
    ),
  ],
};

/* ------------------------------ 9. Table to Bar: penerapan pada suku bangsa ------------------------------ */
const SUKU = diagramTegak(
  "tc",
  50,
  44,
  200,
  100,
  [
    { nama: "Jawa", nilai: 10 },
    { nama: "Melayu", nilai: 7 },
    { nama: "Minang", nilai: 7 },
  ],
  12,
  2,
  { judulNilai: "Banyak Siswa", judulNama: "Suku Bangsa", ukuranNama: 7 },
);
export const ADEGAN_LUAR_TB_TERAPAN: AdeganStory = {
  id: "luar-tb-terapan",
  judul: "Table to Bar: suku bangsa siswa kelas IV",
  sumber: "Metode luar: Table to Bar; angka Panduan Guru hlm. 232, 235–236",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapan pada pengayaan dua: suku bangsa dua puluh empat siswa kelas empat. Datanya masih berupa daftar nama, jadi hitung dulu dengan turus untuk membuat tabel.",
      tambah(0, judul("Dari daftar ke tabel")),
      tambah("daftar", teks("dl1", 14, 44, "Jawa, Melayu, Minang, Melayu, Jawa, Minang, Jawa, Melayu, Jawa, Jawa,", 6.6, W.hitam, { anchor: "start" })),
      tambah("daftar", teks("dl2", 14, 56, "Melayu, Melayu, Jawa, Minang, Minang, Minang, Melayu, Jawa, Minang,", 6.6, W.hitam, { anchor: "start" })),
      tambah("daftar", teks("dl3", 14, 68, "Jawa, Melayu, Jawa, Jawa, Minang", 6.6, W.hitam, { anchor: "start" })),
      tambah("turus", ...kartu("dk", 40, 96, 220, 30, W.krem, ["hitung dengan turus: 24 data"], 9.6)),
    ),
    k(
      "Hasil turus menjadi tabel: Jawa sepuluh, Melayu tujuh, Minang tujuh.",
      bersih(0),
      tambah(0, judul("Tabel hasil turus")),
      tambah("Hasil", ...tabel("hk", 40, 40, [70, 110, 40], [["Suku", "Turus", "Jumlah"]], 20, 8.4, W.krem)),
      tambah("Jawa", ...tabel("hj", 40, 60, [70, 110, 40], [["Jawa", "||||| |||||", "10"]], 22, 9)),
      tambah("Melayu", ...tabel("hm", 40, 82, [70, 110, 40], [["Melayu", "||||| ||", "7"]], 22, 9)),
      tambah("Minang", ...tabel("hn", 40, 104, [70, 110, 40], [["Minang", "||||| ||", "7"]], 22, 9)),
    ),
    k(
      "Langkah satu: terbesarnya sepuluh, maka sumbu nol sampai dua belas, naik dua-dua. Langkah tiga dan empat: batang Jawa sepuluh, Melayu dan Minang masing-masing tujuh.",
      bersih(0),
      tambah(0, judul("Skala nol sampai dua belas")),
      tambah("sumbu", ...SUKU.sumbu, ...SUKU.nama),
      tambah("Jawa", ...SUKU.batang[0]),
      tambah("Melayu", ...SUKU.batang[1]),
      tambah("Minang", ...SUKU.batang[2]),
    ),
    k(
      "Periksa: sepuluh tambah tujuh tambah tujuh sama dengan dua puluh empat, sama dengan banyak data. Diagramnya benar.",
      tambah("Periksa:", ...kartu("hc", 14, 174, 272, 22, W.hijauMuda, ["10 + 7 + 7 = 24 siswa"], 9.6)),
      sorotkan("Diagramnya", "tc-b0", "tc-b1", "tc-b2"),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode",
  sumber: "Ringkasan metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan. Bar Scale: baca nilai batang dari skala, di garis atau di tengah dua garis. Axis Labels: beri label agar angka bermakna.",
      tambah(0, judul("Ringkasan")),
      tambah("Bar", ...kartu("rg1", 14, 34, 272, 40, W.hijauMuda, ["Bar Scale", "baca nilai dari skala sumbu"], 9.4)),
      tambah("Axis", ...kartu("rg2", 14, 84, 272, 40, W.langit, ["Axis Labels", "label sumbu membuat angka bermakna"], 9.4)),
    ),
    k(
      "Compare Bars: bandingkan panjang batang dan kurangkan untuk selisih. Table to Bar: ubah tabel menjadi diagram dalam empat langkah.",
      bersih(0),
      tambah(0, judul("Ringkasan")),
      tambah("Compare", ...kartu("rg3", 14, 34, 272, 40, W.krem, ["Compare Bars", "bandingkan panjang, hitung selisih"], 9.4)),
      tambah("Table", ...kartu("rg4", 14, 84, 272, 40, W.pink, ["Table to Bar", "tabel menjadi batang, 4 langkah"], 9.4)),
    ),
    k(
      "Keempatnya melengkapi cara di buku. Baca skala, baca label, bandingkan, dan buat dari tabel, lalu selalu periksa hasilnya dengan angka.",
      bersih(0),
      tambah(0, judul("Satu tujuan")),
      tambah("Keempatnya", emo("rs", 150, 80, "📊", 52)),
      tambah("skala,", ...kartu("rg5", 30, 118, 240, 30, W.krem, ["baca skala, baca label"], 9.6)),
      tambah("bandingkan", ...kartu("rg6", 30, 154, 240, 30, W.hijauMuda, ["bandingkan, buat, lalu periksa"], 9.6)),
    ),
  ],
};
