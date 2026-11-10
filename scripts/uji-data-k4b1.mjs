// Uji data murni Matematika Kelas 4 Bab 1. Jalankan: node --no-warnings scripts/uji-data-k4b1.mjs
import * as D from "../src/components/modul/data-k4b1.ts";
import * as N from "../src/components/modul/naskah-k4b1.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};
const unik = (daftar) => new Set(daftar).size === daftar.length;
const tiga = (nama, daftar) => cek(`${nama}: tiga ronde`, Array.isArray(daftar) && daftar.length === 3, `${Array.isArray(daftar) ? daftar.length : "?"}`);

cek("empat 3286", (() => { const e = D.empat(3286); return e.rb === 3 && e.r === 2 && e.p === 8 && e.s === 6; })());
cek("gabung4 3,2,8,6", D.gabung4(3, 2, 8, 6) === 3286);
cek("lambang 3286", D.lambang(3286) === "3.286");
cek("kata 3286 memuat ribu", /ribu/.test(D.kata(3286)));
cek("nilaiTempat ribuan 2150", D.nilaiTempat(2150, "ribuan") === 2000);
cek("angkaTempat puluhan 7350", D.angkaTempat(7350, "puluhan") === 5);
cek("relasi 8750 > 7500", D.relasi(8750, 7500) === ">");
cek("tempatBeda gunung", D.tempatBeda(2460, 3676) === "ribuan");
cek("adaNol 1025", D.adaNol(1025) === true && D.adaNol(3286) === false);

for (const [nama, daftar] of Object.entries(D).filter(([k, v]) => k.startsWith("RONDE_") && Array.isArray(v))) {
  if (daftar.length === 3) tiga(nama, daftar);
}

for (const sub of N.SUB_BAB_K4B1) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: 3 video × 3 adegan`, sub.videos.length === 3 && sub.videos.every((v) => v.adegan.length === 3 && v.adegan.every((a) => a.ketukan.length === 4)));
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
}
cek("meta FASE_B grade 4", N.K4B1_META.phaseCode === "FASE_B" && N.K4B1_META.grade === 4 && N.K4B1_META.chapterId === "k4-mat-bab1");
cek("suara 0.70 / 1", N.K4B1_META.suaraLaju === 0.7 && N.K4B1_META.suaraNada === 1);

console.log(`uji-data-k4b1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
