import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deretPayung, emo, garis, garisJam, idDeret, judul, kartu, kotak, laut, lentera, panah, papanJadwal, pasir, teks, tokoh, xJam } from "./k4b1i-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b1i-bantu";

/*
 * Cerita orisinal IGIL "Papan Jadwal Kak Yoga" (Kelas 4 Bab 1 Sub-Bab I), akhir cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1i.md. Bagian ini: jadwal perahu (kelipatan empat), cara mendapatkan kelipatan, dan penutup bab.
 */

const JAM = [4, 8, 12, 16, 20, 24];

/* ------------------------------ 7. Jadwal ------------------------------ */
const SUARA_J1 = "Kak Yoga menunjukkan jadwal perahu, berangkat tiap empat jam.";
const SUARA_J2 = "Perahu berangkat jam empat, delapan, dua belas, enam belas, dua puluh, dan dua puluh empat.";
const SUARA_J3 = "Bilangan-bilangan itu disebut kelipatan empat.";
/** Perahu pada jam j: `b{j}` (perahu) dan `m{j}` (angka jam di bawah garis). */
const perahuJam = (j: number): Obj[] => [emo(`b${j}`, xJam(j), 104, E.perahu, 14), teks(`m${j}`, xJam(j), 138, String(j), 10, W.biru)];

export const ADEGAN_JADWAL: AdeganStory = {
  id: "jadwal",
  judul: "Jadwal perahu tiap empat jam",
  sumber: "Materi: jadwal dan kelipatan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jadwal Perahu"), ...pasir("ps", 150), ...laut("lt", 30, 100), ...tokoh("ky", 262, 184, "Kak Yoga")),
      tambah("jadwal", ...papanJadwal("jd", 60, 38, 150, 22, "JADWAL PERAHU", 9)),
      tambah("perahu", ...garisJam("gj", 118)),
      tambah("empat", teks("t4", 150, 152, "tiap 4 jam", 12, W.merah)),
      tambah("jam", panah("lp", xJam(0), 112, xJam(4) - xJam(0), 0, W.merah, 2.4, { z: 4 })),
    ),
    k(
      SUARA_J2,
      hapus(0, "t4", "lp"),
      tambah("empat", ...perahuJam(4)),
      tambah("delapan", ...perahuJam(8)),
      tambah("belas", ...perahuJam(12)),
      tambah("belas@2", ...perahuJam(16)),
      tambah("puluh", ...perahuJam(20)),
      tambah("empat@2", ...perahuJam(24)),
    ),
    k(
      SUARA_J3,
      tambah("disebut", kotak("br", 14, 94, 272, 52, undefined, W.ungu, { rx: 8, tebal: 2.4, z: 5 })),
      tambah("kelipatan", teks("kl", 150, 80, "KELIPATAN 4", 15, W.merah)),
      sorotkan("empat", ...JAM.flatMap((j) => [`b${j}`, `m${j}`])),
    ),
  ],
};

/* ------------------------------ 8. Cara ------------------------------ */
const SUARA_C1 = "Laras menerangkan, kelipatan didapat dengan menambah empat berulang kali.";
const SUARA_C2 = "Atau dengan mengalikan empat dengan satu, dua, tiga, dan seterusnya.";
const SUARA_C3 = "Setiap kelipatan empat juga dapat dibagi empat tanpa sisa.";
const LONCAT = [0, 1, 2, 3, 4, 5];
const loncat = (i: number): Obj[] => [panah(`ar${i}`, xJam(4 * i), 112, xJam(4) - xJam(0), 0, W.ungu, 2.4, { z: 4 }), teks(`al${i}`, xJam(4 * i) + 21.7, 104, "+4", 9, W.ungu, { z: 4 })];
const SUMBU = [0, 4, 8, 12, 16, 20, 24];
const ID_C1 = ["gc-b", ...SUMBU.flatMap((j) => [`gc-m${j}`, `cm${j}`]), ...LONCAT.flatMap((i) => [`ar${i}`, `al${i}`])];

