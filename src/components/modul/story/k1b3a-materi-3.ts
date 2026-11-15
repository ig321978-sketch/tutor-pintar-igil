import type { AdeganStory } from "./logika-story";
import { OWL, W, benda, bulat, emo, garis, ikatan, judul, kartu, kartuAngka, pusatSel, selBingkai, silang, tata, teks, type Titik } from "./k1b3a-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b3a-bantu";

/* ------------------------------ 1. Bingkai sepuluh dicoret: 8 − 3 = 5 ------------------------------ */
const SUARA_B1 = "Sekarang kita lihat bingkai sepuluh. Bingkai ini punya sepuluh petak yang masih kosong.";
const SUARA_B2 = "Delapan keping merah mengisi petak dari kiri ke kanan. Mula-mula ada delapan keping.";
const SUARA_B3 = "Sekarang tiga keping harus pergi. Ketuk tiga keping terakhir, lalu coret keping itu.";
const SUARA_B4 = "Keping yang dicoret adalah yang berkurang. Jadi berkurang tiga keping.";
const SUARA_B5 = "Sekarang hitung keping yang tidak dicoret. Satu, dua, tiga, empat, lima. Sisanya lima keping.";
const SUARA_B6 = "Jadi delapan dikurangi tiga sama dengan lima. Bingkai sepuluh membantu kita melihat sisanya dengan cepat.";
const BX = 25;
const BY = 36;
const SEL = 50;
const PS: Titik[] = Array.from({ length: 8 }, (_, i) => pusatSel(BX, BY, i, SEL));
const keping = (i: number) => bulat(`kg${i}`, PS[i].x, PS[i].y, 14, W.merah, W.merah, { tebal: 1 });

export const ADEGAN_BINGKAI: AdeganStory = {
  id: "bingkai-coret",
  judul: "Bingkai sepuluh dicoret: delapan kurang tiga",
  sumber: "Materi: bingkai sepuluh dicoret",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Bingkai sepuluh")), tambah("bingkai", ...selBingkai("bk", BX, BY, SEL)), tambah("sepuluh", teks("b10", 150, 160, "10 petak", 12, W.ungu))),
    k(SUARA_B2, hapus(0, "b10"), tambah("Delapan", ...PS.map((_, i) => keping(i))), tambah("Mula-mula", teks("b8", 150, 156, "mula-mula: 8 keping", 11, W.merah))),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "Ketuk"), emo("tg", PS[7].x, PS[7].y + 30, "\u{1F446}", 22)),
      tambah(idx(SUARA_B3, "coret"), ...silang("cr7", PS[7].x, PS[7].y, 14)),
      ubah(idx(SUARA_B3, "keping", 3), { id: "tg", x: PS[6].x }),
      tambah(idx(SUARA_B3, "keping", 3), ...silang("cr6", PS[6].x, PS[6].y, 14)),
      ubah(idx(SUARA_B3, "itu"), { id: "tg", x: PS[5].x }),
      tambah(idx(SUARA_B3, "itu"), ...silang("cr5", PS[5].x, PS[5].y, 14)),
    ),
    k(SUARA_B4, hapus(0, "tg"), tambah(8, teks("bb", 150, 172, "berkurang: 3 keping", 11, W.merah))),
    k(SUARA_B5, ...hitungAksi(SUARA_B5, "kg", PS.slice(0, 5), "dicoret."), tambah("Sisanya", teks("bs", 150, 188, "sisa: 5 keping", 11, W.hijau))),
    k(
      SUARA_B6,
      hapus(0, "tg", "kgn0", "kgn1", "kgn2", "kgn3", "kgn4", "b8", "bb", "bs"),
      tambah("Jadi", ...kartu("bj", 60, 150, 180, 36, W.emas, ["8 − 3 = 5"], 16)),
    ),
  ],
};

