import type { AdeganStory, Obj } from "./logika-story";
import { ANAK_EMO, OWL, W, benda, bingkai, emo, idBingkai, idKartu, judul, kartu, kartuAngka, kotak, petak, pusatSel, tangan, teks, type Titik } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, mundurAksi, pudarkan, redamkan, sorotkan, tambah, ubah } from "./k1b6C-bantu";

/* ------------------------------ 1. Nilai tempat: puluhan dan satuan ------------------------------ */
const SUARA_N1 = "Cara ketiga, nilai tempat. Setiap bilangan belasan punya puluhan dan satuan.";
const SUARA_N2 = "Lima belas adalah satu puluhan dan lima satuan. Puluhannya satu, satuannya lima.";
const SUARA_N3 = "Sekarang kurangkan satuannya saja. Lima dikurangi tiga sama dengan dua. Puluhannya tidak berubah.";
const SUARA_N4 = "Satuannya sekarang dua. Puluhannya tetap satu. Jadi ada satu puluhan dan dua satuan.";
const SUARA_N5 = "Satu puluhan dan dua satuan dibaca dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas.";
const SUARA_N6 = "Coba lagi dengan enam belas apel, dan empat apel pergi. Satu puluhan dan enam satuan. Enam dikurangi empat sama dengan dua.";
const SUARA_N7 = "Satuannya tinggal dua, puluhannya tetap satu. Jadi enam belas dikurangi empat sama dengan dua belas. Mudah, bukan?";

/** Papan puluhan dan satuan: judul kolom, dua kotak, batang sepuluh, `n` apel satuan. Id berawalan `${p}`. */
function papanNilai(p: string, atas: string, satuan: number): { kepala: Obj[]; batang: Obj[]; apel: Obj[]; digitP: Obj; digitS: Obj; atas: Obj } {
  const pt: Titik[] = petak(satuan, 3, 180, 92, 20, 20);
  return {
    kepala: [
      teks(`${p}hp`, 100, 70, "puluhan", 10, W.ungu),
      teks(`${p}hs`, 200, 70, "satuan", 10, W.ungu),
      kotak(`${p}kp`, 60, 76, 80, 60, W.krem, W.biru, { rx: 6 }),
      kotak(`${p}ks`, 160, 76, 80, 60, W.langit, W.biru, { rx: 6 }),
    ],
    batang: [kotak(`${p}bt`, 84, 82, 32, 48, W.emas, W.coklat, { rx: 4 }), teks(`${p}bs`, 100, 112, "10", 12, W.biru)],
    apel: pt.flatMap((q, i) => benda("apel", `${p}ap${i}`, q.x, q.y, 7, i)),
    digitP: teks(`${p}dp`, 100, 160, "1", 18, W.merah),
    digitS: teks(`${p}ds`, 200, 160, String(satuan), 18, W.merah),
    atas: teks(`${p}at`, 150, 46, atas, 18, W.ungu),
  };
}
const NA = papanNilai("na", "15", 5);
const NB = papanNilai("nb", "16", 6);

