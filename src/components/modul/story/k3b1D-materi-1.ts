import type { AdeganStory } from "./logika-story";
import { W, barisNT, blok, judul, kartu, kepalaNT, kotak, nilaiTokoh, panah, susun, teks, tokoh } from "./k3b1D-gambar";
import { E, bersih, e, hapus, idx, k, redamkan, sorotkan, tambah } from "./k3b1D-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 2. Kelereng Malosi dan Kira ------------------------------ */
const SUARA_A1 = `Malosi dan Kira bermain kelereng. Malosi punya ${e(23)} kelereng, dan Kira punya ${e(16)} kelereng.`;
const SUARA_A2 = `Berapa jumlah semua kelereng mereka? Kita jumlahkan, yaitu ${e(23)} ditambah ${e(16)}.`;
const SUARA_A3 = "Menjumlahkan berarti menggabungkan kelereng Malosi dengan kelereng Kira. Hasilnya adalah jumlah semua kelereng.";
const SUARA_A4 = "Untuk menjumlahkan bilangan yang besar, kita memakai susun pendek. Mari kita pelajari langkah demi langkah.";

export const ADEGAN_CERITA_KELERENG: AdeganStory = {
  id: "cerita-kelereng",
  judul: "Kelereng Malosi dan Kira",
  sumber: "Materi: kelereng Malosi dan Kira",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Kelereng Malosi dan Kira")),
      tambah(idx(SUARA_A1, "Malosi", 1), ...tokoh("malosi", 0)),
      tambah(idx(SUARA_A1, "Kira", 1), ...tokoh("kira", 1)),
      tambah(idx(SUARA_A1, "dua"), nilaiTokoh("malosi", 0, 23)),
      tambah(idx(SUARA_A1, "enam"), nilaiTokoh("kira", 1, 16)),
    ),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Berapa"), teks("soal", 150, 82, "23 + 16 = ?", 18, W.ungu))),
    k(
      SUARA_A3,
      tambah(idx(SUARA_A3, "menggabungkan"), panah("pa1", 74, 118, 28, -24, W.merah, 2), panah("pa2", 226, 118, -28, -24, W.merah, 2)),
      tambah(idx(SUARA_A3, "Hasilnya"), teks("pj", 150, 150, "jumlah semua kelereng", 11, W.ungu)),
    ),
    k(SUARA_A4, hapus(0, "pj"), tambah(idx(SUARA_A4, "susun"), ...kartu("sp", 50, 150, 200, 32, W.emas, ["susun pendek"], 13))),
  ],
};

/* ------------------------------ 3. Puluhan dan satuan ------------------------------ */
const SUARA_N1 = "Setiap bilangan dua angka punya puluhan dan satuan. Satu batang mewakili satu puluhan, dan satu kotak kecil mewakili satu satuan.";
const SUARA_N2 = `Bilangan ${e(23)} punya ${e(2)} puluhan dan ${e(3)} satuan.`;
const SUARA_N3 = `Bilangan ${e(16)} punya ${e(1)} puluhan dan ${e(6)} satuan.`;
const SUARA_N4 = `Sekarang kita masukkan ke tabel nilai tempat. ${E(23)} terdiri atas ${e(2)} puluhan dan ${e(3)} satuan. ${E(16)} terdiri atas ${e(1)} puluhan dan ${e(6)} satuan.`;
const SUARA_N5 = "Angka puluhan menunjukkan banyak batang, dan angka satuan menunjukkan banyak kotak kecil.";
const BA = blok("a", 60, 56, 23);
const BB = blok("b", 190, 56, 16);

export const ADEGAN_NILAI_TEMPAT: AdeganStory = {
  id: "nilai-tempat",
  judul: "Puluhan dan satuan",
  sumber: "Materi: puluhan dan satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Puluhan dan satuan")),
      tambah(idx(SUARA_N1, "batang"), kotak("dm-p", 70, 56, 12, 46, "#60A5FA", W.biru, { rx: 2 }), teks("dm-pl", 76, 122, "satu puluhan", 9, W.biru)),
      tambah(idx(SUARA_N1, "kotak"), kotak("dm-s", 216, 92, 10, 10, "#F87171", W.biru, { rx: 2 }), teks("dm-sl", 221, 122, "satu satuan", 9, W.biru)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Bilangan dua puluh tiga")),
      tambah(idx(SUARA_N2, "puluhan"), ...BA.batang()),
      tambah(idx(SUARA_N2, "satuan"), ...BA.satuan(), BA.label(), BA.ket()),
    ),
    k(SUARA_N3, tambah(idx(SUARA_N3, "puluhan"), ...BB.batang()), tambah(idx(SUARA_N3, "satuan"), ...BB.satuan(), BB.label(), BB.ket())),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Tabel nilai tempat")),
      tambah(idx(SUARA_N4, "tabel"), ...kepalaNT()),
      tambah(idx(SUARA_N4, "terdiri", 1) - 3, ...barisNT("a", 88, 23)),
      tambah(idx(SUARA_N4, "terdiri", 2) - 2, ...barisNT("b", 136, 16)),
    ),
    k(SUARA_N5, sorotkan(idx(SUARA_N5, "puluhan"), "nt-a-t", "nt-b-t"), redamkan(idx(SUARA_N5, "satuan"), "nt-a-t", "nt-b-t"), sorotkan(idx(SUARA_N5, "satuan"), "nt-a-s", "nt-b-s"), tambah(idx(SUARA_N5, "kotak"), cap("angka = banyak blok"))),
  ],
};

