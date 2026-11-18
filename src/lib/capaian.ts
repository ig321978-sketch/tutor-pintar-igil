/**
 * Capaian belajar siswa di perangkat (logika murni: tanpa React, tanpa jaringan). Diuji: scripts/uji-capaian.mjs.
 *
 * Dicatat oleh modul bab saat siswa selesai Sub-Bab, menjawab soal Latihan (sudah dinilai server), dan menyerahkan Ujian
 * (nilai akhir dari server). Dibaca halaman Rapor & Sertifikat. Kunci bab memakai kode bab aplikasi ("mtk-1-bab1"), sama
 * dengan Praktikum Blok (src/data/praktikum-blok.json).
 *
 * Aturan platform yang dijaga di sini:
 *  - Ini CERMIN di perangkat untuk tampilan. Poin Kualifikasi resmi hanya terbit lewat RPC server; angka di sini disebut "perkiraan".
 *  - Poin direset tiap awal bulan (perkiraan bulan ini hanya menghitung poin yang terbit di bulan berjalan), sedangkan
 *    ketuntasan bab (Sub-Bab, skor, Ujian 100%) tersimpan selamanya.
 *  - Tanpa nilai tukar rupiah, tanpa kamera, tanpa data biometrik.
 */

export const KUNCI_CAPAIAN = "igil_capaian_v1";
export const PERISTIWA_CAPAIAN = "igil-capaian-berubah";

/** Banyak soal satu lembar Latihan. Poin Latihan terbit setelah semuanya dijawab (aturan server: semua kunci terjawab). */
export const JUMLAH_SOAL_LATIHAN = 10;
export const POIN_LATIHAN = 30;
export const POIN_UJIAN = 70;
export const POIN_PRAKTIKUM = 50;
export const BAB_PER_BLOK = 4;

export type LevelSoal = "LOTS" | "MOTS" | "HOTS";
/** `level` dan `detik` (lama menjawab) opsional: catatan lama tidak punya. */
export type JawabanLatihan = { id: string; benar: boolean; level?: LevelSoal; detik?: number };
/** Satu kali Ujian diserahkan. `detik` = lama mengerjakan satu lembar (stopwatch di perangkat). */
export type PercobaanUjian = { nilai: number; waktu: string; detik?: number };
/** Riwayat Ujian yang disimpan paling banyak sekian percobaan terakhir. */
export const RIWAYAT_UJIAN_MAKS = 20;

export type CapaianBab = {
  /** Huruf Sub-Bab yang sudah diselesaikan (A, B, C, ...). */
  subBab: string[];
  /** Hasil tiap soal Latihan yang sudah dinilai server, urut dijawab. Paling banyak JUMLAH_SOAL_LATIHAN. */
  latihan: JawabanLatihan[];
  ujian: { terbaik: number | null; percobaan: number; lulusPertama: boolean; riwayat?: PercobaanUjian[] };
  /** Bulan ("YYYY-MM", waktu Jakarta) saat poin perkiraan terbit. Dipakai untuk reset bulanan. */
  poin: { latihan?: string; ujian?: string };
  diperbarui: string;
};

export type GudangCapaian = Record<string, CapaianBab>;

export const babKosong = (): CapaianBab => ({
  subBab: [],
  latihan: [],
  ujian: { terbaik: null, percobaan: 0, lulusPertama: false },
  poin: {},
  diperbarui: "",
});

/** Bulan berjalan "YYYY-MM" menurut waktu Jakarta (UTC+7), sama dengan period_month di server. */
export const bulanJakarta = (d: Date): string => new Date(d.getTime() + 7 * 3600_000).toISOString().slice(0, 7);

const ambil = (g: GudangCapaian, bab: string): CapaianBab => {
  const c = g[bab];
  return c
    ? { ...c, subBab: [...c.subBab], latihan: [...c.latihan], ujian: { ...c.ujian, riwayat: [...(c.ujian.riwayat ?? [])] }, poin: { ...c.poin } }
    : babKosong();
};

