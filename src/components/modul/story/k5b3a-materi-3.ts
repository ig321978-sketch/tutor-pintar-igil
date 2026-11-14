import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, garisBilangan, judul, kartu, kisi, kotak, pai, panah, penanda, segitiga16, segitiga4, teks } from "./k5b3a-gambar";
import { bersih, k, sorotkan, tambah, ubah, warnai } from "./k5b3a-bantu";

/* ------------------------------ 8. Cara pertama: garis bilangan (Buku Siswa hlm. 71 sampai 72) ------------------------------ */
/** Garis bilangan 0 sampai 4: titik 0 di x = 26, satu satuan 62 piksel (dipakai uji untuk memeriksa letak penanda). */
export const GB = { x: 26, satuan: 62, maks: 4 };
const penandaBiru = (id: string, y: number, nilai: number, label: string, bawah = 13, u = 7.4): Obj[] => penanda(id, GB.x, y, GB.satuan, nilai, label, W.biru, bawah, u);
const penandaMerah = (id: string, y: number, nilai: number, label: string, bawah = 13, u = 8.4): Obj[] => penanda(id, GB.x, y, GB.satuan, nilai, label, W.merah, bawah, u);

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-bilangan",
  judul: "Cara pertama: garis bilangan",
  sumber: "Buku Siswa hlm. 71–72",
  latar: "#F5F3FF",
  kutipan: [
    "Menggunakan Garis Bilangan",
    "Makin ke kanan posisi pecahan, nilainya makin besar. Begitu juga",
    "sebaliknya, makin ke kiri posisinya, nilainya makin kecil.",
    "Pada garis bilangan di atas, di manakah letak",
    "Perhatikan letak pecahan",
    "pada garis bilangan di atas.",
    "Urutan dari yang terbesar adalah",
    "Dengan demikian, urutan lompatan Yohana dari yang paling jauh",
  ],
  ketukan: [
    k(
      "Cara pertama memakai garis bilangan. Aturannya: makin ke kanan posisi pecahan, makin besar nilainya. Makin ke kiri, makin kecil.",
      tambah(0, judul("1. Garis bilangan")),
      tambah(0, ...garisBilangan("g0", GB.x, 70, GB.satuan, GB.maks, 9)),
      tambah("kanan", teks("tk", 150, 108, "makin ke kanan, makin besar", 9.4, W.hijau), panah("pk", 60, 118, 180, 0, W.hijau, 2.4, { gambar: true })),
      tambah("kiri,", teks("tl", 150, 146, "makin ke kiri, makin kecil", 9.4, W.merah), panah("pl", 240, 156, -180, 0, W.merah, 2.4, { gambar: true })),
    ),
    k(
      "Garis pertama bertanda tiga per empat, enam per empat, sembilan per empat, dan dua belas per empat. Di mana letak sebelas per empat? Di antara sembilan per empat dan dua belas per empat.",
      bersih(0),
      tambah(0, judul("Di mana letak 11/4?")),
      tambah(0, ...garisBilangan("g1", GB.x, 60, GB.satuan, GB.maks, 9)),
      tambah("tiga", ...penandaBiru("n3_4", 60, 3 / 4, "3/4")),
      tambah("enam", ...penandaBiru("n6_4", 60, 6 / 4, "6/4")),
      tambah("sembilan", ...penandaBiru("n9_4", 60, 9 / 4, "9/4")),
      tambah("belas", ...penandaBiru("n12_4", 60, 12 / 4, "12/4")),
      tambah("sebelas", ...penandaMerah("n11_4", 60, 11 / 4, "11/4", -20)),
    ),
    k(
      "Garis kedua bertanda satu per dua, dua per dua, tiga per dua, dan seterusnya. Tujuh per dua jatuh di tengah, antara tiga dan empat.",
      tambah(0, ...garisBilangan("g2", GB.x, 110, GB.satuan, GB.maks, 9)),
      tambah(3, ...penandaBiru("n1_2", 110, 1 / 2, "1/2")),
      tambah(6, ...penandaBiru("n2_2", 110, 2 / 2, "2/2")),
      tambah(9, ...penandaBiru("n3_2", 110, 3 / 2, "3/2")),
      tambah("seterusnya.", teks("tt", 175, 123, "...", 12, W.biru)),
      tambah("Tujuh", ...penandaMerah("n7_2", 110, 7 / 2, "7/2")),
    ),
    k(
      "Garis ketiga bertanda satu per delapan, tiga per delapan, lima per delapan, dan tujuh per delapan. Tujuh per delapan hampir mencapai angka satu.",
      tambah(0, ...garisBilangan("g3", GB.x, 160, GB.satuan, GB.maks, 9)),
      tambah(3, ...penandaBiru("n1_8", 160, 1 / 8, "1/8", 12, 6.4)),
      tambah(6, ...penandaBiru("n3_8", 160, 3 / 8, "3/8", 12, 6.4)),
      tambah(9, ...penandaBiru("n5_8", 160, 5 / 8, "5/8", 12, 6.4)),
      tambah(13, ...penandaMerah("n7_8", 160, 7 / 8, "7/8", 12, 8)),
      sorotkan("hampir", "n7_8"),
    ),
    k(
      "Dari yang paling kanan: tujuh per dua, sebelas per empat, lalu tujuh per delapan. Jadi urutan lompatan Yohana dari yang terjauh: tiga dan satu per dua meter, dua dan tiga per empat meter, lalu tujuh per delapan meter.",
      bersih(0),
      tambah(0, judul("Urutan dari yang terjauh")),
      tambah("tujuh", ...kartu("o1", 40, 40, 240, 34, W.hijauMuda, ["7/2 = 3 1/2 m"], 11)),
      tambah("sebelas", ...kartu("o2", 40, 84, 240, 34, W.langit, ["11/4 = 2 3/4 m"], 11)),
      tambah("lalu", ...kartu("o3", 40, 128, 240, 34, W.krem, ["7/8 m"], 11)),
      tambah("Jadi", emo("md1", 20, 64, "🥇", 22), emo("md2", 20, 108, "🥈", 22), emo("md3", 20, 152, "🥉", 22)),
    ),
  ],
};

