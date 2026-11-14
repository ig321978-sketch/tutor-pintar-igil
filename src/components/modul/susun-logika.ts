/* ------------------------------------------------------------------------ */
/* Logika murni "susun tab" untuk Mind-Map dan Infografis tabel (tanpa React). */
/* Siswa menaruh tab acak ke tempat bernomor (peta konsep) atau ke baris dan   */
/* kolom tabel. Tab yang cocok menempel; tab yang belum cocok kembali ke baki   */
/* dengan petunjuk pendek, tanpa skor dan tanpa hukuman.                       */
/* Diuji di Node: scripts/uji-susun-logika.mjs, scripts/uji-susun-k4b1.mjs     */
/* ------------------------------------------------------------------------ */

/** Satu tab yang bisa dipegang siswa. Dua tab bisa berteks sama (mis. nilai tabel yang berulang); keduanya setara. */
export type TabSusun = { id: string; teks: string; ikon?: string; petunjuk?: string };

/** Satu tempat kosong (simpul bernomor atau sel tabel) beserta jawaban yang benar. */
export type TempatSusun = { id: string; jawaban: string; label: string };

export type KabarSusun = { jenis: "benar" | "coba" | "info"; teks: string };

export type KeadaanSusun = {
  /** id tempat -> id tab yang menempel di sana. */
  pasang: Record<string, string>;
  /** Tab yang sedang dipegang (diketuk) dan menunggu tempat tujuan. */
  dipilih: string | null;
  kabar: KabarSusun | null;
  /** Berapa kali tab dicoba di tempat yang belum cocok (hanya untuk umpan balik, bukan skor). */
  salah: number;
};

export const awalSusun = (): KeadaanSusun => ({ pasang: {}, dipilih: null, kabar: null, salah: 0 });

/* ------------------------------ Peta konsep ------------------------------ */

export type SimpulPeta = {
  id: string;
  /** Nomor putih di simpul kosong. Berurutan 1..n sesuai urutan di data. */
  nomor: number;
  /** Id simpul induk; null = langsung dari pusat peta. */
  induk: string | null;
  teks: string;
  ikon?: string;
  /** Petunjuk bila tab ini ditaruh di nomor yang belum cocok. */
  petunjuk?: string;
};

export type DataPetaSusun = {
  pusat: { judul: string; ikon: string; suara: string };
  petunjuk: string;
  simpul: SimpulPeta[];
};

export const BATAS_SIMPUL = { min: 5, maks: 14 } as const;
export const MAKS_KEDALAMAN = 3;

/* ------------------------------ Infografis tabel ------------------------------ */

export type BarisTabel = { label: string; sel: string[]; ikon?: string };

export type DataTabelSusun = {
  judul: string;
  petunjuk: string;
  suara: string;
  /** Tulisan di pojok kiri atas (judul kolom label baris), mis. "Tempat". */
  pojok: string;
  kolom: string[];
  baris: BarisTabel[];
};

export const BATAS_KOLOM_SUSUN = { min: 2, maks: 4 } as const;
export const BATAS_BARIS_SUSUN = { min: 2, maks: 6 } as const;
export const MAKS_PANJANG_SEL = 26;

export const idSel = (b: number, k: number) => `s${b + 1}-${k + 1}`;

/* ------------------------------ Normalisasi dan pengacakan ------------------------------ */

export const bersihTeks = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

/**
 * Urutan tab yang tetap (tanpa Math.random, supaya sama di server dan klien) dan tidak membiarkan tab
 * satu pun berada di urutan yang sama dengan nomornya. `n` tab, `benih` dari id sub-bab.
 */
