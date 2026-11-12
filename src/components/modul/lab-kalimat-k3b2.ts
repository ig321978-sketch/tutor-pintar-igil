/**
 * Lab Neraca Kalimat (Kelas 3 Bab 2, Kalimat Matematika): logika murni.
 * Satu kalimat Matematika dengan satu kotak titik-titik. Neraca seimbang hanya bila nilai di kiri tanda
 * sama dengan persis sama dengan nilai di kanan. Empat bentuk kalimat:
 *   tambah, tengah : tahu + … = hasil        tambah, depan : … + tahu = hasil
 *   kurang, tengah : tahu − … = hasil        kurang, depan : … − tahu = hasil
 * Mode A (Sub-Bab A) hanya penjumlahan. Mode B (Sub-Bab B) mulai dari pengurangan dan boleh berpindah ke
 * penjumlahan. Semua bilangan 0 sampai 100 dan hasil pengurangan tidak pernah di bawah nol.
 * Bagian kedua berkas ini adalah Papan Kemungkinan: hanya jumlah yang diketahui, jadi jawabannya banyak.
 * Tanpa skor, tanpa waktu. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b2.mjs.
 */

export type ModeKal = "A" | "B";
export type OpKal = "tambah" | "kurang";
export type LetakKal = "depan" | "tengah";
export type BagianKal = "tahu" | "hasil" | "isi";
export type RepKal = "bagan" | "kebalikan";
export type LangkahKal = 1 | -1 | 10 | -10;

export const MAKS_KAL = 100;
const MAKS_PERNAH = 60;

export type StateKal = {
  mode: ModeKal;
  op: OpKal;
  letak: LetakKal;
  /** Bilangan yang diketahui di kiri tanda sama dengan. */
  tahu: number;
  /** Bilangan di kanan tanda sama dengan. */
  hasil: number;
  /** Isi kotak titik-titik. */
  isi: number;
  tampil: Record<RepKal, boolean>;
  /** Tombol Periksa sudah ditekan pada kalimat yang sekarang (dan neracanya seimbang). */
  periksa: boolean;
  /** Kalimat yang pernah diseimbangkan, lihat idKalimat. */
  pernah: string[];
  /** Bentuk kalimat ("op:letak") yang pernah seimbang dengan Kebalikan menyala. */
  pernahBalik: string[];
  /** Penjumlahan seimbang ditukar tempat dan tetap seimbang. */
  tukarSeimbang: boolean;
  /** Pengurangan dicoba ditukar tempat dan ditolak. */
  tukarDitolak: boolean;
  pesan: string;
};

export type AksiKal =
  | { t: "UBAH"; bagian: BagianKal; d: LangkahKal }
  | { t: "LETAK"; letak: LetakKal }
  | { t: "OP"; op: OpKal }
  | { t: "TOGGLE"; rep: RepKal }
  | { t: "TUKAR" }
  | { t: "PERIKSA" }
  | { t: "RESET" };

const dasar = { tampil: { bagan: false, kebalikan: false }, periksa: false, pernah: [], pernahBalik: [], tukarSeimbang: false, tukarDitolak: false, pesan: "" };

/** Keadaan awal: contoh buku yang belum diisi. A: 30 + … = 50 (Galih dan Andi). B: 32 − … = 15. */
export const awalKal = (mode: ModeKal): StateKal =>
  mode === "A" ? { mode, op: "tambah", letak: "tengah", tahu: 30, hasil: 50, isi: 0, ...dasar } : { mode, op: "kurang", letak: "tengah", tahu: 32, hasil: 15, isi: 0, ...dasar };

type Inti = Pick<StateKal, "op" | "letak" | "tahu" | "hasil">;

/** Kalimat sah bila jawabannya ada di antara 0 dan 100. */
export function sahKal(x: Inti): boolean {
  const { tahu, hasil } = x;
  if (tahu < 0 || hasil < 0 || tahu > MAKS_KAL || hasil > MAKS_KAL) return false;
  if (x.op === "tambah") return tahu <= hasil;
  if (x.letak === "tengah") return hasil <= tahu;
  return tahu + hasil <= MAKS_KAL;
}

