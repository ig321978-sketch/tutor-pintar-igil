import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, WB, angka, bulat, emo, garisBilangan, glX, judul, kartu, panah, selKisi, teks } from "./k1b5b-gambar";
import { bersih, bilKe, hapus, idx, k, redamkan, sorotkan, tambah, ubah, urutBil } from "./k1b5b-bantu";

/* ------------------------------ 1. Ulat bilangan: bilangan yang hilang ------------------------------ */
const SUARA_U1 = "Wei bertemu ulat bilangan. Badan ulat bertanda sepuluh, sebelas, lalu ada satu bulatan yang kosong, dan tiga belas.";
const SUARA_U2 = "Bilangan apa yang hilang? Wei menghitung maju dari sepuluh. Sepuluh, sebelas, dua belas, tiga belas.";
const SUARA_U3 = "Bilangan yang hilang adalah dua belas, yaitu satu lebih dari sebelas dan satu kurang dari tiga belas.";
const SUARA_U4 = "Sekarang ulat yang lain. Badan ulat ini turun, lima belas, empat belas, lalu ada yang kosong, dan dua belas.";
const SUARA_U5 = "Wei menghitung mundur dari lima belas. Lima belas, empat belas, tiga belas, dua belas. Yang hilang adalah tiga belas.";
const SUARA_U6 = "Ulat terakhir bertanda tujuh belas, lalu satu bulatan kosong, lalu sembilan belas. Seret kartu delapan belas ke bulatan yang kosong.";

const UX = [45, 95, 145, 195];
/** Satu ruas badan ulat: bulatan `${id}{i}` dan angkanya `${id}t{i}` (null: kosong, tanda tanya). */
const ruas = (id: string, i: number, x: number, y: number, r: number, isi: number | null, warna: string): Obj[] => [
  bulat(`${id}${i}`, x, y, r, isi === null ? W.krem : warna, W.biru, { tebal: 1.8 }),
  teks(`${id}t${i}`, x, y + 5, isi === null ? "?" : String(isi), 14, isi === null ? W.merah : W.biru),
];
const kepala = (id: string, x: number, y: number, r: number): Obj[] => [bulat(`${id}-h`, x, y, r, W.hijau, W.biru, { tebal: 1.8 }), emo(`${id}-m`, x, y + 7, "\u{1F60A}", 20)];
const P_U1 = urutBil(SUARA_U1, [10, 11]);
const P_U1c = urutBil(SUARA_U1, [13], "kosong,");
const P_U2 = urutBil(SUARA_U2, [10, 11, 12, 13], "sepuluh.");
const P_U5 = urutBil(SUARA_U5, [15, 14, 13, 12], "mundur");

