import type { AdeganStory } from "./logika-story";
import { E, W, WK, baris, deret, emo, gs, judul, kalimat, kartu, kotak, lantai, panah, rak, teks, tokoh, type Titik } from "./k2b2C-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2C-bantu";
import { WARNA_METODE, kepala } from "./k2b2C-luar-1";

/* Video metode global Sub-Bab C "Pesanan Besar Pak Budi": Act It Out (Peragakan Cerita), Work Backwards (Berpikir Mundur), dan ringkasan. */

const PASIR = "\u{23F3}";
const LAMPU = "\u{1F4A1}";
const TOPENG = "\u{1F3AD}";
const PANAH_KE = "→";

/** Ubah letak satu rautan (kotak dan lubangnya) ke titik p, sekaligus menegaskannya (op 1). */
const geserRautan = (id: string, p: Titik) => [
  { id, x: Number((p.x - 6).toFixed(1)), y: Number((p.y - 5).toFixed(1)), op: 1 },
  { id: `${id}-x`, x: Number((p.x + 1).toFixed(1)), y: p.y, op: 1 },
];
/** Ubah letak satu penghapus ke titik p, sekaligus menegaskannya (op 1). */
const geserHapus = (id: string, p: Titik) => ({ id, x: Number((p.x - 6).toFixed(1)), y: Number((p.y - 4).toFixed(1)), op: 1 });

/* ------------------------------ 1. Act It Out: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Act It Out, atau Peragakan Cerita.";
const SUARA_P2 = "Kita memerankan cerita dengan benda atau gerakan, lalu melihat apa yang terjadi.";
const SUARA_P3 = "Benda ditambahkan atau diambil sesuai cerita.";
const SUARA_P4 = "Cara ini membuat cerita yang membingungkan jadi terlihat jelas.";

export const ADEGAN_LUAR_PERAGAKAN: AdeganStory = {
  id: "luar-peragakan",
  judul: "Act It Out: peragakan cerita",
  sumber: "Metode global: Act It Out",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(1), lantai("lt", 150)),
      tambah(idx(SUARA_P1, "Act"), ...kartu("ac", 20, 62, 120, 30, W.krem, ["Act It Out"], 12)),
      tambah(idx(SUARA_P1, "Peragakan"), ...kartu("pc", 160, 62, 120, 30, W.hijauMuda, ["Peragakan Cerita"], 11)),
      tambah(idx(SUARA_P1, "Cerita"), emo("tp", 150, 132, E.tepuk, 26)),
    ),
    k(
      SUARA_P2,
      hapus(0, "ac-k", "ac-t0", "pc-k", "pc-t0", "tp"),
      tambah(idx(SUARA_P2, "memerankan"), ...tokoh("ch", 50, 172, "chacha"), emo("tt", 50, 140, TOPENG, 22)),
      tambah(idx(SUARA_P2, "benda"), kotak("mj", 100, 112, 140, 8, WK.kayu, WK.kayuTua, { rx: 2, tebal: 1.6 }), ...[114, 140, 166].flatMap((x, i) => emo(`ps${i}`, x, 106, E.pensil, 16))),
      tambah(idx(SUARA_P2, "gerakan"), emo("tg", 262, 126, E.tangan, 26), panah("pg", 250, 112, 222, 104, W.hijau)),
      tambah(idx(SUARA_P2, "melihat"), emo("kc", 150, 80, E.kaca, 22)),
      tambah(idx(SUARA_P2, "terjadi"), emo("bt", 260, 80, E.bintang, 20)),
    ),
    k(
      SUARA_P3,
      hapus(0, "tg", "pg", "kc", "bt"),
      tambah(idx(SUARA_P3, "ditambahkan"), emo("ps3", 192, 106, E.pensil, 16), emo("ps4", 218, 106, E.pensil, 16), panah("pi", 232, 86, 206, 98, W.hijau)),
      tambah(idx(SUARA_P3, "diambil"), panah("pu", 114, 94, 114, 62, W.merah)),
      hapus(idx(SUARA_P3, "diambil"), "ps0"),
      tambah(idx(SUARA_P3, "cerita"), ...kartu("sc", 90, 152, 130, 20, W.krem, ["sesuai cerita"], 8.6)),
    ),
    k(
      SUARA_P4,
      hapus(0, "sc-k", "sc-t0", "pi", "pu"),
      tambah(idx(SUARA_P4, "membingungkan"), emo("mk", 70, 60, E.mikir, 24)),
      hapus(idx(SUARA_P4, "jadi"), "mk"),
      tambah(idx(SUARA_P4, "jadi"), emo("lm", 70, 60, LAMPU, 24)),
      tambah(idx(SUARA_P4, "jelas"), emo("ok", 240, 60, E.centang, 24)),
    ),
  ],
};

/* ------------------------------ 2. Act It Out: terapan ------------------------------ */
const SUARA_Q1 = "Chacha memerankan cerita. Ada tujuh penghapus di meja, lalu datang enam lagi.";
const SUARA_Q2 = "Ia menggeser enam penghapus ke meja, lalu menghitung semuanya, tiga belas.";
const SUARA_Q3 = "Cocok kalau bilangannya kecil dan bendanya mudah dipegang.";
const SUARA_Q4 = "Kurang cocok kalau bilangannya besar, karena memerankannya makan waktu.";

