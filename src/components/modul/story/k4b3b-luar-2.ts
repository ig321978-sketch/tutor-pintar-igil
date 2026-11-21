import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bil, emo, judul, kartu, kotak, lapangan, panah, teks, tokoh } from "./k4b3b-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b3b-bantu";

/*
 * Cerita orisinal IGIL "Barisan Kursi Pak Gunawan" (Kelas 4 Bab 3 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b3b.md. Bagian ini: Rule Machine (Mesin Aturan) dan terapannya, Position Table (Tabel Urutan) dan terapannya, dan ringkasan.
 */

const MIN = "−";
const KALI = "×";

/** Jalur lengkung dari (x, y) ke kiri sepanjang `lebar` (bilangan keluar kembali ke bilangan masuk). */
const lingkar = (id: string, x: number, y: number, lebar: number): Obj => ({ id, t: "jalur", x, y, d: `M0 0 Q${-lebar / 2} -50 ${-lebar} 0`, warna: undefined, garis: W.ungu, tebal: 2, putus: true, z: 1 });

/* ------------------------------ Rule Machine: konsep ------------------------------ */
const SUARA_D1 = "Cara kedua, Rule Machine, atau Mesin Aturan.";
const SUARA_D2 = "Mesin ini punya satu aturan, misalnya tambah tiga, dan menerapkannya pada tiap bilangan yang masuk.";
const SUARA_D3 = "Bilangan yang keluar menjadi bilangan berikutnya dalam pola.";
const SUARA_D4 = "Aturan yang sama dipakai terus, sehingga hasilnya selalu teratur.";

export const ADEGAN_LUAR_MESIN: AdeganStory = {
  id: "luar-mesin",
  judul: "Rule Machine: Mesin Aturan",
  sumber: "Metode global: Rule Machine (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Cara 2: Rule Machine"), ...lapangan("lp", 150)),
      tambah("Rule", emo("jr", 150, 104, E.mesin, 36)),
      tambah("Mesin", teks("nm", 150, 140, "Mesin Aturan", 13, W.ungu)),
    ),
    k(
      SUARA_D2,
      hapus(0, "jr", "nm"),
      tambah("Mesin", kotak("ms", 105, 58, 90, 56, W.putih, W.ungu, { tebal: 3, rx: 8, z: 1 }), teks("mt", 150, 74, "mesin", 9, W.coklat, { z: 2 })),
      tambah("satu", teks("sa", 150, 36, "1 aturan", 11, W.ungu)),
      tambah("tambah", teks("ma", 150, 100, "+3", 24, W.merah, { z: 2 })),
      tambah("masuk", ...bil("in", 26, 86, "6"), panah("pi", 44, 86, 56, 0, W.biru, 2.4, { z: 4 }), teks("tm", 62, 108, "masuk", 9, W.coklat)),
    ),
    k(
      SUARA_D3,
      tambah("keluar", panah("po", 198, 86, 54, 0, W.biru, 2.4, { z: 4 }), teks("tk", 226, 108, "keluar", 9, W.coklat)),
      tambah("menjadi", ...bil("out", 272, 86, "9")),
      tambah("berikutnya", teks("br", 150, 140, "6 → 9", 13, W.hijauTua)),
    ),
    k(
      SUARA_D4,
      hapus(0, "sa", "br"),
      tambah("dipakai", lingkar("lp2", 272, 72, 246)),
      tambah("terus", teks("lt", 150, 140, "masuk lagi", 10, W.ungu)),
      tambah("teratur", teks("sq", 150, 164, "6, 9, 12, 15", 13, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Rule Machine: terapan ------------------------------ */
const SUARA_E1 = "Satria memasukkan dua puluh empat ke mesin yang beraturan tambah tiga.";
const SUARA_E2 = "Keluar dua puluh tujuh, dan ia memasukkannya lagi sampai tiga kali.";
const SUARA_E3 = "Cocok untuk melanjutkan pola beberapa langkah dengan cepat dan rapi.";
const SUARA_E4 = "Kurang cocok kalau aturannya belum ketemu, karena mesin harus diberi aturan dulu.";

export const ADEGAN_LUAR_MESIN_TERAPAN: AdeganStory = {
  id: "luar-mesin-terapan",
  judul: "Rule Machine: terapan",
  sumber: "Metode global: Rule Machine (terapan)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Dua Puluh Empat Masuk"), ...lapangan("lp", 150)),
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("memasukkan", panah("pi", 66, 86, 34, 0, W.biru, 2.4, { z: 4 })),
      tambah("dua", ...bil("in", 50, 86, "24")),
      tambah("mesin", kotak("ms", 105, 58, 90, 56, W.putih, W.ungu, { tebal: 3, rx: 8, z: 1 }), teks("mt", 150, 74, "mesin", 9, W.coklat, { z: 2 })),
      tambah("tambah", teks("ma", 150, 100, "+3", 24, W.merah, { z: 2 })),
    ),
    k(
      SUARA_E2,
      tambah("Keluar", panah("po", 198, 86, 34, 0, W.biru, 2.4, { z: 4 }), ...bil("out", 250, 86, "27")),
      tambah("memasukkannya", lingkar("lp2", 250, 72, 200)),
      tambah("tiga", teks("k3", 150, 136, "3 kali", 13, W.merah), teks("sq", 150, 156, `24 → 27 → 30 → 33`, 11, W.hijauTua)),
    ),
    k(
      SUARA_E3,
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("cepat", emo("pt", 226, 148, E.petir, 22)),
      tambah("rapi", teks("rp", 150, 178, "cepat dan rapi", 10, W.hijauTua)),
    ),
    k(
      SUARA_E4,
      hapus(0, "jp", "pt", "rp"),
      tambah(0, emo("xs", 262, 156, E.salah, 22)),
      ubah("belum", { id: "ma", isi: "?" }),
      tambah("ketemu", teks("kt", 150, 178, "aturan belum ketemu", 10, W.merah)),
      tambah("diberi", emo("tq", 262, 128, E.tanya, 22)),
    ),
  ],
};

