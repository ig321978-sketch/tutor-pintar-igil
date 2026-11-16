import type { AdeganStory } from "./logika-story";
import type { Obj } from "./logika-story";
import { LATIHAN_2, W, barisNT, digit3, emo, isiSel, judul, kartu, kepalaNT, tandaAmbil, tandaPendek, teks } from "./k4b1f-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b1f-bantu";

/** Nomor kata terakhir dalam kalimat suara (pemicu untuk gambar penutup ketukan). */
const akhir = (suara: string): number => suara.split(/\s+/).filter(Boolean).length - 1;

/* ------------------------------ 4. Dua kali mengambil: 253 dikurangi 176 (Buku Siswa hlm. 36; Panduan Guru hlm. 56) ------------------------------ */
const SUARA_C1 = "Contoh ketiga, dua kali mengambil: dua ratus lima puluh tiga dikurangi seratus tujuh puluh enam. Uraikan: dua ratus ditambah lima puluh ditambah tiga, dikurangi seratus ditambah tujuh puluh ditambah enam.";
const SUARA_C2 = "Satuan: tiga kurang dari enam, jadi mengambil satu puluhan. Lima puluh diuraikan menjadi empat puluh ditambah sepuluh. Tiga belas dikurangi enam sama dengan tujuh.";
const SUARA_C3 = "Puluhan: tinggal empat puluh, lebih kecil dari tujuh puluh. Maka empat puluh mengambil satu ratusan.";
const SUARA_C4 = "Uraikan dua ratus menjadi seratus ditambah seratus. Seratus ditambah empat puluh sama dengan seratus empat puluh, dikurangi tujuh puluh sama dengan tujuh puluh.";
const SUARA_C5 = "Ratusan: seratus dikurangi seratus sama dengan nol. Hasilnya tujuh puluh ditambah tujuh, yaitu tujuh puluh tujuh. Jadi dua ratus lima puluh tiga dikurangi seratus tujuh puluh enam sama dengan tujuh puluh tujuh.";

