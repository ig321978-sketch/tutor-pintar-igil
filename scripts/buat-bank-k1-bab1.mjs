/**
 * Bank asli Kelas 1 Bab 1 (membilang sampai 10).
 * Bukan salinan bank penerbit. Angka dan kunci dihitung di skrip ini.
 * Menulis supabase/seed/02_kelas1_bab1_bank_keys.sql (tidak di-commit; berisi kunci jawaban).
 *
 * Latihan 100: 30 LOTS, 30 MOTS, 40 HOTS.
 * Ujian 100: seluruhnya HOTS.
 * Satu undian siswa = 10 soal. Komposisi undian Latihan diatur di RPC.
 *
 * Aturan isi: tokoh hanya Malosi, Kira, Upe, Wei, Halim, Igil; aksi siswa digital (mengetuk,
 * memilih kartu); tanpa buku, pensil, kertas, kelompok, teman; bilangan 0 sampai 10.
 * Tiap soal HOTS berasal dari salah satu dari 15 pola. Uji: scripts/uji-bank-k1b1.mjs.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const NAMA = ["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"];
const BENDA = [
  ["apel", "🍎"],
  ["jeruk", "🍊"],
  ["kelereng", "⚪"],
  ["kue", "🍪"],
  ["bola", "⚽"],
  ["bunga", "🌸"],
  ["topi", "🎩"],
  ["balon", "🎈"],
  ["bintang", "⭐"],
  ["kupu-kupu", "🦋"],
  ["ikan", "🐟"],
  ["mobil-mobilan", "🚗"],
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

/** Tiga pengecoh angka: utamakan yang dekat dengan jawaban benar. */
function pengalihAngka(benar, seed) {
  const dekat = [benar - 1, benar + 1, benar - 2, benar + 2].filter((n) => n >= 0 && n <= 10);
  const jauh = [];
  for (let n = 0; n <= 10; n += 1) if (n !== benar && !dekat.includes(n)) jauh.push(n);
  const pool = [...kocok(dekat, seed).slice(0, 3), ...kocok(jauh, seed + 3)];
  return pool.slice(0, 3).map(String);
}

function opsiDari(benar, lain, seed) {
  const teks = String(benar);
  const semua = [teks, ...lain.map(String)];
  if (new Set(semua).size !== 4) throw new Error(`pilihan tidak 4 unik untuk ${teks}: ${semua.join("|")}`);
  const options = kocok(semua, seed + 17);
  return { options, correctIndex: options.indexOf(teks) };
}

let pencacah = 0;
/** Memilih tokoh dan benda berganti-ganti agar soal tidak seragam. */
function giliran() {
  pencacah += 1;
  const c = pencacah;
  const n = c % NAMA.length;
  const t = (n + 1 + (c % 5)) % NAMA.length;
  const [kata, emoji] = BENDA[(c * 5 + 3) % BENDA.length];
  return { c, nama: NAMA[n], teman: NAMA[t], kata, emoji, ni: n };
}

const ulang = (emoji, n) => Array.from({ length: n }, () => emoji);

/** Daftar calon tiap pola. Tiap calon: { kunci, level, pola, prompt, benar, lain, explanation, visual?, visual2? }. */
const POLA_HOTS = [];

function polaH(nama, fungsi) {
  POLA_HOTS.push({ nama, calon: fungsi() });
}

// H1: dua langkah (tambah lalu kurang).
polaH("dua-langkah", () => {
  const hasil = [];
  for (let a = 1; a <= 8; a += 1)
    for (let b = 1; b <= 10 - a; b += 1)
      for (let k = 1; k <= 4; k += 1) {
        if (k > a + b || a + b - k < 0) continue;
        const g = giliran();
        const benar = a + b - k;
        hasil.push({
          kunci: `${a}-${b}-${k}`,
          prompt: `${g.nama} punya ${a} ${g.kata}. Ia mendapat ${b}, lalu memberikan ${k} kepada ${g.teman}. Sekarang ${g.nama} punya ... ${g.kata}.`,
          benar,
          lain: pengalihAngka(benar, g.c),
          explanation: `${a} + ${b} = ${a + b}, lalu dikurangi ${k} menjadi ${benar}.`,
        });
      }
  return hasil;
});

