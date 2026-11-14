import type { AdeganStory, Obj } from "./logika-story";
import { BENTUK, LUAS_BUKU, W, barisTabel, batang, kartu, kerangka, keliling, luas, petak, teks } from "./k5b5d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b5d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* Kertas berpetak di kiri (satu petak = 5 cm, 10 piksel) dan hitungan di kanan. */
const GX = 8;
const GY = 34;
const SEL = 10;
const ukuran = (i: number): [number, number] => BENTUK[i];

/** Kertas berpetak dan kerangka bentuk ke-i (mulai 0) dengan label panjang dan lebar. Id: pg, pk, pp, pl. */
function gambarBentuk(i: number, warna: string = W.merahMuda): Obj[] {
  const [p, l] = ukuran(i);
  const x = GX + SEL;
  const y = GY + SEL;
  const w = (p / 5) * SEL;
  const h = (l / 5) * SEL;
  return [petak("pg", GX, GY, 15, 10, SEL), kerangka("pk", x, y, p, l, SEL, warna), teks("pp", x + w / 2, y - 3, `${p} cm`, 7.8), teks("pl", x + w + 3, y + h / 2 + 2.5, `${l} cm`, 7.8, W.biru, { anchor: "start" })];
}
const IDS_BENTUK = ["pg", "pk", "pp", "pl"];

/** Tiga baris hitungan keliling dan luas di kanan. Id: c1, c2, c3 (keliling) dan d1, d2 (luas). */
const hitungKeliling = (i: number): Obj[] => {
  const [p, l] = ukuran(i);
  return [teks("c1", 232, 66, `${p} + ${l} = ${p + l}`, 10), teks("c2", 232, 86, `2 x ${p + l} = ${keliling(p, l)}`, 10, W.merah), teks("c3", 232, 104, `keliling ${keliling(p, l)} cm`, 9, W.hijau)];
};
const hitungLuas = (i: number): Obj[] => {
  const [p, l] = ukuran(i);
  return [teks("d1", 232, 128, `${p} x ${l} = ${luas(p, l)}`, 10, W.biru), teks("d2", 232, 146, `luas ${luas(p, l)} cm²`, 9, W.hijau)];
};

const LEBAR_TABEL = [30, 42, 36, 82, 70];
const JUDUL_TABEL = ["Bentuk", "Panjang", "Lebar", "Keliling", "Luas"];
const TX = 20;
const TY = 36;
const TH = 16;
const kepala = (): Obj[] => barisTabel("th", TX, TY, LEBAR_TABEL, JUDUL_TABEL, W.biru, 7.4, TH, W.putih);
const isiBaris = (i: number): string[] => {
  const [p, l] = ukuran(i);
  return [`${i + 1}`, `${p}`, `${l}`, `2 x (${p}+${l}) = ${keliling(p, l)}`, `${p} x ${l} = ${luas(p, l)}`];
};
/** Baris tabel ke-i (mulai 0) terisi, id `tr{i}-...`. */
const barisIsi = (i: number, warna: string = W.putih): Obj[] => barisTabel(`tr${i}`, TX, TY + TH * (i + 1), LEBAR_TABEL, isiBaris(i), warna, 7, TH);
/** Baris tabel ke-i masih kosong (tanda titik). */
const barisKosong = (i: number): Obj[] => barisTabel(`tr${i}`, TX, TY + TH * (i + 1), LEBAR_TABEL, [`${i + 1}`, "...", "...", "...", "..."], W.abu, 7, TH);

