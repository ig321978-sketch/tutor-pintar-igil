import type { AdeganStory } from "./logika-story";
import { E, W, benda, elips, emo, geserBenda, geserBola, idBenda, judul, kartu, lantai, lereng, panah, rak, teks, tokoh } from "./k2b3C-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b3C-bantu";

/*
 * Cerita orisinal IGIL "Gudang Mainan Pak Rudi" (Kelas 2 Bab 3 Sub-Bab C, bangun ruang), akhir cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3c.md. Bagian ini: menggelinding di papan lereng, kubus dan balok, serta tabung, kerucut, dan bola.
 */

/* ------------------------------ 4. Menggelinding di papan lereng ------------------------------ */
const SUARA_L1 = "Mereka mencoba menggelindingkan benda di papan lereng. Bola dan kaleng meluncur dengan mudah.";
const SUARA_L2 = "Dadu dan kardus diam saja. Permukaan lengkung membuat benda menggelinding.";
const SUARA_L3 = "Permukaan datar menahan benda supaya diam, jadi kardus cocok ditumpuk.";

export const ADEGAN_GELINDING: AdeganStory = {
  id: "gelinding",
  judul: "Mencoba di papan lereng",
  sumber: "Materi: menggelinding dan diam",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Papan lereng"), lantai("lt", 150), ...lereng("lr", 50, 64, 200, 70)),
      tambah("Mereka", tokoh("ch", 28, 172, "chacha"), tokoh("dk", 272, 172, "dika")),
      tambah("Bola", ...benda("bl", "bola", 68, 56, 18)),
      tambah("dan", ...benda("kl", "kaleng", 102, 62, 26)),
      ubah("meluncur", ...geserBola("bl", 196, 106, 9)),
      tambah("meluncur", panah("ga", 80, 52, 190, 92, W.merah), panah("gb", 112, 62, 150, 82, W.merah)),
      ubah("dengan", ...geserBenda(benda("kl", "kaleng", 102, 62, 26), 56, 20)),
      tambah("mudah.", emo("sn", 150, 190, E.senang, 22)),
    ),
    k(
      SUARA_L2,
      hapus("Dadu", "ga", "gb", "sn", ...idBenda("kl", "kaleng"), "bl", "bl-k"),
      tambah("Dadu", ...benda("dd", "dadu", 72, 54, 26)),
      tambah("kardus", ...benda("kd", "kardus", 128, 68, 28)),
      tambah("diam", teks("dm1", 72, 38, "diam", 9, W.merah), teks("dm2", 128, 48, "diam", 9, W.merah)),
      tambah("lengkung", ...kartu("lk", 164, 26, 128, 20, W.krem, ["lengkung: menggelinding"], 8.2)),
      tambah("membuat", emo("lj", 262, 140, E.jempol, 18)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Permukaan datar"), lantai("lt", 150), ...rak("rk", 80, 112, 150)),
      tambah("Permukaan", ...kartu("dt", 86, 26, 128, 20, W.hijauMuda, ["datar: diam"], 9.4)),
      tambah("menahan", ...benda("k1", "kardus", 118, 97, 30)),
      tambah("supaya", ...benda("k2", "kardus", 178, 97, 30)),
      tambah("kardus", tokoh("ch", 28, 172, "chacha")),
      tambah("ditumpuk.", ...benda("k3", "kardus", 148, 74, 30), emo("sn", 270, 160, E.jempol, 20)),
    ),
  ],
};

/* ------------------------------ 5. Kubus dan balok ------------------------------ */
const SUARA_K1 = "Dika memegang dadu. Semua permukaannya datar dan berbentuk segi empat yang sama ukurannya. Itu kubus.";
const SUARA_K2 = "Kotak pensil juga berpermukaan datar, tetapi segi empatnya berbeda ukuran. Itu balok.";
const SUARA_K3 = "Chacha menghitung, dan kubus maupun balok masing-masing punya enam permukaan!";

