import type { AdeganStory } from "./logika-story";
import { E, JENIS, W, bintang, centang, emo, jalan, judul, kartu, kotakCerita, lembar, mobil, orang, panah, papanKapur, selAngka, tabel, teks, xLembar } from "./k1b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b8B-bantu";

/*
 * Cerita orisinal IGIL "Cerita Kesukaan Anak Kampung" (Kelas 1 Bab 8 Sub-Bab B), akhir cerita Perpustakaan Keliling.
 * Naskah suara dari naskah/story-naskah-k1b8b.md. Bagian ini: masalah mobil yang hanya muat satu jenis, bertanya dengan lembar centang, dan tabel.
 */

/* ------------------------------ 1. Mobil hanya muat satu jenis ------------------------------ */
const SUARA_M1 = "Rak mobil pustaka sudah rapi, tetapi Pak Pos Pustaka punya masalah baru.";
const SUARA_M2 = "Minggu depan mobilnya hanya muat satu jenis kotak cerita tambahan. Kalau salah pilih, anak-anak kecewa.";
const SUARA_M3 = "Igil mengangkat tangan. Pilih dinosaurus! Kaka menyahut, itu kesukaanmu saja.";

export const ADEGAN_MUAT_SEDIKIT: AdeganStory = {
  id: "muat-sedikit",
  judul: "Mobil pustaka hanya muat satu jenis",
  sumber: "Materi: masalah memilih satu jenis kotak cerita",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Masalah baru Pak Pos"), jalan("jl", 166)),
      tambah("mobil", ...mobil("mb", 20, 100, 150)),
      tambah("rapi,", ...[0, 1, 2, 3].flatMap((i) => kotakCerita(`ck${i}`, 26 + i * 24, 126, 20, i))),
      tambah("Pak", ...orang("pp", 232, 148, E.pria, "Pak Pos")),
      tambah("masalah", emo("tn", 264, 118, E.tanya, 24)),
    ),
    k(
      SUARA_M2,
      hapus(0, "tn"),
      tambah("satu", ...kartu("mj", 186, 44, 106, 40, W.krem, ["muat 1 jenis", "kotak tambahan"], 8.6)),
      tambah("anak-anak", emo("an0", 196, 190, E.anak, 20), emo("an1", 262, 190, E.anak, 20)),
      ubah("kecewa.", { id: "an0", isi: E.kecewa }, { id: "an1", isi: E.kecewa }),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Empat jenis cerita")),
      tambah("Igil", ...orang("ig", 50, 150, E.igil, "Igil")),
      tambah("tangan.", emo("tg", 78, 138, E.tangan, 22), ...papanKapur("pk", 50, 28, 200, 76), ...JENIS.flatMap((j, i) => [...kotakCerita(`ck${i}`, 64 + i * 46, 38, 34, i), teks(`pl${i}`, 81 + i * 46, 94, j.nama, 7.4, W.putih)])),
      sorotkan("dinosaurus!", "ck0"),
      tambah("Kaka", ...orang("kk", 250, 150, E.kaka, "Kaka")),
      tambah("kesukaanmu", ...kartu("kj", 96, 124, 130, 22, W.merahMuda, ["itu kesukaanmu saja"], 8.2)),
    ),
  ],
};

/* ------------------------------ 2. Bertanya dengan lembar centang ------------------------------ */
const SUARA_T1 = "Kaka mengusulkan bertanya kepada anak-anak kampung. Satu anak, satu jawaban.";
const SUARA_T2 = "Kaka mencatat dengan lembar centang. Setiap jawaban satu centang.";
const SUARA_T3 = "Anak yang pertama ganti jawaban di tengah, dan Igil sudah telanjur mencentang dua kali! Hapus satu, Igil, kata Kaka.";

export const ADEGAN_TANYA: AdeganStory = {
  id: "tanya",
  judul: "Bertanya dan mencentang",
  sumber: "Materi: satu anak satu jawaban, lembar centang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bertanya kepada anak-anak")),
      tambah("Kaka", ...orang("kk", 40, 76, E.kaka, "Kaka")),
      tambah("anak-anak", ...[0, 1, 2, 3].map((i) => emo(`an${i}`, 110 + i * 44, 140, E.anak, 24))),
      tambah("kampung.", jalan("jl", 156)),
      tambah("Satu", ...kartu("sj", 100, 44, 150, 26, W.krem, ["1 anak, 1 jawaban"], 10)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Lembar centang")),
      tambah("lembar", ...lembar("lb")),
      tambah("jawaban", centang("c0", 0, 0)),
      tambah("satu", ...kartu("sj", 70, 156, 160, 22, W.krem, ["1 jawaban = 1 centang"], 9)),
      tambah("centang@2", centang("c1", 2, 0), centang("c2", 1, 0)),
    ),
    k(
      SUARA_T3,
      tambah("Anak", ...orang("kk", 262, 84, E.kaka, "Kaka"), ...orang("ig", 38, 84, E.igil, "Igil")),
      tambah("mencentang", centang("c3", 3, 0), emo("kl", xLembar(3) + 20, 96, E.tanya, 16)),
      hapus("dua", "sj-k", "sj-t0"),
      tambah("dua", ...kartu("dk", 70, 156, 160, 22, W.merahMuda, ["2 centang, 1 anak!"], 9)),
      hapus("Hapus", "c3", "kl"),
      tambah("satu,", teks("hs", 250, 172, "hapus 1", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Dari lembar ke tabel ------------------------------ */
const SUARA_B1 = "Setelah semua anak ditanya, lembar centang dihitung ke dalam tabel.";
const SUARA_B2 = "Dinosaurus lima, robot empat, peri dua, dan sirkus empat.";
const SUARA_B3 = "Abang punya ide. Gambar saja, supaya mudah dibandingkan! Satu bintang mewakili satu anak.";

export const ADEGAN_KE_TABEL: AdeganStory = {
  id: "ke-tabel",
  judul: "Dari lembar centang ke tabel",
  sumber: "Materi: tabel jawaban dan ide diagram gambar",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Dari lembar ke tabel")),
      tambah("lembar", emo("lc", 80, 44, E.lembar, 22), ...kartu("kl", 100, 32, 100, 22, W.krem, ["lembar centang"], 9)),
      tambah("tabel.", panah("pn", 150, 56, 0, 8), ...tabel("tb")),
    ),
    k(
      SUARA_B2,
      tambah("Dinosaurus", teks("tj", 150, 150, "jumlah anak tiap jenis", 9.4, W.ungu)),
      tambah("lima,", selAngka("tb", 0, "5")),
      tambah("empat,", selAngka("tb", 1, "4")),
      tambah("dua,", selAngka("tb", 2, "2")),
      tambah("empat@2", selAngka("tb", 3, "4")),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Ide Abang")),
      tambah("Abang", ...orang("ab", 50, 110, E.abang, "Abang")),
      tambah("ide.", emo("ld", 88, 96, E.lampu, 22)),
      tambah("Satu", ...kartu("kb", 132, 72, 150, 40, W.krem, ["1 bintang = 1 anak"], 10), bintang("bs", 118, 92, 10)),
      tambah("anak.", bintang("bt", 150, 156, 10), teks("sm", 172, 161, "=", 16, W.merah), emo("an", 196, 156, E.anak, 26)),
    ),
  ],
};
