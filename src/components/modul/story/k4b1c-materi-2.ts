import type { AdeganStory } from "./logika-story";
import { E, dayung, dermaga, emo, idTokoh, judul, judulTempat, laut, panah, papanDermaga, perahu, teks, tempatAngka, tokoh, W } from "./k4b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/*
 * Cerita orisinal IGIL "Papan Dermaga Kak Tiara" (K4 Bab 1 Sub-Bab C, membandingkan dan mengurutkan bilangan sampai sepuluh ribu), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1c.md. Bagian ini: membandingkan dari kiri (ribuan, ratusan, puluhan), tanda kurang dari, Satria kalah taruhan.
 */

const HIJAU_TEMPAT = "#86EFAC";

/* ------------------------------ 4. Dari kiri ------------------------------ */
const SUARA_K1 = "Genta mengajak membandingkan dari kiri, mulai dari ribuan.";
const SUARA_K2 = "Ribuan sama, empat dan empat, jadi lihat ratusan.";
const SUARA_K3 = "Ratusan juga sama, yaitu tiga dan tiga, jadi lanjut ke puluhan.";

export const ADEGAN_KIRI: AdeganStory = {
  id: "kiri",
  judul: "Membandingkan dari kiri",
  sumber: "Materi: banding dari kiri",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Membandingkan dari Kiri"), ...tokoh("gt", 40, 184, "Genta")),
      tambah("membandingkan", ...judulTempat("ht", 100, 38), ...tempatAngka("p1", 100, 44, 4358), ...tempatAngka("p2", 100, 92, 4385), teks("lb", 52, 66, "BARAT", 11, W.tinta), teks("lt", 52, 114, "TIMUR", 11, W.tinta)),
      tambah("kiri,", panah("ak", 100, 142, 34, 0, W.merah, 2.6)),
      sorotkan("ribuan.", "p1-k0", "p2-k0"),
    ),
    k(
      SUARA_K2,
      tambah("sama,", teks("e0", 115, 90, "=", 12, W.hijau)),
      ubah("empat@2", { id: "p1-k0", warna: HIJAU_TEMPAT }, { id: "p2-k0", warna: HIJAU_TEMPAT }),
      ubah("lihat", { id: "ak", x2: 68 }),
      sorotkan("ratusan.", "p1-k1", "p2-k1"),
    ),
    k(
      SUARA_K3,
      tambah("sama,", teks("e1", 149, 90, "=", 12, W.hijau)),
      ubah("tiga@2", { id: "p1-k1", warna: HIJAU_TEMPAT }, { id: "p2-k1", warna: HIJAU_TEMPAT }),
      ubah("lanjut", { id: "ak", x2: 102 }),
      sorotkan("puluhan.", "p1-k2", "p2-k2"),
    ),
  ],
};

/* ------------------------------ 5. Puluhan menentukan ------------------------------ */
const SUARA_P1 = "Di tempat puluhan, lima lebih kecil daripada delapan.";
const SUARA_P2 = "Jadi empat ribu tiga ratus lima puluh delapan lebih kecil daripada empat ribu tiga ratus delapan puluh lima.";
const SUARA_P3 = "Kita menulisnya dengan tanda lebih kecil, yaitu empat ribu tiga ratus lima puluh delapan kurang dari yang satunya.";

