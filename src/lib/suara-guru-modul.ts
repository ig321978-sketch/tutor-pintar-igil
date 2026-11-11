import {
  buatUcapanGuru,
  normalisasiKelaminGuru,
  profilGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { bacaProgres } from "@/lib/progres";
import { mintaAudioTts, hentikanAudioGuruAktif, saatHentiAudioGuru } from "@/lib/putar-tts-klien";
import { SUARA_SERAGAM, pecahKalimat, pilihSuaraSeragam, type PilihanSuara } from "@/lib/suara-guru-seragam";
import { adaIstilahInggris, ejaanInggrisUntukSuaraId } from "@/lib/ejaan-inggris-id";

/**
 * Suara Guru di dalam Materi modul.
 *
 * Guru (Bu Sari atau Pak Budi) dipilih siswa lewat PilihGuru di halaman Ruang
 * Belajar dan disimpan di profil lokal (`guruKelamin`). Semua modul memanggil
 * satu fungsi ini supaya suaranya selalu sama dengan pilihan siswa.
 *
 * Urutan: berkas audio statis yang dibuat sekali saat penulisan (public/audio-guru, lihat
 * src/lib/audio-guru-statis.ts), tanpa panggilan ke layanan suara berbayar saat siswa belajar.
 * Jika ucapan belum punya berkas, audio ditolak peramban, atau gagal, suara perangkat (Web Speech
 * `id-ID`) dengan nada dan laju sesuai guru terpilih dipakai sebagai cadangan.
 *
 * Kata Inggris dieja ulang ke fonetik Indonesia (`ejaanInggrisUntukSuaraId`) supaya tetap
 * memakai suara guru id-ID — tanpa TTS Inggris terpasang.
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
  /** Guru yang bersuara. Bila kosong dipakai guru pilihan siswa yang tersimpan. */
  kelamin?: KelaminGuru;
  /** Dipanggil sekali saat suara selesai atau gagal, hanya jika belum diganti ucapan lain. */
  selesai?: () => void;
  /**
   * Murni Web Speech API bawaan perangkat (id-ID). Tidak mencari berkas audio statis dan tidak mencatat
   * ucapan ke naskah penulisan, jadi tidak pernah memakai kuota layanan suara berbayar.
   */
  perangkatSaja?: boolean;
  /**
   * Laju bicara (1 = normal) yang menggantikan laju profil guru. Hanya dipakai bersama `perangkatSaja`.
   * Contoh: Matematika Kelas 2 Bab 2 memakai 0,70.
   */
  laju?: number;
  /** Nada suara (1 = normal) yang menggantikan nada profil guru. Hanya dipakai bersama `perangkatSaja`. */
  nada?: number;
  /**
   * Suara seragam (pilot Materi Kelas 1 Bab 1 Sub-Bab A): Web Speech API perangkat dengan parameter tetap
   * (id-ID, laju 0,85, nada 1,1 untuk wanita) dan pemilihan suara yang pasti, selalu sesuai guru pilihan siswa.
   * Mengabaikan berkas audio statis dan profil laju/nada guru lama.
   */
  seragam?: boolean;
};

/** Suara dan parameter yang akan dipakai guru `kelamin` di perangkat ini. Untuk tampilan info dan uji. */
export function pilihanSuaraSeragamSaatIni(kelamin: KelaminGuru = kelaminGuruTersimpan()): PilihanSuara<SpeechSynthesisVoice> {
  const daftar = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis.getVoices() : [];
  return pilihSuaraSeragam(daftar, kelamin);
}

/** Satu ucapan seragam: selalu id-ID, suara guru terpilih. */
function buatUcapanSeragam(teks: string, kelamin: KelaminGuru): SpeechSynthesisUtterance {
  const pilihan = pilihanSuaraSeragamSaatIni(kelamin);
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.lang = SUARA_SERAGAM.bahasa;
  ucapan.rate = pilihan.laju;
  ucapan.pitch = pilihan.nada;
  if (pilihan.suara) ucapan.voice = pilihan.suara;
  return ucapan;
}

