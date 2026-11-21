/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (membaca sumbu, menelusuri garis, membandingkan, selisih, jumlah, dan memutar diagram), akhir cerita Bazar Kuliner Sekolah.
 * Misi lanjutan "Misi Batang" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (jajanan Bu Rini dan minuman) dan dari Infografis: Concrete memakai papan data bazar beremoji lama
 * (stan buah, stan kue, hiasan), Pictorial memakai diagram polos (pengunjung, tiket, kursi), Abstract memakai kartu tabel panitia (taplak, pengunjung per waktu, lampu).
 * Jawaban benar dihitung dari data diagram (lihat logika-cpa.ts). Angka jawaban Tulis di kanvas per tahap: Concrete 2, 5, 3, 7; Pictorial 5, 2, 4, 7; Abstract 5, 4, 3, 6 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-bazar-k4b6b.mjs.
 */
import type { Cara, DasarSalah, Langkah, LangkahSalah, LangkahSoal, LAdu, LPutar, LSebut, LTelusur, LTingkat, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_BAZAR_TEKS } from "./data-sim";

type S3 = [string, string, string];
const tingkat = (d: string, pil?: S3): LTingkat => ({ tipe: "tingkat", d, ...(pil ? { pil } : {}) });
const sebut = (d: string, kata: "tegak" | "mendatar"): LSebut => ({ tipe: "sebut", d, kata });
const telusur = (d: string, b: number, hasil: LTelusur["hasil"], pil?: S3): LTelusur => ({ tipe: "telusur", d, b, hasil, ...(pil ? { pil } : {}) });
const adu = (d: string, a: number, b: number, hasil: LAdu["hasil"], pil?: S3): LAdu => ({ tipe: "adu", d, a, b, hasil, ...(pil ? { pil } : {}) });
const putar = (d: string, hasil: LPutar["hasil"], o: { b?: number; diputar?: boolean; pil?: S3 } = {}): LPutar => ({ tipe: "putar", d, hasil, ...(o.b !== undefined ? { b: o.b } : {}), ...(o.diputar ? { diputar: true } : {}), ...(o.pil ? { pil: o.pil } : {}) });
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

/** Empat langkah satu misi, berurut metode: IGIL, Follow the Line, Bar Duel, Flip the Chart. */
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

