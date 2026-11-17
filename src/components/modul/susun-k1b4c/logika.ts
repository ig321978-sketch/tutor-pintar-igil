/**
 * Logika murni Kelas 1 Bab 4 Sub-Bab C "Mainan untuk Festival" (menyusun dan mengurai bentuk bangun), akhir cerita Festival Mainan Kardus,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node:
 * scripts/uji-susun-k1b4c.mjs. Tempel label, kata bilangan, dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export type Metode = "igil" | "tangram" | "balok" | "lidi";
export const URUT_METODE: Metode[] = ["igil", "tangram", "balok", "lidi"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: susun, urai, hitung bagian",
  tangram: "Tangram: gabung keping",
  balok: "Pattern Blocks: balok pola",
  lidi: "Toothpick Shapes: bentuk dari lidi",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9E9}", tangram: "\u{1F537}", balok: "\u{1F7E7}", lidi: "\u{1F962}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Bentuk ------------------------------ */
export type Bentuk = "lengkung" | "segitiga" | "segiempat";
export const URUT_BENTUK: Bentuk[] = ["lengkung", "segitiga", "segiempat"];
export const NAMA_BENTUK: Record<Bentuk, string> = { lengkung: "lengkung", segitiga: "segitiga", segiempat: "segi empat" };
/** Urutan bentuk dalam kalimat hitung (sama dengan urutan Story: segi empat, segitiga, lengkung). */
export const URUT_KALIMAT: Bentuk[] = ["segiempat", "segitiga", "lengkung"];

export type Pt = [number, number];

/** Tiga titik segaris (luas segitiga nol, dengan toleransi kecil). */
export const segaris = (a: Pt, b: Pt, c: Pt): boolean => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) < 1e-9;
/** Titik sudut sungguhan (titik yang segaris dengan tetangganya dibuang). */
export const sudutSungguh = (p: readonly Pt[]): Pt[] => p.filter((t, i) => !segaris(p[(i + p.length - 1) % p.length], t, p[(i + 1) % p.length]));
/** Bentuk poligon dari banyak sudut sungguhannya. */
export function bentukPoligon(p: readonly Pt[]): Bentuk {
  const n = sudutSungguh(p).length;
  if (n === 3) return "segitiga";
  if (n === 4) return "segiempat";
  throw new Error(`poligon ${n} sudut`);
}
/** Luas poligon (rumus tali sepatu). */
export const luas = (p: readonly Pt[]): number => Math.abs(p.reduce((s, t, i) => s + t[0] * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * t[1], 0)) / 2;

/* ------------------------------ Data soal ------------------------------ */
/** Bagian mainan di kanvas 300 x 200: pusat (x, y), lebar w, tinggi h. Segitiga menghadap ke atas (putar 90: ke kanan). */
export type Bagian = { bentuk: Bentuk; jenis: string; x: number; y: number; w: number; h: number; putar?: 0 | 90 | 180 | 270; miring?: boolean };
/** Keping tangram atau balok: titik sudut dalam satuan petak. */
export type Keping = { titik: Pt[]; jenis: string };
export type Balok = "segitiga" | "persegi";
export const BENTUK_BALOK: Record<Balok, Bentuk> = { segitiga: "segitiga", persegi: "segiempat" };
export const NAMA_BALOK: Record<Balok, string> = { segitiga: "segitiga", persegi: "segi empat" };
export const jenisSlot = (s: readonly Pt[]): Balok => (bentukPoligon(s) === "segitiga" ? "segitiga" : "persegi");

