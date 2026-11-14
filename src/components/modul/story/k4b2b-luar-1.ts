import type { AdeganStory } from "./logika-story";
import { KUNCI_EMPAT, LATIHAN_EMPAT, W, batang, emo, judul, kartu, panah, pecahan, teks } from "./k4b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah, warnai } from "./k4b2b-bantu";

export const NAMA_METODE = ["Same Denominator", "Compare Numerators", "Fraction Bars", "Fraction Card Sort"];
export const NAMA_METODE_ID = ["Penyebut Sama", "Banding Pembilang", "Batang Pecahan", "Susun Kartu Pecahan"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana membandingkan pecahan yang penyebutnya sama? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Same Denominator, Compare Numerators, Fraction Bars, dan Fraction Card Sort.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Penyebut Sama, Banding Pembilang, Batang Pecahan, dan Susun Kartu Pecahan.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: pecahan mana yang lebih besar? Dengan memeriksa potongan sama besar, membandingkan pembilang, menyejajarkan batang, dan menyusun kartu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membandingkan pecahan",
  sumber: "Metode luar: pembuka; BS hlm. 63–65",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("membandingkan", ...pecahan("po1", 90, 60, 1, 3, 24), teks("po2", 150, 70, "?", 26, W.merah), ...pecahan("po3", 210, 60, 2, 3, 24)),
      tambah("berbagai", emo("gl", 150, 140, "🌍", 34)),
      tambah("empat", ...kartu("pk4", 60, 164, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Same", "Compare", "Fraction", "Card"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Penyebut", "Banding", "Batang", "Susun"][i], ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("potongan", emo("i1", 45, 82, "✂", 32), teks("i1t", 45, 112, "potongan", 8.4, W.biru)),
      tambah("pembilang,", emo("i2", 112, 82, "🔢", 32), teks("i2t", 112, 112, "pembilang", 8.4, W.biru)),
      tambah("batang,", emo("i3", 188, 82, "📏", 32), teks("i3t", 188, 112, "batang", 8.4, W.biru)),
      tambah("kartu.", emo("i4", 258, 82, "🃏", 32), teks("i4t", 258, 112, "kartu", 8.4, W.biru)),
      tambah("besar?", ...kartu("iq", 40, 136, 220, 30, W.emas, ["pecahan mana yang lebih besar?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Same Denominator: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, Same Denominator, atau Penyebut Sama. Penyebut menyatakan ukuran satu potongan. Bila penyebutnya sama, semua potongan sama besar.";
const SUARA_S2 = "Karena potongannya sama besar, yang membedakan hanya banyak potongan. Itulah tugas pembilang: menghitung berapa potongan yang diambil.";
const SUARA_S3 = "Langkah pertama: periksa, apakah penyebutnya sama? Langkah kedua: bila sama, bandingkan banyak potongan yang diarsir. Bila tidak sama, metode ini belum dipakai di sini.";
const SUARA_S4 = "Penyebut sama membuat perbandingan adil, seperti membandingkan dua pizza yang dipotong sama besar.";

export const ADEGAN_LUAR_PENYEBUT: AdeganStory = {
  id: "luar-penyebut",
  judul: "Same Denominator: potongan sama besar",
  sumber: "Metode luar: Same Denominator",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Same Denominator")),
      tambah("pertama,", kepala(0)),
      tambah("menyatakan", ...batang("pd", 40, 76, 220, 34, 6, 0)),
      tambah(idx(SUARA_S1, "potongan", 1), teks("pd1", 150, 134, "ukuran satu potongan = 1/6", 9.4, W.biru)),
      sorotkan("ukuran", "pd-b0"),
      tambah(idx(SUARA_S1, "potongan", 2), teks("pd2", 150, 166, "6 potongan sama besar", 9.4, W.hijau)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Pembilang menghitung potongan")),
      tambah("membedakan", ...batang("pe1", 60, 44, 180, 26, 4, 1), teks("pe1t", 28, 61, "1/4", 8.6, W.biru), ...batang("pe2", 60, 90, 180, 26, 4, 3), teks("pe2t", 28, 107, "3/4", 8.6, W.biru)),
      tambah("pembilang:", teks("pe3", 150, 140, "yang beda: banyak potongan", 9.4, W.merah)),
      tambah("diambil.", ...kartu("pe4", 30, 154, 240, 30, W.emas, ["pembilang = potongan yang diambil"], 9)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Dua langkah")),
      tambah("pertama:", ...kartu("pf1", 14, 34, 272, 34, W.hijauMuda, ["1. periksa: penyebutnya sama?"], 9)),
      tambah("kedua:", ...kartu("pf2", 14, 76, 272, 34, W.langit, ["2. sama: bandingkan potongan arsir"], 9)),
      tambah("Bila@2", ...kartu("pf3", 14, 118, 272, 34, W.merahMuda, ["tidak sama: belum dipakai di sini"], 9)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Perbandingan yang adil")),
      tambah("dua", emo("pz1", 80, 94, "🍕", 40), emo("pz2", 220, 94, "🍕", 40)),
      tambah("dipotong", teks("pz3", 80, 130, "pizza A", 9, W.biru), teks("pz4", 220, 130, "pizza B", 9, W.biru)),
      tambah("sama@2", ...kartu("pz5", 40, 148, 220, 34, W.emas, ["potongan sama besar: adil"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Same Denominator: penerapan (Buku Siswa hlm. 63–64) ------------------------------ */
const SUARA_T1 = "Terapkan pada buku. Gambar pertama dibagi tiga, jadi potongannya sama besar. Satu per tiga mengarsir satu potongan, dua per tiga mengarsir dua potongan.";
const SUARA_T2 = "Dua potongan lebih banyak dari satu potongan, maka satu per tiga kurang dari dua per tiga.";
const SUARA_T3 = "Sekarang sepuluh potongan sama besar. Dua per sepuluh mengarsir dua potongan, satu per sepuluh mengarsir satu potongan.";
const SUARA_T4 = "Dua potongan lebih banyak dari satu potongan, maka dua per sepuluh lebih dari satu per sepuluh. Cocok dengan buku.";

export const ADEGAN_LUAR_PENYEBUT_TERAPAN: AdeganStory = {
  id: "luar-penyebut-terapan",
  judul: "Same Denominator pada tiga bagian dan sepuluh bagian",
  sumber: "Metode luar: Same Denominator; BS hlm. 63–64",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Penyebut Sama pada buku")),
      tambah("Gambar", ...batang("ta1", 40, 50, 150, 30, 3, 0), ...batang("ta2", 40, 108, 150, 30, 3, 0)),
      tambah("Satu", ...pecahan("ta1f", 240, 66, 1, 3, 16)),
      warnai("satu@2", W.emas, "ta1-b0"),
      tambah("dua", ...pecahan("ta2f", 240, 124, 2, 3, 16)),
      warnai("dua@2", W.emas, "ta2-b0", "ta2-b1"),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Banding potongan: tiga bagian")),
      tambah(0, ...batang("ta1", 40, 36, 150, 26, 3, 1), teks("tb1", 232, 54, "1 potongan", 8.6, W.biru)),
      tambah(0, ...batang("ta2", 40, 76, 150, 26, 3, 2), teks("tb2", 232, 94, "2 potongan", 8.6, W.biru)),
      tambah("maka", ...pecahan("tc1", 90, 144, 1, 3, 18)),
      tambah("kurang", teks("tc2", 150, 152, "<", 24, W.merah)),
      tambah("dua@2", ...pecahan("tc3", 210, 144, 2, 3, 18)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Sepuluh potongan sama besar")),
      tambah("sepuluh", ...batang("td1", 20, 48, 200, 28, 10, 0), ...batang("td2", 20, 104, 200, 28, 10, 0)),
      tambah("Dua", ...pecahan("td1f", 258, 60, 2, 10, 16)),
      warnai("dua@2", W.emas, "td1-b0", "td1-b1"),
      tambah("satu", ...pecahan("td2f", 258, 116, 1, 10, 16)),
      warnai("satu@2", W.emas, "td2-b0"),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Banding potongan: sepuluh bagian")),
      tambah(0, ...batang("td1", 20, 36, 200, 26, 10, 2), teks("te1", 258, 54, "2", 10, W.biru)),
      tambah(0, ...batang("td2", 20, 76, 200, 26, 10, 1), teks("te2", 258, 94, "1", 10, W.biru)),
      tambah("maka", ...pecahan("tf1", 90, 144, 2, 10, 18)),
      tambah("lebih@2", teks("tf2", 150, 152, ">", 24, W.merah)),
      tambah("satu@2", ...pecahan("tf3", 210, 144, 1, 10, 18)),
      tambah("Cocok", emo("tf4", 262, 156, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 4. Compare Numerators: konsep ------------------------------ */
const SUARA_N1 = "Metode kedua, Compare Numerators, atau Banding Pembilang. Aturannya ringkas: bila penyebut sama, pecahan dengan pembilang lebih besar adalah pecahan yang lebih besar.";
const SUARA_N2 = "Karena penyebutnya sudah sama, kita cukup membandingkan dua bilangan di atas garis, seperti membandingkan bilangan cacah biasa.";
const SUARA_N3 = "Pembilang lebih besar berarti pecahan lebih besar, pembilang lebih kecil berarti pecahan lebih kecil, dan pembilang sama berarti pecahan sama besar.";
const SUARA_N4 = "Hati-hati: aturan ini hanya berlaku bila penyebutnya sama. Penyebut tidak ikut dibandingkan, jadi periksa dulu penyebutnya.";

export const ADEGAN_LUAR_PEMBILANG: AdeganStory = {
  id: "luar-pembilang",
  judul: "Compare Numerators: bandingkan pembilangnya",
  sumber: "Metode luar: Compare Numerators",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Compare Numerators")),
      tambah("kedua,", kepala(1)),
      tambah("Aturannya", ...kartu("nr1", 20, 68, 260, 40, W.krem, ["penyebut sama", "→ banding pembilang"], 9.4)),
      tambah("pembilang@2", ...kartu("nr2", 14, 126, 112, 44, W.hijauMuda, ["pembilang", "lebih besar"], 9.4)),
      tambah(idx(SUARA_N1, "pecahan", 2), panah("nr4", 130, 148, 40, 0, W.merah, 2), ...kartu("nr3", 174, 126, 112, 44, W.hijauMuda, ["pecahan", "lebih besar"], 9.4)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Cukup lihat bilangan di atas garis")),
      tambah(0, ...pecahan("nc1", 90, 86, 2, 5, 26), teks("nc2", 150, 96, "?", 28, W.merah), ...pecahan("nc3", 210, 86, 3, 5, 26)),
      ubah("penyebutnya", { id: "nc1-d", op: 0.25 }, { id: "nc3-d", op: 0.25 }),
      sorotkan("membandingkan", "nc1-n", "nc3-n"),
      tambah("cacah", ...kartu("nc4", 40, 140, 220, 34, W.emas, ["seperti membandingkan 2 dan 3"], 9)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Tiga kemungkinan")),
      tambah("besar", ...kartu("nt1", 14, 34, 272, 34, W.hijauMuda, ["pembilang besar: pecahan besar (>)"], 9)),
      tambah(idx(SUARA_N3, "kecil", 1), ...kartu("nt2", 14, 76, 272, 34, W.merahMuda, ["pembilang kecil: pecahan kecil (<)"], 9)),
      tambah(idx(SUARA_N3, "sama", 1), ...kartu("nt3", 14, 118, 272, 34, W.langit, ["pembilang sama: pecahan sama (=)"], 9)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Hati-hati")),
      tambah("Hati-hati:", emo("nw1", 150, 62, "⚠", 32)),
      tambah("hanya", ...kartu("nw2", 20, 80, 260, 36, W.merahMuda, ["hanya berlaku bila penyebut sama"], 9)),
      tambah(idx(SUARA_N4, "Penyebut"), ...kartu("nw3", 20, 124, 260, 36, W.krem, ["penyebut tidak ikut dibandingkan"], 9)),
      tambah("periksa", ...kartu("nw4", 20, 168, 260, 26, W.emas, ["periksa penyebutnya dulu"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Compare Numerators: penerapan pada Ayo Berlatih 4 (Buku Siswa hlm. 65) ------------------------------ */
const SUARA_M1 = "Terapkan pada nomor empat. Pasangan a: pembilangnya satu dan tiga. Satu kurang dari tiga, jadi satu per lima kurang dari tiga per lima.";
const SUARA_M2 = "Pasangan b dan c. Dua kurang dari tiga, jadi dua per empat kurang dari tiga per empat. Tiga lebih dari dua, jadi tiga per delapan lebih dari dua per delapan.";
const SUARA_M3 = "Pasangan d dan e. Lima lebih dari dua, jadi lima per sepuluh lebih dari dua per sepuluh. Sebelas kurang dari dua belas, jadi sebelas per tiga belas kurang dari dua belas per tiga belas.";
const SUARA_M4 = "Lima pasang selesai hanya dengan membandingkan pembilang, dan hasilnya sama dengan kunci di buku: kurang, kurang, lebih, lebih, kurang.";

const HURUF = ["a", "b", "c", "d", "e"] as const;
const yBaris = (i: number): number => 74 + i * 26;
const baris = (i: number) => {
  const [p, q, d] = LATIHAN_EMPAT[i];
  return [teks(`m${i}-h`, 24, yBaris(i) + 4, `${HURUF[i]}.`, 9, W.biru), ...pecahan(`m${i}-f1`, 90, yBaris(i), p, d, 9), ...pecahan(`m${i}-f2`, 210, yBaris(i), q, d, 9)];
};
const tanda = (i: number) => teks(`m${i}-s`, 150, yBaris(i) + 6, KUNCI_EMPAT[i], 20, W.merah);
const alasan = (i: number) => {
  const [p, q] = LATIHAN_EMPAT[i];
  return teks(`m${i}-a`, 262, yBaris(i) + 4, `${p} ${KUNCI_EMPAT[i]} ${q}`, 8.4, W.coklat);
};

export const ADEGAN_LUAR_PEMBILANG_TERAPAN: AdeganStory = {
  id: "luar-pembilang-terapan",
  judul: "Compare Numerators pada lima pasang pecahan",
  sumber: "Metode luar: Compare Numerators; BS hlm. 65",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Banding pembilang: nomor 4")),
      tambah(0, kepala(1)),
      tambah("Pasangan", ...baris(0)),
      tambah(idx(SUARA_M1, "satu", 2), alasan(0)),
      tambah("jadi", tanda(0)),
    ),
    k(
      SUARA_M2,
      tambah("Pasangan", ...baris(1), ...baris(2)),
      tambah("Dua", alasan(1)),
      tambah("jadi", tanda(1)),
      tambah(idx(SUARA_M2, "Tiga", 3), alasan(2)),
      tambah("jadi@2", tanda(2)),
    ),
    k(
      SUARA_M3,
      tambah("Pasangan", ...baris(3), ...baris(4)),
      tambah("Lima", alasan(3)),
      tambah("jadi", tanda(3)),
      tambah("Sebelas", alasan(4)),
      tambah("jadi@2", tanda(4)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Hasil sama dengan kunci buku")),
      ...HURUF.map((h, i) => tambah(i < 2 ? idx(SUARA_M4, "kurang", i + 1) : i < 4 ? idx(SUARA_M4, "lebih", i - 1) : idx(SUARA_M4, "kurang", 3), ...kartu(`mz${i}`, 8 + i * 58, 70, 52, 44, W.langit, [`${h}.  ${KUNCI_EMPAT[i]}`], 12))),
      tambah("selesai", emo("mz9", 150, 150, "✅", 30)),
    ),
  ],
};
