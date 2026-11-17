// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 6 Sub-Bab B ("Loket Karcis"), cerita Pasar Malam Kampung.
// Memeriksa: komidi putar (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), lembar karcis dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, bukan pasangan bilangan Story, batas rupa, tata letak kanvas, simulasi loket karcis dan usulan misinya,
// emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-karcis-k1b6b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/karcis-k1b6b/logika.ts");
const D = await import("../src/components/modul/karcis-k1b6b/data.ts");
const K = await import("../src/components/modul/karcis-k1b6b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const M6 = await import("../src/components/modul/misi-bab6.ts");
const folderUrl = new URL("../src/components/modul/karcis-k1b6b/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|kali|dikali|bagi|dibagi)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];
const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);

/* ------------------------------ Dasar ------------------------------ */
{
  const m = { tipe: "maju", a: 4, b: 6, jenis: "titik" };
  const be = { tipe: "belasan", a: 12, b: 6, jenis: "titik" };
  const ke = { tipe: "kembar", a: 3, b: 4, jenis: "titik" };
  const kp = { tipe: "kembar", a: 5, b: 6, jenis: "titik", kartu: [5, 6, 9, 12] };
  const ba = { tipe: "bagan", a: 8, b: 4, jenis: "titik" };
  const lo = { tipe: "lompat", a: 9, b: 6, jenis: "titik" };
  sama([m, be, ke, kp, ba, lo].map(L.kunciLangkah), [10, 18, 7, null, 12, 15], "kunci dihitung dari data");
  sama([m, be, ke, kp, ba, lo].map(L.metodeLangkah), ["igil", "igil", "kembar", "kembar", "bagan", "lompat"], "metode tiap langkah");
  sama([L.kePuluh(ba), L.sisaPuluh(ba), L.kembarDari(ke), L.puluhan(18), L.satuan(18)], [2, 2, 3, 1, 8], "pecahan bagan, kembar, puluhan dan satuan");
  sama([L.pasanganKembar([5, 6, 9, 12]), L.pasanganKembar([1, 2, 3, 9]), L.pasanganKembar([2, 9, 14, 20])], [[0, 1], null, null], "pasangan kembar tunggal");
  sama([L.opsiMulai(m), L.opsiSatuan(be), L.opsiKembar(ke), L.opsiPisah({ a: 9 }), L.opsiSisa({ a: 9, b: 7 }), L.opsiPisah(ba)], [[4, 5, 6], [7, 8, 9], [5, 6, 7], [1, 2, 3], [5, 6, 7], [1, 2, 3]], "pilihan tiap langkah memuat yang benar");
  sama(L.kartuBagan(ba), ["8 + 2 = 10", "sisanya 2", "10 + 2 = ?"], "kartu langkah bagan");
  for (const l of [m, be, ke, kp, ba, lo]) cek(tanpaDigit(L.kalimatJumlah(l)) && L.kalimatJumlah(l).length > 20, `kalimat jumlah ${l.tipe} tanpa digit`);
  cek(/mulai dari lima/i.test(L.kalimatJumlah(m)) && /sepuluh/.test(L.kalimatJumlah(ba)) && /puluhannya tetap/i.test(L.kalimatJumlah(be)), "kalimat jumlah menyebut caranya");
  for (const l of [m, be, ke, ba, lo]) cek(L.pilihanDari(l).includes(L.kunciLangkah(l)) && new Set(L.pilihanDari(l)).size === 3, `pilihan jawaban ${l.tipe}`);
}

/* ------------------------------ Mind-map komidi putar ------------------------------ */
{
  const t = D.TEMPAT_KOMIDI;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "komidi: tiga masalah, tujuh tiang, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 32 && tanpaDigit(x.kunci)), "komidi: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "komidi: tiang bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["hitung maju", "genapkan sepuluh", "belasan", "kembar tambah satu", "bagan bagian dan keseluruhan", "lompat di garis bilangan", "pilih cara"]) cek(gab.includes(k), `komidi: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["hasil sama", "puluhan tetap", "sepuluh dulu", "jumlah"]) cek(hasil.includes(k), `komidi: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(igil|kaka|abang|mamah|rt|karcis|loket|komidi|kucing|pasar|rombongan|kue|lampion)\b/i.test(x.kunci)), "komidi: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci) || /dua kali/.test(x.kunci)), "komidi: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_KOMIDI + D.PETUNJUK_URUT_KOMIDI) && !TERLARANG.test(D.SUARA_KOMIDI), "komidi: suara tanpa digit dan kata terlarang");
  sama(Object.keys(D.KELOMPOK_KOMIDI), ["masalah", "metode", "hasil"], "komidi: tiga kelompok warna");
  const lb = L.labelDari(t, 61);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "komidi: tiang hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis lembar karcis ------------------------------ */
{
  const b = D.BARIS_KARCIS;
  sama(b.length, 5, "lembar: lima baris");
  const jumlah = (i) => angka(b[i].bilangan).reduce((p, q) => p + q, 0);
  sama([angka(b[0].bilangan), angka(b[0].cara), angka(b[0].hasil)], [[8, 7], [9], [15]], "lembar: rombongan delapan dan tujuh, hitung maju dari sembilan, lima belas");
  sama(angka(b[0].cara)[0], angka(b[0].bilangan)[0] + 1, "lembar: hitung maju dimulai dari bilangan sesudahnya");
  sama([angka(b[1].bilangan), angka(b[1].cara), angka(b[1].hasil)], [[9, 5], [1, 10], [14]], "lembar: genapkan sepuluh sembilan dan lima, empat belas");
  sama(angka(b[1].cara)[1] - angka(b[1].bilangan)[0], 1, "lembar: satu karcis menggenapkan sembilan menjadi sepuluh");
  sama([angka(b[2].bilangan), angka(b[2].cara), angka(b[2].hasil)], [[13, 4], [3, 4, 7], [17]], "lembar: belasan tiga belas dan empat, tujuh belas");
  sama([angka(b[2].cara)[0], angka(b[2].cara)[2]], [angka(b[2].bilangan)[0] % 10, angka(b[2].cara)[0] + angka(b[2].cara)[1]], "lembar: satuan tiga ditambah empat sama dengan tujuh dihitung ulang");
  sama([angka(b[3].bilangan), angka(b[3].hasil)], [[11, 5], [16]], "lembar: pilih cara sebelas dan lima, enam belas");
  for (const i of [0, 1, 2, 3]) sama(angka(b[i].hasil)[0], jumlah(i), `lembar: baris ${i + 1} hasil dihitung ulang`);
  sama([angka(b[4].bilangan), angka(b[4].cara), angka(b[4].hasil)], [[8], [8], [14, 15]], "lembar: salah langkah, bukan empat belas tetapi lima belas");
  sama(angka(b[4].hasil)[1], jumlah(0), "lembar: yang benar sama dengan hasil baris pertama");
  sama(D.TEMPAT_KARCIS.length, 15, "lembar: lima belas kotak");
  cek(new Set(D.TEMPAT_KARCIS.map((x) => x.kunci)).size === 15, "lembar: label unik");
  cek(D.TEMPAT_KARCIS.every((x) => x.kunci.length <= 24) && tanpaDigit(D.SUARA_KARCIS) && !TERLARANG.test(D.SUARA_KARCIS), "lembar: label pendek, suara tanpa digit");
  cek(D.KOLOM_KARCIS.length === 3 && Object.keys(D.KELOMPOK_KARCIS).every((k2) => D.TEMPAT_KARCIS.some((x) => x.kelompok === k2)), "lembar: tiga kolom");
  cek(Object.values(D.KELOMPOK_KARCIS).every((p) => tanpaDigit(p)), "lembar: petunjuk kolom tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
// Pasangan bilangan Story (tidak dipakai CPA): delapan tujuh, sembilan lima, tiga belas empat, sebelas lima, enam enam, enam tujuh, tujuh delapan, delapan sembilan, tiga sepuluh, dua belas tiga.
const PASANGAN_STORY = new Set(["7+8", "5+9", "4+13", "5+11", "6+6", "6+7", "8+9", "3+10", "3+12", "9+9"]);
const kunciPasang = (l) => [l.a, l.b].sort((p, q) => p - q).join("+");
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Loket Karcis (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const jawab = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(jawab).size === jawab.length && jawab.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${jawab.join(",")})`);
  cek(jawab.every((n) => n >= 0 && n <= 20), `${nama}: angka nol sampai dua puluh (${jawab.join(",")})`);
  cek(jawab.filter((n) => n >= 10).length >= 3 && jawab.filter((n) => n < 10).length >= 1, `${nama}: ada belasan dan satuan`);
  cek(jawab.filter((n) => n >= 13 && n <= 17).length <= 4, `${nama}: hasil seperti catatan Story paling banyak empat (${jawab.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => x.cara), ["klik", "kanvas"], `${nama}: dua soal tanpa angka di Klik dan Kanvas`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length === 1 && salah.every((x) => x.cara === "klik"), `${nama}: satu soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 20, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && !TERLARANG.test(t)), `${nama}: Cari kesalahan tanpa digit`);
    cek(L.pilihanDari(l).includes(l.jawabTokoh) && L.pilihanDari(l).includes(kunci), `${nama}: pilihan memuat jawaban tokoh dan kunci`);
    cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
    cek(l.keliru.length > 30 && l.alasan[l.benar].length > 15, `${nama}: alasan dan kekeliruan jelas`);
  }

  for (const x of semua) {
    const l = L.dasarDari(x.langkah);
    const k = L.kunciLangkah(x.langkah);
    // Batas rupa.
    if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.WARNA_BENDA[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: benda ${l.jenis} punya gambar dan warna`);
    else cek(D.EMOJI[l.jenis] === undefined, `${nama}: tanpa gambar benda (${l.jenis})`);
    cek(!PASANGAN_STORY.has(kunciPasang(l)) || (l.tipe === "kembar" && l.kartu), `${nama}: bukan pasangan bilangan Story (${l.a} dan ${l.b})`);
    cek((l.tipe === "kembar" && l.kartu) || (l.a + l.b <= 20 && l.a >= 1 && l.b >= 1), `${nama}: jumlah paling besar dua puluh`);
    if (l.tipe === "maju") cek(l.a >= 3 && l.b >= 2 && l.b <= 7 && l.a + l.b <= 20 && L.opsiMulai(l).includes(l.a + 1) && L.opsiMulai(l).includes(l.a), `${nama}: hitung maju, pilihan awal memuat bilangan awal dan sesudahnya`);
    if (l.tipe === "belasan") cek(l.a >= 11 && l.a <= 19 && L.satuan(l.a) + l.b <= 9 && L.opsiSatuan(l).includes(L.satuan(l.a) + l.b), `${nama}: belasan tanpa melewati sepuluh`);
    if (l.tipe === "kembar") {
      cek(Math.abs(l.a - l.b) === 1, `${nama}: kembar selisih satu`);
      if (l.kartu) {
        const p = L.pasanganKembar(l.kartu);
        cek(l.kartu.length === 4 && new Set(l.kartu).size === 4 && p !== null && [l.kartu[p[0]], l.kartu[p[1]]].sort((q, r) => q - r).join() === [l.a, l.b].sort((q, r) => q - r).join(), `${nama}: empat kartu dengan satu pasangan selisih satu`);
        cek(k === null && x.cara !== "suara", `${nama}: pilih kartu tanpa angka, bukan suara`);
      } else cek(L.opsiKembar(l).includes(2 * L.kembarDari(l)) && k === l.a + l.b, `${nama}: kembar tambah satu, kunci dihitung ulang`);
    }
    if (l.tipe === "bagan" || l.tipe === "lompat") {
      cek(l.a >= 6 && l.a <= 9 && l.b >= 3 && l.b <= 9 && l.b > L.kePuluh(l) && l.a + l.b <= 18, `${nama}: ${l.tipe} melewati sepuluh`);
      cek(L.opsiPisah(l).includes(L.kePuluh(l)) && L.opsiSisa(l).includes(L.sisaPuluh(l)) && L.sisaPuluh(l) >= 1, `${nama}: ${l.tipe}, pilihan pisah dan sisa memuat yang benar`);
      sama(k, l.a + l.b, `${nama}: kunci ${l.tipe} dihitung ulang`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  // Kegiatan beragam: ada pilih bilangan awal, pilih kartu, susun langkah, dan lompat.
  cek(["maju", "belasan"].some((t) => semua.some((x) => L.dasarDari(x.langkah).tipe === t)) && semua.some((x) => L.dasarDari(x.langkah).tipe === "kembar") && semua.some((x) => L.dasarDari(x.langkah).tipe === "bagan") && semua.some((x) => L.dasarDari(x.langkah).tipe === "lompat"), `${nama}: kegiatan beragam`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  for (const k of ["hitung maju", "genapkan sepuluh", "belasan", "puluhannya tetap", "kembar tambah satu", "bagan", "garis bilangan"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(D.POIN_PENTING.every((p) => angka(p).every((n) => n <= 20)), "poin penting: angka paling besar dua puluh");
  for (const p of D.POIN_PENTING) for (const m of p.matchAll(/\d+(?: \+ \d+)*(?: = \d+(?: \+ \d+)*)+/g)) { const sisi = m[0].split(" = ").map((x) => x.split(" + ").reduce((u, v) => u + Number(v), 0)); cek(sisi.every((n) => n === sisi[0]), `poin penting: ${m[0]} dihitung ulang`); }
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_KARCIS === D.CONCRETE && D.PICTORIAL_KARCIS === D.PICTORIAL && D.ABSTRACT_KARCIS === D.ABSTRACT && D.TEMA_KARCIS === D.TEMA_TAHAP, "ekspor nama pemasang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (let i = 0; i < 4; i += 1) {
    const c = K.letakKartuKembar(i);
    cek(c.x - K.KARTU_KEMBAR.w / 2 >= 0 && c.x + K.KARTU_KEMBAR.w / 2 <= W && c.y - K.KARTU_KEMBAR.h / 2 >= 26 && c.y + K.KARTU_KEMBAR.h / 2 <= H, `kartu kembar ${i} masuk kanvas`);
    if (i > 0) cek(c.x - K.letakKartuKembar(i - 1).x >= K.KARTU_KEMBAR.w + 6, `kartu kembar ${i} tidak bertumpuk`);
  }
  for (let i = 0; i < 2; i += 1) {
    const c = K.letakKelompok(i);
    cek(c.x - K.KOTAK_KELOMPOK.w / 2 >= 0 && c.x + K.KOTAK_KELOMPOK.w / 2 <= W && c.y - K.KOTAK_KELOMPOK.h / 2 - 10 >= 26 && c.y + K.KOTAK_KELOMPOK.h / 2 + 4 <= H - 20, `kelompok ${i} masuk kanvas`);
  }
  cek(K.letakKelompok(1).x - K.letakKelompok(0).x >= K.KOTAK_KELOMPOK.w + 6, "dua kelompok tidak bertumpuk");
  for (let n = 1; n <= 15; n += 1) {
    const t = Array.from({ length: n }, (_, i) => K.letakIsi(i));
    cek(t.every((p) => Math.abs(p.x) <= K.KOTAK_KELOMPOK.w / 2 - 8 && Math.abs(p.y) <= K.KOTAK_KELOMPOK.h / 2 - 8), `isi kelompok ${n} di dalam kotak`);
    cek(t.every((p, i) => t.every((q, j) => i === j || Math.hypot(p.x - q.x, p.y - q.y) >= 18)), `isi kelompok ${n} tidak bertumpuk`);
  }
  for (let i = 0; i < 10; i += 1) {
    const s = K.sel(i);
    cek(s.x - K.BINGKAI.sel / 2 >= 0 && s.x + K.BINGKAI.sel / 2 <= 150 && s.y - K.BINGKAI.sel / 2 >= 26 && s.y + K.BINGKAI.sel / 2 <= H, `sel bingkai ${i} masuk kanvas`);
    const r = K.letakSisa(i);
    cek(r.x - 10 > 150 && r.x + 10 <= W && r.y - 10 >= 26 && r.y + 10 <= H, `sisa ${i} di luar bingkai dan masuk kanvas`);
  }
  cek(K.xGaris(0) >= 0 && K.xGaris(20) <= W && K.GARIS.y + 20 <= H && K.xGaris(1) - K.xGaris(0) >= 10, "garis bilangan nol sampai dua puluh masuk kanvas");
  for (let n = 1; n <= 20; n += 1) {
    const p = K.petak(n);
    cek(p.x - 12 >= 0 && p.x + 12 <= W && p.y - 26 >= 26 && p.y + 12 <= H, `petak ${n} masuk kanvas`);
    if (n > 1 && n !== 11) cek(p.x - K.petak(n - 1).x >= 26, `petak ${n} tidak bertumpuk`);
  }
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const kk = [0, 1, 2, 3].map(K.letakKartuKembar);
  cek(K.periksaLingkari([lingkar(kk[0], 32, 40), lingkar(kk[1], 32, 40)], kk, [true, true, false, false]).benar && !K.periksaLingkari([lingkar(kk[0], 32, 40)], kk, [true, true, false, false]).benar && !K.periksaLingkari([lingkar(kk[2], 32, 40), lingkar(kk[3], 32, 40)], kk, [true, true, false, false]).benar, "kembar: lingkari dua kartu yang selisih satu");
  for (const n of [0, 4, 7, 11, 14, 17, 20]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi loket karcis dan usulan misi ------------------------------ */
{
  const R = D.ROMBONGAN_SIM;
  sama(R.slice(0, 3).map((r) => [r.a, r.b]), [[9, 6], [12, 5], [8, 5]], "loket: tiga rombongan tetap");
  sama([D.JUMLAH_ROMBONGAN, M6.JUMLAH_ROMBONGAN_B, R.length], [3, 3, 4], "loket: jumlah rombongan sama dengan misi");
  cek(R.every((r) => !PASANGAN_STORY.has(kunciPasang(r))) && R.every((r) => r.a + r.b <= 20), "loket: bilangan berbeda dari Story");
  cek(R.every((r) => r.nama.length > 5 && r.ikon.length > 0) && new Set(R.map((r) => r.id)).size === R.length, "loket: nama dan ikon rombongan");
  cek(tanpaDigit(D.MISI_KARCIS) && !TERLARANG.test(D.MISI_KARCIS), "loket: teks misi tanpa digit");
  sama([L.bisaCara("maju", 9, 6), L.bisaCara("genap", 9, 6), L.bisaCara("genap", 12, 5), L.bisaCara("genap", 8, 5), L.bisaCara("belasan", 12, 5), L.bisaCara("belasan", 9, 6), L.bisaCara("belasan", 14, 6), L.bisaCara("genap", 7, 3)], [true, true, false, true, true, false, false, false], "loket: cara yang cocok");
  sama([L.totalLangkah("maju", 6), L.totalLangkah("genap", 6), L.totalLangkah("belasan", 5)], [6, 2, 2], "loket: banyak langkah tiap cara");
  let k = L.awalKarcis(R);
  sama([k.alat, k.pilih, k.cara, k.langkah, k.catat, k.sendiri], ["karcis", 0, "maju", 0, [[], [], [], []], { a: 7, b: 5 }], "loket: awal");
  for (let i = 0; i < 5; i += 1) k = L.langkahBerikut(k, R);
  sama([k.langkah, k.catat[0], L.hitunganSelesai(k, R)], [5, [], false], "loket: hitung maju belum tercatat sebelum langkah terakhir");
  k = L.langkahBerikut(k, R);
  sama([k.langkah, k.catat[0], L.hitunganSelesai(k, R), L.langkahBerikut(k, R) === k], [6, ["maju"], true, true], "loket: hitung maju tercatat di langkah terakhir");
  k = L.gantiCara(k, "genap");
  sama([k.langkah, k.catat[0]], [0, ["maju"]], "loket: ganti cara mengulang langkah, catatan tetap");
  k = L.langkahBerikut(L.langkahBerikut(k, R), R);
  sama(k.catat[0], ["maju", "genap"], "loket: dua cara tercatat untuk satu rombongan");
  sama(L.langkahBerikut(L.ulangHitung(k), R).catat[0], ["maju", "genap"], "loket: cara yang sama tidak dicatat dua kali");
  let h = L.pilihRombongan(L.awalKarcis(R), 1);
  h = L.gantiCara(h, "genap");
  sama(L.langkahBerikut(h, R), h, "loket: genapkan sepuluh tidak cocok untuk dua belas dan lima");
  h = L.langkahBerikut(L.langkahBerikut(L.gantiCara(h, "belasan"), R), R);
  sama([h.catat[1], h.catat[0]], [["belasan"], []], "loket: belasan tercatat di rombongan terpilih");
  let s = L.pilihRombongan(L.awalKarcis(R), 3);
  sama(L.bilanganRombongan(s, R), { a: 7, b: 5 }, "loket: rombongan sendiri mulai dari tujuh dan lima");
  s = L.ubahSendiri(L.ubahSendiri(s, "a", 1), "b", -1);
  sama(L.bilanganRombongan(s, R), { a: 8, b: 4 }, "loket: atur dua bilangan sendiri");
  s = L.langkahBerikut(L.langkahBerikut(L.gantiCara(s, "genap"), R), R);
  sama(s.catat[3], ["genap"], "loket: rombongan sendiri tercatat");
  sama(L.ubahSendiri(s, "a", 1).catat[3], [], "loket: ubah bilangan sendiri mengosongkan catatannya");
  cek(L.ubahSendiri(s, "b", -10) === s && L.ubahSendiri({ ...s, sendiri: { a: 19, b: 1 } }, "a", 1).sendiri.a === 19 && L.ubahSendiri({ ...s, sendiri: { a: 19, b: 1 } }, "b", 1).sendiri.b === 1, "loket: batas bilangan sendiri (jumlah paling besar dua puluh)");
  const semuaKeadaan = [L.awalKarcis(R), k, h, s];
  for (const st of semuaKeadaan)
    for (const i of [0, 1, 2, 3])
      for (const cara of L.URUT_CARA_HITUNG)
        for (const langkah of [0, 1, 2, 5, 6]) {
          const t = L.kalimatKarcis({ ...st, pilih: i, cara, langkah }, R);
          cek(tanpaDigit(t) && !TERLARANG.test(t) && t.length > 10, `loket: kalimat ${i}/${cara}/${langkah} tanpa digit ("${t}")`);
        }

  const daftar = M6.daftarMisiBab6("B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const catat = (n, c) => ({ ...L.awalKarcis(R), catat: [0, 1, 2, 3].map((i) => (i === n ? c : [])) });
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("b-")), "misi B: id unik berawalan b-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi B: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(L.awalKarcis(R))), "misi B: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "rak" }) && !x.cek({ alat: "loncat", op: "tambah", a: 8, b: 5 }) && !x.cek({ alat: "belasan", op: "tambah", a: 14, b: 4 }) && !x.cek({ alat: "banding", jumlah: [12, 15, 17] }) && !x.cek({ alat: "selesai", id: "jembatan" })), "misi B: keadaan alat lain tidak memenuhi");
  cek(ada(catat(0, ["maju"]), "b-maju") && !ada(catat(0, ["genap"]), "b-maju") && !ada(catat(0, ["maju"]), "b-genap"), "misi B: hitung maju tercatat");
  cek(ada(catat(0, ["genap"]), "b-genap") && ada(catat(1, ["belasan"]), "b-belasan") && !ada(catat(1, ["maju"]), "b-belasan"), "misi B: genapkan sepuluh dan belasan tercatat");
  cek(ada(catat(0, ["maju", "genap"]), "b-dua") && !ada({ ...L.awalKarcis(R), catat: [["maju"], ["genap"], [], []] }, "b-dua"), "misi B: dua cara pada satu rombongan");
  cek(ada({ ...L.awalKarcis(R), catat: [["maju"], ["belasan"], ["genap"], []] }, "b-semua") && !ada({ ...L.awalKarcis(R), catat: [["maju"], ["belasan"], [], ["maju"]] }, "b-semua") && ada(catat(3, ["maju"]), "b-sendiri") && !ada(catat(0, ["maju"]), "b-sendiri"), "misi B: semua rombongan tetap dan rombongan sendiri");
  // Memainkan simulasi sungguhan memenuhi semua misi.
  let m = L.awalKarcis(R);
  const lakukan = (i, cara) => {
    m = L.gantiCara(L.pilihRombongan(m, i), cara);
    for (let j = 0; j < 8; j += 1) m = L.langkahBerikut(m, R);
  };
  lakukan(0, "maju");
  lakukan(0, "genap");
  lakukan(1, "belasan");
  lakukan(2, "maju");
  m = L.ubahSendiri(L.pilihRombongan(m, 3), "a", 1);
  lakukan(3, "maju");
  sama(S.misiBaru(daftar, m, new Set()).sort(), daftar.map((x) => x.id).sort(), "misi B: bermain sampai semua misi tercapai");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahKarcis.tsx", "TahapKarcis.tsx", "KomidiPutar.tsx", "LembarKarcis.tsx", "SimulasiLoketKarcis.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/lebih besar dari|lebih kecil dari/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const tahap = readFileSync(new URL("TahapKarcis.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapKarcis: Abstract diakhiri Poin Penting (cerita bab berlanjut ke Sub-Bab C)");
  for (const f of ["LangkahKarcis.tsx", "TahapKarcis.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahKarcis.tsx", folderUrl), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahKarcis: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah) && langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes("onBenar={(t) => jawab(n, \"\", t)}"), "LangkahKarcis: Cari kesalahan, petunjuk, dan jawaban ditunjukkan setelah tiga kali salah");
  cek(/periksaLingkari/.test(langkah) && /Susun langkah/.test(langkah) && /Hitung maju dimulai dari bilangan berapa/.test(langkah), "LangkahKarcis: pilih kartu (lingkari), susun langkah, dan pilih bilangan awal");
  const sim = readFileSync(new URL("SimulasiLoketKarcis.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalKarcis/.test(sim) && /speakGuru/.test(sim) && /langkahBerikut/.test(sim) && /Papan catatan loket/.test(sim), "SimulasiLoketKarcis: melaporkan keadaan loket dan papan catatan");
  for (const f of ["KomidiPutar.tsx", "LembarKarcis.tsx", "SimulasiLoketKarcis.tsx", "TahapKarcis.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
}
{
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab6.tsx", import.meta.url), "utf8");
  cek(/B: "Misi Loket Karcis[^"\d]*"/.test(ms), "SimulasiBab6: teks misi B tanpa digit");
  cek(ms.includes("SimulasiLoketKarcis") && /huruf === "B" \? \[loketKarcis\]/.test(ms), "SimulasiBab6: tab Sub-Bab B memakai loket karcis");
  cek(!readFileSync(new URL("../src/components/modul/misi-bab6.ts", import.meta.url), "utf8").includes("\r"), "misi-bab6.ts: akhir baris LF");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
