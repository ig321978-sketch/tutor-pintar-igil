/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 2 Sub-Bab A "Kiriman dari Gudang",
 * awal cerita Toko Seragam dan Alat Tulis Sekolah. Angka Story (pensil tiga belas dan lima, baju olahraga enam belas dan empat, contoh global delapan dan lima,
 * tujuh dan delapan, sembilan dan tujuh) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan operan lain dan melanjutkan "Misi Kardus Kiriman".
 * Bilangan, operan, dan hasil paling besar dua puluh. Diuji: scripts/uji-gudang-k2b2a.mjs.
 */
import type { Cara, Langkah, LangkahBanding, LangkahDasar, LangkahSalah, LangkahSoal, Metode, Rupa, SoalMisi, Tempat, TugasKardus } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar benda ------------------------------ */
export type SetBenda = { id: string; nama: string; emoji: string; warna: string };
/** Delapan jenis alat tulis dan seragam untuk Concrete (kotak berwarna dengan emoji). Pictorial memakai titik polos, Abstract hanya kata. */
export const SETS: Record<string, SetBenda> = {
  pensil: { id: "pensil", nama: "pensil", emoji: "\u{270F}\u{FE0F}", warna: "#FEF08A" },
  baju: { id: "baju", nama: "baju olahraga", emoji: "\u{1F455}", warna: "#BFDBFE" },
  topi: { id: "topi", nama: "topi", emoji: "\u{1F9E2}", warna: "#FECACA" },
  penggaris: { id: "penggaris", nama: "penggaris", emoji: "\u{1F4CF}", warna: "#E9D5FF" },
  kertas: { id: "kertas", nama: "kertas lipat", emoji: "\u{1F4C4}", warna: "#E5E7EB" },
  kaoskaki: { id: "kaoskaki", nama: "kaos kaki", emoji: "\u{1F9E6}", warna: "#FBCFE8" },
  tas: { id: "tas", nama: "tas", emoji: "\u{1F392}", warna: "#FED7AA" },
  dasi: { id: "dasi", nama: "dasi", emoji: "\u{1F454}", warna: "#BBF7D0" },
};

/* ------------------------------ Mind-map: tiga batang gantungan seragam (hanya poin pelajaran) ------------------------------ */
export const PUSAT_GANTUNGAN = "Berbagai cara menjumlahkan sampai dua puluh";
export const KELOMPOK_GANTUNGAN: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Batang bawah", ikon: "\u{1F6A7}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Gantungkan di batang bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Batang tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru muda. Gantungkan di hanger bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Batang atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau muda. Gantungkan di batang atas, tempat hasil." },
};
export const TEMPAT_GANTUNGAN: Tempat[] = [
  tp("gm-1", "masalah", "Menghitung dari awal itu lambat"),
  tp("gm-2", "masalah", "Sepuluh satuan tidak muat di kotak"),
  tp("gm-3", "masalah", "Bingung memilih cara yang mudah"),
  tp("gp-1", "metode", "Maju dari bilangan yang besar", 1),
  tp("gp-2", "metode", "Pecah bilangan jadi pasangan", 2),
  tp("gp-3", "metode", "Susun di tabel puluhan satuan", 3),
  tp("gp-4", "metode", "Tukar sepuluh satuan ke puluhan", 4),
  tp("gp-5", "metode", "Membuat Sepuluh", 5),
  tp("gp-6", "metode", "Kembar Tambah Satu", 6),
  tp("gp-7", "metode", "Bulatkan Lalu Sesuaikan", 7),
  tp("gh-1", "hasil", "Semua cara hasilnya sama"),
  tp("gh-2", "hasil", "Satu kotak hanya satu angka"),
  tp("gh-3", "hasil", "Cara termudah dipilih sendiri"),
  tp("gh-4", "hasil", "Jumlah sampai dua puluh tepat"),
];
export const PETUNJUK_URUT_GANTUNGAN = "Warnanya sudah benar. Nomor hanger belum pas. Langkah mana yang lebih dulu?";
export const SUARA_GANTUNGAN =
  "Ini tiga batang gantungan seragam. Batang bawah berisi masalah. Batang tengah punya tujuh hanger bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Batang atas berisi hasil. Ketuk label, lalu ketuk hanger yang cocok.";