/* ------------------------------ 4. Bentuk 1 dan tabel (BS hlm. 160) ------------------------------ */
export const ADEGAN_BENTUK_1: AdeganStory = {
  id: "bentuk-1",
  judul: "Bentuk pertama: 20 kali 10 dan tabel ukuran",
  sumber: "Buku Siswa hlm. 160; Buku Panduan Guru hlm. 233–234",
  latar: "#FEF2F2",
  kutipan: [
    "Isikan ukuran-ukuran yang mungkin dibuat pada tabel berikut",
    "Bentuk Panjang (cm) Lebar (cm) Keliling (cm) Luas (cm2)",
    "2 × (20+10) = 60 20 × 10 = 200",
    "Peserta didik menunjukkan hasil eksplorasinya dan mencatat hasilnya pada tabel",
  ],
  ketukan: [
    k(
      "Buku memberi contoh bentuk pertama: panjang 20 dan lebar 10. Kita gambar pada petak, 4 petak mendatar dan 2 petak menurun.",
      tambah(0, jud("Bentuk 1", 22)),
      tambah("Buku", gambarBentuk(0)),
      tambah("4", teks("pp4", 232, 66, "4 petak ke samping", 8.4, W.merah)),
      tambah("petak@3", teks("pp2", 232, 82, "2 petak ke bawah", 8.4, W.hijau)),
    ),
    k(
      "Hitung kelilingnya: 20 ditambah 10 hasilnya 30, lalu dikali 2 hasilnya 60 sentimeter. Pas dengan panjang kawat Bapak.",
      hapus(0, "pp4", "pp2"),
      tambah("20", hitungKeliling(0).slice(0, 1)),
      tambah("dikali", hitungKeliling(0).slice(1, 2)),
      tambah("Pas", hitungKeliling(0).slice(2)),
    ),
    k(
      "Sekarang luasnya: panjang kali lebar, yaitu 20 kali 10 hasilnya 200 sentimeter persegi. Satu petak bernilai 25 sentimeter persegi, dan 8 petak memberi 200.",
      ubah(0, { id: "pk", warna: W.hijauMuda, garis: W.hijau }),
      tambah("20@2", hitungLuas(0).slice(0, 1)),
      tambah("sentimeter@1", hitungLuas(0).slice(1)),
      tambah("Satu", teks("e1", 232, 166, "1 petak = 25 cm²", 8.4, W.ungu), teks("e2", 232, 182, "8 x 25 = 200", 8.4, W.ungu)),
    ),
    k(
      "Hasilnya dicatat pada tabel dengan kolom bentuk, panjang, lebar, keliling, dan luas. Baris pertama sudah terisi, lima baris lainnya menunggu.",
      bersih(0),
      tambah(0, jud("Tabel ukuran", 26)),
      tambah("kolom", kepala()),
      tambah("Baris", barisIsi(0)),
      tambah("lima", [1, 2, 3, 4, 5].flatMap(barisKosong)),
    ),
  ],
};

/* ------------------------------ 5. Bentuk 2 dan 3 (BG hlm. 234) ------------------------------ */
export const ADEGAN_TABEL_1: AdeganStory = {
  id: "tabel-1",
  judul: "Bentuk 2 dan 3: tukar ukuran dan kerangka pipih",
  sumber: "Buku Panduan Guru hlm. 234 (kunci tabel)",
  latar: "#FFF7ED",
  kutipan: ["2 × (10+20) = 60 10 × 20 = 200", "3 5 25 2 × (5+25) = 60 5 × 25 = 125", "Guru memeriksa jawaban peserta didik dan mengoreksi jika ada yang keliru"],
  ketukan: [
    k(
      "Bentuk 2: kita tukar saja, panjang 10 dan lebar 20. Kerangkanya jadi tegak, tetapi kelilingnya tetap 60 dan luasnya tetap 200.",
      tambah(0, jud("Bentuk 2", 22)),
      tambah("Bentuk", gambarBentuk(1)),
      tambah("panjang", hitungKeliling(1)),
      tambah("tetap@2", hitungLuas(1)),
    ),
    k(
      "Bentuk 3: panjang 5 dan lebar 25. Jumlahnya 30, dikali 2 hasilnya 60, jadi kawat habis. Luasnya 5 kali 25, yaitu 125 sentimeter persegi.",
      hapus(0, [...IDS_BENTUK, "c1", "c2", "c3", "d1", "d2"]),
      ubah(0, { id: "jud", isi: "Bentuk 3" }),
      tambah(0, gambarBentuk(2)),
      tambah("Jumlahnya", hitungKeliling(2)),
      tambah("Luasnya", hitungLuas(2)),
    ),
    k(
      "Bentuk 3 lebih pipih, dan luasnya turun menjadi 125 padahal kelilingnya masih 60. Keliling sama belum tentu luas sama.",
      ubah("pipih", { id: "pk", warna: W.merahMuda, garis: W.merah }),
      tambah("turun", teks("n1", 232, 166, "luas turun: 125", 9, W.merah)),
      tambah("sama@2", teks("n2", 232, 184, "keliling tetap 60", 9, W.hijau)),
    ),
    k(
      "Hasil kedua bentuk ini masuk tabel, di bawah baris pertama. Bentuk 2 sama luasnya dengan bentuk 1, hanya letak panjang dan lebarnya tertukar.",
      bersih(0),
      tambah(0, jud("Tabel: baris 1 sampai 3", 26)),
      tambah("tabel,", kepala()),
      tambah("baris", barisIsi(0), barisIsi(1)),
      tambah("Bentuk@3", barisIsi(2, W.merahMuda)),
      tambah("tertukar.", [3, 4, 5].flatMap(barisKosong)),
    ),
  ],
};

