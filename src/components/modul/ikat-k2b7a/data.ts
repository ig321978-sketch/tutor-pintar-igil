/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 7 Sub-Bab A "Botol Pak Ujang" (bilangan sampai seratus), awal cerita Bank Sampah Sekolah.
 * Misi lanjutan "Misi Gudang Ikat" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (koran, gelas plastik, kotak jus, tisu gulung, kotak makan, kertas bekas, majalah;
 * Pictorial memakai bingkai sepuluh, titik, batang puluhan, dan kotak satuan polos; Abstract memakai kartu kata dan angka). Jawaban beragam: memilih bilangan, mengetuk bingkai
 * atau susunan balok, mengucapkan satu kata (puluhan, satuan) atau bilangan, dan satu angka di kanvas. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 7, 4, 8, 5; Pictorial 9, 3, 7, 2; Abstract 6, 4, 9, 3 (tidak kembar dalam satu tahap).
 * Ruang jawaban satu angka sempit sehingga angka Story (1, 2, 3, 4, 5, 6, 8) kadang dipakai lagi dalam hitungan lain, bukan sebagai operan yang sama.
 * Diuji: scripts/uji-ikat-k2b7a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBalok, LBingkai, LIgil, LLoncat, Rupa, SoalMisi } from "./logika-cpa";
import { instruksi, kataBil, metodeLangkah } from "./logika-cpa";

export { MISI_IKAT_TEKS } from "./data-peta";

const igil = (p: number, s: number, o?: number, tanya?: "ikat" | "lepas"): LIgil => ({ tipe: "igil", p, s, ...(o === undefined ? {} : { o }), ...(tanya === undefined ? {} : { tanya }) });
const penuh = (isi: number[], o?: number): LBingkai => ({ tipe: "bingkai", mode: "penuh", isi, ...(o === undefined ? {} : { o }) });
const hitung = (p: number, s: number, o?: number): LBingkai => ({ tipe: "bingkai", mode: "hitung", p, s, ...(o === undefined ? {} : { o }) });
const loncat = (awal: number, k: number, o?: number): LLoncat => ({ tipe: "loncat", awal, k, ...(o === undefined ? {} : { o }) });
const pilih = (koleksi: [number, number][], target: number, o?: number): LBalok => ({ tipe: "balok", mode: "pilih", koleksi, target, ...(o === undefined ? {} : { o }) });
const tukar = (p: number, k: number, o?: number): LBalok => ({ tipe: "balok", mode: "tukar", p, k, ...(o === undefined ? {} : { o }) });
const kataBalok = (p: number, s: number, tanya: "batang" | "kotak", o?: number): LBalok => ({ tipe: "balok", mode: "kata", p, s, tanya, ...(o === undefined ? {} : { o }) });
const salah = (dasar: LIgil, tokoh: string, kataTokoh: string, jawabTokoh: number, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/* ------------------------------ Concrete: lantai gudang dengan benda beremoji dan tali rafia ------------------------------ */
// Benda: 0 koran, 1 gelas plastik, 2 kotak jus, 3 tisu gulung, 4 kotak makan, 5 kertas bekas, 6 majalah, 7 tas kertas.
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Gudang Ikat 2: setoran dari gerobak", "Pak Ujang menurunkan barang bekas dari gerobak. Hitung banyaknya dengan cara yang tepat.", [
    salah(
      igil(6, 0, 0),
      "Chacha",
      "Ada enam ikat koran, jadi koran seluruhnya ada enam.",
      6,
      [
        "Chacha benar, enam ikat berarti enam koran.",
        "Chacha keliru: satu ikat berisi sepuluh koran, jadi enam ikat adalah enam puluh koran.",
        "Ikat koran tidak boleh dihitung sama sekali.",
      ],
      1,
      "Chacha menghitung ikatnya saja. Satu ikat berisi sepuluh, jadi enam ikat sama dengan enam puluh koran.",
    ),
    penuh([7, 10, 4, 9], 1),
    loncat(20, 5, 2),
    pilih([[7, 2], [2, 7], [2, 0], [0, 7]], 27, 3),
  ]),
  C(3, "kanvas", "Misi Gudang Ikat 3: catatan Dika", "Dika mencatat setoran di papan gudang. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    igil(3, 7, 3),
    hitung(4, 5, 4),
    loncat(0, 8, 5),
    tukar(2, 15, 6),
  ]),
  C(4, "suara", "Misi Gudang Ikat 4: panggilan Bu Sari", "Bu Sari memanggil dari pintu gudang. Jawab dengan suaramu.", [
    igil(2, 6, 1, "ikat"),
    hitung(2, 9, 2),
    loncat(50, 3, 3),
    kataBalok(3, 4, "kotak", 5),
  ]),
];

