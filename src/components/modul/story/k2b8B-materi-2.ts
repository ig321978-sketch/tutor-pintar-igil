import type { AdeganStory } from "./logika-story";
import { E, W, barisBintang, bintang, bulat, emo, garis, hati, judul, kartu, panah, panggungDepan, papanLayar, teks, tokoh, wajah } from "./k2b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k2b8B-bantu";
import { WARNA_SEL, jumlahBaris, namaBaris } from "./k2b8B-materi-1";

/*
 * Cerita orisinal IGIL "Bintang Bu Maya" (Kelas 2 Bab 8 Sub-Bab B), akhir cerita Pentas Seni Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b8b.md. Bagian ini: gambar sama ukuran dan keterangan, cara membaca diagram, membandingkan baris.
 */

/** Tinggi tengah empat baris pada diagram dengan judul di atas dan keterangan di bawah (papan di (18, 48), 264 x 100). */
export const YS = [62, 86, 110, 134];
export const JUM = [7, 5, 3, 5];
/** Seluruh diagram selendang: papan, nama jenis, bintang tiap baris. Tampil serentak (adegan baru). */
export const diagramLengkap = (dengan: { jumlah?: boolean } = {}) => [
  ...papanLayar("pl", 18, 48, 264, 100, 1, 4),
  ...[0, 1, 2, 3].flatMap((i) => [...namaBaris(i, YS), ...barisBintang(`b${i}`, 96, YS[i], JUM[i], WARNA_SEL[i])]),
  ...(dengan.jumlah ? [0, 1, 2, 3].map((i) => jumlahBaris(i, JUM[i], YS)) : []),
];

/* ------------------------------ 4. Sama ukuran ------------------------------ */
const SUARA_D1 = "Nia menggambar ulang semua bintang dengan ukuran sama dan jarak sama.";
const SUARA_D2 = "Selain bintang, boleh memakai lingkaran, hati, atau wajah tersenyum. Yang penting satu gambar mewakili satu benda.";
const SUARA_D3 = "Di bawah diagram, Nia menulis keterangan: setiap bintang mewakili satu selendang.";

