import { PERCOBAAN_TANPA_PILIHAN, type SoalInstans, type Tahap } from "./tipe";

/**
 * Pemeriksa umum satu soal yang sudah dibangkitkan. Dipakai uji tiap tahap dan sub-bab
 * (Concrete, Picture, Abstract memakai pemeriksa yang sama; aturan khusus tahap ada di bawah).
 */

export const MAKS_KATA_KALIMAT = 8;

/** Kata yang tidak boleh muncul di teks soal: kerja kelompok, kelas, buku, teman; gelar; bocoran sub-bab lain; penilaian. */
export const KATA_TERLARANG = [
  "kelompok", "kelas", "buku", "teman", "pak", "bu", "ibu", "bapak",
  "bandingkan", "membandingkan", "lebih", "kurang", "terbesar", "terkecil", "maju", "mundur", "pasangan", "tambah", "jumlah", "puluhan", "satuan", "ratusan",
  "skor", "nilai", "poin", "peringkat", "ranking",
];

const POLA_TERLARANG = new RegExp(`(?<![\\p{L}])(${KATA_TERLARANG.join("|")})(?![\\p{L}])`, "iu");

/** Memecah teks menjadi kalimat (akhiran titik, tanda tanya, seru, atau baris baru). */
export const pecahKalimat = (teks: string): string[] => teks.split(/[.!?\n]+/).map((s) => s.trim()).filter(Boolean);
export const hitungKata = (kalimat: string): number => kalimat.split(/\s+/).filter(Boolean).length;

/** Galat untuk satu teks yang dibacakan atau tampil: digit, kalimat terlalu panjang, kata terlarang. */
export function periksaTeks(teks: string, label: string, o: { bolehDigit?: boolean } = {}): string[] {
  const g: string[] = [];
  if (!o.bolehDigit && /\d/.test(teks)) g.push(`${label}: memuat digit ("${teks}").`);
  for (const k of pecahKalimat(teks)) if (hitungKata(k) > MAKS_KATA_KALIMAT) g.push(`${label}: kalimat lebih dari ${MAKS_KATA_KALIMAT} kata ("${k}").`);
  const m = teks.match(POLA_TERLARANG);
  if (m) g.push(`${label}: memuat kata terlarang "${m[1]}" ("${teks}").`);
  return g;
}

/** Kode titik semua karakter pada semua string di dalam nilai (rekursif). */
function kumpulTeks(v: unknown, keluar: string[] = []): string[] {
  if (typeof v === "string") keluar.push(v);
  else if (Array.isArray(v)) v.forEach((x) => kumpulTeks(x, keluar));
  else if (v && typeof v === "object") Object.values(v as Record<string, unknown>).forEach((x) => kumpulTeks(x, keluar));
  return keluar;
}

/** Emoji tertinggi yang boleh dipakai (batas tampilan di perangkat anak). */
export const EMOJI_TERTINGGI = 0x1fa95;

export function periksaInstansUmum(s: SoalInstans, tahap: Tahap): string[] {
  const g: string[] = [];
  const id = `Soal ${s.nomor} (${s.tindakan})`;
  if (s.tahap !== tahap) g.push(`${id}: tahap ${s.tahap}, seharusnya ${tahap}.`);
  g.push(...periksaTeks(s.suara, `${id} suara`), ...periksaTeks(s.penjelasan, `${id} penjelasan`));
  if (!s.suara.trim()) g.push(`${id}: suara kosong.`);
  if (!s.penjelasan.trim()) g.push(`${id}: penjelasan kosong.`);
  if (tahap === "concrete") g.push(...periksaTeks(s.layar, `${id} layar`));
  else g.push(...periksaTeks(s.layar, `${id} layar`, { bolehDigit: true }));

  const adaPilihan = !!s.pilihan && s.pilihan.length > 0;
  const harapPercobaan = adaPilihan ? (s.pilihan as unknown[]).length : PERCOBAAN_TANPA_PILIHAN;
  if (s.percobaan !== harapPercobaan) g.push(`${id}: percobaan ${s.percobaan}, seharusnya ${harapPercobaan} (jumlah pilihan, atau tiga tanpa pilihan).`);
  if (adaPilihan && s.pilihan) {
    const ids = s.pilihan.map((p) => p.id);
    const labels = s.pilihan.map((p) => p.label);
    if (new Set(ids).size !== ids.length) g.push(`${id}: id pilihan kembar.`);
    if (new Set(labels).size !== labels.length) g.push(`${id}: label pilihan kembar.`);
    if (!s.kunciPilihan || ids.filter((x) => x === s.kunciPilihan).length !== 1) g.push(`${id}: harus tepat satu pilihan benar (kunciPilihan).`);
    for (const p of s.pilihan) {
      g.push(...periksaTeks(p.suara, `${id} suara pilihan ${p.id}`));
      if (tahap === "concrete" && /\d/.test(p.label)) g.push(`${id}: pilihan "${p.label}" memuat digit (lambang bukan jawaban di Concrete).`);
    }
    for (const c of s.pengecoh ?? []) {
      if (!ids.includes(c.id) || c.id === s.kunciPilihan) g.push(`${id}: pengecoh "${c.id}" bukan pilihan salah.`);
      if (!c.alasan.trim()) g.push(`${id}: pengecoh "${c.id}" tanpa alasan kekeliruan.`);
    }
  }

  // Batas tampilan tiap tahap: semua teks pada soal.
  for (const t of kumpulTeks([s.data, s.layar, s.pilihan])) {
    for (const ch of t) {
      const kode = ch.codePointAt(0) ?? 0;
      if (tahap === "concrete" && kode > EMOJI_TERTINGGI) g.push(`${id}: karakter U+${kode.toString(16).toUpperCase()} melebihi batas emoji.`);
      if (tahap !== "concrete" && kode >= 0x1f300 && kode <= 0x1faff) g.push(`${id}: ${tahap} tidak boleh memakai emoji benda (U+${kode.toString(16).toUpperCase()}).`);
    }
  }
  if (tahap === "concrete") for (const t of kumpulTeks([s.data])) if (/\d/.test(t) && !/^[a-z]{1,3}\d{1,2}$/.test(t)) g.push(`${id}: data memuat digit tampil ("${t}").`);
  return g;
}
