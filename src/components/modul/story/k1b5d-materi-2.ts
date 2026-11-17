import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WI, akuariumAngka, emo, garisBil, geserKartu, judul, kartu, kartuBil, kotak, orang, penanda, teks } from "./k1b5d-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5d-bantu";

/* Lanjutan "Lapak Ikan Dibuka": puluhan dibandingkan dulu, mencari paling banyak dan paling sedikit, lalu mengurutkan dan garis bilangan. */

/* ------------------------------ 4. Puluhan dulu ------------------------------ */
const SUARA_T1 = "Abang membandingkan sembilan ikan dan tiga belas ikan. Igil berseru, sembilan lebih banyak, karena sembilan lebih besar dari tiga!";
const SUARA_T2 = "Tunggu, kata Kaka. Lihat puluhannya dulu. Tiga belas punya satu puluhan, sembilan belum punya.";
const SUARA_T3 = "Jadi tiga belas lebih banyak. Kalau puluhannya sama, baru bandingkan satuannya. Lima belas dan enam belas, enam belas lebih banyak.";
const [T1_9, T1_13, , , T1_3] = urutBilangan(SUARA_T1, [9, 13, 9, 9, 3]);

/** Satu ubin angka 40 x 30 di pojok kiri-atas (x, y). */
const ubin = (id: string, x: number, y: number, isi: string, warna: string): Obj[] => [
  kotak(`${id}-k`, x, y, 40, 30, warna, W.biru, { rx: 6, tebal: 1.6 }),
  teks(`${id}-t`, x + 20, y + 22, isi, 18, W.merah),
];
/** Satu baris tabel: nama `${id}-l` dan dua ubin puluhan `${id}p`, satuan `${id}s`. */
const barisTabel = (id: string, y: number, label: string, p: string, s: string): Obj[] => [
  teks(`${id}-l`, 62, y + 20, label, 9.4, W.biru),
  ...ubin(`${id}p`, 122, y, p, W.hijauMuda),
  ...ubin(`${id}s`, 170, y, s, W.krem),
];
const idBaris = (id: string): string[] => [`${id}-l`, `${id}p-k`, `${id}p-t`, `${id}s-k`, `${id}s-t`];

export const ADEGAN_PULUHAN_DULU: AdeganStory = {
  id: "puluhan-dulu",
  judul: "Puluhan dibandingkan dulu",
  sumber: "Materi: puluhan dulu, baru satuan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Puluhan dulu")),
      tambah("membandingkan", teks("hp", 142, 45, "puluhan", 9, W.hijau), teks("hs", 190, 45, "satuan", 9, W.ungu)),
      tambah(T1_9, ...barisTabel("r1", 52, "9 ikan", "0", "9")),
      tambah(T1_13, ...barisTabel("r2", 90, "13 ikan", "1", "3")),
      tambah("Igil", ...orang("ig", 30, 172, E.igil, "Igil")),
      tambah("berseru,", ...kartu("bg", 62, 150, 190, 22, W.krem, ["9 lebih besar dari 3!"], 9.4)),
      tambah(T1_3, emo("x1", 270, 166, E.salah, 20)),
    ),
    k(
      SUARA_T2,
      hapus(0, "bg-k", "bg-t0", "x1", "ig", "ig-n"),
      tambah("Kaka.", ...orang("kk", 272, 172, E.kaka, "Kaka")),
      sorotkan("puluhannya", "r1p-k", "r2p-k"),
      tambah("satu", teks("a2", 252, 109, "1 puluhan", 8.6, W.hijau)),
      tambah("belum", teks("a1", 252, 71, "0 puluhan", 8.6, W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("banyak.", emo("mk", 30, 112, E.mahkota, 18)),
      hapus("Kalau", ...idBaris("r1"), ...idBaris("r2"), "a1", "a2", "mk"),
      tambah("Kalau", ...barisTabel("r3", 52, "15 ikan", "1", "5"), ...barisTabel("r4", 90, "16 ikan", "1", "6")),
      sorotkan("sama,", "r3p-k", "r4p-k"),
      tambah("bandingkan", ...kartu("sk", 60, 134, 180, 22, W.krem, ["puluhan sama: lihat satuan"], 9.4)),
      sorotkan("satuannya.", "r3s-k", "r4s-k"),
      tambah("banyak@2", emo("mk2", 30, 112, E.mahkota, 18)),
    ),
  ],
};

/* ------------------------------ 5. Paling banyak dan paling sedikit ------------------------------ */
const SUARA_G1 = "Ada tiga akuarium: delapan belas, sembilan, dan tiga belas. Mana yang paling banyak, mana yang paling sedikit?";
const SUARA_G2 = "Delapan belas punya satu puluhan dan delapan satuan, jadi paling banyak. Sembilan belum punya puluhan, jadi paling sedikit.";
const SUARA_G3 = "Tiga belas ada di tengah. Kaka mencatat hasilnya di papan.";
const [, G1_18, G1_9, G1_13] = urutBilangan(SUARA_G1, [3, 18, 9, 13]);