// H2: bilangan di antara, tetapi bukan satu bilangan.
polaH("antara-bukan", () => {
  const hasil = [];
  for (let r = 0; r <= 7; r += 1)
    for (const s of [r + 1, r + 2]) {
      const t = r + 3;
      const g = giliran();
      const benar = s === r + 1 ? r + 2 : r + 1;
      hasil.push({
        kunci: `${r}-${s}`,
        prompt: `${g.nama} memikirkan bilangan yang lebih besar dari ${r}, lebih kecil dari ${t}, tetapi bukan ${s}. Bilangan ${g.nama} adalah...`,
        benar,
        lain: [r, s, t].map(String),
        explanation: `Yang lebih dari ${r} dan kurang dari ${t} adalah ${r + 1} dan ${r + 2}. Karena bukan ${s}, jawabannya ${benar}.`,
      });
    }
  return hasil;
});

// H3: pasangan bilangan yang salah.
polaH("pasangan-salah", () => {
  const hasil = [];
  for (let target = 4; target <= 10; target += 1)
    for (const selisih of [-1, 1, -2, 2]) {
      const jumlahSalah = target + selisih;
      if (jumlahSalah < 1 || jumlahSalah > 10) continue;
      const g = giliran();
      const kiriSalah = 1 + (g.c % Math.max(1, jumlahSalah - 1));
      const salah = `${kiriSalah} dan ${jumlahSalah - kiriSalah}`;
      const benar = [];
      for (let kiri = 0; kiri <= target; kiri += 1) benar.push(`${kiri} dan ${target - kiri}`);
      const contoh = kocok(benar.filter((p) => p !== salah), g.c).slice(0, 3);
      if (contoh.length < 3) continue;
      hasil.push({
        kunci: `${target}-${selisih}`,
        prompt: `${g.nama} memasangkan bilangan untuk membuat ${target}. Pasangan yang salah adalah...`,
        benar: salah,
        lain: contoh,
        explanation: `${salah} jumlahnya ${jumlahSalah}, bukan ${target}.`,
      });
    }
  return hasil;
});

// H4: satu bilangan terlewat di tengah deret.
polaH("terlewat-tengah", () => {
  const hasil = [];
  for (const arah of ["maju", "mundur"])
    for (let panjang = 4; panjang <= 6; panjang += 1)
      for (let awal = 0; awal + panjang <= 10; awal += 1)
        for (let pos = 1; pos <= panjang - 2; pos += 1) {
          const deret = Array.from({ length: panjang }, (_, i) => awal + i);
          const hilang = deret[pos];
          const tampak = deret.filter((_, i) => i !== pos);
          const urut = arah === "maju" ? tampak : [...tampak].reverse();
          const g = giliran();
          hasil.push({
            kunci: `${arah}-${panjang}-${awal}-${pos}`,
            prompt: `${g.nama} menghitung ${arah}: ${urut.join(", ")}. Satu bilangan terlewat di tengah. Bilangan itu adalah...`,
            benar: hilang,
            lain: pengalihAngka(hilang, g.c),
            explanation: `Menghitung ${arah} satu per satu, bilangan yang terlewat adalah ${hilang}.`,
          });
        }
  return hasil;
});

