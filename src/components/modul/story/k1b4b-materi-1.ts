import type { AdeganStory } from "./logika-story";
import { KUE, MEJA_X, W, WB, bentuk, cocok, emo, judul, kartu, kotak, nampan, panel, pindah, teks, tidakCocok } from "./k1b4b-gambar";
import { bersih, hapus, hitungAksi, k, redamkan, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/* ------------------------------ 1. Cerita: kue di meja Ibu ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Ibu menaruh kue di atas meja.";
const SUARA_C2 = "Ada kue cucur, kue risol, kue talam, kue lapis, bolu cokelat, dan kue lupis. Semuanya ada enam kue.";
const SUARA_C3 = "Igil bertanya, apakah ada kue yang sama? Ada yang bulat, ada yang runcing, dan ada yang berpojok empat. Warnanya ada cokelat dan hijau.";
const SUARA_C4 = "Hari ini kita belajar tiga hal. Pertama, memilih satu aturan. Kedua, memeriksa tiap benda. Ketiga, menghitung anggota.";
const SUARA_C5 = "Kita memakai benda yang akrab. Pelan-pelan, ya. Kalau bingung, kita ulangi lagi, tidak apa-apa.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];
/** Enam kue di meja (urut sebaris), id `ce{nomor}` dan nama `nm{nomor}`. */
const KUE_MEJA = (y: number, s: number) => KUE.flatMap((q, n) => [bentuk(q.bentuk, `ce${n}`, MEJA_X(n), y, s, WB[q.warna])]);
const NAMA_MEJA = (y: number) => KUE.map((q, n) => teks(`nm${n}`, MEJA_X(n), y, q.nama, 7.6, W.coklat));

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-meja",
  judul: "Kue di meja Ibu",
  sumber: "Materi: cerita kue di meja",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), { id: "tanah", t: "garis", x: 14, y: 142, x2: 272, y2: 0, warna: W.hijau, tebal: 3 }),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, "\u{1F989}", 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
      tambah("meja.", kotak("mj", 90, 156, 120, 12, W.krem, W.coklat, { rx: 4, tebal: 1.6 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Enam kue di meja")),
      ...[0, 2, 1, 4, 5, 3].map((n, i) => tambah(["cucur,", "risol,", "talam,", "lapis,", "bolu", "lupis."][i], KUE_MEJA(70, 13)[n], NAMA_MEJA(98)[n])),
      tambah("enam", teks("c6", 150, 142, "6 kue", 18, W.ungu)),
    ),
    k(
      SUARA_C3,
      tambah("Igil", emo("ig", 150, 190, "\u{1F989}", 30)),
      sorotkan("bulat,", "ce0", "ce1"),
      redamkan("runcing,", "ce0", "ce1"),
      sorotkan("runcing,", "ce2", "ce3"),
      redamkan("berpojok", "ce2", "ce3"),
      sorotkan("berpojok", "ce4", "ce5"),
      redamkan("Warnanya", "ce4", "ce5"),
      sorotkan("cokelat", "ce0", "ce2", "ce5"),
      redamkan("hijau.", "ce0", "ce2", "ce5"),
      sorotkan("hijau.", "ce1", "ce3", "ce4"),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Tiga hal hari ini")),
      tambah("Pertama,", ...kartu("h1", 20, 36, 260, 36, W.langit, ["Memilih satu aturan"], 10)),
      tambah("Kedua,", ...kartu("h2", 20, 82, 260, 36, W.hijauMuda, ["Memeriksa tiap benda"], 10)),
      tambah("Ketiga,", ...kartu("h3", 20, 128, 260, 36, W.pink, ["Menghitung anggota"], 10)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Pelan-pelan saja"), emo("kura", 150, 100, "\u{1F422}", 50)),
      tambah("ulangi", ...kartu("ap", 60, 130, 180, 30, W.krem, ["tidak apa-apa"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Apa itu mengelompokkan: satu aturan ------------------------------ */
const SUARA_A1 = "Mengelompokkan artinya mengumpulkan benda yang punya ciri sama. Kita kumpulkan benda yang mirip di satu nampan.";
const SUARA_A2 = "Setiap benda punya tiga ciri. Ciri pertama adalah bentuk. Ciri kedua adalah warna. Ciri ketiga adalah ukuran, besar atau kecil.";
const SUARA_A3 = "Kita memilih satu ciri saja, dan itu menjadi aturan. Misalnya aturannya warna.";
const SUARA_A4 = "Aturan membuat kita tahu benda mana yang masuk, dan benda mana yang tidak masuk.";
const SUARA_A5 = "Sebelum mulai, putuskan dulu aturannya. Lalu periksa setiap benda, cocok dengan aturan atau tidak.";

export const ADEGAN_ATURAN: AdeganStory = {
  id: "satu-aturan",
  judul: "Apa itu mengelompokkan",
  sumber: "Materi: mengelompokkan dan aturan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Apa itu mengelompokkan?")),
      tambah("mengumpulkan", bentuk("lengkung", "ap0", 40, 62, 12, WB.coklat), bentuk("segitiga", "ap1", 110, 70, 12, WB.hijau), bentuk("lengkung", "ap2", 190, 60, 12, WB.hijau), bentuk("segiempat", "ap3", 260, 68, 12, WB.coklat)),
      tambah("nampan.", ...nampan("ap-n", 80, 106, 140, 76, "nampan", W.krem)),
      ubah("kumpulkan", pindah("lengkung", "ap0", 120, 148, 12), pindah("lengkung", "ap2", 180, 148, 12)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Tiga ciri benda")),
      tambah("bentuk.", ...panel("c1", 10, 36, 88, 130, W.langit, "bentuk"), bentuk("segitiga", "c1a", 34, 84, 10, WB.biru), bentuk("lengkung", "c1b", 74, 84, 10, WB.biru), bentuk("segiempat", "c1c", 54, 126, 10, WB.biru)),
      tambah("warna.", ...panel("c2", 106, 36, 88, 130, W.hijauMuda, "warna"), bulat2("c2a", 130, 84, WB.merah), bulat2("c2b", 170, 84, WB.kuning), bulat2("c2c", 150, 126, WB.hijau)),
      tambah("ukuran,", ...panel("c3", 202, 36, 88, 130, W.pink, "ukuran"), bulat2("c3a", 230, 88, WB.biru, 17), bulat2("c3b", 268, 112, WB.biru, 8)),
      tambah(idxKata(SUARA_A2, "besar"), teks("c3t", 246, 150, "besar atau kecil", 9, W.ungu)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Satu ciri jadi aturan"), emo("jr", 150, 80, "\u{261D}", 44)),
      tambah("aturan.", ...kartu("at", 50, 104, 200, 34, W.emas, ["satu ciri, satu aturan"], 10.5)),
      tambah("warna.", bulat2("at1", 110, 168, WB.merah, 11), bulat2("at2", 150, 168, WB.kuning, 11), bulat2("at3", 190, 168, WB.hijau, 11), teks("att", 150, 196, "aturan: warna", 10, W.ungu)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Masuk atau tidak masuk")),
      tambah("masuk,", ...nampan("am", 14, 36, 128, 100, "masuk", W.hijauMuda, 9.6), bentuk("lengkung", "am0", 52, 84, 12, WB.coklat), bentuk("segitiga", "am1", 104, 86, 12, WB.coklat)),
      tambah("tidak", ...nampan("at-n", 158, 36, 128, 100, "tidak masuk", W.merahMuda, 9.6), bentuk("segiempat", "am2", 222, 86, 12, WB.hijau)),
      tambah("tidak", teks("am-a", 78, 160, "aturan: cokelat", 10, W.coklat)),
      tambah("tidak", cocok("am-c", 78, 124), tidakCocok("am-d", 222, 124)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, judul("Dua hal sebelum mulai")),
      tambah("putuskan", ...kartu("s1", 20, 36, 260, 38, W.langit, ["putuskan dulu aturannya"], 10)),
      tambah("periksa", ...kartu("s2", 20, 90, 260, 38, W.hijauMuda, ["periksa setiap benda"], 10)),
      tambah("cocok", cocok("sc", 90, 164, 26)),
      tambah("tidak", tidakCocok("sd", 210, 164, 26)),
      tambah("cocok", teks("sct", 90, 190, "cocok", 10, W.hijau), teks("sdt", 210, 190, "tidak cocok", 10, W.merah)),
    ),
  ],
};

/** Lingkaran warna kecil untuk contoh ciri (bukan benda hitungan). */
function bulat2(id: string, x: number, y: number, warna: string, r = 10) {
  return bentuk("lengkung", id, x, y, r, warna);
}
function idxKata(suara: string, kata: string): number {
  const n = suara.split(/\s+/).filter(Boolean).findIndex((w) => w.toLowerCase().replace(/[^a-z]/g, "") === kata);
  if (n < 0) throw new Error(`kata ${kata} tidak ada`);
  return n;
}

/* ------------------------------ 3. Kue menurut bentuk ------------------------------ */
const S = 11;
const NX = [8, 106, 204];
/** Pusat bentuk anggota ke-j (0 atau 1) di nampan ke-n. */
const SLOT = (n: number, j: number) => ({ x: NX[n] + 24 + j * 40, y: 142 });
/** Id kue menurut nomor: lengkung `kl`, segitiga `ks`, segi empat `kp`. */
const ID_KUE = ["kl0", "kl1", "ks0", "ks1", "kp0", "kp1"];
const geser = (g: number, n: number, j: number) => {
  const p = SLOT(n, j);
  return [pindah(KUE[g].bentuk, ID_KUE[g], p.x, p.y, S), { id: `nm${g}`, x: p.x, y: 166 }];
};
const KUE_BARIS = () => KUE.map((q, g) => bentuk(q.bentuk, ID_KUE[g], MEJA_X(g), 50, S, WB[q.warna]));
const NAMA_BARIS = () => KUE.map((q, g) => teks(`nm${g}`, MEJA_X(g), 72, q.nama, 7.6, W.coklat));
const NAMPAN3 = (label: boolean) => ["lengkung", "segitiga", "segi empat"].flatMap((t, n) => nampan(`tp${n}`, NX[n], 100, 88, 84, label ? t : "?", W.krem));

const SUARA_B1 = "Kira dan Upe mengelompokkan kue menurut bentuknya. Aturannya adalah bentuk.";
const SUARA_B2 = "Pertama, kue cucur dan kue talam. Tepinya melengkung, jadi mereka bentuk lengkung. Seret keduanya ke nampan pertama.";
const SUARA_B3 = "Kedua, kue risol dan kue lupis. Keduanya berbentuk segitiga. Seret keduanya ke nampan kedua.";
const SUARA_B4 = "Ketiga, kue lapis dan bolu. Keduanya berbentuk segi empat. Seret keduanya ke nampan ketiga.";
const SUARA_B5 = "Lihat, setiap nampan berisi dua kue. Satu aturan, yaitu bentuk, membuat tiga kelompok.";
const SUARA_B6 = "Bentuk lengkung punya tepi yang melengkung. Segitiga dan segi empat punya sisi yang lurus.";
const SUARA_B7 = "Ayo ucapkan lagi mengikuti suara guru. Lengkung, segitiga, segi empat.";

export const ADEGAN_BENTUK: AdeganStory = {
  id: "bentuk",
  judul: "Kue menurut bentuk",
  sumber: "Materi: mengelompokkan menurut bentuk",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Kue menurut bentuk")), tambah("kue", ...KUE_BARIS(), ...NAMA_BARIS()), tambah("Aturannya", ...NAMPAN3(false))),
    k(
      SUARA_B2,
      sorotkan("cucur", "kl0"),
      sorotkan("talam,", "kl1"),
      ubah("melengkung,", { id: "tp0-t", isi: "lengkung" }),
      redamkan("Seret", "kl0", "kl1"),
      ubah("Seret", ...geser(0, 0, 0), ...geser(1, 0, 1)),
    ),
    k(
      SUARA_B3,
      sorotkan("risol", "ks0"),
      sorotkan("lupis.", "ks1"),
      ubah("segitiga.", { id: "tp1-t", isi: "segitiga" }),
      redamkan("Seret", "ks0", "ks1"),
      ubah("Seret", ...geser(2, 1, 0), ...geser(3, 1, 1)),
    ),
    k(
      SUARA_B4,
      sorotkan("lapis", "kp0"),
      sorotkan("bolu.", "kp1"),
      ubah("empat.", { id: "tp2-t", isi: "segi empat" }),
      redamkan("Seret", "kp0", "kp1"),
      ubah("Seret", ...geser(4, 2, 0), ...geser(5, 2, 1)),
    ),
    k(SUARA_B5, ...[0, 1, 2].map((n) => tambah(n === 0 ? "dua" : n === 1 ? "yaitu" : "tiga", teks(`bj${n}`, NX[n] + 44, 196, "2 kue", 9, W.ungu)))),
    k(
      SUARA_B6,
      bersih(0),
      tambah(0, judul("Lengkung dan lurus")),
      tambah("Bentuk", bentuk("lengkung", "g0", 55, 68, 20, WB.coklat), bentuk("segitiga", "g1", 150, 68, 20, WB.hijau), bentuk("segiempat", "g2", 245, 68, 20, WB.coklat)),
      tambah("melengkung.", teks("g0t", 55, 124, "lengkung", 10), teks("g0u", 55, 142, "tepi melengkung", 9, W.merah)),
      tambah("Segitiga", teks("g1t", 150, 124, "segitiga", 10), teks("g2t", 245, 124, "segi empat", 10)),
      tambah("lurus.", teks("g1u", 197, 150, "sisi lurus", 10, W.hijau)),
    ),
    k(
      SUARA_B7,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("uc", 150, 66, "\u{1F4AC}", 40)),
      tambah("Lengkung,", ...kartu("u1", 40, 96, 220, 28, W.hijauMuda, ["lengkung"], 13)),
      tambah("segitiga,", ...kartu("u2", 40, 130, 220, 28, W.pink, ["segitiga"], 13)),
      tambah("empat.", ...kartu("u3", 40, 164, 220, 28, W.langit, ["segi empat"], 13)),
    ),
  ],
};

/* ------------------------------ 4. Periksa setiap benda ------------------------------ */
const SUARA_P1 = "Sekarang kita periksa. Upe menaruh tiga kue di nampan lengkung. Apakah semuanya cocok dengan aturan?";
const SUARA_P2 = "Periksa kue pertama. Kue cucur tepinya melengkung. Cocok dengan aturan, jadi tetap di nampan.";
const SUARA_P3 = "Periksa kue kedua. Kue talam juga tepinya melengkung. Cocok juga, jadi tetap di nampan.";
const SUARA_P4 = "Periksa kue ketiga. Kue lupis punya sisi lurus dan sudut. Tidak cocok dengan aturan lengkung.";
const SUARA_P5 = "Kue lupis kita seret keluar dari nampan. Sekarang semua anggota nampan cocok dengan aturan.";
const PX3 = [105, 150, 195];

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Periksa cocok atau tidak",
  sumber: "Materi: memeriksa kecocokan benda",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Periksa dulu")),
      tambah("menaruh", ...nampan("pn", 60, 44, 180, 96, "lengkung", W.krem)),
      tambah("tiga", bentuk("lengkung", "pa0", PX3[0], 88, S, WB.coklat), bentuk("lengkung", "pa1", PX3[1], 88, S, WB.hijau), bentuk("segitiga", "pa2", PX3[2], 88, S, WB.hijau), teks("pm0", PX3[0], 112, "cucur", 7.6, W.coklat), teks("pm1", PX3[1], 112, "talam", 7.6, W.coklat), teks("pm2", PX3[2], 112, "lupis", 7.6, W.coklat)),
      tambah("aturan?", ...kartu("pr", 70, 150, 160, 24, W.emas, ["aturan: lengkung"], 10)),
    ),
    k(SUARA_P2, sorotkan("cucur", "pa0"), tambah("Cocok", cocok("pc0", PX3[0], 130))),
    k(SUARA_P3, redamkan(0, "pa0"), sorotkan("talam", "pa1"), tambah("Cocok", cocok("pc1", PX3[1], 130))),
    k(SUARA_P4, redamkan(0, "pa1"), sorotkan("lupis", "pa2"), tambah("Tidak", tidakCocok("pc2", PX3[2], 130))),
    k(
      SUARA_P5,
      redamkan(0, "pa2"),
      ubah("seret", pindah("segitiga", "pa2", 268, 88, S), { id: "pm2", x: 268 }),
      hapus("seret", "pc2"),
      tambah("Sekarang", teks("p2", 150, 192, "2 anggota, semuanya cocok", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Nama kelompok dan banyak anggota ------------------------------ */
const SUARA_N1 = "Setiap kelompok perlu nama. Nama kelompok kita ambil dari aturannya. Nampan pertama bernama kelompok lengkung.";
const SUARA_N2 = "Nampan kedua bernama kelompok segitiga. Nampan ketiga bernama kelompok segi empat.";
const SUARA_N3 = "Sekarang hitung anggota kelompok lengkung. Satu, dua. Anggotanya ada dua kue.";
const SUARA_N4 = "Kelompok segitiga juga dua. Kelompok segi empat juga dua. Jadi setiap kelompok punya dua anggota.";
const SUARA_N5 = "Kalau kita hitung semua kue di tiga nampan, hasilnya enam kue. Banyak kue tidak berubah, hanya tempatnya yang berpindah.";
const NAMA_PIND = (g: number) => SLOT(Math.floor(g / 2), g % 2);

export const ADEGAN_NAMA: AdeganStory = {
  id: "nama",
  judul: "Nama kelompok dan banyak anggota",
  sumber: "Materi: nama kelompok dan banyaknya",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Beri nama kelompok")),
      tambah(0, ...NAMPAN3(false), ...KUE.map((q, g) => bentuk(q.bentuk, ID_KUE[g], NAMA_PIND(g).x, NAMA_PIND(g).y, S, WB[q.warna]))),
      ubah("lengkung.", { id: "tp0-t", isi: "lengkung" }),
    ),
    k(SUARA_N2, ubah("segitiga.", { id: "tp1-t", isi: "segitiga" }), ubah("empat.", { id: "tp2-t", isi: "segi empat" })),
    k(
      SUARA_N3,
      tambah("hitung", teks("nj", 150, 62, "hitung: kelompok lengkung", 10, W.ungu)),
      ...hitungAksi(SUARA_N3, "kl", [SLOT(0, 0), SLOT(0, 1)], "lengkung."),
      tambah("dua", teks("nl", 52, 196, "2 kue", 9, W.ungu)),
    ),
    k(
      SUARA_N4,
      hapus(0, "tg", "kln0", "kln1", "nj"),
      ...[1, 2].map((n) => tambah(n === 1 ? "segitiga" : "empat", teks(`nl${n}`, NX[n] + 44, 196, "2 kue", 9, W.ungu))),
    ),
    k(SUARA_N5, tambah("hasilnya", teks("n6", 150, 62, "semua: 6 kue", 18, W.ungu))),
  ],
};

