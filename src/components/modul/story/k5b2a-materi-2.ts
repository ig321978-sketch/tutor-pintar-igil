import type { AdeganStory } from "./logika-story";
import { W, angkaPemain, emo, kartu, panah, ringPemain, teks, titikRing, judul } from "./k5b2a-gambar";
import { bersih, k, redamkan, sebar, tambah, ubah } from "./k5b2a-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/** Lingkaran pemain Tepuk Bilangan Kelipatan: delapan pemain, pusat (150, 112), jari-jari 52. */
export const RING = { cx: 150, cy: 112, r: 52, jumlah: 8, rp: 11 };
const ring = (id: string) => ringPemain(id, RING.cx, RING.cy, RING.r, RING.jumlah, RING.rp);
const angka = (id: string, i: number, isi: string, warna?: string) => angkaPemain(id, RING.cx, RING.cy, RING.r, RING.jumlah, i, isi, 8.6, warna);
/** Panah pendek dari pemain a ke pemain b, di luar bulatan kedua pemain. */
const talia = (id: string, a: number, b: number) => {
  const [ax, ay] = titikRing(RING.cx, RING.cy, RING.r, RING.jumlah, a);
  const [bx, by] = titikRing(RING.cx, RING.cy, RING.r, RING.jumlah, b);
  const dx = bx - ax;
  const dy = by - ay;
  const jarak = Math.hypot(dx, dy);
  const sx = ax + (dx / jarak) * (RING.rp + 2);
  const sy = ay + (dy / jarak) * (RING.rp + 2);
  const ex = bx - (dx / jarak) * (RING.rp + 4);
  const ey = by - (dy / jarak) * (RING.rp + 4);
  return panah(id, Number(sx.toFixed(2)), Number(sy.toFixed(2)), Number((ex - sx).toFixed(2)), Number((ey - sy).toFixed(2)), W.merah, 2);
};

/** Emoji kecil di atas bulatan pemain ke-i. */
const emoPemain = (id: string, i: number, e: string) => {
  const [px, py] = titikRing(RING.cx, RING.cy, RING.r, RING.jumlah, i);
  return emo(id, px, py + 5, e, 14);
};

/* ------------------------------ 5. Eksplorasi 2.1: aturan tepuk bilangan kelipatan (Buku Siswa hlm. 33; Panduan Guru hlm. 48) ------------------------------ */
const SUARA_T2 = "Aturan satu dan dua: buat kelompok besar dengan anggota paling sedikit delapan orang, lalu duduk membentuk lingkaran.";

