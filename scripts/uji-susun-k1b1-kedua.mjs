// Uji data Mind-Map dan Infografis susun Opsi 2 Kelas 1 Bab 1 Sub-Bab A (src/data/kelas1-bab1-kedua-ringkas.json).
// Pakai: node --no-warnings scripts/uji-susun-k1b1-kedua.mjs [berkas-json-sementara.json ...]
// Memeriksa: sahnya peta dan tabel (susun-logika), simulasi susun benar dan salah, suara tanpa digit, teks simpul pendek,
// kalimat paling banyak delapan kata, tanpa kata terlarang, emoji tidak melampaui U+1FA95, judul sesuai JUDUL_SUB_K1.
import fs from "fs";
const S = await import("../src/components/modul/susun-logika.ts");
const P = await import("../src/components/modul/peta-konsep-logika.ts");
const I = await import("../src/components/modul/infografis-ringkas-logika.ts");
// dunia-k1.ts mengimpor tanpa ekstensi sehingga tak bisa dimuat di Node; judul dibaca dari teks berkasnya.
const JUDUL_1A = /"1A":\s*"([^"]+)"/.exec(fs.readFileSync("src/components/modul/story/kit/dunia-k1.ts", "utf8"))?.[1];
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };

const kataSemua = (s) => s.split(/\s+/).filter(Boolean).length;
const kalimat = (s) => s.split(/[.!?]+/).map((x) => x.trim()).filter(Boolean);
const TERLARANG = /\b(pak|bu|ibu|kelompok|kelas|buku|teman|bandingkan|membandingkan|lebih|kurang|maju|mundur|pasangan|tambah|menambah|jumlah|jumlahkan|nilai tempat|puluhan|satuan|terbesar|terkecil|malosi|kira|upe|wei|halim|sama banyak)\b/i;
const maksEmoji = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95);

// Kumpulkan semua string (kunci, nilai) dari objek.
const semuaString = (o, jalur = "") => {
  if (typeof o === "string") return [[jalur, o]];
  if (Array.isArray(o)) return o.flatMap((x, i) => semuaString(x, `${jalur}[${i}]`));
  if (o && typeof o === "object") return Object.entries(o).flatMap(([k, v]) => semuaString(v, `${jalur}.${k}`));
  return [];
};

