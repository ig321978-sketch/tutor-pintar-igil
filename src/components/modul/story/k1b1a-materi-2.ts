import type { AdeganStory } from "./logika-story";
import { E, W, balok, bingkai, deretMainan, emo, judul, kartu, kartuAngka, kartuTitik, keranjang, orang, tata, teks, tulisAngka, type Titik } from "./k1b1a-gambar";
import { KATA_ANGKA, bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

/* Lanjutan cerita "Merapikan Lemari Mainan Igil": melihat sekilas, sampai sepuluh, nol, membaca angka, dan menulis angka. */

const idSemua = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ 5. Melihat sekilas ------------------------------ */
const SUARA_E1 = "Abang mengangkat keranjang bola. Coba tebak, ada berapa bola? Jangan dihitung. Lihat sekilas saja.";
const SUARA_E2 = "Igil langsung menjawab, tiga! Igil tidak perlu menghitung satu per satu.";
const SUARA_E3 = "Benda yang sedikit bisa dikenali sekilas. Mata kita cepat sekali, seperti kilat.";
const SUARA_E4 = "Lalu Kaka menemukan dadu mainan. Berapa titik di dadu ini? Lima titik, seperti tanda silang.";
const SUARA_E5 = "Kalau bendanya banyak, sekilas saja tidak cukup. Kita hitung pelan-pelan, seperti Abang tadi.";
const BOLA3: Titik[] = [{ x: 124, y: 104 }, { x: 176, y: 104 }, { x: 150, y: 82 }];

export const ADEGAN_SEKILAS: AdeganStory = {
  id: "sekilas",
  judul: "Melihat banyaknya sekilas",
  sumber: "Materi: mengenali banyak sedikit sekilas",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Lihat sekilas"), ...orang("ab", 26, 178, E.abang, "Abang")),
      tambah("keranjang", ...keranjang("kr", 90, 100, 120, 50, { z: -1 }), ...deretMainan(E.bola, "bs", BOLA3, 26)),
      tambah("tebak,", emo("tn", 250, 84, E.tanya, 26)),
      tambah("sekilas", emo("mt", 250, 130, E.mata, 28)),
    ),
    k(
      SUARA_E2,
      hapus(0, "tn"),
      tambah(0, ...orang("ig", 274, 178, E.igil, "Igil")),
      tambah("tiga!", teks("a3", 150, 184, "3", 26, W.merah)),
    ),
    k(SUARA_E3, sorotkan("sedikit", ...idSemua("bs", 3)), tambah("kilat.", emo("kl", 60, 84, "⚡", 26))),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Titik di dadu"), ...orang("kk", 26, 178, E.kaka, "Kaka")),
      tambah("dadu", ...kartuTitik("dd", 110, 40, 5, 80)),
      tambah("Lima", teks("a5", 150, 150, "5", 28, W.merah)),
      sorotkan("silang.", ...idSemua("dd-t", 5)),
    ),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, judul("Sedikit atau banyak?"), ...kartuTitik("sd", 30, 50, 3, 70), teks("sl", 65, 142, "sekilas", 9, W.hijau)),
      tambah("banyak,", ...kartuTitik("bn", 190, 46, 8, 80)),
      tambah("hitung", teks("bl", 230, 146, "hitung satu-satu", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Laci balok sepuluh kotak ------------------------------ */
const SUARA_F1 = "Masih ada balok warna-warni di lantai. Kaka membawa laci balok. Lacinya punya sepuluh kotak kecil.";
const SUARA_F2 = "Ayo isi satu kotak dengan satu balok. Satu, dua, tiga, empat, lima.";
const SUARA_F3 = "Lanjut lagi. Enam, tujuh, delapan, sembilan, sepuluh. Penuh!";
const SUARA_F4 = "Semua kotak terisi. Ada sepuluh balok. Sepuluh ditulis dengan angka satu dan nol.";
const SUARA_F5 = "Lihat, baris atas ada lima balok. Baris bawah juga ada lima balok. Mudah dilihat, kan?";
const LACI = { x: 85, y: 46, sel: 26 };
const pusatSel = (i: number): Titik => ({ x: LACI.x + (i % 5) * LACI.sel + LACI.sel / 2, y: LACI.y + Math.floor(i / 5) * LACI.sel + LACI.sel / 2 });
const LANTAI_BALOK: Titik[] = Array.from({ length: 10 }, (_, i) => ({ x: 34 + i * 26, y: 176 - (i % 2) * 8 }));
const isiLaci = (suara: string, kata: string[], dari: number, setelah?: string) => {
  const pos = urutKata(suara, kata, setelah);
  return pos.flatMap((p, n) => {
    const i = dari + n;
    const c = pusatSel(i);
    return [ubah(p, { id: `bb${i}`, x: c.x - 8, y: c.y - 8 }), i === 0 ? tambah(p, teks("hc", 150, 136, "1", 24, W.merah)) : ubah(p, { id: "hc", isi: String(i + 1) })];
  });
};

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sampai-sepuluh",
  judul: "Menghitung balok sampai sepuluh",
  sumber: "Materi: menghitung sampai sepuluh",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Laci sepuluh kotak"), ...LANTAI_BALOK.map((p, i) => balok(`bb${i}`, p.x, p.y, i, 16, { z: 1 }))),
      tambah("Kaka", ...orang("kk", 40, 90, E.kaka, "Kaka")),
      tambah("laci", ...bingkai("lc", LACI.x, LACI.y, 0, LACI.sel)),
      tambah("sepuluh", teks("t10", 252, 82, "10 kotak", 11, W.merah)),
    ),
    k(SUARA_F2, ...isiLaci(SUARA_F2, KATA_ANGKA.slice(0, 5), 0, "balok.")),
    k(SUARA_F3, ...isiLaci(SUARA_F3, KATA_ANGKA.slice(5), 5)),
    k(
      SUARA_F4,
      hapus(0, "hc"),
      tambah("Ada", ...kartu("s10", 70, 126, 130, 30, W.emas, ["Ada 10 balok"], 12)),
      tambah("ditulis", teks("d10", 248, 146, "1 dan 0", 11, W.biru)),
    ),
    k(SUARA_F5, sorotkan("atas", ...idSemua("bb", 5)), sorotkan("bawah", "bb5", "bb6", "bb7", "bb8", "bb9")),
  ],
};

