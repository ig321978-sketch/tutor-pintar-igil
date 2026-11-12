/**
 * Lab Luas (Kelas 4 Bab 4, Sub-Bab A): logika murni. Satu alat, tiga tampilan.
 *  Tutup : meja kisi 4 baris × 6 kolom ditutup ubin (kartu 1 × 1, uang kertas 2 × 1, origami 2 × 2). Ubin yang keluar
 *          meja atau bertumpuk ditolak. Periksa: meja harus tertutup tanpa celah. Banyak ubin dihitung dari ubin terpasang.
 *  Kisi  : kertas berpetak 1 cm (5 baris × 6 kolom). Anak mengarsir sel; luas = banyak sel yang diarsir (cm²).
 *          Bila arsiran membentuk persegi panjang, lab membacanya sebagai baris × kolom.
 *  Ubah  : m² ke cm² dan sebaliknya. 1 m = 100 cm, jadi 1 m² = 100 × 100 = 10.000 cm². Pilihan jawaban dihitung.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b4.mjs.
 */

export type Ubin = { id: "kartu" | "uang" | "origami"; nama: string; lebar: number; tinggi: number };
export const UBIN: Ubin[] = [
  { id: "kartu", nama: "kartu", lebar: 1, tinggi: 1 },
  { id: "uang", nama: "uang kertas", lebar: 2, tinggi: 1 },
  { id: "origami", nama: "origami", lebar: 2, tinggi: 2 },
];
export const MEJA_BARIS = 4;
export const MEJA_KOLOM = 6;
export const KISI_BARIS = 5;
export const KISI_KOLOM = 6;
export const CM_PER_M = 100;
export const MAKS_UBAH = 5;

export type Pasang = { r: number; c: number };

/** Sel meja yang ditutup ubin di (r, c). */
export const selUbin = (u: Ubin, p: Pasang): Pasang[] => {
  const hasil: Pasang[] = [];
  for (let dr = 0; dr < u.tinggi; dr += 1) for (let dc = 0; dc < u.lebar; dc += 1) hasil.push({ r: p.r + dr, c: p.c + dc });
  return hasil;
};
/** Peta penutup meja: tiap sel berisi nomor ubin (mulai 1) atau 0 bila kosong. */
export const petaMeja = (ubin: Ubin, pasang: Pasang[]): number[][] => {
  const peta = Array.from({ length: MEJA_BARIS }, () => Array.from({ length: MEJA_KOLOM }, () => 0));
  pasang.forEach((p, i) => selUbin(ubin, p).forEach((s) => (peta[s.r][s.c] = i + 1)));
  return peta;
};
export const selKosong = (ubin: Ubin, pasang: Pasang[]): number => petaMeja(ubin, pasang).flat().filter((v) => v === 0).length;

/** Banyak sel yang diarsir. */
export const luasArsir = (arsir: boolean[][]): number => arsir.reduce((a, b) => a + b.filter(Boolean).length, 0);
/** Kotak terkecil yang memuat semua sel diarsir. */
export const kotakArsir = (arsir: boolean[][]): { r0: number; r1: number; c0: number; c1: number } | null => {
  let r0 = Infinity;
  let r1 = -1;
  let c0 = Infinity;
  let c1 = -1;
  arsir.forEach((baris, r) =>
    baris.forEach((v, c) => {
      if (!v) return;
      r0 = Math.min(r0, r);
      r1 = Math.max(r1, r);
      c0 = Math.min(c0, c);
      c1 = Math.max(c1, c);
    }),
  );
  return r1 < 0 ? null : { r0, r1, c0, c1 };
};
/** Semua sel diarsir saling bersambung (sisi bersentuhan). */
export const menyatu = (arsir: boolean[][]): boolean => {
  const sel: Pasang[] = [];
  arsir.forEach((b, r) => b.forEach((v, c) => v && sel.push({ r, c })));
  if (sel.length === 0) return false;
  const kunci = (r: number, c: number) => `${r},${c}`;
  const ada = new Set(sel.map((s) => kunci(s.r, s.c)));
  const lihat = new Set([kunci(sel[0].r, sel[0].c)]);
  const antre = [sel[0]];
  while (antre.length) {
    const s = antre.pop() as Pasang;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = kunci(s.r + dr, s.c + dc);
      if (ada.has(k) && !lihat.has(k)) {
        lihat.add(k);
        antre.push({ r: s.r + dr, c: s.c + dc });
      }
    }
  }
  return lihat.size === sel.length;
};
/** Bentuk digeser ke pojok kiri atas, sebagai teks (untuk membandingkan dua bentuk). */
export const bentukArsir = (arsir: boolean[][]): string => {
  const k = kotakArsir(arsir);
  if (!k) return "";
  const baris: string[] = [];
  for (let r = k.r0; r <= k.r1; r += 1) baris.push(arsir[r].slice(k.c0, k.c1 + 1).map((v) => (v ? "1" : "0")).join(""));
  return baris.join("/");
};
/** Persegi panjang penuh: {baris, kolom}, atau null. */
export const persegiPanjang = (arsir: boolean[][]): { baris: number; kolom: number } | null => {
  const k = kotakArsir(arsir);
  if (!k) return null;
  const baris = k.r1 - k.r0 + 1;
  const kolom = k.c1 - k.c0 + 1;
  return luasArsir(arsir) === baris * kolom ? { baris, kolom } : null;
};

