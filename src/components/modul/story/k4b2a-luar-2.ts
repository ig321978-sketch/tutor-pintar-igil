import type { AdeganStory } from "./logika-story";
import { BENTUK_LATIHAN, W, barisTabel, benda, bulat, emo, garis, garisBilangan, judul, kartu, kisi, lingkaranBagi, panah, pecahan, teks } from "./k4b2a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b2a-bantu";
import { NAMA_METODE, NAMA_METODE_ID } from "./k4b2a-luar-1";

const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Garis bilangan penerapan: titik 1/n untuk n = 2 sampai 5 tersembunyi (op 0) sampai disebut. */
const GARIS_TERAPAN = garisBilangan("gt", 30, 112, 240, [2, 3, 4, 5]).map((o) => (/^gt-(k|f)[2345]$/.test(o.id) ? { ...o, op: 0 } : o));
const munculkan = (at: string | number, ...n: number[]) => ubah(at, ...n.flatMap((m) => [{ id: `gt-k${m}`, op: 1 }, { id: `gt-f${m}`, op: 1 }]));

/* ------------------------------ 6. Number Line Unit: konsep ------------------------------ */
const SUARA_G1 = "Metode ketiga, Number Line Unit, atau Pecahan di Garis. Pecahan satu per n terletak antara nol dan satu pada garis bilangan. Huruf n adalah penyebutnya.";
const SUARA_G2 = "Langkah pertama: gambar garis dari nol sampai satu. Langkah kedua: bagi garis menjadi sebanyak penyebut bagian sama panjang. Langkah ketiga: titik pertama setelah nol adalah satu per n.";
const SUARA_G3 = "Makin jauh dari nol, makin besar pecahannya. Untuk pembilang satu, penyebut yang makin besar membuat bagian makin kecil, sehingga titiknya makin dekat dengan nol.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Unit: titik di antara nol dan satu",
  sumber: "Metode luar: Number Line Unit",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Number Line Unit")),
      tambah("ketiga,", kepala(2)),
      tambah("satu", ...garisBilangan("gl", 30, 120, 240, [])),
      tambah("terletak", garis("gl-kn", 90, 114, 0, 12, W.merah, 2.6), teks("gl-fn", 90, 102, "1/n", 9.6, W.merah)),
      tambah("Huruf", teks("gl-h", 150, 166, "n = penyebut", 10, W.coklat)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Bagi garis sama panjang")),
      tambah("garis", ...garisBilangan("gl", 30, 120, 240, [])),
      tambah("bagi", garis("gl-m1", 90, 114, 0, 12, W.biru, 1.6), garis("gl-m2", 150, 114, 0, 12, W.biru, 1.6), garis("gl-m3", 210, 114, 0, 12, W.biru, 1.6), teks("gl-b", 150, 84, "n bagian sama panjang", 9.2, W.biru)),
      tambah("titik", garis("gl-kn", 90, 114, 0, 12, W.merah, 2.6), teks("gl-fn", 90, 102, "1/n", 9.6, W.merah)),
      sorotkan("titik", "gl-fn"),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Makin jauh dari nol, makin besar")),
      tambah(0, ...garisBilangan("gl", 30, 110, 240, [])),
      tambah("besar", panah("gl-p", 40, 150, 220, 0, W.hijau, 2.4), teks("gl-q", 150, 170, "makin jauh dari nol: makin besar", 9, W.hijau)),
      tambah("penyebut", ...kartu("gl-r", 20, 34, 260, 28, W.langit, ["penyebut makin besar: bagian makin kecil"], 8.8)),
      tambah("dekat", teks("gl-s", 62, 90, "dekat nol", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Number Line Unit: penerapan dengan angka buku ------------------------------ */
const SUARA_H1 = "Letakkan pecahan dari soal latihan pada satu garis dari nol sampai satu. Satu per dua dibuat dengan membagi garis menjadi dua bagian sama, dan titiknya tepat di tengah.";
const SUARA_H2 = "Satu per tiga: bagi garis menjadi tiga bagian sama. Titik pertama setelah nol lebih dekat ke nol daripada satu per dua, jadi satu per tiga kurang dari satu per dua.";
const SUARA_H3 = "Satu per empat dan satu per lima makin dekat ke nol. Dari kanan ke kiri urutannya satu per dua, satu per tiga, satu per empat, dan satu per lima, selalu dari besar ke kecil.";
const SUARA_H4 = "Sekarang bandingkan satu per empat dan satu per lima. Titik satu per empat ada di sebelah kanan titik satu per lima, jadi satu per empat lebih dari satu per lima.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Unit pada pecahan latihan",
  sumber: "Metode luar: Number Line Unit",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Pecahan di Garis: soal latihan")),
      tambah("Letakkan", kepala(2)),
      tambah("garis", ...GARIS_TERAPAN),
      munculkan("tengah.", 2),
      sorotkan("tengah.", "gt-f2"),
    ),
    k(
      SUARA_H2,
      munculkan("tiga:", 3),
      sorotkan("dekat", "gt-f3"),
      tambah("kurang", ...kartu("gt-a", 70, 150, 160, 28, W.emas, ["1/3 kurang dari 1/2"], 9.6)),
    ),
    k(
      SUARA_H3,
      hapus(0, "gt-a-k", "gt-a-t0"),
      munculkan("empat", 4),
      munculkan("lima", 5),
      tambah("kiri", panah("gt-p", 262, 192, -230, 0, W.hijau, 2), teks("gt-q", 150, 186, "kanan ke kiri: besar ke kecil", 8.2, W.hijau)),
    ),
    k(
      SUARA_H4,
      sorotkan("empat", "gt-f4"),
      sorotkan("lima", "gt-f5"),
      hapus("jadi", "gt-p", "gt-q"),
      tambah("jadi", teks("gt-s", 150, 160, "titik kanan lebih besar: 1/4 lebih dari 1/5", 8, W.biru)),
    ),
  ],
};