/* ------------------------------ 6. Bentuk 4, 5, dan 6 (BG hlm. 234) ------------------------------ */
export const ADEGAN_TABEL_2: AdeganStory = {
  id: "tabel-2",
  judul: "Bentuk 4, 5, dan 6: persegi dan 18 kali 12",
  sumber: "Buku Panduan Guru hlm. 234 dan 235",
  latar: "#F0FDF4",
  kutipan: ["4 25 5 2 × (25+5) = 60 25 × 5 = 125", "5 15 15 2 × (15+15) = 60 15 × 15 = 225", "6 18 12 2 × (18+12) = 60 18 × 12 = 216"],
  ketukan: [
    k(
      "Bentuk 4: panjang 25 dan lebar 5. Ini kebalikan bentuk sebelumnya. Keliling 60, luas 25 kali 5 hasilnya 125.",
      tambah(0, jud("Bentuk 4", 22)),
      tambah("Bentuk", gambarBentuk(3)),
      tambah("Keliling", hitungKeliling(3)),
      tambah("luas", hitungLuas(3)),
    ),
    k(
      "Bentuk 5: panjang 15 dan lebar 15, sehingga sisinya sama. Ini persegi. Kelilingnya tetap 60, dan luasnya 15 kali 15 hasilnya 225.",
      hapus(0, [...IDS_BENTUK, "c1", "c2", "c3", "d1", "d2"]),
      ubah(0, { id: "jud", isi: "Bentuk 5" }),
      tambah(0, gambarBentuk(4, W.hijauMuda)),
      tambah("Kelilingnya", hitungKeliling(4)),
      tambah("luasnya", hitungLuas(4)),
      tambah("persegi.", teks("ps", 232, 184, "persegi!", 9.6, W.hijau)),
    ),
    k(
      "Bentuk 6: panjang 18 dan lebar 12. Jumlahnya tetap 30, kelilingnya 60, dan luasnya 18 kali 12 hasilnya 216. Angkanya bukan kelipatan 5.",
      hapus(0, [...IDS_BENTUK, "c1", "c2", "c3", "d1", "d2", "ps"]),
      ubah(0, { id: "jud", isi: "Bentuk 6" }),
      tambah(0, gambarBentuk(5)),
      tambah("Jumlahnya", hitungKeliling(5)),
      tambah("luasnya", hitungLuas(5)),
      tambah("kelipatan", teks("kp", 232, 184, "bukan kelipatan 5", 8.4, W.ungu)),
    ),
    k(
      "Keenam bentuk sudah lengkap pada tabel kunci: semua berkeliling 60 sentimeter, dengan luas 200, 200, 125, 125, 225, dan 216 sentimeter persegi.",
      bersih(0),
      tambah(0, jud("Tabel lengkap", 26)),
      tambah("tabel", kepala()),
      tambah("semua", [0, 1, 2, 3, 4, 5].flatMap((i) => barisIsi(i))),
    ),
    k(
      "Bentuk 5, yaitu persegi 15 kali 15, memberi luas terbesar: 225 sentimeter persegi. Itulah jawaban untuk pertanyaan kerangka mana yang paling luas.",
      ...[0, 1, 2, 3, 4].map((j) => ubah("persegi", { id: `tr4-k${j}`, warna: W.hijauMuda })),
      tambah("terbesar:", kartu("tb", 20, 140, 260, 42, W.hijauMuda, ["Terluas: bentuk 5, persegi", "15 x 15 = 225 cm²"], 8.8)),
    ),
  ],
};

