import type { AdeganStory } from "./logika-story";
import { E, W, emo, idLingkaran, judul, kartu, kotak, lingkaranBatu, panah, papanTanda, pinus, rumput, teks, tenda, tokoh, tumpukKayu } from "./k3b2A-gambar";
import { hapus, k, sorotkan, tambah } from "./k3b2A-bantu";

/*
 * Cerita orisinal IGIL "Kayu untuk Api Unggun" (Kelas 3 Bab 2 Sub-Bab A, kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Naskah suara dari naskah/story-naskah-k3b2a.md. Bagian ini: lapangan kemah, tumpukan kayu, dan kalimat dengan titik-titik.
 */

/* ------------------------------ 1. Lapangan kemah ------------------------------ */
const SUARA_L1 = "Akhir pekan itu Raka, Salsa, dan Bima berkemah bersama Pak Joko di lapangan di bawah pohon pinus.";
const SUARA_L2 = "Kak Rina, pemandu berpeluit, menyambut mereka dan menunjuk tempat api unggun.";
const SUARA_L3 = "Malam nanti api unggun akan menyala, tetapi kayunya masih harus dikumpulkan.";

export const ADEGAN_LAPANGAN_KEMAH: AdeganStory = {
  id: "lapangan-kemah",
  judul: "Lapangan kemah",
  sumber: "Materi: lapangan kemah",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lapangan Kemah"), ...rumput("rt", 150)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 72, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 114, 184, "Bima")),
      tambah("Pak", ...tokoh("pj", 160, 184, "Pak Joko")),
      tambah("lapangan", ...tenda("td1", 98, 150, 42, 34), ...tenda("td2", 148, 150, 42, 34, "#60A5FA")),
      tambah("pinus.", ...pinus("pn1", 26, 150, 34, 70), ...pinus("pn2", 280, 150, 34, 70)),
    ),
    k(
      SUARA_L2,
      tambah("Rina,", ...tokoh("rn", 258, 184, "Kak Rina")),
      tambah("berpeluit,", emo("pl", 232, 166, "\u{1F4E3}", 14)),
      tambah("menunjuk", panah("pa", 246, 150, -22, -10, W.merah, 2.6)),
      tambah("api", ...lingkaranBatu("lb", 214, 136, 22, 7, 9)),
      sorotkan("unggun.", ...idLingkaran("lb", 9)),
    ),
    k(
      SUARA_L3,
      tambah("Malam", kotak("mlm", 2, 24, 296, 124, "#1E3A8A", undefined, { rx: 0, tebal: 0, z: -1, op: 0.3 })),
      tambah("nanti", emo("bt1", 60, 44, E.bintang, 14), emo("bt2", 236, 40, E.bintang, 14), emo("bln", 150, 44, E.bulan, 16)),
      tambah("menyala,", emo("ap", 214, 134, E.api, 22, { op: 0.4 })),
      tambah("dikumpulkan.", emo("rg", 176, 132, E.ranting, 18), emo("tq", 176, 112, E.tanya, 16)),
    ),
  ],
};

/* ------------------------------ 2. Tumpukan kayu ------------------------------ */
const SUARA_T1 = "Api unggun yang besar membutuhkan lima puluh batang kayu.";
const SUARA_T2 = "Di tumpukan sudah ada tiga puluh batang.";
const SUARA_T3 = "Berapa batang lagi yang harus dikumpulkan?";

export const ADEGAN_TUMPUKAN_KAYU: AdeganStory = {
  id: "tumpukan-kayu",
  judul: "Tumpukan kayu dan papan jumlah",
  sumber: "Materi: tumpukan kayu dan papan jumlah",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Api Unggun Butuh Kayu"), ...rumput("rt", 150)),
      tambah("Api", ...lingkaranBatu("lb", 100, 132, 34, 11, 11)),
      tambah("membutuhkan", emo("ap", 100, 134, E.api, 24, { op: 0.4 })),
      tambah("lima", ...papanTanda("pn", 186, 36, 96, 34, ["50 batang"], 12)),
      tambah("kayu.", emo("ry", 234, 100, E.ranting, 18)),
    ),
    k(
      SUARA_T2,
      tambah("tumpukan", ...tumpukKayu("ty", 196, 146, 30, 6, 12, 5)),
      tambah("tiga", teks("n30", 234, 114, "30", 14, W.hijauTua)),
      sorotkan("batang.", "ty0", "ty5"),
    ),
    k(
      SUARA_T3,
      hapus(0, "ry"),
      tambah("Berapa", teks("tq1", 100, 108, "?", 40, W.merah)),
      tambah("lagi", kotak("ks", 196, 84, 82, 20, "#FEF9C3", W.merah, { putus: true, z: 0 })),
      tambah("dikumpulkan?", teks("kr", 237, 98, "kurang?", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Kalimat dengan titik-titik ------------------------------ */
const SUARA_K1 = "Salsa menulis ceritanya dengan titik-titik: tiga puluh tambah titik-titik sama dengan lima puluh.";
const SUARA_K2 = "Titik-titik adalah bilangan yang belum diketahui.";
const SUARA_K3 = "Bentuk penjumlahan yang memuat titik-titik disebut kalimat Matematika.";

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat",
  judul: "Kalimat dengan titik-titik",
  sumber: "Materi: kalimat dengan titik-titik",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kalimat dengan Titik-Titik"), ...rumput("rt", 150)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("menulis", emo("ps", 70, 160, E.pensil, 16)),
      tambah("ceritanya", kotak("kl", 60, 48, 200, 56, W.putih, W.biru, { rx: 6, z: -1 })),
      tambah("tiga", teks("a30", 96, 88, "30", 26, W.hijauTua)),
      tambah("tambah", teks("tmb", 136, 86, "+", 24, W.biru)),
      tambah("titik-titik@2", teks("tt", 182, 86, "…", 26, W.merah)),
      tambah("sama", teks("sm", 216, 86, "=", 24, W.biru)),
      tambah("lima", teks("a50", 245, 88, "50", 26, W.jumlah)),
    ),
    k(
      SUARA_K2,
      sorotkan("Titik-titik", "tt"),
      tambah("bilangan", teks("bd", 182, 124, "belum diketahui", 9, W.merah)),
      tambah("diketahui.", panah("pb", 182, 118, 0, -16, W.merah, 2.4)),
    ),
    k(
      SUARA_K3,
      hapus(0, "bd", "pb"),
      tambah("penjumlahan", ...kartu("lb", 70, 118, 160, 26, W.krem, ["kalimat Matematika"], 10)),
      tambah("memuat", panah("pk", 150, 114, 0, -10, W.merah, 2.4)),
      tambah("Matematika.", emo("ok", 250, 132, E.benar, 20)),
    ),
  ],
};
