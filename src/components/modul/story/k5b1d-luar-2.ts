import type { AdeganStory } from "./logika-story";
import { E, W, Y, bulat, emo, judul, kartu, labelBaris, lajurKolom, lantai, panah, papanHitung, digitBaris, sorotKolom, teks, tokoh } from "./k5b1d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b1d-bantu";
import { NAMA_METODE, NAMA_METODE_ID } from "./k5b1d-luar-1";

/*
 * Cerita orisinal IGIL "Hitungan Penonton Pak Darmo" (Kelas 5 Bab 1 Sub-Bab D), akhir cerita Hari Pertandingan di Stadion Kota.
 * Video kedua: tiga metode global. Naskah suara dari naskah/story-naskah-k5b1d.md.
 * Bagian ini: Split and Multiply (konsep dan terapan Fajar), Share and Check (konsep dan terapan Bima), dan ringkasan bersama Pak Darmo.
 */
const X_KARTU = [8, 107, 206];

/* ------------------------------ Split and Multiply: konsep ------------------------------ */
const SUARA_PISAH1 = "Cara kedua, Split and Multiply, atau Pisah dan Kali.";
const SUARA_PISAH2 = "Pengali dipisah menurut kolomnya, misalnya dua belas menjadi sepuluh dan dua.";
const SUARA_PISAH3 = "Tiap bagian dikalikan dengan bilangan besarnya, lalu hasilnya dijumlahkan.";
const SUARA_PISAH4 = "Cara ini mengubah perkalian besar menjadi dua perkalian yang mudah.";

