import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WG, busur, emo, garis, gerobak, ikat, judul, kartu, kotak, lantai, lepas, papanTim, teks, tokoh } from "./k2b7A-gambar";
import { bersih, hapus, k, tambah } from "./k2b7A-bantu";

/*
 * Cerita orisinal IGIL "Botol Pak Ujang" (Kelas 2 Bab 7 Sub-Bab A), awal cerita Bank Sampah Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b7a.md. Bagian ini: melompat sepuluh-sepuluh sampai seratus, ikat dan botol lepas, dan dua cara menulis bilangan.
 */

/* ------------------------------ 4. Melompat sampai seratus ------------------------------ */
const SUARA_L1 = "Kita hitung ikatnya dengan melompat sepuluh-sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh.";
const SUARA_L2 = "Terus melompat sampai sembilan puluh, dan satu lompatan lagi menjadi seratus.";
const SUARA_L3 = "Gerobak Pak Ujang berisi sepuluh ikat. Sepuluh puluhan sama dengan seratus botol!";

const IKAT_X = [24, 78, 132, 186];
/** Titik pusat ikat ke-i pada deret ikat. */
const pusat = (i: number): number => IKAT_X[i] + 19;
/** Tanda angka pada garis lompatan: tick `${id}`, angka `${id}-n`. */
const tanda = (id: string, x: number, isi: string, u = 8, warna: string = W.ungu): Obj[] => [garis(id, x, 116, 0, 8, W.biru, 1.6), teks(`${id}-n`, x, 136, isi, u, warna)];

