import type { AdeganStory } from "./logika-story";
import { W, judul, judulUrutan, kartuUrut, kumpulan, kotak, teks, pindahUrut, penandaUrut, tempat, tempatUrut } from "./k2b7B-gambar";
import { idx, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/* ------------------------------ 11. Tiga bilangan: puluhan paling banyak dan paling sedikit ------------------------------ */
const T3 = [0, 1, 2].map((i) => tempat(i, 3, 46, 62));
const SUARA_V1 = "Sekarang ada tiga bilangan: tujuh puluh enam, delapan puluh tiga, dan lima puluh tujuh.";
const SUARA_V2 = "Tujuh puluh enam punya tujuh puluhan dan enam satuan. Delapan puluh tiga punya delapan puluhan dan tiga satuan. Lima puluh tujuh punya lima puluhan dan tujuh satuan.";
const SUARA_V3 = "Delapan puluh tiga punya puluhan paling banyak. Jadi delapan puluh tiga paling besar.";
const SUARA_V4 = "Lima puluh tujuh punya puluhan paling sedikit. Jadi lima puluh tujuh paling kecil.";

export const ADEGAN_TIGA_BILANGAN: AdeganStory = {
  id: "tiga-bilangan",
  judul: "Tiga bilangan: paling besar dan paling kecil",
  sumber: "Materi: tiga bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Tiga bilangan")),
      tambah(idx(SUARA_V1, "enam"), kartuUrut(1, 76, T3[0])),
      tambah(idx(SUARA_V1, "tiga", 2), kartuUrut(2, 83, T3[1])),
      tambah(idx(SUARA_V1, "tujuh", 2), kartuUrut(3, 57, T3[2])),
    ),
    k(
      SUARA_V2,
      tambah(idx(SUARA_V2, "punya", 1), kartuUrut(1, 76, T3[0], true)),
      tambah(idx(SUARA_V2, "punya", 2), kartuUrut(2, 83, T3[1], true)),
      tambah(idx(SUARA_V2, "punya", 3), kartuUrut(3, 57, T3[2], true)),
    ),
    k(SUARA_V3, sorotkan(idx(SUARA_V3, "banyak"), "ur2-k"), tambah(idx(SUARA_V3, "besar"), penandaUrut(2, T3[1], "paling besar", 126, 11))),
    k(SUARA_V4, ubah(0, { id: "ur2-k", sorot: false }), sorotkan(idx(SUARA_V4, "sedikit"), "ur3-k"), tambah(idx(SUARA_V4, "kecil"), penandaUrut(3, T3[2], "paling kecil", 126, 11))),
  ],
};

/* ------------------------------ 12. Urutkan tiga bilangan dari yang paling kecil ------------------------------ */
const BANK3 = [0, 1, 2].map((i) => tempat(i, 3, 40, 44));
const SLOT3 = [0, 1, 2].map((i) => tempat(i, 3, 118, 44));
const SUARA_W1 = "Sekarang kita urutkan tiga bilangan dari yang paling kecil.";
const SUARA_W2 = "Yang paling kecil adalah lima puluh tujuh, jadi dia yang pertama.";
const SUARA_W3 = "Berikutnya tujuh puluh enam, yang kedua.";
const SUARA_W4 = "Terakhir delapan puluh tiga, yang ketiga dan paling besar.";
const SUARA_W5 = "Urutannya dari yang paling kecil: lima puluh tujuh, tujuh puluh enam, delapan puluh tiga.";

export const ADEGAN_URUT_TIGA: AdeganStory = {
  id: "urut-tiga",
  judul: "Mengurutkan tiga bilangan",
  sumber: "Materi: mengurutkan tiga bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Mengurutkan")),
      tambah(idx(SUARA_W1, "tiga"), kartuUrut(1, 76, BANK3[0]), kartuUrut(2, 83, BANK3[1]), kartuUrut(3, 57, BANK3[2])),
      tambah(idx(SUARA_W1, "kecil"), SLOT3.flatMap((t, i) => tempatUrut(i + 1, t, 178))),
    ),
    k(SUARA_W2, ubah(idx(SUARA_W2, "jadi"), ...pindahUrut(3, SLOT3[0]))),
    k(SUARA_W3, ubah(idx(SUARA_W3, "yang"), ...pindahUrut(1, SLOT3[1]))),
    k(SUARA_W4, ubah(idx(SUARA_W4, "yang"), ...pindahUrut(2, SLOT3[2]))),
    k(SUARA_W5, tambah(idx(SUARA_W5, "Urutannya"), judulUrutan("dari paling kecil")), sorotkan(idx(SUARA_W5, "tujuh"), "ur3-k"), sorotkan(idx(SUARA_W5, "enam"), "ur1-k"), sorotkan(idx(SUARA_W5, "tiga"), "ur2-k")),
  ],
};