export const ADEGAN_NILAI: AdeganStory = {
  id: "nilai-tempat",
  judul: "Nilai tempat: puluhan dan satuan",
  sumber: "Materi: nilai tempat puluhan dan satuan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nilai tempat")),
      tambah("puluhan", NA.kepala[0], NA.kepala[2]),
      tambah("satuan.", NA.kepala[1], NA.kepala[3]),
    ),
    k(
      SUARA_N2,
      tambah(0, NA.atas),
      tambah(idx(SUARA_N2, "satu"), ...NA.batang),
      tambah(idx(SUARA_N2, "lima", 2), ...NA.apel),
      tambah(idx(SUARA_N2, "Puluhannya"), NA.digitP),
      tambah(idx(SUARA_N2, "satuannya"), NA.digitS),
    ),
    k(
      SUARA_N3,
      pudarkan("dikurangi", "naap2", "naap3", "naap4"),
      tambah("Lima", ...kartu("nk", 80, 166, 140, 24, W.krem, ["5 - 3 = 2"], 11)),
      sorotkan("Puluhannya", "nakp"),
    ),
    k(
      SUARA_N4,
      redamkan(0, "nakp"),
      ubah("sekarang", { id: "nads", isi: "2" }),
      sorotkan("Puluhannya", "nabt"),
    ),
    k(
      SUARA_N5,
      redamkan(0, "nabt"),
      hapus(0, ...idKartu("nk")),
      ubah("dibaca", { id: "naat", isi: "12" }),
      tambah("Jadi", ...kartu("nj", 70, 166, 160, 24, W.emas, ["15 - 3 = 12"], 12)),
    ),
    k(
      SUARA_N6,
      bersih(0),
      tambah(0, judul("Nilai tempat lagi")),
      tambah(0, NB.atas, ...NB.kepala, ...NB.batang),
      tambah("apel,", ...NB.apel),
      tambah("Satu", NB.digitP, NB.digitS),
      pudarkan("dikurangi", "nbap2", "nbap3", "nbap4", "nbap5"),
      tambah(idx(SUARA_N6, "enam", 3), ...kartu("nl", 80, 166, 140, 24, W.krem, ["6 - 4 = 2"], 11)),
    ),
    k(
      SUARA_N7,
      ubah("tinggal", { id: "nbds", isi: "2" }),
      ubah("Jadi", { id: "nbat", isi: "12" }),
      hapus(0, ...idKartu("nl")),
      tambah("Jadi", ...kartu("nm", 70, 166, 160, 24, W.emas, ["16 - 4 = 12"], 12)),
    ),
  ],
};

/* ------------------------------ 2. Periksa dengan menambah ------------------------------ */
const SUARA_P1 = "Hasil pengurangan bisa diperiksa dengan penjumlahan. Kita buktikan dengan apel Upe.";
const SUARA_P2 = "Sisa apel ada dua belas. Tiga apel yang dimakan ulat ada di sebelah kanan.";
const SUARA_P3 = "Seret tiga apel itu kembali ke keranjang. Satu, dua, tiga.";
const SUARA_P4 = "Sekarang apel di keranjang ada lima belas lagi. Dua belas ditambah tiga sama dengan lima belas.";
const SUARA_P5 = "Hasilnya sama dengan jumlah apel mula-mula. Berarti pengurangan kita benar.";
const SUARA_P6 = "Ini dua kalimat yang saling cocok. Lima belas dikurangi tiga sama dengan dua belas. Dua belas ditambah tiga sama dengan lima belas.";
const SUARA_P7 = "Pengurangan dan penjumlahan saling memeriksa. Ucapkan lagi mengikuti suara guru.";
export const PK: Titik[] = petak(15, 6, 48, 76, 30, 30);
const KANAN: Titik[] = [{ x: 256, y: 76 }, { x: 256, y: 106 }, { x: 256, y: 136 }];

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa-tambah",
  judul: "Periksa pengurangan dengan menambah",
  sumber: "Materi: periksa dengan menambah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Periksa dengan menambah")),
      tambah("buktikan", kotak("kr", 24, 52, 196, 104, "#FFEDD5", W.coklat, { rx: 10, z: -1, tebal: 2.4 })),
      tambah("apel", ...Array.from({ length: 12 }, (_, i) => benda("apel", `pa${i}`, PK[i].x, PK[i].y, 9, i)).flat(), ...KANAN.flatMap((p, i) => benda("apel", `pa${12 + i}`, p.x, p.y, 9, 12 + i))),
    ),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "dua"), teks("pl", 122, 46, "12", 12, W.merah)),
      tambah(idx(SUARA_P2, "Tiga"), teks("pr", 256, 56, "3", 12, W.merah)),
      sorotkan("kanan.", "pa12", "pa13", "pa14"),
    ),
    k(
      SUARA_P3,
      hapus(0, "pr"),
      ubah(idx(SUARA_P3, "Satu"), { id: "pa12", x: PK[12].x, y: PK[12].y, sorot: false }),
      ubah(idx(SUARA_P3, "dua"), { id: "pa13", x: PK[13].x, y: PK[13].y, sorot: false }),
      ubah(idx(SUARA_P3, "tiga", 2), { id: "pa14", x: PK[14].x, y: PK[14].y, sorot: false }),
    ),
    k(
      SUARA_P4,
      ubah("lima", { id: "pl", isi: "15" }),
      tambah("Dua", ...kartu("pb", 156, 164, 130, 24, W.langit, ["12 + 3 = 15"], 11)),
    ),
    k(
      SUARA_P5,
      tambah("Hasilnya", ...kartu("pc", 14, 164, 130, 24, W.hijauMuda, ["15 - 3 = 12"], 11)),
      tambah("Berarti", emo("ok", 256, 90, "✅", 28)),
    ),
    k(
      SUARA_P6,
      sorotkan(idx(SUARA_P6, "Lima"), "pc-k"),
      sorotkan(idx(SUARA_P6, "dua", 3), "pb-k"),
    ),
    k(
      SUARA_P7,
      redamkan(0, "pc-k", "pb-k"),
      tambah("Ucapkan", emo("ucap", 256, 130, "\u{1F5E3}", 28)),
    ),
  ],
};

