/**
 * Logika murni Kelas 1 Bab 6 Sub-Bab A "Dua Nampan Kue" (lebih dari, kurang dari, dan selisih), awal cerita Pasar Malam Kampung,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-nampan-k1b6a.mjs. Kata bilangan dan cara menjawab sampai dua puluh memakai ulang Kelas 1 Bab 5 Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata, kataSepuluh } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "batang" | "garis" | "samakan";
export const URUT_METODE: Metode[] = ["igil", "batang", "garis", "samakan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: pasangkan satu-satu",
  batang: "Bar Model: model batang",
  garis: "Number Line Difference: selisih di garis bilangan",
  samakan: "Equalizing: menyamakan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F91D}", batang: "\u{1F4CA}", garis: "\u{1F4CF}", samakan: "\u{2696}\u{FE0F}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
/** Pasangkan satu-satu dua baris: a baris atas, b baris bawah. Yang dicari: selisih, baris yang lebih banyak, atau baris yang lebih sedikit. */
export type TanyaPasang = "selisih" | "lebih" | "kurang";
export type LangkahPasang = { tipe: "pasang"; a: number; b: number; tanya: TanyaPasang; jenis: string; jenis2: string };
/**
 * Model batang. selisih: batang atas a dan batang bawah b, ketuk kotak yang melebihi. tambah: kedua batang mulai sama panjang (a),
 * batang bawah lebihnya (b dikurangi a), jawabannya b. kurang: kedua batang mulai sama panjang (a), batang bawah kurangnya (a dikurangi b), jawabannya b.
 */
