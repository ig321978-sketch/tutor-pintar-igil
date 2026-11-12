/**
 * Lab Data Kelompok (Kelas 3 Bab 5, Sub-Bab A: Mengurutkan dan Membandingkan Data): logika murni. Satu alat, tiga tampilan.
 *  Kumpul     : lima anak, banyak benda tiap anak 1 sampai 12 (diatur −1/+1). Urutan, data terkecil, data terbesar,
 *               dan jangkauan DIHITUNG dari data. Bila ada yang sama banyak, semuanya ditandai.
 *  Bandingkan : ketuk dua anak. Selisihnya dihitung: "lebih banyak" atau "sama banyak".
 *  Cacah      : kartu nilai ulangan diketuk satu per satu; tiap kartu menjadi satu garis turus pada nilainya.
 *               Banyak tiap nilai, terkecil, terbesar, dan jangkauan dihitung dari kartu.
 * Penyajian dalam tabel tiga kolom, istilah kelompok lima, data huruf, dan manik baru dipakai di Sub-Bab B.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b5.mjs.
 */

export const NAMA_ANAK_K3B5 = ["Alen", "Meutia", "Galih", "Alfa", "Andi"] as const;
export const MIN_BENDA = 1;
export const MAKS_BENDA = 12;
/** Data awal: anak pertama bukan yang terkecil, jangkauan awal 6 (bukan 5), dan terbesar tunggal. */
export const DATA_AWAL_K3B5 = [6, 3, 9, 4, 7];

/** Nilai ulangan dari buku (20 data): nilai 9 muncul lima kali, nilai 10 dua kali. */
const DATA_ULANGAN = [9, 9, 7, 8, 6, 10, 5, 9, 8, 7, 7, 9, 6, 6, 6, 8, 9, 10, 7, 7];
/** Nilai kuis (15 data): tidak ada nilai 5, jadi data terkecil 6. */
const DATA_KUIS = [8, 6, 9, 9, 7, 10, 8, 8, 6, 9, 7, 8, 10, 8, 9];

export type IdCacah = "ulangan" | "kuis";
export const CACAH_K3B5: Record<IdCacah, { nama: string; data: number[] }> = {
  ulangan: { nama: "Nilai ulangan Matematika", data: DATA_ULANGAN },
  kuis: { nama: "Nilai kuis", data: DATA_KUIS },
};
export const DAFTAR_CACAH: IdCacah[] = ["ulangan", "kuis"];
/** Baris nilai yang disediakan: 5 sampai 10, seperti di buku. */
export const BARIS_NILAI = [5, 6, 7, 8, 9, 10];

/* ------------------------------ Pembantu hitung ------------------------------ */

export const terkecilK3B5 = (d: readonly number[]): number => Math.min(...d);
export const terbesarK3B5 = (d: readonly number[]): number => Math.max(...d);
export const jangkauanK3B5 = (d: readonly number[]): number => terbesarK3B5(d) - terkecilK3B5(d);
export const banyakNilaiK3B5 = (d: readonly number[], v: number): number => d.filter((x) => x === v).length;

/** Indeks data menurut urutan. Yang sama banyak tetap menurut urutan aslinya. */
export function urutanIndeks(d: readonly number[], arah: "kecil" | "besar"): number[] {
  return d.map((_, i) => i).sort((i, j) => (arah === "kecil" ? d[i] - d[j] : d[j] - d[i]) || i - j);
}

/** Indeks semua anak yang banyaknya sama dengan n. */
export const indeksBernilai = (d: readonly number[], n: number): number[] => d.map((x, i) => (x === n ? i : -1)).filter((i) => i >= 0);

/* ------------------------------ Keadaan ------------------------------ */

export type ArahUrut = "asal" | "kecil" | "besar";
export type TampilData = { urut: ArahUrut; ujung: boolean; jangkauan: boolean };

export type StateDataK3B5 = {
  anak: number[];
  tampil: TampilData;
  /** Anak yang dipilih di Bandingkan (paling banyak dua). */
  pilih: number[];
  cacah: IdCacah;
  /** Kartu yang sudah dicacah. */
  ketuk: boolean[];
  /** Data pernah diubah anak. */
  diubah: boolean;
  /** Riwayat yang tidak dicabut (untuk misi). */
  pernah: string[];
  pesan: string;
};

export type AksiDataK3B5 =
  | { t: "UBAH"; i: number; d: 1 | -1 }
  | { t: "URUT"; arah: ArahUrut }
  | { t: "TOGGLE"; rep: "ujung" | "jangkauan" }
  | { t: "PILIH"; i: number }
  | { t: "KARTU"; k: number }
  | { t: "CACAH"; id: IdCacah }
  | { t: "ULANG_CACAH" }
  | { t: "RESET" };

