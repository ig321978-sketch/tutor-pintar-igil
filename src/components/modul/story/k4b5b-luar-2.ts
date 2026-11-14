import type { AdeganStory } from "./logika-story";
import { PERAHU } from "./k4b5b-data";
import { POTONG_SEGITIGA, POTONG_TRAPESIUM, SEGITIGA_A, TANGRAM, W, garis, judul, kartu, keping, poli, skala, tangram, teks } from "./k4b5b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b5b-bantu";

/* ------------------------------ 6. Tangram: konsep ------------------------------ */
const TG = 8;
const TG_TL: Record<number, [number, number]> = { 1: [10, 40], 2: [84, 40], 7: [124, 40], 4: [166, 40], 5: [206, 40], 6: [248, 40], 3: [272, 40] };
const tgAsal = (no: number): [number, number] => {
  const p = TANGRAM[no - 1].pts;
  return [TG_TL[no][0] - Math.min(...p.map((q) => q[0])) * TG, TG_TL[no][1] - Math.min(...p.map((q) => q[1])) * TG];
};
const tujuh = () => [1, 2, 3, 4, 5, 6, 7].map((n) => tangram("tt", n, ...tgAsal(n), TG));
export const ADEGAN_LUAR_TG: AdeganStory = {
  id: "luar-tg",
  judul: "Tangram: tujuh keping",
  sumber: "Metode luar: Tangram",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Tangram. Tujuh keping: dua segitiga besar, satu segitiga sedang, dua segitiga kecil, satu persegi, dan satu jajargenjang.",
      tambah(0, judul("Tangram")),
      tambah("Tujuh", ...tujuh()),
      tambah("besar,", ...kartu("tg1", 8, 120, 150, 36, W.langit, ["5 segitiga:", "2 besar, 1 sedang, 2 kecil"], 7)),
      tambah("persegi,", ...kartu("tg2", 166, 120, 58, 36, W.hijauMuda, ["1", "persegi"], 7.4)),
      tambah("jajargenjang.", ...kartu("tg3", 230, 120, 62, 36, W.pink, ["1", "jajargenjang"], 7)),
    ),
    k(
      "Aturan main: pakai semua tujuh keping, boleh diputar atau dibalik, dan tidak boleh bertumpuk. Satu set yang sama dapat membentuk banyak siluet.",
      bersih(0),
      tambah(0, judul("Aturan main tangram")),
      tambah("pakai", ...kartu("ta1", 14, 34, 272, 28, W.hijauMuda, ["pakai semua 7 keping"], 9.2)),
      tambah("diputar", ...kartu("ta2", 14, 70, 272, 28, W.langit, ["boleh diputar atau dibalik"], 9.2)),
      tambah("bertumpuk.", ...kartu("ta3", 14, 106, 272, 28, W.krem, ["tidak boleh bertumpuk"], 9.2)),
      tambah("siluet.", ...kartu("ta4", 14, 148, 272, 28, W.pink, ["1 set, banyak siluet"], 9.2)),
    ),
    k(
      "Hitung keping menurut jenisnya: dua tambah satu tambah dua sama dengan lima segitiga. Lima tambah satu tambah satu sama dengan tujuh keping.",
      bersih(0),
      tambah(0, judul("Hitung keping tangram")),
      tambah("segitiga.", ...kartu("tc1", 40, 50, 220, 34, W.langit, ["2 + 1 + 2 = 5 segitiga"], 10.4)),
      tambah("Lima@2", ...kartu("tc2", 40, 110, 220, 34, W.krem, ["5 + 1 + 1 = 7 keping"], 10.4)),
    ),
    k(
      "Dengan tujuh keping yang sama, buku membuat persegi di Aktivitas enam dan perahu layar di Ayo Berlatih satu. Siluetnya berbeda, kepingnya sama.",
      bersih(0),
      tambah(0, judul("Satu set, banyak siluet")),
      tambah("persegi", ...[1, 2, 3, 4, 5, 6, 7].map((n) => tangram("ts", n, 30, 50, 8)), teks("tst", 62, 130, "persegi", 8.6, W.biru)),
      tambah("perahu", ...PERAHU.map((p, i) => keping(`tsp${i}`, 150, 50, p, 0.5)), teks("tsq", 200, 142, "perahu layar", 8.6, W.biru)),
      tambah("sama@2", teks("tsr", 150, 182, "7 keping yang sama", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ 7. Tangram: penerapan pada perahu layar ------------------------------ */
const PS = 0.68;
const GESER: [number, number][] = [[-6, 6], [-4, -6], [-2, 16], [8, 14], [6, 8], [14, 0], [6, -8]];
export const ADEGAN_LUAR_TG_TERAPAN: AdeganStory = {
  id: "luar-tg-terapan",
  judul: "Tangram diterapkan pada perahu layar",
  sumber: "Metode luar: Tangram pada perahu layar, Buku Siswa hlm. 172",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Perahu layar di Ayo Berlatih satu adalah siluet tangram. Pisahkan kepingnya satu per satu.",
      tambah(0, judul("Perahu layar dari tangram")),
      tambah("Perahu", ...PERAHU.map((p, i) => keping(`tp-p${i}`, 8, 44, p, PS))),
      ...PERAHU.map((_, i) => ubah("Pisahkan", { id: `tp-p${i}`, x: 8 + GESER[i][0], y: 44 + GESER[i][1] })),
      tambah("siluet", ...kartu("tp1", 156, 56, 134, 36, W.krem, ["siluet tangram", "7 keping"], 8.6)),
    ),
    k(
      "Lima segitiga: layar biru, badan merah, layar hijau tua, ujung jingga, dan lambung merah muda.",
      tambah("biru,", ...kartu("tp2", 156, 100, 134, 26, W.langit, ["5 segitiga"], 9.2)),
      sorotkan("biru,", "tp-p1"),
      sorotkan("merah,", "tp-p0"),
      sorotkan("hijau", "tp-p6"),
      sorotkan("jingga,", "tp-p5"),
      sorotkan("muda.", "tp-p3"),
    ),
    k(
      "Ditambah satu persegi hijau dan satu jajargenjang oranye. Lima tambah satu tambah satu sama dengan tujuh keping, tepat seperti set tangram.",
      redamkan(0, "tp-p1", "tp-p0", "tp-p6", "tp-p5", "tp-p3"),
      sorotkan("persegi", "tp-p4"),
      sorotkan("jajargenjang", "tp-p2"),
      tambah("Lima", ...kartu("tp3", 156, 136, 134, 28, W.hijauMuda, ["5 + 1 + 1 = 7 keping"], 9)),
      redamkan("Lima", "tp-p4", "tp-p2"),
      tambah("tangram.", teks("tp4", 223, 184, "sama dengan set tangram", 7.8, W.coklat)),
    ),
    k(
      "Perahu dan persegi tadi sama-sama tujuh keping. Jumlah keping tidak berubah, hanya susunannya.",
      hapus(0, "tp2-k", "tp2-t0", "tp3-k", "tp3-t0", "tp4"),
      tambah("sama-sama", ...kartu("tp5", 156, 100, 134, 28, W.hijauMuda, ["7 keping tetap 7"], 9)),
    ),
  ],
};

/* ------------------------------ 8. Cut and Rearrange: konsep ------------------------------ */
const CS = 14;
const JAJAR: [number, number][] = [[2, 0], [8, 0], [6, 4], [0, 4]];
export const ADEGAN_LUAR_CR: AdeganStory = {
  id: "luar-cr",
  judul: "Cut and Rearrange (Potong dan Susun Ulang)",
  sumber: "Metode luar: Cut and Rearrange (Potong dan Susun Ulang)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Cut and Rearrange atau Potong dan Susun Ulang. Potong satu bangun menjadi beberapa potongan, lalu susun ulang menjadi bangun lain.",
      tambah(0, judul("Cut and Rearrange")),
      tambah("satu", poli("cr-p", 14, 56, skala(JAJAR, CS), "#FBCFE8", W.coklat, { tebal: 1.4 })),
      tambah("satu", ...kartu("cr1", 150, 44, 140, 26, W.langit, ["1 bangun"], 9)),
      tambah("beberapa", garis("cr-g", 42, 56, 0, 56, W.merah, 2, { putus: true })),
      tambah("potongan,", poli("cr-t", 14, 56, skala(POTONG_SEGITIGA, CS), "#93C5FD", W.coklat, { tebal: 1.4 }), poli("cr-z", 14, 56, skala(POTONG_TRAPESIUM, CS), "#FBCFE8", W.coklat, { tebal: 1.4 })),
      hapus("potongan,", "cr-p"),
      tambah("potongan,", ...kartu("cr2", 150, 82, 140, 26, W.krem, ["dipotong jadi 2"], 9)),
      tambah("lain.", ...kartu("cr3", 150, 120, 140, 26, W.hijauMuda, ["disusun jadi bangun lain"], 8.4)),
    ),
    k(
      "Contoh: jajargenjang dipotong tegak menjadi segitiga dan trapesium. Geser segitiga ke ujung lain, jadilah persegi panjang.",
      hapus(0, "cr1-k", "cr1-t0", "cr2-k", "cr2-t0", "cr3-k", "cr3-t0"),
      tambah("dipotong", ...kartu("cr4", 150, 44, 140, 26, W.krem, ["potong tegak: 2 bagian"], 8.4)),
      ubah("Geser", { id: "cr-t", x: 98 }),
      hapus("Geser", "cr-g"),
      tambah("Geser", ...kartu("cr5", 150, 82, 140, 26, W.langit, ["segitiga digeser"], 9)),
      tambah("persegi", ...kartu("cr6", 150, 120, 140, 26, W.hijauMuda, ["jadi persegi panjang"], 8.6)),
      ubah("persegi", { id: "cr-z", warna: "#BBF7D0" }, { id: "cr-t", warna: "#86EFAC" }),
    ),
    k(
      "Aturan: jumlah potongan tidak berubah, hanya letaknya yang berpindah, dan tidak ada bagian yang hilang atau bertambah.",
      hapus(0, "cr4-k", "cr4-t0", "cr5-k", "cr5-t0", "cr6-k", "cr6-t0"),
      tambah("jumlah", ...kartu("cr7", 150, 44, 140, 26, W.krem, ["jumlah potongan tetap 2"], 8.4)),
      tambah("letaknya", ...kartu("cr8", 150, 82, 140, 26, W.langit, ["hanya letak berpindah"], 8.6)),
      tambah("hilang", ...kartu("cr9", 150, 120, 140, 26, W.hijauMuda, ["tidak ada yang hilang"], 8.6)),
    ),
    k(
      "Cara ini membantu memahami hubungan antarbangun: jajargenjang dan persegi panjang dapat saling berubah, tanpa ada bagian yang dibuang.",
      hapus(0, "cr7-k", "cr7-t0", "cr8-k", "cr8-t0", "cr9-k", "cr9-t0", "cr-t", "cr-z"),
      tambah("jajargenjang", poli("cx1", 20, 80, skala(JAJAR, 8), "#FBCFE8", W.coklat, { tebal: 1.4 }), teks("cx1t", 52, 130, "jajargenjang", 8, W.biru)),
      tambah("saling", { id: "cxa", t: "panah", x: 100, y: 96, x2: 34, y2: 0, warna: W.merah, tebal: 2.2 }),
      tambah("persegi", poli("cx2", 170, 80, skala([[2, 0], [8, 0], [8, 4], [2, 4]], 8), "#BBF7D0", W.coklat, { tebal: 1.4 }), teks("cx2t", 200, 130, "persegi panjang", 8, W.biru)),
      tambah("dibuang.", teks("cx3", 150, 170, "tidak ada bagian yang dibuang", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 9. Cut and Rearrange: penerapan pada dua segitiga besar ------------------------------ */
const DS7 = 7;
export const ADEGAN_LUAR_CR_TERAPAN: AdeganStory = {
  id: "luar-cr-terapan",
  judul: "Cut and Rearrange diterapkan pada dua segitiga besar",
  sumber: "Metode luar: Cut and Rearrange pada keping 1 dan 2, Buku Siswa hlm. 167–168",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapkan pada keping satu dan dua tangram, dua segitiga besar yang sama. Potongan ini dapat disusun ulang dengan beberapa cara.",
      tambah(0, judul("Dua segitiga besar yang sama")),
      tambah("satu", poli("ca-a", 40, 70, skala(SEGITIGA_A, DS7), "#FAA61A", W.putih), teks("ca-at", 68, 116, "keping 1", 8, W.biru)),
      tambah("dua", poli("ca-b", 190, 70, skala(SEGITIGA_A, DS7), "#40AD49", W.putih), teks("ca-bt", 218, 116, "keping 2", 8, W.biru)),
      tambah("sama", ...kartu("ca-c", 60, 140, 180, 28, W.krem, ["bentuk dan ukuran sama"], 9)),
    ),
    k(
      "Cara satu: sisi miring dirapatkan, jadilah persegi. Cara dua: sisi tegak dirapatkan, jadilah segitiga besar seperti langkah tiga Aktivitas enam.",
      bersih(0),
      tambah(0, judul("Dua cara menyusun")),
      tambah("satu", poli("c1a", 50, 84, skala(SEGITIGA_A, DS7), "#FAA61A", W.putih), poli("c1b", 50, 84, skala([[0, 0], [8, 0], [4, -4]], DS7), "#40AD49", W.putih), teks("c1t", 78, 134, "cara 1: persegi", 8, W.biru)),
      tambah("dua", poli("c2a", 170, 56, skala(SEGITIGA_A, DS7), "#FAA61A", W.putih), poli("c2b", 170, 56, skala([[0, 0], [4, 4], [0, 8]], DS7), "#40AD49", W.putih), teks("c2t", 198, 134, "cara 2: segitiga besar", 8, W.biru)),
    ),
    k(
      "Cara tiga: sisi tegak dirapatkan lagi, tetapi satu keping diputar setengah putaran, jadilah jajargenjang. Dua keping tetap dua keping, hanya bangunnya yang berbeda.",
      tambah("tiga:", poli("c3a", 100, 150, skala(SEGITIGA_A, 5), "#FAA61A", W.putih), poli("c3b", 100, 150, skala([[8, 0], [12, 4], [4, 4]], 5), "#40AD49", W.putih), teks("c3t", 130, 186, "cara 3: jajargenjang", 8, W.biru)),
      tambah("Dua", teks("c4", 240, 160, "2 keping,", 8.6, W.coklat), teks("c5", 240, 172, "3 bangun", 8.6, W.coklat)),
    ),
    k(
      "Jumlah keping tetap dua, tetapi jumlah sisi bangun jadinya berubah: persegi empat sisi, segitiga besar tiga sisi, jajargenjang empat sisi.",
      bersih(0),
      tambah(0, judul("Keping tetap, sisi berubah")),
      tambah("persegi", poli("d1a", 24, 84, skala(SEGITIGA_A, 5), "#FAA61A", W.putih), poli("d1b", 24, 84, skala([[0, 0], [8, 0], [4, -4]], 5), "#40AD49", W.putih), teks("d1t", 44, 124, "persegi: 4 sisi", 7.8, W.biru)),
      tambah("segitiga", poli("d2a", 120, 64, skala(SEGITIGA_A, 5), "#FAA61A", W.putih), poli("d2b", 120, 64, skala([[0, 0], [4, 4], [0, 8]], 5), "#40AD49", W.putih), teks("d2t", 140, 124, "segitiga: 3 sisi", 7.8, W.biru)),
      tambah("jajargenjang", poli("d3a", 208, 74, skala(SEGITIGA_A, 5), "#FAA61A", W.putih), poli("d3b", 208, 74, skala([[8, 0], [12, 4], [4, 4]], 5), "#40AD49", W.putih), teks("d3t", 238, 124, "jajargenjang: 4 sisi", 7.8, W.biru)),
      tambah("tetap", teks("d4", 150, 168, "selalu 2 keping", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 166–173",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Ringkasan: Compose Shapes menggabungkan, Decompose Shapes mengurai, Tangram memakai tujuh keping, dan Cut and Rearrange memotong lalu menyusun ulang.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Compose", ...kartu("r1", 12, 34, 276, 30, W.hijauMuda, ["Compose Shapes: menggabungkan"], 9)),
      tambah("Decompose", ...kartu("r2", 12, 72, 276, 30, W.langit, ["Decompose Shapes: mengurai"], 9)),
      tambah("Tangram", ...kartu("r3", 12, 110, 276, 30, W.krem, ["Tangram: tujuh keping"], 9)),
      tambah("Cut", ...kartu("r4", 12, 148, 276, 30, W.pink, ["Cut and Rearrange: potong, susun ulang"], 8.6)),
    ),
    k(
      "Angka dari buku tadi: tujuh keping tangram, sepuluh keping motif paving, dan lima segitiga pada perahu layar.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("tujuh", ...kartu("an1", 20, 44, 260, 34, W.krem, ["7 keping tangram"], 10)),
      tambah("sepuluh", ...kartu("an2", 20, 90, 260, 34, W.langit, ["10 keping motif paving"], 10)),
      tambah("lima", ...kartu("an3", 20, 136, 260, 34, W.hijauMuda, ["5 segitiga pada perahu layar"], 10)),
    ),
    k(
      "Ingat intinya: komposisi menyusun beberapa bangun menjadi satu, dan dekomposisi mengurai satu bangun menjadi beberapa.",
      bersih(0),
      tambah(0, judul("Inti Sub-Bab B")),
      tambah("komposisi", ...kartu("in1", 20, 50, 260, 44, W.hijauMuda, ["komposisi", "menyusun beberapa jadi satu"], 9.6)),
      tambah("dekomposisi", ...kartu("in2", 20, 110, 260, 44, W.pink, ["dekomposisi", "mengurai satu jadi beberapa"], 9.6)),
    ),
  ],
};
