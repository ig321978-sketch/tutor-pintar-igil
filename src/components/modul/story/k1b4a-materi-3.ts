import type { AdeganStory } from "./logika-story";
import {
  OWL,
  W,
  WARNA_LENGKUNG,
  WARNA_SEGIEMPAT,
  WARNA_SEGITIGA,
  bangun,
  bulat,
  donat,
  emo,
  garisSisi,
  idSudut,
  jam,
  judul,
  kartu,
  kartuAngka,
  kotak,
  lonjong,
  nama,
  sudutBangun,
  tangan,
  teks,
  telur,
} from "./k1b4a-gambar";
import { bersih, hapus, hitungSudut, k, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b4a-bantu";

/* ------------------------------ 1. Papan paku dan karet gelang ------------------------------ */
const SUARA_G1 = "Ini papan paku. Kita bisa merentangkan karet gelang di antara paku. Karet itu akan membentuk bangun.";
const SUARA_G2 = "Ketuk tiga paku untuk segitiga. Satu, dua, tiga. Karetnya menyambung menjadi segitiga.";
const SUARA_G3 = "Sekarang ketuk empat paku untuk segi empat. Satu, dua, tiga, empat. Karetnya menyambung menjadi segi empat.";
const SUARA_G4 = "Segi empat ini punya empat sudut. Banyak sudutnya sama dengan banyak paku yang kita ketuk.";
const PX = [96, 132, 168, 204];
const PY = [54, 90, 126, 162];
const PAKU = PY.flatMap((y, r) => PX.map((x, c) => bulat(`pg${r * 4 + c}`, x, y, 3.5, "#94A3B8", W.biru, { tebal: 1 })));
const SEGITIGA_PAKU = [{ x: 132, y: 54 }, { x: 204, y: 162 }, { x: 96, y: 162 }];
const SEGIEMPAT_PAKU = [{ x: 96, y: 54 }, { x: 168, y: 54 }, { x: 168, y: 126 }, { x: 96, y: 126 }];

export const ADEGAN_PAKU: AdeganStory = {
  id: "papan-paku",
  judul: "Papan paku dan karet gelang",
  sumber: "Materi: papan paku dan karet gelang",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Papan paku"), kotak("bd", 78, 36, 144, 146, "#FEF3C7", W.coklat, { rx: 8, tebal: 3, z: -2 })), tambah("paku.", ...PAKU)),
    k(
      SUARA_G2,
      ...hitungSudut(SUARA_G2, "g", SEGITIGA_PAKU, "segitiga."),
      tambah("Karetnya", ...[0, 1, 2].map((i) => garisSisi("g", SEGITIGA_PAKU, i))),
    ),
    k(
      SUARA_G3,
      hapus(0, ...idSudut("g", 3), "gs0", "gs1", "gs2"),
      ...hitungSudut(SUARA_G3, "g", SEGIEMPAT_PAKU),
      tambah("Karetnya", ...[0, 1, 2, 3].map((i) => garisSisi("g", SEGIEMPAT_PAKU, i))),
    ),
    k(SUARA_G4, tambah("sudut.", teks("gt", 150, 196, "4 sudut", 11, W.merah)), sorotkan("sudut.", "gd0", "gd1", "gd2", "gd3")),
  ],
};

/* ------------------------------ 2. Warnai menurut nama ------------------------------ */
const SUARA_W1 = "Sekarang kita mewarnai bentuk di layar. Ada tiga krayon. Kuning untuk lengkung, merah muda untuk segitiga, hijau untuk segi empat.";
const SUARA_W2 = "Ketuk krayon kuning, lalu ketuk semua bentuk lengkung. Bulat dan lonjong sama-sama lengkung.";
const SUARA_W3 = "Ketuk krayon merah muda, lalu ketuk semua segitiga. Segitiga yang miring juga segitiga.";
const SUARA_W4 = "Terakhir, krayon hijau untuk segi empat. Segi empat yang miring juga ikut diwarnai.";
const SUARA_W5 = "Hitung segitiga yang berwarna merah muda. Satu, dua. Ada dua segitiga.";
const XW = [30, 77, 124, 171, 218, 265];
const KRAYON: [string, string][] = [["Kuning", WARNA_LENGKUNG], ["Merah muda", WARNA_SEGITIGA], ["Hijau", WARNA_SEGIEMPAT]];
const KRAYON_X = [14, 110, 206];
const POLOS = "#FFFFFF";
const bentukPolos = [
  bulat("w0", XW[0], 122, 16, POLOS, W.biru, { tebal: 2 }),
  bangun("w1", "segitiga", XW[1], 122, 34, 30, POLOS),
  bangun("w2", "segiempat", XW[2], 122, 32, 26, POLOS),
  lonjong("w3", XW[3], 122, 17, 12, POLOS),
  bangun("w4", "segitiga", XW[4], 122, 34, 30, POLOS, 40),
  bangun("w5", "segiempat", XW[5], 122, 30, 22, POLOS, 25),
];