/* ------------------------------ 2. Goresan dicoret: 7 − 4 = 3 ------------------------------ */
const SUARA_G1 = "Kita juga bisa menunjukkan cerita dengan goresan. Ceritanya tentang tujuh anak yang bermain. Satu anak, satu goresan.";
const SUARA_G2 = "Sekarang empat anak harus pulang. Ketuk empat goresan terakhir, lalu coret goresan itu satu per satu.";
const SUARA_G3 = "Goresan yang dicoret adalah anak yang pergi. Jadi berkurang empat anak. Goresan yang tidak dicoret adalah sisanya.";
const SUARA_G4 = "Hitung goresan yang tidak dicoret. Satu, dua, tiga. Sisanya tiga goresan.";
const SUARA_G5 = "Tujuh dikurangi empat sama dengan tiga. Ucapkan lagi mengikuti suara guru.";
const GX = (i: number) => 40 + 36 * i;
const GY = 60;
const gores = (i: number) => garis(`gs${i}`, GX(i), GY, 0, 26, i < 3 ? W.biru : W.hijau, 4);
const coret = (i: number) => garis(`sl${i}`, GX(i) - 10, GY + 28, 20, -30, W.merah, 3, { gambar: true, z: 3 });
const PG: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: GX(i), y: GY }));

export const ADEGAN_GORESAN: AdeganStory = {
  id: "goresan-coret",
  judul: "Goresan dicoret: tujuh kurang empat",
  sumber: "Materi: goresan dicoret",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Goresan")), tambah("tujuh", ...PG.map((_, i) => gores(i)))),
    k(
      SUARA_G2,
      tambah(idx(SUARA_G2, "Ketuk"), emo("tg", GX(3), GY + 50, "\u{1F446}", 22)),
      tambah(10, coret(3)),
      ubah(12, { id: "tg", x: GX(4) }),
      tambah(12, coret(4)),
      ubah(13, { id: "tg", x: GX(5) }),
      tambah(13, coret(5)),
      ubah(15, { id: "tg", x: GX(6) }),
      tambah(15, coret(6)),
    ),
    k(SUARA_G3, hapus(0, "tg"), tambah(9, teks("e4", 150, 134, "berkurang: 4 goresan", 11, W.merah)), sorotkan(16, "gs0", "gs1", "gs2")),
    k(SUARA_G4, redamkan(0, "gs0", "gs1", "gs2"), ...hitungAksi(SUARA_G4, "gs", PG.slice(0, 3), "dicoret.")),
    k(SUARA_G5, hapus(0, "tg", "gsn0", "gsn1", "gsn2"), tambah("Tujuh", ...kartu("gk", 70, 150, 160, 34, W.emas, ["7 − 4 = 3"], 15))),
  ],
};

