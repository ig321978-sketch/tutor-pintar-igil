import type { AdeganStory, Obj } from "./logika-story";
import { GK, W, emo, garis, kartu, kartuAngka, kotak, panah, teks, xGB, xGK } from "./k2b1B-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah, urutBilangan, urutNilai } from "./k2b1B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b1B-luar-1";

/* ------------------------------ 4. Kartu Tumpuk: konsep ------------------------------ */
const kartuPuluhan = (i: number): Obj[] => kartuAngka(`kp${i}`, 20 + i * 66, 56, String((i + 1) * 10), W.krem, 60, 34, 16);
const kartuSatuan = (i: number): Obj[] => kartuAngka(`ks${i}`, 12 + i * 31, 118, String(i + 1), W.langit, 27, 30, 14);
/** Kartu puluhan besar `p` (dua angka: puluhan dan nol) di (100, 56); id `kt-k`, `kt-{angka}`, `kt-0`. */
const kartuBesarP = (y: number, p: string): Obj[] => [kotak("kt-k", 100, y, 100, 50, W.krem, W.biru, { rx: 6, tebal: 1.6 }), teks(`kt-${p}`, 125, y + 36, p, 34, W.merah), teks("kt-0", 175, y + 36, "0", 34, W.merah)];
/** Kartu satuan besar `s` di (125, y); id `ku-k` dan `ku-{angka}`. */
const kartuBesarS = (y: number, s: string): Obj[] => [kotak("ku-k", 125, y, 50, 50, W.langit, W.biru, { rx: 6, tebal: 1.6 }), teks(`ku-${s}`, 150, y + 36, s, 34, W.merah)];
const tumpukKe = (at: string | number | undefined, s: string, y: number) => [ubah(at, { id: "ku-k", x: 150, y }, { id: `ku-${s}`, x: 175, y: y + 36 }), ubah(at, { id: "kt-0", op: 0 })];

const SUARA_C1 = "Metode kedua bernama Kartu Tumpuk. Ada kartu puluhan dan kartu satuan.";
const SUARA_C2 = "Kartu puluhan selalu berakhir dengan angka nol. Misalnya dua puluh dan tiga puluh.";
const SUARA_C3 = "Kita ingin membuat dua puluh enam. Ketuk kartu dua puluh, lalu kartu enam.";
const SUARA_C4 = "Sekarang tumpuk kartu enam di atas angka nol. Angka nol tertutup.";
const SUARA_C5 = "Sekarang kartu itu terbaca dua puluh enam. Dua puluhan dan enam satuan menjadi satu bilangan.";
const SUARA_C6 = "Kartu tumpuk menunjukkan nilai tempat dengan jelas. Angka kiri adalah puluhan dan angka kanan adalah satuan.";
const posC2 = urutNilai(SUARA_C2, [20, 30], "Misalnya");

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Kartu Tumpuk: kartu puluhan dan kartu satuan",
  sumber: "Metode luar: Kartu Tumpuk",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua", ...kepala(1)),
      tambah(idx(SUARA_C1, "puluhan"), teks("kp-lb", 150, 53, "kartu puluhan", 8.6, W.ungu), ...[0, 1, 2, 3].flatMap(kartuPuluhan)),
      tambah(idx(SUARA_C1, "satuan."), teks("ks-lb", 150, 112, "kartu satuan", 8.6, W.ungu), ...Array.from({ length: 9 }, (_, i) => kartuSatuan(i)).flat()),
    ),
    k(SUARA_C2, sorotkan(posC2[0], "kp1-k", "kp1-t"), redamkan(posC2[1], "kp1-k", "kp1-t"), sorotkan(posC2[1], "kp2-k", "kp2-t")),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_C3, "dua"), teks("tg", 150, 196, "target: 26", 11, W.ungu)),
      tambah(idx(SUARA_C3, "dua", 2), ...kartuBesarP(56, "2")),
      tambah(idx(SUARA_C3, "enam", 2), ...kartuBesarS(130, "6")),
    ),
    k(SUARA_C4, ...tumpukKe(idx(SUARA_C4, "tumpuk"), "6", 56), tambah(idx(SUARA_C4, "tertutup."), emo("tt", 262, 100, "\u{1F4A1}", 24))),
    k(SUARA_C5, hapus(0, "tt"), tambah(idx(SUARA_C5, "terbaca"), teks("kn", 150, 156, "26", 30, W.merah)), sorotkan(idx(SUARA_C5, "terbaca"), "kt-k", "ku-k")),
    k(SUARA_C6, redamkan(0, "kt-k", "ku-k"), sorotkan(idx(SUARA_C6, "kiri"), "kt-2"), redamkan(idx(SUARA_C6, "kanan"), "kt-2"), sorotkan(idx(SUARA_C6, "kanan"), "ku-6"), tambah(idx(SUARA_C6, "satuan."), emo("ok", 262, 156, "✅", 24))),
  ],
};

