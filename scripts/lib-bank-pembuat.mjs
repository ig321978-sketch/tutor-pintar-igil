/**
 * Perkakas umum untuk menulis pembuat bank soal satu bab (Latihan 100 + Ujian 100).
 * Berkas ini TIDAK memuat soal. Bab baru cukup menyalin src/content-master/bank-k2-bab1.mjs (lokal, tidak di-commit),
 * mengganti daftar keluarga soalnya, lalu memanggil rakit(...).
 *
 * Konsep:
 *  - Satu "keluarga" = satu jenis soal yang dibuat berulang dengan data acak berbiji tetap.
 *    keluarga(level, nama, banyakLatihan, banyakUjian, fn); fn(v) mengembalikan:
 *      { level, prompt, explanation, visual?, visual2?,
 *        angka: true, benar, miscs }          -> pilihan angka naik, pengecoh dari miscs lalu yang terdekat
 *      | { level, prompt, explanation, benar, salah: [teks...] }   -> pilihan teks, letak kunci diseimbangkan
 *      | { level, prompt, explanation, opsiTetap: [4 angka], benar, target } -> empat angka tetap (naik), kunci = benar
 *    atau null / melempar galat bertanda "gagal" bila data tak cocok (diulang).
 *  - pakai(tanda) mencegah data yang sama dipakai dua kali di seluruh bank.
 *  - pilihTarget(kelompok, layak) menyeimbangkan letak kunci per kelompok.
 */
import { writeFile } from "node:fs/promises";
import { tulisSeedBank } from "./lib-seed-bank.mjs";

