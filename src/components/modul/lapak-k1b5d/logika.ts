/**
 * Logika murni Kelas 1 Bab 5 Sub-Bab D "Lapak Ikan Dibuka" (membandingkan dan mengurutkan bilangan sampai dua puluh), akhir cerita
 * Akuarium Ikan Hias Abang, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-lapak-k1b5d.mjs. Kata bilangan memakai ulang Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata, kataSepuluh } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "pasang" | "menara" | "garis";
export const URUT_METODE: Metode[] = ["igil", "pasang", "menara", "garis"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: puluhan dulu, lalu satuan",
  pasang: "One-to-One Matching: pasangkan satu-satu",
  menara: "Cube Towers: menara kubus",
  garis: "Number Line Order: urut di garis bilangan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F51F}", pasang: "\u{1F91D}", menara: "\u{1F9F1}", garis: "\u{1F4CF}" };

export type Rupa = "benda" | "diagram" | "lambang";
/** Yang dicari: lebih atau paling banyak, lebih atau paling sedikit. */
export type Tanya = "banyak" | "sedikit";
export type ArahUrut = "naik" | "turun";
export type Posisi = "pertama" | "tengah" | "terakhir";

/* ------------------------------ Langkah soal ------------------------------ */
export type LangkahBanding = { tipe: "banding"; a: number; b: number; tanya: Tanya; jenis: string };
export type LangkahPasang = { tipe: "pasang"; a: number; b: number; tanya: Tanya | "sisa"; jenis: string };
export type LangkahMenara = { tipe: "menara"; isi: [number, number, number]; tanya: Tanya; jenis: string };
export type LangkahUrut = { tipe: "urut"; isi: number[]; arah: ArahUrut; tanya: Posisi; jenis: string };
export type LangkahDasar = LangkahBanding | LangkahPasang | LangkahMenara | LangkahUrut;
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
  return d.tipe === "banding" ? "igil" : d.tipe === "pasang" ? "pasang" : d.tipe === "menara" ? "menara" : "garis";
}

/** Bilangan terurut menurut arah. */
export const urutkan = (isi: readonly number[], arah: ArahUrut): number[] => [...isi].sort((p, q) => (arah === "naik" ? p - q : q - p));
export const indeksPosisi = (p: Posisi, n: number): number => (p === "pertama" ? 0 : p === "terakhir" ? n - 1 : Math.floor(n / 2));
export const puluhan = (n: number): number => Math.floor(n / 10);
export const satuan = (n: number): number => n % 10;
/** Indeks yang paling banyak atau paling sedikit. */
export function indeksPaling(isi: readonly number[], t: Tanya): number {
  const m = t === "banyak" ? Math.max(...isi) : Math.min(...isi);
  return isi.indexOf(m);
}

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih baris (lebih banyak atau lebih sedikit) pada pasangkan satu-satu. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "banding":
      return l.tanya === "banyak" ? Math.max(l.a, l.b) : Math.min(l.a, l.b);
    case "pasang":
      return l.tanya === "sisa" ? Math.abs(l.a - l.b) : null;
    case "menara":
      return l.isi[indeksPaling(l.isi, l.tanya)];
    case "urut": {
      const u = urutkan(l.isi, l.arah);
      return u[indeksPosisi(l.tanya, u.length)];
    }
  }
}
export const angkaJawab = kunciLangkah;
/** Baris yang benar pada pasangkan (nol atas, satu bawah). */
export const barisPasang = (l: { a: number; b: number; tanya: Tanya }): number => ((l.tanya === "banyak") === l.a > l.b ? 0 : 1);
/** Kelompok yang benar pada banding (nol kiri, satu kanan). */
export const sisiBanding = (l: { a: number; b: number; tanya: Tanya }): number => ((l.tanya === "banyak") === l.a > l.b ? 0 : 1);

