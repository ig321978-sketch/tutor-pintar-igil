import type { AdeganStory, Obj } from "./logika-story";
import { EMO_HIJAU, EMO_KUNING, EMO_MERAH, W, bendaDi, emo, jumlahG, jumlahTurus, judul, kartu, kotak, namaG, teks, titikBaris } from "./k1b8A-gambar";
import { barisKelompok, gilir, goresAksi, hapus, ids, idx, k, redamkan, sorotUrut, sorotkan, tambah } from "./k1b8A-bantu";
import { TOKO } from "./k1b8A-materi-1";

/* ------------------------------ 4. Daftar mainan ------------------------------ */
const DAFTAR_Y = [34, 68, 102, 136];
/** Satu baris daftar: kartu, gambar kecil, dan nama (`e{huruf}-nm`). Angka (`e{huruf}-ln`) menyusul. */
const barisDaftar = (r: number): Obj[] => {
  const g = TOKO[r];
  const y = DAFTAR_Y[r];
  return [kotak(`dr${r}-k`, 24, y, 252, 28, W.putih, W.biru, { rx: 6 }), emo(`ic${r}`, 44, y + 21, g.e, 16), teks(`e${g.key}-nm`, 66, y + 19, g.nama, 10.5, W.biru, { anchor: "start" })];
};
const angkaDaftar = (r: number): Obj => teks(`e${TOKO[r].key}-ln`, 250, DAFTAR_Y[r] + 20, String(TOKO[r].n), 13, W.merah);
const sorotDaftar = (r: number): string[] => [`dr${r}-k`, `e${TOKO[r].key}-nm`, `e${TOKO[r].key}-ln`];

const SUARA_D1 = "Hasil menghitung tadi kita tulis dalam daftar. Daftar membuat data rapi dan mudah dibaca.";
const SUARA_D2 = "Kereta ada enam. Mobil ada empat. Boneka ada lima. Bola ada tiga.";
const SUARA_D3 = "Kereta, mobil, boneka, dan bola adalah contoh data. Data adalah keterangan yang kita dapat dari menghitung.";
const SUARA_D4 = "Sekarang kita baca daftarnya. Mainan apa yang paling banyak? Kereta paling banyak, yaitu enam.";
const SUARA_D5 = "Mainan apa yang paling sedikit? Bola paling sedikit, yaitu tiga.";
const SUARA_D6 = "Boneka lebih banyak dari mobil. Boneka ada lima, mobil ada empat.";
const SUARA_D7 = "Sekarang jumlah semuanya. Enam, lima, empat, dan tiga. Jumlah semuanya delapan belas mainan.";

export const ADEGAN_DAFTAR: AdeganStory = {
  id: "daftar-mainan",
  judul: "Daftar mainan di toko",
  sumber: "Materi: daftar dan data",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Daftar mainan toko")), tambah(idx(SUARA_D1, "daftar"), ...[0, 1, 2, 3].flatMap(barisDaftar))),
    k(SUARA_D2, tambah(idx(SUARA_D2, "enam"), angkaDaftar(0)), tambah(idx(SUARA_D2, "empat"), angkaDaftar(1)), tambah(idx(SUARA_D2, "lima"), angkaDaftar(2)), tambah(idx(SUARA_D2, "tiga"), angkaDaftar(3))),
    k(
      SUARA_D3,
      ...gilir(SUARA_D3, [
        ["Kereta", ["ea-nm"]],
        ["mobil", ["eb-nm"]],
        ["boneka", ["ec-nm"]],
        ["bola", ["ed-nm"]],
      ]),
    ),
    k(SUARA_D4, redamkan(0, "ed-nm"), sorotkan("Kereta", ...sorotDaftar(0))),
    k(SUARA_D5, redamkan(0, ...sorotDaftar(0)), sorotkan("Bola", ...sorotDaftar(3))),
    k(SUARA_D6, redamkan(0, ...sorotDaftar(3)), ...gilir(SUARA_D6, [["Boneka", sorotDaftar(2)], ["mobil", sorotDaftar(1)]])),
    k(SUARA_D7, redamkan(0, ...sorotDaftar(2), ...sorotDaftar(1)), tambah("delapan", ...kartu("js", 40, 170, 220, 28, W.emas, ["jumlah semuanya: 18"], 10.4))),
  ],
};

