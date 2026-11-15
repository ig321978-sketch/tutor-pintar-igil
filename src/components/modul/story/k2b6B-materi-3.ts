import type { AdeganStory } from "./logika-story";
import { JAM_KANAN, JAM_KIRI, W, barisKegiatan, barisLama, geserBaris, jam, judul, teks } from "./k2b6B-gambar";
import { idx, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/* ------------------------------ 10. Hari Kira dari pagi sampai malam ------------------------------ */
const SUARA_I1 = "Mari kita susun hari Kira dari pagi sampai malam.";
const SUARA_I2 = "Pertama, Kira sarapan pukul enam pagi. Lalu Kira belajar pukul tujuh pagi.";
const SUARA_I3 = "Kira makan siang pukul dua belas siang.";
const SUARA_I4 = "Kira bermain pukul empat sore. Kira tidur pukul sembilan malam.";
const SUARA_I5 = "Lihat, kegiatan Kira berurutan menurut waktunya, dari pagi sampai malam.";

export const ADEGAN_JADWAL: AdeganStory = {
  id: "jadwal",
  judul: "Kegiatan Kira sepanjang hari",
  sumber: "Materi: kegiatan Kira sehari",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Hari Kira"))),
    k(SUARA_I2, tambah(idx(SUARA_I2, "sarapan"), barisKegiatan(0, 0)), tambah(idx(SUARA_I2, "belajar"), barisKegiatan(1, 1))),
    k(SUARA_I3, tambah(idx(SUARA_I3, "makan"), barisKegiatan(2, 2))),
    k(SUARA_I4, tambah(idx(SUARA_I4, "bermain"), barisKegiatan(3, 3)), tambah(idx(SUARA_I4, "tidur"), barisKegiatan(4, 4))),
    k(SUARA_I5, sorotkan(idx(SUARA_I5, "pagi"), "kg0-k", "kg1-k"), sorotkan(idx(SUARA_I5, "malam"), "kg4-k")),
  ],
};

/* ------------------------------ 11. Mengurutkan kegiatan menurut waktu ------------------------------ */
const SUARA_J1 = "Kira punya empat kegiatan, tetapi urutannya acak. Kita susun menurut waktunya.";
const SUARA_J2 = "Mana yang paling awal? Sarapan pukul enam pagi, jadi sarapan paling awal.";
const SUARA_J3 = "Lalu makan siang pukul dua belas siang. Setelah itu bermain pukul empat sore.";
const SUARA_J4 = "Paling akhir tidur pukul sembilan malam. Sekarang urutannya sudah benar.";
const SUARA_J5 = "Jadi kegiatan yang waktunya lebih awal dikerjakan lebih dulu.";
const ACAK = [3, 0, 4, 2];

export const ADEGAN_URUT_KEGIATAN: AdeganStory = {
  id: "urut-kegiatan",
  judul: "Mengurutkan kegiatan menurut waktu",
  sumber: "Materi: urutan kegiatan sehari",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Urutkan kegiatan")), tambah(idx(SUARA_J1, "empat"), ACAK.flatMap((j, slot) => barisKegiatan(j, slot, 32, 38)))),
    k(
      SUARA_J2,
      sorotkan(idx(SUARA_J2, "Sarapan"), "kg0-k"),
      ubah(idx(SUARA_J2, "paling", 2), ...geserBaris(0, 0, 32, 38), ...geserBaris(3, 1, 32, 38), { id: "kg0-k", sorot: false }),
    ),
    k(
      SUARA_J3,
      sorotkan(idx(SUARA_J3, "makan"), "kg2-k"),
      ubah(idx(SUARA_J3, "Lalu"), ...geserBaris(2, 1, 32, 38), ...geserBaris(3, 2, 32, 38), ...geserBaris(4, 3, 32, 38), { id: "kg2-k", sorot: false }),
      sorotkan(idx(SUARA_J3, "bermain"), "kg3-k"),
    ),
    k(SUARA_J4, ubah(0, { id: "kg3-k", sorot: false }), sorotkan(idx(SUARA_J4, "tidur"), "kg4-k"), ubah(idx(SUARA_J4, "Sekarang"), { id: "kg4-k", sorot: false })),
    k(SUARA_J5, sorotkan(idx(SUARA_J5, "awal"), "kg0-k"), sorotkan(idx(SUARA_J5, "lebih", 2), "kg2-k", "kg3-k", "kg4-k")),
  ],
};

