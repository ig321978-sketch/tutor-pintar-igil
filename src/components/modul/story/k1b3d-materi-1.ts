import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, bulat, deret, deretEmo, emo, judul, kalimatC, kartu, kotak, label, modelBatang, orang, teks } from "./k1b3d-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b3d-bantu";

/*
 * Cerita orisinal IGIL "Tiba di Rumah Nenek" (Kelas 1 Bab 3 Sub-Bab D, soal cerita pengurangan), akhir cerita Kereta ke Rumah Nenek.
 * Masalah: di rumah Nenek tetangga bercerita sambil menanyakan hitungan; tiap cerita harus dibaca teliti supaya jawabannya tepat.
 * Penyelesaian: baca, lingkari bilangan, kotaki kata kunci, tulis kalimat pengurangan, jawab dengan kalimat lengkap, periksa dengan penjumlahan.
 */

/* ------------------------------ 1. Tiba di desa ------------------------------ */
const SUARA_S1 = "Kereta tiba di stasiun desa. Nenek sudah menunggu di peron dengan senyum lebar.";
const SUARA_S2 = "Di rumah Nenek, tetangga datang berkunjung. Mereka bercerita sambil menanyakan hitungan.";
const SUARA_S3 = "Masalahnya, setiap cerita punya pertanyaan berbeda. Igil harus membaca dengan teliti supaya jawabannya tepat.";

export const ADEGAN_TIBA: AdeganStory = {
  id: "tiba-desa",
  judul: "Tiba di desa Nenek",
  sumber: "Materi: masalah cerita hitungan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tiba di desa")),
      tambah("Kereta", emo("kr", 80, 84, E.kereta, 40)),
      tambah("stasiun", emo("st", 150, 84, E.stasiun, 34), teks("sd", 150, 114, "stasiun desa", 9, W.ungu)),
      tambah("Nenek", ...orang("nn", 240, 100, E.nenek, "Nenek")),
      tambah("senyum", emo("sy", 266, 70, E.senyum, 20)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Rumah Nenek")),
      tambah("rumah", emo("rm", 70, 90, E.rumah, 44)),
      tambah("tetangga", ...orang("tg", 220, 110, E.tetangga, "tetangga")),
      tambah("menanyakan", emo("tq", 250, 70, E.tanya, 22), ...kartu("ch", 140, 150, 140, 24, W.emas, ["cerita hitungan"], 10)),
    ),
    k(SUARA_S3, tambah("Igil", ...orang("ig", 40, 160, E.igil, "Igil")), tambah("membaca", emo("bc", 76, 150, E.baca, 22)), tambah("teliti", ...kartu("tl", 140, 180, 140, 18, W.hijauMuda, ["baca dengan teliti"], 9))),
  ],
};

/* ------------------------------ 2. Cerita kue Nenek ------------------------------ */
const SUARA_K1 = "Nenek bercerita. Aku punya enam kue dari Mamah. Dua kue kuberikan kepada tetangga. Berapa kue Nenek sekarang?";
const SUARA_K2 = "Igil melingkari bilangan enam dan dua, lalu mengotaki kata kuberikan. Kata itu berarti berkurang.";
const SUARA_K3 = "Kalimatnya enam dikurangi dua sama dengan empat. Jawabannya, kue Nenek tinggal empat.";
const SUARA_K4 = "Igil memeriksa: empat ditambah dua sama dengan enam. Cocok!";
const KUE = deret(6, 70, 32, 72);

export const ADEGAN_KUE: AdeganStory = {
  id: "cerita-kue",
  judul: "Cerita kue Nenek",
  sumber: "Materi: membaca cerita dan kata kunci",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cerita kue Nenek"), ...orang("nn", 36, 150, E.nenek, "Nenek")),
      tambah("enam", ...deretEmo(E.kue, "ku", KUE, 22)),
      tambah("tetangga.", ...orang("tg", 264, 150, E.tetangga, "tetangga")),
      ubah("kuberikan", { id: "ku4", op: 0.3 }, { id: "ku5", op: 0.3 }),
      tambah("Berapa", teks("tq", 150, 112, "berapa kue sekarang?", 10, W.merah)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Lingkari dan kotaki"), ...orang("ig", 36, 160, E.igil, "Igil")),
      tambah("bilangan", ...kartu("c6", 50, 60, 44, 30, W.putih, ["6"], 16), ...kartu("c2", 110, 60, 44, 30, W.putih, ["2"], 16), ...kartu("cb", 170, 60, 110, 30, W.putih, ["kuberikan"], 11)),
      tambah("enam", bulat("l6", 72, 75, 22, "transparent", W.merah, { tebal: 2.6, z: 1 })),
      tambah("dua,", bulat("l2", 132, 75, 22, "transparent", W.merah, { tebal: 2.6, z: 1 })),
      tambah("mengotaki", kotak("kk", 164, 54, 122, 42, "transparent", W.hijau, { rx: 2, tebal: 3, z: 1 })),
      tambah("berkurang.", ...label("bk", 120, 120, 150, `kuberikan: ${KURANG}`, W.merahMuda, 11)),
    ),
    k(
      SUARA_K3,
      tambah("Kalimatnya", ...kalimatC("kl", 190, 160, ["6", KURANG, "2", "=", "4"], 18, 26)),
      tambah("Jawabannya,", ...kartu("jw", 100, 178, 180, 20, W.emas, ["kue Nenek tinggal 4"], 10)),
    ),
    k(SUARA_K4, bersih(0), tambah(0, judul("Periksa jawaban"), ...orang("ig", 36, 120, E.igil, "Igil")), tambah("ditambah", ...kalimatC("k2", 170, 100, ["4", "+", "2", "=", "6"], 20, 28)), tambah("Cocok!", emo("ok", 170, 150, E.benar, 30))),
  ],
};

/* ------------------------------ 3. Cerita jeruk tetangga ------------------------------ */
const SUARA_J1 = "Tetangga membawa sepuluh jeruk. Setelah dibagikan, jeruknya tinggal tujuh. Berapa jeruk yang dibagikan?";
const SUARA_J2 = "Abang menggambar model batang. Batang utuh sepuluh, bagian tujuh, dan bagian yang dicari bertanda tanya.";
const SUARA_J3 = "Sepuluh dikurangi tujuh sama dengan tiga. Jadi, tiga jeruk dibagikan.";
const JERUK = deret(10, 33, 26, 64);

export const ADEGAN_JERUK: AdeganStory = {
  id: "cerita-jeruk",
  judul: "Cerita jeruk tetangga",
  sumber: "Materi: mencari yang berkurang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Cerita jeruk tetangga")),
      tambah("sepuluh", ...deretEmo(E.jeruk, "jr", JERUK, 20)),
      ubah("dibagikan,", { id: "jr7", op: 0.3 }, { id: "jr8", op: 0.3 }, { id: "jr9", op: 0.3 }),
      tambah("tinggal", teks("tl", 120, 92, "tinggal 7", 10, W.biru)),
      tambah("dibagikan@2", teks("tq", 236, 92, "dibagikan?", 10, W.merah)),
    ),
    k(SUARA_J2, tambah("model", ...modelBatang("mb", 40, 104, 220, 154, "10", "7", "?")), sorotkan("tanya.", "mb-tb")),
    k(SUARA_J3, tambah("Sepuluh", ...kalimatC("kl", 150, 186, ["10", KURANG, "7", "=", "3"], 16, 26)), ubah("tiga.", { id: "mb-tb", isi: "3", warna: W.biru, sorot: false })),
  ],
};
