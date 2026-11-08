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
  alasanBanding,
  bandingkan,
  besarKecilKartu,
  kataBanding,
  KARTU_TEKA_K2,
  memenuhiDuel,
  nilaiTeka,
  ringkasK2,
  RONDE_BUAYA_K2,
  RONDE_DUEL_K2,
  RONDE_JARAK_K2,
  RONDE_NERACA_K2,
  RONDE_PASANG_K2,
  RONDE_RAKKELERENG_K2,
  RONDE_STOPLES_K2,
  RONDE_TABELBANDING_K2,
  RONDE_TEKA_K2,
  RONDE_TUKARBANDING_K2,
  susunanKartu,
  tandaBanding,
  urutanBenar,
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

/* ---- Sub-Bab C: membandingkan ---- */
cek(bandingkan(32, 26) === "kiri" && bandingkan(26, 32) === "kanan" && bandingkan(26, 26) === "sama", "bandingkan");
cek(tandaBanding(32, 26) === ">" && tandaBanding(26, 32) === "<" && tandaBanding(41, 41) === "=", "tandaBanding");
cek(kataBanding(32, 26) === "lebih besar dari" && kataBanding(26, 32) === "lebih kecil dari" && kataBanding(5, 5) === "sama dengan", "kataBanding");
cek(alasanBanding(26, 32) === "puluhan" && alasanBanding(24, 29) === "satuan" && alasanBanding(41, 41) === "sama" && alasanBanding(19, 21) === "puluhan", "alasanBanding");
// Semua pasangan 0..50: hasil bandingkan harus cocok dengan perbandingan angka biasa.
for (let a = 0; a <= 50; a += 1) {
  for (let b = 0; b <= 50; b += 1) {
    const ok = bandingkan(a, b) === (a > b ? "kiri" : a < b ? "kanan" : "sama");
    if (!ok) cek(false, `bandingkan(${a}, ${b})`);
  }
}
cek(true, "bandingkan seluruh pasangan 0 sampai 50");