export const ADEGAN_LUAR_PISAH: AdeganStory = {
  id: "luar-pisah",
  judul: "Cara kedua: pisah dan kali",
  sumber: "Metode global: Split and Multiply, konsep",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_PISAH1,
      tambah(0, judul("Split and Multiply"), ...lantai("lt", 150), ...tokoh("pd", 262, 184, "Pak Darmo")),
      tambah("kedua", emo("tg", 40, 74, "\u{2716}", 26), teks("n1", 40, 96, "cara 2", 9, W.coklat)),
      tambah("Split", ...kartu("m", 70, 44, 190, 64, "#DBEAFE", [NAMA_METODE[1], NAMA_METODE_ID[1]], 12)),
      tambah("Pisah", emo("sa", 150, 130, E.kilat, 16)),
    ),
    k(
      SUARA_PISAH2,
      hapus("Pengali", "tg", "n1", "m-k", "m-t0", "m-t1", "sa"),
      tambah("Pengali", teks("pg", 150, 44, "pengali", 9, W.ungu)),
      tambah("dua", teks("p12", 150, 68, "12", 22, W.biru)),
      tambah("misalnya", panah("a1", 140, 74, -42, 14, W.oranye, 1.8, { z: 3 }), panah("a2", 160, 74, 42, 14, W.oranye, 1.8, { z: 3 })),
      tambah("sepuluh", ...kartu("pa", 62, 90, 56, 34, "#DBEAFE", ["10"], 16)),
      tambah("dua@2", ...kartu("pb", 182, 90, 56, 34, "#DCFCE7", ["2"], 16)),
    ),
    k(
      SUARA_PISAH3,
      tambah("Tiap", teks("t1", 90, 144, "10 × B", 10, W.biru), teks("t2", 210, 144, "2 × B", 10, W.biru)),
      tambah("besarnya", teks("tb", 150, 106, "B = bilangan besar", 8, W.coklat)),
      tambah("dijumlahkan", teks("pl", 150, 144, "+", 16, W.merah)),
    ),
    k(
      SUARA_PISAH4,
      tambah("mengubah", teks("md", 150, 126, "mudah!", 13, W.hijauTua)),
      tambah("dua", emo("ok", 262, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Split and Multiply: terapan Fajar ------------------------------ */
const SUARA_PISAHT1 = "Fajar menghitung empat belas kali tiga ribu dengan memisah empat belas menjadi sepuluh dan empat.";
const SUARA_PISAHT2 = "Sepuluh kali tiga ribu sama dengan tiga puluh ribu, empat kali tiga ribu sama dengan dua belas ribu, jumlahnya empat puluh dua ribu.";
const SUARA_PISAHT3 = "Cocok untuk pengali dua angka, karena tiap bagian mudah dikalikan.";
const SUARA_PISAHT4 = "Kurang cocok untuk pengali satu angka, karena tidak perlu dipisah.";

export const ADEGAN_LUAR_PISAH_TERAPAN: AdeganStory = {
  id: "luar-pisah-terapan",
  judul: "Fajar memisah pengali",
  sumber: "Metode global: Split and Multiply, terapan Fajar",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_PISAHT1,
      tambah(0, judul("Fajar Memisah Pengali"), ...lantai("lt", 150), ...tokoh("fa", 40, 184, "Fajar")),
      tambah("empat", teks("e1", 150, 56, "14 × 3.000", 16, W.biru)),
      tambah("memisah", teks("e2", 150, 84, "14 = 10 + 4", 14, W.oranye)),
    ),
    k(
      SUARA_PISAHT2,
      tambah("Sepuluh", teks("e3", 150, 108, "10 × 3.000 = 30.000", 12, W.biru)),
      tambah("empat", teks("e4", 150, 124, "4 × 3.000 = 12.000", 12, W.biru)),
      tambah("jumlahnya", teks("e5", 150, 142, "= 42.000", 13, W.merah)),
    ),
    k(
      SUARA_PISAHT3,
      tambah("Cocok", teks("lb", 262, 60, "cocok", 14, W.hijauTua)),
      tambah("tiap", emo("ok", 262, 96, E.benar, 22)),
    ),
    k(
      SUARA_PISAHT4,
      hapus("Kurang", "ok"),
      ubah("Kurang", { id: "lb", isi: "kurang cocok", warna: W.merah, u: 9 }),
      tambah("satu", teks("st", 262, 80, "7 × 3.000", 10, W.biru)),
      tambah("tidak", emo("x1", 262, 104, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Share and Check: konsep ------------------------------ */
const SUARA_BAGI1 = "Cara ketiga, Share and Check, atau Bagi dan Cek.";
const SUARA_BAGI2 = "Kita membagi bilangan besar kolom demi kolom, mulai dari kolom paling kiri.";
const SUARA_BAGI3 = "Sisa di satu kolom ditukar menjadi sepuluh di kolom sebelah kanannya.";
const SUARA_BAGI4 = "Setelah itu hasilnya dicek dengan mengalikannya kembali dengan pembagi.";

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Cara ketiga: bagi dan cek",
  sumber: "Metode global: Share and Check, konsep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_BAGI1,
      tambah(0, judul("Share and Check"), ...lantai("lt", 150), ...tokoh("pd", 262, 184, "Pak Darmo")),
      tambah("ketiga", emo("tg", 40, 74, "\u{2797}", 26), teks("n1", 40, 96, "cara 3", 9, W.coklat)),
      tambah("Share", ...kartu("m", 70, 44, 190, 64, "#DCFCE7", [NAMA_METODE[2], NAMA_METODE_ID[2]], 12)),
      tambah("Bagi", emo("sa", 150, 130, E.kilat, 16)),
    ),
    k(
      SUARA_BAGI2,
      bersih(0),
      tambah(0, judul("Bagi Mulai dari Kiri"), ...lantai("lt", 150), ...tokoh("pd", 262, 184, "Pak Darmo"), papanHitung()),
      tambah("membagi", ...lajurKolom(), labelBaris("bk-l", Y.r[0] + 3, "64.000"), ...digitBaris("bk", Y.r[0], 64000)),
      tambah("mulai", panah("pk", 102, 66, 100, 0, W.emas, 1.8, { z: 3 })),
      tambah("kiri", sorotKolom("sk", 4), teks("sl", 102, 141, "mulai di sini", 8, W.emas, { z: 3 })),
    ),
    k(
      SUARA_BAGI3,
      tambah("Sisa", teks("bs", 124, 92, "6 : 4 = 1 sisa 2", 11, W.krem)),
      tambah("ditukar", panah("pt", 130, 100, 36, 10, W.oranye, 1.8, { z: 3 })),
      tambah("sepuluh", teks("b10", 124, 124, "1 kolom kiri = 10 di kanan", 8, W.krem)),
    ),
    k(
      SUARA_BAGI4,
      hapus("dicek", "sl"),
      tambah("dicek", teks("bc", 124, 138, "16.000 × 4 = 64.000", 11, W.emas)),
      tambah("kembali", emo("ok", 268, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Share and Check: terapan Bima ------------------------------ */
const SUARA_BAGIT1 = "Bima membagi delapan puluh empat ribu rupiah rata kepada enam orang.";
const SUARA_BAGIT2 = "Delapan puluh empat ribu dibagi enam sama dengan empat belas ribu; dicek, empat belas ribu dikali enam kembali ke delapan puluh empat ribu.";
const SUARA_BAGIT3 = "Cocok untuk membagi rata, karena hasilnya langsung bisa dicek.";
const SUARA_BAGIT4 = "Kurang cocok kalau ada sisa, karena sisanya harus ditulis terpisah.";

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Bima membagi rata",
  sumber: "Metode global: Share and Check, terapan Bima",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_BAGIT1,
      tambah(0, judul("Bima Membagi Rata"), ...lantai("lt", 150), ...tokoh("bi", 262, 184, "Bima")),
      tambah("delapan", teks("d1", 100, 70, "84.000", 18, W.biru)),
      tambah("kepada", teks("d0", 150, 70, ":", 18, W.coklat), teks("d2", 200, 70, "6 orang", 14, W.biru)),
    ),
    k(
      SUARA_BAGIT2,
      tambah("Delapan", teks("d3", 70, 104, "84.000 : 6", 14, W.biru)),
      tambah("sama", teks("d4", 200, 104, "= 14.000", 14, W.hijauTua)),
      tambah("dicek,", teks("d5", 150, 130, "14.000 × 6 = 84.000", 14, W.oranye)),
      tambah("kembali", emo("ok", 262, 126, E.benar, 20)),
    ),
    k(
      SUARA_BAGIT3,
      tambah("Cocok", teks("lb", 262, 60, "cocok", 14, W.hijauTua)),
      tambah("membagi", emo("ok2", 262, 90, E.benar, 20)),
    ),
    k(
      SUARA_BAGIT4,
      hapus("Kurang", "ok", "ok2"),
      ubah("Kurang", { id: "lb", isi: "kurang cocok", warna: W.merah, u: 9 }),
      tambah("sisa", teks("sk", 262, 80, "17 : 5", 10, W.biru), teks("sk2", 262, 94, "= 3 sisa 2", 9, W.merah)),
      tambah("terpisah", emo("x1", 262, 114, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Ringkasan bersama Pak Darmo ------------------------------ */
const SUARA_RINGKAS1 = "Tiga cara sudah kita pelajari bersama Pak Darmo, dan masing-masing punya saat yang tepat.";
const SUARA_RINGKAS2 = "Menjumlah dan mengurang, pakai Susun dan Tukar. Mengalikan, pakai Pisah dan Kali. Membagi, pakai Bagi dan Cek.";
const SUARA_RINGKAS3 = "Ketiganya saling menjaga: kali dicek dengan bagi, dan tambah dicek dengan kurang.";
const SUARA_RINGKAS4 = "Menurutmu, kalau hasil kali dan hasil bagi tidak saling kembali, apa yang harus kita lakukan?";

const WARNA_KARTU = ["#DCFCE7", "#DBEAFE", "#FEF9C3"];
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga cara dan saat yang tepat",
  sumber: "Ringkasan metode global bersama Pak Darmo",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_RINGKAS1,
      tambah(0, judul("Tiga Cara, Tiga Saat"), ...lantai("lt", 150)),
      tambah("Pak", ...tokoh("pd", 150, 184, "Pak Darmo")),
      tambah("cara", ...X_KARTU.flatMap((x, i) => kartu(`c${i + 1}`, x, 36, 86, 56, WARNA_KARTU[i], [NAMA_METODE[i], NAMA_METODE_ID[i]], 8))),
    ),
    k(
      SUARA_RINGKAS2,
      tambah("Menjumlah", teks("g1", 51, 112, "jumlah, kurang", 8.5, W.coklat), panah("q1", 51, 105, 0, -10, W.coklat, 1.6, { z: 3 })),
      tambah("Mengalikan", teks("g2", 150, 112, "kali", 8.5, W.coklat), panah("q2", 150, 105, 0, -10, W.coklat, 1.6, { z: 3 })),
      tambah("Membagi", teks("g3", 249, 112, "bagi", 8.5, W.coklat), panah("q3", 249, 105, 0, -10, W.coklat, 1.6, { z: 3 })),
    ),
    k(
      SUARA_RINGKAS3,
      tambah("kali", bulat("b1", 51, 30, 7, W.emas, W.biru), teks("n1", 51, 33, "1", 9, W.biru), panah("w1", 96, 64, 9, 0, W.biru, 1.8, { z: 3 })),
      tambah("bagi,", bulat("b2", 150, 30, 7, W.emas, W.biru), teks("n2", 150, 33, "2", 9, W.biru), panah("w2", 195, 64, 9, 0, W.biru, 1.8, { z: 3 })),
      tambah("tambah", bulat("b3", 249, 30, 7, W.emas, W.biru), teks("n3", 249, 33, "3", 9, W.biru), teks("sj", 150, 132, "tambah ⇄ kurang, kali ⇄ bagi", 9, W.hijauTua)),
    ),
    k(
      SUARA_RINGKAS4,
      hapus("Menurutmu", "g1", "g2", "g3", "q1", "q2", "q3", "sj"),
      tambah("kali", teks("pk", 70, 112, "hasil kali", 9, W.hijauTua)),
      tambah("tidak", teks("ht", 230, 112, "hasil bagi", 9, W.merah), teks("ne", 150, 116, "≠", 20, W.merah)),
      tambah("apa", emo("qq", 150, 144, "\u{2753}", 18)),
      tambah("lakukan", emo("pi", 200, 168, E.pikir, 20)),
    ),
  ],
};
