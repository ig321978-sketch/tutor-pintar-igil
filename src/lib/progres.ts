export type ModeBelajar = "teks" | "gambar";

import type { KelaminGuru } from "@/lib/guru";

export type ProfilSiswa = {
  nama: string;
  kelas: string;
  kota: string;
  guruKelamin: KelaminGuru;
};

export type SesiModul = {
  id: string;
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  mode: ModeBelajar;
  waktu: string;
  xp: number;
  kuisTotal: number;
  kuisDijawab: number;
  kuisBenar: number;
  kunciJawaban: string[];
  catatanEvaluasi: string;
  audioCompleted: boolean;
  latihanSelesai: boolean;
  jumlahLatihan: number;
};

export type RaporHarianTersimpan = {
  tanggal: string;
  skor: number;
  predikat: string;
  ringkasan: string;
  pemahaman: string;
  esai: string;
  konsistensi: string;
  sidik: string;
  dariAi: boolean;
};

export type ProgresIgil = {
  profil: ProfilSiswa;
  sesi: SesiModul[];
  jawabanKuis: Record<string, Record<string, string>>;
  xpTotal: number;
  tokenIgil: number;
  raporHarian?: Record<string, RaporHarianTersimpan>;
};

export type BarisPeringkat = {
  nama: string;
  kota: string;
  xp: number;
  milikPengguna?: boolean;
};

const KUNCI = "igil-progres-v1";

export const PERINGKAT_NASIONAL_DASAR: BarisPeringkat[] = [
  { nama: "Raka Pratama", kota: "Bandung", xp: 2480 },
  { nama: "Salsa Azzahra", kota: "Surabaya", xp: 2310 },
  { nama: "Dimas Nugroho", kota: "Yogyakarta", xp: 2195 },
  { nama: "Nadya Putri", kota: "Makassar", xp: 2088 },
  { nama: "Fajar Ramadhan", kota: "Medan", xp: 1970 },
  { nama: "Kirana Dewi", kota: "Denpasar", xp: 1894 },
  { nama: "Bima Sakti", kota: "Semarang", xp: 1760 },
  { nama: "Aulia Rahman", kota: "Palembang", xp: 1642 },
  { nama: "Putri Ayu", kota: "Malang", xp: 1518 },
  { nama: "Galih Wibowo", kota: "Depok", xp: 1420 },
  { nama: "Hana Safira", kota: "Bekasi", xp: 1335 },
  { nama: "Reza Maulana", kota: "Padang", xp: 1210 },
  { nama: "Intan Lestari", kota: "Pontianak", xp: 1095 },
  { nama: "Yusuf Hakim", kota: "Balikpapan", xp: 980 },
  { nama: "Citra Melati", kota: "Manado", xp: 870 },
];

function progresKosong(): ProgresIgil {
  return {
    profil: { nama: "", kelas: "3 SD", kota: "Jakarta", guruKelamin: "wanita" },
    sesi: [],
    jawabanKuis: {},
    xpTotal: 0,
    tokenIgil: 0,
  };
}

function amanDiBrowser(): boolean {
  return typeof window !== "undefined";
}

export function bacaProgres(): ProgresIgil {
  if (!amanDiBrowser()) return progresKosong();
  try {
    const mentah = window.localStorage.getItem(KUNCI);
    if (!mentah) return progresKosong();
    const data = JSON.parse(mentah) as Partial<ProgresIgil>;
    return {
      ...progresKosong(),
      ...data,
      profil: { ...progresKosong().profil, ...data.profil },
      sesi: Array.isArray(data.sesi)
        ? data.sesi.map((sesi) => normalisasiSesi(sesi))
        : [],
      jawabanKuis: data.jawabanKuis ?? {},
      xpTotal: typeof data.xpTotal === "number" ? data.xpTotal : 0,
      tokenIgil: typeof data.tokenIgil === "number" ? data.tokenIgil : 0,
      raporHarian: data.raporHarian ?? {},
    };
  } catch {
    return progresKosong();
  }
}

