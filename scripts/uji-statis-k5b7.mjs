// Uji statis Matematika Kelas 5 Bab 7 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k5b7.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k5b7.ts";

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
  "naskah-k5b7.ts", "data-k5b7.ts", "kit-k5b7.tsx", "paket-k5b7.ts",
  "infografis-k5b7.tsx", "video-k5b7a.tsx", "video-k5b7b.tsx",
  "SubBabK5B7A.tsx", "SubBabK5B7B.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k5b7.ts", "naskah-k5b7.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k5b7.ts");
cek("registri: mtk-5-bab7 dimuat malas", /"mtk-5-bab7": \(\) => import\("\.\/paket-k5b7"\)/.test(registri));
cek("paket: sub-bab A–B lengkap", ["A", "B"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK5B7${k}, peta: PETA_PIKIRAN_K5B7${k}, Infografis: InfografisK5B7${k}Komponen, Concrete: ConcreteK5B7${k}, Picture: PictureK5B7${k}, Abstract: AbstractK5B7${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-5-bab7", /bab="mtk-5-bab7"/.test(baca("src/app/ruang-belajar/mtk-5-bab7/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_5_BAB7", /JUDUL_MTK_5_BAB7 = "Bab 7: Membandingkan Ciri-Ciri Bangun Datar"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-5-bab7", !/"mtk-5-bab7"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K5B7_META.suaraLaju === 0.7 && N.K5B7_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k5b7a.tsx", N.SUB_A57], ["B", "video-k5b7b.tsx", N.SUB_B57]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}57.videos`));
}

const json = JSON.parse(baca("src/data/kelas5-bab7.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 5", json.chapter_id === "k5-mat-bab7" && json.phase_code === "FASE_C" && json.grade === 5);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas5_bab7_keys.sql"));

console.log(`uji-statis-k5b7: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
