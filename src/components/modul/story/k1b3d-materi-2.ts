import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kartuAngka, kotak, teks, type Titik } from "./k1b3d-gambar";
import { coretAksi, hapus, k, pindahAksi, rangkai, redamkan, sorotkan, tambah, ubah } from "./k1b3d-bantu";

const ANAK = "\u{1F9D2}";
const BURUNG = "\u{1F426}";
const APEL = "\u{1F34E}";
const BOLA = "⚽";

/* ------------------------------ 1. Menyusun kalimat pengurangan ------------------------------ */
const SUARA_T1 = "Setelah mencari bilangan, kita susun kalimat pengurangan. Kita pakai cerita burung tadi: delapan burung, dua burung terbang.";
const SUARA_T2 = "Susun bilangan pertama, yaitu delapan. Lalu susun tanda kurang. Lalu susun bilangan kedua, yaitu dua.";
const SUARA_T3 = "Lalu susun tanda sama dengan. Tanda ini menunjukkan bahwa hasilnya kita letakkan di sebelah kanan.";
const SUARA_T4 = "Terakhir, susun hasilnya, yaitu enam. Jadi delapan dikurangi dua sama dengan enam.";
const SUARA_T5 = "Ayo baca mengikuti suara guru. Delapan dikurangi dua sama dengan enam. Ucapkan juga, ya!";
const KOTAK_T = (i: number, isi: string) => kartuAngka(`t${i}`, 14 + i * 56, 66, isi, isi === "−" || isi === "=" ? W.krem : i < 2 ? W.merahMuda : i === 2 ? W.hijauMuda : W.emas, 48, 56, 28);

export const ADEGAN_TULIS: AdeganStory = {
  id: "tulis-kalimat",
  judul: "Menyusun kalimat pengurangan",
  sumber: "Materi: menyusun kalimat pengurangan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Menyusun kalimat pengurangan")),
      tambah("delapan", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => emo(`tb${i}`, 28 + 34 * i, 74, BURUNG, 22))),
      tambah("dua", teks("tp", 150, 112, "−", 22, W.biru), ...[0, 1].map((i) => emo(`tc${i}`, 130 + 40 * i, 144, BURUNG, 22))),
    ),
    k(
      SUARA_T2,
      hapus(0, ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `tb${i}`), "tp", "tc0", "tc1"),
      tambah("delapan.", ...KOTAK_T(0, "8")),
      tambah("tanda", ...KOTAK_T(1, "−")),
      tambah("dua@2", ...KOTAK_T(2, "2")),
    ),
    k(SUARA_T3, tambah("sama", ...KOTAK_T(3, "=")), tambah("kanan.", emo("pk", 262, 150, "➡️", 26))),
    k(SUARA_T4, hapus(0, "pk"), tambah("enam.", ...KOTAK_T(4, "6")), sorotkan("enam.", "t4-k")),
    k(
      SUARA_T5,
      redamkan(0, "t4-k"),
      sorotkan("Delapan", "t0-k"),
      sorotkan("dikurangi", "t1-k"),
      sorotkan("dua", "t2-k"),
      sorotkan("sama", "t3-k"),
      sorotkan("enam.", "t4-k"),
      tambah("Ucapkan", emo("sp", 150, 160, "\u{1F5E3}️", 30)),
    ),
  ],
};

/* ------------------------------ 2. Kalimat jawaban ------------------------------ */
const SUARA_J1 = "Sesudah menyusun kalimat pengurangan, kita masih harus menjawab pertanyaan ceritanya. Pertanyaannya, tinggal berapa burung?";
const SUARA_J2 = "Jawabannya enam. Tetapi kalau hanya menyebut enam, jawabannya belum lengkap. Kita tidak tahu, enam apa.";
const SUARA_J3 = "Jawaban yang lengkap menyebut sisa dan nama bendanya. Sisa burung ada enam ekor.";
const SUARA_J4 = "Kalimat jawaban punya tiga bagian: kata sisa, nama benda, dan hasilnya.";
const SUARA_J5 = "Sekarang lengkapi jawabannya di layar. Ketuk nama bendanya. Burung, bukan kepik. Benar!";

export const ADEGAN_JAWAB: AdeganStory = {
  id: "kalimat-jawaban",
  judul: "Menjawab dengan kalimat lengkap",
  sumber: "Materi: kalimat jawaban",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Menjawab pertanyaan"), teks("pj", 150, 50, "8 − 2 = 6", 18, W.merah)), tambah("Pertanyaannya,", ...kartu("jq", 40, 66, 220, 30, W.krem, ["Tinggal berapa burung?"], 10))),
    k(SUARA_J2, tambah("hanya", ...kartu("jx", 90, 106, 120, 34, W.merahMuda, ["6"], 22), emo("sl", 238, 132, "❌", 24)), tambah("apa.", emo("ta", 62, 132, "❓", 26))),
    k(SUARA_J3, hapus(0, "jx-k", "jx-t0", "sl", "ta"), tambah("Sisa@2", ...kartu("jl", 30, 106, 240, 34, W.hijauMuda, ["Sisa burung ada 6 ekor."], 12), emo("ok", 262, 100, "✅", 24))),
    k(
      SUARA_J4,
      tambah("kata", ...kartu("b1", 14, 148, 70, 24, W.langit, ["Sisa"], 10)),
      tambah("benda,", ...kartu("b3", 90, 148, 100, 24, W.pink, ["burung ada"], 10)),
      tambah("hasilnya.", ...kartu("b2", 196, 148, 90, 24, W.emas, ["6 ekor"], 10)),
    ),
    k(
      SUARA_J5,
      hapus(0, "b1-k", "b1-t0", "b2-k", "b2-t0", "b3-k", "b3-t0"),
      tambah("Ketuk", ...kartu("c1", 40, 152, 100, 28, W.hijauMuda, ["burung"], 11), ...kartu("c2", 160, 152, 100, 28, W.merahMuda, ["kepik"], 11)),
      sorotkan("Burung,", "c1-k"),
      ubah("Benar!", { id: "c1-k", warna: W.emas }),
    ),
  ],
};

