import type { AdeganStory, Obj } from "./logika-story";
import { EMO_APEL, EMO_HIJAU, EMO_JERUK, EMO_KUNING, EMO_MERAH, EMO_PISANG, OWL, W, angkaMenurun, emo, garis, goresan, jumlahG, judul, kartu, namaG, pusatBenda, tabelMenurun, titikBaris, type Geo } from "./k1b8A-gambar";
import { barisKelompok, gilir, hapus, hitungAksi, ids, idx, k, pilihKata, redamkan, sorotkan, tambah, bersih } from "./k1b8A-bantu";

/* ------------------------------ 15. Sama banyak ------------------------------ */
const BUAH = [
  { key: "a", nama: "Apel", e: EMO_APEL, n: 5, y: 62 },
  { key: "b", nama: "Jeruk", e: EMO_JERUK, n: 5, y: 102 },
  { key: "c", nama: "Pisang", e: EMO_PISANG, n: 3, y: 142 },
];
const barisBuah = (r: number): Obj[] => barisKelompok(BUAH[r].key, BUAH[r].nama, BUAH[r].e, BUAH[r].n, BUAH[r].y);
const sorotBuah = (r: number): string[] => [`e${BUAH[r].key}-nm`, ...ids(`e${BUAH[r].key}`, 0, BUAH[r].n - 1)];
const angkaBuah = (r: number): Obj => jumlahG(BUAH[r].key, BUAH[r].y, String(BUAH[r].n));

const SUARA_S1 = "Wei dan Halim mempunyai buah di keranjang. Ada apel, jeruk, dan pisang. Kita kelompokkan dan hitung.";
const SUARA_S2 = "Apel ada lima. Jeruk ada lima. Pisang ada tiga.";
const SUARA_S3 = "Apel dan jeruk sama banyak. Keduanya ada lima.";
const SUARA_S4 = "Pisang paling sedikit. Pisang lebih sedikit dari apel dan jeruk.";
const SUARA_S5 = "Adakah yang paling banyak? Apel dan jeruk sama-sama paling banyak, karena jumlahnya sama.";
const SUARA_S6 = "Kalau banyaknya sama, kita sebut sama banyak. Jadi apel dan jeruk sama banyak.";
const SUARA_S7 = "Jumlah semuanya tiga belas buah. Lima, lima, dan tiga.";

export const ADEGAN_SAMA_BANYAK: AdeganStory = {
  id: "sama-banyak",
  judul: "Sama banyak dan paling sedikit",
  sumber: "Materi: sama banyak",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Buah di keranjang")), tambah(idx(SUARA_S1, "apel"), ...barisBuah(0)), tambah(idx(SUARA_S1, "jeruk"), ...barisBuah(1)), tambah(idx(SUARA_S1, "pisang"), ...barisBuah(2))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "lima", 1), angkaBuah(0)), tambah(idx(SUARA_S2, "lima", 2), angkaBuah(1)), tambah(idx(SUARA_S2, "tiga"), angkaBuah(2))),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Apel"), ...sorotBuah(0), "ea-ln"), sorotkan(idx(SUARA_S3, "jeruk"), ...sorotBuah(1), "eb-ln")),
    k(SUARA_S4, redamkan(0, ...sorotBuah(0), ...sorotBuah(1), "ea-ln", "eb-ln"), sorotkan(idx(SUARA_S4, "Pisang"), ...sorotBuah(2), "ec-ln")),
    k(SUARA_S5, redamkan(0, ...sorotBuah(2), "ec-ln"), sorotkan(idx(SUARA_S5, "Apel"), ...sorotBuah(0)), sorotkan(idx(SUARA_S5, "jeruk"), ...sorotBuah(1))),
    k(SUARA_S6, redamkan(0, ...sorotBuah(0), ...sorotBuah(1)), tambah(idx(SUARA_S6, "sebut"), ...kartu("sb", 70, 168, 160, 26, W.emas, ["sama banyak"], 11)), tambah("Jadi", emo("ok", 262, 190, "✅", 22))),
    k(SUARA_S7, hapus(0, "sb-k", "sb-t0"), tambah(idx(SUARA_S7, "tiga"), ...kartu("js", 50, 168, 200, 26, W.emas, ["jumlah semuanya: 13"], 10.4))),
  ],
};

