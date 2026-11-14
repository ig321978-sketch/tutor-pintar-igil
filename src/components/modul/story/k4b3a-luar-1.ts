import type { AdeganStory } from "./logika-story";
import { PERMEN_TABEL, W, barisTabel, benda, emo, judul, kartu, kotak, panah, teks } from "./k4b3a-gambar";
import { bersih, idx, k, sebar, sorotkan, tambah } from "./k4b3a-bantu";

export const NAMA_METODE = ["Repeating Pattern", "Growing Pattern", "Visual Structure", "Draw the Next Term"];
export const NAMA_METODE_ID = ["Pola Berulang", "Pola Bertambah", "Struktur Visual", "Gambar Suku Berikutnya"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔁", "➕", "🧩", "✏"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita melihat pola pada gambar yang berubah? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai contoh jeruk, kelereng, semangka, dan bola.";
const SUARA_O2 = "Empat metode itu: Repeating Pattern, Growing Pattern, Visual Structure, dan Draw the Next Term.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pola Berulang, Pola Bertambah, Struktur Visual, dan Gambar Suku Berikutnya.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: bagaimana kumpulan berikutnya? Dengan mengulang satuan, menambah selisih tetap, melihat bagian bentuk, dan menggambar lalu memeriksa.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membaca pola gambar",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("gambar", ...benda("po1", 40, 62, 1, 1, 12, 5, W.emas), ...benda("po2", 80, 62, 3, 3, 12, 5, W.hijau), ...benda("po3", 130, 62, 5, 5, 12, 5, W.biruMuda)),
      tambah("berbagai", emo("gl", 235, 80, "🌍", 40)),
      tambah("empat", ...kartu("pk4", 60, 130, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Repeating", "Growing", "Visual", "Draw"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Berulang", "Bertambah", "Struktur", "Gambar"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("mengulang", emo("i1", 45, 82, IKON_METODE[0], 32), teks("i1t", 45, 112, "mengulang", 8.4, W.biru)),
      tambah("menambah", emo("i2", 112, 82, IKON_METODE[1], 32), teks("i2t", 112, 112, "menambah", 8.4, W.biru)),
      tambah("melihat", emo("i3", 188, 82, IKON_METODE[2], 32), teks("i3t", 188, 112, "melihat", 8.4, W.biru)),
      tambah("menggambar", emo("i4", 258, 82, IKON_METODE[3], 32), teks("i4t", 258, 112, "menggambar", 8.4, W.biru)),
      tambah("berikutnya?", ...kartu("iq", 40, 136, 220, 30, W.emas, ["bagaimana kumpulan berikutnya?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Repeating Pattern: konsep ------------------------------ */
const SUARA_R1 = "Metode pertama, Repeating Pattern, atau Pola Berulang. Sebuah pola punya satuan yang berulang, misalnya tambah dua. Mengulang satuan itu membentuk kumpulan berikutnya.";
const SUARA_R2 = "Langkah pertama: temukan satuan yang berulang. Bandingkan dua kumpulan yang berdampingan dan lihat apa yang berubah. Satuannya bisa penambahan benda, bisa juga pengurangan benda.";
const SUARA_R3 = "Langkah kedua: ulangi satuan itu. Dari kumpulan terakhir, tambahkan satu satuan untuk kumpulan berikutnya, lalu satu satuan lagi untuk kumpulan sesudahnya.";
const SUARA_R4 = "Banyaknya pengulangan menentukan hasilnya. Untuk sampai ke kumpulan kelima dari kumpulan pertama, satuan itu diulang empat kali.";

/** Kotak satuan berisi dua benda dan label. */
const satuan = (id: string, x: number, label: string, warna: string) => [kotak(`${id}-k`, x, 74, 40, 40, W.putih, warna, { rx: 4, putus: true }), ...benda(id, x + 20, 86, 2, 1, 16, 5.5, warna, W.coklat), teks(`${id}-t`, x + 20, 128, label, 8.4, warna)];

export const ADEGAN_LUAR_ULANG: AdeganStory = {
  id: "luar-ulang",
  judul: "Repeating Pattern: satuan yang berulang",
  sumber: "Metode luar: Repeating Pattern",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Repeating Pattern")),
      tambah("pertama,", kepala(0)),
      tambah("satuan", ...satuan("sa", 20, "satuan", W.hijau)),
      tambah("Mengulang", ...satuan("sb", 80, "ulang 1", W.biruMuda), ...satuan("sc", 130, "ulang 2", W.biruMuda), ...satuan("sd", 180, "ulang 3", W.biruMuda)),
      tambah("berikutnya.", teks("se", 150, 160, "satuan yang sama diulang", 9.4, W.coklat)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Langkah 1: temukan satuannya")),
      tambah("dua", ...benda("ra", 40, 70, 3, 3, 14, 5, W.hijau), teks("rat", 54, 100, "kumpulan A", 8.4, W.biru), ...benda("rb", 200, 70, 5, 5, 14, 5, W.hijau), teks("rbt", 228, 100, "kumpulan B", 8.4, W.biru)),
      tambah("berubah.", panah("rp", 110, 72, 70, 0, W.merah, 2), teks("rq", 145, 62, "apa yang berubah?", 8.4, W.merah)),
      tambah("penambahan", ...kartu("rc1", 14, 120, 130, 34, W.hijauMuda, ["penambahan benda"], 9)),
      tambah("pengurangan", ...kartu("rc2", 156, 120, 130, 34, W.merahMuda, ["pengurangan benda"], 9)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Langkah 2: ulangi satuannya")),
      tambah("terakhir,", ...kartu("rd1", 10, 44, 80, 36, W.krem, ["kumpulan", "terakhir"], 8.2)),
      tambah("tambahkan", panah("rd2", 92, 62, 20, 0, W.hijau, 2), ...kartu("rd3", 114, 44, 80, 36, W.hijauMuda, ["kumpulan", "berikutnya"], 8.2)),
      tambah(idx(SUARA_R3, "lagi"), panah("rd4", 196, 62, 20, 0, W.hijau, 2), ...kartu("rd5", 218, 44, 72, 36, W.langit, ["kumpulan", "sesudahnya"], 8.2)),
      tambah("satuan@2", teks("rd6", 102, 100, "+ satuan", 9, W.hijau), teks("rd7", 206, 100, "+ satuan", 9, W.hijau)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Banyak pengulangan")),
      tambah(idx(SUARA_R4, "kumpulan", 2), ...kartu("rf1", 10, 50, 44, 30, W.krem, ["kum. 1"], 8)),
      ...[0, 1, 2, 3].map((i) => tambah(sebar(SUARA_R4, 4, idx(SUARA_R4, "satuan"))[i], ...kartu(`rg${i}`, 60 + i * 50, 50, 44, 30, W.hijauMuda, [`ulang ${i + 1}`], 8))),
      tambah("kali.", ...kartu("rh", 40, 108, 220, 34, W.emas, ["kum. 5 = kum. 1 + 4 ulangan"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Repeating Pattern: penerapan pada jeruk dan permen (Buku Siswa hlm. 89–93) ------------------------------ */
const SUARA_A1 = "Terapkan pada jeruk. Kumpulan pertama dua jeruk. Satuan yang berulang adalah tambah dua jeruk.";
const SUARA_A2 = "Kumpulan ketujuh memuat tujuh satuan dua jeruk. Tujuh satuan dua jeruk menjadi empat belas jeruk, sama dengan tabel jeruk.";
const SUARA_A3 = "Pola mengecil juga berulang. Permen: sembilan, tujuh, lima. Satuan yang berulang adalah kurang dua permen.";
const SUARA_A4 = "Ulangi kurang dua dari lima: tiga, lalu satu. Kumpulan kelima berisi satu permen, sama dengan tabel permen.";

const X_PERMEN = [30, 90, 150, 210, 266] as const;

export const ADEGAN_LUAR_ULANG_TERAPAN: AdeganStory = {
  id: "luar-ulang-terapan",
  judul: "Repeating Pattern pada jeruk dan permen",
  sumber: "Metode luar: Repeating Pattern",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Jeruk: satuan tambah dua")),
      tambah("pertama", kotak("ja1", 30, 56, 50, 50, W.putih, W.biru, { putus: true }), ...benda("jx1", 55, 70, 2, 1, 18, 6, W.oranye, W.coklat), teks("ja1t", 55, 122, "kumpulan 1: 2", 8.2, W.biru)),
      tambah("satuan", kotak("ja2", 150, 56, 50, 50, W.putih, W.hijau, { putus: true }), ...benda("jx2", 175, 70, 2, 1, 18, 6, W.oranye, W.coklat), teks("ja2t", 175, 122, "satuan: +2", 8.2, W.hijau)),
      tambah("tambah", panah("ja3", 90, 80, 50, 0, W.hijau, 2)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Kumpulan ke tujuh")),
      tambah("tujuh", ...Array.from({ length: 7 }, (_, i) => benda(`jy${i}`, 32 + i * 36, 66, 2, 1, 14, 5, W.oranye, W.coklat)).flat()),
      tambah("satuan", teks("jz1", 150, 112, "7 satuan, tiap satuan 2 jeruk", 9, W.coklat)),
      tambah("menjadi", teks("jz2", 150, 140, "7 × 2 = 14", 13, W.hijau)),
      tambah("tabel", ...kartu("jz3", 40, 156, 220, 28, W.krem, ["sama dengan tabel jeruk: 14"], 8.8)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Permen: satuan kurang dua")),
      ...[0, 1, 2].map((i) => tambah(["sembilan,", "tujuh,", "lima."][i], ...benda(`pa${i}`, X_PERMEN[i] - 9, 70, PERMEN_TABEL[i], 3, 9, 3.6, W.merahTua, W.coklat), teks(`pb${i}`, X_PERMEN[i], 122, String(PERMEN_TABEL[i]), 11, W.biru), teks(`pc${i}`, X_PERMEN[i], 136, `kumpulan ${i + 1}`, 7.6, W.coklat))),
      tambah("kurang", teks("pd1", 60, 56, "−2", 10, W.merah), teks("pd2", 120, 56, "−2", 10, W.merah)),
    ),
    k(
      SUARA_A4,
      tambah("tiga,", teks("pd3", 180, 56, "−2", 10, W.merah), ...benda("pa3", X_PERMEN[3] - 9, 70, 3, 3, 9, 3.6, W.merahTua, W.coklat), teks("pb3", X_PERMEN[3], 122, "3", 11, W.biru), teks("pc3", X_PERMEN[3], 136, "kumpulan 4", 7.6, W.coklat)),
      tambah("satu.", teks("pd4", 238, 56, "−2", 10, W.merah), ...benda("pa4", X_PERMEN[4] - 9, 70, 1, 3, 9, 3.6, W.merahTua, W.coklat), teks("pb4", X_PERMEN[4], 122, "1", 11, W.biru), teks("pc4", X_PERMEN[4], 136, "kumpulan 5", 7.6, W.coklat)),
      tambah("sama", ...kartu("pe", 50, 154, 200, 28, W.emas, ["kumpulan 5: 1 permen, cocok dengan tabel"], 8.2)),
    ),
  ],
};

/* ------------------------------ 4. Growing Pattern: konsep ------------------------------ */
const SUARA_G1 = "Metode kedua, Growing Pattern, atau Pola Bertambah. Pola yang tumbuh punya aturan: tiap langkah menambah jumlah yang sama. Van de Walle menekankan hubungan antara nomor kumpulan dan banyak benda.";
const SUARA_G2 = "Buat tabel dua kolom: nomor kumpulan dan banyak benda. Tambahkan kolom selisih untuk melihat berapa yang bertambah dari satu kumpulan ke kumpulan berikutnya.";
const SUARA_G3 = "Bila selisihnya selalu sama, polanya tumbuh teratur. Bila selisihnya berubah-ubah, aturannya harus dicari lagi.";
const SUARA_G4 = "Dengan aturan itu, kumpulan berikutnya bisa ditebak tanpa menggambar: banyak benda sebelumnya ditambah selisih tetap.";

const STAR = [1, 3, 5];

export const ADEGAN_LUAR_TUMBUH: AdeganStory = {
  id: "luar-tumbuh",
  judul: "Growing Pattern: aturan tumbuh dan tabel selisih",
  sumber: "Metode luar: Growing Pattern",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Growing Pattern")),
      tambah("kedua,", kepala(1)),
      tambah("aturan:", ...kartu("ga", 14, 60, 272, 34, W.hijauMuda, ["tiap langkah menambah jumlah yang sama"], 9)),
      tambah("Van", ...kartu("gb", 14, 104, 272, 44, W.krem, ["hubungan: nomor kumpulan", "dan banyak benda"], 9)),
      tambah("hubungan", emo("gc", 150, 184, "🔗", 24)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Tabel nomor dan banyak benda")),
      tambah("tabel", ...barisTabel("gt0", 30, 34, [70, 70], ["kumpulan", "banyak"], 20, 8.6, true)),
      ...STAR.map((n, i) => tambah(["kolom:", "nomor", "banyak"][i], ...barisTabel(`gt${i + 1}`, 30, 54 + i * 20, [70, 70], [String(i + 1), String(n)], 20, 9))),
      tambah("selisih", ...barisTabel("gs0", 170, 34, [60], ["selisih"], 20, 8.6, true), ...barisTabel("gs1", 170, 54, [60], ["–"], 20, 9), ...barisTabel("gs2", 170, 74, [60], ["2"], 20, 9), ...barisTabel("gs3", 170, 94, [60], ["2"], 20, 9)),
      tambah("bertambah", teks("gq", 150, 138, "contoh: 1, 3, 5 bertambah 2", 9, W.coklat)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Selisih sama atau berubah?")),
      tambah("sama,", ...kartu("gx1", 10, 34, 134, 64, W.hijauMuda, ["1, 3, 5", "selisih: 2 dan 2", "teratur"], 8.8)),
      tambah("berubah-ubah,", ...kartu("gx2", 156, 34, 134, 64, W.merahMuda, ["1, 2, 4 (contoh lain)", "selisih: 1 dan 2", "cari aturan lagi"], 8.4)),
      tambah("dicari", emo("gx3", 150, 130, "🔍", 28)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Menebak tanpa menggambar")),
      tambah("tanpa", ...kartu("gy1", 14, 34, 272, 40, W.krem, ["berikutnya = sebelumnya + selisih"], 9.4)),
      tambah("sebelumnya", teks("gy2", 150, 108, "5 + 2 = 7", 14, W.hijau)),
      tambah("tetap.", teks("gy3", 150, 138, "kumpulan ke-4 dari 1, 3, 5 adalah 7", 8.8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. Growing Pattern: penerapan pada kelereng (Buku Siswa hlm. 87–88 dan 91) ------------------------------ */
const SUARA_H1 = "Terapkan pada kelompok empat kegiatan kelereng: dua, lima, delapan kelereng. Buat tabel nomor kumpulan, banyak benda, dan selisih.";
const SUARA_H2 = "Selisihnya tiga dan tiga, selalu sama. Jadi aturannya: tiap kumpulan bertambah tiga kelereng.";
const SUARA_H3 = "Kumpulan keempat adalah delapan ditambah tiga, yaitu sebelas. Kumpulan kelima sebelas ditambah tiga, yaitu empat belas.";
const SUARA_H4 = "Pola mengecil memakai aturan yang sama dengan tanda kurang. Kelompok tiga kegiatan mengecil: tujuh, lima, tiga. Selisihnya kurang dua, jadi kumpulan keempat satu.";

const KOL_H = [70, 70, 70];
const hasil = (id: string, y: number, isi: string[]) => barisTabel(id, 60, y, KOL_H, isi, 18, 8.8);

export const ADEGAN_LUAR_TUMBUH_TERAPAN: AdeganStory = {
  id: "luar-tumbuh-terapan",
  judul: "Growing Pattern pada kelereng kelompok empat",
  sumber: "Metode luar: Growing Pattern",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Kelompok empat: 2, 5, 8")),
      tambah("kelompok", ...barisTabel("hh", 60, 30, KOL_H, ["kumpulan", "banyak", "selisih"], 18, 8.2, true)),
      tambah("dua,", ...hasil("h1", 48, ["1", "2", "–"])),
      tambah("lima,", ...hasil("h2", 66, ["2", "5", "3"])),
      tambah("delapan", ...hasil("h3", 84, ["3", "8", "3"])),
    ),
    k(
      SUARA_H2,
      sorotkan("tiga", "h2-s2", "h3-s2"),
      tambah("Selisihnya", ...kartu("hr", 40, 114, 220, 36, W.emas, ["aturan: tiap kumpulan", "bertambah 3 kelereng"], 8.8)),
      tambah("selalu", teks("hq", 150, 168, "selisih 3 dan 3: selalu sama", 9, W.hijau)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Kumpulan ke-4 dan ke-5")),
      tambah(0, ...barisTabel("hh", 60, 30, KOL_H, ["kumpulan", "banyak", "selisih"], 18, 8.2, true)),
      tambah(0, ...hasil("h1", 48, ["1", "2", "–"]), ...hasil("h2", 66, ["2", "5", "3"]), ...hasil("h3", 84, ["3", "8", "3"])),
      tambah("keempat", ...hasil("h4", 102, ["4", "11", "3"]), teks("hp1", 150, 156, "8 + 3 = 11", 11, W.hijau)),
      tambah("kelima", ...hasil("h5", 120, ["5", "14", "3"]), teks("hp2", 150, 174, "11 + 3 = 14", 11, W.hijau)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Pola mengecil: 7, 5, 3")),
      tambah("mengecil", ...barisTabel("hm", 60, 30, KOL_H, ["kumpulan", "banyak", "selisih"], 18, 8.2, true)),
      tambah("tujuh,", ...hasil("m1", 48, ["1", "7", "–"])),
      tambah("lima,", ...hasil("m2", 66, ["2", "5", "−2"])),
      tambah(idx(SUARA_H4, "tiga", 2), ...hasil("m3", 84, ["3", "3", "−2"])),
      tambah("keempat", ...hasil("m4", 102, ["4", "1", "−2"]), teks("mp", 150, 150, "3 − 2 = 1", 12, W.hijau)),
    ),
  ],
};
