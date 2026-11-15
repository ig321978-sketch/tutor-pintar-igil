/**
 * Bank asli Kelas 1 Bab 1 (membilang sampai 10).
 * Bukan salinan bank penerbit. Angka dan kunci dihitung di skrip ini.
 * Menulis supabase/seed/02_kelas1_bab1_bank_keys.sql (tidak di-commit).
 *
 * Latihan 100: 30 LOTS, 30 MOTS, 40 HOTS.
 * Ujian 100: seluruhnya HOTS.
 * Satu undian siswa = 10 soal. Komposisi undian Latihan diatur di RPC.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const NAMA = ["Kira", "Upe", "Wei", "Malosi", "Tika", "Halim", "Lili"];
const BENDA = [
  ["apel", "🍎"],
  ["jeruk", "🍊"],
  ["kelereng", "⚪"],
  ["buku", "📘"],
  ["pensil", "✏️"],
  ["kue", "🍪"],
  ["bola", "⚽"],
  ["bunga", "🌸"],
  ["topi", "🎩"],
  ["balon", "🎈"],
];
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

function hash32(n) {
  let x = Math.imul((n ^ 0x9e3779b9) >>> 0, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
}

function kocok(daftar, seed) {
  const hasil = [...daftar];
  let s = hash32(seed >>> 0);
  for (let i = hasil.length - 1; i > 0; i -= 1) {
    s = hash32((s + i + 1) >>> 0);
    const j = s % (i + 1);
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

function lainAngka(benar, seed) {
  const calon = [];
  for (let n = 0; n <= 10; n += 1) if (n !== benar) calon.push(String(n));
  return kocok(calon, seed).slice(0, 3);
}

function susun(benar, pengalih, seed) {
  const teks = String(benar);
  const lain = Array.isArray(pengalih) ? pengalih.map(String) : lainAngka(Number(benar), seed);
  const semua = [teks, ...lain];
  if (new Set(semua).size !== 4) {
    throw new Error(`pilihan tidak 4 unik untuk jawaban ${teks}: ${semua.join("|")}`);
  }
  const options = kocok(semua, seed + 17);
  return { options, correctIndex: options.indexOf(teks) };
}

function butir({ level, prompt, benar, lain, visual = [], visual2 = [], explanation, seed }) {
  const { options, correctIndex } = susun(benar, lain, seed);
  if (!explanation || !prompt) throw new Error("naskah kosong");
  return { level, prompt, options, correctIndex, explanation, visual, visual2 };
}

const latihan = [];
const ujian = [];
const promptTerpakai = new Set();

function simpan(daftar, item) {
  if (promptTerpakai.has(item.prompt)) {
    throw new Error(`prompt ganda: ${item.prompt}`);
  }
  promptTerpakai.add(item.prompt);
  daftar.push(butir(item));
}

for (let n = 1; n <= 10; n += 1) {
  const [kata, emoji] = BENDA[n - 1];
  const nama = NAMA[n % NAMA.length];
  simpan(latihan, {
    level: "LOTS",
    prompt: `${nama} menunjuk ${kata} satu per satu. Berapa banyak ${kata} yang ${nama} hitung?`,
    benar: n,
    visual: Array.from({ length: n }, () => emoji),
    explanation: `${nama} menunjuk tiap ${kata} sekali. Banyaknya ${n}.`,
    seed: 1000 + n,
  });
}

for (let n = 0; n <= 9; n += 1) {
  const salah = kocok(KATA.filter((kata) => kata !== KATA[n]), 2000 + n).slice(0, 3);
  simpan(latihan, {
    level: "LOTS",
    prompt: `Angka ${n} dibaca...`,
    benar: KATA[n],
    lain: salah,
    explanation: `Lambang ${n} dibaca ${KATA[n]}.`,
    seed: 2000 + n,
  });
}

for (let n = 0; n <= 9; n += 1) {
  const [kata, emoji] = BENDA[n % BENDA.length];
  const nama = NAMA[(n + 2) % NAMA.length];
  simpan(latihan, {
    level: "LOTS",
    prompt: n === 0
      ? `Keranjang ${nama} tidak berisi ${kata} sama sekali. Banyak ${kata} itu dilambangkan dengan angka...`
      : `${nama} sudah menghitung ${kata} sampai selesai. Bilangan terakhir yang ${nama} sebut adalah ${KATA[n]}. Lambang angkanya adalah...`,
    benar: n,
    visual: n === 0 ? ["🧺"] : Array.from({ length: n }, () => emoji),
    explanation: n === 0
      ? `Tidak ada ${kata} sama sekali, jadi banyaknya 0.`
      : `Bilangan terakhir ${KATA[n]} ditulis ${n}.`,
    seed: 3000 + n,
  });
}

const tambah = [];
for (let a = 0; a <= 9; a += 1) {
  for (let b = 1; b <= 10 - a; b += 1) tambah.push([a, b]);
}
for (let i = 0; i < 10; i += 1) {
  const [a, b] = tambah[(i * 5) % tambah.length];
  const nama = NAMA[i % NAMA.length];
  const [kata] = BENDA[i % BENDA.length];
  simpan(latihan, {
    level: "MOTS",
    prompt: `${nama} punya ${a} ${kata}, lalu mendapat ${b} lagi. Sekarang ${nama} punya ... ${kata}.`,
    benar: a + b,
    explanation: `${a} ditambah ${b} sama dengan ${a + b}.`,
    seed: 4000 + i,
  });
}

const kurang = [];
for (let a = 2; a <= 10; a += 1) {
  for (let b = 1; b < a; b += 1) kurang.push([a, b]);
}
for (let i = 0; i < 8; i += 1) {
  const [a, b] = kurang[(i * 4) % kurang.length];
  const nama = NAMA[(i + 1) % NAMA.length];
  const [kata] = BENDA[(i + 3) % BENDA.length];
  simpan(latihan, {
    level: "MOTS",
    prompt: `${nama} punya ${a} ${kata}, lalu memberikan ${b}. Sisa ${kata} ${nama} adalah...`,
    benar: a - b,
    explanation: `${a} dikurangi ${b} sama dengan ${a - b}.`,
    seed: 5000 + i,
  });
}

const banding = [[2, 5], [3, 8], [4, 9], [1, 6], [0, 4], [7, 10]];
for (let i = 0; i < banding.length; i += 1) {
  const [a, b] = banding[i];
  const nama = NAMA[i % NAMA.length];
  simpan(latihan, {
    level: "MOTS",
    prompt: `${nama} membandingkan ${a} dengan ${b}. Tanda yang tepat untuk ${a} ○ ${b} adalah...`,
    benar: "<",
    lain: [">", "=", "+"],
    explanation: `${a} lebih kecil dari ${b}, jadi tandanya <.`,
    seed: 6000 + i,
  });
}

const hilang = [
  { deret: "2, 3, ..., 5", jawab: 4, arah: "maju" },
  { deret: "6, 7, ..., 9", jawab: 8, arah: "maju" },
  { deret: "9, 8, ..., 6", jawab: 7, arah: "mundur" },
  { deret: "5, 4, ..., 2", jawab: 3, arah: "mundur" },
  { deret: "0, 1, ..., 3", jawab: 2, arah: "maju" },
  { deret: "10, 9, ..., 7", jawab: 8, arah: "mundur" },
];
for (let i = 0; i < hilang.length; i += 1) {
  const { deret, jawab, arah } = hilang[i];
  simpan(latihan, {
    level: "MOTS",
    prompt: `Upe menghitung ${arah}: ${deret}. Bilangan yang hilang adalah...`,
    benar: jawab,
    explanation: `Menghitung ${arah} satu per satu. Bilangan yang hilang adalah ${jawab}.`,
    seed: 7000 + i,
  });
}

function duaLangkah(i) {
  const awal = i % 7;
  const tambah = (i % 4) + 1;
  const kurang = (i % 3) + 1;
  if (awal + tambah > 10) return null;
  const hasil = awal + tambah - kurang;
  if (hasil < 0) return null;
  return { awal, tambah, kurang, hasil };
}

function ikatanSalah(target, seed) {
  const benar = [];
  for (let kiri = 0; kiri <= target; kiri += 1) benar.push(`${kiri} dan ${target - kiri}`);
  const salahKiri = target === 10 ? 4 : target + 1;
  const salah = `${salahKiri} dan ${target}`;
  const contoh = kocok(benar.filter((teks) => teks !== salah), seed).slice(0, 3);
  if (contoh.length < 3 || contoh.includes(salah)) return null;
  return { salah, contoh };
}

let hotsLatihan = 0;
let hotsUjian = 0;
let langkah = 0;
while (hotsLatihan < 40 || hotsUjian < 100) {
  langkah += 1;
  if (langkah > 5000) throw new Error("bank HOTS tidak cukup unik");
  const nama = NAMA[langkah % NAMA.length];
  const teman = NAMA[(langkah + 3) % NAMA.length];
  const [kata, emoji] = BENDA[langkah % BENDA.length];
  const jenis = langkah % 5;
  const untukUjian = hotsLatihan >= 40;
  const daftar = untukUjian ? ujian : latihan;
  const seed = 8000 + langkah;

  if (jenis === 0) {
    const hitung = duaLangkah(langkah);
    if (!hitung) continue;
    const { awal, tambah, kurang, hasil } = hitung;
    const prompt = `${nama} punya ${awal} ${kata}. Ia mendapat ${tambah}, lalu memberikan ${kurang} kepada ${teman}. Sekarang ${nama} punya ... ${kata}.`;
    if (promptTerpakai.has(prompt)) continue;
    simpan(daftar, {
      level: "HOTS",
      prompt,
      benar: hasil,
      explanation: `${awal} + ${tambah} = ${awal + tambah}, lalu dikurangi ${kurang} menjadi ${hasil}.`,
      seed,
    });
  } else if (jenis === 1) {
    const rendah = langkah % 9;
    const tinggi = rendah + 2;
    if (tinggi > 10) continue;
    const jawab = rendah + 1;
    const prompt = `${nama} punya lebih banyak ${kata} daripada ${rendah}, tetapi kurang dari ${tinggi}. Banyak ${kata} ${nama} adalah...`;
    if (promptTerpakai.has(prompt)) continue;
    simpan(daftar, {
      level: "HOTS",
      prompt,
      benar: jawab,
      explanation: `Bilangan yang lebih dari ${rendah} dan kurang dari ${tinggi} di sini adalah ${jawab}.`,
      seed,
    });
  } else if (jenis === 2) {
    const target = 3 + (langkah % 8);
    const ikatan = ikatanSalah(target, seed);
    if (!ikatan) continue;
    const prompt = `${nama} membuat pasangan bilangan ${target}. Pasangan yang salah adalah...`;
    if (promptTerpakai.has(prompt)) continue;
    simpan(daftar, {
      level: "HOTS",
      prompt,
      benar: ikatan.salah,
      lain: ikatan.contoh,
      explanation: `${ikatan.salah} tidak menjadi ${target}. Pasangan yang benar jumlahnya ${target}.`,
      seed,
    });
  } else if (jenis === 3) {
    const ada = 2 + (langkah % 7);
    const lompat = (langkah % 3) + 1;
    const disebut = [];
    for (let k = 1; k <= ada; k += 1) {
      if (k === lompat) continue;
      disebut.push(KATA[k]);
    }
    if (disebut.length < 3) continue;
    const prompt = `${nama} menghitung ${kata}: ${disebut.join(", ")}. Ada satu bilangan yang terlewat. Bilangan itu adalah...`;
    if (promptTerpakai.has(prompt)) continue;
    const lainLewat = kocok(
      KATA.filter((kataBil) => kataBil !== KATA[lompat] && kataBil !== "sepuluh"),
      seed,
    ).slice(0, 3);
    if (lainLewat.length < 3 || lainLewat.includes(KATA[lompat])) continue;
    simpan(daftar, {
      level: "HOTS",
      prompt,
      benar: KATA[lompat],
      lain: lainLewat,
      explanation: `Urutan yang utuh tidak boleh melewatkan ${KATA[lompat]}.`,
      seed,
    });
  } else {
    const milik = 1 + (langkah % 8);
    const beri = 1 + (langkah % 3);
    const temanAwal = langkah % 4;
    if (milik <= beri) continue;
    const sisa = milik - beri;
    const temanAkhir = temanAwal + beri;
    if (temanAkhir > 10) continue;
    const jawab = sisa > temanAkhir ? nama : teman;
    if (sisa === temanAkhir) continue;
    const prompt = `${nama} punya ${milik} ${kata} dan ${teman} punya ${temanAwal}. ${nama} memberikan ${beri} ${kata} kepada ${teman}. Siapa yang sekarang punya lebih banyak?`;
    if (promptTerpakai.has(prompt)) continue;
    simpan(daftar, {
      level: "HOTS",
      prompt,
      benar: jawab,
      lain: [jawab === nama ? teman : nama, "sama banyak", "tidak ada"],
      explanation: `${nama} sisa ${sisa}. ${teman} menjadi ${temanAkhir}. Yang lebih banyak adalah ${jawab}.`,
      seed,
    });
  }

  if (untukUjian) hotsUjian += 1;
  else hotsLatihan += 1;
}

if (latihan.length !== 100) throw new Error(`latihan ${latihan.length}, harus 100`);
if (ujian.length !== 100) throw new Error(`ujian ${ujian.length}, harus 100`);

const hitungLevel = (daftar, level) => daftar.filter((soal) => soal.level === level).length;
if (hitungLevel(latihan, "LOTS") !== 30) throw new Error("LOTS latihan bukan 30");
if (hitungLevel(latihan, "MOTS") !== 30) throw new Error("MOTS latihan bukan 30");
if (hitungLevel(latihan, "HOTS") !== 40) throw new Error("HOTS latihan bukan 40");
if (ujian.some((soal) => soal.level !== "HOTS")) throw new Error("ujian bukan seluruhnya HOTS");

function sebarIndeks(daftar, label) {
  const n = [0, 0, 0, 0];
  for (const soal of daftar) n[soal.correctIndex] += 1;
  const min = Math.min(...n);
  const max = Math.max(...n);
  if (min < daftar.length * 0.15 || max > daftar.length * 0.4) {
    throw new Error(`${label}: posisi kunci menumpuk ${n.join(",")}`);
  }
}
sebarIndeks(latihan, "latihan");
sebarIndeks(ujian, "ujian");

function sqlTeks(nilai) {
  return `'${String(nilai).replaceAll("'", "''")}'`;
}

function sqlJson(nilai) {
  return `${sqlTeks(JSON.stringify(nilai))}::jsonb`;
}

const barisLatihan = latihan
  .map((soal, indeks) => {
    const id = `L${String(indeks + 1).padStart(3, "0")}`;
    return `  ('k1-mat-bab1', ${sqlTeks(id)}, ${soal.correctIndex}, ${sqlTeks(soal.explanation)}, ${sqlTeks(soal.prompt)}, ${sqlJson(soal.options)}, ${sqlTeks(soal.level)}, ${sqlJson(soal.visual)}, ${sqlJson(soal.visual2)})`;
  })
  .join(",\n");

const barisUjian = ujian
  .map((soal, indeks) => {
    const id = `U${String(indeks + 1).padStart(3, "0")}`;
    return `  ('k1-mat-bab1', 'acak', ${sqlTeks(id)}, ${sqlTeks(soal.prompt)}, ${sqlJson(soal.options)}, ${soal.correctIndex}, 'HOTS')`;
  })
  .join(",\n");

const idLatihan = latihan.map((_, indeks) => sqlTeks(`L${String(indeks + 1).padStart(3, "0")}`)).join(", ");
const idUjian = ujian
  .map((_, indeks) => `('acak', ${sqlTeks(`U${String(indeks + 1).padStart(3, "0")}`)})`)
  .join(", ");

const sql = `-- Dihasilkan oleh scripts/buat-bank-k1-bab1.mjs. Jangan edit tangan.
-- Bank asli IGIL untuk Kelas 1 Bab 1. Bukan salinan naskah penerbit.
-- Jalankan setelah migrasi 05_bank_acak_k1_bab1.sql.
begin;

insert into public.server_chapters (chapter_id, phase_code, grade)
values ('k1-mat-bab1', 'FASE_A', 1)
on conflict (chapter_id) do update
set phase_code = excluded.phase_code,
    grade = excluded.grade;

update public.server_chapters
set mode_undian = 'acak'
where chapter_id = 'k1-mat-bab1';

insert into private.practice_keys (
  chapter_id, question_id, correct_index, explanation, prompt, options, level_code, visual, visual_kedua
)
values
${barisLatihan}
on conflict (chapter_id, question_id) do update
set correct_index = excluded.correct_index,
    explanation = excluded.explanation,
    prompt = excluded.prompt,
    options = excluded.options,
    level_code = excluded.level_code,
    visual = excluded.visual,
    visual_kedua = excluded.visual_kedua;

delete from private.practice_keys
where chapter_id = 'k1-mat-bab1'
  and question_id not in (${idLatihan});

insert into private.exam_keys (
  chapter_id, package_code, question_id, prompt, options, correct_index, level_code
)
values
${barisUjian}
on conflict (chapter_id, package_code, question_id) do update
set prompt = excluded.prompt,
    options = excluded.options,
    correct_index = excluded.correct_index,
    level_code = excluded.level_code;

delete from private.exam_keys
where chapter_id = 'k1-mat-bab1'
  and (package_code, question_id) not in (${idUjian});

commit;
`;

const tujuan = path.join(process.cwd(), "supabase", "seed", "02_kelas1_bab1_bank_keys.sql");
await mkdir(path.dirname(tujuan), { recursive: true });
await writeFile(tujuan, sql);
console.log(`latihan ${latihan.length} (LOTS 30, MOTS 30, HOTS 40)`);
console.log(`ujian ${ujian.length} HOTS`);
console.log(`seed ${tujuan}`);