/* ------------------------------ 16. Selisih ------------------------------ */
const YM = 70;
const YU = 130;
const XS = 76;
const SUARA_L1 = "Mari kita bandingkan bola merah dengan bola kuning. Ada tujuh bola merah. Ada empat bola kuning.";
const SUARA_L2 = "Kita pasangkan satu bola merah dengan satu bola kuning. Garis ini menghubungkan pasangannya.";
const SUARA_L3 = "Empat bola merah sudah punya pasangan. Masih ada bola merah yang tidak punya pasangan.";
const SUARA_L4 = "Bola merah yang tidak punya pasangan ada tiga. Jadi bola merah lebih banyak tiga dari bola kuning.";
const SUARA_L5 = "Bola kuning lebih sedikit tiga dari bola merah. Banyaknya beda tiga, itulah selisihnya.";
const SUARA_L6 = "Selisih artinya beda banyaknya antara dua kelompok. Kita bisa mencarinya dengan memasangkan satu-satu.";
const pasangan = (): Obj[] => Array.from({ length: 4 }, (_, i) => garis(`pr${i}`, XS + i * 26, YM + 8, 0, YU - 14 - YM - 8, W.hijau, 1.8));

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih-bola",
  judul: "Selisih: lebih banyak berapa?",
  sumber: "Materi: selisih",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Bandingkan dua kelompok")),
      tambah(idx(SUARA_L1, "merah"), ...barisKelompok("a", "Bola merah", EMO_MERAH, 7, YM)),
      tambah(idx(SUARA_L1, "kuning"), ...barisKelompok("b", "Bola kuning", EMO_KUNING, 4, YU)),
      tambah(idx(SUARA_L1, "tujuh"), jumlahG("a", YM, "7")),
      tambah(idx(SUARA_L1, "empat"), jumlahG("b", YU, "4")),
    ),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Garis"), ...pasangan())),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Masih"), "ea4", "ea5", "ea6")),
    k(SUARA_L4, tambah(idx(SUARA_L4, "tiga", 2), ...kartu("sl", 60, 164, 180, 28, W.emas, ["selisihnya: 3"], 10.4))),
    k(SUARA_L5, redamkan(0, "ea4", "ea5", "ea6"), sorotkan("kuning", ...ids("eb", 0, 3)), sorotkan("selisihnya.", "sl-k")),
    k(SUARA_L6, redamkan(0, ...ids("eb", 0, 3), "sl-k"), hapus(0, "sl-k", "sl-t0"), tambah("Selisih", ...kartu("sm", 40, 164, 220, 28, W.krem, ["selisih: beda banyaknya"], 10.4))),
  ],
};

