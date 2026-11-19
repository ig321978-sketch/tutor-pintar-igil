/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 8 Sub-Bab A "Alat Musik Pak Hendra" (diagram turus), awal cerita Pentas Seni Sekolah.
 * Misi lanjutan "Misi Meja Catat" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (gitar, biola, terompet, drum, tiket, bintang, saksofon, piano, lampu;
 * Pictorial memakai titik berwarna, turus, tabel, dan baris titik polos; Abstract memakai kartu kata dan angka). Jawaban beragam: memilih bilangan atau nama jenis, mengetuk turus
 * atau tabel yang tepat, mengurutkan baris, mengucapkan satu kata atau bilangan, dan satu angka di kanvas. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 7, 4, 3, 2; Pictorial 8, 3, 2, 5; Abstract 9, 2, 4, 3 (tidak kembar dalam satu tahap).
 * Ruang jawaban satu angka sempit sehingga angka Story (1 sampai 9) dipakai lagi dalam hitungan lain, bukan sebagai data yang sama.
 * Diuji: scripts/uji-turus-k2b8a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, Jenis, Rupa, SoalMisi, LMat, LNyata, LPile, LPilihTurus, LTabel, LTurus, LUrut } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_CATAT_TEKS } from "./data-peta";

const J = (o: number, n: number): Jenis => ({ o, n });
const pile = (jenis: Jenis[], tanya: number): LPile => ({ tipe: "pile", jenis, tanya });
const turus = (n: number, o: number, kanvas: "bundel" | "sisa", kata: "bundel" | "turus" | "lima"): LTurus => ({ tipe: "turus", n, o, kanvas, kata });
const pilihTurus = (n: number, o: number, opsi: number[]): LPilihTurus => ({ tipe: "pilihTurus", n, o, opsi });
const mat = (jenis: Jenis[], klik: "terbanyak" | "tersedikit", suara: "terbanyak" | "tersedikit"): LMat => ({ tipe: "mat", jenis, klik, suara });
const urut = (jenis: Jenis[]): LUrut => ({ tipe: "urut", jenis });
const nyata = (jenis: Jenis[], klik: "paling" | "sedikit" | "arah"): LNyata => ({ tipe: "nyata", jenis, klik });
const tabel = (jenis: Jenis[], opsi: number[][], benar: number): LTabel => ({ tipe: "tabel", jenis, opsi, benar });
const salah = (dasar: LTurus | LNyata, tokoh: string, kataTokoh: string, jawabTokoh: number | string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Sorting Mat, Count by Fives, Real Graph. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: balik tirai dengan benda beremoji ------------------------------ */
// Jenis: 0 gitar, 1 biola, 2 terompet, 3 drum, 4 tiket, 5 bintang, 6 saksofon, 7 piano, 8 lampu.
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Catat 2: peti baru Pak Hendra", "Pak Hendra membuka peti yang lain. Catat banyak benda dengan cara yang tepat.", [
    salah(
      turus(8, 8, "bundel", "turus"),
      "Chacha",
      "Satu bundel lima dan tiga garis, jadi lampunya ada empat.",
      4,
      [
        "Chacha benar, satu bundel dihitung satu saja.",
        "Chacha keliru: satu bundel berisi lima turus, jadi satu bundel lima dan tiga garis adalah delapan lampu.",
        "Turus tidak boleh dipakai untuk menghitung lampu.",
      ],
      1,
      "Chacha menghitung satu bundel sebagai satu. Satu bundel berisi lima turus, jadi satu bundel lima dan tiga garis sama dengan delapan.",
    ),
    mat([J(2, 6), J(1, 3), J(3, 4)], "terbanyak", "terbanyak"),
    pilihTurus(13, 4, [8, 18, 13]),
    nyata([J(0, 7), J(6, 2), J(7, 4)], "sedikit"),
  ]),
  C(3, "kanvas", "Misi Meja Catat 3: catatan Dika", "Dika mencatat benda di balik tirai. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    pile([J(0, 7), J(1, 4), J(3, 5)], 0),
    mat([J(2, 5), J(1, 3), J(3, 4), J(5, 2)], "terbanyak", "tersedikit"),
    turus(17, 5, "bundel", "turus"),
    nyata([J(6, 6), J(0, 4)], "arah"),
  ]),
  C(4, "suara", "Misi Meja Catat 4: panggilan Bu Sari", "Bu Sari memanggil dari balik tirai. Jawab dengan suaramu.", [
    pile([J(1, 4), J(2, 6), J(5, 3)], 0),
    mat([J(0, 5), J(3, 2), J(4, 6)], "terbanyak", "tersedikit"),
    turus(11, 3, "sisa", "bundel"),
    nyata([J(7, 3), J(8, 6)], "arah"),
  ]),
];

