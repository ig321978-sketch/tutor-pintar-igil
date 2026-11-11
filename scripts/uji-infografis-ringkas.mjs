import { readFileSync } from "node:fs";
import {
  awalInfo,
  lihat,
  panelSelesai,
  jumlahSelesai,
  semuaSelesai,
  idItemPanel,
  periksaDataInfografis,
  MAKS_PANEL,
} from "../src/components/modul/infografis-ringkas-logika.ts";

let gagal = 0;
const cek = (ok, teks) => {
  if (!ok) gagal++;
  console.log((ok ? "OK    " : "GAGAL ") + teks);
};

const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab8-ringkas.json", import.meta.url), "utf8"));

for (const sub of Object.keys(ringkas.subBab)) {
  const d = ringkas.subBab[sub].infografis;
  const nama = `K1B8 Sub-Bab ${sub}`;

  const salah = periksaDataInfografis(d);
  cek(salah.length === 0, `${nama}: data infografis sah ${salah.join("; ")}`);
  cek(d.panel.length >= 1 && d.panel.length <= MAKS_PANEL, `${nama}: ${d.panel.length} panel (maksimal ${MAKS_PANEL})`);

  let k = awalInfo();
  cek(!semuaSelesai(d, k) && jumlahSelesai(d, k) === 0, `${nama}: awal belum ada panel selesai`);

  // Mengetuk satu item belum menyelesaikan panel. Kemajuan dari ketukan, bukan suara.
  const p0 = d.panel[0];
  k = lihat(d, k, p0.id, idItemPanel(p0)[0]);
  cek(!panelSelesai(p0, k), `${nama}: satu ketukan belum menyelesaikan panel ${p0.id}`);
  cek(k.aktif[p0.id] === idItemPanel(p0)[0], `${nama}: item yang diketuk menjadi tampilan aktif`);
  const ulang = lihat(d, k, p0.id, idItemPanel(p0)[0]);
  cek(ulang.dilihat[p0.id].length === 1, `${nama}: mengetuk item yang sama tidak menggandakan`);
  cek(lihat(d, k, p0.id, "tidak-ada") === k, `${nama}: item tak dikenal diabaikan`);
  cek(lihat(d, k, "panel-tak-ada", "x") === k, `${nama}: panel tak dikenal diabaikan`);

  // Menyelesaikan semua panel.
  let s = awalInfo();
  for (const p of d.panel) {
    for (const id of idItemPanel(p)) s = lihat(d, s, p.id, id);
    cek(panelSelesai(p, s), `${nama}: panel ${p.id} (${p.tipe}) selesai setelah semua item disentuh`);
  }
  cek(semuaSelesai(d, s) && jumlahSelesai(d, s) === d.panel.length, `${nama}: semua panel selesai`);

  // Satu ide per panel dan teks pendek untuk Kelas 1.
  for (const p of d.panel) {
    cek(p.ide.split(/\s+/).length <= 8, `${nama}: ide ${p.id} paling banyak 8 kata (${p.ide.split(/\s+/).length})`);
    if (p.tipe === "banding") cek(p.sisi.length === 2, `${nama}: panel ${p.id} membandingkan tepat dua hal`);
    if (p.tipe === "buka") cek(p.butir.length >= 2 && p.butir.length <= 4, `${nama}: panel ${p.id} punya ${p.butir.length} kotak`);
  }
}

// Pemeriksa menolak data rusak.
const empat = JSON.parse(JSON.stringify(ringkas.subBab.A.infografis));
empat.panel = [...empat.panel, { ...empat.panel[0], id: "p4" }];
cek(periksaDataInfografis(empat).length > 0, "pemeriksa menolak lebih dari 3 panel");
const lebar = JSON.parse(JSON.stringify(ringkas.subBab.A.infografis));
const tabel = lebar.panel.find((p) => p.id === "a-tabel").sisi[1];
tabel.visual.nama = ["a", "b", "c", "d", "e"];
tabel.visual.nilai = [1, 2, 3, 4, 5];
cek(periksaDataInfografis(lebar).length > 0, "pemeriksa menolak tabel mendatar lebih dari 4 kolom (tanpa digeser)");
const timpang = JSON.parse(JSON.stringify(ringkas.subBab.B.infografis));
timpang.panel[1].sisi[0].visual.jumlah = [1, 2];
cek(periksaDataInfografis(timpang).length > 0, "pemeriksa menolak diagram yang kategori dan jumlahnya tidak selaras");
const satuSisi = JSON.parse(JSON.stringify(ringkas.subBab.A.infografis));
satuSisi.panel[0].sisi = [satuSisi.panel[0].sisi[0]];
cek(periksaDataInfografis(satuSisi).length > 0, "pemeriksa menolak banding dengan satu sisi");

console.log(gagal === 0 ? "\nSEMUA LULUS" : `\n${gagal} GAGAL`);
process.exit(gagal === 0 ? 0 : 1);