/* ------------------------------ 3. Satuan habis ------------------------------ */
const SUARA_H1 = "Kadang semua satuan ikut pergi. Halim punya enam belas kelereng, sepuluh di kotak dan enam lepas.";
const SUARA_H2 = "Halim memberikan semua kelereng lepas kepada Kira. Enam dikurangi enam sama dengan nol.";
const SUARA_H3 = "Tidak ada lagi kelereng lepas. Yang tinggal hanya kotak sepuluh.";
const SUARA_H4 = "Jadi enam belas dikurangi enam sama dengan sepuluh. Satuannya habis, puluhannya tetap satu.";
const SUARA_H5 = "Ingat, kalau satuannya habis, hasilnya sepuluh. Ucapkan lagi, enam belas dikurangi enam sama dengan sepuluh.";
const HX = 85;
const HY = 48;
const LH: Titik[] = [40, 70, 100, 130, 160, 190].map((x) => ({ x, y: 126 }));
const KIRA: Titik[] = petak(6, 3, 238, 112, 22, 22);

export const ADEGAN_HABIS: AdeganStory = {
  id: "satuan-habis",
  judul: "Satuan habis, sepuluh tetap",
  sumber: "Materi: satuan habis",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Satuan habis")),
      tambah("enam", ...kartu("hk", 100, 24, 100, 18, W.krem, ["16 kelereng"], 9)),
      tambah("sepuluh", teks("h10", 150, 112, "10", 11, W.merah), ...bingkai("hb", HX, HY), ...Array.from({ length: 10 }, (_, i) => benda("kelereng", `hl${i}`, pusatSel(i, HX, HY).x, pusatSel(i, HX, HY).y, 9, i)).flat()),
      tambah(idx(SUARA_H1, "enam", 2), ...LH.flatMap((p, i) => benda("kelereng", `hl${10 + i}`, p.x, p.y, 9, 10 + i))),
    ),
    k(
      SUARA_H2,
      hapus(0, ...idKartu("hk")),
      tambah("kepada", emo("a-Kira", 262, 60, ANAK_EMO, 30), teks("n-Kira", 262, 80, "Kira", 8.6)),
      ...LH.map((_, i) => ubah("Kira.", { id: `hl${10 + i}`, x: KIRA[i].x, y: KIRA[i].y })),
      tambah("nol.", ...kartu("h2", 80, 166, 140, 24, W.krem, ["6 - 6 = 0"], 11)),
    ),
    k(
      SUARA_H3,
      sorotkan("Yang", ...idBingkai("hb")),
    ),
    k(
      SUARA_H4,
      redamkan(0, ...idBingkai("hb")),
      hapus(0, ...idKartu("h2")),
      tambah("Jadi", ...kartu("h4", 70, 166, 160, 24, W.emas, ["16 - 6 = 10"], 12)),
    ),
    k(
      SUARA_H5,
      sorotkan("Ingat,", "h4-k"),
      tambah("Ucapkan", emo("ucap", 34, 180, "\u{1F5E3}", 26)),
      tambah("kalau", emo("ow", 262, 180, OWL, 28)),
    ),
  ],
};

