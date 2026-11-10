// Uji data murni Matematika Kelas 5 Bab 1. Jalankan: node --no-warnings scripts/uji-data-k5b1.mjs
import * as D from "../src/components/modul/data-k5b1.ts";
import * as N from "../src/components/modul/naskah-k5b1.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

cek("14500 kata", D.kata(14500) === "empat belas ribu lima ratus");
cek("66500 kata", D.kata(66500).includes("enam puluh enam ribu"));
cek("lambang 14500", D.lambang(14500) === "14.500");
cek("lima 14500 PR=1 RB=4", D.lima(14500).pr === 1 && D.lima(14500).rb === 4 && D.lima(14500).r === 5);
cek("nilai tempat 7 di 87986", D.nilaiTempat(87986, "ribuan") === 7000);
cek("banding 56560 < 57000", D.banding(56560, 57000) === "<");
cek("opsiAngka berisi kunci", D.opsiAngka(8, 1).includes(8));

for (const sub of N.SUB_BAB_K5B1) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: 3 video × 3 adegan`, sub.videos.length === 3 && sub.videos.every((v) => v.adegan.length === 3 && v.adegan.every((a) => a.ketukan.length === 4)));
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
  cek(`${sub.id}: poin berikon & suara`, sub.poin.every((p) => p.ikon && p.suara) && !!sub.cara.suara);
}
cek("meta FASE_C grade 5", N.K5B1_META.phaseCode === "FASE_C" && N.K5B1_META.grade === 5 && N.K5B1_META.chapterId === "k5-mat-bab1");
cek("suara 0.70 / 1", N.K5B1_META.suaraLaju === 0.7 && N.K5B1_META.suaraNada === 1);
cek("SUB_BAB A B", N.SUB_BAB_K5B1.map((s) => s.id).join() === "A,B");

console.log(`uji-data-k5b1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
