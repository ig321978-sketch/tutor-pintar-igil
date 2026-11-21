/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (faktor persekutuan, FPB, congklak faktor,
 * membagi sama rata ke kotak sebanyak-banyaknya, FPB tiga bilangan). Mengikuti rujukan Bab 2 Sub-Bab D (hlm. 46-52).
 * Misi lanjutan "Misi Kotak" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (24 dan 18, 8 dan 20, 36 dan 48, 12 dan 28, 12 dan 42, 15 dan 35) dan dari Infografis (24 dan 18, 8 dan 20, 12 dan 18, 12 18 24):
 * tugas memakai kue dan jajanan pasar malam. Concrete memakai meja kemas (benda beremoji lama, paling banyak 30 tiap jenis), Pictorial memakai diagram titik dan kotak polos tanpa emoji,
 * Abstract memakai kartu kata dan angka bercap pengelola pasar. Jawaban benar dihitung dari logika-data.ts (lihat logika-cpa.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 3, 7, 5; Pictorial 3, 4, 5, 7; Abstract 1, 4, 3, 8 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-kotak-k5b2d.mjs.
 */
import type { Cara, Data, DasarSalah, Langkah, LangkahSalah, LangkahSoal, LBagi, LBesar, LDaftar, LRencana, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, suaraTugas, ucapkan } from "./logika-cpa";

export { MISI_KOTAK_TEKS } from "./data-sim";

type S3 = [string, string, string];
const rencana = (r: number, pil?: S3): LRencana => ({ tipe: "rencana", r, ...(pil ? { pil } : {}) });
const daftar = (d: Data, hasil: LDaftar["hasil"], o: { n?: number; pil?: S3 } = {}): LDaftar => ({ tipe: "daftar", d, hasil, ...(o.n !== undefined ? { n: o.n } : {}), ...(o.pil ? { pil: o.pil } : {}) });
const bagi = (d: Data, hasil: LBagi["hasil"], o: { n?: number; jenis?: number; pil?: S3 } = {}): LBagi => ({
  tipe: "bagi",
  d,
  hasil,
  ...(o.n !== undefined ? { n: o.n } : {}),
  ...(o.jenis !== undefined ? { jenis: o.jenis } : {}),
  ...(o.pil ? { pil: o.pil } : {}),
});
const besar = (d: Data, hasil: LBesar["hasil"], pil?: S3): LBesar => ({ tipe: "besar", d, hasil, ...(pil ? { pil } : {}) });
const data = (nama: string[], ...bil: number[]): Data => ({ satuan: "buah", nama, bil });
const salah = (dasar: DasarSalah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false, posisi?: number): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
  ...(posisi !== undefined ? { posisi } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Two Lists, Share Equally, Biggest Match. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => ({ metode: URUT_METODE[i], cara, judul: instruksi(l, rupa, cara, URUT_METODE[i]), suara: suaraTugas(l, rupa, cara, URUT_METODE[i]), langkah: l })),
  });