/** Tiga pilihan di sekitar kunci (nol sampai dua puluh). */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const d = l.tipe === "salah" ? l.dasar : l;
  const calon = d.tipe === "banding" ? [d.a, d.b] : d.tipe === "menara" || d.tipe === "urut" ? [...d.isi] : [k - 1, k + 1];
  if (l.tipe === "salah") calon.unshift(l.jawabTokoh);
  const ada: number[] = [k];
  for (const c of [...calon, k - 1, k + 1, k + 2]) if (ada.length < 3 && c >= 0 && c <= 20 && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Kalimat pembanding dua bilangan dengan puluhan dulu, lalu satuan (tanpa digit). */
export function kalimatBanding(a: number, b: number): string {
  if (a === b) return `${besar(kata(a))} dan ${kata(b)} sama banyak.`;
  const [x, y] = a > b ? [a, b] : [b, a];
  if (puluhan(x) !== puluhan(y))
    return `Puluhannya beda: ${kata(puluhan(x))} puluhan dan ${kata(puluhan(y))} puluhan. ${besar(kata(x))} lebih banyak dari ${kata(y)}.`;
  return `Puluhannya sama. Satuannya ${kata(satuan(x))} dan ${kata(satuan(y))}. ${besar(kata(x))} lebih banyak dari ${kata(y)}.`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const BENDA: Record<Rupa, { kel: string; isi: string; menara: string }> = {
  benda: { kel: "akuarium", isi: "ikan", menara: "menara kubus" },
  diagram: { kel: "kumpulan", isi: "kotak", menara: "menara" },
  lambang: { kel: "bilangan", isi: "bilangan", menara: "bilangan" },
};
const POSISI: Record<Posisi, string> = { pertama: "paling depan", tengah: "di tengah", terakhir: "paling belakang" };
const ARAH: Record<ArahUrut, string> = { naik: "dari yang terkecil", turun: "dari yang terbesar" };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const b = BENDA[rupa];
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
    case "banding":
      if (rupa === "lambang") return `Bandingkan puluhan dulu, lalu satuan. Mana yang lebih ${l.tanya}? ${akhir}`;
      return cara === "kanvas"
        ? `Bandingkan puluhan dulu, lalu satuan. Lingkari ${b.kel} yang lebih ${l.tanya}. ${akhir}`
        : `Bandingkan puluhan dulu, lalu satuan. Ketuk ${b.kel} yang lebih ${l.tanya}. ${akhir}`;
    case "pasang":
      if (l.tanya === "sisa")
        return cara === "kanvas"
          ? `Garis pasangan sudah dibuat. Beri tanda pada tiap ${b.isi} yang tidak punya pasangan. ${akhir}`
          : rupa === "lambang"
            ? `Pasangkan satu-satu. Berapa yang tidak punya pasangan? ${akhir}`
            : `Ketuk ${b.isi} di baris atas satu per satu untuk memindahkannya ke pasangannya. Berapa sisanya? ${akhir}`;
      if (cara === "kanvas" && rupa === "lambang") return `Pasangkan satu-satu dalam pikiranmu. Lingkari bilangan yang lebih ${l.tanya}.`;
      if (cara === "kanvas") return `Pasangkan satu-satu. Baris yang punya sisa lebih banyak. Lingkari kartu baris yang lebih ${l.tanya}.`;
      return rupa === "lambang"
        ? `Pasangkan satu-satu dalam pikiranmu. Ketuk bilangan yang lebih ${l.tanya}.`
        : `Ketuk ${b.isi} di baris atas satu per satu untuk memindahkannya ke pasangannya. Lalu ketuk kartu baris yang lebih ${l.tanya}.`;
    case "menara":
      if (rupa === "lambang") return `Mana yang paling ${l.tanya}? ${akhir}`;
      return cara === "kanvas" ? `Bandingkan tinggi tiap ${b.menara}. Lingkari yang paling ${l.tanya}. ${akhir}` : `Bandingkan tinggi tiap ${b.menara}. Ketuk yang paling ${l.tanya}. ${akhir}`;
    case "urut":
      if (cara === "kanvas") return `Urutkan ${ARAH[l.arah]} dalam pikiranmu. Lingkari bilangan yang ${POSISI[l.tanya]}. ${akhir}`;
      return `Pindahkan tiap ${rupa === "benda" ? "akuarium" : "kartu"} ${ARAH[l.arah]}. Bilangan mana yang ${POSISI[l.tanya]}? ${akhir}`;
  }
}