/* ------------------------------ Infografis: lemari laci alat tulis ------------------------------ */
export const KOLOM_LACI = ["Penjumlahan", "Hasil", "Dibaca"] as const;
export const BARIS_LACI: { ikon: string; nama: string; penjumlahan: string; hasil: string; dibaca: string }[] = [
  { ikon: "\u{270F}\u{FE0F}", nama: "Pensil", penjumlahan: "13 + 5", hasil: "18", dibaca: "delapan belas" },
  { ikon: "\u{1F455}", nama: "Baju olahraga", penjumlahan: "16 + 4", hasil: "20", dibaca: "dua puluh" },
  { ikon: "\u{1F51F}", nama: "Membuat Sepuluh", penjumlahan: "8 + 5", hasil: "13", dibaca: "tiga belas" },
  { ikon: "\u{1F46F}", nama: "Kembar Tambah Satu", penjumlahan: "7 + 8", hasil: "15", dibaca: "lima belas" },
  { ikon: "\u{1F504}", nama: "Bulatkan Lalu Sesuaikan", penjumlahan: "9 + 7", hasil: "16", dibaca: "enam belas" },
];
export const TEMPAT_LACI: Tempat[] = BARIS_LACI.flatMap((b, i) => [tp(`l${i}-jumlah`, "jumlah", b.penjumlahan), tp(`l${i}-hasil`, "hasil", b.hasil), tp(`l${i}-dibaca`, "dibaca", b.dibaca)]);
export const KELOMPOK_LACI: Record<string, string> = {
  jumlah: "Label ini dua bilangan yang ditambah. Tempelkan di kolom Penjumlahan.",
  hasil: "Label ini lambang hasil. Tempelkan di kolom Hasil.",
  dibaca: "Label ini nama bilangan. Tempelkan di kolom Dibaca.",
};
export const SUARA_LACI = "Ini lemari laci alat tulis, dari cerita kiriman dari gudang. Tiap laci satu penjumlahan. Tempelkan penjumlahannya, hasilnya, dan cara membaca hasilnya.";

/* ------------------------------ Simulasi: Misi Kardus Kiriman bagian satu ------------------------------ */
/** Tugas di meja (berbeda dari Story): dua belas dan lima, empat belas dan enam (satuannya penuh sepuluh), enam belas dan tiga. */
export const TUGAS_SIM: TugasKardus[] = [
  { a: 12, b: 5 },
  { a: 14, b: 6 },
  { a: 16, b: 3 },
];
export const SET_SIM = "kertas";
export const MISI_KARDUS =
  "Misi Kardus Kiriman bagian satu: gabungkan dua kardus, hitung maju di jalur bilangan, pecah bilangan menjadi pasangan, dan susun di tabel puluhan dan satuan. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Kardus Kiriman ------------------------------ */
