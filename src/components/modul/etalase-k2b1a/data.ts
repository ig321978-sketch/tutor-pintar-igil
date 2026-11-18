/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 1 Sub-Bab A "Kue Kiriman dari Dapur",
 * awal cerita Kue di Kantin Sekolah. Angka Story (kue lapis tiga puluh enam, nomor antrean tiga puluh empat sampai tiga puluh enam, nomor hilang tiga puluh delapan,
 * contoh dua puluh lima tambah tiga) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan bilangan lain dan melanjutkan "Misi Kotak Kue".
 * Bilangan paling besar lima puluh. Diuji: scripts/uji-etalase-k2b1a.mjs.
 */
import type { Cara, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Tempat, UrutanSim } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar benda ------------------------------ */
export type SetBenda = { id: string; nama: string; emoji: string; warna: string };
/** Delapan jenis kue untuk Concrete (kotak berwarna dengan emoji). Pictorial memakai titik polos, Abstract hanya kata. */
export const SETS: Record<string, SetBenda> = {
  lapis: { id: "lapis", nama: "kue lapis", emoji: "\u{1F370}", warna: "#FBCFE8" },
  donat: { id: "donat", nama: "donat", emoji: "\u{1F369}", warna: "#FDE68A" },
  pastel: { id: "pastel", nama: "pastel", emoji: "\u{1F95F}", warna: "#FED7AA" },
  kuki: { id: "kuki", nama: "kue kering", emoji: "\u{1F36A}", warna: "#FDBA74" },
  bolu: { id: "bolu", nama: "bolu", emoji: "\u{1F382}", warna: "#FCA5A5" },
  roti: { id: "roti", nama: "roti", emoji: "\u{1F35E}", warna: "#FEF08A" },
  cupcake: { id: "cupcake", nama: "kue mangkuk", emoji: "\u{1F9C1}", warna: "#E9D5FF" },
  pai: { id: "pai", nama: "pai", emoji: "\u{1F967}", warna: "#BBF7D0" },
};

/* ------------------------------ Mind-map: etalase kaca bertingkat (hanya poin pelajaran) ------------------------------ */
export const PUSAT_ETALASE = "Menghitung, membaca, dan menulis bilangan sampai lima puluh";
export const KELOMPOK_ETALASE: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Rak bawah", ikon: "\u{1F6A7}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah muda. Tempelkan di rak bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Rak tengah", ikon: "\u{1F4CB}", isi: "#BAE6FD", garis: "#0369A1", petunjuk: "Label ini biru muda. Tempelkan di sekat bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Rak atas", ikon: "\u{1F3C6}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di rak atas, tempat hasil." },
};
export const TEMPAT_ETALASE: Tempat[] = [
  tp("em-1", "masalah", "Banyak benda belum diketahui"),
  tp("em-2", "masalah", "Ada yang terhitung dua kali"),
  tp("em-3", "masalah", "Hasil hitungan berubah-ubah"),
  tp("ep-1", "metode", "Geser tiap benda sambil menyebut", 1),
  tp("ep-2", "metode", "Kemas per sepuluh", 2),
  tp("ep-3", "metode", "Bingkai Sepuluh", 3),
  tp("ep-4", "metode", "Hitung Meloncat", 4),
  tp("ep-5", "metode", "Hitung Lanjut", 5),
  tp("ep-6", "metode", "Tulis puluhan dan satuan", 6),
  tp("ep-7", "metode", "Maju, mundur, lengkapi urutan", 7),
  tp("eh-1", "hasil", "Banyak benda terhitung pasti"),
  tp("eh-2", "hasil", "Angka kiri puluhan, kanan satuan"),
  tp("eh-3", "hasil", "Bilangan terbaca dan tertulis"),
  tp("eh-4", "hasil", "Urutan bilangan lengkap"),
];
export const PETUNJUK_URUT_ETALASE = "Warnanya sudah benar. Nomor sekatnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_ETALASE =
  "Ini etalase kaca bertingkat. Rak bawah berisi masalah. Rak tengah punya tujuh sekat bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Rak atas berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: gulungan karcis nomor antrean ------------------------------ */
