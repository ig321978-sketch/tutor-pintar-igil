/**
 * Data murni Matematika Kelas 6 Bab 4 (Peluang): Sub-Bab A–B.
 * Sumber: Buku Siswa Matematika Kelas VI Kemendikbudristek Bab 4 hlm. 113–144.
 * Metode luar: Likelihood Spectrum Scale, Impossible-Certain Continuum, Qualitative Probability Language,
 * Experimental Relative Frequency, Comparative Probability Ratio, Fair Game Equal Chance,
 * Favorable-to-Total Ratio, Relative Likelihood Decision.
 * Tanpa React/jaringan. Uji: scripts/uji-statis-k6b4.mjs.
 */

export const HURUF = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}
export const opsiTeks = (benar: string, pengecoh: string[], seed: number) => {
  const o = [benar, ...pengecoh.slice(0, 2)];
  while (o.length < 3) o.push(`?${o.length}`);
  return urutanTetap(3, 1, seed).map((i) => o[i]);
};
export const opsiAngka = (h: number, seed: number) => {
  const o = [h, h + 1 + (seed % 3), Math.max(0, h - 2 - (seed % 2))];
  if (o[1] === h) o[1] = h + 4;
  if (o[2] === h || o[2] === o[1]) o[2] = h + 6;
  return urutanTetap(3, 1, seed).map((i) => String(o[i]));
};

export type SkalaId = "tidak" | "kurang" | "mungkin" | "sangat" | "pasti";

