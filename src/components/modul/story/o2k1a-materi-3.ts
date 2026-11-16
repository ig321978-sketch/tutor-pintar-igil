import type { Aksi, AdeganStory, KetukanStory } from "./logika-story";
import { eja, emo, gambarTokoh, hapus, idx, k, tambah, ubah, type Tokoh } from "./kit/dasar";
import { IGIL, LINTANG, NIKO, TALA, lambang } from "./kit/dunia-k1";
import { LATAR_TERANG, OX1, OX10, OY, awalJalur, idJalur, jalurSegmen, judulLangkah, modelLambang, panelTulis, titikMulai, titikMundur } from "./o2k1a-bantu";

/**
 * Video Sub-Bab A (bagian 3): langkah TULIS, blok padat (paling banyak 16 ketukan untuk nol sampai sepuluh).
 * Satu ketukan untuk 0, 1, 6, 7, 9, 10; dua ketukan untuk 2, 3, 4, 5, 8. Goresan muncul bertahap mengikuti kata; rincian lengkap menyusul di tahap Simulasi.
 * "Sekarang kamu coba, ya." dua kali saja (sesudah satu, dan di akhir), tiap kali dengan jeda hitung mundur visual.
 */

const KIRI = "\u{2B05}";
const KANAN = "\u{27A1}";
const BAWAH = "\u{2B07}";
const ATAS = "\u{2B06}";
const COBA = "Sekarang kamu coba, ya.";

type Goresan = { seg: number; pemicu: string; arah: string; titik?: [number, number] };
/** Satu ketukan: `d` = lambang, `awal` = ketukan pertama lambang itu (model di kiri berganti), `st` = goresan yang tergambar, `jeda` = jeda pendek di akhir. */
type Spek = { d: string; suara: string; awal: boolean; st: Goresan[]; jeda?: boolean };

const SPEK_A: Spek[] = [
  { d: "0", awal: true, suara: "Ikuti dengan jarimu. Menulis nol. Mulai dari atas, putar ke kiri.", st: [{ seg: 0, pemicu: "putar", arah: KIRI }] },
  { d: "1", awal: true, suara: "Menulis satu. Garis lurus turun. " + COBA, st: [{ seg: 0, pemicu: "garis", arah: BAWAH }] },
  { d: "2", awal: true, suara: "Menulis dua. Lengkung ke kanan.", st: [{ seg: 0, pemicu: "lengkung", arah: KANAN }] },
  { d: "2", awal: false, suara: "Turun miring ke kiri, garis lurus ke kanan.", st: [{ seg: 1, pemicu: "miring", arah: KIRI }, { seg: 2, pemicu: "garis", arah: KANAN }] },
  { d: "3", awal: true, suara: "Menulis tiga. Lengkung ke kanan, kembali ke tengah.", st: [{ seg: 0, pemicu: "lengkung", arah: KANAN }] },
  { d: "3", awal: false, suara: "Lengkung ke kanan lagi.", st: [{ seg: 1, pemicu: "lengkung", arah: KANAN }] },
  { d: "4", awal: true, suara: "Menulis empat. Turun miring ke kiri, lalu garis ke kanan.", st: [{ seg: 0, pemicu: "miring", arah: KIRI }, { seg: 1, pemicu: "garis", arah: KANAN }] },
  { d: "4", awal: false, suara: "Angkat jari. Garis lurus turun memotong.", st: [{ seg: 2, pemicu: "turun", arah: BAWAH, titik: [40, 2] }] },
  { d: "5", awal: true, suara: "Menulis lima. Garis ke kiri, lalu turun.", st: [{ seg: 0, pemicu: "garis", arah: KIRI }, { seg: 1, pemicu: "turun", arah: BAWAH }] },
  { d: "5", awal: false, suara: "Lengkung besar ke kanan.", st: [{ seg: 2, pemicu: "lengkung", arah: KANAN }], jeda: true },
];

const SPEK_B: Spek[] = [
  { d: "6", awal: true, suara: "Menulis enam. Lengkung turun, lingkaran kecil di bawah.", st: [{ seg: 0, pemicu: "lengkung", arah: KIRI }, { seg: 1, pemicu: "lingkaran", arah: KANAN }] },
  { d: "7", awal: true, suara: "Menulis tujuh. Garis ke kanan, miring turun ke kiri.", st: [{ seg: 0, pemicu: "garis", arah: KANAN }, { seg: 1, pemicu: "miring", arah: KIRI }] },
  { d: "8", awal: true, suara: "Menulis delapan. Mulai atas, lengkung ke kiri.", st: [{ seg: 0, pemicu: "lengkung", arah: KIRI }] },
  { d: "8", awal: false, suara: "Turun menyilang ke kanan, lengkung bawah, naik kembali.", st: [{ seg: 1, pemicu: "menyilang", arah: KANAN }, { seg: 2, pemicu: "naik", arah: ATAS }] },
  { d: "9", awal: true, suara: "Menulis sembilan. Lingkaran kecil atas, garis lurus turun di kanan.", st: [{ seg: 0, pemicu: "lingkaran", arah: KIRI }, { seg: 1, pemicu: "garis", arah: BAWAH }] },
];

