import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, judul, kartu, kotak, teks } from "./k5b1b-gambar";
import { bersih, hapus, k, tambah, ubah, warnai } from "./k5b1b-bantu";

/* ------------------------------ 9. Pelaksanaan menurut panduan guru (Panduan Guru hlm. 27) ------------------------------ */
export const ADEGAN_PELAKSANAAN: AdeganStory = {
  id: "pelaksanaan-guru",
  judul: "Pelaksanaan menurut Panduan Guru",
  sumber: "Panduan Guru hlm. 27",
  latar: "#FFFBEB",
  kutipan: [
    "Tujuan dari aktivitas ini adalah untuk membandingkan dan mengurutkan",
    "bilangan sampai 100.000 melalui kegiatan permainan.",
    "terkait penerapan termurah dan termahal",
    "Berikan kesempatan kepada peserta didik untuk mempresentasikan hasil",
    "kerjanya.",
    "Ajak peserta didik untuk menyimpulkan hal-hal penting yang harus",
    "diperhatikan saat menyusun bilangan yang terdiri atas lima angka.",
  ],
  ketukan: [
    k(
      "Pelaksanaan menurut panduan guru. Tujuannya membandingkan dan mengurutkan bilangan sampai seratus ribu melalui permainan. Di akhir, peserta didik membuat kesimpulan tentang termurah dan termahal.",
      tambah(0, judul("Pelaksanaan")),
      tambah("Tujuannya", ...kartu("t1", 24, 44, 252, 44, W.hijauMuda, ["tujuan: membandingkan dan", "mengurutkan sampai 100.000"], 9.4)),
      tambah("kesimpulan", ...kartu("t2", 24, 108, 252, 44, W.langit, ["kesimpulan:", "termurah dan termahal"], 9.4)),
    ),
    k(
      "Peran guru: menyampaikan tujuan dan instruksi dengan jelas. Guru menjadi fasilitator, berkeliling dan memeriksa hasil serta perkembangan kerja tiap kelompok.",
      bersih(0),
      tambah(0, judul("Peran guru")),
      tambah("Peran", emo("g0", 50, 100, "🧑", 40)),
      tambah("menyampaikan", ...kartu("g1", 96, 44, 188, 40, W.krem, ["menyampaikan tujuan", "dan instruksi dengan jelas"], 8.8)),
      tambah("fasilitator,", ...kartu("g2", 96, 100, 188, 40, W.pink, ["fasilitator: berkeliling,", "memeriksa hasil kelompok"], 8.8)),
    ),
    k(
      "Kemungkinan respons: peserta didik yang paham dapat membandingkan dan mengurutkan dari termurah maupun termahal. Ada yang belum paham tujuan sebelumnya, dan ada yang kurang tepat menuliskan bilangan lima angka.",
      bersih(0),
      tambah(0, judul("Kemungkinan respons")),
      tambah("paham", ...kartu("r1", 24, 40, 252, 40, W.hijauMuda, ["paham: bisa membandingkan", "dan mengurutkan"], 9)),
      tambah("belum", ...kartu("r2", 24, 92, 252, 34, W.krem, ["belum paham tujuan sebelumnya"], 9)),
      tambah("kurang", ...kartu("r3", 24, 138, 252, 40, W.pink, ["kurang tepat menulis", "bilangan lima angka"], 9)),
    ),
    k(
      "Jika masih ada yang belum tepat, guru memberi bimbingan kepada kelompok itu, atau menunjuk hasil kerja peserta didik dan teman sebangkunya.",
      bersih(0),
      tambah(0, judul("Antisipasi guru")),
      tambah("Jika", emo("a1", 150, 90, "🤝", 44)),
      tambah("bimbingan", teks("a2", 150, 130, "beri bimbingan kepada kelompok", 10.4, W.hijau)),
      tambah("menunjuk", teks("a3", 150, 156, "atau tunjuk hasil kerja teman sebangku", 9.6, W.coklat)),
    ),
    k(
      "Akhir pembelajaran: kelompok mempresentasikan hasil kerjanya, lalu bersama menyimpulkan hal penting saat menyusun bilangan yang terdiri atas lima angka.",
      bersih(0),
      tambah(0, judul("Akhir pembelajaran")),
      tambah("mempresentasikan", ...kartu("e1", 30, 44, 240, 38, W.langit, ["presentasi hasil kerja kelompok"], 9.6)),
      tambah("menyimpulkan", ...kartu("e2", 30, 100, 240, 38, W.hijauMuda, ["simpulkan: menyusun bilangan", "lima angka"], 9.6)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 1 dan 2 (Buku Siswa hlm. 14 dan 15; kunci Panduan Guru hlm. 28) ------------------------------ */
const pasang = (id: string, kiri: string, tanda: string, kanan: string, y: number, warnaKiri: string = W.langit, warnaKanan: string = W.krem): Obj[] => [
  ...kartu(`${id}a`, 18, y, 100, 28, warnaKiri, [kiri], 12),
  teks(`${id}s`, 150, y + 20, tanda, 18, W.merah),
  ...kartu(`${id}b`, 182, y, 100, 28, warnaKanan, [kanan], 12),
];

export const ADEGAN_BERLATIH: AdeganStory = {
  id: "berlatih-1-2",
  judul: "Ayo Berlatih nomor 1 dan 2",
  sumber: "Buku Siswa hlm. 14–15; Panduan Guru hlm. 28",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Berlatih",
    "Kerjakan soal berikut di buku latihan kalian.",
    "Bandingkan bilangan berikut dan temukan bilangan yang",
    "nilainya lebih kecil.",
    "56.475 dan 43.217",
    "78.897 dan 87.897",
    "97.768 dan 89.876",
    "pada kotak berikut ini!",
    "76.675",
    "67.765",
    "86.567",
    "86.576",
    "45.867",
    "55.876",
    "13.234",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor satu: temukan bilangan yang nilainya lebih kecil. Bagian a, lima puluh enam ribu empat ratus tujuh puluh lima dan empat puluh tiga ribu dua ratus tujuh belas.",
      tambah(0, judul("Nomor 1: mana yang lebih kecil?")),
      tambah("Bagian", ...kartu("n1", 24, 56, 100, 40, W.langit, ["56.475"], 14), ...kartu("n2", 176, 56, 100, 40, W.krem, ["43.217"], 14)),
      tambah("dan", teks("nq", 150, 84, "?", 24, W.merah)),
    ),
    k(
      "Puluh ribuannya lima dan empat. Empat lebih kecil, jadi bilangan yang lebih kecil adalah bilangan kedua. Satuan tujuh memang lebih besar dari lima, tetapi itu tidak menentukan.",
      warnai("Puluh", W.emas, "n1-k", "n2-k"),
      tambah("Puluh", teks("n3", 150, 130, "puluh ribuan: 5 dan 4", 11, W.biru)),
      tambah("kedua.", teks("n4", 150, 156, "lebih kecil: 43.217", 12, W.hijau)),
      tambah("Satuan", teks("n5", 150, 182, "satuan 7 dan 5 tidak menentukan", 9.6, W.coklat)),
    ),
    k(
      "Bagian b, tujuh puluh delapan ribu delapan ratus sembilan puluh tujuh dan delapan puluh tujuh ribu delapan ratus sembilan puluh tujuh. Tujuh lebih kecil dari delapan, jadi yang lebih kecil bilangan pertama.",
      bersih(0),
      tambah(0, judul("Nomor 1 bagian b")),
      tambah("Bagian", ...kartu("m1", 24, 56, 100, 40, W.langit, ["78.897"], 14), ...kartu("m2", 176, 56, 100, 40, W.krem, ["87.897"], 14)),
      tambah("Tujuh@5", teks("m3", 150, 130, "puluh ribuan: 7 dan 8", 11, W.biru)),
      tambah("pertama.", teks("m4", 150, 160, "lebih kecil: 78.897", 12, W.hijau)),
    ),
    k(
      "Bagian c, sembilan puluh tujuh ribu tujuh ratus enam puluh delapan dan delapan puluh sembilan ribu delapan ratus tujuh puluh enam. Delapan lebih kecil dari sembilan, jadi yang lebih kecil bilangan kedua.",
      bersih(0),
      tambah(0, judul("Nomor 1 bagian c")),
      tambah("Bagian", ...kartu("o1", 24, 56, 100, 40, W.langit, ["97.768"], 14), ...kartu("o2", 176, 56, 100, 40, W.krem, ["89.876"], 14)),
      tambah("Delapan@4", teks("o3", 150, 130, "puluh ribuan: 9 dan 8", 11, W.biru)),
      tambah("kedua.", teks("o4", 150, 160, "lebih kecil: 89.876", 12, W.hijau)),
    ),
    k(
      "Nomor dua. Pasangan pertama: tujuh puluh enam ribu enam ratus tujuh puluh lima dan enam puluh tujuh ribu tujuh ratus enam puluh lima. Tujuh lebih besar dari enam, jadi tandanya lebih dari.",
      bersih(0),
      tambah(0, judul("Nomor 2: isi dengan tanda")),
      tambah("Pasangan", ...pasang("p1", "76.675", "?", "67.765", 40)),
      ubah("jadi", { id: "p1s", isi: ">", warna: W.hijau }),
    ),
    k(
      "Pasangan kedua: delapan puluh enam ribu lima ratus enam puluh tujuh dan delapan puluh enam ribu lima ratus tujuh puluh enam. Beda pertama di puluhan: enam lebih kecil dari tujuh, jadi tandanya kurang dari.",
      tambah("Pasangan", ...pasang("p2", "86.567", "?", "86.576", 80)),
      ubah("jadi", { id: "p2s", isi: "<", warna: W.hijau }),
    ),
    k(
      "Pasangan ketiga: empat puluh lima ribu delapan ratus enam puluh tujuh dan lima puluh lima ribu delapan ratus tujuh puluh enam. Empat lebih kecil dari lima, jadi tandanya kurang dari.",
      tambah("Pasangan", ...pasang("p3", "45.867", "?", "55.876", 120)),
      ubah("jadi", { id: "p3s", isi: "<", warna: W.hijau }),
    ),
    k(
      "Pasangan keempat sama persis, tiga belas ribu dua ratus tiga puluh empat, jadi tandanya sama dengan. Keempat tanda ini cocok dengan kunci di panduan guru.",
      tambah("Pasangan", ...pasang("p4", "13.234", "?", "13.234", 160)),
      ubah("jadi", { id: "p4s", isi: "=", warna: W.hijau }),
      tambah("cocok", teks("p5", 150, 199, "cocok dengan kunci", 7.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 3: barisan bilangan (Buku Siswa hlm. 15; kunci Panduan Guru hlm. 28) ------------------------------ */
/** Satu baris lima kotak bilangan; kotak kosong berisi "?" dan diisi oleh ketukan berikutnya. */
const barisKotak = (id: string, y: number, isi: (string | null)[]): Obj[] =>
  isi.flatMap((s, i): Obj[] => [
    kotak(`${id}k${i}`, 10 + i * 56, y, 52, 24, s === null ? W.merahMuda : W.putih, W.biru, { rx: 4, tebal: 1.2 }),
    teks(`${id}t${i}`, 36 + i * 56, y + 16, s ?? "?", 9.6, s === null ? W.merah : W.hitam),
  ]);

export const ADEGAN_BARISAN: AdeganStory = {
  id: "berlatih-3",
  judul: "Ayo Berlatih nomor 3: barisan bilangan",
  sumber: "Buku Siswa hlm. 15; Panduan Guru hlm. 28",
  latar: "#EFF6FF",
  kutipan: ["Isilah dengan bilangan-bilangan yang sesuai.", "15.500 16.500", "19.500", "50.000 70.000", "85.350", "85.450", "85.550"],
  ketukan: [
    k(
      "Nomor tiga: isilah kotak dengan bilangan-bilangan yang sesuai. Ada tiga barisan, bagian a, b, dan c.",
      tambah(0, judul("Nomor 3: isi kotak yang kosong")),
      tambah("Nomor", emo("bq", 150, 90, "🔢", 44)),
      tambah("barisan,", teks("bq2", 150, 140, "tiga barisan: a, b, c", 11, W.coklat)),
    ),
    k(
      "Bagian a: lima belas ribu lima ratus, enam belas ribu lima ratus, dua kotak kosong, lalu sembilan belas ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Nomor 3 bagian a")),
      tambah("Bagian", teks("la", 150, 44, "a.", 10, W.coklat), ...barisKotak("a", 50, ["15.500", "16.500", null, null, "19.500"])),
    ),
    k(
      "Polanya naik seribu setiap langkah, jadi isiannya tujuh belas ribu lima ratus dan delapan belas ribu lima ratus. Bagian b naik dua puluh ribu: tiga puluh ribu, lima puluh ribu, tujuh puluh ribu, sembilan puluh ribu.",
      ubah("Polanya", { id: "at2", isi: "17.500", warna: W.hijau }, { id: "at3", isi: "18.500", warna: W.hijau }),
      warnai("jadi", W.hijauPita, "ak2", "ak3"),
      tambah("Bagian", teks("lb", 150, 98, "b.", 10, W.coklat), ...barisKotak("b", 104, [null, "50.000", "70.000", null])),
      tambah("sembilan", teks("bn", 150, 150, "naik 1.000 tiap langkah (a), naik 20.000 (b)", 8.8, W.coklat)),
      ubah("tiga", { id: "bt0", isi: "30.000", warna: W.hijau }),
      ubah("sembilan", { id: "bt3", isi: "90.000", warna: W.hijau }),
    ),
    k(
      "Bagian c naik lima puluh setiap langkah, mulai delapan puluh lima ribu tiga ratus lima puluh. Kotak yang kosong berisi delapan puluh lima ribu empat ratus dan delapan puluh lima ribu lima ratus. Semua cocok dengan kunci.",
      hapus(0, "bn"),
      tambah("Bagian", teks("lc", 150, 152, "c.", 10, W.coklat), ...barisKotak("c", 158, ["85.350", null, "85.450", null, "85.550"])),
      ubah("Kotak", { id: "ct1", isi: "85.400", warna: W.hijau }, { id: "ct3", isi: "85.500", warna: W.hijau }),
    ),
  ],
};

/* ------------------------------ 12. Miskonsepsi, diferensiasi, dan Refleksi 4 dan 5 (Panduan Guru hlm. 28 dan 29; Buku Siswa hlm. 26) ------------------------------ */
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-b",
  judul: "Miskonsepsi, diferensiasi, dan Refleksi",
  sumber: "Panduan Guru hlm. 28–29; Buku Siswa hlm. 26",
  latar: "#FFF7ED",
  kutipan: [
    "Kesalahan peserta didik yang mungkin terjadi adalah menganggap nilai",
    "terbesar dari angka belakang merupakan bilangan yang lebih besar.",
    "Bagi peserta didik dengan kecepatan belajar tinggi (advanced), minta mereka",
    "mengerjakan latihan tanpa bantuan atau mengeksplorasi berbagai angka yang",
    "sering mereka temui.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "Guru dapat menutup pembelajaran dengan meminta peserta didik melakukan",
    "Aku dapat membandingkan dua bilangan cacah sampai 100.000.",
    "Aku dapat mengurutkan beberapa bilangan cacah sampai 100.000.",
  ],
  ketukan: [
    k(
      "Miskonsepsi. Kesalahan yang mungkin terjadi: menganggap nilai terbesar dari angka belakang adalah bilangan yang lebih besar. Contohnya lima puluh enam ribu empat ratus tujuh puluh lima dan empat puluh tiga ribu dua ratus tujuh belas.",
      tambah(0, judul("Miskonsepsi")),
      tambah("Contohnya", ...kartu("x1", 24, 52, 100, 40, W.langit, ["56.475"], 14), ...kartu("x2", 176, 52, 100, 40, W.krem, ["43.217"], 14)),
      tambah("belakang", teks("x3", 150, 128, "satuan 7 lebih besar dari 5, jadi", 10, W.coklat), teks("x4", 150, 148, "43.217 lebih besar?", 12, W.merah)),
      tambah("belas", emo("x5", 150, 188, "❌", 22)),
    ),
    k(
      "Padahal angka paling kiri yang menentukan. Puluh ribuan lima lebih besar dari empat, jadi lima puluh enam ribu empat ratus tujuh puluh lima lebih besar. Mulailah membandingkan dari tempat paling kiri.",
      hapus(0, "x3", "x4", "x5"),
      warnai("kiri", W.emas, "x1-k", "x2-k"),
      tambah("Puluh", teks("x6", 150, 128, "puluh ribuan: 5 lebih besar dari 4", 10, W.biru)),
      tambah("jadi", teks("x7", 150, 152, "56.475 > 43.217", 14, W.hijau)),
      tambah("Mulailah", emo("x8", 150, 188, "✅", 22)),
    ),
    k(
      "Diferensiasi. Peserta didik yang cepat belajar mengerjakan latihan tanpa bantuan, atau menjelajahi berbagai angka yang sering mereka temui. Guru mendampingi yang mengalami kesulitan.",
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("cepat", ...kartu("d1", 24, 44, 252, 44, W.hijauMuda, ["cepat belajar: latihan tanpa bantuan,", "menjelajahi angka sehari-hari"], 9.4)),
      tambah("mendampingi", ...kartu("d2", 24, 108, 252, 44, W.krem, ["guru mendampingi yang", "mengalami kesulitan"], 9.4)),
    ),
    k(
      "Refleksi, nomor empat dan lima. Aku dapat membandingkan dua bilangan cacah sampai seratus ribu, dan aku dapat mengurutkan beberapa bilangan cacah sampai seratus ribu. Peserta didik mencentang ya atau tidak.",
      bersih(0),
      tambah(0, judul("Refleksi nomor 4 dan 5")),
      tambah("membandingkan", ...kartu("f1", 14, 40, 200, 44, W.langit, ["4. Aku dapat membandingkan dua", "bilangan cacah sampai 100.000."], 8.4)),
      tambah("mengurutkan", ...kartu("f2", 14, 100, 200, 44, W.hijauMuda, ["5. Aku dapat mengurutkan beberapa", "bilangan cacah sampai 100.000."], 8.4)),
      tambah("mencentang", teks("f3", 252, 66, "Ya / Tidak", 9.4, W.coklat), teks("f4", 252, 126, "Ya / Tidak", 9.4, W.coklat)),
    ),
    k(
      "Guru menutup pembelajaran dengan pertanyaan refleksi tentang kemampuan membandingkan dan mengurutkan bilangan sampai seratus ribu. Dengan bekal ini, harga dan angka apa pun yang kurang dari seratus ribu siap kita bandingkan.",
      bersih(0),
      tambah(0, judul("Siap membandingkan")),
      tambah("Guru", emo("z1", 150, 80, "⚖", 44)),
      tambah("harga", teks("z2", 150, 130, "bandingkan dari tempat paling kiri", 11, W.ungu)),
      tambah("angka", teks("z3", 150, 160, "lalu urutkan dari kecil ke besar", 11, W.hijau)),
    ),
  ],
};
