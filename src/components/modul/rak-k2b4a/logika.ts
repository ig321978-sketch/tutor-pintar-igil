/**
 * Logika murni Simulasi Rak Pameran Kelas 2 Bab 4 Sub-Bab A "Rak Pameran Pak Hasan" (posisi benda), awal cerita Pameran Kerajinan Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-rak-k2b4a.mjs. Eksplorasi bebas tanpa skor. Tidak mengimpor berkas lain.
 * Tiga alat untuk satu rak: Taruh (menaruh benda ke petak sesuai kartu denah, lalu melihat kalimat lawannya), Baca (kanan dan kiri sesuai posisi pembaca,
 * dengan anak yang membelakangi kita) dan Gabung (dua petunjuk digabung sampai tinggal satu benda). Data benda ada di data-peta.ts (berbeda dari Story).
 */

export type Sisi = "atas" | "bawah" | "kiri" | "kanan";
/** Satu karya: `kol` dan `bar` adalah petak tujuannya di rak (kolom dari kiri, baris dari atas, mulai nol). `kartu` menyebut letaknya terhadap karya acuan. */
export type BendaSim = { id: string; nama: string; emoji: string; warna: string; kol: number; bar: number; kartu?: { kata: Sisi; acuan: number } };
/** Tugas Baca: ketuk benda yang ada di sebelah `kata` dari benda acuan, dilihat dari posisi pembaca (anak yang membelakangi kita). */
export type TugasBaca = { acuan: number; kata: "kiri" | "kanan"; jawab: number };
/** Satu petunjuk teka-teki gabungan: baris (tingkat) atau sisi terhadap benda acuan. */
export type PetunjukSim = { j: "tingkat"; bar: number } | { j: "rel"; kata: Sisi; acuan: number };
export type TekaSim = { petunjuk: [PetunjukSim, PetunjukSim]; jawab: number };
export type ModeRak = "taruh" | "baca" | "gabung";

export type KeadaanRak = {
  alat: "rak";
  mode: ModeRak;
  /** Benda di baki yang sedang dipegang (nomor dalam daftar), -1 bila belum ada. */
  pilih: number;
  /** Benda yang sudah ditaruh di petaknya yang tepat. */
  terpasang: number[];
  /** Benda yang kalimat lawannya sudah dilihat. */
  lawanLihat: number[];
  /** Tugas Baca yang sudah selesai, dan banyak jawaban kanan dan kiri yang benar. */
  baca: number[];
  kananBenar: number;
  kiriBenar: number;
  /** Teka-teki Gabung yang sudah selesai. */
  gabung: number[];
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salahTaruh: number;
  salahBaca: number;
  salahGabung: number;
};

export const awalRak = (): KeadaanRak => ({
  alat: "rak",
  mode: "taruh",
  pilih: -1,
  terpasang: [],
  lawanLihat: [],
  baca: [],
  kananBenar: 0,
  kiriBenar: 0,
  gabung: [],
  salahTaruh: 0,
  salahBaca: 0,
  salahGabung: 0,
});
export const mulaiLagiRak = (): KeadaanRak => awalRak();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export const LAWAN_SISI: Record<Sisi, Sisi> = { atas: "bawah", bawah: "atas", kiri: "kanan", kanan: "kiri" };
export const FRASA_SISI: Record<Sisi, string> = { atas: "di atas", bawah: "di bawah", kiri: "di sebelah kiri", kanan: "di sebelah kanan" };

/* ------------------------------ Letak ------------------------------ */
/** Kalimat posisi sebuah benda terhadap acuannya menurut kartu denah, atau null bila benda itu tidak punya kartu. */
export function kalimatKartu(i: number, d: readonly BendaSim[]): string | null {
  const b = d[i];
  return b.kartu ? `${b.nama} ${FRASA_SISI[b.kartu.kata]} ${d[b.kartu.acuan].nama}` : null;
}
/** Kalimat lawan: acuan dan benda bertukar tempat dengan kata lawannya. */
export function kalimatLawan(i: number, d: readonly BendaSim[]): string | null {
  const b = d[i];
  return b.kartu ? `${d[b.kartu.acuan].nama} ${FRASA_SISI[LAWAN_SISI[b.kartu.kata]]} ${b.nama}` : null;
}
/** Benda yang ada di petak (kolom, baris), atau -1. */
export const bendaDiPetak = (kol: number, bar: number, d: readonly BendaSim[]): number => d.findIndex((b) => b.kol === kol && b.bar === bar);
/** Benda `i` ada di sisi `kata` dari acuan `a` (setengah bidang, dilihat dari pembaca). */
export const sisiCocokSim = (i: number, a: number, k: Sisi, d: readonly BendaSim[]): boolean => {
  const x = d[i];
  const y = d[a];
  return k === "atas" ? x.bar < y.bar : k === "bawah" ? x.bar > y.bar : k === "kiri" ? x.kol < y.kol : x.kol > y.kol;
};
export const cocokPetunjukSim = (i: number, p: PetunjukSim, d: readonly BendaSim[]): boolean => (p.j === "tingkat" ? d[i].bar === p.bar : sisiCocokSim(i, p.acuan, p.kata, d));
/** Benda yang cocok dengan kedua petunjuk sebuah teka-teki (harus tinggal satu: `jawab`). */
export const sisaTeka = (t: TekaSim, d: readonly BendaSim[]): number[] => d.map((_, i) => i).filter((i) => cocokPetunjukSim(i, t.petunjuk[0], d) && cocokPetunjukSim(i, t.petunjuk[1], d));
export const kalimatPetunjukSim = (p: PetunjukSim, d: readonly BendaSim[]): string => (p.j === "tingkat" ? `ada di tingkat ${p.bar === 0 ? "atas" : "bawah"}` : `ada ${FRASA_SISI[p.kata]} ${d[p.acuan].nama}`);

