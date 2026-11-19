import type { AdeganStory } from "./logika-story";
import { E, W, bulat, dinding, emo, garis, judul, kartu, kotak, panah, tabelSeratus, teks, tokoh, warnaiSel } from "./k2b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/*
 * Cerita orisinal IGIL "Pengumuman Bu Lia" (Kelas 2 Bab 7 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b7b.md. Bagian ini: pembuka (tiga kartu lipat pencatat lama), Hundred Chart (Tabel Seratus), dan terapannya.
 */

export const NAMA_METODE = ["Hundred Chart", "Benchmark Numbers", "Card Sort"] as const;
export const NAMA_METODE_ID = ["Tabel Seratus", "Bilangan Patokan", "Urut Kartu"] as const;

/** Kisi kecil `${id}` (baris x kolom sel `${id}{i}`) sebagai ikon tabel, pojok kiri-atas (x, y). */
const kisiKecil = (id: string, x: number, y: number, baris: number, kolom: number, w = 16, h = 11, warna: string = W.putih) =>
  Array.from({ length: baris * kolom }, (_, i) => kotak(`${id}${i}`, x + (i % kolom) * w, y + Math.floor(i / kolom) * h, w, h, warna, "#94A3B8", { rx: 1, tebal: 1, z: 1 }));

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di laci papan pengumuman, Chacha menemukan tiga kartu lipat milik pencatat lama.";
const SUARA_O2 = "Bu Lia tersenyum. Itu cara pencatat membandingkan banyak barang dengan adil!";
const SUARA_O3 = "Tiga cara itu: Hundred Chart, Benchmark Numbers, dan Card Sort.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tabel Seratus, Bilangan Patokan, dan Urut Kartu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu lipat pencatat lama",
  sumber: "Metode global: pembuka",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Laci Papan Pengumuman"), ...dinding("dn")),
      tambah("laci", kotak("pu", 70, 34, 160, 70, "#FEF3C7", W.coklat, { rx: 5, tebal: 3, z: 0 }), kotak("lc", 86, 112, 128, 34, "#E7C98A", W.coklat, { rx: 4, tebal: 2, z: 1 }), bulat("lh", 150, 129, 4, W.coklat, W.biru, { z: 2 })),
      tambah("Chacha", ...tokoh("ch", 38, 168, "Chacha")),
      tambah("tiga", teks("n3", 258, 66, "3 kartu", 10, W.ungu)),
      tambah("kartu", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 100 + i * 42, 62, 38, 34, W.krem, ["kartu"], 8))),
      ubah("lama.", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      tambah("Lia", ...tokoh("bl", 262, 168, "Bu Lia")),
      tambah("tersenyum.", emo("sy", 236, 138, E.senyum, 20)),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("membandingkan", emo("bg", 40, 100, "\u{2696}", 24)),
      tambah("adil!", emo("ok", 60, 128, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Pencatat")),
      tambah("Tiga", teks("n3", 252, 44, "3 cara", 10, W.ungu), ...[0, 1, 2].map((i) => garis(`ul${i}`, 36, 78 + i * 46, 128, 0, W.ungu, 1.4))),
      tambah("Hundred", teks("m0", 100, 70, "1. Hundred Chart", 13, W.biru), emo("i0", 258, 68, "\u{1F522}", 22)),
      tambah("Benchmark", teks("m1", 100, 116, "2. Benchmark Numbers", 13, W.biru), emo("i1", 258, 114, "\u{1F6A9}", 22)),
      tambah("Card", teks("m2", 100, 162, "3. Card Sort", 13, W.biru), emo("i2", 258, 160, "\u{1F0CF}", 22)),
    ),
    k(
      SUARA_O4,
      tambah("Tabel", teks("q0", 212, 90, "Tabel Seratus", 10, W.ungu)),
      tambah("Bilangan", teks("q1", 212, 136, "Bilangan Patokan", 10, W.ungu)),
      tambah("Urut", teks("q2", 212, 182, "Urut Kartu", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Hundred Chart: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Hundred Chart, atau Tabel Seratus.";
const SUARA_C2 = "Tabel berisi bilangan satu sampai seratus, dalam sepuluh baris dan sepuluh kolom.";
const SUARA_C3 = "Geser satu kotak ke kanan, bilangan bertambah satu. Turun satu baris, bilangan bertambah sepuluh.";
const SUARA_C4 = "Makin ke bawah dan makin ke kanan, bilangannya makin besar.";

/** Pusat sel n pada tabel seratus (x, y), dengan tabel di (40, 34), sel 22 x 14. */
const px = (n: number): number => 40 + ((n - 1) % 10) * 22 + 11;
const py = (n: number): number => 34 + Math.floor((n - 1) / 10) * 14 + 7;

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Hundred Chart: Tabel Seratus",
  sumber: "Metode global: Hundred Chart (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Pertama")),
      tambah("Hundred", ...kartu("nm", 50, 38, 200, 28, W.krem, ["Hundred Chart"], 13)),
      tambah("Tabel", teks("nid", 150, 100, "Tabel Seratus", 12, W.ungu)),
      tambah("Seratus.", ...kisiKecil("ik", 118, 118, 4, 4, 16, 14), emo("ic", 150, 192, "\u{1F522}", 18)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Tabel Seratus")),
      tambah("bilangan", ...tabelSeratus("tb", 40, 34)),
      sorotkan("satu", "tbc1"),
      sorotkan("seratus,", "tbc100"),
      tambah("sepuluh", teks("br", 90, 190, "10 baris", 9, W.merah)),
      tambah("sepuluh@2", teks("kr", 210, 190, "10 kolom", 9, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "br", "kr"),
      ubah(0, { id: "tbc1", sorot: false }, { id: "tbc100", sorot: false }),
      ubah("Geser", ...warnaiSel("tb", W.emas, 23)),
      ubah("kanan,", ...warnaiSel("tb", W.hijauMuda, 24)),
      tambah("kanan,", panah("pr", px(23), py(23), 22, 0, W.merah, 2.2), teks("p1", 282, py(23) + 3, "+1", 10, W.merah)),
      ubah("Turun", ...warnaiSel("tb", W.krem, 34)),
      tambah("sepuluh.", panah("pt", px(24), py(24) + 2, 0, 11, W.hijau, 2.2), teks("p10", 282, py(34) + 3, "+10", 10, W.hijau)),
    ),
    k(
      SUARA_C4,
      hapus(0, "pr", "pt", "p1", "p10"),
      ubah(0, ...warnaiSel("tb", W.putih, 23, 24, 34)),
      tambah("bawah", panah("pv", 26, 36, 0, 132, W.ungu, 3)),
      tambah("kanan,", panah("ph", 44, 180, 212, 0, W.ungu, 3)),
      sorotkan("besar.", "tbc100"),
      tambah("besar.", emo("ok", 282, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Hundred Chart: terapan ------------------------------ */
const SUARA_T1 = "Nia mencari tiga puluh empat dan tujuh puluh dua di tabel. Tujuh puluh dua letaknya jauh lebih bawah.";
const SUARA_T2 = "Jadi tujuh puluh dua lebih besar daripada tiga puluh empat.";
const SUARA_T3 = "Cocok kalau tabel ada di dekat kita dan kita ingin melihat jaraknya.";
const SUARA_T4 = "Kurang cocok kalau tidak ada tabel, atau bilangannya lebih dari seratus.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Nia mencari bilangan di tabel",
  sumber: "Metode global: Hundred Chart (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Nia Mencari Bilangan"), ...tabelSeratus("tb", 40, 34)),
      tambah("Nia", ...tokoh("ni", 20, 66, "Nia", 26)),
      ubah("tiga", ...warnaiSel("tb", W.emas, 34)),
      sorotkan("tiga", "tbc34"),
      ubah("tujuh", ...warnaiSel("tb", W.merahMuda, 72)),
      sorotkan("tujuh", "tbc72"),
      tambah("jauh", panah("pj", px(34), py(34) + 4, px(72) - px(34), py(72) - py(34) - 8, W.merah, 2.2)),
      tambah("bawah.", teks("lb", 150, 190, "jauh lebih bawah", 9, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus(0, "lb"),
      ubah("Jadi", ...warnaiSel("tb", W.hijauMuda, 72)),
      tambah("besar", ...kartu("hs", 100, 177, 100, 21, W.hijauMuda, ["72 > 34"], 11)),
      sorotkan("tiga", "tbc34"),
      tambah("empat.", emo("ok", 282, 100, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("tabel", ...kisiKecil("mk", 84, 76, 4, 8, 16, 12)),
      ubah("tabel", ...warnaiMini("mk", W.emas, 9), ...warnaiMini("mk", W.merahMuda, 30)),
      tambah("dekat", emo("kc", 262, 100, E.kaca, 24)),
      tambah("jaraknya.", panah("pj", 110, 96, 76, 22, W.merah, 2.2), emo("ok", 150, 160, E.benar, 24), teks("jk", 150, 186, "lihat jaraknya", 10, W.merah)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("tidak", ...kisiKecil("mk", 84, 76, 4, 8, 16, 12, W.abu), emo("x1", 150, 150, E.salah, 26)),
      tambah("seratus.", teks("sr", 150, 190, "lebih dari 100?", 11, W.merah)),
    ),
  ],
};

/** Patch mewarnai sel kisi kecil `${id}{i}`. */
function warnaiMini(id: string, warna: string, ...is: number[]) {
  return is.map((i) => ({ id: `${id}${i}`, warna }));
}
