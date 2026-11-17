import type { AdeganStory, Obj } from "./logika-story";
import { E, W, angkaKisi, emo, ikan, judul, kartu, kisi, kotak, nyala, orang, pakan, rakLengkap, rentang, selKisi, teks } from "./k1b5b-gambar";
import { bersih, idx, hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5b-bantu";

/* Akhir "Rak Akuarium Bernomor": rak dilihat sebagai kisi, semua akuarium beres, bungkus pakan dan kantong ikan berserakan (jembatan ke Sub-Bab C), lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Rak seperti kisi ------------------------------ */
const SUARA_K1 = "Kaka melihat rak seperti kisi. Baris atas satu sampai sepuluh, baris bawah sebelas sampai dua puluh.";
const SUARA_K2 = "Di bawah tiga ada tiga belas. Di bawah tujuh ada tujuh belas.";
const SUARA_K3 = "Nomor bawah adalah sepuluh dan nomor di atasnya. Tiga belas adalah sepuluh dan tiga.";
const KS = { x: 20, y: 44, s: 26 };
const ANGKA = (dari: number, sampai: number): Obj[] => rentang(dari, sampai).map((n) => angkaKisi("ks", KS.x, KS.y, KS.s, n, W.biru));
/** Panah turun kecil di sisi kanan sel atas n menuju sel bawahnya. */
const turun = (id: string, n: number): Obj => {
  const p = selKisi(KS.x, KS.y, n, KS.s);
  return { id, t: "panah", x: p.x + KS.s - 5, y: p.y + 6, x2: 0, y2: KS.s + 10, warna: W.merah, tebal: 1.6 };
};
const [K2_3, K2_13, K2_7, K2_17] = urutBilangan(SUARA_K2, [3, 13, 7, 17]);

export const ADEGAN_KISI_RAK: AdeganStory = {
  id: "kisi-rak",
  judul: "Rak seperti kisi",
  sumber: "Materi: rak sebagai kisi",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Rak seperti kisi")),
      tambah("Kaka", ...orang("kk", 278, 182, E.kaka, "Kaka")),
      tambah("kisi.", ...kisi("ks", KS.x, KS.y, KS.s, W.langit, W.hijauMuda, rentang(1, 20))),
      tambah("atas", ...ANGKA(1, 10), teks("ba", 150, 128, "atas: 1 sampai 10", 9, W.biru)),
      tambah("bawah", ...ANGKA(11, 20), teks("bb", 150, 144, "bawah: 11 sampai 20", 9, W.hijau)),
    ),
    k(
      SUARA_K2,
      hapus(0, "ba", "bb"),
      sorotkan(K2_3, "ksc3"),
      tambah(K2_13, turun("t3", 3)),
      sorotkan(K2_13, "ksc13"),
      sorotkan(K2_7, "ksc7"),
      tambah(K2_17, turun("t7", 7)),
      sorotkan(K2_17, "ksc17"),
    ),
    k(
      SUARA_K3,
      tambah("sepuluh", ...kartu("kb", 40, 116, 220, 22, W.krem, ["bawah: 10 dan nomor atasnya"], 9.4)),
      tambah(idx(SUARA_K3, "Tiga"), ...kartu("k13", 80, 146, 140, 22, W.pink, ["13: 10 dan 3"], 10)),
      ubah(idx(SUARA_K3, "tiga", 2), { id: "ksa3", warna: W.merah }, { id: "ksa13", warna: W.merah }),
    ),
  ],
};

/* ------------------------------ 7. Semua akuarium beres ------------------------------ */
const SUARA_H1 = "Abang memberi pakan nomor satu sampai tujuh, Mamah enam belas sampai dua puluh. Kaka menyalakan sisa lampu.";
const SUARA_H2 = "Kini dua puluh akuarium mendapat pakan tepat sekali, semua lampu menyala, dan label terpasang rapi.";
const SUARA_H3 = "Abang ingin menjual pakan dan ikan, tetapi bungkus pakan dan kantong ikan masih berserakan. Menurutmu, bagaimana menghitungnya dengan cepat?";
/** Bungkus pakan miring di meja: `bk{i}` dan pita labelnya `bk{i}-l`. */
const BUNGKUS: [number, number, number][] = [[46, 74, -18], [92, 96, 12], [70, 128, 30], [130, 70, -8], [118, 120, -25], [160, 104, 20], [56, 104, 8]];
const bungkus = (): Obj[] =>
  BUNGKUS.flatMap(([x, y, r], i) => [
    kotak(`bk${i}`, x, y, 16, 22, "#FDBA74", W.coklat, { rx: 2, tebal: 1.2, rot: r }),
    kotak(`bk${i}-l`, x + 2, y + 8, 12, 5, W.krem, undefined, { rx: 1, rot: r, z: 1 }),
  ]);