/** Pilihan jawaban Ubah, dihitung dari n. Kunci selalu di indeks yang diputar oleh n. */
export const opsiUbah = (arah: "m2" | "cm2", n: number): number[] => {
  const sisi = CM_PER_M;
  const o = arah === "m2" ? [n * sisi * sisi, n * sisi, n * sisi * 10] : [n, n * sisi, n * 10];
  return o.map((_, i) => o[(i + n) % 3]);
};
export const kunciUbah = (arah: "m2" | "cm2", n: number): number => (arah === "m2" ? n * CM_PER_M * CM_PER_M : n);
export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Keadaan ------------------------------ */

export type StateLuasK4B4A = {
  ubin: number;
  pasang: Pasang[];
  arsir: boolean[][];
  bentuk13: string[];
  arah: "m2" | "cm2";
  n: number;
  pernah: string[];
  pesan: string;
};

export type AksiLuasK4B4A =
  | { t: "T_UBIN"; i: number }
  | { t: "T_TARUH"; r: number; c: number }
  | { t: "T_HAPUS" }
  | { t: "T_CEK" }
  | { t: "K_SEL"; r: number; c: number }
  | { t: "K_BERSIH" }
  | { t: "K_CEK" }
  | { t: "U_ARAH"; arah: "m2" | "cm2" }
  | { t: "U_N"; d: 1 | -1 }
  | { t: "U_JAWAB"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kisiKosong = (): boolean[][] => Array.from({ length: KISI_BARIS }, () => Array.from({ length: KISI_KOLOM }, () => false));

export const awalLuasK4B4A = (): StateLuasK4B4A => ({
  ubin: 0,
  pasang: [],
  arsir: kisiKosong(),
  bentuk13: [],
  arah: "m2",
  n: 1,
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function taruh(x: StateLuasK4B4A, r: number, c: number): StateLuasK4B4A {
  if (!Number.isInteger(r) || !Number.isInteger(c) || r < 0 || c < 0 || r >= MEJA_BARIS || c >= MEJA_KOLOM) return x;
  const u = UBIN[x.ubin];
  const sel = selUbin(u, { r, c });
  if (sel.some((s) => s.r >= MEJA_BARIS || s.c >= MEJA_KOLOM)) return { ...x, pesan: `${u.nama[0].toUpperCase()}${u.nama.slice(1)} keluar dari meja. Taruh lebih ke kiri atau ke atas.` };
  const peta = petaMeja(u, x.pasang);
  if (sel.some((s) => peta[s.r][s.c] !== 0)) {
    return { ...x, pernah: tambah(x.pernah, "tumpuk"), pesan: `Bertumpuk! Bagian meja itu sudah tertutup. Ubin yang bertumpuk membuat hitungan luas salah, jadi tidak boleh.` };
  }
  return { ...x, pasang: [...x.pasang, { r, c }], pesan: "" };
}

function cekTutup(x: StateLuasK4B4A): StateLuasK4B4A {
  const u = UBIN[x.ubin];
  if (x.pasang.length === 0) return { ...x, pesan: `Meja masih kosong. Ketuk kotak meja untuk menaruh ${u.nama}.` };
  const kosong = selKosong(u, x.pasang);
  if (kosong > 0) return { ...x, pesan: `Masih ada celah: ${kosong} kotak meja belum tertutup. Luas diukur tanpa celah.` };
  const pernah = tambah(x.pernah, `tutup:${u.id}`);
  const lain = UBIN.filter((v) => v.id !== u.id && pernah.includes(`tutup:${v.id}`)).map((v) => v.nama);
  const banding = lain.length ? ` Meja yang sama, banyaknya berbeda dengan ${lain.join(" dan ")} karena ukuran ubinnya berbeda.` : "";
  return { ...x, pernah, pesan: `✅ Meja tertutup ${x.pasang.length} ${u.nama} tanpa celah dan tanpa bertumpuk.${banding}` };
}

function cekKisi(x: StateLuasK4B4A): StateLuasK4B4A {
  const n = luasArsir(x.arsir);
  if (n === 0) return { ...x, pesan: "Belum ada sel yang diarsir. Ketuk sel kertas berpetak." };
  if (!menyatu(x.arsir)) return { ...x, pesan: "Sel yang diarsir harus menyatu menjadi satu bangun. Sambungkan selnya lewat sisi." };
  let pernah = tambah(x.pernah, `kisi:${n}`);
  let bentuk13 = x.bentuk13;
  let tambahan = "";
  if (n === 13) {
    const b = bentukArsir(x.arsir);
    if (!bentuk13.includes(b)) bentuk13 = [...bentuk13, b];
    if (bentuk13.length >= 2) {
      pernah = tambah(pernah, "kisi:13:beda");
      tambahan = " Bentuknya berbeda dari bangun 13 cm² sebelumnya, tetapi luasnya sama.";
    }
  }
  const pp = persegiPanjang(x.arsir);
  if (pp) {
    pernah = tambah(pernah, `pp:${pp.baris}x${pp.kolom}`);
    return { ...x, pernah, bentuk13, pesan: `✅ Persegi panjang ${pp.baris} baris, tiap baris ${pp.kolom} persegi: ${pp.baris} × ${pp.kolom} = ${n}. Luasnya ${n} cm².${tambahan}` };
  }
  return { ...x, pernah, bentuk13, pesan: `✅ Ada ${n} persegi satuan bersisi 1 cm. Luas bangun ini ${n} cm².${tambahan}` };
}

function jawabUbah(x: StateLuasK4B4A, nilai: number): StateLuasK4B4A {
  if (!opsiUbah(x.arah, x.n).includes(nilai)) return x;
  const kunci = kunciUbah(x.arah, x.n);
  if (nilai === kunci) {
    const id = x.arah === "m2" ? `ubah:m2:${x.n}` : `ubah:cm2:${x.n}`;
    const teks = x.arah === "m2" ? `${x.n} m² = ${x.n} × 10.000 = ${titik(kunci)} cm²` : `${titik(x.n * 10000)} cm² = ${x.n} m², sebab 10.000 cm² = 1 m²`;
    return { ...x, pernah: tambah(x.pernah, id), pesan: `✅ ${teks}. Sisi 1 m = 100 cm, jadi 1 m² = 100 × 100 = 10.000 cm².` };
  }
  if (nilai === x.n * CM_PER_M) {
    return { ...x, pernah: tambah(x.pernah, "seratus"), pesan: "Itu memakai 100 saja. 100 hanya panjang sisi 1 m dalam cm. Luas memakai dua sisi: 100 × 100 = 10.000." };
  }
  return { ...x, pesan: "Belum pas. Ingat 1 m² = 100 × 100 = 10.000 cm²." };
}

export function langkahLuasK4B4A(x: StateLuasK4B4A, a: AksiLuasK4B4A): StateLuasK4B4A {
  switch (a.t) {
    case "T_UBIN":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= UBIN.length) return x;
      return { ...x, ubin: a.i, pasang: [], pesan: "" };
    case "T_TARUH":
      return taruh(x, a.r, a.c);
    case "T_HAPUS":
      return { ...x, pasang: x.pasang.slice(0, -1), pesan: "" };
    case "T_CEK":
      return cekTutup(x);
    case "K_SEL": {
      if (!Number.isInteger(a.r) || !Number.isInteger(a.c) || a.r < 0 || a.c < 0 || a.r >= KISI_BARIS || a.c >= KISI_KOLOM) return x;
      const arsir = x.arsir.map((b, r) => (r === a.r ? b.map((v, c) => (c === a.c ? !v : v)) : b));
      return { ...x, arsir, pesan: "" };
    }
    case "K_BERSIH":
      return { ...x, arsir: kisiKosong(), pesan: "" };
    case "K_CEK":
      return cekKisi(x);
    case "U_ARAH":
      if (a.arah !== "m2" && a.arah !== "cm2") return x;
      return { ...x, arah: a.arah, pesan: "" };
    case "U_N": {
      const v = x.n + a.d;
      if (v < 1 || v > MAKS_UBAH) return { ...x, pesan: `Pilih 1 sampai ${MAKS_UBAH}.` };
      return { ...x, n: v, pesan: "" };
    }
    case "U_JAWAB":
      return jawabUbah(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalLuasK4B4A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanLuasK4B4A = { alat: "luas"; pernah: string[] };
export const keadaanLuasK4B4A = (x: StateLuasK4B4A): KeadaanLuasK4B4A => ({ alat: "luas", pernah: x.pernah });

export const ucapTutupK4B4A = (x: StateLuasK4B4A): string => {
  const u = UBIN[x.ubin];
  return `Meja 4 baris, tiap baris 6 kotak. Kamu menaruh ${x.pasang.length} ${u.nama}. Masih ${selKosong(u, x.pasang)} kotak kosong. Tutup tanpa celah dan tanpa bertumpuk.`;
};
export const ucapKisiK4B4A = (x: StateLuasK4B4A): string => `Kertas berpetak, tiap persegi bersisi 1 cm. Sudah diarsir ${luasArsir(x.arsir)} persegi. Luas = banyak persegi yang diarsir.`;
export const ucapUbahK4B4A = (x: StateLuasK4B4A): string =>
  x.arah === "m2" ? `${x.n} m² = … cm². Ingat 1 m = 100 cm.` : `${titik(x.n * 10000)} cm² = … m². Ingat 10.000 cm² = 1 m².`;
