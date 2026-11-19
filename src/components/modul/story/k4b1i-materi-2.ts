import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deretPayung, emo, judul, kartu, kotak, lentera, garis, pasir, payung, teks, tokoh } from "./k4b1i-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b1i-bantu";

/*
 * Cerita orisinal IGIL "Papan Jadwal Kak Yoga" (Kelas 4 Bab 1 Sub-Bab I), akhir cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1i.md. Bagian ini: pasangan faktor 24, lima bukan faktor 24, dan Satria menyalakan lentera.
 */

/** Dua puluh empat payung dalam `kolom` kolom, baris demi baris; payung ke-i berid `${id}${i}` (kubah) dan `${id}${i}-t` (tiang). */
function susunKolom(id: string, x: number, y: number, kolom: number, dx: number, dy: number, s: number): Obj[] {
  return Array.from({ length: 24 }, (_, i) => payung(`${id}${i}`, x + (i % kolom) * dx, y + Math.floor(i / kolom) * dy, s, ["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7", "#EC4899"][i % 6])).flat();
}
const idKolom = (id: string, n = 24): string[] => Array.from({ length: n }, (_, i) => [`${id}${i}`, `${id}${i}-t`]).flat();

/* ------------------------------ 4. Pasangan faktor ------------------------------ */
const SUARA_A1 = "Laras mengajak mencari pasangan, mulai dari satu.";
const SUARA_A2 = "Satu kali dua puluh empat, dua kali dua belas, tiga kali delapan, empat kali enam.";
const SUARA_A3 = "Jadi faktornya satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat.";
const PASANGAN: { a: number; b: number }[] = [
  { a: 1, b: 24 },
  { a: 2, b: 12 },
  { a: 3, b: 8 },
  { a: 4, b: 6 },
];
const PANEL = [
  { x: 14, y: 28, kolom: 24, dx: 4.9, dy: 8 },
  { x: 158, y: 28, kolom: 12, dx: 10, dy: 9 },
  { x: 14, y: 90, kolom: 8, dx: 14, dy: 9 },
  { x: 158, y: 90, kolom: 6, dx: 18, dy: 9 },
];
/** Panel pasangan `i`: bingkai `fr{i}`, label `lb{i}`, dan susunan payung kecil `a{i}` sebanyak a x b. */
const panel = (i: number): Obj[] => {
  const p = PANEL[i];
  const { a, b } = PASANGAN[i];
  return [
    kotak(`fr${i}`, p.x, p.y, 130, 58, W.putih, W.abu, { rx: 6, tebal: 1.2, z: 0 }),
    teks(`lb${i}`, p.x + 65, p.y + 12, `${a} x ${b}`, 10, W.ungu, { z: 2 }),
    ...deretPayung(`a${i}`, p.x + 10, p.y + 26, p.kolom, (a * b) / p.kolom, p.dx, p.dy, 0.5, false),
  ];
};

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan",
  judul: "Mencari pasangan faktor dua puluh empat",
  sumber: "Materi: pasangan faktor",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Mencari Pasangan"), ...pasir("ps", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("pasangan", ...kartu("pk", 70, 40, 160, 30, W.pink, ["pasangan faktor"], 10)),
      tambah("satu", teks("s1", 150, 100, "mulai dari 1", 13, W.merah)),
    ),
    k(
      SUARA_A2,
      hapus(0, "pk-k", "pk-t0", "s1"),
      tambah(0, ...panel(0)),
      tambah("dua@2", ...panel(1)),
      tambah("tiga", ...panel(2)),
      tambah("empat@2", ...panel(3)),
    ),
    k(
      SUARA_A3,
      tambah("satu", ...kartu("fc0", 58, 152, 24, 24, W.krem, ["1"], 10)),
      tambah("dua", ...kartu("fc1", 86, 152, 24, 24, W.krem, ["2"], 10)),
      tambah("tiga", ...kartu("fc2", 114, 152, 24, 24, W.krem, ["3"], 10)),
      tambah("empat", ...kartu("fc3", 142, 152, 24, 24, W.krem, ["4"], 10)),
      tambah("enam", ...kartu("fc4", 170, 152, 24, 24, W.krem, ["6"], 10)),
      tambah("delapan", ...kartu("fc5", 198, 152, 24, 24, W.krem, ["8"], 10)),
      tambah("belas", ...kartu("fc6", 226, 152, 24, 24, W.krem, ["12"], 9)),
      tambah("puluh", ...kartu("fc7", 254, 152, 24, 24, W.krem, ["24"], 9)),
      sorotkan("empat@2", "fc0-k", "fc5-k", "fc6-k", "fc7-k"),
    ),
  ],
};