export type TanyaUrai = "semua" | Bentuk | { lepas: Bentuk };
export type Langkah =
  /** Metode IGIL: mainan gabungan diurai dengan mengetuk bagiannya, lalu jawab banyak bagian (semua, satu jenis, atau sisa setelah satu jenis dilepas). */
  | { tipe: "urai"; nama: string; bagian: Bagian[]; tanya: TanyaUrai }
  /** Tangram: dua atau tiga keping digabung; pilih bentuk hasilnya (tanpa angka). `gabung` = garis tepi hasil. */
  | { tipe: "gabung"; keping: Keping[]; gabung: Pt[]; tempel: string }
  /** Tangram untuk suara: hitung keping pada gambar tangram (semua atau satu bentuk). */
  | { tipe: "keping"; nama: string; keping: Keping[]; tanya: "semua" | Bentuk }
  /** Pattern Blocks: isi bayangan dengan balok dari baki, lalu jawab banyak balok (semua, satu jenis, atau yang belum terpasang). */
  | { tipe: "balok"; nama: string; slot: Pt[][]; isi: number[]; tanya: "semua" | Balok | "sisa" }
  /** Toothpick Shapes: ketuk garis putus-putus untuk meletakkan lidi; sisi bersama cukup satu lidi. */
  | { tipe: "lidi"; nama: string; bangun: Pt[][] };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/* ------------------------------ Kunci (dihitung dari data) ------------------------------ */
export const bentukKeping = (k: Keping): Bentuk => bentukPoligon(k.titik);
export const banyakBentuk = (bagian: readonly { bentuk: Bentuk }[], b: Bentuk): number => bagian.filter((x) => x.bentuk === b).length;

/** Indeks bagian yang diketuk (diurai) pada soal urai. */
export function sasaranUrai(l: Extract<Langkah, { tipe: "urai" }>): number[] {
  const t = l.tanya;
  return l.bagian.map((b, i) => (t === "semua" || (typeof t === "string" ? b.bentuk === t : b.bentuk === t.lepas) ? i : -1)).filter((i) => i >= 0);
}
/** Indeks bagian yang dihitung untuk jawaban (lepas: yang tersisa). */
export function hitungUrai(l: Extract<Langkah, { tipe: "urai" }>): number[] {
  const t = l.tanya;
  if (typeof t === "object") return l.bagian.map((b, i) => (b.bentuk !== t.lepas ? i : -1)).filter((i) => i >= 0);
  return sasaranUrai(l);
}
export const sasaranKeping = (l: Extract<Langkah, { tipe: "keping" }>): number[] => l.keping.map((k, i) => (l.tanya === "semua" || bentukKeping(k) === l.tanya ? i : -1)).filter((i) => i >= 0);
/** Slot yang diisi anak (yang belum terpasang). */
export const slotKosong = (l: Extract<Langkah, { tipe: "balok" }>): number[] => l.slot.map((_, i) => i).filter((i) => !l.isi.includes(i));
/** Slot yang dihitung untuk jawaban. */
export function sasaranBalok(l: Extract<Langkah, { tipe: "balok" }>): number[] {
  if (l.tanya === "sisa") return slotKosong(l);
  return l.slot.map((s, i) => (l.tanya === "semua" || jenisSlot(s) === l.tanya ? i : -1)).filter((i) => i >= 0);
}
/** Ruas lidi unik (sisi bersama dihitung sekali). */
export function ruasLidi(bangun: readonly Pt[][]): [Pt, Pt][] {
  const ada = new Map<string, [Pt, Pt]>();
  for (const b of bangun)
    b.forEach((p, i) => {
      const q = b[(i + 1) % b.length];
      const [a, c] = p[0] < q[0] || (p[0] === q[0] && p[1] <= q[1]) ? [p, q] : [q, p];
      ada.set(`${a[0]},${a[1]}-${c[0]},${c[1]}`, [a, c]);
    });
  return [...ada.values()];
}
export const sisiBersama = (bangun: readonly Pt[][]): number => bangun.reduce((n, b) => n + b.length, 0) - ruasLidi(bangun).length;

