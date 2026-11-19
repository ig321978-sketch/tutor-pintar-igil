/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab D "Pesanan Bu Tuti" (penjumlahan sampai 100), Toko Kelontong Pak Joko.
 * Misi lanjutan "Misi Meja Pesanan" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (permen, apel, jeruk, telur, kaleng, biskuit, pisang, sabun; Story memakai kue lapis, nagasari,
 * donat, bolu, roti) dan bilangan berbeda dari Story. Pictorial memakai balok puluhan dan satuan polos, kotak, dan papan susun; Abstract memakai kartu kata dan angka.
 * Jawaban beragam: memilih bilangan atau kata, menyusun langkah berurutan, mengucapkan satu kata atau bilangan pendek, dan satu angka di kanvas. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 6, 3, 5; Pictorial 8, 7, 2, 3; Abstract 4, 7, 5, 8 (tidak kembar dalam satu tahap).
 * Ruang jawaban satu angka sempit sehingga angka Story (1 sampai 9) dipakai lagi dalam hitungan lain, bukan sebagai data yang sama.
 * Diuji: scripts/uji-tambah-k3b1d.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi, LCerita, LMaju, LPanjang, LPasang, LSusun, LTiga, LTukar, LUrut } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_PESANAN_TEKS } from "./data-sim";

const susun = (a: number, b: number, o: number, kanvas: "satuan" | "puluhan", kata: "simpan" | "puluhan" | "satuan"): LSusun => ({ tipe: "susun", a, b, o, kanvas, kata });
const panjang = (a: number, b: number, o: number, kanvas: "puluh" | "satuan"): LPanjang => ({ tipe: "panjang", a, b, o, kanvas });
const tiga = (a: number, b: number, c: number, o: number, kanvas: "satuan" | "puluhan"): LTiga => ({ tipe: "tiga", a, b, c, o, kanvas });
const pasang = (a: number, b: number, o: number): LPasang => ({ tipe: "pasang", a, b, o });
const maju = (a: number, b: number, o: number, kanvas: "puluh" | "satu"): LMaju => ({ tipe: "maju", a, b, o, kanvas });
const cerita = (a: number, b: number, o: number, kanvas: "satuan" | "puluhan"): LCerita => ({ tipe: "cerita", a, b, o, kanvas });
const tukar = (a: number, b: number, o: number): LTukar => ({ tipe: "tukar", a, b, o, kanvas: "satuan" });
const urut = (a: number, b: number, o: number): LUrut => ({ tipe: "urut", a, b, o });
const salah = (dasar: LSusun | LTukar | LMaju, tokoh: string, kataTokoh: string, jawabTokoh: number | string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
});

/** Empat langkah satu misi, berurut metode: IGIL, Standard Addition, Number Bond, Counting On. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita2: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita: cerita2,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: meja pesanan dengan benda beremoji ------------------------------ */
// Benda: 0 permen, 1 apel, 2 jeruk, 3 telur, 4 kaleng, 5 biskuit, 6 pisang, 7 sabun.
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Pesanan 2: kotak baru Bu Tuti", "Bu Tuti memesan lagi. Jumlahkan pesanannya dengan cara yang tepat.", [
    salah(
      susun(29, 53, 0, "satuan", "simpan"),
      "Raka",
      "Sembilan ditambah tiga dua belas, aku tulis dua dan lupa menyimpan satu puluhan, jadi hasilnya tujuh puluh dua.",
      72,
      [
        "Raka benar, dua belas satuan cukup ditulis dua saja.",
        "Raka keliru: satu puluhan dari dua belas satuan harus disimpan ke puluhan, jadi hasilnya delapan puluh dua.",
        "Susun pendek tidak boleh dipakai untuk bilangan dua angka.",
      ],
      1,
      "Raka lupa menyimpan satu puluhan. Dua belas satuan ditulis dua, dan satu puluhan disimpan ke puluhan, jadi hasilnya delapan puluh dua.",
    ),
    panjang(41, 56, 1, "puluh"),
    pasang(28, 35, 2),
    maju(21, 46, 3, "satu"),
  ]),
  C(3, "kanvas", "Misi Meja Pesanan 3: catatan Salsa", "Salsa mencatat pesanan di meja. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    susun(44, 28, 4, "satuan", "simpan"),
    tiga(12, 25, 31, 5, "puluhan"),
    pasang(57, 26, 6),
    maju(43, 25, 7, "satu"),
  ]),
  C(4, "suara", "Misi Meja Pesanan 4: panggilan Pak Joko", "Pak Joko memanggil dari balik etalase. Jawab dengan suaramu.", [
    susun(36, 28, 0, "satuan", "simpan"),
    panjang(62, 34, 1, "puluh"),
    pasang(59, 24, 2),
    tukar(26, 48, 3),
  ]),
];

