// Uji statis Matematika Kelas 3 Bab 5, Penyajian Data dalam Tabel (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k3b5.mjs
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k3b5.ts";

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

const pemutar = baca("src/components/IgilModulePlayer.tsx");
const suaraLib = baca("src/lib/suara-guru-modul.ts");
const mesinVideo = baca("src/components/modul/video-cerita.tsx");

const BERKAS = ["naskah-k3b5.ts", "data-k3b5.ts", "dasar-k3b5.tsx", "diagram-k3b5.tsx", "kit-k3b5.tsx", "paket-k3b5.ts", "infografis-k3b5.tsx", "video-k3b5-umum.tsx", "video-k3b5a.tsx", "video-k3b5b.tsx", "SubBabK3B5A.tsx", "SubBabK3B5B.tsx"];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t));
  cek(`${b}: tanpa emoji Unicode 13 ke atas (tidak tampil di Windows 10)`, !/[\u{1FAA0}-\u{1FAFF}\u{1F7F0}]/u.test(t));
}
for (const b of ["data-k3b5.ts", "naskah-k3b5.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
  cek(`${b}: tanpa React`, !/from "react"/.test(t));
}

const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k3b5.ts");
cek("registri: mtk-3-bab5 dimuat malas lewat import dinamis", /"mtk-3-bab5": \(\) => import\("\.\/paket-k3b5"\)/.test(registri));
cek("pemutar: paket Kelas 3 Bab 5 tidak diimpor langsung", !/kelas3-bab5|k3b5/i.test(pemutar));
cek("paket: sub-bab A dan B lengkap", ["A", "B"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK3B5${k}, peta: PETA_PIKIRAN_K3B5${k}, Infografis: InfografisK3B5${k}Komponen, Concrete: ConcreteK3B5${k}, Picture: PictureK3B5${k}, Abstract: AbstractK3B5${k}, uraianPeta: true`).test(paket)));
cek("halaman: /ruang-belajar/mtk-3-bab5 memakai PemutarBabBaru", /bab="mtk-3-bab5"/.test(baca("src/app/ruang-belajar/mtk-3-bab5/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: judul Kelas 3 Bab 5 terpasang", /JUDUL_MTK_3_BAB5 = "Bab 5: Penyajian Data dalam Tabel"/.test(kur) && /JUDUL_MTK_3_BAB5/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat bab Kelas 3 Bab 5", !/"mtk-3-bab5"/.test(pemutar));

cek("naskah: laju 0,70 dan nada 1", N.K3B5_META.suaraLaju === 0.7 && N.K3B5_META.suaraNada === 1);
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));
cek("video: mesin punya mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));

for (const [kode, berkas, sub] of [["A", "video-k3b5a.tsx", N.SUB_A35], ["B", "video-k3b5b.tsx", N.SUB_B35]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const adegan = sub.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: memakai DaftarVideoCerita, tanpa putar otomatis`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}35.videos`));
  const poster = [...t.matchAll(/\{ a: (\d+), k: (\d+) \}/g)].map((m) => ({ a: Number(m[1]), k: Number(m[2]) }));
  cek(`video ${kode}: tiga poster menunjuk adegan dan ketukan yang ada`, poster.length === 3 && poster.every((p, vi) => !!sub.videos[vi]?.adegan[p.a] && p.k < sub.videos[vi].adegan[p.a].ketukan.length));
}

const json = JSON.parse(baca("src/data/kelas3-bab5.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id, phase_code, grade", json.chapter_id === "k3-mat-bab5" && json.phase_code === "FASE_B" && json.grade === 3);
cek("JSON: laju 0,70 dan nada 1, suara perangkat saja", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A dan B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan dan 9 cerita", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9 && s.mindMaps.length === 8 && s.infografisData.length === 10));
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas3_bab5_keys.sql"));

const bendaNyata = /\bTumpukanBenda\b|\bKartuAnakBenda\b|\bBarisAnakBenda\b|\bTumpukanLidi\b|\bDeretManik\b|\bKartuAnggotaManik\b|\bKumpulan\b|dasar-k3b5/;
const emojiBenda = /[\u{1F34E}\u{1F3C0}\u{1F36A}\u{1F4D6}\u{270F}\u{1FAB5}\u{1F534}\u{1F535}\u{26AB}]/u;
const iris = (t, dari, sampai) => {
  const a = t.indexOf(dari);
  const b = t.indexOf(sampai, a + 10);
  return a >= 0 && b > a ? t.slice(a, b) : "";
};

for (const [nama, berkas] of [["A", "SubBabK3B5A.tsx"], ["B", "SubBabK3B5B.tsx"]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const concrete = iris(t, "/* ------------------------------ Concrete", "/* ------------------------------ Picture");
  const picture = iris(t, "/* ------------------------------ Picture", "/* ------------------------------ Abstract");
  const abstrak = iris(t, "/* ------------------------------ Abstract", "/* ------------------------------ Pembungkus");
  cek(`SubBabK3B5${nama}: ketiga bagian tahap ada`, concrete.length > 1500 && picture.length > 1500 && abstrak.length > 1500, `${concrete.length}/${picture.length}/${abstrak.length}`);
  cek(`SubBabK3B5${nama}: Picture tanpa benda nyata`, !bendaNyata.test(picture), (picture.match(bendaNyata) ?? [""])[0]);
  cek(`SubBabK3B5${nama}: Picture tanpa emoji benda`, !emojiBenda.test(picture), (picture.match(emojiBenda) ?? [""])[0]);
  cek(`SubBabK3B5${nama}: Abstract tanpa benda nyata dan emoji benda`, !bendaNyata.test(abstrak) && !emojiBenda.test(abstrak));
  cek(`SubBabK3B5${nama}: Concrete memakai benda nyata`, bendaNyata.test(concrete));
  const catatan = t.split("\n").filter((b) => /CatatanTempel/.test(b));
  cek(`SubBabK3B5${nama}: catatan Picture ada dan tanpa emoji benda`, catatan.length >= 10 && catatan.every((b) => !emojiBenda.test(b)), `ada ${catatan.length}`);
  cek(`SubBabK3B5${nama}: penomoran 1 sampai 30`, /nomor: i \+ 1/.test(t) && /nomor: i \+ 11/.test(t) && /nomor: i \+ 21/.test(t));
  cek(`SubBabK3B5${nama}: tiap permainan memakai key={r} dan onBeres`, (t.match(/key=\{r\}/g) ?? []).length >= 28 && (t.match(/onBeres=\{(?:\(\) => )?beres(?:\(\))?\}/g) ?? []).length >= 28);
}

{
  const t = baca("src/components/modul/diagram-k3b5.tsx");
  cek("diagram-k3b5.tsx: tidak mengimpor gambar benda dan tanpa emoji benda", !/dasar-k3b5|TumpukanBenda|DeretManik/.test(t) && !emojiBenda.test(t));
  const d = baca("src/components/modul/dasar-k3b5.tsx");
  cek("dasar-k3b5.tsx: memakai gambar benda tahap Concrete", /TumpukanBenda/.test(d) && /TumpukanLidi/.test(d));
}
for (const s of N.SUB_BAB_K3B5) for (const g of s.games.filter((x) => x.stage === "Picture")) cek(`naskah ${s.id}: Picture "${g.title}" tanpa emoji`, !/\p{Extended_Pictographic}/u.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide}`));

for (const f of ["mtk-3-bab5-sub-a-mengurutkan-membandingkan-data.md", "mtk-3-bab5-sub-b-menyajikan-data-bentuk-tabel.md", "mtk-3-bab5-video-cerita.md"]) cek(`naskah/${f} ada`, fs.existsSync(`naskah/${f}`));

console.log(`\nUji statis Kelas 3 Bab 5: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
