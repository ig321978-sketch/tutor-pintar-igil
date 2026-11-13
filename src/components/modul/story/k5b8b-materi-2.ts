import type { AdeganStory } from "./logika-story";
import { PJ, PX, W, apem, barisApem, emo, garis, kartu, kunciApem, tabelPerBaris, teks } from "./k5b8b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8b-bantu";

/** Catatan hitungan di kanan baris piktogram. */
const catatan = (id: string, x: number, y: number, isi: string) => teks(id, x, y, isi, 7.4, W.merah, { anchor: "start" });

/* ------------------------------ 5. Tabel penjualan kue apem (hlm. 250) ------------------------------ */
const TABEL_APEM = tabelPerBaris("ta", 20, 38, ["Hari", "Banyaknya Penjualan"], [["Senin", "40"], ["Selasa", "35"], ["Rabu", "30"], ["Kamis", "37"], ["Jumat", "27"], ["Sabtu", "29"]], 62, 78);

export const ADEGAN_APEM_TABEL: AdeganStory = {
  id: "apem-tabel",
  judul: "Cerita Anggi dan Tabel 8.6 penjualan kue apem",
  sumber: "Buku Siswa hlm. 250; Buku Panduan Guru hlm. 359–360",
  latar: "#FFF7ED",
  kutipan: ["Anggi sangat tekun mengejar cita-citanya menjadi pengusaha", "Tabel 8.6 Hasil Penjualan Kue Apem", "kue apem. Tabel berikut adalah hasil penjualan kue apem"],
  ketukan: [
    k(
      "Anggi sangat tekun mengejar cita-citanya menjadi pengusaha makanan. Setiap pulang sekolah ia membantu ibunya berjualan kue tradisional di pasar sore.",
      tambah(0, teks("jud", 150, 24, "Anggi dan kue apem", 13, W.ungu)),
      tambah("Anggi", emo("ag", 150, 92, "👧", 42)),
      tambah("pengusaha", kartu("cc", 50, 112, 200, 34, W.krem, ["cita-cita: pengusaha makanan"], 9.4)),
      tambah("pasar", teks("ps", 150, 172, "berjualan di pasar sore", 10.4, W.hijau)),
    ),
    k(
      "Ibunya menjual kue apem, dan Anggi mencatat penjualannya selama seminggu pada Tabel 8.6. Hari Senin terjual 40 kue apem, hari Selasa terjual 35 kue apem.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tabel 8.6 Hasil Penjualan Kue Apem", 10.4, W.ungu)),
      tambah("Tabel", TABEL_APEM[0]),
      tambah("Senin", TABEL_APEM[1]),
      tambah("Selasa", TABEL_APEM[2]),
    ),
    k(
      "Hari Rabu terjual 30 kue apem, hari Kamis 37, hari Jumat 27, dan hari Sabtu 29 kue apem. Itulah data penjualan yang kita punya.",
      tambah("Rabu", TABEL_APEM[3]),
      tambah("Kamis", TABEL_APEM[4]),
      tambah("Jumat", TABEL_APEM[5]),
      tambah("Sabtu", TABEL_APEM[6]),
    ),
    k(
      "Anggi bertanya, bagaimana cara menampilkan data penjualan apem ini agar lebih menarik? Di kelas sebelumnya kita sudah membuat diagram dengan gambar-gambar.",
      tambah("bertanya,", emo("bk", 238, 60, "🤔", 32)),
      tambah("menarik?", kartu("bq", 166, 82, 122, 46, W.putih, ["bagaimana menampilkan", "data agar lebih menarik?"], 7.8)),
    ),
    k(
      "Jika memakai gambar, diagram jadi lebih menarik. Gambar apem itulah yang dipakai untuk piktogram, dengan kunci: satu gambar mewakili 4 kue apem.",
      tambah("Gambar", teks("kk", 226, 150, "kunci piktogram", 8.4, W.ungu)),
      tambah("mewakili", kunciApem("kn", 160, 158, "mewakili 4 kue apem")),
    ),
  ],
};

/* ------------------------------ 6. Piktogram penjualan kue apem, Gambar 8.3 (hlm. 250) ------------------------------ */
const Y_APEM = (i: number) => 44 + i * 21;

