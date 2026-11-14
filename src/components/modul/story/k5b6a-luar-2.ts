import type { AdeganStory, Obj } from "./logika-story";
import { BANGUN_LATIHAN, W, baji, emo, garis, judul, kartu, panah, penandaSiku, poligon, sudutDalam, tabel, teks } from "./k5b6a-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b6a-bantu";
import { taruh } from "./k5b6a-luar-1";

/** Sudut runcing belah ketupat nomor 3 (titik sudut pertama), dipakai uji putaran: dihitung dari bangunnya sendiri. */
export const SUDUT_RUNCING = sudutDalam(BANGUN_LATIHAN[2], 0);

/* ------------------------------ 1. Angle Detective: konsep ------------------------------ */
export const ADEGAN_LUAR_DETEKTIF: AdeganStory = {
  id: "luar-detektif",
  judul: "Angle Detective: mencatat bukti seperti detektif",
  sumber: "Metode luar · Angle Detective",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Angle Detective. Kita bekerja seperti detektif: mengumpulkan bukti satu per satu, lalu menarik kesimpulan.",
      tambah(0, judul("Angle Detective")),
      tambah("detektif:", emo("dt", 80, 100, "🕵", 56)),
      tambah("mengumpulkan", ...kartu("bk", 140, 54, 140, 34, W.krem, ["bukti satu per satu"], 9.4)),
      tambah("kesimpulan.", panah("pn", 210, 92, 0, 26, W.hijau, 3, { gambar: true }), ...kartu("ks", 140, 122, 140, 34, W.hijauMuda, ["kesimpulan"], 9.4)),
    ),
    k(
      "Protokolnya empat tahap. Pertama, tentukan benda yang diperiksa. Kedua, tempelkan alat patokan di pojoknya. Ketiga, catat bukti, pas atau ada celah. Keempat, tulis kesimpulan, siku-siku atau bukan.",
      bersih(0),
      tambah(0, judul("Empat tahap")),
      tambah("Pertama,", ...kartu("t1", 14, 34, 272, 32, W.krem, ["1. Tentukan benda yang diperiksa"], 8.8)),
      tambah("Kedua,", ...kartu("t2", 14, 74, 272, 32, W.langit, ["2. Tempelkan alat patokan di pojoknya"], 8.8)),
      tambah("Ketiga,", ...kartu("t3", 14, 114, 272, 32, W.pink, ["3. Catat bukti: pas atau ada celah"], 8.8)),
      tambah("Keempat,", ...kartu("t4", 14, 154, 272, 32, W.hijauMuda, ["4. Tulis kesimpulan: siku-siku atau bukan"], 8.8)),
    ),
    k(
      "Bukti dicatat dalam tabel, seperti Tabel enam titik dua di buku: nomor, nama benda, lalu kolom ya atau tidak. Catatan yang rapi membuat kesimpulan bisa diperiksa orang lain.",
      bersih(0),
      tambah(0, judul("Catatan bukti")),
      tambah("tabel", ...tabel("ct", 14, 44, [34, 110, 76, 58], [["No.", "Benda", "Bukti", "Ya/Tidak"], ["1", "", "", ""], ["2", "", "", ""], ["…", "", "", ""]], 28, 8.8)),
      tambah("rapi", teks("rp", 150, 178, "catatan rapi, bisa diperiksa orang lain", 9, W.ungu)),
    ),
    k(
      "Kelebihannya, hasil temuan tercatat dan bisa dibagikan ke kelompok lain. Detektif yang baik juga memeriksa dua kali, supaya yakin.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kebiasaan baik")),
      tambah("Kelebihannya,", ...kartu("k1", 20, 44, 260, 40, W.hijauMuda, ["Kelebihan:", "temuan tercatat dan bisa dibagikan"], 9)),
      tambah("dua", ...kartu("k2", 20, 100, 260, 40, W.krem, ["Kebiasaan baik:", "periksa dua kali supaya yakin"], 9)),
      tambah("yakin.", emo("lp", 150, 178, "🔍", 26)),
    ),
  ],
};

