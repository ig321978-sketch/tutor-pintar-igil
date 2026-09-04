const GELAR_AWAL = /^(m|h|hj|ny|tn|ir|dr|kh)\.?$/i;

export const KATA_PUJIAN = [
  "Pintar",
  "Cerdas",
  "Baik",
  "Rajin",
  "Soleh",
  "Semangat",
  "Hebat",
] as const;

export function namaDepanSiswa(nama: string): string {
  const bagian = nama.trim().split(/\s+/).filter(Boolean);
  const terpilih =
    bagian.find((kata) => !GELAR_AWAL.test(kata.replace(/\.+$/g, ""))) ??
    bagian[0] ??
    "Siswa";
  const bersih = terpilih.replace(/[^\p{L}\p{N}'-]+/gu, "");
  return bersih || "Siswa";
}

export function kataPujianDariTeks(teks: string): string | null {
  const pola = new RegExp(`\\b(${KATA_PUJIAN.join("|")})\\b`, "i");
  const cocok = teks.match(pola);
  if (!cocok) return null;
  const indeks = KATA_PUJIAN.findIndex(
    (kata) => kata.toLowerCase() === cocok[1].toLowerCase(),
  );
  return indeks >= 0 ? KATA_PUJIAN[indeks] : null;
}

export function pilihKataPujian(cadangan: string): string {
  const dariTeks = kataPujianDariTeks(cadangan);
  if (dariTeks) return dariTeks;
  let jumlah = 0;
  for (const huruf of cadangan) jumlah += huruf.charCodeAt(0);
  return KATA_PUJIAN[jumlah % KATA_PUJIAN.length];
}

/** Sapaan lisan: nama depan + tepat satu kata pujian umum. */
export function sapaanTutorRingkas(nama: string, sapaanMentah = ""): string {
  const depan = namaDepanSiswa(nama);
  const pujian = pilihKataPujian(sapaanMentah || depan);
  return `Halo ${depan}, ${pujian}.`;
}

export function gantiNamaLengkapKeDepan(teks: string, nama: string): string {
  const lengkap = nama.trim();
  const depan = namaDepanSiswa(lengkap);
  if (!lengkap || lengkap === depan) return teks;
  const aman = lengkap.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return teks.replace(new RegExp(aman, "gi"), depan);
}