export const KOLOM_GULUNGAN = ["Banyak", "Dibaca", "Penjumlahan"] as const;
export const BARIS_GULUNGAN: { ikon: string; nama: string; banyak: string; dibaca: string; jumlah: string }[] = [
  { ikon: "\u{1F370}", nama: "Kue lapis", banyak: "36", dibaca: "tiga puluh enam", jumlah: "30 + 6" },
  { ikon: "\u{1F9D2}", nama: "Antrean pertama", banyak: "34", dibaca: "tiga puluh empat", jumlah: "30 + 4" },
  { ikon: "\u{1F9D2}", nama: "Antrean kedua", banyak: "35", dibaca: "tiga puluh lima", jumlah: "30 + 5" },
  { ikon: "\u{1F39F}", nama: "Nomor yang sobek", banyak: "38", dibaca: "tiga puluh delapan", jumlah: "30 + 8" },
  { ikon: "\u{1F449}", nama: "Hitung Lanjut", banyak: "28", dibaca: "dua puluh delapan", jumlah: "20 + 8" },
];
export const TEMPAT_GULUNGAN: Tempat[] = BARIS_GULUNGAN.flatMap((b, i) => [tp(`g${i}-banyak`, "banyak", b.banyak), tp(`g${i}-dibaca`, "dibaca", b.dibaca), tp(`g${i}-jumlah`, "jumlah", b.jumlah)]);
export const KELOMPOK_GULUNGAN: Record<string, string> = {
  banyak: "Label ini lambang bilangan. Tempelkan di kolom Banyak.",
  dibaca: "Label ini nama bilangan. Tempelkan di kolom Dibaca.",
  jumlah: "Label ini puluhan ditambah satuan. Tempelkan di kolom Penjumlahan.",
};
export const SUARA_GULUNGAN = "Ini gulungan karcis nomor antrean kantin, dari cerita kue kiriman dari dapur. Tiap karcis satu bilangan. Tempelkan lambangnya, cara membacanya, dan puluhan ditambah satuannya.";

/* ------------------------------ Simulasi: Misi Kotak Kue bagian satu ------------------------------ */
/** Benda di meja (berbeda dari Story): dua puluh tiga pastel, nomor antrean mulai empat puluh satu, dan tiga urutan karcis yang sobek. */
export const SET_SIM = "pastel";
export const N_KUE_SIM = 23;
export const NOMOR_AWAL_SIM = 41;
export const PERKIRAAN_SIM = [10, 20, 30];
export const URUTAN_SIM: UrutanSim[] = [
  { deret: [44, 45, 46, 47], hilang: 2 },
  { deret: [18, 19, 20, 21], hilang: 1 },
  { deret: [32, 31, 30, 29], hilang: 2 },
];
export const MISI_KOTAK =
  "Misi Kotak Kue bagian satu: kemas semua kue ke kotak kue, baca puluhan dan satuannya di papan catatan, panggil nomor antrean maju dan mundur, lalu lengkapi karcis yang sobek. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Kotak Kue ------------------------------ */
