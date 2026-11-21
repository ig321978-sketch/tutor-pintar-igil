import type { AdeganStory } from "./logika-story";
import { E, W, Y, angkaDi, digitBaris, emo, fmt, garisHitung, judul, kartu, kotak, labelBaris, lajurKolom, lantai, panah, papanHitung, rumus, sorotKolom, teks, tokoh } from "./k5b1d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b1d-bantu";

/*
 * Cerita orisinal IGIL "Hitungan Penonton Pak Darmo" (Kelas 5 Bab 1 Sub-Bab D), akhir cerita Hari Pertandingan di Stadion Kota.
 * Video kedua: tiga metode global (Stack and Trade, Split and Multiply, Share and Check), terpisah dari video materi.
 * Naskah suara dari naskah/story-naskah-k5b1d.md. Bagian ini: pembuka di ruang panitia dan Stack and Trade (konsep dan terapan Citra).
 */

/** Nama tiga metode global (Inggris) dan nama Indonesianya; dipakai juga oleh uji Story. */
export const NAMA_METODE = ["Stack and Trade", "Split and Multiply", "Share and Check"];
export const NAMA_METODE_ID = ["Susun dan Tukar", "Pisah dan Kali", "Bagi dan Cek"];
const X_KARTU = [8, 107, 206];
const Y_HASIL = 91;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_PEMBUKA1 = "Sore itu, di ruang panitia, Pak Darmo menumpuk catatan penonton, uang kas, dan kotak minuman yang harus dihitung.";
const SUARA_PEMBUKA2 = "Ada tiga cara menghitung bilangan besar supaya tidak meleset.";
const SUARA_PEMBUKA3 = "Tiga cara itu: Stack and Trade, Split and Multiply, dan Share and Check.";
const SUARA_PEMBUKA4 = "Nama dalam bahasa Indonesia: Susun dan Tukar, Pisah dan Kali, dan Bagi dan Cek.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Sore di ruang panitia",
  sumber: "Metode global: pembuka di ruang panitia",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_PEMBUKA1,
      tambah(0, judul("Sore di Ruang Panitia"), ...lantai("lt", 150)),
      tambah("ruang", kotak("ms", 14, 112, 200, 8, W.kayu, W.kayuTua, { rx: 2, tebal: 1.6, z: 1 }), kotak("m1", 22, 120, 3, 30, W.kayuTua, W.kayuTua, { rx: 0, z: 0 }), kotak("m2", 203, 120, 3, 30, W.kayuTua, W.kayuTua, { rx: 0, z: 0 })),
      tambah("Darmo", ...tokoh("pd", 256, 184, "Pak Darmo")),
      tambah("catatan", emo("n1", 50, 108, E.papanJepit, 24)),
      tambah("uang", emo("n2", 112, 108, "\u{1F4B0}", 24)),
      tambah("kotak", emo("n3", 174, 108, "\u{1F4E6}", 24)),
    ),
    k(
      SUARA_PEMBUKA2,
      bersih(0),
      tambah(0, judul("Tiga Cara Menghitung"), ...lantai("lt", 150), ...tokoh("pd", 150, 184, "Pak Darmo")),
      tambah("tiga", ...X_KARTU.flatMap((x, i) => kartu(`c${i + 1}`, x, 40, 86, 64, "#E5E7EB", ["?"], 20))),
      tambah("tidak", teks("tc", 150, 124, "3 cara", 13, W.ungu), emo("ms", 150, 140, E.kilat, 14)),
    ),
    k(
      SUARA_PEMBUKA3,
      ubah("Stack", { id: "c1-t0", isi: NAMA_METODE[0], u: 9 }, { id: "c1-k", warna: "#DCFCE7" }),
      ubah("Split", { id: "c2-t0", isi: NAMA_METODE[1], u: 9 }, { id: "c2-k", warna: "#DBEAFE" }),
      ubah("Share", { id: "c3-t0", isi: NAMA_METODE[2], u: 9 }, { id: "c3-k", warna: "#FEF9C3" }),
    ),
    k(
      SUARA_PEMBUKA4,
      hapus("Nama", "tc", "ms"),
      tambah("Susun", teks("c1-i", 51, 90, NAMA_METODE_ID[0], 8, W.coklat)),
      tambah("Pisah", teks("c2-i", 150, 90, NAMA_METODE_ID[1], 8, W.coklat)),
      tambah("Bagi", teks("c3-i", 249, 90, NAMA_METODE_ID[2], 8, W.coklat)),
    ),
  ],
};