/* ------------------------------ Simulasi Lapak Ikan ------------------------------ */
export type AkuariumSim = { id: string; nama: string; jenis: string; isi: number };
export type PembeliSim = { id: string; nama: string; ikon: string; mau: number };
export type ModeLapak = "pasang" | "tanda" | "urut" | "layani";
export type KeadaanLapak = {
  alat: "lapak";
  mode: ModeLapak;
  /** Dua akuarium yang dipasangkan dan banyak pasangan yang sudah dibuat. */
  kiri: string | null;
  kanan: string | null;
  dipasang: number;
  /** Banyak pemasangan yang tuntas dengan sisa dan tanpa sisa. */
  pasangTuntas: number;
  samaTuntas: number;
  penanda: Tanya;
  palingBanyak: string | null;
  palingSedikit: string | null;
  /** Akuarium yang sudah dipindahkan ke rak lapak, berurutan. */
  urutan: string[];
  urutNaik: boolean;
  urutTurun: boolean;
  /** Akuarium yang melayani tiap pembeli (urut antrean). */
  layani: (string | null)[];
  buka: boolean;
};

export const awalLapak = (pembeli: readonly PembeliSim[]): KeadaanLapak => ({
  alat: "lapak",
  mode: "pasang",
  kiri: null,
  kanan: null,
  dipasang: 0,
  pasangTuntas: 0,
  samaTuntas: 0,
  penanda: "banyak",
  palingBanyak: null,
  palingSedikit: null,
  urutan: [],
  urutNaik: false,
  urutTurun: false,
  layani: pembeli.map(() => null),
  buka: false,
});

const isiDari = (d: readonly AkuariumSim[], id: string | null): number => d.find((x) => x.id === id)?.isi ?? 0;
export const pilihMode = (k: KeadaanLapak, mode: ModeLapak): KeadaanLapak => ({ ...k, mode });

/** Pilih akuarium untuk dipasangkan: pertama kiri, kedua kanan; bila keduanya sudah terisi, mulai lagi dari kiri. */
export function pilihPasang(k: KeadaanLapak, id: string): KeadaanLapak {
  if (k.kiri === null || (k.kiri !== null && k.kanan !== null)) return { ...k, kiri: id, kanan: null, dipasang: 0 };
  if (id === k.kiri) return { ...k, kiri: null, dipasang: 0 };
  return { ...k, kanan: id, dipasang: 0 };
}
export const batasPasang = (k: KeadaanLapak, d: readonly AkuariumSim[]): number => Math.min(isiDari(d, k.kiri), isiDari(d, k.kanan));
export const sisaPasang = (k: KeadaanLapak, d: readonly AkuariumSim[]): number => Math.abs(isiDari(d, k.kiri) - isiDari(d, k.kanan));
/** Buat satu pasangan lagi. Saat semua pasangan dibuat, pemasangan tercatat tuntas. */
export function pasangSatu(k: KeadaanLapak, d: readonly AkuariumSim[]): KeadaanLapak {
  if (k.kiri === null || k.kanan === null) return k;
  const batas = batasPasang(k, d);
  if (k.dipasang >= batas) return k;
  const dipasang = k.dipasang + 1;
  if (dipasang < batas) return { ...k, dipasang };
  const sama = sisaPasang(k, d) === 0;
  return { ...k, dipasang, pasangTuntas: sama ? k.pasangTuntas : k.pasangTuntas + 1, samaTuntas: sama ? k.samaTuntas + 1 : k.samaTuntas };
}
export const gantiPenanda = (k: KeadaanLapak, p: Tanya): KeadaanLapak => ({ ...k, penanda: p });
export const tandai = (k: KeadaanLapak, id: string): KeadaanLapak => (k.penanda === "banyak" ? { ...k, palingBanyak: id } : { ...k, palingSedikit: id });
/** Akuarium yang benar-benar paling banyak dan paling sedikit. */
export function palingSim(d: readonly AkuariumSim[]): { banyak: string; sedikit: string } {
  const isi = d.map((x) => x.isi);
  return { banyak: d[indeksPaling(isi, "banyak")].id, sedikit: d[indeksPaling(isi, "sedikit")].id };
}

