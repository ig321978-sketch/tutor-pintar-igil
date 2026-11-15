import type { AdeganStory } from "./logika-story";
import { W, batangTukar, judul, kartu, lepas, nilaiTokoh, panah, susun, teks, tokoh } from "./k3b1D-gambar";
import { E, bersih, e, hapus, idx, k, sorotkan, tambah, ubah } from "./k3b1D-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 6. Stiker Wei dan Upe: tanpa menyimpan ------------------------------ */
const S5 = susun(42, 27);
const SUARA_C1 = `Wei punya ${e(42)} stiker. Upe punya ${e(27)} stiker. Berapa jumlah semua stiker?`;
const SUARA_C2 = "Susun ke bawah dengan rapi. Angka puluhan sejajar, dan angka satuan juga sejajar.";
const SUARA_C3 = `Satuan dahulu. ${E(2)} ditambah ${e(7)} sama dengan ${e(9)}.`;
const SUARA_C4 = `Lalu puluhan. ${E(4)} ditambah ${e(2)} sama dengan ${e(6)}.`;
const SUARA_C5 = `Jadi, jumlah stiker mereka ada ${e(69)}. Tidak ada simpanan.`;

export const ADEGAN_TANPA_SIMPAN_DUA: AdeganStory = {
  id: "tanpa-simpan-dua",
  judul: "Stiker Wei dan Upe",
  sumber: "Materi: stiker Wei dan Upe",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Stiker Wei dan Upe")),
      tambah(idx(SUARA_C1, "Wei"), ...tokoh("wei", 0)),
      tambah(idx(SUARA_C1, "empat"), nilaiTokoh("wei", 0, 42)),
      tambah(idx(SUARA_C1, "Upe"), ...tokoh("upe", 1)),
      tambah(idx(SUARA_C1, "dua", 2), nilaiTokoh("upe", 1, 27)),
      tambah(idx(SUARA_C1, "Berapa"), teks("soal", 150, 82, "42 + 27 = ?", 18, W.ungu)),
    ),
    k(SUARA_C2, bersih(0), tambah(0, judul("Susun ke bawah"), ...S5.kepala()), tambah(idx(SUARA_C2, "puluhan"), ...S5.atas()), tambah(idx(SUARA_C2, "satuan"), ...S5.bawah())),
    k(SUARA_C3, tambah(idx(SUARA_C3, "Satuan"), S5.sorS()), tambah(idx(SUARA_C3, "Dua"), S5.eqS()), tambah(idx(SUARA_C3, "sembilan"), S5.hSatuan())),
    k(SUARA_C4, hapus(0, "ls-sor"), tambah(idx(SUARA_C4, "puluhan"), S5.sorT()), tambah(idx(SUARA_C4, "Empat"), S5.eqP()), tambah(idx(SUARA_C4, "enam"), S5.hPuluhan())),
    k(SUARA_C5, hapus(0, "ls-sor"), tambah(idx(SUARA_C5, "Jadi"), cap("42 + 27 = 69"))),
  ],
};

/* ------------------------------ 7. Tukar sepuluh satuan ------------------------------ */
const L14 = lepas("a", 14);
const SUARA_T1 = `Bagaimana kalau satuannya banyak? Lihat ${e(14)} satuan di layar.`;
const SUARA_T2 = "Kita ambil sepuluh satuan dan tukar dengan satu batang puluhan.";
const SUARA_T3 = `${E(14)} satuan sama dengan ${e(1)} puluhan dan ${e(4)} satuan.`;
const SUARA_T4 = "Inilah alasan kita menyimpan. Sepuluh satuan selalu ditukar dengan satu puluhan.";
const SUARA_T5 = "Satu puluhan itu kita simpan di atas kolom puluhan. Nanti kita lihat caranya pada soal berikutnya.";

