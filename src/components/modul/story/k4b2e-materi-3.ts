import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, halaman, panah, papanPameran, teks, tokoh } from "./k4b2e-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b2e-bantu";
import { taliLampion } from "./k4b2e-materi-1";

/*
 * Cerita orisinal IGIL "Papan Pameran Bu Tuti" (Kelas 4 Bab 2 Sub-Bab E), akhir cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2e.md. Bagian ini: persen ke desimal, Satria mencoba lagi dengan menggeser koma, dan penutup bab (semua tamu dan tokoh hadir).
 */

/* ------------------------------ 7. Persen ke desimal ------------------------------ */
const SUARA_K1 = "Bu Tuti menulis empat puluh persen di papan dan minta diubah menjadi desimal.";
const SUARA_K2 = "Empat puluh persen berarti empat puluh per seratus, atau nol koma empat nol.";
const SUARA_K3 = "Genta menulisnya nol koma empat, karena nol di ujung tidak mengubah besarnya.";

export const ADEGAN_KEMBALI: AdeganStory = {
  id: "kembali",
  judul: "Empat puluh persen menjadi desimal",
  sumber: "Materi: persen ke desimal",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Persen ke Desimal"), ...halaman("hl", 150), ...tokoh("bt", 36, 184, "Bu Tuti"), ...papanPameran("pp", 80, 36, 200, 96, "PAPAN PAMERAN", 150, 10)),
      tambah("empat", teks("p40", 180, 88, "40%", 30, W.merah)),
      tambah("minta", teks("tn", 180, 116, "diubah menjadi desimal?", 9, W.coklat)),
      tambah("desimal", emo("tq", 262, 100, E.tanya, 20)),
    ),
    k(
      SUARA_K2,
      hapus(0, "tn", "tq"),
      ubah("Empat", { id: "p40", x: 100, y: 92, u: 20 }),
      tambah("berarti", teks("e1", 134, 92, "=", 18, W.biru)),
      tambah("seratus", teks("fa", 168, 84, "40", 14, W.biru), garis("fg", 152, 90, 32, 0, W.biru, 2), teks("fb", 168, 106, "100", 14, W.biru)),
      tambah("atau", teks("e2", 204, 92, "=", 18, W.biru)),
      tambah("koma", teks("dm", 246, 92, "0,40", 18, W.merah)),
    ),
    k(
      SUARA_K3,
      tambah(0, ...tokoh("ge", 262, 184, "Genta")),
      ubah("empat", { id: "dm", isi: "0,4" }),
      tambah("ujung", teks("nj", 200, 124, "nol di ujung boleh dibuang", 9, W.coklat)),
      tambah("besarnya", emo("ok", 262, 74, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 8. Satria mencoba lagi ------------------------------ */
const SUARA_U1 = "Satria mencoba lagi dan menulis nol koma enam sebagai enam puluh persen.";
const SUARA_U2 = "Kali ini ia menggeser koma dua tempat ke kanan lalu menambahkan tanda persen.";
const SUARA_U3 = "Bu Tuti bertepuk tangan, karena papan pameran sudah benar.";

export const ADEGAN_ULANG: AdeganStory = {
  id: "ulang",
  judul: "Satria menggeser koma dua tempat",
  sumber: "Materi: geser koma dua tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Satria Mencoba Lagi"), ...halaman("hl", 150), ...tokoh("sa", 36, 184, "Satria"), ...papanPameran("pp", 80, 36, 200, 96, "PAPAN PAMERAN", 150, 10)),
      tambah("nol", teks("d6", 130, 90, "0,6", 24, W.biru)),
      tambah("sebagai", teks("sm", 172, 90, "=", 20, W.biru)),
      tambah("puluh", teks("e60", 220, 90, "60%", 24, W.hijauTua)),
    ),
    k(
      SUARA_U2,
      tambah("menggeser", panah("gs", 112, 112, 76, 0, W.merah, 2.4, { z: 4 })),
      tambah("dua", teks("n2", 150, 130, "2 tempat", 11, W.merah)),
      tambah("kanan", teks("kn", 150, 104, "ke kanan", 9, W.coklat)),
      sorotkan("tanda", "e60"),
    ),
    k(
      SUARA_U3,
      hapus(0, "gs", "n2", "kn"),
      tambah("Tuti", ...tokoh("bt", 262, 184, "Bu Tuti")),
      tambah("bertepuk", emo("tp", 226, 150, E.tepuk, 22)),
      tambah("benar", emo("ok", 262, 96, E.benar, 20), teks("tg", 150, 122, "papan sudah benar", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_N1 = "Malam pameran tiba, dan Bu Wulan, Pak Joyo, Kak Sekar, serta Pak Bagas ikut meramaikan sanggar.";
const SUARA_N2 = "Pecahan, desimal, dan persen ternyata tiga cara menulis satu hal yang sama.";
const SUARA_N3 = "Menurutmu, berapa persen kain yang terjual kalau papan menunjukkan nol koma delapan? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Tuti!";
/** Tamu baris pertama (y = 146): x = 36, 100, 164, 228, dan Bu Tuti di x = 276. Tokoh baris kedua (y = 182): Satria, Laras, Genta, Pak Hendro di x = 36, 100, 164, 228. */
const X_TAMU = [36, 100, 164, 228, 276];
const orang = (id: string, x: number, y: number, e: string, nama: string) => [emo(id, x, y, e, 22), teks(`${id}-n`, x, y + 12, nama, 8, W.ungu, { z: 3 })];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Malam pameran di sanggar",
  sumber: "Materi: penutup dan perayaan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Malam Pameran"), ...halaman("hl", 150), ...taliLampion("nl", 44, 6, true)),
      tambah("Wulan", ...orang("tu1", X_TAMU[0], 146, E.bu, "Bu Wulan")),
      tambah("Joyo", ...orang("tu2", X_TAMU[1], 146, E.pak, "Pak Joyo")),
      tambah("Sekar", ...orang("tu3", X_TAMU[2], 146, E.bu, "Kak Sekar")),
      tambah("Bagas", ...orang("tu4", X_TAMU[3], 146, E.pak, "Pak Bagas")),
      tambah("sanggar", garis("sb", 40, 64, 220, 0, W.merah, 1), teks("sp", 150, 78, "PAMERAN BATIK KAMPUNG MEKAR", 10, W.merah), garis("sb2", 40, 86, 220, 0, W.merah, 1)),
    ),
    k(
      SUARA_N2,
      tambah("Pecahan", ...kartu("c1", 20, 98, 76, 28, W.krem, ["75/100"], 12)),
      tambah("dan", ...kartu("c2", 112, 98, 76, 28, W.hijauMuda, ["0,75"], 12)),
      tambah("persen", ...kartu("c3", 204, 98, 76, 28, W.pink, ["75%"], 12)),
      tambah("tiga", teks("n3", 80, 95, "3 cara", 9, W.ungu)),
      tambah("satu", teks("n1", 220, 95, "1 hal", 9, W.ungu)),
      tambah("sama", teks("s1", 104, 114, "=", 14, W.biru), teks("s2", 196, 114, "=", 14, W.biru)),
    ),
    k(
      SUARA_N3,
      hapus(0, "c1-k", "c1-t0", "c2-k", "c2-t0", "c3-k", "c3-t0", "n3", "n1", "s1", "s2"),
      tambah("Menurutmu", emo("tn", 262, 106, E.tanya, 22)),
      tambah("menunjukkan", teks("q8", 150, 112, "0,8", 26, W.biru)),
      tambah("delapan", teks("qq", 190, 112, "?", 26, W.merah)),
      tambah("Terima", ...X_TAMU.slice(0, 5).map((x, i) => emo(`wv${i}`, x, 128, E.lambai, 16))),
      tambah("Satria", ...orang("tk1", X_TAMU[0], 182, E.satria, "Satria")),
      tambah("Laras", ...orang("tk2", X_TAMU[1], 182, E.laras, "Laras")),
      tambah("Genta", ...orang("tk3", X_TAMU[2], 182, E.genta, "Genta")),
      tambah("Hendro", ...orang("tk4", X_TAMU[3], 182, E.pak, "Pak Hendro")),
      tambah("Tuti", ...orang("tu5", X_TAMU[4], 146, E.bu, "Bu Tuti")),
    ),
  ],
};
