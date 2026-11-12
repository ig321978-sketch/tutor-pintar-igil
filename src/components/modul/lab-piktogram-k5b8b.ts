/**
 * Lab Piktogram (Kelas 5 Bab 8, Sub-Bab B: Piktogram): logika murni. Satu alat, tiga tampilan.
 *  Kunci  : satu simbol mewakili nilai tertentu. Kunci dipilih, lalu diputuskan bisa atau tidak bisa dipakai untuk tabel frekuensi
 *           (Pictograph Scale Legend): sisa pembagian harus nol atau tepat setengah kunci (setengah simbol).
 *  Baca   : nilai = banyak simbol dikali kunci, dengan setengah simbol bernilai setengah kunci.
 *  Periksa: piktogram yang keliru dicari cacatnya (jumlah simbol tidak cocok tabel, ukuran simbol berbeda, kunci hilang)
 *           lalu diperbaiki (Unit Symbol Consistency dan Pictograph Error Hunt).
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 8 Sub-Bab B (kue apem Anggi, panen tomat, kunjungan perpustakaan).
 * Tidak membahas penyajian dengan sumbu atau garis ukur (itu Sub-Bab C). Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k5b8.mjs.
 */

export const KUNCI_PILIHAN = [2, 4, 5, 10, 20];
export const MAKS_SIMBOL = 8;
export const JENIS_CACAT = ["jumlah", "ukuran", "kunci"] as const;
export type JenisCacat = (typeof JENIS_CACAT)[number];
export const NAMA_CACAT: Record<JenisCacat, string> = {
  jumlah: "Jumlah simbol tidak cocok dengan tabel",
  ukuran: "Ada simbol yang ukurannya berbeda",
  kunci: "Kunci tidak ada",
};

export type DataPik = {
  nama: string;
  kategori: [string, string, string, string];
  /** Frekuensi dari tabel. */
  f: [number, number, number, number];
  /** Kunci pada piktogram untuk tampilan Baca dan Periksa. */
  kunciBaca: number;
  /** Kategori yang ditanyakan di tampilan Baca. */
  targetBaca: number;
  cacat: { jenis: JenisCacat; k: number };
};

