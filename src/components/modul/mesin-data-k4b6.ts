/**
 * Definisi Mesin Bertahap Kelas 4 Bab 6, dijalankan mesin berstasiun mesin-bertahap-k3b1.ts.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data kasus (bilangan bulat).
 *  - MESIN_PIKTOGRAM (A): Skala → Simbol → Nilai → Banding   (mainan Karel, buku dipinjam, siswa per kelas)
 *    Skala: keterangan yang membuat semua simbol utuh dan muat. Simbol: nilai menjadi simbol. Nilai: simbol menjadi
 *    nilai (baris lain). Banding: paling banyak, selisih, atau jumlah. Data ditulis di pertanyaan, tanpa gambar.
 *  - MESIN_BATANG (B): Sumbu → Baca → Banding → Simpulkan   (alat transportasi tegak, buku dipinjam mendatar, siswa per kelas)
 * Pengecoh bersumber dari kesalahan umum: lupa mengalikan skala, salah hitung satu simbol, salah baris, dan jumlah
 * yang dikira selisih. Teks dieja ejaK3 (bilangan dan tanda hitung berspasi), jadi tanpa lambang lain.
 * Data dari Buku Siswa Kelas IV Bab 6 (dicocokkan dengan data-k4b6.ts di uji). Murni: tanpa React, tanpa jaringan.
 * Hanya impor tipe. Diuji di scripts/uji-lab-k4b6.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0 && v !== benar).map(String));
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;

/* ------------------------------ A: Mesin Piktogram ------------------------------ */

export type BarisPikto = { label: string; nilai: number };
export type KasusPikto = {
  id: string;
  judul: string;
  satuan: string;
  skala: number;
  baris: BarisPikto[];
  /** Baris yang digambar di stasiun Simbol. */
  fokus: string;
  /** Baris yang dibaca dari banyak simbolnya di stasiun Nilai. */
  baca: string;
  /** Pertanyaan stasiun Banding. */
  banding: "terbanyak" | "selisih" | "total";
  /** Untuk banding selisih: baris pembanding. */
  lawan?: string;
};

export const KASUS_PIKTO: KasusPikto[] = [
  {
    id: "mainan",
    judul: "mainan Karel",
    satuan: "mainan",
    skala: 1,
    baris: [
      { label: "mobil", nilai: 6 },
      { label: "robot", nilai: 4 },
      { label: "pesawat", nilai: 3 },
      { label: "puzzle", nilai: 1 },
      { label: "kelereng", nilai: 9 },
    ],
    fokus: "kelereng",
    baca: "mobil",
    banding: "terbanyak",
  },
  {
    id: "buku",
    judul: "buku dipinjam",
    satuan: "buku",
    skala: 2,
    baris: [
      { label: "Senin", nilai: 10 },
      { label: "Selasa", nilai: 8 },
      { label: "Rabu", nilai: 14 },
      { label: "Kamis", nilai: 6 },
    ],
    fokus: "Rabu",
    baca: "Kamis",
    banding: "selisih",
    lawan: "Kamis",
  },
  {
    id: "kelas",
    judul: "siswa per kelas",
    satuan: "siswa",
    skala: 4,
    baris: [
      { label: "Kelas 1", nilai: 28 },
      { label: "Kelas 2", nilai: 24 },
      { label: "Kelas 3", nilai: 32 },
      { label: "Kelas 4", nilai: 20 },
      { label: "Kelas 5", nilai: 16 },
      { label: "Kelas 6", nilai: 12 },
    ],
    fokus: "Kelas 2",
    baca: "Kelas 5",
    banding: "total",
  },
];

