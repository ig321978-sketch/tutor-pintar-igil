export type KelaminGuru = "wanita" | "pria";
export type JenjangGuru = "SD" | "SMP" | "SMA";

export type ProfilGuru = {
  kelamin: KelaminGuru;
  nama: string;
  peran: string;
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
      sapaanContoh:
        "Halo Nak, aku Bu Sari. Yuk kita belajar pelan-pelan, pasti kamu bisa.",
      nada: 1.15,
      laju: 0.9,
    },
    pria: {
      kelamin: "pria",
      nama: "Pak Budi",
      peran: "Guru SD yang ramah dan semangat",
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
      sapaanContoh:
        "Hai, aku Bu Laila. Kita bahas materi ini langkah demi langkah ya.",
      nada: 1.08,
      laju: 0.92,
    },
    pria: {
      kelamin: "pria",
      nama: "Pak Andra",
      peran: "Guru SMP yang santai dan jelas",
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
      sapaanContoh:
        "Halo, aku Bu Maya. Kita bedah materinya dengan nalar yang rapi.",
      nada: 1.05,
      laju: 0.94,
    },
    pria: {
      kelamin: "pria",
      nama: "Pak Dimas",
      peran: "Guru SMA yang runtut dan fokus",
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

export function pasanganGuru(kelas: string): ProfilGuru[] {
  const jenjang = jenjangGuru(kelas);
  return [GURU_PER_JENJANG[jenjang].wanita, GURU_PER_JENJANG[jenjang].pria];
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
  const wanita = /female|woman|wanita|girl|zira|andika|sari/i;
  const pria = /male|man|pria|boy|david|budi|dimas/i;
  if (kelamin === "wanita") {
    return (
      daftar.find((suara) => wanita.test(suara.name)) ?? daftar[0] ?? null
    );
  }
  return (
    daftar.find((suara) => pria.test(suara.name)) ??
    daftar.find((suara) => !wanita.test(suara.name)) ??
    daftar[0] ??
    null
  );
}

export function buatUcapanGuru(
  teks: string,
  guru: ProfilGuru,
): SpeechSynthesisUtterance {
  const ucapan = new SpeechSynthesisUtterance(teks);
  ucapan.lang = "id-ID";
  ucapan.rate = guru.laju;
  ucapan.pitch = guru.nada;
  const suara = pilihSuaraIndonesia(guru.kelamin);
  if (suara) ucapan.voice = suara;
  return ucapan;
}

export function putarContohSuaraGuru(guru: ProfilGuru): void {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(buatUcapanGuru(guru.sapaanContoh, guru));
}
