import type { AdeganStory } from "./logika-story";
import { E, W, barisTengah, deretMainan, emo, judul, kado, kartu, kotak, orang, papanRak, teks } from "./k1b1b-gambar";
import { hapus, k, pasangAksi, sorotkan, tambah, ubah } from "./k1b1b-bantu";
import { BONEKA, MOBIL, pindahKe, pusatMainan } from "./k1b1b-materi-1";

/* Lanjutan "Hadiah Nenek untuk Rak yang Lebih Sedikit": hadiah membuat rak sama banyak, lalu rak kosong (nol) yang paling sedikit. */

/** Barisan yang dijajarkan rapi dengan jarak sama supaya garis pasangan lurus. */
export const SAMA_MOBIL = barisTengah(6, 36, 76);
export const SAMA_BONEKA = barisTengah(6, 36, 150);

/* ------------------------------ 5. Hadiah masuk, sama banyak ------------------------------ */
const SUARA_S1 = "Hadiah Nenek untuk rak yang lebih sedikit, yaitu rak mobil Igil. Isinya satu mobil baru!";
const SUARA_S2 = "Mobil dan boneka dijajarkan rapi, lalu dipasangkan lagi. Satu, dua, tiga, empat, lima, enam pasang.";
const SUARA_S3 = "Tidak ada yang bersisa. Tanpa sisa artinya sama banyak. Igil dan Kaka tersenyum.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama-banyak",
  judul: "Hadiah masuk, rak sama banyak",
  sumber: "Materi: tanpa sisa berarti sama banyak",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Hadiah untuk rak Igil"), ...papanRak("pa", 14, 54, 272, "Rak Igil"), ...papanRak("pb", 14, 126, 272, "Rak Kaka")),
      tambah(0, ...deretMainan(E.mobil, "mb", MOBIL.slice(0, 5), 22), ...deretMainan(E.boneka, "bn", BONEKA, 22)),
      tambah("Hadiah", kado("kd", 278, 120, 24)),
      sorotkan("Igil.", "pa"),
      tambah("satu", emo("mb5", 278, 96, E.mobil, 22)),
      tambah("baru!", teks("br", 238, 112, "baru", 9, W.merah)),
    ),
    k(
      SUARA_S2,
      hapus(0, "kd", "br"),
      ubah(0, { id: "pa", sorot: false }),
      ubah("dijajarkan", ...pindahKe("mb", SAMA_MOBIL), ...pindahKe("bn", SAMA_BONEKA)),
      ...pasangAksi(SUARA_S2, "ps", SAMA_MOBIL.map(pusatMainan), SAMA_BONEKA.map(pusatMainan), ["satu,", "dua,", "tiga,", "empat,", "lima,", "enam"], "lagi."),
    ),
    k(
      SUARA_S3,
      sorotkan("bersisa.", "ps0", "ps1", "ps2", "ps3", "ps4", "ps5"),
      tambah("sama", ...kartu("sb", 70, 176, 160, 24, W.emas, ["6 dan 6: sama banyak"], 9.4)),
      tambah("tersenyum.", emo("s1", 30, 196, E.senyum, 20), emo("s2", 270, 196, E.senyum, 20)),
    ),
  ],
};

/* ------------------------------ 6. Rak kosong: nol paling sedikit ------------------------------ */
const SUARA_N1 = "Abang melihat rak bawah. Rak bola berisi tiga bola, rak kereta masih kosong.";
const SUARA_N2 = "Kosong artinya nol. Nol lebih sedikit dari tiga. Nol adalah yang paling sedikit.";
const SUARA_N3 = "Di dasar kotak hadiah masih ada satu kereta. Kereta masuk ke rak yang paling sedikit.";
const RAK_BOLA = { x: 18, y: 50, w: 126, h: 72 };
const RAK_KERETA = { x: 156, y: 50, w: 126, h: 72 };

export const ADEGAN_NOL: AdeganStory = {
  id: "nol-sedikit",
  judul: "Rak kosong: nol paling sedikit",
  sumber: "Materi: nol paling sedikit",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Rak bawah"), ...orang("ab", 150, 178, E.abang, "Abang")),
      tambah("bola", kotak("rbl", RAK_BOLA.x, RAK_BOLA.y, RAK_BOLA.w, RAK_BOLA.h, "#F5D7A1", W.coklat, { rx: 6, tebal: 2, z: -1 }), teks("rbl-n", 81, 44, "Rak bola", 8.6, W.coklat)),
      tambah("tiga", ...deretMainan(E.bola, "bl", barisTengah(3, 34, 98).map((p) => ({ x: p.x - 69, y: p.y })), 24)),
      tambah("kereta", kotak("rkr", RAK_KERETA.x, RAK_KERETA.y, RAK_KERETA.w, RAK_KERETA.h, "#F5D7A1", W.coklat, { rx: 6, tebal: 2, z: -1 }), teks("rkr-n", 219, 44, "Rak kereta", 8.6, W.coklat)),
      tambah("kosong.", teks("ksg", 219, 92, "kosong", 9, W.coklat)),
    ),
    k(
      SUARA_N2,
      hapus(0, "ksg"),
      tambah("nol.", teks("n0", 219, 100, "0", 30, W.merah)),
      tambah("tiga.", teks("n3", 81, 134, "3", 16, W.merah)),
      tambah("Nol@2", ...kartu("ns", 18, 142, 126, 22, W.merahMuda, ["0 lebih sedikit dari 3"], 8)),
      sorotkan("paling", "rkr"),
    ),
    k(
      SUARA_N3,
      hapus(0, "ns-k", "ns-t0", "n3"),
      ubah(0, { id: "rkr", sorot: false }),
      tambah("kotak", kado("kd", 254, 168, 26)),
      tambah("kereta.", emo("kr", 254, 142, E.kereta, 22)),
      ubah("masuk", { id: "kr", x: 219, y: 104 }, { id: "n0", isi: "1", u: 12, x: 262, y: 64 }),
      tambah("paling", ...kartu("np", 18, 142, 126, 22, W.hijauMuda, ["rak kereta: 1"], 8.4)),
    ),
  ],
};