/** Bilangan yang membuat kalimat benar. Hanya bermakna bila kalimat sah. */
export function jawabKal(x: Inti): number {
  if (x.op === "tambah") return x.hasil - x.tahu;
  return x.letak === "tengah" ? x.tahu - x.hasil : x.tahu + x.hasil;
}

/** Nilai sisi kiri dengan kotak diisi. null bila pengurangannya tidak bisa dilakukan (di bawah nol). */
export function nilaiKiri(x: Pick<StateKal, "op" | "letak" | "tahu" | "isi">): number | null {
  if (x.op === "tambah") return x.tahu + x.isi;
  const v = x.letak === "tengah" ? x.tahu - x.isi : x.isi - x.tahu;
  return v < 0 ? null : v;
}

export type StatusKal = "seimbang" | "kurang" | "lebih" | "takbisa";

/** Arah neraca: kiri kurang, kiri lebih, seimbang, atau pengurangan yang tidak bisa dilakukan. */
export function statusKal(x: StateKal): StatusKal {
  const kiri = nilaiKiri(x);
  if (kiri === null) return "takbisa";
  if (kiri === x.hasil) return "seimbang";
  return kiri < x.hasil ? "kurang" : "lebih";
}

export const seimbangKal = (x: StateKal): boolean => statusKal(x) === "seimbang";

const tanda = (op: OpKal) => (op === "tambah" ? "+" : "−");

/** Kalimat Matematika. `kotak` adalah tulisan di tempat titik-titik (bawaan "…"). */
export function kalimatKal(x: Inti, kotak: string | number = "…"): string {
  return x.letak === "depan" ? `${kotak} ${tanda(x.op)} ${x.tahu} = ${x.hasil}` : `${x.tahu} ${tanda(x.op)} ${kotak} = ${x.hasil}`;
}

/** Kalimat benar dengan titik-titik sudah diisi, dipakai untuk memeriksa. */
export const kalimatPeriksaKal = (x: Inti): string => kalimatKal(x, jawabKal(x));

/** Operasi kebalikan untuk mencari isi titik-titik, mis. "54 − 16". */
export function ungkapanBalik(x: Inti): string {
  if (x.op === "tambah") return `${x.hasil} − ${x.tahu}`;
  return x.letak === "tengah" ? `${x.tahu} − ${x.hasil}` : `${x.tahu} + ${x.hasil}`;
}

/** Operasi kebalikan memakai pengurangan atau penjumlahan. */
export const tandaBalik = (x: Inti): "+" | "−" => (x.op === "kurang" && x.letak === "depan" ? "+" : "−");

export const kalimatBalik = (x: Inti): string => `${ungkapanBalik(x)} = ${jawabKal(x)}`;

/** Penjelasan operasi kebalikan dengan nama bagiannya. */
export function ceritaBalik(x: Inti): string {
  if (x.op === "tambah") return "Jumlah dikurangi bilangan yang diketahui.";
  return x.letak === "tengah" ? "Bilangan awal dikurangi sisa." : "Bilangan yang dikurangkan ditambah sisa.";
}

/** Operasi kebalikan yang berupa pengurangan perlu mengambil satu puluhan. */
export function balikMengambil(x: Inti): boolean {
  if (tandaBalik(x) === "+") return false;
  const besar = x.op === "tambah" ? x.hasil : x.tahu;
  const kecil = x.op === "tambah" ? x.tahu : x.hasil;
  return besar % 10 < kecil % 10;
}

export const idKalimat = (x: Inti): string => `${x.op}:${x.letak}:${x.tahu}:${x.hasil}`;
export const idBentuk = (x: Inti): string => `${x.op}:${x.letak}`;

/** Bagan bagian dan keseluruhan: batang atas dan dua batang di bawahnya. `null` berarti kotak titik-titik. */
export type BaganKal = { atas: { nama: string; nilai: number | null }; bawah: [{ nama: string; nilai: number | null }, { nama: string; nilai: number | null }] };

