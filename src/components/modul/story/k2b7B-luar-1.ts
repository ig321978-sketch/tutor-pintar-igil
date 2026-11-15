import type { AdeganStory, Obj } from "./logika-story";
import {
  KUPU,
  LEBAH,
  OWL,
  W,
  bayangan,
  emo,
  gx,
  hasilBanding,
  idPilihan,
  kalimatBanding,
  kartu,
  kartuBanding,
  labelPenanda,
  lompatan,
  penanda,
  pilih,
  sumbu,
  sumbuSeratus,
  teks,
} from "./k2b7B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";
import { Y_KATA, Y_TANDA } from "./k2b7B-materi-2";

export const NAMA_METODE_ID = ["Banding Puluhan Dulu", "Garis Bilangan 100", "Tanda Banding"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama kecil di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 20, 288, 14, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.2);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara membandingkan bilangan dengan berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Banding Puluhan Dulu, Garis Bilangan Seratus, dan Tanda Banding.";
const SUARA_O3 = "Banding Puluhan Dulu melihat puluhan lebih dulu. Garis Bilangan Seratus meletakkan bilangan pada garis. Tanda Banding memakai tanda untuk membandingkan.";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk dan memilih jawaban dengan teliti.";
const SUARA_O5 = "Siap? Ayo kita mulai dengan metode pertama, yaitu Banding Puluhan Dulu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membandingkan bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, teks("jud", 150, 18, "Tiga metode dari luar", 11, W.ungu)), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      { at: 0, hapus: ["gl", "pk-k", "pk-t0"] },
      tambah(idx(SUARA_O2, "Banding"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Garis"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Tanda"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      { at: 0, hapus: ["m0-k", "m0-t0", "m1-k", "m1-t0", "m2-k", "m2-t0"] },
      tambah(0, teks("jud2", 150, 34, "Tiga cara berpikir", 11, W.ungu)),
      tambah(idx(SUARA_O3, "Banding"), ...kartu("gc0", 20, 44, 260, 40, WARNA_METODE[0], ["Banding Puluhan Dulu", "lihat puluhan lebih dulu"], 9.6)),
      tambah(idx(SUARA_O3, "Garis"), ...kartu("gc1", 20, 92, 260, 40, WARNA_METODE[1], ["Garis Bilangan 100", "bilangan di garis, kanan lebih besar"], 9.4)),
      tambah(idx(SUARA_O3, "Tanda"), ...kartu("gc2", 20, 140, 260, 40, WARNA_METODE[2], ["Tanda Banding", "tanda terbuka ke bilangan lebih besar"], 9.4)),
    ),
    k(SUARA_O4, { at: 0, hapus: ["jud2", "gc0-k", "gc0-t0", "gc0-t1", "gc1-k", "gc1-t0", "gc1-t1", "gc2-k", "gc2-t0", "gc2-t1"] }, tambah(0, teks("jud3", 150, 34, "Alat bantu hari ini", 11, W.ungu)), tambah("gambar", ...kartuBanding(58, 63, 56)), tambah("mengetuk", emo("tg", 150, 150, "\u{1F446}", 28))),
    k(SUARA_O5, { at: 0, hapus: ["jud3", "bd-a-k", "bd-a-t", "bd-b-k", "bd-b-t", "tg"] }, tambah(0, teks("jud4", 150, 34, "Metode pertama", 11, W.ungu)), tambah("Siap?", ...kartu("pm", 30, 60, 240, 44, WARNA_METODE[0], [NAMA_METODE_ID[0]], 14)), tambah("yaitu", emo("ow", 150, 150, OWL, 30))),
  ],
};

/* ------------------------------ 2. Banding Puluhan Dulu: konsep ------------------------------ */
const SUARA_P1 = "Metode pertama bernama Banding Puluhan Dulu. Kita bandingkan delapan puluh tiga dan tujuh puluh sembilan.";
const SUARA_P2 = "Lihat puluhannya lebih dulu. Delapan puluh tiga punya delapan puluhan dan tiga satuan. Tujuh puluh sembilan punya tujuh puluhan dan sembilan satuan.";
const SUARA_P3 = "Delapan puluhan lebih banyak dari tujuh puluhan. Jadi puluhan sudah menentukan.";
const SUARA_P4 = "Satuan tiga memang lebih kecil dari satuan sembilan, tetapi tidak perlu dilihat. Delapan puluh tiga lebih besar dari tujuh puluh sembilan.";

export const ADEGAN_LUAR_PULUHAN: AdeganStory = {
  id: "luar-puluhan",
  judul: "Banding Puluhan Dulu: konsep",
  sumber: "Metode luar: Banding Puluhan Dulu",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, kepala(0)), tambah(idx(SUARA_P1, "bandingkan"), kartuBanding(83, 79, 48))),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "satuan"), teks("bd-a-c", 74, 96, "8 puluhan 3 satuan", 8.6, W.biru, { z: 1 })),
      tambah(idx(SUARA_P2, "satuan", 2), teks("bd-b-c", 226, 96, "7 puluhan 9 satuan", 8.6, W.biru, { z: 1 })),
    ),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Delapan"), "bd-a-t"), tambah(idx(SUARA_P3, "Jadi"), hasilBanding(83, 79, Y_TANDA, Y_KATA))),
    k(SUARA_P4, ubah(0, { id: "bd-a-t", sorot: false }), tambah(idx(SUARA_P4, "Delapan"), ...kartu("lk", 30, 164, 240, 28, W.emas, ["puluhan menentukan lebih dulu"], 10.5))),
  ],
};

