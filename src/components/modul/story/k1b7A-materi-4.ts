import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, garisAwal, judul, kartu, namaH, panjangH, satuanH, tanah, teks, tinggiV } from "./k1b7A-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k1b7A-bantu";
import { batangNama, Y1, Y2 } from "./k1b7A-materi-1";
import { pohon } from "./k1b7A-materi-2";

const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

/* ------------------------------ 12. Latihan 1: mana yang lebih panjang ------------------------------ */
const SUARA_A1 = "Latihan satu. Stik Halim dan stik Wei dimulai dari garis awal yang sama. Mana yang lebih panjang?";
const SUARA_A2 = "Hitung dulu. Stik Halim panjangnya delapan kotak. Stik Wei panjangnya lima kotak.";
const SUARA_A3 = "Pilih jawabannya. Stik mana yang lebih panjang? Ketuk kartu Halim.";
const SUARA_A4 = "Betul! Stik Halim lebih panjang tiga kotak dari stik Wei. Hebat!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: mana yang lebih panjang",
  sumber: "Materi: latihan lebih panjang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_A1, "Halim"), ...batangNama("ua", Y1, 8, W.krem, "Stik Halim"), ...batangNama("ub", Y2, 5, W.hijauMuda, "Stik Wei")),
      tambah("garis", ...garisAwal(54, 150)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "delapan"), panjangH("ua", Y1, 8, "8 kotak")), tambah(idx(SUARA_A2, "lima"), panjangH("ub", Y2, 5, "5 kotak"))),
    k(SUARA_A3, tambah("jawabannya.", ...pilihKata(152, ["Halim", "Wei"])), sorotkan("Ketuk", "c1-k")),
    k(SUARA_A4, ubah("tiga", ...ids("ua", 5, 7).map((id) => ({ id, warna: W.emas }))), tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("Hebat!", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 13. Latihan 2: pohon yang paling rendah ------------------------------ */
const SUARA_B1 = "Latihan dua. Malosi, Upe, dan Halim menanam pohon. Semua pohon berdiri di tanah yang sama.";
const SUARA_B2 = "Hitung tinggi tiap pohon. Pohon Malosi tujuh kotak. Pohon Upe empat kotak. Pohon Halim sembilan kotak.";
const SUARA_B3 = "Pohon siapa yang paling rendah? Ketuk pohon yang menurutmu paling rendah.";
const SUARA_B4 = "Betul! Pohon Upe paling rendah, karena pohon Upe lebih rendah dari pohon Malosi dan pohon Halim.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: pohon yang paling rendah",
  sumber: "Materi: latihan paling rendah",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2"), ...tanah(false)),
      tambah(idx(SUARA_B1, "Malosi,"), ...pohon("va", 60, 7, "Pohon Malosi")),
      tambah(idx(SUARA_B1, "Upe,"), ...pohon("vb", 150, 4, "Pohon Upe")),
      tambah(idx(SUARA_B1, "Halim"), ...pohon("vc", 240, 9, "Pohon Halim")),
    ),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "tujuh"), tinggiV("va", 60, 7, "7 kotak")),
      tambah(idx(SUARA_B2, "empat"), tinggiV("vb", 150, 4, "4 kotak")),
      tambah(idx(SUARA_B2, "sembilan"), tinggiV("vc", 240, 9, "9 kotak")),
    ),
    k(SUARA_B3, tambah("Ketuk", emo("q", 105, 100, "❓", 26))),
    k(
      SUARA_B4,
      hapus(0, "q"),
      ubah("Upe", ...ids("vb", 0, 3).map((id) => ({ id, sorot: true }))),
      tambah("Betul!", emo("ok", 105, 110, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 14. Latihan 3: urutkan tiga stik ------------------------------ */
const SUARA_C1 = "Latihan tiga. Urutkan tiga stik dari yang paling pendek. Ketuk stik satu per satu.";
const SUARA_C2 = "Yang paling pendek lebih dulu. Itu stik merah, nomor satu.";
const SUARA_C3 = "Berikutnya stik biru, nomor dua. Stik biru lebih panjang dari stik merah.";
const SUARA_C4 = "Terakhir stik hijau, nomor tiga. Stik hijau paling panjang.";
const SUARA_C5 = "Urutan dari yang paling pendek adalah merah, biru, lalu hijau. Stik hijau lebih panjang enam kotak dari stik merah.";
const STIK = [
  { s: "ua", n: 6, y: 60, warna: W.langit, nama: "Stik biru" },
  { s: "ub", n: 3, y: 100, warna: W.merahMuda, nama: "Stik merah" },
  { s: "uc", n: 9, y: 140, warna: W.hijauMuda, nama: "Stik hijau" },
];
const stikKe = (i: number): Obj[] => [namaH(STIK[i].s, STIK[i].y, STIK[i].nama), ...satuanH(STIK[i].s, STIK[i].y, STIK[i].n, STIK[i].warna)];
const nomor = (i: number, isi: string): Obj => teks(`r${isi}`, 288, STIK[i].y + 11, isi, 11, W.ungu);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: urutkan tiga stik",
  sumber: "Materi: latihan mengurutkan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_C1, "tiga", 2), ...[0, 1, 2].flatMap(stikKe)),
      tambah("Urutkan", ...garisAwal(52, 162)),
      tambah("Ketuk", ...[0, 1, 2].map((i) => panjangH(STIK[i].s, STIK[i].y, STIK[i].n, `${STIK[i].n} kotak`))),
    ),
    k(SUARA_C2, sorotkan("merah,", ...ids("ub", 0, 2)), tambah("satu.", nomor(1, "1"))),
    k(SUARA_C3, redamkan(0, ...ids("ub", 0, 2)), sorotkan("biru,", ...ids("ua", 0, 5)), tambah("dua.", nomor(0, "2"))),
    k(SUARA_C4, redamkan(0, ...ids("ua", 0, 5)), sorotkan("hijau,", ...ids("uc", 0, 8)), tambah("tiga.", nomor(2, "3"))),
    k(SUARA_C5, redamkan(0, ...ids("uc", 0, 8)), tambah("Urutan", emo("ok", 150, 197, "✅", 20)), tambah("enam", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 15. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Untuk dua benda, kita memakai kata lebih panjang, lebih pendek, atau sama panjang.";
const SUARA_Z2 = "Untuk tiga benda atau lebih, kita memakai kata paling panjang dan paling pendek. Untuk tinggi, kita memakai kata paling tinggi dan paling rendah.";
const SUARA_Z3 = "Semua benda dibandingkan dari garis awal yang sama. Hitung kotak satuannya, supaya kita tahu selisihnya.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("dua", ...kartu("p1", 14, 36, 272, 40, W.hijauMuda, ["dua benda: lebih panjang,", "lebih pendek, sama panjang"], 9.4))),
    k(SUARA_Z2, tambah("tiga", ...kartu("p2", 14, 86, 272, 40, W.langit, ["tiga benda atau lebih:", "paling panjang, paling pendek"], 9.4))),
    k(SUARA_Z3, tambah("Semua", ...kartu("p3", 14, 136, 272, 40, W.krem, ["mulai dari garis awal yang sama,", "lalu hitung kotak satuannya"], 9.4))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
