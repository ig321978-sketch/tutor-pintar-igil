import type { AdeganStory } from "./logika-story";
import { OWL, W, bagan, batangP, emo, idBatang, idKotakSel, idSel, judul, kartu, kotakPenerima, kubusP, labelN, rumus, sel, slotKubus, tabelKurang, teks } from "./k2b2B-gambar";
import { hapus, ids, idx, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b2B-bantu";

/* ------------------------------ 8. Cara ketiga: pasangan bilangan ------------------------------ */
const SUARA_H1 = "Cara ketiga memakai pasangan bilangan. Mari kita cari sembilan belas dikurangi lima belas.";
const SUARA_H2 = "Sembilan belas dipecah menjadi sepuluh dan sembilan.";
const SUARA_H3 = "Lima belas dipecah menjadi sepuluh dan lima.";
const SUARA_H4 = "Kurangi puluhan dengan puluhan. Sepuluh dikurangi sepuluh sama dengan nol.";
const SUARA_H5 = "Kurangi satuan dengan satuan. Sembilan dikurangi lima sama dengan empat.";
const SUARA_H6 = "Gabungkan hasilnya. Nol ditambah empat sama dengan empat.";
const SUARA_H7 = "Jadi sembilan belas dikurangi lima belas sama dengan empat.";

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan-bilangan",
  judul: "Cara ketiga: pasangan bilangan",
  sumber: "Materi: cara ketiga, pasangan bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Cara 3: pasangan bilangan")), tambah(idx(SUARA_H1, "cari"), rumus("19 − 15 = ?", 196, 15))),
    k(SUARA_H2, tambah(idx(SUARA_H2, "dipecah"), ...bagan("a", 80, 30, "19", "10", "9")), sorotkan(idx(SUARA_H2, "sepuluh"), "aa-k"), redamkan(idx(SUARA_H2, "dan"), "aa-k"), sorotkan(idx(SUARA_H2, "sembilan", 2), "ab-k")),
    k(SUARA_H3, redamkan(0, "ab-k"), tambah(idx(SUARA_H3, "dipecah"), ...bagan("b", 220, 30, "15", "10", "5")), sorotkan(idx(SUARA_H3, "sepuluh"), "ba-k"), redamkan(idx(SUARA_H3, "dan"), "ba-k"), sorotkan(idx(SUARA_H3, "lima", 2), "bb-k")),
    k(SUARA_H4, redamkan(0, "bb-k"), sorotkan(idx(SUARA_H4, "puluhan"), "aa-k", "ba-k"), tambah(idx(SUARA_H4, "Sepuluh"), teks("m1", 150, 138, "10 − 10 = 0", 12, W.merah))),
    k(SUARA_H5, redamkan(0, "aa-k", "ba-k"), sorotkan(idx(SUARA_H5, "satuan"), "ab-k", "bb-k"), tambah(idx(SUARA_H5, "Sembilan"), teks("m2", 150, 154, "9 − 5 = 4", 12, W.merah))),
    k(SUARA_H6, redamkan(0, "ab-k", "bb-k"), tambah(idx(SUARA_H6, "Nol"), teks("m3", 150, 170, "0 + 4 = 4", 12, W.merah))),
    k(SUARA_H7, ubah(idx(SUARA_H7, "sama"), { id: "rm", isi: "19 − 15 = 4" }), tambah(idx(SUARA_H7, "empat."), emo("ok", 262, 196, "✅", 22))),
  ],
};

/* ------------------------------ 9. Satuan tidak cukup ------------------------------ */
const SUARA_I1 = "Sekarang Malosi punya dua belas kubus. Ia ingin memberi delapan kubus kepada Upe.";
const SUARA_I2 = "Dua belas adalah satu puluhan dan dua satuan. Satuannya hanya dua.";
const SUARA_I3 = "Kita ingin memberi delapan satuan. Tetapi dua dikurangi delapan tidak cukup!";
const SUARA_I4 = "Satuan tidak cukup. Jadi kita perlu mengurai satu puluhan.";

