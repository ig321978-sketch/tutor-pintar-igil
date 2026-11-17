import type { AdeganStory, Obj } from "./logika-story";
import { E, W, cxAq, emo, judul, kartu, labelNomor, nyala, orang, pakan, rakKayu, rakLengkap, rentang, teks, akuariumKecil, yPenunjuk } from "./k1b5b-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5b-bantu";

/*
 * Cerita orisinal IGIL "Rak Akuarium Bernomor" (Kelas 1 Bab 5 Sub-Bab B, menghitung maju dan mundur), lanjutan Akuarium Ikan Hias Abang.
 * Masalah: dua puluh akuarium kecil di rak dua tingkat harus diberi pakan berurutan tanpa terlewat atau berulang, dan lampunya diperiksa dari ujung.
 * Penyelesaian: Igil menghitung maju dari delapan sampai lima belas, Kaka menghitung mundur dari dua puluh sampai dua belas.
 */

/** Jejak hitungan di bawah rak: angka ke-i `j{n}`. */
const xJejak = (i: number): number => 52 + i * 25;
const jejak = (n: number, i: number, warna: string = W.merah): Obj => teks(`j${n}`, xJejak(i), 172, String(n), 10, warna);

/* ------------------------------ 1. Rak akuarium bernomor ------------------------------ */
const SUARA_R1 = "Pagi ini dua puluh akuarium kecil berjajar di rak dua tingkat. Rak atas bernomor satu sampai sepuluh, rak bawah sebelas sampai dua puluh.";
const SUARA_R2 = "Kata Abang, pakan harus berurutan. Kalau terlewat, ikannya lapar. Kalau berulang, ikannya kekenyangan!";
const SUARA_R3 = "Lampu juga harus diperiksa dari ujung rak. Tanya Mamah, mulai nomor berapa, ke arah mana?";

export const ADEGAN_RAK: AdeganStory = {
  id: "rak-pagi",
  judul: "Rak akuarium bernomor",
  sumber: "Materi: masalah pakan dan lampu",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Rak akuarium bernomor"), ...rakKayu("rk")),
      tambah("akuarium", ...rentang(1, 20).flatMap(akuariumKecil), teks("jm", 150, 172, "20 akuarium kecil", 10, W.ungu)),
      tambah("tingkat.", teks("tk2", 150, 190, "rak 2 tingkat", 9, W.coklat)),
      sorotkan("tingkat.", "rk-pa", "rk-pb"),
      tambah("atas", ...rentang(1, 10).flatMap(labelNomor)),
      tambah("bawah", ...rentang(11, 20).flatMap(labelNomor)),
    ),
    k(
      SUARA_R2,
      hapus(0, "jm", "tk2"),
      tambah("Abang", ...orang("ab", 24, 182, E.abang, "Abang")),
      tambah("pakan", emo("pkn", 66, 182, E.pakan, 22)),
      tambah("berurutan,", ...kartu("ur", 100, 154, 110, 20, W.krem, ["berurutan"], 9.4)),
      tambah("terlewat", teks("tl", 155, 184, "tidak terlewat", 8.6, W.ungu)),
      tambah("berulang.", teks("bu", 155, 196, "tidak berulang", 8.6, W.ungu)),
    ),
    k(
      SUARA_R3,
      hapus(0, "ur-k", "ur-t0", "tl", "bu", "pkn", "ab", "ab-n"),
      sorotkan("Lampu", ...rentang(1, 20).map((n) => `lm${n}`)),
      tambah("ujung", emo("sn0", 26, 176, E.senter, 18), emo("sn1", 276, 176, E.senter, 18)),
      sorotkan("ujung", "aq1", "aq20"),
      tambah("berapa,", teks("tq", 150, 168, "mulai nomor ?", 10, W.merah)),
      tambah("arah", { id: "pa", t: "panah", x: 136, y: 186, x2: -60, y2: 0, warna: W.ungu, tebal: 2.4 }, { id: "pb", t: "panah", x: 164, y: 186, x2: 60, y2: 0, warna: W.merah, tebal: 2.4 }),
    ),
  ],
};

