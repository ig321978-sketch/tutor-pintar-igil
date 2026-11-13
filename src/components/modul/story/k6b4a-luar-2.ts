import { posisiKata, type AdeganStory } from "./logika-story";
import { W, batang, dadu, emo, garis, kontinum, kotak, panah, penunjuk, roda, teks } from "./k6b4a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b4a-bantu";

/* ------------------------------ L6. Qualitative Probability Language: konsep ------------------------------ */
const KATA_SEHARI = [
  ["mustahil", "#FECACA"],
  ["kecil kemungkinan", "#FED7AA"],
  ["bisa jadi", "#FEF08A"],
  ["kemungkinan besar", "#D9F99D"],
  ["hampir pasti", "#A5F3FC"],
  ["pasti", "#BFDBFE"],
];
const tanggaKata = (i: number) => [kotak(`kt${i}`, 12 + i * 47, 150 - i * 16, 44, 24 + i * 16, KATA_SEHARI[i][1], W.biru, { rx: 3 }), teks(`ktt${i}`, 34 + i * 47, 164 - i * 16 + (i === 1 || i === 3 || i === 4 ? 0 : 0), KATA_SEHARI[i][0].split(" ")[0], 6.4), ...(KATA_SEHARI[i][0].includes(" ") ? [teks(`ktu${i}`, 34 + i * 47, 173 - i * 16, KATA_SEHARI[i][0].split(" ").slice(1).join(" "), 6.4)] : [])];

