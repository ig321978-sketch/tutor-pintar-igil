import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kepingUang, kotak, lembarUang, papanKecil, pasir, teks, tokoh, wadah } from "./k4b1d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b1d-bantu";

/*
 * Cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Kelas 4 Bab 1 Sub-Bab D), Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1d.md. Bagian ini: cara lain menguraikan, uang pembayaran yang diuraikan dengan lembar dan keping, dan penutup (jembatan ke Sub-Bab E).
 */

/* ------------------------------ 7. Cara lain ------------------------------ */
const SUARA_L1 = "Pak Darwis bertanya, apakah ada cara lain menguraikan bilangan itu?";
const SUARA_L2 = "Laras menjawab, bisa empat ribu ditambah seribu dua ratus tujuh puluh.";
const SUARA_L3 = "Bilangan yang sama dapat diuraikan dengan lebih dari satu cara.";

export const ADEGAN_LAIN: AdeganStory = {
  id: "lain",
  judul: "Cara lain menguraikan",
  sumber: "Materi: lebih dari satu cara",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ada Cara Lain?"), papanKecil("pb", 20, 30, 260, 100)),
      tambah("Pak", ...tokoh("pd", 250, 184, "Pak Darwis")),
      tambah("cara", emo("tq", 276, 152, E.tanya, 20)),
      tambah("bilangan", teks("b5", 150, 62, "5.270", 22, W.biru, { z: 2 })),
      tambah("menguraikan", teks("u1", 150, 96, "5.000 + 200 + 70", 15, W.coklat, { z: 2 })),
    ),
    k(
      SUARA_L2,
      tambah("Laras", ...tokoh("lr", 40, 178, "Laras")),
      tambah("menjawab,", emo("jr", 70, 160, E.jari, 18)),
      tambah("empat", teks("u2", 150, 120, "4.000", 15, W.hijauTua, { z: 2 })),
      ubah("seribu", { id: "u2", isi: "4.000 + 1.270" }),
    ),
    k(
      SUARA_L3,
      tambah("sama", teks("e1", 252, 96, "= 5.270", 12, W.merah, { z: 2 }), teks("e2", 252, 120, "= 5.270", 12, W.merah, { z: 2 })),
      tambah("satu", teks("lc", 150, 150, "lebih dari 1 cara", 12, W.merah)),
      tambah("cara.", emo("ok", 22, 56, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Uang pembayaran ------------------------------ */
const SUARA_Y1 = "Pembeli membayar kelapa tujuh ribu tiga ratus rupiah, dengan uang pecahan seratus, lima ratus, seribu, dan dua ribu.";
const SUARA_Y2 = "Laras menguraikannya, tiga lembar dua ribu, satu keping seribu, dan tiga keping seratus.";
const SUARA_Y3 = "Genta mencoba cara lain, dua lembar dua ribu, tiga keping seribu, dan tiga keping seratus.";
const SUARA_Y4 = "Sepuluh ribu rupiah juga begitu, misalnya lima lembar dua ribu, atau empat lembar dua ribu dan dua keping seribu.";
const BARIS_5 = [0, 1, 2, 3, 4].map((i) => lembarUang("r" + (i + 1), 24 + i * 32, 56));
const BARIS_4 = [0, 1, 2, 3].map((i) => lembarUang("s" + (i + 1), 24 + i * 32, 100));

export const ADEGAN_UANG: AdeganStory = {
  id: "uang",
  judul: "Uang pembayaran Pak Darwis",
  sumber: "Materi: menguraikan uang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Uang Pembayaran"), ...tokoh("pd", 262, 178, "Pak Darwis")),
      tambah("tujuh", papanKecil("pk", 92, 28, 116, 34), teks("pn", 150, 51, "Rp 7.300", 18, W.merah, { z: 2 })),
      tambah("seratus,", kepingUang("y4", 45, 100, "seratus", 8), teks("z4", 45, 124, "100", 11, W.coklat)),
      tambah("lima", kepingUang("y3", 110, 100, "limaratus"), teks("z3", 110, 124, "500", 11, W.coklat)),
      tambah("seribu,", kepingUang("y2", 175, 100, "seribu"), teks("z2", 175, 124, "1.000", 11, W.coklat)),
      tambah("dua", lembarUang("y1", 220, 92), teks("z1", 235, 124, "2.000", 11, W.coklat)),
    ),
    k(
      SUARA_Y2,
      hapus("Laras", "y1", "y2", "y3", "y4", "z1", "z2", "z3", "z4"),
      tambah("Laras", ...tokoh("lr", 40, 178, "Laras")),
      tambah("menguraikannya,", emo("ct", 14, 146, E.catat, 16)),
      tambah("tiga", lembarUang("a1", 16, 80), lembarUang("a2", 48, 80), lembarUang("a3", 80, 80), teks("la", 63, 112, "3 lembar 2.000", 11, W.coklat)),
      tambah("satu", kepingUang("b1", 158, 88, "seribu"), teks("lb", 158, 112, "1 keping 1.000", 11, W.coklat)),
      tambah("tiga@2", kepingUang("c1", 222, 88, "seratus", 8), kepingUang("c2", 242, 88, "seratus", 8), kepingUang("c3", 262, 88, "seratus", 8), teks("lc", 242, 112, "3 keping 100", 11, W.coklat)),
      tambah("seratus.", teks("sm", 150, 140, "6.000 + 1.000 + 300 = 7.300", 12, W.merah)),
    ),
    k(
      SUARA_Y3,
      tambah("Genta", ...tokoh("gn", 100, 178, "Genta")),
      tambah("cara", emo("jr", 128, 170, E.jari, 16)),
      hapus("dua", "a3"),
      ubah("dua", { id: "la", isi: "2 lembar 2.000" }),
      tambah("tiga", kepingUang("b0", 138, 88, "seribu"), kepingUang("b2", 178, 88, "seribu")),
      ubah("tiga", { id: "lb", isi: "3 keping 1.000" }),
      ubah("seratus.", { id: "sm", isi: "4.000 + 3.000 + 300 = 7.300" }),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Sepuluh Ribu Rupiah")),
      tambah("Sepuluh", teks("tj", 150, 42, "Rp 10.000", 18, W.merah)),
      tambah("lima", ...BARIS_5, teks("l5", 120, 88, "5 lembar 2.000", 11, W.coklat)),
      tambah("empat", ...BARIS_4, teks("l4", 150, 142, "4 lembar 2.000 + 2 keping 1.000", 11, W.coklat)),
      tambah("keping", kepingUang("s5", 176, 108, "seribu"), kepingUang("s6", 196, 108, "seribu")),
      tambah("seribu.", teks("dc", 150, 172, "dua cara, jumlahnya sama", 12, W.hijauTua), emo("ok", 262, 164, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_T1 = "Kelapa sudah rapi dalam keranjang, dan Pak Darwis berterima kasih.";
const SUARA_T2 = "Bu Rina, petugas resepsi, datang membawa daftar tamu pagi dan siang yang harus dijumlahkan.";
const SUARA_T3 = "Menurutmu, bagaimana cara menjumlahkan dua bilangan besar dengan tepat? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Pak Darwis!";
const RAK = [0, 1, 2, 3].map((i) => [...wadah(`r${i}`, 24 + i * 62, 104, 54, 40), emo(`r${i}a`, 38 + i * 62, 100, E.kelapa, 14, { z: 4 }), emo(`r${i}b`, 58 + i * 62, 100, E.kelapa, 14, { z: 4 })]);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Kelapa rapi dan tamu berikutnya",
  sumber: "Materi: penutup dan jembatan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Kelapa Sudah Rapi"), ...pasir("ps", 150)),
      tambah("keranjang,", ...RAK.flat()),
      tambah("Pak", ...tokoh("pd", 250, 184, "Pak Darwis")),
      tambah("berterima", emo("tm", 276, 160, E.terima, 18)),
    ),
    k(
      SUARA_T2,
      tambah("Bu", ...tokoh("br", 200, 184, "Bu Rina")),
      tambah("daftar", kotak("dt-k", 110, 30, 110, 62, W.putih, W.biru, { rx: 8 }), teks("dt-t0", 165, 44, "daftar tamu", 9, W.biru)),
      tambah("pagi", teks("pg", 140, 62, "pagi", 9, W.coklat)),
      tambah("siang", teks("sg", 184, 82, "siang", 9, W.coklat)),
    ),
    k(
      SUARA_T3,
      tambah("menjumlahkan", teks("pt", 40, 62, "+", 30, W.merah), emo("tq", 70, 62, E.tanya, 26)),
      tambah("dua", teks("d2", 62, 92, "2 bilangan", 11, W.merah)),
      tambah("Satria,", ...tokoh("st", 24, 184, "Satria"), emo("w1", 46, 152, E.lambai, 16)),
      tambah("Laras,", ...tokoh("lr", 62, 184, "Laras"), emo("w2", 82, 152, E.lambai, 16)),
      tambah("Genta,", ...tokoh("gn", 100, 178, "Genta"), emo("w3", 118, 152, E.lambai, 16)),
      tambah("Hendro,", ...tokoh("ph", 138, 184, "Pak Hendro"), emo("w4", 156, 152, E.lambai, 16)),
      tambah("Darwis!", emo("w5", 232, 152, E.lambai, 16), emo("w6", 178, 152, E.lambai, 16)),
    ),
  ],
};
