import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, judul, kardus, kartu, kartuFaktor, lantai, panah, teks, tokoh } from "./k5b2d-gambar";
import { bersih, hapus, k, sorotkan, pudarkan, tambah, ubah, warnai } from "./k5b2d-bantu";

/*
 * Cerita orisinal IGIL "Kotak Bingkisan Pak Joko" (Kelas 5 Bab 2 Sub-Bab D), Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2d.md. Bagian ini: salah langkah Fajar (berhenti di faktor persekutuan dua), Citra memeriksa, dan arti FPB.
 */

/* ------------------------------ 4. Salah langkah Fajar ------------------------------ */
const SUARA_SALAH1 = "Fajar menunjuk lubang bernomor dua dan berseru bahwa dua kotak sudah cukup.";
const SUARA_SALAH2 = "Ia berhenti di faktor persekutuan pertama yang ia temukan setelah satu.";
const SUARA_SALAH3 = "Kalau aku salah, aku melipat semua kotak sendirian, katanya sambil menggulung lengan baju.";

const CHIP_FP = [1, 2, 3, 6];

export const ADEGAN_SALAH_DUA: AdeganStory = {
  id: "salah-dua",
  judul: "Fajar berhenti di dua",
  sumber: "Materi: salah langkah, berhenti di faktor kedua",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_SALAH1,
      tambah(0, judul("Fajar Berseru"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fa", 50, 184, "Fajar")),
      tambah("lubang", bulat("lb", 170, 80, 26, "#5B3A1A", "#3B2410", { tebal: 2, z: 0 }), teks("l2", 170, 88, "2", 22, W.krem, { z: 3 }), bulat("lm", 161, 98, 4.5, "#DC2626", "#7F1D1D", { tebal: 1, z: 4 }), bulat("lp", 179, 98, 4.5, "#F8FAFC", "#475569", { tebal: 1, z: 4 })),
      tambah("kotak", ...kardus("b1", 226, 154, 30, 20), ...kardus("b2", 262, 154, 30, 20), teks("dk", 260, 192, "2 kotak", 9, W.coklat)),
    ),
    k(
      SUARA_SALAH2,
      tambah("faktor", teks("fl", 145, 113, "faktor persekutuan", 8.5, W.biru)),
      tambah("persekutuan", ...CHIP_FP.flatMap((f, i) => kartuFaktor(`c${f}`, 100 + i * 30, 118, f, W.krem))),
      sorotkan("pertama", "c2-k"),
      tambah("berhenti", emo("tg", 141, 148, E.tangan, 16)),
      pudarkan("satu", "c1-k", "c1-t"),
    ),
    k(
      SUARA_SALAH3,
      tambah("salah", ...kartu("bl", 204, 28, 90, 38, "#FFFFFF", ["aku lipat", "semua kotak!"], 8.5)),
      ubah("melipat", { id: "bl-k", warna: "#FEE2E2" }),
      tambah("menggulung", emo("ot", 96, 168, "\u{1F4AA}", 18)),
    ),
  ],
};

/* ------------------------------ 5. Citra memeriksa ------------------------------ */
const SUARA_PERIKSA1 = "Citra menunjuk lubang lain yang juga berisi dua biji, yaitu tiga dan enam.";
const SUARA_PERIKSA2 = "Pesan Pak Joko meminta kotak sebanyak-banyaknya, jadi pilihlah yang paling besar, yaitu enam.";
const SUARA_PERIKSA3 = "Fajar melipat kotak sampai tumpukannya menjulang, dan Pak Arif memotretnya sambil tertawa.";

