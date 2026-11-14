// Uji statis Matematika Kelas 5 Bab 3 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k5b3.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k5b3.ts";

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
  "naskah-k5b3.ts", "data-k5b3.ts", "kit-k5b3.tsx", "paket-k5b3.ts",
  "infografis-k5b3.tsx", "video-k5b3a.tsx", "video-k5b3b.tsx", "video-k5b3c.tsx",
  "SubBabK5B3A.tsx", "SubBabK5B3B.tsx", "SubBabK5B3C.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k5b3.ts", "naskah-k5b3.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k5b3.ts");
cek("registri: mtk-5-bab3 dimuat malas", /"mtk-5-bab3": \(\) => import\("\.\/paket-k5b3"\)/.test(registri));
cek("paket: sub-bab A–C lengkap", ["A", "B", "C"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK5B3${k}, peta: PETA_PIKIRAN_K5B3${k}, Infografis: InfografisK5B3${k}Komponen, Concrete: ConcreteK5B3${k}, Picture: PictureK5B3${k}, Abstract: AbstractK5B3${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-5-bab3", /bab="mtk-5-bab3"/.test(baca("src/app/ruang-belajar/mtk-5-bab3/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_5_BAB3", /JUDUL_MTK_5_BAB3 = "Bab 3: Bilangan Pecahan"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-5-bab3", !/"mtk-5-bab3"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K5B3_META.suaraLaju === 0.7 && N.K5B3_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k5b3a.tsx", N.SUB_A53], ["B", "video-k5b3b.tsx", N.SUB_B53], ["C", "video-k5b3c.tsx", N.SUB_C53]]) {
  const t = baca(`src/components/modul/${berkas}`);
  // Dua video baru per sub-bab (materi kurikulum dan metode luar), diuji lengkap di scripts/uji-story-k5b3a.mjs sampai c. Naskah video lama dihapus.
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: dua video baru dari mesin Story`, new RegExp(`VIDEO_MATERI_K5B3${kode}`).test(t) && new RegExp(`VIDEO_LUAR_K5B3${kode}`).test(t) && !new RegExp(`SUB_${kode}53`).test(t));
  cek(`naskah ${kode}: video lama dihapus (videos kosong)`, sub.videos.length === 0);
}

const json = JSON.parse(baca("src/data/kelas5-bab3.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 5", json.chapter_id === "k5-mat-bab3" && json.phase_code === "FASE_C" && json.grade === 5);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–C", Object.keys(json.subBabs).join() === "A,B,C");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas5_bab3_keys.sql"));

console.log(`uji-statis-k5b3: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