export const ADEGAN_DUA_KALI: AdeganStory = {
  id: "dua-kali-mengambil",
  judul: "Susun panjang dengan dua kali mengambil",
  sumber: "Materi: mengambil dua kali",
  latar: "#FFF7ED",
  kutipan: [
    "Pengurangan cara susun panjang dengan dua kali mengambil",
    "Karena 3 < 6 maka 1 harus mengambil 1 puluhan pada nilai tempat bilangan puluhan",
    "Uraikan 50 menjadi 40 + 10",
    "(10 + 3) – 6 = 7, letakkan 7 pada nilai tempat satuan.",
    "Karena 40 < 70 maka 40 harus mengambil 1 ratusan pada nilai tempat bilangan ratusan",
    "Uraikan 200 menjadi 100 + 100",
    "(100 + 40) – 70 = 70, letakkan 70 pada nilai tempat puluhan.",
    "Selanjutnya lakukan pengurangan nilai tempat ratusan",
    "Jadi 253 – 176 = 70 + 7 = 77",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Dua kali mengambil")),
      tambah("Contoh", ...kartu("c0", 70, 28, 160, 26, W.emas, ["253 − 176 = ?"], 11.4)),
      tambah("Uraikan:", teks("c1", 30, 90, "253 = 200 + 50 + 3", 12, W.biru, { anchor: "start" })),
      tambah("dikurangi@2", teks("c2", 30, 124, "176 = 100 + 70 + 6", 12, W.biru, { anchor: "start" }), teks("c2m", 262, 124, "−", 16, W.biru)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Satuan mengambil dari puluhan")),
      tambah(0, teks("c1", 30, 50, "253 = 200 + (40 + 10) + 3", 11.4, W.biru, { anchor: "start" }), teks("c2", 30, 74, "176 = 100 + 70 + 6", 11.4, W.biru, { anchor: "start" })),
      tambah("Satuan:", ...kartu("c3", 20, 90, 260, 28, W.merahMuda, ["3 < 6: mengambil 1 puluhan"], 10)),
      tambah("Uraikan", ...kartu("c4", 20, 126, 260, 22, W.krem, ["50 menjadi 40 + 10"], 9.6)),
      tambah("Sepuluh", teks("c5", 150, 166, "(10 + 3) − 6 = 7", 12, W.biru)),
      tambah("belas", teks("c6", 150, 188, "13 − 6 = 7", 12, W.hijau)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Puluhan: empat puluh kurang tujuh puluh")),
      tambah(0, teks("c7", 150, 56, "253 = 200 + 40 + 13", 12, W.biru)),
      tambah("tinggal", ...kartu("c8", 40, 76, 220, 34, W.langit, ["puluhan tinggal 40"], 10.6)),
      tambah("lebih", ...kartu("c9", 40, 118, 220, 34, W.merahMuda, ["40 < 70: tidak bisa dikurangi"], 10)),
      tambah("mengambil", ...kartu("c10", 40, 158, 220, 30, W.emas, ["40 mengambil 1 ratusan"], 10.4)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Ratusan mengambil: seratus empat puluh")),
      tambah("Uraikan", teks("c11", 150, 46, "200 = 100 + 100", 13, W.biru)),
      tambah(idx(SUARA_C4, "seratus", 3), teks("c12", 150, 72, "253 = 100 + (100 + 40) + 13", 11, W.biru)),
      tambah("sama@1", teks("c13", 150, 98, "100 + 40 = 140", 12.4, W.biru)),
      tambah("dikurangi@1", teks("c14", 150, 122, "(100 + 40) − 70 = 70", 12.4, W.biru)),
      tambah("dengan@2", teks("c15", 150, 146, "140 − 70 = 70", 13, W.hijau)),
      tambah(akhir(SUARA_C4), ...kartu("c16", 40, 160, 220, 28, W.hijauMuda, ["70 di nilai tempat puluhan"], 10)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Hasil dua kali mengambil")),
      tambah("Ratusan:", teks("c16", 150, 50, "100 − 100 = 0", 13, W.hijau)),
      tambah("Hasilnya", teks("c17", 150, 84, "70 + 7 = 77", 13, W.hijau)),
      tambah("Jadi", ...kartu("c18", 40, 106, 220, 38, W.emas, ["253 − 176 = 77"], 14)),
      tambah(akhir(SUARA_C5), emo("c19", 150, 176, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 5. Susun pendek dengan mengambil: 241 dikurangi 175 (Buku Siswa hlm. 36; Panduan Guru hlm. 56) ------------------------------ */
const SUARA_D1 = "Susun pendek dengan mengambil: dua ratus empat puluh satu dikurangi seratus tujuh puluh lima, ditulis pada tabel ratusan, puluhan, satuan.";
const SUARA_D2 = "Mulai dari satuan. Satu lebih kecil dari lima, jadi ambil satu puluhan: satuan menjadi sebelas. Sebelas dikurangi lima sama dengan enam.";
const SUARA_D3 = "Puluhan: empat puluhan diambil satu, sisa tiga puluhan. Tiga puluhan kurang dari tujuh puluhan, jadi ambil satu ratusan, menjadi tiga belas. Tiga belas dikurangi tujuh sama dengan enam.";
const SUARA_D4 = "Ratusan: dua ratusan diambil satu, sisa satu ratusan. Satu dikurangi satu sama dengan nol, tidak ditulis. Jadi hasilnya enam puluh enam.";
const SUARA_D5 = "Perhatikan angka merah di atas tabel adalah sisa setelah mengambil: satu, tiga, dan sebelas. Untuk dikurangi tujuh, puluhan tiga itu dihitung tiga belas.";

const TX = 84;
const TY = 50;
/** Tabel susun pendek 241 dikurangi 175 pada posisi bersama: kepala `ph`, baris `pr0` (241), `pr1` (175), `pr2` (hasil kosong, diisi `isiSel`). */
const dasarPendek = (): Obj[] => [
  ...kepalaNT("ph", TX, TY, 44, 15, 7.4),
  ...barisNT("pr0", TX, TY + 15, ["2", "4", "1"], 44, 22, 12),
  ...barisNT("pr1", TX, TY + 37, ["1", "7", "5"], 44, 22, 12),
  ...barisNT("pr2", TX, TY + 59, ["", "", ""], 44, 22, 12),
];
const hasilP = (c: number, isi: string, o = {}) => isiSel("pr2", TX, TY + 59, c, isi, 44, 22, 12, W.hijau, o);
const minP = () => teks("pmin", TX + 3 * 44 + 9, TY + 15 + 40, "−", 16, W.biru);

export const ADEGAN_PENDEK: AdeganStory = {
  id: "pendek-mengambil",
  judul: "Susun pendek dengan mengambil",
  sumber: "Materi: susun pendek mengambil",
  latar: "#F0FDF4",
  kutipan: [
    "Pengurangan cara susun pendek dengan mengambil",
    "Kurangkan ratusan.",
    "2 ratusan sudah diambil 1 ratusan sisa 1 ratusan. 1 – 1 = 0 (boleh tidak ditulis)",
    "1 < 5, ambil 1 puluhan menjadi 11. 11 – 5 = 6",
    "Kurangkan puluhan.",
    "3 puluhan < 7 puluhan, ambil 1 ratusan menjadi 13. 13 – 7 = 6",
    "Jadi 241 – 175 = 66",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Susun pendek: 241 − 175")),
      tambah("Susun", ...kartu("pk", 70, 25, 160, 19, W.emas, ["241 − 175 = ?"], 9.4)),
      tambah("ditulis", ...dasarPendek(), minP()),
      tambah("tabel", teks("pq", 150, 168, "mulai dari kolom satuan", 10, W.coklat)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Satuan: ambil satu puluhan"), ...dasarPendek(), minP()),
      tambah(idx(SUARA_D2, "sebelas", 1), ...tandaAmbil("pm", TX, TY - 5, ["", "", "11"], 44, 11)),
      sorotkan(idx(SUARA_D2, "satu", 1), "pr0-s2", "pr1-s2"),
      tambah(idx(SUARA_D2, "sebelas", 2), teks("pe", 150, 168, "11 − 5 = 6", 13, W.hijau)),
      tambah("enam.", hasilP(2, "6")),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Puluhan: ambil satu ratusan"), ...dasarPendek(), minP(), hasilP(2, "6"), ...tandaAmbil("pm", TX, TY - 5, ["", "", "11"], 44, 11)),
      tambah("sisa", ...tandaAmbil("pn", TX, TY - 5, ["", "3", ""], 44, 11)),
      sorotkan(idx(SUARA_D3, "tiga", 2), "pr0-s1", "pr1-s1"),
      tambah(idx(SUARA_D3, "tiga", 4), teks("pe", 150, 168, "13 − 7 = 6", 13, W.hijau)),
      tambah("enam.", hasilP(1, "6")),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Ratusan: satu dikurangi satu"), ...dasarPendek(), minP(), hasilP(2, "6"), hasilP(1, "6"), ...tandaAmbil("pm", TX, TY - 5, ["", "3", "11"], 44, 11)),
      tambah(idx(SUARA_D4, "sisa", 1), ...tandaAmbil("po", TX, TY - 5, ["1", "", ""], 44, 11)),
      tambah("nol,", hasilP(0, "0", { op: 0.45 })),
      tambah("Jadi", ...kartu("pf", 50, 158, 200, 30, W.emas, ["241 − 175 = 66"], 13)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Perhatikan angka merah")),
      tambah("Perhatikan", ...tandaAmbil("pm", TX, 52, ["1", "3", "11"], 44, 14)),
      tambah("sisa", ...kartu("pg", 20, 66, 260, 30, W.krem, ["merah: sisa setelah mengambil"], 9.8)),
      tambah("tujuh,", ...kartu("ph1", 20, 108, 260, 30, W.langit, ["untuk dikurangi 7: puluhan 3"], 9.8)),
      tambah("dihitung", ...kartu("ph2", 20, 148, 260, 30, W.hijauMuda, ["dihitung sebagai 13"], 11)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Berlatih 1: susun panjang (Buku Siswa hlm. 37; Panduan Guru hlm. 56) ------------------------------ */
const SUARA_E1 = "Latihan satu, susun panjang. Soal a: enam ratus tiga puluh tiga dikurangi dua ratus sebelas. Hasilnya empat ratus ditambah dua puluh ditambah dua, yaitu empat ratus dua puluh dua.";
const SUARA_E2 = "Soal b: delapan ratus tujuh puluh sembilan dikurangi empat ratus tiga puluh enam. Delapan ratus kurang empat ratus, empat ratus. Tujuh puluh kurang tiga puluh, empat puluh. Sembilan kurang enam, tiga. Hasilnya empat ratus empat puluh tiga.";
const SUARA_E3 = "Soal c: lima ratus dua puluh dua dikurangi seratus empat puluh delapan. Satuan dan puluhan mengambil, jadi lima ratus dua puluh dua diuraikan: empat ratus ditambah seratus sepuluh ditambah dua belas.";
const SUARA_E4 = "Kurangkan tiap bagian: empat ratus dikurangi seratus sama dengan tiga ratus, seratus sepuluh dikurangi empat puluh sama dengan tujuh puluh, dua belas dikurangi delapan sama dengan empat. Hasilnya tiga ratus tujuh puluh empat.";
const SUARA_E5 = "Soal d: tiga ratus enam puluh tujuh dikurangi dua ratus delapan puluh sembilan. Diuraikan: dua ratus ditambah seratus lima puluh ditambah tujuh belas. Hasilnya nol ditambah tujuh puluh ditambah delapan, yaitu tujuh puluh delapan.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Latihan 1: cara susun panjang",
  sumber: "Materi: latihan susun panjang",
  latar: "#EFF6FF",
  kutipan: [
    "Kerjakan soal berikut pada buku tulis kalian.",
    "1. Gunakan cara susun panjang untuk pengurangan berikut!",
    "= 400 + 20 + 2",
    "= 300 + 70 + 4",
    "= (400 – 100) + (110 – 40) + (12 – 8)",
    "= (200 – 200) + (150 – 80) + (17 – 9)",
    "= 00 + 70 + 8",
    "= 78",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Latihan 1a: 633 − 211")),
      tambah("Soal", teks("e1", 30, 52, "633 = 600 + 30 + 3", 12, W.biru, { anchor: "start" }), teks("e2", 30, 76, "211 = 200 + 10 + 1", 12, W.biru, { anchor: "start" }), teks("e2m", 262, 76, "−", 16, W.biru)),
      tambah("Hasilnya", teks("e3", 30, 118, "400 + 20 + 2 = 422", 12.4, W.hijau, { anchor: "start" })),
      tambah("yaitu", ...kartu("e4", 50, 140, 200, 34, W.emas, ["633 − 211 = 422"], 13)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Latihan 1b: 879 − 436")),
      tambah(0, teks("e5", 30, 46, "879 = 800 + 70 + 9", 12, W.biru, { anchor: "start" }), teks("e6", 30, 68, "436 = 400 + 30 + 6", 12, W.biru, { anchor: "start" }), teks("e6m", 262, 68, "−", 16, W.biru)),
      tambah("Delapan@2", teks("e7", 150, 100, "800 − 400 = 400", 12, W.hijau)),
      tambah("tujuh@2", teks("e8", 150, 122, "70 − 30 = 40", 12, W.hijau)),
      tambah("sembilan@2", teks("e9", 150, 144, "9 − 6 = 3", 12, W.hijau)),
      tambah("Hasilnya", ...kartu("e10", 40, 156, 220, 30, W.emas, ["400 + 40 + 3 = 443"], 12.4)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Latihan 1c: 522 − 148")),
      tambah("Soal", teks("e11", 30, 52, "522 = 500 + 20 + 2", 12, W.biru, { anchor: "start" }), teks("e12", 30, 76, "148 = 100 + 40 + 8", 12, W.biru, { anchor: "start" }), teks("e12m", 262, 76, "−", 16, W.biru)),
      tambah("mengambil", ...kartu("e13", 20, 96, 260, 28, W.merahMuda, ["satuan dan puluhan mengambil"], 10)),
      tambah("diuraikan", teks("e14", 150, 150, "522 = 400 + 110 + 12", 13, W.ungu), ...kartu("e15", 30, 160, 240, 28, W.krem, ["400 + 110 + 12 = 522"], 10)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Latihan 1c: kurangkan tiap bagian")),
      tambah("Kurangkan", teks("e16", 150, 52, "(400 − 100) + (110 − 40) + (12 − 8)", 10.2, W.biru)),
      tambah("sama@1", teks("e17", 150, 84, "400 − 100 = 300", 11.4, W.hijau)),
      tambah("sama@2", teks("e18", 150, 106, "110 − 40 = 70", 11.4, W.hijau)),
      tambah("sama@3", teks("e19", 150, 128, "12 − 8 = 4", 11.4, W.hijau)),
      tambah("Hasilnya", ...kartu("e20", 40, 146, 220, 34, W.emas, ["300 + 70 + 4 = 374"], 12.4)),
    ),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, judul("Latihan 1d: 367 − 289")),
      tambah("Soal", teks("e21", 30, 44, "367 = 200 + 150 + 17", 11.4, W.biru, { anchor: "start" }), teks("e22", 30, 64, "289 = 200 + 80 + 9", 11.4, W.biru, { anchor: "start" }), teks("e22m", 262, 64, "−", 16, W.biru)),
      tambah("Uraikan", teks("e23", 150, 94, "(200 − 200) + (150 − 80) + (17 − 9)", 10.2, W.biru)),
      tambah("Hasilnya", teks("e24", 150, 122, "0 + 70 + 8 = 78", 13, W.hijau)),
      tambah("yaitu", ...kartu("e25", 50, 146, 200, 34, W.emas, ["367 − 289 = 78"], 13)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih 2: susun pendek (Buku Siswa hlm. 37-38; Panduan Guru hlm. 57) ------------------------------ */
const SUARA_F1 = "Latihan dua, susun pendek. Ada empat soal pengurangan. Kita kerjakan dengan tabel ratusan, puluhan, satuan, satu per satu.";
const SUARA_F2 = "Soal a: lima ratus tujuh puluh tiga dikurangi dua ratus enam puluh delapan. Satuan mengambil, menjadi tiga belas, dikurangi delapan sama dengan lima. Puluhan tinggal enam, dikurangi enam sama dengan nol. Ratusan lima dikurangi dua sama dengan tiga.";
const SUARA_F3 = "Soal b: empat ratus dua puluh dua dikurangi seratus empat puluh enam. Satuan menjadi dua belas, dikurangi enam sama dengan enam. Puluhan menjadi sebelas, dikurangi empat sama dengan tujuh. Ratusan tiga kurang satu sama dengan dua.";
const SUARA_F5 = "Soal c: enam ratus dua puluh tiga dikurangi dua ratus sembilan puluh dua. Satuan cukup. Puluhan mengambil menjadi dua belas, dikurangi sembilan sama dengan tiga. Ratusan tinggal lima, dikurangi dua sama dengan tiga.";
const SUARA_F6 = "Soal d: tiga ratus empat puluh empat dikurangi dua ratus tujuh puluh sembilan. Satuan menjadi empat belas, dikurangi sembilan sama dengan lima. Puluhan menjadi tiga belas, dikurangi tujuh sama dengan enam. Ratusan dua dikurangi dua sama dengan nol.";

/** Tabel susun pendek satu soal Ayo Berlatih 2: kepala, baris bilangan, baris pengurang, baris hasil kosong, tanda minus; penanda mengambil dan isi hasil dipanggil terpisah. */
function soalPendek(id: string, a: number, b: number) {
  const da = digit3(a).map(String);
  const db = digit3(b).map(String);
  const dh = digit3(a - b).map(String);
  const dasar = [...kepalaNT(`${id}h`, TX, TY, 44, 15, 7.4), ...barisNT(`${id}r0`, TX, TY + 15, da, 44, 22, 12), ...barisNT(`${id}r1`, TX, TY + 37, db, 44, 22, 12), ...barisNT(`${id}r2`, TX, TY + 59, ["", "", ""], 44, 22, 12), teks(`${id}-min`, TX + 3 * 44 + 9, TY + 55, "−", 16, W.biru)];
  const tanda = tandaAmbil(`${id}m`, TX, TY - 5, tandaPendek(a, b), 44, 11);
  return {
    dasar,
    tanda: (c: number) => tanda.filter((o) => o.id === `${id}m-m${c}`),
    hasil: (c: number) => isiSel(`${id}r2`, TX, TY + 59, c, dh[c], 44, 22, 12),
    persamaan: (y = 160) => teks(`${id}-eq`, 150, y, `${a} − ${b} = ${a - b}`, 13, W.hijau),
  };
}
const PA = soalPendek("q", LATIHAN_2[0][0], LATIHAN_2[0][1]);
const PB = soalPendek("q", LATIHAN_2[1][0], LATIHAN_2[1][1]);
const PC = soalPendek("q", LATIHAN_2[2][0], LATIHAN_2[2][1]);
const PD = soalPendek("q", LATIHAN_2[3][0], LATIHAN_2[3][1]);

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "berlatih-dua",
  judul: "Latihan 2: cara susun pendek",
  sumber: "Materi: latihan susun pendek",
  latar: "#FFF7ED",
  kutipan: [
    "2. Gunakan cara susun pendek untuk penjumlahan berikut!",
    "a. 573 – 268 = 305",
    "b. 422 – 146 = …..",
    "c. 623 – 292 = …..",
    "d. 344 – 279 = …..",
    "Ratusan Puluhan Satuan",
  ],
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Latihan 2: susun pendek")),
      tambah("Latihan", ...kartu("f1", 20, 32, 260, 34, W.merahMuda, ["soal a sampai d: pengurangan"], 10.4)),
      tambah("empat", ...kartu("f2", 20, 78, 260, 34, W.krem, ["tabel ratusan, puluhan, satuan"], 10.4)),
      tambah("satu@2", ...kartu("f3", 20, 124, 260, 34, W.hijauMuda, ["kerjakan satu per satu"], 10.4)),
      tambah("kerjakan@1", emo("f4", 150, 188, "📝", 18)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Latihan 2a: 573 − 268"), ...PA.dasar),
      tambah("Satuan", ...PA.tanda(2)),
      tambah(idx(SUARA_F2, "lima", 2), PA.hasil(2)),
      tambah("Puluhan", ...PA.tanda(1)),
      tambah("nol.", PA.hasil(1)),
      tambah("Ratusan", PA.hasil(0)),
      tambah(akhir(SUARA_F2), PA.persamaan(158)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Latihan 2b: 422 − 146"), ...PB.dasar),
      tambah("Satuan", ...PB.tanda(2)),
      tambah(idx(SUARA_F3, "enam", 3), PB.hasil(2)),
      tambah("Puluhan", ...PB.tanda(1), ...PB.tanda(0)),
      tambah("tujuh.", PB.hasil(1)),
      tambah("Ratusan", PB.hasil(0)),
      tambah(akhir(SUARA_F3), PB.persamaan(158)),
    ),
    k(
      SUARA_F5,
      bersih(0),
      tambah(0, judul("Latihan 2c: 623 − 292"), ...PC.dasar),
      tambah("cukup.", PC.hasil(2)),
      tambah("Puluhan", ...PC.tanda(1), ...PC.tanda(0)),
      tambah(idx(SUARA_F5, "tiga", 2), PC.hasil(1)),
      tambah("Ratusan", PC.hasil(0)),
      tambah(akhir(SUARA_F5), PC.persamaan(158)),
    ),
    k(
      SUARA_F6,
      bersih(0),
      tambah(0, judul("Latihan 2d: 344 − 279"), ...PD.dasar),
      tambah("Satuan", ...PD.tanda(2)),
      tambah("lima.", PD.hasil(2)),
      tambah("Puluhan", ...PD.tanda(1), ...PD.tanda(0)),
      tambah("enam.", PD.hasil(1)),
      tambah("Ratusan", PD.hasil(0)),
      tambah(akhir(SUARA_F6), PD.persamaan(158)),
    ),
  ],
};

