/**
 * Praktikum yang dibuat otomatis dari peta konsep (Mind-map) semua Sub-Bab sebuah bab.
 *
 * Konsep penuh: Praktikum terbit setelah siswa lulus Ujian 100% di 4 bab (satu blok).
 * Pilot Project: modul yang siap baru Matematika, jadi Praktikum sudah terbit setelah
 * siswa lulus Ujian 100% di 1 bab. Ubah `SYARAT_BAB_LULUS` ke 4 saat blok lintas-bab siap.
 *
 * Fungsi di sini murni (tanpa jaringan, tanpa acak sungguhan): bab yang sama selalu
 * menghasilkan tugas yang sama, sehingga Praktikum "terbit sekali" dan bisa diperiksa ulang.
 */

/** Pilot: 1 bab lulus Ujian 100%. Konsep penuh: 4 bab. */
export const SYARAT_BAB_LULUS = 1;
export const SYARAT_BAB_KONSEP = 4;

export type KartuPeta = { id: string; teks: string; ikon: string; cabang: string };
export type CabangPeta = { id: string; judul: string; ikon: string };
export type SubBabRingkas = {
  peta?: { pusat?: { judul?: string; ikon?: string }; cabang?: CabangPeta[]; kartu?: KartuPeta[] };
};
export type RingkasBab = {
  chapter_id: string;
  phase_code: string;
  grade: number;
  subject: string;
  title: string;
  subBab: Record<string, SubBabRingkas>;
};

export type LangkahPraktikum = {
  step_id: string;
  chapter_id: string;
  label: string;
  question: string;
  visual: { emoji: string; count: number };
  options: string[];
};

export type TugasPraktikum = {
  blok_id: string;
  phase_code: string;
  grade: number;
  subject: string;
  title: string;
  points_reward: number;
  chapters: { chapter_id: string; number: number; title: string; href: string }[];
  practicum_task: {
    title: string;
    scenario: string;
    steps: LangkahPraktikum[];
    question_prompt: string;
    min_words: number;
  };
};

/** Kunci jawaban tetap di server; klien hanya menerima `TugasPraktikum`. */
export type KunciPraktikum = Record<string, string>;

/** Id Praktikum per bab, dipakai sebagai kunci penyimpanan kiriman. */
export const idPraktikumBab = (kodeBab: string): string => `pilot-${kodeBab}`;

/** "mtk-2-bab3" atau "mtk-4-bab1-kedua" menjadi { kelas: 2, bab: 3 }. */
export function uraiKode(kodeBab: string): { kelas: number; bab: number } | null {
  const m = /^mtk-(\d)-bab(\d+)(?:-kedua)?$/.exec(kodeBab);
  return m ? { kelas: Number(m[1]), bab: Number(m[2]) } : null;
}

/** Bilangan semu dari teks (FNV-1a), supaya pilihan kartu tetap sama tiap kali dibuat. */
function benih(teks: string): number {
  let h = 2166136261;
  for (let i = 0; i < teks.length; i++) {
    h ^= teks.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function acakTetap<T>(daftar: readonly T[], kunci: string): T[] {
  let s = benih(kunci) || 1;
  const hasil = [...daftar];
  for (let i = hasil.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

function minimalKata(kelas: number): number {
  if (kelas <= 2) return 8;
  if (kelas <= 4) return 15;
  return 25;
}

function gabungDaftar(kata: string[]): string {
  if (kata.length <= 1) return kata.join("");
  return `${kata.slice(0, -1).join(", ")}, dan ${kata[kata.length - 1]}`;
}

export function buatPraktikumBab(r: RingkasBab): { tugas: TugasPraktikum; kunci: KunciPraktikum } | null {
  const posisi = uraiKode(r.chapter_id);
  if (!posisi) return null;

  const subBab = Object.entries(r.subBab)
    .filter(([, s]) => (s.peta?.cabang?.length ?? 0) >= 2 && (s.peta?.kartu?.length ?? 0) > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  if (subBab.length === 0) return null;

  // Bab dengan sedikit Sub-Bab mendapat 2 kartu per Sub-Bab; bab panjang cukup 1 kartu per Sub-Bab.
  const perSubBab = subBab.length <= 3 ? 2 : 1;
  const steps: LangkahPraktikum[] = [];
  const kunci: KunciPraktikum = {};
  const pusat: string[] = [];

  for (const [huruf, s] of subBab) {
    const peta = s.peta!;
    const judulPusat = peta.pusat?.judul ?? `Sub-Bab ${huruf}`;
    pusat.push(judulPusat);
    const cabang = peta.cabang!;
    const kartu = acakTetap(peta.kartu!, `${r.chapter_id}:${huruf}`)
      .filter((k) => cabang.some((c) => c.id === k.cabang))
      .slice(0, perSubBab);
    for (const k of kartu) {
      const benar = cabang.find((c) => c.id === k.cabang)!;
      const id = `langkah-${steps.length + 1}`;
      steps.push({
        step_id: id,
        chapter_id: r.chapter_id,
        label: `Sub-Bab ${huruf} · ${judulPusat}`,
        question: `"${k.teks}". Kalimat ini masuk ke cabang mana pada peta ${judulPusat}?`,
        // Ikon tanda benar/salah bisa terbaca sebagai petunjuk jawaban, jadi diganti ikon peta.
        visual: { emoji: (k.ikon && !/[✅❌✔✖]/u.test(k.ikon) ? k.ikon : peta.pusat?.ikon) || "🧩", count: 1 },
        options: acakTetap(
          cabang.map((c) => c.judul),
          `${r.chapter_id}:${huruf}:${k.id}`,
        ),
      });
      kunci[id] = benar.judul;
    }
  }

  const babKe = `Bab ${posisi.bab}`;
  const tugas: TugasPraktikum = {
    blok_id: idPraktikumBab(r.chapter_id),
    phase_code: r.phase_code,
    grade: r.grade,
    subject: r.subject,
    title: `Praktikum ${babKe}: ${r.title}`,
    points_reward: 50,
    chapters: [
      {
        chapter_id: r.chapter_id,
        number: posisi.bab,
        title: r.title,
        href: `/ruang-belajar/${r.chapter_id}`,
      },
    ],
    practicum_task: {
      title: `Satukan Semua Sub-Bab ${babKe}`,
      scenario:
        `Kamu sudah lulus Ujian 100% di ${babKe}: ${r.title}. Sekarang satukan semua yang kamu pelajari. ` +
        `Di setiap langkah ada satu kalimat dari peta konsep. Pilih cabang yang tepat, lalu ceritakan hubungan semuanya dengan kata-katamu sendiri.`,
      steps,
      question_prompt:
        pusat.length > 1
          ? `Ceritakan dengan kata-katamu sendiri: apa hubungan ${gabungDaftar(pusat)}? Berikan satu contoh benda atau kejadian dari kehidupanmu sehari-hari.`
          : `Ceritakan dengan kata-katamu sendiri apa yang kamu pelajari tentang ${pusat[0]}. Berikan satu contoh benda atau kejadian dari kehidupanmu sehari-hari.`,
      min_words: minimalKata(posisi.kelas),
    },
  };
  return { tugas, kunci };
}
