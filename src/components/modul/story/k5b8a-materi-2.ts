import type { AdeganStory, Aksi } from "./logika-story";
import { KOL_FREK, W, barisFrek, emo, garis, idBarisFrek, judul, kartu, kartuSiswa, kepalaFrek, panah, tabel, teks, turus } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 5. Mengumpulkan data sayuran favorit ------------------------------ */
const SISWA: [string, string[]][] = [
  ["Kira", ["Kangkung", "wortel", "bayam"]],
  ["Igil", ["Bayam", "sawi"]],
  ["Malosi", ["Wortel", "kol", "sawi"]],
  ["Halim", ["Buncis", "wortel", "tomat"]],
  ["Upe", ["Kangkung", "tomat"]],
  ["Wei", ["Kol", "wortel"]],
  ["Meli", ["Kangkung", "buncis"]],
  ["Tiara", ["Bayam"]],
];
const kartuNo = (i: number) => kartuSiswa(`sw${i}`, 12 + (i % 4) * 72, i < 4 ? 32 : 82, 68, SISWA[i][0], SISWA[i][1]);

export const ADEGAN_SAYURAN: AdeganStory = {
  id: "sayuran-data",
  judul: "Mengumpulkan data sayuran favorit",
  sumber: "Materi: data sayuran favorit",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b8a-materi-2.ts:1"),
  ketukan: [
    k(
      "Sekarang kita mulai mengumpulkan data. Malosi dan teman-temannya sedang membahas sayur. Sayuran baik untuk kesehatan dan memperlancar pencernaan, lho.",
      tambah(0, judul("Mengumpulkan data")),
      tambah("Malosi", emo("v1", 80, 92, "🥦", 36), emo("v2", 150, 92, "🥕", 36), emo("v3", 220, 92, "🍅", 36)),
      tambah("kesehatan", teks("vt", 150, 150, "sayur baik untuk kesehatan", 10.4, W.hijau)),
    ),
    k(
      "Setiap anak menuliskan paling banyak tiga jenis sayuran favorit. Ada enam belas anak di kelas lima, dan catatannya masih tersebar di mana-mana.",
      bersih(0),
      tambah(0, judul("sayuran favorit kelas V")),
      tambah("Setiap", ...[0, 1, 2, 3].flatMap(kartuNo)),
      tambah("Ada", ...[4, 5, 6, 7].flatMap(kartuNo)),
      tambah("tersebar.", teks("n1", 150, 150, "16 anak, tiap anak paling banyak 3 sayur", 9.4, W.hijau)),
    ),
    k(
      "Sekarang pertanyaannya, sayuran apa yang paling banyak disukai? Karena datanya masih tersebar, kita sulit menghitung dan bisa ada yang terlewat atau terhitung dua kali.",
      hapus(0, "n1"),
      tambah("pertanyaannya,", teks("q1", 150, 150, "sayuran apa yang paling banyak disukai?", 10, W.ungu)),
      tambah("terlewat", teks("q2", 150, 170, "mudah terlewat atau terhitung dua kali", 9.4, W.merah)),
    ),
    k(
      "Malosi mengusulkan menulis dulu semua nama sayuran, lalu menghitung banyaknya siswa yang menyukai tiap jenis. Kira mengusulkan memakai tabel hitungan, seperti yang sudah kita pelajari di kelas empat.",
      bersih(0),
      tambah(0, judul("tulis nama sayuran dulu")),
      tambah("Malosi", ...["Bayam", "Kangkung", "Wortel", "Tomat"].flatMap((n, i) => kartu(`ch${i}`, 12 + i * 72, 36, 66, 24, W.hijauMuda, [n], 8.6))),
      tambah("menulis", ...["Buncis", "Sawi", "Kol"].flatMap((n, i) => kartu(`ci${i}`, 12 + i * 72, 70, 66, 24, W.hijauMuda, [n], 8.6))),
      tambah("Kira", panah("pt", 150, 104, 0, 22, W.ungu, 3, { gambar: true })),
      tambah("tabel", ...kartu("tb", 70, 130, 160, 34, W.krem, ["tabel hitungan", "tujuh jenis sayuran"], 9)),
    ),
    k(
      "Nah, ada dua cara mencatat yang bisa kita pakai, yaitu memberi tanda centang atau menarik garis. Ayo kita bandingkan keduanya pada adegan berikutnya.",
      bersih(0),
      tambah(0, judul("dua cara mencatat")),
      tambah("centang", ...kartu("cr1", 20, 50, 122, 56, W.hijauMuda, ["tanda centang", "✓ ✓ ✓"], 9.6)),
      tambah("garis.", ...kartu("cr2", 158, 50, 122, 56, W.langit, ["tarik garis", "| | | |"], 9.6)),
      tambah("bandingkan", teks("cr3", 150, 150, "mana yang lebih rapi?", 10.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ 6. Tabel 8.2 (centang) dan Tabel 8.3 (garis) (hlm. 243) ------------------------------ */
const CENTANG = (n: number) => Array.from({ length: n }, () => "✓").join(" ");

export const ADEGAN_CENTANG_GARIS: AdeganStory = {
  id: "centang-garis",
  judul: "Mencatat dengan centang dan garis",
  sumber: "Materi: centang dan garis",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k5b8a-materi-2.ts:2"),
  ketukan: [
    k(
      "Ada dua tabel contoh. Tabel pertama dibuat Halim dan Igil, dengan satu centang untuk setiap siswa yang menyukai satu jenis sayur.",
      tambah(0, judul("Tabel pertama: tanda centang")),
      tambah("Tabel", ...tabel("c", 40, 34, KOL_FREK, [["Sayuran", "Centang", "Jumlah"]], 18, 8.6)),
      tambah("centang", ...tabel("c", 40, 34, KOL_FREK, [["Sayuran", "Centang", "Jumlah"], ["Bayam", CENTANG(7), "7"], ["Kangkung", CENTANG(6), "6"], ["Wortel", CENTANG(8), "8"]], 18, 8.2).slice(6)),
    ),
    k(
      "Pada tabel pertama, bayam punya tujuh centang, kangkung enam, dan wortel delapan. Jumlah centang sama dengan jumlah siswa yang memilih.",
      sorotkan("bayam", "c-s10", "c-s11", "c-s12"),
      sorotkan("kangkung", "c-s20", "c-s21", "c-s22"),
      sorotkan("wortel", "c-s30", "c-s31", "c-s32"),
    ),
    k(
      "Tabel kedua dibuat Kira, Malosi, dan Upe dengan garis. Satu garis untuk satu siswa, sehingga tidak ada data yang terlewat atau terhitung dua kali.",
      bersih(0),
      tambah(0, judul("Tabel kedua: garis")),
      tambah("Tabel", ...kepalaFrek("g", 40, 34, ["Sayuran", "Garis", "Jumlah"], KOL_FREK, 18, 8.6)),
      tambah("garis.", ...barisFrek("g", 40, 34, 1, "Bayam", 7, KOL_FREK, 18, 8.6)),
      tambah("Satu", ...barisFrek("g", 40, 34, 2, "Kangkung", 6, KOL_FREK, 18, 8.6)),
      tambah("sehingga", ...barisFrek("g", 40, 34, 3, "Wortel", 8, KOL_FREK, 18, 8.6)),
    ),
    k(
      "Hasilnya sama: bayam tujuh, kangkung enam, wortel delapan. Hanya cara mencatatnya yang berbeda, centang atau garis.",
      tambah("sama:", teks("hs", 150, 128, "hasil sama, cara mencatat berbeda", 10, W.hijau)),
      sorotkan("bayam", "g-r1b", "g-r1c"),
      sorotkan("kangkung", "g-r2b", "g-r2c"),
      sorotkan("wortel", "g-r3b", "g-r3c"),
    ),
    k(
      "Garis-garis seperti buatan kelompok Kira itu disebut turus. Kita pelajari lebih dekat pada adegan berikutnya.",
      tambah("Garis-garis", panah("pg", 150, 168, 0, -22, W.ungu, 3, { gambar: true })),
      tambah("turus.", teks("tu", 150, 184, "garis seperti ini disebut turus", 10.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ 7. Turus dan frekuensi (hlm. 244) ------------------------------ */
export const ADEGAN_TURUS: AdeganStory = {
  id: "turus-frekuensi",
  judul: "Turus dan frekuensi",
  sumber: "Materi: turus dan frekuensi",
  latar: "#EEF2FF",
  kutipan: kutipanLokal("k5b8a-materi-2.ts:3"),
  ketukan: [
    k(
      "Tahukah kalian? Garis-garis buatan kelompok Kira disebut turus. Turus adalah cara mencatat hasil pengamatan dengan tanda garis.",
      tambah(0, judul("Tahukah kalian? Turus")),
      tambah("Garis-garis", ...turus("tr", 118, 52, 3, 34, W.hitam)),
      tambah("tanda", teks("tl", 150, 130, "satu pengamatan, satu garis", 10.4, W.hijau)),
    ),
    k(
      "Satu hasil pengamatan diwakili satu tanda, yaitu garis tegak, garis miring ke kanan, atau garis miring ke kiri. Dengan turus, tidak ada hasil yang terlewat.",
      tambah("tegak,", ...kartu("sa", 30, 138, 60, 40, W.putih, ["|"], 22), teks("sat", 60, 192, "tegak", 8, W.biru)),
      tambah("kanan,", ...kartu("sb", 120, 138, 60, 40, W.putih, ["/"], 22), teks("sbt", 150, 192, "miring kanan", 8, W.biru)),
      tambah("kiri.", ...kartu("sc", 210, 138, 60, 40, W.putih, ["\\"], 22), teks("sct", 240, 192, "miring kiri", 8, W.biru)),
    ),
    k(
      "Agar mudah dibaca, turus dibuat dalam kelompok. Setiap kelompok berisi lima garis: empat garis tegak dan satu garis miring.",
      bersih(0),
      tambah(0, judul("kelompok lima")),
      tambah("kelompok.", ...turus("k5", 120, 44, 5, 44, W.hitam)),
      tambah("lima", teks("m5", 150, 120, "5 garis", 12, W.ungu)),
      tambah("empat", teks("m4", 82, 150, "4 garis tegak", 9.6, W.hijau)),
      tambah("satu", teks("m1", 218, 150, "1 garis miring", 9.6, W.merah)),
    ),
    k(
      "Mengapa lima garis tidak dibuat tegak semua? Garis miring mengikat empat garis sebelumnya, sehingga kelompok lima terlihat jelas dan mudah dihitung.",
      bersih(0),
      tambah(0, judul("mengapa tidak tegak semua?")),
      tambah("tegak", ...[0, 1, 2, 3, 4].map((i) => garis(`tg${i}`, 56 + i * 5.4, 48, 0, 40, W.hitam, 1.6)), teks("tgt", 70, 116, "tegak semua:", 8.6, W.merah), teks("tgu", 70, 128, "sulit dihitung", 8.6, W.merah)),
      tambah("miring", ...turus("tm", 196, 48, 5, 40, W.hitam), teks("tmt", 214, 116, "ada garis miring:", 8.6, W.hijau), teks("tmu", 214, 128, "langsung terlihat lima", 8.6, W.hijau)),
    ),
    k(
      "Dalam pengumpulan data dikenal juga istilah frekuensi. Frekuensi adalah bilangan yang menyatakan seberapa sering atau seberapa banyak suatu peristiwa terjadi.",
      bersih(0),
      tambah(0, judul("frekuensi")),
      tambah("frekuensi.", ...kartu("fr", 30, 50, 240, 62, W.krem, ["frekuensi:", "seberapa sering atau", "seberapa banyak terjadi"], 10.4)),
    ),
    k(
      "Pada data sayuran favorit, tujuh anak menyukai bayam, yaitu Kira, Igil, Tiara, Kinanti, Wei, Robert, dan Farah. Jadi frekuensi bayam adalah tujuh orang. Hati-hati, hitung nama satu per satu supaya tidak keliru.",
      bersih(0),
      tambah(0, judul("frekuensi bayam")),
      tambah("tujuh", ...turus("by", 100, 44, 7, 30, W.hitam)),
      tambah("yaitu", teks("by1", 150, 124, "Kira, Igil, Tiara, Kinanti,", 8.6, W.hijau), teks("by2", 150, 136, "Wei, Robert, Farah", 8.6, W.hijau)),
      tambah("adalah", teks("by7", 150, 100, "frekuensi bayam: 7 orang", 11, W.ungu)),
      tambah("Hati-hati,", teks("by3", 150, 166, "hitung nama satu per satu", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berdiskusi (hlm. 245) ------------------------------ */
const T = { x: 40, y: 26, h: 16, u: 7.8 };
const baris = (r: number, nama: string, n: number | null) => barisFrek("tf", T.x, T.y, r, nama, n, KOL_FREK, T.h, T.u);
const isi = (at: string | number, r: number, nama: string, n: number): Aksi[] => [hapus(at, ...idBarisFrek("tf", r, null)), tambah(at, ...baris(r, nama, n))];

export const ADEGAN_DISKUSI: AdeganStory = {
  id: "ayo-berdiskusi",
  judul: "Menyusun tabel frekuensi sayuran",
  sumber: "Materi: tabel frekuensi sayuran",
  latar: "#FFF1F2",
  kutipan: kutipanLokal("k5b8a-materi-2.ts:4"),
  ketukan: [
    k(
      "Sekarang kita lengkapi tabel frekuensi sayuran favorit. Bayam tujuh, kangkung enam, dan wortel delapan sudah terisi. Sisanya kita hitung dari data.",
      tambah(0, ...kepalaFrek("tf", T.x, T.y, ["Sayuran", "Turus", "Frekuensi"], KOL_FREK, T.h, T.u)),
      tambah("tabel", teks("jud", 150, 18, "Tabel Frekuensi Sayuran", 9.6, W.ungu)),
      tambah("Bayam", ...baris(1, "Bayam", 7)),
      tambah("kangkung", ...baris(2, "Kangkung", 6)),
      tambah("wortel", ...baris(3, "Wortel", 8)),
      tambah("terisi.", ...baris(4, "Tomat", null), ...baris(5, "Buncis", null), ...baris(6, "Sawi", null), ...baris(7, "Kol", null)),
    ),
    k(
      "Kita hitung dari data enam belas anak. Tomat dipilih Halim, Upe, Randi, Tomi, Ucok, dan Farah, jadi frekuensi tomat adalah enam.",
      tambah("Tomat", teks("nm", 150, 160, "Halim, Upe, Randi, Tomi, Ucok, Farah", 7.8, W.hijau)),
      ...isi("jadi", 4, "Tomat", 6),
    ),
    k(
      "Buncis dipilih Halim, Meli, Wei, dan Ucok, jadi empat. Sawi dipilih Igil, Malosi, Randi, Robert, dan Ucok, jadi lima. Kol dipilih Malosi, Wei, dan Kinanti, jadi tiga.",
      hapus(0, "nm"),
      tambah("Buncis", teks("nb", 150, 160, "Halim, Meli, Wei, Ucok", 7.8, W.hijau)),
      ...isi("jadi", 5, "Buncis", 4),
      tambah("Sawi", teks("ns", 150, 172, "Igil, Malosi, Randi, Robert, Ucok", 7.8, W.hijau)),
      ...isi("jadi@2", 6, "Sawi", 5),
      tambah("Kol", teks("nk", 150, 184, "Malosi, Wei, Kinanti", 7.8, W.hijau)),
      ...isi("jadi@3", 7, "Kol", 3),
    ),
    k(
      "Jumlah semua frekuensi adalah tujuh ditambah enam ditambah delapan ditambah enam ditambah empat ditambah lima ditambah tiga, yaitu tiga puluh sembilan. Angka ini lebih banyak dari jumlah anak, karena tiap anak boleh memilih sampai tiga sayuran.",
      hapus(0, "nb", "ns", "nk"),
      tambah("Jumlah", teks("jm", 150, 162, "7 + 6 + 8 + 6 + 4 + 5 + 3 = 39", 10, W.ungu)),
      tambah("Angka", teks("jn", 150, 180, "39 pilihan dari 16 anak, tiap anak sampai 3", 8.6, W.merah)),
    ),
    k(
      "Sekarang coba jelaskan dengan bahasamu sendiri: apa itu tabel frekuensi? Jawabannya, tabel yang menunjukkan daftar objek yang diamati dan frekuensi tiap objek.",
      bersih(0),
      tambah(0, judul("apa itu tabel frekuensi?")),
      tambah("tabel", ...kartu("df", 20, 50, 260, 70, W.krem, ["tabel frekuensi:", "daftar objek yang diamati", "dan frekuensi tiap objek"], 10.4)),
    ),
    k(
      "Sekarang kita periksa tiga pernyataan. Pernyataan pertama, wortel paling banyak disukai, tepat, sebab wortel punya frekuensi terbesar, yaitu delapan.",
      bersih(0),
      tambah(0, judul("tiga pernyataan")),
      tambah("pertama,", ...kartu("p1", 8, 36, 92, 60, W.langit, ["paling banyak", "disukai:", "wortel"], 8.6)),
      tambah("tepat,", teks("v1", 54, 116, "tepat: wortel 8", 8.6, W.hijau)),
    ),
    k(
      "Pernyataan kedua, tomat lebih banyak daripada bayam, salah, sebab tomat hanya enam sedangkan bayam tujuh.",
      tambah("kedua,", ...kartu("p2", 104, 36, 92, 60, W.langit, ["tomat lebih", "banyak dari", "bayam"], 8.6)),
      tambah("salah,", teks("v2", 150, 116, "salah: tomat 6, bayam 7", 8.2, W.merah)),
    ),
    k(
      "Pernyataan ketiga, buncis paling sedikit disukai, juga salah, sebab kol hanya tiga sedangkan buncis empat.",
      tambah("ketiga,", ...kartu("p3", 200, 36, 92, 60, W.langit, ["paling sedikit", "disukai:", "buncis"], 8.6)),
      tambah("salah,", teks("v3", 246, 116, "salah: kol 3, buncis 4", 8.2, W.merah)),
    ),
  ],
};
