// Uji data murni Matematika Kelas 4 Bab 5. Jalankan: node --no-warnings scripts/uji-data-k4b5.mjs
import * as D from "../src/components/modul/data-k4b5.ts";
import * as N from "../src/components/modul/naskah-k4b5.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

cek("persegi 4 sisi", D.byId("ps").sisi === 4);
cek("segitiga 3 sudut", D.byId("s3").sudut === 3);
cek("persegi beraturan", D.byId("ps").beraturan === true);
cek("trapesium tak beraturan", D.byId("tr").beraturan === false);
cek("resep persegi → 2 segitiga", D.RESEP[4].hasil === "2 segitiga" && D.RESEP[4].jenis === "dekomposisi");
cek("opsiAngka berisi kunci", D.opsiAngka(3, 1).includes(3));

for (const [nama, daftar] of Object.entries(D).filter(([k, v]) => k.startsWith("RONDE_") && Array.isArray(v) && Array.isArray(v[0]))) {
  if (daftar.length === 3) cek(`${nama}: tiga ronde`, true);
}

for (const sub of N.SUB_BAB_K4B5) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: 3 video × 3 adegan`, sub.videos.length === 3 && sub.videos.every((v) => v.adegan.length === 3 && v.adegan.every((a) => a.ketukan.length === 4)));
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
  cek(`${sub.id}: poin berikon & suara`, sub.poin.every((p) => p.ikon && p.suara) && !!sub.cara.suara);
}
cek("meta FASE_B grade 4", N.K4B5_META.phaseCode === "FASE_B" && N.K4B5_META.grade === 4 && N.K4B5_META.chapterId === "k4-mat-bab5");
cek("suara 0.70 / 1", N.K4B5_META.suaraLaju === 0.7 && N.K4B5_META.suaraNada === 1);
cek("SUB_BAB A B", N.SUB_BAB_K4B5.map((s) => s.id).join() === "A,B");

console.log(`uji-data-k4b5: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
