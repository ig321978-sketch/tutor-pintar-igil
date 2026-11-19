/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (menyusun dan menguraikan bilangan empat angka dengan lebih dari satu cara),
 * awal cerita dari Sub-Bab C ke Sub-Bab E di Penginapan Pulau Karang Indah. Misi lanjutan "Misi Kios" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (lima ribu dua ratus tujuh puluh,
 * enam ribu empat ratus tiga, tiga ribu tujuh ratus lima), kecuali seed Cari kesalahan dari alur (6.304 dan 3.908). Concrete memakai keranjang dan butir beremoji di rak kios (satu baris tiap tempat angka),
 * Pictorial memakai balok cacah polos, bagan tempat angka, dan bagan bagian utuh polos di papan harga, Abstract memakai kartu kata dan angka di nota Pak Darwis.
 * Jawaban beragam: memilih uraian atau bilangan, menulis satu angka di kanvas, dan mengucapkan satu kata (ribuan, ratusan, puluhan, satuan, sama, berbeda) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 3, 8, 2, 4; Pictorial 5, 7, 2, 6; Abstract 5, 7, 2, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-kelapa-k4b1d.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LBagan, LLain, LSusun, LUrai, Rupa, SoalMisi, Tempat } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_KELAPA_TEKS } from "./data-sim";

const urai = (benda: string, n: number, tempat: Tempat): LUrai => ({ tipe: "urai", benda, n, tempat });
const susun = (benda: string, n: number): LSusun => ({ tipe: "susun", benda, n });
const bagan = (benda: string, utuh: number, bagian: number, satuan: 1000 | 100, klaim?: number): LBagan => ({ tipe: "bagan", benda, utuh, bagian, satuan, ...(klaim === undefined ? {} : { klaim }) });
const lain = (benda: string, n: number, a: number, klaim: number): LLain => ({ tipe: "lain", benda, n, a, klaim });
const salah = (dasar: LUrai | LSusun | LBagan | LLain, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Break Apart, Build Up, Part-Part-Whole. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }) as LangkahSoal[],
  });

