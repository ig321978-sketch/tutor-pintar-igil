import type { AdeganStory, Obj } from "./logika-story";
import { W, hasil, judul, kartuBilangan, kepalaGenap, kotak, meja, tanda, teks } from "./k2b5B-gambar";
import { bersihMeja, duaTempat, idx, k, mejaSekaligus, pindah, redamBenda, redamkan, sorotkan, tambah, urutKata } from "./k2b5B-bantu";
import { gantian } from "./k2b5B-materi-2";

/* ------------------------------ 8. Pola setengah dari empat sampai sepuluh ------------------------------ */
export const POLA: { n: number; s: number }[] = [
  { n: 4, s: 2 },
  { n: 6, s: 3 },
  { n: 8, s: 4 },
  { n: 10, s: 5 },
];
export const CY_POLA = [62, 92, 122, 152];
const pitaBaris = (): Obj[] => CY_POLA.map((cy, j) => kotak(`pr${j + 1}`, 14, cy - 17, 272, 28, j % 2 === 0 ? W.krem : W.hijauMuda, W.biru, { rx: 6, tebal: 1.2, z: 0 }));
export const barisN = (j: number): Obj[] => [teks(`p${j + 1}-n`, 70, CY_POLA[j] + 1, String(POLA[j].n), 18, W.biru, { z: 3 }), teks(`p${j + 1}-a`, 150, CY_POLA[j] + 1, "→", 16, W.ungu, { z: 3 })];
export const barisS = (j: number): Obj => teks(`p${j + 1}-s`, 230, CY_POLA[j] + 1, String(POLA[j].s), 18, W.merah, { z: 3 });
/** Selisih antarbaris: "+2" di kiri untuk seluruhnya, "+1" di kanan untuk setengahnya. */
export const selisih = (apa: "n" | "s", j: number): Obj => teks(`d${j + 1}-${apa}`, apa === "n" ? 30 : 270, (CY_POLA[j] + CY_POLA[j + 1]) / 2 + 5, apa === "n" ? "+2" : "+1", 11, W.hijau, { z: 3 });
export const kepalaPola = (): Obj[] => [teks("ph1", 70, 40, "Seluruhnya", 9, W.ungu, { z: 3 }), teks("ph2", 230, 40, "Setengahnya", 9, W.ungu, { z: 3 })];
/** Seluruh tabel pola sekaligus (dipakai ringkasan penutup). */
export const semuaPola = (): Obj[] => [...kepalaPola(), ...pitaBaris(), ...POLA.flatMap((_, j) => [...barisN(j), barisS(j)])];

const SUARA_G1 = "Ayo kita cari pola setengah. Setengah dari empat adalah dua.";
const SUARA_G2 = "Setengah dari enam adalah tiga, dan setengah dari delapan adalah empat.";
const SUARA_G3 = "Terakhir, setengah dari sepuluh adalah lima.";
const SUARA_G4 = "Lihat bilangan di kiri: empat, enam, delapan, sepuluh. Setiap pindah ke bawah, bilangannya bertambah dua.";
const SUARA_G5 = "Sekarang lihat setengahnya: dua, tiga, empat, lima. Bilangannya bertambah satu. Jadi polanya naik satu-satu.";

export const ADEGAN_POLA_SETENGAH: AdeganStory = {
  id: "pola-setengah",
  judul: "Pola setengah dari empat sampai sepuluh",
  sumber: "Materi: pola setengah bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Pola setengah"), kepalaPola(), pitaBaris()), tambah(idx(SUARA_G1, "empat"), barisN(0)), tambah(idx(SUARA_G1, "dua"), barisS(0))),
    k(SUARA_G2, tambah(idx(SUARA_G2, "enam"), barisN(1)), tambah(idx(SUARA_G2, "tiga"), barisS(1)), tambah(idx(SUARA_G2, "delapan"), barisN(2)), tambah(idx(SUARA_G2, "empat"), barisS(2))),
    k(SUARA_G3, tambah(idx(SUARA_G3, "sepuluh"), barisN(3)), tambah(idx(SUARA_G3, "lima"), barisS(3))),
    k(SUARA_G4, sorotkan(idx(SUARA_G4, "kiri:"), "p1-n", "p2-n", "p3-n", "p4-n"), tambah(idx(SUARA_G4, "bertambah"), selisih("n", 0), selisih("n", 1), selisih("n", 2))),
    k(SUARA_G5, redamkan(0, "p1-n", "p2-n", "p3-n", "p4-n"), sorotkan(idx(SUARA_G5, "setengahnya:"), "p1-s", "p2-s", "p3-s", "p4-s"), tambah(idx(SUARA_G5, "bertambah"), selisih("s", 0), selisih("s", 1), selisih("s", 2))),
  ],
};

/* ------------------------------ 9. Lima kelereng: tersisa satu ------------------------------ */
const SUARA_H1 = "Sekarang Malosi punya lima kelereng. Ia ingin memberi setengahnya kepada Upe.";
const SUARA_H2 = "Kita bagi bergantian: satu untuk Upe, satu untuk Malosi, satu untuk Upe, satu untuk Malosi.";
const SUARA_H3 = "Sekarang Upe punya dua kelereng dan Malosi punya dua kelereng. Di meja tersisa satu kelereng.";
const SUARA_H4 = "Kalau kelereng terakhir diberikan kepada Upe, Upe mendapat tiga kelereng dan Malosi dua kelereng. Jumlahnya tidak sama banyak.";
const SUARA_H5 = "Jadi lima kelereng tidak bisa dibagi dua sama banyak. Lima tidak punya setengah yang utuh.";
const nama2 = (suara: string, banyak: number) =>
  Array.from({ length: banyak }, (_, n) => ({ at: idx(suara, n % 2 === 0 ? "Upe" : "Malosi", Math.floor(n / 2) + 1), n, ke: n % 2 === 0 ? ("pa" as const) : ("pb" as const) }));

