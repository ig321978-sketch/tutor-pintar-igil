/**
 * Pertanyaan, Kritik, dan Saran lewat suara di kartu Tahap. Logika murni (tanpa React dan jaringan),
 * dipakai bersama API (src/app/api/masukan) dan tampilan (components/modul/MasukanTahap.tsx).
 * Diuji: scripts/uji-masukan.mjs. Skema: supabase/migrations/07_masukan_tahap.sql.
 */

export type JenisMasukan = "pertanyaan" | "kritik" | "saran";
export const JENIS_MASUKAN: JenisMasukan[] = ["pertanyaan", "kritik", "saran"];
export const LABEL_JENIS: Record<JenisMasukan, { nama: string; ikon: string; ajakan: string }> = {
  pertanyaan: { nama: "Pertanyaan", ikon: "\u{2753}", ajakan: "Apa yang ingin kamu tanyakan?" },
  kritik: { nama: "Kritik", ikon: "\u{1F6E0}\u{FE0F}", ajakan: "Bagian mana yang kurang bagus?" },
  saran: { nama: "Saran", ikon: "\u{1F4A1}", ajakan: "Apa usulmu supaya lebih seru?" },
};
/** Kritik dan Saran diteruskan ke admin sebagai teks. */
export const DITERUSKAN_KE_ADMIN: JenisMasukan[] = ["kritik", "saran"];

export const PANJANG_MIN = 2;
export const PANJANG_MAKS = 600;

export const adalahJenisMasukan = (v: unknown): v is JenisMasukan => typeof v === "string" && (JENIS_MASUKAN as string[]).includes(v);

/** Rapikan teks hasil rekam suara: spasi ganda, panjang maksimum. */
export function rapikanIsi(teks: string): string {
  return teks.replace(/\s+/g, " ").trim().slice(0, PANJANG_MAKS);
}

export function validasiMasukan(b: { jenis?: unknown; bab?: unknown; tahap?: unknown; isi?: unknown }): { jenis: JenisMasukan; bab: string; tahap: string; isi: string } | null {
  if (!adalahJenisMasukan(b.jenis)) return null;
  if (typeof b.bab !== "string" || !/^[a-z0-9][a-z0-9-]{0,63}$/i.test(b.bab)) return null;
  if (typeof b.tahap !== "string") return null;
  const tahap = b.tahap.replace(/\s+/g, " ").trim().slice(0, 80);
  if (!tahap) return null;
  if (typeof b.isi !== "string") return null;
  const isi = rapikanIsi(b.isi);
  if (isi.length < PANJANG_MIN) return null;
  return { jenis: b.jenis, bab: b.bab, tahap, isi };
}

/** Tanggal WIB (YYYY-MM-DD) untuk sebuah waktu; dipakai tampilan "sudah mengirim hari ini". */
export function tanggalWib(waktu: Date = new Date()): string {
  const wib = new Date(waktu.getTime() + 7 * 3600 * 1000);
  return wib.toISOString().slice(0, 10);
}

/** Bab dari alamat halaman, mis. /ruang-belajar/mtk-1-bab1 menjadi mtk-1-bab1. */
export function babDariAlamat(pathname: string | null | undefined): string {
  const m = (pathname ?? "").match(/\/ruang-belajar\/([a-z0-9][a-z0-9-]{0,63})/i);
  return m ? m[1] : "umum";
}

/** Instruksi sistem untuk AI. Jawaban pendek, ramah anak SD, siap dibacakan suara (angka ditulis dengan kata). */
export function instruksiAi(jenis: JenisMasukan, bab: string, tahap: string): string {
  const umum = [
    "Kamu adalah guru IGIL yang ramah untuk anak SD di Indonesia.",
    `Siswa sedang belajar di bab "${bab}", tahap "${tahap}".`,
    "Jawab dalam bahasa Indonesia yang sederhana, paling banyak tiga kalimat pendek.",
    "Tulis semua bilangan dengan kata, bukan angka, karena jawabanmu akan dibacakan dengan suara.",
    "Jangan memakai tanda markdown, emoji, atau daftar berpoin.",
    "Jangan meminta atau menyebut data pribadi. Bila isinya tidak pantas atau di luar pelajaran, arahkan kembali ke pelajaran dengan sopan.",
  ];
  if (jenis === "pertanyaan") umum.push("Siswa mengajukan pertanyaan. Jawab pertanyaannya dengan benar dan beri satu contoh kecil bila perlu.");
  else
    umum.push(
      `Siswa memberi ${jenis}. Ucapkan terima kasih, ulangi singkat inti ${jenis}nya, dan katakan bahwa ${jenis} itu sudah diteruskan ke tim IGIL untuk diperbaiki. Jangan berjanji kapan selesai.`,
    );
  return umum.join(" ");
}

/** Jawaban cadangan bila AI tidak bisa dihubungi. */
export function jawabanCadangan(jenis: JenisMasukan): string {
  if (jenis === "pertanyaan") return "Terima kasih, pertanyaanmu sudah tersimpan. Guru belum bisa menjawab sekarang. Coba tanyakan juga kepada orang tuamu, ya.";
  return `Terima kasih atas ${jenis}mu. ${jenis === "kritik" ? "Kritik" : "Saran"} ini sudah diteruskan ke tim IGIL supaya pelajarannya makin baik.`;
}

/** Bersihkan jawaban AI supaya enak dibacakan: buang markdown, emoji berlebih, dan potong panjangnya. */
export function bersihkanJawaban(teks: string): string {
  return teks
    .replace(/[*_#`>]+/g, "")
    .replace(/^\s*[-•]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 900);
}

/** Pesan ramah untuk galat dari server. */
export function pesanMasukan(galat: string): string {
  if (/Sudah mengirim/i.test(galat)) return "Kamu sudah mengirim pertanyaan, kritik, atau saran hari ini. Coba lagi besok, ya.";
  if (/Masuk diperlukan/i.test(galat)) return "Masuk dulu ke akun, lalu coba lagi.";
  if (/kosong/i.test(galat)) return "Suaramu belum terekam. Rekam lagi, ya.";
  return "Server belum bisa menerima masukan sekarang. Coba lagi sebentar.";
}