export const ADEGAN_SAMA_UKURAN: AdeganStory = {
  id: "sama-ukuran",
  judul: "Nia menggambar ulang bintang",
  sumber: "Materi: lambang bebas, satu gambar satu benda",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Gambar Rapi"), ...panggungDepan("dn"), ...papanLayar("pl", 18, 48, 264, 112, 1, 4)),
      tambah("Nia", ...tokoh("ni", 40, 172, "Nia")),
      tambah("menggambar", ...namaBaris(0), ...namaBaris(1), ...namaBaris(2), ...namaBaris(3)),
      tambah("semua", ...barisBintang("bm", 96, 70, 7, WARNA_SEL[0]), ...barisBintang("bk", 96, 95, 5, WARNA_SEL[1])),
      tambah("bintang", ...barisBintang("bh", 96, 120, 3, WARNA_SEL[2]), ...barisBintang("bb", 96, 145, 5, WARNA_SEL[3])),
      tambah("ukuran", teks("tu", 244, 60, "ukuran sama", 7, W.hijau, { z: 2 })),
      tambah("jarak", teks("tj", 150, 60, "jarak sama", 7, W.hijau, { z: 2 })),
      tambah("sama@2", emo("ok", 262, 160, E.benar, 20)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Lambang Boleh Berbeda"), ...panggungDepan("dn"), ...papanLayar("pl", 18, 48, 264, 112, 1, 2)),
      tambah("Selain", bintang("lb", 60, 82, 15, WARNA_SEL[0]), teks("tb", 60, 112, "bintang", 8, W.biru, { z: 2 })),
      tambah("lingkaran,", bulat("lc", 120, 82, 13, WARNA_SEL[3], W.biru, { z: 2 }), teks("tl", 120, 112, "lingkaran", 8, W.biru, { z: 2 })),
      tambah("hati,", hati("lh", 180, 84, 15, WARNA_SEL[2]), teks("th", 180, 112, "hati", 8, W.biru, { z: 2 })),
      tambah("wajah", ...wajah("lw", 240, 82, 13), teks("tw", 240, 112, "wajah", 8, W.biru, { z: 2 })),
      tambah("mewakili", ...kartu("kt", 70, 128, 160, 20, W.krem, ["1 gambar = 1 benda"], 9)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Keterangan Diagram"), ...panggungDepan("dn"), ...papanLayar("pl", 18, 36, 264, 88, 1, 3)),
      tambah("diagram,", ...barisBintang("rm", 40, 50, 4, WARNA_SEL[0]), ...barisBintang("rk", 40, 80, 3, WARNA_SEL[1]), ...barisBintang("rh", 40, 108, 2, WARNA_SEL[2])),
      tambah("Nia", ...tokoh("ni", 40, 172, "Nia")),
      tambah("menulis", teks("kl", 156, 130, "keterangan", 7, W.merah, { z: 2 })),
      tambah("setiap", ...kartu("kk", 56, 134, 200, 22, W.krem, ["1 bintang = 1 selendang"], 10)),
      tambah("bintang", bintang("ki", 70, 145, 6, WARNA_SEL[0])),
      tambah("selendang.", emo("ok", 262, 106, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 5. Baca diagram ------------------------------ */
const SUARA_E1 = "Membaca diagram dimulai dari judul, lalu keterangan, lalu nama jenis, lalu hitung gambar dari kiri ke kanan.";
const SUARA_E2 = "Merah tujuh bintang, kuning lima, hijau tiga, dan biru lima.";
const SUARA_E3 = "Baris merah paling panjang, jadi paling banyak. Baris hijau paling pendek, jadi paling sedikit.";

export const ADEGAN_BACA_DIAGRAM: AdeganStory = {
  id: "baca-diagram",
  judul: "Cara membaca diagram gambar",
  sumber: "Materi: membaca diagram gambar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Cara Membaca"), ...panggungDepan("dn"), ...papanLayar("pl", 18, 48, 264, 100, 1, 4)),
      tambah("judul,", teks("jt", 150, 42, "Selendang Penari", 10, W.ungu, { z: 2 })),
      tambah("keterangan,", teks("kt", 150, 160, "1 bintang = 1 selendang", 8, W.coklat, { z: 2 })),
      tambah("nama", ...[0, 1, 2, 3].flatMap((i) => namaBaris(i, YS))),
      tambah("hitung", ...[0, 1, 2, 3].flatMap((i) => barisBintang(`b${i}`, 96, YS[i], JUM[i], WARNA_SEL[i]))),
      tambah("kanan.", panah("pk", 96, 152, 110, 0, W.ungu, 2.4)),
    ),
    k(
      SUARA_E2,
      sorotkan("Merah", "nm0"),
      tambah("tujuh", jumlahBaris(0, 7, YS)),
      sorotkan("kuning", "nm1"),
      tambah("lima,", jumlahBaris(1, 5, YS)),
      sorotkan("hijau", "nm2"),
      tambah("tiga,", jumlahBaris(2, 3, YS)),
      sorotkan("biru", "nm3"),
      tambah("lima@2", jumlahBaris(3, 5, YS)),
    ),
    k(
      SUARA_E3,
      hapus(0, "pk"),
      tambah("merah", panah("pm", 96, 72, 100, 0, W.hijau, 2.2)),
      tambah("banyak.", teks("lb0", 262, 66, "paling banyak", 7, W.hijau, { z: 2 })),
      tambah("hijau", panah("ph", 96, 122, 40, 0, W.merah, 2.2)),
      tambah("sedikit.", teks("lb2", 262, 114, "paling sedikit", 7, W.merah, { z: 2 }), emo("ok", 262, 140, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 6. Bandingkan ------------------------------ */
const SUARA_F1 = "Kuning dan biru sama panjang, jadi sama banyak, yaitu lima.";
const SUARA_F2 = "Chacha bilang kuning dua lebihnya dari merah. Dika meluruskan, merah yang lebih panjang, jadi merah dua lebihnya dari kuning.";
const SUARA_F3 = "Hijau tiga dan kuning lima. Hijau dua kurangnya dari kuning.";

export const ADEGAN_BANDINGKAN: AdeganStory = {
  id: "bandingkan",
  judul: "Membandingkan baris",
  sumber: "Materi: sama banyak, lebihnya, kurangnya",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Banding Dua Baris"), ...panggungDepan("dn"), ...diagramLengkap({ jumlah: true })),
      sorotkan("Kuning", "nm1"),
      sorotkan("biru", "nm3"),
      tambah("sama", garis("gv", 244, YS[1], 0, YS[3] - YS[1], W.ungu, 1.6), garis("gv1", 236, YS[1], 8, 0, W.ungu, 1.6), garis("gv2", 236, YS[3], 8, 0, W.ungu, 1.6)),
      tambah("banyak,", teks("sm", 258, 114, "=", 16, W.ungu, { z: 2 })),
      tambah("lima.", emo("ok", 262, 160, E.benar, 20)),
    ),
    k(
      SUARA_F2,
      tambah("Chacha", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("dua", teks("cl", 262, YS[1] + 4, "2 lebih", 9, W.merah, { z: 2 })),
      tambah("lebihnya", emo("x1", 232, YS[1] + 2, E.salah, 16)),
      tambah("Dika", ...tokoh("dk", 92, 172, "Dika")),
      hapus("meluruskan,", "cl", "x1"),
      tambah("meluruskan,", emo("ok", 232, YS[0] + 2, E.benar, 16)),
      sorotkan("panjang,", "b05", "b06"),
      tambah("dua@2", teks("d2", 262, YS[0] + 4, "2 lebih", 9, W.hijau, { z: 2 })),
    ),
    k(
      SUARA_F3,
      hapus(0, "gv", "gv1", "gv2", "sm", "ok", "ch", "ch-n", "dk", "dk-n", "d2"),
      sorotkan("Hijau", "nm2"),
      sorotkan("kuning", "nm1"),
      tambah("dua", bulat("e0", 141, YS[2], 6.5, W.putih, W.merah, { z: 2, op: 0.7 }), bulat("e1", 156, YS[2], 6.5, W.putih, W.merah, { z: 2, op: 0.7 })),
      tambah("kurangnya", teks("kr", 262, YS[2] + 4, "2 kurang", 9, W.merah, { z: 2 })),
      tambah("kuning@2", emo("ok", 262, 160, E.benar, 20)),
    ),
  ],
};
