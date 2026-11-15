import type { AdeganStory } from "./logika-story";
import { W, WB, angka, bulat, emo, judul, kartu, panah, teks, tangga, tgTop, tgX, tokohDi } from "./k1b5b-gambar";
import { bersih, bilKe, hapus, idx, k, redamkan, sorotkan, tambah, ubah, urutBil } from "./k1b5b-bantu";

/* ------------------------------ 1. Cerita: barisan kelereng Halim ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Halim punya banyak kelereng.";
const SUARA_C2 = "Halim menyusun kelerengnya berderet. Baris merah ada sepuluh, baris kuning sebelas, dan baris biru dua belas.";
const SUARA_C3 = "Baris hijau tiga belas, baris merah muda empat belas, dan baris ungu lima belas.";
const SUARA_C4 = "Perhatikan, setiap baris lebih banyak satu kelereng daripada baris di atasnya. Bilangannya naik satu demi satu.";
const SUARA_C5 = "Halim menghitung kelerengnya satu per satu. Hitungannya terus naik, dan kita ikut menghitung sampai dua puluh.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];
const WARNA_BARIS = [WB.merah, WB.kuning, WB.biru, WB.hijau, WB.pink, WB.ungu];
const baryY = (r: number): number => 42 + r * 22;
/** Baris kelereng ke-r berisi 10 + r kelereng `km{r}x{i}` dan angkanya `kb{r}`. */
const BARIS = (r: number) => [
  ...Array.from({ length: 10 + r }, (_, i) => bulat(`km${r}x${i}`, 26 + i * 9.5, baryY(r), 4, WARNA_BARIS[r], W.biru, { tebal: 1 })),
  teks(`kb${r}`, 182, baryY(r) + 4, String(10 + r), 12, W.biru),
];
const POS_C2 = urutBil(SUARA_C2, [10, 11, 12]);
const POS_C3 = urutBil(SUARA_C3, [13, 14, 15]);

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-kelereng",
  judul: "Barisan kelereng Halim",
  sumber: "Materi: cerita barisan kelereng",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), { id: "tanah", t: "garis", x: 14, y: 142, x2: 272, y2: 0, warna: W.hijau, tebal: 3 }),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, "\u{1F989}", 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
      tambah("Halim", emo("a-Halim", 150, 178, "\u{1F466}", 30), teks("n-Halim", 188, 176, "Halim", 8.6)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Barisan kelereng Halim")),
      tambah(POS_C2[0], BARIS(0)),
      tambah(POS_C2[1], BARIS(1)),
      tambah(POS_C2[2], BARIS(2)),
    ),
    k(SUARA_C3, tambah(POS_C3[0], BARIS(3)), tambah(POS_C3[1], BARIS(4)), tambah(POS_C3[2], BARIS(5))),
    k(
      SUARA_C4,
      sorotkan("lebih", "km1x10", "km2x11", "km3x12", "km4x13", "km5x14"),
      tambah("naik", teks("lb", 242, 104, "lebih satu", 10, W.merah)),
      tambah("demi", panah("pl", 242, 112, 0, 36, W.merah, 2.4)),
    ),
    k(
      SUARA_C5,
      hapus(0, "lb", "pl"),
      tambah(idx(SUARA_C5, "menghitung"), emo("tg", 26, baryY(0) + 17, "\u{1F446}", 20)),
      ubah(idx(SUARA_C5, "naik"), { id: "tg", x: 26 + 14 * 9.5, y: baryY(5) + 17 }),
      tambah("dua", ...kartu("ct", 40, 172, 220, 26, W.emas, ["terus maju sampai 20"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Menghitung maju: Malosi naik tangga ------------------------------ */
const SUARA_M1 = "Malosi menaiki tangga bilangan. Tangga ini punya enam anak tangga, dan tiap anak tangga bertanda satu bilangan.";
const SUARA_M2 = "Malosi mulai dari anak tangga sepuluh. Naik satu anak tangga, sebelas. Naik lagi, dua belas.";
const SUARA_M3 = "Lalu tiga belas, empat belas, dan lima belas. Malosi sudah sampai di atas.";
const SUARA_M4 = "Malosi menghitung maju. Menghitung maju artinya mulai dari bilangan kecil menuju bilangan besar.";
const SUARA_M5 = "Langkahnya sama, yaitu satu demi satu. Setiap kali naik, bilangannya lebih satu.";
const SUARA_M6 = "Ucapkan lagi mengikuti suara guru. Sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas.";
const P_M2 = urutBil(SUARA_M2, [10, 11, 12]);
const P_M3 = urutBil(SUARA_M3, [13, 14, 15]);
const P_M6 = urutBil(SUARA_M6, [10, 11, 12, 13, 14, 15], "guru");
const naikKe = (id: string, i: number) => ({ id, ...tokohDi(i) });
/** Label "satu" di atas anak tangga ke-i (langkah satu demi satu). */
const LABEL_SATU = (i: number) => teks(`ls${i}`, tgX(i), tgTop(i) - 7, "satu", 8, W.merah);

export const ADEGAN_MAJU: AdeganStory = {
  id: "maju-tangga",
  judul: "Menghitung maju: naik tangga bilangan",
  sumber: "Materi: menghitung maju",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Malosi menaiki tangga")),
      tambah("Malosi", emo("tk", tokohDi(0).x, tokohDi(0).y, "\u{1F9D2}", 24)),
      tambah("enam", tangga("tg", 10)),
    ),
    k(
      SUARA_M2,
      sorotkan(P_M2[0], "tg0"),
      redamkan(P_M2[1], "tg0"),
      sorotkan(P_M2[1], "tg1"),
      ubah(P_M2[1], naikKe("tk", 1)),
      redamkan(P_M2[2], "tg1"),
      sorotkan(P_M2[2], "tg2"),
      ubah(P_M2[2], naikKe("tk", 2)),
    ),
    k(
      SUARA_M3,
      redamkan(0, "tg2"),
      sorotkan(P_M3[0], "tg3"),
      ubah(P_M3[0], naikKe("tk", 3)),
      redamkan(P_M3[1], "tg3"),
      sorotkan(P_M3[1], "tg4"),
      ubah(P_M3[1], naikKe("tk", 4)),
      redamkan(P_M3[2], "tg4"),
      sorotkan(P_M3[2], "tg5"),
      ubah(P_M3[2], naikKe("tk", 5)),
      tambah("atas.", emo("ps", 262, 30, "\u{1F389}", 20)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ps"),
      redamkan(0, "tg5"),
      tambah("maju.", ...kartu("mj", 16, 34, 150, 44, W.krem, ["menghitung maju", "kecil ke besar"], 9.5)),
      tambah("kecil", panah("pm", 30, 98, 100, 0, W.merah, 2.4)),
    ),
    k(
      SUARA_M5,
      hapus(0, "mj-k", "mj-t0", "mj-t1", "pm"),
      tambah(0, ...kartu("lk", 16, 34, 150, 28, W.hijauMuda, ["langkah sama: satu"], 9.5)),
      tambah(idx(SUARA_M5, "satu", 1), LABEL_SATU(1), LABEL_SATU(2), LABEL_SATU(3)),
      tambah(idx(SUARA_M5, "satu", 2), LABEL_SATU(4), LABEL_SATU(5)),
    ),
    k(
      SUARA_M6,
      hapus(0, "lk-k", "lk-t0", "ls1", "ls2", "ls3", "ls4", "ls5"),
      ubah(0, naikKe("tk", 0)),
      tambah(0, emo("uc", 60, 70, "\u{1F4AC}", 30)),
      ...P_M6.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `tg${i - 1}`)] : []), sorotkan(p, `tg${i}`), ubah(p, naikKe("tk", i))]),
    ),
  ],
};

