import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu, nilaiTokoh, susun, teks, tokoh } from "./k3b1D-gambar";
import { bersih, e, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k3b1D-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);
const tanya = (isi: string) => teks("tanya", 150, 140, isi, 12, W.ungu);

/* ------------------------------ 16. Memilih cara ------------------------------ */
const SUARA_L1 = "Kamu boleh memilih cara yang paling mudah. Ada susun pendek, dan ada susun panjang.";
const SUARA_L2 = "Susun pendek cepat, cocok kalau kamu sudah lancar menjumlahkan satuan dan puluhan.";
const SUARA_L3 = "Susun panjang jelas, sebab kita melihat nilai puluhan dan satuan satu per satu.";
const SUARA_L4 = "Apa pun caranya, hasilnya harus sama. Kamu boleh memeriksa dengan cara yang lain.";

export const ADEGAN_PILIH_CARA: AdeganStory = {
  id: "pilih-cara",
  judul: "Memilih cara yang mudah",
  sumber: "Materi: memilih cara",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Memilih cara yang mudah")), tambah(idx(SUARA_L1, "pendek,"), ...kartu("c-a", 14, 44, 128, 60, W.hijauMuda, ["susun pendek"], 12)), tambah(idx(SUARA_L1, "panjang."), ...kartu("c-b", 158, 44, 128, 60, W.langit, ["susun panjang"], 12))),
    k(SUARA_L2, tambah(idx(SUARA_L2, "cepat,"), teks("cepat", 78, 130, "cepat", 16, W.merah)), ubah(idx(SUARA_L2, "cepat,"), { id: "c-a-k", warna: W.krem })),
    k(SUARA_L3, tambah(idx(SUARA_L3, "jelas,"), teks("jelas", 222, 130, "jelas", 16, W.hijau)), ubah(idx(SUARA_L3, "jelas,"), { id: "c-b-k", warna: W.krem })),
    k(SUARA_L4, tambah(idx(SUARA_L4, "hasilnya"), emo("ow", 150, 190, OWL, 30)), tambah(idx(SUARA_L4, "sama."), teks("sm", 150, 160, "hasilnya sama", 13, W.ungu))),
  ],
};

/* ------------------------------ 17. Latihan 1 ------------------------------ */
const R1 = susun(34, 25);
const SUARA_M1 = `Latihan satu. Susun ${e(34)} dan ${e(25)} ke bawah, lalu jumlahkan.`;
const SUARA_M2 = "Berapa jumlahnya? Ketuk jawaban yang tepat.";
const SUARA_M3 = `Betul! Jumlahnya adalah ${e(59)}. Kita periksa langkahnya.`;
const SUARA_M4 = `Satuan: ${e(4)} ditambah ${e(5)} sama dengan ${e(9)}. Puluhan: ${e(3)} ditambah ${e(2)} sama dengan ${e(5)}.`;

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: jumlahkan dua bilangan",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 1"), ...R1.kepala()), tambah(idx(SUARA_M1, "Susun"), ...R1.atas()), tambah(idx(SUARA_M1, "bawah,"), ...R1.bawah())),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Berapa"), tanya("berapa jumlahnya?")), tambah(idx(SUARA_M2, "jawaban"), ...pilihKata(146, ["49", "59", "69"], 16))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Betul!"), "c2-k"), tambah(idx(SUARA_M3, "Jumlahnya"), cap("34 + 25 = 59"))),
    k(
      SUARA_M4,
      redamkan(0, "c2-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_M4, "Satuan:"), R1.sorS()),
      tambah(idx(SUARA_M4, "Empat"), R1.eqS()),
      tambah(idx(SUARA_M4, "sembilan."), R1.hSatuan()),
      hapus(idx(SUARA_M4, "Puluhan:"), "ls-sor"),
      tambah(idx(SUARA_M4, "Puluhan:"), R1.sorT()),
      tambah(idx(SUARA_M4, "Tiga"), R1.eqP()),
      tambah(idx(SUARA_M4, "lima", 2), R1.hPuluhan()),
    ),
  ],
};

/* ------------------------------ 18. Latihan 2 ------------------------------ */
const R2 = susun(29, 15);
const SUARA_N1 = `Latihan dua. Susun ${e(29)} dan ${e(15)} ke bawah, lalu jumlahkan.`;
const SUARA_N2 = "Berapa jumlahnya? Ketuk jawaban yang tepat.";
const SUARA_N3 = `Betul! Jumlahnya adalah ${e(44)}. Kita periksa langkahnya.`;
const SUARA_N4 = `Satuan: ${e(9)} ditambah ${e(5)} sama dengan ${e(14)}. Tulis ${e(4)}, simpan ${e(1)}.`;
const SUARA_N5 = `Puluhan: ${e(1)} ditambah ${e(2)} ditambah ${e(1)} sama dengan ${e(4)}.`;

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: menyimpan satu puluhan",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan 2"), ...R2.kepala()), tambah(idx(SUARA_N1, "Susun"), ...R2.atas()), tambah(idx(SUARA_N1, "bawah,"), ...R2.bawah())),
    k(SUARA_N2, tambah(idx(SUARA_N2, "Berapa"), tanya("berapa jumlahnya?")), tambah(idx(SUARA_N2, "jawaban"), ...pilihKata(146, ["34", "44", "54"], 16))),
    k(SUARA_N3, sorotkan(idx(SUARA_N3, "Betul!"), "c2-k"), tambah(idx(SUARA_N3, "Jumlahnya"), cap("29 + 15 = 44"))),
    k(
      SUARA_N4,
      redamkan(0, "c2-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_N4, "Satuan:"), R2.sorS()),
      tambah(idx(SUARA_N4, "Sembilan"), R2.eqS()),
      tambah(idx(SUARA_N4, "Tulis"), R2.hSatuan()),
      tambah(idx(SUARA_N4, "simpan"), R2.sim()),
    ),
    k(SUARA_N5, hapus(0, "ls-sor"), tambah(idx(SUARA_N5, "Puluhan:"), R2.sorT()), tambah(idx(SUARA_N5, "Satu"), R2.eqP()), tambah(idx(SUARA_N5, "empat."), R2.hPuluhan())),
  ],
};

