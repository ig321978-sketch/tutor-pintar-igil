/**
 * Aturan akses tab Latihan dan Ujian (logika murni, tanpa React dan tanpa jaringan).
 * Diuji: scripts/uji-akses-latihan-ujian.mjs.
 *
 * Aturan Pilot Project:
 *  1. ADMIN boleh kapan pun.
 *  2. USER yang sudah terdaftar dan masuk (login) boleh setelah semua Sub-Bab Materi bab itu tuntas.
 *  3. Selain itu (tamu, atau user yang Materinya belum tuntas) ditutup.
 *
 * Penegakan di server: rute /api/belajar/latihan, latihan/mulai, ujian/mulai memanggil `periksaAksesLatihanUjian`
 * (src/lib/belajar-server.ts), yang memakai fungsi di sini. Tampilan kartu terkunci di pemutar modul memakai
 * aturan yang sama. Mode periksa pemilik di localhost (`next dev`) tetap terbuka, itu hanya di sisi tampilan
 * (src/lib/buka-semua-kunci.ts); server produksi tidak mengenal pengecualian itu.
 */

import { uraiJejak } from "./jejak-tahap";

/**
 * Sub-Bab wajib tiap bab (kode bab server). Harus sama dengan Sub-Bab yang tampil di tab Materi bab itu.
 * Diuji terhadap berkas data bab (src/data/kelasN-babM.json) di scripts/uji-akses-latihan-ujian.mjs, jadi bab baru yang lupa didaftarkan ketahuan.
 * Bab yang tidak ada di sini ditutup untuk non-admin (aman bila gagal).
 */
export const SUB_BAB_WAJIB: Readonly<Record<string, readonly string[]>> = {
  "k1-mat-bab1": ["A", "B", "C", "D"],
  "k1-mat-bab1-kedua": ["A"],
  "k1-mat-bab2": ["A", "B", "C"],
  "k1-mat-bab3": ["A", "B", "C", "D"],
  "k1-mat-bab4": ["A", "B", "C"],
  "k1-mat-bab5": ["A", "B", "C", "D"],
  "k1-mat-bab6": ["A", "B", "C"],
  "k1-mat-bab7": ["A", "B"],
  "k1-mat-bab8": ["A", "B"],
  "k2-mat-bab1": ["A", "B", "C"],
  "k2-mat-bab2": ["A", "B", "C"],
  "k2-mat-bab3": ["A", "B", "C"],
  "k2-mat-bab4": ["A", "B"],
  "k2-mat-bab5": ["A", "B", "C"],
  "k2-mat-bab6": ["A", "B"],
  "k2-mat-bab7": ["A", "B"],
  "k2-mat-bab8": ["A", "B"],
  "k3-mat-bab1": ["A", "B", "C", "D", "E", "F", "G"],
  "k3-mat-bab2": ["A", "B"],
  "k3-mat-bab3": ["A", "B", "C", "D"],
  "k3-mat-bab4": ["A", "B", "C"],
  "k3-mat-bab5": ["A", "B"],
  "k4-mat-bab1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  "k4-mat-bab1-kedua": ["A"],
  "k4-mat-bab2": ["A", "B", "C", "D", "E"],
  "k4-mat-bab3": ["A", "B"],
  "k4-mat-bab4": ["A", "B"],
  "k4-mat-bab5": ["A", "B"],
  "k4-mat-bab6": ["A", "B"],
  "k5-mat-bab1": ["A", "B", "C", "D"],
  "k5-mat-bab2": ["A", "B", "C", "D", "E"],
  "k5-mat-bab3": ["A", "B", "C"],
  "k5-mat-bab4": ["A", "B", "C", "D", "E"],
  "k5-mat-bab5": ["A", "B", "C", "D"],
  "k5-mat-bab6": ["A", "B", "C", "D"],
  "k5-mat-bab7": ["A", "B"],
  "k5-mat-bab8": ["A", "B", "C"],
  "k5-mat-bab9": ["A", "B", "C"],
  "k6-mat-bab1": ["A", "B", "C"],
  "k6-mat-bab2": ["A", "B", "C"],
  "k6-mat-bab3": ["A", "B", "C"],
  "k6-mat-bab4": ["A", "B"],
};

