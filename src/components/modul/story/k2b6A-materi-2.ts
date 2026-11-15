import type { AdeganStory } from "./logika-story";
import { W, anak, barisUrutan, bulat, deret, emo, idBenda, idPenunjuk, isiSisi, judul, kartu, kerangka, labelSisi, panah, penunjuk, spek, tandaUrutan, teks, ubahTimbang } from "./k2b6A-gambar";
import { bersih, hapus, idKartu, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b6A-bantu";

/* ------------------------------ 7. Tebak dengan rasa lalu buktikan ------------------------------ */
const Z0 = spek(1, "gantung", [], []);
const Za = spek(1, "gantung", ["mangga"], []);
const Zb = spek(1, "gantung", ["mangga"], ["pisang"]);
const SUARA_T1 = "Kita juga bisa menebak dulu. Bayangkan Wei melihat mangga dan pisang. Mana yang terasa lebih berat?";
const SUARA_T2 = "Ketuk jawabanmu. Ini baru tebakan, jadi kita masih perlu membuktikannya.";
const SUARA_T3 = "Betul! Mangga terasa lebih berat daripada pisang. Sekarang kita buktikan dengan gantungan baju.";
const SUARA_T4 = "Mangga digantung di kiri dan pisang di kanan. Ujung mangga turun.";
const SUARA_T5 = "Tebakan kita benar. Mangga lebih berat dari pisang. Menebak dulu lalu membuktikan itu cara yang baik.";
const BUAH_T = deret(["mangga", "pisang"], 96, 1.3, [120, 200]);

export const ADEGAN_TEBAK: AdeganStory = {
  id: "tebak-rasa",
  judul: "Tebak dulu, lalu buktikan",
  sumber: "Materi: tebak dulu, lalu buktikan",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Tebak dulu")), tambah(idx(SUARA_T1, "Wei"), ...anak("wei", 44, 50)), tambah(idx(SUARA_T1, "mangga"), BUAH_T[0], BUAH_T[1]), tambah(idx(SUARA_T1, "pisang."), BUAH_T[2], BUAH_T[3])),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Ketuk"), teks("tanya", 150, 148, "mana yang terasa lebih berat?", 11, W.ungu)), tambah(idx(SUARA_T2, "jawabanmu."), ...pilihKata(158, ["mangga", "pisang", "sama berat"], 11))),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "Betul!"), "c1-k"), sorotkan(idx(SUARA_T3, "Mangga"), "bd-1-mangga")),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Tebak dan buktikan"), kerangka(Z0)),
      tambah(idx(SUARA_T4, "digantung"), ...isiSisi(Za, "L"), labelSisi(Za, "L")),
      ubah(idx(SUARA_T4, "digantung"), ...ubahTimbang(Za, { L: true })),
      tambah(idx(SUARA_T4, "pisang"), ...isiSisi(Zb, "R"), labelSisi(Zb, "R")),
      ubah(idx(SUARA_T4, "pisang"), ...ubahTimbang(Zb, { L: true, R: true })),
      tambah(idx(SUARA_T4, "turun."), ...penunjuk(Zb)),
    ),
    k(SUARA_T5, sorotkan(idx(SUARA_T5, "Mangga"), idBenda(1, "L", "mangga", 1)), tambah(idx(SUARA_T5, "cara"), ...kartu("tc", 30, 150, 240, 30, W.emas, ["tebak, lalu buktikan"], 11))),
  ],
};

/* ------------------------------ 8. Paling berat dan paling ringan ------------------------------ */
const BUAH_P = ["semangka", "apel", "anggur"];
const P0 = spek(1, "gantung", [], []);
const Pa = spek(1, "gantung", ["semangka"], []);
const PA = spek(1, "gantung", ["semangka"], ["apel"]);
const Pb = spek(1, "gantung", ["apel"], []);
const PB = spek(1, "gantung", ["apel"], ["anggur"]);
const SUARA_P1 = "Sekarang ada tiga buah, yaitu semangka, apel, dan anggur. Kita ingin tahu mana yang paling berat dan mana yang paling ringan.";
const SUARA_P2 = "Pertama, kita bandingkan semangka dengan apel. Semangka di kiri dan apel di kanan.";
const SUARA_P3 = "Ujung semangka turun, jadi semangka lebih berat dari apel.";
const SUARA_P4 = "Kedua, kita bandingkan apel dengan anggur. Apel di kiri dan anggur di kanan.";
const SUARA_P5 = "Ujung apel turun, jadi apel lebih berat dari anggur.";
const SUARA_P6 = "Jadi semangka lebih berat dari apel, dan apel lebih berat dari anggur. Karena itu semangka paling berat.";
const SUARA_P7 = "Lalu anggur paling ringan, sebab anggur lebih ringan dari apel dan semangka.";
const SUARA_P8 = "Jadi urutan dari paling berat adalah semangka, apel, lalu anggur.";
const BUAH_PD = deret(BUAH_P, 96, 1.2);
const WARNA_URUT = [W.hijauMuda, W.langit, W.pink];

