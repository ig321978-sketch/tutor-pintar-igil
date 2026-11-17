import type { AdeganStory, Obj } from "./logika-story";
import { E, W, baris, deretMainan, emo, garisBilangan, judul, kartu, kartuAngka, keranjang, penanda, teks } from "./k1b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b1b-bantu";
import { WARNA_METODE, kepala } from "./k1b1b-luar-1";

/* Video metode global Sub-Bab B: Number Line (Garis Bilangan), One More One Less (Satu Lebih Banyak, Satu Lebih Sedikit), dan ringkasan. */

const GX = 25;
const GJ = 25;
const panah = (id: string, x: number, y: number, x2: number, warna: string): Obj => ({ id, t: "panah", x, y, x2, y2: 0, warna, tebal: 3 });

/* ------------------------------ 4. Number Line: konsep ------------------------------ */
const SUARA_L1 = "Metode kedua, Number Line, atau Garis Bilangan. Angka nol sampai sepuluh berjajar di sebuah garis.";
const SUARA_L2 = "Setiap langkah ke kanan, angkanya naik. Nol, satu, dua, tiga, dan seterusnya.";
const SUARA_L3 = "Makin ke kanan, makin banyak. Makin ke kiri, makin sedikit.";
const SUARA_L4 = "Jadi angka yang letaknya lebih kanan selalu lebih banyak.";
const posLompat = urutKata(SUARA_L2, ["Nol,", "satu,", "dua,", "tiga,"], "naik.");

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line: garis bilangan",
  sumber: "Metode global: Number Line",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_L1, tambah("kedua,", ...kepala(1)), tambah("nol", ...garisBilangan("gb", GX, 130, GJ))),
    k(SUARA_L2, ...posLompat.map((p, i) => (i === 0 ? tambah(p, penanda("kt", GX, 130, GJ, 0, "\u{1F438}")) : ubah(p, { id: "kt", x: GX + i * GJ })))),
    k(
      SUARA_L3,
      hapus(0, "kt"),
      tambah("kanan,", panah("pk", 160, 84, 110, W.hijau), teks("pkt", 215, 76, "makin banyak", 9, W.hijau)),
      tambah("kiri,", panah("pr", 140, 84, -110, W.merah), teks("prt", 85, 76, "makin sedikit", 9, W.merah)),
    ),
    k(SUARA_L4, sorotkan("kanan", "gb-a10"), tambah("selalu", ...kartu("gk", 50, 160, 200, 24, W.emas, ["lebih kanan: lebih banyak"], 9.4))),
  ],
};

/* ------------------------------ 5. Number Line: terapan ------------------------------ */
const SUARA_M1 = "Kaka punya empat boneka, dan Abang punya tujuh robot.";
const SUARA_M2 = "Penanda boneka berhenti di angka empat. Penanda robot berhenti di angka tujuh.";
const SUARA_M3 = "Tujuh letaknya lebih kanan daripada empat.";
const SUARA_M4 = "Jadi robot lebih banyak, dan boneka lebih sedikit.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line: boneka dan robot",
  sumber: "Metode global: Number Line, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, ...kepala(1), ...garisBilangan("gb", GX, 140, GJ)),
      tambah("empat", ...deretMainan(E.boneka, "bn", baris(4, 26, 20, 76), 16)),
      tambah("tujuh", ...deretMainan(E.robot, "rb", baris(7, 150, 20, 76), 16)),
    ),
    k(SUARA_M2, tambah("boneka", penanda("pbn", GX, 140, GJ, 4, E.boneka)), tambah("robot", penanda("prb", GX, 140, GJ, 7, E.robot))),
    k(SUARA_M3, sorotkan("Tujuh", "gb-a7"), tambah("kanan", panah("pm", GX + 4 * GJ + 6, 106, 3 * GJ - 12, W.hijau))),
    k(
      SUARA_M4,
      tambah("robot", ...kartu("ml", 14, 168, 130, 24, W.hijauMuda, ["7 robot: lebih banyak"], 8.6)),
      tambah("boneka", ...kartu("ms", 156, 168, 130, 24, W.merahMuda, ["4 boneka: lebih sedikit"], 8.4)),
    ),
  ],
};

/* ------------------------------ 6. One More, One Less: konsep ------------------------------ */
const SUARA_N1 = "Metode ketiga, One More, One Less, atau Satu Lebih Banyak, Satu Lebih Sedikit.";
const SUARA_N2 = "Satu lebih banyak adalah angka sesudahnya. Satu lebih banyak dari tiga adalah empat.";
const SUARA_N3 = "Satu lebih sedikit adalah angka sebelumnya. Satu lebih sedikit dari tiga adalah dua.";
const SUARA_N4 = "Dua, tiga, empat. Angka sebelum lebih sedikit, angka sesudah lebih banyak.";

