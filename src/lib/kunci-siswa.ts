export function kunciSiswa(nama: string, kelas: string): string {
  return `${nama.trim().toLowerCase()}|${kelas.trim().toLowerCase()}`;
}

export function rapikanKunci(nilai: string): string {
  return nilai
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[’‘ʻ`´]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s*:\s*/g, ": ");
}

export function kunciMapelTutor(mapel: string): string {
  const n = rapikanKunci(mapel);
  if (
    n === "agama islam" ||
    n === "pai" ||
    n === "pendidikan agama islam" ||
    n === "pendidikan agama islam dan budi pekerti" ||
    n === "pendidikan agama dan budi pekerti"
  ) {
    return "pendidikan agama islam dan budi pekerti";
  }
  if (n === "ppkn" || n === "pkn" || n === "pendidikan kewarganegaraan") {
    return "pendidikan pancasila";
  }
  if (
    n === "bindo" ||
    n === "b.indonesia" ||
    n === "b indonesia" ||
    n === "bahasa indonesia"
  ) {
    return "bahasa indonesia";
  }
  if (
    n === "pjok" ||
    n === "penjas" ||
    n === "penjaskes" ||
    n === "pendidikan jasmani" ||
    n === "pendidikan jasmani olahraga dan kesehatan" ||
    n === "pendidikan jasmani, olahraga, dan kesehatan"
  ) {
    return "pendidikan jasmani, olahraga, dan kesehatan";
  }
  if (
    n === "english" ||
    n === "b.inggris" ||
    n === "b inggris" ||
    n === "bahasa inggris"
  ) {
    return "bahasa inggris";
  }
  if (n === "musik" || n === "seni musik" || n === "music") {
    return "seni musik";
  }
  if (n === "rupa" || n === "seni rupa" || n === "seni lukis") {
    return "seni rupa";
  }
  if (
    n === "pak" ||
    n === "pa kristen" ||
    n === "agama kristen" ||
    n === "pendidikan agama kristen" ||
    n === "pendidikan agama kristen dan budi pekerti"
  ) {
    return "pendidikan agama kristen dan budi pekerti";
  }
  if (
    n === "katolik" ||
    n === "pa katolik" ||
    n === "agama katolik" ||
    n === "pendidikan agama katolik" ||
    n === "pendidikan agama katolik dan budi pekerti"
  ) {
    return "pendidikan agama katolik dan budi pekerti";
  }
  if (
    n === "buddha" ||
    n === "budha" ||
    n === "pa buddha" ||
    n === "pa budha" ||
    n === "agama buddha" ||
    n === "agama budha" ||
    n === "pendidikan agama buddha" ||
    n === "pendidikan agama budha" ||
    n === "pendidikan agama budha dan budi pekerti" ||
    n === "pendidikan agama buddha dan budi pekerti"
  ) {
    return "pendidikan agama buddha dan budi pekerti";
  }
  if (
    n === "hindu" ||
    n === "pa hindu" ||
    n === "agama hindu" ||
    n === "pendidikan agama hindu" ||
    n === "pendidikan agama hindu dan budi pekerti"
  ) {
    return "pendidikan agama hindu dan budi pekerti";
  }
  return n;
}

export const VERSI_KUNCI_MATERI = "naskah:v3";

export function identitasCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
): string {
  return `${rapikanKunci(kelas)}|${kunciMapelTutor(mapel)}|${rapikanKunci(materi)}`;
}

function variasiTulisan(nilai: string): string[] {
  const rapi = rapikanKunci(nilai);
  const curly = rapi.replace(/'/g, "\u2019");
  const mentah = nilai.trim().toLowerCase().replace(/\s+/g, " ");
  return [...new Set([rapi, curly, mentah].filter(Boolean))];
}

export function kunciMateriTutor(
  kelas: string,
  mapel: string,
  materi: string,
): string {
  return `${identitasCacheMateri(kelas, mapel, materi)}|${VERSI_KUNCI_MATERI}`;
}

export function kandidatKunciMateri(
  kelas: string,
  mapel: string,
  materi: string,
): string[] {
  const kelasR = rapikanKunci(kelas);
  const mapelAsli = rapikanKunci(mapel);
  const daftarMapel = new Set<string>([mapelAsli, kunciMapelTutor(mapel)]);
  if (
    mapelAsli.includes("agama") &&
    (mapelAsli.includes("islam") ||
      mapelAsli === "pendidikan agama dan budi pekerti")
  ) {
    daftarMapel.add("pendidikan agama islam dan budi pekerti");
    daftarMapel.add("pendidikan agama dan budi pekerti");
    daftarMapel.add("agama islam");
  }
  const hasil = new Set<string>();
  for (const nama of daftarMapel) {
    for (const judul of variasiTulisan(materi)) {
      hasil.add(`${kelasR}|${nama}|${judul}|${VERSI_KUNCI_MATERI}`);
    }
  }
  return [...hasil];
}

export function tanggalWib(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