export const ADEGAN_PALING: AdeganStory = {
  id: "paling-berat",
  judul: "Paling berat dan paling ringan",
  sumber: "Materi: paling berat dan paling ringan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tiga buah")),
      tambah(idx(SUARA_P1, "semangka,"), BUAH_PD[0], BUAH_PD[1]),
      tambah(idx(SUARA_P1, "apel,"), BUAH_PD[2], BUAH_PD[3]),
      tambah(idx(SUARA_P1, "anggur."), BUAH_PD[4], BUAH_PD[5]),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Semangka dan apel"), kerangka(P0)),
      tambah(idx(SUARA_P2, "Semangka"), ...isiSisi(Pa, "L"), labelSisi(Pa, "L")),
      ubah(idx(SUARA_P2, "Semangka"), ...ubahTimbang(Pa, { L: true })),
      tambah(idx(SUARA_P2, "apel", 2), ...isiSisi(PA, "R"), labelSisi(PA, "R")),
      ubah(idx(SUARA_P2, "apel", 2), ...ubahTimbang(PA, { L: true, R: true })),
    ),
    k(SUARA_P3, tambah(idx(SUARA_P3, "turun,"), ...penunjuk(PA)), tambah(idx(SUARA_P3, "lebih"), ...kartu("p1", 40, 150, 220, 30, W.hijauMuda, ["semangka lebih berat"], 11))),
    k(
      SUARA_P4,
      hapus(0, idBenda(1, "L", "semangka", 1), idBenda(1, "R", "apel", 1), "tm1-lbL", "tm1-lbR", ...idPenunjuk(PA), ...idKartu("p1")),
      ubah(0, ...ubahTimbang(P0)),
      ubah(0, { id: "jud", isi: "Apel dan anggur" }),
      tambah(idx(SUARA_P4, "Apel", 2), ...isiSisi(Pb, "L"), labelSisi(Pb, "L")),
      ubah(idx(SUARA_P4, "Apel", 2), ...ubahTimbang(Pb, { L: true })),
      tambah(idx(SUARA_P4, "anggur", 2), ...isiSisi(PB, "R"), labelSisi(PB, "R")),
      ubah(idx(SUARA_P4, "anggur", 2), ...ubahTimbang(PB, { L: true, R: true })),
    ),
    k(SUARA_P5, tambah(idx(SUARA_P5, "turun,"), ...penunjuk(PB)), tambah(idx(SUARA_P5, "lebih"), ...kartu("p2", 40, 150, 220, 30, W.langit, ["apel lebih berat"], 11))),
    k(
      SUARA_P6,
      bersih(0),
      tambah(0, judul("Urutan berat")),
      tambah(idx(SUARA_P6, "semangka"), ...barisUrutan(1, "semangka", WARNA_URUT[0])),
      tambah(idx(SUARA_P6, "apel"), ...barisUrutan(2, "apel", WARNA_URUT[1])),
      tambah(idx(SUARA_P6, "anggur."), ...barisUrutan(3, "anggur", WARNA_URUT[2])),
      tambah(idx(SUARA_P6, "paling"), tandaUrutan("berat", 1)),
    ),
    k(SUARA_P7, tambah(idx(SUARA_P7, "paling"), tandaUrutan("ringan", 3)), sorotkan(idx(SUARA_P7, "anggur"), "ur-3-anggur-k")),
    k(SUARA_P8, redamkan(0, "ur-3-anggur-k"), tambah(idx(SUARA_P8, "semangka,"), emo("tr", 286, 62, "\u{1F3C6}", 20)), tambah(idx(SUARA_P8, "anggur."), panah("ur-pn", 286, 84, 0, 66, W.merah))),
  ],
};

/* ------------------------------ 9. Besar belum tentu berat ------------------------------ */
const B_BD = deret(["balon", "batu"], 92, 1, [90, 210]);
const BB0 = spek(1, "timbangan", [], []);
const BBa = spek(1, "timbangan", ["balon"], []);
const BB = spek(1, "timbangan", ["balon"], ["batu"]);
const SUARA_B1 = "Igil menunjukkan balon yang besar dan batu yang kecil. Apakah benda yang besar selalu berat?";
const SUARA_B2 = "Balon lebih besar dari batu. Batu lebih kecil dari balon.";
const SUARA_B3 = "Sekarang kita timbang keduanya. Balon di piringan kiri dan batu di piringan kanan.";
const SUARA_B4 = "Lihat, ujung batu turun. Batu lebih berat dari balon, walaupun batu lebih kecil.";
const SUARA_B5 = "Balon besar tetapi ringan, karena di dalamnya hanya ada udara.";
const SUARA_B6 = "Jadi besar belum tentu berat. Kita tidak boleh menebak berat hanya dari besar benda.";

