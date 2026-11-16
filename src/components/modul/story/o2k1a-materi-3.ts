import type { AdeganStory, KetukanStory } from "./logika-story";
import { eja, emo, hapus, idx, k, tambah, ubah } from "./kit/dasar";
import { lambang } from "./kit/dunia-k1";
import { LATAR_TERANG, OX1, OX10, OY, awalJalur, idJalur, idTitikMundur, jalurSegmen, modelLambang, panelTulis, titikMulai, titikMundur } from "./o2k1a-bantu";

/**
 * Video materi Sub-Bab A (bagian 3): menulis lambang nol sampai sembilan, lalu sepuluh paling akhir (dari satu dan nol).
 * Satu goresan per ketukan, jalur tergambar bertahap dan disorot; sesudah tiap lambang: "Sekarang kamu coba, ya." dengan jeda hitung mundur.
 */

type Langkah = { suara: string; seg?: number; pemicu?: string; titik?: [number, number] };
const TULIS: Record<string, Langkah[]> = {
  "0": [{ suara: "Menulis nol. Mulai dari atas, putar ke kiri sampai bertemu.", seg: 0, pemicu: "putar" }],
  "1": [{ suara: "Menulis satu. Mulai dari atas, garis lurus turun.", seg: 0, pemicu: "garis" }],
  "2": [
    { suara: "Menulis dua. Mulai dari atas, lengkungan ke kanan.", seg: 0, pemicu: "lengkungan" },
    { suara: "Lalu turun miring ke kiri.", seg: 1, pemicu: "miring" },
    { suara: "Lalu garis lurus ke kanan di bawah.", seg: 2, pemicu: "garis" },
  ],
  "3": [
    { suara: "Menulis tiga. Mulai dari atas, lengkungan menghadap kanan.", seg: 0, pemicu: "lengkungan" },
    { suara: "Lalu lengkungan kedua, juga ke kanan.", seg: 1, pemicu: "lengkungan" },
  ],
  "4": [
    { suara: "Menulis empat. Mulai dari atas, turun miring ke kiri.", seg: 0, pemicu: "miring" },
    { suara: "Lalu garis lurus ke kanan.", seg: 1, pemicu: "garis" },
    { suara: "Angkat jarimu. Mulai dari atas di kanan.", titik: [40, 2] },
    { suara: "Garis lurus turun, melewati garis tadi.", seg: 2, pemicu: "turun" },
  ],
  "5": [
    { suara: "Menulis lima. Mulai dari atas di kanan, garis ke kiri.", seg: 0, pemicu: "garis" },
    { suara: "Lalu turun sedikit saja.", seg: 1, pemicu: "turun" },
    { suara: "Lalu lengkungan besar ke kanan.", seg: 2, pemicu: "lengkungan" },
  ],
  "6": [
    { suara: "Menulis enam. Mulai dari atas, lengkung turun.", seg: 0, pemicu: "lengkung" },
    { suara: "Lalu lingkaran kecil di bawah.", seg: 1, pemicu: "lingkaran" },
  ],
  "7": [
    { suara: "Menulis tujuh. Mulai dari atas, garis ke kanan.", seg: 0, pemicu: "garis" },
    { suara: "Lalu miring turun ke kiri.", seg: 1, pemicu: "miring" },
  ],
  "8": [
    { suara: "Menulis delapan. Mulai dari atas, lengkung ke kiri.", seg: 0, pemicu: "lengkung" },
    { suara: "Turun menyilang ke kanan, lengkung di bawah.", seg: 1, pemicu: "menyilang" },
    { suara: "Lalu naik kembali ke atas.", seg: 2, pemicu: "naik" },
  ],
  "9": [
    { suara: "Menulis sembilan. Mulai dari atas, lingkaran kecil, putar ke kiri.", seg: 0, pemicu: "lingkaran" },
    { suara: "Lalu garis lurus turun di kanan.", seg: 1, pemicu: "garis" },
  ],
};

const COBA = "Sekarang kamu coba, ya.";
/** Jeda diam: tiga titik habis satu per satu; goresan memudar supaya jari anak mengikuti jalurnya. */
const ketukanCoba = (ids: string[]): KetukanStory =>
  k(COBA, tambah(0, ...titikMundur(130, 178)), ...idTitikMundur.map((id, i) => hapus(i + 1, id)), ubah(0, ...ids.map((id) => ({ id, op: 0.35, sorot: false }))));