/* ------------------------------ Concrete: papan data bazar beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Batang 2: papan data", "Pak Dodi memasang papan data di tenda bazar. Periksa batangnya.", [
    tingkat("buah", ["2 buah", "5 buah", "10 buah"]),
    salah(
      telusur("bungkus", 0, "banyak", ["3 bungkus", "30 bungkus", "60 bungkus"]),
      "Satria",
      "Batang Donat berhenti di garis ketiga, jadi tiga bungkus.",
      "3 bungkus",
      [
        "Batang yang berhenti di garis ketiga selalu berarti tiga, apa pun tingkat sumbunya.",
        "Tiap garis mewakili sepuluh bungkus, jadi banyak garis harus dikalikan dengan tingkat sumbu.",
        "Batang Donat terlalu pendek, jadi tidak bisa dibaca pada sumbu.",
      ],
      1,
      false,
      2,
    ),
    adu("buah", 0, 2, "selisih", ["45 buah", "10 buah", "5 buah"]),
    putar("hiasan", "terpanjang", { pil: ["balon", "pita", "lampion"] }),
  ]),
  C(3, "kanvas", "Misi Batang 3: catatan Laras", "Laras mencatat papan data. Periksa batangnya, lalu tulis jawabanmu di kanvas.", [tingkat("hiasan"), telusur("bungkus", 1, "garis"), adu("buah", 0, 3, "selisihGaris"), putar("hiasan", "garis", { b: 1 })]),
  C(4, "suara", "Misi Batang 4: panggilan Pak Dodi", "Pak Dodi memanggil dari tenda bazar. Jawab dengan suaramu.", [sebut("hiasan", "mendatar"), telusur("bungkus", 3, "nama"), adu("buah", 0, 0, "pendek"), putar("hiasan", "garis", { b: 3 })]),
];

/* ------------------------------ Pictorial: diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Batang 5: diagram panitia", "Genta menggambar diagram untuk panitia bazar. Periksa diagramnya.", [
    tingkat("hadir", ["5 orang", "10 orang", "20 orang"]),
    telusur("kursi", 0, "banyak", ["6 buah", "16 buah", "12 buah"]),
    adu("hadir", 2, 0, "selisih", ["90 orang", "50 orang", "30 orang"]),
    salah(
      putar("loket", "terpanjang", { pil: ["utara", "timur", "barat"] }),
      "Laras",
      "Pada diagram mendatar, batang yang paling panjang berarti paling banyak, jadi Timur.",
      "timur",
      [
        "Pada diagram mendatar, batang yang paling pendek berarti paling banyak.",
        "Pada diagram mendatar, makin panjang batang makin banyak datanya, apa pun letaknya.",
        "Diagram mendatar tidak boleh dibaca dari panjang batang.",
      ],
      1,
      true,
      1,
    ),
  ]),
  Pi(6, "kanvas", "Misi Batang 6: diagram Genta", "Genta membuat diagram yang lebih lengkap. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [tingkat("loket"), telusur("hadir", 0, "garis"), adu("kursi", 1, 2, "selisihGaris"), putar("loket", "garis", { b: 0 })]),
  Pi(7, "suara", "Misi Batang 7: lapor ke Pak Dodi", "Genta melaporkan diagramnya kepada Pak Dodi. Sebutkan jawabanmu.", [sebut("kursi", "tegak"), telusur("hadir", 2, "nama"), adu("loket", 0, 0, "pendek"), putar("kursi", "garis", { b: 2, diputar: true })]),
];

/* ------------------------------ Abstract: kartu tabel panitia ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Batang 8: lembar panitia", "Lembar panitia bazar hanya berisi kata dan angka.", [
    tingkat("lampu", ["1 buah", "2 buah", "5 buah"]),
    telusur("taplak", 1, "banyak", ["5 lembar", "25 lembar", "30 lembar"]),
    salah(
      adu("jam", 1, 3, "selisih", ["70 orang", "30 orang", "50 orang"]),
      "Satria",
      "Selisih Siang dan Malam ialah tujuh puluh orang.",
      "70 orang",
      [
        "Selisih dicari dengan mengurangkan banyak yang kecil dari yang besar, bukan menjumlahkannya.",
        "Selisih dua batang selalu sama dengan banyak batang yang lebih kecil.",
        "Selisih hanya dicari bila kedua batang sama panjang.",
      ],
      0,
      false,
      0,
    ),
    putar("jam", "jumlah", { pil: ["120 orang", "90 orang", "140 orang"] }),
  ]),
  A(9, "kanvas", "Misi Batang 9: tulis di lembar", "Laras meminta kamu menulis jawaban di kanvas.", [tingkat("taplak"), telusur("lampu", 0, "garis"), adu("taplak", 1, 2, "selisihGaris"), putar("lampu", "garis", { b: 1 })]),
  A(10, "suara", "Misi Batang 10: laporan akhir", "Laporan akhir bazar untuk Pak Dodi. Ucapkan jawabannya.", [sebut("jam", "mendatar"), telusur("taplak", 0, "nama"), adu("lampu", 0, 0, "tinggi"), putar("jam", "garis", { b: 0 })]),
];

export const POIN_PENTING = [
  "Diagram batang memakai batang persegi panjang untuk menyatakan banyak tiap jenis.",
  "Sumbu harus diberi judul dan satuan, dan tingkatan angkanya diperiksa dulu: naik 1, 2, 5, atau 10 tiap garis.",
  "Banyak data dibaca dengan menelusuri garis dari ujung batang ke sumbu angka.",
  "Batang yang lebih tinggi atau lebih panjang menyatakan data yang lebih banyak.",
  "Selisih dicari dengan mengurangkan, dan jumlah dicari dengan menambahkan semua batang.",
  "Diagram tegak dan mendatar menyatakan data yang sama, hanya arahnya berbeda.",
  "Telusuri Garis, Adu Batang, dan Putar Diagram membantu membaca diagram batang dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p.replace(/(\d+), (\d+), atau (\d+)/, "$1, $2, atau $3")));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): kedua tamu dan semua tokoh hadir. */
export const PENUTUP_B =
  "Satria, Laras, Genta, Pak Hendro, Bu Rini, dan Pak Dodi merayakan akhir bab di Bazar Kuliner Sekolah. Spanduk terpasang, lampu menyala, balon naik, dan tenda jajanan penuh pengunjung. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_BAZAR = {
  concrete: { ikon: "\u{1F3EA}", nama: "Concrete", cara: "Papan data bazar: batang berwarna dengan ikon jajanan yang dilihat, ditelusuri, dan dibandingkan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas berpetak panitia: diagram batang polos bersumbu yang digambar" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar tabel panitia bazar: kartu kata dan angka bercap, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BAZAR, PICTORIAL as PICTORIAL_BAZAR, ABSTRACT as ABSTRACT_BAZAR };
