import type { AdeganStory, Obj } from "./logika-story";
import { ANAK_EMO, OWL, W, bagan, benda, bingkai, emo, idBagan, idKartu, judul, kartu, kartuAngka, kotak, petak, pusatSel, tangan, teks, type Titik } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, mundurAksi, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b6C-bantu";

/* ------------------------------ 1. Pilih cara yang mudah ------------------------------ */
const SUARA_C1 = "Kamu sudah tahu tiga cara mengurangi. Menghitung mundur, pasangan bilangan, dan nilai tempat.";
const SUARA_C2 = "Boleh pilih cara yang paling mudah untukmu. Tidak ada cara yang salah, asal hasilnya benar.";
const SUARA_C3 = "Kalau yang pergi hanya sedikit, menghitung mundur terasa cepat. Tujuh belas dikurangi dua sama dengan lima belas.";
const SUARA_C4 = "Kalau yang pergi lebih banyak, pasangan bilangan atau nilai tempat membantu. Sembilan belas dikurangi enam sama dengan tiga belas.";
const SUARA_C5 = "Hasil dari tiga cara selalu sama. Lima belas dikurangi tiga sama dengan dua belas, apa pun cara yang kamu pilih.";
const CARA = ["Mundur", "Pasangan", "Nilai tempat"];
const WARNA3 = [W.hijauMuda, W.pink, W.langit];