/* ------------------------------ 3. Yang dicari: yang pergi ------------------------------ */
const SUARA_G1 = "Cerita baru. Di taman ada tujuh anak. Lima anak masih ada di taman. Anak lainnya pergi.";
const SUARA_G2 = "Kali ini yang kita cari adalah yang pergi. Kita tidak mencari sisa. Kita mencari berapa anak yang pergi.";
const SUARA_G3 = "Ketuk anak yang pergi di layar: satu, dua. Ada dua anak yang pergi.";
const SUARA_G4 = "Susun kalimatnya. Tujuh dikurangi lima sama dengan dua.";
const SUARA_G5 = "Jawabannya, dua anak yang pergi. Ayo periksa. Lima ditambah dua sama dengan tujuh. Cocok!";
const TITIK_ANAK: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: 30 + 40 * i, y: 80 }));

export const ADEGAN_PERGI: AdeganStory = {
  id: "cari-pergi",
  judul: "Mencari yang pergi",
  sumber: "Materi: mencari yang pergi",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Anak di taman")),
      tambah("tujuh", ...TITIK_ANAK.map((p, i) => emo(`a${i}`, p.x, p.y, ANAK, 26))),
      sorotkan("Lima", "a0", "a1", "a2", "a3", "a4"),
    ),
    k(SUARA_G2, tambah("pergi.", ...kartu("gq", 40, 110, 220, 28, W.krem, ["yang dicari: yang pergi"], 10)), tambah("berapa", emo("tn", 150, 160, "❓", 30))),
    k(SUARA_G3, hapus(0, "tn"), ...coretAksi(SUARA_G3, "a", TITIK_ANAK, [5, 6], "layar:")),
    k(SUARA_G4, ...rangkai(SUARA_G4, "gs", 172, ["7", "−", "5", "=", "2"], ["Tujuh", "dikurangi", "lima", "sama", "dua."], "kalimatnya.")),
    k(SUARA_G5, hapus(0, "gq-k", "gq-t0"), tambah("Jawabannya,", ...kartu("gj", 50, 112, 200, 24, W.hijauMuda, ["Ada 2 anak yang pergi."], 10)), tambah("Lima", teks("gc", 150, 150, "5 + 2 = 7", 14, W.hijau)), tambah("Cocok!", emo("ok", 262, 148, "✅", 26))),
  ],
};

/* ------------------------------ 4. Yang dicari: mula-mula ------------------------------ */
const SUARA_M1 = "Cerita lain. Di keranjang ada beberapa apel. Lalu tiga apel diambil. Sisa apel di keranjang ada empat.";
const SUARA_M2 = "Sekarang yang kita cari adalah mula-mula. Mula-mula ada berapa apel? Kita belum tahu.";
const SUARA_M3 = "Cari dengan tambah. Apel yang diambil kita kembalikan ke keranjang: satu, dua, tiga.";
const SUARA_M4 = "Sekarang di keranjang ada empat ditambah tiga, yaitu tujuh apel. Jadi mula-mula ada tujuh apel.";
const SUARA_M5 = "Periksa: tujuh dikurangi tiga sama dengan empat. Cocok! Mula-mula ada tujuh apel.";
const DALAM: Titik[] = [0, 1, 2, 3, 4, 5, 6].map((i) => (i < 4 ? { x: 40 + 30 * i, y: 100 } : { x: 40 + 30 * (i - 4), y: 124 }));
const LUAR: Titik[] = [0, 1, 2].map((i) => ({ x: 210 + 30 * i, y: 100 }));

