import type { AdeganStory } from "./logika-story";
import { E, W, batangKotak, bendera, emo, judul, kartu, konfeti, orang, papan, petak, pohon, selBaris, selKolom, teks, umbul } from "./k1b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k1b7B-bantu";

/*
 * Cerita orisinal IGIL "Papan Lantai Rumah Pohon" (Kelas 1 Bab 7 Sub-Bab B), akhir cerita Rumah Pohon Abang.
 * Naskah suara dari naskah/story-naskah-k1b7b.md. Bagian ini: selisih perkiraan dan hasil, kertas berpetak, dan penutup (perayaan akhir cerita bab).
 */

/* ------------------------------ 7. Selisih perkiraan dan hasil ------------------------------ */
const SUARA_S1 = "Perkiraan tadi tiga, hasilnya lima. Berapa selisihnya?";
const SUARA_S2 = "Lima dikurangi tiga sama dengan dua. Igil kurang dua jengkal.";
const SUARA_S3 = "Kaka tersenyum. Memperkirakan lalu memeriksa melatih mata supaya makin tepat.";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih",
  judul: "Selisih perkiraan dan hasil",
  sumber: "Materi: selisih perkiraan dan hasil ukur",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Selisih perkiraan dan hasil")),
      tambah("tiga,", ...batangKotak("p", 3, 40, 56, 24, W.langit), teks("lp", 124, 72, "perkiraan 3", 10, W.biru, { anchor: "start" })),
      tambah("lima.", ...batangKotak("h", 5, 40, 100, 24, W.hijauMuda), teks("lh", 172, 116, "hasil 5", 10, W.biru, { anchor: "start" })),
      tambah("selisihnya?", emo("tn", 150, 172, E.tanya, 30)),
    ),
    k(
      SUARA_S2,
      hapus(0, "tn"),
      sorotkan("dikurangi", "h3", "h4"),
      tambah("sama", teks("kal", 150, 160, "5 – 3 = 2", 16, W.biru)),
      tambah("Igil", ...orang("ig", 262, 176, E.igil, "Igil")),
      tambah("jengkal.", teks("kj", 90, 190, "Igil kurang 2 jengkal", 9.6, W.merah)),
    ),
    k(
      SUARA_S3,
      hapus(0, "kal", "kj"),
      tambah("Kaka", ...orang("kk", 262, 62, E.kaka, "Kaka")),
      tambah("Memperkirakan", ...kartu("cc", 60, 146, 150, 24, W.krem, ["perkirakan, lalu periksa"], 9.4)),
      tambah("mata", emo("mt", 230, 158, E.mata, 22)),
    ),
  ],
};

/* ------------------------------ 8. Kertas berpetak ------------------------------ */
const SUARA_P1 = "Abang menggambar denah lantai di kertas berpetak. Sisi panjang enam kotak, sisi pendek empat kotak.";
const SUARA_P2 = "Hitung kotaknya dari ujung kiri. Satu kotak pun tidak boleh terlewat.";
const SUARA_P3 = "Enam lebih banyak dari empat, jadi sisi panjang lebih panjang dari sisi pendek.";

export const ADEGAN_PETAK: AdeganStory = {
  id: "petak",
  judul: "Denah lantai di kertas berpetak",
  sumber: "Materi: kertas berpetak",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Denah lantai di kertas berpetak")),
      tambah("Abang", ...orang("ab", 262, 70, E.abang, "Abang")),
      tambah("kertas", ...petak("pt", 40, 54, 6, 4, 26)),
      tambah("enam", teks("t6", 118, 46, "6 kotak", 10, W.merah)),
      { at: "enam", ubah: selBaris("pt", 6, 0, 0, 5).map((id) => ({ id, warna: "#BFDBFE" })) },
      tambah("empat", teks("t4", 28, 108, "4", 12, W.merah)),
      { at: "empat", ubah: selKolom("pt", 6, 0, 1, 3).map((id) => ({ id, warna: "#FBCFE8" })) },
      tambah("kotak.@2", teks("t4b", 28, 176, "kotak", 8.6, W.merah)),
    ),
    k(
      SUARA_P2,
      tambah("ujung", teks("m1", 53, 70, "1", 11, W.merah)),
      sorotkan("kiri.", "ptc0"),
      tambah("terlewat.", teks("tl", 190, 170, "tanpa ada yang terlewat", 8.6, W.hijau)),
    ),
    k(
      SUARA_P3,
      hapus(0, "m1", "tl"),
      tambah("banyak", ...kartu("bd", 70, 164, 160, 24, W.krem, ["6 lebih banyak dari 4"], 9.4)),
      tambah("panjang@2", teks("lb", 232, 100, "lebih panjang", 8.6, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: rumah pohon selesai ------------------------------ */
const SUARA_T1 = "Papan dipasang rapat tanpa celah, dan rumah pohon Abang selesai. Bendera dikibarkan!";
const SUARA_T2 = "Ingat, mulai dari ujung, rapat, satu jenis alat ukur, dan tulis nama alatnya.";
const SUARA_T3 = "Menurutmu, kalau Mamah dan Igil menjengkal meja yang sama, apakah hasilnya selalu sama? Terima kasih, Igil, Kaka, Abang, dan Mamah!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Rumah pohon selesai",
  sumber: "Materi: penutup, rumah pohon selesai",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Rumah pohon Abang selesai")),
      tambah("Papan", ...pohon("ph", 270)),
      tambah("dipasang", ...[0, 1, 2, 3].flatMap((i) => papan(`pl${i}`, 40 + i * 50, 100, 50, 16))),
      tambah("selesai.", ...umbul("um", 40, 72, 210, 6)),
      tambah("Bendera", ...bendera("bd", 268, 40)),
      tambah("dikibarkan!", ...konfeti("kf")),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Ingat aturan mengukur")),
      tambah("mulai", ...kartu("r0", 20, 36, 120, 26, W.krem, ["mulai dari ujung"], 9.4)),
      tambah("rapat,", ...kartu("r1", 160, 36, 120, 26, W.hijauMuda, ["rapat"], 9.4)),
      tambah("satu", ...kartu("r2", 20, 74, 120, 26, W.langit, ["1 jenis alat ukur"], 9.4)),
      tambah("tulis", ...kartu("r3", 160, 74, 120, 26, W.pink, ["tulis nama alatnya"], 9.4)),
      tambah("alatnya.", teks("rj", 150, 128, "contoh: 5 jengkal", 12, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah("Mamah", ...orang("mm", 60, 90, E.mamah, "Mamah")),
      tambah("Igil", ...orang("ig", 120, 90, E.igil, "Igil")),
      tambah("sama?@2", emo("tn", 90, 40, E.tanya, 26)),
      tambah("Kaka,", ...orang("kk", 180, 90, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 240, 90, E.abang, "Abang")),
      tambah("Mamah!@2", emo("hr", 150, 150, E.hore, 30), ...konfeti("kf")),
    ),
  ],
};
