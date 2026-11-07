import {
  buatUcapanGuru,
  normalisasiKelaminGuru,
  profilGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { bacaProgres } from "@/lib/progres";
import { mintaAudioTts, hentikanAudioGuruAktif, saatHentiAudioGuru } from "@/lib/putar-tts-klien";

/**
 * Suara Guru di dalam Materi modul.
 *
 * Guru (Bu Sari atau Pak Budi) dipilih siswa lewat PilihGuru di halaman Ruang
 * Belajar dan disimpan di profil lokal (`guruKelamin`). Semua modul memanggil
 * satu fungsi ini supaya suaranya selalu sama dengan pilihan siswa.
 *
 * Urutan: audio natural dari /api/tts (disimpan di IndexedDB peramban, jadi
 * kalimat yang sama tidak diminta dua kali). Jika audio belum siap dalam
 * BATAS_TUNGGU_MS, ditolak peramban, atau gagal, suara perangkat (Web Speech
 * `id-ID`) dengan nada dan laju sesuai guru terpilih dipakai sebagai cadangan.
 */

const BATAS_TUNGGU_MS = 12_000;

/** WAV senyap 0,05 detik untuk membuka izin audio (iOS) pada ketukan pertama. */
const WAV_SENYAP =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

let elemen: HTMLAudioElement | null = null;
let terbuka = false;
let giliran = 0;

export function kelaminGuruTersimpan(): KelaminGuru {
  if (typeof window === "undefined") return "wanita";
  try {
    return normalisasiKelaminGuru(bacaProgres().profil.guruKelamin);
  } catch {
    return "wanita";
  }
}

/** Siapkan teks agar tanda matematika terbaca oleh mesin suara. */
export function rapikanNaskahGuru(teks: string): string {
  return teks
    .replace(/\s+/g, " ")
    .replace(/(\d)\s*[−–]\s*(\d)/g, "$1 dikurangi $2")
    .replace(/➖/g, " kurang ")
    .replace(/➕/g, " tambah ")
    .replace(/\s+[−–]\s+/g, " kurang ")
    .replace(/\s+/g, " ")
    .trim();
}

function pastikanElemen(): HTMLAudioElement {
  if (!elemen) {
    elemen = new Audio();
    elemen.preload = "auto";
    saatHentiAudioGuru(() => {
      elemen?.pause();
    });
  }
  if (!terbuka) {
    terbuka = true;
    try {
      elemen.src = WAV_SENYAP;
      void elemen.play().catch(() => {
        terbuka = false;
      });
    } catch {
      terbuka = false;
    }
  }
  return elemen;
}

/** Hentikan suara guru modul yang sedang berjalan. */
export function hentikanSuaraGuruModul(): void {
  giliran += 1;
  hentikanAudioGuruAktif();
}

export type OpsiSuaraGuruModul = {
  /** Contoh: "1 SD". Menentukan jenjang guru dan profil suara. */
  kelas?: string;
  /** Dipanggil sekali saat suara selesai atau gagal, hanya jika belum diganti ucapan lain. */
  selesai?: () => void;
};

/**
 * Ucapkan `teks` dengan guru terpilih. Ucapan sebelumnya dihentikan.
 * `selesai` tidak dipanggil jika ucapan ini digantikan ucapan lain.
 */
export function ucapkanGuruModul(teks: string, opsi: OpsiSuaraGuruModul = {}): void {
  if (typeof window === "undefined") return;
  const naskah = rapikanNaskahGuru(teks);
  if (!naskah) return;
  const kelas = opsi.kelas ?? "1 SD";
  const kelamin = kelaminGuruTersimpan();

  hentikanAudioGuruAktif();
  const saya = ++giliran;
  const audio = pastikanElemen();

  let tutup = false;
  const selesai = () => {
    if (tutup) return;
    tutup = true;
    if (saya !== giliran) return;
    opsi.selesai?.();
  };

  const cadangan = () => {
    if (saya !== giliran || tutup) return;
    if (!("speechSynthesis" in window)) {
      selesai();
      return;
    }
    const ucapan = buatUcapanGuru(naskah, profilGuru(kelas, kelamin));
    ucapan.onend = selesai;
    ucapan.onerror = selesai;
    window.setTimeout(() => {
      if (saya !== giliran || tutup) return;
      window.speechSynthesis.speak(ucapan);
    }, 40);
  };

  void (async () => {
    let hasil: Awaited<ReturnType<typeof mintaAudioTts>> = null;
    try {
      hasil = await Promise.race([
        mintaAudioTts(naskah, kelamin, kelas, { persist: true }),
        new Promise<null>((lanjut) => window.setTimeout(() => lanjut(null), BATAS_TUNGGU_MS)),
      ]);
    } catch {
      hasil = null;
    }
    if (saya !== giliran) return;
    if (!hasil) {
      cadangan();
      return;
    }
    try {
      audio.onended = selesai;
      audio.onerror = cadangan;
      audio.src = hasil.url;
      audio.currentTime = 0;
      await audio.play();
    } catch {
      cadangan();
    }
  })();
}
