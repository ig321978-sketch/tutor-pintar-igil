import type { JenisBenda } from "./data-8-dasar";

/**
 * Skenario kontekstual Bab 8: "Sekretaris Kelas".
 *
 * Anak menjadi sekretaris kelas yang membantu Bu Guru memutuskan sesuatu dengan data:
 * memilih cara mencari tahu, mengumpulkan jawaban teman, memilih cara menyajikan, menjawab
 * pertanyaan Bu Guru dari data itu, lalu mengambil keputusan. Setiap pilihan punya akibat
 * dalam cerita. Salah pilih tidak menghukum, hanya membuat cerita meminta anak mencoba lagi.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji terpisah di Node.
 */

export type IdAdegan = "mulai" | "cara" | "kumpul" | "sajikan" | "baca" | "putuskan" | "akhir";

export const URUT_ADEGAN: IdAdegan[] = ["mulai", "cara", "kumpul", "sajikan", "baca", "putuskan", "akhir"];

export type CaraSaji = "tabel" | "diagram" | "daftar";

export type KategoriSkenario = { nama: string; jenis: JenisBenda };

export type VarianSkenario = {
  id: string;
  judul: string;
  /** Latar cerita. */
  pembuka: string;
  pertanyaanSurvei: string;
  /** Benda yang dibeli, dipakai dalam kalimat: "buah", "mainan". */
  benda: string;
  kategori: KategoriSkenario[];
  /** Jawaban tiap teman: indeks kategori. */
  teman: number[];
  /** Urutan pilihan pada adegan "cara": indeks ke tiga pilihan baku (supaya jawaban benar tidak selalu di tempat sama). */
  urutCara: [number, number, number];
};

export const VARIAN: VarianSkenario[] = [
  {
    id: "buah",
    judul: "Pesta Buah di Kelas",
    pembuka: "Besok kelas kita mengadakan pesta kecil. Bu Guru ingin membeli buah yang disukai teman-teman supaya tidak ada yang kecewa. Kamu menjadi Sekretaris Kelas. Tugasmu mencari tahu, lalu membantu Bu Guru memutuskan.",
    pertanyaanSurvei: "Kamu suka buah apa?",
    benda: "buah",
    kategori: [
      { nama: "Jeruk", jenis: "jeruk" },
      { nama: "Apel", jenis: "apel" },
      { nama: "Mangga", jenis: "mangga" },
      { nama: "Belimbing", jenis: "belimbing" },
    ],
    // Jeruk 3, Apel 5, Mangga 2, Belimbing 4. Jumlah 14.
    teman: [1, 0, 3, 1, 2, 1, 3, 0, 1, 3, 2, 1, 0, 3],
    urutCara: [0, 1, 2],
  },
  {
    id: "mainan",
    judul: "Mainan untuk Sudut Bermain",
    pembuka: "Kelas kita akan punya sudut bermain baru. Bu Guru ingin membeli mainan yang paling disukai teman-teman. Kamu menjadi Sekretaris Kelas. Tugasmu mencari tahu, lalu membantu Bu Guru memutuskan.",
    pertanyaanSurvei: "Kamu suka mainan apa?",
    benda: "mainan",
    kategori: [
      { nama: "Pesawat", jenis: "pesawat" },
      { nama: "Mobil-mobilan", jenis: "mobil" },
      { nama: "Boneka", jenis: "boneka" },
      { nama: "Bola", jenis: "bola" },
    ],
    // Pesawat 3, Mobil-mobilan 4, Boneka 2, Bola 6. Jumlah 15.
    teman: [3, 1, 0, 3, 3, 2, 1, 3, 0, 1, 3, 2, 3, 1, 0],
    urutCara: [2, 0, 1],
  },
];

export type Adegan = IdAdegan;

