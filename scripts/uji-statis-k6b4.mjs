// Uji statis Matematika Kelas 6 Bab 4 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k6b4.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k6b4.ts";

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
  "naskah-k6b4.ts", "data-k6b4.ts", "kit-k6b4.tsx", "paket-k6b4.ts",
  "infografis-k6b4.tsx", "video-k6b4a.tsx", "video-k6b4b.tsx", "skala-peluang.tsx",
  "SubBabK6B4A.tsx", "SubBabK6B4B.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k6b4.ts", "naskah-k6b4.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k6b4.ts");
cek("registri: mtk-6-bab4 dimuat malas", /"mtk-6-bab4": \(\) => import\("\.\/paket-k6b4"\)/.test(registri));
cek("paket: sub-bab A–B lengkap", ["A", "B"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK6B4${k}, peta: PETA_PIKIRAN_K6B4${k}, Infografis: InfografisK6B4${k}Komponen, Concrete: ConcreteK6B4${k}, Picture: PictureK6B4${k}, Abstract: AbstractK6B4${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-6-bab4", /bab="mtk-6-bab4"/.test(baca("src/app/ruang-belajar/mtk-6-bab4/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_6_BAB4", /JUDUL_MTK_6_BAB4/.test(kur) && /Bab 4: Peluang/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-6-bab4", !/"mtk-6-bab4"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K6B4_META.suaraLaju === 0.7 && N.K6B4_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

{
  // Sub-Bab A: dua video baru (materi kurikulum dan metode luar), diuji lengkap di scripts/uji-story-k6b4a.mjs.
  const t = baca("src/components/modul/video-k6b4a.tsx");
  cek("video A: DaftarVideoCerita tanpa mulaiLangsung", /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek("video A: dua video baru dari mesin Story", /VIDEO_MATERI_K6B4A/.test(t) && /VIDEO_LUAR_K6B4A/.test(t) && !/SUB_A64/.test(t));
}
{
  // Sub-Bab B: dua video baru, diuji lengkap di scripts/uji-story-k6b4b.mjs. Naskah video lama dihapus.
  const tb = baca("src/components/modul/video-k6b4b.tsx");
  cek("video B: DaftarVideoCerita tanpa mulaiLangsung", /DaftarVideoCerita/.test(tb) && !/mulaiLangsung/.test(tb));
  cek("video B: dua video baru dari mesin Story", /VIDEO_MATERI_K6B4B/.test(tb) && /VIDEO_LUAR_K6B4B/.test(tb) && !/SUB_B64/.test(tb));
  cek("naskah: video lama dihapus (videos kosong)", N.SUB_A64.videos.length === 0 && N.SUB_B64.videos.length === 0);
}

const json = JSON.parse(baca("src/data/kelas6-bab4.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 6", json.chapter_id === "k6-mat-bab4" && json.phase_code === "FASE_C" && json.grade === 6);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas6_bab4_keys.sql"));

console.log(`uji-statis-k6b4: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