const maju = (set: string, besar: number, kecil: number): LangkahDasar => ({ tipe: "maju", set, besar, kecil });
const sepuluh = (set: string, a: number, b: number): LangkahDasar => ({ tipe: "sepuluh", set, a, b });
const kembar = (set: string, x: number): LangkahDasar => ({ tipe: "kembar", set, x });
const bulat = (set: string, a: number, b: number): LangkahDasar => ({ tipe: "bulat", set, a, b });
const jumlah = (d: LangkahDasar): number => (d.tipe === "maju" ? d.besar + d.kecil : d.tipe === "kembar" ? 2 * d.x + 1 : d.a + d.b);
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: number, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
});
/** Tokoh menjawab dengan benar: anak cukup memilih benar lalu alasannya, tanpa menjawab angka. */
const betul = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh: jumlah(dasar),
  alasan,
  benar,
  keliru,
  betul: true,
});
const banding = (set: string, a: number, b: number, pilihan: [Metode, Metode, Metode], benar: Metode, alasan: string, petunjuk: Partial<Record<Metode, string>>): LangkahBanding => ({ tipe: "banding", set, a, b, pilihan, benar, alasan, petunjuk });

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
  C(2, "klik", "Misi Kardus Kiriman 2: kardus pertama", "Pak Ujang menurunkan kardus baru dari troli. Bantu Chacha dan Dika menjumlahkan isinya.", [
    salah(
      maju("baju", 14, 3),
      "Chacha",
      "Aku mulai dari empat belas, lalu menghitung tiga kali: empat belas, lima belas, enam belas. Jadi enam belas.",
      16,
      [
        "Chacha benar, bilangan awal ikut dihitung sebagai satu hitungan.",
        "Bilangan awal tidak dihitung lagi. Tiga hitungan sesudahnya adalah lima belas, enam belas, dan tujuh belas.",
        "Menghitung maju harus mulai dari satu.",
      ],
      1,
      "Bilangan awal tidak dihitung lagi. Tiga hitungan sesudah empat belas adalah lima belas, enam belas, dan tujuh belas.",
    ),
    sepuluh("topi", 9, 4),
    banding("penggaris", 6, 7, ["igil", "kembar", "bulat"], "kembar", "Enam dan tujuh hanya berbeda satu, jadi ambil kembarnya lalu tambah satu.", {
      igil: "Cara itu bisa dipakai, tetapi ada cara yang lebih singkat. Enam dan tujuh hampir sama besar.",
      bulat: "Enam dan tujuh sama-sama jauh dari sepuluh, jadi penyesuaiannya banyak. Cari cara yang lain.",
    }),
    betul(
      bulat("kertas", 9, 3),
      "Dika",
      "Sembilan kubulatkan menjadi sepuluh, lalu sepuluh ditambah tiga sama dengan tiga belas. Tadi sembilan ditambah satu, jadi kurangi satu. Hasilnya dua belas.",
      [
        "Dika salah karena bilangan tidak boleh dibulatkan.",
        "Dika benar: dibulatkan, dijumlahkan, lalu dikurangi sebanyak yang tadi ditambahkan.",
        "Dika salah karena penyesuaiannya harus ditambah, bukan dikurangi.",
      ],
      1,
      "Jawaban Dika sudah benar. Setelah dibulatkan, bilangan dikurangi sebanyak yang tadi ditambahkan.",
    ),
  ]),
  C(3, "kanvas", "Misi Kardus Kiriman 3: catatan Dika", "Dika mencatat isi kardus. Beri tanda pada bagian yang diminta, lalu tulis jawabanmu.", [maju("pensil", 10, 2), sepuluh("tas", 9, 9), kembar("kaoskaki", 9), bulat("dasi", 8, 6)]),
  C(4, "suara", "Misi Kardus Kiriman 4: lapor ke Bu Sari", "Bu Sari menunggu di meja koperasi. Jawab dengan suaramu.", [maju("baju", 11, 5), sepuluh("topi", 7, 4), kembar("penggaris", 4), bulat("pensil", 9, 6)]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Kardus Kiriman 5: lembar karton", "Nia menggambar isi kardus di lembar karton dengan titik dan kotak polos.", [
    banding("pensil", 12, 3, ["sepuluh", "kembar", "igil"], "igil", "Tiga itu kecil, jadi mulai dari dua belas lalu maju tiga langkah saja.", {
      sepuluh: "Dua belas sudah lewat sepuluh. Melengkapi sepuluh tidak perlu di sini.",
      kembar: "Dua belas dan tiga berbeda jauh, bukan bilangan yang hampir sama.",
    }),
    salah(
      sepuluh("pensil", 9, 6),
      "Nia",
      "Sembilan butuh satu supaya sepuluh. Aku ambil satu dari enam, tinggal lima. Sepuluh ditambah lima sama dengan empat belas.",
      14,
      [
        "Nia benar, setelah sepuluh tinggal ditambah lima dan hasilnya empat belas.",
        "Sepuluh ditambah lima sama dengan lima belas, bukan empat belas. Hitung lagi penjumlahan terakhirnya.",
        "Sembilan tidak boleh dilengkapi sampai sepuluh.",
      ],
      1,
      "Sepuluh ditambah lima sama dengan lima belas, bukan empat belas.",
    ),
    betul(
      kembar("pensil", 5),
      "Dika",
      "Lima dan enam hanya berbeda satu. Lima ditambah lima sama dengan sepuluh, lalu ditambah satu menjadi sebelas.",
      [
        "Dika salah karena kembar harus dijumlahkan dua kali.",
        "Dika salah karena tidak boleh menambah satu.",
        "Dika benar: kembarnya dijumlahkan, lalu ditambah satu.",
      ],
      2,
      "Jawaban Dika sudah benar. Kembarnya dijumlahkan, lalu ditambah satu.",
    ),
    bulat("pensil", 8, 3),
  ]),
  P(6, "kanvas", "Misi Kardus Kiriman 6: karton Nia", "Nia menggambar lembar baru. Beri tanda pada bagian yang diminta, lalu tulis jawabanmu.", [maju("pensil", 17, 2), sepuluh("pensil", 8, 8), kembar("pensil", 4), bulat("pensil", 9, 9)]),
  P(7, "suara", "Misi Kardus Kiriman 7: lapor lewat gambar", "Nia melaporkan gambarnya kepada Bu Sari. Sebutkan jawabanmu.", [maju("pensil", 14, 6), sepuluh("pensil", 8, 4), kembar("pensil", 6), bulat("pensil", 8, 6)]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Kardus Kiriman 8: kartu harga", "Kartu harga di toko hanya berisi kata dan angka.", [
    banding("pensil", 15, 3, ["sepuluh", "kembar", "igil"], "igil", "Tiga itu kecil, jadi mulai dari lima belas lalu maju tiga langkah.", {
      sepuluh: "Lima belas tidak hampir sepuluh, jadi tidak perlu dilengkapi.",
      kembar: "Lima belas dan tiga berbeda jauh, bukan bilangan yang hampir sama.",
    }),
    sepuluh("pensil", 9, 6),
    salah(
      kembar("pensil", 6),
      "Dika",
      "Enam ditambah enam sama dengan dua belas. Jadi enam ditambah tujuh juga dua belas.",
      12,
      [
        "Dika benar, kembarnya sudah cukup menjadi jawaban.",
        "Tujuh lebih besar satu dari enam, jadi kembarnya masih harus ditambah satu menjadi tiga belas.",
        "Enam dan tujuh tidak bisa dijumlahkan dengan kembar.",
      ],
      1,
      "Tujuh lebih besar satu dari enam, jadi hasilnya kembar ditambah satu, yaitu tiga belas.",
    ),
    betul(
      bulat("pensil", 9, 4),
      "Chacha",
      "Sembilan dibulatkan menjadi sepuluh, lalu sepuluh ditambah empat sama dengan empat belas. Karena tadi ditambah satu, aku kurangi satu. Hasilnya tiga belas.",
      [
        "Chacha salah karena penyesuaiannya tidak perlu dilakukan.",
        "Chacha benar: setelah dibulatkan, bilangan dikurangi sebanyak yang tadi ditambahkan.",
        "Chacha salah karena sembilan tidak boleh dibulatkan.",
      ],
      1,
      "Jawaban Chacha sudah benar. Setelah dibulatkan, bilangan dikurangi sebanyak yang tadi ditambahkan.",
    ),
  ]),
  A(9, "kanvas", "Misi Kardus Kiriman 9: tulis di kartu", "Bu Sari meminta Chacha menulis jawaban di kanvas.", [maju("pensil", 13, 3), sepuluh("pensil", 8, 4), kembar("pensil", 4), bulat("pensil", 8, 3)]),
  A(10, "suara", "Misi Kardus Kiriman 10: lapor terakhir", "Laporan terakhir untuk Bu Sari. Bacakan jawabannya.", [maju("pensil", 12, 5), sepuluh("pensil", 9, 9), kembar("pensil", 9), bulat("pensil", 8, 6)]),
];

