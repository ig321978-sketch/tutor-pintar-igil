/**
 * Logika murni Kelas 1 Bab 7 Sub-Bab B "Papan Lantai Rumah Pohon" (mengukur panjang dengan satuan tak baku, tanpa meter dan sentimeter),
 * akhir cerita Rumah Pohon Abang, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-lantai-k1b7b.mjs. Kata bilangan memakai ulang Kelas 1 Bab 5 Sub-Bab A (sampai dua belas dipakai di sini).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "ulang" | "kira" | "petak";
export const URUT_METODE: Metode[] = ["igil", "ulang", "kira", "petak"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: ulangi satuan dari ujung",
  ulang: "Unit Iteration: mengulang satuan",
  kira: "Estimate and Check: kira-kira lalu periksa",
  petak: "Grid Measuring: ukur di kotak-kotak",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{270B}", ulang: "\u{1F501}", kira: "\u{1F50D}", petak: "\u{1F7E9}" };

export type Rupa = "benda" | "diagram" | "lambang";
/** Yang dicari pada pita kertas berpetak. */
export type TanyaPetak = "hitung" | "selisih" | "panjang" | "pendek";

/* ------------------------------ Langkah soal ------------------------------ */
/**
 * Ukur dengan satuan: `panjang` dalam satuan pendek, satuan yang dipakai selebar `k` satuan pendek (alat lebih panjang, angka lebih sedikit).
 * Hasil `panjang / k`. `mode`: "taruh" menaruh banyak satuan rapat, "pindah" memindahkan satu satuan berulang (Unit Iteration).
 * `kira`: perkiraan tokoh, yang dicari selisihnya dengan hasil. `celah`: nomor satuan yang terlewat (hanya untuk gambar Cari kesalahan).
 */
export type LangkahTaruh = { tipe: "taruh"; panjang: number; k: number; satuan: string; benda: string; mode: "taruh" | "pindah"; kira?: number; celah?: number };
/** Dua pita di kertas berpetak (a kotak dan b kotak). `lewat`: kotak pertama terlewat (hanya untuk gambar Cari kesalahan). */
export type LangkahPetak = { tipe: "petak"; a: number; b: number; tanya: TanyaPetak; lewat?: boolean };
export type LangkahDasar = LangkahTaruh | LangkahPetak;
/** Cari kesalahan: seorang tokoh sudah menjawab soal `dasar` dengan salah paham yang umum. */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Metode tiap langkah (Cari kesalahan memakai metode soal dasarnya). */
export function metodeLangkah(l: Langkah): Metode {
  const d = l.tipe === "salah" ? l.dasar : l;
  if (d.tipe === "petak") return "petak";
  return d.kira !== undefined ? "kira" : d.mode === "pindah" ? "ulang" : "igil";
}

/** Banyak satuan yang menutupi benda. */
export const hasilUkur = (l: LangkahTaruh): number => l.panjang / l.k;

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih pita yang lebih panjang atau lebih pendek. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "taruh":
      return l.kira !== undefined ? Math.abs(l.kira - hasilUkur(l)) : hasilUkur(l);
    case "petak":
      return l.tanya === "hitung" ? l.a : l.tanya === "selisih" ? Math.abs(l.a - l.b) : null;
  }
}
export const angkaJawab = kunciLangkah;
/** Pita yang benar pada pilih pita (nol atas, satu bawah). */
export const barisPita = (l: { a: number; b: number; tanya: TanyaPetak }): number => ((l.tanya === "panjang") === l.a > l.b ? 0 : 1);