/* ------------------------------ Stack and Trade: konsep ------------------------------ */
const SUARA_SUSUN1 = "Cara pertama, Stack and Trade, atau Susun dan Tukar.";
const SUARA_SUSUN2 = "Kita menyusun bilangan ke bawah dengan kolom lurus, lalu menghitung dari satuan ke kiri.";
const SUARA_SUSUN3 = "Kalau satu kolom berjumlah sepuluh atau lebih, sepuluhnya kita simpan ke kolom sebelah kiri.";
const SUARA_SUSUN4 = "Kalau angka atas terlalu kecil, kita meminjam satu dari kolom kiri dan menukarnya menjadi sepuluh.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Cara kedua: susun dan tukar",
  sumber: "Metode global: Stack and Trade, konsep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_SUSUN1,
      tambah(0, judul("Stack and Trade"), ...lantai("lt", 150), ...tokoh("pd", 262, 184, "Pak Darmo")),
      tambah("pertama", emo("tg", 40, 74, "\u{2795}", 26), teks("n1", 40, 96, "cara 1", 9, W.coklat)),
      tambah("Stack", ...kartu("m", 70, 44, 190, 64, "#DCFCE7", [NAMA_METODE[0], NAMA_METODE_ID[0]], 12)),
      tambah("Susun", emo("sa", 150, 130, E.kilat, 16)),
    ),
    k(
      SUARA_SUSUN2,
      bersih(0),
      tambah(0, judul("Susun Lurus ke Bawah"), ...lantai("lt", 150), ...tokoh("pd", 262, 184, "Pak Darmo"), papanHitung()),
      tambah("menyusun", ...lajurKolom()),
      tambah("bawah", labelBaris("s0-l", Y.r[0] + 3, "24.350"), ...digitBaris("s0", Y.r[0], 24350), labelBaris("s1-l", Y.r[1] + 3, "+ 18.705"), ...digitBaris("s1", Y.r[1], 18705), garisHitung("gh", 77)),
      tambah("satuan", sorotKolom("sk", 0), teks("sl", 214, 141, "satuan", 8, W.emas, { z: 3 })),
      tambah("kiri", panah("pk", 232, 100, -130, 0, W.emas, 1.8, { z: 3 })),
    ),
    k(
      SUARA_SUSUN3,
      hapus("Kalau", "sk", "sl", "pk"),
      tambah("kolom", sorotKolom("sk3", 3), rumus("rm", "4 + 8 = 12", Y.rumus, 124, 10, W.krem)),
      tambah("sepuluh", teks("tk", 268, 70, "10 atau lebih", 8, W.merah)),
      tambah("simpan", angkaDi("cr4", 4, Y.atas, 1, 9, W.oranye), angkaDi("hb3", 3, Y_HASIL, 2, 11, W.emas), panah("pc", 124, 38, -16, 0, W.oranye, 1.6, { z: 3 })),
    ),
    k(
      SUARA_SUSUN4,
      bersih(0),
      tambah(0, judul("Meminjam dan Menukar"), ...lantai("lt", 150), ...tokoh("pd", 262, 184, "Pak Darmo"), papanHitung(), ...lajurKolom()),
      tambah("atas", angkaDi("u2", 2, Y.r[0], 3, 12, W.kapur), angkaDi("u1", 1, Y.r[0], 2, 12, W.kapur), angkaDi("v2", 2, Y.r[1], 1, 12, W.kapur), angkaDi("v1", 1, Y.r[1], 5, 12, W.kapur), garisHitung("gh", 77)),
      tambah("kecil", sorotKolom("sk1", 1)),
      tambah("meminjam", panah("pj", 158, 44, 22, 0, W.oranye, 1.8, { z: 3 })),
      ubah("meminjam", { id: "u2", isi: "2", warna: W.oranye }),
      ubah("menukarnya", { id: "u1", isi: "12", warna: W.oranye }),
      tambah("sepuluh", rumus("rm", "1 ratusan = 10 puluhan", Y.rumus, 124, 9, W.krem)),
    ),
  ],
};

