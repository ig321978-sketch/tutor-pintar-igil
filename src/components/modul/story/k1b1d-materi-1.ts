import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, garis, ikatan, judul, kartu, piring, tata, teks } from "./k1b1d-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b1d-bantu";

const OWL = "\u{1F989}";
const DONAT = "\u{1F369}";
const BOLU = "\u{1F370}";

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Mereka membawa kue, bola, dan kelereng.";
const SUARA_C2 = "Kira membawa kue di piring besar. Upe dan Wei membawa bola. Malosi membawa kelereng. Banyak sekali benda yang bisa kita bagi.";
const SUARA_C3 = "Igil bertanya, bagaimana kalau satu bilangan kita pisahkan menjadi dua bagian? Lalu bagaimana kalau dua bagian kita gabungkan kembali menjadi satu yang utuh?";
const SUARA_C4 = "Hari ini kita belajar memisahkan, menggabungkan, dan mencari pasangan bilangan. Kita memakai bilangan sampai sepuluh saja.";
const SUARA_C5 = "Pelan-pelan saja, ya. Kita mulai dari benda yang bisa kita pegang. Ayo ikut Kira dan kuenya.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Malosi, Kira, Upe, dan Wei di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), garis("tanah", 14, 142, 272, 0, W.hijau, 3)),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, OWL, 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      tambah("Kira", emo("bk", 95, 90, DONAT, 24)),
      tambah("bola.", emo("bu", 150, 90, "⚽", 24), emo("bw", 205, 90, "⚽", 24)),
      tambah("kelereng.", bulat("bm", 40, 80, 10, "#F472B6", W.biru)),
      tambah("Banyak", teks("bn", 150, 60, "Banyak benda untuk dibagi", 9, W.ungu)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Pisah dan gabung"), emo("ig3", 150, 176, OWL, 30)),
      tambah("pisahkan", ...kartu("cp", 40, 40, 220, 30, W.langit, ["satu bilangan jadi dua bagian"], 9.4)),
      tambah("gabungkan", ...kartu("cg", 40, 90, 220, 30, W.pink, ["dua bagian jadi satu utuh"], 9.4)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Hari ini kita belajar")),
      tambah("memisahkan,", ...kartu("h1", 20, 34, 260, 30, W.hijauMuda, ["memisahkan satu bilangan"], 9.4)),
      tambah("menggabungkan,", ...kartu("h2", 20, 74, 260, 30, W.langit, ["menggabungkan dua bagian"], 9.4)),
      tambah("mencari", ...kartu("h3", 20, 114, 260, 30, W.krem, ["mencari pasangan bilangan"], 9.4)),
      tambah("sepuluh", ...kartu("h4", 70, 156, 160, 28, W.emas, ["bilangan sampai 10"], 10)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Mulai dari benda")),
      tambah("benda", emo("pg", 100, 120, "✋", 52)),
      tambah("kuenya.", emo("pk", 200, 120, DONAT, 52)),
    ),
  ],
};

/* ------------------------------ 2. Lima kue Kira dipisahkan ------------------------------ */
const SUARA_K1 = "Kira mempunyai lima kue di piring besar. Ada dua donat cokelat dan tiga kue bolu kuning.";
const SUARA_K2 = "Kita hitung dulu semuanya. Satu, dua, tiga, empat, lima.";
const SUARA_K3 = "Lima adalah bilangan yang utuh. Semua kue masih berkumpul di satu piring besar.";
const SUARA_K4 = "Sekarang Kira memisahkan kuenya ke dua piring kecil. Donat cokelat pindah ke piring kiri.";
const SUARA_K5 = "Kue bolu kuning pindah ke piring kanan. Piring kiri berisi dua kue, dan piring kanan berisi tiga kue.";
const SUARA_K6 = "Lima dipisahkan menjadi dua dan tiga. Dua adalah satu bagian, dan tiga adalah bagian yang lain.";
const SUARA_K7 = "Kalau dua bagian digabung lagi, kuenya kembali menjadi lima. Tidak ada kue yang hilang.";
const P5 = tata(5, 98);
const kue = (i: number) => emo(`kue${i}`, P5[i].x, P5[i].y, i < 2 ? DONAT : BOLU, 22, { z: 1 });
const IDK = [0, 1, 2, 3, 4].map((i) => `kue${i}`);
const LABEL_K = [0, 1, 2, 3, 4].map((i) => `kuen${i}`);

