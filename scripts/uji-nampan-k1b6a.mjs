// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 6 Sub-Bab A ("Dua Nampan Kue"), awal cerita Pasar Malam Kampung.
// Memeriksa: untaian lampu (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan menu kapur dari data Story,
// CPA dua belas soal per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap dan berbeda dari hasil Story, batas rupa, tata letak kanvas, Simulasi Meja Dua Nampan dan misinya,
// emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-nampan-k1b6a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/nampan-k1b6a/logika.ts");
const D = await import("../src/components/modul/nampan-k1b6a/data.ts");
const K = await import("../src/components/modul/nampan-k1b6a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB6 = await import("../src/components/modul/misi-bab6.ts");
const folderUrl = new URL("../src/components/modul/nampan-k1b6a/", import.meta.url);

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
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];

/* ------------------------------ Dasar ------------------------------ */
{
  sama([L.selisihAB({ a: 12, b: 8 }), L.selisihAB({ a: 8, b: 12 }), L.selisihAB({ a: 9, b: 9 })], [4, 4, 0], "selisih dua bilangan");
  sama([L.barisPasang({ a: 7, b: 13, tanya: "lebih" }), L.barisPasang({ a: 7, b: 13, tanya: "kurang" }), L.barisPasang({ a: 15, b: 9, tanya: "lebih" }), L.barisPasang({ a: 15, b: 9, tanya: "kurang" })], [1, 0, 0, 1], "baris pasang lebih dan kurang");
  const pas = (a, b, tanya) => ({ tipe: "pasang", a, b, tanya, jenis: "titik", jenis2: "titik" });
  const bat = (a, b, tanya) => ({ tipe: "batang", a, b, tanya, jenis: "titik", jenis2: "titik" });
  const gar = (a, b, tanya) => ({ tipe: "garis", a, b, tanya, jenis: "titik" });
  const sam = (a, b, tanya, angka = true) => ({ tipe: "samakan", a, b, tanya, angka, jenis: "titik", jenis2: "titik" });
  sama([L.kunciLangkah(pas(15, 8, "selisih")), L.kunciLangkah(pas(7, 13, "lebih")), L.kunciLangkah(pas(7, 13, "kurang"))], [7, null, null], "kunci pasang");
  sama([L.kunciLangkah(bat(15, 17, "selisih")), L.kunciLangkah(bat(8, 13, "tambah")), L.kunciLangkah(bat(17, 10, "kurang"))], [2, 13, 10], "kunci batang");
  sama([L.kunciLangkah(gar(9, 14, "selisih")), L.kunciLangkah(gar(14, 9, "selisih")), L.kunciLangkah(gar(12, 17, "maju")), L.kunciLangkah(gar(18, 12, "mundur"))], [5, 5, 17, 12], "kunci garis");
  sama([L.kunciLangkah(sam(9, 14, "tambah")), L.kunciLangkah(sam(16, 8, "ambil")), L.kunciLangkah(sam(9, 14, "tambah", false))], [5, 8, null], "kunci menyamakan");
  for (const [a, b] of [[12, 8], [8, 12], [9, 9], [17, 15], [1, 19]]) {
    const t = L.kalimatSelisih(a, b);
    cek(tanpaDigit(t) && !/lebih besar dari|lebih kecil dari/.test(t) && !TERLARANG.test(t), `kalimat selisih ${a} ${b} tanpa digit`);
  }
  cek(/Lebihnya empat, kurangnya empat/.test(L.kalimatSelisih(12, 8)) && /Selisihnya nol/.test(L.kalimatSelisih(9, 9)), "kalimat selisih: lebihnya, kurangnya, selisih");
  sama(L.URUT_METODE, ["igil", "batang", "garis", "samakan"], "urutan metode");
  cek(/Bar Model/.test(L.NAMA_METODE.batang) && /Number Line Difference/.test(L.NAMA_METODE.garis) && /Equalizing/.test(L.NAMA_METODE.samakan) && /IGIL/.test(L.NAMA_METODE.igil), "nama metode memuat nama Inggris");
}