export const awalDataK3B5 = (): StateDataK3B5 => ({
  anak: [...DATA_AWAL_K3B5],
  tampil: { urut: "asal", ujung: false, jangkauan: false },
  pilih: [],
  cacah: "ulangan",
  ketuk: DATA_ULANGAN.map(() => false),
  diubah: false,
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

export const dataCacah = (x: StateDataK3B5): number[] => CACAH_K3B5[x.cacah].data;
/** Nilai kartu yang sudah dicacah. */
export const sudahCacah = (x: StateDataK3B5): number[] => dataCacah(x).filter((_, k) => x.ketuk[k]);
export const cacahLengkap = (x: StateDataK3B5): boolean => x.ketuk.length > 0 && x.ketuk.every(Boolean);

/** Catat riwayat dari keadaan sekarang. Dipanggil sesudah setiap aksi. */
function catat(x: StateDataK3B5): StateDataK3B5 {
  let p = x.pernah;
  if (x.diubah && x.tampil.urut !== "asal") p = tambah(p, `urut-${x.tampil.urut}`);
  if (x.tampil.ujung && x.tampil.urut === "asal" && x.anak[0] !== terkecilK3B5(x.anak)) p = tambah(p, "ujung-acak");
  if (x.tampil.ujung && indeksBernilai(x.anak, terbesarK3B5(x.anak)).length >= 2) p = tambah(p, "terbesar-sama");
  if (x.tampil.jangkauan) p = tambah(p, `jangkauan:${jangkauanK3B5(x.anak)}`);
  if (x.pilih.length === 2) p = tambah(p, `banding:${Math.abs(x.anak[x.pilih[0]] - x.anak[x.pilih[1]])}`);
  if (cacahLengkap(x)) p = tambah(p, `cacah:${x.cacah}`);
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahDataK3B5(x: StateDataK3B5, a: AksiDataK3B5): StateDataK3B5 {
  switch (a.t) {
    case "UBAH": {
      if (a.i < 0 || a.i >= x.anak.length) return x;
      const baru = x.anak[a.i] + a.d;
      if (baru < MIN_BENDA) return { ...x, pesan: `Setiap anak punya paling sedikit ${MIN_BENDA} benda.` };
      if (baru > MAKS_BENDA) return { ...x, pesan: `Di lab ini, setiap anak punya paling banyak ${MAKS_BENDA} benda.` };
      const anak = x.anak.map((n, i) => (i === a.i ? baru : n));
      return catat({ ...x, anak, diubah: true, pesan: "" });
    }
    case "URUT":
      return catat({ ...x, tampil: { ...x.tampil, urut: a.arah }, pesan: "" });
    case "TOGGLE":
      return catat({ ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" });
    case "PILIH": {
      if (a.i < 0 || a.i >= x.anak.length) return x;
      if (x.pilih.includes(a.i)) return { ...x, pilih: x.pilih.filter((i) => i !== a.i), pesan: "" };
      const pilih = x.pilih.length < 2 ? [...x.pilih, a.i] : [x.pilih[1], a.i];
      return catat({ ...x, pilih, pesan: "" });
    }
    case "KARTU": {
      if (a.k < 0 || a.k >= x.ketuk.length) return x;
      if (x.ketuk[a.k]) return { ...x, pesan: "Kartu ini sudah dicacah. Satu kartu hanya satu garis turus." };
      return catat({ ...x, ketuk: x.ketuk.map((b, k) => b || k === a.k), pesan: "" });
    }
    case "CACAH":
      return { ...x, cacah: a.id, ketuk: CACAH_K3B5[a.id].data.map(() => false), pesan: "" };
    case "ULANG_CACAH":
      return { ...x, ketuk: x.ketuk.map(() => false), pesan: "" };
    case "RESET":
      return awalDataK3B5();
  }
}

/* ------------------------------ Laporan untuk misi ------------------------------ */

export type KeadaanDataK3B5 = {
  alat: "data";
  anak: number[];
  urut: ArahUrut;
  ujung: boolean;
  jangkauan: boolean;
  pernah: string[];
};

export const keadaanDataK3B5 = (x: StateDataK3B5): KeadaanDataK3B5 => ({
  alat: "data",
  anak: x.anak,
  urut: x.tampil.urut,
  ujung: x.tampil.ujung,
  jangkauan: x.tampil.jangkauan,
  pernah: x.pernah,
});

/* ------------------------------ Teks dan ucapan ------------------------------ */

const daftarKata = (a: string[]): string => (a.length <= 1 ? (a[0] ?? "") : a.length === 2 ? `${a[0]} dan ${a[1]}` : `${a.slice(0, -1).join(", ")}, dan ${a[a.length - 1]}`);
export const namaAnakK3B5 = (i: number): string => NAMA_ANAK_K3B5[i] ?? `Anak ${i + 1}`;

/** Nama semua anak dengan banyak n, dipisah koma dan "dan". */
export const siapaBernilai = (d: readonly number[], n: number): string => daftarKata(indeksBernilai(d, n).map(namaAnakK3B5));

export function kalimatUjung(d: readonly number[]): { terkecil: string; terbesar: string } {
  const kecil = terkecilK3B5(d);
  const besar = terbesarK3B5(d);
  const nk = indeksBernilai(d, kecil).length;
  const nb = indeksBernilai(d, besar).length;
  return {
    terkecil: `Data terkecil ${kecil}: ${siapaBernilai(d, kecil)}${nk > 1 ? " (sama banyak)" : ""}`,
    terbesar: `Data terbesar ${besar}: ${siapaBernilai(d, besar)}${nb > 1 ? " (sama banyak)" : ""}`,
  };
}

export const kalimatJangkauan = (d: readonly number[]): string => `Jangkauan = ${terbesarK3B5(d)} − ${terkecilK3B5(d)} = ${jangkauanK3B5(d)}`;

/** Kalimat perbandingan dua anak yang dipilih, atau null bila belum dua. */
export function kalimatBanding(x: StateDataK3B5): string | null {
  if (x.pilih.length < 2) return null;
  const [i, j] = x.pilih;
  const a = x.anak[i];
  const b = x.anak[j];
  if (a === b) return `${namaAnakK3B5(i)} dan ${namaAnakK3B5(j)} sama banyak: ${a} benda. Selisihnya 0.`;
  const [besar, kecil] = a > b ? [i, j] : [j, i];
  const s = Math.abs(a - b);
  return `${namaAnakK3B5(besar)} punya ${s} benda lebih banyak daripada ${namaAnakK3B5(kecil)}: ${x.anak[besar]} − ${x.anak[kecil]} = ${s}.`;
}

/** Ringkasan cacah: banyak tiap nilai pada baris 5 sampai 10, dihitung dari kartu yang sudah dicacah. */
export function ringkasCacah(x: StateDataK3B5): { nilai: number; banyak: number }[] {
  const s = sudahCacah(x);
  return BARIS_NILAI.map((nilai) => ({ nilai, banyak: banyakNilaiK3B5(s, nilai) }));
}

/** Nilai yang paling sering muncul (bisa lebih dari satu) pada data lengkap. */
export function nilaiPalingSering(d: readonly number[]): { nilai: number[]; banyak: number } {
  const beda = [...new Set(d)].sort((p, q) => p - q);
  const banyak = Math.max(...beda.map((v) => banyakNilaiK3B5(d, v)));
  return { nilai: beda.filter((v) => banyakNilaiK3B5(d, v) === banyak), banyak };
}

export function kalimatCacahLengkap(d: readonly number[]): string {
  const p = nilaiPalingSering(d);
  const sering = p.nilai.length > 1 ? `nilai ${daftarKata(p.nilai.map(String))} sama-sama paling sering, masing-masing ${p.banyak} kali` : `nilai ${p.nilai[0]} paling sering, ${p.banyak} kali`;
  return `Semua ${d.length} kartu sudah dicacah. Terkecil ${terkecilK3B5(d)}, terbesar ${terbesarK3B5(d)}, jangkauan ${terbesarK3B5(d)} − ${terkecilK3B5(d)} = ${jangkauanK3B5(d)}. Lalu ${sering}.`;
}

export function ucapKumpul(x: StateDataK3B5): string {
  const urut = x.tampil.urut === "asal" ? x.anak : urutanIndeks(x.anak, x.tampil.urut).map((i) => x.anak[i]);
  const bag = [`Banyak benda ${x.tampil.urut === "kecil" ? "diurutkan dari terkecil" : x.tampil.urut === "besar" ? "diurutkan dari terbesar" : "menurut urutan duduk"}: ${urut.join(", ")}.`];
  if (x.tampil.ujung) {
    const u = kalimatUjung(x.anak);
    bag.push(`${u.terkecil}. ${u.terbesar}.`);
  }
  if (x.tampil.jangkauan) bag.push(`${kalimatJangkauan(x.anak)}.`);
  return bag.join(" ");
}

export const ucapBanding = (x: StateDataK3B5): string => kalimatBanding(x) ?? "Ketuk dua anak untuk membandingkan banyak bendanya.";

export function ucapCacah(x: StateDataK3B5): string {
  const d = dataCacah(x);
  if (cacahLengkap(x)) return kalimatCacahLengkap(d);
  const n = x.ketuk.filter(Boolean).length;
  return `Sudah ${n} dari ${d.length} kartu dicacah. Ketuk kartu berikutnya. Satu kartu, satu garis turus.`;
}
