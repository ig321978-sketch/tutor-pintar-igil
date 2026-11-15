import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bagan, batangP, emo, garis, idBatang, jalurBilangan, jambuBaris, judul, kartu, kartuAngka, kotakPenerima, kubusP, labelN, lompat, rumus, slotKubus, tandaAkhir, tandaAwal, teks } from "./k2b2B-gambar";
import { bersih, hapus, hapusKartu, ids, idx, k, pilihDua, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b2B-bantu";

/* ------------------------------ 13. Memeriksa dengan penjumlahan ------------------------------ */
const SUARA_M1 = "Kita bisa memeriksa hasil pengurangan dengan penjumlahan. Tadi dua belas dikurangi delapan sama dengan empat.";
const SUARA_M2 = "Tambahkan hasilnya dengan bilangan yang dikurangkan. Empat ditambah delapan sama dengan dua belas.";
const SUARA_M3 = "Hasilnya sama dengan bilangan awal, yaitu dua belas. Jadi jawaban kita benar.";
const SUARA_M4 = "Sekarang Upe menjawab lima. Kita periksa: lima ditambah delapan sama dengan tiga belas.";
const SUARA_M5 = "Tiga belas bukan dua belas. Jadi jawaban Upe belum benar, hitung ulang pelan-pelan.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa-jumlah",
  judul: "Memeriksa hasil dengan penjumlahan",
  sumber: "Materi: memeriksa dengan penjumlahan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Periksa dengan menjumlah")), tambah(idx(SUARA_M1, "Tadi"), rumus("12 − 8 = 4", 52, 17))),
    k(
      SUARA_M2,
      tambah(idx(SUARA_M2, "Empat"), ...jambuBaris("p", 0, 3, 84, W.jambuK)),
      tambah(idx(SUARA_M2, "delapan"), ...jambuBaris("q", 4, 11, 84, W.jambuM)),
      tambah(idx(SUARA_M2, "sama"), teks("m1", 150, 114, "4 + 8 = 12", 14, W.merah)),
    ),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Hasilnya"), ...ids("jp", 0, 3), ...ids("jq", 4, 11)), tambah(idx(SUARA_M3, "Jadi"), ...kartu("cc", 40, 128, 220, 22, W.hijauMuda, ["cocok dengan bilangan awal 12"], 9.6), emo("ok", 270, 70, "✅", 22))),
    k(SUARA_M4, redamkan(0, ...ids("jp", 0, 3), ...ids("jq", 4, 11)), tambah(idx(SUARA_M4, "ditambah"), teks("m2", 150, 170, "5 + 8 = 13", 14, W.merah))),
    k(SUARA_M5, tambah(idx(SUARA_M5, "belum"), ...kartu("sal", 30, 178, 240, 22, W.merahMuda, ["13 bukan 12: hitung ulang"], 9.6), emo("sl", 262, 158, "❌", 20))),
  ],
};

/* ------------------------------ 14. Keluarga bilangan ------------------------------ */
const SUARA_N1 = "Tiga bilangan enam, dua belas, dan delapan belas berkeluarga.";
const SUARA_N2 = "Enam ditambah dua belas sama dengan delapan belas. Dua belas ditambah enam sama dengan delapan belas juga.";
const SUARA_N3 = "Delapan belas dikurangi enam sama dengan dua belas. Delapan belas dikurangi dua belas sama dengan enam.";
const SUARA_N4 = "Empat kalimat, satu keluarga. Penjumlahan membantu kita memeriksa pengurangan.";

export const ADEGAN_KELUARGA: AdeganStory = {
  id: "keluarga-bilangan",
  judul: "Keluarga bilangan enam, dua belas, delapan belas",
  sumber: "Materi: keluarga bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Keluarga bilangan")),
      tambah(idx(SUARA_N1, "enam,"), ...kartuAngka("fa", 14, 96, "6", W.langit, 40, 30, 18)),
      tambah(idx(SUARA_N1, "dua"), ...kartuAngka("fb", 106, 96, "12", W.pink, 40, 30, 18)),
      tambah(idx(SUARA_N1, "delapan"), ...kartuAngka("fu", 60, 36, "18", W.krem, 40, 30, 18), garis("f-ga", 80, 66, -46, 30, W.biru, 1.6), garis("f-gb", 80, 66, 46, 30, W.biru, 1.6)),
    ),
    k(SUARA_N2, tambah(idx(SUARA_N2, "sama"), teks("f1", 225, 62, "6 + 12 = 18", 10.5, W.merah)), tambah(idx(SUARA_N2, "juga") - 0, teks("f2", 225, 82, "12 + 6 = 18", 10.5, W.merah))),
    k(SUARA_N3, tambah(idx(SUARA_N3, "sama"), teks("f3", 225, 102, "18 − 6 = 12", 10.5, W.merah)), tambah(idx(SUARA_N3, "sama", 2), teks("f4", 225, 122, "18 − 12 = 6", 10.5, W.merah))),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "Empat"), "f1", "f2", "f3", "f4"), tambah(idx(SUARA_N4, "Penjumlahan"), emo("ow", 80, 172, OWL, 30), ...kartu("fk", 130, 150, 160, 40, W.hijauMuda, ["tambah membantu", "memeriksa kurang"], 9.4))),
  ],
};