export const ADEGAN_ATURAN: AdeganStory = {
  id: "tepuk-aturan",
  judul: "Permainan: aturan Tepuk Bilangan Kelipatan",
  sumber: "Materi: aturan Tepuk Bilangan Kelipatan",
  latar: "#FEFCE8",
  kutipan: kutipanLokal("k5b2a-materi-2.ts:1"),
  ketukan: [
    k(
      "Sekarang kita bermain Tepuk Bilangan Kelipatan. Permainan ini melatih kita menyebut kelipatan dengan cepat dan tepat.",
      tambah(0, judul("Ayo Bermain")),
      tambah("Sekarang", emo("tp", 150, 88, "👏", 50)),
      tambah("Bermain", ...kartu("tt", 50, 120, 200, 44, W.emas, ["Tepuk Bilangan", "Kelipatan"], 11)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Aturan 1 dan 2")),
      tambah("kelompok", ...kartu("kl", 100, 98, 100, 28, W.krem, ["≥ 8 orang"], 9.6)),
      ...ring("rg").map((o, i) => tambah(sebar(SUARA_T2, 8, 9)[i], o)),
    ),
    k(
      "Aturan tiga dan empat: sebagai contoh kita bermain Tepuk Bilangan Kelipatan Tiga. Tentukan satu peserta sebagai orang pertama yang memulai menyebutkan bilangan.",
      bersih(0),
      tambah(0, judul("Aturan 3 dan 4")),
      tambah(0, ring("rg")),
      tambah("tiga@2", ...kartu("kt", 100, 98, 100, 28, W.krem, ["kelipatan 3"], 9.6)),
      tambah("pertama", teks("mu", 150, 38, "mulai", 8.6, W.merah)),
      ubah("pertama", { id: "rg-p0", warna: W.emas, sorot: true }),
    ),
    k(
      "Aturan lima: orang pertama menyebut satu bilangan, misalnya tiga, dilanjutkan oleh orang di sebelah kanan atau kirinya, dan seterusnya. Pemain berikutnya melanjutkan ke arah yang sama, tanpa melompati teman.",
      redamkan("pertama", "rg-p0"),
      tambah("tiga,", angka("rg", 0, "3", W.merah)),
      tambah("dilanjutkan", talia("tl", 0, 1)),
      ubah("kanan", { id: "rg-p1", warna: W.hijauMuda, sorot: true }),
    ),
    k(
      "Ingat, belajar bisa sambil bermain, jadi kegiatan seperti ini akan sering kita lakukan.",
      bersih(0),
      tambah(0, judul("Belajar sambil bermain")),
      tambah("belajar", emo("gm", 150, 90, "🎮", 48)),
      tambah("bermain,", ...kartu("gk", 30, 122, 240, 34, W.hijauMuda, ["belajar sambil bermain"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Aturan enam sampai delapan dan cerita Igil (Buku Siswa hlm. 34) ------------------------------ */
const SUARA_L1 = "Aturan enam: setiap orang menyebutkan bilangan kelipatan tiga secara berurutan, yaitu tiga, enam, sembilan, dan seterusnya.";

export const ADEGAN_LANJUT: AdeganStory = {
  id: "tepuk-lanjut",
  judul: "Tepuk Bilangan Kelipatan: berurutan, putaran kedua, dan cerita Igil",
  sumber: "Materi: tepuk berurutan dan cerita Igil",
  latar: "#FEFCE8",
  kutipan: kutipanLokal("k5b2a-materi-2.ts:2"),
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Aturan 6: berurutan")),
      tambah(0, ring("rg")),
      tambah(0, ...kartu("kt", 100, 98, 100, 28, W.krem, ["kelipatan 3"], 9.6)),
      tambah("tiga@2", angka("rg", 0, "3")),
      tambah("enam@2", angka("rg", 1, "6")),
      tambah("sembilan,", angka("rg", 2, "9")),
      tambah("seterusnya.", angka("rg", 3, "12"), angka("rg", 4, "15"), angka("rg", 5, "18"), angka("rg", 6, "21"), angka("rg", 7, "24")),
    ),
    k(
      "Jika satu putaran selesai, bilangan boleh terus dilanjutkan: dua puluh tujuh, tiga puluh, tiga puluh tiga, dan seterusnya. Jadi permainan tidak berhenti, hitungannya terus berlanjut.",
      ubah(10, { id: "rg-n0", isi: "27", warna: W.merah }),
      ubah(12, { id: "rg-n1", isi: "30", warna: W.merah }),
      ubah(15, { id: "rg-n2", isi: "33", warna: W.merah }),
      ubah("seterusnya.", { id: "kt-t0", isi: "putaran ke-2" }),
    ),
    k(
      "Aturan delapan: kalian boleh melanjutkan permainan dengan kelipatan bilangan yang lain. Pilih bilangan yang kalian suka, misalnya empat atau lima.",
      bersih(0),
      tambah(0, judul("Aturan 8")),
      tambah("Aturan", ...kartu("l3", 24, 72, 110, 36, W.krem, ["kelipatan 3"], 10)),
      tambah("melanjutkan", panah("la", 138, 90, 24, 0, W.biru, 2.4)),
      tambah("lain.", ...kartu("l4", 166, 72, 110, 36, W.hijauMuda, ["kelipatan lain"], 10)),
      tambah("kelipatan", emo("ul", 150, 150, "🔁", 34)),
    ),
    k(
      "Sekarang dengarkan cerita Igil. Seorang teman bertanya tentang pengalaman bermain, lalu bercerita bahwa saat bilangan disebut cepat, Igil melakukan kesalahan.",
      bersih(0),
      tambah(0, judul("Cerita Igil")),
      tambah("bertanya", ...kartu("b1", 14, 32, 272, 44, W.langit, ["Bagaimana pengalaman bermain", "Tepuk Bilangan Kelipatan?"], 9)),
      tambah("bercerita", ...kartu("b2", 14, 88, 272, 44, W.krem, ["Saat bilangan disebut cepat,", "Igil melakukan kesalahan."], 9)),
      tambah("Igil", emo("as", 150, 168, "😅", 36)),
    ),
    k(
      "Igil menjawab, ia tidak fokus dan kurang konsentrasi. Seharusnya ia bertepuk tangan dan diam, tetapi ia malah menyebut enam dengan sangat lantang.",
      bersih(0),
      tambah(0, judul("Jawaban Igil")),
      tambah("fokus", ...kartu("a1", 14, 32, 272, 30, W.merahMuda, ["tidak fokus, kurang konsentrasi"], 9.4)),
      tambah("bertepuk", ...kartu("a2", 14, 72, 272, 34, W.hijauMuda, ["Seharusnya: tepuk tangan dan diam"], 9.4), emo("tg", 40, 140, "👏", 26)),
      tambah("malah", ...kartu("a3", 14, 116, 272, 34, W.merahMuda, ["Yang terjadi: menyebut enam!"], 9.4)),
      tambah("lantang.", teks("la6", 220, 178, "6!", 34, W.merah)),
    ),
    k(
      "Coba kalian ingat, adakah anggota kelompokmu yang melakukan kesalahan seperti Igil? Hati-hati, sepakati dulu aturannya sebelum bermain: menyebut bilangan, atau bertepuk tangan dan diam.",
      bersih(0),
      tambah(0, judul("Hati-hati")),
      tambah("Coba", emo("tn", 262, 50, "❓", 24)),
      tambah("menyebut", ...kartu("c1", 14, 62, 272, 30, W.langit, ["giliran kelipatan: sebut bilangan"], 9.6)),
      tambah("bertepuk", ...kartu("c2", 14, 100, 272, 30, W.krem, ["atau bertepuk tangan dan diam"], 9.6)),
      tambah("sepakati", ...kartu("c3", 14, 142, 272, 36, W.emas, ["sepakati aturan sebelum bermain"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Panduan guru untuk permainan (Panduan Guru hlm. 49 sampai 50) ------------------------------ */
const RENTET = [3, 6, 9, 12];
const SUARA_P4 = "Peserta didik mungkin bertanya, boleh memakai tabel perkalian tiga? Atau berkata tidak tahu. Guru mengajak mereka melihat kembali tabel perkalian, lalu mengulang menyebutkan beberapa kelipatan tiga.";
export const ADEGAN_PANDUAN: AdeganStory = {
  id: "panduan-permainan",
  judul: "Panduan Guru: persiapan, pertanyaan pemantik, respons, dan catatan permainan",
  sumber: "Panduan Guru hlm. 49–50",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b2a-materi-2.ts:3"),
  ketukan: [
    k(
      "Panduan guru menyiapkan permainan: bentuk kelompok besar dengan delapan anggota atau lebih, tiap kelompok membentuk lingkaran, dan permainan terus berlanjut walau semua anggota sudah menyebut bilangan sekali.",
      tambah(0, judul("Persiapan guru")),
      tambah("kelompok", ...kartu("pa", 20, 36, 260, 32, W.hijauMuda, ["kelompok besar ≥ 8 anggota"], 9.6)),
      tambah("lingkaran,", ...kartu("pb", 20, 78, 260, 32, W.langit, ["tiap kelompok membentuk lingkaran"], 9.6)),
      tambah("terus", ...kartu("pc", 20, 120, 260, 32, W.krem, ["terus bermain meski semua sudah menyebut"], 9.6)),
    ),
    k(
      "Sebelum bermain, guru mengajukan dua pertanyaan pemantik. Adakah yang dapat menyebutkan bilangan kelipatan tiga? Bagaimana cara menentukan bilangan kelipatan tiga?",
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("Adakah", ...kartu("q1", 14, 36, 272, 40, W.langit, ["Adakah yang dapat menyebutkan", "bilangan kelipatan 3?"], 9.4)),
      tambah("Bagaimana", ...kartu("q2", 14, 90, 272, 40, W.krem, ["Bagaimana cara menentukan", "bilangan kelipatan 3?"], 9.4)),
      tambah("kelipatan@2", emo("qq", 150, 168, "❓", 34)),
    ),
    k(
      "Respons yang mungkin: kelipatan tiga adalah tiga, enam, sembilan, dua belas. Caranya, tambahkan tiga secara bertahap.",
      bersih(0),
      tambah(0, judul("Respons: tambah 3 bertahap")),
      ...RENTET.map((n, i) => tambah(["tiga@2", "enam,", "sembilan,", "belas."][i], ...kartu(`rb${i}`, 14 + i * 70, 76, 48, 36, W.hijauMuda, [String(n)], 12))),
      ...[0, 1, 2].map((i) => tambah("tambahkan", panah(`rp${i}`, 64 + i * 70, 94, 18, 0, W.merah, 2), teks(`rt${i}`, 73 + i * 70, 86, "+3", 8.6, W.merah))),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tabel perkalian 3")),
      ...[1, 2, 3, 4, 5].map((n, i) => tambah(sebar(SUARA_P4, 5, 17)[i], ...kartu(`tb${i}`, 14 + (i % 2) * 144, 36 + Math.floor(i / 2) * 40, 130, 32, W.krem, [`${n} × 3 = ${n * 3}`], 10.4))),
      tambah("melihat", emo("bk", 232, 150, "📖", 36)),
    ),
    k(
      "Agar permainan menarik, pemain yang salah menyebut bilangan, atau tidak bertepuk tangan pada jatah kelipatan, tidak boleh melanjutkan. Pemenangnya peserta yang paling lama bertahan.",
      bersih(0),
      tambah(0, judul("Siapa yang bertahan?")),
      tambah(0, ring("rg")),
      ubah("salah", { id: "rg-p3", warna: W.abu }),
      tambah("tidak@2", emoPemain("sx", 3, "❌")),
      tambah("Pemenangnya", emoPemain("tr", 6, "🏆")),
      ubah("Pemenangnya", { id: "rg-p6", warna: W.emas }),
    ),
    k(
      "Permainan sebaiknya divariasi dengan bilangan lain, dan guru boleh menunjuk ketua kelompok yang menyebut kelipatan serta mengontrol jalannya permainan. Waktunya satu jam pelajaran, lalu peserta didik menyimpulkan tentang kelipatan suatu bilangan.",
      bersih(0),
      tambah(0, judul("Catatan tambahan")),
      tambah("ketua", emo("kg", 55, 80, "🙋", 36), teks("kgt", 55, 110, "ketua", 9, W.biru), teks("kgu", 55, 122, "kelompok", 9, W.biru)),
      tambah("Waktunya", emo("jm", 150, 80, "⏱", 36), teks("jmt", 150, 110, "1 jam", 9, W.biru), teks("jmu", 150, 122, "pelajaran", 9, W.biru)),
      tambah("menyimpulkan", emo("ks", 245, 80, "📝", 36), teks("kst", 245, 110, "kesimpulan", 9, W.biru), teks("ksu", 245, 122, "kelipatan", 9, W.biru)),
    ),
  ],
};