/** Kode bab server ("k2-mat-bab3") menjadi kode bab aplikasi ("mtk-2-bab3"), kunci catatan posisi belajar. */
export function kodeBabAplikasi(chapterId: string): string | null {
  const m = /^k(\d{1,2})-mat-bab(\d{1,2})(-kedua)?$/.exec(chapterId);
  return m ? `mtk-${m[1]}-bab${m[2]}${m[3] ?? ""}` : null;
}

export type AlasanAkses = "admin" | "materi_tuntas";
export type AlasanTutup = "belum_masuk" | "materi_belum_tuntas" | "bab_tidak_dikenal";

export type KeputusanAkses =
  | { boleh: true; alasan: AlasanAkses }
  | { boleh: false; alasan: AlasanTutup; selesai: number; total: number };

/** Sub-Bab wajib yang belum ada di daftar selesai. Null bila bab tidak terdaftar. */
export function subBabBelumTuntas(chapterId: string, subSelesai: readonly string[]): string[] | null {
  const wajib = SUB_BAB_WAJIB[chapterId];
  if (!wajib || wajib.length === 0) return null;
  const sudah = new Set(subSelesai);
  return wajib.filter((s) => !sudah.has(s));
}

/**
 * Keputusan akses. `catatan` = isi catatan posisi belajar dari server (bukan dari perangkat), atau null bila belum ada.
 * Admin lolos tanpa membaca catatan. Tamu (belum masuk) selalu ditutup.
 */
export function putuskanAkses(opsi: { admin: boolean; masuk: boolean; chapterId: string; catatan: unknown }): KeputusanAkses {
  if (opsi.admin && opsi.masuk) return { boleh: true, alasan: "admin" };
  const wajib = SUB_BAB_WAJIB[opsi.chapterId];
  const total = wajib?.length ?? 0;
  if (!opsi.masuk) return { boleh: false, alasan: "belum_masuk", selesai: 0, total };
  const belum = subBabBelumTuntas(opsi.chapterId, uraiJejak(opsi.catatan).subSelesai);
  if (belum === null) return { boleh: false, alasan: "bab_tidak_dikenal", selesai: 0, total: 0 };
  if (belum.length > 0) return { boleh: false, alasan: "materi_belum_tuntas", selesai: total - belum.length, total };
  return { boleh: true, alasan: "materi_tuntas" };
}

/** Kalimat untuk siswa (istilah di layar: Latihan, Ujian, Materi, Sub-Bab). */
export function pesanTutup(k: Extract<KeputusanAkses, { boleh: false }>, tab: "Latihan" | "Ujian"): { judul: string; isi: string } {
  if (k.alasan === "belum_masuk") {
    return {
      judul: `${tab} terbuka setelah kamu masuk`,
      isi: `Masuk dulu ke akunmu, lalu selesaikan semua Sub-Bab di tab Materi. Setelah itu ${tab} bab ini terbuka.`,
    };
  }
  if (k.alasan === "materi_belum_tuntas") {
    return {
      judul: `${tab} terbuka setelah Materi selesai`,
      isi: `Selesaikan semua Sub-Bab di tab Materi dulu, ya. Sub-Bab yang sudah tuntas: ${k.selesai} dari ${k.total}.`,
    };
  }
  return {
    judul: `${tab} bab ini belum dibuka`,
    isi: "Bab ini belum siap dikerjakan. Pelajari Materi-nya dulu, ya.",
  };
}

export type StatusProfilAkses = "memuat" | "belum_siap" | "belum_masuk" | "belum_ada_anak" | "siap";
export type KondisiTab = "terbuka" | "memuat" | "belum_masuk" | "belum_ada_anak" | "server_belum_siap" | "materi_belum_tuntas";

/**
 * Keadaan tab Latihan dan Ujian di layar. `bebas` = mode periksa pemilik (localhost atau admin yang masuk).
 * Ini hanya tampilan; server menegakkan aturan yang sama lewat `putuskanAkses`.
 */
export function kondisiTab(opsi: { bebas: boolean; status: StatusProfilAkses; materiTuntas: boolean }): KondisiTab {
  if (opsi.bebas) return "terbuka";
  if (opsi.status === "memuat") return "memuat";
  if (opsi.status === "belum_masuk") return "belum_masuk";
  if (opsi.status === "belum_ada_anak") return "belum_ada_anak";
  if (opsi.status === "belum_siap") return "server_belum_siap";
  return opsi.materiTuntas ? "terbuka" : "materi_belum_tuntas";
}
