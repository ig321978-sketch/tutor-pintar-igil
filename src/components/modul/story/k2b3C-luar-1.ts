import type { AdeganStory, Obj } from "./logika-story";
import { W, cap, cocok, emo, judul, kartu, panah, ruang, teks, type Jenis, OWL } from "./k2b3C-gambar";
import { bersih, idx, k, pilihKata, sorotkan, tambah } from "./k2b3C-bantu";

export const NAMA_METODE_ID = ["Cetak Permukaan", "Tas Misteri", "Ciri Bangun Ruang"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara memakai cara lain untuk belajar bangun ruang. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Cara pertama bernama Cetak Permukaan. Cara kedua bernama Tas Misteri. Cara ketiga bernama Ciri Bangun Ruang.";
const SUARA_O3 = "Semua cara ini membantu kita mengenali bentuk permukaan dan ciri-ciri bangun ruang.";
const SUARA_O4 = "Kita memakai bentuk di layar. Kamu cukup mengamati dengan teliti, lalu memilih jawabannya.";
const SUARA_O5 = "Siap? Ayo kita mulai dengan cara pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk bangun ruang",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["tiga cara lain"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "pertama"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "kedua"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "ketiga"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu tujuan")),
      tambah("permukaan", ...ruang("kubus", "kba", 70, 84, 28), ...ruang("tabung", "tba", 150, 84, 28), ...ruang("bola", "boa", 230, 84, 28)),
      tambah("ciri-ciri", ...kartu("tj", 30, 140, 240, 40, W.emas, ["mengenali bangun ruang"], 12)),
    ),
    k(SUARA_O4, bersih(0), tambah(0, judul("Lihat dan pilih")), tambah("bentuk", emo("la", 150, 100, "\u{1F4F1}", 50)), tambah("memilih", ...kartu("pl", 40, 130, 220, 34, W.hijauMuda, ["amati, lalu pilih jawabannya"], 10))),
    k(SUARA_O5, bersih(0), tambah(0, judul("Ayo mulai!")), tambah("Ayo", ...kartu("sb", 40, 60, 220, 40, W.krem, ["cara pertama"], 12)), tambah("Siap?", emo("ow", 150, 150, OWL, 40))),
  ],
};

/* ------------------------------ 2. Cetak Permukaan: konsep ------------------------------ */
/** Lima baris: bangun ruang di kiri, panah penekan, cap di tengah, nama cap di kanan. Pusat baris ke-i. */
export const yBarisCetak = (i: number): number => 74 + i * 28;
export const URUT_CETAK: { jenis: Jenis; kunci: string; nama: string }[] = [
  { jenis: "kubus", kunci: "kba", nama: "segi empat sama" },
  { jenis: "balok", kunci: "bla", nama: "segi empat panjang" },
  { jenis: "tabung", kunci: "tba", nama: "lingkaran" },
  { jenis: "kerucut", kunci: "kra", nama: "lingkaran" },
  { jenis: "bola", kunci: "boa", nama: "tidak ada cap" },
];
const UK_CETAK = 17;
const barisSolid = (i: number): Obj[] => ruang(URUT_CETAK[i].jenis, URUT_CETAK[i].kunci, 44, yBarisCetak(i), UK_CETAK);
const barisCap = (i: number): Obj[] => {
  const b = URUT_CETAK[i];
  const y = yBarisCetak(i);
  const out: Obj[] = [panah(`pn${i}`, 82, y, 44, 0, W.merah, 2)];
  if (b.jenis !== "bola") out.push(...cap(b.jenis, "a", 168, y, UK_CETAK));
  out.push(teks(`cn${i}`, 248, y + 3, b.nama, 8.6, W.merah));
  return out;
};
const SUARA_P1 = "Cara pertama bernama Cetak Permukaan. Bangun ruang di layar ditekan, seperti membuat cap.";
const SUARA_P2 = "Dadu kubus ditekan. Cap yang muncul berbentuk segi empat yang sisinya sama panjang.";
const SUARA_P3 = "Kardus balok ditekan. Cap yang muncul juga segi empat, tetapi sisinya tidak sama panjang.";
const SUARA_P4 = "Kaleng tabung dan topi kerucut ditekan. Keduanya meninggalkan cap berbentuk lingkaran.";
const SUARA_P5 = "Bola ditekan, tetapi tidak ada cap yang rapi, karena bola tidak punya permukaan datar.";

