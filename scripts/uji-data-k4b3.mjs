// Uji data murni Matematika Kelas 4 Bab 3. Jalankan: node --no-warnings scripts/uji-data-k4b3.mjs
import * as D from "../src/components/modul/data-k4b3.ts";
import * as N from "../src/components/modul/naskah-k4b3.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

cek("bedaPola 2,4,6 = 2", D.bedaPola([2, 4, 6]) === 2);
cek("bedaPola 9,7,5 = -2", D.bedaPola([9, 7, 5]) === -2);
cek("lanjutkan jeruk → 8", D.lanjutkan([2, 4, 6])[0] === 8);
cek("lanjutkan permen → 3", D.lanjutkan([9, 7, 5])[0] === 3);
cek("teksBeda +2", D.teksBeda(2) === "+2");
cek("teksBeda -5", D.teksBeda(-5) === "-5");
cek("jenisDariBeda +", D.jenisDariBeda(3) === "membesar");
cek("jenisDariBeda -", D.jenisDariBeda(-4) === "mengecil");
cek("sukuKe telur hari-5", D.sukuKe(20, 8, 5) === 52);
cek("opsiAngka berisi kunci", D.opsiAngka(14, 1).includes(14));

for (const [nama, daftar] of Object.entries(D).filter(([k, v]) => k.startsWith("RONDE_") && Array.isArray(v) && Array.isArray(v[0]))) {
  if (daftar.length === 3) cek(`${nama}: tiga ronde`, true);
}

for (const sub of N.SUB_BAB_K4B3) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: 3 video × 3 adegan`, sub.videos.length === 3 && sub.videos.every((v) => v.adegan.length === 3 && v.adegan.every((a) => a.ketukan.length === 4)));
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
  cek(`${sub.id}: poin berikon & suara`, sub.poin.every((p) => p.ikon && p.suara) && !!sub.cara.suara);
}
cek("meta FASE_B grade 4", N.K4B3_META.phaseCode === "FASE_B" && N.K4B3_META.grade === 4 && N.K4B3_META.chapterId === "k4-mat-bab3");
cek("suara 0.70 / 1", N.K4B3_META.suaraLaju === 0.7 && N.K4B3_META.suaraNada === 1);
cek("SUB_BAB A B", N.SUB_BAB_K4B3.map((s) => s.id).join() === "A,B");

console.log(`uji-data-k4b3: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
