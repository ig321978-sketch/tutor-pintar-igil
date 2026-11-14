import type { AdeganStory } from "./logika-story";
import { W, emo, fmt, judul, kartu, kartuAngka, papan, tabelNilai, teks, xPaku } from "./k4b1c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/* ------------------------------ 1. Pembuka subbab C (Buku Siswa hlm. 16; Panduan Guru hlm. 40-41) ------------------------------ */
const SUARA_P1 = "Kita masuk ke subbab C, Membandingkan dan Mengurutkan Bilangan Cacah sampai sepuluh ribu. Buku Siswa membukanya di halaman enam belas, Panduan Guru di halaman empat puluh.";
const SUARA_P2 = "Pengalaman belajarnya, menurut panduan guru: setelah mempelajari subbab ini, peserta didik diharapkan mampu membandingkan dan mengurutkan bilangan sampai sepuluh ribu.";
const SUARA_P3 = "Sarana yang disiapkan: kardus, kertas karton, gunting, spidol warna, paku, dan papan spon dengan panjang delapan puluh sentimeter serta lebar dua puluh sentimeter.";
const SUARA_P4 = "Apersepsi di panduan guru: penguasaan nilai tempat sangat penting, jadi guru menulisnya kembali dan menggambar dua tabel serupa untuk dua bilangan cacah empat angka.";
const SUARA_P5 = "Dua pertanyaan pemantik: bisakah kalian menyebutkan harga barang yang dibeli dua anak dalam cerita, dan jika berbelanja beberapa barang, dapatkah kalian menentukan berapa rupiah yang harus dibayarkan?";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka",
  judul: "Pembuka Subbab C: pengalaman belajar dan pemantik",
  sumber: "Buku Siswa hlm. 16; Panduan Guru hlm. 40–41",
  latar: "#FFF7ED",
  kutipan: [
    "C. Membandingkan dan Mengurutkan Bilangan",
    "Pengalaman Belajar",
    "diharapkan peserta didik mampu membandingkan dan mengurut bilangan sampai angka 10.000",
    "Kebutuhan Sarana Prasarana dan Media",
    "Kardus/wadah berbentuk kotak, kertas karton, gunting, spidol warna, papan spon (panjang 80 cm dan lebar 20 cm), paku.",
    "Penguasaan nilai tempat bilangan memegang peranan penting pada pengajaran topik ini",
    "diharapkan menggambarkan 2 tabel serupa",
    "Pertanyaan Esensi/Pemantik",
    "Bisakah kalian menyebutkan harga barang yang dibeli oleh 2 orang anak dalam cerita?",
    "dapatkah kalian menentukan berapa rupiah yang harus dibayarkan?",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab C: banding dan urutkan")),
      tambah("sampai", teks("e1", 150, 76, "sampai 10.000", 20, W.merah)),
      tambah("Siswa", ...kartu("bs", 14, 108, 130, 30, W.hijauMuda, ["Buku Siswa hlm. 16"], 8.6)),
      tambah("Panduan", ...kartu("bg", 156, 108, 130, 30, W.langit, ["Panduan Guru hlm. 40"], 8.6)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("membandingkan", ...kartu("pg", 40, 36, 220, 34, W.emas, ["membandingkan bilangan"], 10)),
      tambah("mengurutkan", ...kartu("pu", 40, 84, 220, 34, W.hijauMuda, ["mengurutkan bilangan"], 10)),
      tambah("sepuluh", teks("p10", 150, 150, "sampai 10.000", 16, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah("kardus", emo("a1", 50, 62, "📦", 28), teks("a1t", 50, 84, "kardus", 8.4)),
      tambah("karton,", emo("a2", 110, 62, "📄", 28), teks("a2t", 110, 84, "karton", 8.4)),
      tambah("gunting,", emo("a3", 170, 62, "✂", 28), teks("a3t", 170, 84, "gunting", 8.4)),
      tambah("spidol", emo("a4", 230, 62, "🖍", 28), teks("a4t", 230, 84, "spidol", 8.4)),
      tambah("paku,", emo("a5", 40, 134, "📌", 26), teks("a5t", 40, 156, "paku", 8.4)),
      tambah("papan", ...kartu("a6", 80, 118, 190, 36, W.krem, ["papan spon", "80 cm × 20 cm"], 8.8)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Apersepsi: nilai tempat")),
      tambah("menulisnya", ...tabelNilai("ta", 14, 52, 8750, 28, 11)),
      tambah("serupa,", ...tabelNilai("tb", 174, 52, 7500, 28, 11)),
      tambah("dua@2", ...kartu("ap", 30, 118, 240, 34, W.hijauMuda, ["dua bilangan cacah", "empat angka"], 9.2)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Dua pertanyaan pemantik")),
      tambah("bisakah", ...kartu("q1", 14, 34, 272, 40, W.langit, ["1. harga barang yang dibeli", "dua anak dalam cerita?"], 9.2)),
      tambah("dapatkah", ...kartu("q2", 14, 84, 272, 40, W.krem, ["2. berapa rupiah yang", "harus dibayarkan?"], 9.2)),
      tambah("rupiah", emo("q3", 150, 160, "🤔", 28)),
    ),
  ],
};

/* ------------------------------ 2. Ayo Mengamati: di pasar tradisional (Buku Siswa hlm. 16-17; Panduan Guru hlm. 41) ------------------------------ */
const SUARA_M1 = "Ayo Mengamati. Slamet dan Ibu akan membuat jus buah. Mereka pergi ke pasar tradisional untuk membeli buah manggis dan apel.";
const SUARA_M2 = "Ibu Slamet membeli setengah kilogram manggis dengan harga tujuh ribu lima ratus rupiah, dan seperempat kilogram apel dengan harga enam ribu tujuh ratus lima puluh rupiah.";
const SUARA_M3 = "Pertanyaan di buku: harga bengkoang di kios A tujuh ribu lima ratus rupiah, dan di kios B delapan ribu tujuh ratus lima puluh rupiah. Kios manakah yang kalian putuskan untuk membeli, dan mengapa?";
const SUARA_M4 = "Untuk memutuskan, buku memberi percakapan: apakah delapan ribu tujuh ratus lima puluh lebih dari tujuh ribu lima ratus? Jawabannya kita cari lewat aktivitas dan nilai tempat.";

export const ADEGAN_PASAR: AdeganStory = {
  id: "pasar",
  judul: "Ayo Mengamati: harga buah di pasar",
  sumber: "Buku Siswa hlm. 16–17; Panduan Guru hlm. 41",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Mengamati",
    "Slamet dan Ibu akan membuat jus buah.",
    "Mereka pergi ke pasar tradisional untuk membeli buah.",
    "Ibu Slamet membeli buah manggis dan apel.",
    "setengah kilogram manggis dengan harga Rp7.500,00",
    "seperempat kilogram apel dengan harga Rp6.750,00",
    "Jika di kios A harga bengkoang sebesar",
    "Rp7.500,00 dan di kios B sebesar Rp8.750,00",
    "kios manakah yang akan kalian putuskan sebagai tempat membeli?",
    "Apakah 8.750 lebih dari 7.500?",
    "Guru mengingatkan kembali materi topik B",
    "menjelaskan hubungannya dengan cerita kontekstual",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Ayo Mengamati: di pasar")),
      tambah("Slamet", emo("sl", 70, 78, "🧒", 34), teks("slt", 70, 100, "Slamet", 8.6)),
      tambah("Ibu", emo("ib", 150, 78, "👩", 34), teks("ibt", 150, 100, "Ibu", 8.6)),
      tambah("pasar", ...kartu("ps", 30, 120, 240, 28, W.emas, ["pasar tradisional"], 9.6)),
      tambah("manggis", emo("mg", 100, 176, "🟣", 24), teks("mgt", 100, 192, "manggis", 8)),
      tambah("apel.", emo("ap", 200, 176, "🍎", 24), teks("apt", 200, 192, "apel", 8)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Harga belanja Ibu Slamet")),
      tambah("manggis", emo("mg", 40, 66, "🟣", 28), ...kartu("hm", 70, 46, 216, 40, W.pink, ["manggis ½ kg", "Rp" + fmt(7500)], 9.4)),
      tambah("apel", emo("ap", 40, 128, "🍎", 28), ...kartu("ha", 70, 108, 216, 40, W.hijauMuda, ["apel ¼ kg", "Rp" + fmt(6750)], 9.4)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Kios A atau kios B?")),
      tambah("kios@1", ...kartu("ka", 14, 42, 130, 62, W.langit, ["kios A", "bengkoang", "Rp" + fmt(7500)], 9.4)),
      tambah("kios@2", ...kartu("kb", 156, 42, 130, 62, W.krem, ["kios B", "bengkoang", "Rp" + fmt(8750)], 9.4)),
      tambah("manakah", teks("kq", 150, 140, "beli di mana, dan mengapa?", 11, W.merah), emo("kqe", 150, 174, "🛒", 28)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Percakapan di buku")),
      tambah("percakapan:", emo("pb", 60, 84, "🤔", 38)),
      tambah("apakah", ...kartu("pc", 100, 56, 190, 56, W.langit, ["Apakah 8.750", "lebih dari 7.500?"], 10.4)),
      tambah("aktivitas", ...kartu("pd", 30, 134, 240, 34, W.hijauMuda, ["jawab lewat aktivitas dan nilai tempat"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Aktivitas 3: alat, kelompok, dan kartu bilangan (Buku Siswa hlm. 17; Panduan Guru hlm. 41) ------------------------------ */
const SUARA_K1 = "Ayo Beraktivitas. Aktivitas tiga berjudul Membandingkan Bilangan. Alat dan bahannya: kertas karton, cutter atau gunting, penggaris, spidol, papan spon, dan delapan buah paku.";
const SUARA_K2 = "Langkah satu: buat kelompok kerja tiga sampai lima orang. Panduan guru menyarankan kelompok heterogen, campuran karakteristik dan kemampuan murid, supaya tumbuh gotong royong.";
const SUARA_K3 = "Langkah dua: siapkan kertas karton sepuluh sentimeter kali sepuluh sentimeter sebanyak sepuluh buah, berlubang di atas. Panduan guru menyebut dua puluh buah, jadi kedua angka kita catat.";
const SUARA_K4 = "Langkah tiga sampai lima: tulis angka nol sampai sembilan pada kartu dengan warna spidol berbeda, lalu gunting menjadi kartu bilangan. Hasilnya kalian mempunyai dua paket kartu bilangan.";

export const ADEGAN_KARTU: AdeganStory = {
  id: "kartu",
  judul: "Aktivitas 3: alat, kelompok, dan kartu bilangan",
  sumber: "Buku Siswa hlm. 17; Panduan Guru hlm. 41",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Beraktivitas",
    "Aktivitas 3. Membandingkan Bilangan",
    "Kertas Karton",
    "Cutter / Gunting",
    "Papan spon (panjang 80 cm, lebar 20 cm)",
    "8 buah Paku",
    "1. Buatlah kelompok kerja yang terdiri dari 3-5 orang.",
    "Siapkan kertas karton berukuran 10 cm x 10 cm sebanyak 10 buah dan",
    "diberi lubang di bagian atasnya.",
    "Guntinglah menjadi kartu bilangan",
    "Kalian telah mempunyai 2 paket kartu bilangan",
    "Guru membentuk kelompok heterogen (berdasarkan karakteristik atau",
    "keberagaman peserta didik)",
    "berukuran 10cm x 10cm sebanyak 20 buah",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Aktivitas 3: Membandingkan Bilangan")),
      tambah("kertas", ...kartu("b1", 14, 36, 84, 28, W.krem, ["kertas karton"], 8.4)),
      tambah("cutter", ...kartu("b2", 108, 36, 84, 28, W.langit, ["cutter / gunting"], 7.6)),
      tambah("penggaris,", ...kartu("b3", 202, 36, 84, 28, W.hijauMuda, ["penggaris"], 8.4)),
      tambah("spidol,", ...kartu("b4", 14, 74, 84, 28, W.pink, ["spidol"], 8.4)),
      tambah("papan", ...kartu("b5", 108, 74, 84, 28, W.lavender, ["papan spon"], 8.4)),
      tambah("paku.", ...kartu("b6", 202, 74, 84, 28, W.jingga, ["8 paku"], 8.4)),
      tambah("alat", ...kartu("b7", 40, 118, 220, 34, W.emas, ["alat dan bahan Aktivitas 3"], 9.4)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Langkah 1: buat kelompok")),
      tambah("kelompok", emo("o1", 60, 66, "🙂", 28), emo("o2", 120, 66, "😀", 28), emo("o3", 180, 66, "😊", 28), emo("o4", 240, 66, "🤓", 28)),
      tambah("tiga", ...kartu("ok", 40, 88, 220, 28, W.hijauMuda, ["3 sampai 5 orang per kelompok"], 9.2)),
      tambah("heterogen,", ...kartu("oh", 20, 128, 260, 28, W.langit, ["heterogen: karakter dan kemampuan campur"], 8.6)),
      tambah("gotong", teks("og", 150, 178, "gotong royong dan komunikasi baik", 8.6, W.hijau)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Langkah 2: kartu karton")),
      tambah("kertas", ...kartuAngka("kt", 124, 40, "", W.krem, 52, 52), teks("kts", 150, 108, "10 cm × 10 cm", 9, W.biru)),
      tambah("sepuluh@3", ...kartu("kbs", 14, 124, 130, 34, W.hijauMuda, ["Buku Siswa:", "10 buah"], 9)),
      tambah("Panduan", ...kartu("kbg", 156, 124, 130, 34, W.langit, ["Panduan Guru:", "20 buah"], 9)),
      tambah("catat.", teks("kcc", 150, 180, "dua paket butuh 20 kartu", 9.4, W.merah)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Langkah 3 sampai 5: dua paket")),
      tambah("nol", ...Array.from({ length: 10 }, (_, i) => kartuAngka(`pa${i}`, 14 + i * 28.2, 40, i, W.krem)).flat()),
      tambah("warna", teks("pw", 150, 84, "paket 1: satu warna spidol", 8.4, W.hijau)),
      tambah("gunting", emo("pg", 150, 112, "✂", 22)),
      tambah("paket", ...Array.from({ length: 10 }, (_, i) => kartuAngka(`pb${i}`, 14 + i * 28.2, 124, i, W.langit)).flat(), teks("pw2", 150, 172, "paket 2: warna spidol lain", 8.4, W.biruMuda)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 3: papan spon dan membandingkan kartu (Buku Siswa hlm. 18; Panduan Guru hlm. 42) ------------------------------ */
const SUARA_L1 = "Langkah enam dan tujuh: potong papan spon delapan puluh sentimeter kali dua puluh sentimeter, beri pemisah menjadi bagian kiri dan kanan, lalu tancapkan empat paku di tiap bagian.";
const SUARA_L2 = "Langkah delapan: letakkan kartu bilangan pada paku. Panduan guru: tiap bagian empat kartu. Kita pasang delapan, tujuh, lima, nol di kiri, dan tujuh, lima, nol, nol di kanan.";
const SUARA_L3 = "Langkah sembilan: sebutkan nilai tempat tiap kartu, dari kiri ke kanan: ribuan, ratusan, puluhan, dan satuan.";
const SUARA_L4 = "Langkah sepuluh: ambil kartu di tempat ribuan dan bandingkan. Jika kedua kartu bernilai sama, ambil dua kartu di tempat ratusan, seterusnya sampai tempat satuan.";
const SUARA_L5 = "Langkah sebelas: nyatakan perbandingannya. Delapan lebih dari tujuh, jadi bilangan di kiri, delapan ribu tujuh ratus lima puluh, lebih dari bilangan di kanan, tujuh ribu lima ratus.";

const PX = 20;
const PY = 44;
const PW = 260;
const PH = 65;
const KIRI = [8, 7, 5, 0] as const;
const KANAN = [7, 5, 0, 0] as const;
const kartuPapan = (sisi: "l" | "r", i: number, d: number) => kartuAngka(`p${sisi}${i}`, xPaku(PX, PW, (sisi === "l" ? 0 : 4) + i) - 11, PY + 12, d, sisi === "l" ? W.krem : W.langit);

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan",
  judul: "Aktivitas 3: papan spon dan membandingkan kartu",
  sumber: "Buku Siswa hlm. 18; Panduan Guru hlm. 42",
  latar: "#ECFDF5",
  kutipan: [
    "Potong papan spon dengan panjang 80 cm x 20 cm, kemudian diberi tanda",
    "pemisah menjadi dua bagian (kiri dan kanan).",
    "Tancapkan empat paku di setiap kedua bagian tersebut.",
    "Letakkan kartu bilangan pada paku yang sudah terpasang di papan spon",
    "Sebutkan nilai tempat dari masing-masing kartu bilangan yang terpasang",
    "Ambil kartu bilangan di tempat ribuan, bandingkan bilangan tersebut.",
    "kedua kartu tersebut bernilai sama, maka silahkan ambil dua kartu di papan",
    "Nyatakan perbandingan bilangan tersebut.",
    "meletakkan masing-masing empat kartu",
    "Pengambilan kartu bilangan dimulai dari tempat ribuan",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Langkah 6 dan 7: papan spon")),
      tambah("potong", ...papan("pp", PX, PY, PW, PH), teks("pu", 150, 128, "80 cm × 20 cm", 9.4, W.coklat)),
      tambah("kiri", teks("pkl", 85, 40, "kiri", 8.6, W.hijau), teks("pkr", 215, 40, "kanan", 8.6, W.hijau)),
      tambah("tancapkan", teks("pk4", 150, 148, "4 paku di tiap bagian", 9.4, W.biru)),
    ),
    k(
      SUARA_L2,
      hapus(0, "pu", "pk4"),
      ...[0, 1, 2, 3].map((i) => tambah([idx(SUARA_L2, "delapan", 2), idx(SUARA_L2, "tujuh", 1), idx(SUARA_L2, "lima", 1), idx(SUARA_L2, "nol", 1)][i], ...kartuPapan("l", i, KIRI[i]))),
      ...[0, 1, 2, 3].map((i) => tambah([idx(SUARA_L2, "tujuh", 2), idx(SUARA_L2, "lima", 2), idx(SUARA_L2, "nol", 2), idx(SUARA_L2, "nol", 3)][i], ...kartuPapan("r", i, KANAN[i]))),
      tambah("empat", teks("pe", 150, 148, "tiap bagian: 4 kartu", 9.4, W.biru)),
    ),
    k(
      SUARA_L3,
      hapus(0, "pe"),
      ...[0, 1, 2, 3].flatMap((i) => [tambah(["ribuan,", "ratusan,", "puluhan,", "satuan."][i], teks(`nl${i}`, xPaku(PX, PW, i), 121, ["Ribuan", "Ratusan", "Puluhan", "Satuan"][i], 6.4, W.hijau), teks(`nr${i}`, xPaku(PX, PW, 4 + i), 121, ["Ribuan", "Ratusan", "Puluhan", "Satuan"][i], 6.4, W.hijau))]),
    ),
    k(
      SUARA_L4,
      hapus(0, "nl1", "nl2", "nl3", "nr1", "nr2", "nr3"),
      tambah(0, teks("lg", 150, 148, "Langkah 10: bandingkan ribuan dulu", 9.4, W.merah)),
      sorotkan("ribuan", "pl0-k", "pr0-k"),
      tambah("ratusan,", teks("lr", 150, 168, "sama? lanjut ke ratusan", 8.6, W.coklat)),
    ),
    k(
      SUARA_L5,
      hapus(0, "lr", "lg"),
      ubah("Delapan", { id: "pl0-k", warna: W.arsir }),
      tambah(0, teks("lh", 150, 148, "Langkah 11: 8.750 > 7.500", 13, W.merah)),
      tambah("lebih@2", ...kartu("ls", 30, 160, 240, 24, W.emas, ["8 lebih dari 7, jadi 8.750 > 7.500"], 8.6)),
    ),
  ],
};
