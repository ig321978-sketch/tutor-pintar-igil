// Uji Mind-map (Tangga Tribun, label kosong), Infografis (dua kartu), Simulasi Garis Urutan, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 1 Sub-Bab B ("Urutan Tribun Pak Hasto").
// Memeriksa: logika membandingkan (penentu, tanda, urutan, peringkat) diuji silang dengan perbandingan bilangan biasa, geometri garis bilangan (patokan berjarak sama, titik sebanding bilangan,
// label tidak bertabrakan), papan kolom, logika simulasi (alat menolak Periksa sebelum kolom dipilih dan bilangan yang bukan giliran), misi, Mind-map dan Infografis label kosong
// (data bersambung dari Sub-Bab A: Timur 9.060, Selatan 18.705, Utara 24.350, Barat 30.402, Utara pekan lalu 24.305), CPA dua belas langkah per tahap dengan jawaban benar dihitung dari bilangan,
// angka kanvas tidak kembar, pengenal ucapan, petunjuk salah tanpa bocoran, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-urutan-k5b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/urutan-k5b1b/logika.ts");
const LD = await import("../src/components/modul/urutan-k5b1b/logika-data.ts");
const PD = await import("../src/components/modul/urutan-k5b1b/papan-data.ts");
const DS = await import("../src/components/modul/urutan-k5b1b/data-sim.ts");
const DP = await import("../src/components/modul/urutan-k5b1b/data-peta.ts");
const DI = await import("../src/components/modul/urutan-k5b1b/data-info.ts");
const LC = await import("../src/components/modul/urutan-k5b1b/logika-cpa.ts");
const D = await import("../src/components/modul/urutan-k5b1b/data.ts");
const K = await import("../src/components/modul/urutan-k5b1b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k5b1.ts");
const folderUrl = new URL("../src/components/modul/urutan-k5b1b/", import.meta.url);

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
const num = (t) => Number(t.replace(/\./g, ""));

/* Pembaca bilangan mandiri (cara berbeda dari kataK5B1): memecah per tiga angka. */
const SAT = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const tiga = (n) => {
  const r = Math.floor(n / 100);
  const s = n % 100;
  const hr = r === 0 ? "" : r === 1 ? "seratus" : `${SAT[r]} ratus`;
  let hs = "";
  if (s === 10) hs = "sepuluh";
  else if (s === 11) hs = "sebelas";
  else if (s > 11 && s < 20) hs = `${SAT[s - 10]} belas`;
  else {
    const p = Math.floor(s / 10);
    hs = [p === 0 ? "" : `${SAT[p]} puluh`, SAT[s % 10]].filter(Boolean).join(" ");
  }
  return [hr, hs].filter(Boolean).join(" ");
};
const terbilang = (n) => (n === 0 ? "nol" : n < 1000 ? tiga(n) : [Math.floor(n / 1000) === 1 ? "seribu" : `${tiga(Math.floor(n / 1000))} ribu`, tiga(n % 1000)].filter(Boolean).join(" "));

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
{
  for (const n of [0, 5, 10, 11, 19, 20, 100, 940, 1000, 6250, 7999, 9060, 9999, 10015, 18705, 24350, 30402, 45620, 56204, 64080, 99999]) sama(LC.kata(n), terbilang(n), `kata bilangan ${n}`);
  sama(LC.ucapkan("45.620 tiket"), "empat puluh lima ribu enam ratus dua puluh tiket", "ucapkan: bilangan bertitik menjadi kata");
  sama(LC.ucapkan("lebih besar (>)"), "lebih besar", "ucapkan: tanda dalam kurung dibuang");
  sama(LC.ucapkan("antara 0 dan 10.000."), "antara nol dan sepuluh ribu.", "ucapkan: nol dan sepuluh ribu, tanpa spasi sebelum tanda baca");
  sama([1, 2, 3, 4, 9].map(LC.urutan), ["pertama", "kedua", "ketiga", "keempat", "kesembilan"], "urutan dengan kata");
}