/* ------------------------------ Mind-map untaian lampu ------------------------------ */
{
  const t = D.TEMPAT_LAMPU;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "lampu: tiga masalah, tujuh bohlam, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 34 && tanpaDigit(x.kunci)), "lampu: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "lampu: bohlam bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["pasangkan satu-satu", "lebihnya dan kurangnya", "besar dikurangi kecil", "menyamakan", "model batang", "selisih di garis bilangan", "lebihnya tambah, kurangnya kurang"]) cek(gab.includes(k), `lampu: langkah memuat "${k}"`);
  cek(gab.indexOf("pasangkan") < gab.indexOf("lebihnya dan") && gab.indexOf("lebihnya dan") < gab.indexOf("besar dikurangi") && gab.indexOf("besar dikurangi") < gab.indexOf("menyamakan"), "lampu: urutan langkah masuk akal");
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["lebihnya sama dengan kurangnya", "selisih adalah beda banyaknya", "tambah atau ambil", "belum diketahui"]) cek(hasil.includes(k), `lampu: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(nampan|kue|cubit|pukis|lampion|es|lilin|karcis|lapak|pembeli|igil|kaka|abang|mamah|rt|donat|jeruk)\b/i.test(x.kunci)), "lampu: label hanya poin pelajaran");
  cek(t.every((x) => !TERLARANG.test(x.kunci)), "lampu: label tanpa kata terlarang");
  cek(tanpaDigit(D.SUARA_LAMPU + D.PETUNJUK_URUT_LAMPU) && !TERLARANG.test(D.SUARA_LAMPU), "lampu: suara tanpa digit dan kata terlarang");
  cek(D.PUSAT_LAMPU === "Lebih dari, kurang dari, dan selisih", "lampu: pusat");
  const lb = L.labelDari(t, 61);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "lampu: bohlam bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan menu kapur ------------------------------ */
{
  const b = D.BARIS_MENU;
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama(b.length, 5, "menu: lima baris");
  const [a0, b0] = angka(b[0].bilangan);
  sama([a0, b0], [12, 8], "menu: dua belas dan delapan");
  sama([angka(b[0].hasil), angka(b[0].catatan)], [[a0 - b0], [a0 - b0]], "menu: selisih dua nampan dihitung ulang");
  cek(/pasangkan/.test(b[0].catatan), "menu: pasangkan");
  const [k1, k2] = angka(b[1].bilangan);
  sama([k1, k2, angka(b[1].hasil)[0], angka(b[1].catatan)], [8, 12, k2 - k1, [k2 - k1, k2]], "menu: menyamakan, tambah dan ambil sebanyak selisih");
  const [l1, l2] = angka(b[2].bilangan);
  sama([l1, l2, angka(b[2].hasil)[0], angka(b[2].catatan)[0]], [7, 10, l2 - l1, l2 - l1], "menu: lampion, selisih tiga dan tiga kotak");
  const [e1, e2] = angka(b[3].bilangan);
  sama([e1, e2, angka(b[3].hasil)[0]], [6, 5, e1 + e2], "menu: es lilin, lebihnya diketahui maka menambah");
  cek(/tambah/.test(b[3].catatan) && /lebihnya/.test(b[3].catatan + b[3].bilangan), "menu: lebihnya, jadi tambah");
  const [g1, g2] = angka(b[4].bilangan);
  sama([g1, g2, angka(b[4].hasil)[0]], [8, 11, g2 - g1], "menu: garis bilangan, tiga langkah");
  sama(D.TEMPAT_MENU.length, 15, "menu: lima belas kotak");
  cek(new Set(D.TEMPAT_MENU.map((x) => x.kunci)).size === 15, "menu: label unik");
  cek(D.TEMPAT_MENU.every((x) => x.kunci.length <= 28) && tanpaDigit(D.SUARA_MENU) && !TERLARANG.test(D.SUARA_MENU), "menu: label pendek, suara tanpa digit");
  cek(D.KOLOM_MENU.length === 3 && Object.keys(D.KELOMPOK_MENU).every((k2b) => D.TEMPAT_MENU.some((x) => x.kelompok === k2b)), "menu: tiga kolom");
  const pm = readFileSync(new URL("PapanMenuKapur.tsx", folderUrl), "utf8");
  cek(/milik baris/.test(pm) && /BARIS_MENU\[i\]\.nama/.test(pm), "menu: petunjuk salah menyebut baris yang keliru");
}

/* ------------------------------ CPA ------------------------------ */
// Hasil hitungan Story yang dihindari sebagai jawaban (alur): empat, tiga, sebelas, dan dua puluh.
const STORY_HASIL = new Set([4, 3, 11, 20]);
const semuaTanya = { pasang: new Set(), batang: new Set(), garis: new Set(), samakan: new Set() };
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Pasar Malam (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 20 && !STORY_HASIL.has(n)), `${nama}: angka nol sampai dua puluh, bukan hasil Story (${angka.join(",")})`);
  cek(angka.filter((n) => n >= 10).length >= 3 && angka.filter((n) => n < 10).length >= 3, `${nama}: ada belasan dan satuan`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => x.cara), ["klik", "kanvas"], `${nama}: dua soal tanpa angka di Klik dan Kanvas`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 20, `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    cek((l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3 !== l.benar, `${nama}: alasan benar tidak di tombol pertama`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && !TERLARANG.test(t)), `${nama}: Cari kesalahan tanpa digit`);
    cek(L.pilihanDari(l).includes(l.jawabTokoh) && L.pilihanDari(l).includes(kunci), `${nama}: pilihan memuat jawaban tokoh dan kunci`);
    cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh) && L.petunjukSalah(l, l.jawabTokoh).includes(l.keliru), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
  }

  for (const x of semua) {
    const l = x.langkah.tipe === "salah" ? x.langkah.dasar : x.langkah;
    const k = L.kunciLangkah(x.langkah);
    const jenisPakai = l.tipe === "garis" ? [l.jenis] : [l.jenis, l.jenis2];
    // Batas rupa.
    if (rupa === "benda") cek(jenisPakai.every((j) => D.EMOJI[j] !== undefined && D.WARNA_BENDA[j] !== undefined && D.NAMA_BENDA[j] !== undefined), `${nama}: benda ${jenisPakai} punya gambar dan warna`);
    else cek(jenisPakai.every((j) => D.EMOJI[j] === undefined), `${nama}: tanpa gambar benda (${jenisPakai})`);
    semuaTanya[l.tipe].add(l.tanya);
    const d = Math.abs(l.a - l.b);
    cek(l.a >= 0 && l.b >= 0 && l.a <= 20 && l.b <= 20 && l.a !== l.b, `${nama}: dua bilangan berbeda dalam nol sampai dua puluh (${l.tipe} ${l.a} ${l.b})`);
    if (l.tipe === "pasang") {
      cek(rupa === "lambang" || (l.a <= K.MAKS_ITEM && l.b <= K.MAKS_ITEM), `${nama}: baris pasang masuk kanvas (${l.a}, ${l.b})`);
      if (l.tanya === "selisih") sama(k, d, `${nama}: kunci pasang dihitung ulang`);
      else cek(k === null && x.cara !== "suara", `${nama}: pilih baris tanpa angka, bukan suara`);
    }
    if (l.tipe === "batang") {
      cek(rupa === "lambang" || (l.a <= K.MAKS_KOTAK && l.b <= K.MAKS_KOTAK), `${nama}: batang masuk kanvas (${l.a}, ${l.b})`);
      if (l.tanya === "tambah") cek(l.b > l.a && k === l.b, `${nama}: batang tambah, jawaban batang panjang`);
      else if (l.tanya === "kurang") cek(l.b < l.a && k === l.b, `${nama}: batang kurang, jawaban batang pendek`);
      else sama(k, d, `${nama}: kunci batang selisih dihitung ulang`);
      if (l.tanya !== "selisih") cek(x.cara !== "kanvas", `${nama}: batang tambah dan kurang tidak di kanvas`);
      cek(d <= 10, `${nama}: kegiatan batang paling banyak sepuluh ketukan`);
    }
    if (l.tipe === "garis") {
      if (l.tanya === "maju") cek(l.b > l.a && k === l.b, `${nama}: garis maju`);
      else if (l.tanya === "mundur") cek(l.b < l.a && k === l.b, `${nama}: garis mundur`);
      else sama(k, d, `${nama}: kunci garis selisih dihitung ulang`);
      if (l.tanya !== "selisih") cek(x.cara !== "kanvas", `${nama}: garis maju dan mundur tidak di kanvas`);
      if (rupa === "benda") cek(d >= 1 && d <= 8, `${nama}: jalur batu paling banyak delapan langkah (${d})`);
    }
    if (l.tipe === "samakan") {
      cek(rupa === "lambang" || (l.a <= K.MAKS_ITEM && l.b <= K.MAKS_ITEM), `${nama}: baris samakan masuk kanvas (${l.a}, ${l.b})`);
      if (l.angka) sama(k, d, `${nama}: kunci samakan dihitung ulang`);
      else cek(k === null && x.cara !== "suara" && l.tanya === "tambah" && rupa !== "lambang", `${nama}: samakan tanpa angka (tambah, Klik atau Kanvas, bukan lambang)`);
      if (x.cara === "kanvas") cek(rupa === "lambang" || l.tanya === "tambah", `${nama}: samakan di kanvas hanya menandai tempat yang ditambah`);
      cek(d <= 9, `${nama}: kegiatan samakan paling banyak sembilan ketukan`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 20), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    cek(tanpaDigit(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 220, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
}
sama([...semuaTanya.pasang].sort(), ["kurang", "lebih", "selisih"], "pasangkan memuat selisih, lebih, dan kurang");
sama([...semuaTanya.batang].sort(), ["kurang", "selisih", "tambah"], "batang memuat selisih, tambah (lebihnya), dan kurang (kurangnya)");
sama([...semuaTanya.garis].sort(), ["maju", "mundur", "selisih"], "garis memuat selisih, maju, dan mundur");
sama([...semuaTanya.samakan].sort(), ["ambil", "tambah"], "menyamakan memuat tambah dan ambil");
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every((p) => !TERLARANG.test(p)), "poin penting: suara tanpa digit");
  for (const k of ["pasangkan", "lebihnya", "kurangnya", "selisih", "mengurangi", "model batang", "garis bilangan", "menyamakan"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_NAMPAN === D.CONCRETE && D.PICTORIAL_NAMPAN === D.PICTORIAL && D.ABSTRACT_NAMPAN === D.ABSTRACT && D.TEMA_NAMPAN === D.TEMA_TAHAP, "ekspor nama pemasang");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (let b = 0; b < 2; b += 1) {
    for (let i = 0; i < K.MAKS_ITEM; i += 1) {
      const p = K.letakItem(b, i);
      cek(p.x + 9 <= W && p.x - 9 > K.letakBaris(b).x + K.KARTU_BARIS.w / 2, `benda ${b}/${i} masuk kanvas, tidak menutupi kartu`);
      if (i > 0) cek(p.x - K.letakItem(b, i - 1).x >= 13.5, `benda ${b}/${i} berjarak`);
    }
    cek(K.letakBaris(b).x - K.KARTU_BARIS.w / 2 >= 0, `kartu baris ${b} masuk kanvas`);
  }
  cek(K.letakDipasang(0).y - 10 > K.letakItem(0, 0).y + 10 && K.letakDipasang(0).y + 10 < K.letakItem(1, 0).y - 9, "benda yang dipindahkan di antara dua baris");
  cek(K.letakBaris(1).y - K.letakBaris(0).y > K.KARTU_BARIS.h + 20 && K.BARIS[0] - 13 >= 26, "kartu baris tidak bertumpuk, di bawah judul");
  for (let b = 0; b < 2; b += 1)
    for (let i = 0; i < K.MAKS_KOTAK; i += 1) {
      const c = K.letakKotak(b, i);
      cek(c.x + K.BATANG.w / 2 <= W && c.y + K.BATANG.h / 2 <= H - 10 && c.y - K.BATANG.h / 2 >= 26, `kotak ${b}/${i} masuk kanvas`);
    }
  cek(K.BATANG.ys[1] - K.BATANG.ys[0] > K.BATANG.h + 24, "dua batang berjarak");
  cek(K.xGaris(0) >= 0 && K.xGaris(20) + 6 <= W && K.GARIS.y + 16 <= H && K.xGaris(1) - K.xGaris(0) >= 12, "garis bilangan nol sampai dua puluh masuk kanvas");
  for (let v = 0; v < 20; v += 1) cek(K.letakLangkah(v).x > K.xGaris(v) && K.letakLangkah(v).x < K.xGaris(v + 1) && K.letakLangkah(v).y < K.GARIS.y - 5, `langkah ${v} di antara dua bilangan, di atas garis`);
  for (let d = 1; d <= 9; d += 1)
    for (const arah of ["kanan", "kiri"]) {
      const t = Array.from({ length: d + 1 }, (_, i) => K.letakBatu(i, d, arah));
      cek(t.every((p) => p.x >= 14 && p.x <= 286 && p.y + 12 <= H) && t.every((p, i) => i === 0 || Math.abs(p.x - t[i - 1].x) >= 22), `jalur batu ${d} langkah ${arah} masuk kanvas dan berjarak`);
    }
  cek(K.letakBilangan(1).x - K.letakBilangan(0).x >= 100, "dua kartu bilangan berjarak");
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const coret = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  const br = [0, 1].map(K.letakBaris);
  cek(K.periksaLingkari([lingkar(br[1], 24, 20)], br, [false, true]).benar && !K.periksaLingkari([lingkar(br[1], 24, 90)], br, [false, true]).benar, "pasang: lingkari satu kartu baris");
  const bil = [0, 1].map(K.letakBilangan);
  cek(K.periksaLingkari([lingkar(bil[1], 34, 30)], bil, [false, true]).benar, "lambang: lingkari satu bilangan");
  const sisa = [8, 9, 10, 11].map((i) => K.letakItem(0, i));
  cek(K.periksaCentang(sisa.map(coret), sisa, K.RADIUS_TANDA).benar && !K.periksaCentang([...sisa.map(coret), coret(K.letakItem(0, 7))], sisa, K.RADIUS_TANDA).benar && !K.periksaCentang(sisa.slice(0, 3).map(coret), sisa, K.RADIUS_TANDA).benar, "pasang: tanda hanya di yang tanpa pasangan");
  const ex = [10, 11, 12].map((i) => K.letakKotak(1, i));
  cek(K.periksaCentang(ex.map(coret), ex, K.RADIUS_TANDA).benar && !K.periksaCentang([...ex.map(coret), coret(K.letakKotak(1, 9))], ex, K.RADIUS_TANDA).benar, "batang: tanda hanya di kotak yang melebihi");
  const ls = [7, 8, 9].map(K.letakLangkah);
  cek(K.periksaCentang(ls.map(coret), ls, 6.5).benar && !K.periksaCentang([...ls.map(coret), coret(K.letakLangkah(10))], ls, 6.5).benar, "garis: tanda di tiap langkah antara dua bilangan");
  const bt = [1, 2, 3, 4, 5].map((i) => K.letakBatu(i, 5, "kanan"));
  cek(K.periksaCentang(bt.map(coret), bt, 10).benar && !K.periksaCentang(bt.slice(0, 4).map(coret), bt, 10).benar, "garis batu: tanda di tiap batu");
  for (const n of [0, 4, 11, 14, 17, 20]) sama(K.bilanganDariUcapan20(L.kata(n)), [n], `ucapan "${L.kata(n)}"`);
}

/* ------------------------------ Simulasi Meja Dua Nampan dan misi ------------------------------ */
{
  const A = D.NAMPAN_SIM;
  const ids = A.map((a) => a.id);
  cek(A.every((a) => a.ikon && a.isi >= 1 && a.isi <= 20 && ![12, 8, 7, 10, 6, 5].includes(a.isi)), "nampan: isi berbeda dari Story");
  cek(A.length === 4 && new Set(A.map((a) => a.isi)).size < A.length && A.every((a) => a.ikon && a.nama), "nampan: empat nampan, dua yang sama banyak");
  cek(tanpaDigit(D.MISI_NAMPAN) && !TERLARANG.test(D.MISI_NAMPAN), "nampan: teks misi tanpa digit");
  const pilih2 = (a, b) => L.pilihNampan(L.pilihNampan(L.awalNampan(), a), b);
  let k = L.awalNampan();
  sama([k.alat, k.mode, k.kiri, k.kanan, k.pasangTuntas, k.tambahTuntas, k.ambilTuntas, k.batangTuntas, k.garisTuntas, k.selisihBenar], ["nampan", "pasang", null, null, 0, 0, 0, 0, 0, 0], "nampan: awal");
  k = pilih2("donat", "kukis");
  sama([k.kiri, k.kanan, L.siapDua(k), L.batasPasang(k, A), L.selisihNampan(k, A)], ["donat", "kukis", true, 9, 8], "nampan: pilih donat dan kukis");
  sama(L.sedikitBanyak(k, A), { sedikit: "kukis", banyak: "donat" }, "nampan: sedikit dan banyak");
  for (let i = 0; i < 8; i += 1) k = L.pasangSatu(k, A);
  sama([k.dipasang, k.pasangTuntas, L.selesaiPasang(k, A)], [8, 0, false], "nampan: belum tuntas sebelum pasangan terakhir");
  k = L.pasangSatu(k, A);
  sama([k.dipasang, k.pasangTuntas, L.selesaiPasang(k, A), L.pasangSatu(k, A) === k], [9, 1, true, true], "nampan: pasangan terakhir menuntaskan dengan sisa");
  const pasMisi = k;
  let sm = pilih2("kukis", "bakpao");
  for (let i = 0; i < 9; i += 1) sm = L.pasangSatu(sm, A);
  sama([sm.pasangTuntas, L.selisihNampan(sm, A), L.sedikitBanyak(sm, A)], [0, 0, null], "nampan: sama banyak tidak dihitung tuntas dengan sisa");
  sama([L.jawabSelisih(sm, A, 0).benar, L.sedikitBanyak(L.awalNampan(), A)], [false, null], "nampan: sama banyak tidak ada selisih");
  const salahJ = L.jawabSelisih(k, A, 7);
  const benarJ = L.jawabSelisih(k, A, 8);
  sama([salahJ.benar, salahJ.k === k, benarJ.benar, benarJ.k.selisihBenar], [false, true, true, 1], "nampan: jawab selisih");
  const pil = L.pilihanSelisih(8);
  cek(pil.includes(8) && new Set(pil).size === 3 && pil.every((n) => n >= 0 && n <= 20) && L.pilihanSelisih(0).every((n) => n >= 0) && L.pilihanSelisih(20).every((n) => n <= 20), "nampan: tiga pilihan selisih");
  sama(L.pilihNampan(L.pilihNampan(pasMisi, "permen"), "donat").dipasang, 0, "nampan: pilih nampan baru mengulang pasangan");
  sama(L.pilihNampan(L.pilihNampan(L.awalNampan(), "donat"), "donat").kiri, null, "nampan: ketuk lagi membatalkan");
  sama([L.pilihNampan(pasMisi, "permen").kiri, L.pilihNampan(pasMisi, "permen").kanan, L.pilihNampan(pasMisi, "permen").pasangTuntas], ["permen", null, 1], "nampan: pilihan baru dari kiri, catatan tuntas tetap");
  // Menyamakan.
  let t = L.pilihMode(pilih2("donat", "kukis"), "samakan");
  for (let i = 0; i < 7; i += 1) t = L.tambahSatu(t, A);
  sama([t.tambah, t.tambahTuntas, L.sudahSama(t, A)], [7, 0, false], "nampan: tambah sebelum sama");
  t = L.tambahSatu(t, A);
  sama([t.tambah, t.tambahTuntas, L.sudahSama(t, A), L.tambahSatu(t, A) === t, L.ambilSatu(t, A) === t], [8, 1, true, true, true], "nampan: tambah delapan tuntas, sudah sama tidak bertambah");
  let am = L.ambilSatu(L.tambahSatu(L.pilihMode(pilih2("donat", "kukis"), "samakan"), A), A);
  sama([am.tambah, am.ambil], [0, 1], "nampan: berganti cara mengulang dari nol");
  for (let i = 0; i < 7; i += 1) am = L.ambilSatu(am, A);
  sama([am.ambil, am.ambilTuntas, am.tambahTuntas, L.sudahSama(am, A)], [8, 1, 0, true], "nampan: ambil delapan tuntas");
  sama([L.ulangSamakan(am).tambah, L.ulangSamakan(am).ambil, L.ulangSamakan(am).ambilTuntas], [0, 0, 1], "nampan: ulang samakan, catatan tuntas tetap");
  sama(L.tambahSatu(L.pilihMode(pilih2("kukis", "bakpao"), "samakan"), A).tambah, 0, "nampan: sama banyak tidak bisa ditambah");
  // Batang dan garis.
  let bt = L.pilihMode(pilih2("permen", "kukis"), "batang");
  bt = L.sorotBatang(bt, A);
  sama([bt.batangSorot, bt.batangTuntas, L.sorotBatang(bt, A) === bt, L.bukaBatang(bt).batangSorot, L.sorotBatang(L.pilihMode(pilih2("kukis", "bakpao"), "batang"), A).batangTuntas], [true, 1, true, false, 0], "nampan: sorot selisih sekali, sama banyak tidak");
  let gr = L.pilihMode(pilih2("permen", "kukis"), "garis");
  for (let i = 0; i < 5; i += 1) gr = L.loncatSatu(gr, A);
  sama([gr.loncat, gr.garisTuntas], [5, 0], "nampan: loncat sebelum sampai");
  gr = L.loncatSatu(gr, A);
  sama([gr.loncat, gr.garisTuntas, L.loncatSatu(gr, A) === gr, L.ulangLoncat(gr).loncat, L.ulangLoncat(gr).garisTuntas], [6, 1, true, 0, 1], "nampan: loncat enam tuntas");
  for (const mode of ["pasang", "samakan", "batang", "garis"])
    for (const st of [L.awalNampan(), pilih2("donat", "kukis"), pasMisi, t, am, bt, gr, sm, L.pilihNampan(L.awalNampan(), "donat")]) {
      const tk = L.kalimatNampan(L.pilihMode(st, mode), A);
      cek(tanpaDigit(tk) && !TERLARANG.test(tk) && tk.length > 5, `nampan: kalimat ${mode} tanpa digit ("${tk}")`);
    }

  const daftar = MB6.daftarMisiBab6("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const Na = (o) => ({ ...L.awalNampan(), ...o });
  const awal = L.awalNampan();
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("a-")), "misi A: id unik berawalan a-");
  sama(daftar.map((x) => x.id), ["a-pasang", "a-batang", "a-garis", "a-samakan", "a-selisih", "a-ambil"], "misi A: urutan");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && !TERLARANG.test(x.teks)), "misi A: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "rak" }) && !x.cek({ alat: "banding", jumlah: [12, 15, 9], pas: 0, selisih: true, batang: true }) && !x.cek({ alat: "loncat", op: "selisih", a: 4, b: 12 }) && !x.cek({ alat: "selesai", id: "jembatan" })), "misi A: keadaan alat lain tidak memenuhi");
  cek(ada(pasMisi, "a-pasang") && !ada(sm, "a-pasang") && !ada(Na({ dipasang: 9 }), "a-pasang"), "misi A: pasangkan sampai ada sisa");
  cek(ada(bt, "a-batang") && !ada(Na({ batangSorot: true }), "a-batang"), "misi A: sorot selisih di batang");
  cek(ada(gr, "a-garis") && !ada(Na({ loncat: 6 }), "a-garis"), "misi A: loncat sampai bilangan besar");
  cek(ada(t, "a-samakan") && !ada(am, "a-samakan") && !ada(t, "a-ambil"), "misi A: samakan dengan menambah");
  cek(ada(am, "a-ambil") && !ada(am, "a-samakan"), "misi A: samakan dengan mengambil");
  cek(ada(benarJ.k, "a-selisih") && !ada(salahJ.k, "a-selisih"), "misi A: selisih yang tepat");
  sama(ids, ["donat", "kukis", "permen", "bakpao"], "nampan: id");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahNampan.tsx", "TahapNampan.tsx", "UntaianLampu.tsx", "PapanMenuKapur.tsx", "SimulasiMejaNampan.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
    cek(!/lebih besar dari|lebih kecil dari|[<>]=?\s*\d/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const tahap = readFileSync(new URL("TahapNampan.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapNampan: Abstract diakhiri Poin Penting, tanpa perayaan (bukan sub-bab akhir)");
  cek(/tampah/.test(tahap) && /taplak/.test(tahap) && /koran/.test(tahap), "TahapNampan: tiga pola visual baru");
  for (const f of ["LangkahNampan.tsx", "TahapNampan.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahNampan.tsx", folderUrl), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahNampan: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah), "LangkahNampan: Cari kesalahan dan petunjuk yang menunjuk kesalahan");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahNampan: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  const sim = readFileSync(new URL("SimulasiMejaNampan.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalNampan/.test(sim) && /speakGuru/.test(sim) && /pasangSatu/.test(sim) && /tambahSatu/.test(sim) && /ambilSatu/.test(sim) && /sorotBatang/.test(sim) && /loncatSatu/.test(sim), "SimulasiMejaNampan: melaporkan keadaan, empat alat");
  for (const f of ["UntaianLampu.tsx", "PapanMenuKapur.tsx", "SimulasiMejaNampan.tsx", "TahapNampan.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab6.tsx", import.meta.url), "utf8");
  cek(ms.includes("SimulasiMejaNampan") && /huruf === "A" \? \[/.test(ms) && /A: "Misi Pasar Malam[^"\d]*"/.test(ms), "SimulasiBab6: tab Sub-Bab A memakai Meja Dua Nampan, teks misi tanpa digit");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
