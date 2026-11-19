/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab F "Telur Bu Mirna" (perkalian sampai seratus), Toko Kelontong Pak Joko.
 * Misi lanjutan "Misi Rak Kotak" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih kalimat atau angka, memilih sama atau berbeda,
 * mengetuk susunan yang isinya sama, menyusun langkah mengalikan, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete klik 32, 40, kanvas 6, 8, 9, 7, suara 36, 5, 27; Pictorial klik 42, kanvas 7, 5, 8, 3, suara 48, 54, 28;
 * Abstract klik 6, kanvas 5, 9, 8, 7, suara 54, 49, 72. Hasil kali tidak lebih dari seratus. Ruang jawaban satu angka sempit: beberapa jawaban kanvas sama dengan angka
 * pada data Story (tiga, empat, lima, enam, tujuh, delapan, sembilan), tetapi tidak kembar dalam satu tahap dan tidak ada hasil kali yang sama dengan hasil kali Story.
 * Diuji: scripts/uji-kali-k3b1f.mjs.
 */
import type { Cara, Isi, Klaim, Langkah, LangkahSalah, LangkahSoal, Larik, Rupa, SoalMisi, Susunan } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_ISI_TEKS } from "./data-sim";

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({ tipe: "salah", tokoh, klaim, kataTokoh, alasan, benar, keliru });

/** `ikon` hanya untuk Concrete (emoji benda). */
const su = (g: number, s: number, wadah: string, benda: string, ikon?: string): Susunan => (ikon ? { g, s, wadah, benda, ikon } : { g, s, wadah, benda });
const la = (r: number, c: number, benda: string, ikon?: string): Larik => (ikon ? { r, c, benda, ikon } : { r, c, benda });
const isi = (wadah: string, benda: string, ikon?: string): Isi => (ikon ? { wadah, benda, ikon } : { wadah, benda });

const misi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, langkah: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: langkah.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: rak telur dengan benda beremoji ------------------------------ */
const ROTI = "\u{1F35E}";
const PERMEN = "\u{1F36C}";
const KALENG = "\u{1F96B}";
const SABUN = "\u{1F9FC}";
const APEL = "\u{1F34E}";
const BOTOL = "\u{1F37C}";

const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Rak Kotak 2: kiriman Bu Mirna", "Bu Mirna menitipkan banyak barang di rak toko. Periksa hitungan Raka, lalu hitung kiriman lainnya.", [
    salah(
      "Raka",
      { jenis: "tambah", su: su(7, 4, "piring", "roti", ROTI), hasil: 11 },
      "Tujuh piring, tiap piring empat roti, jadi rotinya sebelas!",
      [
        "Raka benar, tujuh ditambah empat sama dengan sebelas.",
        "Isi tiap piring ditambahkan berulang sebanyak piringnya: empat dijumlah tujuh kali sama dengan dua puluh delapan roti.",
        "Roti yang jumlahnya sebelas selalu lebih banyak daripada tujuh piring.",
      ],
      1,
      "Perkalian menjumlah isi yang sama berulang sebanyak piringnya, bukan menjumlah dua bilangan. Empat dijumlah tujuh kali sama dengan dua puluh delapan roti, bukan sebelas.",
    ),
    { tipe: "pilihsama", isi: isi("kotak", "permen", PERMEN), pilihan: [[4, 4, 5], [3, 2, 3], [4, 4, 4]], benar: 2 },
    { tipe: "baris", la: la(4, 8, "kaleng", KALENG), tanya: "semua" },
    { tipe: "lompat", m: 8, n: 5, tanya: "hasil" },
  ]),
  C(3, "kanvas", "Misi Rak Kotak 3: catatan Salsa", "Salsa mencatat barang di rak toko. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "ulang", su: su(6, 4, "kotak", "sabun", SABUN) },
    { tipe: "bilangan", su: su(3, 8, "keranjang", "apel", APEL), tanya: "isi" },
    { tipe: "baris", la: la(3, 9, "roti", ROTI), tanya: "kolom" },
    { tipe: "lompat", m: 5, n: 7, tanya: "banyak" },
  ]),
  C(4, "suara", "Misi Rak Kotak 4: telepon Pak Joko", "Pak Joko menelepon dari meja kasir. Jawab dengan suaramu.", [
    { tipe: "tulis", su: su(6, 6, "kotak", "kaleng", KALENG) },
    { tipe: "sama", isi: isi("piring", "apel", APEL), banyak: [4, 4, 3, 4] },
    { tipe: "putar", la: la(7, 5, "botol", BOTOL) },
    { tipe: "lompat", m: 9, n: 3, tanya: "hasil" },
  ]),
];

