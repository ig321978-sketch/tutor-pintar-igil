// Uji data murni Matematika Kelas 4 Bab 6. Jalankan: node --no-warnings scripts/uji-data-k4b6.mjs
import * as D from "../src/components/modul/data-k4b6.ts";
import * as N from "../src/components/modul/naskah-k4b6.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

cek("mainan total 23", D.totalNilai(D.DS_MAINAN) === 23);
cek("warna total 12", D.totalNilai(D.DS_WARNA) === 12);
cek("kelereng max 9", D.itemMax(D.DS_MAINAN).nilai === 9 && D.itemMax(D.DS_MAINAN).label === "kelereng");
cek("puzzle min 1", D.itemMin(D.DS_MAINAN).nilai === 1);
cek("skala 4 × 5 = 20", D.nilaiDariSimbol(5, 4) === 20);
cek("opsiAngka berisi kunci", D.opsiAngka(8, 1).includes(8));
cek("kelas skala 4", D.DS_KELAS_SKALA.skala === 4 && D.byId(D.DS_KELAS_SKALA, "k4").nilai === 20);

for (const sub of N.SUB_BAB_K4B6) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: video lama dihapus (videos kosong; video baru diuji di uji-story-k4b6)`, sub.videos.length === 0);
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
  cek(`${sub.id}: poin berikon & suara`, sub.poin.every((p) => p.ikon && p.suara) && !!sub.cara.suara);
}
cek("meta FASE_B grade 4", N.K4B6_META.phaseCode === "FASE_B" && N.K4B6_META.grade === 4 && N.K4B6_META.chapterId === "k4-mat-bab6");
cek("suara 0.70 / 1", N.K4B6_META.suaraLaju === 0.7 && N.K4B6_META.suaraNada === 1);
cek("SUB_BAB A B", N.SUB_BAB_K4B6.map((s) => s.id).join() === "A,B");

console.log(`uji-data-k4b6: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
