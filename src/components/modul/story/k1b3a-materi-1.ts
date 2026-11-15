import type { AdeganStory } from "./logika-story";
import { OWL, W, baris, emo, garis, judul, kartu, kotak, papan, teks } from "./k1b3a-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b3a-bantu";

const ANAK_EMO = "\u{1F9D2}";

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Hari ini mereka punya cerita yang seru.";
const SUARA_C2 = "Igil bertanya, kalau ada benda di sini, lalu ada yang pergi, tinggal berapa? Ayo kita cari jawabannya pelan-pelan.";
const SUARA_C3 = "Hari ini kita belajar tiga hal. Pertama, benda yang berkurang. Kedua, benda yang tersisa. Ketiga, menyusun kalimat kurang.";
const SUARA_C4 = "Kita memakai bilangan sampai sepuluh saja. Pelan-pelan, ya. Kalau perlu, ketuk benda di layar satu per satu sambil menghitung.";
const SUARA_C5 = "Kita mulai dari permainan tutup mata. Ada enam anak yang bermain. Lalu ada yang pulang. Ayo kita lihat ceritanya sampai selesai.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Malosi, Kira, Upe, dan Wei di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), garis("tanah", 14, 142, 272, 0, W.hijau, 3)),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, ANAK_EMO, 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, OWL, 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Tinggal berapa?")),
      tambah("berapa?", emo("tanya", 150, 100, "❓", 50)),
      tambah("lalu", ...kartu("bq", 40, 140, 220, 30, W.krem, ["ada benda, lalu ada yang pergi"], 9.4)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Hari ini kita belajar")),
      tambah("berkurang.", ...kartu("h1", 20, 36, 260, 32, W.hijauMuda, ["Benda yang berkurang"], 10)),
      tambah("tersisa.", ...kartu("h2", 20, 80, 260, 32, W.langit, ["Benda yang tersisa"], 10)),
      tambah("menyusun", ...kartu("h3", 20, 124, 260, 32, W.pink, ["Menyusun kalimat kurang"], 10)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Sampai sepuluh saja")),
      tambah("sepuluh", teks("s10", 150, 96, "10", 44, W.merah)),
      tambah("ketuk", emo("jr", 150, 150, "\u{1F446}", 34)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Tutup mata"), garis("tanah", 14, 150, 272, 0, W.hijau, 3)),
      tambah("enam", emo("l1", 70, 128, ANAK_EMO, 30), emo("l2", 110, 128, ANAK_EMO, 30), emo("l3", 150, 128, ANAK_EMO, 30), emo("tm", 150, 76, "\u{1F648}", 40)),
      tambah("pulang.", emo("rm", 240, 128, "\u{1F3E0}", 36)),
    ),
  ],
};

/* ------------------------------ 2. Tutup mata: enam anak, dua pulang ------------------------------ */
const SUARA_T1 = "Di lapangan sekolah, enam anak bermain tutup mata. Mereka adalah Kira, Upe, Wei, Halim, Malosi, dan Tika. Semua bermain dengan gembira.";
const SUARA_T2 = "Ayo kita hitung anak yang bermain. Satu, dua, tiga, empat, lima, enam. Mula-mula ada enam anak.";
const SUARA_T3 = "Banyak anak di awal kita sebut mula-mula. Mula-mula ada enam anak. Ingat dulu bilangan enam itu.";
const SUARA_T4 = "Tiba-tiba Malosi dan Tika harus pulang. Ketuk Malosi dan Tika di layar.";
const SUARA_T5 = "Malosi dan Tika berjalan pulang ke rumah. Jadi anak yang bermain berkurang dua.";
const SUARA_T6 = "Sekarang kita hitung anak yang masih tinggal. Satu, dua, tiga, empat. Yang tinggal disebut sisa, jadi sisanya empat anak.";
const SUARA_T7 = "Cerita ini punya tiga bagian. Mula-mula enam anak. Berkurang dua anak. Sisa empat anak. Hafalkan tiga bagian ini, ya.";
const NAMA_TM = ["Kira", "Upe", "Wei", "Halim", "Malosi", "Tika"];
const P6 = baris(6, 100, 44);
const anakTm = (i: number) => emo(`an${i}`, P6[i].x, P6[i].y, ANAK_EMO, 26);
const namaTm = (i: number) => teks(`nm${i}`, P6[i].x, 124, NAMA_TM[i], 8.6, W.ungu);

