// Uji statis Matematika Kelas 4 Bab 5 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k4b5.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k4b5.ts";

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
  "naskah-k4b5.ts", "data-k4b5.ts", "diagram-k4b5.tsx", "kit-k4b5.tsx", "paket-k4b5.ts",
  "infografis-k4b5.tsx", "video-k4b5a.tsx", "video-k4b5b.tsx",
  "SubBabK4B5A.tsx", "SubBabK4B5B.tsx", "bantu-k4b5.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k4b5.ts", "naskah-k4b5.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k4b5.ts");
cek("registri: mtk-4-bab5 dimuat malas", /"mtk-4-bab5": \(\) => import\("\.\/paket-k4b5"\)/.test(registri));
cek("paket: sub-bab A–B lengkap", ["A", "B"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK4B5${k}, peta: PETA_PIKIRAN_K4B5${k}, Infografis: InfografisK4B5${k}Komponen, Concrete: ConcreteK4B5${k}, Picture: PictureK4B5${k}, Abstract: AbstractK4B5${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-4-bab5", /bab="mtk-4-bab5"/.test(baca("src/app/ruang-belajar/mtk-4-bab5/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_4_BAB5", /JUDUL_MTK_4_BAB5 = "Bab 5: Bangun Datar"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-4-bab5", !/"mtk-4-bab5"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K4B5_META.suaraLaju === 0.7 && N.K4B5_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k4b5a.tsx", N.SUB_A45], ["B", "video-k4b5b.tsx", N.SUB_B45]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}45.videos`));
}

const json = JSON.parse(baca("src/data/kelas4-bab5.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_B grade 4", json.chapter_id === "k4-mat-bab5" && json.phase_code === "FASE_B" && json.grade === 4);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas4_bab5_keys.sql"));

console.log(`uji-statis-k4b5: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
