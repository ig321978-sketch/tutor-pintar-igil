/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola), akhir cerita Pameran Kerajinan Sekolah.
 * Misi lanjutan "Misi Meja Rangkai" (nomor misi berlanjut dari Simulasi). Pola, warna, dan bentuk berbeda dari Story. Jawaban bukan hanya angka:
 * memilih unsur berikutnya, mengisi kotak kosong, menyusun kartu kode huruf, melanjutkan irama, pola atau bukan, satu angka (kanvas), dan satu kata (suara).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 3, 6, 5; Pictorial 3, 4, 5, 2; Abstract 2, 5, 6, 3 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-hias-k2b4b.mjs.
 */
import type { Cara, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Unsur } from "./logika-cpa";
import { instruksi, kata, metodeLangkah } from "./logika-cpa";

export { MISI_HIAS_TEKS } from "./data-peta";

const sat = (unit: Unsur[], ulang: number, sisa: number): LangkahDasar => ({ tipe: "satuan", unit, ulang, sisa });
const pit = (unit: Unsur[], ulang: number, kosong: number): LangkahDasar => ({ tipe: "pita", unit, ulang, kosong });
const kod = (unit: Unsur[], ulang: number, sisa: number): LangkahDasar => ({ tipe: "kode", unit, ulang, sisa });
const tep = (unit: Unsur[], ulang: number, sisa: number, lanjut: number, hitung: Unsur): LangkahDasar => ({ tipe: "tepuk", unit, ulang, sisa, lanjut, hitung });
const buk = (barisan: Unsur[]): LangkahDasar => ({ tipe: "bukan", barisan });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: string | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: meja manik dengan untaian dan benda hiasan ------------------------------ */
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Rangkai 2: manik di meja stan", "Bu Mira menaruh untaian manik di meja stan. Bantu Chacha memeriksa dan melanjutkan polanya.", [
    salah(
      sat(["ungu", "ungu", "hijau"], 2, 2),
      "Chacha",
      "Barisannya ungu, ungu, hijau, ungu, ungu. Dua manik terakhir sama, jadi yang berikutnya ungu lagi.",
      "ungu",
      [
        "Chacha benar, karena dua manik terakhir sama.",
        "Chacha hanya melihat dua manik terakhir. Satuannya ungu, ungu, hijau, jadi yang berikutnya hijau.",
        "Unsur berikutnya selalu sama dengan unsur sebelumnya.",
      ],
      1,
      "Chacha hanya melihat dua manik terakhir. Cari satuan dari awal: ungu, ungu, hijau. Setelah ungu, ungu, yang berikutnya hijau.",
    ),
    pit(["kuning", "hijau"], 3, 3),
    kod(["bunga", "bunga", "hati"], 2, 0),
    tep(["keras", "keras", "pelan"], 2, 0, 3, "keras"),
  ]),
  C(3, "kanvas", "Misi Meja Rangkai 3: catatan Dika", "Dika mencatat hitungan di meja stan. Hitung, lalu tulis jawabanmu di kanvas.", [
    sat(["merah", "hijau", "hijau", "jingga"], 2, 1),
    pit(["biru", "kuning"], 3, 2),
    kod(["daun", "bintang", "bintang"], 3, 0),
    tep(["pelan", "pelan", "keras"], 2, 1, 3, "pelan"),
  ]),
  C(4, "suara", "Misi Meja Rangkai 4: panggilan Bu Sari", "Bu Sari memanggil dari pintu aula. Jawab dengan suaramu.", [
    sat(["cokelat", "hijau", "hijau"], 2, 1),
    pit(["merah", "ungu", "ungu"], 2, 2),
    kod(["hati", "daun"], 2, 1),
    tep(["keras", "pelan", "diam"], 2, 2, 3, "diam"),
  ]),
];

