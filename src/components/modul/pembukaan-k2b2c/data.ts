/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 2 Sub-Bab C "Pesanan Besar Pak Budi", akhir cerita
 * Toko Seragam dan Alat Tulis Sekolah. Angka Story (pensil 12 dan penggaris 4 kurangnya, jumlah 20 dan selisih 4, tiga bilangan 7, 4, 6, bilangan awal 9 dan 6,
 * cerita Nia 8 dan 3) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan bilangan lain, melanjutkan "Misi Meja Pesanan". Bilangan paling besar dua puluh.
 * Diuji: scripts/uji-pembukaan-k2b2c.mjs.
 */
import type { AwalSim, Cara, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SlipSim, SoalMisi, Tempat, TigaSim } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: tali pita gunting (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PITA = "Cerita hitungan penjumlahan dan pengurangan";
export const KELOMPOK_PITA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Pita bawah", ikon: "\u{1F6A7}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Potongan ini merah muda. Pasang di pita bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Pita tengah", ikon: "\u{1F4CB}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Potongan ini kuning. Pasang di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Pita atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Potongan ini hijau. Pasang di pita atas, tempat hasil." },
};
export const TEMPAT_PITA: Tempat[] = [
  tp("pt-m1", "masalah", "Salah memilih tambah atau kurang"),
  tp("pt-m2", "masalah", "Cerita memuat banyak bilangan"),
  tp("pt-m3", "masalah", "Yang dicari bilangan awal"),
  tp("pt-p1", "metode", "Baca pelan, cari kata petunjuk", 1),
  tp("pt-p2", "metode", "Tulis diketahui dan ditanya", 2),
  tp("pt-p3", "metode", "Bagian dan Utuh", 3),
  tp("pt-p4", "metode", "Peragakan Cerita", 4),
  tp("pt-p5", "metode", "Berpikir Mundur", 5),
  tp("pt-p6", "metode", "Solusi: dua bilangan dulu", 6),
  tp("pt-p7", "metode", "Kesimpulan, lalu periksa", 7),
  tp("pt-h1", "hasil", "Tambah untuk jumlah dan lebihnya"),
  tp("pt-h2", "hasil", "Kurang untuk selisih dan kurangnya"),
  tp("pt-h3", "hasil", "Bilangan awal ditemukan"),
  tp("pt-h4", "hasil", "Cerita hitungan buatan sendiri"),
];
export const PETUNJUK_URUT_PITA = "Warnanya sudah benar. Nomor potongannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PITA =
  "Ini pita yang akan digunting. Pita bawah berisi masalah. Pita tengah punya tujuh petak bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Pita atas berisi hasil. Ketuk potongan, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: daftar pesanan besar ------------------------------ */
