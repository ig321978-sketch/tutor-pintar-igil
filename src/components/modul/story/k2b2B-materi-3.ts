import type { AdeganStory } from "./logika-story";
import { E, W, WK, batangPuluhan, buRina, buSari, dasi, emo, gs, idBatang, judul, kartu, kartuStok, kotak, kubus, lantai, nia, panah, papanGabus, rak, teks, tokoh, topiMP, xBaris } from "./k2b2B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b2B-bantu";

/*
 * Cerita orisinal IGIL "Rak Seragam Diserbu" (Kelas 2 Bab 2 Sub-Bab B), tengah cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2b.md. Bagian ini: membuka satu puluhan, kartu stok yang kurang satu (topi dipakai Chacha), dan penutup (jembatan ke Sub-Bab C).
 */

/* ------------------------------ 7. Membuka satu puluhan ------------------------------ */
const SUARA_U1 = "Nia membuka satu puluhan menjadi sepuluh satuan. Sekarang ada dua ditambah sepuluh, yaitu dua belas satuan.";
const SUARA_U2 = "Dua belas satuan dikurangi delapan satuan sama dengan empat.";
const SUARA_U3 = "Periksa lagi, empat ditambah delapan sama dengan dua belas. Cocok!";

const SEPULUH = Array.from({ length: 10 }, (_, i) => i);
const kx = (i: number): number => 30 + (i % 5) * 14;
const ky = (i: number): number => 64 + Math.floor(i / 5) * 14;
const DUA12 = Array.from({ length: 12 }, (_, i) => i);
const gx12 = (i: number): number => 38 + (i % 6) * 38;
const gy12 = (i: number): number => 54 + Math.floor(i / 6) * 28;

export const ADEGAN_URAI: AdeganStory = {
  id: "urai",
  judul: "Membuka satu puluhan",
  sumber: "Materi: membuka satu puluhan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Membuka satu puluhan")),
      tambah("Nia", ...nia("ni", 262, 184)),
      tambah("satu", ...batangPuluhan("bp", 56, 40, 60, 10), teks("bpl", 61, 132, "1 puluhan", 10, W.merah)),
      hapus("sepuluh", ...idBatang("bp"), "bpl"),
      tambah("sepuluh", ...SEPULUH.map((i) => kubus(`ku${i}`, kx(i), ky(i), 11)), teks("l10", 58, 112, "10 satuan", 10, W.merah)),
      tambah("dua", ...[0, 1].map((i) => kubus(`kd${i}`, 150 + i * 14, 64, 11, "#60A5FA")), teks("l2", 164, 112, "2", 10, W.biru)),
      tambah("ditambah", teks("pl", 124, 78, "+", 18, W.merah)),
      sorotkan("sepuluh@2", ...SEPULUH.map((i) => `ku${i}`)),
      tambah("dua@2", ...kartu("d12", 196, 56, 94, 28, W.krem, ["12 satuan"], 11)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Dua belas satuan dikurangi"), ...kartu("l12", 100, 130, 100, 22, W.krem, ["12 satuan"], 9.6)),
      tambah(0, ...DUA12.map((i) => kubus(`kk${i}`, gx12(i), gy12(i), 16, i < 4 ? "#60A5FA" : "#FB7185"))),
      ...[4, 5, 6, 7, 8, 9, 10, 11].map((i) => ubah("delapan", { id: `kk${i}`, op: 0.25 })),
      tambah("delapan", ...kartu("l8", 14, 164, 100, 22, W.merahMuda, ["8 dicoret"], 9.6)),
      sorotkan("empat.", "kk0", "kk1", "kk2", "kk3"),
      tambah("empat.", ...kartu("l4", 186, 164, 100, 22, W.hijauMuda, ["sisa 4"], 9.6)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Periksa dengan penjumlahan")),
      tambah("Periksa", emo("kc", 262, 64, E.kaca, 26)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => kubus(`pa${i}`, xBaris(150, 12, i, 22) - 8, 100, 16, "#60A5FA")), teks("e1", 150, 160, "4", 22, W.merah)),
      ubah("ditambah", { id: "e1", isi: "4 +" }),
      tambah("delapan", ...[4, 5, 6, 7, 8, 9, 10, 11].map((i) => kubus(`pa${i}`, xBaris(150, 12, i, 22) - 8, 100, 16, "#FB7185"))),
      ubah("delapan", { id: "e1", isi: "4 + 8" }),
      ubah("sama", { id: "e1", isi: "4 + 8 =" }),
      ubah("belas.", { id: "e1", isi: "4 + 8 = 12" }),
      tambah("Cocok!", emo("ok", 262, 140, E.benar, 28)),
    ),
  ],
};

/* ------------------------------ 8. Kartu stok kurang satu ------------------------------ */
const SUARA_K1 = "Dika mengisi kartu stok, lalu menghitung topi di rak. Kurang satu!";
const SUARA_K2 = "Semua mencari ke kolong rak, sampai Bu Sari menunjuk kepala Chacha. Topi merah putih itu sedang dipakainya!";
const SUARA_K3 = "Setelah topi dikembalikan, kartu stok dan isi rak pun cocok.";