/* ------------------------------ 4. Stiker Wei dan Kira ------------------------------ */
const SUARA_W1 = "Wei punya tujuh belas stiker. Stiker Kira lima lebih sedikit dari stiker Wei.";
const SUARA_W2 = "Berapa stiker Kira? Lima tempat kosong ini tidak terisi, karena Kira punya lima lebih sedikit.";
const SUARA_W3 = "Kita hitung mundur lima dari tujuh belas. Enam belas, lima belas, empat belas, tiga belas, dua belas.";
const SUARA_W4 = "Jadi tujuh belas dikurangi lima sama dengan dua belas. Stiker Kira ada dua belas.";
const SUARA_W5 = "Kita periksa dengan menambah. Dua belas ditambah lima sama dengan tujuh belas. Betul!";
const SUARA_W6 = "Sekarang coba satu soal lagi. Wei punya enam belas stiker, dan Kira tiga lebih sedikit. Ketuk bilangan yang menunjukkan stiker Kira.";
const SUARA_W7 = "Betul, tiga belas! Enam belas dikurangi tiga sama dengan tiga belas. Hebat sekali!";
export const PW: Titik[] = Array.from({ length: 17 }, (_, i) => ({ x: 22 + i * 16, y: 78 }));
const PKi: Titik[] = Array.from({ length: 17 }, (_, i) => ({ x: 22 + i * 16, y: 120 }));

export const ADEGAN_STIKER: AdeganStory = {
  id: "stiker-wei",
  judul: "Stiker Wei dan Kira",
  sumber: "Materi: stiker Wei dan Kira",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Stiker Wei dan Kira")),
      tambah("Wei", teks("nw", 50, 58, "Wei: 17", 10, W.ungu)),
      tambah("tujuh", ...PW.flatMap((p, i) => benda("stiker", `wi${i}`, p.x, p.y, 6, i))),
      tambah(idx(SUARA_W1, "Kira"), teks("nk", 30, 100, "Kira", 10, W.ungu)),
      tambah("lima", ...PKi.slice(0, 12).flatMap((p, i) => benda("stiker", `kr${i}`, p.x, p.y, 6, i)), ...PKi.slice(12).flatMap((p, i) => benda("stiker", `kg${12 + i}`, p.x, p.y, 6, i, { warna: W.putih, garis: W.abu, op: 0.5 }))),
    ),
    k(
      SUARA_W2,
      sorotkan("tempat", ...Array.from({ length: 5 }, (_, i) => `kg${12 + i}`)),
      tambah("Berapa", emo("tn", 150, 150, "❓", 26)),
    ),
    k(SUARA_W3, hapus(0, "tn"), redamkan(0, ...Array.from({ length: 5 }, (_, i) => `kg${12 + i}`)), ...mundurAksi(SUARA_W3, "wi", PW, 5)),
    k(
      SUARA_W4,
      tambah("Jadi", ...kartu("w4", 60, 146, 180, 24, W.emas, ["17 - 5 = 12"], 12)),
      sorotkan("Stiker", ...Array.from({ length: 12 }, (_, i) => `kr${i}`)),
    ),
    k(
      SUARA_W5,
      redamkan(0, ...Array.from({ length: 12 }, (_, i) => `kr${i}`)),
      tambah("Dua", ...kartu("w5", 60, 176, 180, 22, W.langit, ["12 + 5 = 17"], 11)),
      tambah("Betul!", emo("ok", 270, 188, "✅", 24)),
    ),
    k(
      SUARA_W6,
      bersih(0),
      tambah(0, judul("Satu soal lagi")),
      tambah("Wei", ...kartu("q0", 40, 40, 220, 26, W.krem, ["Wei 16 stiker, Kira 3 lebih sedikit"], 9)),
      tambah("bilangan", ...[12, 13, 14].flatMap((n, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], 86, String(n), [W.hijauMuda, W.pink, W.langit][i], 80, 40, 20))),
      tambah("Ketuk", tangan(150, 150)),
      sorotkan("Kira@2", "c2-k"),
    ),
    k(
      SUARA_W7,
      hapus(0, "tg"),
      tambah("Betul,", emo("ok", 150, 140, "✅", 28)),
      tambah("Enam", ...kartu("q7", 60, 164, 180, 26, W.emas, ["16 - 3 = 13"], 12)),
      tambah("Hebat", emo("ow", 262, 188, OWL, 26)),
    ),
  ],
};
