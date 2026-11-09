// Uji statis Matematika Kelas 2 Bab 3 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k2b3.mjs
// Memeriksa: pemasangan di pemutar, video diputar satu per satu saat diketuk (tanpa putar otomatis), suara perangkat murni
// (laju 0,70 dan nada 1), tanpa jaringan dan tanpa layanan suara berbayar, tanpa soal Latihan/Ujian dan tanpa simulasi,
// batas Concrete dan Picture (benda hanya di Concrete, diagram polos di Picture), dan seluruh komponen permainan terpasang.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b3.ts";

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
  "naskah-k2b3.ts", "data-k2b3.ts", "dasar-k2b3.tsx", "permainan-k2b3.tsx", "geometri-k2b3.tsx", "ruang-k2b3.tsx", "kit-k2b3.tsx", "video-k2b3-umum.tsx",
  "video-k2b3a.tsx", "video-k2b3b.tsx", "video-k2b3c.tsx",
  "SubBabK2B3A.tsx", "SubBabK2B3AConcrete.tsx", "SubBabK2B3APicture.tsx",
  "SubBabK2B3B.tsx", "SubBabK2B3BConcrete.tsx", "SubBabK2B3BPicture.tsx",
  "SubBabK2B3C.tsx", "SubBabK2B3CConcrete.tsx", "SubBabK2B3CPicture.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|kurs/i.test(t));
}

/* ---- Pemasangan di pemutar ---- */
cek("pemutar: BabModul memuat mtk-2-bab3", /\| "mtk-2-bab3"/.test(pemutar));
cek("pemutar: MATERI_BAB memuat mtk-2-bab3", /"mtk-2-bab3": materiK2Bab3 as unknown as MateriBab/.test(pemutar));
for (const [kode, kom] of [["A", "VideoK2B3A"], ["B", "VideoK2B3B"], ["C", "VideoK2B3C"]]) {
  cek(`pemutar: sub-bab ${kode} terpasang dengan video ${kom}`, new RegExp(`"mtk-2-bab3-${kode}":\\s*\\{\\s*Cerita: ${kom}\\b`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memakai Infografis, Concrete, Picture, Abstract bab 3`, new RegExp(`"mtk-2-bab3-${kode}":[^\\n]*Infografis: InfografisK2B3${kode}Komponen[^\\n]*Concrete: ConcreteK2B3${kode}[^\\n]*Picture: PictureK2B3${kode}[^\\n]*Abstract: AbstractK2B3${kode}`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} menampilkan uraian peta pikiran`, new RegExp(`"mtk-2-bab3-${kode}":[^\\n]*uraianPeta: true`).test(pemutar));
}
cek("pemutar: bab 3 memakai peta emoji sendiri", /adaK2B3 \? SUB_ANAK_K2B3/.test(pemutar));
cek("pemutar: bab 3 termasuk bab gaya baru (Latihan terbuka setelah materi)", /adaK2B2 \|\| adaK2B3/.test(pemutar));
cek("pemutar: bab 3 tidak punya tab Simulasi", !/"mtk-2-bab3":\s*Simulasi/.test(pemutar));
cek("pemutar: kartu 'sedang disiapkan' untuk Latihan dan Ujian tanpa soal", /soalSiap/.test(pemutar) && /bab ini sedang disiapkan/.test(pemutar));

/* ---- Suara: murni Web Speech perangkat, laju 0,70, nada 1 ---- */
cek("naskah: laju 0,70 dan nada 1", N.K2B3_META.suaraLaju === 0.7 && N.K2B3_META.suaraNada === 1);
cek("pemutar: laju dan nada dari JSON diteruskan ke suara", /laju: materi\.suaraLaju/.test(pemutar) && /nada: materi\.suaraNada/.test(pemutar));
cek("pemutar: bab memakai suara perangkat saja", /perangkatSaja: materi\.suaraPerangkatSaja === true/.test(pemutar));
cek("suara: laju dan nada kustom hanya untuk perangkatSaja", /kustom = opsi\.perangkatSaja === true/.test(suaraLib));
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));