export const ADEGAN_ULAT: AdeganStory = {
  id: "ulat-hilang",
  judul: "Ulat bilangan yang hilang",
  sumber: "Materi: bilangan yang hilang pada deret",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Ulat bilangan"), ...kepala("ul", 245, 100, 24)),
      tambah(P_U1[0], ruas("ul", 0, UX[0], 100, 21, 10, WB.kuning)),
      tambah(P_U1[1], ruas("ul", 1, UX[1], 100, 21, 11, WB.kuning)),
      tambah("kosong,", ruas("ul", 2, UX[2], 100, 21, null, WB.kuning)),
      tambah(P_U1c[0], ruas("ul", 3, UX[3], 100, 21, 13, WB.kuning)),
    ),
    k(
      SUARA_U2,
      tambah(0, emo("ua", 150, 164, "\u{1F9D2}", 28), teks("ub", 190, 164, "Wei", 9)),
      sorotkan(P_U2[0], "ul0"),
      redamkan(P_U2[1], "ul0"),
      sorotkan(P_U2[1], "ul1"),
      redamkan(P_U2[2], "ul1"),
      sorotkan(P_U2[2], "ul2"),
      ubah(P_U2[2], { id: "ult2", isi: "12", warna: W.biru }, { id: "ul2", warna: W.hijauMuda }),
      redamkan(P_U2[3], "ul2"),
      sorotkan(P_U2[3], "ul3"),
    ),
    k(
      SUARA_U3,
      redamkan(0, "ul3"),
      sorotkan("dua", "ul2"),
      tambah("sebelas", panah("pa", 70, 138, 28, -10, W.hijau, 2.4), teks("ta", 70, 152, "satu lebih", 8.6, W.hijau)),
      tambah("kurang", panah("pb", 220, 138, -28, -10, W.merah, 2.4), teks("tb", 220, 152, "satu kurang", 8.6, W.merah)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Ulat yang lain"), ...kepala("um", 245, 100, 24)),
      tambah(idx(SUARA_U4, "lima"), ...ruas("um", 0, UX[0], 100, 21, 15, WB.biru)),
      tambah(idx(SUARA_U4, "empat"), ...ruas("um", 1, UX[1], 100, 21, 14, WB.biru)),
      tambah("kosong,", ...ruas("um", 2, UX[2], 100, 21, null, WB.biru)),
      tambah("dua", ...ruas("um", 3, UX[3], 100, 21, 12, WB.biru)),
    ),
    k(
      SUARA_U5,
      tambah(0, emo("uc", 150, 164, "\u{1F9D2}", 28), teks("ud", 190, 164, "Wei", 9)),
      sorotkan(P_U5[0], "um0"),
      redamkan(P_U5[1], "um0"),
      sorotkan(P_U5[1], "um1"),
      redamkan(P_U5[2], "um1"),
      sorotkan(P_U5[2], "um2"),
      ubah(P_U5[2], { id: "umt2", isi: "13", warna: W.biru }, { id: "um2", warna: W.hijauMuda }),
      redamkan(P_U5[3], "um2"),
      sorotkan(P_U5[3], "um3"),
      ubah("hilang", { id: "um3", sorot: false }),
      sorotkan("hilang", "um2"),
    ),
    k(
      SUARA_U6,
      bersih(0),
      tambah(0, judul("Ulat terakhir"), ...kepala("un", 264, 66, 22)),
      tambah(idx(SUARA_U6, "tujuh"), ...ruas("un", 0, 56, 66, 24, 17, WB.pink)),
      tambah("kosong,", ...ruas("un", 1, 130, 66, 24, null, WB.pink)),
      tambah("sembilan", ...ruas("un", 2, 204, 66, 24, 19, WB.pink)),
      tambah("Seret", ...angka("uk0", 40, 130, 16, 56, 48, W.krem, 22), ...angka("uk1", 122, 130, 18, 56, 48, W.krem, 22), ...angka("uk2", 204, 130, 20, 56, 48, W.krem, 22)),
      sorotkan("delapan", "uk1-k"),
      ubah(idx(SUARA_U6, "ke"), { id: "uk1-k", x: 102, y: 42, sorot: false }, { id: "uk1-t0", x: 130, y: 74 }),
      ubah("kosong.", { id: "unt1", isi: "" }),
    ),
  ],
};

/* ------------------------------ 2. Menghitung maju sampai dua puluh pada garis bilangan ------------------------------ */
const GY = 120;
const labelGL = (id: string, n: number): Obj => teks(`${id}t${n}`, glX(n), GY + 21, String(n), 9.6, W.biru);
const kodokDi = (n: number) => ({ id: "kd", x: glX(n), y: GY - 12 });
const kodok = (n: number): Obj => emo("kd", glX(n), GY - 12, "\u{1F438}", 24);

const SUARA_G1 = "Kita terus menghitung maju melewati sepuluh. Kodok melompat di garis bilangan, mulai dari sepuluh.";
const SUARA_G2 = "Sebelas, dua belas, tiga belas, empat belas, lima belas. Kodok melompat satu langkah, satu langkah.";
const SUARA_G3 = "Enam belas, tujuh belas, delapan belas, sembilan belas, dan dua puluh. Sampai di dua puluh!";
const SUARA_G4 = "Setelah sembilan belas, bilangan berikutnya adalah dua puluh. Dua puluh adalah bilangan terbesar yang kita hitung hari ini.";
const SUARA_G5 = "Lihat, semakin ke kanan, bilangannya semakin besar. Menghitung maju berjalan ke kanan.";
const SUARA_G6 = "Ucapkan lagi mengikuti suara guru. Sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh.";
const P_G2 = urutBil(SUARA_G2, [11, 12, 13, 14, 15]);
const P_G3 = urutBil(SUARA_G3, [16, 17, 18, 19, 20]);
const P_G6 = urutBil(SUARA_G6, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], "guru.");
const loncat = (p: number[], dari: number): Aksi[] => p.flatMap((q, i) => [tambah(q, labelGL("gl", dari + i)), ubah(q, kodokDi(dari + i))]);