/* ------------------------------ Pictorial: lembar catatan berkisi dengan bingkai, titik, dan batang polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Gudang Ikat 5: lembar catatan", "Nia menggambar papan puluhan dan satuan di lembar catatan. Periksa gambarnya.", [
    salah(
      igil(4, 9),
      "Nia",
      "Papan puluhan menunjukkan empat dan papan satuan menunjukkan sembilan, jadi bilangannya sembilan puluh empat.",
      94,
      [
        "Nia benar, angka satuan dibaca lebih dulu.",
        "Nia keliru: puluhan dibaca lebih dulu, jadi empat puluhan dan sembilan satuan adalah empat puluh sembilan.",
        "Papan puluhan dan satuan tidak bisa dipakai untuk membaca bilangan.",
      ],
      1,
      "Nia membaca angka satuan lebih dulu. Puluhan dibaca lebih dulu, jadi empat puluhan dan sembilan satuan adalah empat puluh sembilan.",
    ),
    penuh([3, 8, 10, 6]),
    loncat(40, 3),
    pilih([[4, 5], [5, 0], [0, 5], [5, 4]], 54),
  ]),
  Pi(6, "kanvas", "Misi Gudang Ikat 6: lembar Dika", "Dika menyusun lembar catatan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    igil(2, 9),
    hitung(3, 6),
    loncat(0, 7),
    tukar(3, 12),
  ]),
  Pi(7, "suara", "Misi Gudang Ikat 7: lapor ke Bu Sari", "Nia melaporkan lembar catatannya kepada Bu Sari. Sebutkan jawabanmu.", [
    igil(5, 3, undefined, "lepas"),
    hitung(3, 2),
    loncat(20, 4),
    kataBalok(2, 5, "batang"),
  ]),
];

/* ------------------------------ Abstract: papan tulis hijau dengan kartu kata dan angka ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Gudang Ikat 8: papan tulis", "Papan tulis hanya berisi kata dan angka.", [
    salah(
      igil(10, 0),
      "Dika",
      "Sepuluh ikat penuh sama dengan sepuluh puluhan, yaitu seratus.",
      100,
      [
        "Dika salah, sepuluh puluhan hanya sama dengan sepuluh.",
        "Dika benar: sepuluh puluhan sama dengan seratus, karena sepuluh kali sepuluh.",
        "Dika salah, bilangan sampai seratus tidak boleh ditulis dengan puluhan.",
      ],
      1,
      "Dika benar. Sepuluh ikat penuh adalah sepuluh puluhan, dan sepuluh puluhan sama dengan seratus.",
      true,
    ),
    penuh([5, 9, 10, 7]),
    loncat(10, 7),
    pilih([[3, 7], [7, 3], [7, 0], [0, 3]], 73),
  ]),
  A(9, "kanvas", "Misi Gudang Ikat 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    igil(7, 6),
    hitung(4, 7),
    loncat(0, 9),
    tukar(2, 13),
  ]),
  A(10, "suara", "Misi Gudang Ikat 10: pengumuman Bu Sari", "Pengumuman terakhir untuk gudang. Bacakan jawabannya.", [
    igil(6, 4, undefined, "ikat"),
    hitung(5, 8),
    loncat(10, 6),
    kataBalok(4, 3, "kotak"),
  ]),
];

export const POIN_PENTING = [
  "Sepuluh satuan sama dengan satu puluhan. Satu ikat sepuluh benda adalah satu puluhan.",
  "Menghitung puluhan dengan melompat sepuluh-sepuluh: sepuluh puluhan sama dengan seratus.",
  "Bilangan dua angka punya puluhan dan satuan, misalnya tiga puluhan dan delapan satuan sama dengan tiga puluh delapan.",
  "Baca dan tulis puluhan dulu, lalu satuan. Angka yang tertukar membuat bilangan yang berbeda.",
  "Perkirakan banyak benda dulu, lalu buktikan dengan mengikat sepuluh-sepuluh.",
  "Bingkai Sepuluh, Hitung Loncat, dan Balok Puluhan membantu menghitung puluhan dan satuan.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Semua botol sudah dihitung dan dilaporkan dengan benar. Sekarang Bu Lia datang membawa papan pengumuman. Menurutmu, bagaimana cara membandingkan dua bilangan?";

export const TEMA_IKAT = {
  concrete: { ikon: "\u{1F9F6}", nama: "Concrete", cara: "Lantai gudang: benda bekas beremoji diikat tali rafia, bingkai sepuluh, garis lompatan, dan balok" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar catatan berkisi: ikat, bingkai, garis lompatan, dan balok polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan tulis hijau: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_IKAT, PICTORIAL as PICTORIAL_IKAT, ABSTRACT as ABSTRACT_IKAT };