// ========== A · Skala Peluang ==========
export const RONDE_HITUNG_CA: { label: string; hasil: number; pesan: string; skala?: SkalaId }[][] = [
  [
    { label: "tangga skala (jumlah kategori)", hasil: 5, pesan: "Tidak mungkin → pasti = 5.", skala: "mungkin" },
    { label: "buku merah 6 dari 10 → posisi relatif", hasil: 6, pesan: "Paling banyak = sangat mungkin.", skala: "sangat" },
  ],
  [
    { label: "warna hijau di rak (jumlah 0)", hasil: 0, pesan: "Nol = tidak mungkin.", skala: "tidak" },
    { label: "dadu semua sisi 5 → angka 5", hasil: 8, pesan: "Semua sisi sama → pasti (contoh 8 sisi).", skala: "pasti" },
  ],
  [
    { label: "koin: banyak sisi", hasil: 2, pesan: "Gambar dan angka.", skala: "mungkin" },
    { label: "dadu 6 sisi: peluang satu angka (penyebut)", hasil: 6, pesan: "1 dari 6.", skala: "kurang" },
  ],
];
export const RONDE_ARTI_CA: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Peluang adalah?", jawab: "perhitungan seberapa mungkin suatu kejadian", opsi: ["perhitungan seberapa mungkin suatu kejadian", "hanya tebakan tanpa alasan", "selalu angka pastinya menang"], pesan: "Definisi buku." },
    { tanya: "METODE LUAR Likelihood Spectrum Scale?", jawab: "lima tangga dari tidak mungkin sampai pasti", opsi: ["lima tangga dari tidak mungkin sampai pasti", "hanya dua pilihan ya/tidak", "hanya angka persen wajib"], pesan: "Spektrum." },
  ],
  [
    { tanya: "Impossible-Certain Continuum menempatkan?", jawab: "mustahil di kiri dan pasti di kanan", opsi: ["mustahil di kiri dan pasti di kanan", "pasti di kiri saja", "tidak ada ujung"], pesan: "Kontinum." },
    { tanya: "Tsunami 0 pada data setempat berarti?", jawab: "tidak mungkin menurut data itu", opsi: ["tidak mungkin menurut data itu", "pasti terjadi", "sangat mungkin"], pesan: "Bukti 0." },
  ],
  [
    { tanya: "Qualitative Probability Language memakai?", jawab: "kata kurang/mungkin/sangat mungkin", opsi: ["kata kurang/mungkin/sangat mungkin", "hanya rumus aljabar lanjut", "nama kota saja"], pesan: "Bahasa." },
    { tanya: "Experimental Relative Frequency?", jawab: "bandingkan hasil percobaan dengan prediksi", opsi: ["bandingkan hasil percobaan dengan prediksi", "abaikan data percobaan", "satu percobaan sudah cukup selalu"], pesan: "Frekuensi." },
  ],
];
export const RONDE_SORTIR_CA: { id: string; label: string; bin: "ya" | "tidak" }[][] = [
  [
    { id: "a1", label: "hijau 0 = tidak mungkin", bin: "ya" }, { id: "a2", label: "semua sisi 5 = pasti 5", bin: "ya" }, { id: "a3", label: "peluang = tebak semau hati", bin: "tidak" },
    { id: "a4", label: "5 tangga spektrum", bin: "ya" }, { id: "a5", label: "merah terbanyak = sangat mungkin", bin: "ya" }, { id: "a6", label: "pasti = kadang-kadang", bin: "tidak" },
  ],
  [
    { id: "b1", label: "koin 2 sisi sama mungkin", bin: "ya" }, { id: "b2", label: "prediksi sebelum putar", bin: "ya" }, { id: "b3", label: "abaikan jumlah bola", bin: "tidak" },
    { id: "b4", label: "data 0 → tidak mungkin", bin: "ya" }, { id: "b5", label: "satu putaran = cukup pasti", bin: "tidak" }, { id: "b6", label: "catat hasil percobaan", bin: "ya" },
  ],
  [
    { id: "c1", label: "Spectrum Scale", bin: "ya" }, { id: "c2", label: "ujung kiri mustahil", bin: "ya" }, { id: "c3", label: "skala hanya untuk cuaca", bin: "tidak" },
    { id: "c4", label: "Qualitative Language", bin: "ya" }, { id: "c5", label: "pasti = peluang 0", bin: "tidak" }, { id: "c6", label: "Relative Frequency", bin: "ya" },
  ],
];
export const RONDE_PASANG_CA: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "tidak mungkin", kanan: "peluang 0" }, { kiri: "pasti", kanan: "selalu terjadi" },
    { kiri: "Spectrum Scale", kanan: "5 tangga" }, { kiri: "hijau 0", kanan: "tidak mungkin" },
  ],
  [
    { kiri: "merah 6/10", kanan: "sangat mungkin" }, { kiri: "kuning 1/10", kanan: "kurang mungkin" },
    { kiri: "dadu semua 5", kanan: "pasti 5" }, { kiri: "koin", kanan: "2 sisi" },
  ],
  [
    { kiri: "prediksi", kanan: "sebelum percobaan" }, { kiri: "frekuensi", kanan: "hasil dicatat" },
    { kiri: "Continuum", kanan: "0 ↔ pasti" }, { kiri: "bahasa kualitatif", kanan: "kurang/mungkin/sangat" },
  ],
];
export const RONDE_MEMORI_CA = RONDE_PASANG_CA;
export const RONDE_KETUK_CA: { item: number[]; tanya: number[] }[] = [
  { item: [0, 1, 2, 5, 6, 10], tanya: [0, 5] },
  { item: [1, 2, 6, 8, 10, 3], tanya: [2, 6] },
  { item: [0, 3, 6, 1, 10, 5], tanya: [0, 10] },
];
export const RONDE_SEMUA_CA: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri skala peluang benar", item: [
    { id: "a", label: "lima tangga", cocok: true }, { id: "b", label: "0 = tidak mungkin", cocok: true }, { id: "c", label: "pasti = kadang", cocok: false }, { id: "d", label: "pakai bukti/jumlah", cocok: true },
  ]},
  { label: "fakta contoh A", item: [
    { id: "a", label: "merah 6 sangat mungkin", cocok: true }, { id: "b", label: "hijau 0 tidak mungkin", cocok: true }, { id: "c", label: "abaikan data OK", cocok: false }, { id: "d", label: "dadu semua 5 = pasti", cocok: true },
  ]},
  { label: "metode luar A", item: [
    { id: "a", label: "Likelihood Spectrum", cocok: true }, { id: "b", label: "Impossible-Certain", cocok: true }, { id: "c", label: "Fair Game saja", cocok: false }, { id: "d", label: "Relative Frequency", cocok: true },
  ]},
];
export const RONDE_CERITA_CA: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Dhien bilang peluang menangnya nol. Apakah otomatis tidak mungkin?", jawab: "belum tentu; nol perlu bukti", opsi: ["belum tentu; nol perlu bukti", "ya, selalu nol", "pasti menang"], pesan: "Bahasa peluang." },
    { teks: "Rak: 6 merah, 3 putih, 1 kuning. Warna paling mungkin?", jawab: "merah", opsi: ["merah", "kuning", "hijau"], pesan: "Terbanyak." },
  ],
  [
    { teks: "Dadu 8 sisi semua bertuliskan 5. Peluang keluar 5?", jawab: "pasti", opsi: ["pasti", "tidak mungkin", "kurang mungkin"], pesan: "Semua sisi." },
    { teks: "Sebelum memutar roda, siswa sebaiknya?", jawab: "buat prediksi skala dulu", opsi: ["buat prediksi skala dulu", "langsung putar tanpa pikir", "hapus warna terbanyak"], pesan: "Prediksi." },
  ],
  [
    { teks: "METODE LUAR Experimental Relative Frequency?", jawab: "bandingkan hasil catat dengan prediksi", opsi: ["bandingkan hasil catat dengan prediksi", "abaikan hasil", "satu kali cukup selalu"], pesan: "Percobaan." },
    { teks: "Data tsunami 0 di wilayah itu pada tabel artinya?", jawab: "tidak mungkin menurut data", opsi: ["tidak mungkin menurut data", "pasti tsunami", "sangat mungkin"], pesan: "Bukti." },
  ],
];
export const RONDE_URUT_CA: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [0, 6, 1, 3], dari: "kecil" },
  { angka: [10, 2, 6, 0], dari: "besar" },
  { angka: [1, 8, 2, 5], dari: "kecil" },
];
export const RONDE_HITUNG_PA = RONDE_HITUNG_CA;
export const RONDE_ARTI_PA = RONDE_ARTI_CA;
export const RONDE_PASANG_PA = RONDE_PASANG_CA;
export const RONDE_MEMORI_PA = RONDE_MEMORI_CA;
export const RONDE_SORTIR_PA = RONDE_SORTIR_CA;
export const RONDE_SEMUA_PA = RONDE_SEMUA_CA;
export const RONDE_CERITA_PA = RONDE_CERITA_CA;
export const RONDE_TABEL_PA: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "0 bola hijau", jawab: "tidak mungkin", opsi: ["tidak mungkin", "pasti", "sangat mungkin"], pesan: "Nol." },
    { baris: "semua sisi 5", jawab: "pasti", opsi: ["pasti", "kurang mungkin", "tidak mungkin"], pesan: "Semua." },
  ],
  [
    { baris: "6 dari 10 merah", jawab: "sangat mungkin", opsi: ["sangat mungkin", "tidak mungkin", "pasti"], pesan: "Mayoritas." },
    { baris: "1 dari 10 kuning", jawab: "kurang mungkin", opsi: ["kurang mungkin", "pasti", "sangat mungkin"], pesan: "Sedikit." },
  ],
  [
    { baris: "koin gambar", jawab: "mungkin", opsi: ["mungkin", "tidak mungkin", "pasti"], pesan: "1 dari 2." },
    { baris: "Spectrum Scale", jawab: "5 tangga", opsi: ["5 tangga", "2 tangga", "10 tangga"], pesan: "Metode." },
  ],
];
export const RONDE_BENARSALAH_QA: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Peluang selalu hanya ya atau tidak.", benar: false, penjelasan: "Ada spektrum lima tangga." },
    { teks: "Jumlah nol mendukung tidak mungkin.", benar: true, penjelasan: "Impossible ujung kiri." },
    { teks: "Prediksi sebaiknya sebelum percobaan.", benar: true, penjelasan: "Lalu bandingkan." },
  ],
  [
    { teks: "Dadu semua sisi sama = pasti sisi itu.", benar: true, penjelasan: "Certain." },
    { teks: "Satu putaran selalu sama dengan prediksi.", benar: false, penjelasan: "Perlu banyak data." },
    { teks: "Qualitative Language memakai kata mungkin.", benar: true, penjelasan: "Bahasa peluang." },
  ],
];
export const RONDE_DETEKTIF_QA: { klue: string[]; opsi: string[]; jawab: string; salah: string }[] = [
  { klue: ["Rak 10 buku", "6 merah", "tidak ada hijau"], opsi: ["hijau tidak mungkin; merah sangat mungkin", "hijau pasti", "merah tidak mungkin"], jawab: "hijau tidak mungkin; merah sangat mungkin", salah: "Hitung jumlah." },
  { klue: ["Dadu 8 sisi", "semua tertulis 5"], opsi: ["keluar 5 pasti", "keluar 5 tidak mungkin", "keluar 1 pasti"], jawab: "keluar 5 pasti", salah: "Semua sisi." },
  { klue: ["Roda: merah 3 bagian, biru 1"], opsi: ["merah lebih mungkin dari biru", "biru pasti", "merah tidak mungkin"], jawab: "merah lebih mungkin dari biru", salah: "Area." },
];
export const PETA_KONSEP_QA = [{
  pusat: "Skala Peluang",
  kotak: [
    { label: "Tangga", opsi: ["5 tangga", "2 tangga saja", "10 tangga"], benar: 0 },
    { label: "Bukti", opsi: ["bukti/jumlah", "abaikan data", "tebakan kosong"], benar: 0 },
    { label: "Uji", opsi: ["uji percobaan", "jangan catat", "hapus prediksi"], benar: 0 },
    { label: "Metode luar", opsi: ["Spectrum / Continuum / Frequency", "Fair Game saja", "Manhattan saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QA = RONDE_CERITA_CA;

// ========== B · Membandingkan ==========
export const RONDE_HITUNG_CB: { derajat: number; hasil: number; pesan: string; tanya?: string }[][] = [
  [
    { derajat: 1, hasil: 2, pesan: "Koin: 2 sisi total.", tanya: "Total sisi koin?" },
    { derajat: 2, hasil: 1, pesan: "Gambar: 1 menguntungkan.", tanya: "Favorable gambar?" },
  ],
  [
    { derajat: 3, hasil: 6, pesan: "Dadu biasa 6 sisi.", tanya: "Total sisi dadu 6?" },
    { derajat: 4, hasil: 1, pesan: "Angka 6: 1 sisi.", tanya: "Favorable angka 6?" },
  ],
  [
    { derajat: 5, hasil: 7, pesan: "Kotak Mantap total 7.", tanya: "Total bola Mantap?" },
    { derajat: 6, hasil: 4, pesan: "4 biru di Mantap.", tanya: "Favorable biru Mantap?" },
  ],
];
export const RONDE_RUMUS_CB: { tanya: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { tanya: "Favorable-to-Total Ratio?", jawab: "hasil menguntungkan dibagi total", opsi: ["hasil menguntungkan dibagi total", "total dibagi dua saja", "tambah saja kedua angka"], pesan: "Metode." },
    { tanya: "1/2 dibanding 1/6?", jawab: "1/2 lebih besar", opsi: ["1/2 lebih besar", "1/6 lebih besar", "sama"], pesan: "Koin vs dadu." },
  ],
  [
    { tanya: "Fair Game Equal Chance?", jawab: "peluang tiap pemain sama", opsi: ["peluang tiap pemain sama", "satu pemain selalu unggul", "abaikan syarat"], pesan: "Adil." },
    { tanya: "4/7 dibanding 3/7?", jawab: "4/7 lebih besar", opsi: ["4/7 lebih besar", "3/7 lebih besar", "sama"], pesan: "Mantap." },
  ],
  [
    { tanya: "Comparative Probability Ratio?", jawab: "bandingkan dua rasio peluang", opsi: ["bandingkan dua rasio peluang", "hapus penyebut", "abaikan pembilang"], pesan: "Bandingkan." },
    { tanya: "Peluang lebih besar berarti?", jawab: "lebih mungkin, belum pasti", opsi: ["lebih mungkin, belum pasti", "pasti menang", "mustahil kalah"], pesan: "Relative Decision." },
  ],
];
export const RONDE_SORTIR_CB: { id: string; label: string; bin: "lancip" | "tumpul" }[][] = [
  [
    { id: "a1", label: "syarat sama → adil", bin: "lancip" }, { id: "a2", label: "area merah lebih lebar → kurang adil", bin: "lancip" }, { id: "a3", label: "1/2 < 1/6", bin: "tumpul" },
    { id: "a4", label: "4/7 > 3/7", bin: "lancip" }, { id: "a5", label: "besar = pasti", bin: "tumpul" }, { id: "a6", label: "Favorable/Total", bin: "lancip" },
  ],
  [
    { id: "b1", label: "12 peserta vs 35", bin: "lancip" }, { id: "b2", label: "abaikan total", bin: "tumpul" }, { id: "b3", label: "Fair Game", bin: "lancip" },
    { id: "b4", label: "syarat beda otomatis adil", bin: "tumpul" }, { id: "b5", label: "Relative Decision", bin: "lancip" }, { id: "b6", label: "3/7 > 4/7", bin: "tumpul" },
  ],
  [
    { id: "c1", label: "koin unggul vs dadu 6", bin: "lancip" }, { id: "c2", label: "kurang adil = peluang beda", bin: "lancip" }, { id: "c3", label: "rasio tidak perlu", bin: "tumpul" },
    { id: "c4", label: "Comparative Ratio", bin: "lancip" }, { id: "c5", label: "pasti dari 4/7", bin: "tumpul" }, { id: "c6", label: "hitung dulu", bin: "lancip" },
  ],
];
export const RONDE_PASANG_CB: { kiri: string; kanan: string }[][] = [
  [
    { kiri: "koin gambar", kanan: "1/2" }, { kiri: "dadu angka 6", kanan: "1/6" },
    { kiri: "Mantap biru", kanan: "4/7" }, { kiri: "Spektakuler biru", kanan: "3/7" },
  ],
  [
    { kiri: "adil", kanan: "peluang sama" }, { kiri: "kurang adil", kanan: "peluang beda" },
    { kiri: "Favorable-to-Total", kanan: "untung/total" }, { kiri: "Comparative", kanan: "A vs B" },
  ],
  [
    { kiri: "12 peserta", kanan: "peluang relatif lebih besar" }, { kiri: "35 peserta", kanan: "peluang relatif lebih kecil" },
    { kiri: "Relative Decision", kanan: "pilih yang unggul" }, { kiri: "besar ≠ pasti", kanan: "masih bisa kalah" },
  ],
];
export const RONDE_MEMORI_CB = RONDE_PASANG_CB;
export const RONDE_KETUK_CB: { item: number[]; tanya: number[] }[] = [
  { item: [1, 2, 3, 4, 6, 7], tanya: [1, 2] },
  { item: [1, 6, 3, 7, 4, 2], tanya: [4, 7] },
  { item: [12, 35, 27, 7, 4, 3], tanya: [4, 3] },
];
export const RONDE_SEMUA_CB: { label: string; item: { id: string; label: string; cocok: boolean }[] }[] = [
  { label: "ciri banding peluang benar", item: [
    { id: "a", label: "hitung untung/total", cocok: true }, { id: "b", label: "bandingkan rasio", cocok: true }, { id: "c", label: "besar = pasti", cocok: false }, { id: "d", label: "adil bila sama", cocok: true },
  ]},
  { label: "fakta buku B", item: [
    { id: "a", label: "4/7 > 3/7", cocok: true }, { id: "b", label: "1/2 > 1/6", cocok: true }, { id: "c", label: "syarat beda selalu adil", cocok: false }, { id: "d", label: "12 peserta lebih longgar dari 35", cocok: true },
  ]},
  { label: "metode luar B", item: [
    { id: "a", label: "Comparative Ratio", cocok: true }, { id: "b", label: "Fair Game", cocok: true }, { id: "c", label: "Spectrum saja", cocok: false }, { id: "d", label: "Relative Decision", cocok: true },
  ]},
];
export const RONDE_CERITA_CB: { teks: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { teks: "Dhien di kategori 12 peserta vs kalau 35 peserta. Peluang relatif?", jawab: "lebih besar di 12 peserta", opsi: ["lebih besar di 12 peserta", "lebih besar di 35", "sama saja"], pesan: "Comparative." },
    { teks: "Pemain A syarat gambar koin, pemain B syarat sama. Permainan?", jawab: "adil", opsi: ["adil", "kurang adil", "tidak mungkin"], pesan: "Fair Game." },
  ],
  [
    { teks: "Mantap 4 biru/7 vs Spektakuler 3/7. Pilih untuk biru?", jawab: "Mantap", opsi: ["Mantap", "Spektakuler", "sama saja"], pesan: "4/7>3/7." },
    { teks: "Memilih Mantap menjamin dapat biru?", jawab: "tidak, masih bisa tidak biru", opsi: ["tidak, masih bisa tidak biru", "ya pasti biru", "biru mustahil"], pesan: "Besar ≠ pasti." },
  ],
  [
    { teks: "Syarat menang beda dan area merah lebih lebar untuk satu pemain?", jawab: "kurang adil", opsi: ["kurang adil", "adil", "pasti"], pesan: "Peluang beda." },
    { teks: "METODE LUAR Relative Likelihood Decision?", jawab: "pilih opsi peluang relatif lebih besar", opsi: ["pilih opsi peluang relatif lebih besar", "abaikan angka", "selalu pilih yang kecil"], pesan: "Keputusan." },
  ],
];
export const RONDE_URUT_CB: { angka: number[]; dari: "kecil" | "besar" }[] = [
  { angka: [1, 6, 2, 7], dari: "kecil" },
  { angka: [35, 12, 27, 7], dari: "besar" },
  { angka: [3, 4, 1, 2], dari: "besar" },
];
export const RONDE_HITUNG_PB = RONDE_HITUNG_CB;
export const RONDE_RUMUS_PB = RONDE_RUMUS_CB;
export const RONDE_PASANG_PB = RONDE_PASANG_CB;
export const RONDE_MEMORI_PB = RONDE_MEMORI_CB;
export const RONDE_SORTIR_PB = RONDE_SORTIR_CB;
export const RONDE_SEMUA_PB = RONDE_SEMUA_CB;
export const RONDE_CERITA_PB = RONDE_CERITA_CB;
export const RONDE_TABEL_PB: { baris: string; jawab: string; opsi: string[]; pesan: string }[][] = [
  [
    { baris: "gambar koin", jawab: "1/2", opsi: ["1/2", "1/6", "4/7"], pesan: "Favorable/total." },
    { baris: "angka 6 dadu", jawab: "1/6", opsi: ["1/6", "1/2", "3/7"], pesan: "Satu sisi." },
  ],
  [
    { baris: "Mantap biru", jawab: "4/7", opsi: ["4/7", "3/7", "1/2"], pesan: "4 dari 7." },
    { baris: "Spektakuler biru", jawab: "3/7", opsi: ["3/7", "4/7", "1/6"], pesan: "3 dari 7." },
  ],
  [
    { baris: "peluang sama", jawab: "adil", opsi: ["adil", "kurang adil", "pasti"], pesan: "Fair." },
    { baris: "4/7 vs 3/7", jawab: "4/7 lebih besar", opsi: ["4/7 lebih besar", "3/7 lebih besar", "sama"], pesan: "Banding." },
  ],
];
export const RONDE_BENARSALAH_QB: { teks: string; benar: boolean; penjelasan: string }[][] = [
  [
    { teks: "Permainan adil bila peluang tiap pemain sama.", benar: true, penjelasan: "Fair Game." },
    { teks: "1/2 lebih kecil dari 1/6.", benar: false, penjelasan: "1/2 lebih besar." },
    { teks: "Peluang lebih besar menjamin menang.", benar: false, penjelasan: "Belum pasti." },
  ],
  [
    { teks: "4/7 lebih besar dari 3/7.", benar: true, penjelasan: "Pembilang lebih besar, penyebut sama." },
    { teks: "Syarat menang berbeda bisa membuat kurang adil.", benar: true, penjelasan: "Peluang beda." },
    { teks: "Favorable-to-Total tidak perlu total.", benar: false, penjelasan: "Total wajib." },
  ],
];
export const RONDE_DETEKTIF_QB: { klue: string[]; opsi: string[]; jawab: string; salah: string }[] = [
  { klue: ["Koin gambar", "Dadu angka 6", "bandingkan"], opsi: ["koin lebih mungkin", "dadu lebih mungkin", "sama"], jawab: "koin lebih mungkin", salah: "1/2 vs 1/6." },
  { klue: ["Mantap 4 biru/7", "Spektakuler 3/7", "mau biru"], opsi: ["pilih Mantap", "pilih Spektakuler", "sama saja"], jawab: "pilih Mantap", salah: "4/7>3/7." },
  { klue: ["Pemain A area merah lebar", "Pemain B area merah sempit", "syarat warna merah"], opsi: ["kurang adil", "adil sempurna", "tidak mungkin main"], jawab: "kurang adil", salah: "Peluang beda." },
];
export const PETA_KONSEP_QB = [{
  pusat: "Banding Peluang",
  kotak: [
    { label: "Rasio", opsi: ["untung/total", "total saja", "hapus pembilang"], benar: 0 },
    { label: "Adil", opsi: ["adil = sama", "adil = beda", "tanpa syarat"], benar: 0 },
    { label: "Keputusan", opsi: ["besar ≠ pasti", "besar = pasti", "abaikan rasio"], benar: 0 },
    { label: "Metode luar", opsi: ["Comparative / Fair / Relative Decision", "Spectrum saja", "Layer saja"], benar: 0 },
  ],
}];
export const RONDE_CERITA_QB = RONDE_CERITA_CB;
