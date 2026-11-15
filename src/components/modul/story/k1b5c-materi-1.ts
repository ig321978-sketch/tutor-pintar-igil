import type { AdeganStory } from "./logika-story";
import { W, balok, emo, judul, kantong, kartu, kelereng, kotak, pita, sedotan, teks } from "./k1b5c-gambar";
import { bersih, hapus, hitungSatu, idx, k, pindahBilangan, redamkan, rumus, sorotkan, tambah, ubah } from "./k1b5c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";

/* ------------------------------ 1. Cerita kelereng Halim ------------------------------ */
/** Lima belas kelereng dalam tiga baris, tiap baris lima. */
export const ID_KELERENG = Array.from({ length: 15 }, (_, i) => `kl${i}`);
export const letakKelereng = (i: number): { x: number; y: number } => ({ x: 108 + 24 * (i % 5), y: 70 + 24 * Math.floor(i / 5) });
const kelerengAwal = () => ID_KELERENG.map((id, i) => kelereng(id, letakKelereng(i).x, letakKelereng(i).y));

const SUARA_A1 = "Pagi ini Halim bermain kelereng di teras bersama Igil, si burung hantu. Halim punya banyak kelereng warna-warni.";
const SUARA_A2 = "Ayo kita hitung semua kelerengnya, ya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_A3 = "Lima belas kelereng! Itu cukup banyak, dan menghitung satu per satu bisa membuat kita keliru. Adakah cara yang lebih mudah?";
const SUARA_A4 = "Igil punya akal. Kita gabungkan dulu sepuluh kelereng, lalu kita lihat ada berapa yang tersisa.";
const SUARA_A5 = "Ketuk tombol suara kalau kamu ingin mendengar guru lagi. Sekarang kita lihat caranya di adegan berikutnya.";

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-kelereng",
  judul: "Kelereng Halim",
  sumber: "Materi: cerita kelereng Halim",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Kelereng Halim")),
      tambah("Halim", emo("a-Halim", 40, 76, ANAK, 28), teks("n-Halim", 40, 90, "Halim", 8.4)),
      tambah("Igil,", emo("a-Igil", 262, 56, IGIL, 26)),
      tambah("banyak", ...kelerengAwal()),
    ),
    k(SUARA_A2, ...hitungSatu(SUARA_A2, ID_KELERENG, "kelereng", "ch", 150, 170, undefined, 1, true, W.merah, 16)),
    k(SUARA_A3, redamkan(0, "kl14"), tambah("Adakah", emo("tn", 262, 110, "\u{2753}", 30))),
    k(SUARA_A4, hapus(0, "tn", "ch"), sorotkan("sepuluh", ...ID_KELERENG.slice(0, 10)), tambah("sepuluh", ...kartu("g10", 30, 140, 240, 28, W.krem, ["10 kelereng bisa digabung"], 9.4))),
    k(SUARA_A5, redamkan(0, ...ID_KELERENG.slice(0, 10)), tambah("tombol", emo("sg", 150, 190, "\u{1F50A}", 24)), sorotkan("tombol", "sg")),
  ],
};

/* ------------------------------ 2. Kantong sepuluh kelereng ------------------------------ */
export const KANTONG = { x: 14, y: 50, w: 70, h: 96 };
/** Tempat kelereng ke-i (0 sampai 9) di dalam kantong: dua lajur, lima baris. */
export const dalamKantong = (i: number): { x: number; y: number } => ({ x: 36 + 26 * (i % 2), y: 64 + 16 * Math.floor(i / 2) });

const SUARA_B1 = "Halim punya lima belas kelereng. Dapatkah kamu melihat sepuluh kelereng yang bisa masuk ke dalam kantong?";
const SUARA_B2 = "Halim memasukkan kelereng ke dalam kantong. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_B3 = "Sepuluh kelereng yang digabungkan itu disebut satu puluhan. Jadi di dalam kantong ada satu puluhan.";
const SUARA_B4 = "Masih ada lima kelereng di luar kantong. Satu kelereng disebut satu satuan, jadi lima kelereng adalah lima satuan.";
const SUARA_B5 = "Sepuluh dan lima menjadi lima belas. Kalimatnya: sepuluh ditambah lima sama dengan lima belas.";

