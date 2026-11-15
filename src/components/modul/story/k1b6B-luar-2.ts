import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { OWL, W, bingkai, bulat, deret, emo, garis, kartu, pusatSel, teks, type Titik } from "./k1b6B-gambar";
import { bersih, hapus, hitungAksi, k, pindah, redamkan, sorotkan, tambah, ubah } from "./k1b6B-bantu";
import { kepala } from "./k1b6B-luar-1";

const bulatAngka = (id: string, x: number, y: number, r: number, isi: string, warna: string): Obj[] => [bulat(`${id}-b`, x, y, r, warna, W.biru, { tebal: 1.6 }), teks(`${id}-t`, x, y + 5.5, isi, 16, W.merah)];

/* ------------------------------ 4. Pasangan sampai 20: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Pasangan sampai dua puluh. Kita mencari dua bilangan yang jika digabung menjadi dua puluh.";
const SUARA_C2 = "Pasangan ini memecah dua puluh menjadi dua bagian. Satu bagiannya delapan, bagian yang lain dua belas.";
const SUARA_C3 = "Delapan ditambah dua belas menjadi dua puluh. Dua bagian itu adalah sepasang.";
const SUARA_C4 = "Ada banyak pasangan lain. Sembilan dan sebelas, sepuluh dan sepuluh, tujuh dan tiga belas. Semuanya menjadi dua puluh.";
const SUARA_C5 = "Kalau kita hafal pasangan dua puluh, kita bisa menemukan bilangan yang hilang dengan cepat. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Pasangan sampai 20: dua bagian yang jumlahnya dua puluh",
  sumber: "Metode luar: Pasangan sampai 20",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("mencari", ...kartu("pd", 50, 90, 200, 28, W.krem, ["pasangan: jumlahnya 20"], 10)), tambah("digabung", emo("pe", 150, 160, "\u{1F517}", 30))),
    k(
      SUARA_C2,
      hapus(0, "pd-k", "pd-t0", "pe"),
      tambah("memecah", ...bulatAngka("pa", 150, 76, 18, "20", W.krem)),
      tambah("bagian.", garis("l1", 150, 94, -50, 16, W.biru, 2), garis("l2", 150, 94, 50, 16, W.biru, 2)),
      tambah("delapan,", ...bulatAngka("pb", 100, 126, 16, "8", W.hijauMuda)),
      tambah("belas.", ...bulatAngka("pc", 200, 126, 16, "12", W.langit)),
    ),
    k(SUARA_C3, sorotkan("Delapan", "pb-b"), sorotkan("belas", "pc-b"), tambah("menjadi", ...kartu("pj", 60, 156, 180, 26, W.emas, ["8 + 12 = 20"], 11))),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("Sembilan", ...kartu("q1", 40, 56, 220, 28, W.hijauMuda, ["9 + 11 = 20"], 11)),
      tambah("sepuluh", ...kartu("q2", 40, 92, 220, 28, W.langit, ["10 + 10 = 20"], 11)),
      tambah("tujuh", ...kartu("q3", 40, 128, 220, 28, W.pink, ["7 + 13 = 20"], 11)),
    ),
    k(SUARA_C5, tambah("hafal", emo("ow", 150, 190, OWL, 28)), tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 26)), sorotkan("menemukan", "q1-k", "q2-k", "q3-k")),
  ],
};

/* ------------------------------ 5. Pasangan sampai 20: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada pasangan dua puluh. Empat belas ditambah berapa supaya menjadi dua puluh?";
const SUARA_D2 = "Dari empat belas kita maju. Lima belas, enam belas, tujuh belas, delapan belas, sembilan belas, dua puluh.";
const SUARA_D3 = "Kita maju enam langkah. Jadi pasangan empat belas adalah enam.";
const SUARA_D4 = "Empat belas ditambah enam menjadi dua puluh. Hebat! Itu pasangan dua puluh.";
const P6: Titik[] = Array.from({ length: 6 }, (_, i) => ({ x: 40 + i * 44, y: 172 }));
const IDP = Array.from({ length: 6 }, (_, i) => `pt${i}`);

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Pasangan sampai 20: empat belas dan pasangannya",
  sumber: "Metode luar: Pasangan sampai 20, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah("Terapkan", ...kepala(1)),
      tambah("pasangan", ...bulatAngka("pa", 150, 76, 16, "20", W.krem)),
      tambah("Empat", garis("l1", 150, 92, -50, 14, W.biru, 2), garis("l2", 150, 92, 50, 14, W.biru, 2), ...bulatAngka("pb", 100, 120, 14, "14", W.hijauMuda)),
      tambah("berapa", ...bulatAngka("pc", 200, 120, 14, "?", W.langit)),
    ),
    k(SUARA_D2, tambah("kita", ...deret("kelereng", "pt", P6, 7)), ...hitungAksi(SUARA_D2, "pt", P6, { setelah: "maju.", dari: 15 })),
    k(SUARA_D3, hapus(0, "tg"), sorotkan("enam", ...IDP), ubah("enam@2", { id: "pc-t", isi: "6" })),
    k(
      SUARA_D4,
      hapus(0, ...IDP, ...IDP.map((_, i) => `ptn${i}`)),
      tambah("Empat", ...kartu("pj", 60, 152, 180, 26, W.emas, ["14 + 6 = 20"], 11)),
      tambah("Hebat!", emo("ok", 262, 190, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 6. Menjadikan Sepuluh: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga bernama Menjadikan Sepuluh. Kita isi dulu sampai sepuluh, lalu menambah sisanya.";
const SUARA_E2 = "Contoh sembilan ditambah empat. Sembilan donat sudah ada di kotak sepuluh, tinggal satu petak kosong.";
const SUARA_E3 = "Seret satu donat ke petak kosong. Sembilan ditambah satu menjadi sepuluh.";
const SUARA_E4 = "Donat yang tersisa ada tiga. Sepuluh ditambah tiga menjadi tiga belas.";
const SUARA_E5 = "Jadi sembilan ditambah empat sama dengan tiga belas. Ucapkan lagi mengikuti suara guru.";
const SX = 85;
const SY = 56;
const SC9: Titik[] = Array.from({ length: 9 }, (_, i) => pusatSel(i, SX, SY));
const QLUAR: Titik[] = Array.from({ length: 4 }, (_, i) => ({ x: 70 + i * 54, y: 160 }));

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Menjadikan Sepuluh: isi sepuluh dulu",
  sumber: "Metode luar: Menjadikan Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah("isi", ...kartu("kd", 50, 90, 200, 28, W.krem, ["isi 10 dulu, lalu sisa"], 10)), tambah("sisanya.", emo("pe", 150, 160, "\u{1F51F}", 30))),
    k(
      SUARA_E2,
      hapus(0, "kd-k", "kd-t0", "pe"),
      tambah("Contoh", ...bingkai("sf", SX, SY)),
      tambah("Sembilan@2", ...deret("donat", "d", SC9, 8)),
      tambah("tinggal", ...deret("donat", "q", QLUAR, 8)),
      ubah("kosong.", { id: "sf-c9", warna: "#FECACA" }),
    ),
    k(SUARA_E3, pindah("petak", "q0", pusatSel(9, SX, SY).x, pusatSel(9, SX, SY).y), tambah("Sembilan", ...kartu("ke", 60, 118, 180, 22, W.emas, ["9 + 1 = 10"], 11))),
    k(
      SUARA_E4,
      ubah(0, ...Array.from({ length: 10 }, (_, i) => ({ id: `sf-c${i}`, warna: "#FEF08A" }))),
      sorotkan("tersisa", "q1", "q2", "q3"),
      hapus(0, "ke-k", "ke-t0"),
      tambah("Sepuluh", ...kartu("kf", 60, 118, 180, 22, W.hijauMuda, ["10 + 3 = 13"], 11)),
    ),
    k(
      SUARA_E5,
      redamkan(0, "q1", "q2", "q3"),
      hapus(0, "kf-k", "kf-t0"),
      tambah("Jadi", ...kartu("kg", 60, 118, 180, 22, W.emas, ["9 + 4 = 13"], 11)),
      tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 26)),
    ),
  ],
};

/* ------------------------------ 7. Menjadikan Sepuluh: terapan ------------------------------ */
const SUARA_F1 = "Terapkan pada delapan ditambah tujuh. Ada delapan balon di kotak sepuluh dan tujuh balon di luar.";
const SUARA_F2 = "Delapan butuh dua balon lagi untuk menjadi sepuluh. Seret dua balon ke kotak. Sepuluh!";
const SUARA_F3 = "Sisanya lima balon. Sepuluh ditambah lima menjadi lima belas.";
const SUARA_F4 = "Jadi delapan ditambah tujuh sama dengan lima belas. Hebat, kamu sudah mengisi sepuluh dulu!";
const RB = 6.5;
const FB8: Titik[] = Array.from({ length: 8 }, (_, i) => pusatSel(i, SX, SY));
const FLUAR: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: 30 + i * 40, y: 160 }));
const pindahBalon = (at: string | number, id: string, p: Titik): Aksi => ({ at, ubah: [{ id, x: p.x, y: p.y }, { id: `${id}-x`, x: p.x, y: p.y + RB * 0.9 }] });

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Menjadikan Sepuluh: delapan ditambah tujuh",
  sumber: "Metode luar: Menjadikan Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah("Terapkan", ...kepala(2), ...bingkai("fb", SX, SY)),
      tambah("delapan@2", ...deret("balon", "o", FB8, RB)),
      tambah("tujuh@2", ...deret("balon", "p", FLUAR, RB)),
      tambah("kotak", ...kartu("fp", 60, 118, 180, 20, W.krem, ["kotak sepuluh: 10 petak"], 8.8)),
    ),
    k(
      SUARA_F2,
      hapus(0, "fp-k", "fp-t0"),
      ubah("butuh", { id: "fb-c8", warna: "#FECACA" }, { id: "fb-c9", warna: "#FECACA" }),
      pindahBalon("Seret", "p0", pusatSel(8, SX, SY)),
      pindahBalon("kotak.", "p1", pusatSel(9, SX, SY)),
      ubah("sepuluh@2", ...Array.from({ length: 10 }, (_, i) => ({ id: `fb-c${i}`, warna: "#FEF08A" }))),
    ),
    k(
      SUARA_F3,
      sorotkan("lima", "p2", "p3", "p4", "p5", "p6"),
      tambah("Sepuluh", ...kartu("fj", 60, 118, 180, 22, W.hijauMuda, ["10 + 5 = 15"], 11)),
    ),
    k(
      SUARA_F4,
      redamkan(0, "p2", "p3", "p4", "p5", "p6"),
      hapus(0, "fj-k", "fj-t0"),
      tambah("Jadi", ...kartu("fz", 60, 118, 180, 22, W.emas, ["8 + 7 = 15"], 11)),
      tambah("Hebat,", emo("ok", 262, 190, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Maju dan Mundur: mulai dari bilangan pertama, lalu maju.";
const SUARA_R2 = "Pasangan sampai dua puluh: cari dua bagian yang jumlahnya dua puluh.";
const SUARA_R3 = "Menjadikan Sepuluh: isi dulu sampai sepuluh, lalu tambahkan sisanya.";
const SUARA_R4 = "Semua cara menghasilkan jumlah yang sama. Pilih yang paling mudah. Hebat sekali!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, teks("rj", 150, 18, "Ringkasan tiga metode", 11, W.ungu)), tambah("Maju", ...kartu("r1", 14, 34, 220, 44, W.hijauMuda, ["1. Maju dan Mundur", "mulai dari bilangan pertama, maju"], 9.4))),
    k(SUARA_R2, tambah("Pasangan", ...kartu("r2", 14, 84, 220, 44, W.langit, ["2. Pasangan sampai 20", "dua bagian, jumlahnya 20"], 9.4))),
    k(SUARA_R3, tambah("Menjadikan", ...kartu("r3", 14, 134, 220, 44, W.pink, ["3. Menjadikan Sepuluh", "isi 10 dulu, lalu sisa"], 9.4))),
    k(SUARA_R4, tambah("Semua", emo("ow", 262, 100, OWL, 36)), tambah("Hebat", emo("ok", 262, 150, "\u{1F389}", 30)), sorotkan("paling", "r1-k", "r2-k", "r3-k")),
  ],
};
