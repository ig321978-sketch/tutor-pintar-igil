export function kunciSiswa(nama: string, kelas: string): string {
  return `${nama.trim().toLowerCase()}|${kelas.trim().toLowerCase()}`;
}

export function kunciMateriTutor(
  kelas: string,
  mapel: string,
  materi: string,
): string {
  const rapikan = (nilai: string) => nilai.trim().toLowerCase().replace(/\s+/g, " ");
  return `${rapikan(kelas)}|${rapikan(mapel)}|${rapikan(materi)}|soal:v2`;
}

export function tanggalWib(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