export const ADEGAN_MULA: AdeganStory = {
  id: "cari-mula",
  judul: "Mencari mula-mula",
  sumber: "Materi: mencari mula-mula",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Apel di keranjang")),
      tambah("keranjang", kotak("kr", 20, 82, 150, 62, "#FDE68A", W.coklat, { rx: 6, tebal: 1.8 }), kotak("kr-r", 17, 78, 156, 7, "#FCD34D", W.coklat, { rx: 3, tebal: 1.4 }), teks("qm", 95, 118, "?", 22, W.merah)),
      tambah("tiga", ...LUAR.map((p, i) => emo(`ap${4 + i}`, p.x, p.y, APEL, 22, { op: 0.5 }))),
      tambah("empat.", ...[0, 1, 2, 3].map((i) => emo(`ap${i}`, DALAM[i].x, DALAM[i].y, APEL, 22))),
      hapus("empat.", "qm"),
    ),
    k(SUARA_M2, tambah("mula-mula@2", ...kartu("mq", 60, 156, 180, 24, W.krem, ["mula-mula: ?"], 11)), tambah("belum", teks("qk", 150, 196, "? − 3 = 4", 16, W.merah))),
    k(SUARA_M3, ...pindahAksi(SUARA_M3, ["ap4", "ap5", "ap6"], DALAM.slice(4), "keranjang:", 1)),
    k(SUARA_M4, tambah("empat", ...kartu("mt", 60, 156, 180, 24, W.hijauMuda, ["4 + 3 = 7"], 11)), hapus(0, "mq-k", "mq-t0"), ubah("Jadi", { id: "qk", isi: "7 − 3 = 4" })),
    k(SUARA_M5, tambah("Periksa:", emo("ok", 262, 150, "✅", 26)), hapus(0, "mt-k", "mt-t0"), tambah("Cocok!", ...kartu("mj", 40, 156, 220, 24, W.emas, ["Mula-mula ada 7 apel."], 10.4))),
  ],
};

/* ------------------------------ 5. Soal bola Kira ------------------------------ */
const SUARA_S1 = "Mari kita kerjakan satu soal cerita dari awal. Kira punya sepuluh bola. Tiga bola ada di luar kardus. Berapa bola di dalam kardus?";
const SUARA_S2 = "Langkah pertama, baca dan cari. Mula-mula ada sepuluh bola. Yang di luar ada tiga. Kata petunjuknya, di luar kardus.";
const SUARA_S3 = "Langkah kedua, susun kalimat pengurangan. Sepuluh dikurangi tiga sama dengan tujuh.";
const SUARA_S4 = "Langkah ketiga, susun kalimat jawaban. Di dalam kardus ada tujuh bola.";
const SUARA_S5 = "Langkah keempat, periksa. Tujuh ditambah tiga sama dengan sepuluh. Cocok!";
const DALAM_BOLA: Titik[] = [0, 1, 2, 3, 4, 5, 6].map((i) => (i < 4 ? { x: 66 + 36 * i, y: 82 } : { x: 84 + 36 * (i - 4), y: 104 }));

export const ADEGAN_KARDUS: AdeganStory = {
  id: "soal-bola",
  judul: "Soal cerita: bola dan kardus",
  sumber: "Materi: soal cerita bola dan kardus",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Soal cerita Kira"), kotak("kd", 50, 62, 140, 62, "#FDE68A", W.coklat, { rx: 6, tebal: 1.8 }), emo("kr", 20, 100, ANAK, 22)),
      tambah("sepuluh", teks("tb10", 150, 48, "10 bola", 10, W.merah), ...DALAM_BOLA.map((p, i) => emo(`bl${i}`, p.x, p.y, BOLA, 20)), ...[0, 1, 2].map((i) => emo(`bl${7 + i}`, 225 + 30 * i, 100, BOLA, 20))),
      sorotkan("luar", "bl7", "bl8", "bl9"),
    ),
    k(SUARA_S2, tambah("pertama,", ...kartu("l1", 14, 136, 272, 22, W.hijauMuda, ["Langkah 1: baca dan cari"], 9.4)), tambah("sepuluh", ...kartuAngka("n1", 70, 164, "10", W.merahMuda, 44, 30, 18)), tambah("tiga.", ...kartuAngka("n2", 186, 164, "3", W.hijauMuda, 44, 30, 18))),
    k(
      SUARA_S3,
      hapus(0, "l1-k", "l1-t0", "n1-k", "n1-t", "n2-k", "n2-t"),
      tambah("kedua,", ...kartu("l2", 14, 136, 272, 22, W.langit, ["Langkah 2: susun kalimat pengurangan"], 9.4)),
      ...rangkai(SUARA_S3, "ss", 182, ["10", "−", "3", "=", "7"], ["Sepuluh", "dikurangi", "tiga", "sama", "tujuh."], "pengurangan."),
    ),
    k(SUARA_S4, hapus(0, "l2-k", "l2-t0", "ss0", "ss1", "ss2", "ss3", "ss4"), tambah("ketiga,", ...kartu("l3", 14, 136, 272, 22, W.pink, ["Langkah 3: susun kalimat jawaban"], 9.4)), tambah("kardus", ...kartu("sj", 50, 164, 200, 22, W.hijauMuda, ["Di kardus ada 7 bola."], 10))),
    k(SUARA_S5, hapus(0, "l3-k", "l3-t0"), tambah("keempat,", ...kartu("l4", 14, 136, 272, 22, W.krem, ["Langkah 4: periksa"], 9.4)), hapus(0, "sj-k", "sj-t0"), tambah("Tujuh", teks("pc", 150, 180, "7 + 3 = 10", 14, W.hijau)), tambah("Cocok!", emo("ok", 262, 150, "✅", 26))),
  ],
};
