import type { AdeganStory } from "./logika-story";
import { EMO, MIN, W, buatBlok, buatGaris, buatSusun, emo, kartu, teks } from "./k3b1E-gambar";
import { hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k3b1E-bantu";
import { kepala } from "./k3b1E-luar-1";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 4. Menghitung Naik: konsep ------------------------------ */
const GN = buatGaris([47, 50, 60, 62]);
const SUARA_N1 = "Metode kedua bernama Menghitung Naik. Kita naik dari bilangan yang dikurangi sampai ke bilangan semula.";
const SUARA_N2 = "Mulai dari empat puluh tujuh. Naik tiga supaya sampai lima puluh.";
const SUARA_N3 = "Dari lima puluh, naik sepuluh sampai enam puluh. Lalu naik dua sampai enam puluh dua.";
const SUARA_N4 = "Jumlahkan semua lompatan. Tiga ditambah sepuluh ditambah dua sama dengan lima belas.";
const SUARA_N5 = "Jadi enam puluh dua dikurangi empat puluh tujuh sama dengan lima belas. Naik dulu, lalu jumlahkan lompatannya.";

export const ADEGAN_LUAR_NAIK: AdeganStory = {
  id: "luar-naik",
  judul: "Menghitung Naik: naik dari yang dikurangi",
  sumber: "Metode luar: Menghitung Naik",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_N1, tambah(0, ...kepala(1)), tambah(idx(SUARA_N1, "kedua"), cap(`62 ${MIN} 47`)), tambah(idx(SUARA_N1, "dikurangi"), ...GN.dasar(), ...GN.titik(0)), tambah(idx(SUARA_N1, "semula."), ...GN.titik(3))),
    k(SUARA_N2, tambah(idx(SUARA_N2, "Naik"), ...GN.lompat(0)), tambah(idx(SUARA_N2, "lima"), ...GN.titik(1))),
    k(SUARA_N3, tambah(idx(SUARA_N3, "naik", 1), ...GN.lompat(1)), tambah(idx(SUARA_N3, "enam"), ...GN.titik(2)), tambah(idx(SUARA_N3, "naik", 2), ...GN.lompat(2))),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "semua"), "nl-h0", "nl-h1", "nl-h2"), ubah(idx(SUARA_N4, "sama"), { id: "cp", isi: "3 + 10 + 2 = 15" })),
    k(SUARA_N5, redamkan(0, "nl-h0", "nl-h1", "nl-h2"), ubah(idx(SUARA_N5, "sama"), { id: "cp", isi: `62 ${MIN} 47 = 15` })),
  ],
};

/* ------------------------------ 5. Menghitung Naik: terapan ------------------------------ */
const GT = buatGaris([56, 60, 80, 81]);
const SUARA_U1 = "Terapkan pada soal ini. Kira punya delapan puluh satu apel dan memberikan lima puluh enam apel.";
const SUARA_U2 = "Berapa selisih kedua bilangan itu? Ketuk jawaban yang tepat.";
const SUARA_U3 = "Betul! Dari lima puluh enam naik empat, naik dua puluh, lalu naik satu. Empat ditambah dua puluh ditambah satu sama dengan dua puluh lima.";
const SUARA_U4 = "Dengan Menghitung Naik, kita tidak perlu mengambil satu puluhan. Kita hanya naik dan menjumlahkan lompatan.";

export const ADEGAN_LUAR_NAIK_TERAPAN: AdeganStory = {
  id: "luar-naik-terapan",
  judul: "Menghitung Naik: apel Kira",
  sumber: "Metode luar: Menghitung Naik",
  latar: "#E0F2FE",
  ketukan: [
    k(SUARA_U1, tambah(0, ...kepala(1)), tambah(idx(SUARA_U1, "satu"), ...GT.dasar(), ...GT.titik(3)), tambah(idx(SUARA_U1, "lima"), ...GT.titik(0), cap(`81 ${MIN} 56 = ?`))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "Berapa"), teks("tanya", 150, 62, `berapa 81 ${MIN} 56?`, 12, W.ungu)), tambah(idx(SUARA_U2, "jawaban"), ...pilihKata(150, ["35", "24", "25"], 16))),
    k(
      SUARA_U3,
      sorotkan(idx(SUARA_U3, "Betul!"), "c3-k"),
      tambah(idx(SUARA_U3, "empat,"), ...GT.lompat(0), ...GT.titik(1)),
      tambah(idx(SUARA_U3, "dua"), ...GT.lompat(1), ...GT.titik(2)),
      tambah(idx(SUARA_U3, "satu."), ...GT.lompat(2)),
      ubah(idx(SUARA_U3, "sama"), { id: "cp", isi: "4 + 20 + 1 = 25" }),
    ),
    k(SUARA_U4, redamkan(0, "c3-k"), hapus(0, "tanya", ...idPilihan(3)), ubah(idx(SUARA_U4, "naik"), { id: "cp", isi: `81 ${MIN} 56 = 25` })),
  ],
};

/* ------------------------------ 6. Meminjam: konsep ------------------------------ */
const SP = buatSusun(52, 27);
const BP = buatBlok("a", 122, 44, 5);
const SUARA_P1 = "Metode ketiga bernama Meminjam. Meminjam berarti membuka satu puluhan menjadi sepuluh satuan.";
const SUARA_P2 = "Lima puluh dua punya lima puluhan dan dua satuan. Dua satuan kurang untuk dikurangi tujuh.";
const SUARA_P3 = "Buka satu batang. Satu batang menjadi sepuluh kotak kecil, jadi satuan menjadi dua belas.";
const SUARA_P4 = "Dua belas dikurangi tujuh sama dengan lima, dan empat dikurangi dua sama dengan dua. Sisanya dua puluh lima.";
const SUARA_P5 = "Itulah Meminjam. Buka puluhan menjadi sepuluh satuan, lalu kurangkan seperti biasa.";

