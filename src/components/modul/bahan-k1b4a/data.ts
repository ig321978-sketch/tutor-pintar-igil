/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 4 Sub-Bab A "Bahan dari Gudang",
 * awal cerita Festival Mainan Kardus. Angka Story (empat tutup kaleng lengkung, dua karton segitiga, lima kardus segi empat)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan bilangan lain dan melanjutkan "Misi Festival" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-bahan-k1b4a.mjs.
 */
import type { BahanSim, Benda, Bentuk, Cara, Langkah, LangkahSoal, Rupa, SoalMisi, Syarat, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar benda bekas (kunci = jenis). */
export const EMOJI: Record<string, string> = {
  tutup: "\u{1F96B}",
  piring: "\u{1F37D}\u{FE0F}",
  cd: "\u{1F4BF}",
  donat: "\u{1F369}",
  jam: "\u{1F552}",
  kue: "\u{1F36A}",
  pizza: "\u{1F355}",
  keju: "\u{1F9C0}",
  bendera: "\u{1F6A9}",
  penggaris: "\u{1F4D0}",
  kardus: "\u{1F4E6}",
  bingkai: "\u{1F5BC}\u{FE0F}",
  cokelat: "\u{1F36B}",
  wafel: "\u{1F9C7}",
  amplop: "\u{2709}\u{FE0F}",
  kalender: "\u{1F4C5}",
  festival: "\u{1F3AA}",
};
/** Warna benda di Concrete (isi, garis). */
export const WARNA_BENDA: Record<string, [string, string]> = {
  tutup: ["#CBD5E1", "#475569"],
  piring: ["#FFFFFF", "#64748B"],
  cd: ["#E0E7FF", "#4338CA"],
  donat: ["#F9A8D4", "#9D174D"],
  jam: ["#FEF9C3", "#A16207"],
  kue: ["#FDE68A", "#92400E"],
  pizza: ["#FDBA74", "#C2410C"],
  keju: ["#FDE047", "#A16207"],
  bendera: ["#FCA5A5", "#B91C1C"],
  penggaris: ["#BAE6FD", "#0369A1"],
  kardus: ["#D6A15E", "#78350F"],
  bingkai: ["#FDE7C8", "#9A3412"],
  cokelat: ["#A16207", "#451A03"],
  wafel: ["#FCD34D", "#92400E"],
  amplop: ["#F5F5F4", "#57534E"],
  kalender: ["#BBF7D0", "#15803D"],
};
/** Nama benda untuk label pembaca layar. */
export const NAMA_BENDA: Record<string, string> = {
  tutup: "tutup kaleng",
  piring: "piring kertas",
  cd: "keping cakram",
  donat: "donat",
  jam: "jam dinding",
  kue: "kue bundar",
  pizza: "potongan pizza",
  keju: "potongan keju",
  bendera: "bendera kecil",
  penggaris: "penggaris segitiga",
  kardus: "sisi kardus",
  bingkai: "bingkai foto",
  cokelat: "batang cokelat",
  wafel: "wafel",
  amplop: "amplop",
  kalender: "kalender meja",
};

/* ------------------------------ Mind-map: untaian bendera festival (hanya poin pelajaran) ------------------------------ */
export const PUSAT_BENDERA = "Mengenal bentuk";
export const KELOMPOK_BENDERA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan pengumuman", ikon: "\u{1F4E2}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di papan pengumuman." },
  metode: { nama: "Penyelesaian", letak: "Bendera", ikon: "\u{1F6A9}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di bendera yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Panggung festival", ikon: "\u{1F3AA}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di panggung festival." },
};
export const TEMPAT_BENDERA: Tempat[] = [
  tp("pp-1", "masalah", "Bahan bekas bercampur"),
  tp("pp-2", "masalah", "Perlu roda, atap, badan"),
  tp("pp-3", "masalah", "Bentuk bahan apa?"),
  tp("bd-1", "metode", "Amati tepi bendanya", 1),
  tp("bd-2", "metode", "Hitung sisi lurus", 2),
  tp("bd-3", "metode", "Hitung sudutnya", 3),
  tp("bd-4", "metode", "Beri nama bentuknya", 4),
  tp("bd-5", "metode", "Berburu bentuk", 5),
  tp("bd-6", "metode", "Papan paku", 6),
  tp("bd-7", "metode", "Bentuk misterius", 7),
  tp("pg-1", "hasil", "Lengkung: tanpa sudut"),
  tp("pg-2", "hasil", "Segitiga: tiga sudut"),
  tp("pg-3", "hasil", "Segi empat: empat sudut"),
  tp("pg-4", "hasil", "Diputar tetap sama"),
];
export const PETUNJUK_URUT_BENDERA = "Warnanya sudah benar. Nomor benderanya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_BENDERA =
  "Ini untaian bendera festival. Papan pengumuman berisi masalah. Bendera bernomor berisi langkah yang berurutan, ikuti nomornya. Panggung festival berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: kartu bahan di sisi kardus ------------------------------ */