export const ADEGAN_KUE: AdeganStory = {
  id: "kue-kira",
  judul: "Kira memisahkan lima kue",
  sumber: "Materi: lima kue Kira",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Lima kue Kira")),
      tambah("piring", { id: "pb", t: "kotak", x: 16, y: 62, w: 268, h: 52, warna: W.putih, garis: W.coklat, rx: 24, tebal: 2.4, z: -1 }),
      tambah("dua", ...[0, 1].map(kue)),
      tambah("tiga", ...[2, 3, 4].map(kue)),
    ),
    k(SUARA_K2, ...hitungAksi(SUARA_K2, "kue", P5, "semuanya.")),
    k(SUARA_K3, sorotkan("utuh.", ...IDK), tambah(idx(SUARA_K3, "piring"), ...kartu("ut", 60, 146, 180, 30, W.krem, ["lima kue: yang utuh"], 9.4))),
    k(
      SUARA_K4,
      hapus(0, "tg", "ut-k", "ut-t0", "pb", ...LABEL_K),
      tambah("memisahkan", piring("pl", 80, 148, 38, { z: -1 }), piring("pr", 220, 148, 38, { z: -1 })),
      ubah(idx(SUARA_K4, "Donat"), { id: "kue0", x: 66, y: 152 }, { id: "kue1", x: 94, y: 152 }),
    ),
    k(
      SUARA_K5,
      ubah("bolu", { id: "kue2", x: 194, y: 152 }, { id: "kue3", x: 220, y: 152 }, { id: "kue4", x: 246, y: 152 }),
      tambah(idx(SUARA_K5, "dua"), teks("l2", 80, 196, "2", 16, W.merah)),
      tambah(idx(SUARA_K5, "tiga"), teks("l3", 220, 196, "3", 16, W.merah)),
    ),
    k(SUARA_K6, tambah("dipisahkan", ...kartu("k6", 70, 34, 160, 28, W.emas, ["5 jadi 2 dan 3"], 11)), sorotkan("bagian,", "pl", "pr")),
    k(
      SUARA_K7,
      ubah("digabung", ...P5.map((p, i) => ({ id: `kue${i}`, x: p.x, y: 94 })), { id: "k6-t0", isi: "2 dan 3 jadi 5" }),
      tambah("hilang.", emo("ow", 262, 182, OWL, 28)),
    ),
  ],
};

/* ------------------------------ 3. Bagian dan utuh ------------------------------ */
const SUARA_B1 = "Perhatikan lingkaran ini. Lingkaran di atas menunjukkan bilangan yang utuh, yaitu semua benda yang berkumpul jadi satu.";
const SUARA_B2 = "Dua lingkaran di bawah menunjukkan bagian. Ada bagian yang satu, dan ada bagian yang lain.";
const SUARA_B3 = "Lima kue tadi adalah yang utuh. Dua donat adalah satu bagian, dan tiga kue bolu adalah bagian yang lain.";
const SUARA_B4 = "Kalau dua bagian digabung, kita mendapat yang utuh lagi. Dua dan tiga digabung menjadi lima.";
const SUARA_B5 = "Kalau yang utuh dipisah, kita mendapat dua bagian. Lima dipisahkan menjadi dua dan tiga.";
const SUARA_B6 = "Ingat ya, dua bagian digabung menjadi satu utuh. Satu utuh dipisah menjadi dua bagian.";

export const ADEGAN_BAGIAN: AdeganStory = {
  id: "bagian-utuh",
  judul: "Bagian dan utuh",
  sumber: "Materi: bagian dan utuh",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Utuh dan bagian"), ...ikatan("ik", 150, 62, ["5", "2", "3"], ["u"])), tambah("utuh,", teks("lu", 150, 40, "utuh", 10, W.ungu))),
    k(
      SUARA_B2,
      tambah("bawah", ...ikatan("ik", 150, 62, ["5", "2", "3"], ["a", "b"])),
      tambah(idx(SUARA_B2, "bagian"), teks("la", 102, 152, "bagian", 10, W.ungu)),
      tambah(idx(SUARA_B2, "lain"), teks("lb", 198, 152, "bagian", 10, W.ungu)),
    ),
    k(
      SUARA_B3,
      sorotkan(idx(SUARA_B3, "utuh"), "ik-u"),
      tambah("donat", teks("ea", 102, 182, DONAT + DONAT, 18)),
      tambah("bolu", teks("eb", 198, 182, BOLU + BOLU + BOLU, 18)),
    ),
    k(SUARA_B4, redamkan(0, "ik-u"), tambah("digabung,", ...kartu("bg", 8, 40, 116, 26, W.hijauMuda, ["2 dan 3 jadi 5"], 9.4)), sorotkan("utuh", "ik-u")),
    k(SUARA_B5, tambah("dipisah,", ...kartu("bp", 176, 40, 116, 26, W.pink, ["5 jadi 2 dan 3"], 9.4)), sorotkan("dua", "ik-a", "ik-b")),
    k(SUARA_B6, tambah("Ingat", emo("ow", 40, 112, OWL, 30)), tambah("bagian.", emo("ow2", 262, 112, "✅", 30))),
  ],
};
