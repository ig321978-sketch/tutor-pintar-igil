/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 8 Sub-Bab B "Bintang Bu Maya" (diagram gambar), akhir cerita Pentas Seni Sekolah.
 * Misi lanjutan "Misi Papan Layar" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih kata atau angka, mengetuk baris menurut banyaknya,
 * menyusun langkah membaca, memilih diagram yang rapi, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete klik 6, kanvas 9, 2, 4, 3, suara 8, 7; Pictorial klik 7, kanvas 5, 9, 1, 6, suara 4, 2;
 * Abstract klik 3, kanvas 8, 6, 2, 7, suara 5. Ruang jawaban sempit (angka satu sampai sembilan): beberapa jawaban sama dengan angka pada data Story
 * (dua, tiga, empat, lima, tujuh, delapan), tetapi tidak kembar dalam satu tahap.
 * Diuji: scripts/uji-gambar-k2b8b.mjs.
 */
import type { Cara, Diagram, Klaim, Lambang, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_LAYAR_TEKS } from "./data-sim";

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({ tipe: "salah", tokoh, klaim, kataTokoh, alasan, benar, keliru });

/** Diagram dari nama dan banyak gambar tiap baris (empat baris paling banyak); `ikon` hanya untuk Concrete. */
const dg = (judul: string, ket: string, lambang: Lambang, ...baris: [string, number, string?][]): Diagram => ({
  judul,
  ket,
  lambang,
  baris: baris.map(([nama, n, ikon]) => (ikon ? { nama, n, ikon } : { nama, n })),
});

const misi =
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

/* ------------------------------ Concrete: loket tiket dengan papan layar kotak-kotak dan benda beremoji ------------------------------ */
const TIKET = "\u{1F39F}\u{FE0F}";
const BALON = "\u{1F388}";
const TOPI = "\u{1F3A9}";
const POPCORN = "\u{1F37F}";
const MINUM = "\u{1F964}";
const KACAMATA = "\u{1F453}";
const SEPATU = "\u{1F45F}";
const LAMPU = "\u{1F4A1}";
const MIKROFON = "\u{1F3A4}";
const KAMERA = "\u{1F4F7}";
const KET_BENDA = "Setiap gambar mewakili satu benda";

const DC1 = dg("Barang di Loket", KET_BENDA, "bintang", ["tiket", 3, TIKET], ["balon", 5, BALON], ["topi", 2, TOPI], ["popcorn", 6, POPCORN]);
const DC2 = dg("Perlengkapan Penonton", KET_BENDA, "bintang", ["kacamata", 5, KACAMATA], ["sepatu", 7, SEPATU], ["lampu", 3, LAMPU]);
const DC3 = dg("Camilan di Loket", KET_BENDA, "bintang", ["popcorn", 9, POPCORN], ["minuman", 4, MINUM]);
const DC4 = dg("Tiket dan Balon", KET_BENDA, "bintang", ["tiket", 6, TIKET], ["balon", 8, BALON]);
const DC5 = dg("Barang Panggung", KET_BENDA, "bintang", ["popcorn", 6, POPCORN], ["minuman", 2, MINUM], ["balon", 8, BALON], ["tiket", 4, TIKET]);
const DC6 = dg("Hadiah Penonton", KET_BENDA, "bintang", ["kamera", 8, KAMERA], ["topi", 5, TOPI], ["mikrofon", 2, MIKROFON]);
const DC8 = dg("Alat Panggung", KET_BENDA, "bintang", ["lampu", 3, LAMPU], ["mikrofon", 4, MIKROFON], ["kamera", 2, KAMERA]);

