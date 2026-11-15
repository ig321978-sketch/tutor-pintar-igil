import type { AdeganStory, Obj } from "./logika-story";
import { W, deretBilangan, emo, judul, kartu, kartuAngka, kotak, teks } from "./k1b1c-gambar";
import { bersih, k, langkahDeret, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b1c-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b1c-luar-1";

const KATAK = "\u{1F438}";
const IGIL = "\u{1F989}";
const x = (v: number): number => 33 + 26 * (v - 1);

/* ------------------------------ 1. CPA Pictorial: terapan ------------------------------ */
const SUARA_H1 = "Ini garis bilangan, gambar yang menunjukkan urutan angka. Katak mulai dari bilangan tiga.";
const SUARA_H2 = "Katak melompat maju ke kanan: tiga, empat, lima, enam, tujuh.";
const SUARA_H3 = "Sekarang katak melompat mundur ke kiri: tujuh, enam, lima, empat, tiga.";
const SUARA_H4 = "Bilangan yang hilang juga mudah dicari. Lihat kotak tanya di antara empat dan enam. Katak tahu jawabannya lima.";

export const ADEGAN_LUAR_GAMBAR_TERAPAN: AdeganStory = {
  id: "luar-gambar-terapan",
  judul: "CPA Pictorial: katak di garis bilangan",
  sumber: "Metode luar: CPA Pictorial, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_H1, tambah("Ini", ...kepala(1), ...deretBilangan("gr", 90)), tambah("tiga.", emo("up", x(3), 86, KATAK, 22)), sorotkan("tiga.", "grk3")),
    k(SUARA_H2, ...langkahDeret(SUARA_H2, [3, 4, 5, 6, 7], "gr", 90, "kanan:"), tambah("maju", ...kartu("hm", 40, 136, 220, 28, W.hijauMuda, ["maju: lompat ke kanan"], 10))),
    k(
      SUARA_H3,
      ubah(0, { id: "hm-t0", isi: "mundur: lompat ke kiri" }, { id: "hm-k", warna: W.langit }),
      ...langkahDeret(SUARA_H3, [7, 6, 5, 4, 3], "gr", 90, "kiri:"),
    ),
    k(
      SUARA_H4,
      redamkan(0, "grk3", "grk4", "grk5", "grk6", "grk7"),
      ubah("kotak", { id: "grt5", isi: "?", warna: W.merah }),
      ubah("lima.", { id: "up", x: x(5) }, { id: "grt5", isi: "5", warna: W.hijau }),
      ubah("tanya", { id: "hm-t0", isi: "kotak tanya di antara 4 dan 6" }, { id: "hm-k", warna: W.krem }),
    ),
  ],
};

/* ------------------------------ 2. CPA Abstract: konsep ------------------------------ */
const SUARA_S1 = "Metode ketiga, CPA Abstract, atau Simbol Matematika. Sekarang kita memakai angka saja, tanpa benda dan tanpa gambar.";
const SUARA_S2 = "Angka adalah simbol untuk bilangan. Kita menulis angka, lalu menghitung maju dengan angka itu.";
const SUARA_S3 = "Menghitung mundur juga bisa ditulis dengan angka saja, dari sepuluh turun terus sampai satu.";
const SUARA_S4 = "Cara ini paling ringkas, tetapi dipakai setelah kita paham dengan benda dan gambar.";

export const ADEGAN_LUAR_SIMBOL: AdeganStory = {
  id: "luar-simbol",
  judul: "CPA Abstract: memakai angka saja",
  sumber: "Metode luar: CPA Abstract",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_S1, tambah("ketiga,", ...kepala(2)), tambah("angka", ...kartu("sa", 50, 90, 200, 50, W.krem, ["1 2 3 4 5"], 26))),
    k(
      SUARA_S2,
      tambah("simbol", emo("sy", 150, 76, "\u{1F522}", 30)),
      tambah("maju", teks("sm", 150, 170, "1 → 2 → 3 → 4 → 5", 16, W.hijau)),
    ),
    k(
      SUARA_S3,
      tambah("mundur", teks("sd", 150, 190, "10 9 8 7 6 5 4 3 2 1", 14, W.merah)),
      sorotkan("sepuluh", "sa-k"),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Dari benda ke angka")),
      tambah("benda", emo("c1", 60, 90, "\u{1F9F1}", 40)),
      tambah("gambar.", emo("c2", 150, 90, "\u{1F5BC}️", 40), emo("c3", 240, 90, "\u{1F522}", 40), ...kartu("sk", 40, 124, 220, 34, W.emas, ["benda → gambar → angka"], 11)),
    ),
  ],
};