export const ADEGAN_LUAR_PINJAM: AdeganStory = {
  id: "luar-pinjam",
  judul: "Meminjam: buka satu puluhan",
  sumber: "Metode luar: Meminjam",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(2)), tambah(idx(SUARA_P1, "Metode"), ...SP.kerangka(), ...SP.atas(), ...SP.bawah()), tambah(idx(SUARA_P1, "sepuluh"), ...kartu("pk", 122, 100, 172, 26, W.emas, ["1 puluhan = 10 satuan"], 9))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "puluhan"), ...BP.batangObj(1, 5)), tambah(idx(SUARA_P2, "satuan."), ...BP.kecilObj(1, 2), BP.label(52)), sorotkan(idx(SUARA_P2, "Dua", 2), "sg-a0", "sg-b0")),
    k(
      SUARA_P3,
      redamkan(0, "sg-a0", "sg-b0"),
      sorotkan(idx(SUARA_P3, "Buka"), ...BP.idBatang(5, 5)),
      hapus(idx(SUARA_P3, "sepuluh"), ...BP.idBatang(5, 5), BP.idLabel),
      tambah(idx(SUARA_P3, "kecil,"), ...BP.kecilObj(3, 12)),
      tambah(idx(SUARA_P3, "dua"), ...SP.coret(), SP.puluhBaru(), SP.satuBaru()),
      tambah(idx(SUARA_P3, "belas."), BP.label(52)),
    ),
    k(
      SUARA_P4,
      ubah(idx(SUARA_P4, "tujuh"), ...BP.idKecil(1, 7).map((id) => ({ id, op: 0.2 })), ...BP.idBatang(1, 2).map((id) => ({ id, op: 0.2 })), { id: BP.idLabel, isi: "25" }),
      tambah(idx(SUARA_P4, "lima,"), SP.hasil0()),
      tambah(idx(SUARA_P4, "dua", 3), SP.hasil1()),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "Buka"), ...kartu("pr", 14, 156, 272, 28, W.emas, ["buka puluhan jadi sepuluh satuan"], 9.5)), tambah(idx(SUARA_P5, "kurangkan"), cap(`52 ${MIN} 27 = 25`))),
  ],
};

/* ------------------------------ 7. Meminjam: terapan ------------------------------ */
const SQ = buatSusun(61, 35);
const BQ = buatBlok("a", 122, 44, 6);
const SUARA_V1 = "Terapkan pada soal ini. Upe punya enam puluh satu kelereng dan memberikan tiga puluh lima kelereng.";
const SUARA_V2 = "Berapa sisa kelereng Upe? Ketuk jawaban yang tepat.";
const SUARA_V3 = "Betul! Buka satu batang, jadi satuan menjadi sebelas. Sebelas dikurangi lima sama dengan enam, dan lima dikurangi tiga sama dengan dua.";
const SUARA_V4 = "Dengan Meminjam, satu batang menjadi sepuluh kotak kecil. Sisa kelereng Upe dua puluh enam.";

export const ADEGAN_LUAR_PINJAM_TERAPAN: AdeganStory = {
  id: "luar-pinjam-terapan",
  judul: "Meminjam: kelereng Upe",
  sumber: "Metode luar: Meminjam",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_V1, "Terapkan"), ...SQ.kerangka()),
      tambah(idx(SUARA_V1, "satu"), ...SQ.atas()),
      tambah(idx(SUARA_V1, "kelereng"), ...BQ.batangObj(1, 6), ...BQ.kecilObj(1, 1), BQ.label(61)),
      tambah(idx(SUARA_V1, "lima"), ...SQ.bawah()),
    ),
    k(SUARA_V2, tambah(idx(SUARA_V2, "Berapa"), teks("tanya", 205, 118, `berapa 61 ${MIN} 35?`, 12, W.ungu)), tambah(idx(SUARA_V2, "jawaban"), ...pilihKata(150, ["26", "36", "34"], 16))),
    k(
      SUARA_V3,
      sorotkan(idx(SUARA_V3, "Betul!"), "c1-k"),
      hapus(idx(SUARA_V3, "Buka"), "pb-a-p-6", BQ.idLabel),
      tambah(idx(SUARA_V3, "jadi"), ...SQ.coret(), SQ.puluhBaru(), SQ.satuBaru()),
      tambah(idx(SUARA_V3, "sebelas."), ...BQ.kecilObj(2, 11)),
      ubah(idx(SUARA_V3, "dikurangi", 2), ...BQ.idKecil(1, 5).map((id) => ({ id, op: 0.2 })), ...BQ.idBatang(1, 3).map((id) => ({ id, op: 0.2 }))),
      tambah(idx(SUARA_V3, "enam,"), SQ.hasil0()),
      tambah(idx(SUARA_V3, "dua."), SQ.hasil1(), BQ.label(26)),
    ),
    k(SUARA_V4, redamkan(0, "c1-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_V4, "sepuluh"), ...kartu("pt", 122, 104, 172, 26, W.emas, ["1 batang = 10 kotak"], 9)), tambah(idx(SUARA_V4, "Sisa"), cap(`61 ${MIN} 35 = 26`))),
  ],
};

void EMO;
void emo;
