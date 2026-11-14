import type { AdeganStory, Obj } from "./logika-story";
import { PAVING, PERAHU, type Titik } from "./k4b5b-data";
import { W, idDari, judul, kartu, keping, panah, poli, rumahAdat, skala, tabel, teks } from "./k4b5b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b5b-bantu";

/* ------------------------------ 6. Dekomposisi: ayo mengamati (Buku Siswa hlm. 170; Panduan Guru hlm. 198–200) ------------------------------ */
export const ADEGAN_MENGAMATI_DEK: AdeganStory = {
  id: "mengamati-dekomposisi",
  judul: "Dekomposisi: ayo mengamati rumah adat",
  sumber: "Buku Siswa hlm. 170; Panduan Guru hlm. 198–200",
  latar: "#FFFBEB",
  kutipan: [
    "2. Dekomposisi Bangun Datar",
    "Indonesia memiliki banyak suku dan kebudayaan yang beragam.",
    "Salah satu kebudayaan tersebut yaitu rumah adat.",
    "Utari sedang mengamati rumah adat masyarakat jawa.",
    "Apakah kalian bisa menunjukkan bentuk-bentuk bangun datar pada rumah adat Jawa?",
    "Bisa Bapak.",
    "menyajikan, menganalisis dan mengurai (dekomposisi) bangun datar menjadi beberapa bangun datar",
    "dan menentukan cara mengurai yang mungkin suatu bangun datar yang diberikan/diketahui",
    "Mengurai bangun datar berarti mengurai satu bangun datar sehingga menjadi beberapa bangun datar.",
    "bangun-bangun lainnya (pot bunga, gambar orang menari, roket, rumah, jembatan, dan sebagainya)",
  ],
  ketukan: [
    k(
      "Dekomposisi bangun datar. Ayo mengamati: Indonesia memiliki banyak suku dan kebudayaan, salah satunya rumah adat. Utari mengamati rumah adat masyarakat Jawa.",
      tambah(0, judul("Dekomposisi Bangun Datar")),
      tambah("suku", ...rumahAdat("ra", 102, 40, 2.4)),
      tambah("rumah@2", teks("ras", 150, 188, "rumah adat Jawa", 9.6, W.coklat)),
    ),
    k(
      "Bapak bertanya: bisakah kalian menunjukkan bentuk bangun datar pada rumah adat Jawa? Murid menjawab: bisa, Bapak.",
      ubah(0, { id: "ra-ap", x: 112 }, { id: "ra-ab", x: 112 }, { id: "ra-dn", x: 112 }, { id: "ra-pt", x: 112 }),
      tambah("bertanya:", ...kartu("pt1", 6, 56, 96, 52, W.langit, ["Apakah kalian bisa", "menunjukkan bentuk", "bangun datar?"], 7.4)),
      tambah("Murid", ...kartu("pt2", 220, 96, 72, 30, W.hijauMuda, ["Bisa Bapak."], 8.6)),
    ),
    k(
      "Tujuan menurut Panduan Guru: menyajikan, menganalisis, dan mengurai bangun datar menjadi beberapa bangun datar, serta menentukan cara mengurai yang mungkin.",
      bersih(0),
      tambah(0, judul("Tujuan dekomposisi")),
      tambah("menyajikan,", ...kartu("td1", 30, 36, 240, 28, W.langit, ["menyajikan dan menganalisis"], 9.6)),
      tambah("mengurai", ...kartu("td2", 30, 74, 240, 28, W.krem, ["mengurai bangun jadi beberapa bangun"], 9)),
      tambah("menentukan", ...kartu("td3", 30, 112, 240, 28, W.hijauMuda, ["menentukan cara mengurai yang mungkin"], 8.8)),
    ),
    k(
      "Mengurai berarti membagi satu bangun datar menjadi beberapa bangun datar. Bangunnya bisa pot bunga, orang menari, roket, rumah, atau jembatan.",
      bersih(0),
      tambah(0, judul("Mengurai: satu jadi beberapa")),
      tambah("Mengurai", poli("rr1", 30, 36, skala([[0, 4], [4, 4], [4, 8], [0, 8]], 14), "#FFF200", W.coklat, { tebal: 1.2 }), poli("rr2", 30, 36, skala([[0, 4], [4, 4], [2, 0]], 14), "#FAA61A", W.coklat, { tebal: 1.2 })),
      tambah("membagi", panah("rra", 100, 92, 40, 0, W.merah, 2.4)),
      tambah("beberapa", poli("rs1", 170, 44, skala([[0, 4], [4, 4], [4, 8], [0, 8]], 14), "#FFF200", W.coklat, { tebal: 1.2 }), poli("rs2", 170, 34, skala([[0, 4], [4, 4], [2, 0]], 14), "#FAA61A", W.coklat, { tebal: 1.2 })),
      tambah("beberapa", teks("rt1", 58, 170, "1 bangun", 9.4, W.biru), teks("rt2", 198, 170, "2 bangun", 9.4, W.biru)),
      tambah("jembatan.", teks("rt3", 150, 188, "pot bunga, orang menari, roket, rumah, jembatan", 7.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 7. Aktivitas 7: dekomposisi bangun datar (Buku Siswa hlm. 170–172; Panduan Guru hlm. 200) ------------------------------ */
const TB = tabel("tb", 20, 36, [96, 92, 72], [["Bentuk Bangun Datar", "Nama", "Banyaknya"], ["", "Trapesium", "2"], ["", "...", "..."], ["", "...", "..."], ["", "...", "..."], ["", "...", "..."]], 24, 7.8);
export const ADEGAN_AKTIVITAS_7: AdeganStory = {
  id: "aktivitas-7",
  judul: "Aktivitas 7: dekomposisi bangun datar",
  sumber: "Buku Siswa hlm. 170–172; Panduan Guru hlm. 200",
  latar: "#F0FDFA",
  kutipan: [
    "Aktivitas 7. Dekomposisi Bangun Datar",
    "penggaris",
    "Buatlah kelompok dengan anggota 3-4 orang.",
    "Perhatikan rumah adat masyarakat jawa dengan atap “KAMPUNG”.",
    "Carilah jenis bangun datar yang ada pada gambar rumah tersebut dan catatlah pada buku tulis kalian seperti pada tabel berikut.",
    "Bentuk Bangun Datar Nama Banyaknya",
    "Trapesium",
    "Diskusi bersama anggota kelompok, ada berapa jenis bangun datar yang kalian peroleh? Sebutkan.",
    "Presentasikan hasilnya di depan kelas dengan percaya diri.",
    "dapatkah kalian menyimpulkan apakah dekomposisi bangun datar itu?",
    "Guru memberi kesempatan setiap kelompok untuk mempresentasikan hasil diskusi kelompok.",
    "Guru bersama peserta didik merumuskan kesimpulan.",
  ],
  ketukan: [
    k(
      "Aktivitas tujuh, dekomposisi bangun datar. Alat: alat tulis dan penggaris. Kelompok tiga sampai empat orang memperhatikan rumah adat Jawa dengan atap Kampung.",
      tambah(0, judul("Aktivitas 7")),
      tambah("Alat:", ...kartu("b71", 10, 40, 100, 26, W.krem, ["alat tulis"], 8.6)),
      tambah("penggaris.", ...kartu("b72", 10, 74, 100, 26, W.langit, ["penggaris"], 8.6)),
      tambah("orang", ...kartu("b73", 10, 108, 100, 26, W.pink, ["3 sampai 4 orang"], 8.6)),
      tambah("atap", ...rumahAdat("ak", 176, 38, 2.2)),
      tambah("Kampung.", teks("akt", 220, 170, "atap Kampung", 9, W.coklat), teks("akl", 220, 186, "(ada juga Joglo dan Limasan)", 6.6, W.coklat)),
    ),
    k(
      "Carilah jenis bangun datar pada gambar rumah itu, lalu catat di tabel: bentuk bangun datar, nama, dan banyaknya.",
      bersih(0),
      tambah(0, judul("Catat bangun datar pada rumah")),
      tambah("tabel:", ...TB),
      tambah("Carilah", poli("tbm", 46, 66, skala([[8, 0], [34, 0], [42, 14], [0, 14]], 1), "#3B9AE0", W.biru, { tebal: 0.8 })),
    ),
    k(
      "Contoh baris pertama dari buku: trapesium, banyaknya dua. Pada gambar atap Kampung tampak segitiga di puncak, trapesium di atap bawah, dan persegi panjang pada dinding dan pintu.",
      hapus(0, ...idDari(TB), "tbm"),
      tambah("Contoh", ...rumahAdat("ak", 16, 40, 2.3)),
      tambah("trapesium,", ...kartu("cb1", 112, 44, 176, 26, W.krem, ["contoh buku: trapesium 2"], 8.6)),
      tambah("segitiga", ...kartu("cb2", 112, 80, 176, 26, W.langit, ["puncak atap: segitiga"], 8.6)),
      tambah("trapesium@2", ...kartu("cb3", 112, 116, 176, 26, W.hijauMuda, ["atap bawah: trapesium"], 8.6)),
      tambah("persegi", ...kartu("cb4", 112, 152, 176, 26, W.pink, ["dinding dan pintu: persegi panjang"], 7.8)),
    ),
    k(
      "Lalu diskusikan ada berapa jenis bangun datar yang diperoleh, presentasikan hasilnya di depan kelas dengan percaya diri, dan simpulkan apakah dekomposisi itu. Guru ikut merumuskan kesimpulan.",
      bersih(0),
      tambah(0, judul("Diskusi, presentasi, kesimpulan")),
      tambah("diskusikan", ...kartu("s41", 14, 36, 272, 30, W.langit, ["4. diskusi: ada berapa jenis bangun?"], 9)),
      tambah("presentasikan", ...kartu("s42", 14, 76, 272, 30, W.krem, ["5. presentasikan dengan percaya diri"], 9)),
      tambah("simpulkan", ...kartu("s43", 14, 116, 272, 30, W.hijauMuda, ["6. simpulkan: apa dekomposisi itu?"], 9)),
      tambah("Guru", teks("s44", 150, 172, "guru dan siswa merumuskan kesimpulan", 8.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih 1: perahu layar (Buku Siswa hlm. 172–173; Panduan Guru hlm. 200–201) ------------------------------ */
const SP = 0.68;
const perahu = (x: number, y: number): Obj[] => PERAHU.map((p, i) => keping(`ph-p${i}`, x, y, p, SP));
const MINI: Record<string, Titik[]> = {
  segitiga: [[0, 14], [16, 14], [0, 0]],
  jajargenjang: [[4, 0], [20, 0], [16, 12], [0, 12]],
  persegi: [[0, 0], [14, 0], [14, 14], [0, 14]],
};
const WARNA_MINI: Record<string, string> = { segitiga: "#0066B3", jajargenjang: "#FAA61A", persegi: "#40AD49" };
const baris = (nama: string, r: number): Obj[] => [poli(`tl-m${r}`, 214, 34 + 22 * r + 4, MINI[nama], WARNA_MINI[nama], W.putih, { tebal: 0.6 })];
export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-1",
  judul: "Ayo Berlatih 1: perahu layar",
  sumber: "Buku Siswa hlm. 172–173; Panduan Guru hlm. 200–201",
  latar: "#EFF6FF",
  kutipan: [
    "Kerjakan soal berikut pada buku tulis kalian.",
    "Lakukan dekomposisi berbagai macam bangun datar yang ada pada",
    "No Nama Bangun Datar Gambar Banyaknya",
    "Guru meminta kepada seluruh peserta didik mengerjakan Latihan 3 sebagai berikut.",
    "Coba uraikan (dekomposisi) berbagai macam bangun datar yang ada pada",
    "Jajargenjang",
    "Persegi",
  ],
  ketukan: [
    k(
      "Ayo berlatih satu: lakukan dekomposisi berbagai bangun datar pada gambar perahu layar. Isi tabel: nomor, nama bangun datar, gambar, dan banyaknya.",
      tambah(0, judul("Ayo Berlatih 1")),
      tambah("perahu", ...perahu(8, 44)),
      tambah("tabel:", ...tabel("tl", 148, 34, [52, 46, 46], [["Nama", "Gambar", "Banyaknya"], ["Segitiga", "", "..."], ["Jajargenjang", "", "..."], ["Persegi", "", "..."]], 22, 6.8)),
    ),
    k(
      "Kunci Panduan Guru: segitiga sebanyak lima, jajargenjang satu, dan persegi satu. Panduan Guru menyebutnya latihan tiga, padahal di Buku Siswa tidak bernomor.",
      ...["segitiga", "jajargenjang", "persegi"].flatMap((n, i) => baris(n, i + 1).map((o) => ({ at: "segitiga", tambah: o }))),
      ubah("lima,", { id: "tl-t12", isi: "5", warna: W.merah }),
      ubah("jajargenjang", { id: "tl-t22", isi: "1", warna: W.merah }),
      ubah("persegi", { id: "tl-t32", isi: "1", warna: W.merah }),
      tambah("latihan", teks("tlc", 220, 140, "Latihan 3 (Panduan Guru)", 6.8, W.coklat)),
    ),
    k(
      "Hitungan mandiri dari gambar cocok: lima segitiga, satu jajargenjang, dan satu persegi. Lima tambah satu tambah satu sama dengan tujuh keping, sama seperti tangram.",
      hapus(0, "tlc"),
      sorotkan("segitiga", ...[0, 1, 5, 6, 3].map((i) => `ph-p${i}`)),
      sorotkan("jajargenjang", "ph-p2"),
      sorotkan("persegi.", "ph-p4"),
      tambah("tambah", ...kartu("tlj", 148, 130, 144, 26, W.krem, ["5 + 1 + 1 = 7 keping"], 9.4)),
      tambah("tangram.", teks("tlk", 220, 172, "sama dengan keping tangram", 7.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berlatih 2: motif paving (Buku Siswa hlm. 173; Panduan Guru hlm. 201–202) ------------------------------ */
const SV = 1.15;
const JENIS_PAVING = ["segitiga", "trapesium", "jajargenjang", "trapesium", "persegi panjang", "segitiga", "persegi", "segitiga", "trapesium", "segitiga"];
const WARNA_JENIS: Record<string, string> = { segitiga: "#0066B3", trapesium: "#FAA61A", jajargenjang: "#ED008C", persegi: "#FFF200", "persegi panjang": "#8B5CF6" };
export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-2",
  judul: "Ayo Berlatih 2: motif paving",
  sumber: "Buku Siswa hlm. 173; Panduan Guru hlm. 201–202",
  latar: "#F7FEE7",
  kutipan: [
    "Lakukan dekomposisi berbagai macam bangun datar yang ada pada",
    "Setelah kalian mengamati gambar di atas, apa saja bangun datar yang",
    "menyusun motif paving di atas?",
    "Lingkari setiap bangun berikut yang menyusun motif paving pada gambar",
  ],
  ketukan: [
    k(
      "Soal dua: lakukan dekomposisi bangun datar pada gambar motif paving. Lingkari setiap bangun, dari sebelas pilihan, yang menyusun motif paving.",
      tambah(0, judul("Ayo Berlatih 2: motif paving")),
      tambah("paving.", ...PAVING.map((p, i) => keping(`pv-p${i}`, 10, 40, p, SV))),
      tambah("sebelas", ...kartu("pv1", 196, 50, 92, 40, W.krem, ["11 pilihan bangun", "untuk dilingkari"], 7.6)),
    ),
    k(
      "Panduan Guru hanya mengulang soal dan tidak memberi kunci. Hitungan mandiri dari gambar: motif tersusun dari sepuluh keping.",
      tambah("hanya", ...kartu("pv2", 196, 100, 92, 40, W.langit, ["tanpa kunci di", "Panduan Guru"], 7.6)),
      ...PAVING.map((_, i) => ubah(i < 5 ? "sepuluh" : "keping.", { id: `pv-p${i}`, warna: WARNA_JENIS[JENIS_PAVING[i]] })),
      tambah("sepuluh", ...kartu("pv3", 196, 148, 92, 28, W.hijauMuda, ["10 keping"], 9.6)),
    ),
    k(
      "Sepuluh keping itu: empat segitiga siku-siku, tiga trapesium, satu jajargenjang, satu persegi, dan satu persegi panjang. Empat tambah tiga tambah satu tambah satu tambah satu sama dengan sepuluh.",
      hapus(0, "pv1-k", "pv1-t0", "pv1-t1", "pv2-k", "pv2-t0", "pv2-t1", "pv3-k", "pv3-t0"),
      tambah("segitiga", ...kartu("lg1", 186, 36, 104, 20, "#BFDBFE", ["4 segitiga siku-siku"], 7.2)),
      tambah("trapesium,", ...kartu("lg2", 186, 60, 104, 20, "#FED7AA", ["3 trapesium"], 7.8)),
      tambah("jajargenjang,", ...kartu("lg3", 186, 84, 104, 20, W.pink, ["1 jajargenjang"], 7.8)),
      tambah("persegi,", ...kartu("lg4", 186, 108, 104, 20, "#FEF08A", ["1 persegi"], 7.8)),
      tambah("persegi@2", ...kartu("lg5", 186, 132, 104, 20, "#DDD6FE", ["1 persegi panjang"], 7.8)),
      tambah("Empat@2", ...kartu("lg6", 186, 158, 104, 26, W.hijauMuda, ["4 + 3 + 1 + 1 + 1 = 10"], 7.8)),
    ),
    k(
      "Jadi menurut jenisnya yang menyusun motif: persegi, persegi panjang, segitiga siku-siku, trapesium, dan jajargenjang. Lingkaran, segienam, segitiga sama sisi, dan belah ketupat bukan. Ini hitungan mandiri, bukan kunci buku.",
      hapus(0, "lg1-k", "lg1-t0", "lg2-k", "lg2-t0", "lg3-k", "lg3-t0", "lg4-k", "lg4-t0", "lg5-k", "lg5-t0", "lg6-k", "lg6-t0"),
      tambah("persegi,", ...kartu("pl", 180, 34, 112, 82, W.hijauMuda, ["✔ persegi", "✔ persegi panjang", "✔ segitiga siku-siku", "✔ trapesium", "✔ jajargenjang"], 7.4)),
      tambah("Lingkaran,", ...kartu("pm", 180, 124, 112, 56, W.merahMuda, ["✖ lingkaran, segienam", "✖ segitiga sama sisi", "✖ belah ketupat"], 7.4)),
      tambah("Ini", teks("pn", 100, 188, "bukan kunci buku: hitungan mandiri", 7.6, W.coklat)),
    ),
  ],
};