/** Ketukan satu lambang: pengenalan bersama goresan pertama, satu goresan tiap ketukan, lalu giliran anak. */
function ketukanLambang(d: string, prev: string | null, awal: boolean, tambahAwal: boolean): KetukanStory[] {
  const daftar = TULIS[d];
  const hasil: KetukanStory[] = [];
  let segTerakhir: number | null = null;
  daftar.forEach((lg, j) => {
    const aksi = [];
    if (j === 0) {
      const w = idx(lg.suara, eja(Number(d)));
      const [sx, sy] = awalJalur(d);
      if (tambahAwal) aksi.push(tambah(0, ...panelTulis()));
      if (awal) aksi.push(tambah(w, ...modelLambang(d), titikMulai(d, OX1)));
      else aksi.push(hapus(0, ...idJalur(prev as string)), ubah(w, { id: "lb-t", isi: d }, { id: "st", x: OX1 + sx, y: OY + sy }));
    }
    if (segTerakhir !== null) aksi.push(ubah(0, { id: `jl-${d}-${segTerakhir}`, sorot: false }));
    if (lg.titik) aksi.push(ubah(0, { id: "st", x: OX1 + lg.titik[0], y: OY + lg.titik[1] }));
    if (lg.seg !== undefined && lg.pemicu) {
      aksi.push(tambah(lg.pemicu, { ...jalurSegmen(d, lg.seg, OX1), sorot: true }));
      segTerakhir = lg.seg;
    }
    hasil.push(k(lg.suara, ...aksi));
  });
  hasil.push(ketukanCoba(idJalur(d)));
  return hasil;
}

const rangkai = (daftar: string[], prevAwal: string | null, hand: boolean): KetukanStory[] =>
  daftar.flatMap((d, i) => ketukanLambang(d, i === 0 ? prevAwal : daftar[i - 1], i === 0 && prevAwal === null, i === 0 && prevAwal === null && !hand));

export const ADEGAN_TULIS_NOL_DUA: AdeganStory = {
  id: "tulis-0-2",
  judul: "Menulis lambang nol, satu, dua",
  sumber: "Materi: menulis nol sampai dua",
  latar: LATAR_TERANG,
  ketukan: [
    k("Sekarang kita menulis. Ayo ikuti dengan jarimu.", tambah(0, ...panelTulis()), tambah(6, emo("jr", 44, 160, "\u{1F446}", 28))),
    ...rangkai(["0", "1", "2"], null, true),
  ],
};

export const ADEGAN_TULIS_TIGA_LIMA: AdeganStory = {
  id: "tulis-3-5",
  judul: "Menulis lambang tiga, empat, lima",
  sumber: "Materi: menulis tiga sampai lima",
  latar: LATAR_TERANG,
  ketukan: rangkai(["3", "4", "5"], null, false),
};

export const ADEGAN_TULIS_ENAM_DELAPAN: AdeganStory = {
  id: "tulis-6-8",
  judul: "Menulis lambang enam, tujuh, delapan",
  sumber: "Materi: menulis enam sampai delapan",
  latar: LATAR_TERANG,
  ketukan: rangkai(["6", "7", "8"], null, false),
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
      tambah(2, ...lambang("dl", 24, 118, "2", 40, 36, 22)),
      hapus(4, "dl-k", "dl-t"),
      ubah(4, { id: "lb-t", isi: "1" }),
      ubah(6, { id: "lb-t", isi: "0" }),
      ubah(8, { id: "lb-t", isi: "10" }),
    ),
    k("Mulai dari atas, garis lurus turun.", ubah(0, { id: "lb-t", isi: "1" }), tambah("garis", { ...jalurSegmen("1", 0, OX10), sorot: true })),
    k(
      "Lalu tulis nol di sebelah kanannya.",
      ubah(0, { id: "jl-1-0", sorot: false }),
      ubah(2, { id: "lb-t", isi: "0" }, { id: "st", x: OX10 + 64 + sx0, y: OY + sy0 }),
      tambah("nol", { ...jalurSegmen("0", 0, OX10 + 64), sorot: true }),
    ),
    ketukanCoba(["jl-1-0", "jl-0-0"]),
  ];
};

export const ADEGAN_TULIS_SEMBILAN_SEPULUH: AdeganStory = {
  id: "tulis-9-10",
  judul: "Menulis lambang sembilan dan sepuluh",
  sumber: "Materi: menulis sembilan dan sepuluh",
  latar: LATAR_TERANG,
  ketukan: [...rangkai(["9"], null, false), ...ketukanSepuluh()],
};