/** Tiga pilihan di sekitar kunci (satu sampai dua belas). */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 1;
  const d = l.tipe === "salah" ? l.dasar : l;
  const calon: number[] = d.tipe === "taruh" ? [d.panjang, d.kira ?? hasilUkur(d)] : [d.a, d.b];
  if (l.tipe === "salah") calon.unshift(l.jawabTokoh);
  const ada: number[] = [k];
  for (const c of [...calon, k - 1, k + 1, k + 2]) if (ada.length < 3 && c >= 1 && c <= 12 && !ada.includes(c)) ada.push(c);
  for (let n = 1; ada.length < 3 && n <= 12; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const ALAT: Record<Rupa, string> = { benda: "satuan", diagram: "kotak satuan", lambang: "satuan" };
const awalBesar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
    case "taruh": {
      if (rupa === "lambang") {
        if (l.kira !== undefined) return `Perkiraan dan hasil ukur sudah tertulis. Berapa selisihnya? ${akhir}`;
        if (l.mode === "pindah") return `Satu satuan ditaruh, lalu dipindahkan berulang. Berapa satuan menutupi benda? ${akhir}`;
        return l.k > 1 ? `Alat ukur lebih panjang dari satuan pendek. Berapa satuan alat itu menutupi benda? ${akhir}` : `Satuan ditaruh rapat dari ujung. Berapa satuan menutupi benda? ${akhir}`;
      }
      const a = ALAT[rupa];
      if (cara === "kanvas")
        return l.kira !== undefined
          ? `Perkiraan sudah dicatat dan ${a} sudah rapat. Beri tanda pada tiap ${a}, lalu cari selisih perkiraan dan hasil. ${akhir}`
          : `${awalBesar(a)} sudah rapat dari ujung. Beri tanda pada tiap ${a}. ${akhir}`;
      const kerja = l.mode === "pindah" ? `Tekan Pindahkan satu ${a}, dari ujung sampai ujung benda.` : `Tekan Taruh satu ${a}, rapat dari ujung sampai ujung benda.`;
      return l.kira !== undefined ? `Ada perkiraan dulu. ${kerja} Lalu cari selisih perkiraan dan hasil. ${akhir}` : `${kerja} ${akhir}`;
    }
    case "petak":
      if (rupa === "lambang")
        return l.tanya === "hitung"
          ? `Pita dimulai dari ujung kiri kertas berpetak. Berapa kotak yang tertutup? ${akhir}`
          : l.tanya === "selisih"
            ? `Dua pita di kertas berpetak sudah dihitung. Berapa kotak selisihnya? ${akhir}`
            : `Dua pita di kertas berpetak sudah dihitung. ${cara === "kanvas" ? "Lingkari" : "Ketuk"} pita yang lebih ${l.tanya}.`;
      if (l.tanya === "hitung")
        return cara === "kanvas" ? `Beri tanda pada tiap kotak yang tertutup pita, mulai dari ujung kiri. ${akhir}` : `Ketuk kotak pita satu per satu mulai dari ujung kiri. Berapa kotak pita itu? ${akhir}`;
      if (l.tanya === "selisih")
        return cara === "kanvas" ? `Beri tanda pada kotak pita panjang yang lebih dari pita pendek. ${akhir}` : `Ketuk kotak pita panjang yang lebih dari pita pendek. Berapa kotak selisihnya? ${akhir}`;
      return cara === "kanvas" ? `Bandingkan dua pita dari ujung kiri. Lingkari pita yang lebih ${l.tanya}.` : `Bandingkan dua pita dari ujung kiri. Ketuk pita yang lebih ${l.tanya}.`;
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const kunci = kunciLangkah(l) ?? 0;
  if (l.tipe === "taruh") {
    const n = hasilUkur(l);
    if (l.kira !== undefined) {
      if (m === l.kira || m === n) return `${awalBesar(kata(m))} itu perkiraan atau hasil ukurnya, bukan selisihnya. Kurangkan yang besar dengan yang kecil.`;
      return m > kunci ? "Terlalu banyak. Selisih adalah beda dua bilangan, bukan jumlahnya." : "Masih kurang. Hitung lagi beda perkiraan dan hasil ukur.";
    }
    if (l.k > 1 && m === l.panjang) return `${awalBesar(kata(m))} itu banyak satuan pendek. Alat lebih panjang, angkanya lebih sedikit.`;
    if (l.k > 1 && m > n) return "Alat yang lebih panjang menutupi benda dengan angka yang lebih sedikit, bukan lebih banyak.";
    if (m === n - 1) return "Ada satuan yang terlewat. Hitung lagi dari ujung, satu satuan satu hitungan.";
    if (m === n + 1) return "Terlalu banyak satu. Berhenti menghitung di ujung benda.";
    return m > n ? "Terlalu banyak. Hitung lagi satuan yang menutupi benda sampai ujungnya." : "Masih kurang. Hitung lagi satuan yang menutupi benda sampai ujungnya.";
  }
  if (l.tanya === "hitung")
    return m === l.a - 1 ? "Kotak pertama di ujung kiri ikut dihitung. Mulai dari ujung, satu kotak satu hitungan." : m > l.a ? "Terlalu banyak. Hitung kotak yang tertutup pita saja." : "Masih kurang. Hitung semua kotak pita dari ujung kiri.";
  if (m === l.a || m === l.b) return `${awalBesar(kata(m))} itu banyak kotak satu pita. Hitung hanya bagian yang lebih.`;
  return m > kunci ? "Terlalu banyak. Selisih hanya kotak pita panjang yang melewati pita pendek." : "Masih kurang. Hitung semua kotak yang melewati pita pendek.";
}

