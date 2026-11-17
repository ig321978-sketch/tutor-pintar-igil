import type { AdeganStory, Obj } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, garis, judul, kalimatK, kartu, orang, teks } from "./k1b3a-gambar";
import { bersih, hitungMainan, k, sorotkan, tambah, ubah } from "./k1b3a-bantu";

/* Video metode global Sub-Bab A "Bekal untuk Nenek": pembuka dan Take Away (Mengambil). */

export const NAMA_METODE = ["Take Away", "Counting Back", "Ten Frame"];
export const NAMA_METODE_ID = ["Mengambil", "Menghitung Mundur", "Bingkai Sepuluh"];
export const WARNA_METODE = [W.merahMuda, W.langit, W.lavender];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);
/** Coretan miring di atas benda (tanda benda diambil), id `${id}`. */
export const coret = (id: string, x: number, y: number, u = 20): Obj => garis(id, x - u * 0.5, y - u * 0.4, u, u * 0.8, W.merah, 2.6);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di kursi sebelah, ada penumpang yang baru pulang dari luar negeri. Ia bercerita, anak-anak di sana punya cara lain untuk mengurangi. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Take Away, Counting Back, dan Ten Frame.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Mengambil, Menghitung Mundur, dan Bingkai Sepuluh.";
const SUARA_O4 = "Semua metode menjawab pertanyaan Mamah: kalau bekal berkurang, berapa yang tersisa?";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk pengurangan",
  sumber: "Metode global: pembuka",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), emo("ku", 150, 96, E.kue, 40)),
      tambah("penumpang", ...orang("pn", 40, 120, E.penumpang, "penumpang")),
      tambah("negeri.", emo("gl", 250, 110, "\u{1F30D}", 44)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Take", "Counting", "Frame."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Mengambil,", "Menghitung", "Bingkai"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan"), ...orang("mm", 150, 80, E.mamah, "Mamah")),
      tambah("berkurang,", ...deretEmo(E.kue, "bk", deret(4, 90, 40, 140), 22), coret("cr", 210, 140, 22)),
      tambah("tersisa?", teks("tq", 150, 186, "berapa yang tersisa?", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Take Away: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Take Away, atau Mengambil. Mula-mula kita siapkan semua benda.";
const SUARA_A2 = "Lalu kita ambil benda sebanyak yang pergi. Benda yang diambil dipisahkan atau dicoret.";
const SUARA_A3 = "Benda yang masih tinggal kita hitung. Itulah sisanya.";
const SUARA_A4 = "Jadi, semua benda dikurangi benda yang diambil sama dengan sisa.";
const BULAT = deret(6, 60, 36, 104);

export const ADEGAN_LUAR_AMBIL: AdeganStory = {
  id: "luar-ambil",
  judul: "Take Away: mengambil",
  sumber: "Metode global: Take Away",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("semua", ...BULAT.map((p, i) => emo(`bl${i}`, p.x, p.y, "\u{1F534}", 22))), tambah("benda.", teks("sm", 150, 140, "semua benda", 10, W.biru))),
    k(SUARA_A2, tambah("ambil", ...[4, 5].map((i) => coret(`cr${i}`, BULAT[i].x, BULAT[i].y, 22))), ubah("dipisahkan", { id: "bl4", op: 0.3 }, { id: "bl5", op: 0.3 }), tambah("dicoret.", teks("dc", 222, 140, "diambil", 10, W.merah)), ubah("dicoret.", { id: "sm", x: 96 })),
    k(SUARA_A3, sorotkan("tinggal", "bl0", "bl1", "bl2", "bl3"), tambah("sisanya.", teks("ss", 114, 76, "sisa", 11, W.hijau))),
    k(SUARA_A4, tambah("dikurangi", ...kartu("rm", 20, 162, 260, 28, W.emas, [`semua ${KURANG} diambil = sisa`], 11))),
  ],
};

/* ------------------------------ 3. Take Away: terapan ------------------------------ */
const SUARA_B1 = "Di meja kereta ada sembilan roti. Mamah membagikan empat roti kepada penumpang di sebelah.";
const SUARA_B2 = "Empat roti diambil dari meja. Kita coret empat roti itu.";
const SUARA_B3 = "Roti yang tinggal kita hitung. Satu, dua, tiga, empat, lima.";
const SUARA_B4 = "Sisanya lima roti. Sembilan dikurangi empat sama dengan lima.";
const ROTI = deret(9, 30, 30, 112);

export const ADEGAN_LUAR_AMBIL_TERAPAN: AdeganStory = {
  id: "luar-ambil-terapan",
  judul: "Take Away: roti di meja kereta",
  sumber: "Metode global: Take Away, terapan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("meja", garis("mj", 14, 128, 272, 0, W.coklat, 5)),
      tambah("sembilan", ...deretEmo(E.roti, "rt", ROTI, 22)),
      tambah("Mamah", ...orang("mm", 60, 168, E.mamah, "Mamah")),
      tambah("penumpang", ...orang("pn", 240, 168, E.penumpang, "penumpang")),
    ),
    k(SUARA_B2, ...[5, 6, 7, 8].map((i, n) => tambah(n < 2 ? "diambil" : "coret", coret(`cr${i}`, ROTI[i].x, ROTI[i].y, 22))), ubah("itu.", ...[5, 6, 7, 8].map((i) => ({ id: `rt${i}`, op: 0.3 })))),
    k(SUARA_B3, ...hitungMainan(SUARA_B3, "rt", ROTI.slice(0, 5), 22, "hitung.")),
    k(SUARA_B4, tambah("Sisanya", ...kartu("ss", 100, 60, 100, 22, W.emas, ["sisa 5 roti"], 10)), tambah("Sembilan", ...kalimatK("kl", 150, 196, ["9", KURANG, "4", "=", "5"], 16, 26))),
  ],
};
