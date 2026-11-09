// Uji statis Matematika Kelas 3 Bab 3, Pengukuran Panjang dan Berat (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k3b3.mjs
// Memeriksa: berkas data murni, pemasangan paket bab (registri, pemutar malas, halaman, kurikulum), video satu per satu saat diketuk,
// suara perangkat murni (laju 0,70 dan nada 1), tanpa jaringan dan layanan suara berbayar, tanpa soal Latihan/Ujian dan simulasi,
// batas Concrete dan Picture, serta tiga puluh permainan per sub-bab terpasang lengkap.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k3b3.ts";

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
const umumB2 = baca("src/components/modul/video-k2b2-umum.tsx");

const SUB = ["A", "B"];
const BERKAS = [
  "naskah-k3b3.ts", "data-k3b3.ts", "dasar-k3b3.tsx", "diagram-k3b3.tsx", "mesin-k3b3.tsx", "kit-k3b3.tsx", "paket-k3b3.ts", "infografis-k3b3.tsx", "video-k3b3-umum.tsx",
  "video-k3b3a.tsx", "video-k3b3b.tsx", "SubBabK3B3A.tsx", "SubBabK3B3B.tsx",
];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t));
  cek(`${b}: tanpa emoji Unicode 13 ke atas (tidak tampil di Windows 10)`, !/[\u{1FAA0}-\u{1FAFF}\u{1F7F0}]/u.test(t));
}
for (const b of ["data-k3b3.ts", "naskah-k3b3.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
  cek(`${b}: tanpa React`, !/from "react"/.test(t));
}

/* ---- Pemasangan paket bab (dimuat malas) ---- */
const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k3b3.ts");
const pemutarBaru = baca("src/components/PemutarBabBaru.tsx");
cek("registri: mtk-3-bab3 dimuat malas lewat import dinamis", /"mtk-3-bab3": \(\) => import\("\.\/paket-k3b3"\)/.test(registri));
cek("PemutarBabBaru: memuat paket lalu menyerahkannya ke pemutar", /MUAT_BAB_BARU\[bab\]/.test(pemutarBaru) && /<IgilModulePlayer bab=\{bab\} paket=\{hasil\.paket\}/.test(pemutarBaru));
cek("pemutar: paket Kelas 3 Bab 3 tidak diimpor langsung (tidak membengkakkan bundel bab lain)", !/kelas3-bab3|k3b3/i.test(pemutar));
cek("paket: sub-bab A dan B dengan video, peta, infografis, Concrete, Picture, Abstract", SUB.every((k) => new RegExp(`${k}: \\{ Cerita: VideoK3B3${k}, peta: PETA_PIKIRAN_K3B3${k}, Infografis: InfografisK3B3${k}Komponen, Concrete: ConcreteK3B3${k}, Picture: PictureK3B3${k}, Abstract: AbstractK3B3${k}, uraianPeta: true`).test(paket)));
cek("paket: emoji sub-bab A dan B", /A: \{ emoji: "📏" \}/.test(paket) && /B: \{ emoji: "📐" \}/.test(paket));
cek("halaman: /ruang-belajar/mtk-3-bab3 memakai PemutarBabBaru", /bab="mtk-3-bab3"/.test(baca("src/app/ruang-belajar/mtk-3-bab3/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: judul Kelas 3 Bab 3 terpasang", /JUDUL_MTK_3_BAB3 = "Bab 3: Pengukuran Panjang dan Berat"/.test(kur) && /"3 SD": \{\s*Matematika: \[JUDUL_MTK_3_BAB1, JUDUL_MTK_3_BAB2, JUDUL_MTK_3_BAB3/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat bab Kelas 3 Bab 3", !/"mtk-3-bab3"/.test(pemutar));

/* ---- Suara ---- */
cek("naskah: laju 0,70 dan nada 1", N.K3B3_META.suaraLaju === 0.7 && N.K3B3_META.suaraNada === 1);
cek("pemutar: laju dan nada dari JSON diteruskan ke suara", /laju: materi\.suaraLaju/.test(pemutar) && /nada: materi\.suaraNada/.test(pemutar));
cek("pemutar: bab memakai suara perangkat saja", /perangkatSaja: materi\.suaraPerangkatSaja === true/.test(pemutar));
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));

/* ---- Video: satu per satu saat diketuk ---- */
cek("video: mesin punya mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));
cek("video: video tidak berjalan sebelum Putar", /aktif === v\.naskah\.id \?[\s\S]*mulaiLangsung/.test(umumB2) && (umumB2.match(/mulaiLangsung/g) ?? []).length === 1);
for (const kode of SUB) {
  const t = baca(`src/components/modul/video-k3b3${kode.toLowerCase()}.tsx`);
  const s = N.SUB_BAB_K3B3.find((x) => x.id === kode);
  const adegan = s.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: adegan memakai papan naskah`, (t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length === 9, `ada ${(t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length}`);
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}33.videos`));
  cek(`video ${kode}: memakai DaftarVideoCerita, tanpa putar otomatis`, /DaftarVideoCerita/.test(t) && !/mulaiLangsung/.test(t));
  s.videos.forEach((v, vi) =>
    v.adegan.forEach((a, ai) => {
      const nama = `${kode}${vi + 1}_${ai + 1}`;
      const i = t.indexOf(`function ${nama}(`);
      cek(`video ${kode}: adegan ${nama} ada`, i >= 0);
      if (i < 0) return;
      const j = t.indexOf("\n}\n", i);
      const badan = t.slice(i, j);
      const maks = Math.max(0, ...[...badan.matchAll(/k\s*(?:===|>=|<=|<|>)\s*(\d+)/g)].map((m) => Number(m[1])));
      cek(`video ${kode}: ${nama} tidak menyebut ketukan di luar naskah`, maks <= a.ketukan.length - 1, `maks ${maks}`);
      cek(`video ${kode}: ${nama} bereaksi terhadap ketukan`, /\bk\b/.test(badan.replace(/papan\(\d, \d\)\[k\]/g, "")));
    }),
  );
  const poster = [...t.matchAll(/\{ a: (\d+), k: (\d+) \}/g)].map((m) => ({ a: Number(m[1]), k: Number(m[2]) }));
  cek(`video ${kode}: tiga poster menunjuk adegan dan ketukan yang ada`, poster.length === 3 && poster.every((p, vi) => !!s.videos[vi]?.adegan[p.a] && p.k < s.videos[vi].adegan[p.a].ketukan.length));
}

/* ---- Tanpa soal Latihan dan Ujian, tanpa simulasi ---- */
const json = JSON.parse(baca("src/data/kelas3-bab3.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id, phase_code, grade", json.chapter_id === "k3-mat-bab3" && json.phase_code === "FASE_B" && json.grade === 3);
cek("JSON: laju 0,70 dan nada 1, suara perangkat saja", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A dan B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan dan 9 cerita", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9 && s.mindMaps.length === 8 && s.infografisData.length === 10));
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas3_bab3_keys.sql"));

/* ---- Batas Concrete dan Picture ---- */
const bendaNyata = /PenggarisBenda|BendaUkur|PitaDari|PitaSusun|dasar-k3b3/;
const emojiBenda = /[\u{270F}\u{1F4D6}\u{1F58A}\u{1F511}\u{1F944}\u{1F6AA}\u{1F6CF}\u{1F6E3}\u{1F4FA}\u{1F333}\u{1F380}\u{1F4CF}\u{1F9F0}\u{1F34E}\u{1F34C}\u{1F4E6}]/u;
const iris = (t, dari, sampai) => {
  const a = t.indexOf(dari);
  const b = t.indexOf(sampai, a + 10);
  return a >= 0 && b > a ? t.slice(a, b) : "";
};
for (const kode of SUB) {
  const t = baca(`src/components/modul/SubBabK3B3${kode}.tsx`);
  const concrete = iris(t, "/* ------------------------------ Concrete", "/* ------------------------------ Picture");
  const picture = iris(t, "/* ------------------------------ Picture", "/* ------------------------------ Abstract");
  const abstrak = iris(t, "/* ------------------------------ Abstract", "/* ------------------------------ Pembungkus");
  cek(`SubBabK3B3${kode}: ketiga bagian tahap ada`, concrete.length > 1500 && picture.length > 1500 && abstrak.length > 1500, `${concrete.length}/${picture.length}/${abstrak.length}`);
  cek(`SubBabK3B3${kode}: Picture tanpa benda nyata`, !bendaNyata.test(picture), (picture.match(bendaNyata) ?? [""])[0]);
  cek(`SubBabK3B3${kode}: Picture tanpa emoji benda`, !emojiBenda.test(picture), (picture.match(emojiBenda) ?? [""])[0]);
  cek(`SubBabK3B3${kode}: Abstract tanpa benda nyata dan emoji benda`, !bendaNyata.test(abstrak) && !emojiBenda.test(abstrak), (abstrak.match(bendaNyata) ?? abstrak.match(emojiBenda) ?? [""])[0]);
  cek(`SubBabK3B3${kode}: Concrete memakai benda nyata`, bendaNyata.test(concrete));
  const catatan = t.split("\n").filter((b) => /CatatanTempel/.test(b));
  cek(`SubBabK3B3${kode}: catatan Picture ada dan tanpa emoji benda`, catatan.length >= 10 && catatan.every((b) => !emojiBenda.test(b)), `ada ${catatan.length}`);
  cek(`SubBabK3B3${kode}: penomoran 1 sampai 30 dalam tiga tahap`, /nomor: i \+ 1,/.test(t) && /nomor: i \+ 11,/.test(t) && /nomor: i \+ 21,/.test(t) && /const TOTAL = 30;/.test(t));
  cek(`SubBabK3B3${kode}: tiap permainan memakai key={r} dan onBeres`, (t.match(/key=\{r\}/g) ?? []).length >= 28 && (t.match(/onBeres=\{(?:\(\) => )?beres(?:\(\))?\}/g) ?? []).length >= 28, `key ${(t.match(/key=\{r\}/g) ?? []).length}, beres ${(t.match(/onBeres=\{(?:\(\) => )?beres(?:\(\))?\}/g) ?? []).length}`);
  const ids = [...t.matchAll(/Kartu\(d, (\d+), "(k3b3[ab]-[a-z]+)"/g)];
  cek(`SubBabK3B3${kode}: 30 kartu, indeks 0 sampai 29 berurutan, id unik`, ids.length === 30 && ids.every((m, i) => Number(m[1]) === i) && new Set(ids.map((m) => m[2])).size === 30, `ada ${ids.length}`);
  cek(`SubBabK3B3${kode}: setiap kartu memakai judul dari naskah`, /const J = SUB_[AB]33\.games\.map\(\(g\) => g\.title\);/.test(t));
}
{
  const d = baca("src/components/modul/diagram-k3b3.tsx");
  cek("diagram-k3b3.tsx: tidak mengimpor gambar benda dan tanpa emoji", !/dasar-k3b3|BendaUkur|PitaSusun/.test(d) && !emojiBenda.test(d) && !/\p{Extended_Pictographic}/u.test(d));
  const m = baca("src/components/modul/mesin-k3b3.tsx");
  cek("mesin-k3b3.tsx: tidak mengimpor gambar benda (aman untuk Picture)", !/dasar-k3b3|BendaUkur|PitaSusun|PenggarisBenda/.test(m));
  const dasar = baca("src/components/modul/dasar-k3b3.tsx");
  cek("dasar-k3b3.tsx: memakai gambar benda tahap Concrete", /BendaUkur/.test(dasar) && /PitaSusun/.test(dasar) && /PenggarisBenda/.test(dasar));
}
for (const s of N.SUB_BAB_K3B3) for (const g of s.games.filter((x) => x.stage === "Picture")) cek(`naskah ${s.id}: Picture "${g.title}" tanpa emoji`, !/\p{Extended_Pictographic}/u.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide}`));
const info = baca("src/components/modul/infografis-k3b3.tsx");
cek("infografis: dua puluh visual (10 per sub-bab)", (info.match(/\/\* \d+ [A-Z0-9]/g) ?? []).length === 20, `ada ${(info.match(/\/\* \d+ [A-Z0-9]/g) ?? []).length}`);

/* ---- Naskah md ---- */
for (const f of ["mtk-3-bab3-sub-a-pengukuran-panjang-satuan-baku.md", "mtk-3-bab3-sub-b-hubungan-satuan-panjang.md", "mtk-3-bab3-video-cerita.md"]) cek(`naskah/${f} ada`, fs.existsSync(`naskah/${f}`));

console.log(`\nUji statis Kelas 3 Bab 3: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
