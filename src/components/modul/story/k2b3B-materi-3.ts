import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_KEPING, P, bg, emo, garis, idPapanPuzzle, judul, kartu, kotak, lubang, papanPuzzle, rumput, segiBanyak, tangram, teks, tokoh, type Titik } from "./k2b3B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b3B-bantu";

/*
 * Cerita orisinal IGIL "Papan Puzzle yang Berantakan" (Kelas 2 Bab 3 Sub-Bab B), tengah cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3b.md. Bagian ini: tangram tujuh keping, pola banyak segitiga pada segi enam, dan penutup (jembatan ke Sub-Bab C).
 */
const keping = (id: string, pts: Titik[], i: number, o: Partial<Obj> = {}): Obj => bg(id, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 2, ...o });

/* ------------------------------ 7. Tangram ------------------------------ */
export const TANGRAM_B = tangram(110, 50);
const SUARA_T1 = "Bu Ratna mengeluarkan satu permainan tangram. Satu persegi besar dipotong menjadi tujuh keping.";
const SUARA_T2 = "Ada lima segitiga, satu persegi, dan satu segi empat miring.";
const SUARA_T3 = "Ketujuh keping bisa menjadi rumah, perahu, atau kucing, selalu tujuh.";
const SEGITIGA = ["kp0", "kp1", "kp2", "kp5", "kp6"];
const GESER_T3: [number, number][] = [[-46, 18], [-6, 30], [38, -4], [-30, -8], [26, 26], [44, 14], [-14, -22]];

export const ADEGAN_TANGRAM: AdeganStory = {
  id: "tangram",
  judul: "Tangram: tujuh keping",
  sumber: "Materi: tangram tujuh keping",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tangram"), ...tokoh("br", 40, 160, "Bu Ratna")),
      tambah(idx(SUARA_T1, "satu"), teks("cn", 240, 100, "1", 28, W.merah)),
      tambah(idx(SUARA_T1, "persegi"), bg("pb", [P(110, 50), P(190, 50), P(190, 130), P(110, 130)], "#FEF3C7", { z: 1, tebal: 2.6 })),
      hapus(idx(SUARA_T1, "dipotong"), "pb"),
      tambah(idx(SUARA_T1, "dipotong"), ...TANGRAM_B.map((t, i) => keping(t.id, t.pts, i))),
      ubah(idx(SUARA_T1, "tujuh"), { id: "cn", isi: "7" }),
    ),
    k(
      SUARA_T2,
      ubah(idx(SUARA_T2, "lima"), { id: "cn", isi: "5" }),
      sorotkan(idx(SUARA_T2, "lima"), ...SEGITIGA),
      tambah(idx(SUARA_T2, "lima"), teks("jn", 150, 160, "segitiga", 10, W.ungu)),
      redamkan(idx(SUARA_T2, "persegi,"), ...SEGITIGA),
      sorotkan(idx(SUARA_T2, "persegi,"), "kp4"),
      ubah(idx(SUARA_T2, "persegi,"), { id: "cn", isi: "1" }, { id: "jn", isi: "persegi" }),
      redamkan(idx(SUARA_T2, "empat"), "kp4"),
      sorotkan(idx(SUARA_T2, "empat"), "kp3"),
      ubah(idx(SUARA_T2, "miring."), { id: "jn", isi: "segi empat miring" }),
    ),
    k(
      SUARA_T3,
      redamkan(idx(SUARA_T3, "Ketujuh"), "kp3"),
      hapus(idx(SUARA_T3, "Ketujuh"), "jn", "br", "br-n"),
      ubah(idx(SUARA_T3, "bisa"), ...TANGRAM_B.map((t, i) => ({ id: t.id, x: GESER_T3[i][0], y: GESER_T3[i][1] }))),
      tambah(idx(SUARA_T3, "rumah,"), emo("hm", 40, 60, E.rumah, 24)),
      tambah(idx(SUARA_T3, "perahu,"), emo("ph", 40, 110, "\u{26F5}", 24)),
      tambah(idx(SUARA_T3, "kucing,"), emo("kc", 40, 160, E.kucing, 24)),
      ubah(idx(SUARA_T3, "tujuh."), { id: "cn", isi: "7", u: 30, sorot: true }),
    ),
  ],
};

/* ------------------------------ 8. Pola segitiga pada segi enam ------------------------------ */
const SUARA_P1 = "Dika penasaran. Segi enam dari satu pojok jadi berapa segitiga?";
const SUARA_P2 = "Garis dari satu pojok menghasilkan empat segitiga. Banyak sisi dikurangi dua sama dengan empat.";
const SUARA_P3 = "Dari titik tengah ke setiap pojok, jadinya enam segitiga, sama dengan banyak sisinya.";
const HEX = segiBanyak(6, 150, 92, 52, 0);
const TENGAH = P(150, 92);
const kipas = HEX.slice(1, 5).map((_, i) => [HEX[0], HEX[i + 1], HEX[i + 2]]);
const jari = HEX.map((v, i) => [TENGAH, v, HEX[(i + 1) % 6]]);

