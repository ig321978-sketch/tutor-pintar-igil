import type { AdeganStory, Obj } from "./logika-story";
import { W, LEBAH, bangun, emo, hati, idSisi, judul, kartu, lingkaran, namaBangun, relBeraturan, relSegiempat, relSegitiga, sarang, sudutBangun, telur, warnaSegi, teks, kurva } from "./k2b3A-gambar";
import { bersih, hapus, idx, ids, k, redamkan, sisiAksi, sorotkan, sudutAksi, tambah } from "./k2b3A-bantu";

/** Empat segi banyak dalam satu baris (id sg0..sg3): segitiga, segi empat, segi lima, segi enam. */
export const BARIS_SEGI = [
  { x: 45, rel: relSegitiga(44, 38), n: 3 },
  { x: 115, rel: relSegiempat(38, 38), n: 4 },
  { x: 185, rel: relBeraturan(5, 22), n: 5 },
  { x: 255, rel: relBeraturan(6, 22), n: 6 },
];
export const barisSegi = (y: number): Obj[] => BARIS_SEGI.map((b, i) => bangun(`sg${i}`, b.rel, b.x, y, warnaSegi(b.n)));

/* ------------------------------ 2. Sarang lebah Upe ------------------------------ */
const SUARA_S1 = "Hari ini Upe melihat gambar sarang lebah di layar. Lihat, lubangnya banyak sekali!";
const SUARA_S2 = "Kata Upe, setiap lubang sarang itu berbentuk bangun datar. Tepinya garis lurus, bukan garis lengkung. Lebah menyusun lubang-lubang itu dengan rapat, tanpa celah.";
const SUARA_S3 = "Coba kita hitung sisi lubang ini. Satu, dua, tiga, empat, lima, enam.";
const SUARA_S4 = "Ada enam sisi. Bangun datar dengan enam sisi dinamakan segi enam.";
const SUARA_S5 = "Sekarang ayo kita kenali bangun datar yang lain. Ada segitiga, segi empat, segi lima, dan lingkaran.";
export const REL_BESAR = relBeraturan(6, 42);
export const PTS_BESAR = sudutBangun(REL_BESAR, 150, 96);

export const ADEGAN_CERITA_SARANG: AdeganStory = {
  id: "cerita-sarang",
  judul: "Sarang lebah Upe",
  sumber: "Materi: sarang lebah dan segi enam",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Sarang lebah Upe")), tambah(idx(SUARA_S1, "sarang"), ...sarang("sh", 150, 108, 22)), tambah(idx(SUARA_S1, "Lihat,"), emo("lb", 244, 58, LEBAH, 34))),
    k(SUARA_S2, sorotkan(idx(SUARA_S2, "lubang"), "sh0"), tambah(idx(SUARA_S2, "Tepinya"), ...kartu("kt", 50, 174, 200, 24, W.krem, ["tepinya garis lurus"], 11)), redamkan(idx(SUARA_S2, "bukan"), "sh0"), sorotkan(idx(SUARA_S2, "rapat,"), ...ids("sh", 1, 6))),
    k(SUARA_S3, bersih(0), tambah(0, judul("Hitung sisinya"), bangun("bg", REL_BESAR, 150, 96, warnaSegi(6))), ...sisiAksi(SUARA_S3, "bg", PTS_BESAR, { setelah: "ini" })),
    k(SUARA_S4, tambah(idx(SUARA_S4, "enam"), teks("bg-jn", 150, 168, "6 sisi", 12, W.merah)), tambah(idx(SUARA_S4, "segi"), namaBangun("bg", 150, 190, "segi enam", 13))),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Bangun datar yang lain")),
      tambah(idx(SUARA_S5, "segitiga,"), bangun("sg0", relSegitiga(44, 38), 45, 100, warnaSegi(3)), namaBangun("sg0", 45, 140, "segitiga", 9)),
      tambah(idx(SUARA_S5, "empat,"), bangun("sg1", relSegiempat(38, 38), 115, 100, warnaSegi(4)), namaBangun("sg1", 115, 140, "segi empat", 9)),
      tambah(idx(SUARA_S5, "lima,"), bangun("sg2", relBeraturan(5, 22), 185, 100, warnaSegi(5)), namaBangun("sg2", 185, 140, "segi lima", 9)),
      tambah(idx(SUARA_S5, "lingkaran."), lingkaran("lg", 255, 100, 22), namaBangun("lg", 255, 140, "lingkaran", 9)),
    ),
  ],
};