/* ------------------------------ 3. CPA Abstract: terapan ------------------------------ */
const SUARA_U1 = "Mari lengkapi urutan dengan angka saja. Lihat deretan ini: dua, tiga, bilangan yang hilang, lima, enam.";
const SUARA_U2 = "Lihat bilangan di sebelahnya. Setelah tiga datang empat, dan sebelum lima juga empat.";
const SUARA_U3 = "Jadi bilangan yang hilang adalah empat. Tulis angka empat pada kotak yang kosong.";
const SUARA_U4 = "Sekarang urutan mundur: delapan, tujuh, bilangan yang hilang, lima. Jawabannya enam.";
const lima = (p: string, i: number, isi: string): Obj[] => kartuAngka(`${p}${i}`, 12 + i * 55, 66, isi, isi === "?" ? W.emas : WARNA_METODE[i % 3], 48, 56, 26);
const empat = (p: string, i: number, isi: string): Obj[] => kartuAngka(`${p}${i}`, 10 + i * 72, 66, isi, isi === "?" ? W.emas : WARNA_METODE[i % 3], 58, 56, 30);
const posU1 = urutKata(SUARA_U1, ["dua", "tiga", "hilang", "lima", "enam"], "ini:");
const posU4 = urutKata(SUARA_U4, ["delapan", "tujuh", "hilang", "lima"], "mundur:");

export const ADEGAN_LUAR_SIMBOL_TERAPAN: AdeganStory = {
  id: "luar-simbol-terapan",
  judul: "CPA Abstract: melengkapi dengan angka",
  sumber: "Metode luar: CPA Abstract, terapan",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(2)), ...["2", "3", "?", "5", "6"].map((v, i) => tambah(posU1[i], ...lima("u", i, v)))),
    k(SUARA_U2, sorotkan("sebelahnya.", "u1-k", "u3-k"), tambah("Setelah", ...kartu("us", 50, 140, 200, 28, W.krem, ["3, ?, 5: tetangganya 3 dan 5"], 9.6))),
    k(SUARA_U3, ubah("empat.", { id: "u2-t", isi: "4", warna: W.hijau }, { id: "u2-k", warna: W.hijauMuda }), tambah("Tulis", emo("pn", 150, 190, "✏️", 28))),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, ...kepala(2)),
      ...["8", "7", "?", "5"].map((v, i) => tambah(posU4[i], ...empat("w", i, v))),
      ubah("Jawabannya", { id: "w2-t", isi: "6", warna: W.hijau }, { id: "w2-k", warna: W.hijauMuda }),
      tambah("enam.", emo("ok", 150, 150, "✅", 32)),
    ),
  ],
};

/* ------------------------------ 4. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "CPA Concrete: pegang benda dulu, seperti menyusun dan membongkar tangga balok.";
const SUARA_R3 = "CPA Pictorial: pindah ke gambar, seperti garis bilangan. CPA Abstract: tulis angka saja.";
const SUARA_R4 = "Ketiganya membantu kita menghitung maju dan mundur, dari satu sampai sepuluh. Terima kasih sudah belajar.";
const DESKRIPSI = ["pegang benda, susun tangga balok", "pindah ke gambar, garis bilangan", "tulis angka saja"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Concrete:", "rm0-k"), tambah("pegang", deskripsi(0))),
    k(SUARA_R3, sorotkan("Pictorial:", "rm1-k"), tambah("pindah", deskripsi(1)), sorotkan("Abstract:", "rm2-k"), tambah("tulis", deskripsi(2))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)),
      tambah("maju", ...kartu("rz", 60, 124, 180, 34, W.emas, ["maju dan mundur, 1 sampai 10"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