export type TanyaBatang = "selisih" | "tambah" | "kurang";
export type LangkahBatang = { tipe: "batang"; a: number; b: number; tanya: TanyaBatang; jenis: string; jenis2: string };
/** Selisih di garis bilangan. selisih: loncat dari bilangan kecil ke besar. maju: mulai dari a, maju sebanyak b dikurangi a, jawaban b. mundur: mulai dari a, mundur sebanyak a dikurangi b, jawaban b. */
export type TanyaGaris = "selisih" | "maju" | "mundur";
export type LangkahGaris = { tipe: "garis"; a: number; b: number; tanya: TanyaGaris; jenis: string };
/** Menyamakan baris atas (a) dan baris bawah (b): tambahkan ke yang sedikit atau ambil dari yang banyak. `angka` false: cukup menyamakan, tanpa jawaban bilangan. */
export type TanyaSamakan = "tambah" | "ambil";
export type LangkahSamakan = { tipe: "samakan"; a: number; b: number; tanya: TanyaSamakan; angka: boolean; jenis: string; jenis2: string };
export type LangkahDasar = LangkahPasang | LangkahBatang | LangkahGaris | LangkahSamakan;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar` dengan salah paham yang umum. Anak memutuskan benar atau salah,
 * memilih alasan yang benar dari tiga, lalu menjawab bilangan yang benar.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Metode tiap langkah (Cari kesalahan memakai metode soal dasarnya). */
export function metodeLangkah(l: Langkah): Metode {
  const d = l.tipe === "salah" ? l.dasar : l;
  return d.tipe === "pasang" ? "igil" : d.tipe === "batang" ? "batang" : d.tipe === "garis" ? "garis" : "samakan";
}

export const selisihAB = (l: { a: number; b: number }): number => Math.abs(l.a - l.b);
/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih baris (lebih atau kurang) dan untuk menyamakan tanpa jawaban bilangan. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "pasang":
      return l.tanya === "selisih" ? selisihAB(l) : null;
    case "batang":
      return l.tanya === "selisih" ? selisihAB(l) : l.b;
    case "garis":
      return l.tanya === "selisih" ? selisihAB(l) : l.b;
    case "samakan":
      return l.angka ? selisihAB(l) : null;
  }
}
export const angkaJawab = kunciLangkah;
/** Baris yang benar pada pasangkan lebih atau kurang (nol atas, satu bawah). */
export const barisPasang = (l: { a: number; b: number; tanya: "lebih" | "kurang" }): number => ((l.tanya === "lebih") === l.a > l.b ? 0 : 1);

/** Jawaban salah yang menggoda: jumlah semuanya (selisih), lebihnya sendiri (tambah dan kurang). */
function jebakan(d: LangkahDasar): number | null {
  const s = selisihAB(d);
  if (d.tipe === "pasang" || (d.tipe === "batang" && d.tanya === "selisih") || (d.tipe === "garis" && d.tanya === "selisih") || d.tipe === "samakan") return d.a + d.b <= 20 ? d.a + d.b : Math.max(d.a, d.b);
  return s;
}

/** Tiga pilihan di sekitar kunci (nol sampai dua puluh), memuat jawaban tokoh bila Cari kesalahan. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const d = l.tipe === "salah" ? l.dasar : l;
  const calon = [l.tipe === "salah" ? l.jawabTokoh : -1, jebakan(d) ?? -1, k + 1, k - 1, k + 2, k - 2];
  const ada: number[] = [k];
  for (const c of calon) if (ada.length < 3 && c >= 0 && c <= 20 && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
/** Kalimat selisih untuk suara (tanpa digit). */
export function kalimatSelisih(a: number, b: number): string {
  if (a === b) return `${besar(kata(a))} dan ${kata(b)} sama banyak. Selisihnya nol.`;
  const [x, y] = a > b ? [a, b] : [b, a];
  return `${besar(kata(x))} lebih banyak dari ${kata(y)}. Lebihnya ${kata(x - y)}, kurangnya ${kata(x - y)}. Selisihnya ${kata(x - y)}.`;
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const ISI: Record<Rupa, { benda: string; deret: string }> = {
  benda: { benda: "benda", deret: "deret benda" },
  diagram: { benda: "titik", deret: "batang" },
  lambang: { benda: "bilangan", deret: "batang" },
};

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const w = ISI[rupa];
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
    case "pasang":
      if (l.tanya === "selisih") {
        if (rupa === "lambang") return `Cari selisih dua bilangan: berapa yang tidak punya pasangan? ${akhir}`;
        return cara === "kanvas"
          ? `Garis pasangan sudah dibuat. Beri tanda pada tiap ${w.benda} yang tidak punya pasangan. ${akhir}`
          : `Ketuk ${w.benda} di baris atas satu per satu untuk memasangkannya dengan baris bawah. Berapa selisihnya? ${akhir}`;
      }
      if (rupa === "lambang") return cara === "kanvas" ? `Pasangkan satu-satu dalam pikiranmu. Lingkari bilangan yang lebih ${l.tanya === "lebih" ? "banyak" : "sedikit"}.` : `Pasangkan satu-satu dalam pikiranmu. Ketuk bilangan yang lebih ${l.tanya === "lebih" ? "banyak" : "sedikit"}.`;
      return cara === "kanvas"
        ? `Pasangkan satu-satu. Baris yang punya sisa lebih banyak. Lingkari kartu baris yang lebih ${l.tanya === "lebih" ? "banyak" : "sedikit"}.`
        : `Ketuk ${w.benda} di baris atas satu per satu untuk memasangkannya. Lalu ketuk kartu baris yang lebih ${l.tanya === "lebih" ? "banyak" : "sedikit"}.`;
    case "batang":
      if (l.tanya === "selisih") {
        if (rupa === "lambang") return `Cari selisih dua batang. ${akhir}`;
        return cara === "kanvas" ? `Kedua ${w.deret} sejajar dari kiri. Beri tanda pada tiap kotak yang melebihi yang pendek. ${akhir}` : `Kedua ${w.deret} sejajar dari kiri. Ketuk tiap ${rupa === "benda" ? "benda" : "kotak"} yang melebihi yang pendek. Berapa selisihnya? ${akhir}`;
      }
      if (l.tanya === "tambah") {
        if (rupa === "lambang") return `Batang pendek ada ${kata(l.a)}, lebihnya ${kata(l.b - l.a)}. Berapa batang panjang? ${akhir}`;
        return `Kedua ${w.deret} sama panjang, ada ${kata(l.a)}. Deret bawah lebihnya ${kata(l.b - l.a)}. Ketuk tempat kosong di ujung deret bawah sebanyak lebihnya. Berapa isi deret bawah? ${akhir}`;
      }
      if (rupa === "lambang") return `Batang panjang ada ${kata(l.a)}, kurangnya ${kata(l.a - l.b)}. Berapa batang pendek? ${akhir}`;
      return `Kedua ${w.deret} sama panjang, ada ${kata(l.a)}. Deret bawah kurangnya ${kata(l.a - l.b)}. Ketuk ${rupa === "benda" ? "benda" : "kotak"} di ujung kanan deret bawah sebanyak kurangnya. Berapa isi deret bawah? ${akhir}`;
    case "garis":
      if (l.tanya === "selisih") {
        if (rupa === "lambang") return `Cari selisih dengan garis bilangan: berapa langkah dari yang kecil ke yang besar? ${akhir}`;
        return cara === "kanvas"
          ? `Beri tanda pada tiap langkah dari bilangan kecil ke bilangan besar. ${akhir}`
          : `Meloncatlah dari bilangan kecil ke bilangan besar, satu langkah tiap ketukan. Berapa langkahnya? ${akhir}`;
      }
      if (rupa === "lambang") return l.tanya === "maju" ? `Mulai dari bilangan pertama, maju ${kata(l.b - l.a)} langkah. Sampai di mana? ${akhir}` : `Mulai dari bilangan pertama, mundur ${kata(l.a - l.b)} langkah. Sampai di mana? ${akhir}`;
      return `Mulai dari bilangan di bendera. Meloncatlah ${l.tanya === "maju" ? `maju ${kata(l.b - l.a)} langkah` : `mundur ${kata(l.a - l.b)} langkah`}, satu langkah tiap ketukan. Sampai di bilangan berapa? ${akhir}`;
    case "samakan":
      if (rupa === "lambang") return l.tanya === "tambah" ? `Samakan dua bilangan dengan menambah yang kecil. Berapa yang ditambahkan? ${akhir}` : `Samakan dua bilangan dengan mengambil dari yang besar. Berapa yang diambil? ${akhir}`;
      if (l.tanya === "tambah")
        return cara === "kanvas"
          ? `Beri tanda pada tiap tempat kosong yang perlu ditambahkan supaya sama banyak. ${akhir}`
          : l.angka
            ? `Ketuk tempat kosong di baris yang lebih sedikit untuk menambahkan satu per satu sampai sama banyak. Berapa yang ditambahkan? ${akhir}`
            : "Ketuk tempat kosong di baris yang lebih sedikit untuk menambahkan satu per satu sampai sama banyak.";
      return `Ketuk ${w.benda} di baris yang lebih banyak untuk mengambilnya satu per satu sampai sama banyak. Berapa yang diambil? ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const s = selisihAB(l);
  const jumlah = l.a + l.b;
  switch (l.tipe) {
    case "pasang":
      if (m === jumlah) return "Itu jumlah semuanya. Selisih artinya beda banyaknya, jadi hitung yang tanpa pasangan saja.";
      if (m === l.a || m === l.b) return `${besar(kata(m))} itu banyak satu baris. Hitung hanya yang tidak punya pasangan.`;
      return m < s ? "Masih ada yang tanpa pasangan belum terhitung. Hitung lagi sisanya satu-satu." : "Yang sudah berpasangan jangan ikut dihitung. Hitung sisanya saja.";
    case "batang":
      if (l.tanya === "selisih") {
        if (m === jumlah) return "Itu jumlah dua batang. Selisih hanya kotak yang melebihi batang pendek.";
        if (m === l.a || m === l.b) return `${besar(kata(m))} itu panjang satu batang. Hitung hanya kotak yang melebihi yang pendek.`;
        return m < s ? "Kotak yang melebihi masih ada yang belum terhitung. Hitung lagi." : "Hanya kotak yang melebihi batang pendek yang dihitung.";
      }
      if (l.tanya === "tambah") return m === l.a ? "Itu panjang batang mula-mula. Tambahkan lebihnya, lalu hitung seluruh kotak batang bawah." : m === s ? "Itu lebihnya saja. Batang bawah adalah batang mula-mula ditambah lebihnya." : "Hitung lagi seluruh isi batang bawah: batang mula-mula ditambah kotak yang kamu tambahkan.";
      return m === l.a ? "Itu panjang batang mula-mula. Kurangi dengan kurangnya, lalu hitung sisa kotak batang bawah." : m === s ? "Itu kurangnya saja. Batang bawah adalah batang mula-mula dikurangi kurangnya." : "Hitung lagi sisa isi batang bawah setelah kotak di ujung kanan diambil.";
    case "garis":
      if (l.tanya === "selisih") {
        if (m === s + 1) return "Yang dihitung adalah langkahnya, bukan bilangan yang dilewati. Hitung lompatannya saja.";
        if (m === l.a || m === l.b) return `${besar(kata(m))} itu salah satu bilangannya. Selisih adalah banyak langkah di antara keduanya.`;
        return "Hitung lagi lompatan dari bilangan kecil ke bilangan besar, satu per satu.";
      }
      return m === l.a ? "Itu tempat mulai. Hitung berapa langkah yang sudah dilompati, lalu lihat tempat berhenti." : m === s ? "Itu banyak langkahnya, bukan tempat berhenti. Lihat bilangan tempat berhenti." : `Hitung lagi lompatannya ${l.tanya === "maju" ? "maju" : "mundur"} dari tempat mulai.`;
    case "samakan":
      if (m === jumlah) return "Itu jumlah semuanya. Yang dihitung hanya yang ditambahkan atau diambil.";
      if (m === l.a || m === l.b) return `${besar(kata(m))} itu banyak satu baris. Hitung hanya yang ditambahkan atau diambil sampai sama banyak.`;
      return "Hitung lagi benda yang ditambahkan atau diambil sampai kedua baris sama banyak.";
  }
}