/** Pindahkan satu akuarium ke rak lapak. Saat semua sudah dipindahkan, urutannya diperiksa. */
export function taruhUrut(k: KeadaanLapak, id: string, d: readonly AkuariumSim[]): KeadaanLapak {
  if (k.urutan.includes(id) || !d.some((x) => x.id === id)) return k;
  const urutan = [...k.urutan, id];
  if (urutan.length < d.length) return { ...k, urutan };
  const isi = urutan.map((u) => isiDari(d, u));
  const naik = isi.every((v, i) => i === 0 || isi[i - 1] <= v);
  const turun = isi.every((v, i) => i === 0 || isi[i - 1] >= v);
  return { ...k, urutan, urutNaik: k.urutNaik || naik, urutTurun: k.urutTurun || turun };
}
export const ulangUrut = (k: KeadaanLapak): KeadaanLapak => ({ ...k, urutan: [] });
/** Susunan sekarang sudah urut (naik, turun, atau belum lengkap). */
export function arahSusunan(k: KeadaanLapak, d: readonly AkuariumSim[]): ArahUrut | null {
  if (k.urutan.length < d.length) return null;
  const isi = k.urutan.map((u) => isiDari(d, u));
  if (isi.every((v, i) => i === 0 || isi[i - 1] <= v)) return "naik";
  if (isi.every((v, i) => i === 0 || isi[i - 1] >= v)) return "turun";
  return null;
}

