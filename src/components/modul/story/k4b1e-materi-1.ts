import type { AdeganStory } from "./logika-story";
import { E, W, XK, Y, angka, bulat, dua, emo, garis, garisTambah, judul, kertas, kotak, koper, lantai, lonceng, meja, panah, pusatKolom, sorotKolom, teks, tokoh, tumpukKoper } from "./k4b1e-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b1e-bantu";

/*
 * Cerita orisinal IGIL "Meja Resepsi Bu Rina" (Kelas 4 Bab 1 Sub-Bab E, penjumlahan bilangan sampai seribu), lanjutan cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1e.md. Bagian ini: meja resepsi, daftar tamu, salah langkah Satria (tanpa menyimpan).
 */

/* ------------------------------ 1. Meja resepsi ------------------------------ */
const SUARA_R1 = "Di ruang depan penginapan, Bu Rina duduk di meja resepsi dengan daftar tamu yang panjang.";
const SUARA_R2 = "Ia harus melaporkan jumlah tamu hari ini kepada Bu Maya.";
const SUARA_R3 = "Satria, Laras, dan Genta menawarkan diri untuk menjumlahkannya.";

export const ADEGAN_RESEPSI: AdeganStory = {
  id: "resepsi",
  judul: "Meja resepsi Bu Rina",
  sumber: "Materi: meja resepsi",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ruang Depan Penginapan"), ...lantai("lt", 150)),
      tambah("Bu", ...tokoh("br", 178, 118, "Bu Rina")),
      tambah("meja", ...meja("mj", 118, 126, 120), lonceng("lc", 138, 124), koper("kp", 218, 124)),
      tambah("daftar", kotak("dl", 246, 56, 32, 70, W.putih, W.coklat, { rx: 3, tebal: 1.4, z: 2 }), ...[0, 1, 2, 3, 4, 5, 6].map((i) => garis(`dl-l${i}`, 251, 66 + i * 8, 22, 0, "#94A3B8", 1, { z: 3 }))),
      tambah("panjang", teks("pj", 262, 140, "panjang", 8, W.merah, { z: 4 })),
    ),
    k(
      SUARA_R2,
      tambah("jumlah", teks("jt", 80, 74, "jumlah tamu = ?", 10, W.merah)),
      tambah("kepada", panah("lp", 120, 108, -50, 0, W.biru, 2, { z: 3 })),
      tambah("Maya.", ...tokoh("by", 36, 112, "Bu Maya", 26)),
    ),
    k(
      SUARA_R3,
      tambah("Satria,", ...tokoh("sa", 24, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 60, 184, "Laras")),
      tambah("Genta", ...tokoh("gn", 96, 184, "Genta")),
      tambah("menawarkan", emo("tg", 60, 146, E.tangan, 16)),
      tambah("menjumlahkannya.", bulat("bb", 80, 96, 18, W.putih, W.biru, { z: 3 }), teks("ps", 80, 103, "+", 24, W.merah, { z: 4 }), ...tokoh("ph", 268, 184, "Pak Hendro")),
    ),
  ],
};

/* ------------------------------ 2. Daftar tamu ------------------------------ */
const SUARA_D1 = "Tamu pagi dua ratus empat puluh lima orang, dan tamu siang tiga ratus tujuh puluh delapan orang.";
const SUARA_D2 = "Laras menulis keduanya bersusun ke bawah, satuan di bawah satuan.";
const SUARA_D3 = "Mereka menjumlahkan dari kanan, mulai dari satuan, itulah cara susun pendek.";