export const DATA_PIK: DataPik[] = [
  { nama: "kue apem Anggi", kategori: ["Senin", "Selasa", "Rabu", "Kamis"], f: [8, 12, 4, 16], kunciBaca: 4, targetBaca: 3, cacat: { jenis: "jumlah", k: 1 } },
  { nama: "panen tomat", kategori: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"], f: [6, 10, 4, 8], kunciBaca: 4, targetBaca: 0, cacat: { jenis: "ukuran", k: 2 } },
  { nama: "pengunjung perpustakaan", kategori: ["Senin", "Selasa", "Rabu", "Kamis"], f: [15, 25, 10, 20], kunciBaca: 10, targetBaca: 0, cacat: { jenis: "kunci", k: -1 } },
  { nama: "siswa membawa bekal", kategori: ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4"], f: [12, 18, 6, 24], kunciBaca: 4, targetBaca: 1, cacat: { jenis: "jumlah", k: 0 } },
  { nama: "buku dipinjam", kategori: ["Dongeng", "Sains", "Cerita", "Kamus"], f: [20, 30, 10, 40], kunciBaca: 20, targetBaca: 1, cacat: { jenis: "ukuran", k: 3 } },
  { nama: "sepeda terjual", kategori: ["Januari", "Februari", "Maret", "April"], f: [5, 10, 15, 20], kunciBaca: 10, targetBaca: 2, cacat: { jenis: "kunci", k: -1 } },
];

export const idKunci = (i: number, k: number): string => `kunci:${i}:${k}`;
export const idTolak = (i: number, k: number): string => `tolak:${i}:${k}`;
export const idBaca = (i: number): string => `baca:${i}`;
export const idCacat = (i: number): string => `cacat:${i}`;
export const idPerbaiki = (i: number): string => `perbaiki:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const penuhBaris = (f: number, k: number): number => Math.floor(f / k);
export const sisaBaris = (f: number, k: number): number => f % k;
/** Satu baris bisa digambar bila sisa nol atau tepat setengah kunci. */
export const barisBisa = (f: number, k: number): boolean => sisaBaris(f, k) === 0 || 2 * sisaBaris(f, k) === k;
export const adaSetengahBaris = (f: number, k: number): boolean => sisaBaris(f, k) > 0 && 2 * sisaBaris(f, k) === k;
/** Banyak simbol yang tergambar pada satu baris, setengah simbol dihitung satu gambar. */
export const gambarBaris = (f: number, k: number): number => penuhBaris(f, k) + (sisaBaris(f, k) > 0 ? 1 : 0);
export const semuaBisa = (f: readonly number[], k: number): boolean => f.every((v) => barisBisa(v, k));
export const kunciBisa = (d: DataPik, k: number): boolean => semuaBisa(d.f, k) && d.f.every((v) => gambarBaris(v, k) <= MAKS_SIMBOL);
export const kunciAdaSetengah = (d: DataPik, k: number): boolean => kunciBisa(d, k) && d.f.some((v) => adaSetengahBaris(v, k));
export type AlasanTolak = { tipe: "sisa" | "banyak"; baris: number };
/** Alasan kunci ditolak, null bila bisa dipakai. Sisa lebih dulu daripada terlalu banyak simbol. */
export function alasanTolak(d: DataPik, k: number): AlasanTolak | null {
  const sisa = d.f.findIndex((v) => !barisBisa(v, k));
  if (sisa >= 0) return { tipe: "sisa", baris: sisa };
  const banyak = d.f.findIndex((v) => gambarBaris(v, k) > MAKS_SIMBOL);
  return banyak >= 0 ? { tipe: "banyak", baris: banyak } : null;
}
/** Nilai yang dibaca dari piktogram: banyak simbol utuh dikali kunci, ditambah setengah kunci bila ada setengah simbol. */
export const nilaiBaca = (penuh: number, setengah: boolean, k: number): number => penuh * k + (setengah ? k / 2 : 0);

export type PilihanBaca = { opsi: [number, number, number]; benar: number };
const putar3 = <T,>(a: [T, T, T], k: number): [T, T, T] => [a[k % 3], a[(k + 1) % 3], a[(k + 2) % 3]];
/** Tiga pilihan nilai untuk tampilan Baca: nilai benar, banyak gambar saja, dan satu gambar lebih (setengah dihitung penuh). */
export function opsiBaca(i: number): PilihanBaca {
  const d = DATA_PIK[i];
  const f = d.f[d.targetBaca];
  const k = d.kunciBaca;
  const dasar: [number, number, number] = [f, gambarBaris(f, k), (penuhBaris(f, k) + 1) * k];
  const susun = putar3(dasar, i);
  return { opsi: susun, benar: susun.indexOf(f) };
}
/** Tiga pilihan kunci untuk memperbaiki piktogram tanpa kunci: kunci yang cocok dan dua pengecoh. */
export function opsiKunciPeriksa(i: number): { opsi: [number, number, number]; benar: number } {
  const d = DATA_PIK[i];
  const lain = KUNCI_PILIHAN.filter((v) => v !== d.kunciBaca);
  const dasar: [number, number, number] = [d.kunciBaca, lain[i % lain.length], lain[(i + 1) % lain.length]];
  const susun = putar3(dasar, i + 1);
  return { opsi: susun, benar: susun.indexOf(d.kunciBaca) };
}

/** Banyak gambar yang terlihat pada baris k di tampilan Periksa. Cacat jumlah menambah satu gambar pada baris cacat. */
export function gambarPeriksa(d: DataPik, k: number): number {
  const n = gambarBaris(d.f[k], d.kunciBaca);
  return d.cacat.jenis === "jumlah" && d.cacat.k === k ? n + 1 : n;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StatePiktogramK5B8B = {
  kunci: { data: number; pilih: number | null };
  baca: { data: number };
  periksa: { data: number; ditemukan: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiPiktogramK5B8B =
  | { t: "K_DATA"; i: number }
  | { t: "K_PILIH"; k: number }
  | { t: "K_JAWAB"; jawab: string }
  | { t: "B_DATA"; i: number }
  | { t: "B_JAWAB"; o: number }
  | { t: "P_DATA"; i: number }
  | { t: "P_JENIS"; jenis: string }
  | { t: "P_TUNJUK"; k: number }
  | { t: "P_KUNCI"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalPiktogramK5B8B = (): StatePiktogramK5B8B => ({
  kunci: { data: 0, pilih: null },
  baca: { data: 0 },
  periksa: { data: 0, ditemukan: false },
  pernah: [],
  pesan: "",
});

export const dataKunci = (x: StatePiktogramK5B8B): DataPik => DATA_PIK[x.kunci.data];
export const dataBaca = (x: StatePiktogramK5B8B): DataPik => DATA_PIK[x.baca.data];
export const dataPeriksa = (x: StatePiktogramK5B8B): DataPik => DATA_PIK[x.periksa.data];

const uraiBaris = (nama: string, f: number, k: number): string => {
  const p = penuhBaris(f, k);
  const s = sisaBaris(f, k) > 0;
  return `${nama} ${f}: ${p > 0 ? `${p} simbol` : ""}${p > 0 && s ? " dan " : ""}${s ? "setengah simbol" : ""}`;
};

function jawabKunci(x: StatePiktogramK5B8B, jawab: string): StatePiktogramK5B8B {
  if (jawab !== "bisa" && jawab !== "tidak") return x;
  const k = x.kunci.pilih;
  if (k === null) return { ...x, pesan: "Pilih dulu kuncinya, baru putuskan." };
  const i = x.kunci.data;
  const d = DATA_PIK[i];
  const bisa = kunciBisa(d, k);
  const alasan = alasanTolak(d, k);
  if ((jawab === "bisa") === bisa) {
    if (bisa) {
      const setengah = kunciAdaSetengah(d, k);
      return {
        ...x,
        pernah: catat(x.pernah, idKunci(i, k)),
        pesan: `✅ Satu simbol = ${k}. ${d.kategori.map((n, j) => uraiBaris(n, d.f[j], k)).join("; ")}. ${setengah ? "Sisa tepat setengah kunci digambar setengah simbol." : "Semua frekuensi habis dibagi kunci, tidak ada sisa."}`,
      };
    }
    const j = alasan?.baris ?? 0;
    const sebab =
      alasan?.tipe === "banyak"
        ? `${d.kategori[j]} ${d.f[j]} butuh ${gambarBaris(d.f[j], k)} simbol, lebih dari ${MAKS_SIMBOL}, terlalu banyak untuk digambar rapi. Pilih kunci yang lebih besar.`
        : `${d.kategori[j]} ${d.f[j]} dibagi ${k} bersisa ${sisaBaris(d.f[j], k)}. Sisa itu bukan setengah kunci, jadi tidak bisa digambar. Setengah simbol hanya untuk sisa tepat setengah kunci.`;
    return { ...x, pernah: catat(x.pernah, idTolak(i, k)), pesan: `✅ Satu simbol = ${k} tidak bisa dipakai. ${sebab}` };
  }
  if (bisa) return { ...x, pesan: `Semua frekuensi bisa digambar dengan satu simbol = ${k}. Sisa pembagian nol atau tepat setengah kunci.` };
  return { ...x, pesan: alasan?.tipe === "banyak" ? `Ada baris yang butuh lebih dari ${MAKS_SIMBOL} simbol, terlalu banyak. Kunci ini belum cocok.` : `Periksa ${d.kategori[alasan?.baris ?? 0]} ${d.f[alasan?.baris ?? 0]}: dibagi ${k} bersisa ${sisaBaris(d.f[alasan?.baris ?? 0], k)}, bukan nol dan bukan setengah kunci. Kunci ini belum cocok.` };
}

function jawabBaca(x: StatePiktogramK5B8B, o: number): StatePiktogramK5B8B {
  if (!sah(o, 3)) return x;
  const i = x.baca.data;
  const d = DATA_PIK[i];
  const p = opsiBaca(i);
  const f = d.f[d.targetBaca];
  const k = d.kunciBaca;
  if (o === p.benar) {
    const setengah = sisaBaris(f, k) > 0;
    const pn = penuhBaris(f, k);
    const rumus = setengah ? `${pn} × ${k} + ${k / 2} = ${f}` : `${pn} × ${k} = ${f}`;
    return { ...x, pernah: catat(x.pernah, idBaca(i)), pesan: `✅ ${d.kategori[d.targetBaca]}: ${rumus}. ${setengah ? "Setengah simbol bernilai setengah kunci." : "Banyak simbol dikali kunci."}` };
  }
  const salah = p.opsi[o];
  return { ...x, pesan: salah === gambarBaris(f, k) ? "Itu banyak gambarnya saja. Nilai dihitung dari banyak simbol dikali kunci." : "Perhatikan setengah simbol: bernilai setengah kunci, bukan satu kunci penuh." };
}

function jenisCacat(x: StatePiktogramK5B8B, jenis: string): StatePiktogramK5B8B {
  if (!(JENIS_CACAT as readonly string[]).includes(jenis)) return x;
  const i = x.periksa.data;
  const d = DATA_PIK[i];
  if (jenis === d.cacat.jenis) {
    const arah =
      jenis === "jumlah"
        ? `Salah satu baris punya satu simbol terlalu banyak dibandingkan tabel.`
        : jenis === "ukuran"
          ? "Salah satu baris memakai simbol yang lebih besar dari simbol lain, padahal semua simbol harus sama bentuk dan ukuran."
          : "Piktogram tidak punya kunci, jadi simbolnya tidak punya nilai angka.";
    return { ...x, periksa: { ...x.periksa, ditemukan: true }, pernah: catat(x.pernah, idCacat(i)), pesan: `✅ ${NAMA_CACAT[jenis]}. ${arah} Sekarang perbaiki.` };
  }
  return { ...x, pesan: `Periksa lagi: ${d.cacat.jenis === "kunci" ? "adakah keterangan kunci di bawah gambar?" : d.cacat.jenis === "jumlah" ? "bandingkan banyak simbol tiap baris dengan tabel frekuensi." : "bandingkan ukuran semua simbol, apakah sama?"}` };
}

function tunjukCacat(x: StatePiktogramK5B8B, k: number): StatePiktogramK5B8B {
  if (!sah(k, 4)) return x;
  const i = x.periksa.data;
  const d = DATA_PIK[i];
  if (!x.periksa.ditemukan) return { ...x, pesan: "Tentukan dulu jenis cacatnya, baru perbaiki." };
  if (d.cacat.jenis === "kunci") return { ...x, pesan: "Cacatnya kunci yang hilang. Pilih kunci yang cocok dengan tabel." };
  if (k !== d.cacat.k) return { ...x, pesan: `Baris ${d.kategori[k]} sudah cocok dengan tabel dan simbolnya seragam. Cari baris yang lain.` };
  const nama = d.kategori[k];
  const f = d.f[k];
  const kb = d.kunciBaca;
  const pesan =
    d.cacat.jenis === "jumlah"
      ? `✅ ${nama} ${f} dibagi ${kb} = ${gambarBaris(f, kb)} simbol, bukan ${gambarBaris(f, kb) + 1}. Satu simbol dihapus supaya cocok dengan tabel.`
      : `✅ Simbol pada ${nama} terlalu besar. Semua simbol disamakan ukurannya supaya pembaca tidak tertipu.`;
  return { ...x, pernah: catat(x.pernah, idPerbaiki(i)), pesan };
}

function pilihKunciPeriksa(x: StatePiktogramK5B8B, o: number): StatePiktogramK5B8B {
  if (!sah(o, 3)) return x;
  const i = x.periksa.data;
  const d = DATA_PIK[i];
  if (!x.periksa.ditemukan) return { ...x, pesan: "Tentukan dulu jenis cacatnya, baru perbaiki." };
  if (d.cacat.jenis !== "kunci") return { ...x, pesan: "Piktogram ini sudah punya kunci. Cari cacat yang lain di barisnya." };
  const p = opsiKunciPeriksa(i);
  if (o === p.benar) {
    const baris = 0;
    return { ...x, pernah: catat(x.pernah, idPerbaiki(i)), pesan: `✅ Satu simbol = ${d.kunciBaca}: ${d.kategori[baris]} ${d.f[baris]} dibagi ${d.kunciBaca} ${sisaBaris(d.f[baris], d.kunciBaca) > 0 ? "menjadi simbol dan setengah simbol" : `= ${penuhBaris(d.f[baris], d.kunciBaca)} simbol`}, cocok dengan gambar. Kunci ditulis di bawah piktogram.` };
  }
  return { ...x, pesan: `Kunci ${p.opsi[o]} tidak cocok: banyak simbol dikali ${p.opsi[o]} tidak menghasilkan frekuensi pada tabel. Coba dari satu baris saja.` };
}

export function langkahPiktogramK5B8B(x: StatePiktogramK5B8B, a: AksiPiktogramK5B8B): StatePiktogramK5B8B {
  switch (a.t) {
    case "K_DATA":
      return sah(a.i, DATA_PIK.length) ? { ...x, kunci: { data: a.i, pilih: null }, pesan: "" } : x;
    case "K_PILIH":
      return KUNCI_PILIHAN.includes(a.k) ? { ...x, kunci: { ...x.kunci, pilih: a.k }, pesan: "" } : x;
    case "K_JAWAB":
      return jawabKunci(x, a.jawab);
    case "B_DATA":
      return sah(a.i, DATA_PIK.length) ? { ...x, baca: { data: a.i }, pesan: "" } : x;
    case "B_JAWAB":
      return jawabBaca(x, a.o);
    case "P_DATA":
      return sah(a.i, DATA_PIK.length) ? { ...x, periksa: { data: a.i, ditemukan: false }, pesan: "" } : x;
    case "P_JENIS":
      return jenisCacat(x, a.jenis);
    case "P_TUNJUK":
      return tunjukCacat(x, a.k);
    case "P_KUNCI":
      return pilihKunciPeriksa(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPiktogramK5B8B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPiktogramK5B8B = { alat: "piktogram"; pernah: string[] };
export const keadaanPiktogramK5B8B = (x: StatePiktogramK5B8B): KeadaanPiktogramK5B8B => ({ alat: "piktogram", pernah: x.pernah });

export const ucapKunciK5B8B = (x: StatePiktogramK5B8B): string => {
  const d = dataKunci(x);
  return `Tabel frekuensi ${d.nama}: ${d.kategori.map((n, j) => `${n} ${d.f[j]}`).join(", ")}. Pilih kunci, yaitu nilai satu simbol, lalu putuskan apakah semua frekuensi bisa digambar. Sisa pembagian harus nol atau tepat setengah kunci.`;
};
export const ucapBacaK5B8B = (x: StatePiktogramK5B8B): string => {
  const d = dataBaca(x);
  return `Piktogram ${d.nama}. Kuncinya satu simbol sama dengan ${d.kunciBaca}. Baca nilai ${d.kategori[d.targetBaca]}: banyak simbol dikali kunci, dan setengah simbol bernilai setengah kunci.`;
};
export const ucapPeriksaK5B8B = (x: StatePiktogramK5B8B): string => {
  const d = dataPeriksa(x);
  return `Piktogram ${d.nama} ini keliru. Cari cacatnya: jumlah simbol tidak cocok tabel, ukuran simbol berbeda, atau kunci hilang. Lalu perbaiki.`;
};
