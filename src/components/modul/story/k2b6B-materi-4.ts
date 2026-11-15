import type { AdeganStory } from "./logika-story";
import { W, barisLama, judul, kartu } from "./k2b6B-gambar";
import { idx, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/* ------------------------------ 13. Lebih lama atau lebih sebentar ------------------------------ */
const SUARA_L1 = "Sekarang kita bandingkan dua kegiatan Kira. Kegiatan mana yang lebih lama, olahraga atau mandi?";
const SUARA_L2 = "Kira berolahraga selama satu jam. Kira mandi selama lima belas menit.";
const SUARA_L3 = "Lihat, batang olahraga lebih panjang daripada batang mandi.";
const SUARA_L4 = "Jadi olahraga lebih lama dari mandi.";
const SUARA_L5 = "Sebaliknya, mandi lebih sebentar dari olahraga.";

export const ADEGAN_BANDING: AdeganStory = {
  id: "banding",
  judul: "Lebih lama dan lebih sebentar",
  sumber: "Materi: lebih lama, lebih sebentar",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Lebih lama atau sebentar?")), tambah(idx(SUARA_L1, "lebih"), ...kartu("zz", 40, 80, 220, 34, W.krem, ["olahraga atau mandi"], 12))),
    k(
      SUARA_L2,
      { at: 0, hapus: ["zz-k", "zz-t0"] },
      tambah(idx(SUARA_L2, "berolahraga"), barisLama(1, 70, "Olahraga", 60, W.hijauMuda)),
      tambah(idx(SUARA_L2, "mandi"), barisLama(2, 128, "Mandi", 15, W.langit)),
    ),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "olahraga"), "lm1-b"), sorotkan(idx(SUARA_L3, "mandi"), "lm2-b")),
    k(SUARA_L4, ubah(0, { id: "lm2-b", sorot: false }), ubah(0, { id: "lm1-b", sorot: true }), tambah(idx(SUARA_L4, "lebih"), ...kartu("hs", 190, 70, 100, 24, W.emas, ["lebih lama"], 11))),
    k(SUARA_L5, ubah(0, { id: "lm1-b", sorot: false }, { id: "hs-t0", isi: "lebih sebentar" }, { id: "hs-k", y: 128 }, { id: "hs-t0", y: 143 }), ubah(0, { id: "lm2-b", sorot: true })),
  ],
};

/* ------------------------------ 14. Urutan lama beberapa kegiatan ------------------------------ */
const SUARA_M1 = "Ada banyak kegiatan lain yang lamanya berbeda-beda. Kita urutkan dari yang paling sebentar.";
const SUARA_M2 = "Cuci tangan Halim hanya sekitar satu menit. Mandi kira-kira lima belas menit.";
const SUARA_M3 = "Olahraga satu jam. Tidur malam sekitar delapan jam.";
const SUARA_M4 = "Cuci tangan paling sebentar, dan tidur malam paling lama.";
const SUARA_M5 = "Menit untuk kegiatan yang sebentar, jam untuk kegiatan yang lama.";
const BARIS = [
  { nama: "Cuci tangan", menit: 1 },
  { nama: "Mandi", menit: 15 },
  { nama: "Olahraga", menit: 60 },
  { nama: "Tidur malam", menit: 480 },
];

export const ADEGAN_LAMA_BANYAK: AdeganStory = {
  id: "lama-banyak",
  judul: "Urutan lama beberapa kegiatan",
  sumber: "Materi: lama beberapa kegiatan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Dari sebentar ke lama"))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Cuci"), barisLama(1, 44, BARIS[0].nama, BARIS[0].menit, W.hijauMuda, false)), tambah(idx(SUARA_M2, "Mandi"), barisLama(2, 82, BARIS[1].nama, BARIS[1].menit, W.hijauMuda, false))),
    k(SUARA_M3, tambah(idx(SUARA_M3, "Olahraga"), barisLama(3, 120, BARIS[2].nama, BARIS[2].menit, W.hijauMuda, false)), tambah(idx(SUARA_M3, "Tidur"), barisLama(4, 158, BARIS[3].nama, BARIS[3].menit, W.hijauMuda, false))),
    k(SUARA_M4, sorotkan(idx(SUARA_M4, "sebentar,"), "lm1-nm", "lm1-t"), sorotkan(idx(SUARA_M4, "lama."), "lm4-nm", "lm4-t")),
    k(SUARA_M5, ubah(0, { id: "lm1-nm", sorot: false }, { id: "lm1-t", sorot: false }, { id: "lm4-nm", sorot: false }, { id: "lm4-t", sorot: false }), sorotkan(idx(SUARA_M5, "Menit"), "lm1-t", "lm2-t"), sorotkan(idx(SUARA_M5, "jam"), "lm3-t", "lm4-t")),
  ],
};
