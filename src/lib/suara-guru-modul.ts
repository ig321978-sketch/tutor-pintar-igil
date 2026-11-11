import {
  buatUcapanGuru,
  normalisasiKelaminGuru,
  pilihSuaraInggris,
  profilGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { bacaProgres } from "@/lib/progres";
import { mintaAudioTts, hentikanAudioGuruAktif, saatHentiAudioGuru } from "@/lib/putar-tts-klien";
import { SUARA_SERAGAM, pecahKalimat, pilihSuaraSeragam, type PilihanSuara } from "@/lib/suara-guru-seragam";
import { adaSegmenInggris, pecahSegmenDwibahasa } from "@/lib/ucapan-dwibahasa";

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

/** Satu ucapan seragam: bahasa, laju, nada, dan suara mengikuti guru terpilih. */
function buatUcapanSeragam(
  teks: string,
  kelamin: KelaminGuru,
  bahasa: "id-ID" | "en-US" = "id-ID",
): SpeechSynthesisUtterance {
  const pilihan = pilihanSuaraSeragamSaatIni(kelamin);
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.rate = pilihan.laju;
  ucapan.pitch = pilihan.nada;
  if (bahasa === "en-US") {
    const en = pilihSuaraInggris(kelamin);
    if (en) {
      ucapan.voice = en;
      ucapan.lang = en.lang.replace("_", "-");
    } else {
      ucapan.lang = "en-US";
      if (pilihan.suara) ucapan.voice = pilihan.suara;
    }
  } else {
    ucapan.lang = SUARA_SERAGAM.bahasa;
    if (pilihan.suara) ucapan.voice = pilihan.suara;
  }
  return ucapan;
}

/** Antre segmen dwibahasa di Web Speech; segmen en-US memakai suara Inggris bila ada. */
function antreSegmenWebSpeech(
  naskah: string,
  buat: (teks: string, lang: "id-ID" | "en-US") => SpeechSynthesisUtterance,
  aktif: () => boolean,
  selesai: () => void,
): void {
  const segmen = pecahSegmenDwibahasa(naskah);
  if (segmen.length === 0) {
    selesai();
    return;
  }
  let i = 0;
  const lanjut = () => {
    if (!aktif()) return;
    if (i >= segmen.length) {
      selesai();
      return;
    }
    const s = segmen[i];
    i += 1;
    const ucapan = buat(s.teks, s.lang);
    ucapan.onend = lanjut;
    ucapan.onerror = selesai;
    window.speechSynthesis.speak(ucapan);
  };
  window.setTimeout(lanjut, 40);
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

/**
 * Ucapkan `teks` dengan guru terpilih. Ucapan sebelumnya dihentikan.
 * `selesai` tidak dipanggil jika ucapan ini digantikan ucapan lain.
 */
export function ucapkanGuruModul(teks: string, opsi: OpsiSuaraGuruModul = {}): void {
  if (typeof window === "undefined") return;
  const naskah = rapikanNaskahGuru(teks);
  if (!naskah) return;
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
    // Laju dan nada kustom (Matematika Kelas 2 Bab 2: 0,70 dan 1) hanya berlaku untuk suara perangkat murni.
    const kustom = opsi.perangkatSaja === true && (opsi.laju !== undefined || opsi.nada !== undefined);
    const profilPakai = {
      ...profil,
      laju: kustom && opsi.laju !== undefined ? opsi.laju : profil.laju,
      nada: kustom && opsi.nada !== undefined ? opsi.nada : profil.nada,
    };
    const aktif = () => saya === giliran && !tutup;
    const mulai = () => {
      if (!aktif()) return;
      // Pecah per kalimat dulu bila laju lambat, lalu tiap kalimat dipecah id/en.
      const potongan = kustom ? pecahKalimat(naskah) : [naskah];
      let k = 0;
      const lanjutKalimat = () => {
        if (!aktif()) return;
        if (k >= potongan.length) {
          selesai();
          return;
        }
        const kalimat = potongan[k];
        k += 1;
        antreSegmenWebSpeech(
          kalimat,
          (teks, lang) => buatUcapanGuru(teks, profilPakai, lang),
          aktif,
          lanjutKalimat,
        );
      };
      lanjutKalimat();
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
      const potongan = pecahKalimat(naskah);
      let k = 0;
      const lanjutKalimat = () => {
        if (!aktif()) return;
        if (k >= potongan.length) {
          selesai();
          return;
        }
        const kalimat = potongan[k];
        k += 1;
        antreSegmenWebSpeech(
          kalimat,
          (teks, lang) => buatUcapanSeragam(teks, kelamin, lang),
          aktif,
          lanjutKalimat,
        );
      };
      lanjutKalimat();
    };
    void bicaraSeragam();
    return;
  }

  if (opsi.perangkatSaja) {
    cadangan();
    return;
  }

  async function putarStatisAtauCadangan() {
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
  }

  // Berkas MP3 statis memakai suara Indonesia: kata Inggris di dalamnya sering salah.
  // Bila naskah memuat segmen Inggris dan perangkat punya suara en-*, utamakan Web Speech dwibahasa.
  if (adaSegmenInggris(naskah) && "speechSynthesis" in window) {
    void (async () => {
      if (window.speechSynthesis.getVoices().length === 0) await tungguSuaraSiap();
      if (saya !== giliran || tutup) return;
      if (pilihSuaraInggris(kelamin)) {
        cadangan();
        return;
      }
      await putarStatisAtauCadangan();
    })();
    return;
  }

  void putarStatisAtauCadangan();
}
