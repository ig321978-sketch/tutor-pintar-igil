import type { AdeganStory } from "./logika-story";
import { W, batangBil, emo, fmt, judul, kartu, kotak, panah, teks, zoomRatusan } from "./k4b1c-gambar";
import { bersih, hapus, idx, k, tambah, ubah } from "./k4b1c-bantu";
import { kepala } from "./k4b1c-luar-1";

/** Kartu bilangan untuk himpunan: pojok kiri-atas (x, y), lebar 62, tinggi 30. Id `${id}-k`, `${id}-t0`. */
const kartuBil = (id: string, x: number, y: number, n: number, warna: string = W.krem) => kartu(id, x, y, 62, 30, warna, [fmt(n)], 10.4);
/** Mencoret kartu himpunan: kotak dan teks dibuat pudar. */
const coret = (at: string | number, id: string) => ubah(at, { id: `${id}-k`, op: 0.3 }, { id: `${id}-t0`, op: 0.3 });
const WARNA4 = [W.hijauMuda, W.krem, W.pink, W.langit];

/* ------------------------------ 6. Ordering Sets: konsep (himpunan tinggi gunung: 3.676, 2.460, 3.726) ------------------------------ */
const SUARA_H1 = "Metode ketiga, Ordering Sets, atau Mengurutkan Himpunan. Himpunan adalah kumpulan bilangan yang ingin diurutkan, ditulis di dalam kurung kurawal.";
const SUARA_H2 = "Cara kerjanya: cari bilangan terkecil dalam himpunan, pindahkan ke deret hasil, lalu coret dari himpunan.";
const SUARA_H3 = "Ulangi dengan sisa himpunan sampai habis. Setiap putaran membandingkan bilangan secara berpasangan, lalu mengambil satu bilangan.";
const SUARA_H4 = "Urutan hasilnya naik, dari terkecil ke terbesar. Ingin urutan turun? Ambil yang terbesar pada tiap putaran.";

const SET_GUNUNG = [3676, 2460, 3726] as const;
const XS = [34, 118, 202] as const;

export const ADEGAN_LUAR_HIMPUNAN: AdeganStory = {
  id: "luar-himpunan",
  judul: "Ordering Sets: pilih yang terkecil, satu per satu",
  sumber: "Metode luar: Ordering Sets",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Metode 3 dari 4")),
      tambah("ketiga,", ...kepala(2)),
      tambah("kumpulan", teks("hkb1", 20, 98, "{", 34, W.coklat), teks("hkb2", 282, 98, "}", 34, W.coklat), ...SET_GUNUNG.flatMap((n, i) => kartuBil(`hks${i}`, XS[i], 66, n, WARNA4[i]))),
      tambah("kurawal.", teks("hkc", 150, 124, "himpunan: tiga bilangan", 9.6, W.coklat)),
    ),
    k(
      SUARA_H2,
      hapus(0, "hkc"),
      tambah("terkecil", teks("hkd", 236, 128, "terkecil: 2.460", 10, W.merah)),
      tambah("pindahkan", panah("hka", 149, 98, -84, 42, W.hijau, 2), ...kartuBil("hkh0", 34, 140, 2460, W.hijauMuda)),
      coret("coret", "hks1"),
    ),
    k(
      SUARA_H3,
      hapus(0, "hkd", "hka"),
      tambah("Ulangi", teks("hke", 150, 124, "sisa: bandingkan 3.676 dan 3.726", 9, W.merah)),
      tambah("mengambil", ...kartuBil("hkh1", 118, 140, 3676, W.hijauMuda)),
      coret("mengambil", "hks0"),
    ),
    k(
      SUARA_H4,
      hapus(0, "hke"),
      tambah("Urutan", ...kartuBil("hkh2", 202, 140, 3726, W.hijauMuda)),
      coret("Urutan", "hks2"),
      tambah("turun?", ...kartu("hkf", 40, 178, 220, 22, W.emas, ["turun: ambil yang terbesar"], 8.8)),
    ),
  ],
};

/* ------------------------------ 7. Ordering Sets: penerapan pada himpunan soal latihan buku ------------------------------ */
const SUARA_Q1 = "Himpunan dari soal latihan buku: tujuh ribu lima ratus tujuh puluh, lima ribu dua ratus empat puluh, tiga ribu empat puluh satu, dan sembilan ribu sembilan ratus empat puluh satu.";
const SUARA_Q2 = "Putaran pertama: yang terkecil adalah tiga ribu empat puluh satu, karena ribuannya tiga. Pindahkan ke hasil, lalu coret.";
const SUARA_Q3 = "Putaran kedua dan ketiga: dari sisanya yang terkecil lima ribu dua ratus empat puluh, lalu tujuh ribu lima ratus tujuh puluh. Keduanya dipindahkan dan dicoret.";
const SUARA_Q4 = "Tinggal satu, sembilan ribu sembilan ratus empat puluh satu, masuk paling akhir. Hasil urutannya sama dengan kunci buku.";

const SOAL = [7570, 5240, 3041, 9941] as const;
const X4 = [8, 80, 152, 224] as const;

