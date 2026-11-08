/**
 * Kunci berkas audio Suara Guru statis.
 *
 * Tanpa impor, supaya dipakai peramban (pemutar modul) dan skrip penulisan di Node
 * (`scripts/buat-audio-guru.mjs`) dengan rumus yang sama persis.
 *
 * Rumus `kunciAudioGuru` sama dengan `kunciCacheAudioTts` (cache peramban lama), sehingga
 * satu ucapan memiliki satu nama berkas: sama untuk guru, jenjang, dan mode yang sama.
 */

export type OpsiKunciAudioGuru = { tanpaNotasi?: boolean; suaraTetap?: boolean };

export function kunciAudioGuru(teks: string, kelamin: string, kelas: string, opsi?: OpsiKunciAudioGuru): string {
  const mode = opsi?.tanpaNotasi ? "cerita" : "rumus";
  const slot = opsi?.suaraTetap ? "|slot" : "";
  return `v4|id|${mode}|${kelamin}|${kelas}${slot}|${teks.replace(/\s+/g, " ").trim()}`;
}

/** Hash 53 bit (cyrb53). Dua putaran dengan benih berbeda menghasilkan nama 28 digit heksa. */
function cyrb53(teks: string, benih: number): number {
  let h1 = 0xdeadbeef ^ benih;
  let h2 = 0x41c6ce57 ^ benih;
  for (let i = 0; i < teks.length; i++) {
    const ch = teks.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/** Nama berkas (tanpa ekstensi) untuk sebuah kunci. */
export function namaBerkasAudioGuru(kunci: string): string {
  return cyrb53(kunci, 1).toString(16).padStart(14, "0") + cyrb53(kunci, 2).toString(16).padStart(14, "0");
}
