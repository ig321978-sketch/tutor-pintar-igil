import type { AdeganStory } from "./logika-story";
import { E, W, WK, baju, emo, gantungan, gs, judul, judulKolom, kardus, kartu, kolomPS, kotak, lantai, papanHarga, kapur, rak, teks, tokoh } from "./k2b2A-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2A-bantu";

/*
 * Cerita orisinal IGIL "Kiriman dari Gudang" (Kelas 2 Bab 2 Sub-Bab A, penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2a.md. Bagian ini: sepuluh satuan ditukar jadi satu puluhan (salah langkah dibetulkan), gantungan pas, dan penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Tukar sepuluh satuan jadi satu puluhan ------------------------------ */
const SUARA_T1 = "Dika menggeleng. Satu kotak hanya boleh diisi satu angka.";
const SUARA_T2 = "Sepuluh satuan ditukar menjadi satu puluhan. Satuannya jadi nol, dan satu puluhan pindah ke kolom puluhan.";
const SUARA_T3 = "Puluhannya sekarang satu ditambah satu, yaitu dua. Jawabannya dua puluh!";

const kubus = (i: number): [number, number] => [140 + (i % 5) * 14, 74 + Math.floor(i / 5) * 14];

export const ADEGAN_TUKAR_SEPULUH: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Tukar sepuluh satuan jadi satu puluhan",
  sumber: "Materi: tukar sepuluh satuan jadi satu puluhan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tukar Sepuluh Satuan"), lantai("lt", 168), ...kolomPS("tb", 50, 44, 80, 104), ...judulKolom("tb", 50, 44, 80, "p"), ...judulKolom("tb", 50, 44, 80, "s")),
      tambah("Dika", ...tokoh("dk", 30, 178, "Dika")),
      tambah("menggeleng.", teks("x10", 170, 126, "10", 34, W.merah)),
      ubah("menggeleng.", { id: "dk", isi: E.pikir }),
      tambah("Satu", teks("kt", 254, 76, "1 kotak", 10, W.biru)),
      tambah("angka.", teks("ka", 254, 92, "1 angka", 10, W.biru), emo("xs", 232, 126, E.salah, 22)),
    ),
    k(
      SUARA_T2,
      hapus(0, "x10", "kt", "ka", "xs"),
      tambah(0, ...Array.from({ length: 10 }, (_, i) => kotak(`c${i}`, kubus(i)[0], kubus(i)[1], 12, 12, W.merahMuda, W.merah, { rx: 2, tebal: 1.2 }))),
      tambah("Sepuluh", teks("ls", 170, 162, "10 satuan", 9, W.merah)),
      ubah("ditukar", ...Array.from({ length: 10 }, (_, i) => ({ id: `c${i}`, x: 164, y: 62 + i * 8.4, h: 8 }))),
      hapus("menjadi", ...Array.from({ length: 10 }, (_, i) => `c${i}`)),
      tambah("menjadi", kotak("br", 160, 62, 16, 84, WK.biru, W.biru, { rx: 3, tebal: 1.6, z: 2 })),
      tambah(idx(SUARA_T2, "puluhan", 1), teks("lp", 90, 162, "1 puluhan", 9, W.biru)),
      sorotkan(idx(SUARA_T2, "puluhan", 1), "br"),
      tambah("nol,", teks("z0", 170, 100, "0", 26, W.merah)),
      ubah(idx(SUARA_T2, "satu", 2), { id: "br", sorot: false }),
      ubah("pindah", { id: "br", x: 82 }),
      sorotkan(idx(SUARA_T2, "puluhan", 3), "tb-p"),
      tambah(idx(SUARA_T2, "puluhan", 3), emo("ok", 252, 100, E.benar, 24)),
    ),
    k(
      SUARA_T3,
      hapus(0, "ls", "br", "lp", "z0", "ok"),
      ubah(0, { id: "tb-p", sorot: false }),
      tambah("satu", teks("q1", 90, 84, "1", 22, W.biru)),
      tambah("ditambah", teks("qp", 62, 112, "+", 18, W.merah), gs("gl", 56, 118, 206, 118, W.biru, 2)),
      tambah(idx(SUARA_T3, "satu", 2), teks("q2", 90, 112, "1", 22, W.biru)),
      tambah("dua", teks("q3", 90, 142, "2", 22, "#15803D"), teks("q0", 170, 142, "0", 22, "#15803D")),
      tambah(idx(SUARA_T3, "dua", 2), teks("h20", 252, 100, "20", 26, "#15803D")),
      tambah(idx(SUARA_T3, "puluh"), emo("ok", 252, 130, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 8. Gantungan pas ------------------------------ */
const SUARA_G1 = "Dua puluh baju tergantung rapi, dan gantungannya pas penuh.";
const SUARA_G2 = "Bu Sari menulis di papan harga, delapan belas pensil dan dua puluh baju olahraga.";
const SUARA_G3 = "Seekor kucing koperasi tidur nyenyak di kardus kosong, dan tak seorang pun tega membangunkannya!";

const xg = (i: number): number => 24 + 13.4 * i;

export const ADEGAN_GANTUNGAN_PAS: AdeganStory = {
  id: "gantungan-pas",
  judul: "Gantungan pas penuh",
  sumber: "Materi: gantungan pas, papan harga, kucing koperasi",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gantungan Pas Penuh"), lantai("lt", 168), ...gantungan("gt", 14, 60, 272, 104)),
      tambah("Dua", teks("n20", 150, 44, "20", 16, W.merah)),
      tambah("baju", ...Array.from({ length: 20 }, (_, i) => baju(`h${i}`, xg(i), 71, i < 16 ? WK.hijau : WK.kuning, 6))),
      sorotkan("gantungannya", "gt", "gt-a", "gt-b"),
      tambah("pas", emo("ok", 150, 130, E.benar, 26)),
      tambah("penuh.", teks("pp", 150, 152, "gantungan penuh", 10, "#15803D")),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Papan Harga"), lantai("lt", 168)),
      tambah("Bu", ...tokoh("bs", 40, 178, "Bu Sari")),
      tambah("papan", papanHarga("ph", 40, 34, 220, 100)),
      tambah("harga,", kapur("kh", 150, 54, "HARGA", 10)),
      tambah("delapan", kapur("k18", 150, 84, "Pensil: 18", 15)),
      tambah("dua", kapur("k20", 150, 114, "Baju olahraga: 20", 15)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Kucing Koperasi"), lantai("lt", 168), ...kardus("ks", 90, 122, 120, 44)),
      tambah("kucing", emo("kc", 40, 170, E.kucing, 30)),
      ubah("tidur", { id: "kc", x: 150, y: 152 }),
      tambah("nyenyak", emo("zz", 188, 120, E.tidur, 20)),
      tambah("kosong,", teks("kk", 150, 108, "kardus kosong", 10, W.coklat)),
      tambah("seorang", ...tokoh("ch", 40, 178, "Chacha"), ...tokoh("dk", 260, 178, "Dika")),
      tambah("membangunkannya!", emo("hh", 150, 66, "\u{2764}\u{FE0F}", 26)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (jembatan ke Sub-Bab B) ------------------------------ */
const SUARA_N1 = "Bu Sari tersenyum. Besok anak-anak datang membeli, jadi isi rak akan berkurang.";
const SUARA_N2 = "Dika merangkum. Maju dari bilangan yang besar, pecah jadi pasangan, atau susun di tabel, lalu tukar sepuluh satuan menjadi satu puluhan.";
const SUARA_N3 = "Menurutmu, kalau satuannya sembilan ditambah lima, apa yang terjadi pada kotak satuan? Terima kasih, Chacha, Dika, Nia, dan Bu Sari!";

const rakIsi = Array.from({ length: 15 }, (_, i) => i);

export const ADEGAN_PENUTUP_A: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan dan pertanyaan penutup",
  sumber: "Materi: ringkasan dan jembatan ke Sub-Bab B",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Besok Ramai"), lantai("lt", 168), ...rak("rk", 20, 36, 140, 112, 3), ...rakIsi.map((i) => baju(`r${i}`, 40 + (i % 5) * 24, 56 + Math.floor(i / 5) * 38, i % 2 === 0 ? WK.hijau : WK.kuning, 7))),
      tambah("Sari", ...tokoh("bs", 270, 178, "Bu Sari")),
      ubah("tersenyum.", { id: "bs", isi: E.senyum }),
      tambah("Besok", emo("kl", 262, 60, E.kalender, 26)),
      tambah("anak-anak", ...[0, 1, 2].map((i) => emo(`an${i}`, 188 + i * 26, 150, E.anak, 20))),
      tambah("membeli,", emo("ke", 222, 112, "\u{1F6D2}", 22)),
      hapus("berkurang.", ...[10, 11, 12, 13, 14].map((i) => `r${i}`)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Ringkasan"), lantai("lt", 168), ...tokoh("dk", 30, 178, "Dika")),
      tambah("Maju", ...kartu("r1", 14, 34, 272, 26, W.langit, ["1. Maju dari yang besar"], 10)),
      tambah("pecah", ...kartu("r2", 14, 66, 272, 26, W.pink, ["2. Pecah jadi pasangan"], 10)),
      tambah("susun", ...kartu("r3", 14, 98, 272, 26, W.hijauMuda, ["3. Susun di tabel"], 10)),
      tambah("tukar", ...kartu("r4", 14, 130, 272, 26, W.krem, ["4. Tukar 10 satuan jadi 1 puluhan"], 9)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Pertanyaan Besok"), lantai("lt", 168), ...kolomPS("tb", 50, 44, 80, 104), ...judulKolom("tb", 50, 44, 80, "p"), ...judulKolom("tb", 50, 44, 80, "s")),
      sorotkan("satuannya", "tb-s"),
      tambah("sembilan", teks("a9", 170, 84, "9", 22, W.biru)),
      tambah("ditambah", teks("ap", 62, 112, "+", 18, W.merah), gs("gl", 56, 118, 206, 118, W.biru, 2)),
      tambah("lima,", teks("a5", 170, 112, "5", 22, W.biru)),
      tambah("kotak", teks("tq", 170, 142, "?", 26, W.merah)),
      tambah("Terima", ...tokoh("ch", 36, 178, "Chacha"), ...tokoh("dk", 98, 178, "Dika")),
      tambah("Nia,", ...tokoh("ni", 160, 178, "Nia")),
      tambah("Bu", ...tokoh("bs", 232, 178, "Bu Sari")),
      tambah("Sari!", ...["ch", "dk", "ni", "bs"].map((id, i) => emo(`lb${i}`, [36, 98, 160, 232][i], 156, E.lambai, 16))),
    ),
  ],
};