/* ------------------------------ Position Table: konsep ------------------------------ */
const SUARA_F1 = "Cara ketiga, Position Table, atau Tabel Urutan.";
const SUARA_F2 = "Kita menulis nomor urutan di baris atas, dan bilangan pola di baris bawahnya.";
const SUARA_F3 = "Dari tabel, kita mencari bilangan pada urutan tertentu dengan menambah beda sebanyak lompatan.";
const SUARA_F4 = "Lompatannya selalu satu kurang dari nomor urutan yang ditanyakan.";
const XS = [82, 132, 182, 232];
const HIJAU_KARTU = "#D1FAE5";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Position Table: Tabel Urutan",
  sumber: "Metode global: Position Table (konsep)",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Cara 3: Position Table"), ...lapangan("lp", 150)),
      tambah("Position", emo("jr", 150, 104, E.tabel, 36)),
      tambah("Tabel", teks("nm", 150, 140, "Tabel Urutan", 13, W.ungu)),
    ),
    k(
      SUARA_F2,
      hapus(0, "jr", "nm"),
      tambah("nomor", ...kartu("ul", 14, 60, 62, 28, HIJAU_KARTU, ["urutan"], 9), ...["1", "2", "3", "7"].flatMap((t, i) => kartu(`u${i}`, XS[i], 60, 46, 28, W.putih, [t], 13))),
      tambah("bilangan", ...kartu("vl", 14, 92, 62, 28, HIJAU_KARTU, ["bilangan"], 9), ...["5", "9", "13", "?"].flatMap((t, i) => kartu(`v${i}`, XS[i], 92, 46, 28, W.putih, [t], 13))),
    ),
    k(
      SUARA_F3,
      tambah("mencari", emo("ey", 262, 150, E.mata, 22)),
      tambah("beda", teks("bd", 150, 150, "beda : +4", 12, W.merah)),
      tambah("lompatan", teks("lm", 150, 168, `5 + 4 ${KALI} 6`, 13, W.biru)),
    ),
    k(
      SUARA_F4,
      hapus(0, "lm"),
      tambah("satu", teks("sk", 150, 168, `7 ${MIN} 1 = 6`, 13, W.merah)),
      sorotkan("nomor", "u3-k"),
      ubah("ditanyakan", { id: "v3-t0", isi: "29", warna: W.merah }),
    ),
  ],
};