export const ADEGAN_POLA: AdeganStory = {
  id: "pola-segitiga",
  judul: "Pola banyak segitiga",
  sumber: "Materi: pola banyak segitiga",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pola Segitiga"), ...tokoh("dk", 40, 150, "Dika")),
      tambah(idx(SUARA_P1, "penasaran."), emo("pk", 70, 128, E.pikir, 22)),
      tambah(idx(SUARA_P1, "enam"), bg("ut", HEX, "#FEF9C3", { z: 1, tebal: 2.4 }), teks("n6", 150, 172, "6 sisi", 11, W.merah)),
      tambah(idx(SUARA_P1, "satu"), emo("tn", 196, 40, "\u{1F4CD}", 20), teks("n1", 236, 90, "1 pojok", 11, W.merah)),
      tambah(idx(SUARA_P1, "berapa"), emo("qm", 262, 130, E.tanya, 24)),
    ),
    k(
      SUARA_P2,
      hapus(idx(SUARA_P2, "Garis"), "qm", "pk"),
      tambah(idx(SUARA_P2, "Garis"), ...[2, 3, 4].map((v) => garis(`ug${v}`, HEX[0].x, HEX[0].y, HEX[v].x - HEX[0].x, HEX[v].y - HEX[0].y, W.merah, 2.4, { gambar: true, z: 5 }))),
      tambah(idx(SUARA_P2, "menghasilkan"), ...kipas.map((t, i) => keping(`f${i}`, t, i))),
      tambah(idx(SUARA_P2, "empat"), teks("n4", 260, 60, "4 segitiga", 10, W.merah)),
      tambah(idx(SUARA_P2, "dikurangi"), ...kartu("ms", 196, 150, 96, 24, W.emas, ["6 − 2 = 4"], 11)),
    ),
    k(
      SUARA_P3,
      hapus(idx(SUARA_P3, "Dari"), "ug2", "ug3", "ug4", "f0", "f1", "f2", "f3", "n4", "n1", "tn", "ms-k", "ms-t0"),
      tambah(idx(SUARA_P3, "titik"), emo("tt", 150, 96, "\u{1F4CD}", 16, { z: 6 })),
      tambah(idx(SUARA_P3, "pojok,"), ...HEX.map((v, i) => garis(`uc${i}`, TENGAH.x, TENGAH.y, v.x - TENGAH.x, v.y - TENGAH.y, W.merah, 2.2, { gambar: true, z: 5 }))),
      tambah(idx(SUARA_P3, "enam"), ...jari.map((t, i) => keping(`c${i}`, t, i + 2))),
      tambah(idx(SUARA_P3, "sama"), teks("n6b", 236, 80, "6 segitiga", 10, W.merah), teks("n6c", 236, 100, "= 6 sisi", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (jembatan ke Sub-Bab C) ------------------------------ */
const SUARA_C1 = "Papan puzzle utuh lagi, dan Bu Ratna memasang keping terakhir yang tersangkut di topi Nia.";
const SUARA_C2 = "Dika merangkum. Mengurai itu satu menjadi banyak, menyusun itu banyak menjadi satu, dan caranya memengaruhi hasil.";
const SUARA_C3 = "Besok Pak Rudi membuka gudang mainan. Menurutmu, benda apa yang bisa diisi? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Ratna!";
const PAPAN = idPapanPuzzle("pp");

export const ADEGAN_PENUTUP_B: AdeganStory = {
  id: "penutup",
  judul: "Papan puzzle utuh lagi",
  sumber: "Materi: penutup dan rangkuman",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Papan Puzzle Utuh"), rumput("rm", 160), ...papanPuzzle("pp", 80, 30, 140, 76), lubang("lb", 190, 70, 20, 20)),
      tambah(idx(SUARA_C1, "Ratna"), ...tokoh("br", 40, 150, "Bu Ratna")),
      tambah(idx(SUARA_C1, "Nia."), ...tokoh("ni", 262, 150, "Nia"), keping("kt", [P(268, 118), P(284, 118), P(268, 106)], 3, { z: 6 })),
      ubah(idx(SUARA_C1, "tersangkut"), { id: "kt", x: -76, y: -28 }),
      hapus(idx(SUARA_C1, "tersangkut"), "lb"),
    ),
    k(
      SUARA_C2,
      hapus(idx(SUARA_C2, "Dika"), "br", "br-n", "kt"),
      tambah(idx(SUARA_C2, "Dika"), ...tokoh("dk", 40, 150, "Dika")),
      tambah(idx(SUARA_C2, "satu"), ...kartu("r1", 100, 118, 160, 22, W.hijauMuda, ["Mengurai: 1 jadi banyak"], 9)),
      tambah(idx(SUARA_C2, "banyak"), ...kartu("r2", 100, 144, 160, 22, W.langit, ["Menyusun: banyak jadi 1"], 9)),
      tambah(idx(SUARA_C2, "memengaruhi"), ...kartu("r3", 100, 170, 160, 22, W.krem, ["Cara memengaruhi hasil"], 9)),
    ),
    k(
      SUARA_C3,
      hapus(idx(SUARA_C3, "Besok"), "r1-k", "r1-t0", "r2-k", "r2-t0", "r3-k", "r3-t0", "dk", "dk-n", "ni", "ni-n", ...PAPAN),
      tambah(idx(SUARA_C3, "Besok"), emo("gd", 150, 76, E.gudang, 54), kotak("pt", 128, 84, 44, 30, "#C4B5FD", W.ungu, { rx: 3, tebal: 2, z: 1 })),
      tambah(idx(SUARA_C3, "gudang"), teks("rd", 150, 130, "Pak Rudi", 10, W.ungu)),
      tambah(idx(SUARA_C3, "diisi?"), emo("qm", 150, 104, E.tanya, 22, { z: 3 })),
      tambah(idx(SUARA_C3, "Chacha,"), ...tokoh("t1", 36, 176, "Chacha")),
      tambah(idx(SUARA_C3, "Dika,"), ...tokoh("t2", 92, 176, "Dika")),
      tambah(idx(SUARA_C3, "Nia,"), ...tokoh("t3", 148, 176, "Nia")),
      tambah(idx(SUARA_C3, "Sari,"), ...tokoh("t4", 204, 176, "Bu Sari")),
      tambah(idx(SUARA_C3, "Ratna!"), ...tokoh("t5", 262, 176, "Bu Ratna"), emo("lb2", 150, 160, E.lambai, 18)),
    ),
  ],
};
