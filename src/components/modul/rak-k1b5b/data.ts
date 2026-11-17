/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab B "Rak Akuarium Bernomor",
 * lanjutan cerita Akuarium Ikan Hias Abang. Angka Story (pakan maju dari delapan sampai lima belas, lampu mundur dari dua puluh sampai
 * dua belas, label hilang tiga belas dan tujuh belas, lima belas di antara empat belas dan enam belas, kisi) hanya dipakai di Mind-map dan
 * Infografis. Simulasi dan CPA memakai rak dan bilangan lain dan melanjutkan "Misi Lapak Ikan" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-rak-k1b5b.mjs.
 */
import type { AlasanCari, Arah, Cara, CariSalah, Langkah, LangkahSoal, Petunjuk, Rupa, SoalMisi, Tanya, Tempat } from "./logika";
import { URUT_METODE, instruksi, kata } from "./logika";

export { EMOJI, NAMA_BENDA, WARNA_BENDA } from "../ikan-k1b5a/data";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: pompa udara dengan selang aerator (hanya poin pelajaran) ------------------------------ */
export const PUSAT_AERATOR = "Menghitung maju dan mundur";
export const KELOMPOK_AERATOR: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Tabung pompa", ikon: "\u{1F50C}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah jambu. Tempelkan di tabung pompa." },
  metode: { nama: "Penyelesaian", letak: "Katup selang", ikon: "\u{1F527}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di katup yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Batu aerasi", ikon: "\u{1F4A8}", isi: "#BAE6FD", garis: "#0369A1", petunjuk: "Label ini biru. Tempelkan di batu aerasi berbuih." },
};
export const TEMPAT_AERATOR: Tempat[] = [
  tp("tb-1", "masalah", "Ada yang terlewat"),
  tp("tb-2", "masalah", "Ada yang dapat dobel"),
  tp("tb-3", "masalah", "Label nomor hilang"),
  tp("kt-1", "metode", "Hitung maju satu-satu", 1),
  tp("kt-2", "metode", "Hitung mundur satu-satu", 2),
  tp("kt-3", "metode", "Sebelum dan sesudah", 3),
  tp("kt-4", "metode", "Bilangan di antara", 4),
  tp("kt-5", "metode", "Cari nomor yang hilang", 5),
  tp("kt-6", "metode", "Lompat di garis bilangan", 6),
  tp("kt-7", "metode", "Kisi bilangan", 7),
  tp("ba-1", "hasil", "Maju: makin besar"),
  tp("ba-2", "hasil", "Mundur: makin kecil"),
  tp("ba-3", "hasil", "Bawahnya tambah sepuluh"),
  tp("ba-4", "hasil", "Tiap nomor tepat sekali"),
];
export const PETUNJUK_URUT_AERATOR = "Warnanya sudah benar. Nomor katupnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_AERATOR =
  "Ini pompa udara akuarium. Tabung pompa berisi masalah. Udara mengalir lewat katup bernomor berisi langkah yang berurutan, ikuti nomornya dari atas ke bawah. Batu aerasi berbuih berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: catatan di tutup kaleng pakan ------------------------------ */
export const KOLOM_KALENG = ["Petunjuk", "Hasil", "Cara"] as const;
export const BARIS_KALENG: { ikon: string; nama: string; petunjuk: string; hasil: string; cara: string }[] = [
  { ikon: "\u{1F963}", nama: "Pakan", petunjuk: "mulai 8", hasil: "sampai 15", cara: "hitung maju" },
  { ikon: "\u{1F4A1}", nama: "Lampu", petunjuk: "mulai 20", hasil: "sampai 12", cara: "hitung mundur" },
  { ikon: "\u{1F50D}", nama: "Tengah", petunjuk: "14 dan 16", hasil: "15", cara: "di antara" },
  { ikon: "\u{1F3F7}\u{FE0F}", nama: "Label", petunjuk: "12 ? 14 · 16 ? 18", hasil: "13 dan 17", cara: "nomor hilang" },
  { ikon: "\u{1F522}", nama: "Rak", petunjuk: "atas 1 sampai 10", hasil: "bawah 11 sampai 20", cara: "tambah sepuluh" },
];
export const TEMPAT_KALENG: Tempat[] = BARIS_KALENG.flatMap((b, i) => [tp(`k${i}-petunjuk`, "petunjuk", b.petunjuk), tp(`k${i}-hasil`, "hasil", b.hasil), tp(`k${i}-cara`, "cara", b.cara)]);
export const KELOMPOK_KALENG: Record<string, string> = {
  petunjuk: "Label ini titik mulai atau tetangga. Tempelkan di kolom Petunjuk.",
  hasil: "Label ini hasilnya. Tempelkan di kolom Hasil.",
  cara: "Label ini cara menghitungnya. Tempelkan di kolom Cara.",
};
export const SUARA_KALENG =
  "Ini catatan di tutup kaleng pakan, dari cerita rak akuarium. Tiap baris satu kegiatan. Tempelkan petunjuknya, hasilnya, dan cara menghitungnya.";