/** Daftar suara perangkat sering kosong di panggilan pertama. Tunggu sebentar supaya ucapan pertama tidak memakai suara lain. */
function tungguSuaraSiap(maksMs = 1200): Promise<void> {
  return new Promise((lanjut) => {
    const mesin = window.speechSynthesis;
    let beres = false;
    const selesai = () => {
      if (beres) return;
      beres = true;
      mesin.removeEventListener("voiceschanged", selesai);
      lanjut();
    };
    mesin.addEventListener("voiceschanged", selesai);
    window.setTimeout(selesai, maksMs);
  });
}

function antreKalimatId(
  naskahBicara: string,
  buat: (teks: string) => SpeechSynthesisUtterance,
  pecah: boolean,
  aktif: () => boolean,
  selesai: () => void,
): void {
  const potongan = pecah ? pecahKalimat(naskahBicara) : [naskahBicara];
  let i = 0;
  const lanjut = () => {
    if (!aktif()) return;
    if (i >= potongan.length) {
      selesai();
      return;
    }
    const ucapan = buat(potongan[i]);
    i += 1;
    ucapan.onend = lanjut;
    ucapan.onerror = selesai;
    window.speechSynthesis.speak(ucapan);
  };
  window.setTimeout(lanjut, 40);
}

/**
 * Ucapkan `teks` dengan guru terpilih. Ucapan sebelumnya dihentikan.
 * `selesai` tidak dipanggil jika ucapan ini digantikan ucapan lain.
 */
export function ucapkanGuruModul(teks: string, opsi: OpsiSuaraGuruModul = {}): void {
  if (typeof window === "undefined") return;
  const naskah = rapikanNaskahGuru(teks);
  if (!naskah) return;
  // Ejaan fonetik ID untuk Web Speech — kunci berkas statis tetap memakai `naskah` asli.
  const naskahBicara = ejaanInggrisUntukSuaraId(naskah);
  const kelas = opsi.kelas ?? "1 SD";
  const kelamin = opsi.kelamin ?? kelaminGuruTersimpan();

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

  let cadanganDipakai = false;
  const cadangan = () => {
    if (saya !== giliran || tutup || cadanganDipakai) return;
    cadanganDipakai = true;
    if (!("speechSynthesis" in window)) {
      selesai();
      return;
    }
    const profil = profilGuru(kelas, kelamin);
    const kustom = opsi.perangkatSaja === true && (opsi.laju !== undefined || opsi.nada !== undefined);
    const profilPakai = {
      ...profil,
      laju: kustom && opsi.laju !== undefined ? opsi.laju : profil.laju,
      nada: kustom && opsi.nada !== undefined ? opsi.nada : profil.nada,
    };
    const aktif = () => saya === giliran && !tutup;
    const mulai = () => {
      if (!aktif()) return;
      antreKalimatId(
        naskahBicara,
        (t) => buatUcapanGuru(t, profilPakai),
        kustom,
        aktif,
        selesai,
      );
    };
    window.setTimeout(() => {
      if (!aktif()) return;
      if (window.speechSynthesis.getVoices().length === 0) {
        void tungguSuaraSiap().then(mulai);
        return;
      }
      mulai();
    }, 40);
  };

  if (opsi.seragam) {
    const bicaraSeragam = async () => {
      if (saya !== giliran || tutup) return;
      if (!("speechSynthesis" in window)) {
        selesai();
        return;
      }
      if (window.speechSynthesis.getVoices().length === 0) await tungguSuaraSiap();
      if (saya !== giliran || tutup) return;
      const aktif = () => saya === giliran && !tutup;
      antreKalimatId(naskahBicara, (t) => buatUcapanSeragam(t, kelamin), true, aktif, selesai);
    };
    void bicaraSeragam();
    return;
  }

  if (opsi.perangkatSaja) {
    cadangan();
    return;
  }

  // MP3 statis sering salah baca istilah Inggris. Untuk naskah ber-Inggris, pakai suara guru
  // id-ID + ejaan fonetik agar intonasi tetap Indonesia tanpa TTS Inggris.
  if (adaIstilahInggris(naskah) && "speechSynthesis" in window) {
    cadangan();
    return;
  }

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
