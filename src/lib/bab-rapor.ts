/**
 * Rapor per BAB (bukan per mata pelajaran): siswa bebas memilih bab apa pun dari mata pelajaran dan kelas mana pun.
 * Logika murni tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bab-rapor.mjs.
 * Kode bab mengikuti alamat modul, misalnya "mtk-1-bab3" = Matematika Kelas 1 Bab 3.
 */
import { ringkasBab, type GudangCapaian, type RingkasBab } from "./capaian";

export type InfoKodeBab = { mapel: string; kelas: number; nomor: number };

const NAMA_MAPEL: Record<string, string> = { mtk: "Matematika" };

/** Jumlah Sub-Bab tiap bab yang sudah punya modul resmi (mengikuti daftar isi buku siswa). Bab lain: 0 = belum diketahui. */
export const TOTAL_SUBBAB: Record<string, number> = {
  "mtk-1-bab1": 4,
  "mtk-1-bab2": 3,
  "mtk-1-bab3": 4,
  "mtk-1-bab4": 3,
  "mtk-1-bab5": 4,
  "mtk-1-bab6": 3,
  "mtk-1-bab7": 2,
  "mtk-1-bab8": 2,
};

/** Uraikan kode bab. Null bila bentuknya bukan "<mapel>-<kelas>-bab<nomor>" (misalnya halaman uji atau draf). */
export function uraiKodeBab(kode: string): InfoKodeBab | null {
  const m = /^([a-z]+)-(\d{1,2})-bab(\d{1,2})$/.exec(kode);
  if (!m) return null;
  return { mapel: NAMA_MAPEL[m[1]] ?? m[1].toUpperCase(), kelas: Number(m[2]), nomor: Number(m[3]) };
}

/** Label singkat di atas kartu bab, misalnya "Matematika · Kelas 1". */
export function labelBab(kode: string): string {
  const i = uraiKodeBab(kode);
  return i ? `${i.mapel} · Kelas ${i.kelas}` : kode;
}

export type BabRapor = { kode: string; ringkas: RingkasBab; subSelesai: string[]; diperbarui: string };

/**
 * Bab yang pernah dikerjakan siswa, dipisah menjadi "sedang dipelajari" dan "sudah tuntas" (Ujian 100%).
 * Hanya bab berkode resmi yang dihitung. Terbaru dikerjakan tampil paling atas.
 */
export function babDariCapaian(g: GudangCapaian, tuntas: ReadonlySet<string>): { aktif: BabRapor[]; selesai: BabRapor[] } {
  const semua = new Set<string>([...Object.keys(g), ...tuntas]);
  const daftar: BabRapor[] = [];
  for (const kode of semua) {
    if (!uraiKodeBab(kode)) continue;
    const c = g[kode];
    const r = ringkasBab(c, Math.max(TOTAL_SUBBAB[kode] ?? 0, 0));
    // Ujian lulus dari catatan lama tetap dihitung tuntas walau catatan baru belum ada.
    const ringkas = tuntas.has(kode) && !r.ujianSempurna ? { ...r, ujianSempurna: true, mulai: true } : r;
    if (!ringkas.mulai) continue;
    daftar.push({ kode, ringkas, subSelesai: c?.subBab ?? [], diperbarui: c?.diperbarui ?? "" });
  }
  const terbaru = (a: BabRapor, b: BabRapor) => (a.diperbarui < b.diperbarui ? 1 : a.diperbarui > b.diperbarui ? -1 : a.kode.localeCompare(b.kode));
  return {
    aktif: daftar.filter((b) => !b.ringkas.ujianSempurna).sort(terbaru),
    selesai: daftar.filter((b) => b.ringkas.ujianSempurna).sort(terbaru),
  };
}

/** Huruf Sub-Bab yang ditampilkan di kartu: semua huruf bila jumlah Sub-Bab diketahui, selain itu hanya yang sudah selesai. */
export function hurufSubBab(kode: string, subSelesai: readonly string[]): string[] {
  const total = TOTAL_SUBBAB[kode] ?? 0;
  if (total > 0) return "ABCDEFGH".slice(0, total).split("");
  return [...subSelesai].sort();
}
