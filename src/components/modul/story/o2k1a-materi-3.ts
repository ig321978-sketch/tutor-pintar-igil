import type { Aksi, AdeganStory, KetukanStory } from "./logika-story";
import { eja, emo, gambarTokoh, hapus, idx, k, tambah, ubah } from "./kit/dasar";
import { IGIL, TALA, lambang } from "./kit/dunia-k1";
import { LATAR_TERANG, OX1, OX10, OY, awalJalur, idJalur, idTitikMundur, jalurSegmen, modelLambang, panelTulis, titikMulai, titikMundur } from "./o2k1a-bantu";

/**
 * Video Sub-Bab A (bagian 3): langkah TULIS. Lambang nol sampai sembilan, lalu sepuluh paling akhir (dari satu dan nol).
 * Satu goresan per ketukan; jalur tergambar bertahap dan disorot; anak mengikuti dengan jari (anak panah kiri dan kanan di pojok papan).
 * "Sekarang kamu coba, ya." hanya sekali di akhir tiap adegan, dengan jeda hitung mundur visual.
 */

type Langkah = { suara: string; seg?: number; pemicu?: string; titik?: [number, number]; arah?: string };
const KIRI = "\u{2B05}";
const KANAN = "\u{27A1}";
const BAWAH = "\u{2B07}";
const ATAS = "\u{2B06}";

const TULIS: Record<string, Langkah[]> = {
  "0": [{ suara: "Menulis nol dengan jarimu. Putar ke kiri sampai bertemu.", seg: 0, pemicu: "putar", arah: KIRI }],
  "1": [{ suara: "Menulis satu. Garis lurus turun.", seg: 0, pemicu: "garis", arah: BAWAH }],
  "2": [
    { suara: "Menulis dua. Lengkung ke kanan.", seg: 0, pemicu: "lengkung", arah: KANAN },
    { suara: "Lalu turun miring ke kiri.", seg: 1, pemicu: "miring", arah: KIRI },
    { suara: "Lalu garis lurus ke kanan.", seg: 2, pemicu: "garis", arah: KANAN },
  ],
  "3": [
    { suara: "Menulis tiga. Lengkungan menghadap kanan.", seg: 0, pemicu: "lengkungan", arah: KANAN },
    { suara: "Lalu lengkungan kedua, menghadap kanan.", seg: 1, pemicu: "lengkungan", arah: KANAN },
  ],
  "4": [
    { suara: "Menulis empat. Turun miring ke kiri.", seg: 0, pemicu: "miring", arah: KIRI },
    { suara: "Lalu garis lurus ke kanan.", seg: 1, pemicu: "garis", arah: KANAN },
    { suara: "Angkat jari. Garis lurus turun memotong.", seg: 2, pemicu: "turun", titik: [40, 2], arah: BAWAH },
  ],
  "5": [
    { suara: "Menulis lima. Garis ke kiri di atas.", seg: 0, pemicu: "garis", arah: KIRI },
    { suara: "Lalu turun sedikit saja.", seg: 1, pemicu: "turun", arah: BAWAH },
    { suara: "Lalu lengkung besar ke kanan.", seg: 2, pemicu: "lengkung", arah: KANAN },
  ],
  "6": [
    { suara: "Menulis enam. Lengkung turun ke kiri.", seg: 0, pemicu: "lengkung", arah: KIRI },
    { suara: "Lalu lingkaran kecil di bawah.", seg: 1, pemicu: "lingkaran", arah: KANAN },
  ],
  "7": [
    { suara: "Menulis tujuh. Garis lurus ke kanan.", seg: 0, pemicu: "garis", arah: KANAN },
    { suara: "Lalu miring turun ke kiri.", seg: 1, pemicu: "miring", arah: KIRI },
  ],
  "8": [
    { suara: "Menulis delapan. Mulai atas, lengkung ke kiri.", seg: 0, pemicu: "lengkung", arah: KIRI },
    { suara: "Turun menyilang ke kanan, lengkung bawah.", seg: 1, pemicu: "menyilang", arah: KANAN },
    { suara: "Lalu naik menyilang, kembali ke awal.", seg: 2, pemicu: "naik", arah: ATAS },
  ],
  "9": [
    { suara: "Menulis sembilan. Lingkaran kecil di atas.", seg: 0, pemicu: "lingkaran", arah: KIRI },
    { suara: "Lalu garis lurus turun di kanan.", seg: 1, pemicu: "garis", arah: BAWAH },
  ],
};

const COBA = "Sekarang kamu coba, ya.";
/** Jeda diam: tiga titik habis satu per satu; goresan memudar supaya jari anak mengikuti jalurnya. */
const ketukanCoba = (ids: string[]): KetukanStory =>
  k(COBA, tambah(0, ...titikMundur(130, 178)), ...idTitikMundur.map((id, i) => hapus(i + 1, id)), ubah(0, ...ids.map((id) => ({ id, op: 0.35, sorot: false }))));

