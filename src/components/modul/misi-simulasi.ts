/**
 * Misi dan tantangan bebas untuk simulasi bertahap (pola "hibrida"). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Aturan:
 *  - Tiap misi punya `cek(keadaan)` yang memeriksa keadaan laboratorium. Misi yang sudah tercapai tetap tercapai
 *    (tidak dicabut lagi), jadi anak bebas mengubah laboratorium setelahnya.
 *  - Misi `wajib` menentukan gerbang tombol lanjut. Misi bukan wajib adalah tantangan bebas, tidak menahan siapa pun.
 *  - Gerbang bisa dilewati: setelah anak menyentuh simulasinya sekali, ia boleh memilih "lewati misi".
 *    Simulasi tidak memberi Poin Kualifikasi dan tidak boleh menahan anak.
 */

export type DefMisi<K> = {
  id: string;
  teks: string;
  /** true: ikut menentukan gerbang. false: tantangan bebas. */
  wajib: boolean;
  cek: (keadaan: K) => boolean;
};

/** Bentuk yang cukup untuk ditampilkan di papan misi. */
export type MisiTampil = { id: string; teks: string; wajib: boolean };

/** Id misi yang baru tercapai oleh keadaan ini dan belum tercatat. */
export function misiBaru<K>(daftar: readonly DefMisi<K>[], keadaan: K, sudah: ReadonlySet<string>): string[] {
  return daftar.filter((m) => !sudah.has(m.id) && m.cek(keadaan)).map((m) => m.id);
}

/** Semua misi wajib sudah tercapai. Daftar tanpa misi wajib dianggap selesai. */
export function wajibSelesai(daftar: readonly MisiTampil[], sudah: ReadonlySet<string>): boolean {
  return daftar.filter((m) => m.wajib).every((m) => sudah.has(m.id));
}

export function hitungMisi(daftar: readonly MisiTampil[], sudah: ReadonlySet<string>): { wajibTercapai: number; wajibTotal: number; bebasTercapai: number; bebasTotal: number } {
  const wajib = daftar.filter((m) => m.wajib);
  const bebas = daftar.filter((m) => !m.wajib);
  return {
    wajibTercapai: wajib.filter((m) => sudah.has(m.id)).length,
    wajibTotal: wajib.length,
    bebasTercapai: bebas.filter((m) => sudah.has(m.id)).length,
    bebasTotal: bebas.length,
  };
}

/**
 * Apakah tombol lanjut boleh aktif.
 *  - Simulasi tanpa daftar misi: cukup disentuh sekali (perilaku lama).
 *  - Simulasi dengan misi: semua misi wajib tercapai, atau anak memilih melewati setelah menyentuh simulasinya.
 */
export function bolehLanjut(o: { adaMisi: boolean; wajibSelesai: boolean; dilewati: boolean; disentuh: boolean }): boolean {
  if (!o.adaMisi) return o.disentuh;
  return o.wajibSelesai || (o.dilewati && o.disentuh);
}

/** Tombol "lewati misi" baru muncul setelah simulasi disentuh dan misi wajib belum selesai. */
export function bolehLewati(o: { adaMisi: boolean; wajibSelesai: boolean; dilewati: boolean; disentuh: boolean }): boolean {
  return o.adaMisi && o.disentuh && !o.wajibSelesai && !o.dilewati;
}

export function ucapanMisi(daftar: readonly MisiTampil[], sudah: ReadonlySet<string>): string {
  const h = hitungMisi(daftar, sudah);
  const sisa = daftar.filter((m) => m.wajib && !sudah.has(m.id));
  if (sisa.length === 0) return `Hebat! Semua ${h.wajibTotal} misi wajib sudah tercapai. Kamu boleh lanjut, atau coba tantangan bebas.`;
  return `Misi wajib ${h.wajibTercapai} dari ${h.wajibTotal} tercapai. Yang berikutnya: ${sisa[0].teks}`;
}

/** Keadaan yang dilaporkan alat bertipe mesin keadaan atau skenario saat tuntas (lihat LabBertahap). */
export type KeadaanSelesai = { alat: "selesai"; id: string };

/** Laporkan semua misi yang terpenuhi keadaan ini. Aman dipanggil berulang (capai idempoten). */
export function laporMisi<K>(daftar: readonly DefMisi<K>[], keadaan: K, capai: (id: string) => void): void {
  for (const d of daftar) if (d.cek(keadaan)) capai(d.id);
}

/** Bentuk papan misi (tanpa fungsi cek) dari daftar definisi. */
export const tampilMisi = <K>(daftar: readonly DefMisi<K>[]): MisiTampil[] => daftar.map(({ id, teks, wajib }) => ({ id, teks, wajib }));