/* ------------------------------ Simulasi Meja Dua Nampan ------------------------------ */
export type NampanSim = { id: string; nama: string; ikon: string; isi: number };
export type ModeNampan = "pasang" | "samakan" | "batang" | "garis";
export type KeadaanNampan = {
  alat: "nampan";
  mode: ModeNampan;
  /** Dua nampan yang dibandingkan. */
  kiri: string | null;
  kanan: string | null;
  /** Banyak pasangan yang sudah dibuat, dan banyak pemasangan yang tuntas dengan sisa. */
  dipasang: number;
  pasangTuntas: number;
  /** Menyamakan: banyak yang sudah ditambahkan ke nampan yang sedikit atau diambil dari yang banyak, dan banyak yang tuntas sampai sama. */
  tambah: number;
  ambil: number;
  tambahTuntas: number;
  ambilTuntas: number;
  /** Batang: bagian yang melebihi sudah disorot. */
  batangSorot: boolean;
  batangTuntas: number;
  /** Garis bilangan: banyak lompatan dari bilangan kecil dan banyak garis yang tuntas sampai bilangan besar. */
  loncat: number;
  garisTuntas: number;
  /** Banyak jawaban selisih yang tepat. */
  selisihBenar: number;
};

export const awalNampan = (): KeadaanNampan => ({
  alat: "nampan",
  mode: "pasang",
  kiri: null,
  kanan: null,
  dipasang: 0,
  pasangTuntas: 0,
  tambah: 0,
  ambil: 0,
  tambahTuntas: 0,
  ambilTuntas: 0,
  batangSorot: false,
  batangTuntas: 0,
  loncat: 0,
  garisTuntas: 0,
  selisihBenar: 0,
});