export const ADEGAN_TUKAR_SEPULUH: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Sepuluh satuan jadi satu puluhan",
  sumber: "Materi: tukar sepuluh satuan",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Sepuluh satuan jadi satu puluhan")), tambah(idx(SUARA_T1, "Lihat"), ...L14.semua()), tambah(idx(SUARA_T1, "satuan"), L14.label(14))),
    k(
      SUARA_T2,
      sorotkan(idx(SUARA_T2, "ambil"), ...L14.sepuluh()),
      hapus(idx(SUARA_T2, "tukar"), ...L14.sepuluh()),
      tambah(idx(SUARA_T2, "tukar"), batangTukar(1, 214, 66)),
      ubah(idx(SUARA_T2, "tukar"), { id: "bs-a-n", isi: "4" }),
    ),
    k(SUARA_T3, tambah(idx(SUARA_T3, "satu"), teks("ts-l", 221, 122, "1 puluhan", 10, W.biru)), tambah(idx(SUARA_T3, "empat", 2), teks("ts-m", 101, 122, "4 satuan", 10, W.biru)), tambah(idx(SUARA_T3, "sama"), teks("ts-t", 150, 148, "14 satuan = 1 puluhan + 4 satuan", 10, W.ungu))),
    k(SUARA_T4, hapus(0, "ts-t"), tambah(idx(SUARA_T4, "Sepuluh"), ...kartu("al", 40, 150, 220, 30, W.emas, ["10 satuan = 1 puluhan"], 12))),
    k(SUARA_T5, tambah(idx(SUARA_T5, "kolom"), teks("kp", 232, 38, "kolom puluhan", 9, W.ungu), panah("pk", 221, 62, 0, -16, W.merah, 2))),
  ],
};

/* ------------------------------ 8. Menyimpan: satuan ------------------------------ */
const S7 = susun(48, 16);
const SUARA_D1 = `Halim memetik ${e(48)} jeruk. Igil memetik ${e(16)} jeruk. Berapa jumlah jeruk mereka?`;
const SUARA_D2 = `Susun ke bawah, lalu jumlahkan satuan dahulu. ${E(8)} ditambah ${e(6)} sama dengan ${e(14)}.`;
const SUARA_D3 = `${E(14)} satuan sama dengan ${e(1)} puluhan dan ${e(4)} satuan.`;
const SUARA_D4 = `Tulis ${e(4)} di tempat satuan, lalu simpan ${e(1)} puluhan di atas kolom puluhan.`;
const SUARA_D5 = "Angka yang kita simpan itu bernilai satu puluhan, bukan satu satuan.";

export const ADEGAN_SIMPAN_SATUAN: AdeganStory = {
  id: "simpan-satuan",
  judul: "Menyimpan satu puluhan",
  sumber: "Materi: menyimpan satu puluhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Jeruk Halim dan Igil")),
      tambah(idx(SUARA_D1, "Halim"), ...tokoh("halim", 0)),
      tambah(idx(SUARA_D1, "empat"), nilaiTokoh("halim", 0, 48)),
      tambah(idx(SUARA_D1, "Igil"), ...tokoh("igil", 1)),
      tambah(idx(SUARA_D1, "enam"), nilaiTokoh("igil", 1, 16)),
      tambah(idx(SUARA_D1, "Berapa"), teks("soal", 150, 82, "48 + 16 = ?", 18, W.ungu)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Menyimpan satu puluhan"), ...S7.kepala(), ...S7.atas(), ...S7.bawah()),
      tambah(idx(SUARA_D2, "satuan"), S7.sorS()),
      tambah(idx(SUARA_D2, "Delapan"), S7.eqS()),
    ),
    k(SUARA_D3, tambah(idx(SUARA_D3, "satu"), teks("eq-t", 232, 150, "10 + 4 = 14", 13, W.hijau))),
    k(SUARA_D4, tambah(idx(SUARA_D4, "Tulis"), S7.hSatuan()), tambah(idx(SUARA_D4, "simpan"), S7.sim())),
    k(SUARA_D5, tambah(idx(SUARA_D5, "bernilai"), teks("ket-sim", 232, 66, "1 puluhan", 11, W.merah), panah("pa-sim", 200, 60, -88, 0, W.merah, 2))),
  ],
};
