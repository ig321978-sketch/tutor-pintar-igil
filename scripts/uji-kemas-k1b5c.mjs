// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab C ("Kemas Pakan dan Kantong"), lanjutan Akuarium Ikan Hias Abang.
// Memeriksa: ban berjalan pengemasan (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan persediaan dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap dan berbeda dari Story, batas rupa, tata letak kanvas, simulasi meja kemas dan misinya, berkas.
// Misi Sub-Bab C: sementara di kemas-k1b5c/misi.ts; setelah dipindah, di misi-bab5.ts (MISI_C).
// Jalankan: node --no-warnings scripts/uji-kemas-k1b5c.mjs
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kemas-k1b5c/logika.ts");
const D = await import("../src/components/modul/kemas-k1b5c/data.ts");
const K = await import("../src/components/modul/kemas-k1b5c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const ADA_MISI_LOKAL = existsSync(new URL("../src/components/modul/kemas-k1b5c/misi.ts", import.meta.url));
const M = ADA_MISI_LOKAL ? await import("../src/components/modul/kemas-k1b5c/misi.ts") : await import("../src/components/modul/misi-bab5.ts");

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|kali|bagi|dikali|dibagi)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);

/* ------------------------------ Dasar ------------------------------ */
{
  sama([L.puluhanDari(17), L.satuanDari(17), L.puluhanDari(20), L.satuanDari(20), L.puluhanDari(7)], [1, 7, 2, 0, 0], "puluhan dan satuan");
  sama(L.kalimatTempat(16), "satu puluhan enam satuan", "kalimat tempat");
  sama(L.isiBaki(1, 8), 18, "isi baki");
  sama(L.pilihanDari({ tipe: "sedotan", n: 10, tanya: "lepas", jenis: "titik" }), [0, 1, 2], "pilihan untuk nol");
  for (let n = 0; n <= 20; n += 1) sama(L.puluhanDari(n) * 10 + L.satuanDari(n), n, `pecah ${n}`);
}

/* ------------------------------ Mind-map ban berjalan ------------------------------ */
{
  const t = D.TEMPAT_BAN;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "ban: tiga masalah, tujuh kantong, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 26 && tanpaDigit(x.kunci)), "ban: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "ban: kantong bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["ikat tiap sepuluh", "satuan", "angka kiri puluhan", "angka kanan satuan", "balok puluhan", "tabel puluhan dan satuan", "ikat sedotan"]) cek(gab.includes(k), `ban: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["satu puluhan", "tempat beda", "dua puluhan", "dicatat"]) cek(hasil.includes(k), `ban: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(ikan|pakan|kantong|kerikil|akuarium|igil|kaka|abang|mamah|karet)\b/i.test(x.kunci)), "ban: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci)), "ban: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_BAN + D.PETUNJUK_URUT_BAN) && !TERLARANG.test(D.SUARA_BAN), "ban: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 61);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "ban: kantong hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan persediaan ------------------------------ */
{
  const b = D.BARIS_PAPAN;
  sama(b.map((x) => [x.nama, x.banyak]), [["Pakan", 16], ["Kantong ikan", 13], ["Kerikil hias", 20], ["Sebelas", 11]], "papan: data Story");
  for (const x of b) {
    sama([x.puluhan, x.satuan], [L.puluhanDari(x.banyak), L.satuanDari(x.banyak)], `papan: ${x.nama} puluhan dan satuan dihitung`);
    cek(D.TEMPAT_PAPAN.some((t) => t.kunci === `${x.puluhan} puluhan ${x.satuan} satuan`) && D.TEMPAT_PAPAN.some((t) => t.kunci === String(x.banyak)), `papan: label ${x.nama}`);
  }
  sama(D.TEMPAT_PAPAN.length, 12, "papan: dua belas kotak");
  cek(new Set(D.TEMPAT_PAPAN.map((x) => x.kunci)).size === 12, "papan: label unik");
  cek(D.TEMPAT_PAPAN.every((x) => x.kunci.length <= 24) && tanpaDigit(D.SUARA_PAPAN) && !TERLARANG.test(D.SUARA_PAPAN), "papan: label pendek, suara tanpa digit");
  cek(Object.keys(D.KELOMPOK_PAPAN).every((k) => D.TEMPAT_PAPAN.some((x) => x.kelompok === k)) && D.KOLOM_PAPAN.length === 3, "papan: tiga kolom");
  cek(D.TEMPAT_PAPAN.every((x) => !TERLARANG.test(x.kunci)), "papan: label tanpa kata terlarang");
}