{
  // C1 Hitung Stoples Kira
  const hubungan = new Set();
  for (const r of RONDE_STOPLES_K2) {
    cek(dalam(r.n, 21, 50), `stoples n ${r.n}`);
    cek(r.tebakan.every((t) => dalam(t, 10, 50)), `stoples tebakan ${r.tebakan}`);
    cek(r.tokoh.length === 2 && r.tokoh[0] !== r.tokoh[1], "stoples dua tokoh berbeda");
    r.tebakan.forEach((t) => hubungan.add(bandingkan(t, r.n)));
  }
  cek(hubungan.size === 3, `stoples memuat kecil, sama, besar: ${[...hubungan]}`);

  // C2 Pasangkan Satu-Satu
  cek(RONDE_PASANG_K2.every(([a, b]) => dalam(a, 11, 50) && dalam(b, 11, 50) && new Set(RONDE_PASANG_K2.map((p) => p.join("-"))).size === RONDE_PASANG_K2.length), "pasang dalam jangkauan dan unik");
  const alasanPasang = new Set(RONDE_PASANG_K2.map(([a, b]) => alasanBanding(a, b)));
  cek(alasanPasang.has("puluhan") && alasanPasang.has("satuan"), "pasang memuat puluhan dan satuan");
  cek(RONDE_PASANG_K2.some(([a, b]) => uraiK2(a).satuan > uraiK2(b).satuan && a < b), "pasang punya jebakan satuan kiri lebih banyak tetapi bilangan kiri lebih kecil");

  // C3 Neraca
  for (const r of RONDE_NERACA_K2) {
    const nilai = r.p * 10 + r.s;
    cek(r.p >= 0 && r.p <= 5 && r.s >= 0 && r.s <= 9 && nilai >= 11 && nilai <= 50, `neraca ${r.p}p${r.s}s`);
    if (r.tujuan === "sama") cek(r.p >= 1 && r.s + 10 <= 24, "neraca sama: ada cara tulis lain dalam batas piring");
    if (r.tujuan === "besar") cek(nilai < 50, "neraca besar: ada bilangan lebih besar");
    if (r.tujuan === "kecil") cek(nilai > 1, "neraca kecil: ada bilangan lebih kecil");
  }
  cek(new Set(RONDE_NERACA_K2.map((r) => r.tujuan)).size === 3, "neraca memuat besar, kecil, sama");

  // C4 Rak Kelereng
  for (const r of RONDE_RAKKELERENG_K2) {
    cek(r.isi.length === 4 && new Set(r.isi).size === 4 && r.isi.every((n) => dalam(n, 11, 50)), `rak ${r.isi}`);
    cek(r.isi.every((n) => uraiK2(n).puluhan <= 4 && uraiK2(n).satuan <= 9), "rak: kantong paling banyak 4");
    const u = urutanBenar(r.isi, r.arah).map((i) => r.isi[i]);
    const terurut = [...r.isi].sort((a, b) => (r.arah === "kecil" ? a - b : b - a));
    cek(JSON.stringify(u) === JSON.stringify(terurut), `urutanBenar ${r.isi} ${r.arah}`);
    cek(JSON.stringify(u) !== JSON.stringify(r.isi), `rak ${r.isi} awal belum urut`);
    const puluhan = r.isi.map((n) => uraiK2(n).puluhan);
    cek(new Set(puluhan).size < 4, `rak ${r.isi} punya dua bilangan dengan puluhan sama (perlu lihat satuan)`);
  }
  cek(new Set(RONDE_RAKKELERENG_K2.map((r) => r.arah)).size === 2, "rak memuat arah kecil dan besar");

  // P5 Banding di Tabel
  const alasanTabel = new Set(RONDE_TABELBANDING_K2.map(([a, b]) => alasanBanding(a, b)));
  cek(alasanTabel.has("puluhan") && alasanTabel.has("satuan"), "tabel banding memuat puluhan dan satuan");
  cek(RONDE_TABELBANDING_K2.every(([a, b]) => dalam(a, 11, 50) && dalam(b, 11, 50) && a !== b), "tabel banding dalam jangkauan");

  // P6 Jarak
  const hasilJarak = new Set();
  for (const r of RONDE_JARAK_K2) {
    cek(r.sampai - r.dari === 10 && r.n > r.dari && r.n < r.sampai && dalam(r.dari, 0, 40) && dalam(r.sampai, 10, 50), `jarak ${r.dari}-${r.sampai} n ${r.n}`);
    const k0 = r.n - r.dari;
    const k1 = r.sampai - r.n;
    hasilJarak.add(k0 < k1 ? "kiri" : k0 > k1 ? "kanan" : "sama");
  }
  cek(hasilJarak.size === 3, `jarak memuat kiri, kanan, sama dekat: ${[...hasilJarak]}`);

  // P7 Tukar Dulu, Baru Banding
  let jebakan = 0;
  const hasilTukar = new Set();
  for (const r of RONDE_TUKARBANDING_K2) {
    const ubah = r.ubah === "kiri" ? r.kiri : r.kanan;
    const lain = r.ubah === "kiri" ? r.kanan : r.kiri;
    cek(ubah.s >= 10 && ubah.s <= 24 && lain.s < 10, `tukar banding: satuan ${ubah.s} dan ${lain.s}`);
    const rk = ringkasK2(ubah.p, ubah.s);
    cek(rk.satuan < 10 && rk.puluhan * 10 + rk.satuan === ubah.p * 10 + ubah.s, "ringkasK2 menjaga nilai");
    const nk = r.kiri.p * 10 + r.kiri.s;
    const nn = r.kanan.p * 10 + r.kanan.s;
    cek(dalam(nk, 11, 50) && dalam(nn, 11, 50), `tukar banding nilai ${nk} dan ${nn}`);
    hasilTukar.add(bandingkan(nk, nn));
    if (bandingkan(r.kiri.p, r.kanan.p) !== bandingkan(nk, nn)) jebakan += 1;
  }
  cek(jebakan >= 1, "tukar banding punya jebakan: membandingkan puluhan tanpa menukar memberi jawaban salah");
  cek(hasilTukar.size === 3, `tukar banding memuat kiri, kanan, sama: ${[...hasilTukar]}`);

  // A8 Buaya Lapar
  const tandaBuaya = new Set(RONDE_BUAYA_K2.map(([a, b]) => tandaBanding(a, b)));
  const alasanBuaya = new Set(RONDE_BUAYA_K2.map(([a, b]) => alasanBanding(a, b)));
  cek(tandaBuaya.size === 3 && alasanBuaya.size === 3, `buaya memuat tiga tanda dan tiga alasan: ${[...tandaBuaya]} ${[...alasanBuaya]}`);
  cek(RONDE_BUAYA_K2.some(([a, b]) => uraiK2(a).satuan > uraiK2(b).satuan && a < b), "buaya punya jebakan 19 dan 21");

  // A9 Duel Kartu Angka
  for (const r of RONDE_DUEL_K2) {
    cek(r.kartu.every((k) => k >= 1 && k <= 5) && r.kartu[0] !== r.kartu[1], `duel kartu ${r.kartu}`);
    cek(dalam(r.igil, 11, 50), `duel igil ${r.igil}`);
    const cocok = susunanKartu(r.kartu).map(([p, s]) => p * 10 + s).filter((n) => memenuhiDuel(n, r.igil, r.tujuan));
    cek(cocok.length === 1, `duel ${r.kartu} lawan ${r.igil} (${r.tujuan}) punya tepat satu susunan: ${cocok}`);
  }
  cek(new Set(RONDE_DUEL_K2.map((r) => r.tujuan)).size === 3, "duel memuat besar, kecil, sama");

  // A10 Teka-teki Kartu
  for (const r of RONDE_TEKA_K2) {
    const v = nilaiTeka(r);
    cek(new Set([v.diketahui, v.kurang, v.lebih]).size === 3 && [v.diketahui, v.kurang, v.lebih].every((n) => dalam(n, 11, 50)), `teka ${JSON.stringify(v)}`);
    cek(new Set([r.diketahui.nama, r.kurang.nama, r.lebih.nama]).size === 3, "teka tiga nama berbeda");
  }
  const v0 = nilaiTeka(RONDE_TEKA_K2[0]);
  cek(v0.kurang === 32 && v0.diketahui === 34 && v0.lebih === 35, "teka ronde 1 sesuai buku: Lili 32, Kira 34, Malosi 35");
  const bk = besarKecilKartu(KARTU_TEKA_K2);
  cek(bk.besar === 43 && bk.kecil === 12, `kartu 1 2 3 4: besar ${bk.besar} kecil ${bk.kecil}`);
}

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
  cek(sb.segeraHadir !== true, `sub-bab ${kode} tidak boleh lagi ditandai segeraHadir`);
  cek(sb.stories.length === 6 && sb.mindMaps.length === 6, `sub-bab ${kode}: 6 adegan dan 6 langkah peta`);
  cek(sb.concreteSlides.length === 4 && sb.pictorialSlides.length === 3 && sb.abstractSlides.length === 3, `sub-bab ${kode}: 4/3/3 permainan CPA`);
  cek(sb.interactiveGames.length === 10, `sub-bab ${kode}: 10 permainan interaktif`);
  const jenis = new Set(sb.interactiveGames.map((g) => g.type ?? g.jenis ?? g.title));
  cek(jenis.size === 10, `sub-bab ${kode}: 10 permainan berbeda`);
  cek(sb.silabus && sb.silabus.teksSuara && sb.silabus.cp && sb.silabus.referensi, `sub-bab ${kode}: silabus lengkap`);
}

console.log(`\nUji data Kelas 2 Bab 1: ${lulus} cek lulus, ${gagal} gagal.`);
process.exit(gagal === 0 ? 0 : 1);
