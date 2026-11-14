import type { AdeganStory } from "./logika-story";
import { URAIAN_10000, URAIAN_7300, W, bulat, deretUang, garis, idUang, ikatan, judul, kartu, panah, teks } from "./k4b1d-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1d-bantu";
import { kepala } from "./k4b1d-luar-1";

/* ------------------------------ 1. Flexible Grouping: konsep ------------------------------ */
const SUARA_F1 = "Flexible Grouping berarti mengelompokkan secara luwes. Sepuluh satuan bisa ditukar menjadi satu puluhan, dan sepuluh puluhan menjadi satu ratusan.";
const SUARA_F2 = "Sepuluh ratusan ditukar menjadi satu ribuan. Jadi sebuah bilangan bisa dikelompokkan dengan banyak cara, tetapi nilainya tidak berubah.";
const SUARA_F3 = "Contoh tujuh ribu tiga ratus rupiah: tujuh ribuan dan tiga ratusan. Atau enam ribuan dan tiga belas ratusan, sebab satu ribuan ditukar menjadi sepuluh ratusan.";
const SUARA_F4 = "Atau tujuh puluh tiga ratusan, sebab tujuh puluh tiga kali seratus sama dengan tujuh ribu tiga ratus.";

export const ADEGAN_LUAR_KELOMPOK: AdeganStory = {
  id: "luar-kelompok",
  judul: "Flexible Grouping: menukar kelompok, nilai tetap",
  sumber: "Metode luar: Flexible Grouping (contoh video)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Flexible Grouping"), kepala(2)),
      tambah(idx(SUARA_F1, "Sepuluh"), ...Array.from({ length: 10 }, (_, i) => bulat(`fd${i}`, 32 + i * 14, 70, 5, W.pink, W.biru, { tebal: 1.2 }))),
      tambah(idx(SUARA_F1, "satuan"), teks("fl", 95, 92, "10 satuan", 8.6, W.biru)),
      tambah(idx(SUARA_F1, "puluhan,"), panah("fa1", 176, 70, 24, 0, W.biru, 2), ...kartu("fk1", 206, 58, 80, 24, W.krem, ["1 puluhan"], 9)),
      tambah(idx(SUARA_F1, "sepuluh", 2), ...kartu("fk2", 20, 104, 110, 26, W.krem, ["10 puluhan"], 9.4), panah("fa2", 136, 117, 34, 0, W.biru, 2)),
      tambah(idx(SUARA_F1, "ratusan."), ...kartu("fk3", 176, 104, 110, 26, W.hijauMuda, ["1 ratusan"], 9.4)),
    ),
    k(
      SUARA_F2,
      tambah(idx(SUARA_F2, "Sepuluh"), ...kartu("fk4", 20, 138, 110, 26, W.hijauMuda, ["10 ratusan"], 9.4), panah("fa3", 136, 151, 34, 0, W.biru, 2)),
      tambah(idx(SUARA_F2, "ribuan."), ...kartu("fk5", 176, 138, 110, 26, W.langit, ["1 ribuan"], 9.4)),
      tambah(idx(SUARA_F2, "nilainya"), teks("fn", 150, 188, "nilainya tidak berubah", 9.6, W.coklat)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Satu bilangan, banyak kelompok"), kepala(2)),
      tambah(idx(SUARA_F3, "tujuh"), ...kartu("ga", 14, 58, 272, 28, W.hijauMuda, ["7.300 = 7 ribuan + 3 ratusan"], 10)),
      tambah(idx(SUARA_F3, "Atau"), ...kartu("gb", 14, 94, 272, 28, W.langit, ["7.300 = 6 ribuan + 13 ratusan"], 10)),
      tambah(idx(SUARA_F3, "sebab"), teks("gc", 150, 140, "1 ribuan ditukar 10 ratusan", 9.6, W.coklat)),
    ),
    k(
      SUARA_F4,
      tambah(idx(SUARA_F4, "Atau"), ...kartu("gd", 14, 150, 272, 28, W.pink, ["7.300 = 73 ratusan"], 10)),
      tambah(idx(SUARA_F4, "kali"), teks("ge", 150, 192, "73 × 100 = 7.300", 11, W.biru)),
    ),
  ],
};

