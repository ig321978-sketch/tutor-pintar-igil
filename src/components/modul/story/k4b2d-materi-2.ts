import type { Aksi, AdeganStory } from "./logika-story";
import { LATIHAN_DUA, LATIHAN_SATU, LATIHAN_TIGA, W, barisTabel, batang, emo, judul, kartu, kisi, latihanSatu, pecahan, teks } from "./k4b2d-gambar";
import { bersih, k, sorotkan, tambah } from "./k4b2d-bantu";

/* ------------------------------ 5. Hati-hati dengan nol (catatan video, bukan dari buku; Buku Siswa hlm. 72-73) ------------------------------ */
const SUARA_H1 = "Satu hal perlu hati-hati: nol koma nol tujuh dan nol koma tujuh bukan bilangan yang sama. Nol koma nol tujuh adalah tujuh per seratus, sedangkan nol koma tujuh adalah tujuh per sepuluh.";
const SUARA_H2 = "Nol sesudah koma menjaga tempat. Nol koma nol satu adalah satu per seratus, lebih kecil dari nol koma satu, yaitu satu per sepuluh. Satu roti dari seratus lebih kecil daripada satu roti dari sepuluh.";
const SUARA_H3 = "Kesalahan lain: menulis tujuh per seratus sebagai nol koma tujuh, karena lupa bahwa seratus butuh dua angka di belakang koma. Periksa dengan aturan buku. Catatan ini tambahan dari video, bukan dari buku.";

