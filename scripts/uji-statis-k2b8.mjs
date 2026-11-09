// Uji statis Matematika Kelas 2 Bab 8, Berbagai Diagram (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k2b8.mjs
// Memeriksa: berkas data murni (tanpa impor nilai), pemasangan di pemutar, video diputar satu per satu saat diketuk (tanpa putar
// otomatis), suara perangkat murni (laju 0,70 dan nada 1), tanpa jaringan dan tanpa layanan suara berbayar, tanpa soal
// Latihan/Ujian dan tanpa simulasi, batas Concrete dan Picture (benda hanya di Concrete, diagram polos di Picture),
// serta tiga puluh permainan per sub-bab terpasang lengkap.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b8.ts";

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
  "naskah-k2b8.ts", "data-k2b8.ts", "dasar-k2b8.tsx", "diagram-k2b8.tsx", "mesin-k2b8.tsx", "kit-k2b8.tsx",
  "infografis-k2b8.tsx", "video-k2b8-umum.tsx", "video-k2b8a.tsx", "video-k2b8b.tsx", "SubBabK2B8A.tsx", "SubBabK2B8B.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t));
  cek(`${b}: tanpa emoji Unicode 13 ke atas (tidak tampil di Windows 10)`, !/[\u{1FAA0}-\u{1FAFF}]/u.test(t));
}
/* Berkas data murni: tanpa impor nilai (hanya import type), supaya bisa diuji langsung di Node. */
for (const b of ["data-k2b8.ts", "naskah-k2b8.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
  cek(`${b}: tanpa React`, !/from "react"/.test(t));
}

/* ---- Pemasangan di pemutar ---- */
cek("pemutar: BabModul memuat mtk-2-bab8", /\| "mtk-2-bab8"/.test(pemutar));
cek("pemutar: MATERI_BAB memuat mtk-2-bab8", /"mtk-2-bab8": materiK2Bab8 as unknown as MateriBab/.test(pemutar));
for (const [kode, kom] of [["A", "VideoK2B8A"], ["B", "VideoK2B8B"]]) {
  cek(`pemutar: sub-bab ${kode} terpasang dengan video ${kom}`, new RegExp(`"mtk-2-bab8-${kode}":\\s*\\{\\s*Cerita: ${kom}\\b`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memakai Infografis, Concrete, Picture, Abstract bab 8`, new RegExp(`"mtk-2-bab8-${kode}":[^\\n]*Infografis: InfografisK2B8${kode}Komponen[^\\n]*Concrete: ConcreteK2B8${kode}[^\\n]*Picture: PictureK2B8${kode}[^\\n]*Abstract: AbstractK2B8${kode}`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} menampilkan uraian peta pikiran`, new RegExp(`"mtk-2-bab8-${kode}":[^\\n]*uraianPeta: true`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memakai peta pikiran dari naskah`, new RegExp(`"mtk-2-bab8-${kode}":[^\\n]*peta: PETA_PIKIRAN_K2B8${kode}`).test(pemutar));
}
cek("pemutar: bab 8 memakai peta emoji sendiri", /adaK2B8 \? SUB_ANAK_K2B8/.test(pemutar));
cek("pemutar: bab 8 termasuk bab gaya baru (Latihan terbuka setelah materi)", /adaK2B7 \|\| adaK2B8/.test(pemutar));
cek("pemutar: bab 8 tidak punya tab Simulasi", !/"mtk-2-bab8":\s*Simulasi/.test(pemutar));
cek("pemutar: kartu 'sedang disiapkan' untuk Latihan dan Ujian tanpa soal", /soalSiap/.test(pemutar) && /bab ini sedang disiapkan/.test(pemutar));

/* ---- Suara: murni Web Speech perangkat, laju 0,70, nada 1 ---- */
cek("naskah: laju 0,70 dan nada 1", N.K2B8_META.suaraLaju === 0.7 && N.K2B8_META.suaraNada === 1);
cek("pemutar: laju dan nada dari JSON diteruskan ke suara", /laju: materi\.suaraLaju/.test(pemutar) && /nada: materi\.suaraNada/.test(pemutar));
cek("pemutar: bab memakai suara perangkat saja", /perangkatSaja: materi\.suaraPerangkatSaja === true/.test(pemutar));
cek("suara: laju dan nada kustom hanya untuk perangkatSaja", /kustom = opsi\.perangkatSaja === true/.test(suaraLib));
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));

/* ---- Video: satu per satu saat diketuk ---- */
cek("video: mesin punya mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));
cek("video: video tidak berjalan sebelum Putar (mulaiLangsung hanya di cabang aktif)", /aktif === v\.naskah\.id \?[\s\S]*mulaiLangsung/.test(umumB2) && (umumB2.match(/mulaiLangsung/g) ?? []).length === 1);
cek("video: hanya satu video aktif (state tunggal)", /useState<string \| null>\(null\)/.test(umumB2));
for (const [kode, berkas] of [["A", "video-k2b8a.tsx"], ["B", "video-k2b8b.tsx"]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const s = N.SUB_BAB_K2B8.find((x) => x.id === kode);
  const adegan = s.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9, `ada ${adegan.length}`);
  cek(`video ${kode}: tiga video`, s.videos.length === 3);
  cek(`video ${kode}: adegan memakai papan naskah`, (t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length === 9, `ada ${(t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length}`);
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}8.videos`));
  cek(`video ${kode}: memakai DaftarVideoCerita`, /DaftarVideoCerita/.test(t));
  cek(`video ${kode}: tanpa putar otomatis (tidak ada mulaiLangsung di berkas adegan)`, !/mulaiLangsung/.test(t));
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
for (const s of N.SUB_BAB_K2B8) for (const v of s.videos) for (const a of v.adegan) cek(`${a.id}: ketukan sama dengan papan`, a.ketukan.length === a.papan.length);

/* ---- Tanpa soal Latihan dan Ujian, tanpa simulasi ---- */
const json = JSON.parse(baca("src/data/kelas2-bab8.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id, phase_code, grade", json.chapter_id === "k2-mat-bab8" && json.phase_code === "FASE_A" && json.grade === 2);
cek("JSON: laju 0,70 dan nada 1, suara perangkat saja", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: hanya sub-bab A dan B", Object.keys(json.subBabs).join() === "A,B");
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas2_bab8_keys.sql"));
{
  const mulai = pemutar.indexOf("const SIMULASI_BAB");
  cek("pemutar: SIMULASI_BAB tidak memuat bab 8 kelas 2", mulai >= 0 && !/"mtk-2-bab8"/.test(pemutar.slice(mulai, mulai + 700)));
}

/* ---- Batas Concrete dan Picture ---- */
const bendaNyata = /\bIkon\b|\bKumpulan\b|KumpulanData|BarisIkon|SemuaKumpulan|CatatData|dasar-k2b8/;
/** Emoji benda yang hanya boleh muncul di Concrete. Tanda centang, bintang, dan panah bukan gambar benda. */
const emojiBenda = /[\u{1F347}\u{1F34A}\u{1F34E}\u{1F34C}\u{1F414}\u{1F410}\u{1F404}\u{1F986}\u{1F697}\u{1F43B}\u{1F535}\u{1F4E6}\u{1F966}\u{1F33F}\u{1F955}\u{1F33D}\u{1F339}\u{1F4AE}\u{1F337}\u{1F33C}\u{1F350}\u{1F36A}\u{1F361}\u{1F359}\u{1F36E}\u{1F349}\u{1F951}\u{26BD}\u{1F3F8}\u{1F3CA}\u{1F3C0}]/u;
const iris = (t, dari, sampai) => {
  const a = t.indexOf(dari);
  const b = t.indexOf(sampai, a + 10);
  return a >= 0 && b > a ? t.slice(a, b) : "";
};
for (const kode of ["A", "B"]) {
  const t = baca(`src/components/modul/SubBabK2B8${kode}.tsx`);
  const picture = iris(t, "/* ------------------------------ Picture", "/* ------------------------------ Abstract");
  const abstrak = iris(t, "/* ------------------------------ Abstract", "/* ------------------------------ Pembungkus");
  const concrete = iris(t, "/* ------------------------------ Concrete", "/* ------------------------------ Picture");
  cek(`SubBabK2B8${kode}: ketiga bagian tahap ada`, picture.length > 1000 && abstrak.length > 1000 && concrete.length > 1000, `${concrete.length}/${picture.length}/${abstrak.length}`);
  cek(`SubBabK2B8${kode}: Picture tanpa benda nyata`, !bendaNyata.test(picture), (picture.match(bendaNyata) ?? [""])[0]);
  cek(`SubBabK2B8${kode}: Picture tanpa emoji benda`, !emojiBenda.test(picture), (picture.match(emojiBenda) ?? [""])[0]);
  cek(`SubBabK2B8${kode}: Abstract tanpa benda nyata dan emoji benda`, !bendaNyata.test(abstrak) && !emojiBenda.test(abstrak), (abstrak.match(bendaNyata) ?? abstrak.match(emojiBenda) ?? [""])[0]);
  cek(`SubBabK2B8${kode}: Concrete memakai benda nyata`, bendaNyata.test(concrete));
  const catatan = t.split("\n").filter((b) => /CatatanTempel/.test(b));
  cek(`SubBabK2B8${kode}: catatan Picture ada dan tanpa emoji benda`, catatan.length >= 10 && catatan.every((b) => !emojiBenda.test(b)), `ada ${catatan.length}`);
}
for (const b of ["diagram-k2b8.tsx"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tidak mengimpor gambar benda (dipakai Picture)`, !/from "\.\/dasar-k2b8"|BendaB7|Capung/.test(t));
  cek(`${b}: tanpa emoji benda`, !emojiBenda.test(t));
}
/* Teks naskah Picture (judul, tujuan, cara main) tanpa emoji. */
for (const s of N.SUB_BAB_K2B8) for (const g of s.games.filter((x) => x.stage === "Picture")) cek(`naskah ${s.id}: Picture "${g.title}" tanpa emoji`, !/\p{Extended_Pictographic}/u.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide}`));

/* ---- Tiga puluh permainan per sub-bab ---- */
const info = baca("src/components/modul/infografis-k2b8.tsx");
cek("infografis: dua puluh visual (10 per sub-bab)", (info.match(/\/\* \d+ [A-Z]/g) ?? []).length === 20, `ada ${(info.match(/\/\* \d+ [A-Z]/g) ?? []).length}`);
for (const kode of ["A", "B"]) {
  const t = baca(`src/components/modul/SubBabK2B8${kode}.tsx`);
  cek(`SubBabK2B8${kode}: penomoran 1 sampai 30 dalam tiga tahap`, /nomor: i \+ 1,/.test(t) && /nomor: i \+ 11,/.test(t) && /nomor: i \+ 21,/.test(t) && /const TOTAL = 30;/.test(t) && /total=\{TOTAL\}/.test(t));
  cek(`SubBabK2B8${kode}: poster Infografis dari naskah`, new RegExp(`InfografisK2B2 s=\\{SUB_${kode}8\\}`).test(t));
  cek(`SubBabK2B8${kode}: Poin Penting dari naskah`, new RegExp(`PoinK2B2 s=\\{SUB_${kode}8\\}`).test(t));
  cek(`SubBabK2B8${kode}: judul permainan dari naskah`, new RegExp(`SUB_${kode}8\\.games\\.map`).test(t));
  const indeks = [...t.matchAll(/return Kartu\(d, (\d+), "(k2b8[ab]-[a-z]+)"/g)];
  cek(`SubBabK2B8${kode}: tiga puluh permainan, indeks judul 0 sampai 29 berurutan`, indeks.length === 30 && indeks.every((m, i) => Number(m[1]) === i), `ada ${indeks.length}: ${indeks.map((m) => m[1]).join(",")}`);
  const id = indeks.map((m) => m[2]);
  cek(`SubBabK2B8${kode}: id permainan unik`, new Set(id).size === 30, id.join());
  cek(`SubBabK2B8${kode}: tiap permainan memanggil beres dari kartu`, (t.match(/onBeres=\{beres\}/g) ?? []).length === 30 && !/onBeres=\{\(\) => undefined\}/.test(t), `ada ${(t.match(/onBeres=\{beres\}/g) ?? []).length}`);
  cek(`SubBabK2B8${kode}: ronde tiap permainan dari data (bukan angka tetap)`, !/Kartu\(d, \d+, "[^"]+", "[^"]+", \d+,/.test(t));
  for (const tahap of ["Concrete", "Picture", "Abstract"]) cek(`SubBabK2B8${kode}: ${tahap}K2B8${kode} diekspor`, new RegExp(`export function ${tahap}K2B8${kode}\\(`).test(t));
}

/* ---- Pendaftaran bab ---- */
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: judul Bab 8 kelas 2 terdaftar", /JUDUL_MTK_2_BAB8 = "Bab 8: Berbagai Diagram"/.test(kur) && /JUDUL_MTK_2_BAB7, JUDUL_MTK_2_BAB8\]/.test(kur));
cek("rute: /ruang-belajar/mtk-2-bab8", /bab="mtk-2-bab8"/.test(baca("src/app/ruang-belajar/mtk-2-bab8/page.tsx")));
cek("ruang belajar: tautan Bab 8", /\/ruang-belajar\/mtk-2-bab8/.test(baca("src/app/ruang-belajar/page.tsx")));
cek("preview: bab 8 valid", /"mtk-2-bab7", "mtk-2-bab8"\]/.test(baca("src/app/modul-preview/page.tsx")));
cek("halaman uji sementara tidak ikut", !fs.existsSync("src/app/modul-preview/uji-k2b8") && !fs.existsSync("src/app/modul-preview/uji-video-k2b8"), "hapus src/app/modul-preview/uji-k2b8 dan uji-video-k2b8 sebelum commit");
cek("berkas sementara tidak ikut", !fs.existsSync(".tmp-k2b8"), "hapus .tmp-k2b8 sebelum commit");
cek("ekspor uji sementara tidak tertinggal", !/UJI_SEMENTARA/.test(baca("src/components/modul/SubBabK2B8A.tsx")) && !/UJI_SEMENTARA/.test(baca("src/components/modul/SubBabK2B8B.tsx")));

/* ---- Naskah markdown ---- */
const MD = ["mtk-2-bab8-sub-a-diagram-turus.md", "mtk-2-bab8-sub-b-diagram-gambar.md", "mtk-2-bab8-video-cerita.md"];
for (const b of MD) {
  cek(`naskah/${b} ada`, fs.existsSync(`naskah/${b}`));
  if (fs.existsSync(`naskah/${b}`)) {
    const isi = baca(`naskah/${b}`);
    cek(`naskah/${b}: tanpa undefined dan NaN`, !/undefined|\bNaN\b|\[object/.test(isi));
    cek(`naskah/${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(isi));
    cek(`naskah/${b}: tanpa sisa bab lain`, !/kue cubit|jam analog|timbangan|neraca|membilang sampai/i.test(isi));
  }
}
cek("naskah A: tiga puluh permainan tercatat", (baca(`naskah/${MD[0]}`).match(/^### Permainan \d+\./gm) ?? []).length === 30);
cek("naskah B: tiga puluh permainan tercatat", (baca(`naskah/${MD[1]}`).match(/^### Permainan \d+\./gm) ?? []).length === 30);

console.log(`\nStatis Kelas 2 Bab 8: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