/* ------------------------------ Pictorial: lembar catatan berkisi dengan titik, turus, dan tabel polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Catat 5: lembar catatan", "Nia menggambar turus dan baris titik di lembar catatan. Periksa gambarnya.", [
    salah(
      turus(12, 6, "sisa", "turus"),
      "Nia",
      "Dua bundel lima dan dua garis, jadi ada empat.",
      4,
      [
        "Nia benar, tiap bundel dihitung satu.",
        "Nia keliru: satu bundel berisi lima turus, jadi dua bundel lima dan dua garis adalah dua belas.",
        "Garis sisa tidak boleh ikut dihitung.",
      ],
      1,
      "Nia menghitung tiap bundel sebagai satu. Satu bundel berisi lima turus, jadi dua bundel lima dan dua garis sama dengan dua belas.",
    ),
    urut([J(1, 4), J(6, 7), J(3, 2)]),
    turus(14, 0, "bundel", "turus"),
    tabel([J(0, 6), J(2, 3), J(4, 5)], [[6, 5, 3], [5, 3, 6], [6, 3, 5]], 2),
  ]),
  Pi(6, "kanvas", "Misi Meja Catat 6: lembar Dika", "Dika menyusun lembar catatan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    pile([J(5, 8), J(4, 3), J(2, 4)], 0),
    mat([J(1, 4), J(6, 2), J(7, 5)], "terbanyak", "tersedikit"),
    turus(22, 3, "sisa", "turus"),
    nyata([J(0, 9), J(1, 4)], "arah"),
  ]),
  Pi(7, "suara", "Misi Meja Catat 7: lapor ke Bu Sari", "Nia melaporkan lembar catatannya kepada Bu Sari. Sebutkan jawabanmu.", [
    pile([J(7, 3), J(0, 6), J(4, 5)], 0),
    mat([J(8, 3), J(6, 4), J(3, 6)], "terbanyak", "terbanyak"),
    turus(15, 1, "bundel", "turus"),
    nyata([J(5, 4), J(2, 4)], "arah"),
  ]),
];

/* ------------------------------ Abstract: papan jepit dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Catat 8: papan jepit", "Papan jepit hanya berisi kata dan angka.", [
    salah(
      nyata([J(4, 7), J(5, 5)], "arah"),
      "Chacha",
      "Ada tujuh tiket dan lima bintang, jadi tiket kurang dua dari bintang.",
      "kurang",
      [
        "Chacha benar, tiket lebih sedikit daripada bintang.",
        "Chacha keliru: tujuh lebih besar dari lima, jadi tiket dua lebihnya dari bintang.",
        "Tiket dan bintang tidak boleh dibandingkan.",
      ],
      1,
      "Chacha membalik arahnya. Tujuh tiket lebih banyak daripada lima bintang, jadi tiket dua lebihnya dari bintang dan bintang dua kurangnya dari tiket.",
    ),
    mat([J(1, 5), J(3, 3), J(8, 6)], "tersedikit", "terbanyak"),
    turus(16, 7, "bundel", "turus"),
    nyata([J(6, 4), J(0, 8), J(7, 6)], "paling"),
  ]),
  A(9, "kanvas", "Misi Meja Catat 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    pile([J(0, 9), J(1, 3), J(4, 2)], 0),
    mat([J(3, 6), J(8, 4)], "terbanyak", "tersedikit"),
    turus(24, 2, "bundel", "turus"),
    nyata([J(5, 8), J(7, 5)], "arah"),
  ]),
  A(10, "suara", "Misi Meja Catat 10: pengumuman Bu Sari", "Pengumuman terakhir untuk panggung. Bacakan jawabannya.", [
    pile([J(3, 7), J(4, 4), J(6, 5)], 0),
    mat([J(0, 6), J(1, 8), J(2, 3)], "terbanyak", "tersedikit"),
    turus(15, 5, "sisa", "lima"),
    nyata([J(5, 6), J(7, 3)], "arah"),
  ]),
];

export const POIN_PENTING = [
  "Pilah benda menurut jenisnya, lalu hitung tiap jenis satu per satu supaya tidak terlewat dan tidak terhitung dua kali.",
  "Turus adalah garis tegak: satu garis untuk satu benda, sama banyak dengan bendanya.",
  "Empat garis tegak dan satu coretan miring disebut satu bundel lima. Hitung lima-lima, lalu tambah garis sisanya.",
  "Diagram turus berupa tabel tiga kolom, yaitu nama, turus, dan banyaknya, dengan judul.",
  "Turus yang paling panjang berarti paling banyak. Bandingkan baris untuk mencari paling banyak, paling sedikit, sama banyak, lebihnya, dan kurangnya.",
  "Mengumpulkan data sendiri: tiap jawaban ditulis satu garis di baris yang tepat.",
  "Alas Pilah, Hitung Lima-Lima, dan Diagram Benda Nyata membantu mendata benda.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Data alat musik sudah rapi dan Chacha menepati taruhannya. Sekarang Bu Maya datang membawa papan layar kosong. Menurutmu, selain turus, data bisa ditulis dengan cara apa lagi?";

export const TEMA_TURUS = {
  concrete: { ikon: "\u{1F3AD}", nama: "Concrete", cara: "Balik tirai panggung: benda beremoji, tirai merah, turus, alas pilah, dan lajur benda" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar catatan berkisi: titik berwarna, turus, bundel lima, tabel, dan lajur titik" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan jepit: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TURUS, PICTORIAL as PICTORIAL_TURUS, ABSTRACT as ABSTRACT_TURUS };
