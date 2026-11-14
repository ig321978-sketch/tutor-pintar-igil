import type { Aksi, AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, emo, judul, kartu, panah, tabelNilai, teks } from "./k4b2d-gambar";
import { bersih, idx, k, tambah } from "./k4b2d-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k4b2d-luar-1";

/** Baris jembatan: kartu kiri (pecahan atau desimal), kartu kanan, dan panah di antaranya. `arah`: ke kanan, ke kiri, atau dua arah. Id `${id}-k1`, `${id}-k2`, `${id}-p1`, `${id}-p2`. */
export function jembatan(id: string, y: number, kiri: string, kanan: string, arah: "kanan" | "kiri" | "dua", warnaKiri: string = W.hijauMuda, warnaKanan: string = W.langit, tinggi = 30, u = 11): Obj[] {
  const cy = y + tinggi / 2;
  const out: Obj[] = [...kartu(`${id}-k1`, 14, y, 90, tinggi, warnaKiri, [kiri], u), ...kartu(`${id}-k2`, 196, y, 90, tinggi, warnaKanan, [kanan], u)];
  if (arah === "kanan") out.push(panah(`${id}-p1`, 110, cy, 80, 0, W.biru, 2.2));
  else if (arah === "kiri") out.push(panah(`${id}-p2`, 190, cy, -80, 0, W.merah, 2.2));
  else out.push(panah(`${id}-p1`, 110, cy - 4, 80, 0, W.biru, 2), panah(`${id}-p2`, 190, cy + 4, -80, 0, W.merah, 2));
  return out;
}

/* ------------------------------ 6. Fraction–Decimal Link: konsep ------------------------------ */
const SUARA_J1 = "Metode ketiga, Fraction–Decimal Link, atau Jembatan Pecahan–Desimal. Pecahan dan desimal adalah dua tulisan untuk bilangan yang sama. Jembatan menghubungkan keduanya.";
const SUARA_J2 = "Menyeberang dari pecahan ke desimal: pembilang menjadi angka di belakang koma, dan penyebut menentukan banyak angkanya. Penyebut sepuluh berarti satu angka, dan penyebut seratus berarti dua angka.";
const SUARA_J3 = "Menyeberang dari desimal ke pecahan: angka di belakang koma menjadi pembilang, dan penyebutnya sepuluh atau seratus menurut banyak angka.";
const SUARA_J4 = "Jembatan berlaku dua arah, jadi hasilnya bisa diperiksa. Dari tiga per sepuluh ke nol koma tiga, lalu kembali ke tiga per sepuluh lagi.";

