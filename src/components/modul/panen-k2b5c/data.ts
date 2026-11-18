/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh), akhir cerita Kebun Sekolah.
 * Misi lanjutan "Misi Meja Panen" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (pai apel, roti bundar, kue lapis, kertas persegi, kain taplak;
 * Pictorial memakai bangun polos). Jawaban bukan hanya angka: memilih pembagian yang adil, menarik dua garis, mewarnai seperempat, menyusun pita,
 * mengurutkan langkah, memilih angka, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 8, 6, 7, 3; Pictorial 3, 8, 5, 6; Abstract 4, 2, 6, 8 (tidak kembar dalam satu tahap).
 * Ruang jawaban sempit (pecahan hanya setengah, seperempat, dan utuh): jawaban Abstract 4 dan 2 sama dengan data Story (empat seperempat, dua kali).
 * Diuji: scripts/uji-panen-k2b5c.mjs.
 */
import type { Potong } from "./geometri";
import type { Cara, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kata } from "./logika-cpa";

export { MISI_PANEN_TEKS } from "./data-sim";

const g = (a: number, d?: number): Potong => (d === undefined ? { a } : { a, d });
const SILANG = [g(90), g(0)];

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({ tipe: "salah", tokoh, klaim, kataTokoh, alasan, benar, keliru });

const kelompok =
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

/* ------------------------------ Concrete: petak tanah bertali dengan benda beremoji ------------------------------ */
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Panen 2: bagian yang adil", "Pak Joko membawa banyak benda untuk pesta. Bantu Bu Sari membaginya dengan adil.", [
    salah(
      "Chacha",
      { jenis: "gambar", benda: "roti", bangun: "lingkaran", potong: [g(0), g(45)] },
      "Aku memotong roti dengan dua garis, dan keempat bagiannya seperempat semua!",
      [
        "Chacha benar, empat bagian pasti seperempat.",
        "Keempat bagian tidak sama besar, jadi bukan seperempat.",
        "Roti bundar tidak boleh dibagi menjadi seperempat.",
      ],
      1,
      "Chacha membuat empat bagian, tetapi ada bagian yang lebih besar dan ada yang lebih kecil. Seperempat harus empat bagian yang sama besar.",
    ),
    { tipe: "adil", benda: "kue", bangun: "persegi", pilihan: [[g(90), g(45)], [g(90, -0.5), g(90, 0.5)], SILANG, [g(0, 0.4), g(90)]] },
    { tipe: "susun", sasaran: "setengah", izinSetengah: false },
    { tipe: "warnai", benda: "kertas", bangun: "persegi", potong: SILANG },
  ]),
  C(3, "kanvas", "Misi Meja Panen 3: catatan Dika", "Dika mencatat banyak potongan di meja panen. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "hitung", jenis: "potong", benda: "pai", n: 2, p: 4 },
    { tipe: "hitung", jenis: "potong", benda: "roti", n: 3, p: 2 },
    { tipe: "hitung", jenis: "dinding", baris: [0, 1, 2] },
    { tipe: "hitung", jenis: "sisa", benda: "kertas", berwarna: 1 },
  ]),
  C(4, "suara", "Misi Meja Panen 4: panggilan Bu Sari", "Bu Sari memanggil dari pos panen. Jawab dengan suaramu.", [
    { tipe: "nama", jenis: "sebut", benda: "taplak", bangun: "persegi", potong: SILANG, warna: [0] },
    { tipe: "nama", jenis: "sebut", benda: "roti", bangun: "lingkaran", potong: [g(0)], warna: [0] },
    { tipe: "nama", jenis: "satuan", n: 4 },
    { tipe: "hitung", jenis: "lipatan", benda: "kertas", n: 1 },
  ]),
];

