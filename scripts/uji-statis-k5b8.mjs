// Uji statis Matematika Kelas 5 Bab 8 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k5b8.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k5b8.ts";

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
  "naskah-k5b8.ts", "data-k5b8.ts", "kit-k5b8.tsx", "paket-k5b8.ts",
  "infografis-k5b8.tsx", "video-k5b8a.tsx", "video-k5b8b.tsx", "video-k5b8c.tsx",
  "SubBabK5B8A.tsx", "SubBabK5B8B.tsx", "SubBabK5B8C.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k5b8.ts", "naskah-k5b8.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k5b8.ts");
cek("registri: mtk-5-bab8 dimuat malas", /"mtk-5-bab8": \(\) => import\("\.\/paket-k5b8"\)/.test(registri));
cek("paket: sub-bab A–C lengkap", ["A", "B", "C"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK5B8${k}, peta: PETA_PIKIRAN_K5B8${k}, Infografis: InfografisK5B8${k}Komponen, Concrete: ConcreteK5B8${k}, Picture: PictureK5B8${k}, Abstract: AbstractK5B8${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-5-bab8", /bab="mtk-5-bab8"/.test(baca("src/app/ruang-belajar/mtk-5-bab8/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_5_BAB8", /JUDUL_MTK_5_BAB8/.test(kur) && /Bab 8: Data/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-5-bab8", !/"mtk-5-bab8"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K5B8_META.suaraLaju === 0.7 && N.K5B8_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k5b8a.tsx", N.SUB_A58], ["B", "video-k5b8b.tsx", N.SUB_B58], ["C", "video-k5b8c.tsx", N.SUB_C58]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}58.videos`));
}

const json = JSON.parse(baca("src/data/kelas5-bab8.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 5", json.chapter_id === "k5-mat-bab8" && json.phase_code === "FASE_C" && json.grade === 5);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–C", Object.keys(json.subBabs).join() === "A,B,C");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas5_bab8_keys.sql"));

console.log(`uji-statis-k5b8: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