const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Papan Layar 2: loket tiket", "Bu Maya memajang papan layar kotak-kotak di dekat loket tiket. Bantu membaca dan memeriksa diagramnya.", [
    salah(
      "Chacha",
      { jenis: "ukuran", besar: 4, kecil: 8, katak: "besar" },
      "Baris stiker besar yang paling banyak, karena paling panjang!",
      [
        "Chacha benar, baris yang tampak paling panjang pasti paling banyak.",
        "Gambar dihitung satu per satu dan harus sama ukurannya. Baris stiker kecil punya delapan gambar, jadi baris stiker kecil yang lebih banyak.",
        "Gambar yang paling besar selalu mewakili data yang paling banyak.",
      ],
      1,
      "Hitung gambarnya satu per satu, jangan melihat panjang barisnya. Baris stiker kecil punya delapan gambar dan baris stiker besar empat gambar, jadi baris stiker kecil yang lebih banyak.",
    ),
    { tipe: "baca", dg: DC1, i: 3 },
    { tipe: "banding", dg: DC2, a: 0, b: 2 },
    { tipe: "rapi", banyak: 5, benar: 2, lambang: "bintang" },
  ]),
  C(3, "kanvas", "Misi Papan Layar 3: catatan Dika", "Dika mencatat barang di loket dengan gambar. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "baca", dg: DC3, i: 0 },
    { tipe: "tambah", dg: DC4, a: 0, b: 1 },
    { tipe: "banding", dg: DC2, a: 1, b: 2 },
    { tipe: "rank", dg: DC5, i: 3 },
  ]),
  C(4, "suara", "Misi Papan Layar 4: panggilan Bu Maya", "Bu Maya memanggil dari depan panggung. Jawab dengan suaramu.", [
    { tipe: "baca", dg: DC6, i: 0 },
    { tipe: "ekstrem", dg: DC2, cari: "panjang" },
    { tipe: "banding", dg: DC1, a: 0, b: 1 },
    { tipe: "jumlah", dg: DC8, idx: [0, 1] },
  ]),
];

/* ------------------------------ Pictorial: papan layar kotak-kotak dengan lambang polos ------------------------------ */
const KET_ANAK = "Setiap gambar mewakili satu anak";
const DP1 = dg("Kegiatan Pentas", KET_ANAK, "bintang", ["Tari", 5], ["Musik", 9], ["Drama", 3], ["Puisi", 6]);
const DP2 = dg("Perlengkapan Penari", "Setiap gambar mewakili satu benda", "lingkaran", ["Pita", 2], ["Topi", 4], ["Kipas", 3]);
const DP3 = dg("Penonton Pentas", "Setiap gambar mewakili satu orang", "hati", ["Drama", 2], ["Puisi", 9]);
const DP4 = dg("Kegiatan Pilihan", KET_ANAK, "wajah", ["Menyanyi", 5], ["Menari", 8], ["Drama", 3], ["Puisi", 6]);
const DP5 = dg("Tempat Duduk", "Setiap gambar mewakili satu kursi", "wajah", ["Depan", 7], ["Belakang", 7]);
const DP6 = dg("Sorak Penonton", KET_ANAK, "lingkaran", ["Sorak", 3], ["Tepuk", 8], ["Siul", 5], ["Nyanyi", 1]);
const DP7 = dg("Penonton Tari", KET_ANAK, "bintang", ["Tari", 8], ["Musik", 5]);

const Pi = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Papan Layar 5: papan layar polos", "Nia menggambar papan layar polos untuk Bu Maya. Periksa gambarnya.", [
    salah(
      "Nia",
      { jenis: "selisih", dg: DP7, a: 0, b: 1, lebih: "b" },
      "Musik tiga lebihnya dari tari.",
      [
        "Nia benar, tiga adalah selisih delapan dan lima, jadi musik yang lebih banyak.",
        "Tari punya delapan gambar dan musik lima gambar. Yang lebih banyak adalah tari, jadi tari tiga lebihnya dari musik.",
        "Baris yang lebih pendek selalu lebih banyak daripada baris yang lebih panjang.",
      ],
      1,
      "Tari punya delapan gambar dan musik lima gambar, jadi tari yang lebih banyak. Musik tiga kurangnya dari tari, bukan tiga lebihnya.",
    ),
    { tipe: "tambah", dg: DP3, a: 0, b: 1 },
    { tipe: "urut", dg: DP4, dari: "banyak" },
    { tipe: "urutbaca", dg: DP1 },
  ]),
  Pi(6, "kanvas", "Misi Papan Layar 6: papan Dika", "Dika menyusun papan layar yang lebih lengkap. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "baca", dg: DP1, i: 0 },
    { tipe: "ekstrem", dg: DP1, cari: "panjang" },
    { tipe: "banding", dg: DP1, a: 0, b: 3 },
    { tipe: "jumlah", dg: DP2, idx: [0, 1] },
  ]),
  Pi(7, "suara", "Misi Papan Layar 7: lapor ke Bu Maya", "Nia melaporkan papan layarnya kepada Bu Maya. Sebutkan jawabanmu.", [
    { tipe: "baca", dg: DP2, i: 1 },
    { tipe: "lambang", lambang: "hati", banyak: 5 },
    { tipe: "banding", dg: DP5, a: 0, b: 1 },
    { tipe: "rank", dg: DP6, i: 2 },
  ]),
];