export type HasilLayani = "cukup" | "kurang" | "dipakai" | "habis";
/** Layani pembeli paling depan yang belum dilayani dengan satu akuarium. Akuarium cukup bila isinya sama banyak atau lebih banyak dari pesanan. */
export function layaniPembeli(k: KeadaanLapak, id: string, d: readonly AkuariumSim[], p: readonly PembeliSim[]): { k: KeadaanLapak; hasil: HasilLayani; pembeli: number } {
  const i = k.layani.indexOf(null);
  if (i < 0) return { k, hasil: "habis", pembeli: -1 };
  if (k.layani.includes(id)) return { k, hasil: "dipakai", pembeli: i };
  if (isiDari(d, id) < p[i].mau) return { k, hasil: "kurang", pembeli: i };
  return { k: { ...k, layani: k.layani.map((x, j) => (j === i ? id : x)) }, hasil: "cukup", pembeli: i };
}
export const ulangLayani = (k: KeadaanLapak): KeadaanLapak => ({ ...k, layani: k.layani.map(() => null), buka: false });
export const semuaTerlayani = (k: KeadaanLapak): boolean => k.layani.every((x) => x !== null);
/** Masih ada akuarium yang cukup untuk pembeli paling depan. */
export function masihBisa(k: KeadaanLapak, d: readonly AkuariumSim[], p: readonly PembeliSim[]): boolean {
  const i = k.layani.indexOf(null);
  if (i < 0) return true;
  return d.some((x) => !k.layani.includes(x.id) && x.isi >= p[i].mau);
}
export const bukaLapak = (k: KeadaanLapak): KeadaanLapak => (semuaTerlayani(k) ? { ...k, buka: true } : k);
/** Tutup lapak: kembali ke keadaan awal supaya anak bisa bermain lagi (misi yang sudah tercapai tetap tercatat di laporMisi). */
export const tutupLapak = (k: KeadaanLapak, pembeli: readonly PembeliSim[]): KeadaanLapak => (k.buka ? awalLapak(pembeli) : k);

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatLapak(k: KeadaanLapak, d: readonly AkuariumSim[], p: readonly PembeliSim[]): string {
  if (k.buka) return "Lapak ikan Abang resmi buka. Semua pembeli sudah dilayani.";
  if (k.mode === "pasang") {
    if (k.kiri === null) return "Ketuk dua akuarium untuk dipasangkan.";
    if (k.kanan === null) return "Ketuk satu akuarium lagi.";
    const batas = batasPasang(k, d);
    if (k.dipasang < batas) return `Sudah ${kata(k.dipasang)} pasang. Tekan Pasangkan satu.`;
    const s = sisaPasang(k, d);
    return s === 0 ? "Semua berpasangan, tidak ada sisa. Sama banyak." : `Sisa ${kata(s)} ikan tanpa pasangan. ${kalimatBanding(isiDari(d, k.kiri), isiDari(d, k.kanan))}`;
  }
  if (k.mode === "tanda") return `Pilih tanda paling ${k.penanda}, lalu ketuk akuariumnya.`;
  if (k.mode === "urut") {
    const a = arahSusunan(k, d);
    if (k.urutan.length < d.length) return `Sudah ${kata(k.urutan.length)} akuarium di rak lapak.`;
    return a === "naik" ? "Urut dari yang paling sedikit sampai paling banyak." : a === "turun" ? "Urut dari yang paling banyak sampai paling sedikit." : "Belum urut. Tekan Ulang susunan.";
  }
  const i = k.layani.indexOf(null);
  if (i < 0) return "Semua pembeli sudah dilayani. Tekan Buka lapak.";
  return `${p[i].nama} memesan ${kata(p[i].mau)} ikan. Pilih akuarium yang cukup.`;
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
const POSISI_KATA: Record<Posisi, string> = { pertama: "paling depan", tengah: "di tengah", terakhir: "paling belakang" };
const lawan = (t: Tanya): Tanya => (t === "banyak" ? "sedikit" : "banyak");
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  switch (l.tipe) {
    case "banding":
      if (m === l.a || m === l.b) return `${besar(kata(m))} itu yang lebih ${lawan(l.tanya)}. ${kalimatBanding(l.a, l.b)}`;
      return "Hitung lagi: ikatan sepuluh dulu, lalu sisanya satu-satu.";
    case "pasang":
      if (m === l.a || m === l.b) return `${besar(kata(m))} itu banyak satu baris. Hitung hanya yang tidak punya pasangan.`;
      return m < Math.abs(l.a - l.b) ? "Masih ada yang tanpa pasangan belum terhitung. Hitung lagi sisanya satu-satu." : "Yang sudah berpasangan jangan ikut dihitung. Hitung sisanya saja.";
    case "menara":
      if (l.isi.includes(m)) return `${besar(kata(m))} itu bukan menara yang paling ${l.tanya}. Bandingkan lagi tingginya.`;
      return "Hitung lagi kubusnya: sepuluh dulu, lalu sisanya.";
    case "urut": {
      const u = urutkan(l.isi, l.arah);
      const balik = urutkan(l.isi, l.arah === "naik" ? "turun" : "naik");
      const i = indeksPosisi(l.tanya, u.length);
      if (m === balik[i]) return `Itu urutan dari arah sebaliknya. Mulai ${l.arah === "naik" ? "dari yang terkecil" : "dari yang terbesar"}.`;
      if (l.isi.includes(m)) return `${besar(kata(m))} ada di urutan, tetapi bukan yang ${POSISI_KATA[l.tanya]}.`;
      return "Pilih salah satu bilangan yang diurutkan.";
    }
  }
}
