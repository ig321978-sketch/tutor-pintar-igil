import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kantong, kartu, kartuAngka, kotak, pindahKartuAngka, pita, sedotan, teks, titik } from "./k1b5c-gambar";
import { bersih, idx, k, redamkan, rumus, sorotkan, tambah, ubah } from "./k1b5c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";

/* ------------------------------ 1. Susun kalimat nilai tempat dengan kartu ------------------------------ */
/** Tempat tiga kartu pada kalimat: puluhan, satuan, hasil (pojok kiri-atas, lebar, tinggi). */
export const TEMPAT_KALIMAT = [
  { x: 14, y: 60, w: 36, h: 32 },
  { x: 126, y: 60, w: 36, h: 32 },
  { x: 236, y: 60, w: 50, h: 32 },
];
/** Kartu angka di bawah: [id, isi, x awal, indeks tempat]. */
export const KARTU_KALIMAT: [string, string, number, number][] = [["ca13", "13", 30, 2], ["ca1", "1", 130, 0], ["ca3", "3", 220, 1]];
const Y_KARTU = 130;
const kartuKalimat = (id: string, isi: string, x: number, y: number, tempat: number) => kartuAngka(id, x, y, isi, W.krem, TEMPAT_KALIMAT[tempat].w, TEMPAT_KALIMAT[tempat].h, 20);
const pindahKalimat = (id: string, tempat: number) => pindahKartuAngka(id, TEMPAT_KALIMAT[tempat].x, TEMPAT_KALIMAT[tempat].y, TEMPAT_KALIMAT[tempat].w, TEMPAT_KALIMAT[tempat].h, 20);

const SUARA_K1 = "Sekarang kita susun kalimat nilai tempat dengan kartu di layar. Kita pakai bilangan tiga belas.";
const SUARA_K2 = "Kartu pertama untuk puluhan. Ada satu puluhan, jadi ketuk kartu satu lalu seret ke kotak pertama.";
const SUARA_K3 = "Kartu kedua untuk satuan. Ada tiga satuan, jadi ketuk kartu tiga lalu seret ke kotak kedua.";
const SUARA_K4 = "Kartu terakhir untuk hasilnya. Ketuk kartu tiga belas lalu seret ke kotak yang terakhir.";
const SUARA_K5 = "Kalimatnya sudah jadi: satu puluhan dan tiga satuan sama dengan tiga belas. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "susun-kalimat",
  judul: "Susun kalimat nilai tempat",
  sumber: "Materi: susun kalimat nilai tempat",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Susun kalimat")),
      tambah(
        "kalimat",
        ...TEMPAT_KALIMAT.map((t, i) => kotak(`sl${i}`, t.x, t.y, t.w, t.h, W.putih, W.biru, { rx: 5, putus: true })),
        teks("kt0", 76, 80, "puluhan", 10),
        teks("kt1", 110, 80, "dan", 10),
        teks("kt2", 186, 80, "satuan", 10),
        teks("kt3", 222, 82, "=", 16),
      ),
      tambah("tiga", ...KARTU_KALIMAT.flatMap(([id, isi, x, t]) => kartuKalimat(id, isi, x, Y_KARTU, t))),
    ),
    k(SUARA_K2, sorotkan("ketuk", "ca1-k"), ubah("seret", ...pindahKalimat("ca1", 0))),
    k(SUARA_K3, redamkan(0, "ca1-k"), sorotkan("ketuk", "ca3-k"), ubah("seret", ...pindahKalimat("ca3", 1))),
    k(SUARA_K4, redamkan(0, "ca3-k"), sorotkan("Ketuk", "ca13-k"), ubah("seret", ...pindahKalimat("ca13", 2))),
    k(SUARA_K5, redamkan(0, "ca13-k"), tambah("jadi:", emo("ok", 150, 40, "\u{2705}", 22)), tambah("Ucapkan", emo("sg", 150, 190, "\u{1F50A}", 24))),
  ],
};