const simpan = (g: GudangCapaian, bab: string, c: CapaianBab, sekarang: Date): GudangCapaian => ({
  ...g,
  [bab]: { ...c, diperbarui: sekarang.toISOString() },
});

/** Lama pengerjaan yang masuk akal (1 detik sampai 3 jam), dibulatkan. Selain itu dibuang. */
export function detikAman(nilai: unknown): number | undefined {
  return typeof nilai === "number" && Number.isFinite(nilai) && nilai >= 1 && nilai <= 3 * 3600 ? Math.round(nilai) : undefined;
}

/* ------------------------------ Pencatatan (murni: mengembalikan gudang baru) ------------------------------ */

export function catatSubBab(g: GudangCapaian, bab: string, huruf: string, sekarang = new Date()): GudangCapaian {
  const c = ambil(g, bab);
  if (c.subBab.includes(huruf)) return g;
  c.subBab = [...c.subBab, huruf].sort();
  return simpan(g, bab, c, sekarang);
}

/** Jawaban pertama tiap soal yang dihitung. Setelah 10 soal terjawab, poin Latihan perkiraan terbit (sekali). */
export function catatJawabanLatihan(
  g: GudangCapaian,
  bab: string,
  idSoal: string,
  benar: boolean,
  sekarang = new Date(),
  opsi: { level?: LevelSoal; detik?: number } = {},
): GudangCapaian {
  const c = ambil(g, bab);
  if (c.latihan.length >= JUMLAH_SOAL_LATIHAN || c.latihan.some((j) => j.id === idSoal)) return g;
  const jawaban: JawabanLatihan = { id: idSoal, benar };
  if (opsi.level) jawaban.level = opsi.level;
  const detik = detikAman(opsi.detik);
  if (detik !== undefined) jawaban.detik = detik;
  c.latihan = [...c.latihan, jawaban];
  if (c.latihan.length === JUMLAH_SOAL_LATIHAN && !c.poin.latihan) c.poin.latihan = bulanJakarta(sekarang);
  return simpan(g, bab, c, sekarang);
}

/** Nilai akhir Ujian dari server (0 sampai 100). Poin Ujian perkiraan terbit sekali, saat nilai pertama kali 100. */
export function catatUjian(g: GudangCapaian, bab: string, nilai: number, sekarang = new Date(), detik?: number): GudangCapaian {
  if (!Number.isFinite(nilai) || nilai < 0 || nilai > 100) return g;
  const c = ambil(g, bab);
  const pertama = c.ujian.percobaan === 0;
  const satu: PercobaanUjian = { nilai: Math.round(nilai), waktu: sekarang.toISOString() };
  const lama = detikAman(detik);
  if (lama !== undefined) satu.detik = lama;
  c.ujian = {
    terbaik: Math.max(c.ujian.terbaik ?? 0, Math.round(nilai)),
    percobaan: c.ujian.percobaan + 1,
    lulusPertama: c.ujian.lulusPertama || (pertama && nilai === 100),
    riwayat: [...(c.ujian.riwayat ?? []), satu].slice(-RIWAYAT_UJIAN_MAKS),
  };
  if (nilai === 100 && !c.poin.ujian) c.poin.ujian = bulanJakarta(sekarang);
  return simpan(g, bab, c, sekarang);
}

/* ------------------------------ Turunan untuk tampilan ------------------------------ */

export type RingkasBab = {
  mulai: boolean;
  materiPersen: number;
  latihanTerjawab: number;
  latihanSelesai: boolean;
  /** Skor Latihan 0 sampai 100 (benar dari 10 soal), null bila belum selesai satu lembar. */
  skorLatihan: number | null;
  skorUjian: number | null;
  percobaan: number;
  ujianSempurna: boolean;
  lulusPertama: boolean;
  /** Semua syarat Papan Kualifikasi Beasiswa: Ujian 100% percobaan pertama dan semua Sub-Bab tuntas. */
  kualifikasi: boolean;
};

