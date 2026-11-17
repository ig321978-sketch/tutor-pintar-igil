import type { AdeganStory, Obj } from "./logika-story";
import { E, JENIS, W, dasar, emo, idBalok, judul, kartu, kolomBalok, orang, panah, spanduk, teks } from "./k1b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b8B-bantu";

/* Video metode global Sub-Bab B "Cerita Kesukaan Anak Kampung": pembuka, Block Graph (Diagram Balok), dan terapannya. */

export const NAMA_METODE = ["Block Graph", "Dot Plot", "Bar Graph"];
export const NAMA_METODE_ID = ["Diagram Balok", "Diagram Titik", "Diagram Batang"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di bawah spanduk, Pak Pos Pustaka menemukan secarik kertas bergambar tiga cara menyajikan data.";
const SUARA_O2 = "Abang berseru, bagus! Cara-cara ini bisa dipakai untuk apa saja.";
const SUARA_O3 = "Tiga cara itu: Block Graph, Dot Plot, dan Bar Graph.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Diagram Balok, Diagram Titik, dan Diagram Batang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk menyajikan data",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara menyajikan data")),
      tambah("spanduk,", ...spanduk("sp", 70, 44, 160, "Perpustakaan Keliling", 9)),
      tambah("Pak", ...orang("pp", 60, 130, E.pria, "Pak Pos")),
      tambah("kertas", ...kartu("kr", 130, 94, 120, 54, W.krem, ["kertas", "bergambar"], 9.4)),
      ubah("tiga", { id: "kr-t1", isi: "3 cara" }),
      tambah("data.", emo("lc", 262, 120, E.lembar, 24)),
    ),
    k(
      SUARA_O2,
      tambah("Abang", ...orang("ab", 250, 170, E.abang, "Abang")),
      tambah("bagus!", emo("pt", 214, 168, E.pesta, 22)),
      tambah("saja.", emo("jp", 176, 170, E.jempol, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Block", "Dot", "Bar"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Balok", "Titik", "Batang"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
  ],
};

/* ------------------------------ 2. Block Graph: konsep ------------------------------ */
const SUARA_A1 = "Cara pertama, Block Graph, atau Diagram Balok.";
const SUARA_A2 = "Satu balok kecil mewakili satu data. Susun balok ke atas, satu kolom untuk satu jenis.";
const SUARA_A3 = "Balok harus sama besar dan rapat, dimulai dari garis dasar.";
const SUARA_A4 = "Kolom yang paling tinggi adalah data yang paling banyak.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Block Graph: balok bertumpuk",
  sumber: "Metode global: Block Graph",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("Block", ...kolomBalok("bx", 1, 150, 150)),
      tambah("Graph,", dasar("ds", 60, 240, 150)),
      tambah("Balok.", teks("lb", 150, 172, "1 balok", 11, W.merah)),
    ),
    k(
      SUARA_A2,
      hapus(0, "lb"),
      tambah("mewakili", ...kartu("kb", 70, 56, 160, 22, W.krem, ["1 balok = 1 data"], 10)),
      tambah("Susun", ...kolomBalok("bx", 4, 150, 150).slice(1)),
      tambah("kolom", ...kolomBalok("ba", 2, 90, 150), ...kolomBalok("bc", 3, 210, 150)),
      tambah("jenis.", emo("ne0", 90, 172, JENIS[0].e, 16), emo("ne1", 150, 172, JENIS[1].e, 16), emo("ne2", 210, 172, JENIS[2].e, 16)),
    ),
    k(
      SUARA_A3,
      hapus(0, "kb-k", "kb-t0"),
      tambah("sama", ...kartu("a0", 14, 56, 88, 20, W.hijauMuda, ["sama besar"], 8.4)),
      tambah("rapat,", ...kartu("a1", 106, 56, 88, 20, W.hijauMuda, ["rapat"], 8.4)),
      tambah("garis", ...kartu("a2", 198, 56, 88, 20, W.hijauMuda, ["garis dasar"], 8.4)),
      sorotkan("dasar.", "ds"),
    ),
    k(
      SUARA_A4,
      hapus(0, "a0-k", "a0-t0", "a1-k", "a1-t0", "a2-k", "a2-t0"),
      sorotkan("tinggi", ...idBalok("bx", 0, 3)),
      tambah("banyak.", ...kartu("pb", 100, 56, 100, 22, W.merahMuda, ["paling banyak"], 9), panah("pp", 150, 80, 0, 20)),
    ),
  ],
};

/* ------------------------------ 3. Block Graph: terapan pada kegiatan akhir pekan ------------------------------ */
const SUARA_B1 = "Kaka bertanya kegiatan akhir pekan. Balok untuk berenang empat, sepeda enam, layang-layang tiga.";
const SUARA_B2 = "Kolom sepeda paling tinggi, jadi sepeda paling banyak dipilih.";
const SUARA_B3 = "Cocok kalau datanya sedikit dan bisa disusun seperti mainan.";
const SUARA_B4 = "Kurang cocok kalau datanya banyak sekali, karena baloknya tidak muat.";

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Block Graph: kegiatan akhir pekan",
  sumber: "Metode global: Block Graph, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0), dasar("ds", 30, 270, 150)),
      tambah("Kaka", ...orang("kk", 22, 100, E.kaka, "Kaka")),
      tambah("berenang", teks("n0", 90, 166, "berenang", 8, W.biru)),
      tambah("empat,", ...kolomBalok("g0", 4, 90, 150), teks("v0", 90, 101, "4", 11, W.merah)),
      tambah("sepeda", teks("n1", 170, 166, "sepeda", 8, W.biru)),
      tambah("enam,", ...kolomBalok("g1", 6, 170, 150, "#F472B6"), teks("v1", 170, 79, "6", 11, W.merah)),
      tambah("layang-layang", teks("n2", 242, 166, "layang-layang", 8, W.biru)),
      tambah("tiga.", ...kolomBalok("g2", 3, 242, 150, "#A78BFA"), teks("v2", 242, 112, "3", 11, W.merah)),
    ),
    k(
      SUARA_B2,
      sorotkan("tinggi,", ...idBalok("g1", 0, 5)),
      tambah("banyak", ...kartu("pb", 120, 52, 100, 20, W.merahMuda, ["paling banyak"], 9)),
    ),
    k(
      SUARA_B3,
      hapus(0, "pb-k", "pb-t0"),
      tambah("Cocok", ...kartu("cc", 40, 174, 220, 22, W.hijauMuda, ["cocok: data sedikit, disusun seperti mainan"], 8.4)),
      tambah("mainan.", emo("ok", 280, 185, E.benar, 16)),
    ),
    k(
      SUARA_B4,
      hapus(0, "cc-k", "cc-t0", "ok"),
      tambah("Kurang", ...kartu("kc", 40, 174, 220, 22, W.merahMuda, ["kurang cocok: data banyak sekali, tidak muat"], 8.4)),
      tambah("banyak", ...kolomBalok("g3", 9, 284, 150)),
      tambah("muat.", emo("sl", 280, 185, E.salah, 16)),
    ),
  ],
};