export const ADEGAN_TIDAK_CUKUP: AdeganStory = {
  id: "tidak-cukup",
  judul: "Dua belas kurang delapan: satuan tidak cukup",
  sumber: "Materi: satuan tidak cukup",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Satuan tidak cukup"), ...batangP("a", 0), ...kubusP("a", 0, 1), labelN("a", 236, 54, "12", 22), rumus("12 − 8 = ?", 192, 15)), tambah(idx(SUARA_I1, "kepada"), ...kotakPenerima("Upe"))),
    k(SUARA_I2, sorotkan(idx(SUARA_I2, "puluhan"), ...idBatang("a", 0)), redamkan(idx(SUARA_I2, "dan"), ...idBatang("a", 0)), sorotkan(idx(SUARA_I2, "Satuannya"), "bsa0", "bsa1")),
    k(SUARA_I3, redamkan(0, "bsa0", "bsa1"), tambah(idx(SUARA_I3, "Tetapi"), ...kartu("tc", 60, 152, 180, 22, W.merahMuda, ["2 kurang dari 8"], 10)), tambah(idx(SUARA_I3, "cukup!"), emo("q", 264, 168, "\u{1F615}", 24))),
    k(SUARA_I4, tambah(idx(SUARA_I4, "mengurai"), ...kartu("ur", 160, 70, 130, 26, W.emas, ["urai 1 puluhan"], 10))),
  ],
};

/* ------------------------------ 10. Mengurai dengan kubus dan batang ------------------------------ */
const SUARA_J1 = "Mari kita mengurai. Satu batang puluhan dibuka menjadi sepuluh kubus satuan.";
const SUARA_J2 = "Sekarang ada dua ditambah sepuluh, yaitu dua belas satuan.";
const SUARA_J3 = "Beri delapan kubus kepada Upe sambil menghitung: satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_J4 = "Sisanya empat kubus. Dua belas dikurangi delapan sama dengan empat.";
const SUARA_J5 = "Jadi satu puluhan dibuka, dan hasilnya empat satuan.";
const POS_J3 = urutBilangan(SUARA_J3, 1, 8, "menghitung:");

export const ADEGAN_URAI_PAPAN: AdeganStory = {
  id: "urai-papan",
  judul: "Mengurai satu puluhan menjadi sepuluh satuan",
  sumber: "Materi: mengurai satu puluhan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Mengurai satu puluhan"), ...batangP("a", 0), ...kubusP("a", 0, 1), ...kotakPenerima("Upe"), labelN("a", 236, 54, "12", 22), rumus("12 − 8 = ?", 192, 15)),
      sorotkan(idx(SUARA_J1, "batang"), ...idBatang("a", 0)),
      hapus(idx(SUARA_J1, "dibuka"), ...idBatang("a", 0)),
      tambah(idx(SUARA_J1, "dibuka"), ...kubusP("a", 2, 11), ...kartu("bk", 160, 70, 130, 22, W.krem, ["1 puluhan jadi 10 satuan"], 9)),
    ),
    k(SUARA_J2, sorotkan(idx(SUARA_J2, "dua"), "bsa0", "bsa1"), redamkan(idx(SUARA_J2, "ditambah"), "bsa0", "bsa1"), sorotkan(idx(SUARA_J2, "sepuluh"), ...ids("bsa", 2, 11)), tambah(idx(SUARA_J2, "yaitu"), teks("m1", 150, 168, "2 + 10 = 12", 12, W.merah))),
    k(SUARA_J3, redamkan(0, ...ids("bsa", 2, 11)), ...Array.from({ length: 8 }, (_, q) => ubah(POS_J3[q], { id: `bsa${4 + q}`, x: slotKubus(q, false).x, y: slotKubus(q, false).y }))),
    k(SUARA_J4, sorotkan(idx(SUARA_J4, "empat"), ...ids("bsa", 0, 3)), ubah(idx(SUARA_J4, "Sisanya"), { id: "n-a", isi: "4" }), ubah(idx(SUARA_J4, "sama"), { id: "rm", isi: "12 − 8 = 4" })),
    k(SUARA_J5, redamkan(0, ...ids("bsa", 0, 3)), tambah(idx(SUARA_J5, "hasilnya"), emo("ok", 262, 168, "✅", 22))),
  ],
};

/* ------------------------------ 11. Mengurai di tabel nilai tempat ------------------------------ */
const SUARA_K1 = "Kita catat di tabel nilai tempat. Dua belas adalah satu puluhan dan dua satuan. Delapan adalah nol puluhan dan delapan satuan.";
const SUARA_K2 = "Dua dikurangi delapan tidak cukup. Jadi satu puluhan diurai menjadi sepuluh satuan.";
const SUARA_K3 = "Sekarang satuannya dua belas. Dua belas dikurangi delapan sama dengan empat.";
const SUARA_K4 = "Puluhannya nol dikurangi nol, jadi nol.";
const SUARA_K5 = "Hasilnya nol puluhan dan empat satuan. Jadi dua belas dikurangi delapan sama dengan empat.";

