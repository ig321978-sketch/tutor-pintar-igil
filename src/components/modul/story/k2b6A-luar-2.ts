import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batang, bola, bulat, buah, emo, judul, kantong, kartu, keranjang, kotak, lapangan, neraca, panah, pindah, piringNeraca, raket, teks, tokoh } from "./k2b6A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b6A-bantu";
import { NAMA_METODE_ID } from "./k2b6A-luar-1";

/*
 * Cerita orisinal IGIL "Peralatan Lomba Pak Anton" (Kelas 2 Bab 6 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b6a.md. Bagian ini: Dot Balance (Neraca Titik), Heavy First (Berat di Dasar), dan ringkasan.
 */

/** Titik `${id}{i}` di piringan neraca berpusat (150, 100) setengah panjang 60; sisi "kiri" atau "kanan"; dy = naik-turun ujung (negatif: kiri turun). */
const titikPan = (id: string, sisi: "kiri" | "kanan", dy: number, n: number): Obj[] => {
  const p = piringNeraca(150, 100, 60, dy)[sisi];
  return Array.from({ length: n }, (_, i) => bulat(`${id}${i}`, p.x + (i - (n - 1) / 2) * 5.2, p.y - 3, 2.4, "#F59E0B", "#92400E", { tebal: 0.9, z: 3 }));
};
const NERACA = (dy: number): Obj[] => neraca("nr", 150, 100, 60, dy);

/* ------------------------------ Dot Balance: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Dot Balance, atau Neraca Titik.";
const SUARA_C2 = "Gambar dua piringan neraca. Beri titik di tiap piringan sesuai berat bendanya.";
const SUARA_C3 = "Satu titik mewakili satu satuan berat. Piringan yang titiknya lebih banyak adalah yang lebih berat.";
const SUARA_C4 = "Kalau banyak titiknya sama, neracanya seimbang, dan kedua benda sama berat.";

export const ADEGAN_LUAR_TITIK: AdeganStory = {
  id: "luar-titik",
  judul: "Dot Balance: Neraca Titik",
  sumber: "Metode global: Dot Balance (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 2: Dot Balance")),
      tambah("Dot", ...NERACA(0)),
      tambah("Neraca", teks("nm", 150, 176, "Neraca Titik", 12, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "nm"),
      tambah("dua", teks("n2", 150, 44, "2 piringan", 10, W.ungu)),
      tambah("titik", ...titikPan("dl", "kiri", 0, 4), ...titikPan("dr", "kanan", 0, 2)),
      ubah("sesuai", ...pindah(NERACA(-6)), ...pindah(titikPan("dl", "kiri", -6, 4)), ...pindah(titikPan("dr", "kanan", -6, 2))),
    ),
    k(
      SUARA_C3,
      hapus(0, "n2"),
      tambah("Satu", ...kartu("kt", 50, 32, 200, 24, W.krem, ["1 titik = 1 satuan berat"], 9)),
      sorotkan("Piringan", "nr-pL"),
      tambah("banyak", panah("pb", 90, 134, 0, 22, W.merah, 2.4)),
      tambah("berat.", teks("lb", 90, 176, "lebih berat", 10, W.merah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "pb", "lb", "kt-k", "kt-t0"),
      ubah("Kalau", ...pindah(NERACA(0)), ...pindah(titikPan("dl", "kiri", 0, 4)), ...pindah(titikPan("dr", "kanan", 0, 2)), { id: "nr-pL", sorot: false }),
      tambah("sama", ...titikPan("dr", "kanan", 0, 4).slice(2)),
      tambah("seimbang,", teks("sb", 150, 176, "seimbang", 12, W.hijau), emo("ok", 150, 70, E.benar, 26)),
    ),
  ],
};

/* ------------------------------ Dot Balance: terapan ------------------------------ */
const SUARA_T1 = "Nia menggambar lima titik untuk bola basket dan empat titik untuk raket. Piringan bola basket turun.";
const SUARA_T2 = "Selisihnya satu titik, jadi bola basket lebih berat satu satuan daripada raket.";
const SUARA_T3 = "Cocok kalau kita ingin tahu selisih berat dengan menghitung titik.";
const SUARA_T4 = "Kurang cocok kalau titiknya terlalu banyak, karena menghitungnya bisa membingungkan.";

