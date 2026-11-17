/**
 * Logika murni Kelas 1 Bab 8 Sub-Bab B "Cerita Kesukaan Anak Kampung" (diagram gambar, tabel, dan membandingkan banyak data),
 * akhir cerita Perpustakaan Keliling, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-survei-k1b8b.mjs. Kata bilangan memakai ulang Kelas 1 Bab 5 Sub-Bab A (sampai dua puluh).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata } from "../ikan-k1b5a/logika";

/* ------------------------------ Metode dan rupa ------------------------------ */
/** Metode IGIL = diagram gambar; tiga lainnya metode global: Block Graph, Dot Plot, Bar Graph. Bentuk gambar mengikuti metode. */
export type Metode = "igil" | "balok" | "titik" | "batang";
export const URUT_METODE: Metode[] = ["igil", "balok", "titik", "batang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: diagram gambar",
  balok: "Block Graph: diagram balok",
  titik: "Dot Plot: diagram titik",
  batang: "Bar Graph: diagram batang",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{2B50}", balok: "\u{1F9F1}", titik: "\u{1F535}", batang: "\u{1F4CA}" };
export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Topik survei (berbeda dari Story) ------------------------------ */
export type Jenis = { nama: string; ikon: string };
export type Topik = { nama: string; jenis: Jenis[] };
export const TOPIK: Topik[] = [
  { nama: "Hewan peliharaan", jenis: [{ nama: "kucing", ikon: "\u{1F431}" }, { nama: "ayam", ikon: "\u{1F414}" }, { nama: "ikan", ikon: "\u{1F41F}" }, { nama: "burung", ikon: "\u{1F426}" }] },
  { nama: "Buah kesukaan", jenis: [{ nama: "apel", ikon: "\u{1F34E}" }, { nama: "jeruk", ikon: "\u{1F34A}" }, { nama: "pisang", ikon: "\u{1F34C}" }, { nama: "melon", ikon: "\u{1F348}" }] },
  { nama: "Kendaraan lewat", jenis: [{ nama: "sepeda", ikon: "\u{1F6B2}" }, { nama: "mobil", ikon: "\u{1F697}" }, { nama: "bus", ikon: "\u{1F68C}" }, { nama: "motor", ikon: "\u{1F6F5}" }] },
  { nama: "Bunga di taman", jenis: [{ nama: "matahari", ikon: "\u{1F33B}" }, { nama: "mawar", ikon: "\u{1F339}" }, { nama: "tulip", ikon: "\u{1F337}" }, { nama: "kaktus", ikon: "\u{1F335}" }] },
  { nama: "Olahraga kampung", jenis: [{ nama: "basket", ikon: "\u{1F3C0}" }, { nama: "voli", ikon: "\u{1F3D0}" }, { nama: "tenis", ikon: "\u{1F3BE}" }, { nama: "pingpong", ikon: "\u{1F3D3}" }] },
];
/** Benda pengganti tiap bentuk di Concrete: balok = bata mainan, titik = bulatan berwarna per kolom (jenis lain memakai gambarnya sendiri). */
export const IKON_BALOK = "\u{1F9F1}";
export const IKON_TITIK = ["\u{1F534}", "\u{1F535}", "\u{1F7E2}", "\u{1F7E1}"];

/* ------------------------------ Langkah soal ------------------------------ */
/** Yang ditanyakan: banyak pada satu kolom, selisih dua kolom, jumlah semua, atau kolom yang paling banyak atau paling sedikit (tanpa angka). */
export type Tanya = { j: "banyak"; k: number } | { j: "selisih"; a: number; b: number } | { j: "jumlah" } | { j: "paling"; arah: "banyak" | "sedikit" };
/** Kegiatan Klik: "susun" (tekan tambah di tiap kolom sampai sama dengan catatan) atau "ketuk" (ketuk gambar yang ditanya satu per satu). */
export type Kegiatan = "susun" | "ketuk";
/** Cacat untuk gambar Cari kesalahan: centang ganda satu anak (satu gambar kelebihan) atau gambar renggang sampai tampak setinggi `tinggi`. */
export type Cacat = { j: "dobel"; k: number } | { j: "renggang"; k: number; tinggi: number };
/** Satu diagram: `data` = banyak tiap jenis (satu sampai sembilan, jumlah semua paling banyak delapan belas). */
export type LangkahDiagram = { tipe: "diagram"; bentuk: Metode; topik: number; data: number[]; tanya: Tanya; kegiatan: Kegiatan; cacat?: Cacat };
/** Cari kesalahan: seorang tokoh sudah menjawab langkah `dasar` dengan salah paham yang umum. */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDiagram; tokoh: string; jawabTokoh: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDiagram | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDiagram => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => dasarDari(l).bentuk;
export const jumlahSemua = (data: readonly number[]): number => data.reduce((a, b) => a + b, 0);
export const jenisDari = (d: LangkahDiagram, k: number): Jenis => TOPIK[d.topik].jenis[k];

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih kolom yang paling banyak atau paling sedikit. */
export function kunciLangkah(l: Langkah): number | null {
  const d = dasarDari(l);
  switch (d.tanya.j) {
    case "banyak":
      return d.data[d.tanya.k];
    case "selisih":
      return Math.abs(d.data[d.tanya.a] - d.data[d.tanya.b]);
    case "jumlah":
      return jumlahSemua(d.data);
    case "paling":
      return null;
  }
}
export const angkaJawab = kunciLangkah;

/** Kolom yang benar pada tanya "paling" (nol sampai tiga). */
export function kolomPaling(d: LangkahDiagram): number {
  const arah = d.tanya.j === "paling" ? d.tanya.arah : "banyak";
  const t = arah === "banyak" ? Math.max(...d.data) : Math.min(...d.data);
  return d.data.indexOf(t);
}

/** Yang harus diketuk atau diberi tanda: gambar "kolom:nomor" (nomor dari bawah, mulai nol); untuk jumlah semua satu tanda per kolom "kolom:*". */
export function sasaranKetuk(d: LangkahDiagram): string[] {
  const semua = (k: number, dari: number, sampai: number) => Array.from({ length: Math.max(0, sampai - dari) }, (_, i) => `${k}:${dari + i}`);
  switch (d.tanya.j) {
    case "banyak":
      return semua(d.tanya.k, 0, d.data[d.tanya.k]);
    case "selisih": {
      const [a, b] = [d.data[d.tanya.a], d.data[d.tanya.b]];
      return semua(a > b ? d.tanya.a : d.tanya.b, Math.min(a, b), Math.max(a, b));
    }
    case "jumlah":
      return d.data.map((_, k) => `${k}:*`);
    case "paling":
      return [];
  }
}

/** Tiga pilihan di sekitar kunci (satu sampai dua puluh). */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 1;
  const d = dasarDari(l);
  const calon: number[] = [...d.data, jumlahSemua(d.data) - 1];
  if (l.tipe === "salah") calon.unshift(l.jawabTokoh);
  const ada: number[] = [k];
  for (const c of [...calon, k - 1, k + 1, k + 2]) if (ada.length < 3 && c >= 1 && c <= 20 && !ada.includes(c)) ada.push(c);
  for (let n = 1; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Kalimat (tanpa digit untuk suara) ------------------------------ */
const awalBesar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
/** Pertanyaan tertulis di layar (memuat nama jenis, tanpa digit). */
export function teksTanya(d: LangkahDiagram): string {
  const j = TOPIK[d.topik].jenis;
  switch (d.tanya.j) {
    case "banyak":
      return `Berapa banyak ${j[d.tanya.k].nama}?`;
    case "selisih":
      return `Berapa selisih ${j[d.tanya.a].nama} dan ${j[d.tanya.b].nama}?`;
    case "jumlah":
      return "Berapa jumlah semuanya?";
    case "paling":
      return `Jenis mana yang paling ${d.tanya.arah}?`;
  }
}
/** Kalimat setelah kegiatan selesai (tanpa digit). */
export function kalimatHasil(d: LangkahDiagram): string {
  const j = TOPIK[d.topik].jenis;
  switch (d.tanya.j) {
    case "banyak":
      return `${awalBesar(kata(d.data[d.tanya.k]))} ${j[d.tanya.k].nama} dalam kolom itu.`;
    case "selisih":
      return `Kolom yang lebih tinggi punya ${kata(Math.abs(d.data[d.tanya.a] - d.data[d.tanya.b]))} gambar lebihnya.`;
    case "jumlah":
      return `${awalBesar(kata(jumlahSemua(d.data)))} gambar semuanya.`;
    case "paling":
      return `Betul! Itu kolom yang paling ${d.tanya.arah}.`;
  }
}

const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const BENDA: Record<Rupa, string> = { benda: "benda", diagram: "gambar", lambang: "data" };

/** Abstract hanya memakai kata dan angka: "gambar" menjadi "data", "kolom" menjadi "kartu". */
export function sesuaikan(t: string, rupa: Rupa): string {
  if (rupa !== "lambang") return t;
  return t.replace(/ dari garis bawah/g, "").replace(/gambar/g, "data").replace(/Gambar/g, "Data").replace(/kolom/g, "kartu").replace(/Kolom/g, "Kartu");
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const t = teksTanya(l);
  const paling = l.tanya.j === "paling";
  if (rupa === "lambang") return paling ? `Data sudah tertulis di kartu. ${t} ${cara === "kanvas" ? "Lingkari kartunya." : "Ketuk kartunya."}` : `Data sudah tertulis di kartu. ${t} ${akhir}`;
  const b = BENDA[rupa];
  if (cara === "suara") return paling ? `Lihat ${b} di tiap kolom. ${t} Ketuk kolomnya.` : `Lihat ${b} di tiap kolom. ${t} ${akhir}`;
  if (cara === "kanvas") return paling ? `Bandingkan tinggi tiap kolom. ${t} Lingkari kolomnya.` : `Beri tanda pada tiap ${b} yang ditanya. ${t} ${akhir}`;
  if (paling) return `Bandingkan tinggi tiap kolom. ${t} Ketuk kolomnya.`;
  return l.kegiatan === "susun" ? `Catatan sudah tertulis. Tekan tambah di tiap kolom sampai ${b}nya sama dengan catatan, rapat dari garis bawah. ${t} ${akhir}` : `Ketuk ${b} yang ditanya satu per satu. ${t} ${akhir}`;
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const kunci = kunciLangkah(l) ?? 0;
  const lain = l.data.includes(m);
  switch (l.tanya.j) {
    case "banyak":
      return lain && m !== kunci ? `${awalBesar(kata(m))} itu banyak gambar di kolom yang lain. Hitung kolom yang ditanya saja.` : m > kunci ? "Terlalu banyak. Hitung gambar di satu kolom saja." : "Masih kurang. Hitung semua gambar di kolom itu dari garis bawah.";
    case "selisih":
      if (m === jumlahSemua([l.data[l.tanya.a], l.data[l.tanya.b]])) return "Itu jumlah dua kolom, bukan selisihnya. Kurangkan yang besar dengan yang kecil.";
      if (m === l.data[l.tanya.a] || m === l.data[l.tanya.b]) return `${awalBesar(kata(m))} itu banyak gambar satu kolom. Selisih hanya bagian yang lebih.`;
      return m > kunci ? "Terlalu banyak. Selisih hanya gambar kolom tinggi yang melewati kolom pendek." : "Masih kurang. Hitung semua gambar yang melewati kolom pendek.";
    case "jumlah":
      return lain ? `${awalBesar(kata(m))} itu banyak gambar satu kolom. Jumlah semua adalah semua kolom ditambah.` : m > kunci ? "Terlalu banyak. Ada gambar yang terhitung dua kali." : "Masih kurang. Ada kolom yang belum ikut dihitung.";
    case "paling":
      return "Jawaban kolom, bukan angka. Bandingkan tinggi tiap kolom.";
  }
}

/* ------------------------------ Simulasi Papan Survei ------------------------------ */
/** Anak-anak kampung yang antre di mobil pustaka dan jenis yang dipilih tiap anak (kucing, ayam, ikan, burung). Berbeda dari Story. */
export const ANAK_SIM = 12;
export const JENIS_SIM: readonly Jenis[] = TOPIK[0].jenis;
export const URUTAN_SIM: readonly number[] = [0, 3, 0, 1, 0, 3, 2, 0, 3, 0, 1, 0];
export type ModeSurvei = "tanya" | "tabel" | "diagram" | "banding";
export type KeadaanSurvei = {
  alat: "survei";
  mode: ModeSurvei;
  /** Anak yang sudah ditanya dan dicentang, dan apakah anak berikutnya sudah dipanggil tetapi belum dicentang. */
  ditanya: number;
  menunggu: boolean;
  /** Berapa kali mencoba mencentang dua jawaban untuk satu anak. */
  dobelDicoba: number;
  /** Banyak gambar tiap jenis di diagram buatan anak, dan apakah gambarnya rapat. */
  gambar: number[];
  rapat: boolean;
  renggangDicoba: number;
  mendatar: boolean;
  /** Pernah memakai diagram mendatar dengan data lengkap. */
  mendatarDilihat: boolean;
  /** Dua jenis yang dibandingkan (nol sampai tiga) dan banyak perbandingan dua kolom berbeda yang tuntas. */
  bandingA: number | null;
  bandingB: number | null;
  bandingTuntas: number;
  lapor: boolean;
};

export const awalSurvei = (): KeadaanSurvei => ({
  alat: "survei",
  mode: "tanya",
  ditanya: 0,
  menunggu: false,
  dobelDicoba: 0,
  gambar: [0, 0, 0, 0],
  rapat: true,
  renggangDicoba: 0,
  mendatar: false,
  mendatarDilihat: false,
  bandingA: null,
  bandingB: null,
  bandingTuntas: 0,
  lapor: false,
});

export const pilihModeSurvei = (k: KeadaanSurvei, mode: ModeSurvei): KeadaanSurvei => ({ ...k, mode });
/** Banyak centang tiap jenis dari anak-anak yang sudah dicentang. */
export const tabelSurvei = (k: KeadaanSurvei): number[] => JENIS_SIM.map((_, j) => URUTAN_SIM.slice(0, k.ditanya).filter((x) => x === j).length);
export const semuaDitanya = (k: KeadaanSurvei): boolean => k.ditanya >= ANAK_SIM;
/** Panggil anak berikutnya (bila belum ada yang menunggu dan masih ada antrean). */
export const panggilAnak = (k: KeadaanSurvei): KeadaanSurvei => (k.menunggu || semuaDitanya(k) ? k : { ...k, menunggu: true });
/** Jenis yang dipilih anak yang sedang menunggu, atau null. */
export const pilihanAnak = (k: KeadaanSurvei): number | null => (k.menunggu ? URUTAN_SIM[k.ditanya] : null);
/** Mencentang jenis j untuk anak yang menunggu: benar hanya bila sama dengan pilihannya. Hasil: keadaan baru atau null bila salah. */
export function centangJenis(k: KeadaanSurvei, j: number): KeadaanSurvei | null {
  if (!k.menunggu || URUTAN_SIM[k.ditanya] !== j) return null;
  return { ...k, menunggu: false, ditanya: k.ditanya + 1 };
}
/** Mencoba mencentang dua jawaban untuk satu anak yang baru dicentang: ditolak, tetapi tercatat. */
export const centangGanda = (k: KeadaanSurvei): KeadaanSurvei => (k.ditanya > 0 && !k.menunggu ? { ...k, dobelDicoba: k.dobelDicoba + 1 } : k);
/** Tambah atau kurangi gambar jenis j (nol sampai sembilan). */
export function aturGambar(k: KeadaanSurvei, j: number, beda: 1 | -1): KeadaanSurvei {
  const n = Math.min(9, Math.max(0, k.gambar[j] + beda));
  return { ...k, gambar: k.gambar.map((g, i) => (i === j ? n : g)) };
}
export const aturRapat = (k: KeadaanSurvei, rapat: boolean): KeadaanSurvei => (rapat === k.rapat ? k : { ...k, rapat, renggangDicoba: rapat ? k.renggangDicoba : k.renggangDicoba + 1 });
export const aturMendatar = (k: KeadaanSurvei, mendatar: boolean): KeadaanSurvei => ({ ...k, mendatar, mendatarDilihat: k.mendatarDilihat || (mendatar && diagramBenar(k)) });
/** Diagram buatan anak sama dengan tabel, rapat, dan semua anak sudah ditanya. */
export const diagramBenar = (k: KeadaanSurvei): boolean => semuaDitanya(k) && k.rapat && tabelSurvei(k).every((n, j) => n === k.gambar[j]);
/** Pilih dua jenis untuk dibandingkan; dua jenis berbeda dengan banyak berbeda menuntaskan satu perbandingan. */
export function pilihBanding(k: KeadaanSurvei, j: number): KeadaanSurvei {
  if (k.bandingA === null || (k.bandingA !== null && k.bandingB !== null)) return { ...k, bandingA: j, bandingB: null };
  if (j === k.bandingA) return k;
  const t = tabelSurvei(k);
  const baru = { ...k, bandingB: j };
  return t[k.bandingA] !== t[j] ? { ...baru, bandingTuntas: k.bandingTuntas + 1 } : baru;
}
/** Kirim laporan survei lengkap (tabel dan diagram) kepada Pak Pos. */
export const kirimLaporan = (k: KeadaanSurvei): KeadaanSurvei => (diagramBenar(k) ? { ...k, lapor: true } : k);
export const tutupLaporan = (k: KeadaanSurvei): KeadaanSurvei => ({ ...k, lapor: false });
/** Jenis yang paling banyak dan paling sedikit dipilih (nol sampai tiga). */
export const jenisPaling = (t: readonly number[], arah: "banyak" | "sedikit"): number => t.indexOf(arah === "banyak" ? Math.max(...t) : Math.min(...t));

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatSurvei(k: KeadaanSurvei): string {
  const t = tabelSurvei(k);
  if (k.lapor) return "Laporan survei dikirim kepada Pak Pos, lengkap dengan tabel dan diagram. Perpustakaan Keliling berangkat!";
  if (k.mode === "tanya") {
    if (semuaDitanya(k)) return "Semua anak sudah ditanya dan dicentang. Lihat tabel dan buat diagramnya.";
    if (k.menunggu) return `Anak berikutnya memilih ${JENIS_SIM[URUTAN_SIM[k.ditanya]].nama}. Ketuk jenis itu untuk mencentang.`;
    return k.ditanya === 0 ? "Panggil anak pertama di antrean. Satu anak, satu jawaban." : `Sudah ${kata(k.ditanya)} anak yang ditanya. Panggil anak berikutnya.`;
  }
  if (k.mode === "tabel") return k.ditanya === 0 ? "Tabel masih kosong. Tanyai anak-anak dulu." : `${JENIS_SIM.map((j, i) => `${j.nama} ${kata(t[i])}`).join(", ")}.`;
  if (k.mode === "diagram") {
    if (diagramBenar(k)) return "Diagram sama dengan tabel dan gambarnya rapat. Kirim laporan ke Pak Pos.";
    if (!k.rapat) return "Gambar renggang membuat kolom tampak lebih tinggi. Yang dihitung banyak gambarnya, jadi rapatkan lagi.";
    return semuaDitanya(k) ? "Tambah gambar di tiap kolom sampai sama dengan tabel." : "Tanyai semua anak dulu supaya tabelnya lengkap.";
  }
  if (k.bandingA === null || k.bandingB === null) return "Pilih dua jenis untuk dibandingkan.";
  const [a, b] = [k.bandingA, k.bandingB];
  if (t[a] === t[b]) return `${awalBesar(JENIS_SIM[a].nama)} dan ${JENIS_SIM[b].nama} sama banyak.`;
  const [besar, kecil] = t[a] > t[b] ? [a, b] : [b, a];
  return `${awalBesar(JENIS_SIM[besar].nama)} lebih banyak ${kata(t[besar] - t[kecil])} dari ${JENIS_SIM[kecil].nama}.`;
}