/* ------------------------------ Concrete: kios kelapa dengan rak bambu dan keranjang beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Kios 2: rak kelapa", "Pak Darwis menata keranjang kelapa di rak kiosnya. Periksa gambarnya.", [
    salah(
      urai("kelapa", 6304, "ratusan"),
      "Satria",
      "Angka tiga ada di tempat puluhan, jadi enam ribu ditambah tiga puluh ditambah empat.",
      "6.000 + 30 + 4",
      [
        "Satria benar, angka tiga memang ada di tempat puluhan.",
        "Satria keliru: angka tiga ada di tempat ratusan, jadi bagiannya tiga ratus, bukan tiga puluh.",
        "Satria keliru, bilangan itu tidak perlu diuraikan menurut tempat angkanya.",
      ],
      1,
      "Angka tiga ada di tempat ratusan, jadi bagiannya tiga ratus, bukan tiga puluh. Periksa tempat tiap angka dari kiri.",
    ),
    urai("nanas", 8152, "puluhan"),
    susun("semangka", 7040),
    bagan("kelapa", 8600, 3000, 1000),
  ]),
  C(3, "kanvas", "Misi Kios 3: papan harga", "Pak Darwis menulis jumlah keranjang di papan harga. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    lain("kelapa", 9240, 6000, 3240),
    urai("apel", 5836, "ratusan"),
    susun("kerang", 3005),
    bagan("nanas", 8000, 4000, 1000),
  ]),
  C(4, "suara", "Misi Kios 4: panggilan Pak Hendro", "Pak Hendro memanggil dari depan kios. Jawab dengan suaramu.", [
    lain("semangka", 6730, 2000, 4730),
    urai("kelapa", 4619, "ribuan"),
    susun("nanas", 9075),
    bagan("kerang", 7200, 4000, 1000, 3100),
  ]),
];

/* ------------------------------ Pictorial: papan harga dengan balok cacah polos, bagan tempat angka, dan bagan bagian utuh ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Kios 5: papan harga", "Genta menggambar bilangan di papan harga kios. Periksa gambarnya.", [
    salah(
      susun("bilangan", 3908),
      "Laras",
      "Tiga ribu ditambah sembilan ratus ditambah delapan sama dengan tiga ribu sembilan ratus delapan, karena puluhannya diisi nol.",
      "3.908",
      [
        "Laras keliru, tempat puluhan tidak boleh diisi nol.",
        "Laras keliru, hasilnya harus tiga ribu sembilan ratus delapan puluh.",
        "Laras benar: sembilan ratus ada di ratusan dan delapan di satuan, jadi puluhan diisi nol.",
      ],
      2,
      "Jawaban Laras benar. Tempat puluhan tidak punya bagian, jadi diisi nol dan hasilnya tiga ribu sembilan ratus delapan.",
      true,
    ),
    urai("bilangan", 2743, "ratusan"),
    susun("bilangan", 6020),
    bagan("bilangan", 7500, 2000, 1000),
  ]),
  Pi(6, "kanvas", "Misi Kios 6: kapur Laras", "Laras menggambar bagan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    lain("bilangan", 7460, 2000, 5460),
    urai("bilangan", 6274, "puluhan"),
    susun("bilangan", 9300),
    bagan("bilangan", 7000, 1000, 1000),
  ]),
  Pi(7, "suara", "Misi Kios 7: lapor ke Pak Darwis", "Genta melaporkan hasil bagannya kepada Pak Darwis. Sebutkan jawabanmu.", [
    lain("bilangan", 5480, 3000, 2380),
    urai("bilangan", 7158, "ribuan"),
    susun("bilangan", 4930),
    bagan("bilangan", 9000, 4000, 1000),
  ]),
];

/* ------------------------------ Abstract: nota Pak Darwis dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Kios 8: nota kios", "Nota Pak Darwis hanya berisi kata dan angka.", [
    lain("bilangan", 8370, 6000, 2370),
    urai("bilangan", 9461, "ratusan"),
    salah(
      susun("bilangan", 2057),
      "Satria",
      "Dua ribu ditambah lima puluh ditambah tujuh sama dengan dua ribu lima ratus tujuh puluh.",
      "2.570",
      [
        "Satria benar, angka lima dan tujuh ditulis berurutan di belakang dua ribu.",
        "Satria keliru: lima puluh ada di puluhan dan tujuh di satuan, jadi ratusan harus diisi nol.",
        "Satria keliru, hasilnya harus lebih besar dari dua ribu lima ratus.",
      ],
      1,
      "Lima puluh ada di puluhan dan tujuh di satuan, jadi tempat ratusan tidak punya bagian dan harus diisi nol.",
    ),
    bagan("bilangan", 9400, 6000, 1000),
  ]),
  A(9, "kanvas", "Misi Kios 9: tulis di nota", "Satria meminta kamu menulis jawaban di kanvas.", [
    lain("bilangan", 6580, 1000, 5580),
    urai("bilangan", 3947, "satuan"),
    susun("bilangan", 2050),
    bagan("bilangan", 8000, 7000, 1000),
  ]),
  A(10, "suara", "Misi Kios 10: nota akhir", "Nota akhir untuk Pak Darwis. Ucapkan jawabannya.", [
    lain("bilangan", 4760, 3000, 1760),
    urai("bilangan", 8532, "puluhan"),
    susun("bilangan", 6058),
    bagan("bilangan", 9600, 5000, 1000, 4700),
  ]),
];

export const POIN_PENTING = [
  "Menyusun bilangan berarti menggabungkan semua bagian menjadi satu bilangan.",
  "Menguraikan bilangan berarti memecahnya menurut tempat angka: ribuan, ratusan, puluhan, dan satuan.",
  "Tiap angka ditulis dengan harga tempatnya, misalnya 4.607 = 4.000 + 600 + 7.",
  "Tempat yang angkanya nol tidak ditulis saat menguraikan, tetapi harus diisi nol saat menyusun.",
  "Bilangan yang sama dapat diuraikan dengan lebih dari satu cara, misalnya 4.607 = 3.000 + 1.607.",
  "Bagan Bagian Utuh: utuh = bagian + bagian, jadi bagian yang hilang dicari dengan mengurangkan.",
  "Pecah Bilangan, Susun Bilangan, dan Bagan Bagian Utuh membantu memeriksa bilangan tanpa ada bagian yang tertinggal.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab E. */
export const PENUTUP_D =
  "Pak Darwis menutup kiosnya dengan senang. Besok Bu Rina, petugas meja resepsi, datang membawa daftar tamu pagi dan siang. Menurutmu, bagaimana cara menjumlahkan dua bilangan besar supaya tidak ada yang tertinggal?";

export const TEMA_KELAPA = {
  concrete: { ikon: "\u{1F965}", nama: "Concrete", cara: "Kios kelapa: keranjang dan butir beremoji di rak bambu, satu baris untuk tiap tempat angka" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Papan harga polos: balok cacah, bagan tempat angka, dan bagan bagian utuh tanpa gambar benda" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Nota Pak Darwis: kartu kata dan angka di kertas nota bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KELAPA, PICTORIAL as PICTORIAL_KELAPA, ABSTRACT as ABSTRACT_KELAPA };
