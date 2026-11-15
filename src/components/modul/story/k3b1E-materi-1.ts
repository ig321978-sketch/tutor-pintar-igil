import type { AdeganStory } from "./logika-story";
import { EMO, MIN, W, anak, buatBlok, buatSusun, emo, judul, kartu, teks } from "./k3b1E-gambar";
import { bersih, hapus, idKartu, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1E-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 2. Jeruk Upe ------------------------------ */
const SUARA_C1 = "Upe memetik dua puluh lima jeruk dari kebun. Jeruk itu ia taruh di keranjang.";
const SUARA_C2 = "Halim datang dan mengambil dua belas jeruk itu untuk dimakan.";
const SUARA_C3 = "Berapa jeruk Upe yang tersisa sekarang? Kita akan mencarinya dengan pengurangan.";
const SUARA_C4 = "Pengurangan berarti mengambil sebagian dari jumlah semula. Di layar, dua puluh lima dikurangi dua belas.";
const SUARA_C5 = "Kita sebut dua puluh lima jumlah semula, dua belas yang diambil, dan sisanya yang kita cari.";

export const ADEGAN_CERITA_JERUK: AdeganStory = {
  id: "cerita-jeruk",
  judul: "Jeruk Upe dan Halim",
  sumber: "Materi: soal cerita pengurangan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Jeruk Upe")), tambah(idx(SUARA_C1, "Upe"), ...anak("upe", 40, 80)), tambah(idx(SUARA_C1, "jeruk"), emo("jr", 150, 100, EMO.jeruk, 44)), tambah(idx(SUARA_C1, "lima"), ...kartu("kj", 10, 150, 90, 30, W.hijauMuda, ["25 jeruk"], 11))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Halim"), ...anak("halim", 260, 80)), tambah(idx(SUARA_C2, "belas"), ...kartu("km", 105, 150, 90, 30, W.merahMuda, ["diambil 12"], 11))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "Berapa"), teks("tn", 150, 52, "sisa jeruk: ?", 12, W.ungu))),
    k(SUARA_C4, hapus(0, "tn"), tambah(idx(SUARA_C4, "dikurangi"), cap(`25 ${MIN} 12`))),
    k(SUARA_C5, ubah(idx(SUARA_C5, "semula"), { id: "kj-t0", isi: "semula 25" }), tambah(idx(SUARA_C5, "sisanya"), ...kartu("ks", 200, 150, 90, 30, W.emas, ["sisa ?"], 11))),
  ],
};

/* ------------------------------ 3. Balok puluhan dan satuan ------------------------------ */
const BA = buatBlok("a", 70, 56, 3);
const BB = buatBlok("b", 70, 124, 3);
const SUARA_T1 = "Mari kita lihat dua puluh lima dengan balok. Satu batang berisi sepuluh satuan, dan satu kotak kecil berisi satu satuan.";
const SUARA_T2 = "Dua puluh lima terdiri atas dua puluhan dan lima satuan.";
const SUARA_T3 = "Sekarang dua belas. Dua belas terdiri atas satu puluhan dan dua satuan.";
const SUARA_T4 = "Pada pengurangan, bilangan yang diambil kita pisah menurut puluhan dan satuannya. Jadi kita mengambil satu puluhan dan dua satuan dari dua puluh lima.";
const SUARA_T5 = "Yang tersisa satu puluhan dan tiga satuan. Itu sama dengan tiga belas.";

export const ADEGAN_BALOK: AdeganStory = {
  id: "balok",
  judul: "Balok puluhan dan satuan",
  sumber: "Materi: puluhan dan satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Balok puluhan dan satuan")),
      tambah(idx(SUARA_T1, "balok."), teks("hp", 83, 48, "puluhan", 9, W.ungu), teks("hs", 128, 48, "satuan", 9, W.ungu)),
      tambah(idx(SUARA_T1, "batang"), ...BA.batangObj(1, 2)),
      tambah(idx(SUARA_T1, "sepuluh"), ...kartu("ia", 170, 56, 124, 30, W.emas, ["1 batang = 10 satuan"], 9)),
      tambah(idx(SUARA_T1, "kotak"), ...BA.kecilObj(1, 5)),
      tambah(idx(SUARA_T1, "satuan", 2), BA.label(25)),
    ),
    k(
      SUARA_T2,
      hapus(0, ...idKartu("ia")),
      sorotkan(idx(SUARA_T2, "dua", 2), ...BA.idBatang(1, 2)),
      redamkan(idx(SUARA_T2, "lima", 2), ...BA.idBatang(1, 2)),
      sorotkan(idx(SUARA_T2, "lima", 2), ...BA.idKecil(1, 5)),
      tambah(idx(SUARA_T2, "terdiri"), ...kartu("ib", 170, 56, 124, 30, W.langit, ["2 puluhan 5 satuan"], 9)),
    ),
    k(
      SUARA_T3,
      redamkan(0, ...BA.idKecil(1, 5)),
      tambah(idx(SUARA_T3, "Sekarang"), ...BB.batangObj(1, 1)),
      tambah(idx(SUARA_T3, "belas."), ...BB.kecilObj(1, 2), BB.label(12)),
      tambah(idx(SUARA_T3, "terdiri"), ...kartu("ic", 170, 124, 124, 30, W.merahMuda, ["1 puluhan 2 satuan"], 9)),
    ),
    k(
      SUARA_T4,
      ubah(idx(SUARA_T4, "mengambil"), { id: "pb-a-p-2", op: 0.2 }, { id: "pb-a-s-4", op: 0.2 }, { id: "pb-a-s-5", op: 0.2 }),
      ubah(idx(SUARA_T4, "mengambil"), { id: "pb-a-n", isi: "13" }),
    ),
    k(SUARA_T5, tambah(idx(SUARA_T5, "sama"), cap(`25 ${MIN} 12 = 13`)), sorotkan(idx(SUARA_T5, "tiga", 2), "pb-a-n")),
  ],
};

