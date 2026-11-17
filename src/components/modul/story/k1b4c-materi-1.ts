import type { AdeganStory } from "./logika-story";
import {
  E,
  W,
  belahKanan,
  belahKiri,
  emo,
  judul,
  kartu,
  kereta,
  kotak,
  lengkung,
  mejaKerja,
  orang,
  segiEmpat,
  segitiga,
  sikuKananBawah,
  sikuKiriAtas,
  teks,
} from "./k1b4c-gambar";
import { hapus, idx, k, kalimatBertahap, sorotkan, tambah, ubah } from "./k1b4c-bantu";

/*
 * Cerita orisinal IGIL "Mainan untuk Festival" (Kelas 1 Bab 4 Sub-Bab C, menyusun dan mengurai bentuk), akhir cerita Festival Mainan Kardus.
 * Masalah: festival besok; bahan dari Sub-Bab A (empat lengkung, dua segitiga, lima segi empat) harus disusun menjadi mainan,
 * dan juri akan bertanya mainan tersusun dari bentuk apa dan berapa banyak.
 * Penyelesaian: gabung dua bentuk menjadi bentuk baru, susun kereta dan rumah, urai mainan, sebut dan hitung bagiannya.
 */

/* ------------------------------ 1. Festival besok ------------------------------ */
const SUARA_F1 = "Besok festival mainan kampung. Bahan dari gudang sudah rapi di keranjang: empat lengkung, dua segitiga, dan lima segi empat.";
const SUARA_F2 = "Mamah berkata, bahan itu akan disusun menjadi dua mainan: kereta dan rumah.";
const SUARA_F3 = "Juri festival akan bertanya: mainanmu tersusun dari bentuk apa, dan berapa banyak bagiannya?";
const keranjang = (id: string, x: number) => kotak(id, x, 46, 92, 86, "#FEF3C7", W.coklat, { rx: 8, tebal: 2, z: -2 });

export const ADEGAN_FESTIVAL_BESOK: AdeganStory = {
  id: "festival-besok",
  judul: "Festival besok",
  sumber: "Materi: masalah menyusun mainan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Festival besok"), emo("tn", 270, 24, E.tenda, 20)),
      tambah("keranjang:", keranjang("w0", 8), keranjang("w1", 104), keranjang("w2", 200)),
      tambah(idx(SUARA_F1, "empat"), ...[{ x: 32, y: 70 }, { x: 76, y: 70 }, { x: 32, y: 108 }, { x: 76, y: 108 }].flatMap((p, i) => lengkung(`bl${i}`, p.x, p.y, 14)), teks("nl", 54, 148, "4 lengkung", 10)),
      tambah(idx(SUARA_F1, "dua"), ...[128, 172].map((x, i) => segitiga(`bt${i}`, x, 62, [{ x: 0, y: 0 }, { x: 18, y: 44 }, { x: -18, y: 44 }])), teks("nt", 150, 148, "2 segitiga", 10)),
      tambah(
        idx(SUARA_F1, "lima"),
        ...[{ x: 208, y: 56 }, { x: 236, y: 56 }, { x: 264, y: 56 }, { x: 222, y: 92 }, { x: 250, y: 92 }].map((p, i) => segiEmpat(`bs${i}`, p.x, p.y, 22, 26)),
        teks("ns", 246, 148, "5 segi empat", 10),
      ),
    ),
    k(
      SUARA_F2,
      { at: 0, bersih: true },
      tambah(0, judul("Dua mainan"), ...orang("mm", 36, 84, E.mamah, "Mamah")),
      tambah("dua", teks("n2", 172, 128, "2 mainan", 11)),
      tambah("kereta", emo("ke", 130, 88, E.kereta, 36)),
      tambah("rumah.", emo("rm", 214, 88, E.rumah, 36)),
    ),
    k(
      SUARA_F3,
      tambah("Juri", ...orang("jr", 36, 162, E.juri, "juri")),
      tambah("bertanya:", ...kartu("tq", 70, 142, 220, 44, W.putih, ["bentuk apa?", "berapa banyak bagiannya?"], 10)),
      sorotkan("bagiannya?", "tq-k"),
    ),
  ],
};

/* ------------------------------ 2. Dua segitiga, dua cara ------------------------------ */
const SUARA_D1 = "Igil mengambil dua karton segitiga yang sama besar. Bentuk baru apa yang bisa dibuat?";
const SUARA_D2 = "Cara pertama, Igil menempelkan sisi miringnya. Dua segitiga menjadi satu segi empat!";
const SUARA_D3 = "Cara kedua, Igil menempelkan sisi tegaknya. Dua segitiga menjadi satu segitiga besar!";
const SUARA_D4 = "Jadi, dua segitiga bisa disusun dengan dua cara: menjadi segi empat atau segitiga besar.";
const S = 44;
const KIRI = { x: 62, y: 40 };
const KANAN = { x: 222, y: 86 };

