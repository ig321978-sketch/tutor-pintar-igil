// Uji statis Matematika Kelas 5 Bab 1 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k5b1.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k5b1.ts";

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
  "naskah-k5b1.ts", "data-k5b1.ts", "diagram-k5b1.tsx", "kit-k5b1.tsx", "paket-k5b1.ts",
  "infografis-k5b1.tsx", "video-k5b1a.tsx", "video-k5b1b.tsx", "video-k5b1c.tsx", "video-k5b1d.tsx",
  "SubBabK5B1A.tsx", "SubBabK5B1B.tsx", "SubBabK5B1C.tsx", "SubBabK5B1D.tsx", "bantu-k5b1.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k5b1.ts", "naskah-k5b1.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k5b1.ts");
cek("registri: mtk-5-bab1 dimuat malas", /"mtk-5-bab1": \(\) => import\("\.\/paket-k5b1"\)/.test(registri));
cek("paket: sub-bab A–D lengkap", ["A", "B", "C", "D"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK5B1${k}, peta: PETA_PIKIRAN_K5B1${k}, Infografis: InfografisK5B1${k}Komponen, Concrete: ConcreteK5B1${k}, Picture: PictureK5B1${k}, Abstract: AbstractK5B1${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-5-bab1", /bab="mtk-5-bab1"/.test(baca("src/app/ruang-belajar/mtk-5-bab1/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_5_BAB1", /JUDUL_MTK_5_BAB1 = "Bab 1: Bilangan Cacah sampai 100.000"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-5-bab1", !/"mtk-5-bab1"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K5B1_META.suaraLaju === 0.7 && N.K5B1_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k5b1a.tsx", N.SUB_A51], ["B", "video-k5b1b.tsx", N.SUB_B51], ["C", "video-k5b1c.tsx", N.SUB_C51], ["D", "video-k5b1d.tsx", N.SUB_D51]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}51.videos`));
}

const json = JSON.parse(baca("src/data/kelas5-bab1.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 5", json.chapter_id === "k5-mat-bab1" && json.phase_code === "FASE_C" && json.grade === 5);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–D", Object.keys(json.subBabs).join() === "A,B,C,D");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas5_bab1_keys.sql"));

console.log(`uji-statis-k5b1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
