import type { AdeganStory, Obj } from "./logika-story";
import { BINTANG, BUAH, BULAT, HATI, OWL, W, WAJAH, emo, judul, kartu, teks } from "./k2b8B-gambar";
import { hapus, idx, k, redamkan, sorotHitung, sorotkan, tambah, ubah, urutBilangan } from "./k2b8B-bantu";
import { DB } from "./k2b8B-materi-1";

/* ------------------------------ 6. Gambar lain pun boleh ------------------------------ */
const LAMBANG = [
  { nama: "bintang", g: BINTANG, warna: W.merah },
  { nama: "lingkaran", g: BULAT, warna: W.biruGambar },
  { nama: "hati", g: HATI, warna: W.ungu },
  { nama: "wajah", g: WAJAH, warna: W.jingga },
];
/** Baris contoh lambang: empat gambar untuk empat apel. Id `gx{r}{i}`, nama `gn{r}`. */
const lambang = (r: number): Obj[] => [
  teks(`gn${r}`, 12, 52 + r * 30, LAMBANG[r].nama, 9.4, W.biru, { anchor: "start" }),
  ...Array.from({ length: 4 }, (_, i) => teks(`gx${r}${i}`, 120 + i * 26, 56 + r * 30, LAMBANG[r].g, 18, LAMBANG[r].warna)),
];
const ID_LAMBANG = LAMBANG.flatMap((_, r) => Array.from({ length: 4 }, (__, i) => `gx${r}${i}`));
const SUARA_L1 = "Selain bintang, kita boleh memakai gambar lain. Ada lingkaran, hati, dan wajah tersenyum.";
const SUARA_L2 = "Semuanya menandai empat buah apel. Satu gambar untuk satu apel, jadi ada empat gambar.";
const SUARA_L3 = "Pilih satu jenis gambar, lalu pakai terus sampai diagram selesai. Jangan berganti di tengah jalan.";

export const ADEGAN_GAMBAR_LAIN: AdeganStory = {
  id: "gambar-lain",
  judul: "Gambar lain pun boleh",
  sumber: "Materi: lambang diagram gambar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Gambar yang boleh dipakai")),
      tambah("bintang,", ...lambang(0)),
      tambah("lingkaran,", ...lambang(1)),
      tambah("hati,", ...lambang(2)),
      tambah("wajah", ...lambang(3)),
    ),
    k(SUARA_L2, sorotkan("Semuanya", ...ID_LAMBANG), tambah("empat", ...kartu("ap", 50, 176, 200, 20, W.krem, ["4 apel = 4 gambar"], 10))),
    k(SUARA_L3, redamkan(0, ...ID_LAMBANG), hapus(0, "ap-k", "ap-t0"), tambah("Pilih", ...kartu("pj", 20, 172, 260, 24, W.hijauMuda, ["satu diagram, satu jenis gambar"], 10)), tambah("Jangan", emo("sl", 262, 140, "❌", 22))),
  ],
};

/* ------------------------------ 7. Sama bentuk dan sama besar ------------------------------ */
const UKURAN_SALAH = [12, 26, 16, 28, 12];
const SUARA_U1 = "Semua gambar dalam satu diagram harus sama bentuk dan sama besar.";
const SUARA_U2 = "Lihat baris ini. Bintangnya sama besar, dan jaraknya sama. Mudah dihitung.";
const SUARA_U3 = "Sekarang lihat baris ini. Ada bintang besar dan ada bintang kecil. Kita bisa salah menghitung.";
const SUARA_U4 = "Jadi gambar harus sama bentuk, sama besar, dan rapi dari kiri ke kanan.";

export const ADEGAN_SAMA_UKURAN: AdeganStory = {
  id: "sama-ukuran",
  judul: "Gambar harus sama bentuk dan besarnya",
  sumber: "Materi: gambar sama bentuk dan ukuran",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Sama bentuk, sama besar")), tambah("sama", emo("ow", 150, 110, OWL, 44))),
    k(
      SUARA_U2,
      hapus(0, "ow"),
      tambah("baris", teks("uk0", 12, 76, "baris ini", 9.4, W.biru, { anchor: "start" })),
      tambah("Bintangnya", ...Array.from({ length: 5 }, (_, i) => teks(`ok${i}`, 110 + i * 28, 80, BINTANG, 20, W.hijau))),
      tambah("Mudah", emo("oc", 262, 78, "✅", 22)),
    ),
    k(
      SUARA_U3,
      tambah("baris", teks("uk1", 12, 136, "baris ini", 9.4, W.biru, { anchor: "start" })),
      tambah("besar", ...UKURAN_SALAH.map((u, i) => teks(`bad${i}`, 110 + i * 28, 140, BINTANG, u, W.merah))),
      tambah("salah", emo("tdk", 262, 138, "❌", 22)),
    ),
    k(SUARA_U4, tambah("Jadi", ...kartu("sk", 30, 166, 240, 26, W.emas, ["sama bentuk, sama besar, rapi"], 10))),
  ],
};

/* ------------------------------ 8. Paling banyak dan paling sedikit ------------------------------ */
const SUARA_P1 = "Ayo bandingkan data buah di diagram ini.";
const SUARA_P2 = "Lihat baris yang paling panjang. Jeruk paling banyak, ada enam bintang.";
const SUARA_P3 = "Sekarang lihat baris yang paling pendek. Anggur paling sedikit, hanya dua bintang.";
const SUARA_P4 = "Paling banyak berarti jumlahnya terbesar. Paling sedikit berarti jumlahnya terkecil.";
const SUARA_P5 = "Apel dan pisang ada di tengah. Keduanya tidak paling banyak, dan tidak paling sedikit.";

