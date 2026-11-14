import type { AdeganStory } from "./logika-story";
import { BENTUK_LATIHAN, TIARA, W, barisTabel, emo, garis, judul, kartu, kincir, kipas, kisi, lingkaranBagi, pecahan, teks } from "./k4b2a-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b2a-bantu";

export const NAMA_METODE = ["Unit Fraction", "Area Model", "Number Line Unit", "Fair Sharing"];
export const NAMA_METODE_ID = ["Pecahan Satuan", "Model Daerah", "Pecahan di Garis", "Bagi Adil"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🍕", "🧩", "📏", "👥"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita membandingkan dua pecahan dengan pembilang satu, mana yang lebih besar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.";
const SUARA_O2 = "Empat metode itu: Unit Fraction, Area Model, Number Line Unit, dan Fair Sharing.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pecahan Satuan, Model Daerah, Pecahan di Garis, dan Bagi Adil. Metode keempat adalah tambahan yang cocok dengan soal pizza di buku.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: pecahan mana yang lebih besar? Dengan menghitung bagian sama, membandingkan luas arsiran, menaruh titik pada garis, dan membagi benda kepada sejumlah orang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membandingkan pecahan",
  sumber: "Metode luar: pembuka; BS hlm. 55–63",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("pecahan", ...kisi("po1", 40, 50, 2, 1, 50, 30, 1), ...kisi("po2", 40, 92, 4, 1, 25, 30, 1)),
      tambah("lebih", teks("pq", 215, 108, "?", 44, W.merah)),
      tambah("berbagai", emo("gl", 245, 182, "🌍", 30)),
      tambah("empat", ...kartu("pk4", 20, 148, 180, 30, W.emas, ["4 metode dari luar"], 9.6)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Unit", "Area", "Number", "Fair"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Satuan", "Daerah", "Garis", "Adil"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
      tambah("tambahan", emo("n4", 262, 140, "⭐", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("menghitung", emo("i1", 45, 82, IKON_METODE[0], 32), teks("i1t", 45, 112, "hitung bagian", 8, W.biru)),
      tambah("membandingkan", emo("i2", 112, 82, IKON_METODE[1], 32), teks("i2t", 112, 112, "luas arsiran", 8, W.biru)),
      tambah("menaruh", emo("i3", 188, 82, IKON_METODE[2], 32), teks("i3t", 188, 112, "titik di garis", 8, W.biru)),
      tambah("membagi", emo("i4", 258, 82, IKON_METODE[3], 32), teks("i4t", 258, 112, "bagi orang", 8, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 40, 136, 220, 30, W.emas, ["pecahan mana yang lebih besar?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Unit Fraction: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, Unit Fraction, atau Pecahan Satuan. Pecahan satuan adalah pecahan yang pembilangnya satu, yaitu satu bagian dari sejumlah bagian yang sama.";
const SUARA_S2 = "Langkah pertama: pastikan keseluruhan terbagi menjadi bagian yang sama besar. Bagian yang tidak sama besar tidak boleh dipakai untuk menyebut pecahan.";
const SUARA_S3 = "Langkah kedua: hitung banyak bagian sama, yaitu lima, dan banyak itu menjadi penyebut. Langkah ketiga: ambil satu bagian, dan satu itulah pembilangnya.";
const SUARA_S4 = "Pecahan satuan dibaca satu dari sekian bagian sama. Jadi cukup lihat penyebutnya untuk tahu ada berapa bagian, dan pembilangnya selalu satu.";

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Unit Fraction: satu bagian dari bagian sama",
  sumber: "Metode luar: Unit Fraction",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Unit Fraction")),
      tambah("pertama,", kepala(0)),
      tambah("pembilangnya", ...kisi("sa", 30, 70, 4, 1, 60, 36, 1)),
      tambah("satu@3", teks("sb", 60, 124, "1/n", 12, W.merah), teks("sc", 150, 124, "satu bagian dari n bagian sama", 8.6, W.biru)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Bagian harus sama besar")),
      tambah("sama", ...kisi("sd", 30, 60, 4, 1, 60, 34, 0), teks("se", 150, 108, "sama besar: benar", 9, W.hijau), emo("sf", 275, 84, "✅", 20)),
      tambah("tidak", ...[[30, 20, W.langit], [50, 90, W.putih], [140, 40, W.langit], [180, 90, W.putih]].map(([x, w, c], i) => ({ id: `su${i}`, t: "kotak" as const, x: x as number, y: 124, w: w as number, h: 34, warna: c as string, garis: W.biru, rx: 0, tebal: 1.4 })), teks("sx", 150, 172, "tidak sama besar: salah", 9, W.merah), emo("sy", 275, 148, "❌", 20)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Hitung bagian, ambil satu")),
      tambah("hitung", ...kisi("sg", 30, 56, 5, 1, 48, 36, 1)),
      tambah("lima,", ...kartu("sh", 14, 110, 130, 28, W.langit, ["5 bagian sama: penyebut"], 8.4)),
      tambah("ambil", ...kartu("si", 156, 110, 130, 28, W.krem, ["1 diambil: pembilang"], 8.6)),
      tambah("pembilangnya.", ...pecahan("sj", 150, 168, "1", "5", 20)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Dibaca: satu dari sekian")),
      tambah("dibaca", ...pecahan("sk", 80, 96, "1", "5", 40)),
      tambah("satu@2", ...kartu("sl", 140, 66, 150, 44, W.hijauMuda, ["dibaca: satu dari lima", "bagian sama"], 8.8)),
      tambah("penyebutnya", teks("sm", 215, 134, "penyebut: ada berapa bagian", 8.2, W.coklat)),
      tambah("pembilangnya", teks("sn", 215, 152, "pembilang: selalu 1", 8.2, W.coklat)),
    ),
  ],
};

/* ------------------------------ 3. Unit Fraction: penerapan dengan angka buku ------------------------------ */
const SUARA_T1 = "Terapkan pada pizza di buku. Pizza dipotong empat bagian yang sama, dan tiap anak mendapat satu bagian. Penyebutnya empat, pembilangnya satu, jadi satu per empat.";
const SUARA_T2 = "Kisi pada soal latihan nomor tiga punya lima kolom dan dua baris. Hitung bagian sama: ada sepuluh, satu diarsir, jadi satu per sepuluh.";
const SUARA_T3 = "Kincir pada nomor empat punya tiga bagian sama, jadi satu per tiga. Kipas pada nomor lima punya lima kelopak sama, jadi satu per lima.";
const SUARA_T4 = "Periksa dengan kunci buku: segitiga satu per dua, batang satu per empat, kisi satu per sepuluh, kincir satu per tiga, dan kipas satu per lima. Semuanya cocok dengan hitungan bagian.";

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Unit Fraction pada gambar buku",
  sumber: "Metode luar: Unit Fraction; BS hlm. 58–60",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Unit Fraction: pizza buku")),
      tambah("Terapkan", kepala(0)),
      tambah("pizza", ...lingkaranBagi("ua", 90, 122, 46, 4, 1, W.jingga)),
      tambah("tiap", teks("ub", 215, 80, "4 bagian sama", 9, W.biru), teks("ub2", 215, 94, "tiap anak: 1 bagian", 9, W.biru)),
      tambah("jadi", ...pecahan("uc", 215, 140, "1", "4", 32)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Kisi lima kolom, dua baris")),
      tambah("kisi", ...kisi("ud", 30, 50, 5, 2, 34, 32, 1)),
      tambah("sepuluh,", teks("ue", 115, 134, "10 bagian sama", 9.4, W.biru)),
      tambah("jadi", ...pecahan("uf", 240, 90, "1", "10", 30)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kincir dan kipas")),
      tambah("Kincir", ...kincir("ug", 70, 112, 52, 1)),
      tambah("jadi@1", ...pecahan("uh", 142, 112, "1", "3", 22)),
      tambah("Kipas", ...kipas("ui", 235, 150, 50, 5, 22, -130, 1)),
      tambah("jadi@2", ...pecahan("uj", 250, 70, "1", "5", 22)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Cocok dengan kunci buku")),
      tambah("Periksa", ...barisTabel("uk0", 20, 28, [90, 80, 90], ["gambar", "penyebut", "pecahan"], 22, 8.6, true)),
      ...BENTUK_LATIHAN.map(([n, a], i) => tambah(["segitiga", "batang", "kisi", "kincir", "kipas"][i], ...barisTabel(`uk${i + 1}`, 20, 28 + (i + 1) * 22, [90, 80, 90], [["segitiga", "batang", "kisi", "kincir", "kipas"][i], String(n), `${a}/${n}`], 22, 9))),
      tambah("cocok", emo("ul", 150, 186, "✅", 20)),
    ),
  ],
};

/* ------------------------------ 4. Area Model: konsep ------------------------------ */
const SUARA_D1 = "Metode kedua, Area Model, atau Model Daerah. Pecahan dipandang sebagai luas daerah yang diarsir dari keseluruhan. Untuk membandingkan, samakan dulu keseluruhannya.";
const SUARA_D2 = "Langkah pertama: gambar dua benda yang sama besar, lalu bagi masing-masing sesuai penyebutnya. Langkah kedua: arsir satu bagian pada tiap gambar.";
const SUARA_D3 = "Langkah ketiga: bandingkan luas arsiran. Yang arsirannya lebih luas, pecahannya lebih besar. Syarat utamanya, keseluruhan kedua gambar harus sama besar.";
const SUARA_D4 = "Bila keseluruhannya berbeda, arsiran yang sama luas menipu, seperti gambar nomor tiga di buku yang memakai petak sama lebar. Karena itu keseluruhan harus sama.";

export const ADEGAN_LUAR_DAERAH: AdeganStory = {
  id: "luar-daerah",
  judul: "Area Model: luas daerah arsiran",
  sumber: "Metode luar: Area Model",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Area Model")),
      tambah("kedua,", kepala(1)),
      tambah("luas", ...kisi("da", 30, 66, 2, 1, 60, 34, 0), ...kisi("db", 30, 112, 3, 1, 40, 34, 0)),
      tambah("samakan", teks("dc", 215, 100, "keseluruhan", 9, W.coklat), teks("dd", 215, 112, "sama besar", 9, W.coklat)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Bagi lalu arsir satu bagian")),
      tambah(0, ...kisi("da", 30, 60, 2, 1, 60, 34, 0), ...kisi("db", 30, 112, 3, 1, 40, 34, 0)),
      tambah("bagi", teks("de", 150, 170, "bagi sesuai penyebut", 9, W.biru)),
      tambah("arsir", ...pecahan("dg", 215, 78, "1", "2", 22), ...pecahan("dh", 215, 130, "1", "3", 22)),
      ubah("arsir", { id: "da-c0", warna: W.emas }, { id: "db-c0", warna: W.emas }),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Bandingkan luas arsiran")),
      tambah(0, ...kisi("da", 30, 60, 2, 1, 60, 34, 1), ...kisi("db", 30, 112, 3, 1, 40, 34, 1)),
      tambah("bandingkan", ...pecahan("dg", 215, 78, "1", "2", 22), ...pecahan("dh", 215, 130, "1", "3", 22)),
      sorotkan("luas", "da-c0"),
      tambah("Syarat", ...kartu("di", 20, 160, 260, 30, W.emas, ["syarat: keseluruhan sama besar"], 9.4)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Awas: keseluruhan berbeda")),
      tambah("berbeda,", ...kisi("dz1", 20, 54, 3, 1, 24, 30, 1), ...kisi("dz2", 20, 100, 4, 1, 24, 30, 1)),
      tambah("sama@2", teks("dz3", 175, 74, "1/3: batang pendek", 8.6, W.biru), teks("dz4", 175, 120, "1/4: batang panjang", 8.6, W.biru)),
      tambah("menipu", ...kartu("dz5", 20, 146, 260, 40, W.merahMuda, ["arsiran sama luas, tetapi", "keseluruhannya berbeda: menipu"], 8.8)),
    ),
  ],
};

/* ------------------------------ 5. Area Model: penerapan dengan angka buku ------------------------------ */
const SUARA_E1 = "Terapkan pada angka buku. Dua batang sama panjang: satu dibagi dua dan satu dibagi empat, masing-masing satu bagian diarsir. Arsiran satu per dua lebih luas, jadi satu per dua lebih besar.";
const SUARA_E2 = "Batang sama panjang lainnya: satu dibagi sepuluh dan satu dibagi lima. Arsiran satu per sepuluh lebih sempit, jadi satu per sepuluh kurang dari satu per lima.";
const SUARA_E3 = "Nomor dua di soal latihan: kisi dengan enam bagian, satu diarsir, dan kisi dengan tiga bagian, satu diarsir. Keseluruhan sama besar, arsiran satu per enam lebih sempit, jadi kurang dari satu per tiga.";
const SUARA_E4 = "Soal Tiara: bawang putih satu per dua kilogram dan gula satu per empat kilogram. Gambar dua batang sama panjang, arsiran satu per dua lebih luas, jadi bawang putih lebih berat.";

export const ADEGAN_LUAR_DAERAH_TERAPAN: AdeganStory = {
  id: "luar-daerah-terapan",
  judul: "Area Model pada soal buku",
  sumber: "Metode luar: Area Model; BS hlm. 60–63",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Area Model: setengah dan seperempat")),
      tambah("Terapkan", kepala(1)),
      tambah("batang", ...kisi("va", 30, 66, 2, 1, 60, 34, 1), ...kisi("vb", 30, 116, 4, 1, 30, 34, 1)),
      tambah("dibagi", ...pecahan("var", 215, 76, "1", "2", 24), ...pecahan("vbr", 215, 136, "1", "4", 24)),
      tambah("luas,", teks("vs", 262, 112, ">", 30, W.merah)),
      sorotkan("luas,", "va-c0"),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Area Model: sepersepuluh dan seperlima")),
      tambah("sepuluh", ...kisi("vc", 20, 60, 10, 1, 18, 34, 1), ...pecahan("vcr", 245, 77, "1", "10", 24)),
      tambah("lima.", ...kisi("vd", 20, 116, 5, 1, 36, 34, 1), ...pecahan("vdr", 245, 133, "1", "5", 24)),
      tambah("sempit,", garis("vk", 20, 101, 18, 0, W.merah, 2.6), teks("vt", 29, 111, "sempit", 8, W.merah)),
      tambah("kurang", teks("vs2", 284, 110, "<", 28, W.merah)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Area Model: nomor dua")),
      tambah("enam", ...kisi("we", 20, 56, 3, 2, 28, 30, 1)),
      tambah("tiga", ...kisi("wf", 130, 56, 3, 1, 28, 60, 1)),
      tambah("sempit,", ...pecahan("wer", 62, 150, "1", "6", 22), ...pecahan("wfr", 172, 150, "1", "3", 22)),
      tambah("kurang", teks("wg", 117, 160, "<", 26, W.merah)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Area Model: soal Tiara")),
      tambah("bawang", teks("xa", 50, 86, "bawang putih", 8.4, W.biru), ...kisi("xb", 100, 66, 2, 1, 70, 30, 1), teks("xc", 270, 86, `1/${TIARA.bawang} kg`, 9, W.biru)),
      tambah("gula", teks("xd", 50, 136, "gula", 8.4, W.biru), ...kisi("xe", 100, 116, 4, 1, 35, 30, 1), teks("xf", 270, 136, `1/${TIARA.gula} kg`, 9, W.biru)),
      tambah("lebih@2", ...kartu("xg", 20, 160, 260, 30, W.emas, ["bawang putih lebih berat"], 10)),
    ),
  ],
};
