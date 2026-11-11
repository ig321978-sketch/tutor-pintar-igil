/* ------------------------------------------------------------------------ */
/* Logika murni Infografis ringkas (tanpa React, tanpa impor).                */
/* Paling banyak 3 panel, satu ide per panel. Anak mengetuk untuk membuka     */
/* isi atau membandingkan dua hal. Kemajuan dihitung dari ketukan, bukan      */
/* dari suara yang selesai diputar.                                           */
/* Diuji di Node: scripts/uji-infografis-ringkas.mjs                          */
/* ------------------------------------------------------------------------ */

export type KategoriInfo = { nama: string; jenis: string };

export type VisualInfo =
  | { jenis: "benda-sebar"; isi: [string, number][]; benih?: number }
  | { jenis: "benda-kelompok"; isi: [string, number][] }
  | { jenis: "turus"; n: number; warna?: string }
  | { jenis: "tabel-menurun"; judul?: string; kepala: [string, string]; baris: [string, number][] }
  | { jenis: "tabel-mendatar"; judul?: string; labelNama: string; labelBanyak: string; nama: string[]; nilai: number[] }
  | {
      jenis: "diagram";
      arah: "tegak" | "mendatar";
      kat: KategoriInfo[];
      jumlah: number[];
      lambang?: "benda" | "bulat" | "wajah";
      sorotMax?: number[];
      sorotMin?: number[];
    }
  | { jenis: "teks"; isi: string };

export type ButirInfo = {
  id: string;
  label: string;
  ikon: string;
  /** Satu kalimat pendek. */
  isi: string;
  visual?: VisualInfo;
  suara: string;
};

export type SisiInfo = {
  id: string;
  nama: string;
  ikon: string;
  catatan: string;
  visual: VisualInfo;
  suara: string;
};

export type PanelInfo =
  | { id: string; tipe: "buka"; judul: string; ide: string; suara: string; butir: ButirInfo[] }
  | { id: string; tipe: "banding"; judul: string; ide: string; suara: string; sisi: [SisiInfo, SisiInfo]; kesimpulan: string };

export type DataInfografis = {
  judul: string;
  suara: string;
  panel: PanelInfo[];
};

export type KeadaanInfo = {
  /** id panel -> id butir atau sisi yang sudah dibuka atau dilihat. */
  dilihat: Record<string, string[]>;
  /** id panel -> id butir atau sisi yang sedang tampil. */
  aktif: Record<string, string | null>;
};

export const MAKS_PANEL = 3;
export const MAKS_KOLOM_TABEL = 4;

export function awalInfo(): KeadaanInfo {
  return { dilihat: {}, aktif: {} };
}

const cariPanel = (d: DataInfografis, id: string) => d.panel.find((p) => p.id === id);

export const idItemPanel = (p: PanelInfo): string[] => (p.tipe === "buka" ? p.butir.map((b) => b.id) : p.sisi.map((s) => s.id));

/** Membuka satu butir atau melihat satu sisi. Item yang tidak dikenal diabaikan. */
export function lihat(d: DataInfografis, k: KeadaanInfo, panelId: string, itemId: string): KeadaanInfo {
  const p = cariPanel(d, panelId);
  if (!p || !idItemPanel(p).includes(itemId)) return k;
  const sudah = k.dilihat[panelId] ?? [];
  return {
    dilihat: { ...k.dilihat, [panelId]: sudah.includes(itemId) ? sudah : [...sudah, itemId] },
    aktif: { ...k.aktif, [panelId]: itemId },
  };
}

/** Panel selesai bila semua butir sudah dibuka, atau kedua sisi sudah dilihat. */
export function panelSelesai(p: PanelInfo, k: KeadaanInfo): boolean {
  const sudah = k.dilihat[p.id] ?? [];
  return idItemPanel(p).every((id) => sudah.includes(id));
}

export const jumlahSelesai = (d: DataInfografis, k: KeadaanInfo) => d.panel.filter((p) => panelSelesai(p, k)).length;
export const semuaSelesai = (d: DataInfografis, k: KeadaanInfo) => d.panel.length > 0 && jumlahSelesai(d, k) === d.panel.length;

function periksaVisual(v: VisualInfo | undefined, di: string, salah: string[]) {
  if (!v) return;
  if (v.jenis === "tabel-mendatar" && (v.nama.length > MAKS_KOLOM_TABEL || v.nama.length !== v.nilai.length)) {
    salah.push(`${di}: tabel mendatar harus selaras dan paling banyak ${MAKS_KOLOM_TABEL} kolom`);
  }
  if (v.jenis === "tabel-menurun" && v.baris.length > MAKS_KOLOM_TABEL) {
    salah.push(`${di}: tabel menurun paling banyak ${MAKS_KOLOM_TABEL} baris`);
  }
  if (v.jenis === "diagram" && (v.kat.length !== v.jumlah.length || v.kat.length > 4)) {
    salah.push(`${di}: diagram harus selaras dan paling banyak 4 kategori`);
  }
  if (v.jenis === "turus" && (v.n < 1 || v.n > 10)) salah.push(`${di}: turus di luar 1-10`);
}

/** Pemeriksaan bentuk data. Kosong berarti data sah. */
export function periksaDataInfografis(d: DataInfografis): string[] {
  const salah: string[] = [];
  if (!d.judul || !d.suara) salah.push("judul atau suara kosong");
  if (d.panel.length < 1 || d.panel.length > MAKS_PANEL) salah.push(`panel harus 1-${MAKS_PANEL}, ada ${d.panel.length}`);
  const idPanel = new Set<string>();
  for (const p of d.panel) {
    if (idPanel.has(p.id)) salah.push(`id panel ganda: ${p.id}`);
    idPanel.add(p.id);
    if (!p.judul || !p.ide || !p.suara) salah.push(`panel ${p.id} tidak lengkap`);
    if (p.tipe === "buka") {
      if (p.butir.length < 2 || p.butir.length > 4) salah.push(`panel ${p.id}: butir harus 2-4`);
      for (const b of p.butir) {
        if (!b.label || !b.isi || !b.suara) salah.push(`panel ${p.id}: butir ${b.id} tidak lengkap`);
        periksaVisual(b.visual, `${p.id}/${b.id}`, salah);
      }
    } else if (p.tipe === "banding") {
      if (p.sisi.length !== 2) salah.push(`panel ${p.id}: banding harus tepat 2 sisi`);
      if (!p.kesimpulan) salah.push(`panel ${p.id}: kesimpulan kosong`);
      for (const s of p.sisi) {
        if (!s.nama || !s.catatan || !s.suara) salah.push(`panel ${p.id}: sisi ${s.id} tidak lengkap`);
        periksaVisual(s.visual, `${p.id}/${s.id}`, salah);
      }
    } else {
      salah.push(`panel ${(p as { id: string }).id}: tipe tidak dikenal`);
    }
    const ids = idItemPanel(p);
    if (new Set(ids).size !== ids.length) salah.push(`panel ${p.id}: id butir atau sisi ganda`);
  }
  return salah;
}