/* ------------------------------ 15. Latihan 1: jalur bilangan ------------------------------ */
const SUARA_P1 = "Latihan satu. Upe mulai dari enam belas dan mundur empat langkah.";
const SUARA_P2 = "Berapa hasilnya? Hitung lompatannya, lalu ketuk jawaban yang benar.";
const SUARA_P3 = "Betul! Mundur empat langkah berhenti di dua belas. Enam belas dikurangi empat sama dengan dua belas.";
const SUARA_P4 = "Hebat! Kita periksa dengan penjumlahan. Dua belas ditambah empat sama dengan enam belas.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan satu: mundur di jalur bilangan",
  sumber: "Materi: latihan jalur bilangan",
  latar: "#FEF9C3",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Latihan satu"), ...jalurBilangan(), rumus("16 − 4 = ?", 184)), tambah(idx(SUARA_P1, "enam"), tandaAwal(16))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Hitung"), ...pilihKata(118, ["11", "12", "13"]))),
    k(
      SUARA_P3,
      sorotkan(idx(SUARA_P3, "Betul!"), "c2-k"),
      ...[0, 1, 2, 3].map((q) => tambah(idx(SUARA_P3, "Mundur"), lompat(q, 16 - q, 15 - q))),
      tambah(idx(SUARA_P3, "berhenti"), tandaAkhir(12)),
      ubah(idx(SUARA_P3, "sama"), { id: "rm", isi: "16 − 4 = 12" }),
    ),
    k(SUARA_P4, redamkan(0, "c2-k"), tambah(idx(SUARA_P4, "Dua"), teks("m1", 150, 164, "12 + 4 = 16", 12, W.merah)), tambah(idx(SUARA_P4, "Hebat!"), emo("ok", 262, 184, "✅", 22))),
  ],
};

/* ------------------------------ 16. Latihan 2: mengurai ------------------------------ */
const SUARA_Q1 = "Latihan dua. Halim punya empat belas kubus dan ingin memberi sembilan kubus kepada Upe.";
const SUARA_Q2 = "Satuannya hanya empat, kurang dari sembilan. Apa yang harus Halim lakukan? Ketuk jawabannya.";
const SUARA_Q3 = "Betul, urai satu puluhan! Batangnya dibuka menjadi sepuluh kubus, jadi ada empat belas kubus lepas.";
const SUARA_Q4 = "Sekarang beri sembilan kubus kepada Upe. Sisanya lima kubus.";
const SUARA_Q5 = "Empat belas dikurangi sembilan sama dengan lima. Hebat!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan dua: mengurai satu puluhan",
  sumber: "Materi: latihan mengurai",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Latihan dua"), ...batangP("a", 0), ...kubusP("a", 0, 3), labelN("a", 236, 54, "14", 22), rumus("14 − 9 = ?", 192, 15)), tambah(idx(SUARA_Q1, "kepada"), ...kotakPenerima("Upe"))),
    k(SUARA_Q2, sorotkan(idx(SUARA_Q2, "Satuannya"), "bsa0", "bsa1", "bsa2", "bsa3"), redamkan(idx(SUARA_Q2, "Apa"), "bsa0", "bsa1", "bsa2", "bsa3"), tambah(idx(SUARA_Q2, "Ketuk"), ...pilihDua(150, ["Langsung kurangi", "Urai satu puluhan"]))),
    k(
      SUARA_Q3,
      sorotkan(idx(SUARA_Q3, "Betul,"), "c2-k"),
      hapusKartu(idx(SUARA_Q3, "Batangnya"), 2),
      hapus(idx(SUARA_Q3, "dibuka"), ...idBatang("a", 0)),
      tambah(idx(SUARA_Q3, "dibuka"), ...kubusP("a", 4, 13), ...kartu("bk", 160, 70, 130, 22, W.krem, ["1 puluhan jadi 10 satuan"], 9)),
    ),
    k(
      SUARA_Q4,
      ...Array.from({ length: 9 }, (_, q) => ubah(idx(SUARA_Q4, "beri"), { id: `bsa${5 + q}`, x: slotKubus(q, false).x, y: slotKubus(q, false).y })),
      ubah(idx(SUARA_Q4, "Sisanya"), { id: "n-a", isi: "5" }),
      sorotkan(idx(SUARA_Q4, "lima"), ...ids("bsa", 0, 4)),
    ),
    k(SUARA_Q5, redamkan(0, ...ids("bsa", 0, 4)), ubah(idx(SUARA_Q5, "sama"), { id: "rm", isi: "14 − 9 = 5" }), tambah(idx(SUARA_Q5, "Hebat!"), emo("ok", 262, 168, "✅", 22))),
  ],
};