export const ADEGAN_URAI_TABEL: AdeganStory = {
  id: "urai-tabel",
  judul: "Mengurai di tabel nilai tempat",
  sumber: "Materi: mengurai di tabel",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Tabel dan urai"), ...tabelKurang()), tambah(idx(SUARA_K1, "Dua"), sel(0, 0, "12"), sel(0, 1, "1"), sel(0, 2, "2")), tambah(idx(SUARA_K1, "Delapan"), sel(1, 0, "− 8"), sel(1, 1, "0"), sel(1, 2, "8"))),
    k(
      SUARA_K2,
      sorotkan(idx(SUARA_K2, "tidak"), idKotakSel(0, 2)),
      ubah(idx(SUARA_K2, "diurai"), { id: idSel(0, 1), isi: "0" }, { id: idSel(0, 2), isi: "12" }),
      tambah(idx(SUARA_K2, "sepuluh"), teks("ur", 150, 154, "urai: 1 puluhan jadi 10 satuan", 9.6, W.merah)),
    ),
    k(SUARA_K3, tambah(idx(SUARA_K3, "Dua", 2), teks("m1", 150, 168, "12 − 8 = 4", 12, W.merah)), tambah(idx(SUARA_K3, "empat."), sel(2, 0, "hasil"), sel(2, 2, "4"))),
    k(SUARA_K4, redamkan(0, idKotakSel(0, 2)), sorotkan(idx(SUARA_K4, "Puluhannya"), idKotakSel(0, 1), idKotakSel(1, 1)), tambah(idx(SUARA_K4, "jadi"), teks("m2", 150, 182, "0 − 0 = 0", 12, W.merah)), tambah(idx(SUARA_K4, "nol", 3), sel(2, 1, "0"))),
    k(SUARA_K5, redamkan(0, idKotakSel(0, 1), idKotakSel(1, 1)), tambah(idx(SUARA_K5, "Jadi"), rumus("12 − 8 = 4", 198, 13))),
  ],
};

/* ------------------------------ 12. Kapan perlu mengurai ------------------------------ */
const SUARA_L1 = "Kapan kita perlu mengurai? Lihat satuan di atas dan satuan di bawah.";
const SUARA_L2 = "Pada delapan belas dikurangi dua belas, satuannya delapan dan dua. Delapan lebih dari dua.";
const SUARA_L3 = "Pada dua belas dikurangi delapan, satuannya dua dan delapan. Dua kurang dari delapan.";
const SUARA_L4 = "Pada dua puluh dikurangi enam, satuannya nol dan enam. Nol kurang dari enam, jadi urai dulu. Hasilnya empat belas.";
const SUARA_L5 = "Jadi kalau satuan atas lebih kecil dari satuan bawah, urai dulu. Kalau tidak, langsung kurangi.";
const kartuKasus = (id: string, x: number, warna: string, baris: string[]) => kartu(id, x, 76, 94, 86, warna, baris, 8.6);

export const ADEGAN_KAPAN_URAI: AdeganStory = {
  id: "kapan-urai",
  judul: "Kapan perlu mengurai satu puluhan",
  sumber: "Materi: kapan perlu mengurai",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Kapan perlu mengurai?")), tambah(idx(SUARA_L1, "Lihat"), ...kartu("kb", 30, 36, 240, 30, W.emas, ["bandingkan satuan atas", "dengan satuan bawah"], 9.6))),
    k(SUARA_L2, tambah(idx(SUARA_L2, "Pada"), ...kartuKasus("kc0", 6, W.hijauMuda, ["18 − 12", "8 lebih dari 2", "langsung kurangi", "hasil: 6"]))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "Pada"), ...kartuKasus("kc1", 103, W.pink, ["12 − 8", "2 kurang dari 8", "urai dulu", "hasil: 4"]))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "Pada"), ...kartuKasus("kc2", 200, W.langit, ["20 − 6", "0 kurang dari 6", "urai dulu", "hasil: 14"]))),
    k(SUARA_L5, sorotkan(idx(SUARA_L5, "lebih"), "kc1-k", "kc2-k"), tambah(idx(SUARA_L5, "Kalau", 2), ...kartu("ar", 20, 174, 260, 24, W.krem, ["atas kurang dari bawah: urai"], 9.6)), tambah(idx(SUARA_L5, "langsung"), emo("ow", 262, 50, OWL, 22))),
  ],
};
