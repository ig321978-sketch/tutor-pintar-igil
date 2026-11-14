import type { AdeganStory } from "./logika-story";
import { W, barisTabel, emo, garisLompat, judul, kartu, teks } from "./k4b1f-gambar";
import { bersih, idx, k, tambah } from "./k4b1f-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k4b1f-luar-1";

/** Nomor kata terakhir dalam kalimat suara. */
const akhir = (suara: string): number => suara.split(/\s+/).filter(Boolean).length - 1;

/** Bagian garis lompat berdasarkan id: titik `i` (tanda dan angka) dan lompatan `i` (panah dan label). */
const titik = (objs: ReturnType<typeof garisLompat>, i: number) => objs.filter((o) => o.id.endsWith(`-k${i}`) || o.id.endsWith(`-n${i}`));
const lompat = (objs: ReturnType<typeof garisLompat>, i: number) => objs.filter((o) => o.id.endsWith(`-a${i}`) || o.id.endsWith(`-j${i}`));

/* ------------------------------ 6. Counting Up: konsep ------------------------------ */
const SUARA_N1 = "Metode ketiga, Counting Up, atau Menghitung Naik. Alih-alih mengurangi, kita menghitung dari bilangan yang dikurangi, naik sampai bilangan awal. Jumlah semua lompatan adalah selisihnya.";
const SUARA_N2 = "Contoh: dua ratus empat puluh satu dikurangi seratus dua puluh sembilan. Mulai dari seratus dua puluh sembilan. Lompat satu ke seratus tiga puluh, lompat tujuh puluh ke dua ratus, lompat empat puluh satu ke dua ratus empat puluh satu.";
const SUARA_N3 = "Jumlahkan semua lompatan: satu ditambah tujuh puluh ditambah empat puluh satu sama dengan seratus dua belas. Jadi selisihnya seratus dua belas, sama dengan hasil cara susun panjang tadi.";
const SUARA_N4 = "Kuncinya, pilih titik singgah yang mudah, yaitu angka bulat puluhan atau ratusan. Semakin mudah titik singgahnya, semakin mudah menjumlahkan lompatannya.";

const GN = garisLompat("gn", 30, 110, 240, [129, 130, 200, 241]);