/* ------------------------------ CPA ------------------------------ */
// Story: enam belas pakan (satu dan enam), tiga belas kantong (satu dan tiga), dua puluh kerikil, sebelas.
const STORY = new Set([3, 6, 11, 13, 16, 20]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Lapak Ikan (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 20 && !STORY.has(n)), `${nama}: angka nol sampai dua puluh, berbeda dari Story (${angka.join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 3 && angka.filter((n) => n < 10).length >= 3, `${nama}: ada belasan dan satuan`);
  // Cari kesalahan: satu soal Klik per tahap, tokoh menjawab dengan salah paham, satu alasan benar.
  const cari = semua.filter((x) => x.langkah.tipe === "cari");
  sama(cari.map((x) => x.cara), ["klik"], `${nama}: satu soal Cari kesalahan di Klik`);
  for (const x of cari) {
    const l = x.langkah;
    cek(["Igil", "Kaka", "Abang"].includes(l.tokoh) && /cari kesalahan/i.test(x.suara), `${nama}: Cari kesalahan bertokoh`);
    const a = L.alasanCari(l);
    cek(a.length === 3 && a.filter((y) => y.benar).length === 1 && new Set(a.map((y) => y.teks)).size === 3, `${nama}: tiga alasan, satu benar`);
    cek(a.every((y) => tanpaDigit(y.teks) && !TERLARANG.test(y.teks) && (y.benar || (y.petunjuk.length > 10 && tanpaDigit(y.petunjuk)))), `${nama}: alasan dan petunjuk tanpa digit`);
    cek(a.find((y) => y.benar).teks.includes(L.kalimatTempat(l.n)), `${nama}: alasan benar memuat kalimat puluhan dan satuan`);
    const pt = L.petunjukTokoh(l);
    cek(pt.includes(l.tokoh) && tanpaDigit(pt) && !TERLARANG.test(pt), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    // Klaim tokoh memang keliru.
    const klaim = L.klaimCari(l);
    if (l.salah === "jumlah") cek(klaim.endsWith(`${L.puluhanDari(l.n) + L.satuanDari(l.n)}.`) && L.puluhanDari(l.n) + L.satuanDari(l.n) !== l.n, `${nama}: klaim menjumlah dua angka`);
    if (l.salah === "kiri") cek(klaim.includes(`artinya ${L.puluhanDari(l.n)} saja`) && L.puluhanDari(l.n) !== L.puluhanDari(l.n) * 10, `${nama}: klaim angka kiri satuan`);
    if (l.salah === "lepas") cek(klaim.includes(`0 puluhan, ${l.n} satuan`) && l.n >= 10, `${nama}: klaim sepuluh tidak diikat`);
    cek(tanpaDigit(L.klaimCari(l, L.kata)), `${nama}: klaim untuk suara tanpa digit`);
  }
  // Soal tempat (tanpa angka) di Kanvas.
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => x.cara), ["klik", "kanvas"], `${nama}: dua soal tanpa angka di Klik dan Kanvas`);
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.WARNA_BENDA[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: barang ${l.jenis} punya gambar dan warna`);
    else cek(D.EMOJI[l.jenis] === undefined, `${nama}: tanpa gambar benda (${l.jenis})`);
    cek(l.n >= 0 && l.n <= 20, `${nama}: bilangan sampai dua puluh`);
    if (l.tipe === "ikat") {
      cek(l.n >= 10 && l.n <= 19, `${nama}: ikat sepuluh sampai sembilan belas`);
      sama(k, l.tanya === "bilangan" ? l.n : l.n - 10, `${nama}: kunci ikat dihitung ulang`);
    }
    if (l.tipe === "balok") sama(k, { bilangan: l.n, puluhan: Math.floor(l.n / 10), satuan: l.n % 10 }[l.tanya], `${nama}: kunci balok dihitung ulang`);
    if (l.tipe === "tabel") {
      if (l.tanya === "tempat") {
        sama(k, null, `${nama}: tempat tanpa angka`);
        cek(x.cara === "kanvas" && (l.sorot === "puluhan" || l.n % 10 > 0), `${nama}: tempat di Kanvas, yang disorot ada`);
        cek(l.n >= 10, `${nama}: tempat untuk bilangan dua angka`);
      } else sama(k, l.tanya === "puluhan" ? Math.floor(l.n / 10) : l.n % 10, `${nama}: kunci tabel dihitung ulang`);
    }
    if (l.tipe === "sedotan") {
      sama(k, { bilangan: l.n, ikat: Math.floor(l.n / 10), lepas: l.n % 10 }[l.tanya], `${nama}: kunci sedotan dihitung ulang`);
      if (l.tanya !== "bilangan") {
        cek(x.cara !== "kanvas" && l.n >= 10 && Math.floor(l.n / 10) <= L.GUDANG_SEDOTAN.ikat, `${nama}: buat sendiri bukan di Kanvas, cukup di gudang`);
        // Satu-satunya cara membuat n dari persediaan gudang: ikatan dulu.
        const cara = [];
        for (let i = 0; i <= L.GUDANG_SEDOTAN.ikat; i += 1) for (let j = 0; j <= L.GUDANG_SEDOTAN.lepas; j += 1) if (L.isiBaki(i, j) === l.n) cara.push([i, j]);
        sama(cara, [[Math.floor(l.n / 10), l.n % 10]], `${nama}: ${l.n} hanya bisa dibuat dengan ikatan dulu`);
      } else if (x.cara === "kanvas") cek(l.n % 10 > 0, `${nama}: ada sedotan lepas untuk ditandai`);
    }
    if (k !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  // Kegiatan beragam: memindahkan (ikat, tabel), membuat sendiri (sedotan), memilih alasan (cari).
  const tipe = new Set(semua.map((x) => x.langkah.tipe));
  cek(["ikat", "balok", "tabel", "sedotan", "cari"].every((t) => tipe.has(t)), `${nama}: kegiatan beragam`);
  cek(semua.some((x) => x.langkah.tipe === "sedotan" && x.langkah.tanya !== "bilangan"), `${nama}: ada soal membuat bilangan sendiri`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  for (const k of ["satu puluhan", "angka kiri", "angka kanan", "tempatnya", "2 puluhan 0 satuan", "menjumlah"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_KEMAS === D.CONCRETE && D.PICTORIAL_KEMAS === D.PICTORIAL && D.ABSTRACT_KEMAS === D.ABSTRACT && D.TEMA_KEMAS === D.TEMA_TAHAP, "ekspor nama pemasang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  const r = K.JARI_BARANG;
  for (let i = 0; i < 20; i += 1) {
    for (const f of [K.letakMeja, K.letakMejaKanvas]) {
      const p = f(i);
      cek(p.x - r >= 0 && p.x + r <= W && p.y - r >= 26 && p.y + r <= H, `meja ${i} masuk kanvas`);
      if (i % 10 > 0) cek(p.x - f(i - 1).x >= 2 * r + 2, `meja ${i} tidak bertumpuk`);
    }
  }
  cek(K.letakMeja(10).y + r < K.IKATAN.y && K.letakMeja(10).y + r < K.BAKI_SATUAN.y, "meja di atas kumpulan dan baki");
  for (let j = 0; j < 10; j += 1) {
    const p = K.letakKumpul(j);
    cek(p.x - 10 >= K.IKATAN.x && p.x + 10 <= K.IKATAN.x + K.IKATAN.w && p.y - 10 >= K.IKATAN.y + 12 && p.y + 10 <= K.IKATAN.y + K.IKATAN.h, `kumpulan ${j} di dalam kotak`);
    if (j < 9) {
      const q = K.letakSatuan(j);
      cek(q.x - 10 >= K.BAKI_SATUAN.x && q.x + 10 <= K.BAKI_SATUAN.x + K.BAKI_SATUAN.w && q.y + 10 <= K.BAKI_SATUAN.y + K.BAKI_SATUAN.h, `baki satuan ${j} di dalam baki`);
    }
  }
  cek(K.IKATAN.x + K.IKATAN.w < K.BAKI_SATUAN.x && K.BAKI_SATUAN.x + K.BAKI_SATUAN.w <= W && K.IKATAN.y + K.IKATAN.h <= H, "kumpulan dan baki berdampingan");
  for (let i = 0; i < 2; i += 1) {
    const p = K.letakBatang(i);
    cek(p.x - K.BATANG.w / 2 >= 0 && p.y - K.BATANG.h / 2 >= 26 && p.y + K.BATANG.h / 2 <= H, `balok ${i} masuk kanvas`);
  }
  cek(K.letakBatang(1).x - K.letakBatang(0).x >= K.BATANG.w + 6, "balok tidak bertumpuk");
  for (let j = 0; j < 9; j += 1) {
    const p = K.letakKubus(j);
    cek(p.x - K.KUBUS / 2 > K.letakBatang(1).x + K.BATANG.w / 2 && p.x + K.KUBUS / 2 <= W && p.y - K.KUBUS / 2 >= 26 && p.y + K.KUBUS / 2 <= H, `kubus ${j} masuk kanvas, di kanan balok`);
    if (j % 3 > 0) cek(p.x - K.letakKubus(j - 1).x >= K.KUBUS + 6, `kubus ${j} tidak bertumpuk`);
  }
  for (let i = 0; i < 2; i += 1) {
    const c = K.letakKolom(i);
    cek(c.x - K.KOLOM.w / 2 >= 0 && c.x + K.KOLOM.w / 2 <= W && c.y + K.KOLOM.h / 2 <= H, `kolom ${i} masuk kanvas`);
    const d = K.letakDigit(i);
    cek(d.y + K.KARTU_DIGIT.h / 2 < c.y - K.KOLOM.h / 2, `kartu angka ${i} di atas kolom`);
    const a = K.letakIkatAtas(i);
    cek(a.y + K.IKAT_ATAS.h / 2 < c.y - K.KOLOM.h / 2 && a.x + K.IKAT_ATAS.w / 2 < K.letakLepasAtas(0).x - 10, `ikatan atas ${i} tidak menabrak`);
    const pu = K.letakIsiPuluhan(i);
    const k0 = K.letakKolom(0);
    cek(pu.x - 26 >= k0.x - K.KOLOM.w / 2 && pu.x + 26 <= k0.x + K.KOLOM.w / 2, `isi puluhan ${i} di kolom puluhan`);
    const kt = K.letakKata(i);
    cek(kt.x - K.LEBAR_KATA / 2 >= 0 && kt.x + K.LEBAR_KATA / 2 <= W && kt.y + 16 <= H, `kata tempat ${i} masuk kanvas`);
  }
  cek(K.letakKata(1).x - K.letakKata(0).x > K.LEBAR_KATA, "kata tempat tidak bertumpuk");
  cek(K.letakKolom(1).x - K.letakKolom(0).x >= K.KOLOM.w, "kolom tidak bertumpuk");
  for (let j = 0; j < 9; j += 1) {
    const s = K.letakIsiSatuan(j);
    const k1 = K.letakKolom(1);
    cek(s.x - 10 >= k1.x - K.KOLOM.w / 2 && s.x + 10 <= k1.x + K.KOLOM.w / 2 && s.y + 10 <= k1.y + K.KOLOM.h / 2, `isi satuan ${j} di kolom satuan`);
    const la = K.letakLepasAtas(j);
    cek(la.x + 10 <= W && la.y - 10 >= 26, `barang lepas atas ${j} masuk kanvas`);
    for (const f of [K.letakGudangLepas, K.letakBakiLepas]) {
      const p = f(j);
      cek(p.x + K.SEDOTAN.w / 2 <= W && p.y + K.SEDOTAN.h / 2 <= H && (j === 0 || p.x - f(j - 1).x >= 20), `sedotan lepas ${j} masuk kanvas, berjarak`);
    }
  }
  cek(K.letakGudangIkat(1).x + K.IKAT_SEDOTAN.w / 2 < K.letakGudangLepas(0).x - K.SEDOTAN.w / 2, "gudang: ikatan dan sedotan lepas terpisah");
  cek(K.letakGudangIkat(0).y + K.SEDOTAN.h / 2 < 110 && K.letakBakiIkat(0).y - K.SEDOTAN.h / 2 >= 110, "gudang di atas baki");
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 28 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 27) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 27) * 2 * Math.PI) }));
  // Ikat kanvas: lingkari baris atas (sepuluh) saja.
  const meja = Array.from({ length: 17 }, (_, i) => K.letakMejaKanvas(i));
  const sasaran = meja.map((_, i) => i < 10);
  cek(K.periksaLingkari([lingkar({ x: 150, y: 75 }, 148, 26)], meja, sasaran).benar, "ikat: lingkari baris sepuluh diterima");
  cek(!K.periksaLingkari([lingkar({ x: 150, y: 110 }, 148, 60)], meja, sasaran).benar, "ikat: lingkaran ikut baris bawah ditolak");
  cek(!K.periksaLingkari([lingkar({ x: 90, y: 75 }, 80, 26)], meja, sasaran).benar, "ikat: lingkaran kurang dari sepuluh ditolak");
  // Balok kanvas: tanda di tiap balok dan kubus.
  const bk = [K.letakBatang(0), ...[0, 1, 2, 3, 4, 5, 6, 7].map(K.letakKubus)];
  cek(K.periksaCentang(bk.map(coret), bk, 14).benar, "balok: tanda di tiap potong diterima");
  cek(!K.periksaCentang(bk.slice(1).map(coret), bk, 14).benar, "balok: balok tidak ditandai ditolak");
  // Sedotan kanvas: tanda hanya di sedotan lepas, tanda di ikatan ditolak.
  const sl = [0, 1, 2, 3, 4].map(K.letakBakiLepas);
  cek(K.periksaCentang(sl.map(coret), sl, 11).benar, "sedotan: tanda di tiap sedotan lepas diterima");
  cek(!K.periksaCentang([...sl.map(coret), coret(K.letakBakiIkat(0))], sl, 11).benar, "sedotan: tanda di ikatan ditolak");
  cek(!K.periksaCentang([...sl.slice(0, 4).map(coret), coret({ x: sl[3].x + 3, y: sl[3].y + 15 })], sl, 11).benar, "sedotan: dua tanda di satu sedotan ditolak");
  // Tabel kanvas: lingkari kata tempat atau kolom.
  const kata = [0, 1].map(K.letakKata);
  cek(K.periksaLingkari([lingkar(kata[0], 56, 22)], kata, [true, false]).benar && !K.periksaLingkari([lingkar(kata[1], 56, 22)], kata, [true, false]).benar, "tabel: lingkari kata puluhan");
  const kol = [0, 1].map(K.letakKolom);
  cek(K.periksaLingkari([lingkar(kol[1], 66, 44)], kol, [false, true]).benar && !K.periksaLingkari([lingkar({ x: 150, y: 148 }, 140, 44)], kol, [false, true]).benar, "tabel: lingkari kolom satuan saja");
  for (const n of [0, 1, 9, 10, 12, 19]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi meja kemas dan misi ------------------------------ */
{
  const B = D.BARANG_SIM;
  sama(Object.fromEntries(B.map((b) => [b.id, b.total])), M.TOTAL_KEMAS_C, "kemas: banyak barang sama dengan misi");
  cek(B.every((b) => !STORY.has(b.total) && b.total >= 10 && b.total <= 19 && D.EMOJI[b.jenis]) && new Set(B.map((b) => b.total)).size === B.length, "kemas: barang berbeda dari Story, bergambar, banyak berbeda");
  cek(B.every((b) => !/pakan|kantong|kerikil/i.test(b.nama)), "kemas: barang bukan barang Story");
  cek(tanpaDigit(D.MISI_KEMAS) && !TERLARANG.test(D.MISI_KEMAS), "kemas: teks misi tanpa digit");
  let k = L.awalKemas(B);
  sama([k.alat, k.pilih, k.ikat.jaring, k.kumpul.botol, k.puluhan.pot, k.lepas, k.kalimat], ["kemas", "jaring", 0, 0, null, [], false], "kemas: awal");
  sama(L.ikatKaret(k), k, "kemas: tidak bisa mengikat kurang dari sepuluh");
  for (let i = 0; i < 12; i += 1) k = L.kumpulSatu(k, B);
  sama([k.kumpul.jaring, L.lepasDiMeja(k, B)], [10, 4], "kemas: kumpulan berhenti di sepuluh");
  k = L.kembalikanSatu(k);
  sama(L.ikatKaret(k), k, "kemas: sembilan belum bisa diikat");
  k = L.ikatKaret(L.kumpulSatu(k, B));
  sama([k.ikat.jaring, k.kumpul.jaring, L.lepasDiMeja(k, B), L.sudahRapi(k, B)], [1, 0, 4, true], "kemas: satu ikat, empat lepas, rapi");
  for (let i = 0; i < 6; i += 1) k = L.kumpulSatu(k, B);
  sama(k.kumpul.jaring, 4, "kemas: tidak bisa mengumpulkan lebih dari yang ada");
  k = L.geserTabel(L.geserTabel(k, "puluhan", 1), "puluhan", -1);
  sama(k.puluhan.jaring, 0, "kemas: tabel mulai dari nol");
  k = L.geserTabel(k, "puluhan", 1);
  for (let i = 0; i < 12; i += 1) k = L.geserTabel(k, "satuan", 1);
  sama(k.satuan.jaring, 9, "kemas: satuan paling banyak sembilan");
  for (let i = 0; i < 5; i += 1) k = L.geserTabel(k, "satuan", -1);
  sama([L.tabelTepat(k, B), L.banyakTepat(k, B)], [true, 1], "kemas: tabel jaring tepat");
  for (let i = 0; i < 4; i += 1) k = L.geserTabel(k, "puluhan", 1);
  sama(k.puluhan.jaring, 2, "kemas: puluhan paling banyak dua");
  k = L.lepasIkat(k);
  sama([k.ikat.jaring, L.lepasDiMeja(k, B), k.lepas], [0, 10, ["jaring"]], "kemas: lepas ikatan, sepuluh kembali ke meja");
  sama(L.lepasIkat(k), k, "kemas: tidak ada ikatan untuk dilepas");
  for (const b of B) {
    let x = L.pilihBarang(L.awalKemas(B), b.id);
    cek(tanpaDigit(L.kalimatKemas(x, B)) && !TERLARANG.test(L.kalimatKemas(x, B)), `kemas: kalimat ${b.id} tanpa digit`);
    for (let i = 0; i < 10; i += 1) x = L.kumpulSatu(x, B);
    cek(tanpaDigit(L.kalimatKemas(x, B)), `kemas: kalimat ${b.id} siap diikat tanpa digit`);
  }

  const daftar = M.MISI_C;
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalKemas(B);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi C: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("c-")), "misi C: id unik berawalan c-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi C: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)), "misi C: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "puluhan", n: 15, m: 0, ikat: true, banding: false, benda: true, bingkai: true, kalimat: true, tabel: true, garis: true })), "misi C: alat puluhan lama tidak memenuhi");
  cek(daftar.every((x) => !x.cek({ alat: "selesai", id: "odometer" })), "misi C: odometer lama tidak memenuhi");
  const kemas = (st, id) => {
    let x = L.pilihBarang(st, id);
    while (!L.sudahRapi(x, B)) {
      for (let i = 0; i < 10; i += 1) x = L.kumpulSatu(x, B);
      x = L.ikatKaret(x);
    }
    return x;
  };
  const isiTabel = (st, p, s) => {
    let x = st;
    for (let i = 0; i <= p; i += 1) x = L.geserTabel(x, "puluhan", i === 0 ? -1 : 1);
    for (let i = 0; i <= s; i += 1) x = L.geserTabel(x, "satuan", i === 0 ? -1 : 1);
    return x;
  };
  let satuIkat = L.pilihBarang(awal, "botol");
  for (let i = 0; i < 10; i += 1) satuIkat = L.kumpulSatu(satuIkat, B);
  cek(!ada(satuIkat, "c-ikat") && ada(L.ikatKaret(satuIkat), "c-ikat"), "misi C: satu ikatan karet");
  const jr = kemas(awal, "jaring");
  cek(ada(jr, "c-rapi") && !ada(awal, "c-rapi"), "misi C: semua sepuluhan diikat");
  cek(ada(isiTabel(jr, 1, 4), "c-tabel") && !ada(isiTabel(jr, 1, 3), "c-tabel") && !ada(isiTabel(awal, 1, 4), "c-tabel"), "misi C: tabel tepat setelah diikat");
  let semua = awal;
  for (const b of B) semua = isiTabel(kemas(semua, b.id), Math.floor(b.total / 10), b.total % 10);
  sama(L.banyakTepat(semua, B), 3, "kemas: tiga barang tepat");
  cek(ada(semua, "c-semua") && !ada(L.lepasIkat(semua), "c-semua"), "misi C: ketiga barang");
  cek(ada(kemas(L.lepasIkat(jr), "jaring"), "c-lepas") && !ada(L.lepasIkat(jr), "c-lepas") && !ada(jr, "c-lepas"), "misi C: lepas lalu ikat lagi");
  const tj = isiTabel(jr, 1, 4);
  cek(ada(L.nyalakanKalimat(tj), "c-kalimat") && !ada(tj, "c-kalimat") && !ada(L.nyalakanKalimat(jr), "c-kalimat"), "misi C: kalimat untuk tabel tepat");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/kemas-k1b5c/", import.meta.url);
  const berkas = readdirSync(folder);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahKemas.tsx", "TahapKemas.tsx", "BanBerjalan.tsx", "PapanPersediaan.tsx", "SimulasiMejaKemas.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of [...berkas, "../../../../scripts/uji-kemas-k1b5c.mjs"]) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (f.includes("scripts")) continue;
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/lebih besar dari|lebih kecil dari|[<>]=?\s*\d/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const tahap = readFileSync(new URL("TahapKemas.tsx", folder), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap), "TahapKemas: Abstract diakhiri Poin Penting");
  for (const f of ["LangkahKemas.tsx", "TahapKemas.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folder), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahKemas.tsx", folder), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahKemas: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/function Cari\b/.test(langkah) && /petunjukTokoh/.test(langkah) && /alasanCari/.test(langkah), "LangkahKemas: soal Cari kesalahan dengan alasan dan petunjuk tokoh");
  const sim = readFileSync(new URL("SimulasiMejaKemas.tsx", folder), "utf8");
  cek(/onKeadaan/.test(sim) && /awalKemas/.test(sim) && /export default function SimulasiMejaKemas/.test(sim), "SimulasiMejaKemas: melaporkan keadaan meja kemas");
  for (const [f, nama] of [["BanBerjalan.tsx", "BanBerjalan"], ["PapanPersediaan.tsx", "PapanPersediaan"], ["TahapKemas.tsx", "TahapKemas"]]) cek(new RegExp(`export default function ${nama}`).test(readFileSync(new URL(f, folder), "utf8")), `${f}: ekspor bawaan`);
}

/* ------------------------------ Pemasangan (setelah misi dipindah ke misi-bab5.ts) ------------------------------ */
if (!ADA_MISI_LOKAL) {
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab5.tsx", import.meta.url), "utf8");
  cek(/C: "Misi Lapak Ikan[^"\d]*"/.test(ms), "SimulasiBab5: teks misi C tanpa digit");
  cek(ms.includes("SimulasiMejaKemas") && /huruf === "C" \? \[mejaKemas\]/.test(ms), "SimulasiBab5: tab Sub-Bab C memakai meja kemas");
  for (const f of ["misi-bab5.ts", "SimulasiBab5.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
  cek(M.daftarMisiBab5("C") === M.MISI_C, "misi C: daftar Sub-Bab C");
}

{ const sl = readFileSync(new URL("../src/components/modul/kemas-k1b5c/LangkahKemas.tsx", import.meta.url), "utf8"); cek(sl.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(sl) && sl.includes("onBenar={(t) => jawab(n, \"\", t)}"), "kemas-k1b5c/LangkahKemas: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar."); }
console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
