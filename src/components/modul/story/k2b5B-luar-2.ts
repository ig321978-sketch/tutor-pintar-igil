import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kotak, neraca, rumput, teks, tokoh, tomat, tunas, ubahNeraca } from "./k2b5B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b5B-bantu";
import { NAMA_METODE_ID } from "./k2b5B-luar-1";

/*
 * Video metode global Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak". Naskah suara dari naskah/story-naskah-k2b5b.md.
 * Bagian ini: Neraca Seimbang dan terapannya, Cek Dua Kali Lipat dan terapannya, serta ringkasan.
 */

const CX = 150;
const YB = 70;
/** Benda di piringan kiri dan kanan pada neraca seimbang (y = di atas piringan). */
const dL = (i: number) => ({ x: 84 + 12 * i, y: 79 });
const dR = (i: number) => ({ x: 192 + 12 * i, y: 79 });

/* ------------------------------ Neraca Seimbang: konsep ------------------------------ */
const SUARA_N1 = "Cara kedua, Balance Scale, atau Neraca Seimbang. Neraca ini mirip timbangan di pasar.";
const SUARA_N2 = "Taruh satu tumpukan di piringan kiri dan satu tumpukan di piringan kanan.";
const SUARA_N3 = "Kalau neraca seimbang, kedua tumpukan sama banyak, dan kita tidak perlu menghitung lagi.";
const SUARA_N4 = "Kalau satu piringan turun, tumpukan di piringan itu lebih banyak.";