// H5: siapa lebih banyak setelah memberi.
polaH("siapa-lebih-banyak", () => {
  const hasil = [];
  for (let milik = 2; milik <= 9; milik += 1)
    for (let beri = 1; beri < milik && beri <= 3; beri += 1)
      for (let lawan = 0; lawan <= 4; lawan += 1) {
        const sisa = milik - beri;
        const akhir = lawan + beri;
        if (akhir > 10 || sisa === akhir) continue;
        const g = giliran();
        const jawab = sisa > akhir ? g.nama : g.teman;
        const lainNama = jawab === g.nama ? g.teman : g.nama;
        hasil.push({
          kunci: `${milik}-${beri}-${lawan}`,
          prompt: `${g.nama} punya ${milik} ${g.kata} dan ${g.teman} punya ${lawan}. ${g.nama} memberikan ${beri} ${g.kata} kepada ${g.teman}. Siapa yang sekarang punya lebih banyak?`,
          benar: jawab,
          lain: [lainNama, "sama banyak", "tidak bisa dipastikan"],
          explanation: `${g.nama} tersisa ${sisa}. ${g.teman} menjadi ${akhir}. Yang lebih banyak adalah ${jawab}.`,
        });
      }
  return hasil;
});

// H6: siapa lebih banyak dan berapa lebihnya.
polaH("selisih-banyak", () => {
  const hasil = [];
  for (let a = 1; a <= 10; a += 1)
    for (let b = 1; b <= 10; b += 1) {
      if (a === b || Math.abs(a - b) > 6) continue;
      const g = giliran();
      const menang = a > b ? g.nama : g.teman;
      const kalah = a > b ? g.teman : g.nama;
      const d = Math.abs(a - b);
      const dekat = d === 1 ? d + 1 : d - 1;
      const lain = [`${kalah} lebih banyak ${d}`, `${menang} lebih banyak ${dekat}`, `${kalah} lebih banyak ${dekat}`];
      hasil.push({
        kunci: `${a}-${b}`,
        prompt: `${g.nama} punya ${a} ${g.kata}. ${g.teman} punya ${b} ${g.kata}. Siapa yang punya lebih banyak, dan lebihnya berapa?`,
        benar: `${menang} lebih banyak ${d}`,
        lain,
        explanation: `${Math.max(a, b)} lebih besar dari ${Math.min(a, b)}, lebihnya ${d}. ${menang} lebih banyak.`,
      });
    }
  return hasil;
});

// H7: berapa lagi supaya sepuluh.
polaH("sampai-sepuluh", () => {
  const hasil = [];
  for (let a = 1; a <= 9; a += 1)
    for (let u = 0; u < 3; u += 1) {
      const g = giliran();
      hasil.push({
        kunci: `${a}-${u}`,
        prompt: `${g.nama} punya ${a} ${g.kata} dan ingin punya sepuluh ${g.kata}. ${g.nama} perlu menambah ... ${g.kata} lagi.`,
        benar: 10 - a,
        lain: pengalihAngka(10 - a, g.c),
        explanation: `${a} dan ${10 - a} menjadi 10, jadi perlu menambah ${10 - a}.`,
      });
    }
  return hasil;
});

// H8: mengurutkan tiga bilangan.
polaH("urutan-tiga", () => {
  const hasil = [];
  for (let x = 0; x <= 10; x += 1)
    for (let y = x + 1; y <= 10; y += 1)
      for (let z = y + 1; z <= 10; z += 1) {
        if (z - x < 3) continue;
        const g = giliran();
        const kecilDulu = g.c % 2 === 0;
        const asal = kocok([x, y, z], g.c);
        if (asal.join() === [x, y, z].join() || asal.join() === [z, y, x].join()) continue;
        const benar = (kecilDulu ? [x, y, z] : [z, y, x]).join(", ");
        const perm = [
          [x, y, z],
          [x, z, y],
          [y, x, z],
          [y, z, x],
          [z, x, y],
          [z, y, x],
        ].map((p) => p.join(", "));
        const lain = kocok(perm.filter((p) => p !== benar), g.c).slice(0, 3);
        hasil.push({
          kunci: `${x}-${y}-${z}`,
          prompt: `${g.nama} memilih kartu ${asal.join(", ")}. Urutkan kartu dari yang ${kecilDulu ? "paling kecil ke paling besar" : "paling besar ke paling kecil"}. Urutan yang benar adalah...`,
          benar,
          lain,
          explanation: `Dari yang ${kecilDulu ? "paling kecil ke paling besar" : "paling besar ke paling kecil"}: ${benar}.`,
        });
      }
  return hasil;
});

