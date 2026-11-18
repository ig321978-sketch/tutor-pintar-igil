import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, jalurJam, jam, judul, kartu, kotak, lapangan, langitLatar, panah, teks, tokoh } from "./k2b6B-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/*
 * Cerita orisinal IGIL "Jadwal Lomba Bu Ratna" (Kelas 2 Bab 6 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b6b.md. Bagian ini: pembuka (tiga kartu tua juru acara), Day Timeline (Garis Waktu Hari), dan terapannya.
 */

export const NAMA_METODE = ["Day Timeline", "Hour Track", "Duration Bars"] as const;
export const NAMA_METODE_ID = ["Garis Waktu Hari", "Jalur Jam", "Batang Lama Kegiatan"] as const;

const WARNA_H = [W.kuning, W.emas, W.oranye, W.lavender] as const;
const NAMA_H = ["pagi", "siang", "sore", "malam"] as const;
const EMO_H = ["\u{1F305}", "\u{1F31E}", "\u{1F307}", E.bulan] as const;

/** Garis waktu hari: empat ruas berwarna `${id}0`..`${id}3` (lebar 70) mulai x = 10 pada tinggi y. */
const ruasHari = (id: string, y: number): ReturnType<typeof kotak>[] => WARNA_H.map((w, j) => kotak(`${id}${j}`, 10 + j * 70, y, 70, 16, w, W.biru, { rx: 2, tebal: 1.6, z: 1 }));
/** Nama bagian hari di bawah garis waktu `${id}0`..`${id}3`. */
const namaHari = (id: string, y: number, j: number) => teks(`${id}${j}`, 45 + j * 70, y, NAMA_H[j], 9.5, W.biru, { z: 2 });

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di balik jam besar, Dika menemukan tiga kartu tua milik juru acara zaman dulu.";
const SUARA_O2 = "Bu Ratna tertawa. Itu cara juru acara mengatur acara supaya tidak ada lomba yang bertabrakan!";
const SUARA_O3 = "Tiga cara itu: Day Timeline, Hour Track, dan Duration Bars.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Garis Waktu Hari, Jalur Jam, dan Batang Lama Kegiatan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu tua juru acara",
  sumber: "Metode global: pembuka",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Kartu Tua Juru Acara"), langitLatar("lg", 150, "#E0F2FE"), ...lapangan("rm")),
      tambah("jam", ...jam("j", { cx: 66, cy: 98, r: 40 }, 3, 0, false)),
      tambah("Dika", emo("dk", 126, 176, E.dika, 30), teks("dk-n", 126, 189, "Dika", 8.4, W.ungu)),
      tambah("tiga", teks("n3", 220, 62, "3 kartu", 10, W.ungu)),
      tambah("kartu", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 168 + i * 42, 74, 38, 34, W.krem, ["kartu"], 8))),
      ubah("tua", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      tambah("Ratna", ...tokoh("br", 250, 176, "Bu Ratna")),
      tambah("tertawa.", emo("tw", 224, 150, E.tertawa, 18)),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("lomba", panah("pa", 176, 130, 28, 0, W.merah, 2.4), panah("pb", 236, 130, -28, 0, W.biru, 2.4)),
      tambah("bertabrakan!", emo("x1", 206, 124, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Juru Acara")),
      tambah("Tiga", teks("n3", 252, 40, "3 cara", 10, W.ungu)),
      tambah("Day", teks("m0", 100, 66, "1. Day Timeline", 13, W.biru), emo("i0", 246, 68, "\u{1F31E}", 22)),
      tambah("Hour", teks("m1", 100, 112, "2. Hour Track", 13, W.biru), ...jalurJam("ij", 226, 100, 3, 14, 12)),
      tambah("Duration", teks("m2", 100, 158, "3. Duration Bars", 13, W.biru), kotak("ib0", 222, 144, 40, 7, W.hijauMuda, W.biru, { rx: 1, tebal: 1.2 }), kotak("ib1", 222, 153, 24, 7, W.merahMuda, W.biru, { rx: 1, tebal: 1.2 })),
    ),
    k(
      SUARA_O4,
      tambah("Garis", teks("q0", 222, 88, "Garis Waktu Hari", 10, W.ungu)),
      tambah("Jalur", teks("q1", 222, 130, "Jalur Jam", 10, W.ungu)),
      tambah("Batang", teks("q2", 222, 176, "Batang Lama Kegiatan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Day Timeline: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Day Timeline, atau Garis Waktu Hari.";
const SUARA_C2 = "Gambar garis panjang dari pagi, siang, sore, sampai malam, seperti jalan matahari.";
const SUARA_C3 = "Taruh setiap kegiatan di tempat jamnya pada garis itu.";
const SUARA_C4 = "Kegiatan yang lebih awal ada di sebelah kiri, dan kegiatan yang lebih akhir di sebelah kanan.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Day Timeline: Garis Waktu Hari",
  sumber: "Metode global: Day Timeline (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Pertama")),
      tambah("Day", ...kartu("nm", 50, 34, 200, 26, W.krem, ["Day Timeline"], 13)),
      tambah("Garis", teks("nid", 150, 94, "Garis Waktu Hari", 12, W.ungu)),
      tambah("Hari.", emo("mt", 150, 150, "\u{1F31E}", 30), garis3("ln", 60, 176, 180)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Jalan Matahari")),
      tambah("Gambar", kotak("gl", 10, 104, 280, 8, "#94A3B8", W.biru, { rx: 2, tebal: 1.4 })),
      tambah("pagi,", ...ruasHari("rs", 96).slice(0, 1), emo("e0", 45, 76, EMO_H[0], 20), namaHari("nh", 126, 0)),
      tambah("siang,", ...ruasHari("rs", 96).slice(1, 2), emo("e1", 115, 76, EMO_H[1], 20), namaHari("nh", 126, 1)),
      tambah("sore,", ...ruasHari("rs", 96).slice(2, 3), emo("e2", 185, 76, EMO_H[2], 20), namaHari("nh", 126, 2)),
      tambah("malam,", ...ruasHari("rs", 96).slice(3, 4), emo("e3", 255, 76, EMO_H[3], 20), namaHari("nh", 126, 3)),
      tambah("matahari.", panah("pn", 20, 156, 260, 0, W.ungu, 2.6)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Taruh Kegiatan di Garis"), ...ruasHari("rs", 118), ...[0, 1, 2, 3].map((j) => namaHari("nh", 150, j))),
      tambah("Taruh", ...kartu("g0", 14, 56, 64, 28, W.putih, ["kegiatan"], 9), panah("a0", 46, 86, 0, 28, W.ungu, 2)),
      tambah("setiap", ...kartu("g1", 118, 56, 64, 28, W.putih, ["kegiatan"], 9), panah("a1", 150, 86, 0, 28, W.ungu, 2)),
      tambah("jamnya", ...kartu("g2", 222, 56, 64, 28, W.putih, ["kegiatan"], 9), panah("a2", 254, 86, 0, 28, W.ungu, 2)),
      sorotkan("garis", ...[0, 1, 2, 3].map((j) => `rs${j}`)),
    ),
    k(
      SUARA_C4,
      ubah(0, ...[0, 1, 2, 3].map((j) => ({ id: `rs${j}`, sorot: false }))),
      tambah("awal", teks("aw", 54, 190, "lebih awal", 10, W.hijau), panah("pk", 90, 170, -64, 0, W.hijau, 2.6)),
      sorotkan("kiri,", "g0-k"),
      tambah("akhir", teks("ak", 246, 190, "lebih akhir", 10, W.merah), panah("pr", 210, 170, 64, 0, W.merah, 2.6)),
      sorotkan("kanan.", "g2-k"),
    ),
  ],
};

/** Garis tiga ruas pendek sebagai ikon: tiga kotak sama panjang berderet `${id}0`..`${id}2` dari x. */
function garis3(id: string, x: number, y: number, lebar: number) {
  return kotak(id, x, y - 4, lebar, 8, "#94A3B8", W.biru, { rx: 2, tebal: 1.4 });
}

/* ------------------------------ Day Timeline: terapan ------------------------------ */
const SUARA_T1 = "Nia menaruh lomba lari di garis pagi, makan siang di garis siang, dan tarik tambang di garis sore.";
const SUARA_T2 = "Sekali pandang, urutan acara terlihat jelas dari kiri ke kanan.";
const SUARA_T3 = "Cocok kalau kita ingin mengurutkan kegiatan dalam satu hari.";
const SUARA_T4 = "Kurang cocok kalau dua kegiatan berdekatan sekali, karena tempatnya pada garis jadi sempit.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Nia mengatur lomba di garis",
  sumber: "Metode global: Day Timeline (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Nia Menaruh Lomba"), ...ruasHari("rs", 104), ...[0, 1, 2, 3].map((j) => namaHari("nh", 134, j))),
      tambah("Nia", ...tokoh("ni", 150, 178, "Nia")),
      tambah("lari", ...kartu("g0", 10, 58, 70, 34, W.putih, ["lomba", "lari"], 8.6), panah("a0", 45, 94, 0, 8, W.ungu, 2)),
      tambah("makan", ...kartu("g1", 80, 58, 70, 34, W.putih, ["makan", "siang"], 8.6), panah("a1", 115, 94, 0, 8, W.ungu, 2)),
      tambah("tarik", ...kartu("g2", 150, 58, 70, 34, W.putih, ["tarik", "tambang"], 8.6), panah("a2", 185, 94, 0, 8, W.ungu, 2)),
    ),
    k(
      SUARA_T2,
      tambah("Sekali", emo("kc", 262, 170, E.kaca, 26)),
      tambah("urutan", panah("pn", 20, 160, 250, 0, W.ungu, 2.6)),
      sorotkan("terlihat", "g0-k", "g1-k", "g2-k"),
      tambah("kanan.", emo("ok", 262, 140, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("mengurutkan", ...kartu("u0", 60, 70, 180, 22, W.kuning, ["lomba lari"], 9), ...kartu("u1", 60, 98, 180, 22, W.emas, ["makan siang"], 9), ...kartu("u2", 60, 126, 180, 22, W.oranye, ["tarik tambang"], 9)),
      tambah("satu", ...kartu("sh", 100, 158, 100, 22, W.putih, ["1 hari"], 11)),
      tambah("hari.", emo("ok", 262, 100, E.benar, 26)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12), ...ruasHari("rs", 124)),
      tambah("dua", teks("n2", 150, 92, "2 kegiatan", 11, W.merah)),
      tambah("berdekatan", bulat("p0", 148, 114, 6, W.merah, W.biru), bulat("p1", 160, 114, 6, W.hijau, W.biru)),
      tambah("sempit.", emo("x1", 154, 160, E.salah, 24)),
    ),
  ],
};