export const ADEGAN_DUA_SEGITIGA: AdeganStory = {
  id: "dua-segitiga",
  judul: "Dua segitiga, dua cara",
  sumber: "Materi: menggabung dua bentuk",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dua segitiga"), ...orang("ig", 36, 150, E.igil, "Igil")),
      tambah(idx(SUARA_D1, "dua"), segitiga("ta", KIRI.x, KIRI.y, sikuKiriAtas(S)), segitiga("tb", KIRI.x + 20, KIRI.y + 20, sikuKananBawah(S)), teks("n2", 150, 166, "2 segitiga sama besar", 10)),
      tambah("baru", emo("tq", 168, 70, E.tanya, 24)),
    ),
    k(
      SUARA_D2,
      hapus(0, "tq"),
      ubah("menempelkan", { id: "tb", x: KIRI.x, y: KIRI.y }),
      tambah("menempelkan", teks("c1", 84, 104, "cara 1", 10, W.ungu)),
      tambah(idx(SUARA_D2, "satu"), teks("h1", 84, 118, "1 segi empat", 10)),
      sorotkan("empat!", "ta", "tb"),
    ),
    k(
      SUARA_D3,
      ubah(0, { id: "ta", op: 0.5, sorot: false }, { id: "tb", op: 0.5, sorot: false }),
      tambah(0, segitiga("tc", KANAN.x - 16, KANAN.y, belahKiri(S)), segitiga("td", KANAN.x + 16, KANAN.y, belahKanan(S))),
      ubah("menempelkan", { id: "tc", x: KANAN.x }, { id: "td", x: KANAN.x }),
      tambah("menempelkan", teks("c2", 222, 104, "cara 2", 10, W.ungu)),
      tambah(idx(SUARA_D3, "satu"), teks("h2", 222, 118, "1 segitiga besar", 10)),
      sorotkan("besar!", "tc", "td"),
    ),
    k(
      SUARA_D4,
      ubah(0, { id: "ta", op: 1 }, { id: "tb", op: 1 }, { id: "tc", sorot: false }, { id: "td", sorot: false }),
      tambah("cara:", ...kartu("dc", 70, 176, 160, 22, W.emas, ["2 cara menyusun"], 10)),
      sorotkan(idx(SUARA_D4, "empat"), "ta", "tb"),
      sorotkan(idx(SUARA_D4, "besar."), "tc", "td"),
    ),
  ],
};

/* ------------------------------ 3. Menyusun kereta ------------------------------ */
const SUARA_K1 = "Abang menyusun kereta di meja kerja. Tiga segi empat menjadi badan kereta.";
const SUARA_K2 = "Satu segitiga dipasang sebagai bendera di atas kereta.";
const SUARA_K3 = "Empat lengkung dipasang sebagai roda, sehingga kereta bisa menggelinding.";
const SUARA_K4 = "Tiga tambah satu tambah empat sama dengan delapan. Kereta tersusun dari delapan bagian.";
export const KERETA = kereta("k", 52, 76);

export const ADEGAN_SUSUN_KERETA: AdeganStory = {
  id: "susun-kereta",
  judul: "Abang menyusun kereta",
  sumber: "Materi: menyusun kereta",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Menyusun kereta"), ...orang("ab", 268, 64, E.abang, "Abang")),
      tambah("meja", ...mejaKerja("mj", 20, 140, 260)),
      tambah(idx(SUARA_K1, "Tiga"), ...KERETA.badan, teks("n3", 60, 186, "3 segi empat", 10)),
    ),
    k(SUARA_K2, tambah("Satu", ...KERETA.bendera, teks("n1", 150, 186, "1 segitiga", 10)), sorotkan("bendera", "kt0")),
    k(SUARA_K3, tambah("Empat", ...KERETA.roda, teks("n4", 240, 186, "4 lengkung", 10)), sorotkan("menggelinding.", "kl0", "kl1", "kl2", "kl3")),
    k(
      SUARA_K4,
      ...kalimatBertahap(SUARA_K4, "kk", 150, 166, ["3", "+", "1", "+", "4", "=", "8"], ["tiga", "tambah", "satu", "tambah", "empat", "sama", "delapan"]),
      sorotkan(idx(SUARA_K4, "delapan", 2), "kk6"),
    ),
  ],
};