export type Skenario = {
  varian: number;
  adegan: IdAdegan;
  dicatat: boolean[];
  saji: CaraSaji | null;
  bacaKe: number;
  umpan: string;
  /** Untuk memberi warna umpan: true = Bu Guru senang, false = ajakan mencoba lagi. */
  umpanBaik: boolean;
  jejak: IdAdegan[];
  /** Berapa kali anak diminta mencoba lagi. Hanya informasi, bukan nilai. */
  percobaanUlang: number;
};

export type PeristiwaSkenario =
  | { t: "LANJUT" }
  | { t: "PILIH"; i: number }
  | { t: "CATAT"; i: number }
  | { t: "JAWAB"; nilai: string }
  | { t: "ULANG" };

export const varianKe = (v: number): VarianSkenario => VARIAN[((v % VARIAN.length) + VARIAN.length) % VARIAN.length];

export function awalSkenario(varian = 0): Skenario {
  const v = varianKe(varian);
  return {
    varian,
    adegan: "mulai",
    dicatat: v.teman.map(() => false),
    saji: null,
    bacaKe: 0,
    umpan: "",
    umpanBaik: true,
    jejak: ["mulai"],
    percobaanUlang: 0,
  };
}

/** Banyak data sebenarnya tiap kategori. */
export function totalSkenario(v: VarianSkenario): number[] {
  return v.kategori.map((_, k) => v.teman.filter((j) => j === k).length);
}

/** Banyak data dari teman yang sudah ditanya. */
export function turusSkenario(s: Skenario): number[] {
  const v = varianKe(s.varian);
  return v.kategori.map((_, k) => v.teman.filter((j, i) => j === k && s.dicatat[i]).length);
}

export function terbanyakTersedikit(v: VarianSkenario): { banyak: number; sedikit: number; nBanyak: number; nSedikit: number } {
  const n = totalSkenario(v);
  const nBanyak = Math.max(...n);
  const nSedikit = Math.min(...n);
  return { banyak: n.indexOf(nBanyak), sedikit: n.indexOf(nSedikit), nBanyak, nSedikit };
}

export type PilihanAdegan = { teks: string };

const CARA_BAKU = [
  "Menebak saja, pasti teman-teman suka yang sama",
  "Bertanya ke dua teman saja",
  "Bertanya ke semua teman, lalu mencatat jawabannya",
];
const CARA_BENAR = 2;

const SAJI_PILIHAN: { teks: string; nilai: CaraSaji | null }[] = [
  { teks: "Tabel", nilai: "tabel" },
  { teks: "Diagram gambar", nilai: "diagram" },
  { teks: "Daftar kalimat", nilai: "daftar" },
  { teks: "Diingat di kepala saja", nilai: null },
];

type JenisPutus = "sama" | "sesuai" | "saja";

/** Tiga cara membeli. Yang sesuai data adalah yang benar. Urutan diputar menurut varian. */
function pilihanPutus(v: VarianSkenario, varian: number): { teks: string; jenis: JenisPutus }[] {
  const n = totalSkenario(v);
  const sesuai = v.kategori.map((c, k) => `${n[k]} ${c.nama.toLowerCase()}`).join(", ");
  const sama = Math.floor(n.reduce((a, b) => a + b, 0) / v.kategori.length);
  const baku: { teks: string; jenis: JenisPutus }[] = [
    { teks: `Membeli ${sama} untuk setiap jenis, sama banyak`, jenis: "sama" },
    { teks: `Membeli ${sesuai}`, jenis: "sesuai" },
    { teks: `Membeli ${v.kategori[terbanyakTersedikit(v).banyak].nama.toLowerCase()} saja`, jenis: "saja" },
  ];
  const putar = ((varian % 3) + 3) % 3;
  return baku.map((_, i) => baku[(i + putar) % baku.length]);
}