/* ------------------------------ 5. Bola warna Upe ------------------------------ */
const BOLA = [
  { key: "a", nama: "Bola merah", e: EMO_MERAH, n: 7, y: 62 },
  { key: "b", nama: "Bola kuning", e: EMO_KUNING, n: 4, y: 102 },
  { key: "c", nama: "Bola hijau", e: EMO_HIJAU, n: 6, y: 142 },
];
const barisBola = (r: number): Obj[] => barisKelompok(BOLA[r].key, BOLA[r].nama, BOLA[r].e, BOLA[r].n, BOLA[r].y);
const sorotBola = (r: number): string[] => [`e${BOLA[r].key}-nm`, `e${BOLA[r].key}-ln`, ...ids(`e${BOLA[r].key}`, 0, BOLA[r].n - 1)];
const angkaBola = (r: number): Obj => jumlahG(BOLA[r].key, BOLA[r].y, String(BOLA[r].n));

const SUARA_W1 = "Upe mempunyai banyak bola. Bolanya berwarna merah, kuning, dan hijau. Kita kelompokkan menurut warnanya.";
const SUARA_W2 = "Kita hitung dulu. Ada tujuh bola merah. Ada empat bola kuning. Ada enam bola hijau.";
const SUARA_W3 = "Warna apa yang paling banyak? Bola merah paling banyak, yaitu tujuh.";
const SUARA_W4 = "Warna apa yang paling sedikit? Bola kuning paling sedikit, yaitu empat.";
const SUARA_W5 = "Bola hijau lebih banyak dari bola kuning. Bola hijau lebih sedikit dari bola merah.";
const SUARA_W6 = "Jadi urutan dari yang paling banyak adalah merah, hijau, lalu kuning.";
const SUARA_W7 = "Sekarang kita belajar cara menghitung yang lain, yaitu turus.";
const URUT = ["Merah", "Hijau", "Kuning"];
const chipUrut = (i: number): Obj[] => kartu(`ur${i}`, 14 + i * 94, 164, 84, 26, [W.merahMuda, W.hijauMuda, W.krem][i], [URUT[i]], 10);

export const ADEGAN_BOLA: AdeganStory = {
  id: "bola-warna",
  judul: "Bola warna milik Upe",
  sumber: "Materi: mengelompokkan menurut warna",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Bola Upe")), tambah(idx(SUARA_W1, "merah"), ...barisBola(0)), tambah(idx(SUARA_W1, "kuning"), ...barisBola(1)), tambah(idx(SUARA_W1, "hijau"), ...barisBola(2))),
    k(SUARA_W2, tambah(idx(SUARA_W2, "tujuh"), angkaBola(0)), tambah(idx(SUARA_W2, "empat"), angkaBola(1)), tambah(idx(SUARA_W2, "enam"), angkaBola(2))),
    k(SUARA_W3, sorotkan("Bola", ...sorotBola(0))),
    k(SUARA_W4, redamkan(0, ...sorotBola(0)), sorotkan("Bola", ...sorotBola(1))),
    k(SUARA_W5, redamkan(0, ...sorotBola(1)), sorotkan("Bola", ...sorotBola(2))),
    k(SUARA_W6, redamkan(0, ...sorotBola(2)), tambah(idx(SUARA_W6, "merah"), chipUrut(0)), tambah(idx(SUARA_W6, "hijau"), chipUrut(1)), tambah(idx(SUARA_W6, "kuning"), chipUrut(2))),
    k(SUARA_W7, hapus(0, ...[0, 1, 2].flatMap((i) => [`ur${i}-k`, `ur${i}-t0`])), tambah("turus.", ...kartu("tr", 40, 164, 220, 28, W.krem, ["cara lain: turus"], 10.4))),
  ],
};

/* ------------------------------ 6. Turus: bola merah ------------------------------ */
const YB = 62;
const YT = 122;
const XT = 84;
const kunciTurus = (key: string, y: number): Obj => teks(`tt-${key}`, 4, y - 4, "Turus", 8.6, W.ungu, { anchor: "start" });
const SUARA_T1 = "Menghitung bisa memakai turus. Turus adalah goresan kecil. Satu benda dihitung dengan satu goresan.";
const SUARA_T2 = "Ketuk bola merah satu demi satu. Setiap ketukan menambah satu goresan. Satu, dua.";
const SUARA_T3 = "Teruskan. Tiga, empat. Sekarang ada empat goresan tegak.";
const SUARA_T4 = "Sekarang bola kelima. Lima! Goresan kelima miring, memotong empat goresan tadi.";
const SUARA_T5 = "Lanjut. Enam, tujuh. Sekarang ada tujuh goresan. Satu kelompok lima, dan dua goresan lagi.";
const SUARA_T6 = "Banyaknya goresan sama banyak dengan bola merah. Tujuh goresan, tujuh bola merah. Turus cocok!";
const ITEM_M = ids("ea", 0, 6);

