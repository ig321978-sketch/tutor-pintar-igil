import type { AdeganStory, Obj } from "./logika-story";
import { E, KURANG, W, bulat, emo, judul, kalimatC, kartu, kotak, orang, teks } from "./k1b3c-gambar";
import { k, sorotkan, tambah, ubah } from "./k1b3c-bantu";

/*
 * Cerita orisinal IGIL "Kondektur dan Penumpang" (Kelas 1 Bab 3 Sub-Bab C, hubungan penjumlahan dan pengurangan), lanjutan Kereta ke Rumah Nenek.
 * Masalah: catatan kondektur tentang penumpang yang naik dan turun harus cocok dengan banyak penumpang di gerbong, dan sebagian kena noda.
 * Penyelesaian: tukar tempat pada penjumlahan, keluarga bilangan, memeriksa pengurangan dengan penjumlahan, mencari bilangan yang hilang.
 */

/** Penumpang berbaju warna: lingkaran warna `${id}-w` di belakang wajah `${id}`. */
const penumpang = (id: string, x: number, y: number, warna: string, u = 20): Obj[] => [bulat(`${id}-w`, x, y + 2, u * 0.62, warna, W.biru, { z: -1, tebal: 1 }), emo(id, x, y, E.penumpang, u)];
const BIRU = "#93C5FD";
const MERAH = "#FCA5A5";

/* ------------------------------ 1. Kondektur memeriksa gerbong ------------------------------ */
const SUARA_S1 = "Kereta lanjutan melaju. Kondektur datang ke gerbong dan mencatat penumpang yang naik dan turun.";
const SUARA_S2 = "Catatan harus cocok dengan banyak penumpang di gerbong. Kalau salah, karcis bisa tertukar.";
const SUARA_S3 = "Masalahnya, catatannya cepat bertambah dan sebagian kena noda. Kondektur meminta Abang membantu memeriksa.";

export const ADEGAN_KONDEKTUR: AdeganStory = {
  id: "kondektur-datang",
  judul: "Kondektur memeriksa gerbong",
  sumber: "Materi: masalah catatan kondektur",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kondektur memeriksa")),
      tambah("Kondektur", ...orang("kd", 150, 96, E.kondektur, "kondektur")),
      tambah("naik", ...penumpang("pn1", 60, 150, BIRU, 22), teks("nk", 60, 178, "naik", 9, W.hijau)),
      tambah("turun.", ...penumpang("pn2", 240, 150, MERAH, 22), teks("tr", 240, 178, "turun", 9, W.merah)),
    ),
    k(SUARA_S2, tambah("cocok", ...kartu("ck", 70, 34, 160, 24, W.emas, ["catatan = penumpang"], 10)), tambah("tertukar.", emo("kc", 150, 152, E.karcis, 24))),
    k(SUARA_S3, tambah("noda.", emo("nd", 196, 46, E.noda, 18)), tambah("Abang", ...orang("ab", 40, 96, E.abang, "Abang")), sorotkan("memeriksa.", "ab")),
  ],
};

/* ------------------------------ 2. Penumpang naik, tukar tempat ------------------------------ */
const SUARA_T1 = "Di stasiun kecil naik empat penumpang berbaju biru dan tiga penumpang berbaju merah.";
const SUARA_T2 = "Abang menulis empat ditambah tiga sama dengan tujuh. Kaka menulis tiga ditambah empat sama dengan tujuh.";
const SUARA_T3 = "Igil dan Kaka berdebat, siapa yang benar? Ternyata dua-duanya benar! Urutannya ditukar, hasilnya tetap tujuh. Pada penjumlahan, tukar tempat boleh.";

export const ADEGAN_TUKAR: AdeganStory = {
  id: "naik-tukar",
  judul: "Penumpang naik, tukar tempat",
  sumber: "Materi: tukar tempat penjumlahan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Penumpang naik"), kotak("gb", 10, 76, 280, 52, "#E0E7FF", W.biru, { rx: 16, z: -2 })),
      tambah("empat", ...[0, 1, 2, 3].flatMap((i) => penumpang(`bl${i}`, 40 + i * 30, 102, BIRU))),
      tambah("biru", teks("tb", 85, 146, "biru 4", 9.5, W.biru)),
      tambah("tiga", ...[0, 1, 2].flatMap((i) => penumpang(`mr${i}`, 190 + i * 30, 102, MERAH))),
      tambah("merah.", teks("tm", 220, 146, "merah 3", 9.5, W.merah)),
    ),
    k(SUARA_T2, tambah("Abang", ...kalimatC("k1", 150, 48, ["4", "+", "3", "=", "7"], 18, 26)), tambah("Kaka", ...kalimatC("k2", 150, 176, ["3", "+", "4", "=", "7"], 18, 26))),
    k(SUARA_T3, sorotkan("tetap", "k14", "k24"), tambah("boleh", teks("tt", 150, 196, "tukar tempat: hasilnya sama", 9, W.ungu))),
  ],
};

/* ------------------------------ 3. Satu keluarga bilangan ------------------------------ */
const SUARA_K1 = "Di stasiun berikutnya, tiga penumpang merah turun. Tujuh dikurangi tiga sama dengan empat.";
const SUARA_K2 = "Kalau empat penumpang biru yang turun, tujuh dikurangi empat sama dengan tiga.";
const SUARA_K3 = "Tiga, empat, dan tujuh membuat satu keluarga bilangan: dua penjumlahan dan dua pengurangan.";
const SUARA_K4 = "Tetapi pengurangan tidak boleh ditukar. Tiga dikurangi tujuh tidak bisa, karena tujuh lebih banyak.";
const BL = [0, 1, 2, 3].map((i) => `bl${i}`);
const MR = [0, 1, 2].map((i) => `mr${i}`);

export const ADEGAN_KELUARGA: AdeganStory = {
  id: "keluarga-bilangan",
  judul: "Satu keluarga bilangan",
  sumber: "Materi: keluarga bilangan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Satu keluarga bilangan"), ...[0, 1, 2, 3].flatMap((i) => penumpang(`bl${i}`, 40 + i * 30, 62, BIRU)), ...[0, 1, 2].flatMap((i) => penumpang(`mr${i}`, 190 + i * 30, 62, MERAH))),
      ubah("turun.", ...MR.map((id) => ({ id, op: 0.3 }))),
      tambah("Tujuh", ...kalimatC("k1", 80, 150, ["7", KURANG, "3", "=", "4"], 14, 20)),
    ),
    k(SUARA_K2, ubah(0, ...MR.map((id) => ({ id, op: 1 }))), ubah("biru", ...BL.map((id) => ({ id, op: 0.3 }))), tambah("tujuh", ...kalimatC("k2", 220, 150, ["7", KURANG, "4", "=", "3"], 14, 20))),
    k(
      SUARA_K3,
      ubah(0, ...BL.map((id) => ({ id, op: 1 }))),
      tambah("keluarga", teks("kl", 150, 96, "keluarga: 3, 4, 7", 10, W.ungu)),
      tambah("penjumlahan", ...kalimatC("k3", 80, 122, ["4", "+", "3", "=", "7"], 14, 20), ...kalimatC("k4", 220, 122, ["3", "+", "4", "=", "7"], 14, 20)),
      sorotkan("pengurangan.", "k10", "k20"),
    ),
    k(SUARA_K4, tambah("Tiga", teks("tb", 150, 184, `3 ${KURANG} 7 tidak bisa`, 11, W.merah)), sorotkan("banyak.", ...MR)),
  ],
};