export const ADEGAN_BESAR: AdeganStory = {
  id: "besar-berat",
  judul: "Besar belum tentu berat",
  sumber: "Materi: besar belum tentu berat",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Besar atau berat?")), tambah(idx(SUARA_B1, "balon"), B_BD[0], B_BD[1]), tambah(idx(SUARA_B1, "batu"), B_BD[2], B_BD[3])),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Balon"), teks("uk1", 90, 124, "besar", 11, W.merah)), tambah(idx(SUARA_B2, "Batu"), teks("uk2", 210, 124, "kecil", 11, W.merah))),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Kita timbang"), kerangka(BB0)),
      tambah(idx(SUARA_B3, "Balon"), ...isiSisi(BBa, "L"), labelSisi(BBa, "L")),
      ubah(idx(SUARA_B3, "Balon"), ...ubahTimbang(BBa, { L: true })),
      tambah(idx(SUARA_B3, "batu"), ...isiSisi(BB, "R"), labelSisi(BB, "R")),
      ubah(idx(SUARA_B3, "batu"), ...ubahTimbang(BB, { L: true, R: true })),
    ),
    k(SUARA_B4, tambah(idx(SUARA_B4, "turun."), ...penunjuk(BB)), tambah(idx(SUARA_B4, "walaupun"), ...kartu("kd", 30, 164, 240, 26, W.emas, ["kecil tetapi berat"], 11))),
    k(SUARA_B5, sorotkan(idx(SUARA_B5, "besar"), idBenda(1, "L", "balon", 1)), tambah(idx(SUARA_B5, "udara."), emo("ud", 150, 56, "\u{1F4A8}", 24))),
    k(SUARA_B6, hapus(idx(SUARA_B6, "Jadi"), ...idKartu("kd")), tambah(idx(SUARA_B6, "menebak"), ...kartu("ke", 30, 164, 240, 26, W.pink, ["besar belum tentu berat"], 11))),
  ],
};

/* ------------------------------ 10. Satuan tidak baku ------------------------------ */
const SATUAN = ["balok_mainan", "kelereng", "bola_tenis"];
const S_BD = deret(SATUAN, 96, 1.8);
const SUARA_S1 = "Kita juga bisa mengukur berat. Caranya memakai benda kecil yang sama, yang disebut satuan tidak baku.";
const SUARA_S2 = "Contohnya balok mainan, kelereng, dan bola tenis. Tiap satuan memakai benda yang bentuknya sama.";
const SUARA_S3 = "Satuan ini disebut tidak baku. Bola tenis lebih berat dari kelereng, dan kelereng lebih ringan dari balok mainan.";
const SUARA_S4 = "Satuan yang berat memerlukan hitungan yang sedikit. Satuan yang ringan memerlukan hitungan yang banyak.";
const SUARA_S5 = "Sekarang kita akan mengukur boneka. Pertama dengan bola tenis, lalu dengan kelereng.";

export const ADEGAN_SATUAN: AdeganStory = {
  id: "satuan",
  judul: "Satuan tidak baku",
  sumber: "Materi: satuan tidak baku",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Satuan tidak baku")), tambah(idx(SUARA_S1, "mengukur"), ...kartu("s1", 20, 60, 260, 50, W.emas, ["mengukur berat dengan", "satuan tidak baku"], 12))),
    k(
      SUARA_S2,
      hapus(0, ...idKartu("s1", 2)),
      tambah(idx(SUARA_S2, "mainan,"), S_BD[0], S_BD[1]),
      tambah(idx(SUARA_S2, "kelereng,"), S_BD[2], S_BD[3]),
      tambah(idx(SUARA_S2, "tenis."), S_BD[4], S_BD[5]),
    ),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Bola"), "bd-3-bola_tenis"), sorotkan(idx(SUARA_S3, "kelereng,"), "bd-2-kelereng"), sorotkan(idx(SUARA_S3, "balok"), "bd-1-balok_mainan")),
    k(
      SUARA_S4,
      redamkan(0, "bd-1-balok_mainan", "bd-2-kelereng", "bd-3-bola_tenis"),
      tambah(idx(SUARA_S4, "Satuan"), ...kartu("a1", 14, 124, 272, 30, W.hijauMuda, ["satuan berat, hitungan sedikit"], 10)),
      tambah(idx(SUARA_S4, "Satuan", 2), ...kartu("a2", 14, 160, 272, 30, W.pink, ["satuan ringan, hitungan banyak"], 10)),
    ),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Mengukur boneka")),
      tambah(idx(SUARA_S5, "boneka."), emo("bn", 150, 96, "\u{1F9F8}", 56)),
      tambah(idx(SUARA_S5, "Pertama"), emo("bt", 100, 160, "\u{1F3BE}", 26)),
      tambah(idx(SUARA_S5, "kelereng."), bulat("kl", 200, 152, 7, "#60A5FA", W.biru, { tebal: 1.4 })),
    ),
  ],
};