/* ------------------------------ 3. Memeriksa jawaban dengan menggabung ------------------------------ */
const SUARA_R1 = "Kita bisa memeriksa jawaban dengan menggabung. Ceritanya enam anak, dua anak pergi, sisanya empat anak.";
const SUARA_R2 = "Sisa dan yang pergi bisa digabung lagi. Sisa empat digabung dengan yang pergi dua. Hasilnya harus sama dengan mula-mula.";
const SUARA_R3 = "Empat ditambah dua sama dengan enam. Hasilnya enam, sama dengan mula-mula. Jadi jawaban kita benar.";
const SUARA_R4 = "Kalau hasilnya sama dengan mula-mula, jawabanmu benar. Kalau berbeda, hitung ulang pelan-pelan.";
const SUARA_R5 = "Ingat, tambah membuat benda lebih banyak. Kurang membuat benda lebih sedikit. Keduanya saling berlawanan.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa-gabung",
  judul: "Memeriksa jawaban dengan menggabung",
  sumber: "Materi: periksa jawaban dengan gabung",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Memeriksa jawaban")), tambah("Ceritanya", ...kartu("cs", 20, 34, 260, 30, W.krem, ["6 anak, pergi 2 anak, sisa 4 anak"], 9.4))),
    k(SUARA_R2, tambah("digabung", ...ikatan("ik", 150, 92, ["?", "4", "2"], ["a", "b"]))),
    k(
      SUARA_R3,
      tambah(0, ...ikatan("ik", 150, 92, ["?", "4", "2"], ["u"])),
      ubah(idx(SUARA_R3, "enam"), { id: "ik-ut", isi: "6" }),
      tambah(idx(SUARA_R3, "enam"), ...kartu("rj", 80, 176, 140, 24, W.emas, ["4 + 2 = 6"], 12)),
    ),
    k(SUARA_R4, tambah("benar.", emo("ok", 262, 100, "✅", 34)), tambah("berbeda,", emo("ul", 38, 100, "\u{1F504}", 30))),
    k(
      SUARA_R5,
      bersih(0),
      tambah(0, judul("Saling berlawanan")),
      tambah("tambah", ...kartu("l1", 20, 40, 260, 40, W.hijauMuda, ["tambah: makin banyak"], 11)),
      tambah("Kurang", ...kartu("l2", 20, 96, 260, 40, W.merahMuda, ["kurang: makin sedikit"], 11)),
      tambah("berlawanan.", emo("pa", 150, 170, "↔", 30)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 1: kelereng ------------------------------ */
const SUARA_A1 = "Latihan satu. Malosi punya tujuh kelereng. Dua kelereng menggelinding pergi. Berapa kelereng yang tersisa?";
const SUARA_A2 = "Hitung dulu mula-mula. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_A3 = "Sekarang dua kelereng pergi. Ketuk dua kelereng terakhir di layar, lalu hitung yang masih tinggal.";
const SUARA_A4 = "Satu, dua, tiga, empat, lima. Tersisa lima kelereng.";
const SUARA_A5 = "Tujuh dikurangi dua sama dengan berapa? Pilih jawaban yang benar di layar. Jawabannya lima.";
const SUARA_A6 = "Betul! Ada lima kelereng yang tersisa. Hebat sekali! Kamu sudah bisa mengurangkan kelereng dengan benar.";
const P7 = tata(7);
const kelereng = (i: number) => benda("kelereng", `lk${i}`, P7[i].x, P7[i].y, 11, i);
const pilihan = (xs: number[], isi: string[]) => xs.flatMap((x, i) => kartuAngka(`o${isi[i]}`, x, 140, isi[i], W.krem, 40, 36, 22));

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: kelereng Malosi",
  sumber: "Materi: latihan mengurangkan kelereng",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].flatMap(kelereng))),
    k(SUARA_A2, ...hitungAksi(SUARA_A2, "lk", P7, "mula-mula.")),
    k(
      SUARA_A3,
      hapus(0, "tg", "lkn0", "lkn1", "lkn2", "lkn3", "lkn4", "lkn5", "lkn6"),
      tambah(idx(SUARA_A3, "Ketuk"), emo("tg", P7[5].x, P7[5].y + 33, "\u{1F446}", 22)),
      hapus(idx(SUARA_A3, "hitung"), "lk5", "lk6", "tg"),
    ),
    k(SUARA_A4, ...hitungAksi(SUARA_A4, "lk", P7.slice(0, 5))),
    k(
      SUARA_A5,
      hapus(0, "tg", "lkn0", "lkn1", "lkn2", "lkn3", "lkn4"),
      tambah(0, ...kartu("lq", 85, 92, 130, 28, W.emas, ["7 − 2 = ?"], 13)),
      tambah("Pilih", ...pilihan([70, 130, 190], ["4", "5", "6"])),
      sorotkan("lima.", "o5-k"),
    ),
    k(SUARA_A6, tambah("Betul!", emo("ok", 60, 110, "✅", 36)), tambah("lima", teks("lj", 150, 196, "7 − 2 = 5", 12, W.hijau)), tambah("Hebat", emo("ow", 250, 110, OWL, 34))),
  ],
};

/* ------------------------------ 5. Latihan 2: balon dan susun kalimat ------------------------------ */
const SUARA_C1 = "Latihan dua. Wei punya delapan balon. Lalu tiga balon terbang ditiup angin. Berapa balon yang tersisa?";
const SUARA_C2 = "Hitung semua balon. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_C3 = "Tiga balon terbang pergi. Ketuk tiga balon terakhir, lalu hitung balon yang tinggal.";
const SUARA_C4 = "Satu, dua, tiga, empat, lima. Tersisa lima balon.";
const SUARA_C5 = "Sekarang susun kalimatnya dengan mengetuk kartu. Delapan, tanda kurang, tiga, tanda sama dengan, lima.";
const SUARA_C6 = "Hebat! Delapan dikurangi tiga sama dengan lima. Ada lima balon yang tersisa. Ingat, kita memakai bilangan paling banyak sepuluh.";
const P8 = tata(8);
const balon = (i: number) => benda("balon", `lc${i}`, P8[i].x, P8[i].y, 12, i);
const TOKEN = ["8", "−", "3", "=", "5"];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: balon Wei",
  sumber: "Materi: latihan menyusun kalimat",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 2")), tambah("delapan", ...[0, 1, 2, 3, 4, 5, 6, 7].flatMap(balon))),
    k(SUARA_C2, ...hitungAksi(SUARA_C2, "lc", P8, "balon.")),
    k(
      SUARA_C3,
      hapus(0, "tg", "lcn0", "lcn1", "lcn2", "lcn3", "lcn4", "lcn5", "lcn6", "lcn7"),
      tambah(idx(SUARA_C3, "Ketuk"), emo("tg", P8[5].x, P8[5].y + 33, "\u{1F446}", 22)),
      hapus(idx(SUARA_C3, "hitung"), "lc5", "lc5-x", "lc6", "lc6-x", "lc7", "lc7-x", "tg"),
    ),
    k(SUARA_C4, ...hitungAksi(SUARA_C4, "lc", P8.slice(0, 5))),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Susun kalimat")),
      ...TOKEN.map((t, i) => tambah(["Delapan,", "kurang,", "tiga,", "sama", "lima."][i], ...kartuAngka(`t${i}`, 30 + i * 48, 90, t, W.krem, 40, 40, 24))),
    ),
    k(SUARA_C6, bersih(0), tambah(0, judul("Hebat!"), emo("ow", 150, 90, OWL, 46)), tambah("lima", teks("bj", 150, 150, "8 − 3 = 5", 20, W.hijau)), tambah("sepuluh.", teks("b10", 150, 180, "paling banyak: 10", 10, W.ungu))),
  ],
};