export const ADEGAN_PALING: AdeganStory = {
  id: "paling",
  judul: "Mencari paling banyak dan paling sedikit",
  sumber: "Materi: paling banyak, paling sedikit",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("3 akuarium", W.ungu)),
      tambah(G1_18, ...akuariumAngka("a0", 10, 34, 88, 52, 18, WI.guppy)),
      tambah(G1_9, ...akuariumAngka("a1", 106, 34, 88, 52, 9, WI.koki)),
      tambah(G1_13, ...akuariumAngka("a2", 202, 34, 88, 52, 13, WI.neon)),
      tambah("banyak,", teks("t1", 150, 146, "paling banyak?", 10, W.hijau)),
      tambah("sedikit?", teks("t2", 150, 164, "paling sedikit?", 10, W.ungu)),
    ),
    k(
      SUARA_G2,
      hapus(0, "t1", "t2"),
      tambah("Delapan", emo("mk", 54, 31, E.mahkota, 16)),
      sorotkan("Delapan", "a0"),
      tambah("satu", teks("b0", 54, 126, "1 puluhan, 8 satuan", 8, W.biru)),
      tambah("banyak,", teks("pb", 54, 142, "paling banyak", 9, W.hijau)),
      tambah("belum", teks("b1", 150, 126, "belum ada puluhan", 8, W.biru)),
      tambah("sedikit.", teks("ps", 150, 142, "paling sedikit", 9, W.ungu), emo("tn", 150, 32, "\u{1F53B}", 14)),
    ),
    k(
      SUARA_G3,
      hapus(0, "b0", "b1", "pb", "ps"),
      sorotkan("tengah.", "a2"),
      tambah("Kaka", ...orang("kk", 266, 174, E.kaka, "Kaka")),
      tambah("mencatat", emo("ct", 236, 174, E.catat, 16)),
      tambah("papan.", ...kartu("pp", 24, 124, 196, 66, W.krem, ["paling banyak: 18", "tengah: 13", "paling sedikit: 9"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Mengurutkan dan garis bilangan ------------------------------ */
const SUARA_U1 = "Pak RT minta akuarium diurutkan dari yang paling sedikit: sembilan, tiga belas, delapan belas.";
const SUARA_U2 = "Itu urutan dari terkecil. Kalau dari yang terbanyak, kebalikannya: delapan belas, tiga belas, sembilan.";
const SUARA_U3 = "Di garis bilangan, bilangan yang lebih kecil ada di kiri, yang lebih besar di kanan.";
const [U1_9, U1_13, U1_18] = urutBilangan(SUARA_U1, [9, 13, 18]);
const [U2_18, U2_13, U2_9] = urutBilangan(SUARA_U2, [18, 13, 9], "kebalikannya");
const SLOT = [40, 122, 204];
const panahUrut = (x: number, x2: number): Obj => ({ id: "pa", t: "panah", x, y: 146, x2, y2: 0, warna: W.hijau, tebal: 2.4 });

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Mengurutkan akuarium",
  sumber: "Materi: urutan dan garis bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Urutan akuarium")),
      tambah("Pak", ...orang("pr", 28, 172, E.pakRT, "Pak RT")),
      tambah("paling", teks("cp", 150, 56, "dari paling sedikit", 10, W.ungu)),
      tambah(U1_9, ...kartuBil("c9", SLOT[0], 70, "9", W.langit)),
      tambah(U1_13, ...kartuBil("c13", SLOT[1], 70, "13", W.krem)),
      tambah(U1_18, ...kartuBil("c18", SLOT[2], 70, "18", W.hijauMuda)),
      tambah("sedikit:", panahUrut(50, 190), teks("ar", 150, 168, "makin banyak", 9.4, W.hijau)),
    ),
    k(
      SUARA_U2,
      ubah("terkecil.", { id: "cp", isi: "dari terkecil" }),
      ubah("terbanyak,", { id: "cp", isi: "dari terbanyak", warna: W.hijau }),
      ubah("kebalikannya:", { id: "pa", x: 250, x2: -190, warna: W.ungu }, { id: "ar", isi: "makin sedikit", warna: W.ungu }),
      ubah(U2_18, ...geserKartu("c18", SLOT[0]), ...geserKartu("c9", SLOT[2])),
      sorotkan(U2_13, "c13-k"),
      sorotkan(U2_9, "c9-k", "c18-k"),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Di garis bilangan"), ...garisBil("gb", 118)),
      tambah("garis", ...penanda("m9", 9, W.langit), ...penanda("m13", 13, W.krem), ...penanda("m18", 18, W.hijauMuda)),
      tambah("kiri,", teks("kc", 64, 166, "lebih kecil: kiri", 9.4, W.ungu), { id: "pk", t: "panah", x: 120, y: 150, x2: -90, y2: 0, warna: W.ungu, tebal: 2.4 }),
      tambah("kanan.", teks("bs", 236, 166, "lebih besar: kanan", 9.4, W.hijau), { id: "pb", t: "panah", x: 180, y: 150, x2: 90, y2: 0, warna: W.hijau, tebal: 2.4 }),
    ),
  ],
};