/* ------------------------------ 13. Urutkan lima bilangan ------------------------------ */
const BANK5 = [0, 1, 2, 3, 4].map((i) => tempat(i, 5, 34, 40));
const SLOT5 = [0, 1, 2, 3, 4].map((i) => tempat(i, 5, 108, 40));
const SUARA_X1 = "Ini lima bilangan: enam puluh lima, tujuh puluh satu, lima puluh enam, tujuh puluh sembilan, dan enam puluh.";
const SUARA_X2 = "Lihat puluhannya. Lima puluh enam punya puluhan paling sedikit, jadi dia yang paling kecil.";
const SUARA_X3 = "Berikutnya enam puluh dan enam puluh lima. Puluhannya sama, jadi lihat satuannya. Nol lebih kecil dari lima.";
const SUARA_X4 = "Lalu tujuh puluh satu dan tujuh puluh sembilan. Satu lebih kecil dari sembilan.";
const SUARA_X5 = "Urutannya dari yang paling kecil: lima puluh enam, enam puluh, enam puluh lima, tujuh puluh satu, tujuh puluh sembilan.";

export const ADEGAN_URUT_LIMA: AdeganStory = {
  id: "urut-lima",
  judul: "Mengurutkan lima bilangan",
  sumber: "Materi: mengurutkan lima bilangan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Lima bilangan")),
      tambah(idx(SUARA_X1, "lima", 2), kartuUrut(1, 65, BANK5[0])),
      tambah(idx(SUARA_X1, "satu"), kartuUrut(2, 71, BANK5[1])),
      tambah(idx(SUARA_X1, "enam", 2), kartuUrut(3, 56, BANK5[2])),
      tambah(idx(SUARA_X1, "sembilan"), kartuUrut(4, 79, BANK5[3])),
      tambah(idx(SUARA_X1, "enam", 3), kartuUrut(5, 60, BANK5[4])),
      tambah(idx(SUARA_X1, "dan"), SLOT5.flatMap((t, i) => tempatUrut(i + 1, t, 166))),
    ),
    k(SUARA_X2, sorotkan(idx(SUARA_X2, "Lima"), "ur3-k"), ubah(idx(SUARA_X2, "jadi"), { id: "ur3-k", sorot: false }, ...pindahUrut(3, SLOT5[0]))),
    k(SUARA_X3, ubah(idx(SUARA_X3, "enam"), ...pindahUrut(5, SLOT5[1])), ubah(idx(SUARA_X3, "enam", 2), ...pindahUrut(1, SLOT5[2]))),
    k(SUARA_X4, ubah(idx(SUARA_X4, "satu"), ...pindahUrut(2, SLOT5[3])), ubah(idx(SUARA_X4, "sembilan"), ...pindahUrut(4, SLOT5[4]))),
    k(SUARA_X5, tambah(idx(SUARA_X5, "Urutannya"), judulUrutan("dari paling kecil", 100)), tambah(idx(SUARA_X5, "enam"), penandaUrut(3, SLOT5[0], "terkecil", 184, 8.6)), tambah(idx(SUARA_X5, "sembilan"), penandaUrut(4, SLOT5[4], "terbesar", 184, 8.6))),
  ],
};

/* ------------------------------ 14. Dua kartu angka: bilangan terbesar dan terkecil ------------------------------ */
const SUARA_Y1 = "Igil punya dua kartu angka, yaitu tiga dan tujuh.";
const SUARA_Y2 = "Kartu itu kita susun menjadi bilangan dengan dua angka. Ada dua cara: tiga puluh tujuh atau tujuh puluh tiga.";
const SUARA_Y3 = "Bilangan yang terbesar punya puluhan yang besar. Kartu tujuh kita taruh di puluhan, jadi tujuh puluh tiga paling besar.";
const SUARA_Y4 = "Bilangan yang terkecil punya puluhan yang kecil. Kartu tiga kita taruh di puluhan, jadi tiga puluh tujuh paling kecil.";