export const KOLOM_KARTU = ["Bentuk", "Sisi dan sudut", "Banyak", "Dipakai"] as const;
export const BARIS_KARTU: { jenis: string; nama: string; bentuk: string; ciri: string; banyak: string; pakai: string }[] = [
  { jenis: "tutup", nama: "Tutup kaleng", bentuk: "lengkung", ciri: "tanpa sisi lurus", banyak: "ada 4", pakai: "roda" },
  { jenis: "bendera", nama: "Karton", bentuk: "segitiga", ciri: "3 sisi, 3 sudut", banyak: "ada 2", pakai: "atap" },
  { jenis: "kardus", nama: "Kardus", bentuk: "segi empat", ciri: "4 sisi, 4 sudut", banyak: "ada 5", pakai: "badan" },
];
export const TEMPAT_KARTU: Tempat[] = BARIS_KARTU.flatMap((b, i) => [
  tp(`k${i}-bentuk`, "bentuk", b.bentuk),
  tp(`k${i}-ciri`, "ciri", b.ciri),
  tp(`k${i}-banyak`, "banyak", b.banyak),
  tp(`k${i}-pakai`, "pakai", b.pakai),
]);
export const KELOMPOK_KARTU: Record<string, string> = {
  bentuk: "Label ini nama bentuk. Tempelkan di kolom Bentuk.",
  ciri: "Label ini banyak sisi dan sudut. Tempelkan di kolom Sisi dan sudut.",
  banyak: "Label ini banyak bahannya. Tempelkan di kolom Banyak.",
  pakai: "Label ini kegunaan bahan. Tempelkan di kolom Dipakai.",
};
export const SUARA_KARTU = "Ini kartu bahan di sisi kardus, berisi catatan dari cerita. Tiap baris satu bahan. Tempelkan nama bentuk, banyak sisi dan sudut, banyak bahan, dan kegunaannya.";

/* ------------------------------ Simulasi: Misi Festival bagian satu, meja periksa bahan ------------------------------ */
/** Bahan berbeda dari Story: tutup botol, piring kertas, bungkus roti lapis, potongan triplek, kotak teh, kotak pasta gigi. */
export const BAHAN_SIM: BahanSim[] = [
  { id: "botol", nama: "tutup botol", benda: { bentuk: "lengkung", jenis: "tutup", ragam: "bulat" } },
  { id: "piring", nama: "piring kertas", benda: { bentuk: "lengkung", jenis: "piring", ragam: "lonjong" } },
  { id: "roti", nama: "bungkus roti lapis", benda: { bentuk: "segitiga", jenis: "keju", ragam: "sama" } },
  { id: "triplek", nama: "potongan triplek", benda: { bentuk: "segitiga", jenis: "penggaris", ragam: "siku" } },
  { id: "teh", nama: "kotak teh", benda: { bentuk: "segiempat", jenis: "kardus", ragam: "persegi" } },
  { id: "pasta", nama: "kotak pasta gigi", benda: { bentuk: "segiempat", jenis: "kardus", ragam: "panjang" } },
];
export const MISI_BAHAN = "Misi Festival: periksa tiap bahan di meja. Putar, besarkan, tampilkan sisi dan sudut, coba gelindingkan, lalu beri label roda, atap, atau badan.";

