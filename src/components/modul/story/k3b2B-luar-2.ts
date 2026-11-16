import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bulat, emo, judul, kartu, kalimat, kotak, panah, pilihan, teks } from "./k3b2B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";
import { NAMA_METODE_ID, kepala } from "./k3b2B-luar-1";

/* ------------------------------ 4. Operasi Kebalikan: konsep ------------------------------ */
const SUARA_M1 = "Metode kedua bernama Operasi Kebalikan. Pengurangan dan penjumlahan saling berkebalikan.";
const SUARA_M2 = "Delapan puluh kurang tiga puluh lima sama dengan empat puluh lima.";
const SUARA_M3 = "Bila hasilnya kita tambah dengan bilangan yang dikurangkan, kita kembali ke delapan puluh.";
const SUARA_M4 = "Karena itu, untuk mencari bilangan awal, kita boleh menambah. Untuk mencari bilangan yang dikurangkan, kita boleh mengurangi.";

export const ADEGAN_LUAR_KEBALIKAN: AdeganStory = {
  id: "luar-kebalikan",
  judul: "Operasi Kebalikan: kurang dan tambah",
  sumber: "Metode luar: Operasi Kebalikan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah("kedua", ...kepala(1)), tambah("saling", bulat("bm", 100, 110, 22, W.pink), emo("tm", 100, 120, "−", 30), bulat("bp", 200, 110, 22, W.pink), emo("tp", 200, 120, "+", 30), panah("pa", 126, 100, 48, 0, W.biru, 2.5), panah("pb", 174, 120, -48, 0, W.biru, 2.5))),
    k(SUARA_M2, hapus(0, "bm", "tm", "bp", "tp", "pa", "pb"), tambah("Delapan", ...kartu("c1", 30, 60, 240, 38, W.hijauMuda, ["80 − 35 = 45"], 20))),
    k(SUARA_M3, tambah("tambah", ...kartu("c2", 30, 112, 240, 38, W.langit, ["45 + 35 = 80"], 20)), tambah("kembali", panah("pk", 280, 110, 0, -34, W.merah, 2.5))),
    k(
      SUARA_M4,
      hapus(0, "pk"),
      tambah("awal,", ...kartu("d1", 14, 158, 130, 34, W.krem, ["cari awal:", "tambahkan"], 10)),
      tambah("dikurangkan,", ...kartu("d2", 156, 158, 130, 34, W.pink, ["cari dikurangkan:", "kurangi"], 10)),
    ),
  ],
};

/* ------------------------------ 5. Operasi Kebalikan: terapan ------------------------------ */
const SUARA_P1 = "Terapkan Operasi Kebalikan pada titik-titik kurang tiga puluh sama dengan lima puluh.";
const SUARA_P2 = "Gunakan kebalikannya. Lima puluh tambah tiga puluh sama dengan berapa? Ketuk jawabannya. Dua puluh, delapan puluh, atau tujuh puluh?";
const SUARA_P3 = "Betul! Lima puluh tambah tiga puluh sama dengan delapan puluh. Jadi titik-titik diisi delapan puluh.";
const SUARA_P4 = "Kita cek dengan mengurangi. Delapan puluh kurang tiga puluh sama dengan lima puluh.";

export const ADEGAN_LUAR_KEBALIKAN_TERAPAN: AdeganStory = {
  id: "luar-kebalikan-terapan",
  judul: "Operasi Kebalikan: titik-titik kurang tiga puluh",
  sumber: "Metode luar: Operasi Kebalikan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah("Terapkan", ...kepala(1)), tambah("titik-titik", kalimat("ks", 84, "… − 30 = 50", 30))),
    k(SUARA_P2, tambah("Gunakan", kalimat("kb", 120, "50 + 30 = ?", 20)), tambah("Ketuk", ...pilihan(138, ["20", "80", "70"]))),
    k(SUARA_P3, sorotkan("Betul!", "c2-k"), ubah(idx(SUARA_P3, "delapan", 1), { id: "kb", isi: "50 + 30 = 80" }), ubah("Jadi", { id: "ks", isi: "80 − 30 = 50" })),
    k(SUARA_P4, redamkan(0, "c2-k"), tambah("cek", kalimat("per", 194, "80 − 30 = 50", 18, W.merah), emo("ok", 262, 194, "✅", 22))),
  ],
};

/* ------------------------------ 6. Bungkus Sepuluh: konsep ------------------------------ */
const WARNA_SISA = W.hijauMuda;
const WARNA_JUAL = "#FCA5A5";
const BK = Array.from({ length: 8 }, (_, i): Obj => kotak(`bk_k${i}`, 14 + i * 32, 72, 28, 26, W.langit, W.biru, { rx: 4, tebal: 1.6 }));
/** Sepuluh butir lepas dari bungkus kelima: lima hijau (sisa), lima merah (dijual). */
const BUTIR = Array.from({ length: 10 }, (_, j): Obj => bulat(`bk_o${j}`, 150 + (j % 5) * 13, 114 + Math.floor(j / 5) * 13, 5, j < 5 ? WARNA_SISA : WARNA_JUAL, W.biru));
const SUARA_B1 = "Metode ketiga bernama Bungkus Sepuluh. Kita susun bilangan sebagai bungkus berisi sepuluh dan butir lepas.";
const SUARA_B2 = "Delapan puluh sama dengan delapan bungkus yang berisi sepuluh.";
const SUARA_B3 = "Sisanya empat puluh lima, yaitu empat bungkus dan lima butir.";
const SUARA_B4 = "Bungkus dan butir yang berwarna merah adalah ayam yang dijual. Ada tiga bungkus dan lima butir.";
const SUARA_B5 = "Tiga bungkus adalah tiga puluh, ditambah lima butir, jadi tiga puluh lima.";