/* ------------------------------ Stack and Trade: terapan Citra ------------------------------ */
const SUARA_SUSUNT1 = "Citra mengurangkan dua puluh ribu tiga ratus dari empat puluh ribu, dan ia meminjam dari puluh ribuan.";
const SUARA_SUSUNT2 = "Pinjaman itu bergulir ke kanan sampai ratusan bisa dikurangi tiga, dan hasilnya sembilan belas ribu tujuh ratus.";
const SUARA_SUSUNT3 = "Cocok untuk bilangan besar dengan banyak kolom, karena tiap kolom dihitung satu per satu.";
const SUARA_SUSUNT4 = "Kurang cocok untuk hitungan mudah seperti sepuluh ribu dikurangi lima ribu, karena terlalu panjang.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Citra mengurangkan bersusun",
  sumber: "Metode global: Stack and Trade, terapan Citra",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_SUSUNT1,
      tambah(0, judul("Citra Mengurangkan"), ...lantai("lt", 150), ...tokoh("ci", 262, 184, "Citra")),
      tambah("mengurangkan", papanHitung(), ...lajurKolom()),
      tambah("dua", labelBaris("a1-l", Y.r[1] + 3, "− 20.300"), ...digitBaris("a1", Y.r[1], 20300), garisHitung("gh", 77)),
      tambah("empat", labelBaris("a0-l", Y.r[0] + 3, "40.000"), ...digitBaris("a0", Y.r[0], 40000)),
      tambah("puluh@3", sorotKolom("sk", 4), panah("pj", 102, 38, 0, 12, W.oranye, 1.8, { z: 3 })),
    ),
    k(
      SUARA_SUSUNT2,
      tambah("bergulir", angkaDi("p4", 4, Y.atas, 3, 9, W.oranye), angkaDi("p3", 3, Y.atas, 9, 9, W.oranye)),
      tambah("ratusan", angkaDi("p2", 2, Y.atas, 10, 9, W.oranye)),
      tambah("hasilnya", ...[1, 9, 7, 0, 0].map((d, i) => angkaDi(`h${4 - i}`, 4 - i, Y_HASIL, d, 11, W.emas))),
      tambah("sembilan", teks("jm", 268, Y_HASIL, fmt(19700), 12, W.merah)),
    ),
    k(
      SUARA_SUSUNT3,
      tambah("Cocok", teks("lb", 268, 66, "cocok", 12, W.hijauTua), emo("ok", 268, 130, E.benar, 20)),
      tambah("bilangan", sorotKolom("z4", 4)),
      tambah("banyak", sorotKolom("z3", 3), sorotKolom("z2", 2)),
      tambah("tiap", sorotKolom("z1", 1)),
      tambah("satu", sorotKolom("z0", 0)),
    ),
    k(
      SUARA_SUSUNT4,
      bersih(0),
      tambah(0, judul("Citra Mengurangkan"), ...lantai("lt", 150), ...tokoh("ci", 262, 184, "Citra")),
      tambah("Kurang", teks("lb", 150, 46, "kurang cocok", 15, W.merah)),
      tambah("sepuluh", teks("m1", 96, 82, "10.000", 14, W.biru)),
      tambah("lima", teks("m2", 196, 82, "− 5.000", 14, W.biru)),
      tambah("karena", emo("x1", 150, 112, E.salah, 20)),
      tambah("terlalu", teks("pn", 150, 132, "terlalu panjang", 11, W.merah)),
    ),
  ],
};