export const ADEGAN_LUAR_BAHASA: AdeganStory = {
  id: "luar-bahasa",
  judul: "Qualitative Probability Language: kata dan maknanya",
  sumber: "Metode luar; rujukan Buku Panduan Guru hlm. 112",
  latar: "#ECFDF5",
  ketukan: [
    k("Metode ketiga: Qualitative Probability Language, bahasa peluang kualitatif. Kualitatif berarti memakai kata, bukan angka.", tambah(0, teks("jud", 150, 28, "Qualitative Probability Language", 11, W.ungu)), tambah("kata,", kotak("kk", 40, 56, 100, 60, "#BBF7D0", W.hijau, { rx: 12 }), teks("kkt", 90, 92, "KATA", 20, W.hijau)), tambah("angka.", kotak("ka", 160, 56, 100, 60, "#F3F4F6", W.abu, { rx: 12 }), teks("kat", 210, 92, "1 2 3", 20, W.abu), garis("sc", 168, 62, 84, 48, W.merah, 3, { gambar: true }))),
    k("Dalam hidup kita bilang: mustahil, kecil kemungkinan, bisa jadi, kemungkinan besar, hampir pasti, dan pasti.", bersih(0), tambah(4, tanggaKata(0)), tambah(5, tanggaKata(1)), tambah(7, tanggaKata(2)), tambah(9, tanggaKata(3)), tambah(11, tanggaKata(4)), tambah(14, tanggaKata(5)), tambah(0, teks("jud", 150, 24, "kata sehari-hari", 11, W.ungu))),
    k("Kata-kata ini enak dipakai, tetapi punya kelemahan. Satu kata bisa dibayangkan berbeda oleh dua orang.", bersih(0), tambah("kelemahan", emo("awas", 150, 52, "⚠️", 32)), tambah("kata", teks("mg", 150, 98, "mungkin", 20, W.ungu)), tambah("berbeda", emo("a", 70, 160, "👧", 34), emo("b", 230, 160, "👦", 34), panah("pa", 128, 110, -40, 30, W.merah, 2.5, { gambar: true }), panah("pb", 172, 110, 40, 30, W.merah, 2.5, { gambar: true }))),
    k("Misalnya Ana dan Budi sama-sama mendengar kata mungkin. Ana membayangkan sekitar separuh. Budi membayangkan hampir pasti.", bersih(0), tambah("Ana", emo("a", 40, 60, "👧", 30), teks("an", 40, 82, "Ana", 8), kotak("ba", 70, 36, 150, 50, W.putih, W.ungu, { rx: 14 })), tambah("sekitar", ...kontinum("ka", 60, 62, 90, 12), penunjuk("pa1", 60, 90, 62, 5, 10), teks("pat", 150, 47, "mungkin = separuh", 7.5, W.merah)), tambah("Budi@2", emo("b", 40, 140, "👦", 30), teks("bn", 40, 162, "Budi", 8), kotak("bb", 70, 116, 150, 50, W.putih, W.ungu, { rx: 14 })), tambah("hampir", ...kontinum("kb", 58, 142, 90, 12), penunjuk("pb1", 58, 90, 142, 9, 10), teks("pbt", 150, 127, "mungkin = hampir pasti", 7.5, W.merah))),
    k("Penelitian tentang bahasa ketidakpastian menemukan hal serupa: orang menafsirkan kata yang sama dengan tingkat yang berbeda-beda.", bersih(0), tambah("kata", teks("w", 150, 38, "satu kata: mungkin", 12, W.ungu)), tambah(0, ...kontinum("kk", 30, 100, 240, 20), garis("ki", 30, 94, 0, 32, W.biru, 3), garis("kn", 270, 94, 0, 32, W.biru, 3), teks("m", 30, 140, "mustahil", 8, W.merah, { anchor: "start" }), teks("p", 270, 140, "pasti", 8, W.biru, { anchor: "end" })), tambah("tingkat", ...[3, 4, 5].map((n, i) => penunjuk(`s${i}`, 30, 240, 98, n, 10, W.merah))), tambah("berbeda-beda", ...[6, 7, 9].map((n, i) => penunjuk(`s${i + 3}`, 30, 240, 98, n, 10, W.merah))), tambah("menafsirkan", teks("tf", 150, 176, "tiap orang menaruh pada tempat berbeda", 9, W.merah))),
    k("Solusinya: pakai kata bersama alasan dan jumlah. Katakan, kemungkinan besar, karena 6 dari 10 buku berwarna merah.", bersih(0), tambah("kata", kotak("c1", 18, 36, 78, 30, "#BBF7D0", W.biru, { rx: 12 }), teks("c1t", 57, 56, "kata", 11)), tambah("alasan", kotak("c2", 111, 36, 78, 30, "#FDE68A", W.biru, { rx: 12 }), teks("c2t", 150, 56, "alasan", 11)), tambah("jumlah", kotak("c3", 204, 36, 78, 30, "#BFDBFE", W.biru, { rx: 12 }), teks("c3t", 243, 56, "jumlah", 11)), tambah("Katakan,", kotak("kal", 14, 100, 272, 74, W.putih, W.emas, { rx: 12, tebal: 3 }), teks("k1", 150, 124, "kemungkinan besar,", 12, W.hijau)), tambah("karena", teks("k2", 150, 144, "karena 6 dari 10 buku", 10), teks("k3", 150, 160, "berwarna merah", 10, W.merah))),
    k("Dengan begitu kata menjadi jelas karena ada bukti. Buku memakai cara ini: tiap kategori selalu ditempel pada contoh dan jumlah.", bersih(0), tambah("bukti", kotak("b1", 20, 40, 120, 46, "#A5F3FC", W.biru, { rx: 10 }), teks("b1t", 80, 68, "sangat mungkin", 10)), tambah("contoh", kotak("b2", 160, 40, 120, 46, W.putih, W.biru, { rx: 10 }), teks("b2t", 220, 58, "buku merah", 9), teks("b2u", 220, 72, "6 buku dari 10", 9, W.merah), panah("pj", 142, 63, 16, 0, W.biru, 2.5, { gambar: true })), tambah("tiap", teks("tk", 150, 120, "kategori + contoh + jumlah", 11, W.ungu), emo("ok", 150, 160, "✅", 28))),
  ],
};

