/**
 * Meja Ukur (Bab 7): laboratorium virtual 2D. Sebuah pita sepanjang 12 ruas diukur dengan satuan tidak baku
 * (balok besar, stik, klip kecil). Anak meletakkan satuan satu per satu, dan boleh sengaja mencoba kebiasaan
 * yang salah: mulai dari tengah, memberi celah, atau menumpuk. Mesin menunjukkan akibatnya pada hasil ukur.
 * Satuan berbeda memberi bilangan berbeda untuk benda yang sama panjang.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const PANJANG_BENDA = 12;
export const MAKS_SATUAN = 9;

export type IdSatuan = "balok" | "stik" | "klip";

export type Satuan = { id: IdSatuan; nama: string; panjang: number; warna: string };

export const SATUAN: Satuan[] = [
  { id: "balok", nama: "Balok besar", panjang: 4, warna: "#60A5FA" },
  { id: "stik", nama: "Stik", panjang: 3, warna: "#F59E0B" },
  { id: "klip", nama: "Klip kecil", panjang: 2, warna: "#34D399" },
];

export const satuanDari = (id: IdSatuan): Satuan => SATUAN.find((s) => s.id === id) as Satuan;

/** Berapa satuan tepat menutup benda bila disusun dengan benar. */
export const hasilBenar = (id: IdSatuan) => PANJANG_BENDA / satuanDari(id).panjang;

export const GESER_TENGAH = 3;
export const CELAH = 1;
export const TUMPUK = 1;

export type Susunan = { id: IdSatuan; n: number; dariTengah: boolean; celah: boolean; tumpuk: boolean };

export type Kotak = { x: number; lebar: number; baris: 0 | 1 };

export type StatusUkur = "tepat" | "kurang" | "lebih" | "salah-cara";

export type HasilUkur = {
  kotak: Kotak[];
  akhir: number;
  masalah: string[];
  status: StatusUkur;
  pesan: string;
};

export function susun(s: Susunan): HasilUkur {
  const u = satuanDari(s.id).panjang;
  const awal = s.dariTengah ? GESER_TENGAH : 0;
  const langkah = u + (s.celah ? CELAH : 0) - (s.tumpuk ? TUMPUK : 0);
  const n = Math.max(0, Math.min(MAKS_SATUAN, s.n));
  const kotak: Kotak[] = Array.from({ length: n }, (_, i) => ({ x: awal + i * langkah, lebar: u, baris: (s.tumpuk ? i % 2 : 0) as 0 | 1 }));
  const akhir = n === 0 ? awal : kotak[n - 1].x + u;
  const masalah: string[] = [];
  if (s.dariTengah) masalah.push("Satuan dimulai dari tengah, bukan dari ujung benda.");
  if (s.celah) masalah.push("Ada celah di antara satuan. Satuan harus rapat.");
  if (s.tumpuk) masalah.push("Satuan bertumpuk. Satuan harus berderet, tidak menumpuk.");
  let status: StatusUkur;
  let pesan: string;
  if (masalah.length > 0) {
    status = "salah-cara";
    pesan = `Cara mengukurnya belum benar. ${masalah.join(" ")}`;
  } else if (akhir < PANJANG_BENDA) {
    status = "kurang";
    pesan = n === 0 ? "Letakkan satuan pertama di ujung benda." : "Belum sampai ujung benda. Tambah satuan.";
  } else if (akhir > PANJANG_BENDA) {
    status = "lebih";
    pesan = "Satuan melewati ujung benda. Kurangi satuan.";
  } else {
    status = "tepat";
    pesan = `Tepat! Panjang pita sama dengan ${n} ${satuanDari(s.id).nama.toLowerCase()}.`;
  }
  return { kotak, akhir, masalah, status, pesan };
}

/** Hasil ukur benar untuk setiap satuan: benda yang sama, bilangan berbeda. */
export function tabelHasil(): { id: IdSatuan; nama: string; n: number }[] {
  return SATUAN.map((s) => ({ id: s.id, nama: s.nama, n: hasilBenar(s.id) }));
}

export function ucapanUkur(s: Susunan): string {
  const h = susun(s);
  const nama = satuanDari(s.id).nama.toLowerCase();
  if (h.status === "tepat") return `Pita diukur dengan ${s.n} ${nama}. Panjang pita ${s.n} ${nama}. Satuan lain memberi bilangan lain, karena ukurannya berbeda.`;
  return h.pesan;
}
