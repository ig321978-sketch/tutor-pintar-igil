import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kotak, lampionDeret, orang, teks } from "./k1b6B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b6B-bantu";

/*
 * Cerita orisinal IGIL "Loket Karcis" (Kelas 1 Bab 6 Sub-Bab B). Naskah suara dari naskah/story-naskah-k1b6b.md.
 * Bagian ini: lonceng penutup (jembatan ke Sub-Bab C) dan penutup ringkasan.
 */

/* ------------------------------ 7. Lonceng penutup ------------------------------ */
const SUARA_L1 = "Malam makin larut. Lonceng penutup berbunyi dari ujung pasar.";
const SUARA_L2 = "Dagangan sudah banyak berkurang, dan Pak RT minta setiap lapak melaporkan sisanya.";
const SUARA_L3 = "Mamah menoleh. Kalau kue cubit tadi banyak, sekarang sisanya berapa?";
const KUE = (i: number): number => 80 + i * 17;

export const ADEGAN_LONCENG: AdeganStory = {
  id: "lonceng",
  judul: "Lonceng penutup pasar malam",
  sumber: "Materi: malam larut dan lapor sisa",
  latar: "#C7D2FE",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Malam makin larut")),
      tambah("Malam", ...lampionDeret("lp", 6, 40, 52, 44), emo("bl", 262, 84, E.malam, 30)),
      tambah("Lonceng", emo("lc", 240, 160, E.lonceng, 34)),
      ubah("berbunyi", { id: "lc", rot: 22 }),
      tambah("ujung", teks("ti", 200, 140, "ting!", 12, W.merah)),
    ),
    k(
      SUARA_L2,
      hapus(0, "lc", "ti"),
      tambah("Dagangan", kotak("nm", 60, 132, 110, 8, W.coklat, W.biru, { rx: 2, tebal: 1.5 }), ...Array.from({ length: 6 }, (_, i) => emo(`ku${i}`, KUE(i), 128, E.kue, 16))),
      hapus("berkurang,", "ku3", "ku4", "ku5"),
      ubah("sudah", { id: "lp5", op: 0.25 }),
      tambah("Pak", ...orang("pr", 240, 120, E.pakRT, "Pak RT")),
      ubah("lapak", { id: "lp4", op: 0.25 }),
      tambah("melaporkan", ...kartu("lr", 176, 60, 110, 22, W.krem, ["lapor sisa"], 10)),
    ),
    k(
      SUARA_L3,
      tambah("Mamah", ...orang("mm", 30, 100, E.mamah, "Mamah")),
      ubah("menoleh.", { id: "lp3", op: 0.25 }),
      tambah("tadi", ...[3, 4, 5].map((i) => emo(`gh${i}`, KUE(i), 128, E.kue, 16, { op: 0.3 }))),
      sorotkan("banyak,", "gh3", "gh4", "gh5"),
      tambah("sisanya", ...kartu("sq", 60, 160, 110, 22, W.krem, ["sisa kue: ?"], 10)),
      tambah("berapa?", emo("tn", 62, 84, E.tanya, 20)),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_T1 = "Ingat, ya. Hitung maju dimulai dari bilangan sesudahnya. Kalau hampir sepuluh, genapkan sepuluh dulu.";
const SUARA_T2 = "Kalau belasan ditambah satuan, tambahkan satuannya, puluhannya tetap.";
const SUARA_T3 = "Menurutmu, kalau yang berkurang bukan bertambah, bagaimana cara menghitung sisanya? Terima kasih, Igil, Kaka, Abang, dan Mamah!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Yang perlu diingat tentang menjumlah",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Yang kita ingat")),
      tambah("Hitung", ...kartu("q0", 20, 34, 260, 30, W.hijauMuda, ["hitung maju: mulai dari bilangan sesudahnya"], 9)),
      tambah("Kalau", ...kartu("q1", 20, 72, 260, 30, W.krem, ["hampir 10: genapkan 10 dulu"], 9.4)),
    ),
    k(
      SUARA_T2,
      tambah("belasan", ...kartu("q2", 20, 110, 260, 30, W.pink, ["belasan + satuan: puluhan tetap"], 9.4)),
      sorotkan("puluhannya", "q2-k"),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), ...kartu("qb", 30, 40, 240, 34, W.krem, ["kalau berkurang, sisanya berapa?"], 10)),
      tambah("sisanya", emo("tn", 150, 112, E.tanya, 24)),
      tambah("Igil,", ...orang("ig", 60, 164, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 120, 164, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 180, 164, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 240, 164, E.mamah, "Mamah")),
    ),
  ],
};