/* ------------------------------ L7. Bahasa peluang diterapkan ------------------------------ */
const kartuKalimat = (i: number, kalimat: string[], kata: string, warna: string) => [kotak(`kal${i}`, 10, 26 + i * 52, 280, 46, W.putih, W.biru, { rx: 8 }), ...kalimat.map((b, j) => teks(`kal${i}t${j}`, 18, 42 + i * 52 + j * 11, b, 7.8, W.biru, { anchor: "start" })), kotak(`kal${i}c`, 196, 40 + i * 52, 88, 18, warna, W.biru, { rx: 9 }), teks(`kal${i}w`, 240, 52.5 + i * 52, kata, 7.6)];
export const ADEGAN_LUAR_BAHASA_TERAPAN: AdeganStory = {
  id: "luar-bahasa-terapan",
  judul: "Memilih kata yang tepat untuk kejadian",
  sumber: "Metode luar; kalimat dari Buku Siswa hlm. 106–108 dan Buku Panduan Guru hlm. 117",
  latar: "#FFFBEB",
  ketukan: [
    k("Terapkan pada kalimat Dhien. Hujan di sekitar rumah Dhien: bisa terjadi, bisa juga tidak. Kata yang tepat adalah mungkin.", tambah(0, teks("jud", 150, 16, "pilih kata yang tepat", 9, W.ungu)), tambah("Hujan", kartuKalimat(0, ["Hujan di sekitar rumah Dhien."], "...", W.putih)), ubah("mungkin.", { id: "kal0w", isi: "mungkin" }, { id: "kal0c", warna: "#D9F99D" })),
    k("Kami makan malam bersama-sama: biasanya terjadi. Kata yang tepat adalah kemungkinan besar, atau sangat mungkin.", tambah("makan", kartuKalimat(1, ["Kami makan malam", "bersama-sama."], "...", W.putih)), ubah("kemungkinan", { id: "kal1w", isi: "kemungkinan besar" }, { id: "kal1c", warna: "#A5F3FC" })),
    k("Matahari terbit besok pagi: terjadi karena fenomena alam. Kata yang tepat adalah pasti.", tambah("Matahari", kartuKalimat(2, ["Matahari terbit", "besok pagi."], "...", W.putih)), ubah("pasti.", { id: "kal2w", isi: "pasti" }, { id: "kal2c", warna: "#BFDBFE" }), tambah("fenomena", emo("m", 150, 198, "☀️", 18))),
    k("Sekarang hati-hati. Kalimat aku tidak mungkin bertemu presiden terlalu kuat, karena masih ada kemungkinan kecil. Lebih tepat: kurang mungkin.", bersih(0), tambah(0, kartuKalimat(0, ["Aku tidak mungkin", "bertemu presiden."], "tidak mungkin", "#FECACA")), tambah("terlalu", emo("awas", 40, 110, "⚠️", 26), teks("tk", 150, 114, "terlalu kuat: masih ada kemungkinan kecil", 8.5, W.merah)), tambah("Lebih", kartuKalimat(2, ["Aku kurang mungkin", "bertemu presiden."], "kurang mungkin", "#FED7AA")), tambah("tepat:", emo("ok", 150, 198, "✅", 18))),
    k("Kata kuat seperti selalu, pasti, dan tidak pernah harus dipakai hati-hati. Pakai hanya kalau ada alasan yang kuat, seperti fenomena alam.", bersih(0), tambah("selalu", kotak("x1", 20, 40, 76, 28, "#FECACA", W.biru, { rx: 14 }), teks("x1t", 58, 58, "selalu", 10)), tambah("pasti", kotak("x2", 112, 40, 76, 28, "#FECACA", W.biru, { rx: 14 }), teks("x2t", 150, 58, "pasti", 10)), tambah("pernah", kotak("x3", 204, 40, 76, 28, "#FECACA", W.biru, { rx: 14 }), teks("x3t", 242, 58, "tidak pernah", 8.5)), tambah("hati-hati.", emo("h", 150, 110, "⚠️", 30), teks("ht", 150, 128, "dipakai dengan hati-hati", 10, W.merah)), tambah("fenomena", emo("a", 150, 172, "🌅", 26), teks("at", 150, 192, "boleh bila fenomena alam", 8.5, W.hijau))),
    k("Latihan: ubah kalimat samar menjadi kalimat berbukti. Mungkin hujan, menjadi: hujan kemungkinan besar turun, karena langit mendung dan 8 dari 10 hari mendung berakhir hujan. Angka ini hanya contoh.", bersih(0), tambah("samar", kotak("s1", 16, 30, 268, 32, "#F3F4F6", W.abu, { rx: 10 }), teks("s1t", 150, 51, "“Mungkin hujan.”", 12, W.abu)), tambah("menjadi@2", panah("sp", 150, 66, 0, 26, W.hijau, 4, { gambar: true })), tambah("hujan@2", kotak("s2", 16, 98, 268, 62, W.putih, W.hijau, { rx: 10, tebal: 2.5 }), teks("s2t", 150, 118, "Hujan kemungkinan besar turun,", 9.5, W.hijau)), tambah("langit", teks("s2u", 150, 134, "karena langit mendung dan", 9), emo("awan", 262, 128, "☁️", 20)), tambah("8", teks("s2v", 150, 150, "8 dari 10 hari mendung berakhir hujan", 9, W.merah)), tambah("contoh.", teks("s3", 150, 182, "(angka hanya contoh)", 8, W.ungu))),
  ],
};