/* ------------------------------ 7. Nol: kotak kereta kosong ------------------------------ */
const SUARA_G1 = "Igil membuka kotak kereta api. Lho, kotaknya kosong!";
const SUARA_G2 = "Oh iya, kata Abang. Kereta apinya sedang diperbaiki Ayah.";
const SUARA_G3 = "Tidak ada kereta di dalam kotak. Tidak ada yang bisa dihitung. Banyaknya nol.";
const SUARA_G4 = "Nol artinya tidak ada. Angka nol ditulis bulat seperti telur.";
const SUARA_G5 = "Kotak kosong tetap disimpan. Nanti kalau keretanya pulang, kotaknya akan terisi lagi.";

export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Nol: kotak yang kosong",
  sumber: "Materi: bilangan nol",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Kotak kereta api"), ...orang("ig", 40, 150, E.igil, "Igil")),
      tambah("kotak", ...keranjang("kb", 110, 90, 120, 60), emo("stk", 214, 144, E.kereta, 14)),
      tambah("kosong!", teks("ko", 170, 80, "kosong", 12, W.merah), emo("tn", 64, 116, E.tanya, 18)),
    ),
    k(
      SUARA_G2,
      hapus(0, "tn"),
      tambah(0, ...orang("ab", 262, 150, E.abang, "Abang")),
      tambah("Kereta", emo("kt", 208, 60, E.kereta, 24)),
      tambah("diperbaiki", emo("al", 244, 60, E.alat, 22)),
    ),
    k(SUARA_G3, sorotkan("dalam", "kb"), tambah("Banyaknya", teks("nl", 170, 136, "0", 30, W.merah))),
    k(
      SUARA_G4,
      tambah("artinya", ...kartu("na", 70, 172, 160, 22, W.emas, ["nol = tidak ada"], 10)),
      tambah("ditulis", ...tulisAngka("z", 20, 36, "0", 1)),
      tambah("telur.", emo("tl", 70, 66, "\u{1F95A}", 24)),
    ),
    k(
      SUARA_G5,
      hapus(0, "na-k", "na-t0", "kt", "al"),
      sorotkan("disimpan.", "kb-r"),
      tambah("Nanti", ...kartu("nt", 70, 172, 160, 22, W.krem, ["nanti terisi lagi"], 9.4)),
    ),
  ],
};