/** Kalimat hasil ukur untuk suara (tanpa digit). */
export const kalimatUkur = (l: LangkahTaruh): string => `${awalBesar(kata(hasilUkur(l)))} satuan menutupi benda dari ujung sampai ujung.`;

/* ------------------------------ Simulasi Papan Lantai ------------------------------ */
export type AlatSim = "sedotan" | "tongkat";
/** Lebar tiap alat dalam satuan sedotan: tongkat kayu dua kali sedotan. */
export const LEBAR_ALAT: Record<AlatSim, number> = { sedotan: 1, tongkat: 2 };
export const NAMA_ALAT: Record<AlatSim, string> = { sedotan: "sedotan", tongkat: "tongkat kayu" };
export type BendaSim = { id: string; nama: string; ikon: string; panjang: number };
export type ModeLantai = "ukur" | "petak" | "pesan";
export type KeadaanLantai = {
  alat: "lantai";
  mode: ModeLantai;
  benda: string;
  pakai: AlatSim;
  /** Satuan yang sudah ditaruh dan celah yang ditinggalkan pada pengukuran sekarang. */
  dipasang: number;
  celah: number;
  /** Perkiraan (satu sampai dua belas) untuk benda sekarang. */
  kira: number | null;
  /** Pengukuran tuntas tanpa celah: "benda:alat". */
  tuntas: string[];
  /** Banyak pengukuran tuntas yang didahului perkiraan. */
  diperiksa: number;
  celahDicoba: number;
  /** Kertas berpetak: kotak pita merah dan biru, dan pernah ada merah lebih panjang tiga kotak dari biru. */
  merah: number;
  biru: number;
  selisihTiga: boolean;
  /** Alat yang dipakai pada pesanan papan lantai yang sudah dikirim, atau null. */
  pesan: AlatSim | null;
};

export const awalLantai = (benda: string): KeadaanLantai => ({
  alat: "lantai",
  mode: "ukur",
  benda,
  pakai: "sedotan",
  dipasang: 0,
  celah: 0,
  kira: null,
  tuntas: [],
  diperiksa: 0,
  celahDicoba: 0,
  merah: 0,
  biru: 0,
  selisihTiga: false,
  pesan: null,
});