/* ------------------------------ 2. Latihan 1: pilih tabel yang cocok ------------------------------ */
export const PILIHAN_TABEL = ["puluhan 1, satuan 4", "puluhan 4, satuan 1", "puluhan 1, satuan 3"];
const SUARA_L1 = "Latihan satu. Wei punya empat belas balok: satu menara sepuluh balok dan empat balok lepas.";
const SUARA_L2 = "Ada tiga pilihan tabel. Hati-hati, jangan sampai kolomnya tertukar. Ketuk tabel yang kamu pilih.";
const SUARA_L3 = "Betul! Satu puluhan dan empat satuan. Kolom puluhan ada di kiri, dan kolom satuan di kanan. Pilihan pertama cocok.";
const SUARA_L4 = "Pilihan kedua salah, karena angkanya tertukar kolom. Pilihan ketiga juga salah, karena satuannya hanya tiga.";
const pilihan = (i: number) => kartu(`a${i}`, 132, 40 + 44 * i, 156, 34, W.langit, [PILIHAN_TABEL[i]], 9.4);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: pilih tabel",
  sumber: "Materi: latihan pilih tabel yang cocok",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      bersih(0),
      tambah(0, judul("Latihan 1")),
      tambah("menara", kotak("lb", 30, 50, 22, 90, W.hijauMuda, W.biru, { rx: 3, tebal: 1.8 }), teks("lb-t", 41, 100, "10", 12, W.biru)),
      tambah(idx(SUARA_L1, "empat", 2), ...[0, 1, 2, 3].map((i) => kotak(`ls${i}`, 72 + 18 * (i % 2), 56 + 18 * Math.floor(i / 2), 14, 14, W.balok, W.biru, { rx: 1.5, tebal: 1.2 }))),
      tambah("balok:", teks("lt", 66, 160, "14 balok", 11, W.merah)),
    ),
    k(SUARA_L2, tambah(0, ...[0, 1, 2].flatMap(pilihan)), sorotkan("Ketuk", "a0-k", "a1-k", "a2-k")),
    k(
      SUARA_L3,
      redamkan(0, "a0-k", "a1-k", "a2-k"),
      ubah("pertama", { id: "a0-k", warna: W.emas }),
      ubah(0, { id: "a1-k", op: 0.25 }, { id: "a1-t0", op: 0.25 }, { id: "a2-k", op: 0.25 }, { id: "a2-t0", op: 0.25 }),
      tambah("Betul!", emo("ok", 116, 57, "\u{2705}", 22)),
    ),
    k(SUARA_L4, tambah("kedua", emo("x1", 116, 101, "\u{274C}", 20)), tambah("ketiga", emo("x2", 116, 145, "\u{274C}", 20))),
  ],
};

/* ------------------------------ 3. Latihan 2: papan kartu angka ------------------------------ */
export const SLOT_PAPAN = [{ x: 40, y: 100, w: 90, h: 40 }, { x: 170, y: 100, w: 90, h: 40 }];
const SUARA_M1 = "Latihan dua. Ada delapan belas kelereng: satu kantong berisi sepuluh, dan delapan kelereng lepas. Seret kartu angka ke papan.";
const SUARA_M2 = "Kolom puluhan dulu. Ada satu kantong, jadi satu puluhan. Ketuk kartu satu lalu seret ke kolom puluhan.";
const SUARA_M3 = "Sekarang kolom satuan. Ada delapan kelereng lepas, jadi ketuk kartu delapan lalu seret ke kolom satuan.";
const SUARA_M4 = "Papan menunjukkan satu dan delapan. Dibaca delapan belas! Sepuluh ditambah delapan sama dengan delapan belas.";
const SUARA_M5 = "Hebat! Delapan belas adalah satu puluhan dan delapan satuan.";
const pindahPapan = (id: string, t: number) => pindahKartuAngka(id, SLOT_PAPAN[t].x + (SLOT_PAPAN[t].w - 40) / 2, SLOT_PAPAN[t].y + 3, 40, 34, 22);

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: papan kartu angka",
  sumber: "Materi: latihan papan kartu angka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      bersih(0),
      tambah(0, judul("Latihan 2")),
      tambah("kantong", kantong("kg", 14, 32, 88, 44, { rx: 10 }), ...Array.from({ length: 10 }, (_, i) => titik(`tp${i}`, 30 + 16 * (i % 5), 46 + 16 * Math.floor(i / 5)))),
      tambah("sepuluh,", teks("t10", 58, 28, "10", 10, W.merah)),
      tambah("lepas.", ...Array.from({ length: 8 }, (_, i) => titik(`tl${i}`, 130 + 16 * (i % 4), 46 + 16 * Math.floor(i / 4), W.oranye))),
      tambah(
        "papan.",
        ...SLOT_PAPAN.map((s, i) => kotak(`sp${i}`, s.x, s.y, s.w, s.h, W.putih, W.biru, { rx: 6, putus: true })),
        teks("hp", 85, 94, "puluhan", 9),
        teks("hs", 215, 94, "satuan", 9),
        ...[["cd5", "5", 70], ["cd1", "1", 130], ["cd8", "8", 190]].flatMap(([id, isi, x]) => kartuAngka(id as string, x as number, 146, isi as string, W.krem, 40, 34, 22)),
      ),
    ),
    k(SUARA_M2, sorotkan("Ketuk", "cd1-k"), ubah("seret", ...pindahPapan("cd1", 0))),
    k(SUARA_M3, redamkan(0, "cd1-k"), sorotkan("ketuk", "cd8-k"), ubah("seret", ...pindahPapan("cd8", 1))),
    k(SUARA_M4, redamkan(0, "cd8-k"), ...rumus(SUARA_M4, "rq", 190, 10, 8, "belas!", 18)),
    k(SUARA_M5, tambah("Hebat!", emo("ow", 262, 120, IGIL, 30))),
  ],
};

