// Uji statis Matematika Kelas 4 Bab 3 (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k4b3.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k4b3.ts";

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
  "naskah-k4b3.ts", "data-k4b3.ts", "diagram-k4b3.tsx", "kit-k4b3.tsx", "paket-k4b3.ts",
  "infografis-k4b3.tsx", "video-k4b3a.tsx", "video-k4b3b.tsx",
  "SubBabK4B3A.tsx", "SubBabK4B3B.tsx", "bantu-k4b3.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t) || b.startsWith("naskah") || b.startsWith("video"));
}
for (const b of ["data-k4b3.ts", "naskah-k4b3.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k4b3.ts");
cek("registri: mtk-4-bab3 dimuat malas", /"mtk-4-bab3": \(\) => import\("\.\/paket-k4b3"\)/.test(registri));
cek("paket: sub-bab A–B lengkap", ["A", "B"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK4B3${k}, peta: PETA_PIKIRAN_K4B3${k}, Infografis: InfografisK4B3${k}Komponen, Concrete: ConcreteK4B3${k}, Picture: PictureK4B3${k}, Abstract: AbstractK4B3${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-4-bab3", /bab="mtk-4-bab3"/.test(baca("src/app/ruang-belajar/mtk-4-bab3/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_4_BAB3", /JUDUL_MTK_4_BAB3 = "Bab 3: Pola Gambar dan Pola Bilangan"/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat mtk-4-bab3", !/"mtk-4-bab3"/.test(baca("src/components/IgilModulePlayer.tsx")));

cek("naskah: laju 0,70 dan nada 1", N.K4B3_META.suaraLaju === 0.7 && N.K4B3_META.suaraNada === 1);
const mesinVideo = baca("src/components/modul/video-cerita.tsx");
cek("video: mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));

for (const [kode, berkas, sub] of [["A", "video-k4b3a.tsx", N.SUB_A43], ["B", "video-k4b3b.tsx", N.SUB_B43]]) {
  const t = baca(`src/components/modul/${berkas}`);
  // Dua video baru per sub-bab diuji lengkap di scripts/uji-story-k4b3a.mjs dan b. Naskah video lama dihapus.
  cek(`video ${kode}: DaftarVideoCerita tanpa mulaiLangsung di berkas`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: dua video baru dari mesin Story`, new RegExp(`VIDEO_MATERI_K4B3${kode}`).test(t) && new RegExp(`VIDEO_LUAR_K4B3${kode}`).test(t) && !new RegExp(`SUB_${kode}43`).test(t));
  cek(`naskah ${kode}: video lama dihapus (videos kosong)`, sub.videos.length === 0);
}

const json = JSON.parse(baca("src/data/kelas4-bab3.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id FASE_B grade 4", json.chapter_id === "k4-mat-bab3" && json.phase_code === "FASE_B" && json.grade === 4);
cek("JSON: suara 0.7 / 1 perangkat", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A–B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30));
cek("seed tidak dibuat", !fs.existsSync("supabase/seed/02_kelas4_bab3_keys.sql"));

console.log(`uji-statis-k4b3: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
