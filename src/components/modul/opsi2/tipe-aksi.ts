import type { ComponentType } from "react";
import type { SoalInstans } from "@/lib/opsi2/tipe";

/**
 * Kontrak komponen tindakan: satu komponen per id tindakan, didaftarkan di KOMPONEN_TINDAKAN (registri-komponen.ts).
 * KartuSoal memegang percobaan, umpan, dan petunjuk; komponen tindakan hanya menampilkan area tindakan
 * dan mengirim jawaban lewat `kirim` bila anak sudah siap (mis. memilih atau menekan Periksa).
 */
export type PropsAksi = {
  instans: SoalInstans;
  /** Id bagian (benda, petak, pilihan) yang berkedip sebagai petunjuk tindakan. Kosong bila tidak ada. */
  kedip: string[];
  /** Bertambah 1 tiap jawaban salah (dipakai tampilan yang perlu diputar ulang, mis. benda yang tampil sekilas). */
  putaran: number;
  /** Soal sudah benar atau percobaan habis: matikan semua interaksi. */
  terkunci: boolean;
  /** Tidak null hanya saat percobaan habis: jawaban benar (bentuknya sama dengan yang dikirim) yang harus ditampilkan. */
  tunjukBenar: unknown | null;
  /** Jawaban-jawaban salah sebelumnya, berurutan. Pilihan yang sudah keliru dimatikan oleh komponen pilihan. */
  riwayat: unknown[];
  /** Mengirim jawaban ke pemeriksa tindakan (periksa di registri). Hanya dipanggil saat jawaban lengkap. */
  kirim: (jawaban: unknown) => void;
  /** Membacakan teks lewat suara guru (angka harus sudah dieja). */
  bicara: (teks: string) => void;
};

export type KomponenAksi = ComponentType<PropsAksi>;
