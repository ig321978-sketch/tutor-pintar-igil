import type { AdeganStory } from "./logika-story";
import { E, K, W, emo, judul, kartu, panah, papanTulis, pecahan, teks, tokoh } from "./k4b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b2c-bantu";

/*
 * Cerita orisinal IGIL "Meja Jahit Kak Sekar" (Kelas 4 Bab 2 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2c.md. Bagian ini: Multiply by One (Kali Bentuk Satu), Divide Both (Bagi Keduanya), terapannya, dan ringkasan.
 */

/* ------------------------------ Multiply by One: konsep ------------------------------ */
const SUARA_K1 = "Cara kedua, Multiply by One, atau Kali Bentuk Satu.";
const SUARA_K2 = "Pecahan seperti dua per dua atau tiga per tiga besarnya sama dengan satu.";
const SUARA_K3 = "Mengalikan sebuah pecahan dengan bentuk satu tidak mengubah besarnya.";
const SUARA_K4 = "Hasilnya, pembilang dan penyebut sama-sama dikalikan dengan bilangan yang sama.";
const K2A = pecahan("fa", 90, 90, 2, 2, 24, K.kapur);
const K2B = pecahan("fb", 210, 90, 3, 3, 24, K.kapur);
const K3A = pecahan("pa", 44, 90, 3, 5, 24, K.kapur);
const K3B = pecahan("pb", 130, 90, 2, 2, 24, K.kapur);
const K3C = pecahan("pc", 222, 90, 6, 10, 24, K.kapur);
const K4A = pecahan("qa", 80, 92, 3, 5, 30, K.kapur);
const K4B = pecahan("qc", 220, 92, 6, 10, 30, K.kapur);

export const ADEGAN_LUAR_KALI: AdeganStory = {
  id: "luar-kali",
  judul: "Multiply by One: Kali Bentuk Satu",
  sumber: "Metode global: Multiply by One (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cara 2: Multiply by One"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Multiply", teks("nm", 150, 62, "Multiply by One", 13, K.kapurMerah)),
      tambah("Kali", teks("ni", 150, 84, "Kali Bentuk Satu", 11, K.kapur)),
      tambah("Satu.", teks("b1", 150, 118, "bentuk 1", 12, K.kapurBiru)),
    ),
    k(
      SUARA_K2,
      hapus(0, "nm", "ni", "b1"),
      tambah("dua", K2A[0]),
      tambah("per", K2A[1]),
      tambah("dua@2", K2A[2]),
      tambah("tiga", K2B[0]),
      tambah("per@2", K2B[1]),
      tambah("tiga@2", K2B[2]),
      tambah("sama", teks("e1", 130, 96, "= 1", 16, K.kapurMerah)),
      tambah("satu.", teks("e2", 252, 96, "= 1", 16, K.kapurMerah)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Cara 2: Multiply by One"), ...papanTulis("pt", 8, 28, 284, 132), ...K3A, teks("tk", 84, 94, "×", 18, K.kapurMerah)),
      tambah("bentuk", ...K3B, teks("lb", 130, 132, "bentuk 1", 10, K.kapurBiru)),
      tambah("mengubah", teks("eq", 176, 94, "=", 18, K.kapurMerah), ...K3C),
      tambah("besarnya.", emo("ok", 262, 140, E.benar, 20)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Kali Sama"), ...papanTulis("pt", 8, 28, 284, 132), ...K4A),
      tambah("penyebut", panah("ar", 112, 92, 76, 0, K.kapurMerah, 2), teks("t1", 150, 64, "×2", 14, K.kapurMerah)),
      tambah("dikalikan", teks("t2", 150, 124, "×2", 14, K.kapurMerah)),
      tambah("sama.", ...K4B),
    ),
  ],
};

/* ------------------------------ Multiply by One: terapan ------------------------------ */
const SUARA_L1 = "Genta mau menulis satu per tiga dalam bentuk per dua belas.";
const SUARA_L2 = "Ia mengalikan pembilang dan penyebut dengan empat, sehingga menjadi empat per dua belas.";
const SUARA_L3 = "Cocok untuk membuat penyebut baru yang kita inginkan.";
const SUARA_L4 = "Kurang cocok kalau yang dikalikan hanya pembilang atau hanya penyebut, karena besarnya berubah.";
const LA = pecahan("pa", 90, 90, 1, 3, 26, K.kapur);
const LQ = pecahan("pq", 220, 90, "?", 12, 26, K.kapur);
const LW = pecahan("pw", 220, 90, 4, 3, 26, K.kapur);