export const ADEGAN_PILIH: AdeganStory = {
  id: "pilih-cara",
  judul: "Pilih cara yang mudah",
  sumber: "Materi: pilih cara yang mudah",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Tiga cara mengurangi")),
      tambah("mundur,", ...kartu("cr0", 14, 44, 88, 44, WARNA3[0], [CARA[0]], 10)),
      tambah("pasangan", ...kartu("cr1", 106, 44, 88, 44, WARNA3[1], [CARA[1]], 10)),
      tambah("nilai", ...kartu("cr2", 198, 44, 88, 44, WARNA3[2], [CARA[2]], 9.4)),
    ),
    k(
      SUARA_C2,
      tambah("Boleh", emo("ig", 150, 134, OWL, 40)),
      tambah("pilih", teks("pm", 150, 174, "pilih yang paling mudah", 11, W.ungu)),
    ),
    k(
      SUARA_C3,
      hapus(0, "ig", "pm"),
      sorotkan("menghitung", "cr0-k"),
      tambah("Tujuh", ...kartu("pa", 60, 120, 180, 28, W.krem, ["17 - 2 = 15"], 12)),
    ),
    k(
      SUARA_C4,
      redamkan(0, "cr0-k"),
      hapus(0, ...idKartu("pa")),
      sorotkan("pasangan", "cr1-k"),
      sorotkan("nilai", "cr2-k"),
      tambah("Sembilan", ...kartu("pb", 60, 120, 180, 28, W.krem, ["19 - 6 = 13"], 12)),
    ),
    k(
      SUARA_C5,
      redamkan(0, "cr1-k", "cr2-k"),
      hapus(0, ...idKartu("pb")),
      tambah("Lima", ...kartu("pc", 60, 120, 180, 28, W.emas, ["15 - 3 = 12"], 12)),
      tambah("pilih.", emo("ok", 150, 180, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 2. Keluarga kalimat ------------------------------ */
const SUARA_F1 = "Satu kalimat pengurangan punya keluarga. Lima belas dikurangi tiga sama dengan dua belas.";
const SUARA_F2 = "Tiga bilangan ini satu keluarga. Lima belas, tiga, dan dua belas.";
const SUARA_F3 = "Ada dua kalimat penjumlahan dalam keluarga ini. Dua belas ditambah tiga sama dengan lima belas. Tiga ditambah dua belas sama dengan lima belas.";
const SUARA_F4 = "Ada juga satu kalimat pengurangan lagi. Lima belas dikurangi dua belas sama dengan tiga.";
const SUARA_F5 = "Empat kalimat ini berasal dari tiga bilangan yang sama. Kalau tahu satu kalimat, kita bisa menemukan tiga kalimat lainnya.";
const SUARA_F6 = "Ucapkan lagi mengikuti suara guru. Lima belas dikurangi tiga sama dengan dua belas. Dua belas ditambah tiga sama dengan lima belas.";

export const ADEGAN_KELUARGA: AdeganStory = {
  id: "keluarga-kalimat",
  judul: "Keluarga kalimat",
  sumber: "Materi: keluarga kalimat",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Keluarga kalimat")),
      tambah(idx(SUARA_F1, "Lima"), ...kartu("fa", 14, 40, 130, 28, W.emas, ["15 - 3 = 12"], 11)),
    ),
    k(SUARA_F2, tambah("Tiga", ...bagan("kf", "15", "3", "12", 96))),
    k(
      SUARA_F3,
      hapus(0, ...idBagan("kf")),
      tambah(idx(SUARA_F3, "Dua", 2), ...kartu("fc", 14, 92, 130, 28, W.langit, ["12 + 3 = 15"], 11)),
      tambah(idx(SUARA_F3, "Tiga", 2), ...kartu("fd", 156, 92, 130, 28, W.hijauMuda, ["3 + 12 = 15"], 11)),
    ),
    k(SUARA_F4, tambah(idx(SUARA_F4, "Lima"), ...kartu("fb", 156, 40, 130, 28, W.pink, ["15 - 12 = 3"], 11))),
    k(
      SUARA_F5,
      sorotkan("Empat", "fa-k", "fb-k", "fc-k", "fd-k"),
      tambah("Kalau", emo("ig", 150, 160, OWL, 40)),
    ),
    k(
      SUARA_F6,
      redamkan(0, "fa-k", "fb-k", "fc-k", "fd-k"),
      tambah("Ucapkan", emo("ucap", 150, 190, "\u{1F5E3}", 26)),
      sorotkan("Lima", "fa-k"),
      sorotkan(idx(SUARA_F6, "Dua", 2), "fc-k"),
    ),
  ],
};

/* ------------------------------ 3. Latihan 1: hitung mundur kelereng ------------------------------ */
const SUARA_L1 = "Latihan satu. Halim punya tujuh belas kelereng. Empat kelereng menggelinding pergi. Ketuk empat kelereng yang pergi.";
const SUARA_L2 = "Hitung mundur sambil mengetuk. Enam belas, lima belas, empat belas, tiga belas.";
const SUARA_L3 = "Berapa kelereng Halim sekarang? Pilih jawabannya. Ada dua belas, tiga belas, atau empat belas.";
const SUARA_L4 = "Betul, tiga belas! Tujuh belas dikurangi empat sama dengan tiga belas. Hebat sekali!";
const PL: Titik[] = petak(17, 6, 40, 70, 44, 34);
const pilihan = (y: number, isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 80, 34, 20));

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: hitung mundur kelereng",
  sumber: "Materi: latihan hitung mundur",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("tujuh", ...kartu("lt", 100, 28, 100, 20, W.krem, ["17 kelereng"], 9.4)),
      tambah("kelereng.", ...PL.flatMap((p, i) => benda("kelereng", `ly${i}`, p.x, p.y, 9, i))),
      sorotkan("Empat@2", "ly13", "ly14", "ly15", "ly16"),
      tambah("Ketuk", tangan(216, 164)),
    ),
    k(SUARA_L2, hapus(0, "tg", ...idKartu("lt")), ...mundurAksi(SUARA_L2, "ly", PL, 4)),
    k(
      SUARA_L3,
      tambah("Berapa", ...pilihan(156, ["12", "13", "14"])),
      sorotkan(idx(SUARA_L3, "tiga"), "c2-k"),
    ),
    k(
      SUARA_L4,
      hapus(0, ...["c1", "c2", "c3"].flatMap((c) => [`${c}-k`, `${c}-t`])),
      tambah("Betul,", emo("ok", 262, 170, "✅", 28)),
      tambah("Tujuh", ...kartu("lj", 40, 160, 180, 28, W.emas, ["17 - 4 = 13"], 12)),
      tambah("Hebat", emo("ow", 262, 140, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 2: kotak sepuluh dan bolu ------------------------------ */
const SUARA_D1 = "Latihan dua. Ada sembilan belas bolu kukus. Sepuluh bolu di kotak, sembilan bolu lepas.";
const SUARA_D2 = "Malosi memakan enam bolu lepas. Seret enam bolu ke perut Malosi. Satu, dua, tiga, empat, lima, enam.";
const SUARA_D3 = "Kotak sepuluh tidak disentuh. Bolu lepas tinggal tiga, sebab sembilan dikurangi enam sama dengan tiga.";
const SUARA_D4 = "Sepuluh ditambah tiga sama dengan tiga belas. Jadi sembilan belas dikurangi enam sama dengan tiga belas.";
const SUARA_D5 = "Betul! Sisa bolu kukus ada tiga belas. Kamu hebat!";
const DX = 85;
const DY = 40;
const LD: Titik[] = Array.from({ length: 9 }, (_, i) => ({ x: 30 + i * 30, y: 116 }));
const MAKAN: Titik[] = Array.from({ length: 6 }, (_, i) => ({ x: 105 + i * 20, y: 152 }));

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kotak sepuluh dan bolu",
  sumber: "Materi: latihan kotak sepuluh",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Latihan 2")),
      tambah("sembilan", teks("lb", 42, 66, "19 bolu", 11, W.ungu)),
      tambah("Sepuluh", teks("d10", 150, 102, "10", 11, W.merah), ...bingkai("db", DX, DY), ...Array.from({ length: 10 }, (_, i) => benda("bolu", `lb${i}`, pusatSel(i, DX, DY).x, pusatSel(i, DX, DY).y, 9)).flat()),
      tambah(idx(SUARA_D1, "sembilan", 2), ...LD.flatMap((p, i) => benda("bolu", `lb${10 + i}`, p.x, p.y, 9))),
    ),
    k(
      SUARA_D2,
      tambah("Malosi", emo("a-Malosi", 150, 186, ANAK_EMO, 28), teks("n-Malosi", 196, 190, "Malosi", 8.6)),
      ...urutBilangan(SUARA_D2, 1, 6, "perut").map((p, i) => ubah(p, { id: `lb${10 + i}`, x: MAKAN[i].x, y: MAKAN[i].y })),
    ),
    k(
      SUARA_D3,
      sorotkan("Kotak", ...Array.from({ length: 10 }, (_, i) => `db-c${i}`)),
      sorotkan("tinggal", "lb16", "lb17", "lb18"),
      tambah("sembilan", ...kartu("d3", 226, 52, 68, 22, W.krem, ["9 - 6 = 3"], 9)),
    ),
    k(
      SUARA_D4,
      redamkan(0, ...Array.from({ length: 10 }, (_, i) => `db-c${i}`), "lb16", "lb17", "lb18"),
      hapus(0, ...idKartu("d3")),
      tambah("Sepuluh", ...kartu("d4", 226, 52, 68, 22, W.langit, ["10 + 3 = 13"], 9)),
      tambah("Jadi", ...kartu("d5", 226, 82, 68, 22, W.emas, ["19 - 6 = 13"], 9)),
    ),
    k(
      SUARA_D5,
      sorotkan("Sisa", "d5-k"),
      tambah("Betul!", emo("ok", 262, 140, "✅", 26)),
      tambah("Kamu", emo("ow", 262, 186, OWL, 26)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 3: isi tabel puluhan dan satuan ------------------------------ */
const SUARA_T1 = "Latihan tiga. Isi tabel untuk delapan belas apel, dan empat apel pergi. Lihat kotak puluhan dan satuan.";
const SUARA_T2 = "Satuan dulu. Delapan dikurangi empat sama dengan empat. Ketuk angka empat.";
const SUARA_T3 = "Sekarang puluhan. Puluhannya tidak berubah, tetap satu. Ketuk angka satu.";
const SUARA_T4 = "Satu puluhan dan empat satuan dibaca empat belas. Jadi delapan belas dikurangi empat sama dengan empat belas. Hebat!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: isi tabel puluhan dan satuan",
  sumber: "Materi: latihan tabel nilai tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Latihan 3")),
      tambah("delapan", teks("ta", 150, 42, "18 - 4 = ?", 16, W.ungu)),
      tambah("kotak", teks("thp", 100, 62, "puluhan", 10, W.ungu), teks("ths", 200, 62, "satuan", 10, W.ungu), kotak("tkp", 60, 68, 80, 46, W.krem, W.biru, { rx: 6 }), kotak("tks", 160, 68, 80, 46, W.langit, W.biru, { rx: 6 }), teks("tdp", 100, 102, "?", 22, W.merah), teks("tds", 200, 102, "?", 22, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("Satuan", ...pilihan(130, ["3", "4", "5"])),
      sorotkan("Ketuk", "c2-k"),
      ubah(idx(SUARA_T2, "empat", 3), { id: "tds", isi: "4" }),
    ),
    k(
      SUARA_T3,
      hapus(0, ...["c1", "c2", "c3"].flatMap((c) => [`${c}-k`, `${c}-t`])),
      tambah("Sekarang", ...pilihan(130, ["0", "1", "2"])),
      sorotkan("Ketuk", "c2-k"),
      ubah(idx(SUARA_T3, "satu", 2), { id: "tdp", isi: "1" }),
    ),
    k(
      SUARA_T4,
      hapus(0, ...["c1", "c2", "c3"].flatMap((c) => [`${c}-k`, `${c}-t`])),
      ubah("Jadi", { id: "ta", isi: "18 - 4 = 14" }),
      tambah("Satu", ...kartu("tj", 60, 140, 180, 28, W.emas, ["14 = 10 + 4"], 10)),
      tambah("Hebat!", emo("ok", 262, 186, "✅", 28), emo("ow", 38, 186, OWL, 28)),
    ),
  ],
};

/* ------------------------------ 6. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Mengurangi artinya ada benda yang pergi, lalu kita cari sisanya.";
const SUARA_Z2 = "Kita punya tiga cara. Menghitung mundur, pasangan bilangan, dan nilai tempat.";
const SUARA_Z3 = "Kita juga bisa memeriksa hasilnya dengan menambah. Dua belas ditambah tiga sama dengan lima belas, jadi lima belas dikurangi tiga sama dengan dua belas.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Mengurangi", ...kartu("z1", 14, 34, 272, 30, W.hijauMuda, ["ada yang pergi, cari sisanya"], 9.6))),
    k(
      SUARA_Z2,
      tambah("Menghitung", ...kartu("z2", 14, 70, 272, 30, W.langit, ["hitung mundur"], 9.6)),
      tambah("pasangan", ...kartu("z3", 14, 104, 272, 30, W.krem, ["pasangan bilangan"], 9.6)),
      tambah("nilai", ...kartu("z4", 14, 138, 272, 30, W.pink, ["nilai tempat: puluhan dan satuan"], 9.6)),
    ),
    k(SUARA_Z3, tambah("memeriksa", ...kartu("z5", 14, 172, 272, 26, W.emas, ["periksa: 12 + 3 = 15"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