export const ADEGAN_LUAR_NERACA: AdeganStory = {
  id: "luar-neraca",
  judul: "Balance Scale: Neraca Seimbang",
  sumber: "Metode global: Neraca Seimbang",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Neraca Seimbang"), teks("no", 150, 46, "2", 22, W.merah), rumput("rm", 148)),
      tambah(idx(SUARA_N1, "Neraca"), ...neraca("nr", CX, YB, 0)),
      tambah(idx(SUARA_N1, "timbangan"), emo("tb", 250, 116, E.neraca, 24)),
      tambah(idx(SUARA_N1, "pasar."), emo("ps", 52, 120, "\u{1F9FA}", 24)),
    ),
    k(
      SUARA_N2,
      hapus(0, "tb", "ps"),
      tambah(idx(SUARA_N2, "satu"), ...[0, 1, 2].map((i) => tunas(`l${i}`, dL(i).x, dL(i).y, 5)), teks("t1", 96, 54, "1", 13, W.merah)),
      sorotkan(idx(SUARA_N2, "kiri"), "l0", "l1", "l2"),
      tambah(idx(SUARA_N2, "satu", 2), ...[0, 1, 2].map((i) => tunas(`r${i}`, dR(i).x, dR(i).y, 5)), teks("t2", 204, 54, "1", 13, W.merah)),
      sorotkan(idx(SUARA_N2, "kanan."), "r0", "r1", "r2"),
    ),
    k(
      SUARA_N3,
      ubah(0, { id: "l0", sorot: false }, { id: "l1", sorot: false }, { id: "l2", sorot: false }, { id: "r0", sorot: false }, { id: "r1", sorot: false }, { id: "r2", sorot: false }),
      tambah(idx(SUARA_N3, "seimbang,"), emo("ok", 150, 50, E.benar, 18)),
      sorotkan(idx(SUARA_N3, "kedua"), "nr-pl", "nr-pr"),
      tambah(idx(SUARA_N3, "sama"), teks("sm", 150, 166, "sama banyak", 10, W.hijau)),
      tambah(idx(SUARA_N3, "menghitung"), teks("tp", 150, 184, "tidak perlu dihitung lagi", 9, W.ungu)),
    ),
    k(
      SUARA_N4,
      hapus(0, "ok", "sm", "tp"),
      ubah(0, { id: "nr-pl", sorot: false }, { id: "nr-pr", sorot: false }),
      tambah(0, tunas("l3", 120, 79, 5), teks("p1", 150, 166, "1 piringan turun", 9.6, W.merah)),
      ubah(idx(SUARA_N4, "turun,"), ...ubahNeraca("nr", CX, YB, 8), ...[0, 1, 2, 3].map((i) => ({ id: `l${i}`, y: 87 })), ...[0, 1, 2].map((i) => ({ id: `r${i}`, y: 71 })), { id: "t1", y: 62 }, { id: "t2", y: 46 }),
      sorotkan(idx(SUARA_N4, "tumpukan"), "l0", "l1", "l2", "l3"),
      tambah(idx(SUARA_N4, "banyak."), teks("lb", 56, 134, "lebih banyak", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ Neraca Seimbang: terapan ------------------------------ */
const SUARA_NT1 = "Dika menaruh tiga tomat sama ukuran di tiap piringan, dan neraca seimbang.";
const SUARA_NT2 = "Lalu ia menambah satu tomat di kiri, dan piringan kiri turun.";
const SUARA_NT3 = "Cocok kalau kita ingin memeriksa dua tumpukan yang sudah dibagi.";
const SUARA_NT4 = "Kurang cocok kalau bendanya berbeda ukuran, karena berat yang sama belum tentu banyak yang sama.";

export const ADEGAN_LUAR_NERACA_TERAPAN: AdeganStory = {
  id: "luar-neraca-terapan",
  judul: "Neraca Seimbang dipakai untuk tomat",
  sumber: "Metode global: terapan Neraca Seimbang",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_NT1,
      tambah(0, judul("Tomat di Neraca", W.merah), rumput("rm", 148), ...neraca("nr", CX, YB, 0), ...tokoh("dk", 262, 176, "Dika")),
      tambah(idx(SUARA_NT1, "tiga"), ...[0, 1, 2].map((i) => tomat(`l${i}`, dL(i).x, dL(i).y - 1, 6)), teks("tl", 96, 52, "3 tomat", 8.6, W.merah)),
      tambah(idx(SUARA_NT1, "sama"), teks("su", 150, 166, "sama ukuran", 9.6, W.ungu)),
      tambah(idx(SUARA_NT1, "tiap"), ...[0, 1, 2].map((i) => tomat(`r${i}`, dR(i).x, dR(i).y - 1, 6)), teks("tr", 204, 52, "3 tomat", 8.6, W.merah)),
      tambah(idx(SUARA_NT1, "seimbang."), emo("ok", 150, 50, E.benar, 18)),
    ),
    k(
      SUARA_NT2,
      hapus(0, "ok"),
      tambah(idx(SUARA_NT2, "menambah"), teks("p1", 150, 36, "+ 1 tomat", 9.6, W.merah)),
      tambah(idx(SUARA_NT2, "satu"), tomat("l3", 96, 40, 6)),
      ubah(idx(SUARA_NT2, "kiri,"), { id: "l3", x: 120, y: 78 }),
      ubah(idx(SUARA_NT2, "turun."), ...ubahNeraca("nr", CX, YB, 8), ...[0, 1, 2, 3].map((i) => ({ id: `l${i}`, y: 86 })), ...[0, 1, 2].map((i) => ({ id: `r${i}`, y: 70 })), { id: "tl", isi: "4 tomat", y: 60 }, { id: "tr", y: 44 }),
      tambah(idx(SUARA_NT2, "piringan"), emo("pk", 44, 120, E.tabrak, 16)),
    ),
    k(
      SUARA_NT3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 30, 38, 240, 28, W.hijauMuda, ["Cocok: memeriksa tumpukan"], 10)),
      tambah(idx(SUARA_NT3, "dua"), ...[0, 1, 2, 3].map((i) => tunas(`a${i}`, 50 + 16 * i, 106, 6)), ...[0, 1, 2, 3].map((i) => tunas(`c${i}`, 190 + 16 * i, 106, 6)), teks("n2", 150, 140, "2 tumpukan", 10, W.merah)),
      tambah(idx(SUARA_NT3, "tumpukan"), teks("eq", 150, 110, "=", 24, W.hijau)),
      tambah(idx(SUARA_NT3, "dibagi."), emo("ok", 150, 168, E.benar, 20)),
    ),
    k(
      SUARA_NT4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?", W.merah), ...kartu("kc", 30, 38, 240, 28, W.merahMuda, ["Kurang cocok: beda ukuran"], 10)),
      tambah(idx(SUARA_NT4, "berbeda"), tomat("bs", 90, 112, 16), ...[0, 1, 2].map((i) => tomat(`kc${i}`, 190 + 16 * i, 118, 5))),
      tambah(idx(SUARA_NT4, "berat"), garis("gb", 108, 112, 66, 0, W.biru, 2), teks("bt", 150, 100, "berat sama", 9, W.ungu)),
      tambah(idx(SUARA_NT4, "belum"), emo("qm", 150, 140, E.tanya, 22)),
      tambah(idx(SUARA_NT4, "sama.", 2), emo("no", 150, 172, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Cek Dua Kali Lipat: konsep ------------------------------ */
const SUARA_K1 = "Cara ketiga, Doubling Check, atau Cek Dua Kali Lipat. Cara ini dipakai di akhir.";
const SUARA_K2 = "Kalau sudah menemukan setengahnya, gandakan bilangan itu, atau jumlahkan dengan dirinya sendiri.";
const SUARA_K3 = "Dua kali setengahnya sama dengan seluruhnya.";
const SUARA_K4 = "Kalau hasilnya tidak sama dengan banyak semula, berarti pembagiannya salah.";

export const ADEGAN_LUAR_KALI: AdeganStory = {
  id: "luar-kali",
  judul: "Doubling Check: Cek Dua Kali Lipat",
  sumber: "Metode global: Cek Dua Kali Lipat",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cek Dua Kali Lipat", W.ungu), teks("no", 150, 54, "3", 24, W.merah)),
      tambah(idx(SUARA_K1, "Doubling"), ...kartu("kl", 70, 72, 160, 40, W.krem, ["Cek 2 kali lipat"], 12)),
      tambah(idx(SUARA_K1, "Lipat."), emo("ul", 150, 140, E.ulang, 24)),
      tambah(idx(SUARA_K1, "akhir."), teks("ak", 150, 172, "dipakai di akhir", 10, W.ungu)),
    ),
    k(
      SUARA_K2,
      hapus(0, "ak", "ul", "kl-k", "kl-t0", "no"),
      tambah(idx(SUARA_K2, "setengahnya,"), ...[0, 1, 2].map((i) => tunas(`a${i}`, 54 + 16 * i, 110, 6)), teks("sg", 78, 90, "setengah", 9, W.ungu)),
      tambah(idx(SUARA_K2, "gandakan"), ...[0, 1, 2].map((i) => tunas(`c${i}`, 198 + 16 * i, 110, 6)), emo("ud", 222, 138, E.ulang, 16)),
      tambah(idx(SUARA_K2, "jumlahkan"), teks("pl", 150, 114, "+", 24, W.merah), teks("fm", 150, 160, "3 + 3", 13, W.merah)),
      sorotkan(idx(SUARA_K2, "sendiri."), "a0", "a1", "a2", "c0", "c1", "c2"),
    ),
    k(
      SUARA_K3,
      hapus(0, "ud", "fm"),
      ubah(0, { id: "a0", sorot: false }, { id: "a1", sorot: false }, { id: "a2", sorot: false }, { id: "c0", sorot: false }, { id: "c1", sorot: false }, { id: "c2", sorot: false }),
      tambah(0, teks("d2", 150, 50, "2 x setengah", 11, W.merah)),
      tambah(idx(SUARA_K3, "sama"), teks("eq", 150, 146, "=", 22, W.hijau)),
      tambah(idx(SUARA_K3, "seluruhnya."), ...kartu("sl", 100, 156, 100, 26, W.hijauMuda, ["seluruhnya"], 10.5)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Hasil Tidak Cocok", W.merah)),
      tambah(idx(SUARA_K4, "hasilnya"), teks("hs", 84, 60, "hasil: 4 + 4 = 8", 10, W.biru), ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tunas(`h${i}`, 46 + 11 * i, 84, 4.4))),
      tambah(idx(SUARA_K4, "tidak"), emo("no", 150, 112, E.salah, 22)),
      tambah(idx(SUARA_K4, "semula,"), teks("sm", 224, 60, "semula: 10", 10, W.biru), ...Array.from({ length: 10 }, (_, i) => tunas(`s${i}`, 178 + 11 * i, 84, 4.4))),
      tambah(idx(SUARA_K4, "salah."), teks("sl", 150, 150, "pembagian salah", 10.5, W.merah)),
    ),
  ],
};

/* ------------------------------ Cek Dua Kali Lipat: terapan ------------------------------ */
const SUARA_KT1 = "Nia menemukan setengah dari sepuluh bibit adalah lima.";
const SUARA_KT2 = "Ia menggandakan lima menjadi sepuluh. Cocok dengan banyak semula!";
const SUARA_KT3 = "Cocok kalau kita sudah punya jawaban dan ingin memeriksanya dengan cepat.";
const SUARA_KT4 = "Kurang cocok kalau belum punya jawaban sama sekali, karena tidak ada yang digandakan.";
const BARIS_KT = (b: number, i: number) => ({ x: 28 + 15 * i, y: 76 + 22 * b });

export const ADEGAN_LUAR_KALI_TERAPAN: AdeganStory = {
  id: "luar-kali-terapan",
  judul: "Cek Dua Kali Lipat dipakai untuk sepuluh bibit",
  sumber: "Metode global: terapan Cek Dua Kali Lipat",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_KT1,
      tambah(0, judul("Sepuluh Bibit", W.ungu), ...tokoh("ni", 252, 176, "Nia")),
      tambah(idx(SUARA_KT1, "sepuluh"), ...[0, 1].flatMap((b) => [0, 1, 2, 3, 4].map((i) => tunas(`o${b}${i}`, BARIS_KT(b, i).x, BARIS_KT(b, i).y, 6))), teks("n10", 64, 52, "10 bibit", 9.6, W.merah)),
      tambah(idx(SUARA_KT1, "setengah"), garis("dv", 20, 87, 92, 0, W.merah, 1.6, { putus: true, z: 4 })),
      sorotkan(idx(SUARA_KT1, "adalah"), "o00", "o01", "o02", "o03", "o04"),
      tambah(idx(SUARA_KT1, "lima."), teks("n5", 200, 100, "5", 36, W.merah), teks("sg", 200, 124, "setengahnya", 9, W.ungu)),
    ),
    k(
      SUARA_KT2,
      ubah(0, { id: "o00", sorot: false }, { id: "o01", sorot: false }, { id: "o02", sorot: false }, { id: "o03", sorot: false }, { id: "o04", sorot: false }),
      hapus(0, "n5", "sg", "dv"),
      tambah(idx(SUARA_KT2, "lima"), ...[0, 1, 2, 3, 4].map((i) => tunas(`g0${i}`, 160 + 15 * i, 76, 6)), teks("t5", 198, 56, "5", 14, W.merah)),
      tambah(idx(SUARA_KT2, "menjadi"), ...[0, 1, 2, 3, 4].map((i) => tunas(`g1${i}`, 160 + 15 * i, 98, 6)), teks("kl", 150, 120, "x 2", 12, W.merah)),
      tambah(idx(SUARA_KT2, "sepuluh."), teks("t10", 198, 140, "10", 16, W.merah)),
      tambah(idx(SUARA_KT2, "Cocok"), emo("ok", 150, 100, E.benar, 20)),
    ),
    k(
      SUARA_KT3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 30, 38, 240, 28, W.hijauMuda, ["Cocok: sudah ada jawaban"], 10)),
      tambah(idx(SUARA_KT3, "jawaban"), ...kartu("jw", 100, 80, 100, 30, W.krem, ["jawabanku"], 11)),
      tambah(idx(SUARA_KT3, "memeriksanya"), emo("kc", 150, 140, E.kaca, 24)),
      tambah(idx(SUARA_KT3, "cepat."), emo("bl", 220, 140, "\u{26A1}", 24), emo("ok", 36, 56, E.benar, 14)),
    ),
    k(
      SUARA_KT4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?", W.merah), ...kartu("kc", 30, 38, 240, 28, W.merahMuda, ["Kurang cocok: belum ada jawaban"], 10)),
      tambah(idx(SUARA_KT4, "jawaban"), kotak("kk", 110, 80, 80, 36, "#F1F5F9", "#64748B", { putus: true, rx: 6 }), teks("qk", 150, 105, "?", 22, W.merah)),
      tambah(idx(SUARA_KT4, "sekali,"), emo("no", 36, 56, E.salah, 14)),
      tambah(idx(SUARA_KT4, "tidak"), emo("ul", 150, 150, E.ulang, 24)),
      tambah(idx(SUARA_KT4, "digandakan."), emo("x2", 178, 150, E.salah, 18)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya.";
const SUARA_R2 = "Ingin membagi benda yang bisa dipindahkan, pakai Bagi Satu-Satu. Ingin memeriksa dua tumpukan, pakai Neraca Seimbang.";
const SUARA_R3 = "Ingin memeriksa jawaban, pakai Cek Dua Kali Lipat. Apa pun caranya, dua bagian harus sama banyak.";
const SUARA_R4 = "Menurutmu, untuk memeriksa bahwa setengah dari delapan adalah empat, kamu pilih cara yang mana, dan mengapa?";
const WARNA_R = ["#BBF7D0", "#FDE68A", "#DDD6FE"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: pilih cara yang pas",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Pilih Cara yang Pas")),
      tambah(idx(SUARA_R1, "tiga"), teks("t3", 150, 40, "3 cara", 12, W.merah)),
      tambah(idx(SUARA_R1, "cara."), ...NAMA_METODE_ID.flatMap((m, i) => kartu(`r${i}`, 30, 52 + 40 * i, 240, 28, WARNA_R[i], [`${i + 1}. ${m}`], 10))),
      tambah(idx(SUARA_R1, "Mana"), emo("qm", 282, 100, E.tanya, 20)),
      sorotkan(idx(SUARA_R1, "tugasnya."), "r0-k", "r1-k", "r2-k"),
    ),
    k(
      SUARA_R2,
      ubah(0, { id: "r0-k", sorot: false }, { id: "r1-k", sorot: false }, { id: "r2-k", sorot: false }),
      hapus(0, "qm"),
      tambah(idx(SUARA_R2, "membagi"), emo("i0", 250, 70, E.tangan, 16), emo("i1", 250, 110, E.neraca, 16), emo("i2", 250, 150, E.ulang, 16)),
      sorotkan(idx(SUARA_R2, "Satu-Satu."), "r0-k"),
      sorotkan(idx(SUARA_R2, "memeriksa"), "r1-k"),
      sorotkan(idx(SUARA_R2, "Seimbang."), "r1-k"),
    ),
    k(
      SUARA_R3,
      ubah(0, { id: "r0-k", sorot: false }, { id: "r1-k", sorot: false }),
      sorotkan(idx(SUARA_R3, "jawaban,"), "r2-k"),
      tambah(idx(SUARA_R3, "Lipat."), emo("kc", 36, 190, E.kaca, 14)),
      tambah(idx(SUARA_R3, "bagian"), teks("bg", 150, 182, "2 bagian sama banyak", 10, W.hijau)),
      tambah(idx(SUARA_R3, "banyak."), emo("ok", 266, 184, E.benar, 16)),
    ),
    k(
      SUARA_R4,
      hapus(0, "kc", "bg", "ok"),
      ubah(0, { id: "r2-k", sorot: false }),
      tambah(idx(SUARA_R4, "setengah"), teks("q8", 150, 182, "setengah dari 8 = 4", 11, W.merah)),
      tambah(idx(SUARA_R4, "cara"), emo("c0", 282, 66, E.tanya, 16), emo("c1", 282, 106, E.tanya, 16), emo("c2", 282, 146, E.tanya, 16)),
      sorotkan(idx(SUARA_R4, "pilih"), "r0-k", "r1-k", "r2-k"),
      tambah(idx(SUARA_R4, "mengapa?"), emo("pk", 150, 172, E.pikir, 18)),
    ),
  ],
};
