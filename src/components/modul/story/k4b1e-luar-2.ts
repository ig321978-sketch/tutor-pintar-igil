import type { AdeganStory, Obj } from "./logika-story";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k4b1e-luar-1";
import { W, barisTabel, bulat, emo, garis, garisLompat, jalur, judul, kartu, panah, teks } from "./k4b1e-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b1e-bantu";

const lastIdx = (s: string): number => s.split(/\s+/).filter(Boolean).length - 1;
/** Ambil benda berdasarkan id dari hasil gambar. */
const ambil = (objs: Obj[], ...ids: string[]): Obj[] => objs.filter((o) => ids.includes(o.id));

/* ------------------------------ 6. Counting On: konsep ------------------------------ */
const SUARA_C1 = "Metode ketiga, Counting On, atau Menghitung Maju. Mulai dari bilangan yang lebih besar, lalu maju sebanyak bilangan yang lebih kecil, puluhan lebih dulu, baru satuan.";
const SUARA_C2 = "Langkahnya: pilih bilangan terbesar sebagai awal, pecah bilangan lain menjadi puluhan dan satuan, lalu lompat puluhan dahulu, kemudian satuan.";
const SUARA_C3 = "Metode ini cocok untuk menjumlahkan di dalam kepala, terutama bila salah satu bilangan kecil. Untuk tiga bilangan, maju satu bilangan demi satu bilangan.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: mulai dari yang besar, lalu maju",
  sumber: "Metode luar: Counting On",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Counting On")),
      tambah("Metode", kepala(2)),
      tambah("Mulai", garis("cg", 30, 118, 240, 0, W.hitam, 1.6), bulat("c0", 60, 118, 5, W.merah), teks("c0t", 60, 138, "mulai: bilangan besar", 8, W.merah)),
      tambah("maju", jalur("cj0", 60, 114, "M0 0 Q45 -30 90 0", "none", W.hijau, { tebal: 1.8, gambar: true }), bulat("c1", 150, 118, 5, W.biru), teks("cj0t", 105, 84, "puluhan", 8.6, W.hijau)),
      tambah("satuan.", jalur("cj1", 150, 114, "M0 0 Q35 -24 70 0", "none", W.hijau, { tebal: 1.8, gambar: true }), bulat("c2", 220, 118, 5, W.biru), teks("cj1t", 185, 90, "satuan", 8.6, W.hijau)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Langkah Counting On")),
      tambah(0, kepala(2)),
      tambah("pilih", ...kartu("cs1", 14, 62, 272, 28, W.hijauMuda, ["1. pilih bilangan terbesar sebagai awal"], 9)),
      tambah("pecah", ...kartu("cs2", 14, 98, 272, 28, W.langit, ["2. pecah yang lain: puluhan dan satuan"], 9)),
      tambah("lompat", ...kartu("cs3", 14, 134, 272, 28, W.pink, ["3. lompat puluhan dahulu, lalu satuan"], 9)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Kapan cocok?")),
      tambah("cocok", ...kartu("cc1", 14, 40, 272, 44, W.hijauMuda, ["cocok untuk hitung di kepala,", "terutama bila satu bilangan kecil"], 9)),
      tambah("tiga", ...kartu("cc2", 14, 100, 272, 44, W.krem, ["tiga bilangan: maju satu bilangan", "demi satu bilangan"], 9)),
      tambah("kepala,", emo("cc3", 150, 180, "🧠", 20)),
    ),
  ],
};

/* ------------------------------ 7. Counting On: penerapan dengan angka buku ------------------------------ */
const SUARA_V1 = "Nomor tiga bagian b: empat ratus dua puluh sembilan ditambah sembilan belas. Mulai dari empat ratus dua puluh sembilan, maju sepuluh jadi empat ratus tiga puluh sembilan.";
const SUARA_V2 = "Lalu maju sembilan lagi, sampai empat ratus empat puluh delapan. Jadi empat ratus dua puluh sembilan ditambah sembilan belas sama dengan empat ratus empat puluh delapan, sama dengan kunci buku.";
const SUARA_V3 = "Nomor empat bagian c: tiga puluh sembilan ditambah delapan ratus dua puluh satu. Mulai dari yang lebih besar, delapan ratus dua puluh satu. Maju tiga puluh jadi delapan ratus lima puluh satu, lalu maju sembilan jadi delapan ratus enam puluh.";
const SUARA_V4 = "Nomor tiga bagian c: delapan ratus dua puluh satu ditambah sembilan puluh delapan. Maju sembilan puluh jadi sembilan ratus sebelas, lalu maju delapan jadi sembilan ratus sembilan belas, sama dengan kunci buku.";

