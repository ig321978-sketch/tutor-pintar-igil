import type { AdeganStory } from "./logika-story";
import { E, M, W, anak, bintang, emo, gelombang, judul, kartu, kotak, lantai, lengkung, kurung, panah, sel, stan, teks, tokoh, ubahAnak } from "./k2b4B-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k2b4B-bantu";

/*
 * Cerita orisinal IGIL "Pita Hias Bu Mira" (Kelas 2 Bab 4 Sub-Bab B, pola), akhir cerita Pameran Kerajinan Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b4b.md. Bagian ini: pola gerakan dan suara, membuat pola sendiri, dan penutup.
 */

/* ------------------------------ 7. Pola gerakan dan pola suara ------------------------------ */
const SUARA_7A = "Bu Sari mengajak semua menyambut pengunjung dengan gerakan. Membungkuk, berdiri, membungkuk, berdiri!";
const SUARA_7B = "Gerakan yang berulang membentuk pola gerakan.";
const SUARA_7C = "Lalu tepuk keras, tepuk pelan, tepuk keras, tepuk pelan. Suara yang berulang membentuk pola suara.";
const KIDS = [
  { id: "a1", x: 112, warna: "#F472B6" },
  { id: "a2", x: 162, warna: "#60A5FA" },
  { id: "a3", x: 212, warna: "#34D399" },
];
const YP = 132;
const tegakSemua = (b: boolean) => KIDS.flatMap((a) => ubahAnak(a.id, a.x, YP, b));

export const ADEGAN_GERAKAN_SUARA: AdeganStory = {
  id: "gerakan-suara",
  judul: "Pola gerakan dan pola suara",
  sumber: "Materi: pola gerakan dan suara",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_7A,
      bersih(0),
      tambah(0, judul("Menyambut Pengunjung"), lantai("lt", 150)),
      tambah(idx(SUARA_7A, "Bu"), ...tokoh("bs", 38, 152, "Bu Sari")),
      tambah(idx(SUARA_7A, "semua"), ...KIDS.flatMap((a) => anak(a.id, a.x, YP, a.warna, false))),
      ubah(idx(SUARA_7A, "Membungkuk"), ...tegakSemua(true)),
      tambah(idx(SUARA_7A, "Membungkuk"), panah("pn", 270, 90, 0, 24, W.merah, 3)),
      ubah(idx(SUARA_7A, "berdiri"), ...tegakSemua(false), { id: "pn", y: 114, y2: -24 }),
      ubah(idx(SUARA_7A, "membungkuk", 2), ...tegakSemua(true), { id: "pn", y: 90, y2: 24 }),
      ubah(idx(SUARA_7A, "berdiri", 2), ...tegakSemua(false), { id: "pn", y: 114, y2: -24 }),
    ),
    k(
      SUARA_7B,
      tambah(idx(SUARA_7B, "berulang"), lengkung("lg", 112, 94, 100)),
      tambah(idx(SUARA_7B, "pola"), ...kartu("pg", 84, 34, 132, 26, W.krem, ["pola gerakan"], 11)),
      tambah(idx(SUARA_7B, "gerakan", 2), emo("ul", 248, 56, E.ulang, 18)),
    ),
    k(
      SUARA_7C,
      bersih(0),
      tambah(0, judul("Pola Suara")),
      ...[0, 1, 2, 3].flatMap((i) => {
        const x = 44 + i * 62;
        const keras = i % 2 === 0;
        return [
          tambah(idx(SUARA_7C, "tepuk", i + 1), emo(`h${i}`, x, 100, E.tepuk, keras ? 36 : 20)),
          tambah(idx(SUARA_7C, keras ? "keras" : "pelan", i < 2 ? 1 : 2), ...gelombang(`g${i}`, x + (keras ? 20 : 12), 92, keras ? 3 : 1, keras ? 6 : 5), teks(`t${i}`, x, 132, keras ? "keras" : "pelan", 9, keras ? W.merah : W.ungu)),
        ];
      }),
      tambah(idx(SUARA_7C, "berulang"), lengkung("lg", 36, 66, 124)),
      tambah(idx(SUARA_7C, "suara", 2), ...kartu("ps", 84, 150, 132, 26, W.krem, ["pola suara"], 11)),
    ),
  ],
};

