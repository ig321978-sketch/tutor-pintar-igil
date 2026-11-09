// Uji statis Matematika Kelas 2 Bab 2 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k2b2.mjs
// Memeriksa: pemasangan di pemutar, video satu layar seperti Kelas 2 Bab 1 (tanpa putar otomatis, mulai saat Mulai diketuk), suara perangkat murni
// (laju 0,70 dan nada 1), tanpa jaringan dan tanpa layanan suara berbayar, tanpa soal Latihan/Ujian dan tanpa simulasi,
// batas Concrete dan Picture, dan seluruh komponen permainan terpasang.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k2b2.ts";

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
const umum = baca("src/components/modul/video-k2b2-umum.tsx");

const BERKAS = [
  "naskah-k2b2.ts", "data-k2b2.ts", "dasar-k2b2.tsx", "permainan-k2b2.tsx", "kit-k2b2.tsx", "video-k2b2-umum.tsx",
  "video-k2b2a.tsx", "video-k2b2b.tsx", "video-k2b2c.tsx",
  "SubBabK2B2A.tsx", "SubBabK2B2AConcrete.tsx", "SubBabK2B2APicture.tsx",
  "SubBabK2B2B.tsx", "SubBabK2B2BConcrete.tsx", "SubBabK2B2BPicture.tsx",
  "SubBabK2B2C.tsx", "SubBabK2B2CConcrete.tsx", "SubBabK2B2CPicture.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
}