export const ADEGAN_MAJU_DUA_PULUH: AdeganStory = {
  id: "sampai-dua-puluh",
  judul: "Menghitung maju sampai dua puluh",
  sumber: "Materi: maju sampai dua puluh",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Maju sampai dua puluh"), ...garisBilangan("gl", 10, 20, GY, (n) => n === 10)), tambah("Kodok", kodok(10)), sorotkan(idx(SUARA_G1, "sepuluh"), "glt10")),
    k(SUARA_G2, ...loncat(P_G2, 11)),
    k(SUARA_G3, ...loncat(P_G3, 16), tambah("Sampai", emo("ps", 270, 70, "\u{1F389}", 22))),
    k(
      SUARA_G4,
      hapus(0, "ps"),
      sorotkan("sembilan", "glt19"),
      redamkan("berikutnya", "glt19"),
      sorotkan("berikutnya", "glt20"),
      tambah("terbesar", ...kartu("bd", 80, 156, 140, 34, W.emas, ["bilangan terbesar: 20"], 10.5)),
    ),
    k(
      SUARA_G5,
      redamkan(0, "glt20"),
      hapus(0, "bd-k", "bd-t0"),
      tambah("kanan,", panah("pm", 40, 84, 200, 0, W.merah, 2.6)),
      tambah("Lihat,", teks("pk", 40, 74, "kecil", 9, W.merah)),
      tambah("besar.", teks("pb", 240, 74, "besar", 9, W.merah)),
      tambah("maju", teks("pj", 150, 176, "maju: ke kanan", 11, W.hijau)),
    ),
    k(
      SUARA_G6,
      hapus(0, "pm", "pk", "pb", "pj"),
      ubah(0, kodokDi(10)),
      ...P_G6.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `glt${9 + i}`)] : []), sorotkan(p, `glt${10 + i}`), ubah(p, kodokDi(10 + i))]),
    ),
  ],
};

/* ------------------------------ 3. Menghitung mundur dari dua puluh ------------------------------ */
const SUARA_H1 = "Sekarang kodok melompat ke arah sebaliknya. Kodok mulai dari dua puluh, di ujung kanan.";
const SUARA_H2 = "Sembilan belas, delapan belas, tujuh belas, enam belas, lima belas. Kodok melompat mundur.";
const SUARA_H3 = "Empat belas, tiga belas, dua belas, sebelas, sepuluh. Sampai di sepuluh!";
const SUARA_H4 = "Menghitung mundur berjalan ke kiri. Semakin ke kiri, bilangannya semakin kecil.";
const SUARA_H5 = "Namanya sama, tetapi urutannya berbalik. Maju dari sepuluh sampai dua puluh, mundur dari dua puluh sampai sepuluh.";
const SUARA_H6 = "Ucapkan lagi mengikuti suara guru. Dua puluh, sembilan belas, delapan belas, tujuh belas, enam belas, lima belas.";
const P_H2 = urutBil(SUARA_H2, [19, 18, 17, 16, 15]);
const P_H3 = urutBil(SUARA_H3, [14, 13, 12, 11, 10]);
const P_H6 = urutBil(SUARA_H6, [20, 19, 18, 17, 16, 15], "guru.");
const turun = (p: number[], dari: number): Aksi[] => p.flatMap((q, i) => [ubah(q, kodokDi(dari - i)), ...(i > 0 ? [redamkan(q, `glt${dari - i + 1}`)] : []), sorotkan(q, `glt${dari - i}`)]);

