export function kunciSiswa(nama: string, kelas: string): string {
  return `${nama.trim().toLowerCase()}|${kelas.trim().toLowerCase()}`;
}

export function rapikanKunci(nilai: string): string {
  return nilai
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*:\s*/g, ": ");
}

export function kunciMapelTutor(mapel: string): string {
  const n = rapikanKunci(mapel);
  if (
    n === "agama islam" ||
    n === "pai" ||
    n === "pendidikan agama islam" ||
    n === "pendidikan agama islam dan budi pekerti"
  ) {
    return "pendidikan agama islam dan budi pekerti";
  }
  return n;
}

export function kunciMateriTutor(
  kelas: string,
  mapel: string,
  materi: string,
): string {
  return `${rapikanKunci(kelas)}|${kunciMapelTutor(mapel)}|${rapikanKunci(materi)}|soal:v2`;
}

export function kandidatKunciMateri(
  kelas: string,
  mapel: string,
  materi: string,
): string[] {
  const kelasR = rapikanKunci(kelas);
  const materiR = rapikanKunci(materi);
  const mapelAsli = rapikanKunci(mapel);
  const daftar = new Set<string>([mapelAsli, kunciMapelTutor(mapel)]);
  if (
    mapelAsli.includes("agama") &&
    (mapelAsli.includes("islam") ||
      mapelAsli === "pendidikan agama dan budi pekerti")
  ) {
    daftar.add("pendidikan agama islam dan budi pekerti");
    daftar.add("pendidikan agama dan budi pekerti");
    daftar.add("agama islam");
  }
  return [...daftar].map((nama) => `${kelasR}|${nama}|${materiR}|soal:v2`);
}

export function tanggalWib(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
