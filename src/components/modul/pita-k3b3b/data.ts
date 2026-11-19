/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Misi lanjutan "Misi Bengkel Pita" (nomor misi berlanjut dari Simulasi). Ukuran berbeda dari Story (tiang 3 m, 4 m, papan 700 cm, 1 m 22 cm, 4 m 35 cm + 7 m 40 cm, 6 m 50 cm - 2 m 20 cm,
 * metode global 5 m, 150 cm, 2 m 30 cm + 1 m 50 cm); ruang ukuran satu sampai sembilan meter sempit, jadi banyak meter boleh sama dengan Story asal ukuran sentimeternya berbeda.
 * Concrete memakai pita ukur kuning, benda kebun binatang beremoji (kelinci, kura-kura, kambing, burung beo, rusa) di ujung pita, dan meja bengkel kayu;
 * Pictorial memakai batang pita polos, tabel, dan garis bilangan polos di kertas milimeter krem; Abstract memakai kartu kata dan angka di lembar pesanan tukang.
 * Jawaban beragam: memilih ukuran bersatuan, menulis satu angka di kanvas (banyak meter, angka ratusan, puluhan, atau satuan, banyak lompatan seratus, nomor pita),
 * dan mengucapkan satu kata (kali, bagi, tambah, kurang) atau bilangan pendek. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 6, 9, 5, 4; Pictorial 4, 6, 7, 8; Abstract 3, 1, 9, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-pita-k3b3b.mjs.
 */
import type { Benda, Cara, Digit, Langkah, LangkahSalah, LangkahSoal, LBanding, LJarak, LKali, LPecah, LTabel, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_PITA_TEKS } from "./data-sim";

