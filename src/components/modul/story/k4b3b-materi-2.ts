import type { AdeganStory } from "./logika-story";
import { E, W, bil, busur, emo, garis, judul, kain, kartu, kotak, lapangan, panggung, teks, tiang, tokoh } from "./k4b3b-gambar";
import { hapus, k, tambah, ubah } from "./k4b3b-bantu";

/*
 * Cerita orisinal IGIL "Barisan Kursi Pak Gunawan" (Kelas 4 Bab 3 Sub-Bab B), akhir cerita Orkestra Angklung Kampung Senandung.
 * Naskah suara dari naskah/story-naskah-k4b3b.md. Bagian ini: salah langkah Satria (beda dua belas, lima belas, delapan belas disebut enam), memeriksa beda dari dua bilangan yang berurutan,
 * dan taruhan memasang spanduk.
 */

const MIN = "−";

/* ------------------------------ 4. Salah langkah: beda enam ------------------------------ */
const SUARA_S1 = "Satria berseru, bedanya enam, karena delapan belas dikurangi dua belas hasilnya enam!";
const SUARA_S2 = "Laras menggeleng, tetapi Satria sudah terlalu yakin dan menepuk dada.";
const SUARA_S3 = "Kalau aku salah, aku memasang semua spanduk sendirian, katanya sambil melambaikan gulungan spanduk.";

export const ADEGAN_SALAH_BEDA: AdeganStory = {
  id: "salah-beda",
  judul: "Satria menyebut beda enam",
  sumber: "Materi: salah langkah Satria",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(
        0,
        judul("Tulisan Satria"),
        ...lapangan("lp", 150),
        kotak("pp", 50, 32, 200, 60, W.krem, W.coklat, { rx: 4, tebal: 2, z: 1 }),
        teks("n1", 100, 68, "12", 18, W.biru, { z: 2 }),
        teks("n2", 150, 68, "15", 18, W.biru, { z: 2 }),
        teks("n3", 200, 68, "18", 18, W.biru, { z: 2 }),
      ),
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("berseru", emo("sr", 60, 138, E.seru, 20)),
      tambah("bedanya", teks("d6", 150, 110, "beda : 6", 16, W.merah)),
      tambah("delapan", teks("sl", 150, 130, `18 ${MIN} 12`, 12, W.coklat)),
    ),
    k(
      SUARA_S2,
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("menggeleng", emo("xs", 230, 112, E.salah, 22)),
      tambah("yakin", emo("yk", 36, 146, E.yakin, 18)),
      tambah("menepuk", emo("tp", 112, 140, E.tepuk, 18)),
    ),
    k(
      SUARA_S3,
      tambah("salah", teks("tr", 150, 142, "taruhan : spanduk", 10, W.merah)),
      tambah("melambaikan", emo("lb", 258, 104, E.lambai, 20)),
      tambah("gulungan", kotak("gl", 238, 118, 44, 16, "#FEE2E2", W.merah, { rx: 6, z: 1 })),
    ),
  ],
};

/* ------------------------------ 5. Memeriksa beda ------------------------------ */
const SUARA_C1 = "Genta menunjukkan bahwa dua belas ke delapan belas itu dua langkah, bukan satu langkah.";
const SUARA_C2 = "Enam dibagi dua langkah berarti tiga untuk tiap langkah, dan beda yang benar adalah tiga.";
const SUARA_C3 = "Beda selalu dihitung dari dua bilangan yang berurutan, dan harus sama di setiap pasangan.";
const XC = [50, 150, 250];

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Genta memeriksa beda",
  sumber: "Materi: memeriksa beda",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Memeriksa Beda"), ...lapangan("lp", 150)),
      tambah("Genta", ...tokoh("ge", 36, 184, "Genta")),
      tambah("dua", ...bil("c0", XC[0], 100, "12")),
      tambah("delapan", ...bil("c2", XC[2], 100, "18")),
      tambah("dua@2", teks("l2", 150, 48, "2 langkah", 12, W.ungu)),
      tambah("langkah", ...bil("c1", XC[1], 100, "15"), ...busur("a0", XC[0], XC[1], 86, 22, "?"), ...busur("a1", XC[1], XC[2], 86, 22, "?")),
      tambah("satu", teks("nl", 150, 132, "bukan 1 langkah", 11, W.merah)),
    ),
    k(
      SUARA_C2,
      hapus(0, "nl"),
      tambah("Enam", teks("e6", 150, 32, `18 ${MIN} 12 = 6`, 12, W.coklat)),
      tambah("dibagi", teks("d3", 150, 132, "6 : 2 = 3", 13, W.biru)),
      ubah("tiga", { id: "a0-l", isi: "+3", warna: W.hijauTua }),
      ubah("tiga@2", { id: "a1-l", isi: "+3", warna: W.hijauTua }),
    ),
    k(
      SUARA_C3,
      hapus(0, "d3"),
      tambah("dua", teks("bb", 150, 128, "2 bilangan berurutan", 11, W.coklat)),
      tambah("sama", emo("o1", 100, 48, E.benar, 18), emo("o2", 200, 48, E.benar, 18)),
      tambah("pasangan", teks("ps", 150, 146, "semua pasangan sama", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 6. Menepati taruhan: spanduk ------------------------------ */
const SUARA_N1 = "Satria menepati taruhannya dan memasang spanduk panjang di sisi panggung.";
const SUARA_N2 = "Ia terbelit tali dan semua orang tertawa melihat spanduknya berlipat-lipat.";
const SUARA_N3 = "Laras mencatat, hitung beda dari dua bilangan yang berurutan, lalu periksa semua pasangan.";

export const ADEGAN_SPANDUK: AdeganStory = {
  id: "spanduk",
  judul: "Satria memasang spanduk",
  sumber: "Materi: menepati taruhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Memasang Spanduk"), ...lapangan("lp", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("memasang", ...tiang("sp", 70, 48, 220)),
      tambah("spanduk", ...kain("sp", 70, 48, 220, 26, "KONSER ANGKLUNG", 10)),
      tambah("panggung", ...panggung("pt", 150, 104, 130, "PANGGUNG")),
    ),
    k(
      SUARA_N2,
      tambah("terbelit", garis("tl1", 18, 156, 42, -8, W.coklat, 2.4, { z: 4 }), garis("tl2", 60, 150, -36, 14, W.coklat, 2.4, { z: 4 }), garis("tl3", 20, 172, 36, -12, W.coklat, 2.4, { z: 4 })),
      tambah("tertawa", ...tokoh("la", 84, 184, "Laras"), ...tokoh("ge", 132, 184, "Genta"), teks("ha", 232, 134, "ha ha ha", 12, W.merah), emo("tw", 232, 160, E.tawa, 22)),
      tambah("berlipat-lipat", garis("f1", 110, 48, 0, 26, W.merah, 1.4, { z: 3 }), garis("f2", 160, 48, 0, 26, W.merah, 1.4, { z: 3 }), garis("f3", 210, 48, 0, 26, W.merah, 1.4, { z: 3 })),
    ),
    k(
      SUARA_N3,
      tambah("mencatat", emo("cn", 124, 100, E.catat, 20)),
      tambah("hitung", ...kartu("h1", 10, 90, 100, 15, W.krem, ["hitung beda"], 9)),
      tambah("dua", ...kartu("h2", 10, 108, 100, 15, W.langit, ["2 bilangan"], 9)),
      tambah("periksa", ...kartu("h3", 10, 126, 100, 15, W.hijauMuda, ["periksa semua"], 9)),
    ),
  ],
};