/** Kunci tiap langkah, dihitung dari datanya. Null untuk gabung (jawabannya bentuk). */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "urai":
      return hitungUrai(l).length;
    case "keping":
      return sasaranKeping(l).length;
    case "balok":
      return sasaranBalok(l).length;
    case "lidi":
      return ruasLidi(l.bangun).length;
    case "gabung":
      return null;
  }
}
export const angkaJawab = kunciLangkah;
/** Bentuk hasil gabungan keping, dihitung dari garis tepinya. */
export const bentukGabung = (l: Extract<Langkah, { tipe: "gabung" }>): Bentuk => bentukPoligon(l.gabung);

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Kalimat hitung (layar: angka dan tanda + −) ------------------------------ */
const daftarKata = (bagian: readonly { bentuk: Bentuk }[]) => URUT_KALIMAT.filter((b) => banyakBentuk(bagian, b) > 0).map((b) => `${banyakBentuk(bagian, b)} ${NAMA_BENTUK[b]}`);
/** Kartu tanya rupa lambang: atas = keterangan, bawah = kalimat hitung dengan tanda tanya. */
export function kalimatTanya(l: Langkah): { atas: string; bawah: string } {
  switch (l.tipe) {
    case "urai": {
      const t = l.tanya;
      if (t === "semua") return { atas: l.nama, bawah: `${daftarKata(l.bagian).join(" + ")} = ?` };
      if (typeof t === "string") return { atas: l.nama, bawah: `${NAMA_BENTUK[t]} = ?` };
      return { atas: `${l.nama}: lepas semua ${NAMA_BENTUK[t.lepas]}`, bawah: `${l.bagian.length} bagian − ${banyakBentuk(l.bagian, t.lepas)} ${NAMA_BENTUK[t.lepas]} = ?` };
    }
    case "keping":
      return { atas: l.nama, bawah: `${l.tanya === "semua" ? "keping" : NAMA_BENTUK[l.tanya]} = ?` };
    case "gabung":
      return { atas: `${l.keping.map((k) => NAMA_BENTUK[bentukKeping(k)]).join(" + ")} (${l.tempel})`, bawah: "bentuk baru = ?" };
    case "balok": {
      if (l.tanya === "sisa") return { atas: `${l.nama}: perlu ${l.slot.length} balok`, bawah: `${l.slot.length} − ${l.isi.length} terpasang = ?` };
      const jenis = (["segitiga", "persegi"] as Balok[]).filter((j) => l.slot.some((s) => jenisSlot(s) === j));
      const hitung = (j: Balok) => l.slot.filter((s) => jenisSlot(s) === j).length;
      if (l.tanya === "semua") return { atas: l.nama, bawah: `${jenis.map((j) => `${hitung(j)} ${NAMA_BALOK[j]}`).join(" + ")} = ?` };
      return { atas: `${l.nama}: ${jenis.map((j) => `${hitung(j)} ${NAMA_BALOK[j]}`).join(", ")}`, bawah: `balok ${NAMA_BALOK[l.tanya]} = ?` };
    }
    case "lidi": {
      const n = sisiBersama(l.bangun);
      const bawah = `${l.bangun.map((b) => b.length).join(" + ")}${n > 0 ? ` − ${n}` : ""} = ?`;
      return { atas: `${l.nama}${n > 0 ? `, ${n} sisi bersama` : ", terpisah"}`, bawah };
    }
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih banyaknya.", kanvas: "Lalu tulis banyaknya di kanvas.", suara: "Lalu ucapkan banyaknya." };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const kartu = rupa === "lambang";
  switch (l.tipe) {
    case "urai": {
      const t = l.tanya;
      const apa = kartu ? "kartu bagian" : "bagian";
      if (t === "semua") return cara === "kanvas" ? `Beri satu tanda pada tiap ${apa} ${l.nama}. ${akhir}` : `Urai ${l.nama}: ketuk tiap ${apa} sambil menghitung. ${akhir}`;
      if (typeof t === "string") return cara === "kanvas" ? `Beri tanda pada tiap ${apa} ${NAMA_BENTUK[t]}. ${akhir}` : `Urai ${l.nama}: ketuk ${apa} ${NAMA_BENTUK[t]} saja. ${akhir}`;
      return cara === "kanvas" ? `Semua ${NAMA_BENTUK[t.lepas]} dilepas. Beri tanda pada ${apa} yang tersisa. ${akhir}` : `Lepas semua ${apa} ${NAMA_BENTUK[t.lepas]}. Berapa bagian yang tersisa? ${akhir}`;
    }
    case "gabung":
      if (kartu) return cara === "kanvas" ? "Baca keping yang digabung, lalu lingkari nama bentuk barunya." : "Baca keping yang digabung, lalu ketuk nama bentuk barunya.";
      return cara === "kanvas" ? "Keping sudah digabung. Lingkari bentuk barunya." : "Ketuk tombol gabung, lalu ketuk bentuk barunya.";
    case "keping":
      return `Ketuk tiap ${kartu ? "kartu keping" : "keping"}${l.tanya === "semua" ? "" : ` ${NAMA_BENTUK[l.tanya]}`} pada ${l.nama} sambil menghitung. ${akhir}`;
    case "balok": {
      if (kartu) return `Baca kartunya, lalu hitung balok yang ditanya. ${akhir}`;
      if (cara === "kanvas") {
        if (l.tanya === "sisa") return `Beri tanda pada bayangan yang masih kosong. ${akhir}`;
        return `Beri tanda pada tiap bayangan${l.tanya === "semua" ? "" : ` ${NAMA_BALOK[l.tanya]}`}. ${akhir}`;
      }
      if (l.tanya === "sisa") return `Sebagian balok sudah terpasang. Isi bayangan yang masih kosong dengan balok dari baki. ${akhir}`;
      if (l.tanya === "semua") return `Pilih balok di baki, lalu ketuk bayangan yang cocok. Hitung semua balok. ${akhir}`;
      return `Isi bayangannya dengan balok dari baki. Hitung balok ${NAMA_BALOK[l.tanya]} saja. ${akhir}`;
    }
    case "lidi":
      if (kartu) return `Baca kartunya. Sisi bersama cukup satu lidi. ${akhir}`;
      return cara === "kanvas" ? `Beri satu tanda pada tiap garis putus-putus, tempat lidi diletakkan. ${akhir}` : `Ketuk tiap garis putus-putus untuk meletakkan lidi. ${akhir}`;
  }
}

/* ------------------------------ Simulasi: Misi Festival bagian satu, meja rakit mainan ------------------------------ */
export type MainanSim = { id: string; nama: string; bagian: Bagian[] };
export type KeadaanSusun = {
  alat: "susun";
  /** Mainan yang sedang di meja. */
  pilih: string;
  /** Indeks bagian yang terpasang per mainan. */
  pasang: Record<string, number[]>;
  /** Catatan kejadian: "<id>:lengkap", "<id>:kurang:<bentuk>", "<id>:kosong". */
  catat: string[];
  /** Mainan sudah dibawa ke panggung festival. */
  panggung: boolean;
  /** Jawaban banyak bagian untuk juri, per mainan. */
  juri: Record<string, number | null>;
};
export const awalSusun = (mainan: readonly MainanSim[]): KeadaanSusun => ({
  alat: "susun",
  pilih: mainan[0].id,
  pasang: Object.fromEntries(mainan.map((m) => [m.id, []])),
  catat: [],
  panggung: false,
  juri: Object.fromEntries(mainan.map((m) => [m.id, null])),
});
const cari = (mainan: readonly MainanSim[], id: string) => mainan.find((m) => m.id === id) ?? mainan[0];
export const lengkap = (k: KeadaanSusun, m: MainanSim): boolean => k.pasang[m.id].length === m.bagian.length;
export const terpasangJenis = (k: KeadaanSusun, m: MainanSim, b: Bentuk): number => k.pasang[m.id].filter((i) => m.bagian[i].bentuk === b).length;
export const pilihMainan = (k: KeadaanSusun, id: string): KeadaanSusun => ({ ...k, pilih: id });

/** Catat kejadian setelah bagian mainan berubah. */
function catatUbah(k: KeadaanSusun, m: MainanSim, baru: number[], lepas: boolean): KeadaanSusun {
  const n = { ...k, pasang: { ...k.pasang, [m.id]: [...baru].sort((a, b) => a - b) } };
  const catat = [...k.catat];
  const pernah = catat.includes(`${m.id}:lengkap`);
  if (!lepas && lengkap(n, m)) catat.push(`${m.id}:lengkap`);
  if (lepas && pernah) {
    if (baru.length === 0) catat.push(`${m.id}:kosong`);
    else
      for (const b of URUT_BENTUK) {
        const lain = URUT_BENTUK.filter((x) => x !== b);
        if (banyakBentuk(m.bagian, b) > 0 && terpasangJenis(n, m, b) === 0 && lain.every((x) => terpasangJenis(n, m, x) === banyakBentuk(m.bagian, x)) && catat[catat.length - 1] !== `${m.id}:kurang:${b}`) catat.push(`${m.id}:kurang:${b}`);
      }
  }
  return { ...n, catat };
}
export function pasangBagian(k: KeadaanSusun, mainan: readonly MainanSim[], i: number): KeadaanSusun {
  const m = cari(mainan, k.pilih);
  if (i < 0 || i >= m.bagian.length || k.pasang[m.id].includes(i)) return k;
  return catatUbah(k, m, [...k.pasang[m.id], i], false);
}
export function lepasBagian(k: KeadaanSusun, mainan: readonly MainanSim[], i: number): KeadaanSusun {
  const m = cari(mainan, k.pilih);
  if (!k.pasang[m.id].includes(i)) return k;
  return catatUbah(k, m, k.pasang[m.id].filter((x) => x !== i), true);
}
/** Pasang semua bagian satu bentuk sekaligus. */
export function pasangJenis(k: KeadaanSusun, mainan: readonly MainanSim[], b: Bentuk): KeadaanSusun {
  const m = cari(mainan, k.pilih);
  const tambah = m.bagian.map((x, i) => (x.bentuk === b && !k.pasang[m.id].includes(i) ? i : -1)).filter((i) => i >= 0);
  return tambah.length ? catatUbah(k, m, [...k.pasang[m.id], ...tambah], false) : k;
}
/** Lepas semua bagian satu bentuk sekaligus. */
export function lepasJenis(k: KeadaanSusun, mainan: readonly MainanSim[], b: Bentuk): KeadaanSusun {
  const m = cari(mainan, k.pilih);
  const sisa = k.pasang[m.id].filter((i) => m.bagian[i].bentuk !== b);
  return sisa.length !== k.pasang[m.id].length ? catatUbah(k, m, sisa, true) : k;
}
/** Bawa ke panggung: hanya bila semua mainan lengkap. */
export const bawaPanggung = (k: KeadaanSusun, mainan: readonly MainanSim[]): KeadaanSusun => (mainan.every((m) => lengkap(k, m)) ? { ...k, panggung: true } : k);
export const jawabJuri = (k: KeadaanSusun, id: string, n: number): KeadaanSusun => (k.panggung ? { ...k, juri: { ...k.juri, [id]: n } } : k);
export const juriBenar = (k: KeadaanSusun, mainan: readonly MainanSim[]): boolean => k.panggung && mainan.every((m) => k.juri[m.id] === m.bagian.length);

/** Kalimat tambah bagian yang terpasang, untuk layar (angka): "3 + 1 + 2 = 6". */
export function kalimatTambah(k: KeadaanSusun, m: MainanSim): string {
  const ada = URUT_KALIMAT.filter((b) => terpasangJenis(k, m, b) > 0);
  if (ada.length === 0) return "0";
  return `${ada.map((b) => terpasangJenis(k, m, b)).join(" + ")} = ${k.pasang[m.id].length}`;
}
/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatSusun(k: KeadaanSusun, mainan: readonly MainanSim[]): string {
  const m = cari(mainan, k.pilih);
  const nama = m.nama.charAt(0).toUpperCase() + m.nama.slice(1);
  const ada = URUT_KALIMAT.filter((b) => terpasangJenis(k, m, b) > 0);
  if (ada.length === 0) return `${nama} masih terurai. Belum ada bagian yang terpasang.`;
  const daftar = ada.map((b) => `${kata(terpasangJenis(k, m, b))} ${NAMA_BENTUK[b]}`).join(", ");
  const jumlah = ada.length > 1 ? ` ${ada.map((b) => kata(terpasangJenis(k, m, b))).join(" tambah ")} sama dengan ${kata(k.pasang[m.id].length)}.` : "";
  return `${nama}: ${daftar}.${jumlah} ${lengkap(k, m) ? "Lengkap!" : `Masih kurang ${kata(m.bagian.length - k.pasang[m.id].length)} bagian.`}`;
}
/** Kalimat kurang setelah satu jenis dilepas dari mainan lengkap, untuk suara (tanpa digit). */
export function kalimatKurang(m: MainanSim, b: Bentuk): string {
  const n = banyakBentuk(m.bagian, b);
  return `${kata(m.bagian.length)} kurang ${kata(n)} sama dengan ${kata(m.bagian.length - n)}. Tersisa ${kata(m.bagian.length - n)} bagian.`;
}