/* ------------------------------ 5. Kartu Tumpuk: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada bilangan baru. Ada kartu tiga puluh dan kartu delapan.";
const SUARA_D2 = "Tumpuk kartu delapan di atas angka nol. Bilangan apa yang terbaca?";
const SUARA_D3 = "Betul! Kartu tiga puluh dan kartu delapan terbaca tiga puluh delapan.";
const SUARA_D4 = "Angka tiga di kiri menunjukkan tiga puluhan. Angka delapan di kanan menunjukkan delapan satuan.";
const SUARA_D5 = "Mudah, bukan? Kartu tumpuk membantu kita membaca nilai tempat.";

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Kartu Tumpuk: membaca kartu tiga puluh dan delapan",
  sumber: "Metode luar: Kartu Tumpuk, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1)), tambah(idx(SUARA_D1, "tiga"), ...kartuBesarP(56, "3"), teks("kt-lb", 150, 52, "kartu 30", 9, W.ungu)), tambah(idx(SUARA_D1, "delapan."), ...kartuBesarS(114, "8"))),
    k(SUARA_D2, ...tumpukKe(idx(SUARA_D2, "Tumpuk"), "8", 56), tambah(idx(SUARA_D2, "Bilangan"), ...pilihKata(130, ["30", "38", "48"]))),
    k(SUARA_D3, sorotkan(idx(SUARA_D3, "Betul!"), "c2-k"), tambah(idx(SUARA_D3, "terbaca"), teks("kn", 150, 196, "38", 24, W.merah))),
    k(SUARA_D4, redamkan(0, "c2-k"), sorotkan(idx(SUARA_D4, "tiga"), "kt-3"), redamkan(idx(SUARA_D4, "delapan"), "kt-3"), sorotkan(idx(SUARA_D4, "delapan"), "ku-8")),
    k(SUARA_D5, redamkan(0, "ku-8"), tambah("Mudah,", emo("ok", 262, 196, "✅", 24))),
  ],
};

/* ------------------------------ 6. Garis Bilangan Puluhan: konsep ------------------------------ */
const Y_GB = 96;
const Y_GK = GK.y;
const KATA_KATA = [0, 10, 20, 30, 40, 50];
const garisUtama = (): Obj[] => [
  garis("gb-g", xGB(0), Y_GB, xGB(50) - xGB(0), 0, W.biru, 2.5),
  ...KATA_KATA.flatMap((n) => [garis(`gb-q${n}`, xGB(n), Y_GB - 6, 0, 12, W.biru, 1.8), teks(`gb-l${n}`, xGB(n), 114, String(n), 9, W.biru)]),
];
const loncatPuluhan = (i: number): Obj => panah(`gb-hp${i}`, xGB(i * 10) + 3, 84, xGB(10) - xGB(0) - 6, 0, W.hijau, 2.2);
const katak = (x: number, y: number): Obj => emo("gb-tanda", x, y, "\u{1F438}", 16);
const garisZoom = (dasar: number): Obj[] => [
  garis("gk-c0", xGB(dasar), 120, xGK(dasar, dasar) - xGB(dasar), Y_GK - 8 - 120, W.abu, 1.2, { putus: true }),
  garis("gk-c1", xGB(dasar + 10), 120, xGK(dasar + 10, dasar) - xGB(dasar + 10), Y_GK - 8 - 120, W.abu, 1.2, { putus: true }),
  garis("gk-g", xGK(dasar, dasar), Y_GK, xGK(dasar + 10, dasar) - xGK(dasar, dasar), 0, W.biru, 2.5),
  ...Array.from({ length: 11 }, (_, q) => dasar + q).flatMap((n) => [garis(`gk-q${n}`, xGK(n, dasar), Y_GK - 6, 0, 12, W.biru, 1.5), teks(`gk-l${n}`, xGK(n, dasar), Y_GK + 18, String(n), 9, W.biru)]),
];
const loncatSatuan = (i: number, dasar: number): Obj => panah(`gb-hs${i}`, xGK(dasar + i, dasar) + 3, Y_GK - 10, GK.dx - 6, 0, W.merah, 2);
const katakZoom = (n: number, dasar: number): Obj => emo("gk-tanda", xGK(n, dasar), Y_GK - 16, "\u{1F438}", 16);