export function ringkasBab(c: CapaianBab | undefined, totalSubBab: number): RingkasBab {
  const x = c ?? babKosong();
  const benar = x.latihan.filter((j) => j.benar).length;
  const latihanSelesai = x.latihan.length >= JUMLAH_SOAL_LATIHAN;
  const materiPersen = totalSubBab > 0 ? Math.min(100, Math.round((x.subBab.length / totalSubBab) * 100)) : 0;
  const ujianSempurna = x.ujian.terbaik === 100;
  return {
    mulai: x.subBab.length > 0 || x.latihan.length > 0 || x.ujian.percobaan > 0,
    materiPersen,
    latihanTerjawab: x.latihan.length,
    latihanSelesai,
    skorLatihan: latihanSelesai ? Math.round((benar / JUMLAH_SOAL_LATIHAN) * 100) : null,
    skorUjian: x.ujian.terbaik,
    percobaan: x.ujian.percobaan,
    ujianSempurna,
    lulusPertama: x.ujian.lulusPertama,
    kualifikasi: x.ujian.lulusPertama && materiPersen === 100,
  };
}

export type PoinBulan = { latihan: number; ujian: number; praktikum: number; total: number };

/**
 * Perkiraan Poin Kualifikasi bulan `bulan` dari catatan di perangkat. Poin bulan lalu tidak dihitung (reset bulanan).
 * `praktikumBulan`: bulan saat Praktikum blok dikirim (null bila belum).
 */
export function poinBulanIni(g: GudangCapaian, bulan: string, praktikumBulan: readonly (string | null)[] = []): PoinBulan {
  let latihan = 0;
  let ujian = 0;
  for (const c of Object.values(g)) {
    if (c.poin.latihan === bulan) latihan += POIN_LATIHAN;
    if (c.poin.ujian === bulan) ujian += POIN_UJIAN;
  }
  const praktikum = praktikumBulan.filter((b) => b === bulan).length * POIN_PRAKTIKUM;
  return { latihan, ujian, praktikum, total: latihan + ujian + praktikum };
}

/** Poin penuh satu blok: (30 + 70) x 4 + 50 = 450. */
export const POIN_PER_BLOK_PENUH = (POIN_LATIHAN + POIN_UJIAN) * BAB_PER_BLOK + POIN_PRAKTIKUM;

/** Id bab yang Ujiannya sudah 100% (catatan baru), digabung catatan lama `igil_ujian_lulus_v1` bila ada. */
export function babUjianSempurna(g: GudangCapaian, lama: readonly string[] = []): Set<string> {
  const s = new Set<string>(lama);
  for (const [bab, c] of Object.entries(g)) if (c.ujian.terbaik === 100) s.add(bab);
  return s;
}

/** Bab pertama dalam `urut` yang Ujiannya belum 100%, untuk kartu "Lanjutkan belajar". null bila semuanya tuntas. */
export function babBerikutnya(urut: readonly string[], tuntas: ReadonlySet<string>): string | null {
  return urut.find((b) => !tuntas.has(b)) ?? null;
}

const LEVEL: readonly LevelSoal[] = ["LOTS", "MOTS", "HOTS"];

function uraiJawaban(j: unknown): JawabanLatihan[] {
  if (!j || typeof j !== "object") return [];
  const x = j as Partial<JawabanLatihan>;
  if (typeof x.id !== "string" || typeof x.benar !== "boolean") return [];
  const hasil: JawabanLatihan = { id: x.id, benar: x.benar };
  if (x.level && LEVEL.includes(x.level)) hasil.level = x.level;
  const d = detikAman(x.detik);
  if (d !== undefined) hasil.detik = d;
  return [hasil];
}