export const ADEGAN_PALING: AdeganStory = {
  id: "paling-banyak",
  judul: "Paling banyak dan paling sedikit",
  sumber: "Materi: paling banyak, paling sedikit",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_P1, tambah(0, ...DB.semua, ...BUAH.map((_, c) => DB.angka(c)))),
    k(SUARA_P2, sorotkan("paling", ...DB.idGambar(1))),
    k(SUARA_P3, redamkan(0, ...DB.idGambar(1)), sorotkan("Anggur", ...DB.idGambar(0))),
    k(SUARA_P4, redamkan(0, ...DB.idGambar(0)), tambah("Paling", ...kartu("pk", 200, 30, 96, 34, W.emas, ["paling banyak: terbesar", "paling sedikit: terkecil"], 7.4))),
    k(SUARA_P5, hapus(0, "pk-k", "pk-t0", "pk-t1"), sorotkan("Apel", ...DB.idGambar(2), ...DB.idGambar(3))),
  ],
};

/* ------------------------------ 9. Lebihnya dan kurangnya ------------------------------ */
const SUARA_S1 = "Sekarang kita bandingkan dua baris, jeruk dan apel.";
const SUARA_S2 = "Baris jeruk lebih panjang daripada baris apel. Jadi jeruk lebih banyak dari apel.";
const SUARA_S3 = "Berapa lebihnya? Lihat bintang jeruk yang tidak punya pasangan di baris apel. Satu, dua.";
const SUARA_S4 = "Jeruk lebih banyak dua dari apel. Apel lebih sedikit dua dari jeruk. Lebihnya disebut selisih.";
const SUARA_S5 = "Sekarang apel dan pisang. Apel lebih banyak satu dari pisang. Pisang kurang satu dari apel.";

export const ADEGAN_LEBIHNYA: AdeganStory = {
  id: "lebihnya",
  judul: "Lebihnya, kurangnya, dan selisih",
  sumber: "Materi: lebihnya, kurangnya, selisih",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_S1, tambah(0, ...DB.semua, ...BUAH.map((_, c) => DB.angka(c))), sorotkan("jeruk", ...DB.idGambar(1)), sorotkan("apel.", ...DB.idGambar(2))),
    k(SUARA_S2, tambah("Jadi", ...kartu("lb", 200, 30, 96, 22, W.hijauMuda, ["jeruk lebih banyak"], 8.6))),
    k(SUARA_S3, redamkan(0, ...DB.idGambar(1), ...DB.idGambar(2)), ...sorotHitung(SUARA_S3, ["dbg1_4", "dbg1_5"], { setelah: "apel." })),
    k(SUARA_S4, hapus(0, "lb-k", "lb-t0"), tambah("Lebihnya", ...kartu("sl", 200, 30, 96, 22, W.emas, ["selisih: 2"], 10))),
    k(SUARA_S5, redamkan(0, "dbg1_4", "dbg1_5"), hapus(0, "sl-k", "sl-t0"), sorotkan("Apel@2", "dbg2_3"), tambah("lebih", ...kartu("sm", 200, 30, 96, 22, W.emas, ["selisih: 1"], 10))),
  ],
};

/* ------------------------------ 10. Jumlah semua data ------------------------------ */
const SUARA_J1 = "Sekarang kita cari jumlah buah. Kita lihat diagram buahnya.";
const SUARA_J2 = "Jeruk dan apel. Enam dan empat jadi sepuluh.";
const SUARA_J3 = "Sekarang semuanya. Dua dan enam jadi delapan. Delapan dan empat jadi dua belas. Dua belas dan tiga jadi lima belas.";
const SUARA_J4 = "Jumlah semuanya lima belas. Ada lima belas buah di diagram ini.";
const SUARA_J5 = "Kita periksa dengan menghitung semua bintang. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas.";
const SUARA_J6 = "Hasilnya sama, lima belas. Jadi jumlah semuanya lima belas.";
const eq = (id: string, y: number, isi: string): Obj => teks(id, 296, y, isi, 10, W.coklat, { anchor: "end" });
const hitungSemua = () => {
  const pos = urutBilangan(SUARA_J5, 1, 15, "bintang.");
  return DB.idSemua.flatMap((id, q) => [sorotkan(pos[q], id), ubah(pos[q], { id: "cn", isi: String(q + 1) })]);
};

export const ADEGAN_JUMLAH_BUAH: AdeganStory = {
  id: "jumlah-buah",
  judul: "Jumlah semua buah",
  sumber: "Materi: jumlah semua data",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_J1, tambah(0, ...DB.semua, ...BUAH.map((_, c) => DB.angka(c)))),
    k(SUARA_J2, sorotkan("Jeruk", ...DB.idGambar(1), ...DB.idGambar(2)), tambah("Enam", eq("j0", 60, "6 + 4 = 10"))),
    k(
      SUARA_J3,
      redamkan(0, ...DB.idGambar(1), ...DB.idGambar(2)),
      hapus(0, "j0"),
      tambah("Dua", eq("j1", 56, "2 + 6 = 8")),
      tambah(idx(SUARA_J3, "delapan", 2), eq("j2", 80, "8 + 4 = 12")),
      tambah(idx(SUARA_J3, "dua", 3), eq("j3", 104, "12 + 3 = 15")),
    ),
    k(SUARA_J4, hapus(0, "j1", "j2", "j3"), tambah("Jumlah", teks("jt", 262, 56, "jumlah: 15", 10.6, W.merah))),
    k(SUARA_J5, hapus(0, "jt"), tambah("Kita", teks("cn", 262, 56, "0", 14, W.merah)), ...hitungSemua()),
    k(SUARA_J6, redamkan(0, ...DB.idSemua), tambah("Jadi", ...kartu("jh", 40, 150, 220, 24, W.hijauMuda, ["jumlah semuanya: 15"], 11))),
  ],
};