/* ---- Pemasangan di pemutar ---- */
cek("pemutar: BabModul memuat mtk-2-bab2", /"mtk-2-bab2";/.test(pemutar) || /\| "mtk-2-bab2"/.test(pemutar));
cek("pemutar: MATERI_BAB memuat mtk-2-bab2", /"mtk-2-bab2": materiK2Bab2 as unknown as MateriBab/.test(pemutar));
for (const [kode, kom] of [["A", "VideoPenjumlahanK2B2A"], ["B", "VideoPenguranganK2B2B"], ["C", "VideoSoalCeritaK2B2C"]]) {
  cek(`pemutar: sub-bab ${kode} terpasang dengan video ${kom}`, new RegExp(`"mtk-2-bab2-${kode}":\\s*\\{\\s*Cerita: ${kom}\\b`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memakai Infografis, Concrete, Picture, Abstract bab 2`, new RegExp(`"mtk-2-bab2-${kode}":[^\\n]*Infografis: InfografisK2B2${kode}Komponen[^\\n]*Concrete: ConcreteK2B2${kode}[^\\n]*Picture: PictureK2B2${kode}[^\\n]*Abstract: AbstractK2B2${kode}`).test(pemutar));
  cek(`pemutar: sub-bab ${kode} memasang peta pikiran (Taman Ide, kartu hanya judul)`, new RegExp(`"mtk-2-bab2-${kode}":[^\\n]*peta: PETA_PIKIRAN_K2B2${kode}\\b`).test(pemutar));
}
cek("pemutar: bab 2 tidak punya tab Simulasi", !/"mtk-2-bab2":\s*Simulasi/.test(pemutar));
cek("pemutar: kartu 'sedang disiapkan' untuk Latihan dan Ujian tanpa soal", /soalSiap/.test(pemutar) && /bab ini sedang disiapkan/.test(pemutar));
cek("pemutar: Latihan dan Ujian hanya jalan bila soalSiap", /activeMainTab === "latihan" && materiSelesai && soalSiap/.test(pemutar) && /activeMainTab === "ujian" && materiSelesai && soalSiap/.test(pemutar));

/* ---- Suara: murni Web Speech perangkat, laju 0,70, nada 1 ---- */
cek("naskah: laju 0,70 dan nada 1", N.K2B2_META.suaraLaju === 0.7 && N.K2B2_META.suaraNada === 1);
cek("pemutar: laju dan nada dari JSON diteruskan ke suara", /laju: materi\.suaraLaju/.test(pemutar) && /nada: materi\.suaraNada/.test(pemutar));
cek("pemutar: bab memakai suara perangkat saja", /perangkatSaja: materi\.suaraPerangkatSaja === true/.test(pemutar));
cek("suara: opsi laju dan nada ada", /laju\?: number/.test(suaraLib) && /nada\?: number/.test(suaraLib));
cek("suara: laju dan nada kustom hanya untuk perangkatSaja", /kustom = opsi\.perangkatSaja === true/.test(suaraLib));
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));
cek("suara: ucapan kustom dipecah per kalimat", /pecahKalimat\(naskah\)/.test(suaraLib));

/* ---- Video: satu layar seperti Kelas 2 Bab 1, tidak berjalan sebelum Mulai ---- */
cek("video: mesin tanpa mode putar otomatis (tidak ada mulaiLangsung)", !/mulaiLangsung/.test(mesinVideo));
cek("video: mesin menunggu tombol Mulai (sudahMulai awalnya salah)", /const \[sudahMulai, setSudahMulai\] = useState\(false\)/.test(mesinVideo) && /onClick=\{\(\) => mulai\(0\)\}/.test(mesinVideo));
cek("video: satu pemutar VideoCerita per sub-bab dengan empat properti seperti Bab 1", (umum.match(/<VideoCerita\b/g) ?? []).length === 1 && /<VideoCerita judul=\{judul\} subjudul=\{.*\} adegan=\{adegan\} speakGuru=\{speakGuru\} \/>/.test(umum));
cek("video: tidak ada lagi daftar kartu video", !/DaftarVideoCerita|useState<string \| null>/.test(umum));
const bab1 = baca("src/components/modul/video-cerita-k2a.tsx");
cek("video: Bab 1 memakai pemutar VideoCerita yang sama (acuan tampilan)", /<VideoCerita judul="[^"]+" subjudul="[^"]+" adegan=\{ADEGAN_VIDEO_K2A\} speakGuru=\{speakGuru\} \/>/.test(bab1));
for (const [kode, berkas, jumlah] of [["A", "video-k2b2a.tsx", 9], ["B", "video-k2b2b.tsx", 8], ["C", "video-k2b2c.tsx", 8]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const s = N.SUB_BAB_K2B2.find((x) => x.id === kode);
  const adegan = s.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: ${jumlah} adegan di naskah`, adegan.length === jumlah, `ada ${adegan.length}`);
  cek(`video ${kode}: tiga video`, s.videos.length === 3);
  cek(`video ${kode}: adegan memakai papan naskah`, (t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length === jumlah, `ada ${(t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length}`);
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}.videos`));
  cek(`video ${kode}: memakai VideoCeritaSatuLayar dengan sub-bab sendiri`, new RegExp(`<VideoCeritaSatuLayar subBab=\\{SUB_${kode}\\} videos=\\{VIDEO_SIAP_`).test(t));
  cek(`video ${kode}: id adegan unik dalam satu layar`, new Set(adegan.map((a) => a.id)).size === adegan.length);
  cek(`video ${kode}: tanpa poster kartu`, !/POSTER|poster:/.test(t));
}
for (const s of N.SUB_BAB_K2B2) for (const v of s.videos) for (const a of v.adegan) cek(`${a.id}: ketukan sama dengan papan`, a.ketukan.length === a.papan.length);

/* ---- Tanpa soal Latihan dan Ujian, tanpa simulasi ---- */
const json = JSON.parse(baca("src/data/kelas2-bab2.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas2_bab2_keys.sql"));
cek("pemutar: SIMULASI_BAB tidak memuat bab 2", !/SIMULASI_BAB[\s\S]{0,400}"mtk-2-bab2"/.test(pemutar.slice(pemutar.indexOf("const SIMULASI_BAB"), pemutar.indexOf("const SIMULASI_BAB") + 600)));

/* ---- Batas Concrete dan Picture ---- */
const emojiBenda = /[\u{1F34E}\u{1F34A}\u{1F369}\u{1F9F8}\u{1F426}]/u;
for (const b of ["SubBabK2B2APicture.tsx", "SubBabK2B2BPicture.tsx", "SubBabK2B2CPicture.tsx"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: Picture tanpa emoji benda`, !emojiBenda.test(t));
  cek(`${b}: Picture tanpa komponen benda nyata`, !/JambuAir|BarisJambu|Burung|JerukSvg|DonatSvg|BonekaSvg|KubusSatuan|BatangPuluhan/.test(t));
}
for (const b of ["SubBabK2B2AConcrete.tsx", "SubBabK2B2BConcrete.tsx", "SubBabK2B2CConcrete.tsx"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: Concrete tanpa garis bilangan dan model batang`, !/JalurKotakB2|GarisBilangan|BatangBanding|\bBagan\b|LangkahBagan|LompatGaris/.test(t));
}
const picDiPermainan = baca("src/components/modul/permainan-k2b2.tsx");
cek("permainan umum (jalur, susun, bagan) tanpa benda nyata", !/JambuAir|BarisJambu|Burung|KubusSatuan|BatangPuluhan/.test(picDiPermainan));

/* ---- Pendaftaran bab ---- */
cek("kurikulum: judul Bab 2 kelas 2 terdaftar", /JUDUL_MTK_2_BAB2 = "Bab 2: Penjumlahan dan Pengurangan"/.test(baca("src/lib/kurikulum.ts")) && /\[JUDUL_MTK_2_BAB1, JUDUL_MTK_2_BAB2(, JUDUL_MTK_2_BAB3)?(, JUDUL_MTK_2_BAB4)?(, JUDUL_MTK_2_BAB5)?\]/.test(baca("src/lib/kurikulum.ts")));
cek("rute: /ruang-belajar/mtk-2-bab2", /bab="mtk-2-bab2"/.test(baca("src/app/ruang-belajar/mtk-2-bab2/page.tsx")));
cek("ruang belajar: tautan Bab 2", /\/ruang-belajar\/mtk-2-bab2/.test(baca("src/app/ruang-belajar/page.tsx")));
cek("preview: bab 2 valid", /"mtk-2-bab2"(, "mtk-2-bab3")?(, "mtk-2-bab4")?(, "mtk-2-bab5")?\]/.test(baca("src/app/modul-preview/page.tsx")));
cek("halaman uji sementara tidak ikut", !fs.existsSync("src/app/modul-preview/uji-k2b2/page.tsx"), "hapus src/app/modul-preview/uji-k2b2 sebelum commit");

console.log(`\nStatis Kelas 2 Bab 2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