/* ------------------------------ 3. Sisi dan pojok ------------------------------ */
const SUARA_P1 = "Kamu sudah mengenal tiga bentuk dasar. Ada segitiga, segi empat, dan bentuk lengkung.";
const SUARA_P2 = "Semuanya adalah bangun datar. Sekarang kita lihat tepinya dengan teliti.";
const SUARA_P3 = "Perhatikan segitiga ini. Tepinya berupa garis lurus.";
const SUARA_P4 = "Garis lurus pada tepi bangun datar dinamakan sisi. Segitiga ini punya satu, dua, tiga sisi.";
const SUARA_P5 = "Ujung tempat dua sisi bertemu dinamakan pojok atau sudut. Segitiga punya satu, dua, tiga pojok.";
const SUARA_P6 = "Jadi segitiga punya tiga sisi dan tiga pojok. Banyaknya selalu sama.";
const REL_TIGA = relSegitiga(100, 84);
const PTS_TIGA = sudutBangun(REL_TIGA, 150, 100);

export const ADEGAN_SISI_POJOK: AdeganStory = {
  id: "sisi-pojok",
  judul: "Sisi dan pojok bangun datar",
  sumber: "Materi: sisi dan pojok",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tiga bentuk dasar")),
      tambah(idx(SUARA_P1, "segitiga,"), bangun("t0", relSegitiga(48, 42), 50, 90, warnaSegi(3)), namaBangun("t0", 50, 130, "segitiga", 10)),
      tambah(idx(SUARA_P1, "empat,"), bangun("t1", relSegiempat(42, 42), 150, 90, warnaSegi(4)), namaBangun("t1", 150, 130, "segi empat", 10)),
      tambah(idx(SUARA_P1, "lengkung."), lingkaran("t2", 250, 90, 22), namaBangun("t2", 250, 130, "lengkung", 10)),
    ),
    k(SUARA_P2, tambah(idx(SUARA_P2, "bangun"), ...kartu("bd", 80, 156, 140, 28, W.emas, ["bangun datar"], 12)), sorotkan(idx(SUARA_P2, "tepinya"), "t0", "t1", "t2")),
    k(SUARA_P3, bersih(0), tambah(0, judul("Garis lurus")), tambah(idx(SUARA_P3, "segitiga"), bangun("sg", REL_TIGA, 150, 100, warnaSegi(3))), tambah(idx(SUARA_P3, "garis"), ...kartu("kl", 70, 166, 160, 24, W.krem, ["tepi garis lurus"], 11))),
    k(SUARA_P4, tambah(idx(SUARA_P4, "dinamakan"), teks("ss", 232, 70, "sisi", 12, W.merah)), ...sisiAksi(SUARA_P4, "sg", PTS_TIGA, { setelah: "punya" })),
    k(SUARA_P5, hapus(0, ...idSisi("sg", 3), "ss"), ...sudutAksi(SUARA_P5, "sg", PTS_TIGA, { setelah: "punya" }), tambah(idx(SUARA_P5, "sudut."), teks("ps", 232, 70, "pojok", 12, W.merah))),
    k(SUARA_P6, hapus(0, "kl-k", "kl-t0", "ps"), tambah(idx(SUARA_P6, "tiga"), ...kartu("sp", 50, 160, 200, 28, W.emas, ["3 sisi dan 3 pojok"], 12))),
  ],
};

/* ------------------------------ 4. Segi banyak ------------------------------ */
const SUARA_B1 = "Bangun datar yang dibatasi sisi atau garis lurus dinamakan segi banyak.";
const SUARA_B2 = "Contohnya segitiga, segi empat, segi lima, dan segi enam. Semua tepinya garis lurus.";
const SUARA_B3 = "Perhatikan, tidak ada tepi yang melengkung pada segi banyak. Semuanya lurus.";
const SUARA_B4 = "Segi banyak punya sisi dan pojok. Makin banyak sisinya, makin banyak pula pojoknya.";
const NAMA_B = ["segitiga", "segi empat", "segi lima", "segi enam"];