/* ------------------------------ Abstract: panggung penutup dengan kata, lambang, dan tabel kata ------------------------------ */
const DA1 = dg("Penonton Pentas", "Setiap gambar mewakili satu orang", "bintang", ["Anak", 8], ["Dewasa", 3], ["Tamu", 6], ["Guru", 2]);
const DA4 = dg("Penonton Pentas", "Setiap gambar mewakili satu orang", "bintang", ["Guru", 2], ["Anak", 8]);
const DA2 = dg("Tiket Terjual", "Setiap gambar mewakili satu tiket", "hati", ["Pagi", 4], ["Siang", 3], ["Malam", 5]);
const DA3 = dg("Tiket Terjual", "Setiap gambar mewakili satu tiket", "hati", ["Pagi", 6], ["Siang", 4]);

const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan Layar 8: kartu pengumuman", "Kartu-kartu pengumuman hanya berisi kata dan lambang.", [
    salah(
      "Chacha",
      { jenis: "jumlah", dg: DA3, a: 0, b: 1, jumlah: 2 },
      "Baris pagi dan baris siang jumlahnya dua.",
      [
        "Chacha benar, jumlah dua baris adalah selisih banyaknya.",
        "Jumlah didapat dengan menambah banyak gambar kedua baris: enam ditambah empat sama dengan sepuluh, bukan dua.",
        "Jumlah dua baris selalu lebih kecil daripada baris yang paling pendek.",
      ],
      1,
      "Jumlah didapat dengan menambah banyak gambar kedua baris. Enam ditambah empat sama dengan sepuluh, sedangkan dua adalah selisihnya.",
    ),
    { tipe: "baca", dg: DA1, i: 1 },
    { tipe: "banding", dg: DA2, a: 1, b: 2 },
    { tipe: "bagian", dg: DA1, sorot: "keterangan" },
  ]),
  A(9, "kanvas", "Misi Papan Layar 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    { tipe: "baca", dg: DA1, i: 0 },
    { tipe: "tambah", dg: DA4, a: 0, b: 1 },
    { tipe: "banding", dg: DA1, a: 0, b: 2 },
    { tipe: "jumlah", dg: DA2, idx: [0, 1] },
  ]),
  A(10, "suara", "Misi Papan Layar 10: pengumuman penutup", "Pengumuman terakhir Pentas Seni Sekolah. Bacakan jawabannya.", [
    { tipe: "baca", dg: DA2, i: 2 },
    { tipe: "ekstrem", dg: DA1, cari: "pendek" },
    { tipe: "banding", dg: DA1, a: 1, b: 2 },
    { tipe: "letak", dg: DA2, tanya: "gambar" },
  ]),
];

export const POIN_PENTING = [
  "Diagram gambar menyajikan data dengan gambar. Satu gambar mewakili satu benda.",
  "Semua gambar dalam satu diagram harus sama bentuk, sama ukuran, dan sama jaraknya. Warna menandai jenis.",
  "Nama jenis ditulis di kolom kiri, lalu gambar berjajar ke kanan tanpa celah.",
  "Tulis judul diagram dan keterangan, misalnya setiap gambar mewakili satu benda.",
  "Cara membaca: judul, keterangan, nama jenis, lalu hitung gambar tiap baris dari kiri ke kanan.",
  "Baris terpanjang berarti paling banyak, baris terpendek berarti paling sedikit, dan baris sama panjang berarti sama banyak.",
  "Lebihnya dan kurangnya dicari dengan membandingkan dua baris. Jumlah dicari dengan menambah banyak gambar pada baris-baris yang dipilih.",
  "Diagram turus dan diagram gambar yang berdampingan menunjukkan banyak yang sama.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING;

/** Perayaan akhir cerita bab dan pertanyaan penutup. */
export const PENUTUP_B = "Pentas Seni Sekolah resmi dimulai, dan semua penonton bersorak. Menurutmu, data apa lagi di sekitarmu yang bisa dibuat diagram gambar?";

export const TEMA_GAMBAR = {
  concrete: { ikon: "\u{1F3AB}", nama: "Concrete", cara: "Loket tiket dengan papan layar kotak-kotak: diagram gambar dari benda beremoji untuk dibaca, dibandingkan, dan diperiksa" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Papan layar kotak-kotak: baris lambang polos bintang, lingkaran, hati, dan wajah, tanpa gambar benda" },
  abstract: { ikon: "\u{1F3AD}", nama: "Abstract", cara: "Panggung penutup: tabel kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_GAMBAR, PICTORIAL as PICTORIAL_GAMBAR, ABSTRACT as ABSTRACT_GAMBAR };
