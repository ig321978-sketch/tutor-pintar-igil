/**
 * Data tugas CPA Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto": sembilan papan data stadion (tiga per tahap, satu per misi).
 * Concrete = papan tiket beremoji lama (tiket musim, parkir, perlengkapan suporter); Pictorial = diagram polos (tiket musim blok, kursi, alat sorak);
 * Abstract = kartu angka panitia (kios, lampu dan parkir, gerbang). Data BERBEDA dari Story (tribun Timur, Selatan, Utara, Barat) dan dari Infografis.
 * Bilangan sampai 99.999. Diuji: scripts/uji-urutan-k5b1b.mjs.
 */
export type ItemPapan = { nama: string; n: number; ikon?: string };
export type Papan = { id: string; judul: string; satuan: string; item: ItemPapan[] };

export const PAPAN: Record<string, Papan> = {
  /* Concrete (papan tiket beremoji) */
  tiket: {
    id: "tiket",
    judul: "Tiket musim",
    satuan: "tiket",
    item: [
      { nama: "Ekonomi", n: 12000, ikon: "\u{1F3AB}" },
      { nama: "VIP", n: 7999, ikon: "\u{1F3C6}" },
      { nama: "Keluarga", n: 45620, ikon: "\u{26BD}" },
      { nama: "Pelajar", n: 45260, ikon: "\u{1F9E2}" },
    ],
  },
  parkir: {
    id: "parkir",
    judul: "Parkir stadion",
    satuan: "kendaraan",
    item: [
      { nama: "Motor", n: 38450, ikon: "\u{1F6F5}" },
      { nama: "Mobil", n: 8730, ikon: "\u{1F697}" },
      { nama: "Bus", n: 18920, ikon: "\u{1F68C}" },
      { nama: "Sepeda", n: 38900, ikon: "\u{1F6B2}" },
    ],
  },
  suporter: {
    id: "suporter",
    judul: "Perlengkapan suporter",
    satuan: "buah",
    item: [
      { nama: "Bendera", n: 21400, ikon: "\u{1F6A9}" },
      { nama: "Syal", n: 38900, ikon: "\u{1F9E3}" },
      { nama: "Topi", n: 27050, ikon: "\u{1F9E2}" },
      { nama: "Tas", n: 21040, ikon: "\u{1F392}" },
    ],
  },
  /* Pictorial (diagram polos, tanpa emoji) */
  musim: {
    id: "musim",
    judul: "Tiket terjual per blok",
    satuan: "tiket",
    item: [
      { nama: "Blok A", n: 56204 },
      { nama: "Blok B", n: 56024 },
      { nama: "Blok C", n: 9480 },
      { nama: "Blok D", n: 10015 },
    ],
  },
  kursi: {
    id: "kursi",
    judul: "Kursi per tribun",
    satuan: "kursi",
    item: [
      { nama: "Utara", n: 62150 },
      { nama: "Selatan", n: 62190 },
      { nama: "Timur", n: 6250 },
      { nama: "Barat", n: 26100 },
    ],
  },
  sorak: {
    id: "sorak",
    judul: "Alat sorak",
    satuan: "buah",
    item: [
      { nama: "Gong", n: 41000 },
      { nama: "Drum", n: 48250 },
      { nama: "Terompet", n: 56700 },
      { nama: "Peluit", n: 6915 },
    ],
  },
  /* Abstract (kartu angka panitia) */
  kios: {
    id: "kios",
    judul: "Kios makanan",
    satuan: "porsi",
    item: [
      { nama: "Sate", n: 31400 },
      { nama: "Bakso", n: 31400 },
      { nama: "Mie", n: 20805 },
      { nama: "Soto", n: 20850 },
      { nama: "Es", n: 31800 },
    ],
  },
  catatan: {
    id: "catatan",
    judul: "Catatan panitia",
    satuan: "buah",
    item: [
      { nama: "Lampu", n: 940 },
      { nama: "Parkir", n: 52300 },
      { nama: "Kios", n: 52360 },
      { nama: "Tiket", n: 7150 },
    ],
  },
  gerbang: {
    id: "gerbang",
    judul: "Penonton per gerbang",
    satuan: "orang",
    item: [
      { nama: "Timur", n: 64800 },
      { nama: "Barat", n: 64080 },
      { nama: "Utara", n: 9999 },
      { nama: "Selatan", n: 45000 },
      { nama: "Tengah", n: 55200 },
    ],
  },
};
/** Semua nama item (huruf kecil) yang bisa menjadi jawaban suara. */
export const NAMA_ITEM: string[] = Array.from(new Set(Object.values(PAPAN).flatMap((p) => p.item.map((x) => x.nama.toLowerCase()))));