export const ADEGAN_TUTUP: AdeganStory = {
  id: "tutup-mata",
  judul: "Tutup mata: enam anak, dua anak pulang",
  sumber: "Materi: cerita tutup mata",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tutup mata"), garis("tanah", 14, 142, 272, 0, W.hijau, 3)),
      tambah("enam", ...P6.map((_, i) => anakTm(i))),
      ...NAMA_TM.map((nama, i) => tambah(i === 5 ? "Tika." : `${nama},`, namaTm(i))),
    ),
    k(SUARA_T2, ...hitungAksi(SUARA_T2, "an", P6, "bermain.")),
    k(SUARA_T3, hapus(0, "tg"), tambah("mula-mula.", ...kartu("mu", 60, 28, 180, 24, W.hijauMuda, ["Mula-mula: 6 anak"], 11))),
    k(SUARA_T4, hapus(0, "ann0", "ann1", "ann2", "ann3", "ann4", "ann5"), tambah(idx(SUARA_T4, "Ketuk"), emo("tg", P6[4].x, 133, "\u{1F446}", 22)), ubah(idx(SUARA_T4, "Tika", 2), { id: "tg", x: P6[5].x })),
    k(
      SUARA_T5,
      hapus(0, "tg", "nm4", "nm5"),
      tambah(0, kotak("rumah", 176, 152, 112, 44, W.krem, W.coklat, { rx: 8, tebal: 2, z: -1 }), teks("rm-t", 232, 146, "rumah", 8.6, W.coklat)),
      ubah("berjalan", { id: "an4", x: 206, y: 174 }, { id: "an5", x: 258, y: 174 }),
      tambah("berkurang", ...kartu("br", 60, 54, 180, 24, W.merahMuda, ["Berkurang: 2 anak"], 11)),
    ),
    k(
      SUARA_T6,
      ...hitungAksi(SUARA_T6, "an", P6.slice(0, 4), "tinggal."),
      tambah("sisanya", ...kartu("sa", 14, 156, 150, 28, W.langit, ["Sisa: 4 anak"], 11)),
    ),
    k(
      SUARA_T7,
      bersih(0),
      tambah(0, judul("Tiga bagian cerita"), emo("ow", 262, 190, OWL, 26)),
      tambah("mula-mula", ...kartu("b1", 20, 34, 260, 34, W.hijauMuda, ["Mula-mula: 6 anak"], 11)),
      tambah("Berkurang", ...kartu("b2", 20, 78, 260, 34, W.merahMuda, ["Berkurang: 2 anak"], 11)),
      tambah("Sisa", ...kartu("b3", 20, 122, 260, 34, W.langit, ["Sisa: 4 anak"], 11)),
    ),
  ],
};

/* ------------------------------ 3. Papan tulis Igil: 6 − 2 = 4 ------------------------------ */
const SUARA_P1 = "Igil menuliskan cerita tutup mata itu pada papan tulis. Mula-mula enam anak. Berkurang dua anak. Sisanya empat anak.";
const SUARA_P2 = "Sekarang kita susun dengan angka. Enam, tanda kurang, dua, tanda sama dengan, empat.";
const SUARA_P3 = "Tanda kurang artinya ada yang pergi. Tanda sama dengan menunjukkan sisanya.";
const SUARA_P4 = "Kita membaca dari kiri ke kanan. Enam dikurangi dua sama dengan empat. Ucapkan lagi mengikuti suara guru.";
const SUARA_P5 = "Empat adalah sisanya. Sisa adalah banyak benda yang masih tinggal setelah ada yang pergi. Sisa selalu muncul sesudah tanda sama dengan.";
const SUARA_P6 = "Jadi kalimat kurang menceritakan benda yang pergi. Mudah sekali, bukan? Kamu pasti bisa menyusunnya sendiri nanti.";
const bagianKalimat = (id: string, x: number, isi: string) => teks(id, x, 112, isi, 36, W.putih);

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan-kurang",
  judul: "Igil menuliskan kalimat kurang di papan",
  sumber: "Materi: tanda kurang dan sama dengan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Papan tulis Igil"), papan("pp", 14, 30, 272, 134), emo("ig", 262, 198, OWL, 28)),
      tambah("Mula-mula", teks("p1", 150, 66, "Mula-mula: 6 anak", 11, W.putih)),
      tambah("Berkurang", teks("p2", 150, 98, "Berkurang: 2 anak", 11, W.putih)),
      tambah("Sisanya", teks("p3", 150, 130, "Sisa: 4 anak", 11, W.putih)),
    ),
    k(
      SUARA_P2,
      hapus(0, "p1", "p2", "p3"),
      tambah(idx(SUARA_P2, "Enam"), bagianKalimat("a6", 60, "6")),
      tambah(idx(SUARA_P2, "kurang"), bagianKalimat("mn", 105, "−")),
      tambah(idx(SUARA_P2, "dua"), bagianKalimat("a2", 150, "2")),
      tambah(idx(SUARA_P2, "dengan"), bagianKalimat("eq", 195, "=")),
      tambah(idx(SUARA_P2, "empat"), bagianKalimat("a4", 240, "4")),
    ),
    k(
      SUARA_P3,
      sorotkan("kurang", "mn"),
      tambah("kurang", teks("c1", 105, 150, "pergi", 9, W.emas)),
      redamkan("sama", "mn"),
      sorotkan("sama", "eq"),
      tambah("sama", teks("c2", 195, 150, "sisanya", 9, W.emas)),
    ),
    k(
      SUARA_P4,
      redamkan(0, "eq"),
      sorotkan(idx(SUARA_P4, "Enam"), "a6"),
      redamkan("dikurangi", "a6"),
      sorotkan("dikurangi", "mn"),
      redamkan("dua", "mn"),
      sorotkan("dua", "a2"),
      redamkan("sama", "a2"),
      sorotkan("sama", "eq"),
      redamkan(idx(SUARA_P4, "empat"), "eq"),
      sorotkan(idx(SUARA_P4, "empat"), "a4"),
    ),
    k(
      SUARA_P5,
      redamkan(0, "a4"),
      sorotkan("Empat", "a4"),
      tambah("Sisa", ...kartu("jm", 20, 168, 216, 26, W.emas, ["sisa = yang masih tinggal"], 9.4)),
    ),
    k(SUARA_P6, hapus(0, "c1", "c2"), tambah("menceritakan", teks("c3", 150, 150, "cerita jadi angka", 10, W.emas)), tambah("Mudah", emo("ok", 40, 198, "✅", 26))),
  ],
};