/* ------------------------------ L8. Experimental Relative Frequency: konsep ------------------------------ */
const DASAR_E = 168;
const batangFrek = (id: string, x: number, h: number, label: string, n: string) => [batang(id, x, DASAR_E, 40, h, "#FACC15"), teks(`${id}-n`, x + 20, DASAR_E - h - 4, n, 9, W.merah), teks(`${id}-l`, x + 20, DASAR_E + 11, label, 8)];
export const ADEGAN_LUAR_FREKUENSI: AdeganStory = {
  id: "luar-frekuensi",
  judul: "Experimental Relative Frequency: peluang dari percobaan",
  sumber: "Metode luar; roda dari Buku Siswa hlm. 113–114",
  latar: "#FFF7ED",
  ketukan: [
    k("Metode keempat: Experimental Relative Frequency, frekuensi relatif dari percobaan. Artinya, peluang diperkirakan dari hasil percobaan yang dicatat.", tambah(0, teks("jud", 150, 28, "Experimental Relative Frequency", 11, W.ungu)), tambah("percobaan", emo("tabung", 80, 96, "🧪", 40)), tambah("dicatat", emo("catat", 220, 96, "📝", 40), panah("pa", 112, 96, 74, 0, W.biru, 3, { gambar: true })), tambah("diperkirakan", teks("pk", 150, 160, "peluang ≈ hasil yang dicatat", 10, W.hijau))),
    k("Caranya: ulangi percobaan, catat berapa kali kejadian muncul, lalu tulis kejadian muncul sekian dari sekian percobaan.", bersih(0), tambah("ulangi", kotak("l1", 12, 50, 88, 90, W.putih, W.biru, { rx: 10 }), emo("l1e", 56, 88, "🔁", 28), teks("l1t", 56, 118, "ulangi", 9), teks("l1u", 56, 130, "percobaan", 8)), tambah("catat", kotak("l2", 106, 50, 88, 90, W.putih, W.biru, { rx: 10 }), emo("l2e", 150, 88, "📝", 28), teks("l2t", 150, 118, "catat berapa", 9), teks("l2u", 150, 130, "kali muncul", 8)), tambah("tulis", kotak("l3", 200, 50, 88, 90, W.putih, W.biru, { rx: 10 }), teks("l3e", 244, 90, "k dari n", 13, W.merah), teks("l3t", 244, 118, "tulis hasilnya", 8.5))),
    k("Contoh: roda putar dengan 8 juring, hanya 1 juring kuning. Prediksi dari roda: kuning kurang mungkin.", bersih(0), tambah(0, roda("rd", 110, 108, 64, ["#FACC15", "#22C55E", "#22C55E", "#22C55E", "#22C55E", "#22C55E", "#22C55E", "#22C55E"])), tambah("juring", teks("jr", 232, 44, "8 juring", 9)), tambah("kuning", teks("ky", 232, 66, "1 juring kuning", 9, "#B45309")), sorotkan("kuning", "rd-j0"), tambah("Prediksi", teks("pr", 232, 112, "prediksi:", 9, W.ungu), teks("pr2", 232, 126, "kuning kurang", 9, W.merah), teks("pr3", 232, 138, "mungkin", 9, W.merah))),
    k("Putar 4 kali. Misalkan kuning muncul 2 kali. Catatannya 2 dari 4, hampir separuh, jauh dari prediksi.", bersih(0), tambah(0, garis("sb", 24, DASAR_E, 252, 0, W.biru, 2), garis("ek", 24, DASAR_E - 12, 252, 0, W.hijau, 1.5, { putus: true }), teks("ekt", 276, DASAR_E - 15, "harapan 1 dari 8", 6.5, W.hijau, { anchor: "end" }), teks("jud", 150, 24, "bagian putaran yang kuning (contoh)", 9.5, W.ungu)), tambah("Putar", batangFrek("f1", 40, 50, "4 putaran", "2 dari 4"))),
    k("Putar 20 kali. Misalkan kuning muncul 3 kali. Catatannya 3 dari 20, lebih dekat ke prediksi.", tambah("Putar", batangFrek("f2", 130, 15, "20 putaran", "3 dari 20"))),
    k("Putar 80 kali. Misalkan kuning muncul 9 kali. Catatannya 9 dari 80, makin dekat lagi dengan 1 dari 8.", tambah("Putar", batangFrek("f3", 220, 11, "80 putaran", "9 dari 80")), sorotkan("dekat", "ek")),
    k("Pola ini terkenal: makin banyak percobaan, hasilnya cenderung makin dekat ke peluang sebenarnya. Namanya hukum bilangan besar. Angka percobaan di sini hanya contoh.", bersih(0), tambah("banyak", teks("hk", 150, 70, "makin banyak percobaan", 13, W.ungu), panah("ph", 150, 82, 0, 34, W.hijau, 4, { gambar: true })), tambah("dekat", teks("hd", 150, 140, "makin dekat ke peluang sebenarnya", 11, W.hijau)), tambah("Namanya", kotak("hb", 60, 156, 180, 28, "#FDE68A", W.biru, { rx: 14 }), teks("hbt", 150, 175, "hukum bilangan besar", 11)), tambah("contoh.", teks("ct", 150, 198, "(angka percobaan hanya contoh)", 8, W.ungu))),
  ],
};