export function urutanAcak(n: number, benih = 1): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  let s = (benih * 2654435761 + 12345) >>> 0;
  const acak = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(acak() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (n > 1) {
    for (let i = 0; i < n; i += 1) {
      if (a[i] === i) {
        const j = (i + 1) % n;
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    // Penukaran bisa menciptakan titik tetap baru; ulangi sampai bersih (n kecil, selesai cepat).
    for (let ulang = 0; ulang < n && a.some((v, i) => v === i); ulang += 1) {
      const i = a.findIndex((v, x) => v === x);
      const j = (i + 1) % n;
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  return a;
}

/** Tab dalam urutan acak tetap. `kunci` berurutan sesuai tempat; hasil memuat tab yang sama, urutannya diacak. */
export function acakTab(kunci: TabSusun[], benih = 1): TabSusun[] {
  return urutanAcak(kunci.length, benih).map((i) => kunci[i]);
}

/* ------------------------------ Turunan data ------------------------------ */

export function tabPeta(d: DataPetaSusun): TabSusun[] {
  return d.simpul.map((s) => ({ id: `t-${s.id}`, teks: s.teks, ikon: s.ikon, petunjuk: s.petunjuk }));
}

export function tempatPeta(d: DataPetaSusun): TempatSusun[] {
  return d.simpul.map((s) => ({ id: s.id, jawaban: s.teks, label: `nomor ${s.nomor}` }));
}

export function tabTabel(d: DataTabelSusun): TabSusun[] {
  return d.baris.flatMap((b, bi) => b.sel.map((teks, ki) => ({ id: `t-${idSel(bi, ki)}`, teks })));
}

export function tempatTabel(d: DataTabelSusun): TempatSusun[] {
  return d.baris.flatMap((b, bi) => b.sel.map((teks, ki) => ({ id: idSel(bi, ki), jawaban: teks, label: `${b.label}, ${d.kolom[ki]}` })));
}

/* ------------------------------ Aksi ------------------------------ */

const cariTab = (tabs: TabSusun[], id: string) => tabs.find((t) => t.id === id);
const cariTempat = (tempat: TempatSusun[], id: string) => tempat.find((t) => t.id === id);

export const tabDiBaki = (tabs: TabSusun[], k: KeadaanSusun): TabSusun[] => {
  const terpakai = new Set(Object.values(k.pasang));
  return tabs.filter((t) => !terpakai.has(t.id));
};

export const tabDiTempat = (tabs: TabSusun[], k: KeadaanSusun, tempatId: string): TabSusun | null => {
  const id = k.pasang[tempatId];
  return id ? cariTab(tabs, id) ?? null : null;
};

export const jumlahPasang = (k: KeadaanSusun) => Object.keys(k.pasang).length;
export const semuaPasang = (tempat: TempatSusun[], k: KeadaanSusun) => tempat.every((t) => Boolean(k.pasang[t.id]));

/** Memegang tab. Mengetuk tab yang sama lagi melepaskannya. Tab yang sudah menempel tidak bisa dipegang. */
export function pilihTab(tabs: TabSusun[], k: KeadaanSusun, tabId: string): KeadaanSusun {
  if (!cariTab(tabs, tabId) || Object.values(k.pasang).includes(tabId)) return k;
  if (k.dipilih === tabId) return { ...k, dipilih: null, kabar: null };
  return { ...k, dipilih: tabId, kabar: { jenis: "info", teks: "Sekarang ketuk tempat yang cocok." } };
}

/**
 * Menaruh tab di tempat. Cocok: menempel. Belum cocok: tab kembali ke baki dengan petunjuk.
 * Tab berteks sama dianggap setara, jadi nilai kembar di tabel boleh tertukar.
 */
export function letakkanTab(tabs: TabSusun[], tempat: TempatSusun[], k: KeadaanSusun, tabId: string, tempatId: string): KeadaanSusun {
  const tab = cariTab(tabs, tabId);
  const tp = cariTempat(tempat, tempatId);
  if (!tab || !tp || Object.values(k.pasang).includes(tabId)) return k;
  if (k.pasang[tempatId]) {
    return { ...k, dipilih: null, kabar: { jenis: "info", teks: "Tempat ini sudah terisi. Ketuk tab di dalamnya bila ingin menggantinya." } };
  }
  if (bersihTeks(tab.teks) !== bersihTeks(tp.jawaban)) {
    return {
      ...k,
      dipilih: null,
      salah: k.salah + 1,
      kabar: { jenis: "coba", teks: tab.petunjuk ?? `Belum cocok di ${tp.label}. Coba tempat lain.` },
    };
  }
  return { ...k, pasang: { ...k.pasang, [tempatId]: tabId }, dipilih: null, kabar: { jenis: "benar", teks: `${tab.teks} cocok di ${tp.label}.` } };
}

/** Mengembalikan tab dari tempat ke baki. */
export function kembalikanTab(k: KeadaanSusun, tempatId: string): KeadaanSusun {
  if (!k.pasang[tempatId]) return k;
  const pasang = { ...k.pasang };
  delete pasang[tempatId];
  return { ...k, pasang, dipilih: null, kabar: null };
}

/* ------------------------------ Pemeriksaan data ------------------------------ */

/** Kedalaman simpul (anak langsung pusat = 1). -1 bila rantai induk rusak atau berputar. */
export function kedalaman(d: DataPetaSusun, id: string): number {
  let n = 0;
  let cur: string | null = id;
  const lihat = new Set<string>();
  while (cur !== null) {
    if (lihat.has(cur)) return -1;
    lihat.add(cur);
    const s = d.simpul.find((x) => x.id === cur);
    if (!s) return -1;
    n += 1;
    cur = s.induk;
  }
  return n;
}

export function periksaPeta(d: DataPetaSusun): string[] {
  const salah: string[] = [];
  const n = d.simpul.length;
  if (n < BATAS_SIMPUL.min || n > BATAS_SIMPUL.maks) salah.push(`jumlah simpul ${n} di luar ${BATAS_SIMPUL.min}-${BATAS_SIMPUL.maks}`);
  if (new Set(d.simpul.map((s) => s.id)).size !== n) salah.push("id simpul tidak unik");
  d.simpul.forEach((s, i) => {
    if (s.nomor !== i + 1) salah.push(`nomor simpul ${s.id} harus ${i + 1}`);
    if (!s.teks.trim()) salah.push(`teks simpul ${s.id} kosong`);
    const dalam = kedalaman(d, s.id);
    if (dalam < 1 || dalam > MAKS_KEDALAMAN) salah.push(`kedalaman simpul ${s.id} tidak sah (${dalam})`);
    if (s.induk !== null && d.simpul.findIndex((x) => x.id === s.induk) >= i) salah.push(`induk simpul ${s.id} harus muncul lebih dulu`);
  });
  if (!d.simpul.some((s) => s.induk === null)) salah.push("tidak ada cabang dari pusat");
  const teks = d.simpul.map((s) => bersihTeks(s.teks));
  if (new Set(teks).size !== teks.length) salah.push("teks simpul kembar (tab jadi ambigu)");
  return salah;
}

export function periksaTabel(d: DataTabelSusun): string[] {
  const salah: string[] = [];
  const k = d.kolom.length;
  if (k < BATAS_KOLOM_SUSUN.min || k > BATAS_KOLOM_SUSUN.maks) salah.push(`jumlah kolom ${k} di luar ${BATAS_KOLOM_SUSUN.min}-${BATAS_KOLOM_SUSUN.maks}`);
  if (d.baris.length < BATAS_BARIS_SUSUN.min || d.baris.length > BATAS_BARIS_SUSUN.maks) salah.push(`jumlah baris ${d.baris.length} di luar ${BATAS_BARIS_SUSUN.min}-${BATAS_BARIS_SUSUN.maks}`);
  d.baris.forEach((b, i) => {
    if (b.sel.length !== k) salah.push(`baris ${i + 1} punya ${b.sel.length} sel, kolom ${k}`);
    if (!b.label.trim()) salah.push(`label baris ${i + 1} kosong`);
    b.sel.forEach((s, j) => {
      if (!s.trim()) salah.push(`sel ${i + 1}-${j + 1} kosong`);
      if (s.length > MAKS_PANJANG_SEL) salah.push(`sel ${i + 1}-${j + 1} terlalu panjang (${s.length})`);
    });
  });
  if (new Set(d.kolom.map(bersihTeks)).size !== k) salah.push("judul kolom kembar");
  if (new Set(d.baris.map((b) => bersihTeks(b.label))).size !== d.baris.length) salah.push("label baris kembar");
  // Tabel yang tiap barisnya sama persis tidak melatih apa pun.
  const barisUnik = new Set(d.baris.map((b) => b.sel.map(bersihTeks).join("|")));
  if (barisUnik.size < Math.min(2, d.baris.length)) salah.push("baris tabel semuanya sama");
  return salah;
}
