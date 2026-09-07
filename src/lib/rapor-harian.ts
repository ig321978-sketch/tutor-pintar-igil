export type PredikatRapor =
  | "KURANG"
  | "CUKUP"
  | "BAIK"
  | "SANGAT BAIK";

export type BadgeRapor = {
  predikat: PredikatRapor;
  kelas: string;
};

export type IsiRaporHarian = {
  tanggal: string;
  skor: number;
  predikat: PredikatRapor;
  ringkasan: string;
  simulasi: string;
  latihan: string;
  praktikum: string;
  ujian: string;
  sidik: string;
  dariAi: boolean;
};

export function predikatDariSkor(skor: number): PredikatRapor {
  const nilai = Math.max(0, Math.min(100, Math.round(skor)));
  if (nilai <= 50) return "KURANG";
  if (nilai <= 70) return "CUKUP";
  if (nilai <= 90) return "BAIK";
  return "SANGAT BAIK";
}

export function badgeRapor(skor: number): BadgeRapor {
  const predikat = predikatDariSkor(skor);
  const kelas =
    predikat === "KURANG"
      ? "border-rose-300 bg-rose-100 text-rose-700"
      : predikat === "CUKUP"
        ? "border-amber-300 bg-amber-100 text-amber-800"
        : predikat === "BAIK"
          ? "border-emerald-300 bg-emerald-100 text-emerald-800"
          : "border-sky-400 bg-sky-100 text-sky-800";
  return { predikat, kelas };
}

export function tanggalLokalIso(tanggal = new Date()): string {
  const tahun = tanggal.getFullYear();
  const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
  const hari = String(tanggal.getDate()).padStart(2, "0");
  return `${tahun}-${bulan}-${hari}`;
}

export function tanggalIsoSesi(waktu: string): string {
  const parsed = new Date(waktu);
  if (Number.isNaN(parsed.getTime())) return waktu.slice(0, 10);
  return tanggalLokalIso(parsed);
}

export function sidikAktivitasHarian(
  tanggal: string,
  cuplikan: string,
): string {
  const dasar = `${tanggal}|${cuplikan}`;
  let hash = 0;
  for (let i = 0; i < dasar.length; i += 1) {
    hash = (hash * 31 + dasar.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16);
}