/* ------------------------------ Alat ------------------------------ */
export const pilihModeRak = (k: KeadaanRak, mode: ModeRak): KeadaanRak => ({ ...k, mode, pilih: -1 });

/** Pegang satu benda dari baki. Benda yang sudah ditaruh tidak bisa dipegang lagi. */
export function pilihBendaRak(k: KeadaanRak, i: number, d: readonly BendaSim[]): KeadaanRak {
  if (i < 0 || i >= d.length || k.terpasang.includes(i)) return k;
  return { ...k, pilih: k.pilih === i ? -1 : i };
}

export type HasilTaruh = { k: KeadaanRak; ok: boolean; perlu: "pilih" | "terisi" | null };
/** Taruh benda yang dipegang di petak (kolom, baris). Hanya petak yang sesuai kartu denah yang menerima; petak yang keliru tidak mengubah apa pun selain hitungan percobaan. */
export function taruhBenda(k: KeadaanRak, kol: number, bar: number, d: readonly BendaSim[]): HasilTaruh {
  if (k.pilih < 0) return { k, ok: false, perlu: "pilih" };
  const sudah = d.findIndex((b, i) => k.terpasang.includes(i) && b.kol === kol && b.bar === bar);
  if (sudah >= 0) return { k, ok: false, perlu: "terisi" };
  const b = d[k.pilih];
  if (b.kol !== kol || b.bar !== bar) return { k: { ...k, salahTaruh: k.salahTaruh + 1 }, ok: false, perlu: null };
  return { k: { ...k, terpasang: [...k.terpasang, k.pilih], pilih: -1 }, ok: true, perlu: null };
}
export const semuaTerpasangRak = (k: KeadaanRak, d: readonly BendaSim[]): boolean => k.terpasang.length === d.length;

/** Lihat kalimat lawan sebuah benda yang sudah ditaruh dan punya kartu denah. */
export function lihatLawan(k: KeadaanRak, i: number, d: readonly BendaSim[]): { k: KeadaanRak; ok: boolean } {
  if (i < 0 || i >= d.length || !k.terpasang.includes(i) || !d[i].kartu) return { k, ok: false };
  return { k: k.lawanLihat.includes(i) ? k : { ...k, lawanLihat: [...k.lawanLihat, i] }, ok: true };
}

/** Tugas Baca berikutnya yang belum selesai, atau -1 bila semua selesai. */
export const tugasBacaBerikut = (k: KeadaanRak, t: readonly TugasBaca[]): number => t.findIndex((_, i) => !k.baca.includes(i));
export type HasilBaca = { k: KeadaanRak; ok: boolean; selesai: boolean };
/** Ketuk benda `i` untuk tugas Baca yang sedang berjalan. Hanya jawaban yang benar mencatat kemajuan. */
export function ketukBaca(k: KeadaanRak, i: number, t: readonly TugasBaca[]): HasilBaca {
  const n = tugasBacaBerikut(k, t);
  if (n < 0) return { k, ok: false, selesai: true };
  if (t[n].jawab !== i) return { k: { ...k, salahBaca: k.salahBaca + 1 }, ok: false, selesai: false };
  const baru: KeadaanRak = { ...k, baca: [...k.baca, n], kananBenar: k.kananBenar + (t[n].kata === "kanan" ? 1 : 0), kiriBenar: k.kiriBenar + (t[n].kata === "kiri" ? 1 : 0) };
  return { k: baru, ok: true, selesai: baru.baca.length === t.length };
}

/** Teka-teki Gabung berikutnya yang belum selesai, atau -1. */
export const tekaBerikut = (k: KeadaanRak, t: readonly TekaSim[]): number => t.findIndex((_, i) => !k.gabung.includes(i));
/** Ketuk benda `i` untuk teka-teki yang sedang berjalan. */
export function ketukGabung(k: KeadaanRak, i: number, t: readonly TekaSim[]): HasilBaca {
  const n = tekaBerikut(k, t);
  if (n < 0) return { k, ok: false, selesai: true };
  if (t[n].jawab !== i) return { k: { ...k, salahGabung: k.salahGabung + 1 }, ok: false, selesai: false };
  const baru: KeadaanRak = { ...k, gabung: [...k.gabung, n] };
  return { k: baru, ok: true, selesai: baru.gabung.length === t.length };
}

