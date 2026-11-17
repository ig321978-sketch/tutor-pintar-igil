/**
 * Posisi belajar satu bab (logika murni). Tahap yang sudah terbuka tidak pernah mundur.
 * Diuji: scripts/uji-jejak-tahap.mjs.
 */

export const TAB_JEJAK = ["silabus", "materi", "simulasi", "latihan", "ujian"] as const;
export type TabJejak = (typeof TAB_JEJAK)[number];

export type JejakBab = {
  /** Huruf sub-bab yang seluruh tahapnya sudah selesai. */
  subSelesai: string[];
  /** Tahap tertinggi yang sudah terbuka di tiap sub-bab. 1 = Story. */
  tahap: Record<string, number>;
  subAktif: string;
  tab: TabJejak;
};

const HURUF = /^[A-Z]$/;

export function jejakKosong(): JejakBab {
  return { subSelesai: [], tahap: { A: 1 }, subAktif: "A", tab: "silabus" };
}

export function tahapAman(nilai: unknown): number {
  const angka = typeof nilai === "number" ? nilai : Number(nilai);
  if (!Number.isInteger(angka)) return 1;
  return Math.min(7, Math.max(1, angka));
}

function hurufAman(nilai: unknown): string | null {
  return typeof nilai === "string" && HURUF.test(nilai) ? nilai : null;
}

function tabAman(nilai: unknown): TabJejak {
  return TAB_JEJAK.includes(nilai as TabJejak) ? (nilai as TabJejak) : "silabus";
}

/** Data rusak menjadi jejak awal. Tidak melempar. */
export function uraiJejak(nilai: unknown): JejakBab {
  if (!nilai || typeof nilai !== "object" || Array.isArray(nilai)) return jejakKosong();
  const m = nilai as Partial<JejakBab>;
  const tahap: Record<string, number> = {};
  if (m.tahap && typeof m.tahap === "object" && !Array.isArray(m.tahap)) {
    for (const [k, v] of Object.entries(m.tahap)) {
      const h = hurufAman(k);
      if (h) tahap[h] = tahapAman(v);
    }
  }
  if (!tahap.A) tahap.A = 1;
  const subSelesai = Array.isArray(m.subSelesai)
    ? [...new Set(m.subSelesai.map(hurufAman).filter((h): h is string => h !== null))].sort()
    : [];
  for (const h of subSelesai) tahap[h] = 7;
  const subAktif = hurufAman(m.subAktif) ?? "A";
  return { subSelesai, tahap, subAktif, tab: tabAman(m.tab) };
}

export function jejakMasihAwal(j: JejakBab): boolean {
  return j.subSelesai.length === 0 && j.tab === "silabus" && Object.values(j.tahap).every((n) => n <= 1);
}

/** Yang lebih jauh menang. Tidak pernah menurunkan tahap atau mencabut sub-bab selesai. */
export function gabungJejak(a: JejakBab, b: JejakBab): JejakBab {
  const kiri = uraiJejak(a);
  const kanan = uraiJejak(b);
  const subSelesai = [...new Set([...kiri.subSelesai, ...kanan.subSelesai])].sort();
  const tahap: Record<string, number> = {};
  for (const h of new Set([...Object.keys(kiri.tahap), ...Object.keys(kanan.tahap), ...subSelesai])) {
    tahap[h] = Math.max(tahapAman(kiri.tahap[h] ?? 1), tahapAman(kanan.tahap[h] ?? 1));
  }
  for (const h of subSelesai) tahap[h] = 7;
  const subAktif = !subSelesai.includes(kanan.subAktif)
    ? kanan.subAktif
    : !subSelesai.includes(kiri.subAktif)
      ? kiri.subAktif
      : kanan.subAktif;
  const tab = kiri.tab === "silabus" ? kanan.tab : kanan.tab === "silabus" ? kiri.tab : kanan.tab;
  return { subSelesai, tahap, subAktif, tab };
}

export function bukaTahap(j: JejakBab, sub: string, nomor: number): JejakBab {
  const h = hurufAman(sub);
  if (!h) return j;
  const sekarang = tahapAman(j.tahap[h] ?? 1);
  const berikut = Math.max(sekarang, tahapAman(nomor));
  if (berikut === sekarang && j.subAktif === h && j.tab === "materi") return j;
  return { ...j, subAktif: h, tab: "materi", tahap: { ...j.tahap, [h]: berikut } };
}

export function selesaiSub(j: JejakBab, sub: string, urutan: readonly string[], tabAkhir: TabJejak = "latihan"): JejakBab {
  const h = hurufAman(sub);
  if (!h) return j;
  const subSelesai = j.subSelesai.includes(h) ? j.subSelesai : [...j.subSelesai, h].sort();
  const tahap = { ...j.tahap, [h]: 7 };
  const sisa = urutan.filter((id) => hurufAman(id) && !subSelesai.includes(id));
  const subAktif = sisa[0] ?? h;
  if (!tahap[subAktif]) tahap[subAktif] = 1;
  return { subSelesai, tahap, subAktif, tab: sisa.length > 0 ? "materi" : tabAkhir };
}

export function catatTab(j: JejakBab, tab: TabJejak, sub: string): JejakBab {
  const h = hurufAman(sub) ?? j.subAktif;
  if (j.tab === tab && j.subAktif === h) return j;
  return { ...j, tab, subAktif: h };
}

/** Tempat yang dibuka lagi: sub-bab berjalan yang tahapnya paling jauh, lalu tahap yang belum dituntaskan. */
export function tempatKembali(j: JejakBab, urutan: readonly string[]): { sub: string; tahap: number; tab: TabJejak } {
  const bersih = uraiJejak(j);
  const daftar = urutan.filter((id) => hurufAman(id));
  const sisa = daftar.filter((id) => !bersih.subSelesai.includes(id));
  const maju = sisa.filter((id) => tahapAman(bersih.tahap[id] ?? 1) > 1);
  const sub =
    maju.length > 0
      ? maju[maju.length - 1]
      : daftar.includes(bersih.subAktif) && sisa.includes(bersih.subAktif)
        ? bersih.subAktif
        : sisa[0] ?? daftar[daftar.length - 1] ?? "A";
  const tahap = bersih.subSelesai.includes(sub) ? 7 : tahapAman(bersih.tahap[sub] ?? 1);
  const mulai = !jejakMasihAwal(bersih);
  let tab: TabJejak = "silabus";
  if (sisa.length === 0 && mulai) {
    tab = bersih.tab === "ujian" || bersih.tab === "simulasi" || bersih.tab === "latihan" ? bersih.tab : "latihan";
  } else if (mulai) {
    tab = "materi";
  }
  return { sub, tahap, tab };
}