/* ------------------------------ L9. Frekuensi relatif pada dadu buku ------------------------------ */
const ANGKA = ["5", "6", "4", "2", "1", "1", "3", "5", "2", "6"];
const SUARA_DADU = "Sekarang data asli dari buku halaman 104: sepuluh lemparan dadu, hasilnya 5, 6, 4, 2, 1, 1, 3, 5, 2, dan 6.";
const POSISI_DADU = ANGKA.map((_, i) => posisiKata(SUARA_DADU, "hasilnya") + 1 + i + (i === 9 ? 1 : 0));
const MUNCUL = [2, 2, 1, 1, 2, 2];
const batangE = (i: number) => [batang(`e${i}`, 40 + i * 38, 168, 26, MUNCUL[i] * 30, "#F97316"), teks(`e${i}n`, 53 + i * 38, 168 - MUNCUL[i] * 30 - 4, String(MUNCUL[i]), 10), teks(`e${i}l`, 53 + i * 38, 180, String(i + 1), 10)];
export const ADEGAN_LUAR_FREKUENSI_DADU: AdeganStory = {
  id: "luar-frekuensi-dadu",
  judul: "Memeriksa dadu dengan data buku",
  sumber: "Metode luar; data Buku Siswa hlm. 104",
  latar: "#EFF6FF",
  kutipan: ["Hasil lemparan dadu"],
  ketukan: [
    k(SUARA_DADU, tambah(0, teks("jud", 150, 24, "10 lemparan dadu (data buku halaman 104)", 9, W.ungu)), ...ANGKA.map((a, i) => tambah(POSISI_DADU[i], kotak(`c${i}`, 12 + i * 28, 62, 24, 30, "#DBEAFE", W.biru, { rx: 12 }), teks(`ct${i}`, 24 + i * 28, 83, a, 13)))),
    k("Dadu seimbang punya enam angka yang sama mungkin. Dari 10 lemparan, kita berharap tiap angka muncul sekitar 1 sampai 2 kali.", bersih(0), tambah(0, ...[0, 1, 2, 3, 4, 5].map((i) => dadu(`h${i}`, 26 + i * 44, 52, String(i + 1), W.putih, 30))), tambah("sama", teks("sm", 150, 106, "enam angka sama mungkin", 10, W.ungu)), tambah("berharap", kotak("br", 30, 124, 240, 34, "#BBF7D0", W.hijau, { rx: 10 }), teks("brt", 150, 146, "harapan: tiap angka sekitar 1 sampai 2 kali", 9.5, W.hijau))),
    k("Hasil catatan: angka 1 muncul 2 kali, angka 2 muncul 2 kali, angka 3 muncul 1 kali, angka 4 muncul 1 kali, angka 5 muncul 2 kali, dan angka 6 muncul 2 kali.", bersih(0), tambah(0, garis("ds", 30, 168, 240, 0, W.biru, 2), kotak("pita", 30, 168 - 60, 240, 30, "#BBF7D0", "none", { rx: 0, op: 0.6, z: -1 }), teks("ph", 276, 168 - 40, "1–2", 8, W.hijau, { anchor: "end" })), ...[1, 2, 3, 4, 5, 6].map((n, i) => tambah(`angka@${n}`, batangE(i)))),
    k("Semua angka muncul 1 atau 2 kali. Tidak ada yang sama persis, tetapi semuanya dekat dengan harapan.", sorotkan("Semua", "pita"), tambah("sama", teks("dk", 150, 40, "semuanya di dalam pita harapan", 10, W.hijau))),
    k("Kalau dadu dilempar 600 kali, tiap angka akan cenderung mendekati 100 kali, karena 600 dibagi 6 sama dengan 100.", bersih(0), tambah("600", teks("a", 70, 80, "600", 30, W.ungu), teks("al", 70, 100, "lemparan", 9)), tambah("dibagi", teks("b", 150, 80, "÷ 6", 24, W.biru)), tambah("100.", teks("c", 230, 80, "100", 30, W.hijau), teks("cl", 230, 100, "tiap angka", 9)), tambah("mendekati", ...[1, 2, 3, 4, 5, 6].map((n, i) => dadu(`m${i}`, 28 + i * 43, 130, String(n), "#FEF3C7", 26)))),
    k("Dengan begini kita bisa memeriksa dadu. Kalau satu angka muncul jauh lebih sering, mungkin dadunya tidak seimbang.", bersih(0), tambah("memeriksa", emo("lup", 150, 60, "🔎", 40)), tambah("satu", batang("tb1", 90, 170, 24, 30, "#93C5FD"), batang("tb2", 120, 170, 24, 30, "#93C5FD"), batang("tb3", 150, 170, 24, 120, "#EF4444"), batang("tb4", 180, 170, 24, 30, "#93C5FD")), tambah("sering", teks("lb", 232, 96, "terlalu sering", 8.5, W.merah)), tambah("tidak", teks("sb", 150, 192, "mungkin dadunya tidak seimbang (contoh)", 8.5, W.ungu))),
  ],
};