/* ------------------------------ 3. Menghitung mundur: Kira turun tangga ------------------------------ */
const SUARA_N1 = "Sekarang Kira menuruni tangga yang sama. Kira mulai dari anak tangga lima belas, yang paling atas.";
const SUARA_N2 = "Turun satu anak tangga, empat belas. Turun lagi, tiga belas, dua belas.";
const SUARA_N3 = "Lalu sebelas dan sepuluh. Kira sudah sampai di bawah.";
const SUARA_N4 = "Kira menghitung mundur. Menghitung mundur artinya mulai dari bilangan besar menuju bilangan kecil.";
const SUARA_N5 = "Langkahnya juga sama, yaitu satu demi satu. Setiap kali turun, bilangannya kurang satu.";
const SUARA_N6 = "Ucapkan lagi mengikuti suara guru. Lima belas, empat belas, tiga belas, dua belas, sebelas, sepuluh.";
const P_N2 = urutBil(SUARA_N2, [14, 13, 12]);
const P_N3 = urutBil(SUARA_N3, [11, 10]);
const P_N6 = urutBil(SUARA_N6, [15, 14, 13, 12, 11, 10], "guru");

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "mundur-tangga",
  judul: "Menghitung mundur: turun tangga bilangan",
  sumber: "Materi: menghitung mundur",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Kira menuruni tangga")),
      tambah("tangga", tangga("tg", 10)),
      tambah("mulai", emo("tk", tokohDi(5).x, tokohDi(5).y, "\u{1F467}", 24)),
      sorotkan("lima", "tg5"),
    ),
    k(
      SUARA_N2,
      redamkan(P_N2[0], "tg5"),
      sorotkan(P_N2[0], "tg4"),
      ubah(P_N2[0], naikKe("tk", 4)),
      redamkan(P_N2[1], "tg4"),
      sorotkan(P_N2[1], "tg3"),
      ubah(P_N2[1], naikKe("tk", 3)),
      redamkan(P_N2[2], "tg3"),
      sorotkan(P_N2[2], "tg2"),
      ubah(P_N2[2], naikKe("tk", 2)),
    ),
    k(
      SUARA_N3,
      redamkan(0, "tg2"),
      sorotkan(P_N3[0], "tg1"),
      ubah(P_N3[0], naikKe("tk", 1)),
      redamkan(P_N3[1], "tg1"),
      sorotkan(P_N3[1], "tg0"),
      ubah(P_N3[1], naikKe("tk", 0)),
      tambah("bawah.", emo("ps", 38, 100, "\u{1F3C1}", 22)),
    ),
    k(
      SUARA_N4,
      hapus(0, "ps"),
      redamkan(0, "tg0"),
      tambah("mundur.", ...kartu("mj", 16, 34, 150, 44, W.krem, ["menghitung mundur", "besar ke kecil"], 9.5)),
      tambah("besar", panah("pm", 130, 98, -100, 0, W.merah, 2.4)),
    ),
    k(
      SUARA_N5,
      hapus(0, "mj-k", "mj-t0", "mj-t1", "pm"),
      tambah(0, ...kartu("lk", 16, 34, 150, 28, W.pink, ["langkah sama: satu"], 9.5)),
      tambah(idx(SUARA_N5, "satu", 1), LABEL_SATU(1), LABEL_SATU(2), LABEL_SATU(3)),
      tambah(idx(SUARA_N5, "satu", 2), LABEL_SATU(4), LABEL_SATU(5)),
    ),
    k(
      SUARA_N6,
      hapus(0, "lk-k", "lk-t0", "ls1", "ls2", "ls3", "ls4", "ls5"),
      ubah(0, naikKe("tk", 5)),
      tambah(0, emo("uc", 60, 70, "\u{1F4AC}", 30)),
      ...P_N6.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `tg${6 - i}`)] : []), sorotkan(p, `tg${5 - i}`), ubah(p, naikKe("tk", 5 - i))]),
    ),
  ],
};

