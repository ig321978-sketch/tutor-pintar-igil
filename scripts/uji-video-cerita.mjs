// Uji statis video cerita Kelas 2 Bab 1 (Tahap 1: Story). Jalankan: node scripts/uji-video-cerita.mjs
// Memeriksa: naskah terpecah utuh menjadi kalimat, papan judul tiap ketukan ada, pemasangan di pemutar,
// dan video tidak memanggil jaringan atau layanan suara berbayar.
import fs from "node:fs";

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

const kalimatDari = (teks) => (teks.match(/[^.!?]+[.!?]+/g) ?? [teks]).map((k) => k.trim()).filter(Boolean);

const SET = [
  { kode: "A", awalan: "K2A", gambar: "gambar-hitung-k2a.tsx", video: "video-cerita-k2a.tsx", harapan: [9, 8, 9, 13, 8, 5], komponen: "VideoHitungK2A" },
  { kode: "B", awalan: "K2B", gambar: "gambar-nilai-k2b.tsx", video: "video-cerita-k2b.tsx", harapan: [7, 7, 6, 6, 7, 9], komponen: "VideoNilaiK2B" },
  { kode: "C", awalan: "K2C", gambar: "gambar-banding-k2c.tsx", video: "video-cerita-k2c.tsx", harapan: [7, 5, 7, 7, 8, 8], komponen: "VideoBandingK2C" },
];

const pemutar = baca("src/components/IgilModulePlayer.tsx");
const mesin = baca("src/components/modul/video-cerita.tsx");

for (const s of SET) {
  const gambar = baca(`src/components/modul/${s.gambar}`);
  const video = baca(`src/components/modul/${s.video}`);
  const adegan = [...gambar.matchAll(new RegExp(`id: "(${s.awalan}-S\\d)",\\s*sceneType: "([^"]+)",\\s*voiceNarration:\\s*"([^"]+)"`, "g"))];
  cek(`${s.kode}: enam adegan di naskah`, adegan.length === 6, `ada ${adegan.length}`);

  adegan.forEach(([, id, , narasi], i) => {
    const kal = kalimatDari(narasi);
    cek(`${id}: gabungan kalimat sama dengan naskah`, kal.join(" ") === narasi);
    cek(`${id}: jumlah ketukan ${s.harapan[i]}`, kal.length === s.harapan[i], `ada ${kal.length}`);
    cek(`${id}: tiap kalimat tidak lebih dari 190 huruf`, kal.every((k) => k.length <= 190));
    const papan = video.match(new RegExp(`const PAPAN_${i + 1} = \\[([\\s\\S]*?)\\];`));
    const jumlahPapan = papan ? [...papan[1].matchAll(/"[^"]+"/g)].length : -1;
    cek(`${id}: papan judul per ketukan lengkap`, jumlahPapan === kal.length, `papan ${jumlahPapan}, ketukan ${kal.length}`);
  });

  cek(`${s.kode}: ADEGAN_VIDEO_K2${s.kode} dibuat dari CERITA_K2${s.kode}`, video.includes(`CERITA_K2${s.kode}.map(`));
  cek(`${s.kode}: komponen ${s.komponen} diekspor`, video.includes(`export function ${s.komponen}(`));
  cek(`${s.kode}: muka memakai DaftarVideoCerita`, /DaftarVideoCerita/.test(video) && new RegExp(`return <DaftarVideoCerita videos=\\{VIDEO_SIAP_K2${s.kode}\\}`).test(video));
  cek(`${s.kode}: tiga video muka (slice 0-2, 2-4, 4-6)`, /slice\(0,\s*2\)/.test(video) && /slice\(2,\s*4\)/.test(video) && /slice\(4,\s*6\)/.test(video));
  cek(`${s.kode}: komponen ${s.komponen} dipasang di MODUL_SUBBAB`, new RegExp(`"mtk-2-bab1-${s.kode}":\\s*\\{\\s*Cerita: ${s.komponen}\\b`).test(pemutar));
  cek(`${s.kode}: pemutar mengimpor ${s.komponen}`, pemutar.includes(`import { ${s.komponen} } from "@/components/modul/video-cerita-k2${s.kode.toLowerCase()}"`));
  cek(`${s.kode}: tanpa jaringan atau layanan suara`, !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest/i.test(video));
}

cek("mesin: tanpa jaringan atau layanan suara", !/fetch\(|\/api\/|elevenlabs|XMLHttpRequest/i.test(mesin));
cek("mesin: suara dihentikan saat dilepas", /hentikanSuaraGuruModul\(\)/.test(mesin));
cek("mesin: ada Jeda, Ulang, Suara", /Jeda/.test(mesin) && /Ulang/.test(mesin) && /Suara:/.test(mesin));
cek("mesin: jeda otomatis saat layar disembunyikan", /visibilitychange/.test(mesin));
cek("mesin: pengaman bila suara tidak melapor selesai", /batas = kalimat\.length \* 150/.test(mesin));
cek("pemutar: slide Cerita K2 lama tidak dipasang lagi", !/Cerita: (CeritaHitungK2A|CeritaNilaiK2B|CeritaBandingK2C)/.test(pemutar));

console.log(`\nVideo cerita: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