const kali = (arah: LKali["arah"], m: number, c: number, kanvas: Digit, benda: Benda, suara: LKali["suara"] = "hasil", bagian: LKali["bagian"] = "meter"): LKali => ({ tipe: "kali", arah, m, c, bagian, benda, kanvas, suara });
const tabel = (dikenal: [number, number], m: number, tanya: LTabel["tanya"], benda: Benda): LTabel => ({ tipe: "tabel", dikenal, m, tanya, benda, kanvas: tanya === "cm" ? "ratusan" : "hilang", suara: "hasil" });
const jarak = (dari: number, ke: number, benda: Benda): LJarak => ({ tipe: "jarak", dari, ke, benda, kanvas: "lompat", suara: "jarak" });
const banding = (ukuran: [number, number, number], bentuk: [boolean, boolean, boolean], benda: Benda): LBanding => ({ tipe: "banding", ukuran, bentuk, benda, kanvas: "nomor", suara: "nomor" });
const pecah = (op: LPecah["op"], a: [number, number], b: [number, number], tanya: LPecah["tanya"], kanvas: Digit, benda: Benda, suara: LPecah["suara"] = "hasil"): LPecah => ({ tipe: "pecah", op, a, b, tanya, benda, kanvas, suara });
const salah = (dasar: LKali | LPecah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Ratio Table, Number Line, Split Strategy. */
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

/* ------------------------------ Concrete: meja bengkel kayu dengan pita ukur kuning dan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Bengkel Pita 2: pita untuk kandang", "Pak Wayan mengukur pita untuk kandang di meja bengkel. Lihat pita dan tabelnya, lalu pilih ukuran yang tepat.", [
    salah(
      kali("ke-cm", 9, 0, "ratusan", "kelinci"),
      "Raka",
      `Sembilan meter itu sembilan puluh sentimeter, karena sembilan kali sepuluh. Gampang!`,
      "90 cm",
      [
        "Raka benar, satu meter memang sepuluh sentimeter.",
        "Raka keliru: satu meter itu seratus sentimeter, jadi meter dikalikan dengan seratus.",
        "Raka keliru karena meter ke sentimeter harus dibagi seratus.",
      ],
      1,
      `Raka mengalikan dengan sepuluh. Satu meter sama dengan seratus sentimeter, jadi sembilan meter sama dengan ${kataBil(900)} sentimeter.`,
    ),
    tabel([1, 6], 8, "cm", "kambing"),
    banding([372, 308, 390], [false, true, false], "rusa"),
    pecah("tambah", [2, 60], [1, 85], "meter", "hilang", "beo"),
  ]),
  C(3, "kanvas", "Misi Bengkel Pita 3: catatan Salsa", "Salsa mencatat ukuran pita di meja bengkel. Periksa pitanya, lalu tulis jawabanmu di kanvas.", [
    kali("ke-m", 6, 0, "hilang", "kura"),
    tabel([2, 3], 9, "cm", "kelinci"),
    jarak(3, 8, "kambing"),
    pecah("kurang", [8, 15], [3, 45], "meter", "hilang", "rusa"),
  ]),
  C(4, "suara", "Misi Bengkel Pita 4: panggilan Pak Wayan", "Pak Wayan memanggil dari bengkel. Jawab dengan suaramu.", [
    kali("ke-cm", 8, 0, "ratusan", "beo", "operasi"),
    tabel([3, 5], 6, "m", "rusa"),
    banding([352, 360, 345], [false, false, true], "kura"),
    pecah("kurang", [5, 90], [2, 15], "meter", "hilang", "kelinci", "operasi"),
  ]),
];

/* ------------------------------ Pictorial: kertas milimeter dengan batang pita, tabel, dan garis bilangan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Bengkel Pita 5: gambar Bima", "Bima menggambar ukuran pita di kertas milimeter. Periksa gambarnya.", [
    salah(
      kali("ke-m", 6, 0, "hilang", "kelinci"),
      "Bima",
      `Enam ratus sentimeter dibagi seratus sama dengan enam, jadi pita itu panjangnya enam meter.`,
      "6 m",
      [
        "Bima keliru: sentimeter ke meter harus dikalikan dengan seratus.",
        "Bima keliru karena enam ratus sentimeter lebih pendek dari satu meter.",
        "Bima benar: sentimeter ke meter dibagi seratus, dan enam ratus dibagi seratus sama dengan enam.",
      ],
      2,
      `Jawaban Bima benar. Sentimeter ke meter dibagi seratus, jadi ${kataBil(600)} sentimeter sama dengan enam meter.`,
      true,
    ),
    tabel([2, 4], 9, "cm", "kambing"),
    jarak(2, 8, "rusa"),
    pecah("kurang", [6, 25], [2, 60], "cm", "puluhan", "beo"),
  ]),
  Pi(6, "kanvas", "Misi Bengkel Pita 6: tabel Salsa", "Salsa menyusun tabel dan garis bilangan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    kali("ke-cm", 3, 45, "puluhan", "kura"),
    tabel([1, 2], 6, "m", "kelinci"),
    jarak(1, 8, "kambing"),
    pecah("tambah", [3, 85], [4, 70], "meter", "hilang", "rusa"),
  ]),
  Pi(7, "suara", "Misi Bengkel Pita 7: lapor ke Pak Wayan", "Bima melaporkan gambarnya kepada Pak Wayan. Sebutkan jawabanmu.", [
    kali("ke-cm", 1, 60, "puluhan", "beo", "hasil"),
    tabel([2, 5], 8, "cm", "kura"),
    banding([215, 207, 251], [true, false, false], "kelinci"),
    pecah("tambah", [2, 95], [1, 65], "cm", "puluhan", "kambing", "operasi"),
  ]),
];

/* ------------------------------ Abstract: lembar pesanan tukang dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Bengkel Pita 8: lembar pesanan", "Lembar pesanan tukang hanya berisi kata dan angka.", [
    salah(
      pecah("tambah", [2, 90], [1, 55], "cm", "puluhan", "rusa"),
      "Salsa",
      `Sentimeter sembilan puluh tambah lima puluh lima sama dengan seratus empat puluh lima, jadi hasilnya tiga meter seratus empat puluh lima sentimeter.`,
      "145 cm",
      [
        "Salsa keliru: sentimeter tidak boleh dijumlahkan, hanya meter yang dijumlahkan.",
        "Salsa benar, sentimeter boleh lebih dari seratus kalau ditulis begitu.",
        "Salsa keliru: seratus sentimeter harus ditukar menjadi satu meter, jadi meternya bertambah satu dan sisa sentimeternya sedikit.",
      ],
      2,
      `Salsa belum menukar. Seratus sentimeter ditukar menjadi satu meter, jadi hasilnya empat meter ${kataBil(45)} sentimeter.`,
    ),
    tabel([3, 6], 8, "m", "kelinci"),
    jarak(3, 9, "kambing"),
    pecah("kurang", [8, 15], [2, 85], "meter", "hilang", "beo"),
  ]),
  A(9, "kanvas", "Misi Bengkel Pita 9: tulis di lembar", "Salsa meminta kamu menulis jawaban di kanvas.", [
    kali("pisah", 2, 38, "puluhan", "kura", "hasil", "cm"),
    tabel([2, 3], 1, "cm", "rusa"),
    jarak(0, 9, "kelinci"),
    pecah("kurang", [7, 10], [2, 65], "meter", "hilang", "kambing"),
  ]),
  A(10, "suara", "Misi Bengkel Pita 10: laporan akhir", "Laporan akhir pesanan pita untuk Pak Wayan. Bacakan jawabannya.", [
    kali("ke-m", 9, 0, "hilang", "beo", "operasi"),
    tabel([1, 5], 9, "cm", "kura"),
    banding([318, 331, 309], [false, false, true], "rusa"),
    pecah("tambah", [3, 70], [2, 45], "cm", "puluhan", "kelinci"),
  ]),
];

export const POIN_PENTING = [
  "Satu meter sama dengan seratus sentimeter.",
  "Meter ke sentimeter dikalikan dengan seratus.",
  "Sentimeter ke meter dibagi dengan seratus.",
  "Ukuran boleh ditulis dengan meter dan sentimeter bersama, misalnya 1 m 22 cm sama dengan 122 cm.",
  "Meter dijumlah dengan meter, sentimeter dengan sentimeter. Bila sentimeternya lebih dari 100, tukar 100 cm menjadi 1 m.",
  "Mengurangkan ukuran juga meter dengan meter dan sentimeter dengan sentimeter. Bila sentimeternya kurang, pinjam 1 m menjadi 100 cm.",
  "Tabel Perbandingan, Garis Bilangan, dan Cara Memecah membantu mengubah, membandingkan, dan menghitung ukuran panjang.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab C (Bu Lastri membawa timbangan). */
export const PENUTUP_B = "Pita dan tali sudah benar ukurannya. Besok Bu Lastri, juru pakan, datang membawa timbangan untuk pakan hewan. Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Pak Wayan!";

export const TEMA_PITA = {
  concrete: { ikon: "\u{1F9F5}", nama: "Concrete", cara: "Meja bengkel kayu: pita ukur kuning, benda kebun binatang beremoji, dan deret pita tersambung" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas milimeter krem: batang pita polos, tabel, dan garis bilangan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar pesanan tukang: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PITA, PICTORIAL as PICTORIAL_PITA, ABSTRACT as ABSTRACT_PITA };