/* ------------------------------ 8. Fair Sharing: konsep ------------------------------ */
const SUARA_B1 = "Metode keempat, Fair Sharing, atau Bagi Adil. Bagikan satu benda secara adil kepada sejumlah orang. Jika ada n orang, tiap orang mendapat satu per n bagian.";
const SUARA_B2 = "Langkah pertama: tentukan banyak orang yang berbagi. Langkah kedua: potong benda menjadi sebanyak orang itu, semua sama besar. Langkah ketiga: tiap orang mengambil satu potong.";
const SUARA_B3 = "Makin banyak orang yang berbagi, makin kecil bagian tiap orang. Dua orang berbagi satu pizza mendapat potongan lebih besar daripada tiga orang.";

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Fair Sharing: bagikan benda secara adil",
  sumber: "Metode luar: Fair Sharing",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Fair Sharing")),
      tambah("keempat,", kepala(3)),
      tambah("benda", bulat("bg0", 80, 118, 42, W.jingga, W.coklat, { tebal: 2 })),
      tambah(idx(SUARA_B1, "orang", 1), ...benda("bgp", 170, 96, 4, 4, 24, 8, W.biruMuda, W.biru)),
      tambah("tiap", teks("bgt", 215, 136, "n orang berbagi:", 9, W.biru), teks("bgu", 215, 150, "tiap orang 1/n", 9, W.merah)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Tiga langkah bagi adil")),
      tambah("pertama:", ...kartu("bh1", 14, 36, 272, 34, W.hijauMuda, ["1. tentukan banyak orang yang berbagi"], 9)),
      tambah("kedua:", ...kartu("bh2", 14, 80, 272, 34, W.langit, ["2. potong sebanyak orang, semua sama besar"], 9)),
      tambah("ketiga:", ...kartu("bh3", 14, 124, 272, 34, W.krem, ["3. tiap orang mengambil satu potong"], 9)),
      tambah("potong@2", emo("bh4", 150, 186, "✂", 22)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Makin banyak orang, makin kecil")),
      tambah("Dua", ...lingkaranBagi("bq1", 70, 100, 40, 2, 1, W.jingga), ...benda("bp1", 55, 158, 2, 2, 30, 7, W.biruMuda, W.biru), teks("bl1", 70, 184, "2 orang: 1/2", 9, W.biru)),
      tambah("tiga", ...lingkaranBagi("bq2", 220, 100, 40, 3, 1, W.jingga), ...benda("bp2", 190, 158, 3, 3, 30, 7, W.biruMuda, W.biru), teks("bl2", 220, 184, "3 orang: 1/3", 9, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Fair Sharing: penerapan dengan angka buku ------------------------------ */
const SUARA_Y1 = "Pizza dibagi kepada empat siswa. Empat orang berbagi, jadi tiap siswa mendapat satu per empat pizza.";
const SUARA_Y2 = "Sekarang dua batang sama panjang: sepuluh anak berbagi satu batang, dan lima anak berbagi batang lain yang sama panjang. Anak dalam kelompok sepuluh mendapat bagian lebih kecil, jadi satu per sepuluh kurang dari satu per lima.";
const SUARA_Y3 = "Contoh berikutnya: satu per sebelas dan satu per tiga belas. Sebelas anak berbagi satu benda, tiga belas anak berbagi benda yang sama. Bagian anak dari tiga belas lebih kecil, jadi satu per sebelas lebih dari satu per tiga belas.";
const SUARA_Y4 = "Terakhir: satu per delapan dan satu per dua. Dua orang berbagi, tiap orang mendapat bagian besar. Delapan orang berbagi, bagian tiap orang kecil. Jadi satu per delapan kurang dari satu per dua.";

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Fair Sharing pada soal latihan",
  sumber: "Metode luar: Fair Sharing",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Fair Sharing: pizza empat siswa")),
      tambah("Pizza", kepala(3)),
      tambah("dibagi", ...lingkaranBagi("ya", 90, 124, 44, 4, 1, W.jingga)),
      tambah("siswa.", ...benda("yp", 175, 104, 4, 2, 24, 8, W.biruMuda, W.biru), teks("yq", 187, 154, "4 siswa", 9, W.biru)),
      tambah("satu", ...pecahan("yr", 255, 120, "1", "4", 26)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Sepuluh anak lawan lima anak")),
      tambah("sepuluh", ...kisi("yu", 20, 40, 10, 1, 18, 26, 1), ...benda("yua", 29, 96, 10, 10, 18, 5, W.biruMuda, W.biru), ...pecahan("yur", 245, 53, "1", "10", 22)),
      tambah("lima", ...kisi("yv", 20, 116, 5, 1, 36, 26, 1), ...benda("yva", 38, 170, 5, 5, 36, 5, W.biruMuda, W.biru), ...pecahan("yvr", 245, 129, "1", "5", 22)),
      tambah("kurang", teks("yw", 284, 112, "<", 26, W.merah)),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Sebelas anak lawan tiga belas anak")),
      tambah(0, teks("yx1", 150, 56, "11 anak: tiap anak 1/11", 9, W.biru)),
      tambah(idx(SUARA_Y3, "sebelas", 2), ...benda("yx", 24, 76, 11, 11, 22, 6, W.biruMuda, W.biru)),
      tambah(idx(SUARA_Y3, "tiga", 2), teks("yx2", 150, 108, "13 anak: tiap anak 1/13", 9, W.biru), ...benda("yy", 20, 128, 13, 13, 20, 5.5, W.merahMuda, W.merah)),
      tambah("lebih@2", ...kartu("yz", 60, 156, 180, 30, W.emas, ["1/11 > 1/13"], 11)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Delapan orang lawan dua orang")),
      tambah(idx(SUARA_Y4, "dua", 2), ...benda("zy", 100, 70, 2, 2, 40, 9, W.biruMuda, W.biru), teks("zy1", 230, 74, "2 orang: 1/2", 9, W.biru)),
      tambah(idx(SUARA_Y4, "delapan", 2), ...benda("zz", 50, 120, 8, 8, 26, 7, W.merahMuda, W.merah), teks("zz1", 150, 146, "8 orang: 1/8", 9, W.biru)),
      tambah("Jadi", ...kartu("zk", 60, 160, 180, 30, W.emas, ["1/8 < 1/2"], 11)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_Z1 = "Ringkasnya, empat metode: Unit Fraction untuk menghitung bagian, Area Model untuk membandingkan arsiran, Number Line Unit untuk menaruh titik di garis, dan Fair Sharing untuk membagi benda.";
const SUARA_Z2 = "Angka yang dipakai: lima gambar bentuk pecahan, batang satu per dua lawan satu per empat, satu per sepuluh lawan satu per lima, garis dari satu per dua sampai satu per lima, dan sebelas anak lawan tiga belas anak.";
const SUARA_Z3 = "Memilih metode: untuk membaca satu gambar, hitung bagiannya. Untuk membandingkan dua gambar, lihat arsirannya. Untuk mengurutkan, pakai garis. Untuk cerita membagi, pakai bagi adil. Selalu periksa lewat penyebutnya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      ...["hitung bagian", "bandingkan arsiran", "titik di garis", "bagi benda"].map((t, i) => tambah(["Unit", "Area", "Number", "Fair"][i], ...kartu(`r${i}`, 12, 32 + i * 38, 276, 30, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${t}`], 8.8))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Angka yang dipakai")),
      tambah("Angka", ...barisTabel("rt0", 14, 32, [92, 188], ["metode", "angka yang dipakai"], 24, 8.4, true)),
      tambah("lima", ...barisTabel("rt1", 14, 56, [92, 188], ["Unit Fraction", BENTUK_LATIHAN.map(([n, a]) => `${a}/${n}`).join(", ")], 24, 8.2)),
      tambah("batang", ...barisTabel("rt2", 14, 80, [92, 188], ["Area Model", "1/2 : 1/4, 1/10 : 1/5"], 24, 8.2)),
      tambah("garis", ...barisTabel("rt3", 14, 104, [92, 188], ["Number Line Unit", "1/2, 1/3, 1/4, 1/5"], 24, 8.2)),
      tambah("sebelas", ...barisTabel("rt4", 14, 128, [92, 188], ["Fair Sharing", "1/11 : 1/13"], 24, 8.2)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("membaca", ...kartu("p1", 14, 32, 272, 28, W.hijauMuda, ["satu gambar: hitung bagiannya"], 9)),
      tambah("membandingkan", ...kartu("p2", 14, 66, 272, 28, W.langit, ["dua gambar: lihat arsirannya"], 9)),
      tambah("mengurutkan,", ...kartu("p3", 14, 100, 272, 28, W.krem, ["urutan: pakai garis"], 9)),
      tambah("cerita", ...kartu("p4", 14, 134, 272, 28, W.pink, ["cerita membagi: bagi adil"], 9)),
      tambah("periksa", emo("p5", 150, 188, "✅", 22)),
    ),
  ],
};
