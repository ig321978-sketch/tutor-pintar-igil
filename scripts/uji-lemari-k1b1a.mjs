// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab A ("Merapikan Lemari Mainan Igil").
// Memeriksa: kunci dihitung ulang terpisah, CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode), angka berbeda dari Story
// dan tidak kembar dalam satu tahap, semua contoh Story tercakup, pemeriksa kanvas (tulis, lingkari, tanda, titik, garis) dan ucapan,
// instruksi tanpa digit dan tanpa kata terlarang, pilihan memuat kunci dan unik, emoji paling tinggi U+1FA95, misi simulasi.
// Jalankan: node --no-warnings scripts/uji-lemari-k1b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const D = await import("../src/components/modul/lemari-k1b1a/data.ts");
const M = await import("../src/components/modul/misi-bab1.ts");

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|tambah|kurang|jumlah|skor|nilai)\b/i;

/* ------------------------------ Mind-map pohon ------------------------------ */
{
  const t = D.TEMPAT_POHON;
  sama(t.length, 12, "pohon: dua belas tempat (panduan pemilik + dua metode luar di daun)");
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 6, 3], "pohon: tiga akar, enam daun, tiga buah");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && new Set(t.map((x) => x.id)).size === t.length, "pohon: kunci dan id unik");
  cek(t.every((x) => x.kunci.length <= 28), "pohon: label pendek");
  const lb = L.labelDari(t, 11);
  cek(lb.length === t.length && t.every((x) => lb.some((l) => L.cocok(x, l))), "pohon: tiap tempat punya tepat satu label dengan teks yang sama");
  cek(!/\d/.test(D.SUARA_POHON) && !TERLARANG.test(D.SUARA_POHON), "pohon: suara tanpa digit dan kata terlarang");
  cek(JSON.stringify(L.labelDari(t, 11)) === JSON.stringify(lb) && JSON.stringify(L.labelDari(t, 12)) !== JSON.stringify(lb), "pohon: acak berbenih tetap");
  // Hanya poin pelajaran matematika: tanpa poin cerita (mainan, lemari, tokoh, kegiatan Story).
  const CERITA = /mainan|lemari|rapi|berserakan|bingung|igil|kaka|abang|mamah|laci|tabel|kamar|rak\b/i;
  cek(t.every((x) => !CERITA.test(x.kunci)) && !CERITA.test(D.PUSAT_POHON) && !CERITA.test(D.SUARA_POHON), "pohon: tanpa poin cerita, hanya pelajaran matematika");
  // Panduan pemilik, persis: A Masalah, B Penyelesaian, C Hasil.
  sama(t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci), ["Berapa jumlahnya?", "Bagaimana menulisnya?", "Bagaimana membacanya?"], "pohon A. Masalah");
  // B. Penyelesaian: enam langkah BERURUTAN bernomor 1 sampai 6. Empat langkah panduan pemilik tetap berurutan relatif; Cardinality dan Subitizing masuk di fase menghitung.
  const metode = t.filter((x) => x.kelompok === "metode");
  sama(metode.map((x) => x.urutan), [1, 2, 3, 4, 5, 6], "pohon B. Penyelesaian: langkah bernomor 1 sampai 6 tanpa lompat");
  sama(metode.map((x) => x.kunci), ["Kelompokkan", "Hitung satu-satu", "Angka terakhir = banyaknya", "Lihat sekilas", "Tuliskan", "Kosong = nol"], "pohon B. Penyelesaian: urutan langkah");
  const urutPemilik = ["Kelompokkan", "Hitung satu-satu", "Tuliskan", "Kosong = nol"].map((k) => metode.find((x) => x.kunci === k).urutan);
  cek(urutPemilik.every((n, i, a) => i === 0 || n > a[i - 1]), "pohon B. Penyelesaian: urutan panduan pemilik (Kelompokkan, Hitung satu-satu, Tuliskan, Kosong = nol) tetap terjaga");
  cek(["masalah", "hasil"].every((g) => t.filter((x) => x.kelompok === g).every((x) => x.urutan === undefined)), "pohon: akar dan buah tanpa nomor (tidak berurutan)");
  // Cocok pada langkah berurutan: hanya label dan nomornya sendiri; warna sama tetapi nomor lain ditolak.
  let urutOk = true;
  for (const x of metode) for (const l of lb) if (L.cocokKelompok(t, x, l) !== (l.teks === x.kunci)) urutOk = false;
  cek(urutOk, "pohon: langkah bernomor hanya cocok dengan labelnya sendiri");
  cek(!L.cocokKelompok(t, metode[0], { id: "x", teks: "Hitung satu-satu" }) && L.cocokKelompok(t, metode[1], { id: "x", teks: "Hitung satu-satu" }), "pohon: Hitung satu-satu ditolak di nomor 1 dan diterima di nomor 2");
  cek(!/\d/.test(D.PETUNJUK_URUTAN) && D.PETUNJUK_URUTAN.split(/[.!?]/).every((q) => q.trim().split(/\s+/).length <= 9) && /urutan/i.test(D.PETUNJUK_URUTAN), "pohon: petunjuk salah nomor mengingatkan urutan, tanpa digit, kalimat pendek");
  cek(/berurutan/i.test(D.SUARA_POHON) && /nomor/i.test(D.SUARA_POHON), "pohon: suara pembuka menyebut langkah berurutan dan nomor");
  sama(t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci), ["Bisa menghitung", "Bisa menulis", "Bisa membaca"], "pohon C. Hasil");
  sama(Object.values(D.KELOMPOK_POHON).map((k) => k.nama), ["Masalah", "Penyelesaian", "Hasil"], "pohon: nama kelompok A, B, C");
  // Cocok per warna: label boleh di tempat sewarna mana pun, dan tidak di tempat warna lain.
  let warnaOk = true;
  for (const l of lb) for (const x of t.filter((y) => y.urutan === undefined)) if (L.cocokKelompok(t, x, l) !== (t.find((y) => y.kunci === l.teks).kelompok === x.kelompok)) warnaOk = false;
  cek(warnaOk, "pohon: pada akar dan buah, label cocok dengan semua tempat sewarna dan tidak dengan warna lain");
  sama(L.kelompokLabel(t, { id: "x", teks: "Tuliskan" }), "metode", "pohon: kelompok label dari teksnya");
  sama(L.kelompokLabel(t, { id: "x", teks: "tidak ada" }), undefined, "pohon: label asing tidak punya kelompok");
  // Tiga kelompok, tiga warna, tiga ikon, dan petunjuk salah menyebut warna.
  sama(Object.keys(D.KELOMPOK_POHON), ["masalah", "metode", "hasil"], "pohon: tiga kelompok");
  cek(new Set(Object.values(D.KELOMPOK_POHON).map((k) => k.ikon)).size === 3, "pohon: ikon tiap kelompok berbeda (selain warna)");
  sama(Object.values(D.KELOMPOK_POHON).map((k) => [k.warna, new RegExp(k.warna).test(k.petunjuk)]), [["cokelat", true], ["hijau", true], ["merah", true]], "pohon: petunjuk salah menyebut warna kelompok");
  cek(Object.values(D.KELOMPOK_POHON).every((k) => !/\d/.test(k.petunjuk) && !TERLARANG.test(k.petunjuk) && k.petunjuk.split(/[.!?]/).every((q) => q.trim().split(/\s+/).length <= 9)), "pohon: petunjuk tanpa digit dan pendek");
  const pohon = readFileSync(new URL("../src/components/modul/lemari-k1b1a/PetaPohon.tsx", import.meta.url), "utf8");
  cek(/cocokKelompok\(TEMPAT_POHON/.test(pohon) && /gaya=\{gayaLabel\}/.test(pohon), "pohon: komponen memakai cocok per warna dan label berwarna");
  cek(/#B45309/.test(pohon) && /#15803D/.test(pohon) && /#B91C1C/.test(pohon), "pohon: tiga warna kelompok (cokelat, hijau, merah) dipakai");
  cek(t.every((x) => new RegExp(`"${x.id}":`).test(pohon)), "pohon: tiap tempat punya letak di gambar");
}

/* ------------------------------ Infografis rak (data dan angka Story) ------------------------------ */
{
  const STORY = { mobil: 5, boneka: 4, bola: 3, balok: 10, kereta: 0 };
  sama(Object.fromEntries(D.BARIS_RAK.map((b) => [b.jenis, b.n])), STORY, "rak: angka sama dengan Story");
  sama(D.TEMPAT_RAK.length, 15, "rak: lima baris x tiga stiker");
  D.BARIS_RAK.forEach((b, i) => {
    sama([D.TEMPAT_RAK[i * 3].kunci, D.TEMPAT_RAK[i * 3 + 1].kunci, D.TEMPAT_RAK[i * 3 + 2].kunci], [b.cara, String(b.n), L.KATA[b.n]], `rak baris ${b.jenis}`);
  });
  cek(new Set(D.TEMPAT_RAK.map((x) => x.kunci)).size === 15, "rak: kunci unik (tidak ada label tertukar yang sama-sama benar)");
  cek(!/\d/.test(D.SUARA_RAK), "rak: suara tanpa digit");
}

/* ------------------------------ Simulasi kamar Kaka dan misi ------------------------------ */
{
  const STORY_N = new Set([5, 4, 3, 10]);
  cek(D.RAK_KAMAR.every((r) => r.banyak === 0 || !STORY_N.has(r.banyak)), "simulasi: banyak berbeda dari Story (kecuali nol)");
  cek(D.RAK_KAMAR.some((r) => r.banyak === 0) && D.RAK_KAMAR.some((r) => r.laci && r.banyak <= 10), "simulasi: ada kotak kosong dan laci sepuluh kotak");
  const mainan = D.RAK_KAMAR.flatMap((r) => Array.from({ length: r.banyak }, (_, i) => ({ id: `${r.jenis}-${i}`, jenis: r.jenis, tempat: "lantai" })));
  const awal = { alat: "kamar", mainan, catat: Object.fromEntries(D.RAK_KAMAR.map((r) => [r.jenis, null])), dihitung: [], sekilas: [] };
  const daftar = M.daftarMisiBab1("A");
  const kosong = new Set();
  const baru = (k) => M.misiBaru ? M.misiBaru(daftar, k, kosong) : daftar.filter((d) => d.cek(k)).map((d) => d.id);
  const capai = (k) => daftar.filter((d) => d.cek(k)).map((d) => d.id);
  sama(capai(awal), [], "simulasi: awal belum ada misi");
  let k = awal;
  for (const m of mainan) k = L.pindahMainan(k, m.id, m.jenis, { kelereng: 10 });
  cek(L.semuaDiRak(k) && capai(k).includes("a-rak") && capai(k).includes("a-laci"), "simulasi: semua di rak memenuhi a-rak dan a-laci");
  cek(!capai(k).includes("a-robot") && !capai(k).includes("a-catat"), "simulasi: belum dihitung dan dicatat");
  k = { ...k, dihitung: ["robot", "pesawat"], sekilas: ["yoyo"] };
  cek(["a-robot", "a-kosong", "a-sekilas"].every((id) => capai(k).includes(id)), "simulasi: hitung robot, hitung pesawat, sekilas yoyo");
  const salahCatat = { ...k, catat: { robot: 6, yoyo: 2, kelereng: 8, pesawat: 1 } };
  cek(!capai(salahCatat).includes("a-catat"), "simulasi: catatan pesawat satu belum benar");
  const benarCatat = { ...k, catat: { robot: 6, yoyo: 2, kelereng: 8, pesawat: 0 } };
  cek(capai(benarCatat).includes("a-catat") && L.catatanBenar(benarCatat, D.RAK_KAMAR.map((r) => r.jenis)), "simulasi: catatan benar termasuk pesawat nol");
  sama(daftar.filter((d) => d.wajib).map((d) => d.id), ["a-rak", "a-robot", "a-laci", "a-catat"], "simulasi: empat misi wajib");
  // Laci menolak isi ke-11 dan rak salah tidak dipakai pindahMainan bila tempat sama.
  let z = { ...awal, mainan: Array.from({ length: 11 }, (_, i) => ({ id: `k${i}`, jenis: "kelereng", tempat: "lantai" })) };
  for (let i = 0; i < 11; i += 1) z = L.pindahMainan(z, `k${i}`, "kelereng", { kelereng: 10 });
  sama(L.diRak(z, "kelereng"), 10, "simulasi: laci sepuluh kotak paling banyak sepuluh");
  cek(typeof baru === "function", "simulasi: misiBaru tersedia");
  cek(daftar.every((d) => !TERLARANG.test(d.teks)), "simulasi: teks misi tanpa kata terlarang");
}

/* ------------------------------ CPA: tiga cara x empat metode = dua belas soal per tahap ------------------------------ */
const J = await import("../src/components/modul/lemari-k1b1a/periksa-jawab.ts");
const TAHAP = { concrete: [D.CONCRETE, "benda"], pictorial: [D.PICTORIAL, "diagram"], abstract: [D.ABSTRACT, "lambang"] };
const tipeAda = new Set();
const varian = new Set();
const angkaStory = { mobil: 5, boneka: 4, bola: 3, balok: 10 };
const KANVAS_GAMBAR = ["lingkari", "centang", "titik", "hubung"];
let misiKe = 2;
for (const [nama, [daftar, rupa]] of Object.entries(TAHAP)) {
  sama(daftar.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga kelompok cara berurutan (klik, kanvas, suara)`);
  sama(daftar.map((s) => s.langkah.length), [4, 4, 4], `${nama}: tiap kelompok empat soal`);
  sama(daftar.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas soal`);
  sama(daftar.map((s) => s.nomor), [1, 2, 3], `${nama}: nomor kelompok satu sampai tiga`);
  const tanda = new Set();
  const jawabTahap = [];
  const metodeTipe = {};
  for (const s of daftar) {
    sama(s.langkah.map((x) => x.metode), ["igil", "satu", "kardinal", "sekilas"], `${nama} ${s.cara}: empat metode berbeda berurutan`);
    cek(s.langkah.every((x) => x.cara === s.cara), `${nama} ${s.cara}: tiap soal memakai cara kelompoknya`);
    cek(s.judul.startsWith(`Misi Rumah Rapi ${misiKe}: `) && !/\d/.test(s.cerita), `${nama} ${s.cara}: judul Misi Rumah Rapi ${misiKe} dan cerita tanpa digit`);
    misiKe += 1;
    cek(!TERLARANG.test(s.cerita), `${nama} ${s.cara}: cerita tanpa kata terlarang`);
    for (const ls of s.langkah) {
      const l = ls.langkah;
      tipeAda.add(l.tipe);
      (metodeTipe[ls.metode] ??= []).push(`${l.tipe}:${s.cara}`);
      const nm = `${nama} ${s.cara} ${ls.metode} (${l.tipe})`;
      cek(!/\d/.test(ls.suara) && !/\d/.test(ls.judul), `${nm}: instruksi tanpa digit`);
      cek(!TERLARANG.test(ls.suara), `${nm}: instruksi tanpa kata terlarang`);
      cek(ls.suara === D.instruksi(l, rupa, s.cara), `${nm}: instruksi dari templat`);
      cek(ls.suara.split(/[.!?]/).every((q) => q.trim().split(/\s+/).length <= 11), `${nm}: kalimat instruksi pendek`);
      // Kunci dihitung ulang terpisah dari kunciLangkah.
      let kunci;
      switch (l.tipe) {
        case "pisah":
          kunci = l.jenis.length;
          cek(l.jenis.every((j) => l.wadah.includes(j)) && l.wadah.every((w) => l.jenis.includes(w)), `${nm}: tiap benda punya wadah`);
          cek(l.jenis.every((j, i) => L.benarPisah(l, i, l.wadah.indexOf(j))) && !L.benarPisah(l, 0, l.wadah.findIndex((w) => w !== l.jenis[0])), `${nm}: pemeriksa pisah`);
          break;
        case "nol":
          kunci = l.kotak.findIndex((k) => k.n === 0);
          sama(l.kotak.filter((k) => k.n === 0).length, 1, `${nm}: tepat satu kotak kosong`);
          varian.add("nol");
          break;
        case "tabel":
          kunci = l.baris.map((b) => b.n);
          cek(l.baris.some((b) => b.n === 0), `${nm}: ada baris nol`);
          cek(L.benarTabel(l, kunci) && !L.benarTabel(l, kunci.map((v) => v + 1)), `${nm}: pemeriksa tabel`);
          break;
        case "dobel": {
          kunci = l.salah;
          const lb = L.labelDobel(l);
          const panjang = lb.map((a) => a.length);
          sama(panjang.filter((x) => x !== 1).length, 1, `${nm}: tepat satu benda salah hitung`);
          sama(panjang[l.salah], l.cara === "dobel" ? 2 : 0, `${nm}: benda salah di tempat kunci`);
          sama(lb.flat(), Array.from({ length: lb.flat().length }, (_, i) => i + 1), `${nm}: angka hitungan berurutan`);
          varian.add(`dobel-${l.cara}`);
          break;
        }
        case "pasang":
          kunci = l.n;
          cek(L.benarPasang(l.n, Array.from({ length: l.n }, (_, i) => l.n - i)) && !L.benarPasang(l.n, Array.from({ length: l.n }, () => 1)), `${nm}: pemeriksa pasang satu-satu`);
          break;
        case "lingkari":
          kunci = l.benda.filter((b) => b === l.target).length;
          cek(l.benda.some((b) => b !== l.target) && kunci >= 2, `${nm}: ada benda lain selain sasaran`);
          break;
        default:
          kunci = l.n;
      }
      sama(L.kunciLangkah(l), kunci, `${nm}: kunci dihitung ulang`);
      const aj = L.angkaJawab(l);
      // Cara menjawab cocok dengan kelompok: suara dan kanvas tulis butuh jawaban angka; kanvas gambar diperiksa dari goresan.
      if (s.cara === "suara") cek(aj !== null && L.pilihanDari(l).includes(aj), `${nm}: jawaban suara berupa angka, cadangan ketuk memuat kunci`);
      if (s.cara === "kanvas") cek(KANVAS_GAMBAR.includes(l.tipe) || aj !== null, `${nm}: kanvas berupa gambar atau tulis angka`);
      if (s.cara === "klik") cek(!KANVAS_GAMBAR.includes(l.tipe), `${nm}: klik tidak memakai kanvas gambar`);
      const angkaUtama = l.tipe === "titik" ? l.n : aj;
      if (angkaUtama !== null) jawabTahap.push(angkaUtama);
      if ("pilihan" in l) {
        cek(l.pilihan.includes(l.n) && new Set(l.pilihan).size === l.pilihan.length && l.pilihan.length >= 3, `${nm}: pilihan memuat kunci dan unik`);
        cek(l.pilihan.every((v) => v >= 0 && v <= 10), `${nm}: pilihan nol sampai sepuluh`);
        cek(L.benarPilih(l, l.n) && !L.benarPilih(l, l.pilihan.find((v) => v !== l.n)), `${nm}: pemeriksa pilih`);
      }
      if ("n" in l) cek(l.n >= 0 && l.n <= 10, `${nm}: bilangan nol sampai sepuluh`);
      if (l.tipe === "sekilas" || l.tipe === "titik") {
        cek(rupa === "lambang" || l.n <= 6, `${nm}: sekilas hanya untuk yang sedikit`);
        varian.add(`sekilas-${l.pola}`);
      }
      if (l.tipe === "terakhir") varian.add(`terakhir-${l.arah}`);
      if (l.tipe === "baca") varian.add(`baca-${l.ke}`);
      const jenisSoal = l.tipe === "lingkari" ? l.target : l.jenis;
      if (typeof jenisSoal === "string" && angkaStory[jenisSoal] !== undefined && angkaUtama !== null) cek(angkaStory[jenisSoal] !== angkaUtama, `${nm}: angka berbeda dari Story untuk ${jenisSoal}`);
      // Batas rupa: Concrete emoji benda; Pictorial bentuk diagram tanpa emoji; Abstract kata atau lambang.
      const semuaJenis = [l.jenis, l.target, ...(l.benda ?? []), ...(Array.isArray(l.jenis) ? l.jenis : []), ...(l.kotak ?? []).map((k) => k.jenis)].filter((x) => typeof x === "string");
      if (rupa === "benda") cek(semuaJenis.every((j) => D.EMOJI[j]), `${nm}: Concrete memakai benda (emoji)`);
      if (rupa === "diagram") cek(semuaJenis.every((j) => ["bulat", "kotak", "segitiga"].includes(j)) && (l.baris ?? []).every((b) => ["bulat", "kotak", "segitiga"].includes(b.jenis)), `${nm}: Pictorial memakai bentuk diagram`);
      if (rupa === "lambang" && typeof l.jenis === "string") cek(["kata", "lambang"].includes(l.jenis), `${nm}: Abstract memakai kata atau lambang`);
      tanda.add(JSON.stringify(l));
    }
  }
  cek(tanda.size === 12, `${nama}: dua belas soal berbeda (aktivitas dan angka)`);
  cek(new Set(jawabTahap).size === jawabTahap.length, `${nama}: angka jawaban tidak kembar (${jawabTahap.join(",")})`);
  // Aktivitas tiap metode tidak seragam di seluruh kelompok: paling tidak dua tipe kegiatan berbeda per metode.
  for (const [m, t] of Object.entries(metodeTipe)) cek(t.length === 3, `${nama} ${m}: muncul sekali di tiap kelompok`);
  cek(Object.values(metodeTipe).filter((t) => new Set(t.map((x) => x.split(":")[0])).size >= 2).length >= 2, `${nama}: aktivitas metode berbeda-beda antar kelompok`);
  cek(daftar[1].langkah.some((x) => KANVAS_GAMBAR.includes(x.langkah.tipe)) && daftar[1].langkah.some((x) => L.angkaJawab(x.langkah) !== null), `${nama}: kanvas memuat menggambar dan menulis angka`);
}
for (const t of ["pisah", "tunjuk", "pindah", "pasang", "dobel", "terakhir", "sekilas", "laci", "nol", "tabel", "baca", "lingkari", "centang", "titik", "hubung"]) cek(tipeAda.has(t), `CPA memuat kegiatan: ${t}`);
for (const v of ["dobel-dobel", "dobel-lewat", "terakhir-kiri", "terakhir-kanan", "sekilas-dadu", "sekilas-baris", "baca-kata", "baca-lambang", "nol"]) cek(varian.has(v), `CPA memuat variasi contoh Story: ${v}`);
sama(misiKe, 11, "CPA: Misi Rumah Rapi dua sampai sepuluh berurutan");

/* ------------------------------ Pemeriksa kanvas ------------------------------ */
{
  // Tulis angka: model tiap lambang (digeser, diperbesar atau diperkecil, miring, goyang, dan arah goresan terbalik) terbaca benar.
  let s = 7;
  const r = () => ((s = (s * 16807) % 2147483647), s / 2147483647);
  let benar = 0;
  let total = 0;
  for (let n = 0; n <= 10; n += 1) {
    sama(J.periksaTulis(J.modelKanvas(n), n), { benar: true, terbaca: n }, `tulis: model ${n} terbaca tepat`);
    for (let v = 0; v < 20; v += 1) {
      const sk = 0.5 + r() * 0.8, sy = 0.85 + r() * 0.3, dx = r() * 80 - 40, dy = r() * 40 - 20, mi = r() * 0.3 - 0.15, j = 2 + r() * 4;
      const g = J.modelKanvas(n).map((gs) => {
        const a = gs.map((t) => ({ x: t.x * sk + dx + t.y * mi + j * Math.sin(t.y / 15 + v), y: t.y * sk * sy + dy + j * Math.cos(t.x / 13 + v) }));
        return v % 2 ? a.reverse() : a;
      });
      total += 1;
      if (J.periksaTulis(g, n).benar) benar += 1;
    }
  }
  cek(benar / total >= 0.95, `tulis: tulisan bervariasi terbaca benar ${benar}/${total} (paling sedikit 95%)`);
  let tolak = true;
  for (let n = 0; n <= 10; n += 1) for (let m = 0; m <= 10; m += 1) if (m !== n && J.periksaTulis(J.modelKanvas(m), n).benar) tolak = false;
  cek(tolak, "tulis: angka lain tidak diterima sebagai kunci");
  sama(J.periksaTulis([[{ x: 10, y: 10 }, { x: 12, y: 11 }]], 1), { benar: false, terbaca: null }, "tulis: coretan sangat kecil belum terbaca");
  sama(J.periksaTulis([], 3).benar, false, "tulis: kanvas kosong salah");

  // Lingkari: satu lingkaran per sasaran atau satu lingkaran besar; benda lain tidak boleh ikut.
  const letak = J.letakBenda(6, 3);
  cek(letak.every((a, i) => letak.every((b, k) => k === i || Math.hypot(a.x - b.x, a.y - b.y) >= 40)), "letak: benda tidak bertumpuk");
  cek(letak.every((t) => t.x > 0 && t.x < J.LEBAR_ADEGAN && t.y > 0 && t.y < J.TINGGI_ADEGAN), "letak: benda di dalam kanvas");
  const cincin = (t, rr = 22) => Array.from({ length: 24 }, (_, i) => ({ x: t.x + rr * Math.cos((i / 24) * 2 * Math.PI), y: t.y + rr * Math.sin((i / 24) * 2 * Math.PI) }));
  const sasaran = [true, false, true, true, false, true];
  cek(J.periksaLingkari(letak.filter((_, i) => sasaran[i]).map((t) => cincin(t)), letak, sasaran).benar, "lingkari: tiap sasaran dilingkari = benar");
  sama(J.periksaLingkari(letak.map((t) => cincin(t)), letak, sasaran), { benar: false, kurang: 0, lebih: 2 }, "lingkari: benda lain ikut = salah (lebih dua)");
  sama(J.periksaLingkari([cincin(letak[0])], letak, sasaran), { benar: false, kurang: 3, lebih: 0 }, "lingkari: baru satu = salah (kurang tiga)");
  const besar = [{ x: -5, y: -5 }, { x: 305, y: -5 }, { x: 305, y: 205 }, { x: -5, y: 205 }];
  cek(J.periksaLingkari([besar], letak, letak.map(() => true)).benar, "lingkari: satu lingkaran besar untuk semua sasaran = benar");
  cek(J.diDalam({ x: 1, y: 1 }, besar) && !J.diDalam({ x: 400, y: 1 }, besar), "lingkari: titik di dalam dan di luar");

  // Tanda satu per satu.
  const titik = (t, dx = 0) => [{ x: t.x + dx, y: t.y }];
  cek(J.periksaCentang(letak.map((t) => titik(t, 3)), letak).benar, "tanda: satu tanda tiap benda = benar");
  sama(J.periksaCentang([...letak.map((t) => titik(t)), titik(letak[2])], letak).dobel, 1, "tanda: dua tanda pada satu benda = dobel");
  sama(J.periksaCentang(letak.slice(1).map((t) => titik(t)), letak).lewat, 1, "tanda: satu benda terlewat");
  cek(!J.periksaCentang([...letak.map((t) => titik(t)), [{ x: 1000, y: 1000 }]], letak).benar, "tanda: tanda di luar benda = salah");

  // Gambar titik: ketukan dihitung, coretan panjang ditolak.
  sama(J.hitungTitik(Array.from({ length: 4 }, (_, i) => [{ x: 30 * i, y: 10 }])), { titik: 4, coretan: 0 }, "titik: empat ketukan = empat titik");
  sama(J.hitungTitik([[{ x: 0, y: 0 }, { x: 100, y: 0 }]]), { titik: 0, coretan: 1 }, "titik: coretan panjang bukan titik");

  // Tarik garis: nama angka ke lambangnya (harus sama) atau benda ke kartu (cukup satu-satu).
  const kiri = [0, 1, 2].map((i) => ({ x: 50, y: 40 + 60 * i }));
  const kanan = [0, 1, 2].map((i) => ({ x: 250, y: 40 + 60 * i }));
  const garis = (a, b) => [a, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, b];
  cek(J.periksaHubung([garis(kiri[0], kanan[2]), garis(kanan[1], kiri[1]), garis(kiri[2], kanan[0])], kiri, kanan, [1, 2, 3], [3, 2, 1], true).benar, "garis: nama ke lambang yang sama (arah bebas) = benar");
  cek(!J.periksaHubung([garis(kiri[0], kanan[0]), garis(kiri[1], kanan[1]), garis(kiri[2], kanan[2])], kiri, kanan, [1, 2, 3], [3, 2, 1], true).benar, "garis: nama ke lambang lain = salah");
  cek(J.periksaHubung([garis(kiri[0], kanan[0]), garis(kiri[1], kanan[1]), garis(kiri[2], kanan[2])], kiri, kanan, [0, 0, 0], [3, 2, 1], false).benar, "garis: benda ke kartu satu-satu = benar");
  cek(!J.periksaHubung([garis(kiri[0], kanan[0]), garis(kiri[1], kanan[0]), garis(kiri[2], kanan[2])], kiri, kanan, [0, 0, 0], [3, 2, 1], false).benar, "garis: dua benda ke satu kartu = salah");
  cek(!J.periksaHubung([garis(kiri[0], kanan[0])], kiri, kanan, [0, 0, 0], [3, 2, 1], false).benar, "garis: belum semua punya garis = salah");
}

/* ------------------------------ Ucapan ------------------------------ */
{
  const kasus = [
    ["lima", [5]], ["Lima.", [5]], ["5", [5]], ["ada tujuh", [7]], ["tuju", [7]], ["se puluh", [10]], ["sepuluh", [10]], ["10", [10]],
    ["nol", [0]], ["kosong", [0]], ["enol", [0]], ["delapan", [8]], ["lapan", [8]], ["sembilang", [9]], ["empat ekor", [4]],
    ["tiga eh empat", [3, 4]], ["dua dua", [2]], ["Enam!", [6]], ["dua belas", [2]], ["12", []], ["halo", []], ["", []],
  ];
  for (const [t, h] of kasus) sama(J.bilanganDariUcapan(t), h, `ucapan "${t}"`);
  for (let n = 0; n <= 10; n += 1) sama(J.bilanganDariUcapan(L.kata(n)), [n], `ucapan nama angka ${n}`);
}

/* ------------------------------ Komponen kanvas dan suara terpasang ------------------------------ */
{
  const baca = (f) => readFileSync(new URL(`../src/components/modul/lemari-k1b1a/${f}`, import.meta.url), "utf8");
  const jawab = baca("Jawab.tsx");
  cek(/import \{ KanvasTulis, TombolPeriksa \} from "\.\.\/opsi2\/primitif"/.test(jawab), "Jawab: memakai ulang KanvasTulis Opsi 2");
  cek(/webkitSpeechRecognition/.test(jawab) && /lang = "id-ID"/.test(jawab) && /maxAlternatives = 5/.test(jawab), "Jawab: Web Speech id-ID dengan lima alternatif");
  cek(/setCadangan\(true\)/.test(jawab) && /Ketuk jawabannya/.test(jawab) && /<Pilihan /.test(jawab), "Jawab: cadangan pilihan ketuk dan pemberitahuan bila tidak bisa mendengar");
  cek(/hentikanSuaraGuruModul\(\)/.test(jawab) && /abort\(\)/.test(jawab), "Jawab: suara guru dihentikan saat mendengar dan mikrofon dilepas");
  cek(/coretanMengikutiJejak/.test(jawab) && /periksaTulis\(/.test(jawab), "Jawab: tulisan diperiksa pengenal, dengan jejak petunjuk setelah dua kali salah");
  const lm = baca("LangkahMetode.tsx");
  cek(/<JawabTulis /.test(lm) && /<JawabSuara\s/.test(lm) && /<KanvasGambar/.test(lm) && /cara === "kanvas"/.test(lm) && /cara === "suara"/.test(lm), "LangkahMetode: tiga cara menjawab terpasang");
  const tl = baca("TahapLemari.tsx");
  cek(/NAMA_CARA/.test(tl) && /Soal \{nomor\} dari \{total\}/.test(tl), "TahapLemari: kelompok cara dan nomor soal dari dua belas");
  for (const f of ["periksa-jawab.ts", "logika.ts", "data.ts"]) cek(!/from "react"/.test(baca(f)), `${f}: tanpa React`);
}

/* ------------------------------ Berkas: emoji, akhir baris, tanpa jaringan dan skor ------------------------------ */
{
  const dir = new URL("../src/components/modul/lemari-k1b1a/", import.meta.url);
  const berkas = readdirSync(dir).filter((f) => /\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 10, `berkas lemari-k1b1a lengkap (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, dir), "utf8");
    const kode = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    const buruk = [...s].filter((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d);
    cek(buruk.length === 0, `${f}: emoji paling tinggi U+1FA95 dan tanpa ZWJ`);
    cek(!s.includes("\r"), `${f}: akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|localStorage|\bskor\b|\bpoinKualifikasi\b/i.test(kode), `${f}: tanpa jaringan, penyimpanan, atau skor`);
  }
  for (const f of ["logika.ts", "data.ts"]) cek(!/from "react"/.test(readFileSync(new URL(f, dir), "utf8")), `${f}: logika dan data tanpa React`);
  const pemutar = readFileSync(new URL("../src/components/IgilModulePlayer.tsx", import.meta.url), "utf8");
  cek(/<PetaPohon/.test(pemutar) && /<RakTabel/.test(pemutar) && (pemutar.match(/<TahapLemari/g) ?? []).length === 3, "pemutar: Pohon, Rak, dan tiga TahapLemari terpasang");
  const sim = readFileSync(new URL("../src/components/modul/SimulasiBab1.tsx", import.meta.url), "utf8");
  cek(/<SimulasiKamarKaka/.test(sim), "simulasi: Kamar Kaka terpasang di Sub-Bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