/* ------------------------------ Simulasi: Misi Lapak Ikan bagian satu, rak akuarium bernomor ------------------------------ */
/** Rak ikan cupang (berbeda dari Story): label nomor sembilan dan delapan belas jatuh. Sama dengan HILANG_RAK_B di misi-bab5.ts. */
export const HILANG_SIM: readonly number[] = [9, 18];
export const MISI_RAK = "Misi Lapak Ikan: hitung maju dan mundur di rak cupang, beri pakan tiap akuarium tepat sekali, dan pasang lagi label nomor yang jatuh.";

/* ------------------------------ CPA: lanjutan Misi Lapak Ikan ------------------------------ */
const urutArah = (dari: number, ke: number, jenis = "titik"): Langkah => ({ tipe: "urut", dari, ke, jawab: "arah", hilang: null, jenis });
const urutHilang = (dari: number, ke: number, hilang: number, jenis = "titik"): Langkah => ({ tipe: "urut", dari, ke, jawab: "hilang", hilang, jenis });
const lompat = (dari: number, langkah: number, arah: Arah, jenis = "titik"): Langkah => ({ tipe: "lompat", dari, langkah, arah, jenis });
const kisi = (kosong: number, petunjuk: Petunjuk, jenis = "titik"): Langkah => ({ tipe: "kisi", kosong, petunjuk, jenis });
const tetangga = (n: number, tanya: Tanya, jenis = "titik"): Langkah => ({ tipe: "tetangga", n, tanya, jenis });

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

