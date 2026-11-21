/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan" (pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung.
 * Misi lanjutan "Misi Kursi" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (kursi 12, 15, 18 dengan beda tambah 3, baris kelima 24, nomor tampil 40, 35, 30 dengan beda kurang 5)
 * kecuali ruang jawaban yang sempit. Concrete memakai benda panggung beremoji di lapangan konser, Pictorial memakai titik polos dan diagram di kertas titik,
 * Abstract memakai kartu kata dan angka di lembar program konser. Jawaban beragam: memilih aturan atau bilangan, menulis satu angka di kanvas, dan mengucapkan satu kata
 * (membesar, mengecil, beda, tambah, kurang) atau bilangan pendek. Jawaban benar dihitung dari data; bilangan pada urutan ke-n lewat n kurang satu lompatan.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 7, 9, 6; Pictorial 6, 3, 2, 8; Abstract 8, 5, 1, 7 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-kursi-k4b3b.mjs.
 */
import type { Arah, Cara, KataSebut, LBeda, LMesin, LRantai, LSebut, LTabel, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_KURSI_TEKS } from "./data-sim";

type S3 = [string, string, string];
const MIN = "−";
const beda = (benda: string, a: number, d: number, arah: Arah, pil?: S3): LBeda => ({ tipe: "beda", benda, a, d, arah, ...(pil ? { pil } : {}) });
const rantai = (benda: string, a: number, d: number, arah: Arah, pil?: S3): LRantai => ({ tipe: "rantai", benda, a, d, arah, ...(pil ? { pil } : {}) });
const mesin = (benda: string, a: number, d: number, arah: Arah, kali: number, pil?: S3, operasi = false): LMesin => ({ tipe: "mesin", benda, a, d, arah, kali, ...(operasi ? { operasi } : {}), ...(pil ? { pil } : {}) });
const tabel = (benda: string, a: number, d: number, arah: Arah, n: number, pil?: S3): LTabel => ({ tipe: "tabel", benda, a, d, arah, n, ...(pil ? { pil } : {}) });
const sebut = (benda: string, a: number, d: number, arah: Arah, kata: KataSebut): LSebut => ({ tipe: "sebut", benda, a, d, arah, kata });
const salah = (dasar: LangkahSalah["dasar"], tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Jump Chain, Rule Machine, Position Table. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: lapangan konser dengan benda panggung beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Kursi 2: papan kursi lapangan", "Pak Gunawan memasang papan nomor kursi di lapangan. Periksa papannya.", [
    salah(
      beda("angklung", 5, 4, "naik", ["+8", "+4", "+9"]),
      "Satria",
      "Lima, sembilan, tiga belas bedanya delapan, karena tiga belas kurang lima.",
      "+8",
      [
        "Satria benar, beda boleh dihitung dari bilangan pertama sampai bilangan terakhir.",
        "Satria keliru: beda dihitung dari dua bilangan yang berurutan, dan harus sama pada setiap pasangan.",
        "Satria keliru, beda selalu harus lebih besar dari bilangan pertama.",
      ],
      1,
    ),
    rantai("lampu", 10, 6, "naik", ["22", "28", "34"]),
    mesin("bel", 7, 8, "naik", 2, ["15", "31", "23"]),
    tabel("drum", 9, 4, "naik", 6, ["33", "29", "25"]),
  ]),
  C(3, "kanvas", "Misi Kursi 3: catatan Laras", "Laras mencatat nomor kursi di papan. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    beda("angklung", 2, 4, "naik"),
    rantai("bintang", 1, 2, "naik"),
    mesin("lampu", 3, 2, "naik", 3),
    tabel("balon", 6, 4, "naik", 7),
  ]),
  C(4, "suara", "Misi Kursi 4: panggilan Pak Hendro", "Pak Hendro memanggil dari pinggir lapangan. Jawab dengan suaramu.", [
    sebut("mikrofon", 11, 2, "naik", "membesar"),
    rantai("balon", 4, 6, "naik"),
    mesin("bel", 9, 7, "naik", 2, undefined, true),
    tabel("piano", 11, 6, "naik", 6),
  ]),
];

