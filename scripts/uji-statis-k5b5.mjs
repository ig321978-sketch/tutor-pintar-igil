// Uji statis Matematika Kelas 5 Bab 5 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k5b5.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k5b5.ts";

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
  "naskah-k5b5.ts", "data-k5b5.ts", "kit-k5b5.tsx", "paket-k5b5.ts",
  "infografis-k5b5.tsx", "video-k5b5a.tsx", "video-k5b5b.tsx", "video-k5b5c.tsx", "video-k5b5d.tsx",
  "SubBabK5B5A.tsx", "SubBabK5B5B.tsx", "SubBabK5B5C.tsx", "SubBabK5B5D.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k5b5.ts", "naskah-k5b5.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k5b5.ts");
cek("registri: mtk-5-bab5 dimuat malas", /"mtk-5-bab5": \(\) => import\("\.\/paket-k5b5"\)/.test(registri));
cek("paket: sub-bab A–D lengkap", ["A", "B", "C", "D"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK5B5${k}, peta: PETA_PIKIRAN_K5B5${k}, Infografis: InfografisK5B5${k}Komponen, Concrete: ConcreteK5B5${k}, Picture: PictureK5B5${k}, Abstract: AbstractK5B5${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-5-bab5", /bab="mtk-5-bab5"/.test(baca("src/app/ruang-belajar/mtk-5-bab5/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_5_BAB5", /JUDUL_MTK_5_BAB5 = "Bab 5: Luas Daerah Bangun Datar"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-5-bab5", !/"mtk-5-bab5"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K5B5_META.suaraLaju === 0.7 && N.K5B5_META.suaraNada === 1);
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(baca("src/components/modul/video-cerita.tsx")));

for (const [kode, berkas, sub] of [["A", "video-k5b5a.tsx", N.SUB_A55], ["B", "video-k5b5b.tsx", N.SUB_B55], ["C", "video-k5b5c.tsx", N.SUB_C55], ["D", "video-k5b5d.tsx", N.SUB_D55]]) {
  const t = baca(`src/components/modul/${berkas}`);
  // Dua video baru per sub-bab (materi kurikulum dan metode luar), diuji lengkap di scripts/uji-story-k5b5a.mjs sampai d. Naskah video lama dihapus.
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: dua video baru dari mesin Story`, new RegExp(`VIDEO_MATERI_K5B5${kode}`).test(t) && new RegExp(`VIDEO_LUAR_K5B5${kode}`).test(t) && !new RegExp(`SUB_${kode}55`).test(t));
  cek(`naskah ${kode}: video lama dihapus (videos kosong)`, sub.videos.length === 0);
}

const json = JSON.parse(baca("src/data/kelas5-bab5.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_C grade 5", json.chapter_id === "k5-mat-bab5" && json.phase_code === "FASE_C" && json.grade === 5);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–D", Object.keys(json.subBabs).join() === "A,B,C,D");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas5_bab5_keys.sql"));

console.log(`uji-statis-k5b5: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