const ujung = (dy: number) => ({ kiri: { x: 90, y: 100 - dy }, kanan: { x: 210, y: 100 + dy } });

export const ADEGAN_LUAR_TITIK_TERAPAN: AdeganStory = {
  id: "luar-titik-terapan",
  judul: "Dot Balance: titik Nia",
  sumber: "Metode global: Dot Balance (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Titik Nia"), ...lapangan("lp", 150)),
      tambah("Nia", ...tokoh("ni", 30, 184, "Nia")),
      tambah("menggambar", ...NERACA(0)),
      tambah("lima", ...titikPan("dl", "kiri", 0, 5), teks("n5", 90, 150, "5 titik", 9, W.ungu)),
      tambah("basket", ...bola("bs", ujung(0).kiri.x, ujung(0).kiri.y - 12, 9, "#F97316", "#7C2D12")),
      tambah("empat", ...titikPan("dr", "kanan", 0, 4), teks("n4", 210, 150, "4 titik", 9, W.ungu)),
      tambah("raket.", ...raket("rk", ujung(0).kanan.x, ujung(0).kanan.y - 20, 8)),
      ubah("turun.", ...pindah(NERACA(-6)), ...pindah(titikPan("dl", "kiri", -6, 5)), ...pindah(titikPan("dr", "kanan", -6, 4)), ...pindah(bola("bs", ujung(-6).kiri.x, ujung(-6).kiri.y - 12, 9, "#F97316", "#7C2D12")), ...pindah(raket("rk", ujung(-6).kanan.x, ujung(-6).kanan.y - 20, 8))),
    ),
    k(
      SUARA_T2,
      tambah("Selisihnya", teks("sl", 150, 44, "selisih 1 titik", 10, W.ungu)),
      sorotkan("titik,", "dl4"),
      tambah("basket", emo("ok", 150, 128, E.benar, 20)),
      tambah("satu@2", teks("sa", 150, 176, "1 satuan lebih berat", 9, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 258, 70, E.benar, 28)),
      tambah("tahu", ...kartu("cc", 40, 40, 150, 24, W.hijauMuda, ["selisih berat"], 9)),
      tambah("menghitung", ...Array.from({ length: 5 }, (_, i) => bulat(`ra${i}`, 70 + i * 16, 104, 4, "#F59E0B", "#92400E")), ...Array.from({ length: 4 }, (_, i) => bulat(`rb${i}`, 70 + i * 16, 128, 4, "#F59E0B", "#92400E"))),
      tambah("titik.", teks("sl", 190, 118, "selisih 1", 10, W.ungu)),
      sorotkan("titik.", "ra4"),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 258, 70, E.salah, 28)),
      tambah("titiknya", ...Array.from({ length: 40 }, (_, i) => bulat(`x${i}`, 60 + (i % 10) * 14, 70 + Math.floor(i / 10) * 14, 3.4, "#F59E0B", "#92400E", { tebal: 1 }))),
      tambah("banyak,", teks("tb", 130, 150, "titik terlalu banyak", 10, W.merah)),
      tambah("membingungkan.", emo("tq", 130, 180, E.pusing, 26)),
    ),
  ],
};
/* ------------------------------ Heavy First: konsep ------------------------------ */
const SUARA_D1 = "Cara ketiga, Heavy First, atau Berat di Dasar.";
const SUARA_D2 = "Urutkan benda dari yang paling berat sampai yang paling ringan sebelum menata.";
const SUARA_D3 = "Taruh benda paling berat paling bawah, dan benda paling ringan paling atas.";
const SUARA_D4 = "Dengan begitu tumpukannya kokoh, dan benda yang ringan tidak remuk.";