const IDS_KARTU = (f: number): string[] => [`c${f}-k`, `c${f}-t0`];

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Citra memeriksa lubang lain",
  sumber: "Materi: lubang lain dan pilihan terbesar",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_PERIKSA1,
      tambah(0, judul("Citra Menunjuk Lubang"), ...lantai("lt", 150)),
      tambah("Citra", ...tokoh("ci", 44, 184, "Citra")),
      tambah("lubang", teks("lb", 190, 54, "lubang berisi 2 biji", 9.5, W.coklat), ...CHIP_FP.flatMap((f, i) => kartu(`c${f}`, 96 + i * 44, 68, 36, 30, W.krem, [String(f)], 16))),
      sorotkan("tiga", ...IDS_KARTU(3)),
      sorotkan("enam", ...IDS_KARTU(6)),
    ),
    k(
      SUARA_PERIKSA2,
      tambah("Joko", ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("sebanyak-banyaknya", teks("sb", 120, 126, "kotak sebanyak-banyaknya", 9, W.coklat)),
      tambah("besar", panah("pn", 246, 118, 0, -18, W.merah, 2.4, { z: 4 }), teks("tb", 246, 134, "paling besar", 9.5, W.merah)),
      warnai("enam", W.emas, "c6-k"),
    ),
    k(
      SUARA_PERIKSA3,
      bersih(0),
      tambah(0, judul("Tumpukan Menjulang"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fa", 60, 184, "Fajar")),
      tambah("kotak", ...kardus("s1", 120, 134, 48, 14), ...kardus("s2", 123, 120, 44, 14), ...kardus("s3", 119, 106, 46, 14)),
      tambah("menjulang", ...kardus("s4", 122, 92, 42, 14), ...kardus("s5", 124, 78, 40, 14), ...kardus("s6", 121, 64, 44, 14)),
      tambah("Arif", ...tokoh("pa", 240, 184, "Pak Arif")),
      tambah("memotretnya", emo("km", 214, 160, E.kamera, 18), teks("kl", 200, 62, "klik!", 11, W.merah)),
      tambah("tertawa", emo("tw", 262, 146, E.tertawa, 18)),
    ),
  ],
};

/* ------------------------------ 6. FPB ------------------------------ */
const SUARA_FPB1 = "Faktor yang sama pada dua bilangan disebut faktor persekutuan.";
const SUARA_FPB2 = "Dari semua faktor persekutuan, yang paling besar disebut faktor persekutuan terbesar, atau FPB.";
const SUARA_FPB3 = "FPB dari dua puluh empat dan delapan belas adalah enam, jadi kotaknya ada enam.";

export const ADEGAN_FPB: AdeganStory = {
  id: "fpb",
  judul: "Faktor persekutuan dan FPB",
  sumber: "Materi: faktor persekutuan dan FPB",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_FPB1,
      tambah(0, judul("Faktor Persekutuan"), bulat("cl", 112, 104, 56, "#BFDBFE", W.biru, { op: 0.6, z: 0 }), bulat("cr", 188, 104, 56, "#FDE68A", W.coklat, { op: 0.6, z: 0 }), teks("t24", 80, 42, "faktor 24", 9), teks("t18", 220, 42, "faktor 18", 9)),
      tambah("bilangan", ...[[4, 80, 80], [8, 106, 80], [12, 80, 112], [24, 106, 112], [9, 198, 96], [18, 226, 96]].map(([n, x, y]) => teks(`n${n}`, x, y, String(n), 12, W.biru, { z: 2 }))),
      tambah("sama", ...[[1, 141, 80], [2, 159, 80], [3, 141, 112], [6, 159, 112]].map(([n, x, y]) => teks(`n${n}`, x, y, String(n), 12, W.merah, { z: 2 }))),
      tambah("persekutuan", teks("fl", 150, 176, "faktor persekutuan", 10, W.ungu)),
    ),
    k(
      SUARA_FPB2,
      hapus("terbesar", "fl"),
      tambah("besar", bulat("rg", 159, 112, 11, undefined, W.emas, { tebal: 3, z: 4 })),
      ubah("terbesar", { id: "n6", u: 16 }),
      tambah("terbesar", teks("fb", 150, 176, "FPB: yang terbesar", 10.5, W.merah)),
    ),
    k(
      SUARA_FPB3,
      hapus("FPB", "fb"),
      tambah("enam", teks("fk", 150, 196, "FPB 6, jadi 6 kotak", 10, W.merah)),
      tambah("kotaknya", ...Array.from({ length: 6 }, (_, i) => kardus(`q${i + 1}`, 78 + i * 24, 164, 20, 16)).flat()),
    ),
  ],
};