// H9: paling banyak atau paling sedikit di antara tiga tokoh.
polaH("paling-tiga", () => {
  const hasil = [];
  for (let a = 1; a <= 10; a += 1)
    for (let b = 1; b <= 10; b += 1)
      for (let c3 = 1; c3 <= 10; c3 += 1) {
        if (new Set([a, b, c3]).size !== 3 || (a + b * 3 + c3 * 5) % 4 !== 0) continue;
        const g = giliran();
        const tiga = kocok(NAMA, g.c).slice(0, 3);
        const nilai = [a, b, c3];
        const banyak = g.c % 2 === 0;
        const target = banyak ? Math.max(...nilai) : Math.min(...nilai);
        const jawab = tiga[nilai.indexOf(target)];
        hasil.push({
          kunci: `${a}-${b}-${c3}`,
          prompt: `${tiga[0]} punya ${a} ${g.kata}, ${tiga[1]} punya ${b} ${g.kata}, dan ${tiga[2]} punya ${c3} ${g.kata}. Siapa yang punya paling ${banyak ? "banyak" : "sedikit"}?`,
          benar: jawab,
          lain: [...tiga.filter((n) => n !== jawab), "sama banyak"],
          explanation: `Bandingkan ${a}, ${b}, dan ${c3}. Yang paling ${banyak ? "besar" : "kecil"} adalah ${target}, milik ${jawab}.`,
        });
      }
  return hasil;
});

// H10: salah menghitung (satu benda ditunjuk dua kali).
polaH("salah-hitung", () => {
  const hasil = [];
  for (let s = 2; s <= 10; s += 1)
    for (let u = 0; u < 2; u += 1) {
      const g = giliran();
      hasil.push({
        kunci: `${s}-${u}`,
        prompt: `${g.nama} menghitung ${g.kata}, tetapi ia mengetuk satu ${g.kata} dua kali. Bilangan terakhir yang ia sebut adalah "${KATA[s]}". Banyak ${g.kata} yang sebenarnya adalah...`,
        benar: s - 1,
        lain: pengalihAngka(s - 1, g.c),
        explanation: `Satu ${g.kata} terhitung dua kali, jadi banyak sebenarnya ${s} dikurangi 1, yaitu ${s - 1}.`,
      });
    }
  return hasil;
});

// H11: pernyataan perbandingan yang benar.
polaH("pernyataan-benar", () => {
  const hasil = [];
  for (let a = 0; a <= 10; a += 1)
    for (let b = a + 1; b <= 10; b += 1)
      for (let c3 = b + 1; c3 <= 10; c3 += 1) {
        const g = giliran();
        const tiga = kocok([a, b, c3], g.c);
        const benarPasang = kocok([[b, a], [c3, a], [c3, b]], g.c + 1)[0];
        const salahPasang = [[a, b], [a, c3], [b, c3]];
        const teks = ([p, q]) => `${p} lebih besar dari ${q}`;
        hasil.push({
          kunci: `${a}-${b}-${c3}`,
          prompt: `${g.nama} memegang kartu ${tiga.join(", ")}. Pernyataan yang benar adalah...`,
          benar: teks(benarPasang),
          lain: salahPasang.map(teks),
          explanation: `${benarPasang[0]} memang lebih besar dari ${benarPasang[1]}. Pernyataan lain terbalik.`,
        });
      }
  return hasil;
});

// H12: tiga wadah, cari isi wadah terakhir.
polaH("tiga-wadah", () => {
  const hasil = [];
  for (let t = 4; t <= 10; t += 1)
    for (let a = 1; a <= 4; a += 1)
      for (let b = 1; b <= 4; b += 1) {
        if (a + b + 1 > t) continue;
        const g = giliran();
        const benar = t - a - b;
        hasil.push({
          kunci: `${t}-${a}-${b}`,
          prompt: `${g.nama} punya ${t} ${g.kata} dan menaruhnya di tiga wadah. Wadah pertama berisi ${a}, wadah kedua berisi ${b}. Wadah ketiga berisi ... ${g.kata}.`,
          benar,
          lain: pengalihAngka(benar, g.c),
          explanation: `${a} dan ${b} sudah terpakai, tersisa ${t} dikurangi ${a + b}, yaitu ${benar}.`,
        });
      }
  return hasil;
});