/* ------------------------------ Concrete: meja kemas beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Kotak 2: meja Pak Joko", "Pak Joko menata meja kemas di pasar malam. Periksa mejanya.", [
    rencana(0),
    daftar(data(["Pastel", "Sate"], 16, 24), "sama"),
    bagi(data(["Donat", "Permen"], 14, 21), "kotak"),
    salah(
      besar(data(["Apel", "Jeruk"], 20, 30), "fpb", ["2", "10", "5"]),
      "Fajar",
      "FPB 20 dan 30 adalah 2.",
      "2",
      [
        "Faktor persekutuan yang pertama kali ditemukan setelah satu sudah pasti FPB, jadi dua sudah tepat.",
        "FPB harus yang paling besar dari semua faktor persekutuan, bukan yang pertama ditemukan.",
        "FPB harus bilangan prima, jadi hanya dua dan lima yang boleh dipilih.",
      ],
      1,
      false,
      2,
    ),
  ]),
  C(3, "kanvas", "Misi Kotak 3: catatan Citra", "Citra mencatat di meja kemas. Periksa mejanya, lalu tulis jawabanmu di kanvas.", [
    rencana(1),
    daftar(data(["Roti", "Pisang"], 18, 27), "banyak"),
    bagi(data(["Pastel", "Donat", "Permen"], 12, 20, 28), "isi", { jenis: 2 }),
    besar(data(["Jeruk", "Apel"], 25, 30), "digit"),
  ]),
  C(4, "suara", "Misi Kotak 4: panggilan Pak Arif", "Pak Arif memanggil lewat pengeras suara. Jawab dengan suaramu.", [
    rencana(2),
    daftar(data(["Sate", "Roti"], 12, 30), "klaim", { n: 4 }),
    bagi(data(["Pisang", "Es krim"], 15, 20), "habis", { n: 3 }),
    besar(data(["Donat", "Permen", "Pastel"], 10, 15, 25), "ucap"),
  ]),
];

/* ------------------------------ Pictorial: diagram titik dan kotak polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Kotak 5: diagram Bima", "Bima menggambar diagram kemas untuk Pak Joko. Periksa diagramnya.", [
    rencana(3, ["Terbesar yang Sama", "Dua Daftar", "Bagi Sama Rata"]),
    daftar(data(["Kue ketan", "Kue lapis"], 30, 45), "sama"),
    bagi(data(["Wajik", "Dodol"], 32, 40), "kotak"),
    salah(
      besar(data(["Lemper", "Risoles"], 14, 35), "fpb", ["14", "7", "1"]),
      "Bima",
      "FPB 14 dan 35 adalah 7.",
      "7",
      [
        "Dua bilangan itu hanya punya satu faktor persekutuan, yaitu satu, jadi FPB-nya satu.",
        "FPB selalu sama dengan bilangan yang lebih kecil, yaitu empat belas.",
        "Dari faktor persekutuan kedua bilangan, yang terbesar dipilih.",
      ],
      2,
      true,
      0,
    ),
  ]),
  Pi(6, "kanvas", "Misi Kotak 6: bagan Fajar", "Fajar membuat bagan kemas yang lebih lengkap. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [
    rencana(5),
    daftar(data(["Bakso", "Siomay"], 16, 40), "banyak"),
    bagi(data(["Kroket", "Risoles"], 36, 60), "isi", { jenis: 1 }),
    besar(data(["Cilok", "Cireng"], 21, 56), "digit"),
  ]),
  Pi(7, "suara", "Misi Kotak 7: lapor ke Pak Joko", "Bima melaporkan diagram kemasnya kepada Pak Joko. Sebutkan jawabanmu.", [
    rencana(4),
    daftar(data(["Tahu", "Tempe"], 28, 42), "klaim", { n: 14 }),
    bagi(data(["Lemper", "Pastel"], 24, 40), "habis", { n: 8 }),
    besar(data(["Bakpao", "Kroket", "Lontong"], 18, 30, 42), "ucap"),
  ]),
];

/* ------------------------------ Abstract: kartu kata dan angka bercap pengelola pasar ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Kotak 8: lembar pengelola", "Lembar pengelola pasar hanya berisi kata dan angka.", [
    rencana(8, ["Dua Daftar", "Bagi Sama Rata", "Terbesar yang Sama"]),
    daftar(data(["Pastel", "Lumpia"], 27, 63), "sama"),
    salah(
      bagi(data(["Bolu", "Apem"], 30, 42), "kotak", { pil: ["3 kotak", "6 kotak", "10 kotak"] }),
      "Fajar",
      "Banyak kotaknya 3.",
      "3 kotak",
      [
        "Banyak kotak boleh berapa saja asalkan kuenya muat, karena sisa kue bisa dibuang ke kotak terakhir.",
        "Tiga kotak sudah tepat karena tiga faktor persekutuan pertama yang ditemukan setelah angka satu.",
        "Kotak harus sebanyak-banyaknya, jadi faktor persekutuan yang lebih besar harus dicoba.",
      ],
      2,
      false,
      1,
    ),
    besar(data(["Sosis", "Tahu"], 45, 75), "fpb"),
  ]),
  A(9, "kanvas", "Misi Kotak 9: tulis di lembar", "Pak Joko meminta kamu menulis jawaban di kanvas.", [
    rencana(6),
    daftar(data(["Getuk", "Cenil"], 40, 56), "banyak"),
    bagi(data(["Cucur", "Onde"], 48, 72), "isi", { jenis: 1 }),
    besar(data(["Dadar", "Serabi"], 32, 56), "digit"),
  ]),
  A(10, "suara", "Misi Kotak 10: laporan akhir pasar", "Laporan akhir pasar malam untuk Pak Joko. Ucapkan jawabannya.", [
    rencana(7),
    daftar(data(["Wedang", "Bajigur"], 30, 54), "klaim", { n: 9 }),
    bagi(data(["Cenil", "Tiwul"], 50, 80), "habis", { n: 20 }),
    besar(data(["Cucur", "Apem", "Bolu"], 45, 60, 75), "ucap"),
  ]),
];

export const POIN_PENTING = [
  "Faktor persekutuan adalah faktor yang sama pada dua bilangan atau lebih.",
  "Tulis faktor tiap bilangan, lalu lingkari faktor yang muncul di semua daftar.",
  "FPB adalah faktor persekutuan yang paling besar, bukan yang pertama kali ditemukan.",
  "Congklak faktor: lubang berisi dua biji adalah faktor persekutuan kedua bilangan.",
  "Membagi benda sama rata ke wadah sebanyak-banyaknya: banyak wadah sama dengan FPB, dan isi tiap wadah adalah bilangan dibagi FPB.",
  "FPB tiga bilangan: ambil faktor yang ada pada ketiganya, lalu pilih yang terbesar.",
  "Cek: banyak wadah harus membagi tiap jenis benda sampai habis tanpa sisa.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab E (diucapkan setelah Poin Penting): tamu berikutnya datang dengan masalah baru. */
export const PENUTUP_D =
  "Kak Lintang, pembuat papan nama, datang membawa papan besar bertuliskan bilangan satu sampai seratus. Ia ingin menandai bilangan istimewa yang hanya punya dua faktor. Ikuti ceritanya di Sub-Bab berikutnya!";

export const TEMA_KOTAK = {
  concrete: { ikon: "\u{1F381}", nama: "Concrete", cara: "Meja kemas Pak Joko: kue dan kotak bingkisan beremoji yang dilihat, dihitung, dan dibagi" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Diagram kemas Bima: titik dan kotak polos yang dibaca" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar pengelola pasar malam: kartu kata dan angka bercap, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KOTAK, PICTORIAL as PICTORIAL_KOTAK, ABSTRACT as ABSTRACT_KOTAK };