/* ------------------------------ 2. Flexible Grouping: penerapan pada uang Helen ------------------------------ */
const SUARA_FT1 = "Terapan pada uang Helen di buku. Mulai dari tujuh ribu tiga ratus rupiah: tiga lembar dua ribu, satu keping seribu, dan tiga keping seratus.";
const SUARA_FT2 = "Tukar satu lembar dua ribu dengan dua keping seribu. Nilainya tetap, tetapi pengelompokannya berubah.";
const SUARA_FT3 = "Tukar lagi satu lembar dua ribu dengan dua keping seribu. Kini ada lima keping seribu, persis jumlah seribu milik Helen.";
const SUARA_FT4 = "Sepuluh ribu rupiah dimulai dari lima lembar dua ribu. Tukar satu lembar dua ribu dengan satu keping seribu dan dua keping lima ratus.";

const G1 = deretUang("g1", 78, URAIAN_7300[0]);
const G2 = deretUang("g2", 78, URAIAN_7300[1]);
const G3 = deretUang("g3", 78, URAIAN_7300[2]);
const H1 = deretUang("h1", 78, URAIAN_10000[0]);
const H2 = deretUang("h2", 78, URAIAN_10000[2]);

export const ADEGAN_LUAR_KELOMPOK_TERAPAN: AdeganStory = {
  id: "luar-kelompok-terapan",
  judul: "Flexible Grouping pada uang Helen",
  sumber: "Metode luar: Flexible Grouping (uang buku)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_FT1,
      tambah(0, judul("Tukar uang, nilai tetap"), kepala(2)),
      tambah(idx(SUARA_FT1, "tujuh"), teks("hl", 150, 66, "Rp7.300", 14, W.merah)),
      tambah(idx(SUARA_FT1, "lembar"), G1),
    ),
    k(
      SUARA_FT2,
      hapus(idx(SUARA_FT2, "Tukar"), ...idUang("g1", 7)),
      tambah(idx(SUARA_FT2, "Tukar"), G2, teks("gt", 150, 124, "tukar: 1 lembar 2.000 = 2 keping 1.000", 8.4, W.coklat)),
    ),
    k(
      SUARA_FT3,
      hapus(idx(SUARA_FT3, "Tukar"), ...idUang("g2", 8)),
      tambah(idx(SUARA_FT3, "Tukar"), G3),
      ubah(idx(SUARA_FT3, "lagi"), { id: "gt", isi: "tukar lagi: 1 lembar 2.000 = 2 keping 1.000" }),
      tambah(idx(SUARA_FT3, "persis"), ...kartu("gk", 40, 146, 220, 28, W.krem, ["5 keping 1.000: semua milik Helen"], 8.8)),
    ),
    k(
      SUARA_FT4,
      bersih(0),
      tambah(0, judul("Tukar uang: sepuluh ribu"), kepala(2)),
      tambah(idx(SUARA_FT4, "Sepuluh"), teks("hm", 150, 66, "Rp10.000", 14, W.merah)),
      tambah(idx(SUARA_FT4, "lima"), H1),
      hapus(idx(SUARA_FT4, "Tukar"), ...idUang("h1", 5)),
      tambah(idx(SUARA_FT4, "Tukar"), H2, teks("hn", 150, 124, "tukar: 1 lembar 2.000 = 1.000 + 500 + 500", 8.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 3. Number Bonds: konsep ------------------------------ */
const SUARA_I1 = "Number Bonds, atau Ikatan Bilangan, menggambar satu bilangan utuh yang terikat pada dua bagiannya.";
const SUARA_I2 = "Utuh sama dengan bagian ditambah bagian. Jika utuh dan satu bagian sudah diketahui, bagian lainnya dicari dengan bertanya: perlu ditambah berapa agar menjadi utuh?";
const SUARA_I3 = "Contoh dari buku: enam ribu delapan ratus empat puluh sembilan terikat pada enam ribu dan satu bagian lain yang belum diketahui.";
const SUARA_I4 = "Cari bagian yang hilang: enam ribu ditambah berapa agar menjadi enam ribu delapan ratus empat puluh sembilan? Jawabnya delapan ratus empat puluh sembilan.";

export const ADEGAN_LUAR_IKATAN: AdeganStory = {
  id: "luar-ikatan",
  judul: "Number Bonds: utuh dan bagian yang terikat",
  sumber: "Metode luar: Number Bonds (contoh video)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Number Bonds"), kepala(3)),
      tambah(idx(SUARA_I1, "utuh"), ...ikatan("ik", 150, 76, 66, 58, 24, "utuh", "bagian", "bagian", 8)),
    ),
    k(
      SUARA_I2,
      tambah(idx(SUARA_I2, "ditambah"), teks("ie1", 150, 180, "utuh = bagian + bagian", 9.6, W.biru)),
      tambah(idx(SUARA_I2, "berapa"), teks("ie2", 150, 194, "bagian + ? = utuh", 9.6, W.merah)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Ikatan dari angka buku"), kepala(3), ...ikatan("ib", 150, 76, 66, 58, 24, "", "", "", 8.6)),
      tambah(idx(SUARA_I3, "sembilan"), teks("ib-ut", 150, 79, "6.849", 8.6, W.biru)),
      tambah(idx(SUARA_I3, "enam", 2), teks("ib-lt", 84, 137, "6.000", 8.6, W.biru)),
      tambah(idx(SUARA_I3, "belum"), teks("ib-rt", 216, 138, "?", 14, W.merah)),
    ),
    k(
      SUARA_I4,
      tambah(idx(SUARA_I4, "ditambah"), teks("ie", 150, 190, "6.000 + 849 = 6.849", 11.5, W.biru)),
      ubah(idx(SUARA_I4, "Jawabnya"), { id: "ib-rt", isi: "849", u: 8.6, warna: W.hijau, y: 137 }),
    ),
  ],
};