export const ADEGAN_PULUHAN: AdeganStory = {
  id: "puluhan",
  judul: "Puluhan menentukan",
  sumber: "Materi: tanda kurang dari",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tempat Puluhan"), ...judulTempat("ht", 100, 38), ...tempatAngka("p1", 100, 44, 4358), ...tempatAngka("p2", 100, 92, 4385), teks("lb", 52, 66, "BARAT", 11, W.tinta), teks("lt", 52, 114, "TIMUR", 11, W.tinta), teks("e0", 115, 90, "=", 12, W.hijau), teks("e1", 149, 90, "=", 12, W.hijau)),
      tambah("tempat", ...tokoh("gt", 40, 184, "Genta")),
      sorotkan("puluhan,", "p1-k2", "p2-k2"),
      tambah("kecil", teks("bd", 268, 94, "5 < 8", 12, W.merah)),
      ubah("delapan.", { id: "p2-k2", warna: "#FECACA" }),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Dua Bilangan"), ...papanDermaga("pd", 20, 40, 260, 110), teks("pB", 70, 70, "BARAT", 10, W.tinta), teks("pT", 230, 70, "TIMUR", 10, W.tinta)),
      tambah("delapan", teks("nb", 70, 102, "4.358", 22, W.biru)),
      tambah("kecil", teks("tg", 150, 106, "<", 30, W.merah)),
      tambah("delapan@2", teks("nt", 230, 102, "4.385", 22, W.biru)),
    ),
    k(
      SUARA_P3,
      tambah("tanda", teks("mk", 150, 142, "mulut tanda menghadap yang besar", 8, W.ungu)),
      tambah("kurang", teks("kd", 150, 126, "kurang dari", 10, W.hijau)),
      sorotkan("delapan", "nb"),
      tambah("satunya.", teks("ls", 70, 130, "lebih sedikit", 9, W.merah), teks("lb2", 230, 130, "lebih banyak", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Satria kalah taruhan ------------------------------ */
const SUARA_L1 = "Satria menepuk dahinya, jadi Pantai Timur yang lebih ramai.";
const SUARA_L2 = "Ia mengambil dayung dan berangkat sendirian sambil mengeluh.";
const SUARA_L3 = "Kak Tiara tertawa dan melambai dari dermaga.";

export const ADEGAN_KALAH: AdeganStory = {
  id: "kalah",
  judul: "Satria kalah taruhan",
  sumber: "Materi: taruhan Satria",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Satria Kalah Taruhan"), ...laut("lt", 100), ...dermaga("dk", 2, 152, 160)),
      tambah("Satria", ...tokoh("st", 100, 146, "Satria")),
      tambah("dahinya,", emo("dh", 100, 120, E.dahi, 18)),
      tambah("Pantai", ...tokoh("kt", 140, 146, "Kak Tiara")),
      tambah("Timur", ...papanDermaga("pd", 8, 82, 72, 48), teks("pt", 44, 104, "TIMUR", 11, W.tinta)),
      tambah("ramai.", teks("pb", 44, 120, "lebih banyak", 7, W.tinta)),
    ),
    k(
      SUARA_L2,
      tambah("dayung", dayung("dy", 112, 150)),
      hapus("berangkat", "dy", "dh", ...idTokoh("st", "Satria")),
      tambah("berangkat", ...perahu("pr", 226, 172, "#FCA5A5"), ...tokoh("sp", 226, 150, "Satria"), dayung("dy2", 246, 168)),
      tambah("mengeluh.", emo("cm", 252, 122, E.cemberut, 18)),
    ),
    k(
      SUARA_L3,
      tambah("tertawa", emo("sn", 140, 120, E.senyum, 18)),
      tambah("melambai", emo("lm", 168, 128, E.lambai, 18)),
      sorotkan("dermaga.", "pd-p"),
    ),
  ],
};

/* ------------------------------ 6b. Bilangan yang persis sama ------------------------------ */
const SUARA_M1 = "Kak Tiara membuka catatan minggu lalu, dan Pantai Timur juga empat ribu tiga ratus delapan puluh lima orang.";
const SUARA_M2 = "Ribuan, ratusan, puluhan, dan satuan semuanya sama, jadi tidak ada yang lebih besar.";
const SUARA_M3 = "Bilangan yang persis sama kita tulis dengan tanda sama dengan.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama",
  judul: "Dua bilangan yang persis sama",
  sumber: "Materi: tanda sama dengan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Sama Persis"), ...tokoh("kt", 40, 184, "Kak Tiara")),
      tambah("catatan", ...judulTempat("ht", 100, 38), ...tempatAngka("p1", 100, 44, 4385), teks("lb", 52, 66, "LALU", 11.5, W.tinta)),
      tambah("Timur", ...tempatAngka("p2", 100, 92, 4385), teks("lt", 52, 114, "INI", 11.5, W.tinta)),
      tambah("orang.", teks("bt", 268, 76, "4.385", 12, W.merah)),
    ),
    k(
      SUARA_M2,
      tambah(0, teks("e0", 115, 90, "=", 12, W.hijau)),
      ubah(0, { id: "p1-k0", warna: HIJAU_TEMPAT }, { id: "p2-k0", warna: HIJAU_TEMPAT }),
      tambah("ratusan,", teks("e1", 149, 90, "=", 12, W.hijau)),
      ubah("ratusan,", { id: "p1-k1", warna: HIJAU_TEMPAT }, { id: "p2-k1", warna: HIJAU_TEMPAT }),
      tambah("puluhan,", teks("e2", 183, 90, "=", 12, W.hijau)),
      ubah("puluhan,", { id: "p1-k2", warna: HIJAU_TEMPAT }, { id: "p2-k2", warna: HIJAU_TEMPAT }),
      tambah("satuan", teks("e3", 217, 90, "=", 12, W.hijau)),
      ubah("satuan", { id: "p1-k3", warna: HIJAU_TEMPAT }, { id: "p2-k3", warna: HIJAU_TEMPAT }),
      tambah("tidak", teks("tb", 190, 142, "tidak ada yang lebih besar", 11, W.merah)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Tanda Sama Dengan"), ...papanDermaga("pd", 20, 40, 260, 110), teks("pB", 70, 70, "LALU", 11.5, W.tinta), teks("pT", 230, 70, "INI", 11.5, W.tinta)),
      tambah("bilangan", teks("nb", 70, 102, "4.385", 22, W.biru)),
      tambah("persis", teks("nt", 230, 102, "4.385", 22, W.biru)),
      tambah("tanda", teks("tg", 150, 106, "=", 30, W.hijau)),
      tambah("sama@2", teks("kd", 150, 134, "sama dengan", 11.5, W.hijau)),
    ),
  ],
};