/* ------------------------------ L10. Ringkasan metode luar ------------------------------ */
const RINGKAS = [
  ["Buku", "lima tangga: bandingkan jumlah antarwarna", "#FDE68A"],
  ["Likelihood Spectrum Scale", "aturan separuh: 2 × k lawan n", "#A5F3FC"],
  ["Impossible-Certain Continuum", "penunjuk mulus: mustahil sampai pasti", "#FBCFE8"],
  ["Qualitative Probability Language", "kata + alasan + jumlah", "#BBF7D0"],
  ["Experimental Relative Frequency", "periksa prediksi dengan percobaan", "#BFDBFE"],
];
const barisRingkas = (i: number) => [kotak(`rg${i}`, 8, 28 + i * 31, 284, 27, RINGKAS[i][2], W.biru, { rx: 8 }), teks(`rg${i}a`, 16, 40 + i * 31, RINGKAS[i][0], 7.6, W.biru, { anchor: "start" }), teks(`rg${i}b`, 16, 51 + i * 31, RINGKAS[i][1], 6.8, W.ungu, { anchor: "start" })];
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan: buku dan empat metode luar",
  sumber: "Ringkasan Sub-Bab A",
  latar: "#FDF4FF",
  ketukan: [
    k("Mari ringkas buku dan metode luar. Buku menaruh kejadian di lima tangga dengan membandingkan jumlah antar warna.", tambah(0, teks("jud", 150, 18, "Ringkasan", 11, W.ungu)), tambah("Buku", barisRingkas(0))),
    k("Likelihood Spectrum Scale memberi aturan separuh supaya semua orang sepakat.", tambah("aturan", barisRingkas(1))),
    k("Impossible-Certain Continuum membuat penunjuk bergerak mulus antara mustahil dan pasti.", tambah("penunjuk", barisRingkas(2))),
    k("Qualitative Probability Language mengajarkan memasangkan kata dengan alasan dan jumlah.", tambah("memasangkan", barisRingkas(3))),
    k("Experimental Relative Frequency memeriksa prediksi dengan percobaan yang diulang.", tambah("memeriksa", barisRingkas(4))),
    k("Semua bertemu di satu pesan: peluang adalah prediksi terbaik dari bukti yang ada. Berikutnya, Sub-Bab B: membandingkan peluang dua kejadian.", bersih(0), tambah("pesan:", emo("bukti", 150, 70, "🔎", 40)), tambah("prediksi", teks("pt", 150, 120, "peluang = prediksi terbaik dari bukti", 11, W.ungu)), tambah("Berikutnya,", panah("nx", 60, 170, 180, 0, W.hijau, 4, { gambar: true }), teks("nb", 150, 190, "Sub-Bab B: membandingkan peluang", 9.5, W.hijau))),
  ],
};