/* ------------------------------ Pictorial: kertas titik dengan diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Kursi 5: kertas titik", "Genta menggambar titik kursi di kertas titik. Periksa gambarnya.", [
    beda("diagram A", 27, 4, "turun", ["+4", `${MIN}4`, `${MIN}2`]),
    rantai("diagram B", 5, 8, "naik", ["21", "37", "29"]),
    salah(
      mesin("diagram C", 28, 6, "turun", 2, ["22", "16", "10"]),
      "Laras",
      "Masuk dua puluh delapan, mesin kurang enam, hasilnya dimasukkan lagi sekali, jadi yang keluar enam belas.",
      "16",
      [
        "Laras keliru, mesin harus memakai aturan yang berbeda pada tiap pemakaian.",
        "Laras keliru, hasil pertama tidak boleh dimasukkan lagi ke dalam mesin.",
        "Laras benar: aturan yang sama dipakai dua kali, dan hasil pertama dimasukkan lagi ke dalam mesin.",
      ],
      2,
      true,
    ),
    tabel("diagram D", 36, 4, "turun", 5, ["24", "16", "20"]),
  ]),
  Pi(6, "kanvas", "Misi Kursi 6: diagram Genta", "Genta membuat diagram yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    beda("diagram E", 1, 6, "naik"),
    rantai("diagram F", 9, 2, "turun"),
    mesin("diagram G", 8, 3, "turun", 2),
    tabel("diagram H", 4, 9, "naik", 9),
  ]),
  Pi(7, "suara", "Misi Kursi 7: lapor ke Pak Gunawan", "Genta melaporkan diagramnya kepada Pak Gunawan. Sebutkan jawabanmu.", [
    sebut("diagram I", 46, 4, "turun", "mengecil"),
    rantai("diagram J", 6, 7, "naik"),
    mesin("diagram K", 50, 9, "turun", 2, undefined, true),
    tabel("diagram L", 44, 6, "turun", 7),
  ]),
];

/* ------------------------------ Abstract: lembar program konser dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Kursi 8: lembar program", "Lembar program konser hanya berisi kata dan angka.", [
    beda("kartu satu", 3, 8, "naik", ["+4", "+8", `${MIN}8`]),
    rantai("kartu dua", 37, 6, "turun", ["25", "31", "19"]),
    mesin("kartu tiga", 5, 9, "naik", 2, ["14", "23", "32"]),
    salah(
      tabel("kartu empat", 7, 4, "naik", 6, ["31", "23", "27"]),
      "Satria",
      "Urutan keenam, jadi beda tambah empat ditambahkan sebanyak enam kali.",
      "31",
      [
        "Satria benar, dari urutan pertama ke urutan keenam bedanya ditambahkan sebanyak nomor urutannya.",
        "Satria keliru: lompatan dari urutan pertama ke urutan yang ditanyakan selalu satu kurang dari nomor urutannya.",
        "Satria keliru, bilangan pada urutan tertentu tidak boleh dicari dengan tabel.",
      ],
      1,
    ),
  ]),
  A(9, "kanvas", "Misi Kursi 9: tulis di lembar", "Laras meminta kamu menulis jawaban di kanvas.", [
    beda("kartu lima", 6, 8, "naik"),
    rantai("kartu enam", 11, 2, "turun"),
    mesin("kartu tujuh", 9, 2, "turun", 4),
    tabel("kartu delapan", 5, 7, "naik", 8),
  ]),
  A(10, "suara", "Misi Kursi 10: laporan akhir", "Laporan akhir barisan kursi untuk Bu Ratri. Ucapkan jawabannya.", [
    sebut("kartu sembilan", 7, 6, "naik", "beda"),
    rantai("kartu sepuluh", 23, 8, "naik"),
    mesin("kartu sebelas", 60, 7, "turun", 3),
    tabel("kartu dua belas", 75, 6, "turun", 9),
  ]),
];

export const POIN_PENTING = [
  "Pola bilangan punya beda tetap, yaitu selisih yang sama antara dua bilangan yang berurutan.",
  "Beda tambah membuat pola membesar, dan beda kurang membuat pola mengecil.",
  "Melanjutkan pola: tambah atau kurangi beda yang sama dari bilangan terakhir.",
  "Bilangan pada urutan tertentu dicari lewat lompatan, dan lompatannya satu kurang dari nomor urutan.",
  "Pola mengecil berhenti di nol, karena kursi tidak boleh kurang dari nol.",
  "Contoh: 12, 15, 18 punya beda +3, jadi baris kelima 24 lewat empat lompatan.",
  "Rantai Loncat, Mesin Aturan, dan Tabel Urutan membantu melanjutkan pola dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): kedua tamu dan semua tokoh hadir. */
export const PENUTUP_B =
  "Satria, Laras, Genta, Pak Hendro, Bu Ratri, dan Pak Gunawan merayakan akhir bab di Konser Angklung Kampung Senandung. Spanduk terpasang, angklung berderet, lampu menyala, balon naik, dan konfeti beterbangan. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_KURSI = {
  concrete: { ikon: "\u{1F3B6}", nama: "Concrete", cara: "Lapangan konser: benda panggung beremoji, tali lampu, dan papan kursi yang dilihat" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas titik biru muda: titik polos, rantai loncat, mesin, dan tabel urutan yang digambar" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar program konser: kartu kata dan angka di kertas krem, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KURSI, PICTORIAL as PICTORIAL_KURSI, ABSTRACT as ABSTRACT_KURSI };