export const ADEGAN_TURUS_MERAH: AdeganStory = {
  id: "turus-merah",
  judul: "Turus: menghitung bola merah",
  sumber: "Materi: turus",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Turus")),
      tambah(idx(SUARA_T1, "Satu"), namaG("a", YB, "Bola merah"), ...bendaDi("a", EMO_MERAH, titikBaris(7, XT, YB)), kunciTurus("a", YT)),
    ),
    k(SUARA_T2, ...goresAksi(SUARA_T2, "a", 2, XT, YT, { setelah: "goresan." }), ...sorotUrut(SUARA_T2, ITEM_M.slice(0, 2), 1, "goresan.")),
    k(SUARA_T3, ...goresAksi(SUARA_T3, "a", 4, XT, YT, { dari: 2, setelah: "Teruskan." }), redamkan(0, "ea1"), ...sorotUrut(SUARA_T3, ITEM_M.slice(2, 4), 3, "Teruskan.")),
    k(SUARA_T4, ...goresAksi(SUARA_T4, "a", 5, XT, YT, { dari: 4, setelah: "Sekarang" }), redamkan(0, "ea3"), sorotkan(idx(SUARA_T4, "Lima"), "ea4")),
    k(
      SUARA_T5,
      ...goresAksi(SUARA_T5, "a", 7, XT, YT, { dari: 5, setelah: "Lanjut." }),
      redamkan(0, "ea4"),
      ...sorotUrut(SUARA_T5, ITEM_M.slice(5, 7), 6, "Lanjut."),
      tambah(idx(SUARA_T5, "tujuh", 2), jumlahTurus("a", 150, YT, "7")),
    ),
    k(SUARA_T6, redamkan(0, "ea6"), tambah(idx(SUARA_T6, "Tujuh"), jumlahG("a", YB, "7")), tambah("cocok!", emo("ok", 260, 170, "✅", 26))),
  ],
};

/* ------------------------------ 7. Turus: bola kuning dan bola hijau ------------------------------ */
const YK = 50;
const YKT = 84;
const YH = 118;
const YHT = 152;
const SUARA_U1 = "Sekarang bola kuning dan bola hijau. Kita hitung dengan turus juga.";
const SUARA_U2 = "Bola kuning dulu. Satu, dua, tiga, empat. Empat goresan tegak, belum ada yang miring.";
const SUARA_U3 = "Sekarang bola hijau. Satu, dua, tiga, empat, lima, enam. Goresan kelima miring. Ada enam goresan.";
const SUARA_U4 = "Lihat turus bola hijau. Satu kelompok lima, dan satu goresan lagi. Jadi bola hijau ada enam.";
const SUARA_U5 = "Turus bola hijau lebih banyak dari turus bola kuning. Bola hijau lebih banyak dua dari bola kuning.";

export const ADEGAN_TURUS_LAIN: AdeganStory = {
  id: "turus-lain",
  judul: "Turus: bola kuning dan bola hijau",
  sumber: "Materi: turus untuk dua kelompok",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Turus dua kelompok")),
      tambah(idx(SUARA_U1, "kuning"), namaG("b", YK, "Bola kuning"), ...bendaDi("b", EMO_KUNING, titikBaris(4, XT, YK)), kunciTurus("b", YKT)),
      tambah(idx(SUARA_U1, "hijau"), namaG("c", YH, "Bola hijau"), ...bendaDi("c", EMO_HIJAU, titikBaris(6, XT, YH)), kunciTurus("c", YHT)),
    ),
    k(SUARA_U2, ...goresAksi(SUARA_U2, "b", 4, XT, YKT, { setelah: "dulu." }), tambah(idx(SUARA_U2, "empat", 2), jumlahG("b", YK, "4"))),
    k(SUARA_U3, ...goresAksi(SUARA_U3, "c", 6, XT, YHT, { setelah: "hijau." }), tambah(idx(SUARA_U3, "enam", 2), jumlahG("c", YH, "6"))),
    k(SUARA_U4, ...gilir(SUARA_U4, [["lima", ids("tc-g", 0, 4)], ["satu", ["tc-g5"], 2]])),
    k(SUARA_U5, redamkan(0, "tc-g5"), sorotkan(idx(SUARA_U5, "dua"), "ec4", "ec5")),
  ],
};
