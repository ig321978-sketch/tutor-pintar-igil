// Uji statis Matematika Kelas 6 Bab 1 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k6b1.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k6b1.ts";

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

const BERKAS = [
  "naskah-k6b1.ts", "data-k6b1.ts", "kit-k6b1.tsx", "paket-k6b1.ts",
  "infografis-k6b1.tsx", "video-k6b1a.tsx", "video-k6b1b.tsx", "video-k6b1c.tsx",
  "SubBabK6B1A.tsx", "SubBabK6B1B.tsx", "SubBabK6B1C.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k6b1.ts", "naskah-k6b1.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k6b1.ts");
cek("registri: mtk-6-bab1 dimuat malas", /"mtk-6-bab1": \(\) => import\("\.\/paket-k6b1"\)/.test(registri));
cek("paket: sub-bab A–C lengkap", ["A", "B", "C"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK6B1${k}, peta: PETA_PIKIRAN_K6B1${k}, Infografis: InfografisK6B1${k}Komponen, Concrete: ConcreteK6B1${k}, Picture: PictureK6B1${k}, Abstract: AbstractK6B1${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-6-bab1", /bab="mtk-6-bab1"/.test(baca("src/app/ruang-belajar/mtk-6-bab1/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_6_BAB1", /JUDUL_MTK_6_BAB1/.test(kur) && /Bab 1: Pecahan dan Desimal/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-6-bab1", !/"mtk-6-bab1"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K6B1_META.suaraLaju === 0.7 && N.K6B1_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k6b1a.tsx", N.SUB_A61], ["B", "video-k6b1b.tsx", N.SUB_B61], ["C", "video-k6b1c.tsx", N.SUB_C61]]) {
  const t = baca(`src/components/modul/${berkas}`);
  // Dua video baru per sub-bab (materi kurikulum dan metode luar), diuji lengkap di scripts/uji-story-k6b1a.mjs, b, dan c. Naskah video lama dihapus.
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: dua video baru dari mesin Story`, new RegExp(`VIDEO_MATERI_K6B1${kode}`).test(t) && new RegExp(`VIDEO_LUAR_K6B1${kode}`).test(t) && !new RegExp(`SUB_${kode}61`).test(t));
  cek(`naskah ${kode}: video lama dihapus (videos kosong)`, sub.videos.length === 0);
}

const json = JSON.parse(baca("src/data/kelas6-bab1.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 6", json.chapter_id === "k6-mat-bab1" && json.phase_code === "FASE_C" && json.grade === 6);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–C", Object.keys(json.subBabs).join() === "A,B,C");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas6_bab1_keys.sql"));

console.log(`uji-statis-k6b1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
