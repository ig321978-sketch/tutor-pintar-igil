/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna" (waktu dan jam), akhir cerita Hari Olahraga Sekolah.
 * Misi lanjutan "Misi Pos Waktu" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (kegiatan lompat jauh, bola voli, sepak bola, senam, pertunjukan;
 * jam dan lama yang lain). Jawaban tidak hanya angka: membaca jam, memutar jarum, mencocokkan jam analog dan digital, mengurutkan kegiatan, membandingkan
 * batang, menyebut bagian hari, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan. Semua jam tepat.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 3, 5, 8, 6; Pictorial 5, 4, 9, 2; Abstract 2, 3, 5, 8 (tidak kembar dalam satu tahap); Rekam suara angka: 7, 6, 6.
 * Ruang jawaban sempit (angka satu sampai sembilan, jam analog satu sampai dua belas): beberapa jawaban sama dengan data Story (jam lima, jam enam, jam tujuh, jam sembilan),
 * tetapi tidak kembar dalam satu tahap.
 * Diuji: scripts/uji-jadwal-k2b6b.mjs.
 */
import type { Cara, Dur, Keg, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kata } from "./logika-cpa";

export { MISI_JADWAL_TEKS } from "./data-sim";

const kg = (nama: string, emoji: string, h: number): Keg => ({ nama, emoji, h });
const dr = (nama: string, emoji: string, menit: number): Dur => ({ nama, emoji, menit });

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

/* ------------------------------ Concrete: jam dinding besar dan benda lapangan beremoji ------------------------------ */
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Pos Waktu 2: jam di lapangan", "Bu Ratna menggantung jam dinding di lapangan. Bantu membaca jam dan menyusun jadwal lomba.", [
    salah(
      "Chacha",
      { jenis: "baca", h: 16, katak: 12, tampil: "analog" },
      "Jarum panjang di angka dua belas, jadi sekarang pukul dua belas!",
      [
        "Chacha benar, jarum panjang di angka dua belas selalu berarti pukul dua belas.",
        "Jarum panjang di dua belas hanya berarti pukul tepat. Jamnya dibaca dari jarum pendek, yaitu angka empat.",
        "Pukul empat dan pukul dua belas sama saja.",
      ],
      1,
      "Jarum panjang di angka dua belas hanya berarti pukul tepat. Jamnya dibaca dari jarum pendek, dan jarum pendek di angka empat, jadi pukul empat.",
    ),
    { tipe: "urut", item: [kg("Lempar bola", "\u{1F3C0}", 8), kg("Bola voli", "\u{1F3D0}", 13), kg("Sepak bola", "\u{26BD}", 15), kg("Pertunjukan", "\u{1F389}", 20)] },
    { tipe: "set", h: 11 },
    { tipe: "banding", a: dr("Lempar bola", "\u{1F3C0}", 45), b: dr("Sepak bola", "\u{26BD}", 120) },
  ]),
  C(3, "kanvas", "Misi Pos Waktu 3: catatan Dika", "Dika mencatat jam dan jadwal lomba di lapangan. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "baca", h: 15, tampil: "analog" },
    { tipe: "rank", item: [kg("Sepak bola", "\u{26BD}", 15), kg("Lempar bola", "\u{1F3C0}", 8), kg("Pertunjukan", "\u{1F389}", 20), kg("Bola voli", "\u{1F3D0}", 13), kg("Senam", "\u{1F3BD}", 7)], sasaran: 2 },
    { tipe: "selisih", mulai: 8, selesai: 16 },
    { tipe: "kotak", jenis: "hitung", n: 6 },
  ]),
  C(4, "suara", "Misi Pos Waktu 4: panggilan Bu Ratna", "Bu Ratna memanggil dari tiang jam. Jawab dengan suaramu.", [
    { tipe: "bagian", h: 21 },
    { tipe: "awal", a: kg("Pertunjukan", "\u{1F389}", 20), b: kg("Lempar bola", "\u{1F3C0}", 8) },
    { tipe: "selisih", mulai: 9, selesai: 16 },
    { tipe: "lama", a: dr("Lompat jauh", "\u{1F3C3}", 30), b: dr("Sepak bola", "\u{26BD}", 120) },
  ]),
];