const BARIS_MEJA = baris(13, 36, 104, 18);
const TERBANG = baris(6, 216, 70, 14);

export const ADEGAN_LUAR_PERAGAKAN_TERAPAN: AdeganStory = {
  id: "luar-peragakan-terapan",
  judul: "Act It Out: terapan",
  sumber: "Metode global: Act It Out, terapan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1), lantai("lt", 150), kotak("mj", 20, 112, 260, 8, WK.kayu, WK.kayuTua, { rx: 2, tebal: 1.6 }), gs("mj-k1", 30, 120, 30, 142, WK.kayuTua, 3), gs("mj-k2", 270, 120, 270, 142, WK.kayuTua, 3)),
      tambah(idx(SUARA_Q1, "Chacha"), ...tokoh("ch", 36, 176, "chacha")),
      tambah(idx(SUARA_Q1, "tujuh"), ...deret("hapus", "hp", BARIS_MEJA.slice(0, 7)), teks("a7", 90, 86, "7 penghapus", 9)),
      tambah(idx(SUARA_Q1, "datang"), ...deret("hapus", "gh", TERBANG, 16, { op: 0.5 })),
      tambah(idx(SUARA_Q1, "enam"), teks("a6", 252, 56, "6 lagi", 9.6, W.merah)),
    ),
    k(
      SUARA_Q2,
      hapus(0, "a7", "a6"),
      ubah(idx(SUARA_Q2, "menggeser"), ...TERBANG.map((_, j) => geserHapus(`gh${j}`, BARIS_MEJA[7 + j]))),
      tambah(idx(SUARA_Q2, "menghitung"), teks("tt", 150, 76, "7 + 6", 16)),
      ubah(idx(SUARA_Q2, "belas"), { id: "tt", isi: "7 + 6 = 13" }),
    ),
    k(
      SUARA_Q3,
      tambah(idx(SUARA_Q3, "Cocok"), ...kartu("cc", 62, 150, 220, 22, W.hijauMuda, ["cocok: bilangan kecil, benda mudah dipegang"], 8.4)),
      tambah(idx(SUARA_Q3, "bilangannya"), emo("ck", 282, 136, E.centang, 20)),
      sorotkan(idx(SUARA_Q3, "mudah"), "mj"),
    ),
    k(
      SUARA_Q4,
      hapus(0, "cc-k", "cc-t0", "ck"),
      tambah(idx(SUARA_Q4, "Kurang"), ...kartu("kc", 62, 150, 220, 22, W.merahMuda, ["kurang cocok: bilangan besar"], 9)),
      tambah(idx(SUARA_Q4, "memerankannya"), emo("ps", 262, 128, PASIR, 22)),
      tambah(idx(SUARA_Q4, "makan"), teks("mw", 250, 188, "makan waktu", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Work Backwards: konsep ------------------------------ */
const SUARA_M1 = "Cara ketiga, Work Backwards, atau Berpikir Mundur.";
const SUARA_M2 = "Kita mulai dari hasil akhir, lalu membalik langkah cerita satu per satu.";
const SUARA_M3 = "Yang tadi ditambah, kita kurangi. Yang tadi dikurangi, kita tambah.";
const SUARA_M4 = "Hasil akhirnya adalah bilangan awal yang dicari.";

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Work Backwards: berpikir mundur",
  sumber: "Metode global: Work Backwards",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, ...kepala(2), lantai("lt", 160)),
      tambah(idx(SUARA_M1, "Work"), ...kartu("wb", 20, 62, 120, 30, W.pink, ["Work Backwards"], 11)),
      tambah(idx(SUARA_M1, "Berpikir"), ...kartu("bm", 160, 62, 120, 30, W.hijauMuda, ["Berpikir Mundur"], 11)),
      tambah(idx(SUARA_M1, "Mundur"), panah("pm", 250, 126, 50, 126, W.hijau), teks("mu", 150, 148, "mundur", 11, W.hijau)),
    ),
    k(
      SUARA_M2,
      hapus(0, "wb-k", "wb-t0", "bm-k", "bm-t0", "pm", "mu"),
      tambah(idx(SUARA_M2, "mulai"), ...kartu("ak", 204, 70, 80, 32, W.hijauMuda, ["hasil akhir"], 9.6)),
      tambah(idx(SUARA_M2, "lalu"), ...kartu("aw", 16, 70, 80, 32, W.krem, ["awal ?"], 10), panah("pf", 100, 80, 196, 80, W.abu)),
      tambah(idx(SUARA_M2, "membalik"), panah("pb", 196, 102, 104, 102, W.hijau)),
      tambah(idx(SUARA_M2, "satu"), teks("sp", 150, 140, "1 per 1", 12, W.ungu)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, ...kepala(2), lantai("lt", 160)),
      tambah(idx(SUARA_M3, "ditambah"), ...kartu("t1", 20, 62, 260, 28, W.hijauMuda, [`tadi ditambah ${PANAH_KE} kurangi`], 10)),
      sorotkan(idx(SUARA_M3, "kurangi"), "t1-k"),
      tambah(idx(SUARA_M3, "dikurangi"), ...kartu("t2", 20, 104, 260, 28, W.pink, [`tadi dikurangi ${PANAH_KE} tambah`], 10)),
      sorotkan(idx(SUARA_M3, "tambah"), "t2-k"),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, ...kepala(2), lantai("lt", 160)),
      tambah(idx(SUARA_M4, "Hasil"), ...kartu("hk", 20, 70, 110, 30, W.hijauMuda, ["hasil akhir"], 10)),
      tambah(idx(SUARA_M4, "bilangan"), panah("pb", 134, 86, 166, 86, W.hijau), ...kartu("ba", 170, 70, 110, 30, W.krem, ["bilangan awal"], 10)),
      sorotkan(idx(SUARA_M4, "awal"), "ba-k"),
      tambah(idx(SUARA_M4, "dicari"), emo("kc", 150, 136, E.kaca, 24)),
    ),
  ],
};