/* ------------------------------ 12. Lama kegiatan: satu jam ------------------------------ */
const SUARA_K1 = "Kira berolahraga di taman. Ia mulai pukul enam pagi.";
const SUARA_K2 = "Kira selesai berolahraga pukul tujuh pagi.";
const SUARA_K3 = "Dari pukul enam sampai pukul tujuh, jarum pendek bergerak satu jam.";
const SUARA_K4 = "Jadi Kira berolahraga selama satu jam.";
const SUARA_K5 = "Panjang batang ini menunjukkan lamanya olahraga Kira.";

export const ADEGAN_LAMA_JAM: AdeganStory = {
  id: "lama-jam",
  judul: "Berapa lama olahraga Kira",
  sumber: "Materi: lamanya satu kegiatan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Lama olahraga Kira")), tambah(idx(SUARA_K1, "mulai"), jam("j1", JAM_KIRI, 6, 0), teks("mu", 78, 60, "Mulai", 10, W.hijau))),
    k(SUARA_K2, tambah(idx(SUARA_K2, "selesai"), jam("j2", JAM_KANAN, 7, 0), teks("se", 222, 60, "Selesai", 10, W.merah))),
    k(SUARA_K3, tambah(idx(SUARA_K3, "jarum"), { id: "pn", t: "panah", x: 126, y: 108, x2: 48, y2: 0, garis: W.ungu, tebal: 2.4, z: 3 })),
    k(SUARA_K4, tambah(idx(SUARA_K4, "selama"), barisLama(1, 168, "Olahraga", 60))),
    k(SUARA_K5, sorotkan(idx(SUARA_K5, "batang"), "lm1-b")),
  ],
};

/* ------------------------------ 12b. Lama kegiatan: dua jam ------------------------------ */
const SUARA_V1 = "Halim berlari di taman. Ia mulai pukul tiga sore.";
const SUARA_V2 = "Halim selesai berlari pukul lima sore.";
const SUARA_V3 = "Dari pukul tiga sampai pukul lima, jarum pendek bergerak dua jam.";
const SUARA_V4 = "Jadi Halim berlari selama dua jam.";
const SUARA_V5 = "Makin jauh jarum pendek berpindah, makin lama pula Halim berlari.";

export const ADEGAN_LAMA_DUA_JAM: AdeganStory = {
  id: "lama-dua-jam",
  judul: "Berapa lama Halim berlari",
  sumber: "Materi: lama dua jam",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_V1, tambah(0, judul("Lama Halim berlari")), tambah(idx(SUARA_V1, "mulai"), jam("j1", JAM_KIRI, 3, 0), teks("mu", 78, 60, "Mulai", 10, W.hijau))),
    k(SUARA_V2, tambah(idx(SUARA_V2, "selesai"), jam("j2", JAM_KANAN, 5, 0), teks("se", 222, 60, "Selesai", 10, W.merah))),
    k(SUARA_V3, tambah(idx(SUARA_V3, "jarum"), { id: "pn", t: "panah", x: 126, y: 108, x2: 48, y2: 0, garis: W.ungu, tebal: 2.4, z: 3 })),
    k(SUARA_V4, tambah(idx(SUARA_V4, "selama"), barisLama(1, 168, "Berlari", 120))),
    k(SUARA_V5, sorotkan(idx(SUARA_V5, "lama"), "lm1-b"), sorotkan(idx(SUARA_V5, "berpindah,"), "pn")),
  ],
};