export const ADEGAN_WARNAI: AdeganStory = {
  id: "warnai-nama",
  judul: "Warnai bentuk menurut namanya",
  sumber: "Materi: mewarnai bentuk menurut nama",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Warnai bentuknya")),
      tambah("bentuk", ...bentukPolos),
      tambah("krayon.", ...KRAYON.flatMap(([t, w], i) => kartu(`kr${i}`, KRAYON_X[i], 34, 80, 24, w, [t], 9.4))),
    ),
    k(SUARA_W2, sorotkan("kuning,", "kr0-k"), ubah("Bulat", { id: "w0", warna: WARNA_LENGKUNG }), ubah("lonjong", { id: "w3", warna: WARNA_LENGKUNG })),
    k(SUARA_W3, redamkan(0, "kr0-k"), sorotkan("merah", "kr1-k"), ubah("segitiga.", { id: "w1", warna: WARNA_SEGITIGA }), ubah("miring", { id: "w4", warna: WARNA_SEGITIGA })),
    k(SUARA_W4, redamkan(0, "kr1-k"), sorotkan("hijau", "kr2-k"), ubah("segi", { id: "w2", warna: WARNA_SEGIEMPAT }), ubah("miring", { id: "w5", warna: WARNA_SEGIEMPAT })),
    k(
      SUARA_W5,
      redamkan(0, "kr2-k"),
      ...urutKata(SUARA_W5, ["satu", "dua"], "muda.").map((p, i) => tambah(p, teks(`wl${i}`, XW[i === 0 ? 1 : 4], 92, String(i + 1), 11, W.merah))),
      tambah("segitiga@2", teks("wt", 150, 168, "2 segitiga", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Detektif bentuk ------------------------------ */
const SUARA_D1 = "Sekarang kita menjadi detektif bentuk. Baca petunjuk, lalu sebut nama bentuknya.";
const SUARA_D2 = "Petunjuk pertama, aku punya tiga sisi lurus. Petunjuk kedua, aku punya tiga sudut. Siapa aku?";
const SUARA_D3 = "Pilih jawaban di layar. Benar, aku segitiga! Tiga sisi lurus dan tiga sudut.";
const SUARA_D4 = "Petunjuk berikutnya, aku tidak punya sudut sama sekali. Tepiku melengkung. Siapa aku?";
const SUARA_D5 = "Pilih jawaban di layar. Betul, aku bentuk lengkung! Hebat sekali, detektif bentuk.";
const PIL: [string, string, string][] = [["Lengkung", W.hijauMuda, "c1"], ["Segitiga", W.pink, "c2"], ["Segi empat", W.langit, "c3"]];
const pilihan = (y: number) => PIL.flatMap(([t, w, id], i) => kartu(id, [14, 108, 202][i], y, 84, 30, w, [t], 9.6));

export const ADEGAN_DETEKTIF: AdeganStory = {
  id: "detektif",
  judul: "Detektif bentuk: tebak dari petunjuk",
  sumber: "Materi: detektif bentuk",
  latar: "#EEF2FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Detektif bentuk")), tambah("detektif", emo("lp", 150, 92, "\u{1F50E}", 52)), tambah("petunjuk,", ...kartu("sa", 60, 130, 180, 32, W.krem, ["Siapa aku?"], 12))),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Petunjuk")),
      tambah("pertama,", ...kartu("p1", 20, 36, 260, 30, W.hijauMuda, ["Petunjuk 1: 3 sisi lurus"], 10)),
      tambah("kedua,", ...kartu("p2", 20, 76, 260, 30, W.langit, ["Petunjuk 2: 3 sudut"], 10)),
      tambah("Siapa", ...kartu("sa", 60, 122, 180, 32, W.krem, ["Siapa aku?"], 12)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Pilih jawabanmu"), ...pilihan(70)),
      tambah("Pilih", tangan(150, 118)),
      sorotkan("Benar,", "c2-k"),
      tambah("segitiga!", emo("ok", 150, 168, "✅", 34)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Petunjuk berikutnya")),
      tambah("tidak", ...kartu("p3", 20, 36, 260, 30, W.hijauMuda, ["Petunjuk: 0 sudut"], 10)),
      tambah("melengkung.", ...kartu("p4", 20, 76, 260, 30, W.langit, ["Petunjuk: tepi melengkung"], 10)),
      tambah("Siapa", ...kartu("sa", 60, 122, 180, 32, W.krem, ["Siapa aku?"], 12)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Pilih jawabanmu"), ...pilihan(70)),
      tambah("Pilih", tangan(56, 118)),
      sorotkan("Betul,", "c1-k"),
      tambah("lengkung!", emo("ok", 150, 168, "✅", 34)),
      tambah("Hebat", emo("ow", 262, 118, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 1: donat Kira ------------------------------ */
const SUARA_A1 = "Latihan satu. Kira punya sebuah donat yang bulat. Donat itu berbentuk apa?";
const SUARA_A2 = "Lihat tepi donat. Tepinya melengkung dan tidak punya sudut. Hitung sudutnya, tidak ada.";
const SUARA_A3 = "Pilih jawaban yang benar di layar. Ada tiga pilihan: bentuk lengkung, segitiga, atau segi empat.";
const SUARA_A4 = "Betul! Donat Kira berbentuk lengkung. Hebat sekali! Kamu sudah bisa mengenali bentuk lengkung.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: donat Kira",
  sumber: "Materi: latihan mengenali bentuk lengkung",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah("donat", donat("ld", 150, 66, 54)), tambah("berbentuk", teks("lt", 150, 116, "donat Kira", 11, W.ungu))),
    k(SUARA_A2, sorotkan("Lihat", "ld"), tambah("melengkung", ...kartu("lc", 40, 126, 220, 26, W.krem, ["tepi melengkung • 0 sudut"], 9.8))),
    k(SUARA_A3, redamkan(0, "ld"), tambah("Pilih", tangan(150, 196)), tambah("pilihan:", ...pilihan(158).filter((o) => o.id !== "x"))),
    k(SUARA_A4, hapus(0, "tg"), sorotkan("Betul!", "c1-k"), tambah("Hebat", emo("ok", 262, 70, "✅", 30), emo("ow", 40, 70, OWL, 30))),
  ],
};

/* ------------------------------ 5. Latihan 2: benda segitiga ------------------------------ */
const SUARA_B1 = "Latihan dua. Tika mencari benda yang berbentuk segitiga. Ada empat benda: jam dinding, pintu, irisan semangka, dan telur.";
const SUARA_B2 = "Jam dinding tepinya melengkung. Telur juga melengkung. Pintu punya empat sudut. Jadi bukan itu yang dicari.";
const SUARA_B3 = "Irisan semangka punya tiga sisi lurus dan tiga sudut. Ketuk irisan semangka di layar.";
const SUARA_B4 = "Betul! Irisan semangka berbentuk segitiga. Latihan dua selesai, kamu hebat!";
const XB = [45, 115, 185, 255];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: cari benda segitiga",
  sumber: "Materi: latihan mencari benda segitiga",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2")),
      tambah("jam", jam("bj", XB[0], 80, 17), nama("bjn", XB[0], 116, "jam dinding", 8.4)),
      tambah("pintu,", kotak("bp", XB[1] - 12, 60, 24, 40, "#D97706", W.coklat, { rx: 2, tebal: 2 }), nama("bpn", XB[1], 116, "pintu", 8.4)),
      tambah("semangka,", bangun("bs", "segitiga", XB[2], 80, 40, 36, "#F87171"), nama("bsn", XB[2], 116, "semangka", 8.4)),
      tambah("telur.", telur("bt", XB[3], 80, 11, 16), nama("btn", XB[3], 116, "telur", 8.4)),
    ),
    k(SUARA_B2, ubah("Jam", { id: "bj", op: 0.25 }, { id: "bjn", op: 0.25 }), ubah("Telur", { id: "bt", op: 0.25 }, { id: "btn", op: 0.25 }), ubah("Pintu", { id: "bp", op: 0.25 }, { id: "bpn", op: 0.25 })),
    k(SUARA_B3, sorotkan("Irisan", "bs"), tambah("sisi", teks("bc", 150, 150, "3 sisi lurus • 3 sudut", 10, W.merah)), tambah("Ketuk", tangan(XB[2], 138))),
    k(SUARA_B4, hapus(0, "tg"), tambah("Betul!", emo("ok", 262, 160, "✅", 34)), tambah("Latihan", emo("ow", 40, 170, OWL, 32))),
  ],
};