export function buatPembuat({ seed, angkaMaks = 99 }) {
  let a0 = seed >>> 0;
  const R = () => {
    a0 = (a0 + 0x6d2b79f5) | 0;
    let t = Math.imul(a0 ^ (a0 >>> 15), 1 | a0);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (a, b) => a + Math.floor(R() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(R() * arr.length)];
  const kocok = (arr) => {
    const h = [...arr];
    for (let i = h.length - 1; i > 0; i -= 1) {
      const j = Math.floor(R() * (i + 1));
      [h[i], h[j]] = [h[j], h[i]];
    }
    return h;
  };
  const jumlah = (xs) => xs.reduce((a, b) => a + b, 0);
  const ulang = (e, n) => Array.from({ length: n }, () => e);

  const DIPAKAI = new Set();
  const TEKS = new Set();
  const pakai = (tanda) => {
    if (DIPAKAI.has(tanda)) return false;
    DIPAKAI.add(tanda);
    return true;
  };

  const SEBARAN = {};
  const pilihTarget = (kelompok, layak) => {
    const c = (SEBARAN[kelompok] ??= [0, 0, 0, 0]);
    const min = Math.min(...layak.map((t) => c[t]));
    const t = pick(layak.filter((x) => c[x] === min));
    c[t] += 1;
    return t;
  };

  function pilihanAngka(kelompok, benar, miscs) {
    const bawah = [];
    const atas = [];
    const tambah = (v) => {
      if (!Number.isInteger(v) || v < 0 || v > angkaMaks || v === benar) return;
      const arr = v < benar ? bawah : atas;
      if (!arr.includes(v)) arr.push(v);
    };
    miscs.forEach(tambah);
    for (let d = 1; d <= 6; d += 1) {
      tambah(benar - d);
      tambah(benar + d);
    }
    tambah(benar - 10);
    tambah(benar + 10);
    const layak = [0, 1, 2, 3].filter((t) => bawah.length >= t && atas.length >= 3 - t);
    if (layak.length === 0) throw new Error(`pilihan angka tidak layak untuk ${benar}`);
    const t = pilihTarget(kelompok, layak);
    const urut = (arr) =>
      [...arr].sort((a, b) => {
        const pa = miscs.includes(a) ? 0 : 1;
        const pb = miscs.includes(b) ? 0 : 1;
        return pa - pb || Math.abs(a - benar) - Math.abs(b - benar);
      });
    const dipilih = [...urut(bawah).slice(0, t), benar, ...urut(atas).slice(0, 3 - t)].sort((a, b) => a - b);
    return { options: dipilih.map(String), correctIndex: dipilih.indexOf(benar) };
  }

  function pilihanTeks(kelompok, benar, salah) {
    const semuaSalah = [...new Set(salah)].filter((s) => s !== benar);
    if (semuaSalah.length < 3) throw new Error(`pengecoh kurang untuk "${benar}"`);
    const t = pilihTarget(kelompok, [0, 1, 2, 3]);
    const lain = kocok(semuaSalah).slice(0, 3);
    return { options: [...lain.slice(0, t), benar, ...lain.slice(t)], correctIndex: t };
  }

  const A = (benar, miscs) => ({ angka: true, benar, miscs });
  const KELUARGA = [];
  const keluarga = (level, nama, banyakLatihan, banyakUjian, fn) => KELUARGA.push({ level, nama, banyakLatihan, banyakUjian, fn });

  function bangun(himpunan, level, nama, fn, v) {
    for (let coba = 0; coba < 3000; coba += 1) {
      let q;
      try {
        q = fn(v);
      } catch (e) {
        if (/gagal|tidak layak|pengecoh kurang/.test(String(e.message))) continue;
        throw e;
      }
      if (!q || TEKS.has(q.prompt)) continue;
      let hasil;
      try {
        if (q.urutTetap) {
          if (new Set(q.urutTetap).size !== 4 || q.urutTetap.indexOf(q.benar) < 0) continue;
          hasil = { options: q.urutTetap, correctIndex: q.urutTetap.indexOf(q.benar) };
        } else if (q.opsiTetap) {
          const urut = [...q.opsiTetap].sort((a, b) => a - b);
          if (new Set(urut).size !== 4 || !urut.includes(q.benar)) continue;
          hasil = { options: urut.map(String), correctIndex: urut.indexOf(q.benar) };
        } else {
          hasil = q.angka ? pilihanAngka(`${himpunan}:${level}`, q.benar, q.miscs) : pilihanTeks(`${himpunan}:${level}`, q.benar, q.salah);
        }
      } catch {
        continue;
      }
      TEKS.add(q.prompt);
      return { level, prompt: q.prompt, options: hasil.options, correctIndex: hasil.correctIndex, explanation: q.explanation, visual: q.visual ?? [], visual2: q.visual2 ?? [], keluarga: nama };
    }
    throw new Error(`keluarga ${nama} gagal membuat soal`);
  }

  async function rakit({ chapterId, phaseCode, grade, sumber, hasilJson }) {
    const latihan = [];
    const ujian = [];
    for (const k of KELUARGA) for (let i = 0; i < k.banyakLatihan; i += 1) latihan.push(bangun("latihan", k.level, k.nama, k.fn, i));
    for (const k of KELUARGA) for (let i = 0; i < k.banyakUjian; i += 1) ujian.push(bangun("ujian", "HOTS", k.nama, k.fn, i));
    const urutLevel = { LOTS: 0, MOTS: 1, HOTS: 2 };
    latihan.sort((x, y) => urutLevel[x.level] - urutLevel[y.level]);
    const ujianAcak = kocok(ujian);
    const tujuan = await tulisSeedBank({ chapterId, phaseCode, grade, latihan, ujian: ujianAcak, sumber });
    const sebaran = (arr) => [0, 1, 2, 3].map((t) => arr.filter((s) => s.correctIndex === t).length);
    const n = (lv) => latihan.filter((s) => s.level === lv).length;
    console.log("latihan", latihan.length, "LOTS", n("LOTS"), "MOTS", n("MOTS"), "HOTS", n("HOTS"));
    console.log("ujian", ujianAcak.length, "HOTS");
    console.log("sebaran kunci latihan", sebaran(latihan).join("/"), "ujian", sebaran(ujianAcak).join("/"));
    for (const lv of ["LOTS", "MOTS", "HOTS"]) console.log(" ", lv, sebaran(latihan.filter((s) => s.level === lv)).join("/"));
    console.log("seed", tujuan);
    if (hasilJson) await writeFile(hasilJson, JSON.stringify({ latihan, ujian: ujianAcak }, null, 1));
    return { latihan, ujian: ujianAcak };
  }

  return { R, int, pick, kocok, jumlah, ulang, pakai, pilihTarget, A, keluarga, rakit };
}
