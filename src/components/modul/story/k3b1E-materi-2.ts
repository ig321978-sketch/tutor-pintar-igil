import type { AdeganStory } from "./logika-story";
import { EMO, MIN, OWL, W, anak, buatBlok, buatSusun, emo, judul, kartu, teks } from "./k3b1E-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k3b1E-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 6. Kelereng Malosi ------------------------------ */
const SUARA_K1 = "Malosi punya empat puluh lima kelereng biru di kotaknya.";
const SUARA_K2 = "Wei datang dan meminta sembilan belas kelereng itu.";
const SUARA_K3 = "Berapa kelereng Malosi yang tersisa? Kita hitung dengan pengurangan, empat puluh lima dikurangi sembilan belas.";
const SUARA_K4 = "Kali ini ada yang berbeda. Lima satuan tidak cukup untuk diambil sembilan satuan, jadi kita perlu mengambil satu puluhan.";

export const ADEGAN_KELERENG: AdeganStory = {
  id: "kelereng",
  judul: "Kelereng Malosi dan Wei",
  sumber: "Materi: soal cerita yang perlu mengambil",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kelereng Malosi")), tambah(idx(SUARA_K1, "Malosi"), ...anak("malosi", 40, 80)), tambah(idx(SUARA_K1, "kelereng"), emo("kl", 150, 100, EMO.kelereng, 44)), tambah(idx(SUARA_K1, "lima"), ...kartu("kk", 10, 150, 90, 30, W.langit, ["45 kelereng"], 11))),
    k(SUARA_K2, tambah(idx(SUARA_K2, "Wei"), ...anak("wei", 260, 80)), tambah(idx(SUARA_K2, "belas"), ...kartu("kw", 105, 150, 90, 30, W.merahMuda, ["diambil 19"], 11))),
    k(SUARA_K3, tambah(idx(SUARA_K3, "Berapa"), teks("tn", 150, 52, "sisa kelereng: ?", 12, W.ungu)), hapus(idx(SUARA_K3, "Kita"), "tn"), tambah(idx(SUARA_K3, "dikurangi"), cap(`45 ${MIN} 19`))),
    k(SUARA_K4, tambah(idx(SUARA_K4, "Lima"), ...kartu("ks", 200, 150, 90, 30, W.emas, ["5 kurang dari 9"], 9.5)), tambah(idx(SUARA_K4, "puluhan."), emo("pr", 150, 52, "\u{1F4A1}", 22))),
  ],
};

/* ------------------------------ 7. Satuan kurang ------------------------------ */
const SK = buatSusun(45, 19);
const BK = buatBlok("a", 122, 44, 4);
const SUARA_L1 = "Mari kita susun empat puluh lima di atas sembilan belas, juga dengan balok.";
const SUARA_L2 = "Mulai dari satuan. Lima lebih kecil dari sembilan, jadi lima tidak dapat dikurangi sembilan.";
const SUARA_L3 = "Karena itu kita perlu menukar satu puluhan. Satu puluhan sama dengan sepuluh satuan.";
const SUARA_L4 = "Jadi satu batang dapat ditukar dengan sepuluh kotak kecil. Satuan kita akan bertambah sepuluh.";

export const ADEGAN_SATUAN_KURANG: AdeganStory = {
  id: "satuan-kurang",
  judul: "Satuan atas kurang",
  sumber: "Materi: satuan atas kurang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Satuan atas kurang")),
      tambah(idx(SUARA_L1, "susun"), ...SK.kerangka()),
      tambah(idx(SUARA_L1, "lima"), ...SK.atas()),
      tambah(idx(SUARA_L1, "belas,"), ...SK.bawah()),
      tambah(idx(SUARA_L1, "balok."), ...BK.batangObj(1, 4), ...BK.kecilObj(1, 5), BK.label(45)),
    ),
    k(SUARA_L2, sorotkan(idx(SUARA_L2, "satuan."), "sg-a0", "sg-b0"), tambah(idx(SUARA_L2, "Lima"), ...kartu("kb", 122, 108, 150, 26, W.merahMuda, ["5 lebih kecil dari 9"], 9))),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "puluhan."), ...BK.idBatang(4, 4)), tambah(idx(SUARA_L3, "sama"), ...kartu("kt", 122, 138, 170, 26, W.emas, ["1 puluhan = 10 satuan"], 9))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "ditukar"), emo("tk", 100, 175, "\u{1F501}", 22)), ubah(idx(SUARA_L4, "bertambah"), { id: "kt-k", warna: W.hijauMuda })),
  ],
};