const cari = (c: Omit<CariSalah, "tipe">): Langkah => ({ tipe: "cari", ...c });
const al = (teks: string, tunjuk = ""): AlasanCari => ({ teks, tunjuk });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Lapak Ikan 2: rak di gudang", "Abang menemukan rak akuarium lain di gudang. Bantu Igil membaca nomornya.", [
    urutArah(11, 6, "tropis"),
    cari({
      tokoh: "Abang",
      kisah: "Igil melompat di rak. Mulai dari 3, hitung maju 4 langkah. Mendarat di mana?",
      klaim: "Abang menjawab: 3, 4, 5, 6. Mendarat di 6.",
      klaimAngka: 6,
      kunci: 7,
      alasan: [
        al("Tempat mulai tidak dihitung. Lompat 4 langkah: 4, 5, 6, 7."),
        al("Tempat mulai ikut dihitung sebagai langkah pertama: 3, 4, 5, 6.", "Itu cara Abang yang keliru. Angka 3 adalah tempat mulai, bukan lompatan. Lompatan pertama mendarat di 4."),
        al("Maju 4 langkah berarti angkanya jadi 4.", "Maju 4 langkah artinya empat lompatan satu-satu dari 3, bukan jadi 4."),
      ],
      benar: 0,
      tunjuk: "Lihat lagi: Abang berhenti di 6 karena 3 ikut dihitung sebagai langkah, padahal 3 tempat mulai. Jadi satu lompatan terlewat.",
      visual: [3, null, null, null, null],
      nyala: 0,
      jenis: "siput",
    }),
    kisi(19, "atas", "ikan"),
    tetangga(9, "sesudah", "udang"),
  ]),
  C(2, "kanvas", "Misi Lapak Ikan 3: catatan Kaka", "Kaka mencatat nomor akuarium. Beri tanda, lalu tulis jawabanmu.", [
    urutArah(2, 9, "buntal"),
    lompat(11, 5, "mundur", "kepiting"),
    kisi(4, "bawah", "tropis"),
    tetangga(18, "antara", "ikan"),
  ]),
  C(3, "suara", "Misi Lapak Ikan 4: panggilan Abang", "Abang bertanya dari teras. Jawab dengan suaramu.", [
    urutHilang(5, 1, 3, "udang"),
    lompat(6, 5, "maju", "ikan"),
    kisi(1, "kanan", "siput"),
    tetangga(6, "sebelum", "buntal"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Lapak Ikan 5: pita ukur", "Abang menandai nomor rak di pita ukur supaya cepat dibaca.", [
    urutArah(4, 10),
    cari({
      tokoh: "Kaka",
      kisah: "Kaka melompat di pita ukur. Mulai dari 14, hitung mundur 4 langkah. Mendarat di mana?",
      klaim: "Kaka menjawab: 15, 16, 17, 18. Mendarat di 18.",
      klaimAngka: 18,
      kunci: 10,
      alasan: [
        al("Mundur berarti makin kecil: 13, 12, 11, 10."),
        al("Mundur berarti bilangannya bertambah: 15, 16, 17, 18.", "Itu cara Kaka yang keliru. Bilangannya bertambah, itu hitung maju. Mundur ke kiri dan makin kecil."),
        al("Mundur 4 langkah berarti angkanya jadi 4.", "Mundur 4 langkah artinya empat lompatan satu-satu ke kiri dari 14, bukan jadi 4."),
      ],
      benar: 0,
      tunjuk: "Lihat lagi: Kaka menghitung 15, 16, 17, 18. Bilangannya bertambah, itu hitung maju, padahal tugasnya mundur.",
      visual: [null, null, null, null, 14],
      nyala: 4,
      jenis: "titik",
    }),
    kisi(7, "bawah"),
    tetangga(18, "sesudah"),
  ]),
  P(2, "kanvas", "Misi Lapak Ikan 6: denah rak", "Kaka menggambar denah rak dengan kotak polos. Beri tanda, lalu tulis jawabanmu.", [urutArah(18, 11), lompat(0, 6, "maju"), kisi(11, "atas"), tetangga(3, "antara")]),
  P(3, "suara", "Misi Lapak Ikan 7: lapor ke Mamah", "Abang melaporkan nomor rak kepada Mamah. Sebutkan jawabanmu.", [urutHilang(15, 19, 18), lompat(7, 5, "mundur"), kisi(9, "kiri"), tetangga(1, "sebelum")]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Lapak Ikan 8: papan angka", "Papan angka di rak hanya menampilkan kata dan angka.", [
    urutArah(20, 14),
    lompat(9, 2, "maju"),
    cari({
      tokoh: "Kaka",
      kisah: "Di kisi, kotak atasnya 8. Berapa nomor kotak di bawah 8?",
      klaim: "Kaka menjawab: di bawah 8 ada 9.",
      klaimAngka: 9,
      kunci: 18,
      alasan: [
        al("Bawah itu baris berikutnya: atas tambah sepuluh, jadi 18."),
        al("Bawah itu tambah satu, jadi 9.", "Itu cara Kaka yang keliru. Tambah satu itu untuk kotak di kanan. Kotak di bawah tambah sepuluh."),
        al("Bawah itu sama dengan atasnya, jadi 8.", "Kotak di bawah punya nomor lain, bukan nomor yang sama dengan kotak di atasnya."),
      ],
      benar: 0,
      tunjuk: "Lihat lagi: Kaka menambah satu dan mendapat 9. Itu nomor di kanan 8, bukan di bawahnya.",
      visual: [],
      nyala: -1,
      jenis: "titik",
    }),
    tetangga(3, "sesudah"),
  ]),
  A(2, "kanvas", "Misi Lapak Ikan 9: tulis nomor", "Kaka meminta Igil menulis nomor rak di kanvas.", [urutArah(7, 13), lompat(12, 7, "mundur"), kisi(10, "kiri"), tetangga(1, "antara")]),
  A(3, "suara", "Misi Lapak Ikan 10: rak siap", "Rak hampir siap. Bacakan jawaban terakhir untuk Abang.", [urutHilang(10, 4, 7), lompat(16, 3, "maju"), kisi(2, "bawah"), tetangga(7, "sebelum")]),
];

export const POIN_PENTING = [
  "Hitung maju: bilangan makin besar, satu-satu. 9, 10, 11.",
  "Hitung mundur: bilangan makin kecil, satu-satu. 11, 10, 9.",
  "Sesudah berarti satu lebih, sebelum berarti satu kurang. Sesudah 6 adalah 7, sebelum 6 adalah 5.",
  "Bilangan di antara ada di tengah dua tetangganya: di antara 18 dan 20 adalah 19.",
  "Nomor yang hilang dicari dari tetangganya. Di kisi, bawahnya tambah sepuluh: di bawah 4 ada 14.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F33F}", nama: "Concrete", cara: "Akuarium dan hewan air: ketuk, tandai, dan ucapkan" },
  pictorial: { ikon: "\u{1F4CF}", nama: "Pictorial", cara: "Kotak polos dan pita bertanda: ketuk, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F7E9}", nama: "Abstract", cara: "Kata dan angka saja: ketuk, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_RAK, PICTORIAL as PICTORIAL_RAK, ABSTRACT as ABSTRACT_RAK, TEMA_TAHAP as TEMA_RAK };
