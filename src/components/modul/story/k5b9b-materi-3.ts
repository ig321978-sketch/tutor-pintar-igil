import type { AdeganStory } from "./logika-story";
import { W, barisanKotak, emo, kartu, kartuAngka, kotak, panah, teks } from "./k5b9b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b9b-bantu";

/* ------------------------------ 8. Ayo Berlatih 1: tanda lebih besar, lebih kecil, sama dengan (hlm. 287) ------------------------------ */
const SOAL_TANDA = [
  { l: "a.", kiri: "445.000", kanan: "545.000", tanda: "<" },
  { l: "b.", kiri: "657.000", kanan: "675.000", tanda: "<" },
  { l: "c.", kiri: "876.000", kanan: "867.000", tanda: ">" },
  { l: "d.", kiri: "126.789", kanan: "126.789", tanda: "=" },
  { l: "e.", kiri: "876.987", kanan: "876.789", tanda: ">" },
];
const yS = (i: number) => 62 + i * 26;
const barisSoal = (i: number) => [
  teks(`la${i}`, 30, yS(i), SOAL_TANDA[i].l, 11, W.ungu, { anchor: "start" }),
  teks(`ll${i}`, 95, yS(i), SOAL_TANDA[i].kiri, 12),
  teks(`ls${i}`, 150, yS(i), "?", 14, W.merah),
  teks(`lr${i}`, 205, yS(i), SOAL_TANDA[i].kanan, 12),
];
const lambang = (id: string, x: number, glyph: string, nama: string, warna: string) => [kotak(`${id}-k`, x, 60, 92, 62, warna, W.biru, { rx: 8 }), teks(`${id}-g`, x + 46, 96, glyph, 28), teks(`${id}-n`, x + 46, 114, nama, 8.6)];