export const STASIUN_PIKTO: StasiunDef[] = [
  { id: "skala", nama: "Skala", ikon: "🔑" },
  { id: "simbol", nama: "Simbol", ikon: "⚪" },
  { id: "nilai", nama: "Nilai", ikon: "✖️" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
];

/** Keterangan yang bisa dipilih (sama dengan Lab Piktogram) dan batas simbol per baris. */
export const SKALA_CALON = [1, 2, 4];
export const MAKS_SIMBOL_MESIN = 10;
/** Keterangan yang bisa dipakai: semua data habis dibagi dan tiap baris paling banyak 10 simbol. */
export const skalaSah = (k: KasusPikto): number[] => SKALA_CALON.filter((s) => k.baris.every((b) => b.nilai % s === 0 && b.nilai / s <= MAKS_SIMBOL_MESIN));

export function kasusMesinPikto(k: KasusPikto, idx: number): KasusMesin {
  const f = k.baris.find((b) => b.label === k.fokus)!;
  const sim = (b: BarisPikto) => b.nilai / k.skala;
  const urut = [...k.baris].sort((a, b) => b.nilai - a.nilai);
  let banding: LangkahMesin;
  let ringkasBanding: string;
  if (k.banding === "terbanyak") {
    const maks = urut[0];
    const salah = [urut[1].label, urut[urut.length - 1].label];
    banding = {
      stasiun: "banding",
      tanya: `Data ${k.judul}: ${k.baris.map((b) => `${b.label} ada ${b.nilai}`).join(", ")}. Mana yang paling banyak?`,
      opsi: susunOpsi(maks.label, duaPengecoh(maks.label, salah), idx + 3),
      benar: maks.label,
      petunjuk: "Bandingkan banyak simbol tiap baris. Baris dengan simbol paling banyak nilainya paling besar.",
    };
    ringkasBanding = `${kapital(maks.label)} paling banyak.`;
  } else if (k.banding === "selisih") {
    const l = k.baris.find((b) => b.label === k.lawan)!;
    const benar = f.nilai - l.nilai;
    banding = {
      stasiun: "banding",
      tanya: `${kapital(f.label)} ada ${f.nilai} ${k.satuan}, ${l.label} ada ${l.nilai} ${k.satuan}. Berapa selisihnya?`,
      opsi: susunOpsi(String(benar), angkaPengecoh(benar, [sim(f) - sim(l), f.nilai + l.nilai]), idx + 3),
      benar: String(benar),
      petunjuk: `Ubah dulu simbol menjadi nilai, lalu yang banyak dikurangi yang sedikit. Jangan menjumlahkan.`,
    };
    ringkasBanding = `Selisih ${f.label} dan ${l.label} adalah ${f.nilai} − ${l.nilai} = ${benar} ${k.satuan}.`;
  } else {
    const total = k.baris.reduce((a, b) => a + b.nilai, 0);
    const simbolSemua = k.baris.reduce((a, b) => a + sim(b), 0);
    banding = {
      stasiun: "banding",
      tanya: `Piktogram itu punya ${simbolSemua} simbol semuanya. Berapa ${k.satuan} semuanya?`,
      opsi: susunOpsi(String(total), angkaPengecoh(total, [simbolSemua, total - k.skala]), idx + 3),
      benar: String(total),
      petunjuk: `Hitung semua simbol, lalu kalikan dengan ${k.skala}. Satu simbol tidak boleh terlewat.`,
    };
    ringkasBanding = `Semuanya ${simbolSemua} simbol, jadi ${simbolSemua} × ${k.skala} = ${total} ${k.satuan}.`;
  }
  const sah = skalaSah(k);
  const bc = k.baris.find((b) => b.label === k.baca)!;
  const data = k.baris.map((b) => `${b.label} ada ${b.nilai}`).join(", ");
  const langkah: LangkahMesin[] = [
    {
      stasiun: "skala",
      tanya: `Data ${k.judul}: ${data}. Simbol harus utuh dan tiap baris paling banyak ${MAKS_SIMBOL_MESIN} simbol. Satu simbol sebaiknya mewakili berapa ${k.satuan}?`,
      opsi: susunOpsi(String(sah[0]), angkaPengecoh(sah[0], SKALA_CALON), idx),
      benar: String(sah[0]),
      petunjuk: `Bagi tiap data dengan keterangan itu. Semua harus habis dibagi, dan hasilnya paling banyak ${MAKS_SIMBOL_MESIN}.`,
    },
    {
      stasiun: "simbol",
      tanya: `Satu simbol mewakili ${k.skala} ${k.satuan}. Berapa simbol untuk ${f.label}, ${f.nilai} ${k.satuan}?`,
      opsi: susunOpsi(String(sim(f)), angkaPengecoh(sim(f), [k.skala > 1 ? f.nilai : sim(f) + 1, sim(f) + 1, sim(f) - 1]), idx + 1),
      benar: String(sim(f)),
      petunjuk: `Cari berapa kali ${k.skala} sama dengan ${f.nilai}. Banyak simbol sama dengan nilai dibagi skala.`,
    },
    {
      stasiun: "nilai",
      tanya: `Di piktogram itu, baris ${bc.label} punya ${sim(bc)} simbol. Berapa ${k.satuan} ${bc.label}?`,
      opsi: susunOpsi(String(bc.nilai), angkaPengecoh(bc.nilai, [k.skala > 1 ? sim(bc) : bc.nilai + 1, bc.nilai + k.skala, bc.nilai - k.skala]), idx + 2),
      benar: String(bc.nilai),
      petunjuk: `Nilai sama dengan banyak simbol dikali skala. Di sini ${sim(bc)} × ${k.skala}.`,
    },
    banding,
  ];
  return {
    id: k.id,
    nama: `Piktogram ${k.judul}`,
    ringkas: `Satu simbol mewakili ${k.skala} ${k.satuan}. ${kapital(f.label)} digambar ${sim(f)} simbol. ${kapital(bc.label)} ${sim(bc)} simbol, jadi ${sim(bc)} × ${k.skala} = ${bc.nilai} ${k.satuan}. ${ringkasBanding}`,
    langkah,
  };
}

export const MESIN_PIKTOGRAM: DefMesin = {
  id: "mesin-piktogram-k4b6",
  judul: "Mesin Piktogram",
  selesaiId: "mesin-piktogram",
  stasiun: STASIUN_PIKTO,
  kasus: KASUS_PIKTO.map(kasusMesinPikto),
};

/* ------------------------------ B: Mesin Batang ------------------------------ */

export type KasusBatang = {
  id: string;
  judul: string;
  satuan: string;
  namaKategori: string;
  namaNilai: string;
  skala: number;
  arah: "tegak" | "mendatar";
  baris: BarisPikto[];
  /** Batang yang dibaca (ujungnya tepat di garis). */
  fokus: string;
  banding: "tertinggi" | "selisih";
  /** Untuk selisih: dua batang yang dibandingkan. */
  pasang?: [string, string];
};

export const KASUS_BATANG: KasusBatang[] = [
  {
    id: "transport",
    judul: "alat transportasi",
    satuan: "siswa",
    namaKategori: "alat transportasi",
    namaNilai: "banyak siswa",
    skala: 1,
    arah: "tegak",
    baris: [
      { label: "jalan kaki", nilai: 8 },
      { label: "sepeda", nilai: 5 },
      { label: "motor", nilai: 7 },
      { label: "lainnya", nilai: 3 },
    ],
    fokus: "motor",
    banding: "tertinggi",
  },
  {
    id: "buku",
    judul: "buku dipinjam",
    satuan: "buku",
    namaKategori: "hari",
    namaNilai: "banyak buku",
    skala: 2,
    arah: "mendatar",
    baris: [
      { label: "Senin", nilai: 10 },
      { label: "Selasa", nilai: 8 },
      { label: "Rabu", nilai: 14 },
      { label: "Kamis", nilai: 6 },
      { label: "Jumat", nilai: 9 },
      { label: "Sabtu", nilai: 5 },
    ],
    fokus: "Rabu",
    banding: "selisih",
    pasang: ["Senin", "Kamis"],
  },
  {
    id: "kelas",
    judul: "siswa per kelas",
    satuan: "siswa",
    namaKategori: "kelas",
    namaNilai: "banyak siswa",
    skala: 4,
    arah: "tegak",
    baris: [
      { label: "Kelas 1", nilai: 28 },
      { label: "Kelas 2", nilai: 24 },
      { label: "Kelas 3", nilai: 32 },
      { label: "Kelas 4", nilai: 20 },
      { label: "Kelas 5", nilai: 16 },
      { label: "Kelas 6", nilai: 12 },
    ],
    fokus: "Kelas 3",
    banding: "selisih",
    pasang: ["Kelas 1", "Kelas 4"],
  },
];

export const STASIUN_BATANG: StasiunDef[] = [
  { id: "sumbu", nama: "Sumbu", ikon: "📐" },
  { id: "baca", nama: "Baca", ikon: "📏" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "simpulkan", nama: "Simpulkan", ikon: "💬" },
];

export const GARIS_MESIN = 10;

export function kasusMesinBatang(k: KasusBatang, idx: number): KasusMesin {
  const f = k.baris.find((b) => b.label === k.fokus)!;
  const g = f.nilai / k.skala;
  const maks = GARIS_MESIN * k.skala;
  const lawanArah = k.arah === "tegak" ? "mendatar" : "tegak";
  const sumbuTegak = k.arah === "tegak" ? k.namaNilai : k.namaKategori;
  const sumbuDatar = k.arah === "tegak" ? k.namaKategori : k.namaNilai;
  let banding: LangkahMesin;
  let ringkasBanding: string;
  if (k.banding === "tertinggi") {
    const urut = [...k.baris].sort((a, b) => b.nilai - a.nilai);
    const garisSemua = k.baris.map((b) => `${b.label} di garis ke-${b.nilai / k.skala}`).join(", ");
    banding = {
      stasiun: "banding",
      tanya: `Ujung batang: ${garisSemua}. Batang mana yang paling ${k.arah === "tegak" ? "tinggi" : "panjang"}?`,
      opsi: susunOpsi(urut[0].label, duaPengecoh(urut[0].label, [urut[1].label, urut[urut.length - 1].label]), idx + 3),
      benar: urut[0].label,
      petunjuk: "Batang yang ujungnya paling jauh dari nol nilainya paling besar.",
    };
    ringkasBanding = `${kapital(urut[0].label)} paling banyak, ${urut[0].nilai} ${k.satuan}.`;
  } else {
    const [a, b] = k.pasang!.map((l) => k.baris.find((x) => x.label === l)!);
    const benar = Math.abs(a.nilai - b.nilai);
    banding = {
      stasiun: "banding",
      tanya: `Batang ${a.label} sampai ${a.nilai}, batang ${b.label} sampai ${b.nilai}. Berapa selisihnya?`,
      opsi: susunOpsi(String(benar), angkaPengecoh(benar, [benar / k.skala, a.nilai + b.nilai, benar + k.skala]), idx + 3),
      benar: String(benar),
      petunjuk: "Selisih berarti nilai batang yang panjang dikurangi nilai batang yang pendek. Baca nilainya dulu dari sumbu.",
    };
    ringkasBanding = `Selisih ${a.label} dan ${b.label} adalah ${Math.max(a.nilai, b.nilai)} − ${Math.min(a.nilai, b.nilai)} = ${benar} ${k.satuan}.`;
  }
  const langkah: LangkahMesin[] = [
    {
      stasiun: "sumbu",
      tanya: `Diagram batang ${k.arah} ${k.judul}: batangnya ${k.arah === "tegak" ? "naik ke atas" : "memanjang ke samping"}. Apa label sumbu tegaknya?`,
      opsi: susunOpsi(sumbuTegak, duaPengecoh(sumbuTegak, [sumbuDatar, k.judul, "judul diagram"]), idx),
      benar: sumbuTegak,
      petunjuk: "Angka banyak selalu ada di sumbu yang searah batang. Nama kategori ada di sumbu yang lain.",
    },
    {
      stasiun: "baca",
      tanya: `Tiap garis sumbu bernilai ${k.skala}. Ujung batang ${f.label} tepat di garis ke-${g}. Berapa ${k.satuan} pada batang ${f.label}?`,
      opsi: susunOpsi(String(f.nilai), angkaPengecoh(f.nilai, [k.skala > 1 ? g : f.nilai + 1, f.nilai + k.skala, f.nilai - k.skala]), idx + 1),
      benar: String(f.nilai),
      petunjuk: `Nilai sama dengan garis dikali langkah sumbu. Di sini ${g} × ${k.skala}.`,
    },
    banding,
    {
      stasiun: "simpulkan",
      tanya: `Diagram ini diubah menjadi diagram batang ${lawanArah}. Berapa ${k.satuan} pada batang ${f.label} sekarang?`,
      opsi: susunOpsi(String(f.nilai), angkaPengecoh(f.nilai, [maks - f.nilai, k.skala > 1 ? g : f.nilai + 1, f.nilai + k.skala]), idx + 2),
      benar: String(f.nilai),
      petunjuk: "Mengubah arah batang tidak mengubah datanya. Panjang batang tetap menunjukkan nilai yang sama.",
    },
  ];
  return {
    id: k.id,
    nama: `Diagram batang ${k.judul}`,
    ringkas: `Sumbu tegak ${sumbuTegak}, sumbu datar ${sumbuDatar}. ${kapital(f.label)} ${g} garis, jadi ${g} × ${k.skala} = ${f.nilai} ${k.satuan}. ${ringkasBanding} Diubah ${lawanArah}, nilainya tetap.`,
    langkah,
  };
}

export const MESIN_BATANG: DefMesin = {
  id: "mesin-batang-k4b6",
  judul: "Mesin Batang",
  selesaiId: "mesin-batang",
  stasiun: STASIUN_BATANG,
  kasus: KASUS_BATANG.map(kasusMesinBatang),
};

export const SEMUA_MESIN_K4B6 = [MESIN_PIKTOGRAM, MESIN_BATANG];
