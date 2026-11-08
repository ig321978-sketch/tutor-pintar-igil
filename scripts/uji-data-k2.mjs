/**
 * Uji data murni Matematika Kelas 2 Bab 1 (Ayo Membilang sampai dengan 50).
 * Jalankan: node --no-warnings scripts/uji-data-k2.mjs
 * Memeriksa nama bilangan, semua ronde permainan, dan berkas JSON publik (tidak boleh membawa kunci).
 */
import fs from "node:fs";
import {
  namaBilangan,
  NamaBilangan,
  sukuKata,
  uraiK2,
  opsiSekitar,
  semuaCara,
  nilaiKandidat,
  RONDE_IKAT_K2,
  RONDE_LOKER_K2,
  RONDE_SUSUN_K2,
  RONDE_TEBAK_K2,
  RONDE_BINGKAI_K2,
  RONDE_GARIS_K2,
  RONDE_JALUR_K2,
  RONDE_JODOH_K2,
  RONDE_DETEKTIF_K2,
  TULIS_A_RONDE1,
  TULIS_A_PILIHAN,
  RONDE_PAPAN_K2,
  RONDE_TUKAR_K2,
  RONDE_TOKO_K2,
  RONDE_RAK_K2,
  RONDE_TABEL_K2,
  RONDE_GARISB_K2,
  RONDE_CARA_K2,
  RONDE_TITIK_K2,
  RONDE_URUT_K2,
  TULIS_B_RONDE1,
  TULIS_B_PILIHAN,
} from "../src/components/modul/data-k2.ts";

let gagal = 0;
let lulus = 0;
function cek(kondisi, pesan) {
  if (kondisi) {
    lulus += 1;
  } else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const dalam = (n, lo = 0, hi = 50) => Number.isInteger(n) && n >= lo && n <= hi;

/* ---- Nama bilangan ---- */
const BAKU = {
  0: "nol", 1: "satu", 9: "sembilan", 10: "sepuluh", 11: "sebelas", 12: "dua belas", 15: "lima belas", 19: "sembilan belas",
  20: "dua puluh", 21: "dua puluh satu", 26: "dua puluh enam", 30: "tiga puluh", 33: "tiga puluh tiga", 40: "empat puluh",
  45: "empat puluh lima", 47: "empat puluh tujuh", 50: "lima puluh", 100: "seratus", 101: "seratus satu", 120: "seratus dua puluh",
  200: "dua ratus",
};
for (const [n, k] of Object.entries(BAKU)) cek(namaBilangan(Number(n)) === k, `namaBilangan(${n}) = "${namaBilangan(Number(n))}", seharusnya "${k}"`);
cek(NamaBilangan(26) === "Dua puluh enam", "NamaBilangan(26) berawal huruf kapital");
cek(sukuKata(26) === "dua pu-luh e-nam", `sukuKata(26) = ${sukuKata(26)}`);
const semuaNama = new Set();
for (let n = 0; n <= 50; n += 1) {
  const k = namaBilangan(n);
  cek(/^[a-z ]+$/.test(k), `nama ${n} hanya huruf kecil: "${k}"`);
  cek(!semuaNama.has(k), `nama ${n} unik`);
  semuaNama.add(k);
  const { puluhan, satuan } = uraiK2(n);
  cek(puluhan * 10 + satuan === n && dalam(satuan, 0, 9), `uraiK2(${n})`);
  const opsi = opsiSekitar(n);
  cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.includes(n) && opsi.every((x) => dalam(x)), `opsiSekitar(${n}) = ${opsi}`);
  const cara = semuaCara(n);
  cek(cara.every((c) => c.p * 10 + c.s === n && c.p >= 0 && c.s >= 0) && cara[0].p === puluhan, `semuaCara(${n})`);
}
// Posisi kunci pada opsiSekitar harus tersebar, bukan selalu di tengah.
const posisi = [0, 0, 0];
for (let n = 10; n <= 49; n += 1) posisi[opsiSekitar(n).indexOf(n)] += 1;
cek(posisi.every((x) => x > 5), `sebaran kunci opsiSekitar ${posisi}`);

/* ---- Sub-Bab A ---- */
const wajibDalam = (arr, lo, hi, nama) => arr.forEach((n) => cek(dalam(n, lo, hi), `${nama}: ${n} di luar ${lo}-${hi}`));
wajibDalam(RONDE_IKAT_K2, 21, 50, "ikat");
RONDE_IKAT_K2.forEach((n) => cek(n % 10 !== 0, `ikat ${n} sebaiknya punya sisa`));
wajibDalam(RONDE_LOKER_K2, 11, 50, "loker");
wajibDalam(RONDE_SUSUN_K2, 11, 50, "susun");
RONDE_SUSUN_K2.forEach((n) => cek(n % 10 !== 0, `susun ${n} punya sisa`));
wajibDalam(RONDE_TEBAK_K2, 11, 50, "tebak");
wajibDalam(RONDE_BINGKAI_K2, 11, 50, "bingkai");
RONDE_BINGKAI_K2.forEach((n) => cek(Math.ceil(n / 10) <= 5, `bingkai ${n} muat di lima bingkai`));
cek(new Set(RONDE_IKAT_K2).size === RONDE_IKAT_K2.length, "ikat unik");