function normalisasiSesi(sesi: Partial<SesiModul> & { id?: string }): SesiModul {
  const kunci = Array.isArray(sesi.kunciJawaban) ? sesi.kunciJawaban : [];
  const jumlahLatihan =
    typeof sesi.jumlahLatihan === "number" && sesi.jumlahLatihan > 0
      ? sesi.jumlahLatihan
      : kunci.length;
  return {
    id: sesi.id ?? `${Date.now()}`,
    nama: sesi.nama ?? "",
    kelas: sesi.kelas ?? "",
    mapel: sesi.mapel ?? "",
    materi: sesi.materi ?? "",
    mode: sesi.mode === "gambar" ? "gambar" : "teks",
    waktu: sesi.waktu ?? new Date().toISOString(),
    xp: typeof sesi.xp === "number" ? sesi.xp : 0,
    kuisTotal: typeof sesi.kuisTotal === "number" ? sesi.kuisTotal : 0,
    kuisDijawab: typeof sesi.kuisDijawab === "number" ? sesi.kuisDijawab : 0,
    kuisBenar: typeof sesi.kuisBenar === "number" ? sesi.kuisBenar : 0,
    kunciJawaban: kunci,
    catatanEvaluasi: sesi.catatanEvaluasi ?? "",
    audioCompleted: Boolean(sesi.audioCompleted),
    latihanSelesai: Boolean(sesi.latihanSelesai),
    jumlahLatihan,
  };
}

export function sesiSudahBelajar(sesi: SesiModul): boolean {
  return Boolean(sesi.latihanSelesai);
}

function jawabanLatihan(kunciSesi: Record<string, string>): number {
  return Object.keys(kunciSesi).filter((nomor) => {
    const nilai = Number(nomor);
    return Number.isFinite(nilai) && nilai > 0 && nilai < 100;
  }).length;
}

export function simpanProgres(data: ProgresIgil): void {
  if (!amanDiBrowser()) return;
  window.localStorage.setItem(KUNCI, JSON.stringify(data));
}

export function simpanProfil(profil: Partial<ProfilSiswa>): ProgresIgil {
  const data = bacaProgres();
  data.profil = { ...data.profil, ...profil };
  simpanProgres(data);
  return data;
}

export function catatSesiModul(opsi: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  mode: ModeBelajar;
  catatanEvaluasi: string;
  kunciJawaban?: string[];
  kuisTotal?: number;
  jumlahLatihan?: number;
}): SesiModul {
  const data = bacaProgres();
  const kunci = opsi.kunciJawaban ?? [];
  const sesi: SesiModul = {
    id: `${Date.now()}`,
    nama: opsi.nama,
    kelas: opsi.kelas,
    mapel: opsi.mapel,
    materi: opsi.materi,
    mode: opsi.mode,
    waktu: new Date().toISOString(),
    xp: 80,
    kuisTotal: opsi.kuisTotal ?? kunci.length,
    kuisDijawab: 0,
    kuisBenar: 0,
    kunciJawaban: kunci,
    catatanEvaluasi: opsi.catatanEvaluasi,
    audioCompleted: false,
    latihanSelesai: false,
    jumlahLatihan: opsi.jumlahLatihan ?? kunci.length,
  };
  data.sesi.unshift(sesi);
  data.xpTotal += sesi.xp;
  if (opsi.nama) data.profil.nama = opsi.nama;
  if (opsi.kelas) data.profil.kelas = opsi.kelas;
  simpanProgres(data);
  return sesi;
}

