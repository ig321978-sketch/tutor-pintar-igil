// Uji statis Matematika Kelas 2 Bab 4, Posisi Benda dan Pola (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k2b4.mjs
// Memeriksa: pemasangan di pemutar, video diputar satu per satu saat diketuk (tanpa putar otomatis), suara perangkat murni
// (laju 0,70 dan nada 1), tanpa jaringan dan tanpa layanan suara berbayar, tanpa soal Latihan/Ujian dan tanpa simulasi,
// batas Concrete dan Picture (benda hanya di Concrete, diagram polos di Picture), dan seluruh komponen permainan terpasang.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b4.ts";

const baca = (p) => fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

const pemutar = baca("src/components/IgilModulePlayer.tsx");
const suaraLib = baca("src/lib/suara-guru-modul.ts");
const mesinVideo = baca("src/components/modul/video-cerita.tsx");
const umumB2 = baca("src/components/modul/video-k2b2-umum.tsx");

const BERKAS = [
  "naskah-k2b4.ts", "data-k2b4.ts", "dasar-k2b4.tsx", "posisi-k2b4.tsx", "pola-k2b4.tsx", "kit-k2b4.tsx", "infografis-k2b4.tsx",
  "video-k2b4-umum.tsx", "video-k2b4a.tsx", "video-k2b4b.tsx", "SubBabK2B4A.tsx", "SubBabK2B4B.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t));
}