export const ADEGAN_HATI_HATI: AdeganStory = {
  id: "hati-hati-nol",
  judul: "Hati-hati dengan nol sesudah koma",
  sumber: "Buku Siswa hlm. 72–73; catatan video",
  latar: "#FEF2F2",
  kutipan: [
    "Karena terdapat 1 angka di belakang koma, maka nilai penyebut 10",
    "Karena terdapat 2 angka di belakang koma, maka nilai penyebut 100",
    "bisa dituliskan dalam bentuk desimal menjadi 0,07.",
    "itu bisa dituliskan dalam bentuk desimal 0,01. Apakah",
    "dapat kita tuliskan",
    "menjadi 0,3 Ibu?",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hati-hati dengan nol")),
      tambah("seratus,", teks("hl", 55, 40, "0,07 = 7/100", 9.2, W.hijau), ...kisi("hm", 20, 48, 7, 7)),
      tambah("bukan", teks("hn", 150, 92, "≠", 18, W.merah)),
      tambah("sepuluh.", teks("ho", 220, 40, "0,7 = 7/10", 9.2, W.hijau), ...batang("hp", 150, 48, 14, 7), teks("hq", 220, 82, "7 dari 10 bagian", 8.4, W.coklat)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Nol menjaga tempat")),
      tambah("seratus,", ...kartu("hr", 14, 34, 128, 40, W.hijauMuda, ["0,01 = 1/100"], 10.4)),
      tambah("sepuluh.", ...kartu("hs", 158, 34, 128, 40, W.langit, ["0,1 = 1/10"], 10.4)),
      tambah("lebih", teks("ht", 150, 60, "<", 20, W.merah)),
      tambah("roti", ...batang("hu", 20, 104, 26, 1), teks("hv", 150, 94, "1 dari 10 bagian", 8.6, W.coklat)),
      tambah("daripada", ...kartu("hw", 30, 142, 240, 32, W.emas, ["1 dari 100 lebih kecil dari 1 dari 10"], 8.4)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Periksa dengan aturan buku")),
      tambah("menulis", ...kartu("hx", 14, 30, 272, 32, W.merahMuda, ["7/100 ditulis 0,7  (salah)"], 10)),
      tambah("lupa", emo("hy", 270, 82, "❌", 20)),
      tambah("seratus", ...kartu("hz", 14, 78, 272, 32, W.hijauMuda, ["100 butuh 2 angka: 7/100 = 0,07"], 10)),
      tambah("Periksa", emo("ia", 270, 130, "✅", 20)),
      tambah("Catatan", ...kartu("ib", 14, 140, 272, 32, W.emas, ["catatan tambahan video, bukan dari buku"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Berlatih nomor 1 (Buku Siswa hlm. 74; Panduan Guru hlm. 105) ------------------------------ */
const SUARA_L1 = "Ayo Berlatih nomor satu: nyatakan bagian yang berada dalam kotak sebagai pecahan biasa, kemudian ubahlah menjadi pecahan desimal. Buku sudah mengisi contoh pertama, yaitu nol koma empat.";
const SUARA_L2 = "Gambar pertama: sepuluh telur, dan empat telur ada dalam kotak. Pecahan biasanya empat per sepuluh, jadi desimalnya nol koma empat.";
const SUARA_L3 = "Gambar kedua: sepuluh jeruk, dan lima jeruk ada dalam kotak. Pecahannya lima per sepuluh, jadi desimalnya nol koma lima.";
const SUARA_L4 = "Gambar ketiga: sepuluh jam. Dalam kotak ada tiga jam. Pecahannya tiga per sepuluh, jadi desimalnya nol koma tiga.";
const SUARA_L5 = "Kunci panduan guru cocok: empat per sepuluh nol koma empat, lima per sepuluh nol koma lima, dan tiga per sepuluh nol koma tiga. Hitungan kita pun sama.";

/** Satu soal nomor 1: benda berbingkai di kiri, pecahan dan desimal di kanan. */
const soalSatu = (nomor: number, jenis: "telur" | "jeruk" | "jam", judulTeks: string, at: [string, string, string]): Aksi[] => {
  const d = LATIHAN_SATU[nomor];
  const id = `s${nomor}`;
  return [
    bersih(0),
    tambah(0, judul(judulTeks)),
    tambah(at[0], ...latihanSatu(id, 40, 64, jenis, 26, d.bagian)),
    tambah(at[1], ...pecahan(`${id}f`, 205, 82, String(d.bagian), String(d.total), 22), teks(`${id}e`, 238, 94, "=", 20, W.biru)),
    tambah(at[2], teks(`${id}d`, 270, 94, d.desimal, 22, W.hijau)),
    tambah(at[1], teks(`${id}c`, 90, 140, `${d.bagian} dari ${d.total} ${d.benda}`, 9.4, W.coklat)),
  ];
};

export const ADEGAN_BERLATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Ayo Berlatih 1: bagian dalam kotak menjadi pecahan dan desimal",
  sumber: "Buku Siswa hlm. 74; Panduan Guru hlm. 105",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Berlatih",
    "1. Nyatakan bagian yang berada dalam kotak sebagai pecahan biasa,",
    "kemudian ubahlah menjadi pecahan desimal.",
    "4 10 = 0,4 5 10 = 0,5 3 10 = 0,3",
    "0,4",
    "Ayo Berlatih 1. Nyatakan bagian yang berada dalam kotak sebagai pecahan biasa,",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ayo Berlatih 1")),
      tambah("nyatakan", ...kartu("l1", 8, 34, 82, 40, W.hijauMuda, ["bagian", "dalam kotak"], 8.4)),
      tambah("pecahan", { id: "l2p", t: "panah", x: 92, y: 54, x2: 16, y2: 0, warna: W.biru, tebal: 2 }, ...kartu("l2", 112, 34, 82, 40, W.langit, ["pecahan", "biasa"], 8.4)),
      tambah("desimal.", { id: "l3p", t: "panah", x: 196, y: 54, x2: 16, y2: 0, warna: W.biru, tebal: 2 }, ...kartu("l3", 216, 34, 78, 40, W.emas, ["pecahan", "desimal"], 8.4)),
      tambah("contoh", ...kartu("l4", 40, 110, 220, 40, W.krem, ["contoh pertama sudah terisi:", "desimal 0,4"], 9.2)),
    ),
    k(SUARA_L2, ...soalSatu(0, "telur", "Gambar pertama: telur", ["telur,", "empat@2", "nol"])),
    k(SUARA_L3, ...soalSatu(1, "jeruk", "Gambar kedua: jeruk", ["jeruk,", "lima@2", "nol"])),
    k(SUARA_L4, ...soalSatu(2, "jam", "Gambar ketiga: jam", ["jam.", "tiga@2", "nol"])),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Kunci nomor 1")),
      tambah(0, ...barisTabel("lk0", 20, 34, [90, 90, 80], ["gambar", "pecahan", "desimal"], 22, 8.6, true)),
      tambah("empat", ...barisTabel("lk1", 20, 56, [90, 90, 80], ["telur", "4/10", "0,4"], 22, 9.6)),
      tambah("lima", ...barisTabel("lk2", 20, 78, [90, 90, 80], ["jeruk", "5/10", "0,5"], 22, 9.6)),
      tambah("tiga", ...barisTabel("lk3", 20, 100, [90, 90, 80], ["jam", "3/10", "0,3"], 22, 9.6)),
      tambah("cocok:", emo("lk4", 150, 150, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih nomor 2: persepuluhan (Buku Siswa hlm. 74; Panduan Guru hlm. 106) ------------------------------ */
const SUARA_M1 = "Nomor dua: ubahlah pecahan biasa berikut menjadi pecahan desimal persepuluhan. Penyebutnya sepuluh, jadi cukup satu angka di belakang koma.";
const SUARA_M2 = "Bagian a: satu per sepuluh sama dengan nol koma satu. Bagian b: lima per sepuluh sama dengan nol koma lima.";
const SUARA_M3 = "Bagian c: sembilan per sepuluh sama dengan nol koma sembilan. Sembilan dari sepuluh bagian berwarna, hanya satu bagian yang kosong.";
const SUARA_M4 = "Kunci panduan guru: nol koma satu, nol koma lima, dan nol koma sembilan. Semuanya cocok dengan hitungan kita.";

/** Satu baris nomor 2: huruf, pecahan, desimal, dan batang sepuluh sel. */
const barisDua = (i: number, at: [string, string, string]): Aksi[] => {
  const [n, des] = LATIHAN_DUA[i];
  const y = 52 + i * 48;
  const id = `m${i}`;
  return [
    tambah(at[0], teks(`${id}h`, 16, y + 4, `${"abc"[i]}.`, 12, W.coklat), ...pecahan(`${id}f`, 52, y, String(n), "10", 18)),
    tambah(at[1], teks(`${id}e`, 88, y + 6, "=", 16, W.biru), teks(`${id}d`, 118, y + 8, des, 20, W.hijau)),
    tambah(at[2], ...batang(`${id}b`, 150, y - 10, 13, n)),
  ];
};

export const ADEGAN_BERLATIH_DUA: AdeganStory = {
  id: "berlatih-dua",
  judul: "Ayo Berlatih 2: persepuluhan menjadi desimal",
  sumber: "Buku Siswa hlm. 74; Panduan Guru hlm. 106",
  latar: "#F0F9FF",
  kutipan: [
    "2. Ubahlah pecahan biasa berikut menjadi pecahan desimal persepuluhan!",
    "2. Ubahkan pecahan biasa berikut menjadi pecahan desimal persepuluhan",
    "a. 1 10 = 0,1 b. 5 10 = 0,5 c.",
    "9 10 = 0,9",
    "Ayo Berlatih",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Ayo Berlatih 2")),
      tambah("pecahan", ...kartu("m1", 14, 34, 272, 40, W.hijauMuda, ["pecahan biasa  →  desimal persepuluhan"], 9.6)),
      tambah("Penyebutnya", ...kartu("m2", 14, 90, 272, 40, W.langit, ["penyebut 10  →  1 angka di belakang koma"], 9.6)),
      tambah("satu", emo("m3", 150, 170, "🔢", 26)),
    ),
    k(SUARA_M2, bersih(0), tambah(0, judul("Persepuluhan")), ...barisDua(0, ["satu", "nol", "satu@2"]), ...barisDua(1, ["lima", "nol@2", "lima@2"])),
    k(
      SUARA_M3,
      ...barisDua(2, ["sembilan", "nol", "sembilan@2"]),
      sorotkan("kosong", "m2b-c9"),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Kunci nomor 2")),
      tambah(0, ...barisTabel("mk0", 20, 34, [60, 100, 100], ["soal", "pecahan", "desimal"], 22, 8.6, true)),
      tambah("satu", ...barisTabel("mk1", 20, 56, [60, 100, 100], ["a", "1/10", "0,1"], 22, 9.6)),
      tambah("lima", ...barisTabel("mk2", 20, 78, [60, 100, 100], ["b", "5/10", "0,5"], 22, 9.6)),
      tambah("sembilan.", ...barisTabel("mk3", 20, 100, [60, 100, 100], ["c", "9/10", "0,9"], 22, 9.6)),
      tambah("cocok", emo("mk4", 150, 154, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih nomor 3: perseratusan (Buku Siswa hlm. 75; Panduan Guru hlm. 106) ------------------------------ */
const SUARA_N1 = "Nomor tiga: ubahlah pecahan biasa berikut menjadi pecahan desimal perseratusan. Penyebutnya seratus, jadi ada dua angka di belakang koma.";
const SUARA_N2 = "Bagian a: lima belas per seratus. Pembilangnya lima belas, ditulis dengan dua angka di belakang koma menjadi nol koma satu lima.";
const SUARA_N3 = "Bagian b: enam puluh dua per seratus menjadi nol koma enam dua. Enam kolom penuh dan dua kotak lagi, jadi enam puluh dua kotak terwarnai.";
const SUARA_N4 = "Bagian c: delapan puluh satu per seratus menjadi nol koma delapan satu. Delapan kolom penuh dan satu kotak lagi, jadi delapan puluh satu kotak terwarnai dari seratus kotak.";
const SUARA_N5 = "Kunci panduan guru: nol koma satu lima, nol koma enam dua, dan nol koma delapan satu. Semuanya cocok dengan hitungan kita.";

/** Satu bagian nomor 3: kisi seratus kotak, pecahan, desimal, dan keterangan. */
const bagianSeratus = (i: number, caption: string, at: [string, string, string, string]): Aksi[] => {
  const [n, des] = LATIHAN_TIGA[i];
  const id = `n${i}`;
  return [
    bersih(0),
    tambah(0, judul(`Bagian ${"abc"[i]}`)),
    tambah(at[0], ...kisi(`${id}g`, 20, 40, 12, n)),
    tambah(at[1], ...pecahan(`${id}f`, 225, 84, String(n), "100", 22)),
    tambah(at[2], teks(`${id}e`, 225, 130, "=", 18, W.biru), teks(`${id}d`, 225, 160, des, 26, W.hijau)),
    tambah(at[3], teks(`${id}c`, 80, 178, caption, 9.4, W.coklat)),
  ];
};

export const ADEGAN_BERLATIH_TIGA: AdeganStory = {
  id: "berlatih-tiga",
  judul: "Ayo Berlatih 3: perseratusan menjadi desimal",
  sumber: "Buku Siswa hlm. 75; Panduan Guru hlm. 106",
  latar: "#FDF4FF",
  kutipan: [
    "3. Ubahlah pecahan biasa berikut menjadi pecahan desimal perseratusan!",
    "3. Ubahlah pecahan biasa berikut menjadi pecahan desimal perseratusan!",
    "9 10 = 0,9 15 100 = 0,15 62 100 = 0,62 81 100 = 0,81",
    "15 100 = 0,15",
    "62 100 = 0,62",
    "81 100 = 0,81",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Ayo Berlatih 3")),
      tambah("pecahan", ...kartu("o1", 14, 34, 272, 40, W.hijauMuda, ["pecahan biasa  →  desimal perseratusan"], 9.4)),
      tambah("Penyebutnya", ...kartu("o2", 14, 90, 272, 40, W.langit, ["penyebut 100  →  2 angka di belakang koma"], 9.4)),
      tambah("dua", emo("o3", 150, 172, "🔢", 26)),
    ),
    k(SUARA_N2, ...bagianSeratus(0, "15 dari 100 kotak", ["belas", "seratus.", "menjadi", "ditulis"])),
    k(SUARA_N3, ...bagianSeratus(1, "6 kolom + 2 kotak = 62", ["puluh", "seratus", "menjadi", "kolom"])),
    k(SUARA_N4, ...bagianSeratus(2, "81 dari 100 kotak", ["puluh", "seratus", "menjadi", "kolom"])),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Kunci nomor 3")),
      tambah(0, ...barisTabel("nk0", 20, 34, [60, 110, 90], ["soal", "pecahan", "desimal"], 22, 8.6, true)),
      tambah("satu", ...barisTabel("nk1", 20, 56, [60, 110, 90], ["a", "15/100", "0,15"], 22, 9.6)),
      tambah("enam", ...barisTabel("nk2", 20, 78, [60, 110, 90], ["b", "62/100", "0,62"], 22, 9.6)),
      tambah("delapan", ...barisTabel("nk3", 20, 100, [60, 110, 90], ["c", "81/100", "0,81"], 22, 9.6)),
      tambah("cocok", emo("nk4", 150, 154, "✅", 28)),
    ),
  ],
};
