import { namaBerkasAudioGuru } from "@/lib/kunci-audio-guru";

/**
 * Audio Suara Guru statis: dibuat sekali saat penulisan (scripts/buat-audio-guru.mjs), disajikan
 * sebagai berkas biasa dengan Cache-Control immutable. Siswa tidak pernah memanggil layanan suara
 * berbayar. Ucapan yang tidak ada di manifest dibacakan suara perangkat (Web Speech id-ID).
 *
 * Lokasi berkas bisa dipindah ke CDN lain lewat NEXT_PUBLIC_AUDIO_GURU_BASE tanpa mengubah kode.
 */

const BASIS = (process.env.NEXT_PUBLIC_AUDIO_GURU_BASE ?? "/audio-guru").replace(/\/$/, "");

let manifest: Promise<Set<string>> | null = null;

function muatManifest(): Promise<Set<string>> {
  if (!manifest) {
    manifest = fetch(`${BASIS}/manifest.json`)
      .then((respons) => (respons.ok ? (respons.json() as Promise<{ berkas?: unknown }>) : { berkas: [] }))
      .then((data) => new Set(Array.isArray(data.berkas) ? (data.berkas as string[]) : []))
      .catch(() => {
        manifest = null; // sinyal putus: coba lagi pada ucapan berikutnya
        return new Set<string>();
      });
  }
  return manifest;
}

/** Alamat berkas audio statis untuk sebuah kunci, atau null bila belum dibuat. */
export async function cariAudioGuruStatis(kunci: string): Promise<string | null> {
  const nama = namaBerkasAudioGuru(kunci);
  const ada = (await muatManifest()).has(nama);
  return ada ? `${BASIS}/${nama}.mp3` : null;
}
