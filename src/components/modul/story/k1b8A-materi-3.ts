import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BURUNG, EMO_KELINCI, EMO_KUCING, OWL, W, angkaMendatar, angkaMenurun, bendaDi, emo, jumlahG, judul, kartu, namaG, tabelMendatar, tabelMenurun, teks, type Geo } from "./k1b8A-gambar";
import { gilir, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k1b8A-bantu";

/* ------------------------------ 8. Tabel menurun: bola Upe ------------------------------ */
const GM: Geo = { x: 30, y: 46, w1: 120, w2: 100, rh: 26, u: 10 };
const WARNA = ["Merah", "Kuning", "Hijau"];
const BANYAK = [7, 4, 6];
const NAMA_TABEL = "Tabel Bola Upe";

const SUARA_M1 = "Data bola Upe bisa kita sajikan dalam tabel. Tabel membuat data tersusun rapi.";
const SUARA_M2 = "Bagian paling atas adalah judul tabel. Judul memberi tahu kita tentang apa data itu.";
const SUARA_M3 = "Baris berjalan ke samping. Ini baris merah. Baris itu berisi warna merah dan banyaknya.";
const SUARA_M4 = "Kolom berjalan ke bawah. Ini kolom warna. Kolom itu berisi merah, kuning, dan hijau.";
const SUARA_M5 = "Sekarang kita isi tabelnya. Merah ada tujuh. Kuning ada empat. Hijau ada enam.";
const SUARA_M6 = "Baca tabelnya. Judulnya Tabel Bola Upe. Yang didata adalah warna bola. Banyaknya ada di kolom banyak.";
const SUARA_M7 = "Tabel ini bentuknya menurun, karena nama warna ada di bawah satu sama lain.";

export const ADEGAN_TABEL_MENURUN: AdeganStory = {
  id: "tabel-menurun",
  judul: "Tabel menurun: baris, kolom, dan judul",
  sumber: "Materi: tabel, baris, kolom, judul",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Tabel")), tambah(idx(SUARA_M1, "tabel."), ...tabelMenurun("tm", GM, NAMA_TABEL, ["Warna", "Banyak"], WARNA))),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "judul"), "tm-jd")),
    k(SUARA_M3, redamkan(0, "tm-jd"), sorotkan(idx(SUARA_M3, "Ini"), "tm-r0a-k", "tm-r0b-k"), tambah(idx(SUARA_M3, "samping"), emo("pb", 272, 86, "➡️", 22))),
    k(SUARA_M4, redamkan(0, "tm-r0a-k", "tm-r0b-k"), hapus(0, "pb"), sorotkan(idx(SUARA_M4, "Ini"), "tm-h0-k", "tm-r0a-k", "tm-r1a-k", "tm-r2a-k"), tambah(idx(SUARA_M4, "bawah"), emo("pk", 272, 110, "⬇️", 22))),
    k(SUARA_M5, redamkan(0, "tm-h0-k", "tm-r0a-k", "tm-r1a-k", "tm-r2a-k"), hapus(0, "pk"), ...BANYAK.map((n, r) => tambah(idx(SUARA_M5, ["tujuh", "empat", "enam"][r]), angkaMenurun("tm", GM, r, String(n))))),
    k(
      SUARA_M6,
      ...gilir(SUARA_M6, [
        ["Judulnya", ["tm-jd"]],
        ["didata", ["tm-h0-k"]],
        ["Banyaknya", ["tm-h1-k"]],
      ]),
    ),
    k(SUARA_M7, redamkan(0, "tm-h1-k"), tambah(idx(SUARA_M7, "menurun,"), emo("ar", 272, 100, "⬇️", 30)), tambah("karena", ...kartu("sm", 50, 160, 200, 28, W.krem, ["tabel menurun"], 11))),
  ],
};