/* ------------------------------ 4. Work Backwards: terapan ------------------------------ */
const SUARA_R1 = "Dika menemukan rak yang tinggal dua belas rautan setelah terjual lima.";
const SUARA_R2 = "Balik langkahnya: dua belas ditambah lima sama dengan tujuh belas.";
const SUARA_R3 = "Jadi mula-mula ada tujuh belas rautan.";
const SUARA_R4 = "Cocok kalau yang ditanya bilangan awal. Kurang cocok kalau yang ditanya hasil akhirnya.";

const ISI_RAK = baris(12, 32, 90, 12.6);
const LAMPAU = baris(5, 214, 90, 15);
const KEMBALI = baris(5, 32, 112, 12.6);
const KR = kalimat("kr", 150, 150, ["12", "+", "5", "=", "17"], 16, 28);

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Work Backwards: terapan",
  sumber: "Metode global: Work Backwards, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, ...kepala(2), lantai("lt", 160)),
      tambah(idx(SUARA_R1, "Dika"), ...tokoh("dk", 36, 176, "dika")),
      tambah(idx(SUARA_R1, "rak"), ...rak("rk", 20, 62, 160, 64)),
      tambah(idx(SUARA_R1, "tinggal"), ...deret("rautan", "rt", ISI_RAK, 14), teks("tg-n", 100, 58, "tinggal 12", 8.4, W.coklat)),
      tambah(idx(SUARA_R1, "terjual"), ...deret("rautan", "gh", LAMPAU, 14, { op: 0.4 }), teks("tj-n", 244, 74, "terjual 5", 8.4, W.merah)),
    ),
    k(
      SUARA_R2,
      tambah(idx(SUARA_R2, "Balik"), panah("pb", 208, 60, 184, 60, W.hijau)),
      ubah(idx(SUARA_R2, "Balik"), ...KEMBALI.flatMap((p, i) => geserRautan(`gh${i}`, p))),
      tambah(idx(SUARA_R2, "belas"), KR[0]),
      tambah(idx(SUARA_R2, "ditambah"), KR[1]),
      tambah(idx(SUARA_R2, "lima"), KR[2]),
      tambah(idx(SUARA_R2, "sama"), KR[3]),
      tambah(idx(SUARA_R2, "belas", 2), KR[4]),
    ),
    k(
      SUARA_R3,
      tambah(idx(SUARA_R3, "mula-mula"), teks("aw", 150, 178, "mula-mula = 17", 12, W.hijau)),
      sorotkan(idx(SUARA_R3, "ada"), "rk"),
      tambah(idx(SUARA_R3, "rautan"), emo("ok", 250, 182, E.centang, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, ...kepala(2), lantai("lt", 160)),
      tambah(idx(SUARA_R4, "Cocok"), ...kartu("c1", 30, 56, 240, 28, W.hijauMuda, ["cocok: cari bilangan awal"], 10)),
      tambah(idx(SUARA_R4, "bilangan"), emo("k1", 286, 72, E.centang, 20)),
      tambah(idx(SUARA_R4, "Kurang"), ...kartu("c2", 30, 100, 240, 28, W.merahMuda, ["kurang cocok: cari hasil akhir"], 10)),
      tambah(idx(SUARA_R4, "hasil"), emo("k2", 286, 116, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan ------------------------------ */
const SUARA_S1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung ceritanya.";
const SUARA_S2 = "Ada bagian dan utuh, pakai Bagian dan Utuh. Bendanya mudah dipegang, pakai Peragakan Cerita. Yang dicari bilangan awal, pakai Berpikir Mundur.";
const SUARA_S3 = "Apa pun caranya, baca ceritanya pelan-pelan dan periksa hasilnya.";
const SUARA_S4 = "Menurutmu, kalau tinggal sepuluh penghapus setelah terjual tiga, cara mana yang paling pas?";

const NAMA = ["Part-Part-Whole", "Act It Out", "Work Backwards"];
const NAMA_ID = ["Bagian dan Utuh", "Peragakan Cerita", "Berpikir Mundur"];
const PILIHAN = [
  { a: "ada bagian dan utuh", b: "pakai Bagian dan Utuh" },
  { a: "benda mudah dipegang", b: "pakai Peragakan Cerita" },
  { a: "dicari bilangan awal", b: "pakai Berpikir Mundur" },
];
const YQ = [36, 86, 136];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("3 cara, pilih yang pas"), lantai("lt", 180)),
      tambah(idx(SUARA_S1, "Kita"), ...kartu("r0", 14, 34, 272, 32, WARNA_METODE[0], [`1. ${NAMA[0]} · ${NAMA_ID[0]}`], 8.8)),
      tambah(idx(SUARA_S1, "tiga"), ...kartu("r1", 14, 80, 272, 32, WARNA_METODE[1], [`2. ${NAMA[1]} · ${NAMA_ID[1]}`], 8.8)),
      tambah(idx(SUARA_S1, "Mana"), ...kartu("r2", 14, 126, 272, 32, WARNA_METODE[2], [`3. ${NAMA[2]} · ${NAMA_ID[2]}`], 8.8)),
      tambah(idx(SUARA_S1, "tergantung"), emo("kc", 150, 178, E.mikir, 20)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Pilih cara menurut cerita")),
      ...PILIHAN.flatMap((p, i) => {
        const y = YQ[i];
        const kataA = ["Ada", "Bendanya", "Yang"][i];
        return [
          tambah(idx(SUARA_S2, kataA), ...kartu(`qa${i}`, 8, y, 136, 34, WARNA_METODE[i], [p.a], 8.4)),
          tambah(idx(SUARA_S2, "pakai", i + 1), panah(`qp${i}`, 147, y + 17, 160, y + 17, W.biru, { tebal: 2 }), ...kartu(`qb${i}`, 164, y, 128, 34, W.putih, [p.b], 8.4)),
        ];
      }),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Apa pun caranya")),
      tambah(idx(SUARA_S3, "baca"), ...kartu("bc", 30, 50, 240, 30, W.krem, ["baca ceritanya pelan-pelan"], 10)),
      tambah(idx(SUARA_S3, "periksa"), ...kartu("pr", 30, 100, 240, 30, W.hijauMuda, ["periksa hasilnya"], 10)),
      tambah(idx(SUARA_S3, "hasilnya"), emo("kc", 150, 166, E.kaca, 24)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Cara mana yang pas?"), lantai("lt", 170)),
      tambah(idx(SUARA_S4, "sepuluh"), ...deret("hapus", "hp", baris(10, 22, 92, 17)), teks("tg", 105, 70, "tinggal 10", 9.6)),
      tambah(idx(SUARA_S4, "terjual"), ...deret("hapus", "gh", baris(3, 214, 92, 15), 16, { op: 0.4 }), teks("tj", 230, 70, "terjual 3", 9.6, W.merah)),
      tambah(idx(SUARA_S4, "cara"), ...[0, 1, 2].flatMap((i) => kartu(`pc${i}`, 6 + 98 * i, 140, 92, 22, WARNA_METODE[i], [NAMA_ID[i]], 8.4))),
      tambah(idx(SUARA_S4, "pas"), emo("tn", 150, 124, E.tanya, 22)),
    ),
  ],
};