/* ------------------------------ 9. Cara kedua: membandingkan pembilang (Buku Siswa hlm. 72 sampai 74) ------------------------------ */
export const ADEGAN_PEMBILANG: AdeganStory = {
  id: "bandingkan-pembilang",
  judul: "Cara kedua: membandingkan pembilang",
  sumber: "Buku Siswa hlm. 72–74",
  latar: "#FFF7ED",
  kutipan: [
    "Membandingkan Pembilang",
    "Kita ubah bentuk pecahan campuran menjadi bentuk pecahan biasa.",
    "Hasil lompatan Yohana merupakan pecahan dengan penyebut",
    "yang berbeda-beda, yaitu",
    "Bagaimana cara menyamakan penyebut tersebut?",
    "Mencari KPK dari 4, 2, dan 8.",
    "KPK dari 4, 2, dan 8 adalah",
    "Membandingkan pembilang",
    "Pembilangnya =",
    "maka urutan hasil lompatan Yohana dari yang paling jauh adalah",
  ],
  ketukan: [
    k(
      "Cara kedua, membandingkan pembilang. Dua pecahan campuran sudah diubah menjadi sebelas per empat dan tujuh per dua. Tujuh per delapan memang sudah pecahan biasa.",
      tambah(0, judul("2. Membandingkan pembilang")),
      tambah("sebelas", ...kartu("p1", 10, 40, 86, 46, W.hijauMuda, ["11/4", "(2 3/4 m)"], 10)),
      tambah("tujuh", ...kartu("p2", 107, 40, 86, 46, W.langit, ["7/2", "(3 1/2 m)"], 10)),
      tambah("tujuh@2", ...kartu("p3", 204, 40, 86, 46, W.krem, ["7/8", "(7/8 m)"], 10)),
    ),
    k(
      "Tetapi penyebutnya berbeda: empat, dua, dan delapan. Pecahan baru mudah dibandingkan pembilangnya kalau penyebutnya sama. Bagaimana menyamakannya? Dengan mencari KPK.",
      tambah("empat,", teks("d1", 53, 106, "penyebut 4", 9.4, W.merah)),
      tambah("dua,", teks("d2", 150, 106, "penyebut 2", 9.4, W.merah)),
      tambah("delapan.", teks("d3", 247, 106, "penyebut 8", 9.4, W.merah)),
      tambah("KPK.", ...kartu("kq", 90, 130, 120, 36, W.emas, ["samakan: cari KPK"], 10)),
    ),
    k(
      "Kelipatan empat: empat, delapan. Kelipatan dua: dua, empat, enam, delapan. Kelipatan delapan: delapan. KPK dari empat, dua, dan delapan adalah delapan.",
      bersih(0),
      tambah(0, judul("Mencari KPK dari 4, 2, dan 8")),
      tambah("Kelipatan", teks("l4", 150, 52, "Kelipatan 4: 4, 8", 11, W.biru)),
      tambah("Kelipatan@2", teks("l2", 150, 82, "Kelipatan 2: 2, 4, 6, 8", 11, W.biru)),
      tambah("Kelipatan@3", teks("l8", 150, 112, "Kelipatan 8: 8", 11, W.biru)),
      tambah("KPK", teks("kp", 150, 164, "KPK = 8", 22, W.merah)),
    ),
    k(
      "Ubah semuanya ke penyebut delapan. Sebelas per empat, kalikan atas dan bawah dengan dua, menjadi dua puluh dua per delapan. Tujuh per dua, kalikan dengan empat, menjadi dua puluh delapan per delapan. Tujuh per delapan tetap.",
      bersih(0),
      tambah(0, judul("Samakan penyebut menjadi 8")),
      tambah("Sebelas", teks("q1", 120, 62, "11/4 = 22/8", 17, W.biru), teks("x1", 244, 62, "× 2", 11, W.merah)),
      tambah("Tujuh", teks("q2", 120, 106, "7/2 = 28/8", 17, W.biru), teks("x2", 244, 106, "× 4", 11, W.merah)),
      tambah("Tujuh@2", teks("q3", 120, 150, "7/8 = 7/8", 17, W.biru), teks("x3", 244, 150, "tetap", 10, W.hijau)),
    ),
    k(
      "Sekarang penyebutnya sama, yaitu delapan. Bandingkan pembilangnya: dua puluh dua, dua puluh delapan, dan tujuh. Tujuh lebih kecil daripada dua puluh dua, yang lebih kecil daripada dua puluh delapan.",
      tambah("Bandingkan", teks("pm", 150, 176, "pembilang: 22, 28, 7", 10, W.ungu)),
      tambah("lebih", ...kartu("pk", 80, 180, 140, 18, W.emas, ["7 < 22 < 28"], 10.4)),
      ubah("lebih", { id: "pm", y: 172 }),
    ),
    k(
      "Maka urutan hasil lompatan Yohana dari yang paling jauh: dua puluh delapan per delapan, yaitu tiga dan satu per dua meter; dua puluh dua per delapan, yaitu dua dan tiga per empat meter; lalu tujuh per delapan meter.",
      bersih(0),
      tambah(0, judul("Urutan dari yang paling jauh")),
      tambah("puluh", ...kartu("u1", 40, 40, 240, 34, W.hijauMuda, ["28/8 = 3 1/2 m"], 11)),
      tambah("puluh@2", ...kartu("u2", 40, 84, 240, 34, W.langit, ["22/8 = 2 3/4 m"], 11)),
      tambah("tujuh", ...kartu("u3", 40, 128, 240, 34, W.krem, ["7/8 = 7/8 m"], 11)),
      tambah("lalu", emo("v1", 20, 64, "🥇", 22), emo("v2", 20, 108, "🥈", 22), emo("v3", 20, 152, "🥉", 22)),
    ),
  ],
};