export const ADEGAN_SEGI_BANYAK: AdeganStory = {
  id: "segi-banyak",
  judul: "Segi banyak",
  sumber: "Materi: segi banyak",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Segi banyak")), tambah(idx(SUARA_B1, "sisi"), ...barisSegi(92)), tambah(idx(SUARA_B1, "dinamakan"), ...kartu("sb", 50, 156, 200, 30, W.emas, ["segi banyak"], 14))),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "segitiga,"), namaBangun("sg0", 45, 134, NAMA_B[0], 9)),
      tambah(idx(SUARA_B2, "empat,"), namaBangun("sg1", 115, 134, NAMA_B[1], 9)),
      tambah(idx(SUARA_B2, "lima,"), namaBangun("sg2", 185, 134, NAMA_B[2], 9)),
      tambah(idx(SUARA_B2, "enam."), namaBangun("sg3", 255, 134, NAMA_B[3], 9)),
    ),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Semuanya"), ...ids("sg", 0, 3)), tambah(idx(SUARA_B3, "lurus."), ...BARIS_SEGI.map((b, i) => emo(`ok${i}`, b.x, 58, "✅", 18)))),
    k(
      SUARA_B4,
      redamkan(0, ...ids("sg", 0, 3)),
      hapus(0, "ok0", "ok1", "ok2", "ok3"),
      tambah(idx(SUARA_B4, "pojok."), ...BARIS_SEGI.flatMap((b, i) => sudutBangun(b.rel, b.x, 92).map((p, q) => ({ id: `sg${i}d${q}`, t: "bulat" as const, x: p.x, y: p.y, r: 3.6, warna: W.emas, garis: W.merah, tebal: 1.5, z: 4 })))),
    ),
  ],
};

/* ------------------------------ 5. Bentuk lengkung ------------------------------ */
const SUARA_L1 = "Ada juga bangun datar yang dibatasi kurva. Kurva adalah garis lengkung.";
const SUARA_L2 = "Bangun datar yang dibatasi kurva dinamakan bentuk lengkung.";
const SUARA_L3 = "Contohnya lingkaran, bentuk telur, dan bentuk hati. Semuanya juga bangun datar.";
const SUARA_L4 = "Bentuk lengkung tidak punya sisi yang lurus. Tepinya melengkung terus.";

export const ADEGAN_LENGKUNG: AdeganStory = {
  id: "lengkung",
  judul: "Kurva dan bentuk lengkung",
  sumber: "Materi: kurva dan bentuk lengkung",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Kurva")), tambah(idx(SUARA_L1, "kurva."), kurva("kv", 150, 94)), tambah(idx(SUARA_L1, "lengkung."), ...kartu("kk", 60, 150, 180, 28, W.krem, ["kurva = garis lengkung"], 11))),
    k(SUARA_L2, bersih(0), tambah(0, judul("Bentuk lengkung")), tambah(idx(SUARA_L2, "kurva"), lingkaran("lg", 150, 92, 40)), tambah(idx(SUARA_L2, "bentuk"), namaBangun("lg", 150, 162, "bentuk lengkung", 13))),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Contoh bentuk lengkung")),
      tambah(idx(SUARA_L3, "lingkaran,"), lingkaran("lg", 55, 96, 26), namaBangun("lg", 55, 146, "lingkaran", 10)),
      tambah(idx(SUARA_L3, "telur,"), telur("tl", 150, 96, 34, 22), namaBangun("tl", 150, 146, "telur", 10)),
      tambah(idx(SUARA_L3, "hati."), hati("ht", 245, 98, 26), namaBangun("ht", 245, 146, "hati", 10)),
    ),
    k(SUARA_L4, tambah(idx(SUARA_L4, "tidak"), ...kartu("nl", 50, 164, 200, 26, W.krem, ["0 sisi lurus"], 12)), sorotkan(idx(SUARA_L4, "melengkung"), "lg", "tl", "ht")),
  ],
};