/* ---- Pemasangan di pemutar ---- */
cek("pemutar: BabModul memuat mtk-2-bab4", /\| "mtk-2-bab4"/.test(pemutar));
cek("pemutar: MATERI_BAB memuat mtk-2-bab4", /"mtk-2-bab4": materiK2Bab4 as unknown as MateriBab/.test(pemutar));
for (const [kode, kom] of [["A", "VideoK2B4A"], ["B", "VideoK2B4B"]]) {
  cek(`pemutar: sub-bab ${kode} terpasang dengan video ${kom}`, new RegExp(`"mtk-2-bab4-${kode}":\\s*\\{\\s*Cerita: ${kom}\\b`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memakai Infografis, Concrete, Picture, Abstract bab 4`, new RegExp(`"mtk-2-bab4-${kode}":[^\\n]*Infografis: InfografisK2B4${kode}Komponen[^\\n]*Concrete: ConcreteK2B4${kode}[^\\n]*Picture: PictureK2B4${kode}[^\\n]*Abstract: AbstractK2B4${kode}`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} menampilkan uraian peta pikiran`, new RegExp(`"mtk-2-bab4-${kode}":[^\\n]*uraianPeta: true`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memakai peta pikiran dari naskah`, new RegExp(`"mtk-2-bab4-${kode}":[^\\n]*peta: PETA_PIKIRAN_K2B4${kode}`).test(pemutar));
}
cek("pemutar: bab 4 memakai peta emoji sendiri", /adaK2B4 \? SUB_ANAK_K2B4/.test(pemutar));
cek("pemutar: bab 4 termasuk bab gaya baru (Latihan terbuka setelah materi)", /adaK2B3 \|\| adaK2B4/.test(pemutar));
cek("pemutar: bab 4 tidak punya tab Simulasi", !/"mtk-2-bab4":\s*Simulasi/.test(pemutar));
cek("pemutar: kartu 'sedang disiapkan' untuk Latihan dan Ujian tanpa soal", /soalSiap/.test(pemutar) && /bab ini sedang disiapkan/.test(pemutar));

/* ---- Suara: murni Web Speech perangkat, laju 0,70, nada 1 ---- */
cek("naskah: laju 0,70 dan nada 1", N.K2B4_META.suaraLaju === 0.7 && N.K2B4_META.suaraNada === 1);
cek("pemutar: laju dan nada dari JSON diteruskan ke suara", /laju: materi\.suaraLaju/.test(pemutar) && /nada: materi\.suaraNada/.test(pemutar));
cek("pemutar: bab memakai suara perangkat saja", /perangkatSaja: materi\.suaraPerangkatSaja === true/.test(pemutar));
cek("suara: laju dan nada kustom hanya untuk perangkatSaja", /kustom = opsi\.perangkatSaja === true/.test(suaraLib));
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));
const pola = baca("src/components/modul/pola-k2b4.tsx");
cek("bunyi tepuk: WebAudio perangkat, tanpa berkas audio dan tanpa jaringan", /AudioContext/.test(pola) && !/new Audio\(|\.mp3|\.wav|audio-guru/.test(pola));

/* ---- Video: satu per satu saat diketuk ---- */
cek("video: mesin punya mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));
cek("video: video tidak berjalan sebelum Putar (mulaiLangsung hanya di cabang aktif)", /aktif === v\.naskah\.id \?[\s\S]*mulaiLangsung/.test(umumB2) && (umumB2.match(/mulaiLangsung/g) ?? []).length === 1);
cek("video: hanya satu video aktif (state tunggal)", /useState<string \| null>\(null\)/.test(umumB2));
for (const [kode, berkas] of [["A", "video-k2b4a.tsx"], ["B", "video-k2b4b.tsx"]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const s = N.SUB_BAB_K2B4.find((x) => x.id === kode);
  const adegan = s.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9, `ada ${adegan.length}`);
  cek(`video ${kode}: tiga video`, s.videos.length === 3);
  cek(`video ${kode}: adegan memakai papan naskah`, (t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length === 9, `ada ${(t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length}`);
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}4.videos`));
  cek(`video ${kode}: memakai DaftarVideoCerita`, /DaftarVideoCerita/.test(t));
  /* Setiap adegan hanya menyebut ketukan yang ada, dan poster menunjuk adegan dan ketukan yang ada. */
  s.videos.forEach((v, vi) =>
    v.adegan.forEach((a, ai) => {
      const nama = `${kode}${vi + 1}_${ai + 1}`;
      const i = t.indexOf(`function ${nama}(`);
      cek(`video ${kode}: adegan ${nama} ada`, i >= 0);
      if (i < 0) return;
      const j = t.indexOf("\n}\n", i);
      const badan = t.slice(i, j);
      const maks = Math.max(0, ...[...badan.matchAll(/k\s*(?:===|>=|<=|<|>)\s*(\d+)/g)].map((m) => Number(m[1])));
      cek(`video ${kode}: ${nama} tidak menyebut ketukan di luar naskah`, maks <= a.ketukan.length - 1, `maks ${maks}, ketukan ${a.ketukan.length}`);
      cek(`video ${kode}: ${nama} bereaksi terhadap ketukan`, /\bk\b/.test(badan.replace(/papan\(\d, \d\)\[k\]/g, "")));
    }),
  );
  const poster = [...t.matchAll(/\{ a: (\d+), k: (\d+) \}/g)].map((m) => ({ a: Number(m[1]), k: Number(m[2]) }));
  cek(`video ${kode}: tiga poster`, poster.length === 3);
  poster.forEach((p, vi) => {
    const a = s.videos[vi]?.adegan[p.a];
    cek(`video ${kode}: poster ${vi + 1} menunjuk adegan dan ketukan yang ada`, !!a && p.k < a.ketukan.length);
  });
}
for (const s of N.SUB_BAB_K2B4) for (const v of s.videos) for (const a of v.adegan) cek(`${a.id}: ketukan sama dengan papan`, a.ketukan.length === a.papan.length);

/* ---- Tanpa soal Latihan dan Ujian, tanpa simulasi ---- */
const json = JSON.parse(baca("src/data/kelas2-bab4.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id, phase_code, grade", json.chapter_id === "k2-mat-bab4" && json.phase_code === "FASE_A" && json.grade === 2);
cek("JSON: laju 0,70 dan nada 1, suara perangkat saja", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: hanya sub-bab A dan B", Object.keys(json.subBabs).join() === "A,B");
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas2_bab4_keys.sql"));
cek("pemutar: SIMULASI_BAB tidak memuat bab 4 kelas 2", !/SIMULASI_BAB[\s\S]{0,400}"mtk-2-bab4"/.test(pemutar.slice(pemutar.indexOf("const SIMULASI_BAB"), pemutar.indexOf("const SIMULASI_BAB") + 600)));

/* ---- Batas Concrete dan Picture ---- */
const bendaNyata = /BendaDi\b|BendaSvg|BendaG\b|UKURAN_BENDA|NAMA_BENDA|Obj\b/;
const emojiPicto = /\p{Extended_Pictographic}/u;
/* Gambar benda: boleh di Concrete saja. Ikon tombol (centang, tong sampah) bukan benda. */
const emojiBenda = /[\u{1F95E}\u{1F355}\u{1F34E}\u{1F349}\u{1F95B}\u{1F370}\u{1F41F}\u{1F420}\u{270F}\u{1F34A}\u{1F9C1}\u{1F36E}\u{1F35E}\u{1F388}\u{1F9F8}\u{1F4DA}\u{1F6CF}\u{1F333}\u{1F4E6}\u{1F4FF}\u{1F44F}\u{1F9D1}]/u;
const badan = (teks, nama) => {
  const i = teks.indexOf(`export function ${nama}(`);
  if (i < 0) return "";
  const j = teks.indexOf("\n/* ---", i + 10);
  return teks.slice(i, j < 0 ? undefined : j);
};
const posisi = baca("src/components/modul/posisi-k2b4.tsx");
for (const [teks, nama] of [[posisi, "PetaKotak"], [posisi, "PilihKataPosisi"], [posisi, "SusunBangunPetak"], [pola, "PolaAtauBukan"], [pola, "WarnaiPola"]]) {
  const b = badan(teks, nama);
  cek(`${nama}: komponen Picture ada`, b.length > 200);
  cek(`${nama}: Picture tanpa benda nyata`, !bendaNyata.test(b));
  cek(`${nama}: Picture tanpa emoji benda`, !emojiBenda.test(b));
}
/* PilihKataPosisi memakai diagram polos: DiagramDua. */
const diagram = posisi.slice(posisi.indexOf("function DiagramDua("), posisi.indexOf("export function PilihKataPosisi("));
cek("DiagramDua: hanya lingkaran dan persegi polos", diagram.length > 100 && !bendaNyata.test(diagram) && !emojiPicto.test(diagram));
const lanjut = badan(pola, "LanjutPola");
cek("LanjutPola: mode picture tidak menampilkan nama benda berwarna (hanya Concrete menulis label)", /mode === "concrete" \? <span/.test(lanjut));
for (const [teks, nama] of [[posisi, "Panggung"], [posisi, "TemukanKamar"], [pola, "LanjutPola"], [pola, "AturBarisan"]]) {
  cek(`${nama}: komponen Concrete ada`, badan(teks, nama).length > 200);
}
/* Catatan tahap Picture tanpa emoji benda. */
for (const kode of ["A", "B"]) {
  const t = baca(`src/components/modul/SubBabK2B4${kode}.tsx`);
  const baris = t.split("\n").filter((b) => /CatatanTempel/.test(b));
  cek(`SubBabK2B4${kode}: catatan Picture ada`, baris.length >= 3, `ada ${baris.length}`);
  cek(`SubBabK2B4${kode}: catatan Picture tanpa emoji benda`, baris.every((b) => !emojiBenda.test(b)));
}
/* Teks naskah Picture (judul, tujuan, cara main) tanpa emoji. */
for (const s of N.SUB_BAB_K2B4) for (const g of s.games.filter((x) => x.stage === "Picture")) cek(`naskah ${s.id}: Picture "${g.title}" tanpa emoji`, !emojiPicto.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide}`));

/* Sepuluh permainan per sub-bab: 4 Concrete, 3 Picture, 3 Abstract. */
const info = baca("src/components/modul/infografis-k2b4.tsx");
cek("infografis: dua puluh visual (10 per sub-bab)", (info.match(/\/\* \d+ [A-Z]/g) ?? []).length === 20, `ada ${(info.match(/\/\* \d+ [A-Z]/g) ?? []).length}`);
for (const kode of ["A", "B"]) {
  const t = baca(`src/components/modul/SubBabK2B4${kode}.tsx`);
  const nomor = [...t.matchAll(/\{ nomor: (\d+), render/g)].map((m) => Number(m[1]));
  cek(`SubBabK2B4${kode}: nomor permainan 1 sampai 10`, nomor.join() === "1,2,3,4,5,6,7,8,9,10", nomor.join());
  cek(`SubBabK2B4${kode}: poster Infografis dari naskah`, new RegExp(`InfografisK2B2 s=\\{SUB_${kode}4\\}`).test(t));
  cek(`SubBabK2B4${kode}: Poin Penting dari naskah`, new RegExp(`PoinK2B2 s=\\{SUB_${kode}4\\}`).test(t));
  cek(`SubBabK2B4${kode}: judul permainan dari naskah`, new RegExp(`SUB_${kode}4\\.games\\.map`).test(t));
  cek(`SubBabK2B4${kode}: sepuluh KartuK2B5`, (t.match(/<KartuK2B5\b/g) ?? []).length === 10, `ada ${(t.match(/<KartuK2B5\b/g) ?? []).length}`);
  const indeks = [...t.matchAll(/indeks=\{(\d+)\}/g)].map((m) => Number(m[1]));
  cek(`SubBabK2B4${kode}: indeks judul 0 sampai 9`, indeks.join() === "0,1,2,3,4,5,6,7,8,9", indeks.join());
  const id = [...t.matchAll(/id="(k2b4[ab]-[a-z]+)"/g)].map((m) => m[1]);
  cek(`SubBabK2B4${kode}: id permainan unik`, new Set(id).size === 10, id.join());
  /* Setiap permainan menghubungkan onBeres ke tombol lanjut (bukan fungsi kosong). */
  cek(`SubBabK2B4${kode}: tiap permainan memanggil beres dari kartu`, (t.match(/onBeres=\{beres\}/g) ?? []).length === 10 && !/onBeres=\{\(\) => undefined\}/.test(t), `ada ${(t.match(/onBeres=\{beres\}/g) ?? []).length}`);
}

/* ---- Pendaftaran bab ---- */
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: judul Bab 4 kelas 2 terdaftar", /JUDUL_MTK_2_BAB4 = "Bab 4: Posisi Benda dan Pola di Sekitar Kita"/.test(kur) && /JUDUL_MTK_2_BAB3, JUDUL_MTK_2_BAB4(, JUDUL_MTK_2_BAB5)?(, JUDUL_MTK_2_BAB6)?(, JUDUL_MTK_2_BAB7)?\]/.test(kur));
cek("rute: /ruang-belajar/mtk-2-bab4", /bab="mtk-2-bab4"/.test(baca("src/app/ruang-belajar/mtk-2-bab4/page.tsx")));
cek("ruang belajar: tautan Bab 4", /\/ruang-belajar\/mtk-2-bab4/.test(baca("src/app/ruang-belajar/page.tsx")));
cek("preview: bab 4 valid", /"mtk-2-bab3", "mtk-2-bab4"(, "mtk-2-bab5")?(, "mtk-2-bab6")?(, "mtk-2-bab7")?\]/.test(baca("src/app/modul-preview/page.tsx")));
cek("halaman uji sementara tidak ikut", !fs.existsSync("src/app/modul-preview/uji-k2b4/page.tsx"), "hapus src/app/modul-preview/uji-k2b4 sebelum commit");
cek("berkas sementara tidak ikut", !fs.existsSync(".tmp-k2b4"), "hapus .tmp-k2b4 sebelum commit");

/* ---- Naskah markdown ---- */
for (const b of ["mtk-2-bab4-sub-a-posisi-benda.md", "mtk-2-bab4-sub-b-pola.md", "mtk-2-bab4-video-cerita.md"]) {
  cek(`naskah/${b} ada`, fs.existsSync(`naskah/${b}`));
  if (fs.existsSync(`naskah/${b}`)) {
    const isi = baca(`naskah/${b}`);
    cek(`naskah/${b}: tanpa undefined dan NaN`, !/undefined|\bNaN\b|\[object/.test(isi));
    cek(`naskah/${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(isi));
    cek(`naskah/${b}: tanpa sisa Bab 5`, !/pecahan|seperempat|bab5/i.test(isi));
  }
}

console.log(`\nStatis Kelas 2 Bab 4: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