/* ------------------------------ Position Table: terapan ------------------------------ */
const SUARA_G1 = "Laras mengisi tabel untuk kursi, urutan pertama dua belas, kedua lima belas, ketiga delapan belas.";
const SUARA_G2 = "Untuk urutan kelima, ia menambah tiga sebanyak empat kali dan mendapat dua puluh empat.";
const SUARA_G3 = "Cocok untuk mencari bilangan pada urutan yang jauh, karena tabel membantu menghitung lompatan.";
const SUARA_G4 = "Kurang cocok kalau beda berubah-ubah, karena tabel hanya untuk beda yang tetap.";
const XG = [78, 118, 158, 198, 238];

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Position Table: terapan",
  sumber: "Metode global: Position Table (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(
        0,
        judul("Tabel Kursi"),
        ...lapangan("lp", 150),
        ...tokoh("la", 36, 184, "Laras"),
      ),
      tambah(
        "tabel",
        ...kartu("ul", 14, 60, 62, 28, HIJAU_KARTU, ["urutan"], 9),
        ...["1", "2", "3", "4", "5"].flatMap((t, i) => kartu(`u${i}`, XG[i], 60, 38, 28, W.putih, [t], 12)),
        ...kartu("vl", 14, 92, 62, 28, HIJAU_KARTU, ["bilangan"], 9),
        ...[0, 1, 2, 3, 4].flatMap((i) => kartu(`v${i}`, XG[i], 92, 38, 28, W.putih, ["?"], 12)),
      ),
      ubah("dua", { id: "v0-t0", isi: "12" }),
      ubah("lima", { id: "v1-t0", isi: "15" }),
      ubah("delapan", { id: "v2-t0", isi: "18" }),
    ),
    k(
      SUARA_G2,
      sorotkan("kelima", "u4-k"),
      tambah("tiga", teks("lm", 150, 150, `+3 ${KALI} 4`, 13, W.merah)),
      ubah("dua", { id: "v3-t0", isi: "21" }, { id: "v4-t0", isi: "24", warna: W.merah }),
    ),
    k(
      SUARA_G3,
      hapus(0, "lm"),
      tambah("Cocok", emo("jp", 262, 150, E.jempol, 22)),
      tambah("jauh", teks("ju", 150, 150, "urutan jauh", 11, W.hijauTua)),
      tambah("lompatan", teks("lj", 150, 168, "hitung lompatan", 10, W.coklat)),
    ),
    k(
      SUARA_G4,
      hapus(0, "jp", "ju", "lj"),
      tambah(0, emo("xs", 262, 150, E.salah, 22)),
      ubah("berubah-ubah", { id: "v1-t0", isi: "17" }, { id: "v2-t0", isi: "23" }, { id: "v3-t0", isi: "?" }, { id: "v4-t0", isi: "?" }),
      tambah("tetap", teks("tt", 150, 150, "hanya beda tetap", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Gunawan. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin melihat urutan bilangan, pakai Rantai Loncat. Ingin melanjutkan beberapa langkah, pakai Mesin Aturan.";
const SUARA_R3 = "Ingin mencari bilangan pada urutan yang jauh, pakai Tabel Urutan. Apa pun caranya, periksa bedanya dulu.";
const SUARA_R4 = "Menurutmu, untuk mencari bilangan pada urutan kesepuluh, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara memilih",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...lapangan("lp", 150), teks("n3", 150, 40, "3 cara", 11, W.ungu)),
      tambah("pelajari", ...kartu("r0", 14, 56, 84, 40, "#FEF3C7", ["Rantai", "Loncat"], 9)),
      tambah("Gunawan", ...tokoh("pg", 262, 184, "Pak Gunawan")),
      tambah("Mana", ...kartu("r1", 108, 56, 84, 40, W.hijauMuda, ["Mesin", "Aturan"], 9)),
      tambah("pas", ...kartu("r2", 202, 56, 84, 40, W.pink, ["Tabel", "Urutan"], 9)),
      tambah("keadaan", emo("tn", 150, 134, E.tanya, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tn"),
      tambah("melihat", teks("h0", 56, 112, "lihat urutan", 9, W.coklat)),
      sorotkan("Rantai", "r0-k"),
      tambah("melanjutkan", teks("h1", 150, 112, "cepat lanjut", 9, W.coklat)),
      redamkan("melanjutkan", "r0-k"),
      sorotkan("Mesin", "r1-k"),
    ),
    k(
      SUARA_R3,
      tambah("mencari", teks("h2", 244, 112, "urutan jauh", 9, W.coklat)),
      redamkan("Tabel", "r1-k"),
      sorotkan("Tabel", "r2-k"),
      tambah("periksa", teks("pp", 150, 134, "periksa beda dulu", 11, W.merah)),
    ),
    k(
      SUARA_R4,
      hapus(0, "h0", "h1", "h2", "pp"),
      tambah(0, emo("tm", 244, 136, E.tanya, 22)),
      tambah("urutan", teks("q10", 150, 124, "urutan ke-10 ?", 14, W.biru)),
      redamkan("cara", "r2-k"),
    ),
  ],
};