const kartuKd = (id: string, x: number, angka: string) => [kotak(`${id}-k`, x, 34, 40, 44, W.emas, W.biru, { rx: 8, z: 1 }), teks(`${id}-n`, x + 20, 34 + 22 + 10.5, angka, 30, W.merah, { z: 2 })];
const hasilKd = (id: "kec" | "bes", x: number, n: number) => [kotak(`kd-${id}-k`, x, 100, 80, 44, W.langit, W.biru, { rx: 8, z: 1 }), teks(`kd-${id}-n`, x + 40, 100 + 22 + 10.5, String(n), 30, W.merah, { z: 2 })];

export const ADEGAN_KARTU: AdeganStory = {
  id: "dua-kartu",
  judul: "Dua kartu angka",
  sumber: "Materi: bilangan terbesar dan terkecil",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Dua kartu angka")), tambah(idx(SUARA_Y1, "tiga"), kartuKd("kd1", 90, "3")), tambah(idx(SUARA_Y1, "tujuh"), kartuKd("kd2", 170, "7"))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "tujuh"), hasilKd("kec", 50, 37)), tambah(idx(SUARA_Y2, "tiga", 2), hasilKd("bes", 170, 73))),
    k(
      SUARA_Y3,
      sorotkan(idx(SUARA_Y3, "terbesar"), "kd-bes-k"),
      tambah(idx(SUARA_Y3, "terbesar"), teks("kd-bes-l", 210, 160, "terbesar", 11, W.hijau, { z: 2 })),
      tambah(idx(SUARA_Y3, "jadi"), teks("kd-bes-c", 210, 176, "7 puluhan 3 satuan", 8.6, W.biru, { z: 2 })),
    ),
    k(
      SUARA_Y4,
      ubah(0, { id: "kd-bes-k", sorot: false }),
      sorotkan(idx(SUARA_Y4, "terkecil"), "kd-kec-k"),
      tambah(idx(SUARA_Y4, "terkecil"), teks("kd-kec-l", 90, 160, "terkecil", 11, W.hijau, { z: 2 })),
      tambah(idx(SUARA_Y4, "jadi"), teks("kd-kec-c", 90, 176, "3 puluhan 7 satuan", 8.6, W.biru, { z: 2 })),
    ),
  ],
};

/* ------------------------------ 15. Teka-teki Kira: mundur dari lima puluh lima ------------------------------ */
const GX_KIRA = 100;
const Y_KIRA = 72;
const SUARA_Z1 = "Kira memilih satu bilangan. Kira bilang, kalau bilanganku ditambah empat puluhan dan tiga satuan, hasilnya lima puluh lima.";
const SUARA_Z2 = "Kita mundur dulu. Lima puluh lima adalah lima puluhan dan lima satuan.";
const SUARA_Z3 = "Kita kurangi empat puluhan. Dari lima puluhan, tinggal satu puluhan.";
const SUARA_Z4 = "Kita kurangi tiga satuan. Dari lima satuan, tinggal dua satuan. Jadi bilangan Kira adalah dua belas.";
const CORET = { op: 0.25, warna: W.abu };

export const ADEGAN_KIRA: AdeganStory = {
  id: "teka-teki-kira",
  judul: "Teka-teki Kira",
  sumber: "Materi: teka-teki mundur",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Teka-teki Kira")),
      tambah(idx(SUARA_Z1, "hasilnya"), teks("kr-q", 150, 42, "? + 43 = 55", 13, W.merah)),
      tambah(idx(SUARA_Z1, "satuan,"), teks("kr-c1", 150, 56, "tambah 4 puluhan 3 satuan", 8.6, W.biru)),
    ),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "adalah"), kumpulan("kr", 55, GX_KIRA, Y_KIRA), teks("kr-c", 150, Y_KIRA + 82, "5 puluhan 5 satuan", 8.6, W.biru))),
    k(
      SUARA_Z3,
      ubah(idx(SUARA_Z3, "empat"), ...["kr-p1", "kr-p2", "kr-p3", "kr-p4"].map((id) => ({ id, ...CORET }))),
      ubah(idx(SUARA_Z3, "tinggal"), { id: "kr-n", isi: "15" }, { id: "kr-c", isi: "1 puluhan 5 satuan" }),
    ),
    k(
      SUARA_Z4,
      ubah(idx(SUARA_Z4, "tiga"), ...["kr-s1", "kr-s2", "kr-s3"].map((id) => ({ id, ...CORET }))),
      ubah(idx(SUARA_Z4, "tinggal"), { id: "kr-n", isi: "12" }, { id: "kr-c", isi: "1 puluhan 2 satuan" }),
      tambah(idx(SUARA_Z4, "adalah"), teks("kr-a", 150, 184, "Bilangan Kira: 12", 13, W.hijau)),
    ),
  ],
};