// H13: banyak bilangan di antara dua bilangan.
polaH("banyak-antara", () => {
  const hasil = [];
  for (let a = 0; a <= 6; a += 1)
    for (let b = a + 3; b <= 10; b += 1) {
      const g = giliran();
      const benar = b - a - 1;
      hasil.push({
        kunci: `${a}-${b}`,
        prompt: `${g.nama} menyebut semua bilangan di antara ${a} dan ${b}. Banyak bilangan yang ${g.nama} sebut adalah...`,
        benar,
        lain: pengalihAngka(benar, g.c),
        explanation: `Bilangan di antara ${a} dan ${b} dimulai dari ${a + 1} sampai ${b - 1}. Banyaknya ${benar}.`,
      });
    }
  return hasil;
});

// H14: lompat maju atau mundur beberapa kali.
polaH("lompat-hitung", () => {
  const hasil = [];
  for (const arah of ["maju", "mundur"])
    for (let a = 0; a <= 10; a += 1)
      for (let k = 2; k <= 4; k += 1) {
        const akhir = arah === "maju" ? a + k : a - k;
        if (akhir < 0 || akhir > 10) continue;
        const g = giliran();
        hasil.push({
          kunci: `${arah}-${a}-${k}`,
          prompt: `${g.nama} mulai dari bilangan ${a}, lalu menghitung ${arah} satu per satu sebanyak ${k} kali. ${g.nama} berhenti di bilangan...`,
          benar: akhir,
          lain: pengalihAngka(akhir, g.c),
          explanation: `Dari ${a} menghitung ${arah} ${k} kali sampai di ${akhir}.`,
        });
      }
  return hasil;
});

// H15: kartu kata, lalu bilangan yang lebih besar atau lebih kecil.
polaH("kartu-kata", () => {
  const hasil = [];
  for (let n = 0; n <= 10; n += 1)
    for (const k of [1, 2])
      for (const besar of [true, false]) {
        const akhir = besar ? n + k : n - k;
        if (akhir < 0 || akhir > 10) continue;
        const g = giliran();
        hasil.push({
          kunci: `${n}-${k}-${besar}`,
          prompt: `${g.nama} memilih kartu "${KATA[n]}". ${g.teman} memilih kartu yang ${KATA[k]} ${besar ? "lebih besar" : "lebih kecil"}. Kartu ${g.teman} adalah...`,
          benar: akhir,
          lain: pengalihAngka(akhir, g.c),
          explanation: `${KATA[n]} sama dengan ${n}. ${k} ${besar ? "lebih besar" : "lebih kecil"} menjadi ${akhir}.`,
        });
      }
  return hasil;
});

/** Pilih calon dengan kunci parameter berbeda dulu, baru boleh mengulang kunci. */
function pilihCalon(calon, jumlah, seed, terpakai) {
  const acak = kocok(calon, seed);
  const dipilih = [];
  const kunciPakai = new Set();
  for (const lewat of [1, 2]) {
    for (const item of acak) {
      if (dipilih.length >= jumlah) break;
      if (terpakai.has(item.prompt) || dipilih.includes(item)) continue;
      if (lewat === 1 && kunciPakai.has(item.kunci)) continue;
      kunciPakai.add(item.kunci);
      terpakai.add(item.prompt);
      dipilih.push(item);
    }
  }
  if (dipilih.length < jumlah) throw new Error("calon soal tidak cukup");
  return dipilih;
}