export const ADEGAN_MUNDUR_DUA_PULUH: AdeganStory = {
  id: "mundur-dua-puluh",
  judul: "Menghitung mundur dari dua puluh",
  sumber: "Materi: mundur dari dua puluh",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Mundur dari dua puluh")), tambah(0, ...garisBilangan("gl", 10, 20, GY)), tambah("Kodok", kodok(20)), sorotkan("dua", "glt20")),
    k(SUARA_H2, redamkan(0, "glt20"), ...turun(P_H2, 19)),
    k(SUARA_H3, redamkan(0, "glt15"), ...turun(P_H3, 14), tambah("Sampai", emo("ps", 40, 70, "\u{1F3C1}", 22))),
    k(
      SUARA_H4,
      hapus(0, "ps"),
      redamkan(0, "glt10"),
      tambah("kiri.", panah("pm", 240, 84, -200, 0, W.merah, 2.6)),
      tambah("kiri.", teks("pb", 240, 74, "besar", 9, W.merah), teks("pk", 40, 74, "kecil", 9, W.merah)),
      tambah("kecil.", teks("pj", 150, 176, "mundur: ke kiri", 11, W.merah)),
    ),
    k(
      SUARA_H5,
      hapus(0, "pm", "pk", "pb", "pj"),
      ubah(0, kodokDi(15)),
      tambah("Maju", panah("p1", 40, 82, 200, 0, W.hijau, 2.6), teks("p1t", 150, 72, "maju: 10 sampai 20", 10, W.hijau)),
      tambah("mundur,", panah("p2", 240, 164, -200, 0, W.merah, 2.6), teks("p2t", 150, 188, "mundur: 20 sampai 10", 10, W.merah)),
    ),
    k(
      SUARA_H6,
      hapus(0, "p1", "p1t", "p2", "p2t"),
      ubah(0, kodokDi(20)),
      tambah(0, emo("uc", 60, 70, "\u{1F4AC}", 28)),
      ...P_H6.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `glt${21 - i}`)] : []), sorotkan(p, `glt${20 - i}`), ubah(p, kodokDi(20 - i))]),
    ),
  ],
};

/* ------------------------------ 4. Garis bilangan dua arah ------------------------------ */
const SUARA_D1 = "Kita bisa maju dan mundur pada garis yang sama. Kodok berdiri di tiga belas.";
const SUARA_D2 = "Maju tiga langkah. Empat belas, lima belas, enam belas.";
const SUARA_D3 = "Kodok sampai di enam belas. Dari tiga belas maju tiga langkah, sampai di enam belas.";
const SUARA_D4 = "Sekarang mundur tiga langkah. Lima belas, empat belas, tiga belas.";
const SUARA_D5 = "Kodok kembali ke tiga belas. Maju tiga langkah lalu mundur tiga langkah, kodok kembali ke tempat semula.";
const SUARA_D6 = "Coba sendiri. Dari lima belas maju dua langkah, yaitu enam belas, tujuh belas. Kodok berhenti di tujuh belas.";
const P_D2 = urutBil(SUARA_D2, [14, 15, 16]);
const P_D4 = urutBil(SUARA_D4, [15, 14, 13]);
const P_D6 = urutBil(SUARA_D6, [16, 17], "yaitu");
const busur = (id: string, dari: number, ke: number, warna: string, label: string): Obj[] => [
  panah(id, glX(dari), GY - 40, glX(ke) - glX(dari), 0, warna, 2.4),
  teks(`${id}t`, (glX(dari) + glX(ke)) / 2, GY - 46, label, 9, warna),
];