export const ADEGAN_KANTONG: AdeganStory = {
  id: "kantong-sepuluh",
  judul: "Kantong sepuluh kelereng",
  sumber: "Materi: kantong sepuluh kelereng",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Kantong sepuluh")),
      tambah("Halim", emo("a-Halim", 262, 150, ANAK, 26), teks("n-Halim", 262, 164, "Halim", 8.4)),
      tambah("kelereng.", ...kelerengAwal()),
      tambah("sepuluh", teks("b10", 49, 42, "10", 12, W.merah)),
      tambah("kantong?", kantong("kt", KANTONG.x, KANTONG.y, KANTONG.w, KANTONG.h)),
    ),
    k(SUARA_B2, ...pindahBilangan(SUARA_B2, ID_KELERENG.slice(0, 10), dalamKantong, 1, "kantong.")),
    k(SUARA_B3, sorotkan(0, "kt"), tambah("puluhan.", teks("l1", 49, 162, "1 puluhan", 10, W.merah))),
    k(SUARA_B4, redamkan(0, "kt"), ubah("luar", ...ID_KELERENG.slice(10).map((id) => ({ id, warna: W.oranye }))), tambah("satuan,", teks("l5", 156, 148, "5 satuan", 10, W.merah))),
    k(SUARA_B5, ...rumus(SUARA_B5, "ka", 190, 10, 5, "Kalimatnya:")),
  ],
};

/* ------------------------------ 3. Sedotan Kira diikat ------------------------------ */
export const ID_SEDOTAN = Array.from({ length: 13 }, (_, i) => `sd${i}`);
export const letakSedotan = (i: number): { x: number; y: number } => ({ x: 40 + 17 * i, y: 60 });
export const dalamIkatan = (i: number): { x: number; y: number } => ({ x: 62 + 5 * i, y: 60 });

const SUARA_C1 = "Kira punya tiga belas sedotan. Dia ingin tahu, berapa puluhan dan berapa satuan yang ada.";
const SUARA_C2 = "Kira mengikat sepuluh sedotan menjadi sebuah ikat. Hitung sambil mengetuk: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_C3 = "Satu ikat berisi sepuluh sedotan. Itulah satu puluhan. Bagus sekali, Kira!";
const SUARA_C4 = "Kira masih punya tiga sedotan yang tidak diikat. Satu, dua, tiga. Tiga sedotan itu adalah tiga satuan.";
const SUARA_C5 = "Jadi satu puluhan dan tiga satuan sama dengan tiga belas. Kalimatnya: sepuluh ditambah tiga sama dengan tiga belas.";

export const ADEGAN_IKAT: AdeganStory = {
  id: "ikat-sedotan",
  judul: "Kira mengikat sedotan",
  sumber: "Materi: Kira mengikat sedotan",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Ikat sedotan")),
      tambah("Kira", emo("a-Kira", 30, 150, ANAK, 26), teks("n-Kira", 30, 164, "Kira", 8.4)),
      tambah("sedotan.", ...ID_SEDOTAN.map((id, i) => sedotan(id, letakSedotan(i).x, letakSedotan(i).y))),
    ),
    k(
      SUARA_C2,
      tambah("sepuluh", teks("t10", 84, 50, "10", 12, W.merah)),
      ...pindahBilangan(SUARA_C2, ID_SEDOTAN.slice(0, 10), dalamIkatan, 1, "mengetuk:"),
      tambah(idx(SUARA_C2, "sepuluh", 2), pita("pt", 58, 68, 54)),
    ),
    k(SUARA_C3, sorotkan("ikat", "pt"), tambah("puluhan.", teks("l1", 84, 112, "1 puluhan", 10, W.merah))),
    k(SUARA_C4, redamkan(0, "pt"), ...hitungSatu(SUARA_C4, ["sd10", "sd11", "sd12"], "satuan", "ch", 227, 112, "diikat.", 1, true, W.merah, 10)),
    k(SUARA_C5, redamkan(0, "sd12"), ...rumus(SUARA_C5, "ra", 186, 10, 3, "Kalimatnya:")),
  ],
};

/* ------------------------------ 4. Menara balok Wei ------------------------------ */
export const ID_BALOK = Array.from({ length: 14 }, (_, i) => `bl${i}`);
export const letakBalok = (i: number): { x: number; y: number } => ({ x: 30 + 36 * (i % 7), y: 64 + 28 * Math.floor(i / 7) });
export const dalamMenara = (i: number): { x: number; y: number } => ({ x: 46, y: 165 - 11 * i });

