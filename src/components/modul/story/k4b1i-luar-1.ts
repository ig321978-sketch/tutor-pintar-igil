import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, daftar, emo, garisBilangan, judul, kartu, loncat, titikBil } from "./k4b1i-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b1i-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk faktor dan kelipatan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana belajar faktor dan kelipatan dengan baik? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari pelajaran.",
      bersih(0),
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 30, 128, 240, 34, W.krem, ["faktor dan kelipatan: angka pelajaran"], 9.2)),
    ),
    k(
      "Empat metode itu: Factor Pairs, Skip Counting Multiples, Divisibility, dan Sieve of Eratosthenes.",
      ...daftar("pm", "Empat metode", [
        { at: "Pairs,", t: "1. Factor Pairs", w: W.hijauMuda, u: 9.6 },
        { at: "Multiples,", t: "2. Skip Counting Multiples", w: W.langit, u: 9.6 },
        { at: "Divisibility,", t: "3. Divisibility", w: W.krem, u: 9.6 },
        { at: "Eratosthenes.", t: "4. Sieve of Eratosthenes", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Masing-masing menjawab satu pertanyaan: pasangan apa yang menghasilkan bilangan itu, berapa lompatan tetapnya, apakah bilangan itu habis dibagi, dan bilangan mana yang tersaring?",
      ...daftar("pq", "Empat pertanyaan", [
        { at: "pasangan", t: "pasangan apa yang menghasilkan?", w: W.hijauMuda, u: 9.2 },
        { at: "lompatan", t: "berapa lompatan tetapnya?", w: W.langit, u: 9.6 },
        { at: "habis", t: "apakah habis dibagi?", w: W.krem, u: 9.6 },
        { at: "tersaring?", t: "bilangan mana yang tersaring?", w: W.pink, u: 9.6 },
      ]),
    ),
  ],
};

/* ------------------------------ 2. Factor Pairs: konsep ------------------------------ */
export const ADEGAN_LUAR_FP: AdeganStory = {
  id: "luar-fp",
  judul: "Factor Pairs (Pasangan Faktor)",
  sumber: "Metode luar: Factor Pairs",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Factor Pairs atau Pasangan Faktor. Faktor datang berpasangan: dua bilangan yang dikalikan menghasilkan bilangan itu.",
      bersih(0),
      tambah(0, judul("Factor Pairs")),
      tambah("Pasangan", ...kartu("fp1", 50, 34, 200, 28, W.krem, ["Pasangan Faktor"], 9.6)),
      tambah("berpasangan:", ...kartu("fp2", 30, 84, 240, 36, W.hijauMuda, ["faktor × faktor = bilangan itu"], 11)),
      tambah("menghasilkan", ...kartu("fp3", 30, 138, 240, 30, W.langit, ["dua faktor sekali temu"], 9.6)),
    ),
    k(
      "Contoh dua belas: satu kali dua belas, dua kali enam, tiga kali empat. Setiap pasangan memberi dua faktor sekaligus.",
      bersih(0),
      tambah(0, judul("Contoh: pasangan faktor 12")),
      tambah(6, ...kartu("fq1", 14, 34, 130, 28, W.hijauMuda, ["1 × 12 = 12"], 10)),
      tambah(6, ...kartu("fr1", 154, 34, 130, 28, W.krem, ["faktor 1 dan 12"], 9.2)),
      tambah(9, ...kartu("fq2", 14, 72, 130, 28, W.hijauMuda, ["2 × 6 = 12"], 10)),
      tambah(9, ...kartu("fr2", 154, 72, 130, 28, W.krem, ["faktor 2 dan 6"], 9.2)),
      tambah(12, ...kartu("fq3", 14, 110, 130, 28, W.hijauMuda, ["3 × 4 = 12"], 10)),
      tambah(12, ...kartu("fr3", 154, 110, 130, 28, W.krem, ["faktor 3 dan 4"], 9.2)),
      tambah("sekaligus.", ...kartu("fs", 14, 154, 270, 30, W.pink, ["faktor 12: 1, 2, 3, 4, 6, 12"], 10)),
    ),
    k(
      "Berhenti bila pasangan mulai berulang: empat kali tiga hanya membalik tiga kali empat. Jadi cukup periksa sampai kedua faktor pasangan bertemu.",
      bersih(0),
      tambah(0, judul("Kapan berhenti?", W.merah)),
      tambah("empat", ...kartu("fu1", 20, 40, 260, 30, W.merahMuda, ["4 × 3 = 12 hanya membalik 3 × 4"], 9.2)),
      tambah("Berhenti", ...kartu("fu2", 20, 86, 260, 30, W.krem, ["pasangan mulai berulang: berhenti"], 9.2)),
      tambah("bertemu.", ...kartu("fu3", 20, 132, 260, 30, W.hijauMuda, ["cukup sampai kedua faktor bertemu"], 9.2)),
    ),
  ],
};

