import type { AdeganStory, Obj } from "./logika-story";
import { E, W, benda, botolB, emo, gerobak, gudang, ikat, judul, lantai, lepas, panah, papanTim, pindah, pot, sapu, teks, tokoh, tong } from "./k2b7A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b7A-bantu";

/*
 * Cerita orisinal IGIL "Botol Pak Ujang" (Kelas 2 Bab 7 Sub-Bab A, bilangan sampai seratus), awal cerita Bank Sampah Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b7a.md. Bagian ini: gerobak botol, satu ikat sepuluh, dan salah langkah menghitung satu-satu.
 */

/* ------------------------------ 1. Gerobak botol ------------------------------ */
const SUARA_G1 = "Hari ini Bank Sampah Sekolah dibuka! Pak Ujang mendorong gerobak penuh botol bekas.";
const SUARA_G2 = "Bu Sari berkata, tim Biru dan tim Kuning harus melapor banyak botol yang terkumpul.";
const SUARA_G3 = "Botol diikat sepuluh-sepuluh dengan tali rafia. Satu ikat berisi sepuluh botol.";

const BOTOL_GEROBAK: Obj[] = [0, 1, 2, 3, 4].flatMap((i) => botolB(`gb${i}`, 112 + i * 8, 146));

export const ADEGAN_GEROBAK_BOTOL: AdeganStory = {
  id: "gerobak-botol",
  judul: "Gerobak botol Pak Ujang",
  sumber: "Materi: gerobak botol dan tim",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Bank Sampah Dibuka"), ...lantai("lt", 140), ...gudang("gd", 12, 68, 112, 72)),
      tambah("Sekolah", ...pot("pt", 138, 142), ...tong("t1", 164, 142, "hijau"), ...tong("t2", 190, 142, "kuning"), ...tong("t3", 216, 142, "biru")),
      tambah("Pak", ...tokoh("pu", 82, 184, "Pak Ujang")),
      tambah("gerobak", ...gerobak("gr", 108, 158)),
      tambah("botol", ...BOTOL_GEROBAK),
    ),
    k(
      SUARA_G2,
      tambah("Sari", ...tokoh("bs", 276, 184, "Bu Sari")),
      tambah("Biru", ...papanTim("pb", 168, 152, "Biru", "#93C5FD")),
      tambah("Kuning", ...papanTim("pk", 218, 152, "Kuning", "#FDE047")),
      tambah("banyak", emo("tq", 262, 120, E.tanya, 22)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Satu Ikat Botol"), ...lantai("lt", 150), ...lepas("lp", 40, 70, 10)),
      tambah("dengan", panah("pn", 104, 90, 36, 0, W.merah, 2.4)),
      tambah("tali", ...ikat("ik", 150, 70, "botol")),
      tambah("Satu", teks("n1", 169, 116, "1 ikat", 10, W.ungu)),
      tambah("sepuluh@2", teks("n10", 169, 132, "10 botol", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Satu ikat, dua ikat, lima ikat ------------------------------ */
const SUARA_S1 = "Sepuluh satuan sama dengan satu puluhan. Jadi satu ikat botol adalah satu puluhan.";
const SUARA_S2 = "Dua ikat berarti dua puluhan, yaitu dua puluh botol.";
const SUARA_S3 = "Lima ikat berarti lima puluhan, yaitu lima puluh botol.";

export const ADEGAN_SATU_IKAT: AdeganStory = {
  id: "satu-ikat",
  judul: "Satu ikat sama dengan satu puluhan",
  sumber: "Materi: sepuluh satuan satu puluhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satuan dan Puluhan"), ...lepas("lp", 34, 60, 10), teks("l1", 59, 108, "10 satuan", 10, W.ungu)),
      tambah("sama", teks("sm", 112, 84, "=", 18, W.biru)),
      tambah("puluhan.", ...ikat("ik", 134, 70, "botol"), teks("l2", 153, 108, "1 puluhan", 10, W.merah)),
      tambah("adalah", teks("n1", 150, 150, "1 ikat = 1 puluhan", 12, W.hijau)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Dua Ikat"), ...ikat("a1", 94, 44, "botol"), ...ikat("a2", 142, 44, "botol")),
      tambah("ikat", teks("t1", 150, 100, "2 ikat", 11, W.ungu)),
      tambah("puluhan,", teks("t2", 150, 122, "2 puluhan", 11, W.merah)),
      tambah("puluh@2", teks("t3", 150, 148, "20 botol", 13, W.hijau)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Lima Ikat"), ...[0, 1, 2, 3, 4].flatMap((i) => ikat(`b${i}`, 26 + i * 50, 44, "botol"))),
      tambah("ikat", teks("t1", 150, 100, "5 ikat", 11, W.ungu)),
      tambah("puluhan,", teks("t2", 150, 122, "5 puluhan", 11, W.merah)),
      tambah("puluh@2", teks("t3", 150, 148, "50 botol", 13, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah: hitung satu-satu ------------------------------ */
const SUARA_H1 = "Chacha berseru, aku hitung satu-satu saja, pasti cepat! Kalau salah, aku menyapu seluruh gudang!";
const SUARA_H2 = "Ia berhitung sampai lupa angkanya, dan botol menggelinding ke mana-mana! Pak Ujang terpeleset.";
const SUARA_H3 = "Dika tertawa. Ikat dulu sepuluh-sepuluh, Chacha, lalu hitung ikatnya. Tidak ada yang terlewat.";

/** Sepuluh botol lepas pada letak tertentu (pusat tiap botol), id `bp{i}` dan `bp{i}-t`. */
const botolDi = (titik: [number, number][]): Obj[] => titik.flatMap(([x, y], i) => benda(`bp${i}`, x, y, "botol"));
const RAPI: [number, number][] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => [108 + (i % 5) * 10, 100 + Math.floor(i / 5) * 16]);
const SEBAR: [number, number][] = [[60, 160], [96, 176], [128, 150], [150, 172], [178, 158], [206, 180], [232, 152], [250, 170], [270, 160], [40, 140]];

export const ADEGAN_SALAH_HITUNG: AdeganStory = {
  id: "salah-hitung",
  judul: "Salah hitung satu-satu",
  sumber: "Materi: salah langkah, hitung satu-satu",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hitung Satu-Satu?"), ...lantai("lt", 150), ...tokoh("ch", 40, 184, "Chacha")),
      tambah("hitung", ...botolDi(RAPI), panah("pn", 66, 168, 34, -50, W.merah, 2.2)),
      tambah("satu-satu", teks("c1", 113, 90, "1", 9, W.ungu), teks("c2", 123, 90, "2", 9, W.ungu), teks("c3", 133, 90, "3", 9, W.ungu)),
      tambah("cepat!", emo("ts", 62, 140, "\u{2757}", 18)),
      tambah("menyapu", ...sapu("sp", 232, 184)),
    ),
    k(
      SUARA_H2,
      hapus(0, "c1", "c2", "c3", "pn", "ts"),
      tambah("lupa", emo("tq", 40, 140, E.tanya, 22), emo("pz", 14, 150, E.pusing, 16)),
      ubah("menggelinding", ...pindah(botolDi(SEBAR))),
      tambah("Pak", ...tokoh("pu", 270, 184, "Pak Ujang")),
      ubah("terpeleset.", { id: "pu-cp", x: 232, y: 110 }),
      tambah("terpeleset.", emo("db", 250, 120, E.debu, 16)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Ikat Dulu, Baru Hitung"), ...lantai("lt", 150), ...tokoh("dk", 40, 184, "Dika")),
      ubah("tertawa.", { id: "dk", isi: E.tertawa }),
      tambah("Ikat", ...ikat("i1", 96, 90, "botol"), ...ikat("i2", 142, 90, "botol"), ...ikat("i3", 188, 90, "botol")),
      tambah("sepuluh-sepuluh,", teks("a1", 115, 84, "10", 10, W.merah), teks("a2", 161, 84, "10", 10, W.merah), teks("a3", 207, 84, "10", 10, W.merah)),
      tambah("hitung", teks("ik", 161, 130, "hitung ikatnya", 10, W.ungu)),
      tambah("terlewat.", emo("ok", 262, 110, E.benar, 24)),
    ),
  ],
};