const GL1 = garisLompat("m1", 40, 118, [{ v: 429, lompat: "+10" }, { v: 439, lompat: "+9" }, { v: 448 }], 11);
const GL3 = garisLompat("m3", 30, 118, [{ v: 821, lompat: "+30" }, { v: 851, lompat: "+9" }, { v: 860 }], 6);
const GL4 = garisLompat("m4", 30, 118, [{ v: 821, lompat: "+90" }, { v: 911, lompat: "+8" }, { v: 919 }], 2.4);

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Counting On pada angka buku",
  sumber: "Metode luar: Counting On; BS hlm. 33",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Menghitung Maju: nomor 3b")),
      tambah("Nomor", kepala(2), teks("m1l", 150, 68, "429 + 19", 9.6, W.hitam)),
      tambah("Mulai", ...ambil(GL1, "m1-g", "m1-k0", "m1-v0")),
      tambah("maju", ...ambil(GL1, "m1-j0", "m1-l0", "m1-k1", "m1-v1")),
    ),
    k(
      SUARA_V2,
      tambah("Lalu", ...ambil(GL1, "m1-j1", "m1-l1", "m1-k2", "m1-v2")),
      tambah("Jadi", ...kartu("m1h", 40, 156, 220, 28, W.emas, ["429 + 19 = 448"], 10.4)),
      sorotkan("sama", "m1-v2"),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Menghitung Maju: nomor 4c")),
      tambah(0, kepala(2)),
      tambah("yang", ...ambil(GL3, "m3-g", "m3-k0", "m3-v0")),
      tambah(idx(SUARA_V3, "Maju"), ...ambil(GL3, "m3-j0", "m3-l0", "m3-k1", "m3-v1")),
      tambah(idx(SUARA_V3, "maju", 2), ...ambil(GL3, "m3-j1", "m3-l1", "m3-k2", "m3-v2")),
      tambah(lastIdx(SUARA_V3), ...kartu("m3h", 40, 156, 220, 28, W.emas, ["39 + 821 = 860"], 10.4)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Menghitung Maju: nomor 3c")),
      tambah(0, kepala(2)),
      tambah("delapan", ...ambil(GL4, "m4-g", "m4-k0", "m4-v0")),
      tambah(idx(SUARA_V4, "Maju"), ...ambil(GL4, "m4-j0", "m4-l0", "m4-k1", "m4-v1")),
      tambah(idx(SUARA_V4, "maju", 2), ...ambil(GL4, "m4-j1", "m4-l1", "m4-k2", "m4-v2")),
      tambah(lastIdx(SUARA_V4), ...kartu("m4h", 40, 156, 220, 28, W.emas, ["821 + 98 = 919"], 10.4)),
    ),
  ],
};

/* ------------------------------ 8. Partial Sums: konsep ------------------------------ */
const SUARA_P1 = "Metode keempat, Partial Sums, atau Jumlah Sebagian. Jumlahkan tiap nilai tempat secara terpisah, tulis tiap hasilnya sebagai jumlah sebagian, lalu jumlahkan semua jumlah sebagian itu.";
const SUARA_P2 = "Bedanya dengan susun pendek: tidak ada angka yang disimpan, jadi boleh mulai dari ratusan. Hasil tiap kolom ditulis utuh, bahkan bila sepuluh atau lebih.";
const SUARA_P3 = "Dibandingkan susun panjang di buku, Jumlah Sebagian tidak menguraikan tiap bilangan dulu. Keunggulannya: tidak perlu mengingat simpanan, dan setiap baris mudah diperiksa.";