const terpakai = new Set();
const latihan = [];
const ujian = [];
let benih = 100;
function simpan(daftar, level, item) {
  benih += 1;
  const dasar = opsiDari(item.benar, item.lain, benih);
  // Posisi kunci dibuat merata (25 persen tiap posisi) dengan menukar kunci ke posisi giliran.
  const options = [...dasar.options];
  const correctIndex = daftar.length % 4;
  [options[correctIndex], options[dasar.correctIndex]] = [options[dasar.correctIndex], options[correctIndex]];
  if (!item.prompt || !item.explanation) throw new Error("naskah kosong");
  daftar.push({
    level,
    pola: item.pola,
    prompt: item.prompt,
    options,
    correctIndex,
    explanation: item.explanation,
    visual: item.visual ?? [],
    visual2: item.visual2 ?? [],
  });
}
function tambahUnik(daftar, level, pola, item) {
  if (terpakai.has(item.prompt)) throw new Error(`prompt ganda: ${item.prompt}`);
  terpakai.add(item.prompt);
  simpan(daftar, level, { ...item, pola });
}

// ---------- LOTS (30) ----------
// A: hitung gambar 1 sampai 10.
for (let n = 1; n <= 10; n += 1) {
  const g = giliran();
  tambahUnik(latihan, "LOTS", "hitung-gambar", {
    prompt: `${g.nama} mengetuk ${g.kata} satu per satu. Berapa banyak ${g.kata} pada gambar?`,
    benar: n,
    lain: pengalihAngka(n, 100 + n),
    visual: ulang(g.emoji, n),
    explanation: `${g.nama} mengetuk tiap ${g.kata} sekali. Banyaknya ${n}.`,
  });
}
// B: kartu kata ke angka.
for (const n of [0, 2, 4, 7, 9]) {
  const g = giliran();
  tambahUnik(latihan, "LOTS", "kata-ke-angka", {
    prompt: `${g.nama} memilih kartu "${KATA[n]}". Angka yang sesuai adalah...`,
    benar: n,
    lain: pengalihAngka(n, 200 + n),
    explanation: `${KATA[n]} ditulis dengan angka ${n}.`,
  });
}
// C: angka ke kata.
for (const n of [1, 3, 5, 6, 8]) {
  const salah = kocok(KATA.filter((k) => k !== KATA[n]), 300 + n).slice(0, 3);
  tambahUnik(latihan, "LOTS", "angka-ke-kata", {
    prompt: `Angka ${n} dibaca...`,
    benar: KATA[n],
    lain: salah,
    explanation: `Lambang ${n} dibaca ${KATA[n]}.`,
  });
}
// D: nol.
for (const [i, bentuk] of [
  (g) => `Keranjang ${g.nama} kosong, tidak ada ${g.kata} sama sekali. Banyak ${g.kata} itu dilambangkan dengan angka...`,
  (g) => `Piring ${g.nama} tidak berisi ${g.kata} sama sekali. Banyak ${g.kata} di piring adalah...`,
  (g) => `Semua ${g.kata} milik ${g.nama} sudah diberikan, tidak ada yang tersisa. Banyak ${g.kata} ${g.nama} sekarang adalah...`,
].entries()) {
  const g = giliran();
  tambahUnik(latihan, "LOTS", "nol", {
    prompt: bentuk(g),
    benar: 0,
    lain: pengalihAngka(0, 400 + i),
    visual: i === 0 ? ["🧺"] : i === 1 ? ["🍽️"] : [],
    explanation: `Tidak ada ${g.kata} sama sekali, jadi banyaknya 0.`,
  });
}
// E: gambar mana lebih banyak.
for (const [a, b] of [[3, 6], [8, 5], [4, 4], [7, 2], [5, 9], [6, 6], [10, 7]]) {
  const g = giliran();
  const jawab = a > b ? "Gambar pertama" : a < b ? "Gambar kedua" : "Sama banyak";
  tambahUnik(latihan, "LOTS", "gambar-banyak", {
    prompt: `${g.nama} melihat dua gambar ${g.kata}. Gambar mana yang lebih banyak?`,
    benar: jawab,
    lain: ["Gambar pertama", "Gambar kedua", "Sama banyak", "Tidak ada"].filter((x) => x !== jawab).slice(0, 3),
    visual: ulang(g.emoji, a),
    visual2: ulang(g.emoji, b),
    explanation: a === b ? `Kedua gambar berisi ${a}, jadi sama banyak.` : `${Math.max(a, b)} lebih besar dari ${Math.min(a, b)}, jadi ${jawab.toLowerCase()} lebih banyak.`,
  });
}