export const ADEGAN_DAFTAR: AdeganStory = {
  id: "daftar",
  judul: "Daftar tamu pagi dan siang",
  sumber: "Materi: daftar tamu",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Daftar Tamu"), kertas(), ...tokoh("br", 36, 184, "Bu Rina")),
      tambah("pagi", teks("lp", 58, Y.a, "pagi", 10, W.biru, { z: 4 })),
      tambah("lima", angka("a1", XK, Y.a, 245)),
      tambah("siang", teks("ls", 58, Y.b, "siang", 10, W.biru, { z: 4 })),
      tambah("delapan", angka("a2", XK, Y.b, 378)),
    ),
    k(
      SUARA_D2,
      tambah("Laras", ...tokoh("lr", 76, 184, "Laras")),
      tambah("bersusun", teks("pl", XK - 66, Y.b, "+", 16, W.biru, { z: 4 })),
      tambah("bawah,", garisTambah("gt", XK - 64, XK + 4, Y.garis), teks("qq", XK, Y.h, "?", 22, W.merah, { anchor: "end", z: 4 })),
      tambah("satuan", sorotKolom("s0", XK, 0, 56, 100, W.satuan)),
    ),
    k(
      SUARA_D3,
      tambah("menjumlahkan", teks("hR", pusatKolom(XK, 2), 50, "R", 9, W.biru, { z: 4 }), teks("hP", pusatKolom(XK, 1), 50, "P", 9, W.biru, { z: 4 }), teks("hS", pusatKolom(XK, 0), 50, "S", 9, W.biru, { z: 4 })),
      tambah("kanan,", panah("pk", 200, 38, -62, 0, W.merah, 2, { z: 4 })),
      tambah("satuan", teks("lgR", 204, 74, "R ratusan", 8, W.biru, { anchor: "start", z: 4 }), teks("lgP", 204, 86, "P puluhan", 8, W.biru, { anchor: "start", z: 4 }), teks("lgS", 204, 98, "S satuan", 8, W.merah, { anchor: "start", z: 4 })),
      sorotkan("satuan", "s0"),
      tambah("pendek.", teks("sp", 232, 130, "susun pendek", 11, W.ungu, { z: 4 })),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah: tanpa menyimpan ------------------------------ */
const SUARA_S1 = "Satria menjumlahkan lima dan delapan, hasilnya tiga belas, lalu ia menulis tiga belas di bawah satuan.";
const SUARA_S2 = "Ia terus menjumlahkan tiap kolom tanpa menyimpan, dan hasilnya lima ratus tiga belas.";
const SUARA_S3 = "Kalau aku salah, aku yang membawa semua koper tamu, katanya.";

export const ADEGAN_SALAH_SIMPAN: AdeganStory = {
  id: "salah-simpan",
  judul: "Satria lupa menyimpan",
  sumber: "Materi: salah langkah",
  latar: "#FEE2E2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satria Menjumlahkan"), kertas(), ...dua(245, 378), ...tokoh("sa", 36, 184, "Satria")),
      tambah("lima", teks("eq", 250, Y.a, "5 + 8", 10, W.merah, { z: 4 }), sorotKolom("s0", XK, 0, 56, 100, W.satuan)),
      tambah("belas,", teks("eq2", 250, Y.a + 14, "= 13", 10, W.merah, { z: 4 })),
      tambah("menulis", angka("h13", XK, Y.h, 13, 22, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("kolom", sorotKolom("s1", XK, 1, 56, 100, W.puluhan), sorotKolom("s2", XK, 2, 56, 100, W.ratusan)),
      tambah("tanpa", teks("ts", 236, Y.b + 4, "tanpa menyimpan", 8, W.merah, { z: 4 })),
      tambah("ratus", angka("h513", XK, Y.h, 513, 22, W.merah, { z: 5 })),
      hapus("ratus", "h13"),
    ),
    k(
      SUARA_S3,
      tambah("salah,", teks("tr", 236, 42, "taruhan!", 11, W.merah, { z: 4 })),
      tambah("aku", emo("jm", 72, 150, E.jempol, 16)),
      tambah("koper", ...tumpukKoper("kt", 214, 176, 9)),
      tambah("katanya.", emo("kb", 250, 130, E.cemberut, 16)),
    ),
  ],
};