/** Daftar pilihan yang tampil pada adegan sekarang (kosong bila adegan bukan pilihan). */
export function pilihanAdegan(s: Skenario): PilihanAdegan[] {
  const v = varianKe(s.varian);
  if (s.adegan === "cara") return v.urutCara.map((i) => ({ teks: CARA_BAKU[i] }));
  if (s.adegan === "sajikan") return SAJI_PILIHAN.map((p) => ({ teks: p.teks }));
  if (s.adegan === "putuskan") return pilihanPutus(v, s.varian).map((p) => ({ teks: p.teks }));
  return [];
}

export type PertanyaanBaca = { teks: string; jawaban: string; opsi: string[] };

/** Tiga pertanyaan Bu Guru dari data. Pilihan jawaban diputar supaya yang benar tidak selalu di tengah. */
export function pertanyaanBaca(s: Skenario): PertanyaanBaca {
  const v = varianKe(s.varian);
  const n = totalSkenario(v);
  const { banyak, sedikit, nBanyak, nSedikit } = terbanyakTersedikit(v);
  const putar = <T>(a: T[], k: number) => a.map((_, i) => a[(i + k) % a.length]);
  const angka = (nilai: number, k: number) => putar([nilai - 1, nilai, nilai + 1].map(String), k);
  const q = s.bacaKe;
  if (q === 0) {
    const k = 1;
    return {
      teks: `Berapa anak yang suka ${v.kategori[k].nama.toLowerCase()}?`,
      jawaban: String(n[k]),
      opsi: angka(n[k], (s.varian + 1) % 3),
    };
  }
  if (q === 1) {
    return {
      teks: `${v.benda[0].toUpperCase()}${v.benda.slice(1)} apa yang paling disukai?`,
      jawaban: v.kategori[banyak].nama,
      opsi: putar(
        v.kategori.map((c) => c.nama),
        (s.varian + 2) % v.kategori.length
      ),
    };
  }
  return {
    teks: `Berapa selisih ${v.kategori[banyak].nama.toLowerCase()} dan ${v.kategori[sedikit].nama.toLowerCase()}?`,
    jawaban: String(nBanyak - nSedikit),
    opsi: angka(nBanyak - nSedikit, s.varian % 3),
  };
}

const NAMA_SAJI: Record<CaraSaji, string> = { tabel: "tabel", diagram: "diagram gambar", daftar: "daftar" };

function ke(s: Skenario, adegan: IdAdegan, umpan: string): Skenario {
  return { ...s, adegan, umpan, umpanBaik: true, jejak: [...s.jejak, adegan] };
}

function ulangi(s: Skenario, umpan: string): Skenario {
  return { ...s, umpan, umpanBaik: false, percobaanUlang: s.percobaanUlang + 1 };
}