export const ADEGAN_LUAR_NAIK: AdeganStory = {
  id: "luar-naik",
  judul: "Counting Up: hitung naik dari pengurang",
  sumber: "Metode luar: Counting Up",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Counting Up")),
      tambah("ketiga,", kepala(2)),
      tambah("Alih-alih", ...kartu("na", 20, 58, 100, 30, W.merahMuda, ["bukan: kurangi"], 9.4)),
      tambah("menghitung", ...kartu("nb", 180, 58, 100, 30, W.hijauMuda, ["hitung naik"], 9.8)),
      tambah("lompatan", emo("nc", 150, 150, "🚶", 36)),
      tambah("selisihnya.", ...kartu("nd", 40, 168, 220, 26, W.emas, ["jumlah lompatan = selisih"], 10)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Contoh: 241 − 129")),
      tambah("Mulai", ...GN.filter((o) => o.id === "gn-g"), ...titik(GN, 0)),
      tambah("Lompat@1", ...titik(GN, 1), ...lompat(GN, 0)),
      tambah("Lompat@2", ...titik(GN, 2), ...lompat(GN, 1)),
      tambah("Lompat@3", ...titik(GN, 3), ...lompat(GN, 2)),
      tambah("Contoh:", ...kartu("ne", 70, 36, 160, 26, W.emas, ["241 − 129 = ?"], 11)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Jumlahkan lompatan")),
      tambah(0, ...GN),
      tambah("Jumlahkan", teks("nf", 150, 154, "1 + 70 + 41 = 112", 13, W.hijau)),
      tambah("Jadi", ...kartu("ng", 50, 166, 200, 28, W.hijauMuda, ["241 − 129 = 112"], 12)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Titik singgah yang mudah")),
      tambah("pilih", ...kartu("nh", 20, 34, 260, 34, W.krem, ["titik singgah: angka bulat", "puluhan atau ratusan"], 9.8)),
      tambah("Semakin@1", ...kartu("ni", 20, 82, 260, 28, W.langit, ["129 → 130 → 200 → 241"], 11)),
      tambah("Semakin@2", ...kartu("nj", 20, 124, 260, 28, W.hijauMuda, ["lompatan mudah dijumlahkan"], 10.4)),
      tambah(akhir(SUARA_N4), emo("nk", 150, 184, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 7. Counting Up: penerapan dengan angka buku ------------------------------ */
const SUARA_P1 = "Terapkan pada soal berikut. Tiga ratus dikurangi tiga puluh empat. Mulai dari tiga puluh empat: lompat enam ke empat puluh, lompat dua ratus enam puluh ke tiga ratus. Jumlahnya dua ratus enam puluh enam.";
const SUARA_P2 = "Enam ratus dikurangi dua ratus tiga puluh lima. Mulai dari dua ratus tiga puluh lima: lompat enam puluh lima ke tiga ratus, lompat tiga ratus ke enam ratus. Jumlahnya tiga ratus enam puluh lima.";
const SUARA_P3 = "Lima ratus lima dikurangi tujuh puluh tujuh. Mulai dari tujuh puluh tujuh: lompat tiga ke delapan puluh, lompat empat ratus dua puluh ke lima ratus, lompat lima ke lima ratus lima. Jumlahnya empat ratus dua puluh delapan.";
const SUARA_P4 = "Tujuh ratus dua belas dikurangi delapan puluh sembilan. Mulai dari delapan puluh sembilan: lompat sebelas ke seratus, lompat enam ratus ke tujuh ratus, lompat dua belas ke tujuh ratus dua belas. Jumlahnya enam ratus dua puluh tiga.";

const G1 = garisLompat("gp", 30, 100, 240, [34, 40, 300]);
const G2 = garisLompat("gp", 30, 100, 240, [235, 300, 600]);
const G3 = garisLompat("gp", 30, 100, 240, [77, 80, 500, 505]);
const G4 = garisLompat("gp", 30, 100, 240, [89, 100, 700, 712]);

export const ADEGAN_LUAR_NAIK_TERAPAN: AdeganStory = {
  id: "luar-naik-terapan",
  judul: "Counting Up pada soal latihan",
  sumber: "Metode luar: Counting Up",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Counting Up: 300 − 34")),
      tambah("Terapkan", ...G1.filter((o) => o.id === "gp-g"), ...titik(G1, 0)),
      tambah("lompat@1", ...titik(G1, 1), ...lompat(G1, 0)),
      tambah("lompat@2", ...titik(G1, 2), ...lompat(G1, 1)),
      tambah("Jumlahnya", ...kartu("pa", 50, 140, 200, 32, W.emas, ["6 + 260 = 266"], 13)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Counting Up: 600 − 235")),
      tambah("Enam", ...G2.filter((o) => o.id === "gp-g"), ...titik(G2, 0)),
      tambah("lompat@1", ...titik(G2, 1), ...lompat(G2, 0)),
      tambah("lompat@2", ...titik(G2, 2), ...lompat(G2, 1)),
      tambah("Jumlahnya", ...kartu("pb", 50, 140, 200, 32, W.emas, ["65 + 300 = 365"], 13)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Counting Up: 505 − 77")),
      tambah("Lima", ...G3.filter((o) => o.id === "gp-g"), ...titik(G3, 0)),
      tambah("lompat@1", ...titik(G3, 1), ...lompat(G3, 0)),
      tambah("lompat@2", ...titik(G3, 2), ...lompat(G3, 1)),
      tambah("lompat@3", ...titik(G3, 3), ...lompat(G3, 2)),
      tambah("Jumlahnya", ...kartu("pc", 40, 140, 220, 32, W.emas, ["3 + 420 + 5 = 428"], 13)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Counting Up: 712 − 89")),
      tambah("Tujuh", ...G4.filter((o) => o.id === "gp-g"), ...titik(G4, 0)),
      tambah("lompat@1", ...titik(G4, 1), ...lompat(G4, 0)),
      tambah("lompat@2", ...titik(G4, 2), ...lompat(G4, 1)),
      tambah("lompat@3", ...titik(G4, 3), ...lompat(G4, 2)),
      tambah("Jumlahnya", ...kartu("pd", 40, 140, 220, 32, W.emas, ["11 + 600 + 12 = 623"], 13)),
    ),
  ],
};

/* ------------------------------ 8. Compensation: konsep ------------------------------ */
const SUARA_K1 = "Metode keempat, Compensation, atau Kompensasi. Idenya: ubah pengurang menjadi bilangan bulat yang mudah, kurangkan, lalu sesuaikan hasilnya kembali.";
const SUARA_K2 = "Contoh: tujuh ratus dua belas dikurangi delapan puluh sembilan. Delapan puluh sembilan hampir sembilan puluh, hanya kurang satu. Jadi kita kurangi sembilan puluh dulu, bukan delapan puluh sembilan.";
const SUARA_K3 = "Tujuh ratus dua belas dikurangi sembilan puluh sama dengan enam ratus dua puluh dua. Tetapi kita mengurangi satu terlalu banyak, jadi tambahkan satu kembali: enam ratus dua puluh tiga.";
const SUARA_K4 = "Mengapa menambah? Karena pengurang yang dipakai, sembilan puluh, lebih besar satu daripada yang sebenarnya, delapan puluh sembilan. Pengurang naik satu, jadi hasil harus naik satu.";

const GK = garisLompat("gk", 80, 100, 140, [89, 90]);

export const ADEGAN_LUAR_KOMPENSASI: AdeganStory = {
  id: "luar-kompensasi",
  judul: "Compensation: bulatkan lalu sesuaikan",
  sumber: "Metode luar: Compensation",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Compensation")),
      tambah("keempat,", kepala(3)),
      tambah("ubah", ...kartu("ka", 14, 56, 272, 28, W.hijauMuda, ["1. bulatkan pengurang"], 10.4)),
      tambah("kurangkan,", ...kartu("kb", 14, 94, 272, 28, W.langit, ["2. kurangkan"], 10.4)),
      tambah("sesuaikan", ...kartu("kc", 14, 132, 272, 28, W.krem, ["3. sesuaikan hasilnya"], 10.4)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Bulatkan pengurang")),
      tambah("Contoh:", ...kartu("kd", 70, 32, 160, 26, W.emas, ["712 − 89 = ?"], 11.4)),
      tambah("hampir", ...kartu("ke", 20, 74, 260, 28, W.langit, ["89 hampir 90, kurang 1"], 10.4)),
      tambah("kurangi", ...kartu("kf", 20, 118, 260, 28, W.hijauMuda, ["kurangi 90 dulu: 712 − 90"], 10.4)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Kurangkan lalu sesuaikan")),
      tambah(0, teks("kg", 150, 50, "712 − 90 = 622", 14, W.biru)),
      tambah("terlalu", ...kartu("kh", 20, 66, 260, 28, W.merahMuda, ["dikurangi 1 terlalu banyak"], 10.4)),
      tambah("tambahkan", teks("ki", 150, 126, "622 + 1 = 623", 14, W.hijau)),
      tambah(akhir(SUARA_K3), ...kartu("kj", 50, 146, 200, 34, W.emas, ["712 − 89 = 623"], 13)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Mengapa ditambah?")),
      tambah("Mengapa", ...GK.filter((o) => o.id === "gk-g")),
      tambah("sembilan@1", ...titik(GK, 1)),
      tambah("sebenarnya,", ...titik(GK, 0), ...lompat(GK, 0)),
      tambah("Pengurang", ...kartu("kl", 20, 136, 260, 26, W.krem, ["pengurang naik 1: hasil naik 1"], 10.4)),
      tambah("hasil", emo("km", 150, 188, "⚖️", 20)),
    ),
  ],
};

/* ------------------------------ 9. Compensation: penerapan dengan angka buku ------------------------------ */
const SUARA_Q1 = "Soal pertama: lima ratus lima dikurangi tujuh puluh tujuh. Bulatkan tujuh puluh tujuh menjadi delapan puluh, lebih tiga. Lima ratus lima dikurangi delapan puluh sama dengan empat ratus dua puluh lima, tambah tiga jadi empat ratus dua puluh delapan.";
const SUARA_Q2 = "Soal kedua: sembilan ratus dua belas dikurangi enam puluh tujuh. Bulatkan menjadi tujuh puluh, lebih tiga. Sembilan ratus dua belas dikurangi tujuh puluh sama dengan delapan ratus empat puluh dua, tambah tiga jadi delapan ratus empat puluh lima.";
const SUARA_Q3 = "Tujuh ratus dua puluh dikurangi delapan puluh sembilan. Bulatkan menjadi sembilan puluh, lebih satu. Tujuh ratus dua puluh dikurangi sembilan puluh sama dengan enam ratus tiga puluh, tambah satu jadi enam ratus tiga puluh satu.";
const SUARA_Q4 = "Tiga ratus dikurangi tiga puluh empat. Bulatkan menjadi empat puluh, lebih enam. Tiga ratus dikurangi empat puluh sama dengan dua ratus enam puluh, tambah enam jadi dua ratus enam puluh enam.";

/** Rangkaian tiga langkah Compensation pada satu soal: [soal, pengurang bulat, selisih kelebihan]. */
export const KOMPENSASI_SOAL: readonly (readonly [number, number, number])[] = [
  [505, 77, 80],
  [912, 67, 70],
  [720, 89, 90],
  [300, 34, 40],
];

const langkahKomp = (i: number, pre: string, at: (string | number)[]) => {
  const [a, b, bulat] = KOMPENSASI_SOAL[i];
  const lebih = bulat - b;
  const sementara = a - bulat;
  return [
    tambah(at[0], ...kartu(`${pre}0`, 20, 32, 260, 26, W.langit, [`${a} − ${b} = ?`], 11.4)),
    tambah(at[1], ...kartu(`${pre}1`, 20, 68, 260, 26, W.krem, [`${b} dibulatkan jadi ${bulat}, lebih ${lebih}`], 10)),
    tambah(at[2], ...kartu(`${pre}2`, 20, 104, 260, 26, W.hijauMuda, [`${a} − ${bulat} = ${sementara}`], 11.4)),
    tambah(at[3], ...kartu(`${pre}3`, 20, 140, 260, 28, W.emas, [`${sementara} + ${lebih} = ${sementara + lebih}`], 12.4)),
  ];
};

export const ADEGAN_LUAR_KOMPENSASI_TERAPAN: AdeganStory = {
  id: "luar-kompensasi-terapan",
  judul: "Compensation pada soal latihan",
  sumber: "Metode luar: Compensation",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Compensation: 505 − 77")), ...langkahKomp(0, "qa", ["Soal", "Bulatkan", idx(SUARA_Q1, "sama", 1), "tambah"])),
    k(SUARA_Q2, bersih(0), tambah(0, judul("Compensation: 912 − 67")), ...langkahKomp(1, "qb", ["Soal", "Bulatkan", idx(SUARA_Q2, "sama", 1), "tambah"])),
    k(SUARA_Q3, bersih(0), tambah(0, judul("Compensation: 720 − 89")), ...langkahKomp(2, "qc", ["Tujuh", "Bulatkan", idx(SUARA_Q3, "sama", 1), "tambah"])),
    k(SUARA_Q4, bersih(0), tambah(0, judul("Compensation: 300 − 34")), ...langkahKomp(3, "qd", ["Tiga", "Bulatkan", idx(SUARA_Q4, "sama", 1), "tambah"])),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_Z1 = "Ringkasnya, empat metode: Standard Subtraction untuk menyusun dan mengurangi tiap kolom, Borrowing untuk meminjam saat angka atas kurang, Counting Up untuk melompat naik, dan Compensation untuk membulatkan lalu menyesuaikan.";
const SUARA_Z2 = "Angka yang kita pakai ada di tabel: contoh bersusun dan meminjam, lalu soal latihan satu sampai empat.";
const SUARA_Z3 = "Memilih metode: tanpa mengambil, pakai bersusun. Bila angka atas kurang, pinjam. Bila selisihnya dekat atau ada angka nol, hitung naik. Bila pengurang hampir bulat, pakai kompensasi. Selalu periksa dengan penjumlahan.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      ...["tiap kolom", "pinjam saat kurang", "lompat naik", "bulatkan, sesuaikan"].map((t, i) => tambah(["Standard", "Borrowing", "Counting", "Compensation"][i], ...kartu(`r${i}`, 12, 32 + i * 38, 276, 30, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${t}`], 8.8))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Angka yang kita pakai")),
      tambah("Angka", ...barisTabel("rt0", 8, 32, [92, 192], ["metode", "angka yang dipakai"], 24, 8.4, true)),
      tambah("bersusun", ...barisTabel("rt1", 8, 56, [92, 192], [NAMA_METODE[0], "633−211, 879−436, 573−268"], 24, 8)),
      tambah("meminjam", ...barisTabel("rt2", 8, 80, [92, 192], [NAMA_METODE[1], "253−176, 623−292, 344−279"], 24, 8)),
      tambah("soal@1", ...barisTabel("rt3", 8, 104, [92, 192], [NAMA_METODE[2], "300−34, 600−235, 505−77, 712−89"], 24, 7.6)),
      tambah("empat.", ...barisTabel("rt4", 8, 128, [92, 192], [NAMA_METODE[3], "505−77, 912−67, 720−89, 300−34"], 24, 7.6)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("tanpa", ...kartu("p1", 14, 30, 272, 26, W.hijauMuda, ["tanpa mengambil: bersusun"], 9.6)),
      tambah("kurang,", ...kartu("p2", 14, 62, 272, 26, W.langit, ["angka atas kurang: pinjam"], 9.6)),
      tambah("nol,", ...kartu("p3", 14, 94, 272, 26, W.krem, ["selisih dekat, ada nol: hitung naik"], 9.6)),
      tambah("hampir", ...kartu("p4", 14, 126, 272, 26, W.pink, ["pengurang hampir bulat: kompensasi"], 9.6)),
      tambah("periksa", emo("p5", 150, 197, "✅", 20), teks("p6", 150, 168, "periksa dengan penjumlahan", 9, W.coklat)),
    ),
  ],
};