/* ------------------------------ 2. Menghitung maju ------------------------------ */
const SUARA_M1 = "Igil memberi pakan mulai dari akuarium delapan. Menghitung maju berarti bilangannya bertambah satu demi satu.";
const SUARA_M2 = "Delapan, sembilan, sepuluh. Igil langsung turun ke dua belas! Kata Kaka, sebelas terlewat.";
const SUARA_M3 = "Sebelas, dua belas, tiga belas, empat belas, lima belas. Delapan akuarium sudah mendapat pakan.";
const MAJU = rentang(8, 15);
/** Tiap kata bilangan: pakan berpindah ke atas akuarium n, butir pakan masuk, dan angka n tampil di jejak. */
const beriPakan = (suara: string, daftar: number[], ke0: number, setelah?: string) =>
  urutBilangan(suara, daftar, setelah).flatMap((p, j) => {
    const n = daftar[j];
    return [ubah(p, { id: "sd", x: cxAq(n), y: yPenunjuk(n) }), tambah(p, ...pakan(n), jejak(n, ke0 + j))];
  });

export const ADEGAN_MAJU: AdeganStory = {
  id: "hitung-maju",
  judul: "Menghitung maju",
  sumber: "Materi: menghitung maju",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Menghitung maju"), ...rakLengkap()),
      tambah("Igil", ...orang("ig", 22, 182, E.igil, "Igil")),
      tambah("pakan", emo("sd", cxAq(8), yPenunjuk(8), E.pakan, 13)),
      sorotkan("delapan.", "aq8", "no8"),
      tambah("maju", teks("cap", 160, 194, "maju: bertambah 1", 9, W.hijau)),
      tambah("demi", { id: "pm", t: "panah", x: 110, y: 160, x2: 50, y2: 0, warna: W.hijau, tebal: 2.4 }),
    ),
    k(
      SUARA_M2,
      hapus(0, "pm"),
      ...beriPakan(SUARA_M2, rentang(8, 10), 0),
      tambah("dua", teks("sl", 150, 36, "10 ke 12? 11 terlewat", 9, W.merah)),
      tambah("turun", { id: "tr", t: "panah", x: cxAq(10), y: 96, x2: cxAq(11) - cxAq(10), y2: 8, warna: W.merah, tebal: 2, putus: true }),
    ),
    k(
      SUARA_M3,
      hapus(0, "tr", "sl"),
      ...beriPakan(SUARA_M3, rentang(11, 15), 3),
      ubah(idx(SUARA_M3, "Delapan"), { id: "cap", isi: "8 akuarium dapat pakan" }),
      sorotkan(idx(SUARA_M3, "pakan."), ...MAJU.map((n) => `pk${n}`)),
    ),
  ],
};

/* ------------------------------ 3. Menghitung mundur ------------------------------ */
const SUARA_D1 = "Kaka memeriksa lampu dari ujung rak bawah, mulai dua puluh. Menghitung mundur berarti bilangannya berkurang satu demi satu.";
const SUARA_D2 = "Dua puluh, sembilan belas, delapan belas, tujuh belas, enam belas. Lampu yang diperiksa dinyalakan.";
const SUARA_D3 = "Lima belas, empat belas, tiga belas, dua belas. Kaka berhenti di dua belas.";
/** Tiap kata bilangan: senter berpindah ke akuarium n, lampunya menyala, dan angka n tampil di jejak. */
const periksaLampu = (suara: string, daftar: number[], ke0: number) =>
  urutBilangan(suara, daftar).flatMap((p, j) => {
    const n = daftar[j];
    return [ubah(p, { id: "sn", x: cxAq(n), y: yPenunjuk(n) }, nyala(n)), tambah(p, jejak(n, ke0 + j, W.ungu))];
  });

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "hitung-mundur",
  judul: "Menghitung mundur",
  sumber: "Materi: menghitung mundur",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Menghitung mundur"), ...rakLengkap(), ...MAJU.flatMap(pakan)),
      tambah("Kaka", ...orang("kk", 278, 182, E.kaka, "Kaka")),
      tambah("lampu", emo("sn", cxAq(20), yPenunjuk(20), E.senter, 13)),
      sorotkan("puluh.", "aq20", "no20"),
      tambah("mundur", teks("cap", 150, 194, "mundur: berkurang 1", 9, W.ungu)),
      tambah("demi", { id: "pm", t: "panah", x: 200, y: 160, x2: -50, y2: 0, warna: W.ungu, tebal: 2.4 }),
    ),
    k(SUARA_D2, hapus(0, "pm"), ...periksaLampu(SUARA_D2, rentang(20, 16), 0), sorotkan("dinyalakan.", ...rentang(16, 20).map((n) => `lm${n}`))),
    k(
      SUARA_D3,
      ...periksaLampu(SUARA_D3, rentang(15, 12), 5),
      sorotkan(idx(SUARA_D3, "berhenti"), "aq12", "no12", "j12"),
      tambah(idx(SUARA_D3, "berhenti"), emo("st", 252, 162, E.benar, 12)),
    ),
  ],
};
