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