/* ------------------------------ Pictorial: lembar kertas lipat dengan bangun polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Panen 5: lembar bangun", "Nia menggambar lembar bangun polos untuk pesta panen. Periksa pembagiannya.", [
    salah(
      "Dika",
      { jenis: "gambar", benda: "persegi", bangun: "persegi", potong: [g(90, -1 / 3), g(90, 1 / 3)] },
      "Persegi ini terbagi menjadi tiga bagian sama besar, jadi tiap bagian seperempat.",
      [
        "Dika benar, tiga bagian sama besar disebut seperempat.",
        "Dika keliru, bagiannya tidak sama besar.",
        "Seperempat berasal dari empat bagian sama besar, sedangkan gambar ini hanya tiga bagian.",
      ],
      2,
      "Dika benar bahwa ketiga bagian sama besar, tetapi hanya ada tiga bagian. Seperempat berasal dari empat bagian yang sama besar.",
    ),
    { tipe: "garis", benda: "persegi", bangun: "persegi", kandidat: [g(90), g(0), g(45), g(135)] },
    { tipe: "susun", sasaran: "utuh", izinSetengah: true },
    { tipe: "warnai", benda: "lingkaran", bangun: "lingkaran", potong: [g(0), g(45), g(90), g(135)] },
  ]),
  Pi(6, "kanvas", "Misi Meja Panen 6: lembar Dika", "Dika menyusun lembar bangun yang lebih banyak. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "hitung", jenis: "sisa", benda: "lingkaran", berwarna: 1 },
    { tipe: "hitung", jenis: "potong", benda: "persegi", n: 4, p: 2 },
    { tipe: "hitung", jenis: "dinding", baris: [0, 2] },
    { tipe: "hitung", jenis: "lipatan", benda: "kertas", n: 3 },
  ]),
  Pi(7, "suara", "Misi Meja Panen 7: lapor ke Bu Sari", "Nia melaporkan lembar bangunnya kepada Bu Sari. Sebutkan jawabanmu.", [
    { tipe: "nama", jenis: "sebut", benda: "lingkaran", bangun: "lingkaran", potong: SILANG, warna: [0] },
    { tipe: "nama", jenis: "adil", benda: "persegi", bangun: "persegi", potong: SILANG },
    { tipe: "nama", jenis: "satuan", n: 2 },
    { tipe: "nama", jenis: "adil", benda: "lingkaran", bangun: "lingkaran", potong: [g(0), g(45)] },
  ]),
];

/* ------------------------------ Abstract: spanduk dengan kartu kata dan lambang ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Panen 8: kartu kata", "Kartu-kartu pesta panen hanya berisi kata dan lambang.", [
    salah(
      "Chacha",
      { jenis: "fakta", n: 2, kecil: "seperempat", besar: "utuh" },
      "Dua seperempat sama dengan satu utuh.",
      [
        "Chacha benar, dua seperempat memenuhi satu utuh.",
        "Satu utuh sama dengan empat seperempat, sedangkan dua seperempat hanya sama dengan satu setengah.",
        "Seperempat tidak bisa dibandingkan dengan utuh.",
      ],
      1,
      "Chacha menyebut dua seperempat sama dengan satu utuh. Satu utuh sama dengan empat seperempat, sedangkan dua seperempat hanya sama dengan satu setengah.",
    ),
    {
      tipe: "urut",
      langkah: [
        "Bagi benda menjadi dua bagian sama besar.",
        "Periksa bahwa kedua bagian sama besar.",
        "Bagi setiap setengah menjadi dua bagian sama besar.",
        "Periksa bahwa keempat bagian sama besar, lalu sebut seperempat.",
      ],
      petunjuk: [
        "",
        "Dua bagian belum ada. Mulai dengan membagi benda utuh menjadi dua bagian sama besar.",
        "Setengah belum ada. Bagi dulu benda utuh menjadi dua, baru tiap setengah dibagi lagi.",
        "Keempat bagian belum ada. Selesaikan dulu membagi dua kali.",
      ],
    },
    { tipe: "pilih", jenis: "fakta", kecil: "seperempat", besar: "setengah" },
    { tipe: "pilih", jenis: "lipat", kali: 2 },
  ]),
  A(9, "kanvas", "Misi Meja Panen 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    { tipe: "hitung", jenis: "fakta", kecil: "seperempat", besar: "utuh" },
    { tipe: "hitung", jenis: "kali", bagian: 4 },
    { tipe: "hitung", jenis: "dinding", baris: [1, 2] },
    { tipe: "hitung", jenis: "potong", benda: "kertas", n: 2, p: 4 },
  ]),
  A(10, "suara", "Misi Meja Panen 10: pengumuman Bu Sari", "Pengumuman terakhir untuk pesta panen raya. Bacakan jawabannya.", [
    { tipe: "nama", jenis: "satuan", n: 2 },
    { tipe: "nama", jenis: "setengahSetengah" },
    { tipe: "nama", jenis: "satuan", n: 4 },
    { tipe: "nama", jenis: "bagian", n: 3 },
  ]),
];

export const POIN_PENTING = [
  "Seperempat adalah satu dari empat bagian yang sama besar.",
  "Untuk mendapat seperempat, potong atau lipat dua kali: seperempat adalah setengah dari setengah.",
  "Satu utuh sama dengan dua setengah, dan sama dengan empat seperempat.",
  "Satu setengah sama dengan dua seperempat.",
  "Dua garis pada lingkaran harus saling tegak lurus supaya empat bagiannya sama besar.",
  "Kalau bagian-bagiannya tidak sama besar, bagian itu bukan seperempat.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Perayaan akhir cerita bab dan pertanyaan penutup. */
export const PENUTUP_C = "Panen raya dimulai, dan semua bagian sudah dibagi dengan adil. Menurutmu, bagian mana yang paling seru dibagi seperempat: labu, petak tanah, atau kertas?";

export const TEMA_PANEN = {
  concrete: { ikon: "\u{1F33E}", nama: "Concrete", cara: "Petak tanah bertali: benda berwarna dan beremoji untuk dibagi, diwarnai, dan disusun" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar kertas lipat: bangun polos yang dibagi garis, diwarnai, dan disusun dari pita" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Spanduk panen raya: kartu kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PANEN, PICTORIAL as PICTORIAL_PANEN, ABSTRACT as ABSTRACT_PANEN };