const SUARA_D1 = "Wei punya empat belas balok. Dia suka menyusun balok menjadi menara yang tinggi.";
const SUARA_D2 = "Wei menyusun sepuluh balok menjadi satu menara. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_D3 = "Menara itu berisi sepuluh balok, jadi satu puluhan. Hebat sekali, Wei!";
const SUARA_D4 = "Di sebelahnya ada empat balok lepas. Satu, dua, tiga, empat. Jadi ada empat satuan.";
const SUARA_D5 = "Satu puluhan dan empat satuan sama dengan empat belas. Kalimatnya: sepuluh ditambah empat sama dengan empat belas.";

export const ADEGAN_MENARA: AdeganStory = {
  id: "menara-balok",
  judul: "Menara balok Wei",
  sumber: "Materi: menara balok Wei",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Menara balok")),
      tambah("Wei", emo("a-Wei", 262, 150, ANAK, 26), teks("n-Wei", 262, 164, "Wei", 8.4)),
      tambah("balok.", ...ID_BALOK.map((id, i) => balok(id, letakBalok(i).x, letakBalok(i).y))),
    ),
    k(SUARA_D2, tambah("sepuluh", teks("t10", 58, 56, "10", 12, W.merah)), ...pindahBilangan(SUARA_D2, ID_BALOK.slice(0, 10), dalamMenara, 1, "menara.")),
    k(SUARA_D3, sorotkan(0, ...ID_BALOK.slice(0, 10)), tambah("puluhan.", teks("l1", 58, 190, "1 puluhan", 10, W.merah))),
    k(SUARA_D4, redamkan(0, ...ID_BALOK.slice(0, 10)), ...hitungSatu(SUARA_D4, ID_BALOK.slice(10), "satuan", "ch", 192, 124, "lepas.", 1, true, W.merah, 10)),
    k(SUARA_D5, redamkan(0, "bl13"), ...rumus(SUARA_D5, "rb", 176, 10, 4, "Kalimatnya:")),
  ],
};

/* ------------------------------ 5. Papan nilai tempat ------------------------------ */
const SUARA_E1 = "Ini papan nilai tempat. Papan ini punya dua kolom, yaitu puluhan dan satuan.";
const SUARA_E2 = "Lihat bilangan lima belas. Angka di sebelah kiri menunjukkan banyak puluhan.";
const SUARA_E3 = "Angka di sebelah kanan menunjukkan banyak satuan. Pada lima belas, angka lima ada di kanan.";
const SUARA_E4 = "Jadi angka satu di kiri berarti satu puluhan, dan angka lima di kanan berarti lima satuan.";
const SUARA_E5 = "Kalimatnya: satu puluhan dan lima satuan sama dengan lima belas. Cocok dengan kelereng Halim tadi!";

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan-nilai",
  judul: "Papan nilai tempat",
  sumber: "Materi: papan nilai tempat",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Papan nilai tempat")),
      tambah("kolom,", kotak("cp", 30, 66, 110, 70, W.putih, W.biru, { rx: 4 }), kotak("cs", 160, 66, 110, 70, W.putih, W.biru, { rx: 4 })),
      tambah("puluhan", ...kartu("hp", 30, 40, 110, 26, W.hijauMuda, ["Puluhan"], 11)),
      tambah("satuan.", ...kartu("hs", 160, 40, 110, 26, W.pink, ["Satuan"], 11)),
    ),
    k(SUARA_E2, tambah("lima", teks("n15", 150, 176, "15", 26, W.merah)), tambah("kiri", teks("dp", 85, 114, "1", 44, W.merah)), sorotkan("kiri", "cp")),
    k(SUARA_E3, redamkan(0, "cp"), sorotkan("kanan", "cs"), tambah(idx(SUARA_E3, "lima", 2), teks("ds", 215, 114, "5", 44, W.merah))),
    k(SUARA_E4, redamkan(0, "cs"), tambah("puluhan,", teks("l1", 85, 152, "1 puluhan", 10, W.merah)), tambah("satuan.", teks("l5", 215, 152, "5 satuan", 10, W.merah))),
    k(SUARA_E5, hapus(0, "l1", "l5", "n15"), tambah(0, ...kartu("kj", 20, 150, 260, 34, W.emas, ["1 puluhan + 5 satuan = 15"], 12))),
  ],
};
