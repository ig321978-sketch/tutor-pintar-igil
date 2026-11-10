// Uji statis Matematika Kelas 4 Bab 2 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k4b2.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k4b2.ts";

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
  "naskah-k4b2.ts", "data-k4b2.ts", "diagram-k4b2.tsx", "kit-k4b2.tsx", "paket-k4b2.ts",
  "infografis-k4b2.tsx", "video-k4b2-umum.tsx", "video-k4b2a.tsx", "video-k4b2b.tsx", "video-k4b2c.tsx",
  "SubBabK4B2A.tsx", "SubBabK4B2B.tsx", "SubBabK4B2C.tsx", "bantu-k4b2.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k4b2.ts", "naskah-k4b2.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k4b2.ts");
cek("registri: mtk-4-bab2 dimuat malas", /"mtk-4-bab2": \(\) => import\("\.\/paket-k4b2"\)/.test(registri));
cek("paket: sub-bab A–C lengkap", ["A", "B", "C"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK4B2${k}, peta: PETA_PIKIRAN_K4B2${k}, Infografis: InfografisK4B2${k}Komponen, Concrete: ConcreteK4B2${k}, Picture: PictureK4B2${k}, Abstract: AbstractK4B2${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-4-bab2", /bab="mtk-4-bab2"/.test(baca("src/app/ruang-belajar/mtk-4-bab2/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_4_BAB2", /JUDUL_MTK_4_BAB2 = "Bab 2: Pecahan"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-4-bab2", !/"mtk-4-bab2"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K4B2_META.suaraLaju === 0.7 && N.K4B2_META.suaraNada === 1);
const mesinVideo = baca("src/components/modul/video-cerita.tsx");
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));

for (const [kode, berkas, sub] of [["A", "video-k4b2a.tsx", N.SUB_A42], ["B", "video-k4b2b.tsx", N.SUB_B42], ["C", "video-k4b2c.tsx", N.SUB_C42]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}42.videos`));
}

const json = JSON.parse(baca("src/data/kelas4-bab2.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_B grade 4", json.chapter_id === "k4-mat-bab2" && json.phase_code === "FASE_B" && json.grade === 4);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–C", Object.keys(json.subBabs).join() === "A,B,C");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas4_bab2_keys.sql"));

console.log(`uji-statis-k4b2: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