export const ADEGAN_APEM_PIKTOGRAM: AdeganStory = {
  id: "apem-piktogram",
  judul: "Gambar 8.3: membaca piktogram penjualan kue apem",
  sumber: "Buku Siswa hlm. 250",
  latar: "#F0F9FF",
  kutipan: ["Banyaknya Penjualan Kue Apem", "mewakili 4 kue apem", "Gambar 8.3 Piktogram Hasil"],
  ketukan: [
    k(
      "Inilah Gambar 8.3, piktogram penjualan kue apem. Di sebelah kiri tertulis nama hari, dan di sebelah kanan tertulis gambar kue apem.",
      tambah(0, teks("jud", 150, 20, "Gambar 8.3: Penjualan Kue Apem", 11, W.ungu)),
      tambah("kiri", garis("ax", PX - 8, 34, 0, 128, W.hitam, 2, { gambar: true })),
      tambah("kanan", teks("pk", 236, 34, "gambar kue apem", 8.6, W.merah)),
    ),
    k(
      "Pertama kita baca kuncinya. Satu gambar kue apem utuh mewakili 4 kue apem.",
      tambah("kuncinya.", kunciApem("kn", 86, 170, "mewakili 4 kue apem")),
      sorotkan("utuh", "kn-g"),
    ),
    k(
      "Senin terjual 40 kue apem. Empat puluh dibagi 4 sama dengan 10, jadi Senin digambar 10 apem utuh.",
      tambah("Senin", barisApem("sn", Y_APEM(0), "Senin", 40)),
      tambah("dibagi", catatan("snc", 232, Y_APEM(0) + 3, "40 : 4 = 10")),
    ),
    k(
      "Selasa terjual 35. Tiga puluh lima dibagi 4 hasilnya 8 sisa 3, jadi 8 apem utuh dan satu potongan tiga perempat.",
      tambah("Selasa", barisApem("sl", Y_APEM(1), "Selasa", 35)),
      tambah("hasilnya", catatan("slc", 204, Y_APEM(1) + 3, "35 : 4 = 8 sisa 3")),
    ),
    k(
      "Rabu terjual 30. Tiga puluh dibagi 4 hasilnya 7 sisa 2, jadi 7 apem utuh dan satu potongan setengah.",
      tambah("Rabu", barisApem("rb", Y_APEM(2), "Rabu", 30)),
      tambah("hasilnya", catatan("rbc", 192, Y_APEM(2) + 3, "30 : 4 = 7 sisa 2")),
    ),
    k(
      "Gambar harus berukuran sama, dan potongan hanya mewakili sisa. Buku sengaja membuat satu gambar yang tidak tepat dan meminta kita menemukannya.",
      tambah("Gambar", kartu("pr", 40, 112, 220, 44, W.krem, ["gambar berukuran sama", "ada satu gambar tidak tepat"], 9)),
      sorotkan("menemukannya.", "pr-k"),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berdiskusi 1 dan 2: menemukan kesalahan dan melengkapi (hlm. 251) ------------------------------ */
export const ADEGAN_APEM_SALAH: AdeganStory = {
  id: "apem-salah",
  judul: "Ayo Berdiskusi 1 dan 2: temukan kesalahan, lalu lengkapi piktogram",
  sumber: "Buku Siswa hlm. 251; Buku Panduan Guru hlm. 360–361",
  latar: "#FEFCE8",
  kutipan: ["Ayo Berdiskusi", "Temukan kesalahan pembuatan gambarnya", "perbaikilah sehingga gambar menjadi benar", "Piktogram tersebut belum selesai, salin dan lengkapi piktogram"],
  ketukan: [
    k(
      "Ayo Berdiskusi nomor 1: temukan kesalahan pada gambar piktogram, lalu perbaiki. Caranya, banyak gambar dikali 4 harus sama dengan data tabel.",
      tambah(0, teks("jud", 150, 22, "Ayo Berdiskusi nomor 1", 13, W.ungu)),
      tambah("Caranya,", kartu("rg", 40, 56, 220, 54, W.krem, ["banyak gambar x 4", "harus sama dengan data tabel"], 10)),
    ),
    k(
      "Senin: 10 gambar dikali 4 sama dengan 40, cocok dengan tabel. Kamis: 9 gambar utuh dikali 4 baru 36, padahal tabel mencatat 37.",
      hapus(0, "rg-k", "rg-t0", "rg-t1"),
      tambah("Senin:", barisApem("sn", 52, "Senin", 40), teks("snc", 150, 74, "10 x 4 = 40: cocok", 9.4, W.hijau)),
      tambah("Kamis:", barisApem("km", 100, "Kamis", 36), teks("kmc", 150, 122, "9 x 4 = 36, tabel 37: kurang", 9.4, W.merah)),
    ),
    k(
      "Jadi gambar hari Kamis kurang satu kue. Buku Panduan Guru menambahkan seperempat gambar, sebab 36 ditambah 1 sama dengan 37.",
      tambah("seperempat", apem("kmq1", PX + 9 * PJ, 100, 1)),
      sorotkan("seperempat", "kmq1"),
      tambah("sebab", teks("kmd", 150, 150, "36 + 1 = 37", 12, W.hijau)),
    ),
    k(
      "Nomor 2: piktogram belum selesai, jadi kita lengkapi. Jumat terjual 27, dan 27 dibagi 4 hasilnya 6 sisa 3, jadi 6 apem utuh dan potongan tiga perempat.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nomor 2: lengkapi piktogram", 13, W.ungu)),
      tambah("Jumat", barisApem("jm", 70, "Jumat", 27)),
      tambah("hasilnya", catatan("jmc", 176, 73, "27 : 4 = 6 sisa 3")),
    ),
    k(
      "Sabtu terjual 29, dan 29 dibagi 4 hasilnya 7 sisa 1, jadi 7 apem utuh dan potongan seperempat.",
      tambah("Sabtu", barisApem("sb", 104, "Sabtu", 29)),
      tambah("hasilnya", catatan("sbc", 192, 107, "29 : 4 = 7 sisa 1")),
    ),
    k(
      "Sekarang piktogram sudah lengkap dan benar. Setiap baris punya gambar utuh sebanyak hasil bagi, dan satu potongan untuk sisanya.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Piktogram lengkap", 13, W.ungu)),
      tambah("lengkap", APEM_BARIS(0), APEM_BARIS(1), APEM_BARIS(2)),
      tambah("hasil", APEM_BARIS(3), APEM_BARIS(4), APEM_BARIS(5)),
      tambah("potongan", kunciApem("kn", 86, 170, "mewakili 4 kue apem")),
    ),
  ],
};