export function catatJawabanKuis(
  sesiId: string,
  nomorSoal: number,
  pilihan: string,
  benar = false,
): ProgresIgil {
  const data = bacaProgres();
  const kunciSesi = data.jawabanKuis[sesiId] ?? {};
  const sudahAda = Boolean(kunciSesi[String(nomorSoal)]);
  kunciSesi[String(nomorSoal)] = pilihan;
  data.jawabanKuis[sesiId] = kunciSesi;

  const sesi = data.sesi.find((item) => item.id === sesiId);
  if (sesi) {
    sesi.kuisDijawab = Object.keys(kunciSesi).length;
    const dikerjakanLatihan = jawabanLatihan(kunciSesi);
    if (sesi.jumlahLatihan > 0 && dikerjakanLatihan >= sesi.jumlahLatihan) {
      sesi.latihanSelesai = true;
    }
    if (!sudahAda) {
      sesi.xp += benar ? 16 : 8;
      data.xpTotal += benar ? 16 : 8;
      if (benar) sesi.kuisBenar += 1;
    }
  }

  simpanProgres(data);
  return data;
}

export function catatEvaluasiTambahan(sesiId: string, catatan: string): void {
  const data = bacaProgres();
  const sesi = data.sesi.find((item) => item.id === sesiId);
  if (!sesi || !catatan.trim()) return;
  sesi.catatanEvaluasi = `${sesi.catatanEvaluasi}\n${catatan}`.trim();
  sesi.xp += 20;
  data.xpTotal += 20;
  simpanProgres(data);
}

export function catatAudioSelesai(sesiId: string): ProgresIgil {
  const data = bacaProgres();
  const sesi = data.sesi.find((item) => item.id === sesiId);
  if (sesi && !sesi.audioCompleted) {
    sesi.audioCompleted = true;
    simpanProgres(data);
  }
  return data;
}

export function simpanRaporHarian(
  tanggal: string,
  isi: RaporHarianTersimpan,
): ProgresIgil {
  const data = bacaProgres();
  data.raporHarian = { ...(data.raporHarian ?? {}), [tanggal]: isi };
  simpanProgres(data);
  return data;
}

export function ringkasanRapor(data: ProgresIgil = bacaProgres()) {
  const totalModul = data.sesi.length;
  const totalKuis = data.sesi.reduce((jumlah, sesi) => jumlah + sesi.kuisDijawab, 0);
  const totalSoal = data.sesi.reduce((jumlah, sesi) => jumlah + sesi.kuisTotal, 0);
  const totalBenar = data.sesi.reduce(
    (jumlah, sesi) => jumlah + (sesi.kuisBenar ?? 0),
    0,
  );
  const ketepatan =
    totalKuis === 0 ? 0 : Math.round((totalBenar / totalKuis) * 100);
  const catatan = data.sesi
    .map((sesi) => sesi.catatanEvaluasi)
    .filter((isi) => isi.trim())
    .slice(0, 6);
  return { totalModul, totalKuis, totalSoal, ketepatan, catatan, xpTotal: data.xpTotal };
}

export function susunPeringkatNasional(
  data: ProgresIgil = bacaProgres(),
): BarisPeringkat[] {
  const nama = data.profil.nama.trim() || "Siswa $IGIL";
  const pengguna: BarisPeringkat = {
    nama,
    kota: data.profil.kota.trim() || "Indonesia",
    xp: data.xpTotal,
    milikPengguna: true,
  };
  return [...PERINGKAT_NASIONAL_DASAR, pengguna]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 20);
}

export function tambahTokenIgil(jumlah: number): number {
  if (jumlah <= 0) return bacaProgres().tokenIgil;
  const data = bacaProgres();
  data.tokenIgil += jumlah;
  simpanProgres(data);
  return data.tokenIgil;
}

export function kurangiTokenIgil(jumlah: number): number {
  const data = bacaProgres();
  data.tokenIgil = Math.max(0, data.tokenIgil - Math.max(0, jumlah));
  simpanProgres(data);
  return data.tokenIgil;
}

export function tetapkanTokenIgil(jumlah: number): number {
  const data = bacaProgres();
  data.tokenIgil = Math.max(0, Math.floor(jumlah));
  simpanProgres(data);
  return data.tokenIgil;
}
