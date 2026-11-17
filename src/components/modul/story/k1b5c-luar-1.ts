import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batang, emo, ikatSedotan, judul, kartu, kotak, kubus, kubusBanyak, orang, sepuluhKubus, teks } from "./k1b5c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b5c-bantu";

/* Video metode global Sub-Bab C "Kemas Pakan dan Kantong": pembuka, lalu Base Ten Blocks (Balok Puluhan) dengan konsep dan terapan. */

export const NAMA_METODE = ["Base Ten Blocks", "Place Value Chart", "Bundling Sticks"];
export const NAMA_METODE_ID = ["Balok Puluhan", "Tabel Puluhan dan Satuan", "Ikat Sedotan"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di laci meja lapak, Abang menemukan tiga alat bantu hitung. Igil bertanya, mana yang paling cepat untuk papan persediaan?";
const SUARA_O2 = "Tiga metode itu: Base Ten Blocks, Place Value Chart, dan Bundling Sticks.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Balok Puluhan, Tabel Puluhan dan Satuan, dan Ikat Sedotan.";
const SUARA_O4 = "Semua metode membantu kita melihat puluhan dulu, lalu satuan.";
const LACI_SEDOTAN = ikatSedotan("ls", 210, 52);

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk puluhan dan satuan",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga alat bantu hitung")),
      tambah("laci", kotak("lc", 40, 36, 220, 76, "#E7D3B0", W.coklat, { rx: 6, tebal: 2.2, z: -3 })),
      tambah("Abang", ...orang("ab", 24, 182, E.abang, "Abang")),
      tambah("menemukan", ...batang("lb", 70, 48), kotak("lt0", 120, 52, 30, 40, W.langit, W.biru, { rx: 0, tebal: 1.6 }), kotak("lt1", 150, 52, 30, 40, W.pink, W.biru, { rx: 0, tebal: 1.6 }), ...LACI_SEDOTAN),
      tambah("tiga", ...kartu("tg", 100, 122, 100, 24, W.emas, ["3 alat bantu"], 10)),
      tambah("Igil", ...orang("ig", 276, 182, E.igil, "Igil")),
      tambah("cepat", teks("tq", 150, 170, "mana paling cepat?", 10, W.merah)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Base", "Place", "Bundling"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Balok", "Tabel", "Ikat"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Puluhan dulu, lalu satuan")),
      tambah("puluhan", ...kartu("pa", 30, 70, 100, 40, W.langit, ["puluhan"], 12), teks("du", 80, 128, "dulu", 10, W.merah)),
      tambah("lalu", { id: "pn", t: "panah", x: 136, y: 90, x2: 28, y2: 0, warna: W.ungu, tebal: 2.6 }, teks("la", 220, 128, "lalu", 10, W.ungu)),
      tambah("satuan.", ...kartu("pb", 170, 70, 100, 40, W.pink, ["satuan"], 12)),
    ),
  ],
};

