// Uji statis Modul Kedua Matematika Kelas 4 Bab 1 (hanya Sub-Bab A, naskah orisinal IGIL).
// Turunan scripts/uji-statis-k4b1.mjs; Modul Kesatu tidak disentuh. Jalankan: node --no-warnings scripts/uji-statis-k4b1-kedua.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k4b1-kedua.ts";

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
  "naskah-k4b1-kedua.ts", "data-k4b1-kedua.ts", "paket-k4b1-kedua.ts", "infografis-k4b1-kedua.tsx", "video-k4b1ka.tsx", "SubBabK4B1KA.tsx",
  "lab-kemasan-k4b1ka.ts", "mesin-data-k4b1ka.ts", "skenario-k4b1ka.ts", "misi-k4b1ka.ts", "misi-teks-k4b1ka.ts", "SimulasiK4B1Kedua.tsx", "SimulasiLabKemasanK4KA.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random`, !/Math\.random/.test(t));
  cek(`${b}: tanpa karakter CR (akhir baris LF)`, !t.includes("\r"));
  cek(`${b}: tidak mengimpor kerangka Modul Kedua Kelas 1`, !/modul-kedua/.test(t));
  cek(`${b}: tidak mengimpor berkas Modul Kesatu yang berubah per sub-bab (naskah, data, infografis, skenario, misi K4B1)`, !/from "\.\/(naskah-k4b1|data-k4b1|infografis-k4b1|skenario-k4b1-|misi-k4bab1|misi-teks-k4b1|mesin-data-k4b1-|lab-kemasan-k4b1a)"/.test(t));
}
for (const b of ["data-k4b1-kedua.ts", "naskah-k4b1-kedua.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k4b1-kedua.ts");
cek("registri: mtk-4-bab1-kedua dimuat malas", /"mtk-4-bab1-kedua": \(\) => import\("\.\/paket-k4b1-kedua"\)/.test(registri));
cek("registri: Modul Kesatu tetap", /"mtk-4-bab1": \(\) => import\("\.\/paket-k4b1"\)/.test(registri));
cek("paket: hanya sub-bab A", /A: \{ Cerita: VideoK4B1KA, peta: SUB_KA41\.mindMaps, Infografis: InfografisK4B1KAKomponen, Concrete: ConcreteK4B1KA, Picture: PictureK4B1KA, Abstract: AbstractK4B1KA, uraianPeta: true \}/.test(paket) && !/\bB: \{/.test(paket));
cek("halaman: /ruang-belajar/mtk-4-bab1-kedua", /bab="mtk-4-bab1-kedua"/.test(baca("src/app/ruang-belajar/mtk-4-bab1-kedua/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: JUDUL_MTK_4_BAB1_KEDUA", /JUDUL_MTK_4_BAB1_KEDUA = "Bab 1: Bilangan Cacah sampai 10\.000 \(Modul Kedua\)"/.test(kur));
cek("kurikulum: Modul Kedua tepat setelah Modul Kesatu", /Matematika: \[JUDUL_MTK_4_BAB1, JUDUL_MTK_4_BAB1_KEDUA, JUDUL_MTK_4_BAB2/.test(kur));
const hal = baca("src/app/ruang-belajar/page.tsx");
cek("ruang-belajar: rute dropdown Modul Kedua", /\[JUDUL_MTK_4_BAB1_KEDUA\]: "\/ruang-belajar\/mtk-4-bab1-kedua"/.test(hal));
const sim = baca("src/components/modul/registri-simulasi.ts");
cek("registri simulasi: SIMULASI_MATERI, misi awal, RINGKAS_BAB", /"mtk-4-bab1-kedua": SimulasiK4B1KeduaMateri/.test(sim) && /"mtk-4-bab1-kedua": misiAwalK4B1KA/.test(sim) && /"mtk-4-bab1-kedua": ringkasK4B1KA\.subBab/.test(sim));

cek("naskah: laju 0,70 dan nada 1", N.K4B1KA_META.suaraLaju === 0.7 && N.K4B1KA_META.suaraNada === 1);
cek("naskah: id bab kedua", N.K4B1KA_META.chapterId === "k4-mat-bab1-kedua");
cek("naskah A: video lama dihapus (videos kosong)", N.SUB_KA41.videos.length === 0);
cek("naskah A: 30 permainan, sepuluh per tahap", N.SUB_KA41.games.length === 30 && ["Concrete", "Picture", "Abstract"].every((st) => N.SUB_KA41.games.filter((g) => g.stage === st).length === 10));

const video = baca("src/components/modul/video-k4b1ka.tsx");
cek("video: DaftarVideoCerita tanpa mulaiLangsung", /DaftarVideoCerita/.test(video) && !/mulaiLangsung/.test(video));
cek("video: dua video dari mesin Story", /VIDEO_MATERI_K4B1KA/.test(video) && /VIDEO_LUAR_K4B1KA/.test(video));

const json = JSON.parse(baca("src/data/kelas4-bab1-kedua.json"));
cek("JSON: chapter_id kedua", json.chapter_id === "k4-mat-bab1-kedua" && json.chapterId === "k4-mat-bab1-kedua");
cek("JSON: hanya sub-bab A", Object.keys(json.subBabs).join() === "A");
cek("JSON: practiceQuestions kosong (sama dengan Modul Kesatu)", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions", !("examQuestions" in json) && !("examPackages" in json));
cek("JSON: tanpa kunci", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: tanpa sebutan buku sebagai tokoh atau sumber kutipan", !/\bkutipan\b/i.test(JSON.stringify(json)));
const ringkas = JSON.parse(baca("src/data/kelas4-bab1-kedua-ringkas.json"));
cek("ringkas: hanya sub-bab A", Object.keys(ringkas.subBab).join() === "A" && ringkas.chapter_id === "mtk-4-bab1-kedua");

// Modul Kesatu tidak menyebut bab kedua.
const pemutar = baca("src/components/IgilModulePlayer.tsx");
cek("pemutar: tipe BabBaru memuat mtk-4-bab1-kedua", /\| "mtk-4-bab1-kedua"/.test(pemutar));

console.log(`uji-statis-k4b1-kedua: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