/* ------------------------------ 4. Satu lebih, satu kurang ------------------------------ */
const SUARA_L1 = "Setiap bilangan punya tetangga. Di sebelah kanan ada bilangan yang satu lebih banyak, dan di sebelah kiri ada yang satu kurang.";
const SUARA_L2 = "Lihat tiga belas. Satu lebih dari tiga belas adalah empat belas.";
const SUARA_L3 = "Satu kurang dari tiga belas adalah dua belas. Kita mundur satu langkah.";
const SUARA_L4 = "Pada barisan kelereng Halim, baris di bawah selalu lebih banyak satu. Baris di atasnya kurang satu.";
const SUARA_L5 = "Sekarang tebak sendiri. Satu lebih dari lima belas adalah bilangan apa? Ketuk jawabannya.";
const SUARA_L6 = "Satu lebih dari lima belas adalah enam belas. Hebat sekali! Satu kurang dari lima belas adalah empat belas.";
const BARIS_KA = (r: number) => [
  ...Array.from({ length: 12 + r }, (_, i) => bulat(`ka${r}x${i}`, 30 + i * 9.5, 70 + r * 26, 4, WARNA_BARIS[r + 2], W.biru, { tebal: 1 })),
  teks(`kc${r}`, 200, 74 + r * 26, String(12 + r), 12, W.biru),
];