/* ------------------------------ Pictorial: pita kotak-kotak dengan bangun polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Rangkai 5: pita kotak-kotak", "Nia menggambar pita kotak-kotak di lembar kerja. Periksa dan lanjutkan polanya.", [
    salah(
      buk(["segitiga", "segitiga", "segitiga", "segitiga", "segitiga", "segitiga"]),
      "Nia",
      "Semua segitiga ini berjajar rapi, jadi ini pola.",
      "pola",
      [
        "Nia benar, karena semua segitiga tersusun rapi.",
        "Semuanya segitiga. Tidak ada unsur berbeda yang diulang, jadi ini bukan pola.",
        "Pola harus terdiri dari tiga bentuk yang berbeda.",
      ],
      1,
      "Nia hanya melihat susunannya rapi. Pola butuh paling sedikit dua unsur berbeda yang berulang, sedangkan semua segitiga ini sama.",
    ),
    pit(["hijau", "hijau", "merah"], 2, 2),
    kod(["kotak", "segitiga", "segitiga"], 2, 0),
    tep(["pelan", "pelan", "keras"], 2, 0, 3, "keras"),
  ]),
  Pi(6, "kanvas", "Misi Meja Rangkai 6: lembar Dika", "Dika menggambar lembar pola. Hitung, lalu tulis jawabanmu di kanvas.", [
    sat(["kuning", "biru", "biru"], 3, 1),
    pit(["merah", "putih"], 4, 3),
    kod(["bulat", "kotak"], 5, 0),
    tep(["pelan", "keras", "pelan"], 2, 0, 3, "keras"),
  ]),
  Pi(7, "suara", "Misi Meja Rangkai 7: lapor ke Bu Sari", "Nia melaporkan lembar polanya kepada Bu Sari. Sebutkan jawabanmu.", [
    sat(["merah", "merah", "putih"], 2, 2),
    pit(["bulat", "kotak"], 3, 3),
    kod(["bulat", "bulat", "segitiga"], 2, 2),
    tep(["keras", "diam", "pelan"], 2, 1, 3, "diam"),
  ]),
];

/* ------------------------------ Abstract: papan spanduk dengan kata dan huruf ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Rangkai 8: papan spanduk", "Papan spanduk hanya berisi kata dan lambang.", [
    sat(["kuning", "biru", "hijau", "hijau"], 2, 2),
    pit(["merah", "kuning", "kuning"], 2, 3),
    salah(
      kod(["kuning", "kuning", "ungu"], 2, 0),
      "Chacha",
      "Kodenya A, B, A, B.",
      undefined,
      [
        "Chacha benar, karena huruf A dan B sama-sama dipakai.",
        "Satuannya kuning, kuning, ungu, jadi kodenya A, A, B. Kode A, B, A, B salah menuliskan satuannya.",
        "Kode harus ditulis dengan angka, bukan huruf.",
      ],
      1,
      "Satuannya kuning, kuning, ungu, jadi kodenya A, A, B. Chacha menulis A, B, A, B, padahal unsur pertama dan kedua sama.",
    ),
    tep(["pelan", "keras", "keras"], 2, 0, 3, "keras"),
  ]),
  A(9, "kanvas", "Misi Meja Rangkai 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    sat(["ungu", "putih"], 3, 1),
    pit(["hijau", "jingga"], 5, 2),
    kod(["hijau", "putih", "putih"], 3, 0),
    tep(["pelan", "keras"], 3, 0, 3, "keras"),
  ]),
  A(10, "suara", "Misi Meja Rangkai 10: pengumuman Bu Sari", "Pengumuman terakhir untuk pameran kerajinan. Bacakan jawabannya.", [
    sat(["jingga", "hijau", "hijau"], 2, 1),
    pit(["jingga", "merah"], 3, 3),
    kod(["hati", "bintang"], 2, 1),
    tep(["pelan", "pelan", "keras"], 2, 2, 3, "keras"),
  ]),
];

export const POIN_PENTING = [
  "Pola adalah hal yang berulang dan teratur.",
  "Satuan pola adalah susunan terkecil yang berulang. Carilah dari awal.",
  "Pola bisa berupa bentuk, warna, gerakan, atau suara.",
  "Pola punya paling sedikit dua unsur berbeda. Semuanya sama atau susunan acak bukan pola.",
  "Untuk melanjutkan pola, ulangi urutan satuan yang sama, lalu periksa dari awal.",
  "Kode huruf menulis susunan pola: satu huruf untuk satu jenis unsur.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Perayaan akhir cerita bab: pita terpasang, pameran dibuka. */
export const PENUTUP_B = "Pita hias sudah terpasang dan pameran kerajinan resmi dibuka! Terima kasih sudah membantu Chacha, Dika, Nia, Bu Sari, dan Bu Mira sampai akhir bab ini.";
/** Spanduk perayaan di Abstract. */
export const SPANDUK = "PAMERAN DIBUKA";

export const TEMA_HIAS = {
  concrete: { ikon: "\u{1F9F5}", nama: "Concrete", cara: "Meja manik: untaian manik dan benda hiasan berwarna untuk dilanjutkan, disusun, dan dihitung" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Pita kotak-kotak: bangun polos dan lingkaran untuk memeriksa dan melanjutkan pola" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan spanduk: kata dan huruf saja, pilih, susun, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_HIAS, PICTORIAL as PICTORIAL_HIAS, ABSTRACT as ABSTRACT_HIAS };