export const ADEGAN_LUAR_BUNGKUS: AdeganStory = {
  id: "luar-bungkus",
  judul: "Bungkus Sepuluh: bungkus dan butir",
  sumber: "Metode luar: Bungkus Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_B1, tambah("ketiga", ...kepala(2)), tambah("bungkus", emo("bu", 150, 112, "\u{1F4E6}", 46)), tambah(idx(SUARA_B1, "sepuluh", 2), teks("s10", 150, 160, "isi 10", 16, W.merah))),
    k(SUARA_B2, hapus(0, "bu", "s10"), tambah("Delapan", kalimat("kb", 62, "80", 14, W.merah)), tambah("bungkus.", ...BK, kalimat("kc", 154, "8 bungkus, tiap bungkus 10", 12, W.coklat))),
    k(
      SUARA_B3,
      ubah(idx(SUARA_B3, "empat", 2), ...[0, 1, 2, 3].map((i) => ({ id: `bk_k${i}`, warna: WARNA_SISA }))),
      ubah("bungkus", { id: "bk_k4", putus: true, warna: W.putih }),
      tambah(idx(SUARA_B3, "lima", 2), ...BUTIR.slice(0, 5)),
      ubah("butir.", { id: "kc", isi: "sisa 45 = 4 bungkus + 5 butir" }),
    ),
    k(SUARA_B4, ubah("merah", ...[5, 6, 7].map((i) => ({ id: `bk_k${i}`, warna: WARNA_JUAL }))), tambah("Ada", ...BUTIR.slice(5)), ubah("lima", { id: "kc", isi: "dijual = 3 bungkus + 5 butir" })),
    k(SUARA_B5, ubah("Tiga", { id: "kc", isi: "30 + 5 = 35" }), tambah("jadi", ...kartu("jw", 60, 168, 180, 26, W.emas, ["dijual: 35 ekor"], 11))),
  ],
};

/* ------------------------------ 7. Bungkus Sepuluh: terapan ------------------------------ */
const BP = Array.from({ length: 6 }, (_, i): Obj => kotak(`bp_k${i}`, 14 + i * 46, 58, 40, 26, i < 2 ? WARNA_SISA : i === 2 ? W.putih : WARNA_JUAL, W.biru, { rx: 4, tebal: 1.6, putus: i === 2 }));
const BUTIR_P = Array.from({ length: 10 }, (_, j): Obj => bulat(`bp_o${j}`, 112 + (j % 5) * 13, 98 + Math.floor(j / 5) * 13, 5, j < 7 ? WARNA_SISA : WARNA_JUAL, W.biru));
const SUARA_Q1 = "Terapkan Bungkus Sepuluh pada enam puluh kurang titik-titik sama dengan dua puluh tujuh.";
const SUARA_Q2 = "Sisa dua puluh tujuh adalah dua bungkus dan tujuh butir. Bungkus ketiga dibuka.";
const SUARA_Q3 = "Berapa ayam yang dijual? Ketuk jawabannya. Delapan puluh tujuh, tiga puluh tiga, atau tiga puluh empat?";
const SUARA_Q4 = "Betul! Dijual tiga bungkus dan tiga butir, jadi tiga puluh tiga. Dua puluh tujuh tambah tiga puluh tiga sama dengan enam puluh.";

export const ADEGAN_LUAR_BUNGKUS_TERAPAN: AdeganStory = {
  id: "luar-bungkus-terapan",
  judul: "Bungkus Sepuluh: enam puluh kurang titik-titik",
  sumber: "Metode luar: Bungkus Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, tambah("Terapkan", ...kepala(2)), tambah("enam", ...BP), tambah("titik-titik", kalimat("ks", 146, "60 − … = 27", 18))),
    k(SUARA_Q2, tambah("tujuh", ...BUTIR_P.slice(0, 7)), sorotkan("ketiga", "bp_k2")),
    k(SUARA_Q3, redamkan(0, "bp_k2"), tambah("Berapa", ...pilihan(156, ["87", "33", "34"]), ...BUTIR_P.slice(7))),
    k(SUARA_Q4, sorotkan("Betul!", "c2-k"), hapus(0, "c1-k", "c1-t", "c3-k", "c3-t"), ubah("tiga", { id: "ks", isi: "60 − 33 = 27" }), tambah("Betul!", emo("ok", 262, 146, "✅", 24))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Y1 = "Mari kita ingat tiga metode dari luar tadi.";
const SUARA_Y2 = "Bagan Bilangan Awal dan Bagian. Batang atas bilangan awal, dua batang bawah adalah bagian-bagiannya.";
const SUARA_Y3 = "Operasi Kebalikan. Pengurangan dan penjumlahan saling membantu untuk memeriksa dan mencari.";
const SUARA_Y4 = "Bungkus Sepuluh. Susun bilangan sebagai bungkus sepuluh dan butir lepas. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan"), emo("ow", 150, 110, OWL, 50))),
    k(SUARA_Y2, hapus(0, "ow"), tambah("Bagan", ...kartu("r0", 14, 40, 272, 44, W.hijauMuda, [`1. ${NAMA_METODE_ID[0]}`], 11), emo("q0", 270, 70, "📊", 24))),
    k(SUARA_Y3, tambah("Operasi", ...kartu("r1", 14, 94, 272, 44, W.langit, [`2. ${NAMA_METODE_ID[1]}`], 11), emo("q1", 270, 124, "🔁", 24))),
    k(SUARA_Y4, tambah("Bungkus", ...kartu("r2", 14, 148, 272, 44, W.pink, [`3. ${NAMA_METODE_ID[2]}`], 11), emo("q2", 270, 178, "📦", 24))),
  ],
};
