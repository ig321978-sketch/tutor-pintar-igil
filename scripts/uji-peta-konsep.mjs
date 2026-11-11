import { readFileSync, readdirSync } from "node:fs";
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
  kekuranganPeta,
  siapLanjut,
  kartuMinimal,
  KARTU_MINIMAL,
} from "../src/components/modul/peta-konsep-logika.ts";

let gagal = 0;
const cek = (ok, teks) => {
  if (!ok) gagal++;
  console.log((ok ? "OK    " : "GAGAL ") + teks);
};

// Semua bab yang sudah dimigrasi ke SMISCPA (src/data/kelas<K>-bab<N>-ringkas.json) diperiksa sekaligus.
const dirData = new URL("../src/data/", import.meta.url);
const berkasRingkas = readdirSync(dirData).filter((f) => /^kelas\d+-bab\d+-ringkas\.json$/.test(f)).sort();
const semuaBab = berkasRingkas.map((f) => ({ kode: f.replace("-ringkas.json", ""), data: JSON.parse(readFileSync(new URL(f, dirData), "utf8")) }));
cek(semuaBab.length >= 1, `ada ${semuaBab.length} berkas ringkas: ${semuaBab.map((b) => b.kode).join(", ")}`);
// Acuan untuk uji data rusak di bawah: bentuk data bab pilot.
const ringkas = semuaBab.find((b) => b.kode === "kelas1-bab8").data;

for (const { kode, data: dataBab } of semuaBab)
for (const sub of Object.keys(dataBab.subBab)) {
  const d = dataBab.subBab[sub].peta;
  const nama = `${kode} Sub-Bab ${sub}`;

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

  // Syarat lanjut: semua cabang dibuka DAN minimal KARTU_MINIMAL kartu menempel benar.
  cek(kartuMinimal(d) === Math.min(KARTU_MINIMAL, d.kartu.length), `${nama}: kartu minimal ${kartuMinimal(d)}`);
  let g = awalPeta();
  cek(kekuranganPeta(d, g) === "cabang" && !siapLanjut(d, g), `${nama}: awal masih kurang cabang`);
  for (const c of d.cabang) g = ketukCabang(d, g, c.id);
  cek(kekuranganPeta(d, g) === "kartu" && !siapLanjut(d, g), `${nama}: semua cabang dibuka saja belum cukup untuk lanjut`);
  const salahSemua = pilihKartu(d, g, d.kartu[0].id);
  const salahCabang = d.cabang.find((c) => c.id !== d.kartu[0].cabang);
  g = ketukCabang(d, salahSemua, salahCabang.id);
  cek(kekuranganPeta(d, g) === "kartu", `${nama}: salah letak tidak dihitung sebagai kartu tersusun`);
  g = letakkan(d, g, d.kartu[0].id, d.kartu[0].cabang);
  if (kartuMinimal(d) > 1) cek(kekuranganPeta(d, g) === "kartu", `${nama}: satu kartu benar belum cukup`);
  g = letakkan(d, g, d.kartu[1].id, d.kartu[1].cabang);
  cek(kekuranganPeta(d, g) === null && siapLanjut(d, g), `${nama}: dua kartu benar plus semua cabang dibuka = siap lanjut`);
  g = kembalikan(d, g, d.kartu[1].id);
  cek(kekuranganPeta(d, g) === "kartu", `${nama}: mengembalikan kartu menurunkan syarat lagi`);

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

// Peta yang kartunya hanya satu tidak boleh membuat anak terkunci.
const kecil = JSON.parse(JSON.stringify(ringkas.subBab.A.peta));
kecil.kartu = [kecil.kartu[0]];
cek(kartuMinimal(kecil) === 1, "satu kartu saja: syarat minimal turun jadi 1");

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
