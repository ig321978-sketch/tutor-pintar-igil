// Uji data murni Matematika Kelas 4 Bab 4. Jalankan: node --no-warnings scripts/uji-data-k4b4.mjs
import * as D from "../src/components/modul/data-k4b4.ts";
import * as N from "../src/components/modul/naskah-k4b4.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

cek("cm2DariM2 1 = 10000", D.cm2DariM2(1) === 10000);
cek("mlDariL 1 = 1000", D.mlDariL(1) === 1000);
cek("hitungLuas 2x2", D.hitungLuas([[true, true], [true, true]]) === 4);
cek("hitungVolume 2x2", D.hitungVolume([[1, 1], [1, 1]]) === 4);
cek("teksLuas cm2", D.teksLuas(13, "cm2") === "13 cm²");
cek("teksVol ml", D.teksVol(5, "ml") === "5 ml");
cek("opsiAngka berisi kunci", D.opsiAngka(13, 1).includes(13));

for (const [nama, daftar] of Object.entries(D).filter(([k, v]) => k.startsWith("RONDE_") && Array.isArray(v) && Array.isArray(v[0]))) {
  if (daftar.length === 3) cek(`${nama}: tiga ronde`, true);
}

for (const sub of N.SUB_BAB_K4B4) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: 3 video × 3 adegan`, sub.videos.length === 3 && sub.videos.every((v) => v.adegan.length === 3 && v.adegan.every((a) => a.ketukan.length === 4)));
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
  cek(`${sub.id}: poin berikon & suara`, sub.poin.every((p) => p.ikon && p.suara) && !!sub.cara.suara);
}
cek("meta FASE_B grade 4", N.K4B4_META.phaseCode === "FASE_B" && N.K4B4_META.grade === 4 && N.K4B4_META.chapterId === "k4-mat-bab4");
cek("suara 0.70 / 1", N.K4B4_META.suaraLaju === 0.7 && N.K4B4_META.suaraNada === 1);
cek("SUB_BAB A B", N.SUB_BAB_K4B4.map((s) => s.id).join() === "A,B");

console.log(`uji-data-k4b4: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