/* ------------------------------ Petunjuk dan kalimat untuk suara (tanpa digit) ------------------------------ */
/** Petunjuk saat benda ditaruh di petak yang keliru: membandingkan petak itu dengan kartu denah. */
export function petunjukTaruh(i: number, kol: number, bar: number, d: readonly BendaSim[]): string {
  const b = d[i];
  const kartu = kalimatKartu(i, d);
  if (!b.kartu) return `${besar(b.nama)} tidak punya kartu sendiri. Cari petak yang tersisa menurut kartu benda lain. Kiri dan kanan dilihat dari kita.`;
  const y = d[b.kartu.acuan];
  if (kol === y.kol && bar === y.bar) return `Itu petak ${y.nama} sendiri. Kartu berbunyi: ${kartu}.`;
  const sisi: Sisi = kol < y.kol ? "kiri" : kol > y.kol ? "kanan" : bar < y.bar ? "atas" : "bawah";
  return `Kartu berbunyi: ${kartu}. Petak itu ada ${FRASA_SISI[sisi]} ${y.nama}, bukan ${FRASA_SISI[b.kartu.kata]}. Kiri dan kanan dilihat dari kita.`;
}

export function petunjukBaca(t: TugasBaca, ketuk: number, d: readonly BendaSim[]): string {
  const y = d[t.acuan];
  const x = d[ketuk];
  if (ketuk === t.acuan) return `Itu ${y.nama}, benda acuannya sendiri. Cari benda di sebelah ${t.kata} dari benda itu.`;
  if (x.bar !== y.bar) return `Itu ada di baris yang lain. Cari benda di baris yang sama dengan ${y.nama}.`;
  return `Itu ada di sebelah ${x.kol < y.kol ? "kiri" : "kanan"} ${y.nama}. Kiri dan kanan dilihat dari kita, sama dengan anak yang membelakangi kita.`;
}
export function petunjukGabung(t: TekaSim, ketuk: number, d: readonly BendaSim[]): string {
  const c1 = cocokPetunjukSim(ketuk, t.petunjuk[0], d);
  const c2 = cocokPetunjukSim(ketuk, t.petunjuk[1], d);
  const nm = d[ketuk].nama;
  if (c1 && !c2) return `${nm} cocok dengan petunjuk pertama, tetapi tidak cocok dengan petunjuk kedua: benda yang dicari ${kalimatPetunjukSim(t.petunjuk[1], d)}.`;
  if (!c1 && c2) return `${nm} cocok dengan petunjuk kedua, tetapi tidak cocok dengan petunjuk pertama: benda yang dicari ${kalimatPetunjukSim(t.petunjuk[0], d)}.`;
  return `${nm} tidak cocok dengan kedua petunjuk. Pakai petunjuk pertama dulu, lalu petunjuk kedua.`;
}

export function kalimatRak(k: KeadaanRak, d: readonly BendaSim[], baca: readonly TugasBaca[], teka: readonly TekaSim[]): string {
  const u = k.pilih >= 0 ? d[k.pilih] : null;
  if (k.mode === "taruh") {
    if (semuaTerpasangRak(k, d)) return "Semua karya sudah di tempatnya. Rak pameran siap dibuka.";
    if (!u) return k.terpasang.length === 0 ? "Ketuk satu karya di baki dulu, lalu ketuk petak di rak." : `Sudah ${kata(k.terpasang.length)} karya di tempatnya. Ketuk karya berikutnya.`;
    const kartu = kalimatKartu(k.pilih, d);
    return kartu ? `Kartu denah berbunyi: ${kartu}. Ketuk petaknya.` : `Karya ${u.nama} tidak punya kartu sendiri. Cari petak yang tersisa menurut kartu lain.`;
  }
  if (k.mode === "baca") {
    const n = tugasBacaBerikut(k, baca);
    if (n < 0) return "Semua tugas baca selesai. Kanan dan kiri dari anak yang membelakangi kita sama dengan kanan dan kiri kita.";
    return `Ketuk benda di sebelah ${baca[n].kata} ${d[baca[n].acuan].nama}, dilihat dari kita.`;
  }
  const n = tekaBerikut(k, teka);
  if (n < 0) return "Semua teka-teki selesai. Dua petunjuk digabung membuat tinggal satu benda.";
  return `Teka-teki: benda yang ${kalimatPetunjukSim(teka[n].petunjuk[0], d)}, dan ${kalimatPetunjukSim(teka[n].petunjuk[1], d)}. Ketuk satu benda.`;
}

export { besar as hurufBesar };
