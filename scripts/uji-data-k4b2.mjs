// Uji data murni Matematika Kelas 4 Bab 2. Jalankan: node --no-warnings scripts/uji-data-k4b2.mjs
import * as D from "../src/components/modul/data-k4b2.ts";
import * as N from "../src/components/modul/naskah-k4b2.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

cek("teksPec 1/4", D.teksPec({ p: 1, q: 4 }) === "1/4");
cek("nilaiPec 1/2 > 1/4", D.nilaiPec({ p: 1, q: 2 }) > D.nilaiPec({ p: 1, q: 4 }));
cek("relasi 1/2 > 1/4", D.relasiPec({ p: 1, q: 2 }, { p: 1, q: 4 }) === ">");
cek("relasi 1/3 < 2/3", D.relasiPec({ p: 1, q: 3 }, { p: 2, q: 3 }) === "<");
cek("senilai 2/6 = 1/3", D.senilai({ p: 2, q: 6 }, { p: 1, q: 3 }));
cek("kaliSenilai 1/3 ×2", D.teksPec(D.kaliSenilai({ p: 1, q: 3 }, 2)) === "2/6");
cek("sederhanakan 2/6", D.teksPec(D.sederhanakan({ p: 2, q: 6 })) === "1/3");
cek("pecKeDes 1/10", D.pecKeDes({ p: 1, q: 10 }) === "0,1");
cek("pecKeDes 1/100", D.pecKeDes({ p: 1, q: 100 }) === "0,01");
cek("pecKeDes 25/100", D.pecKeDes({ p: 25, q: 100 }) === "0,25");
cek("desKePersen 0,75", D.desKePersen("0,75") === "75%");
cek("persenKeDes 18%", D.persenKeDes("18%") === "0,18");
cek("nilaiDes 0,01 < 0,1", D.nilaiDes("0,01") < D.nilaiDes("0,1"));

for (const [nama, daftar] of Object.entries(D).filter(([k, v]) => k.startsWith("RONDE_") && Array.isArray(v) && Array.isArray(v[0]))) {
  if (daftar.length === 3) cek(`${nama}: tiga ronde`, true);
}

for (const sub of N.SUB_BAB_K4B2) {
  cek(`${sub.id}: 30 permainan`, sub.games.length === 30);
  cek(`${sub.id}: 10 Concrete/Picture/Abstract`, ["Concrete", "Picture", "Abstract"].every((st) => sub.games.filter((g) => g.stage === st).length === 10));
  cek(`${sub.id}: video lama dihapus (videos kosong; video baru diuji di uji-story-k4b2)`, sub.videos.length === 0);
  cek(`${sub.id}: mindMaps & infografis`, sub.mindMaps.length >= 6 && sub.infografis.length >= 6);
  cek(`${sub.id}: poin berikon & suara`, sub.poin.every((p) => p.ikon && p.suara) && !!sub.cara.suara);
}
cek("meta FASE_B grade 4", N.K4B2_META.phaseCode === "FASE_B" && N.K4B2_META.grade === 4 && N.K4B2_META.chapterId === "k4-mat-bab2");
cek("suara 0.70 / 1", N.K4B2_META.suaraLaju === 0.7 && N.K4B2_META.suaraNada === 1);
cek("SUB_BAB A–E", N.SUB_BAB_K4B2.map((s) => s.id).join() === "A,B,C,D,E");

console.log(`uji-data-k4b2: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
