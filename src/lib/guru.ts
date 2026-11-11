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

const POLA_WANITA = /female|woman|wanita|girl|zira|samantha|susan|karen|hazel|moira|tessa|veena|sari|gadis|damayanti/i;
const POLA_PRIA = /male|man|pria|boy|david|daniel|mark|james|alex|budi|dimas|andika|ardi/i;

function pilihSuaraDariDaftar(
  daftar: SpeechSynthesisVoice[],
  kelamin: KelaminGuru,
): SpeechSynthesisVoice | null {
  if (daftar.length === 0) return null;
  if (kelamin === "wanita") {
    return daftar.find((suara) => POLA_WANITA.test(suara.name)) ?? daftar[0] ?? null;
  }
  return (
    daftar.find((suara) => POLA_PRIA.test(suara.name)) ??
    daftar.find((suara) => !POLA_WANITA.test(suara.name)) ??
    daftar[0] ??
    null
  );
}

export function pilihSuaraIndonesia(
  kelamin: KelaminGuru = "wanita",
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined") return null;
  const daftar = window.speechSynthesis
    .getVoices()
    .filter(
      (suara) =>
        suara.lang.toLowerCase().startsWith("id") ||
        /indonesia/i.test(suara.name),
    );
  return pilihSuaraDariDaftar(daftar, kelamin);
}

/** Suara Inggris untuk kata/frasa asing agar pelafalan tidak mengikuti ejaan id-ID. */
export function pilihSuaraInggris(
  kelamin: KelaminGuru = "wanita",
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined") return null;
  const semua = window.speechSynthesis.getVoices();
  const en = semua.filter((suara) => {
    const lang = suara.lang.replace("_", "-").toLowerCase();
    return lang.startsWith("en");
  });
  // Utamakan en-US / en-GB lokal
  const lokal = en.filter((s) => s.localService);
  const usGb = (lokal.length ? lokal : en).filter((s) => {
    const lang = s.lang.replace("_", "-").toLowerCase();
    return lang.startsWith("en-us") || lang.startsWith("en-gb") || lang === "en";
  });
  return pilihSuaraDariDaftar(usGb.length ? usGb : en, kelamin);
}

export function buatUcapanGuru(
  teks: string,
  guru: ProfilGuru,
  bahasa: "id-ID" | "en-US" = "id-ID",
): SpeechSynthesisUtterance {
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.lang = bahasa;
  ucapan.rate = guru.laju;
  ucapan.pitch = guru.nada;
  const suara =
    bahasa === "en-US" ? pilihSuaraInggris(guru.kelamin) ?? pilihSuaraIndonesia(guru.kelamin) : pilihSuaraIndonesia(guru.kelamin);
  if (suara) ucapan.voice = suara;
  // Pastikan lang mengikuti suara terpilih bila mesin Inggris tersedia
  if (bahasa === "en-US" && suara?.lang) {
    const lang = suara.lang.replace("_", "-");
    if (lang.toLowerCase().startsWith("en")) ucapan.lang = lang;
  }
  return ucapan;
}

export function putarContohSuaraGuru(_guru: ProfilGuru): void {
  return;
}