export const ADEGAN_LUAR_SATU: AdeganStory = {
  id: "luar-satu",
  judul: "One More, One Less: satu lebih dan satu sedikit",
  sumber: "Metode global: One More, One Less",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_N1, tambah("ketiga,", ...kepala(2)), tambah("Satu", ...kartuAngka("c3", 130, 88, "3", W.krem, 40, 40, 24))),
    k(
      SUARA_N2,
      tambah("sesudahnya.", panah("pa", 176, 108, 36, W.hijau), teks("pat", 236, 80, "satu lebih banyak", 8.4, W.hijau)),
      tambah("empat.", ...kartuAngka("c4", 216, 88, "4", W.hijauMuda, 40, 40, 24)),
    ),
    k(
      SUARA_N3,
      tambah("sebelumnya.", panah("pb", 124, 108, -36, W.merah), teks("pbt", 64, 80, "satu lebih sedikit", 8.4, W.merah)),
      tambah("dua.", ...kartuAngka("c2", 44, 88, "2", W.merahMuda, 40, 40, 24)),
    ),
    k(
      SUARA_N4,
      sorotkan("Dua,", "c2-k"),
      sorotkan("empat.", "c4-k"),
      tambah("sebelum", ...kartu("ns", 14, 152, 130, 24, W.merahMuda, ["sebelum: lebih sedikit"], 8.6)),
      tambah("sesudah", ...kartu("nb", 156, 152, 130, 24, W.hijauMuda, ["sesudah: lebih banyak"], 8.6)),
    ),
  ],
};

/* ------------------------------ 7. One More, One Less: terapan ------------------------------ */
const SUARA_Q1 = "Igil punya lima kelereng di dalam wadah.";
const SUARA_Q2 = "Nenek memberi satu kelereng lagi. Sekarang ada enam, satu lebih banyak dari lima.";
const SUARA_Q3 = "Kalau kembali lima, lalu diambil satu, tinggal empat. Empat adalah satu lebih sedikit dari lima.";
const SUARA_Q4 = "Empat, lima, enam. Satu lebih sedikit, lalu satu lebih banyak.";
const KL = baris(6, 100, 20, 150);

export const ADEGAN_LUAR_SATU_TERAPAN: AdeganStory = {
  id: "luar-satu-terapan",
  judul: "One More, One Less: kelereng Igil",
  sumber: "Metode global: One More, One Less, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(2)), tambah("wadah.", ...keranjang("kw", 84, 128, 132, 40)), tambah("lima", ...deretMainan(E.kelereng, "kl", KL.slice(0, 5), 16), teks("hq", 150, 112, "5", 18, W.merah))),
    k(
      SUARA_Q2,
      tambah("Nenek", emo("nn", 40, 100, E.nenek, 30)),
      tambah("satu", emo("kl5", 70, 120, E.kelereng, 16)),
      ubah("Sekarang", { id: "kl5", ...KL[5] }, { id: "hq", isi: "6" }),
      tambah("banyak", ...kartu("q2", 30, 60, 240, 24, W.hijauMuda, ["6 adalah satu lebih banyak dari 5"], 9)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "nn", "q2-k", "q2-t0"),
      hapus("lima,", "kl5"),
      ubah("lima,", { id: "hq", isi: "5" }),
      ubah("diambil", { id: "kl4", x: 250, y: 190 }),
      hapus("tinggal", "kl4"),
      ubah("tinggal", { id: "hq", isi: "4" }),
      tambah("sedikit", ...kartu("q3", 30, 60, 240, 24, W.merahMuda, ["4 adalah satu lebih sedikit dari 5"], 9)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Empat, lima, enam")),
      tambah("Empat,", ...kartuAngka("r4", 50, 80, "4", W.merahMuda, 50, 46, 26)),
      tambah("lima,", ...kartuAngka("r5", 125, 80, "5", W.krem, 50, 46, 26)),
      tambah("enam.", ...kartuAngka("r6", 200, 80, "6", W.hijauMuda, 50, 46, 26)),
      tambah("sedikit,", teks("rs", 75, 148, "satu lebih sedikit", 8.4, W.merah)),
      tambah("banyak.", teks("rb", 225, 148, "satu lebih banyak", 8.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga metode global untuk membandingkan banyak benda.";
const SUARA_R2 = "Ten Frame: bingkai yang lebih penuh berisi lebih banyak.";
const SUARA_R3 = "Number Line: angka yang letaknya lebih kanan, lebih banyak.";
const SUARA_R4 = "One More, One Less: angka sesudahnya satu lebih banyak, angka sebelumnya satu lebih sedikit.";
const RINGKAS = ["bingkai lebih penuh: lebih banyak", "lebih kanan: lebih banyak", "sesudah: satu lebih banyak"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("membandingkan", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_R2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Ten", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Ten Frame", RINGKAS[0]], 9.4))),
    k(SUARA_R3, tambah("Number", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Number Line", RINGKAS[1]], 9.4))),
    k(SUARA_R4, tambah("One", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["One More, One Less", RINGKAS[2]], 9.4))),
  ],
};