/* ------------------------------ Pictorial: papan kapur dengan balok puluhan dan satuan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Pesanan 5: papan kapur", "Bima menggambar balok puluhan dan satuan di papan kapur. Periksa gambarnya.", [
    salah(
      tukar(37, 48, 0),
      "Bima",
      "Empat puluh delapan ditambah tiga puluh tujuh lebih banyak, karena bilangan yang besar ditulis lebih dulu.",
      "lebih",
      [
        "Bima benar, bilangan besar di depan membuat hasilnya lebih banyak.",
        "Bima keliru: menukar urutan penjumlahan tidak mengubah hasilnya, jadi hasilnya sama.",
        "Urutan penjumlahan harus selalu dimulai dari bilangan kecil.",
      ],
      1,
      "Bima mengira urutan mengubah hasil. Menukar urutan penjumlahan tidak mengubah hasilnya, jadi tiga puluh tujuh ditambah empat puluh delapan sama dengan empat puluh delapan ditambah tiga puluh tujuh.",
    ),
    tiga(16, 23, 34, 1, "puluhan"),
    pasang(47, 25, 2),
    maju(52, 36, 3, "puluh"),
  ]),
  Pi(6, "kanvas", "Misi Meja Pesanan 6: papan Salsa", "Salsa menggambar papan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    cerita(35, 49, 4, "puluhan"),
    panjang(63, 24, 5, "satuan"),
    pasang(68, 19, 6),
    maju(34, 51, 7, "puluh"),
  ]),
  Pi(7, "suara", "Misi Meja Pesanan 7: lapor ke Pak Joko", "Bima melaporkan papan kapurnya kepada Pak Joko. Sebutkan jawabanmu.", [
    susun(56, 29, 0, "satuan", "puluhan"),
    tiga(18, 21, 30, 1, "satuan"),
    pasang(38, 45, 2),
    maju(24, 61, 3, "puluh"),
  ]),
];

/* ------------------------------ Abstract: nota pesanan dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Pesanan 8: nota pesanan", "Nota pesanan hanya berisi kata dan angka.", [
    salah(
      maju(34, 25, 0, "satu"),
      "Raka",
      "Dari tiga puluh empat aku maju dua puluh, tapi aku hanya melompat sepuluh satu kali, lalu maju lima, jadi hasilnya empat puluh sembilan.",
      49,
      [
        "Raka benar, melompat sepuluh satu kali sudah cukup untuk maju dua puluh.",
        "Raka keliru: maju dua puluh berarti dua lompatan sepuluh, jadi dari tiga puluh empat menjadi lima puluh empat, lalu maju lima menjadi lima puluh sembilan.",
        "Menghitung maju harus dimulai dari bilangan yang lebih kecil.",
      ],
      1,
      "Raka melompat sepuluh hanya satu kali. Maju dua puluh berarti dua lompatan sepuluh, jadi tiga puluh empat menjadi lima puluh empat, lalu maju lima menjadi lima puluh sembilan.",
    ),
    urut(46, 38, 1),
    pasang(48, 36, 2),
    maju(33, 57, 3, "puluh"),
  ]),
  A(9, "kanvas", "Misi Meja Pesanan 9: tulis di nota", "Bu Tuti meminta kamu menulis jawaban di kanvas.", [
    susun(26, 48, 4, "satuan", "simpan"),
    tiga(14, 21, 32, 5, "satuan"),
    pasang(25, 48, 6),
    maju(51, 38, 7, "satu"),
  ]),
  A(10, "suara", "Misi Meja Pesanan 10: pengumuman Bu Tuti", "Pengumuman terakhir untuk pesanan arisan. Bacakan jawabannya.", [
    susun(57, 25, 0, "satuan", "satuan"),
    panjang(25, 41, 1, "puluh"),
    pasang(16, 35, 2),
    tukar(39, 52, 3),
  ]),
];

export const POIN_PENTING = [
  "Susun pendek: tulis bilangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan, lalu jumlahkan satuan dulu.",
  "Bila jumlah satuan sepuluh atau lebih, tukar sepuluh satuan menjadi satu puluhan, tulis sisanya, dan simpan satu puluhan ke tempat puluhan.",
  "Susun panjang: uraikan tiap bilangan menjadi puluhan dan satuan, jumlahkan tiap bagian, lalu gabungkan. Hasilnya sama dengan susun pendek.",
  "Tiga bilangan dijumlahkan dua-dua, dan urutan menjumlah tidak mengubah hasilnya.",
  "Cerita penjumlahan memakai kata seperti ditambah, jumlah seluruhnya, dan semuanya: tulis kalimat hitungnya, hitung, lalu jawab dengan satuan.",
  "Periksa dengan menukar urutan penjumlahan, dan kira-kira dulu dengan bilangan bulat puluhan.",
  "Penjumlahan Bersusun, Pasangan Bilangan, dan Menghitung Maju membantu menjumlah sampai seratus.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Jembatan ke Sub-Bab E. */
export const PENUTUP_D = "Pesanan Bu Tuti selesai dan Raka sudah mencuci semua loyang. Sekarang Pak Anto datang mengecek rak mi yang mulai kosong. Menurutmu, bagaimana cara tahu sisa mi di rak?";

export const TEMA_TAMBAH = {
  concrete: { ikon: "\u{1F370}", nama: "Concrete", cara: "Meja pesanan toko: taplak kotak-kotak, benda berwarna, nampan, batang puluhan, dan butir satuan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan kapur: balok puluhan dan satuan polos, papan susun, dan garis bilangan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Nota pesanan: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TAMBAH, PICTORIAL as PICTORIAL_TAMBAH, ABSTRACT as ABSTRACT_TAMBAH };