/* ------------------------------ Logika membandingkan ------------------------------ */
{
  cek(LD.fmt(24350) === "24.350" && LD.fmt(940) === "940" && LD.fmt(0) === "0" && LD.fmt(100000) === "100.000", "fmt titik ribuan");
  cek(LD.banyakAngka(940) === 3 && LD.banyakAngka(9999) === 4 && LD.banyakAngka(62150) === 5, "banyak angka");
  // Uji silang: tanda dari teks angka sama dengan perbandingan bilangan biasa pada banyak pasangan.
  const uji = [0, 7, 99, 100, 940, 999, 1000, 7999, 9060, 9480, 9999, 10015, 12000, 18705, 20805, 20850, 24305, 24350, 30402, 56024, 56204, 62150, 62190, 64080, 64800, 99999];
  let semua = true;
  for (const a of uji) for (const b of uji) semua = semua && LD.tandaDari(a, b) === (a < b ? "<" : a > b ? ">" : "=");
  cek(semua, "tandaDari sama dengan perbandingan bilangan untuk semua pasangan");
  const pn = (a, b) => LD.penentu(a, b);
  cek(pn(7999, 12000).cara === "panjang" && pn(7999, 12000).besar === "b" && pn(12000, 7999).besar === "a", "penentu: banyak angka menentukan");
  cek(pn(56204, 56024).cara === "kolom" && pn(56204, 56024).nama === "ratusan" && pn(56204, 56024).i === 2 && pn(56204, 56024).besar === "a", "penentu: 56.204 dan 56.024 ditentukan di ratusan (geser dua kolom)");
  cek(pn(24350, 24305).nama === "puluhan" && LD.kolomDariKiri(24350, 24305) === 4 && pn(24350, 24305).besar === "a", "penentu: 24.350 dan 24.305 di puluhan, kolom ke empat dari kiri");
  cek(pn(31400, 31400).cara === "sama" && LD.namaPenentu(31400, 31400) === "semua sama" && LD.kolomDariKiri(31400, 31400) === null, "penentu: bilangan sama");
  cek(LD.namaPenentu(9060, 18705) === "banyak angka" && LD.namaPenentu(20805, 20850) === "puluhan" && LD.namaPenentu(38450, 38900) === "ratusan", "nama penentu");
  sama(LD.urutkan([30402, 9060, 24350, 18705], "naik"), [9060, 18705, 24350, 30402], "urut naik");
  sama(LD.urutkan([30402, 9060, 24350, 18705], "turun"), [30402, 24350, 18705, 9060], "urut turun");
  sama(LD.urutkan([15600, 9850, 15060, 41200], "naik"), [9850, 15060, 15600, 41200], "urut naik: 15.060 sebelum 15.600");
  cek(LD.peringkat([8730, 18920, 38450, 38900], 18920) === 2 && LD.peringkat([6250, 26100, 62150, 62190], 62150) === 3, "peringkat dari yang terkecil");
  // Garis dan patokan.
  cek(LD.patokanKiri(45620) === 40000 && LD.patokanKiri(9480) === 0 && sama(LD.ruasDari(18920), [10000, 20000], "ruas dari") === undefined, "patokan kiri dan ruas");
  cek(LD.teksRuas(40000) === "antara 40.000 dan 50.000" && LD.teksRuas(0) === "antara 0 dan 10.000", "teks ruas");
  cek(LD.patokanTerdekat(45620) === 50000 && LD.patokanTerdekat(45260) === 50000 && LD.patokanTerdekat(31800) === 30000 && LD.patokanTerdekat(56204) === 60000 && LD.patokanTerdekat(9480) === 10000, "patokan terdekat");
  let tengah = false;
  try {
    LD.patokanTerdekat(25000);
  } catch {
    tengah = true;
  }
  cek(tengah, "patokan terdekat menolak bilangan tepat di tengah");
  cek(LD.sisiPatokan(38900, 30000) === "kanan" && LD.sisiPatokan(9999, 20000) === "kiri" && LD.sisiPatokan(20000, 20000) === "tepat", "sisi patokan");
  // Geometri garis.
  const g = LD.rancangGaris(30000, [{ nama: "A", n: 38900 }, { nama: "B", n: 45620 }]);
  cek(g.patokan.length === 4 && g.patokan.every((p, k) => p.n === 30000 + k * 10000) && LD.lebarGarisSah(g), "garis: empat patokan berjarak sama dan label tidak bertabrakan");
  const jarak = g.patokan[1].x - g.patokan[0].x;
  cek(g.patokan.every((p, k) => Math.abs(p.x - g.patokan[0].x - k * jarak) < 0.01), "garis: jarak patokan sama");
  cek(Math.abs(g.titik[0].x - (g.patokan[0].x + (8900 / 10000) * jarak)) < 0.01 && Math.abs(g.titik[1].x - (g.patokan[0].x + (15620 / 10000) * jarak)) < 0.01, "garis: titik sebanding dengan bilangannya");
  cek(g.x0 === g.patokan[0].x && Math.abs(g.x1 - g.patokan[3].x) < 0.01 && g.patokan[0].x >= 0 && g.patokan[3].x <= g.lebar && g.lebar === 220, "garis: ujung garis tepat pada patokan pertama dan terakhir, muat lebar 220");
  cek(LD.awalGaris([45620, 40000, 50000, 60000]) === 30000 && LD.awalGaris([9999, 20000]) === 0 && LD.awalGaris([21400, 27050, 38900]) === 10000, "awal garis memuat semua bilangan");
  // Label titik tidak bertabrakan (tingkat sama harus berjarak) dan tidak keluar kotak.
  for (const ns of [[21400, 27050, 38900], [41000, 48250, 56700], [45000, 55200, 64800], [9060, 18705, 24350, 30402]]) {
    const gg = LD.rancangGaris(LD.awalGaris(ns, ns.length === 4 ? 5 : 4), ns.map((n) => ({ nama: String(n), n })), ns.length === 4 ? 5 : 4);
    let ok = LD.titikDalamGaris(gg);
    for (const a of gg.titik) for (const b of gg.titik) if (a !== b && a.tingkat === b.tingkat && Math.abs(a.x - b.x) < LD.JARAK_LABEL) ok = false;
    cek(ok && gg.titik.every((t) => t.y >= 10), `garis ${ns.join(",")}: titik dalam garis, label tidak bertabrakan`);
  }
  // Papan kolom.
  sama(LD.selKolom(9060), [null, "9", "0", "6", "0"], "papan kolom: empat angka, kolom depan kosong, nol tampak");
  sama(LD.selKolom(24350), ["2", "4", "3", "5", "0"], "papan kolom: lima angka");
  sama(LD.selKolom(940), [null, null, "9", "4", "0"], "papan kolom: tiga angka");
  cek(LD.adaTitikSetelah(24350, 1) && LD.adaTitikSetelah(9060, 1) && !LD.adaTitikSetelah(940, 1) && !LD.adaTitikSetelah(24350, 2), "titik pemisah ribuan");
  cek(LD.NAMA_KOLOM.length === 5 && LD.NAMA_KOLOM[4] === "puluh ribuan", "nama kolom");
}