for (const r of RONDE_GARIS_K2) {
  cek(dalam(r.dari, 0, 50) && dalam(r.sampai, 0, 50) && r.sampai > r.dari, `garis ${r.dari}-${r.sampai}`);
  cek(r.sampai - r.dari + 1 <= 16, `garis ${r.dari}-${r.sampai} tidak lebih dari 16 titik`);
}
for (const r of RONDE_JALUR_K2) {
  const lo = Math.min(r.awal, r.akhir);
  const hi = Math.max(r.awal, r.akhir);
  cek((r.arah === "maju") === (r.awal < r.akhir), `jalur arah ${r.arah} cocok dengan awal/akhir`);
  cek(r.sembunyi.length >= 3, "jalur menyembunyikan minimal 3");
  cek(new Set(r.sembunyi).size === r.sembunyi.length, "jalur sembunyi unik");
  r.sembunyi.forEach((n) => cek(n > lo && n < hi, `jalur sembunyi ${n} di dalam ${lo}-${hi} dan bukan ujung`));
}
for (const baris of RONDE_JODOH_K2) {
  cek(baris.length === 4 && new Set(baris).size === 4, `jodoh ${baris} empat bilangan berbeda`);
  cek(new Set(baris.map(namaBilangan)).size === 4, "jodoh nama berbeda");
  baris.forEach((n) => cek(dalam(n, 11, 50), `jodoh ${n}`));
}
const jawabDetektif = [];
for (const s of RONDE_DETEKTIF_K2) {
  cek(s.opsi.length === 3 && new Set(s.opsi).size === 3, "detektif 3 opsi unik");
  cek(s.opsi.includes(s.jawab), `detektif jawab ${s.jawab} ada di opsi`);
  cek(s.petunjuk.length >= 2 && s.salah.length > 20, "detektif punya petunjuk dan pembahasan");
  jawabDetektif.push(s.jawab);
}
// Setiap petunjuk numerik harus konsisten dengan jawaban (periksa terhadap pola kalimat).
const D = RONDE_DETEKTIF_K2;
cek(D[0].jawab === 25 && D[0].jawab === 24 + 1 && D[0].jawab < 26, "detektif 1");
cek(D[1].jawab === 20 + 8 && namaBilangan(D[1].jawab) === "dua puluh delapan", "detektif 2");
cek(D[2].jawab > 38 && D[2].jawab < 40 && D[2].jawab === 30 + 9, "detektif 3");
cek(D[3].jawab === 47 && namaBilangan(47) === "empat puluh tujuh", "detektif 4");
cek(dalam(TULIS_A_RONDE1, 11, 50) && TULIS_A_PILIHAN.length === 3 && TULIS_A_PILIHAN.every((n) => dalam(n, 11, 50)), "tulis A");

/* ---- Sub-Bab B ---- */
wajibDalam(RONDE_PAPAN_K2, 11, 50, "papan");
for (const r of RONDE_TUKAR_K2) {
  const [pa, sa] = r.awal;
  const [pt, st] = r.tujuan;
  cek(pa * 10 + sa === pt * 10 + st, `tukar ${r.awal} -> ${r.tujuan} nilai harus tetap`);
  cek(pa * 10 + sa <= 50, "tukar <= 50");
  cek(pa !== pt || sa !== st, "tukar harus ada perubahan");
}
wajibDalam(RONDE_TOKO_K2, 11, 50, "toko");
RONDE_TOKO_K2.forEach((n) => cek(n % 10 !== 0, `toko ${n} punya sisa`));
for (const r of RONDE_RAK_K2) {
  const total = r.rak * 10 + r.lepas;
  cek(total <= 50 && r.lepas >= 1 && r.lepas <= 9 && r.rak >= 1, `rak ${r.rak}/${r.lepas} total ${total}`);
}
wajibDalam(RONDE_TABEL_K2, 11, 50, "tabel");
wajibDalam(RONDE_GARISB_K2, 11, 50, "garis B");
for (const r of RONDE_CARA_K2) {
  cek(r.kandidat.length === 4, "cara 4 kandidat");
  const benar = r.kandidat.filter((k) => nilaiKandidat(k) === r.n).length;
  cek(benar === 3, `cara ${r.n}: tepat 3 benar, ditemukan ${benar}`);
  cek(new Set(r.kandidat.map((k) => `${k.p}/${k.s}`)).size === 4, `cara ${r.n} kandidat unik`);
  const semua = semuaCara(r.n).length;
  cek(semua >= 3, `cara ${r.n} punya minimal 3 cara`);
}
wajibDalam(RONDE_TITIK_K2, 11, 50, "titik");
for (const kartu of RONDE_URUT_K2) {
  const nilai = kartu.map(nilaiKandidat);
  cek(new Set(nilai).size === nilai.length, `urut ${nilai} nilai berbeda`);
  cek(nilai.every((n) => dalam(n, 11, 50)), `urut ${nilai} dalam jangkauan`);
  cek(nilai.some((n, i) => i > 0 && n < nilai[i - 1]) || nilai.some((n, i) => i > 0 && n > nilai[i - 1]), "urut tidak sudah berurutan");
  const terurut = [...nilai].sort((a, b) => a - b);
  cek(JSON.stringify(terurut) !== JSON.stringify(nilai), `urut ${nilai} awal belum urut`);
}
cek(TULIS_B_RONDE1.p * 10 + TULIS_B_RONDE1.s === 26, "tulis B ronde 1 = 26");
cek(TULIS_B_PILIHAN.length === 3 && TULIS_B_PILIHAN.every((n) => dalam(n, 11, 50)), "tulis B pilihan");