const periksa = (nama, d) => {
  cek(d && d.petaSusun && d.tabelSusun, `${nama}: petaSusun dan tabelSusun ada`);
  if (!(d && d.petaSusun && d.tabelSusun)) return;
  for (const e of S.periksaPeta(d.petaSusun)) cek(false, `${nama} peta: ${e}`);
  for (const e of S.periksaTabel(d.tabelSusun)) cek(false, `${nama} tabel: ${e}`);
  const p = d.petaSusun, t = d.tabelSusun;
  cek(S.periksaPeta(p).length === 0, `${nama}: peta sah`);
  cek(S.periksaTabel(t).length === 0, `${nama}: tabel sah`);
  cek(typeof p.pusat.suara === "string" && p.pusat.suara.length > 10, `${nama}: suara pusat ada`);
  cek(/nol sampai sepuluh/i.test(p.pusat.judul), `${nama}: pusat memuat "nol sampai sepuluh"`);
  cek(!/\d/.test(p.pusat.suara) && !/\d/.test(p.petunjuk) && !/\d/.test(t.suara) && !/\d/.test(t.petunjuk), `${nama}: suara dan petunjuk tanpa digit`);
  cek(p.simpul.every((s) => !/\d/.test(s.teks) && !/\d/.test(s.petunjuk ?? "")), `${nama}: teks dan petunjuk simpul tanpa digit`);
  cek(p.simpul.every((s) => s.teks.length <= 34 && kataSemua(s.teks) <= 3), `${nama}: teks simpul paling banyak tiga kata`);
  cek(p.simpul.filter((s) => s.induk === null).length >= 2 && p.simpul.filter((s) => s.induk === null).length <= 4, `${nama}: 2-4 cabang dari pusat`);
  cek(t.baris.length === 4, `${nama}: tabel tepat empat baris`);
  const akar = p.simpul.filter((s) => s.induk === null).map((s) => s.teks.toLowerCase());
  for (const k of ["tunjuk", "geser", "isi", "tulis"]) cek(akar.includes(k), `${nama}: cabang ${k} ada`);
  // Kalimat paling banyak delapan kata di semua teks yang dibacakan atau dibaca anak.
  for (const [jalur, s] of semuaString({ petaSusun: p, tabelSusun: t, peta: d.peta, infografis: d.infografis })) {
    if (/\.(id|jenis|tipe|ikon|cabang|induk)$/.test(jalur) || /\.nomor$/.test(jalur)) continue;
    for (const k of kalimat(s)) cek(kataSemua(k) <= 8, `${nama} ${jalur}: kalimat lebih dari delapan kata ("${k}")`);
    cek(!TERLARANG.test(s), `${nama} ${jalur}: kata terlarang ("${s}")`);
    cek(maksEmoji(s), `${nama} ${jalur}: emoji melampaui U+1FA95`);
  }
  // Suara cabang dan panel lama juga tanpa digit.
  if (d.peta) cek(semuaString({ a: d.peta.pusat.suara, b: d.peta.cabang.map((c) => c.suara) }).every(([, s]) => !/\d/.test(s)), `${nama}: suara peta lama tanpa digit`);
  if (d.infografis) {
    const suaraInfo = [d.infografis.suara, ...d.infografis.panel.flatMap((x) => [x.suara, ...(x.butir ?? x.sisi).map((b) => b.suara)])];
    cek(suaraInfo.every((s) => !/\d/.test(s)), `${nama}: suara infografis lama tanpa digit`);
    cek(d.infografis.judul === JUDUL_1A, `${nama}: judul infografis memakai JUDUL_SUB_K1["1A"]`);
    for (const e of I.periksaDataInfografis(d.infografis)) cek(false, `${nama} infografis lama: ${e}`);
  }
  if (d.peta) for (const e of P.periksaDataPeta(d.peta)) cek(false, `${nama} peta lama: ${e}`);
  // Simulasi: tiap tab ditaruh di tempatnya benar -> semua terpasang; di tempat salah -> kembali ke baki.
  for (const [jenis, tabs, tempat] of [["peta", S.tabPeta(p), S.tempatPeta(p)], ["tabel", S.tabTabel(t), S.tempatTabel(t)]]) {
    let k = S.awalSusun();
    cek(tabs.length === tempat.length, `${nama} ${jenis}: jumlah tab sama dengan jumlah tempat`);
    for (let i = 0; i < tabs.length; i += 1) k = S.letakkanTab(tabs, tempat, k, tabs[i].id, tempat[i].id);
    cek(S.semuaPasang(tempat, k) && S.tabDiBaki(tabs, k).length === 0, `${nama} ${jenis}: semua tab menempel di tempat benar`);
    let k2 = S.awalSusun();
    const geser = tabs.length > 1 ? tabs.findIndex((x, i) => S.bersihTeks(x.teks) !== S.bersihTeks(tempat[(i + 1) % tabs.length].jawaban)) : -1;
    if (geser >= 0) {
      k2 = S.letakkanTab(tabs, tempat, k2, tabs[geser].id, tempat[(geser + 1) % tabs.length].id);
      cek(Object.keys(k2.pasang).length === 0 && k2.salah === 1 && k2.kabar?.jenis === "coba", `${nama} ${jenis}: tab di tempat salah kembali ke baki`);
    }
    const urut = S.acakTab(tabs, 65);
    cek(urut.length === tabs.length && new Set(urut.map((x) => x.id)).size === tabs.length, `${nama} ${jenis}: pengacakan memuat semua tab sekali`);
    cek(tabs.length < 2 || urut.some((x, i) => x.id !== tabs[i].id), `${nama} ${jenis}: urutan baki berbeda dari urutan kunci`);
    cek(urut.every((x, i) => x.id !== tabs[i].id) || jenis === "tabel", `${nama} ${jenis}: tak ada tab yang sudah sejajar dengan nomornya`);
  }
};
const args = process.argv.slice(2);
if (args.length) for (const f of args) periksa(f, JSON.parse(fs.readFileSync(f, "utf8")));
else {
  const j = JSON.parse(fs.readFileSync("src/data/kelas1-bab1-kedua-ringkas.json", "utf8"));
  cek(j.chapter_id === "mtk-1-bab1-kedua", "header chapter_id mtk-1-bab1-kedua");
  periksa("sub-bab A", j.subBab.A);
}
console.log(`uji-susun-k1b1-kedua: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