/* ------------------------------ 3. Factor Pairs: penerapan ------------------------------ */
type Kasus = { id: string; judul: string; n: number; pasang: [number, number][]; suara: string; at: (string | number)[]; hasil: string; hasilAt: string | number; tambahan?: { at: string | number; t: string } };
function ketukanFP(c: Kasus) {
  const aksi: Aksi[] = [bersih(0), tambah(0, judul(c.judul))];
  c.pasang.forEach(([a, b], i) => aksi.push(tambah(c.at[i], ...kartu(`${c.id}${i}`, 40, 34 + i * 30, 220, 26, W.hijauMuda, [`${a} × ${b} = ${c.n}`], 10.4))));
  if (c.tambahan) aksi.push(tambah(c.tambahan.at, ...kartu(`${c.id}x`, 40, 34 + c.pasang.length * 30, 220, 26, W.krem, [c.tambahan.t], 9.2)));
  aksi.push(tambah(c.hasilAt, ...kartu(`${c.id}h`, 20, 166, 260, 28, W.pink, [c.hasil], 10)));
  return k(c.suara, ...aksi);
}
export const ADEGAN_LUAR_FP_TERAPAN: AdeganStory = {
  id: "luar-fp-terapan",
  judul: "Factor Pairs diterapkan pada bilangan tadi",
  sumber: "Metode luar: Factor Pairs, penerapan",
  latar: "#F0FDF4",
  ketukan: [
    ketukanFP({
      id: "pa",
      judul: "Faktor 24",
      n: 24,
      pasang: [[1, 24], [2, 12], [3, 8], [4, 6]],
      suara: "Faktor dua puluh empat, kita cari semua pasangannya: satu kali dua puluh empat, dua kali dua belas, tiga kali delapan, empat kali enam. Delapan faktor.",
      at: [12, 16, 19, 22],
      hasil: "faktor 24: 1, 2, 3, 4, 6, 8, 12, 24",
      hasilAt: "faktor@2",
    }),
    ketukanFP({
      id: "pb",
      judul: "Faktor 25",
      n: 25,
      pasang: [[1, 25], [5, 5]],
      suara: "Dua puluh lima: satu kali dua puluh lima, lalu lima kali lima. Pasangan kembar, jadi lima ditulis sekali. Tiga faktor.",
      at: [7, 11],
      tambahan: { at: 13, t: "pasangan kembar: 5 ditulis sekali" },
      hasil: "faktor 25: 1, 5, 25",
      hasilAt: 19,
    }),
    ketukanFP({
      id: "pc",
      judul: "Faktor 52",
      n: 52,
      pasang: [[1, 52], [2, 26], [4, 13]],
      suara: "Lima puluh dua: satu kali lima puluh dua, dua kali dua puluh enam, empat kali tiga belas. Enam faktor.",
      at: [7, 12, 16],
      hasil: "faktor 52: 1, 2, 4, 13, 26, 52",
      hasilAt: 18,
    }),
    ketukanFP({
      id: "pd",
      judul: "Faktor 27",
      n: 27,
      pasang: [[1, 27], [3, 9]],
      suara: "Dua puluh tujuh, kita cari semua pasangannya: satu kali dua puluh tujuh, tiga kali sembilan. Empat faktor.",
      at: [11, 14],
      hasil: "faktor 27: 1, 3, 9, 27",
      hasilAt: 16,
    }),
  ],
};