/* ------------------------------ 8. Membuat pola sendiri ------------------------------ */
const SUARA_8A = "Nia ingin membuat pola sendiri untuk ujung pita. Ia memilih satuan hijau, kuning, kuning, lalu mengulangnya.";
const SUARA_8B = "Ia memeriksa dengan bertanya, apakah satuan ini berulang? Jawabannya ya.";
const SUARA_8C = "Pola yang baik punya paling sedikit dua unsur berbeda dan berulang dengan teratur.";
const WARNA_8 = [M.hijau, M.kuning, M.kuning, M.hijau, M.kuning, M.kuning];
const X8 = (i: number) => 60 + i * 32;

export const ADEGAN_BUAT_POLA: AdeganStory = {
  id: "buat-pola",
  judul: "Nia membuat pola sendiri",
  sumber: "Materi: membuat dan memeriksa pola",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_8A,
      bersih(0),
      tambah(0, judul("Pola Buatan Nia")),
      tambah(idx(SUARA_8A, "Nia"), ...tokoh("ni", 34, 166, "Nia"), emo("pn", 62, 150, E.pensil, 16)),
      tambah(idx(SUARA_8A, "satuan"), kurung("kr", X8(0) - 14, 72, X8(2) - X8(0) + 28)),
      tambah(idx(SUARA_8A, "hijau,"), sel("s0", X8(0), 56, 28, WARNA_8[0])),
      tambah(idx(SUARA_8A, "kuning,"), sel("s1", X8(1), 56, 28, WARNA_8[1])),
      tambah(idx(SUARA_8A, "kuning,", 2), sel("s2", X8(2), 56, 28, WARNA_8[2])),
      tambah(idx(SUARA_8A, "mengulangnya."), sel("s3", X8(3), 56, 28, WARNA_8[3]), sel("s4", X8(4), 56, 28, WARNA_8[4]), sel("s5", X8(5), 56, 28, WARNA_8[5]), lengkung("lg", X8(0) - 14, 36, X8(3) - X8(0))),
    ),
    k(
      SUARA_8B,
      tambah(idx(SUARA_8B, "memeriksa"), kotak("bd", 60, 88, 200, 76, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 }), teks("pj", 160, 102, "Periksa", 10, W.ungu, { z: 2 })),
      tambah(idx(SUARA_8B, "apakah"), teks("q1", 72, 120, "Satuan berulang?", 9, W.biru, { z: 2, anchor: "start" })),
      tambah(idx(SUARA_8B, "Jawabannya"), teks("y1", 214, 121, "Ya", 10, W.hijau, { z: 2 }), emo("c1", 240, 122, E.benar, 14, { z: 2 })),
    ),
    k(
      SUARA_8C,
      tambah(idx(SUARA_8C, "dua"), teks("q2", 72, 138, "2 unsur berbeda?", 9, W.biru, { z: 2, anchor: "start" })),
      sorotkan(idx(SUARA_8C, "berbeda"), "s0", "s1"),
      tambah(idx(SUARA_8C, "berbeda"), emo("c2", 240, 140, E.benar, 14, { z: 2 })),
      tambah(idx(SUARA_8C, "berulang"), teks("q3", 72, 156, "Berulang teratur?", 9, W.biru, { z: 2, anchor: "start" })),
      tambah(idx(SUARA_8C, "teratur."), emo("c3", 240, 158, E.benar, 14, { z: 2 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_9A = "Pita hias selesai dipasang di depan stan, dan semua karya sudah di tempatnya. Pameran siap dibuka!";
const SUARA_9B = "Dika merangkum. Cari satuan polanya, ulangi urutan yang sama, lalu periksa dari awal.";
const SUARA_9C = "Bu Sari dan Bu Mira bertepuk tangan. Menurutmu, pola mana yang paling kamu sukai, pola bentuk, warna, gerakan, atau suara? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Mira!";
const HIAS = Array.from({ length: 12 }, (_, i) => ({ id: `ph${i}`, c: i % 2 === 0 ? M.merah : M.biru }));

export const ADEGAN_PENUTUP_B: AdeganStory = {
  id: "penutup",
  judul: "Pita terpasang, pameran siap",
  sumber: "Materi: rangkuman dan penutup",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_9A,
      bersih(0),
      tambah(0, lantai("lt", 150), ...stan("st", 40, 30, 170)),
      tambah(idx(SUARA_9A, "dipasang,"), ...HIAS.map((h, i) => sel(h.id, 54 + i * 13, 49, 11, h.c, { z: 3 }))),
      tambah(idx(SUARA_9A, "karya"), emo("k0", 70, 94, E.guci, 18), emo("k1", 108, 94, E.topeng, 18), emo("k2", 146, 94, E.lampion, 18), emo("k3", 184, 94, E.guci, 18)),
      tambah(idx(SUARA_9A, "tempatnya."), ...tokoh("bm", 244, 156, "Bu Mira")),
      tambah(idx(SUARA_9A, "dibuka!"), emo("ps", 232, 60, E.pesta, 24)),
    ),
    k(
      SUARA_9B,
      bersih(0),
      tambah(0, judul("Dika Merangkum"), kotak("bd", 20, 32, 196, 118, "#FFFFFF", "#7C3AED", { rx: 8, tebal: 2, z: 0 })),
      tambah(idx(SUARA_9B, "Dika"), ...tokoh("dk", 252, 150, "Dika")),
      tambah(idx(SUARA_9B, "Cari"), teks("m1", 34, 72, "1. Cari satuan pola", 11, W.biru, { anchor: "start", z: 2 })),
      tambah(idx(SUARA_9B, "ulangi"), teks("m2", 34, 100, "2. Ulangi urutan sama", 11, W.biru, { anchor: "start", z: 2 })),
      tambah(idx(SUARA_9B, "periksa"), teks("m3", 34, 128, "3. Periksa dari awal", 11, W.biru, { anchor: "start", z: 2 })),
    ),
    k(
      SUARA_9C,
      bersih(0),
      tambah(0, judul("Pola Mana?"), lantai("lt", 150), ...tokoh("bs", 198, 164, "Bu Sari")),
      tambah(idx(SUARA_9C, "Mira", 1), ...tokoh("bm", 254, 164, "Bu Mira")),
      tambah(idx(SUARA_9C, "bertepuk"), emo("tp", 226, 150, E.tepuk, 20)),
      tambah(idx(SUARA_9C, "Menurutmu"), emo("qm", 150, 46, E.tanya, 20)),
      tambah(idx(SUARA_9C, "bentuk,"), bintang("ib", 40, 72, 16, M.kuning), teks("lb", 40, 104, "bentuk", 9, W.ungu)),
      tambah(idx(SUARA_9C, "warna,"), sel("iw0", 100, 72, 18, M.merah), sel("iw1", 122, 72, 18, M.biru), teks("lw", 111, 104, "warna", 9, W.ungu)),
      tambah(idx(SUARA_9C, "gerakan,"), panah("ig", 160, 72, 40, 0, W.hijau, 3), teks("lg", 180, 104, "gerakan", 9, W.ungu)),
      tambah(idx(SUARA_9C, "suara?"), ...gelombang("is", 240, 72, 3, 6), teks("ls", 250, 104, "suara", 9, W.ungu)),
      tambah(idx(SUARA_9C, "Chacha,"), ...tokoh("ch", 30, 164, "Chacha")),
      tambah(idx(SUARA_9C, "Dika,"), ...tokoh("dk", 86, 164, "Dika")),
      tambah(idx(SUARA_9C, "Nia,"), ...tokoh("ni", 142, 164, "Nia")),
      tambah(idx(SUARA_9C, "Mira", 2), ...[30, 86, 142, 198, 254].map((x, i) => emo(`lm${i}`, x, 138, E.lambai, 14))),
    ),
  ],
};