/* ------------------------------ 4. Number Bonds: penerapan ------------------------------ */
const SUARA_IT1 = "Terapan pada uang Helen. Slamet membeli seharga tujuh ribu tiga ratus rupiah dan membayar sepuluh ribu rupiah. Berapa kembaliannya?";
const SUARA_IT2 = "Bagian yang hilang: tujuh ribu tiga ratus ditambah berapa agar menjadi sepuluh ribu? Jawabnya dua ribu tujuh ratus rupiah. Ini tambahan video, bukan soal buku.";
const SUARA_IT3 = "Ikatan juga bertingkat. Bilangan enam ribu tiga puluh lima terikat pada enam ribu dan tiga puluh lima, lalu tiga puluh lima terikat pada tiga puluh dan lima.";
const SUARA_IT4 = "Periksa dengan menjumlahkan: tiga puluh ditambah lima sama dengan tiga puluh lima, dan enam ribu ditambah tiga puluh lima sama dengan enam ribu tiga puluh lima.";

export const ADEGAN_LUAR_IKATAN_TERAPAN: AdeganStory = {
  id: "luar-ikatan-terapan",
  judul: "Number Bonds pada uang Helen dan 6.035",
  sumber: "Metode luar: Number Bonds (buku + tambahan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_IT1,
      tambah(0, judul("Ikatan: uang Slamet"), kepala(3), ...ikatan("ip", 150, 76, 66, 58, 24, "", "", "", 8.6)),
      tambah(idx(SUARA_IT1, "tujuh"), teks("ip-lt", 84, 137, "7.300", 8.6, W.biru), teks("ipb", 84, 172, "harga", 8.6, W.coklat)),
      tambah(idx(SUARA_IT1, "sepuluh"), teks("ip-ut", 150, 79, "10.000", 8.6, W.biru), teks("ipa", 208, 80, "bayar", 8.6, W.coklat)),
      tambah(idx(SUARA_IT1, "kembaliannya?"), teks("ip-rt", 216, 138, "?", 14, W.merah), teks("ipc", 216, 172, "kembalian", 8.6, W.coklat)),
    ),
    k(
      SUARA_IT2,
      tambah(idx(SUARA_IT2, "ditambah"), teks("ie", 150, 192, "7.300 + 2.700 = 10.000", 11, W.biru)),
      ubah(idx(SUARA_IT2, "Jawabnya"), { id: "ip-rt", isi: "2.700", u: 8.6, warna: W.hijau, y: 137 }),
    ),
    k(
      SUARA_IT3,
      bersih(0),
      tambah(0, judul("Ikatan bertingkat"), kepala(3), ...ikatan("is", 150, 74, 70, 50, 20, "", "", "", 8.6)),
      tambah(idx(SUARA_IT3, "enam"), teks("is-ut", 150, 77, "6.035", 8.6, W.biru)),
      tambah(idx(SUARA_IT3, "enam", 2), teks("is-lt", 80, 127, "6.000", 8.6, W.biru)),
      tambah(idx(SUARA_IT3, "lima", 2), teks("is-rt", 220, 127, "35", 9, W.biru)),
      tambah(idx(SUARA_IT3, "terikat", 2), garis("sg1", 220, 144, -30, 10, W.biru, 2), garis("sg2", 220, 144, 30, 10, W.biru, 2), bulat("sc1", 190, 166, 14, W.krem), bulat("sc2", 250, 166, 14, W.pink)),
      tambah(idx(SUARA_IT3, "puluh", 4), teks("st1", 190, 169, "30", 9, W.biru)),
      tambah(idx(SUARA_IT3, "lima", 4), teks("st2", 250, 169, "5", 9, W.biru)),
    ),
    k(
      SUARA_IT4,
      tambah(idx(SUARA_IT4, "tiga"), teks("ie1", 80, 190, "30 + 5 = 35", 10.5, W.biru)),
      tambah(idx(SUARA_IT4, "enam"), teks("ie2", 80, 166, "6.000 + 35 = 6.035", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan empat metode ------------------------------ */
const SUARA_Z1 = "Ringkasan. Composition menyusun bilangan dari kartu nilai, seperti enam ribu, tiga ratus, empat puluh, dan delapan menjadi enam ribu tiga ratus empat puluh delapan.";
const SUARA_Z2 = "Decomposition mengupas bilangan dari kiri, enam ribu delapan ratus empat puluh sembilan menjadi enam ribu, delapan ratus, empat puluh, dan sembilan.";
const SUARA_Z3 = "Flexible Grouping menukar kelompok tanpa mengubah nilai, misalnya sepuluh puluhan ditukar satu ratusan, atau tujuh ribu tiga ratus menjadi tujuh puluh tiga ratusan.";
const SUARA_Z4 = "Number Bonds mengikat bilangan utuh dengan bagiannya, sehingga bagian yang hilang dicari dengan bertanya perlu ditambah berapa, seperti tujuh ribu tiga ratus ditambah dua ribu tujuh ratus sama dengan sepuluh ribu.";
const SUARA_Z5 = "Keempat cara menjawab pertanyaan yang sama dari buku: bilangan apa yang terbentuk, dan bagaimana mengurainya. Pilih cara yang paling cocok dengan soalnya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode",
  sumber: "Ringkasan empat metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      tambah(idx(SUARA_Z1, "Composition"), ...kartu("r0", 10, 30, 280, 34, W.hijauMuda, ["Composition: menyusun", "6.000 + 300 + 40 + 8 → 6.348"], 8.8)),
    ),
    k(
      SUARA_Z2,
      tambah(idx(SUARA_Z2, "Decomposition"), ...kartu("r1", 10, 70, 280, 34, W.langit, ["Decomposition: mengupas dari kiri", "6.849 → 6.000 + 800 + 40 + 9"], 8.8)),
    ),
    k(
      SUARA_Z3,
      tambah(idx(SUARA_Z3, "Flexible"), ...kartu("r2", 10, 110, 280, 34, W.krem, ["Flexible Grouping: menukar kelompok", "10 puluhan = 1 ratusan; 7.300 = 73 ratusan"], 8.8)),
    ),
    k(
      SUARA_Z4,
      tambah(idx(SUARA_Z4, "Number"), ...kartu("r3", 10, 150, 280, 34, W.pink, ["Number Bonds: utuh dan bagian", "7.300 + 2.700 = 10.000"], 8.8)),
    ),
    k(
      SUARA_Z5,
      sorotkan(idx(SUARA_Z5, "Keempat"), "r0-k", "r1-k", "r2-k", "r3-k"),
      tambah(idx(SUARA_Z5, "Pilih"), teks("rz", 150, 197, "pilih cara yang cocok dengan soal", 9, W.coklat)),
    ),
  ],
};