/* ------------------------------ 5. Bukan faktor ------------------------------ */
const SUARA_B1 = "Genta menguji lima, dua puluh empat dibagi lima sama dengan empat sisa empat.";
const SUARA_B2 = "Karena ada sisa, lima bukan faktor dua puluh empat.";
const SUARA_B3 = "Bilangan yang membagi habis pasti tidak bersisa.";
const LIMA_KOLOM = susunKolom("g", 66, 62, 5, 22, 17, 0.7);

export const ADEGAN_BUKAN: AdeganStory = {
  id: "bukan",
  judul: "Lima bukan faktor dua puluh empat",
  sumber: "Materi: bukan faktor",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Menguji Lima"), ...pasir("ps", 150), ...tokoh("ge", 36, 184, "Genta")),
      tambah("lima", teks("u5", 232, 48, "uji 5", 11, W.ungu)),
      tambah("dibagi", ...LIMA_KOLOM),
      tambah("sama", teks("h", 232, 70, "24 : 5 = 4", 11, W.biru)),
      tambah("sisa", kotak("sd", 58, 120, 84, 20, undefined, W.merah, { rx: 6, tebal: 2.4, z: 6 }), teks("ss", 232, 92, "sisa 4", 11, W.merah)),
    ),
    k(
      SUARA_B2,
      sorotkan("sisa", "sd"),
      tambah("lima", ...kartu("k5", 214, 112, 28, 28, W.krem, ["5"], 13)),
      tambah("bukan", emo("xs", 262, 130, E.salah, 22)),
      tambah("empat", teks("bk", 150, 150, "5 bukan faktor 24", 10, W.merah)),
    ),
    k(
      SUARA_B3,
      hapus(0, "u5", "h", "ss", "sd", "k5-k", "k5-t0", "xs", "bk", ...idKolom("g")),
      tambah(0, ...susunKolom("q", 100, 52, 4, 24, 15, 0.7)),
      tambah("membagi", teks("c1", 232, 60, "24 : 4 = 6", 11, W.biru)),
      tambah("bersisa", teks("c2", 232, 82, "sisa 0", 11, W.hijauTua), emo("ok", 270, 82, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 6. Lentera ------------------------------ */
const SUARA_L1 = "Satria menghela napas dan mulai menyalakan lentera satu per satu.";
const SUARA_L2 = "Lentera itu banyak, dan tangannya cepat pegal.";
const SUARA_L3 = "Pak Hendro dan Kak Yoga ikut membantu supaya cepat selesai.";
const NYALA = { warna: "#FDE047", garis: "#B45309" };
/** Delapan lentera padam pada tali setinggi y: badan `${id}{i}`, tali pendek `${id}{i}-t`, tali panjang `${id}-tl`. */
const taliLentera = (id: string, y: number): Obj[] => [garis(`${id}-tl`, 20, y - 8, 260, 0, W.coklat, 1.4, { z: 1 }), ...Array.from({ length: 8 }, (_, i) => lentera(`${id}${i}`, 44 + i * 30, y, false)).flat()];
const SEMUA_LENTERA = ["ln", "lm"].flatMap((p) => Array.from({ length: 8 }, (_, i) => ({ id: `${p}${i}`, ...NYALA })));

export const ADEGAN_LENTERA: AdeganStory = {
  id: "lentera",
  judul: "Satria menyalakan lentera",
  sumber: "Materi: lentera dan taruhan",
  latar: "#FFEDD5",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Menyalakan Lentera"), ...pasir("ps", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("napas", emo("cp", 82, 160, E.capek, 18)),
      tambah("lentera", ...taliLentera("ln", 96)),
      tambah("satu", teks("sp", 150, 60, "1 per 1", 11, W.ungu)),
      { at: "satu", ubah: [{ id: "ln0", ...NYALA }] },
      { at: "satu@2", ubah: [{ id: "ln1", ...NYALA }] },
    ),
    k(
      SUARA_L2,
      tambah("banyak", ...taliLentera("lm", 128)),
      tambah("tangannya", emo("tg", 112, 160, E.tangan, 18)),
      tambah("pegal", emo("lh", 150, 160, E.lelah, 18), teks("pg", 232, 160, "pegal...", 9, W.coklat)),
    ),
    k(
      SUARA_L3,
      hapus(0, "sp", "tg", "lh", "pg"),
      tambah(0, ...tokoh("ph", 196, 184, "Pak Hendro")),
      tambah("Yoga", ...tokoh("ky", 244, 184, "Kak Yoga")),
      tambah("membantu", emo("jp", 118, 160, E.jempol, 18)),
      { at: "selesai", ubah: SEMUA_LENTERA },
    ),
  ],
};