const SUARA_E1 = "Metode ketiga bernama Garis Bilangan Puluhan. Kita melompat sepuluh-sepuluh di garis bilangan.";
const SUARA_E2 = "Kita mencari tiga puluh empat. Mulai dari nol, lalu lompat sepuluh, dua puluh, tiga puluh.";
const SUARA_E3 = "Sekarang lompat satu-satu. Perbesar garis dari tiga puluh sampai empat puluh. Tiga puluh satu, tiga puluh dua, tiga puluh tiga, tiga puluh empat.";
const SUARA_E4 = "Kita berhenti di tiga puluh empat. Tiga puluh empat adalah tiga puluhan dan empat satuan.";
const SUARA_E5 = "Tiga lompatan besar berarti tiga puluhan. Empat lompatan kecil berarti empat satuan.";
const posE2 = urutNilai(SUARA_E2, [10, 20, 30], "lompat");
const posE3 = urutBilangan(SUARA_E3, 31, 34, "empat");

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Garis Bilangan Puluhan: lompat sepuluh lalu satu",
  sumber: "Metode luar: Garis Bilangan Puluhan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah(idx(SUARA_E1, "melompat"), ...garisUtama())),
    k(
      SUARA_E2,
      tambah(idx(SUARA_E2, "mencari"), teks("gb-tg", 150, 62, "cari 34", 12, W.ungu)),
      tambah(idx(SUARA_E2, "nol,"), katak(xGB(0), 80)),
      tambah(posE2[0], loncatPuluhan(0)),
      ubah(posE2[0], { id: "gb-tanda", x: xGB(10) }),
      tambah(posE2[1], loncatPuluhan(1)),
      ubah(posE2[1], { id: "gb-tanda", x: xGB(20) }),
      tambah(posE2[2], loncatPuluhan(2)),
      ubah(posE2[2], { id: "gb-tanda", x: xGB(30) }),
    ),
    k(
      SUARA_E3,
      tambah(idx(SUARA_E3, "Perbesar"), ...garisZoom(30), katakZoom(30, 30)),
      ...[0, 1, 2, 3].flatMap((i) => [tambah(posE3[i], loncatSatuan(i, 30)), ubah(posE3[i], { id: "gk-tanda", x: xGK(31 + i, 30) })]),
    ),
    k(SUARA_E4, sorotkan(idx(SUARA_E4, "berhenti"), "gk-tanda"), tambah(idx(SUARA_E4, "adalah"), emo("ok", 262, 62, "✅", 22))),
    k(
      SUARA_E5,
      redamkan(0, "gk-tanda"),
      sorotkan(idx(SUARA_E5, "Tiga"), "gb-hp0", "gb-hp1", "gb-hp2"),
      redamkan(idx(SUARA_E5, "Empat"), "gb-hp0", "gb-hp1", "gb-hp2"),
      sorotkan(idx(SUARA_E5, "Empat"), "gb-hs0", "gb-hs1", "gb-hs2", "gb-hs3"),
    ),
  ],
};

