import { readFileSync } from "node:fs";
import {
  awalPeta,
  bukaCabang,
  ketukCabang,
  pilihKartu,
  letakkan,
  kembalikan,
  semuaDibuka,
  semuaTersusun,
  jumlahTersusun,
  kartuDiCabang,
  kartuDiBaki,
  periksaDataPeta,
} from "../src/components/modul/peta-konsep-logika.ts";

let gagal = 0;
const cek = (ok, teks) => {
  if (!ok) gagal++;
  console.log((ok ? "OK    " : "GAGAL ") + teks);
};

const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab8-ringkas.json", import.meta.url), "utf8"));

for (const sub of Object.keys(ringkas.subBab)) {
  const d = ringkas.subBab[sub].peta;
  const nama = `K1B8 Sub-Bab ${sub}`;

  const salah = periksaDataPeta(d);
  cek(salah.length === 0, `${nama}: data peta sah ${salah.join("; ")}`);
  cek(d.cabang.length >= 3 && d.cabang.length <= 4, `${nama}: ${d.cabang.length} cabang (3-4)`);

  let k = awalPeta();
  cek(!semuaDibuka(d, k), `${nama}: awal belum ada cabang dibuka`);

  // Mengetuk cabang tanpa memegang kartu = membuka.
  k = ketukCabang(d, k, d.cabang[0].id);
  cek(k.dibuka.length === 1 && k.aktif === d.cabang[0].id, `${nama}: ketuk cabang membuka dan menampilkannya`);
  const k1 = ketukCabang(d, k, d.cabang[0].id);
  cek(k1.dibuka.length === 1, `${nama}: membuka cabang yang sama tidak menggandakan hitungan`);
  cek(bukaCabang(d, k, "tidak-ada") === k, `${nama}: cabang tak dikenal diabaikan`);

  // Memegang kartu lalu mengetuk cabang yang salah: tidak ada hukuman, kartu tetap di baki, ada petunjuk.
  const kartu = d.kartu[0];
  const cabangSalah = d.cabang.find((c) => c.id !== kartu.cabang);
  let m = pilihKartu(d, awalPeta(), kartu.id);
  cek(m.dipilih === kartu.id, `${nama}: kartu bisa dipegang`);
  m = pilihKartu(d, m, kartu.id);
  cek(m.dipilih === null, `${nama}: mengetuk kartu yang sama melepaskannya`);
  m = pilihKartu(d, awalPeta(), kartu.id);
  const salahLetak = ketukCabang(d, m, cabangSalah.id);
  cek(salahLetak.kabar?.jenis === "coba" && salahLetak.kabar.teks === kartu.petunjuk, `${nama}: salah letak dijawab petunjuk kartu`);
  cek(jumlahTersusun(salahLetak) === 0 && kartuDiBaki(d, salahLetak).length === d.kartu.length, `${nama}: salah letak tidak mengubah baki (tanpa hukuman)`);
  cek(salahLetak.dipilih === null, `${nama}: kartu dilepas setelah salah letak`);

  // Letak benar menempelkan kartu.
  const benar = ketukCabang(d, pilihKartu(d, awalPeta(), kartu.id), kartu.cabang);
  cek(benar.tersusun[kartu.id] === kartu.cabang && benar.kabar?.jenis === "benar", `${nama}: letak benar menempel dan dipuji`);
  cek(kartuDiCabang(d, benar, kartu.cabang).length === 1, `${nama}: kartu terdaftar di cabangnya`);
  cek(benar.dibuka.includes(kartu.cabang), `${nama}: cabang tujuan ikut terbuka`);
  cek(pilihKartu(d, benar, kartu.id) === benar, `${nama}: kartu yang sudah menempel tidak bisa dipegang lagi`);
  const lagi = letakkan(d, benar, kartu.id, cabangSalah.id);
  cek(lagi === benar, `${nama}: kartu yang sudah menempel tidak dipindah`);

  // Mengembalikan kartu ke baki.
  const balik = kembalikan(d, benar, kartu.id);
  cek(jumlahTersusun(balik) === 0 && kartuDiBaki(d, balik).length === d.kartu.length, `${nama}: kartu bisa dikembalikan ke baki`);

  // Menyelesaikan semuanya.
  let s = awalPeta();
  for (const c of d.cabang) s = ketukCabang(d, s, c.id);
  cek(semuaDibuka(d, s), `${nama}: semua cabang dibuka`);
  cek(!semuaTersusun(d, s), `${nama}: membuka cabang saja belum menyusun kartu`);
  for (const x of d.kartu) s = letakkan(d, s, x.id, x.cabang);
  cek(semuaTersusun(d, s) && kartuDiBaki(d, s).length === 0, `${nama}: semua ${d.kartu.length} kartu tersusun benar`);
  for (const c of d.cabang) cek(kartuDiCabang(d, s, c.id).length >= 1, `${nama}: cabang ${c.id} punya kartu`);

  // Teks pendek untuk anak Kelas 1.
  for (const c of d.cabang) cek(c.ringkas.split(/\s+/).length <= 8, `${nama}: ringkas cabang ${c.id} paling banyak 8 kata (${c.ringkas.split(/\s+/).length})`);
}

// Pemeriksa data menolak data rusak.
const rusak = JSON.parse(JSON.stringify(ringkas.subBab.A.peta));
rusak.kartu[0].cabang = "tidak-ada";
cek(periksaDataPeta(rusak).length > 0, "pemeriksa menolak kartu yang menunjuk cabang tak ada");
const dua = JSON.parse(JSON.stringify(ringkas.subBab.A.peta));
dua.cabang = dua.cabang.slice(0, 2);
cek(periksaDataPeta(dua).length > 0, "pemeriksa menolak kurang dari 3 cabang");
const lima = JSON.parse(JSON.stringify(ringkas.subBab.A.peta));
lima.cabang = [...lima.cabang, { ...lima.cabang[0], id: "x1" }, { ...lima.cabang[0], id: "x2" }];
cek(periksaDataPeta(lima).length > 0, "pemeriksa menolak lebih dari 4 cabang");

console.log(gagal === 0 ? "\nSEMUA LULUS" : `\n${gagal} GAGAL`);
process.exit(gagal === 0 ? 0 : 1);