/* ------------------------------ 8. Kartu angka untuk rak ------------------------------ */
const SUARA_H1 = "Kaka membuat kartu angka untuk menandai rak. Ini kartu nol, satu, dua, tiga, empat, lima.";
const SUARA_H2 = "Ayo baca bersama Kaka. Nol, satu, dua, tiga, empat, lima.";
const SUARA_H3 = "Masih ada kartu enam, tujuh, delapan, sembilan, dan sepuluh.";
const SUARA_H4 = "Baca lagi bersama. Enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_H5 = "Kaka mengangkat satu kartu. Igil, ini angka berapa? Lihat baik-baik, jangan buru-buru.";
const SUARA_H6 = "Igil menjawab, delapan! Betul sekali. Igil pintar membaca angka.";
const NAMA = ["nol", ...KATA_ANGKA];
const WARNA_KARTU = [W.merahMuda, W.langit, W.hijauMuda, W.krem, W.pink, W.lavender];
const posisiKartu = (i: number) => (i < 6 ? { x: 12 + i * 46, y: 32 } : { x: 12 + (i - 6) * 46, y: 102 });
const kartuKe = (i: number) => kartuAngka(`r${i}`, posisiKartu(i).x, posisiKartu(i).y, String(i), WARNA_KARTU[i % 6], 40, 36, 22);
const namaKe = (i: number) => teks(`rn${i}`, posisiKartu(i).x + 20, posisiKartu(i).y + 48, NAMA[i], 8, W.biru);
const pos1 = urutKata(SUARA_H1, NAMA.slice(0, 6), "Ini");
const pos2 = urutKata(SUARA_H2, NAMA.slice(0, 6), "Kaka.");
const pos3 = urutKata(SUARA_H3, NAMA.slice(6), "kartu");
const pos4 = urutKata(SUARA_H4, NAMA.slice(6), "bersama.");

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-angka",
  judul: "Membaca kartu angka",
  sumber: "Materi: membaca angka nol sampai sepuluh",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Kartu angka untuk rak")), ...pos1.map((p, i) => tambah(p, ...kartuKe(i)))),
    k(SUARA_H2, ...pos2.map((p, i) => tambah(p, namaKe(i)))),
    k(SUARA_H3, ...pos3.map((p, i) => tambah(p, ...kartuKe(i + 6)))),
    k(SUARA_H4, ...pos4.map((p, i) => tambah(p, namaKe(i + 6))), tambah("sepuluh.", emo("kk", 270, 140, E.kaka, 26))),
    k(
      SUARA_H5,
      bersih(0),
      tambah(0, judul("Angka berapa?"), ...orang("kk", 40, 150, E.kaka, "Kaka")),
      tambah("kartu.", ...kartuAngka("q", 100, 40, "8", W.krem, 100, 90, 60)),
      tambah("berapa?", teks("qt", 150, 156, "dibaca apa?", 14, W.ungu)),
    ),
    k(
      SUARA_H6,
      hapus(0, "qt"),
      tambah(0, ...orang("ig", 262, 150, E.igil, "Igil")),
      tambah("delapan!", teks("qj", 150, 160, "delapan", 22, W.hijau)),
      tambah("pintar", emo("jp", 262, 110, E.jempol, 24)),
    ),
  ],
};

/* ------------------------------ 9. Igil menulis angka ------------------------------ */
const SUARA_I1 = "Sekarang giliran Igil menulis kartu untuk rak. Pegang pensil dengan nyaman. Tulis pelan-pelan, ya.";
const SUARA_I2 = "Rak mobil berisi lima mobil. Igil menulis angka lima. Garis atas, turun, lalu melengkung.";
const SUARA_I3 = "Rak boneka berisi empat boneka. Angka empat dimulai dengan garis tegak, lalu garis miring, lalu garis mendatar.";
const SUARA_I4 = "Rak bola berisi tiga bola. Angka tiga punya dua lengkungan yang bersusun.";
const SUARA_I5 = "Laci balok berisi sepuluh balok. Sepuluh ditulis dengan dua angka, satu di depan, nol di belakang.";
const SUARA_I6 = "Kalau tulisanmu belum rapi, tidak apa-apa. Coba lagi sampai bagus. Igil juga terus berlatih.";

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-angka",
  judul: "Igil menulis angka",
  sumber: "Materi: menulis angka",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Igil menulis angka"), ...orang("ig", 56, 150, E.igil, "Igil")),
      tambah("Pegang", emo("pn", 160, 104, E.pensil, 48)),
      tambah("pelan-pelan,", ...kartu("pl", 100, 140, 140, 26, W.krem, ["pelan dan rapi"], 10)),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Angka lima"), ...deretMainan(E.mobil, "wm", tata(5, 56), 20)),
      tambah("menulis", ...tulisAngka("w", 132, 78, "5", 1.6)),
      tambah("melengkung.", teks("wt", 150, 178, "lima", 14, W.ungu)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Angka empat"), ...deretMainan(E.boneka, "wo", tata(4, 56), 20)),
      tambah("dimulai", ...tulisAngka("w", 128, 78, "4", 1.6)),
      tambah("mendatar.", teks("wt", 150, 178, "empat", 14, W.ungu)),
    ),
    k(
      SUARA_I4,
      bersih(0),
      tambah(0, judul("Angka tiga"), ...deretMainan(E.bola, "wl", tata(3, 56), 20)),
      tambah("tiga@2", ...tulisAngka("w", 132, 78, "3", 1.6)),
      tambah("bersusun.", teks("wt", 150, 178, "tiga", 14, W.ungu)),
    ),
    k(
      SUARA_I5,
      bersih(0),
      tambah(0, judul("Angka sepuluh"), ...Array.from({ length: 10 }, (_, i) => balok(`wb${i}`, 33 + i * 26, 50, i, 14))),
      tambah("ditulis", ...tulisAngka("w", 112, 74, "10", 1.6)),
      tambah("belakang.", teks("wt", 150, 178, "10 dibaca sepuluh", 13, W.ungu)),
    ),
    k(
      SUARA_I6,
      bersih(0),
      tambah(0, judul("Terus berlatih"), ...orang("ig", 150, 150, E.igil, "Igil")),
      tambah("Coba", emo("ku", 70, 110, E.kuat, 34)),
      tambah("bagus.", emo("bt", 230, 110, "\u{1F31F}", 34)),
    ),
  ],
};