const tx = (i: number): number => 24 + i * 17;

export const ADEGAN_KARTU_STOK: AdeganStory = {
  id: "kartu-stok",
  judul: "Kartu stok kurang satu",
  sumber: "Materi: kartu stok dan isi rak",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kartu stok"), lantai("tn", 150)),
      tambah("Dika", ...tokoh("dk", 30, 184, E.dika, "Dika")),
      tambah("kartu", papanGabus("pg", 180, 34, 110, 60), ...kartuStok("ks", 192, 42, 86, 44, ["topi merah putih", "stok 8"], 7.6)),
      tambah("menghitung", ...rak("rk", 10, 36, 150, 108)),
      tambah("topi", ...[0, 1, 2, 3, 4, 5, 6].flatMap((i) => topiMP(`tp${i}`, tx(i), 62))),
      tambah("rak.", kotak("sl7", tx(7) - 7, 58, 14, 8, W.putih, W.merah, { rx: 2, tebal: 1.2, putus: true }), emo("tq", tx(7), 56, E.tanya, 16)),
      tambah("Kurang", ...kartu("kr", 190, 108, 92, 22, W.merahMuda, ["kurang 1"], 9.6)),
    ),
    k(
      SUARA_K2,
      hapus(0, "kr-k", "kr-t0"),
      tambah("Semua", emo("mt", 70, 168, E.mata, 22), emo("mu", 110, 168, E.mata, 22)),
      tambah("Bu", ...buSari("bs", 190, 176)),
      tambah("menunjuk", panah("pn", 206, 150, 248, 142, W.merah)),
      tambah("Chacha.", ...tokoh("ch", 266, 184, E.chacha, "Chacha"), ...topiMP("ct", 266, 154, 5.5)),
      tambah("dipakainya!", emo("ck", 244, 160, E.cekikik, 20)),
    ),
    k(
      SUARA_K3,
      hapus(0, "mt", "mu", "pn", "ct", "ct-b", "ck", "tq", "sl7"),
      tambah("dikembalikan,", ...topiMP("tp7", tx(7), 62)),
      sorotkan("kartu", "ks"),
      tambah("rak", emo("rm", 90, 130, E.mata, 18)),
      tambah("cocok.", emo("ok", 140, 34, E.benar, 24), ...kartu("cc", 190, 108, 92, 22, W.hijauMuda, ["cocok"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Bu Rina datang membawa daftar pesanan bergambar, dan minta dibantu menghitungnya besok.";
const SUARA_N2 = "Dika merangkum. Pasangkan untuk selisih, mundur atau susun untuk mengurangi, buka satu puluhan kalau satuannya kurang, lalu periksa.";
const SUARA_N3 = "Menurutmu, kalau sisa topi dijumlahkan dengan topi yang terjual, hasilnya harus sama dengan bilangan yang mana? Terima kasih, Chacha, Dika, Nia, dan Bu Sari!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup dan jembatan",
  sumber: "Materi: penutup dan pertanyaan",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Daftar pesanan Bu Rina"), lantai("tn", 150)),
      tambah(0, ...buRina("br", 50, 170)),
      tambah("daftar", kotak("dp", 112, 34, 112, 100, WK.kertas, W.coklat, { rx: 3, tebal: 2 })),
      tambah("bergambar,", emo("g1", 134, 64, E.baju, 20), ...topiMP("g2", 134, 92, 7), gs("g1l", 152, 58, 210, 58, W.abu, 2), gs("g2l", 152, 90, 210, 90, W.abu, 2), dasi("g3", 134, 118, {}), gs("g3l", 152, 116, 210, 116, W.abu, 2)),
      tambah("minta", emo("tq", 244, 64, E.tanya, 24)),
      tambah("besok.", ...kartu("bk", 196, 152, 90, 22, W.krem, ["besok pagi"], 9.6)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Ringkasan Dika"), ...tokoh("dk", 270, 150, E.dika, "Dika")),
      tambah("Pasangkan", ...kartu("r1", 14, 30, 230, 28, WK.puluhan, ["pasangkan untuk selisih"], 10)),
      tambah("mundur", ...kartu("r2", 14, 64, 230, 28, WK.satuan, ["mundur atau susun untuk mengurangi"], 9.4)),
      tambah("buka", ...kartu("r3", 14, 98, 230, 28, W.hijauMuda, ["buka 1 puluhan jika satuan kurang"], 9.4)),
      tambah("periksa.", ...kartu("r4", 14, 132, 230, 28, W.krem, ["periksa dengan penjumlahan"], 9.4)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Sisa dan terjual")),
      tambah("Menurutmu,", emo("tq", 150, 66, E.tanya, 30)),
      tambah("sisa", ...kartu("sq", 40, 84, 220, 36, W.krem, ["sisa + terjual = ?"], 14)),
      tambah("Chacha,", ...tokoh("ch", 40, 160, E.chacha, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 110, 160, E.dika, "Dika")),
      tambah("Nia,", ...nia("ni", 180, 160)),
      tambah("Sari!", ...buSari("bs", 250, 160), emo("lb", 150, 150, E.lambai, 24)),
    ),
  ],
};