const isiDari = (d: readonly NampanSim[], id: string | null): number => d.find((x) => x.id === id)?.isi ?? 0;
export const pilihMode = (k: KeadaanNampan, mode: ModeNampan): KeadaanNampan => ({ ...k, mode });
const ulangKerja = (k: KeadaanNampan): KeadaanNampan => ({ ...k, dipasang: 0, tambah: 0, ambil: 0, batangSorot: false, loncat: 0 });

/** Pilih nampan: pertama kiri, kedua kanan; bila keduanya sudah terisi, mulai lagi dari kiri. Ketuk nampan kiri lagi membatalkan. */
export function pilihNampan(k: KeadaanNampan, id: string): KeadaanNampan {
  if (k.kiri === null || (k.kiri !== null && k.kanan !== null)) return ulangKerja({ ...k, kiri: id, kanan: null });
  if (id === k.kiri) return ulangKerja({ ...k, kiri: null });
  return ulangKerja({ ...k, kanan: id });
}
export const siapDua = (k: KeadaanNampan): boolean => k.kiri !== null && k.kanan !== null;
export const selisihNampan = (k: KeadaanNampan, d: readonly NampanSim[]): number => Math.abs(isiDari(d, k.kiri) - isiDari(d, k.kanan));
export const batasPasang = (k: KeadaanNampan, d: readonly NampanSim[]): number => Math.min(isiDari(d, k.kiri), isiDari(d, k.kanan));
/** Nampan yang lebih sedikit dan yang lebih banyak di antara dua pilihan (null bila sama banyak atau belum dua). */
export function sedikitBanyak(k: KeadaanNampan, d: readonly NampanSim[]): { sedikit: string; banyak: string } | null {
  if (!siapDua(k)) return null;
  const a = isiDari(d, k.kiri);
  const b = isiDari(d, k.kanan);
  if (a === b) return null;
  return a < b ? { sedikit: k.kiri as string, banyak: k.kanan as string } : { sedikit: k.kanan as string, banyak: k.kiri as string };
}