export const POIN_PENTING = [
  "Hitung maju: mulai dari bilangan yang besar, lalu lanjutkan sebanyak bilangan yang kecil. Bilangan awal tidak dihitung lagi.",
  "Pasangan bilangan: pecah satu bilangan, misalnya 13 menjadi 10 dan 3. Jumlahkan bagian yang kecil dulu, lalu tambahkan sepuluhnya.",
  "Bersusun: tulis satuan lurus dengan satuan, puluhan lurus dengan puluhan, lalu jumlahkan satuan dulu.",
  "10 satuan ditukar menjadi 1 puluhan. Satu kotak hanya boleh diisi satu angka.",
  "Make a Ten (Membuat Sepuluh): lengkapi bilangan yang hampir 10 dengan mengambil dari bilangan lain, lalu tambahkan sisanya.",
  "Doubles Plus One (Kembar Tambah Satu): kalau dua bilangan hanya berbeda 1, jumlahkan kembarnya lalu tambah 1.",
  "Round and Adjust (Bulatkan Lalu Sesuaikan): bulatkan ke 10, jumlahkan, lalu kurangi sebanyak yang tadi ditambahkan.",
  "Semua cara memberi hasil yang sama. Pilih cara yang paling mudah untuk bilangannya, lalu periksa hasilnya.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const JEMBATAN =
  "Semua kardus sudah tercatat. Besok rak seragam diserbu pembeli dan isinya akan berkurang. Menurutmu, kalau satuannya tidak cukup untuk dikurangi, apa yang harus dilakukan pada puluhannya? Ayo lanjut ke Sub-Bab B untuk berbagai cara melakukan pengurangan.";
export const JEMBATAN_SUARA = `${JEMBATAN} Hebat!`;

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F455}", nama: "Concrete", cara: "Rak seragam dan gantungan: ketuk, tandai, dan hitung benda" },
  pictorial: { ikon: "\u{1F4C4}", nama: "Pictorial", cara: "Karton berpetak: titik dan petak polos" },
  abstract: { ikon: "\u{1F3F7}\u{FE0F}", nama: "Abstract", cara: "Kartu harga bertali: kata dan angka saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_GUDANG, PICTORIAL as PICTORIAL_GUDANG, ABSTRACT as ABSTRACT_GUDANG, TEMA_TAHAP as TEMA_GUDANG };