export function baganKal(x: Inti): BaganKal {
  if (x.op === "tambah") {
    const tahu = { nama: "Bagian yang diketahui", nilai: x.tahu };
    const kotak = { nama: "Bagian yang dicari", nilai: null };
    return { atas: { nama: "Jumlah", nilai: x.hasil }, bawah: x.letak === "depan" ? [kotak, tahu] : [tahu, kotak] };
  }
  if (x.letak === "tengah") return { atas: { nama: "Bilangan awal", nilai: x.tahu }, bawah: [{ nama: "Dikurangkan", nilai: null }, { nama: "Sisa", nilai: x.hasil }] };
  return { atas: { nama: "Bilangan awal", nilai: null }, bawah: [{ nama: "Dikurangkan", nilai: x.tahu }, { nama: "Sisa", nilai: x.hasil }] };
}

const tolak = (x: StateKal, pesan: string): StateKal => ({ ...x, pesan });

const unik = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id].slice(-MAKS_PERNAH));

/** Catat riwayat setelah satu aksi: kalimat yang seimbang dan bentuk yang seimbang dengan Kebalikan menyala. */
function catat(x: StateKal): StateKal {
  if (!seimbangKal(x)) return x;
  const pernah = unik(x.pernah, idKalimat(x));
  const pernahBalik = x.tampil.kebalikan ? unik(x.pernahBalik, idBentuk(x)) : x.pernahBalik;
  return pernah === x.pernah && pernahBalik === x.pernahBalik ? x : { ...x, pernah, pernahBalik };
}

const pesanTakSah = (x: Inti): string => {
  if (x.tahu > MAKS_KAL || x.hasil > MAKS_KAL) return "Bilangan paling besar 100 di bab ini.";
  if (x.tahu < 0 || x.hasil < 0) return "Bilangan cacah tidak di bawah nol.";
  if (x.op === "tambah") return "Jumlah tidak boleh lebih kecil dari bagiannya.";
  if (x.letak === "tengah") return "Sisa tidak boleh lebih besar dari bilangan awal.";
  return "Bilangan awalnya akan lebih dari 100. Kecilkan dulu salah satu bilangan.";
};