// ---------- MOTS (30) ----------
// F: tanda perbandingan.
const pasangTanda = [[2, 5], [8, 3], [4, 4], [0, 6], [9, 7], [5, 5], [1, 10], [10, 6], [3, 7], [6, 6]];
for (const [a, b] of pasangTanda) {
  const g = giliran();
  const tanda = a < b ? "<" : a > b ? ">" : "=";
  tambahUnik(latihan, "MOTS", "tanda-banding", {
    prompt: `${g.nama} membandingkan ${a} dengan ${b}. Tanda yang tepat untuk ${a} ○ ${b} adalah...`,
    benar: tanda,
    lain: ["<", ">", "=", "+"].filter((x) => x !== tanda),
    explanation: a === b ? `${a} sama dengan ${b}, jadi tandanya =.` : `${a} lebih ${a < b ? "kecil" : "besar"} dari ${b}, jadi tandanya ${tanda}.`,
  });
}
// G: sesudah dan sebelum.
for (const [arah, n] of [["sesudah", 2], ["sesudah", 6], ["sesudah", 9], ["sebelum", 4], ["sebelum", 8], ["sebelum", 10]]) {
  const g = giliran();
  const benar = arah === "sesudah" ? n + 1 : n - 1;
  tambahUnik(latihan, "MOTS", "sesudah-sebelum", {
    prompt: `${g.nama} menyebut bilangan ${arah} ${n}. Bilangan itu adalah...`,
    benar,
    lain: pengalihAngka(benar, 500 + n),
    explanation: `Bilangan ${arah} ${n} adalah ${benar}.`,
  });
}
// H: deret hilang.
for (const [arah, deret, benar] of [
  ["maju", "3, 4, ..., 6", 5],
  ["maju", "5, 6, ..., 8", 7],
  ["maju", "0, 1, ..., 3", 2],
  ["mundur", "8, 7, ..., 5", 6],
  ["mundur", "6, 5, ..., 3", 4],
  ["mundur", "10, 9, ..., 7", 8],
]) {
  const g = giliran();
  tambahUnik(latihan, "MOTS", "deret-hilang", {
    prompt: `${g.nama} menghitung ${arah}: ${deret}. Bilangan yang hilang adalah...`,
    benar,
    lain: pengalihAngka(benar, 600 + benar),
    explanation: `Menghitung ${arah} satu per satu. Bilangan yang hilang adalah ${benar}.`,
  });
}
// I: memisahkan bilangan menjadi dua bagian.
for (const [t, a] of [[4, 1], [5, 2], [6, 4], [7, 3], [8, 5], [9, 6], [10, 7], [10, 4]]) {
  const g = giliran();
  tambahUnik(latihan, "MOTS", "pisah-bilangan", {
    prompt: `${g.nama} memisahkan bilangan ${t} menjadi dua bagian. Satu bagian adalah ${a}. Bagian yang lain adalah...`,
    benar: t - a,
    lain: pengalihAngka(t - a, 700 + t),
    explanation: `${a} dan ${t - a} menjadi ${t}, jadi bagian yang lain ${t - a}.`,
  });
}