export const ADEGAN_GANJIL_LIMA: AdeganStory = {
  id: "ganjil-lima",
  judul: "Lima kelereng tidak punya setengah utuh",
  sumber: "Materi: banyak benda ganjil",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Lima kelereng"), meja()), mejaSekaligus(idx(SUARA_H1, "lima"), 5, "kelereng")),
    k(SUARA_H2, duaTempat(idx(SUARA_H2, "bergantian"), "Upe", "Malosi"), ...pindah("kelereng", 5, nama2(SUARA_H2, 4))),
    k(SUARA_H3, redamBenda(0, "pa", 2, "kelereng"), redamBenda(0, "pb", 2, "kelereng"), sorotkan(idx(SUARA_H3, "tersisa"), "mj_4_kelereng"), tambah(idx(SUARA_H3, "tersisa"), tanda(false))),
    k(SUARA_H4, ...pindah("kelereng", 5, [{ at: idx(SUARA_H4, "Upe"), n: 4, ke: "pa" }], { mj: 1, pa: 2, pb: 2 }), bersihMeja(idx(SUARA_H4, "Jumlahnya"))),
    k(SUARA_H5, redamBenda(0, "pa", 3, "kelereng"), tambah(idx(SUARA_H5, "Lima", 2), ...hasil("hs", "5 tidak punya setengah utuh", W.merahMuda))),
  ],
};

/* ------------------------------ 10. Tujuh bola: tersisa satu ------------------------------ */
const SUARA_I1 = "Wei punya tujuh bola. Apakah bola itu bisa dibagi dua sama banyak?";
const SUARA_I2 = "Kita coba bagi bergantian: kiri, kanan, kiri, kanan, kiri, kanan.";
const SUARA_I3 = "Di meja tersisa satu bola. Kiri berisi tiga bola, kanan juga berisi tiga bola.";
const SUARA_I4 = "Satu bola itu tidak bisa dibagi lagi. Jadi tujuh bola tidak bisa dibagi dua sama banyak.";

export const ADEGAN_GANJIL_TUJUH: AdeganStory = {
  id: "ganjil-tujuh",
  judul: "Tujuh bola dibagi dua",
  sumber: "Materi: tujuh bola dibagi dua",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Bola Wei"), meja()), mejaSekaligus(idx(SUARA_I1, "tujuh"), 7, "bola")),
    k(SUARA_I2, duaTempat(idx(SUARA_I2, "bergantian"), "Kiri", "Kanan"), ...pindah("bola", 7, gantian(SUARA_I2, 6))),
    k(SUARA_I3, redamBenda(0, "pa", 3, "bola"), redamBenda(0, "pb", 3, "bola"), sorotkan(idx(SUARA_I3, "tersisa"), "mj_6_bola"), tambah(idx(SUARA_I3, "Kiri"), tanda(false))),
    k(SUARA_I4, sorotkan(idx(SUARA_I4, "tidak"), "tanda", "mj-jml")),
  ],
};

/* ------------------------------ 11. Bilangan genap dan ganjil ------------------------------ */
export const GENAP = [2, 4, 6, 8, 10];
export const GANJIL = [3, 5, 7, 9];
const SUARA_J1 = "Ada bilangan yang bisa dibagi dua sama banyak. Kita sebut bilangan genap.";
const SUARA_J2 = "Dua, empat, enam, delapan, dan sepuluh adalah bilangan genap.";
const SUARA_J3 = "Ada juga bilangan yang tersisa satu kalau dibagi dua. Kita sebut bilangan ganjil.";
const SUARA_J4 = "Tiga, lima, tujuh, dan sembilan adalah bilangan ganjil.";
const SUARA_J5 = "Jadi bilangan genap bisa dibagi dua sama banyak, dan bilangan ganjil selalu tersisa satu.";
const NAMA_GENAP = ["dua", "empat", "enam", "delapan", "sepuluh"];
const NAMA_GANJIL = ["tiga", "lima", "tujuh", "sembilan"];

export const ADEGAN_GENAP_GANJIL: AdeganStory = {
  id: "genap-ganjil",
  judul: "Bilangan genap dan bilangan ganjil",
  sumber: "Materi: bilangan genap dan ganjil",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Genap dan ganjil")), tambah(idx(SUARA_J1, "genap"), kepalaGenap()[0])),
    k(SUARA_J2, ...GENAP.map((n, i) => tambah(urutKata(SUARA_J2, NAMA_GENAP)[i], kartuBilangan(n)))),
    k(SUARA_J3, tambah(idx(SUARA_J3, "ganjil"), kepalaGenap()[1])),
    k(SUARA_J4, ...GANJIL.map((n, i) => tambah(urutKata(SUARA_J4, NAMA_GANJIL)[i], kartuBilangan(n)))),
    k(SUARA_J5, sorotkan(idx(SUARA_J5, "genap"), "gh1"), sorotkan(idx(SUARA_J5, "ganjil"), "gh2")),
  ],
};
