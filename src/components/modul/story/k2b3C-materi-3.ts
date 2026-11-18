import type { AdeganStory } from "./logika-story";
import { E, W, benda, emo, geserBola, gerbang, isiTabelRuang, judul, kartu, konfeti, lantai, papanCatatan, papanPuzzle, petakUbin, rak, tabelRuang, teks, tokoh, wadah } from "./k2b3C-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k2b3C-bantu";

/*
 * Cerita orisinal IGIL "Gudang Mainan Pak Rudi" (Kelas 2 Bab 3 Sub-Bab C, bangun ruang), akhir cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3c.md. Bagian ini: tabel catatan Dika, rak yang rapi, dan penutup perayaan taman dibuka.
 */

/* ------------------------------ 7. Tabel di papan catatan ------------------------------ */
const SUARA_T1 = "Dika membuat tabel di papan catatan dengan lima baris: kubus, balok, tabung, kerucut, dan bola.";
const SUARA_T2 = "Dadu masuk baris kubus, kotak pensil masuk baris balok, dan kaleng masuk baris tabung.";
const SUARA_T3 = "Topi pesta masuk baris kerucut, dan kelereng masuk baris bola.";

const TB = { x: 70, y: 34 };
const BARIS_KOSONG = [0, 1, 2, 3, 4].map(() => ({ bangun: "", benda: "" }));
const NAMA_BARIS = ["kubus", "balok", "tabung", "kerucut", "bola"];
const sorotBaris = (id: string, i: number) => [`${id}-r${i}a`, `${id}-r${i}b`];

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel di papan catatan",
  sumber: "Materi: tabel bangun ruang dan benda",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Papan catatan Dika")),
      tambah("Dika", tokoh("dk", 272, 100, "dika")),
      tambah("papan", papanCatatan("pc", 64, 24, 188, 146)),
      tambah("tabel", ...tabelRuang("tb", TB.x, TB.y, BARIS_KOSONG)),
      tambah("lima", ...kartu("lm", 150, 174, 100, 18, W.krem, ["5 baris"], 9.4)),
      tambah("kubus,", isiTabelRuang("tb", TB.x, TB.y, 0, 0, NAMA_BARIS[0]), isiTabelRuang("tb", TB.x, TB.y, 1, 0, NAMA_BARIS[1])),
      tambah("tabung,", isiTabelRuang("tb", TB.x, TB.y, 2, 0, NAMA_BARIS[2])),
      tambah("kerucut,", isiTabelRuang("tb", TB.x, TB.y, 3, 0, NAMA_BARIS[3])),
      tambah("bola.", isiTabelRuang("tb", TB.x, TB.y, 4, 0, NAMA_BARIS[4])),
    ),
    k(
      SUARA_T2,
      tambah("Dadu", ...benda("b1", "dadu", 34, 70, 24)),
      sorotkan("masuk", ...sorotBaris("tb", 0)),
      tambah("kubus,", isiTabelRuang("tb", TB.x, TB.y, 0, 1, "dadu", W.merah)),
      tambah("kotak", ...benda("b2", "balok", 34, 92, 22)),
      sorotkan("balok,", ...sorotBaris("tb", 1)),
      tambah("balok,", isiTabelRuang("tb", TB.x, TB.y, 1, 1, "kotak pensil", W.merah)),
      tambah("kaleng", ...benda("b3", "kaleng", 34, 116, 24)),
      tambah("tabung.", isiTabelRuang("tb", TB.x, TB.y, 2, 1, "kaleng", W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("Topi", ...benda("b4", "topi", 34, 140, 24)),
      tambah("kerucut,", isiTabelRuang("tb", TB.x, TB.y, 3, 1, "topi pesta", W.merah)),
      tambah("kelereng", ...benda("b5", "kelereng", 34, 166, 20)),
      tambah("bola.", isiTabelRuang("tb", TB.x, TB.y, 4, 1, "kelereng", W.merah)),
      tambah("bola.", emo("ok", 272, 140, E.jempol, 20)),
    ),
  ],
};

/* ------------------------------ 8. Rak yang rapi ------------------------------ */
const SUARA_R1 = "Bu Sari meminta Chacha menata rak. Kardus dan dadu ditumpuk di rak yang datar.";
const SUARA_R2 = "Bola dan kelereng ditaruh di wadah berpagar, supaya tidak menggelinding lagi.";
const SUARA_R3 = "Kali ini semua mainan diam di tempatnya, dan Chacha bernapas lega.";

