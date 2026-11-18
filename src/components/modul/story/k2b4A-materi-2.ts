import type { AdeganStory } from "./logika-story";
import { E, W, anakBelakang, emo, garis, judul, kartu, karya, lantai, letakKarya, meja, panah, papanCatat, rak, teks, tokoh } from "./k2b4A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b4A-bantu";

/*
 * Cerita orisinal IGIL "Rak Pameran Pak Hasan" (Kelas 2 Bab 4 Sub-Bab A), awal cerita Pameran Kerajinan Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b4a.md. Bagian ini: salah kanan (salah langkah), kanan dan kiri sesuai pembaca, kata berlawanan.
 */

/* ------------------------------ 4. Salah kanan (salah langkah) ------------------------------ */
const SUARA_S1 = "Kartu keempat berbunyi, wayang kertas di sebelah kanan guci. Chacha cepat-cepat menaruhnya di sebelah kiri guci.";
const SUARA_S2 = "Dika menggeleng. Chacha, kanan dan kiri dihitung dari kita yang melihat, bukan dari gucinya!";
const SUARA_S3 = "Wayang yang digeser tersangkut di topi Nia, sehingga Nia tampak bertanduk. Semua tertawa!";

export const ADEGAN_SALAH_KANAN: AdeganStory = {
  id: "salah-kanan",
  judul: "Salah kanan",
  sumber: "Materi: salah kanan (salah langkah)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kanan atau Kiri?"), lantai("lt"), meja("mj", 80, 130, 140)),
      tambah("Kartu", ...kartu("k4", 62, 28, 176, 22, W.krem, ["wayang kertas di sebelah kanan guci"], 7.6)),
      tambah("kanan", teks("lk", 216, 104, "kanan", 10, W.hijau)),
      tambah("guci.", karya("gc", "guci", 150, 119)),
      tambah("Chacha", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("menaruhnya", karya("wy", "wayang", 60, 150)),
      ubah("kiri", { id: "wy", ...letakKarya("wayang", 88, 119) }),
      tambah("kiri", teks("lr", 88, 104, "kiri", 10, W.merah)),
    ),
    k(
      SUARA_S2,
      hapus(0, "k4-k", "k4-t0"),
      tambah("Dika", ...tokoh("dk", 266, 178, "Dika")),
      tambah("menggeleng.", emo("sx", 88, 90, E.salah, 18)),
      sorotkan("kanan", "lk"),
      tambah("kita", emo("mt", 150, 64, E.mata, 26)),
      sorotkan("gucinya!", "gc"),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Bertanduk!"), lantai("lt"), ...tokoh("ni", 150, 172, "Nia")),
      tambah("Wayang", karya("wy", "wayang", 60, 150)),
      ubah("tersangkut", { id: "wy", ...letakKarya("wayang", 150, 126) }),
      tambah("bertanduk.", garis("th1", 140, 146, -9, -12, W.coklat, 3), garis("th2", 160, 146, 9, -12, W.coklat, 3), teks("tt", 150, 100, "bertanduk", 10, W.merah)),
      tambah("Semua", ...tokoh("ch", 40, 178, "Chacha"), ...tokoh("dk", 262, 178, "Dika")),
      ubah("tertawa!", { id: "ch", isi: E.tertawa }, { id: "dk", isi: E.tertawa }),
    ),
  ],
};

/* ------------------------------ 5. Kanan dan kiri sesuai pembaca ------------------------------ */
const SUARA_K1 = "Nia punya cara. Ia berdiri membelakangi kita, menghadap rak.";
const SUARA_K2 = "Arahnya sama dengan kita, jadi kiri Nia sama dengan kiri kita, dan kanan Nia sama dengan kanan kita.";
const SUARA_K3 = "Sekarang wayang kertas ada di sebelah kanan guci, tepat sesuai kartu.";

