// Uji statis Matematika Kelas 3 Bab 2, Kalimat Matematika (Materi saja). Jalankan: node --no-warnings scripts/uji-statis-k3b2.mjs
// Memeriksa: berkas data murni, pemasangan paket bab (registri, pemutar malas, halaman, kurikulum), video satu per satu saat diketuk,
// suara perangkat murni (laju 0,70 dan nada 1), tanpa jaringan dan layanan suara berbayar, tanpa soal Latihan/Ujian dan simulasi,
// batas Concrete dan Picture, serta tiga puluh permainan per sub-bab terpasang lengkap.
import fs from "node:fs";
import * as N from "../src/components/modul/naskah-k3b2.ts";

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

const BERKAS = ["naskah-k3b2.ts", "data-k3b2.ts", "dasar-k3b2.tsx", "diagram-k3b2.tsx", "kit-k3b2.tsx", "paket-k3b2.ts", "infografis-k3b2.tsx", "video-k3b2-umum.tsx", "video-k3b2a.tsx", "video-k3b2b.tsx", "SubBabK3B2.tsx"];
for (const b of BERKAS) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: tanpa jaringan atau layanan suara berbayar`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest|axios/i.test(t));
  cek(`${b}: tanpa Math.random (aman untuk render server)`, !/Math\.random/.test(t));
  cek(`${b}: tanpa nilai tukar rupiah`, !/rupiah|Rp\s?\d|\bkurs\b/i.test(t));
  cek(`${b}: tanpa emoji Unicode 13 ke atas (tidak tampil di Windows 10)`, !/[\u{1FAA0}-\u{1FAFF}\u{1F7F0}]/u.test(t));
}
for (const b of ["data-k3b2.ts", "naskah-k3b2.ts"]) {
  const t = baca(`src/components/modul/${b}`);
  cek(`${b}: murni, hanya import type`, !/^import (?!type)/m.test(t));
  cek(`${b}: tanpa React`, !/from "react"/.test(t));
}

/* ---- Pemasangan paket bab (dimuat malas) ---- */
const registri = baca("src/components/modul/registri-bab-baru.ts");
const paket = baca("src/components/modul/paket-k3b2.ts");
cek("registri: mtk-3-bab2 dimuat malas lewat import dinamis", /"mtk-3-bab2": \(\) => import\("\.\/paket-k3b2"\)/.test(registri));
cek("pemutar: paket Kelas 3 Bab 2 tidak diimpor langsung (tidak membengkakkan bundel bab lain)", !/kelas3-bab2|k3b2/i.test(pemutar));
cek("paket: sub-bab A dan B dengan video, peta, infografis, Concrete, Picture, Abstract", ["A", "B"].every((k) => new RegExp(`${k}: \\{ Cerita: VideoK3B2${k}, peta: PETA_PIKIRAN_K3B2${k}, Infografis: InfografisK3B2${k}Komponen, Concrete: ConcreteK3B2${k}, Picture: PictureK3B2${k}, Abstract: AbstractK3B2${k}, uraianPeta: true`).test(paket)));
cek("paket: emoji sub-bab A dan B", /A: \{ emoji: "➕" \}/.test(paket) && /B: \{ emoji: "➖" \}/.test(paket));
cek("halaman: /ruang-belajar/mtk-3-bab2 memakai PemutarBabBaru", /bab="mtk-3-bab2"/.test(baca("src/app/ruang-belajar/mtk-3-bab2/page.tsx")));
const kur = baca("src/lib/kurikulum.ts");
cek("kurikulum: judul Kelas 3 Bab 2 terpasang", /JUDUL_MTK_3_BAB2 = "Bab 2: Kalimat Matematika"/.test(kur) && /"3 SD": \{\s*Matematika: \[JUDUL_MTK_3_BAB1, JUDUL_MTK_3_BAB2\]/.test(kur));
cek("pemutar: SIMULASI_BAB tidak memuat bab Kelas 3", !/"mtk-3-bab2"/.test(pemutar));

/* ---- Suara: murni Web Speech perangkat, laju 0,70, nada 1 ---- */
cek("naskah: laju 0,70 dan nada 1", N.K3B2_META.suaraLaju === 0.7 && N.K3B2_META.suaraNada === 1);
cek("suara: jalur perangkatSaja tidak memanggil layanan suara berbayar", /if \(opsi\.perangkatSaja\) \{\s*cadangan\(\);\s*return;\s*\}/.test(suaraLib));

/* ---- Video: satu per satu saat diketuk ---- */
cek("video: mesin punya mulaiLangsung bawaan false", /mulaiLangsung = false/.test(mesinVideo));
cek("video: video tidak berjalan sebelum Putar", /aktif === v\.naskah\.id \?[\s\S]*mulaiLangsung/.test(umumB2) && (umumB2.match(/mulaiLangsung/g) ?? []).length === 1);
for (const [kode, berkas] of [["A", "video-k3b2a.tsx"], ["B", "video-k3b2b.tsx"]]) {
  const t = baca(`src/components/modul/${berkas}`);
  const s = N.SUB_BAB_K3B2.find((x) => x.id === kode);
  const adegan = s.videos.flatMap((v) => v.adegan);
  cek(`video ${kode}: 9 adegan di naskah`, adegan.length === 9);
  cek(`video ${kode}: adegan memakai papan naskah`, (t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length === 9, `ada ${(t.match(/papan\(\d, \d\)\[k\]/g) ?? []).length}`);
  cek(`video ${kode}: satu sumber naskah`, t.includes(`SUB_${kode}32.videos`));
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
const json = JSON.parse(baca("src/data/kelas3-bab2.json"));
cek("JSON: practiceQuestions kosong", Array.isArray(json.practiceQuestions) && json.practiceQuestions.length === 0);
cek("JSON: tanpa examQuestions dan examPackages", !("examQuestions" in json) && !("examPackages" in json) && !("exam_questions" in json));
cek("JSON: tanpa kunci jawaban", !/"correct_index"|"correctAnswer"|"explanation"/.test(JSON.stringify(json)));
cek("JSON: tanpa data simulasi", !/simulasi/i.test(JSON.stringify(json)));
cek("JSON: chapter_id, phase_code, grade", json.chapter_id === "k3-mat-bab2" && json.phase_code === "FASE_B" && json.grade === 3);
cek("JSON: laju 0,70 dan nada 1, suara perangkat saja", json.suaraLaju === 0.7 && json.suaraNada === 1 && json.suaraPerangkatSaja === true);
cek("JSON: sub-bab A dan B", Object.keys(json.subBabs).join() === "A,B");
cek("JSON: tiap sub-bab 30 permainan dan 9 cerita", Object.values(json.subBabs).every((s) => s.interactiveGames.length === 30 && s.stories.length === 9 && s.mindMaps.length === 8 && s.infografisData.length === 10));
cek("seed server tidak dibuat untuk bab tanpa soal", !fs.existsSync("supabase/seed/02_kelas3_bab2_keys.sql"));

/* ---- Batas Concrete dan Picture ---- */
const bendaNyata = /\bKoleksi\b|KoleksiKM|DuaKoleksi|TambahKoleksi|KurangKoleksi|KelompokBenda|TumpukanBenda|BagiAwal|PiringKosong|KoleksiTiga|KoleksiDari|KelompokKemasan|\bKemasan\b|\bDus\b|\bKelompok\b|dasar-k3b1|dasar-k3b2|BendaB7|\bWadah\b/;
const emojiBenda = /[\u{1F347}\u{1F34A}\u{1F34E}\u{1F34C}\u{1F414}\u{1F410}\u{1F404}\u{1F986}\u{1F697}\u{1F4E6}\u{1F9FA}\u{1F96B}\u{1F361}\u{1F36A}\u{1F349}\u{1F409}\u{1F420}\u{1F7E2}\u{1F534}]/u;
const iris = (t, dari, sampai) => {
  const a = t.indexOf(dari);
  const b = t.indexOf(sampai, a + 10);
  return a >= 0 && b > a ? t.slice(a, b) : "";
};
{
  const t = baca("src/components/modul/SubBabK3B2.tsx");
  const concrete = iris(t, "/* ------------------------------ Concrete", "/* ------------------------------ Picture");
  const picture = iris(t, "/* ------------------------------ Picture", "/* ------------------------------ Abstract");
  const abstrak = iris(t, "/* ------------------------------ Abstract", "/* ------------------------------ Pembungkus");
  cek("SubBabK3B2: ketiga bagian tahap ada", concrete.length > 1500 && picture.length > 1500 && abstrak.length > 1500, `${concrete.length}/${picture.length}/${abstrak.length}`);
  cek("SubBabK3B2: Picture tanpa benda nyata", !bendaNyata.test(picture), (picture.match(bendaNyata) ?? [""])[0]);
  cek("SubBabK3B2: Picture tanpa emoji benda", !emojiBenda.test(picture), (picture.match(emojiBenda) ?? [""])[0]);
  cek("SubBabK3B2: Abstract tanpa benda nyata dan emoji benda", !bendaNyata.test(abstrak) && !emojiBenda.test(abstrak), (abstrak.match(bendaNyata) ?? abstrak.match(emojiBenda) ?? [""])[0]);
  cek("SubBabK3B2: Concrete memakai benda nyata", bendaNyata.test(concrete));
  const catatan = t.split("\n").filter((b) => /CatatanTempel/.test(b));
  cek("SubBabK3B2: catatan Picture ada dan tanpa emoji benda", catatan.length >= 10 && catatan.every((b) => !emojiBenda.test(b)), `ada ${catatan.length}`);
  cek("SubBabK3B2: penomoran 1 sampai 30 dalam tiga tahap", /nomor: i \+ 1,/.test(t) && /nomor: i \+ 11,/.test(t) && /nomor: i \+ 21,/.test(t) && /buatKartu\(J, 30\)/.test(t));
  cek("SubBabK3B2: tiap permainan memakai key={r} dan onBeres", (t.match(/key=\{r\}/g) ?? []).length >= 28 && (t.match(/onBeres=\{(?:\(\) => )?beres(?:\(\))?\}/g) ?? []).length >= 28, `key ${(t.match(/key=\{r\}/g) ?? []).length}, beres ${(t.match(/onBeres=\{(?:\(\) => )?beres(?:\(\))?\}/g) ?? []).length}`);
  const ids = [...t.matchAll(/Kartu\(d, (\d+), `\$\{pre\}-([a-z]+)`/g)];
  cek("SubBabK3B2: 30 kartu, indeks 0 sampai 29 berurutan, id unik", ids.length === 30 && ids.every((m, i) => Number(m[1]) === i) && new Set(ids.map((m) => m[2])).size === 30, `ada ${ids.length}`);
  cek("SubBabK3B2: kedua sub-bab dibuat dari satu pembuat tahap", /buatTahap\("A"/.test(t) && /buatTahap\("B"/.test(t));
}
{
  const t = baca("src/components/modul/diagram-k3b2.tsx");
  cek("diagram-k3b2.tsx: tidak mengimpor gambar benda dan tanpa emoji benda", !/dasar-k3b1|dasar-k3b2|dasar-k2b7|BendaB7|Wadah/.test(t) && !emojiBenda.test(t));
  const d = baca("src/components/modul/dasar-k3b2.tsx");
  cek("dasar-k3b2.tsx: memakai gambar benda tahap Concrete", /KoleksiDari/.test(d) && /KoleksiTiga/.test(d));
}
for (const s of N.SUB_BAB_K3B2) for (const g of s.games.filter((x) => x.stage === "Picture")) cek(`naskah ${s.id}: Picture "${g.title}" tanpa emoji`, !/\p{Extended_Pictographic}/u.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide}`));
const info = baca("src/components/modul/infografis-k3b2.tsx");
cek("infografis: dua puluh visual (10 per sub-bab)", (info.match(/\/\* \d+ [A-Z]/g) ?? []).length === 20, `ada ${(info.match(/\/\* \d+ [A-Z]/g) ?? []).length}`);

/* ---- Naskah md ---- */
for (const f of ["mtk-3-bab2-sub-a-kalimat-matematika-penjumlahan.md", "mtk-3-bab2-sub-b-kalimat-matematika-pengurangan.md", "mtk-3-bab2-video-cerita.md"]) cek(`naskah/${f} ada`, fs.existsSync(`naskah/${f}`));

console.log(`\nUji statis Kelas 3 Bab 2: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