/* ---- Berkas JSON publik: tanpa kunci ---- */
const publik = JSON.parse(fs.readFileSync(new URL("../src/data/kelas2-bab1.json", import.meta.url), "utf8"));
const teksPublik = JSON.stringify(publik);
for (const terlarang of ["correct_index", "correctIndex", "explanation", "exam_questions", "examQuestions", "kunci", "jawabanBenar", "answer_key"]) {
  cek(!teksPublik.includes(`"${terlarang}"`), `JSON publik tidak boleh memuat "${terlarang}"`);
}
cek(!/rp\s?\d|rupiah/i.test(teksPublik), "JSON publik tidak menyebut rupiah");
cek(publik.chapter_id === "k2-mat-bab1" && publik.phase_code === "FASE_A" && publik.grade === 2, "kepala bab: chapter_id, phase_code, grade");
cek(publik.tokens.practice === 30 && publik.tokens.exam === 70 && publik.tokens.practicum === 50, "poin 30/70/50");
cek(publik.suaraPerangkatSaja === true, "suaraPerangkatSaja aktif");
cek(Array.isArray(publik.practiceQuestions) && publik.practiceQuestions.length === 10, "10 soal latihan");
const idLatihan = new Set();
const tingkat = { LOTS: 0, MOTS: 0, HOTS: 0 };
for (const q of publik.practiceQuestions) {
  cek(Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4, `latihan ${q.id}: 4 pilihan unik`);
  cek(typeof q.prompt === "string" && q.prompt.length > 10, `latihan ${q.id}: ada soal`);
  idLatihan.add(q.id);
  const m = /^(LOTS|MOTS|HOTS)/.exec(q.level ?? "");
  cek(Boolean(m), `latihan ${q.id}: level ${q.level}`);
  if (m) tingkat[m[1]] += 1;
}
cek(idLatihan.size === 10, "id latihan unik");
cek(tingkat.LOTS === 3 && tingkat.MOTS === 3 && tingkat.HOTS === 4, `sebaran level ${JSON.stringify(tingkat)}`);
for (const kode of ["A", "B", "C"]) {
  const sb = publik.subBabs[kode];
  cek(Boolean(sb), `sub-bab ${kode} ada`);
  if (kode === "C") {
    cek(sb.segeraHadir === true, "sub-bab C ditandai segeraHadir");
    continue;
  }
  cek(sb.stories.length === 6 && sb.mindMaps.length === 6, `sub-bab ${kode}: 6 adegan dan 6 langkah peta`);
  cek(sb.concreteSlides.length === 4 && sb.pictorialSlides.length === 3 && sb.abstractSlides.length === 3, `sub-bab ${kode}: 4/3/3 permainan CPA`);
  cek(sb.interactiveGames.length === 10, `sub-bab ${kode}: 10 permainan interaktif`);
  const jenis = new Set(sb.interactiveGames.map((g) => g.type ?? g.jenis ?? g.title));
  cek(jenis.size === 10, `sub-bab ${kode}: 10 permainan berbeda`);
  cek(sb.silabus && sb.silabus.teksSuara && sb.silabus.cp && sb.silabus.referensi, `sub-bab ${kode}: silabus lengkap`);
}

console.log(`\nUji data Kelas 2 Bab 1: ${lulus} cek lulus, ${gagal} gagal.`);
process.exit(gagal === 0 ? 0 : 1);