const tumpuk = (id: string): Obj[] => [
  kotak(`${id}1`, 110, 150, 80, 26, "#B45309", W.coklat, { rx: 2, tebal: 1.8 }),
  kotak(`${id}2`, 122, 126, 56, 24, "#D6A15E", W.coklat, { rx: 2, tebal: 1.8 }),
  kotak(`${id}3`, 134, 104, 32, 22, "#FEF3C7", W.coklat, { rx: 2, tebal: 1.8 }),
];
const barisItem = (xKantong: number, xBola: number, xRaket: number): Obj[] => [...kantong("ik", xKantong - 14, 124, 28, 17), ...bola("ib", xBola, 134, 9, "#F97316", "#7C2D12"), ...raket("ir", xRaket, 130, 7)];

export const ADEGAN_LUAR_DASAR: AdeganStory = {
  id: "luar-dasar",
  judul: "Heavy First: Berat di Dasar",
  sumber: "Metode global: Heavy First (konsep)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Cara 3: Heavy First"), ...lapangan("lp", 180)),
      tambah("Heavy", ...tumpuk("d")),
      tambah("Berat", teks("nm", 150, 197, "Berat di Dasar", 12, W.ungu)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Urutkan Dulu"), ...lapangan("lp", 160)),
      tambah("benda", ...barisItem(220, 80, 150)),
      ubah("dari", ...pindah(barisItem(80, 150, 220))),
      tambah("berat", teks("l1", 80, 176, "paling berat", 9, W.merah)),
      tambah("sampai", panah("pa", 100, 100, 100, 0, W.biru, 2.4)),
      tambah("ringan", teks("l3", 220, 176, "paling ringan", 9, W.hijau)),
      tambah("menata.", emo("tq", 150, 70, E.lampu, 22)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Tata dari Bawah"), ...lapangan("lp", 180)),
      tambah("Taruh", teks("tr", 150, 44, "taruh paling berat dulu", 9, W.ungu)),
      tambah("berat", kotak("d1", 110, 150, 80, 26, "#B45309", W.coklat, { rx: 2, tebal: 1.8 }), teks("l1", 244, 168, "paling berat", 9, W.merah)),
      tambah("bawah,", panah("pb", 70, 120, 0, 40, W.merah, 2.4)),
      tambah("ringan", kotak("d2", 122, 126, 56, 24, "#D6A15E", W.coklat, { rx: 2, tebal: 1.8 }), kotak("d3", 134, 104, 32, 22, "#FEF3C7", W.coklat, { rx: 2, tebal: 1.8 }), teks("l3", 244, 118, "paling ringan", 9, W.hijau)),
      tambah("atas.", panah("pt", 70, 100, 0, -34, W.hijau, 2.4)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Kokoh dan Aman"), ...lapangan("lp", 180), ...tumpuk("d")),
      tambah("kokoh,", emo("ok", 230, 130, E.benar, 26), emo("bs", 70, 130, E.bintang, 24)),
      tambah("tidak", kotak("w1", 218, 164, 56, 22, "#D6A15E", W.coklat, { rx: 2 }), kotak("w2", 222, 184, 48, 6, "#FEF3C7", W.coklat, { rx: 2 })),
      tambah("remuk.", emo("xs", 246, 146, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Heavy First: terapan ------------------------------ */
const SUARA_E1 = "Chacha menata keranjang bekal. Pepaya paling bawah, lalu mangga, dan manggis paling atas.";
const SUARA_E2 = "Keranjang itu kokoh, dan tidak ada buah yang remuk. Chacha bersorak.";
const SUARA_E3 = "Cocok kalau kita menata atau mengangkut banyak benda sekaligus.";
const SUARA_E4 = "Kurang cocok kalau kita hanya ingin tahu benda mana yang lebih berat, karena tidak ada yang ditimbang.";

export const ADEGAN_LUAR_DASAR_TERAPAN: AdeganStory = {
  id: "luar-dasar-terapan",
  judul: "Heavy First: keranjang bekal",
  sumber: "Metode global: Heavy First (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Keranjang Bekal"), ...lapangan("lp", 140)),
      tambah("Chacha", ...tokoh("ch", 36, 184, "Chacha")),
      tambah("keranjang", ...keranjang("kj", 105, 150, 90)),
      tambah("Pepaya", buah("py", 150, 140, "pepaya")),
      tambah("mangga,", buah("mg", 150, 121, "mangga")),
      tambah("manggis", buah("ms", 150, 108, "manggis")),
    ),
    k(
      SUARA_E2,
      tambah("kokoh,", emo("ok", 236, 130, E.benar, 26)),
      ubah("bersorak.", { id: "ch", isi: E.tertawa }),
      tambah("buah", emo("bs", 64, 150, E.bintang, 22)),
      tambah("bersorak.", emo("sr", 36, 148, E.sorak, 22)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 258, 70, E.benar, 28)),
      tambah("menata", ...kartu("cc", 40, 40, 170, 24, W.hijauMuda, ["menata atau mengangkut"], 9)),
      tambah("banyak", ...[0, 1, 2, 3, 4].map((i) => (i % 2 === 0 ? buah(`f${i}`, 70 + i * 36, 110, "pepaya") : buah(`f${i}`, 70 + i * 36, 110, "mangga")))),
      tambah("sekaligus.", emo("kj", 150, 176, "\u{1F9FA}", 36)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 258, 70, E.salah, 28)),
      tambah("hanya", ...kartu("cc", 40, 40, 170, 24, W.merahMuda, ["hanya ingin tahu lebih berat"], 9)),
      tambah("benda", emo("nr", 110, 130, "\u{2696}", 44)),
      tambah("tidak", emo("xt", 160, 110, E.salah, 24)),
      tambah("ditimbang.", teks("tt", 150, 176, "tidak ada yang ditimbang", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya.";
const SUARA_R2 = "Ingin membandingkan banyak benda dalam satu gambar, pakai Model Batang. Ingin tahu selisih berat, pakai Neraca Titik.";
const SUARA_R3 = "Ingin menata atau mengangkut, pakai Berat di Dasar. Apa pun caranya, bandingkan beratnya dengan adil.";
const SUARA_R4 = "Menurutmu, untuk menata ransel sebelum berangkat, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara menimbang",
  sumber: "Metode global: ringkasan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mana yang Pas?")),
      tambah("tiga", teks("t3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("cara.", ...NAMA_METODE_ID.flatMap((m, i) => kartu(`r${i}`, 20, 50 + i * 46, 200, 32, W.krem, [`${i + 1}. ${m}`], 11))),
      tambah("pas?", emo("tq", 262, 96, E.tanya, 28)),
      tambah("tugasnya.", emo("cc", 262, 142, E.catat, 26)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tq", "cc"),
      tambah("gambar,", teks("n1", 262, 120, "1 gambar", 9, W.ungu)),
      tambah("Model", ...batang("sb1", 240, 78, 8, 3, 8, "#93C5FD"), ...batang("sb2", 252, 78, 8, 2, 8, "#BFDBFE")),
      sorotkan("Model", "r0-k"),
      redamkan("Neraca", "r0-k"),
      sorotkan("Neraca", "r1-k"),
      tambah("selisih", ...[0, 1, 2, 3, 4].map((i) => bulat(`sd${i}`, 232 + (i % 3) * 8, 118 + Math.floor(i / 3) * 8, 3, "#F59E0B", "#92400E"))),
    ),
    k(
      SUARA_R3,
      hapus(0, "n1"),
      redamkan(0, "r1-k"),
      tambah("menata", ...tumpuk0()),
      sorotkan("Berat", "r2-k"),
      tambah("adil.", emo("ok", 262, 190, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Caramu")),
      tambah("ransel", emo("rs", 150, 110, E.ransel, 46)),
      tambah("cara", ...NAMA_METODE_ID.flatMap((m, i) => kartu(`p${i}`, 10 + i * 98, 140, 90, 30, W.krem, [m], 8))),
      tambah("mana?", emo("tq", 150, 66, E.tanya, 28)),
    ),
  ],
};
function tumpuk0(): Obj[] {
  return [kotak("sk1", 244, 150, 40, 14, "#B45309", W.coklat, { rx: 1 }), kotak("sk2", 250, 136, 28, 14, "#D6A15E", W.coklat, { rx: 1 }), kotak("sk3", 256, 122, 16, 14, "#FEF3C7", W.coklat, { rx: 1 })];
}