export const ADEGAN_DUA_ARAH: AdeganStory = {
  id: "garis-dua-arah",
  judul: "Garis bilangan dua arah",
  sumber: "Materi: maju dan mundur pada garis bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Garis bilangan dua arah")), tambah("garis", ...garisBilangan("gl", 10, 20, GY)), tambah("Kodok", kodok(13)), sorotkan("tiga", "glt13")),
    k(
      SUARA_D2,
      redamkan(0, "glt13"),
      ...P_D2.flatMap((p, i) => [tambah(p, busur(`pj${i}`, 13 + i, 14 + i, W.hijau, String(i + 1))), ubah(p, kodokDi(14 + i))]),
    ),
    k(
      SUARA_D3,
      sorotkan("enam", "glt16"),
      tambah("Dari", ...kartu("kr", 70, 160, 160, 30, W.hijauMuda, ["dari 13 ke 16: maju"], 10.5)),
    ),
    k(
      SUARA_D4,
      hapus(0, "pj0", "pj0t", "pj1", "pj1t", "pj2", "pj2t", "kr-k", "kr-t0"),
      redamkan(0, "glt16"),
      ...P_D4.flatMap((p, i) => [tambah(p, busur(`pk${i}`, 16 - i, 15 - i, W.merah, String(i + 1))), ubah(p, kodokDi(15 - i))]),
    ),
    k(
      SUARA_D5,
      sorotkan("kembali", "glt13"),
      tambah("Maju", ...kartu("kb", 40, 160, 100, 30, W.hijauMuda, ["maju tiga"], 10.5)),
      tambah("mundur", ...kartu("kc", 160, 160, 100, 30, W.merahMuda, ["mundur tiga"], 10.5)),
    ),
    k(
      SUARA_D6,
      bersih(0),
      tambah(0, judul("Coba sendiri"), ...garisBilangan("gl", 10, 20, GY), kodok(15)),
      tambah("lima", ...kartu("kd2", 80, 160, 140, 30, W.krem, ["mulai di lima belas"], 10)),
      ...P_D6.flatMap((p, i) => [tambah(p, busur(`ph${i}`, 15 + i, 16 + i, W.hijau, String(i + 1))), ubah(p, kodokDi(16 + i))]),
      sorotkan(P_D6[1], "glt17"),
    ),
  ],
};

/* ------------------------------ 5. Kisi bilangan satu sampai dua puluh ------------------------------ */
const SUARA_K1 = "Tika dan Halim membuat kisi bilangan satu sampai dua puluh. Setiap baris berisi lima bilangan.";
const SUARA_K2 = "Baca dari kiri ke kanan. Satu, dua, tiga, empat, lima. Itu menghitung maju.";
const SUARA_K3 = "Sekarang baca dari kanan ke kiri. Lima, empat, tiga, dua, satu. Itu menghitung mundur.";
const SUARA_K4 = "Pada baris kedua, enam sampai sepuluh. Pada baris ketiga, sebelas sampai lima belas. Pada baris keempat, enam belas sampai dua puluh.";
const SUARA_K5 = "Kisi ini membantu kita. Kalau bilangannya naik, kita bergeser ke kanan. Kalau turun, kita bergeser ke kiri.";
const baris = (id: string, r: number) => Array.from({ length: 5 }, (_, i) => selKisi(id, r * 5 + i + 1)).flat();
const idBaris = (r: number): string[] => Array.from({ length: 5 }, (_, i) => `kik${r * 5 + i + 1}`);
const P_K2 = urutBil(SUARA_K2, [1, 2, 3, 4, 5], "kanan.");
const P_K3 = urutBil(SUARA_K3, [5, 4, 3, 2, 1], "kiri.");