/* ------------------------------ 4. Skip Counting Multiples: konsep ------------------------------ */
type GarisLompat = { g: ReturnType<typeof garisBilangan>; titik: Obj[][]; loncatan: Obj[][] };
/** Garis bilangan dengan titik-titik dan loncatan: titik `${L}{i}`, loncatan `${L}j{i}` (label dihitung dari selisih). */
function garisLompat(L: string, y: number, dari: number, sampai: number, nilai: number[], tinggi = 16): GarisLompat {
  const g = garisBilangan(`${L}g`, 15, y, 270, dari, sampai);
  const titik = nilai.map((v, i) => titikBil(`${L}${i}`, g.px(v), y, String(v)));
  const loncatan = nilai.slice(1).map((v, i) => loncat(`${L}j${i}`, y, g.px(nilai[i]), g.px(v), `+${v - nilai[i]}`, tinggi));
  return { g, titik, loncatan };
}
/** Data garis bilangan untuk pengujian: rentang dan nilai titik tiap garis. */
export const GARIS_BIL: Record<string, { dari: number; sampai: number; nilai: number[] }> = {
  sk: { dari: 0, sampai: 14, nilai: [0, 2, 4, 6, 8, 10, 12, 14] },
  sa: { dari: 0, sampai: 42, nilai: [0, 6, 12, 18, 24, 30, 36, 42] },
  sb: { dari: 15, sampai: 35, nilai: [15, 20, 25, 30, 35] },
  sc: { dari: 4, sampai: 28, nilai: [4, 8, 12, 16, 20, 24, 28] },
  sd: { dari: 0, sampai: 30, nilai: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30] },
};
const GL = (L: string, y: number) => garisLompat(L, y, GARIS_BIL[L].dari, GARIS_BIL[L].sampai, GARIS_BIL[L].nilai);
const SK = GL("sk", 112);
export const ADEGAN_LUAR_SK: AdeganStory = {
  id: "luar-sk",
  judul: "Skip Counting Multiples (Kelipatan Lompat Hitung)",
  sumber: "Metode luar: Skip Counting Multiples",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Skip Counting Multiples atau Kelipatan Lompat Hitung. Kelipatan adalah hasil lompat tetap: mulai dari nol, lompat dengan panjang sama berulang kali.",
      bersih(0),
      tambah(0, judul("Skip Counting Multiples")),
      tambah("Kelipatan@2", ...kartu("sk1", 40, 34, 220, 28, W.krem, ["Kelipatan Lompat Hitung"], 9.6)),
      tambah("nol,", ...SK.g.objs),
      tambah("lompat", ...kartu("sk2", 60, 152, 180, 28, W.hijauMuda, ["lompat tetap, berulang"], 9.6)),
    ),
    k(
      "Kelipatan dua pada kelereng Karel: dari nol lompat dua, empat, enam, delapan, sepuluh, dua belas, empat belas.",
      ...SK.titik.flatMap((t, i): Aksi[] => {
        const pos = [6, 8, 9, 10, 11, 12, 14, 16][i];
        return [tambah(pos, ...t), ...(i > 0 ? [tambah(pos, ...SK.loncatan[i - 1])] : [])];
      }),
    ),
    k(
      "Tiap lompatan sama panjang, jadi bedanya selalu dua. Dua, empat, enam, delapan, dan seterusnya semuanya kelipatan dua, tanpa batas.",
      hapus(0, "sk1-k", "sk1-t0", "sk2-k", "sk2-t0"),
      tambah("bedanya", ...kartu("sk3", 60, 152, 180, 28, W.hijauMuda, ["lompat tetap = 2"], 10)),
      tambah("seterusnya", ...kartu("sk4", 30, 34, 240, 28, W.pink, ["kelipatan 2: 2, 4, 6, 8, …"], 10)),
    ),
  ],
};