export const ADEGAN_KANAN_KIRI: AdeganStory = {
  id: "kanan-kiri",
  judul: "Kanan dan kiri sesuai pembaca",
  sumber: "Materi: kanan dan kiri sesuai pembaca",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kanan dan Kiri"), lantai("lt")),
      tambah("Nia", ...anakBelakang("nb", 150, 146)),
      tambah("kita,", emo("mk", 272, 126, E.mata, 24)),
      tambah("menghadap", panah("hd", 150, 134, 0, -22, W.ungu, 3)),
      tambah("rak.", ...rak("rk", 84, 52, 132, 82), karya("gc", "guci", 110, 41), karya("wy", "wayang", 190, 41)),
    ),
    k(
      SUARA_K2,
      tambah("Arahnya", panah("ak", 262, 150, 0, -18, W.ungu, 2.6)),
      tambah("kiri", teks("kl", 108, 156, "kiri", 10, W.hijau)),
      tambah("kiri@2", teks("kl2", 36, 150, "kiri kita", 10, W.hijau)),
      tambah("kanan", teks("kn", 192, 156, "kanan", 10, W.merah)),
      tambah("kanan@2", teks("kn2", 258, 124, "kanan kita", 10, W.merah)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Sesuai Kartu"), lantai("lt"), meja("mj", 80, 130, 140)),
      tambah("wayang", karya("wy", "wayang", 214, 119)),
      tambah("kanan", teks("lk", 214, 104, "kanan", 10, W.hijau)),
      tambah("guci,", karya("gc", "guci", 150, 119)),
      tambah("tepat", emo("ok", 214, 152, E.benar, 20)),
      tambah("kartu.", ...kartu("k4", 62, 28, 176, 22, W.krem, ["wayang kertas di sebelah kanan guci"], 7.6)),
    ),
  ],
};

/* ------------------------------ 6. Kata berlawanan ------------------------------ */
const SUARA_L1 = "Dika menulis tiga pasang kata berlawanan: atas dengan bawah, depan dengan belakang, kanan dengan kiri.";
const SUARA_L2 = "Kalau wayang di sebelah kanan guci, berarti guci ada di sebelah kiri wayang.";
const SUARA_L3 = "Kata lawan membantu kita memeriksa.";

export const ADEGAN_BERLAWANAN: AdeganStory = {
  id: "berlawanan",
  judul: "Kata berlawanan",
  sumber: "Materi: kata berlawanan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kata Berlawanan"), ...papanCatat("pc", 40, 30, 220, 116)),
      tambah("Dika", ...tokoh("dk", 36, 178, "Dika")),
      tambah("tiga", teks("n3", 150, 50, "3 pasang", 11, W.merah)),
      tambah("atas", teks("p1a", 92, 78, "atas", 11)),
      tambah("bawah,", teks("p1b", 208, 78, "bawah", 11), panah("a1", 120, 74, 56, 0, W.ungu, 2.2), panah("b1", 176, 80, -56, 0, W.ungu, 2.2)),
      tambah("depan", teks("p2a", 92, 104, "depan", 11)),
      tambah("belakang,", teks("p2b", 208, 104, "belakang", 11), panah("a2", 120, 100, 56, 0, W.ungu, 2.2), panah("b2", 176, 106, -56, 0, W.ungu, 2.2)),
      tambah("kanan", teks("p3a", 92, 130, "kanan", 11)),
      tambah("kiri.", teks("p3b", 208, 130, "kiri", 11), panah("a3", 120, 126, 56, 0, W.ungu, 2.2), panah("b3", 176, 132, -56, 0, W.ungu, 2.2)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Kanan lalu Kiri"), lantai("lt"), meja("mj", 80, 130, 140)),
      tambah("wayang", karya("wy", "wayang", 214, 119)),
      tambah("kanan", teks("lk", 214, 104, "kanan", 10, W.hijau)),
      tambah("guci,", karya("gc", "guci", 150, 119)),
      tambah("berarti", panah("pk", 196, 148, -40, 0, W.ungu, 2.6)),
      tambah("kiri", teks("lr", 150, 104, "kiri", 10, W.merah)),
      sorotkan("wayang.@2", "wy"),
    ),
    k(
      SUARA_L3,
      hapus(0, "lk", "lr"),
      tambah("kata", panah("pb", 168, 156, 30, 0, W.ungu, 2.6)),
      tambah("membantu", ...tokoh("ch", 40, 178, "Chacha")),
      ubah("memeriksa.", { id: "ch", isi: E.senyum }),
      tambah("memeriksa.", emo("ok", 214, 152, E.benar, 20), emo("ok2", 150, 152, E.benar, 20)),
    ),
  ],
};