export const ADEGAN_LUAR_HIMPUNAN_TERAPAN: AdeganStory = {
  id: "luar-himpunan-terapan",
  judul: "Ordering Sets pada himpunan soal latihan",
  sumber: "Metode luar: Ordering Sets; BS hlm. 23",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Himpunan empat bilangan")),
      tambah(0, ...kepala(2)),
      ...SOAL.map((n, i) => tambah([idx(SUARA_Q1, "puluh", 1), idx(SUARA_Q1, "puluh", 2), idx(SUARA_Q1, "satu", 1), idx(SUARA_Q1, "satu", 2)][i], ...kartuBil(`hts${i}`, X4[i], 66, n, WARNA4[i]))),
    ),
    k(
      SUARA_Q2,
      tambah("Pindahkan", panah("hta", 183, 98, -144, 42, W.hijau, 2), ...kartuBil("hth0", 8, 140, 3041, W.hijauMuda)),
      coret("coret.", "hts2"),
    ),
    k(
      SUARA_Q3,
      hapus(0, "hta"),
      tambah("lima", ...kartuBil("hth1", 80, 140, 5240, W.hijauMuda)),
      coret("lima", "hts1"),
      tambah("lalu", ...kartuBil("hth2", 152, 140, 7570, W.hijauMuda)),
      coret("lalu", "hts0"),
    ),
    k(
      SUARA_Q4,
      tambah("masuk", ...kartuBil("hth3", 224, 140, 9941, W.hijauMuda)),
      coret("masuk", "hts3"),
      tambah("Hasil", teks("htr", 150, 190, "3.041 < 5.240 < 7.570 < 9.941", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Bar Model Compare: konsep ------------------------------ */
const SUARA_B1 = "Metode keempat, Bar Model Compare, atau Banding Batang. Setiap bilangan digambar sebagai batang, dan panjang batang sebanding dengan nilainya.";
const SUARA_B2 = "Satu blok biru mewakili seribu. Delapan ribu tujuh ratus lima puluh berarti delapan blok penuh, dan sisa tujuh ratus lima puluh digambar sebagai potongan kuning yang kurang dari satu blok.";
const SUARA_B3 = "Bandingkan panjang kedua batang. Batang yang lebih panjang berarti bilangan yang lebih besar. Hitung dulu blok penuhnya, yaitu angka ribuan.";
const SUARA_B4 = "Bila blok penuh sama banyak, bandingkan potongan sisanya. Bila selisihnya tipis, perbesar sisa itu menjadi sepuluh petak ratusan.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model Compare: bilangan menjadi panjang batang",
  sumber: "Metode luar: Bar Model Compare",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Metode 4 dari 4")),
      tambah("keempat,", ...kepala(3)),
      tambah("batang,", ...batangBil("bk", 14, 76, 8750), teks("bkl", 14, 70, "8.750", 9, W.hijau, { anchor: "start" })),
      tambah("sebanding", teks("bkn", 150, 130, "panjang batang sebanding nilai", 9.6, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(0, "bkn"),
      tambah("Satu", kotak("bkg", 14, 120, 28, 14, W.biruMuda, W.putih, { rx: 0 }), teks("bkgt", 50, 131, "1 blok = 1.000", 9, W.biru, { anchor: "start" })),
      tambah("penuh,", teks("bkp", 126, 100, "8 blok penuh", 8.8, W.biruMuda)),
      tambah("sisa", teks("bks", 248, 100, "sisa 750", 8.8, W.coklat)),
    ),
    k(
      SUARA_B3,
      hapus(0, "bkg", "bkgt", "bkp", "bks"),
      tambah("kedua", ...batangBil("bj", 14, 116, 7500), teks("bjl", 14, 110, "7.500", 9, W.hijau, { anchor: "start" })),
      tambah("lebih", teks("bjk", 150, 162, "lebih panjang, lebih besar", 10.4, W.merah)),
      tambah("ribuan.", teks("bjm", 150, 182, "ribuan = blok penuh: 8 dan 7", 9, W.hijau)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Metode 4 dari 4")),
      tambah(0, ...kepala(3)),
      tambah("sama", ...batangBil("bt", 14, 76, 3000), teks("btl", 14, 70, "3 blok penuh sama", 9, W.hijau, { anchor: "start" })),
      tambah("sisanya.", teks("bts", 150, 108, "bandingkan sisa", 9.6, W.merah)),
      tambah("petak", ...zoomRatusan("bz", 100, 130, 0), teks("bzt", 150, 160, "1 blok = 10 petak ratusan", 9.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 9. Bar Model Compare: penerapan ------------------------------ */
const SUARA_R1 = "Delapan ribu tujuh ratus lima puluh: delapan blok penuh dan sisa. Tujuh ribu lima ratus: tujuh blok penuh dan sisa. Batang pertama lebih panjang, jadi yang pertama lebih besar.";
const SUARA_R2 = "Tiga ribu enam ratus tujuh puluh enam dan tiga ribu tujuh ratus dua puluh enam: tiga blok penuh sama banyak, dan batangnya hampir sama panjang. Selisihnya tipis, jadi sisanya diperbesar.";
const SUARA_R3 = "Pada kaca pembesar, sisa yang pertama mengisi enam petak ratusan, dan sisa yang kedua tujuh petak. Tujuh lebih dari enam, jadi yang kedua lebih besar.";
const SUARA_R4 = "Empat batang soal latihan disusun dari terpendek: tiga ribu empat puluh satu, lima ribu dua ratus empat puluh, tujuh ribu lima ratus tujuh puluh, lalu sembilan ribu sembilan ratus empat puluh satu.";

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model Compare pada bilangan buku",
  sumber: "Metode luar: Bar Model Compare; BS hlm. 18–23",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("8.750 dan 7.500")),
      tambah(0, ...kepala(3)),
      tambah("Delapan", ...batangBil("ra", 14, 76, 8750), teks("ral", 14, 70, "8.750", 9, W.hijau, { anchor: "start" })),
      tambah(idx(SUARA_R1, "tujuh", 2), ...batangBil("rb", 14, 122, 7500), teks("rbl", 14, 116, "7.500", 9, W.hijau, { anchor: "start" })),
      tambah("jadi", teks("rr", 150, 168, "8.750 > 7.500", 16, W.merah)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("3.676 dan 3.726")),
      tambah(0, ...kepala(3)),
      tambah(idx(SUARA_R2, "enam", 2), ...batangBil("sa", 14, 70, 3676), teks("sal", 14, 64, "3.676", 9, W.hijau, { anchor: "start" })),
      tambah(idx(SUARA_R2, "enam", 3), ...batangBil("sb", 14, 106, 3726), teks("sbl", 14, 100, "3.726", 9, W.hijau, { anchor: "start" })),
      tambah("tipis,", teks("st", 150, 152, "selisih tipis", 11, W.merah)),
    ),
    k(
      SUARA_R3,
      hapus(0, "st"),
      tambah("pembesar,", ...zoomRatusan("za", 100, 128, 0, 14), teks("zal", 14, 139, "3.676", 9, W.hijau, { anchor: "start" }), ...zoomRatusan("zb", 100, 158, 0, 14), teks("zbl", 14, 169, "3.726", 9, W.hijau, { anchor: "start" })),
      ...Array.from({ length: 6 }, (_, i) => ubah(idx(SUARA_R3, "enam"), { id: `za-z${i}`, warna: W.arsir })),
      ...Array.from({ length: 7 }, (_, i) => ubah(idx(SUARA_R3, "tujuh", 1), { id: `zb-z${i}`, warna: W.arsir })),
      tambah("jadi", teks("zr", 150, 192, "6 < 7, jadi 3.676 < 3.726", 10.4, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Empat batang urut naik")),
      tambah(0, ...kepala(3)),
      ...([3041, 5240, 7570, 9941] as const).map((n, i) => tambah(idx(SUARA_R4, i === 3 ? "satu" : "puluh", i === 3 ? 2 : i + 1), ...batangBil(`rd${i}`, 14, 74 + i * 30, n, 12), teks(`rd${i}-l`, 14, 70 + i * 30, fmt(n), 8.4, W.hijau, { anchor: "start" }))),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode ------------------------------ */
const SUARA_Y1 = "Ringkasan empat metode. Banding dari Kiri membaca angka dari kiri. Urutan Garis Bilangan menaruh titik, makin ke kanan makin besar.";
const SUARA_Y2 = "Mengurutkan Himpunan memilih yang terkecil satu per satu. Banding Batang menggambar panjang, lalu memperbesar sisa bila hampir sama.";
const SUARA_Y3 = "Apa pun metodenya, hasilnya sama, dan kuncinya tetap nilai tempat: bandingkan ribuan dulu. Pilih cara yang paling cocok bagi kalian.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan: empat cara, satu hasil",
  sumber: "Metode luar: ringkasan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Kiri", ...kartu("rt1", 12, 34, 276, 34, W.hijauMuda, ["1. Banding dari Kiri", "8.750 > 7.500"], 9)),
      tambah("Garis", ...kartu("rt2", 12, 76, 276, 34, W.langit, ["2. Urutan Garis Bilangan", "kanan = lebih besar"], 9)),
    ),
    k(
      SUARA_Y2,
      tambah("Himpunan", ...kartu("rt3", 12, 118, 276, 34, W.krem, ["3. Mengurutkan Himpunan", "3.041, 5.240, 7.570, 9.941"], 9)),
      tambah("Batang", ...kartu("rt4", 12, 160, 276, 34, W.pink, ["4. Banding Batang", "3.676 < 3.726"], 9)),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Satu kunci: nilai tempat")),
      tambah("hasilnya", emo("rk", 150, 76, "🎯", 40)),
      tambah("ribuan", ...kartu("rk1", 40, 100, 220, 34, W.emas, ["ribuan dulu, lalu ke kanan"], 10)),
      tambah("Pilih", ...kartu("rk2", 40, 144, 220, 34, W.hijauMuda, ["pilih cara yang cocok"], 10)),
    ),
  ],
};