export const ADEGAN_RAK_RAPI: AdeganStory = {
  id: "rak-rapi",
  judul: "Menata rak",
  sumber: "Materi: rak datar dan wadah berpagar",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Rak yang rapi"), lantai("lt", 150)),
      tambah("Sari", tokoh("sr", 272, 172, "sari")),
      tambah("Chacha", tokoh("ch", 28, 172, "chacha")),
      tambah("rak.", ...rak("rk", 70, 112, 120), teks("rn", 130, 106, "rak datar", 8.6, W.coklat)),
      tambah("Kardus", ...benda("k1", "kardus", 98, 97, 30)),
      tambah("dadu", ...benda("dd", "dadu", 160, 97, 30)),
      tambah("ditumpuk", ...benda("k2", "kardus", 98, 76, 30)),
    ),
    k(
      SUARA_R2,
      tambah("Bola", ...benda("bl", "bola", 212, 104, 16)),
      tambah("kelereng", ...benda("kr", "kelereng", 244, 106, 14)),
      tambah("wadah", ...wadah("wd", 196, 128, 76, 20)),
      ubah("berpagar,", ...geserBola("bl", 214, 138, 8), ...geserBola("kr", 246, 139, 7)),
      tambah("tidak", emo("sl", 230, 112, "\u{274C}", 14)),
      tambah("lagi.", emo("jm", 150, 190, E.jempol, 18)),
    ),
    k(
      SUARA_R3,
      tambah("Kali", ...kartu("sm", 60, 28, 180, 20, W.hijauMuda, ["semua mainan diam"], 10)),
      sorotkan("tempatnya,", "k1-d", "dd-d", "wd"),
      ubah("Chacha", { id: "ch", isi: E.lega }),
      tambah("bernapas", emo("an", 52, 146, E.angin, 16)),
      tambah("lega.", emo("bn", 28, 138, E.bintang, 14)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: taman dibuka ------------------------------ */
const SUARA_P1 = "Keesokan harinya taman bermain dibuka, dan anak-anak berlarian di petak ubin yang rapi.";
const SUARA_P2 = "Papan puzzle terpasang lengkap, dan rak mainan tertata tanpa ada bola yang kabur.";
const SUARA_P3 = "Dika merangkum. Bangun ruang bisa diisi, ada yang datar dan lengkung. Menurutmu, bentuk apa yang paling kamu suka di taman ini? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Rudi!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Taman bermain dibuka",
  sumber: "Materi: taman dibuka dan rangkuman",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Hari pembukaan"), lantai("lt", 120, "#BBF7D0")),
      tambah("taman", ...gerbang("gb", 60, 24, 180, "Taman Dibuka")),
      tambah("dibuka,", ...konfeti("kf", 4, 40, 290, 70, 14), emo("kn", 28, 64, E.konfeti, 22), emo("kn2", 272, 64, E.konfeti, 22)),
      tambah("anak-anak", emo("ak1", 100, 150, E.larian, 22), emo("ak2", 150, 170, E.larian, 22), emo("ak3", 214, 150, E.larian, 22)),
      tambah("petak", ...petakUbin("pt", 86, 128, 4, 8, 16)),
    ),
    k(
      SUARA_P2,
      tambah("Papan", ...papanPuzzle("pz", 14, 78, 22)),
      tambah("lengkap,", emo("jp", 38, 134, E.jempol, 16)),
      tambah("rak", ...rak("rk", 204, 94, 84)),
      tambah("tertata", ...benda("k1", "kardus", 226, 79, 26), ...benda("dd", "dadu", 252, 79, 20)),
      tambah("bola", ...wadah("wd", 214, 70, 30, 16)),
      tambah("kabur.", emo("sn", 272, 62, E.senang, 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Rangkuman Dika"), lantai("lt", 130, "#BBF7D0")),
      tambah("Dika", papanCatatan("pc", 40, 26, 220, 90)),
      tambah("Bangun", teks("r1", 150, 56, "bangun ruang bisa diisi", 10)),
      tambah("datar", teks("r2", 150, 76, "ada yang datar", 10, W.hijau)),
      tambah("lengkung.", teks("r3", 150, 96, "ada yang lengkung", 10, W.merah)),
      tambah("Menurutmu,", emo("tn", 150, 126, E.tanya, 20)),
      tambah("Terima", emo("lb1", 30, 150, E.lambai, 16), emo("lb2", 270, 150, E.lambai, 16), ...konfeti("kf", 4, 20, 290, 100, 10)),
      tambah("Chacha,", ...tokoh("ch", 30, 174, "chacha")),
      tambah("Dika@2", ...tokoh("dk", 90, 174, "dika")),
      tambah("Nia,", ...tokoh("ni", 150, 174, "nia")),
      tambah("Sari,", ...tokoh("sr", 210, 174, "sari")),
      tambah("Rudi!", ...tokoh("rd", 270, 174, "rudi")),
    ),
  ],
};