/** Baris ke-i piktogram apem lengkap (Senin sampai Sabtu). */
function APEM_BARIS(i: number) {
  const data = [["Senin", 40], ["Selasa", 35], ["Rabu", 30], ["Kamis", 37], ["Jumat", 27], ["Sabtu", 29]] as const;
  return barisApem(`l${i}`, 46 + i * 20, data[i][0], data[i][1]);
}

/* ------------------------------ 8. Ayo Berdiskusi 3 sampai 5 dan definisi piktogram (hlm. 251) ------------------------------ */
export const ADEGAN_APEM_HITUNG: AdeganStory = {
  id: "apem-hitung",
  judul: "Ayo Berdiskusi 3 sampai 5: total, keuntungan, dan arti piktogram",
  sumber: "Buku Siswa hlm. 251; Buku Panduan Guru hlm. 361",
  latar: "#F0FDF4",
  kutipan: ["Berapa banyaknya kue apem yang berhasil dijual selama", "Rp1.200,00", "Rp1.500,00", "Piktogram adalah penyajian data dengan"],
  ketukan: [
    k(
      "Nomor 3: berapa kue apem yang terjual selama seminggu? Jumlahkan data tabel: 40 ditambah 35 sama dengan 75, lalu ditambah 30 sama dengan 105.",
      tambah(0, teks("jud", 150, 22, "Nomor 3: total seminggu", 13, W.ungu)),
      tambah("75,", teks("e1", 150, 56, "40 + 35 = 75", 13, W.biru)),
      tambah("105.", teks("e2", 150, 82, "75 + 30 = 105", 13, W.biru)),
    ),
    k(
      "Lalu 105 ditambah 37 sama dengan 142, ditambah 27 sama dengan 169, dan ditambah 29 sama dengan 198 kue apem.",
      tambah("142,", teks("e3", 150, 108, "105 + 37 = 142", 13, W.biru)),
      tambah("169,", teks("e4", 150, 134, "142 + 27 = 169", 13, W.biru)),
      tambah("198", teks("e5", 150, 160, "169 + 29 = 198", 13, W.biru)),
      tambah("apem.", teks("e6", 150, 186, "198 kue apem", 13, W.merah)),
    ),
    k(
      "Nomor 4: satu kue apem dibeli seharga seribu dua ratus rupiah dan dijual seribu lima ratus rupiah. Jadi untung satu kue adalah tiga ratus rupiah.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nomor 4: keuntungan", 13, W.ungu)),
      tambah("dibeli", teks("u1", 150, 56, "beli: Rp1.200 per kue", 12, W.biru)),
      tambah("dijual", teks("u2", 150, 82, "jual: Rp1.500 per kue", 12, W.biru)),
      tambah("untung", teks("u3", 150, 116, "1.500 - 1.200 = 300", 14, W.hijau)),
    ),
    k(
      "Keuntungan seluruhnya adalah 300 rupiah dikali 198 kue, yaitu 59.400 rupiah. Jadi ibunya Anggi untung 59.400 rupiah.",
      tambah("yaitu", teks("u4", 150, 156, "300 x 198 = 59.400", 14, W.merah)),
      sorotkan("Jadi", "u4"),
    ),
    k(
      "Nomor 5: apa kelebihan piktogram? Data menjadi lebih menarik, mudah dibaca sekilas, dan banyaknya terlihat dari jumlah gambar. Alasan lain boleh, asal masuk akal.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nomor 5: kelebihan piktogram", 12, W.ungu)),
      tambah("menarik,", kartu("v1", 40, 44, 220, 34, W.hijauMuda, ["lebih menarik"], 10)),
      tambah("sekilas,", kartu("v2", 40, 88, 220, 34, W.muda, ["mudah dibaca sekilas"], 10)),
      tambah("jumlah", kartu("v3", 40, 132, 220, 34, W.krem, ["banyaknya terlihat dari jumlah gambar"], 8.6)),
    ),
    k(
      "Jadi piktogram adalah penyajian data dengan menggunakan gambar atau simbol, dan setiap gambar atau simbol mewakili suatu nilai tertentu.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Piktogram", 14, W.ungu)),
      tambah("penyajian", kartu("df", 24, 46, 252, 76, W.krem, ["penyajian data dengan", "gambar atau simbol"], 11)),
      tambah("setiap", kartu("df2", 24, 134, 252, 44, W.hijauMuda, ["setiap gambar mewakili", "suatu nilai tertentu"], 9.6)),
    ),
  ],
};
