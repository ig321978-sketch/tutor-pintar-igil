import type { AdeganStory, Obj } from "./logika-story";
import { ANAK_EMO, OWL, W, benda, bingkai, bulat, duaBingkai, emo, garisBilangan, judul, kartu, lompat, stoples, tangan, teks, titikBingkai, titikDua, xBil, type Titik } from "./k1b5a-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b5a-bantu";

/* ------------------------------ 1. Garis bilangan ------------------------------ */
const SUARA_G1 = "Setiap bilangan punya tempat di garis bilangan. Lihat garis ini. Garis ini mulai dari sepuluh dan berakhir di dua puluh.";
const SUARA_G2 = "Katak mulai dari sepuluh. Dia melompat ke kanan, satu langkah untuk satu lompatan.";
const SUARA_G3 = "Ayo lompat lima kali. Sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_G4 = "Katak mendarat di lima belas. Makin ke kanan, bilangannya makin besar.";
const SUARA_G5 = "Ayo lanjut. Enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh. Katak sampai di ujung kanan.";
const SUARA_G6 = "Sebelum dua puluh ada sembilan belas. Setelah empat belas ada lima belas. Bilangan yang berdekatan tinggal ditunjuk.";
const KATAK = (n: number): Obj => emo("kt", xBil(n), 60, "\u{1F438}", 22);
const posG3 = urutBilangan(SUARA_G3, 11, 15, "kali.");
const posG5 = urutBilangan(SUARA_G5, 16, 20, "lanjut.");

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-bilangan",
  judul: "Garis bilangan sepuluh sampai dua puluh",
  sumber: "Materi: garis bilangan",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis bilangan")), tambah("garis", ...garisBilangan(100)), sorotkan("sepuluh", "gb-n10"), sorotkan("dua", "gb-n20")),
    k(SUARA_G2, redamkan(0, "gb-n10", "gb-n20"), tambah("Katak", KATAK(10)), tambah("kanan,", teks("kn", 150, 160, "ke kanan, satu langkah", 9.6, W.hijau))),
    k(SUARA_G3, ...posG3.flatMap((p, i) => [tambah(p, lompat(`lp${11 + i}`, 10 + i, 11 + i, 100)), ubah(p, { id: "kt", x: xBil(11 + i) })])),
    k(SUARA_G4, hapus(0, "kn"), sorotkan("mendarat", "gb-n15"), ubah("mendarat", { id: "gb-n15", u: 14 }), tambah("Makin", teks("mb", 150, 160, "makin ke kanan, makin besar", 9.6, W.hijau))),
    k(SUARA_G5, hapus(0, "mb"), ubah(0, { id: "gb-n15", u: 9.4 }), ...posG5.flatMap((p, i) => [tambah(p, lompat(`lp${16 + i}`, 15 + i, 16 + i, 100)), ubah(p, { id: "kt", x: xBil(16 + i) })])),
    k(
      SUARA_G6,
      sorotkan("Sebelum", "gb-n19"),
      sorotkan("Setelah", "gb-n14"),
      sorotkan(idx(SUARA_G6, "lima"), "gb-n15"),
      tambah("berdekatan", ...kartu("bd", 40, 150, 220, 26, W.krem, ["bilangan berdekatan, tinggal tunjuk"], 9.2)),
    ),
  ],
};