function uraiPercobaan(p: unknown): PercobaanUjian[] {
  if (!p || typeof p !== "object") return [];
  const x = p as Partial<PercobaanUjian>;
  if (typeof x.nilai !== "number" || !Number.isFinite(x.nilai) || x.nilai < 0 || x.nilai > 100 || typeof x.waktu !== "string") return [];
  const hasil: PercobaanUjian = { nilai: Math.round(x.nilai), waktu: x.waktu };
  const d = detikAman(x.detik);
  if (d !== undefined) hasil.detik = d;
  return [hasil];
}

/** Baca gudang dari teks JSON. Data rusak atau bentuk salah menghasilkan gudang kosong, tidak pernah melempar galat. */
export function urai(mentah: string | null | undefined): GudangCapaian {
  if (!mentah) return {};
  try {
    const x = JSON.parse(mentah) as unknown;
    if (!x || typeof x !== "object" || Array.isArray(x)) return {};
    const hasil: GudangCapaian = {};
    for (const [bab, v] of Object.entries(x as Record<string, Partial<CapaianBab>>)) {
      if (!v || typeof v !== "object") continue;
      const u = (v.ujian ?? {}) as Partial<CapaianBab["ujian"]>;
      hasil[bab] = {
        subBab: Array.isArray(v.subBab) ? v.subBab.filter((h): h is string => typeof h === "string") : [],
        latihan: Array.isArray(v.latihan) ? v.latihan.flatMap((j) => uraiJawaban(j)).slice(0, JUMLAH_SOAL_LATIHAN) : [],
        ujian: {
          terbaik: typeof u.terbaik === "number" ? u.terbaik : null,
          percobaan: typeof u.percobaan === "number" ? u.percobaan : 0,
          lulusPertama: u.lulusPertama === true,
          ...(Array.isArray(u.riwayat) ? { riwayat: u.riwayat.flatMap((p) => uraiPercobaan(p)).slice(-RIWAYAT_UJIAN_MAKS) } : {}),
        },
        poin: { latihan: typeof v.poin?.latihan === "string" ? v.poin.latihan : undefined, ujian: typeof v.poin?.ujian === "string" ? v.poin.ujian : undefined },
        diperbarui: typeof v.diperbarui === "string" ? v.diperbarui : "",
      };
    }
    return hasil;
  } catch {
    return {};
  }
}

/** Kode bab server ("k1-mat-bab3") menjadi kode bab aplikasi ("mtk-1-bab3"). Bentuk lain dikembalikan apa adanya. */
export function kodeAplikasiDariServer(idServer: string): string {
  const m = /^k(\d)-mat-bab(\d+)$/.exec(idServer);
  return m ? `mtk-${m[1]}-bab${m[2]}` : idServer;
}

export type BlokPraktikum = { id: string; bab: readonly string[] };

/** Praktikum blok yang harus sudah dikirim untuk sebuah sertifikat: semua blok yang seluruh babnya termasuk bab wajib sertifikat itu. */
export function blokDibutuhkan(babWajib: readonly string[], blok: readonly BlokPraktikum[]): BlokPraktikum[] {
  const wajib = new Set(babWajib);
  return blok.filter((b) => b.bab.every((x) => wajib.has(x)));
}

/** Sertifikat terbuka: semua bab wajib Ujian 100% DAN semua praktikum blok yang dibutuhkan sudah dikirim (bila sertifikat mewajibkan). */
export function sertifikatTerbuka(opsi: { babWajib: readonly string[]; tuntas: ReadonlySet<string>; wajibPraktikum: boolean; blok: readonly BlokPraktikum[]; praktikumTerkirim: ReadonlySet<string> }): boolean {
  if (!opsi.babWajib.every((b) => opsi.tuntas.has(b))) return false;
  if (!opsi.wajibPraktikum) return true;
  return blokDibutuhkan(opsi.babWajib, opsi.blok).every((b) => opsi.praktikumTerkirim.has(b.id));
}

