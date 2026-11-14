import type { AdeganStory } from "./logika-story";
import { DAKON, W, emo, judul, kartu, selKolom, tabelTempat, tabelUrut, teks } from "./k5b1b-gambar";
import { bersih, hapus, k, tambah, ubah, warnai } from "./k5b1b-bantu";

/* ------------------------------ 5. Tabel nilai tempat harga papan dakon (hitungan mandiri dari Buku Siswa hlm. 11–12) ------------------------------ */
const TP = tabelTempat("tp", 10, 34, DAKON.map((d) => ({ nama: d.nama, n: d.harga })));
const kepalaTP = TP.filter((o) => o.id.startsWith("tp-h"));
const barisTP = (i: number) => TP.filter((o) => o.id.startsWith(`tp-r${i}`));

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel-nilai-tempat",
  judul: "Tabel nilai tempat harga papan dakon",
  sumber: "Buku Siswa hlm. 11–12",
  latar: "#F5F3FF",
  kutipan: ["Kartu 1 : …. diperoleh nama : ….", "Kartu 2 : …. diperoleh nama : ….", "Nilai Tempat"],
  ketukan: [
    k(
      "Kita isi tabel nilai tempat dari harga papan dakon. Papan a, lima puluh enam ribu lima ratus enam puluh. Puluh ribuannya lima, ribuannya enam, ratusannya lima, puluhannya enam, satuannya nol.",
      tambah(0, judul("Tabel nilai tempat")),
      tambah(0, ...kepalaTP),
      tambah("Papan", ...barisTP(0)),
      tambah("Papan", teks("bc", 150, 160, "dibaca: lima puluh enam ribu lima ratus enam puluh", 8.2, W.coklat)),
    ),
    k(
      "Papan b, enam puluh lima ribu tujuh ratus lima puluh. Puluh ribuannya enam, ribuannya lima, ratusannya tujuh, puluhannya lima, satuannya nol.",
      ubah(0, { id: "bc", isi: "dibaca: enam puluh lima ribu tujuh ratus lima puluh" }),
      tambah("Papan", ...barisTP(1)),
    ),
    k(
      "Papan c, lima puluh tujuh ribu. Puluh ribuannya lima, ribuannya tujuh, dan ratusan, puluhan, serta satuannya nol semua.",
      ubah(0, { id: "bc", isi: "dibaca: lima puluh tujuh ribu" }),
      tambah("Papan", ...barisTP(2)),
    ),
    k(
      "Papan d, tujuh puluh lima ribu tiga ratus enam puluh. Puluh ribuannya tujuh, ribuannya lima, ratusannya tiga, puluhannya enam, satuannya nol.",
      ubah(0, { id: "bc", isi: "dibaca: tujuh puluh lima ribu tiga ratus enam puluh" }),
      tambah("Papan", ...barisTP(3)),
    ),
    k(
      "Tabel ini menjadi alat membandingkan. Bandingkan dulu angka di tempat paling kiri, yaitu puluh ribuan. Kalau sama, geser ke tempat berikutnya di sebelah kanan.",
      hapus(0, "bc"),
      warnai("ribuan.", W.emas, ...selKolom("tp", 0, 4)),
      tambah("geser", teks("pg", 150, 158, "sama? geser ke kanan →", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Menyimak Percakapan (Buku Siswa hlm. 12 dan 13; jawaban dihitung mandiri) ------------------------------ */
const TP2 = tabelTempat("tq", 10, 34, DAKON.map((d) => ({ nama: d.nama, n: d.harga })));

export const ADEGAN_PERCAKAPAN: AdeganStory = {
  id: "percakapan",
  judul: "Ayo Menyimak Percakapan",
  sumber: "Buku Siswa hlm. 12–13",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Menyimak Percakapan",
    "Harga papan dakon mana yang angka puluh ribuannya paling kecil?",
    "Jika nilai puluh ribuan dua papan dakon tersebut sama, papan dakon mana yang angka ribuannya lebih besar?",
  ],
  ketukan: [
    k(
      "Ayo Menyimak Percakapan. Seorang anak bertanya, harga papan dakon mana yang angka puluh ribuannya paling kecil? Kolom jawaban teman bicaranya masih kosong di buku.",
      tambah(0, judul("Ayo Menyimak Percakapan")),
      tambah("Seorang", emo("c1", 40, 76, "🧒", 34), ...kartu("q1", 70, 44, 216, 56, W.krem, ["Harga papan dakon mana yang", "angka puluh ribuannya", "paling kecil?"], 9.4)),
      tambah("kosong", ...kartu("j1", 14, 114, 216, 40, W.langit, ["......................."], 10), emo("c2", 262, 138, "🙋", 34)),
    ),
    k(
      "Kita jawab lewat tabel. Lihat kolom puluh ribuan: papan a lima, papan b enam, papan c lima, papan d tujuh. Angka paling kecil adalah lima, dimiliki papan a dan papan c.",
      bersih(0),
      tambah(0, judul("Puluh ribuan paling kecil")),
      tambah(0, ...TP2),
      warnai("kolom", W.emas, ...selKolom("tq", 0, 4)),
      warnai("lima,", W.hijauPita, "tq-r0c0", "tq-r2c0"),
      tambah("kecil", teks("pk", 150, 158, "paling kecil: 5, papan a dan papan c", 10, W.hijau)),
    ),
    k(
      "Pertanyaan berikutnya: jika nilai puluh ribuan dua papan sama, papan mana yang angka ribuannya lebih besar? Papan a dan papan c sama-sama lima puluh ribuan.",
      bersih(0),
      tambah(0, judul("Puluh ribuan sama, lihat ribuan")),
      tambah(0, ...TP2),
      warnai("papan", W.hijauPita, "tq-r0c0", "tq-r2c0"),
      tambah("ribuannya", teks("rb", 150, 158, "bandingkan ribuannya", 11, W.merah)),
    ),
    k(
      "Ribuan papan a adalah enam, ribuan papan c adalah tujuh. Tujuh lebih besar dari enam, jadi papan c lebih besar. Lima puluh tujuh ribu lebih besar daripada lima puluh enam ribu lima ratus enam puluh.",
      warnai("Ribuan", W.emas, "tq-r0c1", "tq-r2c1"),
      ubah(0, { id: "rb", isi: "6 < 7, jadi 56.560 < 57.000", warna: W.hijau }),
      tambah("Lima", teks("rc", 150, 180, "papan c lebih besar daripada papan a", 10, W.coklat)),
    ),
  ],
};

/* ------------------------------ 7. Mengurutkan harga: termurah dan termahal (Buku Siswa hlm. 13) ------------------------------ */
const MURAH = [DAKON[0], DAKON[2], DAKON[1], DAKON[3]].map((d) => ({ nama: d.nama, harga: d.harga }));
const MAHAL = [DAKON[3], DAKON[1], DAKON[2], DAKON[0]].map((d) => ({ nama: d.nama, harga: d.harga }));
const TM = tabelUrut("tm", 10, 40, MURAH);
const TH = tabelUrut("th", 158, 40, MAHAL);
const kepalaTM = TM.filter((o) => o.id.startsWith("tm-h"));
const kepalaTH = TH.filter((o) => o.id.startsWith("th-h"));
const barisTM = (i: number) => TM.filter((o) => o.id.startsWith(`tm-r${i}`));
const barisTH = (i: number) => TH.filter((o) => o.id.startsWith(`th-r${i}`));

export const ADEGAN_URUT: AdeganStory = {
  id: "urut-harga",
  judul: "Mengurutkan harga papan dakon",
  sumber: "Buku Siswa hlm. 13",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo kita cari tahu bersama dengan mengurutkan harganya.",
    "Ayo sekarang urutkan harga dari yang paling murah.",
    "Ayo sekarang urutkan harga dari yang paling mahal.",
    "No. Papan Dakon Harga Dakon",
  ],
  ketukan: [
    k(
      "Menurutmu, papan dakon mana yang paling murah dan paling mahal? Ayo kita cari tahu bersama dengan mengurutkan harganya.",
      tambah(0, judul("Termurah dan termahal?")),
      tambah("Menurutmu,", emo("um", 60, 100, "🤔", 40)),
      tambah("murah", teks("u1", 190, 80, "paling murah?", 13, W.hijau)),
      tambah("mahal?", teks("u2", 190, 116, "paling mahal?", 13, W.merah)),
      tambah("mengurutkan", teks("u3", 150, 170, "caranya: urutkan harganya", 11, W.ungu)),
    ),
    k(
      "Ayo sekarang urutkan harga dari yang paling murah. Nomor satu papan a, lima puluh enam ribu lima ratus enam puluh. Nomor dua papan c, lima puluh tujuh ribu.",
      bersih(0),
      tambah(0, judul("Urutan dari termurah")),
      tambah(0, ...kepalaTM),
      tambah("satu", ...barisTM(0)),
      tambah("dua", ...barisTM(1)),
    ),
    k(
      "Nomor tiga papan b, enam puluh lima ribu tujuh ratus lima puluh. Nomor empat papan d, tujuh puluh lima ribu tiga ratus enam puluh.",
      tambah("tiga", ...barisTM(2)),
      tambah("empat", ...barisTM(3)),
    ),
    k(
      "Sekarang urutkan dari yang paling mahal. Susunannya kebalikannya: papan d, lalu papan b, lalu papan c, dan terakhir papan a.",
      ubah(0, { id: "jud", isi: "Termurah dan termahal" }),
      tambah("paling", ...kepalaTH),
      tambah("papan", ...barisTH(0)),
      tambah("papan@2", ...barisTH(1)),
      tambah("papan@3", ...barisTH(2)),
      tambah("papan@4", ...barisTH(3)),
    ),
    k(
      "Jadi papan a paling murah dan papan d paling mahal. Papan c satu tingkat di atas papan a, dan papan b satu tingkat di bawah papan d.",
      tambah("murah", teks("kt1", 76, 156, "termurah: papan a", 9.6, W.hijau)),
      tambah("mahal.", teks("kt2", 224, 156, "termahal: papan d", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berpikir Kritis (Buku Siswa hlm. 14; Panduan Guru hlm. 27) ------------------------------ */
export const ADEGAN_KRITIS: AdeganStory = {
  id: "berpikir-kritis",
  judul: "Ayo Berpikir Kritis: mainan A atau mainan B",
  sumber: "Buku Siswa hlm. 14; Panduan Guru hlm. 27",
  latar: "#FEF2F2",
  kutipan: [
    "Ayo Berpikir Kritis",
    "Terdapat 2 jenis mainan, yaitu mainan A dan mainan B.",
    "Mainan A harganya lebih murah daripada mainan B.",
    "Namun, mainan A lebih cepat rusak daripada mainan B.",
    "Mainan manakah yang akan kalian pilih? Apa alasannya?",
    "bisa saja siswa membeli mainan dengan",
    "harga murah walaupun kualitas lebih rendah.",
    "Ajaklah mereka untuk dapat mengambil keputusan secara tepat.",
  ],
  ketukan: [
    k(
      "Ayo Berpikir Kritis. Ada dua jenis mainan, yaitu mainan A dan mainan B.",
      tambah(0, judul("Mainan A atau mainan B?")),
      tambah("mainan@2", emo("ma0", 70, 100, "🧸", 40), teks("ma1", 70, 140, "mainan A", 11, W.coklat)),
      tambah("mainan@3", emo("mb0", 230, 100, "🚗", 40), teks("mb1", 230, 140, "mainan B", 11, W.biru)),
    ),
    k(
      "Mainan A harganya lebih murah daripada mainan B, namun mainan A lebih cepat rusak.",
      bersih(0),
      tambah(0, judul("Mainan A atau mainan B?")),
      tambah("Mainan", ...kartu("ma", 14, 46, 128, 70, W.krem, ["mainan A", "lebih murah", "lebih cepat rusak"], 9.4)),
      tambah("mainan@2", ...kartu("mb", 158, 46, 128, 70, W.hijauMuda, ["mainan B", "lebih mahal", "tidak secepat A rusak"], 9)),
    ),
    k(
      "Mainan manakah yang akan kalian pilih, dan apa alasannya? Jawabannya ditulis di kolom yang tersedia.",
      bersih(0),
      tambah(0, judul("Pilih yang mana?")),
      tambah(0, emo("mq", 150, 100, "🤔", 44)),
      tambah("alasannya?", teks("mr", 150, 160, "pilih yang mana, dan mengapa?", 10.4, W.merah)),
    ),
    k(
      "Panduan guru mengingatkan: siswa bisa saja membeli mainan murah walaupun kualitasnya lebih rendah. Ajaklah mereka mengambil keputusan secara tepat. Harga yang lebih kecil belum tentu pilihan terbaik.",
      bersih(0),
      tambah(0, judul("Catatan guru")),
      tambah("Panduan", ...kartu("g1", 24, 44, 252, 44, W.krem, ["murah tetapi kualitas lebih rendah", "bisa saja dibeli siswa"], 9.4)),
      tambah("Ajaklah", ...kartu("g2", 24, 104, 252, 44, W.hijauMuda, ["ajak mengambil keputusan", "secara tepat"], 9.4)),
      tambah("Harga", teks("g3", 150, 182, "harga kecil belum tentu terbaik", 10.4, W.merah)),
    ),
  ],
};