/* ------------------------------ CPA: lanjutan Misi Festival ------------------------------ */
const bd = (bentuk: Bentuk, jenis: string, o: Partial<Benda> = {}): Benda => ({ bentuk, jenis, ...o });
const L = (jenis: string): Benda => bd(jenis === "lengkung" ? "lengkung" : jenis === "segitiga" ? "segitiga" : "segiempat", jenis);
/** Kartu kata (Abstract): jenis = kunci KARTU_KATA. */
const KT: Record<string, Bentuk> = { lengkung: "lengkung", segitiga: "segitiga", segiempat: "segiempat", "0sudut": "lengkung", "3sudut": "segitiga", "4sudut": "segiempat", "3sisi": "segitiga", "4sisi": "segiempat", bulat: "lengkung" };
const kt = (...k: string[]): Benda[] => k.map((j) => bd(KT[j], j));
const misteri = (syarat: Syarat[], pilihan: Benda[]): Langkah => ({ tipe: "misteri", syarat, pilihan });

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

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Festival 2: bendera panggung", "Pak RT memasang hiasan festival. Bantu Igil memeriksa bahan hiasannya.", [
    { tipe: "ciri", benda: bd("segitiga", "bendera", { putar: 20, ragam: "sama" }), tanya: "sudut" },
    { tipe: "buru", sasaran: "lengkung", isi: [bd("segitiga", "pizza"), bd("lengkung", "donat"), bd("segiempat", "bingkai"), bd("segitiga", "keju"), bd("segiempat", "cokelat"), bd("lengkung", "jam"), bd("segiempat", "amplop")] },
    { tipe: "paku", bangun: [[[0, 0], [2, 0], [2, 2], [0, 2]], [[3, 2], [6, 2], [6, 4], [3, 4]]] },
    misteri(["tanpa-sudut", "menggelinding"], [bd("segitiga", "keju"), bd("lengkung", "piring"), bd("segiempat", "bingkai")]),
  ]),
  C(2, "kanvas", "Misi Festival 3: lemari dapur", "Kaka mencari bahan tambahan di lemari dapur. Beri tanda dan tulis jawabanmu.", [
    { tipe: "ciri", benda: bd("segiempat", "amplop", { putar: 30, ragam: "panjang" }), tanya: "sisi" },
    { tipe: "buru", sasaran: "segitiga", isi: [bd("segitiga", "pizza"), bd("lengkung", "kue"), bd("segitiga", "keju", { putar: 40 }), bd("segiempat", "wafel"), bd("segitiga", "penggaris"), bd("lengkung", "cd"), bd("segitiga", "bendera", { putar: 180 }), bd("segiempat", "kalender"), bd("segitiga", "pizza", { putar: 90 })] },
    { tipe: "paku", bangun: [[[0, 4], [2, 1], [3, 4]], [[4, 0], [6, 0], [6, 2], [4, 2]]] },
    misteri(["empat-sudut"], [bd("segitiga", "penggaris"), bd("segiempat", "kalender"), bd("lengkung", "jam")]),
  ]),
  C(3, "suara", "Misi Festival 4: telepon Pak RT", "Pak RT menelepon dan bertanya tentang bahan. Jawab dengan suaramu.", [
    { tipe: "ciri", benda: bd("lengkung", "tutup", { ragam: "bulat" }), tanya: "sudut" },
    { tipe: "buru", sasaran: "segiempat", isi: [bd("lengkung", "donat"), bd("segitiga", "keju"), bd("segiempat", "kardus"), bd("lengkung", "cd"), bd("segitiga", "pizza"), bd("lengkung", "jam")] },
    { tipe: "paku", bangun: [[[0, 0], [2, 0], [0, 2]], [[3, 0], [5, 0], [4, 2]], [[1, 4], [3, 3], [5, 4]]] },
    { tipe: "kantong", syarat: "punya-sudut", isi: [bd("segiempat", "bingkai"), bd("lengkung", "kue"), bd("segitiga", "pizza"), bd("segiempat", "cokelat"), bd("segitiga", "bendera"), bd("lengkung", "piring"), bd("segiempat", "wafel"), bd("segitiga", "keju")] },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Festival 5: pola potong", "Abang menggambar pola potong bahan dengan garis saja.", [
    { tipe: "ciri", benda: bd("segiempat", "pola", { putar: 45, ragam: "persegi" }), tanya: "sudut" },
    { tipe: "buru", sasaran: "lengkung", isi: [bd("lengkung", "pola"), bd("lengkung", "pola", { ragam: "lonjong" }), bd("segitiga", "pola"), bd("lengkung", "pola", { skala: 1 }), bd("lengkung", "pola", { ragam: "lonjong", putar: 90 }), bd("segiempat", "pola"), bd("lengkung", "pola"), bd("lengkung", "pola", { skala: 1 }), bd("lengkung", "pola", { ragam: "lonjong" })] },
    { tipe: "paku", bangun: [[[0, 0], [2, 0], [1, 2]], [[0, 3], [0, 4], [2, 4]], [[3, 1], [6, 1], [6, 4], [3, 4]]] },
    misteri(["tiga-sisi"], [bd("segiempat", "pola", { ragam: "panjang" }), bd("lengkung", "pola"), bd("segitiga", "pola", { ragam: "siku", putar: 90 })]),
  ]),
  P(2, "kanvas", "Misi Festival 6: kertas pola", "Abang meminta Igil menandai pola di kertas tipis.", [
    { tipe: "ciri", benda: bd("lengkung", "pola", { ragam: "lonjong" }), tanya: "sisi" },
    { tipe: "buru", sasaran: "segiempat", isi: [bd("segitiga", "pola"), bd("segiempat", "pola", { ragam: "panjang" }), bd("lengkung", "pola"), bd("segitiga", "pola", { putar: 180 }), bd("segiempat", "pola", { putar: 45 }), bd("lengkung", "pola", { ragam: "lonjong" }), bd("segitiga", "pola", { ragam: "siku" })] },
    { tipe: "paku", bangun: [[[0, 0], [3, 0], [0, 3]], [[6, 1], [6, 4], [3, 4]]] },
    misteri(["punya-sudut", "empat-sisi"], [bd("segitiga", "pola"), bd("lengkung", "pola", { ragam: "lonjong" }), bd("segiempat", "pola", { putar: 20 })]),
  ]),
  P(3, "suara", "Misi Festival 7: lapor ke Mamah", "Abang melaporkan polanya kepada Mamah. Sebutkan jawabanmu.", [
    { tipe: "ciri", benda: bd("segitiga", "pola", { putar: 180, ragam: "siku" }), tanya: "sisi" },
    { tipe: "buru", sasaran: "segitiga", isi: [bd("lengkung", "pola"), bd("segiempat", "pola"), bd("segitiga", "pola", { putar: 200 }), bd("segiempat", "pola", { ragam: "panjang" }), bd("lengkung", "pola", { ragam: "lonjong" }), bd("segiempat", "pola", { putar: 45 })] },
    { tipe: "paku", bangun: [[[0, 0], [3, 0], [3, 1], [0, 1]], [[1, 2], [5, 2], [5, 4], [1, 4]]] },
    { tipe: "kantong", syarat: "tanpa-sudut", isi: [bd("lengkung", "pola"), bd("segitiga", "pola"), bd("lengkung", "pola", { ragam: "lonjong" }), bd("lengkung", "pola", { skala: 1 }), bd("segiempat", "pola"), bd("lengkung", "pola"), bd("segitiga", "pola", { putar: 180 }), bd("lengkung", "pola", { ragam: "lonjong" })] },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Festival 8: kartu kata", "Kaka menulis nama bentuk dan cirinya di kartu kecil, tanpa gambar.", [
    { tipe: "ciri", benda: L("lengkung"), tanya: "sudut" },
    { tipe: "buru", sasaran: "segiempat", isi: kt("segiempat", "3sudut", "4sisi", "lengkung", "4sudut", "segiempat", "0sudut", "4sisi", "segiempat") },
    { tipe: "paku", bangun: [[[0, 0], [2, 0], [1, 2]], [[3, 0], [6, 0], [6, 2], [3, 2]]] },
    misteri(["tiga-sudut"], kt("segiempat", "segitiga", "lengkung")),
  ]),
  A(2, "kanvas", "Misi Festival 9: tulis jawaban", "Kaka meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "ciri", benda: L("segitiga"), tanya: "sudut" },
    { tipe: "buru", sasaran: "lengkung", isi: kt("segitiga", "bulat", "4sudut", "3sisi", "lengkung", "segiempat", "3sudut") },
    { tipe: "paku", bangun: [[[0, 4], [1, 2], [2, 4]], [[3, 4], [4, 2], [5, 4]], [[2, 0], [4, 0], [3, 1]]] },
    misteri(["tanpa-sudut"], kt("lengkung", "segiempat", "segitiga")),
  ]),
  A(3, "suara", "Misi Festival 10: semua bahan siap", "Semua bahan sudah dikenali. Bacakan jawaban terakhir untuk Mamah.", [
    { tipe: "ciri", benda: L("segiempat"), tanya: "sisi" },
    { tipe: "buru", sasaran: "segitiga", isi: kt("segitiga", "3sudut", "lengkung", "3sisi", "4sudut", "segitiga", "0sudut", "segiempat", "3sudut") },
    { tipe: "paku", bangun: [[[0, 0], [2, 0], [0, 2]], [[6, 4], [4, 4], [6, 2]], [[3, 0], [5, 0], [5, 1], [3, 1]]] },
    { tipe: "kantong", syarat: "empat-sisi", isi: kt("lengkung", "3sudut", "segiempat", "bulat", "segitiga", "0sudut", "3sisi") },
  ]),
];

export const POIN_PENTING = [
  "Bentuk lengkung tidak punya sisi lurus dan tidak punya sudut. Bentuk lengkung bisa menggelinding.",
  "Segitiga punya 3 sisi lurus dan 3 sudut.",
  "Segi empat punya 4 sisi lurus dan 4 sudut.",
  "Untuk mengenali bentuk: amati tepinya, hitung sisi lurus, hitung sudut, lalu beri nama.",
  "Bentuk tetap sama walau diputar, dibalik, atau ukurannya berbeda.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/3/g, "tiga").replace(/4/g, "empat"));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F4E6}", nama: "Concrete", cara: "Barang bekas: ketuk, tandai, dan ucapkan" },
  pictorial: { ikon: "\u{2702}\u{FE0F}", nama: "Pictorial", cara: "Pola garis: ketuk, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F3AA}", nama: "Abstract", cara: "Kata dan angka saja: ketuk, tulis, dan ucapkan" },
} as const;