// ---------- HOTS: 15 pola. Latihan 40, Ujian 100 ----------
const jumlahLatihan = POLA_HOTS.map((_, i) => (i < 10 ? 3 : 2));
const jumlahUjian = POLA_HOTS.map((_, i) => (i < 10 ? 7 : 6));
for (const [i, pola] of POLA_HOTS.entries()) {
  const semua = pilihCalon(pola.calon, jumlahLatihan[i] + jumlahUjian[i], 900 + i, terpakai);
  semua.slice(0, jumlahLatihan[i]).forEach((item) => simpan(latihan, "HOTS", { ...item, pola: pola.nama }));
  semua.slice(jumlahLatihan[i]).forEach((item) => simpan(ujian, "HOTS", { ...item, pola: pola.nama }));
}

if (latihan.length !== 100) throw new Error(`latihan ${latihan.length}, harus 100`);
if (ujian.length !== 100) throw new Error(`ujian ${ujian.length}, harus 100`);

const hitungLevel = (daftar, level) => daftar.filter((soal) => soal.level === level).length;
if (hitungLevel(latihan, "LOTS") !== 30) throw new Error(`LOTS latihan ${hitungLevel(latihan, "LOTS")}, harus 30`);
if (hitungLevel(latihan, "MOTS") !== 30) throw new Error(`MOTS latihan ${hitungLevel(latihan, "MOTS")}, harus 30`);
if (hitungLevel(latihan, "HOTS") !== 40) throw new Error("HOTS latihan bukan 40");
if (ujian.some((soal) => soal.level !== "HOTS")) throw new Error("ujian bukan seluruhnya HOTS");

// Urutan di bank dikocok supaya id tidak berurutan menurut pola.
const latihanAcak = [
  ...kocok(latihan.filter((s) => s.level === "LOTS"), 11),
  ...kocok(latihan.filter((s) => s.level === "MOTS"), 12),
  ...kocok(latihan.filter((s) => s.level === "HOTS"), 13),
];
const ujianAcak = kocok(ujian, 14);

function sebarIndeks(daftar, label) {
  const n = [0, 0, 0, 0];
  for (const soal of daftar) n[soal.correctIndex] += 1;
  const min = Math.min(...n);
  const max = Math.max(...n);
  if (min < daftar.length * 0.15 || max > daftar.length * 0.4) {
    throw new Error(`${label}: posisi kunci menumpuk ${n.join(",")}`);
  }
}
sebarIndeks(latihanAcak, "latihan");
sebarIndeks(ujianAcak, "ujian");

function sqlTeks(nilai) {
  return `'${String(nilai).replaceAll("'", "''")}'`;
}

function sqlJson(nilai) {
  return `${sqlTeks(JSON.stringify(nilai))}::jsonb`;
}

const barisLatihan = latihanAcak
  .map((soal, indeks) => {
    const id = `L${String(indeks + 1).padStart(3, "0")}`;
    return `  ('k1-mat-bab1', ${sqlTeks(id)}, ${soal.correctIndex}, ${sqlTeks(soal.explanation)}, ${sqlTeks(soal.prompt)}, ${sqlJson(soal.options)}, ${sqlTeks(soal.level)}, ${sqlJson(soal.visual)}, ${sqlJson(soal.visual2)})`;
  })
  .join(",\n");

const barisUjian = ujianAcak
  .map((soal, indeks) => {
    const id = `U${String(indeks + 1).padStart(3, "0")}`;
    return `  ('k1-mat-bab1', 'acak', ${sqlTeks(id)}, ${sqlTeks(soal.prompt)}, ${sqlJson(soal.options)}, ${soal.correctIndex}, 'HOTS')`;
  })
  .join(",\n");

const idLatihan = latihanAcak.map((_, indeks) => sqlTeks(`L${String(indeks + 1).padStart(3, "0")}`)).join(", ");
const idUjian = ujianAcak
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
const polaLatihan = new Set(latihanAcak.map((s) => s.pola)).size;
const polaUjian = new Set(ujianAcak.map((s) => s.pola)).size;
console.log(`latihan ${latihanAcak.length} (LOTS 30, MOTS 30, HOTS 40), ${polaLatihan} pola`);
console.log(`ujian ${ujianAcak.length} HOTS, ${polaUjian} pola`);
console.log(`seed ${tujuan}`);