/* ------------------------------ 17. Jumlah semuanya ------------------------------ */
const JB = [
  { key: "a", nama: "Bola merah", e: EMO_MERAH, n: 7, y: 70, dari: 1 },
  { key: "b", nama: "Bola kuning", e: EMO_KUNING, n: 4, y: 110, dari: 8 },
  { key: "c", nama: "Bola hijau", e: EMO_HIJAU, n: 6, y: 150, dari: 12 },
];
const SUARA_J1 = "Berapa jumlah semuanya bola Upe? Kita hitung semua bola satu per satu, dari baris pertama.";
const SUARA_J2 = "Bola merah dulu. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_J3 = "Lanjut ke bola kuning. Delapan, sembilan, sepuluh, sebelas.";
const SUARA_J4 = "Terakhir bola hijau. Dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas.";
const SUARA_J5 = "Jadi jumlah semuanya adalah tujuh belas bola. Tujuh belas itu banyak semua bola Upe.";
const SUARA_J6 = "Cek lagi dengan data tiap warna. Merah tujuh, kuning empat, hijau enam. Hasilnya sama, yaitu tujuh belas.";
const hitungJB = (suara: string, r: number, setelah: string) => hitungAksi(suara, `e${JB[r].key}`, pusatBenda(titikBaris(JB[r].n, XS, JB[r].y)), { setelah, dari: JB[r].dari });
const sorotJB = (r: number): string[] => [`e${JB[r].key}-nm`];

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah-semua",
  judul: "Jumlah semuanya",
  sumber: "Materi: jumlah semuanya",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Jumlah semuanya")), tambah(idx(SUARA_J1, "semua"), ...JB.flatMap((b) => barisKelompok(b.key, b.nama, b.e, b.n, b.y, XS)))),
    k(SUARA_J2, ...hitungJB(SUARA_J2, 0, "dulu.")),
    k(SUARA_J3, ...hitungJB(SUARA_J3, 1, "kuning.")),
    k(SUARA_J4, ...hitungJB(SUARA_J4, 2, "hijau.")),
    k(SUARA_J5, tambah(idx(SUARA_J5, "tujuh"), ...kartu("js", 50, 168, 200, 28, W.emas, ["jumlah semuanya: 17"], 10.4))),
    k(
      SUARA_J6,
      ...gilir(SUARA_J6, [
        ["Merah", sorotJB(0)],
        ["kuning", sorotJB(1)],
        ["hijau", sorotJB(2)],
      ]),
    ),
  ],
};