/* ------------------------------ Pictorial: lembar jalur jam dengan muka jam polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Pos Waktu 5: lembar jam", "Nia menggambar lembar jam polos untuk jadwal lomba. Periksa bacaannya.", [
    salah(
      "Nia",
      { jenis: "baca", h: 9, katak: 12, tampil: "digital" },
      "Jam digital itu menunjukkan nol sembilan titik nol nol, jadi pukul dua belas.",
      [
        "Nia benar, angka dua belas ada pada jam digital.",
        "Dua angka pertama jam digital adalah jam, yaitu sembilan, jadi pukul sembilan, bukan dua belas.",
        "Jam digital tidak bisa dibaca dengan jam dua belas.",
      ],
      1,
      "Dua angka pertama pada jam digital adalah jamnya. Di sini jamnya sembilan, jadi pukul sembilan, bukan pukul dua belas.",
    ),
    { tipe: "urut", item: [kg("kegiatan A", "", 16), kg("kegiatan B", "", 7), kg("kegiatan C", "", 20), kg("kegiatan D", "", 11)] },
    { tipe: "cocok", h: 14, pilihan: [5, 14, 9, 11] },
    { tipe: "banding", a: dr("kegiatan A", "", 60), b: dr("kegiatan B", "", 180) },
  ]),
  Pi(6, "kanvas", "Misi Pos Waktu 6: lembar Dika", "Dika menyusun lembar jam yang lebih banyak. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "baca", h: 17, tampil: "digital" },
    { tipe: "rank", item: [kg("kegiatan A", "", 16), kg("kegiatan B", "", 7), kg("kegiatan C", "", 20), kg("kegiatan D", "", 11), kg("kegiatan E", "", 9)], sasaran: 0 },
    { tipe: "selisih", mulai: 7, selesai: 16 },
    { tipe: "kotak", jenis: "beda", a: 5, b: 3 },
  ]),
  Pi(7, "suara", "Misi Pos Waktu 7: lapor ke Bu Ratna", "Nia melaporkan lembar jamnya kepada Bu Ratna. Sebutkan jawabanmu.", [
    { tipe: "jarum", yang: "pendek" },
    { tipe: "awal", a: kg("kegiatan A", "", 9), b: kg("kegiatan B", "", 15) },
    { tipe: "selisih", mulai: 11, selesai: 17 },
    { tipe: "lama", a: dr("kegiatan A", "", 180), b: dr("kegiatan B", "", 60) },
  ]),
];

/* ------------------------------ Abstract: panggung penutup dengan kartu kata dan lambang ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Pos Waktu 8: kartu jam", "Kartu-kartu panggung penutup hanya berisi kata dan lambang.", [
    salah(
      "Chacha",
      { jenis: "lama", a: dr("mandi", "", 15), b: dr("tidur malam", "", 480), katak: "a" },
      "Mandi lebih lama daripada tidur malam.",
      [
        "Chacha benar, mandi butuh banyak waktu.",
        "Tidur malam berlangsung berjam-jam, sedangkan mandi hanya beberapa menit, jadi tidur malam yang lebih lama.",
        "Lama kegiatan tidak bisa dibandingkan.",
      ],
      1,
      "Mandi hanya beberapa menit, sedangkan tidur malam berlangsung berjam-jam. Jadi tidur malam yang lebih lama, bukan mandi.",
    ),
    { tipe: "urut", item: [kg("Sarapan", "", 7), kg("Makan siang", "", 12), kg("Bermain layang-layang", "", 16), kg("Membaca dongeng", "", 20)] },
    { tipe: "cocok", h: 17, pilihan: [5, 17, 15, 7] },
    { tipe: "banding", a: dr("Cuci tangan", "", 15), b: dr("Tidur siang", "", 60) },
  ]),
  A(9, "kanvas", "Misi Pos Waktu 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    { tipe: "baca", h: 14, tampil: "digital" },
    { tipe: "rank", item: [kg("Tidur", "", 21), kg("Sarapan", "", 6), kg("Makan siang", "", 12), kg("Istirahat", "", 10), kg("Belajar", "", 8)], sasaran: 3 },
    { tipe: "selisih", mulai: 8, selesai: 13 },
    { tipe: "kotak", jenis: "hitung", n: 8 },
  ]),
  A(10, "suara", "Misi Pos Waktu 10: pengumuman penutup", "Pengumuman terakhir untuk Hari Olahraga. Bacakan jawabannya.", [
    { tipe: "bagian", h: 17 },
    { tipe: "awal", a: kg("Makan siang", "", 12), b: kg("Sarapan", "", 7) },
    { tipe: "selisih", mulai: 10, selesai: 16 },
    { tipe: "lama", a: dr("Mandi", "", 15), b: dr("Sekolah", "", 360) },
  ]),
];

/** Mengubah angka dan jam digital dalam teks menjadi kata (untuk suara tanpa digit): "16.00" menjadi "enam belas titik nol nol". */
export const jadiKata = (t: string): string =>
  t.replace(/(\d{1,2})\.(\d{2})/g, (_, j: string, m: string) => `${kata(Number(j))} titik ${m === "00" ? "nol nol" : kata(Number(m))}`).replace(/\d+/g, (d) => kata(Number(d)));

export const POIN_PENTING = [
  "Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit.",
  "Jarum panjang di angka 12 berarti pukul tepat; jarum pendek menunjukkan pukulnya.",
  "Jam digital: dua angka pertama jam, dua angka sesudah titik menit. Pukul 4 sore ditulis 16.00.",
  "Satu hari dibagi menjadi pagi, siang, sore, dan malam. Pukul 6 bisa pagi atau sore, jadi sebut bagian harinya.",
  "Untuk mengurutkan kegiatan, lihat jam dan bagian harinya: waktu lebih awal lebih dulu.",
  "Lama kegiatan dihitung dari berapa jam jarum pendek bergerak, dari jam mulai sampai jam selesai.",
  "Batang yang lebih panjang berarti kegiatan yang lebih lama; yang lebih pendek lebih sebentar.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map(jadiKata);

/** Perayaan akhir cerita bab dan pertanyaan penutup. */
export const PENUTUP_B = "Hari Olahraga selesai, dan semua lomba tepat waktu. Menurutmu, kegiatan apa yang paling lama kamu lakukan hari ini?";

export const TEMA_JADWAL = {
  concrete: { ikon: "\u{1F551}", nama: "Concrete", cara: "Jam dinding besar di lapangan: jam berwarna dan benda beremoji untuk dibaca, diputar, dan disusun" },
  pictorial: { ikon: "\u{1F4CB}", nama: "Pictorial", cara: "Lembar jalur jam berkotak: muka jam polos, jam digital, dan batang kotak, tanpa gambar benda" },
  abstract: { ikon: "\u{1F3C6}", nama: "Abstract", cara: "Panggung penutup: kartu kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_JADWAL, PICTORIAL as PICTORIAL_JADWAL, ABSTRACT as ABSTRACT_JADWAL };