export const ADEGAN_LATIHAN_TANDA: AdeganStory = {
  id: "latihan-tanda",
  judul: "Ayo Berlatih nomor 1: memakai tanda lebih besar, lebih kecil, atau sama dengan",
  sumber: "Buku Siswa hlm. 287; kunci Buku Panduan Guru hlm. 406",
  latar: "#F5F3FF",
  kutipan: ["Tunjukkan hubungan antara kedua bilangan berikut dengan", "menggunakan tanda", "a. 445.000 ... 545.000", "b. 657.000 ... 675.000", "c. 876.000 ... 867.000", "d. 126.789 ... 126.789", "e. 876.987 ... 876.789"],
  ketukan: [
    k(
      "Ayo Berlatih nomor 1. Tunjukkan hubungan dua bilangan memakai tanda lebih besar, lebih kecil, atau sama dengan.",
      tambah(0, teks("jud", 150, 26, "Ayo Berlatih 1", 13, W.ungu)),
      tambah("besar,", lambang("g1", 12, ">", "lebih besar", W.hijauMuda)),
      tambah("kecil,", lambang("g2", 104, "<", "lebih kecil", W.merahMuda)),
      tambah("sama", lambang("g3", 196, "=", "sama dengan", W.muda)),
    ),
    k(
      "Soal a: 445.000 dan 545.000. Ratus ribuannya 4 dan 5, jadi 445.000 lebih kecil daripada 545.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Ayo Berlatih 1", 13, W.ungu), barisSoal(0)),
      tambah("Ratus", teks("cap", 150, 192, "ratus ribuan: 4 < 5", 10, W.merah)),
      ubah("kecil", { id: "ls0", isi: "<", warna: W.hijau }),
    ),
    k(
      "Soal b: 657.000 dan 675.000. Ratus ribuan sama-sama 6. Puluh ribuannya 5 dan 7, jadi 657.000 lebih kecil daripada 675.000.",
      tambah(0, barisSoal(1)),
      ubah(0, { id: "cap", isi: "ratus ribuan: 6 = 6" }),
      ubah("Puluh", { id: "cap", isi: "puluh ribuan: 5 < 7" }),
      ubah("kecil", { id: "ls1", isi: "<", warna: W.hijau }),
    ),
    k(
      "Soal c: 876.000 dan 867.000. Ratus ribuannya sama, yaitu 8. Puluh ribuannya 7 dan 6, jadi 876.000 lebih besar daripada 867.000.",
      tambah(0, barisSoal(2)),
      ubah(0, { id: "cap", isi: "ratus ribuan: 8 = 8" }),
      ubah("Puluh", { id: "cap", isi: "puluh ribuan: 7 > 6" }),
      ubah("besar", { id: "ls2", isi: ">", warna: W.hijau }),
    ),
    k(
      "Soal d: 126.789 dan 126.789. Semua kolomnya sama, jadi kedua bilangan sama besar. Tandanya sama dengan.",
      tambah(0, barisSoal(3)),
      ubah(0, { id: "cap", isi: "semua kolom sama" }),
      ubah("Tandanya", { id: "ls3", isi: "=", warna: W.hijau }),
    ),
    k(
      "Soal e: 876.987 dan 876.789. Sampai kolom ribuan angkanya sama. Ratusannya 9 dan 7, jadi 876.987 lebih besar daripada 876.789.",
      tambah(0, barisSoal(4)),
      ubah(0, { id: "cap", isi: "ribuan ke kiri semuanya sama" }),
      ubah("Ratusannya", { id: "cap", isi: "ratusan: 9 > 7" }),
      ubah("besar", { id: "ls4", isi: ">", warna: W.hijau }),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berlatih 2: melengkapi barisan bilangan (hlm. 288) ------------------------------ */
const ids5 = (id: string) => [0, 1, 2, 3, 4].flatMap((i) => [`${id}k${i}`, `${id}t${i}`]);
const selisih = (id: string, isi: string) => [0, 1, 2, 3].map((i) => teks(`${id}${i}`, 63 + 58 * i, 54, isi, 6.6, W.merah));
const idSelisih = (id: string) => [0, 1, 2, 3].map((i) => `${id}${i}`);

export const ADEGAN_LATIHAN_BARISAN: AdeganStory = {
  id: "latihan-barisan",
  judul: "Ayo Berlatih nomor 2: melengkapi barisan bilangan",
  sumber: "Buku Siswa hlm. 288; kunci Buku Panduan Guru hlm. 406",
  latar: "#ECFDF5",
  kutipan: ["Isilah dengan bilangan-bilangan yang urutannya sesuai", "a. 978.500 979.500 982.500", "b. 500.000 700.000", "c. 462.370 462.410 462.430"],
  ketukan: [
    k(
      "Ayo Berlatih nomor 2. Lengkapi barisan bilangan sampai urutannya sesuai. Cari dulu selisih dari dua bilangan yang berdekatan.",
      tambah(0, teks("jud", 150, 26, "Ayo Berlatih 2", 13, W.ungu)),
      tambah("Lengkapi", kartu("in", 30, 56, 240, 56, W.krem, ["lengkapi barisan bilangan", "cari selisih dua bilangan berdekatan"], 9.6)),
    ),
    k(
      "Soal a: 978.500, 979.500, lalu dua kotak kosong, lalu 982.500. Selisih 979.500 dengan 978.500 adalah 1.000, jadi barisnya naik 1.000 setiap langkah.",
      hapus(0, "in-k", "in-t0", "in-t1"),
      tambah("978.500,", barisanKotak("ra", 60, ["978.500", "979.500", "", "", "982.500"])),
      tambah("Selisih", selisih("da", "+1.000")),
      tambah("naik", teks("ca", 150, 120, "naik 1.000 setiap langkah", 11, W.ungu)),
    ),
    k(
      "Isinya 980.500 dan 981.500. Cek: 981.500 ditambah 1.000 menjadi 982.500. Cocok.",
      ubah("980.500", { id: "rat2", isi: "980.500", warna: W.hijau }, { id: "rak2", warna: W.hijauMuda }),
      ubah("981.500", { id: "rat3", isi: "981.500", warna: W.hijau }, { id: "rak3", warna: W.hijauMuda }),
      ubah("Cek:", { id: "ca", isi: "cek: 981.500 + 1.000 = 982.500" }),
    ),
    k(
      "Soal b: kotak kosong, 500.000, 700.000, lalu dua kotak kosong. Selisih 700.000 dengan 500.000 adalah 200.000, jadi barisnya naik 200.000 setiap langkah.",
      hapus(0, ids5("ra"), idSelisih("da"), "ca"),
      tambah("kosong,", barisanKotak("rb", 60, ["", "500.000", "700.000", "", ""])),
      tambah("Selisih", selisih("db", "+200.000")),
      tambah("naik", teks("cb", 150, 120, "naik 200.000 setiap langkah", 11, W.ungu)),
    ),
    k(
      "Isinya 300.000, 900.000, dan 1.100.000. Catatan, 1.100.000 sudah melewati 1.000.000, tetapi kunci buku tetap menuliskannya.",
      ubah("300.000", { id: "rbt0", isi: "300.000", warna: W.hijau }, { id: "rbk0", warna: W.hijauMuda }),
      ubah("900.000", { id: "rbt3", isi: "900.000", warna: W.hijau }, { id: "rbk3", warna: W.hijauMuda }),
      ubah("1.100.000", { id: "rbt4", isi: "1.100.000", warna: W.hijau }, { id: "rbk4", warna: W.hijauMuda }),
      tambah("Catatan,", teks("cc", 150, 160, "bab ini sampai 1.000.000", 11, W.merah)),
      sorotkan("Catatan,", "rbk4"),
    ),
    k(
      "Soal c: kotak kosong, 462.370, kotak kosong, 462.410, 462.430. Selisih 462.430 dengan 462.410 adalah 20, jadi naik 20 setiap langkah. Isinya 462.350 dan 462.390.",
      hapus(0, ids5("rb"), idSelisih("db"), "cb", "cc"),
      tambah("kosong,", barisanKotak("rc", 60, ["", "462.370", "", "462.410", "462.430"])),
      tambah("Selisih", selisih("dc", "+20")),
      tambah("naik", teks("cd", 150, 120, "naik 20 setiap langkah", 11, W.ungu)),
      ubah("Isinya", { id: "rct0", isi: "462.350", warna: W.hijau }, { id: "rck0", warna: W.hijauMuda }),
      ubah("462.390.", { id: "rct2", isi: "462.390", warna: W.hijau }, { id: "rck2", warna: W.hijauMuda }),
    ),
  ],
};

/* ------------------------------ 10. Kesalahan umum, diferensiasi, dan refleksi (hlm. 290; Buku Panduan Guru hlm. 406) ------------------------------ */
export const ADEGAN_REFLEKSI_B: AdeganStory = {
  id: "refleksi-b",
  judul: "Kesalahan umum, pendampingan, dan refleksi Sub-Bab B",
  sumber: "Buku Siswa hlm. 290; Buku Panduan Guru hlm. 406",
  latar: "#FFF1F2",
  kutipan: ["Aku dapat membandingkan dua bilangan", "Aku dapat mengurutkan beberapa bilangan"],
  ketukan: [
    k(
      "Kesalahan yang mungkin terjadi, kata Buku Panduan Guru: murid menganggap angka paling belakang menentukan urutan. Padahal angka paling kiri yang pertama kita lihat.",
      tambah(0, teks("jud", 150, 26, "Kesalahan umum", 13, W.ungu)),
      tambah(0, kartuAngka("m1", 24, 56, 112, "876.987", W.putih, 14), kartuAngka("m2", 164, 56, 112, "876.789", W.putih, 14)),
      tambah("belakang", panah("pb", 270, 104, -230, 0, W.merah, 2, { gambar: true }), teks("pbt", 150, 124, "keliru: dilihat dari belakang", 10, W.merah)),
    ),
    k(
      "Contoh: 876.987 dan 876.789. Satuannya 7 dan 9. Kalau hanya melihat satuan, kita keliru menyimpulkan 876.789 lebih besar.",
      sorotkan("Satuannya", "m1-k", "m2-k"),
      tambah("Satuannya", teks("cs", 150, 156, "satuan: 7 dan 9", 11, W.biru)),
      tambah("keliru", emo("x1", 30, 196, "❌", 20), teks("cx", 150, 169, "876.789 lebih besar? salah", 10, W.merah)),
    ),
    k(
      "Cara yang benar: mulai dari kiri dan berhenti di kolom pertama yang berbeda. Di sini ratusannya 9 dan 7, jadi 876.987 yang lebih besar.",
      hapus(0, "pb", "pbt", "x1", "cx", "cs"),
      tambah("kiri", panah("pk", 40, 104, 230, 0, W.hijau, 2, { gambar: true }), teks("pkt", 150, 124, "benar: mulai dari kiri", 10, W.hijau)),
      tambah("ratusannya", teks("cr", 150, 156, "ratusan: 9 > 7", 11, W.biru)),
      tambah("jadi", emo("v1", 30, 196, "✅", 20), teks("cv", 150, 169, "876.987 lebih besar", 10, W.hijau)),
    ),
    k(
      "Murid yang belajar cepat boleh mengerjakan latihan tanpa bantuan, atau mencari bilangan yang sering mereka temui. Guru mendampingi murid yang masih kesulitan.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Pendampingan guru", 13, W.ungu)),
      tambah("cepat", kartu("d1", 20, 56, 120, 70, W.hijauMuda, ["murid cepat paham", "latihan tanpa bantuan", "cari bilangan lain"], 8.2)),
      tambah("Guru", kartu("d2", 160, 56, 120, 70, W.krem, ["murid masih kesulitan", "didampingi guru"], 8.6)),
    ),
    k(
      "Refleksi. Centang dalam hati: aku dapat membandingkan dua bilangan cacah sampai 1.000.000. Aku dapat mengurutkan beberapa bilangan cacah sampai 1.000.000.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Refleksi", 13, W.ungu)),
      tambah("membandingkan", kotak("ck1", 18, 66, 12, 12, W.putih, W.biru, { rx: 2 }), teks("ct1", 38, 76, "Aku dapat membandingkan dua bilangan", 8.8, W.biru, { anchor: "start" })),
      tambah("mengurutkan", kotak("ck2", 18, 98, 12, 12, W.putih, W.biru, { rx: 2 }), teks("ct2", 38, 108, "Aku dapat mengurutkan beberapa bilangan", 8.8, W.biru, { anchor: "start" })),
      tambah("1.000.000.", teks("ctj", 150, 150, "cacah sampai 1.000.000", 11, W.merah)),
    ),
    k(
      "Dengan tabel nilai tempat dan kolom paling kiri, kita bisa membandingkan dan mengurutkan bilangan sampai 1.000.000 dengan yakin.",
      ubah("tabel", { id: "ck1", warna: W.hijauMuda }, { id: "ck2", warna: W.hijauMuda }),
      tambah("yakin.", emo("yk", 150, 190, "💪", 26)),
    ),
  ],
};
