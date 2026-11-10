// Uji statis Matematika Kelas 4 Bab 1 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k4b1.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k4b1.ts";

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
  "naskah-k4b1.ts", "data-k4b1.ts", "dasar-k4b1.tsx", "diagram-k4b1.tsx", "kit-k4b1.tsx", "paket-k4b1.ts",
  "infografis-k4b1.tsx", "video-k4b1-umum.tsx", "video-k4b1a.tsx", "video-k4b1b.tsx", "video-k4b1c.tsx",
  "video-k4b1d.tsx", "video-k4b1e.tsx", "video-k4b1f.tsx", "video-k4b1g.tsx", "video-k4b1h.tsx", "video-k4b1i.tsx",
  "SubBabK4B1A.tsx", "SubBabK4B1B.tsx", "SubBabK4B1C.tsx", "SubBabK4B1D.tsx", "SubBabK4B1E.tsx", "SubBabK4B1F.tsx",
  "SubBabK4B1G.tsx", "SubBabK4B1H.tsx", "SubBabK4B1I.tsx",
  "bantu-k4b1.tsx", "mesin-k4b1.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k4b1.ts", "naskah-k4b1.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k4b1.ts");
cek("registri: mtk-4-bab1 dimuat malas", /"mtk-4-bab1": \(\) => import\("\.\/paket-k4b1"\)/.test(registri));
cek("paket: sub-bab A–I lengkap", ["A", "B", "C", "D", "E", "F", "G", "H", "I"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK4B1${k}, peta: PETA_PIKIRAN_K4B1${k}, Infografis: InfografisK4B1${k}Komponen, Concrete: ConcreteK4B1${k}, Picture: PictureK4B1${k}, Abstract: AbstractK4B1${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-4-bab1", /bab="mtk-4-bab1"/.test(baca("src/app/ruang-belajar/mtk-4-bab1/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_4_BAB1", /JUDUL_MTK_4_BAB1 = "Bab 1: Bilangan Cacah sampai 10\.000"/.test(kur) && /JUDUL_MTK_4_BAB1/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-4-bab1", !/"mtk-4-bab1"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K4B1_META.suaraLaju === 0.7 && N.K4B1_META.suaraNada === 1);
const mesinVideo = baca("src/components/modul/video-cerita.tsx");
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));

for (const [kode, berkas, sub] of [["A", "video-k4b1a.tsx", N.SUB_A41], ["B", "video-k4b1b.tsx", N.SUB_B41], ["C", "video-k4b1c.tsx", N.SUB_C41], ["D", "video-k4b1d.tsx", N.SUB_D41], ["E", "video-k4b1e.tsx", N.SUB_E41], ["F", "video-k4b1f.tsx", N.SUB_F41], ["G", "video-k4b1g.tsx", N.SUB_G41], ["H", "video-k4b1h.tsx", N.SUB_H41], ["I", "video-k4b1i.tsx", N.SUB_I41]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}41.videos`));
}

const json = JSON.parse(baca("src/data/kelas4-bab1.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_B grade 4", json.chapter_id === "k4-mat-bab1" && json.phase_code === "FASE_B" && json.grade === 4);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–I", Object.keys(json.subBabs).join() === "A,B,C,D,E,F,G,H,I");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas4_bab1_keys.sql"));

console.log(`uji-statis-k4b1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
