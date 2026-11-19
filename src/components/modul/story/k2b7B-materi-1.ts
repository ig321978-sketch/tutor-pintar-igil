import type { AdeganStory } from "./logika-story";
import { E, W, dinding, emo, ikatan, jepit, judul, karung, kartu, kepik, panah, papanTim, pindahKepik, tali, teks, tokoh, xTali } from "./k2b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/*
 * Cerita orisinal IGIL "Pengumuman Bu Lia" (Kelas 2 Bab 7 Sub-Bab B, membandingkan dan mengurutkan bilangan), akhir cerita Bank Sampah Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b7b.md. Bagian ini: kepik maju, kepik mundur (salah langkah), puluhan dulu (taruhan).
 */

/* ------------------------------ 1. Kepik maju ------------------------------ */
const SUARA_K1 = "Esok harinya, Bu Lia memasang garis angka. Kepik di antara empat puluh delapan dan lima puluh.";
const SUARA_K2 = "Kepik di empat puluh sembilan. Ia maju dua langkah: lima puluh, lima puluh satu.";
const SUARA_K3 = "Dua lebihnya dari empat puluh sembilan adalah lima puluh satu. Lebih berarti maju!";

export const ADEGAN_KEPIK_MAJU: AdeganStory = {
  id: "kepik-maju",
  judul: "Kepik maju di garis angka",
  sumber: "Materi: kepik maju dua langkah",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Garis Angka Bu Lia"), ...dinding("dn")),
      tambah("Lia,", ...tokoh("bl", 40, 168, "Bu Lia")),
      tambah("garis", ...tali("tl", 104, 46, 52, [46, 47, 48, 50, 51, 52])),
      tambah("Kepik", kepik("kp", 104, 49, 46, 52)),
      tambah("antara", teks("an", xTali(49, 46, 52), 128, "?", 12, W.merah)),
      sorotkan("delapan", "tlp48"),
      sorotkan("lima", "tlp50"),
    ),
    k(
      SUARA_K2,
      hapus(0, "an"),
      ubah(0, { id: "tlp48", sorot: false }, { id: "tlp50", sorot: false }),
      tambah("sembilan", ...jepit("tl", 104, 49, 46, 52, W.merah)),
      tambah("dua", teks("lg", 150, 74, "2 langkah", 11, W.merah)),
      tambah("maju", panah("pm", xTali(49, 46, 52), 88, 84, 0, W.merah, 2.4)),
      ubah("lima", ...pindahKepik("kp", 50, 46, 52)),
      sorotkan("lima", "tlp50"),
      ubah("lima@2", ...pindahKepik("kp", 51, 46, 52)),
      sorotkan("lima@2", "tlp51"),
    ),
    k(
      SUARA_K3,
      ubah(0, { id: "tlp50", sorot: false }, { id: "tlp51", sorot: false }),
      hapus(0, "lg"),
      tambah("Dua", ...kartu("hs", 84, 148, 206, 24, W.krem, ["2 lebihnya dari 49: 51"], 11)),
      sorotkan("empat", "tlp49"),
      sorotkan("satu.", "tlp51"),
      tambah("lebih@2", teks("mj", 190, 188, "lebih = maju", 11, W.hijau)),
      ubah("maju!", { id: "pm", warna: W.hijau }),
    ),
  ],
};

/* ------------------------------ 2. Kepik mundur ------------------------------ */
const SUARA_M1 = "Sekarang kepik di delapan puluh dua. Chacha menyuruhnya mundur tiga langkah.";
const SUARA_M2 = "Chacha menyebut delapan puluh dua, delapan puluh satu, delapan puluh. Berhenti di delapan puluh!";
const SUARA_M3 = "Dika menggeleng. Awalnya tidak dihitung: delapan puluh satu, delapan puluh, tujuh puluh sembilan. Kurang berarti mundur!";

