import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batangSel, emo, garisBil, judul, kartu, lompat, orang, teks, warnaiSel, xGB } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, tambah, ubah } from "./k1b6C-bantu";

/* Video metode global Sub-Bab C "Tutup Pasar Malam": pembuka dan Think Addition (Pikir Penjumlahan). */

export const NAMA_METODE = ["Think Addition", "Fact Family", "Subtract Through Ten"];
export const NAMA_METODE_ID = ["Pikir Penjumlahan", "Keluarga Kalimat", "Kurangi Lewat Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di bawah lampion terakhir, Mamah menemukan selembar kertas lipat tentang tiga cara mengurang. Igil bertanya, mana yang paling cepat untuk sisa dagangan?";
const SUARA_O2 = "Tiga metode itu: Think Addition, Fact Family, dan Subtract Through Ten.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pikir Penjumlahan, Keluarga Kalimat, dan Kurangi Lewat Sepuluh. Ketiganya membantu mencari sisa.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk mengurang",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara mengurang")),
      tambah(idx(SUARA_O1, "lampion"), ...[60, 150, 240].map((x, i) => emo(`lm${i}`, x, 50, E.lampion, 22))),
      tambah(idx(SUARA_O1, "Mamah"), ...orang("mm", 40, 120, E.mamah, "Mamah")),
      tambah(idx(SUARA_O1, "kertas"), emo("kr", 100, 116, E.kertas, 28)),
      tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 130, 100, 150, 28, W.emas, ["3 cara mengurang"], 10)),
      tambah(idx(SUARA_O1, "Igil"), ...orang("ig", 258, 170, E.igil, "Igil")),
      tambah(idx(SUARA_O1, "sisa"), teks("sd", 150, 168, "sisa dagangan?", 10, W.merah)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O2, ["Think", "Fact", "Subtract"][i]), ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Pikir", "Keluarga", "Kurangi"][i]), ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
      tambah(idx(SUARA_O3, "Sepuluh"), teks("sp", 262, 160, "10", 12, W.merah)),
      tambah(idx(SUARA_O3, "Ketiganya"), teks("cs", 150, 190, "mencari sisa", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Think Addition: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Think Addition, atau Pikir Penjumlahan. Pengurangan dipikirkan sebagai penjumlahan.";
const SUARA_A2 = "Lima belas dikurangi tujuh, berarti tujuh ditambah berapa sama dengan lima belas?";
const SUARA_A3 = "Tujuh ditambah delapan sama dengan lima belas. Jadi sisanya delapan. Pengurangan dan penjumlahan saling berpasangan.";

export const ADEGAN_LUAR_PIKIR: AdeganStory = {
  id: "luar-pikir",
  judul: "Think Addition: pikir penjumlahan",
  sumber: "Metode global: Think Addition",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(idx(SUARA_A1, "pertama"), ...kepala(0)),
      tambah(idx(SUARA_A1, "Pengurangan"), ...kartu("pk", 30, 70, 110, 30, W.merahMuda, ["pengurangan"], 10)),
      tambah(idx(SUARA_A1, "dipikirkan"), emo("pi", 150, 90, E.pikir, 26)),
      tambah(idx(SUARA_A1, "penjumlahan", 2), ...kartu("pj", 160, 70, 110, 30, W.hijauMuda, ["penjumlahan"], 10)),
    ),
    k(
      SUARA_A2,
      tambah(idx(SUARA_A2, "dikurangi"), ...kartu("ka", 20, 56, 120, 22, W.krem, ["15 – 7 = ?"], 11)),
      tambah(idx(SUARA_A2, "belas", 1), ...batangSel("bs", 15, 24, 100, 17, 16, 18, 0, W.langit)),
      ubah(idx(SUARA_A2, "tujuh", 1), ...warnaiSel("bs", 0, 6, W.langit)),
      tambah(idx(SUARA_A2, "tujuh", 1), teks("l7", 80, 132, "7", 12)),
      tambah(idx(SUARA_A2, "ditambah"), ...kartu("kb", 160, 56, 120, 22, W.hijauMuda, ["7 + ? = 15"], 11)),
      tambah(idx(SUARA_A2, "berapa"), teks("q", 210, 132, "?", 16, W.merah)),
    ),
    k(
      SUARA_A3,
      hapus(idx(SUARA_A3, "delapan", 1), "q"),
      ubah(idx(SUARA_A3, "delapan", 1), ...warnaiSel("bs", 7, 14, W.pink)),
      tambah(idx(SUARA_A3, "delapan", 1), teks("l8", 210, 132, "8", 12, W.merah)),
      ubah(idx(SUARA_A3, "belas"), { id: "kb-t0", isi: "7 + 8 = 15" }),
      ubah(idx(SUARA_A3, "sisanya"), { id: "ka-t0", isi: "15 – 7 = 8" }),
      tambah(idx(SUARA_A3, "saling"), emo("sw", 150, 68, E.ulang, 22)),
      tambah(idx(SUARA_A3, "berpasangan"), teks("bp", 150, 176, "saling berpasangan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Think Addition: terapan ------------------------------ */
const SUARA_B1 = "Abang mengurang empat belas dikurangi enam. Enam ditambah berapa sama dengan empat belas?";
const SUARA_B2 = "Enam ditambah delapan sama dengan empat belas. Sisanya delapan. Cocok kalau yang diambil besar.";
const SUARA_B3 = "Kurang cocok kalau yang diambil cuma sedikit, karena mundur saja lebih cepat.";

export const ADEGAN_LUAR_PIKIR_TERAPAN: AdeganStory = {
  id: "luar-pikir-terapan",
  judul: "Think Addition: kapan cocok",
  sumber: "Metode global: Think Addition",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah(idx(SUARA_B1, "Abang"), ...orang("ab", 262, 172, E.abang, "Abang")),
      tambah(idx(SUARA_B1, "dikurangi"), ...kartu("ka", 20, 56, 120, 22, W.krem, ["14 – 6 = ?"], 11)),
      tambah(idx(SUARA_B1, "belas", 1), ...batangSel("bs", 14, 24, 100, 18, 16, 18, 0, W.langit)),
      ubah(idx(SUARA_B1, "enam", 1), ...warnaiSel("bs", 0, 5, W.langit)),
      tambah(idx(SUARA_B1, "enam", 1), teks("l6", 72, 132, "6", 12)),
      tambah(idx(SUARA_B1, "ditambah"), ...kartu("kb", 160, 56, 120, 22, W.hijauMuda, ["6 + ? = 14"], 11)),
      tambah(idx(SUARA_B1, "berapa"), teks("q", 203, 132, "?", 16, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(idx(SUARA_B2, "delapan", 1), "q"),
      ubah(idx(SUARA_B2, "delapan", 1), ...warnaiSel("bs", 6, 13, W.pink)),
      tambah(idx(SUARA_B2, "delapan", 1), teks("l8", 203, 132, "8", 12, W.merah)),
      ubah(idx(SUARA_B2, "belas"), { id: "kb-t0", isi: "6 + 8 = 14" }),
      ubah(idx(SUARA_B2, "Sisanya"), { id: "ka-t0", isi: "14 – 6 = 8" }),
      tambah(idx(SUARA_B2, "Cocok"), emo("ok", 150, 82, E.benar, 20), ...kartu("cc", 30, 150, 220, 22, W.hijauMuda, ["cocok kalau yang diambil besar"], 10)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, ...kepala(0)),
      tambah(idx(SUARA_B3, "Kurang"), emo("x", 60, 100, E.salah, 24), ...kartu("sd", 20, 56, 120, 22, W.krem, ["19 – 2 = ?"], 11)),
      tambah(idx(SUARA_B3, "sedikit"), teks("sk", 70, 138, "diambil sedikit", 10, W.merah)),
      tambah(idx(SUARA_B3, "mundur"), ...garisBil("gb", 120, 10, 20), lompat("m1", 19, 18, 100), lompat("m2", 18, 17, 100), teks("ml", xGB(18), 90, "mundur 2", 9, W.merah)),
      tambah(idx(SUARA_B3, "cepat"), emo("cp", 60, 170, E.roket, 24)),
    ),
  ],
};