/* ------------------------------ 19. Latihan 3 ------------------------------ */
const SUARA_O1 = `Latihan tiga. Upe punya ${e(28)} stiker, dan Halim punya ${e(47)} stiker.`;
const SUARA_O2 = "Berapa jumlah stiker mereka? Ketuk jawaban yang tepat.";
const SUARA_O3 = `Betul! Jumlah stiker mereka adalah ${e(75)}. Kita periksa langkahnya.`;
const SUARA_O4 = `Satuan: ${e(8)} ditambah ${e(7)} sama dengan ${e(15)}. Tulis ${e(5)}, simpan ${e(1)}.`;
const SUARA_O5 = `Puluhan: ${e(1)} ditambah ${e(2)} ditambah ${e(4)} sama dengan ${e(7)}. Jadi jumlahnya ${e(75)}.`;

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: soal cerita stiker",
  sumber: "Materi: Latihan 3",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_O1, "Upe"), ...tokoh("upe", 0)),
      tambah(idx(SUARA_O1, "dua"), nilaiTokoh("upe", 0, 28)),
      tambah(idx(SUARA_O1, "Halim"), ...tokoh("halim", 1)),
      tambah(idx(SUARA_O1, "empat"), nilaiTokoh("halim", 1, 47)),
      tambah(idx(SUARA_O1, "stiker", 2), teks("soal", 150, 82, "28 + 47 = ?", 18, W.ungu)),
    ),
    k(SUARA_O2, tambah(idx(SUARA_O2, "Berapa"), tanya("berapa jumlahnya?")), tambah(idx(SUARA_O2, "jawaban"), ...pilihKata(146, ["65", "75", "85"], 16))),
    k(SUARA_O3, sorotkan(idx(SUARA_O3, "Betul!"), "c2-k"), ubah(idx(SUARA_O3, "adalah"), { id: "soal", isi: "28 + 47 = 75" }), tambah(idx(SUARA_O3, "adalah"), cap("28 + 47 = 75"))),
    k(SUARA_O4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_O4, "Satuan:"), teks("ls-x1", 150, 150, "8 + 7 = 15", 15, W.hijau))),
    k(SUARA_O5, tambah(idx(SUARA_O5, "Puluhan:"), teks("ls-x2", 150, 176, "1 + 2 + 4 = 7", 15, W.hijau))),
  ],
};

/* ------------------------------ 20. Penutup ------------------------------ */
const SUARA_Q1 = "Mari kita ingat lagi. Pada susun pendek, bilangan disusun ke bawah, lalu kita jumlahkan satuan dahulu.";
const SUARA_Q2 = "Kalau satuan berjumlah sepuluh atau lebih, tukar sepuluh satuan dengan satu puluhan, lalu simpan.";
const SUARA_Q3 = "Pada susun panjang, bilangan diurai menjadi puluhan dan satuan, lalu hasilnya dijumlahkan.";
const SUARA_Q4 = "Tiga bilangan dijumlahkan dua bilangan dahulu. Soal cerita dijawab lengkap dengan satuannya.";
const SUARA_Q5 = "Hebat! Kamu sudah bisa menjumlahkan bilangan sampai seratus. Sampai jumpa di video berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Q1, "susun"), ...kartu("q1", 14, 34, 272, 34, W.hijauMuda, ["susun pendek: satuan dahulu"], 10))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "tukar"), ...kartu("q2", 14, 76, 272, 34, W.krem, ["10 satuan jadi 1 puluhan, simpan"], 10))),
    k(SUARA_Q3, tambah(idx(SUARA_Q3, "susun"), ...kartu("q3", 14, 118, 272, 34, W.langit, ["susun panjang: uraikan, lalu jumlahkan"], 10))),
    k(SUARA_Q4, tambah(idx(SUARA_Q4, "Tiga"), ...kartu("q4", 14, 160, 272, 34, W.pink, ["tiga bilangan: dua dahulu"], 10))),
    k(SUARA_Q5, bersih(0), tambah(0, judul("Hebat!"), emo("pw", 150, 100, OWL, 56)), tambah(idx(SUARA_Q5, "seratus."), emo("pk", 150, 160, "✅", 30))),
  ],
};

