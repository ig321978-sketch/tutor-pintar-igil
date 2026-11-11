/* ------------------------------------------------------------------------ */
/* Logika murni Mind-Map data-driven (tanpa React, tanpa impor).              */
/* Data hanya berisi pusat, cabang, dan kartu. Tanpa skor, tanpa hukuman:     */
/* kartu yang salah letak kembali ke baki disertai petunjuk pendek.           */
/* Diuji di Node: scripts/uji-peta-konsep.mjs                                 */
/* ------------------------------------------------------------------------ */

export type CabangPeta = {
  id: string;
  judul: string;
  ikon: string;
  /** Satu kalimat pendek yang tampil saat cabang dibuka. */
  ringkas: string;
  /** Penjelasan yang dibacakan guru saat cabang dibuka. */
  suara: string;
};

export type KartuPeta = {
  id: string;
  teks: string;
  ikon: string;
  /** Id cabang tempat kartu ini seharusnya berada. */
  cabang: string;
  /** Petunjuk pendek bila kartu diletakkan di cabang yang belum cocok. */
  petunjuk: string;
};

export type DataPeta = {
  pusat: { judul: string; ikon: string; suara: string };
  /** Kalimat bimbingan singkat di gelembung maskot. */
  petunjuk: string;
  cabang: CabangPeta[];
  kartu: KartuPeta[];
};

export type KabarPeta = { jenis: "benar" | "coba" | "info"; teks: string };

export type KeadaanPeta = {
  /** Id cabang yang sudah dibuka, urut pertama kali dibuka. */
  dibuka: string[];
  /** Cabang yang sedang ditampilkan di panel detail. */
  aktif: string | null;
  /** Kartu yang sudah tersusun benar: id kartu -> id cabang. */
  tersusun: Record<string, string>;
  /** Kartu yang sedang dipegang (diketuk) dan menunggu cabang tujuan. */
  dipilih: string | null;
  kabar: KabarPeta | null;
};

export const BATAS_CABANG = { min: 3, maks: 4 } as const;

export function awalPeta(): KeadaanPeta {
  return { dibuka: [], aktif: null, tersusun: {}, dipilih: null, kabar: null };
}

const cariCabang = (d: DataPeta, id: string) => d.cabang.find((c) => c.id === id);
const cariKartu = (d: DataPeta, id: string) => d.kartu.find((k) => k.id === id);

/** Membuka cabang: tampil di panel detail dan dihitung sudah dibuka. */
export function bukaCabang(d: DataPeta, k: KeadaanPeta, cabangId: string): KeadaanPeta {
  if (!cariCabang(d, cabangId)) return k;
  return {
    ...k,
    dibuka: k.dibuka.includes(cabangId) ? k.dibuka : [...k.dibuka, cabangId],
    aktif: cabangId,
    kabar: null,
  };
}

/** Memegang kartu. Mengetuk kartu yang sama sekali lagi melepaskannya. Kartu yang sudah tersusun tidak bisa dipegang. */
export function pilihKartu(d: DataPeta, k: KeadaanPeta, kartuId: string): KeadaanPeta {
  if (!cariKartu(d, kartuId) || k.tersusun[kartuId]) return k;
  if (k.dipilih === kartuId) return { ...k, dipilih: null, kabar: null };
  return { ...k, dipilih: kartuId, kabar: { jenis: "info", teks: "Sekarang ketuk cabang yang cocok." } };
}

/**
 * Meletakkan kartu ke cabang. Cabang tujuan ikut terbuka.
 * Benar: kartu menempel. Salah: kartu tetap di baki dan muncul petunjuk, tanpa pengurangan apa pun.
 */
export function letakkan(d: DataPeta, k: KeadaanPeta, kartuId: string, cabangId: string): KeadaanPeta {
  const kartu = cariKartu(d, kartuId);
  const cabang = cariCabang(d, cabangId);
  if (!kartu || !cabang || k.tersusun[kartuId]) return k;
  const terbuka = bukaCabang(d, k, cabangId);
  if (kartu.cabang === cabangId) {
    return {
      ...terbuka,
      tersusun: { ...k.tersusun, [kartuId]: cabangId },
      dipilih: null,
      kabar: { jenis: "benar", teks: `Pas! ${kartu.teks} ada di cabang ${cabang.judul}.` },
    };
  }
  return { ...terbuka, dipilih: null, kabar: { jenis: "coba", teks: kartu.petunjuk } };
}

/** Mengetuk cabang: bila ada kartu dipegang, letakkan di sana; bila tidak, cukup buka cabangnya. */
export function ketukCabang(d: DataPeta, k: KeadaanPeta, cabangId: string): KeadaanPeta {
  if (k.dipilih) return letakkan(d, k, k.dipilih, cabangId);
  return bukaCabang(d, k, cabangId);
}

/** Mengembalikan kartu dari cabang ke baki. */
export function kembalikan(d: DataPeta, k: KeadaanPeta, kartuId: string): KeadaanPeta {
  if (!k.tersusun[kartuId]) return k;
  const sisa = { ...k.tersusun };
  delete sisa[kartuId];
  return { ...k, tersusun: sisa, kabar: null };
}

export const semuaDibuka = (d: DataPeta, k: KeadaanPeta) => d.cabang.every((c) => k.dibuka.includes(c.id));
export const jumlahTersusun = (k: KeadaanPeta) => Object.keys(k.tersusun).length;
export const semuaTersusun = (d: DataPeta, k: KeadaanPeta) => d.kartu.length > 0 && jumlahTersusun(k) === d.kartu.length;
export const kartuDiCabang = (d: DataPeta, k: KeadaanPeta, cabangId: string) =>
  d.kartu.filter((x) => k.tersusun[x.id] === cabangId);
export const kartuDiBaki = (d: DataPeta, k: KeadaanPeta) => d.kartu.filter((x) => !k.tersusun[x.id]);

/** Pemeriksaan bentuk data. Kosong berarti data sah. */
export function periksaDataPeta(d: DataPeta): string[] {
  const salah: string[] = [];
  if (!d.pusat?.judul || !d.pusat.suara) salah.push("pusat tidak lengkap");
  if (d.cabang.length < BATAS_CABANG.min || d.cabang.length > BATAS_CABANG.maks) {
    salah.push(`cabang harus ${BATAS_CABANG.min}-${BATAS_CABANG.maks}, ada ${d.cabang.length}`);
  }
  const idCabang = new Set<string>();
  for (const c of d.cabang) {
    if (idCabang.has(c.id)) salah.push(`id cabang ganda: ${c.id}`);
    idCabang.add(c.id);
    if (!c.judul || !c.ringkas || !c.suara) salah.push(`cabang ${c.id} tidak lengkap`);
  }
  const idKartu = new Set<string>();
  for (const x of d.kartu) {
    if (idKartu.has(x.id)) salah.push(`id kartu ganda: ${x.id}`);
    idKartu.add(x.id);
    if (!idCabang.has(x.cabang)) salah.push(`kartu ${x.id} menunjuk cabang yang tidak ada: ${x.cabang}`);
    if (!x.teks || !x.petunjuk) salah.push(`kartu ${x.id} tidak lengkap`);
  }
  for (const c of d.cabang) {
    if (!d.kartu.some((x) => x.cabang === c.id)) salah.push(`cabang ${c.id} tidak punya kartu`);
  }
  return salah;
}