/** Buat satu pasangan lagi. Saat semua pasangan dibuat dan ada sisa, pemasangan tercatat tuntas. */
export function pasangSatu(k: KeadaanNampan, d: readonly NampanSim[]): KeadaanNampan {
  if (!siapDua(k)) return k;
  const batas = batasPasang(k, d);
  if (k.dipasang >= batas) return k;
  const dipasang = k.dipasang + 1;
  if (dipasang < batas) return { ...k, dipasang };
  return { ...k, dipasang, pasangTuntas: selisihNampan(k, d) > 0 ? k.pasangTuntas + 1 : k.pasangTuntas };
}
export const selesaiPasang = (k: KeadaanNampan, d: readonly NampanSim[]): boolean => siapDua(k) && k.dipasang >= batasPasang(k, d);

/** Menyamakan: tambah satu ke nampan yang sedikit. Berganti cara di tengah jalan mengulang dari nol. Tuntas saat sama banyak. */
export function tambahSatu(k: KeadaanNampan, d: readonly NampanSim[]): KeadaanNampan {
  const s = selisihNampan(k, d);
  if (!siapDua(k) || s === 0 || k.tambah >= s || k.ambil >= s) return k;
  const dasar = k.ambil > 0 ? { ...k, ambil: 0, tambah: 0 } : k;
  const tambah = dasar.tambah + 1;
  return { ...dasar, tambah, tambahTuntas: tambah >= s ? dasar.tambahTuntas + 1 : dasar.tambahTuntas };
}
/** Menyamakan: ambil satu dari nampan yang banyak. */
export function ambilSatu(k: KeadaanNampan, d: readonly NampanSim[]): KeadaanNampan {
  const s = selisihNampan(k, d);
  if (!siapDua(k) || s === 0 || k.tambah >= s || k.ambil >= s) return k;
  const dasar = k.tambah > 0 ? { ...k, tambah: 0, ambil: 0 } : k;
  const ambil = dasar.ambil + 1;
  return { ...dasar, ambil, ambilTuntas: ambil >= s ? dasar.ambilTuntas + 1 : dasar.ambilTuntas };
}
export const ulangSamakan = (k: KeadaanNampan): KeadaanNampan => ({ ...k, tambah: 0, ambil: 0 });
export const sudahSama = (k: KeadaanNampan, d: readonly NampanSim[]): boolean => {
  const s = selisihNampan(k, d);
  return siapDua(k) && s > 0 && (k.tambah >= s || k.ambil >= s);
};