const kemas = (set: string, n: number): LangkahDasar => ({ tipe: "kemas", set, n });
const bingkai = (set: string, n: number): LangkahDasar => ({ tipe: "bingkai", set, n });
const loncat = (set: string, k: number, r: number): LangkahDasar => ({ tipe: "loncat", set, k, r });
const lanjut = (set: string, awal: number, b: number, mundur = false): LangkahDasar => ({ tipe: "lanjut", set, awal, b, ...(mundur ? { mundur: true } : {}) });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: number | undefined, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
  alasan,
  benar,
  keliru,
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
  C(2, "klik", "Misi Kotak Kue 2: pesanan baru", "Dapur mengirim kue lagi. Bantu Chacha dan Dika menghitungnya dengan kotak kue.", [
    salah(
      kemas("lapis", 21),
      "Chacha",
      "Aku menghitung kue sambil menunjuk, tanpa menandai. Hasilnya dua puluh dua!",
      22,
      [
        "Chacha benar, menunjuk tiap kue saja sudah cukup untuk menghitung.",
        "Kue yang sudah dihitung tidak ditandai, jadi ada kue yang terhitung dua kali. Geser atau tandai kue yang sudah dihitung.",
        "Kue yang paling dekat harus dihitung paling akhir.",
      ],
      1,
      "Menunjuk tanpa menandai membuat satu kue terhitung dua kali. Geser atau tandai kue yang sudah dihitung.",
    ),
    bingkai("donat", 26),
    loncat("pastel", 3, 2),
    lanjut("kuki", 41, 4),
  ]),
  C(3, "kanvas", "Misi Kotak Kue 3: catatan Dika", "Dika mencatat kue di etalase. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    kemas("bolu", 24),
    bingkai("roti", 43),
    loncat("lapis", 3, 1),
    lanjut("donat", 16, 6),
  ]),
  C(4, "suara", "Misi Kotak Kue 4: panggilan Bu Sari", "Bu Sari bertanya dari balik etalase. Jawab dengan suaramu.", [
    kemas("pastel", 47),
    bingkai("kuki", 29),
    loncat("bolu", 4, 8),
    lanjut("roti", 24, 5, true),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Kotak Kue 5: kertas pesanan", "Nia menggambar pesanan kue di kertas kisi dengan bingkai dan titik polos.", [
    kemas("lapis", 18),
    salah(
      bingkai("lapis", 27),
      "Nia",
      "Satu bingkai penuh dan tujuh kotak lagi, jadi sepuluh ditambah tujuh sama dengan tujuh belas.",
      17,
      [
        "Nia benar, hanya satu bingkai yang penuh.",
        "Ada dua bingkai penuh, bukan satu. Jadi dua puluh ditambah tujuh.",
        "Bingkai yang penuh boleh dilewati karena tidak perlu dihitung.",
      ],
      1,
      "Ada dua bingkai penuh, jadi dua puluh ditambah tujuh, bukan sepuluh ditambah tujuh.",
    ),
    loncat("lapis", 2, 6),
    lanjut("lapis", 29, 4),
  ]),
  P(6, "kanvas", "Misi Kotak Kue 6: lembar Nia", "Nia menggambar lembar pesanan dengan bentuk polos. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    kemas("lapis", 42),
    bingkai("lapis", 46),
    loncat("lapis", 3, 2),
    lanjut("lapis", 38, 6),
  ]),
  P(7, "suara", "Misi Kotak Kue 7: lapor ke Bu Sari", "Nia melaporkan lembar pesanan kepada Bu Sari. Sebutkan jawabanmu.", [
    kemas("lapis", 41),
    bingkai("lapis", 23),
    loncat("lapis", 5, 0),
    lanjut("lapis", 31, 2, true),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Kotak Kue 8: struk kasir", "Struk kasir kantin hanya berisi kata dan angka.", [
    kemas("lapis", 14),
    bingkai("lapis", 49),
    loncat("lapis", 3, 3),
    salah(
      lanjut("lapis", 41, 3),
      "Dika",
      "Dari empat puluh satu aku hitung lanjut tiga kali: empat puluh satu, empat puluh dua, empat puluh tiga. Jadi empat puluh tiga.",
      43,
      [
        "Dika benar, bilangan awal ikut dihitung sebagai satu hitungan.",
        "Bilangan awal tidak dihitung lagi. Tiga hitungan sesudahnya adalah empat puluh dua, empat puluh tiga, dan empat puluh empat.",
        "Hitung lanjut harus mulai dari satu.",
      ],
      1,
      "Bilangan awal tidak dihitung lagi. Tiga hitungan sesudah empat puluh satu adalah empat puluh dua, empat puluh tiga, dan empat puluh empat.",
    ),
  ]),
  A(9, "kanvas", "Misi Kotak Kue 9: tulis di struk", "Kasir meminta Chacha menulis jawaban di kanvas.", [
    kemas("lapis", 22),
    bingkai("lapis", 45),
    loncat("lapis", 2, 3),
    lanjut("lapis", 41, 5),
  ]),
  A(10, "suara", "Misi Kotak Kue 10: lapor terakhir", "Laporan terakhir untuk Bu Sari. Bacakan jawabannya.", [
    kemas("lapis", 31),
    bingkai("lapis", 16),
    loncat("lapis", 4, 7),
    lanjut("lapis", 34, 7, true),
  ]),
];

export const POIN_PENTING = [
  "Hitung satu per satu, lalu geser atau tandai tiap benda, supaya tidak terlewat dan tidak terhitung dua kali.",
  "Kemas tiap 10 benda dalam satu kotak. Satu kotak penuh disebut satu puluhan.",
  "Bilangan 26 adalah 2 puluhan dan 6 satuan. Angka di kiri menunjukkan puluhan, angka di kanan menunjukkan satuan.",
  "Bingkai sepuluh yang penuh berarti 10. Hitung meloncat sepuluh-sepuluh, lalu tambahkan yang lepas.",
  "Hitung lanjut: mulai dari bilangan yang sudah diketahui, lalu sambung satu per satu. Bilangan awal tidak dihitung lagi.",
  "Menghitung maju membuat bilangan makin besar, menghitung mundur membuat bilangan makin kecil. Setelah 29 datang 30, sebelum 30 ada 29.",
  "Untuk melengkapi urutan, cari bilangan sesudah atau sebelumnya. Perkirakan dulu dengan patokan sepuluh, lalu buktikan dengan menghitung.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const JEMBATAN = "Semua kue sudah tercatat. Besok kantin menerima pesanan kue yang lebih banyak. Menurutmu, mengapa angka tiga pada tiga puluh enam artinya tiga puluh, bukan tiga saja? Ayo lanjut ke Sub-Bab B untuk mengenal puluhan dan satuan.";
export const JEMBATAN_SUARA = `${JEMBATAN} Hebat!`;

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F370}", nama: "Concrete", cara: "Etalase kaca: pindahkan kue ke kotak, baca bingkai, hitung meloncat, dan hitung lanjut" },
  pictorial: { ikon: "\u{1F4C4}", nama: "Pictorial", cara: "Kertas kisi pesanan putih: bingkai, titik, dan kotak polos" },
  abstract: { ikon: "\u{1F9FE}", nama: "Abstract", cara: "Struk kasir panjang: kata dan angka saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_ETALASE, PICTORIAL as PICTORIAL_ETALASE, ABSTRACT as ABSTRACT_ETALASE, TEMA_TAHAP as TEMA_ETALASE };
