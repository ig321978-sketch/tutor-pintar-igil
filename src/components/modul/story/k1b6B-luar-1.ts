import type { AdeganStory, Obj } from "./logika-story";
import { W, benda, emo, garisBilangan, judul, kartu, kartuAngka, lompat, teks, xBil } from "./k1b6B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b6B-bantu";

export const NAMA_METODE_ID = ["Maju dan Mundur", "Pasangan sampai 20", "Menjadikan Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Tiga kartu pilihan bilangan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
export const pilihanBil = (y: number, isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 80, 34, 18));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara menjumlahkan yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Maju dan Mundur, Pasangan sampai dua puluh, dan Menjadikan Sepuluh.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana menjumlahkan dua bilangan dengan cepat dan benar?";
const SUARA_O4 = "Kita akan melihat tiap metode dengan benda sehari-hari, seperti donat, kelereng, dan balon.";
const SUARA_O5 = "Semua hasilnya paling besar dua puluh. Kamu cukup mengetuk dan melihat layar dengan teliti.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menjumlahkan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Maju", "Pasangan", "Menjadikan"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F449}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana menjumlahkan", "dua bilangan", "dengan cepat dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda sehari-hari")),
      tambah("donat,", ...benda("donat", "ob0", 60, 90, 14, 0)),
      tambah("kelereng,", ...benda("kelereng", "ob1", 150, 90, 14, 1)),
      tambah("balon.", ...benda("balon", "ob2", 240, 86, 14, 0)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Hasil paling besar 20")),
      ...[6, 9, 12, 15].map((n, i) => tambah(0, ...kartuAngka(`on${i}`, 20 + i * 66, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink][i], 56, 36, 18))),
      tambah("dua", ...kartuAngka("on4", 124, 100, "20", W.emas, 52, 36, 20)),
      tambah("mengetuk", emo("tg", 150, 168, "\u{1F446}", 22)),
    ),
  ],
};

/* ------------------------------ 2. Maju dan Mundur: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Maju dan Mundur. Untuk menjumlahkan, kita maju. Mulai dari bilangan pertama, lalu maju sebanyak bilangan kedua.";
const SUARA_A2 = "Contoh sepuluh ditambah lima. Mulai dari sepuluh di garis bilangan.";
const SUARA_A3 = "Maju lima langkah. Sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_A4 = "Katak mendarat di lima belas. Jadi sepuluh ditambah lima sama dengan lima belas.";
const SUARA_A5 = "Maju dipakai untuk menjumlahkan. Mundur dipakai untuk soal yang lain. Ucapkan lagi mengikuti suara guru.";
const AX = (n: number): number => xBil(n, 10, 15);
const posA3 = urutBilangan(SUARA_A3, 11, 15, "langkah.");

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Maju dan Mundur: maju untuk menjumlahkan",
  sumber: "Metode luar: Maju dan Mundur",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah("menjumlahkan,", ...kartu("mj", 50, 90, 200, 28, W.krem, ["jumlah: maju ke kanan"], 10)), tambah("sebanyak", emo("pj", 150, 160, "\u{1F449}", 30))),
    k(
      SUARA_A2,
      hapus(0, "mj-k", "mj-t0", "pj"),
      tambah("garis", ...garisBilangan(120, 10, 15)),
      tambah("Mulai", emo("kt", AX(10), 90, "\u{1F438}", 22)),
      sorotkan("sepuluh@2", "gb-n10"),
    ),
    k(SUARA_A3, ...posA3.flatMap((p, i) => [tambah(p, lompat(`lp${11 + i}`, 10 + i, 11 + i, 120, 10, 15)), ubah(p, { id: "kt", x: AX(11 + i) })])),
    k(SUARA_A4, sorotkan("mendarat", "gb-n15"), tambah("Jadi", ...kartu("mk", 60, 156, 180, 24, W.emas, ["10 + 5 = 15"], 11))),
    k(SUARA_A5, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 26)), tambah("Mundur", teks("mu", 150, 196, "maju untuk menjumlahkan", 9.4, W.ungu))),
  ],
};

/* ------------------------------ 3. Maju dan Mundur: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada dua belas ditambah lima. Mulai dari dua belas, lalu maju lima kali.";
const SUARA_B2 = "Tiga belas, empat belas, lima belas, enam belas, tujuh belas.";
const SUARA_B3 = "Katak mendarat di tujuh belas. Coba pilih jawabannya. Ada enam belas, tujuh belas, atau delapan belas?";
const SUARA_B4 = "Betul! Dua belas ditambah lima sama dengan tujuh belas. Hebat sekali!";
const BX = (n: number): number => xBil(n, 12, 17);
const posB2 = urutBilangan(SUARA_B2, 13, 17);

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Maju dan Mundur: dua belas ditambah lima",
  sumber: "Metode luar: Maju dan Mundur, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("Terapkan", ...kepala(0)), tambah("Mulai", ...garisBilangan(100, 12, 17)), tambah("dua@2", emo("kt", BX(12), 70, "\u{1F438}", 22))),
    k(SUARA_B2, ...posB2.flatMap((p, i) => [tambah(p, lompat(`lp${13 + i}`, 12 + i, 13 + i, 100, 12, 17)), ubah(p, { id: "kt", x: BX(13 + i) })])),
    k(SUARA_B3, sorotkan("mendarat", "gb-n17"), tambah("Coba", ...pilihanBil(140, ["16", "17", "18"])), tambah("Ada", emo("tj", 150, 198, "\u{1F446}", 20))),
    k(SUARA_B4, hapus(0, "tj"), sorotkan("Betul!", "c2-k"), tambah("Dua", ...kartu("bj", 60, 180, 180, 20, W.emas, ["12 + 5 = 17"], 10)), tambah("Hebat", emo("ok", 40, 62, "✅", 26))),
  ],
};
