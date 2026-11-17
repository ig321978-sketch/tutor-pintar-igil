import type { AdeganStory } from "./logika-story";
import { E, W, WI, akuariumIsi, barisIkan, emo, garisPasang, garis, idIkan, judul, kartu, orang, spanduk, teks } from "./k1b5d-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5d-bantu";

/*
 * Cerita orisinal IGIL "Lapak Ikan Dibuka" (Kelas 1 Bab 5 Sub-Bab D, membandingkan dan mengurutkan bilangan), akhir cerita Akuarium Ikan Hias Abang.
 * Naskah suara dari naskah/story-naskah-k1b5d.md. Bagian ini: pembukaan lapak, dan pasangkan satu-satu (lebih banyak dan lebih sedikit).
 */

/* ------------------------------ 1. Pembukaan lapak ------------------------------ */
const SUARA_P1 = "Pagi yang ditunggu tiba! Spanduk lapak ikan dipasang di depan rumah, dan pembeli sudah berbaris. Abang gugup sekali.";
const SUARA_P2 = "Pak RT memesan ikan guppy, tetapi hanya mau dari akuarium yang isinya lebih banyak. Kalau salah pilih, pesanan Pak RT kurang.";
const SUARA_P3 = "Kata Kaka, kita bandingkan dulu isi akuarium. Pasangkan satu ikan dengan satu ikan.";

export const ADEGAN_PEMBUKAAN: AdeganStory = {
  id: "pembukaan",
  judul: "Pagi lapak ikan dibuka",
  sumber: "Materi: pembukaan lapak dan masalah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Lapak Ikan Dibuka")),
      tambah("Spanduk", ...spanduk("sp", 40, 40, 220, "LAPAK IKAN HIAS ABANG")),
      tambah("rumah,", emo("rm", 26, 112, E.rumah, 24)),
      tambah("pembeli", emo("q0", 70, 112, E.warga, 24), emo("q1", 108, 112, E.pria, 24)),
      tambah("berbaris.", emo("q2", 146, 112, E.wanita, 24), emo("q3", 184, 112, E.kakek, 24)),
      tambah("Abang", ...orang("ab", 250, 122, E.abang, "Abang")),
      tambah("gugup", emo("gg", 276, 100, E.pusing, 18)),
    ),
    k(
      SUARA_P2,
      hapus(0, "rm", "q0", "q1", "q2", "q3", "ab", "ab-n", "gg"),
      tambah("Pak", ...orang("pr", 40, 168, E.pakRT, "Pak RT")),
      tambah("guppy,", ...akuariumIsi("ag", 24, 68, 112, 48, 15, WI.guppy), teks("lg", 80, 129, "guppy", 9, W.biru)),
      tambah("akuarium", ...akuariumIsi("ak", 164, 68, 112, 48, 12, WI.koki), teks("lk", 220, 129, "koki", 9, W.biru)),
      tambah("banyak.", ...kartu("pl", 70, 136, 160, 20, W.krem, ["pilih yang lebih banyak"], 9)),
      tambah("salah", emo("sl", 150, 184, E.salah, 18)),
      tambah("kurang.", teks("kr", 218, 183, "pesanan kurang", 9, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, "sl", "kr"),
      tambah("Kaka", ...orang("kk", 262, 168, E.kaka, "Kaka")),
      tambah("bandingkan", garis("pg0", 138, 84, 24, 0, W.merah, 1.5, { gambar: true }), garis("pg1", 138, 92, 24, 0, W.merah, 1.5, { gambar: true }), garis("pg2", 138, 100, 24, 0, W.merah, 1.5, { gambar: true })),
      tambah("Pasangkan", ...kartu("pt", 70, 162, 160, 22, W.krem, ["1 ikan dengan 1 ikan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Pasangkan satu-satu ------------------------------ */
const SUARA_S1 = "Akuarium guppy berisi lima belas ikan, akuarium koki berisi dua belas. Kaka memasangkan satu guppy dengan satu koki, dengan garis.";
const SUARA_S2 = "Pasangan habis di dua belas. Tiga guppy tidak punya pasangan.";
const SUARA_S3 = "Jadi guppy lebih banyak, koki lebih sedikit. Lima belas lebih banyak daripada dua belas.";
const [S1_15, S1_12] = urutBilangan(SUARA_S1, [15, 12]);
const PASANGAN = garisPasang("pg", 12, 18, 18, 76, 110);

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan",
  judul: "Pasangkan satu ikan dengan satu ikan",
  sumber: "Materi: pasangkan satu-satu, lebih banyak",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Pasangkan satu ikan dengan satu ikan")),
      tambah(S1_15, ...barisIkan("g", 15, 18, 70, 18, WI.guppy, 0.55), teks("lg", 18, 50, "guppy: 15", 9.4, W.biru, { anchor: "start" })),
      tambah(S1_12, ...barisIkan("o", 12, 18, 116, 18, WI.koki, 0.55), teks("lo", 18, 140, "koki: 12", 9.4, W.biru, { anchor: "start" })),
      tambah("Kaka", ...orang("kk", 262, 176, E.kaka, "Kaka")),
      tambah("memasangkan", ...PASANGAN),
      tambah("satu", teks("ps", 130, 168, "1 guppy dengan 1 koki", 9.4, W.merah)),
    ),
    k(
      SUARA_S2,
      hapus(0, "ps"),
      tambah("Pasangan", teks("hb", 150, 160, "pasangan habis di 12", 9.4, W.merah)),
      tambah("Tiga", teks("sa", 252, 50, "sisa 3", 9.4, W.merah)),
      sorotkan("guppy", ...idIkan("g", 12, 14)),
    ),
    k(
      SUARA_S3,
      ubah("banyak,", { id: "lg", isi: "guppy: 15, lebih banyak", warna: W.hijau }),
      ubah("sedikit.", { id: "lo", isi: "koki: 12, lebih sedikit", warna: W.ungu }),
      tambah("Lima", teks("bd", 150, 188, "15 lebih banyak daripada 12", 9.4, W.biru)),
    ),
  ],
};