/* ------------------------------ 4. Latihan 3: ikat lidi Kira ------------------------------ */
const SUARA_N1 = "Latihan tiga. Ayo mencoba bersama Kira! Kira mengikat sepuluh lidi. Ada dua lidi yang tidak diikat.";
const SUARA_N2 = "Satu puluhan dan dua satuan sama dengan berapa? Ketuk jawabannya: sebelas, dua belas, atau dua puluh.";
const SUARA_N3 = "Betul! Satu puluhan dan dua satuan sama dengan dua belas. Sepuluh ditambah dua sama dengan dua belas.";
const SUARA_N4 = "Hebat sekali! Kamu sudah bisa memisahkan puluhan dan satuan.";
export const LIDI_BUNDEL = (i: number): { x: number; y: number } => ({ x: 62 + 5 * i, y: 40 });
export const LIDI_LEPAS = [{ x: 170, y: 40 }, { x: 190, y: 40 }];
const jawab = (id: string, x: number, isi: string) => kartuAngka(id, x, 100, isi, W.krem, 50, 34, 20);

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: ikat lidi",
  sumber: "Materi: latihan ikat lidi Kira",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Latihan 3")),
      tambah("Kira!", emo("a-Kira", 30, 160, ANAK, 26), teks("n-Kira", 30, 174, "Kira", 8.4)),
      tambah("sepuluh", teks("t10", 84, 32, "10", 12, W.merah)),
      tambah("lidi.", ...Array.from({ length: 10 }, (_, i) => sedotan(`ld${i}`, LIDI_BUNDEL(i).x, LIDI_BUNDEL(i).y, W.coklat)), pita("lp", 58, 48, 54)),
      tambah(idx(SUARA_N1, "dua"), ...LIDI_LEPAS.map((p, i) => sedotan(`ld${10 + i}`, p.x, p.y, W.coklat))),
    ),
    k(
      SUARA_N2,
      tambah(idx(SUARA_N2, "puluhan"), teks("l1", 84, 88, "1 puluhan", 10, W.merah)),
      tambah(idx(SUARA_N2, "satuan"), teks("l2", 180, 88, "2 satuan", 10, W.merah)),
      tambah(idx(SUARA_N2, "sebelas"), ...jawab("ja11", 40, "11")),
      tambah(idx(SUARA_N2, "belas"), ...jawab("ja12", 125, "12")),
      tambah(idx(SUARA_N2, "puluh"), ...jawab("ja20", 210, "20")),
      sorotkan(idx(SUARA_N2, "puluh"), "ja11-k", "ja12-k", "ja20-k"),
    ),
    k(SUARA_N3, redamkan(0, "ja11-k", "ja12-k", "ja20-k"), ubah("Betul!", { id: "ja12-k", warna: W.emas }), ...rumus(SUARA_N3, "rt", 170, 10, 2, "belas.")),
    k(SUARA_N4, tambah("Hebat", emo("ow", 262, 120, IGIL, 30)), tambah("sekali!", emo("pa", 226, 160, "\u{1F389}", 28), emo("pb", 262, 160, "\u{1F389}", 28))),
  ],
};

/* ------------------------------ 5. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Sepuluh benda yang digabungkan disebut satu puluhan.";
const SUARA_Z2 = "Benda yang tersisa disebut satuan. Satu benda adalah satu satuan.";
const SUARA_Z3 = "Papan nilai tempat punya kolom puluhan di kiri dan kolom satuan di kanan. Angka yang sama bisa bernilai berbeda, tergantung tempatnya.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya. Teruslah berlatih di layar, ya.";
const LANGKAH = (i: number, isi: string, warna: string) => kartu(`z${i}`, 14, 30 + i * 40, 272, 32, warna, [isi], 10);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Sepuluh", ...LANGKAH(0, "1. 10 benda digabung: 1 puluhan", W.hijauMuda))),
    k(SUARA_Z2, tambah("tersisa", ...LANGKAH(1, "2. Benda sisa: satuan", W.langit))),
    k(SUARA_Z3, tambah("Papan", ...LANGKAH(2, "3. Kiri puluhan, kanan satuan", W.pink)), tambah("Angka", ...LANGKAH(3, "4. Angka sama, tempat beda", W.krem))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, IGIL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