/* ------------------------------ 2. Sepuluh ditambah sisanya ------------------------------ */
const SUARA_P1 = "Kalimat bilangan menunjukkan sepuluh dan sisanya. Kotak pertama selalu penuh, berisi sepuluh.";
const SUARA_P2 = "Tiga belas. Sepuluh ditambah tiga menjadi tiga belas.";
const SUARA_P3 = "Tujuh belas. Sepuluh ditambah tujuh menjadi tujuh belas.";
const SUARA_P4 = "Delapan belas. Sepuluh ditambah delapan menjadi delapan belas.";
const SUARA_P5 = "Lihat, sepuluh selalu ada. Yang berubah hanya sisanya di kotak kedua.";
const PE = (id: string, x: number, isi: string, warna: string = W.merah): Obj => teks(id, x, 140, isi, 28, warna);
const titikSisa = (dari: number, sampai: number): Obj[] => titikDua("pp", 30, sampai, dari);
const kataSisa = (s: string): number[] => [idx(s, "ditambah"), idx(s, "ditambah") + 1, idx(s, "menjadi"), s.split(/\s+/).length - 1];

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan-bilangan",
  judul: "Sepuluh ditambah sisanya",
  sumber: "Materi: kalimat bilangan sepuluh dan sisa",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Sepuluh dan sisanya"), ...duaBingkai("pp", 30)), tambah("Kotak", ...titikDua("pp", 30, 10)), tambah("penuh,", PE("e1", 60, "10", W.hijau))),
    k(
      SUARA_P2,
      tambah("Sepuluh", ...titikSisa(10, 13)),
      tambah("ditambah", PE("e2", 100, "+", W.biru)),
      tambah(kataSisa(SUARA_P2)[1], PE("e3", 140, "3")),
      tambah("menjadi", PE("e4", 180, "=", W.biru)),
      tambah(kataSisa(SUARA_P2)[3], PE("e5", 228, "13")),
    ),
    k(
      SUARA_P3,
      tambah("Sepuluh", ...titikSisa(13, 17)),
      ubah(kataSisa(SUARA_P3)[1], { id: "e3", isi: "7" }),
      ubah(kataSisa(SUARA_P3)[3], { id: "e5", isi: "17" }),
    ),
    k(
      SUARA_P4,
      tambah("Sepuluh", ...titikSisa(17, 18)),
      ubah(kataSisa(SUARA_P4)[1], { id: "e3", isi: "8" }),
      ubah(kataSisa(SUARA_P4)[3], { id: "e5", isi: "18" }),
    ),
    k(SUARA_P5, sorotkan("sepuluh", "e1"), tambah("Yang", emo("ow", 262, 186, OWL, 28)), tambah("sisanya", teks("ts", 150, 186, "sisanya berubah", 9.6, W.ungu))),
  ],
};

/* ------------------------------ 3. Siapa lebih banyak? ------------------------------ */
const SUARA_Q1 = "Kira dan Wei punya stiker. Kira punya tiga belas stiker. Wei punya lima belas stiker.";
const SUARA_Q2 = "Siapa yang punya lebih banyak? Kita tidak perlu menghitung semuanya. Lihat sepuluh dulu.";
const SUARA_Q3 = "Sepuluh sama. Kira dan Wei sama-sama punya satu kotak sepuluh yang penuh.";
const SUARA_Q4 = "Sekarang lihat sisanya. Sisa Kira tiga. Sisa Wei lima.";
const SUARA_Q5 = "Lima lebih banyak dari tiga. Jadi stiker Wei lebih banyak.";
const SUARA_Q6 = "Jadi lima belas lebih banyak daripada tiga belas. Kita membandingkan lewat sepuluh dan sisanya.";
const baris2 = (id: string, y: number, sisa: number): Obj[] => [
  ...bingkai(`${id}f`, 62, y, 14),
  ...titikBingkai(`${id}f`, 62, y, 10, W.merah, 14),
  ...Array.from({ length: sisa }, (_, i) => bulat(`${id}s-t${i}`, 150 + i * 20, y + 14, 6, W.biru, W.biru, { tebal: 1 })),
];
const selId = (id: string) => Array.from({ length: 10 }, (_, i) => `${id}f-c${i}`);

export const ADEGAN_BANYAK: AdeganStory = {
  id: "siapa-banyak",
  judul: "Siapa punya stiker lebih banyak?",
  sumber: "Materi: membandingkan lewat sepuluh dan sisa",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Stiker Kira dan Wei"), teks("nk", 32, 62, "Kira", 9.6), teks("nw", 32, 134, "Wei", 9.6)),
      tambah("Kira", ...baris2("kr", 44, 3)),
      tambah("Wei.", ...baris2("wi", 116, 5)),
      tambah(idx(SUARA_Q1, "tiga"), teks("ck", 268, 66, "13", 16, W.merah)),
      tambah(idx(SUARA_Q1, "lima"), teks("cw", 268, 138, "15", 16, W.merah)),
    ),
    k(SUARA_Q2, tambah("Siapa", emo("tn", 150, 104, "❓", 26)), tambah("sepuluh", teks("sp", 150, 186, "sepuluh dulu: 10", 9.6, W.ungu))),
    k(
      SUARA_Q3,
      hapus(0, "tn", "sp"),
      ubah(0, ...selId("kr").map((id) => ({ id, warna: "#FEF08A" })), ...selId("wi").map((id) => ({ id, warna: "#FEF08A" }))),
      tambah("sama.", teks("sm", 150, 104, "sepuluh sama: 10", 10.6, W.hijau)),
    ),
    k(
      SUARA_Q4,
      hapus(0, "sm"),
      sorotkan("sisanya.", "krs-t0", "krs-t1", "krs-t2", "wis-t0", "wis-t1", "wis-t2", "wis-t3", "wis-t4"),
      tambah("Kira", teks("sk", 180, 88, "sisa 3", 9.6, W.merah)),
      tambah("Wei", teks("sw", 190, 160, "sisa 5", 9.6, W.merah)),
    ),
    k(SUARA_Q5, redamkan(0, "krs-t0", "krs-t1", "krs-t2"), tambah("Jadi", emo("ok", 262, 172, "✅", 28)), tambah("Wei", teks("lb", 150, 192, "Wei lebih banyak", 10.6, W.hijau))),
    k(SUARA_Q6, bersih(0), tambah(0, judul("Banding lewat sepuluh"), ...kartu("bn", 20, 56, 260, 36, W.krem, ["15 lebih banyak dari 13"], 12), ...kartu("bm", 20, 108, 260, 36, W.hijauMuda, ["10 sama, bandingkan sisa"], 11)), tambah("Kita", emo("ow", 150, 172, OWL, 32))),
  ],
};