/* ------------------------------ 3. Banding Puluhan Dulu: terapan ------------------------------ */
const SUARA_Q1 = "Sekarang coba sendiri. Lihat bilangan lima puluh sembilan dan enam puluh satu.";
const SUARA_Q2 = "Bilangan mana yang lebih besar? Ingat, lihat puluhannya dulu. Ketuk jawabanmu.";
const SUARA_Q3 = "Betul, enam puluh satu! Lima puluh sembilan lebih kecil dari enam puluh satu, karena puluhannya lebih sedikit.";

export const ADEGAN_LUAR_PULUHAN_TERAPAN: AdeganStory = {
  id: "luar-puluhan-terapan",
  judul: "Banding Puluhan Dulu: coba sendiri",
  sumber: "Metode luar: Banding Puluhan Dulu",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_Q1, tambah(0, kepala(0)), tambah(idx(SUARA_Q1, "bilangan"), kartuBanding(59, 61, 40))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Ketuk"), pilih(112, ["59", "61"], 20, 36))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul"), "c2-k"), hapus(idx(SUARA_Q3, "Lima"), ...idPilihan(2)), tambah(idx(SUARA_Q3, "Lima"), hasilBanding(59, 61, 78, 124))),
  ],
};

/* ------------------------------ 4. Garis Bilangan 100: konsep ------------------------------ */
const S100 = sumbuSeratus(120);
const SUARA_G1 = "Metode kedua bernama Garis Bilangan Seratus. Garis ini mulai dari nol dan berakhir di seratus.";
const SUARA_G2 = "Tiap lompatan di garis ini sebesar sepuluh. Sepuluh, dua puluh, tiga puluh, dan seterusnya.";
const SUARA_G3 = "Kupu-kupu hinggap di bilangan tujuh puluh. Letaknya di sebelah kanan.";
const SUARA_G4 = "Kupu-kupu mundur tiga puluh, sampai di bilangan empat puluh. Empat puluh lebih kecil dari tujuh puluh, jadi letaknya di sebelah kiri.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Garis Bilangan 100: konsep",
  sumber: "Metode luar: Garis Bilangan 100",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, kepala(1)), tambah(idx(SUARA_G1, "Garis"), sumbu(S100))),
    k(SUARA_G2, sorotkan(idx(SUARA_G2, "Sepuluh", 2), "gb-t10"), sorotkan(idx(SUARA_G2, "dua"), "gb-t20"), sorotkan(idx(SUARA_G2, "tiga"), "gb-t30")),
    k(SUARA_G3, ubah(0, { id: "gb-t10", sorot: false }, { id: "gb-t20", sorot: false }, { id: "gb-t30", sorot: false }), tambah(idx(SUARA_G3, "Kupu-kupu"), penanda(S100, 70, KUPU)), tambah(idx(SUARA_G3, "puluh"), labelPenanda("Kupu-kupu di 70"))),
    k(
      SUARA_G4,
      tambah(0, bayangan(S100, 70, KUPU)),
      ubah(idx(SUARA_G4, "sampai"), { id: "gb-m", x: gx(S100, 40) }, { id: "gb-mt", isi: "Kupu-kupu di 40" }),
      tambah(idx(SUARA_G4, "sampai"), lompatan(S100, 70, 40)),
    ),
  ],
};

/* ------------------------------ 5. Garis Bilangan 100: terapan ------------------------------ */
const S_T = sumbuSeratus(92);
const SUARA_H1 = "Sekarang coba sendiri. Kupu-kupu ada di empat puluh delapan, dan lebah ada di tujuh puluh dua.";
const SUARA_H2 = "Bilangan siapa yang lebih besar? Lihat siapa yang ada di sebelah kanan. Ketuk jawabanmu.";
const SUARA_H3 = "Betul, lebah! Tujuh puluh dua ada di sebelah kanan, jadi tujuh puluh dua lebih besar dari empat puluh delapan.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Bilangan 100: coba sendiri",
  sumber: "Metode luar: Garis Bilangan 100",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, kepala(1)),
      tambah(0, sumbu(S_T)),
      tambah(idx(SUARA_H1, "Kupu-kupu"), penanda(S_T, 48, KUPU)),
      tambah(idx(SUARA_H1, "delapan"), labelPenanda("Kupu-kupu di 48", 138)),
      tambah(idx(SUARA_H1, "lebah"), penanda(S_T, 72, LEBAH, true)),
      tambah(idx(SUARA_H1, "dua"), labelPenanda("Lebah di 72", 154, true)),
    ),
    k(SUARA_H2, tambah(idx(SUARA_H2, "Ketuk"), pilih(162, ["Kupu-kupu", "Lebah"], 11, 28))),
    k(SUARA_H3, hapus(0, ...idPilihan(2)), sorotkan(idx(SUARA_H3, "lebah"), "gb-m2"), tambah(idx(SUARA_H3, "jadi"), kalimatBanding(72, 48, 176))),
  ],
};