export const ADEGAN_LUAR_JEMBATAN: AdeganStory = {
  id: "luar-jembatan",
  judul: "Fraction–Decimal Link: jembatan dua tulisan",
  sumber: "Metode luar: Fraction–Decimal Link",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Fraction–Decimal Link")),
      tambah("ketiga,", kepala(2)),
      tambah(idx(SUARA_J1, "pecahan"), ...kartu("ja", 14, 66, 90, 46, W.hijauMuda, ["pecahan", "3/10"], 10.4)),
      tambah(idx(SUARA_J1, "desimal"), ...kartu("jb", 196, 66, 90, 46, W.langit, ["desimal", "0,3"], 10.4)),
      tambah("Jembatan@2", panah("jc", 110, 86, 80, 0, W.biru, 2), panah("jd", 190, 94, -80, 0, W.merah, 2), emo("je", 150, 134, "🌉", 30)),
      tambah("sama.", ...kartu("jf", 40, 148, 220, 30, W.emas, ["dua tulisan, satu bilangan"], 9.6)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Pecahan ke desimal")),
      tambah(0, ...jembatan("jg", 34, "3/10", "0,3", "kanan")),
      tambah("pembilang", ...kartu("jh", 14, 76, 272, 30, W.krem, ["pembilang 3  →  angka 3"], 9.6)),
      tambah("Sepuluh", ...kartu("ji", 14, 114, 272, 30, W.hijauMuda, ["penyebut 10  →  1 angka"], 9.6)),
      tambah("seratus", ...kartu("jj", 14, 152, 272, 30, W.langit, ["penyebut 100  →  2 angka"], 9.6)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Desimal ke pecahan")),
      tambah(0, ...jembatan("jk", 34, "0,07", "7/100", "kiri", W.langit, W.hijauMuda)),
      tambah("angka", ...kartu("jl", 14, 82, 272, 34, W.krem, ["angka di belakang koma  →  pembilang 7"], 9.2)),
      tambah("banyak", ...kartu("jm", 14, 126, 272, 34, W.hijauMuda, ["2 angka  →  penyebut 100"], 9.6)),
      tambah("seratus", ...kartu("jn", 14, 168, 272, 24, W.emas, ["penyebut 10 atau 100 menurut banyak angka"], 8.8)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Dua arah, bisa diperiksa")),
      tambah("tiga", ...jembatan("jo", 50, "3/10", "0,3", "kanan")),
      tambah("kembali", ...jembatan("jp", 100, "3/10", "0,3", "kiri")),
      tambah("lagi.", emo("jq", 150, 168, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 7. Fraction–Decimal Link: penerapan pada nomor 2, nomor 3, dan contoh buku (Buku Siswa hlm. 73–75) ------------------------------ */
const SUARA_B1 = "Nomor dua di buku: satu per sepuluh menyeberang menjadi nol koma satu, lima per sepuluh menjadi nol koma lima, dan sembilan per sepuluh menjadi nol koma sembilan.";
const SUARA_B2 = "Nomor tiga: lima belas per seratus menjadi nol koma satu lima, enam puluh dua per seratus menjadi nol koma enam dua, dan delapan puluh satu per seratus menjadi nol koma delapan satu.";
const SUARA_B3 = "Menyeberang kembali dari desimal: nol koma empat dari contoh telur menjadi empat per sepuluh, dan nol koma nol tujuh dari contoh murid menjadi tujuh per seratus.";
const SUARA_B4 = "Hasil sebuah jembatan harus kembali ke asal. Nol koma dua lima menjadi dua puluh lima per seratus, lalu kembali menjadi nol koma dua lima.";

export const ADEGAN_LUAR_JEMBATAN_TERAPAN: AdeganStory = {
  id: "luar-jembatan-terapan",
  judul: "Fraction–Decimal Link pada soal nomor 2 dan 3",
  sumber: "Metode luar: Fraction–Decimal Link; BS 73–75",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Nomor 2: persepuluhan")),
      tambah(0, kepala(2)),
      tambah("satu", ...jembatan("ba", 64, "1/10", "0,1", "kanan")),
      tambah("lima", ...jembatan("bb", 104, "5/10", "0,5", "kanan")),
      tambah("sembilan", ...jembatan("bc", 144, "9/10", "0,9", "kanan")),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Nomor 3: perseratusan")),
      tambah(0, kepala(2)),
      tambah("lima", ...jembatan("bd", 64, "15/100", "0,15", "kanan")),
      tambah("enam", ...jembatan("be", 104, "62/100", "0,62", "kanan")),
      tambah("delapan", ...jembatan("bf", 144, "81/100", "0,81", "kanan")),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Dari desimal kembali ke pecahan")),
      tambah(0, kepala(2)),
      tambah("empat", ...jembatan("bg", 74, "4/10", "0,4", "kiri", W.langit, W.hijauMuda)),
      tambah("tujuh", ...jembatan("bh", 126, "7/100", "0,07", "kiri", W.langit, W.hijauMuda)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Hasil harus kembali")),
      tambah(0, kepala(2)),
      tambah("Nol", ...jembatan("bi", 70, "25/100", "0,25", "kanan")),
      tambah("lalu", ...jembatan("bj", 112, "25/100", "0,25", "kiri")),
      tambah("menjadi@2", emo("bk", 150, 176, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 8. Place Value Chart: konsep ------------------------------ */
const SUARA_P1 = "Metode keempat, Place Value Chart, atau Tabel Nilai Tempat. Setiap angka punya tempat: satuan, lalu koma, lalu persepuluhan, lalu perseratusan.";
const SUARA_P2 = "Angka pertama setelah koma menempati tempat persepuluhan, dan angka kedua menempati tempat perseratusan. Karena itu satu angka berarti persepuluhan, dan dua angka berarti perseratusan.";
const SUARA_P3 = "Nilai tiap tempat: dua di tempat persepuluhan bernilai dua per sepuluh, yaitu dua puluh per seratus. Lima di tempat perseratusan bernilai lima per seratus. Jumlahnya dua puluh lima per seratus.";
const SUARA_P4 = "Nol di tempat persepuluhan tetap ditulis. Pada nol koma nol tujuh, tempat persepuluhan berisi nol dan tempat perseratusan berisi tujuh. Itu sebabnya tujuh per seratus bukan nol koma tujuh.";

export const ADEGAN_LUAR_TEMPAT: AdeganStory = {
  id: "luar-tempat",
  judul: "Place Value Chart: tempat tiap angka",
  sumber: "Metode luar: Place Value Chart",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Place Value Chart")),
      tambah("keempat,", kepala(3)),
      tambah(idx(SUARA_P1, "tempat", 2), ...barisTabel("pch", 32, 70, [48, 24, 82, 82], ["satuan", ",", "persepuluhan", "perseratusan"], 24, 7.2, true)),
      tambah("koma,", emo("pa", 150, 130, "📋", 30)),
      tambah("perseratusan.", teks("pb", 150, 168, "tempat tiap angka", 10, W.coklat)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Angka dan tempatnya")),
      tambah(0, kepala(3), ...tabelNilai("pc", 32, 64, ["0", ",", "2", "5"], true, 24, 13)),
      tambah("pertama", panah("pd", 145, 124, 0, -14, W.merah, 2), teks("pe", 145, 142, "angka pertama", 8.6, W.merah)),
      tambah("kedua", panah("pf", 227, 124, 0, -14, W.merah, 2), teks("pg", 227, 142, "angka kedua", 8.6, W.merah)),
      tambah("Karena", ...kartu("ph", 14, 154, 272, 34, W.emas, ["1 angka: persepuluhan   2 angka: perseratusan"], 8.6)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Nilai tiap tempat")),
      tambah(0, kepala(3), ...tabelNilai("pi", 32, 64, ["0", ",", "2", "5"], true, 24, 13)),
      tambah("dua", ...kartu("pj", 14, 124, 128, 34, W.hijauMuda, ["2/10 = 20/100"], 10)),
      tambah("Lima", ...kartu("pk", 158, 124, 128, 34, W.langit, ["5/100"], 10)),
      tambah("Jumlahnya", ...kartu("pl", 14, 166, 272, 28, W.emas, ["20/100 + 5/100 = 25/100"], 10.4)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Nol tetap ditulis")),
      tambah(0, kepala(3), ...tabelNilai("pm", 32, 64, ["0", ",", "0", "7"], true, 24, 13)),
      tambah("persepuluhan", teks("pn", 145, 130, "persepuluhan: 0", 8.6, W.merah)),
      tambah("perseratusan", teks("po", 227, 142, "perseratusan: 7", 8.6, W.merah)),
      tambah("sebabnya", ...kartu("pp", 14, 154, 272, 34, W.emas, ["7/100 = 0,07  (bukan 0,7)"], 10)),
    ),
  ],
};

/* ------------------------------ 9. Place Value Chart: penerapan pada roti, biskuit, contoh, nomor 3 (Buku Siswa hlm. 71–75) ------------------------------ */
const SUARA_Q1 = "Roti di buku: satu per sepuluh adalah nol koma satu. Tempat persepuluhan berisi satu, dan tempat perseratusan kosong.";
const SUARA_Q2 = "Biskuit di buku: satu per seratus adalah nol koma nol satu. Tempat persepuluhan berisi nol, dan tempat perseratusan berisi satu.";
const SUARA_Q3 = "Contoh buku: nol koma dua lima. Dua persepuluhan dan lima perseratusan, sama dengan dua puluh lima per seratus.";
const SUARA_Q4 = "Jawaban nomor tiga: nol koma satu lima berarti satu persepuluhan dan lima perseratusan. Nol koma enam dua berarti enam persepuluhan dan dua perseratusan. Nol koma delapan satu berarti delapan persepuluhan dan satu perseratusan.";

/** Satu penerapan bagan: kepala, bagan satu baris, dan dua keterangan. */
const bagan = (judulTeks: string, isi: readonly [string, string, string, string], kiri: string, kanan: string, bawah: string, at: [string, string, string]): Aksi[] => [
  bersih(0),
  tambah(0, judul(judulTeks)),
  tambah(0, kepala(3), ...tabelNilai("qa", 32, 64, isi, true, 24, 13)),
  tambah(at[0], teks("qb", 145, 128, kiri, 8.6, W.merah)),
  tambah(at[1], teks("qc", 227, 144, kanan, 8.6, W.merah)),
  tambah(at[2], ...kartu("qd", 14, 158, 272, 32, W.emas, [bawah], 10)),
];

export const ADEGAN_LUAR_TEMPAT_TERAPAN: AdeganStory = {
  id: "luar-tempat-terapan",
  judul: "Place Value Chart pada roti, biskuit, dan nomor 3",
  sumber: "Metode luar: Place Value Chart; BS hlm. 71–75",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, ...bagan("Roti: 1/10", ["0", ",", "1", ""], "persepuluhan: 1", "perseratusan: kosong", "1/10 = 0,1", ["Tempat", "kosong.", "Roti"])),
    k(SUARA_Q2, ...bagan("Biskuit: 1/100", ["0", ",", "0", "1"], "persepuluhan: 0", "perseratusan: 1", "1/100 = 0,01", ["Tempat", "berisi@2", "Biskuit"])),
    k(SUARA_Q3, ...bagan("Contoh buku: 0,25", ["0", ",", "2", "5"], "2 persepuluhan", "5 perseratusan", "2/10 + 5/100 = 25/100", ["Dua", "lima", "sama"])),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Nomor 3: tiga jawaban")),
      tambah(0, kepala(3), ...barisTabel("qh", 32, 64, [48, 24, 82, 82], ["satuan", ",", "persepuluhan", "perseratusan"], 24, 7.2, true)),
      tambah("satu", ...barisTabel("qe", 32, 88, [48, 24, 82, 82], ["0", ",", "1", "5"], 24, 13)),
      tambah("enam", ...barisTabel("qf", 32, 112, [48, 24, 82, 82], ["0", ",", "6", "2"], 24, 13)),
      tambah("delapan", ...barisTabel("qg", 32, 136, [48, 24, 82, 82], ["0", ",", "8", "1"], 24, 13)),
      tambah("Jawaban", ...kartu("qi", 40, 168, 220, 26, W.emas, ["tiap jawaban: 2 angka, 2 tempat"], 9)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_Z1 = "Ringkasnya, empat metode dari luar: menghitung angka menurut penyebut, mewarnai kisi seratus kotak, menyeberang lewat jembatan, dan mengisi tabel nilai tempat.";
const SUARA_Z2 = "Angka buku yang dipakai tadi: satu, empat, lima, dan sembilan per sepuluh; satu, tujuh, lima belas, dua puluh lima, enam puluh dua, dan delapan puluh satu per seratus.";
const SUARA_Z3 = "Pilih metode menurut keperluan: kisi untuk melihat bentuknya, jembatan untuk mengubah, tabel nilai tempat untuk memeriksa. Selalu cek dengan aturan: satu angka sepuluh, dua angka seratus.";

const KEGUNAAN = ["hitung angka menurut penyebut", "warnai kisi 100 kotak", "seberangi jembatan", "isi tabel nilai tempat"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["menghitung", "mewarnai", "menyeberang", "mengisi"][i], ...kartu(`r${i}`, 8, 32 + i * 40, 284, 32, WARNA_METODE[i], [`${m}: ${KEGUNAAN[i]}`], 8.2))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Angka buku yang dipakai")),
      tambah(0, ...barisTabel("rt0", 10, 34, [90, 190], ["jenis", "angka dari buku"], 24, 8.6, true)),
      tambah("sepuluh;", ...barisTabel("rt1", 10, 58, [90, 190], ["persepuluhan", "1/10, 4/10, 5/10, 9/10"], 24, 8.4)),
      tambah("tujuh,", ...barisTabel("rt2", 10, 82, [90, 190], ["perseratusan", "1/100, 7/100, 15/100, 25/100"], 24, 8.4)),
      tambah("enam", ...barisTabel("rt3", 10, 106, [90, 190], ["perseratusan", "62/100, 81/100"], 24, 8.4)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("kisi", ...kartu("p1", 14, 34, 272, 30, W.langit, ["kisi: melihat bentuknya"], 9.2)),
      tambah("jembatan", ...kartu("p2", 14, 70, 272, 30, W.krem, ["jembatan: mengubah"], 9.2)),
      tambah("tabel", ...kartu("p3", 14, 106, 272, 30, W.pink, ["tabel nilai tempat: memeriksa"], 9.2)),
      tambah("Selalu", ...kartu("p4", 14, 144, 272, 34, W.emas, ["1 angka: 10;  2 angka: 100"], 10)),
      tambah("seratus.", emo("p5", 150, 192, "✅", 18)),
    ),
  ],
};