/* ------------------------------ 4. Tebak dan buktikan ------------------------------ */
const SUARA_K1 = "Tika melihat stoples penuh kelereng. Berapa banyak isinya? Tebak dulu!";
const SUARA_K2 = "Menebak artinya mengira-ngira. Tebakan Tika adalah lima belas. Tebakan boleh meleset, tidak apa-apa.";
const SUARA_K3 = "Sekarang kita buktikan dengan menghitung. Ketuk kelereng satu per satu, mulai dari kiri atas.";
const SUARA_K4 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas.";
const SUARA_K5 = "Hasil hitungannya tujuh belas. Tebakan Tika lima belas, jadi tebakannya hampir tepat. Hebat!";
const SUARA_K6 = "Pernahkah kamu salah menghitung? Biasanya karena ada yang terhitung dua kali, atau ada yang terlewat. Hitung pelan-pelan dan teliti.";
const P17: Titik[] = Array.from({ length: 17 }, (_, i) => ({ x: 100 + (i % 6) * 20, y: 80 + Math.floor(i / 6) * 26 }));

export const ADEGAN_TEBAK: AdeganStory = {
  id: "tebak-buktikan",
  judul: "Tebak dan buktikan isi stoples",
  sumber: "Materi: tebak dan buktikan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Tebak dan buktikan")),
      tambah("Tika", emo("a-Tika", 40, 112, ANAK_EMO, 30), teks("n-Tika", 40, 132, "Tika", 8.6)),
      tambah("stoples", ...stoples("jr", 84, 56, 132, 94), ...P17.flatMap((p, i) => benda("kelereng", `j${i}`, p.x, p.y, 7.4, i))),
      tambah("Berapa", emo("tn", 258, 110, "❓", 30)),
    ),
    k(SUARA_K2, hapus(0, "tn"), tambah("Menebak", emo("ti", 258, 110, "\u{1F914}", 28)), tambah("lima@1", ...kartu("tb", 70, 26, 160, 20, W.emas, ["tebakan: 15"], 9.6))),
    k(SUARA_K3, hapus(0, "ti"), sorotkan("buktikan", ...P17.map((_, i) => `j${i}`)), redamkan("Ketuk", ...P17.map((_, i) => `j${i}`)), sorotkan("kiri", "j0"), tambah("Ketuk", tangan(100, 168))),
    k(SUARA_K4, hapus(0, "tg"), redamkan(0, "j0"), ...hitungAksi(SUARA_K4, "j", P17, { turun: 0, naik: 11 })),
    k(SUARA_K5, tambah("Hasil", ...kartu("hs", 70, 160, 160, 24, W.hijauMuda, ["tebak 15, hitung 17"], 10)), tambah("Hebat!", emo("ok", 258, 110, "✅", 28))),
    k(
      SUARA_K6,
      bersih(0),
      tambah(0, judul("Hitung dengan teliti"), emo("ow", 150, 90, OWL, 50)),
      tambah("dua", teks("dk", 60, 150, "dua kali", 10, W.merah)),
      tambah("terlewat.", teks("tw", 240, 150, "terlewat", 10, W.merah)),
      tambah("teliti.", ...kartu("tt", 70, 164, 160, 26, W.hijauMuda, ["pelan-pelan dan teliti"], 10)),
    ),
  ],
};