/* ------------------------------ 9. Tabel mendatar ------------------------------ */
const G1: Geo = { x: 10, y: 44, w1: 62, w2: 52, rh: 20, u: 8.6 };
const G2: Geo = { x: 140, y: 44, w1: 44, w2: 38, rh: 20, u: 8.4 };
const SUARA_D1 = "Ini tabel bola Upe yang tadi. Bentuknya menurun, nama warna ada di bawah satu sama lain.";
const SUARA_D2 = "Kita bisa menyajikan data yang sama dalam bentuk mendatar. Nama warna berjajar ke samping.";
const SUARA_D3 = "Sekarang isi tabel mendatar. Merah ada tujuh. Kuning ada empat. Hijau ada enam.";
const SUARA_D4 = "Bandingkan kedua tabel. Merah tujuh, kuning empat, hijau enam. Datanya sama persis.";
const SUARA_D5 = "Tabel menurun dan tabel mendatar memuat data yang sama. Yang berbeda hanya bentuknya.";
const SUARA_D6 = "Pilih: tabel yang namanya berjajar ke samping adalah tabel apa? Ketuk kartu mendatar.";
const SUARA_D7 = "Betul! Nama warna berjajar ke samping, itu tabel mendatar. Hebat!";

export const ADEGAN_TABEL_MENDATAR: AdeganStory = {
  id: "tabel-mendatar",
  judul: "Tabel menurun dan tabel mendatar",
  sumber: "Materi: tabel menurun dan mendatar",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Dua bentuk tabel")), tambah(idx(SUARA_D1, "tabel"), ...tabelMenurun("tm", G1, "Menurun", ["Warna", "Banyak"], WARNA)), ...BANYAK.map((n, r) => tambah(idx(SUARA_D1, "bawah"), angkaMenurun("tm", G1, r, String(n))))),
    k(SUARA_D2, tambah(idx(SUARA_D2, "mendatar."), ...tabelMendatar("td", G2, "Mendatar", ["Warna", "Banyak"], WARNA))),
    k(SUARA_D3, ...BANYAK.map((n, c) => tambah(idx(SUARA_D3, ["tujuh", "empat", "enam"][c]), angkaMendatar("td", G2, c, String(n))))),
    k(
      SUARA_D4,
      ...gilir(SUARA_D4, [
        ["tujuh", ["tm-r0b-k", "td-c0b-k"]],
        ["empat", ["tm-r1b-k", "td-c1b-k"]],
        ["enam", ["tm-r2b-k", "td-c2b-k"]],
      ]),
    ),
    k(SUARA_D5, redamkan(0, "tm-r2b-k", "td-c2b-k"), tambah("Yang", ...kartu("sm", 40, 144, 220, 40, W.krem, ["datanya sama,", "bentuknya beda"], 10.6))),
    k(SUARA_D6, hapus(0, "sm-k", "sm-t0", "sm-t1"), tambah("Pilih:", ...pilihKata(150, ["menurun", "mendatar"])), sorotkan("Ketuk", "c2-k")),
    k(SUARA_D7, tambah("Betul!", emo("ok", 150, 197, "✅", 20)), tambah("Hebat!", emo("ow", 262, 197, OWL, 20))),
  ],
};

/* ------------------------------ 10. Pilihan hewan kesukaan ------------------------------ */
const HEWAN = [
  { key: "a", nama: "Kucing", e: EMO_KUCING, y: 62, anak: ["Malosi", "Upe", "Wei"] },
  { key: "b", nama: "Kelinci", e: EMO_KELINCI, y: 106, anak: ["Kira", "Halim"] },
  { key: "c", nama: "Burung", e: EMO_BURUNG, y: 150, anak: ["Igil"] },
];
const XH = (q: number): number => 90 + q * 62;
const ANAK = HEWAN.flatMap((h, r) => h.anak.map((nama, q) => ({ nama, r, q })));
/** Satu pilihan anak: gambar hewan dan nama anak di bawahnya. */
const pilihan = (nama: string): Obj[] => {
  const a = ANAK.find((x) => x.nama === nama)!;
  const h = HEWAN[a.r];
  return [...bendaDi(h.key, h.e, [{ x: XH(a.q), y: h.y }]).map((o) => ({ ...o, id: `e${h.key}${a.q}` })), teks(`pm-${nama}`, XH(a.q), h.y + 11, nama, 8, W.biru)];
};
const SUARA_P1 = "Malosi, Kira, Upe, Wei, Halim, dan Igil memilih hewan kesukaan masing-masing. Kita lihat pilihan mereka.";
const SUARA_P2 = "Malosi, Upe, dan Wei memilih kucing. Kira dan Halim memilih kelinci. Igil memilih burung.";
const SUARA_P3 = "Kita kelompokkan pilihan mereka menurut hewannya, lalu kita hitung. Kucing ada tiga. Kelinci ada dua. Burung ada satu.";
const idsHewan = (r: number): string[] => [`e${HEWAN[r].key}-nm`, ...HEWAN[r].anak.map((_, q) => `e${HEWAN[r].key}${q}`)];