export const ADEGAN_SATU_LEBIH: AdeganStory = {
  id: "satu-lebih",
  judul: "Satu lebih dan satu kurang",
  sumber: "Materi: satu lebih, satu kurang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Tetangga bilangan")),
      tambah("Setiap", ...angka("tc", 120, 70, 13, 60, 56, W.langit, 26)),
      tambah("kanan", ...angka("tr", 210, 70, 14, 60, 56, W.hijauMuda, 26)),
      tambah("kiri", ...angka("tl", 30, 70, 12, 60, 56, W.merahMuda, 26)),
    ),
    k(
      SUARA_L2,
      sorotkan("Lihat", "tc-k"),
      redamkan(idx(SUARA_L2, "Satu"), "tc-k"),
      tambah("adalah", panah("pa", 184, 98, 22, 0, W.hijau, 3)),
      tambah("empat", teks("ta", 240, 150, "satu lebih", 11, W.hijau)),
      sorotkan("empat", "tr-k"),
    ),
    k(
      SUARA_L3,
      hapus(0, "pa", "ta"),
      redamkan(0, "tr-k"),
      tambah("adalah", panah("pb", 116, 98, -22, 0, W.merah, 3)),
      tambah("dua", teks("tb", 60, 150, "satu kurang", 11, W.merah)),
      sorotkan("dua", "tl-k"),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Kelereng Halim")),
      tambah("Pada", BARIS_KA(0)),
      tambah("bawah", BARIS_KA(1)),
      tambah("selalu", BARIS_KA(2)),
      tambah("Baris", teks("kl", 150, 170, "baris bawah: lebih satu", 10, W.hijau)),
      tambah("kurang", teks("kj", 150, 190, "baris atas: kurang satu", 10, W.merah)),
    ),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Tebak bilangannya")),
      tambah("Satu", ...angka("sa", 120, 40, 15, 60, 50, W.langit, 24)),
      tambah("apa?", teks("sq", 150, 112, "satu lebih dari ini?", 11, W.merah)),
      tambah("Ketuk", ...angka("so0", 30, 130, 14, 60, 50, W.krem, 22), ...angka("so1", 120, 130, 16, 60, 50, W.krem, 22), ...angka("so2", 210, 130, 18, 60, 50, W.krem, 22)),
    ),
    k(
      SUARA_L6,
      sorotkan(bilKe(SUARA_L6, 16), "so1-k"),
      tambah("Hebat", emo("ow", 268, 100, "\u{1F989}", 30)),
      redamkan(idx(SUARA_L6, "Satu", 2), "so1-k"),
      sorotkan(idx(SUARA_L6, "Satu", 2), "so0-k"),
      ubah(idx(SUARA_L6, "Satu", 2), { id: "sq", isi: "satu kurang dari ini?" }),
    ),
  ],
};
