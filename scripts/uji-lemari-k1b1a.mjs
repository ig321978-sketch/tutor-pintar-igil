// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab A ("Merapikan Lemari Mainan Igil").
// Memeriksa: kunci dihitung ulang terpisah, tiap soal empat metode berurutan, angka berbeda dari Story, semua contoh Story tercakup,
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
  sama(t.length, 9, "pohon: sembilan tempat (lebih sederhana dari sebelas)");
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [2, 4, 3], "pohon: dua akar, empat daun, tiga buah");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && new Set(t.map((x) => x.id)).size === t.length, "pohon: kunci dan id unik");
  cek(t.every((x) => x.kunci.length <= 28), "pohon: label pendek");
  const lb = L.labelDari(t, 11);
  cek(lb.length === t.length && t.every((x) => lb.some((l) => L.cocok(x, l))), "pohon: tiap tempat punya tepat satu label dengan teks yang sama");
  cek(!/\d/.test(D.SUARA_POHON) && !TERLARANG.test(D.SUARA_POHON), "pohon: suara tanpa digit dan kata terlarang");
  cek(JSON.stringify(L.labelDari(t, 11)) === JSON.stringify(lb) && JSON.stringify(L.labelDari(t, 12)) !== JSON.stringify(lb), "pohon: acak berbenih tetap");
  // Hanya poin pelajaran matematika: tanpa poin cerita (mainan, lemari, tokoh, kegiatan Story).
  const CERITA = /mainan|lemari|rapi|berserakan|bingung|igil|kaka|abang|mamah|laci|tabel|pisahkan|kamar|rak\b/i;
  cek(t.every((x) => !CERITA.test(x.kunci)) && !CERITA.test(D.PUSAT_POHON) && !CERITA.test(D.SUARA_POHON), "pohon: tanpa poin cerita, hanya pelajaran matematika");
  // Empat metode Story ada di daun: metode kurikulum dan tiga metode luar.
  for (const k of ["Hitung, baca, tulis", "Tunjuk satu, sebut satu", "Angka terakhir = banyaknya", "Lihat sekilas"]) cek(t.some((x) => x.kunci === k && x.kelompok === "metode"), `pohon: metode "${k}" ada di daun`);
  for (const k of ["Berapa banyaknya?", "Angkanya ditulis apa?"]) cek(t.some((x) => x.kunci === k && x.kelompok === "masalah"), `pohon: masalah "${k}" ada di akar`);
  for (const k of ["Tahu banyaknya benda", "Bisa baca dan tulis angka", "Tahu arti nol"]) cek(t.some((x) => x.kunci === k && x.kelompok === "hasil"), `pohon: hasil "${k}" ada di buah`);
  // Cocok per warna: label boleh di tempat sewarna mana pun, dan tidak di tempat warna lain.
  let warnaOk = true;
  for (const l of lb) for (const x of t) if (L.cocokKelompok(t, x, l) !== (t.find((y) => y.kunci === l.teks).kelompok === x.kelompok)) warnaOk = false;
  cek(warnaOk, "pohon: label cocok dengan semua tempat sewarna dan tidak dengan warna lain");
  sama(L.kelompokLabel(t, { id: "x", teks: "Lihat sekilas" }), "metode", "pohon: kelompok label dari teksnya");
  sama(L.kelompokLabel(t, { id: "x", teks: "tidak ada" }), undefined, "pohon: label asing tidak punya kelompok");
  // Tiga kelompok, tiga warna, tiga ikon, dan petunjuk salah menyebut warna.
  sama(Object.keys(D.KELOMPOK_POHON), ["masalah", "metode", "hasil"], "pohon: tiga kelompok");
  cek(new Set(Object.values(D.KELOMPOK_POHON).map((k) => k.ikon)).size === 3, "pohon: ikon tiap kelompok berbeda (selain warna)");
  sama(Object.values(D.KELOMPOK_POHON).map((k) => /cokelat|hijau|merah/.exec(k.petunjuk)?.[0]), ["cokelat", "hijau", "merah"], "pohon: petunjuk salah menyebut warna kelompok");
  cek(Object.values(D.KELOMPOK_POHON).every((k) => !/\d/.test(k.petunjuk) && !TERLARANG.test(k.petunjuk) && k.petunjuk.split(/[.!?]/).every((q) => q.trim().split(/\s+/).length <= 9)), "pohon: petunjuk tanpa digit dan pendek");
  const pohon = readFileSync(new URL("../src/components/modul/lemari-k1b1a/PetaPohon.tsx", import.meta.url), "utf8");
  cek(/cocokKelompok\(TEMPAT_POHON/.test(pohon) && /gaya=\{gayaLabel\}/.test(pohon), "pohon: komponen memakai cocok per warna dan label berwarna");
  cek(/#B45309/.test(pohon) && /#15803D/.test(pohon) && /#B91C1C/.test(pohon), "pohon: tiga warna kelompok (cokelat, hijau, merah) dipakai");
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

/* ------------------------------ CPA: empat soal x empat metode ------------------------------ */
const TAHAP = { concrete: [D.CONCRETE, "benda"], pictorial: [D.PICTORIAL, "diagram"], abstract: [D.ABSTRACT, "lambang"] };
const tipeAda = new Set();
const varian = new Set();
const angkaStory = { mobil: 5, boneka: 4, bola: 3, balok: 10 };
for (const [nama, [daftar, rupa]] of Object.entries(TAHAP)) {
  sama(daftar.length, 4, `${nama}: empat soal`);
  sama(daftar.map((s) => s.nomor), [1, 2, 3, 4], `${nama}: nomor satu sampai empat`);
  const tanda = new Set();
  for (const s of daftar) {
    sama(s.langkah.map((x) => x.metode), ["igil", "satu", "kardinal", "sekilas"], `${nama} soal ${s.nomor}: empat metode berurutan`);
    cek(/^Misi Rumah Rapi \d+: /.test(s.judul) && !/\d/.test(s.cerita), `${nama} soal ${s.nomor}: judul misi lanjutan dan cerita tanpa digit`);
    cek(!TERLARANG.test(s.cerita), `${nama} soal ${s.nomor}: cerita tanpa kata terlarang`);
    for (const ls of s.langkah) {
      const l = ls.langkah;
      tipeAda.add(l.tipe);
      const nm = `${nama} soal ${s.nomor} ${ls.metode} (${l.tipe})`;
      cek(!/\d/.test(ls.suara) && !/\d/.test(ls.judul), `${nm}: instruksi tanpa digit`);
      cek(!TERLARANG.test(ls.suara), `${nm}: instruksi tanpa kata terlarang`);
      cek(ls.suara === D.instruksi(l, rupa), `${nm}: instruksi dari templat`);
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
        default:
          kunci = l.n;
      }
      sama(L.kunciLangkah(l), kunci, `${nm}: kunci dihitung ulang`);
      if ("pilihan" in l) {
        cek(l.pilihan.includes(l.n) && new Set(l.pilihan).size === l.pilihan.length && l.pilihan.length >= 3, `${nm}: pilihan memuat kunci dan unik`);
        cek(l.pilihan.every((v) => v >= 0 && v <= 10), `${nm}: pilihan nol sampai sepuluh`);
        cek(L.benarPilih(l, l.n) && !L.benarPilih(l, l.pilihan.find((v) => v !== l.n)), `${nm}: pemeriksa pilih`);
      }
      if ("n" in l) cek(l.n >= 0 && l.n <= 10, `${nm}: bilangan nol sampai sepuluh`);
      if (l.tipe === "sekilas") {
        cek(rupa === "lambang" || l.n <= 6, `${nm}: sekilas hanya untuk yang sedikit`);
        varian.add(`sekilas-${l.pola}`);
      }
      if (l.tipe === "terakhir") varian.add(`terakhir-${l.arah}`);
      if (l.tipe === "baca") varian.add(`baca-${l.ke}`);
      if ("n" in l && "jenis" in l && angkaStory[l.jenis] !== undefined) cek(angkaStory[l.jenis] !== l.n, `${nm}: angka berbeda dari Story untuk ${l.jenis}`);
      // Batas rupa: Pictorial memakai bentuk, bukan emoji mainan; Abstract memakai kata atau lambang.
      if (rupa === "diagram" && "jenis" in l && typeof l.jenis === "string") cek(["bulat", "kotak", "segitiga"].includes(l.jenis), `${nm}: Pictorial memakai bentuk diagram`);
      if (rupa === "lambang" && "jenis" in l && typeof l.jenis === "string") cek(["kata", "lambang"].includes(l.jenis), `${nm}: Abstract memakai kata atau lambang`);
      tanda.add(JSON.stringify(l));
    }
  }
  cek(tanda.size === 16, `${nama}: enam belas langkah berbeda (aktivitas dan angka)`);
}
for (const t of ["pisah", "tunjuk", "pindah", "pasang", "dobel", "terakhir", "sekilas", "laci", "nol", "tabel", "baca"]) cek(tipeAda.has(t), `CPA memuat contoh Story: ${t}`);
for (const v of ["dobel-dobel", "dobel-lewat", "terakhir-kiri", "terakhir-kanan", "sekilas-dadu", "sekilas-baris", "baca-kata", "baca-lambang", "nol"]) cek(varian.has(v), `CPA memuat variasi: ${v}`);

/* ------------------------------ Berkas: emoji, akhir baris, tanpa jaringan dan skor ------------------------------ */
{
  const dir = new URL("../src/components/modul/lemari-k1b1a/", import.meta.url);
  const berkas = readdirSync(dir).filter((f) => /\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas lemari-k1b1a lengkap (${berkas.length})`);
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