/* ------------------------------ 4. Susun pendek tanpa mengambil ------------------------------ */
const SP = buatSusun(25, 12);
const SUARA_U1 = "Sekarang kita memakai cara susun pendek. Susun dua puluh lima di atas dua belas, puluhan lurus dengan puluhan.";
const SUARA_U2 = "Satuan lurus dengan satuan. Garis di bawahnya menunjukkan bahwa kita akan mengurangkan.";
const SUARA_U3 = "Mulai dari satuan. Lima dikurangi dua sama dengan tiga.";
const SUARA_U4 = "Lanjut ke puluhan. Dua dikurangi satu sama dengan satu.";
const SUARA_U5 = "Hasilnya satu puluhan dan tiga satuan, yaitu tiga belas. Sisa jeruk Upe ada tiga belas.";

export const ADEGAN_SUSUN_PENDEK: AdeganStory = {
  id: "susun-pendek",
  judul: "Susun pendek tanpa mengambil",
  sumber: "Materi: susun pendek",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Susun pendek")), tambah(idx(SUARA_U1, "susun", 2), ...SP.kerangka()), tambah(idx(SUARA_U1, "lima"), ...SP.atas()), tambah(idx(SUARA_U1, "belas,"), ...SP.bawah())),
    k(SUARA_U2, sorotkan(idx(SUARA_U2, "Satuan"), "sg-a0", "sg-b0"), redamkan(idx(SUARA_U2, "Garis"), "sg-a0", "sg-b0"), sorotkan(idx(SUARA_U2, "Garis"), "sg-ln")),
    k(SUARA_U3, redamkan(0, "sg-ln"), sorotkan(idx(SUARA_U3, "Lima"), "sg-a0", "sg-b0"), tambah(idx(SUARA_U3, "tiga."), SP.hasil0())),
    k(SUARA_U4, redamkan(0, "sg-a0", "sg-b0"), sorotkan(idx(SUARA_U4, "Dua"), "sg-a1", "sg-b1"), tambah(idx(SUARA_U4, "satu", 2), SP.hasil1())),
    k(SUARA_U5, redamkan(0, "sg-a1", "sg-b1"), tambah(idx(SUARA_U5, "yaitu"), cap(`25 ${MIN} 12 = 13`))),
  ],
};

/* ------------------------------ 5. Apel Kira ------------------------------ */
const SA = buatSusun(68, 35);
const SUARA_V1 = "Kira punya enam puluh delapan apel. Tiga puluh lima apel ia berikan kepada Igil.";
const SUARA_V2 = "Kita susun enam puluh delapan di atas tiga puluh lima, lalu mulai dari satuan.";
const SUARA_V3 = "Satuan: delapan dikurangi lima sama dengan tiga. Delapan lebih besar dari lima, jadi tidak perlu mengambil satu puluhan.";
const SUARA_V4 = "Puluhan: enam dikurangi tiga sama dengan tiga.";
const SUARA_V5 = "Apel Kira tersisa tiga puluh tiga. Hasilnya benar, sebab tiga puluh tiga ditambah tiga puluh lima sama dengan enam puluh delapan.";

export const ADEGAN_APEL: AdeganStory = {
  id: "apel",
  judul: "Apel Kira: tanpa mengambil",
  sumber: "Materi: contoh tanpa mengambil puluhan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Apel Kira")),
      tambah(idx(SUARA_V1, "Kira"), ...anak("kira", 40, 80)),
      tambah(idx(SUARA_V1, "apel"), emo("ap", 150, 100, EMO.apel, 44)),
      tambah(idx(SUARA_V1, "delapan"), ...kartu("ka", 10, 150, 90, 30, W.hijauMuda, ["68 apel"], 11)),
      tambah(idx(SUARA_V1, "lima"), ...kartu("kb", 105, 150, 100, 30, W.merahMuda, ["diberikan 35"], 11)),
      tambah(idx(SUARA_V1, "Igil."), ...anak("igil", 260, 80)),
    ),
    k(SUARA_V2, bersih(0), tambah(0, judul("Apel Kira")), tambah(idx(SUARA_V2, "Kita"), ...SA.kerangka()), tambah(idx(SUARA_V2, "delapan"), ...SA.atas()), tambah(idx(SUARA_V2, "lima,"), ...SA.bawah())),
    k(SUARA_V3, sorotkan(idx(SUARA_V3, "Satuan:"), "sg-a0", "sg-b0"), tambah(idx(SUARA_V3, "tiga."), SA.hasil0())),
    k(SUARA_V4, redamkan(0, "sg-a0", "sg-b0"), sorotkan(idx(SUARA_V4, "Puluhan:"), "sg-a1", "sg-b1"), tambah(idx(SUARA_V4, "tiga", 2), SA.hasil1())),
    k(SUARA_V5, redamkan(0, "sg-a1", "sg-b1"), tambah(idx(SUARA_V5, "ditambah"), cap(`33 + 35 = 68`))),
  ],
};
