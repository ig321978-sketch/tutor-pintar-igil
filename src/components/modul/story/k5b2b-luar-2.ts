import type { AdeganStory } from "./logika-story";
import { E, JALUR, W, cincin, deret, emo, judul, kartu, labelDeret, lantai, loncengJalur, panah, papan, penanda, sumbu, teks, tokoh, xJalur } from "./k5b2b-gambar";
import { DERET_RAPAT } from "./k5b2b-materi-1";
import { bersih, hapus, k, pudarkan, redamkan, sorotkan, tambah } from "./k5b2b-bantu";

/*
 * Cerita orisinal IGIL "Dua Lonceng Pak Tarno" (Kelas 5 Bab 2 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b2b.md. Bagian ini: Spot the Match (Cari yang Sama), Meet Again (Bertemu Lagi), terapannya, dan ringkasan.
 */

const RENANG = "\u{1F3CA}";

/* ------------------------------ Spot the Match: konsep ------------------------------ */
const SUARA_S1 = "Cara kedua, Spot the Match, atau Cari yang Sama.";
const SUARA_S2 = "Kita menandai bilangan yang muncul di kedua daftar, lalu memilih yang paling kecil.";
const SUARA_S3 = "Bilangan yang ditandai adalah kelipatan persekutuan, dan yang terkecil adalah KPK.";
const SUARA_S4 = "Kita berhenti di tanda pertama, tidak perlu memeriksa daftar yang lebih panjang.";

const SA = deret("sa", 14, 56, [3, 6, 9, 12, 15, 18, 21, 24], W.jingga, DERET_RAPAT);
const SB = deret("sb", 14, 96, [4, 8, 12, 16, 20, 24, 28, 32], W.tosca, DERET_RAPAT);
const lingkar = (id: string, y: number, i: number) => cincin(id, 14, y, i, DERET_RAPAT);
/** Semua id kotak dan angka mulai indeks `dari` pada deret yang dibuat deret(id, ..., n). */
const idDari = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari }, (_, q) => [`${id}-c${dari + q}`, `${id}-t${dari + q}`]).flat();