/* ------------------------------ 4. Susun pendek tanpa menyimpan ------------------------------ */
const S1 = susun(23, 16);
const SUARA_P1 = "Mari kita susun bilangan itu ke bawah. Puluhan lurus dengan puluhan, satuan lurus dengan satuan.";
const SUARA_P2 = `Kita mulai dari satuan. ${E(3)} ditambah ${e(6)} sama dengan ${e(9)}.`;
const SUARA_P3 = `Lalu puluhan. ${E(2)} ditambah ${e(1)} sama dengan ${e(3)}.`;
const SUARA_P4 = `Jadi, ${e(23)} ditambah ${e(16)} sama dengan ${e(39)}.`;
const SUARA_P5 = "Tidak ada satuan yang berjumlah sepuluh atau lebih, jadi tidak ada yang perlu disimpan. Inilah penjumlahan tanpa menyimpan.";

export const ADEGAN_SUSUN_PENDEK: AdeganStory = {
  id: "susun-pendek",
  judul: "Susun pendek tanpa menyimpan",
  sumber: "Materi: susun pendek",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Susun pendek"), ...S1.kepala()), tambah(idx(SUARA_P1, "bilangan"), ...S1.atas()), tambah(idx(SUARA_P1, "Puluhan"), ...S1.bawah())),
    k(SUARA_P2, tambah(idx(SUARA_P2, "satuan"), S1.sorS()), tambah(idx(SUARA_P2, "Tiga"), S1.eqS()), tambah(idx(SUARA_P2, "sembilan"), S1.hSatuan())),
    k(SUARA_P3, hapus(0, "ls-sor"), tambah(idx(SUARA_P3, "puluhan"), S1.sorT()), tambah(idx(SUARA_P3, "Dua"), S1.eqP()), tambah(idx(SUARA_P3, "tiga"), S1.hPuluhan())),
    k(SUARA_P4, hapus(0, "ls-sor"), tambah(idx(SUARA_P4, "Jadi"), cap("23 + 16 = 39"))),
    k(SUARA_P5, tambah(idx(SUARA_P5, "Inilah"), ...kartu("tp", 168, 38, 124, 34, W.emas, ["tanpa menyimpan"], 10))),
  ],
};

/* ------------------------------ 5. Periksa dengan blok ------------------------------ */
const PA = blok("a", 24, 34, 23);
const PB = blok("b", 176, 34, 16);
const PH = blok("h", 100, 116, 39);
const idS = (g: string, n: number) => Array.from({ length: n }, (_, i) => `bk-${g}-s${i + 1}`);
const idP = (g: string, n: number) => Array.from({ length: n }, (_, i) => `bk-${g}-p${i + 1}`);
const SUARA_B1 = `Kita periksa dengan blok. Ini blok bilangan ${e(23)} dan blok bilangan ${e(16)}.`;
const SUARA_B2 = `Gabungkan satuannya. ${E(3)} satuan dan ${e(6)} satuan menjadi ${e(9)} satuan.`;
const SUARA_B3 = `Gabungkan puluhannya. ${E(2)} puluhan dan ${e(1)} puluhan menjadi ${e(3)} puluhan.`;
const SUARA_B4 = `Semuanya ada ${e(3)} puluhan dan ${e(9)} satuan, yaitu ${e(39)}. Hasilnya sama dengan hasil susun pendek.`;

export const ADEGAN_PERIKSA_BLOK: AdeganStory = {
  id: "periksa-blok",
  judul: "Periksa dengan blok",
  sumber: "Materi: periksa dengan blok",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Periksa dengan blok")),
      tambah(idx(SUARA_B1, "Ini"), ...PA.batang(), ...PA.satuan(), PA.label()),
      tambah(idx(SUARA_B1, "bilangan", 2), ...PB.batang(), ...PB.satuan(), PB.label()),
    ),
    k(
      SUARA_B2,
      sorotkan(idx(SUARA_B2, "Tiga"), ...idS("a", 3)),
      sorotkan(idx(SUARA_B2, "enam"), ...idS("b", 6)),
      redamkan(idx(SUARA_B2, "menjadi"), ...idS("a", 3), ...idS("b", 6)),
      tambah(idx(SUARA_B2, "menjadi"), ...PH.satuan()),
    ),
    k(
      SUARA_B3,
      sorotkan(idx(SUARA_B3, "Dua"), ...idP("a", 2)),
      sorotkan(idx(SUARA_B3, "satu"), ...idP("b", 1)),
      redamkan(idx(SUARA_B3, "menjadi"), ...idP("a", 2), ...idP("b", 1)),
      tambah(idx(SUARA_B3, "menjadi"), ...PH.batang()),
    ),
    k(SUARA_B4, tambah(idx(SUARA_B4, "yaitu"), PH.label()), tambah(idx(SUARA_B4, "Hasilnya"), cap("23 + 16 = 39"))),
  ],
};