/* ------------------------------ 2. Angle Detective: contoh dari buku ------------------------------ */
const KOLOM_DETEKTIF = [26, 110, 70, 74];
const BARIS_DETEKTIF: [string, string, string][] = [
  ["Persegi panjang", "4", "Ya"],
  ["Segi enam", "2", "Ya"],
  ["Belah ketupat", "0", "Tidak"],
  ["Segitiga", "0", "Tidak"],
  ["Persegi miring", "4", "Ya"],
  ["Segi empat", "2", "Ya"],
];
const barisCatatan = (r: number): Obj[] => tabel(`d${r}`, 10, 34 + r * 19, KOLOM_DETEKTIF, [[String(r), BARIS_DETEKTIF[r - 1][0], BARIS_DETEKTIF[r - 1][1], BARIS_DETEKTIF[r - 1][2]]], 19, 8, W.putih);

export const ADEGAN_LUAR_DETEKTIF_TERAPAN: AdeganStory = {
  id: "luar-detektif-terapan",
  judul: "Angle Detective: catatan enam bangun dari buku",
  sumber: "Metode luar · Angle Detective, contoh Ayo Berlatih nomor 1 sampai 6",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Sekarang catatan detektif untuk enam bangun. Nomor satu, persegi panjang: empat pojok pas, jadi ya. Nomor dua, segi enam: dua pojok pas, jadi ya.",
      tambah(0, judul("Catatan Detektif Sudut")),
      tambah(0, ...tabel("d0", 10, 34, KOLOM_DETEKTIF, [["No.", "Bangun", "Pojok pas", "Siku-siku?"]], 19, 8, W.krem)),
      tambah("Nomor", barisCatatan(1)),
      tambah("Nomor@2", barisCatatan(2)),
    ),
    k(
      "Nomor tiga, belah ketupat, dan nomor empat, segitiga. Keduanya tidak punya pojok yang pas dengan patokan, jadi nol dan kesimpulannya tidak.",
      tambah("Nomor", barisCatatan(3)),
      tambah("nomor@2", barisCatatan(4)),
    ),
    k(
      "Nomor lima, persegi yang miring, punya empat pojok pas. Nomor enam, segi empat, hanya dua pojok bawah yang pas. Keduanya ya.",
      tambah("Nomor", barisCatatan(5)),
      tambah("Nomor@2", barisCatatan(6)),
    ),
    k(
      "Jumlahnya, empat tambah dua tambah nol tambah nol tambah empat tambah dua, sama dengan dua belas sudut siku-siku di enam bangun.",
      tambah("Jumlahnya,", ...tabel("d7", 10, 34 + 7 * 19, KOLOM_DETEKTIF, [["", "4 + 2 + 0 + 0 + 4 + 2", "12", ""]], 19, 8, W.hijauMuda)),
      sorotkan("dua@3", "d7-s01", "d7-t01", "d7-s02", "d7-t02"),
    ),
  ],
};

/* ------------------------------ 3. Quarter-Turn Test: konsep ------------------------------ */
const WARNA_PUTAR = [W.hijauMuda, W.langit, W.krem, W.pink];
const empatBaji = (awal: string, x: number, y: number, r: number, op = 1): Obj[] => [0, 1, 2, 3].map((i) => baji(`${awal}${i}`, x, y, r, -90 + i * 90, i * 90, WARNA_PUTAR[i], W.biru, { op }));