export const ADEGAN_LUAR_SEBAGIAN: AdeganStory = {
  id: "luar-sebagian",
  judul: "Partial Sums: jumlah tiap nilai tempat terpisah",
  sumber: "Metode luar: Partial Sums",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Partial Sums")),
      tambah("Metode", kepala(3)),
      tambah("Jumlahkan", ...kartu("pa1", 10, 60, 138, 26, W.merahMuda, ["ratusan + ratusan"], 8.8), ...kartu("pa2", 10, 92, 138, 26, W.hijauMuda, ["puluhan + puluhan"], 8.8), ...kartu("pa3", 10, 124, 138, 26, W.langit, ["satuan + satuan"], 8.8)),
      tambah("sebagai", panah("pp1", 150, 73, 18, 0, W.hitam, 1.6), panah("pp2", 150, 105, 18, 0, W.hitam, 1.6), panah("pp3", 150, 137, 18, 0, W.hitam, 1.6), ...kartu("pb1", 172, 60, 118, 26, W.krem, ["jumlah sebagian 1"], 8.4), ...kartu("pb2", 172, 92, 118, 26, W.krem, ["jumlah sebagian 2"], 8.4), ...kartu("pb3", 172, 124, 118, 26, W.krem, ["jumlah sebagian 3"], 8.4)),
      tambah("lalu", ...kartu("pt", 40, 162, 220, 28, W.emas, ["jumlahkan semua sebagian"], 9.6)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Beda dengan susun pendek")),
      tambah(0, kepala(3)),
      tambah("tidak", ...kartu("pd1", 14, 62, 272, 32, W.hijauMuda, ["tanpa simpan: boleh mulai dari ratusan"], 9)),
      tambah("Hasil", ...kartu("pd2", 14, 104, 272, 32, W.langit, ["hasil kolom ditulis utuh,", "boleh 10 atau lebih"], 8.6)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Dibanding susun panjang")),
      tambah(0, kepala(3)),
      tambah("Dibandingkan", ...kartu("pe1", 14, 62, 272, 36, W.krem, ["susun panjang: uraikan tiap bilangan dulu", "Jumlah Sebagian: langsung jumlah kolom"], 8.6)),
      tambah("Keunggulannya:", ...kartu("pe2", 14, 110, 272, 36, W.hijauMuda, ["tanpa mengingat simpanan,", "setiap baris mudah diperiksa"], 8.8)),
    ),
  ],
};

/* ------------------------------ 9. Partial Sums: penerapan dengan angka buku ------------------------------ */
const SUARA_Q1 = "Nomor tiga, bagian a: tiga ratus tiga puluh tiga ditambah lima ratus sembilan belas. Ratusan: tiga ratus ditambah lima ratus jadi delapan ratus. Puluhan: tiga puluh ditambah sepuluh jadi empat puluh. Satuan: tiga ditambah sembilan jadi dua belas.";
const SUARA_Q2 = "Jumlahkan semua jumlah sebagian: delapan ratus ditambah empat puluh ditambah dua belas sama dengan delapan ratus lima puluh dua. Cocok dengan kunci buku.";
const SUARA_Q3 = "Satu lagi dari nomor satu bagian c di latihan buku: lima ratus tujuh puluh enam ditambah seratus empat puluh delapan. Ratusan jadi enam ratus, puluhan jadi seratus sepuluh, satuan jadi empat belas.";
const SUARA_Q4 = "Jumlahnya: enam ratus ditambah seratus sepuluh ditambah empat belas sama dengan tujuh ratus dua puluh empat, sama dengan kunci buku.";

const tabelSebagian = (p: string, baris: string[]): Obj[][] => baris.map((isi, i) => barisTabel(`${p}${i}`, 14, 90 + i * 20, [64, 212], isi.split("|"), 20, 8.8));
const QA = tabelSebagian("qa", ["ratusan|300 + 500 = 800", "puluhan|30 + 10 = 40", "satuan|3 + 9 = 12", "jumlah|800 + 40 + 12 = 852"]);
const QC = tabelSebagian("qc", ["ratusan|500 + 100 = 600", "puluhan|70 + 40 = 110", "satuan|6 + 8 = 14", "jumlah|600 + 110 + 14 = 724"]);