/* ------------------------------ 7. Garis Bilangan Puluhan: terapan ------------------------------ */
const SUARA_F1 = "Terapkan pada bilangan baru. Kita mencari empat puluh tujuh di garis bilangan.";
const SUARA_F2 = "Lompat dulu sepuluh-sepuluh. Sepuluh, dua puluh, tiga puluh, empat puluh.";
const SUARA_F3 = "Berapa lompatan kecil sesudah itu? Ketuk jawaban yang benar.";
const SUARA_F4 = "Betul! Tujuh langkah kecil, jadi tujuh satuan.";
const SUARA_F5 = "Empat puluh tujuh adalah empat puluhan dan tujuh satuan. Lihat, ada tujuh lompatan kecil.";
const SUARA_F6 = "Hebat! Garis bilangan puluhan membantu kita memilih puluhan dulu, lalu satuan.";
const posF2 = urutNilai(SUARA_F2, [10, 20, 30, 40], "sepuluh-sepuluh.");

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Bilangan Puluhan: mencari empat puluh tujuh",
  sumber: "Metode luar: Garis Bilangan Puluhan, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah("Terapkan", ...kepala(2)), tambah(idx(SUARA_F1, "mencari"), ...garisUtama(), teks("gb-tg", 150, 62, "cari 47", 12, W.ungu), katak(xGB(0), 80))),
    k(SUARA_F2, ...[0, 1, 2, 3].flatMap((i) => [tambah(posF2[i], loncatPuluhan(i)), ubah(posF2[i], { id: "gb-tanda", x: xGB((i + 1) * 10) })])),
    k(SUARA_F3, tambah(idx(SUARA_F3, "Berapa"), ...pilihKata(130, ["6", "7", "8"]))),
    k(SUARA_F4, sorotkan(idx(SUARA_F4, "Betul!"), "c2-k")),
    k(
      SUARA_F5,
      hapus(0, ...[1, 2, 3].flatMap((i) => [`c${i}-k`, `c${i}-t`])),
      tambah(idx(SUARA_F5, "puluhan"), ...garisZoom(40), katakZoom(47, 40)),
      tambah(idx(SUARA_F5, "tujuh", 3), ...Array.from({ length: 7 }, (_, i) => loncatSatuan(i, 40))),
    ),
    k(SUARA_F6, tambah("Hebat!", emo("ok", 262, 62, "✅", 22))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Metode pertama, Balok Dienes, memakai batang puluhan dan kubus satuan.";
const SUARA_R2 = "Metode kedua, Kartu Tumpuk, menutup angka nol pada kartu puluhan dengan kartu satuan.";
const SUARA_R3 = "Metode ketiga, Garis Bilangan Puluhan, melompat sepuluh-sepuluh, lalu satu-satu.";
const SUARA_R4 = "Ketiganya menjawab pertanyaan yang sama. Berapa puluhan dan berapa satuan? Pilih yang paling cocok untukmu.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode dari luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, teks("jud", 150, 18, "Tiga metode dari luar", 11, W.ungu)), tambah(idx(SUARA_R1, "pertama,"), ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`, "batang puluhan, kubus satuan"], 9.6))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "kedua,"), ...kartu("r1", 14, 88, 272, 44, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`, "kartu satuan menutup nol"], 9.6))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "ketiga,"), ...kartu("r2", 14, 142, 272, 44, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`, "loncat sepuluh, lalu satu"], 9.6))),
    k(SUARA_R4, bersih(0), tambah(0, teks("jud", 150, 18, "Satu pertanyaan", 11, W.ungu)), tambah("Berapa", ...kartu("rq", 20, 60, 260, 56, W.emas, ["berapa puluhan dan", "berapa satuan?"], 12)), tambah("cocok", emo("ow", 150, 168, "\u{1F989}", 34))),
  ],
};
