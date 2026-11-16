import { CEK, hitungJatuhTempo, kotakBerikut, lulusCek, type CatatanCek, type StatusSkill } from "./skema";

export type Gudang = { getItem(k: string): string | null; setItem(k: string, v: string): void };
const kunci = (skillId: string) => `igil.belajar.${skillId}.v1`;

export type Tersimpan = { status: StatusSkill; catatan: CatatanCek[] };

export function baca(g: Gudang, skillId: string): Tersimpan {
  try {
    const t = g.getItem(kunci(skillId));
    if (t) return JSON.parse(t) as Tersimpan;
  } catch {
    /* abaikan: data rusak atau penyimpanan tidak tersedia */
  }
  return { status: { skillId, kotak: 0, lulusTerakhir: null, jatuhTempo: null }, catatan: [] };
}

/** Hanya hasil cek pelabuhan yang disimpan (bukan jawaban latihan). */
export function catatCek(g: Gudang, skillId: string, benar: number, miskonsepsi: string[], sekarang = new Date()): Tersimpan {
  const lama = baca(g, skillId);
  const lulus = lulusCek(benar);
  const kotak = kotakBerikut(lama.status.kotak, lulus);
  const status: StatusSkill = {
    skillId,
    kotak,
    lulusTerakhir: lulus ? sekarang.toISOString() : lama.status.lulusTerakhir,
    jatuhTempo: lulus ? hitungJatuhTempo(lama.status.kotak, sekarang).toISOString() : null,
  };
  const catatan = [...lama.catatan, { skillId, tanggal: sekarang.toISOString(), benar, miskonsepsiTerdeteksi: miskonsepsi }].slice(-30);
  const baru = { status, catatan };
  try {
    g.setItem(kunci(skillId), JSON.stringify(baru));
  } catch {
    /* penyimpanan penuh atau diblokir: lanjut tanpa menyimpan */
  }
  return baru;
}

export { CEK };

/**
 * Hasil ulangan harian untuk satu skill. Benar pada percobaan pertama menaikkan kotak; selain itu kembali ke kotak 0
 * dan diulang besok. Tidak ada skor: hanya jadwal ulang dan catatan miskonsepsi.
 */
export function catatUlangan(g: Gudang, skillId: string, benarPertama: boolean, miskonsepsi: string | null, sekarang = new Date()): Tersimpan {
  const lama = baca(g, skillId);
  const kotak = kotakBerikut(lama.status.kotak, benarPertama);
  const status: StatusSkill = {
    skillId,
    kotak,
    lulusTerakhir: benarPertama ? sekarang.toISOString() : lama.status.lulusTerakhir,
    jatuhTempo: (benarPertama ? hitungJatuhTempo(lama.status.kotak, sekarang) : hitungJatuhTempo(0, sekarang)).toISOString(),
  };
  const catatan: CatatanCek[] = miskonsepsi ? [...lama.catatan, { skillId, tanggal: sekarang.toISOString(), benar: benarPertama ? 1 : 0, miskonsepsiTerdeteksi: [miskonsepsi] }].slice(-30) : lama.catatan;
  const baru = { status, catatan };
  try {
    g.setItem(kunci(skillId), JSON.stringify(baru));
  } catch {
    /* penyimpanan penuh atau diblokir: lanjut tanpa menyimpan */
  }
  return baru;
}

/** Skill yang sudah lulus dan jatuh tempo (atau lewat) pada saat `sekarang`. */
export function jatuhTempo(g: Gudang, skillIds: string[], sekarang = new Date()): string[] {
  return skillIds.filter((id) => {
    const s = baca(g, id).status;
    return s.lulusTerakhir !== null && s.jatuhTempo !== null && new Date(s.jatuhTempo).getTime() <= sekarang.getTime();
  });
}