/* ------------------------------ 7. Diagram batang dan penguatan (BG hlm. 234) ------------------------------ */
const YD = 168;
const BW = 34;
const bx = (i: number): number => 22 + i * 44;
const tinggi = (v: number): number => Math.round((v / 225) * 110);
const batangBentuk = (i: number, warna: string): Obj[] => [...batang(`b${i}`, bx(i), YD, BW, tinggi(LUAS_BUKU[i]), warna, `${LUAS_BUKU[i]}`), teks(`bt${i}`, bx(i) + BW / 2, YD + 12, `${i + 1}`, 8.6, W.ungu)];

export const ADEGAN_BANDING: AdeganStory = {
  id: "banding-luas",
  judul: "Membandingkan luas enam kerangka berkeliling 60",
  sumber: "Buku Panduan Guru hlm. 234 (akhir pembelajaran)",
  latar: "#EEF2FF",
  kutipan: ["Di akhir eksplorasi, guru perlu memberikan penguatan kembali tentang hubungan keliling dengan luas daerah suatu bangun datar"],
  ketukan: [
    k(
      "Sekarang bandingkan keenam bentuk. Semuanya berkeliling 60 sentimeter, tetapi tinggi batang luasnya berbeda-beda.",
      tambah(0, jud("Luas enam bentuk (cm²)", 20, 11)),
      tambah("Semuanya", teks("kk", 110, 38, "semua keliling 60 cm", 9, W.merah)),
      tambah("tinggi", [0, 1, 2, 3, 4, 5].flatMap((i) => batangBentuk(i, W.muda))),
    ),
    k(
      "Bentuk 1 dan 2 sama-sama 200, hanya panjang dan lebarnya ditukar. Bentuk 3 dan 4 sama-sama 125. Pasangan seperti ini selalu sama luas.",
      ubah("1", { id: "b0", warna: W.krem }),
      ubah("2", { id: "b1", warna: W.krem }),
      ubah("3", { id: "b2", warna: W.merahMuda }),
      ubah("4", { id: "b3", warna: W.merahMuda }),
    ),
    k(
      "Luas terbesar ada pada bentuk 5, yaitu persegi 15 kali 15 dengan luas 225. Luas terkecil ada pada bentuk 3 dan 4, yaitu 125.",
      ubah("5", { id: "b4", warna: W.hijauMuda }),
      tambah("persegi", teks("mx", 235, 44, "persegi 15 x 15", 9, W.hijau)),
      tambah("terkecil", teks("mn", 149, 140, "terkecil", 8.6, W.merah)),
    ),
    k(
      "Bentuk 6, yaitu 18 kali 12, luasnya 216, hampir sama dengan persegi. Makin mendekati persegi, makin besar luasnya.",
      ubah("Bentuk", { id: "b5", warna: W.hijauMuda }),
      tambah("mendekati", teks("mp", 150, 196, "makin mendekati persegi, makin luas", 8.4, W.ungu)),
      tambah("216,", teks("m6", 250, 32, "18 x 12 = 216", 8.4, W.biru)),
    ),
    k(
      "Itulah penguatan dari Panduan Guru. Keliling yang sama tidak berarti luas yang sama. Hubungan keliling dan luas harus dipahami bersama.",
      bersih(0),
      tambah(0, jud("Penguatan", 26)),
      tambah("Keliling", kartu("pn1", 20, 44, 120, 52, W.krem, ["keliling sama", "60 cm"], 9.6)),
      tambah("tidak", teks("pn", 150, 74, "≠", 18, W.merah)),
      tambah("luas@1", kartu("pn2", 160, 44, 120, 52, W.muda, ["luas berbeda", "125 sampai 225"], 9.6)),
      tambah("Hubungan", teks("pn3", 150, 140, "pahami keduanya bersama", 10, W.ungu)),
    ),
  ],
};