/* ------------------------------ 6. Latihan 3: sudut segi empat miring ------------------------------ */
const SUARA_C1 = "Latihan tiga. Malosi melihat segi empat yang miring. Berapa banyak sudutnya?";
const SUARA_C2 = "Kita hitung sudutnya. Satu, dua, tiga, empat. Ada empat sudut.";
const SUARA_C3 = "Sekarang pilih jawabannya di layar. Banyak sudut segi empat adalah tiga, empat, atau lima?";
const SUARA_C4 = "Betul, empat! Segi empat punya empat sudut, walau bentuknya miring. Hebat sekali!";
const PM = sudutBangun("segiempat", 150, 100, 80, 56, 30);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: sudut segi empat miring",
  sumber: "Materi: latihan menghitung sudut",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah("miring.", bangun("lm", "segiempat", 150, 100, 80, 56, WARNA_SEGIEMPAT, 30, { tebal: 2 })), tambah("Berapa", teks("lq", 150, 184, "Berapa sudutnya?", 12, W.ungu))),
    k(SUARA_C2, hapus(0, "lq"), ...hitungSudut(SUARA_C2, "m", PM, "sudutnya."), tambah("sudut.@2", teks("lc", 150, 184, "4 sudut", 12, W.merah))),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Pilih jawabanmu")),
      tambah("Sekarang", ...[3, 4, 5].flatMap((n, i) => kartuAngka(`o${n}`, 66 + i * 60, 80, String(n), W.krem, 40, 36, 22))),
      tambah("layar.", tangan(150, 140)),
    ),
    k(SUARA_C4, hapus(0, "tg"), sorotkan("Betul,", "o4-k"), tambah("empat!", emo("ok", 150, 168, "✅", 34)), tambah("Hebat", emo("ow", 262, 150, OWL, 30))),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Bentuk lengkung tepinya melengkung dan tidak punya sudut. Ucapkan lagi mengikuti suara guru.";
const SUARA_Z2 = "Segitiga punya tiga sisi lurus dan tiga sudut. Segi empat punya empat sisi lurus dan empat sudut.";
const SUARA_Z3 = "Bentuk tidak berubah karena diputar atau karena besar kecilnya. Kamu bisa mengetuk benda di layar, lalu menyebut bentuknya.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("lengkung", ...kartu("z1", 14, 34, 272, 34, W.hijauMuda, ["Lengkung: 0 sisi lurus • 0 sudut"], 9.6))),
    k(SUARA_Z2, tambah("Segitiga", ...kartu("z2", 14, 78, 272, 34, W.pink, ["Segitiga: 3 sisi lurus • 3 sudut"], 9.6)), tambah("Segi", ...kartu("z3", 14, 122, 272, 34, W.langit, ["Segi empat: 4 sisi lurus • 4 sudut"], 9.6))),
    k(SUARA_Z3, tambah("Kamu", ...kartu("z4", 14, 166, 272, 28, W.krem, ["diputar atau besar kecil: tetap sama"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