/** Kantong ikan kecil berserakan: `kn{i}` dan ikan di dalamnya `kf{i}`. */
const KANTONG: [number, number][] = [[196, 70], [236, 84], [206, 112], [250, 120], [180, 132]];
const kantong = (): Obj[] =>
  KANTONG.flatMap(([x, y], i) => [kotak(`kn${i}`, x, y, 26, 24, "#E0F2FE", "#0EA5E9", { rx: 10, tebal: 1.6 }), ...ikan(`kf${i}`, x + 13, y + 13, ["#FB923C", "#F59E0B", "#22D3EE"][i % 3], 0.45)]);

export const ADEGAN_BERES: AdeganStory = {
  id: "semua-beres",
  judul: "Semua akuarium beres",
  sumber: "Materi: hasil dan masalah berikutnya",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Semua akuarium beres"), ...rakLengkap(), ...rentang(8, 15).flatMap(pakan)),
      ubah(0, ...rentang(12, 20).map(nyala)),
      tambah("Abang", ...orang("ab", 22, 182, E.abang, "Abang")),
      tambah("tujuh,", ...rentang(1, 7).flatMap(pakan), teks("r17", 90, 170, "1 sampai 7", 9, W.coklat)),
      tambah("Mamah", ...orang("mm", 278, 182, E.mamah, "Mamah")),
      tambah(idx(SUARA_H1, "puluh."), ...rentang(16, 20).flatMap(pakan), teks("r16", 210, 170, "16 sampai 20", 9, W.coklat)),
      tambah("Kaka", ...orang("kk", 150, 184, E.kaka, "Kaka")),
      ubah("lampu.", ...rentang(1, 11).map(nyala)),
    ),
    k(
      SUARA_H2,
      hapus(0, "r17", "r16", "kk", "kk-n", "kk-pita"),
      tambah("puluh", ...kartu("hs", 70, 158, 160, 20, W.emas, ["20 akuarium beres"], 9.4)),
      tambah("sekali,", emo("ok", 60, 172, E.benar, 12)),
      sorotkan("menyala,", ...rentang(1, 20).map((n) => `lm${n}`)),
      tambah("rapi.", emo("jp", 246, 174, E.jempol, 16)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Pakan dan ikan berserakan"), kotak("mj", 20, 56, 262, 106, "#F5D0A9", W.coklat, { rx: 8, tebal: 2.2, z: -4 })),
      tambah("Abang", ...orang("ab", 30, 186, E.abang, "Abang")),
      tambah("menjual", emo("lpk", 268, 46, E.lapak, 20)),
      tambah("bungkus", ...bungkus()),
      tambah("kantong", ...kantong()),
      sorotkan("berserakan.", "mj"),
      tambah("menghitungnya?", teks("tq", 170, 186, "berapa banyak?", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, ya. Menghitung maju, bilangannya bertambah satu. Menghitung mundur, bilangannya berkurang satu.";
const SUARA_Q2 = "Sesudah berarti satu lebih banyak, sebelum berarti satu lebih sedikit. Nomor yang hilang dicari dari tetangganya.";
const SUARA_Q3 = "Rak bernomor juga seperti kisi. Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const baris = (i: number, y: number, h: number, warna: string): Obj => kotak(`p${i}`, 14, y, 272, h, warna, W.biru, { rx: 8, tebal: 1.6, z: -2 });
const kiri = (id: string, y: number, isi: string, u = 9.4, warna: string = W.biru): Obj => teks(id, 24, y, isi, u, warna, { anchor: "start" });
const kanan = (id: string, y: number, isi: string, u = 9, warna: string = W.ungu): Obj => teks(id, 278, y, isi, u, warna, { anchor: "end" });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara menghitung",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("maju,", baris(0, 32, 40, W.hijauMuda), kiri("p0a", 56, "maju: 8, 9, 10, 11")),
      tambah("bertambah", kanan("p0b", 56, "bertambah 1", 9, W.hijau)),
      tambah("mundur,", baris(1, 78, 40, W.lavender), kiri("p1a", 102, "mundur: 20, 19, 18, 17")),
      tambah("berkurang", kanan("p1b", 102, "berkurang 1")),
    ),
    k(
      SUARA_Q2,
      tambah("Sesudah", baris(2, 124, 30, W.krem), kiri("p2a", 143, "sesudah: 1 lebih banyak", 8.6, W.hijau)),
      tambah("sebelum", kanan("p2b", 143, "sebelum: 1 lebih sedikit", 8.6)),
      tambah("hilang", baris(3, 160, 32, W.pink), kiri("p3a", 180, "12, ?, 14: hilang 13", 9.4, W.merah)),
      tambah("tetangganya.", kanan("p3b", 180, "lihat tetangga", 8.6)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah("kisi.", ...kisi("qk", 50, 34, 20, W.langit, W.hijauMuda, [], 8)),
      sorotkan("kisi.", "qkc13", "qkc17"),
      tambah("Igil,", ...orang("ig", 45, 150, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 150, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 150, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 255, 150, E.mamah, "Mamah")),
    ),
  ],
};
