// Uji statis Matematika Kelas 6 Bab 3 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k6b3.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k6b3.ts";

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
  "naskah-k6b3.ts", "data-k6b3.ts", "kit-k6b3.tsx", "paket-k6b3.ts",
  "infografis-k6b3.tsx", "video-k6b3a.tsx", "video-k6b3b.tsx", "video-k6b3c.tsx",
  "SubBabK6B3A.tsx", "SubBabK6B3B.tsx", "SubBabK6B3C.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k6b3.ts", "naskah-k6b3.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k6b3.ts");
cek("registri: mtk-6-bab3 dimuat malas", /"mtk-6-bab3": \(\) => import\("\.\/paket-k6b3"\)/.test(registri));
cek("paket: sub-bab A–C lengkap", ["A", "B", "C"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK6B3${k}, peta: PETA_PIKIRAN_K6B3${k}, Infografis: InfografisK6B3${k}Komponen, Concrete: ConcreteK6B3${k}, Picture: PictureK6B3${k}, Abstract: AbstractK6B3${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-6-bab3", /bab="mtk-6-bab3"/.test(baca("src/app/ruang-belajar/mtk-6-bab3/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_6_BAB3", /JUDUL_MTK_6_BAB3/.test(kur) && /Bab 3: Kubus dan Balok/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-6-bab3", !/"mtk-6-bab3"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K6B3_META.suaraLaju === 0.7 && N.K6B3_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k6b3a.tsx", N.SUB_A63], ["B", "video-k6b3b.tsx", N.SUB_B63], ["C", "video-k6b3c.tsx", N.SUB_C63]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}63.videos`));
}

const json = JSON.parse(baca("src/data/kelas6-bab3.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 6", json.chapter_id === "k6-mat-bab3" && json.phase_code === "FASE_C" && json.grade === 6);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–C", Object.keys(json.subBabs).join() === "A,B,C");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas6_bab3_keys.sql"));

console.log(`uji-statis-k6b3: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