export const ADEGAN_LUAR_KALI_TERAPAN: AdeganStory = {
  id: "luar-kali-terapan",
  judul: "Kali Bentuk Satu: kapan cocok",
  sumber: "Metode global: Multiply by One (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kali Bentuk Satu Genta"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("ge", 40, 184, "Genta")),
      tambah("satu", LA[0]),
      tambah("per", LA[1]),
      tambah("tiga", LA[2]),
      tambah("bentuk", teks("eq", 156, 94, "=", 20, K.kapurMerah), LQ[0], LQ[1]),
      tambah("belas.", LQ[2]),
    ),
    k(
      SUARA_L2,
      tambah("pembilang", teks("t1", 156, 66, "×4", 14, K.kapurMerah)),
      tambah("penyebut", teks("t2", 156, 118, "×4", 14, K.kapurMerah)),
      ubah("menjadi", { id: "pq-p", isi: "4", warna: K.kapurMerah }),
      sorotkan("menjadi", "pq-q"),
    ),
    k(
      SUARA_L3,
      hapus(0, "t1", "t2"),
      tambah(0, emo("ok", 262, 142, E.benar, 20)),
      sorotkan("penyebut", "pq-q"),
      tambah("baru", teks("pb", 150, 140, "penyebut baru", 11, K.kapurBiru)),
    ),
    k(
      SUARA_L4,
      hapus(0, "ok", "pb", "pq-p", "pq-g", "pq-q"),
      tambah(0, emo("xs", 262, 142, E.salah, 20)),
      tambah("pembilang", ...LW, teks("t3", 156, 66, "×4", 14, K.kapurMerah)),
      tambah("berubah.", teks("bb", 150, 140, "besar berubah", 11, K.kapurMerah)),
    ),
  ],
};

/* ------------------------------ Divide Both: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Divide Both, atau Bagi Keduanya.";
const SUARA_B2 = "Kita membagi pembilang dan penyebut dengan bilangan yang sama, yang bisa membagi habis keduanya.";
const SUARA_B3 = "Hasilnya pecahan yang lebih sederhana, dengan besar yang tetap sama.";
const SUARA_B4 = "Kita berhenti kalau sudah tidak ada bilangan lain yang membagi habis keduanya.";
const BA = pecahan("pa", 70, 92, 12, 16, 26, K.kapur);
const BC = pecahan("pc", 230, 92, 3, 4, 26, K.kapur);
const BD = pecahan("pd", 150, 92, 3, 4, 40, K.kapur);

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Divide Both: Bagi Keduanya",
  sumber: "Metode global: Divide Both (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Divide Both"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Divide", teks("nm", 150, 62, "Divide Both", 13, K.kapurMerah)),
      tambah("Bagi", teks("ni", 150, 84, "Bagi Keduanya", 11, K.kapur)),
      tambah("Keduanya.", emo("ik", 150, 134, "\u{2797}", 26)),
    ),
    k(
      SUARA_B2,
      hapus(0, "nm", "ni", "ik"),
      tambah(0, ...BA),
      tambah("pembilang", teks("t1", 136, 76, "÷4", 14, K.kapurMerah)),
      tambah("penyebut", teks("t2", 136, 118, "÷4", 14, K.kapurMerah)),
      tambah("keduanya.", emo("ok", 150, 148, E.benar, 20)),
    ),
    k(
      SUARA_B3,
      hapus(0, "ok"),
      tambah("pecahan", panah("ar", 104, 92, 90, 0, K.kapurMerah, 2)),
      tambah("sederhana,", ...BC),
      tambah("besar", teks("eq", 150, 140, "besar tetap", 10, K.kapurBiru)),
      sorotkan("sama.", "pc-p", "pc-q"),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Berhenti"), ...papanTulis("pt", 8, 28, 284, 132), ...BD),
      tambah("berhenti", emo("st", 60, 100, E.tangan, 24)),
      tambah("tidak", teks("tb", 150, 142, "tidak bisa dibagi lagi", 10, K.kapurMerah)),
      tambah("keduanya.", emo("ok", 250, 100, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Divide Both: terapan ------------------------------ */