/** Perlengkapan tetap satu adegan tulis: papan, tokoh pendamping, jari, dan anak panah arah. */
const perlengkapan = (tokoh: typeof TALA, jari: number | string): Aksi[] => [
  tambah(0, ...panelTulis(), ...gambarTokoh(tokoh, 40, 134), emo("ar", 272, 56, KANAN, 24)),
  tambah(jari, emo("jr", 84, 172, "\u{1F446}", 28)),
];

/** Ketukan satu lambang: pengenalan bersama goresan pertama, lalu satu goresan tiap ketukan. */
function ketukanLambang(d: string, prev: string | null, awal: Aksi[]): KetukanStory[] {
  const hasil: KetukanStory[] = [];
  let segTerakhir: number | null = null;
  TULIS[d].forEach((lg, j) => {
    const aksi: Aksi[] = [];
    if (j === 0) {
      const w = idx(lg.suara, eja(Number(d)));
      const [sx, sy] = awalJalur(d);
      aksi.push(...awal);
      if (prev === null) aksi.push(tambah(w, ...modelLambang(d), titikMulai(d, OX1)));
      else aksi.push(hapus(0, ...idJalur(prev)), ubah(w, { id: "lb-t", isi: d }, { id: "st", x: OX1 + sx, y: OY + sy }));
    }
    if (segTerakhir !== null) aksi.push(ubah(0, { id: `jl-${d}-${segTerakhir}`, sorot: false }));
    if (lg.titik) aksi.push(ubah(0, { id: "st", x: OX1 + lg.titik[0], y: OY + lg.titik[1] }));
    if (lg.arah) aksi.push(ubah(0, { id: "ar", isi: lg.arah }));
    if (lg.seg !== undefined && lg.pemicu) {
      aksi.push(tambah(lg.pemicu, { ...jalurSegmen(d, lg.seg, OX1), sorot: true }));
      segTerakhir = lg.seg;
    }
    hasil.push(k(lg.suara, ...aksi));
  });
  return hasil;
}

/** Beberapa lambang berurutan dalam satu adegan; `awal` hanya dipasang pada ketukan pertama. */
const rangkai = (daftar: string[], awal: Aksi[]): KetukanStory[] => daftar.flatMap((d, i) => ketukanLambang(d, i === 0 ? null : daftar[i - 1], i === 0 ? awal : []));

export const ADEGAN_TULIS_A: AdeganStory = {
  id: "tulis-a",
  judul: "Tulis: lambang nol sampai lima",
  sumber: "Metode: tulis lambang nol sampai lima",
  latar: LATAR_TERANG,
  ketukan: [...rangkai(["0", "1", "2", "3", "4", "5"], perlengkapan(TALA, 3)), ketukanCoba(idJalur("5"))],
};

/** Sepuluh ditulis paling akhir: dua lambang, satu lalu nol. */
const ketukanSepuluh = (): KetukanStory[] => {
  const [sx1, sy1] = awalJalur("1");
  const [sx0, sy0] = awalJalur("0");
  return [
    k(
      "Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh.",
      hapus(0, ...idJalur("9")),
      ubah(0, { id: "lb-t", isi: "10" }, { id: "st", x: OX10 + sx1, y: OY + sy1 }),
      tambah(2, ...lambang("dl", 104, 112, "2", 40, 36, 22)),
      hapus(4, "dl-k", "dl-t"),
      ubah(4, { id: "lb-t", isi: "1" }),
      ubah(6, { id: "lb-t", isi: "0" }),
      ubah(8, { id: "lb-t", isi: "10" }),
    ),
    k("Pertama, garis lurus turun.", ubah(0, { id: "lb-t", isi: "1" }, { id: "ar", isi: BAWAH }), tambah("garis", { ...jalurSegmen("1", 0, OX10), sorot: true })),
    k(
      "Lalu nol di sebelah kanannya.",
      ubah(0, { id: "jl-1-0", sorot: false }, { id: "ar", isi: KANAN }),
      ubah("nol", { id: "lb-t", isi: "0" }, { id: "st", x: OX10 + 64 + sx0, y: OY + sy0 }),
      tambah("nol", { ...jalurSegmen("0", 0, OX10 + 64), sorot: true }),
    ),
  ];
};

export const ADEGAN_TULIS_B: AdeganStory = {
  id: "tulis-b",
  judul: "Tulis: lambang enam sampai sepuluh",
  sumber: "Metode: tulis lambang enam sampai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [...rangkai(["6", "7", "8", "9"], perlengkapan(IGIL, 0)), ...ketukanSepuluh(), ketukanCoba(["jl-1-0", "jl-0-0"])],
};