export const ADEGAN_LUAR_SEBAGIAN_TERAPAN: AdeganStory = {
  id: "luar-sebagian-terapan",
  judul: "Partial Sums pada angka buku",
  sumber: "Metode luar: Partial Sums; BS hlm. 32–33",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Jumlah Sebagian: nomor 3a")),
      tambah(0, kepala(3)),
      tambah("Nomor", teks("qal", 150, 66, "333 + 519", 10, W.hitam), ...barisTabel("qh", 14, 70, [64, 212], ["tempat", "jumlah sebagian"], 20, 8.8, true)),
      tambah("Ratusan:", ...QA[0]),
      tambah("Puluhan:", ...QA[1]),
      tambah("Satuan:", ...QA[2]),
    ),
    k(
      SUARA_Q2,
      tambah("delapan", ...QA[3]),
      sorotkan("delapan", "qa3-t1"),
      tambah(lastIdx(SUARA_Q2), emo("qav", 268, 168, "✅", 16)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Jumlah Sebagian: nomor 1c")),
      tambah(0, kepala(3)),
      tambah("Satu", teks("qcl", 150, 66, "576 + 148", 10, W.hitam), ...barisTabel("qh", 14, 70, [64, 212], ["tempat", "jumlah sebagian"], 20, 8.8, true)),
      tambah("Ratusan", ...QC[0]),
      tambah("puluhan", ...QC[1]),
      tambah("satuan", ...QC[2]),
    ),
    k(
      SUARA_Q4,
      tambah("Jumlahnya:", ...QC[3]),
      sorotkan("Jumlahnya:", "qc3-t1"),
      tambah(lastIdx(SUARA_Q4), emo("qcv", 268, 168, "✅", 16)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
const SUARA_Z1 = "Ringkasan empat metode: Standard Addition menjumlahkan kolom demi kolom, Regrouping menukar sepuluh menjadi satu di kolom kiri, Counting On melompat di garis bilangan, Partial Sums menjumlahkan tiap nilai tempat terpisah.";
const SUARA_Z2 = "Angka dari buku yang dipakai tiap metode: tiga perpustakaan dan satu soal dengan simpan, dua keranjang jeruk, latihan nomor tiga dan empat, serta nomor satu dan tiga.";
const SUARA_Z3 = "Memilih metode: untuk kolom rapi pakai Standard Addition, untuk memahami tukar pakai Regrouping, untuk hitung di kepala pakai Counting On, dan untuk menguraikan pakai Partial Sums. Hasil semuanya sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      ...["kolom demi kolom", "tukar 10 jadi 1", "lompat di garis", "jumlah per tempat"].map((t, i) => tambah(["Standard", "Regrouping", "Counting", "Partial"][i], ...kartu(`r${i}`, 12, 32 + i * 38, 276, 30, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${t}`], 8.8))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Angka buku yang dipakai")),
      tambah("Angka", ...barisTabel("rt0", 14, 32, [92, 188], ["metode", "angka buku"], 24, 8.4, true)),
      tambah("tiga", ...barisTabel("rt1", 14, 56, [92, 188], ["Standard Addition", "124 + 411 + 363; 277 + 146"], 24, 8.2)),
      tambah("dua", ...barisTabel("rt2", 14, 80, [92, 188], ["Regrouping", "189 + 245"], 24, 8.2)),
      tambah("latihan", ...barisTabel("rt3", 14, 104, [92, 188], ["Counting On", "429 + 19; 39 + 821; 821 + 98"], 24, 8.2)),
      tambah("serta", ...barisTabel("rt4", 14, 128, [92, 188], ["Partial Sums", "333 + 519; 576 + 148"], 24, 8.2)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("kolom", ...kartu("p1", 14, 32, 272, 28, W.hijauMuda, ["kolom rapi: Standard Addition"], 9)),
      tambah("memahami", ...kartu("p2", 14, 66, 272, 28, W.langit, ["paham tukar: Regrouping"], 9)),
      tambah("hitung", ...kartu("p3", 14, 100, 272, 28, W.krem, ["hitung di kepala: Counting On"], 9)),
      tambah("menguraikan", ...kartu("p4", 14, 134, 272, 28, W.pink, ["menguraikan: Partial Sums"], 9)),
      tambah("Hasil", emo("p5", 150, 188, "✅", 22)),
    ),
  ],
};