export const ADEGAN_CARA: AdeganStory = {
  id: "cara",
  judul: "Menambah empat dan mengalikan empat",
  sumber: "Materi: cara mendapat kelipatan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Kelipatan Empat"), ...pasir("ps", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("kelipatan", teks("kj", 150, 36, "kelipatan 4", 12, W.ungu)),
      tambah("didapat", ...garisJam("gc", 120), ...SUMBU.map((j) => teks(`cm${j}`, xJam(j), 138, String(j), 9, W.biru))),
      tambah("menambah", ...loncat(0)),
      tambah("berulang", ...LONCAT.slice(1).flatMap((i) => loncat(i))),
    ),
    k(
      SUARA_C2,
      hapus(0, ...ID_C1),
      sorotkan("mengalikan", "kj"),
      tambah("satu", ...kartu("m1", 90, 46, 120, 20, W.krem, ["4 x 1 = 4"], 10)),
      tambah("dua", ...kartu("m2", 90, 70, 120, 20, W.krem, ["4 x 2 = 8"], 10)),
      tambah("tiga", ...kartu("m3", 90, 94, 120, 20, W.krem, ["4 x 3 = 12"], 10)),
      tambah("seterusnya", ...kartu("md", 90, 118, 120, 20, W.krem, ["... 4 x 6 = 24"], 10)),
    ),
    k(
      SUARA_C3,
      sorotkan("kelipatan", "m1-k", "m2-k", "m3-k", "md-k"),
      tambah("dibagi", teks("dv", 150, 160, "24 : 4 = 6", 12, W.ungu)),
      tambah("sisa", teks("s0", 150, 178, "sisa 0", 11, W.hijauTua), emo("ok", 226, 176, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_N1 = "Semua payung sudah tertata dan jadwal perahu sudah jelas.";
const SUARA_N2 = "Bu Maya mengundang semua orang ke pantai untuk merayakan kerja bersama.";
const SUARA_N3 = "Menurutmu, bilangan apa saja yang sudah kamu pelajari? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Kak Yoga!";
const TAMU = [E.pak, E.bu, E.kak, E.pak, E.bu, E.pak, E.bu];
const RAPI = deretPayung("pt", 40, 114, 12, 2, 20, 22, 0.6);
const LENTERA_NYALA = [garis("nl-tl", 20, 88, 260, 0, W.coklat, 1.4, { z: 1 }), ...Array.from({ length: 8 }, (_, i) => lentera(`nl${i}`, 44 + i * 30, 96, true)).flat()];
const ID_NYALA = ["nl-tl", ...Array.from({ length: 8 }, (_, i) => [`nl${i}`, `nl${i}-t`]).flat()];
const ID_TAMU = TAMU.map((_, i) => `tm${i}`);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Semua tertata, siap merayakan",
  sumber: "Materi: penutup dan ajakan merayakan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Semua Tertata"), ...pasir("ps", 150), ...laut("lt", 30, 84)),
      tambah("tertata", ...RAPI),
      tambah("jadwal", ...papanJadwal("jd", 90, 36, 120, 20, "JADWAL PERAHU", 9)),
      tambah("perahu", emo("pb", 236, 56, E.perahu, 16)),
      tambah("jelas", ...LENTERA_NYALA),
    ),
    k(
      SUARA_N2,
      hapus(0, ...idDeret("pt", 12, 2), "jd", "jd-t", "pb", ...ID_NYALA),
      tambah("Maya", ...tokoh("bm", 262, 184, "Bu Maya")),
      tambah("mengundang", emo("lb", 226, 152, E.lambai, 20)),
      tambah("orang", ...TAMU.map((e, i) => emo(`tm${i}`, 30 + i * 34, 130, e, 18))),
      tambah("pantai", teks("ay", 150, 62, "Ayo ke pantai!", 12, W.merah)),
      tambah("merayakan", emo("f1", 60, 96, E.konfeti, 18), emo("f2", 150, 96, E.konfeti, 18), emo("b1", 250, 92, E.balon, 20)),
    ),
    k(
      SUARA_N3,
      hapus(0, ...ID_TAMU, "bm", "bm-n", "bm-bj", "bm-kd", "bm-pp", "lb", "ay", "f1", "f2", "b1"),
      tambah("bilangan", teks("tq", 150, 56, "bilangan apa saja?", 12, W.ungu), emo("tn", 236, 54, E.tanya, 18)),
      tambah("Terima", ...[26, 84, 142, 200, 258].map((x, i) => emo(`wv${i}`, x, 138, E.lambai, 18))),
      tambah("Satria", ...tokoh("sa", 26, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 142, 184, "Genta")),
      tambah("Hendro", ...tokoh("ph", 200, 184, "Pak Hendro")),
      tambah("Yoga", ...tokoh("ky", 250, 184, "Kak Yoga")),
    ),
  ],
};