/** Jeda diam: tiga titik habis satu per satu mulai kata nomor `kata`; goresan memudar supaya jari anak mengikuti jalurnya. */
const aksiJeda = (kata: number, jalur: string[], lamaKata = 3): Aksi[] => [
  tambah(kata, ...titikMundur(130, 178)),
  ...["jd1", "jd2", "jd3"].map((id, i) => hapus(Math.min(kata + 1 + i, kata + lamaKata), id)),
  ubah(kata, ...jalur.map((id) => ({ id, op: 0.35, sorot: false }))),
];

function ketukanSpek(s: Spek, prev: string | null, tetap: Aksi[]): KetukanStory {
  const aksi: Aksi[] = [...tetap];
  const kata = s.suara.split(/\s+/).length;
  if (s.awal) {
    const w = idx(s.suara, eja(Number(s.d)));
    const [sx, sy] = awalJalur(s.d);
    if (prev === null) aksi.push(tambah(w, ...modelLambang(s.d), titikMulai(s.d, OX1)));
    else aksi.push(hapus(0, ...idJalur(prev)), ubah(w, { id: "lb-t", isi: s.d }, { id: "st", x: OX1 + sx, y: OY + sy }));
  }
  if (!s.awal) aksi.push(ubah(0, { id: "jl-" + s.d + "-" + (s.st[0].seg - 1), sorot: false }));
  s.st.forEach((g, q) => {
    if (g.titik) aksi.push(ubah(0, { id: "st", x: OX1 + g.titik[0], y: OY + g.titik[1] }));
    if (q > 0) aksi.push(ubah(g.pemicu, { id: "jl-" + s.d + "-" + s.st[q - 1].seg, sorot: false }));
    aksi.push(ubah(0, { id: "ar", isi: g.arah }));
    aksi.push(tambah(g.pemicu, { ...jalurSegmen(s.d, g.seg, OX1), sorot: true }));
  });
  if (s.suara.includes(COBA)) aksi.push(...aksiJeda(idx(s.suara, "Sekarang"), idJalur(s.d)));
  if (s.jeda) aksi.push(...aksiJeda(kata - 3, idJalur(s.d), 2));
  return k(s.suara, ...aksi);
}

/** Perlengkapan tetap satu adegan tulis: papan, dua tokoh pendamping, jari, dan anak panah arah. */
const perlengkapan = (judul: string, t1: Tokoh, t2: Tokoh): Aksi[] => [
  tambah(0, judulLangkah(judul), ...panelTulis(), ...gambarTokoh(t1, 26, 134), ...gambarTokoh(t2, 66, 134), emo("ar", 272, 56, KANAN, 24), emo("jr", 104, 172, "\u{1F446}", 28)),
];

function rangkai(spek: Spek[], tetap: Aksi[]): KetukanStory[] {
  let prev: string | null = null;
  return spek.map((s, i) => {
    const kt = ketukanSpek(s, s.awal ? prev : null, i === 0 ? tetap : []);
    if (s.awal) prev = s.d;
    // Lambang baru: model berganti, jalur lambang sebelumnya dihapus (prev = lambang sebelumnya, null hanya pada ketukan pertama).
    return kt;
  });
}

export const ADEGAN_TULIS_A: AdeganStory = {
  id: "tulis-a",
  judul: "Tulis: lambang nol sampai lima",
  sumber: "Metode: tulis lambang nol sampai lima",
  latar: LATAR_TERANG,
  ketukan: rangkai(SPEK_A, perlengkapan("TULIS", TALA, NIKO)),
};

/** Sepuluh ditulis paling akhir: dua lambang, satu lalu nol, dalam satu ketukan. */
const SUARA_SEPULUH = "Sepuluh ditulis dua lambang: satu, lalu nol. Dibaca sepuluh. " + COBA;
const ketukanSepuluh = (): KetukanStory => {
  const [sx1, sy1] = awalJalur("1");
  const [sx0, sy0] = awalJalur("0");
  const coba = idx(SUARA_SEPULUH, "Sekarang");
  const aksi: Aksi[] = [
    hapus(0, ...idJalur("9")),
    ubah(0, { id: "lb-t", isi: "10" }, { id: "st", x: OX10 + sx1, y: OY + sy1 }, { id: "ar", isi: BAWAH }),
    tambah(2, ...lambang("dl", 104, 112, "2", 40, 36, 22)),
    hapus(4, "dl-k", "dl-t"),
    ubah(4, { id: "lb-t", isi: "1" }),
    tambah(4, { ...jalurSegmen("1", 0, OX10), sorot: true }),
    ubah(6, { id: "lb-t", isi: "0" }, { id: "st", x: OX10 + 64 + sx0, y: OY + sy0 }, { id: "jl-1-0", sorot: false }, { id: "ar", isi: KANAN }),
    tambah(6, { ...jalurSegmen("0", 0, OX10 + 64), sorot: true }),
    ubah(8, { id: "lb-t", isi: "10" }),
    ...aksiJeda(coba, ["jl-1-0", "jl-0-0"]),
  ];
  return k(SUARA_SEPULUH, ...aksi);
};

export const ADEGAN_TULIS_B: AdeganStory = {
  id: "tulis-b",
  judul: "Tulis: lambang enam sampai sepuluh",
  sumber: "Metode: tulis lambang enam sampai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [...rangkai(SPEK_B, perlengkapan("TULIS", IGIL, LINTANG)), ketukanSepuluh()],
};