export const ADEGAN_HEWAN_PILIHAN: AdeganStory = {
  id: "hewan-pilihan",
  judul: "Hewan kesukaan enam anak",
  sumber: "Materi: mengelompokkan pilihan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Hewan kesukaan")),
      tambah(idx(SUARA_P1, "memilih"), ...HEWAN.map((h) => namaG(h.key, h.y, h.nama))),
      ...["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"].map((n) => tambah(idx(SUARA_P1, n), pilihan(n))),
    ),
    k(
      SUARA_P2,
      ...gilir(SUARA_P2, [
        ["kucing.", idsHewan(0)],
        ["kelinci.", idsHewan(1)],
        ["burung.", idsHewan(2)],
      ]),
    ),
    k(
      SUARA_P3,
      redamkan(0, ...idsHewan(2)),
      tambah(idx(SUARA_P3, "tiga"), jumlahG("a", HEWAN[0].y, "3")),
      tambah(idx(SUARA_P3, "dua"), jumlahG("b", HEWAN[1].y, "2")),
      tambah(idx(SUARA_P3, "satu"), jumlahG("c", HEWAN[2].y, "1")),
    ),
  ],
};

/* ------------------------------ 11. Tabel hewan kesukaan ------------------------------ */
const GH: Geo = { x: 40, y: 46, w1: 110, w2: 90, rh: 26, u: 10 };
const NAMA_HEWAN = ["Kucing", "Kelinci", "Burung"];
const BANYAK_HEWAN = [3, 2, 1];
const SUARA_H1 = "Data pilihan hewan kita tulis dalam tabel. Judulnya Hewan Kesukaan.";
const SUARA_H2 = "Kucing ada tiga. Kelinci ada dua. Burung ada satu.";
const SUARA_H3 = "Hewan apa yang paling banyak dipilih? Kucing paling banyak, yaitu tiga.";
const SUARA_H4 = "Hewan apa yang paling sedikit dipilih? Burung paling sedikit, yaitu satu.";
const SUARA_H5 = "Kucing lebih banyak dua dari burung. Itu artinya selisihnya dua.";
const SUARA_H6 = "Jumlah semuanya enam. Sama seperti enam anak yang memilih.";

export const ADEGAN_HEWAN_TABEL: AdeganStory = {
  id: "hewan-tabel",
  judul: "Tabel hewan kesukaan",
  sumber: "Materi: membaca tabel data",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Tabel hewan")), tambah(idx(SUARA_H1, "tabel."), ...tabelMenurun("hw", GH, "Hewan Kesukaan", ["Hewan", "Banyak"], NAMA_HEWAN))),
    k(SUARA_H2, ...BANYAK_HEWAN.map((n, r) => tambah(idx(SUARA_H2, ["tiga", "dua", "satu"][r]), angkaMenurun("hw", GH, r, String(n))))),
    k(SUARA_H3, sorotkan("Kucing", "hw-r0a-k", "hw-r0b-k")),
    k(SUARA_H4, redamkan(0, "hw-r0a-k", "hw-r0b-k"), sorotkan("Burung", "hw-r2a-k", "hw-r2b-k")),
    k(SUARA_H5, sorotkan("Kucing", "hw-r0a-k", "hw-r0b-k"), tambah("selisihnya", ...kartu("sl", 60, 160, 180, 28, W.krem, ["selisihnya: 2"], 10.4))),
    k(SUARA_H6, redamkan(0, "hw-r0a-k", "hw-r0b-k", "hw-r2a-k", "hw-r2b-k"), hapus(0, "sl-k", "sl-t0"), tambah("Jumlah", ...kartu("js", 60, 160, 180, 28, W.emas, ["jumlah semuanya: 6"], 10.4))),
  ],
};