export const pilihModeLantai = (k: KeadaanLantai, mode: ModeLantai): KeadaanLantai => ({ ...k, mode });
export const pilihBendaLantai = (k: KeadaanLantai, id: string): KeadaanLantai => (id === k.benda ? k : { ...k, benda: id, dipasang: 0, celah: 0, kira: null });
export const pilihAlatLantai = (k: KeadaanLantai, a: AlatSim): KeadaanLantai => (a === k.pakai ? k : { ...k, pakai: a, dipasang: 0, celah: 0 });
export const aturKira = (k: KeadaanLantai, n: number): KeadaanLantai => ({ ...k, kira: Math.min(12, Math.max(1, n)) });
/** Banyak tempat satuan yang menutupi benda dengan alat sekarang. */
export const tempatUkur = (k: KeadaanLantai, d: readonly BendaSim[]): number => (d.find((x) => x.id === k.benda)?.panjang ?? 0) / LEBAR_ALAT[k.pakai];
export const ukurSelesai = (k: KeadaanLantai, d: readonly BendaSim[]): boolean => k.dipasang + k.celah >= tempatUkur(k, d);
export const kunciTuntas = (benda: string, a: AlatSim): string => `${benda}:${a}`;
/** Taruh satu satuan. `rapat` false: satuan melompat dan meninggalkan celah (satu tempat terlewat, tidak terhitung). */
export function taruhSatuan(k: KeadaanLantai, d: readonly BendaSim[], rapat: boolean): KeadaanLantai {
  if (ukurSelesai(k, d)) return k;
  const baru: KeadaanLantai = rapat ? { ...k, dipasang: k.dipasang + 1 } : { ...k, celah: k.celah + 1, celahDicoba: k.celahDicoba + 1 };
  if (!ukurSelesai(baru, d) || baru.celah > 0) return baru;
  const kunci = kunciTuntas(baru.benda, baru.pakai);
  return { ...baru, tuntas: baru.tuntas.includes(kunci) ? baru.tuntas : [...baru.tuntas, kunci], diperiksa: baru.kira !== null ? baru.diperiksa + 1 : baru.diperiksa };
}
export const ulangUkur = (k: KeadaanLantai): KeadaanLantai => ({ ...k, dipasang: 0, celah: 0 });
/** Selisih perkiraan dan hasil bila pengukuran selesai tanpa celah, selain itu null. */
export function selisihKira(k: KeadaanLantai, d: readonly BendaSim[]): number | null {
  if (k.kira === null || !ukurSelesai(k, d) || k.celah > 0) return null;
  return Math.abs(k.kira - k.dipasang);
}
/** Tambah atau kurangi kotak pita di kertas berpetak (nol sampai dua belas). */
export function aturPita(k: KeadaanLantai, warna: "merah" | "biru", beda: 1 | -1): KeadaanLantai {
  const n = Math.min(12, Math.max(0, k[warna] + beda));
  const baru: KeadaanLantai = { ...k, [warna]: n };
  return { ...baru, selisihTiga: k.selisihTiga || (baru.biru >= 1 && baru.merah - baru.biru === 3) };
}
export const sudahDiukur = (k: KeadaanLantai, benda: string, a: AlatSim): boolean => k.tuntas.includes(kunciTuntas(benda, a));
/** Kirim pesanan papan lantai: sisi lantai sudah diukur tanpa celah dengan alat itu. */
export const kirimPesanan = (k: KeadaanLantai, a: AlatSim, lantai: string): KeadaanLantai => (sudahDiukur(k, lantai, a) ? { ...k, pesan: a } : k);
export const tutupPesanan = (k: KeadaanLantai): KeadaanLantai => ({ ...k, pesan: null });

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatLantai(k: KeadaanLantai, d: readonly BendaSim[]): string {
  if (k.pesan !== null) return "Pesanan papan dikirim ke Kakek Jaya, lengkap dengan angka dan nama alatnya. Rumah pohon Abang selesai!";
  if (k.mode === "petak")
    return `Pita merah ${kata(k.merah)} kotak, pita biru ${kata(k.biru)} kotak. ${k.merah === k.biru ? "Sama panjang." : k.merah > k.biru ? `Merah lebih panjang ${kata(k.merah - k.biru)} kotak.` : `Biru lebih panjang ${kata(k.biru - k.merah)} kotak.`}`;
  if (k.mode === "pesan") return "Ukur sisi lantai dulu di alat Ukur. Lalu pilih alat dan kirim pesanan papan.";
  if (!ukurSelesai(k, d)) return k.dipasang === 0 && k.celah === 0 ? "Mulai dari ujung. Taruh satu satuan rapat." : `Sudah ${kata(k.dipasang)} satuan.${k.celah > 0 ? " Ada celah di antara satuan, padahal satuan harus rapat. Panjang yang terlewat tidak terhitung. Tekan Ulang ukur." : " Lanjutkan sampai ujung."}`;
  if (k.celah > 0) return "Ada celah di antara satuan. Panjang yang terlewat tidak terhitung. Tekan Ulang ukur.";
  const s = selisihKira(k, d);
  return `Hasilnya ${kata(k.dipasang)} ${NAMA_ALAT[k.pakai]}.${s === null ? "" : s === 0 ? " Perkiraanmu tepat." : ` Selisih dengan perkiraanmu ${kata(s)}.`}`;
}