export const ADEGAN_KUBUS_BALOK: AdeganStory = {
  id: "kubus-balok",
  judul: "Kubus dan balok",
  sumber: "Materi: kubus dan balok",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Dadu"), lantai("lt", 150)),
      tambah("Dika", tokoh("dk", 40, 172, "dika")),
      tambah("dadu.", ...benda("dd", "dadu", 150, 82, 64)),
      ubah("datar", { id: "dd-d", sorot: true }, { id: "dd-a", sorot: true }, { id: "dd-s", sorot: true }),
      tambah("segi", ...kartu("sg", 190, 36, 100, 38, W.krem, ["segi empat", "4 sisi sama"], 9.4)),
      tambah("kubus.", ...kartu("kb", 100, 140, 100, 22, W.hijauMuda, ["kubus"], 13)),
    ),
    k(
      SUARA_K2,
      hapus("Kotak", ...idBenda("dd", "dadu"), "sg-k", "sg-t0", "sg-t1", "kb-k", "kb-t0"),
      tambah("Kotak", ...benda("bk", "balok", 150, 80, 100), teks("kp", 150, 130, "kotak pensil", 9, W.coklat)),
      ubah("datar,", { id: "bk-d", sorot: true }, { id: "bk-a", sorot: true }, { id: "bk-s", sorot: true }),
      tambah("berbeda", ...kartu("bd", 180, 34, 110, 22, W.krem, ["ukuran sisi berbeda"], 8.2)),
      tambah("balok.", ...kartu("bl", 100, 148, 100, 22, W.hijauMuda, ["balok"], 13)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Kubus dan balok"), lantai("lt", 150)),
      tambah("Chacha", tokoh("ch", 150, 172, "chacha")),
      tambah("kubus", ...benda("kk", "kubus", 76, 82, 64), teks("kn", 76, 130, "kubus", 10, W.coklat)),
      tambah("balok", ...benda("bb", "balok", 220, 84, 84), teks("bn", 220, 130, "balok", 10, W.coklat)),
      tambah("enam", teks("k6", 76, 148, "6 permukaan", 10, W.merah), teks("b6", 220, 148, "6 permukaan", 10, W.merah)),
      tambah("permukaan!", emo("tp", 150, 138, E.tepuk, 20)),
    ),
  ],
};

/* ------------------------------ 6. Tabung, kerucut, bola ------------------------------ */
const SUARA_T1 = "Kaleng berbentuk tabung, topi pesta berbentuk kerucut, dan kelereng berbentuk bola.";
const SUARA_T2 = "Ketiganya punya permukaan lengkung, jadi bisa menggelinding.";
const SUARA_T3 = "Chacha menggelindingkan topi pesta, dan topi itu berputar membentuk lingkaran besar!";

const TOPI_AWAL = benda("tp", "topi", 60, 118, 34);

export const ADEGAN_TABUNG_KERUCUT_BOLA: AdeganStory = {
  id: "tabung-kerucut-bola",
  judul: "Tabung, kerucut, dan bola",
  sumber: "Materi: tabung, kerucut, dan bola",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tiga bangun ruang"), lantai("lt", 150)),
      tambah("Kaleng", ...benda("kl", "kaleng", 56, 90, 48)),
      tambah("tabung,", teks("n1", 56, 132, "tabung", 11, W.hijau)),
      tambah("topi", ...benda("tp", "topi", 150, 90, 52)),
      tambah("kerucut,", teks("n2", 150, 132, "kerucut", 11, W.merah)),
      tambah("kelereng", ...benda("kr", "kelereng", 244, 90, 44)),
      tambah("bola.", teks("n3", 244, 132, "bola", 11, W.biru)),
    ),
    k(
      SUARA_T2,
      tambah("Ketiganya", ...kartu("lk", 60, 26, 180, 20, W.krem, ["permukaan lengkung"], 10)),
      sorotkan("lengkung,", "kl-d", "tp-d", "kr"),
      tambah("jadi", panah("p1", 36, 160, 80, 160, W.merah), panah("p2", 130, 160, 174, 160, W.merah), panah("p3", 224, 160, 268, 160, W.merah)),
      tambah("menggelinding.", emo("sn", 150, 188, E.senang, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Topi berputar"), lantai("lt", 150)),
      tambah("Chacha", tokoh("ch", 28, 172, "chacha")),
      tambah("menggelindingkan", ...TOPI_AWAL, elips("lg", 190, 124, 74, 36, "none", { putus: true, tebal: 2 })),
      ubah("berputar", ...geserBenda(TOPI_AWAL, 130, -34)),
      tambah("berputar", emo("ar", 230, 80, E.angin, 18)),
      ubah("membentuk", ...geserBenda(TOPI_AWAL, 200, 30)),
      tambah("lingkaran", teks("ln", 190, 128, "lingkaran besar", 9, W.merah)),
    ),
  ],
};