/* ------------------------------ 10. Cara ketiga: membandingkan bilangan bulat (Buku Siswa hlm. 74; Panduan Guru hlm. 103) ------------------------------ */
export const ADEGAN_BULAT: AdeganStory = {
  id: "bandingkan-bulat",
  judul: "Cara ketiga: membandingkan bilangan bulat",
  sumber: "Buku Siswa hlm. 74; Panduan Guru hlm. 103",
  latar: "#F0FDFA",
  kutipan: [
    "Membandingkan Bilangan bulat",
    "Daftar hasil lompatan Yohana yaitu",
    "Perhatikan komponen bilangan bulat pada pecahan hasil",
    "lompatan Yohana. Coba urutkan dari yang terkecil.",
    "maka urutan hasil lompatan Yohana adalah",
    "membandingkan bilangan bulat",
    "(jika memang dalam soal adalah pecahan campuran).",
    "dengan menggunakan cara berbeda pastikan mempunyai hasil yang sama",
  ],
  ketukan: [
    k(
      "Cara ketiga, membandingkan bilangan bulat. Daftar lompatan Yohana: dua dan tiga per empat, tiga dan satu per dua, serta tujuh per delapan. Perhatikan bagian bilangan bulatnya.",
      tambah(0, judul("3. Membandingkan bilangan bulat")),
      tambah("empat,", ...kartu("b1", 10, 40, 86, 40, W.hijauMuda, ["2 3/4"], 14)),
      tambah("dua@2", ...kartu("b2", 107, 40, 86, 40, W.langit, ["3 1/2"], 14)),
      tambah("delapan.", ...kartu("b3", 204, 40, 86, 40, W.krem, ["7/8"], 14)),
      tambah("bulatnya.", teks("c1", 53, 100, "bulat 2", 9.4, W.merah), teks("c2", 150, 100, "bulat 3", 9.4, W.merah), teks("c3", 247, 100, "tanpa bulat", 9.4, W.merah)),
    ),
    k(
      "Bagian bulatnya dua, tiga, dan tujuh per delapan tidak punya bagian bulat, atau nol. Urutkan dari yang terkecil: tujuh per delapan, lalu dua dan tiga per empat, lalu tiga dan satu per dua.",
      tambah("nol.", ...kartu("bn", 70, 122, 160, 32, W.emas, ["0 < 2 < 3"], 12)),
      ubah("terkecil:", { id: "c1", isi: "urutan ke-2" }, { id: "c2", isi: "urutan ke-3" }, { id: "c3", isi: "urutan ke-1" }),
    ),
    k(
      "Panduan guru berpesan: cara dengan bilangan bulat dipakai kalau soalnya pecahan campuran. Dan apa pun caranya, hasilnya harus sama.",
      bersih(0),
      tambah(0, judul("Pesan Panduan Guru")),
      tambah("dipakai", ...kartu("pg", 10, 40, 134, 34, W.hijauMuda, ["bilangan bulat:", "untuk pecahan campuran"], 8.4)),
      tambah("caranya,", ...kartu("pn", 156, 40, 134, 34, W.langit, ["garis bilangan"], 9), ...kartu("pm", 10, 84, 134, 34, W.krem, ["membandingkan", "pembilang"], 9)),
      tambah("sama.", emo("ok", 200, 112, "✅", 26), ...kartu("ps", 60, 140, 180, 36, W.emas, ["hasil harus sama"], 11)),
    ),
    k(
      "Tiga cara, satu jawaban. Garis bilangan, pembilang, dan bilangan bulat menghasilkan urutan yang sama. Dari yang terjauh: tiga dan satu per dua meter, dua dan tiga per empat meter, lalu tujuh per delapan meter.",
      bersih(0),
      tambah(0, judul("Tiga cara, satu jawaban")),
      tambah("Garis", ...kartu("h1", 10, 36, 280, 40, W.hijauMuda, ["garis bilangan:", "7/2 > 11/4 > 7/8"], 9.4)),
      tambah("pembilang,", ...kartu("h2", 10, 84, 280, 40, W.langit, ["pembilang: 28 > 22 > 7", "(semua per delapan)"], 9.4)),
      tambah("bulat", ...kartu("h3", 10, 132, 280, 40, W.krem, ["bilangan bulat: 3 > 2 > 0", "(7/8 tanpa bulat)"], 9.4)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih (Buku Siswa hlm. 74 sampai 75; Panduan Guru hlm. 104) ------------------------------ */
/** Tiga potongan pita Nisa digambar 60 piksel per meter. */
export const PITA_GAMBAR = { x: 20, satuan: 60, baris: [44, 74, 104] };
const pitaBar = (id: string, y: number, meter: number, warna: string): Obj => kotak(id, PITA_GAMBAR.x, y, meter * PITA_GAMBAR.satuan, 20, warna, W.biru, { rx: 4 });

export const ADEGAN_BERLATIH: AdeganStory = {
  id: "ayo-berlatih",
  judul: "Ayo Berlatih: membandingkan gambar dan mengurutkan pita",
  sumber: "Buku Siswa hlm. 74–75; Panduan Guru hlm. 104",
  latar: "#FEFCE8",
  kutipan: [
    "Bandingkan kedua gambar berikut ini, kemudian isilah titik-titik",
    "dengan tanda <, =, atau >.",
    "Nisa memiliki tiga potongan pita dengan panjang",
    "Bantulah Nisa mengurutkan potongan pita dari yang terpendek.",
    "Urutan potongan pita dari yang terpendek yaitu",
  ],
  ketukan: [
    k(
      "Ayo Berlatih, nomor satu: bandingkan dua gambar dengan tanda lebih kecil, sama dengan, atau lebih besar. Gambar a: dua lingkaran dibagi dua belas bagian. Kiri berwarna delapan bagian, kanan sebelas bagian. Kunci: kiri lebih kecil.",
      tambah(0, judul("Ayo Berlatih 1a")),
      tambah("lingkaran", ...pai("pl", 75, 96, 46, 12, 0), ...pai("pr", 225, 96, 46, 12, 0), teks("ee", 150, 100, "...", 22, W.merah)),
      warnai("delapan", W.karang, ...Array.from({ length: 8 }, (_, i) => `pl-w${i}`)),
      tambah("delapan", teks("fl", 75, 166, "8/12", 14, W.biru)),
      warnai("sebelas", W.karang, ...Array.from({ length: 11 }, (_, i) => `pr-w${i}`)),
      tambah("sebelas", teks("fr", 225, 166, "11/12", 14, W.biru)),
      ubah("Kunci:", { id: "ee", isi: "<" }),
    ),
    k(
      "Gambar b: segitiga kiri berwarna tiga dari empat bagian, segitiga kanan satu dari empat bagian. Kiri lebih besar.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1b")),
      tambah("segitiga", ...segitiga4("tl", 20, 48, 110, 96, [0, 3, 2]), teks("la", 75, 166, "3/4", 14, W.biru)),
      tambah("kanan", ...segitiga4("tr", 170, 48, 110, 96, [3]), teks("lb", 225, 166, "1/4", 14, W.biru)),
      tambah("besar.", teks("lt", 150, 100, ">", 24, W.merah)),
    ),
    k(
      "Gambar c: segitiga kiri tiga dari empat bagian berwarna, segitiga kanan sembilan dari enam belas bagian. Tiga per empat sama dengan dua belas per enam belas, jadi kiri lebih besar.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1c")),
      tambah("segitiga", ...segitiga4("cl", 20, 44, 110, 96, [0, 1, 2]), teks("ma", 75, 158, "3/4", 14, W.biru)),
      tambah("kanan", ...segitiga16("cr", 170, 44, 110, 96, [0, 1, 2]), teks("mb", 225, 158, "9/16", 14, W.biru)),
      tambah("sama", teks("me", 150, 188, "3/4 = 12/16", 12, W.ungu)),
      tambah("jadi", teks("mt", 150, 96, ">", 24, W.merah)),
    ),
    k(
      "Gambar d: kiri enam petak dengan tiga berwarna, kanan enam jalur dengan dua berwarna. Tiga per enam lebih besar daripada dua per enam.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 1d")),
      tambah("kiri", ...kisi("dl", 30, 60, 28, 36, 3, 2, [0, 2, 4]), teks("na", 72, 118 + 28, "3/6", 14, W.biru)),
      tambah("kanan", ...kisi("dr", 170, 60, 15, 72, 6, 1, [0, 2]), teks("nb", 215, 118 + 28, "2/6", 14, W.biru)),
      tambah("Tiga@2", ...kartu("nk", 80, 176, 140, 22, W.emas, ["3/6 > 2/6"], 10.4)),
    ),
    k(
      "Nomor dua: Nisa punya tiga pita, dua dan dua per lima meter, dua dan satu per empat meter, dan dua dan satu per dua meter. Bulatnya sama, jadi bandingkan pecahannya. KPK lima, empat, dan dua adalah dua puluh.",
      bersih(0),
      tambah(0, judul("Ayo Berlatih 2: pita Nisa")),
      tambah(10, pitaBar("pa", PITA_GAMBAR.baris[0], 2.4, W.pink), teks("ta", 174, PITA_GAMBAR.baris[0] + 14, "2 2/5 m", 8.4, W.biru, { anchor: "start" })),
      tambah(16, pitaBar("pb", PITA_GAMBAR.baris[1], 2.25, W.hijauMuda), teks("tb", 174, PITA_GAMBAR.baris[1] + 14, "2 1/4 m", 8.4, W.biru, { anchor: "start" })),
      tambah(23, pitaBar("pc", PITA_GAMBAR.baris[2], 2.5, W.langit), teks("tc", 174, PITA_GAMBAR.baris[2] + 14, "2 1/2 m", 8.4, W.biru, { anchor: "start" })),
      tambah("Bulatnya", teks("bs", 150, 152, "bulatnya sama: 2", 10, W.ungu)),
      tambah("KPK", teks("kp", 150, 180, "KPK 5, 4, 2 = 20", 12, W.merah)),
    ),
    k(
      "Dua per lima menjadi delapan per dua puluh, satu per empat menjadi lima per dua puluh, satu per dua menjadi sepuluh per dua puluh.",
      tambah(4, teks("ea", 226, PITA_GAMBAR.baris[0] + 14, "2/5 = 8/20", 8.4, W.merah, { anchor: "start" })),
      tambah(12, teks("eb", 226, PITA_GAMBAR.baris[1] + 14, "1/4 = 5/20", 8.4, W.merah, { anchor: "start" })),
      tambah(20, teks("ec", 226, PITA_GAMBAR.baris[2] + 14, "1/2 = 10/20", 8.4, W.merah, { anchor: "start" })),
    ),
    k(
      "Dari terpendek: dua dan satu per empat, dua dan dua per lima, lalu dua dan satu per dua. Sesuai kunci Panduan Guru.",
      tambah(6, teks("r1", 32, PITA_GAMBAR.baris[1] + 14, "1", 11, W.merah)),
      tambah(11, teks("r2", 32, PITA_GAMBAR.baris[0] + 14, "2", 11, W.merah)),
      tambah(17, teks("r3", 32, PITA_GAMBAR.baris[2] + 14, "3", 11, W.merah)),
      tambah("Sesuai", emo("ck", 150, 120, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 12. Penutup menurut Panduan Guru: miskonsepsi, diferensiasi, refleksi (Panduan Guru hlm. 104 sampai 105) ------------------------------ */
export const ADEGAN_GURU: AdeganStory = {
  id: "penutup-guru",
  judul: "Panduan Guru: miskonsepsi, diferensiasi, dan refleksi",
  sumber: "Panduan Guru hlm. 104–105",
  latar: "#F5F3FF",
  kutipan: [
    "Miskonsepsi",
    "Saat membandingkan dan mengurutkan bilangan pecahan, peserta didik",
    "seringkali menyamakan penyebut tanpa mengalikan dengan pembilangnya.",
    "Selain itu, peserta didik seringkali juga melakukan kesalahan dalam melakukan",
    "perhitungan pada bilangan campuran.",
    "Diferensiasi",
    "Bagi peserta didik dengan kecepatan belajar tinggi",
    "minta mereka",
    "mengerjakan latihan tanpa bantuan.",
    "guru dapat",
    "mendampingi peserta didik yang mengalami kesulitan.",
    "Guru dapat menutup pembelajaran dengan meminta peserta didik melakukan",
    "dalam membandingkan dan mengurutkan bilangan pecahan.",
  ],
  ketukan: [
    k(
      "Panduan guru memperingatkan dua kesalahan yang sering muncul. Pertama, menyamakan penyebut tanpa mengalikan pembilangnya. Kedua, salah menghitung pada bilangan campuran.",
      tambah(0, judul("Miskonsepsi")),
      tambah("Pertama,", ...kartu("ms", 10, 34, 134, 56, W.merahMuda, ["salah", "11/4 → 11/8", "pembilang lupa dikali"], 8.2)),
      tambah("pembilangnya.", ...kartu("mb", 156, 34, 134, 56, W.hijauMuda, ["benar", "11/4 → 22/8", "atas dan bawah dikali 2"], 8.2)),
      tambah("Kedua,", ...kartu("mc", 10, 106, 280, 50, W.krem, ["salah hitung pada campuran, contoh:", "2 3/4 → 5/4, padahal seharusnya 11/4"], 8.6)),
    ),
    k(
      "Untuk peserta didik yang cepat belajar, minta mereka mengerjakan latihan tanpa bantuan. Sementara itu guru mendampingi peserta didik yang mengalami kesulitan.",
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("cepat", emo("rk", 70, 80, "🚀", 36), ...kartu("d1", 14, 100, 130, 40, W.hijauMuda, ["cepat belajar:", "kerjakan sendiri"], 8.8)),
      tambah("Sementara", emo("jb", 230, 80, "🤝", 36), ...kartu("d2", 156, 100, 130, 40, W.langit, ["kesulitan:", "didampingi guru"], 8.8)),
    ),
    k(
      "Guru menutup pelajaran dengan refleksi tentang kemampuan membandingkan dan mengurutkan pecahan. Ingat, cara apa pun yang dipilih harus menghasilkan jawaban yang sama.",
      bersih(0),
      tambah(0, judul("Refleksi")),
      tambah("membandingkan", ...kartu("f1", 20, 36, 260, 32, W.hijauMuda, ["kemampuan membandingkan pecahan"], 9)),
      tambah("mengurutkan", ...kartu("f2", 20, 78, 260, 32, W.langit, ["kemampuan mengurutkan pecahan"], 9)),
      tambah("Ingat,", ...kartu("f3", 20, 120, 260, 32, W.krem, ["cara berbeda, hasil harus sama"], 9)),
    ),
    k(
      "Jadi di subbab A kita belajar membandingkan dan mengurutkan pecahan dengan tiga cara: garis bilangan, membandingkan pembilang setelah penyebut disamakan, dan membandingkan bilangan bulat. Cara apa pun, hasilnya sama.",
      bersih(0),
      tambah(0, judul("Rangkuman Subbab A")),
      tambah("garis", ...kartu("z1", 14, 34, 272, 28, W.hijauMuda, ["1. garis bilangan"], 9.4)),
      tambah("pembilang", ...kartu("z2", 14, 68, 272, 28, W.langit, ["2. banding pembilang (penyebut disamakan)"], 9)),
      tambah("bulat.", ...kartu("z3", 14, 102, 272, 28, W.krem, ["3. banding bilangan bulat"], 9.4)),
      tambah("sama.", emo("zk", 150, 168, "✅", 28), teks("zt", 150, 188, "hasil sama", 9.4, W.hijau)),
    ),
  ],
};
