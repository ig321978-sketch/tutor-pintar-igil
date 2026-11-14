// Uji data Mind-Map dan Infografis susun Kelas 4 Bab 3 (src/data/kelas4-bab1-ringkas.json: petaSusun dan tabelSusun).
// Pakai: node --no-warnings scripts/uji-susun-k4b3.mjs [berkas-json-sementara.json ...]
// Tanpa argumen: memeriksa kelima sub-bab di berkas data. Dengan argumen: memeriksa berkas sementara (bentuk {petaSusun, tabelSusun}).
import fs from "fs";
const S = await import("../src/components/modul/susun-logika.ts");
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };
const periksa = (nama, d) => {
  cek(d && d.petaSusun && d.tabelSusun, `${nama}: petaSusun dan tabelSusun ada`);
  if (!(d && d.petaSusun && d.tabelSusun)) return;
  for (const e of S.periksaPeta(d.petaSusun)) cek(false, `${nama} peta: ${e}`);
  for (const e of S.periksaTabel(d.tabelSusun)) cek(false, `${nama} tabel: ${e}`);
  const p = d.petaSusun;
  cek(S.periksaPeta(p).length === 0, `${nama}: peta sah`);
  cek(typeof p.pusat.suara === "string" && p.pusat.suara.length > 10, `${nama}: suara pusat ada`);
  cek(!/\d/.test(p.pusat.suara) && !/\d/.test(p.petunjuk) && !/\d/.test(d.tabelSusun.suara) && !/\d/.test(d.tabelSusun.petunjuk), `${nama}: suara dan petunjuk tanpa digit`);
  cek(p.simpul.every((s) => s.teks.length <= 34), `${nama}: teks simpul <= 34 huruf`);
  cek(p.simpul.filter((s) => s.induk === null).length >= 2 && p.simpul.filter((s) => s.induk === null).length <= 4, `${nama}: 2-4 cabang dari pusat`);
  // Simulasi: tiap tab ditaruh di tempatnya benar -> semua terpasang; di tempat salah -> kembali ke baki.
  for (const [jenis, tabs, tempat] of [["peta", S.tabPeta(p), S.tempatPeta(p)], ["tabel", S.tabTabel(d.tabelSusun), S.tempatTabel(d.tabelSusun)]]) {
    let k = S.awalSusun();
    cek(tabs.length === tempat.length, `${nama} ${jenis}: jumlah tab sama dengan jumlah tempat`);
    for (let i = 0; i < tabs.length; i += 1) k = S.letakkanTab(tabs, tempat, k, tabs[i].id, tempat[i].id);
    cek(S.semuaPasang(tempat, k) && S.tabDiBaki(tabs, k).length === 0, `${nama} ${jenis}: semua tab menempel di tempat benar`);
    let k2 = S.awalSusun();
    const geser = tabs.length > 1 ? tabs.findIndex((t, i) => S.bersihTeks(t.teks) !== S.bersihTeks(tempat[(i + 1) % tabs.length].jawaban)) : -1;
    if (geser >= 0) {
      k2 = S.letakkanTab(tabs, tempat, k2, tabs[geser].id, tempat[(geser + 1) % tabs.length].id);
      cek(Object.keys(k2.pasang).length === 0 && k2.salah === 1 && k2.kabar?.jenis === "coba", `${nama} ${jenis}: tab di tempat salah kembali ke baki`);
    }
    const urut = S.acakTab(tabs, 65);
    cek(urut.length === tabs.length && new Set(urut.map((t) => t.id)).size === tabs.length, `${nama} ${jenis}: pengacakan memuat semua tab sekali`);
    cek(tabs.length < 2 || urut.some((t, i) => t.id !== tabs[i].id), `${nama} ${jenis}: urutan baki berbeda dari urutan kunci`);
    cek(urut.every((t, i) => t.id !== tabs[i].id) || jenis === "tabel", `${nama} ${jenis}: tak ada tab yang sudah sejajar dengan nomornya`);
  }
};
const args = process.argv.slice(2);
if (args.length) for (const f of args) periksa(f, JSON.parse(fs.readFileSync(f, "utf8")));
else {
  const j = JSON.parse(fs.readFileSync("src/data/kelas4-bab1-ringkas.json", "utf8"));
  for (const s of "AB") periksa(`sub-bab ${s}`, j.subBab[s]);
}
console.log(`uji-susun-k4b3: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
