import { pilihSuaraSeragam } from "./suara-guru-seragam";

export type KelaminGuru = "wanita" | "pria";
export type JenjangGuru = "SD" | "SMP" | "SMA";

export type ProfilGuru = {
  kelamin: KelaminGuru;
  nama: string;
  peran: string;
  gambar: string;
  sapaanContoh: string;
  nada: number;
  laju: number;
};

const GURU_PER_JENJANG: Record<JenjangGuru, Record<KelaminGuru, ProfilGuru>> = {
  SD: {
    wanita: {
      kelamin: "wanita",
      nama: "Bu Sari",
      peran: "Guru SD yang sabar dan ceria",
      gambar: "/guru/bu-sari.png",
      sapaanContoh:
        "Halo Nak, aku Bu Sari. Yuk kita belajar pelan-pelan, pasti kamu bisa.",
      nada: 1.15,
      laju: 0.9,
    },
    pria: {
      kelamin: "pria",
      nama: "Pak Budi",
      peran: "Guru SD yang ramah dan semangat",
      gambar: "/guru/pak-budi.png",
      sapaanContoh:
        "Halo Nak, aku Pak Budi. Ayo kita belajar bareng, pelan tapi mantap.",
      nada: 0.82,
      laju: 0.9,
    },
  },
  SMP: {
    wanita: {
      kelamin: "wanita",
      nama: "Bu Laila",
      peran: "Guru SMP yang tegas dan mendukung",
      gambar: "/guru/bu-laila.png",
      sapaanContoh:
        "Hai, aku Bu Laila. Kita bahas materi ini langkah demi langkah ya.",
      nada: 1.08,
      laju: 0.92,
    },
    pria: {
      kelamin: "pria",
      nama: "Pak Andra",
      peran: "Guru SMP yang santai dan jelas",
      gambar: "/guru/pak-andra.png",
      sapaanContoh:
        "Hai, aku Pak Andra. Siap bahas materinya sampai kamu paham.",
      nada: 0.8,
      laju: 0.92,
    },
  },
  SMA: {
    wanita: {
      kelamin: "wanita",
      nama: "Bu Maya",
      peran: "Guru SMA yang analitis dan hangat",
      gambar: "/guru/bu-maya.png",
      sapaanContoh:
        "Halo, aku Bu Maya. Kita bedah materinya dengan nalar yang rapi.",
      nada: 1.05,
      laju: 0.94,
    },
    pria: {
      kelamin: "pria",
      nama: "Pak Dimas",
      peran: "Guru SMA yang runtut dan fokus",
      gambar: "/guru/pak-dimas.png",
      sapaanContoh:
        "Halo, aku Pak Dimas. Kita susun pemahamannya sampai ke intinya.",
      nada: 0.78,
      laju: 0.94,
    },
  },
};

export function suaraChirpGuru(
  kelas: string,
  kelamin: KelaminGuru,
): string {
  const jenjang = jenjangGuru(kelas);
  if (kelamin === "pria") {
    if (jenjang === "SMA") return "id-ID-Chirp3-HD-Fenrir";
    if (jenjang === "SMP") return "id-ID-Chirp3-HD-Puck";
    return "id-ID-Chirp3-HD-Charon";
  }
  if (jenjang === "SMA") return "id-ID-Chirp3-HD-Zephyr";
  if (jenjang === "SMP") return "id-ID-Chirp3-HD-Kore";
  return "id-ID-Chirp3-HD-Aoede";
}

export function jenjangGuru(kelas: string): JenjangGuru {
  const k = kelas.toUpperCase();
  if (/\b(10|11|12|SMA|SMK)\b/.test(k)) return "SMA";
  if (/\b(7|8|9|SMP)\b/.test(k)) return "SMP";
  return "SD";
}

export function normalisasiKelaminGuru(nilai: unknown): KelaminGuru {
  return nilai === "pria" ? "pria" : "wanita";
}

export function profilGuru(kelas: string, kelamin: KelaminGuru): ProfilGuru {
  return GURU_PER_JENJANG[jenjangGuru(kelas)][kelamin];
}

export function namaGuruTanpaGelar(nama: string): string {
  return nama.replace(/^(bu|pak)\s+/i, "").trim() || nama;
}

export function naskahPerkenalanGuru(guru: ProfilGuru): string {
  const panggilan = guru.kelamin === "wanita" ? "bu" : "pak";
  return `Hallo, saya ${panggilan} guru ${namaGuruTanpaGelar(guru.nama)}`;
}

export function pasanganGuru(kelas: string): ProfilGuru[] {
  const jenjang = jenjangGuru(kelas);
  return [GURU_PER_JENJANG[jenjang].wanita, GURU_PER_JENJANG[jenjang].pria];
}

/**
 * Suara Bahasa Indonesia perangkat untuk guru `kelamin`. Memakai aturan pemilihan pasti `pilihSuaraSeragam`: suara neural
 * (mis. Edge "Online (Natural)", Apple Premium) didahulukan karena paling natural, lalu suara Google, lalu suara lokal.
 * `cadangan: true` mengembalikan suara lokal pengganti (untuk dipakai bila suara neural online gagal tanpa sinyal).
 */
export function pilihSuaraIndonesia(
  kelamin: KelaminGuru = "wanita",
  cadangan = false,
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const hasil = pilihSuaraSeragam(window.speechSynthesis.getVoices(), kelamin);
  return cadangan ? hasil.cadangan : hasil.suara;
}

export function buatUcapanGuru(
  teks: string,
  guru: ProfilGuru,
  cadangan = false,
): SpeechSynthesisUtterance {
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.lang = "id-ID";
  ucapan.rate = guru.laju;
  ucapan.pitch = guru.nada;
  const suara = pilihSuaraIndonesia(guru.kelamin, cadangan);
  if (suara) ucapan.voice = suara;
  return ucapan;
}

export function putarContohSuaraGuru(_guru: ProfilGuru): void {
  return;
}
