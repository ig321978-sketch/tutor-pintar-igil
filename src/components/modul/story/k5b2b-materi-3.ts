import type { AdeganStory, Obj } from "./logika-story";
import { E, JALUR, JALUR_TIGA, W, bulat, deret, emo, garis, judul, kartu, kotak, labelDeret, lantai, loncengJalur, panah, papan, penanda, sumbu, teks, tokoh, xJalur } from "./k5b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b2b-bantu";

/*
 * Cerita orisinal IGIL "Dua Lonceng Pak Tarno" (Kelas 5 Bab 2 Sub-Bab B), Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2b.md. Bagian ini: jadwal belanja berulang, KPK tiga bilangan, dan jembatan ke Sub-Bab C (Bu Wati dan klepon).
 */

/* ------------------------------ 7. Jadwal berulang ------------------------------ */
const SUARA_J1 = "Pak Tarno dan Bu Marni juga belanja ke pasar induk: Bu Marni tiap empat hari, Pak Tarno tiap enam hari.";
const SUARA_J2 = "Hari ini mereka belanja bersama, dan Citra menghitung dengan KPK yang sama.";
const SUARA_J3 = "Mereka bertemu lagi dua belas hari kemudian, dan Pak Tarno mencatatnya di papan.";

export const ADEGAN_JADWAL: AdeganStory = {
  id: "jadwal",
  judul: "Belanja ke pasar induk",
  sumber: "Materi: jadwal berulang dan KPK",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Belanja ke Pasar Induk"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114)),
      tambah("Tarno", ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("pasar", emo("ps", 150, 64, E.pasar, 30), teks("pst", 150, 84, "pasar induk", 9, W.hijauTua, { z: 3 })),
      tambah("empat", teks("ma", 150, 110, "Bu Marni: tiap 4 hari", 10, W.hijauTua, { z: 3 })),
      tambah("enam", teks("ptt", 150, 128, "Pak Tarno: tiap 6 hari", 10, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Hari Ini Bersama"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), sumbu("jl", JALUR), ...penanda("t0", JALUR, 0, W.merah)),
      tambah("belanja", emo("pb", 20, 88, E.pasar, 20), teks("hi", 62, 78, "hari ini", 10, W.hijauTua, { z: 3 })),
      tambah("Citra", ...tokoh("ci", 36, 184, "Citra")),
      tambah("KPK", teks("kk", 200, 60, "KPK 4 dan 6 = 12", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_J3,
      tambah("belas", loncengJalur("b12", JALUR, 12), ...penanda("t12", JALUR, 12, W.merah), panah("jr", xJalur(JALUR, 0) + 4, 90, xJalur(JALUR, 12) - xJalur(JALUR, 0) - 8, 0, W.merah, 2.2, { z: 4 })),
      tambah("hari", teks("jh", 62, 100, "12 hari", 10, W.merah, { z: 3 })),
      tambah("Tarno", ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("papan", ...kartu("cp", 190, 124, 96, 14, W.krem, ["catatan: 12 hari"], 9, { z: 2 })),
    ),
  ],
};

/* ------------------------------ 8. KPK tiga bilangan ------------------------------ */
const SUARA_T1 = "Pak Arif menambah satu lonceng lagi di stan jagung, berbunyi tiap lima menit.";
const SUARA_T2 = "Bima menulis tiga daftar: kelipatan empat, lima, dan enam, lalu mencari bilangan yang sama di ketiganya.";
const SUARA_T3 = "Ketiganya bertemu pertama pada menit keenam puluh, jadi KPK empat, lima, dan enam adalah enam puluh.";

const WARNA_LANE = ["#EA580C", "#CA8A04", "#0D9488"];
const LANE_Y = [66, 82, 98];
const JARAK = [4, 5, 6];
/** Tiga jalur lonceng sampai menit ke 60: garis jalur `ln{i}`, penanda tiap kelipatan `tk{i}-{t}`, angka jarak `lb{i}`. */
function tigaJalur(): Obj[] {
  return JARAK.flatMap((a, i) => {
    const y = LANE_Y[i];
    const ticks = Array.from({ length: 60 / a }, (_, q) => (q + 1) * a).map((t) => garis(`tk${i}-${t}`, xJalur(JALUR_TIGA, t), y - 4, 0, 8, WARNA_LANE[i], t === 60 ? 2.6 : 1.6, { z: 3 }));
    return [garis(`ln${i}`, JALUR_TIGA.x0 - 6, y, JALUR_TIGA.x1 - JALUR_TIGA.x0 + 12, 0, WARNA_LANE[i], 2, { z: 2 }), teks(`lb${i}`, 10, y + 3, String(a), 9, W.biru, { z: 3 }), ...ticks];
  });
}

const TA = deret("ta", 14, 56, [4, 8, 12, 16, 20], W.jingga);
const TB = deret("tb", 14, 88, [5, 10, 15, 20, 25], W.krem);
const TC = deret("tc", 14, 120, [6, 12, 18, 24, 30], W.tosca);

export const ADEGAN_TIGA_BILANGAN: AdeganStory = {
  id: "tiga-bilangan",
  judul: "Tiga lonceng bertemu",
  sumber: "Materi: KPK tiga bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tiga Lonceng Berbunyi"), ...lantai("lt", 150)),
      tambah("Arif", ...tokoh("pa", 262, 184, "Pak Arif")),
      tambah("satu", teks("s1", 62, 66, "1 lonceng lagi", 11, W.ungu, { z: 3 }), emo("lc", 62, 94, E.lonceng, 24)),
      tambah("jagung", ...kartu("sj", 112, 60, 90, 34, W.krem, ["stan jagung"], 9), emo("jg", 238, 86, E.jagung, 26)),
      tambah("lima", teks("l5", 156, 118, "tiap 5 menit", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Bima Menulis Tiga Daftar"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tokoh("bi", 36, 184, "Bima")),
      tambah("tiga", teks("n3", 262, 42, "3 daftar", 9, W.ungu, { z: 3 })),
      tambah("empat", labelDeret("l4", 14, 56, "Kelipatan 4"), ...TA),
      tambah("lima", labelDeret("l5", 14, 88, "Kelipatan 5"), ...TB),
      tambah("enam", labelDeret("l6", 14, 120, "Kelipatan 6"), ...TC),
      tambah("sama", teks("sm", 232, 112, "cari yang sama", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Tiga Lonceng Bertemu"), ...lantai("lt", 150), papan("dp", 10, 28, 280, 114), ...tigaJalur()),
      tambah("pertama", garis("cn", xJalur(JALUR_TIGA, 60), 56, 0, 52, W.merah, 1.6, { putus: true, z: 4 })),
      tambah("puluh", loncengJalur("b60", { ...JALUR_TIGA, y: 46 }, 60, 0, 20), teks("k60", 272, 124, "60", 10, W.merah, { z: 3 })),
      tambah("KPK", teks("kp", 100, 130, "KPK", 14, W.merah, { z: 3 })),
      sorotkan("empat", "ln0"),
      sorotkan("lima", "ln1"),
      sorotkan("enam", "ln2"),
      tambah("puluh@2", teks("kt", 190, 130, "4, 5, 6 menjadi 60", 10, W.hijauTua, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 9. Jembatan ke Sub-Bab C ------------------------------ */
const SUARA_W1 = "Bu Wati, penjual klepon, datang membawa baki berisi dua belas klepon.";
const SUARA_W2 = "Ia ingin menata klepon itu ke piring-piring kecil dengan isi yang sama banyak dan tanpa sisa.";
const SUARA_W3 = "Menurutmu, bisa berapa piring? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Pak Tarno!";

const KLEPON = Array.from({ length: 12 }, (_, i) => bulat(`kl${i}`, 82 + (i % 6) * 27.2, i < 6 ? 92 : 116, 9, "#86EFAC", W.hijauTua, { tebal: 1.2, z: 2 }));

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bu Wati membawa klepon",
  sumber: "Materi: jembatan ke faktor",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Bu Wati Membawa Klepon"), ...lantai("lt", 150)),
      tambah("Wati", ...tokoh("bw", 276, 184, "Bu Wati")),
      tambah("baki", kotak("bk", 62, 70, 172, 66, W.krem, W.kayuTua, { rx: 6, tebal: 2, z: 1 }), teks("bkt", 148, 62, "baki klepon", 10, W.hijauTua, { z: 3 })),
      tambah("belas", ...KLEPON, teks("n12", 148, 146, "12 klepon", 10, W.merah, { z: 3 })),
    ),
    k(
      SUARA_W2,
      hapus("piring", "bk", "bkt", "n12", ...KLEPON.map((o) => o.id)),
      tambah("piring", bulat("p1", 70, 96, 24, W.putih, W.biru, { tebal: 2, z: 1 }), bulat("p2", 150, 96, 24, W.putih, W.biru, { tebal: 2, z: 1 }), bulat("p3", 230, 96, 24, W.putih, W.biru, { tebal: 2, z: 1 })),
      tambah("sama", teks("sb", 90, 142, "isi sama banyak", 10, W.hijauTua, { z: 3 })),
      tambah("sisa", teks("ts", 206, 142, "tanpa sisa", 10, W.merah, { z: 3 }), emo("ok", 252, 138, E.benar, 14)),
    ),
    k(
      SUARA_W3,
      tambah("berapa", teks("q1", 150, 52, "berapa piring?", 14, W.merah, { z: 3 })),
      tambah("Bima", ...tokoh("bi", 24, 184, "Bima")),
      tambah("Citra", ...tokoh("ci", 76, 184, "Citra")),
      tambah("Fajar", ...tokoh("fa", 128, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 180, 184, "Pak Arif")),
      tambah("Tarno", ...tokoh("pt", 232, 184, "Pak Tarno")),
    ),
  ],
};