export const KOLOM_DAFTAR = ["Kata petunjuk", "Hitungan", "Hasil"] as const;
export const BARIS_DAFTAR: { ikon: string; nama: string; kata: string; hitung: string; hasil: string }[] = [
  { ikon: "\u{1F4CF}", nama: "Penggaris", kata: "Kurangnya", hitung: "12 − 4", hasil: "8" },
  { ikon: "\u{1F4E6}", nama: "Semuanya", kata: "Jumlah", hitung: "12 + 8", hasil: "20" },
  { ikon: "\u{1F50D}", nama: "Bedanya", kata: "Selisih", hitung: "12 − 8", hasil: "4" },
  { ikon: "\u{1F58D}\u{FE0F}", nama: "Tiga rak", kata: "Tiga bilangan", hitung: "7 + 4 + 6", hasil: "17" },
  { ikon: "\u{1F519}", nama: "Rak awal", kata: "Bilangan awal", hitung: "9 + 6", hasil: "15" },
  { ikon: "\u{1F4DD}", nama: "Cerita Nia", kata: "Lebihnya", hitung: "8 + 3", hasil: "11" },
];
export const TEMPAT_DAFTAR: Tempat[] = BARIS_DAFTAR.flatMap((b, i) => [tp(`d${i}-kata`, "kata", b.kata), tp(`d${i}-hitung`, "hitung", b.hitung), tp(`d${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_DAFTAR: Record<string, string> = {
  kata: "Label ini kata petunjuk. Tempelkan di kolom Kata petunjuk.",
  hitung: "Label ini hitungan. Tempelkan di kolom Hitungan.",
  hasil: "Label ini hasil hitungan. Tempelkan di kolom Hasil.",
};
export const SUARA_DAFTAR = "Ini daftar pesanan besar, dari cerita pesanan besar kepala sekolah. Tiap baris satu cerita hitungan. Tempelkan kata petunjuknya, hitungannya, dan hasilnya.";

/* ------------------------------ Simulasi: Misi Meja Pesanan bagian satu ------------------------------ */
/** Empat kertas pesanan di Meja Pesanan (berbeda dari Story): topi dan dasi 5 dan 8 (jumlah), tas dan kotak pensil 16 dan 9 (selisih), baju dan topi 8 dan 5 (lebihnya), gunting dan klip 14 dan 6 (kurangnya). */
export const SLIP_SIM: readonly SlipSim[] = [
  { kata: "jumlah", a: 5, b: 8, benda: 3 },
  { kata: "selisih", a: 16, b: 9, benda: 5 },
  { kata: "lebihnya", a: 8, b: 5, benda: 4 },
  { kata: "kurangnya", a: 14, b: 6, benda: 6 },
];
/** Tiga bilangan di Meja Pesanan: pensil warna 4, 9, dan 6 (dua bilangan berjumlah sepuluh adalah 4 dan 6, jumlah semuanya 19). */
export const TIGA_SIM: TigaSim = { benda: 2, isi: [4, 9, 6] };
/** Bilangan awal di Meja Pesanan: baju tinggal 6 setelah 8 diambil (mula-mula 14). */
export const AWAL_SIM: AwalSim = { benda: 4, akhir: 6, b: 8, arah: "ambil" };
export const MISI_PESANAN =
  "Misi Meja Pesanan bagian satu: pasangkan kata petunjuk dengan tanda hitung yang cocok, susun empat langkah cerita, jumlahkan tiga bilangan, balik langkah untuk mencari bilangan awal, lalu susun cerita hitunganmu sendiri. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Meja Pesanan ------------------------------ */
const emp = (kataP: "lebihnya" | "kurangnya" | "selisih" | "jumlah", a: number, b: number, benda: number): LangkahDasar => ({ tipe: "empat", c: { kata: kataP, a, b, benda } });
const bag = (a: number, b: number, cari: "utuh" | "bagian", tukar: boolean, angka: boolean, benda: number): LangkahDasar => ({ tipe: "bagian", a, b, cari, tukar, angka, benda });
const per = (a: number, b: number, arah: "tambah" | "ambil", benda: number): LangkahDasar => ({ tipe: "peragakan", a, b, arah, benda });
const mun = (akhir: number, b: number, arah: "tambah" | "ambil", benda: number): LangkahDasar => ({ tipe: "mundur", akhir, b, arah, benda });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: number | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Pesanan 2: pesanan baru dari Bu Sari", "Bu Sari menaruh pesanan baru di meja. Bantu Chacha menghitung bendanya di rak dan di meja.", [
    salah(
      emp("kurangnya", 13, 4, 0),
      "Chacha",
      "Pensilnya tiga belas dan penggaris empat kurangnya, jadi aku tambah saja.",
      17,
      [
        "Chacha benar, penggaris itu lebih banyak dari pensil.",
        "Kurangnya berarti lebih sedikit, jadi bilangannya dikurangi, bukan ditambah.",
        "Kedua benda harus dijumlahkan semuanya.",
      ],
      1,
      "Chacha menjumlahkan padahal kata petunjuknya kurangnya. Kurangnya berarti lebih sedikit: tiga belas dikurangi empat.",
    ),
    bag(7, 5, "bagian", false, false, 8),
    per(9, 4, "tambah", 5),
    mun(7, 5, "ambil", 4),
  ]),
  C(3, "kanvas", "Misi Meja Pesanan 3: catatan Dika", "Dika mencatat pesanan di rak. Lingkari atau tandai, lalu tulis jawabanmu.", [
    emp("jumlah", 10, 6, 3),
    bag(9, 9, "utuh", false, false, 9),
    per(15, 9, "ambil", 4),
    mun(19, 5, "tambah", 1),
  ]),
  C(4, "suara", "Misi Meja Pesanan 4: panggilan Bu Sari", "Bu Sari bertanya dari balik rak. Jawab dengan suaramu.", [
    emp("selisih", 13, 6, 7),
    bag(10, 5, "bagian", true, true, 2),
    per(8, 2, "tambah", 0),
    mun(12, 6, "ambil", 6),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Meja Pesanan 5: papan tulis Nia", "Nia menggambar diagram polos di papan tulis untuk menyelesaikan cerita hitungan.", [
    salah(
      emp("lebihnya", 8, 5, 2),
      "Nia",
      "Lima lebihnya dari delapan, jadi aku pilih tanda kurang.",
      undefined,
      [
        "Nia benar, lebihnya berarti dikurangi.",
        "Yang lebih banyak tidak perlu dihitung.",
        "Lebihnya berarti lebih banyak, jadi bilangannya ditambah.",
      ],
      2,
      "Lebihnya berarti lebih banyak, jadi ditambah: delapan ditambah lima.",
    ),
    bag(11, 6, "bagian", true, false, 0),
    per(9, 5, "tambah", 0),
    mun(6, 3, "ambil", 0),
  ]),
  P(6, "kanvas", "Misi Meja Pesanan 6: gambar Dika", "Dika menggambar diagram bagian dan utuh. Lingkari atau tandai, lalu tulis jawabanmu.", [
    emp("selisih", 17, 11, 4),
    bag(7, 5, "utuh", false, false, 0),
    per(6, 4, "tambah", 0),
    mun(13, 6, "tambah", 0),
  ]),
  P(7, "suara", "Misi Meja Pesanan 7: lapor ke Pak Budi", "Nia melaporkan hasil diagram kepada Pak Budi. Sebutkan jawabanmu.", [
    emp("kurangnya", 19, 3, 0),
    bag(9, 5, "bagian", false, true, 0),
    per(15, 3, "ambil", 0),
    mun(10, 8, "ambil", 0),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Pesanan 8: spanduk pembukaan", "Spanduk pembukaan hanya berisi kata dan lambang.", [
    salah(
      emp("selisih", 16, 7, 4),
      "Chacha",
      "Selisih berarti beda banyaknya, jadi enam belas dikurangi tujuh sama dengan sembilan.",
      undefined,
      [
        "Selisih berarti beda banyaknya, jadi memang dikurangi dan hasilnya sembilan.",
        "Selisih berarti semuanya digabung, jadi harus ditambah.",
        "Hasil selisih selalu sama dengan bilangan yang lebih kecil.",
      ],
      0,
      "Chacha benar. Selisih berarti beda banyaknya, jadi bilangan yang besar dikurangi bilangan yang kecil.",
      true,
    ),
    bag(6, 8, "bagian", true, false, 0),
    per(9, 7, "tambah", 0),
    salah(
      mun(8, 5, "ambil", 5),
      "Dika",
      "Rak tas tinggal delapan setelah terjual lima, jadi aku kurangi saja.",
      3,
      [
        "Dika benar, yang terjual harus dikurangi.",
        "Yang tadi terjual kita kembalikan, jadi ditambah.",
        "Bilangan awal selalu lebih kecil dari bilangan akhir.",
      ],
      1,
      "Dika mengurangi lagi. Mencari bilangan awal berarti membalik langkahnya: yang tadi terjual dikembalikan, jadi delapan ditambah lima.",
    ),
  ]),
  A(9, "kanvas", "Misi Meja Pesanan 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    emp("kurangnya", 19, 5, 3),
    bag(6, 4, "utuh", false, false, 0),
    per(12, 7, "ambil", 0),
    mun(9, 7, "tambah", 0),
  ]),
  A(10, "suara", "Misi Meja Pesanan 10: sambutan Pak Budi", "Sambutan terakhir untuk pembukaan koperasi. Bacakan jawabannya.", [
    emp("lebihnya", 4, 3, 1),
    bag(6, 10, "bagian", true, true, 0),
    per(5, 7, "tambah", 0),
    mun(11, 7, "ambil", 0),
  ]),
];

export const POIN_PENTING = [
  "Baca ceritanya pelan-pelan, lalu cari kata petunjuknya: lebihnya, kurangnya, selisih, atau jumlah.",
  "Tulis empat langkah: diketahui, ditanya, solusi, dan kesimpulan.",
  "Lebihnya dan jumlah berarti ditambah. Kurangnya dan selisih berarti dikurangi.",
  "Menjumlahkan tiga bilangan: jumlahkan dua bilangan dulu, lalu bilangan ketiga.",
  "Mencari bilangan awal: balik langkahnya. Yang tadi diambil kita tambah, yang tadi ditambah kita kurangi.",
  "Bagian dan Utuh, Peragakan Cerita, dan Berpikir Mundur membantu memilih cara yang pas.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Perayaan akhir cerita bab (Abstract). */
export const PERAYAAN = "Pita digunting, koperasi sekolah resmi dibuka! Semua pesanan lengkap dan pas, dan anak terakhir pun mendapat topi dan pensil. Hebat, kamu sudah bisa menyelesaikan cerita hitungan penjumlahan dan pengurangan!";
export const PERAYAAN_SUARA = PERAYAAN;
/** Penutup bab: tidak ada jembatan ke Sub-Bab berikutnya, hanya ucapan selamat. */
export const PENUTUP_BAB = "Kamu telah menyelesaikan Bab dua: Penjumlahan dan Pengurangan. Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Budi!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F3AF}", nama: "Concrete", cara: "Meja Pesanan: benda alat tulis di rak dan di meja untuk dihitung" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Papan tulis: bagian dan utuh, batang, dan petak polos untuk menghitung" },
  abstract: { ikon: "\u{1F389}", nama: "Abstract", cara: "Spanduk pembukaan: kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PEMBUKAAN, PICTORIAL as PICTORIAL_PEMBUKAAN, ABSTRACT as ABSTRACT_PEMBUKAAN, TEMA_TAHAP as TEMA_PEMBUKAAN };