export const ADEGAN_KISI: AdeganStory = {
  id: "kisi",
  judul: "Kisi bilangan satu sampai dua puluh",
  sumber: "Materi: kisi bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kisi bilangan")),
      tambah("Tika", baris("ki", 0)),
      tambah("kisi", baris("ki", 1)),
      tambah("satu", baris("ki", 2)),
      tambah("puluh.", baris("ki", 3)),
    ),
    k(
      SUARA_K2,
      tambah("Baca", panah("pm", 50, 31, 150, 0, W.hijau, 2.4)),
      ...P_K2.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `kik${i}`)] : []), sorotkan(p, `kik${i + 1}`)]),
    ),
    k(
      SUARA_K3,
      redamkan(0, "kik5"),
      ubah(0, { id: "pm", x: 200, x2: -150, warna: W.merah }),
      ...P_K3.flatMap((p, i) => [...(i > 0 ? [redamkan(p, `kik${6 - i}`)] : []), sorotkan(p, `kik${5 - i}`)]),
    ),
    k(
      SUARA_K4,
      redamkan(0, "kik1"),
      hapus(0, "pm"),
      sorotkan("kedua,", ...idBaris(1)),
      redamkan("ketiga,", ...idBaris(1)),
      sorotkan("ketiga,", ...idBaris(2)),
      redamkan("keempat,", ...idBaris(2)),
      sorotkan("keempat,", ...idBaris(3)),
    ),
    k(
      SUARA_K5,
      redamkan(0, ...idBaris(3)),
      tambah("kanan,", teks("rk", 275, 104, "kanan:", 9, W.hijau), teks("rk2", 275, 116, "maju", 9, W.hijau)),
      tambah("kiri.", teks("rl", 25, 104, "kiri:", 9, W.merah), teks("rl2", 25, 116, "mundur", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Melengkapi kisi yang kosong ------------------------------ */
const SUARA_KH1 = "Beberapa kotak pada kisi masih kosong. Kita temukan bilangan yang hilang dengan menghitung maju atau mundur.";
const SUARA_KH2 = "Kotak pertama ada di antara tiga dan lima. Setelah tiga, dengan menghitung maju, bilangannya empat.";
const SUARA_KH3 = "Kotak kedua ada di antara delapan dan sepuluh. Setelah delapan, bilangannya sembilan.";
const SUARA_KH4 = "Kotak ketiga di antara dua belas dan empat belas. Kalau kita menghitung mundur dari empat belas, bilangannya tiga belas.";
const SUARA_KH5 = "Kotak terakhir ada di antara tujuh belas dan sembilan belas. Delapan belas! Sekarang kisi kita lengkap.";
const KOSONG = [4, 9, 13, 18];
const isiSel = (n: number): Aksi["ubah"] => [{ id: `kjt${n}`, isi: String(n), warna: W.biru }, { id: `kjk${n}`, warna: W.hijauMuda, sorot: true }];

export const ADEGAN_KISI_HILANG: AdeganStory = {
  id: "kisi-hilang",
  judul: "Melengkapi kisi yang kosong",
  sumber: "Materi: bilangan yang hilang pada kisi",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_KH1,
      tambah(0, judul("Isi kotak yang kosong")),
      tambah("kosong.", Array.from({ length: 20 }, (_, i) => selKisi("kj", i + 1, KOSONG.includes(i + 1) ? null : i + 1)).flat()),
    ),
    k(SUARA_KH2, sorotkan("tiga", "kjk3"), redamkan("lima.", "kjk3"), { at: "empat.", ubah: isiSel(4) }),
    k(SUARA_KH3, redamkan(0, "kjk4"), sorotkan("delapan", "kjk8"), redamkan("sembilan.", "kjk8"), { at: "sembilan.", ubah: isiSel(9) }),
    k(SUARA_KH4, redamkan(0, "kjk9"), sorotkan("dua", "kjk12"), redamkan("kita", "kjk12"), { at: bilKe(SUARA_KH4, 13), ubah: isiSel(13) }),
    k(
      SUARA_KH5,
      redamkan(0, "kjk13"),
      sorotkan("tujuh", "kjk17"),
      redamkan("Delapan", "kjk17"),
      { at: "Delapan", ubah: isiSel(18) },
      tambah("lengkap.", emo("ok", 275, 190, "\u{1F389}", 22)),
    ),
  ],
};

/* ------------------------------ 7. Menyusun es krim: maju dan mundur ------------------------------ */
const SUARA_E1 = "Upe punya lima es krim. Es krim itu bertanda enam belas sampai dua puluh, tetapi urutannya tertukar.";
const SUARA_E2 = "Ketuk dua es krim untuk bertukar tempat. Tukar enam belas dengan delapan belas, supaya enam belas di paling kiri.";
const SUARA_E3 = "Tukar lagi sampai berurutan. Tujuh belas, delapan belas, sembilan belas, dan dua puluh paling kanan.";
const SUARA_E4 = "Dibaca dari kiri ke kanan, urutannya maju. Dibaca dari kanan ke kiri, urutannya mundur, dari dua puluh ke enam belas.";
const SUARA_E5 = "Ucapkan lagi mengikuti suara guru. Maju dari enam belas sampai dua puluh, lalu mundur kembali ke enam belas.";
const SLOT0: Record<number, number> = { 18: 0, 16: 1, 20: 2, 17: 3, 19: 4 };
const slot: Record<number, number> = { ...SLOT0 };
const esX = (s: number): number => 24 + s * 52;
const ES = (v: number): Obj[] => [emo(`ei${v}`, esX(SLOT0[v]) + 22, 84, "\u{1F366}", 22), ...angka(`ec${v}`, esX(SLOT0[v]), 94, v, 44, 50, WB.kuning, 18)];
const pindahEs = (v: number) => [
  { id: `ei${v}`, x: esX(slot[v]) + 22 },
  { id: `ec${v}-k`, x: esX(slot[v]) },
  { id: `ec${v}-t0`, x: esX(slot[v]) + 22 },
];
const tukar = (at: string | number, a: number, b: number): Aksi => {
  [slot[a], slot[b]] = [slot[b], slot[a]];
  return ubah(at, ...pindahEs(a), ...pindahEs(b));
};
const P_E3 = urutBil(SUARA_E3, [17, 18, 19, 20], "lagi");
const P_E4 = urutBil(SUARA_E4, [20, 16], "mundur,");
const P_E5 = urutBil(SUARA_E5, [16, 20, 16], "guru.");
const aksiE2 = tukar(idx(SUARA_E2, "Tukar"), 16, 18);
const aksiE3 = [tukar(P_E3[0], 17, 18), tukar(P_E3[1], 18, 20), tukar(P_E3[2], 19, 20)];

export const ADEGAN_ES_KRIM: AdeganStory = {
  id: "es-krim",
  judul: "Menyusun es krim dari kecil ke besar",
  sumber: "Materi: mengurutkan maju dan mundur",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Susun es krim")),
      tambah("lima", [18, 16, 20, 17, 19].flatMap((v) => ES(v))),
      tambah("tertukar.", teks("et", 150, 172, "urutannya tertukar", 10.5, W.merah)),
    ),
    k(
      SUARA_E2,
      ubah("Ketuk", { id: "et", isi: "ketuk dua es krim" }),
      sorotkan("enam", "ec16-k", "ec18-k"),
      aksiE2,
      redamkan("kiri.", "ec16-k", "ec18-k"),
    ),
    k(
      SUARA_E3,
      ubah(0, { id: "et", isi: "tukar sampai berurutan" }),
      aksiE3[0],
      aksiE3[1],
      aksiE3[2],
      sorotkan(P_E3[3], "ec20-k"),
    ),
    k(
      SUARA_E4,
      redamkan(0, "ec20-k"),
      ubah(0, { id: "et", isi: "kiri ke kanan: maju" }),
      tambah("kanan,", panah("pa", 30, 160, 240, 0, W.hijau, 2.6)),
      ubah("Dibaca@2", { id: "et", isi: "kanan ke kiri: mundur" }),
      ubah("Dibaca@2", { id: "pa", x: 270, x2: -240, warna: W.merah }),
      sorotkan(P_E4[0], "ec20-k"),
      redamkan(P_E4[1], "ec20-k"),
      sorotkan(P_E4[1], "ec16-k"),
    ),
    k(
      SUARA_E5,
      redamkan(0, "ec16-k"),
      hapus(0, "pa", "et"),
      tambah(0, emo("uc", 150, 194, "\u{1F4AC}", 28)),
      sorotkan(P_E5[0], "ec16-k"),
      redamkan(P_E5[1], "ec16-k"),
      sorotkan(P_E5[1], "ec20-k"),
      redamkan(P_E5[2], "ec20-k"),
      sorotkan(P_E5[2], "ec16-k"),
    ),
  ],
};