/* ---- Video: satu per satu saat diketuk ---- */
cek("video: mesin punya mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));
cek("video: video tidak berjalan sebelum Putar (mulaiLangsung hanya di cabang aktif)", /aktif === v\.naskah\.id \?[\s\S]*mulaiLangsung/.test(umumB2) && (umumB2.match(/mulaiLangsung/g) ?? []).length === 1);
cek("video: hanya satu video aktif (state tunggal)", /useState<string \| null>\(null\)/.test(umumB2));
for (const [kode, berkas] of [["A", "video-k2b3a.tsx"], ["B", "video-k2b3b.tsx"], ["C", "video-k2b3c.tsx"]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const s = N.SUB_BAB_K2B3.find((x) => x.id === kode);
  const adegan = s.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9, `ada ${adegan.length}`);
  cek(`video ${kode}: tiga video`, s.videos.length === 3);
  cek(`video ${kode}: adegan memakai papan naskah`, (t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length === 9, `ada ${(t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length}`);
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}3.videos`));
  cek(`video ${kode}: memakai DaftarVideoCerita`, /DaftarVideoCerita/.test(t));
}
for (const s of N.SUB_BAB_K2B3) for (const v of s.videos) for (const a of v.adegan) cek(`${a.id}: ketukan sama dengan papan`, a.ketukan.length === a.papan.length);

/* ---- Tanpa soal Latihan dan Ujian, tanpa simulasi ---- */
const json = JSON.parse(baca("src/data/kelas2-bab3.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id, phase_code, grade", json.chapter_id === "k2-mat-bab3" && json.phase_code === "FASE_A" && json.grade === 2);
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas2_bab3_keys.sql"));
cek("pemutar: SIMULASI_BAB tidak memuat bab 3", !/SIMULASI_BAB[\s\S]{0,400}"mtk-2-bab3"/.test(pemutar.slice(pemutar.indexOf("const SIMULASI_BAB"), pemutar.indexOf("const SIMULASI_BAB") + 600)));

/* ---- Batas Concrete dan Picture ---- */
const bendaNyata = /BendaDatarSvg|BendaDatarG|BendaRuangSvg|ObjDatar|ObjRuang|DEKOR_BENDA|Ruang3D\b/;
const emojiBenda = /[\u{1F34E}\u{1F34A}\u{1F369}\u{1F9F8}\u{1F426}\u{1F3B2}\u{1F4E6}\u{26BD}\u{1F3C0}]/u;
for (const b of ["SubBabK2B3APicture.tsx", "SubBabK2B3BPicture.tsx", "SubBabK2B3CPicture.tsx"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: Picture tanpa emoji benda`, !emojiBenda.test(t));
  cek(`${b}: Picture tanpa komponen benda nyata`, !bendaNyata.test(t));
}
const badan = (teks, nama) => {
  const i = teks.indexOf(`export function ${nama}(`);
  if (i < 0) return "";
  const j = teks.indexOf("\n/* ---", i + 10);
  return teks.slice(i, j < 0 ? undefined : j);
};
const geo = baca("src/components/modul/geometri-k2b3.tsx");
const rng = baca("src/components/modul/ruang-k2b3.tsx");
for (const [teks, nama] of [[geo, "TandaiSisi"], [geo, "WarnaiBentuk"], [geo, "GarisPengurai"], [geo, "HasilSusunan"], [geo, "HitungKeping"], [rng, "Bayangan"], [rng, "TabelPermukaan"], [rng, "BeriNama"]]) {
  const b = badan(teks, nama);
  cek(`${nama}: komponen Picture ada`, b.length > 200);
  cek(`${nama}: Picture tanpa benda nyata dan tanpa emoji benda`, !bendaNyata.test(b) && !emojiBenda.test(b));
}
for (const [teks, nama] of [[geo, "PapanPaku"], [geo, "CetakPutar"], [geo, "CariBenda"], [geo, "Gunting"], [geo, "SusunKeping"], [geo, "Bongkar"], [geo, "DuaSegitiga"], [rng, "LerengGelinding"], [rng, "TasMisteri"], [rng, "CetakTebak"]]) {
  cek(`${nama}: komponen Concrete ada`, badan(teks, nama).length > 200);
}
for (const b of ["SubBabK2B3AConcrete.tsx", "SubBabK2B3BConcrete.tsx", "SubBabK2B3CConcrete.tsx"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: Concrete tanpa garis bilangan, bagan pasangan, dan model batang`, !/JalurKotakB2|GarisBilangan|BatangBanding|\bBagan\b|LangkahBagan|LompatGaris|BatangSepuluh/.test(t));
}
/* Sepuluh permainan per sub-bab: 4 Concrete, 3 Picture, 3 Abstract. */
for (const kode of ["A", "B", "C"]) {
  const t = baca(`src/components/modul/SubBabK2B3${kode}.tsx`);
  const nomor = [...t.matchAll(/\{ nomor: (\d+), render/g)].map((m) => Number(m[1]));
  cek(`SubBabK2B3${kode}: nomor permainan 1 sampai 10`, nomor.join() === "1,2,3,4,5,6,7,8,9,10", nomor.join());
  cek(`SubBabK2B3${kode}: poster Infografis dari naskah`, new RegExp(`InfografisK2B2 s=\\{SUB_${kode}3\\}`).test(t));
  cek(`SubBabK2B3${kode}: Poin Penting dari naskah`, new RegExp(`PoinK2B2 s=\\{SUB_${kode}3\\}`).test(t));
  cek(`SubBabK2B3${kode}: sepuluh visual infografis`, (t.match(/\/\* \d+ [A-Z]/g) ?? []).length === 10, `ada ${(t.match(/\/\* \d+ [A-Z]/g) ?? []).length}`);
}

/* ---- Pendaftaran bab ---- */
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: judul Bab 3 kelas 2 terdaftar", /JUDUL_MTK_2_BAB3 = "Bab 3: Bentuk di Sekitar Kita"/.test(kur) && /\[JUDUL_MTK_2_BAB1, JUDUL_MTK_2_BAB2, JUDUL_MTK_2_BAB3(, JUDUL_MTK_2_BAB4)?(, JUDUL_MTK_2_BAB5)?\]/.test(kur));
cek("rute: /ruang-belajar/mtk-2-bab3", /bab="mtk-2-bab3"/.test(baca("src/app/ruang-belajar/mtk-2-bab3/page.tsx")));
cek("ruang belajar: tautan Bab 3", /\/ruang-belajar\/mtk-2-bab3/.test(baca("src/app/ruang-belajar/page.tsx")));
cek("preview: bab 3 valid", /"mtk-2-bab3"(, "mtk-2-bab4")?(, "mtk-2-bab5")?\]/.test(baca("src/app/modul-preview/page.tsx")));
cek("halaman uji sementara tidak ikut", !fs.existsSync("src/app/modul-preview/uji-k2b3/page.tsx"), "hapus src/app/modul-preview/uji-k2b3 sebelum commit");
cek("berkas sementara tidak ikut", !fs.existsSync(".tmp-k2b3"), "hapus .tmp-k2b3 sebelum commit");

/* ---- Naskah markdown ---- */
for (const b of ["mtk-2-bab3-sub-a-bangun-datar.md", "mtk-2-bab3-sub-b-mengurai-menyusun-bangun-datar.md", "mtk-2-bab3-sub-c-bangun-ruang.md", "mtk-2-bab3-video-cerita.md"]) {
  cek(`naskah/${b} ada`, fs.existsSync(`naskah/${b}`));
  if (fs.existsSync(`naskah/${b}`)) {
    const isi = baca(`naskah/${b}`);
    cek(`naskah/${b}: tanpa undefined dan NaN`, !/undefined|\bNaN\b|\[object/.test(isi));
    cek(`naskah/${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(isi));
  }
}

console.log(`\nStatis Kelas 2 Bab 3: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
