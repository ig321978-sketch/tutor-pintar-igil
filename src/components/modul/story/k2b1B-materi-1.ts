import type { AdeganStory, Obj } from "./logika-story";
import { OWL, TABEL_BESAR, W, angkaP, angkaS, batang, bilanganT, emo, idBatang, isiTabel, judul, kartu, kubus, kubusKisi, labelN, tabelNT, teks, titikKubusTabel, type Titik } from "./k2b1B-gambar";
import { bersih, hapus, hitungAksi, idKubus, idx, k, redamkan, sorotkan, tambah } from "./k2b1B-bantu";

/* ------------------------------ 1. Kubus Malosi berserakan ------------------------------ */
/** Letak empat belas kubus yang berserakan (tersebar, tidak saling menimpa). */
export const SEBAR: Titik[] = Array.from({ length: 14 }, (_, i) => {
  const c = i % 5;
  const r = Math.floor(i / 5);
  return { x: 28 + c * 52 + (((i * 7) % 5) - 2) * 6, y: 52 + r * 38 + (((i * 3) % 4) - 1.5) * 5 };
});
const kubusSebar = (): Obj[] => SEBAR.map((p, i) => kubus("a", i, p.x, p.y));

const SUARA_A1 = "Hari ini Malosi bermain kubus susun. Aduh, kubus-kubusnya berserakan di layar!";
const SUARA_A2 = "Malosi ingin tahu, ada berapa kubus? Kalau dihitung satu per satu, bisa lama dan mudah salah.";
const SUARA_A3 = "Kita coba hitung. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas.";
const SUARA_A4 = "Ada empat belas kubus. Tetapi menghitung satu per satu itu lama. Ada cara yang lebih rapi, yaitu memakai nilai tempat.";
const SUARA_A5 = "Nilai tempat membantu kita menghitung dengan puluhan dan satuan. Ayo kita belajar bersama Malosi!";

export const ADEGAN_BERSERAKAN: AdeganStory = {
  id: "kubus-berserakan",
  judul: "Kubus Malosi yang berserakan",
  sumber: "Materi: banyak kubus yang berserakan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Kubus Malosi")), tambah(idx(SUARA_A1, "Aduh"), ...kubusSebar())),
    k(SUARA_A2, sorotkan(idx(SUARA_A2, "berapa"), ...idKubus("a", 0, 13)), redamkan(idx(SUARA_A2, "Kalau"), ...idKubus("a", 0, 13)), tambah(idx(SUARA_A2, "lama"), emo("q", 150, 172, "\u{1F615}", 26))),
    k(SUARA_A3, bersih(0), tambah(0, judul("Hitung satu per satu"), ...kubusSebar()), ...hitungAksi(SUARA_A3, "bsa", SEBAR.map((p) => ({ x: p.x + 5, y: p.y + 5 })), { setelah: "hitung." })),
    k(SUARA_A4, tambah(idx(SUARA_A4, "Ada"), labelN("a", 150, 176, "14", 22)), tambah(idx(SUARA_A4, "rapi,"), ...kartu("cr", 40, 180, 220, 20, W.emas, ["cara rapi: nilai tempat"], 9.6))),
    k(SUARA_A5, bersih(0), tambah(0, judul("Nilai tempat")), tambah("puluhan", ...kartu("pn", 30, 50, 240, 40, W.krem, ["nilai tempat:", "puluhan dan satuan"], 11)), tambah("bersama", emo("ow", 150, 150, OWL, 44))),
  ],
};

/* ------------------------------ 2. Sepuluh kubus menjadi satu puluhan ------------------------------ */
const X0 = 60;
const BARIS1 = 62;
const BARIS2 = 84;
const baris1 = (): Obj[] => kubusKisi("a", 0, 9, X0, BARIS1, 10, 10);
const baris2 = (): Obj[] => kubusKisi("a", 10, 13, X0, BARIS1, 10, 10).map((o) => ({ ...o, y: BARIS2 }));
const SUARA_B1 = "Malosi punya empat belas kubus. Ia menyusunnya rapi, sepuluh kubus dalam satu baris.";
const SUARA_B2 = "Sepuluh kubus itu kita satukan menjadi satu batang. Satu batang berisi sepuluh kubus.";
const SUARA_B3 = "Satu batang berisi sepuluh kubus disebut satu puluhan.";
const SUARA_B4 = "Kubus yang tersisa, kurang dari sepuluh, disebut satuan. Ada empat kubus, jadi empat satuan.";
const SUARA_B5 = "Jadi empat belas adalah satu puluhan dan empat satuan.";
const SUARA_B6 = "Mudah, bukan? Kita tidak perlu menghitung satu per satu lagi.";