/* ------------------------------ 5. Skip Counting Multiples: penerapan ------------------------------ */
type KasusSK = { L: string; judul: string; suara: string; at: (string | number)[]; kartuAt: string | number; kartu: string; warna?: Record<number, string> };
function ketukanSK(c: KasusSK) {
  const gl = GL(c.L, 118);
  const aksi: Aksi[] = [bersih(0), tambah(0, judul(c.judul)), tambah(0, ...gl.g.objs)];
  gl.titik.forEach((t, i) => {
    aksi.push(tambah(c.at[i], ...t));
    if (i > 0) aksi.push(tambah(c.at[i], ...gl.loncatan[i - 1]));
  });
  Object.entries(c.warna ?? {}).forEach(([i, w]) => aksi.push(ubah(c.at[Number(i)], { id: `${c.L}${i}-p`, warna: w }, { id: `${c.L}${i}-v`, warna: w })));
  aksi.push(tambah(c.kartuAt, ...kartu(`${c.L}k`, 20, 158, 260, 30, W.hijauMuda, [c.kartu], 9.6)));
  return k(c.suara, ...aksi);
}
export const ADEGAN_LUAR_SK_TERAPAN: AdeganStory = {
  id: "luar-sk-terapan",
  judul: "Skip Counting Multiples diterapkan pada bilangan tadi",
  sumber: "Metode luar: Skip Counting, penerapan",
  latar: "#EFF6FF",
  ketukan: [
    ketukanSK({
      L: "sa",
      judul: "Kelipatan 6 kurang dari 40",
      suara: "Sekarang cari kelipatan enam kurang dari empat puluh. Dari nol lompat enam: enam, dua belas, delapan belas, dua puluh empat, tiga puluh, tiga puluh enam. Empat puluh dua sudah lewat.",
      at: [9, 12, 14, 16, 19, 21, 24, 27],
      kartuAt: "lewat.",
      kartu: "6, 12, 18, 24, 30, 36 (42 lewat dari 40)",
      warna: { 7: W.merah },
    }),
    ketukanSK({
      L: "sb",
      judul: "Kelipatan 5 antara 17 dan 35",
      suara: "Lalu cari kelipatan lima antara tujuh belas dan tiga puluh lima. Dari lima belas lompat lima: dua puluh, dua puluh lima, tiga puluh. Tiga puluh lima sudah batas, tidak dihitung.",
      at: [13, 17, 20, 22, 25],
      kartuAt: "batas,",
      kartu: "jawab: 20, 25, 30",
      warna: { 0: "#64748B", 4: W.merah },
    }),
    ketukanSK({
      L: "sc",
      judul: "Kelipatan 4 antara 7 dan 25",
      suara: "Sekarang kita cari kelipatan empat lebih dari tujuh dan kurang dari dua puluh lima. Lompat empat dari empat: delapan, dua belas, enam belas, dua puluh, dua puluh empat. Dua puluh delapan terlalu besar.",
      at: [17, 18, 20, 22, 24, 27, 30],
      kartuAt: "terlalu",
      kartu: "jawab: 8, 12, 16, 20, 24",
      warna: { 0: "#64748B", 6: W.merah },
    }),
    ketukanSK({
      L: "sd",
      judul: "Kelipatan 3 kurang dari 30",
      suara: "Terakhir cari kelipatan tiga kurang dari tiga puluh. Dari nol lompat tiga sembilan kali: tiga sampai dua puluh tujuh. Tiga puluh tidak termasuk.",
      at: [9, 12, 12, 12, 12, 12, 12, 12, 12, 12, 22],
      kartuAt: "termasuk.",
      kartu: "jawab: 3, 6, 9, ..., 27 (9 bilangan)",
      warna: { 10: W.merah },
    }),
  ],
};