/* ------------------------------ 2. Base Ten Blocks: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Base Ten Blocks, atau Balok Puluhan. Satu batang panjang mewakili satu puluhan, yaitu sepuluh kubus kecil.";
const SUARA_A2 = "Satu kubus kecil mewakili satu satuan. Sepuluh kubus kecil bisa ditukar dengan satu batang.";
const SUARA_A3 = "Untuk membuat bilangan, ambil batang untuk puluhan dan kubus untuk satuan.";
const SUARA_A4 = "Satu batang dan empat kubus, itu empat belas.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Base Ten Blocks: balok puluhan",
  sumber: "Metode global: Base Ten Blocks",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("Satu", teks("b1", 66, 130, "1 batang", 9.4, W.merah)),
      tambah("batang", ...batang("bt", 60, 64)),
      tambah(idx(SUARA_A1, "puluhan", 2), teks("p1", 66, 146, "1 puluhan", 9.4, W.merah)),
      tambah("sepuluh", ...sepuluhKubus("kb", 130, 70), teks("k10", 165, 112, "10 kubus kecil", 9.4, W.ungu)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("Satu", kubus("k1", 44, 70), teks("t1", 49, 98, "1 kubus", 9, W.merah)),
      tambah("satuan.", teks("t2", 49, 112, "1 satuan", 9, W.merah)),
      tambah("Sepuluh", ...sepuluhKubus("kb", 100, 66), teks("t10", 135, 108, "10 kubus", 9, W.ungu)),
      tambah("ditukar", { id: "ar", t: "panah", x: 176, y: 80, x2: 30, y2: 0, warna: W.hijau, tebal: 2.6 }),
      tambah("batang.", ...batang("bt", 224, 56), teks("t3", 230, 122, "1 batang", 9, W.merah)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("batang", ...batang("bt", 80, 64)),
      tambah("puluhan", teks("bp", 86, 134, "puluhan", 10, W.biru)),
      tambah("kubus", kubus("ks", 205, 90)),
      tambah("satuan.", teks("bs", 210, 134, "satuan", 10, W.ungu)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("batang", ...batang("bt", 90, 60), teks("b1", 96, 128, "1 batang", 9, W.merah)),
      tambah("empat", ...kubusBanyak("kb", 130, 70, 4), teks("b4", 145, 128, "4 kubus", 9, W.merah)),
      tambah("belas.", teks("b14", 232, 106, "14", 30, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Base Ten Blocks: terapan pada persediaan ------------------------------ */
const SUARA_B1 = "Abang membuat enam belas bungkus pakan dengan balok. Satu batang dan enam kubus.";
const SUARA_B2 = "Untuk tiga belas kantong, Abang memakai satu batang dan tiga kubus.";
const SUARA_B3 = "Untuk dua puluh kerikil, dua batang tanpa kubus. Tidak ada satuan.";
const SUARA_B4 = "Balok enak dibandingkan dengan sekali lihat, tetapi menaruhnya satu per satu lebih lama daripada menulis angka.";

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Base Ten Blocks: pakan, kantong, kerikil",
  sumber: "Metode global: Base Ten Blocks, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("Abang", ...orang("ab", 24, 182, E.abang, "Abang")),
      tambah("belas", teks("jm", 150, 64, "16 bungkus pakan", 10, W.ungu)),
      tambah(idx(SUARA_B1, "batang"), ...batang("bt", 90, 74), teks("b1", 96, 140, "1 batang", 9, W.merah)),
      tambah(idx(SUARA_B1, "enam", 2), ...kubusBanyak("kb", 140, 82, 6), teks("b6", 160, 140, "6 kubus", 9, W.merah)),
    ),
    k(
      SUARA_B2,
      ubah("tiga", { id: "jm", isi: "13 kantong" }),
      sorotkan("batang", "bt"),
      hapus(idx(SUARA_B2, "tiga", 2), "kb3", "kb4", "kb5"),
      ubah(idx(SUARA_B2, "tiga", 2), { id: "b6", isi: "3 kubus" }),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, ...kepala(0), ...orang("ab", 24, 182, E.abang, "Abang")),
      tambah("puluh", teks("jm", 150, 64, "20 kerikil", 10, W.ungu)),
      tambah("batang", ...batang("bt", 100, 74), ...batang("bu", 130, 74), teks("b2", 118, 140, "2 batang", 9, W.merah)),
      tambah("tanpa", teks("b0", 210, 106, "0 kubus", 10, W.ungu)),
      tambah("satuan.", emo("ok", 210, 132, E.benar, 16)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah("sekali", ...kartu("kl", 20, 62, 120, 30, W.hijauMuda, ["balok: sekali lihat"], 9)),
      tambah("satu", ...kartu("kb", 160, 62, 120, 30, W.pink, ["1 per 1: lama"], 9)),
      tambah("menulis", ...kartu("kn", 90, 112, 120, 30, W.krem, ["menulis angka: 16"], 9)),
    ),
  ],
};