export const ADEGAN_SATU_PULUHAN: AdeganStory = {
  id: "satu-puluhan",
  judul: "Sepuluh kubus menjadi satu puluhan",
  sumber: "Materi: satu puluhan dan satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Satu puluhan")),
      tambah(idx(SUARA_B1, "punya"), ...baris1(), ...baris2()),
      tambah(idx(SUARA_B1, "belas"), labelN("a", 233, 150, "14", 24)),
      tambah(idx(SUARA_B1, "sepuluh"), teks("lb10", X0 + 50, BARIS1 - 6, "10", 10, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(idx(SUARA_B2, "satukan"), ...idKubus("a", 0, 9), "lb10"),
      tambah(idx(SUARA_B2, "satukan"), ...batang("a", 0, X0, BARIS1)),
      tambah(idx(SUARA_B2, "berisi"), teks("lg", 150, 196, "1 batang: 10 kubus", 8.4, W.ungu)),
    ),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Satu"), ...idBatang("a", 0)), tambah(idx(SUARA_B3, "puluhan."), ...kartu("kp", 176, 46, 114, 26, W.hijauMuda, ["1 puluhan"], 11))),
    k(SUARA_B4, redamkan(0, ...idBatang("a", 0)), sorotkan(idx(SUARA_B4, "tersisa,"), ...idKubus("a", 10, 13)), tambah(idx(SUARA_B4, "satuan."), ...kartu("ks", 176, 80, 114, 26, W.langit, ["4 satuan"], 11))),
    k(SUARA_B5, redamkan(0, ...idKubus("a", 10, 13)), sorotkan(idx(SUARA_B5, "satu"), ...idBatang("a", 0)), redamkan(idx(SUARA_B5, "empat", 2), ...idBatang("a", 0)), sorotkan(idx(SUARA_B5, "empat", 2), ...idKubus("a", 10, 13)), sorotkan(idx(SUARA_B5, "satuan."), "n-a")),
    k(SUARA_B6, redamkan(0, ...idKubus("a", 10, 13)), tambah("bukan?", emo("ok", 262, 190, "✅", 22)), tambah("perlu", ...kartu("kc", 50, 164, 200, 22, W.emas, ["cepat, rapi, dan mudah"], 10))),
  ],
};

/* ------------------------------ 3. Tabel nilai tempat ------------------------------ */
const G = TABEL_BESAR;
const SUARA_C1 = "Ini tabel nilai tempat. Kolom kiri untuk puluhan, kolom kanan untuk satuan.";
const SUARA_C2 = "Malosi menaruh satu batang di kolom puluhan, dan empat kubus di kolom satuan.";
const SUARA_C3 = "Sekarang kita isi angkanya. Di kolom puluhan kita pilih angka satu. Di kolom satuan kita pilih angka empat.";
const SUARA_C4 = "Angka di sebelah kiri menunjukkan banyak puluhan. Angka di sebelah kanan menunjukkan banyak satuan.";
const SUARA_C5 = "Satu puluhan dan empat satuan dibaca empat belas.";
const SUARA_C6 = "Dengan tabel ini, kita bisa menuliskan banyaknya kubus dengan rapi dan mudah dibaca.";

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel-nilai-tempat",
  judul: "Tabel nilai tempat",
  sumber: "Materi: tabel nilai tempat",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Tabel nilai tempat")),
      tambah(idx(SUARA_C1, "tabel"), ...tabelNT("a", G)),
      sorotkan(idx(SUARA_C1, "puluhan,"), "ta-hk", "ta-hp"),
      redamkan(idx(SUARA_C1, "kanan"), "ta-hk", "ta-hp"),
      sorotkan(idx(SUARA_C1, "satuan."), "ta-hk2", "ta-hs"),
    ),
    k(
      SUARA_C2,
      redamkan(0, "ta-hk2", "ta-hs"),
      tambah(idx(SUARA_C2, "batang"), ...isiTabel("a", G, 1, 0)),
      tambah(idx(SUARA_C2, "kubus"), ...Array.from({ length: 4 }, (_, j) => kubus("a", j, titikKubusTabel(G, j).x, titikKubusTabel(G, j).y))),
    ),
    k(SUARA_C3, tambah(idx(SUARA_C3, "satu"), angkaP("a", G, "1")), tambah(idx(SUARA_C3, "empat"), angkaS("a", G, "4"))),
    k(SUARA_C4, sorotkan(idx(SUARA_C4, "kiri"), "ta-p"), redamkan(idx(SUARA_C4, "kanan"), "ta-p"), sorotkan(idx(SUARA_C4, "kanan"), "ta-s")),
    k(SUARA_C5, redamkan(0, "ta-s"), tambah(idx(SUARA_C5, "dibaca"), bilanganT("a", G, "14"))),
    k(SUARA_C6, tambah("rapi", emo("ok", 262, 196, "✅", 22))),
  ],
};