export const ADEGAN_LUAR_SAMA: AdeganStory = {
  id: "luar-sama",
  judul: "Spot the Match: Cari yang Sama",
  sumber: "Metode global: Spot the Match (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 2: Spot the Match"), ...lantai("lt", 150)),
      tambah("Spot", emo("pg", 110, 112, E.cari, 40)),
      tambah("Cari", teks("nm", 150, 140, "Cari yang Sama", 13, W.ungu, { z: 3 }), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_S2,
      hapus(0, "pg", "nm", "kl"),
      tambah(0, papan("dp", 10, 28, 280, 114), labelDeret("la", 14, 56, "Kelipatan bilangan pertama"), labelDeret("lb", 14, 96, "Kelipatan bilangan kedua"), ...SA, ...SB),
      tambah("menandai", lingkar("r12a", 56, 3), lingkar("r12b", 96, 2), lingkar("r24a", 56, 7), lingkar("r24b", 96, 5)),
      tambah("kecil", teks("pl", 150, 130, "pilih yang terkecil", 10, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_S3,
      hapus(0, "pl"),
      tambah("kelipatan", teks("kpl", 222, 130, "kelipatan persekutuan", 9, W.hijauTua, { z: 3 })),
      sorotkan("terkecil", "r12a", "r12b"),
      tambah("KPK", teks("kk", 90, 130, "KPK", 12, W.merah, { z: 3 })),
    ),
    k(
      SUARA_S4,
      tambah("berhenti", emo("st", 262, 80, E.stop, 26)),
      pudarkan("pertama", ...idDari("sa", 4, 8), ...idDari("sb", 3, 8), "r24a", "r24b"),
      tambah("panjang", teks("bh", 150, 140, "berhenti di sini", 10, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Spot the Match: terapan ------------------------------ */
const SUARA_T1 = "Citra menandai dua puluh di kedua daftar kelipatan empat dan lima.";
const SUARA_T2 = "Tidak ada tanda yang lebih kecil, jadi KPK empat dan lima adalah dua puluh.";
const SUARA_T3 = "Cocok untuk mencari KPK dua bilangan, karena tanda pertama langsung menjadi jawabannya.";
const SUARA_T4 = "Kurang cocok kalau bilangannya lebih dari dua, karena kita harus menandai tiga daftar.";

const XA = deret("xa", 14, 56, [4, 8, 12, 16, 20, 24], W.jingga, DERET_RAPAT);
const XB = deret("xb", 14, 96, [5, 10, 15, 20, 25, 30], W.tosca, DERET_RAPAT);
const XC = deret("xc", 14, 124, [6, 12, 18, 24, 30, 36], W.krem, DERET_RAPAT);

export const ADEGAN_LUAR_SAMA_TERAPAN: AdeganStory = {
  id: "luar-sama-terapan",
  judul: "Spot the Match: terapan",
  sumber: "Metode global: Spot the Match (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Citra Menandai Dua Puluh"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tokoh("ci", 36, 184, "Citra")),
      tambah(0, labelDeret("la", 14, 56, "Kelipatan 4"), labelDeret("lb", 14, 96, "Kelipatan 5"), ...XA, ...XB),
      tambah("puluh", cincin("r20a", 14, 56, 4, DERET_RAPAT), cincin("r20b", 14, 96, 3, DERET_RAPAT)),
    ),
    k(
      SUARA_T2,
      tambah("tanda", teks("tt", 232, 128, "tak ada yang lebih kecil", 9, W.merah, { z: 3 })),
      sorotkan("KPK", "r20a", "r20b"),
      tambah("dua", teks("kk", 232, 40, "KPK 4 dan 5 = 20", 11, W.merah, { z: 3 })),
      tambah("puluh", emo("ok", 262, 80, E.benar, 22)),
    ),
    k(
      SUARA_T3,
      hapus(0, "tt"),
      tambah("Cocok", emo("jp", 262, 104, E.jempol, 22)),
      tambah("dua", teks("n2", 250, 66, "2 bilangan", 10, W.ungu, { z: 3 })),
      tambah("langsung", emo("kl", 232, 142, E.kilau, 18)),
    ),
    k(
      SUARA_T4,
      hapus(0, "jp", "n2", "ok", "kk", "kl"),
      tambah("Kurang", emo("xs", 262, 104, E.salah, 22)),
      tambah("dua", teks("n2b", 232, 40, "lebih dari 2", 10, W.merah, { z: 3 })),
      tambah("tiga", labelDeret("lc", 14, 124, "Kelipatan 6"), ...XC),
      tambah("daftar", teks("n3", 250, 66, "3 daftar", 10, W.ungu, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Meet Again: konsep ------------------------------ */
const SUARA_U1 = "Cara ketiga, Meet Again, atau Bertemu Lagi.";
const SUARA_U2 = "Kita menganggap KPK sebagai jarak waktu antara dua kali bertemu.";
const SUARA_U3 = "Kalau hari ini bertemu, pertemuan berikutnya datang sesudah sejumlah hari sebanyak KPK.";
const SUARA_U4 = "Pertemuan sesudahnya datang lagi dengan jarak yang sama.";

const lebar12 = xJalur(JALUR, 12) - xJalur(JALUR, 0);

export const ADEGAN_LUAR_ULANG: AdeganStory = {
  id: "luar-ulang",
  judul: "Meet Again: Bertemu Lagi",
  sumber: "Metode global: Meet Again (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Cara 3: Meet Again"), ...lantai("lt", 150)),
      tambah("Meet", emo("pg", 110, 112, E.ulang, 40)),
      tambah("Bertemu", teks("nm", 150, 140, "Bertemu Lagi", 13, W.ungu, { z: 3 }), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_U2,
      hapus(0, "pg", "nm", "kl"),
      tambah(0, papan("dp", 10, 28, 280, 114), sumbu("jl", JALUR), ...penanda("t0", JALUR, 0, W.merah)),
      tambah("waktu", loncengJalur("b0", JALUR, 0), loncengJalur("b12", JALUR, 12), ...penanda("t12", JALUR, 12, W.merah)),
      tambah("jarak", panah("jr", xJalur(JALUR, 0) + 4, 86, lebar12 - 8, 0, W.merah, 2.4, { z: 4 }), teks("jk", 62, 76, "jarak = KPK", 10, W.merah, { z: 3 })),
      tambah("dua", teks("n2", 240, 48, "2 kali bertemu", 9, W.ungu, { z: 3 })),
    ),
    k(
      SUARA_U3,
      tambah("hari", teks("hi", 36, 138, "hari ini", 10, W.hijauTua, { z: 3 })),
      tambah("berikutnya", teks("bk", 104, 138, "berikutnya", 10, W.hijauTua, { z: 3 })),
      sorotkan("KPK", "jr"),
    ),
    k(
      SUARA_U4,
      tambah("datang", loncengJalur("b24", JALUR, 24), ...penanda("t24", JALUR, 24, W.merah)),
      tambah("jarak", panah("jr2", xJalur(JALUR, 12) + 4, 86, lebar12 - 8, 0, W.merah, 2.4, { z: 4 })),
      tambah("sama", loncengJalur("b36", JALUR, 36), ...penanda("t36", JALUR, 36, W.merah), panah("jr3", xJalur(JALUR, 24) + 4, 86, lebar12 - 8, 0, W.merah, 2.4, { z: 4 })),
    ),
  ],
};

/* ------------------------------ Meet Again: terapan ------------------------------ */
const SUARA_E1 = "Fajar berenang tiap tiga hari, dan Citra berenang tiap empat hari.";
const SUARA_E2 = "Bima mencari KPK tiga dan empat, hasilnya dua belas.";
const SUARA_E3 = "Cocok untuk jadwal yang berulang, karena kita langsung tahu kapan mereka bertemu lagi.";
const SUARA_E4 = "Kurang cocok untuk daftar kelipatan saja, karena tidak ada kegiatan yang terjadi berulang.";

const EA = deret("ea", 14, 56, [3, 6, 9, 12, 15, 18], W.jingga);
const EB = deret("eb", 14, 104, [4, 8, 12, 16, 20, 24], W.tosca);

export const ADEGAN_LUAR_ULANG_TERAPAN: AdeganStory = {
  id: "luar-ulang-terapan",
  judul: "Jadwal Fajar dan Citra",
  sumber: "Metode global: Meet Again (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Jadwal Fajar dan Citra"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fa", 60, 184, "Fajar"), emo("sw1", 60, 90, RENANG, 26)),
      tambah("tiga", teks("f3", 60, 122, "tiap 3 hari", 11, W.merah, { z: 3 })),
      tambah("Citra", ...tokoh("ci", 200, 184, "Citra"), emo("sw2", 200, 90, RENANG, 26)),
      tambah("empat", teks("c4", 200, 122, "tiap 4 hari", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Bima Mencari KPK"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tokoh("bi", 36, 184, "Bima")),
      tambah("tiga", labelDeret("la", 14, 56, "Kelipatan 3"), ...EA),
      tambah("empat", labelDeret("lb", 14, 104, "Kelipatan 4"), ...EB),
      tambah("hasilnya", teks("kk", 244, 130, "KPK 3 dan 4 = 12", 11, W.merah, { z: 3 })),
      tambah("belas", cincin("r12a", 14, 56, 3), cincin("r12b", 14, 104, 2)),
    ),
    k(
      SUARA_E3,
      tambah("Cocok", emo("jp", 262, 80, E.jempol, 22)),
      tambah("berulang", emo("ul", 262, 52, E.ulang, 20)),
      tambah("kapan", teks("kp", 250, 108, "bertemu lagi", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_E4,
      hapus(0, "jp", "ul", "kp"),
      tambah("Kurang", emo("xs", 262, 80, E.salah, 22)),
      tambah("saja", teks("sj", 250, 52, "daftar saja", 10, W.merah, { z: 3 })),
      tambah("kegiatan", teks("kg", 250, 108, "tanpa kegiatan", 9, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Tarno, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Bilangan kecil, pakai Daftar Keduanya. Mencari yang terkecil, pakai Cari yang Sama. Jadwal berulang, pakai Bertemu Lagi.";
const SUARA_R3 = "Apa pun caranya, KPK harus habis dibagi oleh kedua bilangan semula.";
const SUARA_R4 = "Menurutmu, untuk bilangan lima dan tujuh, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga cara Pak Tarno",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Pak Tarno"), ...lantai("lt", 150)),
      tambah("Tarno", ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("Tiga", teks("n3", 262, 50, "3 cara", 10, W.ungu, { z: 3 })),
      tambah("pelajari", ...kartu("r0", 20, 42, 160, 30, W.jingga, ["List Both"], 11), emo("i0", 196, 57, E.memo, 18)),
      tambah("masing", ...kartu("r1", 20, 80, 160, 30, W.tosca, ["Spot the Match"], 11), emo("i1", 196, 95, E.cari, 18)),
      tambah("tepat", ...kartu("r2", 20, 118, 160, 30, W.krem, ["Meet Again"], 11), emo("i2", 196, 133, E.ulang, 18)),
    ),
    k(
      SUARA_R2,
      sorotkan("Daftar", "r0-k"),
      tambah("kecil", teks("u0", 252, 64, "bilangan kecil", 9, W.hijauTua, { z: 3 })),
      redamkan("Cari", "r0-k"),
      sorotkan("Cari", "r1-k"),
      tambah("terkecil", teks("u1", 252, 98, "mencari terkecil", 9, W.hijauTua, { z: 3 })),
      redamkan("Bertemu", "r1-k"),
      sorotkan("Bertemu", "r2-k"),
      tambah("berulang", teks("u2", 252, 136, "jadwal berulang", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("KPK Habis Dibagi"), ...lantai("lt", 150)),
      tambah("KPK", ...kartu("k12", 120, 40, 60, 30, W.hijauMuda, ["12"], 16)),
      tambah("habis", teks("b4", 60, 100, "12 : 4 = 3", 12, W.biru, { z: 3 }), teks("b6", 240, 100, "12 : 6 = 2", 12, W.biru, { z: 3 })),
      tambah("kedua", teks("sd", 150, 130, "habis tanpa sisa", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Lima dan Tujuh"), ...lantai("lt", 150), ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("lima", ...kartu("q5", 70, 54, 60, 44, W.jingga, ["5"], 22)),
      tambah("tujuh", ...kartu("q7", 170, 54, 60, 44, W.tosca, ["7"], 22)),
      tambah("cara", emo("tn", 150, 136, E.tanya, 30)),
      tambah("cepat", teks("cp", 150, 116, "cara mana?", 11, W.merah, { z: 3 })),
    ),
  ],
};