export const ADEGAN_LUAR_CETAK: AdeganStory = {
  id: "luar-cetak",
  judul: "Cetak Permukaan: bangun ruang jadi bangun datar",
  sumber: "Metode luar: Cetak Permukaan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(0)), tambah(idx(SUARA_P1, "layar"), ...barisSolid(0)), tambah(idx(SUARA_P1, "ditekan"), teks("ht", 150, 62, "tekan, lalu lihat cap", 9, W.biru))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "ditekan"), ...barisCap(0).slice(0, 1)), tambah(idx(SUARA_P2, "berbentuk"), ...barisCap(0).slice(1))),
    k(SUARA_P3, tambah(idx(SUARA_P3, "balok"), ...barisSolid(1)), tambah(idx(SUARA_P3, "ditekan"), ...barisCap(1).slice(0, 1)), tambah(idx(SUARA_P3, "juga"), ...barisCap(1).slice(1))),
    k(
      SUARA_P4,
      tambah(idx(SUARA_P4, "tabung"), ...barisSolid(2)),
      tambah(idx(SUARA_P4, "kerucut"), ...barisSolid(3)),
      tambah(idx(SUARA_P4, "ditekan"), ...barisCap(2).slice(0, 1), ...barisCap(3).slice(0, 1)),
      tambah(idx(SUARA_P4, "lingkaran"), ...barisCap(2).slice(1), ...barisCap(3).slice(1)),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "Bola"), ...barisSolid(4)), tambah(idx(SUARA_P5, "ditekan"), ...barisCap(4).slice(0, 1)), tambah(idx(SUARA_P5, "tidak", 1), ...barisCap(4).slice(1))),
  ],
};

/* ------------------------------ 3. Cetak Permukaan: terapan ------------------------------ */
const SUARA_Q1 = "Sekarang kita coba. Ada kaleng di layar. Kita tekan permukaannya yang rata.";
const SUARA_Q2 = "Kaleng ditekan, dan sebuah cap muncul di sebelahnya.";
const SUARA_Q3 = "Cap itu bangun datar apa? Pilih jawabannya.";
const SUARA_Q4 = "Cap kaleng berbentuk lingkaran. Jawabannya lingkaran.";
const SUARA_Q5 = "Cetak Permukaan membantu kita mengenali bentuk datar pada permukaan bangun ruang.";

export const ADEGAN_LUAR_CETAK_TERAPAN: AdeganStory = {
  id: "luar-cetak-terapan",
  judul: "Cetak Permukaan: cap kaleng",
  sumber: "Metode luar: Cetak Permukaan, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(0)), tambah(idx(SUARA_Q1, "kaleng"), ...ruang("tabung", "tba", 70, 92, 40), teks("kl", 70, 138, "kaleng", 9)), tambah(idx(SUARA_Q1, "tekan"), emo("tp", 70, 52, "\u{1F446}", 18))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "ditekan"), panah("pq", 112, 92, 50, 0, W.merah, 2.4)), tambah(idx(SUARA_Q2, "cap"), ...cap("tabung", "q", 220, 92, 40), teks("cq", 220, 138, "cap", 9))),
    k(SUARA_Q3, bersih(0), tambah(0, ...kepala(0), ...ruang("tabung", "tba", 70, 76, 34), ...cap("tabung", "q", 220, 76, 34)), tambah(idx(SUARA_Q3, "Pilih"), ...pilihKata(130, ["segi empat sama", "segi empat panjang", "lingkaran"], 7.4))),
    k(SUARA_Q4, sorotkan(idx(SUARA_Q4, "lingkaran"), "c3-k", "c3-t"), tambah(idx(SUARA_Q4, "Jawabannya"), cocok("ok", 242, 176, 22))),
    k(SUARA_Q5, tambah(idx(SUARA_Q5, "mengenali"), ...kartu("rm", 20, 172, 200, 24, W.krem, ["cap = bentuk datar"], 9.6)), tambah(idx(SUARA_Q5, "Cetak"), emo("ow", 262, 196, OWL, 20))),
  ],
};