export function langkahKal(x: StateKal, a: AksiKal): StateKal {
  switch (a.t) {
    case "UBAH": {
      const baru = x[a.bagian] + a.d;
      if (a.bagian === "isi") {
        if (baru < 0) return tolak(x, "Isi kotak tidak di bawah nol.");
        if (baru > MAKS_KAL) return tolak(x, "Bilangan paling besar 100 di bab ini.");
        return catat({ ...x, isi: baru, periksa: false, pesan: "" });
      }
      const y = { ...x, [a.bagian]: baru, periksa: false, pesan: "" } as StateKal;
      if (!sahKal(y)) return tolak(x, pesanTakSah(y));
      return catat(y);
    }
    case "LETAK": {
      if (a.letak === x.letak) return x;
      const y: StateKal = { ...x, letak: a.letak, isi: 0, periksa: false, pesan: "" };
      if (!sahKal(y)) return tolak(x, pesanTakSah(y));
      return catat(y);
    }
    case "OP": {
      if (x.mode === "A" || a.op === x.op) return x;
      const lurus: StateKal = { ...x, op: a.op, isi: 0, periksa: false, pesan: "" };
      if (sahKal(lurus)) return catat(lurus);
      // Bagan yang sama dibaca dengan operasi lain: 45 + … = 80 menjadi 80 − … = 45.
      const silang: StateKal = { ...lurus, tahu: x.hasil, hasil: x.tahu };
      if (sahKal(silang)) return catat(silang);
      return tolak(x, pesanTakSah(lurus));
    }
    case "TOGGLE":
      return catat({ ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" });
    case "TUKAR": {
      if (x.op === "kurang") {
        const kiri = x.letak === "tengah" ? `${x.tahu} − ${x.isi}` : `${x.isi} − ${x.tahu}`;
        const balik = x.letak === "tengah" ? `${x.isi} − ${x.tahu}` : `${x.tahu} − ${x.isi}`;
        return { ...x, tukarDitolak: true, pesan: `Pengurangan tidak boleh ditukar tempat: ${kiri} tidak sama dengan ${balik}. Bilangan awal harus di depan.` };
      }
      const y: StateKal = { ...x, letak: x.letak === "depan" ? "tengah" : "depan", pesan: "" };
      return catat({ ...y, tukarSeimbang: x.tukarSeimbang || seimbangKal(y) });
    }
    case "PERIKSA": {
      const s = statusKal(x);
      if (s === "seimbang") return { ...x, periksa: true, pesan: "" };
      if (s === "takbisa") return tolak(x, "Belum bisa diperiksa: bilangan di depan lebih kecil dari yang dikurangkan.");
      return tolak(x, s === "kurang" ? "Neraca belum seimbang: sisi kiri masih kurang." : "Neraca belum seimbang: sisi kiri kelebihan.");
    }
    case "RESET":
      return awalKal(x.mode);
  }
}

export type KeadaanKal = {
  alat: "kalimat";
  mode: ModeKal;
  op: OpKal;
  letak: LetakKal;
  tahu: number;
  hasil: number;
  isi: number;
  jawab: number;
  seimbang: boolean;
  bagan: boolean;
  kebalikan: boolean;
  periksa: boolean;
  /** Operasi kebalikannya pengurangan yang mengambil satu puluhan. */
  mengambil: boolean;
  pernah: string[];
  pernahBalik: string[];
  tukarSeimbang: boolean;
  tukarDitolak: boolean;
};

export function keadaanKal(x: StateKal): KeadaanKal {
  return {
    alat: "kalimat",
    mode: x.mode,
    op: x.op,
    letak: x.letak,
    tahu: x.tahu,
    hasil: x.hasil,
    isi: x.isi,
    jawab: jawabKal(x),
    seimbang: seimbangKal(x),
    bagan: x.tampil.bagan,
    kebalikan: x.tampil.kebalikan,
    periksa: x.periksa,
    mengambil: balikMengambil(x),
    pernah: x.pernah,
    pernahBalik: x.pernahBalik,
    tukarSeimbang: x.tukarSeimbang,
    tukarDitolak: x.tukarDitolak,
  };
}

/** Kalimat status di bawah neraca. */
export function ceritaStatus(x: StateKal): string {
  const s = statusKal(x);
  const kiri = nilaiKiri(x);
  if (s === "takbisa") return `${x.isi} − ${x.tahu} belum bisa dihitung. Bilangan awal harus paling sedikit ${x.tahu}.`;
  if (s === "seimbang") return `Seimbang! Kiri ${kiri}, kanan ${x.hasil}. Sama nilainya.`;
  return s === "kurang" ? `Kiri ${kiri}, kanan ${x.hasil}. Sisi kiri masih kurang.` : `Kiri ${kiri}, kanan ${x.hasil}. Sisi kiri kelebihan.`;
}

/** Ucapan guru tentang kalimat sekarang (angka dan tanda dieja oleh pemanggil). */
export function ucapKal(x: StateKal): string {
  const s = statusKal(x);
  const buka = `Kalimatnya ${kalimatKal(x, "titik-titik")}. Kotak berisi ${x.isi}.`;
  if (s === "seimbang") return `${buka} Neraca seimbang, jadi ${kalimatPeriksaKal(x)}. Cara mencarinya: ${kalimatBalik(x)}.`;
  if (s === "takbisa") return `${buka} Pengurangan ini belum bisa dihitung, karena bilangan di depan lebih kecil.`;
  return `${buka} ${s === "kurang" ? "Sisi kiri masih kurang. Tambah isi kotaknya." : "Sisi kiri kelebihan."} Tanda sama dengan berarti kedua sisi sama nilainya.`;
}

/* ======================================================================== */
/* Papan Kemungkinan: hanya jumlah (atau bilangan awal) yang diketahui.      */
/* ======================================================================== */

export type BagianMungkin = "total" | "a" | "b";

export type StateMungkin = {
  mode: ModeKal;
  total: number;
  a: number;
  b: number;
  /** Pasangan berbeda yang sudah dicatat untuk total sekarang. */
  catat: [number, number][];
  pesan: string;
};

export type AksiMungkin = { t: "UBAH"; bagian: BagianMungkin; d: LangkahKal } | { t: "CATAT" } | { t: "RESET" };

/** A: 50 kelereng Galih dan Andi. B: 80 ayam Pak Slamet. Belum ada pasangan yang dicatat. */
export const awalMungkin = (mode: ModeKal): StateMungkin => ({ mode, total: mode === "A" ? 50 : 80, a: 0, b: 0, catat: [], pesan: "" });

export const NAMA_MUNGKIN: Record<ModeKal, { total: string; a: string; b: string }> = {
  A: { total: "Jumlah", a: "Bagian pertama", b: "Bagian kedua" },
  B: { total: "Mula-mula", a: "Terjual", b: "Sisa" },
};

export const pasMungkin = (x: StateMungkin): boolean => x.a + x.b === x.total;

/** Kalimat pasangan: A "60 + 40 = 100", B "100 − 45 = 55". */
export const kalimatMungkin = (mode: ModeKal, total: number, p: [number, number]): string => (mode === "A" ? `${p[0]} + ${p[1]} = ${total}` : `${total} − ${p[0]} = ${p[1]}`);

export function langkahMungkin(x: StateMungkin, a: AksiMungkin): StateMungkin {
  switch (a.t) {
    case "UBAH": {
      const baru = x[a.bagian] + a.d;
      if (a.bagian === "total") {
        if (baru < 2 || baru > MAKS_KAL) return { ...x, pesan: "Jumlahnya 2 sampai 100." };
        return { ...x, total: baru, catat: [], pesan: x.catat.length > 0 ? "Jumlahnya berubah, jadi catatan dikosongkan." : "" };
      }
      if (baru < 0 || baru > MAKS_KAL) return { ...x, pesan: "Tiap bagian 0 sampai 100." };
      return { ...x, [a.bagian]: baru, pesan: "" };
    }
    case "CATAT": {
      const jumlah = x.a + x.b;
      if (jumlah !== x.total) return { ...x, pesan: `${x.a} + ${x.b} = ${jumlah}, ${jumlah < x.total ? "masih kurang dari" : "lebih dari"} ${x.total}. Belum bisa dicatat.` };
      // Penjumlahan boleh ditukar tempat, jadi 60 + 40 dan 40 + 60 satu pasangan. Terjual dan sisa berbeda peran.
      const sama = (p: number, q: number) => (p === x.a && q === x.b) || (x.mode === "A" && p === x.b && q === x.a);
      if (x.catat.some(([p, q]) => sama(p, q))) return { ...x, pesan: x.mode === "A" ? "Pasangan ini sudah dicatat (ditukar tempat tetap sama). Cari pasangan lain." : "Pasangan ini sudah dicatat. Cari pasangan lain." };
      return { ...x, catat: [...x.catat, [x.a, x.b]], pesan: "" };
    }
    case "RESET":
      return awalMungkin(x.mode);
  }
}

export type KeadaanMungkin = { alat: "mungkin"; mode: ModeKal; total: number; a: number; b: number; pas: boolean; banyak: number };

export const keadaanMungkin = (x: StateMungkin): KeadaanMungkin => ({ alat: "mungkin", mode: x.mode, total: x.total, a: x.a, b: x.b, pas: pasMungkin(x), banyak: x.catat.length });

export function ucapMungkin(x: StateMungkin): string {
  const n = NAMA_MUNGKIN[x.mode];
  const jumlah = x.a + x.b;
  const buka = `${n.total} ${x.total}. ${n.a} ${x.a} dan ${n.b.toLowerCase()} ${x.b}.`;
  const tengah = jumlah === x.total ? "Pasangan ini cocok." : `Jumlahnya ${jumlah}, belum sama dengan ${x.total}.`;
  return `${buka} ${tengah} Sudah ${x.catat.length} pasangan dicatat. Jawabannya tidak hanya satu.`;
}
