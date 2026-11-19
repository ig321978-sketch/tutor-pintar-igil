import type { AdeganStory, Obj } from "./logika-story";
import { E, W, angkaTempat, emo, garis, judul, kartu, kotak, lantai, panah, papanTempat, teks, toples, tokoh } from "./k3b1A-gambar";
import { bersih, k, tambah, ubah } from "./k3b1A-bantu";

/*
 * Cerita orisinal IGIL "Toples Permen Pak Joko" (Kelas 3 Bab 1 Sub-Bab A, bilangan tiga angka), awal cerita Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1a.md. Bagian ini: menulis dari kata, daftar stok, dan penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Tulis dari kata ------------------------------ */
const SUARA_T1 = "Sekarang Salsa menulis dari kata. Empat ratus lima, katanya.";
const SUARA_T2 = "Empat di ratusan, tidak ada puluhan, lima di satuan. Ia menulis empat ratus lima, bukan empat puluh lima.";
const SUARA_T3 = "Kalau nol terlupa, bilangannya menjadi jauh lebih kecil.";

export const ADEGAN_TULIS_DARI_KATA: AdeganStory = {
  id: "tulis-dari-kata",
  judul: "Menulis dari kata",
  sumber: "Materi: menulis dari kata bilangan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Menulis dari Kata"), ...lantai("lt", 150)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("menulis", emo("ps", 70, 160, E.pensil, 16)),
      tambah("Empat", ...kartu("kw", 90, 50, 110, 30, W.krem, ["empat ratus lima"], 9)),
      tambah("katanya.", kotak("kc", 200, 62, 84, 60, W.putih, W.biru, { rx: 3, z: 1 }), teks("n405", 242, 102, "405", 24, W.merah, { z: 2 })),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Tiga Tempat: Ratusan, Puluhan, Satuan"), ...papanTempat("tp", 30, 40, 180, 80)),
      tambah("Empat", angkaTempat("tp", 30, 180, 106, 0, "4", 26)),
      tambah("puluhan,", angkaTempat("tp", 30, 180, 106, 1, "0", 26)),
      tambah("lima", angkaTempat("tp", 30, 180, 106, 2, "5", 26)),
      tambah("menulis", teks("n405", 258, 84, "405", 22, W.hijauTua)),
      tambah("bukan", teks("n45", 258, 120, "45", 18, W.merah), garis("cr", 242, 128, 32, -16, W.merah, 2.6, { z: 5 })),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Nol Terlupa")),
      tambah("Kalau", kotak("br1", 70, 50, 50, 100, W.hijau, W.hijauTua, { rx: 3 }), teks("l1", 95, 170, "405", 14, W.hijauTua)),
      tambah("terlupa,", kotak("br2", 180, 138, 50, 12, W.merah, "#7F1D1D", { rx: 3 }), teks("l2", 205, 170, "45", 14, W.merah), emo("xs", 205, 126, E.salah, 16)),
      tambah("jauh", panah("pn", 124, 60, 52, 66, W.merah, 3)),
      tambah("kecil.", teks("jl", 150, 40, "jauh lebih kecil", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Daftar stok ------------------------------ */
const SUARA_D1 = "Bima menghitung permen cokelat: sembilan toples, nol bungkus, nol butir. Bilangannya sembilan ratus.";
const SUARA_D2 = "Daftar stok pun selesai: enam ratus tiga puluh empat, tujuh ratus tiga, empat ratus lima, dan sembilan ratus, semuanya dibaca dari kiri.";
const SUARA_D3 = "Pak Joko tersenyum karena daftarnya jelas dan tidak ada yang tertukar.";

const COKELAT = "#C08457";
const DX = 84;
const DW = 200;
const DY = 30;
const DH = 106;
const toplesCokelat = (n: number): Obj[] => Array.from({ length: n }, (_, i) => toples(`tc${i}`, DX + 8 + (i % 3) * 14, DY + 22 + Math.floor(i / 3) * 24, 13, 17, 0, COKELAT)).flat();

/** Baris daftar stok: nama permen dan bilangannya, tinggi y. */
const baris = (id: string, y: number, nama: string, n: string): Obj[] => [teks(`${id}n`, 100, y, nama, 10, W.biru), teks(`${id}b`, 188, y, n, 16, W.merah)];

export const ADEGAN_DAFTAR_STOK: AdeganStory = {
  id: "daftar-stok",
  judul: "Daftar stok selesai",
  sumber: "Materi: daftar stok empat bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Permen Cokelat"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("cokelat:", ...papanTempat("dp", DX, DY, DW, DH)),
      tambah("sembilan", ...toplesCokelat(9), angkaTempat("dp", DX, DW, DY + DH - 6, 0, "9", 18)),
      tambah("nol", angkaTempat("dp", DX, DW, DY + DH - 6, 1, "0", 18)),
      tambah("nol@2", angkaTempat("dp", DX, DW, DY + DH - 6, 2, "0", 18)),
      tambah("Bilangannya", teks("n900", 232, 168, "900", 20, W.merah)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Daftar Stok Toko")),
      tambah("Daftar", kotak("kt", 40, 28, 220, 164, W.putih, W.biru, { rx: 4, z: -1 }), teks("jd", 150, 46, "DAFTAR STOK", 10, W.merah)),
      tambah("enam", ...baris("d0", 74, "jeruk", "634")),
      tambah("tujuh", ...baris("d1", 106, "mint", "703")),
      tambah("empat@2", ...baris("d2", 138, "stroberi", "405")),
      tambah("sembilan", ...baris("d3", 170, "cokelat", "900")),
      tambah("kiri.", panah("pk", 52, 188, 40, 0, W.merah, 2.6)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Daftar yang Jelas"), ...lantai("lt", 150)),
      tambah("Pak", ...tokoh("pj", 60, 184, "Pak Joko")),
      ubah("tersenyum", { id: "pj", isi: E.senyum }),
      tambah("daftarnya", kotak("kt", 150, 40, 110, 100, W.putih, W.biru, { rx: 3 }), ...[0, 1, 2, 3].map((i) => garis(`ln${i}`, 160, 62 + i * 20, 70, 0, W.abu, 2))),
      tambah("jelas", ...[0, 1, 2, 3].map((i) => emo(`ck${i}`, 246, 66 + i * 20, E.benar, 12))),
      tambah("tertukar.", teks("tk", 205, 150, "tidak tertukar", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Raka menepati taruhannya dan menyapu gudang sampai bersih sambil menggerutu lucu.";
const SUARA_N2 = "Besok Bu Wati dari percetakan akan datang membawa kartu angka untuk label harga.";
const SUARA_N3 = "Menurutmu, bilangan lima ratus tiga puluh dan lima ratus tiga sama atau berbeda? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Kak Dewi!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup dan jembatan ke kartu harga",
  sumber: "Materi: penutup dan jembatan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Raka Menyapu Gudang"), ...lantai("lt", 150)),
      tambah("Raka", ...tokoh("rk", 100, 184, "Raka")),
      tambah("menyapu", emo("sp", 140, 168, E.sapu, 30), emo("db1", 176, 164, E.debu, 18), emo("db2", 196, 150, E.debu, 14)),
      tambah("bersih", emo("ok", 240, 120, E.benar, 24), teks("br", 240, 148, "bersih", 10, W.hijauTua)),
      tambah("menggerutu", emo("gr", 100, 118, E.gerutu, 20)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Besok: Bu Wati"), ...lantai("lt", 150), kotak("pt", 190, 36, 90, 114, "#E7C58F", W.coklat, { rx: 3, z: 0 }), garis("pg", 235, 36, 0, 114, W.coklat, 1.6, { z: 1 })),
      tambah("Wati", ...tokoh("bw", 212, 130, "Bu Wati")),
      tambah("percetakan", teks("pc", 235, 28, "PERCETAKAN", 8, W.ungu)),
      tambah("membawa", kotak("kb", 244, 108, 30, 22, "#D6A15E", W.coklat, { rx: 2, z: 3 })),
      tambah("angka", ...[0, 1, 2].map((i) => [kotak(`ka${i}`, 40 + i * 44, 76, 34, 44, W.krem, W.biru, { rx: 4 }), teks(`kn${i}`, 57 + i * 44, 106, ["5", "3", "0"][i], 20, [W.rts, W.pls, W.sat][i])]).flat()),
      tambah("harga.", kotak("lh", 80, 140, 56, 20, W.merahMuda, W.merah, { rx: 5 }), teks("lt1", 108, 154, "HARGA", 9, W.merah)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Sama atau Berbeda?")),
      tambah("bilangan", ...kartu("c1", 36, 36, 80, 44, W.krem, ["530"], 20)),
      tambah("dan", ...kartu("c2", 184, 36, 80, 44, W.krem, ["503"], 20)),
      tambah("berbeda?", emo("tq", 150, 70, E.tanya, 28)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka"), emo("l1", 30, 124, E.lambai, 14)),
      tambah("Salsa,", ...tokoh("sl", 90, 184, "Salsa"), emo("l2", 90, 124, E.lambai, 14)),
      tambah("Bima,", ...tokoh("bm", 150, 184, "Bima"), emo("l3", 150, 124, E.lambai, 14)),
      tambah("Joko,", ...tokoh("pj", 210, 184, "Pak Joko"), emo("l4", 210, 124, E.lambai, 14)),
      tambah("Dewi!", ...tokoh("dw", 268, 184, "Kak Dewi"), emo("l5", 268, 124, E.lambai, 14)),
    ),
  ],
};