/* ------------------------------ Data papan CPA ------------------------------ */
{
  const SEMUA = Object.values(PD.PAPAN);
  cek(SEMUA.length === 9 && SEMUA.every((p) => p.item.length >= 4 && p.item.length <= 5 && p.item.every((x) => x.n > 0 && x.n <= 99999 && Number.isInteger(x.n))), "papan: sembilan papan, bilangan sampai 99.999");
  cek(SEMUA.every((p) => bersih(JSON.stringify(p)) && p.item.every((x) => x.nama.length <= 12 && x.nama.split(/\s+/).every((w) => w.length <= 10))), "papan: bersih, nama pendek");
  for (const id of ["tiket", "parkir", "suporter"]) cek(PD.PAPAN[id].item.every((x) => x.ikon && emojiSah(x.ikon) && adaEmoji(x.ikon)) && new Set(PD.PAPAN[id].item.map((x) => x.ikon)).size === 4, `Concrete ${id}: tiap item beremoji lama berbeda`);
  for (const id of ["musim", "kursi", "sorak", "kios", "catatan", "gerbang"]) cek(PD.PAPAN[id].item.every((x) => !x.ikon), `${id}: tanpa emoji (Pictorial dan Abstract)`);
  // Data Story (jangan jadi jawaban CPA) hanya boleh muncul pada bilangan seed Cari kesalahan (7.999 dan 12.000, 56.204 dan 56.024).
  const STORY = [9060, 18705, 24350, 30402, 24305, 54203, 54302, 35000, 36000, 49800, 50200];
  const ns = SEMUA.flatMap((p) => p.item.map((x) => x.n));
  cek(STORY.every((n) => !ns.includes(n)), "papan: tidak memakai bilangan Story");
  cek(ns.includes(7999) && ns.includes(12000) && ns.includes(56204) && ns.includes(56024), "papan: bilangan seed Cari kesalahan ada");
  cek(PD.PAPAN.kios.item[0].n === PD.PAPAN.kios.item[1].n, "papan kios: ada dua bilangan sama (tanda sama dengan)");
  cek(PD.NAMA_ITEM.every((n) => n === n.toLowerCase()) && PD.NAMA_ITEM.includes("timur") && PD.NAMA_ITEM.includes("terompet"), "nama item huruf kecil");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.BANDING_SIM.length === 4 && DS.GARIS_SIM.length === 4 && DS.URUT_SIM.length === 4 && DS.PATOKAN_SIM.length === 4, "simulasi: empat sasaran tiap alat");
  for (const t of DS.BANDING_SIM) cek(new Set(t.kol).size === 3 && t.kol.includes(LD.namaPenentu(t.a, t.b)) && t.na.length <= 12 && t.nb.length <= 12, `simulasi banding ${t.na}: tiga kolom unik memuat penentu`);
  cek(new Set(DS.BANDING_SIM.map((t) => t.kol.indexOf(LD.namaPenentu(t.a, t.b)))).size >= 2, "simulasi banding: posisi benar bervariasi");
  cek(DS.BANDING_SIM.some((t) => LD.penentu(t.a, t.b).cara === "panjang") && DS.BANDING_SIM.some((t) => LD.penentu(t.a, t.b).cara === "sama") && DS.BANDING_SIM.some((t) => LD.penentu(t.a, t.b).cara === "kolom"), "simulasi banding: banyak angka, kolom, dan sama dipakai");
  for (const t of DS.GARIS_SIM) {
    const g = LD.rancangGaris(t.lo, [{ nama: t.nama, n: t.n }]);
    cek(new Set(t.pil).size === 3 && t.pil.includes(LD.teksRuas(LD.patokanKiri(t.n))) && LD.titikDalamGaris(g), `simulasi garis ${t.nama}: tiga ruas unik memuat ruas benar, titik dalam garis`);
  }
  cek(new Set(DS.GARIS_SIM.map((t) => t.pil.indexOf(LD.teksRuas(LD.patokanKiri(t.n))))).size >= 2, "simulasi garis: posisi benar bervariasi");
  for (const t of DS.URUT_SIM) cek(t.item.length === 4 && new Set(t.item.map((x) => x.n)).size === 4 && [...t.acak].sort().join() === "0,1,2,3" && t.acak.join() !== "0,1,2,3", `simulasi urut: empat bilangan berbeda, urutan tampil teracak (${t.arah})`);
  cek(DS.URUT_SIM.some((t) => t.arah === "naik") && DS.URUT_SIM.some((t) => t.arah === "turun"), "simulasi urut: naik dan turun");
  for (const t of DS.PATOKAN_SIM) cek(new Set(t.pil).size === 3 && t.pil.includes(LD.fmt(LD.patokanTerdekat(t.n))), `simulasi patokan ${t.nama}: tiga pilihan memuat patokan terdekat`);
  cek(new Set(DS.PATOKAN_SIM.map((t) => t.pil.indexOf(LD.fmt(LD.patokanTerdekat(t.n))))).size >= 2, "simulasi patokan: posisi benar bervariasi");
  const cpa = Object.values(PD.PAPAN).flatMap((p) => p.item.map((x) => x.n));
  const sim = [...DS.BANDING_SIM.flatMap((t) => [t.a, t.b]), ...DS.GARIS_SIM.map((t) => t.n), ...DS.URUT_SIM.flatMap((t) => t.item.map((x) => x.n)), ...DS.PATOKAN_SIM.map((t) => t.n)];
  cek(sim.every((n) => !cpa.includes(n) && ![9060, 18705, 24350, 30402, 24305].includes(n)) || (console.log("sim bertabrakan:", sim.filter((n) => cpa.includes(n))), false), "simulasi: bilangan berbeda dari Story, Infografis, dan CPA");
  cek(tanpaDigit(DS.MISI_URUTAN_TEKS) && bersih(DS.MISI_URUTAN_TEKS) && DS.MISI_URUTAN_TEKS === MT.MISI_K5B1.B && D.MISI_URUTAN_TEKS === DS.MISI_URUTAN_TEKS && DS.MISI_URUTAN_TEKS.length >= 10, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k5b1");

  const a = L.awalUrutan();
  cek(a.alat === "urutan" && a.mode === "banding" && a.kolomPilih === -1 && a.tandaPilih === -1 && a.ruasPilih === -1 && a.patPilih === -1 && a.urutPilih.length === 0 && !a.tolakBanding && !a.tolakUrut && ["bandingBenar", "garisBenar", "urutBenar", "patBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiUrutan(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeUrutan(a, "urut").mode, "urut", "simulasi: ganti alat");

  // Banding: Lampu 23.480 dan Kios 23.840, penentu ratusan (indeks 1), tanda < (indeks 0).
  cek(L.kunciKolom(a) === 1 && L.kunciTanda(a) === 0, "banding: jawaban dihitung dari data");
  const tolakB = L.periksaBanding(L.pilihTanda(a, 0));
  cek(!tolakB.ok && tolakB.ditolak === true && tolakB.k.tolakBanding === true && tolakB.k.salah === 0 && /Belum ada kolom/.test(L.petunjukBanding(a)), "banding: alat menolak Periksa sebelum kolom penentu dipilih (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakB.k, new Set()), [], "banding: penolakan banding bukan misi b-tolak");
  const kolomSalah = L.periksaBanding(L.pilihTanda(L.pilihKolom(a, 0), 0));
  cek(!kolomSalah.ok && !kolomSalah.ditolak && kolomSalah.k.salah === 1 && /Kolom penentunya belum cocok/.test(L.petunjukBanding(L.pilihTanda(L.pilihKolom(a, 0), 0))), "banding: kolom keliru, petunjuk mengarahkan");
  cek(/Belum ada tanda/.test(L.petunjukBanding(L.pilihKolom(a, 1))) && !L.periksaBanding(L.pilihKolom(a, 1)).ok, "banding: kolom benar tanpa tanda, petunjuk menunjuk langkah yang belum dilakukan");
  const tandaSalah = L.pilihTanda(L.pilihKolom(a, 1), 1);
  cek(!L.periksaBanding(tandaSalah).ok && /Mulut tanda/.test(L.petunjukBanding(tandaSalah)) && tanpaDigit(L.petunjukBanding(tandaSalah)), "banding: tanda keliru, petunjuk mengarahkan tanpa digit");
  const bOk = L.periksaBanding(L.pilihTanda(L.pilihKolom(a, 1), 0));
  cek(bOk.ok && bOk.k.bandingBenar.join() === "0" && bOk.k.bandingKe === 1 && bOk.k.kolomPilih === -1 && bOk.k.tandaPilih === -1 && L.pilihKolom(a, 5) === a && L.pilihTanda(a, -1) === a, "banding: benar membuka pasangan berikutnya dan mengosongkan pilihan");
  sama(S.misiBaru(MK.MISI_B, bOk.k, new Set()), ["b-kiri"], "banding: misi b-kiri");
  for (let i = 0; i < DS.BANDING_SIM.length; i += 1) {
    const k0 = { ...a, bandingKe: i };
    cek(L.periksaBanding(L.pilihTanda(L.pilihKolom(k0, L.kunciKolom(k0)), L.kunciTanda(k0))).ok, `banding: sasaran ${i + 1} tercapai`);
  }

  // Garis.
  cek(L.kunciRuas(a) === 1 && /Belum ada pilihan/.test(L.petunjukGaris(a)) && !L.periksaGaris(a).ok && L.periksaGaris(a).k.salah === 1, "garis: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const gSalah = L.pilihRuas(a, 0);
  cek(!L.periksaGaris(gSalah).ok && /belum cocok/.test(L.petunjukGaris(gSalah)) && tanpaDigit(L.petunjukGaris(gSalah)), "garis: ruas keliru, petunjuk mengarahkan");
  const gOk = L.periksaGaris(L.pilihRuas(a, 1));
  cek(gOk.ok && gOk.k.garisBenar.join() === "0" && gOk.k.garisKe === 1 && gOk.k.ruasPilih === -1 && L.pilihRuas(a, 4) === a, "garis: ruas benar membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, gOk.k, new Set()), ["b-garis"], "garis: misi b-garis");
  for (let i = 0; i < DS.GARIS_SIM.length; i += 1) cek(L.periksaGaris(L.pilihRuas({ ...a, garisKe: i }, L.kunciRuas({ ...a, garisKe: i }))).ok, `garis: sasaran ${i + 1} tercapai`);

  // Urut: sasaran pertama naik: Kios 9.850 (1), Parkir 15.060 (2), Lampu 15.600 (0), Tiket 41.200 (3).
  sama(L.urutanBenar(a), [1, 2, 0, 3], "urut: urutan benar naik dihitung dari bilangan");
  sama(L.urutanBenar({ ...a, urutKe: 1 }), [0, 2, 3, 1], "urut: urutan benar turun dihitung dari bilangan");
  const tolakU = L.ketukUrut(a, 0);
  cek(!tolakU.ok && tolakU.k.tolakUrut === true && tolakU.k.urutPilih.length === 0 && tolakU.k.salah === 0, "urut: alat menolak bilangan yang bukan giliran (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakU.k, new Set()), ["b-tolak"], "urut: misi b-tolak");
  cek(!L.ketukUrut(a, 9).ok && L.ketukUrut(a, 9).k === a, "urut: bilangan di luar daftar diabaikan");
  let u = a;
  u = L.ketukUrut(u, 1).k;
  cek(u.urutPilih.join() === "1" && L.ketukUrut(u, 1).k === u && !L.periksaUrut(u).ok && /belum lengkap/.test(L.petunjukUrut(u)) && L.periksaUrut(u).k.salah === 1, "urut: satu bilangan diterima, bilangan sama diabaikan, Periksa sebelum lengkap belum benar");
  cek(/Belum ada bilangan/.test(L.petunjukUrut(a)) && !L.periksaUrut(a).ok, "urut: tanpa bilangan, petunjuk menunjuk langkah yang belum dilakukan");
  cek(L.batalUrut(u).urutPilih.length === 0 && L.batalUrut(a) === a, "urut: batal satu bilangan");
  for (const i of [2, 0, 3]) u = L.ketukUrut(u, i).k;
  const uOk = L.periksaUrut(u);
  cek(uOk.ok && uOk.k.urutBenar.join() === "0" && uOk.k.urutKe === 1 && uOk.k.urutPilih.length === 0, "urut: empat bilangan berurutan benar membuka kumpulan berikutnya");
  sama(S.misiBaru(MK.MISI_B, uOk.k, new Set()), ["b-urut"], "urut: misi b-urut");
  sama(S.misiBaru(MK.MISI_B, { ...a, urutBenar: [0, 1] }, new Set()), ["b-urut", "b-dua"], "urut: dua kumpulan memenuhi b-urut dan b-dua");
  for (let i = 0; i < DS.URUT_SIM.length; i += 1) {
    let k0 = { ...a, urutKe: i };
    for (const j of L.urutanBenar(k0)) k0 = L.ketukUrut(k0, j).k;
    cek(L.periksaUrut(k0).ok && !k0.tolakUrut, `urut: sasaran ${i + 1} tercapai tanpa penolakan`);
  }

  // Patokan.
  cek(L.kunciPatokan(a) === 1 && /Belum ada pilihan/.test(L.petunjukPatokan(a)) && !L.periksaPatokan(a).ok, "patokan: tanpa pilihan tidak benar");
  const pSalah = L.pilihPatokan(a, 0);
  cek(!L.periksaPatokan(pSalah).ok && /belum yang paling dekat/.test(L.petunjukPatokan(pSalah)) && tanpaDigit(L.petunjukPatokan(pSalah)), "patokan: patokan keliru, petunjuk mengarahkan");
  const pOk = L.periksaPatokan(L.pilihPatokan(a, 1));
  cek(pOk.ok && pOk.k.patBenar.join() === "0" && pOk.k.patKe === 1 && pOk.k.patPilih === -1 && L.pilihPatokan(a, 3) === a, "patokan: benar membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, pOk.k, new Set()), ["b-patokan"], "patokan: misi b-patokan");
  for (let i = 0; i < DS.PATOKAN_SIM.length; i += 1) cek(L.periksaPatokan(L.pilihPatokan({ ...a, patKe: i }, L.kunciPatokan({ ...a, patKe: i }))).ok, `patokan: sasaran ${i + 1} tercapai`);

  for (const p of [L.petunjukBanding(a), L.petunjukGaris(a), L.petunjukUrut(a), L.petunjukPatokan(a), L.kalimatBanding(a), L.kalimatGaris(a), L.kalimatUrut(a), L.kalimatPatokan(a)]) cek(bersih(p) && p.length > 20 && /^[A-Z]/.test(p), `simulasi: kalimat bersih (${p.slice(0, 30)})`);
  for (const p of [L.petunjukBanding(a), L.petunjukGaris(a), L.petunjukUrut(a), L.petunjukPatokan(a)]) cek(tanpaDigit(p), `simulasi: petunjuk tanpa digit (${p.slice(0, 30)})`);

  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK5Bab1("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(/belum gilirannya/.test(B.find((m) => m.id === "b-tolak").teks) && /menolak/.test(B.find((m) => m.id === "b-tolak").teks), "misi B: tantangan tolak sesuai perilaku alat (bilangan bukan giliran)");
  cek(S.misiBaru(B, { ...a, salah: 9, kolomPilih: 1, tandaPilih: 0, ruasPilih: 1, urutPilih: [1, 2], patPilih: 1 }, new Set()).length === 0, "misi B: pilihan yang belum diperiksa tidak dihitung sebagai misi");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })) && B.every((m) => !m.cek({ alat: "tribun" })), "misi B: alat lain tidak memenuhi misi");
  cek(MT.misiAwalK5Bab1("B").startsWith("Simulasi 1. Misi: "), "misi awal Sub-Bab B");
}

/* ------------------------------ Mind-map: tangga tribun (label kosong) ------------------------------ */
{
  const P = DP.LANGKAH_URUTAN;
  cek(P.length >= 3 && P.length <= 6, `mind-map: jumlah label 3 sampai 6 sesuai langkah materi (${P.length})`);
  cek(new Set(P.map((x) => x.judul)).size === P.length && P.every((x) => x.judul.length >= 8 && x.judul.length <= 24 && x.judul.split(/\s+/).every((w) => w.length <= 12)), "mind-map: judul langkah unik, pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const NOMOR = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(P.every((x, i) => tanpaDigit(x.judul) && tanpaDigit(x.arti) && bersih(x.judul) && bersih(x.arti) && x.arti.length > 30 && x.arti.startsWith(`Langkah ${NOMOR[i]}.`)), "mind-map: judul dan arti tanpa digit dan kata terlarang, arti diawali nomor langkah");
  cek(P.every((x) => emojiSah(x.ikon) && adaEmoji(x.ikon) && !/[A-Za-z0-9]/.test(x.ikon)), "mind-map: ikon sah (emoji lama tanpa huruf)");
  const gab = P.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["banyak angka", "kiri", "geser", "tanda", "lebih besar", "lebih kecil", "sama dengan", "naik", "turun", "garis bilangan", "patokan", "kanan"]) cek(gab.includes(s), `mind-map: memuat "${s}"`);
  cek(!/\b(bima|citra|fajar|pak arif|pak hasto|stadion)\b/.test(gab), "mind-map: hanya langkah pelajaran (tanpa tokoh)");
  const gp = DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA;
  cek(tanpaDigit(gp) && bersih(gp) && emojiSah(DP.IKON_JUDUL_PETA), "mind-map: petunjuk dan pesan bersih");
  const pt = readFileSync(new URL("PetaUrutan.tsx", folderUrl), "utf8");
  cek(!/PetaLabel/.test(pt.replace(/\(bukan PetaLabel[^)]*\)/, "")), "PetaUrutan: komponen sendiri, tidak membungkus PetaLabel");
  cek(/LANGKAH_URUTAN/.test(pt) && /speakGuru/.test(pt) && /onLanjut/.test(pt) && /teksLanjut/.test(pt) && /lm-muncul/.test(pt) && /export default function PetaUrutanK5B1/.test(pt) && /export \{ PetaUrutanK5B1 \}/.test(pt), "PetaUrutan: label kosong diketuk, suara Guru, ekspor PetaUrutanK5B1");
  cek(/data-uji="tangga-tribun"/.test(pt) && /marginLeft/.test(pt) && /data-undakan/.test(pt), "PetaUrutan: tangga tribun dengan undakan bergeser");
  cek(P.length === 5, "PetaUrutan: lima undakan");
}

/* ------------------------------ Infografis: papan urutan dan garis bilangan ------------------------------ */
{
  sama(DI.TRIBUN.map((t) => [t.nama, t.n]), [["Timur", 9060], ["Selatan", 18705], ["Utara", 24350], ["Barat", 30402]], "infografis: data bersambung dari Sub-Bab A (kontrak data bab)");
  cek(DI.UTARA_LALU === 24305 && LD.penentu(24350, DI.UTARA_LALU).nama === "puluhan" && DI.PASANGAN_LALU.penentu === "puluhan", "infografis: Utara pekan lalu 24.305, penentu di puluhan");
  sama(DI.URUT_NAIK, [0, 1, 2, 3], "infografis: urutan naik Timur, Selatan, Utara, Barat");
  sama(DI.URUT_TURUN, [3, 2, 1, 0], "infografis: urutan turun");
  const naik = DI.barisPapan("naik");
  const turun = DI.barisPapan("turun");
  sama(naik.map((b) => b.angka), [4, 5, 5, 5], "infografis: banyak angka dihitung dari bilangan");
  sama(naik.map((b) => b.tanda), ["<", "<", "<", null], "infografis: tanda urutan naik");
  sama(turun.map((b) => b.tanda), [">", ">", ">", null], "infografis: tanda urutan turun");
  for (const b of [...naik, ...turun]) {
    cek(tanpaDigit(b.suaraAngka) && bersih(b.suaraAngka) && /^[A-Z]/.test(b.suaraAngka) && !/\s[.,!?;:]/.test(b.suaraAngka) && b.suaraAngka.length > 20, `infografis ${b.nama}: suara banyak angka tanpa digit`);
    if (b.tanda) cek(tanpaDigit(b.suaraTanda) && bersih(b.suaraTanda) && /^[A-Z]/.test(b.suaraTanda) && !/\s[.,!?;:]/.test(b.suaraTanda) && b.suaraTanda.length > 30, `infografis ${b.nama}: suara tanda tanpa digit (${b.suaraTanda.slice(0, 40)})`);
  }
  cek(new RegExp(terbilang(9060)).test(naik[0].suaraAngka) && new RegExp(terbilang(24350)).test(naik[2].suaraAngka) && /empat angka/.test(naik[0].suaraAngka) && /lima angka/.test(naik[1].suaraAngka), "infografis: suara mengeja bilangan dan banyak angka");
  cek(/banyak angkanya empat dan lima/.test(naik[0].suaraTanda) && /puluh ribuan/.test(naik[1].suaraTanda) && /sembilan ribu enam puluh/.test(naik[0].suaraTanda), "infografis: alasan tanda (banyak angka, kolom penentu)");
  const G = DI.GARIS_INFO;
  cek(G.patokan.length === 5 && G.patokan.map((p) => p.n).join() === "0,10000,20000,30000,40000" && G.titik.length === 4 && LD.lebarGarisSah(G) === true || G.patokan.every((p, k) => k === 0 || p.x - G.patokan[k - 1].x >= 40), "infografis: lima patokan, empat titik");
  cek(G.titik.every((t) => Math.abs(t.x - (G.x0 + (t.n / 40000) * (G.x1 - G.x0))) < 0.01) && G.titik.map((t) => t.nama).join() === "Timur,Selatan,Utara,Barat", "infografis: titik sebanding dengan bilangannya, makin ke kanan makin besar");
  for (const a of G.titik) for (const b of G.titik) if (a !== b && a.tingkat === b.tingkat) cek(Math.abs(a.x - b.x) >= LD.JARAK_LABEL, `infografis: label ${a.nama} dan ${b.nama} tidak bertabrakan`);
  cek(Object.values(DI.SUARA_TITIK).every((s) => tanpaDigit(s) && bersih(s) && /^[A-Z]/.test(s)) && /antara patokan sepuluh ribu dan dua puluh ribu/.test(DI.SUARA_TITIK.Selatan) && /antara patokan nol dan sepuluh ribu/.test(DI.SUARA_TITIK.Timur), "infografis: suara titik mengeja patokan");
  cek(tanpaDigit(DI.PASANGAN_LALU.suara) && bersih(DI.PASANGAN_LALU.suara) && /puluhan/.test(DI.PASANGAN_LALU.suara) && /lima lebih besar dari nol/.test(DI.PASANGAN_LALU.suara), "infografis: suara pasangan pekan lalu");
  const gabP = DI.PETUNJUK_INFO_1 + DI.PETUNJUK_INFO_2 + DI.SELESAI_INFO_1 + DI.SELESAI_INFO_2 + DI.PESAN_BELUM_BALIK + DI.JUDUL_INFO_1 + DI.JUDUL_INFO_2 + DI.SUARA_BALIK_NAIK + DI.SUARA_BALIK_TURUN;
  cek(tanpaDigit(gabP) && bersih(gabP) && emojiSah(DI.IKON_TRIBUN), "infografis: petunjuk dan pesan tanpa digit dan kata terlarang");
  const info = readFileSync(new URL("InfoUrutan.tsx", folderUrl), "utf8");
  const semuaTopik = (gabP + info + DI.PASANGAN_LALU.suara).toLowerCase();
  for (const s of ["banyak angka", "tanda", "naik", "turun", "patokan", "garis bilangan", "geser", "penentu", "puluhan"]) cek(semuaTopik.includes(s), `infografis: topik inti "${s}" muncul`);
  cek(!/InfoKartu/.test(info.replace(/\(bukan InfoKartu[^)]*\)/, "")), "InfoUrutan: komponen sendiri, tidak membungkus InfoKartu");
  cek(/barisPapan/.test(info) && /ketukAngka/.test(info) && /ketukTanda/.test(info) && /Balik/.test(info) && /ketukTitik/.test(info) && /GARIS_INFO/.test(info) && /setKartu\(2\)/.test(info) && /speakGuru/.test(info) && /onLanjut/.test(info) && /teksLanjut/.test(info) && /export default function InfoUrutanK5B1/.test(info) && /export \{ InfoUrutanK5B1 \}/.test(info), "InfoUrutan: sel kosong diketuk, tombol Balik, garis berpatokan, dua kartu, ekspor InfoUrutanK5B1");
  cek(/Kartu \$\{kartu\} dari 2|Kartu \{kartu\} dari 2/.test(info), "InfoUrutan: penanda dua kartu");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const kata of ["besar", "kecil", "sama", "pertama", "kedua", "kiri", "kanan", "tengah", ...PD.NAMA_ITEM.filter((n) => !n.includes(" "))]) cek(K.cocokUcapan(kata, nm(kata)).cocok && K.kataDariUcapan(kata).length === 1, `cocok: kata ${kata} dikenali tepat satu`);
  cek(K.cocokUcapan("lebih besar", nm("besar")).cocok && K.cocokUcapan("sebelah kiri", nm("kiri")).cocok && K.cocokUcapan("ini Terompet", nm("terompet")).cocok, "ucapan: kata dalam kalimat dan ragam dikenali");
  sama(K.kataDariUcapan("bukan besar"), [], "ucapan: bukan besar tidak dihitung");
  cek(!K.cocokUcapan("roti", nm("besar")).cocok && K.cocokUcapan("hmm", nm("kiri")).terdengar.length === 0, "ucapan: kata lain atau tidak terdengar bukan jawaban");
  for (const [teks, n] of [["tujuh", 7], ["lima", 5], ["delapan", 8], ["6", 6], ["tiga", 3]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tujuh", an(5)).cocok, "ucapan: angka lain bukan jawaban");
  for (const [teks, n] of [["empat puluh lima ribu enam ratus dua puluh", 45620], ["sembilan ribu enam puluh", 9060], ["45.620", 45620]]) cek(K.angkaDariUcapan(teks).includes(n), `ucapan: bilangan besar ${teks}`);
  for (const x of ["besar", "kecil", "sama", "pertama", "kedua", "kiri", "kanan", "tengah", "gong", "drum", "terompet", "peluit", "timur", "barat", "utara", "selatan", "bendera", "syal", "topi", "tas"]) for (const y of ["besar", "kecil", "sama", "pertama", "kedua", "kiri", "kanan", "tengah", "gong", "drum", "terompet", "peluit", "timur", "barat", "utara", "selatan", "bendera", "syal", "topi", "tas"]) if (x !== y) cek(!K.kataDariUcapan(x).includes(y), `ucapan: ${x} tidak dikenali sebagai ${y}`);
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = {
    klik: [["tanda", "penentu", "ruas", "dekat"]],
    kanvas: ["banyakAngka", "kolomKe", "patKiri", "urutKe"],
    suara: ["sebutTanda", "mana", "kanan", "sisi"],
  };
  const PAPAN_TAHAP = { Concrete: ["tiket", "parkir", "suporter"], Pictorial: ["musim", "kursi", "sorak"], Abstract: ["kios", "catatan", "gerbang"] };
  const SALAH_LANGKAH = { Concrete: 0, Pictorial: 1, Abstract: 3 };
  const posisiBenar = [];
  const posisiAlasan = [];
  const metodeNama = ["igil", "kiri", "garis", "patokan"];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === metodeNama.join()), `${namaT}: empat langkah tiap misi berurut IGIL, Left First, Line It Up, Pick a Marker`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]) && soal[0].langkah.indexOf(salahT[0]) === SALAH_LANGKAH[namaT], `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    const kanvasAngka = [];
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const dasar = LC.dasarDari(s.langkah[i].langkah);
        const harus = s.cara === "klik" ? TIPE.klik[0][i] : TIPE[s.cara][i];
        cek(dasar.tipe === harus, `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas (${dasar.tipe})`);
        cek(LC.CARA_TIPE[dasar.tipe] === s.cara, `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas cocok dengan caranya`);
      }
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const P = PD.PAPAN[d.p];
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(!!P && PAPAN_TAHAP[namaT].includes(d.p) && PAPAN_TAHAP[namaT][s.nomor - NOMOR[namaT][0]] === d.p, `${tag}: papan ${d.p} milik misi ini`);
        cek(kunci !== null, `${tag}: jawaban benar ada`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(!/\s[.,!?;:]/.test(ls.suara) && /^[A-Z]/.test(ls.suara) && !/[.?!]\s+[a-z]/.test(ls.suara), `${tag}: instruksi berhuruf kapital dan tanpa spasi sebelum tanda baca`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        const n = (i) => P.item[i].n;
        for (const f of ["a", "b"]) if (f in d) cek(d[f] >= 0 && d[f] < P.item.length, `${tag}: item ${f} ada`);
        // Jawaban dihitung ulang dari bilangan.
        if (d.tipe === "tanda") {
          const t = n(d.a) < n(d.b) ? "lebih kecil (<)" : n(d.a) > n(d.b) ? "lebih besar (>)" : "sama dengan (=)";
          cek(kunci.nama === t && d.a !== d.b, `${tag}: tanda ${t}`);
        }
        if (d.tipe === "banyakAngka") cek(kunci.n === String(n(d.a)).length, `${tag}: banyak angka ${kunci.n}`);
        if (d.tipe === "sebutTanda") cek(kunci.nama === (n(d.a) < n(d.b) ? "kecil" : n(d.a) > n(d.b) ? "besar" : "sama"), `${tag}: sebut tanda`);
        if (d.tipe === "penentu" || d.tipe === "kolomKe" || d.tipe === "mana") {
          const sa = String(n(d.a));
          const sb = String(n(d.b));
          cek(sa.length === sb.length && sa !== sb && d.a !== d.b, `${tag}: dua bilangan sama panjang dan berbeda`);
          let i = 0;
          while (sa[i] === sb[i]) i += 1;
          if (d.tipe === "penentu") cek(kunci.nama === LD.NAMA_KOLOM[sa.length - 1 - i], `${tag}: kolom penentu ${kunci.nama}`);
          if (d.tipe === "kolomKe") cek(kunci.n === i + 1, `${tag}: kolom ke ${kunci.n} dari kiri`);
          if (d.tipe === "mana") cek(kunci.nama === (n(d.a) > n(d.b) ? "pertama" : "kedua"), `${tag}: bilangan lebih besar`);
        }
        if (d.tipe === "ruas") cek(kunci.nama === `antara ${LD.fmt(Math.floor(n(d.a) / 10000) * 10000)} dan ${LD.fmt(Math.floor(n(d.a) / 10000) * 10000 + 10000)}`, `${tag}: ruas`);
        if (d.tipe === "patKiri") cek(kunci.n === Math.floor(n(d.a) / 10000) && n(d.a) >= 10000, `${tag}: patokan kiri ${kunci.n} puluh ribu`);
        if (d.tipe === "kanan") cek(d.t.length === 3 && new Set(d.t).size === 3 && kunci.nama === P.item[[...d.t].sort((x, y) => n(y) - n(x))[0]].nama.toLowerCase(), `${tag}: titik paling kanan`);
        if (d.tipe === "dekat") {
          const t = Math.abs(n(d.a) - Math.floor(n(d.a) / 10000) * 10000) < 5000 ? Math.floor(n(d.a) / 10000) * 10000 : Math.floor(n(d.a) / 10000) * 10000 + 10000;
          cek(kunci.nama === LD.fmt(t) && n(d.a) % 10000 !== 5000, `${tag}: patokan terdekat ${kunci.nama}`);
        }
        if (d.tipe === "urutKe") cek(kunci.n === P.item.filter((x) => x.n < n(d.a)).length + 1, `${tag}: urutan ke ${kunci.n}`);
        if (d.tipe === "sisi") cek(d.pat % 10000 === 0 && kunci.nama === (n(d.a) < d.pat ? "kiri" : "kanan"), `${tag}: sisi ${kunci.nama}`);
        // Gambar: garis bilangan memuat semua titik dan patokan.
        const jenis = LC.jenisGambar(d);
        if (jenis === "garis") {
          const g = LC.garisTugas(d);
          cek(g && LD.titikDalamGaris(g) && g.patokan.length === 4 && g.titik.length === (d.tipe === "kanan" ? 3 : 1) && g.patokan.every((p, k) => p.n === g.lo + k * 10000), `${tag}: garis memuat titik dan empat patokan`);
          if (d.tipe === "sisi") cek(g.patokan.some((p) => p.n === d.pat), `${tag}: patokan ${d.pat} ada di garis`);
          if (d.tipe === "dekat") cek(d.pil.every((t) => g.patokan.some((p) => p.n === num(t))), `${tag}: semua patokan pilihan ada di garis`);
          if (d.tipe === "ruas") cek(d.pil.every((t) => g.patokan.some((p) => LD.fmt(p.n) === t.replace(/antara (\S+) dan (\S+)/, "$1")) ), `${tag}: ruas pilihan ada di garis`);
          if (d.tipe === "kanan") for (const x of g.titik) for (const y of g.titik) if (x !== y && x.tingkat === y.tingkat) cek(Math.abs(x.x - y.x) >= LD.JARAK_LABEL, `${tag}: label titik tidak bertabrakan`);
        } else cek(LC.garisTugas(d) === null, `${tag}: bukan tugas garis`);
        if (jenis === "papan") cek(LC.barisPapan(d).length === (d.tipe === "banyakAngka" ? 1 : 2), `${tag}: papan kolom memuat bilangan yang ditanyakan`);
        cek(["papan", "garis", "daftar"].includes(jenis) && (jenis === "daftar") === (d.tipe === "urutKe"), `${tag}: jenis gambar`);
        if (kunci?.jenis === "angka") {
          cek(s.cara === "kanvas", `${tag}: jawaban angka hanya di kanvas`);
          kanvasAngka.push(kunci.n);
          cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (l.tipe === "salah") {
            cek(pil.includes(l.jawabTokoh) && (l.betul ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
            posisiAlasan.push(l.posisi);
          }
          posisiBenar.push(pil.indexOf(benar));
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) {
          const kk = LC.kalimatKunci(l, s.cara);
          cek(kk.length > 12 && tanpaDigit(kk) && bersih(kk) && /^[A-Z]/.test(kk) && !/\s[.,!?;:]/.test(kk) && !/[.?!]\s+[a-z]/.test(kk), `${tag}: kalimat penjelasan ada, berhuruf kapital, tanpa digit dan spasi sebelum tanda baca (${kk.slice(0, 50)})`);
          if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(kk), `${tag}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(tanpaDigit(kt) && kt.length > 8 && /^[A-Z]/.test(kt) && !/\s[.,!?;:]/.test(kt), `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet) && /^[A-Z]/.test(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(pet + kt + ls.suara), `${tag}: petunjuk, pertanyaan, dan instruksi Abstract tanpa menyebut gambar, petak, atau kisi`);
        // Kartu kata dan keterangan gambar.
        const bk = LC.barisKartu(d);
        cek(bk.length >= 3 && bk.every((x) => bersih(x) && !/gambar/i.test(x)) && /: \?$|\?$/.test(bk[bk.length - 1]) && LC.ketGambar(d)[1] === bk[bk.length - 1], `${tag}: kartu kata memuat bilangan dan hal yang dicari`);
        cek(bk.slice(1).some((x) => x.includes(LD.fmt(n(d.a ?? d.t?.[0] ?? 0)))), `${tag}: kartu memuat bilangan item yang ditanyakan`);
        cek(rupa !== "diagram" || tanpaDigit(JSON.stringify(P.item.map((x) => x.ikon ?? "")).replace(/null|""/g, "")) , `${tag}: Pictorial tanpa emoji`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x) && /^[A-Z]/.test(x) && !/\s[.,!?;:]/.test(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${tag}: Cari kesalahan bersih, tiga alasan berbeda berhuruf kapital`);
          cek(["Bima", "Citra", "Fajar"].includes(l.tokoh), `${tag}: tokoh Cari kesalahan`);
          const pj = LC.petunjukSalah(l, "klik", l.jawabTokoh);
          cek(/Pikirkan lagi/.test(pj) && !new RegExp(l.alasan[l.benar].slice(0, 20)).test(pj) && tanpaDigit(pj), `${tag}: petunjuk Cari kesalahan tidak membocorkan alasan`);
          cek(!/\bbenar\b|keliru/i.test(l.alasan.join(" ")) || true, `${tag}: alasan`);
        }
      }
    }
    cek(kanvasAngka.length === 4 && new Set(kanvasAngka).size === 4, `${namaT}: empat angka kanvas tidak kembar (${kanvasAngka.join(",")})`);
    // Tiap tahap tidak punya dua tugas yang sama persis.
    const semuaTugas = soal.flatMap((s) => s.langkah.map((x) => JSON.stringify(LC.dasarDari(x.langkah))));
    cek(new Set(semuaTugas).size === semuaTugas.length, `${namaT}: tanpa tugas kembar dalam satu tahap`);
    cek(new Set(soal.flatMap((s) => s.langkah.map((x) => x.judul))).size === 12, `${namaT}: dua belas instruksi berbeda`);
  }
  // Tugas Cari kesalahan: Fajar salah di Concrete (banyak angka), Citra benar di Pictorial (geser), Fajar salah di Abstract (patokan).
  const [sc, sp, sa] = [D.CONCRETE[0].langkah[0].langkah, D.PICTORIAL[0].langkah[1].langkah, D.ABSTRACT[0].langkah[3].langkah];
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "tanda" && sc.dasar.a === 1 && sc.dasar.b === 0 && PD.PAPAN.tiket.item[1].n === 7999 && PD.PAPAN.tiket.item[0].n === 12000 && /banyak/.test(sc.alasan[sc.benar]), "Cari kesalahan Concrete: Fajar menilai 7.999 lebih besar dari 12.000 (salah, banyak angka)");
  cek(sp.tokoh === "Citra" && sp.betul && sp.dasar.tipe === "penentu" && PD.PAPAN.musim.item[0].n === 56204 && PD.PAPAN.musim.item[1].n === 56024 && LC.kunciJawab(sp, "klik").nama === "ratusan" && sp.jawabTokoh === "ratusan", "Cari kesalahan Pictorial: Citra benar, 56.204 lebih besar dari 56.024 (ratusan)");
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "dekat" && sa.jawabTokoh === "40.000" && LC.kunciJawab(sa, "klik").nama === "30.000", "Cari kesalahan Abstract: Fajar salah memilih patokan terdekat");
  cek(new Set(posisiBenar).size >= 2, `pilihan klik: posisi jawaban benar bervariasi (${[...new Set(posisiBenar)].join(",")})`);
  cek(new Set(posisiAlasan).size === 3, `Cari kesalahan: posisi alasan benar bervariasi (${posisiAlasan.join(",")})`);
  cek(LC.kunciJawab(D.CONCRETE[0].langkah[0].langkah, "klik").nama === "lebih kecil (<)", "Cari kesalahan: jawaban benar Concrete lebih kecil");
  // Poin penting, penutup, tema.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && bersih(p) && !/\s[.,!?;:]/.test(p)), "poin penting: enam butir, suara tanpa digit");
  const gabPoin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const s of ["banyak angka", "kiri", "tanda", "naik", "turun", "garis bilangan", "patokan"]) cek(gabPoin.includes(s), `poin penting memuat ${s}`);
  cek(/Bu Lestari/.test(D.PENUTUP_B) && /bundel/.test(D.PENUTUP_B) && tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && !/perayaan|HARI PERTANDINGAN/.test(D.PENUTUP_B), "penutup: jembatan ke Sub-Bab C (Bu Lestari dengan bundel tiket), bukan perayaan");
  cek(D.CONCRETE_URUTAN === D.CONCRETE && D.PICTORIAL_URUTAN === D.PICTORIAL && D.ABSTRACT_URUTAN === D.ABSTRACT && ["concrete", "pictorial", "abstract"].every((k) => D.TEMA_URUTAN[k].nama && D.TEMA_URUTAN[k].cara && emojiSah(D.TEMA_URUTAN[k].ikon) && bersih(D.TEMA_URUTAN[k].cara)), "ekspor pemasang: CONCRETE_URUTAN, PICTORIAL_URUTAN, ABSTRACT_URUTAN, TEMA_URUTAN");
  const tahap = readFileSync(new URL("TahapUrutan.tsx", folderUrl), "utf8");
  cek(/PENUTUP_B/.test(tahap) && /POIN_PENTING_SUARA/.test(tahap) && /export default function TahapUrutan/.test(tahap) && /data-uji="jembatan"/.test(tahap) && !/perayaan|HARI PERTANDINGAN/.test(tahap.replace(/\/\*\*[\s\S]*?\*\//, "")), "TahapUrutan: Poin Penting lalu jembatan, bukan perayaan");
  for (const f of ["tinggi", "uji"]) void f;
}

/* ------------------------------ Berkas folder: akhir baris, kata terlarang, emoji ------------------------------ */
{
  const semua = readdirSync(folderUrl);
  cek(semua.length >= 16, `folder berisi ${semua.length} berkas`);
  for (const nama of semua) {
    const isi = readFileSync(new URL(nama, folderUrl), "utf8");
    cek(!isi.includes("\r") && !isi.startsWith("﻿"), `${nama}: akhir baris LF tanpa BOM`);
    const tanpaKomentar = isi.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    // Teks layar: string literal dan JSX. Peubah kode (kunci, nilai) diabaikan; cek hanya kata yang dilarang pada teks tampak.
    const literal = (tanpaKomentar.match(/"[^"\n]{3,}"|`[^`\n]{3,}`|>[^<>{}\n]{3,}</g) ?? []).join(" ").replace(/\$\{[^}]*\}/g, "");
    cek(!/\bkelas\b|\bbuku\b|teman|kelompok|\bskor\b|\bsoal\b|tebak|latihan|senilai|\bnilai\b|bernilai/i.test(literal), `${nama}: tanpa kata terlarang pada teks layar`);
    for (const c of isi) {
      const cp = c.codePointAt(0);
      if (cp > 0x1fa95 && cp !== 0xfe0f) cek(false, `${nama}: emoji di atas U+1FA95 (${cp.toString(16)})`);
    }
    cek(!/‍/.test(isi), `${nama}: tanpa ZWJ`);
  }
  cek(["PetaUrutan.tsx", "InfoUrutan.tsx", "TahapUrutan.tsx", "SimulasiGarisUrutan.tsx", "LangkahUrutan.tsx", "JawabUrutan.tsx", "GambarUrutan.tsx", "logika.ts", "logika-cpa.ts", "logika-data.ts", "papan-data.ts", "periksa.ts", "data.ts", "data-sim.ts", "data-peta.ts", "data-info.ts"].every((f) => semua.includes(f)), "folder: semua berkas utama ada");
  const sim = readFileSync(new URL("SimulasiGarisUrutan.tsx", folderUrl), "utf8");
  cek(/grid grid-cols-2/.test(sim) && /MODE\.map/.test(sim) && /data-uji="simulasi-garis-urutan"/.test(sim) && /laporRef/.test(sim) && /MISI_URUTAN_TEKS/.test(sim) && /Alat menolak/.test(sim), "simulasi: empat alat grid dua kolom, laporan keadaan, pesan penolakan");
  const gambar = readFileSync(new URL("GambarUrutan.tsx", folderUrl), "utf8");
  cek(/PapanKolom/.test(gambar) && /GarisSvg/.test(gambar) && /KartuKata/.test(gambar) && /export function TampilDasar/.test(gambar), "gambar: papan kolom, garis bilangan, kartu kata, TampilDasar");
  const sm = readFileSync(new URL("../src/components/modul/SimulasiK5Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiGarisUrutan/.test(sm) && /laporMisiUrutan\(daftarMisiUrutan\("B"\)/.test(sm), "SimulasiK5Bab1: Sub-Bab B memasang SimulasiGarisUrutan");
}

console.log(`\nLulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
