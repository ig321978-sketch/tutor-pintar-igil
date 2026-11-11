/* Logika murni Simulasi "Maju dan Mundur" (Bab 5, Sub-Bab B). Tanpa React, tanpa jaringan. */

export const MIN = 1;
export const MAKS = 20;

export type Deret = {
  /** Bilangan yang pernah disinggahi, dari titik awal sampai bilangan sekarang. */
  jejak: number[];
  pesan: string;
};

export const batasDeret = (n: number) => Math.max(MIN, Math.min(MAKS, Math.round(n)));

export const mulaiDari = (n: number): Deret => ({ jejak: [batasDeret(n)], pesan: "" });
export const awalDeret = (): Deret => mulaiDari(12);
export const sekarang = (d: Deret) => d.jejak[d.jejak.length - 1];
export const titikAwal = (d: Deret) => d.jejak[0];

/** Maju satu: satu lebih banyak. Di 20 (ujung kisi) berhenti dengan petunjuk. */
export function maju(d: Deret): Deret {
  const n = sekarang(d);
  if (n >= MAKS) return { ...d, pesan: `Sudah di ${MAKS}, ujung kisi. Tidak ada kotak sesudahnya.` };
  return { jejak: [...d.jejak, n + 1], pesan: "" };
}

/** Mundur satu: satu lebih sedikit. Di 1 (awal kisi) berhenti dengan petunjuk. */
export function mundur(d: Deret): Deret {
  const n = sekarang(d);
  if (n <= MIN) return { ...d, pesan: `Sudah di ${MIN}, awal kisi. Tidak ada kotak sebelumnya.` };
  return { jejak: [...d.jejak, n - 1], pesan: "" };
}

export function hitungLangkah(d: Deret): { maju: number; mundur: number } {
  let a = 0;
  let b = 0;
  for (let i = 1; i < d.jejak.length; i++) {
    if (d.jejak[i] > d.jejak[i - 1]) a++;
    else b++;
  }
  return { maju: a, mundur: b };
}

/** Kalimat ringkas perjalanan: dari mana, berapa langkah maju atau mundur, sampai di mana. */
export function ringkasan(d: Deret): string {
  const { maju: a, mundur: b } = hitungLangkah(d);
  const dari = titikAwal(d);
  const ke = sekarang(d);
  if (a === 0 && b === 0) return `Mulai dari ${dari}. Tekan Maju atau Mundur.`;
  if (b === 0) return `Dari ${dari} maju ${a} langkah sampai ${ke}.`;
  if (a === 0) return `Dari ${dari} mundur ${b} langkah sampai ${ke}.`;
  return `Dari ${dari}: maju ${a} langkah dan mundur ${b} langkah, sampai ${ke}.`;
}

/** Urutan bilangan yang disinggahi, paling banyak `maks` terakhir. */
export function urutan(d: Deret, maks = 9): string {
  const ekor = d.jejak.slice(-maks);
  const potong = d.jejak.length > maks;
  return `${potong ? "… " : ""}${ekor.join(" → ")}`;
}

/** Lompatan terakhir untuk digambar di garis bilangan. */
export function jejakLompatan(d: Deret, maks = 6): { dari: number; ke: number; maju: boolean }[] {
  const hasil: { dari: number; ke: number; maju: boolean }[] = [];
  for (let i = 1; i < d.jejak.length; i++) hasil.push({ dari: d.jejak[i - 1], ke: d.jejak[i], maju: d.jejak[i] > d.jejak[i - 1] });
  return hasil.slice(-maks);
}

/** Satu bilangan sebelum dan satu sesudah. Di ujung kisi salah satunya tidak ada. */
export function tetangga(n: number): { sebelum: number | null; sesudah: number | null } {
  const nn = batasDeret(n);
  return { sebelum: nn > MIN ? nn - 1 : null, sesudah: nn < MAKS ? nn + 1 : null };
}

export function kalimatTetangga(n: number): string {
  const nn = batasDeret(n);
  const t = tetangga(nn);
  const a = t.sebelum === null ? `Tidak ada bilangan sebelum ${nn} di kisi ini.` : `Sebelum ${nn} adalah ${t.sebelum}.`;
  const b = t.sesudah === null ? `Tidak ada bilangan sesudah ${nn} di kisi ini.` : `Sesudah ${nn} adalah ${t.sesudah}.`;
  if (t.sebelum !== null && t.sesudah !== null) return `${a} ${b} ${nn} ada di antara ${t.sebelum} dan ${t.sesudah}.`;
  return `${a} ${b}`;
}

/** Kisi 1 sampai 20: empat baris, lima kotak per baris. Kiri ke kanan maju, kanan ke kiri mundur. */
export function kisiBaris(): number[][] {
  return [0, 1, 2, 3].map((b) => [1, 2, 3, 4, 5].map((k) => b * 5 + k));
}

/** Ulat bilangan: lima bilangan berurutan yang memuat bilangan sekarang. */
export function jendelaUlat(n: number): number[] {
  const kepala = Math.max(MIN, Math.min(MAKS - 4, batasDeret(n) - 2));
  return Array.from({ length: 5 }, (_, i) => kepala + i);
}

/** Petunjuk ulat. Saat bilangan disembunyikan, hanya tetangganya yang disebut. */
export function kalimatUlat(n: number, sembunyi: boolean): string {
  const nn = batasDeret(n);
  const t = tetangga(nn);
  if (!sembunyi) return `Deret: ${jendelaUlat(nn).join(", ")}.`;
  if (t.sebelum !== null && t.sesudah !== null) return `Satu bilangan hilang. Sebelumnya ${t.sebelum}, sesudahnya ${t.sesudah}. Bilangan apa di antaranya?`;
  if (t.sebelum !== null) return `Satu bilangan hilang. Sebelumnya ${t.sebelum}. Bilangan apa setelah itu?`;
  return `Satu bilangan hilang. Sesudahnya ${t.sesudah}. Bilangan apa sebelum itu?`;
}

/** Ucapan guru. `denganTetangga` hanya dinyalakan saat alat tetangga atau ulat tampil. */
export function ucapanDeret(d: Deret, denganTetangga: boolean): string {
  const n = sekarang(d);
  return denganTetangga ? `${ringkasan(d)} ${kalimatTetangga(n)}` : ringkasan(d);
}