/* ------------------------------ 17. Latihan 3: pasangan bilangan ------------------------------ */
const SUARA_R1 = "Latihan tiga. Wei mengurangkan tujuh belas dengan dua belas memakai pasangan bilangan.";
const SUARA_R2 = "Sepuluh dikurangi sepuluh sama dengan nol. Berapa tujuh dikurangi dua? Ketuk jawabannya.";
const SUARA_R3 = "Betul, lima! Tujuh dikurangi dua sama dengan lima, dan nol ditambah lima sama dengan lima.";
const SUARA_R4 = "Jadi tujuh belas dikurangi dua belas sama dengan lima. Hebat!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan tiga: pasangan bilangan",
  sumber: "Materi: latihan pasangan bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Latihan tiga"), rumus("17 − 12 = ?", 196, 15)), tambah(idx(SUARA_R1, "tujuh"), ...bagan("a", 80, 30, "17", "10", "7")), tambah(idx(SUARA_R1, "dua"), ...bagan("b", 220, 30, "12", "10", "2"))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Sepuluh"), teks("m1", 150, 132, "10 − 10 = 0", 12, W.merah)), tambah(idx(SUARA_R2, "Ketuk"), ...pilihKata(144, ["4", "5", "6"]))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul,"), "c2-k"), hapusKartu(idx(SUARA_R3, "Tujuh"), 3), tambah(idx(SUARA_R3, "Tujuh"), teks("m2", 150, 152, "7 − 2 = 5", 12, W.merah)), tambah(idx(SUARA_R3, "nol"), teks("m3", 150, 170, "0 + 5 = 5", 12, W.merah))),
    k(SUARA_R4, ubah(idx(SUARA_R4, "sama"), { id: "rm", isi: "17 − 12 = 5" }), tambah(idx(SUARA_R4, "Hebat!"), emo("ok", 262, 196, "✅", 22))),
  ],
};

/* ------------------------------ 18. Latihan 4: memeriksa hasil ------------------------------ */
const PIL_T = ["4 + 11 = 15", "4 + 7 = 11", "11 + 7 = 18"];
const pilihBaris = (y: number, isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, 70, y + i * 34, t, [W.hijauMuda, W.pink, W.langit][i], 160, 28, 13));
const SUARA_S1 = "Latihan empat. Igil menghitung sebelas dikurangi tujuh dan mendapat empat.";
const SUARA_S2 = "Pilih penjumlahan yang tepat untuk memeriksa jawaban Igil.";
const SUARA_S3 = "Betul! Empat ditambah tujuh sama dengan sebelas, cocok dengan bilangan awal. Jawaban Igil benar.";

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan empat: memeriksa jawaban",
  sumber: "Materi: latihan memeriksa hasil",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Latihan empat")), tambah(idx(SUARA_S1, "Igil"), rumus("11 − 7 = 4", 54, 20))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "Pilih"), ...pilihBaris(76, PIL_T))),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Betul!"), "c2-k"), tambah(idx(SUARA_S3, "Jawaban"), emo("ok", 262, 54, "✅", 24))),
  ],
};

/* ------------------------------ 19. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Selisih dicari dengan memasangkan jambu satu-satu, lalu dikurangi.";
const SUARA_Z2 = "Tiga cara mengurangi: jalur bilangan, tabel nilai tempat, dan pasangan bilangan.";
const SUARA_Z3 = "Kalau satuan tidak cukup, urai satu puluhan menjadi sepuluh satuan.";
const SUARA_Z4 = "Periksa hasilnya dengan penjumlahan. Pilih cara yang paling mudah untukmu.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Selisih", ...kartu("p1", 14, 30, 272, 36, W.hijauMuda, ["selisih: pasangkan satu-satu", "lalu kurangi"], 9.2))),
    k(SUARA_Z2, tambah("Tiga", ...kartu("p2", 14, 72, 272, 36, W.krem, ["3 cara: jalur bilangan,", "tabel nilai tempat, pasangan"], 9.2))),
    k(SUARA_Z3, tambah("Kalau", ...kartu("p3", 14, 114, 272, 36, W.langit, ["satuan tidak cukup: urai", "1 puluhan jadi 10 satuan"], 9.2))),
    k(SUARA_Z4, tambah("Periksa", ...kartu("p4", 14, 156, 272, 36, W.pink, ["periksa dengan penjumlahan;", "pilih cara yang paling mudah"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