/* ------------------------------ Pictorial: lembar petak dengan titik polos ------------------------------ */
const Pi = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Rak Kotak 5: lembar petak", "Bima menggambar kotak titik di lembar petak untuk Pak Joko. Periksa gambarnya.", [
    { tipe: "urutlangkah" },
    salah(
      "Salsa",
      { jenis: "peran", su: su(4, 7, "kotak", "titik"), bilangan: "g", katak: "isi" },
      "Pada empat kali tujuh, bilangan empat menunjukkan isi tiap kotak.",
      [
        "Salsa benar, bilangan pertama selalu menunjukkan isi tiap kotak.",
        "Bilangan kedua menunjukkan banyak kotak, sedangkan bilangan pertama menunjukkan isinya.",
        "Bilangan pertama menunjukkan banyak kotak. Gambar punya empat kotak, jadi empat adalah banyak kotak dan tujuh adalah isi tiap kotak.",
      ],
      2,
      "Bilangan pertama pada perkalian menunjukkan banyak kotak. Gambar punya empat kotak dan tiap kotak berisi tujuh titik, jadi empat adalah banyak kotak, bukan isi tiap kotak.",
    ),
    { tipe: "deret", la: la(5, 6, "titik"), arah: "tegak" },
    { tipe: "lompat", m: 6, n: 7, tanya: "hasil" },
  ]),
  Pi(6, "kanvas", "Misi Rak Kotak 6: lembar Salsa", "Salsa menyusun titik yang lebih banyak. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "ulang", su: su(7, 3, "kotak", "titik") },
    { tipe: "bilangan", su: su(5, 6, "kotak", "titik"), tanya: "wadah" },
    { tipe: "baris", la: la(8, 4, "titik"), tanya: "baris" },
    { tipe: "lompat", m: 3, n: 6, tanya: "besar" },
  ]),
  Pi(7, "suara", "Misi Rak Kotak 7: lapor ke Pak Joko", "Bima melaporkan lembar petaknya kepada Pak Joko. Sebutkan jawabanmu.", [
    { tipe: "ulang", su: su(8, 6, "kotak", "titik") },
    { tipe: "sama", isi: isi("kotak", "titik"), banyak: [6, 6, 6] },
    { tipe: "baris", la: la(6, 9, "titik"), tanya: "semua" },
    { tipe: "lompat", m: 7, n: 4, tanya: "hasil" },
  ]),
];