const SUARA_M1 = "Satria menyederhanakan delapan per dua belas dengan membagi keduanya dengan empat.";
const SUARA_M2 = "Hasilnya dua per tiga, dan angka dua serta tiga tidak bisa dibagi lagi bersama.";
const SUARA_M3 = "Cocok untuk menulis jawaban dalam bentuk paling sederhana.";
const SUARA_M4 = "Kurang cocok kalau kita ingin penyebut yang lebih besar, karena yang kita lakukan justru memperkecil.";
const MA = pecahan("pa", 80, 90, 8, 12, 26, K.kapur);
const MC = pecahan("pc", 230, 90, 2, 3, 26, K.kapur);

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Bagi Keduanya: kapan cocok",
  sumber: "Metode global: Divide Both (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Bagi Keduanya Satria"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("sa", 40, 184, "Satria")),
      tambah("delapan", MA[0]),
      tambah("per", MA[1]),
      tambah("dua", MA[2]),
      tambah("membagi", panah("ar", 112, 90, 80, 0, K.kapurMerah, 2)),
      tambah("empat.", teks("t1", 146, 70, "÷4", 14, K.kapurMerah), teks("t2", 146, 116, "÷4", 14, K.kapurMerah)),
    ),
    k(
      SUARA_M2,
      tambah("dua", MC[0]),
      tambah("per", MC[1]),
      tambah("tiga,", MC[2]),
      tambah("tidak", emo("st", 262, 60, E.tangan, 20)),
      tambah("bersama.", teks("tb", 150, 140, "tidak bisa dibagi lagi", 10, K.kapurMerah)),
    ),
    k(
      SUARA_M3,
      hapus(0, "st", "tb"),
      tambah(0, emo("ok", 262, 140, E.benar, 20)),
      tambah("jawaban", teks("jw", 150, 140, "jawaban akhir", 11, K.kapurBiru)),
      sorotkan("sederhana.", "pc-p", "pc-q"),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok", "jw", "ar", "t1", "t2", "pa-p", "pa-g", "pa-q", "pc-p", "pc-g", "pc-q"),
      tambah(0, emo("xs", 262, 140, E.salah, 20)),
      tambah("penyebut", teks("pb", 150, 60, "penyebut lebih besar?", 11, K.kapur)),
      tambah("justru", teks("tj", 150, 100, "12 jadi 3", 16, K.kapurMerah)),
      tambah("memperkecil.", emo("tr", 150, 128, "\u{1F53B}", 20)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Kak Sekar. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin melihat alasannya dengan gambar, pakai Cocokkan Daerah. Ingin penyebut yang lebih besar, pakai Kali Bentuk Satu.";
const SUARA_R3 = "Ingin pecahan yang paling sederhana, pakai Bagi Keduanya. Apa pun caranya, lakukan hal yang sama pada pembilang dan penyebut.";
const SUARA_R4 = "Menurutmu, untuk menyederhanakan sepuluh per lima belas, cara mana yang paling pas?";
const KARTU_CARA = ["Cocokkan Daerah", "Kali Bentuk Satu", "Bagi Keduanya"];
const RQ = pecahan("rq", 150, 80, 10, 15, 32, W.biru);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan"), teks("n3", 150, 36, "3 cara", 10, W.ungu), ...KARTU_CARA.flatMap((c, i) => kartu(`r${i}`, 14 + i * 92, 44, 88, 40, ["#DBEAFE", "#DCFCE7", "#FEF9C3"][i], [c], 8))),
      tambah("Kak", ...tokoh("ks", 40, 184, "Kak Sekar")),
      tambah("pas", emo("tq", 150, 140, E.tanya, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq"),
      sorotkan("Cocokkan", "r0-k"),
      tambah("Daerah.", emo("ok1", 58, 108, E.benar, 18)),
      tambah("Kali", teks("b1", 150, 104, "bentuk 1", 9, W.hijauTua)),
      sorotkan("Kali", "r1-k"),
      tambah("Satu.", emo("ok2", 150, 120, E.benar, 18)),
    ),
    k(
      SUARA_R3,
      hapus(0, "b1"),
      ubah(0, { id: "r0-k", sorot: false }, { id: "r1-k", sorot: false }),
      sorotkan("Bagi", "r2-k"),
      tambah("Keduanya.", emo("ok3", 242, 108, E.benar, 18)),
      tambah("sama", teks("sm", 150, 150, "kerjakan sama", 10, W.biru)),
      tambah("penyebut.", teks("sk", 150, 166, "pada keduanya", 10, W.biru)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Satu Cara"), ...tokoh("ks", 40, 184, "Kak Sekar")),
      tambah("sepuluh", RQ[0]),
      tambah("per", RQ[1]),
      tambah("lima", RQ[2]),
      tambah("pas?", teks("tq2", 150, 150, "?", 36, W.merah)),
    ),
  ],
};
