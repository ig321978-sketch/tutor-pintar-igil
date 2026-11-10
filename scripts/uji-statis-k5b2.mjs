// Uji statis Matematika Kelas 5 Bab 2 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k5b2.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k5b2.ts";

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
  "naskah-k5b2.ts", "data-k5b2.ts", "kit-k5b2.tsx", "paket-k5b2.ts",
  "infografis-k5b2.tsx", "video-k5b2a.tsx", "video-k5b2b.tsx", "video-k5b2c.tsx", "video-k5b2d.tsx", "video-k5b2e.tsx",
  "SubBabK5B2A.tsx", "SubBabK5B2B.tsx", "SubBabK5B2C.tsx", "SubBabK5B2D.tsx", "SubBabK5B2E.tsx", "bantu-k5b2.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k5b2.ts", "naskah-k5b2.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k5b2.ts");
cek("registri: mtk-5-bab2 dimuat malas", /"mtk-5-bab2": \(\) => import\("\.\/paket-k5b2"\)/.test(registri));
cek("paket: sub-bab A–E lengkap", ["A", "B", "C", "D", "E"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK5B2${k}, peta: PETA_PIKIRAN_K5B2${k}, Infografis: InfografisK5B2${k}Komponen, Concrete: ConcreteK5B2${k}, Picture: PictureK5B2${k}, Abstract: AbstractK5B2${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-5-bab2", /bab="mtk-5-bab2"/.test(baca("src/app/ruang-belajar/mtk-5-bab2/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_5_BAB2", /JUDUL_MTK_5_BAB2 = "Bab 2: KPK dan FPB"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-5-bab2", !/"mtk-5-bab2"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K5B2_META.suaraLaju === 0.7 && N.K5B2_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k5b2a.tsx", N.SUB_A52], ["B", "video-k5b2b.tsx", N.SUB_B52], ["C", "video-k5b2c.tsx", N.SUB_C52], ["D", "video-k5b2d.tsx", N.SUB_D52], ["E", "video-k5b2e.tsx", N.SUB_E52]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}52.videos`));
}

const json = JSON.parse(baca("src/data/kelas5-bab2.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 5", json.chapter_id === "k5-mat-bab2" && json.phase_code === "FASE_C" && json.grade === 5);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–E", Object.keys(json.subBabs).join() === "A,B,C,D,E");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas5_bab2_keys.sql"));

console.log(`uji-statis-k5b2: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