/* ------------------------------ 18. Latihan 1: paling banyak ------------------------------ */
const LB = [
  { key: "a", nama: "Apel", e: EMO_APEL, n: 4, y: 52 },
  { key: "b", nama: "Pisang", e: EMO_PISANG, n: 7, y: 86 },
  { key: "c", nama: "Jeruk", e: EMO_JERUK, n: 5, y: 120 },
];
const SUARA_A1 = "Latihan satu. Malosi menaruh buah di tiga keranjang. Ada apel, pisang, dan jeruk. Mana yang paling banyak?";
const SUARA_A2 = "Hitung dulu. Apel ada empat. Pisang ada tujuh. Jeruk ada lima.";
const SUARA_A3 = "Pilih jawabannya. Buah apa yang paling banyak? Ketuk kartu yang tepat.";
const SUARA_A4 = "Betul! Pisang paling banyak, yaitu tujuh. Hebat!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: yang paling banyak",
  sumber: "Materi: latihan paling banyak",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_A1, "apel,"), ...barisKelompok("a", LB[0].nama, LB[0].e, LB[0].n, LB[0].y)),
      tambah(idx(SUARA_A1, "pisang,"), ...barisKelompok("b", LB[1].nama, LB[1].e, LB[1].n, LB[1].y)),
      tambah(idx(SUARA_A1, "jeruk."), ...barisKelompok("c", LB[2].nama, LB[2].e, LB[2].n, LB[2].y)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "empat"), jumlahG("a", LB[0].y, "4")), tambah(idx(SUARA_A2, "tujuh"), jumlahG("b", LB[1].y, "7")), tambah(idx(SUARA_A2, "lima"), jumlahG("c", LB[2].y, "5"))),
    k(SUARA_A3, tambah("jawabannya.", ...pilihKata(158, ["Apel", "Pisang", "Jeruk"])), sorotkan("Ketuk", "c2-k")),
    k(SUARA_A4, sorotkan("Pisang", ...ids("eb", 0, 6)), tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("Hebat!", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 19. Latihan 2: membaca turus ------------------------------ */
const YL = 90;
const SUARA_B1 = "Latihan dua. Wei menghitung bola biru dengan turus. Lihat goresannya baik-baik.";
const SUARA_B2 = "Satu kelompok isinya lima goresan. Setelah itu ada tiga goresan tegak lagi.";
const SUARA_B3 = "Pilih jawabannya. Berapa bola biru yang dihitung Wei? Ketuk bilangan yang tepat.";
const SUARA_B4 = "Betul! Lima dan tiga goresan, jadi bola biru ada delapan. Hebat!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: membaca turus",
  sumber: "Materi: latihan membaca turus",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_B1, "goresannya"), namaG("a", YL, "Bola biru"), ...Array.from({ length: 8 }, (_, i) => goresan("a", i, 90, YL)))),
    k(
      SUARA_B2,
      ...gilir(SUARA_B2, [
        ["lima", ids("ta-g", 0, 4)],
        ["tiga", ids("ta-g", 5, 7)],
      ]),
    ),
    k(SUARA_B3, redamkan(0, ...ids("ta-g", 5, 7)), tambah("jawabannya.", ...pilihKata(130, ["7", "8", "9"])), sorotkan("Ketuk", "c2-k")),
    k(SUARA_B4, tambah(idx(SUARA_B4, "delapan"), jumlahG("a", YL, "8", 220)), tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("Hebat!", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 20. Latihan 3: selisih dari tabel ------------------------------ */
const GL: Geo = { x: 40, y: 44, w1: 110, w2: 90, rh: 24, u: 10 };
const SUARA_C1 = "Latihan tiga. Kira menyajikan mainannya dalam tabel. Mari kita baca tabelnya.";
const SUARA_C2 = "Judulnya Mainan Kira. Mobil ada lima. Boneka ada delapan. Bola ada tiga.";
const SUARA_C3 = "Pilih jawabannya. Boneka lebih banyak berapa dari mobil? Ketuk bilangan yang tepat.";
const SUARA_C4 = "Betul! Boneka lebih banyak tiga dari mobil. Itulah selisihnya. Hebat!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: selisih dari tabel",
  sumber: "Materi: latihan selisih",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah(idx(SUARA_C1, "tabel"), ...tabelMenurun("lk", GL, "Mainan Kira", ["Mainan", "Banyak"], ["Mobil", "Boneka", "Bola"]))),
    k(SUARA_C2, tambah(idx(SUARA_C2, "lima"), angkaMenurun("lk", GL, 0, "5")), tambah(idx(SUARA_C2, "delapan"), angkaMenurun("lk", GL, 1, "8")), tambah(idx(SUARA_C2, "tiga"), angkaMenurun("lk", GL, 2, "3"))),
    k(SUARA_C3, tambah("jawabannya.", ...pilihKata(150, ["2", "3", "4"])), sorotkan("Ketuk", "c2-k")),
    k(SUARA_C4, sorotkan("Boneka", "lk-r1a-k", "lk-r1b-k"), sorotkan("mobil.", "lk-r0a-k", "lk-r0b-k"), tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("Hebat!", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 21. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Mengelompokkan berarti mengumpulkan benda yang sejenis, lalu menghitung tiap kelompok.";
const SUARA_Z2 = "Turus membantu kita menghitung. Satu benda satu goresan, dan goresan kelima miring.";
const SUARA_Z3 = "Data bisa ditulis dalam daftar atau tabel. Tabel punya judul, baris, dan kolom. Tabel bisa menurun atau mendatar.";
const SUARA_Z4 = "Dari data, kita bisa tahu yang paling banyak, paling sedikit, dan sama banyak. Kita juga bisa mencari selisih dan jumlah semuanya.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Mengelompokkan", ...kartu("p1", 14, 30, 272, 36, W.hijauMuda, ["mengelompokkan: kumpulkan yang", "sejenis, lalu hitung tiap kelompok"], 9.2))),
    k(SUARA_Z2, tambah("Turus", ...kartu("p2", 14, 72, 272, 36, W.krem, ["turus: satu benda satu goresan,", "goresan kelima miring"], 9.2))),
    k(SUARA_Z3, tambah("Data", ...kartu("p3", 14, 114, 272, 36, W.langit, ["data: daftar atau tabel,", "ada judul, baris, kolom"], 9.2))),
    k(SUARA_Z4, tambah("Dari", ...kartu("p4", 14, 156, 272, 36, W.pink, ["paling banyak, paling sedikit,", "sama banyak, selisih, jumlah"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