export const ADEGAN_KEPIK_MUNDUR: AdeganStory = {
  id: "kepik-mundur",
  judul: "Chacha salah menghitung mundur",
  sumber: "Materi: kepik mundur tiga langkah",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_M1,
      bersih(0),
      tambah(0, judul("Kepik Mundur"), ...dinding("dn"), ...tali("tl", 104, 78, 84)),
      tambah("kepik", kepik("kp", 104, 82, 78, 84)),
      sorotkan("delapan", "tlp82"),
      tambah("Chacha", ...tokoh("ch", 40, 170, "Chacha")),
      tambah("mundur", panah("pm", xTali(82, 78, 84), 86, -126, 0, W.merah, 2.4)),
      tambah("tiga", teks("lg", 129, 76, "3 langkah", 11, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus(0, "lg", "pm"),
      sorotkan("dua,", "tlp82"),
      ubah("satu,", ...pindahKepik("kp", 81, 78, 84)),
      sorotkan("satu,", "tlp81"),
      ubah("puluh@3", ...pindahKepik("kp", 80, 78, 84)),
      sorotkan("puluh@3", "tlp80"),
      tambah("Berhenti", emo("tz", xTali(80, 78, 84), 62, E.tanya, 20), teks("hn", 190, 160, "berhenti di 80?", 10, W.merah)),
    ),
    k(
      SUARA_M3,
      hapus(0, "tz", "hn"),
      ubah(0, { id: "tlp82", sorot: false }, { id: "tlp81", sorot: false }, { id: "tlp80", sorot: false }, ...pindahKepik("kp", 82, 78, 84)),
      tambah("Dika", ...tokoh("dk", 92, 170, "Dika")),
      tambah("menggeleng", emo("x1", xTali(80, 78, 84), 62, E.salah, 20)),
      ubah("satu,", ...pindahKepik("kp", 81, 78, 84)),
      ubah("puluh@2", ...pindahKepik("kp", 80, 78, 84)),
      ubah("sembilan.", ...pindahKepik("kp", 79, 78, 84)),
      sorotkan("sembilan.", "tlp79"),
      tambah("sembilan.", emo("ok", xTali(79, 78, 84), 62, E.benar, 20), panah("pb", xTali(82, 78, 84), 86, -126, 0, W.hijau, 2.4)),
      tambah("Kurang", ...kartu("hs", 84, 148, 206, 24, W.krem, ["3 kurangnya dari 82: 79"], 11)),
      hapus("mundur!", "x1"),
    ),
  ],
};

/* ------------------------------ 3. Puluhan dulu ------------------------------ */
const SUARA_P1 = "Tim Biru mengumpulkan empat puluh tujuh botol, dan tim Kuning tujuh puluh empat.";
const SUARA_P2 = "Chacha berseru, Biru lebih banyak, satuannya tujuh! Kalau salah, aku memikul semua karung!";
const SUARA_P3 = "Dika berkata, lihat puluhannya dulu. Tujuh puluhan lebih banyak dari empat puluhan, jadi Kuning lebih banyak.";

export const ADEGAN_PULUHAN_DULU: AdeganStory = {
  id: "puluhan-dulu",
  judul: "Puluhan dulu, satuan kemudian",
  sumber: "Materi: lihat puluhan dulu",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Tim Biru dan Tim Kuning"), ...dinding("dn")),
      tambah("Biru", ...papanTim("pb", 24, 36, 100, "Tim Biru", 47, W.biruTim)),
      tambah("tujuh", ...ikatan("ib", 28, 84, 4, 7, 10)),
      tambah("Kuning", ...papanTim("pk", 176, 36, 100, "Tim Kuning", 74, W.kuningTim)),
      tambah("tujuh@2", ...ikatan("ik", 180, 84, 7, 4, 10)),
    ),
    k(
      SUARA_P2,
      tambah("Chacha", ...tokoh("ch", 150, 150, "Chacha")),
      tambah("berseru", emo("sr", 178, 130, E.seru, 18)),
      sorotkan("Biru", "pb-k"),
      tambah("satuannya", teks("sa", 86, 120, "satuan: 7", 9, W.merah), panah("pa", 88, 108, -6, -28, W.merah, 2)),
      tambah("tujuh!", emo("pq", 120, 130, E.tanya, 16)),
      tambah("karung!", ...karung("kg", 232, 180, 6)),
    ),
    k(
      SUARA_P3,
      hapus(0, "sr", "sa", "pa", "pq"),
      ubah(0, { id: "pb-k", sorot: false }),
      tambah("Dika", ...tokoh("dk", 70, 150, "Dika")),
      tambah("Tujuh", teks("t7", 232, 120, "7 puluhan", 9, W.merah)),
      sorotkan("Tujuh", "pk-k"),
      tambah("empat", teks("t4", 74, 120, "4 puluhan", 9, W.biru)),
      sorotkan("empat", "pb-k"),
      tambah("Kuning", emo("ok", 150, 70, E.benar, 20)),
    ),
  ],
};