/** Batang: sorot kotak yang melebihi. Tercatat tuntas sekali untuk tiap pemilihan nampan yang selisihnya lebih dari nol. */
export function sorotBatang(k: KeadaanNampan, d: readonly NampanSim[]): KeadaanNampan {
  if (!siapDua(k) || k.batangSorot || selisihNampan(k, d) === 0) return k;
  return { ...k, batangSorot: true, batangTuntas: k.batangTuntas + 1 };
}
export const bukaBatang = (k: KeadaanNampan): KeadaanNampan => ({ ...k, batangSorot: false });

/** Garis bilangan: satu lompatan dari bilangan kecil. Tuntas saat sampai bilangan besar. */
export function loncatSatu(k: KeadaanNampan, d: readonly NampanSim[]): KeadaanNampan {
  const s = selisihNampan(k, d);
  if (!siapDua(k) || s === 0 || k.loncat >= s) return k;
  const loncat = k.loncat + 1;
  return { ...k, loncat, garisTuntas: loncat >= s ? k.garisTuntas + 1 : k.garisTuntas };
}
export const ulangLoncat = (k: KeadaanNampan): KeadaanNampan => ({ ...k, loncat: 0 });

/** Jawab selisih: benar bila sama dengan selisih dua nampan yang dipilih. */
export function jawabSelisih(k: KeadaanNampan, d: readonly NampanSim[], n: number): { k: KeadaanNampan; benar: boolean } {
  if (!siapDua(k) || selisihNampan(k, d) === 0) return { k, benar: false };
  if (n !== selisihNampan(k, d)) return { k, benar: false };
  return { k: { ...k, selisihBenar: k.selisihBenar + 1 }, benar: true };
}
/** Tiga pilihan selisih di sekitar selisih sebenarnya (nol sampai dua puluh). */
export function pilihanSelisih(s: number): number[] {
  const ada = [s];
  for (const c of [s + 1, s - 1, s + 2, s - 2]) if (ada.length < 3 && c >= 0 && c <= 20 && !ada.includes(c)) ada.push(c);
  return ada.sort((p, q) => p - q);
}

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatNampan(k: KeadaanNampan, d: readonly NampanSim[]): string {
  const nama = (id: string | null) => d.find((x) => x.id === id)?.nama ?? "";
  if (k.kiri === null) return "Ketuk dua nampan untuk dibandingkan.";
  if (k.kanan === null) return `${nama(k.kiri)} dipilih. Ketuk satu nampan lagi.`;
  const s = selisihNampan(k, d);
  const a = isiDari(d, k.kiri);
  const b = isiDari(d, k.kanan);
  if (k.mode === "pasang") {
    const batas = batasPasang(k, d);
    if (k.dipasang < batas) return `Sudah ${kata(k.dipasang)} pasang. Tekan Pasangkan satu.`;
    return s === 0 ? "Semua berpasangan, tidak ada sisa. Sama banyak, selisihnya nol." : `${kalimatSelisih(a, b)} Pilih selisihnya.`;
  }
  if (s === 0) return "Kedua nampan sama banyak. Pilih dua nampan yang isinya beda.";
  if (k.mode === "samakan") {
    if (sudahSama(k, d)) return k.tambah > 0 ? `Sudah sama banyak. Yang ditambahkan ${kata(k.tambah)}, sama dengan selisihnya.` : `Sudah sama banyak. Yang diambil ${kata(k.ambil)}, sama dengan selisihnya.`;
    return k.tambah + k.ambil === 0 ? "Tambah ke nampan yang sedikit, atau ambil dari nampan yang banyak." : `Sudah ${kata(k.tambah + k.ambil)}. Lanjutkan sampai sama banyak.`;
  }
  if (k.mode === "batang") return k.batangSorot ? `Kotak yang melebihi ada ${kata(s)}. Itu selisihnya.` : "Tekan Sorot selisih untuk melihat kotak yang melebihi.";
  return k.loncat >= s ? `Sampai di bilangan besar setelah ${kata(s)} langkah. Itu selisihnya.` : k.loncat === 0 ? "Tekan Loncat untuk meloncat dari bilangan kecil." : `Sudah ${kata(k.loncat)} langkah.`;
}