/* ------------------------------ 8. Mengambil satu puluhan ------------------------------ */
const SM = buatSusun(45, 19);
const BM = buatBlok("a", 122, 44, 4);
const SUARA_M1 = "Kita ambil satu puluhan dari empat puluhan. Batang yang diambil kita sorot, dan angka empat kita coret.";
const SUARA_M2 = "Empat puluhan tinggal tiga puluhan. Kita catat angka tiga kecil di atas angka empat.";
const SUARA_M3 = "Satu puluhan menjadi sepuluh satuan. Sepuluh satuan ditambah lima satuan sama dengan lima belas satuan.";
const SUARA_M4 = "Sekarang kurangkan satuan. Lima belas dikurangi sembilan sama dengan enam.";
const SUARA_M5 = "Kurangkan puluhan. Tiga dikurangi satu sama dengan dua. Sisanya dua puluhan dan enam satuan, yaitu dua puluh enam.";

export const ADEGAN_AMBIL_PULUHAN: AdeganStory = {
  id: "ambil-puluhan",
  judul: "Mengambil satu puluhan",
  sumber: "Materi: susun pendek dengan mengambil",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mengambil satu puluhan"), ...SM.kerangka(), ...SM.atas(), ...SM.bawah(), ...BM.batangObj(1, 4), ...BM.kecilObj(1, 5), BM.label(45)),
      sorotkan(idx(SUARA_M1, "Batang"), ...BM.idBatang(4, 4)),
      tambah(idx(SUARA_M1, "coret."), SM.coret()[0]),
    ),
    k(SUARA_M2, hapus(idx(SUARA_M2, "tinggal"), ...BM.idBatang(4, 4), BM.idLabel), tambah(idx(SUARA_M2, "kecil"), SM.puluhBaru())),
    k(
      SUARA_M3,
      tambah(idx(SUARA_M3, "sepuluh"), ...BM.kecilObj(6, 15)),
      tambah(idx(SUARA_M3, "ditambah"), SM.coret()[1], SM.satuBaru()),
      tambah(idx(SUARA_M3, "sama"), cap(`10 + 5 = 15`)),
      tambah(idx(SUARA_M3, "belas"), BM.label(45)),
    ),
    k(
      SUARA_M4,
      ubah(idx(SUARA_M4, "dikurangi"), ...BM.idKecil(1, 9).map((id) => ({ id, op: 0.2 })), { id: BM.idLabel, isi: "36" }),
      ubah(idx(SUARA_M4, "sama"), { id: "cp", isi: `15 ${MIN} 9 = 6` }),
      tambah(idx(SUARA_M4, "enam."), SM.hasil0()),
    ),
    k(
      SUARA_M5,
      ubah(idx(SUARA_M5, "dikurangi"), { id: "pb-a-p-3", op: 0.2 }, { id: BM.idLabel, isi: "26" }),
      tambah(idx(SUARA_M5, "dua"), SM.hasil1()),
      ubah(idx(SUARA_M5, "yaitu"), { id: "cp", isi: `45 ${MIN} 19 = 26` }),
    ),
  ],
};

/* ------------------------------ 9. Aturan mengambil satu puluhan ------------------------------ */
const SUARA_R1 = "Mari kita rangkum. Jika satuan atas cukup, kita langsung mengurangkan satuan, lalu puluhan.";
const SUARA_R2 = "Jika satuan atas kurang, kita ambil satu puluhan dari puluhan atas.";
const SUARA_R3 = "Puluhan atas berkurang satu, dan satuan atas bertambah sepuluh. Ingat dua hal ini.";
const SUARA_R4 = "Setelah itu hasilnya boleh kita periksa dengan penjumlahan. Hasil yang benar akan selalu cocok.";

export const ADEGAN_ATURAN: AdeganStory = {
  id: "aturan",
  judul: "Dua keadaan satuan atas",
  sumber: "Materi: rangkuman mengambil satu puluhan",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Dua keadaan")), tambah(idx(SUARA_R1, "Jika"), ...kartu("ra", 14, 34, 272, 62, W.hijauMuda, ["satuan atas cukup", "langsung kurangkan", `25 ${MIN} 12 = 13`], 10))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Jika"), ...kartu("rb", 14, 106, 272, 62, W.merahMuda, ["satuan atas kurang", "ambil satu puluhan", `45 ${MIN} 19 = 26`], 10))),
    k(SUARA_R3, bersih(0), tambah(0, judul("Mengambil satu puluhan")), tambah(idx(SUARA_R3, "Puluhan"), ...kartu("rc", 14, 44, 272, 38, W.langit, ["puluhan atas: kurang satu"], 11)), tambah(idx(SUARA_R3, "satuan"), ...kartu("rd", 14, 96, 272, 38, W.merahMuda, ["satuan atas: tambah 10"], 11))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "periksa"), ...kartu("re", 40, 148, 220, 34, W.emas, ["periksa dengan penjumlahan"], 10.5)), tambah(idx(SUARA_R4, "cocok."), emo("ow", 150, 196, OWL, 20))),
  ],
};