/* ------------------------------ 6. Latihan 3: angka yang hilang ------------------------------ */
const SUARA_D1 = "Latihan tiga. Ada tujuh bola di lapangan sekolah. Kita akan mencari angka yang hilang.";
const SUARA_D2 = "Lalu beberapa bola menggelinding pergi. Sekarang bola yang tinggal hanya empat. Berapa bola yang pergi?";
const SUARA_D3 = "Hitung bola yang pergi. Satu, dua, tiga. Ada tiga bola yang pergi.";
const SUARA_D4 = "Tujuh dikurangi berapa sama dengan empat? Pilih kartu angka yang tepat untuk kotak yang kosong.";
const SUARA_D5 = "Betul, tiga! Tujuh dikurangi tiga sama dengan empat. Kamu sudah bisa mencari angka yang hilang.";
const PB = tata(7);
const bola = (i: number) => benda("bola", `bo${i}`, PB[i].x, PB[i].y, 11, i);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: angka yang hilang",
  sumber: "Materi: latihan angka yang hilang",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Latihan 3")), tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].flatMap(bola))),
    k(SUARA_D2, ubah("menggelinding", { id: "bo4", op: 0.25 }, { id: "bo5", op: 0.25 }, { id: "bo6", op: 0.25 }), sorotkan("empat.", "bo0", "bo1", "bo2", "bo3")),
    k(SUARA_D3, redamkan(0, "bo0", "bo1", "bo2", "bo3"), ...hitungAksi(SUARA_D3, "pg", [PB[4], PB[5], PB[6]], "pergi.")),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Angka yang hilang"), ...kartu("lq", 70, 46, 160, 32, W.emas, ["7 − ? = 4"], 15)),
      tambah("Pilih", ...[2, 3, 4].flatMap((n, i) => kartuAngka(`o${n}`, 66 + i * 60, 100, String(n), W.krem, 40, 36, 22))),
    ),
    k(SUARA_D5, hapus(0, "lq-k", "lq-t0"), sorotkan("tiga!", "o3-k"), tambah("Tujuh", ...kartu("qj", 70, 46, 160, 32, W.hijauMuda, ["7 − 3 = 4"], 15)), tambah("Kamu", emo("ow", 262, 170, OWL, 30))),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Mengurangi artinya benda berkurang karena ada yang pergi. Ucapkan lagi mengikuti suara guru.";
const SUARA_Z2 = "Cerita pengurangan punya tiga bagian. Mula-mula, berkurang, dan sisa. Contohnya enam dikurangi dua sama dengan empat.";
const SUARA_Z3 = "Kalau semua benda pergi, sisanya nol. Bilangan yang kita pakai paling banyak sepuluh. Kamu bisa mengetuk benda di layar, lalu menghitung sisanya.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("berkurang", ...kartu("z1", 14, 34, 272, 34, W.hijauMuda, ["ada yang pergi, jadi berkurang"], 9.6))),
    k(SUARA_Z2, tambah("tiga", ...kartu("z2", 14, 78, 272, 34, W.langit, ["mula-mula, berkurang, sisa"], 9.6)), tambah("Contohnya", ...kartu("z3", 14, 122, 272, 34, W.krem, ["6 − 2 = 4"], 12))),
    k(SUARA_Z3, tambah("nol.", ...kartu("z4", 14, 166, 272, 28, W.pink, ["semua pergi: sisa nol; paling banyak: 10"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