export const ADEGAN_SAMPAI_SERATUS: AdeganStory = {
  id: "sampai-seratus",
  judul: "Melompat sepuluh-sepuluh sampai seratus",
  sumber: "Materi: lompat sepuluh-sepuluh, seratus",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lompat Sepuluh-Sepuluh"), ...lantai("lt", 150), ...IKAT_X.flatMap((x, i) => ikat(`k${i}`, x, 120, "botol"))),
      tambah("sepuluh@2", busur("b0", 8, pusat(0), 114, 20), teks("a0", pusat(0), 168, "10", 12, W.merah)),
      tambah("dua", busur("b1", pusat(0), pusat(1), 114, 20), teks("a1", pusat(1), 168, "20", 12, W.merah)),
      tambah("tiga", busur("b2", pusat(1), pusat(2), 114, 20), teks("a2", pusat(2), 168, "30", 12, W.merah)),
      tambah("empat", busur("b3", pusat(2), pusat(3), 114, 20), teks("a3", pusat(3), 168, "40", 12, W.merah)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Sampai Seratus"), garis("gl", 14, 120, 272, 0, W.biru, 2.4), ...[0, 1, 2, 3, 4, 5, 6, 7].flatMap((i) => tanda(`s${i}`, 26 + i * 27, String((i + 1) * 10))), ...[0, 1, 2, 3, 4, 5, 6].map((i) => busur(`u${i}`, 26 + i * 27, 53 + i * 27, 114, 14))),
      tambah("sembilan", ...tanda("s8", 242, "90", 9, W.merah), busur("u7", 215, 242, 114, 14)),
      tambah("satu", ...kartu("kl", 66, 44, 168, 26, W.krem, ["1 lompatan lagi"], 10), busur("u8", 242, 269, 114, 14, W.hijau)),
      tambah("seratus.", ...tanda("s9", 269, "100", 11, W.hijau), emo("ok", 269, 92, E.bintang, 22)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Sepuluh Ikat Satu Gerobak"), ...lantai("lt", 150), ...gerobak("gr", 120, 150)),
      tambah("berisi", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((i) => [kotak(`ib${i}`, 124 + (i % 5) * 8.6, 138 - Math.floor(i / 5) * 14, 8, 12, "#FFFBEB", WG.tali, { rx: 2, tebal: 1.4, z: 2 }), garis(`ib${i}-t`, 124 + (i % 5) * 8.6, 144 - Math.floor(i / 5) * 14, 8, 0, WG.tali, 1.2, { z: 3 })])),
      tambah("sepuluh@2", teks("n10", 150, 70, "10 ikat", 12, W.ungu)),
      tambah("Sepuluh", teks("n11", 150, 92, "10 puluhan", 12, W.merah)),
      tambah("seratus", teks("n12", 232, 140, "= 100 botol", 13, W.hijau), emo("ok", 262, 112, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 5. Ikat penuh dan botol lepas ------------------------------ */
const SUARA_I1 = "Tim Kuning punya tiga ikat penuh dan delapan botol lepas.";
const SUARA_I2 = "Itu tiga puluhan dan delapan satuan. Tiga puluh tambah delapan sama dengan tiga puluh delapan.";
const SUARA_I3 = "Jadi tim Kuning mengumpulkan tiga puluh delapan botol.";

export const ADEGAN_IKAT_LEPAS: AdeganStory = {
  id: "ikat-lepas",
  judul: "Tiga ikat dan delapan botol lepas",
  sumber: "Materi: puluhan dan satuan, tiga puluh delapan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Tim Kuning"), ...papanTim("pk", 14, 30, "Kuning", "#FDE047")),
      tambah("tiga", ...[0, 1, 2].flatMap((i) => ikat(`ik${i}`, 20 + i * 44, 70, "botol")), teks("e1", 78, 118, "3 ikat", 10, W.ungu)),
      tambah("delapan", ...lepas("lp", 182, 64, 8), teks("e2", 207, 118, "8 lepas", 10, W.ungu)),
    ),
    k(
      SUARA_I2,
      tambah("puluhan", teks("e3", 78, 134, "3 puluhan", 10, W.merah)),
      tambah("satuan.", teks("e4", 207, 134, "8 satuan", 10, W.merah)),
      tambah("tambah", teks("e5", 150, 166, "30 + 8 = 38", 15, W.hijau)),
    ),
    k(
      SUARA_I3,
      hapus(0, "e1", "e2", "e3", "e4", "e5"),
      tambah("mengumpulkan", ...kartu("kb", 78, 124, 144, 44, W.hijauMuda, ["38 botol"], 18)),
      tambah("botol.", emo("ok", 262, 150, E.benar, 26)),
    ),
  ],
};

/* ------------------------------ 6. Dua cara menulis ------------------------------ */
const SUARA_D1 = "Nia menggambar dua cara menulis bilangan. Cara pertama memakai papan puluhan dan satuan.";
const SUARA_D2 = "Tiga puluhan dan delapan satuan ditulis angka tiga di puluhan dan angka delapan di satuan.";
const SUARA_D3 = "Cara kedua memakai pasangan bilangan: tiga puluh delapan terdiri dari tiga puluh dan delapan.";

export const ADEGAN_DUA_CARA: AdeganStory = {
  id: "dua-cara",
  judul: "Dua cara menulis bilangan",
  sumber: "Materi: papan puluhan dan satuan, pasangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dua Cara Menulis"), ...tokoh("ni", 36, 184, "Nia")),
      tambah("dua", teks("n2", 150, 48, "2 cara", 11, W.ungu), kotak("pt", 76, 56, 210, 118, "#FFFFFF", W.coklat, { rx: 6, tebal: 3 })),
      tambah("papan", kotak("cp", 92, 66, 84, 98, W.krem, W.biru, { rx: 6 }), kotak("cs", 188, 66, 84, 98, W.hijauMuda, W.biru, { rx: 6 }), teks("hp", 134, 84, "Puluhan", 11, W.merah), teks("hs", 230, 84, "Satuan", 11, W.hijau)),
    ),
    k(
      SUARA_D2,
      tambah("angka", teks("dp", 134, 140, "3", 40, W.biru)),
      tambah("delapan@2", teks("ds", 230, 140, "8", 40, W.biru)),
      tambah("satuan@2", emo("ok", 262, 48, E.benar, 20)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Pasangan Bilangan"), ...tokoh("ni", 36, 184, "Nia")),
      tambah("pasangan", ...kartu("b38", 118, 36, 64, 36, W.krem, ["38"], 22)),
      tambah("terdiri", garis("g1", 140, 74, -38, 36, W.biru, 2.2), garis("g2", 160, 74, 38, 36, W.biru, 2.2)),
      tambah("puluh@2", ...kartu("b30", 66, 112, 64, 36, W.pink, ["30"], 20)),
      tambah("delapan@2", ...kartu("b08", 170, 112, 64, 36, W.langit, ["8"], 20)),
    ),
  ],
};