/** Satu langkah skenario. Selalu mengembalikan objek baru. */
export function langkahSkenario(s: Skenario, p: PeristiwaSkenario): Skenario {
  const v = varianKe(s.varian);
  switch (p.t) {
    case "LANJUT": {
      if (s.adegan === "mulai") return ke(s, "cara", "");
      if (s.adegan === "kumpul") {
        const sisa = s.dicatat.filter((x) => !x).length;
        if (sisa > 0) return { ...s, umpan: `Masih ada ${sisa} teman yang belum kamu tanya.`, umpanBaik: false };
        return ke(s, "sajikan", "Data sudah lengkap. Sekarang saatnya menunjukkannya kepada Bu Guru.");
      }
      return s;
    }

    case "PILIH": {
      if (s.adegan === "cara") {
        const baku = v.urutCara[p.i];
        if (baku === undefined) return s;
        if (baku === CARA_BENAR) return ke(s, "kumpul", "Betul! Dengan bertanya ke semua teman, datamu lengkap dan adil.");
        return ulangi(
          s,
          baku === 0
            ? "Tebakan belum tentu benar, nanti ada teman yang kecewa. Cari cara yang lebih pasti."
            : "Dua teman belum mewakili seluruh kelas. Ayo tanya lebih banyak teman."
        );
      }
      if (s.adegan === "sajikan") {
        const pilihan = SAJI_PILIHAN[p.i];
        if (!pilihan) return s;
        if (pilihan.nilai === null) return ulangi(s, "Bu Guru tidak bisa melihat yang ada di kepalamu. Tuliskan dulu supaya bisa dibaca.");
        return { ...ke(s, "baca", `Bagus! Bu Guru bisa membaca ${NAMA_SAJI[pilihan.nilai]} itu.`), saji: pilihan.nilai, bacaKe: 0 };
      }
      if (s.adegan === "putuskan") {
        const pilihan = pilihanPutus(v, s.varian)[p.i];
        if (!pilihan) return s;
        if (pilihan.jenis === "sesuai") return ke(s, "akhir", "Semua anak kebagian pilihannya. Pestanya berhasil!");
        const { banyak, sedikit } = terbanyakTersedikit(v);
        const n = totalSkenario(v);
        return ulangi(
          s,
          pilihan.jenis === "sama"
            ? `Yang suka ${v.kategori[banyak].nama.toLowerCase()} ada ${n[banyak]} anak, tetapi mereka kurang kebagian. ${v.kategori[sedikit].nama} malah sisa. Cocokkan dengan datamu.`
            : `Anak yang suka jenis lain tidak kebagian. Ada teman yang kecewa. Beli sesuai data semua jenis.`
        );
      }
      return s;
    }

    case "CATAT": {
      if (s.adegan !== "kumpul") return s;
      if (p.i < 0 || p.i >= v.teman.length || s.dicatat[p.i]) return s;
      return { ...s, umpan: "", umpanBaik: true, dicatat: s.dicatat.map((x, i) => (i === p.i ? true : x)) };
    }

    case "JAWAB": {
      if (s.adegan !== "baca") return s;
      const q = pertanyaanBaca(s);
      if (p.nilai !== q.jawaban) {
        const sumber = s.saji ? NAMA_SAJI[s.saji] : "datanya";
        return ulangi(s, `Hmm, coba lihat ${sumber} itu sekali lagi, lalu jawab.`);
      }
      const berikut = s.bacaKe + 1;
      if (berikut >= 3) return { ...ke(s, "putuskan", "Bu Guru mengangguk: semua pertanyaan terjawab. Sekarang waktunya memutuskan."), bacaKe: berikut };
      return { ...s, bacaKe: berikut, umpan: "Tepat! Pertanyaan berikutnya.", umpanBaik: true };
    }

    case "ULANG":
      if (s.adegan !== "akhir") return s;
      return awalSkenario(s.varian + 1);
  }
}

/** Ucapan Bu Guru pada adegan sekarang. */
export function ceritaAdegan(s: Skenario): string {
  const v = varianKe(s.varian);
  const { banyak, nBanyak } = terbanyakTersedikit(v);
  const total = v.teman.length;
  switch (s.adegan) {
    case "mulai":
      return v.pembuka;
    case "cara":
      return `Bu Guru bertanya: bagaimana cara kita tahu ${v.benda} apa yang disukai teman-teman?`;
    case "kumpul":
      return `Ayo tanyakan ke teman-teman: ${v.pertanyaanSurvei} Ketuk satu per satu, lalu lihat catatanmu.`;
    case "sajikan":
      return "Bu Guru berkata: tolong tunjukkan datanya dengan cara yang mudah dibaca.";
    case "baca":
      return `Bu Guru membaca datamu dan bertanya. ${pertanyaanBaca(s).teks}`;
    case "putuskan":
      return `Uang pesta cukup untuk ${total} ${v.benda}, satu untuk setiap anak. Bagaimana cara membelinya?`;
    case "akhir":
      return `Hebat, Sekretaris Kelas! ${v.kategori[banyak].nama} paling disukai, ${nBanyak} anak. Bu Guru membeli sesuai datamu, dan semua teman senang.`;
  }
}