export const ADEGAN_LUAR_PUTARAN: AdeganStory = {
  id: "luar-putaran",
  judul: "Quarter-Turn Test: seperempat putaran",
  sumber: "Metode luar · Quarter-Turn Test",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Metode keempat, Quarter-Turn Test, atau uji seperempat putaran. Idenya, satu sudut siku-siku sama dengan seperempat putaran penuh.",
      tambah(0, judul("Quarter-Turn Test")),
      tambah("Idenya,", baji("q0", 150, 106, 56, -90, 0, W.hijauMuda), garis("ha", 150, 106, 56, 0, W.biru, 2.4), garis("hb", 150, 106, 0, -56, W.biru, 2.4)),
      tambah("seperempat@2", teks("sp", 242, 70, "seperempat", 9.6, W.hijau), teks("sp2", 242, 82, "putaran", 9.6, W.hijau)),
      tambah("penuh.", teks("pn", 150, 184, "= satu sudut siku-siku", 10, W.biru)),
    ),
    k(
      "Bayangkan satu garis berputar penuh mengelilingi sebuah titik. Putaran penuh itu dibagi menjadi empat bagian sama besar. Setiap bagian adalah satu sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Satu putaran penuh")),
      tambah("Bayangkan", bulat0(150, 106, 56)),
      tambah("empat", ...empatBaji("q", 150, 106, 56)),
      tambah("Setiap", teks("e1", 176, 80, "1", 10), teks("e2", 176, 140, "2", 10), teks("e3", 124, 140, "3", 10), teks("e4", 124, 80, "4", 10)),
      tambah("siku-siku.", teks("kt", 150, 186, "4 bagian = 1 putaran penuh", 9.6, W.biru)),
    ),
    k(
      "Cara ujinya, tempelkan empat salinan pojok yang sama mengelilingi satu titik. Kalau keempatnya menutup penuh, tanpa celah dan tanpa tumpang tindih, pojok itu siku-siku.",
      bersih(0),
      tambah(0, judul("Cara uji")),
      tambah("tempelkan", ...empatBaji("w", 150, 100, 50)),
      tambah("menutup", teks("ps", 150, 172, "menutup pas satu putaran", 9.6, W.hijau)),
      tambah("siku-siku.", teks("ok", 150, 188, "pojok itu siku-siku", 9.6, W.hijau)),
    ),
    k(
      "Kalau pojoknya bukan siku-siku, empat salinan tidak akan menutup pas. Ada yang menyisakan celah, ada yang saling menumpuk.",
      bersih(0),
      tambah(0, judul("Kalau bukan siku-siku")),
      tambah("Kalau", ...[0, 1, 2, 3].map((i) => baji(`g${i}`, 76, 100, 46, i * SUDUT_RUNCING, (i + 1) * SUDUT_RUNCING, WARNA_PUTAR[i]))),
      tambah("celah,", teks("cl", 76, 170, "celah", 10, W.merah)),
      tambah("menumpuk.", ...[0, 1, 2, 3].map((i) => baji(`h${i}`, 226, 100, 46, i * (180 - SUDUT_RUNCING), (i + 1) * (180 - SUDUT_RUNCING), WARNA_PUTAR[i], W.biru, { op: 0.6 })), teks("tt", 226, 170, "saling menumpuk", 10, W.merah)),
    ),
  ],
};

function bulat0(x: number, y: number, r: number): Obj {
  return { id: "kel", t: "bulat", x, y, r, warna: "none", garis: W.biru, tebal: 1.4, putus: true };
}

/* ------------------------------ 4. Quarter-Turn Test: contoh dari buku ------------------------------ */
const R1 = taruh(0, 1.2, 66, 100);
const R3 = taruh(2, 1.1, 66, 100);
const R5 = taruh(4, 1.0, 66, 100);

