import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WI, akuariumAngka, emo, ikan, judul, kartu, kotak, konfeti, orang, teks, titikIsi } from "./k1b5d-gambar";
import { bersih, hapus, idx, k, tambah, ubah, urutBilangan } from "./k1b5d-bantu";

/* Akhir "Lapak Ikan Dibuka": pesanan Pak RT dan tetangga dipenuhi, lapak resmi dibuka (akhir cerita bab), lalu penutup. Tanpa latihan. */

/* ------------------------------ 7. Pesanan ------------------------------ */
const SUARA_O1 = "Pak RT memesan enam belas ikan guppy. Tetangga memesan sembilan belas ikan neon.";
const SUARA_O2 = "Akuarium guppy berisi lima belas, kurang satu dari pesanan Pak RT. Abang menambah satu ikan lagi supaya pas.";
const SUARA_O3 = "Akuarium neon berisi dua puluh, lebih banyak daripada pesanan sembilan belas. Cukup!";
const [O1_16, O1_19] = urutBilangan(SUARA_O1, [16, 19]);
/** Tempat ikan ke-16 di akuarium guppy (nomor 15, dihitung dari nol). */
const TEMPAT_16 = titikIsi(24, 100, 112, 15);

export const ADEGAN_PESANAN: AdeganStory = {
  id: "pesanan",
  judul: "Pesanan Pak RT dan tetangga",
  sumber: "Materi: pesanan pas, kurang, dan lebih",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pesanan pembeli")),
      tambah("Pak", ...orang("pr", 40, 76, E.pakRT, "Pak RT")),
      tambah(O1_16, ...kartu("o1", 14, 28, 128, 22, W.krem, ["Pak RT: 16 guppy"], 9)),
      tambah("Tetangga", ...orang("tg", 260, 76, E.warga, "Tetangga")),
      tambah(O1_19, ...kartu("o2", 158, 28, 128, 22, W.langit, ["Tetangga: 19 neon"], 9)),
    ),
    k(
      SUARA_O2,
      tambah("Akuarium", ...akuariumAngka("ag", 24, 100, 112, 48, 15, WI.guppy)),
      tambah("kurang", teks("kg", 80, 192, "kurang 1", 9, W.merah)),
      tambah("Abang", ...orang("ab", 150, 178, E.abang, "Abang")),
      tambah("menambah", ...ikan("ex", 150, 116, WI.guppy, 0.36)),
      ubah("lagi", { id: "ex", x: TEMPAT_16.x, y: TEMPAT_16.y }, { id: "ex-m", x: Number((TEMPAT_16.x + 1.8).toFixed(1)), y: Number((TEMPAT_16.y - 0.5).toFixed(1)) }),
      ubah("pas.", { id: "ag-n", isi: "16", warna: W.merah }, { id: "kg", isi: "jadi 16: pas", warna: W.hijau }),
    ),
    k(
      SUARA_O3,
      tambah("Akuarium", ...akuariumAngka("an", 164, 100, 112, 48, 20, WI.neon)),
      tambah("banyak", teks("lb", 228, 192, "20 lebih banyak dari 19", 8.6, W.hijau)),
      tambah("Cukup!", emo("ok", 258, 170, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 8. Lapak buka (akhir cerita bab) ------------------------------ */
const SUARA_L1 = "Semua pesanan terlayani, tidak ada yang kurang. Mamah menggunting pita di depan lapak.";
const SUARA_L2 = "Lapak Ikan Hias Abang resmi dibuka! Pembeli bertepuk tangan.";
const SUARA_L3 = "Igil, Kaka, dan Abang saling tersenyum. Dari satu kantong guppy tadi, kini ada lapak yang ramai.";
const pita = (id: string, x: number, w: number, rot: number): Obj => kotak(id, x, 126, w, 6, W.merah, W.biru, { rx: 2, tebal: 1.2, rot, z: 2 });

export const ADEGAN_LAPAK_BUKA: AdeganStory = {
  id: "lapak-buka",
  judul: "Lapak Ikan Hias Abang dibuka",
  sumber: "Materi: lapak dibuka, akhir cerita",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Semua pesanan terlayani")),
      tambah("pesanan", ...kartu("c1", 20, 30, 120, 20, W.hijauMuda, ["Pak RT: 16 guppy"], 8.6), emo("v1", 150, 46, E.benar, 14)),
      tambah("terlayani,", ...kartu("c2", 160, 30, 120, 20, W.hijauMuda, ["Tetangga: 19 neon"], 8.6), emo("v2", 290, 46, E.benar, 14)),
      tambah("Mamah", ...orang("mm", 48, 164, E.mamah, "Mamah")),
      tambah("menggunting", emo("gt", 92, 140, E.gunting, 18)),
      tambah("pita", pita("pt", 80, 160, 0)),
      tambah("lapak.", emo("lp", 150, 108, E.lapak, 44)),
    ),
    k(
      SUARA_L2,
      hapus(0, "c1-k", "c1-t0", "v1", "c2-k", "c2-t0", "v2", "gt", "pt"),
      ubah(0, { id: "jud", isi: "Lapak Ikan Hias Abang dibuka!", warna: W.merah }),
      tambah("Lapak", pita("pa", 70, 70, -22), pita("pb", 160, 70, 22), ...konfeti("kf")),
      tambah("dibuka!", ...kartu("bk", 100, 142, 100, 28, W.emas, ["BUKA"], 14), emo("ps", 262, 80, E.pesta, 24)),
      tambah("Pembeli", emo("q0", 214, 184, E.warga, 20), emo("q1", 250, 184, E.pria, 20)),
      tambah("bertepuk", emo("tp", 232, 160, E.tepuk, 18)),
    ),
    k(
      SUARA_L3,
      hapus(0, "mm", "mm-n", "pa", "pb", "bk-k", "bk-t0", "q0", "q1", "tp", "ps", "lp"),
      ubah(0, { id: "jud", isi: "Lapak ramai!", warna: W.ungu }),
      tambah(idx(SUARA_L3, "Igil"), ...orang("ig", 60, 104, E.igil, "Igil")),
      tambah(idx(SUARA_L3, "Kaka"), ...orang("kk", 150, 104, E.kaka, "Kaka")),
      tambah(idx(SUARA_L3, "Abang"), ...orang("ab", 240, 104, E.abang, "Abang")),
      tambah("tersenyum.", emo("s0", 60, 74, E.senang, 16), emo("s1", 150, 74, E.senang, 16), emo("s2", 240, 74, E.senang, 16)),
      tambah("satu", ...kartu("kt", 24, 140, 100, 36, W.langit, ["1 kantong", "guppy"], 9.4)),
      tambah("kini", { id: "pn", t: "panah", x: 130, y: 158, x2: 34, y2: 0, warna: W.hijau, tebal: 2.4 }),
      tambah("lapak", emo("lp2", 194, 170, E.lapak, 34)),
      tambah("ramai.", emo("qa", 234, 172, E.warga, 20), emo("qb", 264, 172, E.pria, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, ya. Pasangkan satu-satu untuk membandingkan. Puluhan dibandingkan lebih dulu, baru satuan.";
const SUARA_Q2 = "Paling banyak dan paling sedikit dicari di antara semuanya. Urutan bisa dari terkecil atau dari terbesar.";
const SUARA_Q3 = "Menurutmu, bagian mana dari cerita lapak ikan Abang yang paling seru? Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const baris = (i: number, y: number, h: number, warna: string): Obj => kotak(`p${i}`, 14, y, 272, h, warna, W.biru, { rx: 8, tebal: 1.6, z: -2 });
const kiri = (id: string, y: number, isi: string, u = 9.4, warna: string = W.biru): Obj => teks(id, 24, y, isi, u, warna, { anchor: "start" });
const kanan = (id: string, y: number, isi: string, u = 9, warna: string = W.ungu): Obj => teks(id, 278, y, isi, u, warna, { anchor: "end" });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara membandingkan",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("Pasangkan", baris(0, 32, 40, W.hijauMuda), kiri("p0a", 56, "pasangkan 1 dengan 1")),
      tambah("membandingkan.", kanan("p0b", 56, "membandingkan", 9, W.hijau)),
      tambah("Puluhan", baris(1, 78, 40, W.lavender), kiri("p1a", 102, "puluhan dulu, baru satuan")),
      tambah("satuan.", kanan("p1b", 102, "13 dan 9")),
    ),
    k(
      SUARA_Q2,
      tambah("Paling", baris(2, 124, 30, W.krem), kiri("p2a", 143, "paling banyak, paling sedikit", 8.6, W.hijau)),
      tambah("semuanya.", kanan("p2b", 143, "cari di antara semua", 8.6)),
      tambah("Urutan", baris(3, 160, 32, W.pink), kiri("p3a", 180, "urutan: terkecil atau terbesar", 9.4, W.merah)),
      tambah("terbesar.", kanan("p3b", 180, "garis bilangan", 8.6)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah("cerita", ...akuariumAngka("qa", 10, 34, 88, 52, 18, WI.guppy), ...akuariumAngka("qb", 106, 34, 88, 52, 9, WI.koki), ...akuariumAngka("qc", 202, 34, 88, 52, 13, WI.neon)),
      tambah("seru?", emo("qt", 150, 130, E.tanya, 18)),
      tambah("Igil,", ...orang("ig", 45, 166, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 166, E.kaka, "Kaka")),
      tambah("Abang@2", ...orang("ab", 185, 166, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 255, 166, E.mamah, "Mamah")),
    ),
  ],
};