/* ------------------------------ Abstract: papan struk dengan kalimat, angka, dan tanda ------------------------------ */
const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Rak Kotak 8: struk kasir", "Struk kasir hanya berisi kata dan lambang. Periksa isinya.", [
    { tipe: "tulis", su: su(9, 7, "kotak", "pensil") },
    { tipe: "peran", su: su(8, 3, "kotak", "kaleng"), bilangan: "s" },
    { tipe: "putar", la: la(9, 6, "pensil") },
    salah(
      "Bima",
      { jenis: "lompat", m: 6, n: 4, hasil: 10 },
      "Empat lompatan sebesar enam mendarat di sepuluh.",
      [
        "Bima benar, enam ditambah empat sama dengan sepuluh.",
        "Lompatan sebesar enam dilakukan empat kali: enam, dua belas, delapan belas, dua puluh empat. Jadi mendarat di dua puluh empat.",
        "Lompatan terakhir selalu mendarat di bilangan yang paling kecil.",
      ],
      1,
      "Lompatan menambah bilangan yang sama berulang. Empat lompatan sebesar enam mendarat di dua puluh empat, bukan sepuluh.",
    ),
  ]),
  A(9, "kanvas", "Misi Rak Kotak 9: tulis di struk", "Raka meminta kamu menulis jawaban di kanvas.", [
    { tipe: "ulang", su: su(5, 9, "kotak", "pensil") },
    { tipe: "jumlah", su: su(3, 3, "kotak", "permen") },
    { tipe: "baris", la: la(2, 4, "kaleng"), tanya: "semua" },
    { tipe: "lompat", m: 3, n: 7, tanya: "banyak" },
  ]),
  A(10, "suara", "Misi Rak Kotak 10: laporan penutup", "Laporan terakhir sebelum hari jadi toko. Bacakan jawabannya.", [
    { tipe: "tulis", su: su(6, 9, "kotak", "telur") },
    { tipe: "cara", su: su(4, 8, "kotak", "roti") },
    { tipe: "baris", la: la(7, 7, "kaleng"), tanya: "semua" },
    { tipe: "lompat", m: 8, n: 9, tanya: "hasil" },
  ]),
];

/** Poin penting (tampil di layar, boleh memakai angka dan tanda). */
export const POIN_PENTING = [
  "Perkalian dipakai bila ada beberapa kotak yang isinya sama banyak.",
  "Perkalian adalah penjumlahan berulang: 4 × 5 = 5 + 5 + 5 + 5.",
  "Pada 4 × 5, bilangan pertama menyatakan banyak kotak dan bilangan kedua menyatakan isi tiap kotak.",
  "Urutan bilangan pada perkalian boleh ditukar: 3 × 7 = 7 × 3.",
  "Susunan baris dan kolom: banyak baris kali banyak kolom sama dengan banyak semua barang.",
  "Lompat hitung: banyak lompatan kali besar lompatan sama dengan bilangan pendaratan terakhir.",
  "Periksa hasil kali dengan penjumlahan berulang atau lompatan pada garis bilangan.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = [
  "Perkalian dipakai bila ada beberapa kotak yang isinya sama banyak.",
  "Perkalian adalah penjumlahan berulang. Empat kali lima sama dengan lima tambah lima tambah lima tambah lima.",
  "Bilangan pertama pada perkalian menyatakan banyak kotak dan bilangan kedua menyatakan isi tiap kotak.",
  "Urutan bilangan pada perkalian boleh ditukar. Tiga kali tujuh sama dengan tujuh kali tiga.",
  "Pada susunan baris dan kolom, banyak baris kali banyak kolom sama dengan banyak semua barang.",
  "Pada lompat hitung, banyak lompatan kali besar lompatan sama dengan bilangan pendaratan terakhir.",
  "Periksa hasil kali dengan penjumlahan berulang atau lompatan pada garis bilangan.",
];

/** Penutup tahap Abstract dan jembatan ke Sub-Bab G. */
export const PENUTUP_F = "Perkalian sudah dikuasai! Besok hari jadi Toko Pak Joko dan semua bingkisan harus dibagi rata. Menurutmu, kalau banyak barang dibagi ke beberapa kotak, bagaimana cara tahu isi tiap kotak?";

export const TEMA_KALI = {
  concrete: { ikon: "\u{1F95A}", nama: "Concrete", cara: "Rak telur: gambar kotak dan benda beremoji untuk dihitung, dijumlah berulang, dan dikalikan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar petak: kotak berisi titik polos, susunan baris kolom, dan garis bilangan, tanpa gambar benda" },
  abstract: { ikon: "\u{1F9FE}", nama: "Abstract", cara: "Papan struk: kalimat, angka, dan tanda saja untuk dipilih, ditulis, dan diucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KALI, PICTORIAL as PICTORIAL_KALI, ABSTRACT as ABSTRACT_KALI };