export const ADEGAN_LUAR_PUTARAN_TERAPAN: AdeganStory = {
  id: "luar-putaran-terapan",
  judul: "Quarter-Turn Test: contoh dari buku",
  sumber: "Metode luar · Quarter-Turn Test, contoh Ayo Berlatih nomor 1, 3, 5",
  latar: "#E0F2FE",
  ketukan: [
    k(
      "Terapkan pada nomor satu, persegi panjang. Keempat pojoknya kita salin dan tempel mengelilingi satu titik. Hasilnya menutup satu putaran penuh, pas tanpa celah.",
      tambah(0, judul("Nomor 1")),
      tambah(0, poligon("bg1", 0, 0, R1, W.langit)),
      tambah("Keempat", ...[0, 1, 2, 3].map((i) => penandaSiku(`pk${i}`, R1, i, 9))),
      tambah("salin", ...empatBaji("wb", 214, 100, 48)),
      tambah("celah.", teks("pt", 214, 176, "4 pojok = 1 putaran", 9.6, W.hijau)),
    ),
    k(
      "Sekarang nomor tiga, belah ketupat. Satu pojok runcingnya kita salin empat kali. Keempat salinan hanya mengisi sebagian putaran, masih ada celah. Jadi bukan siku-siku.",
      bersih(0),
      tambah(0, judul("Nomor 3")),
      tambah(0, poligon("bg3", 0, 0, R3, W.krem)),
      tambah("salin", ...[0, 1, 2, 3].map((i) => baji(`wg${i}`, 214, 100, 48, i * SUDUT_RUNCING, (i + 1) * SUDUT_RUNCING, WARNA_PUTAR[i]))),
      tambah("celah.", teks("cl", 214, 176, "ada celah: bukan siku-siku", 9.4, W.merah)),
    ),
    k(
      "Cara ini juga menjelaskan mengapa persegi yang miring tetap siku-siku. Memiringkan bangun tidak mengubah ukuran pojoknya, jadi empat pojoknya tetap menutup satu putaran.",
      bersih(0),
      tambah(0, judul("Nomor 5")),
      tambah(0, poligon("bg5", 0, 0, R5, W.jingga)),
      tambah("miring", ...[0, 1, 2, 3].map((i) => penandaSiku(`pk${i}`, R5, i, 9))),
      tambah("menutup", ...empatBaji("wb", 214, 100, 48)),
      tambah("putaran.", teks("pt", 214, 176, "miring tidak mengubah pojok", 9.2, W.hijau)),
    ),
    k(
      "Ringkasnya, nomor satu dan nomor lima lolos uji putaran, nomor tiga tidak. Hasilnya cocok dengan kunci: empat, empat, dan nol.",
      bersih(0),
      tambah(0, judul("Hasil uji putaran")),
      tambah("satu", ...kartu("h1", 30, 44, 240, 34, W.hijauMuda, ["Nomor 1: lolos, 4 sudut siku-siku"], 9.4)),
      tambah("lima", ...kartu("h5", 30, 90, 240, 34, W.hijauMuda, ["Nomor 5: lolos, 4 sudut siku-siku"], 9.4)),
      tambah("tiga", ...kartu("h3", 30, 136, 240, 34, W.merahMuda, ["Nomor 3: tidak, 0 sudut siku-siku"], 9.4)),
      sorotkan("kunci:", "h1-k", "h5-k", "h3-k"),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan empat metode ------------------------------ */
const KOLOM_RINGKAS = [150, 130];
const barisRingkas = (r: number, a: string, b: string): Obj[] => tabel(`rk${r}`, 10, 34 + r * 24, KOLOM_RINGKAS, [[a, b]], 24, 8.4, W.putih);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan empat metode. Right Angle Benchmark memakai penggaris siku-siku sebagai patokan. Paper Fold Benchmark membuat patokan dari kertas yang dilipat.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah(0, ...tabel("rk0", 10, 34, KOLOM_RINGKAS, [["Metode", "Alatnya"]], 24, 8.4, W.krem)),
      tambah("Right", barisRingkas(1, "Right Angle Benchmark", "penggaris siku-siku")),
      tambah("Paper", barisRingkas(2, "Paper Fold Benchmark", "kertas yang dilipat")),
    ),
    k(
      "Angle Detective mencatat bukti di tabel, nomor demi nomor. Quarter-Turn Test menguji dengan empat salinan yang harus menutup satu putaran.",
      tambah("Angle", barisRingkas(3, "Angle Detective", "tabel bukti")),
      tambah("Quarter-Turn", barisRingkas(4, "Quarter-Turn Test", "empat salinan pojok")),
    ),
    k(
      "Kapan memakai yang mana? Ada penggaris siku-siku, pakai patokan. Tidak ada, lipat kertas. Banyak benda, catat seperti detektif. Ingin tahu alasannya, pakai seperempat putaran.",
      tambah("penggaris", teks("p1", 150, 164, "ada penggaris: patokan", 9, W.hijau)),
      tambah("lipat", teks("p2", 150, 177, "tidak ada: lipat kertas", 9, W.biru)),
      tambah("catat", teks("p3", 150, 190, "banyak benda: catat bukti", 9, W.ungu)),
    ),
    k(
      "Keempatnya memberi jawaban yang sama untuk Ayo Berlatih: empat, dua, nol, nol, empat, dan dua. Metode boleh berbeda, hasilnya harus sama.",
      bersih(0),
      tambah(0, judul("Hasil yang sama")),
      tambah("Keempatnya", ...tabel("kn", 13, 56, [64, 36, 36, 36, 36, 36, 36], [["No.", "1", "2", "3", "4", "5", "6"], ["Siku-siku", "4", "2", "0", "0", "4", "2"]], 30, 10)),
      tambah("Metode", ...kartu("hs", 40, 140, 220, 34, W.hijauMuda, ["metode berbeda, hasil sama"], 10)),
    ),
  ],
};
